$('#nav li:has(ul)').doubleTapToGo();
var thisBusinessAreaName = "";
var thisContractAreaName = "";
var PipelineApprovalTextarea;
var workflowurltoshow = "";
$(function () {

    $("#mid-section1").click(function () {
        if (!$('#user-vmenu').hide()) {
            $('#user-vmenu').hide();
        }
    })

    if (typeof localStorage.GlobalBusinessAreaLocation !== 'undefined') {
        if (localStorage.GlobalBusinessAreaLocation == "All" || localStorage.GlobalBusinessAreaLocation == "") {
            $("#heading_requests").text("Request");
            $("#qvAllRequests").css('display', 'none');
        } else {
            //if global business area selected, do not show Create Contract menu
            $("#newContract").css('display', 'none');
            $("#newContract1").css('display', '');

            thisContractAreaName = localStorage.GlobalBusinessAreaLocation.split('>')[0].trim();
            thisBusinessAreaName = localStorage.GlobalBusinessArea + ';' + thisContractAreaName;//Business Area +';'+ Contract Area
            $("#dashmain").attr("src", "/Content/images/icon/gen.png");
            $("#heading_requests").text(localStorage.GlobalBusinessAreaLocation);

        }
    } else {
        $("#qvAllRequests").css('display', 'none');
    }
});
var savedViewNameFromViewTable = "";
var listContracts = [];
$(document).ready(function () {

    allowOnlyNumberInInputBox("txtDuration");
    colorLink('spnMyRequests', true);
    $('.showtip').cluetip({ splitTitle: '|' });
    $("#sample").click(function (e) {
        e.stopPropagation();

        if (!$('#user-vmenu').hide()) {
            $('#user-vmenu').hide();
        } else {
            $('#user-vmenu').show();
        }
    })

    var RequestTypeMenuLength = 0;
    var RequestTypeItems = [];
    var MoreItemsToAppend = 0;



    GetSavedViews();

    BindRequestTypes();

    BindStatus();
    CheckBulkUpload();
});
$(window).on('load', function() {

    $('.nicEdit-panelContain').parent().width('100%');
    $('.nicEdit-panelContain').parent().next().width('100%');
    $('.nicEdit-main').width("99%");
});
function BindRequestTypes() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/requesttypes',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {

            var appendItemsToContractType = 0;
            var datalenght = data.length;
            if (thisContractAreaName != "") {
                //Get contract area settings
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/detailsbyname?businessareaname=' + encodeURIComponent(thisContractAreaName),
                    type: 'GET',
                    dataType: 'json',
                    headers: {
                        'eContracts-ApiKey': localStorage.APIKey
                    },
                    async: false,
                    success: function (data1) {
                        for (var i = 0; i < datalenght; i++) {
                            var item = data[i];
                            if (data1.RequestType.trim().split(';').indexOf(item.RequestType) > -1) {
                                var myUrl = '/Pipeline/CreateRequest?RequestType=' + encodeURI(item.RequestType);
                                var article = '<li><a href=' + myUrl + '>' + item.RequestType + '</a></li>';

                                $("#ulAllRequestTypes").append(article);

                                var find = " ";
                                var re = new RegExp(find, 'g');

                                var str = item.RequestType.replace(re, '');
                                $("#filterRequestType").append('<option value=' + str + ' title="' + item.RequestType + '">' + item.RequestType + '</option>')


                                if (i < 10) {
                                    $("#menu3").append(article);
                                }
                            }
                        }

                    },
                    error: function (data1) {
                        $("#menu3").append('<li style="color:red;">No Request Type Available</li>');

                    }
                });
            } else {
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];
                    var myUrl = '/Pipeline/CreateRequest?RequestType=' + encodeURI(item.RequestType);
                    var article = '<li><a href=' + myUrl + '>' + item.RequestType + '</a></li>';

                    $("#ulAllRequestTypes").append(article);

                    var find = " ";
                    var re = new RegExp(find, 'g');

                    var str = item.RequestType.replace(re, '');
                    $("#filterRequestType").append('<option value=' + str + ' title="' + item.RequestType + '">' + item.RequestType + '</option>')


                    if (i < 10) {
                        $("#menu3").append(article);
                    }
                }
            }


            $("#filterRequestType option[value='All']").prop("selected", true);


            $('#compact-pagination-ContractTypes').pagination({
                items: data.length,
                itemsOnPage: 10,
                type: 'ul',
                row: 'li',
                typeID: 'ulAllRequestTypes',
                cssStyle: 'compact-theme'
            });
        },
        error:
            function (data) {
                $("#btnRequestTypeViewAll").css('display', 'none');
                $("#menu3").append('<li style="color:red;">No Contract Type Available</li>');
            }
    });
}



function BindStatus() {
    $.ajax({
        url: 'api/accounts/' + localStorage.AccountID + '/Requests/requeststatus',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: false,
        success: function (requestsstatuses) {
            var datalenght = requestsstatuses.length;
            for (var i = 0; i < datalenght; i++) {
                var item = requestsstatuses[i];
                var find = " ";
                var re = new RegExp(find, 'g');

                var str = item.RequestStatus.replace(re, '');

                $("#filterStatus").append('<option value="' + str + '" title="' + item.RequestStatus + '">' + item.RequestStatus + '</option>')
            }
            $("#filterStatus option[value='All']").prop("selected", true);
        }
    });
}

function CheckBulkUpload() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/feature?featureid=3',
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        processData: false,
        async: false,
        success: function (data) {
            if (data.Status == "ON") {
                $("#bulkUpload").css("display", "");
            }
        },
        error: function () {

        }

    });
}

