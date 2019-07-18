$('#nav li:has(ul)').doubleTapToGo();
var thisBusinessAreaName = "";
var thisContractAreaName = "";
var PipeReqApprovalTextarea;
var ObjectNameToSend = "";
var StatusRequest = [];
var workflowurltoshow = "";
//Vinod
var multipleChecksDocumentID = [];
var peoples = [];
var metadataLookUp = [];
var currentAutoCompleteUiObj = {}
var rowCounter = 0;
var SettingUserRole = "";
var contractSelected = {
    pages: [{ pageNumber: "", selectedIndexes: [], isAllSelected: false }]
};
var showAfterSave = "";
var personData = "";
$(function () {

    $("#mid-section1").click(function () {
        if (!$('#user-vmenu').hide()) {
            $('#user-vmenu').hide();
        }
    })


    $('input:radio[name=PeoplePermissions]').change(function () {
        if (this.value == 'Custom') {
            $("#trPermReadOnly").css('display', '');
            $("#trPermReadWrite").css('display', '');
            $("#trPermFullControl").css('display', '');
        }
        else if (this.value == 'Default') {
            $("#trPermReadOnly").css('display', 'none');
            $("#trPermReadWrite").css('display', 'none');
            $("#trPermFullControl").css('display', 'none');
        }
    });

    if (typeof localStorage.GlobalBusinessAreaLocation !== 'undefined') {
        if (localStorage.GlobalBusinessAreaLocation == "All" || localStorage.GlobalBusinessAreaLocation == "") {
            $("#heading_requests").text("Requests");

            $("#qvDraft").css('display', '');
            $("#qvSubmittedMyRequests").css('display', '');
            $("#qvAssigned").css('display', '');
            $("#qvUnassigned").css('display', 'none');
            $("#qvDelayed").css('display', 'none');
            $("#qvInRecycleBin").css('display', 'none');
        } else {
            //if global business area selected, do not show Create Contract menu
            $("#newContract").css('display', 'none');
            $("#newContract1").css('display', '');

            thisContractAreaName = localStorage.GlobalBusinessAreaLocation.split('>')[0].trim();
            thisBusinessAreaName = localStorage.GlobalBusinessArea + ';' + thisContractAreaName;//Business Area +';'+ Contract Area
            $("#dashmain").attr("src", "/Content/images/icon/gen.png");
            $("#heading_requests").text(localStorage.GlobalBusinessAreaLocation);

            $("#qvDraft").css('display', 'none');
            $("#qvSubmittedMyRequests").css('display', 'none');
            $("#qvAssigned").css('display', 'none');
            $("#qvUnassigned").css('display', '');
            $("#qvDelayed").css('display', '');
            $("#qvInRecycleBin").css('display', '');
        }
    } else {
        $("#qvDraft").css('display', '');
        $("#qvSubmittedMyRequests").css('display', '');
        $("#qvAssigned").css('display', '');
        $("#qvUnassigned").css('display', 'none');
        $("#qvDelayed").css('display', 'none');
        $("#qvInRecycleBin").css('display', 'none');
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


    showAfterSave = "";
    GetSavedViews();

    BindRequestTypes();

    BindStatus();
    CheckBulkUpload();


    $("#browseBA").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Users",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "OK": function () { ChangeBusinessAreaMultiple(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#browseCounterparty").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Counterparty",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "OK": function () { ChangeCounterpartyMultiple(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $('#dialogSummary').dialog({
        autoOpen: false, closeText: "",
        width: "70%",
        title: 'Request Metadata',
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "Close": function () {
                $(this).dialog("close");
            }
        }
    });

    $("#dvAlertDetails1").dialog({
        autoOpen: false, closeText: "",
        width: "45%",
        title: "Alert",
        modal: true,
    });

    $("#addNewAdvanceView").dialog({
        autoOpen: false,
        closeText: "",
        width: "70%",
        title: "New View",
        dialogClass: "popup_width100",
        modal: true,
        resizable: false,
        buttons: [
            {
                id: "btnCreateAdvanceView",
                text: "Create",
                click: function () {
                    SaveView('true', 'add');
                }
            },
            {
                id: "btnAdvanceViewSaveAs",
                text: "Save as New View",
                click: function () {
                    SaveView('true', 'add');
                }
            },
            {
                id: "btnUpdateAdvanceView",
                text: "Update View",
                click: function () {
                    SaveView('true', 'update');
                }
            },
            {
                id: "btnAdvanceViewCancel",
                text: "Cancel",
                click: function () {
                    $(this).dialog("close");
                }
            }

        ],

        close: function (event, ui) {
            restoreAdvanceViewIntial();

        }

    });
});

$('#txtSearchBoxCP').keypress(function (e) {
    if (e.keyCode == 13) {
        $(".ui-autocomplete").css('display', 'none');
        SearchCounterparty();
    }
});

$('.nicEdit-panelContain').parent().width('100%');
$('.nicEdit-panelContain').parent().next().width('100%');
$('.nicEdit-main').width("99%");

$("#conSortByOptions").niceSelect();

$("#conSortByOptions").on('change', function () {
    applyFilter($("#conSortByOptions").val())
});

$("#conSortDirection").on('click', function () {
    var direction = $("#conSortDirection").attr("data-direction");
    if (direction == 'ASC') {
        $("#conSortDirection").attr("data-direction", 'DESC');
        $("#conSortDirection").attr("src", '/Content/Images/up_arrow_1.png');
    } else {
        $("#conSortDirection").attr("data-direction", 'ASC');
        $("#conSortDirection").attr("src", '/Content/Images/down-arrow_1.png');

    }
    applyFilter($("#conSortByOptions").val(), direction);
});

$("#advanceViewSortDirection").click(function () {
    var direction = $("#advanceViewSortDirection").attr("data-direction");
    if (direction == 'ASC') {
        $("#advanceViewSortDirection").attr("data-direction", 'DESC');
        $("#advanceViewSortDirection").attr("src", '/Content/Images/up_arrow_1.png');
    } else {
        $("#advanceViewSortDirection").attr("data-direction", 'ASC');
        $("#advanceViewSortDirection").attr("src", '/Content/Images/down-arrow_1.png');
    }
});

function BindRequestTypes() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/requesttypes',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (RequestType) {
            var data = $.grep(RequestType, function (n, i) {
                return (n.Active == true);
            });
            var appendItemsToContractType = 0;
            var datalenght = data.length;
            var count = 0;
            var vlength = 0;
            if (thisContractAreaName != "") {
                //Get contract area settings
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/contractareadetailsbyname?contractareaname=' + encodeURIComponent(thisContractAreaName),
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
                                var myUrl = '/Pipeline/CreateRequest?RequestType=' + encodeURIComponent(item.RequestType);
                                var article = '<li><a href=' + myUrl + ' style="word-break: break-all;">' + item.RequestType + '</a></li>';


                                var find = " ";
                                var re = new RegExp(find, 'g');

                                var str = item.RequestType.replace(re, '');
                                $("#filterRequestType").append('<option value="' + str + '" title="' + item.RequestType + '">' + item.RequestType + '</option>')

                                if (item.Active == true) {
                                    $("#ulAllRequestTypes").append(article);
                                    if (count < 10) {
                                        $("#menu3").append(article);
                                    }

                                }
                                count++;
                            }
                        }
                        vlength = count;
                    },
                    error: function (data1) {
                        $("#menu3").append('<li style="color:red;">No items found.</li>');

                    }
                });
            } else {
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];
                    var myUrl = '/Pipeline/CreateRequest?RequestType=' + encodeURIComponent(item.RequestType);
                    var article = '<li><a href=' + myUrl + ' style="word-break: break-all;">' + item.RequestType + '</a></li>';


                    var find = " ";
                    var re = new RegExp(find, 'g');

                    var str = item.RequestType.replace(re, '');
                    $("#filterRequestType").append('<option value="' + str + '" title="' + item.RequestType + '">' + item.RequestType + '</option>')

                    if (item.Active == true) {
                        $("#ulAllRequestTypes").append(article);
                        if (i < 10) {
                            $("#menu3").append(article);
                        }
                    }
                }
                vlength = data.length;
            }


            $("#filterRequestType option[value='All']").prop("selected", true);
            var vCount = $("#ulAllRequestTypes li").length;
            if (vCount != 0) {
                $('#compact-pagination-ContractTypes').pagination({
                    items: vCount,
                    itemsOnPage: 10,
                    type: 'ul',
                    row: 'li',
                    typeID: 'ulAllRequestTypes',
                    cssStyle: 'compact-theme'
                });
            } else {
                $('#menu3').html('<p style="margin-left: 20px;">No items found.</p>')
            }
        },
        error:
            function (RequestType) {
                $("#btnRequestTypeViewAll").css('display', 'none');
                $("#menu3").append('<li style="color:red;">No items found.</li>');
            }
    });
}



function BindStatus() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/requeststatus',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: false,
        success: function (requestsstatuses) {
            StatusRequest = requestsstatuses;
            var datalenght = requestsstatuses.length;
            for (var i = 0; i < datalenght; i++) {
                var item = requestsstatuses[i];
                //var find = " ";
                //var re = new RegExp(find, 'g');

                //var str = item.RequestStatus.replace(re, '');

                $("#filterStatus").append('<option value="' + item.RequestStatus + '" title="' + item.RequestStatus + '">' + item.RequestStatus + '</option>')
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

    if (localStorage.UserType.indexOf("Global Contract Owner") >= 0) {
        $(".GlobalManage").css('display', '');
    } else {
        $(".GlobalManage").css('display', 'none');
    }
    $("#addNewView").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Add View",
        dialogClass: "popup_width100",
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
    var vViewName = getParameterByName('View');


    if (vViewName == '') {
        var obj = { name: "All", innerText: "All" };
        quickViewDisplay(obj);
        $("#filteroptiontype").css('display', '');
    } else {
        var obj = { name: vViewName, innerText: vViewName };
        quickViewDisplay(obj);
    }


    BindPeople();
    //Contract Type Popup
    $("#popupAllRequestTypes").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Request Types",
        dialogClass: "popup_width100",
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
        dialogClass: "popup_width100",
        modal: true,
        resizable: true,
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
        dialogClass: "popup_width100",
        height: "auto",
        modal: true,
        buttons: {
            "Close": function () { $(this).dialog("close"); }
        }
    });
    $("#shareContract").dialog({
        autoOpen: false, closeText: "",
        width: "75%",
        title: "Share Contract Record",
        dialogClass: "popup_width100",
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
        dialogClass: "popup_width100",
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
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "OK": function () { imgcheckgeneral(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
    $("#addEditPeople").dialog({
        autoOpen: false, closeText: "",
        width: "65%",
        title: "People",
        dialogClass: "popup_width100",
        modal: true,
        height: "auto",
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
        dialogClass: "popup_width100",
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
        dialogClass: "popup_width100",
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
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "OK": function () { changestatusmultiple(); },
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
        height: "auto",
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
        dialogClass: "popup_width100",
        modal: true,
        height: "auto",
        buttons: {
            "Start": function () { StartWorkflow(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
    $("#aRecently").css("background-color", "#cccccc");
    selectedSortOption = "Recently Updated";
    $("#txtSortBy").val(selectedSortOption)
});
//*Harshitha
$(window).on('load', function () {
    $('.nicEdit-panelContain').parent().width('100%');
    $('.nicEdit-panelContain').parent().next().width('100%');
    $('.nicEdit-main').width("99%");
});


$('#btnNewContractCancel').click(function () {

    $("#divToAppendCreateContract").hide();
});





function getQuickViewLinkName(qvName) {
    var splitName = qvName.split(':');
    var rName = splitName[splitName.length - 1];
    rName = $.trim(rName);
    return rName;
}


function SaveView() {
    if ($("#txtViewName").val() == "") {

        swal("", "Enter View Name.");
    }
    else {

        var query = "Status:";
        $("#liFiltersStatus span").each(function (i, item) {
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
        var viewName = "";
        $("#liRequestViews li P").each(function (i, item) {
            if (item.textContent.toLowerCase() == $("#txtViewName").val().toLowerCase()) {
                viewName = viewName + item.textContent.toLowerCase();

            }

        });

        if (viewName == "") {
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
                    SearchKeyword: $("#txtSearchBox").val().trim(),
                    SortBy: $("#txtSortBy").val(),
                    ViewFor: 'Request',
                    ViewQuery: query,
                    DefaultViewName: qvName,
                    CreatedBy: localStorage.UserName,
                    ModifiedBy: localStorage.UserName
                },
                cache: false,
                success: function (person) {
                    //Bug id: eO38010
                    if (person.indexOf('&') >= 0) {
                        person = person.split('&');
                        swal("", person[1]);
                        $("#txtViewName").val("")
                        showAfterSave = "";
                        GetSavedViews();
                        $("#addNewView").dialog("close");
                    }
                        //Bug id: eO38010
                    else if (person == "Please provide other view name.") {

                        swal("", "View Name Already Exist"); // Bug(eO37164)
                    }
                }
            });
        } else {
            swal("", "View Name already exist, Please provide other view name.");
        }
    }
}

function GetSavedViews() {
    $('#liRequestViews').empty();
    //Get Request views
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/savedview?viewfor=Request&userid=',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $("#divChkSelectAll").css('display', '');
            $("#liRequestViews").empty();
            var article = "";
            var datalength = data.length;
            for (var i = 0; i < datalength; i++) {
                var item = data[i];
                var removeBtn = '';
                if (localStorage.UserType.indexOf("Global Contract Owner") >= 0 || localStorage.UserType.indexOf("Global Administrator") >= 0 || localStorage.UserName == item.CreatedBy)
                    removeBtn = '<a href="javascript:void(0);"><img title="Delete" src="../Content/Images/close-quick.png" onclick="deleteSavedView(this)" id=' + item.RowKey + ' /></a>';
                if (typeof item.isAdvanceView == 'undefined' || item.isAdvanceView != 'Yes')
                    article = '<li><p><a href="javascript:void(0)" data-isAdvance="No"   style="width: auto;" onclick="javascript:savedViewDisplay(this)" id="' + item.RowKey + '" name="' + item.ViewName + '" title="' + item.ViewName + '">' + item.ViewName + '</a></p>' + removeBtn + '</li>';
                else
                    article = '<li><p><a href="javascript:void(0)" data-isAdvance="Yes" style="width: auto;" onclick="javascript:savedViewDisplay(this)" id="' + item.RowKey + '" name="' + item.ViewName + '" title="' + item.ViewName + '">' + item.ViewName + '</a></p>' + removeBtn + '</li>';
                $("#liRequestViews").append(article);
            }
            if (showAfterSave == "add" && typeof showAfterSave != "undefined") {
                if (personData != "") {
                    var viewObj = $("#liRequestViews li p a").filter('[id*=' + '"' + personData.split('&')[0] + '"' + ']');
                    $("#loadingPage").fadeOut();
                    if (viewObj.length > 0)
                        savedViewDisplay(viewObj[0])
                }
            }
            else if (showAfterSave == "update" && typeof showAfterSave != "undefined") {
                var viewObj = $("#liRequestViews li p a").filter('[id*=' + '"' + $("#txtViewID").val() + '"' + ']');
                $("#loadingPage").fadeOut();
                if (viewObj.length > 0)
                    savedViewDisplay(viewObj[0])
            }
        },
        error:
            function (data) {
                $('#liRequestViews').empty();
                $("#liRequestViews").append('<p class="f_p-error">No items found.</p>');
                $("#divChkSelectAll").css('display', 'none');
            }
    });
    $("#dvfilter").hide();
    //$("#liAdvanceViewFilter").html(filterHtml + '<a style="float:right;" href="javascript:void(0)" onclick="editAdvanceView()">Edit View</a>');
}


//function GetSavedViews() {
//    $('#liRequestViews').empty();
//    //Get Contract views
//    $.ajax({
//        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/savedview?viewfor=Request&userid=',
//        type: 'GET',
//        dataType: 'json',
//        'Content-Type': 'application/json',
//        cache: false,
//        headers: { 'eContracts-ApiKey': localStorage.APIKey },
//        success: function (data) {
//            $("#divChkSelectAll").css('display', '');
//            $("#liRequestViews").empty();

//            var datalenght = data.length;
//            for (var i = 0; i < datalenght; i++) {
//                var item = data[i];
//                var removeBtn = '';
//                if (localStorage.UserType.indexOf("Global Contract Owner") >= 0 || localStorage.UserType.indexOf("Global Administrator") >= 0 || localStorage.UserName == item.CreatedBy)
//                    removeBtn = '<a href="javascript:void(0);"><img title="Delete" src="../Content/Images/close-quick.png" onclick="deleteSavedView(this)" id=' + item.RowKey + ' /></a>';
//                var article = '<li><p><a href="javascript:void(0)" onclick="javascript:savedViewDisplay(this)" id="' + item.RowKey + '" name="' + item.ViewName + '" title="' + item.ViewName + '">' + item.ViewName + '</a></p>' + removeBtn + '</li>';
//                $("#liRequestViews").append(article);
//            }
//        },
//        error:
//            function (data) {
//                $('#liRequestViews').empty();
//                $("#liRequestViews").append('<p class="f_p-error">No items found.</p>');
//                $("#divChkSelectAll").css('display', 'none');
//            }
//    });
//}


function getsavedViewFilter(obj) {
    if (obj.name == "Draft & New Contracts") {

        $("#filteroptiontype").css('display', '');
        $("#filteroptiondates").css('display', 'none');
        $("#filteroptionstatus").css('display', '');
        $("#filteroption1").css('display', 'none');
        $("#filteroptionrenewdates").css('display', 'none');
    }
    else if (obj.name == "Past Requests") {
        $("#filteroptiontype").css('display', '');
        $("#filteroptiondates").css('display', 'none');
        $("#filteroptionstatus").css('display', '');
        $("#filteroption1").css('display', 'none');
        $("#filteroptionrenewdates").css('display', 'none');
    }

    $("#btnAddViewRequest").css('display', 'none');
}



//function savedViewDisplay(obj) {
//    $(".hhide").hide();
//    $(".drop_a").hide();
//    colorLink('liRequestViews a', false);
//    colorLink('liQuickView span', false);
//    colorLink('liQuickView a', false);
//    colorLink('liRequestViews span', false);
//    $('#liFiltersQuickView').empty();
//    //colorLink('spnMyRequests', false);
//    //colorLink('spnSubmittedMyRequests', false);
//    //colorLink('spnPastRequests', false);
//    //colorLink('spnAllRequests', false);
//    colorLink(obj.id, true);
//    $("#txtSearchBox").attr("placeholder", "Search in '" + obj.innerText + "'");
//    $("#dvSrhBox").css('display', '');
//    $("#btnFilter").css('display', 'inline');
//    $.ajax({
//        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/savedview?viewid=' + obj.id + '&userid=' + localStorage.UserID,
//        type: 'GET',
//        dataType: 'json',
//        headers: { 'eContracts-ApiKey': localStorage.APIKey },
//        "Content-Type": "application/json",
//        cache: false,
//        success: function (savedviewentity) {

//            // Clear Status and Rebind the Status Values - Bug(eO36969) 
//            $("#filterStatus").empty();
//            $("#filterStatus").append('<option value="All" selected title="All">All</option>')
//            $(StatusRequest).each(function (i, item) {
//                $("#filterStatus").append('<option value="' + item.RequestStatus + '" title="' + item.RequestStatus + '">' + item.RequestStatus + '</option>')
//            });

//            $("#filterUserType option:selected").prop('selected', false);
//            $("#filterStatus option:selected").prop('selected', false);
//            $("#filterDates option:selected").prop('selected', false);
//            $("#filterRenewDates option:selected").prop('selected', false);
//            $("#filterRequestType option:selected").prop('selected', false);
//            $("#liFiltersSearchText").empty();
//            $("#liFiltersStatus").empty();
//            $("#liFiltersType").empty();
//            $("#liFiltersUserType").empty();
//            $("#liFiltersRenewal").empty();
//            $("#liFiltersExpiration").empty();
//            $("#txtSearchBox").val(savedviewentity.SearchKeyword);
//            if (savedviewentity.SearchKeyword != "" && savedviewentity.SearchKeyword != null) {
//                $('#liFiltersSearchText').html('<span><small>Showing search result for : ' + savedviewentity.SearchKeyword + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
//            }
//            selectedSortOption = savedviewentity.SortBy;
//            $('#tdSort a').each(function (i, item) {
//                item.style.backgroundColor = "";
//            });
//            var defaultviewname = savedviewentity.DefaultViewName;
//            savedViewNameFromViewTable = defaultviewname;
//            var savedview = { name: defaultviewname }
//            getsavedViewFilter(savedview);
//            for (var i = 0; i <= savedviewentity.ViewQuery.split(';').length; i++) {
//                if (savedviewentity.ViewQuery.split(';')[i] != null) {
//                    var columnvalue = savedviewentity.ViewQuery.split(';')[i].split(':')[0]
//                    if (columnvalue != "") {
//                        switch (columnvalue) {
//                            case "Status":
//                                var values1 = savedviewentity.ViewQuery.split(';')[i].split(':')[1].split(',');

//                                for (var j = 0; j < values1.length; j++) {
//                                    var find = " ";
//                                    //var re = new RegExp(find, 'g');

//                                    //values1[j] = values1[j].replace(re, '');
//                                    if (values1[j] != "") {
//                                        $("#filterStatus option[value='" + values1[j].trim() + "']").prop("selected", true);
//                                        //$('#liFiltersStatus').append('<span><small>' + $(selectedSortOption).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
//                                        $('#liFiltersStatus').append('<span><small>' + values1[j].trim() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');

//                                    }
//                                }
//                                break;
//                            case "RequestType":
//                                var values1 = savedviewentity.ViewQuery.split(';')[i].split(':')[1].split(',');

//                                for (var j = 0; j < values1.length; j++) {
//                                    var find = " ";
//                                    var re = new RegExp(find, 'g');

//                                    values1[j] = values1[j].replace(re, '');
//                                    if (values1[j] != "") {
//                                        $("#filterRequestType option[value='" + values1[j].trim() + "']").prop("selected", true);
//                                        $('#liFiltersType').append('<span><small>' + values1[j].trim() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
//                                    }
//                                }
//                                break;
//                            case "RenewalDate":
//                                var values1 = savedviewentity.ViewQuery.split(';')[i].split(':')[1].split(',');

//                                for (var j = 0; j < values1.length; j++) {
//                                    var find = " ";
//                                    var re = new RegExp(find, 'g');

//                                    values1[j] = values1[j].replace(re, '');

//                                    var optionval = values1[j];
//                                    var newval = "";
//                                    if (optionval == "<7days")
//                                        newval = "7";
//                                    else if (optionval == "<15days")
//                                        newval = "15";
//                                    else if (optionval == "<30days")
//                                        newval = "30";
//                                    else if (optionval == "<60days")
//                                        newval = "60";
//                                    else if (optionval == "<90days")
//                                        newval = "90";
//                                    else if (optionval == ">90days")
//                                        newval = "90 daysgt";
//                                    else if ((optionval == "Overdue/Expired") || (optionval == "Overdue"))
//                                        newval = "Overdue";

//                                    if (newval != "") {
//                                        $("#filterRenewDates option[value='" + newval + "']").prop("selected", true);
//                                    }
//                                }
//                                break;
//                            case "ExpiryDate":
//                                var values1 = savedviewentity.ViewQuery.split(';')[i].split(':')[1].split(',');

//                                for (var j = 0; j < values1.length; j++) {
//                                    var find = " ";
//                                    var re = new RegExp(find, 'g');

//                                    values1[j] = values1[j].replace(re, '');

//                                    var optionval = values1[j];
//                                    var newval = "";
//                                    if (optionval == "<7days")
//                                        newval = "7";
//                                    else if (optionval == "<15days")
//                                        newval = "15";
//                                    else if (optionval == "<30days")
//                                        newval = "30";
//                                    else if (optionval == "<60days")
//                                        newval = "60";
//                                    else if (optionval == "<90days")
//                                        newval = "90";
//                                    else if (optionval == ">90days")
//                                        newval = "90 daysgt";
//                                    else if ((optionval == "Overdue/Expired") || (optionval == "Overdue"))
//                                        newval = "Overdue";

//                                    if (newval != "") {
//                                        $("#filterDates option[value='" + newval + "']").prop("selected", true);
//                                    }
//                                }
//                                break;
//                            default:
//                                var values1 = savedviewentity.ViewQuery.split(';')[i].split(':')[0];
//                                var newval = "";
//                                switch (values1) {
//                                    case "Contract Manager":
//                                        newval = 'ContractManagers';
//                                        break;
//                                    case "Business Owner":
//                                        newval = 'BusinessOwners';
//                                        break;
//                                    case "Creator":
//                                        newval = 'CreatedBy';
//                                        break;
//                                    case "Approver":
//                                        newval = 'Approvers';
//                                        break;
//                                    case "Reviewer":
//                                        newval = 'Reviewers';
//                                        break;
//                                    case "Signee":
//                                        newval = 'Signees';
//                                        break;
//                                }
//                                if (newval != "") {
//                                    $("#filterUserType option[value='" + newval + "']").prop("selected", true);
//                                }
//                                break;
//                        }
//                    }
//                }
//            }

//            applyFilter();
//            savedViewNameFromViewTable = "";
//        }
//    });
//}

function editAdvanceView() {
    if (metadataLookUp.length == 0) {
        $("#loadingPage").fadeIn();
        //Assigned To
        var objAssigned = {};
        objAssigned.value = "Assigned To";
        objAssigned.fieldType = "User";
        objAssigned.choiceValues = "";
        objAssigned.fieldName = "AssignedTo";
        objAssigned.label = "Assigned To";

        //Status
        var objStatus = {};
        objStatus.value = "Status";
        objStatus.fieldType = "Custom Lookup";
        objStatus.choiceValues = "";
        objStatus.fieldName = "Status";
        objStatus.label = "Status";

        //Request Type
        var objRequestType = {};
        objRequestType.value = "Request Type";
        objRequestType.fieldType = "Lookup";
        objRequestType.choiceValues = "";
        objRequestType.fieldName = "RequestType";
        objRequestType.label = "Request Type";

        //Business Area
        var objBusinessArea = {};
        objBusinessArea.value = "Business Area";
        objBusinessArea.fieldType = "Taxonomy";
        objBusinessArea.choiceValues = "";
        objBusinessArea.fieldName = "BusinessArea";
        objBusinessArea.label = "Business Area";

        //Created Date
        var objCreatedDate = {};
        objCreatedDate.value = "Created Date";
        objCreatedDate.fieldType = "Date";
        objCreatedDate.choiceValues = "";
        objCreatedDate.fieldName = "Created";
        objCreatedDate.label = "Created Date";

        //Requestor
        var objRequestor = {};
        objRequestor.value = "Requestor";
        objRequestor.fieldType = "User";
        objRequestor.choiceValues = "";
        objRequestor.fieldName = "Requestor";
        objRequestor.label = "Requestor";

        metadataLookUp.push(objAssigned);
        metadataLookUp.push(objBusinessArea);
        metadataLookUp.push(objCreatedDate);
        metadataLookUp.push(objRequestor);
        metadataLookUp.push(objRequestType);
        metadataLookUp.push(objStatus);

        $("#loadingPage").fadeOut();
        appendFiltersOnEdit(currentadvanceViewObj.ViewQuery)

    } else {
        $("#loadingPage").fadeIn();
        appendFiltersOnEdit(currentadvanceViewObj.ViewQuery);
    }
}

function appendFiltersOnEdit(xmlQuery, isQuickView) {
    var condition = "";
    var operator = "";
    var metadataName = "";
    var metadataValue = "";
    var metadataType = "";
    var value = "";
    var tr = "";
    rowCounter = 0;
    restoreAdvanceViewIntial();
    $(xmlQuery).find('filter').each(function (index, value) {
        if (index == 0) {
            metadataName = $(value).find('metadataname').text();
            metadataValue = $(value).find('metadatavalue').text();
            metadataType = $(value).find('metadatatype').text();
            rvalue = $(value).find('value').text(); //eO310446
            operator = $(value).find('operator').text();

            $("#tr_0 input:text").filter('[id*="metadata_label_"]').val(metadataName);
            $("#tr_0 input:hidden").filter('[id*="metadata_value_"]').val(metadataValue);
            $("#tr_0 input:hidden").filter('[id*="metadata_type_"]').val(metadataType);

            //eO310303
            $("#metadata_label_0").autocomplete({
                source: metadataLookUp,
                minLength: 0,
                select: function (event, ui) {
                    $("#metadata_value_0").val(ui.item.fieldName)
                    $("#metadata_type_0").val(ui.item.fieldType)
                    currentAutoCompleteUiObj = ui;
                    createOperatorsBasedOnMetdataType(ui.item.fieldType, 0)
                    if (operator != 'empty' && operator != 'any')
                        createValueFieldBasedOnFieldType(ui.item.fieldType, ui.item.choiceValues, 0);

                },
                response: function (event, ui) {
                    if (ui.content.length === 0) {
                        $('#metadata_label_0').val('');
                        $('#metadata_value_0').val('');
                    } else {
                        //$('#metadata_label_' + (id + 1)).val('');
                        //$('#metadata_value_' + (id + 1)).val('');
                    }
                }
            }).focus(function () {
                $(this).autocomplete('search', $(this).val())
            });
            var list = $("#metadata_label_0").autocomplete("widget");
            $(list[0].children[0]).click();
            
        } else {
            insertNewfilterCondition("");
            metadataName = $(value).find('metadataname').text();
            metadataValue = $(value).find('metadatavalue').text();
            metadataType = $(value).find('metadatatype').text();
            rvalue = $(value).find('value').text(); //eO310446
            operator = $(value).find('operator').text();
            condition = $(value).find('condition').text();

            $("#tr_" + rowCounter + " input:text").filter('[id*="metadata_label_"]').val(metadataName);
            $("#tr_" + rowCounter + " input:hidden").filter('[id*="metadata_value_"]').val(metadataValue);
            $("#tr_" + rowCounter + " input:hidden").filter('[id*="metadata_type_"]').val(metadataType);
            $("#tr_" + rowCounter + " Select").filter('[id*="condition_"]').val(condition);

            $("#metadata_label_" + rowCounter).autocomplete({
                source: metadataLookUp,
                minLength: 0,
                select: function (event, ui) {
                    $("#metadata_value_" + rowCounter).val(ui.item.fieldName)
                    $("#metadata_type_" + rowCounter).val(ui.item.fieldType)
                    currentAutoCompleteUiObj = ui;
                    createOperatorsBasedOnMetdataType(ui.item.fieldType, rowCounter)
                    createValueFieldBasedOnFieldType(ui.item.fieldType, ui.item.choiceValues, 0);

                },


            }).focus(function () {
                $(this).autocomplete('search', $(this).val())
            });
            var list = $("#metadata_label_" + rowCounter).autocomplete("widget");
            $(list[0].children[0]).click();
           
        }
        var item = "";
        if (metadataType == "User" || metadataType == "Choice" || metadataType == "Yes/No" || metadataType == "Date" || metadataType == "Value / Financials" || metadataType == "Multi- Choice (Dropdown)") {
            item = metadataLookUp.filter(function (metadata, index) {
                return metadata.fieldName == metadataValue && metadata.fieldType == metadataType
            })
            if (item.length > 0 && typeof item[0] != 'undefined' && operator != 'empty' && operator != 'any')
                createValueFieldBasedOnFieldType(item[0].fieldType, item[0].choiceValues, rowCounter);
            else if (operator != 'empty' && operator != 'any')
                createValueFieldBasedOnFieldType('', '', rowCounter);

        } else if (operator != 'empty' && operator != 'any') {
            createValueFieldBasedOnFieldType('', '', rowCounter);
        }
        if (item.length > 0 && typeof item[0] != 'undefined')
            createOperatorsBasedOnMetdataType(item[0].fieldType, rowCounter);
        else
            createOperatorsBasedOnMetdataType('', rowCounter);
        $("#tr_" + rowCounter + " Select").filter('[id*="operator_"]').val(operator);
        switch (metadataType) {
            case "User":
                $("#tr_" + rowCounter + " input:text").filter('[id*="user_value_"]').val(rvalue + ','); //eO310446
                break;
            case "Choice":
            case "Multi - Choice(Dropdown)":
                $("#tr_" + rowCounter + " input:text").filter('[id*="choice_value_"]').val(rvalue + ','); //eO310446
                break;
            case "Yes/No":
                $("#tr_" + rowCounter + " select").filter('[id*="YesNo_value_"]').val(rvalue);
                break;
            case "Value / Financials":
                $("#tr_" + rowCounter + " input:text").filter('[id*="num_value_"]').val(rvalue);
                break;
            case "Date":
                var temp = "";
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                { temp = moment(new Date(rvalue)).format('MM/DD/YYYY'); }
                else { temp = moment(new Date(rvalue)).format(localStorage.AppDateFormat); }

                $("#tr_" + rowCounter + " input:text").filter('[id*="date_value_"]').datepicker('setDate', temp);
                break;
            default:
                if (rvalue != 'undefined' && rvalue != '')
                    $("#tr_" + rowCounter + " input:text").filter('[id*="text_value_"]').val(rvalue);
                break;

        }
        if (typeof isQuickView == 'undefined') {
            $("#txtAdvanceViewName").val(currentadvanceViewObj.ViewName);

        } else {
            $("#txtAdvanceViewName").val(ObjectNameToSend);
        }

        var sortBy = currentadvanceViewObj.SortBy.split('~')[0];
        var orderBy = currentadvanceViewObj.SortBy.split('~')[1];
        if (typeof sortBy != 'undefined' && sortBy != '' && sortBy != null)
            $("#conAdvanceViewSortBy").val(sortBy)
        if (sortBy == "Title(A-Z)" || sortBy == "Title(Z-A)") {
            $("#advanceViewSortDirection").css('display', 'none');
        }
        if (typeof orderBy != 'undefined' && orderBy != '' && orderBy != null) {
            if (orderBy == 'ASC') {
                $("#advanceViewSortDirection").attr("data-direction", 'ASC');
                $("#advanceViewSortDirection").attr("src", '/Content/Images/down-arrow_1.png');
            } else if (orderBy == 'DESC') {
                $("#advanceViewSortDirection").attr("data-direction", 'DESC');
                $("#advanceViewSortDirection").attr("src", '/Content/Images/up_arrow_1.png');
            }
        }
    });

    if (typeof isQuickView == 'undefined') {
        $("#addNewAdvanceView").dialog({ 'title': 'Edit View' });
        $("#btnCreateAdvanceView").css("display", "none");
        $("#btnUpdateAdvanceView").css("display", "");
        $("#btnAdvanceViewSaveAs").css("display", "");
    }
    else {
        $("#addNewAdvanceView").dialog({ 'title': 'Quick View' });
        $("#btnCreateAdvanceView").css("display", "none");
        $("#btnUpdateAdvanceView").css("display", "none");
        $("#btnAdvanceViewSaveAs").css("display", "");

    }
    $("#loadingPage").fadeOut();
    $("#addNewAdvanceView").dialog("open");
}

function savedViewDisplay(obj) {
    $("#txtSearchBox").val('');
    $("#liFiltersforQuickViews").css('display', 'none');
    if ($(obj).attr('data-isadvance') != 'Yes') {
        $(".hhide").hide();
        colorLink('liRequestViews a', false);
        $('#liFiltersQuickView').empty();
        colorLink('liQuickView span', false);
        colorLink('liRequestViews span', false);
        colorLink('liQuickView a', false);
        colorLink(obj.id, true);
        $("#txtSearchBox").attr("placeholder", "Search in '" + obj.innerText + "'");
        $("#dvSrhBox").css('display', '');
        //$("#btnFilter").css('display', 'inline');
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
                $("#filterContractType option:selected").prop('selected', false);
                $("#liFiltersSearchText").empty();
                $("#liFiltersStatus").empty();
                $("#liFiltersType").empty();
                $("#liFiltersUserType").empty();
                $("#liFiltersRenewal").empty();
                $("#liFiltersExpiration").empty();
                $("#txtSearchBox").val(savedviewentity.SearchKeyword);
                if (savedviewentity.SearchKeyword != "" && savedviewentity.SearchKeyword != null) {
                    $('#liFiltersSearchText').html('<span><small>Showing search result for : ' + savedviewentity.SearchKeyword + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
                }
                selectedSortOption = savedviewentity.SortBy;
                $("#conSortByOptions").val(selectedSortOption)
                $("#conSortByOptions").prop('disabled', true).niceSelect('update');
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
                                        if (values1[j] != "") {
                                            $("#filterStatus option[value='" + values1[j].trim() + "']").prop("selected", true);
                                            $('#liFiltersStatus').append('<span><small>' + values1[j].trim() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
                                        }
                                    }
                                    break;
                                case "ContractType":
                                    var values1 = savedviewentity.ViewQuery.split(';')[i].split(':')[1].split(',');

                                    for (var j = 0; j < values1.length; j++) {
                                        if (values1[j] != "") {
                                            $("#filterContractType option[value='" + values1[j].trim() + "']").prop("selected", true);
                                            $('#liFiltersType').append('<span><small>' + values1[j].trim() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
                                        }
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

                                        if (newval != "") {
                                            $("#filterRenewDates option[value='" + newval.trim() + "']").prop("selected", true);
                                        }
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

                                        if (newval != "") {
                                            $("#filterDates option[value='" + newval.trim() + "']").prop("selected", true);
                                        }
                                    }
                                    break;
                                default:
                                    var values1 = savedviewentity.ViewQuery.split(';')[i].split(':')[0];
                                    var newval = "";
                                    switch (values1) {
                                        case "Contract Owner":
                                            newval = 'ContractManagers';
                                            break;
                                        case "Business Owner":
                                            newval = 'BusinessAreaOwners';
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
                                        case "Authorizer":
                                            newval = 'RenewalConfirmParticipants';
                                            break;
                                    }
                                    if (newval != "") {
                                        $("#filterUserType option[value='" + newval.trim() + "']").prop("selected", true);
                                    }
                                    break;
                            }
                        }
                    }
                }
                applyFilter();
                savedViewNameFromViewTable = "";
            }
        });
    } else {
        colorLink('liRequestViews a', false);
        $('#liFiltersQuickView').empty();
        colorLink('liQuickView span', false);
        colorLink('liRequestViews span', false);
        colorLink('liQuickView a', false);
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/savedview?viewid=' + obj.id + '&userid=' + localStorage.UserID,
            type: 'GET',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            "Content-Type": "application/json",
            cache: false,
            success: function (savedviewentity) {
                currentadvanceViewObj = savedviewentity;
                $("#txtViewID").val(savedviewentity.RowKey);
                if (savedviewentity != null && savedviewentity != "") {
                    $("#liFiltersSearchText").empty();
                    $("#liFiltersStatus").empty();
                    $("#liFiltersType").empty();
                    $("#liFiltersUserType").empty();
                    $("#liFiltersRenewal").empty();
                    $("#liFiltersExpiration").empty();
                    $("#liAdvanceViewFilter").empty();
                    var viewQueryXml = savedviewentity.ViewQuery;
                    var condition = "";
                    var metadata = "";
                    var operator = "";
                    var value = "";
                    var metadatatype = "";
                    var filterHtml = "";
                    $(viewQueryXml).find('filter').each(function (index, node) {
                        if (index == 0) {
                            metadata = $(node).find('metadataname').text();
                            metadatatype = $(node).find('metadatatype').text();
                            operator = $(node).find('operator').text();
                            switch (operator) {
                                case "eq": operator = "Equals";
                                    break;
                                case "lt": operator = "Less than"
                                    break;
                                case "le": operator = "Less than or Equals to"
                                    break;
                                case "gt": operator = "Greater than to"
                                    break;
                                case "ge": operator = "Greater than or Equals to"
                                    break;
                                case "ne": operator = "Does not Equals to"
                                    break;
                                case "like": operator = "Contains";
                                    break;
                                case "empty": operator = "Is Empty"
                                    break;
                                case "any": operator = "Any"
                                    break;
                                case "notlike": operator = "Not Contains"
                                    break;
                            }
                            if (metadatatype == 'Date') {
                                value = $(node).find('value').text();
                                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                                { value = moment(new Date(value)).format('MM/DD/YYYY'); }
                                else { value = moment(new Date(value)).format(localStorage.AppDateFormat); }
                            } else {

                                value = $(node).find('value').text();
                            }
                            if (operator != "Is Empty" && operator != "Any")
                                filterHtml += '<span><small >' + metadata + ' ' + operator + ' ' + value + '</small></span>';
                            else
                                filterHtml += '<span><small >' + metadata + ' ' + operator + '</small></span>';
                        } else {
                            condition = $(node).find('condition').text();
                            metadata = $(node).find('metadataname').text();
                            metadatatype = $(node).find('metadatatype').text();
                            operator = $(node).find('operator').text();
                            switch (operator) {
                                case "eq": operator = "Equals";
                                    break;
                                case "lt": operator = "Less than"
                                    break;
                                case "le": operator = "Less than or Equals to"
                                    break;
                                case "gt": operator = "Greater than to"
                                    break;
                                case "ge": operator = "Greater than or Equals to"
                                    break;
                                case "ne": operator = "Does not Equals to"
                                    break;
                                case "like": operator = "Contains";
                                    break;
                                case "empty": operator = "Is Empty"
                                    break;
                                case "any": operator = "Any"
                                    break;
                                case "notlike": operator = "Not Contains"
                                    break;
                            }
                            if (metadatatype == 'Date') {
                                value = $(node).find('value').text();
                                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                                { value = moment(new Date(value)).format('MM/DD/YYYY'); }
                                else { value = moment(new Date(value)).format(localStorage.AppDateFormat); }
                            } else {

                                value = $(node).find('value').text();
                            }
                            if (operator != "Is Empty" && operator != "Any")
                                filterHtml += ' <span><small>' + condition + '</small></span>' + '<span><small >' + metadata + ' ' + operator + ' ' + value + '</small></span>';
                            else
                                filterHtml += '<span><small >' + condition + '</small></span>' + '<span><small >' + metadata + ' ' + operator + '</small></span>';
                        }
                    });

                    $("#spResult").empty();
                    var qvName = "";
                    var defaultviewname = savedviewentity.ViewName;
                    savedViewNameFromViewTable = defaultviewname;
                    qvName = currentadvanceViewObj.ViewName;
                    colorLink('spnAllContracts', false);
                    colorLink('spnDraft', false);
                    colorLink('spnWaitingOnMe', false);
                    colorLink('spnSigned', false);
                    colorLink('spnActive', false);
                    colorLink('spnUpcomingRenewals', false);
                    colorLink('spnUpcomingExpirations', false);
                    colorLink('spnOwnedByMe', false);
                    colorLink('spnCreatedByMe', false);
                    colorLink('spnSharedContracts', false);
                    colorLink('spnWithCustomPermissions', false);
                    colorLink('spnInRecycleBin', false);
                    colorLink('spnPast', false);
                    colorLink('liRequestViews a', false);
                    colorLink(obj.id, true);
                    $("#filteroptiontype").css('display', 'none');
                    $("#filteroptiondates").css('display', 'none');
                    $("#filteroptionstatus").css('display', '');
                    $("#filteroption1").css('display', '');
                    $("#filteroptionrenewdates").css('display', 'none');
                    //$("#btnFilter").css('display', 'inline');
                    $("#txtSearchBox").attr("placeholder", "Search in 'All' ");

                    $('#menu4').hide();
                    $("#showAll").css('display', 'none');
                    $("#liFiltersSearchText").empty();
                    $("#liFiltersStatus").empty();
                    $("#liFiltersType").empty();
                    $("#liFiltersUserType").empty();
                    $("#liFiltersRenewal").empty();
                    $("#liFiltersExpiration").empty();
                    $("#liAdvanceViewFilter").empty();
                    var newurl = "";
                    var sortby = "&sortbyfield=Timestamp&orderby=DESC";
                    if (typeof currentadvanceViewObj.SortBy != 'undefined') {
                        selectedSortOption = currentadvanceViewObj.SortBy.split('~')[0];
                    }
                    $("#conSortByOptions").val(selectedSortOption)
                    $("#conSortByOptions").prop('disabled', true).niceSelect('update');
                    switch (selectedSortOption) {
                        case "Recently Updated":
                            sortby = '&sortbyfield=Timestamp&orderby=DESC';
                            break;
                        case "Recently Submited":
                            sortby = '&sortbyfield=SubmittedOn&orderby=DESC';
                            break;
                        case "Title(A-Z)":
                            sortby = '&sortbyfield=RequestTitle&orderby=ASC';
                            break;
                        case "Title(Z-A)":
                            sortby = '&sortbyfield=RequestTitle&orderby=DESC';
                            break;
                        default:
                            sortby = '&sortbyfield=Timestamp&orderby=DESC';
                            break;
                    }
                    //if (typeof currentadvanceViewObj.SortBy != 'undefined') {
                    //    var orderBy = currentadvanceViewObj.SortBy.split('~')[1];
                    //    if (typeof orderBy != 'undefined' && sortby.indexOf('ContractTitle') == -1) {
                    //        sortby = sortby.substr(0, sortby.lastIndexOf('&'));
                    //        sortby = sortby + '&orderby=' + orderBy;
                    //    }
                    //}
                    var baname = ";";
                    if (thisBusinessAreaName == "" || thisBusinessAreaName == "All") {
                    } else {
                        baname = thisBusinessAreaName;
                    }
                    var baloc = "";
                    if (typeof localStorage.GlobalBusinessAreaLocation != 'undefined' && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
                        baloc = encodeURIComponent(localStorage.GlobalBusinessAreaLocation);
                    }
                    //var customquery = '';
                    //$(viewQueryXml).find('filter').each(function (index, node) {
                    //    if ($(node).find('metadatavalue').text() != "") {
                    //        customquery += $(node).find('metadatavalue').text() + ":" + $(node).find('value').text();
                    //    }
                    //});
                    //newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests?BusinessAreaPath=' + baloc + '&stage=pipeline&searchkeyword=' + encodeURIComponent($("#txtSearchBox").val().trim()) + '&customquery=' + encodeURIComponent(customquery) + sortby + "&viewName=All";
                    newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/advacnedviewrecords?BusinessAreaPath=' + baloc + '&stage=pipeline&filterXml=' + viewQueryXml + sortby + "&viewName=" + qvName + '&searchkeyword=' + encodeURIComponent($("#txtSearchBox").val());
                    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
                    $.ajax({
                        url: newurl,
                        type: 'GET',
                        dataType: 'json',
                        'Content-Type': 'application/json',
                        cache: false,
                        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessAreaLocation: localStorage.GlobalBusinessAreaLocation },
                        success: function (data) {
                            $("#compact-pagination").css('display', '');
                            $('#listContracts').empty();
                            GetData(data);
                        },
                        error:
                            function (data) {
                                $("#listContracts").empty();
                                $("#listContracts").append("<p class='f_p-error'>No items found.</p>");
                                $("#compact-pagination").css('display', 'none');
                                $("#divChkSelectAll").css('display', 'none');
                            }
                    });
                    $("#dvfilter").hide();
                    $("#liAdvanceViewFilter").html(filterHtml + '<a style="float:right;" href="javascript:void(0)" onclick="editAdvanceView()">Edit View</a>');
                    //manoj
                    var txtsearchboxvalue = $.trim($('#txtSearchBox').val().trim());
                    $("#txtSearchBox").val(txtsearchboxvalue);
                    if (txtsearchboxvalue != "" && txtsearchboxvalue != null) {
                        $('#liFiltersSearchText').html('<span><small>Showing search result for : ' + txtsearchboxvalue + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
                    }
                    //manoj
                }
            }
        });
    }
}

