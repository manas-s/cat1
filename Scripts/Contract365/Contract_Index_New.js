/// <reference path="Contract_CreateContract.js" />
var vCurrencyDisplayStyle = "";
var arrUser = [];
var arrGlobalUser = [];
var arrPermsnUser = [];
var arrAdminUser = [];
var vContractID = "";
$('#nav li:has(ul)').doubleTapToGo();
var thisBusinessAreaName = "";
var thisContractAreaName = "";
var contractItem = "";
var contractAccessUsers = [];
var multipleChecksDocumentID = [];
var myCounterPartyArray = [];
var CounterPartyArrayprev = [];
var ObjectNameToSend = "";
var itemsOnpageChoosen = 0;
var RelationshipTypes = [];
$(function () {
    $("#aSearchContract").css("background-color", "#f7f7f7");
    $("#mid-section1").click(function () {
        if (!$('#user-vmenu').hide()) {
            $('#user-vmenu').hide();
        }
    })

    $('#btnCreateContract').click(function () {
        $('#btnCreateContract').popModal({
            html: $('#divToAppendCreateContract'),
            placement: 'bottomLeft',
            showCloseBut: true,
            onDocumentClickClose: true,
            onDocumentClickClosePrevent: '',
            inline: true,
            overflowContent: false
        });
    });

    //$('input:radio[name=PeoplePermissions]').change(function () {
    //    if (this.value == 'Custom') {
    //        $("#trPermReadOnly").css('display', '');
    //        $("#trPermReadWrite").css('display', '');
    //        $("#trPermFullControl").css('display', '');
    //    }
    //    else if (this.value == 'Default') {
    //        $("#trPermReadOnly").css('display', 'none');
    //        $("#trPermReadWrite").css('display', 'none');
    //        $("#trPermFullControl").css('display', 'none');
    //    }
    //});

    if (typeof localStorage.GlobalBusinessAreaLocation !== 'undefined') {
        if (localStorage.GlobalBusinessAreaLocation == "All" || localStorage.GlobalBusinessAreaLocation == "") {
            $("#heading_contracts").text("Contract Records");
            $("#qvAllContracts").css('display', 'none');
            $(".newContract1").css('display', 'none');
            $(".newContract").css('display', '');
        } else {
            //if global business area selected, do not show Create Contract menu
            $(".newContract").css('display', 'none');
            //$("#newContract1").css('display', '');

            if (localStorage.BusinessAreaAccess.indexOf(localStorage.GlobalBusinessAreaLocation) >= 0 || localStorage.UserType.indexOf("Global Contract Owner") >= 0 || localStorage.IsGeneralBusinessArea == "Yes") {
                $(".newContract1").css('display', '');
            } else { $(".newContract1").css('display', 'none'); }
            //if (arr.indexOf(item.CounterpartyName) >= 0) {
            thisContractAreaName = localStorage.GlobalBusinessAreaLocation.split('>')[0].trim();
            thisBusinessAreaName = localStorage.GlobalBusinessArea + ';' + thisContractAreaName;//Business Area +';'+ Contract Area
            $("#dashmain").attr("src", "/Content/images/icon/gen.png");
            $("#heading_contracts").text(localStorage.GlobalBusinessAreaLocation);

        }
    } else {
        $("#heading_contracts").text("Contract Records");
        $("#qvAllContracts").css('display', 'none');
        $(".newContract1").css('display', 'none');
        $(".newContract").css('display', '');
    }
});
var savedViewNameFromViewTable = "";
var listContracts = [];
$(document).ready(function () {
    $("#divBtn").hide();
    itemsOnpageChoosen = parseInt($("#paginationCh").val());
    allowOnlyNumberInInputBox("txtDuration");
    colorLink('spnMyContracts', true);
    vContractID = getParameterByName("ContractID");
    //$('#spnAllContracts').css('font-weight', 'bolder');
    //$('#spnAllContracts').css('color', 'cornflowerblue');
    $('.showtip').cluetip({ splitTitle: '|' });
    $("#sample").click(function (e) {
        e.stopPropagation();

        if (!$('#user-vmenu').hide()) {
            $('#user-vmenu').hide();
        } else {
            $('#user-vmenu').show();
        }
    })

    var ContractTypeMenuLength = 0;
    var ContractTypeItems = [];
    var MoreItemsToAppend = 0;
    var ContractIndexApprovalTextarea = new nicEditor({ buttonList: ['bold', 'italic', 'underline', 'strikethrough', 'left', 'center', 'right', 'justify', 'ol', 'ul', 'fontSize', 'fontFamily', 'fontFormat', 'removeformat', 'hr', 'indent', 'outdent', 'link', 'unlink', 'forecolor', 'bgcolor', 'xhtml'] }).panelInstance('txtComment');
    $('.nicEdit-panelContain').parent().width('100%');
    $('.nicEdit-panelContain').parent().next().width('100%');
    $('.nicEdit-main').width("99%");
    //$.ajax({

    //    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/topcontracttypes',
    //    type: 'GET',
    //    dataType: 'json',
    //    'Content-Type': 'application/json',
    //    cache: false,
    //    async:false,
    //    headers: { 'eContracts-ApiKey': localStorage.APIKey },
    //    success: function (data) {
    //        $("#btnContractTypeViewAll").css('display', '')
    //        $("#menu3").empty();
    //        ContractTypeMenuLength = data.length;

    //        if (thisContractAreaName != "") {
    //            //Get contract area settings
    //            $.ajax({
    //                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/detailsbyname?businessareaname=' + thisContractAreaName,
    //                type: 'GET',
    //                dataType: 'json',
    //                headers: { 'eContracts-ApiKey': localStorage.APIKey },
    //                async: false,
    //                success: function (data1) {
    //                    for (var i = 0; i < ContractTypeMenuLength; i++) {
    //                        var item = data[i];
    //                        if (data1.ContractType.trim().split(';').indexOf(item.ContractType) > -1) {
    //                            var myUrl = '/Contracts/CreateContract?Stage=active&ContractType=' + encodeURI(item.ContractType);
    //                            var article = '<li><a href=' + myUrl + '>' + item.ContractType + '</a></li>';
    //                            ContractTypeItems.push(item.ContractType);
    //                            if (i < 10) {
    //                                $("#menu3").append(article);
    //                            }
    //                        }
    //                    }
    //                    if (data1.ContractType == "") {
    //                        $("#menu3").append('<li style="color:red;">No Contract Type Available</li>');
    //                        $("#btnContractTypeViewAll").css('display', 'none')
    //                        }
    //                },
    //                error: function (data1) {

    //                }
    //            });

    //        } else {
    //            for (var i = 0; i < ContractTypeMenuLength; i++) {
    //                var item = data[i];
    //                var myUrl = '/Contracts/CreateContract?Stage=active&ContractType=' + encodeURI(item.ContractType);
    //                var article = '<li><a href=' + myUrl + '>' + item.ContractType + '</a></li>';
    //                ContractTypeItems.push(item.ContractType);
    //                if (i < 10) {
    //                    $("#menu3").append(article);
    //                }
    //            }
    //        }



    //    },
    //    error:
    //        function (data) {
    //           // $("#menu3").append('<li style="color:red;">No Contract Type Available</li>');
    //        }
    //});



    BindContractTypes();
    BindContractRelationships();
    //BindTemplates();
    //BindStatus();
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "3" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        $("#singleUpload").css("display", "none");
        $("#bulkUpload").css("display", "");
        $("#bulkUpload1").css("display", "");
    } else {
        $("#singleUpload").css("display", "");
        $("#bulkUpload").css("display", "none");
    }
    vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "9" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        $(".FL_Share").css('display', '');
        $(".FL_Share").addClass('Contribute');
    } else {
        $(".FL_Share").css('display', 'none');
        $(".FL_Share").removeClass('Contribute');
    }
    //CheckBulkUpload();
});

$(window).on('load', function() {
    $('.nicEdit-panelContain').parent().width('100%');
    $('.nicEdit-panelContain').parent().next().width('100%');
    $('.nicEdit-main').width("99%");
});
function BindContractTypes() {
    $("#menu3").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracttypes',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            var appendItemsToContractType = 0;
            var datalength = data.length;
            var paginationDataLength = 0;
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
                        for (var i = 0; i < datalength; i++) {
                            var item = data[i];
                            if (data1.ContractType.trim().split(';').indexOf(item.ContractType) > -1) {
                                var myUrl = '/Contracts/CreateContract?Stage=active&ContractType=' + encodeURIComponent(item.ContractType);
                                var article = '<li><a href=' + myUrl + '>' + item.ContractType + '</a></li>';

                                $("#ulAllContractTypes").append(article);

                                $("#filterContractType").append('<option value="' + item.ContractType + '" title="' + item.ContractType + '">' + item.ContractType + '</option>')


                                if (paginationDataLength < 10) {
                                    $("#menu3").append(article);
                                }

                                paginationDataLength++;
                            }
                        }

                    },
                    error: function (data1) {
                        $("#menu3").append('<li style="color:red;">No items found.</li>');
                        //                        $("#btnContractTypeViewAll").css('display', 'none')
                    }
                });
            } else {
                for (var i = 0; i < datalength; i++) {
                    var item = data[i];
                    var myUrl = '/Contracts/CreateContract?Stage=active&ContractType=' + encodeURIComponent(item.ContractType);
                    var article = '<li><a href=' + myUrl + '>' + item.ContractType + '</a></li>';

                    //$("#ulAllContractTypes").append(article);

                    $("#filterContractType").append('<option value="' + item.ContractType + '" title="' + item.ContractType + '">' + item.ContractType + '</option>')


                    //if (paginationDataLength < 10) {
                    //$("#menu3").append(article);
                    //}
                    //paginationDataLength++;
                }
                //$("#btnContractTypeViewAll").css('display', 'none');
            }


            $("#filterContractType option[value='All']").attr("selected", true);

            //if (appendItemsToContractType > 10) {
            //$("#btnContractTypeViewAll").css('display', '')
            //} else {
            //    $("#btnContractTypeViewAll").css('display', 'none')
            //}

            if (paginationDataLength == 0) {
                $("#btnContractTypeViewAll").css('display', 'none');
                $("#menu3").append('<li style="color:red;">No items found.</li>');
            } else if (paginationDataLength > 10) {
                $("#btnContractTypeViewAll").css('display', '');
            } else {
                $("#btnContractTypeViewAll").css('display', 'none');
            }

            $('#compact-pagination-ContractTypes').pagination({
                items: paginationDataLength,
                itemsOnPage: 10,
                type: 'ul',
                row: 'li',
                typeID: 'ulAllContractTypes',
                cssStyle: 'compact-theme'
            });
        },
        error:
            function (data) {
                $("#btnContractTypeViewAll").css('display', 'none');
                $("#menu3").append('<li style="color:red;">No items found.</li>');
            }
    });
}

function BindTemplates() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/getcontracttemplates',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, BusinessAreaLocation: localStorage.GlobalBusinessAreaLocation },
        success: function (data) {
            $("#menu3_template").empty();

            var datalength = data.length;
            for (var i = 0; i < datalength; i++) {
                var item = data[i];

                var myUrl = '/Contracts/CreateContract?ContractType=' + encodeURIComponent(item.ContractType) + '&ContractTemplateID=' + item.RowKey;
                var article = '<li><a href=' + myUrl + '>' + item.TemplateName + '</a></li>';

                if (i < 10) {
                    $("#menu3_template").append(article);
                }

                $("#ulAllContractTemplates").append(article);
            }

            if (data.length > 10) {
                $("#btnContractTemplatesViewAll").css('display', '');
            } else {
                $("#btnContractTemplatesViewAll").css('display', 'none');
            }

            $('#compact-pagination-ContractTemplates').pagination({
                items: data.length,
                itemsOnPage: 10,
                type: 'ul',
                row: 'li',
                typeID: 'ulAllContractTemplates',
                cssStyle: 'compact-theme'
            });
        },
        error:
            function (data) {
                $("#menu3_template").append('<li style="color:red;">No items found.</li>')
                $("#btnContractTemplatesViewAll").css('display', 'none')
            }
    });
}

function BindStatus() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/activestatuses',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: false,
        success: function (contractstatuses) {
            var datalength = contractstatuses.length;
            for (var i = 0; i < datalength; i++) {
                var item = contractstatuses[i];
                var find = " ";

                $("#filterStatus").append('<option value="' + item.ContractStatus + '" title="' + item.ContractStatus + '">' + item.ContractStatus + '</option>')
            }
            $("#filterStatus option[value='All']").attr("selected", true);
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
        autoOpen: false,
        width: "50%",
        title: "Add View",
        dialogClass: "popup_width100",
        closeText: "",
        modal: true,
        resizable: true,
        buttons: {
            "Save": function () { SaveView(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $('#btnAddView').click(function () {
        $("#txtViewID").val("");
        $("#txtViewName").val("");

        $("#addNewView").dialog("option", "title", "New View");
        $("#addNewView").dialog("open");
    });


    $('#btnNewContractCancel').click(function () {
        // $("#divToAppendCreateContract").css("cbp-hrsub nEw_ContRact2 hhide1");
        $("#divToAppendCreateContract").hide();
    });

    //var vStatus = getParameterByName('Status');
    //var vRenewal = getParameterByName('RenewalDate');

    //if (vStatus == '' && vRenewal == '') {
    //    var obj = { name: "My Contracts" };
    //    quickViewDisplay(obj)

    //    $("#filteroptiontype").css('display', 'none');
    //} else {
    //    if (vStatus != '') {
    //        var obj = { name: "My Contracts" };
    //        quickViewDisplay(obj)
    //        GetFromDashboard("My Contracts", vStatus);
    //    } else {
    //        var obj = { name: "Upcoming Renewals" };
    //        quickViewDisplay(obj)
    //        GetFromDashboard("Upcoming Renewals", vRenewal);
    //    }
    //}

    //get view names from query string
    var vViewName = getParameterByName('View');
    if (vViewName == '') {
        var obj = { name: "My Contracts" };
        quickViewDisplay(obj);
        $("#filteroptiontype").css('display', 'none');
    }
    else {
        var obj = { name: vViewName };
        quickViewDisplay(obj);
    }
    //} else if (vViewName == 'Pipeline') {
    //    var obj = { name: "Draft & New Contracts" };
    //    quickViewDisplay(obj);
    //} else if (vViewName == 'Signed') {
    //    var obj = { name: "Signed" };
    //    quickViewDisplay(obj);
    //} else if (vViewName == 'Past') {
    //    var obj = { name: "Past Contracts" };
    //    quickViewDisplay(obj);
    //} else if (vViewName == 'Active') {
    //    var obj = { name: "Active" };
    //    quickViewDisplay(obj);
    //} else if (vViewName == 'All') {
    // GetAllContracts();
    // }

    //GetSavedViews();
    //Harshitha
    GetSavedViews2();
    BindPeople();



    //Contract Type Popup
    $("#popupAllContractTypes").dialog({
        autoOpen: false,
        width: "50%",
        title: "Contract Types",
        dialogClass: "popup_width100",
        closeText: "",
        modal: true,
        resizable: true
    });

    $('#btnContractTypeViewAll').click(function () {
        $('#divToAppendCreateContract').css('display', 'none');
        $('#cbp-hrmenu > ul > li').removeClass('cbp-hropen');
        $("#popupAllContractTypes").dialog("option", "title", "Contract Types");
        $("#popupAllContractTypes").dialog("open");
    });

    //Contract Type Popup
    $("#popupAllContractTemplates").dialog({
        autoOpen: false,
        width: "50%",
        title: "Contract Templates",
        dialogClass: "popup_width100",
        closeText: "",
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
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Contract History",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "Close": function () { $(this).dialog("close"); }
        }
    });
    $("#shareContract").dialog({
        autoOpen: false,
        width: "75%",
        title: "Share Contract Record",
        dialogClass: "popup_width100",
        closeText: "",
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
            $(".addmorelinks").show();
        }
    });
    $("#allAlerts").dialog({
        autoOpen: false,
        width: "60%",
        title: "Alerts",
        dialogClass: "popup_width100",
        closeText: "",
        modal: true,
        resizable: true,
        buttons: {
            Close: function () {
                $(this).dialog("close");
            }
        }
    });
    $("#addEditStatus").dialog({
        autoOpen: false,
        width: "40%",
        minHeight: "80%",
        title: "Change Status",
        dialogClass: "popup_width100",
        closeText: "",
        modal: true,
        buttons: {
            "OK": function () { imgcheckgeneral(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
    $("#addEditPeople").dialog({
        autoOpen: false,
        width: "65%",
        title: "People and Permissions",
        dialogClass: "popup_width100",
        closeText: "",
        modal: true,
        buttons: {
            "OK": function () { if (savePeople()) { $(this).dialog("close"); } },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
    $("#popupContracts").dialog({
        autoOpen: false,
        width: "85%",
        height: "auto",
        title: "Related Contract Record(s)",
        dialogClass: "popup_width100",
        closeText: "",
        modal: true,
        buttons: {
            "OK": function () { CreateRelatedContracts(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#contractRenewal").dialog({
        autoOpen: false,
        width: "80%",
        title: "Contract Renewal",
        dialogClass: "popup_width100",
        closeText: "",
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
        autoOpen: false,
        width: "50%",
        title: "Manual Renewal",
        dialogClass: "popup_width100",
        closeText: "",
        modal: true,
        buttons: {
            "OK": function () { ManualRenewal(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#addEditStatusMultiple").dialog({
        autoOpen: false,
        width: "40%",
        minHeight: "80%",
        title: "Change Status",
        dialogClass: "popup_width100",
        closeText: "",
        modal: true,
        buttons: {
            "OK": function () { changestatusmultiple(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
    $("#addEditPeopleMultiple").dialog({
        autoOpen: false,
        width: "45%",
        title: "People",
        dialogClass: "popup_width100",
        closeText: "",
        modal: true,
        buttons: {
            "OK": function () { if (savePeopleM()) { $(this).dialog("close"); } },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#dvWorkflow").dialog({
        autoOpen: false,
        width: "70%",
        title: "Workflow",
        dialogClass: "popup_width100",
        closeText: "",
        modal: true,
        height: "auto",
        buttons: {
            "Start": function () { StartWorkflow(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $('#dialogSummary').dialog({
        autoOpen: false,
        width: "70%",
        title: 'Metadata',
        dialogClass: "popup_width100",
        closeText: "",
        modal: true,
        buttons: {
            "Close": function () {
                $(this).dialog("close");
            }
        }
    });

    $("#dvManageContractStatus").dialog({
        autoOpen: false,
        width: "60%",
        title: "Manage Contract Record Status",
        dialogClass: "popup_width100",
        closeText: "",
        buttons: {
            "OK": function () {
                ChangeContractStatus();
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        modal: true
    });

    $("#dvManageContractStatusMul").dialog({
        autoOpen: false,
        width: "60%",
        title: "Manage Contract Record Status",
        dialogClass: "popup_width100",
        closeText: "",
        buttons: {
            "OK": function () {
                changestatusmultiple();
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        modal: true
    });
    $("#aRecently").css("background-color", "#cccccc");


    $("#browseBA").dialog({
        autoOpen: false,
        width: "50%",
        title: "Users",
        dialogClass: "popup_width100",
        closeText: "",
        modal: true,
        buttons: {
            "OK": function () { ChangeBusinessAreaMultiple(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#browseCounterparty").dialog({
        autoOpen: false,
        width: "50%",
        title: "Counterparty",
        dialogClass: "popup_width100",
        closeText: "",
        modal: true,
        buttons: {
            "OK": function () { ChangeCounterpartyMultiple(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

});

$('#txtSearchBoxCP').keypress(function (e) {
    if (e.keyCode == 13) {
        $(".ui-autocomplete").css('display', 'none');
        SearchCounterparty();
    }
});


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function GetAllContracts() {
    $("#spResult").empty();
    $("#spResult1").empty();
    colorLink('spnAllContracts', true);
    colorLink('liContractViews a', false);
    colorLink('spnDraft', false);
    colorLink('spnMyContracts', false);
    colorLink('spnRecentlyActiveContracts', false);
    colorLink('spnRecentlyRenewedContracts', false);
    colorLink('spnUnassignedContracts', false);
    colorLink('spnDraftNewContracts', false);
    colorLink('spnUpcomingRenewals', false);
    colorLink('spnUpcomingExpirations', false);
    colorLink('spnRecentlyActiveRenewedContracts', false);
    colorLink('spnPastContracts', false);

    $("#btnFilter").css('display', 'inline');
    $("#dvSrhBox").css('display', '');
    $("#showAll").css('display', 'inline');
    $("#showAll").text('Showing All Contract Records');
    //$("#liFiltersSearchText").empty();
    //$("#liFiltersStatus").empty();
    //$("#liFiltersType").empty();

    //$("#filterStatus option:selected").prop('selected', false);
    //$("#filterContractType option:selected").prop('selected', false);
    //$("#filterStatus option[value='All']").attr("selected", true);
    //$("#filterContractType option[value='All']").attr("selected", true);
    clearFilterSelection();
    $('#tdSort a').each(function (i, item) {
        item.style.backgroundColor = "";
    });

    $("#liFiltersQuickView").empty();
    $('#liFiltersQuickView').html('<span>Showing search result for : <small>All Contracts<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');

    // $('#liFiltersQuickView').html('<li style="display:inline; color:#ffffff;">' + 'Showing search result for : All Contracts<img title="Remove" onclick="javascript:liRemove(this);" style="margin-left: 5px; margin-right: 10px; cursor:pointer;" src="../Content/Images/icon/close.png" /></li>');
    $('#liFiltersQuickView').css('display', 'none');

    $("#btnAddView").css('display', 'none');

    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
    $('#listContracts1').html('<img src="../Content/Images/icon/loading.gif">');
    var baname = ";";
    if (thisBusinessAreaName == "" || thisBusinessAreaName == "All") {
    } else {
        baname = thisBusinessAreaName;
    }

    //$.ajax({
    //    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?stage=&sortbyfield=Timestamp&orderby=DESC',
    //    type: 'GET',
    //    dataType: 'json',
    //    'Content-Type': 'application/json',
    //    cache: false,
    //    headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessAreaLocation: localStorage.GlobalBusinessAreaLocation },
    //    success: function (data) {
    //        $("#compact-pagination").css('display', '');
    //        $('#listContracts').empty();               
    //        GetData(data);
    //        $(".openmenu").contextMenu({ menu: 'myMenu', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("i").parent("p").parent("li"), pos); });

    //    },
    //    error:
    //        function (data) {
    //            $('#listContracts').empty();
    //            $("#listContracts").append("<p class='f_p-error'>No items available in this view.</p>");
    //            $("#compact-pagination").css('display', 'none');
    //        }
    //});
    applyFilter();
    BindContractStatusFilter("All Contracts")
    $("#filteroptiontype").css('display', '');
    $("#filteroptionstatus").css('display', '');
    $("#filteroptiondates").css('display', 'none');
    $("#filteroption1").css('display', 'none');
    $("#filteroptionrenewdates").css('display', 'none');
    $("#btnAddView").css('display', 'none');
}

function GetSavedViews() {
    $('#liContractViews').empty();
    //Get Contract views
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/savedview?viewfor=Contract&userid=',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $("#divChkSelectAll").css('display', '');
            $("#liContractViews").empty();
            $("#divChkSelectAll1").css('display', '');
            $("#liContractViews1").empty();

            var datalength = data.length;
            for (var i = 0; i < datalength; i++) {
                var item = data[i];
                var removeBtn = '';
                if (localStorage.UserType.indexOf("Global Contract Owner") >= 0 || localStorage.UserType.indexOf("Global Administrator") >= 0 || localStorage.UserName == item.CreatedBy)
                    removeBtn = '<a href="javascript:void(0);"><img title="Delete" src="../Content/Images/close-quick.png" onclick="deleteSavedView(this)" id=' + item.RowKey + ' /></a>';
                var article = '<li><p><a href="javascript:void(0)" onclick="javascript:savedViewDisplay(this)" id="' + item.RowKey + '" name="' + item.ViewName + '">' + item.ViewName + '</a></p>' + removeBtn + '</li>';
                $("#liContractViews").append(article);
            }
        },
        error:
            function (data) {
                $('#liContractViews').empty();
                $("#liContractViews").append('<p class="f_p-error">No items found.</p>');
                $("#divChkSelectAll").css('display', 'none');
                $('#liContractViews1').empty();
                $("#liContractViews1").append('<p class="f_p-error">No items found.</p>');
                $("#divChkSelectAll1").css('display', 'none');
            }
    });
}
function deleteSavedView(n) {
    var viewName = $("#" + n.id).attr('name');
    swal({
        title: '',
        text: "Are you sure that you want to <span style=\"font-weight:700\">delete</span> this view?",
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
                //  alert(data);
                swal("", data);
                //GetSavedViews();
                //Harshitha
                GetSavedViews2();
            }
        });
    }
    return;
});

    //if (confirm("Are you sure that you want to delete this view?")) {
    //    var viewId = n.id;
    //    $.ajax({
    //        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/savedview?viewid=' + viewId,
    //        type: 'DELETE',
    //        dataType: 'json',
    //        headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
    //        cache: false,
    //        success: function (data) {
    //            alert(data);
    //            GetSavedViews();
    //        }
    //    });
    //}

}
function GetSavedViews2() {
    $('#liContractViews').empty();
    //Get Contract views
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/savedview?viewfor=Contract&userid=',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $("#divChkSelectAll").css('display', '');
            $("#liContractViews").empty();
            $("#divChkSelectAll1").css('display', '');
            $("#liContractViews1").empty();
            var datalength = data.length;
            for (var i = 0; i < datalength; i++) {
                var item = data[i];
                var removeBtn = '';
                if (localStorage.UserType.indexOf("Global Contract Owner") >= 0 || localStorage.UserType.indexOf("Global Administrator") >= 0 || localStorage.UserName == item.CreatedBy)
                    removeBtn = '<img title="Delete" style="padding-right: 2px;" src="../Content/Images/close-quick.png" onclick="deleteSavedView(this)" id=' + item.RowKey + ' />';
                var article = '<li><p><a href="javascript:void(0)" onclick="javascript:savedViewDisplay(this)" id="' + item.RowKey + '" name="' + item.ViewName + '">' + removeBtn + item.ViewName + '</a></p></li>';
                $("#liContractViews").append(article);
            }
        },
        error:
            function (data) {
                $('#liContractViews').empty();
                $("#liContractViews").append('<p class="f_p-error">No items found.</p>');
                $("#divChkSelectAll").css('display', 'none');
                $('#liContractViews1').empty();
                $("#liContractViews1").append('<p class="f_p-error">No items found.</p>');
                $("#divChkSelectAll1").css('display', 'none');
            }
    });
}
function GetData(data) {
    var resultfound = true;

    if (data.length == 0) {
        resultfound = false;
        $('#listContracts').empty();
        $("#listContracts").append("<p class='f_p-error'>No items found.</p>");
        $("#compact-pagination").css('display', 'none');
        $("#divChkSelectAll").css('display', 'none');


    } else {
        listContracts = data;
        CreateContractList(0);
        $('#compact-pagination').pagination({
            items: data.length,
            itemsOnPage: 20,
            type: 'ul',
            row: 'li',
            typeID: 'listContracts',
            cssStyle: 'compact-theme',
            listname: 'Contracts'
        });
        $("#divChkSelectAll").css('display', '');
    }
    return resultfound;
}
function GetData2(data) {
    var resultfound = true;

    if (data.length == 0) {
        resultfound = false;
        $('#listContracts1').empty();
        $("#listContracts1").append("<p class='f_p-error'>No items found.</p>");
        $("#compact-pagination1").css('display', 'none');
        $("#divChkSelectAll1").css('display', 'none');
    } else {
        listContracts = data;
        CreateContractList2(0);
        $('#compact-pagination1').pagination({
            items: data.length,
            itemsOnPage: 20,
            type: 'table',
            row: 'tr',
            typeID: 'listContracts1',
            cssStyle: 'compact-theme',
            listname: 'Contracts2'
        });
        $("#divChkSelectAll1").css('display', '');

    }
    return resultfound;
}

function changeView() {
    var ele = $(".activeTab");
    if (typeof ($(ele)[0]) != "undefined") {
        var idcur = $(ele)[0].id;
        if (idcur == "NewDiv")
        {
            $("#InitialDiv").addClass("activeTab");
            $("#NewDiv").removeClass("activeTab");
            $("#NewDiv").css("display","none");
            $("#InitialDiv").css("display", "");
        }
        else
        {
            $("#NewDiv").addClass("activeTab");
            $("#InitialDiv").removeClass("activeTab");
            $("#InitialDiv").css("display", "none");
            $("#NewDiv").css("display", "");
        }
    }

}
function paginationChange() {
    itemsOnpageChoosen = parseInt($("#paginationCh").val());
    var length = parseInt($("#spResultCount").text());
    if (typeof (itemsOnpageChoosen) != "undefined" && itemsOnpageChoosen != 0) {
        CreateContractList(0);
        $('#compact-pagination').pagination({
            items: length,
            itemsOnPage: itemsOnpageChoosen,
            type: 'ul',
            row: 'li',
            typeID: 'listContracts',
            cssStyle: 'compact-theme',
            listname: 'Contracts'
        });
        $("#divChkSelectAll").css('display', '');
        CreateContractList2(0);
        $('#compact-pagination1').pagination({
            items: length,
            itemsOnPage: itemsOnpageChoosen,
            type: 'table',
            row: 'tr',
            typeID: 'listContracts1',
            cssStyle: 'compact-theme',
            listname: 'Contracts2'
        });
        $("#divChkSelectAll1").css('display', '');
    }
}
$("#SelectAll").hide();
$("#SelectAllSpan").hide();
$('#SelectAll').attr('checked', false);

function CreateContractList(page) {
    $("#SelectAll").show();
    $("#SelectAllSpan").show();
    $(".drop_a").hide();
    multipleChecks = "";
    multipleChecksPermission = "";
    var startIndex = page * itemsOnpageChoosen;
    var endIndex = startIndex + itemsOnpageChoosen;
    if (endIndex > listContracts.length) endIndex = listContracts.length;
    $("#spResult").html((startIndex + 1) + '&nbsp;to&nbsp;' + endIndex + '&nbsp;of&nbsp;' + listContracts.length);
    $("#spResultCount").text(listContracts.length);
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
    $('#SelectAll').attr('checked', false);
    for (var j = startIndex; j < endIndex; j++) {

        var item = listContracts[j];
        if (item != null) {
            var vPermission = 'openmenuView';
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

            var myUrl = '/Contracts/ContractDetails?ContractID=' + encodeURI(item.RowKey) + "&View=" + ObjectNameToSend;

            var vContractNumber = '';
            if (item.ContractNumber == null || item.ContractNumber == "") {
                vContractNumber = 'No Contract Record Number';
            } else {
                vContractNumber = item.ContractNumber;
            }
            var vQuickActions = '';
            var article = '';


            //if (i < 2) {

            article = '<li>';



            article += '<p id="ContractID" style="display:none;">' + item.RowKey + '</p>';
            article += '<p id="ContractTitle" style="display:none;" class="PreserveSpace">' + item.ContractTitle + '</p>';
            article += '<p id="ContractType" style="display:none;">' + item.ContractType + '</p>';
            article += '<p id="ContractArea" style="display:none;">' + item.ContractArea + '</p>';
            article += '<p id="BusinessArea" style="display:none;">' + item.BusinessArea + '</p>';
            article += '<p id="BusinessAreaPath" style="display:none;">' + item.BusinessAreaPath + '</p>';
            article += '<p id="ApprovalWorkflow" style="display:none;">' + item.ApprovalWorkflow + '</p>';
            article += '<p id="Status" style="display:none;">' + item.Status + '</p>';
            article += '<p id="Permission" style="display:none;">' + vPermission + '</p>';
            article += '<p id="ContractValue" style="display:none;">' + item.ContractValue + '</p>';
            article += '<p id="ContractCurrency" style="display:none;">' + item.ContractCurrency + '</p>';
            article += '<p id="ContractPricingType" style="display:none;">' + item.ContractPricingType + '</p>';
            article += '<p id="PaymentType" style="display:none;">' + item.PaymentType + '</p>';
            article += '<p id="BillingFrequency" style="display:none;">' + item.BillingFrequency + '</p>';
            article += '<p id="StartDate" style="display:none;">' + item.StartDate + '</p>';
            article += '<p id="EndDate" style="display:none;">' + item.EndDate + '</p>';
            article += '<p id="TermEndDate" style="display:none;">' + item.TermEndDate + '</p>';
            article += '<p id="Extendable" style="display:none;">' + item.Extendable + '</p>';
            article += '<p id="Renewable" style="display:none;">' + item.Renewable + '</p>';
            article += '<p id="BaseContractValue" style="display:none;">' + item.BaseContractValue + '</p>';
            article += '<p id="BaseContractValueCurrency" style="display:none;">' + item.BaseContractValueCurrency + '</p>';
            article += '<p>';

            if (item.InRecycleBin == "Yes") {
                article += '<i>';
                article += '<b title="In Recycle Bin" class="status_blue"><img src="../Content/Images/status/recycle-bin.png"/>Recy</b>';

            } else {

                var vContVisibility = '';
                if (item.CustomPermission == "Yes") {
                    vContVisibility = '<img src="../Content/Images/cont_confd.png" title="Confidential" />';
                } else if (item.IsPublic == "Yes") {
                    vContVisibility = '<img src="../Content/Images/cont_public.png" title="Public" />';
                }

                article += '<input class="margin-Top10 margin-right" name="ContRec" type="checkbox" value="" onclick="checkMultipleContracts(this);" id="' + item.RowKey + '"  /><i>';


                if (item.Status == "New") {
                    article += '<b title="New" class="status_green_another"><img src="../Content/Images/status/new.png"/>new</b>';
                    if (vPermission == 'openmenuContribute' || vPermission == 'openmenu') {
                        vQuickActions += '<a href="/Contracts/EditContract?ContractID=' + item.RowKey + '&ContractType=' + encodeURIComponent(item.ContractType) + '"><img title="Edit Metadata" src="../Content/Images/action/edit-metadata.png"/></a>';
                        vQuickActions += '<a href="javascript:void(0)" onclick="OpenContractApproval(\'' + item.ApprovalWorkflow + '\', \'' + item.ContractTitle + '\', \'' + item.RowKey + '\', \'' + item.BusinessArea + '\', \'' + item.ContractArea + '\', \'' + item.BusinessAreaPath + '\');"><img title="Start Approval Workflow" src="../Content/Images/action/Start-Approval-workflow.png"/></a>';
                    }
                }
                else if (item.Status == "Awaiting Review") {
                    article += '<b title="Awaiting Review" class="status_yellow"><img src="../Content/Images/status/renew.png"/>rev</b>';
                    vQuickActions += '<a href="' + myUrl + '&Tab=Activity"><img title="Check Activity Status" src="../Content/Images/action/check-activity-status.png"/></a>';
                    if (vPermission == 'openmenu')
                        vQuickActions += '<a href="javascript:void(0)" onclick="ManageContractPeople(\'' + item.RowKey + '\');"><img title="Manage People" src="../Content/Images/action/manage-people.png"/></a>';
                }
                else if (item.Status == "Reviewed") {
                    article += '<b title="Reviewed" class="status_blue"><img src="../Content/Images/status/tick.png"/>rev</b>';
                    if (vPermission == 'openmenuContribute' || vPermission == 'openmenu') {
                        vQuickActions += '<a href="javascript:void(0)" onclick="OpenContractApproval(\'' + item.ApprovalWorkflow + '\', \'' + item.ContractTitle + '\', \'' + item.RowKey + '\', \'' + item.BusinessArea + '\', \'' + item.ContractArea + '\', \'' + item.BusinessAreaPath + '\');"><img title="Start Approval Workflow" src="../Content/Images/action/Start-Approval-workflow.png"/></a>';
                        vQuickActions += '<a href="javascript:void(0)" onclick="ManageContractStatus(\'' + item.RowKey + '\',\'' + item.Status + '\');"><img title="Manage Status" src="../Content/Images/action/manage-status.png"/></a>';
                    }
                }
                else if (item.Status == "Awaiting Approval") {
                    article += '<b title="Awaiting Approval" class="status_yellow"><img src="../Content/Images/status/renew.png"/>appr</b>';
                    vQuickActions += '<a href="' + myUrl + '&Tab=Activity"><img title="Check Activity Status" src="../Content/Images/action/check-activity-status.png"/></a>';
                    if (vPermission == 'openmenu')
                        vQuickActions += '<a href="javascript:void(0)" onclick="ManageContractPeople(\'' + item.RowKey + '\');"><img title="Manage People" src="../Content/Images/action/manage-people.png"/></a>';
                }
                else if (item.Status == "Approved") {
                    article += '<b title="Approved" class="status_blue"><img src="../Content/Images/status/tick.png"/>appr</b>';
                    vQuickActions += '<a href="javascript:void(0)" onclick="OpenContractShare(\'' + item.RowKey + '\',\'' + item.ContractTitle + '\');"><img title="Share Contract Record" src="../Content/Images/CM_share_contract.png"/></a>';
                    if (vPermission == 'openmenuContribute' || vPermission == 'openmenu')
                        vQuickActions += '<a href="javascript:void(0)" onclick="ManageContractStatus(\'' + item.RowKey + '\',\'' + item.Status + '\');"><img title="Manage Status" src="../Content/Images/action/manage-status.png"/></a>';
                }
                else if (item.Status == "In Negotiation") {
                    article += '<b title="In Negotiation" class="status_yellow"><img src="../Content/Images/status/renew.png"/>nego</b>';
                    vQuickActions += '<a href="' + myUrl + '&Tab=Activity"><img title="Check Activity Status" src="../Content/Images/action/check-activity-status.png"/></a>';
                    vQuickActions += '<a href="' + myUrl + '&Tab=Notes"><img title="View Notes" src="../Content/Images/action/view-notes.png"/></a>';
                }
                else if (item.Status == "Negotiation Complete") {
                    article += '<b title="Negotiation Complete" class="status_blue"><img src="../Content/Images/status/tick.png"/>nego</b>';
                    if (vPermission == 'openmenuContribute' || vPermission == 'openmenu')
                        vQuickActions += '<a href="javascript:void(0)" onclick="ManageContractStatus(\'' + item.RowKey + '\',\'' + item.Status + '\');"><img title="Manage Status" src="../Content/Images/action/manage-status.png"/></a>';
                    vQuickActions += '<a href="javascript:void(0)" onclick="CreateContractActivityList(\'' + item.RowKey + '\');"><img title="View History" src="../Content/Images/action/View-History.png"/></a>';
                }
                else if (item.Status == "Ready for Signature") {
                    article += '<b title="Ready for Signature" class="status_green"><img src="../Content/Images/status/active.png"/>Sign</b>';
                    vQuickActions += '<a href="' + myUrl + '&Tab=Activity"><img title="Check Activity Status" src="../Content/Images/action/check-activity-status.png"/></a>';
                    if (vPermission == 'openmenuContribute' || vPermission == 'openmenu')
                        vQuickActions += '<a href="javascript:void(0)" onclick="ManageContractStatus(\'' + item.RowKey + '\',\'' + item.Status + '\');"><img title="Manage Status" src="../Content/Images/action/manage-status.png"/></a>';
                }
                else if (item.Status == "Awaiting Signatures") {
                    article += '<b title="Awaiting Signatures" class="status_yellow"><img src="../Content/Images/status/renew.png"/>Sign</b>';
                    vQuickActions += '<a href="' + myUrl + '&Tab=Activity"><img title="Check Activity Status" src="../Content/Images/action/check-activity-status.png"/></a>';
                    if (vPermission == 'openmenuContribute' || vPermission == 'openmenu')
                        vQuickActions += '<a href="javascript:void(0)" onclick="ManageContractStatus(\'' + item.RowKey + '\',\'' + item.Status + '\');"><img title="Manage Status" src="../Content/Images/action/manage-status.png"/></a>';
                }
                else if (item.Status == "Signed") {
                    article += '<b title="Signed" class="status_blue"><img src="../Content/Images/status/tick.png"/>Sign</b>';
                    if (vPermission == 'openmenuContribute' || vPermission == 'openmenu')
                        vQuickActions += '<a href="javascript:void(0)" onclick="ManageContractStatus(\'' + item.RowKey + '\',\'' + item.Status + '\');"><img title="Manage Status" src="../Content/Images/action/manage-status.png"/></a>';
                    if (vPermission == 'openmenu')
                        vQuickActions += '<a href="javascript:void(0)" onclick="ManageContractTerm(\'' + item.RowKey + '\');"><img title="Manage Term & Renewals" src="../Content/Images/action/manage-term-renewal.png"/></a>';
                }
                else if (item.Status == "Active") {
                    article += '<b title="Active" class="status_green"><img src="../Content/Images/status/active.png"/>actv</b>';
                    vQuickActions += '<a href="javascript:void(0)" onclick="ViewContractMetaData(\'' + item.RowKey + '\');"><img title="View Metadata" src="../Content/Images/action/view-metadata.png"/></a>';
                    if (vPermission == 'openmenu')
                        vQuickActions += '<a href="javascript:void(0)" onclick="ManageContractTerm(\'' + item.RowKey + '\');"><img title="Manage Term & Renewals" src="../Content/Images/action/manage-term-renewal.png"/></a>';
                }
                else if (item.Status == "Up for Renewal") {
                    article += '<b title="Up for Renewal" class="status_red"><img src="../Content/Images/status/exp.png"/>renw</b>';
                    vQuickActions += '<a href="javascript:void(0)" onclick="ManageContractTerm(\'' + item.RowKey + '\');"><img title="Manage Term & Renewals" src="../Content/Images/action/manage-term-renewal.png"/></a>';
                    vQuickActions += '<a href="javascript:void(0)" onclick="ManageContractStatus(\'' + item.RowKey + '\',\'' + item.Status + '\');"><img title="Manage Status" src="../Content/Images/action/manage-status.png"/></a>';
                }
                else if (item.Status == "About to Expire") {
                    article += '<b title="About to Expire" class="status_red"><img src="../Content/Images/status/exp.png"/>exp</b>';
                    if (vPermission == 'openmenu')
                        vQuickActions += '<a href="javascript:void(0)" onclick="ManageContractTerm(\'' + item.RowKey + '\');"><img title="Manage Term & Renewals" src="../Content/Images/action/manage-term-renewal.png"/></a>';
                    if (vPermission == 'openmenuContribute' || vPermission == 'openmenu')
                        vQuickActions += '<a href="javascript:void(0)" onclick="ManageContractStatus(\'' + item.RowKey + '\',\'' + item.Status + '\');"><img title="Manage Status" src="../Content/Images/action/manage-status.png"/></a>';
                }
                else if (item.Status == "Expired") {
                    article += '<b title="Expired" class="status_Gray"><img src="../Content/Images/status/expried.png"/>exp</b>';
                    if (vPermission == 'openmenu') {
                        vQuickActions += '<a href="javascript:void(0)"><img title="Tag to Replaced / Related Contract" src="../Content/Images/action/tag-to-replace.png"/></a>';
                        vQuickActions += '<a href="javascript:void(0)" onclick="ManageRelatedContracts(\'' + item.RowKey + '\',\'' + item.ContractTitle + '\', \'' + item.BusinessAreaPath + '\');"><img title="Tag to Replaced / Related Contract" src="../Content/Images/action/tag-to-replace.png"/></a>';
                    }
                }
                else if (item.Status == "On Hold") {
                    article += '<b title="On Hold" class="status_red"><img src="../Content/Images/status/exp.png"/>hold</b>';
                    if (vPermission == 'openmenu')
                        vQuickActions += '<a href="javascript:void(0)" onclick="ManageContractTerm(\'' + item.RowKey + '\');"><img title="Manage Term & Renewals" src="../Content/Images/action/manage-term-renewal.png"/></a>';
                    if (vPermission == 'openmenuContribute' || vPermission == 'openmenu')
                        vQuickActions += '<a href="javascript:void(0)" onclick="ManageContractStatus(\'' + item.RowKey + '\',\'' + item.Status + '\');"><img title="Manage Status" src="../Content/Images/action/manage-status.png"/></a>';
                }
                else if (item.Status == "Replaced") {
                    article += '<b title="Replaced" class="status_Gray"><img src="../Content/Images/status/replace.png"/>rep</b>';
                    if (vPermission == 'openmenuContribute' || vPermission == 'openmenu')
                        vQuickActions += '<a href="javascript:void(0)" onclick="ManageContractStatus(\'' + item.RowKey + '\',\'' + item.Status + '\');"><img title="Manage Status" src="../Content/Images/action/manage-status.png"/></a>';
                    if (vPermission == 'openmenu')
                        vQuickActions += '<a href="javascript:void(0)" onclick="ManageContractTerm(\'' + item.RowKey + '\');"><img title="Manage Term & Renewals" src="../Content/Images/action/manage-term-renewal.png"/></a>';
                }
                else if (item.Status == "Cancelled") {
                    article += '<b title="Cancelled" class="status_Gray"><img src="../Content/Images/status/close.png"/>canc</b>';
                    vQuickActions += '<a href="javascript:void(0)" onclick="CreateContractActivityList(\'' + item.RowKey + '\');"><img title="View History" src="../Content/Images/action/View-History.png"/></a>';
                    if (vPermission == 'openmenuContribute' || vPermission == 'openmenu')
                        vQuickActions += '<a href="javascript:void(0)" onclick="ManageContractStatus(\'' + item.RowKey + '\',\'' + item.Status + '\');"><img title="Manage Status" src="../Content/Images/action/manage-status.png"/></a>';
                }
                    //else if (item.Status == "Terminated") {
                    //    article += '<b title="Terminated" class="status_Gray"><img src="../Content/Images/status/close.png"/>term</b>';
                    //    vQuickActions += '<a href="javascript:void(0)"><img title="Edit Metadata" src="../Content/Images/action/edit-metadata.png"/></a>';
                    //    vQuickActions += '<a href="javascript:void(0)"><img title="Start Approval Workflow" src="../Content/Images/action/Start-Approval-workflow.png"/></a>';
                    //}
                else if (item.Status == "Archived") {
                    article += '<b title="Archived" class="status_blue"><img src="../Content/Images/status/archive.png"/>ARCH</b>';
                    vQuickActions += '<a href="javascript:void(0)" onclick="CreateContractActivityList(\'' + item.RowKey + '\');"><img title="View History" src="../Content/Images/action/View-History.png"/></a>';
                    if (vPermission == 'openmenu')
                        vQuickActions += '<a href="javascript:void(0)" onclick="DeleteContract(\'' + item.ContractTitle + '\',\'' + item.RowKey + '\');"><img title="Delete Contract Record" src="../Content/Images/action/Delete-Contract.png"/></a>';
                }
                else {
                    if (item.Status == "0" || item.Status == "" || item.Status == "undefined") {
                        article += '<b title="Not Assigned" class="status_red"><img src="../Content/Images/status/new.png"/>not</b>';
                        if (vPermission == 'openmenuContribute' || vPermission == 'openmenu') {
                            vQuickActions += '<a href="/Contracts/EditContract?ContractID=' + item.RowKey + '&ContractType=' + encodeURIComponent(item.ContractType) + '"><img title="Edit Metadata" src="../Content/Images/action/edit-metadata.png"/></a>';
                            vQuickActions += '<a href="javascript:void(0)" onclick="OpenContractApproval(\'' + item.ApprovalWorkflow + '\', \'' + item.ContractTitle + '\', \'' + item.RowKey + '\', \'' + item.BusinessArea + '\', \'' + item.ContractArea + '\', \'' + item.BusinessAreaPath + '\');"><img title="Start Approval Workflow" src="../Content/Images/action/Start-Approval-workflow.png"/></a>';
                        }

                    } else {
                        article += '<b title="' + item.Status + '" class="status_red"><img src="../Content/Images/status/new.png"/>hold</b>';
                        if (vPermission == 'openmenuContribute' || vPermission == 'openmenu') {
                            vQuickActions += '<a href="/Contracts/EditContract?ContractID=' + item.RowKey + '&ContractType=' + encodeURIComponent(item.ContractType) + '"><img title="Edit Metadata" src="../Content/Images/action/edit-metadata.png"/></a>';
                            vQuickActions += '<a href="javascript:void(0)" onclick="OpenContractApproval(\'' + item.ApprovalWorkflow + '\', \'' + item.ContractTitle + '\', \'' + item.RowKey + '\', \'' + item.BusinessArea + '\', \'' + item.ContractArea + '\', \'' + item.BusinessAreaPath + '\');"><img title="Start Approval Workflow" src="../Content/Images/action/Start-Approval-workflow.png"/></a>';
                        }
                    }
                }
            }
            if (item.InRecycleBin == "Yes") {
                article += item.ContractTitle;
            } else {
                article += ' <a href="' + myUrl + '" class="PreserveSpace">' + item.ContractTitle + '</a>' + vContVisibility;
            }
            article += '<small>' + vContractNumber + ' | ' + item.ContractType;
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
            article += '</small></i>';
            article += '</p>';
            article += '<div class="cont_Rig-opt">';
            article += vQuickActions;
            article += '<a class="margin-top6 ' + vPermission + '" href="javascript:void(0)"><img src="../Content/Images/action/arrow.png"/></a>';
            article += '</div>';


            //}
            //else {
            //    article = '<article class="box1" style="display:none;">';
            //}
            contractTags.push(item.ContractTitle);
            //article += '<span>&nbsp;</span>';
            //article += '<p id="ContractID" style="display:none;">' + item.RowKey + '</p>';
            //article += '<p id="ContractTitle" style="display:none;">' + item.ContractTitle + '</p>';
            //article += '<p id="ContractType" style="display:none;">' + item.ContractType + '</p>';
            //article += '<p id="ContractArea" style="display:none;">' + item.ContractArea + '</p>';
            //article += '<p id="BusinessArea" style="display:none;">' + item.BusinessArea + '</p>';
            //article += '<p id="BusinessAreaPath" style="display:none;">' + item.BusinessAreaPath + '</p>';
            //article += '<p id="ApprovalWorkflow" style="display:none;">' + item.ApprovalWorkflow + '</p>';
            //article += '<p id="Status" style="display:none;">' + item.Status + '</p>';
            //article += '<p id="ContractValue" style="display:none;">' + item.ContractValue + '</p>';
            //article += '<p id="ContractCurrency" style="display:none;">' + item.ContractCurrency + '</p>';
            //article += '<p id="ContractPricingType" style="display:none;">' + item.ContractPricingType + '</p>';
            //article += '<p id="PaymentType" style="display:none;">' + item.PaymentType + '</p>';
            //article += '<p id="BillingFrequency" style="display:none;">' + item.BillingFrequency + '</p>';
            //article += '<p id="StartDate" style="display:none;">' + item.StartDate + '</p>';
            //article += '<p id="EndDate" style="display:none;">' + item.EndDate + '</p>';
            //article += '<p id="TermEndDate" style="display:none;">' + item.TermEndDate + '</p>';
            //article += '<p id="Extendable" style="display:none;">' + item.Extendable + '</p>';
            //article += '<p id="Renewable" style="display:none;">' + item.Renewable + '</p>';
            //article += '<p id="BaseContractValue" style="display:none;">' + item.BaseContractValue + '</p>';
            //article += '<p id="BaseContractValueCurrency" style="display:none;">' + item.BaseContractValueCurrency + '</p>';
            //if (item.InRecycleBin == "Yes") {
            //    article += '<p class="margin-left-20"><i>' + item.ContractTitle + '';
            //} else {
            //    article += '<p> <input name="" type="checkbox" onclick="checkMultipleContracts(this);" id=' + item.RowKey + ' value="" /><i><a href=' + myUrl + '>' + item.ContractTitle + '</a><img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="' + vPermission + '" />';
            //}

            //article += '<small>' + vContractNumber + ' | ' + item.ContractType;// + ' | ' + item.Permission;
            //if (sortby != '') {
            //    if (item[sortby] != null || item[sortby] != "") {
            //        if (fieldType == 'date') {
            //            if (typeof item[sortby] != 'undefined' && item[sortby] != null) {
            //                article += ' | ' + moment(new Date(item[sortby])).format('MM/DD/YYYY') + '</small>';
            //            }
            //        }
            //        else {
            //            article += ' | ' + item[sortby] + '</small>';
            //        }
            //    }
            //}
            //else {
            //    article += '</small>';
            //}
            //article += '</i></p>';
            //if (item.InRecycleBin == "Yes") {
            //    article += '<b class="status_blue">In Recycle Bin</b>';
            //} else {
            //    if (item.Status == "New") {
            //        article += '<b class="status_yellow">' + item.Status + '</b>';
            //    }
            //    else if (item.Status == "Drafting") {
            //        article += '<b class="status_yellow">' + item.Status + '</b>';
            //    }
            //    else if (item.Status == "Awaiting Review") {
            //        article += '<b class="status_yellow">' + item.Status + '</b>';
            //    }
            //    else if (item.Status == "Awaiting Approval") {
            //        article += '<b class="status_yellow">' + item.Status + '</b>';
            //    }
            //    else if (item.Status == "In Negotiation") {
            //        article += '<b class="status_yellow">' + item.Status + '</b>';
            //    }
            //    else if (item.Status == "Awaiting Signatures") {
            //        article += '<b class="status_yellow">' + item.Status + '</b>';
            //    }
            //    else if (item.Status == "Signed") {
            //        article += '<b class="status_green">' + item.Status + '</b>';
            //    }
            //    else if (item.Status == "Active") {
            //        article += '<b class="status_green">' + item.Status + '</b>';
            //    }
            //    else if (item.Status == "Up for Renewal") {
            //        article += '<b class="status_red">' + item.Status + '</b>';
            //    }
            //    else if (item.Status == "Renewed") {
            //        article += '<b class="status_green">' + item.Status + '</b>';
            //    }
            //    else if (item.Status == "Extended") {
            //        article += '<b class="status_green">' + item.Status + '</b>';
            //    }
            //    else if (item.Status == "On Hold") {
            //        article += '<b class="status_yellow">' + item.Status + '</b>';
            //    }
            //    else if (item.Status == "Replaced") {
            //        article += '<b class="status_blue">' + item.Status + '</b>';
            //    }
            //    else if (item.Status == "Expired") {
            //        article += '<b class="status_blue">' + item.Status + '</b>';
            //    }
            //    else if (item.Status == "Cancelled") {
            //        article += '<b class="status_blue">' + item.Status + '</b>';
            //    }
            //    else if (item.Status == "Terminated") {
            //        article += '<b class="status_blue">' + item.Status + '</b>';
            //    }
            //    else if (item.Status == "Archived") {
            //        article += '<b class="status_blue">' + item.Status + '</b>';
            //    }
            //    else {
            //        if (item.Status == "0" || item.Status == "" || item.Status == "undefined") {
            //            article += '<b class="status_red">Not Assigned</b>';

            //        } else {
            //            article += '<b class="status_red">' + item.Status + '</b>';
            //        }
            //    }
            //}
            article += '</li>';
            $("#listContracts").append(article);

            resultfound = true;

        }

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

function CreateContractList2(page) {
    $("#SelectAll1").show();

    $(".drop_a").hide();
    multipleChecks = "";
    multipleChecksPermission = "";
   
    var startIndex = page * itemsOnpageChoosen;
    var endIndex = startIndex + itemsOnpageChoosen;
    if (endIndex > listContracts.length) endIndex = listContracts.length;
    $("#spResult1").html((startIndex + 1) + '&nbsp;to&nbsp;' + endIndex + '&nbsp;of&nbsp;' + listContracts.length);
    $("#spResultCount").text(listContracts.length);
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
    $("#listContracts1").empty();
    $('#SelectAll1').attr('checked', false);
    for (var j = startIndex; j < endIndex; j++) {

        var item = listContracts[j];
        if (item != null) {
            var vPermission = 'openmenuView';
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

            var myUrl = '/Contracts/ContractDetails?ContractID=' + encodeURI(item.RowKey) + "&View=" + ObjectNameToSend;

            var vContractNumber = '';
            if (item.ContractNumber == null || item.ContractNumber == "") {
                vContractNumber = 'No Contract Record Number';
            } else {
                vContractNumber = item.ContractNumber;
            }
            var vQuickActions = '';
            var article = '';
            var status = '';

            //if (i < 2) {

            article = '<tr>';



            article += '<p id="ContractID" style="display:none;">' + item.RowKey + '</p>';
            article += '<p id="ContractTitle" style="display:none;" class="PreserveSpace">' + item.ContractTitle + '</p>';
            article += '<p id="ContractType" style="display:none;">' + item.ContractType + '</p>';
            article += '<p id="ContractArea" style="display:none;">' + item.ContractArea + '</p>';
            article += '<p id="BusinessArea" style="display:none;">' + item.BusinessArea + '</p>';
            article += '<p id="BusinessAreaPath" style="display:none;">' + item.BusinessAreaPath + '</p>';
            article += '<p id="ApprovalWorkflow" style="display:none;">' + item.ApprovalWorkflow + '</p>';
            article += '<p id="Status" style="display:none;">' + item.Status + '</p>';
            article += '<p id="Permission" style="display:none;">' + vPermission + '</p>';
            article += '<p id="ContractValue" style="display:none;">' + item.ContractValue + '</p>';
            article += '<p id="ContractCurrency" style="display:none;">' + item.ContractCurrency + '</p>';
            article += '<p id="ContractPricingType" style="display:none;">' + item.ContractPricingType + '</p>';
            article += '<p id="PaymentType" style="display:none;">' + item.PaymentType + '</p>';
            article += '<p id="BillingFrequency" style="display:none;">' + item.BillingFrequency + '</p>';
            article += '<p id="StartDate" style="display:none;">' + item.StartDate + '</p>';
            article += '<p id="EndDate" style="display:none;">' + item.EndDate + '</p>';
            article += '<p id="TermEndDate" style="display:none;">' + item.TermEndDate + '</p>';
            article += '<p id="Extendable" style="display:none;">' + item.Extendable + '</p>';
            article += '<p id="Renewable" style="display:none;">' + item.Renewable + '</p>';
            article += '<p id="BaseContractValue" style="display:none;">' + item.BaseContractValue + '</p>';
            article += '<p id="BaseContractValueCurrency" style="display:none;">' + item.BaseContractValueCurrency + '</p>';
            article += '<p>';

            if (item.InRecycleBin == "Yes") {
                status = '<td><b title="In Recycle Bin" class="statusImg status_blue"><img src="../Content/Images/status/recycle-bin.png"/>Recy</b><a class="margin-top6 openmenuStatus" href="javascript:void(0)"><img src="../Content/Images/action/arrow.png"/></a></td>';

            } else {

                var vContVisibility = '';
                if (item.CustomPermission == "Yes") {
                    vContVisibility = '<img src="../Content/Images/cont_confd.png" title="Confidential" />';
                } else if (item.IsPublic == "Yes") {
                    vContVisibility = '<img src="../Content/Images/cont_public.png" title="Public" />';
                }

                article += '<td><input class="margin-Top10 margin-right" name="ContRec" type="checkbox" value="" onclick="checkMultipleContracts(this);" id="' + item.RowKey + '"  /></td>';


                if (item.Status == "New") {

                    if (vPermission == 'openmenuContribute' || vPermission == 'openmenu') {
                        vQuickActions += '<li><a href="/Contracts/EditContract?ContractID=' + item.RowKey + '&ContractType=' + encodeURIComponent(item.ContractType) + '"><img title="Edit Metadata" src="../Content/Images/action/edit-metadata.png"/></a></li>';
                        vQuickActions += '<li><a href="javascript:void(0)" onclick="OpenContractApproval(\'' + item.ApprovalWorkflow + '\', \'' + item.ContractTitle + '\', \'' + item.RowKey + '\', \'' + item.BusinessArea + '\', \'' + item.ContractArea + '\', \'' + item.BusinessAreaPath + '\');"><img title="Start Approval Workflow" src="../Content/Images/action/Start-Approval-workflow.png"/></a></li>';
                    }
                    status = '<td><b title="New" class="statusImg status_green_another"><img src="../Content/Images/status/new.png"/>new</b></td>';
                }
                else if (item.Status == "Awaiting Review") {
                    status = '<td><b class="statusImg"> title="Awaiting Review" class="statusImg status_yellow"><img src="../Content/Images/status/renew.png"/>rev</b></td>';
                    vQuickActions += '<li><a href="' + myUrl + '&Tab=Activity"><img title="Check Activity Status" src="../Content/Images/action/check-activity-status.png"/></a></li>';
                    if (vPermission == 'openmenu')
                        vQuickActions += '<li><a href="javascript:void(0)" onclick="ManageContractPeople(\'' + item.RowKey + '\');"><img title="Manage People" src="../Content/Images/action/manage-people.png"/></a></li>';
                }
                else if (item.Status == "Reviewed") {
                    status = '<td><b title="Reviewed" class="statusImg status_blue"><img src="../Content/Images/status/tick.png"/>rev</b></td>';
                    if (vPermission == 'openmenuContribute' || vPermission == 'openmenu') {
                        vQuickActions += '<li><a href="javascript:void(0)" onclick="OpenContractApproval(\'' + item.ApprovalWorkflow + '\', \'' + item.ContractTitle + '\', \'' + item.RowKey + '\', \'' + item.BusinessArea + '\', \'' + item.ContractArea + '\', \'' + item.BusinessAreaPath + '\');"><img title="Start Approval Workflow" src="../Content/Images/action/Start-Approval-workflow.png"/></a></li>';
                        vQuickActions += '<li><a href="javascript:void(0)" onclick="ManageContractStatus(\'' + item.RowKey + '\',\'' + item.Status + '\');"><img title="Manage Status" src="../Content/Images/action/manage-status.png"/></a></li>';
                    }
                }
                else if (item.Status == "Awaiting Approval") {
                    status = '<td><b title="Awaiting Approval" class="statusImg status_yellow"><img src="../Content/Images/status/renew.png"/>appr</b></td>';
                    vQuickActions += '<li><a href="' + myUrl + '&Tab=Activity"><img title="Check Activity Status" src="../Content/Images/action/check-activity-status.png"/></a></li>';
                    if (vPermission == 'openmenu')
                        vQuickActions += '<li><a href="javascript:void(0)" onclick="ManageContractPeople(\'' + item.RowKey + '\');"><img title="Manage People" src="../Content/Images/action/manage-people.png"/></a></li>';
                }
                else if (item.Status == "Approved") {
                    status = '<td><b title="Approved" class="statusImg status_blue"><img src="../Content/Images/status/tick.png"/>appr</b></td>';
                    vQuickActions += '<li><a href="javascript:void(0)" onclick="OpenContractShare(\'' + item.RowKey + '\',\'' + item.ContractTitle + '\');"><img title="Share Contract Record" src="../Content/Images/CM_share_contract.png"/></a></li>';
                    if (vPermission == 'openmenuContribute' || vPermission == 'openmenu')
                        vQuickActions += '<li><a href="javascript:void(0)" onclick="ManageContractStatus(\'' + item.RowKey + '\',\'' + item.Status + '\');"><img title="Manage Status" src="../Content/Images/action/manage-status.png"/></a></li>';
                }
                else if (item.Status == "In Negotiation") {
                    status = '<td><b title="In Negotiation" class="statusImg status_yellow"><img src="../Content/Images/status/renew.png"/>nego</b></td>';
                    vQuickActions += '<li><a href="' + myUrl + '&Tab=Activity"><img title="Check Activity Status" src="../Content/Images/action/check-activity-status.png"/></a></li>';
                    vQuickActions += '<li><a href="' + myUrl + '&Tab=Notes"><img title="View Notes" src="../Content/Images/action/view-notes.png"/></a></li>';
                }
                else if (item.Status == "Negotiation Complete") {
                    status = '<td><b title="Negotiation Complete" class="statusImg status_blue"><img src="../Content/Images/status/tick.png"/>nego</b></td>';
                    if (vPermission == 'openmenuContribute' || vPermission == 'openmenu')
                        vQuickActions += '<li><a href="javascript:void(0)" onclick="ManageContractStatus(\'' + item.RowKey + '\',\'' + item.Status + '\');"><img title="Manage Status" src="../Content/Images/action/manage-status.png"/></a></li>';
                    vQuickActions += '<li><a href="javascript:void(0)" onclick="CreateContractActivityList(\'' + item.RowKey + '\');"><img title="View History" src="../Content/Images/action/View-History.png"/></a></li>';
                }
                else if (item.Status == "Ready for Signature") {
                    status = '<td><b title="Ready for Signature" class="statusImg status_green"><img src="../Content/Images/status/active.png"/>Sign</b></td>';
                    vQuickActions += '<li><a href="' + myUrl + '&Tab=Activity"><img title="Check Activity Status" src="../Content/Images/action/check-activity-status.png"/></a></li>';
                    if (vPermission == 'openmenuContribute' || vPermission == 'openmenu')
                        vQuickActions += '<li><a href="javascript:void(0)" onclick="ManageContractStatus(\'' + item.RowKey + '\',\'' + item.Status + '\');"><img title="Manage Status" src="../Content/Images/action/manage-status.png"/></a></li>';
                }
                else if (item.Status == "Awaiting Signatures") {
                    status = '<td><b title="Awaiting Signatures" class="statusImg status_yellow"><img src="../Content/Images/status/renew.png"/>Sign</b></td>';
                    vQuickActions += '<li><a href="' + myUrl + '&Tab=Activity"><img title="Check Activity Status" src="../Content/Images/action/check-activity-status.png"/></a></li>';
                    if (vPermission == 'openmenuContribute' || vPermission == 'openmenu')
                        vQuickActions += '<li><a href="javascript:void(0)" onclick="ManageContractStatus(\'' + item.RowKey + '\',\'' + item.Status + '\');"><img title="Manage Status" src="../Content/Images/action/manage-status.png"/></a></li>';
                }
                else if (item.Status == "Signed") {
                    status = '<td><b title="Signed" class="statusImg status_blue"><img src="../Content/Images/status/tick.png"/>Sign</b></td>';
                    if (vPermission == 'openmenuContribute' || vPermission == 'openmenu')
                        vQuickActions += '<li><a href="javascript:void(0)" onclick="ManageContractStatus(\'' + item.RowKey + '\',\'' + item.Status + '\');"><img title="Manage Status" src="../Content/Images/action/manage-status.png"/></a></li>';
                    if (vPermission == 'openmenu')
                        vQuickActions += '<li><a href="javascript:void(0)" onclick="ManageContractTerm(\'' + item.RowKey + '\');"><img title="Manage Term & Renewals" src="../Content/Images/action/manage-term-renewal.png"/></a></li>';
                }
                else if (item.Status == "Active") {
                    status = '<td><b title="Active" class="statusImg status_green"><img src="../Content/Images/status/active.png"/>actv</b></td>';
                    vQuickActions += '<li><a href="javascript:void(0)" onclick="ViewContractMetaData(\'' + item.RowKey + '\');"><img title="View Metadata" src="../Content/Images/action/view-metadata.png"/></a></li>';
                    if (vPermission == 'openmenu')
                        vQuickActions += '<li><a href="javascript:void(0)" onclick="ManageContractTerm(\'' + item.RowKey + '\');"><img title="Manage Term & Renewals" src="../Content/Images/action/manage-term-renewal.png"/></a></li>';
                }
                else if (item.Status == "Up for Renewal") {
                    status = '<td><b title="Up for Renewal" class="statusImg status_red"><img src="../Content/Images/status/exp.png"/>renw</b></td>';
                    vQuickActions += '<li><a href="javascript:void(0)" onclick="ManageContractTerm(\'' + item.RowKey + '\');"><img title="Manage Term & Renewals" src="../Content/Images/action/manage-term-renewal.png"/></a></li>';
                    vQuickActions += '<li><a href="javascript:void(0)" onclick="ManageContractStatus(\'' + item.RowKey + '\',\'' + item.Status + '\');"><img title="Manage Status" src="../Content/Images/action/manage-status.png"/></a></li>';
                }
                else if (item.Status == "About to Expire") {
                    status = '<td><b title="About to Expire" class="statusImg status_red"><img src="../Content/Images/status/exp.png"/>exp</b></td>';
                    if (vPermission == 'openmenu')
                        vQuickActions += '<li><a href="javascript:void(0)" onclick="ManageContractTerm(\'' + item.RowKey + '\');"><img title="Manage Term & Renewals" src="../Content/Images/action/manage-term-renewal.png"/></a></li>';
                    if (vPermission == 'openmenuContribute' || vPermission == 'openmenu')
                        vQuickActions += '<li><a href="javascript:void(0)" onclick="ManageContractStatus(\'' + item.RowKey + '\',\'' + item.Status + '\');"><img title="Manage Status" src="../Content/Images/action/manage-status.png"/></a></li>';
                }
                else if (item.Status == "Expired") {
                    status = '<td><b title="Expired" class="statusImg status_Gray"><img src="../Content/Images/status/expried.png"/>exp</b><a class="margin-top6 openmenuStatus" href="javascript:void(0)"><img src="../Content/Images/action/arrow.png"/></a></td>';
                    if (vPermission == 'openmenu') {
                        vQuickActions += '<li><a href="javascript:void(0)"><img title="Tag to Replaced / Related Contract" src="../Content/Images/action/tag-to-replace.png"/></a></li>';
                        vQuickActions += '<li><a href="javascript:void(0)" onclick="ManageRelatedContracts(\'' + item.RowKey + '\',\'' + item.ContractTitle + '\', \'' + item.BusinessAreaPath + '\');"><img title="Tag to Replaced / Related Contract" src="../Content/Images/action/tag-to-replace.png"/></a></li>';
                    }
                }
                else if (item.Status == "On Hold") {
                    status = '<td><b title="On Hold" class="statusImg status_red"><img src="../Content/Images/status/exp.png"/>hold</b></td>';
                    if (vPermission == 'openmenu')
                        vQuickActions += '<li><a href="javascript:void(0)" onclick="ManageContractTerm(\'' + item.RowKey + '\');"><img title="Manage Term & Renewals" src="../Content/Images/action/manage-term-renewal.png"/></a></li>';
                    if (vPermission == 'openmenuContribute' || vPermission == 'openmenu')
                        vQuickActions += '<li><a href="javascript:void(0)" onclick="ManageContractStatus(\'' + item.RowKey + '\',\'' + item.Status + '\');"><img title="Manage Status" src="../Content/Images/action/manage-status.png"/></a></li>';
                }
                else if (item.Status == "Replaced") {
                    status = '<td><b title="Replaced" class="statusImg status_Gray"><img src="../Content/Images/status/replace.png"/>rep</b></td>';
                    if (vPermission == 'openmenuContribute' || vPermission == 'openmenu')
                        vQuickActions += '<li><a href="javascript:void(0)" onclick="ManageContractStatus(\'' + item.RowKey + '\',\'' + item.Status + '\');"><img title="Manage Status" src="../Content/Images/action/manage-status.png"/></a></li>';
                    if (vPermission == 'openmenu')
                        vQuickActions += '<li><a href="javascript:void(0)" onclick="ManageContractTerm(\'' + item.RowKey + '\');"><img title="Manage Term & Renewals" src="../Content/Images/action/manage-term-renewal.png"/></a></li>';
                }
                else if (item.Status == "Cancelled") {
                    status = '<td><b title="Cancelled" class="statusImg status_Gray"><img src="../Content/Images/status/close.png"/>canc</b><a class="margin-top6 openmenuStatus" href="javascript:void(0)"><img src="../Content/Images/action/arrow.png"/></a></td>';
                    vQuickActions += '<li><a href="javascript:void(0)" onclick="CreateContractActivityList(\'' + item.RowKey + '\');"><img title="View History" src="../Content/Images/action/View-History.png"/></a></li>';
                    if (vPermission == 'openmenuContribute' || vPermission == 'openmenu')
                        vQuickActions += '<li><a href="javascript:void(0)" onclick="ManageContractStatus(\'' + item.RowKey + '\',\'' + item.Status + '\');"><img title="Manage Status" src="../Content/Images/action/manage-status.png"/></a></li>';
                }
                    //else if (item.Status == "Terminated") {
                    //    article += '<b title="Terminated" class="statusImg status_Gray"><img src="../Content/Images/status/close.png"/>term</b>';
                    //    vQuickActions += '<a href="javascript:void(0)"><img title="Edit Metadata" src="../Content/Images/action/edit-metadata.png"/></a>';
                    //    vQuickActions += '<a href="javascript:void(0)"><img title="Start Approval Workflow" src="../Content/Images/action/Start-Approval-workflow.png"/></a>';
                    //}
                else if (item.Status == "Archived") {
                    status = '<td><b title="Archived" class="statusImg status_blue"><img src="../Content/Images/status/archive.png"/>ARCH</b></td>';
                    vQuickActions += '<li><a href="javascript:void(0)" onclick="CreateContractActivityList(\'' + item.RowKey + '\');"><img title="View History" src="../Content/Images/action/View-History.png"/></a></li>';
                    if (vPermission == 'openmenu')
                        vQuickActions += '<li><a href="javascript:void(0)" onclick="DeleteContract(\'' + item.ContractTitle + '\',\'' + item.RowKey + '\');"><img title="Delete Contract Record" src="../Content/Images/action/Delete-Contract.png"/></a></li>';
                }
                else {
                    if (item.Status == "0" || item.Status == "" || item.Status == "undefined") {
                        status = '<td><b title="Not Assigned" class="statusImg status_red"><img src="../Content/Images/status/new.png"/>not</b></td>';
                        if (vPermission == 'openmenuContribute' || vPermission == 'openmenu') {
                            vQuickActions += '<li><a href="/Contracts/EditContract?ContractID=' + item.RowKey + '&ContractType=' + encodeURIComponent(item.ContractType) + '"><img title="Edit Metadata" src="../Content/Images/action/edit-metadata.png"/></a></li>';
                            vQuickActions += '<li><a href="javascript:void(0)" onclick="OpenContractApproval(\'' + item.ApprovalWorkflow + '\', \'' + item.ContractTitle + '\', \'' + item.RowKey + '\', \'' + item.BusinessArea + '\', \'' + item.ContractArea + '\', \'' + item.BusinessAreaPath + '\');"><img title="Start Approval Workflow" src="../Content/Images/action/Start-Approval-workflow.png"/></a></li>';
                        }

                    } else {
                        status = '<td><b title="' + item.Status + '" class="statusImg status_red"><img src="../Content/Images/status/new.png"/>hold</b></td>';
                        if (vPermission == 'openmenuContribute' || vPermission == 'openmenu') {
                            vQuickActions += '<li><a href="/Contracts/EditContract?ContractID=' + item.RowKey + '&ContractType=' + encodeURIComponent(item.ContractType) + '"><img title="Edit Metadata" src="../Content/Images/action/edit-metadata.png"/></a></li>';
                            vQuickActions += '<li><a href="javascript:void(0)" onclick="OpenContractApproval(\'' + item.ApprovalWorkflow + '\', \'' + item.ContractTitle + '\', \'' + item.RowKey + '\', \'' + item.BusinessArea + '\', \'' + item.ContractArea + '\', \'' + item.BusinessAreaPath + '\');"><img title="Start Approval Workflow" src="../Content/Images/action/Start-Approval-workflow.png"/></a></li>';
                        }
                    }
                }
            }
            if (item.InRecycleBin == "Yes") {
                article += '<td class="PreserveSpace">' + item.ContractTitle + '</td>';
            } else {
                article += '<td><a href="' + myUrl + '" class="PreserveSpace">' + item.ContractTitle + '</a><li>' + vContVisibility + '</li></td>';
            }
            article += '<td><small>' + vContractNumber + '</small></td>' + '<td><small>' + item.ContractType + '</small></td>';



            article += status;


            article += '<td>';
            article += vQuickActions;
            article += '<li><a class="' + vPermission + '" href="javascript:void(0)"><img src="../Content/Images/action/arrow.png"/></a></li>';
            article += '</td>';


            //}
            //else {
            //    article = '<article class="box1" style="display:none;">';
            //}
            contractTags.push(item.ContractTitle);
            //article += '<span>&nbsp;</span>';
            //article += '<p id="ContractID" style="display:none;">' + item.RowKey + '</p>';
            //article += '<p id="ContractTitle" style="display:none;">' + item.ContractTitle + '</p>';
            //article += '<p id="ContractType" style="display:none;">' + item.ContractType + '</p>';
            //article += '<p id="ContractArea" style="display:none;">' + item.ContractArea + '</p>';
            //article += '<p id="BusinessArea" style="display:none;">' + item.BusinessArea + '</p>';
            //article += '<p id="BusinessAreaPath" style="display:none;">' + item.BusinessAreaPath + '</p>';
            //article += '<p id="ApprovalWorkflow" style="display:none;">' + item.ApprovalWorkflow + '</p>';
            //article += '<p id="Status" style="display:none;">' + item.Status + '</p>';
            //article += '<p id="ContractValue" style="display:none;">' + item.ContractValue + '</p>';
            //article += '<p id="ContractCurrency" style="display:none;">' + item.ContractCurrency + '</p>';
            //article += '<p id="ContractPricingType" style="display:none;">' + item.ContractPricingType + '</p>';
            //article += '<p id="PaymentType" style="display:none;">' + item.PaymentType + '</p>';
            //article += '<p id="BillingFrequency" style="display:none;">' + item.BillingFrequency + '</p>';
            //article += '<p id="StartDate" style="display:none;">' + item.StartDate + '</p>';
            //article += '<p id="EndDate" style="display:none;">' + item.EndDate + '</p>';
            //article += '<p id="TermEndDate" style="display:none;">' + item.TermEndDate + '</p>';
            //article += '<p id="Extendable" style="display:none;">' + item.Extendable + '</p>';
            //article += '<p id="Renewable" style="display:none;">' + item.Renewable + '</p>';
            //article += '<p id="BaseContractValue" style="display:none;">' + item.BaseContractValue + '</p>';
            //article += '<p id="BaseContractValueCurrency" style="display:none;">' + item.BaseContractValueCurrency + '</p>';
            //if (item.InRecycleBin == "Yes") {
            //    article += '<p class="margin-left-20"><i>' + item.ContractTitle + '';
            //} else {
            //    article += '<p> <input name="" type="checkbox" onclick="checkMultipleContracts(this);" id=' + item.RowKey + ' value="" /><i><a href=' + myUrl + '>' + item.ContractTitle + '</a><img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="' + vPermission + '" />';
            //}

            //article += '<small>' + vContractNumber + ' | ' + item.ContractType;// + ' | ' + item.Permission;
            //if (sortby != '') {
            //    if (item[sortby] != null || item[sortby] != "") {
            //        if (fieldType == 'date') {
            //            if (typeof item[sortby] != 'undefined' && item[sortby] != null) {
            //                article += ' | ' + moment(new Date(item[sortby])).format('MM/DD/YYYY') + '</small>';
            //            }
            //        }
            //        else {
            //            article += ' | ' + item[sortby] + '</small>';
            //        }
            //    }
            //}
            //else {
            //    article += '</small>';
            //}
            //article += '</i></p>';
            //if (item.InRecycleBin == "Yes") {
            //    article += '<b class="status_blue">In Recycle Bin</b>';
            //} else {
            //    if (item.Status == "New") {
            //        article += '<b class="status_yellow">' + item.Status + '</b>';
            //    }
            //    else if (item.Status == "Drafting") {
            //        article += '<b class="status_yellow">' + item.Status + '</b>';
            //    }
            //    else if (item.Status == "Awaiting Review") {
            //        article += '<b class="status_yellow">' + item.Status + '</b>';
            //    }
            //    else if (item.Status == "Awaiting Approval") {
            //        article += '<b class="status_yellow">' + item.Status + '</b>';
            //    }
            //    else if (item.Status == "In Negotiation") {
            //        article += '<b class="status_yellow">' + item.Status + '</b>';
            //    }
            //    else if (item.Status == "Awaiting Signatures") {
            //        article += '<b class="status_yellow">' + item.Status + '</b>';
            //    }
            //    else if (item.Status == "Signed") {
            //        article += '<b class="status_green">' + item.Status + '</b>';
            //    }
            //    else if (item.Status == "Active") {
            //        article += '<b class="status_green">' + item.Status + '</b>';
            //    }
            //    else if (item.Status == "Up for Renewal") {
            //        article += '<b class="status_red">' + item.Status + '</b>';
            //    }
            //    else if (item.Status == "Renewed") {
            //        article += '<b class="status_green">' + item.Status + '</b>';
            //    }
            //    else if (item.Status == "Extended") {
            //        article += '<b class="status_green">' + item.Status + '</b>';
            //    }
            //    else if (item.Status == "On Hold") {
            //        article += '<b class="status_yellow">' + item.Status + '</b>';
            //    }
            //    else if (item.Status == "Replaced") {
            //        article += '<b class="status_blue">' + item.Status + '</b>';
            //    }
            //    else if (item.Status == "Expired") {
            //        article += '<b class="status_blue">' + item.Status + '</b>';
            //    }
            //    else if (item.Status == "Cancelled") {
            //        article += '<b class="status_blue">' + item.Status + '</b>';
            //    }
            //    else if (item.Status == "Terminated") {
            //        article += '<b class="status_blue">' + item.Status + '</b>';
            //    }
            //    else if (item.Status == "Archived") {
            //        article += '<b class="status_blue">' + item.Status + '</b>';
            //    }
            //    else {
            //        if (item.Status == "0" || item.Status == "" || item.Status == "undefined") {
            //            article += '<b class="status_red">Not Assigned</b>';

            //        } else {
            //            article += '<b class="status_red">' + item.Status + '</b>';
            //        }
            //    }
            //}
            article += '</tr>';
            $("#listContracts1").append(article);

            resultfound = true;

        }

    }
    $(".openmenu").contextMenu({ menu: 'myMenu', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("div").parent("li"), pos); });
    $(".openmenuCollaborate").contextMenu({ menu: 'myMenuCollaborate', leftButton: true }, function (action, el, pos) {
        contextMenuWork(action, el.parent("div").parent("li"), pos);
    });
    $(".openmenuStatus").contextMenu({ menu: 'myStatus', leftButton: true }, function (action, el, pos) {
        contextMenuWork(action, el.parent("div").parent("li"), pos);
    });
    $(".openmenuContribute").contextMenu({ menu: 'myMenuContribute', leftButton: true }, function (action, el, pos) {
        contextMenuWork(action, el.parent("div").parent("li"), pos);
    });
    $(".openmenuView").contextMenu({ menu: 'myMenuView', leftButton: true }, function (action, el, pos) {
        contextMenuWork(action, el.parent("div").parent("li"), pos);
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


function SelectAllItems(object) {
    $('.hhide').hide();

    multipleChecks = "";
    multipleChecksPermission = "";
    var ContractID = "";
    var vPermission = $("#" + ContractID).parent("p").parent("li").find("#Permission").text();


    if ($('#SelectAll').is(':checked')) {
        $("input:checkbox[name=ContRec]").each(function () {
            this.checked = true;
            ContractID = $(this).attr("id");

            $("#" + ContractID).parent("p").parent("li").addClass('aActive');
            $("#btnMultipleAction").css('display', '');

            multipleChecks = multipleChecks + ';' + ContractID;
            multipleChecksPermission = multipleChecksPermission + ';' + vPermission;

        });
    } else {
        $("input:checkbox[name=ContRec]").each(function () {
            this.checked = false;
            ContractID = $(this).attr("id");

            $("#" + ContractID).parent("p").parent("li").removeClass('aActive');
            multipleChecks = multipleChecks.replace(';' + ContractID, '');
            multipleChecksPermission = multipleChecksPermission.replace(';' + vPermission, '');

        });
    }


    if (multipleChecks.trim() == "") {
        $("#btnMultipleAction").css('display', 'none');
    } else {
        if (multipleChecksPermission.indexOf('openmenuView') >= 0) {
            $("#btnMultipleAction_Status").css('display', 'none');
            $("#btnMultipleAction_People").css('display', 'none');
            $("#btnMultipleAction_Counparty").css('display', 'none');
            $("#btnMultipleAction_BusnArea").css('display', 'none');
            $("#btnMultipleAction_Delete").css('display', 'none');
            $("#btnMultipleAction_NoPermission").css('display', '');

        } else if (multipleChecksPermission.indexOf('openmenuContribute') >= 0) {
            $("#btnMultipleAction_Status").css('display', '');
            $("#btnMultipleAction_People").css('display', 'none');
            $("#btnMultipleAction_Counparty").css('display', '');
            if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All")
                $("#btnMultipleAction_BusnArea").css('display', '');
            $("#btnMultipleAction_Delete").css('display', 'none');
            $("#btnMultipleAction_NoPermission").css('display', 'none');

        } else {
            $("#btnMultipleAction_Status").css('display', '');
            $("#btnMultipleAction_People").css('display', '');
            $("#btnMultipleAction_Counparty").css('display', '');
            if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All")
                $("#btnMultipleAction_BusnArea").css('display', '');
            $("#btnMultipleAction_Delete").css('display', '');
            $("#btnMultipleAction_NoPermission").css('display', 'none');

        }
    }

    try {
        hideAllMenuAndStopPro(event);
    }
    catch (ex) {

    }
}


function SaveView() {
    if ($("#txtViewName").val() == "") {
        //alert("Enter View Name.")
        swal("", "Enter View Name.");
    }
    else {
        var query = "Status:";
        $("#liFiltersStatus").each(function (i, item) {
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
                ViewFor: 'Contract',
                ViewQuery: query,
                DefaultViewName: qvName,
                CreatedBy: localStorage.UserName,
                ModifiedBy: localStorage.UserName
            },
            cache: false,
            success: function (person) {
                if (person == "Please provide other view name.") {
                    //alert(person);
                    swal("", person);
                }
                else {
                    // alert(person);
                    swal("", person);
                    $("#txtViewName").val("")
                    //GetSavedViews();
                    //Harshitha
                    GetSavedViews2();
                    $("#addNewView").dialog("close");
                }
            }
        });
    }
}

var workflowRoutingOptions = [];
var vWorkflowRules = [];
$("#ddlRule").change(function (obj) {
    var vFilterRule = $.grep(vWorkflowRules, function (n, i) {
        return (n.RuleName == $("#ddlRule option:selected").text());
    });
    if (vFilterRule.length > 0) {
        $("#tblStage").empty();
        var workflowRules = vFilterRule[0];
        var participantsInXML = workflowRules.ParticipantsInXML;
        var totalFileCount = 0;
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
                    else
                        $("#ddlOrder" + vasstoid).prop('disabled', true);
                }
                else
                    $("#ddlOrder" + vasstoid).prop('disabled', true);
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
    }
});

function contextMenuWork(action, el, pos) {

    switch (action) {
        case "delete":
            {
                var contractTitle = $(el).find("#ContractTitle").text();
                var entityid = $(el).find("#ContractID").text();
                DeleteContract(contractTitle, entityid);
                break;
            }
        case "edit":
            {
                var entityid = $(el).find("#ContractID").text();
                var contracttype = $(el).find("#ContractType").text();
                location = "/Contracts/EditContract?ContractID=" + entityid + '&ContractType=' + encodeURIComponent(contracttype);
                break;
            }
        case "viewdetails":
            {
                var entityid = $(el).find("#ContractID").text();
                location = "/Contracts/ContractDetails?ContractID=" + entityid;
                break;
            }
        case "approve":
            {
                var approvalWorkflow = $(el).find("#ApprovalWorkflow").text();
                var contractTitle = $(el).find("#ContractTitle").text();
                var contractID = $(el).find("#ContractID").text();
                var businessArea = $(el).find("#BusinessArea").text();
                var contractArea = $(el).find("#ContractArea").text();
                var businessAreaPath = $(el).find("#BusinessAreaPath").text();
                OpenContractApproval(approvalWorkflow, contractTitle, contractID, businessArea, contractArea, businessAreaPath);

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
                var contractID = $(el).find("#ContractID").text();
                $("#hdContractID").val(contractID);
                CreateContractActivityList(contractID);
                break;
            }
        case "share":
            {
                var contractID = $(el).find("#ContractID").text();
                var contractTitle = $(el).find("#ContractTitle").text();
                OpenContractShare(contractID, contractTitle);

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
                var contractID = $(el).find("#ContractID").text();
                var status = $(el).find("#Status").text();
                ManageContractStatus(contractID, status);
                break;
            }
        case "people":
            {
                var contractID = $(el).find("#ContractID").text();
                ManageContractPeople(contractID);

                break;
            }
        case "duplicate":
            {
                swal({
                    title: '',
                    text: "Are you sure you want to <span style=\"font-weight:700\">create</span> duplicate Contract Record?",
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
           location = "/Contracts/EditContract?ContractID=" + contractID + "&ContractType=" + contractType + "&Duplicate=Yes";

       }
       return;
   });

                //if (confirm("Are you sure you want to create duplicate Contract Record?")) {
                //    var contractID = $(el).find("#ContractID").text();
                //    var contractType = $(el).find("#ContractType").text();
                //    location = "/Contracts/EditContract?ContractID=" + contractID + "&ContractType=" + contractType + "&Duplicate=Yes";
                //}
                break;
            }
    }
}

function DeleteContract(contractTitle, contractID) {
    swal({
        title: '',
        text: "Are you sure you want to <span style=\"font-weight:700\">delete '" + contractTitle + "'</span>?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        html: true
    },
   function (confirmed) {
       if (confirmed) {
           var entityid = contractID;
           $.ajax({
               url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + entityid,
               type: 'DELETE',
               dataType: 'json',
               headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
               cache: false,
               success: function (data) {
                   ////alert(data);
                   //swal("", data);
                   location = location;

                   //swal({
                   //    title: '',
                   //    text: data,

                   //},
                   //    function (confirmed) {
                   //        if (confirmed) {
                   //            location = location;
                   //        }

                   //    });

               }
           });
       }
       return;
   });

    //if (confirm("Are you sure you want to delete '" + contractTitle + "'?")) {
    //    var entityid = contractID;
    //    $.ajax({
    //        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + entityid,
    //        type: 'DELETE',
    //        dataType: 'json',
    //        headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
    //        cache: false,
    //        success: function (data) {
    //            alert(data);
    //            location = location;
    //        }
    //    });
    //}
}

function OpenContractApproval(approvalWorkflow, contractTitle, contractID, businessArea, contractArea, businessAreaPath) {
    if (approvalWorkflow == "In Progress") {
        //  alert("Contract Approval is in progress for this contract.");
        swal("", "Contract Approval is in progress for this contract.");
    }
    else {
        $("#loadingPage").fadeIn();
        $(".validelement").each(function (index, element) {
            $(element).removeClass("error");
            $("#errormsg_" + element.id).remove();
        });
        $(".error").removeClass("error");

        $("#tblStage").empty();
        $("#ddlRule").empty();

        $("#txtWorkflowTitle").val('Approval for ' + contractTitle);
        $("#txtDuration").val("");
        var nicInstance = nicEditors.findEditor('txtComment');
        nicInstance.setContent('');
        NicEditorPasteEvent();
        //$("#txtComment").val("");
        $("#hdWorkflowType").val("Contract Approval");
        $("#hdWorkflowContractArea").val(contractArea);
        $("#hdWorkflowBusinessArea").val(businessArea);
        $("#hdWorkflowBusinessAreaPath").val(businessAreaPath);
        $("#hdWorkflowObjectID").val(contractID);
        $("#hdWorkflowObjectTitle").val(contractTitle);
        GetValuesAndAutoPopulate("ddlWorkflowCC", "");
        $('#chkAutoUpdateStatus').prop('checked', true);
        var vWorkflowSettings = [];
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/evaluate?workflowType=Contract Approval&contractArea=' + encodeURIComponent(contractArea) + '&businessArea=' + encodeURIComponent(businessArea) + '&contractid=' + contractID,
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
                }
                if (vWorkflowRules.length > 0) {
                    $(vWorkflowRules).each(function (i, rule) {
                        $("#ddlRule").append('<option value="' + rule.RuleName + '">' + rule.RuleName + '</option>');
                    });

                    var workflowRules = vWorkflowRules[0];
                    $("#ddlRule").find('option[value="' + workflowRules.RuleName + '"]').attr("selected", true);
                    if (vWorkflowRules.length == 1) {
                        $("#ddlRule").attr('disabled', 'disabled');
                    }
                    else {
                        $("#ddlRule").removeAttr("disabled");
                    }
                    var participantsInXML = workflowRules.ParticipantsInXML;
                    var totalFileCount = 0;
                    //If the rule is ad-hoc 
                    if (participantsInXML != "") {
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
                                    else
                                        $("#ddlOrder" + vasstoid).prop('disabled', true);
                                }
                                else
                                    $("#ddlOrder" + vasstoid).prop('disabled', true);
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
                    }
                    else {
                        if ($("#ddlRule").html() == "")
                            $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                        $("#ddlRule").attr('disabled', 'disabled');
                        var totalFileCount = 1;
                        var htmlFormatFile = '<tr id="trStage' + totalFileCount + '">';
                        htmlFormatFile += '<td class="width30 wf_approval">';
                        htmlFormatFile += '<input id="txtStage' + totalFileCount + '" name="Stage' + totalFileCount + '" title="Stage" placeholder="Stage Name" type="text" class="f_inpt width97 validelement" value="Stage ' + totalFileCount + '"/>';
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
                                else
                                    $("#ddlOrder" + vasstoid).prop('disabled', true);
                            }
                            else
                                $("#ddlOrder" + vasstoid).prop('disabled', true);
                        });
                    }

                }
                else {
                    if ($("#ddlRule").html() == "")
                        $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                    $("#ddlRule").attr('disabled', 'disabled');
                    var totalFileCount = 1;
                    var htmlFormatFile = '<tr id="trStage' + totalFileCount + '">';
                    htmlFormatFile += '<td class="width30 wf_approval">';
                    htmlFormatFile += '<input id="txtStage' + totalFileCount + '" name="Stage' + totalFileCount + '" title="Stage" placeholder="Stage Name" type="text" class="f_inpt width97 validelement" value="Stage ' + totalFileCount + '"/>';
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
                            else
                                $("#ddlOrder" + vasstoid).prop('disabled', true);
                        }
                        else
                            $("#ddlOrder" + vasstoid).prop('disabled', true);
                    });
                }


                //var reslength = res.length;
                //for (var i = 0; i < reslength; i++) {
                //    if (res[i].trim() == "Allow replacing participants") {

                //    } else if (res[i].trim() == "Allow adding additional Stages") {

                //    } else if (res[i].trim() == "Allow over-ride of Admin Configuration") {

                //    }
                //}
                $("#loadingPage").fadeOut();
                $("#dvWorkflow").dialog("option", "title", "Contract Record Approval Workflow");
                $("#dvWorkflow").dialog("open");
                $("#dvWorkflow").height("auto");
            },
            error: function () {
                $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                $("#ddlRule").attr('disabled', 'disabled');
                var totalFileCount = 1;
                var htmlFormatFile = '<tr id="trStage' + totalFileCount + '">';
                htmlFormatFile += '<td class="width30 wf_approval">';
                htmlFormatFile += '<input id="txtStage' + totalFileCount + '" name="Stage' + totalFileCount + '" title="Stage" placeholder="Stage Name" type="text" class="f_inpt width97 validelement" value="Stage ' + totalFileCount + '"/>';
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
                        else
                            $("#ddlOrder" + vasstoid).prop('disabled', true);
                    }
                    else
                        $("#ddlOrder" + vasstoid).prop('disabled', true);
                });
                $("#dvWorkflow").dialog("option", "title", "Contract Record Approval Workflow");
                $("#dvWorkflow").dialog("open");
                $("#dvWorkflow").height("auto");
                $("#loadingPage").fadeOut();
            }
        });
    }
}



function ManageContractStatus(contractID, status) {

    $("#hdContractID").val(contractID);
    $('input:radio[name="FinalizedStatus"][value="' + status + '"]').prop('checked', true);
    $('#dvContCancelNote').css("display", "none");
    if ($("#txtReasonOfCancelContract").hasClass("validelement"))
        $("#txtReasonOfCancelContract").removeClass('validelement');
    $('.AutoChange').prop('disabled', true);
    $("#dvManageContractStatus").dialog("open");



    //$.ajax({
    //    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contractstatusesbyCLM',
    //    type: 'GET',
    //    dataType: 'json',
    //    headers: { 'eContracts-ApiKey': localStorage.APIKey },
    //    cache: false,
    //    success: function (contractstatuses) {

    //        var datalenght = contractstatuses.length;
    //        for (var i = 0; i < datalenght; i++) {
    //            var item = contractstatuses[i];

    //            if (item.Transition == "Manual" || contrcatItem.Status == item.ContractStatus) {
    //                if (item.Transition != "Manual")
    //                    vAutoChange = 'AutoChange';
    //                else
    //                    vAutoChange = '';


    //                if (item.ContractStage != "Pipeline") {

    //                    var ctrl = "";

    //                    if (item.ContractStatus == "Awaiting Signatures") {
    //                        ctrl = "<input id='rdFinalizedAwaitingSign' type='radio' name='FinalizedStatus' value=" + item.ContractStatus + " class='css-checkbox " + vAutoChange + "' /><b title='Awaiting Signatures:" + item.Description + "' class='status_yellow'><img src='../Content/Images/status/renew.png'>sign</b><label for='rdFinalizedAwaitingSign' class='css-label'>" + item.ContractStatus + "</label><br />";
    //                    }
    //                    if (item.ContractStatus == "Signed") {
    //                        ctrl = "<input id='rdFinalizedSigned' type='radio' name='FinalizedStatus' value=" + item.ContractStatus + " class='css-checkbox " + vAutoChange + "' /><b title='Signed:" + item.Description + "' class='status_blue'><img src='../Content/Images/status/tick.png'>sign</b><label for='rdFinalizedSigned' class='css-label'>" + item.ContractStatus + "</label><br />";
    //                    }

    //                    if (item.ContractStatus == "Active") {
    //                        ctrl = "<input id='rdFinalizedActive' type='radio' name='FinalizedStatus' value=" + item.ContractStatus + " class='css-checkbox " + vAutoChange + "' /><b title='Active:The Contract Record is signed and is in effect till expiry.' class='status_green'><img src='../Content/Images/status/active.png'>actv</b><label for='rdFinalizedActive' class='css-label'>" + item.ContractStatus + "</label><br />";

    //                    }

    //                    if (item.ContractStatus == "Up for Renewal") {
    //                        ctrl = "<input id='rdFinalizedUpForRenewal' type='radio' name='FinalizedStatus' value=" + item.ContractStatus + " class='css-checkbox " + vAutoChange + "' /><b title='Up for Renewal:The Contract Record is waiting to be renewed.' class='status_red'><img src='../Content/Images/status/exp.png'>renw</b><label for='rdFinalizedUpForRenewal' class='css-label'>" + item.ContractStatus + "</label><br />";

    //                    }

    //                    if (item.ContractStatus == "About to Expire") {
    //                        ctrl = "<input id='rdFinalizedAboutToExpire' type='radio' name='FinalizedStatus' value=" + item.ContractStatus + " class='css-checkbox " + vAutoChange + "' /><b title='About to Expire:The Contract Record is about to get expired.' class='status_red'><img src='../Content/Images/status/exp.png'>exp</b><label for='rdFinalizedAboutToExpire' class='css-label'>" + item.ContractStatus + "</label><br />";
    //                    }


    //                    if (item.ContractStatus == "On Hold") {
    //                        ctrl = "<input id='rdFinalizedOnHold' type='radio' name='FinalizedStatus' value=" + item.ContractStatus + " class='css-checkbox " + vAutoChange + "' /><b title='On Hold:The parties do not mutually agree to the terms & conditions of this Contract Record.' class='status_red'><img src='../Content/Images/status/exp.png'>hold</b><label for='rdFinalizedOnHold' class='css-label'>" + item.ContractStatus + "</label><br />";
    //                    }
    //                    if (item.ContractStatus == "Replaced") {
    //                        ctrl = "<input id='rdFinalizedReplaced' type='radio' name='FinalizedStatus' value=" + item.ContractStatus + " class='css-checkbox " + vAutoChange + "' /><b title='Replaced:The Contract Record got replaced with its updated version.' class='status_Gray'><img src='../Content/Images/status/replace.png'>rep</b><label for='rdFinalizedReplaced' class='css-label'>" + item.ContractStatus + "</label><br />";

    //                    }


    //                    if (item.ContractStatus == "Expired") {
    //                        ctrl = "<input id='rdFinalizedExpired' type='radio' name='FinalizedStatus' value=" + item.ContractStatus + " class='css-checkbox " + vAutoChange + "' /><b title='Expired:The period of the contract term has ended.' class='status_Gray'><img src='../Content/Images/status/expried.png'>exp</b><label for='rdFinalizedExpired' class='css-label'>" + item.ContractStatus + "</label><br />";
    //                    }
    //                    if (item.ContractStatus == "Cancelled") {
    //                        ctrl = "<input id='rdFinalizedCancelled' type='radio' name='FinalizedStatus' value=" + item.ContractStatus + " class='css-checkbox " + vAutoChange + "' /><b title='Cancelled:The Contract Record got cancelled due to, Impossible to be Fulfilled or Fraud, Mistake, Misrepresentation or Breach of Contract or Prior Agreement.' class='status_Gray'><img src='../Content/Images/status/close.png'>canc</b><label for='rdFinalizedCancelled' class='css-label'>" + item.ContractStatus + "</label><br />";

    //                    }
    //                    if (item.ContractStatus == "Archived") {
    //                        ctrl = "<input id='rdFinalizedArchived' type='radio' name='FinalizedStatus' value=" + item.ContractStatus + " class='css-checkbox " + vAutoChange + "' /><b title='Archived:The Contract Record got archived due to either of the following status, 'cancelled', 'Terminated' or 'Expired' .' class='status_blue'><img src='../Content/Images/status/archive.png'>ARCH</b><label for='rdFinalizedArchived' class='css-label'>" + item.ContractStatus + "</label><br />";

    //                    }
    //                    $("#tdFinalizedStatus").append(ctrl);
    //                }

    //            }
    //        }
    //        $("#hdContractID").val(contractID);
    //        $('input:radio[name="FinalizedStatus"][value="' + status + '"]').prop('checked', true);
    //        $('#dvContCancelNote').css("display", "none");
    //        if ($("#txtReasonOfCancelContract").hasClass("validelement"))
    //            $("#txtReasonOfCancelContract").removeClass('validelement');
    //        $('.AutoChange').prop('disabled', true);
    //        $("#dvManageContractStatus").dialog("open");

    //    }

    //});

    //$('#tdFinalizedStatus').empty();

}


function ManageContractPeople(contractID) {
    $("#loadingPage").fadeIn();
    $("#hdContractID").val(contractID);
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + contractID,
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
        processData: false,
        success: function (item) {
            contractItem = item;
            $('input[name="ContractPrivacy"][value="' + item.ContractPrivacy + '"]').prop('checked', true);

            if (item.ContractManagers != "") {
                GetValuesAndAutoPopulate("ddlContractManagers", item.ContractManagers);

                $('#ddlContractManagers').data('previous', $('#ddlContractManagers').val());

                // GetValuesAndAutoPopulate("ddlFullControl", item.FullControlPermissions);
            }


            if (item.Reviewers != "") {
                GetValuesAndAutoPopulate("ddlReviewers", item.Reviewers);

                $('#ddlReviewers').data('previous', $('#ddlReviewers').val());
            }

            if (item.Approvers != "") {
                GetValuesAndAutoPopulate("ddlApproversNew", item.Approvers);

                $('#ddlApproversNew').data('previous', $('#ddlApproversNew').val());
            }

            if (item.Signees != "") {
                GetValuesAndAutoPopulate("ddlSignees", item.Signees);

                $('#ddlSignees').data('previous', $('#ddlSignees').val());
            }

            $("#txtExternalSignee").val(item.ExternalSignees);
            //$("#txtSharedWith").val(item.SharedWith);

            //if (item.ExternalSignees == null || item.ExternalSignees == "") {
            //    $("#tdExternalSignee").html("Not Available");
            //}
            //else {
            //    $("#tdExternalSignee").html(item.ExternalSignees);
            //}
            if (item.SharedWith == null || item.SharedWith == "") {
                $("#tdSharedWith").html("Not Available");
            }
            else {
                $("#tdSharedWith").html(item.SharedWith);
            }

            //if (item.FullControlPermissions != "") {                
            //    GetValuesAndAutoPopulate("ddlFullControl", item.FullControlPermissions);
            //}
            //if (item.ReadWritePermissions != "") {              
            //    GetValuesAndAutoPopulate("ddlReadWrite", item.ReadWritePermissions);
            //}
            //if (item.ReadOnlyPermissions != "") {              
            //    GetValuesAndAutoPopulate("ddlReadOnly", item.ReadOnlyPermissions);
            //}   
            $('#newPopup').empty();

            GetValueAndPopulateManagerNew(item, null);

            ////GetValueAndPopulateManager("ddlFullControl", "Project Manager", item.ProjectManager);
            ////GetValueAndPopulateManager("ddlFullControl", "Business Area Owner", item.BusinessAreaOwners);
            ////GetValueAndPopulateManager("ddlReadOnly", "Contract Area Administrator", item.ContractAreaAdministrators);

            ////GetValueAndPopulateUsers("ddlFullControl", item.FullControlPermissions);
            ////GetValueAndPopulateUsers("ddlReadWrite", item.ReadWritePermissions);
            ////GetValueAndPopulateUsers("ddlReadOnly", item.ReadOnlyPermissions);
            var statusss = $('#chkpermission').is(':checked');

            arrUser = arrUser.filter(function (x) { return arrPermsnUser.indexOf(x) < 0 })
            var datalenght = arrUser.length;
            for (var i = 0; i < datalenght; i++) {
                var sUserName = arrUser[i];
                var article = '<option value="' + sUserName + '">' + sUserName + '</option>';
                $("#txtAddUser").append(article);
            }
            $("#txtAddUser").chosen();

            //  $('#ddlFullControl').val($('#ddlContractManagers').text());

            if (item.CustomPermission == 'Yes') {
                $("#chkpermission").prop('checked', true);
                $("#ddlFullControl").prop('disabled', false).trigger("chosen:updated");
                $("#ddlReadWrite").prop('disabled', false).trigger("chosen:updated");
                $("#ddlReadOnly").prop('disabled', false).trigger("chosen:updated");
                $("#divBottom").show();
                $("#chkPublicContract").attr("disabled", "disabled");
                $("#chkPublicContract").prop('checked', false);
            }
            else {
                $("#ddlFullControl").prop('disabled', true).trigger("chosen:updated");
                $("#ddlReadWrite").prop('disabled', true).trigger("chosen:updated");
                $("#ddlReadOnly").prop('disabled', true).trigger("chosen:updated");
                $("#chkpermission").prop('checked', false);
                var vLastRow = $("#newPopup li:last").attr('id');
                var totalPermissionCount = "1";
                if (typeof vLastRow == "undefined") {
                    totalPermissionCount = "1";
                }
                else {
                    totalPermissionCount = parseInt(vLastRow.replace("PermissionList", ""));
                }
                for (i = 1; i <= totalPermissionCount; i++) {
                    $("#PermissionOption" + i).prop('disabled', true);
                    $("#" + i).hide();
                }
                $("#divBottom").hide();

            }
            if (item.IsPublic == 'Yes') {
                $("#chkpermission").attr("disabled", "disabled");
                $("#chkPublicContract").prop("disabled", false);
                $("#chkPublicContract").prop('checked', true);
            }
            else {
                $("#chkPublicContract").prop('checked', false);
            }


            $("#loadingPage").fadeOut();
            $("#addEditPeople").dialog("option", "title", "People & Permissions");
            $("#addEditPeople").dialog("open");
        }
    });
}



function GetValueAndPopulateManagerNew(contrcatItem, item) {
    contractAccessUsers = [];
    var users = [];
    if (contrcatItem.ProjectManager != "" && contrcatItem.ProjectManager != null) {
        users = contrcatItem.ProjectManager.split(';');
        $.each(users, function (index, value) {
            contractAccessUsers.push(value.trim());
        });
    }

    if (contrcatItem.BusinessAreaOwners != "" && contrcatItem.BusinessAreaOwners != null) {
        users = contrcatItem.BusinessAreaOwners.split(';');
        $.each(users, function (index, value) {
            contractAccessUsers.push(value.trim());
        });
    }

    if (contrcatItem.ContractAreaAdministrators != "" && contrcatItem.ContractAreaAdministrators != null) {
        users = contrcatItem.ContractAreaAdministrators.split(';');
        $.each(users, function (index, value) {
            contractAccessUsers.push(value.trim());
        });
    }

    if (contrcatItem.FullControlPermissions != "" && contrcatItem.FullControlPermissions != null) {
        users = contrcatItem.FullControlPermissions.split(';');
        $.each(users, function (index, value) {
            contractAccessUsers.push(value.trim());
        });
    }

    if (contrcatItem.ReadWritePermissions != "" && contrcatItem.ReadWritePermissions != null) {
        users = contrcatItem.ReadWritePermissions.split(';');
        $.each(users, function (index, value) {
            contractAccessUsers.push(value.trim());
        });
    }


    if (contrcatItem.ReadOnlyPermissions != "" && contrcatItem.ReadOnlyPermissions != null) {
        users = contrcatItem.ReadOnlyPermissions.split(';');
        $.each(users, function (index, value) {
            contractAccessUsers.push(value.trim());
        });
    }

    users = $.map(contrcatItem.Approvers.split(";"), $.trim);
    $.each(users, function (index, value) {
        contractAccessUsers.push(value.trim());
    });

    users = $.map(contrcatItem.Reviewers.split(";"), $.trim);
    $.each(users, function (index, value) {
        contractAccessUsers.push(value.trim());
    });

    users = $.map(contrcatItem.ContractManagers.split(";"), $.trim);
    $.each(users, function (index, value) {
        contractAccessUsers.push(value.trim());
    });

    users = $.map(contrcatItem.Requestor.split(";"), $.trim);
    $.each(users, function (index, value) {
        contractAccessUsers.push(value.trim());
    });

    users = $.map(contrcatItem.SharedWith.split(";"), $.trim);
    $.each(users, function (index, value) {
        contractAccessUsers.push(value.trim());
    });


    if (item != null && item != "") {
        users = $.map(item.FullControl.split(";"), $.trim);
        $.each(users, function (index, value) {
            contractAccessUsers.push(value.trim());
        });

        users = $.map(item.Contribute.split(";"), $.trim);
        $.each(users, function (index, value) {
            contractAccessUsers.push(value.trim());
        });

        users = $.map(item.Readonly.split(";"), $.trim);
        $.each(users, function (index, value) {
            contractAccessUsers.push(value.trim());
        });

    }


    contractAccessUsers = contractAccessUsers.filter(function (e) { return e });
    contractAccessUsers = contractAccessUsers.sort()

    contractAccessUsers = $.unique(contractAccessUsers).sort();
    arrPermsnUser = contractAccessUsers;

    var vLastRow = $("#newPopup li:last").attr('id');

    var totalPermissionCount = "1";
    if (typeof vLastRow == "undefined") {
        totalPermissionCount = "1";
    }
    else {
        totalPermissionCount = parseInt(vLastRow.replace("PermissionList", ""));
        totalPermissionCount += 1;
    }

    var string = "";



    $.each(contractAccessUsers, function (index, value) {
        var fullpermission = false;
        var strUserRole = "";
        var strPermission = "";
        if ($.inArray(value, $.map(contrcatItem.BusinessAreaOwners.split(";"), $.trim)) > -1) {
            strUserRole = "Business Area Owner";
            strPermission = "Full Control";
            fullpermission = true;
        }
        if ($.inArray(value, $.map(contrcatItem.ProjectManager.split(";"), $.trim)) > -1) {
            strPermission = "Full Control";
            fullpermission = true;
            if (strUserRole != "") {
                strUserRole += ",Project Manager";
            }
            else {
                strUserRole = "Project Manager";
            }
        }


        if ($.inArray(value, $.map(contrcatItem.ContractAreaAdministrators.split(";"), $.trim)) > -1) {
            if (strPermission == "") {
                strPermission = "Read Only";
            }
            if (strUserRole != "") {
                strUserRole += ",Contract Area Administrator";
            }
            else {
                strUserRole = "Contract Area Administrator";
            }
        }

        if ($.inArray(value, $.map(contrcatItem.Approvers.split(";"), $.trim)) > -1) {
            if (strUserRole != "") {
                strUserRole += ",Approver";
            }
            else {
                strUserRole = "Approver";
            }
        }

        if ($.inArray(value, $.map(contrcatItem.Reviewers.split(";"), $.trim)) > -1) {
            if (strUserRole != "") {
                strUserRole += ",Reviewer";
            }
            else {
                strUserRole = "Reviewer";
            }
        }

        if ($.inArray(value, $.map(contrcatItem.ContractManagers.split(";"), $.trim)) > -1) {
            if (strUserRole != "") {
                strUserRole += ",Contract Owner";
            }
            else {
                strUserRole = "Contract Owner";
            }
        }
        if ($.inArray(value, $.map(contrcatItem.Requestor.split(";"), $.trim)) > -1) {
            if (strUserRole != "") {
                strUserRole += ",Requestor";
            }
            else {
                strUserRole = "Requestor";
            }
        }




        if ($.inArray(value, $.map(contrcatItem.FullControlPermissions.split(";"), $.trim)) > -1) {
            strPermission = "Full Control";
        }

        if ($.inArray(value, $.map(contrcatItem.ReadWritePermissions.split(";"), $.trim)) > -1) {
            if (strPermission == "" || strPermission == "Read Only") {
                strPermission = "Read/Write";
            }
        }

        if ($.inArray(value, $.map(contrcatItem.SharedWith.split(";"), $.trim)) > -1) {
            if (strUserRole != "") {
                strUserRole += "";
                strPermission = "Share";
            }
            else {
                strUserRole = "";
                strPermission = "Share";
            }
        }

        if (item != null && item != "") {

            if ($.inArray(value, $.map(item.FullControl.split(";"), $.trim)) > -1) {
                strPermission = "Full Control";
            }

            if ($.inArray(value, $.map(item.Contribute.split(";"), $.trim)) > -1) {
                if (strPermission == "" || strPermission == "Read Only") {
                    strPermission = "Read/Write";
                }
            }

            if ($.inArray(value, $.map(item.Readonly.split(";"), $.trim)) > -1) {
                if (strPermission == "") {
                    strPermission = "Read Only";
                }
            }

        }
        string += "<li id='PermissionList" + totalPermissionCount + "'><div class='share-pop-up-Middle'><div><p id='PermissionUser" + totalPermissionCount + "'>" + value.trim() + "</p>";
        //string += "<span id='UserRole" + totalPermissionCount + "'>" + "(" + strUserRole + ")" + "</span></div></div>";

        if (strUserRole != "") {
            string += "<span id='UserRole" + totalPermissionCount + "'>" + "(" + strUserRole + ")" + "</span></div></div>";

        }
        else {
            string += "<span id='UserRole" + totalPermissionCount + "'>" + "" + strUserRole + "" + "</span></div></div>";
        }

        if (fullpermission) {
            strPermission = "Full Control";
            string += "<div class='share-pop-up-Right'><span class='sortSpanUserPermission' id='UserPermission" + totalPermissionCount + "'><label>" + strPermission + "</label></span></div></li>";

        }
        else {
            string += "<div class='share-pop-up-Right'><span class='sortSpanUserPermission' id='UserPermission" + totalPermissionCount + "'>";
            if (strPermission == "Full Control" || strPermission == "Read/Write") {
                string += "<select id='PermissionOption" + totalPermissionCount + "'>";
                if (strPermission == "Full Control") {
                    string += "<option value='FullControl' selected >Full Control</option>";
                    string += "<option value='Read/Write'>Read/Write</option>";
                    string += "<option value='ReadOnly'>Read Only</option>";
                }
                else if (strPermission == "Read/Write") {
                    string += "<option value='FullControl'  >Full Control</option>";
                    string += "<option value='Read/Write' selected >Read/Write</option>";
                    string += "<option value='ReadOnly'>Read Only</option>";
                }
                string += "</select>";
            }
            else {
                if (strPermission == "" || strPermission == "Read Only") {
                    strPermission = "Read Only";
                    string += "<label>" + strPermission + "</label>";
                }
                else if (strPermission == "Share") {
                    strPermission = "Share";
                    string += "<label>" + strPermission + "</label>";
                }
            }
            string += "</span></div></li>";
        }

        strPermission = "";
        totalPermissionCount++;
    });

    $('#newPopup').append(string);
    var nonEditLI = $('#newPopup li').has('span.sortSpanUserPermission label');
    var editLI = $('#newPopup li').has('span.sortSpanUserPermission select');

    $('#newPopup').empty();

    $(nonEditLI).each(function () {
        $('#newPopup').append($(this));
    });

    $(editLI).each(function () {
        $('#newPopup').append($(this));
    });
}



function OpenContractShare(contractID, contractTitle) {
    ClearShareForm();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/settings',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (settings) {
            $("#txtShareExpInContract").val(settings.TaskDuration);
            $("#lblValidLinkDateContractIndex").html(moment(new Date()).add("days", settings.TaskDuration).format('MM/DD/YYYY'));
        },
        error: function () {

        }
    });
    $("#hdContractID").val(contractID);
    $("#hdContractTitle").val(contractTitle);


    if (contractTitle != "") {
        $("#tdShareContract").html("<b>" + contractTitle + "</b>");
    }
    else {
        $("#tdShareContract").html("<b>No Title</b>");
    }
    // $("#tdShareContract").append("<b>" + contractTitle + "</b>");
    getNameAndEmail(contractID);
    $("#shareContract").dialog("open");
}

function ManageContractTerm(contractID) {
    $("#hdContractID").val(contractID);
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + contractID,
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
        processData: false,
        success: function (item) {
            contractItem = item;
            OpenManageContractTerm(item);
            $("#loadingPage").fadeOut();
        }
    });
}

function ViewContractMetaData(contractID) {
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + contractID,
        type: 'GET',
        cache: false,
        contentType: false,
        //async: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
        processData: false,
        success: function (data) {
            contractRecord = data;
            BindMetadataDetail(contractRecord);
        }
    });
}

function BindMetadataDetail(contractRecord) {
    $("#tdSumContractTitle").html(contractRecord.ContractTitle);
    $("#tdSumContractNumber").html(contractRecord.ContractNumber);
    $("#tdSumContractType").html(contractRecord.ContractType);
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/IContractDetails?contractid=' + contractRecord.RowKey,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (mainmetadataFields) {
            var vMetadata = $(mainmetadataFields).find('Metadata');
            var vMetadataHTML = vMetadata[0].innerHTML;

            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracttypes/metadatas?contracttypename=' + encodeURIComponent(contractRecord.ContractType),
                type: 'GET',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                cache: false,
                success: function (metadataFields) {

                    $("#tblSummaryMetadata").empty();
                    var datalenght = metadataFields.length;
                    for (var i = 0; i < datalenght; i++) {
                        var item = metadataFields[i];
                        if ((item.FieldName != "ContractTitle") && (item.FieldName != "ContractNumber") && (item.FieldName != "ContractType") && (name != "STATUSCHANGEDALERT")) {
                            var vCurrency = "";
                            var vControls = '<tr>';
                            vControls += '<td class="f_head">' + item.FieldDisplayName + '</td>';

                            if (item.FieldType == "Date") {
                                var vv = $(vMetadata).find(item.FieldName).text();
                                var onlydate = "";
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
                                    vControls += '<td class="labelleft">' + onlydate + '</td>';
                                }
                            } else if (item.FieldName == "ContractValue" || item.FieldType == "Currency") {
                                vControls += '<td class="labelleft">' + $(vMetadata).find(item.FieldName).text() + '</td>';
                                vCurrency = item.FieldName;
                            }
                            else {
                                vControls += '<td class="labelleft">' + $(vMetadata).find(item.FieldName).text() + '</td>';
                            }

                            vControls += '</tr>';
                            vMetadataHTML = vMetadataHTML.replace("<" + item.FieldName + ">" + $(vMetadata).find(item.FieldName).text() + "</" + item.FieldName + ">", "");
                            $("#tblSummaryMetadata").append(vControls);

                            if (vCurrency != "") {
                                if (vCurrencyDisplayStyle == "1,234,567.89 (United Kingdom, United States, Hong Kong, Australia)") {
                                    $('#' + vCurrency).autoNumeric();
                                } else if (vCurrencyDisplayStyle == "1 234 567.89 (Canada, China)") {
                                    $('#' + vCurrency).autoNumeric({ aSep: ' ', aDec: '.'});
                                } else if (vCurrencyDisplayStyle == "1.234.567,89 (Most of EU)") {
                                    $('#' + vCurrency).autoNumeric({ aSep: '.', aDec: ','});
                                }
                                vCurrency == "";
                            }
                        }
                    }

                    var vContractFields = null;

                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contractfields',
                        type: 'GET',
                        dataType: 'json',
                        "Content-Type": "application/json",
                        headers: { 'eContracts-ApiKey': localStorage.APIKey },
                        cache: false,
                        async: false,
                        success: function (contractfields) {
                            vContractFields = contractfields;


                            $("#tblDetailsMetadata").empty();
                            var datalenght = $(vMetadataHTML).length;
                            for (var i = 0; i < datalenght; i++) {
                                var item = $(vMetadataHTML)[i];
                                var name = item.nodeName;
                                var vCurrency = "";
                                if ((name != "CONTRACTTITLE") && (name != "CONTRACTNUMBER") && (name != "CONTRACTTYPE") && (name != "STATUSCHANGEDALERT")) {
                                    var vField = $.grep(vContractFields, function (person) { return person.FieldName.toUpperCase() == name });
                                    var value = item.textContent;
                                    if (vField.length > 0) {
                                        var vControls = '<tr>';
                                        if (vField[0].FieldDisplayName == "Contract Managers") {
                                            vControls += '<td class="f_head">Contract Owner(s)</td>';
                                        } else {
                                            vControls += '<td class="f_head">' + vField[0].FieldDisplayName + '</td>';
                                        }
                                        if (value == '' || value == '0') {
                                            vControls += '<td class="labelleft">-</td>';
                                        }
                                        else {
                                            if (vField[0].FieldType == "Date") {
                                                var onlydate = "";
                                                onlydate = value.substring(0, value.length - 19);
                                                if (onlydate != "") {
                                                    if (localStorage.AppDateFormat == null || localStorage.AppDateFormat == "" || localStorage.AppDateFormat == 'undefined') {
                                                        onlydate = moment(new Date(onlydate)).format('MM/DD/YYYY');
                                                    }
                                                    else {
                                                        onlydate = moment(new Date(onlydate)).format(localStorage.AppDateFormat);
                                                    }
                                                }
                                                vControls += '<td class="labelleft">' + onlydate + '</td>';

                                            } else {

                                                if (vField[0].FieldName == "ContractValue" || item.FieldType == "Currency") {
                                                    vControls += '<td class="labelleft" id=' + vField[0].FieldName + '>' + value + '</td>';
                                                    vCurrency = vField[0].FieldName;
                                                } else {
                                                    vControls += '<td class="labelleft">' + value + '</td>';
                                                }
                                            }
                                        }
                                        vControls += '</tr>';

                                        $("#tblDetailsMetadata").append(vControls);

                                        if (vCurrency != "") {
                                            if (vCurrencyDisplayStyle == "1,234,567.89 (United Kingdom, United States, Hong Kong, Australia)") {
                                                $('#' + vCurrency).autoNumeric();
                                            } else if (vCurrencyDisplayStyle == "1 234 567.89 (Canada, China)") {
                                                $('#' + vCurrency).autoNumeric({ aSep: ' ', aDec: '.' });
                                            } else if (vCurrencyDisplayStyle == "1.234.567,89 (Most of EU)") {
                                                $('#' + vCurrency).autoNumeric({ aSep: '.', aDec: ',' });
                                            }
                                            vCurrency == "";
                                        }
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

function MetadataSummary() {

    $("#Details").removeClass('pop_up__Acti');
    $("#Summary").addClass('pop_up__Acti');
    $('#tblSummary').css("display", "");
    $('#tblDetailsMetadata').css("display", "none");

    $("#Details").removeClass('pop_up__Acti');
    $("#Summary").addClass('pop_up__Acti');
    $('#tblSummary').css("display", "");
    $('#tblDetailsMetadata').css("display", "none");


    //$("#tblSummary").show();
    //$("#tblDetailsMetadata").hide();

}

function MetadataDetails() {
    $("#Summary").removeClass('pop_up__Acti');
    $("#Details").addClass('pop_up__Acti');
    $('#tblSummary').css("display", "none");
    $('#tblDetailsMetadata').css("display", "");

    //$("#tblDetailsMetadata").show();
    //$("#tblSummary").hide();

}

function ManageRelatedContracts(ContractID, ContractTitle, BusinessAreaPath) {
    $("#loadingPage").fadeIn();
    $('#loadContract').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    $('#tblPopupContracts').empty();
    $('#hdnRelatedContractID').empty();
    $("#txtSearchBoxContract").val("");
    $('#lblBusinessAreaPath').html(BusinessAreaPath);
    $("#hdContractID").val(ContractID);
    $("#hdContractTitle").val(ContractTitle);

    $('#liSelected').empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/relatedcontracts?contractid=' + ContractID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (contactsJsonPayload) {
            var count = 0;
            $(contactsJsonPayload).each(function (i, item) {
                $("#hdnRelatedContractID").append(item.RelatedContractID + ';');
                $('#liSelected').append('<span style="font-size:11px;" id=' + item.RelatedContractID + '>' + item.RelatedContractTitle + ' (' + item.RelatedRelationshipType + ') <img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveRelationship(this);" style="float:right" /></span>');
            });

            OpenRelatedContractsPopup(ContractID, BusinessAreaPath);

        },
        error: function (request) {
            OpenRelatedContractsPopup(ContractID, BusinessAreaPath);
        }
    });

    //if ($('#tblPopupContracts tr').length <= 0) {
    //} else {
    //    $('#loadMA').empty();
    //    $("#popupContracts").dialog("option", "title", "Related Contract Records");
    //    $("#popupContracts").dialog("open");
    //    $("#loadingPage").fadeOut();
    //}

    //BindRelatedContractsPopup(ContractID);
}

function OpenRelatedContractsPopup(ContractID, BusinessAreaPath) {
    var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?stage=&searchkeyword=&customquery=&sortbyfield=ContractTitle&orderby=ASC';
    var relatedContractsTag = [];
    $("#txtSearchBoxContract").val("");
    $.ajax({
        url: vURL,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey, BusinessAreaLocation: BusinessAreaPath },
        cache: false,
        success: function (data) {
            $('#loadContract').empty();
            $(data).each(function (i, item) {
                if ($("#hdnRelatedContractID").html().indexOf(item.RowKey) > -1) { }
                else {
                    var article = '<tr><td>';
                    article += '<input id="' + item.RowKey + '" type="checkbox" name="RelatedContract" class="css1-checkbox" value="' + item.ContractTitle + '" />';
                    article += '<label for="' + item.RowKey + '" class="css1-label PreserveSpace">' + item.ContractTitle + '</label>';
                    article += '</td>';
                    article += '<td class="ddl"><td></tr>'
                    $("#tblPopupContracts").append(article);
                    relatedContractsTag.push(item.ContractTitle.trim());
                    $("#" + item.RowKey).click(function () {
                        if (this.checked) {
                            var vOptions = "<select class='f_inpt width90'>";
                            var jsLang = $("#ddlRelationshipTypeParent option:selected").val();
                            var rela1 = jQuery.grep(RelationshipTypes, function (a) {
                                return a[1] === jsLang;
                            });
                            var rela2 = jQuery.grep(RelationshipTypes, function (a) {
                                return a[2].indexOf(jsLang) > -1;
                            });
                            if (rela1 != null && typeof (rela1) != "undefined" && rela1.length != 0) {
                                var Relationship = rela1[0];
                                $.each(Relationship[2], function (index, value) {
                                    var optRel2 = value.toString();
                                    vOptions += "<option value='" + optRel2 + "'>" + optRel2 + "</option>";
                                })
                            }
                            else if (rela2 != null && typeof (rela2) != "undefined" && rela2.length != 0) {
                                var Relationship = rela2[0];
                                vOptions += "<option value='" + Relationship[1] + "'>" + Relationship[1] + "</option>";
                            }
                            else {
                                switch (jsLang) {
                                    case 'Master Agreement':
                                        vOptions += '<option value="Sub-Agreement">Sub-Agreement</option>';
                                        vOptions += '<option value="SOW">SOW</option>';
                                        break;
                                    case 'Sub-Agreement':
                                    case 'SOW':
                                        vOptions += '<option value="Master Agreement">Master Agreement</option>';
                                        break;
                                    case 'Prime Contractor Agreement':
                                        vOptions += '<option value="Sub Contractor Agreement">Sub Contractor Agreement</option>';
                                        break;
                                    case 'Sub Contractor Agreement':
                                        vOptions += '<option value="Prime Contractor Agreement">Prime Contractor Agreement</option>';
                                        break;
                                    case 'Blanket Agreement':
                                        vOptions += '<option value="Order">Order</option>';
                                        vOptions += '<option value="Invoice">Invoice</option>';
                                        break;
                                    case 'Order':
                                    case 'Invoice':
                                        vOptions += '<option value="Blanket Agreement">Blanket Agreement</option>';
                                        break;
                                    case 'Original':
                                        vOptions += '<option value="Duplicate">Duplicate</option>';
                                        vOptions += '<option value="Copy">Copy</option>';
                                        break;
                                    case 'Duplicate':
                                    case 'Copy':
                                        vOptions += '<option value="Original">Original</option>';
                                        break;
                                    case 'Past Contract':
                                        vOptions += '<option value="Renegotiated Contract">Renegotiated Contract</option>';
                                        break;
                                    case 'Renegotiated Contract':
                                        vOptions += '<option value="Past Contract">Past Contract</option>';
                                        break;
                                    case 'Primary Contract':
                                        vOptions += '<option value="Amendment">Amendment</option>';
                                        vOptions += '<option value="Modification">Modification</option>';
                                        break;
                                    case 'Amendment':
                                    case 'Modification':
                                        vOptions += '<option value="Primary Contract">Primary Contract</option>';
                                        break;
                                    case 'Other':
                                        vOptions += '<option value="Other">Other</option>';
                                        break;
                                }
                            }
                            vOptions += '</select>';
                            $(this).parent().parent().children(".ddl").append(vOptions);

                        } else {

                            $(this).parent().parent().children(".ddl").empty();
                        }

                    });
                }
            });

            var vCount = $("#tblPopupContracts tr").length;
            if (vCount != 0) {
                $('#compact-paginationRelatedContracts').pagination({
                    items: vCount,
                    itemsOnPage: 10,
                    typeID: 'tblPopupContracts',
                    cssStyle: 'compact-theme'
                });
            } else {
                $('#loadContract').html('<p style="margin-left: 20px;">No items found.</p>')
            }
            $("#txtSearchBoxContract").autocomplete({
                source: relatedContractsTag,
                minLength: 2,
                focus: function (event, ui) {
                    return false;
                },
                select: function (evn, uidetails) {
                    $("#txtSearchBoxContract").val(uidetails.item.label);
                    ViewContracts();
                }
            });
            $("#popupContracts").dialog("option", "title", "Related Contract Record(s)");
            $("#popupContracts").dialog("open");
            $("#loadingPage").fadeOut();
        },
        error: function () {
            $('#loadMA').empty();
            $('#loadMA').html('<p style="margin-left: 20px;">No items found.</p>');
            $("#loadingPage").fadeOut();
        }
    });
}

function ViewContracts() {
    $("#tblPopupContracts").html('');
    $('#loadContract').html('<img src="../Content/Images/icon/loading.gif"> Searching...');
    var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?stage=&searchkeyword=' + $("#txtSearchBoxContract").val() + '&customquery=&sortbyfield=ContractTitle&orderby=ASC';
    $.ajax({
        url: vURL,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey, BusinessAreaLocation: $("#lblBusinessAreaPath").text() },
        cache: false,
        success: function (data) {
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                if ($("#hdnRelatedContractID").html().indexOf(item.RowKey) > -1) { }
                else {
                    var article = '<tr><td>';
                    article += '<input id="' + item.RowKey + '" type="checkbox" name="RelatedContract" class="css1-checkbox" value="' + item.ContractTitle + '" />';
                    article += '<label for="' + item.RowKey + '" class="css1-label PreserveSpace">' + item.ContractTitle + '</label>';
                    article += '</td>';
                    article += '<td class="ddl"><td></tr>'
                    $("#tblPopupContracts").append(article);

                    $("#" + item.RowKey).click(function () {
                        if (this.checked) {
                            var vOptions = "<select class='f_inpt width90'>";
                            var jsLang = $("#ddlRelationshipTypeParent option:selected").val();
                            var rela1 = jQuery.grep(RelationshipTypes, function (a) {
                                return a[1] === jsLang;
                            });
                            var rela2 = jQuery.grep(RelationshipTypes, function (a) {
                                return a[2].indexOf(jsLang) > -1;
                            });
                            if (rela1 != null && typeof (rela1) != "undefined" && rela1.length != 0) {
                                var Relationship = rela1[0];
                                $.each(Relationship[2], function (index, value) {
                                    var optRel2 = value.toString();
                                    vOptions += "<option value='" + optRel2 + "'>" + optRel2 + "</option>";
                                })
                            }
                            else if (rela2 != null && typeof (rela2) != "undefined" && rela2.length != 0) {
                                var Relationship = rela2[0];
                                vOptions += "<option value='" + Relationship[1] + "'>" + Relationship[1] + "</option>";
                            }
                            else {
                                switch (jsLang) {
                                    case 'Master Agreement':
                                        vOptions += '<option value="Sub-Agreement">Sub-Agreement</option>';
                                        vOptions += '<option value="SOW">SOW</option>';
                                        break;
                                    case 'Sub-Agreement':
                                    case 'SOW':
                                        vOptions += '<option value="Master Agreement">Master Agreement</option>';
                                        break;
                                    case 'Prime Contractor Agreement':
                                        vOptions += '<option value="Sub Contractor Agreement">Sub Contractor Agreement</option>';
                                        break;
                                    case 'Sub Contractor Agreement':
                                        vOptions += '<option value="Prime Contractor Agreement">Prime Contractor Agreement</option>';
                                        break;
                                    case 'Blanket Agreement':
                                        vOptions += '<option value="Order">Order</option>';
                                        vOptions += '<option value="Invoice">Invoice</option>';
                                        break;
                                    case 'Order':
                                    case 'Invoice':
                                        vOptions += '<option value="Blanket Agreement">Blanket Agreement</option>';
                                        break;
                                    case 'Original':
                                        vOptions += '<option value="Duplicate">Duplicate</option>';
                                        vOptions += '<option value="Copy">Copy</option>';
                                        break;
                                    case 'Duplicate':
                                    case 'Copy':
                                        vOptions += '<option value="Original">Original</option>';
                                        break;
                                    case 'Past Contract':
                                        vOptions += '<option value="Renegotiated Contract">Renegotiated Contract</option>';
                                        break;
                                    case 'Renegotiated Contract':
                                        vOptions += '<option value="Past Contract">Past Contract</option>';
                                        break;
                                    case 'Primary Contract':
                                        vOptions += '<option value="Amendment">Amendment</option>';
                                        vOptions += '<option value="Modification">Modification</option>';
                                        break;
                                    case 'Amendment':
                                    case 'Modification':
                                        vOptions += '<option value="Primary Contract">Primary Contract</option>';
                                        break;
                                    case 'Other':
                                        vOptions += '<option value="Other">Other</option>';
                                        break;
                                }
                            }
                            vOptions += '</select>';
                            $(this).parent().parent().children(".ddl").append(vOptions);

                        } else {

                            $(this).parent().parent().children(".ddl").empty();
                        }

                    });
                }
            }
            var vCount = $("#tblPopupContracts tr").length;
            if (vCount != 0) {
                $('#loadContract').html('');
                $('#compact-paginationRelatedContracts').css('display', '');
                $('#compact-paginationRelatedContracts').pagination({
                    items: vCount,
                    itemsOnPage: 10,
                    typeID: 'tblPopupContracts',
                    cssStyle: 'compact-theme'
                });
            } else {
                $('#loadContract').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
                $('#compact-paginationRelatedContracts').css('display', 'none');
            }
        },
        error: function () {
            $('#compact-paginationRelatedContracts').css('display', 'none');
            $('#loadContract').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
        }
    });

}

$("#ddlRelationshipType").change(function () {
    $("#ddlRelationshipTypeParent").empty();

    var jsLang = this.value;
    var rowK = jQuery.grep(RelationshipTypes, function (a) {
        return a[0] === jsLang;
    });
    if (rowK != null && typeof (rowK) != "undefined" && rowK.length != 0) {
        var Relationship = rowK[0];
        $("#ddlRelationshipTypeParent").append("<option value='" + Relationship[1] + "'>" + Relationship[1] + "</option>");
        $.each(Relationship[2], function (index, value) {
            var optRel2 = value.toString();
            $("#ddlRelationshipTypeParent").append("<option value='" + optRel2 + "'>" + optRel2 + "</option>");
        })
    }
    else {
        switch (jsLang) {
            case 'Master Agreement':
                $("#ddlRelationshipTypeParent").append("<option value='Master Agreement'>Master Agreement</option>");
                $("#ddlRelationshipTypeParent").append("<option value='Sub-Agreement'>Sub-Agreement</option>");
                $("#ddlRelationshipTypeParent").append("<option value='SOW'>SOW</option>");
                break;
            case 'Prime Contractor Agreement':
                $("#ddlRelationshipTypeParent").append("<option value='Prime Contractor Agreement'>Prime Contractor Agreement</option>");
                $("#ddlRelationshipTypeParent").append("<option value='Sub Contractor Agreement'>Sub Contractor Agreement</option>");
                break;
            case 'Blanket Agreement':
                $("#ddlRelationshipTypeParent").append("<option value='Blanket Agreement'>Blanket Agreement</option>");
                $("#ddlRelationshipTypeParent").append("<option value='Order'>Order</option>");
                $("#ddlRelationshipTypeParent").append("<option value='Invoice'>Invoice</option>");
                break;
            case 'Original':
                $("#ddlRelationshipTypeParent").append("<option value='Original'>Original</option>");
                $("#ddlRelationshipTypeParent").append("<option value='Duplicate'>Duplicate</option>");
                $("#ddlRelationshipTypeParent").append("<option value='Copy'>Copy</option>");
                break;
            case 'Past Contract':
                $("#ddlRelationshipTypeParent").append("<option value='Past Contract'>Past Contract</option>");
                $("#ddlRelationshipTypeParent").append("<option value='Renegotiated Contract'>Renegotiated Contract</option>");
                break;
            case 'Primary Contract':
                $("#ddlRelationshipTypeParent").append("<option value='Primary Contract'>Primary Contract</option>");
                $("#ddlRelationshipTypeParent").append("<option value='Amendment'>Amendment</option>");
                $("#ddlRelationshipTypeParent").append("<option value='Modification'>Modification</option>");
                break;
            case 'Other':
                $("#ddlRelationshipTypeParent").append("<option value='Other'>Other</option>");
                break;
        }
    }

    $('input:checkbox[name="RelatedContract"]:checked').each(function () {
        $(this).parent().parent().children(".ddl").empty();
        var vOptions = "<select class='f_inpt width90'>";
        var jsLang = $("#ddlRelationshipTypeParent option:selected").val();
        var rela1 = jQuery.grep(RelationshipTypes, function (a) {
            return a[1] === jsLang;
        });
        var rela2 = jQuery.grep(RelationshipTypes, function (a) {
            return a[2].indexOf(jsLang) > -1;
        });
        if (rela1 != null && typeof (rela1) != "undefined" && rela1.length != 0) {
            var Relationship = rela1[0];
            $.each(Relationship[2], function (index, value) {
                var optRel2 = value.toString();
                vOptions += "<option value='" + optRel2 + "'>" + optRel2 + "</option>";
            })
        }
        else if (rela2 != null && typeof (rela2) != "undefined" && rela2.length != 0) {
            var Relationship = rela2[0];
            vOptions += "<option value='" + Relationship[1] + "'>" + Relationship[1] + "</option>";
        }
        else {
            switch (jsLang) {
                case 'Master Agreement':
                    vOptions += '<option value="Sub-Agreement">Sub-Agreement</option>';
                    vOptions += '<option value="SOW">SOW</option>';
                    break;
                case 'Sub-Agreement':
                case 'SOW':
                    vOptions += '<option value="Master Agreement">Master Agreement</option>';
                    break;
                case 'Prime Contractor Agreement':
                    vOptions += '<option value="Sub Contractor Agreement">Sub Contractor Agreement</option>';
                    break;
                case 'Sub Contractor Agreement':
                    vOptions += '<option value="Prime Contractor Agreement">Prime Contractor Agreement</option>';
                    break;
                case 'Blanket Agreement':
                    vOptions += '<option value="Order">Order</option>';
                    vOptions += '<option value="Invoice">Invoice</option>';
                    break;
                case 'Order':
                case 'Invoice':
                    vOptions += '<option value="Blanket Agreement">Blanket Agreement</option>';
                    break;
                case 'Original':
                    vOptions += '<option value="Duplicate">Duplicate</option>';
                    vOptions += '<option value="Copy">Copy</option>';
                    break;
                case 'Duplicate':
                case 'Copy':
                    vOptions += '<option value="Original">Original</option>';
                    break;
                case 'Past Contract':
                    vOptions += '<option value="Renegotiated Contract">Renegotiated Contract</option>';
                    break;
                case 'Renegotiated Contract':
                    vOptions += '<option value="Past Contract">Past Contract</option>';
                    break;
                case 'Primary Contract':
                    vOptions += '<option value="Amendment">Amendment</option>';
                    vOptions += '<option value="Modification">Modification</option>';
                    break;
                case 'Amendment':
                case 'Modification':
                    vOptions += '<option value="Primary Contract">Primary Contract</option>';
                    break;
                case 'Other':
                    vOptions += '<option value="Other">Other</option>';
                    break;
            }
        }
        vOptions += '</select>';
        $(this).parent().parent().children(".ddl").append(vOptions);
    });
});

$("#ddlRelationshipTypeParent").change(function () {

    $('input:checkbox[name="RelatedContract"]:checked').each(function () {
        $(this).parent().parent().children(".ddl").empty();
        var vOptions = "<select class='f_inpt width90'>";
        var jsLang = $("#ddlRelationshipTypeParent option:selected").val();
        var rela1 = jQuery.grep(RelationshipTypes, function (a) {
            return a[1] === jsLang;
        });
        var rela2 = jQuery.grep(RelationshipTypes, function (a) {
            return a[2].indexOf(jsLang) > -1;
        });
        if (rela1 != null && typeof (rela1) != "undefined" && rela1.length != 0) {
            var Relationship = rela1[0];
            $.each(Relationship[2], function (index, value) {
                var optRel2 = value.toString();
                vOptions += "<option value='" + optRel2 + "'>" + optRel2 + "</option>";
            })
        }
        else if (rela2 != null && typeof (rela2) != "undefined" && rela2.length != 0) {
            var Relationship = rela2[0];
            vOptions += "<option value='" + Relationship[1] + "'>" + Relationship[1] + "</option>";
        }
        else {
            switch (jsLang) {
                case 'Master Agreement':
                    vOptions += '<option value="Sub-Agreement">Sub-Agreement</option>';
                    vOptions += '<option value="SOW">SOW</option>';
                    break;
                case 'Sub-Agreement':
                case 'SOW':
                    vOptions += '<option value="Master Agreement">Master Agreement</option>';
                    break;
                case 'Prime Contractor Agreement':
                    vOptions += '<option value="Sub Contractor Agreement">Sub Contractor Agreement</option>';
                    break;
                case 'Sub Contractor Agreement':
                    vOptions += '<option value="Prime Contractor Agreement">Prime Contractor Agreement</option>';
                    break;
                case 'Blanket Agreement':
                    vOptions += '<option value="Order">Order</option>';
                    vOptions += '<option value="Invoice">Invoice</option>';
                    break;
                case 'Order':
                case 'Invoice':
                    vOptions += '<option value="Blanket Agreement">Blanket Agreement</option>';
                    break;
                case 'Original':
                    vOptions += '<option value="Duplicate">Duplicate</option>';
                    vOptions += '<option value="Copy">Copy</option>';
                    break;
                case 'Duplicate':
                case 'Copy':
                    vOptions += '<option value="Original">Original</option>';
                    break;
                case 'Past Contract':
                    vOptions += '<option value="Renegotiated Contract">Renegotiated Contract</option>';
                    break;
                case 'Renegotiated Contract':
                    vOptions += '<option value="Past Contract">Past Contract</option>';
                    break;
                case 'Primary Contract':
                    vOptions += '<option value="Amendment">Amendment</option>';
                    vOptions += '<option value="Modification">Modification</option>';
                    break;
                case 'Amendment':
                case 'Modification':
                    vOptions += '<option value="Primary Contract">Primary Contract</option>';
                    break;
                case 'Other':
                    vOptions += '<option value="Other">Other</option>';
                    break;
            }
        }
        vOptions += '</select>';
        $(this).parent().parent().children(".ddl").append(vOptions);
    });
});

function liRemoveRelationship(obj) {
    var child = obj.parentNode;

    var relatedContractTitle = child.textContent;
    swal({
        title: '',
        text: "Are you sure you want to <span style=\"font-weight:700\">delete '" + relatedContractTitle + "'</span>?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        html: true
    },
   function (confirmed) {
       if (confirmed) {
           child.parentNode.removeChild(child);
           var relatedContractID = child.id;

           $.ajax({
               url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + $("#hdContractID").val() + '/relatedcontracts?relatedcontractid=' + relatedContractID,
               type: 'DELETE',
               dataType: 'json',
               headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
               "Content-Type": "application/json",
               cache: false,
               success: function (data) {

               }
           });

           $.ajax({
               url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + relatedContractID + '/relatedcontracts?relatedcontractid=' + $("#hdContractID").val(),
               type: 'DELETE',
               dataType: 'json',
               headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
               "Content-Type": "application/json",
               cache: false,
               success: function (data) {

               }
           });


           //alert('Related Contract Deleted');
           swal("", "Related Contract Deleted");
           BindRelatedContracts();
       }
       return;
   });

    //if (confirm("Are you sure you want to delete '" + relatedContractTitle + "'?")) {
    //    child.parentNode.removeChild(child);
    //    var relatedContractID = child.id;

    //    $.ajax({
    //        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + $("#hdContractID").val() + '/relatedcontracts?relatedcontractid=' + relatedContractID,
    //        type: 'DELETE',
    //        dataType: 'json',
    //        headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
    //        "Content-Type": "application/json",
    //        cache: false,
    //        success: function (data) {

    //        }
    //    });

    //    $.ajax({
    //        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + relatedContractID + '/relatedcontracts?relatedcontractid=' + $("#hdContractID").val(),
    //        type: 'DELETE',
    //        dataType: 'json',
    //        headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
    //        "Content-Type": "application/json",
    //        cache: false,
    //        success: function (data) {

    //        }
    //    });


    //    alert('Related Contract Deleted');
    //    BindRelatedContracts();
    //}
}

function CreateRelatedContracts() {

    if (requiredValidator('popupContracts', false)) {
        var vRelatedContractID = "";
        var vRelatedContractTitle = "";
        var vChildRelation = "";

        $('input:checkbox[name="RelatedContract"]:checked').each(function () {
            if (vRelatedContractID == "") {
                vRelatedContractID = this.id;
                vRelatedContractTitle = this.value;
                vChildRelation = $(this).parent().parent().children(".ddl").find('option:selected').text();
            }
            else {
                vRelatedContractID += "; " + this.id;
                vRelatedContractTitle += "; " + this.value;
                vChildRelation += "; " + $(this).parent().parent().children(".ddl").find('option:selected').text();
            }
        });
        if (vRelatedContractID != "") {
            $("#loadingPage").fadeIn();
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + $("#hdContractID").val() + '/relatedcontracts',
                type: 'POST',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                data: {
                    ContractID: $("#hdContractID").val(),
                    ContractTitle: $("#hdContractTitle").val(),
                    RelatedContractID: vRelatedContractID,
                    RelatedContractTitle: vRelatedContractTitle,
                    RelationshipType: $("#ddlRelationshipTypeParent").find('option:selected').text(),
                    RelatedRelationshipType: vChildRelation,
                    CreatedBy: localStorage.UserName,
                    ModifiedBy: localStorage.UserName,
                },
                cache: false,
                success: function (person) {
                    $("#hdContractID").val('');
                    $("#hdContractTitle").val('');
                    //alert('Related Contract Saved');
                    swal("", "Related Contract Saved");
                    $("#popupContracts").dialog("close");
                    $("#loadingPage").fadeOut();
                },
                error: function (request) {
                    $("#loadingPage").fadeOut();
                }
            });
            return true;
        } else {
            //alert('No contract has been selected.');
            swal("", "No contract has been selected.");
            $("#popupContracts").dialog("close");
            return false;
        }
    }

}

function getNameAndEmail(ContractID) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/' + ContractID + '/contacts',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            var datalength = data.length;
            for (var i = 0; i < datalength; i++) {
                var item = data[i];
                var vLastRow = $("#tblShareDocument tr:last").attr('id');
                var totalFileCount = "2";
                if (typeof vLastRow == "undefined") {
                    totalFileCount = "2";
                }
                else {
                    totalFileCount = parseInt(vLastRow.replace("trSignee", ""));
                    totalFileCount += 1;
                }
                if (i == 0) {
                    $('#txtShareContract1').val(item.ContactName);
                    $('#txtShareContractEmail1').val(item.EmailID);
                }
                else {
                    var htmlFormatFile = '<tr id="trShareContract' + totalFileCount + '">';
                    htmlFormatFile += '<td>';
                    htmlFormatFile += '<input id="txtShareContract' + totalFileCount + '" value="' + item.ContactName + '" name="ShareContractName' + totalFileCount + '" placeholder="Name" title="Name" type="text" class="f_inpt width90" value="' + item.ContactName + '" />';
                    htmlFormatFile += '</td>';
                    htmlFormatFile += '<td>';
                    htmlFormatFile += '<input id="txtShareContractEmail' + totalFileCount + '" value="' + item.EmailID + '" name="ShareContractEmail' + totalFileCount + '" placeholder="Email ID" title="Email ID" type="text" class="f_inpt width90 validemail" value="' + item.EmailID + '" />';
                    htmlFormatFile += '</td>';
                    htmlFormatFile += '<td style="width:20px">';
                    htmlFormatFile += '<a href="javascript:void(0)" onclick="DeleteShareContract(this)"><img src="../Content/Images/icon/delete.png" /></a>';
                    htmlFormatFile += '</td>';
                    htmlFormatFile += '</tr>';
                    $("#tblShareContract").append(htmlFormatFile);
                }
            }
        },
        error: function () {
        }

    });
}
var previouscm = "";
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
            for (var i = 0; i < datalength; i++) {
                var item = data[i];
                var sRowKey = item.RowKey;
                var sUserName = item.UserName;
                var sUserType = item.UserType;
                if (sUserType.indexOf("Global Contract Owner") >= 0) {
                    arrGlobalUser.push(sUserName);
                } else { arrUser.push(sUserName); }

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
                $("#ddlSendRenewReminderTo").append(article);
            }
            $("#ddlBusinessOwners").chosen();

            $("#ddlContractManagers").chosen();


            $("#ddlContractManagers").chosen().on("change", function (evt, params) {
                var previous = $(this).data("previous") || "";
                if ($('#chkpermission').is(':checked')) {
                    var ddl = $(this);

                    var present = ddl.val();
                    if (present.length > previous.length) {
                        var difference = [];
                        jQuery.grep(present, function (el) {
                            if (jQuery.inArray(el, previous) == -1) difference.push(el);
                        });

                        if (difference.length > 0) {
                            var arrp = [];
                            $("#newPopup li p").each(function () { arrp.push($(this).text()) });

                            if ($.inArray(difference[0], arrp) == -1) {
                                var len = $('ul#newPopup li').length + 1;



                                var string1 = "";
                                string1 += "<li class='CustomPLi' id='PermissionList" + len + "'><div class='share-pop-up-Middle'><div><p id='PermissionUser" + len + "'>" + difference[0].trim() + "</p>";
                                string1 += "<span id='UserRole" + len + "'></span></div></div>";

                                string1 += "<div class='share-pop-up-Right'><span id='UserPermission" + len + "'>";

                                string1 += "<select id='PermissionOption" + len + "'>";

                                string1 += "<option value='FullControl'  >Full Control</option>";
                                string1 += "<option value='Read/Write'  >Read/Write</option>";
                                string1 += "<option value='ReadOnly' selected>Read Only</option>";

                                string1 += "</select>";


                                string1 += "</span></div></li>";


                                $("#newPopup").append(string1);

                            }

                            $(this).data("previous", present);

                        }


                    }
                    else if (present.length < previous.length) {

                        var difference = [];
                        jQuery.grep(previous, function (el) {
                            if (jQuery.inArray(el, present) == -1) difference.push(el);
                        });

                        if (difference.length > 0) {
                            var arrp = [];
                            $("#newPopup .CustomPLi p").each(function () { arrp.push($(this).text()) });

                            if (arrp.length > 0) {

                                $('#newPopup li.CustomPLi p').each(function () {
                                    if ($(this).text() == difference[0]) {
                                        $(this).parent().parent().parent().remove();
                                    }

                                });
                            }
                            $(this).data("previous", present);

                        }
                    }
                    else {
                        $(this).data("previous", present);
                    }


                }
            });

            $("#ddlReviewers").chosen();

            $("#ddlReviewers").chosen().on("change", function (evt, params) {
                var previous = $(this).data("previous") || "";
                if ($('#chkpermission').is(':checked')) {
                    var ddl = $(this);

                    var present = ddl.val();
                    if (present.length > previous.length) {
                        var difference = [];
                        jQuery.grep(present, function (el) {
                            if (jQuery.inArray(el, previous) == -1) difference.push(el);
                        });

                        if (difference.length > 0) {
                            var arrp = [];
                            $("#newPopup li p").each(function () { arrp.push($(this).text()) });

                            if ($.inArray(difference[0], arrp) == -1) {
                                var len = $('ul#newPopup li').length + 1;



                                var string1 = "";
                                string1 += "<li class='CustomPLi' id='PermissionList" + len + "'><div class='share-pop-up-Middle'><div><p id='PermissionUser" + len + "'>" + difference[0].trim() + "</p>";
                                string1 += "<span id='UserRole" + len + "'></span></div></div>";

                                string1 += "<div class='share-pop-up-Right'><span id='UserPermission" + len + "'>";

                                string1 += "<select id='PermissionOption" + len + "'>";

                                string1 += "<option value='FullControl'  >Full Control</option>";
                                string1 += "<option value='Read/Write'  selected>Read/Write</option>";
                                string1 += "<option value='ReadOnly' >Read Only</option>";

                                string1 += "</select>";


                                string1 += "</span></div></li>";


                                $("#newPopup").append(string1);

                            }

                            $(this).data("previous", present);

                        }


                    }
                    else if (present.length < previous.length) {

                        var difference = [];
                        jQuery.grep(previous, function (el) {
                            if (jQuery.inArray(el, present) == -1) difference.push(el);
                        });

                        if (difference.length > 0) {
                            var arrp = [];
                            $("#newPopup .CustomPLi p").each(function () { arrp.push($(this).text()) });

                            if (arrp.length > 0) {

                                $('#newPopup li.CustomPLi p').each(function () {
                                    if ($(this).text() == difference[0]) {
                                        $(this).parent().parent().parent().remove();
                                    }

                                });
                            }
                            $(this).data("previous", present);

                        }
                    }
                    else {
                        $(this).data("previous", present);
                    }


                }
            });

            $("#ddlApproversNew").chosen();

            $("#ddlApproversNew").chosen().on("change", function (evt, params) {
                var previous = $(this).data("previous") || "";
                if ($('#chkpermission').is(':checked')) {
                    var ddl = $(this);

                    var present = ddl.val();
                    if (present.length > previous.length) {
                        var difference = [];
                        jQuery.grep(present, function (el) {
                            if (jQuery.inArray(el, previous) == -1) difference.push(el);
                        });

                        if (difference.length > 0) {
                            var arrp = [];
                            $("#newPopup li p").each(function () { arrp.push($(this).text()) });

                            if ($.inArray(difference[0], arrp) == -1) {
                                var len = $('ul#newPopup li').length + 1;



                                var string1 = "";
                                string1 += "<li class='CustomPLi' id='PermissionList" + len + "'><div class='share-pop-up-Middle'><div><p id='PermissionUser" + len + "'>" + difference[0].trim() + "</p>";
                                string1 += "<span id='UserRole" + len + "'></span></div></div>";

                                string1 += "<div class='share-pop-up-Right'><span id='UserPermission" + len + "'>";

                                string1 += "<select id='PermissionOption" + len + "'>";

                                string1 += "<option value='FullControl'  >Full Control</option>";
                                string1 += "<option value='Read/Write' selected>Read/Write</option>";
                                string1 += "<option value='ReadOnly'>Read Only</option>";

                                string1 += "</select>";


                                string1 += "</span></div></li>";


                                $("#newPopup").append(string1);

                            }

                            $(this).data("previous", present);

                        }


                    }
                    else if (present.length < previous.length) {

                        var difference = [];
                        jQuery.grep(previous, function (el) {
                            if (jQuery.inArray(el, present) == -1) difference.push(el);
                        });

                        if (difference.length > 0) {
                            var arrp = [];
                            $("#newPopup .CustomPLi p").each(function () { arrp.push($(this).text()) });

                            if (arrp.length > 0) {

                                $('#newPopup li.CustomPLi p').each(function () {
                                    if ($(this).text() == difference[0]) {
                                        $(this).parent().parent().parent().remove();
                                    }

                                });
                            }
                            $(this).data("previous", present);

                        }
                    }
                    else {
                        $(this).data("previous", present);
                    }


                }
            });


            $("#ddlSignees").chosen();
            $("#ddlSignees").chosen().on("change", function (evt, params) {
                var previous = $(this).data("previous") || "";
                if ($('#chkpermission').is(':checked')) {
                    var ddl = $(this);

                    var present = ddl.val();
                    if (present.length > previous.length) {
                        var difference = [];
                        jQuery.grep(present, function (el) {
                            if (jQuery.inArray(el, previous) == -1) difference.push(el);
                        });

                        if (difference.length > 0) {
                            var arrp = [];
                            $("#newPopup li p").each(function () { arrp.push($(this).text()) });

                            if ($.inArray(difference[0], arrp) == -1) {
                                var len = $('ul#newPopup li').length + 1;



                                var string1 = "";
                                string1 += "<li class='CustomPLi' id='PermissionList" + len + "'><div class='share-pop-up-Middle'><div><p id='PermissionUser" + len + "'>" + difference[0].trim() + "</p>";
                                string1 += "<span id='UserRole" + len + "'></span></div></div>";

                                string1 += "<div class='share-pop-up-Right'><span id='UserPermission" + len + "'>";

                                string1 += "<select id='PermissionOption" + len + "'>";

                                string1 += "<option value='FullControl'  >Full Control</option>";
                                string1 += "<option value='Read/Write' selected >Read/Write</option>";
                                string1 += "<option value='ReadOnly'>Read Only</option>";

                                string1 += "</select>";


                                string1 += "</span></div></li>";


                                $("#newPopup").append(string1);

                            }

                            $(this).data("previous", present);

                        }


                    }
                    else if (present.length < previous.length) {

                        var difference = [];
                        jQuery.grep(previous, function (el) {
                            if (jQuery.inArray(el, present) == -1) difference.push(el);
                        });

                        if (difference.length > 0) {
                            var arrp = [];
                            $("#newPopup .CustomPLi p").each(function () { arrp.push($(this).text()) });

                            if (arrp.length > 0) {

                                $('#newPopup li.CustomPLi p').each(function () {
                                    if ($(this).text() == difference[0]) {
                                        $(this).parent().parent().parent().remove();
                                    }

                                });
                            }
                            $(this).data("previous", present);

                        }
                    }
                    else {
                        $(this).data("previous", present);
                    }


                }
            });

            $("#ddlBusinessUsers").chosen();
            $("#ddlApproversRenewSettings").chosen();
            $("#ddlBusinessOwnersM").chosen();
            $("#ddlContractManagersM").chosen();

            $("#ddlReadOnly").chosen();
            $("#ddlReadWrite").chosen();
            $("#ddlFullControl").chosen();
            $("#ddlWorkflowCC").chosen();
            $("#ddlSendRenewReminderTo").chosen();


            // alert(y)



            //$('#ddlContractManagers').change(function () {
            //    // Get Dropdownlist seleted item text
            //    $("#ddlFullControl").text($("#ddlFullControl option:selected").text());
            //    // Get Dropdownlist selected item value
            //    //$("#lblid").text($("#ddlCountry").val());
            //    return false;
            //})







        },
        error:
            function (data) {
            }
    });






}


//$('#ddlContractManagers').on('change', function () {
//    $('#ddlFullControl').val($('#ddlContractManagers').val());
//})


//$('#ddlContractManagers').change(function () {





//   var contractmanagers = $("#ddlContractManagers").val();
//  var str = contractmanagers.split(",");
//     alert(str);
//    // alert(contractmanagers);
//  // });
//  //  alert("Hi");
//   // $("#ddlFullControl").val($("#ddlContractManagers").text());
//    //$('#ddlFullControl').val($('#ddlContractManagers:selected').text());

//});





function getselectedusers(users) {
    var usersarr = [];
    var res = users.split(";");

    var reslength = res.length;
    for (var i = 0; i < reslength; i++) {
        usersarr.push(res[i].trim());
    }

    return usersarr;
}

//function CreateContractActivityList() {
//    $("#contractLogs").empty();
//    $.ajax({
//        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/activities/contracts/' + $("#hdContractID").val() + '?actiontype=',
//        type: 'GET',
//        dataType: 'json',
//        headers: { 'eContracts-ApiKey': localStorage.APIKey },
//        cache: false,
//        success: function (data) {
//            var datalength = data.length;
//            for (var i = 0; i < datalength; i++) {
//                var item = data[i];
//                var sObject = item.Object;
//                var sActivity = item.Activity;
//                var sUserID = item.UserID;
//                var sTimestamp = moment(new Date(item.Timestamp)).format('Do MMM, h:mm A');

//                var article = '<li>';
//                article += '<p class="width97">' + sActivity;
//                article += '<small>' + sTimestamp + '</small></p>';
//                article += '</li>';
//                $("#contractLogs").append(article);

//            }
//            $("#hdContractID").val('');
//            $('#compact-pagination-Activity').pagination({
//                items: data.length,
//                itemsOnPage: 15,
//                type: 'ul',
//                typeID: 'contractLogs',
//                row: 'li',
//                cssStyle: 'compact-theme'
//            });
//            $("#loadingPage").fadeOut();
//            $('#contractLogsPopup').dialog('open');
//        },
//        error: function () {
//            var article = '<li><span>&nbsp;</span>';
//            article += '<p class="width97">No History</p>';
//            article += '</li>';
//            $("#contractLogs").append(article);
//            $("#loadingPage").fadeOut();
//            $('#contractLogsPopup').dialog('open');
//        }
//    });
//}

function CreateContractActivityList(ContractID, obj) {
    $("#loadingPage").fadeIn();
    var vUrl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/activities/contracts/' + ContractID + '?actiontype=';
    if (obj !== undefined) {
        vUrl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/activities/contracts/' + ContractID + '?actiontype=&objectname=' + obj;
    }

    $.ajax({
        url: vUrl,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            $("#contractLogs").empty();
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                var sObject = item.Object;
                var sActivity = item.Activity;
                var sUserID = item.UserID;
                var sTimestamp = "";
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                { sTimestamp = moment(new Date(item.Timestamp)).format('MM/DD/YYYY h:mm A'); }
                else {
                    sTimestamp = moment(new Date(item.Timestamp)).format(localStorage.AppDateFormat + " h:mm A");
                }


                var article = '<tr><td><span class="logHis_Datetime">' + sTimestamp + '</span></td><td><b>' + sObject + '</b></td><td><span class="logHis_Activity">' + sActivity + '</span></td><td><span class="logHis_Datetime">' + sUserID + '</span></td></tr>';
                $("#contractLogs").append(article);
            }
            // $("#hdContractID").val('');
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
            $("#loadingPage").fadeOut();

        }
    });
}

function AddShareContract() {
    var vLastRow = $("#tblShareContract tr:last").attr('id');
    var totalFileCount = "2";
    if (typeof vLastRow == "undefined") {
        totalFileCount = "2";
    }
    else {
        totalFileCount = parseInt(vLastRow.replace("trSignee", ""));
        totalFileCount += 1;
    }
    var count = $("#tblShareContract tr").length;

    if (count <= 10) {

        var htmlFormatFile = '<tr id="trShareContract' + totalFileCount + '">';
        htmlFormatFile += '<td>';
        htmlFormatFile += '<input id="txtShareContract' + totalFileCount + '" maxlength="50" name="ShareContractName' + totalFileCount + '" placeholder="Name" title="Name" type="text" class="f_inpt width90" />';
        htmlFormatFile += '</td>';
        htmlFormatFile += '<td>';
        htmlFormatFile += '<input id="txtShareContractEmail' + totalFileCount + '" maxlength="100" name="ShareContractEmail' + totalFileCount + '" placeholder="Email ID" title="Email ID" type="text" class="f_inpt width90 validemail" />';
        htmlFormatFile += '</td>';
        htmlFormatFile += '<td style="width:20px">';
        htmlFormatFile += '<a href="javascript:void(0)" onclick="DeleteShareContract(this)"><img src="../Content/Images/icon/delete.png" /></a>';
        htmlFormatFile += '</td>';
        htmlFormatFile += '</tr>';

        $("#tblShareContract").append(htmlFormatFile);
        if (count == 10) {
            $(".addmorelinks").hide();
        }

    }
}

function DeleteShareContract(n) {
    n.parentNode.parentNode.parentNode.removeChild(n.parentNode.parentNode);
    $(".addmorelinks").show();
}

function ShareContract() {
    var vValid = requiredValidator('shareContract');
    if (vValid) {
        $("#loadingPage").fadeIn();
        var contractForm = $("#frmShareContract *").serialize();
        contractForm += "&SendBy=" + localStorage.UserName;
        contractForm += "&Notes=" + $("#txtShareNotesContract").val();
        contractForm += "&ExpIn=" + $("#txtShareExpInContract").val();
        contractForm += "&ContractTitle=" + $("#hdContractTitle").val();
        contractForm += "&AllowComment=" + ($("#chkAllowComment").is(':checked') ? 'Yes' : '');
        contractForm += "&AutoUpdateStatus=" + ($("#chkAutoUpdateStatusShare").is(':checked') ? 'Yes' : 'No');

        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracts/Share?contractid=' + $("#hdContractID").val(),
            type: 'POST',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            data: contractForm,
            cache: false,
            success: function (person) {
                // alert('Contract Shared.');
                swal("", "Contract Shared.");
                $("#shareContract").dialog("close");
                $("#loadingPage").fadeOut();
                ClearShareForm();
            },
            error: function (person) {
                $("#loadingPage").fadeOut();
            }
        });
    }
}

function ClearShareForm() {
    $("#hdDocumentID").val('');
    $("#txtShareNotes").val('');
    $("#txtShareExpIn").val('');
    $("#chkAllowComment").prop('checked', false);
    $("#hdContractID").val('');
    //$("#chkAllowDownload").prop('checked', false);
    //$("#chkAllowUpload").prop('checked', false);
    $('#tblShareContract').empty();
    var vSignee = '<tr>';
    vSignee += '<td>';
    vSignee += '<input id="txtShareContract1" name="ShareContractName1" title="Name" placeholder="Name" type="text" class="f_inpt width90 validelement" />';
    vSignee += '</td>';
    vSignee += '<td>';
    vSignee += '<input id="txtShareContractEmail1" name="ShareContractEmail1" title="Email ID" placeholder="Email ID" type="text" class="f_inpt width90 validelement validemail" />';
    vSignee += '</td>';
    vSignee += '<td style="width:20px">&nbsp;</td>';
    vSignee += '</tr>';
    $('#tblShareContract').html(vSignee);
}

function CreateAlertList() {
    $("#alertsListAll").html('');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/notifications?contractid=' + $("#hdContractID").val(),
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            if (data.length == 0) {
                $("#alertsListAll").append('<li class="f_p-error">No Alert Sent</li>');
                $("#loadingPage").fadeOut();
                $('#allAlerts').dialog('open');
            }
            else {
                var datalength = data.length;
                for (var i = 0; i < datalength; i++) {
                    var item = data[i];
                    var sCategory = item.Category;
                    var sNotificationTitle = item.NotificationTitle;
                    var sNotificationDate = moment(new Date(item.NotificationDate)).format('Do MMM');
                    var vPriority = item.Priority;
                    var vPriorityIcon = '<img src="../Content/Images/priority_none.png" alt="None" title="None" />';
                    if (vPriority == "High") {
                        vPriorityIcon = '<img src="../Content/Images/priority_high.png" alt="High" title="High" />';
                    }
                    else if (vPriority == "Medium") {
                        vPriorityIcon = '<img src="../Content/Images/priority_medium.png" alt="Medium" title="Medium" />';
                    }
                    else if (vPriority == "Low") {
                        vPriorityIcon = '<img src="../Content/Images/priority_low.png" alt="Low" title="Low" />';
                    }

                    var article = "";
                    article += '<article class="d-box1">';
                    article += '<div class="d_left-table">' + sNotificationDate;
                    article += '</div>';
                    article += '<div class="d_middle-table">';
                    article += '<p class="text">' + sNotificationTitle + '&nbsp;' + vPriorityIcon + '</p>';
                    article += '</div>';
                    article += '<div class="d_right-table">';
                    article += '<p class="text">' + item.UserID + '</p>';
                    article += '</div>';
                    article += '</article>';
                    $("#alertsListAll").append(article);
                }
                $("#hdContractID").val('');
                $('#compact-pagination-Alerts').pagination({
                    items: data.length,
                    itemsOnPage: 10,
                    type: 'section',
                    typeID: 'alertsListAll',
                    row: 'article',
                    cssStyle: 'compact-theme'
                });
                $("#loadingPage").fadeOut();
                $('#allAlerts').dialog('open');
            }
        },
        error:
            function (data) {
                $("#alertsListAll").append('<li class="f_p-error">No Alert Sent</li>');
                $("#loadingPage").fadeOut();
                $('#allAlerts').dialog('open');
            }
    });
}

function BindStatus() {
    $("#menu34").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contractstatusesbyCLM',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (contractstatuses) {
            var datalength = contractstatuses.length;
            for (var i = 0; i < datalength; i++) {
                var item = contractstatuses[i];
                if (item.Transition == "Manual") {
                    var ctrl = "";

                    if ((item.ContractStatus.trim() == "Renewed" && $("#hdnIsRenewable").text() == "No") || (item.ContractStatus.trim() == "Extended" && $("#hdnIsExtendable").text() == "No") || (item.ContractStatus.trim() == "Up for Renewal" && $("#hdnIsRenewable").text() == "No"))
                    { }
                    else {
                        //if (item.ContractStatus.trim() != "Renewed") {
                        if ($("#hdContractStatus").val() == item.ContractStatus.trim()) {
                            ctrl = "<li id=" + item.ContractStatus.trim() + "><input id='" + item.RowKey + "' type='radio' checked onclick='javascript:statusclick(this);' name='rdstatus' value='" + encodeURI(item.ContractStatus.trim()) + "' class='css-checkbox' /><label for='" + item.RowKey + "' class='css-label'>" + item.ContractStatus.trim() + "</label></li>";
                        } else {
                            ctrl = "<li id=" + item.ContractStatus.trim() + "><input id='" + item.RowKey + "' type='radio' onclick='javascript:statusclick(this);' name='rdstatus' value='" + encodeURI(item.ContractStatus.trim()) + "' class='css-checkbox' /><label for='" + item.RowKey + "' class='css-label'>" + item.ContractStatus.trim() + "</label></li>";
                        }
                        // }
                    }

                    if (item.ContractStatus.trim() == "Renewed") {
                        //if ($("#hdnIsRenewable").text() != "No") {
                        //    ctrl += "<div class='f_list' style='padding: 0px 0px 0px 10px;display:none;' id='dvRenewCtrl'><input type='text' id='dtRenewalDate' placeholder='Renewal Date' class='f_inpt width90 validdate' /><input type='checkbox' id='chkUpdateEndDate' class='css1-checkbox' /><label for='chkUpdateEndDate' class='css1-label' style='float: none;margin-bottom: 10px;'>Update End Date</label></div>";
                        //}
                    }
                    else if (item.ContractStatus.trim() == "Extended") {
                        if ($("#hdnIsExtendable").text() != "No") {
                            ctrl += "<div class='f_list' style='padding: 0px 0px 0px 10px;display:none;' id='dvExtendCtrl'><input type='text' id='dtExtendedDate' placeholder='Extended Date' class='f_inpt width90 validdate' /></div>";
                        }
                    }
                    else if (item.ContractStatus.trim() == "Cancelled") {
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
            }
            $("#dtRenewalDate").datepicker();
            $("#dtExtendedDate").datepicker();
            $("#loadingPage").fadeOut();
            $('#addEditStatus').dialog('open');
        }
    });
}

function statusclick(e) {
    $('input[name="rdstatus"][value="' + decodeURI(e.value) + '"]').prop('checked', true);
    if (decodeURI(e.value) == "Renewed") {
        //$('#dvRenewCtrl').css("display", "block");
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
            //alert('Enter reason for cancellation.')
            swal("", "Enter reason for cancellation.");
            return false;
        } else {
            ChangeContractStatus();
            //$("#spanstatus").text(selectedValue);
            return true;
        }
    } else if (selectedValue == "Renewed") {
        if ($("#dtRenewalDate")[0].value == "") {
            //alert('Select renewal date.')
            swal("", "Select renewal date.");
            return false;
        } else {
            ChangeContractStatus();
            //updaterenewaldate();

            //$("#spanstatus").text(selectedValue);
            //BindMetaData(null);
            return true;
        }
    } else if (selectedValue == "Extended") {
        if ($("#dtExtendedDate")[0].value == "") {
            // alert('Select extended date.')
            swal("", "Select extended date.");
            return false;
        } else {
            ChangeContractStatus();
            //updateenddate();

            //$("#spanstatus").text(selectedValue);
            //BindMetaData(null);
            return true;
        }
    } else if (selectedValue == "undefined" || selectedValue == "0" || selectedValue == "") {
        //alert("Select Status");
        swal("", "Select Status");
        return false;
    } else {
        ChangeContractStatus();
        //$("#spanstatus").text(selectedValue);
        return true;
    }
}

$("input[name='FinalizedStatus']:radio").change(function () {
    if ($(this).val() == 'Cancelled') {
        $('#dvContCancelNote').css("display", "");
        $("#txtReasonOfCancelContract").addClass('validelement');
    }
    else {
        $('#dvContCancelNote').css("display", "none");
        if ($("#txtReasonOfCancelContract").hasClass("validelement"))
            $("#txtReasonOfCancelContract").removeClass('validelement');
    }
});

$("input[name='FinalizedStatusMul']:radio").change(function () {
    if ($(this).val() == 'Cancelled') {
        $('#dvContCancelNoteMul').css("display", "");
        $("#txtReasonOfCancelContractMul").addClass('validelement');
    }
    else {
        $('#dvContCancelNoteMul').css("display", "none");
        if ($("#txtReasonOfCancelContractMul").hasClass("validelement"))
            $("#txtReasonOfCancelContractMul").removeClass('validelement');
    }
});

function ChangeContractStatus() {
    //$('.ui-button-green-text').parent().attr('disabled', 'disabled');
    if (requiredValidator("dvManageContractStatus", false)) {
        $("#loadingPage").fadeIn();
        var stat = '';
        stat = decodeURI($("input:radio[name=FinalizedStatus]:checked").val());
        var vStatusNote = '';
        if (stat == "Cancelled")
        { vStatusNote = "CancelledReason=" + $("#txtReasonOfCancelContract").val(); }

        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + $("#hdContractID").val() + '/changestatus?status=' + stat,
            type: 'PUT',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
            data: vStatusNote,
            cache: false,
            success: function (result) {
                $("#loadingPage").fadeOut();
                $("#dvManageContractStatus").dialog("close");
                applyFilter();
            },
            error: function (person) {
                $("#loadingPage").fadeOut();
            },
        });
    }
}

//function ChangeContractStatus() {
//    $('.ui-button-green-text').parent().attr('disabled', 'disabled');
//    var stat = decodeURI($("input:radio[name=rdstatus]:checked").val());
//    var vStatusNote = '';
//    if (stat == "Cancelled")
//    { vStatusNote = "CancelledReason=" + $("#txtCancelledReason").val(); }
//    else if (stat == "Renewed") {
//        vStatusNote = "RenewalDate=" + $("#dtRenewalDate").val();
//        if ($("#chkUpdateEndDate").is(':checked'))
//            vStatusNote += "&ChangeEndDate=Yes";
//        else
//            vStatusNote += "&ChangeEndDate=No";
//    }
//    else if (stat == "Extended")
//    { vStatusNote = "ExtendedDate=" + $("#dtExtendedDate").val(); }
//    $.ajax({
//        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + $("#hdContractID").val() + '/changestatus?status=' + stat,
//        type: 'PUT',
//        dataType: 'json',
//        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
//        data: vStatusNote,
//        cache: false,
//        success: function (result) {
//            var vContractStatus = ["Awaiting Signatures", "Signed", "Active", "Up for Renewal", "Renewed", "Extended", "On Hold", "Replaced", "Expired", "Cancelled", "Terminated", "Archived"];
//            var vCurStage = $.inArray(stat, vContractStatus);
//            var vPrvStage = $.inArray($("#hdContractStatus").val(), vContractStatus);
//            if (vCurStage == vPrvStage)
//                alert('Status Updated.');
//            else {
//                if ($.inArray(stat, vContractStatus) !== -1)
//                    alert('This Contract Record is moved to Finalized Contracts. Check "Contracts" tab.');
//                else
//                    alert('This Contract Record is moved to the Pipeline Contracts. Check "Pipeline" tab.');
//            }
//            $("#addEditStatus").dialog("close");
//            applyFilter();
//        }
//    });
//}

function changestatus() {
    $('.ui-button-green-text').parent().attr('disabled', 'disabled');
    var stat = decodeURI($("input:radio[name=rdstatus]:checked").val());
    var vCancelNote = '';
    if (stat == "Cancelled")
    { vCancelNote = "CancelledReason=" + $("#txtCancelledReason").val(); }
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + $("#hdContractID").val() + '/changestatus?status=' + stat,
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

function updaterenewaldate() {
    var dt = $("#dtRenewalDate").val();
    var changeEndDate = 'No';
    if ($("#chkUpdateEndDate").is(':checked')) {
        changeEndDate = 'Yes';
    }
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + $("#hdContractID").val() + '/renew?renewdate=' + dt,
        type: 'PUT',
        dataType: 'json',
        async: false,
        data: {
            RenewedBy: localStorage.UserName,
            ModifiedBy: localStorage.UserName
        },
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, ChangeEndDate: changeEndDate },
        cache: false,
        success: function (result) {
        }
    });
}

function updateenddate() {
    var dt = $("#dtExtendedDate").val();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + $("#hdContractID").val() + '/extend?enddate=' + dt,
        type: 'PUT',
        dataType: 'json',
        async: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
        data: {
            ModifiedBy: localStorage.UserName
        },
        cache: false,
        success: function (result) {
        }
    });
}




function chkpermissionvalue() {

    if ($("#chkpermission").is(':checked')) {

        $("#ddlFullControl").prop('disabled', false).trigger("chosen:updated");
        $("#ddlReadWrite").prop('disabled', false).trigger("chosen:updated");
        $("#ddlReadOnly").prop('disabled', false).trigger("chosen:updated");


        $('#newPopup').empty();

        GetValueAndPopulateManagerNew(contractItem, null);
        //GetValueAndPopulateManager("ddlFullControl", "Project Manager", contractItem.ProjectManager);
        //GetValueAndPopulateManager("ddlFullControl", "Business Area Owner", contractItem.BusinessAreaOwners);
        //GetValueAndPopulateManager("ddlReadOnly", "Contract Area Administrator", contractItem.ContractAreaAdministrators);

        //GetValueAndPopulateUsers("ddlFullControl", contractItem.FullControlPermissions);
        //GetValueAndPopulateUsers("ddlReadWrite", contractItem.ReadWritePermissions);
        //GetValueAndPopulateUsers("ddlReadOnly", contractItem.ReadOnlyPermissions);
        $("#chkPublicContract").attr("disabled", "disabled");
        $("#chkPublicContract").prop('checked', false);
        $("#divBottom").show();

    } else {
        $("#loadingPage").fadeIn();
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/defaultpermission?contractid=' + vContractID,
            type: 'GET',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
            cache: false,
            success: function (item) {
                $('#newPopup').empty();


                GetValueAndPopulateManagerNew(contractItem, item);
                //GetValueAndPopulateManager("ddlFullControl", "Project Manager", contractItem.ProjectManager);
                //GetValueAndPopulateManager("ddlFullControl", "Business Area Owner", contractItem.BusinessAreaOwners);
                //GetValueAndPopulateManager("ddlReadOnly", "Contract Area Administrator", contractItem.ContractAreaAdministrators);

                //GetValueAndPopulateUsers("ddlFullControl", item.FullControl);
                //GetValueAndPopulateUsers("ddlReadWrite", item.Contribute);
                //GetValueAndPopulateUsers("ddlReadOnly", item.Readonly);

                var vLastRow = $("#newPopup li:last").attr('id');
                var totalPermissionCount = "1";
                if (typeof vLastRow == "undefined") {
                    totalPermissionCount = "1";
                }
                else {
                    totalPermissionCount = parseInt(vLastRow.replace("PermissionList", ""));
                }
                for (i = 1; i <= totalPermissionCount; i++) {
                    $("#PermissionOption" + i).prop('disabled', true);
                    $("#" + i).hide();
                }
                $("#divBottom").hide();

                $("#chkPublicContract").removeAttr("disabled");
                if (item.IsPublic == "Yes")
                    $("#chkPublicContract").prop('checked', true);
                else
                    $("#chkPublicContract").prop('checked', false);

                $("#loadingPage").fadeOut();
            },
            error: function (request) {
                $("#ddlFullControl").prop('disabled', true).trigger("chosen:updated");
                $("#ddlReadWrite").prop('disabled', true).trigger("chosen:updated");
                $("#ddlReadOnly").prop('disabled', true).trigger("chosen:updated");
                $("#loadingPage").fadeOut();
            }

        });

    }

}


$("#ddlContractManagers").change(function () {

    var contractmanagers = $("#ddlContractManagers").val();


    if (contractmanagers != null) {
        var newArray = contractmanagers;
        var newArray1 = [];
        var ReadOnly = $("#ddlReadOnly").val();

        if (ReadOnly != null)

            newArray1 = $.merge(newArray1, ReadOnly);


        var ReadWrite = $("#ddlReadWrite").val();
        if (ReadWrite != null)

            newArray1 = $.merge(newArray1, ReadWrite);
        var FullControl = $("#ddlFullControl").val();
        if (FullControl != null)

            newArray1 = $.merge(newArray1, FullControl);

        var arrDiff = [];
        $.grep(newArray, function (el) {

            if ($.inArray(el.trim(), newArray1) == -1 && $.inArray(el.trim(), arrDiff) == -1 && el.trim() != '') arrDiff.push(el.trim());

        });



        if (arrDiff == null) {
            // alert("items are already there");
            swal("", "items are already there");


        }


        else {

            if (FullControl != null) {
                FullControl = $.merge(FullControl, arrDiff);

                $('#ddlFullControl').val(FullControl).trigger('chosen:updated');

            }
            else {

                $('#ddlFullControl').val(arrDiff).trigger("chosen:updated");

            }

        }
    }
});

$("#ddlReviewers").change(function () {

    var Reviewer = $("#ddlReviewers").val();


    if (Reviewer != null) {
        var newArray = Reviewer;
        var newArray1 = [];
        var ReadOnly = $("#ddlReadOnly").val();

        if (ReadOnly != null)

            newArray1 = $.merge(newArray1, ReadOnly);

        var ReadWrite = $("#ddlReadWrite").val();


        if (ReadWrite != null)

            newArray1 = $.merge(newArray1, ReadWrite);

        var FullControl = $("#ddlFullControl").val();


        if (FullControl != null)

            newArray1 = $.merge(newArray1, FullControl);

        var arrDiff = [];
        $.grep(newArray, function (el) {

            if ($.inArray(el.trim(), newArray1) == -1 && $.inArray(el.trim(), arrDiff) == -1 && el.trim() != '') arrDiff.push(el.trim());

        });



        if (arrDiff == null) {
            //   alert("items are already there");
            swal("", "items are already there");

        }

        else {

            if (ReadWrite != null) {
                ReadWrite = $.merge(ReadWrite, arrDiff);

                $('#ddlReadWrite').val(ReadWrite).trigger('chosen:updated');

            }
            else {
                $('#ddlReadWrite').val(arrDiff).trigger("chosen:updated");
            }
        }
    }

});

$("#ddlApproversNew").change(function () {

    var Approver = $("#ddlApproversNew").val();

    if (Approver != null) {
        var newArray = Approver;
        var newArray1 = [];
        var ReadOnly = $("#ddlReadOnly").val();

        if (ReadOnly != null)

            newArray1 = $.merge(newArray1, ReadOnly);
        var ReadWrite = $("#ddlReadWrite").val();

        if (ReadWrite != null)
            newArray1 = $.merge(newArray1, ReadWrite);
        var FullControl = $("#ddlFullControl").val();

        if (FullControl != null)
            newArray1 = $.merge(newArray1, FullControl);


        var arrDiff = [];
        $.grep(newArray, function (el) {

            if ($.inArray(el.trim(), newArray1) == -1 && $.inArray(el.trim(), arrDiff) == -1 && el.trim() != '') arrDiff.push(el.trim());

        });



        if (arrDiff == null) {
            // alert("items are already there");
            swal("", "items are already there");

        }

        else {

            if (ReadWrite != null) {
                ReadWrite = $.merge(ReadWrite, arrDiff);

                $('#ddlReadWrite').val(ReadWrite).trigger('chosen:updated');

            }
            else {
                $('#ddlReadWrite').val(arrDiff).trigger("chosen:updated");
            }
        }
    }


});
$("#ddlSignees").change(function () {

    var Signees = $("#ddlSignees").val();

    if (Signees != null) {
        var newArray = Signees;
        var newArray1 = [];
        var ReadOnly = $("#ddlReadOnly").val();

        if (ReadOnly != null)
            newArray1 = $.merge(newArray1, ReadOnly);
        var ReadWrite = $("#ddlReadWrite").val();

        if (ReadWrite != null)
            newArray1 = $.merge(newArray1, ReadWrite);
        var FullControl = $("#ddlFullControl").val();

        if (FullControl != null)
            newArray1 = $.merge(newArray1, FullControl);
        var arrDiff = [];
        $.grep(newArray, function (el) {

            if ($.inArray(el.trim(), newArray1) == -1 && $.inArray(el.trim(), arrDiff) == -1 && el.trim() != '') arrDiff.push(el.trim());

        });



        if (arrDiff == null) {
            //alert("items are already there");
            swal("", "items are already there");

        }

        else {

            if (ReadWrite != null) {
                ReadWrite = $.merge(ReadWrite, arrDiff);

                $('#ddlReadWrite').val(ReadWrite).trigger('chosen:updated');

            }
            else {
                $('#ddlReadWrite').val(arrDiff).trigger("chosen:updated");
            }
        }
    }
});

function savePeople() {
    $('.ui-button-green-text').parent().attr('disabled', 'disabled');
    var isformvalid = false;
    if (requiredValidator('addNewPeople')) {
        $("#loadingPage").fadeIn();
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

        //var vPermissions = $('input:radio[name=PeoplePermissions]:checked').val();
        var ReadOnlyUsers = "";
        var ReadWriteUser = "";
        var FullControlUsers = "";
        var status = "";
        var newArray = [];
        ///new pop up///
        var vLastRow = $("#newPopup li:last").attr('id');
        var totalPermissionCount = "1";
        if (typeof vLastRow == "undefined") { totalPermissionCount = "1"; }
        else { totalPermissionCount = parseInt(vLastRow.replace("PermissionList", "")); }
        for (i = 1; i <= totalPermissionCount; i++) {

            var drptext = $("#PermissionOption" + i).find('option:selected').text();
            var strRole = $("#UserRole" + i).html();
            var item = $("#PermissionUser" + i).html();
            if (item != null && item != "") {
                if (item != null && item != "") {
                    newArray.push(item);
                }
                if (drptext == "Full Control") {

                    if (FullControlUsers == "") {
                        FullControlUsers = item;
                    }
                    else {
                        FullControlUsers += "; " + item;
                    }
                }
                else if (drptext == "Read/Write") {

                    if (ReadWriteUser == "") {
                        ReadWriteUser = item;
                    }
                    else {
                        ReadWriteUser += "; " + item;
                    }
                }
                else if (drptext == "Read Only") {

                    if (ReadOnlyUsers == "") {
                        ReadOnlyUsers = item;
                    }
                    else {
                        ReadOnlyUsers += "; " + item;
                    }
                }
                else if ((strRole.indexOf("Approver") >= 0 || strRole.indexOf("Reviewer") >= 0 || strRole.indexOf("Contract Owner") >= 0 || strRole.indexOf("Requestor") >= 0) && (strRole != "undefined")) {
                    var strUserPermission = $("#UserPermission" + i).html();
                    if (strUserPermission == "Full Control") {

                        if (FullControlUsers == "") {
                            FullControlUsers = item;
                        }
                        else {
                            FullControlUsers += "; " + item;
                        }
                    }
                    else if (strUserPermission == "Read/Write") {

                        if (ReadWriteUser == "") {
                            ReadWriteUser = item;
                        }
                        else {
                            ReadWriteUser += "; " + item;
                        }
                    }
                    else if (strUserPermission == "Read Only") {

                        if (ReadOnlyUsers == "") {
                            ReadOnlyUsers = item;
                        }
                        else {
                            ReadOnlyUsers += "; " + item;
                        }
                    }
                }
            }
        }




        var array2 = (cm + ";" + rev + ";" + app + ";" + sign).split(';');

        var arrDiff = [];
        $.grep(array2, function (el) {

            if ($.inArray(el.trim(), newArray) == -1 && $.inArray(el.trim(), arrDiff) == -1 && el.trim() != '') arrDiff.push(el.trim());

        });

        if (arrDiff.length == 0) {

            status = $("#chkpermission").is(':checked') ? 'Yes' : 'No';
            var vIsPublic = $("#chkPublicContract").is(':checked') ? 'Yes' : 'No';
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + $("#hdContractID").val() + '/people',
                type: 'PUT',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                data: {
                    //ContractPrivacy: $("input[type='radio'][name='ContractPrivacy']:checked").val(),
                    PermissionAssignment: "Role-Based",
                    //BusinessOwners: ba,
                    ContractManagers: cm,
                    Reviewers: rev,
                    Approvers: app,
                    Signees: sign,
                    //BusinessUsers: bu,
                    ExternalSignees: $("#txtExternalSignee").val(),
                    //SharedWith: $("#txtSharedWith").val(),
                    ReadOnlyPermissions: ReadOnlyUsers,
                    ReadWritePermissions: ReadWriteUser,
                    FullControlPermissions: FullControlUsers,
                    //Permissions: vPermissions,
                    CustomPermission: status,
                    IsPublic: vIsPublic,
                    ModifiedBy: localStorage.UserName
                },
                cache: false,
                success: function (person) {
                    $('.ui-button-green-text').parent().removeAttr('disabled');
                    //Removed//alert('People & Permissions Setting Saved.');
                    $("#addEditPeople").dialog("close");
                    $("#hdContractID").val('');
                    $("#loadingPage").fadeOut();

                },
                error: function (person) {
                    $("#loadingPage").fadeOut();
                }
            });
        }
        else {

            swal("", arrDiff + " need access to this contract.");
            $("#loadingPage").fadeOut();
        }

    }
    else {
        $('.ui-button-green-text').parent().removeAttr('disabled');
        $("#loadingPage").fadeOut();
    }

    //}
    //else {
    //    $('.ui-button-green-text').parent().removeAttr('disabled');
    //    $("#loadingPage").fadeOut();
    //}
    return isformvalid;
}

function OpenRenewalForm() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + $("#hdContractID").val(),
        type: 'GET',
        cache: false,
        contentType: false,
        //async: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
        processData: false,
        success: function (data) {
            var datalength = data.length;
            for (var i = 0; i < datalength; i++) {
                var item = data[i];
                if (item.RenewalDate != null) {
                    var fRenewalDate = "";
                    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                    { fRenewalDate = moment(new Date(item.RenewalDate)).format('MM/DD/YYYY'); }
                    else { fRenewalDate = moment(new Date(item.RenewalDate)).format(localStorage.AppDateFormat); }
                    $("#lblNextRenewalDate").text(fRenewalDate);
                } else {
                    $("#lblNextRenewalDate").text("Not Available");
                }
                if (item.TermEndDate != null) {
                    var fTermEndDate = "";
                    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                    { fTermEndDate = moment(new Date(item.TermEndDate)).format('MM/DD/YYYY'); }
                    else { fTermEndDate = moment(new Date(item.TermEndDate)).format(localStorage.AppDateFormat); }
                    $("#lblTermEndDate").text(fTermEndDate);
                } else {
                    $("#lblTermEndDate").text("Not Available");
                }

                if (item.LastRenewedDate != null) {
                    var fLastRenewedDate = "";
                    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                    { fLastRenewedDate = moment(new Date(item.LastRenewedDate)).format('MM/DD/YYYY'); }
                    else { fLastRenewedDate = moment(new Date(item.LastRenewedDate)).format(localStorage.AppDateFormat); }
                    $("#lblLastRenewed").text(fLastRenewedDate);
                } else {
                    $("#lblLastRenewed").text("Not Available");
                }
                if (item.RenewalRemaining != null && item.RenewalRemaining != 0) {
                    $("#lblRenewalRemaining").text(item.RenewalRemaining);
                } else {
                    $("#lblRenewalRemaining").text("Not Available");
                }
                if (item.EndDate != null) {
                    var fEndDate = "";
                    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                    { fEndDate = moment(new Date(item.EndDate)).format('MM/DD/YYYY'); }
                    else { fEndDate = moment(new Date(item.EndDate)).format(localStorage.AppDateFormat); }
                    $("#lblContractEndDate").text(fEndDate);
                } else {
                    $("#lblContractEndDate").text("Not Available");
                }
            }
        }

    });
    //Getting Renewal Settings
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + $("#hdContractID").val() + '/renewalsettings',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $("#lblRenewSettingsID").text(data.RowKey);
            $("input:radio[name=rdsettings][value='" + data.RenewalType + "']").attr('checked', 'checked');

            RenewSettingRadiobutton(data.RenewalType);
            if (data.StandardRenewalTerm != null) {
                var term = data.StandardRenewalTerm.split(';');

                $("#txtStandardRenewalTerm").val(term[0]);
                $("#ddlStandardRenewalTerm option").filter(function (index) { return $(this).val() === term[1]; }).prop('selected', true);
            }
            $("#txtRenewableFor").val(data.RenewableTerm);

            if (data.Evergreen != null && data.Evergreen == "Yes") {
                $("input:radio[name=rdRenewTime][value='Evergreen']").attr('checked', 'checked');
                $("#txtRenewableFor").attr('readonly', 'readonly');
                $("#txtRenewableFor").val("");
            } else {
                $("input:radio[name=rdRenewTime][value='RenewableFor']").attr('checked', 'checked');
            }


            $("input:radio[name=rdWorkflow][value='" + data.WorkflowApproval + "']").attr('checked', 'checked');
            if (data.WorkflowApproval == "Yes") {
                approvaltaskyes();
            }
            else {
                $("input:radio[name=rdWorkflow][value='No']").attr('checked', 'checked');
                approvaltaskno();
            }

            GetValuesAndAutoPopulate("ddlApproversRenewSettings", data.Approvers);

            $('textarea[name="NotesForApprovers"]').val(data.NotesForApprovers);

            $("#txtApprovalTask").val(data.ApprovalTaskDays);

            if (data.CreateApprovalTask != null && data.CreateApprovalTask == "Yes") {
                $("#txtApprovalTask").removeAttr('readonly');
                $("input:checkbox[name=checkboxApprovalTask][value='Yes']").attr('checked', 'checked');
            }
        },
        error:
            function (data) {
                if ($("#hdnIsRenewable").text() == "No") {
                    $("input:radio[name=rdsettings][value='Non-Renewable']").attr('checked', 'checked');
                } else {
                    $("input:radio[name=rdsettings][value='Manual-Renewable']").attr('checked', 'checked');
                }

                if ($("#hdnRenewApprovalRequired").text() == "Yes") {
                    $("input:radio[name=rdWorkflow][value='Yes']").attr('checked', 'checked');
                    approvaltaskyes();
                }
                else {
                    $("input:radio[name=rdWorkflow][value='No']").attr('checked', 'checked');
                    approvaltaskno();
                }
            }
    });

    //Getting Renewal History
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + $("#hdContractID").val() + '/contractrenewalhistory',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $("#renewalHistory").empty();
            var str = "";
            var datalength = data.length;
            for (var i = 0; i < datalength; i++) {
                var item = data[i];
                str += '<tr>';
                str += '<td>' + item.RenewalType + '</td>';
                if (item.RenewedFor != null) {
                    str += '<td>' + item.RenewedFor.replace(';', ' ') + '</td>';
                } else {
                    str += '<td>' + item.RenewedFor + '</td>';
                }

                str += '<td>' + item.RenewedBy + '</td>';
                str += '<td>' + item.ApprovedBy + '</td>';
                if (item.RenewedDate != null) {
                    var fRenewedDate = "";
                    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                    { fRenewedDate = moment(new Date(item.RenewedDate)).format('MM/DD/YYYY'); }
                    else { fRenewedDate = moment(new Date(item.RenewedDate)).format(localStorage.AppDateFormat); }
                    str += '<td>' + fRenewedDate + '</td>';
                } else {
                    str += '<td></td>';
                }
                str += '<td>' + item.Status + '</td>';
                str += '<td>' + item.Notified + '</td>';

                str += '</tr>';
            }
            $("#renewalHistory").append(str);
            if (str != "") {
                $('#compact-pagination').pagination({
                    items: data.length,
                    itemsOnPage: 5,
                    cssStyle: 'compact-theme'
                });
                $("#lblrenewalerror").css("display", "none");
                $('#compact-pagination').css("display", "");

            } else {
                $("#lblrenewalerror").css("display", "");
                $('#compact-pagination').css("display", "none");
            }
        },
        error:
            function (data) {
                $('#compact-pagination').css("display", "none");
                $("#lblrenewalerror").css("display", "");
            }
    });

    $("#contractRenewal").dialog("option", "title", "Manage Contract Renewal");
    $("#contractRenewal").dialog('open');
}

function ManageContractRenewal() {
    var executecontrol = true;
    if ($("input:radio[name=rdWorkflow]:checked").val() == "Yes" && !requiredValidator("addNewContractRenewal")) {
        executecontrol = false;
    }
    else if ($("input:radio[name=rdsettings]:checked").val() == "Manual-Renewable" && !requiredValidator("divManualRenewal")) {
        executecontrol = false;
        //alert("Enter renewal date.")
        swal("", "Enter renewal date.");
    }
    else {
        if ($("input:radio[name=rdWorkflow]:checked").val() == "Yes" && ($("input:checkbox[name=checkboxApprovalTask]:checked").val() != "Yes" || $("#txtApprovalTask").val() == "")) {
            //alert("Select create approval task and enter days.")
            swal("", "Select create approval task and enter days.");
            executecontrol = false;
        }
        if ($("input:radio[name=rdsettings]:checked").val() == "Auto-Renewable") {
            var data = $("#txtStandardRenewalTerm").val()
            var len = data.length;
            var c;
            for (var i = 0; i < len; i++) {
                c = data.charAt(i).charCodeAt(0);
                if (c < 48 || c > 57) {
                    // alert("Enter number in standard renewal term.")
                    swal("", "Enter number in standard renewal term.");
                    executecontrol = false;
                    break;
                }
            }

            if (len == 0) {
                // alert("Enter number in standard renewal term.")
                swal("", "Enter number in standard renewal term.");
                executecontrol = false;
            }

            if ($("input:radio[name=rdRenewTime]:checked").val() == "RenewableFor") {
                var data1 = $("#txtRenewableFor").val()
                var len1 = data1.length;
                var c1;
                for (var i = 0; i < len1; i++) {
                    c1 = data1.charAt(i).charCodeAt(0);
                    if (c1 < 48 || c1 > 57) {
                        // alert("Enter number in renewable for terms.")
                        swal("", "Enter number in renewable for terms.");
                        executecontrol = false;
                        break;
                    }
                }
            }

            if (len1 == 0) {
                //alert("Enter number in renewable for terms.")
                swal("", "Enter number in renewable for terms.");
                executecontrol = false;
            }
        }
    }

    if (executecontrol) {
        $('.ui-button-green-text').parent().attr('disabled', 'disabled');
        var approvers = $("#ddlApproversRenewSettings").val();
        var ap = '';
        $(approvers).each(function (i, item) {
            if (ap == '') {
                ap = item;
            }
            else {
                ap += "; " + item;
            }
        });

        var IsEverGreen = "No";
        var vRenewableTerm = '';
        if ($("input:radio[name=rdRenewTime]:checked").val() == "Evergreen") {
            IsEverGreen = "Yes";
        }
        else {
            vRenewableTerm = $("#txtRenewableFor").val();
        }
        if ($("#lblRenewSettingsID").text() == "") {
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + $("#hdContractID").val() + '/renewalsettings',
                type: 'POST',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                data: {
                    ContractID: $("#hdnContractID").text(),
                    ContractTitle: $("#lblContractTitle").text(),
                    RenewalType: $("input:radio[name=rdsettings]:checked").val(),
                    StandardRenewalTerm: $("#txtStandardRenewalTerm").val() + ";" + $("#ddlStandardRenewalTerm").find('option:selected').val(),
                    Evergreen: IsEverGreen,
                    RenewableTerm: vRenewableTerm,
                    WorkflowApproval: $("input:radio[name=rdWorkflow]:checked").val(),
                    Approvers: ap,
                    NotesForApprovers: $('textarea[name=NotesForApprovers]').val(),
                    CreateApprovalTask: $("input:checkbox[name=checkboxApprovalTask]:checked").val(),
                    ApprovalTaskDays: $("#txtApprovalTask").val(),
                    CreatedBy: localStorage.UserName,
                    ModifiedBy: localStorage.UserName,
                },
                cache: false,
                success: function (person) {
                    $('.ui-button-green-text').parent().removeAttr('disabled');
                    //alert("Renewal settings saved");
                    //  swal("", "Renewal settings saved");
                    $("#hdChangeStatusClick").val("");
                    $("#contractRenewal").dialog("close");
                }
            });
        } else {
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + $("#hdContractID").val() + '/renewalsettings',
                type: 'PUT',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                data: {
                    RowKey: $("#lblRenewSettingsID").text(),
                    ContractID: $("#hdnContractID").text(),
                    ContractTitle: $("#lblContractTitle").text(),
                    RenewalType: $("input:radio[name=rdsettings]:checked").val(),
                    StandardRenewalTerm: $("#txtStandardRenewalTerm").val() + ";" + $("#ddlStandardRenewalTerm").find('option:selected').val(),
                    Evergreen: IsEverGreen,
                    RenewableTerm: vRenewableTerm,
                    WorkflowApproval: $("input:radio[name=rdWorkflow]:checked").val(),
                    Approvers: ap,
                    NotesForApprovers: $('textarea[name=NotesForApprovers]').val(),
                    CreateApprovalTask: $("input:checkbox[name=checkboxApprovalTask]:checked").val(),
                    ApprovalTaskDays: $("#txtApprovalTask").val(),
                    ModifiedBy: localStorage.UserName,
                },
                cache: false,
                success: function (person) {
                    $('.ui-button-green-text').parent().removeAttr('disabled');
                    // alert("Renewal settings saved");
                    //  swal("", "Renewal settings saved");
                    $("#hdChangeStatusClick").val("");
                    $("#contractRenewal").dialog("close");
                }
            });
        }
        if ($("input:radio[name=rdsettings]:checked").val() != "Non-Renewable") {
            updaterenewaldatesfromsettings();
        }

        var itsstatus = "Renewed";
        if ($("input:radio[name=rdWorkflow]:checked").val() == "Yes") {
            itsstatus = "Waiting for Approval";
        }

        if ($("input:radio[name=rdsettings]:checked").val() == "Manual-Renewable") {
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + $("#hdContractID").val() + '/renewalhistory',
                type: 'POST',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                data: {
                    ContractID: $("#hdnContractID").text(),
                    RenewalType: "Manual-Renewable",
                    RenewedFor: $("#hdnOldEndDate").text() + ";" + $("#lblTermEndDate").text(),
                    RenewedBy: localStorage.UserName,
                    ApprovedBy: '',
                    Status: itsstatus,
                    Notified: '',
                    CreatedBy: localStorage.UserName,
                    ModifiedBy: localStorage.UserName
                },
                cache: false,
                success: function (person) {
                }
            });




        } else if ($("input:radio[name=rdsettings]:checked").val() == "Auto-Renewable") {
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + $("#hdContractID").val() + '/renewalhistory',
                type: 'POST',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                data: {
                    ContractID: $("#hdnContractID").text(),
                    RenewalType: "Auto-Renewable",
                    RenewedFor: $("#txtStandardRenewalTerm").val() + ";" + $("#ddlStandardRenewalTerm").find('option:selected').val(),
                    RenewedBy: localStorage.UserName,
                    ApprovedBy: '',
                    Status: itsstatus,
                    Notified: '',
                    CreatedBy: localStorage.UserName,
                    ModifiedBy: localStorage.UserName,
                },
                cache: false,
                success: function (person) {
                }
            });
        }

    }

}

function ManualRenewal() {
    var IsClose = 0;
    if (requiredValidator("divManualRenewal")) {
        //if ($("#lblContractEndDate").text() != "Not Available") {
        //    //both date should be less than contract end date
        //    if(($("#hdnOldEndDate").text() != "") && ((new Date($("#hdnOldEndDate").text()).getTime() > new Date($("#txtNewEndDate").val()).getTime()) && (new Date($("#hdnOldEndDate").text()).getTime() > new Date($("#txtNextRenewalDate").val()).getTime()))) {
        //        IsClose = IsClose + 1;
        //        $("#lblNextRenewalDate").text($("#txtNextRenewalDate").val());
        //        $("#lblTermEndDate").text($("#txtNewEndDate").val());
        //    } else {
        //        alert("'Updated End (Renewed) Date' and 'Next Renewal Date' should be less than Contract Expiration Date (" + moment(new Date($("#hdnOldEndDate").text())).format('MM/DD/YYYY') + ").");
        //    }
        //}

        //if ($("#lblTermEndDate").text() != "Not Available") {
        //    //both date should be greater than term end date
        //    if(($("#hdnTermEndDate").text() != "")&&((new Date($("#hdnTermEndDate").text()).getTime() < new Date($("#txtNewEndDate").val()).getTime()) && (new Date($("#hdnTermEndDate").text()).getTime() < new Date($("#txtNextRenewalDate").val()).getTime()))) {
        //        IsClose = IsClose + 1;
        //        $("#lblNextRenewalDate").text($("#txtNextRenewalDate").val());
        //        $("#lblTermEndDate").text($("#txtNewEndDate").val());
        //    } else {
        //        if($("#hdnTermEndDate").text() != ""){
        //            alert("'Updated End (Renewed) Date' and 'Next Renewal Date' should be greater than Term End Date (" + $("#lblTermEndDate").text() + ").");
        //        } else {
        //            IsClose = IsClose + 1;
        //        }
        //    }
        //}

        //if (IsClose == 2) {
        //    $("#manualRenewal").dialog("close");
        //}

        if (comparedates("hdnStartDate", "txtNextRenewalDate")) {
            $("#lblNextRenewalDate").text($("#txtNextRenewalDate").val());
            $("#lblTermEndDate").text($("#txtNewEndDate").val());
            $("#manualRenewal").dialog("close");
        }
        else {
            //alert("'Updated End (Renewed) Date' and 'Next Renewal Date' should be greater than");
            swal("", "'Updated End (Renewed) Date' and 'Next Renewal Date' should be greater than");
        }
    }
}

function updaterenewaldatesfromsettings() {
    var remainingRenewal = "";
    var nextRenewDate = "";
    if ($("input:radio[name=rdsettings]:checked").val() == "Auto-Renewable") {
        if ($("input:radio[name=rdRenewTime]:checked").val() == "RenewableFor") {
            remainingRenewal = $("#txtRenewableFor").val();
        }
    }
    //else {
    //    remainingRenewal = $("#txtRenewableFor").val();
    //}
    if ($("input:radio[name=rdWorkflow]:checked").val() == "No") {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + $("#hdContractID").val() + '/renew?standardterm=' + $("#txtStandardRenewalTerm").val() + ";" + $("#ddlStandardRenewalTerm").find('option:selected').val(),
            type: 'PUT',
            dataType: 'json',
            data: {
                IsRenewed: "Yes",
                Renewable: "Yes",
                Status: "Renewed",
                RenewalRemaining: remainingRenewal,
                EndDate: $("#txtNewEndDate").val(),
                TermEndDate: $("#txtNewEndDate").val(),
                RenewalDate: $("#txtNextRenewalDate").val(),
                RenewedBy: localStorage.UserName,
                ModifiedBy: localStorage.UserName
            },
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
            cache: false,
            success: function (result) {
                //$("#hdnIsRenewable").text("Yes");
                //$("#spanstatus").text("Renewed");
                //$("#menu34").empty();
                //BindStatus();
            }
        });

    } else {
        var stanterm = "";
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + $("#hdContractID").val() + '/renew?standardterm=' + stanterm,
            type: 'PUT',
            dataType: 'json',
            data: {

                RenewalRemaining: remainingRenewal,
                EndDate: $("#txtNewEndDate").val(),
                RenewalDate: $("#txtNextRenewalDate").val(),
                RenewedBy: localStorage.UserName,
                ModifiedBy: localStorage.UserName
            },
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
            cache: false,
            success: function (result) {

                //$("#menu34").empty();
                //BindStatus();
            }
        });
    }

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
        //   alert('Select manual renewable.');
        swal("", "Select manual renewable.");
    }
});


$(function () {
    //$("#menu_CreateContract").jui_dropdown({
    //    launcher_id: 'launcher3',
    //    launcher_container_id: 'launcher3_container',
    //    menu_id: 'menu3',
    //    containerClass: 'container3',
    //    launcherClass: 'launcher3',
    //    launcherContainerClass: 'launcher3_container',
    //    menuClass: 'menu3',
    //    launcher_is_UI_button: false,
    //    toggle_launcher: true,
    //    onSelect: function (event, data) {
    //        $("#result").text('index: ' + data.index + ' (id: ' + data.id + ')');
    //    }
    //});


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


    //$('#btnFilter').click(function () {
    //    $('#btnFilter').popModal({
    //        html: $('#divToAppend'),
    //        placement: 'bottomLeft',
    //        showCloseBut: true,
    //        onDocumentClickClose: true,
    //        onDocumentClickClosePrevent: '',
    //        inline: true,
    //        overflowContent: false
    //    });
    //});

});

function savedViewDisplay(obj) {
    $(".hhide").hide();
    colorLink('liContractViews a', false);
    $('#liFiltersQuickView').empty();
    colorLink('spnMyContracts', false);
    colorLink('spnDraftNewContracts', false);
    colorLink('spnUpcomingRenewals', false);
    colorLink('spnUpcomingExpirations', false);
    colorLink('spnRecentlyActiveRenewedContracts', false);
    colorLink('spnUnassignedContracts', false);
    colorLink('spnPastContracts', false);
    colorLink('spnAllContracts', false);
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
            $("#filterContractType option:selected").prop('selected', false);

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

                                    $("#filterStatus option[value='" + values1[j] + "']").attr("selected", true);
                                }
                                break;
                            case "ContractType":
                                var values1 = savedviewentity.ViewQuery.split(';')[i].split(':')[1].split(',');

                                for (var j = 0; j < values1.length; j++) {
                                    var find = " ";
                                    var re = new RegExp(find, 'g');

                                    values1[j] = values1[j].replace(re, '');

                                    $("#filterContractType option[value='" + values1[j] + "']").attr("selected", true);
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


                                    $("#filterRenewDates option[value='" + newval + "']").attr("selected", true);
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


                                    $("#filterDates option[value='" + newval + "']").attr("selected", true);
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

                                $("#filterUserType option[value='" + newval + "']").attr("selected", true);
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

function clearSelection() {
    selectedSortOption = "";
    clearFilterSelection();

    $("#aRecently").css("background-color", "");
    $("#aRenewal").css("background-color", "");
    $("#aExpiration").css("background-color", "");
    $("#aValue").css("background-color", "");
    $("#aNumber").css("background-color", "");
    $("#aCreated").css("background-color", "");

    var qvName = "";
    if ($('#liFiltersQuickView').text() != "") {
        qvName = getQuickViewLinkName($('#liFiltersQuickView').text());
        //if (qvName == 'My Contracts') {
        //    $("#btnAddView").css('display', 'none');
        //} else {
        //    $("#btnAddView").css('display', 'block');
        //}
    }
    if (savedViewNameFromViewTable != "")
        qvName = savedViewNameFromViewTable;

    if (qvName == "Upcoming Renewals") {
        GetUpcomingRenewals();
    } else {
        applyFilter();
    }

    $("#showAll").text("Showing " + qvName + " Records");
    $("#showAll").css('display', 'inline');
    //$("#btnAddView").css('display', 'none');

    $("#dvfilter").hide();
    $("#btnAddView").css('display', 'none')
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
    $("#filterContractType option:selected").prop('selected', false);
}

function GeContractsSavedAsDraft() {
    $("#spResult").empty();
    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
    $("#spResult1").empty();
    $('#listContracts1').html('<img src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/savedasdraft',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName },
        success: function (data) {
            $("#compact-pagination").css('display', '');
            $('#listContracts').empty();
            GetData(data);
            GetData2(data);
            //$(".openmenu").contextMenu({ menu: 'myMenu', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("div").parent("p").parent("li"), pos); });

        },
        error:
            function (data) {
                $('#listContracts').empty();
                $("#listContracts").append("<p class='f_p-error'>No items found.</p>");
                $("#compact-pagination").css('display', 'none');
            }
    });
}

function GetMyContracts() {
    $("#spResult").empty();
    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
    $("#spResult1").empty();
    $('#listContracts1').html('<img src="../Content/Images/icon/loading.gif">');
    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = localStorage.GlobalBusinessAreaLocation;
    }

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/mycontracts?noOfItem=0',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessAreaLocation: baname },
        success: function (data) {
            $("#compact-pagination").css('display', '');
            $('#listContracts').empty();
            GetData(data);
            GetData2(data);
            //$(".openmenu").contextMenu({ menu: 'myMenu', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("i").parent("p").parent("li"), pos); });

        },
        error:
            function (data) {
                $('#listContracts').empty();
                $("#listContracts").append("<p class='f_p-error'>No items found.</p>");
                $("#compact-pagination").css('display', 'none');
            }
    });
}
function BindContractStatusFilter(obj) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contractstatuses',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        async: false,
        success: function (contractstatuses) {
            $("#filterStatus").empty();
            if (obj == "Past Contracts") {
                $("#filterStatus").append('<option value="Any" title="Any">Any</option>')
                $("#filterStatus").append('<option value="On Hold" title="On Hold">On Hold</option>')
                $("#filterStatus").append('<option value="Replaced" title="Replaced">Replaced</option>')
                $("#filterStatus").append('<option value="Expired" title="Expired">Expired</option>')
                $("#filterStatus").append('<option value="Cancelled" title="Cancelled">Cancelled</option>')
                $("#filterStatus").append('<option value="Terminated" title="Terminated">Terminated</option>')
                $("#filterStatus").append('<option value="Archived" title="Archived">Archived</option>')

            } else if (obj == "Pipeline") {
                $("#filterStatus").append('<option value="Any" title="Any">Any</option>')
                $("#filterStatus").append('<option value="New" title="New">New</option>')
                $("#filterStatus").append('<option value="Drafting" title="Any">Drafting</option>')
                $("#filterStatus").append('<option value="Awaiting Review" title="Awaiting Review">Awaiting Review</option>')
                $("#filterStatus").append('<option value="Reviewed" title="Reviewed">Reviewed</option>')
                $("#filterStatus").append('<option value="Awaiting Approval" title="Awaiting Approval">Awaiting Approval</option>')
                $("#filterStatus").append('<option value="Approved" title="Approved">Approved</option>')
                $("#filterStatus").append('<option value="In Negotiation" title="In Negotiation">In Negotiation</option>')
                $("#filterStatus").append('<option value="Negotiation Complete" title="Negotiation Complete">Negotiation Complete</option>')

            } else if (obj == "Signed") {
                $("#filterStatus").append('<option value="Ready for Signature" title="Ready for Signature">Ready for Signature</option>')
                $("#filterStatus").append('<option value="Awaiting Signatures" title="Awaiting Signatures">Awaiting Signatures</option>')
                $("#filterStatus").append('<option value="Signed" title="Signed">Signed</option>')

            } else {
                $("#filterStatus").append('<option value="All" title="All">All</option>')
                $("#filterStatus").append('<option value="NotAvailable" title="NotAvailable">Not Available</option>')

                $(contractstatuses).each(function (i, item) {
                    var arrstat = ["New", "Drafting", "Awaiting Review", "Reviewed", "Awaiting Approval", "Approved", "In Negotiation", "Negotiation Complete"]

                    if (arrstat.indexOf(item.ContractStatus) > -1) { } else {
                        $("#filterStatus").append('<option value="' + item.ContractStatus + '" title="' + item.ContractStatus + '">' + item.ContractStatus + '</option>')
                    }
                });
            }
        }
    });
    $('#tdFinalizedStatus').empty();
    $("#tdMulFinalizedStatus").empty();

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contractstatusesbyCLM',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (contractstatuses) {
            var datalenght = contractstatuses.length;
            for (var i = 0; i < datalenght; i++) {
                var item = contractstatuses[i];

                if ((item.Transition == "Manual" || contractItem.Status == item.ContractStatus) && item.Active == true) {
                    if (item.Transition != "Manual")
                        vAutoChange = 'AutoChange';
                    else
                        vAutoChange = '';
                    if (item.ContractStage != "Pipeline") {
                        var ctrl = "";
                        var ctrlMul = "";
                        if (item.ContractStatus == "Ready for Signature") {
                            ctrl = "<input id='rdFinalizedReadySign' type='radio' name='FinalizedStatus' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Ready for Signature:" + item.Description + "' class='status_yellow'><img src='../Content/Images/status/renew.png'>sign</b><label for='rdFinalizedReadySign' class='css-label'>" + item.ContractStatus + "</label><br />";
                            ctrlMul = "<input id='rdFinalizedReadySign' type='radio' name='FinalizedStatusMul' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Ready for Signature:" + item.Description + "' class='status_yellow'><img src='../Content/Images/status/renew.png'>sign</b><label for='rdFinalizedReadySign' class='css-label'>" + item.ContractStatus + "</label><br />";
                        }
                        if (item.ContractStatus == "Awaiting Signatures") {
                            ctrl = "<input id='rdFinalizedAwaitingSign' type='radio' name='FinalizedStatus' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Awaiting Signatures:" + item.Description + "' class='status_yellow'><img src='../Content/Images/status/renew.png'>sign</b><label for='rdFinalizedAwaitingSign' class='css-label'>" + item.ContractStatus + "</label><br />";
                            ctrlMul = "<input id='rdFinalizedAwaitingSign' type='radio' name='FinalizedStatusMul' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Awaiting Signatures:" + item.Description + "' class='status_yellow'><img src='../Content/Images/status/renew.png'>sign</b><label for='rdFinalizedAwaitingSign' class='css-label'>" + item.ContractStatus + "</label><br />";
                        }
                        if (item.ContractStatus == "Signed") {
                            ctrl = "<input id='rdFinalizedSigned' type='radio' name='FinalizedStatus' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Signed:" + item.Description + "' class='status_blue'><img src='../Content/Images/status/tick.png'>sign</b><label for='rdFinalizedSigned' class='css-label'>" + item.ContractStatus + "</label><br />";
                            ctrlMul = "<input id='rdFinalizedSigned' type='radio' name='FinalizedStatusMul' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Signed:" + item.Description + "' class='status_blue'><img src='../Content/Images/status/tick.png'>sign</b><label for='rdFinalizedSigned' class='css-label'>" + item.ContractStatus + "</label><br />";
                        }

                        if (item.ContractStatus == "Active") {
                            ctrl = "<input id='rdFinalizedActive' type='radio' name='FinalizedStatus' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Active:The Contract Record is signed and is in effect till expiry.' class='status_green'><img src='../Content/Images/status/active.png'>actv</b><label for='rdFinalizedActive' class='css-label'>" + item.ContractStatus + "</label><br />";
                            ctrlMul = "<input id='rdFinalizedSigned' type='radio' name='FinalizedStatusMul' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Signed:" + item.Description + "' class='status_blue'><img src='../Content/Images/status/tick.png'>sign</b><label for='rdFinalizedSigned' class='css-label'>" + item.ContractStatus + "</label><br />";
                        }

                        if (item.ContractStatus == "Up for Renewal") {
                            ctrl = "<input id='rdFinalizedUpForRenewal' type='radio' name='FinalizedStatus' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Up for Renewal:The Contract Record is waiting to be renewed.' class='status_red'><img src='../Content/Images/status/exp.png'>renw</b><label for='rdFinalizedUpForRenewal' class='css-label'>" + item.ContractStatus + "</label><br />";
                            ctrlMul = "<input id='rdFinalizedUpForRenewal' type='radio' name='FinalizedStatusMul' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Up for Renewal:The Contract Record is waiting to be renewed.' class='status_red'><img src='../Content/Images/status/exp.png'>renw</b><label for='rdFinalizedUpForRenewal' class='css-label'>" + item.ContractStatus + "</label><br />";

                        }

                        if (item.ContractStatus == "About to Expire") {
                            ctrl = "<input id='rdFinalizedAboutToExpire' type='radio' name='FinalizedStatus' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='About to Expire:The Contract Record is about to get expired.' class='status_red'><img src='../Content/Images/status/exp.png'>exp</b><label for='rdFinalizedAboutToExpire' class='css-label'>" + item.ContractStatus + "</label><br />";
                            ctrlMul = "<input id='rdFinalizedAboutToExpire' type='radio' name='FinalizedStatusMul' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='About to Expire:The Contract Record is about to get expired.' class='status_red'><img src='../Content/Images/status/exp.png'>exp</b><label for='rdFinalizedAboutToExpire' class='css-label'>" + item.ContractStatus + "</label><br />";
                        }


                        if (item.ContractStatus == "On Hold") {
                            ctrl = "<input id='rdFinalizedOnHold' type='radio' name='FinalizedStatus' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='On Hold:The parties do not mutually agree to the terms & conditions of this Contract Record.' class='status_red'><img src='../Content/Images/status/exp.png'>hold</b><label for='rdFinalizedOnHold' class='css-label'>" + item.ContractStatus + "</label><br />";
                            ctrlMul = "<input id='rdFinalizedOnHold' type='radio' name='FinalizedStatusMul' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='On Hold:The parties do not mutually agree to the terms & conditions of this Contract Record.' class='status_red'><img src='../Content/Images/status/exp.png'>hold</b><label for='rdFinalizedOnHold' class='css-label'>" + item.ContractStatus + "</label><br />";
                        }
                        if (item.ContractStatus == "Replaced") {
                            ctrl = "<input id='rdFinalizedReplaced' type='radio' name='FinalizedStatus' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Replaced:The Contract Record got replaced with its updated version.' class='status_Gray'><img src='../Content/Images/status/replace.png'>rep</b><label for='rdFinalizedReplaced' class='css-label'>" + item.ContractStatus + "</label><br />";
                            ctrlMul = "<input id='rdFinalizedReplaced' type='radio' name='FinalizedStatusMul' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Replaced:The Contract Record got replaced with its updated version.' class='status_Gray'><img src='../Content/Images/status/replace.png'>rep</b><label for='rdFinalizedReplaced' class='css-label'>" + item.ContractStatus + "</label><br />";

                        }


                        if (item.ContractStatus == "Expired") {
                            ctrl = "<input id='rdFinalizedExpired' type='radio' name='FinalizedStatus' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Expired:The period of the contract term has ended.' class='status_Gray'><img src='../Content/Images/status/expried.png'>exp</b><label for='rdFinalizedExpired' class='css-label'>" + item.ContractStatus + "</label><br />";
                            ctrlMul = "<input id='rdFinalizedExpired' type='radio' name='FinalizedStatusMul' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Expired:The period of the contract term has ended.' class='status_Gray'><img src='../Content/Images/status/expried.png'>exp</b><label for='rdFinalizedExpired' class='css-label'>" + item.ContractStatus + "</label><br />";
                        }
                        if (item.ContractStatus == "Cancelled") {
                            ctrl = "<input id='rdFinalizedCancelled' type='radio' name='FinalizedStatus' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Cancelled:The Contract Record got cancelled due to, Impossible to be Fulfilled or Fraud, Mistake, Misrepresentation or Breach of Contract or Prior Agreement.' class='status_Gray'><img src='../Content/Images/status/close.png'>canc</b><label for='rdFinalizedCancelled' class='css-label'>" + item.ContractStatus + "</label><br />";
                            ctrlMul = "<input id='rdFinalizedCancelled' type='radio' name='FinalizedStatusMul' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Cancelled:The Contract Record got cancelled due to, Impossible to be Fulfilled or Fraud, Mistake, Misrepresentation or Breach of Contract or Prior Agreement.' class='status_Gray'><img src='../Content/Images/status/close.png'>canc</b><label for='rdFinalizedCancelled' class='css-label'>" + item.ContractStatus + "</label><br />";

                        }
                        if (item.ContractStatus == "Archived") {
                            ctrl = "<input id='rdFinalizedArchived' type='radio' name='FinalizedStatus' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Archived:The Contract Record got archived due to either of the following status, 'cancelled', 'Terminated' or 'Expired' .' class='status_blue'><img src='../Content/Images/status/archive.png'>ARCH</b><label for='rdFinalizedArchived' class='css-label'>" + item.ContractStatus + "</label><br />";
                            ctrlMul = "<input id='rdFinalizedArchived' type='radio' name='FinalizedStatusMul' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Archived:The Contract Record got archived due to either of the following status, 'cancelled', 'Terminated' or 'Expired' .' class='status_blue'><img src='../Content/Images/status/archive.png'>ARCH</b><label for='rdFinalizedArchived' class='css-label'>" + item.ContractStatus + "</label><br />";

                        }
                        $("#tdFinalizedStatus").append(ctrl);
                        $("#tdMulFinalizedStatus").append(ctrlMul);
                    }

                }
            }


        }

    });
}
function GetNewDraftContracts(objectname) {
    $("#spResult").empty();
    $("#spResult1").empty();
    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = localStorage.GlobalBusinessAreaLocation;
    }

    var customQuery = "";
    if (objectname == "Signed") {
        customQuery = "Status:Ready for Signature,Awaiting Signatures,Signed,";
    } else {
        customQuery = "Status:New,Drafting,Awaiting Review,Reviewed,Awaiting Approval,Approved,In Negotiation,Negotiation Complete,";
    }
    var sortby = '&sortbyfield=Timestamp&orderby=DESC';
    var newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?stage=&searchkeyword=' + $("#txtSearchBox").val() + '&customquery=' + customQuery + sortby;
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
            GetData2(data);
            //$(".openmenu").contextMenu({ menu: 'myMenu', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("p").parent("div"), pos); });

        },
        error:
            function (data) {
                $("#listContracts").empty();
                $("#listContracts").append("<p class='f_p-error'>No items found.</p>");
                $("#compact-pagination").css('display', 'none');
            }
    });
}

function GetPastContracts() {
    $("#spResult").empty();
    $("#spResult1").empty();
    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = localStorage.GlobalBusinessAreaLocation;
    }
    var customQuery = "Status:On Hold,Replaced,Expired,Cancelled,Terminated,Archived,";
    var sortby = '&sortbyfield=Timestamp&orderby=DESC';
    var newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?stage=&searchkeyword=' + $("#txtSearchBox").val() + '&customquery=' + customQuery + sortby;
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
            GetData2(data);
            //$(".openmenu").contextMenu({ menu: 'myMenu', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("p").parent("div"), pos); });

        },
        error:
            function (data) {
                $("#listContracts").empty();
                $("#listContracts").append("<p class='f_p-error'>No items found.</p>");
                $("#compact-pagination").css('display', 'none');
            }
    });
}

function getUnassignedContracts() {
    $("#spResult").empty();
    $("#spResult1").empty();
    var customQuery = "Status:On Hold,Replaced,Expired,Cancelled,Terminated,Archived,";
    var sortby = '&sortbyfield=Timestamp&orderby=DESC';
    var newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?searchkeyword=' + $("#txtSearchBox").val() + '&customquery=' + customQuery + sortby;
    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: newurl,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName },
        success: function (data) {
            $("#compact-pagination").css('display', '');
            $('#listContracts').empty();
            GetData(data);
            GetData2(data);
            //$(".openmenu").contextMenu({ menu: 'myMenu', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("p").parent("div"), pos); });

        },
        error:
            function (data) {
                $("#listContracts").empty();
                $("#listContracts").append("<p class='f_p-error'>No items found.</p>");
                $("#compact-pagination").css('display', 'none');
            }
    });
}

function quickViewDisplay(obj) {
    $(".hhide").hide();
    colorLink('liContractViews a', false);
    colorLink('spnAllContracts', false);
    selectedSortOption = "";
    clearFilterSelection();

    $('#tdSort a').each(function (i, item) {
        item.style.backgroundColor = "";
    });
    $("#liFiltersQuickView").empty();
    $('#liFiltersQuickView').html('<span>Showing search result for : <small>' + obj.name + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');

    $('#liFiltersQuickView').css('display', 'none');
    if (obj.name == "My Contracts") {
        ObjectNameToSend = "My Contracts";
        $(".my-Alerts_Act1").css('display', '');
        BindContractStatusFilter("My Contracts")
        GetMyContracts();
        colorLink('spnMyContracts', true);
        colorLink('spnMyProjectContracts', false);
        colorLink('spnDraft', false);
        colorLink('spnDraftNewContracts', false);
        colorLink('spnSigned', false);
        colorLink('spnActive', false);
        colorLink('spnUpcomingRenewals', false);
        colorLink('spnUpcomingExpirations', false);
        colorLink('spnRecentlyActiveRenewedContracts', false);
        colorLink('spnUnassignedContracts', false);
        colorLink('spnPastContracts', false);
        colorLink('spnAllContracts', false);
        colorLink('spnInRecycleBin', false);
        colorLink('spnSharedContracts', false);

        $("#filteroptiontype").css('display', 'none');
        $("#filteroptiondates").css('display', 'none');
        $("#filteroptionstatus").css('display', '');
        $("#filteroption1").css('display', '');
        $("#filteroptionrenewdates").css('display', 'none');
        $("#btnFilter").css('display', 'inline');
    } else if (obj.name == "My Project Contracts") {
        ObjectNameToSend = "My Project Contracts";//My Project Contracts
        $(".my-Alerts_Act1").css('display', '');
        GetMyProjectContracts();
        colorLink('spnMyContracts', false);
        colorLink('spnMyProjectContracts', true);
        colorLink('spnDraft', false);
        colorLink('spnDraftNewContracts', false);
        colorLink('spnSigned', false);
        colorLink('spnActive', false);
        colorLink('spnUpcomingRenewals', false);
        colorLink('spnUpcomingExpirations', false);
        colorLink('spnRecentlyActiveRenewedContracts', false);
        colorLink('spnUnassignedContracts', false);
        colorLink('spnPastContracts', false);
        colorLink('spnSharedContracts', false);
        colorLink('spnInRecycleBin', false);
        colorLink('spnAllContracts', false);

        $("#btnFilter").css('display', 'none');
    }
    else if (obj.name == "Draft") { //My Saved Draft
        ObjectNameToSend = "Draft";
        $(".my-Alerts_Act1").css('display', '');
        GeContractsSavedAsDraft();
        colorLink('spnMyContracts', false);
        colorLink('spnMyProjectContracts', false);
        colorLink('spnDraft', true);
        colorLink('spnDraftNewContracts', false);
        colorLink('spnSigned', false);
        colorLink('spnActive', false);
        colorLink('spnUpcomingRenewals', false);
        colorLink('spnUpcomingExpirations', false);
        colorLink('spnRecentlyActiveRenewedContracts', false);
        colorLink('spnUnassignedContracts', false);
        colorLink('spnPastContracts', false);
        colorLink('spnSharedContracts', false);
        colorLink('spnInRecycleBin', false);
        colorLink('spnAllContracts', false);

        $("#btnFilter").css('display', 'none');
    }
    else if (obj.name == "Draft & New Contracts") {//this is pipeline
        ObjectNameToSend = "Draft & New Contracts";
        $(".my-Alerts_Act1").css('display', '');
        BindContractStatusFilter("Pipeline")
        GetNewDraftContracts("Pipeline");
        colorLink('spnMyContracts', false);
        colorLink('spnMyProjectContracts', false);
        colorLink('spnDraft', false);
        colorLink('spnDraftNewContracts', true);
        colorLink('spnSigned', false);
        colorLink('spnActive', false);
        colorLink('spnUpcomingRenewals', false);
        colorLink('spnUpcomingExpirations', false);
        colorLink('spnRecentlyActiveRenewedContracts', false);
        colorLink('spnUnassignedContracts', false);
        colorLink('spnPastContracts', false);
        colorLink('spnSharedContracts', false);
        colorLink('spnInRecycleBin', false);
        colorLink('spnAllContracts', false);

        $("#filteroptiontype").css('display', '');
        $("#filteroptiondates").css('display', 'none');
        $("#filteroptionstatus").css('display', '');
        $("#filteroption1").css('display', 'none');
        $("#filteroptionrenewdates").css('display', 'none');
        $("#btnFilter").css('display', 'inline');
    }
    else if (obj.name == "Signed") {
        ObjectNameToSend = "Signed";
        $(".my-Alerts_Act1").css('display', '');
        BindContractStatusFilter("Signed")
        GetNewDraftContracts("Signed");
        colorLink('spnMyContracts', false);
        colorLink('spnMyProjectContracts', false);
        colorLink('spnDraft', false);
        colorLink('spnDraftNewContracts', false);
        colorLink('spnSigned', true);
        colorLink('spnActive', false);
        colorLink('spnUpcomingRenewals', false);
        colorLink('spnUpcomingExpirations', false);
        colorLink('spnRecentlyActiveRenewedContracts', false);
        colorLink('spnUnassignedContracts', false);
        colorLink('spnPastContracts', false);
        colorLink('spnSharedContracts', false);
        colorLink('spnInRecycleBin', false);
        colorLink('spnAllContracts', false);

        $("#filteroptiontype").css('display', '');
        $("#filteroptiondates").css('display', 'none');
        $("#filteroptionstatus").css('display', '');
        $("#filteroption1").css('display', 'none');
        $("#filteroptionrenewdates").css('display', 'none');
        $("#btnFilter").css('display', 'inline');
    } else if (obj.name == "Active") {
        ObjectNameToSend = "Active";
        $(".my-Alerts_Act1").css('display', '');
        GetActiveContracts();
        colorLink('spnMyContracts', false);
        colorLink('spnMyProjectContracts', false);
        colorLink('spnDraft', false);
        colorLink('spnDraftNewContracts', false);
        colorLink('spnSigned', false);
        colorLink('spnActive', true);
        colorLink('spnUpcomingRenewals', false);
        colorLink('spnUpcomingExpirations', false);
        colorLink('spnRecentlyActiveRenewedContracts', false);
        colorLink('spnUnassignedContracts', false);
        colorLink('spnPastContracts', false);
        colorLink('spnSharedContracts', false);
        colorLink('spnInRecycleBin', false);
        colorLink('spnAllContracts', false);
        // mycon = true;
        $("#filteroptiontype").css('display', '');
        $("#filteroptiondates").css('display', 'none');
        $("#filteroptionstatus").css('display', 'none');
        $("#filteroption1").css('display', '');
        $("#filteroptionrenewdates").css('display', 'none');
        $("#btnFilter").css('display', 'inline');
    }
    else if (obj.name == "Upcoming Renewals") {
        ObjectNameToSend = "Upcoming Renewals";
        $(".my-Alerts_Act1").css('display', '');
        GetUpcomingRenewals();
        colorLink('spnMyContracts', false);
        colorLink('spnMyProjectContracts', false);
        colorLink('spnDraft', false);
        colorLink('spnDraftNewContracts', false);
        colorLink('spnSigned', false);
        colorLink('spnActive', false);
        colorLink('spnUpcomingRenewals', true);
        colorLink('spnUpcomingExpirations', false);
        colorLink('spnRecentlyActiveRenewedContracts', false);
        colorLink('spnUnassignedContracts', false);
        colorLink('spnPastContracts', false);
        colorLink('spnSharedContracts', false);
        colorLink('spnInRecycleBin', false);
        colorLink('spnAllContracts', false);

        $("#filteroptiontype").css('display', '');
        $("#filteroptiondates").css('display', 'none');
        $("#filteroptionstatus").css('display', 'none');
        $("#filteroption1").css('display', 'none');
        $("#filteroptionrenewdates").css('display', '');
        $("#btnFilter").css('display', 'inline');
    }
    else if (obj.name == "Upcoming Expirations") {
        ObjectNameToSend = "Upcoming Expirations";
        $(".my-Alerts_Act1").css('display', '');
        GetUpcomingExpirations();
        colorLink('spnMyContracts', false);
        colorLink('spnMyProjectContracts', false);
        colorLink('spnDraft', false);
        colorLink('spnDraftNewContracts', false);
        colorLink('spnSigned', false);
        colorLink('spnActive', false);
        colorLink('spnUpcomingRenewals', false);
        colorLink('spnUpcomingExpirations', true);
        colorLink('spnRecentlyActiveRenewedContracts', false);
        colorLink('spnUnassignedContracts', false);
        colorLink('spnPastContracts', false);
        colorLink('spnSharedContracts', false);
        colorLink('spnInRecycleBin', false);
        colorLink('spnAllContracts', false);

        $("#filteroptiontype").css('display', '');
        $("#filteroptiondates").css('display', '');
        $("#filteroptionstatus").css('display', 'none');
        $("#filteroption1").css('display', 'none');
        $("#filteroptionrenewdates").css('display', 'none');
        $("#btnFilter").css('display', 'inline');
    }
    else if (obj.name == "Recently Active & Renewed Contracts") {
        ObjectNameToSend = "Recently Active & Renewed Contracts";
        $(".my-Alerts_Act1").css('display', '');
        GetRecentlyActiveAndRenewedContracts();
        colorLink('spnMyContracts', false);
        colorLink('spnMyProjectContracts', false);
        colorLink('spnDraft', false);
        colorLink('spnDraftNewContracts', false);
        colorLink('spnSigned', false);
        colorLink('spnActive', false);
        colorLink('spnUpcomingRenewals', false);
        colorLink('spnUpcomingExpirations', false);
        colorLink('spnRecentlyActiveRenewedContracts', true);
        colorLink('spnUnassignedContracts', false);
        colorLink('spnPastContracts', false);
        colorLink('spnSharedContracts', false);
        colorLink('spnInRecycleBin', false);
        colorLink('spnAllContracts', false);
        // mycon = true;
        $("#filteroptiontype").css('display', '');
        $("#filteroptiondates").css('display', 'none');
        $("#filteroptionstatus").css('display', 'none');
        $("#filteroption1").css('display', '');
        $("#filteroptionrenewdates").css('display', 'none');
        $("#btnFilter").css('display', 'inline');
    }
    else if (obj.name == "Unassigned Contracts") {
        ObjectNameToSend = "Unassigned Contracts";
        $(".my-Alerts_Act1").css('display', '');
        GetUnassignedContracts();
        colorLink('spnMyContracts', false);
        colorLink('spnMyProjectContracts', false);
        colorLink('spnDraft', false);
        colorLink('spnDraftNewContracts', false);
        colorLink('spnSigned', false);
        colorLink('spnActive', false);
        colorLink('spnUpcomingRenewals', false);
        colorLink('spnUpcomingExpirations', false);
        colorLink('spnRecentlyActiveRenewedContracts', false);
        colorLink('spnUnassignedContracts', true);
        colorLink('spnPastContracts', false);
        colorLink('spnSharedContracts', false);
        colorLink('spnInRecycleBin', false);
        colorLink('spnAllContracts', false);
        $("#btnFilter").css('display', 'none');
    }
    else if (obj.name == "Past Contracts") {
        ObjectNameToSend = "Past Contracts";
        $(".my-Alerts_Act1").css('display', '');
        BindContractStatusFilter("Past Contracts")
        GetPastContracts();
        colorLink('spnMyContracts', false);
        colorLink('spnMyProjectContracts', false);
        colorLink('spnDraft', false);
        colorLink('spnDraftNewContracts', false);
        colorLink('spnSigned', false);
        colorLink('spnActive', false);
        colorLink('spnUpcomingRenewals', false);
        colorLink('spnUpcomingExpirations', false);
        colorLink('spnRecentlyActiveRenewedContracts', false);
        colorLink('spnUnassignedContracts', false);
        colorLink('spnPastContracts', true);
        colorLink('spnSharedContracts', false);
        colorLink('spnInRecycleBin', false);
        colorLink('spnAllContracts', false);

        $("#filteroptiontype").css('display', '');
        $("#filteroptiondates").css('display', 'none');
        $("#filteroptionstatus").css('display', '');
        $("#filteroption1").css('display', 'none');
        $("#filteroptionrenewdates").css('display', 'none');
        $("#btnFilter").css('display', 'inline');
    }
    else if (obj.name == "Shared With Me") {
        ObjectNameToSend = "Shared With Me";
        $(".my-Alerts_Act1").css('display', '');
        GetSharedContracts();
        colorLink('spnMyContracts', false);
        colorLink('spnMyProjectContracts', false);
        colorLink('spnDraft', false);
        colorLink('spnDraftNewContracts', false);
        colorLink('spnSigned', false);
        colorLink('spnActive', false);
        colorLink('spnUpcomingRenewals', false);
        colorLink('spnUpcomingExpirations', false);
        colorLink('spnRecentlyActiveRenewedContracts', false);
        colorLink('spnUnassignedContracts', false);
        colorLink('spnPastContracts', false);
        colorLink('spnSharedContracts', true);
        colorLink('spnInRecycleBin', false);
        colorLink('spnAllContracts', false);

        $("#filteroptiontype").css('display', '');
        $("#filteroptiondates").css('display', 'none');
        $("#filteroptionstatus").css('display', '');
        $("#filteroption1").css('display', 'none');
        $("#filteroptionrenewdates").css('display', 'none');

        $("#btnFilter").css('display', 'none');
    } else if (obj.name == "In Recycle Bin") {
        ObjectNameToSend = "In Recycle Bin";
        $(".my-Alerts_Act1").css('display', '');
        GetContractsInRecycleBin();
        colorLink('spnMyContracts', false);
        colorLink('spnMyProjectContracts', false);
        colorLink('spnDraft', false);
        colorLink('spnDraftNewContracts', false);
        colorLink('spnSigned', false);
        colorLink('spnActive', false);
        colorLink('spnUpcomingRenewals', false);
        colorLink('spnUpcomingExpirations', false);
        colorLink('spnRecentlyActiveRenewedContracts', false);
        colorLink('spnUnassignedContracts', false);
        colorLink('spnPastContracts', false);
        colorLink('spnSharedContracts', false);
        colorLink('spnInRecycleBin', true);
        colorLink('spnAllContracts', false);
        $("#btnFilter").css('display', 'none');
    }

    // $("#btnFilter").css('display', 'none');
    $("#btnAddView").css('display', 'none');
    // $("#dvSrhBox").css('display', 'none');

    $("#showAll").css('display', 'inline');
    $("#showAll").html('Showing ' + obj.name + ' Records<img title="Remove" onclick="javascript:GetAllContracts(this);" style="margin-left: 5px; margin-right: 10px; cursor:pointer;" src="../Content/Images/icon/close.png" />');
}
function GetUpcomingRenewals() {
    $("#spResult").empty();
    $("#spResult1").empty();
    var baname = ";";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = localStorage.GlobalBusinessAreaLocation;
    }

    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/upcomingrenewals',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessArea: baname },
        success: function (data) {
            $("#compact-pagination").css('display', '');
            $('#listContracts').empty();
            GetData(data);
            GetData2(data);
            //$(".openmenu").contextMenu({ menu: 'myMenu', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("p").parent("div"), pos); });

        },
        error:
            function (data) {
                $('#listContracts').empty();
                $("#listContracts").append("<p class='f_p-error'>No items found.</p>");
                $("#compact-pagination").css('display', 'none');
            }
    });
}

function GetUpcomingExpirations() {
    $("#spResult").empty();
    $("#spResult1").empty();
    var baname = ";";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = localStorage.GlobalBusinessAreaLocation;
    }
    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/upcomingexpirations',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessArea: baname },
        success: function (data) {
            $("#compact-pagination").css('display', '');
            $('#listContracts').empty();
            GetData(data);
            GetData2(data);
            //$(".openmenu").contextMenu({ menu: 'myMenu', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("p").parent("div"), pos); });

        },
        error:
            function (data) {
                $('#listContracts').empty();
                $("#listContracts").append("<p class='f_p-error'>No items found.</p>");
                $("#compact-pagination").css('display', 'none');
            }
    });
}

function GetRecentlyActiveAndRenewedContracts() {
    $("#spResult").empty();
    $("#spResult1").empty();
    var baname = ";";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = localStorage.GlobalBusinessAreaLocation;
    }
    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/recentlyactiveandrenewed',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessArea: baname },
        success: function (data) {
            $("#compact-pagination").css('display', '');
            $('#listContracts').empty();
            GetData(data);
            GetData2(data);
            //$(".openmenu").contextMenu({ menu: 'myMenu', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("p").parent("div"), pos); });

        },
        error:
            function (data) {
                $('#listContracts').empty();
                $("#listContracts").append("<p class='f_p-error'>No items found.</p>");
                $("#compact-pagination").css('display', 'none');
            }
    });
}

function GetActiveContracts() {
    $("#spResult").empty();
    $("#spResult1").empty();
    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = localStorage.GlobalBusinessAreaLocation;
    }
    var customQuery = "Status:Active,Up for Renewal,Renewed,Extended,About to Expire,";
    var sortby = '&sortbyfield=Timestamp&orderby=DESC';
    var newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?stage=&searchkeyword=' + $("#txtSearchBox").val() + '&customquery=' + customQuery + sortby;
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
            GetData2(data);
            //$(".openmenu").contextMenu({ menu: 'myMenu', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("p").parent("div"), pos); });

        },
        error:
            function (data) {
                $("#listContracts").empty();
                $("#listContracts").append("<p class='f_p-error'>No items found.</p>");
                $("#compact-pagination").css('display', 'none');
            }
    });

    //var baname = ";";
    //if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
    //    baname = localStorage.GlobalBusinessAreaLocation;
    //}
    //$('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
    //$.ajax({
    //    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/activecontracts',
    //    type: 'GET',
    //    dataType: 'json',
    //    'Content-Type': 'application/json',
    //    cache: false,
    //    headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessArea: baname },
    //    success: function (data) {
    //        $("#compact-pagination").css('display', '');
    //        $('#listContracts').empty();
    //        GetData(data);
    //        $(".openmenu").contextMenu({ menu: 'myMenu', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("p").parent("div"), pos); });

    //    },
    //    error:
    //        function (data) {
    //            $('#listContracts').empty();
    //            $("#listContracts").append("<p class='f_p-error'>No items available in this view.</p>");
    //            $("#compact-pagination").css('display', 'none');
    //        }
    //});
}

function GetRecentlyActiveContracts() {
    $("#spResult").empty();
    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
    $("#spResult1").empty();
    $('#listContracts1').html('<img src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/recentlyActive',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName },
        success: function (data) {
            $("#compact-pagination").css('display', '');
            $('#listContracts').empty();
            GetData(data);
            GetData2(data);
            //$(".openmenu").contextMenu({ menu: 'myMenu', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("i").parent("p").parent("li"), pos); });

        },
        error:
            function (data) {
                $('#listContracts').empty();
                $("#listContracts").append("<p class='f_p-error'>No items found.</p>");
                $("#compact-pagination").css('display', 'none');
            }
    });
}

function GetRecentlyRenewedContracts() {
    $("#spResult").empty();
    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
    $("#spResult1").empty();
    $('#listContracts1').html('<img src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/recentlyRenewed',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName },
        success: function (data) {
            $("#compact-pagination").css('display', '');
            $('#listContracts').empty();
            GetData(data);
            GetData2(data);
            //$(".openmenu").contextMenu({ menu: 'myMenu', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("i").parent("p").parent("li"), pos); });

        },
        error:
            function (data) {
                $('#listContracts').empty();
                $("#listContracts").append("<p class='f_p-error'>No items found.</p>");
                $("#compact-pagination").css('display', 'none');
            }
    });
}

function GetUnassignedContracts() {
    $("#spResult").empty();
    $("#spResult1").empty();
    var baname = ";";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = localStorage.GlobalBusinessAreaLocation;
    }

    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/unassignedContracts?stage=',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessArea: baname },
        success: function (data) {
            $("#compact-pagination").css('display', '');
            $('#listContracts').empty();
            GetData(data);
            GetData2(data);
            //$(".openmenu").contextMenu({ menu: 'myMenu', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("i").parent("p").parent("li"), pos); });

        },
        error:
            function (data) {
                $('#listContracts').empty();
                $("#listContracts").append("<p class='f_p-error'>No items found.</p>");
                $("#compact-pagination").css('display', 'none');
            }
    });
}

function GetSharedContracts() {
    $("#spResult").empty();
    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
    $("#spResult1").empty();
    $('#listContracts1').html('<img src="../Content/Images/icon/loading.gif">');

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/sharedwithme',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName },
        success: function (data) {
            $("#compact-pagination").css('display', '');
            $('#listContracts').empty();
            GetData(data);
            GetData2(data);
            //$(".openmenu").contextMenu({ menu: 'myMenu', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("i").parent("p").parent("li"), pos); });

        },
        error:
            function (data) {
                $('#listContracts').empty();
                $("#listContracts").append("<p class='f_p-error'>No items found.</p>");
                $("#compact-pagination").css('display', 'none');
            }
    });
}

function GetContractsInRecycleBin() {
    $("#spResult").empty();
    $("#spResult1").empty();
    var baname = ";";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = localStorage.GlobalBusinessAreaLocation;
    }
    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
    $('#listContracts1').html('<img src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/recyclebin',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessArea: baname },
        success: function (data) {
            $("#compact-pagination").css('display', '');
            $('#listContracts').empty();
            $("#compact-pagination1").css('display', '');
            $('#listContracts1').empty();
            var resultFound = GetData(data);
            GetData2(data);
            if (resultFound) {
                $("#divChkSelectAll").css('display', 'none');
                $("#divChkSelectAll1").css('display', 'none');
            }
            //$(".openmenu").contextMenu({ menu: 'myMenu', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("p").parent("div"), pos); });

        },
        error:
            function (data) {
                $('#listContracts').empty();
                $("#listContracts").append("<p class='f_p-error'>No items found.</p>");
                $("#compact-pagination").css('display', 'none');
                $('#listContracts1').empty();
                $("#listContracts1").append("<p class='f_p-error'>No items found.</p>");
                $("#compact-pagination1").css('display', 'none');
            }
    });
}

function GetMyProjectContracts() {
    $("#spResult").empty();
    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
    $("#spResult1").empty();
    $('#listContracts1').html('<img src="../Content/Images/icon/loading.gif">');

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/myprojectcontracts',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName },
        success: function (data) {
            $("#compact-pagination").css('display', '');
            $('#listContracts').empty();
            $("#compact-pagination1").css('display', '');
            $('#listContracts1').empty();
            GetData(data);
            GetData2(data);
            //$(".openmenu").contextMenu({ menu: 'myMenu', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("i").parent("p").parent("li"), pos); });

        },
        error:
            function (data) {
                $('#listContracts').empty();
                $("#listContracts").append("<p class='f_p-error'>No items found.</p>");
                $("#compact-pagination").css('display', 'none');
                $('#listContracts1').empty();
                $("#listContracts1").append("<p class='f_p-error'>No items found.</p>");
                $("#compact-pagination1").css('display', 'none');
            }
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
function getQuickViewLinkName(qvName) {
    var splitName = qvName.split(':');
    var rName = splitName[splitName.length - 1];
    rName = $.trim(rName);

    return rName;
}
function applyFilter() {
    $("#spResult").empty();
    $("#spResult1").empty();
    var qvName = "";
    if ($('#liFiltersQuickView').text() != "") {
        qvName = getQuickViewLinkName($('#liFiltersQuickView').text());
        $("#btnAddView").css('display', 'block');
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
        default:
            sortby = '&sortbyfield=Timestamp&orderby=DESC';
            break;
    }

    if (qvName == 'My Contracts') {
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

        if (customQuery1 == "") {
            customQuery1 = "Status:About to Expire,Active,Archived,Ready for Signature,Awaiting Signatures,Cancelled,Expired,Extended,On Hold,Renewed,Replaced,Signed,Terminated,Up for Renewal,";
        }
        newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?searchkeyword=' + $("#txtSearchBox").val() + '&customquery=' + customQuery1 + customQuery2 + sortby + "&otherquery=" + customQuery2 + "&viewName=" + qvName;

        if (isAnySelected1 || isAnySelected2) {
            $("#btnAddView").css('display', 'block');
        }
    } else if (qvName == 'My Project Contracts') {
        newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?searchkeyword=' + $("#txtSearchBox").val() + '&customquery=' + sortby + "&otherquery=&viewName=" + qvName;
    } else if (qvName == 'Draft') {
        newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?searchkeyword=' + $("#txtSearchBox").val() + '&customquery=' + sortby + "&otherquery=&viewName=" + qvName;
    }
    else if (qvName == 'Draft & New Contracts') {
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

        var customQuery2 = ";ContractType:";
        var isContainingAll2 = false;
        var isAnySelected2 = false;
        $('#filterContractType :selected').each(function (i, selected) {
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
            customQuery1 = "Status:New,Drafting,Awaiting Review,Reviewed,Awaiting Approval,Approved,In Negotiation,Negotiation Complete,Ready for Signature,Awaiting Signatures,Signed,";
        }
        newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?searchkeyword=' + $("#txtSearchBox").val() + '&customquery=' + customQuery1 + customQuery2 + sortby + "&otherquery=&viewName=DraftNew";
        if (isAnySelected1 || isAnySelected2) {
            $("#btnAddView").css('display', 'block');
        }
    }
    else if (qvName == 'Signed') {
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

        var customQuery2 = ";ContractType:";
        var isContainingAll2 = false;
        var isAnySelected2 = false;
        $('#filterContractType :selected').each(function (i, selected) {
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
            customQuery1 = "Status:Ready for Signature,Awaiting Signatures,Signed,";
        }
        var newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?stage=&searchkeyword=' + $("#txtSearchBox").val() + '&customquery=' + customQuery1 + customQuery2 + sortby;
        if (isAnySelected1 || isAnySelected2) {
            $("#btnAddView").css('display', 'block');
        }
    }
    else if (qvName == 'Upcoming Renewals') {
        var customQuery1 = "RenewalDate:";
        var isContainingAll1 = false;
        var isAnySelected1 = false;
        $('#filterRenewDates :selected').each(function (i, selected) {
            isAnySelected1 = true;
            if ($(selected).text() == "Any")
                isContainingAll1 = true;
            $('#liFiltersRenewal').append('<span><small>' + $(selected).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveRenewalExp(this);" style="float:right" /></small></span>');
            customQuery1 += ',' + $(selected).val();
        });
        if (!isAnySelected1) {
            customQuery1 = "";
        }
        if (isContainingAll1) {
            $("#liFiltersRenewal").empty();
            customQuery1 = "";
        }

        var customQuery2 = ";ContractType:";
        var isContainingAll2 = false;
        var isAnySelected2 = false;
        $('#filterContractType :selected').each(function (i, selected) {
            isAnySelected2 = true;
            if ($(selected).text() == "All")
                isContainingAll2 = true;
            $('#liFiltersType').append('<span><small>' + $(selected).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveRenewalExp(this);" style="float:right" /></small></span>');
            customQuery2 += ',' + $(selected).text();
        });
        if (!isAnySelected2) {
            customQuery2 = "";
        }
        if (isContainingAll2) {
            $("#liFiltersType").empty();
            customQuery2 = "";
        }

        //var customQuery3 = "Status:About to Expire,Active,Archived,Awaiting Signatures,Cancelled,Expired,Extended,On Hold,Renewed,Replaced,Signed,Terminated,Up for Renewal,";
        var customQuery3 = ";Status:Up for Renewal,";
        newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?searchkeyword=' + $("#txtSearchBox").val() + '&customquery=' + customQuery1 + customQuery2 + customQuery3 + sortby + "&otherquery=" + customQuery1 + "&viewName=" + qvName;
        if (isAnySelected1 || isAnySelected2) {
            $("#btnAddView").css('display', 'block');
        }
    } else if (qvName == 'Upcoming Expirations') {

        var customQuery1 = "ExpiryDate:";
        var isContainingAll1 = false;
        var isAnySelected1 = false;
        $('#filterDates :selected').each(function (i, selected) {
            isAnySelected1 = true;
            if ($(selected).text() == "Any")
                isContainingAll1 = true;
            $('#liFiltersExpiration').append('<span><small>' + $(selected).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveRenewalExp(this);" style="float:right" /></small></span>');
            customQuery1 += ',' + $(selected).text();
        });
        if (!isAnySelected1) {
            customQuery1 = "";
        }
        if (isContainingAll1) {
            $("#liFiltersExpiration").empty();
            customQuery1 = "";
        }

        var customQuery2 = ";ContractType:";
        var isContainingAll2 = false;
        var isAnySelected2 = false;
        $('#filterContractType :selected').each(function (i, selected) {
            isAnySelected2 = true;
            if ($(selected).text() == "All")
                isContainingAll2 = true;
            $('#liFiltersType').append('<span><small>' + $(selected).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveRenewalExp(this);" style="float:right" /></small></span>');
            customQuery2 += ',' + $(selected).text();
        });
        if (!isAnySelected2) {
            customQuery2 = "";
        }
        if (isContainingAll2) {
            $("#liFiltersType").empty();
            customQuery2 = "";
        }

        var customQuery3 = ";Status:About to Expire,Active,Archived,Ready for Signature,Awaiting Signatures,Cancelled,Expired,Extended,On Hold,Renewed,Replaced,Signed,Terminated,Up for Renewal,";
        //var customQuery3 = ";Status:Expired,";
        newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?searchkeyword=' + $("#txtSearchBox").val() + '&customquery=' + customQuery1 + customQuery2 + customQuery3 + sortby + "&otherquery=" + customQuery1 + "&viewName=" + qvName;
        if (isAnySelected1 || isAnySelected2) {
            $("#btnAddView").css('display', 'block');
        }
    } else if (qvName == 'Recently Active & Renewed Contracts') {
        var customQuery1 = "ContractType:";
        var isContainingAll1 = false;
        var isAnySelected1 = false;
        $('#filterContractType :selected').each(function (i, selected) {
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
        var customQuery3 = ";Status:About to Expire,Active,Archived,Ready for Signature,Awaiting Signatures,Cancelled,Expired,Extended,On Hold,Renewed,Replaced,Signed,Terminated,Up for Renewal,";
        newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?searchkeyword=' + $("#txtSearchBox").val() + '&customquery=' + customQuery1 + customQuery2 + customQuery3 + sortby + "&otherquery=" + customQuery2 + "&viewName=" + qvName;
        if (isAnySelected1 || isAnySelected2) {
            $("#btnAddView").css('display', 'block');
        }
    } else if (qvName == 'Unassigned Contracts') {
        newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?searchkeyword=' + $("#txtSearchBox").val() + '&customquery=' + sortby + "&otherquery=&viewName=" + qvName;
    } else if (qvName == 'Shared With Me') {
        newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?searchkeyword=' + $("#txtSearchBox").val() + '&customquery=' + sortby + "&otherquery=&viewName=" + qvName;
    } else if (qvName == 'In Recycle Bin') {
        newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?searchkeyword=' + $("#txtSearchBox").val() + '&customquery=' + sortby + "&otherquery=&viewName=" + qvName;
    }
    else if ((qvName == 'Past Contracts') || (qvName == 'Active') || (qvName == 'All Contracts') || (qvName == "")) {
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

        var customQuery2 = ";ContractType:";
        var isContainingAll2 = false;
        var isAnySelected2 = false;
        $('#filterContractType :selected').each(function (i, selected) {
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
            if (qvName == 'Past Contracts') {
                customQuery1 = "Status:On Hold,Replaced,Expired,Cancelled,Terminated,Archived,";
            } else if (qvName == 'Active') {
                customQuery1 = "Status:Active,Up for Renewal,Renewed,Extended,About to Expire,";
            } else if (qvName == 'All Contracts') {
                customQuery1 = "Status:About to Expire,Active,Archived,Ready for Signature,Awaiting Signatures,Cancelled,Expired,Extended,On Hold,Renewed,Replaced,Signed,Terminated,Up for Renewal,";
            }
            else {
                customQuery1 = "Status:New,Drafting,Awaiting Review,Reviewed,Awaiting Approval,Approved,In Negotiation,Negotiation Complete,Ready for Signature,Awaiting Signatures,Signed,";
            }
        }

        newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?searchkeyword=' + $("#txtSearchBox").val() + '&customquery=' + customQuery1 + customQuery2 + sortby + "&otherquery=&viewName=" + qvName;
        if (isAnySelected1 || isAnySelected2) {
            $("#btnAddView").css('display', 'block');
        }
    }

    if (isContainingAll1 && isContainingAll2) {
        $("#showAll").css('display', 'inline');
    }
    if ((!isAnySelected1 || isContainingAll1) && (!isAnySelected2 || isContainingAll2)) {
        $("#btnAddView").css('display', 'none');
    }

    $("#listContracts").empty();
    $("#listContracts1").empty();

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
    $('#listContracts1').html('<img src="../Content/Images/icon/loading.gif">');
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
            $("#compact-pagination1").css('display', '');
            $('#listContracts1').empty();
            GetData(data);
            GetData2(data);
        },
        error:
            function (data) {
                $("#listContracts").empty();
                $("#listContracts").append("<p class='f_p-error'>No items found.</p>");
                $("#compact-pagination").css('display', 'none');
                $("#divChkSelectAll").css('display', 'none');
                $("#listContracts1").empty();
                $("#listContracts1").append("<p class='f_p-error'>No items found.</p>");
                $("#compact-pagination1").css('display', 'none');
                $("#divChkSelectAll1").css('display', 'none');
            }
    });

    $("#dvfilter").hide();

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

        $("#filterStatus option[value='" + firstChild.nodeValue + "']").attr("selected", false);
        $("#filterContractType option[value='" + firstChild.nodeValue + "']").attr("selected", false);
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

        $("#filterUserType option[value='" + newval + "']").attr("selected", false);


        child.parentNode.removeChild(child);
    }
    var hasItem1 = false;
    $('#filterStatus :selected').each(function (i, selected) {
        hasItem1 = true;
    });

    var hasItem2 = false;
    $('#filterContractType :selected').each(function (i, selected) {
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
        $("#btnAddView").css('display', 'none');
    } else if (qvName == "All Contracts" && !hasItem1 && !hasItem2) {
        applyFilter();
        displayshowall("All Contracts");
        $("#btnAddView").css('display', 'none');
    } else if (qvName == "Draft & New Contracts" && !hasItem1 && !hasItem2) {
        GetNewDraftContracts("Pipeline");
        $("#btnAddView").css('display', 'none');
    }
    else if (qvName == "Signed" && !hasItem1 && !hasItem2) {
        GetNewDraftContracts("Signed");
        $("#btnAddView").css('display', 'none');
    }
    else if (qvName == "Recently Active & Renewed Contracts" && !hasItem7 && !hasItem2) {
        applyFilter();
        displayshowall("Recently Active & Renewed Contracts")
        $("#btnAddView").css('display', 'none');
    } else if (qvName == "Active" && !hasItem1 && !hasItem2) {
        GetActiveContracts();
    } else if (qvName == "UpcomingRenewals" && !hasItem1 && !hasItem2) {
        GetUpcomingRenewals();
    } else if (qvName == "Unassigned Contracts" && !hasItem1 && !hasItem2) {
        GetUnassignedContracts();
    } else if (qvName == "Shared With Me" && !hasItem1 && !hasItem2) {
        GetSharedContracts();
    } else if (qvName == "In Recycle Bin" && !hasItem1 && !hasItem2) {
        GetContractsInRecycleBin();
    }
    else {
        applyFilter();
    }
}

function liRemoveRenewalExp(obj) {
    var qvName = "";
    if ($('#liFiltersQuickView').text() != "") {
        qvName = getQuickViewLinkName($('#liFiltersQuickView').text());
    }
    if ($(obj.parentNode.parentNode).attr('id') == 'liFiltersSearchText') {
        $(obj.parentNode.parentNode).empty();
        $('#txtSearchBox').val('');
    }
    else {
        var child = obj.parentNode;
        var firstChild = child.firstChild;

        $("#filterContractType option[value='" + firstChild.nodeValue + "']").attr("selected", false);

        var optionval = firstChild.nodeValue;
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

        $("#filterRenewDates option[value='" + newval + "']").attr("selected", false);
        $("#filterDates option[value='" + newval + "']").attr("selected", false);

        child.parentNode.removeChild(child);
    }

    var hasItem2 = false;
    $('#filterContractType :selected').each(function (i, selected) {
        hasItem2 = true;
    });

    var hasItem5 = false;

    $('#filterRenewDates :selected').each(function (i, selected) {
        hasItem5 = true;
    });

    var hasItem6 = false;

    $('#filterRenewDates :selected').each(function (i, selected) {
        hasItem6 = true;
    });

    applyFilter();

    if (qvName == "Upcoming Renewals" && !hasItem5 && !hasItem2) {
        displayshowall("Upcoming Renewals")
        $("#btnAddView").css('display', 'none');
    } else if (qvName == "Upcoming Expirations" && !hasItem6 && !hasItem2) {
        displayshowall("Upcoming Expirations")
        $("#btnAddView").css('display', 'none');
    }
}

function displayshowall(quickviewtitle) {
    $("#showAll").css('display', 'block');
    $("#showAll").css('display', 'inline');
    $("#showAll").text('');
    $("#showAll").text("Showing " + quickviewtitle + " Records");
}

function liRemoveMyContracts(obj) {
    if ($(obj.parentNode.parentNode).attr('id') == 'liFiltersSearchText') {
        $(obj.parentNode.parentNode).empty();
        $('#txtSearchBox').val('');
    }
    else {
        var child = obj.parentNode;
        var firstChild = child.firstChild;

        var find = " ";
        var re = new RegExp(find, 'g');

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

        $("#filterUserType option[value='" + newval + "']").attr("selected", false);
        $("#filterStatus").find('option:contains(' + firstChild.nodeValue + ')').attr("selected", false);

        child.parentNode.removeChild(child);
    }
    var hasItem1 = false;

    $('#filterUserType :selected').each(function (i, selected) {
        hasItem1 = true;
    });
    var hasItem2 = false;

    $('#filterStatus :selected').each(function (i, selected) {
        hasItem2 = true;
    });
    $('#liFiltersUserType').empty();
    $('#liFiltersStatus').empty();
    if (!hasItem1 && !hasItem2) {
        GetMyContracts();
        displayshowall("My Contracts");
        $("#btnAddView").css('display', 'none');
    } else {
        applyFilter();
    }
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

function search() {
    var txtsearchboxvalue = $.trim($('#txtSearchBox').val());
    if (txtsearchboxvalue == '') {
        //  alert('Enter Search Keyword');
        swal("", "Enter Search Keyword");
    }
    else {
        // add loading image to div
        $('#listContracts').html('<img src="../Content/Images/icon/loading.gif"> Searching...');
        $("#spResult").empty();
        $('#listContracts1').html('<img src="../Content/Images/icon/loading.gif"> Searching...');
        $("#spResult1").empty();
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?searchkeyword=' + $("#txtSearchBox").val(),
            type: 'GET',
            dataType: 'json',
            'Content-Type': 'application/json',
            cache: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName },
            success: function (data) {
                $("#listContracts").empty();
                $("#listContracts1").empty();
                var resultFound = GetData(data);
                GetData2(data);
                if (resultFound) {
                    if ($.trim($("#txtSearchBox").val()) == '') {
                        $("#showAll").text("Showing All Contract Records");
                    }
                    else {
                        $("#showAll").text('');
                        //$('#liFiltersSearchText').html('<li style="display:inline; color:#ffffff;">' + 'Showing search result for : ' + txtsearchboxvalue + '<img title="Remove" onclick="javascript:liRemove(this);" style="margin-left: 5px; margin-right: 10px; cursor:pointer;" src="../Content/Images/icon/close.png"></li>');
                        $('#liFiltersSearchText').html('<span><small>Showing search result for : ' + txtsearchboxvalue + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
                    }
                } else {
                    $("#showAll").text('');
                    //$('#liFiltersSearchText').html('<li style="display:inline; color:#ffffff;">' + 'Showing search result for : ' + txtsearchboxvalue + '<img title="Remove" onclick="javascript:liRemove(this);" style="margin-left: 5px; margin-right: 10px; cursor:pointer;" src="../Content/Images/icon/close.png"></li>');
                    $('#liFiltersSearchText').html('<span><small>Showing search result for : ' + txtsearchboxvalue + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
                    $("#listContracts").empty();
                    $("#listContracts").append("<label style='font-size:20px;'>No items found.</label>");
                    $("#listContracts1").empty();
                    $("#listContracts1").append("<label style='font-size:20px;'>No items found.</label>");
                }
                $("#compact-pagination").css('display', '');
            },
            error:
                function (data) {
                    $("#showAll").text('');
                    //$('#liFiltersSearchText').html('<li style="display:inline; color:#ffffff;">' + 'Showing search result for : ' + txtsearchboxvalue + '<img title="Remove" onclick="javascript:liRemove(this);" style="margin-left: 5px; margin-right: 10px; cursor:pointer;" src="../Content/Images/icon/close.png"></li>');
                    $('#liFiltersSearchText').html('<span><small>Showing search result for : ' + txtsearchboxvalue + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
                    $("#listContracts").empty();
                    $("#listContracts").append("<p class='f_p-error'>No items found.</p>");
                    $("#compact-pagination").css('display', 'none');
                    $("#listContracts1").empty();
                    $("#listContracts1").append("<p class='f_p-error'>No items found.</p>");
                    $("#compact-pagination1").css('display', 'none');
                }
        });
        applyFilter();
    }
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

    $("#btnAddView").css('display', 'none');
}

//Script for search end

var multipleChecks = "";
var multipleChecksPermission = "";

function checkMultipleContracts(object) {
    $('.hhide').hide();
    var validate = true;

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

    if (validate) {
        $('#SelectAll').attr('checked', true)
    }
    else {
        $('#SelectAll').attr('checked', false)
    }




    var ContractID = object.id;
    var vPermission = $("#" + ContractID).parent("p").parent("li").find("#Permission").text();
    var isChecked = object.checked;
    if (isChecked) {
        $("#" + ContractID).parent("p").parent("li").addClass('aActive');
        $("#btnMultipleAction").css('display', '');
        multipleChecks = multipleChecks + ';' + ContractID;
        multipleChecksPermission = multipleChecksPermission + ';' + vPermission;



    } else {
        $("#" + ContractID).parent("p").parent("li").removeClass('aActive');
        multipleChecks = multipleChecks.replace(';' + ContractID, '');
        multipleChecksPermission = multipleChecksPermission.replace(';' + vPermission, '');

    }

    if (multipleChecks.trim() == "") {
        $("#btnMultipleAction").css('display', 'none');
    } else {
        if (multipleChecksPermission.indexOf('openmenuView') >= 0) {
            $("#btnMultipleAction_Status").css('display', 'none');
            $("#btnMultipleAction_People").css('display', 'none');
            $("#btnMultipleAction_Counparty").css('display', 'none');
            $("#btnMultipleAction_BusnArea").css('display', 'none');
            $("#btnMultipleAction_Delete").css('display', 'none');
            $("#btnMultipleAction_NoPermission").css('display', '');

        } else if (multipleChecksPermission.indexOf('openmenuContribute') >= 0) {
            $("#btnMultipleAction_Status").css('display', '');
            $("#btnMultipleAction_People").css('display', 'none');
            $("#btnMultipleAction_Counparty").css('display', '');
            if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All")
                $("#btnMultipleAction_BusnArea").css('display', '');
            $("#btnMultipleAction_Delete").css('display', 'none');
            $("#btnMultipleAction_NoPermission").css('display', 'none');

        } else {



            $("#btnMultipleAction_Status").css('display', '');
            $("#btnMultipleAction_People").css('display', '');
            $("#btnMultipleAction_Counparty").css('display', '');
            if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All")
                $("#btnMultipleAction_BusnArea").css('display', '');
            $("#btnMultipleAction_Delete").css('display', '');
            $("#btnMultipleAction_NoPermission").css('display', 'none');

        }
    }
    try {
        hideAllMenuAndStopPro(event);
    }
    catch (ex) {

    }
}









function BindMultipleStatusbyCLM() {

    var CheckBindMulFinalizedData = parseInt($("#tdMulFinalizedStatus").children().length)
    if (CheckBindMulFinalizedData != 0) {
        $('input:radio[name="FinalizedStatusMul"]').attr('checked', false);
        $('#dvContCancelNoteMul').css("display", "none");
        if ($("#txtReasonOfCancelContractMul").hasClass("validelement"))
            $("#txtReasonOfCancelContractMul").removeClass('validelement');
        $("#dvManageContractStatusMul").dialog("open");
        $(".hhide").hide();
    }
    else {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contractstatusesbyCLM',
            type: 'GET',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            cache: false,
            success: function (contractstatuses) {
                var datalenght = contractstatuses.length;
                for (var i = 0; i < datalenght; i++) {
                    var item = contractstatuses[i];

                    if (item.Transition == "Manual" || contractItem.Status == item.ContractStatus) {
                        if (item.Transition != "Manual")
                            vAutoChange = 'AutoChange';
                        else
                            vAutoChange = '';


                        if (item.ContractStage != "Pipeline") {

                            var ctrl = "";

                            if (item.ContractStatus == "Awaiting Signatures") {
                                ctrl = "<input id='rdFinalizedAwaitingSignMul' type='radio' name='FinalizedStatusMul' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Awaiting Signatures:The Contract Record is waiting to be signed by Internal or External Signees or both.' class='status_yellow'><img src='../Content/Images/status/renew.png'>sign</b><label for='rdFinalizedAwaitingSignMul' class='css-label'>" + item.ContractStatus + "</label><br />";
                            }
                            if (item.ContractStatus == "Ready for Signature") {
                                ctrl = "<input id='rdFinalizedReadySignMul' type='radio' name='FinalizedStatusMul' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Ready for Signature:The Contract Record is waiting to be signed by Internal or External Signees or both.' class='status_green'><img src='../Content/Images/status/active.png'>sign</b><label for='rdFinalizedReadySignMul' class='css-label'>" + item.ContractStatus + "</label><br />";
                            }
                            if (item.ContractStatus == "Signed") {
                                ctrl = "<input id='rdFinalizedSignedMul' type='radio' name='FinalizedStatusMul' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Signed:The signees have signed the Contract Record. ' class='status_blue'><img src='../Content/Images/status/tick.png'>sign</b><label for='rdFinalizedSignedMul' class='css-label'>" + item.ContractStatus + "</label><br />";
                            }


                            if (item.ContractStatus == "Active") {
                                ctrl = "<input id='rdFinalizedActiveMul' type='radio' name='FinalizedStatusMul' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Active:The Contract Record is signed and is in effect till expiry.' class='status_green'><img src='../Content/Images/status/active.png'>actv</b><label for='rdFinalizedActiveMul' class='css-label'>" + item.ContractStatus + "</label><br />";

                            }


                            if (item.ContractStatus == "Up for Renewal") {
                                ctrl = "<input id='rdFinalizedUpForRenewalMul' type='radio' name='FinalizedStatusMul' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Up for Renewal:The Contract Record is waiting to be renewed.' class='status_red'><img src='../Content/Images/status/exp.png'>renw</b><label for='rdFinalizedUpForRenewalMul' class='css-label'>" + item.ContractStatus + "</label><br />";

                            }

                            if (item.ContractStatus == "About to Expire") {
                                ctrl = "<input id='rdFinalizedAboutToExpireMul' type='radio' name='FinalizedStatusMul' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='About to Expire:The Contract Record is about to get expired.' class='status_red'><img src='../Content/Images/status/exp.png'>exp</b><label for='rdFinalizedAboutToExpireMul' class='css-label'>" + item.ContractStatus + "</label><br />";

                            }


                            if (item.ContractStatus == "On Hold") {
                                ctrl = "<input id='rdFinalizedOnHoldMul' type='radio' name='FinalizedStatusMul' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='On Hold:The parties do not mutually agree to the terms & conditions of this Contract Record.' class='status_red'><img src='../Content/Images/status/exp.png'>hold</b><label for='rdFinalizedOnHoldMul' class='css-label'>" + item.ContractStatus + "</label><br />";




                            }
                            if (item.ContractStatus == "Replaced") {
                                ctrl = "<input id='rdFinalizedReplacedMul' type='radio' name='FinalizedStatusMul' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Replaced:The Contract Record got replaced with its updated version.' class='status_Gray'><img src='../Content/Images/status/replace.png'>rep</b><label for='rdFinalizedReplacedMul' class='css-label'>" + item.ContractStatus + "</label><br />";

                            }


                            if (item.ContractStatus == "Expired") {
                                ctrl = "<input id='rdFinalizedExpiredMul' type='radio' name='FinalizedStatusMul' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Expired:The period of the contract term has ended.' class='status_Gray'><img src='../Content/Images/status/expried.png'>exp</b><label for='rdFinalizedExpiredMul' class='css-label'>" + item.ContractStatus + "</label><br />";



                            }
                            if (item.ContractStatus == "Cancelled") {
                                ctrl = "<input id='rdFinalizedCancelledMul' type='radio' name='FinalizedStatusMul' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Cancelled:The Contract Record got cancelled due to, Impossible to be Fulfilled or Fraud, Mistake, Misrepresentation or Breach of Contract or Prior Agreement.' class='status_Gray'><img src='../Content/Images/status/close.png'>canc</b><label for='rdFinalizedCancelledMul' class='css-label'>" + item.ContractStatus + "</label><br />";


                            }
                            if (item.ContractStatus == "Archived") {
                                ctrl = "<input id='rdFinalizedArchivedMul' type='radio' name='FinalizedStatusMul' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Archived:The Contract Record got archived due to either of the following status, 'cancelled', 'Terminated' or 'Expired' .' class='status_blue'><img src='../Content/Images/status/archive.png'>ARCH</b><label for='rdFinalizedArchivedMul' class='css-label'>" + item.ContractStatus + "</label><br />";


                            }
                            $("#tdMulFinalizedStatus").append(ctrl);


                        }

                    }
                }
                $('.AutoChange').prop('disabled', true);
            }
        });

    }
}



function showStatusMultiple() {
    //$("#loadingPage").fadeIn();
    //BindMultipleStatus();
    // BindMultipleStatusbyCLM();
    $('input:radio[name="FinalizedStatusMul"]').attr('checked', false);
    // $('#dvContCancelNoteMul').css("display", "none");
    // if ($("#txtReasonOfCancelContractMul").hasClass("validelement"))
    //     $("#txtReasonOfCancelContractMul").removeClass('validelement');

    $("#dvManageContractStatusMul").dialog("open");
    $(".hhide").hide();
}




function showPeopleMultiple() {
    $(".hhide").hide();
    $("#addEditPeopleMultiple").dialog("option", "title", "People");
    $("#addEditPeopleMultiple").dialog("open");
}

function multipleDelete() {
    $(".hhide").hide();
    swal({
        title: '',
        text: "Are you sure, you want to <span style=\"font-weight:700\">delete</span> contract(s)?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        html: true
    },
       function (confirmed) {
           if (confirmed) {
               var index = 0;
               var multipleChecksArray = multipleChecks.split(';');
               var multipleChecksArraylength = multipleChecksArray.length;
               for (var i = 1; i < multipleChecksArraylength; i++) {
                   $.ajax({
                       url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + multipleChecksArray[i],
                       type: 'DELETE',
                       dataType: 'json',
                       headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                       cache: false,
                       success: function (data) {
                           index = index + 1;
                           if (index == multipleChecksArraylength - 1) {
                               location = "/Contracts";
                           }
                       }
                   });
               }

           }
           return;
       });

    //if (confirm("Are you sure, you want to delete contract(s)?")) {
    //    var multipleChecksArray = multipleChecks.split(';');
    //    var multipleChecksArraylength = multipleChecksArray.length;
    //    for (var i = 1; i < multipleChecksArraylength; i++) {
    //        $.ajax({
    //            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + multipleChecksArray[i],
    //            type: 'DELETE',
    //            dataType: 'json',
    //            headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
    //            cache: false,
    //            success: function (data) {
    //            }
    //        });
    //    }
    //    location = "/Contracts";
    //}
}

function BindMultipleStatus() {
    $("#menuSMultiple").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contractstatusesbyCLM',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (contractstatuses) {
            var datalength = contractstatuses.length;
            for (var i = 0; i < datalength; i++) {
                var item = contractstatuses[i];
                if (item.Transition == "Manual") {
                    var ctrl = "";

                    if (item.ContractStatus.trim() == "Renewed" || item.ContractStatus.trim() == "Extended")
                    { }
                    else {
                        if ($("#hdContractStatus").val() == item.ContractStatus.trim()) {
                            ctrl = "<li id=" + item.ContractStatus.trim() + "><input id='" + item.RowKey + "' type='radio' checked onclick='javascript:statusclick(this);' name='rdstatus' value=" + encodeURI(item.ContractStatus.trim()) + " class='css-checkbox' /><label for='" + item.RowKey + "' class='css-label'>" + item.ContractStatus.trim() + "</label></li>";
                        } else {
                            ctrl = "<li id=" + item.ContractStatus.trim() + "><input id='" + item.RowKey + "' type='radio' onclick='javascript:statusclick(this);' name='rdstatus' value=" + encodeURI(item.ContractStatus.trim()) + " class='css-checkbox' /><label for='" + item.RowKey + "' class='css-label'>" + item.ContractStatus.trim() + "</label></li>";
                        }
                    }

                    $("#menuSMultiple").append(ctrl);
                }
            }

            $("#loadingPage").fadeOut();
            $('#addEditStatusMultiple').dialog('open');
        }
    });
}

function changestatusmultiple() {
    var selectedValue = decodeURI($("input:radio[name=FinalizedStatusMul]:checked").val());

    if (selectedValue == "undefined" || selectedValue == "0" || selectedValue == "") {
        // alert("Select Status");
        swal("", "Select Status");
        return false;
    } else {

        changestatusM();
        return true;
    }
}

function changestatusM() {
    if (requiredValidator("dvManageContractStatusMul", false)) {
        $("#loadingPage").fadeIn();
        var stat = '';
        stat = decodeURI($("input:radio[name=FinalizedStatusMul]:checked").val());
        var vStatusNote = '';
        if (stat == "Cancelled")
        { vStatusNote = "CancelledReason=" + $("#txtReasonOfCancelContractMul").val(); }

        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + multipleChecks + '/changestatus?status=' + stat,
            type: 'PUT',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
            data: vStatusNote,
            cache: false,
            success: function (result) {
                $("#loadingPage").fadeOut();
                $("#dvManageContractStatusMul").dialog("close");
                applyFilter();
                $('#SelectAll').attr('checked', false);
                $("#btnMultipleAction").css('display', ' ');
            },
            error: function (person) {
                $("#loadingPage").fadeOut();
            },
        });
    }


}

function savePeopleM() {
    $('.ui-button-green-text').parent().attr('disabled', 'disabled');
    var isformvalid = false;
    if (requiredValidator('addNewPeopleM')) {

        var contractmanagers = $("#ddlContractManagersM").val();
        var cm = '';
        $(contractmanagers).each(function (i, item) {
            if (cm == '') {
                cm = item;
            }
            else {
                cm += "; " + item;
            }
        });
        var multipleChecksArray = multipleChecks.split(';');
        var multipleChecksArraylength = multipleChecksArray.length
        for (var i = 1; i < multipleChecksArraylength; i++) {
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + multipleChecksArray[i] + '/peoplemultiple',
                type: 'PUT',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                data: {
                    ContractManagers: cm,
                    ModifiedBy: localStorage.UserName
                },
                cache: false,
                success: function (person) {

                }
            });
        }

        $('.ui-button-green-text').parent().removeAttr('disabled');
        //Removed//alert('Contract Owner Changed.');
        $("#addEditPeopleMultiple").dialog("close");
    }
    else {
        $('.ui-button-green-text').parent().removeAttr('disabled');
    }
    return isformvalid;
}

function GetFromDashboard(viewname, vStatus) {
    switch (viewname) {
        case "My Contracts":
            var values1 = vStatus.split(';');
            var values1length = values1.length;
            for (var i = 0; i < values1length; i++) {
                var find = " ";
                var re = new RegExp(find, 'g');

                values1[i] = values1[i].replace(re, '');

                $("#filterStatus option[value='" + values1[i] + "']").attr("selected", true);
            }
            break;
        case "Upcoming Renewals":
            $("#filterRenewDates option[value='" + vStatus + "']").attr("selected", true);
            break;
    }
    applyFilter();
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
    GetValuesAndAutoPopulate("ddlAssignTo" + totalFileCount, Participants);
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
        //$(".ui-dialog-buttonset").prepend($("<span class='labelleft'>wait...</span>"));
        var vWorkflowStage = [];
        $('#tblStage tr').each(function (i, row) {
            var vRow = $(row).attr('id');
            var vRowIndex = vRow.replace("trStage", "");
            var stage = $("#txtStage" + vRowIndex).val();
            var order = $("#ddlOrder" + vRowIndex).find('option:selected').text();
            //var approvers = $("#ddlAssignTo" + vRowIndex).val();
            var sendTo = '';
            $('#ddlAssignTo' + vRowIndex + '_chosen').find('.chosen-choices li').find('span').each(function () {
                if (sendTo == '') {
                    sendTo = $(this).text();
                }
                else {
                    sendTo += "; " + $(this).text();
                }
            });
            //$(approvers).each(function (i, item) {
            //    if (sendTo == '') {
            //        sendTo = item;
            //    }
            //    else {
            //        sendTo += "; " + item;
            //    }
            //});
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
        var vObject = "Contracts";
        var nicInstance = nicEditors.findEditor('txtComment');
        var vcommentText = CleanWordFormatFromHTML(nicInstance.getContent());
        if (vcommentText.length <= 26500) {
            vcommentText = $('<div/>').text(vcommentText).html();
            if ($("#hdWorkflowType").val() == "Document Review") { vObject = "Documents"; }
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
                    if (vObject == "Contracts" && vAutoUpdateObjectStatus == "Yes")
                        //alert('This Contract Record is moved to the Pipeline Contracts. Check "Pipeline" tab.');
                        swal("", "This Contract Record is moved to the Pipeline Contracts. Check 'Pipeline' tab.");
                    else
                        // alert($("#hdWorkflowType").val() + " Workflow Started");
                        // swal("", $("#hdWorkflowType").val() + " Workflow Started");
                        $("#inprocessStartWorkflow").css('display', 'none');
                    //$(".ui-dialog-buttonset").children("span").remove();//ui-dialog-buttonpane
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

function SearchIn(action) {
    switch (action) {
        case "Contracts":
            {
                $("#bSearchIn").html(action);
                $('#contractFilter').css('display', '');
                $('#documentFilter').css('display', 'none');
                $('#counterpartyFilter').css('display', 'none');
                ApplyFilter();
                break;
            }
        case "Documents":
            {
                location = "/Contracts/Documents?Type=contracts";
                //$("#bSearchIn").html(action);
                //$('#contractFilter').css('display', 'none');
                //$('#documentFilter').css('display', '');
                //$('#counterpartyFilter').css('display', 'none');
                //ApplyFilterDocument();
                break;
            }
    }
}


function toggledivsingle(object, imgObject) {
    $("#" + object).slideToggle();

    var imgObj = $("#" + imgObject);

    if (imgObj.attr("title") == "Collapse") {
        imgObj.attr("title", "Expand");
        imgObj.attr("src", "../Content/Images/e-open.png");
    } else {
        imgObj.attr("title", "Collapse");
        imgObj.attr("src", "../Content/Images/e-close.png");
    }
}

$("#ddlHistoryFilter").change(function () {
    var option = $(this).find('option:selected').text();
    var contractID = $("#hdContractID").val();
    if (option == "All") {
        CreateContractActivityList(contractID);
    } else {
        CreateContractActivityList(contractID, option);
    }
});

function ViewCounterparty() {

    $(".hhide").hide();
    $('#loadCP').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    CounterpartyFunc();
}
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
            //    CounterPartyArrayprev.push($.trim(this));
            //});
            myCounterPartyArray = [];
            var obj1 = {};
            for (var i = 0; i < data.length; i++) {
                if (!(data[i].CounterpartyName in obj1)) {
                    if (data[i].CounterpartyName.trim() != "") {
                        myCounterPartyArray.push(data[i]);
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
            $("#selectallCounterParty").attr('checked', false);

            $('input:checkbox[name=Counterparty]').attr('checked', false);
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
//            for (var i = 0; i < datalength; i++) {
//                var item = data[i];
//                var article = "";
//                if (i == 0) {
//                    article += '<tr><th>Counterparty Name</th><th>Counterparty Type</th></tr>';
//                }

//                article += '<tr><td>';
//                article += '<input id="CP' + item.RowKey + '" type="checkbox" name="Counterparty" class="css1-checkbox" value="' + item.CounterpartyName + '" />';

//                article += '<label for="CP' + item.RowKey + '" class="css1-label">' + item.CounterpartyName + '</label>';
//                article += '</td><td>' + item.CounterpartyType + '';
//                article += '</td></tr>';
//                counterpartyTags.push(item.CounterpartyName);
//                $("#tblCounterparties").append(article);
//            }


//            $("#txtSearchBoxCP").autocomplete({
//                source: counterpartyTags,
//                //select: function(event, ui) {
//                //    event.preventDefault();
//                //},
//                minLength: 1,
//                focus: function (event, ui) {
//                    return false;
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

//function SearchCounterparty() {
//    $("#tblCounterparties").html('');
//    $('#loadCP').html('<img src="../Content/Images/icon/loading.gif"> Searching...');
//    var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty?searchkeyword=' + $("#txtSearchBoxCP").val() + '&customquery=&sortbyfield=CounterpartyName&orderby=ASC';
//    $.ajax({
//        url: vURL,
//        type: 'GET',
//        dataType: 'json',
//        "Content-Type": "application/json",
//        headers: { 'eContracts-ApiKey': localStorage.APIKey },
//        cache: false,
//        success: function (data) {
//            $('#loadCP').empty();

//            var datalength = data.length;
//            for (var i = 0; i < datalength; i++) {
//                var item = data[i];
//                var article = '';
//                if (i == 0) {
//                    article += '<tr><th>Counterparty Name</th><th>Counterparty Type</th></tr>';
//                }
//                article = '<tr><td>';
//                article += '<input id="CP' + item.RowKey + '" type="checkbox" name="Counterparty" class="css1-checkbox" value="' + item.CounterpartyName + '" />';

//                article += '<label for="CP' + item.RowKey + '" class="css1-label">' + item.CounterpartyName + '</label>';
//                article += '</td><td>' + item.CounterpartyType + '';
//                article += '</td></tr>';
//                $("#tblCounterparties").append(article);
//            }
//            var vCount = $("#tblCounterparties tr").length;
//            if (vCount != 0) {
//                $('#loadCP').html('');
//                $("#spCounterpartiesUnselect").css("display", "");
//                $('#compact-paginationCounterparties').css('display', '');
//                $('#compact-paginationCounterparties').pagination({
//                    items: vCount,
//                    itemsOnPage: 10,
//                    typeID: 'tblCounterparties',
//                    cssStyle: 'compact-theme'
//                });
//            } else {
//                $('#loadCP').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
//                $('#compact-paginationCounterparties').css('display', 'none');
//                $("#spCounterpartiesUnselect").css("display", "none");
//            }
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
    $('input:checkbox[name="Counterparty"]:checked').each(function () {
        if (vCoounterparty == "") {
            vCoounterparty = this.value;
        }
        else {
            vCoounterparty += "; " + this.value;
        }
    });
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
               url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + multipleChecks + '/changecounterparty?counterparty=' + encodeURIComponent(vCoounterparty),
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

        //if (confirm("Are you sure, you want to change counterparty?")) {
        //    $("#loadingPage").fadeIn();

        //    $.ajax({
        //        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + multipleChecks + '/changecounterparty?counterparty=' + encodeURIComponent(vCoounterparty),
        //        type: 'PUT',
        //        dataType: 'json',
        //        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
        //        cache: false,
        //        success: function (result) {
        //            $("#loadingPage").fadeOut();
        //            $("#browseCounterparty").dialog("close");
        //            applyFilter();
        //        },
        //        error: function (person) {
        //            $("#loadingPage").fadeOut();
        //        },
        //    });
        //}
    } else {
        //alert('No Counterparty has been selected.');
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
            getbusinessareapath();
            recursiveIteration12(data)
            $("#tbodyBusinessArea12").append(article1);
            article1 = "";
            $("#example-basic-12").treetable({ expandable: true, initialState: "expanded" },true);
            //$(".openmenu").contextMenu({ menu: 'myMenu', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("td").parent("tr"), pos); });

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

var BusinessAreaAccess12 = localStorage.BusinessAreaAccess;
var strContractAreaName12 = "";
var strContractAreaName12Owner = "";
var previousidcreate = "";
var strContractAreaID = '';
function recursiveIteration12(object) {
    if (object.ChildrenData.length != 0) {
        BindRecBAOther('', object);
        //for (var i = 0; i < object.ChildrenData.length; i++) {
        //    var item = object.ChildrenData[i];
        //    var additional = "";
        //    // var j = BusinessAreaAccess12.indexOf(item.BusinessAreaName);
        //    var j = BusinessAreaAccessID.indexOf(item.RowKey);
        //    if (j > -1 || item.Owner.trim().split(';').indexOf(localStorage.UserName.trim()) > -1) {
        //        if (item.ParentBusinessAreaID != 0) {
        //            if (item.Owner.trim().split(';').indexOf(localStorage.UserName.trim()) > -1) {//if business owner
        //                additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclick1(this)">' + item.BusinessAreaName + '</span>&nbsp; <img src="/Content/Images/icon/profile.png" style="cursor:default;" />'
        //            } else { //if permission in business area
        //                additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclick1(this)">' + item.BusinessAreaName + '</span>'
        //            }
        //        } else {
        //            additional = '<span>' + item.BusinessAreaName + '</span>';
        //        }

        //    } else {
        //        if (item.ParentBusinessAreaID != 0) {
        //            if (strContractAreaID == "GenCA") {
        //                additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclick1(this)">' + item.BusinessAreaName + '</span>'
        //            } else {
        //                if (localStorage.UserType.indexOf("Global Contract Owner") >= 0) {
        //                    additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclick1(this)">' + item.BusinessAreaName + '</span>'
        //                } else {
        //                    additional = '<span>' + item.BusinessAreaName + '</span><span style="font-size:12px;font-style:italic;">(Request Access)</span>';
        //                }
        //            }
        //        } else {
        //            additional = '<span>' + item.BusinessAreaName + '</span>';
        //        }
        //    }

        //    if (item.ParentBusinessAreaID == 0) {
        //        strContractAreaName12 = item.BusinessAreaName;
        //        strContractAreaID = item.RowKey;
        //        strContractAreaName12Owner = item.Owner;
        //        article1 += '<tr data-tt-id="tre-' + item.RowKey + '" class="branch expanded">';
        //        article1 += '<td class="treeHead"><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName12 + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName12Owner + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/globset.png" /><small>' + additional + '</small></td></tr>';
        //    } else {
        //        article1 += '<tr data-tt-id="tre-' + item.RowKey + '" data-tt-parent-id="tre-' + item.ParentBusinessAreaID + '" class="branch collapsed" style="display: table-row;">';
        //        if (previousidcreate == item.ParentBusinessAreaID) {
        //            //find if child business area exists
        //            $.ajax({
        //                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/childbusinessareas?businessareaid=' + item.RowKey,
        //                type: 'GET',
        //                dataType: 'json',
        //                'Content-Type': 'application/json',
        //                headers: { 'eContracts-ApiKey': localStorage.APIKey },
        //                async: false,
        //                success: function (data) {
        //                    if (data.length == 0) {
        //                        article1 += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName12 + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName12Owner + '</span><span id="BusinessAreaOwner" style="display:none;">' + item.Owner + '</span><span id="BusinessAreaDescription" style="display:none;">' + item.Description + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" class="padding_left_65px" /><small>' + additional + '</small></td></tr>';
        //                    } else {
        //                        article1 += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName12 + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName12Owner + '</span><span id="BusinessAreaOwner" style="display:none;">' + item.Owner + '</span><span id="BusinessAreaDescription" style="display:none;">' + item.Description + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" /><small>' + additional + '</small></td></tr>';
        //                    }
        //                },
        //                error:
        //                    function (data) {

        //                    }
        //            });
        //        } else {
        //            article1 += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName12 + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName12Owner + '</span><span id="BusinessAreaOwner" style="display:none;">' + item.Owner + '</span><span id="BusinessAreaDescription" style="display:none;">' + item.Description + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" /><small>' + additional + '</small></td></tr>';
        //        }
        //        if (previousidcreate != item.ParentBusinessAreaID)
        //            previousidcreate = item.RowKey;
        //    }
        //    //if (previousidcreate != item.ParentBusinessAreaID)
        //    //    recursiveIteration12(object.ChildrenData[i])

        //    if (object.ChildrenData.length > 0)
        //        recursiveIteration12(object.ChildrenData[i]);
        //}
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
        var found = $.grep(BusinessAreaAccess, function (n, ind) {
            return (n.indexOf(spath) == 0);
        });
        if (found.length > 0 || localStorage.UserType.indexOf("Global Contract Owner") >= 0 || item.RowKey == "GenCA" || item.RowKey == "GenBA") {
            //var j = BusinessAreaAccess12.indexOf(item.BusinessAreaName);
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
            //if (previousidcreate != item.ParentBusinessAreaID)
            //    recursiveIteration12(object.ChildrenData[i])

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
            text: "Are you sure, you want to <span style=\"font-weight:700\">change</span> business area?",
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
                       url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + multipleChecks + '/changebusinessarea',
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

        //if (confirm("Are you sure, you want to change business area?")) {
        //    $("#loadingPage").fadeIn();
        //    $.ajax({
        //        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/businessarealocation?businessareaid=' + treeBusinessAreaRowKey,
        //        type: 'GET',
        //        dataType: 'json',
        //        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        //        success: function (fullhierarchy) {
        //            $.ajax({
        //                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + multipleChecks + '/changebusinessarea',
        //                type: 'PUT',
        //                dataType: 'json',
        //                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
        //                data: {
        //                    BusinessArea: treeBusinessAreaName,
        //                    BusinessAreaOwners: treeBusinessAreaOwner,
        //                    BusinessAreaPath: fullhierarchy,
        //                },
        //                cache: false,
        //                success: function (result) {
        //                    $("#loadingPage").fadeOut();
        //                    $("#browseBA").dialog("close");
        //                    applyFilter();
        //                },
        //                error: function (person) {
        //                    $("#loadingPage").fadeOut();
        //                },
        //            });
        //        },
        //        error: function (fullhierarchy) {

        //        }
        //    });

        //}
    } else {
        // alert('Select Business Area');
        swal("", "Select Business Area");
    }
}


//New pop Up
$("#btnCancelPermission").click(function () {
    $('#txtAddUser').val('').trigger('chosen:updated');
    $("#ddlPermission").val("0");
    $("#divBtn").hide();
});
$("#btnSave").click(function () {

    if (requiredValidator("addEditPeople")) {

        var string = "";
        var UserDesignation = "";
        var arrApprovers = $.map(contractItem.Approvers.split(";"), $.trim);
        var arrReviewers = $.map(contractItem.Reviewers.split(";"), $.trim);
        var arrContractManagers = $.map(contractItem.ContractManagers.split(";"), $.trim);
        var arrRequestor = $.map(contractItem.Requestor.split(";"), $.trim);
        var PermissionToUser = $("#txtAddUser").val();
        var vLastRow = $("#newPopup li:last").attr('id');
        var totalPermissionCount = "1";
        if (typeof vLastRow == "undefined") {
            totalPermissionCount = "1";
        }
        else {
            totalPermissionCount = parseInt(vLastRow.replace("PermissionList", ""));
            totalPermissionCount += 1;
        }
        $(PermissionToUser).each(function (i, item) {
            if ($.inArray(item, arrApprovers) > -1) {
                UserDesignation = "(Approver)";
            }
            else if ($.inArray(item, arrReviewers) > -1) {
                UserDesignation = "(Reviewer)";
            }
            else if ($.inArray(item, arrContractManagers) > -1) {
                UserDesignation = "(Contract Owner)";
            }
            else if ($.inArray(item, arrRequestor) > -1) {
                UserDesignation = "(Requestor)";
            }
            string += "<li id='PermissionList" + totalPermissionCount + "'><div class='share-pop-up-Middle'><div><p id='PermissionUser" + totalPermissionCount + "'>" + item + "</p>";
            string += "<span >" + UserDesignation + "</span></div></div>";
            string += "<div class='share-pop-up-Right'><span id='UserPermission" + totalPermissionCount + "'><select id='PermissionOption" + totalPermissionCount + "'>";
            if ($("#ddlPermission option:selected").text() == "Full Control") {
                string += "<option value='FullControl' selected >Full Control</option>";
                string += "<option value='Read/Write'>Read/Write</option>";
                string += "<option value='ReadOnly'>Read Only</option>";
            }
            else if ($("#ddlPermission option:selected").text() == "Read/Write") {
                string += "<option value='FullControl'  >Full Control</option>";
                string += "<option value='Read/Write' selected >Read/Write</option>";
                string += "<option value='ReadOnly'>Read Only</option>";
            }
            else if ($("#ddlPermission option:selected").text() == "Read Only") {
                string += "<option value='FullControl'>Full Control</option>";
                string += "<option value='Read/Write'>Read/Write</option>";
                string += "<option value='ReadOnly' selected >Read Only</option>";
            }
            string += "</select><img id=" + totalPermissionCount + " src='/Content/Images/close.png' onclick='Remove(this)'/></span></div></li>";
            arrPermsnUser.push(item.trim());
            totalPermissionCount++;
            UserDesignation = "";
        });
        $('#newPopup').append(string);
        var arrForPermission = [];

        $("#txtAddUser").empty();

        arrUser = arrUser.filter(function (x) { return arrPermsnUser.indexOf(x) < 0 })
        var datalenght = arrUser.length;
        for (var i = 0; i < datalenght; i++) {
            var sUserName = arrUser[i];
            var article = '<option value="' + sUserName + '">' + sUserName + '</option>';
            $("#txtAddUser").append(article);

        }
        $("#txtAddUser").chosen();
        $('#txtAddUser').trigger('chosen:updated');
        $("#ddlPermission").val("0");

        $("#divBtn").hide();
    }

});
function Remove(obj) {
    swal({
        title: '',
        text: "Are you sure you want to <span style=\"font-weight:700\">delete</span>?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        html: true
    },
       function (confirmed) {
           if (confirmed) {
               var strPermissionUser = "";
               strPermissionUser = $("#PermissionUser" + obj.id).html();
               $("#txtAddUser").empty();
               arrUser.push(strPermissionUser);
               var datalenght = arrUser.length;
               for (var i = 0; i < datalenght; i++) {
                   var sUserName = arrUser[i];
                   var article = '<option value="' + sUserName + '">' + sUserName + '</option>';
                   $("#txtAddUser").append(article);
               }
               $("#txtAddUser").chosen();
               $('#txtAddUser').trigger('chosen:updated');
               $("#PermissionList" + obj.id).remove();
           }
           return;
       });
}
$("#txtAddUser").change(function () {
    $("#divBtn").show();

});
$('#chkPublicContract').change(function () {
    var isChecked = this.checked;
    if (isChecked) {
        $("#chkpermission").attr("disabled", "disabled");
        $("#chkpermission").prop('checked', false);
    } else {
        $("#chkpermission").removeAttr("disabled");
        $("#chkpermission").prop('checked', false);
    }
});
function GetValueAndPopulateManager(controlname, manager, values) {
    var vLastRow = $("#newPopup li:last").attr('id');
    var strPermission = "";
    var strnewManager = "";
    var arrFullControl = $.map(contractItem.FullControlPermissions.split(";"), $.trim);
    var arrReadWrite = $.map(contractItem.ReadWritePermissions.split(";"), $.trim);
    var arrReadOnly = $.map(contractItem.ReadOnlyPermissions.split(";"), $.trim);
    var arrAccessUser = arrFullControl.concat(arrReadWrite);
    arrAccessUser = arrAccessUser.concat(arrReadOnly);
    var arrApprovers = $.map(contractItem.Approvers.split(";"), $.trim);
    var arrReviewers = $.map(contractItem.Reviewers.split(";"), $.trim);
    var arrContractManagers = $.map(contractItem.ContractManagers.split(";"), $.trim);
    var arrRequestor = $.map(contractItem.Requestor.split(";"), $.trim);
    var totalPermissionCount = "1";
    if (typeof vLastRow == "undefined") {
        totalPermissionCount = "1";
    }
    else {
        totalPermissionCount = parseInt(vLastRow.replace("PermissionList", ""));
        totalPermissionCount += 1;
    }

    if (values != null && values != "") {
        var string = "";

        var res = values.split(";");
        var reslength = res.length;
        for (var i = 0; i < reslength; i++) {

            var strUserRole = "";
            if ($.inArray(res[i].trim(), arrAccessUser) >= 0) {
                if ($.inArray(res[i].trim(), arrApprovers) >= 0) {
                    strnewManager = ",Approver";
                }
                else if ($.inArray(res[i].trim(), arrReviewers) >= 0) {
                    strnewManager = ",Reviewer";
                }
                else if ($.inArray(res[i].trim(), arrContractManagers) >= 0) {
                    strnewManager = ",Contract Owner";
                }
                else if ($.inArray(res[i].trim(), arrRequestor) >= 0) {
                    strnewManager = ",Requestor";
                }
                if (strnewManager != "") {
                    strUserRole = manager + strnewManager;
                }
                if ($.inArray(res[i].trim(), arrFullControl) > -1) { strPermission = "Full Control"; }
                else if ($.inArray(res[i].trim(), arrReadWrite) > -1) { strPermission = "Read/Write"; }
                // else if ($.inArray(res[i].trim(), arrFullControl) > -1) { }                  
                arrAdminUser.push(res[i].trim());
            }
            if (strnewManager == "") {
                strUserRole = manager;
            }
            string += "<li id='PermissionList" + totalPermissionCount + "'><div class='share-pop-up-Middle'><div><p id='PermissionUser" + totalPermissionCount + "'>" + res[i].trim() + "</p>";
            string += "<span id='UserRole" + totalPermissionCount + "'>" + "(" + strUserRole + ")" + "</span></div></div>";
            if (controlname == "ddlFullControl") {
                strPermission = "Full Control";
                string += "<div class='share-pop-up-Right'><span id='UserPermission" + totalPermissionCount + "'>" + strPermission + "</span></div></li>";
            }
            else if (controlname == "ddlReadOnly") {
                string += "<div class='share-pop-up-Right'><span id='UserPermission" + totalPermissionCount + "'>";
                if (strPermission == "Full Control" || strPermission == "Read/Write") {
                    string += "<select id='PermissionOption" + totalPermissionCount + "'>";
                    if (strPermission == "Full Control") {
                        string += "<option value='FullControl' selected >Full Control</option>";
                        string += "<option value='Read/Write'>Read/Write</option>";
                        string += "<option value='ReadOnly'>Read Only</option>";
                    }
                    else if (strPermission == "Read/Write") {
                        string += "<option value='FullControl'  >Full Control</option>";
                        string += "<option value='Read/Write' selected >Read/Write</option>";
                        string += "<option value='ReadOnly'>Read Only</option>";
                    }
                    string += "</select>";
                }
                else
                    if (strPermission == "" || strPermission == "Read Only") {
                        strPermission = "Read Only";
                        string += "" + strPermission + "";
                    }
                string += "</span></div></li>";
            }
            strPermission = "";
            strnewManager = "";
            //arrPermsnUser.push(res[i].trim());
            totalPermissionCount++;
        } $('#newPopup').append(string);

    }    ///
}
function GetValueAndPopulateUsers(controlname, values) {
    var UserDesignation = "";
    var arrApprovers = $.map(contractItem.Approvers.split(";"), $.trim);
    var arrReviewers = $.map(contractItem.Reviewers.split(";"), $.trim);
    var arrContractManagers = $.map(contractItem.ContractManagers.split(";"), $.trim);
    var arrRequestor = $.map(contractItem.Requestor.split(";"), $.trim);

    if (values != null) {
        var vLastRow = $("#newPopup li:last").attr('id');
        var totalPermissionCount = "1";
        if (typeof vLastRow == "undefined") {
            totalPermissionCount = "1";
        }
        else {
            totalPermissionCount = parseInt(vLastRow.replace("PermissionList", ""));
            totalPermissionCount += 1;
        }
        var string = "";
        var res = values.split(";");
        var reslength = res.length;
        for (var i = 0; i < reslength; i++) {

            if (res[i].trim() != "" && res[i].trim() != null) {
                if ($.inArray(res[i].trim(), arrAdminUser) <= -1) {

                    if ($.inArray(res[i].trim(), arrApprovers) > -1) {
                        UserDesignation = "(Approver)";
                    }
                    else if ($.inArray(res[i].trim(), arrReviewers) > -1) {
                        UserDesignation = "(Reviewer)";
                    }
                    else if ($.inArray(res[i].trim(), arrContractManagers) > -1) {
                        UserDesignation = "(Contract Owner)";
                    }
                    else if ($.inArray(res[i].trim(), arrRequestor) > -1) {
                        UserDesignation = "(Requestor)";
                    }
                    string += "<li id='PermissionList" + totalPermissionCount + "'><div class='share-pop-up-Middle'><div><p id='PermissionUser" + totalPermissionCount + "'>" + res[i].trim() + "</p>";
                    string += "<span >" + UserDesignation + "</span></div></div>";
                    string += "<div class='share-pop-up-Right'><span id='UserPermission" + totalPermissionCount + "'><select  id='PermissionOption" + totalPermissionCount + "'>";
                    if (controlname == "ddlFullControl") {
                        string += "<option value='FullControl' selected >Full Control</option>";
                        string += "<option value='Read/Write'>Read/Write</option>";
                        string += "<option value='ReadOnly'>Read Only</option>";
                    }
                    else if (controlname == "ddlReadWrite") {
                        string += "<option value='FullControl'  >Full Control</option>";
                        string += "<option value='Read/Write' selected >Read/Write</option>";
                        string += "<option value='ReadOnly'>Read Only</option>";
                    }
                    else if (controlname == "ddlReadOnly") {
                        string += "<option value='FullControl'>Full Control</option>";
                        string += "<option value='Read/Write'>Read/Write</option>";
                        string += "<option value='ReadOnly' selected >Read Only</option>";
                    }
                    string += "</select>";
                    if (UserDesignation == "") {
                        string += "<img id=" + totalPermissionCount + " src='/Content/Images/close.png' onclick='Remove(this)'/>";
                    }
                    string += "</span></div></li>";
                    arrPermsnUser.push(res[i].trim());
                    totalPermissionCount++;
                    UserDesignation = "";
                }

            }
        } $('#newPopup').append(string);
    }
}

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
        var spltarrprevRUstr = CounterPartyArrayprev.toString();
        if (spltarrprevRUstr.indexOf(";") > -1) {
            var spltarrprevRU = spltarrprevRUstr.split(';');
            CounterPartyArrayprev = [];
            for (var arrli = 0; arrli < spltarrprevRU.length; arrli++) {
                if (spltarrprevRU[arrli].trim() != "") {
                    CounterPartyArrayprev.push(spltarrprevRU[arrli].trim());
                }
            }
        }
        for (var i = startIndex; i < endIndex; i++) {
            var article = "";
            if (i == startIndex) {
                article += '<tr><th><input id="selectallCounterParty" onclick="funselectallCounterParty(this);" type="checkbox"/> Select/Deselect All</th><th>Counterparty Name</th><th>Counterparty Type</th></tr>';
            }

            article += '<tr><td>';
            if (CounterPartyArrayprev != null && multipleChecksDocumentID.length > 0) {
                if (CounterPartyArrayprev.indexOf(myCounterPartyArray[i].CounterpartyName.trim()) >= 0 && multipleChecksDocumentID.indexOf(myCounterPartyArray[i].CounterpartyName.trim()) > -1) {
                    article += '<input id="CP' + myCounterPartyArray[i].RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);" checked class="css1-checkbox" value="' + myCounterPartyArray[i].CounterpartyName.trim() + '" /></td>';
                }
                else if (multipleChecksDocumentID.indexOf(myCounterPartyArray[i].CounterpartyName.trim()) > -1) {
                    article += '<input id="' + myCounterPartyArray[i].RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);" checked class="css1-checkbox" value="' + myCounterPartyArray[i].CounterpartyName.trim() + '" /></td>';
                }
                else {
                    article += '<input id="' + myCounterPartyArray[i].RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);"  class="css1-checkbox" value="' + myCounterPartyArray[i].CounterpartyName.trim() + '" /></td>';
                    checkboxchecking = false;
                }
            }
            else if (CounterPartyArrayprev.indexOf(myCounterPartyArray[i].CounterpartyName.trim()) >= 0 && multipleChecksDocumentID.length == 0) {
                article += '<input id="' + myCounterPartyArray[i].RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);" checked class="css1-checkbox" value="' + myCounterPartyArray[i].CounterpartyName.trim() + '" /></td>';
            }
            else if (multipleChecksDocumentID.indexOf(myCounterPartyArray[i].CounterpartyName.trim()) > -1) {
                article += '<input id="' + myCounterPartyArray[i].RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);" checked class="css1-checkbox" value="' + myCounterPartyArray[i].CounterpartyName.trim() + '" /></td>';
            }
            else {
                article += '<input id="' + myCounterPartyArray[i].RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);"  class="css1-checkbox" value="' + myCounterPartyArray[i].CounterpartyName.trim() + '" /></td>';
                checkboxchecking = false;
            }
            article += '<td><label for="CP' + myCounterPartyArray[i].RowKey + '" class="css1-label">' + myCounterPartyArray[i].CounterpartyName.trim() + '</label></td>';
            article += '</td><td>' + myCounterPartyArray[i].CounterpartyType + '';
            article += '</td></tr>';
            $("#tblCounterparties").append(article);
            $('#loading').empty();
            resultfound = true;
        }
    }
    if (checkboxchecking == true) {
        $("#selectallCounterParty").attr('checked', true);
    }
    else {
        $("#selectallCounterParty").attr('checked', false);
    }
    var checkingsdivchild = document.getElementById("liSelectedCounterParty").hasChildNodes();
    if (!checkingsdivchild) {
        if (multipleChecksDocumentID.length > 0) {
            for (var spl = 0; spl < multipleChecksDocumentID.length; spl++) {
                if (multipleChecksDocumentID[spl].trim() != "") {
                    $('#liSelectedCounterParty').append('<span style="font-size:13px;">' + multipleChecksDocumentID[spl].trim() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelectedCouterParty(this);" style="float:right" /></span>');
                }
            }
        }
        //else {
        //    var textvalid = $("#Counterparty").val();
        //    if (typeof textvalid != 'undefined' && textvalid != "") {
        //        var splitmulicheckforbind = textvalid.split(';');
        //        for (var spl = 0; spl < splitmulicheckforbind.length; spl++) {
        //            if (splitmulicheckforbind[spl].trim() != "") {
        //                $('#liSelectedCounterParty').append('<span style="font-size:13px;">' + splitmulicheckforbind[spl] + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelectedCouterParty(this);" style="float:right" /></span>');
        //                multipleChecksDocumentID.push(splitmulicheckforbind[spl].trim());
        //            }
        //        }
        //    }
        //    else {
        //        checkMultipleDocumentsCounterParty("");
        //    }
        //}
    }
    $('#loadGenCounterParty').empty();
}

function funselectallCounterParty(obj) {
    if (obj.checked) { // check select status  
        $('input:checkbox[name=Counterparty]').attr('checked', true);
        checkMultipleDocumentsCounterParty("");
    } else {
        $('input:checkbox[name=Counterparty]').attr('checked', false);

        checkMultipleDocumentsCounterParty("");
    }
}

function checkMultipleDocumentsCounterParty(object) {
    $('#liSelectedCounterParty').empty();
    var checkboxcheck = true;
    $('input[type=checkbox][name="Counterparty"]').each(function () {
        var DocumentID = this.value;
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
        $("#selectallCounterParty").attr('checked', true);
    }
    else {
        $("#selectallCounterParty").attr('checked', false);
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

    // $("#" + child12).attr('checked', false);
    var checkboxcheck = true;
    child.parentNode.removeChild(child);
    $('input[type=checkbox][name="Counterparty"]').each(function () {
        var DocumentID = this.value;
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
        $("#selectallCounterParty").attr('checked', true);
    }
    else {
        $("#selectallCounterParty").attr('checked', false);
    }

}
function SearchCounterparty() {
    $("#tblCounterparties").empty();
    $("#liSelectedCounterParty").empty();
   // multipleChecksDocumentID = [];
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/counterpartypicker?searchkeyword=' + $("#txtSearchBoxCP").val() + '&customquery=&sortbyfield=CounterpartyName&orderby=ASC',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            CounterPartyArrayprev = [];
            //$.each($('#Counterparty').val().split(";"), function () {
            //    CounterPartyArrayprev.push($.trim(this));
            //});
            myCounterPartyArray = [];
            var obj1 = {};
            for (var i = 0; i < data.length; i++) {
                if (!(data[i].CounterpartyName in obj1)) {
                    if (data[i].CounterpartyName.trim() != "") {
                        myCounterPartyArray.push(data[i]);
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

            }
    });

}
function BindContractRelationships() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contractrelationships',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            var options = "";
            if (data == null || data == "") {
                var relationshipType = "Master Agreement-Sub-Agreement/SOW;Prime Contractor Agreement-Sub Contractor Agreement;Blanket Agreement-Order/Invoice;Original-Duplicate/Copy;Past Contract-Renegotiated Contract;Primary Contract-Amendment/Modification;Other";
                var relationship1 = "Master Agreement;Prime Contractor Agreement;Blanket Agreement;Original;Past Contract;Primary Contract;Other";
                var relationship2 = "Sub-Agreement/SOW;Sub Contractor Agreement;Order/Invoice;Duplicate/Copy;Renegotiated Contract;Amendment/Modification;Other";
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/addrelationshipsettings?relationshiptypes=' + relationshipType + '&rel1=' + relationship1 + '&rel2=' + relationship2,
                    type: 'PUT',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                    cache: false,
                    success: function (data) {
                        $(data).each(function (i, item) {

                            var Relationship2 = [];
                            //Get all the relationship2 names
                            $(item.Relationship2).find('RelationshipName').each(function () {
                                var Relationship2each = $(this).text();
                                if (Relationship2each != null && typeof (Relationship2each) != "undefined" && Relationship2each != "")
                                    Relationship2.push(Relationship2each)
                            });
                            RelationshipTypes.push([item.RelationshipType, item.Relationship1, Relationship2]);
                            options += '<option value="' + item.RelationshipType + '">' + item.RelationshipType + '</option>';
                        });
                        $("#ddlRelationshipType").append(options);
                    },
                    error: function (person) {
                        RelationshipTypes = [];
                    }
                });
            }
            else {
                $(data).each(function (i, item) {

                    var Relationship2 = [];
                    //Get all the relationship2 names
                    $(item.Relationship2).find('RelationshipName').each(function () {
                        var Relationship2each = $(this).text();
                        if (Relationship2each != null && typeof (Relationship2each) != "undefined" && Relationship2each != "")
                            Relationship2.push(Relationship2each)
                    });
                    RelationshipTypes.push([item.RelationshipType, item.Relationship1, Relationship2]);
                    options += '<option value="' + item.RelationshipType + '">' + item.RelationshipType + '</option>';
                });
                $("#ddlRelationshipType").append(options);
            }
        },
        error: function (data) {
            var options = "";
            var relationshipType = "Master Agreement-Sub-Agreement/SOW;Prime Contractor Agreement-Sub Contractor Agreement;Blanket Agreement-Order/Invoice;Original-Duplicate/Copy;Past Contract-Renegotiated Contract;Primary Contract-Amendment/Modification;Other";
            var relationship1 = "Master Agreement;Prime Contractor Agreement;Blanket Agreement;Original;Past Contract;Primary Contract;Other";
            var relationship2 = "Sub-Agreement/SOW;Sub Contractor Agreement;Order/Invoice;Duplicate/Copy;Renegotiated Contract;Amendment/Modification;Other";
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/addrelationshipsettings?relationshiptypes=' + relationshipType + '&rel1=' + relationship1 + '&rel2=' + relationship2,
                type: 'PUT',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                cache: false,
                success: function (data) {
                    $(data).each(function (i, item) {

                        var Relationship2 = [];
                        //Get all the relationship2 names
                        $(item.Relationship2).find('RelationshipName').each(function () {
                            var Relationship2each = $(this).text();
                            if (Relationship2each != null && typeof (Relationship2each) != "undefined" && Relationship2each != "")
                                Relationship2.push(Relationship2each)
                        });
                        RelationshipTypes.push([item.RelationshipType, item.Relationship1, Relationship2]);
                        options += '<option value="' + item.RelationshipType + '">' + item.RelationshipType + '</option>';
                    });
                    $("#ddlRelationshipType").append(options);
                },
                error: function (person) {
                    RelationshipTypes = [];
                }
            });
        }
    });
}