$(document).ready(function () {

    $("#addNewView").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Add View",
        modal: true,
        resizable: true,
        buttons: {
            "Save": function () { SaveView(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $('#btnAddViewRequest').click(function () {
        $("#txtViewID").val("");
        $("#txtViewName").val("");

        $("#addNewView").dialog("option", "title", "New View");
        $("#addNewView").dialog("open");
    });





    //get view names from query string
    var vViewName = "";

    if (vViewName == '') {
        var obj = { name: "My Requests" };
        quickViewDisplay(obj);
        $("#filteroptiontype").css('display', 'none');
    } else if (vViewName == 'Pipeline') {
        var obj = { name: "Draft & New Requests" };
        quickViewDisplay(obj);
    } else if (vViewName == 'Assigned') {
        var obj = { name: "Assigned" };
        quickViewDisplay(obj);
    } else if (vViewName == 'Past') {
        var obj = { name: "Past Requests" };
        quickViewDisplay(obj);
    } else if (vViewName == 'Active') {
        var obj = { name: "Active" };
        quickViewDisplay(obj);
    }
    else if (vViewName == 'Draft') {
        var obj = { name: "Draft" };
        quickViewDisplay(obj);
    }
    else if (vViewName == 'Pending') {
        var obj = { name: "Pending" };
        quickViewDisplay(obj);
    }
    else if (vViewName == 'All') {
        GetAllRequests();
    }

    BindPeople();
    //Contract Type Popup
    $("#popupAllRequestTypes").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Request Types",
        modal: true,
        resizable: true
    });

    $('#btnRequestTypeViewAll').click(function () {
        $('#divToAppendCreateContract').css('display', 'none');
        $('#cbp-hrmenu > ul > li').removeClass('cbp-hropen');
        $("#popupAllRequestTypes").dialog("option", "title", "Request Types");
        $("#popupAllRequestTypes").dialog("open");
    });

    //Contract Type Popup
    $("#popupAllContractTemplates").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Contract Templates",
        modal: true,
        resizable: true,
        show: {
            effect: "fade",
            duration: 500
        },
        hide: {
            effect: "fade",
            duration: 500
        },
    });

    $('#btnContractTemplatesViewAll').click(function () {
        $('#cbp-hrmenu > ul > li').removeClass('cbp-hropen');
        $("#popupAllContractTemplates").dialog("option", "title", "Contract Templates");
        $("#popupAllContractTemplates").dialog("open");
    });



    $("#contractLogsPopup").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Request History",
        modal: true,
        buttons: {
            "Close": function () { $(this).dialog("close"); }
        }
    });
    $("#shareContract").dialog({
        autoOpen: false, closeText: "",
        width: "75%",
        title: "Share Contract Record",
        modal: true,
        buttons: {
            "Share": function () {
                ShareContract();
            },
            Cancel: function () {
                $(this).dialog("close");
                ClearShareForm();
            }
        },
        close: function (event, ui) {

        }
    });
    $("#allAlerts").dialog({
        autoOpen: false, closeText: "",
        width: "60%",
        title: "Alerts",
        modal: true,
        resizable: true,
        buttons: {
            Close: function () {
                $(this).dialog("close");
            }
        }
    });
    $("#addEditStatus").dialog({
        autoOpen: false, closeText: "",
        width: "40%",
        minHeight: "80%",
        title: "Change Status",
        modal: true,
        buttons: {
            "OK": function () { if (imgcheckgeneral()) { $(this).dialog("close"); applyFilter(); } },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
    $("#addEditPeople").dialog({
        autoOpen: false, closeText: "",
        width: "65%",
        title: "People and Permissions",
        modal: true,
        buttons: {
            "OK": function () { if (savePeople()) { $(this).dialog("close"); } },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#contractRenewal").dialog({
        autoOpen: false, closeText: "",
        width: "80%",
        title: "Contract Renewal",
        modal: true,
        buttons: {
            "OK": function () { ManageContractRenewal(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        close: function (event, ui) {
            if ($("#hdChangeStatusClick").val() == 'Y') {
                $('#addEditStatus').dialog('open'); $("#hdChangeStatusClick").val("");
            }
        }
    });

    $("#manualRenewal").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Manual Renewal",
        modal: true,
        buttons: {
            "OK": function () { ManualRenewal(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#addEditStatusMultiple").dialog({
        autoOpen: false, closeText: "",
        width: "40%",
        minHeight: "80%",
        title: "Change Status",
        modal: true,
        buttons: {
            "OK": function () { if (changestatusmultiple()) { $(this).dialog("close"); applyFilter(); } },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
    $("#addEditPeopleMultiple").dialog({
        autoOpen: false, closeText: "",
        width: "45%",
        title: "People",
        modal: true,
        buttons: {
            "OK": function () { if (savePeopleM()) { $(this).dialog("close"); } },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#dvWorkflow").dialog({
        autoOpen: false, closeText: "",
        width: "70%",
        title: "Workflow",
        modal: true,
        height: "auto",
        buttons: {
            "Start": function () { StartWorkflow(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

});



$('#btnNewContractCancel').click(function () {

    $("#divToAppendCreateContract").hide();
});





function getQuickViewLinkName(qvName) {
    var splitName = qvName.split(':');
    var rName = splitName[splitName.length - 1];
    rName = $.trim(rName);
    //console.log(rName);
    return rName;
}


function SaveView() {
    if ($("#txtViewName").val() == "") {

        swal("", "Enter View Name.");
    }
    else {

        var query = "Status:";
        $("#liFiltersStatus").each(function (i, item) {
            var str = item.textContent;
            query += str + ',';
        });

        query += ";RequestType:";
        $("#liFiltersType span").each(function (i, item) {
            var str = item.textContent;
            query += str + ',';
        });

        $("#liFiltersUserType span").each(function (i, item) {
            var str = item.textContent;
            query += ';' + str + ":" + localStorage.UserName;
        });

        query += ";RenewalDate:";
        $("#liFiltersRenewal span").each(function (i, item) {
            var str = item.textContent;
            query += str + ',';
        });

        query += ";ExpiryDate:";
        $("#liFiltersExpiration span").each(function (i, item) {
            var str = item.textContent;
            query += str + ',';
        });

        query += ";";

        var qvName = "";
        if ($('#liFiltersQuickView').text() != "") {
            qvName = getQuickViewLinkName($('#liFiltersQuickView').text());
        }

        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/savedview',
            type: 'POST',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            data: {
                RowKey: $("#txtViewID").val(),
                ViewName: $("#txtViewName").val(),
                SearchKeyword: $("#txtSearchBox").val(),
                SortBy: $("#txtSortBy").val(),
                ViewFor: 'Request',
                ViewQuery: query,
                DefaultViewName: qvName,
                CreatedBy: localStorage.UserName,
                ModifiedBy: localStorage.UserName
            },
            cache: false,
            success: function (person) {
                if (person == "Please provide other view name.") {
                    swal("", person);
                }
                else {
                    swal("", person);
                    $("#txtViewName").val("")
                    GetSavedViews();
                    $("#addNewView").dialog("close");
                }
            }
        });
    }
}


function GetSavedViews() {
    $('#liRequestViews').empty();
    //Get Contract views
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/savedview?viewfor=Request&userid=',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {

            $("#liRequestViews").empty();

            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                var removeBtn = '';
                if (localStorage.UserType.indexOf("Global Contract Owner") >= 0 || localStorage.UserType.indexOf("Global Administrator") >= 0 || localStorage.UserName == item.CreatedBy)
                    removeBtn = '<a href="javascript:void(0);"><img title="Delete" src="../Content/Images/close-quick.png" onclick="deleteSavedView(this)" id=' + item.RowKey + ' /></a>';
                var article = '<li><p><a href="javascript:void(0)" onclick="javascript:savedViewDisplay(this)" id="' + item.RowKey + '" name="' + item.ViewName + '">' + item.ViewName + '</a></p>' + removeBtn + '</li>';
                $("#liRequestViews").append(article);
            }
        },
        error:
            function (data) {
                $('#liRequestViews').empty();
                $("#liRequestViews").append('<p class="f_p-error">No View Available</p>');
            }
    });
}


function getsavedViewFilter(obj) {
    if (obj.name == "Draft & New Contracts") {

        $("#filteroptiontype").css('display', '');
        $("#filteroptiondates").css('display', 'none');
        $("#filteroptionstatus").css('display', '');
        $("#filteroption1").css('display', 'none');
        $("#filteroptionrenewdates").css('display', 'none');
    }
    else if (obj.name == "Upcoming Renewals") {
        $("#filteroptiontype").css('display', '');
        $("#filteroptiondates").css('display', 'none');
        $("#filteroptionstatus").css('display', 'none');
        $("#filteroption1").css('display', 'none');
        $("#filteroptionrenewdates").css('display', '');
    }
    else if (obj.name == "Upcoming Expirations") {
        $("#filteroptiontype").css('display', '');
        $("#filteroptiondates").css('display', '');
        $("#filteroptionstatus").css('display', 'none');
        $("#filteroption1").css('display', 'none');
        $("#filteroptionrenewdates").css('display', 'none');
    }
    else if (obj.name == "Recently Active & Renewed Contracts") {
        $("#filteroptiontype").css('display', '');
        $("#filteroptiondates").css('display', 'none');
        $("#filteroptionstatus").css('display', 'none');
        $("#filteroption1").css('display', '');
        $("#filteroptionrenewdates").css('display', 'none');
    }
    else if (obj.name == "Past Contracts") {
        $("#filteroptiontype").css('display', '');
        $("#filteroptiondates").css('display', 'none');
        $("#filteroptionstatus").css('display', '');
        $("#filteroption1").css('display', 'none');
        $("#filteroptionrenewdates").css('display', 'none');
    }

    $("#btnAddViewRequest").css('display', 'none');
}



function savedViewDisplay(obj) {
    colorLink('liRequestViews a', false);
    $('#liFiltersQuickView').empty();
    colorLink('spnMyRequests', false);
    colorLink('spnSubmittedMyRequests', false);
    colorLink('spnUpcomingRenewals', false);
    colorLink('spnUpcomingExpirations', false);
    colorLink('spnRecentlyActiveRenewedContracts', false);
    colorLink('spnUnassignedContracts', false);
    colorLink('spnPastRequests', false);
    colorLink('spnAllRequests', false);
    colorLink(obj.id, true);

    $("#dvSrhBox").css('display', '');
    $("#btnFilter").css('display', 'inline');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/savedview?viewid=' + obj.id + '&userid=' + localStorage.UserID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        "Content-Type": "application/json",
        cache: false,
        success: function (savedviewentity) {
            $("#filterUserType option:selected").prop('selected', false);
            $("#filterStatus option:selected").prop('selected', false);
            $("#filterDates option:selected").prop('selected', false);
            $("#filterRenewDates option:selected").prop('selected', false);
            $("#filterRequestType option:selected").prop('selected', false);

            $("#txtSearchBox").val(savedviewentity.SearchKeyword);
            selectedSortOption = savedviewentity.SortBy;
            $('#tdSort a').each(function (i, item) {
                item.style.backgroundColor = "";
            });

            var defaultviewname = savedviewentity.DefaultViewName;
            savedViewNameFromViewTable = defaultviewname;
            var savedview = { name: defaultviewname }
            getsavedViewFilter(savedview);

            for (var i = 0; i <= savedviewentity.ViewQuery.split(';').length; i++) {
                if (savedviewentity.ViewQuery.split(';')[i] != null) {
                    var columnvalue = savedviewentity.ViewQuery.split(';')[i].split(':')[0]
                    if (columnvalue != "") {
                        switch (columnvalue) {
                            case "Status":
                                var values1 = savedviewentity.ViewQuery.split(';')[i].split(':')[1].split(',');

                                for (var j = 0; j < values1.length; j++) {
                                    var find = " ";
                                    var re = new RegExp(find, 'g');

                                    values1[j] = values1[j].replace(re, '');

                                    $("#filterStatus option[value='" + values1[j] + "']").prop("selected", true);
                                }
                                break;
                            case "RequestType":
                                var values1 = savedviewentity.ViewQuery.split(';')[i].split(':')[1].split(',');

                                for (var j = 0; j < values1.length; j++) {
                                    var find = " ";
                                    var re = new RegExp(find, 'g');

                                    values1[j] = values1[j].replace(re, '');

                                    $("#filterRequestType option[value='" + values1[j] + "']").prop("selected", true);
                                }
                                break;
                            case "RenewalDate":
                                var values1 = savedviewentity.ViewQuery.split(';')[i].split(':')[1].split(',');

                                for (var j = 0; j < values1.length; j++) {
                                    var find = " ";
                                    var re = new RegExp(find, 'g');

                                    values1[j] = values1[j].replace(re, '');

                                    var optionval = values1[j];
                                    var newval = "";
                                    if (optionval == "<7days")
                                        newval = "7";
                                    else if (optionval == "<15days")
                                        newval = "15";
                                    else if (optionval == "<30days")
                                        newval = "30";
                                    else if (optionval == "<60days")
                                        newval = "60";
                                    else if (optionval == "<90days")
                                        newval = "90";
                                    else if (optionval == ">90days")
                                        newval = "90 daysgt";
                                    else if ((optionval == "Overdue/Expired") || (optionval == "Overdue"))
                                        newval = "Overdue";


                                    $("#filterRenewDates option[value='" + newval + "']").prop("selected", true);
                                }
                                break;
                            case "ExpiryDate":
                                var values1 = savedviewentity.ViewQuery.split(';')[i].split(':')[1].split(',');

                                for (var j = 0; j < values1.length; j++) {
                                    var find = " ";
                                    var re = new RegExp(find, 'g');

                                    values1[j] = values1[j].replace(re, '');

                                    var optionval = values1[j];
                                    var newval = "";
                                    if (optionval == "<7days")
                                        newval = "7";
                                    else if (optionval == "<15days")
                                        newval = "15";
                                    else if (optionval == "<30days")
                                        newval = "30";
                                    else if (optionval == "<60days")
                                        newval = "60";
                                    else if (optionval == "<90days")
                                        newval = "90";
                                    else if (optionval == ">90days")
                                        newval = "90 daysgt";
                                    else if ((optionval == "Overdue/Expired") || (optionval == "Overdue"))
                                        newval = "Overdue";


                                    $("#filterDates option[value='" + newval + "']").prop("selected", true);
                                }
                                break;
                            default:
                                var values1 = savedviewentity.ViewQuery.split(';')[i].split(':')[0];
                                var newval = "";
                                switch (values1) {
                                    case "Contract Manager":
                                        newval = 'ContractManagers';
                                        break;
                                    case "Business Owner":
                                        newval = 'BusinessOwners';
                                        break;
                                    case "Creator":
                                        newval = 'CreatedBy';
                                        break;
                                    case "Approver":
                                        newval = 'Approvers';
                                        break;
                                    case "Reviewer":
                                        newval = 'Reviewers';
                                        break;
                                    case "Signee":
                                        newval = 'Signees';
                                        break;
                                }

                                $("#filterUserType option[value='" + newval + "']").prop("selected", true);
                                break;
                        }
                    }
                }
            }

            applyFilter();
            savedViewNameFromViewTable = "";
        }
    });
}



function deleteSavedView(n) {
    var viewName = $("#" + n.id).attr('name');
    swal({
        title: '',
        text: "Are you sure you want to <span style=\"font-weight:700\">delete</span> this view?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        html: true
    },
     function (confirmed) {
         if (confirmed) {
             var viewId = n.id;
             $.ajax({
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/savedview?viewid=' + viewId,
                 type: 'DELETE',
                 dataType: 'json',
                 headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                 cache: false,
                 success: function (data) {
                     swal("", data);
                     GetSavedViews();
                 }
             });
         }
         return;
     });

}





function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function GetAllRequests() {

    document.getElementById('btnAddViewRequest').style.display = 'none';
    $("#spResult").empty();
    colorLink('spnAllRequests', true);
    colorLink('liRequestViews a', false);
    colorLink('spnDraft', false);
    colorLink('spnMyRequests', false);
    colorLink('spnRecentlyActiveContracts', false);
    colorLink('spnRecentlyRenewedContracts', false);
    colorLink('spnUnassignedContracts', false);
    colorLink('spnSubmittedMyRequests', false);
    colorLink('spnUpcomingRenewals', false);
    colorLink('spnUpcomingExpirations', false);
    colorLink('spnRecentlyActiveRenewedContracts', false);
    colorLink('spnPastRequests', false);

    $("#btnFilter").css('display', 'inline');
    $("#dvSrhBox").css('display', '');
    $("#showAll").css('display', 'inline');
    $("#showAll").text('Showing All Requests');

    clearFilterSelection();
    $('#tdSort a').each(function (i, item) {
        item.style.backgroundColor = "";
    });

    $("#liFiltersQuickView").empty();
    $('#liFiltersQuickView').html('<span>Showing search result for : <small>All Requests<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');

    $('#liFiltersQuickView').css('display', 'none');
    document.getElementById('btnAddViewRequest').style.display = 'none';

    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
    var baname = ";";
    if (thisBusinessAreaName == "" || thisBusinessAreaName == "All") {
    } else {
        baname = thisBusinessAreaName;
    }

    applyFilter();
    BindContractStatusFilter("All Requests")
    $("#filteroptiontype").css('display', '');
    $("#filteroptionstatus").css('display', '');
    $("#filteroptiondates").css('display', 'none');
    $("#filteroption1").css('display', 'none');
    $("#filteroptionrenewdates").css('display', 'none');
}


function GetData(data) {

    var resultfound = true;
    listContracts = data;
    CreateRequestList(0);

    return resultfound;
}

function CreateRequestList(page) {
    var startIndex = page * 20;
    var endIndex = startIndex + 20;
    if (endIndex > listContracts.length) endIndex = listContracts.length;
    $("#spResult").html((startIndex + 1) + '&nbsp;to&nbsp;' + endIndex + '&nbsp;of&nbsp;' + listContracts.length);
    var resultfound = false;
    var sortby = '';
    var fieldType = '';
    var contractTags = [];
    switch (selectedSortOption) {
        case "Recently Updated":
            sortby = 'Timestamp';
            fieldType = 'date';
            break;
        case "Renewal Date":
            sortby = 'RenewalDate';
            fieldType = 'date';
            break;
        case "Expiration Date":
            sortby = 'ExpiryDate';
            fieldType = 'date';
            break;
        case "Contract Value":
            sortby = 'ContractValue';
            break;
        case "Contract Number":
            sortby = 'ContractNumber';
            break;
        case "Created Date":
            sortby = 'Created';
            fieldType = 'date';
            break;
        default:
            sortby = '';
            break;
    }
    $("#listContracts").empty();
    for (var j = startIndex; j < endIndex; j++) {
        var item = listContracts[j];
        if (item != null) {
            var vPermission = 'openmenu';

            if (item.Permission == 'Manage') {
                vPermission = 'openmenu';
            }
            else if (item.Permission == 'Contribute') {
                vPermission = 'openmenuContribute';
            }
            else if (item.Permission == 'Collaborate') {
                vPermission = 'openmenuCollaborate';
            }
            else if (item.Permission == 'View') {
                vPermission = 'openmenuView';
            }

            var myUrl = '/Pipeline/RequestDetails?RequestID=' + encodeURI(item.RowKey);

            var article = '';
            article = '<li>';

            var vContractNumber = '';

            contractTags.push(item.ContractTitle);
            article += '<span>&nbsp;</span>';
            article += '<p id="RequestID" style="display:none;">' + item.RowKey + '</p>';
            article += '<p id="RequestTitle" style="display:none;">' + item.RequestTitle + '</p>';
            article += '<p id="RequestType" style="display:none;">' + item.RequestType + '</p>';
            article += '<p id="ContractArea" style="display:none;">' + item.ContractArea + '</p>';
            article += '<p id="BusinessArea" style="display:none;">' + item.BusinessArea + '</p>';
            article += '<p id="BusinessAreaPath" style="display:none;">' + item.BusinessAreaPath + '</p>';
            article += '<p id="ApprovalWorkflow" style="display:none;">' + item.ApprovalWorkflow + '</p>';
            article += '<p id="ReviewWorkflow" style="display:none;">' + item.ReviewWorkflow + '</p>';
            article += '<p id="Status" style="display:none;">' + item.Status + '</p>';
            if (item.InRecycleBin == "Yes") {
                article += '<p class="margin-left-20"><i><a href=javascript:void(0)>' + item.RequestTitle + '</a>';
            } else {
                article += '<p> <input name="" type="checkbox" onclick="checkMultipleRequests(this);" id=' + item.RowKey + ' value="" /><i><a href=' + myUrl + '>' + item.RequestTitle + '</a><img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="' + vPermission + '" />';
            }

            article += '<small>' + item.RequestType;// + ' | ' + item.Permission;
            if (sortby != '') {

                if (item[sortby] != null && item[sortby] != "") {
                    if (fieldType == 'date') {
                        article += ' |&nbsp;<var title="' + selectedSortOption + '">' + moment(new Date(item[sortby])).format('Do MMM YYYY') + '</var>';
                    }
                    else {
                        article += ' |&nbsp;<var title="' + selectedSortOption + '">' + item[sortby] + '</var>';
                    }
                }
            }
            else {
                article += '</small>';
            }
            article += '</i></p>';
            if (item.InRecycleBin == "Yes") {
                article += '<b class="status_blue">In Recycle Bin</b>';
            } else {
                if (item.Status == "New") {
                    article += '<b class="status_yellow">' + item.Status + '</b>';
                }
                else if (item.Status == "Drafting") {
                    article += '<b class="status_yellow">' + item.Status + '</b>';
                }
                else if (item.Status == "Awaiting Review") {
                    article += '<b class="status_yellow">' + item.Status + '</b>';
                }
                else if (item.Status == "Awaiting Approval") {
                    article += '<b class="status_yellow">' + item.Status + '</b>';
                }
                else if (item.Status == "In Negotiation") {
                    article += '<b class="status_yellow">' + item.Status + '</b>';
                }
                else if (item.Status == "Ready for Signature") {
                    article += '<b class="status_green">' + item.Status + '</b>';
                }
                else if (item.Status == "Awaiting Signatures") {
                    article += '<b class="status_yellow">' + item.Status + '</b>';
                }
                else if (item.Status == "Signed") {
                    article += '<b class="status_green">' + item.Status + '</b>';
                }
                else if (item.Status == "Active") {
                    article += '<b class="status_green">' + item.Status + '</b>';
                }
                else if (item.Status == "Up for Renewal") {
                    article += '<b class="status_red">' + item.Status + '</b>';
                }
                else if (item.Status == "Renewed") {
                    article += '<b class="status_green">' + item.Status + '</b>';
                }
                else if (item.Status == "Extended") {
                    article += '<b class="status_green">' + item.Status + '</b>';
                }
                else if (item.Status == "On Hold") {
                    article += '<b class="status_yellow">' + item.Status + '</b>';
                }
                else if (item.Status == "Replaced") {
                    article += '<b class="status_blue">' + item.Status + '</b>';
                }
                else if (item.Status == "Expired") {
                    article += '<b class="status_blue">' + item.Status + '</b>';
                }
                else if (item.Status == "Cancelled") {
                    article += '<b class="status_blue">' + item.Status + '</b>';
                }
                else if (item.Status == "Terminated") {
                    article += '<b class="status_blue">' + item.Status + '</b>';
                }
                else if (item.Status == "Archived") {
                    article += '<b class="status_blue">' + item.Status + '</b>';
                }
                else {
                    if (item.Status == "0" || item.Status == "" || item.Status == "undefined") {
                        article += '<b class="status_red">Not Assigned</b>';

                    } else {
                        article += '<b class="status_red">' + item.Status + '</b>';
                    }
                }
            }
            article += '</li>';
            $("#listContracts").append(article);
            resultfound = true;
        }
    }


    $('#compact-pagination').pagination({
        items: listContracts.length,
        itemsOnPage: 20,
        type: 'ul',
        row: 'li',
        typeID: 'listContracts',
        cssStyle: 'compact-theme',
    });
    $(".openmenu").contextMenu({ menu: 'myMenu', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("i").parent("p").parent("li"), pos); });
    $(".openmenuCollaborate").contextMenu({ menu: 'myMenuCollaborate', leftButton: true }, function (action, el, pos) {
        contextMenuWork(action, el.parent("i").parent("p").parent("li"), pos);
    });
    $(".openmenuContribute").contextMenu({ menu: 'myMenuContribute', leftButton: true }, function (action, el, pos) {
        contextMenuWork(action, el.parent("i").parent("p").parent("li"), pos);
    });
    $(".openmenuView").contextMenu({ menu: 'myMenuView', leftButton: true }, function (action, el, pos) {
        contextMenuWork(action, el.parent("i").parent("p").parent("li"), pos);
    });

    $(".openmenu").click(function () {
        $("#dvfilter").hide();
    });
    $(".openmenuCollaborate").click(function () {
        $("#dvfilter").hide();
    });
    $(".openmenuContribute").click(function () {
        $("#dvfilter").hide();
    });
    $(".openmenuView").click(function () {
        $("#dvfilter").hide();
    });
}


function colorLink(objId, tobecolored) {
    if (tobecolored) {
        $('#' + objId).addClass("active_quick_view");
    }
    else {
        $('#' + objId).removeClass("active_quick_view");
    }
}




function BindContractStatusFilter(obj) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/requeststatus',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        async: false,
        success: function (requeststatuses) {
            $("#filterStatus").empty();
            if (obj == "Past Requests") {
                $("#filterStatus").append('<option value="Any" title="Any">Any</option>')
                $("#filterStatus").append('<option value="OnHold" title="On Hold">On Hold</option>')
                $("#filterStatus").append('<option value="Replaced" title="Replaced">Replaced</option>')
                $("#filterStatus").append('<option value="Expired" title="Expired">Expired</option>')
                $("#filterStatus").append('<option value="Cancelled" title="Cancelled">Cancelled</option>')
                $("#filterStatus").append('<option value="Terminated" title="Terminated">Terminated</option>')
                $("#filterStatus").append('<option value="Archived" title="Archived">Archived</option>')

            } else if (obj == "Pipeline") {
                $("#filterStatus").append('<option value="Any" title="Any">Any</option>')
                $("#filterStatus").append('<option value="New" title="New">New</option>')
                $("#filterStatus").append('<option value="Drafting" title="Any">Drafting</option>')
                $("#filterStatus").append('<option value="AwaitingReview" title="Awaiting Review">Awaiting Review</option>')
                $("#filterStatus").append('<option value="Reviewed" title="Reviewed">Reviewed</option>')
                $("#filterStatus").append('<option value="AwaitingApproval" title="Awaiting Approval">Awaiting Approval</option>')
                $("#filterStatus").append('<option value="Approved" title="Approved">Approved</option>')
                $("#filterStatus").append('<option value="InNegotiation" title="In Negotiation">In Negotiation</option>')
                $("#filterStatus").append('<option value="NegotiationComplete" title="Negotiation Complete">Negotiation Complete</option>')

            } else if (obj == "Signed") {
                $("#filterStatus").append('<option value="ReadyforSignature" title="Ready for Signature">Ready for Signature</option>')
                $("#filterStatus").append('<option value="AwaitingSignatures" title="Awaiting Signatures">Awaiting Signatures</option>')
                $("#filterStatus").append('<option value="Signed" title="Signed">Signed</option>')

            } else {
                $("#filterStatus").append('<option value="All" title="All">All</option>')
                $("#filterStatus").append('<option value="NotAvailable" title="NotAvailable">Not Available</option>')

                $(requeststatuses).each(function (i, item) {
                    var find = " ";
                    var re = new RegExp(find, 'g');

                    var str = item.RequestStatus.replace(re, '');

                    $("#filterStatus").append('<option value="' + str + '" title="' + item.RequestStatus + '">' + item.RequestStatus + '</option>')
                });
            }
        }
    });
}



function contextMenuWork(action, el, pos) {

    switch (action) {
        case "delete":
            {
                var requestTitle = $(el).find("#RequestTitle").text();
                swal({
                    title: '',
                    text: "Are you sure you want to <span style=\"font-weight:700\">delete '" + requestTitle + "'</span>?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
     function (confirmed) {
         if (confirmed) {
             var entityid = $(el).find("#RequestID").text();
             $.ajax({
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/DeleteRequestTemporarily?requestid=' + entityid,
                 type: 'DELETE',
                 dataType: 'json',
                 headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                 cache: false,
                 success: function (data) {

                     swal({
                         title: '',
                         text: data,

                     },
                       function (confirmed) {
                           if (confirmed) {
                               location = location;
                           }

                       });

                 }
             });
         }
         return;
     });
                break;
            }
        case "edit":
            {
                var entityid = $(el).find("#RequestID").text();
                var contracttype = $(el).find("#RequestType").text();
                location = "/Pipeline/EditRequest?RequestID=" + entityid + '&RequestType=' + contracttype;
                break;
            }
        case "viewdetails":
            {
                var entityid = $(el).find("#RequestID").text();
                location = "/Pipeline/RequestDetails?RequestID=" + entityid;
                break;
            }
        case "approve":
            {
                if (!PipelineApprovalTextarea) {
                    PipelineApprovalTextarea = new nicEditor({ buttonList: ['bold', 'italic', 'underline', 'strikethrough', 'left', 'center', 'right', 'justify', 'ol', 'ul', 'fontSize', 'fontFamily', 'fontFormat', 'removeformat', 'hr', 'indent', 'outdent', 'link', 'unlink', 'forecolor', 'bgcolor', 'xhtml'] }).panelInstance('txtComment');
                    $('.nicEdit-panelContain').parent().width('100%');
                    $('.nicEdit-panelContain').parent().next().width('100%');
                    $('.nicEdit-main').width("99%");
                }
                var ApprovalWorkflow = $(el).find("#ApprovalWorkflow").text();
                if (ApprovalWorkflow == "In Progress") {
                    $("#loadingPage").fadeIn();
                    var requestTitle = $(el).find("#RequestTitle").text();
                    var requestID = $(el).find("#RequestID").text();
                    var businessArea = $(el).find("#BusinessArea").text();
                    var contractArea = $(el).find("#ContractArea").text();
                    var businessAreaPath = $(el).find("#BusinessAreaPath").text();

                    workflowurltoshow = "";
                    //suren
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/requests/' + requestID + '/activity',
                        type: 'GET',
                        dataType: 'json',
                        headers: {
                            'eContracts-ApiKey': localStorage.APIKey
                        },
                        cache: false,
                        success: function (data) {
                            var datalenght = data.length;
                            if (datalenght > 0) {
                                for (var i = 0; i < datalenght; i++) {
                                    var item = data[i];
                                    var RowKey = item.RowKey;
                                    var Status = item.Status;
                                    var ActivityType = item.ActivityType;
                                    if (Status == "In Progress" || Status == "Stopped" && ActivityType == "Request Approval") {
                                        if (workflowurltoshow == "") {
                                            workflowurltoshow = '/Activity/TaskDetails?TaskID=&WorkflowID=' + RowKey;
                                        }
                                    }
                                }
                                if (workflowurltoshow != "") {
                                    $("#loadingPage").fadeOut();
                                    $("#alertText1").html("Approval workflow is in progress for this request");
                                    $("#textingdetails").html('<a target="_blank" title="View Workflow Details" href=' + workflowurltoshow + '><font color="#44A6D8">View Workflow Details</font></a>');
                                    $("#dvAlertDetails1").dialog("open");
                                }
                                else {
                                    $("#loadingPage").fadeOut();
                                    swal("", "Request Approval is in progress for this request.");
                                }
                            }
                            else {
                                $("#loadingPage").fadeOut();
                                swal("", "Request Approval is in progress for this request.");
                            }
                            //swal("", "Request Approval is in progress for this request.");

                        },
                        error: function () {
                            $("#loadingPage").fadeOut();
                            swal("", "Request Approval is in progress for this request.");
                        }
                    });

                    //swal("", "Request Approval is in progress for this request.");
                }
                else {
                    $("#loadingPage").fadeIn();
                    var requestTitle = $(el).find("#RequestTitle").text();
                    var requestID = $(el).find("#RequestID").text();
                    var businessArea = $(el).find("#BusinessArea").text();
                    var contractArea = $(el).find("#ContractArea").text();
                    var businessAreaPath = $(el).find("#BusinessAreaPath").text();
                    $("#tblStage").empty();
                    AddStage();
                    $("#txtWorkflowTitle").val('Approval for ' + requestTitle);
                    $("#txtDuration").val("");
                    var nicInstance = nicEditors.findEditor('txtComment');
                    nicInstance.setContent('');
                    NicEditorPasteEvent();

                    $("#hdWorkflowType").val("Request Approval");
                    $("#hdWorkflowContractArea").val(contractArea);
                    $("#hdWorkflowBusinessArea").val(businessArea);
                    $("#hdWorkflowBusinessAreaPath").val(businessAreaPath);
                    $("#hdWorkflowObjectID").val(requestID);
                    $("#hdWorkflowObjectTitle").val(requestTitle);
                    GetValuesAndAutoPopulate("ddlWorkflowCC", "");
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/settings',
                        type: 'GET',
                        dataType: 'json',
                        "Content-Type": "application/json",
                        headers: { 'eContracts-ApiKey': localStorage.APIKey },
                        cache: false,
                        success: function (settings) {
                            $("#txtDuration").val(settings.TaskDuration);

                            $("#dvWorkflow").dialog("option", "title", "Request Approval Workflow");
                            $("#dvWorkflow").dialog("open");
                            $("#dvWorkflow").height("auto");
                            $("#loadingPage").fadeOut();
                        },
                        error: function () {
                            $("#loadingPage").fadeOut();
                        }
                    });

                }

                break;
            }
        case "review":
            {

                var contractTitle = $(el).find("#ContractTitle").text();
                var contractID = $(el).find("#ContractID").text();
                $("#txtTodoTitle").val('Review for ' + contractTitle);
                $("#ddlTodoType option").filter(function (index) { return $(this).text() === "Contract Review"; }).prop('selected', true);
                $("#txtBrowseElement").val(contractTitle);
                $("#txtBrowseElementID").val(contractID);
                $("#trBrowse").css("display", "");
                $("#browse").css("display", "none");
                $("#tdBrowseElement").html("Contract Title");
                $("#dvTodo").dialog("open");
                $('#ddlTodoType').attr('disabled', 'disabled');
                GetValuesAndAutoPopulate("ddlApprovers", "");
                $("#txtDueDate").val("");
                $("#txtNotes").val("");
                $("#chkNotifyMe").prop('checked', false);
                fnChangeAssignedToText();
                break;
            }
        case "history":
            {

                $("#loadingPage").fadeIn();
                var requestID = $(el).find("#RequestID").text();
                $("#hdContractID").val(requestID);
                CreateRequestActivityList();
                break;
            }

        case "alerts":
            {

                $("#loadingPage").fadeIn();
                var contractID = $(el).find("#ContractID").text();
                $("#hdContractID").val(contractID);
                CreateAlertList();
                break;
            }
        case "status":
            {
                $("#loadingPage").fadeIn();
                var requestID = $(el).find("#RequestID").text();
                $("#hdContractID").val(requestID);
                var Status = $(el).find("#Status").text();
                $("#hdContractStatus").val(Status);
                BindStatusNew();
                break;
            }
        case "people":
            {
                $("#loadingPage").fadeIn();
                var contractID = $(el).find("#ContractID").text();
                $("#hdContractID").val(contractID);
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + contractID,
                    type: 'GET',
                    cache: false,
                    contentType: false,
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
                    processData: false,
                    success: function (item) {

                        if (item.ContractManagers != "") {
                            GetValuesAndAutoPopulate("ddlContractManagers", item.ContractManagers);
                        }

                        if (item.Reviewers != "") {
                            GetValuesAndAutoPopulate("ddlReviewers", item.Reviewers);
                        }

                        if (item.Approvers != "") {
                            GetValuesAndAutoPopulate("ddlApproversNew", item.Approvers);
                        }

                        if (item.Signees != "") {
                            GetValuesAndAutoPopulate("ddlSignees", item.Signees);
                        }

                        $("#txtExternalSignee").val(item.ExternalSignees);
                        $("#txtSharedWith").val(item.SharedWith);

                        if (item.ReadOnlyPermissions != "") {
                            GetValuesAndAutoPopulate("ddlReadOnly", item.ReadOnlyPermissions);
                        }
                        if (item.ReadWritePermissions != "") {
                            GetValuesAndAutoPopulate("ddlReadWrite", item.ReadWritePermissions);
                        }
                        if (item.FullControlPermissions != "") {
                            GetValuesAndAutoPopulate("ddlFullControl", item.FullControlPermissions);
                        }

                        $("#loadingPage").fadeOut();
                        $("#addEditPeople").dialog("option", "title", "People & Permissions");
                        $("#addEditPeople").dialog("open");
                    }
                });
                break;
            }
        case "duplicate":
            {
                swal({
                    title: '',
                    text: "Are you sure you want to create <span style=\"font-weight:700\">duplicate</span> Contract Record?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
     function (confirmed) {
         if (confirmed) {
             var contractID = $(el).find("#ContractID").text();
             var contractType = $(el).find("#ContractType").text();
             location = "/Contracts/EditContract?ContractID=" + contractID + "&ContractType=" + contractType + "&Duplicate=Yes&Stage=pipeline";

         }
         return;
     });
                break;
            }
    }
}



