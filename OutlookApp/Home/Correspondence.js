/// <reference path="../App.js" />
var xhr;
var itemRequest;
var statusRequired = ["New", "Drafting", "Awaiting Review", "Reviewed", "In Negotiation", "Awaiting Approval", "Approved", "Negotiation Complete", "Ready for Signature", "Awaiting Signatures", "Signed", "Active", "Up for Renewal", "Renewed", "Extended", "About to Expire"];
var ContractData = [];
var browsedContractSel = '';
var allSelectedContracts = [];
var selectedDocs = [];
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
        if (typeof (localStorage.globalSelContracts) != "undefined" && localStorage.globalSelContracts != null) {
            allSelectedContracts = localStorage.getItem('globalSelContracts');
        }
        if (typeof (localStorage.AllContract) != "undefined" && localStorage.AllContract != null) {
            ContractData = JSON.parse(localStorage.getItem('AllContract'));
        }
        if (typeof (localStorage.selectedContract) != "undefined") {
            var selectedContract = localStorage.selectedContract;

            if (typeof (localStorage.AllContract) != "undefined" && localStorage.AllContract != null) {
                var contract = $.grep(ContractData, function (item, i) {
                    return item.ContractTitle.toLowerCase() == selectedContract.toLowerCase()
                });

                if (contract.length > 0) {
                    if (allSelectedContracts.indexOf(contract[0].RowKey) <= -1) {
                        $("#txtContractRecElement").val(selectedContract);
                        $("#txtContractRecElementID").val(contract[0].RowKey);
                        $("#imgClearSearch").css('display', '');
                        $("#txtContractRecElement").prop('readonly', true);
                        $("#imgOpenSearch").removeClass('left_img_68').addClass('left_img_48');
                    }
                }
            }
        }



        BindContracts('active');
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

            var htmlDocs = '';
            var myJsonObject = '';
            for (var i = 0; i < item.attachments.length; i++) {
                if (typeof (item.attachments[i].$0_0) == "undefined") {
                    myJsonObject = JSON.parse(JSON.stringify(item.attachments[i]._data$p$0)); //New property change to obj
                }
                else {
                    myJsonObject = JSON.parse(JSON.stringify(item.attachments[i].$0_0)); // Old property change to obj
                }
                htmlDocs += '<li style="margin: 5px;padding: 0;"><input type="checkbox" name="MultiselectDoc" checked onclick="selectCheckedDocs(this);" style="margin: 0px 3px 0 20px;vertical-align: text-bottom;" id="chkDoc_' + myJsonObject.id + '">';
                htmlDocs += '<label style="color:#666;" for="chkDoc_' + i + '">' + myJsonObject.name + '</label>';
                htmlDocs += '</li>';
            }
            if (htmlDocs != '') {
                var newHTML = '<li style="margin: 5px;">';
                newHTML += '<label style="margin-left: 20px;font-size: 14px;color: #696060;" id="lblSavingDocs">Saving (' + item.attachments.length + '/' + item.attachments.length + ') Documents</label></li>';
                $("#ulCorrespondenceDocs").append(newHTML + htmlDocs);
            }
        }
    }

})();

function selectCheckedDocs(item) {
    var selID = $(item)[0].id.split('_')[1];
    if (selectedDocs.indexOf(selID) == -1)
        selectedDocs.push(selID);
    var itemLen = Office.context.mailbox.item.attachments.length;
    var selectedLen = $('input[name=MultiselectDoc]:checked').length;
    $("#lblSavingDocs").html('Saving (' + selectedLen + '/' + itemLen + ') Documents');
}