//manoj
function savedViewDisplaywithSearch(obj) {
    $("#liFiltersforQuickViews").css('display', 'none');
    if ($(obj).attr('data-isadvance') != 'Yes') {
        $(".hhide").hide();
        colorLink('liRequestViews a', false);
        $('#liFiltersQuickView').empty();
        colorLink('liQuickView span', false);
        colorLink('liRequestViews span', false);
        colorLink('liQuickView a', false);
        colorLink(obj.id, true);
        $("#txtSearchBox").attr("placeholder", "Search in '" + obj.innerText + "'");
        $("#dvSrhBox").css('display', '');
        //$("#btnFilter").css('display', 'inline');
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
                $("#filterContractType option:selected").prop('selected', false);
                $("#liFiltersSearchText").empty();
                $("#liFiltersStatus").empty();
                $("#liFiltersType").empty();
                $("#liFiltersUserType").empty();
                $("#liFiltersRenewal").empty();
                $("#liFiltersExpiration").empty();
                $("#txtSearchBox").val(savedviewentity.SearchKeyword);
                if (savedviewentity.SearchKeyword != "" && savedviewentity.SearchKeyword != null) {
                    $('#liFiltersSearchText').html('<span><small>Showing search result for : ' + savedviewentity.SearchKeyword + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
                    //manoj
                    var txtsearchboxvalue = $.trim($('#txtSearchBox').val().trim());
                    $("#txtSearchBox").val(txtsearchboxvalue);
                    if (txtsearchboxvalue != "" && txtsearchboxvalue != null) {
                        $('#liFiltersSearchText').html('<span><small>Showing search result for : ' + txtsearchboxvalue + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
                    }
                    //manoj
                }
                selectedSortOption = savedviewentity.SortBy;
                $("#conSortByOptions").val(selectedSortOption)
                $("#conSortByOptions").prop('disabled', true).niceSelect('update');
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
                                        if (values1[j] != "") {
                                            $("#filterStatus option[value='" + values1[j].trim() + "']").prop("selected", true);
                                            $('#liFiltersStatus').append('<span><small>' + values1[j].trim() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
                                        }
                                    }
                                    break;
                                case "ContractType":
                                    var values1 = savedviewentity.ViewQuery.split(';')[i].split(':')[1].split(',');

                                    for (var j = 0; j < values1.length; j++) {
                                        if (values1[j] != "") {
                                            $("#filterContractType option[value='" + values1[j].trim() + "']").prop("selected", true);
                                            $('#liFiltersType').append('<span><small>' + values1[j].trim() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
                                        }
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

                                        if (newval != "") {
                                            $("#filterRenewDates option[value='" + newval.trim() + "']").prop("selected", true);
                                        }
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

                                        if (newval != "") {
                                            $("#filterDates option[value='" + newval.trim() + "']").prop("selected", true);
                                        }
                                    }
                                    break;
                                default:
                                    var values1 = savedviewentity.ViewQuery.split(';')[i].split(':')[0];
                                    var newval = "";
                                    switch (values1) {
                                        case "Contract Owner":
                                            newval = 'ContractManagers';
                                            break;
                                        case "Business Owner":
                                            newval = 'BusinessAreaOwners';
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
                                        case "Authorizer":
                                            newval = 'RenewalConfirmParticipants';
                                            break;
                                    }
                                    if (newval != "") {
                                        $("#filterUserType option[value='" + newval.trim() + "']").prop("selected", true);
                                    }
                                    break;
                            }
                        }
                    }
                }
                applyFilter();
                savedViewNameFromViewTable = "";
            }
        });
    } else {
        colorLink('liRequestViews a', false);
        $('#liFiltersQuickView').empty();
        colorLink('liQuickView span', false);
        colorLink('liRequestViews span', false);
        colorLink('liQuickView a', false);
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/savedview?viewid=' + obj.id + '&userid=' + localStorage.UserID,
            type: 'GET',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            "Content-Type": "application/json",
            cache: false,
            success: function (savedviewentity) {
                currentadvanceViewObj = savedviewentity;
                $("#txtViewID").val(savedviewentity.RowKey);
                if (savedviewentity != null && savedviewentity != "") {
                    $("#liFiltersSearchText").empty();
                    $("#liFiltersStatus").empty();
                    $("#liFiltersType").empty();
                    $("#liFiltersUserType").empty();
                    $("#liFiltersRenewal").empty();
                    $("#liFiltersExpiration").empty();
                    $("#liAdvanceViewFilter").empty();
                    var viewQueryXml = savedviewentity.ViewQuery;
                    var condition = "";
                    var metadata = "";
                    var operator = "";
                    var value = "";
                    var metadatatype = "";
                    var filterHtml = "";
                    $(viewQueryXml).find('filter').each(function (index, node) {
                        if (index == 0) {
                            metadata = $(node).find('metadataname').text();
                            metadatatype = $(node).find('metadatatype').text();
                            operator = $(node).find('operator').text();
                            switch (operator) {
                                case "eq": operator = "Equals";
                                    break;
                                case "lt": operator = "Less than"
                                    break;
                                case "le": operator = "Less than or Equals to"
                                    break;
                                case "gt": operator = "Greater than to"
                                    break;
                                case "ge": operator = "Greater than or Equals to"
                                    break;
                                case "ne": operator = "Does not Equals to"
                                    break;
                                case "like": operator = "Contains";
                                    break;
                                case "empty": operator = "Is Empty"
                                    break;
                                case "any": operator = "Any"
                                    break;
                                case "notlike": operator = "Not Contains"
                                    break;
                            }
                            if (metadatatype == 'Date') {
                                value = $(node).find('value').text();
                                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                                { value = moment(new Date(value)).format('MM/DD/YYYY'); }
                                else { value = moment(new Date(value)).format(localStorage.AppDateFormat); }
                            } else {

                                value = $(node).find('value').text();
                            }
                            if (operator != "Is Empty" && operator != "Any")
                                filterHtml += '<span><small >' + metadata + ' ' + operator + ' ' + value + '</small></span>';
                            else
                                filterHtml += '<span><small >' + metadata + ' ' + operator + '</small></span>';
                        } else {
                            condition = $(node).find('condition').text();
                            metadata = $(node).find('metadataname').text();
                            metadatatype = $(node).find('metadatatype').text();
                            operator = $(node).find('operator').text();
                            switch (operator) {
                                case "eq": operator = "Equals";
                                    break;
                                case "lt": operator = "Less than"
                                    break;
                                case "le": operator = "Less than or Equals to"
                                    break;
                                case "gt": operator = "Greater than to"
                                    break;
                                case "ge": operator = "Greater than or Equals to"
                                    break;
                                case "ne": operator = "Does not Equals to"
                                    break;
                                case "like": operator = "Contains";
                                    break;
                                case "empty": operator = "Is Empty"
                                    break;
                                case "any": operator = "Any"
                                    break;
                                case "notlike": operator = "Not Contains"
                                    break;
                            }
                            if (metadatatype == 'Date') {
                                value = $(node).find('value').text();
                                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                                { value = moment(new Date(value)).format('MM/DD/YYYY'); }
                                else { value = moment(new Date(value)).format(localStorage.AppDateFormat); }
                            } else {

                                value = $(node).find('value').text();
                            }
                            if (operator != "Is Empty" && operator != "Any")
                                filterHtml += ' <span><small>' + condition + '</small></span>' + '<span><small >' + metadata + ' ' + operator + ' ' + value + '</small></span>';
                            else
                                filterHtml += '<span><small >' + condition + '</small></span>' + '<span><small >' + metadata + ' ' + operator + '</small></span>';
                        }
                    });

                    $("#spResult").empty();
                    var qvName = "";
                    var defaultviewname = savedviewentity.ViewName;
                    savedViewNameFromViewTable = defaultviewname;
                    qvName = currentadvanceViewObj.ViewName;
                    colorLink('spnAllContracts', false);
                    colorLink('spnDraft', false);
                    colorLink('spnWaitingOnMe', false);
                    colorLink('spnSigned', false);
                    colorLink('spnActive', false);
                    colorLink('spnUpcomingRenewals', false);
                    colorLink('spnUpcomingExpirations', false);
                    colorLink('spnOwnedByMe', false);
                    colorLink('spnCreatedByMe', false);
                    colorLink('spnSharedContracts', false);
                    colorLink('spnWithCustomPermissions', false);
                    colorLink('spnInRecycleBin', false);
                    colorLink('spnPast', false);
                    colorLink('liRequestViews a', false);
                    colorLink(obj.id, true);
                    $("#filteroptiontype").css('display', 'none');
                    $("#filteroptiondates").css('display', 'none');
                    $("#filteroptionstatus").css('display', '');
                    $("#filteroption1").css('display', '');
                    $("#filteroptionrenewdates").css('display', 'none');
                    //$("#btnFilter").css('display', 'inline');
                    $("#txtSearchBox").attr("placeholder", "Search in 'All' ");

                    $('#menu4').hide();
                    $("#showAll").css('display', 'none');
                    $("#liFiltersSearchText").empty();
                    $("#liFiltersStatus").empty();
                    $("#liFiltersType").empty();
                    $("#liFiltersUserType").empty();
                    $("#liFiltersRenewal").empty();
                    $("#liFiltersExpiration").empty();
                    $("#liAdvanceViewFilter").empty();
                    var newurl = "";
                    var sortby = "&sortbyfield=Timestamp&orderby=DESC";
                    if (typeof currentadvanceViewObj.SortBy != 'undefined') {
                        selectedSortOption = currentadvanceViewObj.SortBy.split('~')[0];
                    }
                    $("#conSortByOptions").val(selectedSortOption)
                    $("#conSortByOptions").prop('disabled', true).niceSelect('update');
                    switch (selectedSortOption) {
                        case "Recently Updated":
                            sortby = '&sortbyfield=Timestamp&orderby=DESC';
                            break;
                        case "Recently Submited":
                            sortby = '&sortbyfield=SubmittedOn&orderby=DESC';
                            break;
                        case "Title(A-Z)":
                            sortby = '&sortbyfield=RequestTitle&orderby=ASC';
                            break;
                        case "Title(Z-A)":
                            sortby = '&sortbyfield=RequestTitle&orderby=DESC';
                            break;
                        default:
                            sortby = '&sortbyfield=Timestamp&orderby=DESC';
                            break;
                    }
                    //if (typeof currentadvanceViewObj.SortBy != 'undefined') {
                    //    var orderBy = currentadvanceViewObj.SortBy.split('~')[1];
                    //    if (typeof orderBy != 'undefined' && sortby.indexOf('ContractTitle') == -1) {
                    //        sortby = sortby.substr(0, sortby.lastIndexOf('&'));
                    //        sortby = sortby + '&orderby=' + orderBy;
                    //    }
                    //}
                    var baname = ";";
                    if (thisBusinessAreaName == "" || thisBusinessAreaName == "All") {
                    } else {
                        baname = thisBusinessAreaName;
                    }
                    var baloc = "";
                    if (typeof localStorage.GlobalBusinessAreaLocation != 'undefined' && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
                        baloc = encodeURIComponent(localStorage.GlobalBusinessAreaLocation);
                    }
                    //var customquery = '';
                    //$(viewQueryXml).find('filter').each(function (index, node) {
                    //    if ($(node).find('metadatavalue').text() != "") {
                    //        customquery += $(node).find('metadatavalue').text() + ":" + $(node).find('value').text();
                    //    }
                    //});
                    //newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests?BusinessAreaPath=' + baloc + '&stage=pipeline&searchkeyword=' + encodeURIComponent($("#txtSearchBox").val().trim()) + '&customquery=' + encodeURIComponent(customquery) + sortby + "&viewName=All";
                    newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/advacnedviewrecords?BusinessAreaPath=' + baloc + '&stage=pipeline&filterXml=' + viewQueryXml + sortby + "&viewName=" + qvName + '&searchkeyword=' + encodeURIComponent($("#txtSearchBox").val());
                    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
                    $.ajax({
                        url: newurl,
                        type: 'GET',
                        dataType: 'json',
                        'Content-Type': 'application/json',
                        cache: false,
                        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessAreaLocation: localStorage.GlobalBusinessAreaLocation },
                        success: function (data) {
                            $("#compact-pagination").css('display', '');
                            $('#listContracts').empty();
                            GetData(data);
                        },
                        error:
                            function (data) {
                                $("#listContracts").empty();
                                $("#listContracts").append("<p class='f_p-error'>No items found.</p>");
                                $("#compact-pagination").css('display', 'none');
                                $("#divChkSelectAll").css('display', 'none');
                            }
                    });
                    $("#dvfilter").hide();
                    $("#liAdvanceViewFilter").html(filterHtml + '<a style="float:right;" href="javascript:void(0)" onclick="editAdvanceView()">Edit View</a>');
                    //manoj
                    var txtsearchboxvalue = $.trim($('#txtSearchBox').val().trim());
                    $("#txtSearchBox").val(txtsearchboxvalue);
                    if (txtsearchboxvalue != "" && txtsearchboxvalue != null) {
                        $('#liFiltersSearchText').html('<span><small>Showing search result for : ' + txtsearchboxvalue + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
                    }
                    //manoj
                }
            }
        });
    }
}
//manoj

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
                     showAfterSave = "";
                     GetSavedViews();
                     var obj = { name: "All", innerText: "All Requests" }; // Navigate to All Request after Deleting Views - Bug (eO37162)
                     quickViewDisplay(obj);
                     $("#filteroptiontype").css('display', '');

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
    $("#liFiltersforQuickViews").css('display', '');
    $("#btnAddViewRequest").css('display', 'none');
    $("#spResult").empty();
    colorLink('liQuickView a', false);
    colorLink('spnAllRequests', true);
    colorLink('liRequestViews a', false);
    colorLink('spnDraft', false);
    colorLink('spnMyRequests', false);
    colorLink('spnRecentlyActiveContracts', false);
    colorLink('spnRecentlyRenewedContracts', false);
    colorLink('spnSubmittedMyRequests', false);
    colorLink('spnPastRequests', false);
    colorLink('spnPending', false);
    colorLink('spnASSigned', false);
    colorLink('spnCompletedRequests', false);
    colorLink('spnCancelledRequests', false);

    $("#btnFilter").css('display', 'inline');
    $("#dvSrhBox").css('display', '');
    $("#showAll").css('display', 'inline');
    $("#showAll").text('Showing All Requests');
    //

    $("#filteroptiontype").css('display', '');
    $("#filteroptiondates").css('display', 'none');
    $("#filteroptionstatus").css('display', '');
    $("#filteroption1").css('display', 'none');
    $("#filteroptionrenewdates").css('display', 'none');
    $("#txtSearchBox").val("");
    $("#txtSearchBox").attr("placeholder", "Search in 'All'");
    //
    clearFilterSelection();
    $('#tdSort a').each(function (i, item) {
        item.style.backgroundColor = "";
    });
    $("#liFiltersQuickView").empty();
    $('#liFiltersQuickView').html('<span>Showing search result for : <small>All<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');


    $('#liFiltersQuickView').css('display', 'none');
    $('#btnAddViewRequest').css('display', 'none');

    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
    var baname = ";";
    if (thisBusinessAreaName == "" || thisBusinessAreaName == "All") {
    } else {
        baname = thisBusinessAreaName;
    }
    //Set ObjectName for "Select all" button enabling 
    ObjectNameToSend = "All Requests";
    savedViewNameFromViewTable = "";
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
    if (data.length == 0) {
        resultfound = false;
        $('#listContracts').empty();
        $("#listContracts").append("<p class='f_p-error'>No items found.</p>");
        $("#compact-pagination").css('display', 'none');
    } else {
        listContracts = data;
        CreateRequestList(0);
        $('#compact-pagination').pagination({
            items: data.length,
            itemsOnPage: 20,
            type: 'ul',
            row: 'li',
            typeID: 'listContracts',
            cssStyle: 'compact-theme',
            listname: 'Requests'
        });
        if (ObjectNameToSend != "In Recycle Bin") {
            $("#divChkSelectAll").css('display', '');
        } else {
            $("#divChkSelectAll").css('display', 'none');
        }
    }

    return resultfound;
}
$("#SelectAll").hide();
$("#SelectAllSpan").hide();
$('#SelectAll').attr('checked', false);


function CreateAdvanceView() {
    $("#btnAdvanceViewSaveAs").css("display", "none");
    $("#btnUpdateAdvanceView").css("display", "none");
    $("#addNewAdvanceView").dialog({ 'title': 'Create View' });
    $("#btnCreateAdvanceView").css("display", "");
    $("#addNewAdvanceView").dialog("open");
}

function removefilterCondition(objRow) {
    $(objRow).parent().parent().parent().remove();
    if ($("#tblfilterConditions tr").length <= 9) {
        $("#btnAddNewAdFilter").css("display", "");
    }
}