function BindStatusNew() {
    $("#menu34").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/requeststatus',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (requeststatuses) {
            var datalenght = requeststatuses.length;
            for (var i = 0; i < datalenght; i++) {
                var item = requeststatuses[i];

                var ctrl = "";

                if ((item.RequestStatus.trim() == "Renewed") || (item.RequestStatus.trim() == "Extended") || (item.RequestStatus.trim() == "Up for Renewal"))
                { }
                else {

                    if ($("#hdContractStatus").val() == item.RequestStatus.trim()) {
                        ctrl = "<li id='" + item.RequestStatus.trim() + "'><input id='" + item.RowKey + "' type='radio' checked onclick='javascript:statusclick(this);' name='rdstatus' value='" + item.RequestStatus + "' class='css-checkbox' /><label for='" + item.RowKey + "' class='css-label'>" + item.RequestStatus + "</label></li>";
                    } else {
                        ctrl = "<li id='" + item.RequestStatus.trim() + "'><input id='" + item.RowKey + "' type='radio' onclick='javascript:statusclick(this);' name='rdstatus' value='" + item.RequestStatus + "' class='css-checkbox' /><label for='" + item.RowKey + "' class='css-label'>" + item.RequestStatus + "</label></li>";
                    }

                }

                if (item.RequestStatus.trim() == "Renewed") {

                }
                else if (item.RequestStatus.trim() == "Extended") {

                }
                else if (item.RequestStatus.trim() == "Cancelled") {
                    ctrl += "<div class='f_list' style='padding: 0px 0px 0px 10px;display:none;' id='dvCancelCtrl'><textarea id='txtCancelledReason' placeholder='Reason for Cancellation' rows='3' class='f_text-box width90' /></div>";
                }
                $("#menu34").append(ctrl);

                if ($("#hdContractStatus").val() == "Renewed") {
                    $('#dvRenewCtrl').css("display", "");
                    $('#dvCancelCtrl').css("display", "none");
                }
                else if ($("#hdContractStatus").val() == "Cancelled") {
                    $('#dvCancelCtrl').css("display", "");
                    $('#dvRenewCtrl').css("display", "none");
                }

            }
            $("#dtRenewalDate").datepicker();
            $("#dtExtendedDate").datepicker();
            $("#loadingPage").fadeOut();
            $('#addEditStatus').dialog('open');
        }
    });
}