function SaveCorrespondence() {
    if (requiredValidator('saveForm', false)) {
        $("#loadingPage").fadeIn();
        Office.context.mailbox.getCallbackTokenAsync(attachmentTokenCallback);

        var con = $.grep(ContractData, function (item, i) {
            return item.ContractTitle.toLowerCase() == localStorage.selectedContract.toLowerCase()
        });
        if (con.length > 0) {
            if (allSelectedContracts.indexOf(con[0].RowKey) == -1) {
                allSelectedContracts.push(con[0].RowKey);
                localStorage.globalSelContracts = allSelectedContracts;
            }

            var vContracts = "";

            if ($("#dvAddedContracts a").length == 0) {
                vContracts = 'This email is saved to <a href="/Contracts/ContractDetails?ContractID=' + con[0].RowKey + '" target="_blank" class="linkText1 PreserveSpace">' + con[0].ContractTitle + '</a>';
            }
            else {
                vContracts += '; <a href="/Contracts/ContractDetails?ContractID=' + con[0].RowKey + '" target="_blank" class="linkText1 PreserveSpace">' + con[0].ContractTitle + '</a>';
            }
            if (vContracts != "") {
                $("#dvAddedContracts").append(vContracts);
                $("#dvAddedContracts").css("display", "");
            }
        }

        ContractData = ContractData.sort(function (a, b) {
            return new Date(a.Modified).getTime() - new Date(b.Modified).getTime()
        });
        var conTitle = $.map(ContractData, function (item, i) {
            if (allSelectedContracts.indexOf(item.RowKey) <= -1) {
                return item.ContractTitle
            }
        });
        //conTitle = conTitle.slice(0, 30);

        $("#txtContractRecElement").autocomplete({
            source: conTitle,
            select: function (evn, uidetails) {
                $("#txtContractRecElement").val(uidetails.item.label);
                SelectItem();
            },
            response: function (event, ui) {
                if (ui.content.length === 0) {
                    $("#txtContractRecElement").val("");
                }
            }
        });
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
    var cnt = 0;
    for (var i = 0; i < item.attachments.length; i++) {

        //var atchmt = Attachments.filter(function (attach) { return attach.Value == Office.context.mailbox.item.attachments[i].name });
        //if (atchmt.length > 0) {
        if (typeof (Office.context.mailbox.item.attachments[i].$0_0) == "undefined") {
            var myJsonObject = JSON.parse(JSON.stringify(Office.context.mailbox.item.attachments[i]._data$p$0)); //New property change to obj
            myJsonObject.accountid = localStorage.AccountID;
            myJsonObject.contractid = itemRequest.contractid;
            myJsonObject = JSON.stringify(myJsonObject); //change back to string

            var checkID = Office.context.mailbox.item.attachments[i]._data$p$0;
            if (selectedDocs.indexOf(checkID.id) == -1) {
                itemRequest.attachments[cnt] = JSON.parse(myJsonObject);
                cnt++;
            }

        }
        else {
            var myJsonObject = JSON.parse(JSON.stringify(Office.context.mailbox.item.attachments[i].$0_0)); // Old property change to obj
            myJsonObject.accountid = localStorage.AccountID;
            myJsonObject.contractid = itemRequest.contractid;
            myJsonObject = JSON.stringify(myJsonObject); //change back to string
            var checkID = Office.context.mailbox.item.attachments[i].$0_0;
            if (selectedDocs.indexOf(checkID.id) == -1) {
                itemRequest.attachments[cnt] = JSON.parse(myJsonObject);
                cnt++;
            }
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
        modal: true
        //buttons: {
        //    "OK": function () { SelectContractRecElement(); $(this).dialog("close"); },
        //    Cancel: function () {
        //        $(this).dialog("close");
        //    }
        //}
    });
    $('#txtSearchBoxTodoForm').keypress(function (e) {
        if (e.keyCode == 13) {
            $(".ui-autocomplete").css('display', 'none');
            SearchContractRec1();
        }
    });
    //txtClearSearch();
    //manoj
    $('#txtContractRecElement').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            OpenSearch();
        }
    });
    //manoj

});