function CreateRequestList(page) {
    qvName = getQuickViewLinkName($('#liFiltersQuickView').text());
    $("#SelectAll").show();
    $("#SelectAllSpan").show();
    $(".drop_a").hide();
    multipleChecks = "";
    multipleChecksPermission = "";
    multipleChecksStatus = "";
    multipleChecksIsDraftByCurrent = "";

    var startIndex = page * 20;
    var endIndex = startIndex + 20;
    if (endIndex > listContracts.length) endIndex = listContracts.length;
    $("#spResult").html((startIndex + 1) + '&nbsp;to&nbsp;' + endIndex + '&nbsp;of&nbsp;' + listContracts.length);
    var resultfound = false;
    var sortby = '';
    var fieldType = '';
    var contractTags = [];
    var selectedPage = contractSelected.pages.filter(function (val, index) { return val.pageNumber == page + 1 });
    if (selectedPage.length > 0) {
        if (selectedPage[0].isAllSelected) {
            $("#SelectAll").prop('checked', true);
        } else {
            $("#SelectAll").prop('checked', false);
        }
    } else {
        $("#SelectAll").prop('checked', false);
    }
    switch (selectedSortOption) {
        case "Recently Updated":
            sortby = 'Timestamp';
            fieldType = 'date';
            break;
        case "Recently Submitted":
            sortby = 'SubmittedOn';
            fieldType = 'date';
            break;
        case "Title(A-Z)":
            sortby = 'RequestTitle';
            break;
        case "Title(Z-A)":
            sortby = 'RequestTitle';
            break;
        default:
            sortby = '';
            break;
    }
    $("#listContracts").empty();
    $('#SelectAll').attr('checked', false);
    for (var j = startIndex; j < endIndex; j++) {
        var item = listContracts[j];
        var articleFlag = true;
        var articleFlagWoDel = '';
        if (item != null) {
            var vPermission = 'openmenuView';
            var vPermissionWoDel = vPermission;
            if (item.InRecycleBin == 'Yes') {
                vPermission = 'openmenuView';
            }
            else if (item.Permission == 'Manage') {
                vPermission = 'openmenu';
                articleFlagWoDel = 'Main';

            }
            else if (item.Permission == 'Contribute') {
                vPermission = 'openmenuContribute';
            }
            else if (item.Permission == 'View') {
                vPermission = 'openmenuView';
            }
            if (item.IsDraft == "Yes" || item.Status == "Cancelled") {
                if (item.Permission != 'View' && item.Permission != 'Collaborate') {
                    if (item.Permission == 'Contribute') {
                        vPermission = 'openmenuDraftContribute';
                    }
                    else {
                        vPermission = 'openmenuDraft';
                        if (!(item.IsDraft == "Yes" && (item.CreatedBy == localStorage.UserName)))
                            articleFlagWoDel = 'Draft';
                        else
                            articleFlagWoDel = '';

                    }

                }
                else {
                    vPermission = 'openmenuView';
                }

                // Bug(eO37039)
                if (item.Status == "Cancelled" && item.Permission != 'View') {
                    $('.ManageCancelled').css('display', '');
                }
            }

            if (item.Status == "Completed") {
                vPermission = 'openmenuPast';
            }


            if (item.InRecycleBin == "Yes") {
                vPermission = 'openmenuRecycle';
            }

            var myUrl = '/Pipeline/RequestDetails?RequestID=' + encodeURI(item.RowKey) + "&View=" + ObjectNameToSend;


            if (articleFlagWoDel == "Draft") {
                vPermissionWoDel = 'openmenuDraftWoDel';
            }
            else if (articleFlagWoDel == "Main") {
                vPermissionWoDel = 'openmenuWoDel';
            }
            else {
                vPermissionWoDel = vPermission;
            }
            var article = '';

            article = '<li>';


            var vQuickActions = '';

            contractTags.push(item.RequestTitle);
            article += '<p id="RequestID" style="display:none;">' + item.RowKey + '</p>';
            article += '<p id="RequestTitle" style="display:none;" data-id= "' + item.RowKey + '_ContractTitle"></p>';
            article += '<p id="RequestType" style="display:none;">' + item.RequestType + '</p>';
            article += '<p id="ContractArea" style="display:none;">' + item.ContractArea + '</p>';
            article += '<p id="BusinessArea" style="display:none;">' + item.BusinessArea + '</p>';
            article += '<p id="BusinessAreaPath" style="display:none;">' + item.BusinessAreaPath + '</p>';
            article += '<p id="ApprovalWorkflow" style="display:none;">' + item.ApprovalWorkflow + '</p>';
            article += '<p id="Status" style="display:none;">' + (item.IsDraft == "Yes" ? "" : item.Status) + '</p>';
            article += '<p id="Permission" style="display:none;">' + vPermission + '</p>';
            article += '<p id="IsDraftByCurrent" style="display:none;">' + (item.IsDraft == "Yes" ? (item.CreatedBy == localStorage.UserName ? "Yes" : "No") : "") + '</p>';

            article += '<p>';
            if (item.InRecycleBin == "Yes") {
                article += '<i>';
                article += '<b title="In Recycle Bin" class="status_blue"><img src="../Content/Images/status/recycle-bin.png" class="status_img" />Recy</b>';

            } else {
                if (selectedPage.length > 0) {
                    var temp = j;
                    if (page > 0) {
                        temp = j % 20;
                    }
                    if (selectedPage[0].selectedIndexes.filter(function (val1, index1) { return val1 == temp }).length > 0) {
                        article += '<input previously=true class="margin-Top10 margin-right" name="ContRec" type="checkbox" value="" onclick="checkMultipleRequests(this);" id="' + item.RowKey + '"  /><i>';
                    } else {
                        article += '<input class="margin-Top10 margin-right" name="ContRec" type="checkbox" value="" onclick="checkMultipleRequests(this);" id="' + item.RowKey + '"  /><i>';
                    }
                } else {

                    article += '<input class="margin-Top10 margin-right" name="ContRec" type="checkbox" value="" onclick="checkMultipleRequests(this);" id="' + item.RowKey + '"  /><i>';
                }
                //if (qvName == "Draft") {
                //    article += '<b title="In Draft" class="status_Gray"><img src="../Content/Images/icon/Draft_icon.png"/>Draft</b>';
                //    if (item.Status == "New") {
                //        if (vPermission == 'openmenuContribute' || vPermission == 'openmenu' || vPermission == 'openmenuDraft' || vPermission == 'openmenuDraftContribute') {
                //            vQuickActions += '<a href="/Pipeline/EditRequest?RequestID=' + item.RowKey + '&RequestType=' + encodeURIComponent(item.RequestType) + '"><img title="Edit Request" src="../Content/Images/action/edit-metadata.png"/></a>';
                //            vQuickActions += '<a href="javascript:void(0)" onclick="ManageRequestPeople(\'' + item.RowKey + '\');"><img title="Manage People" src="../Content/Images/action/manage-people.png"/></a>';
                //        }
                //    }
                //    else if (item.Status == "Awaiting Approval") {
                //        vQuickActions += '<a href="' + myUrl + '&Tab=Activity" style="word-break: break-all;"><img title="Check Activity Status" src="../Content/Images/action/check-activity-status.png"/></a>';
                //        if (vPermission == 'openmenuContribute' || vPermission == 'openmenu' || vPermission == 'openmenuDraft') {
                //            vQuickActions += '<a href="javascript:void(0)" onclick="ManageRequestPeople(\'' + item.RowKey + '\');"><img title="Manage People" src="../Content/Images/action/manage-people.png"/></a>';
                //        }
                //    }
                //    else if (item.Status == "Approved") {
                //        if (vPermission == 'openmenuContribute' || vPermission == 'openmenu') {
                //            vQuickActions += '<a href="javascript:void(0)" onclick="BindStatusNew(\'' + item.RowKey + '\',\'' + item.Status + '\');"><img title="Manage Status" src="../Content/Images/action/manage-status.png"/></a>';
                //        }
                //        vQuickActions += '<a href="javascript:void(0)" onclick="CreateRequestActivityList(\'' + item.RowKey + '\');"><img title="View Request History" src="../Content/Images/action/View-History.png"/></a>';
                //    }
                //    else if (item.Status == "On Hold") {
                //        if (vPermission == 'openmenuContribute' || vPermission == 'openmenu' || vPermission == 'openmenuDraft' || vPermission == 'openmenuDraftContribute') {
                //            if (vPermission == 'openmenuContribute' || vPermission == 'openmenu')
                //                vQuickActions += '<a href="javascript:void(0)" onclick="BindStatusNew(\'' + item.RowKey + '\',\'' + item.Status + '\');"><img title="Manage Status" src="../Content/Images/action/manage-status.png"/></a>';
                //            vQuickActions += '<a href="/Pipeline/EditRequest?RequestID=' + item.RowKey + '&RequestType=' + encodeURIComponent(item.RequestType) + '"><img title="Edit Request" src="../Content/Images/action/edit-metadata.png"/></a>';
                //        }
                //    }
                //    else if (item.Status == "Cancelled") {
                //        vQuickActions += '<a href="javascript:void(0)" onclick="CreateRequestActivityList(\'' + item.RowKey + '\');"><img title="View Request History" src="../Content/Images/action/View-History.png"/></a>';
                //        if (vPermission == 'openmenu' || vPermission == 'openmenuDraft') {
                //            vQuickActions += '<a href="javascript:void(0)" onclick="DeleteRequest(\'' + item.RowKey + '\',\'' + item.RequestTitle + '\');"><img title="Delete Request" src="../Content/Images/action/Delete-Contract.png"/></a>';
                //        }
                //    }
                //    else if (item.Status == "Completed") {
                //        article += '<b title="Completed" class="status_blue"><img src="../Content/Images/status/tick.png">comp</b>';
                //        vPermission = "openmenuPast";
                //        //vQuickActions += '<a href="javascript:void(0)" onclick="CreateRequestActivityList(\'' + item.RowKey + '\');"><img title="View Request History" src="../Content/Images/action/View-History.png"/></a>';
                //        //if (vPermission == 'openmenu' || vPermission == 'openmenuDraft') {
                //        //    vQuickActions += '<a href="javascript:void(0)" onclick="DeleteRequest(\'' + item.RowKey + '\',\'' + item.RequestTitle + '\');"><img title="Delete Request" src="../Content/Images/action/Delete-Contract.png"/></a>';
                //        //}
                //    }
                //    else {
                //        if (item.Status == "0" || item.Status == "" || item.Status == "undefined") {
                //            if (vPermission == 'openmenuContribute' || vPermission == 'openmenu' || vPermission == 'openmenuDraft' || vPermission == 'openmenuDraftContribute') {
                //                vQuickActions += '<a href="/Pipeline/EditRequest?RequestID=' + item.RowKey + '&RequestType=' + encodeURIComponent(item.RequestType) + '"><img title="Edit Request" src="../Content/Images/action/edit-metadata.png"/></a>';
                //                vQuickActions += '<a href="javascript:void(0)" onclick="ManageRequestPeople(\'' + item.RowKey + '\');"><img title="Manage People" src="../Content/Images/action/manage-people.png"/></a>';
                //            }

                //        } else {
                //            if (vPermission == 'openmenuContribute' || vPermission == 'openmenu' || vPermission == 'openmenuDraft' || vPermission == 'openmenuDraftContribute') {
                //                vQuickActions += '<a href="/Pipeline/EditRequest?RequestID=' + item.RowKey + '&RequestType=' + encodeURIComponent(item.RequestType) + '"><img title="Edit Request" src="../Content/Images/action/edit-metadata.png"/></a>';
                //                vQuickActions += '<a href="javascript:void(0)" onclick="ManageRequestPeople(\'' + item.RowKey + '\');"><img title="Manage People" src="../Content/Images/action/manage-people.png"/></a>';
                //            }
                //        }
                //    }
                //}
                if (item.IsDraft == "Yes") {
                    article += '<b title="In Draft" class="status_Gray"><img src="../Content/Images/icon/Draft_icon.png" class="status_img"/>Draft</b>';
                    //articleFlag = false;
                    vPermission = vPermissionWoDel;

                }
                else if (item.Status == "New") {
                    //if (articleFlag)
                    article += '<b title="New" class="status_green_another"><img src="../Content/Images/status/new.png" class="status_img"/>new</b>';
                    if (vPermission == 'openmenuContribute' || vPermission == 'openmenu' || vPermission == 'openmenuDraft' || vPermission == 'openmenuDraftContribute') {
                        vQuickActions += '<a href="/Pipeline/EditRequest?RequestID=' + item.RowKey + '&RequestType=' + encodeURIComponent(item.RequestType) + '"><img title="Edit Request" src="../Content/Images/action/edit-metadata.png"/></a>';
                        if (vPermission == 'openmenuDraft' || vPermission == 'openmenu')
                            vQuickActions += '<a href="javascript:void(0)" onclick="ManageRequestPeople(\'' + item.RowKey + '\');"><img title="Manage People" src="../Content/Images/action/manage-people.png"/></a>';
                    }
                    vPermission = vPermissionWoDel;
                }
                else if (item.Status == "Awaiting Approval") {
                    //if (articleFlag)
                    article += '<b title="Awaiting Approval" class="status_yellow"><img src="../Content/Images/status/renew.png" class="status_img"/>appr</b>';
                    vQuickActions += '<a href="' + myUrl + '&Tab=Activity" style="word-break: break-all;"><img title="Check Activity Status" src="../Content/Images/action/check-activity-status.png"/></a>';
                    if (vPermission == 'openmenuDraft' || vPermission == 'openmenu') {
                        vQuickActions += '<a href="javascript:void(0)" onclick="ManageRequestPeople(\'' + item.RowKey + '\');"><img title="Manage People" src="../Content/Images/action/manage-people.png"/></a>';

                    }
                    vPermission = vPermissionWoDel;
                }
                else if (item.Status == "Approved") {
                    //if (articleFlag)
                    article += '<b title="Approved" class="status_blue"><img src="../Content/Images/status/tick.png" class="status_img"/>appr</b>';
                    if (vPermission == 'openmenuContribute' || vPermission == 'openmenu') {
                        vQuickActions += '<a href="javascript:void(0)" onclick="BindStatusNew(\'' + item.RowKey + '\',\'' + item.Status + '\');"><img title="Manage Status" src="../Content/Images/action/manage-status.png"/></a>';
                    }
                    vQuickActions += '<a href="javascript:void(0)" onclick="CreateRequestActivityList(\'' + item.RowKey + '\');"><img title="View Request History" src="../Content/Images/action/View-History.png"/></a>';
                    vPermission = vPermissionWoDel;
                }
                else if (item.Status == "On Hold") {
                    //if (articleFlag)
                    article += '<b title="On Hold" class="status_red"><img src="../Content/Images/status/exp.png" class="status_img"/>hold</b>';
                    if (vPermission == 'openmenuContribute' || vPermission == 'openmenu' || vPermission == 'openmenuDraft' || vPermission == 'openmenuDraftContribute') {
                        if (vPermission == 'openmenuContribute' || vPermission == 'openmenu')
                            vQuickActions += '<a href="javascript:void(0)" onclick="BindStatusNew(\'' + item.RowKey + '\',\'' + item.Status + '\');"><img title="Manage Status" src="../Content/Images/action/manage-status.png"/></a>';
                        vQuickActions += '<a href="/Pipeline/EditRequest?RequestID=' + item.RowKey + '&RequestType=' + encodeURIComponent(item.RequestType) + '"><img title="Edit Request" src="../Content/Images/action/edit-metadata.png"/></a>';
                    }
                    vPermission = vPermissionWoDel;
                }
                else if (item.Status == "Cancelled") {
                    //if (articleFlag)
                    article += '<b title="Cancelled" class="status_Gray"><img src="../Content/Images/status/close.png" class="status_img"/>canc</b>';
                    vQuickActions += '<a href="javascript:void(0)" onclick="CreateRequestActivityList(\'' + item.RowKey + '\');"><img title="View Request History" src="../Content/Images/action/View-History.png"/></a>';
                    if (vPermission == 'openmenu' || vPermission == 'openmenuDraft') {
                        vQuickActions += '<a href="javascript:void(0)" class="GlobalManage" onclick="DeleteRequest(\'' + item.RowKey + '\',\'' + item.RequestTitle + '\');"><img title="Delete Request" src="../Content/Images/action/Delete-Contract.png"/></a>';
                    }
                }
                else if (item.Status == "Completed") {
                    //if (articleFlag)
                    article += '<b title="Completed" class="status_blue"><img src="../Content/Images/status/tick.png" class="status_img"/>comp</b>';
                    vPermission = "openmenuPast";
                    //vQuickActions += '<a href="javascript:void(0)" onclick="CreateRequestActivityList(\'' + item.RowKey + '\');"><img title="View Request History" src="../Content/Images/action/View-History.png"/></a>';
                    if (vPermission == 'openmenu' || vPermission == 'openmenuDraft') {
                        vQuickActions += '<a href="javascript:void(0)" class="GlobalManage" onclick="DeleteRequest(\'' + item.RowKey + '\',\'' + item.RequestTitle + '\');"><img title="Delete Request" src="../Content/Images/action/Delete-Contract.png"/></a>';
                    }
                }
                else {
                    if (item.Status == "0" || item.Status == "" || item.Status == "undefined") {
                        //  if (articleFlag)
                        article += '<b title="Not Assigned" class="status_red"><img src="../Content/Images/status/new.png" class="status_img"/>not</b>';
                        if (vPermission == 'openmenuContribute' || vPermission == 'openmenu' || vPermission == 'openmenuDraft' || vPermission == 'openmenuDraftContribute') {
                            vQuickActions += '<a href="/Pipeline/EditRequest?RequestID=' + item.RowKey + '&RequestType=' + encodeURIComponent(item.RequestType) + '"><img title="Edit Request" src="../Content/Images/action/edit-metadata.png"/></a>';
                            if (vPermission == 'openmenuDraft' || vPermission == 'openmenu')
                                vQuickActions += '<a href="javascript:void(0)" onclick="ManageRequestPeople(\'' + item.RowKey + '\');"><img title="Manage People" src="../Content/Images/action/manage-people.png"/></a>';
                        }
                        vPermission = vPermissionWoDel;

                    } else {
                        // if (articleFlag)
                        article += '<b title="' + item.Status + '" class="status_red"><img src="../Content/Images/status/new.png" class="status_img" />hold</b>';
                        if (vPermission == 'openmenuContribute' || vPermission == 'openmenu' || vPermission == 'openmenuDraft' || vPermission == 'openmenuDraftContribute') {
                            vQuickActions += '<a href="/Pipeline/EditRequest?RequestID=' + item.RowKey + '&RequestType=' + encodeURIComponent(item.RequestType) + '"><img title="Edit Request" src="../Content/Images/action/edit-metadata.png"/></a>';
                            if (vPermission == 'openmenuDraft' || vPermission == 'openmenu')
                                vQuickActions += '<a href="javascript:void(0)" onclick="ManageRequestPeople(\'' + item.RowKey + '\');"><img title="Manage People" src="../Content/Images/action/manage-people.png"/></a>';
                        }
                        vPermission = vPermissionWoDel;

                    }
                }
            }
            if (item.InRecycleBin == "Yes") {
                article += item.RequestTitle;
            } else {
                article += ' <a href="' + myUrl + '" style="word-break: break-all;" id="a_' + item.RowKey + '"></a>';
            }

            if (qvName == "Past Requests") {

                var date = new Date(item.RequiredByDate);
                if ((date != null || date != "") && item.RequiredByDate != null) {


                    if (localStorage.AppDateFormat == null || localStorage.AppDateFormat == "" || localStorage.AppDateFormat == 'undefined') {
                        date = moment(new Date(date)).format('MM/DD/YYYY');
                    }
                    else {
                        date = moment(new Date(date)).format(localStorage.AppDateFormat);
                    }

                    article += '<small>' + item.RequestType + "  - " + date;

                }
                else {
                    article += '<small>' + item.RequestType + "  - " + "Not Available";;
                }
            }

            else {
                article += '<small>' + item.RequestType;
            }

            if (sortby != '') {

                if (item[sortby] != null && item[sortby] != "") {
                    if (fieldType == 'date') {

                        if (localStorage.AppDateFormat == null || localStorage.AppDateFormat == "" || localStorage.AppDateFormat == 'undefined') {
                            article += ' |&nbsp;<var title="' + selectedSortOption + '">' + moment(new Date(item[sortby])).format('Do MMM YYYY') + '</var>';
                        }
                        else {
                            if (localStorage.AppDateFormat == "DD/MM/YYYY")
                                article += ' |&nbsp;<var title="' + selectedSortOption + '">' + moment(new Date(item[sortby])).format('Do MMM YYYY') + '</var>';
                            else
                                article += ' |&nbsp;<var title="' + selectedSortOption + '">' + moment(new Date(item[sortby])).format('MMM Do YYYY') + '</var>';
                        }

                    }
                    else {
                        article += ' |&nbsp;<var title="' + selectedSortOption + '">' + item[sortby] + '</var>';
                    }
                }
            }
            else {
                article += '</small>';
            }
            article += '</small></i>';
            article += '</p>';
            article += '<div class="cont_Rig-opt">';
            article += vQuickActions;
            article += '<a class="margin-top6 ' + vPermission + '" href="javascript:void(0)"><img src="../Content/Images/action/arrow.png"/></a>';
            article += '</div>';

            article += '</li>';
            $("#listContracts").append(article);

            $('p[data-id="' + item.RowKey + '_ContractTitle"]').html($('<div/>').text(item.RequestTitle).html());
            $("#a_" + item.RowKey).html($('<div/>').text(item.RequestTitle).html());

            $('#' + item.RowKey).filter("[previously=true]").prop("checked", true);
            resultfound = true;

            if (!(item.Status == "Cancelled" || item.Status == "Completed")) {
                $('.DeleteRecord').css("display", "");
            }

            //When request is draft, even read only user should be able to add documents and edit request
            if ((item.IsDraft == "Yes" && item.Permission == 'Manage' && item.CreatedBy == localStorage.UserName)) {
                $('.DeleteRecord').css("display", "");
            }
        }
    }

    if ($("#Select").prop('checked') == true) {
        $("#btnMultipleRequestAction").css("display", "")
    } else if ($('input[type="checkbox"]').filter('[name="ContRec"]:checked').length > 0) {
        $("#btnMultipleRequestAction").css("display", "")
    } else {
        $("#btnMultipleRequestAction").css("display", "none");
    }
    $(".openmenu").contextMenu({ menu: 'myMenu', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("div").parent("li"), pos); });
    $(".openmenuCollaborate").contextMenu({ menu: 'myMenuCollaborate', leftButton: true }, function (action, el, pos) {
        contextMenuWork(action, el.parent("div").parent("li"), pos);
    });
    $(".openmenuContribute").contextMenu({ menu: 'myMenuContribute', leftButton: true }, function (action, el, pos) {
        contextMenuWork(action, el.parent("div").parent("li"), pos);
    });
    $(".openmenuView").contextMenu({ menu: 'myMenuView', leftButton: true }, function (action, el, pos) {
        contextMenuWork(action, el.parent("div").parent("li"), pos);
    });
    $(".openmenuDraft").contextMenu({ menu: 'myMenuDraft', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("div").parent("li"), pos); });

    $(".openmenuRecycle").contextMenu({ menu: 'myMenuRecycle', leftButton: true }, function (action, el, pos) { contextMenuWorkRecycleBin(action, el.parent("div").parent("li"), pos); });

    $(".openmenuPast").contextMenu({ menu: 'myMenuPastRequests', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("div").parent("li"), pos); });



    $(".openmenuDraftContribute").contextMenu({ menu: 'myMenuDraftContribute', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("div").parent("li"), pos); });

    $(".openmenuDraftWoDel").contextMenu({ menu: 'myMenuDraftWoDel', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("div").parent("li"), pos); });



    $(".openmenuWoDel").contextMenu({ menu: 'myMenuWoDel', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("div").parent("li"), pos); });


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
    $(".openmenuDraft").click(function () {
        $("#dvfilter").hide();
    });

    $(".openmenuDraftWoDel").click(function () {
        $("#dvfilter").hide();
    });
    $(".openmenuWoDel").click(function () {
        $("#dvfilter").hide();
    });
    $(".openmenuDraftContribute").click(function () {
        $("#dvfilter").hide();
    });
    if (localStorage.UserType.indexOf("Global Contract Owner") >= 0) {
        $(".GlobalManage").css('display', '');
    } else {
        $(".GlobalManage").css('display', 'none');
    }
}

function getSearchableContractFields() {
    //Assigned To
    var objAssigned = {};
    objAssigned.value = "Assigned To";
    objAssigned.fieldType = "User";
    objAssigned.choiceValues = "";
    objAssigned.fieldName = "AssignedTo";
    objAssigned.label = "Assigned To";

    //Status
    var objStatus = {};
    objStatus.value = "Status";
    objStatus.fieldType = "Custom Lookup";
    objStatus.choiceValues = "";
    objStatus.fieldName = "Status";
    objStatus.label = "Status";

    //Request Type
    var objRequestType = {};
    objRequestType.value = "Request Type";
    objRequestType.fieldType = "Lookup";
    objRequestType.choiceValues = "";
    objRequestType.fieldName = "RequestType";
    objRequestType.label = "Request Type";

    //Business Area
    var objBusinessArea = {};
    objBusinessArea.value = "Business Area";
    objBusinessArea.fieldType = "Taxonomy";
    objBusinessArea.choiceValues = "";
    objBusinessArea.fieldName = "BusinessArea";
    objBusinessArea.label = "Business Area";

    //Created Date
    var objCreatedDate = {};
    objCreatedDate.value = "Created Date";
    objCreatedDate.fieldType = "Date";
    objCreatedDate.choiceValues = "";
    objCreatedDate.fieldName = "Created";
    objCreatedDate.label = "Created Date";

    //Requestor
    var objRequestor = {};
    objRequestor.value = "Requestor";
    objRequestor.fieldType = "User";
    objRequestor.choiceValues = "";
    objRequestor.fieldName = "Requestor";
    objRequestor.label = "Requestor";

    metadataLookUp.push(objAssigned);
    metadataLookUp.push(objBusinessArea);
    metadataLookUp.push(objCreatedDate);
    metadataLookUp.push(objRequestor);
    metadataLookUp.push(objRequestType);
    metadataLookUp.push(objStatus);
    //eO310303
    $("#metadata_label_0").autocomplete({
        source: metadataLookUp,
        minLength: 0,
        select: function (event, ui) {
            $("#metadata_value_0").val(ui.item.fieldName)
            $("#metadata_type_0").val(ui.item.fieldType)
            currentAutoCompleteUiObj = ui;
            //if (ui.item.fieldType =="Date")
            createOperatorsBasedOnMetdataType(ui.item.fieldType, 0);
            createValueFieldBasedOnFieldType(ui.item.fieldType, ui.item.choiceValues, 0);
        },
        response: function (event, ui) {
            if (ui.content.length === 0) {
                $('#metadata_label_0').val('');
                $('#metadata_value_0').val('');
            } else {
                //$('#metadata_label_' + (id + 1)).val('');
                //$('#metadata_value_' + (id + 1)).val('');
            }
        }
    }).focus(function () {
        $(this).autocomplete('search', $(this).val())
    });
}


function lookUpSelect(ui, id) {
    $("#metadata_value_" + id).val(ui.item.fieldName);
    $("#metadata_type_" + id).val(ui.item.fieldType);
    //if (ui.item.fieldType == "Date")
    createOperatorsBasedOnMetdataType(ui.item.fieldType, id);
    createValueFieldBasedOnFieldType(ui.item.fieldType, ui.item.choiceValues, id);
}

function createOperatorsBasedOnMetdataType(fieldType, rowid) {
    var control = "";
    switch (fieldType) {
        case "Date":
            control = ' <option value="">--Select--</option>' +
                      ' <option value="eq">Equal</option>' +
                      ' <option value="ne">Does not equal</option>' +
                      ' <option value="gt">Is greater than</option>' +
                      ' <option value="ge">Is greater than or equal to</option>' +
                      ' <option value="lt">Is less than</option>' +
                      ' <option value="le">Is less than or equal to</option>' +
                      ' <option value="empty">Is empty</option>' +
                      ' <option value="any">Not empty (any value)</option>';
            $("#tr_" + rowid + " select").filter('[id*="operator_"]').empty();
            $("#tr_" + rowid + " select").filter('[id*="operator_"]').append(control);
            break;
        case "Value / Financials":
            control = ' <option value="">--Select--</option>' +
            ' <option value="eq">Equal</option>' +
            ' <option value="ne">Does not equal</option>' +
            ' <option value="gt">Is greater than</option>' +
            ' <option value="ge">Is greater than or equal to</option>' +
            ' <option value="lt">Is less than</option>' +
            ' <option value="le">Is less than or equal to</option>';
            //' <option value="empty">Is empty</option>' +
            //' <option value="any">Not empty (any value)</option>';
            $("#tr_" + rowid + " select").filter('[id*="operator_"]').empty();
            $("#tr_" + rowid + " select").filter('[id*="operator_"]').append(control);
            break;
        default:
            control = ' <option value="">--Select--</option>' +
            ' <option value="eq">Equal</option>' +
            ' <option value="ne">Does not equal</option>' +
            ' <option value="like">Contains</option>' +
            ' <option value="notlike">Not Contains</option>' +
            ' <option value="empty">Is empty</option>' +
            ' <option value="any">Not empty (any value)</option>';
            $("#tr_" + rowid + " select").filter('[id*="operator_"]').empty();
            $("#tr_" + rowid + " select").filter('[id*="operator_"]').append(control);
            break;
    }
}