function CreateRequestActivityList() {
    $("#contractLogs").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/activities?objecttype=Request&objectid=' + $("#hdContractID").val() + '&actiontype=',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                var sObject = item.Object;
                var sActivity = item.Activity;
                var sUserID = item.UserID;
                var sTimestamp = moment(new Date(item.Timestamp)).format('Do MMM, h:mm A');

                var article = '<li>';
                article += '<p class="width97">' + sActivity;
                article += '<small>' + sTimestamp + '</small></p>';
                article += '</li>';
                $("#contractLogs").append(article);

            }
            $("#hdContractID").val('');
            $('#compact-pagination-Activity').pagination({
                items: data.length,
                itemsOnPage: 15,
                type: 'ul',
                typeID: 'contractLogs',
                row: 'li',
                cssStyle: 'compact-theme'
            });
            $("#loadingPage").fadeOut();
            $('#contractLogsPopup').dialog('open');
        },
        error: function () {
            var article = '<li><span>&nbsp;</span>';
            article += '<p class="width97">No History</p>';
            article += '</li>';
            $("#contractLogs").append(article);
            $("#loadingPage").fadeOut();
            $('#contractLogsPopup').dialog('open');
        }
    });
}

var multipleChecks = "";
function checkMultipleRequests(object) {

    var RequestID = object.id
    var isChecked = object.checked;
    if (isChecked) {
        $("#btnMultipleRequestAction").css('display', '');
        multipleChecks = multipleChecks + ';' + RequestID;
    } else {
        multipleChecks = multipleChecks.replace(';' + RequestID, '');
    }

    if (multipleChecks.trim() == "") {
        $("#btnMultipleRequestAction").css('display', 'none');
    }
    try {
        hideAllMenuAndStopPro(event);
    }
    catch (ex) {

    }
}