function ContractRec() {
    $("#txtSearchBoxTodoForm").val("");
    //$('#dvLoading').html('<img src="../../Content/Images/icon/loading.gif"> Loading...');

    $('#compact-paginationContractsTodo').css('display', '');
    $('#compact-paginationDocumentsTodo').css('display', 'none');

    $("#tblDocumentsTodo").css("display", "none");
    $("#tblContractsTodo").css("display", "");
    BindContracts('');
    //if ($(ContractData).length == 0) {
    //    BindContracts(true);
    //}
    //else {

    //    BindContracts(false);
    //}
    // if ($("#tblContractsTodo li").length == 0) {
    //BindContracts();
    // SearchContractRec(true);
    // }
    // else {
    //     $("#dvContractRec").dialog("option", "title", "Select Contract");



}

function fnClearSelectedContracts() {
    $.each($('#tbodyContractsTodo tr input'), function (index, value) {
        value.checked = false;
    });
    $("#txtSearchBoxTodoForm").val("");

    browsedContractSel = "";
    // SearchContractRec();

    //$.each($('#tblContractsTodo li input'), function (index, value) {
    //    value.checked = false;
    //});
}

//function BindContracts(bindFlag) {
//    $("#loadingPage").fadeIn();
//    $("#tbodyContractsTodo").empty();
//    if (bindFlag) {
//        $.ajax({
//            //url: '/api/accounts/' + localStorage.AccountID + '/Contracts',
//            url: '/api/accounts/' + localStorage.AccountID + '/Contracts',
//            type: 'GET',
//            dataType: 'json',
//            'Content-Type': 'application/json',
//            cache: false,
//            headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName },
//            success: function (data) {
//                $("#theadContractsTodo").show();
//                var v = $(data).length;
//                if (v > 1)
//                    data.sort(sortByContractTitle);
//                var contractTags = [];
//                ContractData = data;
//                if (typeof (localStorage.AllContract) == "undefined") {
//                    localStorage.setItem('AllContract', JSON.stringify(ContractData));
//                }
//                else {
//                    localStorage.AllContract = JSON.stringify(ContractData);
//                }
//                $(data).each(function (i, item) {
//                    var sRowKey = item.RowKey;
//                    if (allSelectedContracts.indexOf(sRowKey) <= -1) {
//                        var checked = '';
//                        var sContractTitle = item.ContractTitle;
//                        var sContractNumber = item.ContractNumber != null && item.ContractNumber != "" ? item.ContractNumber : "-";
//                        var sCounterparty = typeof (item.Counterparty) != "undefined" && item.Counterparty != "" ? item.Counterparty : "-";
//                        if ((($.inArray(item.Status, statusRequired) > -1)) && item.InRecycleBin != "Yes" && (item.IsDraft == "No" || item.IsDraft == "")) {
//                            if (browsedContractSel != "" && sRowKey == browsedContractSel) {
//                                checked = "checked";
//                            }
//                            var article = '<tr>';
//                            article += '<td>';
//                            article += '<a id="' + sRowKey + '" href="javascript:void(0);" name="Contracts" style="margin: 0 !important;bordor: none !important;" class="linkPickerClear PreserveSpace" onclick="SelectContractRecElement(this);">';
//                            article += sContractTitle + '</a>';
//                            article += '<p id="FinalizedDocumentsUrl" style="display:none;">' + item.FinalizedDocumentsUrl + '</p>';
//                            article += '<p id="DraftDocumentsUrl" style="display:none;">' + item.DraftDocumentsUrl + '</p>';
//                            article += '</td>';
//                            article += '<td>';
//                            article += sCounterparty;
//                            article += '</td>';
//                            article += '<td>';
//                            article += sContractNumber;
//                            article += '</td>';
//                            article += '</tr>';
//                            $("#tbodyContractsTodo").append(article);
//                            if (i == v - 1) {
//                            }
//                            contractTags.push(sContractTitle);
//                        }
//                    }
//                });
//                //$("#txtSearchBoxTodoForm").autocomplete({
//                //    source: contractTags,
//                //    select: function (evn, uidetails) {
//                //        $("#txtSearchBoxTodoForm").val(uidetails.item.label);
//                //        SearchContractRec1();
//                //    }
//                //});
//                var vCount = $("#tbodyContractsTodo tr").length;
//                if (vCount > 10) {
//                    $('#compact-paginationContractsTodo').pagination({
//                        items: vCount,
//                        itemsOnPage: 10,
//                        type: 'tr',
//                        typeID: 'tbodyContractsTodo',
//                        row: 'td',
//                        cssStyle: 'compact-theme'
//                    });
//                }
//                $("#loadingPage").fadeOut();
//                $("#dvContractRec").dialog("option", "title", "Search / Select Contract");
//                $("#dvContractRec").dialog("open");
//                $('#dvLoading').html('');
//            },
//            error:
//                function (data) {
//                    $("#loadingPage").fadeOut();
//                }
//        });
//    }
//    else {
//        $("#theadContractsTodo").show();
//        var v = $(ContractData).length;
//        var contractTags = [];
//        $(ContractData).each(function (i, item) {
//            var sRowKey = item.RowKey;
//            if (allSelectedContracts.indexOf(sRowKey) <= -1) {
//                var sContractTitle = item.ContractTitle;
//                var sContractNumber = item.ContractNumber != null && item.ContractNumber != "" ? item.ContractNumber : "-";
//                var sCounterparty = typeof (item.Counterparty) != "undefined" && item.Counterparty != "" ? item.Counterparty : "-";
//                var checked = "";
//                if ((($.inArray(item.Status, statusRequired) > -1)) && item.InRecycleBin != "Yes" && (item.IsDraft == "No" || item.IsDraft == "")) {
//                    var article = '<tr>';
//                    article += '<td>';
//                    article += '<a id="' + sRowKey + '" href="javascript:void(0);" name="Contracts" style="margin:0 !important;bordor: none !important;" class="linkPickerClear PreserveSpace" onclick="SelectContractRecElement(this);">';
//                    article += sContractTitle + '</a>';
//                    article += '<p id="FinalizedDocumentsUrl" style="display:none;">' + item.FinalizedDocumentsUrl + '</p>';
//                    article += '<p id="DraftDocumentsUrl" style="display:none;">' + item.DraftDocumentsUrl + '</p>';
//                    article += '</td>';
//                    article += '<td>';
//                    article += sCounterparty;
//                    article += '</td>';
//                    article += '<td>';
//                    article += sContractNumber;
//                    article += '</td>';
//                    article += '</tr>';
//                    $("#tbodyContractsTodo").append(article);
//                    if (i == v - 1) {
//                    }
//                    contractTags.push(sContractTitle);
//                }
//            }
//        });
//        //$("#txtSearchBoxTodoForm").autocomplete({
//        //    source: contractTags,
//        //    select: function (evn, uidetails) {
//        //        $("#txtSearchBoxTodoForm").val(uidetails.item.label);
//        //        SearchContractRec1();
//        //    }
//        //});
//        var vCount = $("#tbodyContractsTodo tr").length;
//        if (vCount > 10) {
//            $('#compact-paginationContractsTodo').pagination({
//                items: vCount,
//                itemsOnPage: 10,
//                type: 'tr',
//                typeID: 'tbodyContractsTodo',
//                row: 'td',
//                cssStyle: 'compact-theme'
//            });
//        }
//        $("#loadingPage").fadeOut();
//        $("#dvContractRec").dialog("option", "title", "Search / Select Contract");
//        $("#dvContractRec").dialog("open");
//        $('#dvLoading').html('');
//    }
//}


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
    $("#tbodyContractsTodo").empty();
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
            $("#theadContractsTodo").show();
            var contractTags = [];
            $(data).each(function (i, item) {
                var checked = "";
                var sRowKey = item.RowKey;
                if (allSelectedContracts.indexOf(sRowKey) <= -1) {
                    var sContractTitle = item.ContractTitle;
                    //manoj
                    var SubCounterparty = item.Counterparty;
                    var SubDescription = item.Description;
                    var SubContractNumber = item.ContractNumber;
                    //manoj
                    if ($("#txtSearchBoxTodoForm").val() == "" || (sContractTitle.toLowerCase().indexOf($("#txtSearchBoxTodoForm").val().toLowerCase()) > -1 || SubCounterparty.toLowerCase().indexOf($("#txtSearchBoxTodoForm").val().toLowerCase()) > -1 || SubDescription.toLowerCase().indexOf($("#txtSearchBoxTodoForm").val().toLowerCase()) > -1 || SubContractNumber.toLowerCase().indexOf($("#txtSearchBoxTodoForm").val().toLowerCase()) > -1)) {
                        if ((($.inArray(item.Status, statusRequired) > -1)) && item.InRecycleBin != "Yes" && (item.IsDraft == "No" || item.IsDraft == "")) {
                            var sContractNumber = item.ContractNumber != null && item.ContractNumber != "" ? item.ContractNumber : "-";
                            var sCounterparty = typeof (item.Counterparty) != "undefined" && item.Counterparty != "" ? item.Counterparty : "-";
                            if (browsedContractSel != "" && sRowKey == browsedContractSel) {
                                checked = "checked";
                            }
                            var article = '<tr>';
                            article += '<td>';
                            article += '<a id="' + sRowKey + '" href="javascript:void(0);" name="Contracts" style="margin:0 !important;bordor: none !important;" class="linkPickerClear PreserveSpace" onclick="SelectContractRecElement(this);" title="' + sContractTitle + '"></a>';
                            article += '<p id="FinalizedDocumentsUrl" style="display:none;">' + item.FinalizedDocumentsUrl + '</p>';
                            article += '<p id="DraftDocumentsUrl" style="display:none;">' + item.DraftDocumentsUrl + '</p>';
                            article += '</td>';
                            article += '<td>';
                            article += sCounterparty;
                            article += '</td>';
                            article += '<td>';
                            article += sContractNumber;
                            article += '</td>';
                            article += '</tr>';
                            $("#tbodyContractsTodo").append(article);

                            $("#" + sRowKey).html($('<div/>').text(item.ContractTitle).html());
                            $("#" + sRowKey).attr('title', $('<div/>').text(item.ContractTitle).html());
                            contractTags.push(sContractTitle);
                        }
                    }
                }
            });
            var vCount = $("#tbodyContractsTodo tr").length;
            //$("#txtSearchBoxTodoForm").autocomplete({
            //    source: contractTags,
            //    select: function (evn, uidetails) {
            //        $("#txtSearchBoxTodoForm").val(uidetails.item.label);
            //        SearchContractRec1();
            //    }
            //});
            if (vCount != 0) {
                $('#dvLoading').html('');
                if (vCount > 10) {
                    $('#compact-paginationContractsTodo').css('display', '');
                    $('#compact-paginationContractsTodo').pagination({
                        items: vCount,
                        itemsOnPage: 10,
                        type: 'tbody',
                        typeID: 'tbodyContractsTodo',
                        row: 'tr',
                        cssStyle: 'compact-theme'
                    });
                }
            } else {
                $('#dvLoading').html('<p style="color: #565650;">No Results Found!</p>');
                $("#theadContractsTodo").hide();
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
            $('#dvLoading').html('<p style="color: #565650;">No Results Found!</p>');
            $("#theadContractsTodo").hide();
        }
    });

}