function createValueFieldBasedOnFieldType(fieldType, choiceValues, rowid) {
    //eO310244 - Anand
    var control = "";
    switch (fieldType) {
        case "Date": control = "<span>" + "<input readonly id=date_value_" + rowid + " type='text'  class='f_textinput width90 validelement' />" + "</span>";
            $("#tr_" + rowid + " td:nth-child(4)").html("");
            $("#tr_" + rowid + " td:nth-child(4)").append(control);
            var DatepickerFormat = '';
            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                DatepickerFormat = 'mm/dd/yy';
            }
            else {
                DatepickerFormat = localStorage.AppDateFormat.toLowerCase().slice(0, -2);
            }
            $("#date_value_" + rowid).datepicker({ changeMonth: true, changeYear: true, dateFormat: DatepickerFormat });
            break;

        case "Choice":
        case "Multi- Choice (Dropdown)":
            //control = "<span>" + "<select data-placeholder='--Select--' id=choice_value_" + rowid + " class='validelement' multiple>"
            control = "<span>" + "<input type='text' id=choice_value_" + rowid + " class='validelement'/>" + "</span>"
            //var options = "";
            var choices = choiceValues.split('\n');
            var choiceSource = [];
            var choiceRemoved = [];
            if (choices.length > 0) {
                choices.forEach(function (value, index) {
                    //options += "<option value=" + "'" + value + "'" + ">" + value + "</option>";
                    var obj = {}
                    obj.label = value;
                    obj.value = value;
                    choiceSource.push(obj);
                });
                choiceRemoved = choiceSource;
                if (event.currentTarget.text == 'Edit View') {
                    $.each(rvalue.split(','), function (i, value) {
                        choiceSource = $.grep(choiceSource, function (element) {
                            return element.value != value;
                        });
                    })
                }

                //control += options + "</select>" + "</span>";
                $("#tr_" + rowid + " td:nth-child(4)").html("");
                $("#tr_" + rowid + " td:nth-child(4)").append(control);
                //$("#choice_value_" + rowid).chosen().trigger("chosen:updated");
                $("#choice_value_" + rowid).autocomplete({
                    minLength: 0,
                    source: function (request, response) {
                        response($.ui.autocomplete.filter(
                          choiceSource, extractLast(request.term)));
                    },
                    focus: function () {
                        return false;
                    },
                    open: function (event, ui) {
                        var selectedValue = $(event.target).val().split(',');
                        choiceSource = $.grep(choiceRemoved, function (element) {
                            return !selectedValue.includes(element.value);
                        });
                    },
                    select: function (event, ui) {
                        var terms = split(this.value);
                        terms.pop();
                        if ($.inArray(ui.item.value, terms) == -1) {
                            terms.push(ui.item.value);
                            terms.push("");
                            this.value = terms.join(",");
                        }

                        choiceSource = $.grep(choiceSource, function (element) {
                            return element.value != ui.item.value;
                        });
                        return false;
                    }

                }).focus(function () {
                    $(this).autocomplete('search', $(this).val())
                });
            }
            break;

        case "User":
            control = "<span>" + "<input type='text' id=user_value_" + rowid + " class='validelement'/>" + "</span>";
            //control = "<span>" + "<select id=user_value_" + rowid + " class='width100 validelement'>"
            //var options = "";
            var peopleSource = [];
            var peopleRemoved = [];
            if (peoples.length > 0) {
                peoples.forEach(function (value, index) {
                    // options += "<option value=" + "'" + value.UserName + "'" + ">" + value.UserName + "</option>";
                    var obj = {};
                    obj.label = value.UserName;
                    obj.value = value.UserName;
                    peopleSource.push(obj);
                });
                peopleRemoved = peopleSource;
                if (event.currentTarget.text == 'Edit View') {
                    $.each(rvalue.split(','),function(i,value){
                        peopleSource = $.grep(peopleSource, function (element) {
                            return element.value != value;
                        });
                    })
                }
                //control += options + "</select>" + "</span>";
                $("#tr_" + rowid + " td:nth-child(4)").html("");
                $("#tr_" + rowid + " td:nth-child(4)").append(control);
                $("#user_value_" + rowid).autocomplete({
                    minLength: 0,
                    source: function (request, response) {
                        response($.ui.autocomplete.filter(
                          peopleSource, extractLast(request.term)));
                    },
                    focus: function () {
                        return false;
                    },
                    open: function (event, ui) {
                        var selectedValue = $(event.target).val().split(',');
                        peopleSource = $.grep(peopleRemoved, function (element) {
                            return !selectedValue.includes(element.value);
                        });
                    },
                    select: function (event, ui) {
                        var terms = split(this.value);
                        terms.pop();
                        if ($.inArray(ui.item.value, terms) == -1) {
                            terms.push(ui.item.value);
                            terms.push("");
                            this.value = terms.join(",");
                        }

                        peopleSource = $.grep(peopleSource, function (element) {
                            return element.value != ui.item.value;
                        });
                        return false;
                    }

                }).focus(function () {
                    $(this).autocomplete('search', $(this).val())
                });

                //$("#user_value_" + rowid).trigger("chosen:updated");
            }

            break;
        case "Yes/No":
            var options = "";
            control = '<span>' + '<select id=YesNo_value_' + rowid + ' class="width100 validelement"> ';
            options += "<option value='Yes'>Yes</option>";
            options += "<option value='No'>No</option>";
            control += options + "</select>" + '</span>';
            $("#tr_" + rowid + " td:nth-child(4)").html("");
            $("#tr_" + rowid + " td:nth-child(4)").append(control);
            $("#YesNo_value_" + rowid).trigger("chosen:updated");

            break;
        case "Value / Financials":
            control = '<span>' + '<input id="num_value_' + rowid + '"' + 'type="text" class="f_textinput width90 validelement validnumber" />' + '</span>';
            $("#tr_" + rowid + " td:nth-child(4)").html("");
            $("#tr_" + rowid + " td:nth-child(4)").append(control);
            break;
        default: control = '<span>' + '<input id="text_value_' + rowid + '"' + 'type="text" class="f_textinput width90 validelement" />' + '</span>';
            $("#tr_" + rowid + " td:nth-child(4)").html("");
            $("#tr_" + rowid + " td:nth-child(4)").append(control);
            break;

    }
}
function SelectAllItems(object) {
    var noActionsFlag = true;
    multipleChecks = "";
    multipleChecksPermission = "";
    multipleChecksStatus = "";
    multipleChecksIsDraftByCurrent = "";
    var RequestID = "";
    var vPermission = "";
    var vStatus = "";
    var vIsDraft = "";
    var vIsDraftByCurrent = "";
    $("#btnMultipleAction_NoActions").css('display', 'none');
    if ($('#SelectAll').is(':checked')) {
        $("input:checkbox[name=ContRec]").each(function () {
            this.checked = true;
            RequestID = $(this).attr("id");
            vPermission = $("#" + RequestID).parent("p").parent("li").find("#Permission").text();
            vStatus = $("#" + RequestID).parent("p").parent("li").find("#Status").text();
            vIsDraftByCurrent = $("#" + RequestID).parent("p").parent("li").find("#IsDraftByCurrent").text();
            $("#" + RequestID).parent("p").parent("li").addClass('aActive');
            $("#btnMultipleRequestAction").css('display', '');
            multipleChecks = multipleChecks + ';' + RequestID;
            multipleChecksPermission = multipleChecksPermission + ';' + vPermission;
            multipleChecksStatus = multipleChecksStatus + ';' + vStatus;
            multipleChecksIsDraftByCurrent = multipleChecksIsDraftByCurrent + ';' + vIsDraftByCurrent;
        });
    } else {
        $("input:checkbox[name=ContRec]").each(function () {
            this.checked = false;
            RequestID = $(this).attr("id");
            vPermission = $("#" + RequestID).parent("p").parent("li").find("#Permission").text();
            vStatus = $("#" + RequestID).parent("p").parent("li").find("#Status").text();
            vIsDraftByCurrent = $("#" + RequestID).parent("p").parent("li").find("#IsDraftByCurrent").text();
            $("#" + RequestID).parent("p").parent("li").removeClass('aActive');
            multipleChecks = multipleChecks.replace(';' + RequestID, '');
            multipleChecksPermission = multipleChecksPermission.replace(';' + vPermission, '');
            multipleChecksStatus = multipleChecksStatus.replace(';' + vStatus, '');
            multipleChecksIsDraftByCurrent = multipleChecksIsDraftByCurrent.replace(';' + vIsDraftByCurrent, '');
        });
    }

    if (multipleChecks.trim() == "") {
        $("#btnMultipleRequestAction").css('display', 'none');
    } else {
        if (multipleChecksPermission.indexOf('openmenuView') >= 0) {
            $("#btnMultipleAction_Status").css('display', 'none');
            $("#btnMultipleAction_People").css('display', 'none');
            $("#btnMultipleAction_Counparty").css('display', 'none');
            $("#btnMultipleAction_BusnArea").css('display', 'none');
            $("#btnMultipleAction_Delete").css('display', 'none');
            $("#btnMultipleAction_NoPermission").css('display', '');
            noActionsFlag = false;
        } else if (multipleChecksPermission.indexOf('openmenuContribute') >= 0) {

            $("#btnMultipleAction_People").css('display', 'none');
            if (multipleChecksStatus.indexOf("Completed") >= 0 || multipleChecksStatus.indexOf("Cancelled") >= 0) {
                $("#btnMultipleAction_Counparty").css('display', 'none');
                $("#btnMultipleAction_Status").css('display', 'none');
            }
            else {
                $("#btnMultipleAction_Counparty").css('display', '');
                if (multipleChecksIsDraftByCurrent.indexOf("No") >= 0 || multipleChecksIsDraftByCurrent.indexOf("Yes") >= 0)
                    $("#btnMultipleAction_Status").css('display', 'none');
                else {
                    noActionsFlag = false;
                    $("#btnMultipleAction_Status").css('display', '');
                }
            }

            if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
                noActionsFlag = false;
                $("#btnMultipleAction_BusnArea").css('display', '');
            }
            $("#btnMultipleAction_Delete").css('display', 'none');
            $("#btnMultipleAction_NoPermission").css('display', 'none');

        } else {
            if (multipleChecksStatus.indexOf("Completed") >= 0 || multipleChecksStatus.indexOf("Cancelled") >= 0) {
                $("#btnMultipleAction_Counparty").css('display', 'none');
                $("#btnMultipleAction_Status").css('display', 'none');
                $("#btnMultipleAction_People").css('display', 'none');
            }
            else {
                if (multipleChecksIsDraftByCurrent.indexOf("No") >= 0 || multipleChecksIsDraftByCurrent.indexOf("Yes") >= 0) {
                    $("#btnMultipleAction_Status").css('display', 'none');
                    $("#btnMultipleAction_People").css('display', 'none');
                }
                else {
                    noActionsFlag = false;
                    $("#btnMultipleAction_People").css('display', '');
                    $("#btnMultipleAction_Status").css('display', '');
                }

                noActionsFlag = false;
                $("#btnMultipleAction_Counparty").css('display', '');
            }
            if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
                noActionsFlag = false;
                $("#btnMultipleAction_BusnArea").css('display', '');
            }
            if (localStorage.UserType.indexOf("Global Contract Owner") >= 0) {
                if (!(multipleChecksStatus.indexOf("New") >= 0 || multipleChecksStatus.indexOf("Awaiting Approval") >= 0 || multipleChecksStatus.indexOf("Approved") >= 0 || multipleChecksStatus.indexOf("On Hold") >= 0 || (multipleChecksIsDraftByCurrent.indexOf("No") >= 0))) {
                    noActionsFlag = false;
                    $("#btnMultipleAction_Delete").css('display', '');
                }
                else {
                    $("#btnMultipleAction_Delete").css('display', 'none');
                }
            }
            else {
                $("#btnMultipleAction_Delete").css('display', 'none');
            }
            $("#btnMultipleAction_NoPermission").css('display', 'none');

        }
    }

    if (ObjectNameToSend == "Draft") {
        $("#btnMultipleAction_People").css('display', 'none');
        $("#btnMultipleAction_Status").css('display', 'none');
        if (localStorage.UserType.indexOf("Global Contract Owner") >= 0 || !(multipleChecksIsDraftByCurrent.indexOf("No") >= 0)) {
            noActionsFlag = false;
            $("#btnMultipleAction_Delete").css('display', '');
        }
        else {
            $("#btnMultipleAction_Delete").css('display', 'none');
        }
    }

    else if (ObjectNameToSend == "Completed") {
        $("#btnMultipleAction_Status").css('display', 'none');
        $("#btnMultipleAction_People").css('display', 'none');
        $("#btnMultipleAction_Counparty").css('display', 'none');
        $("#btnMultipleAction_BusnArea").css('display', 'none');
        $("#btnMultipleAction_NoPermission").css('display', 'none');
        if (localStorage.UserType.indexOf("Global Contract Owner") >= 0) {
            noActionsFlag = false;
            $("#btnMultipleAction_Delete").css('display', '');
        }
        else {
            $("#btnMultipleAction_Delete").css('display', 'none');
        }
    }

    if (noActionsFlag) {
        $("#btnMultipleAction_NoActions").css('display', '');
    }
    else {
        $("#btnMultipleAction_NoActions").css('display', 'none');
    }

    try {
        hideAllMenuAndStopPro(event);
    }
    catch (ex) {

    }
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
    if (StatusRequest.length == 0) {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/requeststatus',
            type: 'GET',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            async: false,
            success: function (requeststatuses) {
                StatusRequest = requeststatuses;
            }
        });
    }

    $("#filterStatus").empty();
    if (obj == "Completed") {
        $("#filterStatus").append('<option value="Completed"  title="Completed">Completed</option>')

    }
    else if (obj == "Cancelled") {
        $("#filterStatus").append('<option value="Cancelled"  title="Cancelled">Cancelled</option>')

    } else {
        $("#filterStatus").append('<option value="All" selected title="All">All</option>')
        $(StatusRequest).each(function (i, item) {
            $("#filterStatus").append('<option value="' + item.RequestStatus + '" title="' + item.RequestStatus + '">' + item.RequestStatus + '</option>')
        });
    }
    if (obj == "Pending") {
        $("#filterStatus option[value='Completed']").remove();
        $("#filterStatus option[value='Cancelled']").remove();
    }

}



function contextMenuWork(action, el, pos) {

    switch (action) {
        case "delete":
            {
                var requestTitle = $(el).find("#RequestTitle").text();
                var entityid = $(el).find("#RequestID").text();
                DeleteRequest(entityid, requestTitle);

                break;
            }
        case "edit":
            {
                var entityid = $(el).find("#RequestID").text();
                var contracttype = $(el).find("#RequestType").text();
                location = "/Pipeline/EditRequest?RequestID=" + entityid + '&RequestType=' + encodeURIComponent(contracttype);
                break;
            }
        case "viewdetails":
            {
                var entityid = $(el).find("#RequestID").text();
                if (entityid != "") {
                    location = "/Pipeline/RequestDetails?RequestID=" + entityid + "&View=" + ObjectNameToSend;
                }

                break;
            }
        case "approve":
            {

                var ApprovalWorkflow = $(el).find("#ApprovalWorkflow").text();
                var requestTitle = $(el).find("#RequestTitle").text();
                var requestID = $(el).find("#RequestID").text();
                var businessArea = $(el).find("#BusinessArea").text();
                var contractArea = $(el).find("#ContractArea").text();
                var businessAreaPath = $(el).find("#BusinessAreaPath").text();
                OpenRequestApproval(ApprovalWorkflow, requestTitle, requestID, businessArea, contractArea);

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

                var requestID = $(el).find("#RequestID").text();
                CreateRequestActivityList(requestID);
                break;
            }
        case "status":
            {
                var requestID = $(el).find("#RequestID").text();
                var Status = $(el).find("#Status").text();
                BindStatusNew(requestID, Status);
                break;
            }
        case "people":
            {
                var requestID = $(el).find("#RequestID").text();
                ManageRequestPeople(requestID);

                break;
            }


    }
}

function DeleteRequest(RequestID, RequestTitle) {
    swal({
        title: '',
        text: "Are you sure you want to <span style=\"font-weight:700\">delete</span> '" + RequestTitle + "'?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        html: true
    },
     function (confirmed) {
         if (confirmed) {
             $("#loadingPage").fadeIn();
             $.ajax({
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/DeleteRequestTemporarily?requestid=' + RequestID,
                 type: 'DELETE',
                 dataType: 'json',
                 headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                 cache: false,
                 success: function (data) {
                     location = location;
                 }
             });

         }
         return;
     });

}

function SaveView(isAdvanceView, operation) {
    if (isAdvanceView == 'false') {
        if ($("#txtViewName").val() == "") {
            swal("", "Enter View Name.");
        }
        else {
            var query = "Status:";
            $("#liFiltersStatus span").each(function (i, item) {
                var str = item.textContent;
                query += str + ',';
            });
            query += ";ContractType:";
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

                        swal("", "View Name already exist, Please provide other view name."); // Bug(eO37164)
                    }
                    else {

                        swal("", person);
                        $("#txtViewName").val("")
                        showAfterSave = "";
                        GetSavedViews();
                        $("#addNewView").dialog("close");
                    }
                }
            });
        }
    } else {
        if (requiredValidator('addNewAdvanceView', false)) {
            if ($("#txtAdvanceViewName").val() == "") {
                swal("", "Enter View Name.");
            } else {
                $("#loadingPage").fadeIn();
                var valid = true;
                var fieldtype = "";
                var temp = "";
                var query = "<filters>";
                if ($("#tblfilterConditions tr").length > 0) {
                    $("#tblfilterConditions tr").each(function (index, val) {
                        temp = "";
                        if (index == 0) {
                            query += '<filter>';
                            //if ($("#chkNewfilter_" + index).is(":checked"))
                            //    query += '<isEnabled>Yes</isEnabled>';
                            //else
                            //    query += '<isEnabled>No</isEnabled>';
                            query += '<isEnabled>Yes</isEnabled>';
                            query += '<condition>default</condition>';
                            query += '<metadataname>' + $("#" + $(val).attr('id') + ' input:text').filter('[id*="metadata_label"]').val() + '</metadataname>';
                            query += '<metadatavalue>' + $("#" + $(val).attr('id') + ' input:hidden').filter('[id*="metadata_value"]').val() + '</metadatavalue>';
                            query += '<metadatatype>' + $("#" + $(val).attr('id') + ' input:hidden').filter('[id*="metadata_type"]').val() + '</metadatatype>';
                            fieldtype = $("#" + $(val).attr('id') + ' input:hidden').filter('[id*="metadata_type"]').val();
                            switch (fieldtype) {
                                case "Date":
                                    if ($("#" + $(val).attr('id') + " input:text").filter("[id*='date_value_']").length > 0) {
                                        temp = $.datepicker.formatDate('mm/dd/yy', $("#" + $(val).attr('id') + " input:text").filter("[id*='date_value_']").datepicker('getDate'));
                                        if (typeof (temp) == 'undefined' || temp == 'undefined' || temp == null)
                                            temp = "";
                                        query += ' <value>' + $.trim(temp) + '</value>';
                                    } else {
                                        query += ' <value></value>';
                                    }
                                    break;
                                case "Choice":
                                case "Multi- Choice (Dropdown)":
                                    temp = $("#" + $(val).attr('id') + "  input:text").filter("[id*='choice_value_']").val();
                                    if (typeof (temp) == 'undefined' || temp == 'undefined' || temp == null)
                                        temp = "";
                                    if (temp[temp.length - 1] == ',') {
                                        temp = temp.substr(0, temp.lastIndexOf(','));
                                    }
                                    query += ' <value>' + temp + '</value>';
                                    break;
                                case "User":
                                    temp = $("#" + $(val).attr('id') + " input:text").filter("[id*='user_value_']").val();
                                    if (typeof (temp) == 'undefined' || temp == 'undefined' || temp == null)
                                        temp = "";
                                    if (temp[temp.length - 1] == ',') {
                                        temp = temp.substr(0, temp.lastIndexOf(','));
                                    }
                                    query += ' <value>' + $.trim(temp) + '</value>';
                                    break;
                                case "Yes/No":
                                    query += ' <value>' + $.trim($("#" + $(val).attr('id') + " select").filter("[id*='YesNo_value_']").val()) + '</value>';
                                    break;
                                case "Value / Financials":
                                    query += ' <value>' + $.trim($("#" + $(val).attr('id') + " input:text").filter("[id*='num_value_']").val()) + '</value>';
                                    break;
                                default: control =
                                    query += ' <value>' + $.trim($("#" + $(val).attr('id') + " input:text").filter("[id*='text_value_']").val()) + '</value>';
                                    break;
                            }
                            query += '<operator>' + $("#" + $(val).attr('id') + " select").filter('[id*="operator"]').val() + '</operator>';
                            query += '</filter>';
                            //query += $("#" + $(val).attr('id') + ' input:hidden').val() +' '+ $("#" + $(val).attr('id') + " select").filter('[id*="operator"]').val() +' '+'\''+ $("#" + $(val).attr('id') + " input:text").filter("[id*='value']").val()+'\'';

                        } else {
                            //query +=' '+$("#" + $(val).attr('id') + " select").filter('[id*="condition"]').val() +' '+$("#" + $(val).attr('id') + ' input:hidden').val()+' '+ $("#" + $(val).attr('id') + " select").filter('[id*="operator"]').val() +' ' +'\''+ $("#" + $(val).attr('id') + " input:text").filter("[id*='value']").val()+'\'';

                            query += '<filter>';
                            //if ($("#chkNewfilter_" + index).is(":checked"))
                            //    query += '<isEnabled>Yes</isEnabled>';
                            //else
                            //    query += '<isEnabled>No</isEnabled>';
                            query += '<isEnabled>Yes</isEnabled>';
                            query += '<condition>' + $("#" + $(val).attr('id') + " select").filter('[id*="condition"]').val() + '</condition>';
                            query += '<metadataname>' + $("#" + $(val).attr('id') + ' input:text').filter('[id*="metadata_label"]').val() + '</metadataname>';
                            query += '<metadatavalue>' + $("#" + $(val).attr('id') + ' input:hidden').filter('[id*="metadata_value"]').val() + '</metadatavalue>';
                            query += '<metadatatype>' + $("#" + $(val).attr('id') + ' input:hidden').filter('[id*="metadata_type"]').val() + '</metadatatype>';
                            fieldtype = $("#" + $(val).attr('id') + ' input:hidden').filter('[id*="metadata_type"]').val();
                            switch (fieldtype) {
                                case "Date":
                                    if ($("#" + $(val).attr('id') + " input:text").filter("[id*='date_value_']").length > 0) {
                                        temp = $.datepicker.formatDate('mm/dd/yy', $("#" + $(val).attr('id') + " input:text").filter("[id*='date_value_']").datepicker('getDate'));
                                        if (typeof (temp) == 'undefined' || temp == 'undefined' || temp == null)
                                            temp = "";
                                        query += ' <value>' + $.trim(temp) + '</value>';
                                    } else {
                                        query += '<value></value>';
                                    }
                                    break;
                                case "Choice":
                                case "Multi- Choice (Dropdown)":
                                    temp = $("#" + $(val).attr('id') + " input:text").filter("[id*='choice_value_']").val();
                                    if (typeof (temp) == 'undefined' || temp == 'undefined' || temp == null)
                                        temp = "";
                                    if (temp[temp.length - 1] == ',') {
                                        temp = temp.substr(0, temp.lastIndexOf(','));
                                    }
                                    query += ' <value>' + $.trim(temp) + '</value>';
                                    break;
                                case "User":
                                    temp = $("#" + $(val).attr('id') + " input:text").filter("[id*='user_value_']").val();
                                    if (typeof (temp) == 'undefined' || temp == 'undefined' || temp == null)
                                        temp = "";
                                    if (temp[temp.length - 1] == ',') {
                                        temp = temp.substr(0, temp.lastIndexOf(','));
                                    }
                                    query += ' <value>' + $.trim(temp) + '</value>';
                                    break;
                                case "Yes/No":
                                    query += ' <value>' + $.trim($("#" + $(val).attr('id') + " select").filter("[id*='YesNo_value_']").val()) + '</value>';
                                    break;
                                case "Value / Financials":
                                    query += ' <value>' + $.trim($("#" + $(val).attr('id') + " input:text").filter("[id*='num_value_']").val()) + '</value>';
                                    break;
                                default: control =
                                    query += ' <value>' + $.trim($("#" + $(val).attr('id') + " input:text").filter("[id*='text_value_']").val()) + '</value>';
                                    break;
                            }
                            query += '<operator>' + $("#" + $(val).attr('id') + " select").filter('[id*="operator"]').val() + '</operator>';
                            query += '</filter>';
                        }

                    })
                    query += "</filters>";
                }
                var url = "";
                var method = "";
                if (operation == 'add') {
                    url = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/savedview';
                    method = 'POST';
                } else if (operation == 'update') {
                    url = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/savedview?viewid=' + $("#txtViewID").val();
                    method = 'PUT';
                }
                if (operation == 'update' && ($("#txtAdvanceViewName").val() != currentadvanceViewObj.ViewName)) {
                    $("#loadingPage").fadeOut();
                    swal('', 'On edit <b>' + currentadvanceViewObj.ViewName + '</b> cannot be changed, to create new view please click on \'Save as New View\' button');
                }
                else {
                    var valid = true;
                    var metadata = ""
                    var operator = "";
                    var operatortxt = "";
                    var temp1 = "";
                    var temp2 = "";
                    var errmsg = "";

                    $("#tblfilterConditions tr").each(function (index, val) {
                        metadata = $("#metadata_value_" + index).val();
                        operator = $("#operator_" + index).val();
                        temp1 = metadata + '~' + operator;
                        $("#tblfilterConditions tr").each(function (index1, val1) {

                            if (index != index1) {
                                metadata = $("#metadata_value_" + index1).val();
                                operator = $("#operator_" + index1).val();
                                operatortxt = $("#operator_" + index1 + ' option:selected').text();
                                temp2 = metadata + '~' + operator;
                                if (temp1 == temp2) {
                                    if (errmsg.indexOf(metadata) == -1)
                                        errmsg += 'Dulipcate query with same Metadata and Operator found ' + '\'' + metadata + '\'' + ' ' + '\'' + operatortxt + '\'';
                                    valid = false;

                                }
                            }

                        })
                    })
                    if (valid && errmsg == '') {
                        $.ajax({
                            url: url,
                            type: method,
                            dataType: 'json',
                            headers: { 'eContracts-ApiKey': localStorage.APIKey },
                            data: {
                                RowKey: $("#txtViewID").val(),
                                ViewName: $("#txtAdvanceViewName").val(),
                                SearchKeyword: "",
                                SortBy: $('#conAdvanceViewSortBy').val() + '~' + $('#advanceViewSortDirection').attr('data-direction'),
                                ViewFor: 'Request',
                                ViewQuery: query,
                                DefaultViewName: qvName,
                                CreatedBy: localStorage.UserName,
                                ModifiedBy: localStorage.UserName,
                                isAdvanceView: 'Yes'
                            },
                            cache: false,
                            success: function (person) {
                                personData = person;
                                if (operation == 'add') {
                                    //setTimeout(function () {
                                    //    var viewObj = $("#liContractViews li p a").filter('[id*=' + '"' + person.split('&')[0] + '"' + ']');
                                    //    $("#loadingPage").fadeOut();
                                    //    if (viewObj.length > 0)
                                    //        savedViewDisplay(viewObj[0])
                                    //}, 5000);
                                    showAfterSave = "add";
                                } else if (operation == 'update') {
                                    //setTimeout(function () {
                                    //    var viewObj = $("#liContractViews li p a").filter('[id*=' + '"' + $("#txtViewID").val() + '"' + ']');
                                    //    $("#loadingPage").fadeOut();
                                    //    if (viewObj.length > 0)
                                    //        savedViewDisplay(viewObj[0])
                                    //}, 5000);
                                    showAfterSave = "update";
                                }
                                if (person == "Please provide other view name.") {
                                    $("#loadingPage").fadeOut();
                                    swal("", "View Name already exist, Please provide other view name."); // Bug(eO37164)
                                }
                                else {
                                    $("#addNewAdvanceView").dialog("close");
                                    //swal("", person);
                                    restoreAdvanceViewIntial();
                                    GetSavedViews();
                                }
                            }
                        });
                    } else {
                        $("#loadingPage").fadeOut();
                        swal('', errmsg);
                    }
                }

            }

        }
    }
}

function OpenRequestApproval(approvalWorkflow, requestTitle, requestID, businessArea, contractArea) {
    if (approvalWorkflow == "In Progress") {
        $("#loadingPage").fadeIn();
        workflowurltoshow = "";
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/requests/' + requestID + '/activity',
            type: 'GET',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            cache: false,
            success: function (data) {
                var datalenght = data.length;
                if (datalenght > 0) {
                    for (var i = 0; i < datalenght; i++) {
                        var item = data[i];
                        var RowKey = item.RowKey;
                        var Status = item.Status;
                        var ActivityType = item.ActivityType;
                        if (ActivityType == "Request Approval" && (Status == "In Progress" || Status == "Stopped" || Status == "Cancelled")) {
                            if (workflowurltoshow == "") {
                                workflowurltoshow = '/Activity/TaskDetails?TaskID=&WorkflowID=' + RowKey;
                            }
                        }

                    }
                    if (workflowurltoshow != "") {
                        $("#loadingPage").fadeOut();
                        //swal("", "Request Approval is in progress for this request.")
                        $("#alertText1").html("Approval workflow is in progress for this request");
                        $("#textingdetails").html('<a target="_blank" title="View Workflow Details" href=' + workflowurltoshow + '><font color="#44A6D8">View Workflow Details</font></a>');
                        $("#dvAlertDetails1").dialog("open");
                    }
                    else {
                        $("#loadingPage").fadeOut();
                        swal("", "Request Approval is in progress for this request.")
                    }

                }
                else {
                    $("#loadingPage").fadeOut();
                    swal("", "Request Approval is in progress for this request.")
                }

            },
            error: function () {
                $("#loadingPage").fadeOut();
                swal("", "Request Approval is in progress for this request.");
            }
        });

        //swal("", "Request Approval is in progress for this request.")
    }
    else {
        $("#loadingPage").fadeIn();
        $("#tblStage").empty();
        $("#ddlRule").empty();

        $("#txtWorkflowTitle").val('Approval for ' + requestTitle);
        $("#txtDuration").val("");
        if (!PipeReqApprovalTextarea) {
            PipeReqApprovalTextarea = new nicEditor({ buttonList: ['bold', 'italic', 'underline', 'strikethrough', 'left', 'center', 'right', 'justify', 'ol', 'ul', 'fontSize', 'fontFamily', 'fontFormat', 'removeformat', 'hr', 'indent', 'outdent', 'link', 'unlink', 'forecolor', 'bgcolor', 'xhtml'] }).panelInstance('txtComment');
            $('.nicEdit-panelContain').parent().width('100%');
            $('.nicEdit-panelContain').parent().next().width('100%');
            $('.nicEdit-main').width("99%");
        }
        var nicInstance = nicEditors.findEditor('txtComment');
        nicInstance.setContent('');
        NicEditorPasteEvent();

        $("#hdWorkflowType").val("Request Approval");
        $("#hdWorkflowContractArea").val(contractArea);
        $("#hdWorkflowBusinessArea").val(businessArea);
        $("#hdWorkflowObjectID").val(requestID);
        $("#hdWorkflowObjectTitle").val(requestTitle);
        GetValuesAndAutoPopulate("ddlWorkflowCC", "");


        var vWorkflowSettings = [];
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/evaluate?workflowType=Request Approval&contractArea=' + encodeURIComponent(contractArea) + '&businessArea=' + encodeURIComponent(businessArea) + '&contractid=' + requestID,
            type: 'GET',
            cache: false,
            contentType: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            processData: false,
            success: function (item) {
                vWorkflowSettings = item.WorkflowSettings;

                var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                    return (n.RowKey == "8" && n.Status == "ON");
                });
                if (vAccFeat.length > 0) {
                    vWorkflowRules = item.WorkflowRules;
                }

                if (item.WorkflowSettings != null) {
                    workflowRoutingOptions = vWorkflowSettings.WorkflowRoutingOptions.split(";");
                    workflowRoutingOptions = $.map(workflowRoutingOptions, $.trim);
                    if (workflowRoutingOptions.indexOf("Allow adding additional Stages") == -1) {
                        if (workflowRoutingOptions.indexOf("Allow over-ride of Admin Configuration") == -1) {
                            $("#spAddStage").css("display", "none");
                        }
                    }
                    $("#txtDuration").val(vWorkflowSettings.TaskDuration);
                    if ($("#txtDuration").val() != "") {
                        $("#txtDuration").trigger("onchange");
                    } else {
                        $("#lblDurationDate").empty();
                    }
                    workflowAdHoc = vWorkflowSettings.WorkflowAdHoc;
                }
                if (vWorkflowRules.length > 0) {
                    $(vWorkflowRules).each(function (i, rule) {
                        $("#ddlRule").append('<option value="' + rule.RuleName + '">' + rule.RuleName + '</option>');
                    });
                    if (workflowAdHoc == "on") {
                        $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                    }
                    var workflowRules = vWorkflowRules[0];
                    $("#ddlRule").find('option[value="' + workflowRules.RuleName + '"]').prop("selected", true);
                    if (vWorkflowRules.length == 1 && workflowAdHoc == "") {
                        $("#ddlRule").attr('disabled', 'disabled');
                    }
                    else {
                        $("#ddlRule").removeAttr("disabled");
                    }
                    var participantsInXML = workflowRules.ParticipantsInXML;
                    var totalFileCount = 0;
                    if (workflowRules.RuleName == "Default") {
                        if (typeof workflowRules.WorkflowTitle != 'undefined' && workflowRules.WorkflowTitle != "") {
                            $("#txtWorkflowTitle").val(workflowRules.WorkflowTitle + ' for ' + $("#hdWorkflowObjectTitle").val());
                        } else {
                            $("#txtWorkflowTitle").val('Approval for ' + $("#hdWorkflowObjectTitle").val());
                        }
                    }
                    else {
                        if (typeof workflowRules.WorkflowTitle != 'undefined' && workflowRules.WorkflowTitle != "") {
                            $("#txtWorkflowTitle").val(workflowRules.WorkflowTitle + ' for ' + $("#hdWorkflowObjectTitle").val());
                        }
                        else {
                            $("#txtWorkflowTitle").val('Approval for ' + $("#hdWorkflowObjectTitle").val());
                        }
                    }
                    //If the rule is ad-hoc 
                    if (participantsInXML != "") {
                        $(participantsInXML).find('WorkflowPaticipant').each(function () {
                            var StageTitle = $(this).find('StageTitle').text();
                            var Participants = $(this).find('Participants').text();
                            var Order = $(this).find('Order').text();
                            totalFileCount++;
                            var htmlFormatFile = '<tr id="trStage' + totalFileCount + '">';
                            htmlFormatFile += '<td class="width30 wf_approval">';
                            htmlFormatFile += '<input id="txtStage' + totalFileCount + '" value="' + StageTitle + '" name="Stage' + totalFileCount + '" title="Stage" placeholder="Stage Name" type="text" class="f_inpt width95 validelement" />';
                            htmlFormatFile += '</td>';
                            htmlFormatFile += '<td class="width46 ">';
                            htmlFormatFile += '<select id="ddlAssignTo' + totalFileCount + '" name="AssignTo' + totalFileCount + '"  multiple="multiple" data-placeholder="Select" class="width97 validmultiselect"></select>';
                            htmlFormatFile += '</td>';
                            htmlFormatFile += '<td class="width20 padding_top_3px v_align_top">';
                            htmlFormatFile += '<select id="ddlOrder' + totalFileCount + '" name="Order' + totalFileCount + '"  class="f_inpt width97">';
                            if (Order == "Serial")
                                htmlFormatFile += '<option value="Serial" selected="selected">Serial</option><option value="Parallel">Parallel</option></select>';
                            else
                                htmlFormatFile += '<option value="Serial">Serial</option><option value="Parallel" selected="selected">Parallel</option></select>';
                            htmlFormatFile += '</td>';
                            htmlFormatFile += '<td class="width4 padding_top_10px v_align_top">';
                            if (totalFileCount > 1)
                                htmlFormatFile += '<img id="imgStageDelete' + totalFileCount + '" src="../Content/Images/icon/delete.png" style="width: 20px" onclick="DeleteStage(this)" />';
                            else
                                htmlFormatFile += '<img id="imgStageDelete' + totalFileCount + '" src="../Content/Images/icon/delete.png" style="visibility: hidden; width: 20px" onclick="DeleteStage(this)" />';
                            htmlFormatFile += '</td>';
                            htmlFormatFile += '</tr>';

                            $("#tblStage").append(htmlFormatFile);
                            var $options = $("#ddlApprovers > option").clone();
                            $('#ddlAssignTo' + totalFileCount).append($options);

                            $("#ddlAssignTo" + totalFileCount).chosen().change(function () {
                                var vasstoid = $(this).attr('id').replace("ddlAssignTo", "");
                                if ($(this).val() != null) {
                                    if ($(this).val().length > 1 && (workflowRoutingOptions.indexOf("Allow over-ride of Admin Configuration") >= 0 ||
                                        workflowRoutingOptions.indexOf("Allow replacing participants") >= 0))
                                        $("#ddlOrder" + vasstoid).prop('disabled', false);
                                    else {
                                        $("#ddlOrder" + vasstoid).prop('disabled', true);
                                        $("#ddlOrder" + vasstoid).val('Serial');
                                    }
                                }
                                else {
                                    $("#ddlOrder" + vasstoid).prop('disabled', true);
                                    $("#ddlOrder" + vasstoid).val('Serial');
                                }
                            });
                            GetValuesAndAutoPopulate("ddlAssignTo" + totalFileCount, Participants);
                            var vParticipantsArr = Participants.split(";");
                            if ($("#ddlAssignTo" + totalFileCount).val().length > 1)
                                $("#ddlOrder" + totalFileCount).prop('disabled', false);
                            else
                                $("#ddlOrder" + totalFileCount).prop('disabled', true);
                            if (item.WorkflowSettings != null) {
                                if (workflowRoutingOptions.indexOf("Allow over-ride of Admin Configuration") == -1) {
                                    if (workflowRoutingOptions.indexOf("Allow replacing participants") == -1) {
                                        $("#ddlAssignTo" + totalFileCount).prop('disabled', true).trigger("chosen:updated");
                                        $("#ddlOrder" + totalFileCount).prop('disabled', true);
                                    }
                                    $("#txtStage" + totalFileCount).prop('disabled', true);
                                    $("#imgStageDelete" + totalFileCount).css("visibility", "hidden");
                                }
                            }
                        });
                    }
                    else {
                        if ($("#ddlRule").html() == "")
                            $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                        if (!workflowAdHoc)
                            $("#ddlRule").attr('disabled', 'disabled');
                        var totalFileCount = 1;
                        var htmlFormatFile = '<tr id="trStage' + totalFileCount + '">';
                        htmlFormatFile += '<td class="width30 wf_approval">';
                        htmlFormatFile += '<input id="txtStage' + totalFileCount + '" name="Stage' + totalFileCount + '" title="Stage" placeholder="Stage Name" type="text" class="f_inpt width95 validelement" value="Stage ' + totalFileCount + '"/>';
                        htmlFormatFile += '</td>';
                        htmlFormatFile += '<td class="width46">';
                        htmlFormatFile += '<select id="ddlAssignTo' + totalFileCount + '" name="AssignTo' + totalFileCount + '"  multiple="multiple" data-placeholder="Select" class="width97 validmultiselect"></select>';
                        htmlFormatFile += '</td>';
                        htmlFormatFile += '<td class="width20 padding_top_3px v_align_top">';
                        htmlFormatFile += '<select id="ddlOrder' + totalFileCount + '" name="Order' + totalFileCount + '"  class="f_inpt width97" disabled="disabled"><option selected="selected">Serial</option><option>Parallel</option></select>';
                        htmlFormatFile += '</td>';
                        htmlFormatFile += '<td class="width4 padding_top_10px v_align_top">';
                        htmlFormatFile += '<img src="../Content/Images/icon/delete.png" style="visibility: hidden; width: 20px" onclick="DeleteStage(this)" />';
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
                                else {
                                    $("#ddlOrder" + vasstoid).prop('disabled', true);
                                    $("#ddlOrder" + vasstoid).val('Serial');
                                }
                            }
                        });
                    }
                }
                else {
                    if ($("#ddlRule").html() == "")
                        $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                    if (!workflowAdHoc)
                        $("#ddlRule").attr('disabled', 'disabled');
                    var totalFileCount = 1;
                    var htmlFormatFile = '<tr id="trStage' + totalFileCount + '">';
                    htmlFormatFile += '<td class="width30 wf_approval">';
                    htmlFormatFile += '<input id="txtStage' + totalFileCount + '" name="Stage' + totalFileCount + '" title="Stage" placeholder="Stage Name" type="text" class="f_inpt width95 validelement" value="Stage ' + totalFileCount + '"/>';
                    htmlFormatFile += '</td>';
                    htmlFormatFile += '<td class="width46">';
                    htmlFormatFile += '<select id="ddlAssignTo' + totalFileCount + '" name="AssignTo' + totalFileCount + '"  multiple="multiple" data-placeholder="Select" class="width97 validmultiselect"></select>';
                    htmlFormatFile += '</td>';
                    htmlFormatFile += '<td class="width20 padding_top_3px v_align_top">';
                    htmlFormatFile += '<select id="ddlOrder' + totalFileCount + '" name="Order' + totalFileCount + '"  class="f_inpt width97" disabled="disabled"><option selected="selected">Serial</option><option>Parallel</option></select>';
                    htmlFormatFile += '</td>';
                    htmlFormatFile += '<td class="width4 padding_top_10px v_align_top">';
                    htmlFormatFile += '<img src="../Content/Images/icon/delete.png" style="visibility: hidden; width: 20px" onclick="DeleteStage(this)" />';
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
                            else {
                                $("#ddlOrder" + vasstoid).prop('disabled', true);
                                $("#ddlOrder" + vasstoid).val('Serial');
                            }
                        }
                    });
                }

                $("#loadingPage").fadeOut();
                $("#dvWorkflow").dialog("option", "title", "Request Approval Workflow");
                $("#dvWorkflow").dialog("open");
                $("#dvWorkflow").height("auto");
            },
            error: function () {
                $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                if (!workflowAdHoc)
                    $("#ddlRule").attr('disabled', 'disabled');
                var totalFileCount = 1;
                var htmlFormatFile = '<tr id="trStage' + totalFileCount + '">';
                htmlFormatFile += '<td class="width30 wf_approval">';
                htmlFormatFile += '<input id="txtStage' + totalFileCount + '" name="Stage' + totalFileCount + '" title="Stage" placeholder="Stage Name" type="text" class="f_inpt width95 validelement" value="Stage ' + totalFileCount + '"/>';
                htmlFormatFile += '</td>';
                htmlFormatFile += '<td class="width46">';
                htmlFormatFile += '<select id="ddlAssignTo' + totalFileCount + '" name="AssignTo' + totalFileCount + '"  multiple="multiple" data-placeholder="Select" class="width97 validmultiselect"></select>';
                htmlFormatFile += '</td>';
                htmlFormatFile += '<td class="width20 padding_top_3px v_align_top">';
                htmlFormatFile += '<select id="ddlOrder' + totalFileCount + '" name="Order' + totalFileCount + '"  class="f_inpt width97" disabled="disabled"><option selected="selected">Serial</option><option>Parallel</option></select>';
                htmlFormatFile += '</td>';
                htmlFormatFile += '<td class="width4 padding_top_10px v_align_top">';
                htmlFormatFile += '<img src="../Content/Images/icon/delete.png" style="visibility: hidden; width: 20px" onclick="DeleteStage(this)" />';
                htmlFormatFile += '</td>';
                htmlFormatFile += '</tr>';

                $("#tblStage").append(htmlFormatFile);
                var $options = $("#ddlApprovers > option").clone();
                $('#ddlAssignTo' + totalFileCount).append($options);
                $("#ddlAssignTo" + totalFileCount).chosen().change(function () {
                    var vasstoid = $(this).attr('id').replace("ddlAssignTo", "");
                    if ($(this).val().length > 1)
                        $("#ddlOrder" + vasstoid).prop('disabled', false);
                    else {
                        $("#ddlOrder" + vasstoid).prop('disabled', true);
                        $("#ddlOrder" + vasstoid).val('Serial');
                    }
                });

                $("#loadingPage").fadeOut();
                $("#dvWorkflow").dialog("option", "title", "Request Approval Workflow");
                $("#dvWorkflow").dialog("open");
                $("#dvWorkflow").height("auto");
            }
        });

    }
}