function liRemove(obj) {
    var qvName = "";
    if ($('#liFiltersQuickView').text() != "") {
        qvName = getQuickViewLinkName($('#liFiltersQuickView').text());
    }

    if ($(obj.parentNode.parentNode.parentNode).attr('id') == 'liFiltersSearchText') {

        $(obj.parentNode.parentNode.parentNode).empty();
        $('#txtSearchBox').val('');
    }
    else {
        var child = obj.parentNode;
        var firstChild = child.firstChild;

        var find = " ";
        var re = new RegExp(find, 'g');

        $("#filterStatus option[value='" + firstChild.nodeValue.replace(re, '') + "']").prop("selected", false);
        $("#filterRequestType option[value='" + firstChild.nodeValue.replace(re, '') + "']").prop("selected", false);
        var newval = "";
        switch (firstChild.nodeValue) {
            case "Contract Manager":
                newval = 'ContractManagers';
                break;
            case "Business Owner":
                newval = 'BusinessOwners';
                break;
            case "Creator":
                newval = 'CreatedBy';
                break;
            case "Approver":
                newval = 'Approvers';
                break;
            case "Reviewer":
                newval = 'Reviewers';
                break;
            case "Signee":
                newval = 'Signees';
                break;
        }

        $("#filterUserType option[value='" + newval + "']").prop("selected", false);


        child.parentNode.removeChild(child);
    }
    var hasItem1 = false;

    $('#filterStatus :selected').each(function (i, selected) {
        hasItem1 = true;
    });

    var hasItem2 = false;
    $('#filterRequestType :selected').each(function (i, selected) {
        hasItem2 = true;
    });


    var hasItem7 = false;
    $('#filterUserType :selected').each(function (i, selected) {
        hasItem7 = true;
    });

    $('#liFiltersStatus').empty();
    $('#liFiltersType').empty();
    $('#liFiltersUserType').empty();

    if (qvName == "Past Contracts" && !hasItem1 && !hasItem2) {
        GetPastContracts();
        displayshowall("Past Contracts")
        document.getElementById('btnAddViewRequest').style.display = 'none';

    } else if (qvName == "All Contracts" && !hasItem1 && !hasItem2) {
        applyFilter();
        displayshowall("All Contracts");
        document.getElementById('btnAddViewRequest').style.display = 'none';

    } else if (qvName == "Draft & New Contracts" && !hasItem1 && !hasItem2) {
        GetNewDraftContracts("Pipeline");
        document.getElementById('btnAddViewRequest').style.display = 'none';

    }
    else if (qvName == "Signed" && !hasItem1 && !hasItem2) {
        GetNewDraftContracts("Signed");
        document.getElementById('btnAddViewRequest').style.display = 'none';

    }
    else if (qvName == "Recently Active & Renewed Contracts" && !hasItem7 && !hasItem2) {
        applyFilter();
        displayshowall("Recently Active & Renewed Contracts")
        document.getElementById('btnAddViewRequest').style.display = 'none';

    }
    else {
        applyFilter();
    }
}



function BindPeople() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                var sRowKey = item.RowKey;
                var sUserName = item.UserName;
                var article = '<option value="' + sUserName + '">' + sUserName + '</option>';
                $("#ddlBusinessOwners").append(article);
                $("#ddlContractManagers").append(article);
                $("#ddlReviewers").append(article);
                $("#ddlApproversNew").append(article);
                $("#ddlSignees").append(article);
                $("#ddlBusinessUsers").append(article);
                $("#ddlApproversRenewSettings").append(article);
                $("#ddlBusinessOwnersM").append(article);
                $("#ddlContractManagersM").append(article);

                $("#ddlReadOnly").append(article);
                $("#ddlReadWrite").append(article);
                $("#ddlFullControl").append(article);
                $("#ddlWorkflowCC").append(article);
            }
            $("#ddlBusinessOwners").chosen();
            $("#ddlContractManagers").chosen();
            $("#ddlReviewers").chosen();
            $("#ddlApproversNew").chosen();
            $("#ddlSignees").chosen();
            $("#ddlBusinessUsers").chosen();
            $("#ddlApproversRenewSettings").chosen();
            $("#ddlBusinessOwnersM").chosen();
            $("#ddlContractManagersM").chosen();

            $("#ddlReadOnly").chosen();
            $("#ddlReadWrite").chosen();
            $("#ddlFullControl").chosen();
            $("#ddlWorkflowCC").chosen();
        },
        error:
            function (data) {
            }
    });
}

function getselectedusers(users) {
    var usersarr = [];
    var res = users.split(";");

    var reslength = res.length;
    for (var i = 0; i < reslength; i++) {
        usersarr.push(res[i].trim());
    }

    return usersarr;
}





function statusclick(e) {
    $('input[name="rdstatus"][value="' + decodeURI(e.value) + '"]').prop('checked', true);
    if (decodeURI(e.value) == "Renewed") {
        $('#dvCancelCtrl').css("display", "none");
        $('#dvExtendCtrl').css("display", "none");
        OpenRenewalForm();
        $("#addEditStatus").dialog("close");
        $("#hdChangeStatusClick").val("Y");
    }
    else if (decodeURI(e.value) == "Extended") {
        $('#dvExtendCtrl').css("display", "block");
        $('#dvCancelCtrl').css("display", "none");
        $('#dvRenewCtrl').css("display", "none");
    }
    else if (decodeURI(e.value) == "Cancelled") {
        $('#dvCancelCtrl').css("display", "block");
        $('#dvRenewCtrl').css("display", "none");
        $('#dvExtendCtrl').css("display", "none");
    }
    else {
        $('#dvCancelCtrl').css("display", "none");
        $('#dvRenewCtrl').css("display", "none");
        $('#dvExtendCtrl').css("display", "none");

    }
}

function imgcheckgeneral() {
    var selectedValue = decodeURI($("input:radio[name=rdstatus]:checked").val());
    if (selectedValue == "Cancelled") {
        if ($("#txtCancelledReason")[0].value == "") {
            swal("", "Enter reason for cancellation.");
            return false;
        } else {
            changestatus();
            return true;
        }
    } else if (selectedValue == "Renewed") {
        if ($("#dtRenewalDate")[0].value == "") {
            swal("", "Select renewal date.");
            return false;
        } else {
            changestatus();
            updaterenewaldate();
            BindMetaData(null);
            return true;
        }
    } else if (selectedValue == "Extended") {
        if ($("#dtExtendedDate")[0].value == "") {
            swal("", "Select extended date.");
            return false;
        } else {
            changestatus();
            updateenddate();
            BindMetaData(null);
            return true;
        }
    } else if (selectedValue == "undefined" || selectedValue == "0" || selectedValue == "") {
        swal("", "Select Status");
        return false;
    } else {
        changestatus();
        return true;
    }
}

function changestatus() {
    $('.ui-button-green-text').parent().attr('disabled', 'disabled');
    var stat = decodeURI($("input:radio[name=rdstatus]:checked").val());
    var vCancelNote = '';
    if (stat == "Cancelled")
    { vCancelNote = "CancelledReason=" + $("#txtCancelledReason").val(); }
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/changerequeststatus?requestid=' + $("#hdContractID").val() + '&status=' + stat,
        type: 'PUT',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
        data: vCancelNote,
        cache: false,
        success: function (result) {
            $('.ui-button-green-text').parent().removeAttr('disabled');
        }
    });
}


function savePeople() {
    $('.ui-button-green-text').parent().attr('disabled', 'disabled');
    var isformvalid = false;
    if (requiredValidator('addNewPeople')) {
        var contractmanagers = $("#ddlContractManagers").val();
        var cm = '';
        $(contractmanagers).each(function (i, item) {
            if (cm == '') {
                cm = item;
            }
            else {
                cm += "; " + item;
            }
        });

        var reviewers = $("#ddlReviewers").val();
        var rev = '';
        $(reviewers).each(function (i, item) {
            if (rev == '') {
                rev = item;
            }
            else {
                rev += "; " + item;
            }
        });

        var approvers = $("#ddlApproversNew").val();
        var app = '';
        $(approvers).each(function (i, item) {
            if (app == '') {
                app = item;
            }
            else {
                app += "; " + item;
            }
        });

        var signees = $("#ddlSignees").val();
        var sign = '';
        $(signees).each(function (i, item) {
            if (sign == '') {
                sign = item;
            }
            else {
                sign += "; " + item;
            }
        });

        var ReadOnlyUsers = '';
        var ReadWriteUser = '';
        var FullControlUsers = "";

        var ReadOnly = $("#ddlReadOnly").val();
        $(ReadOnly).each(function (i, item) {
            if (ReadOnlyUsers == '') {
                ReadOnlyUsers = item;
            }
            else {
                ReadOnlyUsers += "; " + item;
            }
        });

        var ReadWrite = $("#ddlReadWrite").val();
        $(ReadWrite).each(function (i, item) {
            if (ReadWriteUser == '') {
                ReadWriteUser = item;
            }
            else {
                ReadWriteUser += "; " + item;
            }
        });

        var FullControl = $("#ddlFullControl").val();
        $(FullControl).each(function (i, item) {
            if (FullControlUsers == "") {
                FullControlUsers = item;
            }
            else {
                FullControlUsers += "; " + item;
            }
        });

        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + $("#hdContractID").val() + '/people',
            type: 'PUT',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            data: {
                PermissionAssignment: "Role-Based",
                ContractManagers: cm,
                Reviewers: rev,
                Approvers: app,
                Signees: sign,
                ExternalSignees: $("#txtExternalSignee").val(),
                SharedWith: $("#txtSharedWith").val(),
                ReadOnlyPermissions: ReadOnlyUsers,
                ReadWritePermissions: ReadWriteUser,
                FullControlPermissions: FullControlUsers,
                ModifiedBy: localStorage.UserName
            },
            cache: false,
            success: function (person) {
                $('.ui-button-green-text').parent().removeAttr('disabled');
                swal("", "People & Permissions Setting Saved.");
                $("#addEditPeople").dialog("close");
                $("#hdContractID").val('');
            }
        });

    }
    else {
        $('.ui-button-green-text').parent().removeAttr('disabled');
    }
    return isformvalid;
}

function approvaltaskyes() {
    $("#divWorkflowYes").css('display', '');
}

function approvaltaskno() {
    $("#divWorkflowYes").css('display', 'none');
}