function SearchContractRec1() {
    $('#compact-paginationContractsTodo').css('display', 'none');
    var flag = false;
    if ($("input:radio[name=ApprovalProcess]:checked").val() != "Document")
        flag = true;
    $("#compact-paginationContractsTodo").empty();
    $("#tbodyContractsTodo").empty();
    var searchText = $("#txtSearchBoxTodoForm").val();
    if (searchText != null && searchText != '') {
        $('#dvLoading').css("display", "");
        $('#dvLoading').html('<img src="../../Content/Images/icon/loading.gif"> Searching...');
        if ($(ContractData).length > 0) {
            $("#theadContractsTodo").show();
            var searchContracts = ContractData;
            searchContracts = $.grep(ContractData, function (item, i) {
                return item.ContractTitle.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
                    item.Counterparty.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
                    item.Description.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
                    item.ContractNumber.toLowerCase().indexOf(searchText.toLowerCase()) > -1
            });
            $(searchContracts).each(function (i, item) {
                var sRowKey = item.RowKey;
                if (allSelectedContracts.indexOf(sRowKey) <= -1) {
                    var sContractTitle = item.ContractTitle;
                    var sContractNumber = item.ContractNumber != null && item.ContractNumber != "" ? item.ContractNumber : "-";
                    var sCounterparty = typeof (item.Counterparty) != "undefined" && item.Counterparty != "" ? item.Counterparty : "-";
                    var checked = "";
                    if ((($.inArray(item.Status, statusRequired) > -1) || (item.IsDraft == "Yes" && item.CreatedBy == localStorage.UserName)) && item.InRecycleBin != "Yes") {
                        if (browsedContractSel != "" && sRowKey == browsedContractSel) {
                            checked = "checked";
                        }
                        var article = '<tr>';
                        article += '<td>';
                        article += '<a id="' + sRowKey + '" href="javascript:void(0);" name="Contracts" style="margin:0 !important;bordor: none !important;" class="linkPickerClear PreserveSpace" onclick="SelectContractRecElement(this);" title="' + sContractTitle + '">';
                        article += '</a>';
                        article += '<p id="FinalizedDocumentsUrl" style="display:none;">' + item.FinalizedDocumentsUrl + '</p>';
                        article += '<p id="DraftDocumentsUrl" style="display:none;">' + item.DraftDocumentsUrl + '</p>';
                        article += '</td>';
                        article += '<td>';
                        article += sCounterparty;
                        article += '</td>';
                        article += '<td>';
                        article += sContractNumber;
                        article += '</td>';
                        article += '</tr>';
                        $("#tbodyContractsTodo").append(article);
                        $("#" + sRowKey).html($('<div/>').text(item.ContractTitle).html());
                        $("#" + sRowKey).attr('title', $('<div/>').text(item.ContractTitle).html());
                    }
                }

            });
            var vCount = $("#tbodyContractsTodo tr").length;

            if (vCount != 0) {
                $('#dvLoading').html('');
                if (vCount > 5) {
                    $('#compact-paginationContractsTodo').css('display', '');
                    $('#compact-paginationContractsTodo').pagination({
                        items: vCount,
                        itemsOnPage: 5,
                        type: 'tbody',
                        typeID: 'tbodyContractsTodo',
                        row: 'tr',
                        cssStyle: 'compact-theme'
                    });
                }
            } else {
                $('#dvLoading').html('<p style="color: #565650;">No Results Found!</p>')
                $('#compact-paginationContractsTodo').css('display', 'none');
                $("#theadContractsTodo").hide();
            }
        }
        else {
            SearchContractRec();
        }
    }
}
function SelectContractRecElement(item) {
    var vSelectedElement = null;
    vSelectedElement = $(item);

    $("#txtContractRecElement").val("");
    $("#txtContractRecElementID").val("");

    if (vSelectedElement.length > 0) {

        localStorage.selectedContract = $(vSelectedElement).text();

        $("#txtContractRecElement").val($(vSelectedElement).text());
        browsedContractSel = $(vSelectedElement).attr("id");
        $("#txtContractRecElementID").val($(vSelectedElement).attr("id"));

        $("#imgClearSearch").css('display', '');
        $("#txtContractRecElement").prop('readonly', true);
        $("#imgOpenSearch").removeClass('left_img_68').addClass('left_img_48');
    }
    $("#theadContractsTodo").show();
    $("#dvContractRec").dialog("close");
}

