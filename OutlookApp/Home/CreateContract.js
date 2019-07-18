/// <reference path="../App.js" />
var xhr;
var itemRequest;
var statusRequired = ["New", "Drafting", "Awaiting Review", "Reviewed", "In Negotiation", "Awaiting Approval", "Approved", "Negotiation Complete", "Ready for Signature", "Awaiting Signatures", "Signed", "Active", "Up for Renewal", "Renewed", "Extended", "About to Expire"];
var ContractData = [];
var browsedContractSel = '';
var BusinessAreaAccessWithRead = [];
var thisContractAreaSettings;
var thisBusinessAreaSettings;
var arrPeople = [];

(function () {
    "use strict";

    // The Office initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {

            displayItemDetails();
        });
    };

    // Displays the "Subject" and "From" fields, based on the current mail item
    function displayItemDetails() {
        var item = Office.context.mailbox.item;
        BindPeople();
        //manoj
        if (typeof localStorage.DefaultBusinessArea != "undefined" && localStorage.DefaultBusinessArea != null && localStorage.DefaultBusinessArea != "") {
            var arrArea = localStorage.DefaultBusinessArea.split(' > ');
            var BusinessArea = arrArea.pop();
            $("#txtContractArea").val(arrArea[0]);
            $("#txtBusinessArea").val(BusinessArea);
            getcontractareasettings(arrArea[0]);
        } else {
            $("#txtContractArea").val("");
            $("#txtBusinessArea").val("");
        }

        if (typeof localStorage.BusinessAreaAccessWithRead != "undefined" && localStorage.BusinessAreaAccessWithRead != null && localStorage.BusinessAreaAccessWithRead != "") {
            BusinessAreaAccessWithRead = localStorage.BusinessAreaAccessWithRead.split(';').filter(function (v) { return v !== '' }); // remove empty
        } else {
            BusinessAreaAccessWithRead = [];
        }

        if (typeof item.attachments == "undefined" || typeof item.attachments.length == 0) {
            $("#tblAttachments").append('<tr><td class="f_text"><hr class="hr_line" /><p>No attachment(s) found.</p></td></tr>');
        } else {
            for (var i = 0; i < item.attachments.length; i++) {
                var style = "";
                attachments += '<tr>';
                attachments += '<td class="f_text"><hr class="hr_line" /> <input type="checkbox" name="MultiselectDoc" data-attchIndex="' + i + '"  onchange="MultiCheckAtt(this)" /><p style="max-width: 35%; width: 35% !important;display: inline-flex;margin-left: 2px;">' + item.attachments[i].name;
                attachments += "</p><select id='ddlDocumentType" + i + "' title='Document Type' class='f_inpt width50 DocumentTypeDDl' style='height: 26px;'>";
                attachments += '<option value="0">Document Type</option>';
                attachments += '</select>';
                attachments += '</td>';
                attachments += '</tr>';
            }
            if (attachments != "") {
                itemRequest = new Object();
                itemRequest.attachmentToken = "";
                itemRequest.ewsUrl = Office.context.mailbox.ewsUrl;
                itemRequest.attachments = new Array();
                $("#tblAttachments").append(attachments);
            }
            else {
                $("#tblAttachments").append('<tr><td class="f_text"><hr class="hr_line" /><p>No attachment(s) found.</p></td></tr>');
            }
        }


        //manoj
        if (typeof item.attachments == "undefined") {
            $("#dvSaveFormButn").css("display", "none");
            $("#saveForm").css("display", "none");
            $("#spNote").css("display", "");
        } else {
            $("#dvSaveFormButn").css("display", "");
            $("#saveForm").css("display", "");
            $("#spNote").css("display", "none");
            itemRequest = new Object();
            itemRequest.attachmentToken = "";
            itemRequest.ewsUrl = "https://outlook.office365.com/EWS/Exchange.asmx";
            itemRequest.itemid = item.itemId;
            itemRequest.subject = item.subject;
            itemRequest.accountid = localStorage.AccountID;
            itemRequest.username = localStorage.UserName;
            itemRequest.contractid = "";
            itemRequest.contracttitle = "";
            var vItemID = item.itemId.replace(/\+/g, "~");
            GetCorrespondenceContracts(vItemID);
        }
    }

})();