function BindStatusNew(RequestID, Status) {

    $("#hdContractID").val(RequestID);
    $("#hdContractStatus").val(Status);
    var ctrl = '<li id="New">';
    ctrl += '<input id="rdstatusNew" type="radio" onclick="javascript:statusclick(this);" name="rdstatus" value="New" class="css-checkbox" />';
    ctrl += '<label for="rdstatusNew" class="css-label"><b title="New" class="status_green_another requests_Index_status_b"><img src="../Content/Images/status/new.png">new</b>New</label>';
    ctrl += '</li>';
    ctrl += '<li id="Awaiting Approval">';
    ctrl += '<input id="rdstatusAwtAppr" type="radio" onclick="javascript:statusclick(this);" name="rdstatus" value="Awaiting Approval" class="css-checkbox" />';
    ctrl += '<label for="rdstatusAwtAppr" class="css-label"><b title="Awaiting Approval" class="status_yellow requests_Index_status_b"><img src="../Content/Images/status/renew.png">appr</b>Awaiting Approval</label>';
    ctrl += '</li>';
    ctrl += '<li id="Approved">';
    ctrl += '<input id="rdstatusAppr" type="radio" onclick="javascript:statusclick(this);" name="rdstatus" value="Approved" class="css-checkbox" />';
    ctrl += '   <label for="rdstatusAppr" class="css-label"><b title="Approved" class="status_blue requests_Index_status_b"><img src="../Content/Images/status/tick.png">appr</b>Approved</label>';
    ctrl += '</li>';
    ctrl += '<li id="Completed">';
    ctrl += '<input id="rdstatusComp" type="radio" onclick="javascript:statusclick(this);" name="rdstatus" value="Completed" class="css-checkbox" />';
    ctrl += '<label for="rdstatusComp" class="css-label"><b class="status_blue requests_Index_status_b"><img src="../Content/Images/status/tick.png"> Comp</b>Completed</label>';
    ctrl += '</li>';
    ctrl += '<li id="On Hold">';
    ctrl += '<input id="rdstatusHold" type="radio" onclick="javascript:statusclick(this);" name="rdstatus" value="On Hold" class="css-checkbox" />';
    ctrl += '<label for="rdstatusHold" class="css-label"><b title="On Hold" class="status_red requests_Index_status_b"><img src="../Content/Images/status/exp.png">hold</b>On Hold</label>';
    ctrl += '</li>';
    ctrl += '<li id="Cancelled">';
    ctrl += '<input id="rdstatusCanc" type="radio" onclick="javascript:statusclick(this);" name="rdstatus" value="Cancelled" class="css-checkbox" />';
    ctrl += '<label for="rdstatusCanc" class="css-label"><b title="Cancelled" class="status_Gray requests_Index_status_b"><img src="../Content/Images/status/close.png">canc</b>Cancelled</label>';
    ctrl += '</li>';
    ctrl += '<div class="f_list" style="padding: 0px 0px 0px 10px;display:none;" id="dvCancelCtrl">';
    ctrl += '<textarea id="txtCancelledReason" placeholder="Reason for Cancellation" rows="3" class="f_text-box width90" />';
    ctrl += '</div>';

    $("#menu34").empty();
    $("#menu34").append(ctrl);
    $('input:radio[name="rdstatus"][value="' + $("#hdContractStatus").val() + '"]').prop('checked', true);
    if ($("#hdContractStatus").val() == "Cancelled") {
        $('#dvCancelCtrl').css("display", "");
        $('#dvRenewCtrl').css("display", "none");
    }

    $('#addEditStatus').dialog('open');
}

function ManageRequestPeople(requestID) {
    $("#loadingPage").fadeIn();
    $("#hdRequestID").val(requestID);
    var arrclear = [];
    ChosenOrder.setSelectionOrder($('#ddlCollaboratorsNew'), arrclear, true);
    ChosenOrder.setSelectionOrder($('#ddlApproversNew'), arrclear, true);
    ChosenOrder.setSelectionOrder($('#ddlRequestorsNew'), arrclear, true);
    ChosenOrder.setSelectionOrder($('#ddlAssignedTo'), arrclear, true);
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/requestsbyrequestid?requestid=' + requestID,
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
        processData: false,
        success: function (item) {
            if (item.RequestCollaborators != "") {
                GetValuesAndAutoPopulate("ddlCollaboratorsNew", item.RequestCollaborators);
            }
            if (item.Approvers != "") {
                GetValuesAndAutoPopulate("ddlApproversNew", item.Approvers);
            }
            if (item.Requestor != "") {
                GetValuesAndAutoPopulate("ddlRequestorsNew", item.Requestor);
            }

            if (item.AssignedTo != "") {
                GetValuesAndAutoPopulate("ddlAssignedTo", item.AssignedTo);
            }
            var usersarr = [];
            if (item.ContractAreaAdministrators == null || item.ContractAreaAdministrators == "") {
                $("#liContractAreaAdmin").html('Not Available');
            }
            else {
                usersarr = item.ContractAreaAdministrators.split(";");
                var reslength = usersarr.length;
                var vUsers = '';
                var userDisable = '';
                var userTitle = '';
                for (var i = 0; i < reslength; i++) {
                    userDisable = '';
                    usertitle = '';
                    if (vActiveUsers.indexOf(usersarr[i].trim()) < 0 && vActiveUsers.length > 0) {
                        userDisable = ' disabled_item_link';
                        usertitle = 'title="This user is no longer available."';
                    }

                    if (vUsers == '')
                        vUsers = '<a href="javascript:void(0);" onclick="ViewUserProfile(\'' + escape(usersarr[i].trim()) + '\')" class="Link_UserProfile' + userDisable + '" ' + usertitle + '>' + usersarr[i].trim() + '</a>';
                    else
                        vUsers += '; <a href="javascript:void(0);" onclick="ViewUserProfile(\'' + escape(usersarr[i].trim()) + '\')" class="Link_UserProfile' + userDisable + '" ' + usertitle + '>' + usersarr[i].trim() + '</a>';
                }
                $("#liContractAreaAdmin").html(vUsers);
            }
            if (item.BusinessAreaOwners == null || item.BusinessAreaOwners == "") {
                $("#liBusinessAreaOwner").html('Not Available');
            }
            else {
                usersarr = item.BusinessAreaOwners.split(";");
                var reslength = usersarr.length;
                var vUsers = '';
                var userDisable = '';
                var userTitle = '';
                for (var i = 0; i < reslength; i++) {
                    userDisable = '';
                    usertitle = '';
                    if (vActiveUsers.indexOf(usersarr[i].trim()) < 0 && vActiveUsers.length > 0) {
                        userDisable = ' disabled_item_link';
                        usertitle = 'title="This user is no longer available."';
                    }
                    if (vUsers == '')
                        vUsers = '<a href="javascript:void(0);" onclick="ViewUserProfile(\'' + escape(usersarr[i].trim()) + '\')" class="Link_UserProfile' + userDisable + '" ' + usertitle + '>' + usersarr[i].trim() + '</a>';
                    else
                        vUsers += '; <a href="javascript:void(0);" onclick="ViewUserProfile(\'' + escape(usersarr[i].trim()) + '\')" class="Link_UserProfile' + userDisable + '" ' + usertitle + '>' + usersarr[i].trim() + '</a>';
                }
                $("#liBusinessAreaOwner").html(vUsers);
            }

            $("#loadingPage").fadeOut();
            $("#addEditPeople").dialog("option", "title", "People");
            $("#addEditPeople").dialog("open");
            $("#addEditPeople").height("auto");
        }
    });
}

function CreateRequestActivityList(RequestID) {
    $("#loadingPage").fadeIn();
    $("#contractLogs").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/activities?objecttype=Request&objectid=' + RequestID + '&actiontype=',
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
                var sTimestamp = "";
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                { sTimestamp = moment(new Date(item.Timestamp)).format('MM/DD/YYYY h:mm A'); }
                else { sTimestamp = moment(new Date(item.Timestamp)).format(localStorage.AppDateFormat + " h:mm A"); }

                var article = '<tr><td><span class="logHis_Datetime">' + sTimestamp + '</span></td><td><b>' + sObject + '</b></td><td><span class="logHis_Activity">' + sActivity + '</span></td><td><span class="logHis_Datetime">' + sUserID + '</span></td></tr>';
                $("#contractLogs").append(article);
            }
            $("#hdContractID").val('');
            $('#compact-pagination-Activity').pagination({
                items: data.length,
                itemsOnPage: 15,
                type: 'tbody',
                typeID: 'contractLogs',
                row: 'tr',
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
var multipleChecksPermission = "";
var multipleChecksStatus = "";
var multipleChecksIsDraftByCurrent = "";
function checkMultipleRequests(object) {
    var validate = true;
    $("#btnMultipleAction_NoActions").css('display', 'none');
    $("input:checkbox[name=ContRec]").each(function () {

        if ($(this).is(":checked")) {

            if (validate) {
                validate = true;
            }

        }
        else {
            validate = false;

        }

    });
    var noActionsFlag = true;
    if (validate) {
        $('#SelectAll').attr('checked', true)
    }
    else {
        $('#SelectAll').attr('checked', false)
    }

    var RequestID = object.id;
    var vPermission = $("#" + RequestID).parent("p").parent("li").find("#Permission").text();
    var vStatus = $("#" + RequestID).parent("p").parent("li").find("#Status").text();
    var vIsDraftByCurrent = $("#" + RequestID).parent("p").parent("li").find("#IsDraftByCurrent").text();
    var isChecked = object.checked;
    if ($('[previously=true]:checked').length > 0) {
        $('[previously=true]:checked').each(function () {
            if (multipleChecks.indexOf(this.id) < 0) {
                if (multipleChecks == "") {
                    multipleChecks = ';' + this.id;

                } else {
                    multipleChecks = multipleChecks + ";" + this.id;
                }
            }
        })
    }
    if (isChecked) {
        $("#" + RequestID).parent("p").parent("li").addClass('aActive');
        $("#btnMultipleRequestAction").css('display', '');
        multipleChecks = multipleChecks + ';' + RequestID;
        multipleChecksPermission = multipleChecksPermission + ';' + vPermission;
        multipleChecksStatus = multipleChecksStatus + ';' + vStatus;
        multipleChecksIsDraftByCurrent = multipleChecksIsDraftByCurrent + ';' + vIsDraftByCurrent;
    } else {
        $("#" + RequestID).parent("p").parent("li").removeClass('aActive');
        multipleChecks = multipleChecks.replace(';' + RequestID, '');
        multipleChecksPermission = multipleChecksPermission.replace(';' + vPermission, '');
        multipleChecksStatus = multipleChecksStatus.replace(';' + vStatus, '');
        multipleChecksIsDraftByCurrent = multipleChecksIsDraftByCurrent.replace(';' + vIsDraftByCurrent, '');
    }



    if (multipleChecks.trim() == "") {
        $("#btnMultipleRequestAction").css('display', 'none');
    } else {
        if (multipleChecksPermission.indexOf('openmenuView') >= 0) {
            $("#btnMultipleAction_Status").css('display', 'none');
            $("#btnMultipleAction_People").css('display', 'none');
            $("#btnMultipleAction_Counparty").css('display', 'none');
            $("#btnMultipleAction_BusnArea").css('display', 'none');
            $("#btnMultipleAction_Delete").css('display', 'none');
            $("#btnMultipleAction_NoPermission").css('display', '');
            noActionsFlag = false;
        } else if (multipleChecksPermission.indexOf('openmenuContribute') >= 0) {

            $("#btnMultipleAction_People").css('display', 'none');
            if (multipleChecksStatus.indexOf("Completed") >= 0 || multipleChecksStatus.indexOf("Cancelled") >= 0) {
                $("#btnMultipleAction_Counparty").css('display', 'none');
                $("#btnMultipleAction_Status").css('display', 'none');
            }
            else {
                $("#btnMultipleAction_Counparty").css('display', '');
                if (multipleChecksIsDraftByCurrent.indexOf("No") >= 0 || multipleChecksIsDraftByCurrent.indexOf("Yes") >= 0)
                    $("#btnMultipleAction_Status").css('display', 'none');
                else {
                    noActionsFlag = false;
                    $("#btnMultipleAction_Status").css('display', '');
                }
            }

            if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
                noActionsFlag = false;
                $("#btnMultipleAction_BusnArea").css('display', '');
            }
            $("#btnMultipleAction_Delete").css('display', 'none');
            $("#btnMultipleAction_NoPermission").css('display', 'none');

        } else {
            if (multipleChecksStatus.indexOf("Completed") >= 0 || multipleChecksStatus.indexOf("Cancelled") >= 0) {
                $("#btnMultipleAction_Counparty").css('display', 'none');
                $("#btnMultipleAction_Status").css('display', 'none');
                $("#btnMultipleAction_People").css('display', 'none');
            }
            else {
                if (multipleChecksIsDraftByCurrent.indexOf("No") >= 0 || multipleChecksIsDraftByCurrent.indexOf("Yes") >= 0) {
                    $("#btnMultipleAction_Status").css('display', 'none');
                    $("#btnMultipleAction_People").css('display', 'none');
                }
                else {
                    noActionsFlag = false;
                    $("#btnMultipleAction_People").css('display', '');
                    $("#btnMultipleAction_Status").css('display', '');
                }

                noActionsFlag = false;
                $("#btnMultipleAction_Counparty").css('display', '');
            }
            if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
                noActionsFlag = false;
                $("#btnMultipleAction_BusnArea").css('display', '');
            }
            if (localStorage.UserType.indexOf("Global Contract Owner") >= 0) {
                if (!(multipleChecksStatus.indexOf("New") >= 0 || multipleChecksStatus.indexOf("Awaiting Approval") >= 0 || multipleChecksStatus.indexOf("Approved") >= 0 || multipleChecksStatus.indexOf("On Hold") >= 0 || (multipleChecksIsDraftByCurrent.indexOf("No") >= 0))) {
                    noActionsFlag = false;
                    $("#btnMultipleAction_Delete").css('display', '');
                }
                else {
                    $("#btnMultipleAction_Delete").css('display', 'none');
                }
            }
            else {
                $("#btnMultipleAction_Delete").css('display', 'none');
            }
            $("#btnMultipleAction_NoPermission").css('display', 'none');

        }
    }

    if (ObjectNameToSend == "Draft") {
        $("#btnMultipleAction_People").css('display', 'none');
        $("#btnMultipleAction_Status").css('display', 'none');
        if (localStorage.UserType.indexOf("Global Contract Owner") >= 0 || !(multipleChecksIsDraftByCurrent.indexOf("No") >= 0)) {
            noActionsFlag = false;
            $("#btnMultipleAction_Delete").css('display', '');
        }
        else {
            $("#btnMultipleAction_Delete").css('display', 'none');
        }
    }

    else if (ObjectNameToSend == "Completed") {
        $("#btnMultipleAction_Status").css('display', 'none');
        $("#btnMultipleAction_People").css('display', 'none');
        $("#btnMultipleAction_Counparty").css('display', 'none');
        $("#btnMultipleAction_BusnArea").css('display', 'none');
        $("#btnMultipleAction_NoPermission").css('display', 'none');
        if (localStorage.UserType.indexOf("Global Contract Owner") >= 0) {
            $("#btnMultipleAction_Delete").css('display', '');
            $("#btnMultipleAction_NoActions").css('display', 'none');
        }
        else {
            $("#btnMultipleAction_Delete").css('display', 'none');
            $("#btnMultipleAction_NoActions").css('display', '');
        }
    }

    if (noActionsFlag) {
        $("#btnMultipleAction_NoActions").css('display', '');
    }
    else {
        $("#btnMultipleAction_NoActions").css('display', 'none');
    }
    var cp = $("#compact-pagination").pagination('getCurrentPage');
    updateContractSelectedObj(cp, false, false, $(object).parent().parent().index());
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
        $("#filterStatus option[value='" + firstChild.nodeValue + "']").prop("selected", false);
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

    if (qvName == "Past Requests" && !hasItem1 && !hasItem2) {
        GetPastRequests();
        displayshowall("Past Requests")
        document.getElementById('btnAddViewRequest').style.display = 'none';

    } else if (qvName == "All Requests" && !hasItem1 && !hasItem2) {
        applyFilter();
        displayshowall("All Requests");
        document.getElementById('btnAddViewRequest').style.display = 'none';
    } else if (qvName == "Draft" && !hasItem1 && !hasItem2) {
        GeRequestsSavedAsDraft();
        displayshowall("Draft");
        document.getElementById('btnAddViewRequest').style.display = 'none';
    }
    else if (qvName == "Pending" && !hasItem1 && !hasItem2) {
        GetPendingRequests();
        displayshowall("Pending");
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
            var datalength = data.length;
            peoples = data;
            for (var i = 0; i < datalength; i++) {
                var item = data[i];
                var sRowKey = item.RowKey;
                var sUserName = item.UserName;
                var article = '<option value="' + sUserName + '">' + sUserName + '</option>';
                $("#ddlBusinessOwners").append(article);
                $("#ddlContractManagers").append(article);
                $("#ddlReviewers").append(article);
                $("#ddlApproversNew").append(article);
                $("#ddlRequestorsNew").append(article);
                $("#ddlAssignedTo").append(article);
                $("#ddlSignees").append(article);
                $("#ddlBusinessUsers").append(article);
                $("#ddlApproversRenewSettings").append(article);
                $("#ddlApproversM").append(article);
                $("#ddlAssignedToM").append(article);

                $("#ddlReadOnly").append(article);
                $("#ddlReadWrite").append(article);
                $("#ddlFullControl").append(article);
                $("#ddlWorkflowCC").append(article);
                $("#ddlCollaboratorsNew").append(article);
                $("#ddlCollaboratorsM").append(article);
            }
            AddRolesddl("ddlAssignedTo");
            $("#ddlBusinessOwners").chosen();
            $("#ddlContractManagers").chosen();
            $("#ddlReviewers").chosen();
            $("#ddlApproversNew").chosen();
            $("#ddlRequestorsNew").chosen();
            $("#ddlAssignedTo").chosen();
            $("#ddlSignees").chosen();
            $("#ddlBusinessUsers").chosen();
            $("#ddlApproversRenewSettings").chosen();
            $("#ddlApproversM").chosen();
            $("#ddlAssignedToM").chosen();
            $("#ddlCollaboratorsM").chosen();
            $("#ddlReadOnly").chosen();
            $("#ddlReadWrite").chosen();
            $("#ddlFullControl").chosen();
            $("#ddlWorkflowCC").chosen();
            $("#ddlCollaboratorsNew").chosen();
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
    $('input[name="rdstatusMul"][value="' + decodeURI(e.value) + '"]').prop('checked', true);
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
    } else if (selectedValue == "undefined" || selectedValue == "0" || selectedValue == "") {

        swal("", "Select Status");
        return false;
    } else {
        changestatus();

        return true;
    }
}

function changestatus() {
    $("#loadingPage").fadeIn();
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
            $("#addEditStatus").dialog("close");
            $("#loadingPage").fadeOut();
            applyFilter();
        },
        error: function (commitmententity) {

            $("#loadingPage").fadeOut();
        }
    });
}


function savePeople() {
    if (requiredValidator('addNewPeople')) {
        $("#loadingPage").fadeIn();


        var collaborators = $("#ddlCollaboratorsNew").val();
        var collaborator = '';
        $(collaborators).each(function (i, item) {
            if (collaborator == '') {
                collaborator = item;
            }
            else {
                collaborator += "; " + item;
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


        var requestors = $("#ddlRequestorsNew").val();
        var reqtor = '';
        $(requestors).each(function (i, item) {
            if (reqtor == '') {
                reqtor = item;
            }
            else {
                reqtor += "; " + item;
            }
        });

        var assigntos = $("#ddlAssignedTo").val();
        var assignto = '';
        $(assigntos).each(function (i, item) {
            if (assignto == '') {
                assignto = item;
            }
            else {
                assignto += "; " + item;
            }
        });

        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/requests/' + $("#hdRequestID").val() + '/people',
            type: 'PUT',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            data: {
                Approvers: app,
                Requestor: reqtor,
                AssignedTo: assignto,
                RequestCollaborators: collaborator,
                ModifiedBy: localStorage.UserName
            },
            cache: false,
            success: function (person) {
                $("#loadingPage").fadeOut();
                $("#hdRequestID").val('');
                $("#hdRequestTitle").val('');

                $("#addEditPeople").dialog("close");
                location = location;
            }
        });
    }
}

function savePeopleM() {
    $("#loadingPage").fadeIn();

    var collaborators = $("#ddlCollaboratorsM").val();
    var collaborator = '';
    $(collaborators).each(function (i, item) {
        if (collaborator == '') {
            collaborator = item;
        }
        else {
            collaborator += "; " + item;
        }
    });
    var approvers = $("#ddlApproversM").val();
    var app = '';
    $(approvers).each(function (i, item) {
        if (app == '') {
            app = item;
        }
        else {
            app += "; " + item;
        }
    });

    var assigntos = $("#ddlAssignedToM").val();
    var assignto = '';
    $(assigntos).each(function (i, item) {
        if (assignto == '') {
            assignto = item;
        }
        else {
            assignto += "; " + item;
        }
    });

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/requests/multipeople?requestid=' + multipleChecks,
        type: 'PUT',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        data: {
            Approvers: app,
            AssignedTo: assignto,
            RequestCollaborators: collaborator,
            ModifiedBy: localStorage.UserName
        },
        cache: false,
        success: function (person) {
            $("#loadingPage").fadeOut();
            multipleChecks = '';
            $("#addEditPeople").dialog("close");
            location = location;
        }
    });
}



function approvaltaskyes() {
    $("#divWorkflowYes").css('display', '');
}

function approvaltaskno() {
    $("#divWorkflowYes").css('display', 'none');
}


function displayshowall(quickviewtitle) {
    $("#showAll").css('display', 'block');
    $("#showAll").css('display', 'inline');
    $("#showAll").text('');
    $("#showAll").text("Showing " + quickviewtitle + " Records");
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
    $("#conSortByOptions").val('Recently Updated')
    $("#conSortByOptions").prop('disabled', false).niceSelect('update');
}