function SelectItem() {
    var selCon = $("#txtContractRecElement").val();
    var contract = $.grep(ContractData, function (item, i) {
        return item.ContractTitle.toLowerCase() == selCon.toLowerCase()
    });

    if (contract.length > 0) {
        localStorage.selectedContract = selCon;

        browsedContractSel = contract[0].RowKey;
        $("#txtContractRecElementID").val(contract[0].RowKey);

        $("#imgClearSearch").css('display', '');
        $("#txtContractRecElement").prop('readonly', true);
        $("#imgOpenSearch").removeClass('left_img_68').addClass('left_img_48');
    }
}

function txtClearSearch() {
    $("#txtContractRecElement").val('');
    $("#txtContractRecElement").prop('readonly', false);
    $("#imgOpenSearch").removeClass('left_img_48').addClass('left_img_68');
    $("#imgClearSearch").css('display', 'none');
    localStorage.removeItem("selectedContract");
}

function ClearForm() {
    $("#txtComment").val("");
    $("input:checkbox[name=MultiselectDoc]").each(function () {
        $(this).attr('checked', true);
    })
    $('#dvLoading').css("display", "none");
    $("#txtContractRecElement").val("");
    $("#txtContractRecElementID").val("");
    $("#txtContractRecElement").prop('readonly', false);
    $("#imgOpenSearch").removeClass('left_img_48').addClass('left_img_68');
    $("#imgClearSearch").css('display', 'none');
    localStorage.removeItem("selectedContract");
}