function SaveCorrespondence() {
    if (requiredValidator('saveForm', false)) {
        $("#loadingPage").fadeIn();
        Office.context.mailbox.getCallbackTokenAsync(attachmentTokenCallback);
    }
    else {
        $("#loadingPage").fadeOut();
        app.initialize();
        app.showNotification("", "Please enter required fields.");
    }
};

function attachmentTokenCallback(asyncResult, userContext) {
    if (asyncResult.status == "succeeded") {
        itemRequest.attachmentToken = asyncResult.value;
        makeServiceRequest();
    }
    else {
        $("#loadingPage").fadeOut();
        app.initialize();
        app.showNotification("", "Could not get callback token: " + asyncResult.error.message);
    }
}

function makeServiceRequest() {
    itemRequest.contractid = $("#txtContractRecElementID").val();
    itemRequest.contracttitle = $("#txtContractRecElement").val();
    itemRequest.comment = $("#txtComment").val();
    xhr = new XMLHttpRequest();
    // Update the URL to point to your service location.
    xhr.open("POST", "/api/mailservice/correspondence", true);

    xhr.setRequestHeader("eContracts-ApiKey", localStorage.APIKey);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.onreadystatechange = requestReadyStateChange;
    itemRequest.attachments = new Array();
    //Attacment
    var item = Office.context.mailbox.item;
    for (var i = 0; i < item.attachments.length; i++) {

        //var atchmt = Attachments.filter(function (attach) { return attach.Value == Office.context.mailbox.item.attachments[i].name });
        //if (atchmt.length > 0) {
        if (typeof (Office.context.mailbox.item.attachments[i].$0_0) == "undefined") {
            var myJsonObject = JSON.parse(JSON.stringify(Office.context.mailbox.item.attachments[i]._data$p$0)); //New property change to obj
            myJsonObject.accountid = localStorage.AccountID;
            myJsonObject.contractid = itemRequest.contractid;
            myJsonObject = JSON.stringify(myJsonObject); //change back to string
            itemRequest.attachments[i] = JSON.parse(myJsonObject);
        }
        else {
            var myJsonObject = JSON.parse(JSON.stringify(Office.context.mailbox.item.attachments[i].$0_0)); // Old property change to obj
            myJsonObject.accountid = localStorage.AccountID;
            myJsonObject.contractid = itemRequest.contractid;
            myJsonObject = JSON.stringify(myJsonObject); //change back to string
            itemRequest.attachments[i] = JSON.parse(myJsonObject);
        }



    }
    // Send the request. The response is handled in the 
    // requestReadyStateChange function.
    xhr.send(JSON.stringify(itemRequest));
};

// Handles the response from the JSON web service.
function requestReadyStateChange() {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            var response = JSON.parse(JSON.stringify(xhr.responseText));
            if (!response.isError) {
                ClearForm();
                $("#loadingPage").fadeOut();
                app.initialize();
                app.showNotification("", "Email successfully saved as Contract Correspondence.");
            } else {
                $("#loadingPage").fadeOut();
                app.initialize();
                app.showNotification("", "Email successfully saved as Contract Correspondence.");
            }
        } else {
            if (xhr.status == 404) {
                $("#loadingPage").fadeOut();
                app.initialize();
                app.showNotification("", "The app server could not be found.");
            } else {
                $("#loadingPage").fadeOut();
                app.initialize();
                app.showNotification("", "There was an unexpected error: " + xhr.status + " -- " + xhr.statusText);
            }
        }
    }
};