function applyFilter(sortByOptions, sortDirection) {
    if ($("#filterContractType :selected").length > 10) {
        swal("", "Select upto 10.");
    }
    else {
        //manoj
        contractSelected = {
            pages: [{ pageNumber: "", selectedIndexes: [], isAllSelected: false }]
        };
        var allowcustomsearch = false;
        if (savedViewNameFromViewTable != "") {
            var CustomUl = $("#liRequestViews");
            TriggerChild = $(CustomUl).find(".active_quick_view");
            if (typeof TriggerChild != 'undefined' && TriggerChild != null && TriggerChild != "") {
                savedViewDisplaywithSearch(TriggerChild[0]);
                allowcustomsearch = true;
            }
        }
        if (!allowcustomsearch) {
            //manoj
            $("#spResult").empty();
            var qvName = "";
            if ($('#liFiltersQuickView').text() != "") {
                qvName = getQuickViewLinkName($('#liFiltersQuickView').text());
                //  $("#btnAddViewRequest").css('display', 'block');
                //document.getElementById('btnAddViewRequest').style.display = '';
            }
            if (savedViewNameFromViewTable != "")
                qvName = savedViewNameFromViewTable;
            if (qvName == "") {
                qvName = "All";
                colorLink('spnAllRequests', true);
                colorLink('spnDraft', false);
                colorLink('spnPending', false);
                colorLink('spnUnassigned', false);
                colorLink('spnDelayed', false);
                colorLink('spnSubmittedMyRequests', false);
                colorLink('spnASSigned', false);
                colorLink('spnCompletedRequests', false);
                colorLink('spnCancelledRequests', false);
                colorLink('spnInRecycleBin', false);
                colorLink('liRequestViews a', false);
                $("#btnFilter").css('display', 'inline');
                $("#dvSrhBox").css('display', '');
                $("#filteroptiontype").css('display', '');
                $("#filteroptiondates").css('display', 'none');
                $("#filteroptionstatus").css('display', '');
                $("#filteroption1").css('display', 'none');
                $("#filteroptionrenewdates").css('display', 'none');
                //BindContractStatusFilter(qvName);
                $("#txtSearchBox").val("");
                $("#txtSearchBox").attr("placeholder", "Search in 'All'");
            }
            $('#menu4').hide();
            $("#showAll").css('display', 'none');
            $("#liFiltersSearchText").empty();
            $("#liFiltersStatus").empty();
            $("#liFiltersType").empty();
            $("#liFiltersUserType").empty();
            $("#liFiltersRenewal").empty();
            $("#liFiltersExpiration").empty();
            $("#liAdvanceViewFilter").empty();
            var txtsearchboxvalue = $.trim($('#txtSearchBox').val());
            if (txtsearchboxvalue != "" && txtsearchboxvalue != null) {
                $('#liFiltersSearchText').html('<span><small>Showing search result for : ' + txtsearchboxvalue + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
            }
            var newurl = "";
            var sortby = "&sortbyfield=Timestamp&orderby=DESC";
            selectedSortOption = $('#conSortByOptions').find(":selected").text();
            switch (selectedSortOption) {
                case "Recently Updated":
                    sortby = '&sortbyfield=Timestamp&orderby=DESC';
                    break;
                case "Renewal Date":
                    sortby = '&sortbyfield=RenewalDate&orderby=ASC';
                    break;
                case "Expiration Date":
                    sortby = '&sortbyfield=ExpiryDate&orderby=ASC';
                    break;
                case "Contract Value":
                    sortby = '&sortbyfield=ContractValue&orderby=ASC';
                    break;
                case "Contract Number":
                    sortby = '&sortbyfield=ContractNumber&orderby=ASC';
                    break;
                case "Created Date":
                    sortby = '&sortbyfield=Created&orderby=DESC';
                    break;
                case "Title(A-Z)":
                    sortby = '&sortbyfield=RequestTitle&orderby=ASC';
                    break;
                case "Title(Z-A)":
                    sortby = '&sortbyfield=RequestTitle&orderby=DESC';
                    break;
                default:
                    sortby = '&sortbyfield=Timestamp&orderby=DESC';
                    break;
            }
            var customquery = '';
            var filterquery = '';
            $('#filterStatus :selected').each(function (i, selected) {
                if ($(selected).text() == "All") {
                    filterquery = ''; return false;
                }
                $('#liFiltersStatus').append('<span><small>' + $(selected).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
                if ($(selected).text() == "Not Available") {
                    if (filterquery == '')
                        filterquery += 'Status:undefined';
                    else
                        filterquery += ',undefined';
                }
                else {
                    if (filterquery == '')
                        filterquery += 'Status:' + $(selected).text();
                    else
                        filterquery += ',' + $(selected).text();
                }

            });
            if (filterquery == '')
                $("#liFiltersStatus").empty(); else {
                if (customquery == '')
                    customquery = filterquery;
                else
                    customquery += ';' + filterquery;
            }
            filterquery = '';
            $('#filterRequestType :selected').each(function (i, selected) {
                if ($(selected).text() == "All") {
                    filterquery = ''; return false;
                }
                $('#liFiltersType').append('<span><small>' + $(selected).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');

                if (filterquery == '')
                    filterquery += 'RequestType:' + $(selected).text();
                else
                    filterquery += ',' + $(selected).text();

            });
            if (filterquery == '')
                $("#liFiltersType").empty(); else {
                if (customquery == '')
                    customquery = filterquery;
                else
                    customquery += ';' + filterquery;
            }



            if (customquery == '') {
                $("#showAll").css('display', 'inline');
            }
            else {
                //$("#btnAddView").css('display', 'none');
                $("#btnAddViewRequest").css('display', 'block');
            }

            $("#listContracts").empty();

            var baname = ";";
            if (thisBusinessAreaName == "" || thisBusinessAreaName == "All") {
            } else {
                baname = thisBusinessAreaName;
            }
            var baloc = "";
            if (typeof localStorage.GlobalBusinessAreaLocation != 'undefined' && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
                baloc = encodeURIComponent(localStorage.GlobalBusinessAreaLocation);
            }
            // Bug (eO36986 )
            newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests?BusinessAreaPath=' + baloc + '&stage=pipeline&searchkeyword=' + encodeURIComponent($("#txtSearchBox").val().trim()) + '&customquery=' + encodeURIComponent(customquery) + sortby + "&viewName=" + qvName;
            $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
            $.ajax({
                url: newurl,
                type: 'GET',
                dataType: 'json',
                'Content-Type': 'application/json',
                cache: false,
                headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessArea: baname, BusinessAreaLocation: localStorage.GlobalBusinessAreaLocation },
                success: function (data) {
                    $("#compact-pagination").css('display', '');
                    $('#listContracts').empty();
                    GetData(data);
                },
                error:
                    function (data) {
                        $("#listContracts").empty();
                        $("#listContracts").append("<p class='f_p-error'>No items found.</p>");
                        $("#compact-pagination").css('display', 'none');
                        $("#divChkSelectAll").css('display', 'none');
                    }
            });

            $("#dvfilter").hide();
        }
    }
}

//function applyFilter() {
//    if ($("#filterRequestType :selected").length > 10) {
//        swal("", "Select upto 10.");
//    }
//    else {
//        $("#spResult").empty();
//        var qvName = "";
//        if ($('#liFiltersQuickView').text() != "") {
//            qvName = getQuickViewLinkName($('#liFiltersQuickView').text());

//            document.getElementById('btnAddViewRequest').style.display = '';
//        }

//        if (savedViewNameFromViewTable != "")
//            qvName = savedViewNameFromViewTable;

//        $('#menu4').hide();
//        $("#showAll").css('display', 'none');
//        $("#liFiltersSearchText").empty();
//        $("#liFiltersStatus").empty();
//        $("#liFiltersType").empty();
//        $("#liFiltersUserType").empty();
//        $("#liFiltersRenewal").empty();
//        $("#liFiltersExpiration").empty();
//        var txtsearchboxvalue = $.trim($('#txtSearchBox').val());
//        if (txtsearchboxvalue != "" && txtsearchboxvalue != null) {
//            $('#liFiltersSearchText').html('<span><small>Showing search result for : ' + txtsearchboxvalue + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
//        }
//        var newurl = "";
//        var sortby = "&sortbyfield=Timestamp&orderby=DESC";

//        switch (selectedSortOption) {
//            case "Recently Updated":
//                sortby = '&sortbyfield=Timestamp&orderby=DESC';
//                break;
//            case "Recently Submited":
//                sortby = '&sortbyfield=SubmittedOn&orderby=DESC';
//                break;
//            case "Created Date":
//                sortby = '&sortbyfield=Created&orderby=DESC';
//                break;
//            case "Title(A-Z)":
//                sortby = '&sortbyfield=RequestTitle&orderby=ASC';
//                break;
//            default:
//                sortby = '&sortbyfield=Timestamp&orderby=DESC';
//                break;
//        }



//        if (qvName == 'My Requests') {
//            var customQuery1 = "Status:";
//            var isContainingAll1 = false;
//            var isAnySelected1 = false;
//            $('#filterStatus :selected').each(function (i, selected) {
//                isAnySelected1 = true;
//                if ($(selected).text() == "All")
//                    isContainingAll1 = true;
//                $('#liFiltersStatus').append('<span><small>' + $(selected).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
//                if ($(selected).text() == "Not Available")
//                    customQuery1 += ',undefined';
//                else
//                    customQuery1 += ',' + $(selected).text();

//            });
//            if (!isAnySelected1) {
//                $("#liFiltersStatus").empty();
//                customQuery1 = "";
//            }
//            if (isContainingAll1) {
//                $("#liFiltersStatus").empty();
//                customQuery1 = "";
//            }

//            var customQuery2 = "";
//            var isContainingAll2 = false;
//            var isAnySelected2 = false;
//            $('#filterRequestType :selected').each(function (i, selected) {
//                isAnySelected2 = true;
//                if ($(selected).text() == "All")
//                    isContainingAll2 = true;
//                $('#liFiltersType').append('<span><small>' + $(selected).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
//                customQuery2 += ';' + "RequestType:" + $(selected).text();
//            });
//            if (!isAnySelected2) {
//                customQuery2 = "";
//            }
//            if (isContainingAll2) {
//                $("#liFiltersType").empty();
//                customQuery2 = "";
//            }

//            newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests?searchkeyword=' + encodeURIComponent($("#txtSearchBox").val()) + '&customquery=' + customQuery1 + customQuery2 + sortby + "&otherquery=" + customQuery2 + "&viewName=" + qvName;

//        } else if (qvName == 'Pending') {
//            var customQuery1 = "RequestType:";
//            var isContainingAll1 = false;
//            var isAnySelected1 = false;
//            $('#filterRequestType :selected').each(function (i, selected) {
//                isAnySelected1 = true;
//                if ($(selected).text() == "All")
//                    isContainingAll1 = true;
//                $('#liFiltersType').append('<span><small>' + $(selected).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
//                customQuery1 += ',' + encodeURIComponent($(selected).text());
//            });
//            if (!isAnySelected1) {
//                customQuery1 = "";
//            }
//            if (isContainingAll1) {
//                $("#liFiltersType").empty();
//                customQuery1 = "";
//            }

//            var customQuery2 = ";Status:";
//            var isContainingAll2 = false;
//            var isAnySelected2 = false;
//            $('#filterStatus :selected').each(function (i, selected) {
//                isAnySelected2 = true;
//                if ($(selected).text() == "All")
//                    isContainingAll2 = true;
//                $('#liFiltersStatus').append('<span><small>' + $(selected).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
//                customQuery2 += ',' + $(selected).text();
//            });
//            if (!isAnySelected2) {
//                customQuery2 = "";
//            }
//            if (isContainingAll2) {
//                $("#liFiltersStatus").empty();
//                customQuery2 = "";
//            }

//            newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests?searchkeyword=' + encodeURIComponent($("#txtSearchBox").val()) + '&customquery=' + customQuery1 + customQuery2 + sortby + "&otherquery=" + customQuery2 + "&viewName=" + qvName;
//        }
//        else if ((qvName == 'Past Requests') || (qvName == 'Submitted') || (qvName == 'All Requests') || (qvName == "") || (qvName == 'Assigned')) {

//            var customQuery1 = "Status:";
//            var isContainingAll1 = false;
//            var isAnySelected1 = false;
//            $('#filterStatus :selected').each(function (i, selected) {
//                isAnySelected1 = true;
//                if ($(selected).text() == "All")
//                    isContainingAll1 = true;
//                $('#liFiltersStatus').append('<span><small>' + $(selected).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
//                if ($(selected).text() == "Not Available")
//                    customQuery1 += ',undefined';
//                else
//                    customQuery1 += ',' + $(selected).text();

//            });
//            if (!isAnySelected1) {
//                customQuery1 = "";
//            }
//            if (isContainingAll1) {
//                $("#liFiltersStatus").empty();
//                customQuery1 = "";
//            }

//            var customQuery2 = ";RequestType:";
//            var isContainingAll2 = false;
//            var isAnySelected2 = false;
//            $('#filterRequestType :selected').each(function (i, selected) {
//                isAnySelected2 = true;
//                if ($(selected).text() == "All")
//                    isContainingAll2 = true;
//                $('#liFiltersType').append('<span><small>' + $(selected).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');

//                customQuery2 += ',' + encodeURIComponent($(selected).text());
//            });

//            if (!isAnySelected2) {
//                customQuery2 = "";
//            }
//            if (isContainingAll2) {
//                $("#liFiltersType").empty();
//                customQuery2 = "";
//            }
//            if (customQuery1 == "") {
//                if (qvName == 'Past Requests') {
//                    customQuery1 = "Status:Replaced,Expired,Cancelled,Completed,Terminated,Archived,";
//                } else if (qvName == 'Active') {
//                    customQuery1 = "Status:Active,Up for Renewal,Renewed,Extended,About to Expire,";
//                }
//            }
//            newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests?searchkeyword=' + encodeURIComponent($("#txtSearchBox").val()) + '&customquery=' + customQuery1 + customQuery2 + sortby + "&otherquery=" + customQuery2 + "&viewName=" + qvName;

//        } else if (qvName == 'In Recycle Bin') {
//            newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests?searchkeyword=' + encodeURIComponent($("#txtSearchBox").val()) + '&customquery=InRecycleBin:Yes' + sortby + '&otherquery=&viewName=' + qvName;
//        } else if (qvName == 'Draft') {
//            newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests?searchkeyword=' + encodeURIComponent($("#txtSearchBox").val()) + '&customquery=' + sortby + "&otherquery=&viewName=" + qvName;
//        }


//        if (isContainingAll1 && isContainingAll2) {
//            $("#showAll").css('display', 'inline');
//        }

//        if (!isAnySelected1 && !isAnySelected2) {
//            document.getElementById('btnAddViewRequest').style.display = 'none';
//        }
//        if ((!isAnySelected1 || isContainingAll1) && (!isAnySelected2 || isContainingAll2)) {
//            document.getElementById('btnAddViewRequest').style.display = 'none';
//        }
//        $("#listContracts").empty();

//        var baname = ";";
//        if (thisBusinessAreaName == "" || thisBusinessAreaName == "All") {
//        } else {
//            baname = thisBusinessAreaName;
//        }
//        var baloc = "";
//        if (typeof localStorage.GlobalBusinessAreaLocation != 'undefined' && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
//            baloc = localStorage.GlobalBusinessAreaLocation;
//        }
//        $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
//        $.ajax({
//            url: newurl,
//            type: 'GET',
//            dataType: 'json',
//            'Content-Type': 'application/json',
//            cache: false,
//            headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessArea: baname, BusinessAreaLocation: baloc },
//            success: function (data) {
//                $("#compact-pagination").css('display', '');
//                $('#listContracts').empty();
//                GetData(data);

//            },
//            error:
//                function (data) {
//                    $("#listContracts").empty();
//                    $("#listContracts").append("<p class='f_p-error'>No items found.</p>");
//                    $("#compact-pagination").css('display', 'none');
//                    $("#divChkSelectAll").css('display', 'none');
//                }
//        });

//        $("#dvfilter").hide();

//    }

//}


function liRemoveMyRequests(obj) {
    if ($(obj.parentNode.parentNode).attr('id') == 'liFiltersSearchText') {
        $(obj.parentNode.parentNode).empty();
        $('#txtSearchBox').val('');
    }
    else {
        var child = obj.parentNode;
        var firstChild = child.firstChild;
        var find = " ";
        var re = new RegExp(find, 'g');
        $("#filterRequestType").find('option:contains(' + firstChild.nodeValue.replace(re, '') + ')').prop("selected", false);
        $("#filterStatus").find('option:contains(' + firstChild.nodeValue.replace(re, '') + ')').prop("selected", false);

        child.parentNode.removeChild(child);
    }
    var hasItem1 = false;
    var hasItem2 = false;
    $('#filterRequestType :selected').each(function (i, selected) {
        hasItem1 = true;
    });
    if ($("#filterRequestType").find('option:selected').text() == "All") {
        hasItem1 = false;
    }
    $('#filterStatus :selected').each(function (i, selected) {
        hasItem2 = true;
    });
    if ($("#filterStatus").find('option:selected').text() == "All") {
        hasItem2 = false;
    }
    $('#liFiltersType').empty();
    $('#liFiltersStatus').empty();
    if (!hasItem1 && !hasItem2) {
        GetMyRequests();
        displayshowall("My Requests");
        $("#btnAddViewRequest").css('display', 'none');
    } else {
        applyFilter();
    }
}

function liRemovePending(obj) {
    if ($(obj.parentNode.parentNode).attr('id') == 'liFiltersSearchText') {
        $(obj.parentNode.parentNode).empty();
        $('#txtSearchBox').val('');
    }
    else {
        var child = obj.parentNode;
        var firstChild = child.firstChild;

        var find = " ";
        var re = new RegExp(find, 'g');

        $("#filterRequestType").find('option:contains(' + firstChild.nodeValue.replace(re, '') + ')').prop("selected", false);
        $("#filterStatus").find('option:contains(' + firstChild.nodeValue.replace(re, '') + ')').prop("selected", false);

        child.parentNode.removeChild(child);
    }
    var hasItem1 = false;

    $('#filterRequestType :selected').each(function (i, selected) {
        hasItem1 = true;
    });
    var hasItem2 = false;

    $('#filterStatus :selected').each(function (i, selected) {
        hasItem2 = true;
    });
    $('#liFiltersType').empty();
    $('#liFiltersStatus').empty();
    if (!hasItem1 && !hasItem2) {
        GetPendingRequests();
        displayshowall("Pending");
        $("#btnAddViewRequest").css('display', 'none');
    } else {
        applyFilter();
    }
}



var selectedSortOption = $('#conSortByOptions').find(":selected").text();
//function highlight(obj) {

//    $('#tdSort a').each(function (i, item) {
//        item.style.backgroundColor = "";
//    });
//    obj.style.backgroundColor = "#cccccc";
//    selectedSortOption = obj.textContent;
//    $("#txtSortBy").val(obj.textContent)
//}

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
    $("#addEditPeopleMultiple").height("auto");
}

function BindMultipleStatus() {
    var ctrl = '<li id="New">';
    ctrl += '<input id="rdstatusNewMul" type="radio" onclick="javascript:statusclick(this);" name="rdstatusMul" value="New" class="css-checkbox" />';
    ctrl += '<label for="rdstatusNewMul" class="css-label"><b title="New" class="status_green_another requests_Index_status_b"><img src="../Content/Images/status/new.png">new</b>New</label>';
    ctrl += '</li>';
    ctrl += '<li id="Awaiting Approval">';
    ctrl += '<input id="rdstatusAwtApprMul" type="radio" onclick="javascript:statusclick(this);" name="rdstatusMul" value="Awaiting Approval" class="css-checkbox" />';
    ctrl += '<label for="rdstatusAwtApprMul" class="css-label"><b title="Awaiting Approval" class="status_yellow requests_Index_status_b"><img src="../Content/Images/status/renew.png">appr</b>Awaiting Approval</label>';
    ctrl += '</li>';
    ctrl += '<li id="Approved">';
    ctrl += '<input id="rdstatusApprMul" type="radio" onclick="javascript:statusclick(this);" name="rdstatusMul" value="Approved" class="css-checkbox" />';
    ctrl += '   <label for="rdstatusApprMul" class="css-label"><b title="Approved" class="status_blue requests_Index_status_b"><img src="../Content/Images/status/tick.png">appr</b>Approved</label>';
    ctrl += '</li>';
    ctrl += '<li id="Completed">';
    ctrl += '<input id="rdstatusCompMul" type="radio" onclick="javascript:statusclick(this);" name="rdstatusMul" value="Completed" class="css-checkbox" />';
    ctrl += '<label for="rdstatusCompMul" class="css-label"><b class="status_blue requests_Index_status_b"><img src="../Content/Images/status/tick.png"> Comp</b>Completed</label>';
    ctrl += '</li>';
    ctrl += '<li id="On Hold">';
    ctrl += '<input id="rdstatusHoldMul" type="radio" onclick="javascript:statusclick(this);" name="rdstatusMul" value="On Hold" class="css-checkbox" />';
    ctrl += '<label for="rdstatusHoldMul" class="css-label"><b title="On Hold" class="status_red requests_Index_status_b"><img src="../Content/Images/status/exp.png">hold</b>On Hold</label>';
    ctrl += '</li>';
    ctrl += '<li id="Cancelled">';
    ctrl += '<input id="rdstatusCancMul" type="radio" onclick="javascript:statusclick(this);" name="rdstatusMul" value="Cancelled" class="css-checkbox" />';
    ctrl += '<label for="rdstatusCancMul" class="css-label"><b title="Cancelled" class="status_Gray requests_Index_status_b"><img src="../Content/Images/status/close.png">canc</b>Cancelled</label>';
    ctrl += '</li>';
    ctrl += '<div class="f_list" style="padding: 0px 0px 0px 10px;display:none;" id="dvCancelCtrlMul">';
    ctrl += '<textarea id="txtCancelledReasonMul" placeholder="Reason for Cancellation" rows="3" class="f_text-box width90" />';
    ctrl += '</div>';

    $("#menuSMultiple").empty();
    $("#menuSMultiple").append(ctrl);
    $("#loadingPage").fadeOut();
    $('#addEditStatusMultiple').dialog('open');
    $('input:radio[name="rdstatusMul"][value="' + $("#hdContractStatus").val() + '"]').prop('checked', true);

}



function quickViewDisplay(obj) {
    $("#liFiltersforQuickViews").css('display', '');
    $("#txtSearchBox").val("");
    $("#txtSearchBox").attr("placeholder", "Search in '" + obj.innerText + "'");
    $(".hhide").hide();
    $(".drop_a").hide();
    colorLink('liRequestViews a', false);
    colorLink('spnAllRequests', false);
    colorLink('liQuickView span', false);
    colorLink('liRequestViews span', false);
    colorLink('liQuickView a', false);
    colorLink(obj.id, true);
    savedViewNameFromViewTable = "";
    selectedSortOption = "";
    clearFilterSelection();
    $('#tdSort a').each(function (i, item) {
        item.style.backgroundColor = "";
    });
    $("#liFiltersQuickView").empty();
    $('#liFiltersQuickView').html('<span>Showing search result for : <small>' + obj.name + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');

    $('#liFiltersQuickView').css('display', 'none');
    $("#btnAddViewRequest").css('display', 'none');
    $("#filterRequestType option[value='All']").prop("selected", true);
    $("#aRecently").css("background-color", "#cccccc");
    $(".my-Alerts_Act1").css('display', '');
    ObjectNameToSend = obj.name;
    if (obj.name == "All") {
        colorLink('spnAllRequests', true);
        colorLink('spnDraft', false);
        colorLink('spnPending', false);
        colorLink('spnUnassigned', false);
        colorLink('spnDelayed', false);
        colorLink('spnSubmittedMyRequests', false);
        colorLink('spnASSigned', false);
        colorLink('spnCompletedRequests', false);
        colorLink('spnCancelledRequests', false);
        colorLink('spnInRecycleBin', false);
        $("#btnFilter").css('display', 'inline');
        $("#dvSrhBox").css('display', '');
        $("#filteroptiontype").css('display', '');
        $("#filteroptiondates").css('display', 'none');
        $("#filteroptionstatus").css('display', '');
        $("#filteroption1").css('display', 'none');
        $("#filteroptionrenewdates").css('display', 'none');
        $("#txtSearchBox").val("");
        BindContractStatusFilter(obj.name);
    } else if (obj.name == "Draft") { //My Saved Draft
        colorLink('spnAllRequests', false);
        colorLink('spnDraft', true);
        colorLink('spnPending', false);
        colorLink('spnUnassigned', false);
        colorLink('spnDelayed', false);
        colorLink('spnSubmittedMyRequests', false);
        colorLink('spnASSigned', false);
        colorLink('spnCompletedRequests', false);
        colorLink('spnCancelledRequests', false);
        colorLink('spnInRecycleBin', false);
        $("#btnFilter").css('display', 'none');
        $("#dvSrhBox").css('display', '');
    }
    else if (obj.name == "Pending") {
        colorLink('spnAllRequests', false);
        colorLink('spnDraft', false);
        colorLink('spnPending', true);
        colorLink('spnUnassigned', false);
        colorLink('spnDelayed', false);
        colorLink('spnSubmittedMyRequests', false);
        colorLink('spnASSigned', false);
        colorLink('spnCompletedRequests', false);
        colorLink('spnCancelledRequests', false);
        colorLink('spnInRecycleBin', false);
        BindContractStatusFilter(obj.name);
        $("#dvSrhBox").css('display', '');
        $("#filteroptiontype").css('display', '');
        $("#filteroptiondates").css('display', 'none');
        $("#filteroptionstatus").css('display', '');
        $("#filteroption1").css('display', 'none');
        $("#filteroptionrenewdates").css('display', 'none');
        $("#btnFilter").css('display', 'inline');
        $("#txtSearchBox").val("");
    }
    else if (obj.name == "Unassigned") {
        colorLink('spnAllRequests', false);
        colorLink('spnDraft', false);
        colorLink('spnPending', false);
        colorLink('spnUnassigned', true);
        colorLink('spnDelayed', false);
        colorLink('spnSubmittedMyRequests', false);
        colorLink('spnASSigned', false);
        colorLink('spnCompletedRequests', false);
        colorLink('spnCancelledRequests', false);
        colorLink('spnInRecycleBin', false);
        BindContractStatusFilter(obj.name);
        $("#filteroptiontype").css('display', '');
        $("#filteroptiondates").css('display', 'none');
        $("#filteroptionstatus").css('display', '');
        $("#filteroption1").css('display', 'none');
        $("#filteroptionrenewdates").css('display', 'none');
        $("#btnFilter").css('display', 'inline');
        $("#dvSrhBox").css('display', '');
        $("#txtSearchBox").val("");
    }
    else if (obj.name == "Delayed") {
        colorLink('spnAllRequests', false);
        colorLink('spnDraft', false);
        colorLink('spnPending', false);
        colorLink('spnUnassigned', false);
        colorLink('spnDelayed', true);
        colorLink('spnSubmittedMyRequests', false);
        colorLink('spnASSigned', false);
        colorLink('spnCompletedRequests', false);
        colorLink('spnCancelledRequests', false);
        colorLink('spnInRecycleBin', false);
        BindContractStatusFilter(obj.name);
        $("#filteroptiontype").css('display', '');
        $("#filteroption1").css('display', 'none');
        $("#txtSearchBox").val("");
        $("#dvSrhBox").css('display', '');
        $("#btnFilter").css('display', 'inline');
    }
    else if (obj.name == "Submitted") {
        colorLink('spnAllRequests', false);
        colorLink('spnDraft', false);
        colorLink('spnPending', false);
        colorLink('spnUnassigned', false);
        colorLink('spnDelayed', false);
        colorLink('spnSubmittedMyRequests', true);
        colorLink('spnASSigned', false);
        colorLink('spnCompletedRequests', false);
        colorLink('spnCancelledRequests', false);
        colorLink('spnInRecycleBin', false);
        BindContractStatusFilter(obj.name);
        $("#filteroptiontype").css('display', '');
        $("#filteroption1").css('display', 'none'); //eO310568
        $("#txtSearchBox").val("");
        $("#dvSrhBox").css('display', '');
        $("#btnFilter").css('display', 'inline');
    }
    else if (obj.name == "Assigned") {
        colorLink('spnAllRequests', false);
        colorLink('spnDraft', false);
        colorLink('spnPending', false);
        colorLink('spnUnassigned', false);
        colorLink('spnDelayed', false);
        colorLink('spnSubmittedMyRequests', false);
        colorLink('spnASSigned', true);
        colorLink('spnCompletedRequests', false);
        colorLink('spnCancelledRequests', false);
        colorLink('spnInRecycleBin', false);
        BindContractStatusFilter(obj.name);
        $("#filteroptiontype").css('display', '');
        $("#filteroption1").css('display', 'none');
        $("#txtSearchBox").val("");
        $("#dvSrhBox").css('display', '');
        $("#btnFilter").css('display', 'inline');
    }
    else if (obj.name == "Completed") {
        colorLink('spnAllRequests', false);
        colorLink('spnDraft', false);
        colorLink('spnPending', false);
        colorLink('spnUnassigned', false);
        colorLink('spnDelayed', false);
        colorLink('spnSubmittedMyRequests', false);
        colorLink('spnASSigned', false);
        colorLink('spnCompletedRequests', true);
        colorLink('spnCancelledRequests', false);
        colorLink('spnInRecycleBin', false);
        BindContractStatusFilter(obj.name);
        $("#filteroptiontype").css('display', '');
        $("#filteroption1").css('display', 'none');
        $("#txtSearchBox").val("");
        $("#dvSrhBox").css('display', '');
        $("#btnFilter").css('display', 'inline');
    }
    else if (obj.name == "Cancelled") {
        colorLink('spnAllRequests', false);
        colorLink('spnDraft', false);
        colorLink('spnPending', false);
        colorLink('spnUnassigned', false);
        colorLink('spnDelayed', false);
        colorLink('spnSubmittedMyRequests', false);
        colorLink('spnASSigned', false);
        colorLink('spnCompletedRequests', false);
        colorLink('spnCancelledRequests', true);
        colorLink('spnInRecycleBin', false);
        BindContractStatusFilter(obj.name);
        $("#filteroptiontype").css('display', '');
        $("#filteroption1").css('display', 'none');
        $("#txtSearchBox").val("");
        $("#dvSrhBox").css('display', '');
        $("#btnFilter").css('display', 'inline');
    }
    else if (obj.name == "In Recycle Bin") {
        colorLink('spnAllRequests', false);
        colorLink('spnDraft', false);
        colorLink('spnPending', false);
        colorLink('spnUnassigned', false);
        colorLink('spnDelayed', false);
        colorLink('spnSubmittedMyRequests', false);
        colorLink('spnASSigned', false);
        colorLink('spnCompletedRequests', false);
        colorLink('spnCancelledRequests', false);
        colorLink('spnInRecycleBin', true);
        $("#divChkSelectAll").css('display', 'none');
        $("#btnFilter").css('display', 'none');
        $("#dvSrhBox").css('display', '');
        $("#txtSearchBox").val("");
    }

    applyFilter();
    $("#btnAddView").css('display', 'none');

    $("#showAll").css('display', 'inline');
    $("#showAll").html('Showing ' + obj.name + ' Records<img title="Remove" name="' + obj.name + '" onclick="javascript:GetAllContracts(this);" style="margin-left: 5px; margin-right: 10px; cursor:pointer;" src="../Content/Images/icon/close.png" />');
}


function GetMyRequests() {
    $("#spResult").empty();
    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = encodeURIComponent(localStorage.GlobalBusinessAreaLocation);
    }

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/myrequests?noOfItem=0',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessAreaLocation: localStorage.GlobalBusinessAreaLocation },
        success: function (data) {
            $("#compact-pagination").css('display', '');
            $('#listContracts').empty();
            GetData(data);

        },
        error:
            function (data) {
                $('#listContracts').empty();
                $("#listContracts").append("<p class='f_p-error'>No items found.</p>");
                $("#compact-pagination").css('display', 'none');
            }
    });
}


function GeRequestsSavedAsDraft() {
    $("#spResult").empty();
    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');

    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = encodeURIComponent(localStorage.GlobalBusinessAreaLocation);
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
        },
        error:
            function (data) {
                $('#listContracts').empty();
                $("#listContracts").append("<p class='f_p-error'>No items found.</p>");
                $("#compact-pagination").css('display', 'none');
            }
    });
}


function GetSubmittedMyRequests() {
    $("#spResult").empty();
    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');

    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = encodeURIComponent(localStorage.GlobalBusinessAreaLocation);
    }


    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/submitted',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessAreaLocation: localStorage.GlobalBusinessAreaLocation },
        success: function (data) {
            $("#compact-pagination").css('display', '');
            $('#listContracts').empty();
            GetData(data);

        },
        error:
            function (data) {
                $('#listContracts').empty();
                $("#listContracts").append("<p class='f_p-error'>No items found.</p>");
                $("#compact-pagination").css('display', 'none');
            }
    });
}


function GetAssignedRequests() {
    $("#spResult").empty();
    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');

    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = encodeURIComponent(localStorage.GlobalBusinessAreaLocation);
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

        },
        error:
            function (data) {
                $('#listContracts').empty();
                $("#listContracts").append("<p class='f_p-error'>No items found.</p>");
                $("#compact-pagination").css('display', 'none');
            }
    });
}


function GetPendingRequests() {
    $("#spResult").empty();
    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = encodeURIComponent(localStorage.GlobalBusinessAreaLocation);
    }

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/pendingrequests',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessAreaLocation: localStorage.GlobalBusinessAreaLocation },
        success: function (data) {
            $("#compact-pagination").css('display', '');
            $('#listContracts').empty();
            GetData(data);

        },
        error:
            function (data) {
                $('#listContracts').empty();
                $("#listContracts").append("<p class='f_p-error'>No items found.</p>");
                $("#compact-pagination").css('display', 'none');
            }
    });
}


function GetPastRequests() {
    $("#spResult").empty();
    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = encodeURIComponent(localStorage.GlobalBusinessAreaLocation);
    }
    var customQuery = "Status:Cancelled,Completed";
    var sortby = '&sortbyfield=Timestamp&orderby=DESC';
    var newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests?searchkeyword=' + encodeURIComponent($("#txtSearchBox").val().trim()) + '&customquery=' + customQuery + sortby;
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

        },
        error:
            function (data) {
                $("#listContracts").empty();
                $("#listContracts").append("<p class='f_p-error'>No items found.</p>");
                $("#compact-pagination").css('display', 'none');
            }
    });
}



function GetRequestsInRecycleBin() {
    $("#spResult").empty();
    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = encodeURIComponent(localStorage.GlobalBusinessAreaLocation);
    }
    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/RequestsInrecyclebin',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessAreaLocation: localStorage.GlobalBusinessAreaLocation },
        success: function (data) {
            $("#compact-pagination").css('display', '');
            $('#listContracts').empty();
            GetData(data);

        },
        error:
            function (data) {
                $('#listContracts').empty();
                $("#listContracts").append("<p class='f_p-error'>No items found.</p>");
                $("#compact-pagination").css('display', 'none');
            }
    });
}



function changestatusmultiple() {
    var selectedValue = decodeURI($("input:radio[name=rdstatusMul]:checked").val());
    if (selectedValue == "undefined" || selectedValue == "0" || selectedValue == "") {

        swal("", "Select Status");
        return false;
    } else {

        changestatusM();
        return true;
    }
}