function RenewSettingRadiobutton(RadioSelection) {
    switch (RadioSelection) {
        case "Non-Renewable":
            $("#txtStandardRenewalTerm").prop("disabled", true);
            $("#ddlStandardRenewalTerm").prop("disabled", true);
            $("input:radio[name=rdRenewTime]").prop("disabled", true);
            $("#txtRenewableFor").prop("disabled", true);

            $("#txtStandardRenewalTerm").val("");
            $("#txtRenewableFor").val("");
            $("#liAutoRenew1").css('display', 'none');
            $("#liAutoRenew2").css('display', 'none');
            $("input:radio[name=rdWorkflow][value='No']").attr('checked', 'checked');
            approvaltaskno();
            $("#trRenwalHistory").css('display', 'none');

            break;
        case "Manual-Renewable":
            $("#txtStandardRenewalTerm").prop("disabled", true);
            $("#ddlStandardRenewalTerm").prop("disabled", true);
            $("input:radio[name=rdRenewTime]").prop("disabled", true);
            $("#txtRenewableFor").prop("disabled", true);

            $("#txtStandardRenewalTerm").val("");
            $("#txtRenewableFor").val("");
            $("#liAutoRenew1").css('display', 'none');
            $("#liAutoRenew2").css('display', 'none');
            $("#trRenwalHistory").css('display', '');
            break;
        case "Auto-Renewable":
            $("#txtStandardRenewalTerm").prop("disabled", false);
            $("#ddlStandardRenewalTerm").prop("disabled", false);
            $("input:radio[name=rdRenewTime]").prop("disabled", false);
            $("#txtRenewableFor").prop("disabled", false);

            $("#liAutoRenew1").css('display', '');
            $("#liAutoRenew2").css('display', '');
            $("#trRenwalHistory").css('display', '');
            break;
    }
}

$("#btnRenewNow").click(function () {
    if ($("input:radio[name=rdsettings]:checked").val() == "Manual-Renewable") {

        $("#manualRenewal").dialog("open");
        $("#ui-datepicker-div").hide();
        $("#txtNewEndDate").on('click', function () {
            $("#ui-datepicker-div").show();
        });
        $("#txtNextRenewalDate").on('click', function () {
            $("#ui-datepicker-div").show();
        });

    } else {
        swal("", "Select manual renewable.");
    }
});


$(function () {


    $("#toggle_mouseenter").click(function () {

        var flag = $(this).is(":checked");

        $("#menu_CreateContract").jui_dropdown({
            launchOnMouseEnter: flag
        });

    });

});
//Script for Filter Start-->
$(function () {

    $("#divToAppend").css('display', 'block');




});



function clearSelection() {
    selectedSortOption = "";
    clearFilterSelection();

    $("#aRecently").css("background-color", "");
    $("#aRecentlySubmited").css("background-color", "");
    $("#aExpiration").css("background-color", "");
    $("#aValue").css("background-color", "");
    $("#aNumber").css("background-color", "");
    $("#aCreated").css("background-color", "");

    var qvName = "";
    if ($('#liFiltersQuickView').text() != "") {
        qvName = getQuickViewLinkName($('#liFiltersQuickView').text());

    }
    if (savedViewNameFromViewTable != "")
        qvName = savedViewNameFromViewTable;

    applyFilter();

    $("#showAll").text("Showing " + qvName + " Records");
    $("#showAll").css('display', 'inline');
    $("#dvfilter").hide();
    document.getElementById('btnAddViewRequest').style.display = 'none';

}

function clearFilterSelection() {
    $("#liFiltersSearchText").empty();
    $("#liFiltersStatus").empty();
    $("#liFiltersType").empty();
    $("#liFiltersUserType").empty();
    $("#liFiltersRenewal").empty();
    $("#liFiltersExpiration").empty();

    $("#filterUserType option:selected").prop('selected', false);
    $("#filterStatus option:selected").prop('selected', false);
    $("#filterDates option:selected").prop('selected', false);
    $("#filterRenewDates option:selected").prop('selected', false);
    $("#filterRequestType option:selected").prop('selected', false);
}




function applyFilter() {
    $("#spResult").empty();
    var qvName = "";
    if ($('#liFiltersQuickView').text() != "") {
        qvName = getQuickViewLinkName($('#liFiltersQuickView').text());
        document.getElementById('btnAddViewRequest').style.display = '';

    }

    if (savedViewNameFromViewTable != "")
        qvName = savedViewNameFromViewTable;

    $('#menu4').hide();
    $("#showAll").css('display', 'none');
    $("#liFiltersSearchText").empty();
    $("#liFiltersStatus").empty();
    $("#liFiltersType").empty();
    $("#liFiltersUserType").empty();
    $("#liFiltersRenewal").empty();
    $("#liFiltersExpiration").empty();
    var txtsearchboxvalue = $.trim($('#txtSearchBox').val());
    if (txtsearchboxvalue != "" && txtsearchboxvalue != null) {

        $('#liFiltersSearchText').html('<span><small>Showing search result for : ' + txtsearchboxvalue + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
    }
    var newurl = "";
    var sortby = "&sortbyfield=Timestamp&orderby=DESC";

    switch (selectedSortOption) {
        case "Recently Updated":
            sortby = '&sortbyfield=Timestamp&orderby=DESC';
            break;
        case "Recently Submited":
            sortby = '&sortbyfield=SubmittedOn&orderby=DESC';
            break;
        case "Created Date":
            sortby = '&sortbyfield=Created&orderby=DESC';
            break;
        default:
            sortby = '&sortbyfield=Timestamp&orderby=DESC';
            break;
    }



    if (qvName == 'My Requests') {
        var customQuery1 = "Status:";
        var isContainingAll1 = false;
        var isAnySelected1 = false;
        $('#filterStatus :selected').each(function (i, selected) {
            isAnySelected1 = true;
            if ($(selected).text() == "All")
                isContainingAll1 = true;

            $('#liFiltersStatus').append('<span><small>' + $(selected).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
            if ($(selected).text() == "Not Available")
                customQuery1 += ',undefined';
            else
                customQuery1 += ',' + $(selected).text();

        });
        if (!isAnySelected1) {
            $("#liFiltersStatus").empty();
            customQuery1 = "";
        }
        if (isContainingAll1) {
            $("#liFiltersStatus").empty();
            customQuery1 = "";
        }
        var customQuery2 = "";
        var isContainingAll2 = false;
        var isAnySelected2 = false;
        $('#filterUserType :selected').each(function (i, selected) {
            isAnySelected2 = true;
            if ($(selected).text() == "Any")
                isContainingAll2 = true;
            $('#liFiltersUserType').append('<span><small>' + $(selected).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveMyContracts(this);" style="float:right" /></small></span>');
            customQuery2 += ';' + $(selected).val() + ":" + localStorage.UserName;
        });
        if (!isAnySelected2) {
            customQuery2 = "";
        }
        if (isContainingAll2) {
            $("#liFiltersUserType").empty();
            customQuery2 = "";
        }

        newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests?searchkeyword=' + encodeURIComponent($("#txtSearchBox").val()) + '&customquery=' + customQuery1 + customQuery2 + sortby + "&otherquery=" + customQuery2 + "&viewName=" + qvName;

    } else if (qvName == 'Pending') {
        var customQuery1 = "RequestType:";
        var isContainingAll1 = false;
        var isAnySelected1 = false;
        $('#filterRequestType :selected').each(function (i, selected) {
            isAnySelected1 = true;
            if ($(selected).text() == "All")
                isContainingAll1 = true;
            $('#liFiltersType').append('<span><small>' + $(selected).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
            customQuery1 += ',' + $(selected).text();
        });
        if (!isAnySelected1) {
            customQuery1 = "";
        }
        if (isContainingAll1) {
            $("#liFiltersType").empty();
            customQuery1 = "";
        }

        var customQuery2 = "";
        var isContainingAll2 = false;
        var isAnySelected2 = false;
        $('#filterUserType :selected').each(function (i, selected) {
            isAnySelected2 = true;
            if ($(selected).text() == "Any")
                isContainingAll2 = true;
            $('#liFiltersUserType').append('<span><small>' + $(selected).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
            customQuery2 += ';' + $(selected).val() + ":" + localStorage.UserName;
        });
        if (!isAnySelected2) {
            customQuery2 = "";
        }
        if (isContainingAll2) {
            $("#liFiltersUserType").empty();
            customQuery2 = "";
        }

        newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests?searchkeyword=' + encodeURIComponent($("#txtSearchBox").val()) + '&customquery=' + customQuery1 + customQuery2 + sortby + "&otherquery=" + customQuery2 + "&viewName=" + qvName;
    }
    else if ((qvName == 'Past Requests') || (qvName == 'Submitted') || (qvName == 'All Requests') || (qvName == "") || (qvName == 'Assigned')) {
        var customQuery1 = "Status:";
        var isContainingAll1 = false;
        var isAnySelected1 = false;
        $('#filterStatus :selected').each(function (i, selected) {
            isAnySelected1 = true;
            if ($(selected).text() == "All")
                isContainingAll1 = true;
            $('#liFiltersStatus').append('<span><small>' + $(selected).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
            if ($(selected).text() == "Not Available")
                customQuery1 += ',undefined';
            else
                customQuery1 += ',' + $(selected).text();

        });
        if (!isAnySelected1) {
            customQuery1 = "";
        }
        if (isContainingAll1) {
            $("#liFiltersStatus").empty();
            customQuery1 = "";
        }

        var customQuery2 = ";RequestType:";
        var isContainingAll2 = false;
        var isAnySelected2 = false;
        $('#filterRequestType :selected').each(function (i, selected) {
            isAnySelected2 = true;
            if ($(selected).text() == "All")
                isContainingAll2 = true;
            $('#liFiltersType').append('<span><small>' + $(selected).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');

            customQuery2 += ',' + $(selected).text();
        });
        if (!isAnySelected2) {
            customQuery2 = "";
        }
        if (isContainingAll2) {
            $("#liFiltersType").empty();
            customQuery2 = "";
        }
        if (customQuery1 == "") {
            if (qvName == 'Past Requests') {
                customQuery1 = "Status:On Hold,Replaced,Expired,Cancelled,Completed,Archived,";
            } else if (qvName == 'Active') {
                customQuery1 = "Status:Active,Up for Renewal,Renewed,Extended,About to Expire,";
            }
        }

        newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests?searchkeyword=' + encodeURIComponent($("#txtSearchBox").val()) + '&customquery=' + customQuery1 + customQuery2 + sortby + "&otherquery=" + customQuery2 + "&viewName=" + qvName;

    }


    if (isContainingAll1 && isContainingAll2) {
        $("#showAll").css('display', 'inline');
    }

    if (!isAnySelected1 && !isAnySelected2) {
        document.getElementById('btnAddViewRequest').style.display = 'none';
    }

    $("#listContracts").empty();

    var baname = ";";
    if (thisBusinessAreaName == "" || thisBusinessAreaName == "All") {
    } else {
        baname = thisBusinessAreaName;
    }
    var baloc = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != 'undefined' && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baloc = localStorage.GlobalBusinessAreaLocation;
    }

    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: newurl,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessArea: baname, BusinessAreaLocation: baloc },
        success: function (data) {
            $("#compact-pagination").css('display', '');
            $('#listContracts').empty();
            GetData(data);
            $(".openmenu").contextMenu({ menu: 'myMenu', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("i").parent("p").parent("li"), pos); });

        },
        error:
            function (data) {
                $("#listContracts").empty();
                $("#listContracts").append("<p class='f_p-error'>No Result Found.</p>");
                $("#compact-pagination").css('display', 'none');
            }
    });

    $("#dvfilter").hide();

}

var selectedSortOption = "";
function highlight(obj) {

    $('#tdSort a').each(function (i, item) {
        item.style.backgroundColor = "";
    });
    obj.style.backgroundColor = "#cccccc";
    selectedSortOption = obj.textContent;
    $("#txtSortBy").val(obj.textContent)
}

//Script for Filter End
//Script for search start
$(document).ready(function () {
    $('#txtSearchBox').keypress(function (e) {
        if ($('#txtSearchBox').val() != "") {
            if (e.keyCode == 13)
                applyFilter();
        }
    });

});



function showStatusMultiple() {
    $("#loadingPage").fadeIn();
    BindMultipleStatus();
    $(".hhide").hide();
}

function showPeopleMultiple() {
    $(".hhide").hide();
    $("#addEditPeopleMultiple").dialog("option", "title", "People");
    $("#addEditPeopleMultiple").dialog("open");
}

function BindMultipleStatus() {
    $("#menuSMultiple").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/requeststatus',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (contractstatuses) {
            var datalenght = contractstatuses.length;
            for (var i = 0; i < datalenght; i++) {
                var item = contractstatuses[i];

                var ctrl = "";

                if (item.RequestStatus.trim() == "Renewed" || item.RequestStatus.trim() == "Extended")
                { }
                else {
                    if ($("#hdContractStatus").val() == item.RequestStatus.trim()) {
                        ctrl = "<li id='" + item.RequestStatus + "'><input id='" + item.RowKey + "' type='radio' checked onclick='javascript:statusclick(this);' name='rdstatus' value='" + item.RequestStatus + "' class='css-checkbox' /><label for='" + item.RowKey + "' class='css-label'>" + item.RequestStatus + "</label></li>";
                    } else {
                        ctrl = "<li id='" + item.RequestStatus + "'><input id='" + item.RowKey + "' type='radio' onclick='javascript:statusclick(this);' name='rdstatus' value='" + item.RequestStatus + "' class='css-checkbox' /><label for='" + item.RowKey + "' class='css-label'>" + item.RequestStatus + "</label></li>";
                    }
                }

                $("#menuSMultiple").append(ctrl);

            }

            $("#loadingPage").fadeOut();
            $('#addEditStatusMultiple').dialog('open');
        }
    });
}



