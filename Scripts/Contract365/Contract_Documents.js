﻿/// <reference path="Settings_DocumentTypes.js" />
//Script for Filter Start
var strFinalizedDocumentsUrl = "";
var strContractDocumentsUrl = "";
var strDraftDocumentsUrl = "";
var SaveDraftInCloud = "";
var SaveFinalInCloud = "";
var AllowSaveDraftInCloud = "";
var vFinalSignature = "myMenu";
var vMarkFinalSignature = "myMenuFinal";
var listDocuments = [];
var previousidcreate = "";
var v_isSearchFunction;
var v_isShowAllDocFunction;
var v_filterButtonClicked;
var workflowurltoshow = "";
var selecteditems = [];
var thisBusinessAreaName = "";
var thisContractAreaName = "";
var thisBusinessAreaNameC = "";
var thisContractAreaNameC = "";
var thisBusinessAreaNameRowKey = "";
var thisContractAreaNameRowKey = "";
var thisContractAreaSettings = [];
var vCurrencyDisplayStyle = "";
var blIsBusinessArea = false;
var blGlobalContractArea = "";
var vGlobalObjForGeneric = "";
var fileurldetails = "";
var multipleChecks = "";
var multipleChecksurl = "";
var Folderselection = "";
var PrvRelatedCounterparities = [];
var arrRelatedCounterparities = [];
var curRelatedCounterparities = [];
var multipleChecksDocumentID = [];
var myArrayRU = [];
var arrprevRU = [];
var myCounterPartyArray = [];
var CounterPartyArrayprev = [];
var multipleChecksDocumentIDd = [];
var defaultglobalsetting = [];
var bindconarea = false;
//Related Contract
var selecteddocumententity;
var addbuttonclick = false;
var ReplaceDocClick = false;
var arrRelatedcontractRowkey = [];
var RelatedContractRelationShipTypeparent = "";
var oldRelatedcontract = '';
var SavedRelatedContract = [];
var arroldRelatedcontract = [];
var thisBusinessAreaPath = '';
var arrRelatedContracts = [];
//Related Contract
var vProviderDocSign = '';
var RightSignatureFlag = false;
var vURLDoc = "";
var vRawURLDoc = "";
var settings = {
    pattern: /\.[0-9a-z]+$/i,
    knownFileTypes: ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'zip', 'rar', 'gzip', 'arj', 'wav', 'mp3', 'aif', 'aiff', 'm4a', 'ogg', 'wma', 'psd', 'ai', 'swf', 'fla', 'css', 'js', 'avi', 'mov', 'wmv', 'dotx'],
    WopiFrameFileTypes: ['doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx', 'dotx']
};
var txtbindcounetrparty = "";
var Documentuploadnormally = false;
var documenturlforfolder = "";
var contractItemrec = "";
var contractItem = "";
var ContractID = getParameterByName('ContractID');
var RelationshipTypes = [];
var OlRelatedContracts = [];
var hashtable = {};
var IsDropDownsEmpty = true;
var CompanyProfile = "";

var rowCounter = 0;
var metadataLookUp = [];
var currentAutoCompleteUiObj = {}
var peoples = [];
var currentadvanceViewObj = "";
var quickViews = {
    quickView: [
                { name: "Signed", defaultQuery: "<filters><filter><isEnabled>Yes</isEnabled><condition>default</condition><metadataname>Status</metadataname><metadatavalue>Status</metadatavalue><metadatatype>Custom Lookup</metadatatype><operator>like</operator><value>Ready for Signature;Awaiting Signatures;Signed</value></filter></filters>" },
                { name: "Active", defaultQuery: "<filters><filter><isEnabled>Yes</isEnabled><condition>default</condition><metadataname>Status</metadataname><metadatavalue>Status</metadatavalue><metadatatype>Custom Lookup</metadatatype><operator>like</operator><value>Active;Up for Renewal;About to Expire</value></filter></filters>" },
                { name: "Upcoming Renewals", defaultQuery: "<filters><filter><isEnabled>Yes</isEnabled><condition>default</condition><metadataname>Status</metadataname><metadatavalue>Status</metadatavalue><metadatatype>Custom Lookup</metadatatype><operator>eq</operator><value>Up for Renewal</value></filter></filters>" },
                { name: "Upcoming Expirations", defaultQuery: "<filters><filter><isEnabled>Yes</isEnabled><condition>default</condition><metadataname>Status</metadataname><metadatavalue>Status</metadatavalue><metadatatype>Custom Lookup</metadatatype><operator>eq</operator><value>About to Expire</value></filter></filters>" },
                { name: "OwnedByMe", defaultQuery: "<filters><filter><isEnabled>Yes</isEnabled><condition>default</condition><metadataname>Contract Owner(s)</metadataname><metadatavalue>ContractManagers</metadatavalue><metadatatype>User</metadatatype><operator>eq</operator><value></value></filter></filters>" },
                { name: "CreatedByMe", defaultQuery: "<filters><filter><isEnabled>Yes</isEnabled><condition>default</condition><metadataname>Created By</metadataname><metadatavalue>CreatedBy</metadatavalue><metadatatype>Single Line Text</metadatatype><operator>eq</operator><value></value></filter></filters>" },
                { name: "Past Contracts", defaultQuery: "<filters><filter><isEnabled>Yes</isEnabled><condition>default</condition><metadataname>Status</metadataname><metadatavalue>Status</metadatavalue><metadatatype>Custom Lookup</metadatatype><operator>like</operator><value>On Hold;Replaced;Expired;Cancelled;Archived</value></filter></filters>" }
    ]
};
var listDocumentTypes = [];


$(function () {
    $("#aSearchDocument").css("background-color", "#f7f7f7");
    if (getParameterByName('Type') == 'pipeline') {
        $("#heading_documents").text("Pipeline")
    } else {
        $("#heading_documents").text("Contract Documents")
    }

    allowOnlyNumberInInputBox('txtReminder1');
    allowOnlyNumberInInputBox('txtReminder2');
    allowOnlyNumberInInputBox('txtReminder3');
    allowOnlyNumberInInputBox('txtReminder1Edit');
    allowOnlyNumberInInputBox('txtReminder2Edit');
    allowOnlyNumberInInputBox('txtReminder3Edit');
    allowOnlyNumberInInputBox("txtShareExpIn");
    allowOnlyNumberInInputBox("txtDuration");

    getCurrencyDisplayStyle();

    if (typeof localStorage.GlobalBusinessAreaLocation != 'undefined') {
        if (localStorage.GlobalBusinessAreaLocation == "All") {
            $("#heading_contracts").text("Contract Records")
            $(".newContract1").css('display', 'none');
            $(".newContract").css('display', '');
            $("#newDocument").css('display', '');
            thisBusinessAreaNameC = "";
            thisContractAreaNameC = "";
            thisBusinessAreaPath = "";
        } else {
            $(".newContract").css('display', 'none');
            if (localStorage.BusinessAreaAccess.indexOf(localStorage.GlobalBusinessAreaLocation) >= 0 || localStorage.UserType.indexOf("Global Contract Owner") >= 0 || localStorage.IsGeneralBusinessArea == "Yes") {
                $(".newContract1").css('display', '');
            } else { $(".newContract1").css('display', 'none'); $(".newContract").css('display', 'none'); }
            thisContractAreaName = localStorage.GlobalBusinessAreaLocation.split('>')[0].trim();
            thisBusinessAreaName = localStorage.GlobalBusinessArea + ';' + localStorage.GlobalBusinessAreaLocation.split('>')[0].trim();
            thisContractAreaNameC = localStorage.GlobalBusinessAreaLocation.split('>')[0].trim();
            thisBusinessAreaNameC = localStorage.GlobalBusinessArea;
            $('#txtContractAreaName').val(thisContractAreaName);
            $("#txtBusinessArea").val(localStorage.GlobalBusinessArea);
            $("#txtBusinessAreaPath").val(localStorage.GlobalBusinessAreaLocation);
            $("#spBusinessArea").css('display', 'none');
            thisBusinessAreaPath = localStorage.GlobalBusinessAreaLocation;
            $("#dashmain").attr("src", "/Content/images/icon/gen.png");
            $("#heading_contracts").text(localStorage.GlobalBusinessAreaLocation);

            if (localStorage.BusinessAreaAccess.indexOf(localStorage.GlobalBusinessAreaLocation) >= 0 || localStorage.UserType.indexOf("Global Contract Owner") >= 0 || localStorage.IsGeneralBusinessArea == "Yes") {
                $("#newDocument").css('display', '');
                $(".newCont").css('display', '');
                if (thisContractAreaName != "") {
                    //Get contract area settings
                    getcontractareasettings(thisContractAreaName);
                }
            }
            else {
                $(".newCont").css('display', 'none');
            }
        }
    } else {
        $("#newDocument").css('display', '');
        $(".newContract1").css('display', 'none');
        $(".newContract").css('display', '');
    }
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "1" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        vFinalSignature = "myMenuSignature";
        vMarkFinalSignature = "myMenuFinalSignature";
    }
    vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "4" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        $("#li_bulkUpload").css("display", "");
        $("#btnAddDocument1").css("display", "");
        $("#btnAddDocument2").css("display", "none");
    } else {
        $("#li_bulkUpload").css("display", "none");
        $("#btnAddDocument1").css("display", "none");
        $("#btnAddDocument2").css("display", "");
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
    vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "6" && n.Status == "ON");
    });
    if (vAccFeat.length == 0) {
        $("#spCounterpartyCreate").css("display", "none");
        $("#txtCounterpartyCreate").prop("readonly", false);
    }


    $("#browseBA").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        height: "auto",
        title: "auto",
        modal: true,
        buttons: {
            "OK": function () {
                if ($('#liSelectedBA span').length > 0) {
                    $("#tblContractsTodo").empty();
                    $('#txtBARowkey').val(treeBusinessAreaRowKey);
                    $('#txtBAParent').val(treeBusinessAreaParentBusinessAreaID);
                    $('#txtBA').val(treeBusinessAreaName);
                    $('#txtContractAreaName').val(treeBusinessAreaContractAreaName);
                    $('#txtContractAreaAdministrators').val(treeBusinessAreaContractAreaNameOwner);
                    $('#txtBusinessAreaOwners').val(treeBusinessAreaOwner);

                    $("#loadingPage").fadeIn();
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/businessarealocation?businessareaid=' + treeBusinessAreaRowKey,
                        type: 'GET',
                        dataType: 'json',
                        headers: { 'eContracts-ApiKey': localStorage.APIKey },
                        success: function (fullhierarchy) {
                            $("#txtBusinessAreaPath").val(fullhierarchy);
                            $("#loadingPage").fadeOut();
                        },
                        error: function (fullhierarchy) {
                            $("#loadingPage").fadeOut();

                        }
                    });

                    $("#txtCounterpartyCreate").val("");
                    $("#txtContractRecElement").val("");
                    $("#txtContractRecElementID").val("");
                    $("#txtBusinessArea").val("");

                    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                    var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                        return (n.RowKey == "6" && n.Status == "ON");
                    });
                    if (vAccFeat.length == 0) {
                        $("#spCounterpartyCreate").css("display", "none");
                        $("#txtCounterpartyCreate").prop("readonly", false);
                    }
                    else {
                        if (!bindconarea && ($("#txtContractRecElement").val() == "")) {
                            $("#spCounterpartyCreate").css("display", "");
                        }
                    }

                    var str = $('#txtBA').val();
                    var strReplaced = str.replace(/\,/g, ';');
                    $('#txtBusinessArea').val(strReplaced);
                    $('#txtBusinessAreaEdit').val(strReplaced);
                    $(this).dialog("close");
                    getcontractareasettings(treeBusinessAreaContractAreaName);
                }
                else {
                    swal("", "Select Business Area");
                }
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
    //suren
    //For alert message
    $("#dvAlertDetails1").dialog({
        autoOpen: false,
        closeText: "",
        width: "45%",
        title: "Alert",
        modal: true,

    });
    //end
    //suren
    $("#treeviewFolderMove").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        height: 500,
        title: "Select Folder",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "OK": function () { selectfolderselection(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
    $("#popupContracts").dialog({
        autoOpen: false,
        closeText: "",
        width: "85%",
        height: "auto",
        title: "Related Contract Record(s)",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "OK": function () { RelatedContractsPush(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#browseProjects").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Project",
        modal: true,
        buttons: {
            "OK": function () {
                var s = AddProject();
                $(this).dialog("close");
                $("#txtSearchBoxProjects").val("");
            },
            Cancel: function () {
                arrRelatedCounterparities = [];
                $(this).dialog("close");
                $("#txtSearchBoxProjects").val("");
            }
        }
    });

    $("#browseProjectTasks").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Project Tasks",
        modal: true,
        buttons: {
            "OK": function () {
                var s = AddProjectTask();
                $(this).dialog("close");
                $("#txtSearchBoxProjectTasks").val("");
            },
            "Clear": function () {
                $('#txtSearchBoxProjectTasks').val('');
                $('input:checkbox[name=ProjectTask]').attr('checked', false);
                $("#ProjectTask").val("");
            },
            Cancel: function () {
                $(this).dialog("close");
                $("#txtSearchBoxProjectTasks").val("");
                $('input:checkbox[name=ProjectTask]').attr('checked', false);
            }
        }
    });

    $("#browseRequest").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Contract",
        modal: true,
        buttons: {
            "OK": function () {
                var s = AddRequest();
                $(this).dialog("close"); $("#txtSearchBoxRequest").val("");
            },
            Cancel: function () {
                $(this).dialog("close");
                $("#txtSearchBoxRequest").val("");
            }
        }
    });

    //manoj
    //JqTree Folder Structure
    $("#treeviewFolder").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        height: 500,
        title: "Select Folder",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "OK": function () { selectfolder(); },
            Cancel: function () {
                fileurldetails = "";
                $(this).dialog("close");
            }
        }
    });
    //JqTree Folder Structure
    //manoj

    //BindDocumentTypeandTemplateGeneral();

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
    BindContractRelationships();
    getDocumentTypes();
    getContract(ContractID);
});

$("#SelectAll").hide();
$("#SelectAllSpan").hide();
$('#SelectAll').attr('checked', false);

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function CheckSignature() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/feature?featureid=1',
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        processData: false,
        success: function (data) {
            if (data.Status == "ON") {
                vFinalSignature = "myMenuSignature";
                vMarkFinalSignature = "myMenuFinalSignature";
            }
        },
        error: function () {

        }

    });
}

function CheckBulkUpload() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/feature?featureid=4',
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        processData: false,
        success: function (data) {
            if (data.Status == "ON") {
                $("#li_bulkUpload").css("display", "");
                $("#bulkUpload").css("display", "");
            }
        },
        error: function () {

        }

    });
}
var qvName = "";
function savedViewDisplay(obj) {
    $('#txtSearchBox').val('');
    if ($(obj).attr('data-isadvance') != 'Yes') {
        colorLink('liDocumentViews a', false); colorLink('liDocumentViews a', false);
        colorLink('liDocumentViews span', false);
        colorLink('liQuickView a', false);
        colorLink('liQuickView span', false);
        colorLink('spnAllDocuments', false); colorLink('spnAllDocuments', false);
        colorLink('spnFinalizedDocuments', false); colorLink('spnFinalizedDocuments', false);
        colorLink('spnDraftDocuments', false); colorLink('spnDraftDocuments', false);
        colorLink('spnNotTagged', false); colorLink('spnNotTagged', false);
        $("#liFiltersSearchText").empty();
        $("#liFiltersDocumentType").empty();
        $("#liFiltersLibraryName").empty();
        $("#liFiltersCreationMode").empty();
        $("#showAll").css('display', 'none'); $("#showAll").css('display', 'none');
        $("#txtSearchBox").attr("placeholder", "Search in '" + obj.innerText + "'");
        colorLink(obj.id, true);
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/savedview?viewid=' + obj.id,
            type: 'GET',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            "Content-Type": "application/json",
            cache: false,
            success: function (savedviewentity) {
                $("#filterDocumentType option:selected").prop('selected', false);
                $("#filterLibraryName option:selected").prop('selected', false);
                $("#filterCreationMode option:selected").prop('selected', false);

                selectedSortOption = savedviewentity.SortBy;
                $("#conSortByOptions").val(selectedSortOption)
                $("#conSortByOptions").prop('disabled', true).niceSelect('update');
                $.each(savedviewentity.ViewQuery.split(';'), function (index, value) {

                    var valdoctype = value.split(',');
                    if (value.split(":")[0] == "DocumentType") {
                        var valdoctypelength = valdoctype.length;
                        for (var i = 0; i < valdoctypelength; i++) {
                            var valuedoctype = valdoctype[i].split(':');
                            $("#filterDocumentType option[value='" + valuedoctype[1] + "']").prop("selected", true);
                            $('#liFiltersDocumentType').append('<span><small>' + valuedoctype[1] + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
                        }
                    } else if (value.split(":")[0] == "CreationMode") {
                        var valdoctypelength = valdoctype.length;
                        for (var i = 0; i < valdoctypelength; i++) {
                            var valuedoctype = valdoctype[i].split(':');
                            $("#filterCreationMode option[value='" + valuedoctype[1] + "']").prop("selected", true);
                            $('#liFiltersCreationMode').append('<span><small>' + valuedoctype[1] + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
                        }
                    }

                });
                savedViewapplyFilter(savedviewentity.ViewQuery);
                $("#btnAddView").css('display', 'none');
            }
        });
    }
    else {
        colorLink('liContractViews a', false);
        $('#liFiltersQuickView').empty();
        colorLink('liQuickView span', false);
        colorLink('liContractViews span', false);
        colorLink('liQuickView a', false);
        //colorLink(obj.id, true);
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
                    var filterHtml = "";
                    var metadatatype = "";
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
                                filterHtml += ' <span><small>' + condition + '</small></span>' + ' <span><small >' + metadata + ' ' + operator + ' ' + value + '</small></span>';
                            else
                                filterHtml += '<span><small >' + condition + '</small></span>' + '<span><small >' + metadata + ' ' + operator + '</small></span>';
                        }
                    });

                    $("#spResult").empty();
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
                    colorLink('liContractViews a', false);
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
                    $("#liFiltersCreationMode").empty();
                    $("#liFiltersLibraryName").empty();
                    $("#liFiltersDocumentType").empty();
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
                        case "Recently Created":
                            sortby = '&sortbyfield=Created&orderby=DESC';
                            break;
                        case "Title(A-Z)":
                            sortby = '&sortbyfield=DocumentName&orderby=ASC';
                            break;
                        case "Title(Z-A)":
                            sortby = '&sortbyfield=DocumentName&orderby=DESC';
                            break;
                        case "Last Modified by Me":
                            sortby = '&sortbyfield=ModifiedBy&orderby=DESC';
                            break;
                        default:
                            sortby = '&sortbyfield=Timestamp&orderby=DESC';
                            break;
                    }
                    if (typeof currentadvanceViewObj.SortBy != 'undefined') {
                        var orderBy = currentadvanceViewObj.SortBy.split('~')[1];
                        if (typeof orderBy != 'undefined' && sortby.indexOf('DocumentName') == -1) {
                            sortby = sortby.substr(0, sortby.lastIndexOf('&'));
                            sortby = sortby + '&orderby=' + orderBy;
                        }
                    }
                    var baname = ";";
                    if (thisBusinessAreaName == "" || thisBusinessAreaName == "All") {
                    } else {
                        baname = thisBusinessAreaName;
                    }
                    var baloc = "";
                    if (typeof localStorage.GlobalBusinessAreaLocation != 'undefined' && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
                        baloc = encodeURIComponent(localStorage.GlobalBusinessAreaLocation);
                    }
                    newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/GetAdvanceViewRecords?BusinessAreaPath=' + baloc + '&stage=active&filterXml=' + viewQueryXml + sortby + "&viewName=" + qvName + '&searchkeyword=' + encodeURIComponent($("#txtSearchBox").val()) + "&type=" + getParameterByName("Type");
                    $('#listDocuments').html('<img src="../Content/Images/icon/loading.gif">');
                    $.ajax({
                        url: newurl,
                        type: 'GET',
                        dataType: 'json',
                        'Content-Type': 'application/json',
                        cache: false,
                        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessAreaLocation: localStorage.GlobalBusinessAreaLocation },
                        success: function (data) {
                            $("#compact-pagination").css('display', '');
                            $('#listDocuments').empty();
                            GetData(data);
                        },
                        error:
                            function (data) {
                                $("#listDocuments").empty();
                                $("#listDocuments").append("<p class='f_p-error'>No items found.</p>");
                                $("#compact-pagination").css('display', 'none');
                                $("#divChkSelectAll").css('display', 'none');
                            }
                    });
                    $("#dvfilter").hide();
                    $("#liAdvanceViewFilter").html(filterHtml + '<a style="float:right;" href="javascript:void(0)" onclick="editAdvanceView()">Edit View</a>');
                }
            }
        });
    }
}

//manoj
function savedViewDisplaywithSearch(obj) {
    if ($(obj).attr('data-isadvance') != 'Yes') {
        colorLink('liDocumentViews a', false); colorLink('liDocumentViews a', false);
        colorLink('liDocumentViews span', false);
        colorLink('liQuickView a', false);
        colorLink('liQuickView span', false);
        colorLink('spnAllDocuments', false); colorLink('spnAllDocuments', false);
        colorLink('spnFinalizedDocuments', false); colorLink('spnFinalizedDocuments', false);
        colorLink('spnDraftDocuments', false); colorLink('spnDraftDocuments', false);
        colorLink('spnNotTagged', false); colorLink('spnNotTagged', false);
        $("#liFiltersSearchText").empty();
        $("#liFiltersDocumentType").empty();
        $("#liFiltersLibraryName").empty();
        $("#liFiltersCreationMode").empty();
        $("#showAll").css('display', 'none'); $("#showAll").css('display', 'none');
        $("#txtSearchBox").attr("placeholder", "Search in '" + obj.innerText + "'");
        colorLink(obj.id, true);
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/savedview?viewid=' + obj.id,
            type: 'GET',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            "Content-Type": "application/json",
            cache: false,
            success: function (savedviewentity) {
                $("#filterDocumentType option:selected").prop('selected', false);
                $("#filterLibraryName option:selected").prop('selected', false);
                $("#filterCreationMode option:selected").prop('selected', false);

                $.each(savedviewentity.ViewQuery.split(';'), function (index, value) {

                    var valdoctype = value.split(',');
                    if (value.split(":")[0] == "DocumentType") {
                        var valdoctypelength = valdoctype.length;
                        for (var i = 0; i < valdoctypelength; i++) {
                            var valuedoctype = valdoctype[i].split(':');
                            $("#filterDocumentType option[value='" + valuedoctype[1] + "']").prop("selected", true);
                            $('#liFiltersDocumentType').append('<span><small>' + valuedoctype[1] + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
                        }
                    } else if (value.split(":")[0] == "CreationMode") {
                        var valdoctypelength = valdoctype.length;
                        for (var i = 0; i < valdoctypelength; i++) {
                            var valuedoctype = valdoctype[i].split(':');
                            $("#filterCreationMode option[value='" + valuedoctype[1] + "']").prop("selected", true);
                            $('#liFiltersCreationMode').append('<span><small>' + valuedoctype[1] + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
                        }
                    }

                });
                savedViewapplyFilter(savedviewentity.ViewQuery);
                $("#btnAddView").css('display', 'none');
            }
        });
    }
    else {
        colorLink('liContractViews a', false);
        $('#liFiltersQuickView').empty();
        colorLink('liQuickView span', false);
        colorLink('liContractViews span', false);
        colorLink('liQuickView a', false);
        //colorLink(obj.id, true);
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
                    var filterHtml = "";
                    var metadatatype = "";
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
                                filterHtml += ' <span><small>' + condition + '</small></span>' + ' <span><small >' + metadata + ' ' + operator + ' ' + value + '</small></span>';
                            else
                                filterHtml += '<span><small >' + condition + '</small></span>' + '<span><small >' + metadata + ' ' + operator + '</small></span>';
                        }
                    });

                    $("#spResult").empty();
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
                    colorLink('liContractViews a', false);
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
                    $("#liFiltersCreationMode").empty();
                    $("#liFiltersLibraryName").empty();
                    $("#liFiltersDocumentType").empty();
                    $("#liAdvanceViewFilter").empty();
                    var newurl = "";
                    var sortby = "&sortbyfield=Timestamp&orderby=DESC";
                    if (typeof currentadvanceViewObj.SortBy != 'undefined') {
                        selectedSortOption = currentadvanceViewObj.SortBy.split('~')[0];
                    }
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
                            sortby = '&sortbyfield=DocumentName&orderby=ASC';
                            break;
                        case "Title(Z-A)":
                            sortby = '&sortbyfield=DocumentName&orderby=DESC';
                            break;
                        case "Last Modified by Me":
                            sortby = '&sortbyfield=ModifiedBy&orderby=DESC';
                            break;
                        default:
                            sortby = '&sortbyfield=Timestamp&orderby=DESC';
                            break;
                    }
                    if (typeof currentadvanceViewObj.SortBy != 'undefined') {
                        var orderBy = currentadvanceViewObj.SortBy.split('~')[1];
                        if (typeof orderBy != 'undefined' && sortby.indexOf('DocumentName') == -1) {
                            sortby = sortby.substr(0, sortby.lastIndexOf('&'));
                            sortby = sortby + '&orderby=' + orderBy;
                        }
                    }
                    var baname = ";";
                    if (thisBusinessAreaName == "" || thisBusinessAreaName == "All") {
                    } else {
                        baname = thisBusinessAreaName;
                    }
                    var baloc = "";
                    if (typeof localStorage.GlobalBusinessAreaLocation != 'undefined' && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
                        baloc = encodeURIComponent(localStorage.GlobalBusinessAreaLocation);
                    }
                    newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/GetAdvanceViewRecords?BusinessAreaPath=' + baloc + '&stage=active&filterXml=' + viewQueryXml + sortby + "&viewName=" + qvName + '&searchkeyword=' + encodeURIComponent($("#txtSearchBox").val());
                    $('#listDocuments').html('<img src="../Content/Images/icon/loading.gif">');
                    $.ajax({
                        url: newurl,
                        type: 'GET',
                        dataType: 'json',
                        'Content-Type': 'application/json',
                        cache: false,
                        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessAreaLocation: localStorage.GlobalBusinessAreaLocation },
                        success: function (data) {
                            $("#compact-pagination").css('display', '');
                            $('#listDocuments').empty();
                            GetData(data);
                        },
                        error:
                            function (data) {
                                $("#listDocuments").empty();
                                $("#listDocuments").append("<p class='f_p-error'>No items found.</p>");
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
                        $('#liFiltersSearchText').append('<span><small>Showing search result for : ' + txtsearchboxvalue + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
                    }
                    //manoj
                }
            }
        });
    }
}
//manoj

function clearSelection() {
    //showalldocuments();
    showClearalldocuments();
    $("#dvfilter").hide();
}

function applyFilter(sortByOptions, sortDirection) {
    if ($("#filterDocumentType :selected").length > 10) {
        swal("", "Select upto 10.");
    }
    else {
        //filterButtonClicked = filterButtonClicked || false;

        //manoj
        var allowcustomsearch = false;
        //if (savedViewNameFromViewTable != "") {
        var CustomUl = $("#liDocumentViews");
        TriggerChild = $(CustomUl).find(".active_quick_view");
        if (typeof TriggerChild != 'undefined' && TriggerChild != null && TriggerChild != "" && TriggerChild.length > 0) {
            savedViewDisplaywithSearch(TriggerChild[0]);
            allowcustomsearch = true;
        }
        //}

        if (!allowcustomsearch) {
            $('#menu4').hide();
            $("#showAll").css('display', 'none');
            $("#liFiltersSearchText").empty();
            $("#liFiltersDocumentType").empty();
            $("#liFiltersLibraryName").empty();
            $("#liFiltersCreationMode").empty();
            $("#liAdvanceViewFilter").empty();

            $("#launcher4").css('display', '');
            $("#divSearch").css('display', '');
            $("#btnFilter").css('display', '');
            //$("#btnAddView").css('display', 'block');
            var txtsearchboxvalue = $.trim($('#txtSearchBox').val());
            var searchParentFloder = true;
            if (txtsearchboxvalue != "" && txtsearchboxvalue != null) {
                searchParentFloder = false;
                $('#liFiltersSearchText').append('<span><small>Showing search result for : ' + txtsearchboxvalue + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
            }
            var customQuery1 = "DocumentType:";
            var isContainingAll1 = false;
            var isAnySelected1 = false;
            $('#filterDocumentType :selected').each(function (i, selected) {
                isAnySelected1 = true;
                if ($(selected).text() == "All")
                    isContainingAll1 = true;

                $('#liFiltersDocumentType').append('<span><small>' + $(selected).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
                customQuery1 += ',' + $(selected).text();

            });
            if (!isAnySelected1) {
                customQuery1 = "";
            }
            if (isContainingAll1) {
                $("#liFiltersDocumentType").empty();
                customQuery1 = "";
            }

            var customQuery2 = '';// ";DocumentLibraryName:Finalized Documents";
            var isContainingAll2 = false;
            var isAnySelected2 = false;
            $('#filterLibraryName :selected').each(function (i, selected) {
                isAnySelected2 = true;
                if ($(selected).text() == "All")
                    isContainingAll2 = true;

                $('#liFiltersLibraryName').append('<span><small>' + $(selected).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
                customQuery2 += ',' + $(selected).text();
            });
            if (!isAnySelected2) {
                customQuery2 = "";
            }

            var customQuery3 = ";CreationMode:";
            var isContainingAll3 = false;
            var isAnySelected3 = false;
            $('#filterCreationMode :selected').each(function (i, selected) {
                isAnySelected3 = true;
                if ($(selected).text() == "All")
                    isContainingAll3 = true;
                $('#liFiltersCreationMode').append('<span><small>' + $(selected).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
                customQuery3 += ',' + $(selected).text();
            });
            if (!isAnySelected3) {
                customQuery3 = "";
            }
            if (isContainingAll3) {
                $("#liFiltersCreationMode").empty();
                customQuery3 = "";
            }

            var vIsShowAllDoc = false;
            if (isContainingAll1 && isContainingAll2 && isContainingAll3) {
                $("#showAll").css('display', 'inline');
                vIsShowAllDoc = true;
            }

            if (!isAnySelected1 && !isAnySelected2) {

            }
            if ((!isAnySelected1 || isContainingAll1) && (!isAnySelected3 || isContainingAll3)) {
                $("#btnAddView").css('display', 'none');
            }
            $("#listDocuments").empty();
            var defOrdByRecUptd = 'DESC';
            var defOrdByRecCrt = 'DESC';

            var sortby = "&sortbyfield=Timestamp&orderby=DESC";
            if (typeof sortByOptions != 'undefined' && sortByOptions != "") {
                selectedSortOption = sortByOptions;
            }
            switch (selectedSortOption) {
                case "Recently Updated":
                    if (typeof sortDirection != 'undefined' && sortDirection != "")
                        defOrdByRecUptd = sortDirection;
                    sortby = '&sortbyfield=Timestamp&orderby=' + defOrdByRecUptd;
                    break;
                case "Recently Created":
                    if (typeof sortDirection != 'undefined' && sortDirection != "")
                        defOrdByRecCrt = sortDirection;
                    sortby = '&sortbyfield=Created&orderby=DESC';
                    break;
                default:
                    sortby = '&sortbyfield=Timestamp&orderby=DESC';
                    $("#conSortDirection").attr("data-direction", 'ASC');
                    $("#conSortDirection").attr("src", '/Content/Images/down-arrow_1.png');
                    break;
            }
            var baname = "";
            if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
                baname = encodeURIComponent(localStorage.GlobalBusinessAreaLocation);
            }

            var newurl = "";
            if ($("#spnAllDocuments").hasClass("active_quick_view")) {
                $("#txtSearchBox").attr("placeholder", "Search in '" + $("#spnAllDocuments").text() + "'");
                if (searchParentFloder == true && (customQuery1 != "" || customQuery2 != "" || customQuery3 != "")) {
                    searchParentFloder = false;
                }
                newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?showparent=' + searchParentFloder + '&searchkeyword=' + encodeURIComponent($.trim($('#txtSearchBox').val())) + '&customquery=' + customQuery1 + customQuery2 + customQuery3 + sortby + "&type=" + getParameterByName("Type");
            } else if ($("#spnFinalizedDocuments").hasClass("active_quick_view")) {
                if (customQuery1 == "" && customQuery2 == "" && customQuery3 == "") {
                    var customquery4 = "IsFolder:False;IsFinalized:Yes";
                    newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?showparent=false&searchkeyword=' + encodeURIComponent($.trim($('#txtSearchBox').val())) + '&customquery=' + customquery4 + '&sortbyfield=Timestamp&orderby=DESC' + "&type=" + getParameterByName("Type");
                } else {
                    newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?showparent=false&searchkeyword=' + encodeURIComponent($.trim($('#txtSearchBox').val())) + '&customquery=' + customQuery1 + customQuery2 + customQuery3 + ";IsFolder:False;IsFinalized:Yes" + sortby + "&type=" + getParameterByName("Type");
                }
                $("#txtSearchBox").attr("placeholder", "Search in '" + $("#spnFinalizedDocuments").text() + "'");
            } else if ($("#spnDraftDocuments").hasClass("active_quick_view")) {
                if (customQuery1 == "" && customQuery2 == "" && customQuery3 == "") {
                    var customquery4 = "IsFolder:False;IsFinalized:No";
                    newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?showparent=false&searchkeyword=' + encodeURIComponent($.trim($('#txtSearchBox').val())) + '&customquery=' + customquery4 + '&sortbyfield=Timestamp&orderby=DESC' + "&type=" + getParameterByName("Type");
                } else {
                    newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?showparent=false&searchkeyword=' + encodeURIComponent($.trim($('#txtSearchBox').val())) + '&customquery=' + customQuery1 + customQuery2 + customQuery3 + ";IsFolder:False;IsFinalized:No" + sortby + "&type=" + getParameterByName("Type");
                }
                $("#txtSearchBox").attr("placeholder", "Search in '" + $("#spnDraftDocuments").text() + "'");
            } else if ($("#spnNotTagged").hasClass("active_quick_view")) {
                newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?showparent=false&searchkeyword=' + encodeURIComponent($.trim($('#txtSearchBox').val())) + '&customquery=' + customQuery1 + customQuery2 + customQuery3 + ";ContractID:;IsFolder:False" + sortby + "&type=nottagged";
                $("#txtSearchBox").attr("placeholder", "Search in '" + $("#spnNotTagged").text() + "'");
            }
            else {
                colorLink('liDocumentViews a', false);
                colorLink('liDocumentViews span', false);
                colorLink('liQuickView a', false);
                colorLink('liQuickView span', false);
                colorLink('spnAllDocuments', true);
                newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?showparent=true&searchkeyword=' + encodeURIComponent($.trim($('#txtSearchBox').val())) + '&customquery=' + customQuery1 + customQuery2 + customQuery3 + sortby + "&type=" + getParameterByName("Type");
                $("#txtSearchBox").attr("placeholder", "Search in '" + $("#spnAllDocuments").text() + "'");
            }

            if (newurl == "") {
                newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?showparent=true&searchkeyword=&customquery=' + sortby + "&type=" + getParameterByName("Type");
            }

            $('#listDocuments').html('<img class="f_p-error" src="../Content/Images/icon/loading.gif">');
            $.ajax({
                url: newurl,
                type: 'GET',
                dataType: 'json',
                'Content-Type': 'application/json',
                cache: false,
                headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessAreaLocation: localStorage.GlobalBusinessAreaLocation },
                success: function (data) {
                    if (data.length == 0) {
                        $("#listDocuments").empty();
                        $("#listDocuments").append('<p class="f_p-error">No items found.</p>');
                        $("#compact-pagination").css('display', 'none');
                        $("#SelectAll").hide();
                        $("#SelectAllSpan").hide();
                        $('#SelectAll').attr('checked', false);
                    } else {
                        $("#compact-pagination").css('display', '');
                        $('#listDocuments').empty();
                        if (customQuery1 == "" && customQuery2 == "" && customQuery3 == "") {
                            GenerateListOfDocuments(data, false, true);
                        } else {
                            GenerateListOfDocuments(data, false, false, true);
                        }
                        showQuickViewFilter(qvName);
                    }
                },
                error:
                    function (data) {
                        $("#listDocuments").empty();
                        $("#listDocuments").append('<p class="f_p-error">No items found.</p>');
                        $("#compact-pagination").css('display', 'none');
                        $("#divChkSelectAll").css('display', 'none');
                    }
            });
            $("#dvfilter").hide();
        }
    }
}
function GenerateListOfDocuments(data, isSearchFunction, isShowAllDocFunction, filterButtonClicked) {
    filterButtonClicked = filterButtonClicked || false;
    var resultfound = true;
    listDocuments = data;
    if (listDocuments.length > 20) {
        $("#footerPage").css('display', '');
    } else {
        $("#footerPage").css('display', 'none');
    }
    v_isSearchFunction = isSearchFunction;
    v_isShowAllDocFunction = isShowAllDocFunction;
    v_filterButtonClicked = filterButtonClicked;
    CreateDocumentList(0);

    $('#compact-pagination').pagination({
        items: data.length,
        itemsOnPage: 20,
        type: 'ul',
        row: 'li',
        typeID: 'listDocuments',
        cssStyle: 'compact-theme',
        listname: 'Documents'
    });
    return resultfound;
}



function CreateDocumentList(page) {
    var startIndex = page * 20;
    var endIndex = startIndex + 20;

    var iCount = 0;
    var resultFound = false;
    var documentTags = [];

    var sortby = '';
    var fieldType = '';
    var contractTags = [];
    switch (selectedSortOption) {
        case "Recently Updated":
            sortby = 'Timestamp';
            fieldType = 'date';
            break;
        case "Recently Created":
            sortby = 'Created';
            fieldType = 'date';
            break;
        case "Title(A-Z)":
            sortby = '&sortbyfield=DocumentName&orderby=ASC';
            break;
        case "Title(Z-A)":
            sortby = '&sortbyfield=DocumentName&orderby=DESC';
            break;
        default:
            sortby = '';
            break;
    }
    $("#listDocuments").empty();
    var article = "";
    for (var j = startIndex; j < endIndex; j++) {
        var item = listDocuments[j];
        if (item != null) {
            if (item.ParentFolderID == null || v_isShowAllDocFunction || v_filterButtonClicked) {
                documentTags.push(item.DocumentName);
                article += '<li>';
                article += '<span>&nbsp;</span>';
                article += '<p>';
                article += '<p id="IsFinalized" style="display:none;">' + item.IsFinalized + '</p>';
                article += '<p id="IsFolder" style="display:none;">' + item.IsFolder + '</p>';
                article += '<p id="SentForSign" style="display:none;">' + item.SentForSign + '</p>';
                article += '<p id="DocumentID" style="display:none;">' + item.RowKey + '</p>';
                article += '<p id="DocumentName" style="display:none;">' + item.DocumentName + '</p>';
                article += '<p id="DocumentUrl" style="display:none;">' + item.DocumentUrl + '</p>';
                article += '<p id="sContractid" style="display:none;">' + item.ContractID + '</p>';
                article += '<p id="sContractStatus" style="display:none;">' + item.ContractStatus + '</p>';
                article += '<p id="DocumentLibraryName" style="display:none;">' + item.DocumentLibraryName + '</p>';
                article += '<p id="ShareWorkflow" style="display:none;">' + item.ShareWorkflow + '</p>';
                article += '<p id="ReviewWorkflow" style="display:none;">' + item.ReviewWorkflow + '</p>';
                article += '<p id="ContractArea" style="display:none;">' + item.ContractArea + '</p>';
                article += '<p id="BusinessArea" style="display:none;">' + item.BusinessArea + '</p>';
                article += '<p id="BusinessAreaPath" style="display:none;">' + item.BusinessAreaPath + '</p>';
                article += '<p id="FolderURL" style="display:none;">' + item.FolderUrl + '</p>';
                article += '<p id="IsPrimaryDoc" style="display:none;">' + item.IsPrimary + '</p>';
                var isFolder = false;
                var vClass = "openmenu";
                var vDocIcon = "";
                if (item.IsFinalized == "Yes") {
                    vClass = "openmenuFinal";
                    vDocIcon = '<img src="../Content/Images/icon/final_doc.png" class="doc_type" alt="Finalized Document" title="Finalized Document" />';
                } else {
                    vDocIcon = "";//'<img src="../Content/Images/icon/draft_doc.png" class="doc_type" alt="Draft Document" title="Draft Document" />';
                }

                if (item.CreationMode == "Amendment") {
                    vClass = "openmenuAmendmentDocument";
                    vDocIcon = '<img src="../Content/Images/icon/amendment_doc.png" class="doc_type" alt="Amendment Document" title="Amendment Document" />';
                }

                //manoj
                //if (item.IsUnPublished == "Yes" && item.Permission == "View") {
                // vDocIcon = '<img src="../Content/Images/Unpublish.png" class="doc_type" alt="Unpublished Document" title="Unpublished Document Uesr Can not see the document." />';
                // }
                //manoj

                if (item.DocumentName.toLowerCase().indexOf(".") < 0) {
                    isFolder = true;
                    article += '';
                }
                else {

                }
                if ((item.ContractID == "" || item.ContractTitle == "") && !isFolder) {
                    vClass = "openmenuNotTagged";
                    if (item.IsFinalized == "Yes") {
                        vClass = "openmenuNotTaggedFinal";
                    }
                }

            }
            if (isFolder) {
                var vClassFolder = ApplyPermission("openmenuFolder", item.Permission, item.ContractStatus, true);
                article += '<p id="Permission" style="display:none;">' + vClassFolder + '</p>';
                article += '<p class="files" style="width:100%">';
                article += '<i style="width:100%"><img src="../Content/Images/icon/folder.png" /><a href="javascript:void(0)" id=' + item.RowKey + ' onclick="javascript:showfolderdocuments(this,false);">' + item.DocumentName + '</a>';

                //if (item.ContractStatus != "Expired" && item.ContractStatus != "Cancelled" && item.ContractStatus != "Replaced" && item.ContractStatus != "Archived") {
                article += '<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="' + vClassFolder + '" />';
                //}


            } else {
                var vPrimDocIcon = '';
                if (item.IsPrimary == "Yes") {
                    vPrimDocIcon = '<img src="../Content/Images/primary_doc.png" class="doc_type margin-left-5" alt="Primary Document" title="Primary Document" />';
                }
                var amentmentdocument = (typeof (item.AmendmentID) != "undefined" && item.AmendmentID != null && item.AmendmentID != "") ? true : false;
                vClass = ApplyPermission(vClass, item.Permission, item.ContractStatus, false, item.IsDraftContract);
                article += '<p id="Permission" style="display:none;">' + vClass + '</p>';
                article += '<p class="files" style="width:72% !important">';
                vURLDoc = encodeURI(item.DocumentUrl);
                var ext = vURLDoc.match(settings.pattern);
                var vFileType = '<dd class="file-icon none"></dd>';
                if (ext != null) {
                    if (ext.length > 0) { ext = ext[0].slice(1); }
                    //if (vURLDoc.toLowerCase().indexOf(localStorage.SPHostUrl.toLowerCase()) >= 0) {
                    //    if (jQuery.inArray(ext, settings.WopiFrameFileTypes) > -1) {
                    //        vRawURLDoc = encodeURIComponent(item.DocumentUrl);
                    //        vURLDoc = localStorage.SPHostUrl + "/_layouts/WopiFrame.aspx?sourcedoc=" + vRawURLDoc + "&action=default";
                    //    } else {
                    //        vRawURLDoc = "";
                    //    }
                    //}

                    if (jQuery.inArray(ext, settings.knownFileTypes) > -1) {
                        vFileType = '<dd class="file-icon ' + ext + '"></dd>';
                    }
                    if (ext == 'zip') {
                        vClass = "openmenuZippedDocument";
                    }
                }
                if (multipleChecks.indexOf(item.RowKey) > -1) {
                    article += '<input class="margin-Top10 margin-right" name="ContRec" type="checkbox" checked value="" onclick="checkMultipleContracts(this);" id="' + item.RowKey + "~" + item.DocumentUrl + '"  />';
                } else { article += '<input class="margin-Top10 margin-right" name="ContRec" type="checkbox" value="" onclick="checkMultipleContracts(this);" id="' + item.RowKey + "~" + item.DocumentUrl + '"  />'; }
                //article += '<i> ' + vFileType + '<a href="' + vURLDoc + '" target="_blank">' + item.DocumentName + '</a>' + vDocIcon + '<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="' + vClass + '" />';
                article += '<i><a class="doted80" href=' + vURLDoc + ' target="_blank" title="' + item.DocumentName + '">' + item.DocumentName + '</a>' + vPrimDocIcon + vDocIcon + '<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="' + vClass + '" />';
                // }
            }
            var docType = "";
            docType = item.DocumentType;
            if (!isFolder) {
                if (item.ContractTitle == "") {
                    if (docType == null || docType == "" || docType == "0") {
                        article += '<small style="margin: 0px 0px 0px 4px !important;" class="cont_Doc_Small"> &lt;Not tagged to Contract&gt; ';
                    }
                    else {
                        article += '<small style="margin: 0px 0px 0px 4px !important;" class="cont_Doc_Small"> &lt;Not tagged to Contract&gt;  |  ' + docType;
                    }

                } else {
                    if (docType == null || docType == "" || docType == "0") {
                        article += '<small style="margin: 0px 0px 0px 4px !important;" class="cont_Doc_Small PreserveSpace">' + item.ContractTitle + '  ';
                    }
                    else {
                        article += '<small style="margin: 0px 0px 0px 4px !important;" class="cont_Doc_Small PreserveSpace">' + item.ContractTitle + '  |  ' + docType;
                    }
                }

                if (sortby != '') {
                    if (item[sortby] != null && item[sortby] != "") {
                        if (fieldType == 'date') {
                            if (localStorage.AppDateFormat == null || localStorage.AppDateFormat == "" || localStorage.AppDateFormat == 'undefined') {
                                article += ' |&nbsp;<var title="' + selectedSortOption + '">' + moment(new Date(item[sortby])).format('Do MMM YYYY') + '</var></small></i>';
                            }
                            else {
                                if (localStorage.AppDateFormat == "DD/MM/YYYY")
                                    article += ' |&nbsp;<var title="' + selectedSortOption + '">' + moment(new Date(item[sortby])).format('Do MMM YYYY') + '</var></small></i>';
                                else
                                    article += ' |&nbsp;<var title="' + selectedSortOption + '">' + moment(new Date(item[sortby])).format('MMM Do YYYY') + '</var></small></i>';
                            }
                        }
                        else {
                            article += ' |&nbsp;<var title="' + selectedSortOption + '">' + item[sortby] + '</var></small></i>';
                        }
                    }
                }
                else {
                    article += '</small></i>';
                }

            }
            else {
                if (sortby != '') {
                    if (item[sortby] != null && item[sortby] != "") {
                        if (fieldType == 'date') {
                            if (localStorage.AppDateFormat == null || localStorage.AppDateFormat == "" || localStorage.AppDateFormat == 'undefined') {
                                article += '<small style="margin: 0px 0px 0px 33px !important;"><var title="' + selectedSortOption + '">' + moment(new Date(item[sortby])).format('Do MMM YYYY') + '</var></small></i>';
                            }
                            else {
                                if (localStorage.AppDateFormat == "DD/MM/YYYY")
                                    article += '<small style="margin: 0px 0px 0px 33px !important;"><var title="' + selectedSortOption + '">' + moment(new Date(item[sortby])).format('Do MMM YYYY') + '</var></small></i>';
                                else
                                    article += '<small style="margin: 0px 0px 0px 33px !important;"><var title="' + selectedSortOption + '">' + moment(new Date(item[sortby])).format('MMM Do YYYY') + '</var></small></i>';
                            }
                            //article += '<small style="margin: 0px 0px 0px 33px !important;"><var title="' + selectedSortOption + '">' + moment(new Date(item[sortby])).format('Do MMM YYYY') + '</var></small></i>';
                        }
                        else {
                            article += '<small style="margin: 0px 0px 0px 33px !important;"><var title="' + selectedSortOption + '">' + item[sortby] + '</var></small></i>';
                        }
                    }
                }
                else {
                    article += '</i>';
                }
            }
            article += '</p>';
            if (item.IsFolder == "True") {

            } else {
                if (item.CreationMode == "Amendment") {
                    article += '<b class="status_brass">Amendment</b>';
                } else {
                    if (item.IsFinalized == "Yes") {
                        article += '<b class="status_green">Finalized/Ready for Signature</b>';
                    }
                    else {
                        article += '<b class="status_yellow">Draft</b>';
                    }
                }
            }

            article += '</li>';
            iCount++;
        }
        resultFound = true;
    }
    $("#listDocuments").append(article);

    checkMultipleContracts();
    $("#btnMultipleAction").css('display', 'none');
    $("#txtSearchBox").autocomplete({
        source: documentTags,
        minLength: 2,
        focus: function (event, ui) {
            return false;
        },
        select: function (evn, uidetails) {
            $("#txtSearchBox").val(uidetails.item.label);
            search();
        }
    });

    $('.files').linktype();
    $(".openmenuFolder").contextMenu({ menu: 'myMenuFolder', leftButton: true }, function (action, el, pos) {
        contextMenuWorkFolder(action, el.parent("i").parent("p").parent("li"), pos);
    });
    $(".openmenuFolderContribute").contextMenu({ menu: 'myMenuFolderContribute', leftButton: true }, function (action, el, pos) {
        contextMenuWorkFolder(action, el.parent("i").parent("p").parent("li"), pos);
    });
    $(".openmenuFolderRead").contextMenu({ menu: 'myMenuFolderRead', leftButton: true }, function (action, el, pos) {
        contextMenuWorkFolder(action, el.parent("i").parent("p").parent("li"), pos);
    });
    $(".openmenuReadOnly").contextMenu({ menu: 'myMenuManReadOnly', leftButton: true }, function (action, el, pos) {
        contextMenuWork(action, el.parent("i").parent("p").parent("li"), pos);
    });
    $(".openmenuDraftContribute").contextMenu({ menu: 'myMenuManDraftContribute', leftButton: true }, function (action, el, pos) {
        contextMenuWork(action, el.parent("i").parent("p").parent("li"), pos);
    });
    $(".openmenuDraftManage").contextMenu({ menu: 'myMenuManDraftManage', leftButton: true }, function (action, el, pos) {
        contextMenuWork(action, el.parent("i").parent("p").parent("li"), pos);
    });
    $(".openmenu").contextMenu({ menu: vFinalSignature, leftButton: true }, function (action, el, pos) {
        contextMenuWork(action, el.parent("i").parent("p").parent("li"), pos);
    });
    $(".openmenuFinal").contextMenu({ menu: vMarkFinalSignature, leftButton: true }, function (action, el, pos) {
        contextMenuWork(action, el.parent("i").parent("p").parent("li"), pos);
    });
    $(".openmenuAmendmentDocument").contextMenu({ menu: "dropdownMenuAmendment", leftButton: true }, function (action, el, pos) { contextMenuAmendmentDocument(action, el.parent("i").parent("p").parent("li"), pos); });
    $(".openmenuNotTagged").contextMenu({ menu: "myMenuNotTaggeDocs", leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("i").parent("p").parent("li"), pos); });
    $(".openmenuNotTaggedFinal").contextMenu({ menu: "myMenuNotTaggeDocsFinal", leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("i").parent("p").parent("li"), pos); });


    $(".openmenuFolderMan").contextMenu({ menu: 'myMenuFolderMan', leftButton: true }, function (action, el, pos) {
        contextMenuWorkFolder(action, el.parent("i").parent("p").parent("li"), pos);
    });
    $(".openmenuMan").contextMenu({ menu: vFinalSignature + "Man", leftButton: true }, function (action, el, pos) {
        contextMenuWork(action, el.parent("i").parent("p").parent("li"), pos);
    });
    $(".openmenuFinalMan").contextMenu({ menu: vMarkFinalSignature + "Man", leftButton: true }, function (action, el, pos) {
        contextMenuWork(action, el.parent("i").parent("p").parent("li"), pos);
    });
    $(".openmenuAmendmentDocumentMan").contextMenu({ menu: "dropdownMenuAmendmentMan", leftButton: true }, function (action, el, pos) { contextMenuAmendmentDocument(action, el.parent("i").parent("p").parent("li"), pos); });
    $(".openmenuNotTaggedMan").contextMenu({ menu: "myMenuNotTaggeDocsMan", leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("i").parent("p").parent("li"), pos); });
    $(".openmenuNotTaggedFinalMan").contextMenu({ menu: "myMenuNotTaggeDocsFinalMan", leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("i").parent("p").parent("li"), pos); });



    $(".openmenuFolderCon").contextMenu({ menu: 'myMenuFolderCon', leftButton: true }, function (action, el, pos) {
        contextMenuWorkFolder(action, el.parent("i").parent("p").parent("li"), pos);
    });
    $(".openmenuCon").contextMenu({ menu: vFinalSignature + "Con", leftButton: true }, function (action, el, pos) {
        contextMenuWork(action, el.parent("i").parent("p").parent("li"), pos);
    });
    $(".openmenuFinalCon").contextMenu({ menu: vMarkFinalSignature + "Con", leftButton: true }, function (action, el, pos) {
        contextMenuWork(action, el.parent("i").parent("p").parent("li"), pos);
    });
    $(".openmenuAmendmentDocumentCon").contextMenu({ menu: "dropdownMenuAmendmentCon", leftButton: true }, function (action, el, pos) { contextMenuAmendmentDocument(action, el.parent("i").parent("p").parent("p").parent("li"), pos); });
    $(".openmenuNotTaggedCon").contextMenu({ menu: "myMenuNotTaggeDocsCon", leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("i").parent("p").parent("p").parent("li"), pos); });
    $(".openmenuNotTaggedFinalCon").contextMenu({ menu: "myMenuNotTaggeDocsFinalCon", leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("i").parent("p").parent("p").parent("li"), pos); });

    $(".openmenuZippedDocument").contextMenu({ menu: "dropdownZippedDocument", leftButton: true },
        function (action, el, pos) {
            contextMenuWork(action, el.parent("i").parent("p").parent("li"), pos);
        });

    if (v_isSearchFunction) {
        var txtsearchboxvalue = $.trim($('#txtSearchBox').val());
        if (resultFound) {
            if ($.trim($("#txtSearchBox").val()) == '') {

            }
            else {
                $("#showAll").text('');

                $('#liFiltersSearchText').append('<span><small>Showing search result for : ' + txtsearchboxvalue + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
            }
        } else {
            $("#showAll").text('');

            $('#liFiltersSearchText').append('<span><small>Showing search result for : ' + txtsearchboxvalue + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
            $("#listDocuments").html("<p class='f_p-error'>No Result Found.</p>");
        }
    }
    $("#compact-pagination").css('display', '');


    $(".openmenuFolderCon").click(function () {
        $("#dvfilter").hide();
    });
    $(".openmenuCon").click(function () {
        $("#dvfilter").hide();
    });
    $(".openmenuFinalCon").click(function () {
        $("#dvfilter").hide();
    });
    $(".openmenuAmendmentDocumentCon").click(function () {
        $("#dvfilter").hide();
    });
    $(".openmenuNotTaggedCon").click(function () {
        $("#dvfilter").hide();
    });
    $(".openmenuFolder").click(function () {
        $("#dvfilter").hide();
    });
    $(".openmenu").click(function () {
        $("#dvfilter").hide();
    });
    $(".openmenuFinal").click(function () {
        $("#dvfilter").hide();
    });
    $(".openmenuAmendmentDocument").click(function () {
        $("#dvfilter").hide();
    });
    $(".openmenuNotTagged").click(function () {
        $("#dvfilter").hide();
    });


    $(".openmenuFolderMan").click(function () {
        $("#dvfilter").hide();
    });
    $(".openmenuMan").click(function () {
        $("#dvfilter").hide();
    });
    $(".openmenuFinalMan").click(function () {
        $("#dvfilter").hide();
    });
    $(".openmenuAmendmentDocumentMan").click(function () {
        $("#dvfilter").hide();
    });
    $(".openmenuNotTaggedMan").click(function () {
        $("#dvfilter").hide();
    });
}
function ApplyPermission(Class, vPermission, contractstatus, isfolder, IsDraftContract) {
    if (isfolder) {
        switch (vPermission) {
            case 'Contribute': {
                if (contractstatus == "Expired" || contractstatus == "Cancelled" || contractstatus == "Replaced" || contractstatus == "Archived") {
                    Class = 'openmenuFolderRead';
                } else {
                    Class = 'openmenuFolderContribute';
                }
                break;
            }
            case 'Manage': {
                if (contractstatus == "Expired" || contractstatus == "Cancelled" || contractstatus == "Replaced" || contractstatus == "Archived") {
                    Class = 'openmenuFolderRead';
                } else {
                    Class = 'openmenuFolder';
                }
                break;
            }
            case 'View': {
                Class = 'openmenuFolderRead';
                break;
            }
        }
        return Class;
    } else {
        //Bug(eO37052)
        switch (vPermission) {
            case 'Contribute':
                {
                    if (IsDraftContract != "Yes") {
                        if ((contractstatus == "Expired" || contractstatus == "Cancelled" || contractstatus == "Replaced" || contractstatus == "Archived") && Class != "openmenuAmendmentDocument") {
                            Class = "openmenuReadOnly";
                        } else {
                            Class += "Con";
                        }
                    } else {
                        Class = "openmenuDraftContribute";
                    }
                    break;
                }
            case 'Manage':
                {
                    if (IsDraftContract != "Yes") {
                        if (contractstatus == "Expired" || contractstatus == "Cancelled" || contractstatus == "Replaced" || contractstatus == "Archived") {
                            if (Class != "openmenuAmendmentDocument") {
                                Class = "openmenuReadOnly";
                            } else {
                                Class += "Con";
                            }
                        } else {
                            Class += "Man";
                        }
                    } else {
                        Class = "openmenuDraftManage";
                    }
                    break;
                }
            case 'View':
                {
                    if (IsDraftContract != "Yes") {
                        if (Class != "openmenuAmendmentDocument") {
                            Class = "openmenuReadOnly";
                        } else {
                            Class += "Con";
                        }
                    } else {
                        Class = "openmenuReadOnly";
                    }
                    break;
                }
        }
        return Class;
        // Document - Menu End

        //    if (vPermission == 'Contribute') {
        //        if (contractstatus == "Expired" || contractstatus == "Cancelled" || contractstatus == "Replaced" || contractstatus == "Archived") {
        //        } else {
        //            return Class + "Con";
        //        }
        //}
        //else if (vPermission == 'Collaborate') {
        //    return Class;
        //}
        //else if (vPermission == 'Manage') {
        //    return Class + "Man";
        //}
        //else if (vPermission == 'View' || vPermission == '') {
        //    return Class;
        //}
    }
}
function ApplyPermissionToMenu(vPermission) {
    if (vPermission == 'Contribute') {
        $('.Manage').css("display", "none");
    }
    else if (vPermission == 'Collaborate') {
        $('.Manage').css("display", "none");
        $('.Contribute').css("display", "none");
    }
    else if (vPermission == 'View' || vPermission == '' || vPermission == null || vPermission == "Read Only") {
        $('.Manage').css("display", "none");
        $('.Contribute').css("display", "none");
        $('.Collaborate').css("display", "none");
    }
}



function liRemove(obj) {
    var allowcustomsearch = false;
    if ($(obj.parentNode.parentNode.parentNode).attr('id') == 'liFiltersSearchText') {
        $(obj.parentNode.parentNode.parentNode).empty();
        $('#txtSearchBox').val('');
        //if ($("#showAll").text().indexOf("/") < 0) {
        var CustomUl = $("#liDocumentViews");
        TriggerChild = $(CustomUl).find(".active_quick_view");
        if (typeof TriggerChild != 'undefined' && TriggerChild != null && TriggerChild != "" && TriggerChild.length > 0) {
            savedViewDisplaywithSearch(TriggerChild[0]);
            allowcustomsearch = true;
        }
        if (!allowcustomsearch) {
            showalldocuments();
        }
    }
    else {
        var child = obj.parentNode;
        var firstChild = child.firstChild;

        var find = " ";
        var re = new RegExp(find, 'g');

        $("#filterDocumentType option[value='" + firstChild.nodeValue + "']").prop("selected", false);
        $("#filterLibraryName option[value='" + firstChild.nodeValue.replace(re, '') + "']").prop("selected", false);
        $("#filterCreationMode option[value='" + firstChild.nodeValue.replace(re, '') + "']").prop("selected", false);

        child.parentNode.removeChild(child);
    }
    if (!allowcustomsearch) {
        var hasItem1 = false;
        $('#liFiltersDocumentType span').each(function (i) {
            hasItem1 = true;
        });

        var hasItem2 = false;
        $('#liFiltersLibraryName span').each(function (i) {
            hasItem2 = true;
        });

        var hasItem3 = false;
        $('#liFiltersCreationMode span').each(function (i) {
            hasItem3 = true;
        });

        var hasItem4 = false;
        $('#liFiltersSearchText span').each(function (i) {
            hasItem4 = true;
        });

        applyFilter();
        if (!hasItem1 && !hasItem2 && !hasItem3 && !hasItem4) {
            $("#showAll").css('display', 'block');
            $("#showAll").css('display', 'inline');
            $("#showAll").text('');

            $("#btnAddView").css('display', 'none');

            colorLink('liDocumentViews a', false);
        }
    }
}
//Script for Filter End

function tabchange(object) {
    if (thisBusinessAreaPath != "") {
    }
    else {
        if (IsDropDownsEmpty) {
            $("#ddlDocumentTemplate").empty();
            $("#ddlDocumentTemplate").append("<option value='0'>--Select--</option>")
            $("#ddlDocumentTypeCreate").empty();
            $("#ddlDocumentTypeCreate").append("<option value='0'>--Select--</option>")
        }
    }
    $("#dvNewDocument").removeClass('width100');
    if (object.id == "tabTemplate") {
        if ($("#ddlDocumentTemplate option").length <= 1 && $("#txtBusinessArea").val() != "") {
            swal("", "No templates are assigned to business area.");
        }
        $('input[type="radio"][name="IsStandard"][value="Yes"]').prop('checked', true);
        $("#tabTemplate").addClass('form-active');
        $("#tabUpload").removeClass('form-active');
        $("#docContract").removeClass('validelement');
        $("#ddlDocumentTemplate").addClass('validelement');
        $("#trTemplate").css('display', '');
        $("#trTemplate1").css('display', '');
        $("#trFileUpload").css('display', 'none');
        $("#txtDocumentNameCreate").addClass("validelement");

        $("#formTitle").text('Create from Document Template');

        var oo = object.parentNode;

        $("#tabTemplate").addClass("document_active");
        $("#tabUpload").removeClass("document_active");

    } else {
        $('input[type="radio"][name="IsStandard"][value="No"]').prop('checked', true);
        $("#tblContentControls").empty();
        $("#tabUpload").addClass('form-active');
        $("#tabTemplate").removeClass('form-active');
        $("#docContract").addClass('validelement');
        $("#ddlDocumentTemplate").removeClass('validelement');
        $("#trTemplate").css('display', 'none');
        $("#trTemplate1").css('display', 'none');
        $("#trFileUpload").css('display', '');
        $("#txtDocumentNameCreate").removeClass("validelement");

        $("#formTitle").text('Upload from Computer');
        $("#tabUpload").addClass("document_active");
        $("#tabTemplate").removeClass("document_active");
    }
    if ($("#contractRec")[0].style.display != "none") {
        $("#ddlDocumentTemplate").val("0");
        $("#txtContractRecElementID").val('');
        $("#txtContractRecElement").val('');
        $("#txtCounterpartyCreate").val("");
        $('#txtContractAreaAdministrators').val("");
        $('#txtBusinessAreaOwners').val("");
        if ($("#spBusinessArea")[0].style.display != "none") {
            $("#txtBusinessArea").val("");
            if (localStorage.GlobalBusinessAreaLocation == 'All') {
                $("#txtBusinessAreaPath").val("");
            }
            $("#spBusinessArea").css('display', '');
            $('#txtContractAreaName').val("");
            //manoj
            $('#liSelectedBA').html('');
            $("#txtNewFolderName").val("");
            $("#lblFolderUrl").css('pointer-events', 'none');
            $("#lblFolderUrl").css('cursor', 'default');
            $("#lblFolderUrl").text('/[Document Library]/');
            $("#btnBrowseSubFolders").css("display", "none");
            $("#btnNewFolder").css("display", "none");
            //manoj
        }
    }
    $("#txtDocumentNameCreate").val("");
    //$("#ddlDocumentTypeCreate").find('option[value="Primary Agreement"]').prop("selected", true);
    $("#textDescription").val('');
    $("#txtFolderName").val("");
    $("#txtNewFolderName").val("");
    $('#dtValidFrom').val("");
    $('#dtValidTill').val("");
    $('#txtReminder1').val("");
    $('#txtReminder2').val("");
    $('#txtReminder3').val("");
    $("#ddlReminder1").find('option[value="before"]').prop("selected", true);
    $("#ddlReminder2").find('option[value="before"]').prop("selected", true);
    $("#ddlReminder3").find('option[value="before"]').prop("selected", true);

    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "6" && n.Status == "ON");
    });
    if (vAccFeat.length == 0) {
        $("#spCounterpartyCreate").css("display", "none");
        $("#txtCounterpartyCreate").prop("readonly", false);
    }
    else {
        if (!bindconarea && ($("#txtContractRecElement").val() == "")) {
            $("#spCounterpartyCreate").css('display', '');
        }
    }

    if (defaultglobalsetting != null && defaultglobalsetting != "") {
        var documentReminders = defaultglobalsetting.DocumentReminders;
        var xmlDoc = $.parseXML(documentReminders);
        var $xml = $(xmlDoc);
        var $reminder = $xml.find("reminder");
        var j = 1;
        $reminder.each(function () {
            var beforeSplit = $(this).text();
            var remSplit = beforeSplit.split(/ +/);
            $("#ddlReminder" + j).val(remSplit[0]);
            $("#txtReminder" + j).val(remSplit[1]);
            j = j + 1;
        });
    }
    removeValidations("addEditDocument");
}

$(document).ready(function () {
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "1");
    });

    //manoj
    if (typeof (localStorage.MaxRequestLength) != "undefined" && localStorage.MaxRequestLength != null && localStorage.MaxRequestLength != "") {
        $("#lblmaxsize").text("(Max " + Math.round(parseInt(localStorage.MaxRequestLength) / 1024) + "MB file.)");
    } else {
        $("#lblmaxsize").text("(Max 4MB file.)");
    }
    //manoj

    if (vAccFeat.length > 0) {
        var vConfig = vAccFeat[0].Configuration;
        vProviderDocSign = $(vConfig).find('Provider').text();
        if (vProviderDocSign == "Right Signature")
            RightSignatureFlag = true;
        else
            RightSignatureFlag = false;
    }
    CheckGlobalSettings();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?sortbyfield=ContractTitle&orderby={orderby}',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (contracts) {
            var datalenght = contracts.length;
            for (var i = 0; i < datalenght; i++) {
                var item = contracts[i];
                $("#ddlContractsEdit").append("<option value=" + encodeURI(item.RowKey.trim()) + " class='PreserveSpace'>" + item.ContractTitle.trim() + "</option>");
            }
        }
    });

    BindCC();



    $("#browseBA").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Users",
        modal: true,
        height: "auto",
        buttons: {
            "OK": function () { $('#BusinessArea').val($('#txtBA').val()); $(this).dialog("close"); setDocumentUrl(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
    $("#addEditDocument").dialog({
        autoOpen: false,
        closeText: "",
        width: "75%",
        height: 600,
        title: "Document",
        modal: true,
        buttons: {
            "Save": function () {
                modalOnOpenDocument();
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        close: function (event, ui) {
            clearsection();
        }
    });


    $("#browse_treeviewFolder").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        height: 500,
        title: "Select Folder",
        modal: true,
        buttons: {
            "OK": function () {
                selectfolder();
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    BindCounterpartyType();

    $("#EditDocument").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Document",
        modal: true,
        buttons: {
            "Save": function () {
                modalOnOpenDocument();
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        close: function (event, ui) {
            $("#lblCTitleDoc").text('');
            $("#txtIsFolder").val('');
            $("#lblDocumentName").html('');

            $("#txtDocumentID").val('');
            $("#txtDocumentIDForEdit").val("")

            $("#ddlDocumentType option").filter(function (index) { return $(this).text() === '--Select--' }).prop('selected', true);
            $("#ddlDocumentTypeCreate option").filter(function (index) { return $(this).text() === '--Select--' }).prop('selected', true);
            //$("#ddlDocumentTypeCreate").find('option[value="Primary Agreement"]').prop("selected", true);

            if ($("#showAll").text().indexOf("/") < 0) {
                $("#txtContractRecElementID").val('');
                $("#txtContractRecElement").val('');
            }
            $("#txtbusinesssareapathedit").text('')
            $("#txtContractRecElementIDEdit").val("");
            $("#txtContractRecElementEdit").val("");
            $("#txtDocumentName").val('');

            $('input[type="radio"][name="IsFinalizedEdit"][value="No"]').prop('checked', true);
            $("#txtDocumentLanguageEdit").val("");
            $("#txtHardCopyPhysicalLocationEdit").val("");
            $("#textDescription").val('');
            $("#spExt").html('');
            $("#txtDuplicateDocumentName").val('');
            $("#spDuplicateDocumentExt").html('');

            $('#dtValidFromEdit').val("");
            $('#dtValidTillEdit').val("");
            $('#txtReminder1Edit').val("");
            $('#txtReminder2Edit').val("");
            $('#txtReminder3Edit').val("");
            $("#ddlReminder1Edit").find('option[value="before"]').prop("selected", true);
            $("#ddlReminder2Edit").find('option[value="before"]').prop("selected", true);
            $("#ddlReminder3Edit").find('option[value="before"]').prop("selected", true);
        }
    });

    $("#viewMetadataDetail").dialog({
        autoOpen: false,
        closeText: "",
        width: "70%",
        title: "Detail",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "Close": function () {
                $(this).dialog("close");
            }
        }
    });
    $("#sendForSignature").dialog({
        autoOpen: false,
        closeText: "",
        width: "75%",
        title: "Send for Signature",
        modal: true,
        buttons: {
            "Send": function () {
                SendForSignature();
            },
            Cancel: function () {
                $(this).dialog("close");
                ClearSignatureForm();
            }
        },
        close: function (event, ui) {

        },
        open: function (event, ui) {
            if (RightSignatureFlag) {
                $("#RightSignDropDown").show();
                $("#SignDocExptxt").hide();
            }
            else {
                $("#RightSignDropDown").hide();
                $("#SignDocExptxt").show();
            }
        }
    });

    $("#shareDocument").dialog({
        autoOpen: false,
        closeText: "",
        width: "75%",
        title: "Share Document",
        dialogClass: "Popup_WarningMsg",
        modal: true,
        buttons: {
            "Share": function () {
                ShareDocument();
            },
            Cancel: function () {
                $(this).dialog("close");
                ClearShareForm();
            }
        },
        close: function (event, ui) {
            contractItemrec = "";
            $(".addmorelinks").show();
        },
        open: function (event, ui) {
            if (!($('.smalltext').length)) {
                $("div[aria-describedby='shareDocument'].Popup_WarningMsg div span:first").append("<br /><span style='background-color:yellow;font-size:small;' class='smalltext'>A secured view of this Contract Document will be temporarily shared with external contact(s) & users in eContracts as a link in their email.</span>");
            }
            $("div[aria-describedby='shareDocument'].Popup_WarningMsg div span:first").attr('style', 'padding-bottom: 0px !important');
        }
    });

    $("#divReplaceDocument").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Replace Document",
        modal: true,
        buttons: {
            "OK": function () { replacedocument(); ReplaceDocClick = false; },
            Cancel: function () {
                $(this).dialog("close");
                ReplaceDocClick = false;
            }
        },
        close: function (event, ui) {
            ReplaceDocClick = false;
        }
    });
    $("#browseSigneeUser").dialog({
        autoOpen: false,
        closeText: "",
        width: "75%",
        title: "User",
        modal: true,
        buttons: {
            "OK": function () {
                SelectedSignee();
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        close: function (event, ui) {

        }
    });

    $("#popupCounterparties").dialog({
        autoOpen: false,
        closeText: "",
        width: "65%",
        height: "auto",
        title: "Related Counterparties",
        modal: true,
        buttons: {
            "OK": function () { RelatedCounterpartiesPush(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#browseGeneric").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        modal: true,
        dialogClass: "popup_width100",
        buttons: {
            "OK": function () {

                var my_data = $(this).data('param_1')
                if (multipleChecksDocumentID != null && multipleChecksDocumentID.length > 0) {
                    var listdetails = '';
                    for (var lsc = 0; lsc < multipleChecksDocumentID.length ; lsc++) {
                        if (listdetails == '') {
                            listdetails = multipleChecksDocumentID[lsc].trim();
                        }
                        else {
                            listdetails += ";" + multipleChecksDocumentID[lsc].trim();
                        }
                    }
                    $('#' + my_data).val(listdetails);
                    listdetails = '';
                    multipleChecksDocumentID = [];
                    $('#liSelectedRU').empty();
                }
                $(this).dialog("close");
            },
            Cancel: function () {
                multipleChecksDocumentID = [];
                $('#liSelectedRU').empty();
                $(this).dialog("close");
            }
        }
    });

    $("#dvWorkflow").dialog({
        autoOpen: false,
        closeText: "",
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

    BindO365LibrarySettings();
    if (getParameterByName('CreateNew') == 'Yes') {
        $('input[type="radio"][name="IsFinalized"][value="Yes"]').prop('checked', true);
        removeValidations('addEditDocument');
        $("#dvNewDocument").removeClass('width100');
        $("#addEditDocument").dialog("option", "title", "New Document");
        $("#addEditDocument").dialog("open");
    }
    var DatepickerFormat = '';
    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
    { DatepickerFormat = 'mm/dd/yy'; }
    else { DatepickerFormat = localStorage.AppDateFormat.toLowerCase().slice(0, -2); }
    $('#dtValidFrom').datepicker({
        /* fix buggy IE focus functionality */
        fixFocusIE: false,
        dateFormat: DatepickerFormat,
        onSelect: function (dateText, inst) {
            this.fixFocusIE = true;
            $(this).change().focus();
        },
        onClose: function (dateText, inst) {
            this.fixFocusIE = true;
            this.focus();
            //},
            //beforeShow: function (input, inst) {
            //    var result = $.browser.msie ? !this.fixFocusIE : true;
            //    this.fixFocusIE = false;
            //    return result;
        }
    }).click(function () { $(this).focus() });
    $('#dtValidTill').datepicker({
        /* fix buggy IE focus functionality */
        fixFocusIE: false,
        dateFormat: DatepickerFormat,
        onSelect: function (dateText, inst) {
            this.fixFocusIE = true;
            $(this).change().focus();
        },
        onClose: function (dateText, inst) {
            this.fixFocusIE = true;
            this.focus();
            //},
            //beforeShow: function (input, inst) {
            //    var result = $.browser.msie ? !this.fixFocusIE : true;
            //    this.fixFocusIE = false;
            //    return result;
        }
    }).click(function () { $(this).focus() });
    $('#dtValidFromEdit').datepicker({
        /* fix buggy IE focus functionality */
        fixFocusIE: false,
        dateFormat: DatepickerFormat,
        onSelect: function (dateText, inst) {
            this.fixFocusIE = true;
            $(this).change().focus();
        },
        onClose: function (dateText, inst) {
            this.fixFocusIE = true;
            this.focus();
            //},
            //beforeShow: function (input, inst) {
            //    var result = $.browser.msie ? !this.fixFocusIE : true;
            //    this.fixFocusIE = false;
            //    return result;
        }
    }).click(function () { $(this).focus() });
    $('#dtValidTillEdit').datepicker({
        /* fix buggy IE focus functionality */
        fixFocusIE: false,
        dateFormat: DatepickerFormat,
        onSelect: function (dateText, inst) {
            this.fixFocusIE = true;
            $(this).change().focus();
        },
        onClose: function (dateText, inst) {
            this.fixFocusIE = true;
            this.focus();
            //},
            //beforeShow: function (input, inst) {
            //    var result = $.browser.msie ? !this.fixFocusIE : true;
            //    this.fixFocusIE = false;
            //    return result;
        }
    }).click(function () { $(this).focus() });
    BindPeople();

    $("#aRecentlyUpdated").css("background-color", "#cccccc");
    getSearchableContractFields();
    $("#conSortByOptions").niceSelect();
});
function CheckGlobalSettings() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/GlobalSettings',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            localStorage.setItem("RestrictHighSecurityTagging", data.RestrictHighSecurityTagging);
            defaultglobalsetting = data;
            if (data == null) {
                $("#Upcoming").css("display", "none");
                $("#Delayed").css("display", "none");
            } else {
                if (data.CreateCounterpartyDocument == "Yes") {
                    $("#Upcoming").css("display", "");
                    $("#Delayed").css("display", "");
                }
                else {
                    $("#Upcoming").css("display", "none");
                    $("#Delayed").css("display", "none");
                }
            }
        },
        error: function (status) {
            localStorage.setItem("RestrictHighSecurityTagging", "No");
        }
    });
}


function AddNewDocument() {
    $("#lblTemplateDescription").text("");
    $('#addNewDocument').css("pointer-events", "auto");
    $('.pop_up_Content_Green').parent().removeAttr('disabled');
    $("#trfileUploadOCR").css('display', 'none');

    addbuttonclick = true;
    $(".hhide").hide();
    $("#tblContentControls").empty();
    if ($("#ddlDocumentStatus").val() != 0 && $("#ddlDocumentStatus").val() == "Expired") {
        $("#dtValidFrom").val("");
        $("#dtValidTill").val("");
        if ($("#linkAddValidity").text() == "Track document expiration date") {
            $("#linkAddValidity").css('display', 'none');
        }
        else {
            $("#linkAddValidity").click();
            $("#linkAddValidity").css('display', 'none');
        }
    }
    else {
        $("#linkAddValidity").css('display', 'block');
    }

    $("#tabUpload").addClass('form-active');
    $("#tabTemplate").removeClass('form-active');
    $("#tabUpload").addClass("document_active");
    $("#tabTemplate").removeClass("document_active");
    $("#formTitle").text('Upload from Computer');

    $("#spInProgress").css('display', 'none');
    $("#trTemplate").css('display', 'none');
    $("#trTemplate1").css('display', 'none');
    $("#trFileUpload").css('display', '');
    $("#docContract").replaceWith($("#docContract").val('').clone(true));

    $("#leftTab").css('display', '');

    $("#trContracts").css('display', '');
    $("#trfinal").css('display', '');
    $("#trselect").css('display', '');
    $("#trnew").css('display', '');
    $("#trcopy").css('display', '');

    $("#trDuplicate").css('display', 'none');
    $("#trDocumentType").css('display', '');
    $("#ddlDocumentTemplate").val("0");
    $("#ddlDocumentTemplate").removeClass('validelement');
    $("#txtDocumentNameCreate").val("");
    $('input[type="radio"][name="IsStandard"][value="No"]').prop('checked', true);
    $("#radioPrimaryNo").prop("checked", true);
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "16" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        $('input[type="radio"][name="IsFinalized"][value="No"]').prop('checked', true);
    } else {
        $('input[type="radio"][name="IsFinalized"][value="Yes"]').prop('checked', true);
    }
    removeValidations('addEditDocument');
    $("#dvNewDocument").removeClass('width100');
    $("#addEditDocument").dialog("option", "title", "New Document");
    $("#addEditDocument").dialog("open");
    if (defaultglobalsetting != null && defaultglobalsetting != "") {
        var documentReminders = defaultglobalsetting.DocumentReminders;
        var xmlDoc = $.parseXML(documentReminders);
        var $xml = $(xmlDoc);
        var $reminder = $xml.find("reminder");
        var j = 1;
        $reminder.each(function () {
            var beforeSplit = $(this).text();
            var remSplit = beforeSplit.split(/ +/);
            $("#ddlReminder" + j).val(remSplit[0]);
            $("#txtReminder" + j).val(remSplit[1]);
            j = j + 1;
        });
    }
    $(".nEw_ContRact3").css('display', 'none');
    if ($("#showAll").text().indexOf("/") < 0) {
        $("#lblFolderUrl").removeAttr('pointer-events');
        $("#lblFolderUrl").css('cursor', 'pointer');
        $("#txtCounterpartyCreate").val("");
        //if ($("#showAll").text().indexOf("/") < 0) {
        strContractDocumentsUrl = '';
        $("#lblFolderUrl").removeAttr("disabled");
        $("#radioNo").removeAttr("disabled");
        $("#radioYes").removeAttr("disabled");
        //}
        $("#ddlDocumentTemplate").val("0");
        $("#txtDocumentID").val("");
        $("#txtDocumentIDForEdit").val("")
        $("#txtDocumentNameCreate").val("");
        $("#lblCTitleDoc").text($("#txtBusinessArea").text());
        if (localStorage.GlobalBusinessAreaLocation != "All") {
            $("#contractRec").css('display', '');
            //spBusinessArea
            $("#txtBusinessArea").val(localStorage.GlobalBusinessArea);
            var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
            var vAccFeatCounterParty = $.grep(veContractFeatures, function (n, i) {
                return (n.RowKey == "6" && n.Status == "ON");
            });
            if (vAccFeatCounterParty.length == 0) {
                $("#spCounterpartyCreate").css("display", "none");
                $("#txtCounterpartyCreate").prop("readonly", false);
            }
            else {
                //if (!bindconarea) {
                $("#spCounterpartyCreate").css("display", "");
                // }
            }

        } else {
            $('#hdContAreaDocLibName').val('');
            $(".hidebasedonselection").css('display', '');
            bindconarea = false;
            $("#txtBusinessArea").val('');
            $("#lblFolderUrl").text('/[Document Library]/');
            $("#txtNewFolderName").val('');
            $("#txtNewFolderName").css('display', 'none');
            $("#ddlDocumentTemplate").html('<option value="0">--Select--</option>');
            $("#ddlDocumentTypeCreate").html('<option value="0">--Select--</option>');
            var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
            var vAccFeatCounterParty = $.grep(veContractFeatures, function (n, i) {
                return (n.RowKey == "6" && n.Status == "ON");
            });
            if (vAccFeatCounterParty.length == 0) {
                $("#spCounterpartyCreate").css("display", "none");
                $("#txtCounterpartyCreate").prop("readonly", false);
            }
            else {
                //if (!bindconarea) {
                $("#spCounterpartyCreate").css("display", "");
                // }
            }
        }
        setDocumentUrl();
    } else {
        if (documenturlforfolder != "") {
            $("#lblFolderUrl").text(documenturlforfolder);
        }
        documenturlforfolder = '';
        var selectedpathtofetch = ($("#lblFolderUrl").text().match(/\//g) || []).length;
        var currentfolderpathvalue = ($("#showAll").text().match(/\//g) || []).length;
        if ((selectedpathtofetch - 2) == currentfolderpathvalue) {

        } else {
            var currentfolderpath = $("#showAll").text().trim().split('/');
            var selectedfolderpath = $("#lblFolderUrl").text().trim();
            selectedfolderpath = selectedfolderpath.substr(1);
            selectedfolderpath = selectedfolderpath.slice(0, -1);
            var selectedfolderpathsplit = selectedfolderpath.trim().split('/');
            var finalcurrentfolderpath = '';
            for (var selectedpath = 0; selectedpath < currentfolderpath.length; selectedpath++) {
                if (selectedpath == 0) {
                    finalcurrentfolderpath = (selectedfolderpathsplit[selectedpath] != null && selectedfolderpathsplit[selectedpath] != "") ? selectedfolderpathsplit[selectedpath].trim() : selectedfolderpathsplit[selectedpath];
                } else {
                    finalcurrentfolderpath += ('/' + ((currentfolderpath[selectedpath] != null && currentfolderpath[selectedpath] != "") ? currentfolderpath[selectedpath].trim() : currentfolderpath[selectedpath]));
                }
            }
            $("#lblFolderUrl").text('/' + finalcurrentfolderpath.trim() + '/');
        }
        $("#lblFolderUrl").css('pointer-events', 'none');
        $("#lblFolderUrl").css('cursor', 'default');
        //$("#btnBrowseSubFolders").css('display', 'none');
    }
}


var overwritedocument = false;
function modalOnOpenDocument(dialog) {
    var edithref = $(".edit a").attr('href');
    if (edithref == "#edit") {
        $('.pop_up_Content_Green').parent().attr('disabled', 'disabled');
    }
    var DocumentID = $("#txtDocumentID").val()
    if (DocumentID == "") {
        DocumentID = $("#txtDocumentIDForEdit").val()
    }
    var documentAction = "";
    documentAction = $("#hdnDocumentAction").val()
    if (documentAction != "") {
        if (documentAction == 'replace') {
            $("#ddlDocumentTypeCreate").removeClass('validelement');
            if (requiredValidator("addEditDocument")) {
                $("#loadingPage").fadeIn();
                var formData1 = new FormData();
                var opmlFile = $('#docContract')[0];
                formData1.append("opmlFile", opmlFile.files[0]);
                formData1.append("documentaction", "replace");
                formData1.append("Description", $("#txtDescription").val());
                formData1.append("ContractID", $("#txtContractID").val());
                formData1.append("AccountID", localStorage.AccountID);
                formData1.append("DocumentID", DocumentID);
                formData1.append("ModifiedBy", localStorage.UserName);
                var IsContributeUser = 'No';
                if (typeof contractItem != 'undefined' && contractItem != '') {
                    IsContributeUser = contractItem.Permission.indexOf('Contribute') == -1 ? 'No' : 'Yes';
                }
                formData1.append("IsContributeUser", IsContributeUser);
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + DocumentID,
                    type: 'PUT',
                    data: formData1,
                    cache: false,
                    contentType: false,
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken },
                    processData: false,
                    success: function (document) {
                        $("#ddlDocumentTypeCreate").addClass('validelement');
                        $("#loadingPage").fadeOut();
                        //location = location;//"/Contracts/Documents";
                        reloadlistDocuments();
                    },
                    error: function (Message) {
                        $("#loadingPage").fadeOut();
                        swal(Message.responseText);
                    }
                });
            }
            else {

                if (edithref == "#edit") {
                    $('.pop_up_Content_Green').parent().removeAttr('disabled');
                }
                autoscroll();
                $("#addNewDocument").animate({
                    scrollTop: $(".error").offset().top
                }, 2000);

                $("#addNewDocument").animate({
                    scrollTop: $("#errormsg_docContract").offset().top
                }, 2000);
            }
        } else {
            if (requiredValidator("addEditDocument")) {
                $("#loadingPage").fadeIn();
                if (isSpecialCharacterFileName($("#txtDuplicateDocumentName").val().trim())) {
                    var FileURL = $("#lblFolderUrl").text().split('/');
                    var FinalURL = '';
                    $(FileURL).each(function (i, item) {
                        if (item != "") {
                            if (FinalURL == '') {
                                FinalURL = "/" + item.trim();
                            }
                            else {
                                FinalURL += "/ " + item;
                            }
                        }
                    });
                    FinalURL += "/";
                    if ($("#txtNewFolderName").val() != "") {
                        FinalURL += $("#txtNewFolderName").val().trim() + "/";
                    }
                    FinalURL += $("#txtDuplicateDocumentName").val().trim() + "." + $("#spDuplicateDocumentExt").text().trim();
                    FinalURL = localStorage.SPHostUrl + FinalURL;
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?docurl=' + FinalURL,
                        type: 'GET',
                        dataType: 'json',
                        'Content-Type': 'application/json',
                        cache: false,
                        async: false,
                        headers: { 'eContracts-ApiKey': localStorage.APIKey },
                        success: function (folder) {
                            DocumentExit = true;
                        },
                        error:
                        function (data) {
                            DocumentExit = false;
                        }
                    });
                    try {
                        if (!DocumentExit) {
                            createduplicatedocument(DocumentID);
                        }
                        else {
                            //if document exists as confirmation to overwrite                          
                            swal({
                                title: '',
                                text: "Document already exists, do you want to <span style=\"font-weight:700\">overwrite</span> the existing document?",
                                type: 'warning',
                                showCancelButton: true,
                                confirmButtonText: 'Yes',
                                cancelButtonText: 'No',
                                html: true
                            },
                 function (confirmed) {
                     if (confirmed) {
                         overwritedocument = true;
                         createduplicatedocument(DocumentID);
                         $('.pop_up_Content_Green').parent().removeAttr('disabled');
                         $("#idDocUploadInProgress").css('display', 'none');
                         $("#loadingPage").fadeOut();
                     }
                     else {
                         $('.pop_up_Content_Green').parent().removeAttr('disabled');
                         $("#idDocUploadInProgress").css('display', 'none');
                         $("#loadingPage").fadeOut();
                     }
                     return;
                 });
                        }
                    }
                    catch (ex) {
                        //  alert(ex);
                    }
                }
                else {
                    //swal("", "File names can't contain the following characters /:*\\?\"<>|#%.");
                    // For Brookfield allow dot in filename
                    swal("", "File names can't contain the following characters /:*\\?\"<>|#%");
                    // For Brookfield allow dot in filename
                }
            } else {
                autoscroll();
                $("#addNewDocument").animate({
                    scrollTop: $(".error").offset().top
                }, 2000);

                $("#addNewDocument").animate({
                    scrollTop: $("#errormsg_docContract").offset().top
                }, 2000);
            }

        }

    }
    else if (DocumentID != "") {

        if (requiredValidator('EditDocument')) {
            var checktheprimarydocument = true;
            if ($("#hdIsPrimaryDoc").val() == "Yes") {
                if ($("#hdPrvContractID").val() == "" && $("#txtContractRecElementIDEdit").val() != "") {
                    checktheprimarydocument = checkprimarydocumentexit($("#txtContractRecElementIDEdit").val());
                } else if (($("#hdPrvContractID").val() != $("#txtContractRecElementIDEdit").val()) && $("#txtContractRecElementIDEdit").val() != "") {
                    checktheprimarydocument = checkprimarydocumentexit($("#txtContractRecElementIDEdit").val());
                }
            }

            if (!checktheprimarydocument) {
                swal({
                    title: '',
                    text: "Selected contract already having one document as primary document. <span style=\"font-weight:700\">do you want to make this document as a primary document for the selected contract</span>?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
                     function (confirmed) {
                         if (confirmed) {
                             $("#loadingPage").fadeIn();
                             var formData3 = new FormData();
                             var opmlFile = $('#docContract')[0];
                             var vDocumentType = "";
                             formData3.append("opmlFile", opmlFile.files[0]);
                             formData3.append("AccountID", localStorage.AccountID);
                             formData3.append("DocumentID", DocumentID);

                             formData3.append("Counterparty", $("#txtCounterpartyCreate").val());
                             formData3.append("ContractID", $("#txtContractRecElementIDEdit").val());
                             formData3.append("ContractTitle", $("#txtContractRecElementEdit").val());
                             formData3.append("DocumentName", $("#txtDocumentName").val());
                             //manoj
                             formData3.append("BusinessAreaPath", $("#txtBusinessAreaPath").val());
                             //manoj

                             var arrAuthorEdit = $("#ddlAuthorEdit").val();
                             var vAuthorEdit = '';
                             $(arrAuthorEdit).each(function (i, item) {
                                 if (vAuthorEdit == '') {
                                     vAuthorEdit = item;
                                 }
                                 else {
                                     vAuthorEdit += "; " + item;
                                 }
                             });
                             formData3.append("DocumentAuthor", arrAuthorEdit);

                             formData3.append("DocumentLanguage", $("#txtDocumentLanguageEdit").val());
                             formData3.append("HardCopyPhysicalLocation", $("#txtHardCopyPhysicalLocationEdit").val());
                             var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                             var vDocLibFeat = $.grep(veContractFeatures, function (n, i) {
                                 return (n.RowKey == "14" && n.Status == "ON");
                             });
                             if (vDocLibFeat.length > 0) {
                                 formData3.append("DocumentLibraryName", $('#hdContAreaDocLibName').val());
                             }
                             else {
                                 formData3.append("DocumentLibraryName", "Contract Documents");
                             }

                             if ($("input:radio[name=IsFinalizedEdit]:checked").val() == "Yes") {
                                 formData3.append("IsFinalized", "Yes");
                             } else {
                                 formData3.append("IsFinalized", "No");
                             }
                             if ($("input:radio[name=IsStandardEdit]:checked").val() == "Yes") {
                                 formData3.append("IsStandard", "Yes");
                             } else {
                                 formData3.append("IsStandard", "No");
                             }
                             if ($("input:radio[name=IsPrimaryEdit]:checked").val() == "Yes") {
                                 formData3.append("IsPrimary", "Yes");
                             } else {
                                 formData3.append("IsPrimary", "No");
                             }
                             formData3.append("DocumentStatus", $("#ddlDocumentStatusEdit").val());
                             formData3.append("Description", $("#textDescription").val());
                             formData3.append("DocumentExt", $("#spExt").html());
                             if ($("#ddlDocumentType").val() != "0") {
                                 vDocumentType = $("#ddlDocumentType").val();
                             }
                             formData3.append("DocumentType", vDocumentType);
                             formData3.append("ModifiedBy", localStorage.UserName);
                             formData3.append("IsFolder", $("#txtIsFolder").val());

                             formData3.append("ValidFrom", $.datepicker.formatDate('mm/dd/yy', $("#dtValidFromEdit").datepicker('getDate')));
                             formData3.append("ValidTill", $.datepicker.formatDate('mm/dd/yy', $("#dtValidTillEdit").datepicker('getDate')));
                             formData3.append("Reminder1", $("#txtReminder1Edit").val());
                             formData3.append("Reminder1Condition", $("#ddlReminder1Edit").find('option:selected').text());
                             formData3.append("Reminder2", $("#txtReminder2Edit").val());
                             formData3.append("Reminder2Condition", $("#ddlReminder2Edit").find('option:selected').text());
                             formData3.append("Reminder3", $("#txtReminder3Edit").val());
                             formData3.append("Reminder3Condition", $("#ddlReminder3Edit").find('option:selected').text());
                             var arrSendReminderTo = $("#ddlDocRemindToEdit").val();
                             var vSendReminderTo = '';
                             $(arrSendReminderTo).each(function (i, item) {
                                 if (vSendReminderTo == '') {
                                     vSendReminderTo = item;
                                 }
                                 else {
                                     vSendReminderTo += "; " + item;
                                 }
                             });
                             formData3.append("SendReminderTo", vSendReminderTo);
                             var IsContributeUser = 'No';
                             if (typeof contractItem != 'undefined' && contractItem != '') {
                                 IsContributeUser = contractItem.Permission.indexOf('Contribute') == -1 ? 'No' : 'Yes';
                             }
                             formData3.append("IsContributeUser", IsContributeUser);
                             $.ajax({
                                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + DocumentID,
                                 type: 'PUT',
                                 data: formData3,
                                 cache: false,
                                 contentType: false,
                                 headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken },
                                 processData: false,
                                 success: function (document) {
                                     location = location;//"/Contracts/Documents";
                                     if ($("#txtContractRecElementEdit").val() != "") {
                                         GetdocumentIsStandard($("#txtContractRecElementIDEdit").val());
                                     }
                                 },
                                 error: function (Message) {

                                     $("#loadingPage").fadeOut();
                                     swal(Message.responseText);
                                 }

                             });
                             $("#loadingPage").fadeOut();
                         }
                         else {
                             $('.pop_up_Content_Green').parent().removeAttr('disabled');
                         }
                         return;
                     });
            } else {
                $("#loadingPage").fadeIn();
                var formData3 = new FormData();
                var opmlFile = $('#docContract')[0];
                var vDocumentType = "";
                formData3.append("opmlFile", opmlFile.files[0]);
                formData3.append("AccountID", localStorage.AccountID);
                formData3.append("DocumentID", DocumentID);

                formData3.append("Counterparty", $("#txtCounterpartyCreate").val());
                formData3.append("ContractID", $("#txtContractRecElementIDEdit").val());
                formData3.append("ContractTitle", $("#txtContractRecElementEdit").val());
                formData3.append("DocumentName", $("#txtDocumentName").val());
                //manoj
                formData3.append("BusinessAreaPath", $("#txtBusinessAreaPath").val());
                //manoj

                var arrAuthorEdit = $("#ddlAuthorEdit").val();
                var vAuthorEdit = '';
                $(arrAuthorEdit).each(function (i, item) {
                    if (vAuthorEdit == '') {
                        vAuthorEdit = item;
                    }
                    else {
                        vAuthorEdit += "; " + item;
                    }
                });
                formData3.append("DocumentAuthor", arrAuthorEdit);

                formData3.append("DocumentLanguage", $("#txtDocumentLanguageEdit").val());
                formData3.append("HardCopyPhysicalLocation", $("#txtHardCopyPhysicalLocationEdit").val());
                var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                var vDocLibFeat = $.grep(veContractFeatures, function (n, i) {
                    return (n.RowKey == "14" && n.Status == "ON");
                });
                if (vDocLibFeat.length > 0) {
                    formData3.append("DocumentLibraryName", $('#hdContAreaDocLibName').val());
                }
                else {
                    formData3.append("DocumentLibraryName", "Contract Documents");
                }

                if ($("input:radio[name=IsFinalizedEdit]:checked").val() == "Yes") {
                    formData3.append("IsFinalized", "Yes");
                } else {
                    formData3.append("IsFinalized", "No");
                }
                if ($("input:radio[name=IsStandardEdit]:checked").val() == "Yes") {
                    formData3.append("IsStandard", "Yes");
                } else {
                    formData3.append("IsStandard", "No");
                }
                if ($("input:radio[name=IsPrimaryEdit]:checked").val() == "Yes") {
                    formData3.append("IsPrimary", "Yes");
                } else {
                    formData3.append("IsPrimary", "No");
                }
                formData3.append("DocumentStatus", $("#ddlDocumentStatusEdit").val());
                formData3.append("Description", $("#textDescription").val());
                formData3.append("DocumentExt", $("#spExt").html());
                if ($("#ddlDocumentType").val() != "0") {
                    vDocumentType = $("#ddlDocumentType").val();
                }
                formData3.append("DocumentType", vDocumentType);
                formData3.append("ModifiedBy", localStorage.UserName);
                formData3.append("IsFolder", $("#txtIsFolder").val());

                formData3.append("ValidFrom", $.datepicker.formatDate('mm/dd/yy', $("#dtValidFromEdit").datepicker('getDate')));
                formData3.append("ValidTill", $.datepicker.formatDate('mm/dd/yy', $("#dtValidTillEdit").datepicker('getDate')));
                formData3.append("Reminder1", $("#txtReminder1Edit").val());
                formData3.append("Reminder1Condition", $("#ddlReminder1Edit").find('option:selected').text());
                formData3.append("Reminder2", $("#txtReminder2Edit").val());
                formData3.append("Reminder2Condition", $("#ddlReminder2Edit").find('option:selected').text());
                formData3.append("Reminder3", $("#txtReminder3Edit").val());
                formData3.append("Reminder3Condition", $("#ddlReminder3Edit").find('option:selected').text());
                var arrSendReminderTo = $("#ddlDocRemindToEdit").val();
                var vSendReminderTo = '';
                $(arrSendReminderTo).each(function (i, item) {
                    if (vSendReminderTo == '') {
                        vSendReminderTo = item;
                    }
                    else {
                        vSendReminderTo += "; " + item;
                    }
                });
                formData3.append("SendReminderTo", vSendReminderTo);
                var IsContributeUser = 'No';
                if (typeof contractItem != 'undefined' && contractItem != '') {
                    IsContributeUser = contractItem.Permission.indexOf('Contribute') == -1 ? 'No' : 'Yes';
                }
                formData3.append("IsContributeUser", IsContributeUser);
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + DocumentID,
                    type: 'PUT',
                    data: formData3,
                    cache: false,
                    contentType: false,
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken },
                    processData: false,
                    success: function (document) {
                        location = location;//"/Contracts/Documents";
                        if ($("#txtContractRecElementEdit").val() != "") {
                            GetdocumentIsStandard($("#txtContractRecElementIDEdit").val());
                        }
                    },
                    error: function (Message) {

                        $("#loadingPage").fadeOut();
                        swal(Message.responseText);
                    }

                });
            }
        }
        else {
            if (edithref == "#edit") {
                $('.pop_up_Content_Green').parent().removeAttr('disabled');
            }
            autoscroll();
            $("#addNewDocument").animate({
                scrollTop: $(".error").offset().top
            }, 2000);

            $("#addNewDocument").animate({
                scrollTop: $("#errormsg_docContract").offset().top
            }, 2000);
        }
    }
    else {
        if (requiredValidator("addNewDocument")) {
            $("#loadingPage").fadeIn();
            //If uploading file         
            if ($("#ddlDocumentTemplate").attr("class").indexOf('validelement') == -1) {
                //$("#idDocUploadInProgress").css('display', '');
                $('.ui-button-green-text').parent().attr('disabled', 'disabled');
            }
            CheckFolderExist();
        }
        else {
            if (edithref == "#edit") {
                $('.pop_up_Content_Green').parent().removeAttr('disabled');
            }
            autoscroll();
            $("#addNewDocument").animate({
                scrollTop: $(".error").offset().top
            }, 2000);

            $("#addNewDocument").animate({
                scrollTop: $("#errormsg_docContract").offset().top
            }, 2000);
        }
    }
}


function newDocument() {
    var formData = new FormData();
    if ($("#trTemplate").is(":visible")) {
        formData.append("TemplateName", $("#ddlDocumentTemplate").find('option:selected').text());
        formData.append("DocumentName", $("#txtDocumentNameCreate").val());
    } else {
        formData.append("DocumentName", "");
    }

    if (overwritedocument) { //if overwrite is yes
        formData.append("OverWrite", "Yes");
    }

    var tblContentControls = $("#formtblContentControls *").serializeArray();

    //manoj
    //If dropdown is empty
    $('#formtblContentControls .choicevaluecheck').each(function (index) {
        if ($(this)[0].selectedIndex == "0") {
            {
                var nametomodify = $(this)[0].name;
                tblContentControls.map(function (columnname) {
                    if (columnname.name == nametomodify) {
                        columnname.value = "";
                    }
                    return columnname
                });
            }
        }
    });
    //manoj

    var opmlFile = $('#docContract')[0];
    var vDocumentType = "";

    formData.append("opmlFile", opmlFile.files[0]);
    formData.append("AccountID", localStorage.AccountID);
    formData.append("ContractID", $("#txtContractRecElementID").val());

    //manoj
    if ($('#docContract')[0].files[0] != null) {
        var DocumentName_New = $('#docContract')[0].files[0].name;
    }
    if (document.getElementById("fileUploadOCR").style.display != "none") {
        if ($("#fileUploadOCR").is(':checked')) {
            formData.append("DocOCR", "Yes");
        } else {
            formData.append("DocOCR", "No");
        }
    } else {
        formData.append("DocOCR", "No");
    }

    formData.append("ContractTitle", "");

    if ($("#ddlDocumentTypeCreate").val() != "0") {
        vDocumentType = $("#ddlDocumentTypeCreate").val();
    }
    formData.append("DocumentType", vDocumentType);
    formData.append("Counterparty", $("#txtCounterpartyCreate").val());

    if ($("input:radio[name=IsFinalized]:checked").val() == "Yes") {
        formData.append("IsFinalized", "Yes");
    } else {
        formData.append("IsFinalized", "No");
    }
    if ($("input:radio[name=IsPrimary]:checked").val() == "Yes") {
        formData.append("IsPrimary", "Yes");
    } else {
        formData.append("IsPrimary", "No");
    }

    if ($("input:radio[name=IsStandard]:checked").val() == "Yes") {
        formData.append("IsStandard", "Yes");
    } else {
        formData.append("IsStandard", "No");
    }

    if ($("#ddlDocumentStatus").val() != "0") {
        formData.append("DocumentStatus", $("#ddlDocumentStatus").val());
    }
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vDocLibFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "14" && n.Status == "ON");
    });
    if (vDocLibFeat.length > 0) {
        formData.append("DocumentLibraryName", $('#hdContAreaDocLibName').val());
    }
    else {
        formData.append("DocumentLibraryName", "Contract Documents");
    }

    formData.append("LocationURL", $('#lblFolderUrl').text())

    formData.append("NewFolderName", $('#txtNewFolderName').val())

    if ($("input:radio[name=rad_Copy]:checked").val() == "Library") {
        formData.append("DocumentLocation", "Office 365 Document Library");
    } else {
        formData.append("DocumentLocation", "Office 365 Document Library & eContracts Cloud");
    }

    formData.append("DocumentLanguage", $("#txtDocumentLanguage").val());
    formData.append("HardCopyPhysicalLocation", $("#txtHardCopyPhysicalLocation").val());

    var arrAuthorCreate = $("#ddlAuthor").val();
    var vAuthorCreate = '';
    $(arrAuthorCreate).each(function (i, item) {
        if (vAuthorCreate == '') {
            vAuthorCreate = item;
        }
        else {
            vAuthorCreate += "; " + item;
        }
    });
    formData.append("DocumentAuthor", arrAuthorCreate);

    formData.append("CreatedBy", localStorage.UserName);
    formData.append("ModifiedBy", localStorage.UserName);

    formData.append("BusinessArea", $("#txtBusinessArea").val());
    formData.append("BusinessAreaPath", $("#txtBusinessAreaPath").val());
    formData.append("ValidFrom", $.datepicker.formatDate('mm/dd/yy', $("#dtValidFrom").datepicker('getDate')));
    formData.append("ValidTill", $.datepicker.formatDate('mm/dd/yy', $("#dtValidTill").datepicker('getDate')));
    formData.append("Reminder1", $("#txtReminder1").val());
    formData.append("Reminder1Condition", $("#ddlReminder1").find('option:selected').text());
    formData.append("Reminder2", $("#txtReminder2").val());
    formData.append("Reminder2Condition", $("#ddlReminder2").find('option:selected').text());
    formData.append("Reminder3", $("#txtReminder3").val());
    formData.append("Reminder3Condition", $("#ddlReminder3").find('option:selected').text());
    formData.append("ContractArea", $("#txtContractAreaName").val());
    formData.append("ContractAreaAdministrators", $("#txtContractAreaAdministrators").val());
    formData.append("BusinessAreaOwners", $("#lblBusinessAreaOwners").text().trim());
    formData.append("CreatingFromContractForm", "No");

    var arrSendReminderTo = $("#ddlDocRemindTo").val();
    var vSendReminderTo = '';
    $(arrSendReminderTo).each(function (i, item) {
        if (vSendReminderTo == '') {
            vSendReminderTo = item;
        }
        else {
            vSendReminderTo += "; " + item;
        }
    });

    formData.append("SendReminderTo", vSendReminderTo);

    if (tblContentControls != null) {
        var tblContentControlslength = tblContentControls.length;
        for (var i = 0; i < tblContentControlslength; i++)
            formData.append(tblContentControls[i].name, tblContentControls[i].value);
    }
    formData.append("DocDescription", $("#txtDescription").val());
    if ($("#trTemplate").is(":visible")) {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/automation',
            type: 'POST',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            //async: false,
            data: {
                TemplateName: "",
                DocumentName: $("#txtDocumentNameCreate").val(),
                ContractID: getParameterByName('ContractID'),
                Status: "",
                SendBy: "",
                RemindLater: "",
            },
            cache: false,
            success: function (rowKey) {
                formData.append("DocumentInAutomation", rowKey);
                //manoj
                if (!ReplaceDocClick) {
                    if ($("#txtContractRecElementID").val() != null && $("#txtContractRecElementID").val() != "" && $("#txtContractRecElement").val() != null && $("#txtContractRecElement").val() != "") {
                        if (!$.isEmptyObject(arrRelatedContracts)) {
                            CreateRelatedContract($("#txtContractRecElementID").val().trim(), $("#txtContractRecElement").val().trim())
                        }
                    }
                } else {
                    if (!$.isEmptyObject(arrRelatedContracts)) {
                        CreateRelatedContract(selecteddocumententity.ContractID, selecteddocumententity.ContractTitle)
                    }
                }
                SendDocumentToUpload(formData);
                //manoj
            }, error: function (rowKey) {
                SendDocumentToUpload(formData)
            }
        });
    } else {
        SendDocumentToUpload(formData);
    }
}

//manoj
function SendDocumentToUpload(formData) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken },
        processData: false,
        success: function (person) {
            $("#idDocUploadInProgress").css('display', 'none');
            $("#uploaddocumentprocess").css('display', 'none');
            $('.ui-button-green-text').parent().removeAttr('disabled');
            if ($("#ddlDocumentTemplate").attr("class").indexOf('validelement') >= 0) {
                setTimeout(funcMessageAfterDocGeneration, 10000);
            }
            else {
                funcMessageAfterDocGeneration(true);
            }
        },
        error: function (person) {
            $("#loadingPage").fadeOut();
            funcMessageAfterDocGeneration(true);
            $("#idDocUploadInProgress").css('display', 'none');
            $("#uploaddocumentprocess").css('display', 'none');
            $('.ui-button-green-text').parent().removeAttr('disabled');
        }
    });
}
//manoj

function funcMessageAfterDocGeneration(objvalue) {
    $("#addEditDocument").dialog("close");
    //$("#ddlDocumentTypeCreate").find('option[value="Primary Agreement"]').prop("selected", true);
    $("#ddlDocumentTemplate").val("0");
    $("#txtDocumentNameCreate").val("");
    $("#textDescription").val('');
    $('#txtFolderName').val("");
    $('#txtNewFolderName').val("");
    $('#txtCounterpartyCreate').val("");
    if ($("#spBusinessArea")[0].style.display != "none") {
        $('#txtBusinessArea').val("");
        $('#txtBusinessAreaPath').val("");
        $('#txtContractAreaName').val("");
    }
    $('#dtValidFrom').val("");
    $('#dtValidTill').val("");
    $('#txtReminder1').val("");
    $('#txtReminder2').val("");
    $('#txtReminder3').val("");
    $("#ddlReminder1").find('option[value="before"]').prop("selected", true);
    $("#ddlReminder2").find('option[value="before"]').prop("selected", true);
    $("#ddlReminder3").find('option[value="before"]').prop("selected", true);
    $('#txtContractAreaAdministrators').val("");
    $('#txtBusinessAreaOwners').val("");
    $("#loadingPage").fadeOut();
    //swal("", "Document created from template.");

    if (typeof objvalue != "undefined" && objvalue == true) {
        reloadlistDocuments();
    } else {
        //manoj
        swal({
            title: '',
            text: "Document created from template.",
            type: 'warning',
            //showCancelButton: true,
            confirmButtonText: 'OK',
            //cancelButtonText: 'No',
            html: true
        },
         function (confirmed) {
             if (confirmed) {
                 $("#loadingPage").fadeOut();
                 //location = location;
                 reloadlistDocuments();
             }
             return;
         });
    }
    //manoj
}

function CheckDocumentExist() {
    var vDocURL = "";
    if ($("#ddlDocumentTemplate").is(":visible")) {
        vDocURL = localStorage.SPHostUrl + $('#lblFolderUrl').text() + $('#txtDocumentNameCreate').val() + ".docx";
    }
    else {
        if ($('#docContract')[0].files[0] != null) {
            //manoj
            var DocumentName_New = $('#docContract')[0].files[0].name;
            if (document.getElementById("fileUploadOCR").style.display != "none") {
                if ($("#fileUploadOCR").is(':checked')) {
                    DocumentName_New = $('#docContract')[0].files[0].name.split('.').slice(0, -1).join(".") + ".pdf";
                }
            }
            //manoj
            vDocURL = localStorage.SPHostUrl + $('#lblFolderUrl').text() + DocumentName_New;
        }
    }
    if (vDocURL == "") {
        uploadorcreatedocument(false);
    } else {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?docurl=' + vDocURL,
            type: 'GET',
            dataType: 'json',
            'Content-Type': 'application/json',
            cache: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            success: function (folder) {
                uploadorcreatedocument(true);
            },
            error:
            function (data) {
                uploadorcreatedocument(false);
            }
        });
    }
}

//function newDocument2() {
//    var formData = new FormData();
//    var opmlFile = $('#docContract')[0];
//    var vDocumentType = "";

//    formData.append("opmlFile", opmlFile.files[1]);
//    formData.append("AccountID", localStorage.AccountID);

//    formData.append("ContractID", $("#txtContractRecElementID").val());
//    formData.append("ContractTitle", "");

//    if ($("#ddlDocumentTypeCreate").val() != "0") {
//        vDocumentType = $("#ddlDocumentTypeCreate").val();
//    }
//    formData.append("DocumentType", vDocumentType);

//    if ($("#ddlDocumentTemplate").is(":visible")) {
//        formData.append("TemplateName", $("#ddlDocumentTemplate").find('option:selected').text());
//        formData.append("DocumentName", $("#txtDocumentNameCreate").val())

//    } else {
//        formData.append("DocumentName", "")
//    }


//    if ($("input:radio[name=IsFinalized]:checked").val() == "Yes") {
//        formData.append("DocumentLibraryName", "Finalized Documents");
//        if ($('#txtFolderName').val() != "") {
//            formData.append("LocationURL", $('#txtFolderName').val())
//            formData.append("FolderName", $('#txtFolderName').val())
//        } else {
//            formData.append("LocationURL", "Finalized Documents")
//            formData.append("FolderName", $('#txtNewFolderName').val())
//            formData.append("NewFolderName", $('#txtNewFolderName').val())
//        }

//    } else {
//        formData.append("DocumentLibraryName", "Draft Documents");
//        if ($('#txtFolderName').val() != "") {
//            formData.append("LocationURL", $('#txtFolderName').val())
//            formData.append("FolderName", $('#txtFolderName').val())
//        } else {
//            formData.append("LocationURL", "Draft Documents")
//            formData.append("FolderName", $('#txtNewFolderName').val())
//            formData.append("NewFolderName", $('#txtNewFolderName').val())
//        }
//    }

//    if ($("input:radio[name=rad_Copy]:checked").val() == "Library") {
//        formData.append("DocumentLocation", "Office 365 Document Library");
//    } else {
//        formData.append("DocumentLocation", "Office 365 Document Library & eContracts Cloud");
//    }

//    formData.append("CreatedBy", localStorage.UserName);
//    formData.append("ModifiedBy", localStorage.UserName);
//    $.ajax({
//        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents',
//        type: 'POST',
//        data: formData,
//        cache: false,
//        contentType: false,
//        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken },
//        processData: false,
//        success: function (person) {
//            if ($("#ddlDocumentTemplate").attr("class").indexOf('validelement') >= 0) {
//                swal("", "Document generation is inprogress.");
//                $("#addEditDocument").dialog("close");
//                $("#ddlDocumentTypeCreate").val("0");//$("#ddlDocumentTypeCreate").find('option[value="Primary Agreement"]').prop("selected", true);
//                $("#textDescription").val('');
//                $("#ddlDocumentTemplate").val("0");
//                $("#txtDocumentNameCreate").val("");
//                $('#txtFolderName').val("");
//                $('#txtNewFolderName').val("");
//            }
//            else {
//                location = location;//"/Documents";
//            }
//        }
//    });
//}

$('#btnSelectFolder').click(function () {

    $("#browse_treeviewFolder").dialog("option", "title", "Select Folder");
    $("#browse_treeviewFolder").dialog("open");

});

function selectfolderselection() {
    var spltr = fileurldetails.split("/");
    var lenthde = spltr.length;
    $('#lblFolderUrl').text("/" + spltr[lenthde - 2] + "/" + spltr[lenthde - 1] + "/");
    $('#txtNewFolderName').val = spltr[lenthde - 1];
    $("#treeviewFolderMove").dialog("close");
}
var articleDocuments = "";
//function CreateFolderToMove(parentFolderName, ContarctNameselection) {
//    $('#load').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
//    newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/folderstructure?documentlibrary=' + parentFolderName;
//    $.ajax({
//        url: newurl,
//        type: 'GET',
//        dataType: 'json',
//        'Content-Type': 'application/json',
//        cache: false,
//        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName },
//        success: function (folder) {
//            for (var xyz = 0; xyz < folder.length; xyz++) {
//                var checking = folder[xyz].Folder;
//                var checking1 = checking.split("/");
//                folder[xyz].Folder = checking1[1];
//            }
//            $('#load').empty();
//            var inline2 = new kendo.data.HierarchicalDataSource({
//                data: folder,
//                schema: {
//                    model: {
//                        children: "childrenData"
//                    }
//                }
//            });

//            var treeview = $("#treeviewFolderMove").kendoTreeView({
//                template: kendo.template($("#treeviewFolderMove-template").html()),

//                dataSource: inline2,
//                loadOnDemand: false,
//                schema: {
//                    model: {
//                        id: "RowKey",
//                        fields: {
//                            Folder: "Folder",
//                            FolderURL: "FolderURL"
//                        }
//                    }
//                },
//                select: function (e) {
//                    e.preventDefault();
//                    var tree = $('#treeviewFolderMove').data('kendoTreeView');
//                    var dataItem = tree.dataItem(e.node);
//                    var strFolderUrl = dataItem.FolderURL + "/";
//                    fileurldetails = dataItem.FolderURL;
//                }
//            }).data("kendoTreeView");

//            treeview.expand(".k-item");
//        },
//        error:
//            function (data) {
//            }
//    });
//}
function treeviewFolder_Create(parentFolderName) {
    $("#loadingPage").fadeIn();
    $('#tbodytreeviewFolder').empty();
    /* Document treeview Popup Start */
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/treeview?documentname=' + parentFolderName,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName },
        success: function (data) {
            recursiveIterationDocuments(data)
            $("#tbodytreeviewFolder").append(articleDocuments);
            if (articleDocuments == "") {
                $("#tbodytreeviewFolder").append("<tr><td><p class='f_p-error'>No Folder Structure Found.</p></td></tr>");
            }
            articleDocuments = "";
            $("#example-basic-treeviewFolder").treetable({ expandable: true, initialState: "expanded" });
            $("#loadingPage").fadeOut();
            $("#browse_treeviewFolder").dialog("option", "title", "Select Folder");
            $("#browse_treeviewFolder").dialog("open");
        },
        error:
        function (data) {
            if (articleDocuments == "") {
                $('#tbodytreeviewFolder').empty();
                $("#tbodytreeviewFolder").append("<tr><td><p class='f_p-error'>No Folder Structure Found.</p></td></tr>");
                $("#loadingPage").fadeOut();
                $("#browse_treeviewFolder").dialog("option", "title", "Select Folder");
                $("#browse_treeviewFolder").dialog("open");
            }
        }
    });
    /* Document treeview Popup End */
}

var previousidglobalDoc = "";
function recursiveIterationDocuments(object) {
    for (var i = 0; i < object.length; i++) {
        var item = object[i];
        var additional = "";

        additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:folderselected(this,\'' + item.DocumentName + '\')">' + item.DocumentName + '</span>'

        if (item.ChildrenData.length == 0) {
            articleDocuments += '<tr data-tt-id="tre-' + item.RowKey + '" class="branch expanded">';
            articleDocuments += '<td class="treeHead"><span id="ParentFolderID" style="display:none;">' + item.ParentFolderID + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/folder.png" /><small>' + additional + '</small></td></tr>';
        } else {
            articleDocuments += '<tr data-tt-id="tre-' + item.RowKey + '" data-tt-parent-id="tre-' + item.ParentFolderID + '" class="branch collapsed" style="display: table-row;">';
            articleDocuments += '<td><span id="ParentFolderID" style="display:none;">' + item.ParentFolderID + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/folder.png" /><small>' + additional + '</small></td></tr>';

            if (item.ChildrenData.length != 0) {
                for (var j = 0; j < item.ChildrenData.length; j++) {
                    var itemchild = item.ChildrenData[j];

                    additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:folderselected(this,\'' + item.DocumentName + "/" + itemchild.DocumentName + '\')">' + itemchild.DocumentName + '</span>'
                    articleDocuments += '<tr data-tt-id="tre-' + itemchild.RowKey + '" data-tt-parent-id="tre-' + itemchild.ParentFolderID + '" class="branch collapsed" style="display: table-row;">';
                    articleDocuments += '<td><span id="ParentFolderID" style="display:none;">' + itemchild.ParentFolderID + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/folder.png" class="padding_left_65px" /><small>' + additional + '</small></td></tr>';

                }
            }

        }

    }

}

function folderselected(name, urlfolder) {
    $("#tbodytreeviewFolder span").css("background-color", "");
    $("#tbodytreeviewFolder span").css("color", "#3487ce");
    $(name).css('background-color', '#3F91CC');
    $(name).css('color', '#ffffff');
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vDocLibFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "14" && n.Status == "ON");
    });
    if (vDocLibFeat.length > 0) {
        $('#txtFolderURLNew').val('/' + $('#hdContAreaDocLibName').val() + '/' + urlfolder);
    }
    else {
        $('#txtFolderURLNew').val('/Contract Documents/' + urlfolder);
    }

}


$(document).ready(function () {
    var ContractDocApprovalTextarea = new nicEditor({ buttonList: ['bold', 'italic', 'underline', 'strikethrough', 'left', 'center', 'right', 'justify', 'ol', 'ul', 'fontSize', 'fontFamily', 'fontFormat', 'removeformat', 'hr', 'indent', 'outdent', 'link', 'unlink', 'forecolor', 'bgcolor', 'xhtml'] }).panelInstance('txtComment');
    $('.nicEdit-panelContain').parent().width('100%');
    $('.nicEdit-panelContain').parent().next().width('100%');
    $('.nicEdit-main').width("99%");
    $("#addNewView").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Add View",
        modal: true,
        resizable: true,
        buttons: {
            "Save": function () { SaveView('false'); },
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
    showalldocuments();

    GetSavedViews();
    $("#btnAddView").css('display', 'none');
});
$(window).on('load', function () {
    $('.nicEdit-panelContain').parent().width('100%');
    $('.nicEdit-panelContain').parent().next().width('100%');
    $('.nicEdit-main').width("99%");
});
function GetSavedViews() {
    $('#liDocumentViews').empty();
    //Get Contract views
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/savedview?viewfor=Document&userid=',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $("#divChkSelectAll").css('display', '');
            $("#liDocumentViews").empty();
            var article = "";
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];

                var removeBtn = '';
                if (localStorage.UserType.indexOf("Global Contract Owner") >= 0 || localStorage.UserType.indexOf("Global Administrator") >= 0 || localStorage.UserName == item.CreatedBy)
                    removeBtn = '<a href="javascript:void(0);"><img title="Delete" src="../Content/Images/close-quick.png" onclick="deleteSavedView(this)" id=' + item.RowKey + ' /></a>';

                if (typeof item.isAdvanceView == 'undefined' || item.isAdvanceView != 'Yes')
                    article = '<li><p><a href="javascript:void(0)" data-isAdvance="No"   style="width: auto;" onclick="javascript:savedViewDisplay(this)" id="' + item.RowKey + '" name="' + item.ViewName + '" title="' + item.ViewName + '">' + item.ViewName + '</a></p>' + removeBtn + '</li>';
                else
                    article = '<li><p><a href="javascript:void(0)" data-isAdvance="Yes" style="width: auto;" onclick="javascript:savedViewDisplay(this)" id="' + item.RowKey + '" name="' + item.ViewName + '" title="' + item.ViewName + '">' + item.ViewName + '</a></p>' + removeBtn + '</li>';
                $("#liDocumentViews").append(article);
            }

            if (showAfterSave == "add" && typeof showAfterSave != "undefined") {
                if (personData != "") {
                    var viewObj = $("#liDocumentViews li p a").filter('[id*=' + '"' + personData.split('&')[0] + '"' + ']');
                    $("#loadingPage").fadeOut();
                    if (viewObj.length > 0)
                        savedViewDisplay(viewObj[0])
                }
            }
            else if (showAfterSave == "update" && typeof showAfterSave != "undefined") {
                var viewObj = $("#liDocumentViews li p a").filter('[id*=' + '"' + $("#txtViewID").val() + '"' + ']');
                $("#loadingPage").fadeOut();
                if (viewObj.length > 0)
                    savedViewDisplay(viewObj[0])
            }
        },
        error:
            function (data) {
                $('#liDocumentViews').empty();
                $("#liDocumentViews").append('<p class="f_p-error">No items found.</p>');
                $("#divChkSelectAll").css('display', 'none');
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
                     showalldocuments();
                 }
             });
         }
         return;
     });

}
function showalldocuments() {
    if (thisBusinessAreaPath != "") {
        IsDropDownsEmpty = false;
    }
    else {
        IsDropDownsEmpty = true;
        //manoj
        //Displaying all document not in Business area dash board
        $("#filterDocumentType").html("<option value='All' selected='selected'>All</option>")
        quickviewbinddocumenttype();
        //Displaying all document not in Business area dash board
        //manoj
    }
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "4" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        $("#li_bulkUpload").css("display", "");
        $("#btnAddDocument1").css("display", "");
        $("#btnAddDocument2").css("display", "none");
    } else {
        $("#li_bulkUpload").css("display", "none");
        $("#btnAddDocument1").css("display", "none");
        $("#btnAddDocument2").css("display", "");
    }
    $("#showAll").css('display', 'inline');
    $("#btnAddView").css('display', 'none');
    $("#liFiltersDocumentType").empty();
    $("#liFiltersLibraryName").empty();
    $("#liFiltersCreationMode").empty();
    $("#liFiltersSearchText").empty();
    $("#filterDocumentType option:selected").prop('selected', false);
    $("#filterLibraryName option:selected").prop('selected', false);
    $("#filterCreationMode option:selected").prop('selected', false);

    $("#launcher4").css('display', '');
    $("#divSearch").css('display', '');
    $("#btnFilter").css('display', '');
    $('#SelectAll').attr('checked', false);
    $("input:checkbox[name=ContRec]").attr('checked', false);
    $("#btnMultipleAction").css('display', 'none');
    multipleChecksDocumentID = [];
    multipleChecks = "";
    multipleChecksurl = "";
    colorLink('liDocumentViews a', false);
    colorLink('liDocumentViews span', false);
    colorLink('liQuickView a', false);
    colorLink('liQuickView span', false);
    colorLink('spnAllDocuments', true);
    $("#txtSearchBox").val('');
    $("#txtSearchBox").attr("placeholder", "Search in '" + $("#spnAllDocuments").text() + "'");
    $("#conSortByOptions").prop('disabled', false).niceSelect('update');
    $("#showAll").empty();
    clearsection();
    $("#footerPage").css('display', '');
    applyFilter();
    Folderselection = "";
}


function showClearalldocuments() {
    $("#showAll").css('display', 'inline');
    $("#btnAddView").css('display', 'none');
    $("#liFiltersDocumentType").empty();
    $("#liFiltersLibraryName").empty();
    $("#liFiltersCreationMode").empty();
    $("#liFiltersSearchText").empty();
    $("#filterDocumentType option:selected").prop('selected', false);
    $("#filterLibraryName option:selected").prop('selected', false);
    $("#filterCreationMode option:selected").prop('selected', false);

    $("#launcher4").css('display', '');
    $("#divSearch").css('display', '');
    $("#btnFilter").css('display', '');

    $("#showAll").empty();
    $("#footerPage").css('display', '');

    applyFilter();
    Folderselection = "";
}

function quickViewDisplay(obj) {
    $("#showAll").empty();
    clearsection();
    $("#btnAddView").css('display', 'none');
    colorLink('liDocumentViews a', false);
    colorLink('liDocumentViews span', false);
    colorLink('liQuickView a', false);
    colorLink('liQuickView span', false);

    $("#showAll").css('display', 'none');
    colorLink('spnAllDocuments', false);
    colorLink(obj.id, true);
    selectedSortOption = "";
    $('#SelectAll').attr('checked', false);
    $("input:checkbox[name=ContRec]").attr('checked', false);
    multipleChecksDocumentID = [];
    multipleChecks = "";
    multipleChecksurl = "";
    $("#btnMultipleAction").css('display', 'none');
    $("#txtSearchBox").val('');
    $("#txtSearchBox").attr("placeholder", "Search in '" + obj.innerText + "'");
    $("#liFiltersSearchText").empty();
    $("#liFiltersDocumentType").empty();
    $("#liFiltersLibraryName").empty();
    $("#liFiltersCreationMode").empty();
    $("#filterDocumentType option:selected").prop('selected', false);
    $("#filterLibraryName option:selected").prop('selected', false);
    $("#filterCreationMode option:selected").prop('selected', false);
    $('#tdSort a').each(function (i, item) {
        item.style.backgroundColor = "";
    });
    $("#liFiltersQuickView").empty();
    $("#liAdvanceViewFilter").empty();
    $('#liFiltersQuickView').html('<li style="display:inline;">' + 'Showing search result for : ' + obj.name + '<img title="Remove" onclick="javascript:liRemove(this);" style="margin-left: 5px; margin-right: 10px; cursor:pointer;" src="../Content/Images/icon/close.png" /></li>');
    $('#liFiltersQuickView').css('display', 'none');
    $("#conSortByOptions").prop('disabled', false).niceSelect('update');
    if (obj.name == "Finalized Documents") {
        FilterDocuments("Yes");
        quickviewbinddocumenttype();
        colorLink('spnFinalizedDocuments', true);
        colorLink('spnDraftDocuments', false);
        colorLink('spnNotTagged', false);
        $("#btnAddView").css('display', 'none');
    }
    else if (obj.name == "Draft Documents") {
        FilterDocuments("No");
        quickviewbinddocumenttype();
        colorLink('spnFinalizedDocuments', false);
        colorLink('spnDraftDocuments', true);
        colorLink('spnNotTagged', false);
        $("#btnAddView").css('display', 'none');
    }
    else if (obj.name == "Not tagged to Contract Record") {
        colorLink('spnFinalizedDocuments', false);
        colorLink('spnDraftDocuments', false);
        colorLink('spnNotTagged', true);
        GetNotTaggedDocuments();
        quickviewbinddocumenttype();
        $("#btnAddView").css('display', 'none');
    }
    showQuickViewFilter(obj.name);
}

function colorLink(objId, tobecolored) {
    if (tobecolored) {
        $('#' + objId).addClass("active_quick_view");
    }
    else {
        $('#' + objId).removeClass("active_quick_view");
    }
}

function FilterDocuments(IsFinalized) {
    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = encodeURIComponent(localStorage.GlobalBusinessAreaLocation);
    }

    var customQuery = "IsFolder:False;IsFinalized:" + IsFinalized;

    $("#listDocuments").empty();

    newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?showparent=false&searchkeyword=' + encodeURIComponent($.trim($('#txtSearchBox').val())) + '&customquery=' + customQuery + '&sortbyfield=Timestamp&orderby=DESC' + '&type=' + getParameterByName("Type");
    $('#listDocuments').html('<img class="f_p-error" src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: newurl,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessAreaLocation: baname },
        success: function (data) {
            if (data.length == 0) {
                $("#listDocuments").empty();
                $("#listDocuments").append('<p class="f_p-error">No items found.</p>');
                $("#compact-pagination").css('display', 'none');
                $("#SelectAll").hide();
                $("#SelectAllSpan").hide();
                $('#SelectAll').attr('checked', false);
            } else {
                $("#compact-pagination").css('display', '');
                $('#listDocuments').empty();
                GenerateListOfDocuments(data, false, true);
            }
        },
        error:
            function (data) {
                $("#SelectAll").hide();
                $("#SelectAllSpan").hide();
                $('#SelectAll').attr('checked', false);
                $("#listDocuments").empty();
                $("#listDocuments").append('<p class="f_p-error">No items found.</p>');
                $("#compact-pagination").css('display', 'none');
            }
    });
}

function showfolderdocuments(obj, checkstatus) {
    IsDropDownsEmpty = false;
    //manoj
    if (checkstatus == false) {
        var objdetailvalue = obj.parentNode.parentNode.parentNode;
        var contractstatus = $(objdetailvalue).find("#sContractStatus").text();
        var ContractPremission = $(objdetailvalue).find("#Permission").text();
        if ((ContractPremission == "openmenuFolderContribute" || ContractPremission == "openmenuFolder") && (!(contractstatus == "Expired" || contractstatus == "Cancelled" || contractstatus == "Replaced" || contractstatus == "Archived"))) {
            var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
            var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                return (n.RowKey == "4" && n.Status == "ON");
            });
            if (vAccFeat.length > 0) {
                $("#li_bulkUpload").css("display", "");
                $("#btnAddDocument1").css("display", "");
                $("#btnAddDocument2").css("display", "none");
            } else {
                $("#li_bulkUpload").css("display", "none");
                $("#btnAddDocument1").css("display", "none");
                $("#btnAddDocument2").css("display", "");
            }
        } else {
            $("#li_bulkUpload").css("display", "none");
            $("#btnAddDocument1").css("display", "none");
            $("#btnAddDocument2").css("display", "none");
        }
    }
    //manoj
    $("#footerPage").css('display', 'none');
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vDocLibFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "14" && n.Status == "ON");
    });
    if (vDocLibFeat.length > 0) {
        strContractDocumentsUrl = '/' + $('#hdContAreaDocLibName').val() + '/' + obj.text;
    }
    else {
        strContractDocumentsUrl = '/Contract Documents/' + obj.text;
    }
    if ($("#showAll").text().indexOf("/") >= 0) {
        //manoj
        var selectedfolderid = "";
        if (typeof (obj.id) != "undefined") {
            selectedfolderid = obj.id;
        }
        if (typeof (selectedfolderid) != "undefined" && selectedfolderid != null && selectedfolderid != "") {
            var Istagexist = false;
            $("#showAll").find("a").each(function (e) {
                var tid = this.id;
                if (tid == obj.id) {
                    Istagexist = true;
                }
            });

            if (Istagexist) {
                var splitsection = Folderselection.split('~8Y92YagH');
                $("#showAll").empty();
                for (spl = 0; spl < splitsection.length; spl++) {
                    if (splitsection[spl] != "") {
                        if (spl == 0) {
                            $("#showAll").append(splitsection[spl]);
                            Folderselection = splitsection[spl];
                        }
                        if (splitsection[spl].indexOf(obj.id) > -1) {
                            if (spl != 0) {
                                $("#showAll").append('/' + splitsection[spl]);
                                Folderselection += "~8Y92YagH" + splitsection[spl];
                            }
                            break;
                        }
                        else {
                            if (spl != 0) {
                                $("#showAll").append('/' + splitsection[spl]);
                                Folderselection += "~8Y92YagH" + splitsection[spl];
                            }
                        }
                    }
                }
            }
        }


        if ($("#showAll").text().indexOf("/") >= 0) {
            var texttille = obj.id
            Istagexist = false;
            $("#showAll").find("a").each(function (e) {
                var tid = this.id;
                if (tid == obj.id) {
                    Istagexist = true;
                }
            });
        }

        if (Istagexist) {
            $("#showAll").empty();
            var splitsection = Folderselection.split('~8Y92YagH');
            for (spl = 0; spl < splitsection.length; spl++) {
                if (splitsection[spl] != "") {
                    if (splitsection[spl].indexOf(texttille) > -1) {
                        if (spl == 0) {
                            $("#showAll").append(splitsection[spl]);
                            Folderselection = splitsection[spl];
                        }
                        else {
                            $("#showAll").append('/' + splitsection[spl]);
                            Folderselection += "~8Y92YagH" + splitsection[spl];
                        }
                    }
                    else {
                        if (spl == 0) {
                            $("#showAll").empty();
                            $("#showAll").append(splitsection[spl]);
                            Folderselection = splitsection[spl];
                        }
                        else {
                            $("#showAll").append('/' + splitsection[spl]);
                            Folderselection += "~8Y92YagH" + splitsection[spl];
                        }
                    }
                }
            }
        }
        else {
            var Isexist = false;
            var id;
            $("#showAll").find("a").each(function (e) {
                id = this.id;
                if (id == obj.id) {
                    Isexist = true;
                }
            });
            if (!Isexist) {
                var objdetailvalue = obj.parentNode.parentNode.parentNode;
                var datavalueapply = $(objdetailvalue).find("#DocumentLibraryName").text() + '~8Z12XaFH' + $(objdetailvalue).find("#sContractid").text() + '~8Z12XaFH' + $(objdetailvalue).find("#FolderURL").text()
                $("#showAll").append(' / <a href="javascript:void(0)" id=' + obj.id + ' data-value="' + datavalueapply + '" onclick="javascript:showfolderdocuments(this);">' + obj.text + '</a>');
                Folderselection += ' ~8Y92YagH <a href="javascript:void(0)" id=' + obj.id + ' data-value="' + datavalueapply + '" onclick="javascript:showfolderdocuments(this);">' + obj.text + '</a>';
                $("#showAll").css('display', '');
            }
            //$("#showAll").css('display', 'none');
        }

        //manoj

        //var texttille = obj.text
        //if ($("#showAll").text().indexOf(texttille) > -1) {
        //    $("#showAll").empty();
        //    var splitsection = Folderselection.split('~8Y92YagH');
        //    for (spl = 0; spl < splitsection.length; spl++) {
        //        if (splitsection[spl] != "") {
        //            if (splitsection[spl].indexOf(texttille) > -1) {
        //                if (spl == 0) {
        //                    $("#showAll").append(splitsection[spl]);
        //                    spl = splitsection.length;
        //                    Folderselection = splitsection[spl];
        //                }
        //                else {
        //                    $("#showAll").append('/' + splitsection[spl]);
        //                    Folderselection += "~8Y92YagH" + splitsection[spl];
        //                    spl = splitsection.length;
        //                }
        //            }
        //            else {
        //                if (spl == 0) {
        //                    $("#showAll").append(splitsection[spl]);
        //                    Folderselection = splitsection[spl];
        //                }
        //                else {
        //                    $("#showAll").append('/' + splitsection[spl]);
        //                    Folderselection += "~8Y92YagH" + splitsection[spl];
        //                }
        //            }
        //        }
        //    }
        //}
        //else {
        //    var objdetailvalue = obj.parentNode.parentNode.parentNode;
        //    var datavalueapply = $(objdetailvalue).find("#DocumentLibraryName").text() + '~8Z12XaFH' + $(objdetailvalue).find("#sContractid").text() + '~8Z12XaFH' + $(objdetailvalue).find("#FolderURL").text()
        //    $("#showAll").append(' / <a href="javascript:void(0)" id=' + obj.id + ' data-value="' + datavalueapply + '" onclick="javascript:showfolderdocuments(this);">' + obj.text + '</a>');
        //    Folderselection += ' ~8Y92YagH <a href="javascript:void(0)" id=' + obj.id + ' data-value="' + datavalueapply + '" onclick="javascript:showfolderdocuments(this);">' + obj.text + '</a>';
        //    $("#showAll").css('display', '');
        //}

    } else {
        $("#showAll").empty();
        Folderselection = "";
        if ($("#spnFinalizedDocuments").hasClass("active_quick_view")) {
            var objdetailvalue = obj.parentNode.parentNode.parentNode;
            var datavalueapply = $(objdetailvalue).find("#DocumentLibraryName").text() + '~8Z12XaFH' + $(objdetailvalue).find("#sContractid").text() + '~8Z12XaFH' + $(objdetailvalue).find("#FolderURL").text()
            $("#showAll").append('<a href="javascript:void(0)" name="Finalized Documents" onclick="javascript:quickViewDisplay(this);">Finalized Documents</a> / <a href="javascript:void(0)" id=' + obj.id + ' data-value="' + datavalueapply + '" onclick="javascript:showfolderdocuments(this);">' + obj.text + '</a>');
            $("#showAll").css('display', '');
        }
        else if ($("#spnDraftDocuments").hasClass("active_quick_view")) {
            var objdetailvalue = obj.parentNode.parentNode.parentNode;
            var datavalueapply = $(objdetailvalue).find("#DocumentLibraryName").text() + '~8Z12XaFH' + $(objdetailvalue).find("#sContractid").text() + '~8Z12XaFH' + $(objdetailvalue).find("#FolderURL").text()
            $("#showAll").append('<a href="javascript:void(0)" name="Draft Documents" onclick="javascript:quickViewDisplay(this);">Draft Documents</a> / <a href="javascript:void(0)" id=' + obj.id + ' data-value="' + datavalueapply + '" onclick="javascript:showfolderdocuments(this);">' + obj.text + '</a>');
            $("#showAll").css('display', '');
        }
        else {
            var objdetailvalue = obj.parentNode.parentNode.parentNode;
            var datavalueapply = $(objdetailvalue).find("#DocumentLibraryName").text() + '~8Z12XaFH' + $(objdetailvalue).find("#sContractid").text() + '~8Z12XaFH' + $(objdetailvalue).find("#FolderURL").text()
            $("#showAll").append('<a href="javascript:void(0)" onclick="javascript:showalldocuments();">All</a> / <a href="javascript:void(0)" id=' + obj.id + ' data-value="' + datavalueapply + '" onclick="javascript:showfolderdocuments(this);">' + obj.text + '</a>');
            Folderselection = '<a href="javascript:void(0)" onclick="javascript:showalldocuments();">All</a> ~8Y92YagH <a href="javascript:void(0)" id=' + obj.id + ' data-value="' + datavalueapply + '" onclick="javascript:showfolderdocuments(this);">' + obj.text + '</a>';
            $("#showAll").css('display', '');
        }
    }

    //manoj
    bindconarea = true;
    var documentLibraryName = '';
    var contractidvalue = '';
    var FolderURLToPass = '';
    try {
        var selectedfolderdetails = obj.parentNode.parentNode.parentNode;
        documentLibraryName = $(selectedfolderdetails).find("#DocumentLibraryName").text();
        contractidvalue = $(selectedfolderdetails).find("#sContractid").text();
        FolderURLToPass = $(selectedfolderdetails).find("#FolderURL").text();
    } catch (ex) {
        var splitdatavalue = $(obj).attr('data-value').split('~8Z12XaFH');
        documentLibraryName = (splitdatavalue[0] != null && splitdatavalue[0] != "") ? splitdatavalue[0].trim() : splitdatavalue[0];
        contractidvalue = (splitdatavalue[1] != null && splitdatavalue[1] != "") ? splitdatavalue[1].trim() : splitdatavalue[1];;
        FolderURLToPass = (splitdatavalue[2] != null && splitdatavalue[2] != "") ? splitdatavalue[2].trim() : splitdatavalue[2];;
    }
    $('#txtContractRecElementID').val(contractidvalue.trim());
    if (documentLibraryName == 'Draft Documents') {
        $("#radioNo").attr('checked', 'checked');
    }
    else {
        $("#radioYes").attr('checked', 'checked');
    }
    $("#radioNo").prop("disabled", true);
    $("#radioYes").prop("disabled", true);
    $("#lblFolderUrl").prop("disabled", true);
    $("#tblContentControls").empty();
    $("#ddlDocumentTemplate").val("0");
    $("#txtDocumentID").val("");
    $("#txtDocumentIDForEdit").val("");
    $("#txtDocumentNameCreate").val("");

    $("#lblCTitleDoc").text($("#lblContractTitle").text());

    $("#tabUpload").addClass('form-active');
    $("#tabTemplate").removeClass('form-active');

    $("#spInProgress").css('display', 'none');
    $("#trTemplate").css('display', 'none');
    $("#trTemplate1").css('display', 'none');
    $("#trFileUpload").css('display', '');
    $("#docContract").replaceWith($("#docContract").val('').clone(true));

    $("#leftTab").css('display', '');

    $("#trContracts").css('display', '');
    $("#trfinal").css('display', '');
    $("#trselect").css('display', '');
    $("#trnew").css('display', '');
    $("#trcopy").css('display', '');
    $("#ddlDocumentTypeCreate").empty();
    $("#trDuplicate").css('display', 'none');
    $("#trDocumentType").css('display', '');

    //var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    //var vDocLibFeat = $.grep(veContractFeatures, function (n, i) {
    //    return (n.RowKey == "14" && n.Status == "ON");
    //});
    //if (vDocLibFeat.length > 0) {
    //    if (documentLibraryName != "") {
    //        strFinalizedDocumentsUrl = '/' + documentLibraryName.trim() + '/' + documentName;
    //    }
    //    else {
    //        if ($('#hdContAreaDocLibName').val() != "") {
    //            strFinalizedDocumentsUrl = '/' + $('#hdContAreaDocLibName').val() + '/' + documentName;
    //        }
    //        else {
    //            strContractDocumentsUrl = '/Contract Documents/' + documentName;
    //        }
    //    }
    //}
    //else {
    //    strContractDocumentsUrl = '/Contract Documents/' + documentName;
    //}

    $("#dvNewDocument").removeClass('width100');
    //removeValidations('addEditDocument');
    setDocumentUrl(FolderURLToPass);
    //manoj

    $('#listDocuments').html('<img class="f_p-error" src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/documentsinfolder?parentfolderid=' + obj.id,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
        success: function (data) {
            if (typeof data == 'undefined' || data.length == 0) {//NoContent HttpStatusCode Update
                $("#listDocuments").empty();
                $("#listDocuments").append('<p class="f_p-error">No items found.</p>');
                $("#compact-pagination").css('display', 'none');
                $("#SelectAll").hide();
                $("#SelectAllSpan").hide();
                $('#SelectAll').attr('checked', false);
            } else {
                $("#compact-pagination").css('display', '');
                $('#listDocuments').empty();
                GenerateListOfDocuments(data, false, true);
            }
        },
        error:
            function (data) {
                $('#listDocuments').empty();
                $("#listDocuments").append('<p class="f_p-error">No items found.</p>');
                $("#compact-pagination").css('display', 'none');
            }
    });
}

var showAfterSave = "";
var personData = "";
function SaveView(isAdvanceView, operation) {
    if (isAdvanceView == 'false') {
        if ($("#txtViewName").val() == "") {

            swal("", "Enter View Name.");
        }
        else {
            var query = "";
            $("#liFiltersDocumentType span").each(function (i, item) {
                query += "DocumentType:";
                var str = item.textContent;
                query += str + ',';

            });

            var docnames = "";
            $("#liDocumentViews li > p > a").each(function (i, item) {
                if ($.trim($("#txtViewName").val().toLowerCase()) == $.trim(item.innerText.toLowerCase())) {
                    docnames += $.trim(item.innerText.toLowerCase());
                }


            });

            if (query != "") {
                query = query.substring(0, query.length - 1)
                query += ";";
            }
            var IsCreationMode = false;
            $("#liFiltersCreationMode span").each(function (i, item) {
                IsCreationMode = true;
                query += "CreationMode:";
                var str = item.textContent;
                query += str + ',';

            });
            if (IsCreationMode) {
                query = query.substring(0, query.length - 1)
                query += ";";
            }

            if ($("#spnFinalizedDocuments").hasClass("active_quick_view")) {
                if (query.substr(-1) === ";") {
                    query = query + "IsFolder:False;IsFinalized:Yes"
                } else {
                    query = query + ";IsFolder:False;IsFinalized:Yes"
                }
            } else if ($("#spnDraftDocuments").hasClass("active_quick_view")) {
                if (query.substr(-1) === ";") {
                    query = query + "IsFolder:False;IsFinalized:No"
                } else {
                    query = query + ";IsFolder:False;IsFinalized:No"
                }
            } else if ($("#spnNotTagged").hasClass("active_quick_view")) {
                if (query.substr(-1) === ";") {
                    query = query + "ContractID:; IsFolder: False"
                } else {
                    query = query + ";ContractID:; IsFolder: False"
                }
            }
            if (docnames == "") {
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/savedview',
                    type: 'POST',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                    data: {
                        RowKey: $("#txtViewID").val(),
                        ViewName: $("#txtViewName").val(),
                        SearchKeyword: $.trim($('#txtSearchBox').val()),
                        SortBy: '',
                        ViewFor: "Document",
                        ViewQuery: query,
                        CreatedBy: localStorage.UserName,
                        ModifiedBy: localStorage.UserName
                    },
                    cache: false,
                    success: function (person) {
                        $("#txtViewName").val("")
                        GetSavedViews();
                        $("#addNewView").dialog("close");
                    }
                });
            } else {
                swal("View Name already exist, Please provide other view name.");
                docnames = "";
            }
        }
    }
    else {
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
                                    temp = $.datepicker.formatDate('mm/dd/yy', $("#" + $(val).attr('id') + " input:text").filter("[id*='date_value_']").datepicker('getDate'));
                                    query += ' <value>' + $.trim(temp) + '</value>';
                                    break;
                                case "Choice":
                                case "Multi- Choice (Dropdown)":
                                    temp = $("#" + $(val).attr('id') + "  input:text").filter("[id*='choice_value_']").val();
                                    if (temp[temp.length - 1] == ',') {
                                        temp = temp.substr(0, temp.lastIndexOf(','));
                                    }
                                    query += ' <value>' + $.trim(temp) + '</value>';
                                    break;
                                case "User":
                                    temp = $("#" + $(val).attr('id') + " input:text").filter("[id*='user_value_']").val();
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
                                    temp = $.datepicker.formatDate('mm/dd/yy', $("#" + $(val).attr('id') + " input:text").filter("[id*='date_value_']").datepicker('getDate'));
                                    query += ' <value>' + $.trim(temp) + '</value>';
                                    break;
                                case "Choice":
                                case "Multi- Choice (Dropdown)":
                                    temp = $("#" + $(val).attr('id') + " input:text").filter("[id*='choice_value_']").val();
                                    if (temp[temp.length - 1] == ',') {
                                        temp = temp.substr(0, temp.lastIndexOf(','));
                                    }
                                    query += ' <value>' + $.trim(temp) + '</value>';
                                    break;
                                case "User":
                                    temp = $("#" + $(val).attr('id') + " input:text").filter("[id*='user_value_']").val();
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
                    swal('', 'On edit View name cannot be changed, to create new view please click on \'Save as New View\' button');
                } else {

                    var valid = true;
                    var metadata = ""
                    var operator = "";
                    var operatortxt = "";
                    var temp1 = "";
                    var temp2 = "";
                    var errmsg = "";

                    $("#tblfilterConditions tr").each(function (index, val) {
                        metadata = $("#metadata_value_" + index).val();
                        operator = $("#operator_" + index + ' option:selected').val();
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
                                ViewFor: 'Document',
                                ViewQuery: query,
                                DefaultViewName: qvName,
                                CreatedBy: localStorage.UserName,
                                ModifiedBy: localStorage.UserName,
                                isAdvanceView: 'Yes'
                            },
                            cache: false,
                            success: function (person) {
                                personData = person;
                                if (person == "Please provide other view name.") {
                                    $("#loadingPage").fadeOut();
                                    swal("", "View Name already exist, Please provide other view name."); // Bug(eO37164)
                                }
                                else {
                                    $("#addNewAdvanceView").dialog("close");
                                    //swal("", person);
                                    if (operation == 'add') {
                                        //setTimeout(function () {
                                        //    var viewObj = $("#liDocumentViews li p a").filter('[id*=' + '"' + person.split('&')[0] + '"' + ']');
                                        //    if (viewObj.length > 0)
                                        //        savedViewDisplay(viewObj[0])
                                        //}, 5000);
                                        showAfterSave = "add";
                                    } else if (operation == 'update') {
                                        //setTimeout(function () {
                                        //    var viewObj = $("#liDocumentViews li p a").filter('[id*=' + '"' + $("#txtViewID").val() + '"' + ']');
                                        //    if (viewObj.length > 0)
                                        //        savedViewDisplay(viewObj[0])
                                        //}, 5000);
                                        showAfterSave = "update";
                                    }
                                    restoreAdvanceViewIntial();
                                    GetSavedViews();
                                    $("#loadingPage").fadeOut();
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
function setBlankValueToHyphen(tableId) {
    $('#' + tableId + ' tr td').each(function () {
        var cellText = $(this).html();
        if (cellText == '' || cellText == '0') {
            $(this).html('-');
        }


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
        if (workflowRules.RuleName == "Default") {
            if (typeof workflowRules.WorkflowTitle != 'undefined' && workflowRules.WorkflowTitle != "") {
                $("#txtWorkflowTitle").val(workflowRules.WorkflowTitle + ' for ' + $("#hdWorkflowObjectTitle").val());
            } else {
                $("#txtWorkflowTitle").val('Review for ' + $("#hdWorkflowObjectTitle").val());
            }
        }
        else {
            if (typeof workflowRules.WorkflowTitle != 'undefined' && workflowRules.WorkflowTitle != "") {
                $("#txtWorkflowTitle").val(workflowRules.WorkflowTitle + ' for ' + $("#hdWorkflowObjectTitle").val());
            } else {
                $("#txtWorkflowTitle").val(workflowRules.RuleName);
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
            htmlFormatFile += '<select id="ddlAssignTo' + totalFileCount + '" name="AssignTo' + totalFileCount + '"  multiple="multiple" data-placeholder="Select" class="width97 validmultiselect chosenmulti"></select>';
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
    } else if ($("#ddlRule option:selected").text() == "Ad-hoc") {
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
        });
    }
});

function contextMenuWork(action, el, pos) {
    switch (action) {
        case "delete":
            {
                var documentName = $(el).find("#DocumentName").text();
                var documentID = $(el).find("#DocumentID").text();
                swal({
                    title: '',
                    text: "Are you sure you want to <span style=\"font-weight:700\">delete '" + documentName + "'</span>?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
     function (confirmed) {
         if (confirmed) {
             $("#loadingPage").fadeIn();

             var documentID = $(el).find("#DocumentID").text();
             $.ajax({
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + documentID,
                 type: 'DELETE',
                 dataType: 'json',
                 "Content-Type": "application/json",
                 headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                 cache: false,
                 success: function (data) {
                     $("#loadingPage").fadeOut();
                     //location = location;//"/Contracts/Documents";
                     reloadlistDocuments();
                 }
             });
         }
         return;
     });
                break;
            }
        case "edit":
            {

                var documentID = $(el).find("#DocumentID").text();
                var IsFolder = $(el).find("#IsFolder").text();
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + documentID,
                    type: 'GET',
                    dataType: 'json',
                    "Content-Type": "application/json",
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    cache: false,
                    success: function (documententity) {
                        //bind document types
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/contractareadetailsbyname?contractareaname=' + documententity.ContractArea,
                            type: 'GET',
                            dataType: 'json',
                            headers: { 'eContracts-ApiKey': localStorage.APIKey },
                            success: function (data) {
                                $("#ddlDocumentType").empty();
                                $("#ddlDocumentType").append("<option value='0'>--Select--</option>")
                                var array = data.DocumentTypes.replace("; ", ";").split(";");
                                $.each(array, function (i) {
                                    if (array[i].trim() === documententity.DocumentType.trim()) {
                                        $("#ddlDocumentType").append("<option selected value='" + array[i].trim() + "'>" + array[i] + "</option>")
                                    } else {
                                        $("#ddlDocumentType").append("<option value='" + array[i].trim() + "'>" + array[i] + "</option>")
                                    }
                                });
                            },
                            error: function (data) {

                            }
                        });
                        $("#hdIsPrimaryDoc").val((documententity.IsPrimary != null && documententity.IsPrimary != '') ? documententity.IsPrimary : 'NO');
                        $("#hdPrvContractID").val((documententity.ContractID != null && documententity.ContractID != '') ? documententity.ContractID : '');
                        $("#txtBusinessAreaPath").val(documententity.BusinessAreaPath);
                        selecteditems = (documententity.BusinessArea != null && documententity.BusinessArea != '') ? documententity.BusinessArea.split(',') : [];
                        try {
                            thisContractAreaNameC = (documententity.ContractArea != null && documententity.ContractArea != '') ? documententity.ContractArea : "";;
                            treeBusinessAreaName = (documententity.BusinessArea != null && documententity.BusinessArea != '') ? documententity.BusinessArea : "";
                            thisBusinessAreaNameC = (documententity.BusinessArea != null && documententity.BusinessArea != '') ? documententity.BusinessArea : "";;
                            treeBusinessAreaContractAreaName = (documententity.ContractArea != null && documententity.ContractArea != '') ? documententity.ContractArea : "";
                            treeBusinessAreaContractAreaNameOwner = (documententity.ContractAreaAdministrators != null && documententity.ContractAreaAdministrators != '') ? documententity.ContractAreaAdministrators : "";
                            treeBusinessAreaOwner = (documententity.BusinessAreaOwners != null && documententity.BusinessAreaOwners != '') ? documententity.BusinessAreaOwners : "";
                            thisBusinessAreaPath = documententity.BusinessAreaPath;
                            if (thisBusinessAreaPath != null && thisBusinessAreaPath != '') {
                                var rowK = jQuery.grep(BusinessAreaPathRowKey, function (a) {
                                    return a[0] === thisBusinessAreaPath;
                                });
                                if (typeof (rowK) != "undefined" && rowK != null && rowK.length != 0) {
                                    treeBusinessAreaRowKey = rowK[0][1];
                                }
                            }
                        }
                        catch (err) { }

                        var selecteditemslength = selecteditems.length;
                        $('#liSelectedBA').empty();
                        for (var i = 0; i < selecteditemslength; i++) {
                            $('#liSelectedBA').append('<span style="font-size:11px;">' + selecteditems[i] + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelected(this);" style="float:right" /></span>');
                        }

                        $("#txtbusinesssareapathedit").text(documententity.BusinessAreaPath);
                        $("#txtDocumentIDForEdit").val(documententity.RowKey);
                        $("#txtDocumentID").val(documententity.RowKey);
                        $("#textDescription").val(documententity.Description);
                        var vDocName = documententity.DocumentName.split('.');

                        // Take only last string for extension name &  
                        // remaining as fileName - Bug(eO37155)
                        var documentName = documententity.DocumentName.substr(0, documententity.DocumentName.lastIndexOf('.')) || documententity.DocumentName;
                        var fileExtension = documententity.DocumentName.split('.').pop();
                        $("#txtDocumentName").val(documentName);
                        $("#spExt").html(fileExtension);
                        // End

                        GetValuesAndAutoPopulate("ddlAuthorEdit", documententity.DocumentAuthor);
                        $("#txtDocumentLanguageEdit").val(documententity.DocumentLanguage);
                        $("#txtHardCopyPhysicalLocationEdit").val(documententity.HardCopyPhysicalLocation);
                        // $("#spExt").html(vDocName[1]);
                        if (documententity.IsFinalized == "Yes") {
                            $('input[type="radio"][name="IsFinalizedEdit"][value="Yes"]').prop('checked', true);
                            $("#liFinalizedBy").css("display", "");
                            var fFinalizedDate = "";
                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                            { fFinalizedDate = moment(new Date(documententity.FinalizedDate)).format('MM/DD/YYYY'); }
                            else { fFinalizedDate = moment(new Date(documententity.FinalizedDate)).format(localStorage.AppDateFormat); }
                            $("#dvFinalizedBy").html(documententity.FinalizedBy + ' on ' + fFinalizedDate);
                        }
                        else {
                            $('input[type="radio"][name="IsFinalizedEdit"][value="No"]').prop('checked', true);
                            $("#liFinalizedBy").css("display", "none");
                            $("#dvFinalizedBy").html('');
                        }

                        if (documententity.IsStandard == "Yes")
                            $('input[type="radio"][name="IsStandardEdit"][value="Yes"]').prop('checked', true);
                        else
                            $('input[type="radio"][name="IsStandardEdit"][value="No"]').prop('checked', true);

                        if (documententity.IsPrimary == "Yes")
                            $('input[type="radio"][name="IsPrimaryEdit"][value="Yes"]').prop('checked', true);
                        else
                            $('input[type="radio"][name="IsPrimaryEdit"][value="No"]').prop('checked', true);

                        if (documententity.DocumentStatus.trim() == 'Expired') {
                            $("#dtValidFromEdit").val("");
                            $("#dtValidTillEdit").val("");
                            if ($("#linkAddValidity1").text() == "Track document expiration date") {
                                $("#linkAddValidity1").css('display', 'none');
                            }
                            else {
                                $("#linkAddValidity1").click();
                                $("#linkAddValidity1").css('display', 'none');
                            }
                        }
                        else {
                            $("#dtValidFromEdit").val("");
                            $("#dtValidTillEdit").val("");
                            if ($("#linkAddValidity1").text() == "Track document expiration date") {
                                $("#linkAddValidity1").css('display', 'block');
                            }
                            else {
                                $("#linkAddValidity1").click();
                                $("#linkAddValidity1").css('display', 'block');
                            }
                        }
                        $("#ddlDocumentStatusEdit option").filter(function (index) { return $(this).text() === documententity.DocumentStatus; }).prop('selected', true);
                        $("#ddlDocumentType option").filter(function (index) { return $(this).text() === documententity.DocumentType; }).prop('selected', true);

                        $("#txtContractRecElementIDEdit").val(documententity.ContractID);
                        $("#txtContractRecElementEdit").val(documententity.ContractTitle);
                        $("#txtCounterpartyEdit").val(documententity.Counterparty);
                        $("#txtBusinessAreaEdit").val(documententity.BusinessArea);

                        $("#txtBusinessAreaPath").val(documententity.BusinessAreaPath)
                        var cValidFrom = "";
                        if (documententity.ValidFrom != null && documententity.ValidFrom != "") {
                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                            { cValidFrom = moment(new Date(documententity.ValidFrom)).format('MM/DD/YYYY'); }
                            else { cValidFrom = moment(new Date(documententity.ValidFrom)).format(localStorage.AppDateFormat); }
                        }
                        var cValidTill = "";
                        if (documententity.ValidTill != null && documententity.ValidTill != "") {
                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                            { cValidTill = moment(new Date(documententity.ValidTill)).format('MM/DD/YYYY'); }
                            else { cValidTill = moment(new Date(documententity.ValidTill)).format(localStorage.AppDateFormat); }
                        }
                        if (typeof cValidFrom != 'undefined')
                            $("#dtValidFromEdit").val(cValidFrom);
                        if (typeof cValidTill != 'undefined')
                            $("#dtValidTillEdit").val(cValidTill);
                        GetValuesAndAutoPopulate("ddlDocRemindToEdit", documententity.SendReminderTo);
                        $("#txtReminder1Edit").val(documententity.Reminder1);
                        $("#txtReminder2Edit").val(documententity.Reminder2);
                        $("#txtReminder3Edit").val(documententity.Reminder3);
                        if (documententity.Reminder1Condition != '') {
                            $("#ddlReminder1Edit option").filter(function (index) { return $(this).text() === documententity.Reminder1Condition; }).prop('selected', true);
                        }
                        else {
                            $("#ddlReminder1Edit").val('before')
                        }
                        if (documententity.Reminder2Condition != '') {
                            $("#ddlReminder2Edit option").filter(function (index) { return $(this).text() === documententity.Reminder2Condition; }).prop('selected', true);
                        }
                        else {
                            $("#ddlReminder2Edit").val('before')
                        }
                        if (documententity.Reminder3Condition != '') {
                            $("#ddlReminder3Edit option").filter(function (index) { return $(this).text() === documententity.Reminder3Condition; }).prop('selected', true);
                        }
                        else {
                            $("#ddlReminder3Edit").val('before')
                        }

                        if (fileExtension == 'zip' || fileExtension == 'ZIP') {
                            $('#linkAddValidity1').css('display', 'none');
                        } else {
                            $('#linkAddValidity1').css('display', '');
                        }
                    }
                });

                $("#trFileUpload").css("display", "none");

                $("#lblCTitleDoc").text($("#lblContractTitle").text());
                $("#txtIsFolder").val(IsFolder);
                if (IsFolder == "True") {
                    $("#EditDocument").dialog("option", "title", "Edit Folder");
                    $("#lblDocumentName").html('Folder Name');
                    $("#trDocumentTypeEdit").css('display', 'none');
                    $('#trContractTitle').css('display', '');
                } else {
                    $("#EditDocument").dialog("option", "title", "Edit Document Metadata");
                    $("#lblDocumentName").html('Document Name');
                    $("#trDocumentTypeEdit").css('display', '');
                    $('#trContractTitle').css('display', 'none');
                    $("#EditDocument").dialog("option", "width", 800);
                }

               
                $("#EditDocument").dialog("open");
                break;
            }
        case "replace":
            {
                ClearReplaceDocFrom();
                var documentID = $(el).find("#DocumentID").text();
                $('#hdDocumentID').val(documentID);
                $('#txtContractID').val($(el).find("#sContractid").text());
                var documentnamevalue = $(el).find("#DocumentName").text();
                $("#txtDocumentNameReplace").val(documentnamevalue.substring(0, documentnamevalue.lastIndexOf('.')));
                $("#lblReplaceTemplateDescription").text("");
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + documentID,
                    type: 'GET',
                    dataType: 'json',
                    "Content-Type": "application/json",
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    cache: false,
                    success: function (documententity) {
                        addbuttonclick = false;
                        ReplaceDocClick = true;
                        selecteddocumententity = documententity;
                        if (!blIsBusinessArea) {
                            BindDocumentTemplates(documententity.ContractArea)
                        }
                    }
                });

                $("#divReplaceDocument").dialog("option", "title", "Replace Document");
                $("#divReplaceDocument").dialog("open");
                break;
            }
        case "duplicate":
            {
                $("#txtDocumentID").val($(el).find("#DocumentID").text());
                $("#trFileUpload").css('display', 'none');
                $("#trDuplicate").css('display', '');
                $("#leftTab").css('display', 'none');
                $("#trContracts").css('display', '');
                $("#trTemplate").css('display', 'none');
                $("#trTemplate1").css('display', 'none');

                $("#trfinal").css('display', '');
                $("#trselect").css('display', '');
                $("#trnew").css('display', '');
                $("#trcopy").css('display', '');

                $("#trDocumentType").css('display', 'none');
                $("#formTitle").text('Duplicate Document');
                $("#dvNewDocument").addClass('width100');
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + $(el).find("#DocumentID").text(),
                    type: 'GET',
                    dataType: 'json',
                    "Content-Type": "application/json",
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    cache: false,
                    success: function (documententity) {
                        if (documententity.DocumentType != "") {
                            documententity.DocumentType = documententity.DocumentType.trim();
                        }
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/contractareadetailsbyname?contractareaname=' + encodeURIComponent(documententity.ContractArea),
                            type: 'GET',
                            dataType: 'json',
                            headers: { 'eContracts-ApiKey': localStorage.APIKey },
                            cache: false,
                            success: function (documenttypes) {
                                $("#ddlDocumentTypeCreate").empty();
                                var datalenght = documenttypes.DocumentTypes.split(';');
                                $(datalenght).each(function (i, type) {
                                    if (type != null && type != "") {
                                        if (documententity.DocumentType == type.trim()) {
                                            $("#ddlDocumentTypeCreate").append("<option value='" + type + "' selected>" + type + "</option>")
                                        }
                                        else {
                                            $("#ddlDocumentTypeCreate").append("<option value='" + type + "'>" + type + "</option>")
                                        }
                                    }
                                });
                            },
                            error:
                                function (data) {
                                }
                        });
                        var vDocName = documententity.DocumentName.split('.');
                        $("#txtDuplicateDocumentName").val('Copy of ' + vDocName[0]);
                        $("#txtDescription").val(documententity.Description);
                        $("#spDuplicateDocumentExt").html(vDocName[1]);

                        if (documententity.IsFinalized == "Yes") {
                            $('input[name="IsFinalized"][value="Yes"]').prop('checked', true);
                        }
                        $('#spInProgress').css('display', 'none');
                        $("#txtCounterpartyCreate").val(documententity.Counterparty);
                        $('#txtBA').val(documententity.BusinessArea);
                        $("#txtBusinessArea").val(documententity.BusinessArea);
                        $('#txtContractAreaName').val(documententity.ContractArea);
                        $('#txtContractAreaAdministrators').val(documententity.ContractAreaAdministrators);
                        $('#txtBusinessAreaOwners').val(documententity.BusinessAreaOwners);
                        $("#txtBusinessAreaPath").val(documententity.BusinessAreaPath);
                        $("#txtContractRecElement").val(documententity.ContractTitle);

                        treeBusinessAreaName = documententity.BusinessArea
                        treeBusinessAreaContractAreaName = documententity.ContractArea;
                        treeBusinessAreaContractAreaNameOwner = documententity.ContractAreaAdministrators;
                        treeBusinessAreaOwner = documententity.BusinessAreaOwners;
                        $('#liSelectedBA').html('<span style="font-size:11px;">' + treeBusinessAreaName + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelected(this);" style="float:right" /></span>');
                        var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                        var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                            return (n.RowKey == "6" && n.Status == "ON");
                        });
                        if (vAccFeat.length == 0) {
                            $("#spCounterpartyCreate").css("display", "none");
                            $("#txtCounterpartyCreate").prop("readonly", false);
                        }
                        else {
                            if (!bindconarea && ($("#txtContractRecElement").val() == "")) {
                                $("#spCounterpartyCreate").css("display", "");
                            }
                        }
                        $("#txtContractRecElementIDEdit").val(documententity.ContractID);
                        if (documententity.DocumentUrl != null) {
                            var vs = "";
                            for (var vr = 6; vr < documententity.DocumentUrl.split('/').length - 1; vr++) {
                                vs += '/' + documententity.DocumentUrl.split('/')[vr];
                            }
                            if (vs != "") {
                                vs = vs.trim() + '/';
                            }
                            $('#lblFolderUrl').text(vs);

                            if ($("#txtContractRecElement").val() != "") {
                                if (vs.indexOf($("#txtContractRecElement").val()) == -1) {
                                    $("#txtNewFolderName").val($("#txtContractRecElement").val());
                                }
                            }
                        }

                    }
                });


                $("#hdnDocumentAction").val('duplicate');
                $("#addEditDocument").dialog("option", "title", "Duplicate Document");
                $("#addEditDocument").dialog("open");
                break;
            }
        case "download":
            {
                //var LinkURL = $(el).find("a").attr('href');

                //var SourceUrl = "";
                //if (LinkURL == "#") {
                //    SourceUrl = $(el).find("a").attr('seqe')
                //} else {
                //    LinkURL = $(el).find("a").attr('data-value');
                //}
                //SourceUrl = encodeURIComponent(SourceUrl);
                var LinkURL = $(el).find('p#DocumentUrl').html();
                location = localStorage.SPHostUrl + "/_layouts/15/download.aspx?SourceUrl=" + LinkURL;
                break;
            }
        case "viewdetails":
            {
                $("#loadingPage").fadeIn();
                $("#docMetadata").addClass('active_tab pop_up_Harizondal_meta_active');
                $("#docActivities").removeClass('pop_up_Harizondal_meta_active');
                var documentID = $(el).find("#DocumentID").text();
                $("#tblMetadataDetail").empty();
                $('#tblMetadataDetail').append('<tr><td><img src="../Content/Images/icon/loading.gif"/></td></tr>');
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + documentID,
                    type: 'GET',
                    dataType: 'json',
                    "Content-Type": "application/json",
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    cache: false,
                    success: function (documententity) {
                        var vMetadata = '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Document Name</td>';
                        vMetadata += '<td class="text width60">' + documententity.DocumentName + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Description</td>';
                        vMetadata += '<td class="text width60">' + documententity.Description + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Document Type</td>';
                        vMetadata += '<td class="text width60">' + documententity.DocumentType + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Document Author</td>';
                        vMetadata += '<td class="text width60">' + documententity.DocumentAuthor + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Document Language</td>';
                        vMetadata += '<td class="text width60">' + documententity.DocumentLanguage + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Hard-copy Physical Location</td>';
                        vMetadata += '<td class="text width60">' + documententity.HardCopyPhysicalLocation + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Folder (show path)</td>';
                        vMetadata += '<td class="text width60">' + documententity.DocumentUrl + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Business Area</td>';
                        vMetadata += '<td class="text width60">' + documententity.BusinessArea + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Counterparty</td>';
                        vMetadata += '<td class="text width60">' + documententity.Counterparty + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Is Finalized/Ready for Signature?</td>';
                        vMetadata += '<td class="text width60">' + documententity.IsFinalized + '</td>';
                        vMetadata += '</tr>';
                        if (documententity.IsFinalized == "Yes") {
                            vMetadata += '<tr>';
                            vMetadata += '<td class="text_label width40 meta_titles">Finalized/Ready for Signature By</td>';
                            vMetadata += '<td class="text width60">' + documententity.FinalizedBy + ' on ' + moment(new Date(documententity.FinalizedDate)).format('Do MMM YYYY') + '</td>';
                            vMetadata += '</tr>';
                        }
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Is Standard?</td>';
                        vMetadata += '<td class="text width60">' + documententity.IsStandard + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Is Primary?</td>';
                        vMetadata += '<td class="text width60">' + documententity.IsPrimary + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Document Status</td>';
                        vMetadata += '<td class="text width60">' + documententity.DocumentStatus + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Document Version</td>';
                        vMetadata += '<td class="text width60">' + documententity.VersionNo + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Created by</td>';
                        vMetadata += '<td class="text width60">' + documententity.CreatedBy + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Created Date</td>';
                        vMetadata += '<td class="text width60">' + moment(new Date(documententity.Created)).format('Do MMM YYYY') + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Last Updated</td>';
                        vMetadata += '<td class="text width60">' + moment(new Date(documententity.Modified)).format('Do MMM YYYY') + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Shared with</td>';
                        vMetadata += '<td class="text width60">' + documententity.SharedWith + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Reviewed by</td>';
                        vMetadata += '<td class="text width60">' + documententity.Reviewers + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Signee</td>';
                        vMetadata += '<td class="text width60">' + documententity.Signee + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Document File Size</td>';
                        vMetadata += '<td class="text width60">' + documententity.FileSize + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Document Format</td>';
                        vMetadata += '<td class="text width60">' + documententity.DocumentFormat + '</td>';
                        vMetadata += '</tr>';



                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Creation Mode</td>';
                        vMetadata += '<td class="text width60">' + documententity.CreationMode + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Valid From</td>';
                        if (documententity.ValidFrom == null)
                            vMetadata += '<td class="text width60">-</td>';
                        else
                            vMetadata += '<td class="text width60">' + moment(new Date(documententity.ValidFrom)).format('Do MMM YYYY') + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Valid Till</td>';
                        if (documententity.ValidTill == null)
                            vMetadata += '<td class="text width60">-</td>';
                        else
                            vMetadata += '<td class="text width60">' + moment(new Date(documententity.ValidTill)).format('Do MMM YYYY') + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Send Reminder To</td>';
                        if (documententity.SendReminderTo == null)
                            vMetadata += '<td class="text width60">-</td>';
                        else {
                            if (documententity.SendReminderTo == "null")
                                vMetadata += '<td class="text width60">-</td>';
                            else
                                vMetadata += '<td class="text width60">' + documententity.SendReminderTo + '</td>';
                        }
                        vMetadata += '</tr>';
                        $("#tblMetadataDetail").empty();
                        $("#tblMetadataDetail").append(vMetadata);
                        setBlankValueToHyphen("tblMetadataDetail");
                        $("#loadingPage").fadeOut();
                        $('#tblMetadataDetail').css("display", "");
                        $('#documentLogs').css("display", "none");
                        $("#viewMetadataDetail").dialog("option", "title", "Document Details");
                        $("#viewMetadataDetail").dialog("open");
                    },
                    error: function () {

                    }
                });
                $('#documentLogs').css("display", "none");
                $('#compact-pagination-documentLogs').css("display", "none");
                $('#idDocumentPopup').css("display", "none");

                $("#documentLogs").empty();
                $("#documentLogs").html('<tr><td colspan="4"><img src="../Content/Images/icon/loading.gif"/></td></tr>');
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/activities?objecttype=Document&objectid=' + documentID + '&actiontype=',
                    type: 'GET',
                    dataType: 'json',
                    "Content-Type": "application/json",
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName },
                    cache: false,
                    success: function (activities) {
                        var datalenght = activities.length;
                        var article = '';
                        for (var i = 0; i < datalenght; i++) {
                            var item = activities[i];
                            var sObject = item.Object;
                            var sActivity = item.Activity;
                            var sUserID = item.UserID;
                            var sTimestamp = moment(new Date(item.Timestamp)).format('Do MMM, h:mm A');

                            article += '<tr><td><span class="logHis_Datetime">' + sTimestamp + '</span></td><td><b>' + sObject + '</b></td><td><span class="logHis_Activity">' + sActivity + '</span></td><td><span class="logHis_Datetime">' + sUserID + '</span></td></tr>';
                            //var article = '<article class="box1">';
                            //article += '<div>';
                            //article += '<p class="text">' + sTimestamp;
                            //article += '  ' + sActivity + '</p>';
                            //article += '</div>';
                            //article += '</article>';
                            //$("#documentLogs").append(article);
                        }
                        $("#documentLogs").html(article);
                        $('#compact-pagination-documentLogs').pagination({
                            items: activities.length,
                            itemsOnPage: 15,
                            type: 'div',
                            typeID: 'documentLogs',
                            row: 'article',
                            cssStyle: 'compact-theme'
                        });
                    },
                    error: function () {

                    }
                });

                break;
            }
        case "final":
            {
                $("#loadingPage").fadeIn();
                var CanSend = false;
                var ext = $(el).find("#DocumentName").text();
                if (typeof (ext) != "undefined" && ext != "")
                    ext = ext.split('.').pop();
                if (ext.indexOf("doc") > -1 || ext.indexOf("docx") > -1)
                    CanSend = true;
                if (CanSend) {
                    swal({
                        title: '',
                        text: "Please make sure that you have accepted track changes and cleaned up the document. Are you sure you want to mark selected documents as <span style='font-weight:700'>Finalized/Ready for Signature</span>?",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'No',
                        html: true
                    },
                 function (confirmed) {
                     if (confirmed) {
                         var entityid = $(el).find("#DocumentID").text();
                         $.ajax({
                             url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/MarkFinal?documentid=' + entityid,
                             type: 'PUT',
                             cache: false,
                             contentType: false,
                             headers: {
                                 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken, username: localStorage.UserName
                             },
                             processData: false,
                             success: function (document) {
                                 $("#loadingPage").fadeOut();
                                 reloadlistDocuments();
                                 //location = location;
                             }
                         });
                     } else {
                         $("#loadingPage").fadeOut();
                     }
                     return;
                 });
                } else {
                    swal({
                        title: '',
                        text: "Do you really want to mark this document as Finalized/Ready for Signature?",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'No',
                        html: true
                    },
                    function (confirmed) {
                        if (confirmed) {
                            var entityid = $(el).find("#DocumentID").text();
                            $.ajax({
                                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/MarkFinal?documentid=' + entityid,
                                type: 'PUT',
                                cache: false,
                                contentType: false,
                                headers: {
                                    'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken, username: localStorage.UserName
                                },
                                processData: false,
                                success: function (document) {
                                    $("#loadingPage").fadeOut();
                                    reloadlistDocuments();
                                }
                            });
                        } else {
                            $("#loadingPage").fadeOut();
                        }
                        return;
                    });
                }

                break;
            }
        case "signature":
            {
                var Stage = "pipeline";
                var requiredavalible = false;
                if (Stage == 'pipeline') {
                    if ($(el).find("#sContractStatus").text() != "") {
                        var arrstatus = ['Ready for Signature', 'Awaiting Signatures', 'Signed', 'Active', 'Expired', 'Replaced', 'Archived', 'On Hold', 'Cancelled'];
                        if (arrstatus.indexOf($(el).find("#sContractStatus").text().trim()) > -1) {
                            Stage = '';
                        }
                    }
                }
                var documentName = $(el).find("#DocumentName").text();
                var contractArea = $(el).find("#ContractArea").text();
                var sentForSign = $(el).find("#SentForSign").text();
                var DocumentUrl = $(el).find("#DocumentUrl").text();
                var documentID = $(el).find("#DocumentID").text();
                var sContractid = $(el).find("#sContractid").text();
                var isFinalized = $(el).find("#IsFinalized").text();
                var IsPrimaryDoc = $(el).find("#IsPrimaryDoc").text();
                var ext = documentName.split(".").pop();


                var CanSend = false;
                if (typeof (ext) != "undefined" && ext != "")
                    if (ext.indexOf("doc") > -1 || ext.indexOf("docx") > -1 || ext.indexOf("pdf") > -1)
                        CanSend = true;
                if (CanSend) {
                    if (sentForSign == '') {
                        //ShowHideAutoUpdateStatus(sContractid, 'liAutoUpdateStatusSignDoc');
                        if (IsPrimaryDoc == 'Yes')
                            $("#lblAutoUpdateStatusSignDoc").html("Auto update Document & Contract Record status based on this Workflow.");
                        else
                            $("#lblAutoUpdateStatusSignDoc").html("Auto update Document status based on this Workflow.");
                        $("#hdContractID").val(sContractid);
                        if (Stage == 'pipeline') {
                            var contracttypepass = '';
                            var vMetadatavaluetofinalize;
                            var metadataFields = [];
                            $.ajax({
                                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/IContractDetails?contractid=' + sContractid,
                                type: 'GET',
                                dataType: 'json',
                                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                                cache: false,
                                async: false,
                                success: function (mainmetadataFields) {

                                    vMetadatavaluetofinalize = $(mainmetadataFields).find('Metadata');
                                    contracttypepass = $(vMetadatavaluetofinalize).find("ContractType").text();
                                    CompanyProfile = $(vMetadatavaluetofinalize).find("CompanyProfile").text();
                                },
                            });
                            $.ajax({
                                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracttypes/metadatas?contracttypename=' + contracttypepass.trim(),
                                type: 'GET',
                                dataType: 'json',
                                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                                cache: false,
                                async: false,
                                success: function (metadataFieldsvalue) {
                                    if (Stage == "pipeline") {
                                        metadataFields = $.grep(metadataFieldsvalue, function (n, i) {
                                            return (n.Finalizingfrom == "Required");
                                        });
                                    }
                                },
                            });

                            $(metadataFields).each(function (i, item) {
                                if ($(vMetadatavaluetofinalize).find(item.FieldName).text() == null || $(vMetadatavaluetofinalize).find(item.FieldName).text() == "") {
                                    requiredavalible = true;
                                }
                            });
                            if (!requiredavalible) {
                                ClearSignatureForm();
                                //Disable ddlCC Users not related to contract
                                DisableCCUsers(vMetadatavaluetofinalize);
                                $.ajax({
                                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/settings',
                                    type: 'GET',
                                    dataType: 'json',
                                    "Content-Type": "application/json",
                                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                                    cache: false,
                                    success: function (data) {
                                        $("#txtExpIn").val(data.TaskDuration);
                                        $("#lblExpDateddl").html(moment(new Date()).add($("#ddltxtExpIn").val(), "days").format('MM/DD/YYYY'));
                                        $("#lblExpDatetxt").html(moment(new Date()).add(data.TaskDuration, "days").format('MM/DD/YYYY'));
                                    },
                                    error: function () {

                                    }
                                });

                                if (isFinalized != 'Yes') {
                                    var finaltext = "Only <span style='font-weight:700'>Finalized/Ready for Signature</span> documents can be sent out for <span style='font-weight:700'>eSignature</span>. Do you want to mark this document as <span style='font-weight:700'>Finalized/Ready for Signature</span>?";
                                    if (ext.indexOf("doc") > -1 || ext.indexOf("docx") > -1) {
                                        finaltext = "Are you sure all edit/ redlines have been accepted and the document is cleaned up. Only <span style='font-weight:700'>Finalized/Ready for Signature</span> documents can be sent out for <span style='font-weight:700'>eSignature</span>. Do you want to mark this document as <span style='font-weight:700'>Finalized/Ready for Signature</span>?";
                                    }
                                    swal({
                                        title: '',
                                        text: finaltext,
                                        type: 'warning',
                                        showCancelButton: true,
                                        confirmButtonText: 'Yes',
                                        cancelButtonText: 'No',
                                        html: true
                                    },
                                    function (confirmed) {
                                        if (confirmed) {
                                            $(el).find("#IsFinalized").text('Yes');
                                            isFinalized = 'Yes';
                                            $.ajax({
                                                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/MarkFinal?documentid=' + documentID,
                                                type: 'PUT',
                                                cache: false,
                                                contentType: false,
                                                headers: {
                                                    'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken, username: localStorage.UserName
                                                },
                                                processData: false,
                                                success: function (document) {
                                                }
                                            });
                                        }
                                        if (isFinalized == 'Yes') {
                                            $("#hdMarkAsFinal").val("Y");
                                            $("#hdDocumentID").val(documentID);
                                            $("#hdContractArea").val(contractArea);
                                            $("#hdContractID").val(sContractid);
                                            $("#hdDocumentURL").val(DocumentUrl);
                                            $("#tdDocument").html("<b>" + documentName + "</b>");
                                            if (sContractid != "") {
                                                getNameAndEmailSignDocument(sContractid);
                                            }
                                            $('#chkAutoUpdateStatusSignDoc').prop('checked', true);
                                            $("#sendForSignature").dialog("open");
                                        }
                                        return;
                                    });
                                }
                                else {
                                    if (isFinalized == 'Yes') {
                                        $("#hdMarkAsFinal").val("Y");
                                        $("#hdDocumentID").val(documentID);
                                        $("#hdContractArea").val(contractArea);
                                        $("#hdContractID").val(sContractid);
                                        $("#hdDocumentURL").val(DocumentUrl);
                                        $("#tdDocument").html("<b>" + documentName + "</b>");
                                        if (sContractid != "") {
                                            getNameAndEmailSignDocument(sContractid);
                                        }
                                        $('#chkAutoUpdateStatusSignDoc').prop('checked', true);
                                        $("#sendForSignature").dialog("open");
                                    }
                                }
                            } else {
                                swal({
                                    title: '',
                                    text: "Required fields avliable do you want to edit the contract?",
                                    type: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: 'Yes',
                                    cancelButtonText: 'No',
                                    html: true
                                },
                                function (confirmed) {
                                    if (confirmed) {
                                        if (Stage == 'pipeline') {
                                            location = "/Contracts/EditContract?ContractID=" + getParameterByName("ContractID") + "&ContractType=" + encodeURIComponent(contracttypepass) + "&Stage=" + Stage + "&Finalize=true";
                                        }
                                    } else {
                                        $("#loadingPage").fadeOut();
                                    }
                                });
                            }
                        } else {
                            ClearSignatureForm();
                            //Disable ddlCC Users not related to contract
                            $.ajax({
                                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/IContractDetails?contractid=' + sContractid,
                                type: 'GET',
                                dataType: 'json',
                                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                                cache: false,
                                async: false,
                                success: function (mainmetadataFields) {
                                    CompanyProfile = $(mainmetadataFields).find('Metadata').find('CompanyProfile').text();
                                    DisableCCUsers($(mainmetadataFields).find('Metadata'));
                                },
                            });
                            $.ajax({
                                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/settings',
                                type: 'GET',
                                dataType: 'json',
                                "Content-Type": "application/json",
                                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                                cache: false,
                                success: function (data) {
                                    $("#txtExpIn").val(data.TaskDuration);
                                },
                                error: function () {

                                }
                            });

                            if (isFinalized != 'Yes') {
                                var finaltext = "Only <span style='font-weight:700'>Finalized/Ready for Signature</span> documents can be sent out for <span style='font-weight:700'>eSignature</span>. Do you want to mark this document as <span style='font-weight:700'>Finalized/Ready for Signature</span>?";
                                if (ext.indexOf("doc") > -1 || ext.indexOf("docx") > -1) {
                                    finaltext = "Are you sure all edit/ redlines have been accepted and the document is cleaned up. Only <span style='font-weight:700'>Finalized/Ready for Signature</span> documents can be sent out for <span style='font-weight:700'>eSignature</span>. Do you want to mark this document as <span style='font-weight:700'>Finalized/Ready for Signature</span>?";
                                }
                                swal({
                                    title: '',
                                    text: finaltext,
                                    type: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: 'Yes',
                                    cancelButtonText: 'No',
                                    html: true
                                },
                                function (confirmed) {
                                    if (confirmed) {
                                        $(el).find("#IsFinalized").text('Yes');
                                        isFinalized = 'Yes';
                                        $.ajax({
                                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/MarkFinal?documentid=' + documentID,
                                            type: 'PUT',
                                            cache: false,
                                            contentType: false,
                                            headers: {
                                                'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken, username: localStorage.UserName
                                            },
                                            processData: false,
                                            success: function (document) {
                                            }
                                        });
                                    }
                                    if (isFinalized == 'Yes') {
                                        $("#hdMarkAsFinal").val("Y");
                                        $("#hdDocumentID").val(documentID);
                                        $("#hdContractArea").val(contractArea);
                                        $("#hdContractID").val(sContractid);
                                        $("#hdDocumentURL").val(DocumentUrl);
                                        $("#tdDocument").html("<b>" + documentName + "</b>");
                                        if (sContractid != "") {
                                            getNameAndEmailSignDocument(sContractid);
                                        }
                                        $('#chkAutoUpdateStatusSignDoc').prop('checked', true);
                                        $("#sendForSignature").dialog("open");
                                    }
                                    return;
                                });
                            }
                            else {
                                if (isFinalized == 'Yes') {
                                    $("#hdMarkAsFinal").val("Y");
                                    $("#hdDocumentID").val(documentID);
                                    $("#hdContractArea").val(contractArea);
                                    $("#hdContractID").val(sContractid);
                                    $("#hdDocumentURL").val(DocumentUrl);
                                    $("#tdDocument").html("<b>" + documentName + "</b>");
                                    if (sContractid != "") {
                                        getNameAndEmailSignDocument(sContractid);
                                    }
                                    $('#chkAutoUpdateStatusSignDoc').prop('checked', true);
                                    $("#sendForSignature").dialog("open");
                                }
                            }
                        }
                    }
                    else {
                        swal("", "This document has already been sent for signature: " + sentForSign);
                    }
                }
                else {
                    swal("", "This document cannot be sent for signature: Only <span style='font-weight:700'>doc,docx</span> and <span style='font-weight:700'>pdf</span> type files can be sent for signature.");
                }
                break;
            }
        case "editO365":
            {
                var LinkURL = $(el).find('p#DocumentUrl').html()
                //var LinkURL = $(el).find("a").prop('data-value');
                Opendocinbrowser(LinkURL);
                //window.open(LinkURL);
                break;

            }
        case "editclientword":
            {
                //var LinkURL = $(el).find("a").attr('href');
                var LinkURL = $(el).find("a").attr('data-value');
                window.open("ms-word:ofe|u|" + decodeURIComponent(LinkURL), "_self");
                break;
            }
        case "sharelink":
            {
                var DocumentNameToCheck = $(el).find("#DocumentName").text();
                var DocumentExtFormat = ['doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx', 'dotx', 'pdf'];
                if (DocumentExtFormat.indexOf(DocumentNameToCheck.split('.').pop()) > -1) {
                    var ShareWorkflow = $(el).find("#ShareWorkflow").text();
                    //if (ShareWorkflow == "In Progress") {
                    //swal("", "Document negotiation is in progress for this document.");
                    //}
                    //else {

                    ClearShareForm();
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/settings',
                        type: 'GET',
                        dataType: 'json',
                        "Content-Type": "application/json",
                        headers: { 'eContracts-ApiKey': localStorage.APIKey },
                        cache: false,
                        success: function (data) {
                            $("#txtShareExpIn").val(data.TaskDuration);
                            if ($("#txtShareExpIn").val() != "") {
                                $("#txtShareExpIn").trigger("onchange");
                            } else {
                                $("#lblValidLinkDate").empty();
                            }
                            //$("#lblValidLinkDate").html(moment(new Date()).add("days", settings.TaskDuration).format('MM/DD/YYYY'));
                        },
                        error: function () {

                        }
                    });
                    var documentName = $(el).find("#DocumentName").text();
                    var DocumentUrl = $(el).find("#DocumentUrl").text();
                    var documentID = $(el).find("#DocumentID").text();
                    var sContractid = $(el).find("#sContractid").text();
                    var IsPrimaryDoc = $(el).find("#IsPrimaryDoc").text();
                    $("#liAutoUpdateStatusShareDoc").css('display', 'none');
                    //ShowHideAutoUpdateStatus(sContractid, 'liAutoUpdateStatusShareDoc');
                    if (IsPrimaryDoc == 'Yes')
                        $("#lblAutoUpdateStatusShareDoc").html("Auto update Document & Contract Record status to 'Negotiation Complete' when this External Share is completed.");
                    else
                        $("#lblAutoUpdateStatusShareDoc").html("Auto update Document status to 'Negotiation Complete' when this External Share is completed.");
                    $("#hdDocumentID").val(documentID);
                    $("#hdDocumentURL").val(DocumentUrl);
                    $("#tdShareDocument").html("<b>" + documentName + "</b>");
                    if (sContractid != "") {
                        getSigneeNameandEmailId(sContractid, "sharelink");
                        getShareNameandEmailIdInternal(sContractid, "ddlDocumentShareInternal");
                    }
                    $("#shareDocument").dialog("open");
                    //}
                } else {
                    swal("", "This document cannot be Share for negotiation: Only<span style='font-weight:700'> doc, xls, ppt, docx, xlsx, pptx, dotx and pdf </span> type files can be sent for negotiation.");
                }


                break;
            }
        case "approve":
            {
                var documentName = $(el).find("#DocumentName").text();
                var documentID = $(el).find("#DocumentID").text();
                $("#txtTodoTitle").val('Approval for ' + documentName.split('.')[0]);
                $("#ddlTodoType option").filter(function (index) { return $(this).text() === "Document Approval"; }).prop('selected', true);
                $("#txtBrowseElement").val(documentName);
                $("#txtBrowseElementID").val(documentID);
                $("#trBrowse").css("display", "");
                $("#browse").css("display", "none");
                $("#tdBrowseElement").html("Documents");
                $("#dvTodo").dialog("open");
                $('#ddlTodoType').attr('disabled', 'disabled');
                fnChangeAssignedToText();
                break;
            }
        case "review":
            {
                var ReviewWorkflow = $(el).find("#ReviewWorkflow").text();
                var sContractid = $(el).find("#sContractid").text();
                if (ReviewWorkflow == "In Progress") {

                    // swal("", "Document Review is in progress for this Document.");
                    $("#loadingPage").fadeIn();
                    workflowurltoshow = "";
                    var workflowid = "";
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracts/' + sContractid + '/activity',
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
                                    if (ActivityType == "Document Review" && (Status == "In Progress" || Status == "Stopped")) {
                                        if (workflowurltoshow == "") {
                                            workflowurltoshow = '/Activity/TaskDetails?TaskID=&WorkflowID=' + RowKey;
                                        }

                                    }
                                }
                                $("#loadingPage").fadeOut();

                                $("#alertText1").html("Document Review is in progress for this Document.");
                                $("#textingdetails").html('<a target="_blank" title="View Workflow Details" href=' + workflowurltoshow + '><font color="#44A6D8">View Workflow Details</font></a>');
                                $("#dvAlertDetails1").dialog("open");
                            }
                            else {
                                $("#loadingPage").fadeOut();
                                swal("", "Document Review is in progress for this Document.");
                            }
                        },
                        error: function () {
                            $("#loadingPage").fadeOut();
                            swal("", "Document Review is in progress for this Document.");
                        }
                    });
                }
                else {
                    $("#loadingPage").fadeIn();
                    var documentName = $(el).find("#DocumentName").text();
                    var documentID = $(el).find("#DocumentID").text();
                    var businessArea = $(el).find("#BusinessArea").text();
                    var businessAreaPath = $(el).find("#BusinessAreaPath").text();
                    var contractArea = $(el).find("#ContractArea").text();
                    var sContractid = $(el).find("#sContractid").text();
                    ShowHideAutoUpdateStatus(sContractid, 'liAutoUpdateStatus');
                    $("#tblStage").empty();
                    $("#ddlRule").empty();


                    $("#txtWorkflowTitle").val('Review for ' + documentName.split('.')[0]);
                    $("#txtDuration").val("");
                    var nicInstance = nicEditors.findEditor('txtComment');
                    nicInstance.setContent('');
                    NicEditorPasteEvent();
                    $("#hdWorkflowType").val("Document Review");
                    $("#hdWorkflowContractArea").val(contractArea);
                    $("#hdWorkflowBusinessArea").val(businessArea);
                    $("#hdWorkflowBusinessAreaPath").val(businessAreaPath);
                    $("#hdWorkflowObjectID").val(documentID);
                    $("#hdWorkflowObjectTitle").val(documentName);
                    GetValuesAndAutoPopulate("ddlWorkflowCC", "");
                    $('#chkAutoUpdateStatus').prop('checked', true);
                    var IsPrimaryDoc = $(el).find("#IsPrimaryDoc").text();
                    if (IsPrimaryDoc == 'Yes')
                        $("#lblAutoUpdateStatus").html("Auto update Document & Contract Record status based on this Workflow.");
                    else
                        $("#lblAutoUpdateStatus").html("Auto update Document status based on this Workflow.");

                    var vWorkflowSettings = [];
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/evaluate?workflowType=Document Review&contractArea=' + encodeURIComponent(contractArea) + '&businessArea=' + encodeURIComponent(businessArea) + '&contractid=' + documentID,
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
                                //$("#lblDurationDate").html(moment(new Date()).add("days", vWorkflowSettings.TaskDuration).format('MM/DD/YYYY'));
                                workflowAdHoc = item.WorkflowSettings.WorkflowAdHoc;
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
                                if (workflowRules.RuleName == "Default") {
                                    if (typeof workflowRules.WorkflowTitle != 'undefined' && workflowRules.WorkflowTitle != "") {
                                        $("#txtWorkflowTitle").val(workflowRules.WorkflowTitle + ' for ' + documentName);
                                    } else {
                                        $("#txtWorkflowTitle").val("Review for " + documentName);
                                    }
                                }
                                else {
                                    if (typeof workflowRules.WorkflowTitle != 'undefined' && workflowRules.WorkflowTitle != "") {
                                        $("#txtWorkflowTitle").val(workflowRules.WorkflowTitle + ' for ' + documentName);
                                    } else {
                                        $("#txtWorkflowTitle").val(workflowRules.RuleName);
                                    }
                                }
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
                                    htmlFormatFile += '<select id="ddlAssignTo' + totalFileCount + '" name="AssignTo' + totalFileCount + '"  multiple="multiple" data-placeholder="Select" class="width97 validmultiselect chosenmulti"></select>';
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
                                $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                                if (!workflowAdHoc)
                                    $("#ddlRule").attr('disabled', 'disabled');
                                var totalFileCount = 1;
                                var htmlFormatFile = '<tr id="trStage' + totalFileCount + '">';
                                htmlFormatFile += '<td class="width30 wf_approval">';
                                htmlFormatFile += '<input id="txtStage' + totalFileCount + '" name="Stage' + totalFileCount + '" title="Stage" placeholder="Stage Name" type="text" class="f_inpt width97 validelement" value="Stage ' + totalFileCount + '"/>';
                                htmlFormatFile += '</td>';
                                htmlFormatFile += '<td class="width46">';
                                htmlFormatFile += '<select id="ddlAssignTo' + totalFileCount + '" name="AssignTo' + totalFileCount + '"  multiple="multiple" data-placeholder="Select" class="width97 validmultiselect chosenmulti"></select>';
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
                            $("#loadingPage").fadeOut();
                            $("#dvWorkflow").dialog("option", "title", "Document Review Workflow");
                            $("#dvWorkflow").dialog("open");
                            $("#dvWorkflow").height("auto");
                        },
                        error: function (item) {
                            vWorkflowSettings = item.responseText;
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

                            $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                            if (!workflowAdHoc)
                                $("#ddlRule").attr('disabled', 'disabled');
                            var totalFileCount = 1;
                            var htmlFormatFile = '<tr id="trStage' + totalFileCount + '">';
                            htmlFormatFile += '<td class="width30 wf_approval">';
                            htmlFormatFile += '<input id="txtStage' + totalFileCount + '" name="Stage' + totalFileCount + '" title="Stage" placeholder="Stage Name" type="text" class="f_inpt width97 validelement" value="Stage ' + totalFileCount + '"/>';
                            htmlFormatFile += '</td>';
                            htmlFormatFile += '<td class="width46">';
                            htmlFormatFile += '<select id="ddlAssignTo' + totalFileCount + '" name="AssignTo' + totalFileCount + '"  multiple="multiple" data-placeholder="Select" class="width97 validmultiselect chosenmulti"></select>';
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

                            $("#loadingPage").fadeOut();
                            $("#dvWorkflow").dialog("option", "title", "Document Review Workflow");
                            $("#dvWorkflow").dialog("open");
                            $("#dvWorkflow").height("auto");
                        }
                    });
                }

                break;
            }
        case "version": {

            $("#tblVersionHistory").empty();
            $("#loadingPage").fadeIn();
            var documentID = $(el).find("#DocumentID").text();
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/' + documentID + '/versions',
                type: 'GET',
                dataType: 'json',
                "Content-Type": "application/json",
                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                cache: false,
                success: function (data) {
                    var datalenght = data.length;
                    for (var i = datalenght - 1 ; i >= 0; i--) {
                        var item = data[i];
                        var article = "";
                        article += '<tr>';
                        article += '<td>' + item.VersionNo + '</td>';
                        article += '<td>' + item.Size + '</td>';
                        var fModified = "";
                        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                        { fModified = moment(new Date(item.Modified)).format('MM/DD/YYYY'); }
                        else { fModified = moment(new Date(item.Modified)).format(localStorage.AppDateFormat); }
                        article += '<td>' + fModified + '</td>';
                        article += '<td>' + item.ModifiedBy + '</td>';
                        article += '</tr>';
                        $("#tblVersionHistory").append(article);
                    }

                    var vCount = data.length;
                    $('#compact-paginationVersionHistory').pagination({
                        items: vCount,
                        itemsOnPage: 10,
                        type: 'tbody',
                        row: 'tr',
                        typeID: 'tblVersionHistory',
                        cssStyle: 'compact-theme'
                    });
                    $("#loadingPage").fadeOut();
                    $("#dvVersionHistory").dialog("open");
                },
                error: function () {
                    $("#loadingPage").fadeOut();
                }
            });
            break;
        }
    }
}

function contextMenuWorkFolder(action, el, pos) {
    switch (action) {
        case "open":
            {
                var documentName = $(el).find("#DocumentName").text();
                var documentID = $(el).find("#DocumentID").text();
                var documentLibraryName = $(el).find("#DocumentLibraryName").text();
                var contractstatus = $(el).find("#sContractStatus").text();
                var ContractPremission = $(el).find("#Permission").text();
                if (documentLibraryName == 'Draft Documents') {
                    $("#radioNo").attr('checked', 'checked');
                }
                else {
                    $("#radioYes").attr('checked', 'checked');
                }
                $("#radioNo").prop("disabled", true);
                $("#radioYes").prop("disabled", true);
                $("#lblFolderUrl").prop("disabled", true);
                var LinkURL = $("#" + documentID)[0];
                if ((ContractPremission == "openmenuFolderContribute" || ContractPremission == "openmenuFolder") && (!(contractstatus == "Expired" || contractstatus == "Cancelled" || contractstatus == "Replaced" || contractstatus == "Archived"))) {
                    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                    var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                        return (n.RowKey == "4" && n.Status == "ON");
                    });
                    if (vAccFeat.length > 0) {
                        $("#li_bulkUpload").css("display", "");
                        $("#btnAddDocument1").css("display", "");
                        $("#btnAddDocument2").css("display", "none");
                    } else {
                        $("#li_bulkUpload").css("display", "none");
                        $("#btnAddDocument1").css("display", "none");
                        $("#btnAddDocument2").css("display", "");
                    }
                } else {
                    $("#li_bulkUpload").css("display", "none");
                    $("#btnAddDocument1").css("display", "none");
                    $("#btnAddDocument2").css("display", "none");
                }
                showfolderdocuments(LinkURL, true);
                break;
            }
        case "addnew":
            {
                if ($("#showAll").text().indexOf("/") > 0) {
                    documenturlforfolder = $("#lblFolderUrl").text();
                }
                $('.pop_up_Content_Green').parent().removeAttr('disabled');
                $("#trfileUploadOCR").css('display', 'none');
                $("#fileUploadOCR").prop('checked', false);
                bindconarea = true;
                var documentName = $(el).find("#DocumentName").text();
                var documentID = $(el).find("#DocumentID").text();
                var documentLibraryName = $(el).find("#DocumentLibraryName").text();
                var contractidvalue = $(el).find("#sContractid").text();
                $('#txtContractRecElementID').val(contractidvalue.trim());
                var FolderURLToPass = $(el).find("#FolderURL").text();
                if (documentLibraryName == 'Draft Documents') {
                    $("#radioNo").attr('checked', 'checked');
                }
                else {
                    $("#radioYes").attr('checked', 'checked');
                }
                $("#radioNo").prop("disabled", true);
                $("#radioYes").prop("disabled", true);
                $("#lblFolderUrl").prop("disabled", true);
                $("#tblContentControls").empty();
                $("#ddlDocumentTemplate").val("0");
                $("#txtDocumentID").val("");
                $("#txtDocumentIDForEdit").val("");
                $("#txtDocumentNameCreate").val("");

                $("#lblCTitleDoc").text($("#lblContractTitle").text());

                $("#tabUpload").addClass('form-active');
                $("#tabTemplate").removeClass('form-active');

                $("#spInProgress").css('display', 'none');
                $("#trTemplate").css('display', 'none');
                $("#trTemplate1").css('display', 'none');
                $("#trFileUpload").css('display', '');
                $("#docContract").replaceWith($("#docContract").val('').clone(true));

                $("#leftTab").css('display', '');

                $("#trContracts").css('display', '');
                $("#trfinal").css('display', '');
                $("#trselect").css('display', '');
                $("#trnew").css('display', '');
                $("#trcopy").css('display', '');
                $("#ddlDocumentTypeCreate").empty();
                $("#trDuplicate").css('display', 'none');
                $("#trDocumentType").css('display', '');

                var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                var vDocLibFeat = $.grep(veContractFeatures, function (n, i) {
                    return (n.RowKey == "14" && n.Status == "ON");
                });
                if (vDocLibFeat.length > 0) {
                    if (documentLibraryName != "") {
                        strFinalizedDocumentsUrl = '/' + documentLibraryName.trim() + '/' + documentName;
                    }
                    else {
                        if ($('#hdContAreaDocLibName').val() != "") {
                            strFinalizedDocumentsUrl = '/' + $('#hdContAreaDocLibName').val() + '/' + documentName;
                        }
                        else {
                            strContractDocumentsUrl = '/Contract Documents/' + documentName;
                        }
                    }
                }
                else {
                    strContractDocumentsUrl = '/Contract Documents/' + documentName;
                }

                $("#dvNewDocument").removeClass('width100');
                removeValidations('addEditDocument');
                setDocumentUrl(FolderURLToPass);
                $("#lblFolderUrl").css('pointer-events', 'none');
                $("#lblFolderUrl").css('cursor', 'default');
                //$("#btnBrowseSubFolders").css('display', 'none');
                $("#addEditDocument").dialog("option", "title", "New Document");
                $("#addEditDocument").dialog("open");
                break;
            }
        case "delete":
            {
                var documentName = $(el).find("#DocumentName").text();
                var documentID = $(el).find("#DocumentID").text();
                swal({
                    title: '',
                    text: "Are you sure you want to <span style=\"font-weight:700\">delete</span> the folder <span style=\"font-weight:700\">'" + documentName + "'</span>? All its document(s) will be deleted.",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
     function (confirmed) {
         if (confirmed) {
             $("#loadingPage").fadeIn();
             var documentID = $(el).find("#DocumentID").text();
             var ContractIDToPass = $(el).find("#sContractid").text();
             $.ajax({
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/folder?contractid=' + ContractIDToPass + '&folderid=' + documentID,
                 type: 'DELETE',
                 dataType: 'json',
                 "Content-Type": "application/json",
                 headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                 cache: false,
                 success: function (data) {
                     $("#loadingPage").fadeOut();
                     //location = location;
                     reloadlistDocuments();
                 },
                 error: function () {
                     $("#loadingPage").fadeOut();
                 }
             });
         }
         return;
     });


                break;
            }
    }
}

function contextMenuAmendmentDocument(action, el, pos) {
    switch (action) {
        case "view":
            {
                var LinkURL = $(el).find('p#DocumentUrl').html()
                //var LinkURL = $(el).find("a").attr('data-value');
                Opendocinbrowser(LinkURL);
                //var LinkURL = $(el).find("a").attr('href');
                //window.open(LinkURL, '_blank');
                break;
            }
        case "delete":
            {

                var documentName = $(el).find("#DocumentName").text();
                var documentID = $(el).find("#DocumentID").text();
                swal({
                    title: '',
                    text: "Are you sure you want to <span style=\"font-weight:700\">delete '" + documentName + "'</span>?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
     function (confirmed) {
         if (confirmed) {
             $("#loadingPage").fadeIn();
             var documentID = $(el).find("#DocumentID").text();
             $.ajax({
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + documentID,
                 type: 'DELETE',
                 dataType: 'json',
                 "Content-Type": "application/json",
                 headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                 cache: false,
                 success: function (data) {
                     BindDocument();
                     $("#loadingPage").fadeOut();
                 },
                 error: function () {
                     $("#loadingPage").fadeOut();
                 }
             });
         }
         return;
     });

                break;
            }
    }
}

function ShowMetadata() {
    $("#docMetadata").addClass('active_tab pop_up_Harizondal_meta_active');
    $("#docActivities").removeClass('pop_up_Harizondal_meta_active');
    $('#tblMetadataDetail').css("display", "");
    $('#documentLogs').css("display", "none");
    $('#compact-pagination-documentLogs').css("display", "none");
    $('#idDocumentPopup').css("display", "none");
}

function ShowActivities() {
    $("#docMetadata").removeClass('active_tab pop_up_Harizondal_meta_active');
    $("#docActivities").addClass('pop_up_Harizondal_meta_active');
    $('#tblMetadataDetail').css("display", "none");
    $('#documentLogs').css("display", "");
    $('#compact-pagination-documentLogs').css("display", "none");
    $('#idDocumentPopup').css("display", "");
}


function replacedocument() {
    if (requiredValidator("tblReplaceDocument")) {
        $("#loadingPage").fadeIn();
        var duplicatedoc = true;
        var Documentnamerelace = "";
        var confirmreplaceext = false;
        var extdifferent = false;
        var formData1 = new FormData();
        var opmlFile = $('#docToReplace')[0];
        var isUpload = true;
        var tblContentControls = null;
        var vrad_Replace = $('input[type="radio"][name=rad_Replace]:checked').val();
        var CheckDocumentnamerelace = "";
        if (vrad_Replace == 'Computer') {
            formData1.append("opmlFile", opmlFile.files[0]);
            //manoj
            var filename = "";
            if ($("#txtDocumentNameReplace").val() != "") {
                filename = $("#txtDocumentNameReplace").val();
            }
            else {
                filename = opmlFile.files[0].name;
                filename = filename.substring(0, filename.lastIndexOf('.'));
            }
            formData1.append("DocumentName", filename);

            //manoj
            //For OCR File Upload
            Documentnamerelace = filename + "." + opmlFile.files[0].name.split('.').pop();
            if (document.getElementById("ReplacefileUploadOCR").style.display != "none" && $("#ReplacefileUploadOCR").is(':checked')) {
                CheckDocumentnamerelace = filename + ".pdf";
                formData1.append("ISOCRDOC", "Yes");
            } else {
                formData1.append("ISOCRDOC", "No");
                CheckDocumentnamerelace = Documentnamerelace;
            }
            //For OCR File Upload
            //manoj

            //manoj
            if (selecteddocumententity != null) {
                if (selecteddocumententity.DocumentName.split('.').pop() != Documentnamerelace.split('.').pop()) {
                    extdifferent = true;
                    if (Documentnamerelace.split('.').pop() == 'doc' || Documentnamerelace.split('.').pop() == 'docx' || Documentnamerelace.split('.').pop() == 'DOC' || Documentnamerelace.split('.').pop() == 'DOCX') {
                        var getconformationupload = confirm("The file which is being uploaded is '." + Documentnamerelace.split('.').pop() + "', which is different from existing '." + selecteddocumententity.DocumentName.split('.').pop() + "'; Do you really want to upload? Older versions of the file cannot be restored.");
                        if (getconformationupload) {
                            confirmreplaceext = true;
                        }
                    }
                }
            }
            //manoj
        }
        else {
            formData1.append("TemplateName", $("#ddlReplaceTemplate").find('option:selected').text());
            isUpload = false;
            formData1.append("DocumentName", $('#txtDocumentNameReplace').val());
            Documentnamerelace = $('#txtDocumentNameReplace').val() + ".docx";
            CheckDocumentnamerelace = $('#txtDocumentNameReplace').val() + ".docx";
            tblContentControls = $("#formtblReplaceControls *").serializeArray();
            //manoj
            //If dropdown is empty
            $('#formtblReplaceControls .choicevaluecheck').each(function (index) {
                if ($(this)[0].selectedIndex == "0") {
                    {
                        var nametomodify = $(this)[0].name;
                        tblContentControls.map(function (columnname) {
                            if (columnname.name == nametomodify) {
                                columnname.value = "";
                            }
                            return columnname
                        });
                    }
                }
            });
            //manoj
        }
        formData1.append("documentaction", "replace");
        formData1.append("ContractID", $('#txtContractID').val());
        formData1.append("AccountID", localStorage.AccountID);
        formData1.append("DocumentID", $('#hdDocumentID').val());
        formData1.append("ModifiedBy", localStorage.UserName);
        var IsContributeUser = 'No';
        if (typeof contractItem != 'undefined' && contractItem != '') {
            IsContributeUser = contractItem.Permission.indexOf('Contribute') == -1 ? 'No' : 'Yes';
        }
        formData1.append("IsContributeUser", IsContributeUser);
        if (tblContentControls != null) {
            var tblContentControlslength = tblContentControls.length;
            for (var i = 0; i < tblContentControlslength; i++)
                formData1.append(tblContentControls[i].name, tblContentControls[i].value);
        }
        //manoj
        if (CheckDocumentnamerelace != "" && selecteddocumententity != null) {
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?contractid=' + selecteddocumententity.ContractID + '&docname=' + CheckDocumentnamerelace + '&docid=' + selecteddocumententity.RowKey,
                type: 'GET',
                dataType: 'json',
                "Content-Type": "application/json",
                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                cache: false,
                async: false,
                success: function (docdata) {
                    if (docdata.RowKey != selecteddocumententity.RowKey) {
                        duplicatedoc = false;
                    }
                },
                error: function (docdata) {
                }
            });
        }

        //manoj
        if (duplicatedoc && selecteddocumententity != null) {
            if (isUpload == true && confirmreplaceext == false && extdifferent == true && (selecteddocumententity.DocumentName.split('.').pop() == 'doc' || selecteddocumententity.DocumentName.split('.').pop() == 'docx' || selecteddocumententity.DocumentName.split('.').pop() == 'DOC' || selecteddocumententity.DocumentName.split('.').pop() == 'DOCX')) { $("#loadingPage").fadeOut(); } else {
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + DocumentID,
                    type: 'PUT',
                    data: formData1,
                    cache: false,
                    contentType: false,
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken },
                    processData: false,
                    success: function (document) {
                        $('#divReplaceDocument').dialog("close");
                        if (addbuttonclick) {
                            if ($("#txtContractRecElementID").val() != null && $("#txtContractRecElementID").val() != "" && $("#txtContractRecElement").val() != null && $("#txtContractRecElement").val() != "") {
                                if (!$.isEmptyObject(arrRelatedContracts)) {
                                    CreateRelatedContract($("#txtContractRecElementID").val().trim(), $("#txtContractRecElement").val().trim())
                                }
                            }
                        } else {
                            if (!$.isEmptyObject(arrRelatedContracts)) {
                                CreateRelatedContract(selecteddocumententity.ContractID, selecteddocumententity.ContractTitle)
                            }
                        }
                        ClearReplaceDocFrom();
                        if (isUpload) {
                            $("#loadingPage").fadeOut();
                            //location = location;
                            reloadlistDocuments();
                        }
                        else {

                            swal("", "Replace document from template in progress. Please check in a few minutes.");
                            $("#loadingPage").fadeOut();
                        }
                    }, error: function (document) {
                        //location = location;
                        //reloadlistDocuments();
                        swal(document.responseText);
                        $("#loadingPage").fadeOut();
                    }
                });
            }
        } else {
            $("#loadingPage").fadeOut();
            swal("", "Another document with this file name already exists.Please rename and try again");
        }
    }
}

$('input[name=rad_Replace]:radio').change(function () {
    var vrad_Replace = $('input[type="radio"][name=rad_Replace]:checked').val();
    $("#txtDocumentNameReplace").val('');
    $("#docToReplace").replaceWith($("#docToReplace").val('').clone(true));
    $("#ddlReplaceTemplate").val("0");
    $("#tblReplaceControls").css('display', 'none');
    $("#tblReplaceControls").empty();
    //$('#txtContractID').val("");
    if (vrad_Replace == 'Computer') {
        $("#trFileUploadBrowse").css('display', '');
        $("#trTemplateBrowse").css('display', 'none');
        $("#tblReplaceControls").css('display', 'none');
        $("#docToReplace").addClass('validelement');
        $("#ddlReplaceTemplate").removeClass('validelement');
        $("#lblReplaceTemplateDescription").text("");
    }
    else {
        $("#trFileUploadBrowse").css('display', 'none');
        $("#trTemplateBrowse").css('display', '');
        $("#tblReplaceControls").css('display', '');
        $("#docToReplace").removeClass('validelement');
        $("#ddlReplaceTemplate").addClass('validelement');
    }
});

function ReplaceFileUploadChange(obj) {
    var id = obj.id;
    var filecontrol = document.getElementById(id);
    var txt = "";
    if ('files' in filecontrol) {
        if (filecontrol.files.length == 0) {
        } else {
            for (var i = 0; i < filecontrol.files.length; i++) {
                var file = filecontrol.files[i];
                if ('size' in file) {
                    if (file.size > 0) {
                        var Filelengthcol = Math.round((file.size / 1048576));
                        if (Filelengthcol > (Math.round(parseInt(localStorage.MaxRequestLength) / 1000))) {
                            //swal("", "The maximum permissible size is " + Math.round(parseInt(localStorage.MaxRequestLength) / 1024) + " MB, Please upload a file which is less than " + Math.round(parseInt(localStorage.MaxRequestLength) / 1024) + " MB");
                            swal("", "File exceeds " + Math.round((parseInt(localStorage.MaxRequestLength) / 1000)) + "MB size limit.");
                            $("#" + id).replaceWith($("#" + id).val('').clone(true));
                        } else {
                            if (!isSpecialCharacterFileName(file.name.substr(0, file.name.lastIndexOf('.')))) {
                                swal({
                                    title: '',
                                    //text: "File names can't contain the following characters /:*\\?\"<>|#%.",
                                    // For Brookfield allow dot in filename
                                    text: "File names can't contain the following characters /:*\\?\"<>|#%",
                                    // For Brookfield allow dot in filename
                                    type: 'warning',
                                    showCancelButton: false,
                                    confirmButtonText: 'OK',
                                    html: true
                                },
                                function (confirmed) {
                                    $("#" + id).replaceWith($("#" + id).val('').clone(true));
                                });
                            }
                            else {
                                var files = obj.files;
                                for (var i = 0; i < files.length; i++) {
                                    var file = files[i];
                                    $("#txtDocumentNameReplace").val(file.name.split('.')[0]);
                                }
                            }
                        }
                    } else {
                        swal("", "File cannot be empty.");
                        $("#" + id).replaceWith($("#" + id).val('').clone(true));
                    }
                }
            }
        }
    }
}

function ReplaceTemplateChange(ddlDocumentTemplate) {
    //$("#dvreplacehelptextvalue").css('display', 'none');
    if (ddlDocumentTemplate.value != "0") {
        $("#txtDocumentNameReplace").val($("#ddlReplaceTemplate").find('option:selected').text().split('.')[0]);
        $("#lblReplaceTemplateDescription").text(hashtable[ddlDocumentTemplate.value.split('~')[0].replace(/ /g, '')]);
        var strContractID = $('#txtContractID').val();
        if (strContractID != "" && strContractID != "0") {
            getContractData(strContractID, 'tblReplaceControls', $("#ddlReplaceTemplate").find('option:selected').text(), "", "dvreplacehelptextvalue")
        }
        else {
            getContentControlsFromTemplate($("#ddlReplaceTemplate").find('option:selected').text(), 'tblReplaceControls');
        }

    } else {
        $("#txtDocumentNameReplace").val('');
        $('#tblReplaceControls').empty();
        $("#lblReplaceTemplateDescription").text("");
    }
}

function ClearReplaceDocFrom() {
    $('#hdnDocumentID').val("");
    $("#docToReplace").replaceWith($("#docToReplace").val('').clone(true));
    $("#txtDocumentNameReplace").val('');
    $("#ddlReplaceTemplate").val("0");
    $('input[type="radio"][name="rad_Replace"][value="Computer"]').prop('checked', true);
    $("#trFileUploadBrowse").css('display', '');
    $("#trTemplateBrowse").css('display', 'none');
    $("#tblReplaceControls").css('display', 'none');
    $("#docToReplace").addClass('validelement');
    $("#ddlReplaceTemplate").removeClass('validelement');
    $("#tblReplaceControls").empty();
}

function getSigneeNameandEmailId(scontrid, popUpModalName) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/' + scontrid + '/contacts',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            if (data != null) {
                if (popUpModalName == "signature") {
                    getNameEmailForSignature(data);
                }
                else if (popUpModalName == "sharelink") {
                    getNameEmailForShareLink(data);
                }
            }

        },
        error: function () {
        }
    });
}
function getNameEmailForSignature(vdata) {
    var datalenght = vdata.length;
    for (var i = 0; i < datalenght; i++) {
        var item = vdata[i];
        var vLastRow = $("#tblSignees tr:last").attr('id');
        var totalFileCount = "2";
        if (typeof vLastRow == "undefined") {
            totalFileCount = "2";
        }
        else {
            totalFileCount = parseInt(vLastRow.replace("trSignee", ""));
            totalFileCount += 1;
        }
        if (i == 0) {
            $('#txtSignee1').val(item.ContactName);
            $('#txtEmail1').val(item.EmailID);
        }
        else {
            var htmlFormatFile = '<tr id="trSignee' + totalFileCount + '">';
            htmlFormatFile += '<td>';
            htmlFormatFile += '<input id="txtSignee' + totalFileCount + '" value="' + item.ContactName + '" name="Signee' + totalFileCount + '" placeholder="Signee Name" title="Signee" type="text" class="f_inpt width90" value="' + item.ContactName + '" />';
            htmlFormatFile += '</td>';
            htmlFormatFile += '<td>';
            htmlFormatFile += '<input id="txtEmail' + totalFileCount + '" value="' + item.EmailID + '" name="Email' + totalFileCount + '" placeholder="Signee Email" title="Email" type="text" class="f_inpt width90 validemail" value="' + item.EmailID + '" />';
            htmlFormatFile += '</td>';
            htmlFormatFile += '<td style="width:20px">';
            htmlFormatFile += '<a href="javascript:void(0)" onclick="DeleteSignee(this)"><img src="../Content/Images/icon/delete.png" /></a>';
            htmlFormatFile += '</td>';
            htmlFormatFile += '</tr>';
            $("#tblSignees").append(htmlFormatFile);
        }

    }
}
function getNameEmailForShareLink(vdata) {
    var allInternal = '';
    var datalenght = vdata.length;
    var totalFileCount = 0;
    var iex = 0;
    for (var i = 0; i < datalenght; i++) {
        var item = vdata[i];

        totalFileCount++;
        if (item.InternalOrExternal == "External") {
            if (iex == 0) {
                iex = 1;
                $('#txtShareDocument1').val(item.ContactName);
                $('#txtShareDocumentEmail1').val(item.EmailID);
            }
            else {
                var htmlFormatFile = '<tr id="trShareDocument' + totalFileCount + '">';
                htmlFormatFile += '<td>';
                htmlFormatFile += '<input id="txtShareDocument' + totalFileCount + '" value="' + item.ContactName + '" maxlength="42" name="ShareDocumentName' + totalFileCount + '" placeholder="Name" title="Name" type="text" class="f_inpt width90" value="' + item.ContactName + '" />';
                htmlFormatFile += '</td>';
                htmlFormatFile += '<td>';
                htmlFormatFile += '<input id="txtShareDocumentEmail' + totalFileCount + '" value="' + item.EmailID + '" maxlength="50" name="ShareDocumentEmail' + totalFileCount + '" placeholder="Email ID" title="Email ID" type="text" class="f_inpt width90 validelement validemail" value="' + item.EmailID + '" />';
                htmlFormatFile += '</td>';
                htmlFormatFile += '<td style="width:20px">';
                htmlFormatFile += '<a href="javascript:void(0)" onclick="DeleteShareDocument(this)"><img src="../Content/Images/icon/delete.png" /></a>';
                htmlFormatFile += '</td>';
                htmlFormatFile += '</tr>';
                $("#tblShareDocument").append(htmlFormatFile);
            }

        }
        else {
            allInternal += item.ContactName + ";";
        }
    }
    GetTextAndAutoPopulateNotHidden("ddlDocumentShareInternal", allInternal);

}

var contractAssignmentType = "";
function ContractRec() {
    contractAssignmentType = "Create";
    strContractDocumentsUrl = "";
    $("#txtSearchBoxTodoForm").val("");
    $('#dvLoading').html('<img src="../Content/Images/icon/loading.gif">');

    $('#compact-paginationContractsTodo').css('display', '');
    $('#compact-paginationDocumentsTodo').css('display', 'none');
    $("#tblDocumentsTodo").css("display", "none");
    $("#tblContractsTodo").css("display", "");
    if ($("#tblContractsTodo li").length == 0) {
        BindContractsLocal();
    }
    else {
        $("#dvContractRec").dialog("option", "title", "Select Contract");
        $("#dvContractRec").dialog("open");
        $('#dvLoading').html('');
    }
}

function ContractRecEdit() {
    contractAssignmentType = "Edit";
    strContractDocumentsUrl = "";
    $("#txtSearchBoxTodoForm").val("");
    $('#dvLoading').html('<img src="../Content/Images/icon/loading.gif">');

    $('#compact-paginationContractsTodo').css('display', '');
    $('#compact-paginationDocumentsTodo').css('display', 'none');

    $("#tblDocumentsTodo").css("display", "none");
    $("#tblContractsTodo").css("display", "");
    if ($("#tblContractsTodo li").length == 0) {
        BindContractsLocal();
        var vContractRec = $("#txtContractRecElementEdit").val().trim();
        if (vContractRec == "")
            vContractRec = $("#txtContractRecElement").val().trim();
        if (vContractRec != "" && vContractRec != "") $('input[type="radio"][name="Contracts"][value="' + vContractRec + '"]').prop('checked', true);
        //if (chkContract != "")
        //    $('input[type="radio"][name="Contracts"][value="' + chkContract + '"]').prop("checked", true);
    }
    else {
        var vContractRec = $("#txtContractRecElementEdit").val().trim();
        if (vContractRec == "")
            vContractRec = $("#txtContractRecElement").val().trim();
        if (vContractRec != "" && vContractRec != "") $('input[type="radio"][name="Contracts"][value="' + vContractRec + '"]').prop('checked', true);
        $("#dvContractRec").dialog("option", "title", "Select Contract");
        $("#dvContractRec").dialog("open");
        $('#dvLoading').html('');
    }


}

function getQueryStringFromValue(url, name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(url);
    return results == null ? url : decodeURIComponent(results[1].replace(/\+/g, " "));
}

//Script for search start
$(document).ready(function () {
    $('#txtSearchBox').keypress(function (e) {
        if ($('#txtSearchBox').val() != "") {
            if (e.keyCode == 13)
                search();
        }
    });
    $('#txtSearchBoxTodoForm').keypress(function (e) {
        if ($('#txtSearchBoxTodoForm').val() != "") {
            if (e.keyCode == 13)
                SearchContractRec();
        }
    });
});

function search() {
    $('#listDocuments').html('<img class="f_p-error" src="../Content/Images/icon/loading.gif">');
    $("#showAll").text("Showing search result for : '" + $.trim($('#txtSearchBox').val()) + "'");
    applyFilter();
}
//Script for search end

function onchangetemplate(ddlDocumentTemplate) {
    $('#spInProgress').css('display', '');
    //$("#dvhelptextvalue").css('display', 'none');
    if (ddlDocumentTemplate.value != "0") {
        $('#txtDocumentNameCreate').val($("#ddlDocumentTemplate").find('option:selected').text());
        var strContractID = $("#txtContractRecElementID").val();
        if (strContractID == "0" || strContractID == "") {
            var vTemplate = ddlDocumentTemplate.value.split('~');
            if (vTemplate[1] != '') {
                $("#ddlDocumentTypeCreate option").filter(function (index) { return $(this).text() === vTemplate[1] }).prop('selected', true);
                $("#lblTemplateDescription").text(hashtable[ddlDocumentTemplate.value.split('~')[0].replace(/ /g, '')]);
            }
            getContentControlsFromTemplate(vTemplate[0], 'tblContentControls');
        } else {
            $("#lblTemplateDescription").text(hashtable[$("#ddlDocumentTemplate").val().split('~')[0].replace(/ /g, '')]);
            getContractData(strContractID, 'tblContentControls', $("#ddlDocumentTemplate").find('option:selected').text(), "", "dvhelptextvalue");
        }

    } else {
        $('#txtDocumentNameCreate').val("");
        $('#tblContentControls').empty();
        $("#lblTemplateDescription").text("");
    }

    $('#spInProgress').css('display', 'none');
}

function onchangecontractrecord(ddlContracts) {
    $('#spInProgress').css('display', '');
    if (ddlContracts.value == "0") {
        $("#txtNewFolderName").val("");
        var strDocumentTemplate = $("#ddlDocumentTemplate").find('option:selected').text();
        getContentControlsFromTemplate(strDocumentTemplate, 'tblContentControls');
    } else {

        setDocumentUrl();
    }
    $('#spInProgress').css('display', 'none');
}

function getContentControlsFromTemplate(templatename, tblCtrl) {
    $('#spInProgress').css('display', '');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/template?templatename=' + templatename,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        async: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (contractfields) {
            $('#spInProgress').css('display', 'none');
            var vTransactionTypeExist = '';
            var vContractClassExist = '';
            var datalenght = contractfields.length;

            if (datalenght > 0) {
                $("#" + tblCtrl).empty();
                $("#" + tblCtrl).append("<tr><td width='100%' colspan='2' valign='top'><div class='form_categoryhead'>Auto Populate Fields <span style='font-size: 12px !important;'><img title='Autopopulate fields are mapped to place holders (content controls) in the selected document template. The data for these controls is automatically populated and synched with the related Contract Record(s) when the document is created and updated. Note: Document template controls should be mapped to corresponding metadata as part of template creation.' src='../Content/Images/help_training_blue.png'></span></div></td></tr>");

                for (var i = 0; i < datalenght; i++) {
                    var item = contractfields[i];
                    var vUserList = '';
                    if (item.FieldName == "ContractType") {
                    }
                    else if (item.FieldName == "TransactionType")
                    { vTransactionTypeExist = 'Yes'; }
                    else if (item.FieldName == "ContractClass")
                    { vContractClassExist = 'Yes'; }
                    else {
                        var vControls = '<tr>';
                        var vDate = "";
                        var onlydate = "";
                        var vUser = "";
                        var vNumber = "";
                        var vCurrency = "";
                        var vMultiDDL = "";
                        var vNumberD = "";
                        var vNumberP = "";
                        var vNumberPD = "";
                        var binddatatofields = false;
                        vControls += '<td class="f_head"><label style="word-break: break-all;">' + item.FieldDisplayName;

                        if (item.FieldHelp == "true") {
                            vControls += "<img class='helpimg' src='../Content/Images/help_training.png'  title='" + item.HelpText + "'></label>";
                        } else {
                            vControls += '</label>';
                        }
                        if (item.FieldType == "User") {
                            vControls += '</td><td class="f_list new-Doc-Multi width50">';
                        } else {
                            vControls += '</td><td class="f_list width50">';
                        }
                        if (item.FieldType == "Single Line Text") {
                            if (item.Required == "true") {
                                vControls += "<input type='text' id=" + item.FieldName + " maxlength='100' name=" + item.FieldName + " class='f_inpt width80 validelement' />";
                            } else {
                                vControls += "<input type='text' id=" + item.FieldName + " maxlength='100' name=" + item.FieldName + " class='f_inpt width80' />";
                            }
                        }
                        else if (item.FieldType == "Multi Line Text") {
                            if (item.Required == "true") {
                                vControls += "<textarea name=" + item.FieldName + " id=" + item.FieldName + " cols='40' rows='3' class='f_inpt width_91 height70 verticalalign-top verticalalign-text-top validelement'></textarea>";
                            } else {
                                vControls += "<textarea name=" + item.FieldName + " id=" + item.FieldName + " cols='40' rows='3' class='f_inpt width_91 height70 verticalalign-top verticalalign-text-top'></textarea>";
                            }
                        }
                        else if (item.FieldType == "Hyperlink") {
                            //manoj
                            //for Hyperlink
                            var hyperlinkURL = item.DefaultURL;
                            if (item.Required == "true") {
                                vControls += "<input type='text' id=" + item.FieldName + " maxlength='2083' name=" + item.FieldName + " placeholder='http://www.' value='" + hyperlinkURL + "' class='f_inpt width80 validelement validwebsite' />";
                            } else {
                                vControls += "<input type='text' id=" + item.FieldName + " maxlength='2083' name=" + item.FieldName + " placeholder='http://www.' value='" + hyperlinkURL + "' class='f_inpt width80 validwebsite' />";
                            }
                            vControls += '<a href="javascript:void(0)" class="linkText" title="' + item.FieldDisplayName + '" onclick="navigateurl(\'' + item.FieldName + '\')"> Navigate</a>';
                            //for Hyperlink
                            //manoj
                        }
                        else if (item.FieldType == "Date") {
                            binddatatofields = true;
                            var vv = item.FieldName;
                            onlydate = "";
                            if (vv != null) {
                                onlydate = vv.substring(0, vv.length - 19);
                            }
                            if (onlydate != "") {
                                if (localStorage.AppDateFormat == null || localStorage.AppDateFormat == "" || localStorage.AppDateFormat == 'undefined') {
                                    onlydate = moment(new Date(onlydate)).format('MM/DD/YYYY');
                                }
                                else {
                                    onlydate = moment(new Date(onlydate)).format(localStorage.AppDateFormat);
                                }
                            }

                            if (item.Required == true) {
                                vControls += "<input type='text' id='" + item.FieldName + "' class='f_date width40 validelement validdate fielddatecontrol " + item.FieldName + "'/>";
                            } else {
                                vControls += "<input type='text' id='" + item.FieldName + "' class='f_date width40 validdate fielddatecontrol " + item.FieldName + "'/>";
                            }
                            vDate = item.FieldName;


                        }
                        else if (item.FieldType == "Choice") {
                            if (item.Required == "true") {
                                if (item.FieldName != "TransactionType" && item.FieldName != "ContractClass") {
                                    vControls += "<select id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width_91 choicevaluecheck validelement'>";
                                } else {
                                    vControls += "<select id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width_91  validelement'>";
                                }
                            } else {
                                if (item.FieldName != "TransactionType" && item.FieldName != "ContractClass") {
                                    vControls += "<select id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width_91 choicevaluecheck'>";
                                } else {
                                    vControls += "<select id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width_91 '>";
                                }
                            }
                            vControls += "<option value='0'>--Select--</option>";

                            var myArray = [];
                            myArray = item.ChoiceValues.split(';')
                            var myArraylength = myArray.length;
                            for (var j = 0; j < myArraylength; j = j + 1) {
                                do {
                                    myArray[j] = myArray[j].replace("&amp;", "&");
                                } while (myArray[j].indexOf("&amp;") > -1)
                                vControls += "<option value='" + myArray[j] + "'>" + myArray[j] + "</option>";
                            }

                            vControls += '</select>';
                            binddatatofields = true;
                        }
                        else if (item.FieldType == "User") {
                            if (item.Required == "true") {
                                vControls += "<select id=" + item.FieldName + " multiple='multiple' class='f_inpt width_91 chosenmulti validuser' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
                            } else {
                                vControls += "<select id=" + item.FieldName + " multiple='multiple' class='f_inpt width_91 chosenmulti' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
                            }

                            if (vUserList == '')
                            { vUserList = GetUserList(); }

                            vControls += '</select>';
                            binddatatofields = true;

                            vUser = item.FieldName;
                        } else if (item.FieldType == "Taxonomy") {

                            vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width80' readonly='readonly' type='text'>";
                            vControls += "<span class='right-float'><a href='javascript:void(0)' onclick='ViewBusinessArea()'> Browse</a></span>";
                            binddatatofields = true;

                        } else if (item.FieldType == "Lookup") {
                            if (item.FieldName == "Counterparty") {
                                binddatatofields = true;
                                var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                                var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                                    return (n.RowKey == "6" && n.Status == "ON");
                                });
                                var vreadonly = "";
                                var vbrowse = "";
                                if (vAccFeat.length > 0) {
                                    vreadonly = "readonly='readonly'";
                                    vbrowse = "<span class='right-float'><a href='javascript:void(0)' title='" + item.FieldName + "'  onclick='ViewCounterparty(this)'> Browse</a></span>";
                                }

                                if (item.Required == "true") {
                                    vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width80 validelement' " + vreadonly + " type='text'>";
                                } else {
                                    vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width80' " + vreadonly + " type='text'>";
                                }
                                vControls += vbrowse;
                            }
                            else if (item.FieldName == "CompanyProfile") {
                                binddatatofields = true;
                                //if (item.Required == "true") {
                                //    vControls += "<select id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width_91 validelement'>";
                                //} else {
                                //    vControls += "<select id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width_91'>";
                                //}
                                //vControls += "<option value='0'>--Select--</option>";
                                //vControls += getcompanyprofile() + "</select>";
                                if (item.Required == "true") {
                                    vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80 validelement readonly='readonly' type='text' />";
                                } else {
                                    vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' readonly='readonly' class='f_inpt width80' type='text' />";
                                }
                                vControls += "<span class='right-float'><a href='javascript:void(0)' class='linkText' onclick='ViewLegalEntity()'> Browse</a></span>";
                            }
                            else if (item.FieldName == "ContractPricingType") {
                                binddatatofields = true;
                                if (item.Required == "true") {
                                    vControls += "<select id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width_91 choicevaluecheck validelement'>";
                                } else {
                                    vControls += "<select id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width_91 choicevaluecheck'>";
                                }
                                vControls += "<option value='0'>--Select--</option>";
                                getcontractpricingtype();
                            }
                            else if (item.FieldName == "BillingFrequency") {
                                binddatatofields = true;
                                if (item.Required == "true") {
                                    vControls += "<select id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width_91 choicevaluecheck validelement'>";
                                } else {
                                    vControls += "<select id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width_91 choicevaluecheck'>";
                                }
                                vControls += "<option value='0'>--Select--</option>";
                                getbillingfrequency();
                            }
                            else if (item.FieldName == "Status") {
                                binddatatofields = true;
                                if (item.Required == "true") {
                                    vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width80 choicevaluecheck validelement'>";
                                } else {
                                    vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt choicevaluecheck width80'>";
                                }
                                vControls += "<option value='0'>--Select--</option>";
                                vControls += getStatus() + "</select>";
                            }
                            else if (item.FieldName == "OriginatingParty") {
                                binddatatofields = true;
                                vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width80' readonly='readonly' type='text'>";
                                vControls += "<span class='right-float'><a href='javascript:void(0)' onclick='ViewOriginatingParty()'> Browse</a></span>";
                            }
                            else if (item.FieldName == "ContractCurrency") {
                                binddatatofields = true;
                                if (item.Required == "true") {
                                    vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width80 validelement' " + vreadonly + " type='text'>";
                                } else {
                                    vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width80' " + vreadonly + " type='text'>";
                                }
                                vControls += "<option value='0'>--Select--</option>";
                                vControls += getContractCurrency() + "</select>";
                            }
                            else if (item.FieldName == "RelatedContracts") {
                                binddatatofields = true;
                                if (item.Required == "true") {
                                    vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='' class='f_inpt width_91 validelement' readonly='readonly' type='text' />";
                                } else {
                                    vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='' class='f_inpt width_91' readonly='readonly' type='text' />";
                                }
                                if (item.FieldHelp == "true") {
                                    vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                }
                                vControls += "<a href='javascript:void(0)' class='linkText' onclick='ViewRelatedContracts()'> Browse</a>";
                            }

                        }
                        else if (item.FieldType.indexOf("Dropdown") > -1 || item.FieldType.indexOf("Multi Select") > -1) {
                            if (item.FieldType.indexOf("Dropdown") > -1) {
                                binddatatofields = true;
                                if (item.Required == "true") {
                                    vControls += "<select id=" + item.FieldName + " multiple='multiple' class='f_inpt width_91 chosenmulti validuser' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
                                } else {
                                    vControls += "<select id=" + item.FieldName + " multiple='multiple' class='f_inpt width_91 chosenmulti' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
                                }
                                var vMultiDDL1 = "";
                                if (vMultiDDL1 == '') {
                                    var myArray = [];
                                    myArray = item.ChoiceValues.split("\n")
                                    var myArraylength = myArray.length;
                                    for (var k = 0; k < myArraylength; k = k + 1) {
                                        vMultiDDL1 += "<option value='" + myArray[k] + "'>" + myArray[k] + "</option>";
                                    }
                                }
                                vControls += vMultiDDL1;
                                vControls += '</select>';
                                vMultiDDL = item.FieldName;

                            }
                            else {
                                if (item.ChoiceValues == "Counterparty") {
                                    binddatatofields = true;
                                    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                                    var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                                        return (n.RowKey == "6" && n.Status == "ON");
                                    });
                                    var vreadonly = "";
                                    var vbrowse = "";
                                    if (vAccFeat.length > 0) {
                                        vreadonly = "readonly='readonly'";
                                        vbrowse = "<span class='right-float'><a href='javascript:void(0)' title='" + item.FieldName + "'  onclick='ViewCounterparty(this)'> Browse</a></span>";
                                    }

                                    if (item.Required == "true") {
                                        vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width80 validelement' " + vreadonly + " type='text'>";
                                    } else {
                                        vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width80' " + vreadonly + " type='text'>";
                                    }
                                    vControls += vbrowse;
                                }
                                else {
                                    binddatatofields = true;
                                    if (item.Required == "true") {
                                        vControls += "<select id=" + item.FieldName + " multiple='multiple' class='f_inpt width_91 chosenmulti validuser' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
                                    } else {
                                        vControls += "<select id=" + item.FieldName + " multiple='multiple' class='f_inpt width_91 chosenmulti' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
                                    }
                                    var vMultiDDL1 = "";
                                    if (vMultiDDL1 == '') {
                                        $.ajax({
                                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/customlookupvaluedetails?lookupname=' + item.ChoiceValues,
                                            type: 'GET',
                                            dataType: 'json',
                                            "Content-Type": "application/json",
                                            headers: { 'eContracts-ApiKey': localStorage.APIKey },
                                            cache: false,
                                            async: false,
                                            success: function (data) {
                                                var datalength1 = data.LookupFields.split(';');
                                                datalength1 = datalength1.sort();
                                                datalength1 = sortArrOfObjectsByParam(datalength1);
                                                var datalength = datalength1.length;
                                                for (var l = 0; l < datalength; l++) {
                                                    var itemname = datalength1[l];
                                                    vMultiDDL1 += "<option value='" + itemname + "'>" + itemname + "</option>";
                                                }
                                            }
                                        });
                                    }
                                    vControls += vMultiDDL1;
                                    vControls += '</select>';
                                    vMultiDDL = item.FieldName;
                                }
                            }
                        } else if (item.FieldType == "Currency") {
                            binddatatofields = true;
                            if (item.Required == "true") {
                                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80 validelement' />";
                            } else {
                                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80' />";
                            }
                            vCurrency = item.FieldName;
                        } else if (item.FieldType == "Number") {
                            binddatatofields = true;
                            if (item.Required == "true") {
                                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80 validelement' />";
                            } else {
                                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80' />";
                            }
                            vNumber = item.FieldName;
                        }
                        else if (item.FieldType == "Number-D") {
                            binddatatofields = true;
                            if (item.Required == "true") {
                                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80 validelement' />";
                            } else {
                                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80' />";
                            }
                            vNumberD = item.FieldName;
                        }
                            //Percent
                        else if (item.FieldType == "Number-P") {
                            binddatatofields = true;
                            if (item.Required == "true") {
                                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80 validelement' />";
                            } else {
                                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80' />";
                            }
                            vControls += '<label class="margin-top-8" >' + '%' + '</label>';
                            vNumberP = item.FieldName;
                        }
                            //Percent Decimal
                        else if (item.FieldType == "Number-PD") {
                            binddatatofields = true;
                            if (item.Required == "true") {
                                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80 validelement' />";
                            } else {
                                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80' />";
                            }
                            vControls += '<label class="margin-top-8" >' + '%' + '</label>';
                            vNumberPD = item.FieldName;
                        }
                        else if (item.FieldType == "Yes/No") {
                            binddatatofields = true;
                            vControls += "	<input type='radio' name=" + item.FieldName + " value='Yes'>Yes ";
                            vControls += "	<input type='radio' name=" + item.FieldName + " checked value='No'>No";

                        } else if (item.FieldType == "Email") {
                            binddatatofields = true;
                            if (item.Required == "true") {
                                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80 validemail validelement' />";
                            } else {
                                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80 validemail' />";
                            }
                        } else if (item.FieldType.indexOf("Browse") > -1) {
                            binddatatofields = true;
                            vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80' readonly='readonly' type='text' />";
                            vControls += "<span class='right-float'><a href='javascript:void(0)' id='" + item.FieldDisplayName + "' title='" + item.FieldName + "' onclick='ViewGeneric(this)'>Browse</a></span>";
                        }

                        vControls += '</td></tr>';
                        if (binddatatofields) {
                            $("#" + tblCtrl).append(vControls);
                            if (vDate != "") {
                                if (localStorage.AppDateFormat == null || localStorage.AppDateFormat == "" || localStorage.AppDateFormat == 'undefined') {
                                    if (onlydate != "") {
                                        $("#" + vDate + "").datepicker({
                                            changeMonth: true,
                                            changeYear: true
                                        });
                                        $("#" + vDate + "").datepicker().datepicker('setDate', onlydate);
                                    }
                                    else {
                                        $("#" + vDate + "").datepicker({
                                            changeMonth: true,
                                            changeYear: true
                                        });
                                    }
                                }
                                else {
                                    var dateformate = localStorage.AppDateFormat.toLowerCase().slice(0, -2);
                                    if (onlydate != "") {
                                        $("#" + vDate + "").datepicker({
                                            changeMonth: true,
                                            changeYear: true,
                                            dateFormat: dateformate
                                        });

                                        $("#" + vDate + "").datepicker().datepicker('setDate', onlydate);
                                    }
                                    else {
                                        $("#" + vDate + "").datepicker({
                                            changeMonth: true,
                                            changeYear: true,
                                            dateFormat: dateformate
                                        });
                                    }

                                }


                                vDate = "";
                            }

                            if (vNumber != "") {
                                allowOnlyNumberInInputBox(vNumber);
                                vNumber == "";
                            }
                            if (vNumberD != "") {
                                allowOnlyDecimalNumberInInputBox(vNumberD);
                                vNumberD == "";
                            }
                            if (vNumberP != "") {
                                allowOnlyNumberInInputBox(vNumberP);
                                vNumberP == "";
                            }
                            if (vNumberPD != "") {
                                allowOnlyDecimalNumberInInputBox(vNumberPD);
                                vNumberPD == "";
                            }
                            if (vUser != "") {

                                $("#" + vUser + "").chosen().trigger("chosen:updated");
                                $('.chosenmulti').on('chosen:showing_dropdown', function (evt, params) {
                                    $('.result-selected').css('display', 'none');
                                });
                                vUser = "";
                            }
                            if (vCurrency != "") {
                                if (vCurrencyDisplayStyle == "1,234,567.89 (United Kingdom, United States, Hong Kong, Australia)") {
                                    $('#' + vCurrency).autoNumeric();
                                } else if (vCurrencyDisplayStyle == "1 234 567.89 (Canada, China)") {
                                    $('#' + vCurrency).autoNumeric({
                                        aSep: ' ',
                                        aDec: '.',
                                    });

                                } else if (vCurrencyDisplayStyle == "1.234.567,89 (Most of EU)") {
                                    $('#' + vCurrency).autoNumeric({
                                        aSep: '.',
                                        aDec: ',',
                                    });
                                } else if (vCurrencyDisplayStyle == "12,34,567.89 (India, South Asia)") {
                                    $('#' + vCurrency).autoNumeric({
                                        dGroup: '2',
                                    });
                                }
                                vCurrency == "";
                            }

                            if (vMultiDDL != "") {

                                $("#" + vMultiDDL + "").chosen().trigger("chosen:updated");
                                $('.chosenmulti').on('chosen:showing_dropdown', function (evt, params) {
                                    $('.result-selected').css('display', 'none');
                                });
                                vMultiDDL = "";
                            }
                        } else {
                            var vControlsDetails = '<tr><td class="f_head"><label style="word-break: break-all;">' + item.FieldDisplayName + '</td><td class="f_list width50">Not available</td></tr>';
                            $("#" + tblCtrl).append(vControls);
                        }
                    }
                }
            } else {
                $("#" + tblCtrl).empty();
                swal("", "No content controls are mapped in the template.");
            }
            if (vTransactionTypeExist == 'Yes') {
                $("#trTransactionType").css("display", "");
            }
            if (vContractClassExist == 'Yes') {
                $("#trContractClass").css("display", "");
            }
        },
        error:
            function (contractfields) {
                $('#tblContentControls').empty();
                $('#spInProgress').css('display', 'none');
            }
    });
}


function getContractData(ContractID, tblCtrl, strDocumentTemplate, objdetails, helptextvalue) {
    $('#spInProgress').css('display', '');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/IContractDetails?contractid=' + ContractID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: false,
        success: function (mainmetadataFields) {
            $('#spInProgress').css('display', 'none');
            var vMetadata = $(mainmetadataFields).find('Metadata');
            $("#txtCounterpartyCreate").val($(vMetadata).find("Counterparty").text());
            if (typeof objdetails != 'undefined' && objdetails != null && objdetails != "") {
                strContractDocumentsUrl = objdetails;
            } else {
                strContractDocumentsUrl = $(vMetadata).find("ContractDocumentsUrl").text();
            }
            $('#txtBA').val($(vMetadata).find("BusinessArea").text());
            $("#txtBusinessArea").val($(vMetadata).find("BusinessArea").text());
            $('#txtContractAreaName').val($(vMetadata).find("ContractArea").text());
            $('#txtContractAreaAdministrators').val($(vMetadata).find("ContractAreaAdministrators").text());
            $('#txtBusinessAreaOwners').val($(vMetadata).find("BusinessAreaOwners").text());
            if (localStorage.GlobalBusinessAreaLocation == 'All') {
                $("#txtBusinessAreaPath").val($(vMetadata).find("BusinessAreaPath").text());
            }
            $("#txtContractRecElement").val($(vMetadata).find("ContractTitle").text());
            var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
            var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                return (n.RowKey == "6" && n.Status == "ON");
            });
            if (vAccFeat.length == 0) {
                $("#spCounterpartyCreate").css("display", "none");
                $("#txtCounterpartyCreate").prop("readonly", false);
            }
            //else {
            //    if (!bindconarea) {
            //        $("#spCounterpartyCreate").css("display", "");
            //    }
            //}
            $("#txtContractRecElementIDEdit").val(ContractID);
            //manoj
            (bindconarea) ? $(".hidebasedonselection").css('display', 'none') : $(".hidebasedonselection").css('display', '');
            if (!bindconarea && ($("#txtContractRecElement").val() != "")) {
                $("#spCounterpartyCreate").css("display", "none");
            }
            if (localStorage.GlobalBusinessAreaLocation != 'All') {
                //$("#txtBusinessAreaPath").val("");
                $("#spBusinessArea").css('display', 'none');
            }
            //manoj
            if (!(document.getElementById("ddlDocumentTypeCreate").length > 0)) {
                getcontractareasettings($(vMetadata).find("ContractArea").text(), strDocumentTemplate);
            }

            //manoj
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracttypes/metadatas?contracttypename=' + encodeURIComponent($(vMetadata).find("ContractType").text()),
                type: 'GET',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                cache: false,
                success: function (metadataFieldsvaluetocheck) {
                    var metadataFieldsvalue = metadataFieldsvaluetocheck;
                    //metadataFieldsvalue = $.grep(metadataFieldsvaluetocheck, function (n, i) {
                    //    return (n.Newform == "Show" || n.Newform == "Required");
                    //});
                    //manoj
                    if (strDocumentTemplate != null && strDocumentTemplate != "--Select--") {
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/template?templatename=' + strDocumentTemplate,
                            type: 'GET',
                            dataType: 'json',
                            'Content-Type': 'application/json',
                            cache: false,
                            headers: { 'eContracts-ApiKey': localStorage.APIKey },
                            success: function (metadataFields) {
                                var vTransactionTypeExist = '';
                                var vContractClassExist = '';
                                var datalenght = metadataFields.length;
                                if (datalenght > 0) {
                                    var vUserList = '';
                                    $("#" + tblCtrl).empty();
                                    $("#" + tblCtrl).append("<tr><td width='100%' colspan='2' valign='top'><div class='form_categoryhead'>Autopopulate fields <span style='font-size: 12px !important;'><img title='Autopopulate fields are mapped to place holders (content controls) in the selected document template. The data for these controls is automatically populated and synched with the related Contract Record(s) when the document is created and updated. Note: Document template controls should be mapped to corresponding metadata as part of template creation.' src='../Content/Images/help_training_blue.png'></span></div></td></tr>");
                                    //manoj
                                    var bindvaluetotemp = false;
                                    var bindfromcontype = false;
                                    //manoj
                                    for (var i = 0; i < datalenght; i++) {
                                        var item = metadataFields[i];
                                        if (item.FieldName == "ContractType") {
                                        }
                                        else if (item.FieldName == "TransactionType")
                                        { vTransactionTypeExist = 'Yes'; }
                                        else if (item.FieldName == "ContractClass")
                                        { vContractClassExist = 'Yes'; }
                                        else {
                                            //manoj
                                            bindvaluetotemp = false;
                                            bindfromcontype = true;
                                            var vAccFeatmetadataFieldsvalue = $.grep(metadataFieldsvalue, function (nmetadata, imetadata) {
                                                return (nmetadata.FieldName == item.FieldName);
                                            });
                                            if (vAccFeatmetadataFieldsvalue.length > 0) {
                                                bindvaluetotemp = true;
                                            } else if ($(vMetadata).find(item.FieldName).length > 0) {
                                                bindvaluetotemp = true;
                                                bindfromcontype = false;
                                            }
                                            //manoj
                                            if (bindvaluetotemp) {

                                                if (vAccFeatmetadataFieldsvalue[0] != undefined) {
                                                    var item = vAccFeatmetadataFieldsvalue[0];
                                                    var bindvaluefromcontype = ($(vMetadata).find(item.FieldName).length > 0) ? true : false;
                                                    //manoj
                                                    var vControls = '<tr>';
                                                    var vDate = "";
                                                    var onlydate = "";
                                                    var vUser = "";
                                                    var vNumber = "";
                                                    var vCurrency = "";
                                                    var vMultiDDL = "";
                                                    var vNumberD = "";
                                                    var vNumberP = "";
                                                    var vNumberPD = "";
                                                    var vProject = false;
                                                    var vContractValue = false;
                                                    vControls += '<td class="f_head"><label style="word-break: break-all;">' + item.FieldDisplayName;

                                                    vControls += "<img class='helpimg' src='../Content/Images/help_training.png' title='" + item.HelpText + "'></label>"

                                                    //if (item.FieldHelp == "true") {
                                                    //    vControls += "<img class='helpimg' src='../Content/Images/help_training.png' title='" + item.HelpText + "'></label>";
                                                    //} else {
                                                    //    vControls += '</label>';
                                                    //}
                                                    if (item.FieldType == "User") {
                                                        vControls += '</td><td class="f_list new-Doc-Multi width50">';
                                                    } else {
                                                        vControls += '</td><td class="f_list width50">';
                                                    }

                                                    if (item.FieldType == "Single Line Text") {

                                                        //manoj
                                                        var contractvaluetobind = (bindvaluefromcontype) ? $(vMetadata).find(item.FieldName).text() : "";
                                                        vControls += (contractvaluetobind != "") ? "<input type='text' id='" + item.FieldName + "' name='" + item.FieldName + "' maxlength='100' value='" + contractvaluetobind + "' class='f_inpt width80' />" : "<input type='text' id='" + item.FieldName + "' name='" + item.FieldName + "' maxlength='100' class='f_inpt width80' />";
                                                        //manoj
                                                        //if ($(vMetadata).find(item.FieldName).text() != "") {
                                                        //    vControls += "<input type='text' id=" + item.FieldName + " maxlength='100' name=" + item.FieldName + " value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width80' />";
                                                        //} else {
                                                        //    vControls += "<input type='text' id=" + item.FieldName + " maxlength='100' name=" + item.FieldName + " class='f_inpt width80' />";
                                                        //}
                                                    }
                                                    else if (item.FieldType == "Multi Line Text") {
                                                        //manoj
                                                        var contractvaluetobind = (bindvaluefromcontype) ? $(vMetadata).find(item.FieldName).text() : "";
                                                        vControls += (contractvaluetobind != "") ? "<textarea name=" + item.FieldName + " id=" + item.FieldName + " cols='40' rows='5' class='f_inpt width_91 height70' style='vertical-align:text-top;'>" + contractvaluetobind + "</textarea>" : "<textarea name=" + item.FieldName + " id=" + item.FieldName + " cols='40' rows='5' class='f_inpt width80 height70' style='vertical-align:text-top;'></textarea>";
                                                        //manoj
                                                        //if ($(vMetadata).find(item.FieldName).text() != "") {
                                                        //    vControls += "<textarea name=" + item.FieldName + " id=" + item.FieldName + " cols='40' rows='5' class='f_inpt width80 height70' style='vertical-align:text-top;'>" + $(vMetadata).find(item.FieldName).text() + "</textarea>";
                                                        //} else {
                                                        //    vControls += "<textarea name=" + item.FieldName + " id=" + item.FieldName + " cols='40' rows='5' class='f_inpt width80 height70' style='vertical-align:text-top;'></textarea>";
                                                        //}
                                                    }
                                                    else if (item.FieldType == "Hyperlink") {
                                                        //manoj
                                                        //for Hyperlink
                                                        var contractvaluetobind = (bindvaluefromcontype) ? $(vMetadata).find(item.FieldName).text() : "";
                                                        vControls += (contractvaluetobind != "") ? "<input type='text' id='" + item.FieldName + "' name='" + item.FieldName + "' placeholder='http://www.' maxlength='2083' value='" + contractvaluetobind + "' class='f_inpt width80 validwebsite' />" : "<input type='text' id='" + item.FieldName + "' name='" + item.FieldName + "' maxlength='2083' placeholder='http://www.' class='f_inpt width80 validwebsite' />";
                                                        vControls += '<a href="javascript:void(0)" class="linkText" title="' + item.FieldDisplayName + '" onclick="navigateurl(\'' + item.FieldName + '\')"> Navigate</a>';
                                                        //for Hyperlink
                                                        //manoj
                                                    }
                                                    else if (item.FieldType == "Date") {
                                                        //var vv = $(vMetadata).find(item.FieldName).text();
                                                        //manoj
                                                        var vv = (bindvaluefromcontype) ? $(vMetadata).find(item.FieldName).text() : "";
                                                        //manoj
                                                        onlydate = "";
                                                        if (vv != null) {
                                                            onlydate = vv.substring(0, vv.length - 19);
                                                        }
                                                        if (onlydate != "") {
                                                            if (localStorage.AppDateFormat == null || localStorage.AppDateFormat == "" || localStorage.AppDateFormat == 'undefined') {
                                                                onlydate = moment(new Date(onlydate)).format('MM/DD/YYYY');
                                                            }
                                                            else {
                                                                onlydate = moment(new Date(onlydate)).format(localStorage.AppDateFormat);
                                                            }
                                                        }
                                                        vControls += "<input type='text' readonly id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width80 form-contro-Date-Document validdate fielddatecontrol " + item.FieldName + "'/>";

                                                        vDate = item.FieldName;

                                                    }
                                                    else if (item.FieldType == "Choice") {
                                                        if (item.Required == "true") {
                                                            if (item.FieldName != "TransactionType" && item.FieldName != "ContractClass") {
                                                                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width_91 choicevaluecheck validelement'>";
                                                            } else {
                                                                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width_91 validelement'>";
                                                            }
                                                        } else {
                                                            if (item.FieldName != "TransactionType" && item.FieldName != "ContractClass") {
                                                                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width_91 choicevaluecheck '>";
                                                            } else {
                                                                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width_91'>";
                                                            }
                                                        }
                                                        vControls += "<option value='0'>--Select--</option>";

                                                        var myArray = [];
                                                        myArray = item.ChoiceValues.split("\n")
                                                        //manoj
                                                        var contractvaluetobind = (bindvaluefromcontype) ? $(vMetadata).find(item.FieldName).text() : "";
                                                        $(myArray).each(function (imyArray, itemmyArray) {
                                                            itemmyArray = itemmyArray.replace(/&amp;/g, "&");
                                                            vControls += (contractvaluetobind == itemmyArray) ? "<option value='" + itemmyArray + "' selected>" + itemmyArray + "</option>" : "<option value='" + itemmyArray + "'>" + itemmyArray + "</option>";
                                                        });
                                                        //manoj
                                                        //var myArraylength = myArray.length;
                                                        //for (var j = 0; j < myArraylength; j = j + 1) {
                                                        //    do {
                                                        //        myArray[j] = myArray[j].replace("&amp;", "&");
                                                        //    } while (myArray[j].indexOf("&amp;") > -1)
                                                        //    if ($(vMetadata).find(item.FieldName).text() == myArray[j]) {
                                                        //        vControls += "<option value='" + myArray[j] + "' selected>" + myArray[j] + "</option>";
                                                        //    } else {
                                                        //        vControls += "<option value='" + myArray[j] + "'>" + myArray[j] + "</option>";
                                                        //    }
                                                        //}

                                                        vControls += '</select>';
                                                    }
                                                    else if (item.FieldType == "User") {
                                                        if (item.Required == "true") {
                                                            vControls += "<select id=" + item.FieldName + " multiple='multiple' class='f_inpt width_91 chosenmulti validuser' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
                                                        } else {
                                                            vControls += "<select id=" + item.FieldName + " multiple='multiple' class='f_inpt width_91 chosenmulti' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
                                                        }
                                                        //vControls += "<option value='0'>--Select--</option>";
                                                        if (vUserList == '')
                                                        { vUserList = GetUserList(); }
                                                        vControls += vUserList;

                                                        vControls += '</select>';

                                                        vUser = item.FieldName;
                                                    } else if (item.FieldType == "Taxonomy") {


                                                        //manoj
                                                        var contractvaluetobind = (bindvaluefromcontype) ? $(vMetadata).find(item.FieldName).text() : "";
                                                        vControls += (contractvaluetobind != "") ? "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " value='" + contractvaluetobind + "' class='f_inpt width80' readonly='readonly' type='text' />" : "<input type='text' id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width80' readonly='readonly' type='text' />";
                                                        //manoj
                                                        //if ($(vMetadata).find(item.FieldName).text() != "") {
                                                        //    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width80' readonly='readonly' type='text' />";
                                                        //} else {
                                                        //    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width80' readonly='readonly' type='text' />";
                                                        //}

                                                        vControls += "<span class='right-float'><a href='javascript:void(0)' onclick='ViewBusinessArea()'> Browse</a></span>";

                                                    } else if (item.FieldType.indexOf("Browse") > -1) {

                                                        //manoj
                                                        var contractvaluetobind = (bindvaluefromcontype) ? $(vMetadata).find(item.FieldName).text() : "";
                                                        if (item.Required == "true") {
                                                            vControls += (contractvaluetobind != "") ? "<input id=" + item.FieldName + " name=" + item.FieldName + " value='" + contractvaluetobind + "' title='" + item.FieldDisplayName + "' class='f_inpt width80 validelement' readonly='readonly' type='text' />" : "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80 validelement' readonly='readonly' type='text' />"
                                                        } else {
                                                            vControls += (contractvaluetobind != "") ? "<input id=" + item.FieldName + " name=" + item.FieldName + " value='" + contractvaluetobind + "' title='" + item.FieldDisplayName + "' class='f_inpt width80' readonly='readonly' type='text' />" : "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80' readonly='readonly' type='text' />"
                                                        }
                                                        //manoj

                                                        //if (item.Required == "true") {
                                                        //    vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " value='" + $(vMetadata).find(item.FieldName).text() + "' title='" + item.FieldDisplayName + "' class='f_inpt width80 validelement' readonly='readonly' type='text' />";
                                                        //} else {
                                                        //    vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " value='" + $(vMetadata).find(item.FieldName).text() + "' title='" + item.FieldDisplayName + "' class='f_inpt width80' readonly='readonly' type='text' />";
                                                        //}
                                                        vControls += (item.FieldHelp == "true") ? '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>' : "";
                                                        //if (item.FieldHelp == "true") {
                                                        //    vControls += '
                                                        //}
                                                        vControls += "<a href='javascript:void(0)' class='linkText' id='" + item.FieldDisplayName + "' title='" + item.FieldName + "' onclick='ViewGeneric(this)'> Browse</a>";
                                                    }
                                                    else if (item.FieldType == "Lookup") {

                                                        if (item.FieldName == "Counterparty") {
                                                            var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                                                            var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                                                                return (n.RowKey == "6" && n.Status == "ON");
                                                            });
                                                            var vreadonly = "";
                                                            var vbrowse = "";
                                                            if (vAccFeat.length > 0) {
                                                                vreadonly = "readonly='readonly'";
                                                                vbrowse = "<span class='right-float'><a href='javascript:void(0)' title='" + item.FieldName + "' onclick='ViewCounterparty(this)'> Browse</a></span>";
                                                            }
                                                            //manoj
                                                            var recounterparty = new RegExp("'", 'g');
                                                            var contractvaluetobind = (bindvaluefromcontype) ? $(vMetadata).find(item.FieldName).text() : "";
                                                            contractvaluetobind = contractvaluetobind.replace(recounterparty, "&#39");
                                                            //if ($(vMetadata).find(item.FieldName).text() == "Counterparty not in the list") {
                                                            if (contractvaluetobind == "Counterparty not in the list") {
                                                                $("#chkCounterpartyNotInList").attr("checked", "checked");
                                                                $("#tblCounterparties").attr('disabled', 'disabled');
                                                            }
                                                            else {
                                                                $("#txtCounterpartyCreate").val($(vMetadata).find(item.FieldName).text());
                                                            }

                                                            vControls += "<input type='text' id='" + item.FieldName + "' name='" + item.FieldName + "' value='" + contractvaluetobind + "' class='f_inpt width80' " + vreadonly + " type='text' />";

                                                            vControls += vbrowse;
                                                        } else if (item.FieldName == "Project") {
                                                            vProject = true;

                                                            //manoj
                                                            var contractvaluetobind = (bindvaluefromcontype) ? $(vMetadata).find(item.FieldName).text() : "";
                                                            vControls += (item.Required == "true") ? "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + contractvaluetobind + "' class='f_inpt width80 valid' readonly='readonly' type='text' />" : "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + contractvaluetobind + "' class='f_inpt width80' readonly='readonly' type='text' />";
                                                            //manoj
                                                            //if (item.Required == "true") {
                                                            //    vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width80 valid' readonly='readonly' type='text' />";
                                                            //} else {
                                                            //    vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width80' readonly='readonly' type='text' />";
                                                            //}

                                                            vControls += (item.FieldHelp == "true") ? '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>' : "";
                                                            //if (item.FieldHelp == "true") {
                                                            //    vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                                            //}
                                                            vControls += "<a href='javascript:void(0)' class='linkText' onclick='ViewProjects()'> Browse</a>";
                                                            projectManager = $(vMetadata).find("ProjectManager").text()
                                                        }
                                                        else if (item.FieldName == "CompanyProfile") {
                                                            ////manoj
                                                            //vControls += (item.Required == "true") ? "<select id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width_91 validelement'>" : "<select id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width82'>";
                                                            //vControls += "<option value='0'>--Select--</option>";
                                                            ////manoj
                                                            //var contractvaluetobind = (bindvaluefromcontype) ? $(vMetadata).find(item.FieldName).text() : "";
                                                            //vControls += getcompanyprofile(contractvaluetobind) + "</select>";
                                                            ////manoj

                                                            var contractvaluetobind = (bindvaluefromcontype) ? $(vMetadata).find(item.FieldName).text() : "";

                                                            var reLE = new RegExp("'", 'g');
                                                            var LE = contractvaluetobind.replace(reLE, "&#39");
                                                            if (LE != "undefined" && LE != "" && LE != null) {
                                                                var AryLE = LE.split(';');
                                                                var finalLE = '';
                                                                for (var j = 0; j < AryLE.length; j++) {
                                                                    if (finalLE == "")
                                                                        finalLE = AryLE[j].trim().replace(reLE, "&#39");
                                                                    else
                                                                        finalLE += "; " + AryLE[j].trim().replace(reLE, "&#39");
                                                                }

                                                            }
                                                            if (contractvaluetobind == "")
                                                                finalLE = "";

                                                            vControls += "<input type='text' id='" + item.FieldName + "' name='" + item.FieldName + "' value='" + finalLE + "' class='f_inpt width80' " + vreadonly + " type='text' />";
                                                            vControls += "<span class='right-float'><a href='javascript:void(0)' class='linkText' onclick='ViewLegalEntity()'> Browse</a></span>";
                                                        }
                                                        else if (item.FieldName == "ContractPricingType") {
                                                            //manoj
                                                            vControls += (item.Required == "true") ? "<select id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width_91 validelement'>" : "<select id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width_91'>";
                                                            vControls += "<option value='0'>--Select--</option>";
                                                            //manoj
                                                            //if (item.Required == "true") {
                                                            //    vControls += "<select id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width82 validelement'>";
                                                            //} else {
                                                            //    vControls += "<select id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width82'>";
                                                            //}
                                                            //manoj
                                                            var contractvaluetobind = (bindvaluefromcontype) ? $(vMetadata).find(item.FieldName).text() : "";
                                                            getcontractpricingtype(contractvaluetobind);
                                                            //manoj
                                                            //getcontractpricingtype($(vMetadata).find(item.FieldName).text());
                                                        }
                                                        else if (item.FieldName == "BillingFrequency") {
                                                            //manoj
                                                            vControls += (item.Required == "true") ? "<select id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width_91 validelement'>" : "<select id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width_91'>";
                                                            //manoj
                                                            //if (item.Required == "true") {
                                                            //    vControls += "<select id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width82 validelement'>";
                                                            //} else {
                                                            //    vControls += "<select id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width82'>";
                                                            //}
                                                            vControls += "<option value='0'>--Select--</option>";
                                                            //getbillingfrequency($(vMetadata).find(item.FieldName).text());
                                                            //manoj
                                                            var contractvaluetobind = (bindvaluefromcontype) ? $(vMetadata).find(item.FieldName).text() : "";
                                                            getbillingfrequency(contractvaluetobind);
                                                            //manoj
                                                        }
                                                        else if (item.FieldName == "Status") {
                                                            vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width_91' readonly>";
                                                            vControls += "<option value='0'>--Select--</option>";
                                                            //manoj
                                                            var contractvaluetobind = (bindvaluefromcontype) ? $(vMetadata).find(item.FieldName).text() : "";
                                                            vControls += getStatus(contractvaluetobind) + "</select>";
                                                            //manoj
                                                            //vControls += getStatus($(vMetadata).find(item.FieldName).text()) + "</select>";
                                                        }
                                                        else if (item.FieldName == "OriginatingParty") {
                                                            //manoj
                                                            var contractvaluetobind = (bindvaluefromcontype) ? $(vMetadata).find(item.FieldName).text() : "";
                                                            vControls += (item.Required == "true") ? "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " value='" + contractvaluetobind + "' class='f_inpt width80 validelement' readonly='readonly' type='text' />" : "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " value='" + contractvaluetobind + "' class='f_inpt width80' readonly='readonly' type='text' />";
                                                            //if (item.Required == "true") {
                                                            //    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width80 validelement' readonly='readonly' type='text' />";
                                                            //} else {
                                                            //    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width80' readonly='readonly' type='text' />";
                                                            //}
                                                            var orgpttype = "";
                                                            if (bindvaluefromcontype) {
                                                                orgpttype = $(vMetadata).find("OriginatingPartyType").text();
                                                            }
                                                            $("#txtOriginatingPartyType").val(orgpttype);
                                                            //$("#txtOriginatingPartyType").val($(vMetadata).find("OriginatingPartyType").text());
                                                            if (orgpttype == "Counterparty") {
                                                                SelectCounterparties();
                                                            }
                                                            vControls += "<span class='right-float'><a href='javascript:void(0)' onclick='ViewOriginatingParty()'> Browse</a></span>";
                                                        }
                                                            //else if (item.FieldName == "ContractCurrency") {
                                                            //    vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width82'>";
                                                            //    vControls += "<option value='0'>--Select--</option>";
                                                            //    vControls += getContractCurrency($(vMetadata).find(item.FieldName).text()) + "</select>";
                                                            //}

                                                        else if (item.FieldName == "ContractCurrency") {

                                                        }
                                                        else if (item.FieldName == "Project") {
                                                        }
                                                        else if (item.FieldName == "PaymentType") {
                                                            //manoj
                                                            vControls += (item.Required == "true") ? "<select id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width_91 validelement'>" : "<select id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width_91'>";
                                                            //manoj
                                                            //if (item.Required == "true") {
                                                            //    vControls += "<select id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width82 validelement'>";
                                                            //} else {
                                                            //    vControls += "<select id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width82'>";
                                                            //}
                                                            vControls += "<option value='0'>--Select--</option>";
                                                            //vControls += getpaymenttype($(vMetadata).find(item.FieldName).text()) + "</select>";

                                                            //manoj
                                                            var contractvaluetobind = (bindvaluefromcontype) ? $(vMetadata).find(item.FieldName).text() : "";
                                                            vControls += getpaymenttype(contractvaluetobind) + "</select>";
                                                            //manoj
                                                        }
                                                        else if (item.FieldName == "LicenceType") {
                                                            //manoj
                                                            vControls += (item.Required == "true") ? "<select id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width_91 validelement'>" : "<select id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width_91'>";
                                                            //manoj
                                                            //if (item.Required == "true") {
                                                            //    vControls += "<select id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width82 validelement'>";
                                                            //} else {
                                                            //    vControls += "<select id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width82'>";
                                                            //}
                                                            vControls += "<option value='0'>--Select--</option>";
                                                            //vControls += getlicencetype($(vMetadata).find(item.FieldName).text()) + "</select>";

                                                            //manoj
                                                            var contractvaluetobind = (bindvaluefromcontype) ? $(vMetadata).find(item.FieldName).text() : "";
                                                            vControls += getlicencetype(contractvaluetobind) + "</select>";
                                                            //manoj
                                                        }
                                                        else if (item.FieldName == "RelatedContracts") {
                                                            //oldRelatedcontract = $(vMetadata).find(item.FieldName).text();
                                                            //manoj
                                                            oldRelatedcontract = (bindvaluefromcontype) ? $(vMetadata).find(item.FieldName).text() : "";
                                                            if (oldRelatedcontract != "") {
                                                                SavedRelatedContract = [];
                                                                $.each(oldRelatedcontract.split(";"), function () {
                                                                    if (this != "") {
                                                                        if ($.trim(this) != "") {
                                                                            SavedRelatedContract.push($.trim(this));
                                                                        }
                                                                    }
                                                                });
                                                                oldRelatedcontract = SavedRelatedContract.join("; ");
                                                            }
                                                            //manoj
                                                            vControls += (item.Required == "true") ? "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + oldRelatedcontract + "' class='f_inpt width_91 validelement' readonly='readonly' type='text' />" : "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + oldRelatedcontract + "' class='f_inpt width_91' readonly='readonly' type='text' />";
                                                            //manoj
                                                            //if (item.Required == "true") {
                                                            //    vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + oldRelatedcontract + "' class='f_inpt width82 validelement' readonly='readonly' type='text' />";
                                                            //} else {
                                                            //    vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + oldRelatedcontract + "' class='f_inpt width82' readonly='readonly' type='text' />";
                                                            //}
                                                            vControls += (item.FieldHelp == "true") ? '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>' : '';
                                                            //if (item.FieldHelp == "true") {
                                                            //    vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                                            //}
                                                            vControls += "<a href='javascript:void(0)' class='linkText' onclick='ViewRelatedContracts()'> Browse</a>";
                                                        }
                                                        else if (item.FieldName == "RelatedRequests") {
                                                            //manoj
                                                            var contractvaluetobind = (bindvaluefromcontype) ? $(vMetadata).find(item.FieldName).text() : "";
                                                            vControls += (item.Required == "true") ? "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "'  value='" + contractvaluetobind + "' class='f_inpt width_91 validelement' readonly='readonly' type='text' />" : "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "'  value='" + contractvaluetobind + "' class='f_inpt width_91' readonly='readonly' type='text' />";
                                                            //manoj
                                                            //if (item.Required == "true") {
                                                            //    vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "'  value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width82 validelement' readonly='readonly' type='text' />";
                                                            //} else {
                                                            //    vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "'  value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width82' readonly='readonly' type='text' />";
                                                            //}
                                                            vControls += (item.FieldHelp == "true") ? '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>' : '';
                                                            //if (item.FieldHelp == "true") {
                                                            //    vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                                            //}
                                                            vControls += "<a href='javascript:void(0)' class='linkText' onclick='ViewRelatedRequest()'> Browse</a>";
                                                        } else {
                                                            //manoj
                                                            var contractvaluetobind = (bindvaluefromcontype) ? $(vMetadata).find(item.FieldName).text() : "";
                                                            vControls += (item.Required == "true") ? "<select id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width_91 validelement'>" : "<select id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width_91'>";
                                                            //manoj
                                                            //if (item.Required == "true") {
                                                            //    vControls += "<select id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width82 validelement'>";
                                                            //} else {
                                                            //    vControls += "<select id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width82'>";
                                                            //}
                                                            vControls += "<option value='0'>--Select--</option>";
                                                            $.ajax({
                                                                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/customlookupvaluedetails?lookupname=' + item.ChoiceValues,
                                                                type: 'GET',
                                                                dataType: 'json',
                                                                "Content-Type": "application/json",
                                                                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                                                                cache: false,
                                                                async: false,
                                                                success: function (data) {
                                                                    var datalength1 = data.LookupFields.split(';');
                                                                    datalength1 = datalength1.sort();
                                                                    datalength1 = sortArrOfObjectsByParam(datalength1);
                                                                    //manoj
                                                                    $(datalength1).each(function (idatalength1, itemdatalength1) {
                                                                        vControls += (contractvaluetobind == itemdatalength1) ? "<option value='" + itemdatalength1 + "' selected='selected'>" + itemdatalength1 + "</option>" : "<option value='" + itemdatalength1 + "'>" + itemdatalength1 + "</option>";
                                                                    });
                                                                    //manoj
                                                                    //var datalength = datalength1.length;
                                                                    //for (var m = 0; m < datalength; m++) {
                                                                    //    var itemname = datalength1[m];

                                                                    //    if (itemname == $(vMetadata).find(item.FieldName).text()) {
                                                                    //        vControls += "<option value='" + itemname + "' selected='selected'>" + itemname + "</option>";
                                                                    //    } else {
                                                                    //        vControls += "<option value='" + itemname + "'>" + itemname + "</option>";
                                                                    //    }
                                                                    //}
                                                                    vControls += "</select>";
                                                                },
                                                                error: function (data) {
                                                                    vControls += "</select>";
                                                                }
                                                            });
                                                        }
                                                    } else if (item.FieldType.indexOf("Dropdown") > -1 || item.FieldType.indexOf("Multi Select") > -1) {
                                                        if (item.FieldType.indexOf("Dropdown") > -1) {
                                                            if (item.Required == "true") {
                                                                vControls += "<select id=" + item.FieldName + " multiple='multiple' class='f_inpt width_91 chosenmulti validuser' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
                                                            } else {
                                                                vControls += "<select id=" + item.FieldName + " multiple='multiple' class='f_inpt width_91 chosenmulti' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
                                                            }
                                                            var vMultiDDL1 = "";
                                                            if (vMultiDDL1 == '') {
                                                                var myArray = [];
                                                                myArray = item.ChoiceValues.split("\n")
                                                                //manoj
                                                                $(myArray).each(function (imyArray, myArraydatalength1) {
                                                                    vMultiDDL1 += "<option value='" + myArraydatalength1 + "'>" + myArraydatalength1 + "</option>";
                                                                });
                                                                //manoj
                                                                //var myArraylength = myArray.length;
                                                                //for (var k = 0; k < myArraylength; k = k + 1) {
                                                                //    vMultiDDL1 += "<option value='" + myArray[k] + "'>" + myArray[k] + "</option>";
                                                                //}
                                                            }
                                                            vControls += vMultiDDL1;
                                                            vControls += '</select>';
                                                            vMultiDDL = item.FieldName;
                                                        }
                                                        else {
                                                            if (item.ChoiceValues == "Counterparty") {
                                                                var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                                                                var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                                                                    return (n.RowKey == "6" && n.Status == "ON");
                                                                });
                                                                var vreadonly = "";
                                                                var vbrowse = "";
                                                                if (vAccFeat.length > 0) {
                                                                    vreadonly = "readonly='readonly'";
                                                                    vbrowse = "<span class='right-float'><a href='javascript:void(0)' title='" + item.FieldName + "' onclick='ViewCounterparty(this)'> Browse</a></span>";
                                                                }
                                                                //manoj
                                                                var recounterparty = new RegExp("'", 'g');
                                                                var contractvaluetobind = (bindvaluefromcontype) ? $(vMetadata).find(item.FieldName).text() : "";
                                                                contractvaluetobind = contractvaluetobind.replace(recounterparty, "&#39");
                                                                //if ($(vMetadata).find(item.FieldName).text() == "Counterparty not in the list") {
                                                                if (contractvaluetobind == "Counterparty not in the list") {
                                                                    $("#chkCounterpartyNotInList").attr("checked", "checked");
                                                                    $("#tblCounterparties").attr('disabled', 'disabled');
                                                                }
                                                                vControls += "<input type='text' id='" + item.FieldName + "' name='" + item.FieldName + "' value='" + contractvaluetobind + "' class='f_inpt width80' " + vreadonly + " type='text' />";

                                                                vControls += vbrowse;
                                                            }
                                                            else {
                                                                if (item.Required == "true") {
                                                                    vControls += "<select id=" + item.FieldName + " multiple='multiple' class='f_inpt width_91 chosenmulti validuser' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
                                                                } else {
                                                                    vControls += "<select id=" + item.FieldName + " multiple='multiple' class='f_inpt width_91 chosenmulti' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
                                                                }
                                                                var vMultiDDL1 = "";
                                                                if (vMultiDDL1 == '') {
                                                                    $.ajax({
                                                                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/customlookupvaluedetails?lookupname=' + item.ChoiceValues,
                                                                        type: 'GET',
                                                                        dataType: 'json',
                                                                        "Content-Type": "application/json",
                                                                        headers: { 'eContracts-ApiKey': localStorage.APIKey },
                                                                        cache: false,
                                                                        async: false,
                                                                        success: function (data) {
                                                                            var datalength1 = data.LookupFields.split(';');
                                                                            datalength1 = datalength1.sort();
                                                                            datalength1 = sortArrOfObjectsByParam(datalength1);
                                                                            //var datalength = datalength1.length;
                                                                            //manoj
                                                                            $(datalength1).each(function (idatalength1, datalength1) {
                                                                                vMultiDDL1 += "<option value='" + datalength1 + "'>" + datalength1 + "</option>";
                                                                            });
                                                                            //manoj
                                                                            //for (var l = 0; l < datalength; l++) {
                                                                            //    var itemname = datalength1[l];
                                                                            //    vMultiDDL1 += "<option value='" + itemname + "'>" + itemname + "</option>";
                                                                            //}
                                                                        }
                                                                    });
                                                                }
                                                                vControls += vMultiDDL1;

                                                                vControls += '</select>';
                                                                vMultiDDL = item.FieldName;
                                                            }

                                                        }
                                                    } else if (item.FieldType == "Currency" || item.FieldType == "Value / Financials") {
                                                        //manoj
                                                        var contractvaluetobind = (bindvaluefromcontype) ? $(vMetadata).find(item.FieldName).text() : "";
                                                        //manoj
                                                        if (item.FieldName == "ContractValue") {
                                                            vContractValue = true;
                                                        }

                                                        if (item.Required == "true") {
                                                            //manoj
                                                            vControls += (contractvaluetobind != "") ? "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + contractvaluetobind + "' class='f_inpt width80 validelement' />" : "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80 validelement' />";
                                                            //manoj
                                                        } else {
                                                            //manoj
                                                            vControls += (contractvaluetobind != "") ? "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + contractvaluetobind + "' class='f_inpt width80' />" : "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80' />";
                                                            //manoj
                                                        }
                                                        //if (item.Required == "true") {
                                                        //    if ($(vMetadata).find(item.FieldName).text() == "") {
                                                        //        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80 validelement' />";
                                                        //    } else {
                                                        //        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width80 validelement' />";
                                                        //    }
                                                        //} else {
                                                        //    if ($(vMetadata).find(item.FieldName).text() == "") {
                                                        //        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80' />";
                                                        //    } else {
                                                        //        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width80' />";
                                                        //    }
                                                        //}
                                                        vCurrency = item.FieldName;
                                                    } else if (item.FieldType == "Number") {
                                                        //manoj
                                                        var contractvaluetobind = (bindvaluefromcontype) ? $(vMetadata).find(item.FieldName).text() : "";
                                                        //manoj
                                                        if (item.Required == "true") {
                                                            vControls += (contractvaluetobind != "") ? "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + contractvaluetobind + "' class='f_inpt width80 validelement' />" : "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80 validelement' />";
                                                            //if ($(vMetadata).find(item.FieldName).text() == "") {
                                                            //    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80 validelement' />";
                                                            //} else {
                                                            //    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width80 validelement' />";
                                                            //}
                                                        } else {
                                                            vControls += (contractvaluetobind != "") ? "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + contractvaluetobind + "' class='f_inpt width80' />" : "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80' />";
                                                            //if ($(vMetadata).find(item.FieldName).text() == "") {
                                                            //    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80' />";
                                                            //} else {
                                                            //    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width80' />";
                                                            //}
                                                        }

                                                        vNumber = item.FieldName;
                                                    }
                                                    else if (item.FieldType == "Number-D") {
                                                        var contractvaluetobind = (bindvaluefromcontype) ? $(vMetadata).find(item.FieldName).text() : "";
                                                        if (item.Required == "true") {
                                                            vControls += (contractvaluetobind != "") ? "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + contractvaluetobind + "' class='f_inpt width80 validelement' />" : "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80 validelement' />";

                                                        } else {
                                                            vControls += (contractvaluetobind != "") ? "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + contractvaluetobind + "' class='f_inpt width80' />" : "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80' />";
                                                        }
                                                        vNumberD = item.FieldName;
                                                    }
                                                        //percent
                                                    else if (item.FieldType == "Number-P") {
                                                        var contractvaluetobind = (bindvaluefromcontype) ? $(vMetadata).find(item.FieldName).text() : "";
                                                        if (item.Required == "true") {
                                                            vControls += (contractvaluetobind != "") ? "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + contractvaluetobind + "' class='f_inpt width80 validelement' />" : "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80 validelement' />";

                                                        } else {
                                                            vControls += (contractvaluetobind != "") ? "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + contractvaluetobind + "' class='f_inpt width80' />" : "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80' />";
                                                        }
                                                        vControls += '<label class="margin-top-8" >' + '%' + '</label>';
                                                        vNumberP = item.FieldName;
                                                    }
                                                        //Percent Decimal
                                                    else if (item.FieldType == "Number-PD") {
                                                        var contractvaluetobind = (bindvaluefromcontype) ? $(vMetadata).find(item.FieldName).text() : "";
                                                        if (item.Required == "true") {
                                                            vControls += (contractvaluetobind != "") ? "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + contractvaluetobind + "' class='f_inpt width80 validelement' />" : "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80 validelement' />";

                                                        } else {
                                                            vControls += (contractvaluetobind != "") ? "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + contractvaluetobind + "' class='f_inpt width80' />" : "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80' />";
                                                        }
                                                        vControls += '<label class="margin-top-8" >' + '%' + '</label>';
                                                        vNumberPD = item.FieldName;
                                                    }
                                                    else if (item.FieldType == "Yes/No") {
                                                        //manoj
                                                        var contractvaluetobind = (bindvaluefromcontype) ? $(vMetadata).find(item.FieldName).text() : "";
                                                        //manoj
                                                        if (contractvaluetobind == "") {
                                                            vControls += "	<input type='radio' name=" + item.FieldName + " value='Yes'>Yes ";
                                                            vControls += "	<input type='radio' name=" + item.FieldName + " checked value='No'>No";
                                                        } else if (contractvaluetobind == "Yes") {
                                                            vControls += "	<input type='radio' name=" + item.FieldName + " checked value='Yes'>Yes ";
                                                            vControls += "	<input type='radio' name=" + item.FieldName + " value='No'>No";
                                                        } else if (contractvaluetobind == "No") {
                                                            vControls += "	<input type='radio' name=" + item.FieldName + " value='Yes'>Yes ";
                                                            vControls += "	<input type='radio' name=" + item.FieldName + " checked value='No'>No";
                                                        }

                                                    } else if (item.FieldType == "Email") {
                                                        //manoj
                                                        var contractvaluetobind = (bindvaluefromcontype) ? $(vMetadata).find(item.FieldName).text() : "";
                                                        vControls += (contractvaluetobind != "") ? "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + contractvaluetobind + "' class='f_inpt width80' />" : "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80' />";
                                                        //manoj
                                                        if (item.Required == "true") {
                                                            vControls += (contractvaluetobind != "") ? "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + contractvaluetobind + "' class='f_inpt width80 validemail validelement' />" : "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80 validemail validelement' />";
                                                            //if ($(vMetadata).find(item.FieldName).text() == "") {
                                                            //    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80 validemail validelement' />";
                                                            //} else {
                                                            //    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width80 validemail validelement' />";
                                                            //}
                                                        } else {
                                                            vControls += (contractvaluetobind != "") ? "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + contractvaluetobind + "' class='f_inpt width80 validemail' />" : "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80 validemail' />";
                                                            //if ($(vMetadata).find(item.FieldName).text() == "") {
                                                            //    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80 validemail' />";
                                                            //} else {
                                                            //    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width80 validemail' />";
                                                            //}
                                                        }
                                                    }

                                                    vControls += '</td></tr>';
                                                    $("#" + tblCtrl).append(vControls);
                                                    if (vDate != "") {

                                                        if (localStorage.AppDateFormat == null || localStorage.AppDateFormat == "" || localStorage.AppDateFormat == 'undefined') {
                                                            if (onlydate != "") {
                                                                $("#" + vDate + "").datepicker({
                                                                    changeMonth: true,
                                                                    changeYear: true
                                                                });
                                                                $("#" + vDate + "").datepicker().datepicker('setDate', onlydate);


                                                            }
                                                            else {
                                                                $("#" + vDate + "").datepicker({
                                                                    changeMonth: true,
                                                                    changeYear: true
                                                                });
                                                            }
                                                        }
                                                        else {
                                                            var dateformate = localStorage.AppDateFormat.toLowerCase().slice(0, -2);
                                                            if (onlydate != "") {
                                                                $("#" + vDate + "").datepicker({
                                                                    changeMonth: true,
                                                                    changeYear: true,
                                                                    dateFormat: dateformate
                                                                });

                                                                $("#" + vDate + "").datepicker().datepicker('setDate', onlydate);

                                                            }
                                                            else {
                                                                $("#" + vDate + "").datepicker({
                                                                    changeMonth: true,
                                                                    changeYear: true,
                                                                    dateFormat: dateformate
                                                                });
                                                            }

                                                        }


                                                        vDate = "";
                                                    }
                                                    if (vNumber != "") {
                                                        allowOnlyNumberInInputBox(vNumber);
                                                        vNumber == "";
                                                    }
                                                    if (vNumberD != "") {
                                                        allowOnlyDecimalNumberInInputBox(vNumberD);
                                                        vNumberD == "";
                                                    }
                                                    if (vNumberP != "") {
                                                        allowOnlyNumberInInputBox(vNumberP);
                                                        vNumberP == "";
                                                    }
                                                    if (vNumberPD != "") {
                                                        allowOnlyDecimalNumberInInputBox(vNumberPD);
                                                        vNumberPD == "";
                                                    }

                                                    if (vUser != "") {
                                                        $("#" + vUser + "").chosen().trigger("chosen:updated");
                                                        $('.chosenmulti').on('chosen:showing_dropdown', function (evt, params) {
                                                            $('.result-selected').css('display', 'none');
                                                        });
                                                        //if ($(vMetadata).find(item.FieldName).text() != "") {
                                                        //    GetValuesAndAutoPopulate(vUser, $(vMetadata).find(item.FieldName).text());
                                                        //}
                                                        //manoj
                                                        var contractvaluetobind = (bindvaluefromcontype) ? $(vMetadata).find(item.FieldName).text() : "";
                                                        if (contractvaluetobind != "") {
                                                            GetValuesAndAutoPopulate(vUser, contractvaluetobind);
                                                        }
                                                        //manoj
                                                        vUser = "";
                                                    }
                                                    if (vCurrency != "") {
                                                        //if (vCurrencyDisplayStyle == "1,234,567.89 (United Kingdom, United States, Hong Kong, Australia)") {
                                                        //    $('#' + vCurrency).autoNumeric();
                                                        //} else if (vCurrencyDisplayStyle == "1 234 567.89 (Canada, China)") {
                                                        //    $('#' + vCurrency).autoNumeric({
                                                        //        aSep: ' ',
                                                        //        aDec: '.'
                                                        //    });

                                                        //} else if (vCurrencyDisplayStyle == "1.234.567,89 (Most of EU)") {
                                                        //    $('#' + vCurrency).autoNumeric({
                                                        //        aSep: '.',
                                                        //        aDec: ','
                                                        //    });
                                                        //} else if (vCurrencyDisplayStyle == "12,34,567.89 (India, South Asia)") {
                                                        //    $('#' + vCurrency).autoNumeric({
                                                        //        dGroup: '2',
                                                        //    });
                                                        //}
                                                        //vCurrency == "";
                                                        if (vCurrencyDisplayStyle == "UK") {
                                                            $('#' + vCurrency).autoNumeric();
                                                        } else if (vCurrencyDisplayStyle == "CAN") {
                                                            $('#' + vCurrency).autoNumeric({ aSep: ' ', aDec: '.' });
                                                        } else if (vCurrencyDisplayStyle == "EU") {
                                                            $('#' + vCurrency).autoNumeric({ aSep: '.', aDec: ',' });
                                                        } else if (vCurrencyDisplayStyle == "IND") {
                                                            $('#' + vCurrency).autoNumeric({ dGroup: '2' });
                                                        }
                                                        vCurrency == "";
                                                    }

                                                    if (vMultiDDL != "") {

                                                        $("#" + vMultiDDL + "").chosen().trigger("chosen:updated");
                                                        $('.chosenmulti').on('chosen:showing_dropdown', function (evt, params) {
                                                            $('.result-selected').css('display', 'none');
                                                        });

                                                        //if ($(vMetadata).find(vMultiDDL).text() != "") {
                                                        //    GetValuesAndAutoPopulate(vMultiDDL, $(vMetadata).find(vMultiDDL).text());
                                                        //}
                                                        //manoj
                                                        var contractvaluetobind = (bindvaluefromcontype) ? $(vMetadata).find(item.FieldName).text() : "";
                                                        if (contractvaluetobind != "") {
                                                            GetValuesAndAutoPopulate(vMultiDDL, contractvaluetobind);
                                                        }
                                                        //manoj
                                                        vMultiDDL = "";
                                                    }
                                                    if (vContractValue) {
                                                        var vControls = "";
                                                        $.ajax({
                                                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/currencies',
                                                            type: 'GET',
                                                            dataType: 'json',
                                                            headers: { 'eContracts-ApiKey': localStorage.APIKey },
                                                            cache: false,
                                                            async: false,
                                                            success: function (data) {
                                                                vControls = '<tr><td class="f_head"><label>Contract Currency</label>';
                                                                vControls += '</td><td class="f_list width50">';
                                                                vControls += "<select id='ContractCurrency' name='ContractCurrency' title='Contract Currency' class='f_inpt width_91'>";
                                                                vControls += "<option value='0'>--Select--</option>";
                                                                var contractvaluetobind = (bindvaluefromcontype) ? $(vMetadata).find("ContractCurrency").text() : "";
                                                                $(data).each(function (i, item) {
                                                                    //manoj
                                                                    vControls += (item.Abbreviation == contractvaluetobind) ? "<option value=" + encodeURI(item.Abbreviation) + " selected='selected'>" + item.Abbreviation + "</option>" : "<option value=" + encodeURI(item.Abbreviation) + ">" + item.Abbreviation + "</option>";
                                                                    //manoj
                                                                    //if (item.Abbreviation == $(vMetadata).find("ContractCurrency").text()) {
                                                                    //    vControls += "<option value=" + encodeURI(item.Abbreviation) + " selected='selected'>" + item.Abbreviation + "</option>";
                                                                    //}
                                                                    //else {
                                                                    //    vControls += "<option value=" + encodeURI(item.Abbreviation) + ">" + item.Abbreviation + "</option>";
                                                                    //}
                                                                });
                                                                vControls += '</select></td></tr>';
                                                            }
                                                        });

                                                        $("#" + tblCtrl).append(vControls);
                                                        vContractValue = false;
                                                    }
                                                    if (vProject) {
                                                        //manoj
                                                        var contractvaluetobindvalue = (bindvaluefromcontype) ? $(vMetadata).find(item.FieldName).text() : "";
                                                        var contractvaluetobind = (bindvaluefromcontype) ? $(vMetadata).find("ProjectTask").text() : "";
                                                        vControls = (contractvaluetobindvalue != "" || item.Required == "true") ? '<tr><td><label id="lblprojecttasktocheck">Project Tasks<span class="text-red">*</span></label></td>' : '<tr><td><label id="lblprojecttasktocheck">Project Tasks</label></td>'
                                                        vControls += (contractvaluetobindvalue != "" || item.Required == "true") ? "<td><input id='ProjectTask' name='ProjectTask' value='" + contractvaluetobind + "' title='Project Task' class='f_inpt width_91 validelement' readonly='readonly' type='text' />" : "<td><input id='ProjectTask' name='ProjectTask' value='" + contractvaluetobind + "' title='Project Task' class='f_inpt width_91 validelement' readonly='readonly' type='text' />";
                                                        //vControls = '<tr><td><label>Project Tasks<span class="required">*</span></label></td>';
                                                        //vControls += "<td><input id='ProjectTask' name='ProjectTask' value='" + contractvaluetobind + "' title='Project Task' class='f_inpt width_91 validelement' readonly='readonly' type='text' />";
                                                        vControls += "<a href='javascript:void(0)' class='linkText' onclick='ViewProjectTasks()'> Browse</a>";
                                                        vControls += '</td></tr>';
                                                        $("#" + tblCtrl).append(vControls);
                                                        vProject = false;
                                                    }
                                                }
                                                else {
                                                    //var vControls = '<tr><td class="f_head"><label style="word-break: break-all;">' + item.FieldDisplayName + '</td><td class="f_list width50">Not available</td></tr>';
                                                    //$("#" + tblCtrl).append(vControls);
                                                    var vControls = "<tr><td class='f_head'><label style='word-break: break-all;'>" + item.FieldDisplayName + "<img class='helpimg' src='../Content/Images/help_training.png' title='" + item.HelpText + "'></label></td><td class='f_list width50'>Not available</td></tr>";
                                                    $("#" + tblCtrl).append(vControls);
                                                }
                                            }
                                        }
                                    }
                                    // $("#" + helptextvalue).css('display', '');
                                } else {
                                    //$("#" + helptextvalue).css('display', 'none');
                                    $("#" + tblCtrl).empty();
                                    $('#spInProgress').css('display', 'none');
                                    swal("", "No content controls are mapped in the template.");
                                }
                                if (vTransactionTypeExist == 'Yes') {
                                    $("#trTransactionType").css("display", "");
                                }
                                if (vContractClassExist == 'Yes') {
                                    $("#trContractClass").css("display", "");
                                }
                            },
                            error:
                                function (contractfields) {
                                    //$("#" + helptextvalue).css('display', 'none');
                                    $("#" + tblCtrl).empty();
                                    $('#spInProgress').css('display', 'none');
                                }
                        });
                    } else {
                        //$("#" + helptextvalue).css('display', 'none');
                        $("#" + tblCtrl).html('');
                        $('#spInProgress').css('display', 'none');
                    }
                },
                error:
                function (contractfields) {
                    //$("#" + helptextvalue).css('display', 'none');
                    $("#" + tblCtrl).empty();
                    $('#spInProgress').css('display', 'none');
                }
            });
        },
        error:
            function (contractfields) {
                //$("#" + helptextvalue).css('display', 'none');
                $("#" + tblCtrl).empty();
                $('#spInProgress').css('display', 'none');
            }
    });
}

function GetUserList() {
    var vUserList = '';
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        async: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (dataUser) {
            var datalenght = dataUser.length;
            for (var i = 0; i < datalenght; i++) {
                var item = dataUser[i];
                var sRowKey = item.RowKey;
                var sUserName = item.UserName;
                vUserList += '<option value="' + sUserName + '">' + sUserName + '</option>';
            }
        },
        error:
            function (dataUser) {
            }
    });
    return vUserList;
}

function ViewBusinessArea() {
    $('#txtBARowkey').val("");
    $('#txtBAParent').val("");
    $('#txtBA').val("");
    if ($('#tbodyBusinessArea121 tr').length == 0) {
        BindBusinessAreaDoc()
    } else {
        $("#browseBA").dialog("option", "title", "Business Area Picker");
        $("#browseBA").dialog("open");
        $("#browseBA").height("auto");
    }
}

function ViewOriginatingParty() {
    ViewOPCounterparty();
    getcompanyprofile();
    $("#tblOriginatingParties").empty();
    $("#browseOriginatingParty").dialog("option", "title", "Originating Party Picker");
    $("#browseOriginatingParty").dialog("open");
}

function ViewOPCounterparty() {
    if ($('#tblOPCounterparties tr').length <= 0) {
        CounterpartyFunc1();
    }
}


function CounterpartyFunc() {
    $("#listWrapper").html('');
    $("#liSelectedCounterParty").empty();
    var SelectedCounterpartList = [];
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            $('#loadCP').empty();
            counterpartyTags = [];
            if ($('#' + txtbindcounetrparty).val() != null) {
                $.each($('#' + txtbindcounetrparty).val().replace("; ", ";").split(";"), function () {
                    SelectedCounterpartList.push($.trim(this));
                });
            }
            var myCounterPartyArrayList = [];
            var obj1 = {};
            $(data).each(function (idata, itemdata) {
                if (!(itemdata.CounterpartyName in obj1)) {
                    if (itemdata.CounterpartyName.trim() != "") {
                        if (itemdata.IsGlobal == "Yes")
                            myCounterPartyArrayList.push(itemdata);
                        else {
                            if (typeof (itemdata.BusinessAreasPath) != "undefined" && itemdata.BusinessAreasPath != "") {
                                var contractarea = "";
                                var Businesssarea = "";
                                var splitbusinessPath = itemdata.BusinessAreasPath.split(';');
                                $(splitbusinessPath).each(function (index) {
                                    //manoj
                                    if (ReplaceDocClick) {
                                        if (this != null && this.toString() != "") {
                                            var contBusi = this.split('>');
                                            if (typeof (contBusi) != "undefined") {
                                                if (contBusi.length > 0) {
                                                    contractarea = contBusi[0].trim();
                                                    Businesssarea = contBusi.pop();
                                                    if (selecteddocumententity.BusinessArea == Businesssarea.trim() && selecteddocumententity.ContractArea == contractarea)
                                                        myCounterPartyArrayList.push(itemdata);
                                                }
                                            }
                                        }
                                        //manoj
                                    } else if ($("#txtDocumentID").val() != "") {
                                        if (this != "") {
                                            var path = this.toString();
                                            if (typeof (path) != "undefined") {
                                                if (path == $("#txtbusinesssareapathedit").text().trim().toString())
                                                    myCounterPartyArrayList.push(itemdata);
                                            }
                                        }
                                    }
                                    else {
                                        if (this != "") {
                                            var path = this.toString();
                                            if (typeof (path) != "undefined") {
                                                if (path == $("#txtBusinessAreaPath").val().trim().toString())
                                                    myCounterPartyArrayList.push(itemdata);
                                            }
                                        }
                                    }
                                })

                            }
                        }
                    }
                }
                obj1[itemdata.CounterpartyName] = true;
            });

            //manoj
            var article = '<thead><tr><th><input id="selectall" onclick="funselectallCounterParty(this);" type="checkbox"/> Counterparty Name</th><th>Counterparty Type</th><th>Country</th></tr></thead><tbody>';
            var countryvalue = ''
            $(myCounterPartyArrayList).each(function (iArray, itemArray) {
                article += '<tr><td>';
                if (SelectedCounterpartList.length > 0) {
                    if (SelectedCounterpartList.indexOf(itemArray.CounterpartyName.trim()) > -1) {
                        article += '<input id="' + itemArray.RowKey + '" type="checkbox" name="CounterpartyPicker" onclick="checkMultipleDocumentsCounterParty(this);" checked class="css1-checkbox" value="' + escape(itemArray.CounterpartyName.trim()) + '" />';
                    }
                    else {
                        article += '<input id="' + itemArray.RowKey + '" type="checkbox" name="CounterpartyPicker" onclick="checkMultipleDocumentsCounterParty(this);"  class="css1-checkbox" value="' + escape(itemArray.CounterpartyName.trim()) + '" />';
                    }
                }
                else {
                    article += '<input id="' + itemArray.RowKey + '" type="checkbox" name="CounterpartyPicker" onclick="checkMultipleDocumentsCounterParty(this);"  class="css1-checkbox" value="' + escape(itemArray.CounterpartyName.trim()) + '" />';
                }
                article += '<label for="CP' + itemArray.RowKey + '" class="css1-label" title="' + escape(itemArray.CounterpartyName.trim()) + '" onmouseover="UnescapeNameMouseOver(this)"  style="display: inline;">' + itemArray.CounterpartyName.trim() + '</label></td>';
                article += '<td>' + itemArray.CounterpartyType + '</td>';
                countryvalue = itemArray.Country != "0" ? itemArray.Country : "-"
                article += '<td>' + countryvalue + '</td>';
                article += '</tr>';
            });
            //manoj
            $("#listWrapper").html('<table id="tblCounterparties" class="f_list customtblCounterparties"></table>');
            $("#tblCounterparties").html(article);
            _alphabetSearch = '';
            $("#tblCounterparties").DataTable({
                "columnDefs": [
                    { "orderable": false, 'targets': "_all" }
                ],
                "fnDrawCallback": function () { eventFired('CounterpartyPicker', 'selectall', 'tblCounterparties'); },
                "iDisplayLength": 20,
                "searchHighlight": true,
                "pagingType": "full_numbers",
                //"scrollY": "420px",
                //"scrollCollapse": true,
            });
            alphabeticselection('tblCounterparties');
            article = '';
            if ($('input:checkbox[name="CounterpartyPicker"]:checked').length == $('input:checkbox[name="CounterpartyPicker"]').length && $('input:checkbox[name="CounterpartyPicker"]:checked').length != 0) {
                $("#selectall").attr('checked', true);
            } else {
                $("#selectall").attr('checked', false);
            }
            $.each(SelectedCounterpartList, function () {
                if (typeof ($.trim(this)) != 'undefined' && $.trim(this) != null && $.trim(this) != "") {
                    $('#liSelectedCounterParty').append('<span style="font-size:13px;">' + $.trim(this) + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelectedCouterParty(this);" style="float:right" /></span>');
                }
            });
            //manoj
        },
        error: function () {
            $('#loadCP').empty();
            $('#loadCP').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No Counterparty Found!</p>')
        }
    });
}

function CounterpartyFunc1() {
    $("#tblOPCounterparties").empty();
    var vCounterparty = $('#Counterparty').val();
    if (typeof vCounterparty != 'undefined') {
        $.each(vCounterparty.split(";"), function (i, item) {
            var vCounterpartyName = $.trim(item);
            if (vCounterpartyName != "") {
                var article = '<li>';
                if ($('#OriginatingParty').val() == vCounterpartyName) {
                    article += '<input id="CPO' + i + '" type="radio" name="OriginatingParty" class="css-checkbox" checked value="' + vCounterpartyName + '" />';
                } else {
                    article += '<input id="CPO' + i + '" type="radio" name="OriginatingParty" class="css-checkbox" value="' + vCounterpartyName + '" />';
                }
                article += '<label for="CPO' + i + '" class="css-label">' + vCounterpartyName + '</label>';
                article += '</li>';
                $("#tblOPCounterparties").append(article);
            }
            else if (vCounterpartyName == "Counterparty not in the list")
            { $("#tblOPCounterparties").append('<li>' + vCounterpartyName + '</li>'); }
            else {
                $("#tblOPCounterparties").append('<li>Select Counterparty</li>');
            }
        });
    }
}

function ViewCounterparty(obj) {
    if (typeof obj != 'undefined' && obj != null && obj != "") {
        txtbindcounetrparty = obj.title;
    }
    $('#loadCP').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    CounterpartyFunc();
    $("#pCounterpartyNotInList").css("display", "");
    $("#browseCounterparty").dialog("option", "buttons", [{
        text: "OK", click: function () {
            var s = AddCounterparty();

            //$(this).dialog("close");
        }
    }, {
        text: "Cancel", click: function () {
            $(this).dialog("close");
        }
    }]);
    PrvRelatedCounterparities = [];
    arrRelatedCounterparities = [];
    curRelatedCounterparities = [];
    $("#browseCounterparty").dialog("option", "title", "Counterparty Picker");
    $("#browseCounterparty").dialog("open");
}

function SaveCounterparty() {
    var isformvalid = false;
    if (requiredValidator('addNewEntityFields',false)) {
        isformvalid = true;
        var entityid = $("#txtCounterpartyID").val();
        var AddressLine1 = $("#txtAddressLine1").val();

        if (AddressLine1 == null || AddressLine1 == '') {
            AddressLine1 = '';
        }
        if (entityid != '') {
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty?counterpartyid=' + entityid,
                type: 'PUT',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                data: {
                    RowKey: entityid,
                    CounterpartyName: $("#txtCounterpartyName").val(),
                    CounterpartyType: $("#ddlCounterpartyType").find('option:selected').text(),
                    AddressLine1: AddressLine1,
                    AddressLine2: $("#txtAddressLine2").val(),
                    City: ($("#txtCity").val() != null) ? $("#txtCity").val() : '',
                    State: ($("#txtState").val() != null) ? $("#txtState").val() : '',
                    Zip: $("#txtZip").val(),
                    Country: $("#ddlCountry").find('option:selected').text(),
                    ContactNo: $("#txtContactNo").val(),
                    Status: $("#ddlStatus").find('option:selected').text(),
                    EmailID: $("#txtEmailID").val(),
                    ModifiedBy: localStorage.UserName
                },
                cache: false,
                success: function (person) {
                    swal("", person);
                    CounterpartyFunc1();
                    $("#addEditCounterparty").dialog("close");
                }
            });
        }
        else {
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty',
                type: 'POST',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                data: {
                    CounterpartyName: $("#txtCounterpartyName").val(),
                    CounterpartyType: $("#ddlCounterpartyType").find('option:selected').text(),
                    AddressLine1: $("#txtAddressLine1").val(),
                    AddressLine2: $("#txtAddressLine2").val(),
                    City: $("#txtCity").val(),
                    State: $("#txtState").val(),
                    Zip: $("#txtZip").val(),
                    Country: $("#ddlCountry").find('option:selected').text(),
                    ContactNo: $("#txtContactNo").val(),
                    Status: $("#ddlStatus").find('option:selected').text(),
                    EmailID: $("#txtEmailID").val(),
                    CreatedBy: localStorage.UserName,
                    ModifiedBy: localStorage.UserName
                },
                cache: false,
                success: function (person) {
                    swal("", person);
                    if ($("#Counterparty").val() == '')
                        $('#Counterparty').val($("#txtCounterpartyName").val());
                    else
                        $('#Counterparty').val($('#Counterparty').val() + "; " + $("#txtCounterpartyName").val());

                    CounterpartyFunc1();
                    $("#addEditCounterparty").dialog("close");
                }
            });
        }
    }
    return isformvalid;
}

function CounterpartyPopup() {
    $("#txtCounterpartyID").val("");
    $("#txtCounterpartyName").val("");
    $('#ddlCounterpartyType').val('0');
    $("#txtOwnerofBusinessArea").val('');
    $('input[type="radio"][name=IsGlobal][value="Yes"]').prop('checked', true);
    $("#trcp-RgBusi").hide();
    $("#txtOwnerofBusinessArea").removeClass("validelement");
    $("#txtAddressLine1").val("");
    $("#txtAddressLine2").val("");
    $("#txtCity").val("");
    $("#txtState").val("");
    $("#txtZip").val("");
    $('#ddlCountry').val('0');
    $("#txtContactNo").val("");
    $("#txtEmailID").val("");
    $("#ddlStatus").val("Active");
    $(".validelement").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });

    $("#addEditCounterparty").dialog("option", "title", "New Counterparty");
    $("#addEditCounterparty").dialog("open");
}


function SelectLegalEntities() {
    $("#OPCounterparties").removeClass('form-active');
    $("#OPLeagalEntities").addClass('form-active');
    $('#tblOPLegalEntities').css("display", "");
    $('#tblOPCounterparties').css("display", "none");
    $('#txtOriginatingPartyType').val("Legal Entity");
    $('#compact-paginationOPLegalEntities').css("display", "");
    $('#compact-paginationOPCounterparties').css("display", "none");
}

function SelectCounterparties() {
    $("#OPLeagalEntities").removeClass('form-active');
    $("#OPCounterparties").addClass('form-active');
    $('#tblOPLegalEntities').css("display", "none");
    $('#tblOPCounterparties').css("display", "");
    $('#txtOriginatingPartyType').val("Counterparty");
    $('#compact-paginationOPCounterparties').css("display", "");
    $('#compact-paginationOPLegalEntities').css("display", "none");
}

function getcompanyprofile(obj) {
    $("#tblOPLegalEntities").empty();
    var control = "";
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/legalentities',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: false,
        success: function (data) {
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                if (item.LegalEntityName == obj) {
                    control += "<option value='" + item.LegalEntityName + "' selected='selected'>" + item.LegalEntityName + "</option>";
                }
                else {
                    control += "<option value='" + item.LegalEntityName + "'>" + item.LegalEntityName + "</option>";
                }

                var article = '<li>';
                if ($('#OriginatingParty').val() == item.LegalEntityName) {
                    article += '<input id="OP' + item.RowKey + '" type="radio" name="OriginatingParty" class="css-checkbox" checked value="' + item.LegalEntityName + '" />';
                } else {
                    article += '<input id="OP' + item.RowKey + '" type="radio" name="OriginatingParty" class="css-checkbox" value="' + item.LegalEntityName + '" />';
                }
                article += '<label for="OP' + item.RowKey + '" class="css-label">' + item.LegalEntityName + '</label>';
                article += '</li>';
                $("#tblOPLegalEntities").append(article);
            }

            var vCount = $("#tblOPLegalEntities li").length;
            $('#compact-paginationOPLegalEntities').pagination({
                items: vCount,
                itemsOnPage: 15,
                type: 'ul',
                row: 'li',
                typeID: 'tblOPLegalEntities',
                cssStyle: 'compact-theme'
            });
        }
    });
    return control;
}

//manoj
function getcompanyprofile(objvalueselect) {
    var control = "";
    $("#tblOPLegalEntities").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/legalentities',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: false,
        success: function (data) {
            var columnOP = [];
            $("#tblOPLegalEntities").empty();
            var legalentityval = $("#CompanyProfile").find('option:selected').text();
            //LeagalEntity = data;
            $(data).each(function (idata, itemdata) {
                if (typeof objvalueselect != 'undefined' && objvalueselect != null && objvalueselect != "" && objvalueselect == itemdata.LegalEntityName) {
                    //SelectedLegalEntity = objvalueselect;
                    control += "<option selected='selected' value='" + itemdata.LegalEntityName + "'>" + itemdata.LegalEntityName + "</option>";
                } else if (thisContractAreaSettings.LegalEntityName == itemdata.LegalEntityName) {
                    control += "<option selected='selected' value='" + itemdata.LegalEntityName + "'>" + itemdata.LegalEntityName + "</option>";
                } else {
                    control += "<option value='" + itemdata.LegalEntityName + "'>" + itemdata.LegalEntityName + "</option>";
                }

                var article = '<li>';
                if ($('#OriginatingParty').val() != "") {
                    if ($('#OriginatingParty').val() == itemdata.LegalEntityName) {
                        article += '<input id="OP' + itemdata.RowKey + '" type="radio" name="OriginatingParty" class="css-checkbox" checked value="' + itemdata.LegalEntityName + '" />';
                    } else {
                        article += '<input id="OP' + itemdata.RowKey + '" type="radio" name="OriginatingParty" class="css-checkbox" value="' + itemdata.LegalEntityName + '" />';
                    }
                    article += '<label for="OP' + itemdata.RowKey + '" class="css-label">' + itemdata.LegalEntityName + '</label>';
                    article += '</li>';
                    $("#tblOPLegalEntities").append(article);
                } else if (typeof legalentityval != 'undefined' && legalentityval != '' && legalentityval != '--Select--') {
                    if ($("#CompanyProfile").find('option:selected').text() == itemdata.LegalEntityName) {
                        article += '<input id="OP' + itemdata.RowKey + '" type="radio" name="OriginatingParty" class="css-checkbox" checked value="' + itemdata.LegalEntityName + '" />';
                    } else {
                        article += '<input id="OP' + itemdata.RowKey + '" type="radio" name="OriginatingParty" class="css-checkbox" value="' + item.LegalEntityName + '" />';
                    }
                    article += '<label for="OP' + itemdata.RowKey + '" class="css-label">' + itemdata.LegalEntityName + '</label>';
                    article += '</li>';
                    $("#tblOPLegalEntities").append(article);
                }
                else {
                    if (typeof objvalueselect != 'undefined' && objvalueselect != null && objvalueselect != "" && objvalueselect == itemdata.LegalEntityName) {
                        article += '<input id="OP' + itemdata.RowKey + '" type="radio" name="OriginatingParty" class="css-checkbox" checked value="' + itemdata.LegalEntityName + '" />';
                    } else if (thisContractAreaSettings.LegalEntityName == itemdata.LegalEntityName) {
                        article += '<input id="OP' + itemdata.RowKey + '" type="radio" name="OriginatingParty" class="css-checkbox" checked value="' + itemdata.LegalEntityName + '" />';
                    } else {
                        article += '<input id="OP' + itemdata.RowKey + '" type="radio" name="OriginatingParty" class="css-checkbox" value="' + itemdata.LegalEntityName + '" />';
                    }
                    article += '<label for="OP' + itemdata.RowKey + '" class="css-label">' + itemdata.LegalEntityName + '</label>';
                    article += '</li>';
                    $("#tblOPLegalEntities").append(article);
                }
                //columnOP.push(item.LegalEntityName);
                //$("#txtSearchBoxOPLegal").autocomplete({
                //    source: columnOP,
                //    minLength: 1,
                //    focus: function (event, ui) {
                //        return false;
                //    }
                //});
            });

            var vCount = $("#tblOPLegalEntities li").length;
            $('#compact-paginationOPLegalEntities').pagination({
                items: vCount,
                itemsOnPage: 15,
                type: 'ul',
                row: 'li',
                typeID: 'tblOPLegalEntities',
                cssStyle: 'compact-theme'
            });
        }
    });
    return control;
}
//manoj

function getcontractpricingtype(obj) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contractpricingtype',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                if (item.TypeName == obj) {
                    $("#ContractPricingType").append("<option value='" + item.TypeName + "' selected='selected'>" + item.TypeName + "</option>")
                }
                else {
                    $("#ContractPricingType").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                }
            }

        }
    });
}

function getbillingfrequency(obj) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/billingfrequency',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            //var datalenght = data.length;
            $(data).each(function (idata, itemdata) {
                if (itemdata.TypeName == obj) {
                    $("#BillingFrequency").append("<option value='" + itemdata.TypeName + "' selected='selected'>" + itemdata.TypeName + "</option>");
                } else {
                    $("#BillingFrequency").append("<option value='" + itemdata.TypeName + "'>" + itemdata.TypeName + "</option>");
                }
            });
            //for (var i = 0; i < datalenght; i++) {
            //    var item = data[i];
            //    if (item.TypeName == obj) {
            //        $("#BillingFrequency").append("<option value='" + item.TypeName + "' selected='selected'>" + item.TypeName + "</option>")
            //    }
            //    else {
            //        $("#BillingFrequency").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
            //    }
            //}
        }
    });
}

function getStatus(obj) {
    var control = "";
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contractstatuses',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: false,
        success: function (contractstatuses) {
            //var datalenght = contractstatuses.length;
            $(contractstatuses).each(function (icontractstatuses, itemcontractstatuses) {
                control += (itemcontractstatuses.ContractStatus == obj) ? "<option value=" + encodeURI(itemcontractstatuses.ContractStatus) + " selected='selected'>" + itemcontractstatuses.ContractStatus + "</option>" : "<option value=" + encodeURI(itemcontractstatuses.ContractStatus) + ">" + itemcontractstatuses.ContractStatus + "</option>";
            });
            //for (var i = 0; i < datalenght; i++) {
            //    var item = contractstatuses[i];
            //    if (item.ContractStatus == obj) {
            //        control += "<option value=" + encodeURI(item.ContractStatus) + " selected='selected'>" + item.ContractStatus + "</option>";
            //    }
            //    else {
            //        control += "<option value=" + encodeURI(item.ContractStatus) + ">" + item.ContractStatus + "</option>";
            //    }
            //}
        }
    });
    return control;
}

function getContractCurrency(obj) {
    var control = "";
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/currencies',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: false,
        success: function (data) {
            //var datalenght = data.length;
            $(data).each(function (idata, itemdata) {
                control += (itemdata.Abbreviation == obj) ? "<option value=" + encodeURI(itemdata.Abbreviation) + " selected='selected'>" + itemdata.Abbreviation + "</option>" : "<option value=" + encodeURI(itemdata.Abbreviation) + ">" + itemdata.Abbreviation + "</option>";
            });
            //for (var i = 0; i < datalenght; i++) {
            //    var item = data[i];
            //    if (item.Abbreviation == obj) {
            //        control += "<option value=" + encodeURI(item.Abbreviation) + " selected='selected'>" + item.Abbreviation + "</option>";
            //    }
            //    else {
            //        control += "<option value=" + encodeURI(item.Abbreviation) + ">" + item.Abbreviation + "</option>";
            //    }
            //}
        }
    });
    return control;
}


function AddOriginatingParty() {
    if ($('input:radio[name=OriginatingParty]:checked').val() != null) {
        $('#OriginatingParty').val($('input:radio[name=OriginatingParty]:checked').val());
        return true;
    } else {
        swal("", "No Originating Party has been selected.");
        return false;
    }
}

$(document).ready(function () {
    allowOnlyNumberInInputBox("txtExpIn");
    allowOnlyNumberInInputBox('txtReminder1');
    allowOnlyNumberInInputBox('txtReminder2');
    allowOnlyNumberInInputBox('txtReminder3');
    allowOnlyNumberInInputBox('txtReminder1Edit');
    allowOnlyNumberInInputBox('txtReminder2Edit');
    allowOnlyNumberInInputBox('txtReminder3Edit');
    allowOnlyNumberInInputBox("txtShareExpIn");
    allowOnlyNumberInInputBox("txtDuration");

    $("#browseCounterparty").dialog({
        autoOpen: false,
        closeText: "",
        width: "60%",
        title: "Counterparty",
        resizable: false,
        modal: true,
        buttons: {
            "OK": function () { AddCounterparty(); },
            Cancel: function () {
                $(this).dialog("close"); $("#txtSearchBox").val("");
                ClearAddCounterparty();
                $('#chkCounterpartyNotInList').prop('checked', false);

                $('#dvCPExistingCounterparty').css("display", "");
                $('#dvCPAddCounterparty').css("display", "none");
                $('#rdCPAddCounterparty').attr('checked', false);
                $('#rdCPExistingCounterparty').attr('checked', true);

                $('.CP_Det').remove();
                $('.CP_Det1').css('display', 'none');
                $("#ddlCounterpartyType").removeClass('validelement');
                $("#txtEmailID").removeClass('validemail');
                BAOwnersselecteditems = [];
                $('#liSelectedBAOwners').empty();
                $('#txtBAOwnerofPath').val('');
                $('#txtBAOwnerof').val('');
                selectedBusinessAreaID11 = [];
            }
        }, close: function () {
            PrvRelatedCounterparities = [];
            arrRelatedCounterparities = [];
            curRelatedCounterparities = [];
            ClearAddCounterparty();
            $('#chkCounterpartyNotInList').prop('checked', false);

            $('#dvCPExistingCounterparty').css("display", "");
            $('#dvCPAddCounterparty').css("display", "none");
            $('#rdCPAddCounterparty').attr('checked', false);
            $('#rdCPExistingCounterparty').attr('checked', true);

            $('.CP_Det').remove();
            $('.CP_Det1').css('display', 'none');
            $("#ddlCounterpartyType").removeClass('validelement');
            $("#txtEmailID").removeClass('validemail');
            BAOwnersselecteditems = [];
            $('#liSelectedBAOwners').empty();
            $('#txtBAOwnerofPath').val('');
            $('#txtBAOwnerof').val('');


            selectedBusinessAreaID11 = [];

        }
    });
    $("#browseBAOwners").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Users",
        height: "auto",
        modal: true,
        draggable: true,
        drag: function (event, ui) {
            var fixPix = $(document).scrollTop();
            iObj = ui.position;
            iObj.top = iObj.top - fixPix;
            $(this).closest(".ui-dialog").css("top", iObj.top + "px");
        },
        buttons: {
            "Save": function () {
                $('#lblBusinessAreaOwners').text("");
                $('#txtOwnerofBusinessArea').text("");

                var selecteditemslength = BAOwnersselecteditems.length;

                if (selecteditemslength > 0) {
                    for (var i = 0; i < selecteditemslength; i++) {
                        if (i != selecteditemslength - 1) { $('#lblBusinessAreaOwners').append(BAOwnersselecteditems[i].trim().substring(BAOwnersselecteditems[i].trim().lastIndexOf(">") + 1, BAOwnersselecteditems[i].trim().length).trim() + ";"); }
                        else { $('#lblBusinessAreaOwners').append(BAOwnersselecteditems[i].trim().substring(BAOwnersselecteditems[i].trim().lastIndexOf(">") + 1, BAOwnersselecteditems[i].trim().length).trim()); }
                    }
                    $('#txtBAOwnerof').val($('#lblBusinessAreaOwners').text());
                }
                else {
                    $('#txtBAOwnerof').val("");
                }

                $('#txtOwnerofBusinessArea').val($('#txtBAOwnerof').val());
                selectedBusinessAreaID11 = [];
                $(selectedBusinessAreaID11Temp).each(function (i, item) {
                    selectedBusinessAreaID11.push(item);
                })

                selectedBusinessAreaID11Temp = [];
                $(this).dialog("close");
            },
            Cancel: function () {
                $(this).dialog("close");
                BAOwnersselecteditems = [];
                $(selectedBusinessAreaID11).each(function (i, item) {
                    BAOwnersselecteditems.push(item[0]);
                })
                selectedBusinessAreaID11Temp = [];
            }
        }, close: function () {
            BAOwnersselecteditems = [];
            $(selectedBusinessAreaID11).each(function (i, item) {
                BAOwnersselecteditems.push(item[0]);
            })
            selectedBusinessAreaID11Temp = [];
        }
    });
    //BindBusinessAreaPicker11();
    $("#dvVersionHistory").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Version History",
        modal: true,
        buttons: {
            "Close": function () { $(this).dialog("close"); }
        }
    });

    $("#browseMasterAgreements").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Master Agreements",
        modal: true,
        buttons: {
            "OK": function () {
                var s = AddMasterAgreement();
                $(this).dialog("close");
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#browseOriginatingParty").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Originating Party",
        modal: true,
        buttons: {
            "OK": function () {
                var s = AddOriginatingParty();
                $(this).dialog("close");
            },
            "Clear": function () {
                $('input:radio[name=OriginatingParty]').attr('checked', false);
                $("#OriginatingParty").val("");
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#browseLegalEntity").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "CompanyProfile",
        dialogClass: "popup_width100",
        resizable: false,
        modal: true,
        buttons: {
            "OK": function () { AddLE(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }, close: function () {

        }
    });

    $("#addEditCounterparty").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Counterparty",
        modal: true,
        resizable: true,
        buttons: {
            "Save": function () {
                if (SaveCounterparty()) {
                }
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
    $("#dvContractRec").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Todo",
        modal: true,
        buttons: {
            "OK": function () { SelectContractRecElement(); $(this).dialog("close"); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
});
function fnClearSelectedContracts() {
    $.each($('#tblContractsTodo li input'), function (index, value) {
        value.checked = false;
    });
    $('#txtContractRecElement').val("");
    strContractDocumentsUrl = "";
}

function CounterpartyCreate(obj) {
    if ($("#txtBusinessAreaPath").val() != "") {
        if (typeof obj != 'undefined' && obj != null && obj != "") {
            txtbindcounetrparty = obj.title;
        }
        $('#loadCP').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
        CounterpartyFunc();
        $("#browseCounterparty").dialog("option", "title", "Counterparty Picker");
        $("#browseCounterparty").dialog("open");
    }
    else {
        swal("", "Please select business area");
    }
}
//function CounterpartyEdit() {
//    $('#loadCP').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
//    //if ($('#tblCounterparties tr').length <= 0) {
//    CounterpartyFunc();
//    //} else {
//    //    $('#loadCP').empty();
//    //}
//    $("#pCounterpartyNotInList").css("display", "none");

//    $("#browseCounterparty").dialog("option", "title", "Counterparty Picker");
//    $("#browseCounterparty").dialog("open");
//}
function SelectContractRecElement() {
    var vSelectedElement = null;
    vSelectedElement = $('input[name=Contracts]:checked');
    strContractDocumentsUrl = vSelectedElement[0].parentNode.children.DocUrl.defaultValue;
    var vID = $(vSelectedElement).attr("id").replace("CR-", "");
    var strCounterparty = $('#CP' + vID).val();
    $("#txtCounterpartyCreate").val(strCounterparty);
    if (contractAssignmentType == "Create") {
        $("#txtContractRecElement").val($(vSelectedElement).val());
        $("#txtContractRecElementID").val(vID);
    } else if (contractAssignmentType == "Edit") {
        $("#txtContractRecElementEdit").val($(vSelectedElement).val());
        $("#txtContractRecElementIDEdit").val(vID);
    }
    var strBusinessArea = $('#BA' + vID).val();
    $("#txtBusinessArea").val(strBusinessArea);

    if ($("#txtContractRecElement").val() == "") {
        var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
        var vAccFeat = $.grep(veContractFeatures, function (n, i) {
            return (n.RowKey == "6" && n.Status == "ON");
        });
        if (vAccFeat.length == 0) {
            $("#spCounterpartyCreate").css("display", "none");
            $("#txtCounterpartyCreate").prop("readonly", false);
        }
        else {
            //if (!bindconarea) {
            $("#spCounterpartyCreate").css("display", "none");
            // }
        }
    }
    else {
        $("#spCounterpartyCreate").css("display", "none");
    }

    setDocumentUrl();
}

function SearchContractRec() {
    if ($("#txtBusinessAreaPath").val() != '') {
        $("#tblContractsTodo").empty();
        $('#dvLoading').css("display", "");
        $('#dvLoading').html('<img src="../Content/Images/icon/loading.gif"> Searching...');
        var vDocType = getParameterByName('Type');
        var vstage = "Contract";
        if (vDocType.toLowerCase() == "pipeline")
            vstage = "Pipeline";
        var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?stage=' + vstage + '&searchkeyword=' + encodeURIComponent($("#txtSearchBoxTodoForm").val()) + '&customquery=&sortbyfield=ContractTitle&orderby=ASC';
        $.ajax({
            url: vURL,
            type: 'GET',
            dataType: 'json',
            "Content-Type": "application/json",
            headers: { 'eContracts-ApiKey': localStorage.APIKey, UserName: localStorage.UserName, BusinessAreaLocation: $("#txtBusinessAreaPath").val() },
            cache: false,
            success: function (data) {
                var datalenght = data.length;
                var article = '';
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];
                    var sRowKey = item.RowKey;
                    var sContractTitle = item.ContractTitle;
                    var sContractNumber = item.ContractNumber;
                    var sBusinessArea = item.BusinessArea;

                    var vPipelineStatus = ["New", "Drafting", "Awaiting Review", "Reviewed", "Awaiting Approval", "Approved", "In Negotiation", "Negotiation Complete"];
                    var vContractStatus = ["Ready for Signature", "Awaiting Signatures", "Signed", "Active", "Up for Renewal", "Renewed", "Extended", "On Hold", "Replaced", "Expired", "Cancelled", "Terminated", "Archived"];
                    if ((getParameterByName('Type') == 'pipeline' && $.inArray(item.Status, vPipelineStatus) !== -1) || (getParameterByName('Type') == 'contracts' && $.inArray(item.Status, vContractStatus) !== -1)) {
                        article += '<li>';
                        article += '<input id="CR-' + sRowKey + '" type="radio" name="Contracts" class="css-checkbox" value="' + sContractTitle + '" />';
                        article += '<label for="CR-' + sRowKey + '" class="css-label PreserveSpace"><a href="/Contracts/ContractDetails?ContractID=' + sRowKey + '" target="_blank">' + sContractTitle + '</a></label>';  //ENH487 Customer inhanc
                        article += '<input id="BA' + sRowKey + '" type="text" style="display:none;" name="BA" value="' + sBusinessArea + '" />';
                        article += '<input id="BAP' + sRowKey + '" type="text" style="display:none;" name="BA" value="' + item.BusinessAreaPath + '" />';
                        article += '<input id="CA' + sRowKey + '" type="text" style="display:none;" name="BA" value="' + item.ContractArea + '" />';
                        article += '<input id="CP' + sRowKey + '" type="text" style="display:none;" name="BA" value="' + item.Counterparty + '" />';
                        article += '<input id="DocUrl' + sRowKey + '" type="text" style="display:none;" name="DocUrl" value="' + item.ContractDocumentsUrl + '" />';
                        article += '</li>';
                    }
                }
                $("#tblContractsTodo").html(article);
                article = '';
                var vCount = $("#tblContractsTodo li").length;
                if (vCount != 0) {
                    $('#dvLoading').html('');
                    $('#compact-paginationContractsTodo').css('display', '');
                    $('#compact-paginationContractsTodo').pagination({
                        items: vCount,
                        itemsOnPage: 10,
                        type: 'ul',
                        typeID: 'tblContractsTodo',
                        row: 'li',
                        cssStyle: 'compact-theme'
                    });
                } else {
                    $('#dvLoading').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No Contract Found!</p>')
                    $('#compact-paginationContractsTodo').css('display', 'none');
                }
            },
            error: function () {
                $('#compact-paginationContractsTodo').css('display', 'none');
                $('#dvLoading').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No Contract Found!</p>')
            }
        });
    }
}
function AddSignee() {
    var vLastRow = $("#tblSignees tr:last").attr('id');
    var totalFileCount = "2";
    if (typeof vLastRow == "undefined") {
        totalFileCount = "2";
    }
    else {
        totalFileCount = parseInt(vLastRow.replace("trSignee", ""));
        totalFileCount += 1;
    }
    var htmlFormatFile = '<tr id="trSignee' + totalFileCount + '">';
    htmlFormatFile += '<td class="width40">';
    htmlFormatFile += '<input id="txtSignee' + totalFileCount + '" name="SigneeName' + totalFileCount + '" placeholder="Signee Name" title="Signee Signee" type="text" class="f_inpt width90" />';
    htmlFormatFile += '</td>';
    htmlFormatFile += '<td class="width40">';
    htmlFormatFile += '<input id="txtEmail' + totalFileCount + '" name="SigneeEmail' + totalFileCount + '" placeholder="Signee Email" title="Signee Email" type="text" class="f_inpt width90 validemail" />';
    htmlFormatFile += '</td>';
    htmlFormatFile += '<td class="width20">';
    htmlFormatFile += '<select id="ddlSigneeOrder' + totalFileCount + '" name="SigneeOrder' + totalFileCount + '" onclick="ClickedOrder(this);" onchange="SelectedOrder(this);" class="f_inpt width100 SigneeOrder">';
    htmlFormatFile += '<option value="1" selected="selected">1</option>';
    htmlFormatFile += '<option value="2">2</option>';
    htmlFormatFile += '<option value="3">3</option>';
    htmlFormatFile += '<option value="4">4</option>';
    htmlFormatFile += '<option value="5">5</option>';
    htmlFormatFile += '</select>';
    htmlFormatFile += '</td>';
    htmlFormatFile += '<td style="width:20px">';
    htmlFormatFile += '<a href="javascript:void(0)" onclick="DeleteSignee(this)"><img src="../Content/Images/icon/delete.png" /></a>';
    htmlFormatFile += '</td>';
    htmlFormatFile += '</tr>';

    $("#tblSignees").append(htmlFormatFile);

    var rowCount = $("#tblSignees tr").length + $("#tblInternalSignees tr").length;
    $("#ddlSigneeOrder" + totalFileCount).val(rowCount);
    if (rowCount == 5) {
        $("#spAddSignee").css("display", "none");
        $("#spAddInternalSignee").css("display", "none");
    }
    else {
        $("#spAddSignee").css("display", "");
        $("#spAddInternalSignee").css("display", "");
    }
}

function DeleteSignee(n) {
    var vv = $(n.parentNode.parentNode).find('select');
    var curVal = 0;
    if (typeof vv != 'undefined') {
        curVal = parseInt(vv.val());
    }
    n.parentNode.parentNode.parentNode.removeChild(n.parentNode.parentNode);
    $("#spAddSignee").css("display", "");
    $("#spAddInternalSignee").css("display", "");
    $(".SigneeOrder").each(function (index, data) {
        var curVal2 = parseInt($(data).val());
        if (curVal2 > curVal) {
            $(data).val(curVal2 - 1);
        }
    });
}

function AddInternalSignee() {
    var vLastRow = $("#tblInternalSignees tr:last").attr('id');
    var totalFileCount = "2";
    if (typeof vLastRow == "undefined") {
        totalFileCount = "2";
    }
    else {
        totalFileCount = parseInt(vLastRow.replace("trInternalSignee", ""));
        totalFileCount += 1;
    }
    var htmlFormatFile = '<tr id="trInternalSignee' + totalFileCount + '">';
    htmlFormatFile += '<td class="width80">';
    htmlFormatFile += '<input id="txtInternalSignee' + totalFileCount + '" name="InternalSigneeName' + totalFileCount + '" readonly="readonly" placeholder="Signee Name" title="Signee" type="text" class="f_inpt width80" />';
    htmlFormatFile += '<span class="right-float"><a href="javascript:void(0)" onclick="BrowseInternalSignee(\'txtInternalSignee' + totalFileCount + '\', \'txtInternalEmail' + totalFileCount + '\')">Browse</a></span>';
    htmlFormatFile += '</td>';
    htmlFormatFile += '<td style="display:none;">';
    htmlFormatFile += '<input id="txtInternalEmail' + totalFileCount + '" name="InternalSigneeEmail' + totalFileCount + '" placeholder="Signee Email" title="Email" type="text" class="f_inpt width90 validemail" />';
    htmlFormatFile += '</td>';
    htmlFormatFile += '<td class="width20">';
    htmlFormatFile += '<select id="ddlInternalSigneeOrder' + totalFileCount + '" name="InternalSigneeOrder' + totalFileCount + '" onclick="ClickedOrder(this);" onchange="SelectedOrder(this);" class="f_inpt width100 SigneeOrder">';
    htmlFormatFile += '<option value="1" selected="selected">1</option>';
    htmlFormatFile += '<option value="2">2</option>';
    htmlFormatFile += '<option value="3">3</option>';
    htmlFormatFile += '<option value="4">4</option>';
    htmlFormatFile += '<option value="5">5</option>';
    htmlFormatFile += '</select>';
    htmlFormatFile += '</td>';
    htmlFormatFile += '<td style="width:20px">';
    htmlFormatFile += '<a href="javascript:void(0)" onclick="DeleteInternalSignee(this)"><img src="../Content/Images/icon/delete.png" /></a>';
    htmlFormatFile += '</td>';
    htmlFormatFile += '</tr>';

    $("#tblInternalSignees").append(htmlFormatFile);

    var rowCount = $("#tblSignees tr").length + $("#tblInternalSignees tr").length;
    $("#ddlInternalSigneeOrder" + totalFileCount).val(rowCount);
    if (rowCount == 5) {
        $("#spAddSignee").css("display", "none");
        $("#spAddInternalSignee").css("display", "none");
    }
    else {
        $("#spAddSignee").css("display", "");
        $("#spAddInternalSignee").css("display", "");
    }
}

function DeleteInternalSignee(n) {
    var vv = $(n.parentNode.parentNode).find('select');
    var curVal = 0;
    if (typeof vv != 'undefined') {
        curVal = parseInt(vv.val());
    }
    n.parentNode.parentNode.parentNode.removeChild(n.parentNode.parentNode);
    $("#spAddSignee").css("display", "");
    $("#spAddInternalSignee").css("display", "");
    $(".SigneeOrder").each(function (index, data) {
        var curVal2 = parseInt($(data).val());
        if (curVal2 > curVal) {
            $(data).val(curVal2 - 1);
        }
    });
}



//*Harshitha
function ClearResetSignee() {
    $("#" + $("#hdUserEmail").val()).val('');
    $("#" + $("#hdUserName").val()).val('');
    $('input:radio[name=SigneeUser]').attr('checked', false);
}
function BrowseInternalSignee(objName, objEmail) {

    $("#hdUserName").val(objName);
    $("#hdUserEmail").val(objEmail);
    var selectedID = $("#" + $("#hdUserEmail").val()).val();
    if ($("#tblSigneeUser li").length > 0) {
        $("#browseSigneeUser").dialog("option", "title", "Select Signee");
        if (selectedID != "") {
            var nospaceUserName = $("#" + $("#hdUserName").val()).val().replace(/ /g, "_");
            $('input:radio[name=SigneeUser][id="' + selectedID + '_' + nospaceUserName + '"]').attr('checked', 'checked');
        }
        else
            $('input:radio[name=SigneeUser]').attr('checked', false);
        $("#browseSigneeUser").dialog("open");
    } else {
        BindAuthorizedSignatory($("#hdContractID").val(), $("#hdContractArea").val());
    }
}


function BindAuthorizedSignatory(contractid, contractareaname) {
    $("#loadingPage").fadeIn();
    $("#tblSigneeUser").empty();
    if (CompanyProfile != "" && CompanyProfile != "undefined" && CompanyProfile != null)
        GetAuthorizedsignatory = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users/authorizedsignatory?contractid=' + contractid + '&contractareaname=';
    else
        GetAuthorizedsignatory = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users/authorizedsignatory?contractid=&contractareaname=' + encodeURIComponent(contractareaname);
    $.ajax({
        url: GetAuthorizedsignatory, //vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users/authorizedsignatory?contractid=&contractareaname=' + encodeURIComponent(contractareaname),
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            var v = $(data).length;
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                var sRowKey = item.RowKey;
                var sUserName = item.UserName;
                var sEmail = item.EmailID;
                var nospaceUserName = sUserName.replace(/ /g, "_");
                var sUser = '<li>';

                sUser += '<input id="' + sEmail + '_' + nospaceUserName + '" title="' + sEmail + '" type="radio" name="SigneeUser" class="css-checkbox" value="' + sUserName + '" />';
                sUser += '<label for="' + sEmail + '_' + nospaceUserName + '" class="css-label">' + sUserName + '</label>';
                sUser += '</li>';
                $("#tblSigneeUser").append(sUser);
            }
            $("#loadingPage").fadeOut();
            $("#browseSigneeUser").dialog("option", "title", "Select Signee");
            $("#browseSigneeUser").dialog("open");
        },
        error:
            function (data) {
                var sUser = '<li>';
                sUser += 'No items found.';
                sUser += '</li>';
                $("#tblSigneeUser").append(sUser);
                $("#loadingPage").fadeOut();
                $("#browseSigneeUser").dialog("option", "title", "Select Signee");
                $("#browseSigneeUser").dialog("open");
            }
    });
}

function SelectedSignee() {
    var vSignee = $("input:radio[name=SigneeUser]:checked");
    var prevSignees = [];
    $('#tblInternalSignees tr td:first-child input').each(function () {
        if ($(this).val() != "")
            prevSignees.push($(this).val());
    });
    if (prevSignees.indexOf(vSignee.val()) > -1) {
        swal("", "Internal Signee already selected.");
    }
    else {
        $("#" + $("#hdUserEmail").val()).val(vSignee.attr('title'));
        $("#" + $("#hdUserName").val()).val(vSignee.val());
        $("#hdUserEmail").val('');
        $("#hdUserName").val('');
        $("#browseSigneeUser").dialog("close");
    }
}


var previousVal;
var previousID;
function ClickedOrder(obj) {
    previousVal = $(obj).val();
    previousID = $(obj).attr('id');
}
function SelectedOrder(obj) {
    var curVal = $(obj).val();
    var curID = $(obj).attr('id');
    $(".SigneeOrder").each(function (index, data) {
        var curVal2 = $(data).val();
        var curID2 = $(data).attr('id');
        if (curVal == curVal2 && previousID != curID2) {
            $(data).val(previousVal);
        }
    });
}

function SendForSignature() {
    //manoj
    var Collectemail = "";
    $('#tblSignees input[title="Email"]').each(function (i, item) {
        if ($.trim(item.value) != "") {
            Collectemail += ";" + $.trim(item.value);
        }
    });
    if ($.trim($("#txtInternalSignee1").val()) != "" || $.trim(Collectemail) != "") {
        //manoj
        var vValid = requiredValidator('sendForSignature');
        if (vValid) {
            if ($("#hdMarkAsFinal").val() == "N") {
                swal({
                    title: '',
                    text: "Document is <span style=\"font-weight:700\">not Finalized</span>?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
         function (confirmed) {
             if (confirmed) {
                 SendDocumentForSignature();
             }
             return;
         });
            }
            else {
                SendDocumentForSignature();
            }
        }
        //manoj
    } else {
        swal("", "Please add <span style='font-weight:700'>External/Internal signee(s)</span> to send Document for Signature.");
    }
    //manoj
}
function SendDocumentForSignature() {
    $("#loadingPage").fadeIn();
    var contractForm = $("#frmSignees *, #frmInternalSignees *").serialize();
    contractForm += "&SigneeMsg=" + encodeURIComponent($("#txtSigneeMsg").val());
    contractForm += "&Subject=" + $("#txtSubject").val();
    contractForm += "&ConID=" + $("#hdContractID").val();
    contractForm += "&IsContracts=" + getParameterByName('Type');
    if (RightSignatureFlag) {
        contractForm += "&ExpIn=" + $("#ddltxtExpIn").val();
    }
    else {
        contractForm += "&ExpIn=" + $("#txtExpIn").val();
    }
    contractForm += "&DocumentURL=" + encodeURIComponent($("#hdDocumentURL").val());
    contractForm += "&AutoUpdateStatus=" + ($("#chkAutoUpdateStatusSignDoc").is(':checked') ? 'Yes' : 'No');
    var ccUsers = $("#ddlCC").val()
    var internalSigneeUsers = '';
    var cc = '';
    var ins = '';
    if (typeof ccUsers != "undefined" && ccUsers != null && ccUsers != "") {
        var datalenght = ccUsers.length;
        for (var i = 0; i < datalenght; i++) {
            var item = ccUsers[i];
            if (cc == '') {
                cc = item;
            }
            else {
                cc += "; " + item;
            }
        }
    }
    contractForm += "&CC=" + cc;
    contractForm += "&InternalSignee=" + ins;
    var vDocID = $("#hdDocumentID").val();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + vDocID,
        type: 'POST',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'UserName': localStorage.UserName, 'RefreshToken': localStorage.RefreshToken },
        data: contractForm,
        cache: false,
        success: function (person) {
            var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
            var vDocLibFeat = $.grep(veContractFeatures, function (n, i) {
                return (n.RowKey == "26" && n.Status == "ON");
            });
            if (vDocLibFeat != null) {
                if (vDocLibFeat.length > 0) {
                    if (person.split('~')[0] == "AdvancedDocusign") {
                        window.open(person.split('~')[1]);
                    }
                }
            }
            $("#sendForSignature").dialog("close");
            reloadlistDocuments();
            //location = location;
            //if ($("#showAll").text().indexOf("/") < 0) {

            //} else {
            //    var valuetocheck = $("#showAll")[0].lastChild;
            //    $(valuetocheck).trigger("click");
            //   // $("#showAll").lastChild.click()
            //}

            //ClearSignatureForm();
            //$("#loadingPage").fadeOut();
        },
        error: function (person) {
            swal("", person.responseText);
            $("#loadingPage").fadeOut();
        }
    });
}
function getNameAndEmailSignDocument(ContractID) {
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/' + ContractID + '/contacts',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {

            if (data != null) {
                var datalenght = data.length;
                var allInternal = ''
                var iex = 0;
                var iIn = 1;
                var totalFileCount = 0;
                var totalFileCountTaken = 0;
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];
                    totalFileCount++;
                    if (item.InternalOrExternal == "External") {
                        if (iex == 0 && totalFileCountTaken < 5) {
                            iex = 1;
                            totalFileCountTaken += 1;
                            $('#txtSignee1').val(item.ContactName);
                            $('#txtEmail1').val(item.EmailID);
                        }
                        else if (totalFileCountTaken < 5 && iex < 4) {
                            totalFileCountTaken += 1;
                            iex += 1;
                            var htmlFormatFile = '<tr id="trSignee' + totalFileCount + '">';
                            htmlFormatFile += '<td class="width40">';
                            htmlFormatFile += '<input id="txtSignee' + totalFileCount + '" value="' + item.ContactName + '" name="SigneeName' + totalFileCount + '" placeholder="Signee Name" title="Signee Name" type="text" class="f_inpt width90" value="' + item.ContactName + '" />';
                            htmlFormatFile += '</td>';
                            htmlFormatFile += '<td class="width40">';
                            htmlFormatFile += '<input id="txtEmail' + totalFileCount + '" value="' + item.EmailID + '" name="SigneeEmail' + totalFileCount + '" placeholder="Signee Email" title="Signee Email" type="text" class="f_inpt width90 validelement validemail" value="' + item.EmailID + '" />';
                            htmlFormatFile += '</td>';
                            htmlFormatFile += '<td class="width20">';
                            htmlFormatFile += '<select id="ddlSigneeOrder' + totalFileCount + '" name="SigneeOrder' + totalFileCount + '" onclick="ClickedOrder(this);" onchange="SelectedOrder(this);" class="f_inpt width100 SigneeOrder">';
                            htmlFormatFile += '<option value="1">1</option>';
                            htmlFormatFile += '<option value="2">2</option>';
                            htmlFormatFile += '<option value="3">3</option>';
                            htmlFormatFile += '<option value="4">4</option>';
                            htmlFormatFile += '<option value="5">5</option>';
                            htmlFormatFile += '</select>';
                            htmlFormatFile += '</td>';
                            htmlFormatFile += '<td style="width:20px">';
                            htmlFormatFile += '<a href="javascript:void(0)" onclick="DeleteSignee(this)"><img src="../Content/Images/icon/delete.png" /></a>';
                            htmlFormatFile += '</td>';
                            htmlFormatFile += '</tr>';
                            $("#tblSignees").append(htmlFormatFile);
                            $("#ddlSigneeOrder" + totalFileCount).val(totalFileCountTaken);
                        }
                    }
                    else {
                        if ($("#tblSigneeUser").find('li').length > 0) {
                            $("#tblSigneeUser").find('li').each(function () {
                                var inputval = ($(this).find('input').length > 0 ? $(this).find('input').val() : "");
                                if (inputval != "" && inputval == item.ContactName) {
                                    if (iIn == 1 && totalFileCountTaken < 5 && iIn < 5) {
                                        iIn = 2;
                                        totalFileCountTaken += 1;
                                        $("#txtInternalSignee1").val(item.ContactName);
                                        $("#txtInternalEmail1").val(item.EmailID);
                                    }
                                    else if (totalFileCountTaken < 5 && iIn < 5) {
                                        AddInternalSignee();
                                        totalFileCountTaken += 1;
                                        $("#txtInternalSignee" + iIn).val(item.ContactName);
                                        $("#txtInternalEmail" + iIn).val(item.EmailID);
                                        iIn += 1;
                                    }
                                }
                            })

                        }
                        else {
                            var GetAuthorizedsignatory = '';
                            if (CompanyProfile != "" && CompanyProfile != "undefined" && CompanyProfile != null)
                                GetAuthorizedsignatory = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users/authorizedsignatory?contractid=' + ContractID + '&contractareaname=';
                            else
                                GetAuthorizedsignatory = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users/authorizedsignatory?contractid=&contractareaname=' + encodeURIComponent($("#hdContractArea").val());
                            $.ajax({
                                url: GetAuthorizedsignatory,
                                type: 'GET',
                                dataType: 'json',
                                'Content-Type': 'application/json',
                                cache: false,
                                async: false,
                                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                                success: function (data) {
                                    var v = $(data).length;
                                    var datalenght = data.length;
                                    for (var i = 0; i < datalenght; i++) {
                                        var itemin = data[i];
                                        var sRowKey = itemin.RowKey;
                                        var sUserName = itemin.UserName;
                                        var sEmail = itemin.EmailID;
                                        var nospaceUserName = sUserName.replace(/ /g, "_");
                                        var sUser = '<li>';
                                        sUser += '<input id="' + sEmail + '_' + nospaceUserName + '" title="' + sEmail + '" type="radio" name="SigneeUser" class="css-checkbox" value="' + sUserName + '" />';
                                        sUser += '<label for="' + sEmail + '_' + nospaceUserName + '" class="css-label">' + sUserName + '</label>';

                                        sUser += '</li>';
                                        $("#tblSigneeUser").append(sUser);
                                    }
                                    $("#tblSigneeUser").find('li').each(function () {
                                        var inputval = ($(this).find('input').length > 0 ? $(this).find('input').val() : "");
                                        if (inputval != "" && inputval == item.ContactName) {
                                            if (iIn == 1 && totalFileCountTaken < 5 && iIn < 5) {
                                                iIn = 2;
                                                totalFileCountTaken += 1;
                                                $("#txtInternalSignee1").val(item.ContactName);
                                                $("#txtInternalEmail1").val(item.EmailID);
                                            }
                                            else if (totalFileCountTaken < 5 && iIn < 5) {
                                                AddInternalSignee();
                                                totalFileCountTaken += 1;
                                                $("#txtInternalSignee" + iIn).val(item.ContactName);
                                                $("#txtInternalEmail" + iIn).val(item.EmailID);
                                                iIn += 1;
                                            }
                                        }
                                    })
                                },
                                error:
                                    function (data) {

                                    }
                            });
                        }
                    }
                }
                if (totalFileCountTaken >= 5) {
                    $("#spAddSignee").css("display", "none");
                    $("#spAddInternalSignee").css("display", "none");
                }
                else {
                    $("#spAddSignee").css("display", "");
                    $("#spAddInternalSignee").css("display", "");
                }
            }
        },
        error: function () {
        },
        complete: function () {
            $("#loadingPage").fadeOut();
        }

    });
}

function ClearSignatureForm() {
    $("#hdDocumentID").val('');
    $("#hdDocumentURL").val('');
    $("#hdMarkAsFinal").val('');
    $("#hdContractID").val('');
    $("#hdContractArea").val('');
    $("#txtSubject").val('');
    $("#txtSigneeMsg").val('');
    $("#txtExpIn").val('3');

    GetValuesAndAutoPopulate("ddlCC", "");
    $('#tblSignees').empty();
    var vSignee = '<tr>';
    vSignee += '<td class="width40">';
    vSignee += '<input id="txtSignee1" name="SigneeName1" title="Signee" placeholder="Signee Name" type="text" class="f_inpt width90" />';
    vSignee += '</td>';
    vSignee += '<td class="width40">';
    vSignee += '<input id="txtEmail1" name="SigneeEmail1" title="Email" placeholder="Signee Email" type="text" class="f_inpt width90 validemail" />';
    vSignee += '</td>';
    vSignee += '<td class="width20">';
    vSignee += '<select id="ddlSigneeOrder1" name="SigneeOrder1" onclick="ClickedOrder(this);" onchange="SelectedOrder(this);" class="f_inpt width100 SigneeOrder">';
    vSignee += '<option value="1" selected="selected">1</option>';
    vSignee += '<option value="2">2</option>';
    vSignee += '<option value="3">3</option>';
    vSignee += '<option value="4">4</option>';
    vSignee += '<option value="5">5</option>';
    vSignee += '</select>';
    vSignee += '</td>';
    vSignee += '<td style="width:20px"><img src="../Content/Images/icon/delete.png" style="visibility:hidden; width: 20px" /></td>';
    vSignee += '</tr>';
    $('#tblSignees').html(vSignee);
    $('#tblInternalSignees').empty();
    vSignee = '<tr>';
    vSignee += '<td class="width80">';
    vSignee += '<input id="txtInternalSignee1" name="InternalSigneeName1" readonly="readonly" placeholder="Signee Name" title="Signee" type="text" class="f_inpt width80" />';
    vSignee += '<span class="right-float"><a href="javascript:void(0)" onclick="BrowseInternalSignee(\'txtInternalSignee1\', \'txtInternalEmail1\')">Browse</a></span>';
    vSignee += '</td>';
    vSignee += '<td style="display:none;">';
    vSignee += '<input id="txtInternalEmail1" name="InternalSigneeEmail1" placeholder="Signee Email" title="Email" type="text" class="f_inpt width90 validemail" />';
    vSignee += '</td>';
    vSignee += '<td class="width20">';
    vSignee += '<select id="ddlInternalSigneeOrder1" name="InternalSigneeOrder1" onclick="ClickedOrder(this);" onchange="SelectedOrder(this);" class="f_inpt width100 SigneeOrder">';
    vSignee += '<option value="1">1</option>';
    vSignee += '<option value="2" selected="selected">2</option>';
    vSignee += '<option value="3">3</option>';
    vSignee += '<option value="4">4</option>';
    vSignee += '<option value="5">5</option>';
    vSignee += '</select>';
    vSignee += '</td>';
    vSignee += '<td style="width:20px">';
    vSignee += '<img src="../Content/Images/icon/delete.png" style="visibility:hidden; width: 20px" />';
    vSignee += '</td>';
    vSignee += '</tr>';
    $("#tblInternalSignees").append(vSignee);
}

function BindCC() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            var v = $(data).length;
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                var sRowKey = item.RowKey;
                var sUserName = item.UserName;
                var sEmail = item.EmailID;
                var article = '<option value="' + sUserName + '">' + sUserName + '</option>';
                $("#ddlCC").append(article);

            }

            $("#ddlCC").chosen();
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

function AddShareDocument() {
    var vLastRow = $("#tblShareDocument tr:last").attr('id');
    var count = $("#tblShareDocument tr").length;

    var totalFileCount = "2";
    if (typeof vLastRow == "undefined") {
        totalFileCount = "2";
    }
    else {
        totalFileCount = parseInt(vLastRow.replace("trShareDocument", ""));
        totalFileCount += 1;
    }
    if (count <= 9) {

        var htmlFormatFile = '<tr id="trShareDocument' + totalFileCount + '">';
        htmlFormatFile += '<td>';
        htmlFormatFile += '<input id="txtShareDocument' + totalFileCount + '" maxlength="42" name="ShareDocumentName' + totalFileCount + '" placeholder="Name" maxlength="50" title="Name" type="text" class="f_inpt v_align_top width90" />';
        htmlFormatFile += '</td>';
        htmlFormatFile += '<td>';
        htmlFormatFile += '<input id="txtShareDocumentEmail' + totalFileCount + '" maxlength="50" name="ShareDocumentEmail' + totalFileCount + '" placeholder="Email ID" maxlength="100" title="Email Id" type="text" class="f_inpt v_align_top width90 validemail" />';
        htmlFormatFile += '</td>';
        htmlFormatFile += '<td style="width:20px">';
        htmlFormatFile += '<a href="javascript:void(0)" onclick="DeleteShareDocument(this)"><img src="../Content/Images/icon/delete.png" /></a>';
        htmlFormatFile += '</td>';
        htmlFormatFile += '</tr>';

        $("#tblShareDocument").append(htmlFormatFile);
        if (count == 9) {
            $(".addmorelinks").hide();
        }

    }

}

function DeleteShareDocument(n) {
    n.parentNode.parentNode.parentNode.removeChild(n.parentNode.parentNode);
    $(".addmorelinks").show();
}

function ShareDocument() {
    var vValid = requiredValidator('shareDocument');
    if (vValid) {
        var emailvalue = "";
        arremail = [];
        var ExternalEmail = [];
        $('#shareDocument .validemail').each(function (i, item) {
            if (emailvalue == '') {
                emailvalue = item.value;
                if (emailvalue != "") {
                    ExternalEmail.push(emailvalue);
                    arremail.push(emailvalue.toLowerCase());
                }
                emailvalue = '';
            }
        });
        ExternalEmail = jQuery.unique(ExternalEmail);
        recipientsArray = arremail.sort();
        reportRecipientsDuplicate = [];
        for (var j = 0; j < recipientsArray.length - 1; j++) {
            if (recipientsArray[j + 1] == recipientsArray[j]) {
                reportRecipientsDuplicate.push(recipientsArray[j]);
                if (reportRecipientsDuplicate.length > 0) {
                    vValid = false;
                }
            }
        }
        //manoj
        //Internal/External User Mail Id Validation
        var notify = $("#ddlDocumentShareInternal").chosen().find("option:selected");
        var notyEmail = "";
        var InternalEmail = [];
        $(notify).each(function (i, item) {
            var email = $(item).attr("data-emailvalue");
            if (email != null && email.trim() != "") {
                InternalEmail.push(email.toLowerCase());
                var name = item.text;
                notyEmail += name + "~" + email.trim() + ";";
            }
        });
        var commonEmail = $.grep(ExternalEmail, function (element) {
            return $.inArray(element.toLowerCase(), InternalEmail) !== -1;
        });
        //manoj
        if (vValid && commonEmail.length == 0) {
            $("#loadingPage").fadeIn();
            var contractForm = $("#frmShareDocument *").serialize();
            contractForm += "&SendBy=" + localStorage.UserName;
            contractForm += "&Notes=" + encodeURIComponent($("#txtShareNotes").val());
            contractForm += "&ExpIn=" + $("#txtShareExpIn").val();
            contractForm += "&AllowComment=" + 'Yes';
            contractForm += "&AllowDownload=";
            contractForm += "&AllowUpload=" + 'Yes';
            contractForm += "&AutoUpdateStatus=" + ($("#chkAutoUpdateStatusShareDoc").is(':checked') ? 'Yes' : 'No');


            contractForm += "&InternalUsers=" + notyEmail;
            if ($("#chkDisclose").is(':checked')) {
                contractForm += "&Disclose=Yes";
            } else {
                contractForm += "&Disclose=No";
            }
            var vDocID = $("#hdDocumentID").val();
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/Share?documentid=' + vDocID,
                type: 'POST',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                data: contractForm,
                cache: false,
                success: function (person) {
                    $("#shareDocument").dialog("close");
                    $("#loadingPage").fadeOut();
                    ClearShareForm();
                },
                error: function (person) {
                    $("#loadingPage").fadeOut();
                }
            });
        }
        else {
            if (commonEmail.length > 0) {
                swal("", commonEmail.toString().trim() + " are same with internal user.");
            }
            $('#shareDocument .validemail').each(function (i, item) {
                for (i = 0; i <= reportRecipientsDuplicate.length; i++) {
                    if (item.value.toLowerCase() == reportRecipientsDuplicate[i]) {
                        var id = item.id;
                        $('#' + id).addClass('error')
                    }
                }

            });
        }
    }
}

function ClearShareForm() {
    $("#hdDocumentID").val('');
    $("#txtShareNotes").val('');
    $("#txtShareTo").val('');
    $("#txtShareExpIn").val('');
    $('#tblShareDocument').empty();
    GetValuesAndAutoPopulate("ddlDocumentShareInternal", "");
    $('#chkDisclose').attr('checked', false);
    var vSignee = '<tr>';
    vSignee += '<td>';
    vSignee += '<input id="txtShareDocument1" name="ShareDocumentName1" maxlength="42" title="Name" placeholder="Name" type="text" class="f_inpt width90 v_align_top validelement" />';
    vSignee += '</td>';
    vSignee += '<td>';
    vSignee += '<input id="txtShareDocumentEmail1" name="ShareDocumentEmail1" maxlength="50" title="Email ID" placeholder="Email ID" type="text" class="f_inpt width90 v_align_top validelement validemail" />';
    vSignee += '</td>';
    vSignee += '<td style="width:20px">&nbsp;</td>';
    vSignee += '</tr>';
    $('#tblShareDocument').html(vSignee);
}

$("#btnNewFolder").click(function () {
    if ($(this).text().trim() == "Create Sub Folder") {
        $("#txtNewFolderName").val('');
        $("#txtNewFolderName").css('display', '');
        $(this).text('Cancel');
    } else if ($(this).text().trim() == "Cancel") {
        $("#txtNewFolderName").val('');
        $("#txtNewFolderName").css('display', 'none');
        $(this).text('Create Sub Folder');
    }

});

function setDocumentUrl(objdetails) {
    //$("#dvhelptextvalue").css('display', 'none');
    getContractData($('#txtContractRecElementID').val(), 'tblContentControls', $("#ddlDocumentTemplate").find('option:selected').text(), objdetails, "dvhelptextvalue");
    if (strContractDocumentsUrl != "") {
        $("#txtNewFolderName").val("");
        $("#txtNewFolderName").css('display', 'none');
        $("#lblFolderUrl").text((strContractDocumentsUrl.substr(strContractDocumentsUrl.length - 1) == "/") ? strContractDocumentsUrl : strContractDocumentsUrl + "/");
        $("#btnNewFolder").css('display', '');
        $("#btnBrowseSubFolders").css('display', '');

        $("#lblFolderUrl").css('cursor', 'pointer');
        $("#lblFolderUrl").click(function () {
            var folderurl = $('#lblFolderUrl').text().trim();
            folderurl = (folderurl.charAt(0) == "/") ? firstcharfind.substr(1) : folderurl;
            folderurl = ((folderurl.substr(folderurl.length - 1)) == "/") ? folderurl.slice(0, -1) : folderurl;
            var firstcharfind = folderurl.split('/');
            if (firstcharfind.length > 1) {
                CreateFolder(firstcharfind[0].trim() + "/" + firstcharfind[1].trim() + "/");
                $("#treeviewFolder").dialog("option", "title", "Select Folder");
                $("#treeviewFolder").dialog("open");
            } else {
                swal("", "Please Select Contract Record.");
            }
        });
        $("#btnBrowseSubFolders").css('display', '');

    } else {
        $("#btnBrowseSubFolders").css('display', 'none');
        $("#lblFolderUrl").css('cursor', 'default');
        $("#txtNewFolderName").css('display', 'none');
        var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
        var vDocLibFeat = $.grep(veContractFeatures, function (n, i) {
            return (n.RowKey == "14" && n.Status == "ON");
        });
        if (vDocLibFeat.length > 0) {
            if ($('#hdContAreaDocLibName').val() != '')
                $("#lblFolderUrl").text('/' + $('#hdContAreaDocLibName').val() + '/');
            else
                $("#lblFolderUrl").text('/[Document Library]/');
        }
        else {
            $("#lblFolderUrl").text('/Contract Documents/');
        }
        $("#btnNewFolder").css('display', 'none');
        if ($("#txtContractRecElementID").val() != "0" && $("#txtContractRecElementID").val() != "") {
            $("#txtNewFolderName").val($("#txtContractRecElement").val());
            $("#txtNewFolderName").css('display', '');
        }
    }
    if (SaveFinalInCloud == "on") {
        $("#rad_CopyLibraryAndAzure").attr('checked', 'checked');
    } else {
        $("#rad_CopyLibrary").attr('checked', 'checked');
    }

}

function BindO365LibrarySettings() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/getdocumentsettings',
        type: 'GET',
        dataType: 'json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (librarysettings) {
            if (librarysettings.AllowSaveDraftInCloud == "on") {
                AllowSaveDraftInCloud = "on";
                if ($("input:radio[name=IsFinalized]:checked").val() == "Yes") {
                    if (librarysettings.SaveFinalInCloud == "on") {
                        SaveFinalInCloud = "on";
                    } else {
                        SaveFinalInCloud = "off";
                    }
                }
                else {
                    if (librarysettings.SaveDraftInCloud == "on") {
                        SaveDraftInCloud = "on";
                    }
                    else {
                        SaveDraftInCloud = "off";
                    }
                }
            }
            else {
                AllowSaveDraftInCloud = "off";
                SaveFinalInCloud = "off";
                SaveDraftInCloud = "off";
            }

        },
        error: function () {

        }
    });
}

var selectedSortOption = "";
function highlight(obj) {

    $('#tdSort a').each(function (i, item) {
        item.style.backgroundColor = "";
    });
    obj.style.backgroundColor = "#cccccc";

    selectedSortOption = obj.textContent;

}

function SearchCounterparty() {
    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = encodeURIComponent(localStorage.GlobalBusinessAreaLocation);
    }
    $("#tblCounterparties").html('');
    $('#loadCP').html('<img src="../Content/Images/icon/loading.gif"> Searching...');
    var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/getrelatedcounterparty?searchkeyword=' + encodeURIComponent($("#txtSearchBoxCounterparty").val()) + '&customquery=&sortbyfield=CounterpartyName&orderby=ASC';
    $.ajax({
        url: vURL,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey, BusinessAreaLocation: localStorage.GlobalBusinessAreaLocation },
        cache: false,
        success: function (data) {

            $('#loadCP').empty();
            arr = [];

            if ($('#txtCounterpartyCreate').val() != null) {
                $.each($('#txtCounterpartyCreate').val().split(";"), function () {
                    arr.push($.trim(this));
                });
            }
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
                                        if (typeof (path) != "undefined") {
                                            if (path == $("#txtBusinessAreaPath").val().trim().toString())
                                                myCounterPartyArray.push(data[i]);
                                        }
                                    }
                                })

                            }
                        }
                    }
                }
                obj1[data[i].CounterpartyName] = true;
            }
            var article = '';
            var datalength = myCounterPartyArray.length;
            for (var i = 0; i < datalength; i++) {
                var item = myCounterPartyArray[i];

                if (i == 0) {
                    article += '<tr><th><input id="selectall" style="width:35%;" onclick="funselectallCounterParty(this);" type="checkbox"/> Select/Deselect All</th><th style="width:20%;">Counterparty Name</th><th>Counterparty Type</th><th>Global or Regional</th></tr>';

                }
                article += '<tr><td>';
                if (arr.indexOf(item.CounterpartyName) >= 0) {
                    article += '<input id="CP' + item.RowKey + '" type="checkbox" name="CounterpartyPicker" onclick="checkMultipleDocumentsCounterParty(this);"  class="css1-checkbox" checked value="' + escape(item.CounterpartyName) + '" />&nbsp;';
                } else {
                    article += '<input id="CP' + item.RowKey + '" type="checkbox" name="CounterpartyPicker" onclick="checkMultipleDocumentsCounterParty(this);"  class="css1-checkbox" value="' + escape(item.CounterpartyName) + '" />&nbsp;';
                }

                article += '<td><label for="CP' + item.RowKey + '" class="css1-label"  style="display: inline;">' + item.CounterpartyName + '</label></td>';
                article += '</td><td>' + item.CounterpartyType + '';
                article += '</td>';
                article += '<td>' + (item.IsGlobal == "Yes" ? "Global" : item.BusinessAreas) + '';
                article += '</td></tr>';
            }
            $("#tblCounterparties").html(article);
            article = '';
            var vCount = $("#tblCounterparties tr").length;
            if (vCount != 0) {
                $('#loadCP').html('');
                $('#compact-paginationCounterparties').css('display', '');
                $('#compact-paginationCounterparties').pagination({
                    items: vCount,
                    itemsOnPage: 10,
                    typeID: 'tblCounterparties',
                    row: 'tr',
                    cssStyle: 'compact-theme'
                });
            } else {
                $('#loadCP').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No Counterparty Found!</p>')
                $('#compact-paginationCounterparties').css('display', 'none');
            }
        },
        error: function () {
            $('#compact-paginationCounterparties').css('display', 'none');
            $('#loadCP').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No Counterparty Found!</p>')
        }
    });

}

function BindContractsLocal() {
    strContractDocumentsUrl = "";
    if ($("#txtBusinessAreaPath").val() != "") {
        $("#loadingPage").fadeIn();
        $('#dvLoading').css("display", "");
        $("#tblContractsTodo").empty();

        var vDocType = getParameterByName('Type');
        var vstage = "Contract";
        if (vDocType.toLowerCase() == "pipeline")
            vstage = "Pipeline";
        var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?stage=' + vstage + '&searchkeyword=&customquery=&sortbyfield=ContractTitle&orderby=ASC';
        $.ajax({
            url: vURL,
            type: 'GET',
            dataType: 'json',
            'Content-Type': 'application/json',
            cache: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey, UserName: localStorage.UserName, UserID: localStorage.UserID, BusinessAreaLocation: $("#txtBusinessAreaPath").val() },
            success: function (data) {
                var v = $(data).length;
                var contractTags = [];
                var datalenght = data.length;
                var vPipelineStatus = ["New", "Drafting", "Awaiting Review", "Reviewed", "Awaiting Approval", "Approved", "In Negotiation", "Negotiation Complete"];
                var vContractStatus = ["Ready for Signature", "Awaiting Signatures", "Signed", "Active", "Up for Renewal", "Renewed", "Extended", "On Hold", "Replaced", "Expired", "Cancelled", "Terminated", "Archived"];
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];
                    if ((vDocType == 'pipeline' && $.inArray(item.Status, vPipelineStatus) !== -1)
                        || (vDocType == 'contracts' && $.inArray(item.Status, vContractStatus) !== -1)) {
                        var sRowKey = item.RowKey;
                        var sContractTitle = item.ContractTitle;
                        var sContractNumber = item.ContractNumber;
                        var sBusinessArea = item.BusinessArea;

                        var article = '<li>';
                        article += '<input id="CR-' + sRowKey + '" type="radio" name="Contracts" class="css-checkbox" value="' + sContractTitle + '" />';
                        article += '<label for="CR-' + sRowKey + '" class="css-label PreserveSpace"><a href="/Contracts/ContractDetails?ContractID=' + sRowKey + '" target="_blank">' + sContractTitle + '</a></label>';   //ENH487 Customer inhanc
                        article += '<input id="BA' + sRowKey + '" type="text" style="display:none;" name="BA" value="' + sBusinessArea + '" />';
                        article += '<input id="BAP' + sRowKey + '" type="text" style="display:none;" name="BA" value="' + item.BusinessAreaPath + '" />';
                        article += '<input id="CA' + sRowKey + '" type="text" style="display:none;" name="BA" value="' + item.ContractArea + '" />';
                        article += '<input id="CP' + sRowKey + '" type="text" style="display:none;" name="BA" value="' + item.Counterparty + '" />';
                        article += '<input id="DocUrl' + sRowKey + '" type="text" style="display:none;" name="DocUrl" value="' + item.ContractDocumentsUrl + '" />';
                        article += '</li>';
                        $("#tblContractsTodo").append(article);
                        if (i == v - 1) {
                        }
                        contractTags.push(sContractTitle);
                    }
                }

                $("#txtSearchBoxTodoForm").autocomplete({
                    source: contractTags,
                    minLength: 2,
                    focus: function (event, ui) {
                        return false;
                    },
                    select: function (evn, uidetails) {
                        $("#txtSearchBoxTodoForm").val(uidetails.item.label);
                        SearchContractRec();
                    }
                });

                var vCount = $("#tblContractsTodo li").length;
                $('#compact-paginationContractsTodo').pagination({
                    items: vCount,
                    itemsOnPage: 10,
                    type: 'ul',
                    typeID: 'tblContractsTodo',
                    row: 'li',
                    cssStyle: 'compact-theme'
                });
                var vContractRec = $("#txtContractRecElementEdit").val().trim();
                if (vContractRec == "")
                    vContractRec = $("#txtContractRecElement").val().trim();
                if (vContractRec != "" && vContractRec != "") $('input[type="radio"][name="Contracts"][value="' + vContractRec + '"]').prop('checked', true);
                $('#dvLoading').css("display", "none");
                $("#dvContractRec").dialog("option", "title", "Select Contract");
                $("#dvContractRec").dialog("open");
                $('#dvLoading').html('');
                $("#loadingPage").fadeOut();

            },
            error:
                function (data) {
                    $("#tblContractsTodo").html('No items found.')
                    $('#dvLoading').css("display", "none");
                    $("#dvContractRec").dialog("option", "title", "Select Contract");
                    $("#dvContractRec").dialog("open");
                    $('#dvLoading').html('');
                    $("#loadingPage").fadeOut();
                }
        });
    } else {
        swal("", "Please select business area");
    }
}

function GetNotTaggedDocuments() {
    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = encodeURIComponent(localStorage.GlobalBusinessAreaLocation);
    }

    $('#listDocuments').html('<img class="f_p-error" src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/nottaggedwithcontract',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessAreaLocation: localStorage.GlobalBusinessAreaLocation },
        success: function (data) {
            if (data.length == 0) {
                $('#listDocuments').empty();
                $("#listDocuments").append('<p class="f_p-error">No items found.</p>');
                $("#compact-pagination").css('display', 'none');
                $("#SelectAll").hide();
                $("#SelectAllSpan").hide();
                $('#SelectAll').attr('checked', false);
            } else {
                $("#compact-pagination").css('display', '');
                $('#listDocuments').empty();
                GenerateListOfDocuments(data, false, true);
            }
        },
        error:
            function (data) {
                $("#SelectAll").hide();
                $("#SelectAllSpan").hide();
                $('#SelectAll').attr('checked', false);
                $('#listDocuments').empty();
                $("#listDocuments").append('<p class="f_p-error">No items found.</p>');
                $("#compact-pagination").css('display', 'none');
            }
    });
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
                var sUserName = item.UserName;
                var sEmail = item.EmailID;
                var articleemailuser = '<option value="' + sUserName + '" data-emailvalue="' + sEmail + '">' + sUserName + '</option>';
                var article = '<option value="' + sUserName + '">' + sUserName + '</option>';
                $("#ddlDocRemindTo").append(article);
                $("#ddlDocRemindToEdit").append(article);
                $("#ddlWorkflowCC").append(article);
                $("#ddlAuthor").append(article);
                $("#ddlAuthorEdit").append(article);
                $("#ddlDocumentShareInternal").append(articleemailuser);
            }
            $("#ddlDocRemindTo").chosen();
            $("#ddlDocRemindToEdit").chosen();
            $("#ddlWorkflowCC").chosen();
            $("#ddlAuthorEdit").chosen();
            $("#ddlDocumentShareInternal").chosen();

            $("#ddlAuthor").chosen().trigger("chosen:updated");
            $('.chosenmulti').on('chosen:showing_dropdown', function (evt, params) {
                $('.result-selected').css('display', 'none');
            });

            if (localStorage.UserName != "") {
                GetValuesAndAutoPopulate("ddlAuthor", localStorage.UserName);
            }
        },
        error:
            function (data) {
            }
    });
}

function liRemoveSelected(obj) {

    var child = obj.parentNode;

    var i = selecteditems.indexOf(child.firstChild.nodeValue);
    if (i != -1) {
        selecteditems.splice(i, 1);
    }
    child.parentNode.removeChild(child);
    $('#txtBA').val(selecteditems);
}



function togglediv(firstObject, secondObject, imgObject) {
    $("#" + firstObject).slideToggle();
    $("#" + secondObject).slideToggle();

    var imgObj = $("#" + imgObject);

    if (imgObj.attr("title") == "Collapse") {
        imgObj.attr("title", "Expand");
        imgObj.attr("src", "../Content/Images/dp-ddown.png");
    } else {
        imgObj.attr("title", "Collapse");
        imgObj.attr("src", "../Content/Images/dp-dup.png");
    }
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
    htmlFormatFile += '<select id="ddlAssignTo' + totalFileCount + '" name="AssignTo' + totalFileCount + '"  multiple="multiple" data-placeholder="Select" class="width97 validmultiselect chosenmulti"></select>';
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
        if (typeof ($("#hdWorkflowContractID").val()) != 'undefined' && $("#hdWorkflowContractID").val() != null && $("#hdWorkflowContractID").val() != "") {
            if ($("#hdIsPublicStatus").val() == "Yes") {
                ProcessWorkflow();
            } else {
                $("#loadingPage").fadeIn();
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/contractpermission?contractid=' + $("#hdWorkflowContractID").val(),
                    type: 'GET',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                    "Content-Type": "application/json",
                    cache: false,
                    success: function (UserList) {
                        var PermittedUser = UserList.split(';');
                        $('#tblStage tr').each(function (i, row) {
                            var vRow = $(row).attr('id');
                            var vRowIndex = vRow.replace("trStage", "");
                            $('#ddlAssignTo' + vRowIndex + '_chosen').find('.chosen-choices li').find('span').each(function () {
                                PermittedUser.push($(this).text());
                            });
                        });
                        var ccsArr = [];
                        $($("#ddlWorkflowCC").val()).each(function (i, item) {
                            ccsArr.push(item);
                        });
                        var FilterArray = $.grep(ccsArr, function (nccsArr, iccsArr) {
                            return (PermittedUser.indexOf(nccsArr) == -1);
                        });
                        if (FilterArray.length > 0) {
                            var liuser = FilterArray.join(',');
                            if (liuser.lastIndexOf(",") > -1) {
                                liuser = liuser.substr(0, liuser.lastIndexOf(",")) + ' and ' + liuser.substr(liuser.lastIndexOf(",") + 1);
                            }
                            swal({
                                title: '',
                                //text: liuser + " are not a part of the contract, Are you sure add this user as <span style=\"font-weight:700\">Readonly Permission</span>'?",
                                text: "'<span style=\"font-weight:700\">" + liuser + "</span> do not have access to this contract, . Do you want to provide access?",
                                type: 'warning',
                                showCancelButton: true,
                                confirmButtonText: 'Yes',
                                cancelButtonText: 'No',
                                html: true
                            },
                            function (confirmed) {
                                if (confirmed) {
                                    ProcessWorkflow();
                                } else {
                                    $("#loadingPage").fadeOut();
                                }
                                return;
                            });
                        } else {
                            ProcessWorkflow();
                        }
                    },
                    error: function (UserList) {
                        $("#loadingPage").fadeOut();
                    }
                });
            }
        } else {
            ProcessWorkflow();
        }
    }
}

//manoj
function ProcessWorkflow() {
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
    var nicInstance = nicEditors.findEditor('txtComment');
    var vcommentText = CleanWordFormatFromHTML(nicInstance.getContent());
    var vNoteTextCount = vcommentText.replace(/<\/?[^>]+(>|$)/g, "");
    if (vNoteTextCount.length <= 26500) {
        vcommentText = $('<div/>').text(vcommentText).html();
        var vObject = "Contracts";
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
                swal("", $("#hdWorkflowType").val() + " Workflow Started");
                $("#inprocessStartWorkflow").css('display', 'none');
                $("#dvWorkflow").dialog("close");
                //manoj
                swal({
                    title: '',
                    text: $("#hdWorkflowType").val() + " Workflow Started",
                    type: 'warning',
                    //showCancelButton: true,
                    confirmButtonText: 'OK',
                    //cancelButtonText: 'No',
                    html: true
                },
                 function (confirmed) {
                     if (confirmed) {
                         $("#loadingPage").fadeOut();
                         reloadlistDocuments();
                     }
                     return;
                 });
                //manoj
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
//manoj
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

var article1 = "";
var selecteditems12 = [];
var BusinessAreaAccess12 = localStorage.BusinessAreaAccess;

$(function () {

});

function BindBusinessAreaDoc() {
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/entities',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            //manoj
            if (data != null) {
                $(BusinessAreaAccess).each(function (i, item) {
                    var BusinessAreaColection = data.ChildrenData;
                    var ParentFolderID = "0";
                    var path = item.split(' > ');
                    for (var ilength = 0; ilength < path.length; ilength++) {
                        var GetBusinessArea = $.grep(BusinessAreaColection, function (n, ind) {
                            return (n.BusinessAreaName == path[ilength] && n.ParentBusinessAreaID == ParentFolderID);
                        });
                        if (GetBusinessArea != null && GetBusinessArea.length > 0) {
                            ParentFolderID = GetBusinessArea[0].RowKey;
                            BusinessAreaColection = GetBusinessArea[0].ChildrenData;
                        } else {
                            ilength = path.length;
                            ParentFolderID = "0";
                        }
                    }
                    if (ParentFolderID != "0") {
                        BusinessAreaAccessID.push(ParentFolderID);
                    }
                    ParentFolderID = "0";
                });
            }
            //manoj
            //getbusinessareapath(data);
            recursiveIteration121(data)
            $("#tbodyBusinessArea121").append(article1);
            article1 = "";
            $("#example-basic-121").treetable({ expandable: true, initialState: "expanded" });

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

var strContractAreaName121 = "";
var strContractAreaName121Owner = "";
var previousiddoc = "";
var strContractAreaID = '';
function recursiveIteration121(object) {
    if (object.ChildrenData.length != 0)
        BindRecBAOther('', object);
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

function treeviewclick1(obj) {
    treeBusinessAreaName = obj.textContent;
    treeBusinessAreaRowKey = obj.parentNode.parentNode.childNodes[2].textContent;
    treeBusinessAreaParentBusinessAreaID = obj.parentNode.parentNode.childNodes[1].textContent;
    treeBusinessAreaContractAreaName = obj.parentNode.parentNode.childNodes[3].textContent;
    treeBusinessAreaContractAreaNameOwner = obj.parentNode.parentNode.childNodes[4].textContent;
    treeBusinessAreaOwner = obj.parentNode.parentNode.childNodes[5].textContent;


    $('#liSelectedBA').html('<span style="font-size:11px;">' + treeBusinessAreaName + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelected(this);" style="float:right" /></span>');

}
function BindDocumentTypeandTemplate() {
    blInBusinessArea = true;
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/templatedocuments',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (templates) {
            hashtable = {};
            var datalenght = templates.length;
            $("#ddlReplaceTemplate").empty();
            $("#ddlDocumentTemplate").empty();

            $("#ddlReplaceTemplate").append("<option value='0'>--Select--</option>")
            $("#ddlDocumentTemplate").append("<option value='0'>--Select--</option>")

            for (var i = 0; i < datalenght; i++) {
                var item = templates[i];

                if (thisContractAreaSettings.DocumentTemplates.replace(/ ;/g, ";").split(';').indexOf(item.TemplateName) > -1) {
                    $("#ddlReplaceTemplate").append("<option value='" + item.TemplateName.replace(/'/g, "&#39;") + "~" + item.DocumentType + "'>" + item.TemplateName + "</option>");
                    $("#ddlDocumentTemplate").append("<option value='" + item.TemplateName.replace(/'/g, "&#39;") + "~" + item.DocumentType + "'>" + item.TemplateName + "</option>");
                    hashtable[item.TemplateName.replace(/ /g, '')] = item.Description;
                }
            }
            if ($("#ddlDocumentTemplate option").length <= 1) {
                if ($('#tabTemplate').hasClass('form-active')) {
                    swal("", "no templates are assign for business area.");
                }
            }
        }
    });

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documenttypes',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (documenttypes) {
            $("#ddlDocumentType").empty();
            $("#ddlDocumentTypeCreate").empty();
            $("#filterDocumentType").empty();

            $("#ddlDocumentType").append("<option value='0'>--Select--</option>")
            $("#ddlDocumentTypeCreate").append("<option value='0'>--Select--</option>")
            $("#filterDocumentType").append("<option value='All' selected='selected'>All</option>")

            var datalenght = documenttypes.length;
            var isOthersExits = false;
            for (var i = 0; i < datalenght; i++) {
                var item = documenttypes[i];

                if (typeof thisContractAreaSettings === 'undefined') {
                    $("#ddlDocumentType").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                    $("#ddlDocumentTypeCreate").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                    $("#filterDocumentType").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                } else {
                    if (thisContractAreaSettings.DocumentTypes.split(';').indexOf(item.TypeName) > -1) {
                        $("#ddlDocumentType").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                        $("#ddlDocumentTypeCreate").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                        $("#filterDocumentType").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                        if (item.TypeName == "Others") {
                            isOthersExits = true;
                        }
                    }
                }
            }
            //if (typeof thisContractAreaSettings === 'undefined') {
            //    $("#ddlDocumentTypeCreate").find('option[value="Primary Agreement"]').prop("selected", true);
            //}
            if ($("#ddlDocumentTypeCreate option[value='Others']").length == 0) {
                $("#ddlDocumentType").append("<option value='Others'>Others</option>");
                $("#ddlDocumentTypeCreate").append("<option value='Others'>Others</option>");
                $("#filterDocumentType").append("<option value='Others'>Others</option>");
            }
            //if ($("#ddlDocumentTypeCreate option[value='Primary Agreement']").length > 0) {
            //    $("#ddlDocumentTypeCreate").find('option[value="Primary Agreement"]').prop("selected", true);
            //}

        },
        error:
            function (data) {
                $("#ddlDocumentType").append("<option value='Others'>Others</option>");
                $("#ddlDocumentTypeCreate").append("<option value='Others'>Others</option>");
                $("#filterDocumentType").append("<option value='Others'>Others</option>");
            }
    });
}

function getcontractareasettings(contractareaname, templatename) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/contractareadetailsbyname?contractareaname=' + encodeURIComponent(contractareaname),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
            var vDocLibFeat = $.grep(veContractFeatures, function (n, i) {
                return (n.RowKey == "14" && n.Status == "ON");
            });
            if (!bindconarea) {
                if (vDocLibFeat.length > 0) {
                    if (data.DocLibName != null) {
                        if (data.DocLibName != "") {
                            $('#hdContAreaDocLibName').val(data.DocLibName);
                            $("#lblFolderUrl").text('/' + data.DocLibName + '/');
                        } else {
                            $("#lblFolderUrl").text('/Contract Document/');
                        }
                    }
                    else {
                        $("#lblFolderUrl").text('/[Document Library]/');

                    }
                }
                else {
                    $("#lblFolderUrl").text('/Contract Document/');
                }
            } else if (typeof templatename != "undefined" && templatename != null && templatename != "") {
            } else { bindconarea = false; }


            thisContractAreaSettings = data;
            //if (!(thisContractAreaSettings.DocumentTypes.indexOf("Primary Agreement") > -1)) {
            //    thisContractAreaSettings.DocumentTypes = thisContractAreaSettings.DocumentTypes + ";Primary Agreement";
            //}
            BindDocumentTypeandTemplate();
        },
        error: function (data) {
            $('#hdContAreaDocLibName').val('');
        }
    });
}

$('.chosenmulti').on('chosen:showing_dropdown', function (evt, params) {
    $('.result-selected').css('display', 'none');
});

function savedViewapplyFilter(query) {

    $('#menu4').hide();
    $("#showAll").css('display', 'none');
    $("#liFiltersSearchText").empty();
    $("#liFiltersDocumentType").empty();
    $("#liFiltersLibraryName").empty();
    $("#liFiltersCreationMode").empty();

    $("#launcher4").css('display', '');
    $("#divSearch").css('display', '');
    $("#btnFilter").css('display', '');
    $("#btnAddView").css('display', 'block');

    var txtsearchboxvalue = $.trim($('#txtSearchBox').val());
    if (txtsearchboxvalue != "" && txtsearchboxvalue != null) {

    }
    var customQuery1 = "DocumentType:";
    var isContainingAll1 = false;
    var isAnySelected1 = false;
    $('#filterDocumentType :selected').each(function (i, selected) {
        isAnySelected1 = true;
        if ($(selected).text() == "All")
            isContainingAll1 = true;


        customQuery1 += ',' + $(selected).text();

    });
    if (!isAnySelected1) {
        customQuery1 = "";
    }
    if (isContainingAll1) {
        $("#liFiltersDocumentType").empty();
        customQuery1 = "";
    }

    var customQuery2 = '';// ";DocumentLibraryName:Finalized Documents";
    var isContainingAll2 = false;
    var isAnySelected2 = false;
    $('#filterLibraryName :selected').each(function (i, selected) {
        isAnySelected2 = true;
        if ($(selected).text() == "All")
            isContainingAll2 = true;


        customQuery2 += ',' + $(selected).text();
    });
    if (!isAnySelected2) {
        customQuery2 = "";
    }

    var customQuery3 = ";CreationMode:";
    var isContainingAll3 = false;
    var isAnySelected3 = false;
    $('#filterCreationMode :selected').each(function (i, selected) {
        isAnySelected3 = true;
        if ($(selected).text() == "All")
            isContainingAll3 = true;


        customQuery3 += ',' + $(selected).text();
    });
    if (!isAnySelected3) {
        customQuery3 = "";
    }
    if (isContainingAll3) {
        $("#liFiltersCreationMode").empty();
        customQuery3 = "";
    }

    var vIsShowAllDoc = false;
    if (isContainingAll1 && isContainingAll2 && isContainingAll3) {
        $("#showAll").css('display', 'inline');
        vIsShowAllDoc = true;
    }

    if (!isAnySelected1 && !isAnySelected2) {
    }

    $("#listDocuments").empty();

    var sortby = "&sortbyfield=Timestamp&orderby=DESC";
    switch (selectedSortOption) {
        case "Recently Updated":
            sortby = '&sortbyfield=Timestamp&orderby=DESC';
            break;
        case "Recently Created":
            sortby = '&sortbyfield=Created&orderby=DESC';
            break;
        case "Title(A-Z)":
            sortby = '&sortbyfield=DocumentName&orderby=ASC';
            break;
        case "Title(Z-A)":
            sortby = '&sortbyfield=DocumentName&orderby=DESC';
            break;
        default:
            sortby = '&sortbyfield=Timestamp&orderby=DESC';
            break;
    }
    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = encodeURIComponent(localStorage.GlobalBusinessAreaLocation);
    }

    if (query.indexOf("IsFolder:False;IsFinalized:Yes") >= 0) {
        $("#spnFinalizedDocuments").addClass("active_quick_view")
    } else if (query.indexOf("IsFolder:False;IsFinalized:No") >= 0) {
        $("#spnDraftDocuments").addClass("active_quick_view")
    } else if (query.indexOf("ContractID:;IsFolder:False") >= 0) {
        $("#spnNotTagged").addClass("active_quick_view")
    } else {
        $("#spnAllDocuments").addClass("active_quick_view")
    }
    if ($("#spnAllDocuments").hasClass("active_quick_view")) {
        newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?showparent=true&searchkeyword=' + encodeURIComponent($.trim($('#txtSearchBox').val())) + '&customquery=' + customQuery1 + customQuery2 + customQuery3 + sortby + '&type=' + getParameterByName("Type");
    } else if ($("#spnFinalizedDocuments").hasClass("active_quick_view")) {
        if (customQuery1 == "" && customQuery2 == "" && customQuery3 == "") {
            var customquery4 = "IsFolder:False;IsFinalized:Yes";
            newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?showparent=false&searchkeyword=' + encodeURIComponent($.trim($('#txtSearchBox').val())) + '&customquery=' + customquery4 + '&sortbyfield=Timestamp&orderby=DESC' + '&type=' + getParameterByName("Type");
        } else {
            newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?showparent=false&searchkeyword=' + encodeURIComponent($.trim($('#txtSearchBox').val())) + '&customquery=' + customQuery1 + customQuery2 + customQuery3 + ";IsFolder:False;IsFinalized:Yes" + sortby + '&type=' + getParameterByName("Type");
        }
    } else if ($("#spnDraftDocuments").hasClass("active_quick_view")) {
        if (customQuery1 == "" && customQuery2 == "" && customQuery3 == "") {
            var customquery4 = "IsFolder:False;IsFinalized:No";
            newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?showparent=false&searchkeyword=' + encodeURIComponent($.trim($('#txtSearchBox').val())) + '&customquery=' + customquery4 + '&sortbyfield=Timestamp&orderby=DESC' + '&type=' + getParameterByName("Type");
        } else {
            newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?showparent=false&searchkeyword=' + encodeURIComponent($.trim($('#txtSearchBox').val())) + '&customquery=' + customQuery1 + customQuery2 + customQuery3 + ";IsFolder:False;IsFinalized:No" + sortby + '&type=' + getParameterByName("Type");
        }
    } else if ($("#spnNotTagged").hasClass("active_quick_view")) {
        newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?showparent=false&searchkeyword=' + encodeURIComponent($.trim($('#txtSearchBox').val())) + '&customquery=' + customQuery1 + customQuery2 + customQuery3 + ";ContractID:;IsFolder:False" + sortby + '&type=nottagged';
    }


    $('#listDocuments').html('<img class="f_p-error" src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: newurl,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessAreaLocation: localStorage.GlobalBusinessAreaLocation },
        success: function (data) {
            if (data.length == 0) {
                $("#listDocuments").empty();
                $("#listDocuments").append('<p class="f_p-error">No items found.</p>');
                $("#compact-pagination").css('display', 'none');
                $("#SelectAll").hide();
                $("#SelectAllSpan").hide();
                $('#SelectAll').attr('checked', false);
            } else {
                $("#compact-pagination").css('display', '');
                $('#listDocuments').empty();
                if (customQuery1 == "" && customQuery2 == "" && customQuery3 == "") {
                    GenerateListOfDocuments(data, false, true);
                } else {
                    GenerateListOfDocuments(data, false, false, true);
                }
            }

        },
        error:
            function (data) {
                $("#listDocuments").empty();
                $("#listDocuments").append('<p class="f_p-error">No items found.</p>');
                $("#compact-pagination").css('display', 'none');
            }
    });
    $("#dvfilter").hide();

    $("#btnAddView").css('display', 'none');
    colorLink('spnAllDocuments', false);
    colorLink('spnFinalizedDocuments', false);
    colorLink('spnDraftDocuments', false);
    colorLink('spnNotTagged', false);
}

function SearchIn(action) {
    switch (action) {
        case "Contracts":
            {
                if (getParameterByName('Type') == 'pipeline') {
                    location = "/Pipeline";
                } else {
                    location = "/Contracts";
                }
                break;
            }
        case "Documents":
            {

                break;
            }
    }
}

function getCurrencyDisplayStyle() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/settings',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            if (data.CurrencyDisplayStyle == "UK") {
                vCurrencyDisplayStyle = "UK";
            } else if (data.CurrencyDisplayStyle == "CAN") {
                vCurrencyDisplayStyle = "CAN";
            } else if (data.CurrencyDisplayStyle == "EU") {
                vCurrencyDisplayStyle = "EU";
            } else if (data.CurrencyDisplayStyle == "IND") {
                vCurrencyDisplayStyle = "IND";
            }
        }
    });
}

function BindDocumentTemplates(contractarea) {
    blGlobalContractArea = contractarea;
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/contractareadetailsbyname?contractareaname=' + encodeURIComponent(blGlobalContractArea),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        async: false,
        success: function (data) {
            $("#ddlReplaceTemplate").empty();
            $("#ddlReplaceTemplate").append("<option value='0'>--Select--</option>");
            var templates = data.DocumentTemplates.replace(/ ;/g, ";").split(';');
            templates = templates.filter(function (e) { return e !== ' ' });
            templates = templates.filter(function (e) { return e !== '' });
            templates = templates.sort();
            templates = $.unique(templates).sort();
            $("#ddlReplaceTemplate").html("<option value='0'>--Select--</option>");
            for (var i = 0; i < templates.length; i++) {
                $("#ddlReplaceTemplate").append('<option value="' + templates[i] + '">' + templates[i] + '</option>')
            }


        },
        error: function (data) {

        }
    });

}

$("#linkAddValidity").click(function () {
    $("#formValidity").toggle();
    $("#formDocImg").toggle();
    $("#ulvalidity").toggle();

    if ($("#linkAddValidity").text() == "Track document expiration date") {
        $('#linkAddValidity').text("Document Validity & Reminders");
    } else {
        $('#linkAddValidity').text("Track document expiration date");
    }
});

$("#linkAddValidity1").click(function () {
    //$("#formValidity1").toggle();
    $("#formDocImg1").toggle();
    $("#ulvalidity1").toggle();

    if ($("#linkAddValidity1").text() == "Track document expiration date") {
        $('#linkAddValidity1').text("Document Validity & Reminders");
    } else {
        $('#linkAddValidity1').text("Track document expiration date");
    }
});

function GetdocumentIsStandard(contractid) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?contractid=' + contractid,
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName },
        processData: false,
        success: function (data) {
            var countStandard = 0;
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                if (item.IsStandard == "Yes") {
                    countStandard++;
                }
            }
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + contractid,
                type: 'GET',
                cache: false,
                async: false,
                contentType: false,
                headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
                processData: false,
                success: function (Contractitem) {
                    //if (datalenght == countStandard) {

                    //    if (Contractitem.IsStandard != "Yes") {
                    //        swal({
                    //            title: '',
                    //            text: "Marking the document as standard will make the contract as standard. Are you sure you want to make this contract as <span style=\"font-weight:700\">standard</span>?",
                    //            type: 'warning',
                    //            showCancelButton: true,
                    //            confirmButtonText: 'Yes',
                    //            cancelButtonText: 'No',
                    //            html: true
                    //        },
                    //         function (confirmed) {
                    //             if (confirmed) {

                    //                 SetStandardFlag(contractid, "Yes");
                    //             }
                    //             return;
                    //         });


                    //    }
                    //}
                    //else {
                    //    if (Contractitem.IsStandard != "No") {
                    //        swal({
                    //            title: '',
                    //            text: "Marking the document as non standard will make the contract as non standard. Are you sure you want to make this contract as  <span style=\"font-weight:700\">Non Standard</span>?",
                    //            type: 'warning',
                    //            showCancelButton: true,
                    //            confirmButtonText: 'Yes',
                    //            cancelButtonText: 'No',
                    //            html: true
                    //        },
                    //             function (confirmed) {
                    //                 if (confirmed) {

                    //                     SetStandardFlag(contractid, "No");
                    //                 }
                    //                 return;
                    //             });

                    //    }
                    //}
                },
                error: function () {
                    $("#loadingPage").fadeOut();
                }
            });
        }
    });

}
function SetStandardFlag(contractid, strisstandard) {

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + contractid + '&isstandard=' + strisstandard + '&username=' + localStorage.UserName,
        type: 'PUT',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        cache: false,
        success: function (data) {

            if (strisstandard == "Yes") {
                //$("#iStandardCont").css('display', '');
                //$("#iNonStandardCont").css('display', 'none');
                $("#liContractStandard").css('display', '');
                $("#liContractNonStandard").css('display', 'none');

            }
            else {
                // $("#iStandardCont").css('display', 'none');
                //$("#iNonStandardCont").css('display', '');
                $("#liContractStandard").css('display', 'none');
                $("#liContractNonStandard").css('display', '');

            }

            $("#loadingPage").fadeOut();
        },
        error: function () {
            $("#loadingPage").fadeOut();
        }
    });
}

function checkMultipleContracts(object) {
    var selcetedcount = 0;
    var totaldoccount = 0;
    if (typeof object != 'undefined') {
        var DocumentID = object.id;
        var DocSpltID = DocumentID.split("~");
        var vPermission = $(object).parent("p").parent("li").find("#Permission").text();
        var isChecked = object.checked;
        if (isChecked) {
            $("#btnMultipleAction").css('display', '');
            multipleChecks = multipleChecks + ';' + DocSpltID[0];
            multipleChecksurl = multipleChecksurl + ';' + DocSpltID[1];
            multipleChecksPermission = multipleChecksPermission + ';' + vPermission;

        } else {
            multipleChecks = multipleChecks.replace(';' + DocSpltID[0], '');
            multipleChecksurl = multipleChecksurl.replace(';' + DocSpltID[1], '');
            multipleChecksPermission = multipleChecksPermission.replace(';' + vPermission, '');
        }
    }

    var isSelectedDraft = false;
    $("input:checkbox[name=ContRec]:checked").each(function () {
        if ($(this).parent("p").parent("li").find("b").text() == "Draft") {
            isSelectedDraft = true;
        }
        selcetedcount++;
    });
    $("input:checkbox[name=ContRec]").each(function () {
        totaldoccount++;
    });
    if (totaldoccount > 0) {
        $("#SelectAll").show();
        $("#SelectAllSpan").show();
    } else {
        $("#SelectAll").hide();
        $("#SelectAllSpan").hide();
    }
    if (selcetedcount > 0) {
        $("#btnMultipleAction").css('display', 'block');
        if (selcetedcount == totaldoccount) {
            $('#SelectAll').attr('checked', true)
        } else {
            $('#SelectAll').attr('checked', false)
        }

        if (multipleChecksPermission.indexOf('openmenuFolderMan') >= 0 || multipleChecksPermission.indexOf('openmenuMan') >= 0 || multipleChecksPermission.indexOf('openmenuFinalMan') >= 0 || multipleChecksPermission.indexOf('openmenuAmendmentDocumentMan') >= 0 || multipleChecksPermission.indexOf('openmenuNotTaggedMan') >= 0 || multipleChecksPermission.indexOf('openmenuNotTaggedFinalMan') >= 0) {
            $("#btnMultipleAction_Delete").css('display', '');

            $("#btnMultipleAction_Download").css('display', '');
            //$("#btnMultipleAction_Markasfinal").css('display', '');
        }
        else {
            $("#btnMultipleAction_Delete").css('display', 'none');
            $("#btnMultipleAction_Download").css('display', '');
            //$("#btnMultipleAction_Markasfinal").css('display', '');
        }
        if (multipleChecksPermission.indexOf('openmenuReadOnly') >= 0) {
            $("#btnMultipleAction_Markasfinal").css('display', 'none');
        } else {
            $("#btnMultipleAction_Markasfinal").css('display', '');
        }
        if (isSelectedDraft) {
            $("#btnMultipleAction_Markasfinal").css('display', 'none');
        }
        else {
            if (multipleChecksPermission.indexOf('openmenuReadOnly') >= 0) {
                $("#btnMultipleAction_Markasfinal").css('display', 'none');
            } else {
                $("#btnMultipleAction_Markasfinal").css('display', '');
            }
        }

    } else {
        $("#btnMultipleAction").css('display', 'none');
        $('#SelectAll').attr('checked', false)
    }
    try {
        hideAllMenuAndStopPro(event);
    }
    catch (ex) {

    }
}
function MultiDocumentDownload() {
    if (multipleChecksurl.charAt(0) == ";") {
        multipleChecksurl = multipleChecksurl.substr(1);
    }
    var formData2 = new FormData();
    formData2.append("DocumentsURL", multipleChecksurl);
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/downloaddocument?documenturl=',
        type: 'POST',
        dataType: 'json',
        data: formData2,
        contentType: false,
        processData: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, UserID: localStorage.UserID, username: localStorage.UserName },
        cache: false,
        success: function (data) {
            if (data.Message.indexOf('Download-') > -1)
                window.open(data.Message)
            else
                swal("", "'" + data.Message + "'");
            try {
                hideAllMenuAndStopPro(event);
            }
            catch (ex) {

            }
            $("#loadingPage").fadeOut();
        }, error: function () {
            swal("", "Try after some time.");
            try {
                hideAllMenuAndStopPro(event);
            }
            catch (ex) {

            }
            $("#loadingPage").fadeOut();
        }
    });
}
function MultiDocumentDelete() {
    swal({
        title: '',
        text: "Are you sure you want to <span style=\"font-weight:700\">delete</span> Document(s)?",
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
                   url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + multipleChecks,
                   type: 'DELETE',
                   dataType: 'json',
                   "Content-Type": "application/json",
                   headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                   cache: false,
                   success: function (data) {
                       $("#loadingPage").fadeOut();
                       //location = location;
                       reloadlistDocuments();
                   }
               });
           }
           return;
       });

}

function MultipleDocumentFinal() {
    swal({
        title: '',
        text: "Are you sure you want to <span style=\"font-weight:700\">mark</span> selected documents as <span style=\"font-weight:700\">Final</span>?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        html: true
    },
   function (confirmed) {
       if (confirmed) {
           $("#loadingPage").fadeIn();
           var entityid = multipleChecks;
           $.ajax({
               url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/MarkFinal?documentid=' + entityid,
               type: 'PUT',
               cache: false,
               contentType: false,
               headers: {
                   'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken, username: localStorage.UserName
               },
               processData: false,
               success: function (document) {
                   $("#loadingPage").fadeOut();
                   reloadlistDocuments();
                   //location = location;
               },
               error: function () {
                   $("#loadingPage").fadeOut();
               }
           });

       }
       return;
   });

}



function BindDocumentTypeandTemplateGeneral() {
    blInBusinessArea = true;
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/templatedocuments',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (templates) {
            var datalenght = templates.length;
            $("#ddlReplaceTemplate").empty();
            $("#ddlDocumentTemplate").empty();

            $("#ddlReplaceTemplate").append("<option value='0'>--Select--</option>")
            $("#ddlDocumentTemplate").append("<option value='0'>--Select--</option>")
            hashtable = {};
            for (var i = 0; i < datalenght; i++) {
                var item = templates[i];
                $("#ddlReplaceTemplate").append("<option value='" + item.TemplateName.replace(/'/g, "&#39;") + "~" + item.DocumentType + "'>" + item.TemplateName + "</option>");
                $("#ddlDocumentTemplate").append("<option value='" + item.TemplateName.replace(/'/g, "&#39;") + "~" + item.DocumentType + "'>" + item.TemplateName + "</option>");
                hashtable[item.TemplateName.replace(/ /g, '')] = item.Description;
            }
        }
    });

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documenttypes',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (documenttypes) {
            $("#ddlDocumentType").empty();
            $("#ddlDocumentTypeCreate").empty();
            $("#filterDocumentType").empty();

            $("#ddlDocumentType").append("<option value='0'>--Select--</option>")
            $("#ddlDocumentTypeCreate").append("<option value='0'>--Select--</option>")
            $("#filterDocumentType").append("<option value='All' selected='selected'>All</option>")

            var isOthersExits = true;
            var datalenght = documenttypes.length;
            for (var i = 0; i < datalenght; i++) {
                var item = documenttypes[i];

                $("#ddlDocumentType").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                $("#ddlDocumentTypeCreate").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                $("#filterDocumentType").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
            }
            //if (typeof thisContractAreaSettings === 'undefined') {
            //    $("#ddlDocumentTypeCreate").find('option[value="Primary Agreement"]').prop("selected", true);
            //}
            if ($("#ddlDocumentTypeCreate option[value='Others']").length == 0) {
                $("#ddlDocumentType").append("<option value='Others'>Others</option>");
                $("#ddlDocumentTypeCreate").append("<option value='Others'>Others</option>");
                $("#filterDocumentType").append("<option value='Others'>Others</option>");
            }
        },
        error:
            function (data) {
                $("#ddlDocumentType").append("<option value='Others'>Others</option>");
                $("#ddlDocumentTypeCreate").append("<option value='Others'>Others</option>");
                $("#filterDocumentType").append("<option value='Others'>Others</option>");
            }
    });
}

$("#btnBrowseSubFolders").click(function () {
    var folderurl = $('#lblFolderUrl').text().trim();
    folderurl = (folderurl.charAt(0) == "/") ? folderurl.substr(1) : folderurl;
    folderurl = ((folderurl.substr(folderurl.length - 1)) == "/") ? folderurl.slice(0, -1) : folderurl;
    var firstcharfind = folderurl.split('/');
    if (firstcharfind.length > 1) {
        CreateFolder(firstcharfind[0].trim() + "/" + firstcharfind[1].trim() + "/");
        $("#treeviewFolder").dialog("option", "title", "Select Folder");
        $("#treeviewFolder").dialog("open");
    } else {
        swal("", "Please Select Contract Record.");
    }
});

//function SelectFoldertoFetchFile(parentFolderName, ContarctNameselection) {
//    $('#load').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
//    newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/folderstructuretoFetchFile?documentlibrary=' + parentFolderName;
//    $.ajax({
//        url: newurl,
//        type: 'GET',
//        dataType: 'json',
//        'Content-Type': 'application/json',
//        cache: false,
//        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName },
//        success: function (folder) {
//            for (var xyz = 0; xyz < folder.length; xyz++) {
//                var checking = folder[xyz].Folder;
//                var checking1 = checking.split("/");
//                folder[xyz].Folder = checking1[1];
//            }
//            $('#load').empty();
//            var inline2 = new kendo.data.HierarchicalDataSource({
//                data: folder,
//                schema: {
//                    model: {
//                        children: "childrenData"
//                    }
//                }
//            });
//            var treeview = $("#treeviewFolderMove").kendoTreeView({
//                template: kendo.template($("#treeviewFolderMove-template").html()),

//                dataSource: inline2,
//                loadOnDemand: false,
//                schema: {
//                    model: {
//                        id: "RowKey",
//                        fields: {
//                            Folder: "Folder",
//                            FolderURL: "FolderURL"
//                        }
//                    }
//                },
//                select: function (e) {
//                    e.preventDefault();
//                    var tree = $('#treeviewFolderMove').data('kendoTreeView');
//                    var dataItem = tree.dataItem(e.node);
//                    var strFolderUrl = dataItem.FolderURL + "/";
//                    fileurldetails = dataItem.FolderURL;
//                }
//            }).data("kendoTreeView");

//            treeview.expand(".k-item");
//        },
//        error:
//            function (data) {
//            }
//    });
//}

function bulkuploadsection() {
    if (getParameterByName('Type') == 'pipeline') {
        location = "/Documents/BulkDocumentUpload?Type=pipeline";
    } else {
        location = "/Documents/BulkDocumentUpload?Type=contracts";
    }
}

function createduplicatedocument(DocumentID) {
    $("#loadingPage").fadeIn();
    var formData2 = new FormData();
    var opmlFile = $('#docContract')[0];

    formData2.append("opmlFile", opmlFile.files[0]);
    formData2.append("documentaction", "duplicate");
    formData2.append("Description", $("#txtDescription").val());
    formData2.append("AccountID", localStorage.AccountID);
    formData2.append("DocumentID", DocumentID);
    formData2.append("DocumentName", $("#txtDuplicateDocumentName").val());
    formData2.append("DocumentExt", $("#spDuplicateDocumentExt").html());
    formData2.append("CreatedBy", localStorage.UserName);
    formData2.append("ModifiedBy", localStorage.UserName);

    formData2.append("ContractID", $("#txtContractRecElementID").val());
    formData2.append("ContractTitle", "");
    if ($("#ddlDocumentTypeCreate").val() != "0") {
        vDocumentType = $("#ddlDocumentTypeCreate").val();
    }
    formData2.append("DocumentType", vDocumentType);
    formData2.append("Counterparty", $("#txtCounterpartyCreate").val());
    if ($("input:radio[name=IsFinalized]:checked").val() == "Yes") {
        formData2.append("IsFinalized", "Yes");
    } else {
        formData2.append("IsFinalized", "No");
    }
    if ($("input:radio[name=IsStandard]:checked").val() == "Yes") {
        formData2.append("IsStandard", "Yes");
    } else {
        formData2.append("IsStandard", "No");
    }
    if ($("#ddlDocumentStatus").val() != "0") {
        formData2.append("DocumentStatus", $("#ddlDocumentStatus").val());
    }
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vDocLibFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "14" && n.Status == "ON");
    });
    if (vDocLibFeat.length > 0) {
        formData2.append("DocumentLibraryName", $('#hdContAreaDocLibName').val());
    }
    else {
        formData2.append("DocumentLibraryName", "Contract Documents");
    }

    formData2.append("LocationURL", $('#lblFolderUrl').text())
    formData2.append("FolderName", $('#txtNewFolderName').val())
    formData2.append("NewFolderName", $('#txtNewFolderName').val())
    if ($("input:radio[name=rad_Copy]:checked").val() == "Library") {
        formData2.append("DocumentLocation", "Office 365 Document Library");
    } else {
        formData2.append("DocumentLocation", "Office 365 Document Library & eContracts Cloud");
    }
    formData2.append("DocumentLanguage", $("#txtDocumentLanguage").val());
    formData2.append("HardCopyPhysicalLocation", $("#txtHardCopyPhysicalLocation").val());
    var arrAuthorCreate = $("#ddlAuthor").val();
    var vAuthorCreate = '';
    $(arrAuthorCreate).each(function (i, item) {
        if (vAuthorCreate == '') {
            vAuthorCreate = item;
        }
        else {
            vAuthorCreate += "; " + item;
        }
    });
    formData2.append("DocumentAuthor", arrAuthorCreate);
    formData2.append("BusinessArea", $("#txtBusinessArea").val());
    formData2.append("BusinessAreaPath", $("#txtBusinessAreaPath").val());
    formData2.append("ValidFrom", $.datepicker.formatDate('mm/dd/yy', $("#dtValidFrom").datepicker('getDate')));
    formData2.append("ValidTill", $.datepicker.formatDate('mm/dd/yy', $("#dtValidTill").datepicker('getDate')));
    formData2.append("Reminder1", $("#txtReminder1").val());
    formData2.append("Reminder1Condition", $("#ddlReminder1").find('option:selected').text());
    formData2.append("Reminder2", $("#txtReminder2").val());
    formData2.append("Reminder2Condition", $("#ddlReminder2").find('option:selected').text());
    formData2.append("Reminder3", $("#txtReminder3").val());
    formData2.append("Reminder3Condition", $("#ddlReminder3").find('option:selected').text());
    formData2.append("ContractArea", $("#txtContractAreaName").val());
    formData2.append("ContractAreaAdministrators", $("#txtContractAreaAdministrators").val());
    formData2.append("BusinessAreaOwners", $("#lblBusinessAreaOwners").text().trim());
    var arrSendReminderTo = $("#ddlDocRemindTo").val();
    var vSendReminderTo = '';
    $(arrSendReminderTo).each(function (i, item) {
        if (vSendReminderTo == '') {
            vSendReminderTo = item;
        }
        else {
            vSendReminderTo += "; " + item;
        }
    });
    formData2.append("SendReminderTo", vSendReminderTo);
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + DocumentID,
        type: 'PUT',
        data: formData2,
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken },
        processData: false,
        success: function (document) {
            //location = location;//"/Contracts/Documents";
            $("#loadingPage").fadeOut();
            reloadlistDocuments();
        }
    });
}

function documentstatuschange() {
    if ($("#ddlDocumentStatus").val() != 0 && $("#ddlDocumentStatus").val() == "Expired") {
        $("#dtValidFrom").val("");
        $("#dtValidTill").val("");
        if ($("#linkAddValidity").text() == "Track document expiration date") {
            $("#linkAddValidity").css('display', 'none');
        }
        else {
            $("#linkAddValidity").click();
            $("#linkAddValidity").css('display', 'none');
        }
    }
    else {
        $("#linkAddValidity").css('display', 'block');
    }
}

function SelectExistingCounterparty() {
    $('#dvCPExistingCounterparty').css("display", "");
    $('#dvCPAddCounterparty').css("display", "none");
    $('#chkCounterpartyNotInList').prop('checked', false);
}

function SelectAddCounterparty() {
    $('#dvCPExistingCounterparty').css("display", "none");
    $('#dvCPAddCounterparty').css("display", "");
    if (!$('#chkCounterpartyNotInList').prop('checked')) {
        $('#chkCounterpartyNotInList').trigger('click');
    }
}

$('#chkCounterpartyNotInList').click(function () {
    if ($("#chkCounterpartyNotInList").is(':checked')) {
        //if ($("#txtCounterpartyName").val() != "") {
        //    if ($("#txtCounterpartyName").val().trim() != "") {
        //        $('.CP_Det').css('display', '');
        //        $('.CP_Det1').css('display', '');
        //        $("#ddlCounterpartyType").addClass('validelement');
        //        $("#txtEmailID").addClass('validemail');
        //        getCounterpartyFields();

        //    }
        //    else {
        //        swal("", "Enter counterparty name.");
        //        $("#chkCounterpartyNotInList").prop('checked', false);
        //        $("#txtCounterpartyName").val("");
        //        $("#txtCounterpartyName").focus();
        //    }
        //} else {
        //    swal("", "Enter counterparty name.");
        //    $("#chkCounterpartyNotInList").prop('checked', false);
        //    $("#txtCounterpartyName").val("");
        //    $("#txtCounterpartyName").focus();
        //}
        if ($("#counterpartyDynamicItems li").length == 0) {
            $('.CP_Det').css('display', '');
            $('.CP_Det1').css('display', '');
            $("#txtCounterpartyName").addClass('validelement');
            $("#ddlCounterpartyType").addClass('validelement');
            $("#txtEmailID").addClass('validemail');
            getCounterpartyFields();
        }
    } else {
        $('.CP_Det').remove();
        $('.CP_Det1').css('display', 'none');
        $("#ddlCounterpartyType").removeClass('validelement');
        $("#txtEmailID").removeClass('validemail');
        $("#txtOwnerofBusinessArea").val('');
        $('input[type="radio"][name=IsGlobal][value="Yes"]').prop('checked', true);
        $("#trcp-RgBusi").hide();
        $("#txtOwnerofBusinessArea").removeClass("validelement");
    }
});

function getCounterpartyFields() {
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/primaryfields',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (metadataFields) {
            vCounterpartyFields = [];
            $(metadataFields).each(function (i, item) {
                if (item != null && item.FieldName != null) {
                    if ((item.FieldName == "CounterpartyName") || (item.FieldName == "CounterpartyType") || (item.FieldName == "Status")) {
                        if (item.FieldName == "CounterpartyType") {
                            vCounterpartyFields.push(item.FieldName);
                        }
                    }
                    else {
                        vCounterpartyFields.push(item.FieldName);
                        if (item.ShowInCreateForm == "true") {
                            var vControls = "";
                            var vDate = "";
                            var vNumber = "";
                            var vEmail = "";
                            var vMultiDDL = "";
                            var vUser = "";
                            var vUserList = "";
                            //manoj
                            var vCurrency = "";
                            var vNumberD = "";
                            var vNumberP = "";
                            var vNumberPD = "";
                            //manoj
                            if (item.Required == "true") {
                                vControls += '<li class="removableCounterpartyField CP_Det"><p><b>' + item.FieldDisplayName + '</b><small>*</small>';
                            } else {
                                vControls += '<li class="removableCounterpartyField CP_Det"><p><b>' + item.FieldDisplayName + '</b>';
                            }
                            if (item.FieldHelp == "true") {
                                vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                            }
                            vControls += '</p><div>';
                            if (item.FieldType == "Single Line Text") {
                                if (item.FieldName == "Country") {
                                    if (item.Required == "true") {
                                        vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "'  class='validelement'>";

                                    } else {
                                        vControls += "<select id=" + item.FieldName + "  name=" + item.FieldName + " title='" + item.FieldDisplayName + "'>";
                                    }
                                    vControls += "<option value='0'>--Select--</option>";
                                    $.ajax({
                                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/countrynames',
                                        type: 'GET',
                                        dataType: 'json',
                                        'Content-Type': 'application/json',
                                        cache: false,
                                        async: false,
                                        headers: { 'eContracts-ApiKey': localStorage.APIKey },
                                        success: function (data) {
                                            $(data).each(function (i, item) {
                                                vControls += '<option value="' + item + '">' + item + '</option>';
                                            });
                                        },
                                        error:
                                            function (data) {

                                            }
                                    });

                                    vControls += '</select>';
                                    vControls += '<label class="p-text">' + item.Description + '</label>';
                                } else {
                                    if (item.Required == "true") {
                                        vControls += "<input type='text' id=" + item.FieldName + " maxlength='100' name=" + item.FieldName + " class='validelement'>";
                                    } else {
                                        vControls += "<input type='text' id=" + item.FieldName + " maxlength='100' name=" + item.FieldName + ">";
                                    }
                                    vControls += '<label class="p-text">' + item.Description + '</label>';
                                }
                                vControls += '</div></li>';
                            }
                            else if (item.FieldType == "Multi Line Text") {
                                if (item.Required == "true") {
                                    vControls += "<textarea name=" + item.FieldName + " maxlength='300' id=" + item.FieldName + " title='" + item.FieldDisplayName + "' cols='25' rows='3' class=' validelement'></textarea>";
                                } else {
                                    vControls += "<textarea name=" + item.FieldName + " maxlength='300' id=" + item.FieldName + " title='" + item.FieldDisplayName + "' cols='25' rows='3'></textarea>";
                                }
                                vControls += '<label class="p-text">' + item.Description + '</label>';
                                vControls += '</div></li>';
                            }
                            else if (item.FieldType == "Hyperlink") {
                                //manoj
                                //for Hyperlink
                                var Hyperlinkvalue = item.DefaultURL;
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=CP" + item.FieldName + " maxlength='2083' name=" + item.FieldName + " placeholder='http://www.' value = '" + Hyperlinkvalue + "' class='validelement validwebsite'>";
                                } else {
                                    vControls += "<input type='text' id=CP" + item.FieldName + " maxlength='2083' name=" + item.FieldName + " placeholder='http://www.' value = '" + Hyperlinkvalue + "' class='validwebsite'>";
                                }
                                vControls += '<label  class="p-text">' + item.Description + '</label>';
                                vControls += '<br/>' + '<a href="javascript:void(0)" class="linkText" title="' + item.FieldDisplayName + '" onclick="navigateurl(\'CP' + item.FieldName + '\')"> Navigate</a>';
                                vControls += '</div></li>';
                                //for Hyperlink
                                //manoj
                            }
                            else if (item.FieldType == "Date") {

                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + " title='" + item.FieldDisplayName + "'  class='validelement validdate fielddatecontrol " + item.FieldName + "'/>";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + "  title='" + item.FieldDisplayName + "' class='validdate fielddatecontrol " + item.FieldName + "'/>";
                                }
                                vControls += '<br/>' + '<label class="p-text">' + item.Description + '</label>';
                                vControls += '</div></li>';

                                vDate = item.FieldName;
                            }
                            else if (item.FieldType == "Choice") {
                                if (item.Required == "true") {
                                    vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "'  class='validelement'>";

                                } else {
                                    vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "'>";
                                }
                                vControls += "<option value='0'>--Select--</option>";
                                var myArray = [];
                                myArray = item.ChoiceValues.split("\n")
                                var myArraylength = myArray.length;

                                for (var i = 0; i < myArraylength; i = i + 1) {
                                    do {
                                        myArray[i] = myArray[i].replace("&amp;", "&");
                                    } while (myArray[i].indexOf("&amp;") > -1)
                                    vControls += "<option value='" + myArray[i] + "'>" + myArray[i] + "</option>";
                                }

                                vControls += '</select>';
                                vControls += '<label class="p-text">' + item.Description + '</label>';
                                vControls += '</div></li>';
                            } else if (item.FieldType == "Lookup") {
                                if (item.FieldName == "RelatedCounterparties") {
                                    if (item.Required == "true") {
                                        vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement' readonly='readonly' type='text' />";
                                    } else {
                                        vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' readonly='readonly' type='text' />";
                                    }
                                    vControls += '<label class="p-text">' + item.Description + '</label>';
                                    vControls += "<br/>" + "<a href='javascript:void(0)' class='linkText' id='" + item.FieldDisplayName + "' title='" + item.FieldName + "' onclick='ViewCounterpartyRelated(this)'> Browse</a>";
                                    vControls += '</div></li>';
                                } else {
                                    if (item.Required == "true") {
                                        vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement'>";
                                    } else {
                                        vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "'>";
                                    }
                                    vControls += "<option value='0'>--Select--</option>";

                                    $.ajax({
                                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/customlookupvaluedetails?lookupname=' + item.ChoiceValues,
                                        type: 'GET',
                                        dataType: 'json',
                                        "Content-Type": "application/json",
                                        headers: { 'eContracts-ApiKey': localStorage.APIKey },
                                        cache: false,
                                        success: function (data) {
                                            var datalength1 = data.LookupFields.split(';');
                                            datalength1 = datalength1.sort();
                                            datalength1 = sortArrOfObjectsByParam(datalength1);
                                            var datalength = datalength1.length;
                                            for (var i = 0; i < datalength; i++) {
                                                var itemname = datalength1[i];
                                                $("#" + item.FieldName).append("<option value='" + itemname + "'>" + itemname + "</option>")
                                            }
                                        }
                                    });
                                    vControls += '<label class="p-text">' + item.Description + '</label>';
                                    vControls += '</div></li>';
                                }
                            }
                            else if (item.FieldType.indexOf("Dropdown") > -1 || item.FieldType.indexOf("Multi Select") > -1) {
                                if (item.Required == "true") {
                                    vControls += "<select id=" + item.FieldName + " multiple='multiple' class='width90 chosenmulti validuser' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
                                } else {
                                    vControls += "<select id=" + item.FieldName + " multiple='multiple' class='width90 chosenmulti' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
                                }
                                if (item.FieldType.indexOf("Dropdown") > -1) {
                                    var vMultiDDL1 = "";
                                    if (vMultiDDL1 == '') {
                                        var myArray = [];
                                        myArray = item.ChoiceValues.split("\n")
                                        var myArraylength = myArray.length;
                                        for (var i = 0; i < myArraylength; i = i + 1) {
                                            vMultiDDL1 += "<option value='" + myArray[i] + "'>" + myArray[i] + "</option>";
                                        }
                                    }
                                    vControls += vMultiDDL1;
                                } else {
                                    var vMultiDDL1 = "";
                                    if (vMultiDDL1 == '') {
                                        $.ajax({
                                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/customlookupvaluedetails?lookupname=' + item.ChoiceValues,
                                            type: 'GET',
                                            dataType: 'json',
                                            "Content-Type": "application/json",
                                            headers: { 'eContracts-ApiKey': localStorage.APIKey },
                                            cache: false,
                                            async: false,
                                            success: function (data) {
                                                var datalength1 = data.LookupFields.split(';');
                                                datalength1 = datalength1.sort();
                                                datalength1 = sortArrOfObjectsByParam(datalength1);
                                                var datalength = datalength1.length;
                                                for (var i = 0; i < datalength; i++) {
                                                    var itemname = datalength1[i];
                                                    vMultiDDL1 += "<option value='" + itemname + "'>" + itemname + "</option>";
                                                }
                                            }
                                        });
                                    }
                                    vControls += vMultiDDL1;
                                }

                                vControls += '</select>';
                                vControls += '<label class="p-text">' + item.Description + '</label>';
                                vControls += '</div></li>';
                                vMultiDDL = item.FieldName;
                            }
                            else if (item.FieldType == "Number") {
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement form_input' />";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form_input' />";
                                }

                                vControls += '<label class="p-text">' + item.Description + '</label>';
                                vControls += '</div></li>';
                                vNumber = item.FieldName;
                            }
                            else if (item.FieldType == "Number-D") {
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement form_input' />";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form_input' />";
                                }

                                vControls += '<label class="p-text">' + item.Description + '</label>';
                                vControls += '</div></li>';
                                vNumberD = item.FieldName;
                            }
                                //Percent
                            else if (item.FieldType == "Number-P") {
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement form_input' />";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form_input' />";
                                }
                                vControls += '<label class="margin-top-8 p-text" >' + '%' + '</label>';
                                vControls += '<label class="p-text">' + item.Description + '</label>';
                                vControls += '</div></li>';
                                vNumberP = item.FieldName;
                            }
                                //Decimal Percent
                            else if (item.FieldType == "Number-PD") {
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement form_input' />";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form_input' />";
                                }
                                vControls += '<label class="margin-top-8 p-text" >' + '%' + '</label>';
                                vControls += '<label class="p-text">' + item.Description + '</label>';
                                vControls += '</div></li>';
                                vNumberPD = item.FieldName;
                            }
                            else if (item.FieldType == "Yes/No") {

                                vControls += "	<div style='width: auto; margin-right: 15px;'><input style='float: left; width: auto;' type='radio' name=" + item.FieldName + " value='Yes'><span style='float: left; margin: 7px 0px 0px 5px;'>Yes </span></div>";
                                vControls += "	<div style='width: auto;'><input style='float: left; width: auto;' type='radio' name=" + item.FieldName + " checked value='No'><span style='float: left; margin: 7px 0px 0px 5px;'>No </span></div>";

                                vControls += '<label style="width:auto;margin:7px 0px 0px 5px;" class="col12 p-text text-left help">' + item.Description + '</label>';
                                vControls += '</div></li>';
                            } else if (item.FieldType == "Email") {
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validemail validelement' />";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validemail' />";
                                }
                                vControls += '<label class="p-text">' + item.Description + '</label>';
                                vControls += '</div></li>';
                            } else if (item.FieldType.indexOf("Browse") > -1) {
                                if (item.Required == "true") {
                                    vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement' readonly='readonly' type='text' />";
                                } else {
                                    vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' readonly='readonly' type='text' />";
                                }
                                vControls += '<label class="p-text">' + item.Description + '</label>';
                                vControls += "<br/>" + "<a href='javascript:void(0)' class='linkText' id='" + item.FieldDisplayName + "' title='" + item.FieldName + "' onclick='ViewGenericCounterparty(this)'> Browse</a>";
                                vControls += '</div></li>';
                            } else if (item.FieldType == "File Upload") {
                                if (item.Required == "true") {
                                    vControls += "<input type='file' id=" + item.FieldName + " name='docAttachment' title='" + item.FieldDisplayName + "' class='form-contro validelement browse-file-doc' onchange='javascript:changeinupload(this);' />";
                                } else {
                                    vControls += "<input type='file' id=" + item.FieldName + " name='docAttachment' title='" + item.FieldDisplayName + "' class='form-contro browse-file-doc' onchange='javascript:changeinupload(this);' />";
                                }
                                vControls += '<label class="p-text">' + item.Description + '</label>';
                                vControls += '</div></li>';
                            } else if (item.FieldType == "Currency" || item.FieldType == "Value / Financials") {
                                if (item.Required == "true") {
                                    //vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement' />";
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement validcontractvalue' />";
                                } else {
                                    //vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' />";
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validcontractvalue' />";
                                }
                                vControls += '<label class="p-text">' + item.Description + '</label>';
                                vControls += '</div></li>';
                                vCurrency = item.FieldName;
                            } else if (item.FieldType == "User") {
                                if (item.Required == "true") {
                                    vControls += "<select id=" + item.FieldName + " multiple='multiple' class='form-contro f_inpt width90 chosenmulti validuser' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
                                } else {
                                    vControls += "<select id=" + item.FieldName + " multiple='multiple' class='form-contro f_inpt width90 chosenmulti' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
                                }

                                if (vUserList == "")
                                { vUserList = GetUserList(); }
                                vControls += vUserList;
                                vControls += '</select>';
                                vControls += '<label class="p-text">' + item.Description + '</label>';
                                vUser = item.FieldName;
                                vControls += '</div></li>';
                            }

                            $("#counterpartyItems").append(vControls);
                            if (vDate != "") {

                                if (localStorage.AppDateFormat == null || localStorage.AppDateFormat == "" || localStorage.AppDateFormat == 'undefined') {
                                    $("#" + vDate + "").datepicker({
                                        changeMonth: true,
                                        changeYear: true
                                    });
                                }
                                else {
                                    var dateformate = localStorage.AppDateFormat.toLowerCase().slice(0, -2);

                                    $("#" + vDate + "").datepicker({
                                        changeMonth: true,
                                        changeYear: true,
                                        dateFormat: dateformate
                                    });

                                }
                                vDate = "";
                            }
                            if (vNumber != "") {
                                allowOnlyNumberInInputBox(vNumber);
                                vNumber == "";
                            }
                            if (vNumberD != "") {
                                allowOnlyDecimalNumberInInputBox(vNumberD);
                                vNumberD == "";
                            }
                            if (vNumberP != "") {
                                allowOnlyNumberInInputBox(vNumberP);
                                vNumberP == "";
                            }
                            if (vNumberPD != "") {
                                allowOnlyDecimalNumberInInputBox(vNumberPD);
                                vNumberPD == "";
                            }
                            if (vMultiDDL != "") {
                                $("#" + vMultiDDL + "").chosen().trigger("chosen:updated");
                                $('.chosenmulti').on('chosen:showing_dropdown', function (evt, params) {
                                    $('.result-selected').css('display', 'none');
                                });
                                vMultiDDL = "";
                            }

                            if (vUser != "") {
                                $("#" + vUser + "").chosen().trigger("chosen:updated");
                                $('.chosenmulti').on('chosen:showing_dropdown', function (evt, params) {
                                    $('.result-selected').css('display', 'none');
                                });
                                if (vUser == "ContractManagers") {
                                    if (localStorage.UserName != "") {
                                        GetValuesAndAutoPopulate("ContractManagers", localStorage.UserName);
                                    }
                                }
                                vUser = "";
                            }
                            //manoj
                            if (vCurrency != "") {
                                if (vCurrencyDisplayStyle == "UK") {
                                    $('#' + vCurrency).autoNumeric();
                                } else if (vCurrencyDisplayStyle == "CAN") {
                                    $('#' + vCurrency).autoNumeric({
                                        aSep: ' ',
                                        aDec: '.',
                                    });

                                } else if (vCurrencyDisplayStyle == "EU") {
                                    $('#' + vCurrency).autoNumeric({
                                        aSep: '.',
                                        aDec: ',',
                                    });
                                } else if (vCurrencyDisplayStyle == "IND") {
                                    $('#' + vCurrency).autoNumeric({
                                        dGroup: '2',
                                    });
                                }
                                vCurrency == "";
                            }
                            //manoj
                        }
                    }
                }
            });
            $("#loadingPage").fadeOut();
        },
        error: function (metadataFields) {
            vCounterpartyFields = [];
            $("#loadingPage").fadeOut();
        }

    });
}

var vSelectedCounterPartyId = "";
var vCounterpartyFields = [];

function AddCounterparty() {
    if ($('input[type="radio"][name=PickCounterparty]:checked').val() == 'Existing') {
        //manoj
        var arrselectedcunterparty = [];
        $.each($('#liSelectedCounterParty').children(), function () {
            if (typeof ($.trim(this)) != 'undefined' && $.trim(this) != null && $.trim(this.textContent) != "") {
                if (arrselectedcunterparty.indexOf($.trim(this.textContent)) == -1)
                    arrselectedcunterparty.push($.trim(this.textContent));
            }
        });
        if (arrselectedcunterparty.length > 0) {
            $("#" + txtbindcounetrparty).val(arrselectedcunterparty.join("; "));
            if (txtbindcounetrparty != "txtCounterpartyEdit" && txtbindcounetrparty != "txtCounterpartyCreate") {
                $("#txtCounterpartyCreate").val(arrselectedcunterparty.join("; "));
                $("#txtCounterpartyEdit").val(arrselectedcunterparty.join("; "));
            } else {
                $("#Counterparty").val(arrselectedcunterparty.join("; "));
            }
        } else {
            $("#" + txtbindcounetrparty).val('');
            if (txtbindcounetrparty != "txtCounterpartyEdit" && txtbindcounetrparty != "txtCounterpartyCreate") {
                $("#txtCounterpartyCreate").val('');
                $("#txtCounterpartyEdit").val('');
            } else {
                $("#Counterparty").val('');
            }
        }
        arrselectedcunterparty = [];
        //manoj
        $("#browseCounterparty").dialog("close");
        return true;
        // }
    }
    else {
        if (requiredValidator('addNewEntityFieldsTest',false)) {
            isformvalid = true;
            var entityid = $("#txtCounterpartyID").val();
            var AddressLine1 = $("#txtAddressLine1").val();

            if (AddressLine1 == null || AddressLine1 == '') {
                AddressLine1 = '';
            }
            if ($("#chkCounterpartyNotInList").is(':checked')) {
                $("#loadingPage").fadeIn();
                var strBusinessAreaOwnerof = "";
                if ($('input[type="radio"][name=IsGlobal]:checked').val() == "No") {
                    if ($("#txtOwnerofBusinessArea").val() != "") {
                        if ($("#txtOwnerofBusinessArea").val() != "") {
                            for (var i = 0; i < selectedBusinessAreaID11.length; i++) {

                                var rowKPath = jQuery.grep(BusinessAreaPathRowKey, function (a) {
                                    return a[1] === selectedBusinessAreaID11[i][1];
                                });
                                if (rowKPath != null && typeof (rowKPath) != "undefined" && rowKPath.length != 0)
                                    strBusinessAreaOwnerof += rowKPath[0][0] + "; ";
                            }

                            strBusinessAreaOwnerof = strBusinessAreaOwnerof.slice(0, -1)
                        }
                    } else {

                        strBusinessAreaOwnerof = "";
                    }
                }
                else {
                    $("#txtOwnerofBusinessArea").val('');
                    strBusinessAreaOwnerof = "";
                }
                var vTitle = $("#txtCounterpartyName").val();
                var counterpartyForm = $("#counterpartyForm *").serialize();
                counterpartyForm += "&AccountID=" + localStorage.AccountID;
                counterpartyForm += "&CreatedBy=" + localStorage.UserName;
                counterpartyForm += "&ModifiedBy=" + localStorage.UserName;
                counterpartyForm += "&BusinessAreasPath=" + encodeURIComponent(strBusinessAreaOwnerof);
                var cpresult = "&";
                $("#counterpartyForm .fielddatecontrol").each(function (index) {
                    if ($(this).attr('class').toLowerCase().indexOf("hasdatepicker") >= 0) {

                        var name = $(this).attr('class');
                        name = name.split("hasDatepicker")[0];
                        name = name.slice(0, -1);

                        name = name.substr(name.lastIndexOf(' ') + 1);
                        var value = $.datepicker.formatDate('mm/dd/yy', $(this).datepicker('getDate'));
                        cpresult = cpresult + name + "=" + value + "&";
                    }
                    else {
                        var name = $(this).attr('class').substr($(this).attr('class').lastIndexOf(' ') + 1);
                        var value = $.datepicker.formatDate('mm/dd/yy', $(this).datepicker('getDate'));
                        cpresult = cpresult + name + "=" + value + "&";
                    }
                });
                cpresult = cpresult.slice(0, -1)
                counterpartyForm += cpresult;

                var formData = new FormData();
                formData.append("AccountID", localStorage.AccountID);
                formData.append("SearializeControls", counterpartyForm);

                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/dynamicform',
                    type: 'POST',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        if (!$.isEmptyObject(arrRelatedCounterparities)) {
                            CreateRelatedCounterparies(data, $("#txtCounterpartyName").val())
                        }
                        var finalcounterpartyvaluetobind = (typeof ($('#' + txtbindcounetrparty).val()) != "undefined" && $('#' + txtbindcounetrparty).val() != null && $('#' + txtbindcounetrparty).val() != "") ? $('#' + txtbindcounetrparty).val() + '; ' + $("#txtCounterpartyName").val() : $("#txtCounterpartyName").val();
                        finalcounterpartyvaluetobind = (finalcounterpartyvaluetobind.trim().charAt(0) == ";") ? finalcounterpartyvaluetobind.trim().substr(1) : finalcounterpartyvaluetobind.trim();
                        (txtbindcounetrparty != null && txtbindcounetrparty != "") ? $('#' + txtbindcounetrparty).val(finalcounterpartyvaluetobind.trim()) : $('#txtCounterpartyCreate').val(finalcounterpartyvaluetobind.trim());
                        $('#' + txtbindcounetrparty).val(finalcounterpartyvaluetobind);
                        if (txtbindcounetrparty != "txtCounterpartyEdit" && txtbindcounetrparty != "txtCounterpartyCreate") {
                            $("#txtCounterpartyCreate").val(finalcounterpartyvaluetobind);
                            $("#txtCounterpartyEdit").val(finalcounterpartyvaluetobind);
                        } else {
                            $("#Counterparty").val(finalcounterpartyvaluetobind);
                        }
                        $('#chkCounterpartyNotInList').prop('checked', false);
                        $('#dvCPExistingCounterparty').css("display", "");
                        $('#dvCPAddCounterparty').css("display", "none");
                        $('#rdCPAddCounterparty').attr('checked', false);
                        $('#rdCPExistingCounterparty').attr('checked', true);

                        $('.CP_Det').remove();
                        $('.CP_Det1').css('display', 'none');
                        $("#ddlCounterpartyType").removeClass('validelement');
                        $("#txtEmailID").removeClass('validemail');
                        ClearAddCounterparty();
                        $("#browseCounterparty").dialog("close");
                        $("#loadingPage").fadeOut();
                    },
                    error: function (person) {
                        swal("", "Counterparty Name Exist");
                        $("#loadingPage").fadeOut();
                    }
                });

            } else {
                var duplicatecounteparty = false;
                if ($('#' + txtbindcounetrparty).val() != "") {
                    var arrselectedcounterpaty = ";" + $('#' + txtbindcounetrparty).val().replace("; ", ";") + ";"
                    if (arrselectedcounterpaty.toLowerCase().indexOf(";" + $("#txtCounterpartyName").val().trim().toLowerCase() + ";") > -1) {
                        duplicatecounteparty = true;
                    }
                }
                if (!duplicatecounteparty) {
                    $('#dvCPExistingCounterparty').css("display", "");
                    $('#dvCPAddCounterparty').css("display", "none");
                    $('#rdCPAddCounterparty').attr('checked', false);
                    $('#rdCPExistingCounterparty').attr('checked', true);
                    var finalcounterpartyvaluetobind = (typeof ($('#' + txtbindcounetrparty).val()) != "undefined" && $('#' + txtbindcounetrparty).val() != null && $('#' + txtbindcounetrparty).val() != "") ? $('#' + txtbindcounetrparty).val() + '; ' + $("#txtCounterpartyName").val() : $("#txtCounterpartyName").val();
                    finalcounterpartyvaluetobind = (finalcounterpartyvaluetobind.trim().charAt(0) == ";") ? finalcounterpartyvaluetobind.trim().substr(1) : finalcounterpartyvaluetobind.trim();
                    (txtbindcounetrparty != null && txtbindcounetrparty != "") ? $('#' + txtbindcounetrparty).val(finalcounterpartyvaluetobind.trim()) : $('#txtCounterpartyCreate').val(finalcounterpartyvaluetobind.trim());
                    $('#' + txtbindcounetrparty).val(finalcounterpartyvaluetobind);
                    if (txtbindcounetrparty != "txtCounterpartyEdit" && txtbindcounetrparty != "txtCounterpartyCreate") {
                        $("#txtCounterpartyCreate").val(finalcounterpartyvaluetobind);
                        $("#txtCounterpartyEdit").val(finalcounterpartyvaluetobind);
                    } else {
                        $("#Counterparty").val(finalcounterpartyvaluetobind);
                    }
                    ClearAddCounterparty();
                    $("#browseCounterparty").dialog("close");
                    $("#loadingPage").fadeOut();
                } else {
                    swal("", "Counterparty Name Exist");
                }
            }
        }
    }
}

function ClearAddCounterparty() {
    $("#txtSearchBox").val("");
    $("#txtCounterpartyID").val("");
    $("#txtCounterpartyName").val("");
    $('#ddlCounterpartyType').val('0');
    $("#txtOwnerofBusinessArea").val('');
    $('input[type="radio"][name=IsGlobal][value="Yes"]').prop('checked', true);
    $("#trcp-RgBusi").hide();
    $("#txtOwnerofBusinessArea").removeClass("validelement");
    $("#txtAddressLine1").val("");
    $("#txtAddressLine2").val("");
    $("#txtCity").val("");
    $("#txtState").val("");
    $("#txtZip").val("");
    $('#ddlCountry').val('0');
    $("#txtContactNo").val("");
    $("#txtEmailID").val("");
    $("#ddlStatus").val("Active");
    $("#chkCounterpartyNotInList").attr("checked", false);
    $('.CP_Det').css('display', 'none');
    $('.CP_Det1').css('display', 'none');
    $("#ddlCounterpartyType").removeClass('validelement');
    $("#txtEmailID").removeClass('validemail');
    $(".validelement").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });
}

function BindCounterpartyType() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterpartytypes',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $(data).each(function (i, item) {
                //var find = " ";
                //var re = new RegExp(find, 'g');

                //var str = item.TypeName.replace(re, '');
                $("#ddlCounterpartyType").append('<option value="' + item.TypeName + '">' + item.TypeName + '</option>');
            });
        },
        error:
            function (data) {
            }
    });
}

//Create Counterparty Browse Related Contract Start
function ViewCounterpartyRelated(obj) {
    var baname = "";
    //if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
    //    baname = encodeURIComponent(localStorage.GlobalBusinessAreaLocation);
    //}
    vGlobalObjForGeneric = obj;
    $("#lblRelatedPopup_Counterparties").text("Select Relationship for " + $("#txtCounterpartyName").val())
    $("#loadingPage").fadeIn();
    $('#loadCounterparties').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    $('#tblPopupCounterparties').empty();
    $("#txtSearchBoxCounterparties").val("");
    if ($('#tblPopupCounterparties tr').length <= 0) {
        var relatedCounterpartiesTag = [];
        $("#txtSearchBoxCounterparties").val("");
        var arrcounterpartyIDarry = [];
        var arrcounterpartyNamearry = [];
        var arrcounterpartyRelationshipTypearr = [];
        //manoj
        var strBusinessAreaOwnerof = "";
        if ($('input[type="radio"][name=IsGlobal]:checked').val() == "No") {
            if ($("#txtOwnerofBusinessArea").val() != "") {
                if ($("#txtOwnerofBusinessArea").val() != "") {
                    for (var i = 0; i < selectedBusinessAreaID11.length; i++) {

                        var rowKPath = jQuery.grep(BusinessAreaPathRowKey, function (a) {
                            return a[1] === selectedBusinessAreaID11[i][1];
                        });
                        if (rowKPath != null && typeof (rowKPath) != "undefined" && rowKPath.length != 0)
                            strBusinessAreaOwnerof += rowKPath[0][0] + "; ";
                    }

                    strBusinessAreaOwnerof = strBusinessAreaOwnerof.slice(0, -1)
                }
            } else {

                strBusinessAreaOwnerof = "";
            }
        }
        else {
            $("#txtOwnerofBusinessArea").val('');
            strBusinessAreaOwnerof = "";
        }
        //manoj
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/relatedcounterpartypicker',
            type: 'GET',
            dataType: 'json',
            "Content-Type": "application/json",
            headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, BusinessAreaLocation: strBusinessAreaOwnerof },
            cache: false,
            success: function (data) {
                $('#loadCounterparties').empty();
                $("#hdnRelatedCounterparties").append(getParameterByName("ContractID"))
                arr = [];
                counterpartyTags = [];
                //manoj
                curRelatedCounterparities = PrvRelatedCounterparities.slice();
                //manoj
                var prevSelected = $("#RelatedCounterparties").val();
                $.each(prevSelected.split(";"), function () {
                    arr.push($.trim(this));
                });
                var vCounterpartyList = '';
                $(data).each(function (i, item) {
                    if ($("#txtCounterpartyID").val().indexOf(item.RowKey) > -1) {
                    }
                    else {
                        if (arr.length > 0) {
                            if (arrRelatedCounterparities.length > 0) {
                                $.each(arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelatedCounterpartyID.split(";"), function () {
                                    arrcounterpartyIDarry.push($.trim(this));
                                });
                                $.each(arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelatedCounterpartyTitle.split(";"), function () {
                                    arrcounterpartyNamearry.push($.trim(this));
                                });
                                $.each(arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelatedRelationshipType.split(";"), function () {
                                    arrcounterpartyRelationshipTypearr.push($.trim(this));
                                });
                                if (arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RootRelationshipType != "") {
                                    //$("#ddlRelationshipTypeCounterparties").val(arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RootRelationshipType);
                                    //manoj
                                    $("#ddlRelationshipTypeCounterparties option:selected").text(arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RootRelationshipType);
                                    //manoj
                                }
                                if (arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelationshipType != "") {
                                    $("#ddlRelationshipTypeParentcounterparties").val(arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelationshipType);
                                }
                            }
                        }
                        if (arr.indexOf(item.CounterpartyName.trim()) >= 0) {
                            var article = '<tr><td>';
                            article += '<input id="rel' + item.RowKey + '" type="checkbox" name="RelatedCounterparty" checked class="css1-checkbox" value="' + escape(item.CounterpartyName) + '" onchange="javascript:currentrelatedcounterparty(this);" />';
                            article += '<label for="' + item.RowKey + '" class="css1-label">' + item.CounterpartyName + '</label>';
                            article += '</td>';
                            article += '<td class="ddl"><select class="f_inpt width90">';
                            var jsLang = $("#ddlRelationshipTypeParentcounterparties option:selected").val();
                            switch (jsLang) {
                                case 'Parent':
                                    article += '<option value="Subsidiary" selected>Subsidiary</option>';
                                    break;
                                case 'Subsidiary':
                                    article += '<option value="Parent" selected>Parent</option>';
                                    break;
                                case 'Supplier':
                                    article += '<option value="Customer" selected>Customer</option>';
                                    break;
                                case 'Customer':
                                    article += '<option value="Supplier" selected>Supplier</option>';
                                    break;
                                case 'Prime Contractor':
                                    article += '<option value="Sub Contractor" selected>Sub Contractor</option>';
                                    break;
                                case 'Sub Contractor':
                                    article += '<option value="Prime Contractor" selected>Prime Contractor</option>';
                                    break;
                                case 'Dissolved on Merger':
                                    article += '<option value="Merged into" selected>Merged into</option>';
                                    break;
                                case 'Merged into':
                                    article += '<option value="Dissolved on Merger" selected>Dissolved on Merger</option>';
                                    break;
                                case 'Other':
                                    article += '<option value="Other" selected>Other</option>';
                                    break;
                            }
                            article += '</select><td></tr>'
                            //$("#tblPopupCounterparties").append(article);
                            vCounterpartyList += article;
                            relatedCounterpartiesTag.push(item.CounterpartyName);
                        } else {
                            var article = '<tr><td>';
                            article += '<input id="rel' + item.RowKey + '" type="checkbox" name="RelatedCounterparty" class="css1-checkbox" value="' + escape(item.CounterpartyName) + '" onchange="javascript:currentrelatedcounterparty(this);" />';
                            article += '<label for="' + item.RowKey + '" class="css1-label">' + item.CounterpartyName + '</label>';
                            article += '</td>';
                            article += '<td class="ddl"><td></tr>'
                            //$("#tblPopupCounterparties").append(article);
                            vCounterpartyList += article;
                            relatedCounterpartiesTag.push(item.CounterpartyName);
                        }

                        //$("#rel" + item.RowKey).click(function () {
                        //$("input[id='rel" + item.RowKey + "'][name='RelatedCounterparty']:checkbox").click(function () {
                        //    if (this.checked) {
                        //        if ($(this).parent().parent().children(".ddl").find('option').length == 0) {
                        //            var vOptions = "<select class='f_inpt width90'>";
                        //            var jsLang = $("#ddlRelationshipTypeParentcounterparties option:selected").val();
                        //            switch (jsLang) {
                        //                case 'Parent':
                        //                    vOptions += '<option value="Subsidiary">Subsidiary</option>';
                        //                    break;
                        //                case 'Subsidiary':
                        //                    vOptions += '<option value="Parent">Parent</option>';
                        //                    break;
                        //                case 'Supplier':
                        //                    vOptions += '<option value="Customer">Customer</option>';
                        //                    break;
                        //                case 'Customer':
                        //                    vOptions += '<option value="Supplier">Supplier</option>';
                        //                    break;
                        //                case 'Prime Contractor':
                        //                    vOptions += '<option value="Sub Contractor">Sub Contractor</option>';
                        //                    break;
                        //                case 'Sub Contractor':
                        //                    vOptions += '<option value="Prime Contractor">Prime Contractor</option>';
                        //                    break;
                        //                case 'Dissolved on Merger':
                        //                    vOptions += '<option value="Merged into">Merged into</option>';
                        //                    break;
                        //                case 'Merged into':
                        //                    vOptions += '<option value="Dissolved on Merger">Dissolved on Merger</option>';
                        //                    break;
                        //                case 'Other':
                        //                    vOptions += '<option value="Other">Other</option>';
                        //                    break;
                        //            }

                        //            vOptions += '</select>';
                        //            $(this).parent().parent().children(".ddl").append(vOptions);

                        //        }
                        //    } else {
                        //        $(this).parent().parent().children(".ddl").empty();
                        //    }

                        //});
                    }
                });

                $("#tblPopupCounterparties").append(vCounterpartyList);
                $("input[id^='rel'][name='RelatedCounterparty']:checkbox").click(function () {
                    if (this.checked) {
                        if ($(this).parent().parent().children(".ddl").find('option').length == 0) {
                            var vOptions = "<select class='f_inpt width90'>";
                            var jsLang = $("#ddlRelationshipTypeParentcounterparties option:selected").val();
                            switch (jsLang) {
                                case 'Parent':
                                    vOptions += '<option value="Subsidiary">Subsidiary</option>';
                                    break;
                                case 'Subsidiary':
                                    vOptions += '<option value="Parent">Parent</option>';
                                    break;
                                case 'Supplier':
                                    vOptions += '<option value="Customer">Customer</option>';
                                    break;
                                case 'Customer':
                                    vOptions += '<option value="Supplier">Supplier</option>';
                                    break;
                                case 'Prime Contractor':
                                    vOptions += '<option value="Sub Contractor">Sub Contractor</option>';
                                    break;
                                case 'Sub Contractor':
                                    vOptions += '<option value="Prime Contractor">Prime Contractor</option>';
                                    break;
                                case 'Dissolved on Merger':
                                    vOptions += '<option value="Merged into">Merged into</option>';
                                    break;
                                case 'Merged into':
                                    vOptions += '<option value="Dissolved on Merger">Dissolved on Merger</option>';
                                    break;
                                case 'Other':
                                    vOptions += '<option value="Other">Other</option>';
                                    break;
                            }

                            vOptions += '</select>';
                            $(this).parent().parent().children(".ddl").append(vOptions);

                        }
                    } else {
                        $(this).parent().parent().children(".ddl").empty();
                    }

                });

                var vCount = $("#tblPopupCounterparties tr").length;
                if (vCount != 0) {
                    $('#compact-paginationRelatedCounterparties').pagination({
                        items: vCount,
                        itemsOnPage: 10,
                        currentPage: 1,
                        cssStyle: 'compact-theme',
                        type: 'tdbody',
                        row: 'tr',
                        typeID: 'tblPopupCounterparties'
                        //items: vCount,
                        //itemsOnPage: 10,
                        //typeID: 'tblPopupCounterparties',
                        //row: 'tr',
                        //cssStyle: 'compact-theme'
                    });
                } else {
                    $('#loadCounterparties').html('<p style="margin-left: 20px;">No items found.</p>')
                }

                $("#txtSearchBoxCounterparties").autocomplete({
                    source: relatedCounterpartiesTag,
                    minLength: 2,
                    focus: function (event, ui) {
                        return false;
                    },
                    select: function (evn, uidetails) {
                        $("#txtSearchBoxCounterparties").val(uidetails.item.label);
                        ViewCounterparties();
                    }
                });
                addselectedcounterparties();
                $("#popupCounterparties").dialog("option", "title", "Related Counterparties");
                $("#popupCounterparties").dialog("open");
                $("#loadingPage").fadeOut();
            },
            error: function () {
                addselectedcounterparties();
                $('#loadMA').empty();
                $('#loadCounterparties').html('No items found');
                $("#tblPopupCounterparties").html('');
                $("#popupCounterparties").dialog("option", "title", "Related Counterparties");
                $("#popupCounterparties").dialog("open");
                $("#loadingPage").fadeOut();
            }
        });
    } else {
        addselectedcounterparties();
        $('#loadMA').empty();
        $("#popupCounterparties").dialog("option", "title", "Related Contract Record(s)");
        $("#popupCounterparties").dialog("open");
        $("#loadingPage").fadeOut();
    }
}

function RelatedCounterpartiesPush() {
    if (requiredValidator('popupCounterparties', false)) {
        var vRelatedCounterpartyID = "";
        var vRelatedCounterpartyTitle = "";
        var vChildRelation = "";
        //manoj
        $(curRelatedCounterparities).each(function (i, item) {
            if (item != null) {
                vRelatedCounterpartyID += ";" + item.RowKey;
                vRelatedCounterpartyTitle += ";" + item.CounterpartyName;
                vChildRelation += ";" + item.ChildRelationship;
            }
        });
        vRelatedCounterpartyID = (vRelatedCounterpartyID.charAt(0) === ';') ? vRelatedCounterpartyID.substr(1) : vRelatedCounterpartyID;
        vRelatedCounterpartyTitle = (vRelatedCounterpartyTitle.charAt(0) === ';') ? vRelatedCounterpartyTitle.substr(1) : vRelatedCounterpartyTitle;
        vChildRelation = (vChildRelation.charAt(0) === ';') ? vChildRelation.substr(1) : vChildRelation;
        //manoj
        //$('input:checkbox[name="RelatedCounterparty"]:checked').each(function () {
        //    if (vRelatedCounterpartyID == "") {
        //        vRelatedCounterpartyID = this.id.replace("rel", "").trim();
        //        vRelatedCounterpartyTitle = unescape(this.value);
        //        vChildRelation = $(this).parent().parent().children(".ddl").find('option:selected').text();

        //    }
        //    else {
        //        vRelatedCounterpartyID += "; " + this.id.replace("rel", "").trim();
        //        vRelatedCounterpartyTitle += "; " + unescape(this.value);
        //        vChildRelation += "; " + $(this).parent().parent().children(".ddl").find('option:selected').text();
        //    }
        //});
        if (vRelatedCounterpartyID != "") {
            arrRelatedCounterparities = [];
            arrRelatedCounterparities.push({
                CounterpartyID: $("#txtCounterpartyID").val(),
                CounterpartyTitle: $("#txtCounterpartyName").val(),
                RelatedCounterpartyID: vRelatedCounterpartyID,
                RelatedCounterpartyTitle: vRelatedCounterpartyTitle,
                RelationshipType: $("#ddlRelationshipTypeParentcounterparties").find('option:selected').text(),
                RootRelationshipType: $("#ddlRelationshipTypeCounterparties").find('option:selected').text(),
                RelatedRelationshipType: vChildRelation,
                CreatedBy: localStorage.UserName,
                ModifiedBy: localStorage.UserName,
            });
            PrvRelatedCounterparities = curRelatedCounterparities.slice();
            $("#popupCounterparties").dialog("close");
            $('#RelatedCounterparties').val(vRelatedCounterpartyTitle);
            return true;
        } else {
            PrvRelatedCounterparities = [];
            arrRelatedCounterparities = [];
            curRelatedCounterparities = [];
            $('#RelatedCounterparties').val("");
            swal("", "No Counterparty has been selected.");
            $("#popupCounterparties").dialog("close");
            return false;
        }
    }
}

function CreateRelatedCounterparies(conterpartyid, counterpartyname) {
    //manoj
    //Remove "rel" in Counterparty ID
    var RelCountID = arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelatedCounterpartyID;
    RelCountID = $.trim(RelCountID);
    var liRelCountID = "";
    $.each(RelCountID.split(";"), function (iRelCountID, itemnameRelCountID) {
        liRelCountID += ";" + itemnameRelCountID.replace("rel", "");
    });
    arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelatedCounterpartyID = (liRelCountID.charAt(0) === ';') ? liRelCountID.substr(1) : liRelCountID;
    //Remove "rel" in Counterparty ID
    //manoj
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/' + conterpartyid.trim() + '/relatedcounterparties',
        type: 'POST',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        data: {
            CounterpartyID: conterpartyid,
            CounterpartyTitle: counterpartyname,
            RelatedCounterpartyID: arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelatedCounterpartyID,
            RelatedCounterpartyTitle: arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelatedCounterpartyTitle,
            RelationshipType: arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelationshipType,
            RelatedRelationshipType: arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelatedRelationshipType,
            RootRelationshipType: arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RootRelationshipType,
            CreatedBy: localStorage.UserName,
            ModifiedBy: localStorage.UserName,
        },
        cache: false,
        success: function (person) {
            PrvRelatedCounterparities = [];
            arrRelatedCounterparities = [];
            curRelatedCounterparities = [];
        },
        error: function (request) {
            PrvRelatedCounterparities = [];
            arrRelatedCounterparities = [];
            curRelatedCounterparities = [];
        }
    });
}

function ViewCounterparties() {
    var sdsadfaf = $("#txtSearchBoxCounterparties").val();
    var baname = "";
    //if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
    //    baname = encodeURIComponent(localStorage.GlobalBusinessAreaLocation);
    //}
    $("#tblPopupCounterparties").html('');
    if ($.trim($("#txtSearchBoxCounterparties").val()) != "") {
        $('#loadCounterparties').html('<img src="../Content/Images/icon/loading.gif"> Searching...');
    } else {
        $('#loadCounterparties').html('<img src="../Content/Images/icon/loading.gif">');
    }
    var arrcounterpartyIDarry = [];
    var arrcounterpartyNamearry = [];
    var arrcounterpartyRelationshipTypearr = [];
    var relatedCounterpartiesTag = [];
    //manoj
    var strBusinessAreaOwnerof = "";
    if ($('input[type="radio"][name=IsGlobal]:checked').val() == "No") {
        if ($("#txtOwnerofBusinessArea").val() != "") {
            if ($("#txtOwnerofBusinessArea").val() != "") {
                for (var i = 0; i < selectedBusinessAreaID11.length; i++) {

                    var rowKPath = jQuery.grep(BusinessAreaPathRowKey, function (a) {
                        return a[1] === selectedBusinessAreaID11[i][1];
                    });
                    if (rowKPath != null && typeof (rowKPath) != "undefined" && rowKPath.length != 0)
                        strBusinessAreaOwnerof += rowKPath[0][0] + "; ";
                }

                strBusinessAreaOwnerof = strBusinessAreaOwnerof.slice(0, -1)
            }
        } else {

            strBusinessAreaOwnerof = "";
        }
    }
    else {
        $("#txtOwnerofBusinessArea").val('');
        strBusinessAreaOwnerof = "";
    }
    //manoj
    var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/relatedcounterpartypicker?searchkeyword=' + encodeURIComponent($("#txtSearchBoxCounterparties").val()) + '&customquery=&sortbyfield=Timestamp&orderby=DESC';
    $.ajax({
        url: vURL,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey, BusinessAreaLocation: strBusinessAreaOwnerof },
        cache: false,
        success: function (data) {
            $("#tblPopupCounterparties").html('');
            var datalenght = data.length;
            counterpartyTags = [];
            //manoj
            var prevSelected = [];
            $.each(curRelatedCounterparities, function (ipvr, itempvr) {
                prevSelected.push($.trim(itempvr.CounterpartyName));
            });
            arr = prevSelected;
            //manoj
            //var prevSelected = $("#RelatedCounterparties").val();
            //$.each(prevSelected.split(";"), function () {
            //    arr.push($.trim(this));
            //});
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                if ($("#txtCounterpartyID").val().indexOf(item.RowKey) > -1) { }
                else {

                    //if (arr.length > 0) {
                    //    if (arrRelatedCounterparities.length > 0) {
                    //        $.each(arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelatedCounterpartyID.split(";"), function () {
                    //            arrcounterpartyIDarry.push($.trim(this));
                    //        });
                    //        $.each(arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelatedCounterpartyTitle.split(";"), function () {
                    //            arrcounterpartyNamearry.push($.trim(this));
                    //        });
                    //        $.each(arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelatedRelationshipType.split(";"), function () {
                    //            arrcounterpartyRelationshipTypearr.push($.trim(this));
                    //        });
                    //        if (arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RootRelationshipType != "") {
                    //            $("#ddlRelationshipTypeCounterparties").val(arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RootRelationshipType);
                    //        }
                    //        if (arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelationshipType != "") {
                    //            $("#ddlRelationshipTypeParentcounterparties").val(arrRelatedCounterparities[arrRelatedCounterparities.length - 1].RelationshipType);
                    //        }
                    //    }
                    //}
                    if (arr.indexOf(item.CounterpartyName.trim()) >= 0) {
                        var article = '<tr><td>';
                        article += '<input id="rel' + item.RowKey + '" type="checkbox" name="RelatedCounterparty" checked class="css1-checkbox" value="' + escape(item.CounterpartyName) + '" onchange="javascript:currentrelatedcounterparty(this);" />';
                        article += '<label for="' + item.RowKey + '" class="css1-label">' + item.CounterpartyName + '</label>';
                        article += '</td>';
                        article += '<td class="ddl"><select class="f_inpt width90">';
                        var jsLang = $("#ddlRelationshipTypeParentcounterparties option:selected").val();
                        switch (jsLang) {
                            case 'Parent':
                                article += '<option value="Subsidiary" selected>Subsidiary</option>';
                                break;
                            case 'Subsidiary':
                                article += '<option value="Parent" selected>Parent</option>';
                                break;
                            case 'Supplier':
                                article += '<option value="Customer" selected>Customer</option>';
                                break;
                            case 'Customer':
                                article += '<option value="Supplier" selected>Supplier</option>';
                                break;
                            case 'Prime Contractor':
                                article += '<option value="Sub Contractor" selected>Sub Contractor</option>';
                                break;
                            case 'Sub Contractor':
                                article += '<option value="Prime Contractor" selected>Prime Contractor</option>';
                                break;
                            case 'Dissolved on Merger':
                                article += '<option value="Merged into" selected>Merged into</option>';
                                break;
                            case 'Merged into':
                                article += '<option value="Dissolved on Merger" selected>Dissolved on Merger</option>';
                                break;
                            case 'Other':
                                article += '<option value="Other" selected>Other</option>';
                                break;
                        }
                        article += '</select><td></tr>'
                        $("#tblPopupCounterparties").append(article);
                        relatedCounterpartiesTag.push(item.CounterpartyName);
                    }
                    else {
                        var article = '<tr><td>';
                        article += '<input id="rel' + item.RowKey + '" type="checkbox" name="RelatedCounterparty" class="css1-checkbox" value="' + escape(item.CounterpartyName) + '" onchange="javascript:currentrelatedcounterparty(this);" />';
                        article += '<label for="' + item.RowKey + '" class="css1-label">' + item.CounterpartyName + '</label>';
                        article += '</td>';
                        article += '<td class="ddl"><td></tr>'
                        $("#tblPopupCounterparties").append(article);
                    }

                    //$("#rel" + item.RowKey).click(function () {
                    $("input[id='rel" + item.RowKey + "'][name='RelatedCounterparty']:checkbox").click(function () {
                        if (this.checked) {
                            if ($(this).parent().parent().children(".ddl").find('option').length == 0) {
                                var vOptions = "<select class='f_inpt width90'>";
                                var jsLang = $("#ddlRelationshipTypeParentcounterparties option:selected").val();
                                switch (jsLang) {
                                    case 'Parent':
                                        vOptions += '<option value="Subsidiary">Subsidiary</option>';
                                        break;
                                    case 'Subsidiary':
                                        vOptions += '<option value="Parent">Parent</option>';
                                        break;
                                    case 'Supplier':
                                        vOptions += '<option value="Customer">Customer</option>';
                                        break;
                                    case 'Customer':
                                        vOptions += '<option value="Supplier">Supplier</option>';
                                        break;
                                    case 'Prime Contractor':
                                        vOptions += '<option value="Sub Contractor">Sub Contractor</option>';
                                        break;
                                    case 'Sub Contractor':
                                        vOptions += '<option value="Prime Contractor">Prime Contractor</option>';
                                        break;
                                    case 'Dissolved on Merger':
                                        vOptions += '<option value="Merged into">Merged into</option>';
                                        break;
                                    case 'Merged into':
                                        vOptions += '<option value="Dissolved on Merger">Dissolved on Merger</option>';
                                        break;
                                    case 'Other':
                                        vOptions += '<option value="Other">Other</option>';
                                        break;
                                }

                                vOptions += '</select>';
                                $(this).parent().parent().children(".ddl").append(vOptions);

                            }
                        } else {

                            $(this).parent().parent().children(".ddl").empty();
                        }

                    });
                }
            }
            var vCount = $("#tblPopupCounterparties tr").length;
            if (vCount != 0) {
                $('#loadCounterparties').html('');
                $('#compact-paginationRelatedCounterparties').css('display', '');
                $('#compact-paginationRelatedCounterparties').pagination({
                    items: vCount,
                    itemsOnPage: 10,
                    currentPage: 1,
                    cssStyle: 'compact-theme',
                    type: 'tdbody',
                    row: 'tr',
                    typeID: 'tblPopupCounterparties'
                    //items: vCount,
                    //itemsOnPage: 10,
                    //typeID: 'tblPopupCounterparties',
                    //row: 'tr',
                    //cssStyle: 'compact-theme'
                });
            } else {
                $('#loadCounterparties').html('<p style="margin-left: 20px;">No items found.</p>');
                $('#compact-paginationRelatedCounterparties').css('display', 'none');
            }
        },
        error: function () {
            $('#loadCounterparties').html('<p style="margin-left: 20px;">No items found.</p>');
            $('#compact-paginationRelatedCounterparties').css('display', 'none');
        }
    });
}

function liRemoveRelationshipcounterparty(obj) {
    var child = obj.parentNode;
    var relatedcounterpartyidtodelete = child.id;
    var relatedcounterpartyname = child.textContent;
    swal({
        title: '',
        text: "Are you sure to delete '<span style=\"font-weight:700\">" + relatedcounterpartyname + "</span>'?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        html: true
    },
     function (confirmed) {
         if (confirmed) {
             child.parentNode.removeChild(child);
             var relatedcounterpartyid = child.id;
             document.getElementById("rel" + relatedcounterpartyidtodelete).disabled = false;
             var relatedtextboxval = $("#RelatedCounterparties").val();
             if (relatedcounterpartyname.indexOf('(') > -1) {
                 var nlst = relatedcounterpartyname.lastIndexOf("(");
                 relatedcounterpartyname = relatedcounterpartyname.substr(0, nlst);
                 relatedtextboxval = relatedtextboxval.replace(relatedcounterpartyname.trim(), "");
                 relatedtextboxval = relatedtextboxval.replace(";;", ";");
                 var n = relatedtextboxval.charAt(0);
                 if (n == ";") {
                     relatedtextboxval = relatedtextboxval.substr(1, relatedtextboxval.length - 1);
                 }
                 n = relatedtextboxval.charAt(relatedtextboxval.length - 1);
                 if (n == ";") {
                     relatedtextboxval = relatedtextboxval.substr(0, relatedtextboxval.length - 1);
                 }
                 if (relatedtextboxval != "") {
                     $("#RelatedCounterparties").val(relatedtextboxval.trim());
                 }
                 else {
                     $("#RelatedCounterparties").val(relatedtextboxval);
                 }
             }
         }
         return;
     });
}

$("#ddlRelationshipTypeCounterparties").change(function () {
    $("#ddlRelationshipTypeParentcounterparties").empty();

    var jsLang = this.value;
    switch (jsLang) {
        case 'Parent':
            $("#ddlRelationshipTypeParentcounterparties").append("<option value='Parent'>Parent</option>");
            $("#ddlRelationshipTypeParentcounterparties").append("<option value='Subsidiary'>Subsidiary</option>");
            break;
        case 'Supplier':
            $("#ddlRelationshipTypeParentcounterparties").append("<option value='Supplier'>Supplier</option>");
            $("#ddlRelationshipTypeParentcounterparties").append("<option value='Customer'>Customer</option>");
            break;
        case 'Prime Contractor':
            $("#ddlRelationshipTypeParentcounterparties").append("<option value='Prime Contractor'>Prime Contractor</option>");
            $("#ddlRelationshipTypeParentcounterparties").append("<option value='Sub Contractor'>Sub Contractor</option>");
            break;
        case 'Dissolved on Merger':
            $("#ddlRelationshipTypeParentcounterparties").append("<option value='Dissolved on Merger'>Dissolved on Merger</option>");
            $("#ddlRelationshipTypeParentcounterparties").append("<option value='Merged into'>Merged into</option>");
            break;
        case 'Other':
            $("#ddlRelationshipTypeParentcounterparties").append("<option value='Other'>Other</option>");
            break;
    }
    var Action = 0;
    $('input:checkbox[name="RelatedCounterparty"]:checked').each(function () {
        $(this).parent().parent().children(".ddl").empty();
        var vOptions = "<select class='f_inpt width90'>";
        var jsLang = $("#ddlRelationshipTypeParentcounterparties option:selected").val();
        switch (jsLang) {
            case 'Parent':
                vOptions += '<option value="Subsidiary">Subsidiary</option>';
                break;
            case 'Subsidiary':
                vOptions += '<option value="Parent">Parent</option>';
                break;
            case 'Supplier':
                vOptions += '<option value="Customer">Customer</option>';
                break;
            case 'Customer':
                vOptions += '<option value="Supplier">Supplier</option>';
                break;
            case 'Prime Contractor':
                vOptions += '<option value="Sub Contractor">Sub Contractor</option>';
                break;
            case 'Sub Contractor':
                vOptions += '<option value="Prime Contractor">Prime Contractor</option>';
                break;
            case 'Dissolved on Merger':
                vOptions += '<option value="Merged into">Merged into</option>';
                break;
            case 'Merged into':
                vOptions += '<option value="Dissolved on Merger">Dissolved on Merger</option>';
                break;
            case 'Other':
                vOptions += '<option value="Other">Other</option>';
                break;
        }

        vOptions += '</select>';
        $(this).parent().parent().children(".ddl").append(vOptions);
        if (Action == 0) {
            changecounterpartychildrelationship($(this).parent().parent().children(".ddl").find('option:selected').text());
            Action = 1;
        }
    });
});

$("#ddlRelationshipTypeParentcounterparties").change(function () {
    var Action = 0;
    $('input:checkbox[name="RelatedCounterparty"]:checked').each(function () {
        $(this).parent().parent().children(".ddl").empty();
        var vOptions = "<select class='f_inpt width90'>";
        var jsLang = $("#ddlRelationshipTypeParentcounterparties option:selected").val();
        switch (jsLang) {
            case 'Parent':
                vOptions += '<option value="Subsidiary">Subsidiary</option>';
                break;
            case 'Subsidiary':
                vOptions += '<option value="Parent">Parent</option>';
                break;
            case 'Supplier':
                vOptions += '<option value="Customer">Customer</option>';
                break;
            case 'Customer':
                vOptions += '<option value="Supplier">Supplier</option>';
                break;
            case 'Prime Contractor':
                vOptions += '<option value="Sub Contractor">Sub Contractor</option>';
                break;
            case 'Sub Contractor':
                vOptions += '<option value="Prime Contractor">Prime Contractor</option>';
                break;
            case 'Dissolved on Merger':
                vOptions += '<option value="Merged into">Merged into</option>';
                break;
            case 'Merged into':
                vOptions += '<option value="Dissolved on Merger">Dissolved on Merger</option>';
                break;
            case 'Other':
                vOptions += '<option value="Other">Other</option>';
                break;
        }

        vOptions += '</select>';
        $(this).parent().parent().children(".ddl").append(vOptions);
        if (Action == 0) {
            changecounterpartychildrelationship($(this).parent().parent().children(".ddl").find('option:selected').text());
            Action = 1;
        }
    });
});
//Create Counterparty Browse Related Contract End

//Create Counterparty Browse Genric && General Browser Genric Start
function ViewGenericCounterparty(obj) {
    vGlobalObjForGeneric = obj;
    $("#loadingPage").fadeIn();
    $("#tblGeneric").empty();
    $("#tblGenericheader").empty();
    $("#liSelectedRU").empty();
    var art = '<tr><td><article style="width:100%; text-align:center;">';
    art += '<input id="txtSearchBoxGeneric" class="f_inpt cl width80" type="text" style="text-wrap:none" placeholder="Type to Search" />';
    art += '<img title="Search" style="cursor: pointer; position: relative; left: -40px; top:-2px;" onclick="javascript: SearchGenericCounterparty();" src="../Content/Images/search_over.png" />';
    art += "<a href='javascript:void(0)' class='linkPickerClear' onclick='ClearGenericCounterparty();'>Clear</a>";
    art += '</article></td></tr>';
    $("#tblGenericheader").append(art);

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterpartyfieldbydisplayname?fielddisplayname=' + obj.id,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            var prevSelected = $("#" + obj.title).val();
            var arrprev = [];
            $.each(prevSelected.split(";"), function () {
                arrprev.push($.trim(this));
            });
            var arraysplitRU = [];
            myArrayRU = [];
            arraysplitRU = data[0].ChoiceValues.split("\n")
            var obj1 = {};
            for (var i = 0; i < arraysplitRU.length; i++) {
                if (!(arraysplitRU[i] in obj1)) {
                    if (arraysplitRU[i].trim() != "") {
                        myArrayRU.push(arraysplitRU[i]);
                    }
                }
                obj1[arraysplitRU[i]] = true;
            }
            var resultfound = true;
            var myArraylength = myArrayRU.length;
            $("#browseGeneric").data('param_1', obj.title).dialog("option", "title", obj.id + " Picker");
            CreateCounterPartyList(0);

            var vCount = myArraylength;

            $('#compact-paginationGeneric').pagination({
                items: vCount,
                itemsOnPage: 10,
                typeID: 'tblGeneric',
                cssStyle: 'compact-theme',
                listname: 'CounterPartyUnit'
            });
            $('#compact-paginationGeneric').css("display", "");
            $("#txtSearchBoxGeneric").autocomplete({
                source: myArrayRU,
                minLength: 1,
                focus: function (event, ui) {
                    return false;
                },
                select: function (evn, uidetails) {
                    $("#txtSearchBoxGeneric").val(uidetails.item.label);
                    SearchGenericCounterparty();
                }
            });
            $("#browseGeneric").dialog("open");
            $("#loadingPage").fadeOut();
        },
        error:
            function (data) {
                $("#tblGeneric").empty();
                $("#tblGenericheader").html('No item found.');
                $("#browseGeneric").data('param_1', obj.title).dialog("option", "title", obj.id + " Picker");
                $("#browseGeneric").dialog("open");
                $("#loadingPage").fadeOut();
            }
    });

    $('#txtSearchBoxGeneric').keypress(function (e) {
        if ($('#txtSearchBoxGeneric').val() != "") {
            if (e.keyCode == 13) {
                $(".ui-autocomplete").css('display', 'none');
                SearchGenericCounterparty();
            }
        }
    });
}

function ClearGenericCounterparty() {

    $('#loadGen').html('<img src="../Content/Images/icon/loading.gif">');
    $("#tblGeneric").find("tr:gt(0)").remove();
    $("#txtSearchBoxGeneric").val("")
    var searchKeyword = "";
    filtergenericCounterparty(searchKeyword);
}

function SearchGenericCounterparty() {
    $('#loadGen').html('<img src="../Content/Images/icon/loading.gif">Searching...');
    $("#tblGeneric").find("tr:gt(0)").remove();
    var searchKeyword = $("#txtSearchBoxGeneric").val();
    filtergenericCounterparty(searchKeyword);
}

function filtergenericCounterparty(searchKeyword) {
    $("#tblGeneric").empty();
    $("#liSelectedRU").empty();
    multipleChecksDocumentID = [];
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterpartyfieldbydisplayname?fielddisplayname=' + vGlobalObjForGeneric.id,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            var prevSelected = $("#" + vGlobalObjForGeneric.title).val();
            var arrprev = [];
            $.each(prevSelected.split(";"), function () {
                arrprev.push($.trim(this));
            });

            var arraysplitRU = [];
            myArrayRU = [];
            arraysplitRU = data[0].ChoiceValues.split("\n")
            var obj1 = {};
            for (var i = 0; i < arraysplitRU.length; i++) {
                if (!(arraysplitRU[i] in obj1)) {
                    if (arraysplitRU[i].trim() != "") {
                        if (arraysplitRU[i].toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1 || searchKeyword == "") {
                            myArrayRU.push(arraysplitRU[i]);
                        }
                        obj1[arraysplitRU[i]] = true;
                    }
                }
            }
            var resultfound = true;
            var myArraylength = myArrayRU.length;
            CreateCounterPartyList(0);

            var vCount = myArraylength;

            var vCount = $("#tblGeneric tr").length;
            $('#compact-paginationGeneric').pagination({
                items: vCount,
                itemsOnPage: 10,
                typeID: 'tblGeneric',
                cssStyle: 'compact-theme',
                listname: 'CounterPartyUnit'
            });
            $("#txtSearchBoxGeneric").autocomplete({
                source: arraysplitRU,
                minLength: 1,
                focus: function (event, ui) {
                    return false;
                },
                select: function (evn, uidetails) {
                    $("#txtSearchBoxGeneric").val(uidetails.item.label);
                    SearchGenericCounterparty();
                }
            });
            $('#loadGen').empty();
        },
        error:
            function (data) {

            }
    });
}

function CreateCounterPartyList(page) {
    $("#tblGeneric").css("display", "");
    var startIndex = page * 10;
    var endIndex = startIndex + 10;
    $('#tblGeneric').empty();
    if (endIndex > myArrayRU.length) endIndex = myArrayRU.length;
    $("#spResult").html((startIndex + 1) + '&nbsp;to&nbsp;' + endIndex + '&nbsp;of&nbsp;' + myArrayRU.length);
    var resultfound = false;
    var checkboxchecking = true;
    if (startIndex == endIndex) {
        var art = "No items found.";
        $("#tblGeneric").append(art);
        checkboxchecking = false;
        $('#loadGen').empty();
    }
    else {
        var checkingsdivchild = document.getElementById("liSelectedRU").hasChildNodes();
        if (!checkingsdivchild) {
            if (multipleChecksDocumentID.length > 0) {
                for (var spl = 0; spl < multipleChecksDocumentID.length; spl++) {
                    if (multipleChecksDocumentID[spl].trim() != "") {
                        $('#liSelectedRU').append('<span style="font-size:13px;">' + multipleChecksDocumentID[spl].trim() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelectedRU(this);" style="float:right" /></span>');
                    }
                }
            }
            else {
                var idtext = $("#browseGeneric").data('param_1');
                if (typeof idtext != 'undefined') {
                    var textvalid = $('#' + idtext).val();
                    if (typeof textvalid != 'undefined' && textvalid != "") {
                        var splitmulicheckforbind = textvalid.split(';');
                        for (var spl = 0; spl < splitmulicheckforbind.length; spl++) {
                            if (splitmulicheckforbind[spl].trim() != "") {
                                $('#liSelectedRU').append('<span style="font-size:13px;">' + splitmulicheckforbind[spl] + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelectedRU(this);" style="float:right" /></span>');
                                multipleChecksDocumentID.push(splitmulicheckforbind[spl].trim());
                            }
                        }
                    }
                    else {
                        checkMultipleDocuments("");
                    }
                }
                else {
                    checkMultipleDocuments("");
                }
            }
        }
        var spltarrprevRUstr = arrprevRU.toString();
        if (spltarrprevRUstr.indexOf(";") > -1) {
            var spltarrprevRU = spltarrprevRUstr.split(';');
            arrprevRU = [];
            for (var arrli = 0; arrli < spltarrprevRU.length; arrli++) {
                if (spltarrprevRU[arrli].trim() != "") {
                    arrprevRU.push(spltarrprevRU[arrli]);
                }
            }
        }
        var article = "";
        for (var i = startIndex; i < endIndex; i++) {
            if (i == startIndex) {
                article += '<tr><th><input id="selectall" onclick="funselectall(this);" type="checkbox"/> Select/Deselect All</th></tr>';
            }

            article += '<tr><td>';
            if (arrprevRU != null && multipleChecksDocumentID.length > 0) {
                if (arrprevRU.indexOf(myArrayRU[i]) >= 0 && multipleChecksDocumentID.indexOf(myArrayRU[i].trim()) > -1) {
                    article += '<input id="' + myArray[i] + '" type="checkbox" name="Generic"  onclick="checkMultipleDocuments(this);" checked class="css1-checkbox" value="' + myArray[i] + '" />';
                }
                else if (multipleChecksDocumentID.indexOf(myArrayRU[i].trim()) > -1) {
                    article += '<input id="' + myArrayRU[i] + '" type="checkbox" name="Generic" onclick="checkMultipleDocuments(this);" checked class="css1-checkbox" value="' + myArrayRU[i] + '" />';
                }
                else {
                    article += '<input id="' + myArrayRU[i] + '" type="checkbox" name="Generic" onclick="checkMultipleDocuments(this);"  class="css1-checkbox" value="' + myArrayRU[i] + '" />';
                    checkboxchecking = false;
                }
            }
            else if (arrprevRU.indexOf(myArrayRU[i]) >= 0 && multipleChecksDocumentID.length == 0) {
                article += '<input id="' + myArrayRU[i] + '" type="checkbox" name="Generic" onclick="checkMultipleDocuments(this);" checked class="css1-checkbox" value="' + myArrayRU[i] + '" />';
            }
            else if (multipleChecksDocumentID.indexOf(myArrayRU[i].trim()) > -1) {
                article += '<input id="' + myArrayRU[i] + '" type="checkbox" name="Generic" onclick="checkMultipleDocuments(this);" checked class="css1-checkbox" value="' + myArrayRU[i] + '" />';
            }
            else {
                article += '<input id="' + myArrayRU[i] + '" type="checkbox" name="Generic" onclick="checkMultipleDocuments(this);"  class="css1-checkbox" value="' + myArrayRU[i] + '" />';
                checkboxchecking = false;
            }
            article += '<label for="' + myArrayRU[i] + '" class="css1-label">' + myArrayRU[i] + '</label>';
            article += '</td></tr>';
            $('#loading').empty();
            resultfound = true;

        }
        $("#tblGeneric").html(article);
        article = '';
    }
    if (checkboxchecking == true) {
        $("#selectall").attr('checked', true);
    }
    else {
        $("#selectall").attr('checked', false);
    }
    $('#loadGen').empty();

}

function ViewGeneric(obj) {
    vGlobalObjForGeneric = obj;
    $("#loadingPage").fadeIn();
    $("#tblGeneric").empty();
    $("#tblGenericheader").empty();
    $("#liSelectedRU").empty();
    var art = '<tr><td><article style="width:100%; text-align:center;">';
    art += '<input id="txtSearchBoxGeneric" class="f_inpt cl width80" type="text"  style="text-wrap:none" placeholder="Type to Search" />';
    art += '<img title="Search" style="cursor: pointer; position: relative; left: -40px; top:-2px;" onclick="javascript: SearchGeneric();" src="../Content/Images/search_over.png" />';
    art += "<a href='javascript:void(0)' class='linkPickerClear' onclick='ClearGeneric();'>Clear</a>";
    art += '</article></td></tr>';
    $("#tblGenericheader").append(art);

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contractfieldbydisplayname?fielddisplayname=' + encodeURIComponent(obj.id),
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            var prevSelected = $("#" + obj.title).val();
            arrprevRU = [];
            $.each(prevSelected.split(";"), function () {
                arrprevRU.push($.trim(this));
            });
            var arraysplitRU = [];
            myArrayRU = [];
            arraysplitRU = data[0].ChoiceValues.split("\n")
            var obj1 = {};
            for (var i = 0; i < arraysplitRU.length; i++) {
                if (!(arraysplitRU[i] in obj1)) {
                    if (arraysplitRU[i].trim() != "") {
                        myArrayRU.push(arraysplitRU[i]);
                    }
                }
                obj1[arraysplitRU[i]] = true;
            }
            var resultfound = true;
            var myArraylength = myArrayRU.length;
            $("#browseGeneric").data('param_1', obj.title).dialog("option", "title", obj.id + " Picker");
            CreateReportUnitList(0);

            var vCount = myArraylength;

            $('#compact-paginationGeneric').pagination({
                items: vCount,
                itemsOnPage: 10,
                typeID: 'tblGeneric',
                cssStyle: 'compact-theme',
                listname: 'ReportUnit'
            });
            $('#compact-paginationGeneric').css("display", "");
            $("#txtSearchBoxGeneric").autocomplete({
                source: myArrayRU,
                minLength: 1,
                focus: function (event, ui) {
                    return false;
                },
                select: function (evn, uidetails) {
                    $("#txtSearchBoxGeneric").val(uidetails.item.label);
                    SearchGeneric();
                }
            });
            $("#browseGeneric").dialog("open");
            $("#loadingPage").fadeOut();

        },
        error:
            function (data) {
                $("#tblGeneric").empty();
                $("#tblGenericheader").html('No item found.');
                $("#browseGeneric").data('param_1', obj.title).dialog("option", "title", obj.id + " Picker");
                $("#browseGeneric").dialog("open");
                $("#loadingPage").fadeOut();
            }
    });

    $('#txtSearchBoxGeneric').keypress(function (e) {
        if ($('#txtSearchBoxGeneric').val() != "") {
            if (e.keyCode == 13) {
                $(".ui-autocomplete").css('display', 'none');
                SearchGeneric();
            }
        }
    });
}

function ClearGeneric() {
    $('#loadGen').html('<img src="../Content/Images/icon/loading.gif">');
    $("#tblGeneric").find("tr:gt(0)").remove();
    $("#txtSearchBoxGeneric").val("")
    var searchKeyword = "";
    filtergeneric(searchKeyword);
}

function SearchGeneric() {
    $('#loadGen').html('<img src="../Content/Images/icon/loading.gif">Searching...');
    $("#tblGeneric").find("tr:gt(0)").remove();
    var searchKeyword = $("#txtSearchBoxGeneric").val();
    filtergeneric(searchKeyword);
}

function filtergeneric(searchKeyword) {
    $("#tblGeneric").empty();
    $("#liSelectedRU").empty();
    multipleChecksDocumentID = [];
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contractfieldbydisplayname?fielddisplayname=' + encodeURIComponent(vGlobalObjForGeneric.id),
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            var prevSelected = $("#" + vGlobalObjForGeneric.title).val();
            arrprevRU = [];
            $.each(prevSelected.split(";"), function () {
                arrprevRU.push($.trim(this));
            });
            var arraysplitRU = [];
            myArrayRU = [];
            arraysplitRU = data[0].ChoiceValues.split("\n")
            var obj1 = {};
            for (var i = 0; i < arraysplitRU.length; i++) {
                if (!(arraysplitRU[i] in obj1)) {
                    if (arraysplitRU[i].trim() != "") {
                        if (arraysplitRU[i].toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1 || searchKeyword == "") {
                            myArrayRU.push(arraysplitRU[i]);
                        }
                        obj1[arraysplitRU[i]] = true;
                    }
                }
            }
            var resultfound = true;
            var myArraylength = myArrayRU.length;
            CreateReportUnitList(0);

            var vCount = myArraylength;

            var vCount = $("#tblGeneric tr").length;

            $('#compact-paginationGeneric').pagination({
                items: vCount,
                itemsOnPage: 10,
                typeID: 'tblGeneric',
                cssStyle: 'compact-theme',
                listname: 'ReportUnit'
            });
            $('#compact-paginationGeneric').css("display", "");
            $("#txtSearchBoxGeneric").autocomplete({
                source: arraysplitRU,
                minLength: 1,
                focus: function (event, ui) {
                    return false;
                },
                select: function (evn, uidetails) {
                    $("#txtSearchBoxGeneric").val(uidetails.item.label);
                    SearchGeneric();
                }
            });
            $('#loadGen').empty();
        },
        error:
            function (data) {

            }
    });

    $('#txtSearchBoxGeneric').keypress(function (e) {
        if ($('#txtSearchBoxGeneric').val() != "") {
            if (e.keyCode == 13) {
                $(".ui-autocomplete").css('display', 'none');
                SearchGeneric();
            }
        }
    });
}

function CreateReportUnitList(page) {
    $("#tblGeneric").css("display", "");
    var startIndex = page * 10;
    var endIndex = startIndex + 10;
    $('#tblGeneric').empty();
    if (endIndex > myArrayRU.length) endIndex = myArrayRU.length;
    $("#spResult").html((startIndex + 1) + '&nbsp;to&nbsp;' + endIndex + '&nbsp;of&nbsp;' + myArrayRU.length);
    var resultfound = false;
    var checkboxchecking = true;
    if (startIndex == endIndex) {
        var art = "No items found.";
        $("#tblGeneric").append(art);
        checkboxchecking = false;
        $('#loadGen').empty();
    }
    else {
        var spltarrprevRUstr = arrprevRU.toString();
        if (spltarrprevRUstr.indexOf(";") > -1) {
            var spltarrprevRU = spltarrprevRUstr.split(';');
            arrprevRU = [];
            for (var arrli = 0; arrli < spltarrprevRU.length; arrli++) {
                if (spltarrprevRU[arrli].trim() != "") {
                    arrprevRU.push(spltarrprevRU[arrli]);
                }
            }
        }
        var article = "";
        for (var i = startIndex; i < endIndex; i++) {
            if (i == startIndex) {
                article += '<tr><th><input id="selectall" onclick="funselectall(this);" type="checkbox"/> Select/Deselect All</th></tr>';
            }

            article += '<tr><td>';
            if (arrprevRU != null && multipleChecksDocumentID.length > 0) {
                if (arrprevRU.indexOf(myArrayRU[i]) >= 0 && multipleChecksDocumentID.indexOf(myArrayRU[i].trim()) > -1) {
                    article += '<input id="' + myArrayRU[i] + '" type="checkbox" name="Generic" onclick="checkMultipleDocuments(this);" checked class="css1-checkbox" value="' + myArrayRU[i] + '" />';
                }
                else if (multipleChecksDocumentID.indexOf(myArrayRU[i].trim()) > -1) {
                    article += '<input id="' + myArrayRU[i] + '" type="checkbox" name="Generic" onclick="checkMultipleDocuments(this);" checked class="css1-checkbox" value="' + myArrayRU[i] + '" />';
                }
                else {
                    article += '<input id="' + myArrayRU[i] + '" type="checkbox" name="Generic" onclick="checkMultipleDocuments(this);"  class="css1-checkbox" value="' + myArrayRU[i] + '" />';
                    checkboxchecking = false;
                }
            }
            else if (arrprevRU.indexOf(myArrayRU[i]) >= 0 && multipleChecksDocumentID.length == 0) {
                article += '<input id="' + myArrayRU[i] + '" type="checkbox" name="Generic" onclick="checkMultipleDocuments(this);" checked class="css1-checkbox" value="' + myArrayRU[i] + '" />';
            }
            else if (multipleChecksDocumentID.indexOf(myArrayRU[i].trim()) > -1) {
                article += '<input id="' + myArrayRU[i] + '" type="checkbox" name="Generic" onclick="checkMultipleDocuments(this);" checked class="css1-checkbox" value="' + myArrayRU[i] + '" />';
            }
            else {
                article += '<input id="' + myArrayRU[i] + '" type="checkbox" name="Generic" onclick="checkMultipleDocuments(this);"  class="css1-checkbox" value="' + myArrayRU[i] + '" />';
                checkboxchecking = false;
            }
            article += '<label for="' + myArrayRU[i] + '" class="css1-label">' + myArrayRU[i] + '</label>';
            article += '</td></tr>';
            $('#loading').empty();
            resultfound = true;
        }
        $("#tblGeneric").html(article);
    }
    if (checkboxchecking == true) {
        $("#selectall").attr('checked', true);
    }
    else {
        $("#selectall").attr('checked', false);
    }
    var checkingsdivchild = document.getElementById("liSelectedRU").hasChildNodes();
    if (!checkingsdivchild) {
        if (multipleChecksDocumentID.length > 0) {
            for (var spl = 0; spl < multipleChecksDocumentID.length; spl++) {
                if (multipleChecksDocumentID[spl].trim() != "") {
                    $('#liSelectedRU').append('<span style="font-size:13px;">' + multipleChecksDocumentID[spl].trim() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelectedRU(this);" style="float:right" /></span>');
                }
            }
        }
        else {
            var idtext = $("#browseGeneric").data('param_1');
            if (typeof idtext != 'undefined') {
                var textvalid = $('#' + idtext).val();
                if (typeof textvalid != 'undefined' && textvalid != "") {
                    var splitmulicheckforbind = textvalid.split(';');
                    for (var spl = 0; spl < splitmulicheckforbind.length; spl++) {
                        if (splitmulicheckforbind[spl].trim() != "") {
                            $('#liSelectedRU').append('<span style="font-size:13px;">' + splitmulicheckforbind[spl] + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelectedRU(this);" style="float:right" /></span>');
                            multipleChecksDocumentID.push(splitmulicheckforbind[spl].trim());
                        }
                    }
                }
                else {
                    checkMultipleDocuments("");
                }
            }
            else {
                checkMultipleDocuments("");
            }
        }
    }
    $('#loadGen').empty();
}

function checkMultipleDocuments(object) {
    $('#liSelectedRU').empty();
    var checkboxcheck = true;
    $('input[type=checkbox][name="Generic"]').each(function () {
        var DocumentID = this.id;
        var duplicatechecking = false;
        var isChecked = this.checked;
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
    });
    for (var spl = 0; spl < multipleChecksDocumentID.length; spl++) {
        if (multipleChecksDocumentID[spl].trim() != "") {
            $('#liSelectedRU').append('<span style="font-size:13px;">' + multipleChecksDocumentID[spl].trim() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelectedRU(this);" style="float:right" /></span>');
        }
    }
    if (checkboxcheck == true) {
        $("#selectall").attr('checked', true);
    }
    else {
        $("#selectall").attr('checked', false);
    }
    try {
        hideAllMenuAndStopPro(event);
    }
    catch (ex) {

    }
}

function liRemoveSelectedRU(obj) {
    var child = obj.parentNode;
    var child12 = child.firstChild.nodeValue;
    child12 = child12.trim();
    if (multipleChecksDocumentID.indexOf(child12) != -1) {
        var ind = multipleChecksDocumentID.indexOf(child12);
        multipleChecksDocumentID.splice(ind, 1);
    }

    $("#" + child12).attr('checked', false);
    var checkboxcheck = true;
    child.parentNode.removeChild(child);
    $('input[type=checkbox][name="Generic"]').each(function () {
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
        $("#selectall").attr('checked', true);
    }
    else {
        $("#selectall").attr('checked', false);
    }
}

function funselectall(obj) {
    if (obj.checked) { // check select status  
        $('input:checkbox[name=Generic]').attr('checked', true);
        checkMultipleDocuments("");
    } else {
        $('input:checkbox[name=Generic]').attr('checked', false);

        checkMultipleDocuments("");
    }
}
//Create Counterparty Browse Genric && General Browser Genric end


function funselectallCounterParty(obj) {
    if (obj.checked) { // check select status  
        $('input:checkbox[name=CounterpartyPicker]').attr('checked', true);
    } else {
        $('input:checkbox[name=CounterpartyPicker]').attr('checked', false);
    }
    checkMultipleDocumentsCounterParty("");
}

function checkMultipleDocumentsCounterParty(object) {
    //manoj
    var arrselectedcunterparty = [];
    $.each($('#liSelectedCounterParty').children(), function () {
        if (arrselectedcunterparty.indexOf($.trim(this.textContent)) == -1)
            arrselectedcunterparty.push($.trim(this.textContent));
    });
    $('#liSelectedCounterParty').empty();

    //var tablebind = $('#tblCounterparties').DataTable();
    //$.each($('input:checkbox[name="CounterpartyPicker"]', tablebind.rows().nodes()), function () {
    $.each($('#tblCounterparties input:checkbox[name="Counterparty"]'), function () {
        if (typeof ($.trim(this)) != 'undefined' && $.trim(this) != null) {
            if ($.trim(this.value) != "") {
                if (this.checked) {
                    if (arrselectedcunterparty.indexOf(unescape($.trim(this.value))) == -1) {
                        arrselectedcunterparty.push(unescape($.trim(this.value)))
                    }
                } else if (arrselectedcunterparty.indexOf(unescape($.trim(this.value))) > -1) {
                    arrselectedcunterparty.splice(arrselectedcunterparty.indexOf(unescape($.trim(this.value))), 1);
                }
            }
        }
    });
    arrselectedcunterparty.sort();
    $.each(arrselectedcunterparty, function () {
        $('#liSelectedCounterParty').append('<span style="font-size:13px;">' + $.trim(this) + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelectedCouterParty(this);" style="float:right" /></span>');
    });
    arrselectedcunterparty = [];

    if ($('input:checkbox[name="CounterpartyPicker"]:checked').length == $('input:checkbox[name="CounterpartyPicker"]').length && $('input:checkbox[name="CounterpartyPicker"]:checked').length != 0) {
        $("#selectall").attr('checked', true);
    } else {
        $("#selectall").attr('checked', false);
    }
    //manoj

    try {
        hideAllMenuAndStopPro(event);
    }
    catch (ex) {

    }
}

function documentstatuseditchange() {
    if ($("#ddlDocumentStatusEdit").val() != 0 && $("#ddlDocumentStatusEdit").val() == "Expired") {
        $("#dtValidFromEdit").val("");
        $("#dtValidTillEdit").val("");
        if ($("#linkAddValidity1").text() == "Track document expiration date") {
            $("#linkAddValidity1").css('display', 'none');
        }
        else {
            $("#linkAddValidity1").click();
            $("#linkAddValidity1").css('display', 'none');
        }
    }
    else {
        $("#linkAddValidity1").css('display', 'block');
    }
}
//Select all document from document tab//
var multipleChecks = "";
var multipleChecksPermission = "";
function SelectAllItems(object) {
    $('.hhide').hide();
    var selcetedcount = 0;
    var vDocumentID = "";
    multipleChecks = "";
    multipleChecksPermission = "";
    var vPermission = "";
    var isSelectedDraft = false;
    if ($('#SelectAll').is(':checked')) {
        $("input:checkbox[name=ContRec]").each(function () {
            this.checked = true;
            vDocumentID = $(this).attr("id").split('~')[0];
            $(this).parent("p").parent("li").addClass('aActive');
            vPermission = $(this).parent("p").parent("li").find("#Permission").text();
            $("#btnMultipleAction").css('display', '');

            multipleChecks += ';' + vDocumentID;
            multipleChecksPermission = multipleChecksPermission + ';' + vPermission;

            multipleChecksurl += ';' + ($(this).attr("id").split('~')[1]);
        });
    } else {
        $("input:checkbox[name=ContRec]").each(function () {
            this.checked = false;
            vDocumentID = $(this).attr("id").split('~')[0];
            vPermission = $(this).parent("p").parent("li").find("#Permission").text();
            $(this).parent("p").parent("li").removeClass('aActive');
            multipleChecks = multipleChecks.replace(';' + vDocumentID, '');
            multipleChecksPermission = multipleChecksPermission.replace(';' + vPermission, '');
            multipleChecksurl = multipleChecksurl.replace(';' + ($(this).attr("id").split('~')[1]), '');
        });
    }
    $("input:checkbox[name=ContRec]:checked").each(function () {
        if ($(this).parent("p").parent("li").find("b").text() == "Draft") {
            isSelectedDraft = true;
        }
        selcetedcount++;
    });
    if (selcetedcount > 0) {
        if (multipleChecksPermission.indexOf('openmenuFolderMan') >= 0 || multipleChecksPermission.indexOf('openmenuMan') >= 0 || multipleChecksPermission.indexOf('openmenuFinalMan') >= 0 || multipleChecksPermission.indexOf('openmenuAmendmentDocumentMan') >= 0 || multipleChecksPermission.indexOf('openmenuNotTaggedMan') >= 0 || multipleChecksPermission.indexOf('openmenuNotTaggedFinalMan') >= 0) {
            $("#btnMultipleAction_Delete").css('display', '');
            $("#btnMultipleAction_Download").css('display', '');
            //$("#btnMultipleAction_Markasfinal").css('display', '');
        }
        else {
            $("#btnMultipleAction_Delete").css('display', 'none');
            $("#btnMultipleAction_Download").css('display', '');
            //$("#btnMultipleAction_Markasfinal").css('display', '');
        }
        if (multipleChecksPermission.indexOf('openmenuReadOnly') >= 0) {
            $("#btnMultipleAction_Markasfinal").css('display', 'none');
        } else {
            $("#btnMultipleAction_Markasfinal").css('display', '');
        }
        if (isSelectedDraft) {
            $("#btnMultipleAction_Markasfinal").css('display', 'none');
        }
        else {
            if (multipleChecksPermission.indexOf('openmenuReadOnly') >= 0) {
                $("#btnMultipleAction_Markasfinal").css('display', 'none');
            } else {
                $("#btnMultipleAction_Markasfinal").css('display', '');
            }
        }

    } else {
        $("#btnMultipleAction").css('display', 'none');
    }

    try {
        hideAllMenuAndStopPro(event);
    }
    catch (ex) {

    }
}

function liRemoveSelectedCouterParty(obj) {
    var child = obj.parentNode;
    //manoj
    //var tablebind = $('#tblCounterparties').DataTable();
    //$.each($('input:checkbox[name="CounterpartyPicker"]:checked', tablebind.rows().nodes()), function () {
    $('input:checkbox[name="CounterpartyPicker"]:checked').each(function () {
        if (typeof ($.trim(this)) != 'undefined' && $.trim(this) != null) {
            if ($.trim(this.value) == child.textContent) {
                this.checked = false;
            }
        }
    });
    child.parentNode.removeChild(child);
    if ($('input:checkbox[name="CounterpartyPicker"]:checked').length == $('input:checkbox[name="CounterpartyPicker"]').length && $('input:checkbox[name="CounterpartyPicker"]:checked').length != 0) {
        $("#selectall").attr('checked', true);
    } else {
        $("#selectall").attr('checked', false);
    }
    //manoj
}

function getpaymenttype(obj) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/paymenttypes',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            $(data).each(function (i, item) {
                if (item.TypeName == obj) {
                    $("#PaymentType").append("<option value='" + item.TypeName + "' selected='selected'>" + item.TypeName + "</option>")
                } else {
                    $("#PaymentType").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                }
            });

        }
    });
}

function getlicencetype(obj) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/licencetypes',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            $(data).each(function (i, item) {
                if (item.TypeName == obj) {
                    $("#LicenceType").append("<option value='" + item.TypeName + "' selected='selected'>" + item.TypeName + "</option>")
                } else {
                    $("#LicenceType").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                }
            });

        }
    });
}


var arr = [];
var RelatedContractIDarr = [];
var vRelatedContractTitlearr = [];
var RelatedRelationshipTypearr = [];
var counterpartyTags = [];
var relatedContractsTag = [];
var selectedcontractid = "";
function ViewRelatedContracts() {
    var selectedcontracttittle = "";
    var selectedcontractcontractarea = "";
    var selectedcontractbusinessarea = "";
    var selectedcontractbusinessareapath = "";
    if (addbuttonclick) {
        selectedcontractid = $("#txtContractRecElementID").val();
        selectedcontracttittle = $("#txtContractRecElement").val();
        selectedcontractbusinessareapath = $("#txtBusinessAreaPath").val();
    } else if (ReplaceDocClick) {
        selectedcontractid = selecteddocumententity.ContractID;
        selectedcontracttittle = selecteddocumententity.ContractTitle;
        selectedcontractcontractarea = selecteddocumententity.ContractArea;
        selectedcontractbusinessarea = selecteddocumententity.BusinessArea;
        selectedcontractbusinessareapath = selecteddocumententity.ContractArea + " > " + selecteddocumententity.BusinessArea;
    } else {
        selectedcontractid = $("#txtContractRecElementID").val();
        selectedcontracttittle = $("#txtContractRecElement").val();
        selectedcontractbusinessareapath = $("#txtBusinessAreaPath").val();
    }
    $("#lblRelatedPopup_ContractTitle").text("Select Relationship for " + selectedcontracttittle)
    $("#loadingPage").fadeIn();
    $('#loadContract').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    $('#tblPopupContracts').empty();
    $("#txtSearchBoxContract").val("");
    var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/getrelatedcontracts?stage=&searchkeyword=&customquery=&sortbyfield=ContractTitle&orderby=ASC';
    $("#txtSearchBoxContract").val("");
    var businessareapathtopass = selectedcontractbusinessareapath;
    $.ajax({
        url: vURL,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey, BusinessAreaLocation: businessareapathtopass, UserID: localStorage.UserID },
        cache: false,
        success: function (data) {
            $('#loadContract').empty();
            $('#tblPopupContracts').empty();
            var arrdetailssplit = [];
            $.each(oldRelatedcontract.split(";"), function () {
                if (this != "") {
                    if ($.trim(this) != "") {
                        arrdetailssplit.push($.trim(this));
                    }
                }
            });
            oldRelatedcontract = arrdetailssplit.join("; ");
            oldRelatedcontract = oldRelatedcontract.trim();
            arroldRelatedcontract = arrdetailssplit;
            $.each($('#RelatedContracts').val().split(";"), function () {
                if (this != "") {
                    if ($.trim(this) != "") {
                        arr.push($.trim(this));
                    }
                }
            });
            if ($('#RelatedContracts').val() != "") {
                $.each($('#RelatedContracts').val().split(";"), function () {
                    if (!(arr.indexOf($.trim(this)) > -1)) {
                        arr.push($.trim(this));
                    }
                });
                if (arr.length > 0) {
                    if (arrRelatedContracts.length > 0) {
                        $.each(arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractID.split(";"), function () {
                            RelatedContractIDarr.push($.trim(this));
                        });
                        $.each(arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractTitle.split(";"), function () {
                            vRelatedContractTitlearr.push($.trim(this));
                        });
                        $.each(arrRelatedContracts[arrRelatedContracts.length - 1].RelatedRelationshipType.split(";"), function () {
                            RelatedRelationshipTypearr.push($.trim(this));
                        });
                    }
                }
            }
            listRelatedContracts = data;
            CreateRelatedContractslist(0);

            var vCount = data.length;
            if (vCount != 0) {
                $("#tblPopupContracts tr td").attr('style', 'vertical-align: top');
                $('#compact-paginationRelatedContracts').css('display', '');
                $('#compact-paginationRelatedContracts').pagination({
                    items: vCount,
                    itemsOnPage: 10,
                    type: 'tbody',
                    typeID: 'tblPopupContracts',
                    row: 'tr',
                    cssStyle: 'compact-theme',
                    listname: 'RelatedContracts'
                });
            } else {
                $('#compact-paginationRelatedContracts').css('display', 'none');
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
    BindRelatedContractsPopup(selectedcontractid);
}

function BindRelatedContractsPopup(contractid) {
    if (contractid != null || contractid != "") {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/relatedcontracts?contractid=' + contractid,
            type: 'GET',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
            cache: false,
            success: function (contactsJsonPayload) {
                OlRelatedContracts = contactsJsonPayload;
                var count = 0;
                $('#liSelected').empty();
                $(contactsJsonPayload).each(function (i, item) {
                    if (item.Permission != "")
                        $('#liSelected').append('<span style="font-size:11px;" id=' + item.RelatedContractID + ' name="' + item.RelationshipType + '">' + item.RelatedContractTitle + ' (' + item.RelatedRelationshipType + ') <img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveRelationship(this);" style="float:right" /></span>');
                });
            },
            error: function (request) {
            }
        });
    }
}

function ViewContracts() {
    relatedContractsTag = [];
    selectedcontractid = "";
    var selectedcontracttittle = "";
    var selectedcontractcontractarea = "";
    var selectedcontractbusinessarea = "";
    var selectedcontractbusinessareapath = "";
    if (addbuttonclick) {
        selectedcontractid = $("#txtContractRecElementID").val();
        selectedcontracttittle = $("#txtContractRecElement").val();
        selectedcontractbusinessareapath = $("#txtBusinessAreaPath").val();
    } else if (ReplaceDocClick) {
        selectedcontractid = selecteddocumententity.ContractID;
        selectedcontracttittle = selecteddocumententity.ContractTitle;
        selectedcontractcontractarea = selecteddocumententity.ContractArea;
        selectedcontractbusinessarea = selecteddocumententity.BusinessArea;
        selectedcontractbusinessareapath = selecteddocumententity.ContractArea + " > " + selecteddocumententity.BusinessArea;
    } else {
        selectedcontractid = $("#txtContractRecElementID").val();
        selectedcontracttittle = $("#txtContractRecElement").val();
        selectedcontractbusinessareapath = $("#txtBusinessAreaPath").val();
    }
    //$("#lblBusinessAreaPath").text()
    $("#tblPopupContracts").html('');
    $('#loadContract').html('<img src="../Content/Images/icon/loading.gif"> Searching...');
    var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/getrelatedcontracts?stage=&searchkeyword=' + $("#txtSearchBoxContract").val() + '&customquery=&sortbyfield=ContractTitle&orderby=ASC';
    var businessareapathtopass = selectedcontractbusinessareapath;
    $.ajax({
        url: vURL,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey, BusinessAreaLocation: businessareapathtopass, UserID: localStorage.UserID },
        cache: false,
        success: function (data) {
            $("#tblPopupContracts").html('');
            $('#loadContract').empty();
            var datalenght = data.length;
            arr = [];
            counterpartyTags = [];
            $.each($('#RelatedContracts').val().split(";"), function () {
                arr.push($.trim(this));
            });
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                if (selectedcontractid.indexOf(item.RowKey) > -1) { }
                else {
                    if (item.ContractTitle) {
                        if (arr.indexOf(item.ContractTitle.trim()) >= 0) {
                            var article = '<tr><td>';
                            article += '<input id="' + item.RowKey + '" type="checkbox" name="RelatedContract" disabled class="css1-checkbox" value="' + item.ContractTitle + '" />';
                            article += '<label for="' + item.RowKey + '" class="css1-label PreserveSpace">' + item.ContractTitle + '</label>';
                            article += '</td>';
                            article += '<td><label class="">' + item.ContractType + '</label></td>'
                            article += '<td><label class="">'
                            if (item.Counterparty != null && item.Counterparty != "") {
                                article += item.Counterparty
                            } else {
                                article += "-"
                            }
                            article += '</label></td><td><label class="" style="word-break: break-all;">'
                            if (item.ContractNumber != null && item.ContractNumber != "") {
                                article += item.ContractNumber
                            } else {
                                article += "-"
                            }
                            article += '</label></td><td><label class="">' + item.Status + '</label></td>'
                            article += '<td class="ddl"><td></tr>'
                            $("#tblPopupContracts").append(article);
                            relatedContractsTag.push(item.ContractTitle.trim());
                        } else {
                            var article = '<tr><td>';
                            article += '<input id="' + item.RowKey + '" type="checkbox" name="RelatedContract" onchange="javascript:collectrelatedcontractrowkey(this);" class="css1-checkbox" value="' + item.ContractTitle + '" />';
                            article += '<label for="' + item.RowKey + '" class="css1-label PreserveSpace">' + item.ContractTitle + '</label>';
                            article += '</td>';
                            article += '<td><label class="">' + item.ContractType + '</label></td>'
                            article += '<td><label class="">'
                            if (item.Counterparty != null && item.Counterparty != "") {
                                article += item.Counterparty
                            } else {
                                article += "-"
                            }
                            article += '</label></td><td><label class="" style="word-break: break-all;">'
                            if (item.ContractNumber != null && item.ContractNumber != "") {
                                article += item.ContractNumber
                            } else {
                                article += "-"
                            }
                            article += '</label></td><td><label class="">' + item.Status + '</label></td>'
                            article += '<td class="ddl"><td></tr>'
                            $("#tblPopupContracts").append(article);
                            relatedContractsTag.push(item.ContractTitle.trim());
                        }
                        $("#" + item.RowKey).click(function () {
                            if (this.checked) {
                                if ($(this).parent().parent().children(".ddl").find('option').length == 0) {
                                    var vOptions = "<select class='f_inpt width90' onchange='collectrelatedcontractrowkey(null)'>";
                                    var jsLang = $("#ddlRelationshipTypeParent option:selected").val();
                                    var jsLangType = $("#ddlRelationshipType option:selected").val();
                                    var rela1 = jQuery.grep(RelationshipTypes, function (a) {
                                        return (a[1] === jsLang && a[0] === jsLangType);
                                    });
                                    var rela2 = jQuery.grep(RelationshipTypes, function (a) {
                                        return (a[2].indexOf(jsLang) > -1 && a[0] === jsLangType);
                                    });
                                    if (rela1 != null && typeof (rela1) != "undefined" && rela1.length != 0) {
                                        var Relationship = rela1[0];
                                        $.each(Relationship[2], function (index, value) {
                                            var optRel2 = value.toString();
                                            vOptions += "<option value='" + optRel2 + "'>" + optRel2 + "</option>";
                                        })
                                        if ($(Relationship[2]).length == 0) {
                                            var optRel2 = Relationship[1].toString();
                                            vOptions += "<option value='" + optRel2 + "'>" + optRel2 + "</option>";
                                        }
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

                                }
                            } else {

                                $(this).parent().parent().children(".ddl").empty();
                            }

                        });
                    }
                }
            }
            collectrelatedcontractrowkey("");
            var vCount = $("#tblPopupContracts tr").length;
            if (vCount != 0) {
                $("#tblPopupContracts tr td").attr('style', 'vertical-align: top');
                $('#compact-paginationRelatedContracts').css('display', '');
                $('#compact-paginationRelatedContracts').pagination({
                    items: vCount,
                    itemsOnPage: 10,
                    type: 'tbody',
                    typeID: 'tblPopupContracts',
                    row: 'tr',
                    cssStyle: 'compact-theme'
                });
            } else {
                $('#compact-paginationRelatedContracts').css('display', 'none');
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
            $(".validelement").each(function (index, element) {
                $(element).removeClass("error");
                $("#errormsg_" + element.id).remove();
            });
            if ($('#dvfilter').is(':hidden')) {
            }
            else {
                $('#dvfilter').slideToggle();
            }
        },
        error: function () {
            $(".validelement").each(function (index, element) {
                $(element).removeClass("error");
                $("#errormsg_" + element.id).remove();
            });
            if ($('#dvfilter').is(':hidden')) {
            }
            else {
                $('#dvfilter').slideToggle();
            }
            $('#compact-paginationRelatedContracts').css('display', 'none');
            $('#loadContract').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
        }
    });
}

function collectrelatedcontractrowkey(obj) {

    if (requiredValidator('popupContracts', false)) {
        $('#liSelectedRelatedContract').empty();
        $('input:checkbox[name="RelatedContract"]:checked').each(function () {
            //$("#" + obj.id).trigger("click");
            //manoj
            $("#liSelectedRelatedContract #" + obj.id).remove();
            //manoj
            $('#liSelectedRelatedContract').append('<span style="font-size:11px;" id=' + this.id + '>' + this.value + ' (' + $(this).parent().parent().children(".ddl").find('option:selected').text() + ') <img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveRelationshipselected(this);" style="float:right" /></span>');
        });
        arrRelatedcontractRowkey = [];
        $('input:checkbox[name="RelatedContract"]:checked').each(function () {
            arrRelatedcontractRowkey.push(this.id);
        });
        if (arrRelatedcontractRowkey.length > 0) {
            $("#relatedrole").css('display', '');
        } else {
            $("#relatedrole").css('display', 'none');
        }
        var selectedrelatedvalues = [];
        $.each($('#RelatedContracts').val().split(";"), function () {
            if (this != "") {
                if ($.trim(this) != "") {
                    selectedrelatedvalues.push($.trim(this));
                }
            }
        });
        $('input:checkbox[name="RelatedContract"]:not(:checked)').each(function () {
            if (selectedrelatedvalues.indexOf(this.value.trim()) > -1) {
                selectedrelatedvalues.slice(selectedrelatedvalues.indexOf(this.value.trim()), 1);
            }
        });
        if (selectedrelatedvalues.length > 0) {
            $("#RelatedContracts").val(selectedrelatedvalues.join("; "));
        }
        else {
            $("#RelatedContracts").val("");
        }
        RelatedContractRelationShipTypeparent = $("#ddlRelationshipTypeParent option:selected").val();
    } else {
        $("#" + obj.id).attr('checked', false);
        $("#" + obj.id).parent().parent().children(".ddl").empty();
    }
}

function liRemoveRelationshipselected(obj) {
    var child = obj.parentNode;
    child.parentNode.removeChild(child);
    if (child.id != "") {
        $("#" + child.id).attr('checked', false);
        $("#" + child.id).parent().parent().children(".ddl").empty();

        var countvalue = 0;
        $('input:checkbox[name="RelatedContract"]:checked').each(function () {
            countvalue++;
        });
        if (countvalue > 0) {
            $("#relatedrole").css('display', '');
        } else {
            $("#relatedrole").css('display', 'none');
        }
    }
}

function liRemoveRelationship(obj) {
    selectedcontractid = "";
    var selectedcontracttittle = "";
    var selectedcontractcontractarea = "";
    var selectedcontractbusinessarea = "";
    var selectedcontractbusinessareapath = "";
    if (addbuttonclick) {
        selectedcontractid = $("#txtContractRecElementID").val();
        selectedcontracttittle = $("#txtContractRecElement").val();
        selectedcontractbusinessareapath = $("#txtBusinessAreaPath").val();
    } else {
        selectedcontractid = selecteddocumententity.ContractID;
        selectedcontracttittle = selecteddocumententity.ContractTitle;
        selectedcontractcontractarea = selecteddocumententity.ContractArea;
        selectedcontractbusinessarea = selecteddocumententity.BusinessArea;
        selectedcontractbusinessareapath = selecteddocumententity.ContractArea + " > " + selecteddocumententity.BusinessArea;
    }
    var child = obj.parentNode;
    var relatedContractidtodelete = child.id;
    var relatedContractTitle = child.textContent;
    var selectedcontract = $.grep(OlRelatedContracts, function (n) {
        return n.RelatedContractID == relatedContractidtodelete
    })
    var relationShipType = "";
    if (selectedcontract.length > 0)
        relationShipType = selectedcontract[0].RelationshipType;

    swal({
        title: '',
        text: "Do you wish to remove the relationship between the <span style=\"font-weight:700\">'" + selectedcontracttittle + "(" + relationShipType + ")" + "' and '" + relatedContractTitle + "' </span>?",
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
             $('#loadContract').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
             $("#loadingPage").fadeIn();
             $('#tblPopupContracts').empty();
             $("#txtSearchBoxContract").val("");
             $.ajax({
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + selectedcontractid + '/relatedcontracts?relatedcontractid=' + relatedContractID,
                 type: 'DELETE',
                 dataType: 'json',
                 headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                 "Content-Type": "application/json",
                 cache: false,
                 success: function (data) {
                     var relatedtextboxval = $("#RelatedContracts").val();
                     if (relatedContractTitle.indexOf('(') > -1) {
                         var nlst = relatedContractTitle.lastIndexOf("(");
                         relatedContractTitle = relatedContractTitle.substr(0, nlst);
                         var arrdetailssplit = [];
                         $.each(oldRelatedcontract.split(";"), function () {
                             if (this != "") {
                                 if ($.trim(this) != "") {
                                     arrdetailssplit.push($.trim(this));
                                 }
                             }
                         });
                         if (arrdetailssplit.indexOf(relatedContractTitle.trim()) > -1) {
                             var indextitle = arrdetailssplit.indexOf(relatedContractTitle.trim());
                             arrdetailssplit.splice(indextitle, 1);
                         }
                         if (SavedRelatedContract.indexOf(relatedContractTitle.trim()) > -1) {
                             var indextitle = SavedRelatedContract.indexOf(relatedContractTitle.trim());
                             SavedRelatedContract.splice(indextitle, 1);
                         }
                         oldRelatedcontract = arrdetailssplit.join("; ");
                         relatedtextboxval = arrdetailssplit.join("; ");
                         if (relatedtextboxval != "") {
                             $("#RelatedContracts").val(relatedtextboxval.trim());
                         }
                         else {
                             $("#RelatedContracts").val(relatedtextboxval);
                         }
                     }
                     $('#loadContract').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
                     $('#tblPopupContracts').empty();
                     $("#txtSearchBoxContract").val("");
                     var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/getrelatedcontracts?stage=&searchkeyword=&customquery=&sortbyfield=ContractTitle&orderby=ASC';
                     if ($('#tblPopupContracts tr').length <= 0) {
                         relatedContractsTag = [];
                         $("#txtSearchBoxContract").val("");
                         var businessareapathtopass = selectedcontractbusinessareapath;
                         $.ajax({
                             url: vURL,
                             type: 'GET',
                             dataType: 'json',
                             "Content-Type": "application/json",
                             headers: { 'eContracts-ApiKey': localStorage.APIKey, BusinessAreaLocation: businessareapathtopass, UserID: localStorage.UserID },
                             cache: false,
                             success: function (data) {
                                 $('#loadContract').empty();
                                 arroldRelatedcontract = [];
                                 $.each(oldRelatedcontract.split(";"), function () {
                                     if (this != "") {
                                         if ($.trim(this) != "") {
                                             arroldRelatedcontract.push($.trim(this));
                                         }
                                     }
                                 });
                                 arr = [];
                                 RelatedContractIDarr = [];
                                 vRelatedContractTitlearr = [];
                                 RelatedRelationshipTypearr = [];
                                 counterpartyTags = [];
                                 $.each($('#RelatedContracts').val().split(";"), function () {
                                     arr.push($.trim(this));
                                 });
                                 if ($('#RelatedContracts').val() != "") {
                                     $.each($('#RelatedContracts').val().split(";"), function () {
                                         if (!(arr.indexOf($.trim(this)) > -1)) {
                                             arr.push($.trim(this));
                                         }
                                     });

                                     if (arr.length > 0) {
                                         if (arrRelatedContracts.length > 0) {
                                             $.each(arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractID.split(";"), function () {
                                                 RelatedContractIDarr.push($.trim(this));
                                             });
                                             $.each(arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractTitle.split(";"), function () {
                                                 vRelatedContractTitlearr.push($.trim(this));
                                             });
                                             $.each(arrRelatedContracts[arrRelatedContracts.length - 1].RelatedRelationshipType.split(";"), function () {
                                                 RelatedRelationshipTypearr.push($.trim(this));
                                             });
                                         }
                                     }
                                 }
                                 $(data).each(function (i, item) {
                                     if (ContractID.indexOf(item.RowKey) > -1) { }
                                     else {
                                         if (arroldRelatedcontract.indexOf(item.ContractTitle.trim()) >= 0) {

                                         } else if (SavedRelatedContract.indexOf(item.ContractTitle.trim()) == -1) {
                                             var article = '<tr><td>';
                                             if (arrRelatedcontractRowkey.indexOf(item.RowKey) >= 0) {
                                                 article += '<input id="' + item.RowKey + '" type="checkbox" name="RelatedContract" class="css1-checkbox" onchange="javascript:collectrelatedcontractrowkey(this);" value="' + item.ContractTitle + '" checked />';
                                                 article += '<label for="' + item.RowKey + '" class="css1-label PreserveSpace">' + item.ContractTitle + '</label>';
                                                 article += '</td>';
                                                 article += '<td><label class="">' + item.ContractType + '</label></td>'
                                                 article += '<td><label class="">'
                                                 if (item.Counterparty != null && item.Counterparty != "") {
                                                     article += item.Counterparty
                                                 } else {
                                                     article += "-"
                                                 }
                                                 article += '</label></td><td><label class="" style="word-break: break-all;">'
                                                 if (item.ContractNumber != null && item.ContractNumber != "") {
                                                     article += item.ContractNumber
                                                 } else {
                                                     article += "-"
                                                 }
                                                 article += '</label></td><td><label class="">' + item.Status + '</label></td>'
                                                 article += '<td class="ddl width34">';
                                                 article += "<select class='f_inpt width90' onchange='collectrelatedcontractrowkey(null)'>";
                                                 try {
                                                     var jsLangselected = RelatedContractRelationShipTypeparent;
                                                 } catch (ex) {
                                                     alert(ex);

                                                 }
                                                 var jsLangType = $("#ddlRelationshipType option:selected").val();
                                                 var rela1 = jQuery.grep(RelationshipTypes, function (a) {
                                                     return (a[1] === jsLangselected && a[0] === jsLangType);
                                                 });
                                                 var rela2 = jQuery.grep(RelationshipTypes, function (a) {
                                                     return (a[2].indexOf(jsLangselected) > -1 && a[0] === jsLangType);
                                                 });
                                                 if (rela1 != null && typeof (rela1) != "undefined" && rela1.length != 0) {
                                                     var Relationship = rela1[0];
                                                     $.each(Relationship[2], function (index, value) {
                                                         var optRel2 = value.toString();
                                                         article += "<option value='" + optRel2 + "'>" + optRel2 + "</option>";
                                                     })
                                                     if ($(Relationship[2]).length == 0) {
                                                         var optRel2 = Relationship[1].toString();
                                                         article += "<option value='" + optRel2 + "'>" + optRel2 + "</option>";
                                                     }
                                                 }
                                                 else if (rela2 != null && typeof (rela2) != "undefined" && rela2.length != 0) {
                                                     var Relationship = rela2[0];
                                                     article += "<option value='" + Relationship[1] + "'>" + Relationship[1] + "</option>";
                                                 }
                                                 else {
                                                     switch (jsLangselected) {
                                                         case 'Master Agreement':
                                                             article += '<option value="Sub-Agreement">Sub-Agreement</option>';
                                                             article += '<option value="SOW">SOW</option>';
                                                             break;
                                                         case 'Sub-Agreement':
                                                         case 'SOW':
                                                             article += '<option value="Master Agreement">Master Agreement</option>';
                                                             break;
                                                         case 'Prime Contractor Agreement':
                                                             article += '<option value="Sub Contractor Agreement">Sub Contractor Agreement</option>';
                                                             break;
                                                         case 'Sub Contractor Agreement':
                                                             article += '<option value="Prime Contractor Agreement">Prime Contractor Agreement</option>';
                                                             break;
                                                         case 'Blanket Agreement':
                                                             article += '<option value="Order">Order</option>';
                                                             article += '<option value="Invoice">Invoice</option>';
                                                             break;
                                                         case 'Order':
                                                         case 'Invoice':
                                                             article += '<option value="Blanket Agreement">Blanket Agreement</option>';
                                                             break;
                                                         case 'Original':
                                                             article += '<option value="Duplicate">Duplicate</option>';
                                                             article += '<option value="Copy">Copy</option>';
                                                             break;
                                                         case 'Duplicate':
                                                         case 'Copy':
                                                             article += '<option value="Original">Original</option>';
                                                             break;
                                                         case 'Past Contract':
                                                             article += '<option value="Renegotiated Contract">Renegotiated Contract</option>';
                                                             break;
                                                         case 'Renegotiated Contract':
                                                             article += '<option value="Past Contract">Past Contract</option>';
                                                             break;
                                                         case 'Primary Contract':
                                                             article += '<option value="Amendment">Amendment</option>';
                                                             article += '<option value="Modification">Modification</option>';
                                                             break;
                                                         case 'Amendment':
                                                         case 'Modification':
                                                             article += '<option value="Primary Contract">Primary Contract</option>';
                                                             break;
                                                         case 'Other':
                                                             article += '<option value="Other">Other</option>';
                                                             break;
                                                     }
                                                 }
                                                 article += '</select><td></tr>';
                                                 $("#tblPopupContracts").append(article);
                                             }
                                             else {
                                                 if (arr.indexOf(item.ContractTitle.trim()) >= 0) {
                                                     article += '<input id="' + item.RowKey + '" type="checkbox" name="RelatedContract" class="css1-checkbox" onchange="javascript:collectrelatedcontractrowkey(this);" value="' + item.ContractTitle + '" checked />';
                                                 } else {
                                                     article += '<input id="' + item.RowKey + '" type="checkbox" name="RelatedContract" class="css1-checkbox" onchange="javascript:collectrelatedcontractrowkey(this);" value="' + item.ContractTitle + '" />';
                                                 }
                                                 article += '<label for="' + item.RowKey + '" class="css1-label PreserveSpace">' + item.ContractTitle + '</label>';
                                                 article += '</td>';
                                                 article += '<td><label class="">' + item.ContractType + '</label></td>'
                                                 article += '<td><label class="">'
                                                 if (item.Counterparty != null && item.Counterparty != "") {
                                                     article += item.Counterparty
                                                 } else {
                                                     article += "-"
                                                 }
                                                 article += '</label></td><td><label class="" style="word-break: break-all;">'
                                                 if (item.ContractNumber != null && item.ContractNumber != "") {
                                                     article += item.ContractNumber
                                                 } else {
                                                     article += "-"
                                                 }
                                                 article += '</label></td><td><label class="">' + item.Status + '</label></td>'
                                                 if (arr.indexOf(item.ContractTitle.trim()) >= 0) {
                                                     var indexvaluetake = arr.indexOf(item.ContractTitle.trim());
                                                     var relationtypefetch = RelatedRelationshipTypearr[indexvaluetake];
                                                     article += "<td class='ddl'><select class='f_inpt width90' onchange='collectrelatedcontractrowkey(null)'>";
                                                     var jsLang = $("#ddlRelationshipTypeParent option:selected").val();
                                                     switch (jsLang) {
                                                         case 'Master Agreement':
                                                             if (relationtypefetch == "Sub-Agreement") {
                                                                 article += '<option value="Sub-Agreement" selected>Sub-Agreement</option>';
                                                                 article += '<option value="SOW">SOW</option>';
                                                             }
                                                             else {
                                                                 article += '<option value="Sub-Agreement" >Sub-Agreement</option>';
                                                                 article += '<option value="SOW" selected>SOW</option>';
                                                             }
                                                             break;
                                                         case 'Sub-Agreement':
                                                         case 'SOW':
                                                             article += '<option value="Master Agreement">Master Agreement</option>';
                                                             break;
                                                         case 'Prime Contractor Agreement':
                                                             article += '<option value="Sub Contractor Agreement">Sub Contractor Agreement</option>';
                                                             break;
                                                         case 'Sub Contractor Agreement':
                                                             article += '<option value="Prime Contractor Agreement">Prime Contractor Agreement</option>';
                                                             break;
                                                         case 'Blanket Agreement':
                                                             if (relationtypefetch == "Order") {
                                                                 article += '<option value="Order" selected>Order</option>';
                                                                 article += '<option value="Invoice">Invoice</option>';
                                                             }
                                                             else {
                                                                 article += '<option value="Order">Order</option>';
                                                                 article += '<option value="Invoice" selected>Invoice</option>';
                                                             }

                                                             break;
                                                         case 'Order':
                                                         case 'Invoice':
                                                             article += '<option value="Blanket Agreement">Blanket Agreement</option>';
                                                             break;
                                                         case 'Original':
                                                             if (relationtypefetch == "Duplicate") {
                                                                 article += '<option value="Duplicate" selected>Duplicate</option>';
                                                                 article += '<option value="Copy">Copy</option>';
                                                             }
                                                             else {
                                                                 article += '<option value="Duplicate">Duplicate</option>';
                                                                 article += '<option value="Copy" selected>Copy</option>';
                                                             }
                                                             break;
                                                         case 'Duplicate':
                                                         case 'Copy':
                                                             article += '<option value="Original">Original</option>';
                                                             break;
                                                         case 'Past Contract':
                                                             article += '<option value="Renegotiated Contract">Renegotiated Contract</option>';
                                                             break;
                                                         case 'Renegotiated Contract':
                                                             article += '<option value="Past Contract">Past Contract</option>';
                                                             break;
                                                         case 'Primary Contract':
                                                             if (relationtypefetch == "Amendment") {
                                                                 article += '<option value="Amendment" selected>Amendment</option>';
                                                                 article += '<option value="Modification">Modification</option>';
                                                             }
                                                             else {
                                                                 article += '<option value="Amendment">Amendment</option>';
                                                                 article += '<option value="Modification" selected>Modification</option>';
                                                             }
                                                             break;
                                                         case 'Amendment':
                                                         case 'Modification':
                                                             article += '<option value="Primary Contract">Primary Contract</option>';
                                                             break;
                                                         case 'Other':
                                                             article += '<option value="Other">Other</option>';
                                                             break;
                                                     }

                                                     article += '</select><td></tr>';
                                                 }
                                                 else {
                                                     article += '<td class="ddl"><td></tr>'
                                                 }
                                                 $("#tblPopupContracts").append(article);
                                                 relatedContractsTag.push(item.ContractTitle.trim());
                                                 $("#" + item.RowKey).click(function () {
                                                     if (this.checked) {
                                                         if ($(this).parent().parent().children(".ddl").find('option').length == 0) {
                                                             var vOptions = "<select class='f_inpt width90' onchange='collectrelatedcontractrowkey(null)'>";
                                                             var jsLang = $("#ddlRelationshipTypeParent option:selected").val();
                                                             var jsLangType = $("#ddlRelationshipType option:selected").val();
                                                             var rela1 = jQuery.grep(RelationshipTypes, function (a) {
                                                                 return (a[1] === jsLang && a[0] === jsLangType);
                                                             });
                                                             var rela2 = jQuery.grep(RelationshipTypes, function (a) {
                                                                 return (a[2].indexOf(jsLang) > -1 && a[0] === jsLangType);
                                                             });
                                                             if (rela1 != null && typeof (rela1) != "undefined" && rela1.length != 0) {
                                                                 var Relationship = rela1[0];
                                                                 $.each(Relationship[2], function (index, value) {
                                                                     var optRel2 = value.toString();
                                                                     vOptions += "<option value='" + optRel2 + "'>" + optRel2 + "</option>";
                                                                 })
                                                                 if ($(Relationship[2]).length == 0) {
                                                                     var optRel2 = Relationship[1].toString();
                                                                     vOptions += "<option value='" + optRel2 + "'>" + optRel2 + "</option>";
                                                                 }
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

                                                         }
                                                     } else {

                                                         $(this).parent().parent().children(".ddl").empty();
                                                     }

                                                 });
                                             }
                                         }
                                     }
                                 });
                                 $("#loadingPage").fadeOut();
                                 var vCount = $("#tblPopupContracts tr").length;
                                 if (vCount != 0) {
                                     $("#tblPopupContracts tr td").attr('style', 'vertical-align: top');
                                     $('#compact-paginationRelatedContracts').css('display', '');
                                     $('#compact-paginationRelatedContracts').pagination({
                                         items: vCount,
                                         itemsOnPage: 10,
                                         type: 'tbody',
                                         typeID: 'tblPopupContracts',
                                         row: 'tr',
                                         cssStyle: 'compact-theme'
                                     });
                                 } else {
                                     $('#compact-paginationRelatedContracts').css('display', 'none');
                                     $('#loadContract').html('<p style="margin-left: 20px;">No items found.</p>')
                                 }
                                 $("#txtSearchBoxContract").autocomplete({
                                     source: relatedContractsTag,
                                     minLength: 1,
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
                     } else {
                         $('#loadMA').empty();
                         $("#popupContracts").dialog("option", "title", "Related Contract Record(s)");
                         $("#popupContracts").dialog("open");
                         $("#loadingPage").fadeOut();
                     }
                     vContractID = getParameterByName("ContractID");
                     BindRelatedContractsPopup(vContractID);
                 }
             });
         }
         return;
     });
}

function RelatedContractsPush() {
    if (requiredValidator('popupContracts', false)) {
        var vRelatedContractID = "";
        var vRelatedContractTitle = "";
        var vChildRelation = "";
        var vParentRelationShip = "";
        $('input:checkbox[name="RelatedContract"]:checked').each(function () {
            if (vRelatedContractID == "") {
                vRelatedContractID = this.id;
                vRelatedContractTitle = this.value;
                vChildRelation = $(this).parent().parent().children(".ddl").find('option:selected').text();
                vParentRelationShip = $("#ddlRelationshipTypeParent").find('option:selected').text();
            }
            else {
                vRelatedContractID += "; " + this.id;
                vRelatedContractTitle += "; " + this.value;
                vChildRelation += "; " + $(this).parent().parent().children(".ddl").find('option:selected').text();
                vParentRelationShip += "; " + $("#ddlRelationshipTypeParent").find('option:selected').text();
            }
        });
        if (vRelatedContractID != "") {
            arrRelatedContracts.push({
                ContractID: "",
                ContractTitle: "",
                RelatedContractID: vRelatedContractID,
                RelatedContractTitle: vRelatedContractTitle,
                RelationshipType: vParentRelationShip,
                RelatedRelationshipType: vChildRelation,
                CreatedBy: localStorage.UserName,
                ModifiedBy: localStorage.UserName
            });

            $("#popupContracts").dialog("close");
            if ($('#RelatedContracts').val() != "") {
                var oldrelatedcontrct = $('#RelatedContracts').val();
                if (oldrelatedcontrct.trim() != "") {
                    $('#RelatedContracts').val(oldrelatedcontrct + ";" + vRelatedContractTitle);
                }
            }
            else {
                $('#RelatedContracts').val(vRelatedContractTitle);
            }
            return true;
        } else {
            swal("", "No contract has been selected.");
            $("#popupContracts").dialog("close");
            return false;
        }
    }

}

$("#ddlRelationshipTypeParent").change(function () {
    $('input:checkbox[name="RelatedContract"]:checked').each(function () {
        $(this).parent().parent().children(".ddl").empty();
        var vOptions = "<select class='f_inpt width90' onchange='collectrelatedcontractrowkey(null)'>";
        var jsLang = $("#ddlRelationshipTypeParent option:selected").val();
        RelatedContractRelationShipTypeparent = jsLang;
        var jsLangType = $("#ddlRelationshipType option:selected").val();
        var rela1 = jQuery.grep(RelationshipTypes, function (a) {
            return (a[1] === jsLang && a[0] === jsLangType);
        });
        var rela2 = jQuery.grep(RelationshipTypes, function (a) {
            return (a[2].indexOf(jsLang) > -1 && a[0] === jsLangType);
        });
        if (rela1 != null && typeof (rela1) != "undefined" && rela1.length != 0) {
            var Relationship = rela1[0];
            $.each(Relationship[2], function (index, value) {
                var optRel2 = value.toString();
                vOptions += "<option value='" + optRel2 + "'>" + optRel2 + "</option>";
            })
            if ($(Relationship[2]).length == 0) {
                var optRel2 = Relationship[1].toString();
                vOptions += "<option value='" + optRel2 + "'>" + optRel2 + "</option>";
            }
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
    collectrelatedcontractrowkey("");
});

$("#ddlRelationshipType").change(function () {
    $("#ddlRelationshipTypeParent").empty();

    var jsLang = this.value;
    RelatedContractRelationShipTypeparent = jsLang;
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
        //if ($(Relationship[2]).length == 0) {
        //    var optRel2 = Relationship[1].toString();
        //    $("#ddlRelationshipTypeParent").append("<option value='" + optRel2 + "'>" + optRel2 + "</option>");
        //}
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
        var vOptions = "<select class='f_inpt width90' onchange='collectrelatedcontractrowkey(null)'>";
        var jsLang = $("#ddlRelationshipTypeParent option:selected").val();
        var jsLangType = $("#ddlRelationshipType option:selected").val();
        var rela1 = jQuery.grep(RelationshipTypes, function (a) {
            return (a[1] === jsLang && a[0] === jsLangType);
        });
        var rela2 = jQuery.grep(RelationshipTypes, function (a) {
            return (a[2].indexOf(jsLang) > -1 && a[0] === jsLangType);
        });
        if (rela1 != null && typeof (rela1) != "undefined" && rela1.length != 0) {
            var Relationship = rela1[0];
            $.each(Relationship[2], function (index, value) {
                var optRel2 = value.toString();
                vOptions += "<option value='" + optRel2 + "'>" + optRel2 + "</option>";
            })
            if ($(Relationship[2]).length == 0) {
                var optRel2 = Relationship[1].toString();
                vOptions += "<option value='" + optRel2 + "'>" + optRel2 + "</option>";
            }
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
    collectrelatedcontractrowkey("");
});

function CreateRelatedContract(contractid, contracttitle) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + contractid + '/relatedcontracts',
        type: 'POST',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        data: {
            ContractID: contractid,
            ContractTitle: contracttitle,
            RelatedContractID: arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractID,
            RelatedContractTitle: arrRelatedContracts[arrRelatedContracts.length - 1].RelatedContractTitle,
            RelationshipType: arrRelatedContracts[arrRelatedContracts.length - 1].RelationshipType,
            RelatedRelationshipType: arrRelatedContracts[arrRelatedContracts.length - 1].RelatedRelationshipType,
            CreatedBy: localStorage.UserName,
            ModifiedBy: localStorage.UserName,
        },
        cache: false,
        success: function (person) {
            arrRelatedContracts = [];
        },
        error: function (request) {
            arrRelatedContracts = [];
        }
    });
}

function ViewProjects() {
    $('#loadPro').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    if ($('#tblProjects tr').length <= 0) {
        ProjectsFunc();
    } else {
        $('#loadPro').empty();
        $("#browseProjects").dialog("option", "title", "Project Picker");
        $("#browseProjects").dialog("open");
    }
}

function ProjectsFunc() {
    $("#tblProjects").empty();
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/project',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        cache: false,
        success: function (data) {
            $('#loadPro').empty();
            arr = [];
            counterpartyTags = [];
            $.each($('#Project').val().split(";"), function () {
                arr.push($.trim(this));
            });
            var datalength = data.length;
            if (datalength > 0) {
                for (var i = 0; i < datalength; i++) {
                    var item = data[i];
                    var article = "";
                    if (i == 0) {
                        article += '<tr><th>Project Name</th></tr>';
                    }

                    article += '<tr><td>';
                    if (arr.indexOf(item.ProjectName) >= 0) {
                        article += '<input id="Pro' + item.RowKey + '" type="checkbox" name="Project" class="css1-checkbox" checked value="' + item.ProjectName + '" />';
                    } else {
                        article += '<input id="Pro' + item.RowKey + '" type="checkbox" name="Project" class="css1-checkbox" value="' + item.ProjectName + '" />';
                    }
                    article += '<label for="Pro' + item.RowKey + '" class="css1-label">' + item.ProjectName + '</label>';

                    article += '<input type="text" name="ProjectManager" style="display: none;" value="' + item.ProjectManager + '" />';
                    article += '</td></tr>';

                    counterpartyTags.push(item.ProjectName);
                    $("#tblProjects").append(article);
                }

                $("#txtSearchBoxProjects").autocomplete({
                    source: counterpartyTags,
                    minLength: 1,
                    focus: function (event, ui) {
                        return false;
                    },
                    select: function (evn, uidetails) {
                        $("#txtSearchBoxProjects").val(uidetails.item.label);
                        SearchProjects();
                    }
                });

                var vCount = $("#tblProjects tr").length;
                $('#compact-paginationProjects').pagination({
                    items: vCount,
                    itemsOnPage: 10,
                    currentPage: 1,
                    cssStyle: 'compact-theme',
                    type: 'tdbody',
                    row: 'tr',
                    typeID: 'tblProjects'
                });
                $("#loadingPage").fadeOut();
                $("#browseProjects").dialog("option", "title", "Project Picker");
                $("#browseProjects").dialog("open");
            } else {
                $("#loadingPage").fadeOut();
                $("#browseProjects").dialog("option", "title", "Project Picker");
                $("#browseProjects").dialog("open");
                $('#loadPro').empty();
                $('#loadPro').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
            }
        },
        error: function () {
            $('#loadPro').empty();
            $('#loadPro').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
        }
    });
}

function AddProject() {
    if ($('input[type="radio"][name=PickProject]:checked').val() == 'Existing') {
        var vProjects = "";
        var vProjectName = "";
        var arrTasks = [];
        $('input:checkbox[name="Project"]:checked').each(function () {
            vProjectName = this.value;
            if (vProjects == "") {
                vProjects = this.value;
                projectManager = this.nextSibling.nextSibling.value;

                $.each($('#ProjectTask').val().split(";"), function () {
                    if (vProjectName == $.trim(this).split(':')[0]) {
                        arrTasks.push($.trim(this));
                    }
                });
            }
            else {
                vProjects += "; " + this.value;
                projectManager += ";" + this.nextSibling.nextSibling.value;
                $.each($('#ProjectTask').val().split(";"), function () {
                    if (vProjectName == $.trim(this).split(':')[0]) {
                        arrTasks.push($.trim(this));
                    }
                });
            }
        });
        $('#ProjectTask').val(arrTasks.join("; "));

        if (vProjects != "") {
            $('#Project').val(vProjects);
            if (!($("#ProjectTask").hasClass("validelement"))) {
                $("#ProjectTask").addClass("validelement");
                $("#lblprojecttasktocheck").html("Project Tasks<span class='text-red'>*</span>");
            }
            return true;
        } else {
            $('#Project').val('');
            $("#ProjectTask").removeClass("validelement");
            if (!($("#Project").hasClass("validelement"))) {
                $("#ProjectTask").removeClass("validelement");
                $("#lblprojecttasktocheck").html("Project Tasks");
            } else {
                $("#ProjectTask").addClass("validelement");
                $("#lblprojecttasktocheck").html("Project Tasks<span class='text-red'>*</span>");
            }
            swal("", "No project has been selected.");
            return false;
        }
    }

}

function ProjectTasksFunc() {
    $("#tblProjectTasks").empty();
    $("#loadingPage").fadeIn();

    var vVarDataLength = 0;
    var isProjectSelected = false;
    var nproject = [];
    $.each($('#Project').val().split(";"), function () {
        nproject.push($.trim(this));
    });
    nproject = nproject.sort();
    $.each(nproject, function () {
        isProjectSelected = true;
        var vVarProjectName = $.trim(this);
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/projecttasks?projectnames=' + encodeURIComponent(vVarProjectName),
            type: 'GET',
            dataType: 'json',
            "Content-Type": "application/json",
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            cache: false,
            success: function (data) {
                $('#loadProTask').empty();
                arr = [];
                counterpartyTags = [];
                $.each($('#ProjectTask').val().split(";"), function () {
                    arr.push($.trim(this));
                });
                var datalength = data.length;
                if (datalength > 0) {
                    for (var i = 0; i < datalength; i++) {
                        var item = data[i];
                        var article = "";
                        if (i == 0) {
                            if (arr.indexOf(vVarProjectName + ':Default Task') >= 0) {
                                article += '<tr><th><input id="' + vVarProjectName + '" onclick="funselectalltasks(this);" type="checkbox" checked name="ProjectTask" value="' + vVarProjectName + ':Default Task" class="float_left margin-right-5" />' + vVarProjectName + ' (Default Task)</th></tr>';
                            } else {
                                article += '<tr><th><input id="' + vVarProjectName + '" onclick="funselectalltasks(this);" type="checkbox" name="ProjectTask" value="' + vVarProjectName + ':Default Task" class="float_left margin-right-5" />' + vVarProjectName + ' (Default Task)</th></tr>';
                            }
                        }

                        article += '<tr><td>';
                        if (arr.indexOf(vVarProjectName + ':' + item.TaskID) >= 0) {
                            article += '<input id="' + vVarProjectName + item.RowKey + '" type="checkbox" title="' + vVarProjectName + '" onclick="funselecttask(this);" name="ProjectTask" class="css1-checkbox" checked value="' + vVarProjectName + ':' + item.TaskID + '" />';
                        } else {
                            article += '<input id="' + vVarProjectName + item.RowKey + '" type="checkbox" title="' + vVarProjectName + '" onclick="funselecttask(this);" name="ProjectTask" class="css1-checkbox" value="' + vVarProjectName + ':' + item.TaskID + '" />';
                        }
                        article += '<label for="' + vVarProjectName + item.RowKey + '" class="css1-label">' + item.TaskID + ' : ' + item.TaskDescription + '</label>';
                        article += '</td></tr>';

                        counterpartyTags.push(item.TaskID);
                        $("#tblProjectTasks").append(article);
                    }
                    if (vVarDataLength == 0) {
                        vVarDataLength = datalength;
                    }

                } else {

                }
            },
            error: function () {
                $('#loadProTask').empty();
            }
        });
    });

    if (vVarDataLength == 0) {
        $("#loadingPage").fadeOut();
        $("#browseProjectTasks").dialog("option", "title", "Project Task Picker");
        $("#browseProjectTasks").dialog("open");
        $('#loadProTask').empty();
        if (!isProjectSelected) {
            $('#loadProTask').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
        }
    } else {
        $("#txtSearchBoxProjectTasks").autocomplete({
            source: counterpartyTags,
            minLength: 1,
            focus: function (event, ui) {
                return false;
            }
        });

        var vCount = $("#tblProjectTasks tr").length;
        $('#compact-paginationProjectTasks').pagination({
            items: vCount,
            itemsOnPage: 10,
            typeID: 'tblProjectTasks',
            cssStyle: 'compact-theme'
        });
        $("#loadingPage").fadeOut();
        $("#browseProjectTasks").dialog("option", "title", "Project Task Picker");
        $("#browseProjectTasks").dialog("open");
    }

}

function AddProjectTask() {
    var vProjectTasks = "";
    $('input:checkbox[name="ProjectTask"]:checked').each(function () {
        if (vProjectTasks == "") {
            vProjectTasks = this.value;
        }
        else {
            vProjectTasks += "; " + this.value;
        }
    });

    if (vProjectTasks != "") {
        $('#ProjectTask').val(vProjectTasks);
        return true;
    } else {

        swal("", "No task has been selected.");
        return false;
    }
}

function funselecttask(obj) {
    if (obj.checked) {
        $('input:checkbox[id="' + obj.title + '"]').attr("disabled", true);
    }

    var onecheckexists = false;
    $('input:checkbox[id^="' + obj.title + '"]').each(function () {
        if (this.checked) {
            onecheckexists = true;
        }
    });

    if (!onecheckexists) {
        $('input:checkbox[id="' + obj.title + '"]').removeAttr('disabled');
    }
}

function funselectalltasks(obj) {
    if (obj.checked) {
        $('input:checkbox[id^="' + obj.id + '"]').attr("disabled", true);
        $('input:checkbox[id="' + obj.id + '"]').removeAttr('disabled');
    } else {
        $('input:checkbox[id^="' + obj.id + '"]').removeAttr('disabled');
    }
}

function ViewProjectTasks() {
    if ($("#Project").val() != "") {
        $('#loadPro').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
        ProjectTasksFunc();
    } else {

        swal("", "Please select project");
    }
}

function ProjectTasksFunc() {
    $("#tblProjectTasks").empty();
    $("#loadingPage").fadeIn();

    var vVarDataLength = 0;
    var isProjectSelected = false;
    var nproject = [];
    $.each($('#Project').val().split(";"), function () {
        nproject.push($.trim(this));
    });
    nproject = nproject.sort();
    $.each(nproject, function () {
        isProjectSelected = true;
        var vVarProjectName = $.trim(this);
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/projecttasks?projectnames=' + encodeURIComponent(vVarProjectName),
            type: 'GET',
            dataType: 'json',
            "Content-Type": "application/json",
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            cache: false,
            success: function (data) {
                $('#loadProTask').empty();
                arr = [];
                counterpartyTags = [];
                $.each($('#ProjectTask').val().split(";"), function () {
                    arr.push($.trim(this));
                });
                var datalength = data.length;
                if (datalength > 0) {
                    for (var i = 0; i < datalength; i++) {
                        var item = data[i];
                        var article = "";
                        if (i == 0) {
                            if (arr.indexOf(vVarProjectName + ':Default Task') >= 0) {
                                article += '<tr><th><input id="' + vVarProjectName + '" onclick="funselectalltasks(this);" type="checkbox" checked name="ProjectTask" value="' + vVarProjectName + ':Default Task" class="float_left margin-right-5" />' + vVarProjectName + ' (Default Task)</th></tr>';
                            } else {
                                article += '<tr><th><input id="' + vVarProjectName + '" onclick="funselectalltasks(this);" type="checkbox" name="ProjectTask" value="' + vVarProjectName + ':Default Task" class="float_left margin-right-5" />' + vVarProjectName + ' (Default Task)</th></tr>';
                            }
                        }

                        article += '<tr><td>';
                        if (arr.indexOf(vVarProjectName + ':' + item.TaskID) >= 0) {
                            article += '<input id="' + vVarProjectName + item.RowKey + '" type="checkbox" title="' + vVarProjectName + '" onclick="funselecttask(this);" name="ProjectTask" class="css1-checkbox" checked value="' + vVarProjectName + ':' + item.TaskID + '" />';
                        } else {
                            article += '<input id="' + vVarProjectName + item.RowKey + '" type="checkbox" title="' + vVarProjectName + '" onclick="funselecttask(this);" name="ProjectTask" class="css1-checkbox" value="' + vVarProjectName + ':' + item.TaskID + '" />';
                        }
                        article += '<label for="' + vVarProjectName + item.RowKey + '" class="css1-label">' + item.TaskID + ' : ' + item.TaskDescription + '</label>';
                        article += '</td></tr>';

                        counterpartyTags.push(item.TaskID);
                        $("#tblProjectTasks").append(article);
                    }
                    if (vVarDataLength == 0) {
                        vVarDataLength = datalength;
                    }

                } else {

                }
            },
            error: function () {
                $('#loadProTask').empty();
            }
        });
    });

    if (vVarDataLength == 0) {
        $("#loadingPage").fadeOut();
        $("#browseProjectTasks").dialog("option", "title", "Project Task Picker");
        $("#browseProjectTasks").dialog("open");
        $('#loadProTask').empty();
        if (!isProjectSelected) {
            $('#loadProTask').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
        }
    } else {
        $("#txtSearchBoxProjectTasks").autocomplete({
            source: counterpartyTags,
            minLength: 1,
            focus: function (event, ui) {
                return false;
            }
        });

        var vCount = $("#tblProjectTasks tr").length;
        $('#compact-paginationProjectTasks').pagination({
            items: vCount,
            itemsOnPage: 10,
            typeID: 'tblProjectTasks',
            cssStyle: 'compact-theme'
        });
        $("#loadingPage").fadeOut();
        $("#browseProjectTasks").dialog("option", "title", "Project Task Picker");
        $("#browseProjectTasks").dialog("open");
    }

}

function ViewRelatedRequest() {
    $('#loadProContract').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    if ($('#tblRequests tr').length <= 0) {
        RelatedRequestCollection();
    } else {
        $('#loadProContract').empty();
        $("#browseRequest").dialog("option", "title", "Request Picker");
        $("#browseRequest").dialog("open");
    }
}

function RelatedRequestCollection() {
    var selectedbusinessarea = "";
    if (addbuttonclick) {
        selectedbusinessarea = $("#txtBusinessArea").val()
    } else {
        selectedbusinessarea = selecteddocumententity.BusinessArea;
    }
    $("#tblRequests").empty();
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/relatedrequestsearch?businessarea=' + selectedbusinessarea + '&sortbyfield=RequestTitle&orderby=ASC',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: {
            'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID
        },
        cache: false,
        success: function (data) {
            $('#loadProRequest').empty();
            arr = [];
            var RequestTileTag = [];
            $.each($('#RelatedRequests').val().split(";"), function () {
                arr.push($.trim(this));
            });
            var datalength = data.length;
            var article = "";
            var count = 0;
            if (datalength > 0) {
                for (var i = 0; i < datalength; i++) {
                    var item = data[i];
                    if (item.RequestTitle != null && item.RequestTitle != "") {
                        if (count == 0) {
                            article += '<tr><th>Request Title</th></tr>';
                            count++;
                        }
                        article += '<tr><td>';
                        if (arr.indexOf(item.RequestTitle) >= 0) {
                            article += '<input id="Pro' + item.RowKey + '" type="checkbox" name="RelatedRequest" class="css1-checkbox" checked value="' + item.RequestTitle + '" />';
                        } else {
                            article += '<input id="Pro' + item.RowKey + '" type="checkbox" name="RelatedRequest" class="css1-checkbox" value="' + item.RequestTitle + '" />';
                        }
                        article += '<label for="Pro' + item.RowKey + '" class="css1-label">' + item.RequestTitle + '</label>';
                        article += '</td></tr>';
                        RequestTileTag.push(item.RequestTitle);
                    }
                }
                $("#tblRequests").html(article);
                article = "";
                $("#txtSearchBoxRequest").autocomplete({
                    source: RequestTileTag,
                    minLength: 1,
                    focus: function (event, ui) {
                        return false;
                    },
                    select: function (evn, uidetails) {
                        $("#txtSearchBoxRequest").val(uidetails.item.label);
                        SearchRequest();
                    }
                });

                var vCount = $("#tblRequests tr").length;
                $('#compact-paginationContracts').pagination({
                    items: vCount,
                    itemsOnPage: 10,
                    typeID: 'tblRequests',
                    cssStyle: 'compact-theme'
                });
                try {
                    $("#browseRequest").dialog("option", "title", "Request Picker");
                    $("#browseRequest").dialog("open");
                }
                catch (ex) {
                    //  alert(ex);
                }
                $("#loadingPage").fadeOut();
            } else {
                $('#loadProRequest').empty();
                $('#loadProRequest').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
                $("#browseRequest").dialog("option", "title", "Request Picker");
                $("#browseRequest").dialog("open");
                $("#loadingPage").fadeOut();
            }
        },
        error: function () {
            $('#loadProRequest').empty();
            $('#loadProRequest').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
            $("#browseRequest").dialog("option", "title", "Request Picker");
            $("#browseRequest").dialog("open");
            $("#loadingPage").fadeOut();

        }
    });
}

function SearchRequest() {
    var selectedbusinessarea = "";
    if (addbuttonclick) {
        selectedbusinessarea = $("#txtBusinessArea").val()
    } else {
        selectedbusinessarea = selecteddocumententity.BusinessArea;
    }
    $("#tblRequests").empty();
    $('#loadProRequest').html('<img src="../Content/Images/icon/loading.gif"> Searching...');
    var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests?searchkeyword=' + encodeURIComponent($("#txtSearchBoxRequest").val()) + '&customquery=BusinessArea:' + selectedbusinessarea + '&sortbyfield=RequestTitle&orderby=ASC';
    $.ajax({
        url: vURL,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            arr = [];
            var RequestTileTag = [];
            $.each($('#RelatedRequests').val().split(";"), function () {
                arr.push($.trim(this));
            });
            var datalength = data.length;
            var article = '';
            var count = 0;
            for (var i = 0; i < datalength; i++) {
                var item = data[i];
                if (item.RequestTitle != null && item.RequestTitle != "") {
                    if (count == 0) {
                        article += '<tr><th>Request Title</th></tr>';
                        count++
                    }
                    article += '<tr><td>';
                    if (arr.indexOf(item.RequestTitle) >= 0) {
                        article += '<input id="Pro' + item.RowKey + '" type="checkbox" name="RelatedRequest" class="css1-checkbox" checked value="' + item.RequestTitle + '" />';
                    } else {
                        article += '<input id="Pro' + item.RowKey + '" type="checkbox" name="RelatedRequest" class="css1-checkbox" value="' + item.RequestTitle + '" />';
                    }
                    article += '<label for="' + item.RowKey + '" class="css1-label">' + item.RequestTitle + '</label>';
                    article += '</td></tr>';
                    RequestTileTag.push(item.RequestTitle);
                }
            }
            $('#loadProRequest').empty();
            $("#tblRequests").html(article);;
            $("#txtSearchBoxRequest").autocomplete({
                source: RequestTileTag,
                minLength: 1,
                focus: function (event, ui) {
                    return false;
                },
                select: function (evn, uidetails) {
                    $("#txtSearchBoxRequest").val(uidetails.item.label);
                    SearchRequest();
                }
            });
            article = '';
            var vCount = $("#tblRequests tr").length;
            if (vCount != 0) {
                $('#loadProRequest').html('');
                $('#compact-paginationContracts').css('display', '');
                $('#compact-paginationContracts').pagination({
                    items: vCount,
                    itemsOnPage: 10,
                    typeID: 'tblRequests',
                    cssStyle: 'compact-theme'
                });
            } else {
                $('#loadProRequest').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
                $('#compact-paginationContracts').css('display', 'none');
            }
        },
        error: function () {
            $('#compact-paginationContracts').css('display', 'none');
            $('#loadProRequest').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
        }
    });

}

function AddRequest() {
    var vRequest = "";
    var vRequestName = "";
    $('input:checkbox[name="RelatedRequest"]:checked').each(function () {
        vRequestName = this.value;
        if (vRequest == "") {
            vRequest = this.value;
        }
        else {
            vRequest += "; " + this.value;
        }
    });

    if (vRequest != "") {
        $('#RelatedRequests').val(vRequest);
        return true;
    } else {
        swal("", "No request has been selected.");
        return true;
    }

}

function checkprimarydocumentexit(ContractIDDetails) {
    var documentnotexit = true;
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?contractid=' + ContractIDDetails,
        type: 'GET',
        cache: false,
        contentType: false,
        async: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            var PrimaryDocumentCollection = $.grep(data, function (n, i) {
                return (n.IsPrimary == "Yes");
            });
            if (PrimaryDocumentCollection.length > 0) {
                documentnotexit = false;
            }

        }, error: function (data) {

        }
    });
    return documentnotexit;
}
//CounterParty Businessarea
var BAOwnersselecteditems = [];
function ViewOwnerofBusinessArea() {

    $('#txtBAOwnerofPath').val("");
    $('#txtBAOwnerof').val("");


    if ($("#txtOwnerofBusinessArea").val() != "") {
        //BAOwnersselecteditems = $("#txtOwnerofBusinessArea").val().split(';');
        var selecteditemslength = BAOwnersselecteditems.length;
        selectedBusinessAreaID11Temp = [];
        $(selectedBusinessAreaID11).each(function (i, item) {
            selectedBusinessAreaID11Temp.push(item);
        })


        $('#liSelectedBAOwners').html("");
        var arrRemovedIndexs = [];
        for (var i = 0; i < selecteditemslength; i++) {
            var re = new RegExp(" ", 'g');
            var str = BAOwnersselecteditems[i].trim().replace(re, '').trim();
            str = str.substring(str.lastIndexOf(">") + 1, str.length);
            if (selectedBusinessAreaID11.length >= i + 1) {
                if (thisBusinessAreaNameRowKey == selectedBusinessAreaID11[i][1])
                    $('#liSelectedBAOwners').append('<span id="BAF_' + str + '" style="font-size:11px;">' + BAOwnersselecteditems[i].trim().substring(BAOwnersselecteditems[i].trim().lastIndexOf(">") + 1, BAOwnersselecteditems[i].trim().length).trim() + '</span>');
                else
                    $('#liSelectedBAOwners').append('<span id="BAF_' + str + '" style="font-size:11px;">' + BAOwnersselecteditems[i].trim().substring(BAOwnersselecteditems[i].trim().lastIndexOf(">") + 1, BAOwnersselecteditems[i].trim().length).trim() + '<img src="/Content/Images/close-quick.png" id=' + selectedBusinessAreaID11[i][1] + ' onclick="javascript:liRemoveBAOwnersselecteditems(this,' + BAOwnersselecteditems.indexOf(BAOwnersselecteditems[i]) + ');" style="float:right" /></span>');
            }
            else {
                arrRemovedIndexs.push(BAOwnersselecteditems[i]);
            }
        }
        if (arrRemovedIndexs.length > 0) {
            $.each(arrRemovedIndexs, function (index, value) {
                var index = BAOwnersselecteditems.indexOf(value);
                BAOwnersselecteditems.splice(index, 1);
            });

        }
    }
    else {
        $('#liSelectedBAOwners').html("");
        BAOwnersselecteditems = [];
    }

    $("#browseBAOwners").dialog("option", "title", "Browse Business Area");
    $("#browseBAOwners").dialog("open");
}

var article11 = "";
var articleBusinessAreaCounterp = "";
var BusinessAreaAccessCounterp = [];
function BindBusinessAreaPicker11() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/entities',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            //if (localStorage.UserType.indexOf("Global Contract Owner") >= 0) {
            //    recursiveIteration11(data)
            //    $("#tbodyBusinessArea11").append(article11);
            //    if (article11 == "") {
            //        $("#tbodyBusinessArea11").append("<tr><td><p class='f_p-error'>No items found.</p></td></tr>");
            //    }
            //}
            //else {
            BindBusinessAreMenuCounterp(data);
            //}

            $("#example-basic-11").treetable({ expandable: true, initialState: "expanded" });
        },
        error:
            function (data) {
            }
    });
}

function recursiveIteration11(object) {
    if (object.ChildrenData.length != 0) {

        for (var i = 0; i < object.ChildrenData.length; i++) {
            var item = object.ChildrenData[i];
            // if (item.RowKey != "GenBA" && item.RowKey != "GenCA") {
            var additional = "";

            if (item.ParentBusinessAreaID == 0) {
                additional = '<span>' + item.BusinessAreaName + '</span>'
                strContractAreaName11 = item.BusinessAreaName;
                strContractAreaName11Owner = item.Owner;
                article11 += '<tr data-tt-id="tre-' + item.RowKey + '" class="branch expanded">';
                article11 += '<td class="treeHead"><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName11 + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName11Owner + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/globset.png" /><small>' + additional + '</small></td></tr>';
            } else {
                if (strContractAreaName11 == thisContractAreaNameC && item.BusinessAreaName == thisBusinessAreaNameC) {
                    thisBusinessAreaNameRowKey = item.RowKey;
                    thisContractAreaNameRowKey = strContractAreabusinesarearowkeyCounterp;
                }
                additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclick11(this)">' + item.BusinessAreaName + '</span>'
                article11 += '<tr data-tt-id="tre-' + item.RowKey + '" data-tt-parent-id="tre-' + item.ParentBusinessAreaID + '" class="branch collapsed" style="display: table-row;">';
                article11 += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName11 + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName11Owner + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" /><small>' + additional + '</small></td></tr>';
            }
        }

        recursiveIteration11(object.ChildrenData[i])
        // }
    }
}

$('input[type=radio][name=IsGlobal]').change(function () {
    if (this.value == 'Yes') {
        $("#trcp-RgBusi").hide();
        $("#txtOwnerofBusinessArea").removeClass("validelement");
        selectedBusinessAreaID11 = [];
        selectedBusinessAreaID11Temp = [];
        BAOwnersselecteditems = [];

    }
    else if (this.value == 'No') {
        $("#trcp-RgBusi").show();
        if (thisBusinessAreaNameC != "")
            addDefaultBusinessareaCounterparty();
        $("#txtOwnerofBusinessArea").addClass("validelement");
    }
    //manoj
    $("#RelatedCounterparties").val('');
    PrvRelatedCounterparities = [];
    arrRelatedCounterparities = [];
    curRelatedCounterparities = [];
    //manoj
});

var selectedBusinessAreaID11 = [];
var selectedBusinessAreaID11Temp = [];
var DeletedBusinessAreaID = [];
function treeviewclick11(obj) {
    var strBusinessAreaName = obj.textContent;
    var rowKey = obj.parentNode.parentNode.childNodes[2].textContent;
    var parentBusinessAreaID = obj.parentNode.parentNode.childNodes[1].textContent;
    var contractAreaName = obj.parentNode.parentNode.childNodes[3].textContent;
    var contractAreaNameOwner = obj.parentNode.parentNode.childNodes[4].textContent;


    $('#txtBAOwnerofPath').val(parentBusinessAreaID);
    $('#txtBAOwnerof').val(strBusinessAreaName);

    // Find and remove item from an array
    //var i = BAOwnersselecteditems.indexOf(strBusinessAreaName);
    //if (i != -1) {

    //} else {
    //    BAOwnersselecteditems.push(strBusinessAreaName);
    //    $('#liSelectedBAOwners').append('<span style="font-size:11px;">' + strBusinessAreaName + '<img src="/Content/Images/close-quick.png" id=' + rowKey + ' onclick="javascript:liRemoveBAOwnersselecteditems(this);" style="float:right" /></span>');
    //}
    //$('#txtBAOwnerof').val(BAOwnersselecteditems);

    var found = $.grep(selectedBusinessAreaID11Temp, function (value) {
        return value[1] == rowKey;
    });

    //  var i = selectedBusinessAreaID11.indexOf(rowKey);
    if (found != null && typeof (found) != "undefined" && found.length != 0) {

    } else {
        var rowK = jQuery.grep(BusinessAreaPathRowKey, function (a) {
            return a[1] === rowKey;
        });
        if (rowK != null && typeof (rowK) != "undefined" && rowK.length != 0) {
            selectedBusinessAreaID11Temp = $.grep(selectedBusinessAreaID11Temp, function (value) {
                return value[1] != rowK[0][1];
            });
            selectedBusinessAreaID11Temp.push([rowK[0][0], rowK[0][1]]);
            // Find and remove item from an array
            var i = BAOwnersselecteditems.indexOf(rowK[0][0]);
            if (i != -1) {

            } else {
                BAOwnersselecteditems.push(rowK[0][0]);
                $('#liSelectedBAOwners').append('<span style="font-size:11px;">' + strBusinessAreaName + '<img src="/Content/Images/close-quick.png" id=' + rowKey + ' onclick="javascript:liRemoveBAOwnersselecteditems(this);" style="float:right" /></span>');
            }
            $('#txtBAOwnerof').val(BAOwnersselecteditems);
        }

    }
}


function liRemoveBAOwnersselecteditems(obj) {

    var child = obj.parentNode;
    var rowK = jQuery.grep(BusinessAreaPathRowKey, function (a) {
        return a[1] === obj.id;
    });
    var i = BAOwnersselecteditems.indexOf(rowK[0][0]);
    if (i != -1) {
        BAOwnersselecteditems.splice(i, 1);
    }
    child.parentNode.removeChild(child);

    //remove id from array
    selectedBusinessAreaID11Temp = $.grep(selectedBusinessAreaID11Temp, function (value) {
        return value[1] != obj.id;
    });

}
function liRemoveBAOwnersselecteditems(obj, index) {

    var child = obj.parentNode;
    var rowK = jQuery.grep(BusinessAreaPathRowKey, function (a) {
        return a[1] === obj.id;
    });
    var innertextvale = child.textContent;
    index = BAOwnersselecteditems.indexOf(rowK[0][0]);
    child.parentNode.removeChild(child);
    if (index != -1) {
        BAOwnersselecteditems.splice(index, 1);
    }
    DeletedBusinessAreaID.push(obj.id);
    //remove id from array
    selectedBusinessAreaID11Temp = $.grep(selectedBusinessAreaID11Temp, function (value) {
        return value[1] != obj.id;
    });
}
function BindBusinessAreMenuCounterp(data) {
    if (typeof (BusinessAreaAccess) == "undefined" || BusinessAreaAccess == null || BusinessAreaAccess.length == 0) {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users/' + localStorage.UserID + '/businessareapermission',
            type: 'GET',
            dataType: 'json',
            'Content-Type': 'application/json',
            cache: true,
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            success: function (entity) {
                var BAreaAccess = entity.BusinessArea + ";" + entity.BusinessAreaContribute + ";" + entity.OwnerOfBusinessAreas;

                var newArray = BAreaAccess.split(';').filter(function (v) { return v !== '' }); // remove empty
                BusinessAreaAccessCounterp = newArray;

                /* Business Area Popup Start */

                recursiveIterationCounterp("", data)
                $("#tbodyBusinessArea11").append(articleBusinessAreaCounterp);
                if (articleBusinessAreaCounterp == "") {
                    $('#tbodyBusinessArea11').empty();
                    $("#tbodyBusinessArea11").append("<tr><td><p class='f_p-error'>No items found.</p></td></tr>");
                }
                articleBusinessAreaCounterp = "";
                $("#example-basic-11").treetable({ expandable: true, initialState: "expanded" });


            },
            error:
                function (data) {
                }
        });

    }
    else {
        if (typeof (BusinessAreaAccess) == "object" && BusinessAreaAccess.length > 1) {
            BusinessAreaAccessCounterp = BusinessAreaAccess;
        }
        else
            BusinessAreaAccessCounterp.push(BusinessAreaAccess);


        recursiveIterationCounterp("", data)
        $("#tbodyBusinessArea11").append(articleBusinessAreaCounterp);
        if (articleBusinessAreaCounterp == "") {
            $('#tbodyBusinessArea11').empty();
            $("#tbodyBusinessArea11").append("<tr><td><p class='f_p-error'>No items found.</p></td></tr>");
        }
        articleBusinessAreaCounterp = "";
        $("#example-basic-11").treetable({ expandable: true, initialState: "expanded" });

    }
}
var businessareaHeaderMenuCounterp = "";
var articleBusinessArea2Counterp = "";
var strContractAreaNameMenuCounterp = "";
var strContractAreaNameMenuOwnerCounterp = "";
var MyBusinessAreaCountCounterp = 0;
var strContractAreaAdminCounterp = "";
var strContractAreaNameCounterp = "";
var strContractAreabusinesarearowkeyCounterp = "";
var previousidCounterp = "";
var strContractAreaIDLayoutCounterp = '';
var strContractAreaName12Counterp = "";
var strContractAreaName12OwnerCounterp = "";
var previousidCounterp = "";
function recursiveIterationCounterp(path, object) {
    if (object.ChildrenData.length != 0) {
        for (var i = 0; i < object.ChildrenData.length; i++) {
            var item = object.ChildrenData[i];
            var spath = '';
            if (path == '') {
                spath = item.BusinessAreaName;
                BusinessAreaPathRowKey.push([spath, item.RowKey]);
            }
            else {
                spath = path + ' > ' + item.BusinessAreaName;
                BusinessAreaPathRowKey.push([spath, item.RowKey]);
            }
            var additional = "";
            var found = $.grep(BusinessAreaAccessCounterp, function (n, ind) {
                return (n.indexOf(spath) == 0);
            });
            //var found = _.some(BusinessAreaAccessWithRead, function (value) {
            //    return value.indexOf(spath) != -1;
            //});
            if (found.length > 0 || localStorage.UserType.indexOf("Global Contract Owner") >= 0 || item.RowKey == "GenCA" || item.RowKey == "GenBA") {

                if (item.ParentBusinessAreaID == 0) {
                    additional = '<span>' + item.BusinessAreaName + '</span>'
                    strContractAreaName12Counterp = item.BusinessAreaName;
                    strContractAreaName12OwnerCounterp = item.Owner;
                    articleBusinessAreaCounterp += '<tr data-tt-id="tre-' + item.RowKey + '" class="branch expanded">';
                    articleBusinessAreaCounterp += '<td class="treeHead"><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName12Counterp + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName12OwnerCounterp + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/globset.png" /><small>' + additional + '</small></td></tr>';
                } else {
                    if (strContractAreaName12Counterp == thisContractAreaNameC && item.BusinessAreaName == thisBusinessAreaNameC) {
                        thisBusinessAreaNameRowKey = item.RowKey;
                        thisContractAreaNameRowKey = strContractAreabusinesarearowkeyCounterp;
                    }
                    additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclick11(this)">' + item.BusinessAreaName + '</span>'
                    articleBusinessAreaCounterp += '<tr data-tt-id="tre-' + item.RowKey + '" data-tt-parent-id="tre-' + item.ParentBusinessAreaID + '" class="branch collapsed" style="display: table-row;">';
                    articleBusinessAreaCounterp += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName12Counterp + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName12OwnerCounterp + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" /><small>' + additional + '</small></td></tr>';
                }

                recursiveIterationCounterp(spath, object.ChildrenData[i])
            }
        }
    }
    //if (object.ChildrenData.length != 0) {
    //    BindRecBACounterp('', object);
    //}
}

var BusinessAreaPathRowKey = [];
var j = 1;
function BindRecBACounterp(path, object) {
    for (var i = 0; i < object.ChildrenData.length; i++) {
        var item = object.ChildrenData[i];
        var additional = "";
        var spath = '';
        if (path == '') {
            spath = item.BusinessAreaName;
            BusinessAreaPathRowKey.push([spath, item.RowKey]);
        }
        else {
            spath = path + ' > ' + item.BusinessAreaName;
            BusinessAreaPathRowKey.push([spath, item.RowKey]);
        }
        //var found = $.grep(BusinessAreaAccessWithRead, function (k,value) {
        //    return (value.indexOf(spath) != -1); 
        //});
        var found = $.grep(BusinessAreaAccessCounterp, function (n, ind) {
            return (n.indexOf(spath) == 0);
        });
        //var found = _.some(BusinessAreaAccessWithRead, function (value) {
        //    return value.indexOf(spath) != -1;
        //});
        if (found.length > 0 || localStorage.UserType.indexOf("Global Contract Owner") >= 0 || item.RowKey == "GenCA" || item.RowKey == "GenBA") {

            if (item.ParentBusinessAreaID != 0) {
                if (strContractAreaNameCounterp == thisContractAreaNameC && item.BusinessAreaName == thisBusinessAreaNameC) {
                    thisBusinessAreaNameRowKey = item.RowKey;
                    thisContractAreaNameRowKey = strContractAreabusinesarearowkeyCounterp;
                }
                if (item.Owner.trim().split(';').indexOf(localStorage.UserName.trim()) > -1) {//if business owner
                    additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclick11(this)">' + item.BusinessAreaName + '</span>&nbsp; <img src="/Content/Images/icon/profile.png" style="cursor:default;" />'
                } else { //if permission in business area
                    additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclick11(this)">' + item.BusinessAreaName + '</span>'
                }
            } else {
                additional = '<span>' + item.BusinessAreaName + '</span>';
            }
            if (additional != "") {
                if (item.ParentBusinessAreaID == 0) {
                    strContractAreaNameCounterp = item.BusinessAreaName;
                    strContractAreabusinesarearowkeyCounterp = item.RowKey;
                    strContractAreaAdminCounterp = item.Owner;
                    articleBusinessAreaCounterp += '<tr data-tt-id="tre-' + item.RowKey + '" class="branch expanded">';
                    articleBusinessAreaCounterp += '<td class="treeHead"><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaNameCounterp + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/globset.png" /><small>' + additional + '</small></td></tr>';
                } else {

                    articleBusinessAreaCounterp += '<tr data-tt-id="tre-' + item.RowKey + '" data-tt-parent-id="tre-' + item.ParentBusinessAreaID + '" class="branch collapsed" style="display: table-row;">';

                    if (previousidCounterp == item.ParentBusinessAreaID) {
                        //find if child business area exists
                        if (object.ChildrenData.length == 0) {
                            articleBusinessAreaCounterp += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaNameCounterp + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" class="padding_left_65px" /><small>' + additional + '</small></td></tr>';
                        } else {
                            var spandis = object.ChildrenData.length * 2 * 5 * j;
                            articleBusinessAreaCounterp += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaNameCounterp + '</span><span class="indenter" style="padding-left: ' + spandis + 'px;"></span><img src="/Content/Images/icon/gen.png" /><small>' + additional + '</small></td></tr>';
                        }
                        //$.ajax({
                        //    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/childbusinessareas?businessareaid=' + item.RowKey,
                        //    type: 'GET',
                        //    dataType: 'json',
                        //    'Content-Type': 'application/json',
                        //    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                        //    async: false,
                        //    success: function (data) {
                        //        if (data.length == 0) {
                        //            articleBusinessArea += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" class="padding_left_65px" /><small>' + additional + '</small></td></tr>';
                        //        } else {
                        //            articleBusinessArea += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" /><small>' + additional + '</small></td></tr>';
                        //        }
                        //    },
                        //    error:
                        //        function (data) {

                        //        }
                        //});
                    } else {
                        articleBusinessAreaCounterp += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaNameCounterp + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" /><small>' + additional + '</small></td></tr>';
                    }
                    if (previousidCounterp != item.ParentBusinessAreaID)
                        previousidCounterp = item.RowKey;
                }
            }
            //    recursiveIteration(object.ChildrenData[i])

            //if (object.ChildrenData.length > 0)
            //    recursiveIteration(object.ChildrenData[i])

            if (object.ChildrenData.length > 1) {
                j += 1;
                BindRecBACounterp(spath, object.ChildrenData[i]);

                if (j > 1)
                    j = j - 1;
                else
                    j = 1;
            }
            else if (object.ChildrenData.length == 1) {
                j += 1;
                BindRecBACounterp(spath, object.ChildrenData[i]);
                j = 1;
            }
        }
    }
}

function addDefaultBusinessareaCounterparty() {


    $('#txtBAOwnerofPath').val(thisContractAreaNameRowKey);
    $('#txtBAOwnerof').val(thisBusinessAreaNameC);

    // Find and remove item from an array
    var i = BAOwnersselecteditems.indexOf(thisBusinessAreaPath);
    if (i != -1) {

    } else {
        BAOwnersselecteditems.push(thisBusinessAreaPath);
        $('#liSelectedBAOwners').append('<span style="font-size:11px;">' + thisBusinessAreaNameC + '</span>');
    }
    $('#txtBAOwnerof').val(BAOwnersselecteditems);

    var found = $.grep(selectedBusinessAreaID11, function (value) {
        return value[1] == thisBusinessAreaNameRowKey;
    });

    //  var i = selectedBusinessAreaID11.indexOf(rowKey);
    if (found != null && typeof (found) != "undefined" && found.length != 0) {

    } else {
        var rowK = jQuery.grep(BusinessAreaPathRowKey, function (a) {
            return a[1] === thisBusinessAreaNameRowKey;
        });
        if (rowK != null && typeof (rowK) != "undefined" && rowK.length != 0) {
            selectedBusinessAreaID11 = $.grep(selectedBusinessAreaID11, function (value) {
                return value[1] != rowK[0][1];
            });
            selectedBusinessAreaID11.push([rowK[0][0], rowK[0][1]])
        }

    }
    $("#txtOwnerofBusinessArea").val(thisBusinessAreaNameC);
}

function BindContractDetails(contractid) {

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + contractid,
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
        processData: false,
        async: false,
        success: function (item) {
            contractItemrec = item;
        },
        error: function (dat) {
            contractItemrec = "";
        }
    })
}
function getShareNameandEmailIdInternal(scontrid, popUpModalName) {
    if (contractItemrec == "")
        BindContractDetails(scontrid);
    //if (contractItemrec != "") {
    //    var UsersToShow = contractItemrec.ContractManagers + ";" + contractItemrec.BusinessOwners + ";" + contractItemrec.CreatedBy + ";" + contractItemrec.Approvers + ";" + contractItemrec.Reviewers + ";" + contractItemrec.Signees + ";" + contractItemrec.Requestor;
    //    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    //    var vAccFeat = $.grep(veContractFeatures, function (n, i) {
    //        return (n.RowKey == "11" && n.Status == "ON");
    //    });
    //    if (vAccFeat.length > 0) {
    //        try {
    //            if (contractItemrec.ProjectManager == null || contractItemrec.ProjectManager == "") {
    //                UsersToShow += ";" + contractItemrec.ProjectManager;
    //            }
    //        }
    //        catch (ex) {

    //        }
    //    }
    //    HideOptionsNotRequiredExcept(popUpModalName, UsersToShow);
    //}
    //else {
    //    HideOptionsNotRequiredExcept(popUpModalName, "");
    //}
}
function HideOptionsNotRequiredExcept(controlname, values) {

    var multiarr = [];
    var res = values != null ? values.split(";") : [];
    var reslength = res.length;
    var resValue = "";
    $("#" + controlname).children('option').hide();
    $('#' + controlname).chosen().trigger("chosen:updated");

    for (var i = 0; i < reslength; i++) {
        //   multiarr.push(res[i].trim());
        resValue = res[i].trim();
        if (resValue != "") {
            if ($('#' + controlname).children('option').filter(function () { return $(this).text() == resValue; }).length > 0 && multiarr.indexOf(resValue) == -1) {
                $('#' + controlname).children('option').filter(function () { return $(this).text() == resValue; }).show();
                multiarr.push(resValue);
            }
        }
    }
    if (multiarr.length == 0) {
        $('#' + controlname).attr("data-placeholder", "No users available").chosen();
    }
    else {
        $('#' + controlname).attr("data-placeholder", "Select User(s)").chosen();
    }
    $('#' + controlname).chosen().trigger("chosen:updated");
}
function GetTextAndAutoPopulateNotHidden(controlname, values) {

    var multiarr = [];
    var res = values != null ? values.split(";") : [];
    var reslength = res.length;
    var resValue = "";
    for (var i = 0; i < reslength; i++) {
        //   multiarr.push(res[i].trim());
        resValue = res[i].trim();
        if (resValue != "") {
            if ($('#' + controlname + ' option[value="' + resValue + '"]').length > 0 && multiarr.indexOf(resValue) == -1 && $('#' + controlname + ' option[value="' + resValue + '"]').css("display") != "none") {
                multiarr.push(resValue);
            }

        }
    }


    ChosenOrder.setSelectionOrder($('#' + controlname), multiarr, true);
}

//Sridhar
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

function BindContractRelationships() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contractrelationships',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            BindBusinessAreaPicker11();
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
                    BindBusinessAreaPicker11();
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
                    BindBusinessAreaPicker11();
                    RelationshipTypes = [];
                }
            });
        }
    });
}

//manoj
function clearsection() {
    if ($("#showAll").text().indexOf("/") < 0) {
        $("#txtContractRecElementID").val('');
        $("#txtContractRecElement").val('');
    }
    $("#txtDocumentID").val('');
    $("#txtDocumentIDForEdit").val("")

    $("#ddlDocumentType option").filter(function (index) { return $(this).text() === '--Select--' }).prop('selected', true);
    $("#ddlDocumentTypeCreate option").filter(function (index) { return $(this).text() === '--Select--' }).prop('selected', true);

    $("#txtContractRecElementIDEdit").val("");
    $("#txtContractRecElementEdit").val("");
    $("#txtDocumentName").val('');
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "16" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        $('input[type="radio"][name="IsFinalizedEdit"][value="No"]').prop('checked', true);
    } else {
        $('input[type="radio"][name="IsFinalizedEdit"][value="Yes"]').prop('checked', true);
    }

    $("#txtDocumentLanguageEdit").val("");
    $("#txtHardCopyPhysicalLocationEdit").val("");
    $("#txtDescription").val('');
    $("#textDescription").val('');

    $("#spExt").html('');
    $("#txtDuplicateDocumentName").val('');
    $("#spDuplicateDocumentExt").html('');

    $("#dtValidFrom").val('');
    $("#dtValidTill").val('');
    if ($("#spBusinessArea")[0].style.display != "none") {
        $("#txtBusinessArea").val('');
        $("#txtBusinessAreaPath").val('');
        $('#txtContractAreaName').val("");
    }

    $("#txtReminder1").val('');
    $("#txtReminder2").val('');
    $("#txtReminder3").val('');
    $("#ddlReminder1").find('option[value="before"]').prop("selected", true);
    $("#ddlReminder2").find('option[value="before"]').prop("selected", true);
    $("#ddlReminder3").find('option[value="before"]').prop("selected", true);

    $('#txtContractAreaAdministrators').val("");
    $('#txtBusinessAreaOwners').val("");
}

//JqTree Folder Structure
function selectfolder() {
    var $tree = $('#treeviewFolderOption');
    var nodeselected = $tree.tree('getSelectedNode');
    var nodeselectedname = "";
    if (typeof (nodeselected) != "undefined" && nodeselected != null) {
        var selectednodeid = nodeselected.id;
        nodeselectedname = (nodeselected.name != null && nodeselected.name != "") ? nodeselected.name.split('/').pop() : nodeselected.name;
        var fixedvaluetopass = $("#lblFolderUrl").text();
        if ((fixedvaluetopass.match(/\//g) || []).length != 3) {
            fixedvaluetopass = fixedvaluetopass.substr(1);
            fixedvaluetopass = fixedvaluetopass.slice(0, -1);
            var contractdocumenturl = fixedvaluetopass.split('/');
            fixedvaluetopass = "/" + contractdocumenturl.slice(0, 2).join("/") + "/";
            $("#lblFolderUrl").text(fixedvaluetopass);
        }
        fixedvaluetopass = ((fixedvaluetopass.substr(fixedvaluetopass.length - 1)) != "/") ? fixedvaluetopass : fixedvaluetopass.substr(0, fixedvaluetopass.length - 1);
        var splturl = (selectednodeid.indexOf(fixedvaluetopass) > -1) ? selectednodeid.split(fixedvaluetopass).pop() : selectednodeid;
        var fixedurl = $("#lblFolderUrl").text();
        fixedurl = (fixedurl.charAt(0) != '/') ? '/' + fixedurl : fixedurl;
        fixedurl = ((fixedurl.substr(fixedurl.length - 1)) != "/") ? fixedurl + "/" : fixedurl;
        if (splturl != "") {

            splturl = (splturl.charAt(0) == '/') ? splturl.substr(1) : splturl;
            splturl = ((splturl.substr(splturl.length - 1)) != "/") ? splturl + "/" : splturl;
        }
        splturl = fixedurl + splturl;
        $('#lblFolderUrl').text(splturl);
        $("#treeviewFolder").dialog("close");
    } else {
        swal("", "Please select any folder.");
        $("#loadingPage").fadeOut();
    }
}

function CreateFolder(parentFolderName) {
    $("#browseFolder").html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/folderstructurejqtree?documentlibrary=' + parentFolderName,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (folder) {
            try {
                $("#btnaddsubfolder").css("display", "");
                $("#browseFolder").html('<div id="treeviewFolderOption" class="demo-section"></div><input id="txtFolder" type="hidden" /><input id="txtFolderURL" type="hidden" />');
                $('#treeviewFolderOption').empty();
                $('#treeviewFolderOption').tree({
                    data: folder,
                    autoOpen: 0
                });
            } catch (ex) {
            }
        },
        error:
            function (data) {
                $("#browseFolder").html('No items found.');
            }
    });
}
//JqTree Folder Structure
//manoj

//Sridhar
$("#tblPopupContracts tr td select").change(function () {

    var chkid = $("#ddlRelatedChild").parent().parent().children().find('input[name=RelatedContract]')[0].id;

    $("span#" + chkid).remove();
});

function ShowHideAutoUpdateStatus(ContractID, AutoUpdateStatusCTRL) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + ContractID,
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
        processData: false,
        success: function (item) {
            //manoj
            $("#hdIsPublicStatus").val(item.IsPublic);
            $("#hdWorkflowContractID").val(ContractID);
            //manoj
            if (item.IsFinalized == 'Yes') {
                $("#" + AutoUpdateStatusCTRL).css('display', 'none');
            } else {
                $("#" + AutoUpdateStatusCTRL).css('display', '');
            }
        }, error:
            function (data) {
                $("#hdIsPublicStatus").val("");
                $("#hdWorkflowContractID").val("");
            }
    });
}

//manoj
function uploadorcreatedocument(result) {
    if (result) {
        swal({
            title: '',
            text: "Document already exists, do you want to <span style=\"font-weight:700\">overwrite</span> the existing document?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            html: true
        },
             function (confirmed) {
                 if (confirmed) {
                     overwritedocument = true;
                     if ($("#dtValidFrom").val() != '' && $("#dtValidTill").val() != '') {
                         if (comparedates("dtValidFrom", "dtValidTill")) {
                             newDocument();
                         } else {
                             $('.pop_up_Content_Green').parent().removeAttr('disabled');
                             swal("", "Valid Till date should be greater that Valid From date.");
                             $("#loadingPage").fadeOut();
                         }
                     } else {
                         newDocument();
                     }
                 }
                 else {
                     $("#loadingPage").fadeOut();
                     $('.pop_up_Content_Green').parent().removeAttr('disabled');
                 }
                 return;
             });
    }
    else {
        if ($("#dtValidFrom").val() != '' && $("#dtValidTill").val() != '') {
            if (comparedates("dtValidFrom", "dtValidTill")) {
                newDocument();
            } else {
                $('.pop_up_Content_Green').parent().removeAttr('disabled');
                swal("", "Valid Till date should be greater that Valid From date.");
                $("#loadingPage").fadeOut();
            }
        } else {
            newDocument();
        }
    }
}

//for Hyperlink
function navigateurl(obj) {
    if (typeof obj != 'undefined' && obj != null && obj != "") {
        var objvalue = $("#" + obj).val();
        var navigationresult = "";
        if (typeof objvalue != 'undefined' && objvalue != null && objvalue != "") {
            if (objvalue.trim() != "") {
                var reqularexprn = /^(http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i
                if (reqularexprn.test(objvalue)) {
                    navigationresult = "Valid"
                } else {
                    navigationresult = "Notvalid"
                }
            } else {
                navigationresult = "WhiteSpace";
            }
        } else {
            navigationresult = "Empty";
        }
        switch (navigationresult) {
            case "Valid": {
                window.open(objvalue);
                break;
            }
            case "Notvalid": {
                swal("", "Enter valid URL.");
                break;
            }
            case "WhiteSpace": {
                swal("", "URL should not contain whitespace.");
                break;
            }
            case "Empty": {
                swal("", "URL should not be empty.");
                break;
            }
        }
    }
}
//for Hyperlink

function quickviewbinddocumenttype() {
    if (thisBusinessAreaPath == "") {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documenttypes',
            type: 'GET',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            cache: false,
            success: function (documenttypes) {
                $("#filterDocumentType").empty();

                $("#filterDocumentType").append("<option value='All' selected='selected'>All</option>")
                //manoj
                $(documenttypes).each(function (idocumenttypes, itemdocumenttypes) {
                    $("#filterDocumentType").append("<option value='" + itemdocumenttypes.TypeName + "'>" + itemdocumenttypes.TypeName + "</option>")
                });
                //manoj
                if ($("#ddlDocumentTypeCreate option[value='Others']").length == 0) {
                    $("#filterDocumentType").append("<option value='Others'>Others</option>");
                }
            },
            error:
                function (data) {
                    $("#filterDocumentType").append("<option value='Others'>Others</option>");
                }
        });
    }
}

function reloadlistDocuments() {
    $("#loadingPage").fadeOut();
    if ($('#showAll').text() != null && $('#showAll').text() != "" && typeof ($('#showAll').text()) != "undefined") {
        $('#showAll > a:last').trigger("click");
    }
    else {
        location = location;//"/Contracts/Documents";
    }
}
//manoj

//Sridhar
function DisableCCUsers(vMetadatavaluetofinalize) {
    var globalConOwners = getGlobalContractOwners();
    var ConMgr = $(vMetadatavaluetofinalize).find("ContractManagers").text();
    var Approvers = $(vMetadatavaluetofinalize).find("Approvers").text();
    var Reviewers = $(vMetadatavaluetofinalize).find("Reviewers").text();
    var Signees = $(vMetadatavaluetofinalize).find("Signees").text();
    var ContractAreaAdministrators = $(vMetadatavaluetofinalize).find("ContractAreaAdministrators").text();
    var BusinessAreaOwners = $(vMetadatavaluetofinalize).find("BusinessAreaOwners").text();
    var ReadOnlyPermissions = $(vMetadatavaluetofinalize).find("ReadOnlyPermissions").text();
    var ReadWritePermissions = $(vMetadatavaluetofinalize).find("ReadWritePermissions").text();
    var FullControlPermissions = $(vMetadatavaluetofinalize).find("FullControlPermissions").text();
    var ProjectManager = $(vMetadatavaluetofinalize).find("ProjectManager").text();
    var contractPeople = (ConMgr
        + ";" + Approvers
        + ";" + Reviewers
        + ";" + Signees
        + ";" + ContractAreaAdministrators
        + ";" + BusinessAreaOwners
        + ";" + ReadOnlyPermissions
        + ";" + ReadWritePermissions
        + ";" + FullControlPermissions
        + ";" + ProjectManager
        + ";" + globalConOwners).split(';');
    contractPeople = $.map(contractPeople, $.trim);
    contractPeople = contractPeople.filter(function (people) { return people.trim() != ''; });
    var myArray = $("#ddlCC>option").map(function () { return $(this).val(); }).get();
    if (myArray == null)
        myArray = [];
    $.each(myArray, function (i, item) {
        if (contractPeople.indexOf(item) < 0)
            $('#ddlCC option[value="' + item + '"]').attr('disabled', 'disabled');
        else
            $('#ddlCC option[value="' + item + '"]').removeAttr('disabled');
    });
    $("#ddlCC").trigger('chosen:updated');
}

function getGlobalContractOwners() {
    var gloablconowners = "";
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/usersbyusertype?usertype=Global Contract Owner',
        type: 'GET',
        dataType: 'json',
        cache: false,
        async: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (userdetails) {
            $(userdetails).each(function (i, item) {
                if (gloablconowners == "")
                    gloablconowners = item.UserName;
                else
                    gloablconowners += ";" + item.UserName;
            });
        },
        error:
            function (userdetails) {
            }
    });
    return gloablconowners;
}

function ViewLegalEntity() {
    LegalEntityFunc();
    $('#loadCP').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
}

function LegalEntityFunc() {
    $("#loadingPage").fadeIn();
    $("#liSelectedLegalEntity").empty();
    $('#loadGenLegalEntity').html('')
    var SelectedLEList = [];
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/legalentities',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            LeagalEntity = data;
            //   CounterPartyArrayprev = [];
            $.each($('#CompanyProfile').val().replace("; ", ";").split(";"), function () {
                if (SelectedLEList.indexOf($.trim(this)) == -1)
                    SelectedLEList.push($.trim(this));
            });

            var myLEArrayList = [];
            var obj1 = {};

            $(data).each(function (idata, itemdata) {
                myLEArrayList.push(itemdata);
            });
            //manoj

            var article = '<thead><tr><th style="height:24px"><input id="selectallLE" onclick="funselectallLE(this);" type="checkbox"/> Legal Entity</th><th style="height:24px">Default Currency</th><th>Authorized Signatory(ies)</th></tr></thead><tbody>';
            //manoj 
            var countryvalue = ''
            $(myLEArrayList).each(function (iArray, itemArray) {
                article += '<tr><td>';
                if (SelectedLEList.length > 0) {
                    if (SelectedLEList.indexOf(itemArray.LegalEntityName.trim()) > -1) {
                        article += '<input id="' + itemArray.RowKey + '" type="checkbox" name="CompanyProfile" onclick="checkMultipleDocumentsLE(this);" checked class="css1-checkbox" value="' + escape(itemArray.LegalEntityName.trim()) + '" />';
                    }
                    else {
                        article += '<input id="' + itemArray.RowKey + '" type="checkbox" name="CompanyProfile" onclick="checkMultipleDocumentsLE(this);"  class="css1-checkbox" value="' + escape(itemArray.LegalEntityName.trim()) + '" />';
                    }
                }
                else {
                    article += '<input id="' + itemArray.RowKey + '" type="checkbox" name="CompanyProfile" onclick="checkMultipleDocumentsLE(this);"  class="css1-checkbox" value="' + escape(itemArray.LegalEntityName.trim()) + '" />';
                }
                article += '<label for="CP' + itemArray.RowKey + '" class="css1-label" title="' + escape(itemArray.LegalEntityName.trim()) + '"  onmouseover="UnescapeNameMouseOver(this)" style="display: inline;">' + itemArray.LegalEntityName.trim() + '</label></td>';
                article += '<td>' + itemArray.DefaultCurrency + '</td>';
                AuthorizedSignatory = itemArray.AuthorizedSignatory != "" ? itemArray.AuthorizedSignatory : "-"
                article += '<td>' + AuthorizedSignatory + '</td>';
                article += '</tr>';
            });
            //manoj
            $("#listLEWrapper").html('<table id="tblLE" class="f_list"></table>');
            $("#tblLE").html(article);

            _alphabetSearch = '';
            $("#tblLE").DataTable({
                "columnDefs": [
                    { "orderable": false, 'targets': "_all" }
                ],
                "fnDrawCallback": function () { eventFired('CompanyProfile', 'selectallLE', 'tblLE'); },
                "iDisplayLength": 20,
                "searchHighlight": true,
                "pagingType": "full_numbers",
                //"scrollY": "420px",
                //"scrollCollapse": true,
            });
            alphabeticselection('tblLE');
            article = '';
            //manoj
            if ($('input:checkbox[name="CompanyProfile"]:checked').length == $('input:checkbox[name="CompanyProfile"]').length && $('input:checkbox[name="CompanyProfile"]:checked').length != 0) {
                $("#selectallLE").attr('checked', true);
            } else {
                $("#selectallLE").attr('checked', false);
            }
            $.each(SelectedLEList, function () {
                if (typeof ($.trim(this)) != 'undefined' && $.trim(this) != null && $.trim(this) != "") {
                    $('#liSelectedLegalEntity').append('<span style="font-size:13px;">' + $.trim(this) + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelectedLE(this);" style="float:right" /></span>');
                }
            });
            // Find and remove item from an array
            $("#browseLegalEntity").dialog("option", "title", "Legal Entity Picker");
            $("#browseLegalEntity").dialog("open");
            $("#loadingPage").fadeOut();
        },
        error: function () {
            $("#listLEWrapper").html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>');
            $("#browseLegalEntity").dialog("option", "title", "Legal Entity Picker");
            $("#browseLegalEntity").dialog("open");
            $("#loadingPage").fadeOut();
        }
    });
}

function funselectallLE(obj) {
    if (obj.checked) { // check select status  
        $('input:checkbox[name=CompanyProfile]').attr('checked', true);
    } else {
        $('input:checkbox[name=CompanyProfile]').attr('checked', false);
    }
    checkMultipleDocumentsLE("");
}

function checkMultipleDocumentsLE(object) {
    //manoj
    var arrselectedLE = [];
    $.each($('#liSelectedLegalEntity').children(), function () {
        if (arrselectedLE.indexOf($.trim(this.textContent)) == -1)
            arrselectedLE.push($.trim(this.textContent));
    });
    $('#liSelectedLegalEntity').empty();

    var tablebind = $('#tblLE').DataTable();
    $.each($('input:checkbox[name="CompanyProfile"]', tablebind.rows().nodes()), function () {
        if (typeof ($.trim(this)) != 'undefined' && $.trim(this) != null) {
            if ($.trim(this.value) != "") {
                if (this.checked) {
                    if (arrselectedLE.indexOf(unescape($.trim(this.value))) == -1) {
                        arrselectedLE.push(unescape($.trim(this.value)))
                    }
                } else if (arrselectedLE.indexOf(unescape($.trim(this.value))) > -1) {
                    arrselectedLE.splice(arrselectedLE.indexOf(unescape($.trim(this.value))), 1);
                }
            }
        }
    });
    arrselectedLE.sort();
    $.each(arrselectedLE, function () {
        $('#liSelectedLegalEntity').append('<span style="font-size:13px;">' + $.trim(this) + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelectedLE(this);" style="float:right" /></span>');
    });
    arrselectedLE = [];

    //manoj
    if ($('input:checkbox[name="CompanyProfile"]:checked').length == $('input:checkbox[name="CompanyProfile"]').length && $('input:checkbox[name="CompanyProfile"]:checked').length != 0) {
        $("#selectallLE").attr('checked', true);
    } else {
        $("#selectallLE").attr('checked', false);
    }

    try {
        hideAllMenuAndStopPro(event);
    }
    catch (ex) {

    }
}

function liRemoveSelectedLE(obj) {
    var child = obj.parentNode;
    var tablebind = $('#tblLE').DataTable();
    $.each($('input:checkbox[name="CompanyProfile"]:checked', tablebind.rows().nodes()), function () {
        if (typeof ($.trim(this)) != 'undefined' && $.trim(this) != null) {
            if (unescape($.trim(this.value)) == child.textContent) {
                this.checked = false;
            }
        }
    });
    child.parentNode.removeChild(child);

    if ($('input:checkbox[name="CompanyProfile"]:checked').length == $('input:checkbox[name="CompanyProfile"]').length && $('input:checkbox[name="CompanyProfile"]:checked').length != 0) {
        $("#selectallLE").attr('checked', true);
    } else {
        $("#selectallLE").attr('checked', false);
    }

}

function AddLE() {
    var arrselectedLE = [];
    $.each($('#liSelectedLegalEntity').children(), function () {
        if (typeof ($.trim(this)) != 'undefined' && $.trim(this) != null && $.trim(this.textContent) != "") {
            if (arrselectedLE.indexOf($.trim(this.textContent)) == -1)
                arrselectedLE.push($.trim(this.textContent));
        }
    });
    if (arrselectedLE.length > 0) {
        $("#CompanyProfile").val(arrselectedLE.join("; "));
        // Removetextvalues();

    } else {
        $("#CompanyProfile").val('');
        // Removetextvalues();

    }
    arrselectedLE = [];
    $("#browseLegalEntity").dialog("close");
    // ClearAddCounterparty();
    //  $('#chkCounterpartyNotInList').prop('checked', false);

    $('#dvCPExistingLegalEntity').css("display", "");
}

//manoj
function CheckFolderExist() {
    if ($("#txtNewFolderName").val() != "" && $("#txtContractRecElementID").val() != "") {
        if ($("#txtNewFolderName").val().replace(/\s\s+/g, " ").toLowerCase().trim() != "new folder" && $("#txtNewFolderName").val().replace(/\s\s+/g, " ").toLowerCase().trim() != "amendments") {
            if (($('#lblFolderUrl').text().match(/\//g) || []).length > 2) {
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/childdocuments?contractid=' + $("#txtContractRecElementID").val() + '&folderurl=' + $('#lblFolderUrl').text(),
                    type: 'GET',
                    cache: false,
                    contentType: false,
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    success: function (childdocument) {
                        var documentresult = $.grep(childdocument, function (n, i) {
                            return (n.DocumentName.toLowerCase() == $("#txtNewFolderName").val().replace(/\s\s+/g, " ").toLowerCase().trim());
                        });

                        if (documentresult.length > 0) {
                            $("#loadingPage").fadeOut();
                            $('.pop_up_Content_Green').parent().removeAttr('disabled');
                            swal("", "Folder name <span style='font-weight:700'>" + $("#txtNewFolderName").val().replace(/\s\s+/g, " ").trim() + "</span> already exists (or) Reserved.");
                        } else {
                            CheckDocumentExist();
                        }
                    },
                    error: function (childdocument) {
                        CheckDocumentExist();
                    }
                });
            } else {
                CheckDocumentExist();
            }
        } else {
            $("#loadingPage").fadeOut();
            $('.pop_up_Content_Green').parent().removeAttr('disabled');
            swal("", "Folder name <span style='font-weight:700'>" + $("#txtNewFolderName").val().replace(/\s\s+/g, " ").trim() + "</span> already exists (or) Reserved.");
        }
    } else {
        CheckDocumentExist();
    }
}

function currentrelatedcounterparty(obj) {
    if (curRelatedCounterparities.length > 0) {
        var curRelCuntprty = $.grep(curRelatedCounterparities, function (ncurRelatedCounterparities, icurRelatedCounterparities) {
            return (ncurRelatedCounterparities.RowKey != obj.id);
        });
        curRelatedCounterparities = curRelCuntprty;
    }
    if (obj != "" && obj.checked == true) {
        curRelatedCounterparities.push(
            {
                RowKey: obj.id,
                CounterpartyName: unescape(obj.value),
                ChildRelationship: $(obj).parent().parent().children(".ddl").find('option:selected').text()
            });
    }
    //Add the List
    addselectedcounterparties();
    //Add the List
    //}
}

function changecounterpartychildrelationship(obj) {
    if (curRelatedCounterparities.length > 0) {
        var curRelCuntprty = $.grep(curRelatedCounterparities, function (ncurRelatedCounterparities, icurRelatedCounterparities) {
            return (ncurRelatedCounterparities.ChildRelationship = obj);
        });
        curRelatedCounterparities = curRelCuntprty;
        //Add the List
        addselectedcounterparties();
        //Add the List
    }
}

function addselectedcounterparties() {
    var SelectedCounterpartiesHTML = "";
    $(curRelatedCounterparities).each(function (i, item) {
        SelectedCounterpartiesHTML += '<span style="font-size:11px;" id=' + item.RowKey + '>' + item.CounterpartyName + ' (' + item.ChildRelationship + ') <img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveCounterPartyRelationshipselected(this);" style="float:right" /></span>'
    });
    $('#liSelectedCounterparties').html(SelectedCounterpartiesHTML);
}

//function liRemoveCounterPartyRelationshipselected(obj) {
//    var child = obj.parentNode;
//    var relatedcounterpartyidtodelete = child.id;
//    $("input[id='" + child.id + "'][name='RelatedCounterparty']:checkbox").prop('checked', false);
//    $("input[id='" + child.id + "'][name='RelatedCounterparty']:checkbox").trigger("onchange");
//}

function liRemoveCounterPartyRelationshipselected(obj) {
    var child = obj.parentNode;
    var relatedcounterpartyidtodelete = child.id;
    var allow = false;
    try {
        if (typeof ($("input[id='" + child.id + "'][name='RelatedCounterparty']:checkbox")) != 'undefined') {
            if ($("input[id='" + child.id + "'][name='RelatedCounterparty']:checkbox").length != 0) {
                $("input[id='" + child.id + "'][name='RelatedCounterparty']:checkbox").prop('checked', false);
                var dsfdsfsd = $("input[id='" + child.id + "'][name='RelatedCounterparty']:checkbox");
                $(dsfdsfsd).parent().parent().children(".ddl").empty();
                $("input[id='" + child.id + "'][name='RelatedCounterparty']:checkbox").trigger("onchange");
            } else {
                allow = true;
            }
        } else {
            allow = true;
        }
    } catch (excp) {
        allow = true;
    }
    if (allow) {
        if (curRelatedCounterparities.length > 0) {
            var curRelCuntprty = $.grep(curRelatedCounterparities, function (ncurRelatedCounterparities, icurRelatedCounterparities) {
                return (ncurRelatedCounterparities.RowKey != child.id);
            });
            curRelatedCounterparities = curRelCuntprty;
        }
        //Add the List
        addselectedcounterparties();
        //Add the List
    }
}
//manoj

//Sridhar
function CreateRelatedContractsList(page) {
    $("#tblPopupContracts").empty();
    var startIndex = page * 10;
    var endIndex = startIndex + 10;
    if (endIndex > listRelatedContracts.length) endIndex = listRelatedContracts.length;
    //$("#spResult").html((startIndex + 1) + '&nbsp;to&nbsp;' + endIndex + '&nbsp;of&nbsp;' + listRelatedContracts.length);
    for (var i = startIndex; i < endIndex; i++) {
        var item = listRelatedContracts[i];
        if (selectedcontractid.indexOf(item.RowKey) > -1) { }
        else {
            if (arroldRelatedcontract.indexOf(item.ContractTitle.trim()) >= 0) {

            } else if (SavedRelatedContract.indexOf(item.ContractTitle.trim()) == -1) {
                var article = '<tr><td>';
                if (arr.indexOf(item.ContractTitle.trim()) >= 0) {
                    article += '<input id="' + item.RowKey + '" type="checkbox" name="RelatedContract" onchange="javascript:collectrelatedcontractrowkey(this);" class="css1-checkbox" value="' + item.ContractTitle + '" checked />';
                } else {
                    article += '<input id="' + item.RowKey + '" type="checkbox" name="RelatedContract" onchange="javascript:collectrelatedcontractrowkey(this);" class="css1-checkbox" value="' + item.ContractTitle + '" />';
                }
                article += '<label for="' + item.RowKey + '" class="css1-label PreserveSpace">' + item.ContractTitle + '</label>';
                article += '</td>';
                article += '<td><label class="">' + item.ContractType + '</label></td>'
                article += '<td><label class="">'
                if (item.Counterparty != null && item.Counterparty != "") {
                    article += item.Counterparty
                } else {
                    article += "-"
                }
                article += '</label></td><td><label class="" style="word-break: break-all;">'
                if (item.ContractNumber != null && item.ContractNumber != "") {
                    article += item.ContractNumber
                } else {
                    article += "-"
                }
                article += '</label></td><td><label class="">' + item.Status + '</label></td>'
                if (arr.indexOf(item.ContractTitle.trim()) >= 0) {
                    var indexvaluetake = arr.indexOf(item.ContractTitle.trim());
                    var relationtypefetch = RelatedRelationshipTypearr[indexvaluetake];
                    article += "<td class='ddl'><select class='f_inpt width90' onchange='collectrelatedcontractrowkey(null)'>";
                    var jsLang = $("#ddlRelationshipTypeParent option:selected").val();
                    switch (jsLang) {
                        case 'Master Agreement':
                            if (relationtypefetch == "Sub-Agreement") {
                                article += '<option value="Sub-Agreement" selected>Sub-Agreement</option>';
                                article += '<option value="SOW">SOW</option>';
                            }
                            else {
                                article += '<option value="Sub-Agreement" >Sub-Agreement</option>';
                                article += '<option value="SOW" selected>SOW</option>';
                            }
                            break;
                        case 'Sub-Agreement':
                        case 'SOW':
                            article += '<option value="Master Agreement">Master Agreement</option>';
                            break;
                        case 'Prime Contractor Agreement':
                            article += '<option value="Sub Contractor Agreement">Sub Contractor Agreement</option>';
                            break;
                        case 'Sub Contractor Agreement':
                            article += '<option value="Prime Contractor Agreement">Prime Contractor Agreement</option>';
                            break;
                        case 'Blanket Agreement':
                            if (relationtypefetch == "Order") {
                                article += '<option value="Order" selected>Order</option>';
                                article += '<option value="Invoice">Invoice</option>';
                            }
                            else {
                                article += '<option value="Order">Order</option>';
                                article += '<option value="Invoice" selected>Invoice</option>';
                            }

                            break;
                        case 'Order':
                        case 'Invoice':
                            article += '<option value="Blanket Agreement">Blanket Agreement</option>';
                            break;
                        case 'Original':
                            if (relationtypefetch == "Duplicate") {
                                article += '<option value="Duplicate" selected>Duplicate</option>';
                                article += '<option value="Copy">Copy</option>';
                            }
                            else {
                                article += '<option value="Duplicate">Duplicate</option>';
                                article += '<option value="Copy" selected>Copy</option>';
                            }
                            break;
                        case 'Duplicate':
                        case 'Copy':
                            article += '<option value="Original">Original</option>';
                            break;
                        case 'Past Contract':
                            article += '<option value="Renegotiated Contract">Renegotiated Contract</option>';
                            break;
                        case 'Renegotiated Contract':
                            article += '<option value="Past Contract">Past Contract</option>';
                            break;
                        case 'Primary Contract':
                            if (relationtypefetch == "Amendment") {
                                article += '<option value="Amendment" selected>Amendment</option>';
                                article += '<option value="Modification">Modification</option>';
                            }
                            else {
                                article += '<option value="Amendment">Amendment</option>';
                                article += '<option value="Modification" selected>Modification</option>';
                            }
                            break;
                        case 'Amendment':
                        case 'Modification':
                            article += '<option value="Primary Contract">Primary Contract</option>';
                            break;
                        case 'Other':
                            article += '<option value="Other">Other</option>';
                            break;
                    }

                    article += '</select><td></tr>';
                }
                else {
                    article += '<td class="ddl"><td></tr>'
                }
                $("#tblPopupContracts").append(article);
                relatedContractsTag.push(item.ContractTitle.trim());
                $("#" + item.RowKey).click(function () {
                    if (this.checked) {
                        if ($(this).parent().parent().children(".ddl").find('option').length == 0) {
                            var vOptions = "<select class='f_inpt width90' onchange='collectrelatedcontractrowkey(null)'>";
                            var jsLang = $("#ddlRelationshipTypeParent option:selected").val();
                            var jsLangType = $("#ddlRelationshipType option:selected").val();
                            var rela1 = jQuery.grep(RelationshipTypes, function (a) {
                                return (a[1] === jsLang && a[0] === jsLangType);
                            });
                            var rela2 = jQuery.grep(RelationshipTypes, function (a) {
                                return (a[2].indexOf(jsLang) > -1 && a[0] === jsLangType);
                            });
                            if (rela1 != null && typeof (rela1) != "undefined" && rela1.length != 0) {
                                var Relationship = rela1[0];
                                $.each(Relationship[2], function (index, value) {
                                    var optRel2 = value.toString();
                                    vOptions += "<option value='" + optRel2 + "'>" + optRel2 + "</option>";
                                })
                                if ($(Relationship[2]).length == 0) {
                                    var optRel2 = Relationship[1].toString();
                                    vOptions += "<option value='" + optRel2 + "'>" + optRel2 + "</option>";
                                }
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

                        }
                    } else {

                        $(this).parent().parent().children(".ddl").empty();
                    }

                });
            }
        }
    }
}

//manoj
function Opendocinbrowser(docurl) {
    if (Checkbrowsernameandversion()) {
        var settings = {
            pattern: /\.[0-9a-z]+$/i,
            knownfiletypes: ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'zip', 'rar', 'gzip', 'arj', 'wav', 'mp3', 'aif', 'aiff', 'm4a', 'ogg', 'wma', 'psd', 'ai', 'swf', 'fla', 'css', 'js', 'avi', 'mov', 'wmv', 'dotx'],
            wopiframefiletypes: ['doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx', 'dotx']
        };

        var ext = docurl.match(settings.pattern);
        if (ext != null) {
            if (ext.length > 0) { ext = ext[0].slice(1); }
            if (decodeURIComponent(docurl).toLowerCase().indexOf(localStorage.SPHostUrl.toLowerCase()) >= 0) {
                if (jQuery.inArray(ext, settings.wopiframefiletypes) > -1) {
                    docurl = localStorage.SPHostUrl + "/_layouts/wopiframe.aspx?sourcedoc=" + docurl + "&action=default";
                } else {
                    docurl = decodeURIComponent(docurl);
                }
                window.open(docurl);
            }
        }
    } else {
        location = localStorage.SPHostUrl + "/_layouts/15/download.aspx?SourceUrl=" + docurl;
    }
}

function Checkbrowsernameandversion() {
    var Openinbrowser = true;
    //if (bowser.msie) {
    //    if (bowser.version == 10) {
    //        Openinbrowser = false;
    //    }
    //}
    return Openinbrowser;
}
//manoj
function CreateAdvanceView() {
    $("#btnAdvanceViewSaveAs").css("display", "none");
    $("#btnUpdateAdvanceView").css("display", "none");
    $("#addNewAdvanceView").dialog({ 'title': 'Create View' });
    $("#btnCreateAdvanceView").css("display", "");
    $("#addNewAdvanceView").dialog("open");
}

function getSearchableContractFields() {
    //metadataLookUp.push("Document Type");
    //metadataLookUp.push("Creation Mode");
    var creationMode = [];
    creationMode.push("Upload");
    creationMode.push("Template");

    var objMetadata = {};
    objMetadata.value = "Document Type";
    objMetadata.fieldType = "Choice";
    objMetadata.choiceValues = listDocumentTypes;
    objMetadata.fieldName = "DocumentType";
    objMetadata.label = objMetadata.value;

    metadataLookUp.push(objMetadata);

    var objMetadata = {};
    objMetadata.value = "Creation Mode";
    objMetadata.fieldType = "Choice";
    objMetadata.choiceValues = creationMode;
    objMetadata.fieldName = "CreationMode";
    objMetadata.label = objMetadata.value;

    metadataLookUp.push(objMetadata);
    //var searchXml = "";
    //$.ajax({
    //    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/getGlobalFields',
    //    type: 'GET',
    //    dataType: 'json',
    //    'Content-Type': 'application/json',
    //    cache: false,
    //    headers: { 'eContracts-ApiKey': localStorage.APIKey },
    //    success: function (data) {
    //        searchXml = data.SearchFields;
    //        metadataLookUp = [];
    //        $(searchXml).find('Field').each(function (index, value1) {
    //            var objMetadata = {};
    //            objMetadata.value = $(value1).find('FieldDisplayName').text();
    //            objMetadata.fieldType = $(value1).find('FieldType').text();
    //            objMetadata.choiceValues = $(value1).find('ChoiceValues').text();
    //            objMetadata.fieldName = $(value1).find('FieldName').text();
    //            objMetadata.label = objMetadata.value;
    //            metadataLookUp.push(objMetadata);
    //        });
    //        $("#metadata_label_0").autocomplete({
    //            source: metadataLookUp,
    //            minLength: 0,
    //            select: function (event, ui) {
    //                $("#metadata_value_0").val(ui.item.fieldName)
    //                $("#metadata_type_0").val(ui.item.fieldType)
    //                currentAutoCompleteUiObj = ui;
    //                //if (ui.item.fieldType =="Date")
    //                createOperatorsBasedOnMetdataType(ui.item.fieldType, 0);
    //                createValueFieldBasedOnFieldType(ui.item.fieldType, ui.item.choiceValues, 0);
    //            },
    //        }).focus(function () {
    //            $(this).autocomplete('search', $(this).val())
    //        });
    //    },
    //    error: function (data) {
    //        $("#loadingPage").fadeOut();
    //    }
    //});



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
    }).focus(function () {
        $(this).autocomplete('search', $(this).val())
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
        row += '<span>';
        row += '<select  id="operator_' + (id + 1) + '"' + 'type="text" class="width100 validelement" onchange="validateFilterValue(this)">' +
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
    if (previousRowId < 1) {
        $("#btnAddNewAdFilter").css("display", "none");
    }
}

function removefilterCondition(objRow) {
    $(objRow).parent().parent().parent().remove();
    if ($("#tblfilterConditions tr").length <= 1) {
        $("#btnAddNewAdFilter").css("display", "");
    }
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
    var creationMode = [];
    //creationMode.push("All");
    creationMode.push("Uploaded");
    creationMode.push("Template");

    if ($('#metadata_label_' + rowid).val() == "Document Type") {
        var control = "";
        control = "<span>" + "<input type='text' id=choice_value_" + rowid + " class='validelement'/>" + "</span>"
        $("#tr_" + rowid + " td:nth-child(4)").html("");
        $("#tr_" + rowid + " td:nth-child(4)").append(control);
        $("#choice_value_" + rowid).autocomplete({
            minLength: 0,
            source: function (request, response) {
                response($.ui.autocomplete.filter(
                  listDocumentTypes, extractLast(request.term)));
            },
            focus: function () {
                return false;
            },
            select: function (event, ui) {
                var terms = split(this.value);
                terms.pop();
                if ($.inArray(ui.item.value, terms) == -1) {
                    terms.push(ui.item.value);
                    terms.push("");
                    this.value = terms.join(",");
                }
                return false;
            }

        }).focus(function () {
            $(this).autocomplete('search', $(this).val())
        });

    }
    else if ($('#metadata_label_' + rowid).val() == "Creation Mode") {
        var control = "";
        control = "<span>" + "<input type='text' id=choice_value_" + rowid + " class='validelement'/>" + "</span>"
        $("#tr_" + rowid + " td:nth-child(4)").html("");
        $("#tr_" + rowid + " td:nth-child(4)").append(control);
        $("#choice_value_" + rowid).autocomplete({
            minLength: 0,
            source: function (request, response) {
                response($.ui.autocomplete.filter(
                  creationMode, extractLast(request.term)));
            },
            focus: function () {
                return false;
            },
            select: function (event, ui) {
                var terms = split(this.value);
                terms.pop();
                if ($.inArray(ui.item.value, terms) == -1) {
                    terms.push(ui.item.value);
                    terms.push("");
                    this.value = terms.join(",");
                }
                return false;
            }

        }).focus(function () {
            $(this).autocomplete('search', $(this).val())
        });
    }
    //var control = "";
    //control = "<span>" + "<input type='text' id=choice_value_" + rowid + " class='validelement'/>" + "</span>"
    //$("#tr_" + rowid + " td:nth-child(4)").html("");
    //$("#tr_" + rowid + " td:nth-child(4)").append(control);
    //$("#choice_value_" + rowid).autocomplete({
    //    minLength: 0,
    //    source: function (request, response) {
    //        response($.ui.autocomplete.filter(
    //          choiceSource, extractLast(request.term)));
    //    },
    //    focus: function () {
    //        return false;
    //    },
    //    select: function (event, ui) {
    //        var terms = split(this.value);
    //        terms.pop();
    //        if ($.inArray(ui.item.value, terms) == -1) {
    //            terms.push(ui.item.value);
    //            terms.push("");
    //            this.value = terms.join(",");
    //        }
    //        return false;
    //    }

    //}).focus(function () {
    //    $(this).autocomplete('search', $(this).val())
    //});

    //switch (fieldType) {
    //    case "Date": control = "<span>" + "<input readonly id=date_value_" + rowid + " type='text'  class='f_textinput width90 validelement' />" + "</span>";
    //        $("#tr_" + rowid + " td:nth-child(4)").html("");
    //        $("#tr_" + rowid + " td:nth-child(4)").append(control);
    //        var DatepickerFormat = '';
    //        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
    //            DatepickerFormat = 'mm/dd/yy';
    //        }
    //        else {
    //            DatepickerFormat = localStorage.AppDateFormat.toLowerCase().slice(0, -2);
    //        }
    //        $("#date_value_" + rowid).datepicker({ changeMonth: true, changeYear: true, dateFormat: DatepickerFormat });
    //        break;

    //    case "Choice":
    //    case "Multi- Choice (Dropdown)":
    //        //control = "<span>" + "<select data-placeholder='--Select--' id=choice_value_" + rowid + " class='validelement' multiple>"
    //        control = "<span>" + "<input type='text' id=choice_value_" + rowid + " class='validelement'/>" + "</span>"
    //        //var options = "";
    //        var choices = choiceValues.split('\n');
    //        var choiceSource = [];
    //        if (choices.length > 0) {
    //            choices.forEach(function (value, index) {
    //                //options += "<option value=" + "'" + value + "'" + ">" + value + "</option>";
    //                var obj = {}
    //                obj.label = value;
    //                obj.value = value;
    //                choiceSource.push(obj);
    //            });
    //            //control += options + "</select>" + "</span>";
    //            $("#tr_" + rowid + " td:nth-child(4)").html("");
    //            $("#tr_" + rowid + " td:nth-child(4)").append(control);
    //            //$("#choice_value_" + rowid).chosen().trigger("chosen:updated");
    //            $("#choice_value_" + rowid).autocomplete({
    //                minLength: 0,
    //                source: function (request, response) {
    //                    response($.ui.autocomplete.filter(
    //                      choiceSource, extractLast(request.term)));
    //                },
    //                focus: function () {
    //                    return false;
    //                },
    //                select: function (event, ui) {
    //                    var terms = split(this.value);
    //                    terms.pop();
    //                    if ($.inArray(ui.item.value, terms) == -1) {
    //                        terms.push(ui.item.value);
    //                        terms.push("");
    //                        this.value = terms.join(",");
    //                    }
    //                    return false;
    //                }

    //            }).focus(function () {
    //                $(this).autocomplete('search', $(this).val())
    //            });
    //        }
    //        break;

    //    case "User":
    //        control = "<span>" + "<input type='text' id=user_value_" + rowid + " class='validelement'/>" + "</span>";
    //        //control = "<span>" + "<select id=user_value_" + rowid + " class='width100 validelement'>"
    //        //var options = "";
    //        var peopleSource = [];
    //        if (peoples.length > 0) {
    //            peoples.forEach(function (value, index) {
    //                // options += "<option value=" + "'" + value.UserName + "'" + ">" + value.UserName + "</option>";
    //                var obj = {};
    //                obj.label = value.UserName;
    //                obj.value = value.UserName;
    //                peopleSource.push(obj);
    //            });
    //            //control += options + "</select>" + "</span>";
    //            $("#tr_" + rowid + " td:nth-child(4)").html("");
    //            $("#tr_" + rowid + " td:nth-child(4)").append(control);
    //            $("#user_value_" + rowid).autocomplete({
    //                minLength: 0,
    //                source: function (request, response) {
    //                    response($.ui.autocomplete.filter(
    //                      peopleSource, extractLast(request.term)));
    //                },
    //                focus: function () {
    //                    return false;
    //                },
    //                select: function (event, ui) {
    //                    var terms = split(this.value);
    //                    terms.pop();
    //                    if ($.inArray(ui.item.value, terms) == -1) {
    //                        terms.push(ui.item.value);
    //                        terms.push("");
    //                        this.value = terms.join(",");
    //                    }
    //                    return false;
    //                }

    //            }).focus(function () {
    //                $(this).autocomplete('search', $(this).val())
    //            });

    //            //$("#user_value_" + rowid).trigger("chosen:updated");
    //        }

    //        break;
    //    case "Yes/No":
    //        var options = "";
    //        control = '<span>' + '<select id=YesNo_value_' + rowid + ' class="width100 validelement"> ';
    //        options += "<option value='Yes'>Yes</option>";
    //        options += "<option value='No'>No</option>";
    //        control += options + "</select>" + '</span>';
    //        $("#tr_" + rowid + " td:nth-child(4)").html("");
    //        $("#tr_" + rowid + " td:nth-child(4)").append(control);
    //        $("#YesNo_value_" + rowid).trigger("chosen:updated");

    //        break;
    //    case "Value / Financials":
    //        control = '<span>' + '<input id="num_value_' + rowid + '"' + 'type="text" class="f_textinput width90 validelement validnumber" />' + '</span>';
    //        $("#tr_" + rowid + " td:nth-child(4)").html("");
    //        $("#tr_" + rowid + " td:nth-child(4)").append(control);
    //        break;
    //    default: control = '<span>' + '<input id="text_value_' + rowid + '"' + 'type="text" class="f_textinput width90 validelement" />' + '</span>';
    //        $("#tr_" + rowid + " td:nth-child(4)").html("");
    //        $("#tr_" + rowid + " td:nth-child(4)").append(control);
    //        break;

    //}
}

function split(val) {
    return val.split(/,\s*/);
}

function extractLast(term) {
    return split(term).pop();
}

function editAdvanceView() {
    if (metadataLookUp.length == 0) {
        $("#loadingPage").fadeIn();
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/getGlobalFields',
            type: 'GET',
            dataType: 'json',
            'Content-Type': 'application/json',
            cache: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            success: function (data) {
                searchXml = data.SearchFields;
                metadataLookUp = [];

                $(searchXml).find('Field').each(function (index, value) {
                    var objMetadata = {};
                    objMetadata.value = $(value1).find('FieldDisplayName').text();
                    objMetadata.fieldType = $(value1).find('FieldType').text();
                    objMetadata.choiceValues = $(value1).find('ChoiceValues').text();
                    objMetadata.fieldName = $(value1).find('FieldName').text();
                    objMetadata.label = objMetadata.value;
                    metadataLookUp.push(objMetadata);


                });
                $("#loadingPage").fadeOut();
                appendFiltersOnEdit(currentadvanceViewObj.ViewQuery)
            },
            error: function (data) {
                $("#loadingPage").fadeOut();
            }
        });

    } else {
        $("#loadingPage").fadeIn();
        appendFiltersOnEdit(currentadvanceViewObj.ViewQuery);

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
    //'<td>' +
    //  '<input id="value_0" class="validelement width90" type="text">'+
    //    '</td>'+
       '<td>' + '</td>' + '<td style="text-align: center!important;">' + '</td>' + '</tr>';


    $("#tblfilterConditions").append(tr);

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
    }).focus(function () {
        $(this).autocomplete('search', $(this).val())
    });
}

function validateFilterValue(objthis) {
    var id = $(objthis).attr("id").split('_')[1];
    var rowObj = "";
    if (id == "0")
        rowObj = $(objthis).parent().parent().parent();
    else
        rowObj = $(objthis).parent().parent().parent().parent();
    var rowid = $(rowObj).attr('id').split('_')[1];
    var metadataType = $("#tr_" + rowid + " input:hidden").filter('[id*="metadata_type"]').val();
    var fieldName = $("#tr_" + rowid + " input:hidden").filter('[id*="metadata_value"]').val();
    var obj = metadataLookUp.filter(function (value, index) { return value.fieldType == metadataType && value.fieldName == fieldName });
    currentAutoCompleteUiObj.item = {};
    currentAutoCompleteUiObj.item.fieldType = obj[0].fieldType;
    currentAutoCompleteUiObj.item.choiceValues = obj[0].choiceValues;
    if ($(objthis).val() == "empty" || $(objthis).val() == "any") {
        $("#" + $(rowObj).attr('id') + " td:nth-child(4)").html('');
    } else {
        createValueFieldBasedOnFieldType(currentAutoCompleteUiObj.item.fieldType, currentAutoCompleteUiObj.item.choiceValues, rowid);
    }

    if (($("#metadata_type_" + id).val() == 'Single Line Text' || $("#metadata_type_" + id).val() == 'Multi Line Text' || $("#metadata_type_" + id).val() == 'Choice' || $("#metadata_type_" + id).val() == 'User' || $("#metadata_type_" + id).val() == "Yes/No")
          && ($("#operator_" + id).val() == 'ge' || $("#operator_" + id).val() == 'gt' || $("#operator_" + id).val() == 'lt' || $("#operator_" + id).val() == 'le')) {
        $("#operator_" + id).val("");

    }


}

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

function showQuickViewFilter(viewName) {
    var quickViewObj = quickViews.quickView.filter(function (value, index) { return value.name == viewName });
    if (typeof quickViewObj != 'undefined' && quickViewObj != null && quickViewObj.length > 0) {
        var queryXml = quickViewObj[0].defaultQuery;
        var filterHtml = "";
        $(queryXml).find('filter').each(function (index, node) {
            if (index == 0) {
                metadata = $(node).find('metadataname').text();
                type = $(node).find('metadatatype').text();
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
                value = $(node).find('value').text();
                if (type == 'Created By' && value == '') {
                    value = localStorage.UserName;
                }
                filterHtml += '<span><small >' + metadata + '</small></span>' + '<span><small >' + operator + '</small></span>' + '<span><small >' + value + '</small></span>';
            } else {
                condition = $(node).find('condition').text();
                metadata = $(node).find('metadataname').text();
                type = $(node).find('metadatatype').text();
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
                value = $(node).find('value').text();
                if (type == 'Created By' && value == '') {
                    value = localStorage.UserName;
                }
                filterHtml += ' <span><small>' + condition + '</small></span>' + ' <span><small >' + metadata + '</small></span>' + '<span><small >' + operator + '</small></span>' + '<span><small >' + value + '</small></span>';

            }
        });
        $("#liAdvanceViewFilter").html(filterHtml + '<a style="float:right;" href="javascript:void(0)" onclick="editQuickView()">Edit View</a>');
    }
}

function editQuickView() {
    var viewArr = quickViews.quickView.filter(function (value, index) { return value.name == ObjectNameToSend });
    if (viewArr.length > 0) {
        appendFiltersOnEdit(viewArr[0].defaultQuery, 'Yes');
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
            rvalue = $(value).find('value').text();
            operator = $(value).find('operator').text();

            $("#tr_0 input:text").filter('[id*="metadata_label_"]').val(metadataName);
            $("#tr_0 input:hidden").filter('[id*="metadata_value_"]').val(metadataValue);
            $("#tr_0 input:hidden").filter('[id*="metadata_type_"]').val(metadataType);
            //$("#tr_0 select").filter('[id*="operator_"]').val(operator);

            $("#metadata_label_0").autocomplete({
                source: metadataLookUp,
                minLength: 0,
                select: function (event, ui) {
                    $("#metadata_value_0").val(ui.item.fieldName)
                    $("#metadata_type_0").val(ui.item.fieldType)
                    currentAutoCompleteUiObj = ui;
                    createOperatorsBasedOnMetdataType(ui.item.fieldType, 0)
                    createValueFieldBasedOnFieldType(ui.item.fieldType, ui.item.choiceValues, 0);

                },

            }).focus(function () {
                $(this).autocomplete('search', $(this).val())
            });
        } else {
            insertNewfilterCondition("");
            metadataName = $(value).find('metadataname').text();
            metadataValue = $(value).find('metadatavalue').text();
            metadataType = $(value).find('metadatatype').text();
            rvalue = $(value).find('value').text();
            operator = $(value).find('operator').text();
            condition = $(value).find('condition').text();

            $("#tr_" + rowCounter + " input:text").filter('[id*="metadata_label_"]').val(metadataName);
            $("#tr_" + rowCounter + " input:hidden").filter('[id*="metadata_value_"]').val(metadataValue);
            $("#tr_" + rowCounter + " input:hidden").filter('[id*="metadata_type_"]').val(metadataType);
            //$("#tr_" + rowCounter + " Select").filter('[id*="operator_"]').val(operator);
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
                $("#tr_" + rowCounter + " input:text").filter('[id*="user_value_"]').val(rvalue);
                break;
            case "Choice":
            case "Multi - Choice(Dropdown)":
                $("#tr_" + rowCounter + " input:text").filter('[id*="choice_value_"]').val(rvalue);
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
$("#conAdvanceViewSortBy").on('change', function () {
    if ($(this).val() == "Title(A-Z)" || $(this).val() == "Title(Z-A)") {
        $("#advanceViewSortDirection").css("display", "none");
    } else {
        $("#advanceViewSortDirection").css("display", "");
    }
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
function getDocumentTypes() {
    listDocumentTypes = [];
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documenttypes',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (documenttypes) {
            var datalength = documenttypes.length;
            if (datalength > 0) {
                for (var i = 0; i < datalength; i++) {
                    var item = documenttypes[i];
                    listDocumentTypes.push(item.TypeName);
                }
            }

        },
        error:
            function (data) {

            }
    });
}
function GetData(data) {
    var resultfound = true;
    if (data.length == 0) {
        resultfound = false;
        $('#listDocuments').empty();
        $("#listDocuments").append("<p class='f_p-error'>No items found.</p>");
        $("#compact-pagination").css('display', 'none');
        $("#divChkSelectAll").css('display', 'none');
    } else {
        listDocuments = data;
        CreateDocumentList(0);
        $('#compact-pagination').pagination({
            items: data.length,
            itemsOnPage: 20,
            type: 'ul',
            row: 'li',
            typeID: 'listDocuments',
            cssStyle: 'compact-theme',
            listname: 'Documents'
        });
        //if (ObjectNameToSend == "In Recycle Bin")
        //    $("#divChkSelectAll").css('display', 'none');
        //else
        //    $("#divChkSelectAll").css('display', '');
    }
    return resultfound;
}
$("#buttonfltr").click(function () {
    if ($(".nice-select").hasClass("open")) {
        $('.nice-select').removeClass('open');
    }
});
$('body').click(function () {
    $("#conSortByOptions").niceSelect();
});


function sortArrOfObjectsByParam(arrToSort) {
    arrToSort.sort(function (a, b) {
        var A = a.toUpperCase();
        var B = b.toUpperCase();
        return ((A < B) ? -1 : ((A > B) ? 1 : 0));
    });
    return arrToSort;
}

function checkFileExtension(fileControl) {
    var files = $(fileControl).prop('files');
    if (files.length > 0) {
        var extension = files[0].name.substr(files[0].name.lastIndexOf('.') + 1);
        if (extension == 'zip' || extension == 'ZIP') {
            $('#linkAddValidity').css('display', 'none');
        } else {
            $('#linkAddValidity').css('display', '');
        }
    } else {
        $('#linkAddValidity').css('display', '');
    }
}

function getContract(contractId) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + contractId,
        type: 'GET',
        cache: false,
        async: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
        processData: false,
        success: function (Contractitem) {
            contractItem = Contractitem;
        },
        error: function () {
            $("#loadingPage").fadeOut();
        }
    });
}