function changestatusM() {
    $("#loadingPage").fadeIn();
    var stat = decodeURI($("input:radio[name=rdstatusMul]:checked").val());
    var vCancelNote = '';
    if (stat == "Cancelled")
    { vCancelNote = "CancelledReason=" + $("#txtCancelledReasonMul").val(); }
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/changerequeststatus?requestid=' + multipleChecks + '&status=' + stat,
        type: 'PUT',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
        data: vCancelNote,
        cache: false,
        success: function (result) {
            location = "/Pipeline/Requests";
            $('#SelectAll').attr('checked', false);
            $("#btnMultipleAction").css('display', ' ');
        }, error: function () { $("#loadingPage").fadeOut(); }
    });
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
             $("#loadingPage").fadeIn();
             $.ajax({
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/DeleteRequestTemporarily?requestid=' + multipleChecks,
                 type: 'DELETE',
                 dataType: 'json',
                 headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                 cache: false,
                 success: function (data) {
                     location = "/Pipeline/Requests";
                 }, error: function () { $("#loadingPage").fadeOut(); }
             });
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
    //If adhoc workflow is configured in settings
    if (workflowAdHoc) {
        htmlFormatFile += '<select id="ddlOrder' + totalFileCount + '" name="Order' + totalFileCount + '"  class="f_inpt width97"><option selected="selected">Serial</option><option>Parallel</option></select>';
    } else {
        htmlFormatFile += '<select id="ddlOrder' + totalFileCount + '" name="Order' + totalFileCount + '"  class="f_inpt width97" disabled="disabled"><option selected="selected">Serial</option><option>Parallel</option></select>';
    }
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
        $("#loadingPage").fadeIn();
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
        var vTaskRouting = "";
        var nicInstance = nicEditors.findEditor('txtComment');
        var vcommentText = CleanWordFormatFromHTML(nicInstance.getContent());
        var vNoteTextCount = vcommentText.replace(/<\/?[^>]+(>|$)/g, "");
        if (vNoteTextCount.length <= 26500) {
            vcommentText = $('<div/>').text(vcommentText).html();
            if (workflowAdHoc == "on") { vTaskRouting = $("#ddlRule").find('option:selected').text(); }
            if (vTaskRouting != "Default" && vTaskRouting != "Ad-hoc") {
                vTaskRouting = "Conditional";
            }
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
                    "AutoUpdateStatus": vAutoUpdateObjectStatus,
                    "TaskRouting": vTaskRouting
                },
                cache: false,
                success: function (status) {
                    $("#inprocessStartWorkflow").css('display', 'none');
                    $("#dvWorkflow").dialog("close");//ui-dialog-buttonset
                    applyFilter();
                    $("#loadingPage").fadeOut();
                },
                error: function () {
                    $("#loadingPage").fadeOut();
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


function ViewCounterparty() {
    $(".hhide").hide();
    //$('#loadCP').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    CounterpartyFunc();
}

//function CounterpartyFunc() {
//    $("#tblCounterparties").empty();
//    $("#loadingPage").fadeIn();
//    $.ajax({
//        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty',
//        type: 'GET',
//        dataType: 'json',
//        "Content-Type": "application/json",
//        headers: { 'eContracts-ApiKey': localStorage.APIKey },
//        cache: false,
//        success: function (data) {
//            $('#loadCP').empty();
//            var vFound = false;
//            var datalength = data.length;
//            var counterpartyTags = [];
//            myCounterPartyArray = [];
//            var obj1 = {};
//            for (var i = 0; i < data.length; i++) {
//                if (!(data[i].CounterpartyName in obj1)) {
//                    if (data[i].CounterpartyName.trim() != "") {
//                        if (data[i].IsGlobal == "Yes")
//                            myCounterPartyArray.push(data[i]);
//                        else {
//                            if (typeof (data[i].BusinessAreasPath) != "undefined" && data[i].BusinessAreasPath != "") {
//                                var contractarea = "";
//                                var Businesssarea = "";
//                                var splitbusinessPath = data[i].BusinessAreasPath.split(';');
//                                $(splitbusinessPath).each(function (index) {
//                                    if (this != "") {
//                                        var path = this.toString();
//                                        var contBusi = this.split('>');
//                                        if (typeof (contBusi) != "undefined" && contBusi.length > 0) {

//                                            contractarea = contBusi[0].trim();
//                                            Businesssarea = contBusi[contBusi.length - 1].trim();
//                                            if (localStorage.GlobalBusinessArea == Businesssarea && thisContractAreaName == contractarea)
//                                                myCounterPartyArray.push(data[i]);
//                                            else {
//                                                if (localStorage.UserType.indexOf("Global Contract Owner") >= 0) {
//                                                    myCounterPartyArray.push(data[i]);
//                                                }
//                                                else if (typeof (localStorage.BusinessAreaAccess) != "undefined" && localStorage.BusinessAreaAccess != "") {
//                                                    var newArray = localStorage.BusinessAreaAccess.split(',').filter(function (v) { return v !== '' });
//                                                    var found = $.grep(newArray, function (n, ind) {
//                                                        return (n.indexOf(path) == 0);
//                                                    });
//                                                    if (found.length > 0) {
//                                                        myCounterPartyArray.push(data[i]);
//                                                    }
//                                                }
//                                                else if (typeof (BusinessAreaAccessWithRead) != "undefined" && BusinessAreaAccessWithRead != "") {
//                                                    var newArray = [];
//                                                    if (typeof (BusinessAreaAccessWithRead) == "object" && BusinessAreaAccessWithRead.length > 1) {
//                                                        newArray = BusinessAreaAccessWithRead;
//                                                    }
//                                                    else
//                                                        newArray.push(BusinessAreaAccessWithRead);
//                                                    var found = $.grep(newArray, function (n, ind) {
//                                                        return (n.indexOf(path) == 0);
//                                                    });
//                                                    if (found.length > 0) {
//                                                        myCounterPartyArray.push(data[i]);
//                                                    }
//                                                }
//                                            }
//                                        }

//                                    }
//                                })

//                            }
//                        }
//                    }
//                }
//                obj1[data[i].CounterpartyName] = true;
//            }
//            //var datalength = myCounterPartyArray.length;
//            var resultfound = true;
//            var myArraylength = myCounterPartyArray.length;
//            CreateCounterPartyListUnit(0);
//            var vCount = myArraylength;
//            var columncounterparty = [];
//            for (var ci = 0; ci < myCounterPartyArray.length; ci++) {
//                columncounterparty.push(myCounterPartyArray[ci].CounterpartyName);
//            }
//            //for (var i = 0; i < datalength; i++) {
//            //    var item = myCounterPartyArray[i];
//            //    var article = '';
//            //    if (i == 0) {
//            //        //Vinod
//            //        article += '<tr><th style="width:35%;"><input id="selectallCounterParty" onclick="funselectallCounterParty(this);" type="checkbox"/> Select/Deselect All</th><th style="width:20%;">Counterparty Type</th><th>Global or Regional</th></tr>';
//            //        //article += '<tr><th style="width:35%;">Counterparty Name</th><th style="width:20%;">Counterparty Type</th><th>Global or Regional</th></tr>';
//            //    }
//            //    article += '<tr><td>';
//            //    article += '<input id="CP' + item.RowKey + '" type="checkbox" name="Counterparty" class="css1-checkbox" value="' + escape(item.CounterpartyName) + '" />';

//            //    article += '<label for="CP' + item.RowKey + '" class="css1-label"  style="display: inline;">' + item.CounterpartyName + '</label>';
//            //    article += '</td><td>' + item.CounterpartyType + '';
//            //    article += '</td>';
//            //    article += '<td>' + (item.IsGlobal == "Yes" ? "Global" : item.BusinessAreas) + '';
//            //    article += '</td></tr>';
//            //    counterpartyTags.push(item.CounterpartyName);
//            //    $("#tblCounterparties").append(article);

//            //}


//            $("#txtSearchBoxCP").autocomplete({
//                source: counterpartyTags,
//                minLength: 1,
//                focus: function (event, ui) {
//                    return false;
//                },
//                select: function (evn, uidetails) {
//                    $("#txtSearchBoxCP").val(uidetails.item.label);
//                    SearchCounterparty();
//                }
//            });

//            var vCount = $("#tblCounterparties tr").length;
//            $('#compact-paginationCounterparties').pagination({
//                items: vCount,
//                itemsOnPage: 10,
//                typeID: 'tblCounterparties',
//                cssStyle: 'compact-theme'

//            });
//            $("#loadingPage").fadeOut();
//            $("#spCounterpartiesUnselect").css("display", "");
//            $("#browseCounterparty").dialog("option", "title", "Counterparty Picker");
//            $("#browseCounterparty").dialog("open");

//        },
//        error: function () {
//            $('#loadCP').empty();
//            $('#loadCP').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
//            $("#spCounterpartiesUnselect").css("display", "none");
//        }
//    });
//}

function CounterpartyFunc() {
    $("#loadingPage").fadeIn();
    $("#tblCounterparties").empty();
    $("#liSelectedCounterParty").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/counterpartypicker',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            CounterPartyArrayprev = [];
            //$.each($('#Counterparty').val().split(";"), function () {
            //    //  CounterPartyArrayprev.push($.trim(this));
            //    if (multipleChecksDocumentID.indexOf($.trim(this)) == -1)
            //        multipleChecksDocumentID.push($.trim(this));
            //});
            myCounterPartyArray = [];
            var obj1 = {};
            for (var i = 0; i < data.length; i++) {
                if (!(data[i].CounterpartyName in obj1)) {
                    if (data[i].CounterpartyName.trim() != "") {
                        if (data[i].IsGlobal == "Yes")
                            myCounterPartyArray.push(data[i]);
                        else {
                            if (typeof (data[i].BusinessAreasPath) != "undefined" && data[i].BusinessAreasPath != "") {
                                var contractarea = "";
                                var Businesssarea = "";
                                var splitbusinessPath = data[i].BusinessAreasPath.split(';');
                                $(splitbusinessPath).each(function (index) {
                                    if (this != "") {
                                        var path = this.toString();
                                        var contBusi = this.split('>');
                                        if (typeof (contBusi) != "undefined") {
                                            if (contBusi.length > 0) {
                                                contractarea = contBusi[0].trim();
                                                Businesssarea = contBusi[contBusi.length - 1].trim();
                                                if (localStorage.GlobalBusinessArea == Businesssarea && thisContractAreaName == contractarea)
                                                    myCounterPartyArray.push(data[i]);
                                                else {
                                                    if (localStorage.UserType.indexOf("Global Contract Owner") >= 0) {
                                                        myCounterPartyArray.push(data[i]);
                                                    }
                                                    else if (typeof (localStorage.BusinessAreaAccess) != "undefined" && localStorage.BusinessAreaAccess != "") {
                                                        var newArray = localStorage.BusinessAreaAccess.split(',').filter(function (v) { return v !== '' });
                                                        var found = $.grep(newArray, function (n, ind) {
                                                            return (n.indexOf(path) == 0);
                                                        });
                                                        if (found.length > 0) {
                                                            myCounterPartyArray.push(data[i]);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                })

                            }
                        }
                    }
                }
                obj1[data[i].CounterpartyName] = true;
            }
            var resultfound = true;
            var myArraylength = myCounterPartyArray.length;
            CreateCounterPartyListUnit(0);
            var vCount = myArraylength;
            var columncounterparty = [];
            for (var ci = 0; ci < myCounterPartyArray.length; ci++) {
                columncounterparty.push(myCounterPartyArray[ci].CounterpartyName.trim());
            }
            $("#txtSearchBox").autocomplete({
                source: columncounterparty,
                minLength: 1,
                focus: function (event, ui) {
                    return false;
                },
                select: function (evn, uidetails) {
                    $("#txtSearchBox").val(uidetails.item.label);
                    applyFilter();
                }
            });

            $('#compact-paginationCounterparties').pagination({
                items: vCount,
                itemsOnPage: 10,
                typeID: 'tblCounterparties',
                cssStyle: 'compact-theme',
                listname: 'CounterPartyListUnit'
            });
            $("#selectallCounterParty").prop('checked', false);

            $('input:checkbox[name=Counterparty]').prop('checked', false);
            $("#txtSearchBoxCP").val('');
            $("#liSelectedCounterParty").empty();
            $("#loadingPage").fadeOut();
            $("#browseCounterparty").dialog("option", "title", "Counterparty Picker");
            $("#browseCounterparty").dialog("open");
        },
        error: function () {
            $('#loadCP').empty();
            $('#loadCP').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
        }
    });
}

//Vinod
function CreateCounterPartyListUnit(page) {
    $("#tblCounterparties").css("display", "");
    var startIndex = page * 10;
    var endIndex = startIndex + 10;
    $('#tblCounterparties').empty();
    if (endIndex > myCounterPartyArray.length) endIndex = myCounterPartyArray.length;
    $("#spResult").html((startIndex + 1) + '&nbsp;to&nbsp;' + endIndex + '&nbsp;of&nbsp;' + myCounterPartyArray.length);
    var resultfound = false;
    var checkboxchecking = true;
    if (startIndex == endIndex) {
        var art = "No items found.";
        $("#tblCounterparties").append(art);
        checkboxchecking = false;
        $('#loadGenCounterParty').empty();
    }
    else {
        //var spltarrprevRUstr = CounterPartyArrayprev.toString();
        //if (spltarrprevRUstr.indexOf(";") > -1) {
        //    var spltarrprevRU = spltarrprevRUstr.split(';');
        //    CounterPartyArrayprev = [];
        //    for (var arrli = 0; arrli < spltarrprevRU.length; arrli++) {
        //        if (spltarrprevRU[arrli].trim() != "") {
        //            CounterPartyArrayprev.push(spltarrprevRU[arrli].trim());
        //        }
        //    }
        //}
        for (var i = startIndex; i < endIndex; i++) {
            var article = "";
            if (i == startIndex) {
                article += '<tr><th style="width:35%;"><input id="selectallCounterParty" onclick="funselectallCounterParty(this);" type="checkbox"/> Select/Deselect All</th><th style="width:20%;">Counterparty Type</th><th>Global or Regional</th></tr>';
            }

            article += '<tr><td>';
            // if (CounterPartyArrayprev != null && multipleChecksDocumentID.length > 0) {
            //     if (CounterPartyArrayprev.indexOf(myCounterPartyArray[i].CounterpartyName.trim()) >= 0 && multipleChecksDocumentID.indexOf(myCounterPartyArray[i].CounterpartyName.trim()) > -1) {
            //         article += '<input id="CP' + myCounterPartyArray[i].RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);" checked class="css1-checkbox" value="' + myCounterPartyArray[i].CounterpartyName.trim() + '" />';
            //    }
            if (multipleChecksDocumentID.length > 0) {
                if (multipleChecksDocumentID.indexOf(myCounterPartyArray[i].CounterpartyName.trim()) > -1) {
                    article += '<input id="' + myCounterPartyArray[i].RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);" checked class="css1-checkbox" value="' + escape(myCounterPartyArray[i].CounterpartyName.trim()) + '" />';
                }
                else {
                    article += '<input id="' + myCounterPartyArray[i].RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);"  class="css1-checkbox" value="' + escape(myCounterPartyArray[i].CounterpartyName.trim()) + '" />';
                    checkboxchecking = false;
                }
            }
                //else if (CounterPartyArrayprev.indexOf(myCounterPartyArray[i].CounterpartyName.trim()) >= 0 && multipleChecksDocumentID.length == 0) {
                //    article += '<input id="' + myCounterPartyArray[i].RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);" checked class="css1-checkbox" value="' + myCounterPartyArray[i].CounterpartyName.trim() + '" />';
                //}
                //else if (multipleChecksDocumentID.indexOf(myCounterPartyArray[i].CounterpartyName.trim()) > -1) {
                //    article += '<input id="' + myCounterPartyArray[i].RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);" checked class="css1-checkbox" value="' + myCounterPartyArray[i].CounterpartyName.trim() + '" />';
                //}
            else {
                article += '<input id="' + myCounterPartyArray[i].RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);"  class="css1-checkbox" value="' + escape(myCounterPartyArray[i].CounterpartyName.trim()) + '" />';
                checkboxchecking = false;
            }
            article += '<label for="CP' + myCounterPartyArray[i].RowKey + '" class="css1-label">' + myCounterPartyArray[i].CounterpartyName.trim() + '</label></td>';
            article += '<td>' + myCounterPartyArray[i].CounterpartyType + '';
            article += '</td>';
            article += '<td>' + (myCounterPartyArray[i].IsGlobal == "Yes" ? "Global" : myCounterPartyArray[i].BusinessAreas) + '';
            article += '</td></tr>';
            $("#tblCounterparties").append(article);
            $('#loading').empty();
            resultfound = true;
        }
    }
}


//Vinod
function funselectallCounterParty(obj) {
    if (obj.checked) { // check select status  
        $('input:checkbox[name=Counterparty]').prop('checked', true);
        //checkMultipleDocumentsCounterParty("");
    } else {
        $('input:checkbox[name=Counterparty]').prop('checked', false);

        //checkMultipleDocumentsCounterParty("");
    }
}


function SearchCounterparty() {

    $("#liSelectedCounterParty").empty();
    //  multipleChecksDocumentID = [];
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/counterpartypicker?searchkeyword=' + encodeURIComponent($("#txtSearchBoxCP").val()) + '&customquery=&sortbyfield=CounterpartyName&orderby=ASC',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            $("#tblCounterparties").empty();
            myCounterPartyArray = [];
            var obj1 = {};
            for (var i = 0; i < data.length; i++) {
                if (!(data[i].CounterpartyName in obj1)) {
                    if (data[i].CounterpartyName.trim() != "") {
                        if (data[i].IsGlobal == "Yes")
                            myCounterPartyArray.push(data[i]);
                        else {
                            if (typeof (data[i].BusinessAreasPath) != "undefined" && data[i].BusinessAreasPath != "") {
                                var contractarea = "";
                                var Businesssarea = "";
                                var splitbusinessPath = data[i].BusinessAreasPath.split(';');
                                $(splitbusinessPath).each(function (index) {
                                    if (this != "") {
                                        var path = this.toString();
                                        var contBusi = this.split('>');
                                        if (typeof (contBusi) != "undefined") {
                                            if (contBusi.length > 0) {
                                                contractarea = contBusi[0].trim();
                                                Businesssarea = contBusi[contBusi.length - 1].trim();
                                                if (localStorage.GlobalBusinessArea == Businesssarea && thisContractAreaName == contractarea)
                                                    myCounterPartyArray.push(data[i]);
                                                else {
                                                    if (localStorage.UserType.indexOf("Global Contract Owner") >= 0) {
                                                        myCounterPartyArray.push(data[i]);
                                                    }
                                                    else if (typeof (localStorage.BusinessAreaAccess) != "undefined" && localStorage.BusinessAreaAccess != "") {
                                                        var newArray = localStorage.BusinessAreaAccess.split(',').filter(function (v) { return v !== '' });
                                                        var found = $.grep(newArray, function (n, ind) {
                                                            return (n.indexOf(path) == 0);
                                                        });
                                                        if (found.length > 0) {
                                                            myCounterPartyArray.push(data[i]);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                })

                            }
                        }
                    }
                }
                obj1[data[i].CounterpartyName] = true;
            }
            var resultfound = true;
            var myArraylength = myCounterPartyArray.length;
            CreateCounterPartyListUnit(0);
            var vCount = myArraylength;
            var columncounterparty = [];
            for (var ci = 0; ci < myCounterPartyArray.length; ci++) {
                columncounterparty.push(myCounterPartyArray[ci].CounterpartyName);
            }
            $("#txtSearchBoxCP").autocomplete({
                source: columncounterparty,
                minLength: 1,
                focus: function (event, ui) {
                    return false;
                },
                select: function (evn, uidetails) {
                    $("#txtSearchBoxCP").val(uidetails.item.label);
                    SearchCounterparty();
                }
            });
            $('#compact-paginationCounterparties').pagination({
                items: vCount,
                itemsOnPage: 10,
                typeID: 'tblCounterparties',
                cssStyle: 'compact-theme',
                listname: 'CounterPartyListUnit'
            });
            $("#loadingPage").fadeOut();
            $("#browseCounterparty").dialog("option", "title", "Counterparty Picker");
            $("#browseCounterparty").dialog("open");
        },
        error:
            function (data) {
                $("#loadingPage").fadeOut();
                $("#tblCounterparties").html('<p style="color: black; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>');
                $("#browseCounterparty").dialog("option", "title", "Counterparty Picker");
                $("#browseCounterparty").dialog("open");
            }
    });

}
//function SearchCounterparty() {

//    $('#loadCP').html('<img src="../Content/Images/icon/loading.gif"> Searching...');
//    var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/getrelatedcounterparty?searchkeyword=' + encodeURIComponent($("#txtSearchBoxCP").val()) + '&customquery=&sortbyfield=CounterpartyName&orderby=ASC';
//    $.ajax({
//        url: vURL,
//        type: 'GET',
//        dataType: 'json',
//        "Content-Type": "application/json",
//        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'BusinessAreaLocation': localStorage.GlobalBusinessAreaLocation },
//        cache: false,
//        success: function (data) {
//            $("#tblCounterparties").html('');
//            $('#loadCP').empty();
//            myCounterPartyArray = [];
//            var obj1 = {};
//            for (var i = 0; i < data.length; i++) {
//                if (!(data[i].CounterpartyName in obj1)) {
//                    if (data[i].CounterpartyName.trim() != "") {
//                        if (data[i].IsGlobal == "Yes")
//                            myCounterPartyArray.push(data[i]);
//                        else {
//                            if (typeof (data[i].BusinessAreasPath) != "undefined" && data[i].BusinessAreasPath != "") {
//                                var contractarea = "";
//                                var Businesssarea = "";
//                                var splitbusinessPath = data[i].BusinessAreasPath.split(';');
//                                $(splitbusinessPath).each(function (index) {
//                                    if (this != "") {
//                                        var path = this.toString();
//                                        var contBusi = this.split('>');
//                                        if (typeof (contBusi) != "undefined") {
//                                            if (contBusi.length > 0) {
//                                                contractarea = contBusi[0].trim();
//                                                Businesssarea = contBusi[contBusi.length - 1].trim();
//                                                if (localStorage.GlobalBusinessArea == Businesssarea && thisContractAreaName == contractarea)
//                                                    myCounterPartyArray.push(data[i]);
//                                                else {
//                                                    if (localStorage.UserType.indexOf("Global Contract Owner") >= 0) {
//                                                        myCounterPartyArray.push(data[i]);
//                                                    }
//                                                    else if (typeof (localStorage.BusinessAreaAccess) != "undefined" && localStorage.BusinessAreaAccess != "") {
//                                                        var newArray = localStorage.BusinessAreaAccess.split(',').filter(function (v) { return v !== '' });
//                                                        var found = $.grep(newArray, function (n, ind) {
//                                                            return (n.indexOf(path) == 0);
//                                                        });
//                                                        if (found.length > 0) {
//                                                            myCounterPartyArray.push(data[i]);
//                                                        }
//                                                    }
//                                                }
//                                            }
//                                        }
//                                    }
//                                })

//                            }
//                        }
//                    }
//                }
//                obj1[data[i].CounterpartyName] = true;
//            }
//            var resultfound = true;
//            var myArraylength = myCounterPartyArray.length;
//            CreateCounterPartyListUnit(0);
//            var vCount = myArraylength;
//            var columncounterparty = [];
//            for (var ci = 0; ci < myCounterPartyArray.length; ci++) {
//                columncounterparty.push(myCounterPartyArray[ci].CounterpartyName.trim());
//            }







//            //var datalength = myCounterPartyArray.length;
//            //for (var i = 0; i < datalength; i++) {
//            //    var item = myCounterPartyArray[i];
//            //    var article = '';
//            //    if (i == 0) {
//            //        article += '<tr><th style="width:35%;">Counterparty Name</th><th style="width:20%;">Counterparty Type</th><th>Global or Regional</th></tr>';
//            //    }
//            //    article = '<tr><td>';
//            //    article += '<input id="CP' + item.RowKey + '" type="checkbox" name="Counterparty" class="css1-checkbox" value="' + escape(item.CounterpartyName) + '" />';

//            //    article += '<label for="CP' + item.RowKey + '" class="css1-label"  style="display: inline;">' + item.CounterpartyName + '</label>';
//            //    article += '</td><td>' + item.CounterpartyType + '';
//            //    article += '</td>';
//            //    article += '<td>' + (item.IsGlobal == "Yes" ? "Global" : item.BusinessAreas) + '';
//            //    article += '</td></tr>';
//            //    $("#tblCounterparties").append(article);
//            //}
//            //var vCount = $("#tblCounterparties tr").length;
//            //if (vCount != 0) {
//            //    $('#loadCP').html('');
//            //    $("#spCounterpartiesUnselect").css("display", "");
//            //    $('#compact-paginationCounterparties').css('display', '');
//            //    $('#compact-paginationCounterparties').pagination({
//            //        items: vCount,
//            //        itemsOnPage: 10,
//            //        typeID: 'tblCounterparties',
//            //        cssStyle: 'compact-theme'
//            //    });
//            //} else {
//            //    $('#loadCP').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
//            //    $('#compact-paginationCounterparties').css('display', 'none');
//            //    $("#spCounterpartiesUnselect").css("display", "none");
//            //}
//        },
//        error: function () {
//            $('#compact-paginationCounterparties').css('display', 'none');
//            $('#loadCP').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
//            $("#spCounterpartiesUnselect").css("display", "none");
//        }
//    });

//}

function ChangeCounterpartyMultiple() {
    var vCoounterparty = "";
    //$('input:checkbox[name="Counterparty"]:checked').each(function () {
    //    if (vCoounterparty == "") {
    //        vCoounterparty = unescape(this.value);
    //    }
    //    else {
    //        vCoounterparty += "; " + unescape(this.value);
    //    }
    //});
    vCoounterparty = multipleChecksDocumentID.join('; ');
    if (vCoounterparty != "") {
        swal({
            title: '',
            text: "Are you sure, you want to <span style=\"font-weight:700\">change</span> counterparty?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            html: true
        },
     function (confirmed) {
         if (confirmed) {
             $("#loadingPage").fadeIn();

             $.ajax({
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/' + multipleChecks + '/changecounterparty?counterparty=' + encodeURIComponent(vCoounterparty),
                 type: 'PUT',
                 dataType: 'json',
                 headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                 cache: false,
                 success: function (result) {
                     $("#loadingPage").fadeOut();
                     $("#browseCounterparty").dialog("close");
                     applyFilter();
                 },
                 error: function (person) {
                     $("#loadingPage").fadeOut();
                 },
             });
         }
         return;
     });

    } else {

        swal("", "No Counterparty has been selected.");
    }
}

function liRemoveSelected(obj) {
    var child = obj.parentNode;
    var i = selecteditems12.indexOf(child.firstChild.nodeValue);
    if (i != -1) {
        selecteditems12.splice(i, 1);
    }
    child.parentNode.removeChild(child);
    $('#txtBA').val(selecteditems12);
}

var article1 = "";
var selecteditems12 = [];
var BusinessAreaAccess12 = localStorage.BusinessAreaAccess;

function BindBusinessArea() {
    $(".hhide").hide();
    $("#loadingPage").fadeIn();
    var vBAL = localStorage.GlobalBusinessAreaLocation.split('>');
    var businessareaname = vBAL[vBAL.length - 1].trim();
    var contractareaname = vBAL[0].trim();
    $("#tbodyBusinessArea12").empty();
    $('#liSelectedBA').empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/entitiesbycontractarea?contractareaname=' + encodeURIComponent(contractareaname),
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            recursiveIteration12(data)
            $("#tbodyBusinessArea12").append(article1);
            article1 = "";
            $("#example-basic-12").treetable({ expandable: true, initialState: "expanded" }, true);

            $("#loadingPage").fadeOut();
            $("#browseBA").dialog("option", "title", "Browse Business Area");
            $("#browseBA").dialog("open");
            $("#browseBA").height("auto");
        },
        error:
            function (data) {
                $("#loadingPage").fadeOut();
            }
    });
}

var strContractAreaName12 = "";
var strContractAreaName12Owner = "";
var previousidcreate = "";
var strContractAreaID = '';
function recursiveIteration12(object) {
    if (object.ChildrenData.length != 0) {
        BindRecBAOther('', object);
    }
}

function BindRecBAOther(path, object) {
    for (var i = 0; i < object.ChildrenData.length; i++) {
        var item = object.ChildrenData[i];
        var additional = "";
        var spath = '';
        if (path == '')
            spath = item.BusinessAreaName;
        else
            spath = path + ' > ' + item.BusinessAreaName;
        var found = $.grep(BusinessAreaAccessWithRead, function (n, ind) {
            return (n.indexOf(spath) == 0);
        });
        if (found.length > 0 || localStorage.UserType.indexOf("Global Contract Owner") >= 0 || item.RowKey == "GenCA" || item.RowKey == "GenBA") {
            var j = BusinessAreaAccessID.indexOf(item.RowKey);
            if (j > -1 || item.Owner.trim().split(';').indexOf(localStorage.UserName.trim()) > -1) {
                if (item.ParentBusinessAreaID != 0) {
                    if (item.Owner.trim().split(';').indexOf(localStorage.UserName.trim()) > -1) {//if business owner
                        additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclick1(this)">' + item.BusinessAreaName + '</span>&nbsp; <img src="/Content/Images/icon/profile.png" style="cursor:default;" />'
                    } else { //if permission in business area
                        additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclick1(this)">' + item.BusinessAreaName + '</span>'
                    }
                } else {
                    additional = '<span>' + item.BusinessAreaName + '</span>';
                }

            } else {
                if (item.ParentBusinessAreaID != 0) {
                    if (strContractAreaID == "GenCA") {
                        additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclick1(this)">' + item.BusinessAreaName + '</span>'
                    } else {
                        if (localStorage.UserType.indexOf("Global Contract Owner") >= 0) {
                            additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclick1(this)">' + item.BusinessAreaName + '</span>'
                        } else {
                            additional = '<span>' + item.BusinessAreaName + '</span><span style="font-size:12px;font-style:italic;">(Request Access)</span>';
                        }
                    }
                } else {
                    additional = '<span>' + item.BusinessAreaName + '</span>';
                }
            }

            if (item.ParentBusinessAreaID == 0) {
                strContractAreaName12 = item.BusinessAreaName;
                strContractAreaID = item.RowKey;
                strContractAreaName12Owner = item.Owner;
                article1 += '<tr data-tt-id="tre-' + item.RowKey + '" class="branch expanded">';
                article1 += '<td class="treeHead"><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName12 + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName12Owner + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/globset.png" /><small>' + additional + '</small></td></tr>';
            } else {
                article1 += '<tr data-tt-id="tre-' + item.RowKey + '" data-tt-parent-id="tre-' + item.ParentBusinessAreaID + '" class="branch collapsed" style="display: table-row;">';
                if (previousidcreate == item.ParentBusinessAreaID) {
                    //find if child business area exists
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/childbusinessareas?businessareaid=' + item.RowKey,
                        type: 'GET',
                        dataType: 'json',
                        'Content-Type': 'application/json',
                        headers: { 'eContracts-ApiKey': localStorage.APIKey },
                        async: false,
                        success: function (data) {
                            if (data.length == 0) {
                                article1 += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName12 + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName12Owner + '</span><span id="BusinessAreaOwner" style="display:none;">' + item.Owner + '</span><span id="BusinessAreaDescription" style="display:none;">' + item.Description + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" class="padding_left_65px" /><small>' + additional + '</small></td></tr>';
                            } else {
                                article1 += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName12 + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName12Owner + '</span><span id="BusinessAreaOwner" style="display:none;">' + item.Owner + '</span><span id="BusinessAreaDescription" style="display:none;">' + item.Description + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" /><small>' + additional + '</small></td></tr>';
                            }
                        },
                        error:
                            function (data) {

                            }
                    });
                } else {
                    article1 += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName12 + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName12Owner + '</span><span id="BusinessAreaOwner" style="display:none;">' + item.Owner + '</span><span id="BusinessAreaDescription" style="display:none;">' + item.Description + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" /><small>' + additional + '</small></td></tr>';
                }
                if (previousidcreate != item.ParentBusinessAreaID)
                    previousidcreate = item.RowKey;
            }

            if (object.ChildrenData.length > 0)
                BindRecBAOther(spath, object.ChildrenData[i]);
        }
    }
}

var treeBusinessAreaName = '';
var treeBusinessAreaRowKey = '';
var treeBusinessAreaParentBusinessAreaID = '';
var treeBusinessAreaContractAreaName = '';
var treeBusinessAreaContractAreaNameOwner = '';
var treeBusinessAreaOwner = '';
var treeBusinessAreaDescription = '';