function quickViewDisplay(obj) {
    colorLink('liContractViews a', false);
    colorLink('spnAllRequests', false);
    selectedSortOption = "";
    clearFilterSelection();

    $('#tdSort a').each(function (i, item) {
        item.style.backgroundColor = "";
    });
    $("#liFiltersQuickView").empty();
    $('#liFiltersQuickView').html('<span>Showing search result for : <small>' + obj.name + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');

    $('#liFiltersQuickView').css('display', 'none');
    if (obj.name == "My Requests") {
        $(".my-Alerts_Act1").css('display', '');
        BindContractStatusFilter("My Requests")
        GetMyRequests();
        colorLink('spnMyRequests', true);
        colorLink('spnDraft', false);
        colorLink('spnSubmittedMyRequests', false);
        colorLink('spnASSigned', false);
        colorLink('spnPending', false);
        colorLink('spnUpcomingRenewals', false);
        colorLink('spnUpcomingExpirations', false);
        colorLink('spnRecentlyActiveRenewedContracts', false);
        colorLink('spnUnassignedContracts', false);
        colorLink('spnPastRequests', false);
        colorLink('spnAllRequests', false);
        colorLink('spnInRecycleBin', false);
        colorLink('spnSharedContracts', false);
        $("#btnFilter").css('display', 'inline');
        $("#dvSrhBox").css('display', '');
        $("#filteroptiontype").css('display', 'none');
        $("#filteroptiondates").css('display', 'none');
        $("#filteroptionstatus").css('display', '');
        $("#filteroption1").css('display', '');
        $("#filteroptionrenewdates").css('display', 'none');
        $("#txtSearchBox").val("");
    } else if (obj.name == "Draft") { //My Saved Draft
        $(".my-Alerts_Act1").css('display', '');
        GeRequestsSavedAsDraft();
        colorLink('spnMyRequests', false);
        colorLink('spnDraft', true);
        colorLink('spnSubmittedMyRequests', false);
        colorLink('spnASSigned', false);
        colorLink('spnPending', false);
        colorLink('spnUpcomingRenewals', false);
        colorLink('spnUpcomingExpirations', false);
        colorLink('spnRecentlyActiveRenewedContracts', false);
        colorLink('spnUnassignedContracts', false);
        colorLink('spnPastRequests', false);
        colorLink('spnSharedContracts', false);
        colorLink('spnInRecycleBin', false);
        colorLink('spnAllRequests', false);

        $("#btnFilter").css('display', 'none');
        $("#dvSrhBox").css('display', 'none');


    }
    else if (obj.name == "Pending") {
        $(".my-Alerts_Act1").css('display', '');
        BindContractStatusFilter("Pending")
        GetPendingRequests();
        colorLink('spnMyRequests', false);
        colorLink('spnDraft', false);
        colorLink('spnSubmittedMyRequests', false);
        colorLink('spnASSigned', false);
        colorLink('spnPending', true);
        colorLink('spnUpcomingRenewals', false);
        colorLink('spnUpcomingExpirations', false);
        colorLink('spnRecentlyActiveRenewedContracts', false);
        colorLink('spnUnassignedContracts', false);
        colorLink('spnPastRequests', false);
        colorLink('spnSharedContracts', false);
        colorLink('spnInRecycleBin', false);
        colorLink('spnAllRequests', false);



        $("#dvSrhBox").css('display', '');
        $("#filteroptiontype").css('display', '');
        $("#filteroptiondates").css('display', 'none');
        $("#filteroptionstatus").css('display', '');
        $("#filteroption1").css('display', 'none');
        $("#filteroptionrenewdates").css('display', 'none');
        $("#btnFilter").css('display', 'inline');
        $("#txtSearchBox").val("");
    }
    else if (obj.name == "Past Requests") {
        $(".my-Alerts_Act1").css('display', '');
        BindContractStatusFilter("Past Requests")
        GetPastRequests();
        colorLink('spnMyRequests', false);
        colorLink('spnDraft', false);
        colorLink('spnSubmittedMyRequests', false);
        colorLink('spnASSigned', false);
        colorLink('spnPending', false);
        colorLink('spnUpcomingRenewals', false);
        colorLink('spnUpcomingExpirations', false);
        colorLink('spnRecentlyActiveRenewedContracts', false);
        colorLink('spnUnassignedContracts', false);
        colorLink('spnPastRequests', true);
        colorLink('spnSharedContracts', false);
        colorLink('spnInRecycleBin', false);
        colorLink('spnAllRequests', false);

        $("#filteroptiontype").css('display', '');
        $("#filteroptiondates").css('display', 'none');
        $("#filteroptionstatus").css('display', '');
        $("#filteroption1").css('display', 'none');
        $("#filteroptionrenewdates").css('display', 'none');
        $("#btnFilter").css('display', 'inline');
        $("#dvSrhBox").css('display', '');
        $("#txtSearchBox").val("");
    }
    else if (obj.name == "In Recycle Bin") {
        $(".my-Alerts_Act1").css('display', '');
        GetRequestsInRecycleBin();
        colorLink('spnMyRequests', false);
        colorLink('spnDraft', false);
        colorLink('spnSubmittedMyRequests', false);
        colorLink('spnASSigned', false);
        colorLink('spnPending', false);
        colorLink('spnUpcomingRenewals', false);
        colorLink('spnUpcomingExpirations', false);
        colorLink('spnRecentlyActiveRenewedContracts', false);
        colorLink('spnUnassignedContracts', false);
        colorLink('spnPastRequests', false);
        colorLink('spnSharedContracts', false);
        colorLink('spnInRecycleBin', true);
        colorLink('spnAllRequests', false);

        $("#btnFilter").css('display', 'none');
        $("#dvSrhBox").css('display', 'none');
        $("#txtSearchBox").val("");
    }
    else if (obj.name == "Submitted") {
        $(".my-Alerts_Act1").css('display', '');
        GetSubmittedMyRequests();
        colorLink('spnMyRequests', false);
        colorLink('spnDraft', false);
        colorLink('spnSubmittedMyRequests', true);
        colorLink('spnASSigned', false);
        colorLink('spnPending', false);
        colorLink('spnUpcomingRenewals', false);
        colorLink('spnUpcomingExpirations', false);
        colorLink('spnRecentlyActiveRenewedContracts', false);
        colorLink('spnUnassignedContracts', false);
        colorLink('spnPastRequests', false);
        colorLink('spnSharedContracts', false);
        colorLink('spnInRecycleBin', false);
        colorLink('spnAllRequests', false);

        $("#txtSearchBox").val("");
        $("#dvSrhBox").css('display', '');
        $("#btnFilter").css('display', 'inline');
    }
    else if (obj.name == "Assigned") {
        $(".my-Alerts_Act1").css('display', '');
        GetAssignedRequests();
        colorLink('spnMyRequests', false);
        colorLink('spnDraft', false);
        colorLink('spnSubmittedMyRequests', false);
        colorLink('spnASSigned', true);
        colorLink('spnPending', false);
        colorLink('spnUpcomingRenewals', false);
        colorLink('spnUpcomingExpirations', false);
        colorLink('spnRecentlyActiveRenewedContracts', false);
        colorLink('spnUnassignedContracts', false);
        colorLink('spnPastRequests', false);
        colorLink('spnSharedContracts', false);
        colorLink('spnInRecycleBin', false);
        colorLink('spnAllRequests', false);

        $("#txtSearchBox").val("");
        $("#dvSrhBox").css('display', '');
        $("#btnFilter").css('display', 'inline');
    }

    $("#btnAddView").css('display', 'none');

    $("#showAll").css('display', 'inline');
    $("#showAll").html('Showing ' + obj.name + ' Records<img title="Remove" name="' + obj.name + '" onclick="javascript:GetAllContracts(this);" style="margin-left: 5px; margin-right: 10px; cursor:pointer;" src="../Content/Images/icon/close.png" />');
}


function GetMyRequests() {
    $("#spResult").empty();
    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = localStorage.GlobalBusinessAreaLocation;
    }

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/myrequests?noOfItem=0',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessAreaLocation: baname },
        success: function (data) {
            $("#compact-pagination").css('display', '');
            $('#listContracts').empty();
            GetData(data);
            $(".openmenu").contextMenu({ menu: 'myMenu', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("i").parent("p").parent("li"), pos); });

        },
        error:
            function (data) {
                $('#listContracts').empty();
                $("#listContracts").append("<p class='f_p-error'>No items available in this view.</p>");
                $("#compact-pagination").css('display', 'none');
            }
    });
}


function GeRequestsSavedAsDraft() {
    $("#spResult").empty();
    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');

    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = localStorage.GlobalBusinessAreaLocation;
    }


    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/savedasdraft',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessAreaLocation: baname },
        success: function (data) {
            $("#compact-pagination").css('display', '');
            $('#listContracts').empty();
            GetData(data);
            $(".openmenu").contextMenu({ menu: 'myMenu', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("i").parent("p").parent("li"), pos); });

        },
        error:
            function (data) {
                $('#listContracts').empty();
                $("#listContracts").append("<p class='f_p-error'>No items available in this view.</p>");
                $("#compact-pagination").css('display', 'none');
            }
    });
}


function GetSubmittedMyRequests() {
    $("#spResult").empty();
    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');

    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = localStorage.GlobalBusinessAreaLocation;
    }


    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/submitted',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessAreaLocation: baname },
        success: function (data) {
            $("#compact-pagination").css('display', '');
            $('#listContracts').empty();
            GetData(data);
            $(".openmenu").contextMenu({ menu: 'myMenu', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("i").parent("p").parent("li"), pos); });

        },
        error:
            function (data) {
                $('#listContracts').empty();
                $("#listContracts").append("<p class='f_p-error'>No items available in this view.</p>");
                $("#compact-pagination").css('display', 'none');
            }
    });
}