function GetCorrespondenceContracts(itemid) {
    $.ajax({
        url: '/api/accounts/' + localStorage.AccountID + '/correspondence/contracts?itemid=' + itemid,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        //async: false,
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
                $("#dvAddedContracts").append("This email is saved to " + vContracts + ".");
                $("#dvAddedContracts").css("display", "");
            }
        },
        error: function (data) {

        }
    });
}

function BindContracts(stage) {
    $("#tbodyContractsTodo").empty();
    var txtsearchboxvalue = '';
    if (stage != null && stage != '') {
        if (ContractData.length == 0) {
            txtsearchboxvalue = $("#txtContractRecElement").val();

            newurl = '/api/accounts/' + localStorage.AccountID + '/Contracts/contractsforoutlook?stage=&searchkeyword=' + encodeURIComponent(txtsearchboxvalue);
            $("#loadingPage").fadeIn();
            $.ajax({
                url: newurl,
                type: 'GET',
                dataType: 'json',
                'Content-Type': 'application/json',
                cache: false,
                headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessAreaLocation: localStorage.GlobalBusinessAreaLocation },
                success: function (data) {
                    var arrStatus = ["Ready for Signature", "Awaiting Signatures", "Signed", "Active", "Up for Renewal", "About to Expire", "On Hold", "Replaced", "Expired", "Cancelled", "Archived"];
                    var tempData = $.grep(data, function (item, i) {
                        return (statusRequired.indexOf(item.Status) > -1 || (item.IsDraft == "Yes" && item.CreatedBy == localStorage.UserName)) && item.InRecycleBin != "Yes"
                    });
                    ContractData = tempData;
                    if (typeof (localStorage.AllContract) == "undefined") {
                        localStorage.setItem('AllContract', JSON.stringify(ContractData));
                    }
                    else {
                        localStorage.AllContract = JSON.stringify(ContractData);
                    }
                    tempData = ContractData.sort(function (a, b) {
                        return new Date(a.Modified).getTime() - new Date(b.Modified).getTime()
                    });
                    var conTitle = $.map(tempData, function (item, i) {
                        if (allSelectedContracts.indexOf(item.RowKey) <= -1) {
                            return item.ContractTitle
                        }
                    })
                    //conTitle = conTitle.slice(0, 30);

                    $("#txtContractRecElement").autocomplete({
                        source: conTitle,
                        select: function (evn, uidetails) {
                            $("#txtContractRecElement").val(uidetails.item.label);
                            SelectItem();
                        },
                        response: function (event, ui) {
                            if (ui.content.length === 0) {
                                $("#txtContractRecElement").val("");
                            }
                        }
                    });

                    $("#loadingPage").fadeOut();
                },
                error:
                    function (data) {
                        $("#loadingPage").fadeOut();
                    }
            });
        }
        else {
            ContractData = ContractData.sort(function (a, b) {
                return new Date(a.Modified).getTime() - new Date(b.Modified).getTime()
            });
            var conTitle = $.map(ContractData, function (item, i) {
                if (allSelectedContracts.indexOf(item.RowKey) <= -1) {
                    return item.ContractTitle
                }
            })
            //conTitle = conTitle.slice(0, 30);

            $("#txtContractRecElement").autocomplete({
                source: conTitle,
                select: function (evn, uidetails) {
                    $("#txtContractRecElement").val(uidetails.item.label);
                    SelectItem();
                },
                response: function (event, ui) {
                    if (ui.content.length === 0) {
                        $("#txtContractRecElement").val("");
                    }
                }
            });
        }
    }
    else {
        $("#theadContractsTodo").show();
        var v = $(ContractData).length;
        $(ContractData).each(function (i, item) {
            var sRowKey = item.RowKey;
            if (allSelectedContracts.indexOf(sRowKey) <= -1) {
                var sContractTitle = item.ContractTitle;
                var sContractNumber = item.ContractNumber != null && item.ContractNumber != "" ? item.ContractNumber : "-";
                var sCounterparty = typeof (item.Counterparty) != "undefined" && item.Counterparty != "" ? item.Counterparty : "-";
                var checked = "";
                if ((($.inArray(item.Status, statusRequired) > -1)) && item.InRecycleBin != "Yes" && (item.IsDraft == "No" || item.IsDraft == "")) {
                    var article = '<tr>';
                    article += '<td>';
                    article += '<a id="' + sRowKey + '" href="javascript:void(0);" name="Contracts" style="margin:0 !important;bordor: none !important;" class="linkPickerClear PreserveSpace" onclick="SelectContractRecElement(this);" title="' + sContractTitle + '">';
                    article += '</a>';
                    article += '<p id="FinalizedDocumentsUrl" style="display:none;">' + item.FinalizedDocumentsUrl + '</p>';
                    article += '<p id="DraftDocumentsUrl" style="display:none;">' + item.DraftDocumentsUrl + '</p>';
                    article += '</td>';
                    article += '<td>';
                    article += sCounterparty;
                    article += '</td>';
                    article += '<td>';
                    article += sContractNumber;
                    article += '</td>';
                    article += '</tr>';
                    $("#tbodyContractsTodo").append(article);
                    $("#" + sRowKey).html($('<div/>').text(item.ContractTitle).html());
                    $("#" + sRowKey).attr('title', $('<div/>').text(item.ContractTitle).html());
                    if (i == v - 1) {
                    }
                }
            }
        });

        var vCount = $("#tbodyContractsTodo tr").length;
        if (vCount > 5) {
            $('#compact-paginationContractsTodo').pagination({
                items: vCount,
                itemsOnPage: 5,
                type: 'tbody',
                typeID: 'tbodyContractsTodo',
                row: 'tr',
                cssStyle: 'compact-theme'
            });
        }


        $('#dvLoading').html('');
    }
}

function OpenSearch() {
    if ($("#txtContractRecElement").val() != "") {
        $("#txtSearchBoxTodoForm").val($("#txtContractRecElement").val());
        $(".ui-autocomplete").css('display', 'none');
        SearchContractRec1();
        $("#dvContractRec").dialog("option", "title", "Search and Select Contract");
        $("#dvContractRec").dialog("open");
    }
    else {
        //manoj
        $("#tbodyContractsTodo").empty();
        $("#compact-paginationContractsTodo").empty();
        $('#theadContractsTodo').css('display', 'none');
        //manoj
        $("#txtSearchBoxTodoForm").val('');
        $("#tbodyContractsTodo").empty();
        $("#dvContractRec").dialog("option", "title", "Search and Select Contract");
        $("#dvContractRec").dialog("open");
    }
}

function ClearSearch() {
    $('#compact-paginationContractsTodo').css('display', 'none');
    $("#txtSearchBoxTodoForm").val('');
    $("#tbodyContractsTodo").empty();
    $("#theadContractsTodo").hide();
}