function treeviewclick1(obj) {
    treeBusinessAreaName = obj.textContent;
    treeBusinessAreaRowKey = obj.parentNode.parentNode.childNodes[2].textContent;
    treeBusinessAreaParentBusinessAreaID = obj.parentNode.parentNode.childNodes[1].textContent;
    treeBusinessAreaContractAreaName = obj.parentNode.parentNode.childNodes[3].textContent;
    treeBusinessAreaContractAreaNameOwner = obj.parentNode.parentNode.childNodes[4].textContent;
    treeBusinessAreaOwner = obj.parentNode.parentNode.childNodes[5].textContent;
    treeBusinessAreaDescription = obj.parentNode.parentNode.childNodes[6].textContent;

    $('#liSelectedBA').html('<span style="font-size:13px;">' + treeBusinessAreaName + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelected(this);" style="float:right" /></span>');
}

function ChangeBusinessAreaMultiple() {
    if ($('#liSelectedBA span').length > 0) {
        swal({
            title: '',
            text: "Are you sure you want to <span style=\"font-weight:700\"> Change the business area?</span>?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            html: true
        },
     function (confirmed) {
         if (confirmed) {
             $("#loadingPage").fadeIn();
             $.ajax({
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/businessarealocation?businessareaid=' + treeBusinessAreaRowKey,
                 type: 'GET',
                 dataType: 'json',
                 headers: { 'eContracts-ApiKey': localStorage.APIKey },
                 success: function (fullhierarchy) {
                     $.ajax({
                         url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/' + multipleChecks + '/changebusinessarea',
                         type: 'PUT',
                         dataType: 'json',
                         headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                         data: {
                             BusinessArea: treeBusinessAreaName,
                             BusinessAreaOwners: treeBusinessAreaOwner,
                             BusinessAreaPath: fullhierarchy,
                         },
                         cache: false,
                         success: function (result) {
                             $("#loadingPage").fadeOut();
                             $("#browseBA").dialog("close");
                             applyFilter();
                         },
                         error: function (person) {
                             $("#loadingPage").fadeOut();
                         },
                     });
                 },
                 error: function (fullhierarchy) {

                 }
             });

         }
         return;
     });

    } else {
        swal("", "Select Business Area");
    }
}

function BindMetadataDetail(requestid) {
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/requestsbyrequestid?requestid=' + requestid,
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
        processData: false,
        success: function (requestRecord) {
            $("#tdSumRequestTitle").html(requestRecord.RequestTitle);
            $("#tdSumRequestType").html(requestRecord.RequestType);
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/IRequestDetails?requestid=' + requestid,
                type: 'GET',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                cache: false,
                success: function (mainmetadataFields) {
                    var vMetadata = $(mainmetadataFields).find('Metadata');
                    var vMetadataHTML = vMetadata[0].innerHTML;

                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/requesttypes/metadatas?requesttypename=' + encodeURIComponent(requestRecord.RequestType),
                        type: 'GET',
                        dataType: 'json',
                        headers: { 'eContracts-ApiKey': localStorage.APIKey },
                        cache: false,
                        success: function (metadataFields) {
                            $("#tblSummaryMetadata").empty();
                            var datalenght = metadataFields.length;
                            for (var i = 0; i < datalenght; i++) {
                                var item = metadataFields[i];
                                if ((item.FieldName != "RequestTitle") && (item.FieldName != "RequestType") && (name != "STATUSCHANGEDALERT")) {
                                    if (item.FieldType == "File Upload") {
                                    }
                                    else {
                                        var vControls = '<tr>';
                                        vControls += '<td class="f_head">' + item.FieldDisplayName + '</td>';

                                        if (item.FieldType == "Date") {
                                            var vv = $(vMetadata).find(item.FieldName).text();
                                            var onlydate = '';
                                            if (vv != null) {
                                                onlydate = vv.substring(0, vv.length - 19);
                                                if (onlydate != "") {
                                                    if (localStorage.AppDateFormat == null || localStorage.AppDateFormat == "" || localStorage.AppDateFormat == 'undefined') {
                                                        onlydate = moment(new Date(onlydate)).format('MM/DD/YYYY');
                                                    }
                                                    else {
                                                        onlydate = moment(new Date(onlydate)).format(localStorage.AppDateFormat);
                                                    }
                                                }
                                                if (onlydate == '') {
                                                    vControls += '<td class="labelleft">-</td>';
                                                } else {
                                                    vControls += '<td class="labelleft">' + onlydate + '</td>';
                                                }
                                            } else {
                                                vControls += '<td class="labelleft">-</td>';
                                            }
                                        } else {
                                            var nvalue = $(vMetadata).find(item.FieldName).text();
                                            if (nvalue == '' || nvalue == '0') {
                                                vControls += '<td class="labelleft">-</td>';
                                            } else {
                                                vControls += '<td class="labelleft">' + nvalue + '</td>';
                                            }
                                        }

                                        vControls += '</tr>';
                                        vMetadataHTML = vMetadataHTML.replace("<" + item.FieldName + ">" + $(vMetadata).find(item.FieldName).text() + "</" + item.FieldName + ">", "");
                                        $("#tblSummaryMetadata").append(vControls);
                                    }
                                }
                            }

                            var vRequestFields = null;

                            $.ajax({
                                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/requestfields',
                                type: 'GET',
                                dataType: 'json',
                                "Content-Type": "application/json",
                                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                                cache: false,
                                async: false,
                                success: function (requestfields) {
                                    vRequestFields = requestfields;

                                    $("#tblDetailsMetadata").empty();
                                    var datalenght = $(vMetadataHTML).length;
                                    for (var i = 0; i < datalenght; i++) {
                                        var item = $(vMetadataHTML)[i];
                                        var name = item.nodeName;
                                        if ((name != "REQUESTTITLE") && (name != "REQUESTTYPE") && (name != "STATUSCHANGEDALERT")) {
                                            var vField = $.grep(vRequestFields, function (person) { return person.FieldName.toUpperCase() == name });
                                            var value = item.textContent;
                                            if (vField.length > 0) {
                                                var vControls = '<tr>';
                                                vControls += '<td class="f_head">' + vField[0].FieldDisplayName + '</td>';
                                                if (value == '' || value == '0') {
                                                    vControls += '<td class="labelleft">-</td>';
                                                }
                                                else {
                                                    if (vField[0].FieldType == "Date") {
                                                        var onlydate = "";
                                                        onlydate = value.substring(0, value.length - 19);
                                                        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                                                        { onlydate = moment(new Date(onlydate)).format('MM/DD/YYYY'); }
                                                        else { onlydate = moment(new Date(onlydate)).format(localStorage.AppDateFormat); }
                                                        vControls += '<td class="labelleft">' + onlydate + '</td>';

                                                    } else {
                                                        vControls += '<td class="labelleft">' + value + '</td>';
                                                    }
                                                }
                                                vControls += '</tr>';

                                                $("#tblDetailsMetadata").append(vControls);
                                            }
                                        }
                                    }
                                    $("#loadingPage").fadeOut();
                                    $('#dialogSummary').dialog('open');
                                },
                                error: function () {
                                    $("#loadingPage").fadeOut();
                                }
                            });
                        },
                        error: function () {
                            $("#loadingPage").fadeOut();
                        }
                    });
                }
            });
        }
    });
}

function MetadataDetails() {
    $("#Summary").removeClass('pop_up__Acti');
    $("#Details").addClass('pop_up__Acti');
    $('#tblSummary').css("display", "none");
    $('#tblDetailsMetadata').css("display", "");
}

function MetadataSummary() {
    $("#Details").removeClass('pop_up__Acti');
    $("#Summary").addClass('pop_up__Acti');
    $('#tblSummary').css("display", "");
    $('#tblDetailsMetadata').css("display", "none");

    $("#Details").removeClass('pop_up__Acti');
    $("#Summary").addClass('pop_up__Acti');
    $('#tblSummary').css("display", "");
    $('#tblDetailsMetadata').css("display", "none");
}





//Menu for recyclebin Requests
function contextMenuWorkRecycleBin(action, el, pos) {

    switch (action) {
        case "delete":
            {
                var requestTitle = $(el).find("#RequestTitle").text();
                var entityid = $(el).find("#RequestID").text();
                DeleteRequestFromRecyclebin(entityid, requestTitle);

                break;
            }
        case "viewdetails":
            {
                var entityid = $(el).find("#RequestID").text();
                if (entityid != "") {
                    location = "/Pipeline/RequestDetails?RequestID=" + entityid + "&View=" + ObjectNameToSend;
                }

                break;
            }
        case "history":
            {

                var requestID = $(el).find("#RequestID").text();
                CreateRequestActivityList(requestID);
                break;
            }
    }
}


function DeleteRequestFromRecyclebin(RequestID, RequestTitle) {
    swal({
        title: '',
        text: "Are you sure you want to <span style=\"font-weight:700\">delete " + RequestTitle + "</span> permanently?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        html: true
    },
     function (confirmed) {
         if (confirmed) {
             $("#loadingPage").fadeIn();
             $.ajax({
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/DeleteRequest?requestid=' + RequestID,
                 type: 'DELETE',
                 dataType: 'json',
                 headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                 cache: false,
                 success: function (data) {
                     location = location;
                 }
             });

         }
         return;
     });

}

var workflowRoutingOptions = [];
var vWorkflowRules = [];
var workflowAdHoc = "";
$("#ddlRule").change(function (obj) {
    var vFilterRule = $.grep(vWorkflowRules, function (n, i) {
        return (n.RuleName == $("#ddlRule option:selected").text());
    });
    if (vFilterRule.length > 0) {
        $("#tblStage").empty();
        var workflowRules = vFilterRule[0];
        var participantsInXML = workflowRules.ParticipantsInXML;
        var totalFileCount = 0;
        if ($("#ddlRule option:selected").text() == "Default") {
            if (typeof workflowRules.WorkflowTitle != 'undefined' && workflowRules.WorkflowTitle != "") {
                $("#txtWorkflowTitle").val(workflowRules.WorkflowTitle + ' for ' + $("#hdWorkflowObjectTitle").val());
            } else {
                $("#txtWorkflowTitle").val('Approval for ' + $("#hdWorkflowObjectTitle").val());
            }
        }
        else {
            if (typeof workflowRules.WorkflowTitle != 'undefined' && workflowRules.WorkflowTitle != "") {
                $("#txtWorkflowTitle").val(workflowRules.WorkflowTitle + ' for ' + $("#hdWorkflowObjectTitle").val());
            }
            else {
                $("#txtWorkflowTitle").val('Approval for ' + $("#hdWorkflowObjectTitle").val());
            }
        }
        $(participantsInXML).find('WorkflowPaticipant').each(function () {
            var StageTitle = $(this).find('StageTitle').text();
            var Participants = $(this).find('Participants').text();
            var Order = $(this).find('Order').text();
            totalFileCount++;
            var htmlFormatFile = '<tr id="trStage' + totalFileCount + '">';
            htmlFormatFile += '<td class="width30 wf_approval">';
            htmlFormatFile += '<input id="txtStage' + totalFileCount + '" value="' + StageTitle + '" name="Stage' + totalFileCount + '" title="Stage" placeholder="Stage Name" type="text" class="f_inpt width97 validelement" />';
            htmlFormatFile += '</td>';
            htmlFormatFile += '<td class="width46 ">';
            htmlFormatFile += '<select id="ddlAssignTo' + totalFileCount + '" name="AssignTo' + totalFileCount + '"  multiple="multiple" data-placeholder="Select" class="width97 validmultiselect"></select>';
            htmlFormatFile += '</td>';
            htmlFormatFile += '<td class="width20 padding_top_3px v_align_top">';
            htmlFormatFile += '<select id="ddlOrder' + totalFileCount + '" name="Order' + totalFileCount + '"  class="f_inpt width97">';
            if (Order == "Serial")
                htmlFormatFile += '<option value="Serial" selected="selected">Serial</option><option value="Parallel">Parallel</option></select>';
            else
                htmlFormatFile += '<option value="Serial">Serial</option><option value="Parallel" selected="selected">Parallel</option></select>';
            htmlFormatFile += '</td>';
            htmlFormatFile += '<td class="width4 padding_top_10px v_align_top">';
            if (totalFileCount > 1)
                htmlFormatFile += '<img id="imgStageDelete' + totalFileCount + '" src="../Content/Images/icon/delete.png" style="width: 20px" onclick="DeleteStage(this)" />';
            else
                htmlFormatFile += '<img id="imgStageDelete' + totalFileCount + '" src="../Content/Images/icon/delete.png" style="visibility: hidden; width: 20px" onclick="DeleteStage(this)" />';
            htmlFormatFile += '</td>';
            htmlFormatFile += '</tr>';


            $("#tblStage").append(htmlFormatFile);
            var $options = $("#ddlApprovers > option").clone();
            $('#ddlAssignTo' + totalFileCount).append($options);

            $("#ddlAssignTo" + totalFileCount).chosen().change(function () {
                var vasstoid = $(this).attr('id').replace("ddlAssignTo", "");
                if ($(this).val() != null) {
                    if ($(this).val().length > 1 && (workflowRoutingOptions.indexOf("Allow over-ride of Admin Configuration") >= 0 ||
                        workflowRoutingOptions.indexOf("Allow replacing participants") >= 0))
                        $("#ddlOrder" + vasstoid).prop('disabled', false);
                    else {
                        $("#ddlOrder" + vasstoid).val('Serial');
                        $("#ddlOrder" + vasstoid).prop('disabled', true);
                    }
                }
                else {
                    $("#ddlOrder" + vasstoid).val('Serial');
                    $("#ddlOrder" + vasstoid).prop('disabled', true);
                }
            });
            GetValuesAndAutoPopulate("ddlAssignTo" + totalFileCount, Participants);
            var vParticipantsArr = Participants.split(";");
            if (vParticipantsArr.length > 1)
                $("#ddlOrder" + totalFileCount).prop('disabled', false);
            else
                $("#ddlOrder" + totalFileCount).prop('disabled', true);



            if (item.WorkflowSettings != null) {
                if (workflowRoutingOptions.indexOf("Allow over-ride of Admin Configuration") == -1) {
                    if (workflowRoutingOptions.indexOf("Allow replacing participants") == -1) {
                        $("#ddlAssignTo" + totalFileCount).prop('disabled', true).trigger("chosen:updated");
                        $("#ddlOrder" + totalFileCount).prop('disabled', true);
                    }
                    $("#txtStage" + totalFileCount).prop('disabled', true);
                    $("#imgStageDelete" + totalFileCount).css("visibility", "hidden");
                }
            }
        });
        if (typeof participantsInXML == 'undefined' || participantsInXML == "" || participantsInXML == null) {
            $("#tblStage").empty();
            var totalFileCount = 1;
            var htmlFormatFile = '<tr id="trStage' + totalFileCount + '">';
            htmlFormatFile += '<td class="width30 wf_approval">';
            htmlFormatFile += '<input id="txtStage' + totalFileCount + '" name="Stage' + totalFileCount + '" title="Stage" placeholder="Stage Name" type="text" class="f_inpt width95 validelement" value="Stage ' + totalFileCount + '"/>';
            htmlFormatFile += '</td>';
            htmlFormatFile += '<td class="width46">';
            htmlFormatFile += '<select id="ddlAssignTo' + totalFileCount + '" name="AssignTo' + totalFileCount + '"  multiple="multiple" data-placeholder="Select" class="width97 validmultiselect"></select>';
            htmlFormatFile += '</td>';
            htmlFormatFile += '<td class="width20 padding_top_3px v_align_top">';
            htmlFormatFile += '<select id="ddlOrder' + totalFileCount + '" name="Order' + totalFileCount + '"  class="f_inpt width97" disabled="disabled"><option selected="selected">Serial</option><option>Parallel</option></select>';
            htmlFormatFile += '</td>';
            htmlFormatFile += '<td class="width4 padding_top_10px v_align_top">';
            htmlFormatFile += '<img src="../Content/Images/icon/delete.png" style="visibility: hidden; width: 20px" onclick="DeleteStage(this)" />';
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
                    else {
                        $("#ddlOrder" + vasstoid).prop('disabled', true);
                        $("#ddlOrder" + vasstoid).val('Serial');
                    }
                }
            });

        }
    } else if ($("#ddlRule option:selected").text() == "Ad-hoc") {
        $("#txtWorkflowTitle").val('Ad-hoc workflow for ' + $("#hdWorkflowObjectTitle").val());
        $("#tblStage").empty();
        var totalFileCount = 1;
        var htmlFormatFile = '<tr id="trStage' + totalFileCount + '">';
        htmlFormatFile += '<td class="width30 wf_approval start_workflow">';
        htmlFormatFile += '<input id="txtStage' + totalFileCount + '" name="Stage' + totalFileCount + '" title="Stage" placeholder="Stage Name" type="text" class="f_inpt width95_a validelement" value="Stage ' + totalFileCount + '"/>';
        htmlFormatFile += '</td>';
        htmlFormatFile += '<td class="width46 start_workflow">';
        htmlFormatFile += '<select id="ddlAssignTo' + totalFileCount + '" name="AssignTo' + totalFileCount + '"  multiple="multiple" data-placeholder="Select" class="width97 a-Workflow-height validmultiselect"></select>';
        htmlFormatFile += '</td>';
        htmlFormatFile += '<td class="width20 padding_top_3px v_align_top start_workflow">';
        htmlFormatFile += '<select id="ddlOrder' + totalFileCount + '" name="Order' + totalFileCount + '"  class="f_inpt width97 height32" disabled="disabled"><option selected="selected">Serial</option><option>Parallel</option></select>';
        htmlFormatFile += '</td>';
        htmlFormatFile += '<td class="width4 padding_top_10px v_align_top start_workflow">';
        htmlFormatFile += '<img src="../Content/Images/icon/delete.png" style="visibility: hidden; width: 20px" onclick="DeleteStage(this)" />';
        htmlFormatFile += '</td>';
        htmlFormatFile += '</tr>';

        $("#tblStage").append(htmlFormatFile);
        var $options = $("#ddlApprovers > option").clone();
        $('#ddlAssignTo' + totalFileCount).append($options);
        $("#ddlAssignTo" + totalFileCount).chosen().change(function () {
            //var vasstoid = $(this).attr('id').replace("ddlAssignTo", "");
            //if ($(this).val().length > 1)
            //    $("#ddlOrder" + vasstoid).prop('disabled', false);
            //else
            //    $("#ddlOrder" + vasstoid).prop('disabled', true);

            var vasstoid = $(this).attr('id').replace("ddlAssignTo", "");
            if ($(this).val() != null) {
                if ($(this).val().length > 1)
                    $("#ddlOrder" + vasstoid).prop('disabled', false);
                else {
                    $("#ddlOrder" + vasstoid).prop('disabled', true);
                    $("#ddlOrder" + vasstoid).val("Serial");
                }
            }
            else {
                $("#ddlOrder" + vasstoid).val('Serial');
                $("#ddlOrder" + vasstoid).prop('disabled', true);
            }
        });
    }
});

function change_date(txtBox, lblDate) {
    var lblSelected = document.getElementById(lblDate);
    if (typeof ($(txtBox).val()) != "undefined" && $(txtBox).val() != null && $(txtBox).val() != "") {
        var noofdays = parseInt($(txtBox).val());
        $(lblSelected).empty();
        $(lblSelected).html(moment(new Date()).add(noofdays, "days").format('MM/DD/YYYY'));
    } else {
        $(lblSelected).empty();
    }
}

function AddRolesddl(controlname) {
    var roleoption = "";
    if (SettingUserRole == "")
        BindSettings();
    var rolestype = SettingUserRole;
    $(SettingUserRole).find('Roles').each(function () {
        var role = $(this).find('Role').text();
        if ($("#" + controlname + " option[value='[" + role + "]']").length == 0) {
            roleoption += '<option value="[' + role + ']">[' + role + ']</option>';
        }
    })
    var html = $("#" + controlname).html();
    html = roleoption + html;
    $("#" + controlname).html(html);
}

function BindSettings() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/userrolesetting',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: false,
        success: function (data) {
            if (data.length != 0) {
                SettingUserRole = data[0].UserRoleSetting;
            }
        },
        error: function (data) {
        }
    });
}

function insertNewfilterCondition(objCurrentRow) {
    //var previousRowId = $(objCurrentRow).parent().parent().parent().index();
    var previousRowId = $("#tblfilterConditions tr").length - 1;
    var id = rowCounter;
    var filterConditiontable = document.getElementById("tblfilterConditions");
    var row = filterConditiontable.insertRow(previousRowId + 1);
    row.id = "tr_" + (id + 1);
    var row = "";
    if (id != null && typeof id != 'undefined') {
        //row += '<td>';
        //row += '<span>' + '<a id="insertNewfilter_' + (id + 1) + '"' + 'onclick="insertNewfilterCondition(this)" href="javascript:void(0)"><img src="/Content/Images/plus_green.png" />' + '</a>' + '</span>';
        //row += '</td>';
        //row += '<td>';
        //row += '<span>' + '<input style="display:none" checked="checked" id="chkNewfilter_' + (id + 1) + '"' + 'type="checkbox" />' + '</span>';
        //row += '</td>';
        row += '<td>';
        row += '<span>' + '<select id="condition_' + (id + 1) + '"' + 'class="width100 validelement" >' + '<option value="">--Select--</option>' + '<option value="and">And</option>' + '<option value="or">Or</option>' + '</select>' + '</span>';
        row += '</td>';
        row += '<td>';
        row += '<input id="metadata_label_' + (id + 1) + '"' + 'type="text" class="f_textinput width90 validelement" />' + '<input id="metadata_value_' + (id + 1) + '"' + 'type="hidden" />' + '<input id="metadata_type_' + (id + 1) + '"' + 'type="hidden" />';
        row += '</td>';
        //row += '<td>' + '<span>' + '<input readonly id="metadata_type_' + (id + 1) + '"' + 'type="text" readonly class="f_textinput width90" />' + '</span>' + '</td>';
        row += '<td>';
        row += '<span>';
        row += '<select onchange="validateFilterValue(this)" id="operator_' + (id + 1) + '"' + 'type="text" class="width100 validelement">' +
               ' <option value="">--Select--</option>' +
               //' <option value="eq">Equals</option>' +
               //' <option value="gt">Is Greater than</option>'+
               //' <option value="ne">Does not equal</option>' +
               //' <option value="gt">Is greater than</option>' +
               //' <option value="ge">Is greater than or equal to</option>' + 
               //' <option value="lt">Is less than</option>' +
               //' <option value="le">Is less than or equal to</option>' +
               //' <option value="like">Contains</option>' +
               //' <option value="notlike">Not Contains</option>' +
               //' <option value="empty">Empty</option>' +
               //' <option value="any">Not Empty / Any </option>' +
               '</select>';
        row += '</span>';
        row += '</td>';
        row += '<td>';
        //row += '<span>' + '<input id="value_' + (id + 1) + '"' + 'type="text" class="f_textinput width90" />' + '</span>';
        row += '</td>';
        row += '<td>';
        row += '<span>' + '<a href="javascript:void(0)" onclick="removefilterCondition(this)" >' + '<img src="/Content/Images/close_red.png"/></a>' + '</span>';
        row += '</td>';
        $("#tr_" + (id + 1)).append(row);
        rowCounter = rowCounter + 1;

        $('#metadata_label_' + (id + 1)).autocomplete({
            source: metadataLookUp,
            minLength: 0,
            select: function (event, ui) {
                currentAutoCompleteUiObj = ui;
                lookUpSelect(ui, (id + 1));
            },
            response: function (event, ui) {
                if (ui.content.length === 0) {
                    $('#metadata_label_' + (id + 1)).val('');
                    $('#metadata_value_' + (id + 1)).val('');
                } else {
                    //$('#metadata_label_' + (id + 1)).val('');
                    //$('#metadata_value_' + (id + 1)).val('');
                }
            }
        }).focus(function () {
            $(this).autocomplete('search', $(this).val())
        });
    }
    if (previousRowId == 8) {
        $("#btnAddNewAdFilter").css("display", "none");
    }
}

function restoreAdvanceViewIntial() {
    $("#tblfilterConditions tr").each(function () {
        $(this).remove();

    });
    $("#txtAdvanceViewName").text('');
    $("#txtAdvanceViewName").val("");
    $('#conAdvanceViewSortBy').val('Recently Updated');
    $("#btnAddNewAdFilter").css("display", "");
    var tr = '<tr id="tr_0">' +
    '<td>' + '</td>' +
     '<td>' +
     '<input id="metadata_label_0" type="text" class="validelement width90" />' +
     '<input id="metadata_value_0" type="hidden" />' +
     '<input id="metadata_type_0" type="hidden" />' +
     '</td>' +
     '<td>' +
     '<span>' +
     '<select id="operator_0" class="validelement" onchange="validateFilterValue(this)">' +
         //'<option value="">--Select--</option>' +
         //'<option value="eq">Equal</option>' +
         //'<option value="ne">Does not equal</option>' +
         //'<option value="gt">Is greater than</option>' +
         //'<option value="ge">Is greater than or equal to</option>' +
         //'<option value="lt">Is less than</option>' +
         //'<option value="le">Is less than or equal to</option>' +
         //'<option value="like">Contains</option>' +
         // '<option value="notlike">Not Contains</option>' +
         //'<option value="empty">Is empty</option>' +
         //'<option value="any">Not empty (any value)</option>' +
      '</select>' +
     '</span>' +
    '</td>' +
       '<td>' + '</td>' + '<td style="text-align: center!important;">' + '</td>' + '</tr>';


    $("#tblfilterConditions").append(tr);
    //eO310303
    $("#metadata_label_0").autocomplete({
        source: metadataLookUp,
        minLength: 0,
        select: function (event, ui) {
            $("#metadata_value_0").val(ui.item.fieldName)
            $("#metadata_type_0").val(ui.item.fieldType)
            currentAutoCompleteUiObj = ui;
            createOperatorsBasedOnMetdataType(ui.item.fieldType, 0);
            createValueFieldBasedOnFieldType(ui.item.fieldType, ui.item.choiceValues, 0);

        },
        response: function (event, ui) {
            if (ui.content.length === 0) {
                $('#metadata_label_0').val('');
                $('#metadata_value_0').val('');
            } else {
                //$('#metadata_label_' + (id + 1)).val('');
                //$('#metadata_value_' + (id + 1)).val('');
            }
        }
    }).focus(function () {
        $(this).autocomplete('search', $(this).val())
    });
}

function validateFilterValue(objthis) {
    var id = $(objthis).attr("id").split('_')[1];
    var rowObj = $(objthis).parent().parent().parent();
    var rowid = $(rowObj).attr('id').split('_')[1];
    var metadataType = $("#tr_" + rowid + " input:hidden").filter('[id*="metadata_type"]').val();
    var fieldName = $("#tr_" + rowid + " input:hidden").filter('[id*="metadata_value"]').val();
    var obj = metadataLookUp.filter(function (value, index) { return value.fieldType == metadataType && value.fieldName == fieldName });
    currentAutoCompleteUiObj.item = {};
    currentAutoCompleteUiObj.item.fieldType = obj[0].fieldType;
    currentAutoCompleteUiObj.item.choiceValues = obj[0].choiceValues;
    if ($(objthis).val() == "empty" || $(objthis).val() == "any") {
        $("#" + $(rowObj).attr('id') + " td:nth-child(4)").css('display', 'none');
        //$("#" + $(rowObj).attr('id') + " td:nth-child(4)").html('');
    } else {
        $("#" + $(rowObj).attr('id') + " td:nth-child(4)").css('display', '');
        createValueFieldBasedOnFieldType(currentAutoCompleteUiObj.item.fieldType, currentAutoCompleteUiObj.item.choiceValues, rowid, currentAutoCompleteUiObj.item.fieldName);
    }

    if (($("#metadata_type_" + id).val() == 'Single Line Text' || $("#metadata_type_" + id).val() == 'Multi Line Text' || $("#metadata_type_" + id).val() == 'Choice' || $("#metadata_type_" + id).val() == 'User' || $("#metadata_type_" + id).val() == "Yes/No")
          && ($("#operator_" + id).val() == 'ge' || $("#operator_" + id).val() == 'gt' || $("#operator_" + id).val() == 'lt' || $("#operator_" + id).val() == 'le')) {
        $("#operator_" + id).val("");
    }
}

$("#conAdvanceViewSortBy").on('change', function () {
    if ($(this).val() == "Title(A-Z)" || $(this).val() == "Title(Z-A)") {
        $("#advanceViewSortDirection").css("display", "none");
    } else {
        $("#advanceViewSortDirection").css("display", "");
    }
})

function Loading_View_trigger() {
    getSearchableContractFields();
}

$("#SelectAll").change(function () {
    var isAllSelected = $(this).prop('checked');
    var cp = $("#compact-pagination").pagination('getCurrentPage');
    updateContractSelectedObj(cp, isAllSelected, true, 0)
})

function extractLast(term) {
    return split(term).pop();
}

function split(val) {
    return val.split(/,\s*/);
}

function updateContractSelectedObj(currentPage, AllSelected, isAllChkClick, selectedIndex) {
    if (isAllChkClick) {
        var cons = contractSelected.pages.filter(function (val, index) {

            return (val.pageNumber == currentPage);

        });

        if (cons.length > 0) {
            var temp = 0;
            for (var i = 0; i < contractSelected.pages.length; i++) {
                if (cons[0].pageNumber == contractSelected.pages[i].pageNumber) {
                    temp = i;
                    contractSelected.pages[i].isAllSelected = AllSelected
                    break;
                }
            }
            if (AllSelected == false) {
                contractSelected.pages[temp].selectedIndexes = [];
            } else {
                contractSelected.pages[temp].selectedIndexes = [];
                var len = $('input[type = "checkbox"]').filter('[name="ContRec"]:checked').length;
                for (var i = 0; i < len; i++) {
                    contractSelected.pages[temp].selectedIndexes.push(i);
                }
            }
        } else {
            var page = new Object();
            page.pageNumber = currentPage;
            page.isAllSelected = AllSelected;
            page.selectedIndexes = [];
            if (AllSelected == true) {
                var len = $('input[type = "checkbox"]').filter('[name="ContRec"]:checked').length;
                for (var i = 0; i < len; i++) {
                    page.selectedIndexes.push(i);
                }
            }
            contractSelected.pages.push(page);
        }
    } else {
        var cons = contractSelected.pages.filter(function (val, index) {

            return (val.pageNumber == currentPage);

        });

        if (cons.length > 0) {

            var indexarr = cons[0].selectedIndexes.filter(function (val1, index1) {

                return val1 == selectedIndex
            })

            if (indexarr.length > 0) {
                for (var i = 0; i < contractSelected.pages.length; i++) {
                    if (cons[0].pageNumber == contractSelected.pages[i].pageNumber) {
                        var temp = []; var temp1 = i;
                        for (var j = 0; j < cons[0].selectedIndexes.length; j++) {
                            if (cons[0].selectedIndexes[j] != selectedIndex) {
                                temp.push(cons[0].selectedIndexes[j])
                            }
                        }
                        contractSelected.pages[temp1].selectedIndexes = temp;
                        if (contractSelected.pages[temp1].isAllSelected) {
                            contractSelected.pages[temp1].isAllSelected = false;
                        }
                        break;
                    }
                }
            } else {
                for (var i = 0; i < contractSelected.pages.length; i++) {
                    if (cons[0].pageNumber == contractSelected.pages[i].pageNumber) {
                        contractSelected.pages[i].selectedIndexes.push(selectedIndex)
                        break;
                    }


                }
            }


        } else {
            var page = new Object();
            page.pageNumber = currentPage;
            page.isAllSelected = AllSelected;
            page.selectedIndexes = [];
            page.selectedIndexes.push(selectedIndex)
            contractSelected.pages.push(page);
        }
    }
}
$("#buttonfltr").click(function () {
    if ($(".nice-select").hasClass("open")) {
        $('.nice-select').removeClass('open');
    }
});
$('body').click(function () {
    $("#conSortByOptions").niceSelect();
});

//manoj
function checkMultipleDocumentsCounterParty(object) {
    $('#liSelectedCounterParty').empty();
    var checkboxcheck = true;
    $('input[type=checkbox][name="Counterparty"]').each(function () {
        var DocumentID = unescape(this.value);
        var duplicatechecking = false;
        var isChecked = this.checked;
        if (DocumentID != "") {
            if (isChecked) {
                if ((multipleChecksDocumentID.indexOf(DocumentID.trim())) == -1) {
                    multipleChecksDocumentID.push(DocumentID.trim());
                }
            }
            else {
                if (multipleChecksDocumentID.indexOf(DocumentID.trim()) != -1) {
                    var ind = multipleChecksDocumentID.indexOf(DocumentID.trim());
                    multipleChecksDocumentID.splice(ind, 1);
                }
                checkboxcheck = false;
            }
        }
    });
    for (var spl = 0; spl < multipleChecksDocumentID.length; spl++) {
        if (multipleChecksDocumentID[spl].trim() != "") {
            $('#liSelectedCounterParty').append('<span style="font-size:13px;">' + multipleChecksDocumentID[spl].trim() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelectedCouterParty(this);" style="float:right" /></span>');
        }
    }
    if (checkboxcheck == true) {
        $("#selectallCounterParty").prop('checked', true);
    }
    else {
        $("#selectallCounterParty").prop('checked', false);
    }
    try {
        hideAllMenuAndStopPro(event);
    }
    catch (ex) {

    }
}

function liRemoveSelectedCouterParty(obj) {
    var child = obj.parentNode;
    var child12 = child.firstChild.nodeValue;
    child12 = child12.trim();
    if (multipleChecksDocumentID.indexOf(child12) != -1) {
        var ind = multipleChecksDocumentID.indexOf(child12);
        multipleChecksDocumentID.splice(ind, 1);
    }

    var checkboxcheck = true;
    child.parentNode.removeChild(child);
    $('input[type=checkbox][name="Counterparty"]').each(function () {
        var DocumentID = unescape(this.value);
        var duplicatechecking = false;

        if (multipleChecksDocumentID.indexOf(DocumentID.trim()) > -1) {
        }
        else {
            this.checked = false;
        }
        var isChecked = this.checked;
        if (!isChecked) {
            checkboxcheck = false;
        }
    });
    if (checkboxcheck == true) {
        $("#selectallCounterParty").prop('checked', true);
    }
    else {
        $("#selectallCounterParty").prop('checked', false);
    }
}
//manoj