function GetAssignedRequests() {
    $("#spResult").empty();
    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');

    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = localStorage.GlobalBusinessAreaLocation;
    }


    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/assigned',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessAreaLocation: baname },
        success: function (data) {
            $("#compact-pagination").css('display', '');
            $('#listContracts').empty();
            GetData(data);
            $(".openmenu").contextMenu({ menu: 'myMenu', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("i").parent("p").parent("li"), pos); });

        },
        error:
            function (data) {
                $('#listContracts').empty();
                $("#listContracts").append("<p class='f_p-error'>No items available in this view.</p>");
                $("#compact-pagination").css('display', 'none');
            }
    });
}


function GetPendingRequests() {
    $("#spResult").empty();
    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = localStorage.GlobalBusinessAreaLocation;
    }

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/pendingrequests',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessAreaLocation: baname },
        success: function (data) {
            $("#compact-pagination").css('display', '');
            $('#listContracts').empty();
            GetData(data);
            $(".openmenu").contextMenu({ menu: 'myMenu', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("i").parent("p").parent("li"), pos); });

        },
        error:
            function (data) {
                $('#listContracts').empty();
                $("#listContracts").append("<p class='f_p-error'>No items available in this view.</p>");
                $("#compact-pagination").css('display', 'none');
            }
    });
}


function GetPastRequests() {
    $("#spResult").empty();
    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = localStorage.GlobalBusinessAreaLocation;
    }
    var customQuery = "Status:On Hold,Replaced,Expired,Cancelled,Terminated,Archived,";
    var sortby = '&sortbyfield=Timestamp&orderby=DESC';
    var newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests?searchkeyword=' + encodeURIComponent($("#txtSearchBox").val()) + '&customquery=' + customQuery + sortby;
    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: newurl,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessAreaLocation: baname },
        success: function (data) {
            $("#compact-pagination").css('display', '');
            $('#listContracts').empty();
            GetData(data);
            $(".openmenu").contextMenu({ menu: 'myMenu', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("p").parent("div"), pos); });

        },
        error:
            function (data) {
                $("#listContracts").empty();
                $("#listContracts").append("<p class='f_p-error'>No items available in this view.</p>");
                $("#compact-pagination").css('display', 'none');
            }
    });
}



function GetRequestsInRecycleBin() {
    $("#spResult").empty();
    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = localStorage.GlobalBusinessAreaLocation;
    }
    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/RequestsInrecyclebin',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessAreaLocation: baname },
        success: function (data) {
            $("#compact-pagination").css('display', '');
            $('#listContracts').empty();
            GetData(data);

        },
        error:
            function (data) {
                $('#listContracts').empty();
                $("#listContracts").append("<p class='f_p-error'>No items available in this view.</p>");
                $("#compact-pagination").css('display', 'none');
            }
    });
}



function changestatusmultiple() {
    var selectedValue = decodeURI($("input:radio[name=rdstatus]:checked").val());
    if (selectedValue == "undefined" || selectedValue == "0" || selectedValue == "") {
        swal("", "Select Status");
        return false;
    } else {
        changestatusM();
        return true;
    }
}

function changestatusM() {
    var stat = decodeURI($("input:radio[name=rdstatus]:checked").val());
    var multipleChecksArray = multipleChecks.split(';');
    var multipleChecksArraylength = multipleChecksArray.length;
    for (var i = 1; i < multipleChecksArraylength; i++) {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/changerequeststatus?requestid=' + multipleChecksArray[i] + '&status=' + stat,
            type: 'PUT',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
            cache: false,
            success: function (result) {
            }
        });
    }
    location = "/Pipeline/Pipelines";
}



function multipleDelete() {
    $(".hhide").hide();
    swal({
        title: '',
        text: "Are you sure you want to <span style=\"font-weight:700\">delete</span> request(s)?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        html: true
    },
     function (confirmed) {
         if (confirmed) {
             var multipleChecksArray = multipleChecks.split(';');
             var multipleChecksArraylength = multipleChecksArray.length;
             for (var i = 1; i < multipleChecksArraylength; i++) {
                 $.ajax({
                     url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/DeleteRequestTemporarily?requestid=' + multipleChecksArray[i],
                     type: 'DELETE',
                     dataType: 'json',
                     headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                     cache: false,
                     success: function (data) {
                     }
                 });
             }
             location = "/Pipeline/Pipelines";
         }
         return;
     });

}




function AddStage() {
    var vLastRow = $("#tblStage tr:last").attr('id');
    var vRowLength = $("#tblStage tr").length;


    if (typeof vRowLength != 'undefined')
        vRowLength = parseInt(vRowLength) + 1;
    var totalFileCount = "1";
    if (typeof vLastRow == "undefined") {
        totalFileCount = "1";
    }
    else {
        totalFileCount = parseInt(vLastRow.replace("trStage", ""));
        totalFileCount += 1;
    }

    var htmlFormatFile = '<tr id="trStage' + totalFileCount + '">';
    htmlFormatFile += '<td class="width30 wf_approval">';
    htmlFormatFile += '<input id="txtStage' + totalFileCount + '" name="Stage' + totalFileCount + '" title="Stage" placeholder="Stage Name" type="text" class="f_inpt width97 validelement" value="Stage ' + vRowLength + '"/>';
    htmlFormatFile += '</td>';
    htmlFormatFile += '<td class="width46 ">';
    htmlFormatFile += '<select id="ddlAssignTo' + totalFileCount + '" name="AssignTo' + totalFileCount + '"  multiple="multiple" data-placeholder="Select" class="width97 validmultiselect"></select>';
    htmlFormatFile += '</td>';
    htmlFormatFile += '<td class="width20 padding_top_3px v_align_top">';
    htmlFormatFile += '<select id="ddlOrder' + totalFileCount + '" name="Order' + totalFileCount + '"  class="f_inpt width97" disabled="disabled"><option selected="selected">Serial</option><option>Parallel</option></select>';
    htmlFormatFile += '</td>';
    htmlFormatFile += '<td class="width4 padding_top_10px v_align_top">';
    htmlFormatFile += '<img src="../Content/Images/icon/delete.png" style="width: 20px" onclick="DeleteStage(this)" />';
    htmlFormatFile += '</td>';
    htmlFormatFile += '</tr>';

    $("#tblStage").append(htmlFormatFile);
    var $options = $("#ddlApprovers > option").clone();
    $('#ddlAssignTo' + totalFileCount).append($options);

    $("#ddlAssignTo" + totalFileCount).chosen().change(function () {
        var vasstoid = $(this).attr('id').replace("ddlAssignTo", "");
        if ($(this).val() != null) {
            if ($(this).val().length > 1)
                $("#ddlOrder" + vasstoid).prop('disabled', false);
            else
                $("#ddlOrder" + vasstoid).prop('disabled', true);
        }
        else
            $("#ddlOrder" + vasstoid).prop('disabled', true);
    });
    GetValuesAndAutoPopulate("ddlAssignTo" + totalFileCount, "");
}

function DeleteStage(n) {
    var vv = $(n.parentNode.parentNode).find('select');
    var curVal = 0;
    if (typeof vv != 'undefined') {
        curVal = parseInt(vv.val());
    }
    n.parentNode.parentNode.parentNode.removeChild(n.parentNode.parentNode);
    $("#tblStage tr").each(function (i, item) {

        if (typeof ($(item).attr('id')) != "undefined" && $(item).attr('id') != "" && $(item).attr('id') != null) {
            var ind = $(item).attr('id').replace('trStage', '');
            if (typeof (ind) != "undefined" && ind != "" && ind != null) {
                if ($("#txtStage" + ind).val().indexOf('Stage ') == 0) {
                    var replaceint = $("#txtStage" + ind).val().replace('Stage ', '');
                    if ($.isNumeric(replaceint)) {
                        if (!isNaN(parseInt(replaceint)) && !isNaN(parseInt(i)) && parseInt(replaceint) != (parseInt(i) + 1)) {
                            $("#txtStage" + ind).val('Stage ' + (parseInt(i) + 1))
                        }
                    }
                }
            }
        }
    })
}

function StartWorkflow() {
    if (requiredValidator("ulStartWorkflow", false)) {
        $("#inprocessStartWorkflow").css('display', '');
        var vAutoUpdateObjectStatus = $("#chkAutoUpdateStatus").is(':checked') ? 'Yes' : 'No';
        var vWorkflowStage = [];
        $('#tblStage tr').each(function (i, row) {
            var vRow = $(row).attr('id');
            var vRowIndex = vRow.replace("trStage", "");
            var stage = $("#txtStage" + vRowIndex).val();
            var order = $("#ddlOrder" + vRowIndex).find('option:selected').text();
            var approvers = $("#ddlAssignTo" + vRowIndex).val();
            var sendTo = '';
            $('#ddlAssignTo' + vRowIndex + '_chosen').find('.chosen-choices li').find('span').each(function () {
                if (sendTo == '') {
                    sendTo = $(this).text();
                }
                else {
                    sendTo += "; " + $(this).text();
                }
            });
            vWorkflowStage.push({
                "StageID": i + 1,
                "StageTitle": stage,
                "Participants": sendTo,
                "Order": order
            });
        });

        var ccsArr = $("#ddlWorkflowCC").val();
        var ccs = '';
        $(ccsArr).each(function (i, item) {
            if (ccs == '') {
                ccs = item;
            }
            else {
                ccs += "; " + item;
            }
        });
        var vObject = "Requests";
        var nicInstance = nicEditors.findEditor('txtComment');
        var vcommentText = CleanWordFormatFromHTML(nicInstance.getContent());
        var vNoteTextCount = vcommentText.replace(/<\/?[^>]+(>|$)/g, "");
        if (vNoteTextCount.length <= 26500) {
            vcommentText = $('<div/>').text(vcommentText).html();
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow',
                type: 'POST',
                "Content-Type": "application/json;charset=utf-8",
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                data: {
                    "Object": vObject,
                    "ObjectID": $("#hdWorkflowObjectID").val(),
                    "ObjectTitle": $("#hdWorkflowObjectTitle").val(),
                    "WorkflowTitle": $("#txtWorkflowTitle").val(),
                    "WorkflowType": $("#hdWorkflowType").val(),
                    "CCs": ccs,
                    "Notes": vcommentText,
                    "DurationPerTask": $("#txtDuration").val(),
                    "Initiator": localStorage.UserName,
                    "StopIfRejectedByAnyParticipant": "No",
                    "StopIfItemModified": "No",
                    "WorkflowStage": vWorkflowStage,
                    "ContractArea": $("#hdWorkflowContractArea").val(),
                    "BusinessArea": $("#hdWorkflowBusinessArea").val(),
                    "BusinessAreaPath": $("#hdWorkflowBusinessAreaPath").val(),
                    "AutoUpdateStatus": vAutoUpdateObjectStatus
                },
                cache: false,
                success: function (status) {
                    swal("", $("#hdWorkflowType").val() + " Workflow Started");
                    $("#inprocessStartWorkflow").css('display', 'none');
                    $("#dvWorkflow").dialog("close");//ui-dialog-buttonset
                }
            });
        }
        else {
            $("#loadingPage").fadeOut();
            swal("", "Note can not exceed 26500 characters");
        }
    }
}

function GetValuesAndAutoPopulate(controlname, values) {

    var multiarr = [];
    var res = values != null ? values.split(";") : [];
    var reslength = res.length;
    var resValue = "";
    for (var i = 0; i < reslength; i++) {
        //   multiarr.push(res[i].trim());
        resValue = res[i].trim();
        if (resValue != "") {
            if ($('#' + controlname + ' option[value="' + resValue + '"]').length > 0 && multiarr.indexOf(resValue) == -1)
                multiarr.push(resValue);
        }
    }

    ChosenOrder.setSelectionOrder($('#' + controlname), multiarr, true);

}