$(document).ready(function () {
    $("#dvContractRec").dialog({
        autoOpen: false,
        closeText: "",
        width: "95%",
        title: "Task",
        modal: true,
        buttons: {
            "OK": function () { SelectContractRecElement(); $(this).dialog("close"); },
            "Clear": function () { fnClearSelectedContracts(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
    $('#txtSearchBoxTodoForm').keypress(function (e) {
        if (e.keyCode == 13) {
            $(".ui-autocomplete").css('display', 'none');
            SearchContractRec1();
        }
    });
});

function ContractRec() {
    $("#txtSearchBoxTodoForm").val("");
    $('#dvLoading').html('<img src="../../Content/Images/icon/loading.gif"> Loading...');

    $('#compact-paginationContractsTodo').css('display', '');
    $('#compact-paginationDocumentsTodo').css('display', 'none');

    $("#tblDocumentsTodo").css("display", "none");
    $("#tblContractsTodo").css("display", "");
    if ($(ContractData).length == 0) {
        BindContracts(true);
    }
    else {

        BindContracts(false);
    }
    // if ($("#tblContractsTodo li").length == 0) {
    //BindContracts();
    // SearchContractRec(true);
    // }
    // else {
    //     $("#dvContractRec").dialog("option", "title", "Select Contract");



}

function fnClearSelectedContracts() {
    $.each($('#tblContractsTodo li input'), function (index, value) {
        value.checked = false;
    });
    $("#txtSearchBoxTodoForm").val("");

    browsedContractSel = "";
    // SearchContractRec();

    //$.each($('#tblContractsTodo li input'), function (index, value) {
    //    value.checked = false;
    //});
}

function BindContracts(bindFlag) {
    $("#loadingPage").fadeIn();
    $("#tblContractsTodo").empty();

    if (bindFlag) {
        $.ajax({
            //url: '/api/accounts/' + localStorage.AccountID + '/Contracts',
            url: '/api/accounts/' + localStorage.AccountID + '/Contracts',
            type: 'GET',
            dataType: 'json',
            'Content-Type': 'application/json',
            cache: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName },
            success: function (data) {
                var v = $(data).length;

                if (v > 1)
                    data.sort(sortByContractTitle);
                var contractTags = [];
                ContractData = data;
                $(data).each(function (i, item) {
                    var sRowKey = item.RowKey;
                    var checked = '';
                    var sContractTitle = item.ContractTitle;
                    var sContractNumber = item.ContractNumber;
                    if ((($.inArray(item.Status, statusRequired) > -1)) && item.InRecycleBin != "Yes" && (item.IsDraft == "No" || item.IsDraft == "")) {
                        if (browsedContractSel != "" && sRowKey == browsedContractSel) {
                            checked = "checked";
                        }
                        var article = '<li>';
                        article += '<input id="' + sRowKey + '" ' + checked + ' type="radio" name="Contracts" class="css-checkbox" value="' + sContractTitle + '" />';
                        article += '<label for="' + sRowKey + '" class="css-label PreserveSpace">' + sContractTitle + '</label>';
                        article += '<p id="FinalizedDocumentsUrl" style="display:none;">' + item.FinalizedDocumentsUrl + '</p>';
                        article += '<p id="DraftDocumentsUrl" style="display:none;">' + item.DraftDocumentsUrl + '</p>';
                        article += '</li>';
                        $("#tblContractsTodo").append(article);
                        if (i == v - 1) {
                        }
                        contractTags.push(sContractTitle);
                    }
                });



                $("#txtSearchBoxTodoForm").autocomplete({
                    source: contractTags,
                    select: function (evn, uidetails) {
                        $("#txtSearchBoxTodoForm").val(uidetails.item.label);
                        SearchContractRec1();
                    }
                });

                var vCount = $("#tblContractsTodo li").length;
                $('#compact-paginationContractsTodo').pagination({
                    items: vCount,
                    itemsOnPage: 5,
                    type: 'ul',
                    typeID: 'tblContractsTodo',
                    row: 'li',
                    cssStyle: 'compact-theme'
                });

                $("#loadingPage").fadeOut();
                $("#dvContractRec").dialog("option", "title", "Select Contract");
                $("#dvContractRec").dialog("open");
                $('#dvLoading').html('');
            },
            error:
                function (data) {
                    $("#loadingPage").fadeOut();
                }
        });
    }
    else {
        var v = $(ContractData).length;
        var contractTags = [];
        $(ContractData).each(function (i, item) {
            var sRowKey = item.RowKey;
            var sContractTitle = item.ContractTitle;
            var sContractNumber = item.ContractNumber;
            var checked = "";
            if ((($.inArray(item.Status, statusRequired) > -1)) && item.InRecycleBin != "Yes" && (item.IsDraft == "No" || item.IsDraft == "")) {
                var article = '<li>';
                article += '<input id="' + sRowKey + '" type="radio" name="Contracts" class="css-checkbox" value="' + sContractTitle + '" />';
                article += '<label for="' + sRowKey + '" class="css-label PreserveSpace">' + sContractTitle + '</label>';
                article += '<p id="ContractDocumentsUrl" style="display:none;">' + item.ContractDocumentsUrl + '</p>';
                article += '<p id="Counterparty" style="display:none;">' + item.Counterparty + '</p>';
                article += '<p id="BusinessAreaPath" style="display:none;">' + item.BusinessAreaPath + '</p>';
                article += '<p id="ContractArea" style="display:none;">' + item.ContractArea + '</p>';
                article += '<p id="BusinessArea" style="display:none;">' + item.BusinessArea + '</p>';
                article += '<p id="ContractAreaAdministrators" style="display:none;">' + item.ContractAreaAdministrators + '</p>';
                article += '<p id="BusinessAreaOwners" style="display:none;">' + item.BusinessAreaOwners + '</p>';
                article += '</li>';
                $("#tblContractsTodo").append(article);
                if (i == v - 1) {
                }
                contractTags.push(sContractTitle);
            }
        });

        $("#txtSearchBoxTodoForm").autocomplete({
            source: contractTags,
            select: function (evn, uidetails) {
                $("#txtSearchBoxTodoForm").val(uidetails.item.label);
                SearchContractRec1();
            }
        });

        var vCount = $("#tblContractsTodo li").length;
        $('#compact-paginationContractsTodo').pagination({
            items: vCount,
            itemsOnPage: 5,
            type: 'ul',
            typeID: 'tblContractsTodo',
            row: 'li',
            cssStyle: 'compact-theme'
        });

        $("#loadingPage").fadeOut();
        $("#dvContractRec").dialog("option", "title", "Select Contract");
        $("#dvContractRec").dialog("open");
        $('#dvLoading').html('');
    }
}


function sortByContractTitle(a, b) {
    var sortStatus = 0;
    if (a.ContractTitle.toUpperCase() < b.ContractTitle.toUpperCase()) {
        sortStatus = -1;
    } else if (a.ContractTitle.toUpperCase() > b.ContractTitle.toUpperCase()) {
        sortStatus = 1;
    }
    return sortStatus;
}


function SearchContractRec() {
    $("#tblContractsTodo").empty();
    $('#dvLoading').css("display", "");
    $('#dvLoading').html('<img src="../../Content/Images/icon/loading.gif"> Searching...');
    //var vURL = '/api/accounts/' + localStorage.AccountID + '/Contracts?searchkeyword=' + encodeURIComponent($("#txtSearchBoxTodoForm").val()) + '&customquery=&sortbyfield=ContractTitle&orderby=ASC';
    var vURL = '/api/accounts/' + localStorage.AccountID + '/Contracts?stage=&searchkeyword=' + encodeURIComponent($("#txtSearchBoxTodoForm").val()) + '&customquery=&sortbyfield=ContractTitle&orderby=ASC';
    $.ajax({
        url: vURL,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName },
        cache: false,
        success: function (data) {
            var contractTags = [];
            $(data).each(function (i, item) {
                var checked = "";
                var sRowKey = item.RowKey;
                var sContractTitle = item.ContractTitle;
                if ($("#txtSearchBoxTodoForm").val() == "" || sContractTitle.toLowerCase().indexOf($("#txtSearchBoxTodoForm").val().toLowerCase()) >= 0) {
                    if ((($.inArray(item.Status, statusRequired) > -1)) && item.InRecycleBin != "Yes" && (item.IsDraft == "No" || item.IsDraft == "")) {
                        var sContractNumber = item.ContractNumber;
                        if (browsedContractSel != "" && sRowKey == browsedContractSel) {
                            checked = "checked";
                        }
                        var article = '<li>';
                        article += '<input id="' + sRowKey + '" ' + checked + ' type="radio" name="Contracts" class="css-checkbox" value="' + sContractTitle + '" />';
                        article += '<label for="' + sRowKey + '" id="' + sRowKey + '_label" class="css-label PreserveSpace">' + sContractTitle + '</label>';
                        article += '<p id="FinalizedDocumentsUrl" style="display:none;">' + item.FinalizedDocumentsUrl + '</p>';
                        article += '<p id="DraftDocumentsUrl" style="display:none;">' + item.DraftDocumentsUrl + '</p>';
                        article += '</li>';
                        $("#tblContractsTodo").append(article);

                        $("#" + sRowKey).val($('<div/>').text(item.ContractTitle).html());
                        $("#" + sRowKey + "_label").html($('<div/>').text(item.ContractTitle).html());
                        contractTags.push(sContractTitle);
                    }
                }
            });
            var vCount = $("#tblContractsTodo li").length;
            $("#txtSearchBoxTodoForm").autocomplete({
                source: contractTags,
                select: function (evn, uidetails) {
                    $("#txtSearchBoxTodoForm").val(uidetails.item.label);
                    SearchContractRec1();
                }
            });
            if (vCount != 0) {
                $('#dvLoading').html('');
                $('#compact-paginationContractsTodo').css('display', '');
                $('#compact-paginationContractsTodo').pagination({
                    items: vCount,
                    itemsOnPage: 5,
                    type: 'ul',
                    typeID: 'tblContractsTodo',
                    row: 'li',
                    cssStyle: 'compact-theme'
                });
            } else {
                $('#dvLoading').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No Contract Found!</p>')
                $('#compact-paginationContractsTodo').css('display', 'none');
            }

            //if (openpopup) {
            //    $("#dvContractRec").dialog("option", "title", "Select Contract");


            //    $("#dvContractRec").dialog("open");
            //    $('#dvLoading').html('');
            //}
        },
        error: function () {
            $('#compact-paginationContractsTodo').css('display', 'none');
            $('#dvLoading').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No Contract Found!</p>')
        }
    });

}
function SearchContractRec1() {
    $("#compact-paginationContractsTodo").empty();
    $("#tblContractsTodo").empty();
    $('#dvLoading').css("display", "");
    $('#dvLoading').html('<img src="../../Content/Images/icon/loading.gif"> Searching...');
    if ($(ContractData).length > 0) {

        $(ContractData).each(function (i, item) {
            var sRowKey = item.RowKey;
            var sContractTitle = item.ContractTitle;
            if ($("#txtSearchBoxTodoForm").val() == "" || sContractTitle.toLowerCase().indexOf($("#txtSearchBoxTodoForm").val().toLowerCase()) >= 0) {
                var sContractNumber = item.ContractNumber;
                var checked = "";
                if ((($.inArray(item.Status, statusRequired) > -1) || (item.IsDraft == "Yes" && item.CreatedBy == localStorage.UserName)) && item.InRecycleBin != "Yes") {
                    if (browsedContractSel != "" && sRowKey == browsedContractSel) {
                        checked = "checked";
                    }
                    var article = '<li>';
                    article += '<input id="' + sRowKey + '" ' + checked + ' type="radio" name="Contracts" class="css-checkbox" value="' + sContractTitle + '" />';
                    article += '<label for="' + sRowKey + '" class="css-label PreserveSpace">' + sContractTitle + '</label>';
                    article += '<p id="ContractDocumentsUrl" style="display:none;">' + item.ContractDocumentsUrl + '</p>';
                    article += '<p id="Counterparty" style="display:none;">' + item.Counterparty + '</p>';
                    article += '<p id="BusinessAreaPath" style="display:none;">' + item.BusinessAreaPath + '</p>';
                    article += '<p id="ContractArea" style="display:none;">' + item.ContractArea + '</p>';
                    article += '<p id="BusinessArea" style="display:none;">' + item.BusinessArea + '</p>';
                    article += '<p id="ContractAreaAdministrators" style="display:none;">' + item.ContractAreaAdministrators + '</p>';
                    article += '<p id="BusinessAreaOwners" style="display:none;">' + item.BusinessAreaOwners + '</p>';
                    article += '</li>';
                    $("#tblContractsTodo").append(article);
                }
            }

        });
        var vCount = $("#tblContractsTodo li").length;

        if (vCount != 0) {
            $('#dvLoading').html('');
            $('#compact-paginationContractsTodo').css('display', '');
            $('#compact-paginationContractsTodo').pagination({
                items: vCount,
                itemsOnPage: 5,
                type: 'ul',
                typeID: 'tblContractsTodo',
                row: 'li',
                cssStyle: 'compact-theme'
            });
        } else {
            $('#dvLoading').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No Contract Found!</p>')
            $('#compact-paginationContractsTodo').css('display', 'none');
        }

    }
    else {
        SearchContractRec();
    }
}
function SelectContractRecElement() {
    var vSelectedElement = null;
    vSelectedElement = $('input[name=Contracts]:checked');

    $("#txtContractRecElement").val("");
    $("#txtContractRecElementID").val("");

    if (vSelectedElement.length > 0) {
        $("#txtContractRecElement").val($(vSelectedElement).val());
        browsedContractSel = $(vSelectedElement).attr("id");
        $("#txtContractRecElementID").val($(vSelectedElement).attr("id"));
    }
}

function ClearForm() {
    $("#txtComment").val("");
    $("#txtContractRecElement").val("");
    $("#txtContractRecElementID").val("");
}

function GetCorrespondenceContracts(itemid) {
    $.ajax({
        url: '/api/accounts/' + localStorage.AccountID + '/correspondence/contracts?itemid=' + itemid,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        async: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
        success: function (data) {
            var vContracts = "";
            $(data).each(function (i, item) {
                if (vContracts == "") {
                    vContracts = '<a href="/Contracts/ContractDetails?ContractID=' + item.ContractID + '" target="_blank" class="linkText1 PreserveSpace">' + item.ContractTitle + '</a>';
                }
                else {
                    vContracts += '; <a href="/Contracts/ContractDetails?ContractID=' + item.ContractID + '" target="_blank" class="linkText1 PreserveSpace">' + item.ContractTitle + '</a>';
                }
            });
            if (vContracts != "") {
                $("#dvAddedContracts").append("This email is saved in eContracts as Correspondence related to " + vContracts + ".");
                $("#dvAddedContracts").css("display", "");
            }
        },
        error: function (data) {

        }
    });
}


//manoj
function getcontractareasettings(contractareaname) {
   // $("#loadingPage").fadeIn();
    $.ajax({
        url: '/api/accounts/' + localStorage.AccountID + '/businessarea/contractareadetailsbyname?contractareaname=' + encodeURIComponent(contractareaname),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        //async: false,
        success: function (data) {
            
            data.ConfigureContractType = (data.ConfigureContractType != null && data.ConfigureContractType != "") ? data.ConfigureContractType : "configure";
            thisContractAreaSettings = data;

            if (typeof thisContractAreaSettings.ContractType != 'undefined' && thisContractAreaSettings.ContractType != null && thisContractAreaSettings.ContractType != '' ) {

                var arrContractType = thisContractAreaSettings.ContractType.split(';').filter(function (vcontype) { return vcontype !== '' }); // remove empty
                var ContypeArtical = "";
                $(arrContractType).each(function (i, itemcontype) {
                    ContypeArtical += '<option value="' + itemcontype + '" >' + itemcontype + '</option>';
                });
                $("#ddlContractTypes").html(ContypeArtical);
            } else {
                $("#ddlContractTypes").html("");
            }

            if (typeof thisContractAreaSettings.DocumentTypes != 'undefined' && thisContractAreaSettings.DocumentTypes != null && thisContractAreaSettings.DocumentTypes != '') {

                var arrContractType = thisContractAreaSettings.DocumentTypes.split(';').filter(function (vdoctype) { return vdoctype !== '' }); // remove empty
                var DoctypeArtical = "";
                $(arrContractType).each(function (i, itemdoctype) {
                    DoctypeArtical += '<option value="' + itemdoctype + '" >' + itemdoctype + '</option>';
                });
                $(".DocumentTypeDDl").html(DoctypeArtical);
            } else {
                $(".DocumentTypeDDl").html("");
            }
        },
        error: function (data) {
            $("#loadingPage").fadeOut();
        }
    });
}

function BindPeople() {
    //$("#ddlAssignTo").empty();
    //$("#ddlCollaborators").empty();
    //$("#ddlSendToNt").empty();
    //$("#ddlSendToReqNt").empty();
    if (arrPeople.length == 0) {
        $.ajax({
            url: '/api/accounts/' + localStorage.AccountID + '/users',
            type: 'GET',
            dataType: 'json',
            'Content-Type': 'application/json',
            cache: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            success: function (data) {
                arrPeople = ExceptCurrentUser;
            },
            error:
                function (data) {
                    arrPeople = [];
                }
        });
    }
}

function getbusinessareasettings(contractareaname,businessareaname) {
    $.ajax({
        url: '/api/accounts/' + localStorage.AccountID + '/businessarea/detailsbyname?businessareaname=' + encodeURIComponent(businessareaname) + '&contractareaname=' + encodeURIComponent(contractareaname),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        //async: false,
        success: function (data) {
            thisBusinessAreaSettings = data;
            BindPeople(true);
        },
        error: function (data) {
            thisBusinessAreaSettings="";
        }
    });
}
//manoj