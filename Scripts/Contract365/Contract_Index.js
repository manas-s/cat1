
var vCurrencyDisplayStyle = "";
var arrUser = [];
var arrGlobalUser = [];
var arrPermsnUser = [];
var arrAdminUser = [];
//var vContractID = "";
$('#nav li:has(ul)').doubleTapToGo();
var thisBusinessAreaName = "";
var thisContractAreaName = "";
var contractItem = "";
var contractAccessUsers = [];
var multipleChecksDocumentID = [];
var myCounterPartyArray = [];
var CounterPartyArrayprev = [];
var ObjectNameToSend = "";
var recipientsArray = [];
var reportRecipientsDuplicate = [];
var arremail = [];
var arrforcloseoutcheck = [];
var StatusContract = [];
var ContractRoles = [];
//manoj
var contractRoleAccessUsers = [];
//manoj
var FullContractroleUser = [];
var ReadContractroleUser = [];
var ReadWriteContractroleUser = [];
var vRawURLDoc = "";
//Sridhar
var TermTypeDisplayName = {};
var RelationshipTypes = [];

var inRecycle = false;
var approvalWorkflow = "";
var workflowurltoshow = "";
var statusChangeVal = '';
var statusChangeConID = '';
var contractSelected = {
    pages: [{ pageNumber: "", selectedIndexes: [], isAllSelected: false }]
};
var UpdatePermissionCancelled = false;
var rowCounter = 0;
var metadataLookUp = [];
var currentAutoCompleteUiObj = {}
var peoples = [];
var vContractType = [];
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

//manoj
var IsApprovalSheetFeatureExits = false;
var IsContractCoverSheetFeatureExits = false;
var oApprovalNewDocID = "";
var cleartimevalue1;
var thisDocumentLibrarySettings;
//manoj
var defautlSummarySheet = "";
$(function () {
    //get view names from query string
    var vViewName = getParameterByName('View');
    if (vViewName == '') {
        var obj = { name: "All", innerText: "All Contracts" };
        quickViewDisplay(obj);
        $("#filteroptiontype").css('display', 'none');
    }
    else {
        var obj = { name: vViewName, innerText: vViewName };
        quickViewDisplay(obj);
    }
    GetSavedViews();

    $("#aSearchContract").css("background-color", "#f7f7f7");
    $("#mid-section1").click(function () {
        if (!$('#user-vmenu').hide()) {
            $('#user-vmenu').hide();
        }
    });



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


    $("#dvCancelContractMul").dialog({
        autoOpen: false,
        closeText: "",
        width: "60%",
        title: "Cancel Contract Record",
        dialogClass: "popup_width100",
        buttons: {
            "OK": function () {
                CancelContractMul();
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        modal: true
    });

    if (localStorage.UserType == "" || localStorage.UserType == null)
        GetUserPermissionCIndex();
    else {
        if (typeof localStorage.GlobalBusinessAreaLocation !== 'undefined') {
            if (localStorage.GlobalBusinessAreaLocation == "All" || localStorage.GlobalBusinessAreaLocation == "") {
                $("#heading_contracts").text("Contract Records");
                //$("#qvAllContracts").css('display', 'none');
                $(".newContract1").css('display', 'none');
                $(".newContract").css('display', '');

                $("#qvDraft").css('display', '');
                $("#qvSharedContracts").css('display', '');
                $("#qvOwnedByMe").css('display', '');
                $("#qvCreatedByMe").css('display', '');
                $("#qvWithCustomPermissions").css('display', 'none');
                $("#qvInRecycleBin").css('display', 'none');
            } else {
                //if global business area selected, do not show Create Contract menu
                $(".newContract").css('display', 'none');
                if (localStorage.BusinessAreaAccess.indexOf(localStorage.GlobalBusinessAreaLocation) >= 0 || localStorage.UserType.indexOf("Global Contract Owner") >= 0 || localStorage.IsGeneralBusinessArea == "Yes") {
                    $(".newContract1").css('display', '');
                } else { $(".newContract1").css('display', 'none'); $(".newContract").css('display', 'none'); }

                thisContractAreaName = localStorage.GlobalBusinessAreaLocation.split('>')[0].trim();
                thisBusinessAreaName = localStorage.GlobalBusinessArea + ';' + thisContractAreaName;//Business Area +';'+ Contract Area
                $("#dashmain").attr("src", "/Content/images/icon/gen.png");
                $("#heading_contracts").text(localStorage.GlobalBusinessAreaLocation);

                $("#qvDraft").css('display', 'none');
                $("#qvSharedContracts").css('display', 'none');
                $("#qvOwnedByMe").css('display', 'none');
                $("#qvCreatedByMe").css('display', 'none');
                $("#qvWithCustomPermissions").css('display', '');
                $("#qvInRecycleBin").css('display', '');
            }

        } else {
            $("#heading_contracts").text("Contract Records");
            //$("#qvAllContracts").css('display', 'none');
            $(".newContract1").css('display', 'none');
            $(".newContract").css('display', '');

            $("#qvDraft").css('display', '');
            $("#qvSharedContracts").css('display', '');
            $("#qvOwnedByMe").css('display', '');
            $("#qvCreatedByMe").css('display', '');
            $("#qvWithCustomPermissions").css('display', 'none');
            $("#qvInRecycleBin").css('display', 'none');
        }
    }
    $('.AlertEnabled .Toggle').click(function () {
        //EnableSlider()
        var obj = jQuery(this).parent();
        $(obj).toggleClass('switch_enable').toggleClass('switch_disable');
        if ($(obj).hasClass('switch_enable')) {
            obj.children('input').val('Yes').change();
        }
        else {
            obj.children('input').val('No').change();
        }
    });

});
var savedViewNameFromViewTable = "";
var listContracts = [];
$(document).ready(function () {
    $("#divBtn").hide();
    allowOnlyNumberInInputBox("txtDuration");
    allowOnlyNumberInInputBox("txtShareExpInContract");
    allowOnlyNumberInInputBox("txtShareExpIn");
    allowOnlyNumberInInputBox("txtValidLinkTill");//Copy Contract link Enhancment
    colorLink('spnMyContracts', true);
    //vContractID = getParameterByName("ContractID");
    $('.showtip').cluetip({ splitTitle: '|' });
    $("#sample").click(function (e) {
        e.stopPropagation();

        if (!$('#user-vmenu').hide()) {
            $('#user-vmenu').hide();
        } else {
            $('#user-vmenu').show();
        }
    })
    var DatepickerFormat = '';
    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
    { DatepickerFormat = 'mm/dd/yy'; }
    else { DatepickerFormat = localStorage.AppDateFormat.toLowerCase().slice(0, -2); }
    $('#txtNewEndDate').datepicker({
        changeMonth: true,
        changeYear: true,
        minDate: 1,
        dateFormat: DatepickerFormat,
        /* fix buggy IE focus functionality */
        onSelect: function (dateText, inst) {
            $(".ui-datepicker").css('display', 'none');
        }

    }).click(function () { $(this).focus() });
    $('#txtNextRenewalDate').datepicker({
        changeMonth: true,
        changeYear: true,
        minDate: 1,
        /* fix buggy IE focus functionality */
        fixFocusIE: false,
        dateFormat: DatepickerFormat,
        onSelect: function (dateText, inst) {
            $(".ui-datepicker").css('display', 'none');
        }
    }).click(function () { $(this).focus() });
    $("#dvCancelContract").dialog({
        autoOpen: false,
        closeText: "",
        width: "60%",
        title: "Cancel Contract Record",
        dialogClass: "popup_width100",
        buttons: {
            "OK": function () {
                CancelContract();
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        modal: true
    });
    $("#dvCancelContractMul").dialog({
        autoOpen: false,
        closeText: "",
        width: "60%",
        title: "Cancel Contract Record",
        dialogClass: "popup_width100",
        buttons: {
            "OK": function () {
                CancelContractMul();
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        modal: true
    });

    $("#dvAlertDetails1").dialog({
        autoOpen: false,
        closeText: "",
        width: "45%",
        title: "Alert",
        modal: true,

    });

    var ContractTypeMenuLength = 0;
    var ContractTypeItems = [];
    var MoreItemsToAppend = 0;
    var ContractIndexApprovalTextarea = new nicEditor({ buttonList: ['bold', 'italic', 'underline', 'strikethrough', 'left', 'center', 'right', 'justify', 'ol', 'ul', 'fontSize', 'fontFamily', 'fontFormat', 'removeformat', 'hr', 'indent', 'outdent', 'link', 'unlink', 'forecolor', 'bgcolor', 'xhtml'] }).panelInstance('txtComment');
    $('.nicEdit-panelContain').parent().width('100%');
    $('.nicEdit-panelContain').parent().next().width('100%');
    $('.nicEdit-main').width("99%");
    $("#conSortByOptions").niceSelect();
    BindContractTypes();
    //BindContractRelationships();
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
    vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "2" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        if ($("#ddlHistoryFilter option[value='Obligation']").length <= 0)
            $('ddlHistoryFilter').append('<option val="Obligation">Obligation</option>');
    } else {
        if ($("#ddlHistoryFilter option[value='Obligation']").length > 0)
            $("#ddlHistoryFilter option[value='Obligation']").remove();
    }

    //manoj
    //For Contract Summary Sheet
    var vAccFeatApprovalSheet = $.grep(veContractFeatures, function (nApproval, iApproval) {
        return (nApproval.RowKey == "30" && nApproval.Status == "ON");
    });
    if (vAccFeatApprovalSheet.length > 0)
        IsApprovalSheetFeatureExits = true;
    else {
        IsApprovalSheetFeatureExits = false;
    }
    //For Contract Summary Sheet
    var vCoverSheet = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "23" && n.Status == "ON");
    });
    if (vCoverSheet.length > 0) {
        IsContractCoverSheetFeatureExits = true;
    } else {
        IsContractCoverSheetFeatureExits = false;
    }
    //manoj

    //$("#txtSearchBox").focusout(function () {
    //    if ($("#txtSearchBox").val().trim() != null && $("#txtSearchBox").val().trim() != "") {
    //        $("#txtSearchBox").css("width", "300");
    //        $("#txtSearchBox").css("outline", "none");
    //    }
    //    else {
    //        $("#txtSearchBox").css("width", "150");
    //        $("#txtSearchBox").css("outline", "none");
    //    }

    //});

    //$("#txtSearchBox").focus(function () {
    //    $("#txtSearchBox").css("width", "300");
    //    $("#txtSearchBox").css("outline", "none");
    //});
    //CheckLicenseLimits();
    ////Sridhar 
    //BindTermTypes();

    //manoj
    //For Contract Summary Sheet
    $("#addEditApprovalSheetDocument").dialog({
        autoOpen: false,
        closeText: "",
        width: "60%",
        title: "Create Summary/ Approval Sheet",
        dialogClass: "popup_width100",
        height: 400,
        modal: true,
        buttons: {
            "Create": function () {
                uploadApprovalSheettoSummaryDocs();
            },
            Cancel: function () {
                $('.ui-button-green-text').parent().removeAttr('disabled');
                $(this).dialog("close");
            }
        },
        close: function (event, ui) {

            $('.ui-button-green-text').parent().removeAttr('disabled');
            $(this).dialog("close");
        }
    });

    $("#addAdditionalApprovalSheetDocument").dialog({
        autoOpen: false,
        closeText: "",
        width: "60%",
        title: "Select Document(s)",
        dialogClass: "popup_width100",
        height: "auto",
        modal: true,
        buttons: [{
            text: "Save",
            "id": "btnSaveAdditonalDocSummaryAdd",
            click: function () { uploadAdditionalDocstoSummary(); }
        },
          {
              text: "Cancel",
              "id": "btnCancelAdditonalDocSummaryAdd",
              click: function () {
                  //manoj
                  $('.ui-button-green-text').parent().removeAttr('disabled');
                  $(this).dialog("close");
              }
          }
        ],
        close: function (event, ui) {
            $('.ui-button-green-text').parent().removeAttr('disabled');
            $(this).dialog("close");
        }
    });
    //For Contract Summary Sheet
    //manoj


    //Copy Contract link Enhancment
    $("#copylink").dialog({
        autoOpen: false,
        closeText: "",
        width: "75%",
        title: "Copy Link",
        dialogClass: "Popup_WarningMsg",
        modal: true,
        minHeight: "80%",
        buttons: {
            "Copy": function () {
                CopyLink();
            },
            Cancel: function () {
                $(this).dialog("close");
                $("#hdContractID").val('');
                ClearCopyLinkForm();
            }
        },
        close: function (event, ui) {
            $("#hdContractID").val('');
        },
    });
    //Copy Contract link Enhancment
});
function CancelContract() {
    if (requiredValidator('dvCancelContract', false)) {
        swal({
            title: '',
            text: "Are you sure you want to <span style=\"font-weight:700\">cancel</span> this contract?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            html: true
        },
     function (confirmed) {
         if (confirmed) {
             $("#loadingPage").fadeIn();
             var notify = $("#ddlSendToCancel").val();
             var noty = '';
             $(notify).each(function (i, item) {
                 if (noty == '') {
                     noty = item;
                 }
                 else {
                     noty += ";" + item;
                 }
             });
             var vCancelNote = "CancelledReason=" + $("#txtReasonOfCancel").val() + "&UsersToNotify=" + noty;
             $.ajax({
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + $("#hdContractID").val() + '/changestatus?status=Cancelled',
                 type: 'PUT',
                 dataType: 'json',
                 headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                 data: vCancelNote,
                 cache: false,
                 success: function (result) {
                     $("#loadingPage").fadeOut();
                     $("#dvCancelContract").dialog("close");
                     $("#dvContractTerm").dialog("close");
                     $("#dvManageContractStatus").dialog("close");
                     applyFilter();
                 },
                 error: function (data) {
                     $("#loadingPage").fadeOut();
                 }
             });
         }
         return;
     });

    }
}
function CancelContractMul() {
    if (requiredValidator('dvCancelContractMul', false)) {
        swal({
            title: '',
            text: "Are you sure you want to <span style=\"font-weight:700\">cancel</span> this contract?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            html: true
        },
     function (confirmed) {
         if (confirmed) {
             $("#loadingPage").fadeIn();
             var notify = $("#ddlSendToCancelMul").val();
             var noty = '';
             $(notify).each(function (i, item) {
                 if (noty == '') {
                     noty = item;
                 }
                 else {
                     noty += ";" + item;
                 }
             });
             var vCancelNote = "CancelledReason=" + $("#txtReasonOfCancelMul").val() + "&UsersToNotify=" + noty;
             $.ajax({
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + multipleChecks + '/changestatus?status=Cancelled',
                 type: 'PUT',
                 dataType: 'json',
                 headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                 data: vCancelNote,
                 cache: false,
                 success: function (result) {
                     $("#dvCancelContractMul").dialog("close");

                     $("#loadingPage").fadeOut();
                     $("#dvManageContractStatusMul").dialog("close");
                     applyFilter();
                     $('#SelectAll').attr('checked', false);
                     $("#btnMultipleAction").css('display', ' ');
                 },
                 error: function (data) {
                     $("#loadingPage").fadeOut();
                 }
             });
         }
         return;
     });

    }
}
$(window).on('load', function () {
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
            vContractType = data;
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
                                var myUrl = '/Contracts/CreateContract?Stage=active&ContractType=' + encodeURIComponent(item.ContractType) + "&DocumentCreation=" + encodeURIComponent(item.DocumentCreation);
                                var article = '<li><a href=' + myUrl + '>' + item.ContractType + '</a></li>';
                                $("#filterContractType").append('<option value="' + item.ContractType + '" title="' + item.ContractType + '">' + item.ContractType + '</option>')
                                if (item.Active == true) {
                                    $("#ulAllContractTypes").append(article);
                                    if (paginationDataLength < 5) {
                                        $("#menu3").append(article);
                                    }
                                    paginationDataLength++;
                                }
                            }
                        }


                    },
                    error: function (data1) {
                        $("#menu3").append('<li style="color:red;">No items found.</li>');

                    }
                });
            } else {
                for (var i = 0; i < datalength; i++) {
                    var item = data[i];
                    var myUrl = '/Contracts/CreateContract?Stage=active&ContractType=' + encodeURIComponent(item.ContractType);
                    var article = '<li><a href=' + myUrl + '>' + item.ContractType + '</a></li>';

                    $("#filterContractType").append('<option value="' + item.ContractType + '" title="' + item.ContractType + '">' + item.ContractType + '</option>')

                    if (item.Active == true) {
                        $("#ulAllContractTypes").append(article);
                        if (i < 10) {
                            $("#menu3").append(article);
                        }
                    }

                }

            }


            $("#filterContractType option[value='All']").prop("selected", true);

            if (paginationDataLength == 0) {
                $("#btnContractTypeViewAll").css('display', 'none');
                $("#menu3").append('<li style="color:red;">No items found.</li>');
            } else if (paginationDataLength > 5) {
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

$(document).ready(function () {

    $("#addNewView").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Add View",
        dialogClass: "popup_width100",
        modal: true,
        resizable: true,
        buttons: {
            "Save": function () { SaveView('false'); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
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


    //*Harshitha
    $("#RenewalHistoryView").dialog({
        autoOpen: false,
        closeText: "",
        width: "90%",
        minHeight: "100%",
        title: "Contract Renewal",
        dialogClass: "popup_width90",
        modal: true,
        draggable: false,
        buttons: {
            Close: function () {
                $(this).dialog("close");
            }
        },
        close: function (event, ui) {


        }
    });


    $('#btnAddView').click(function () {
        $("#txtViewID").val("");
        $("#txtViewName").val("");

        $("#addNewView").dialog("option", "title", "New View");
        $("#addNewView").dialog("open");
    });


    $('#btnNewContractCancel').click(function () {

        $("#divToAppendCreateContract").hide();
    });


    ////get view names from query string
    //var vViewName = getParameterByName('View');
    //if (vViewName == '') {
    //    var obj = { name: "All", innerText: "All Contracts" };
    //    quickViewDisplay(obj);
    //    $("#filteroptiontype").css('display', 'none');
    //}
    //else {
    //    var obj = { name: vViewName, innerText: vViewName };
    //    quickViewDisplay(obj);
    //}

    //GetSavedViews();
    BindPeople();



    //Contract Type Popup
    $("#popupAllContractTypes").dialog({
        autoOpen: false,
        closeText: "",
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

    $("#contractLogsPopup").dialog({
        autoOpen: false,
        closeText: "",
        width: "60%",
        title: "Contract History",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "Close": function () { $(this).dialog("close"); }
        }
    });
    $("#shareContract").dialog({
        autoOpen: false,
        closeText: "",
        width: "75%",
        title: "Share Contract Record",
        dialogClass: "Popup_WarningMsg",
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
            ClearShareForm();
            contractItemrec = '';
        },
        open: function (event, ui) {
            if (!($('.smalltextcontract').length)) {
                $("div[aria-describedby='shareContract'].Popup_WarningMsg div span:first").append("<br /><span style='background-color:yellow;font-size:small;' class='smalltextcontract'>A secured view of this Contract Record will be temporarily shared with external contact(s) & users in eContracts as a link in their email.</span>");
            }
            $("div[aria-describedby='shareContract'].Popup_WarningMsg div span:first").attr('style', 'padding-bottom: 0px !important');
        }
    });
    $("#allAlerts").dialog({
        autoOpen: false,
        closeText: "",
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
        autoOpen: false,
        closeText: "",
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
        autoOpen: false,
        closeText: "",
        width: "65%",
        title: "People and Permissions",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "OK": function () { if (savePeople()) { $(this).dialog("close"); RemoveErrors(); } },
            Cancel: function () {
                $(this).dialog("close");
                RemoveErrors();
                if ($("#newPopup li span img").length > 0) {
                    UpdatePermissionCancelled = true;
                    var len = $("#newPopup li span img").length;
                    $("#newPopup li span img").each(function (index, val) {

                        Remove(val);
                        if (index + 1 == len) {
                            UpdatePermissionCancelled = false;
                        }
                    })
                }
            }
        },
        close: function () {
            ContractRoles = [];
            RecvMetadatavaluetofinalize = '';
            ContractType = '';
            RemoveErrors();
            if ($("#newPopup li span img").length > 0) {
                UpdatePermissionCancelled = true;
                var len = $("#newPopup li span img").length;
                $("#newPopup li span img").each(function (index, val) {

                    Remove(val);
                    if (index + 1 == len) {
                        UpdatePermissionCancelled = false;
                    }
                })
            }
            $("#chkpermission").removeAttr("disabled");
            $("#chkPublicContract").removeAttr("disabled");
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
                oApprovalNewDocID = "";
                $(this).dialog("close");
            }
        },
        close: function (event, ui) {
            oApprovalNewDocID = "";
            $(this).dialog("close");
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
        modal: true,
        buttons: {
            "OK": function () {
                ChangeContractStatus();
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#dvManageContractStatusMul").dialog({
        autoOpen: false,
        width: "60%",
        title: "Manage Contract Record Status",
        dialogClass: "popup_width100",
        closeText: "",
        modal: true,
        buttons: {
            "OK": function () {
                changestatusmultiple();
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }

    });
    $("#aRecently").css("background-color", "#cccccc");
    selectedSortOption = "Recently Updated";
    $("#txtSortBy").val(selectedSortOption)

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
        resizable: false,
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

function GetAllContracts(obj) {
    $("#liFiltersforQuickViews").css('display', '');
    $("#txtSearchBox").val("");
    $("#txtSearchBox").attr("placeholder", "Search in '" + obj.name + "'");
    $(".hhide").hide();
    colorLink('liContractViews a', false);
    colorLink('liQuickView span', false);
    colorLink('liQuickView a', false);
    colorLink('spnAllContracts', true);
    colorLink(obj.id, true);
    selectedSortOption = "";
    clearFilterSelection();
    colorLink('spnmycontracts', false);
    colorLink('spnmyprojectcontract', false);
    colorLink('spnDraft', false);
    colorLink('spnDraftNewContracts', false);
    colorLink('spnSigned', false);
    colorLink('spnActive', false);
    colorLink('spnUpcomingRenewals', false);
    colorLink('spnUpcomingExpirations', false);
    colorLink('spnRecentlyActiveRenewedContracts', false);
    colorLink('spnUnassignedContracts', false);
    colorLink('spnPastContracts', false);
    colorLink('spnInRecycleBin', false);
    colorLink('spnSharedContracts', false);
    $("#spResult").empty();
    $("#btnFilter").css('display', 'inline');
    $("#dvSrhBox").css('display', '');
    $("#showAll").css('display', 'inline');
    $("#showAll").text('Showing All Contract Records');

    clearFilterSelection();
    $('#tdSort a').each(function (i, item) {
        item.style.backgroundColor = "";
    });

    $("#liFiltersQuickView").empty();
    $('#liFiltersQuickView').html('<span>Showing search result for : <small>All<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');

    $('#liFiltersQuickView').css('display', 'none');
    $("#btnAddView").css('display', 'none');

    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
    var baname = ";";
    if (thisBusinessAreaName == "" || thisBusinessAreaName == "All") {
    } else {
        baname = thisBusinessAreaName;
    }
    savedViewNameFromViewTable = "";
    applyFilter();
    //showQuickViewFilter(obj.name);
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
                $("#liContractViews").append(article);
            }
        },
        error:
            function (data) {
                $('#liContractViews').empty();
                $("#liContractViews").append('<p class="f_p-error">No items found.</p>');
                $("#divChkSelectAll").css('display', 'none');
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

                swal("", data);
                GetSavedViews();
                var vViewName = "";
                //manoj
                var obj = { name: "All", innerText: "All Contracts" };
                //manoj
                quickViewDisplay(obj);
            }
        });
    }
    return;
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
        if (ObjectNameToSend == "In Recycle Bin")
            $("#divChkSelectAll").css('display', 'none');
        else
            $("#divChkSelectAll").css('display', '');

    }
    return resultfound;
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
            sortby = 'EndDate';
            fieldType = 'date';
            break;
        case "Contract Value(Low-High)":
            sortby = 'ContractValue';
            break;
        case "Contract Value(High-Low)":
            sortby = 'ContractValue';
            break;
        case "Contract Number":
            sortby = 'ContractNumber';
            break;
        case "Created Date":
            sortby = 'Created';
            fieldType = 'date';
            break;
        case "Title(A-Z)":
            sortby = 'ContractTitle';
        default:
            sortby = '';
            break;
    }
    $("#listContracts").empty();
    arrforcloseoutcheck = [];
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
    for (var j = startIndex; j < endIndex; j++) {
        var articleFlag = true;
        var articleFlagWoDel = '';
        var item = listContracts[j];
        if (item != null) {
            //Sridhar - StatusChange manual
            if (item.RowKey == statusChangeConID) {
                item.Status = statusChangeVal;
            }
            var vContCoverSheetURl = "";
            var vActPermission = 'View';
            var vPermission = 'openmenuView';
            var vPermissionWoDel = vPermission;
            if (item.Permission == 'Manage') {
                vPermission = 'openmenu';
                articleFlagWoDel = 'Main';
                vActPermission = "Manage";
            }
            else if (item.Permission == 'Contribute') {
                vPermission = 'openmenuContribute';
                vActPermission = "Contribute";
            }
            else if (item.Permission == 'Collaborate') {
                vPermission = 'openmenuCollaborate';
                vActPermission = "Collaborate";
            }
            else if (item.Permission == 'View') {
                vPermission = 'openmenuView';
                vActPermission = "View";
            }

            if (item.Status == "Expired" || item.Status == "Cancelled" || item.Status == "Replaced" || item.Status == "Archived") {
                if (item.Permission != 'View' && item.Permission != 'Collaborate') {
                    if (item.Permission == 'Contribute') {
                        vPermission = 'openmenuStatusContribute';
                    }
                    else {
                        if (item.Status == "Archived" && localStorage.UserType.indexOf("Global Contract Owner") > -1) {
                            vPermission = 'openmenuStatus';

                        } else {
                            vPermission = 'openmenuStatusContribute';
                        }
                    }
                }
                else {
                    vPermission = 'openmenuView';
                }
            }

            if (item.IsDraft == "Yes") {
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
            }

            if (item.InRecycleBin == "Yes") {
                vPermission = 'openmenuRecycle';
            }

            if (articleFlagWoDel == "Draft") {
                vPermissionWoDel = 'openmenuDraftWoDel';
            }
            else if (articleFlagWoDel == "Main") {
                vPermissionWoDel = 'openmenuWoDel';
            }
            else {
                vPermissionWoDel = vPermission;
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
            article = '<li>';
            article += '<p id="ContractID" style="display:none;">' + item.RowKey + '</p>';
            article += '<p id="ContractTitle" style="display:none;" data-id= "' + item.RowKey + '_ContractTitle" class="PreserveSpace"></p>';
            article += '<p id="ContractType" style="display:none;">' + item.ContractType + '</p>';
            article += '<p id="ContractArea" style="display:none;">' + item.ContractArea + '</p>';
            article += '<p id="BusinessArea" style="display:none;">' + item.BusinessArea + '</p>';
            article += '<p id="BusinessAreaPath" style="display:none;">' + item.BusinessAreaPath + '</p>';
            article += '<p id="ApprovalWorkflow" style="display:none;">' + item.ApprovalWorkflow + '</p>';
            article += '<p id="Status" style="display:none;">' + (item.IsDraft == "Yes" ? "" : item.Status) + '</p>';
            article += '<p id="Permission" style="display:none;">' + vPermission + '</p>';
            article += '<p id="ActualPermission" style="display:none;">' + vActPermission + '</p>';
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
            article += '<p id="CloseOut" title="' + item.RowKey + '" style="display:none;">' + item.CloseOut + '</p>';
            article += '<p id="IsDraftByCurrent" style="display:none;">' + (item.IsDraft == "Yes" ? (item.CreatedBy == localStorage.UserName ? "Yes" : "No") : "") + '</p>';
            if (typeof (item.SummeryBlobURL) != "undefined" && item.SummeryBlobURL != null && item.SummeryBlobURL != "") {
                vContCoverSheetURl = item.SummeryBlobURL;
                article += '<p id="SummeryBlobURL" style="display:none;">' + item.SummeryBlobURL + '</p>';
            }
            else
                article += '<p id="SummeryBlobURL" style="display:none;"></p>';
            //manoj
            article += '<p id="IsPublic" style="display:none;">' + item.IsPublic + '</p>';
            //For Contract Summary Sheet
            article += '<p id="ContractDocumentURL" style="display:none;">' + item.ContractDocumentsUrl + '</p>';
            //For Contract Summary Sheet
            //manoj
            article += '<p>';

            if (item.InRecycleBin == "Yes") {
                article += '<i>';
                article += '<b title="In Recycle Bin" class="status_blue"><img src="../Content/Images/status/recycle-bin.png"/>Recy</b>';

            } else {

                var vContVisibility = '';
                if (item.CustomPermission == "Yes") {
                    vContVisibility = '<img src="../Content/Images/cont_confd.png" title="Confidential" class="status_img" />';
                } else if (item.IsPublic == "Yes") {
                    vContVisibility = '<img src="../Content/Images/cont_public.png" title="Public" class="status_img" />';
                }
                if (selectedPage.length > 0) {
                    var temp = j;
                    if (page > 0) {
                        temp = j % 20;
                    }
                    if (selectedPage[0].selectedIndexes.filter(function (val1, index1) { return val1 == temp }).length > 0) {
                        article += '<input previously=true class="margin-Top10 margin-right" name="ContRec" type="checkbox" value="" onclick="checkMultipleContracts(this);" id="' + item.RowKey + '"  /><i>';
                    } else {
                        article += '<input class="margin-Top10 margin-right" name="ContRec" type="checkbox" value="" onclick="checkMultipleContracts(this);" id="' + item.RowKey + '"  /><i>';
                    }
                } else {

                    article += '<input class="margin-Top10 margin-right" name="ContRec" type="checkbox" value="" onclick="checkMultipleContracts(this);" id="' + item.RowKey + '"  /><i>';
                }
                if (item.IsDraft == "Yes") {
                    article += '<b title="In Draft" class="status_Gray"><img src="../Content/Images/icon/Draft_icon.png"/>Draft</b>';
                    articleFlag = false;
                    vPermission = vPermissionWoDel;
                }
                else if (item.Status == "New") {
                    if (articleFlag)
                        article += '<b title="New" class="status_green_another"><img src="../Content/Images/status/new.png" class="status_img"/>new</b>';
                    if (vPermission == 'openmenuContribute' || vPermission == 'openmenu' || vPermission == 'openmenuDraft' || vPermission == 'openmenuDraftContribute') {
                        vQuickActions += '<a href="/Contracts/EditContract?ContractID=' + item.RowKey + '&ContractType=' + encodeURIComponent(item.ContractType) + '"><img title="Edit Metadata" src="../Content/Images/action/edit-metadata.png"/></a>';
                        if (vPermission == 'openmenuContribute' || vPermission == 'openmenu') {
                            vQuickActions += '<a href="javascript:void(0)" onclick="OpenContractApproval(\'' + item.ApprovalWorkflow + '\', \'' + escape(item.ContractTitle) + '\', \'' + item.RowKey + '\', \'' + escape(item.BusinessArea) + '\', \'' + escape(item.ContractArea) + '\', \'' + escape(item.BusinessAreaPath) + '\',\'' + escape(item.IsPublic) + '\', \'' + item.ContractType + '\', \'' + item.ContractDocumentsUrl + '\', \'' + vContCoverSheetURl + '\', \'' + item.Status + '\', \'' + vActPermission + '\');"><img title="Start Approval Workflow" src="../Content/Images/action/Start-Approval-workflow.png"/></a>';
                        }
                    }
                    vPermission = vPermissionWoDel;
                }
                else if (item.Status == "Awaiting Review") {
                    if (articleFlag)
                        article += '<b title="Awaiting Review" class="status_yellow"><img src="../Content/Images/status/renew.png" class="status_img"/>rev</b>';
                    vQuickActions += '<a href="' + myUrl + '&Tab=Activity"><img title="Check Activity Status" src="../Content/Images/action/check-activity-status.png"/></a>';
                    if (vPermission == 'openmenu' || vPermission == 'openmenuDraft')
                        vQuickActions += '<a href="javascript:void(0)" onclick="ManageContractPeople(\'' + item.RowKey + '\');"><img title="Manage People" src="../Content/Images/action/manage-people.png"/></a>';
                    vPermission = vPermissionWoDel;
                }
                else if (item.Status == "Reviewed") {
                    if (articleFlag)
                        if (articleFlag)
                            if (articleFlag)
                                article += '<b title="Reviewed" class="status_blue"><img src="../Content/Images/status/tick.png" class="status_img"/>rev</b>';
                    if (vPermission == 'openmenuContribute' || vPermission == 'openmenu') {
                        vQuickActions += '<a href="javascript:void(0)" onclick="OpenContractApproval(\'' + item.ApprovalWorkflow + '\', \'' + escape(item.ContractTitle) + '\', \'' + item.RowKey + '\', \'' + escape(item.BusinessArea) + '\', \'' + escape(item.ContractArea) + '\', \'' + escape(item.BusinessAreaPath) + '\',\'' + escape(item.IsPublic) + '\', \'' + item.ContractType + '\', \'' + item.ContractDocumentsUrl + '\', \'' + vContCoverSheetURl + '\', \'' + item.Status + '\', \'' + vActPermission + '\');"><img title="Start Approval Workflow" src="../Content/Images/action/Start-Approval-workflow.png"/></a>';
                        vQuickActions += '<a href="javascript:void(0)" title="CloseOut" onclick="ManageContractStatus(\'' + item.RowKey + '\',\'' + item.Status + '\',\'' + item.ContractType + '\',\'' + item.CloseOut + '\',this);"><img title="Manage Status" src="../Content/Images/action/manage-status.png"/></a>';
                    }
                    vPermission = vPermissionWoDel;
                }
                else if (item.Status == "Awaiting Approval") {
                    if (articleFlag)
                        article += '<b title="Awaiting Approval" class="status_yellow"><img src="../Content/Images/status/renew.png" class="status_img"/>appr</b>';
                    vQuickActions += '<a href="' + myUrl + '&Tab=Activity"><img title="Check Activity Status" src="../Content/Images/action/check-activity-status.png"/></a>';
                    if (vPermission == 'openmenu' || vPermission == 'openmenuDraft')
                        vQuickActions += '<a href="javascript:void(0)" onclick="ManageContractPeople(\'' + item.RowKey + '\');"><img title="Manage People" src="../Content/Images/action/manage-people.png"/></a>';
                    vPermission = vPermissionWoDel;
                }
                else if (item.Status == "Approved") {
                    if (articleFlag)
                        article += '<b title="Approved" class="status_blue"><img src="../Content/Images/status/tick.png" class="status_img"/>appr</b>';
                    if (vPermission == 'openmenuContribute' || vPermission == 'openmenu') // Bug (eO37033)
                    {
                        vQuickActions += '<a href="javascript:void(0)" onclick="OpenContractShare(\'' + item.RowKey + '\',\'' + item.ContractTitle + '\');"><img title="Share Contract Record" src="../Content/Images/CM_share_contract.png"/></a>';
                        vQuickActions += '<a href="javascript:void(0)" title="CloseOut" onclick="ManageContractStatus(\'' + item.RowKey + '\',\'' + item.Status + '\',\'' + item.ContractType + '\',\'' + item.CloseOut + '\',this);"><img title="Manage Status" src="../Content/Images/action/manage-status.png"/></a>';
                    }
                    vPermission = vPermissionWoDel;
                }
                else if (item.Status == "In Negotiation") {
                    if (articleFlag)
                        article += '<b title="In Negotiation" class="status_yellow"><img src="../Content/Images/status/renew.png" class="status_img"/>nego</b>';
                    vQuickActions += '<a href="' + myUrl + '&Tab=Activity"><img title="Check Activity Status" src="../Content/Images/action/check-activity-status.png"/></a>';
                    vQuickActions += '<a href="' + myUrl + '&Tab=Notes"><img title="View Notes" src="../Content/Images/action/view-notes.png"/></a>';
                    vPermission = vPermissionWoDel;
                }
                else if (item.Status == "Negotiation Complete") {
                    if (articleFlag)
                        article += '<b title="Negotiation Complete" class="status_blue"><img src="../Content/Images/status/tick.png" class="status_img"/>nego</b>';
                    if (vPermission == 'openmenuContribute' || vPermission == 'openmenu')
                        vQuickActions += '<a href="javascript:void(0)" title="CloseOut" onclick="ManageContractStatus(\'' + item.RowKey + '\',\'' + item.Status + '\',\'' + item.ContractType + '\',\'' + item.CloseOut + '\',this);"><img title="Manage Status" src="../Content/Images/action/manage-status.png"/></a>';
                    vQuickActions += '<a href="javascript:void(0)" onclick="CreateContractActivityList(\'' + item.RowKey + '\');"><img title="View History" src="../Content/Images/action/View-History.png"/></a>';
                    vPermission = vPermissionWoDel;
                }
                else if (item.Status == "Ready for Signature") {
                    if (articleFlag)
                        article += '<b title="Ready for Signature" class="status_green"><img src="../Content/Images/status/active.png" class="status_img"/>Sign</b>';
                    vQuickActions += '<a href="' + myUrl + '&Tab=Activity"><img title="Check Activity Status" src="../Content/Images/action/check-activity-status.png"/></a>';
                    if (vPermission == 'openmenuContribute' || vPermission == 'openmenu')
                        vQuickActions += '<a href="javascript:void(0)" title="CloseOut" onclick="ManageContractStatus(\'' + item.RowKey + '\',\'' + item.Status + '\',\'' + item.ContractType + '\',\'' + item.CloseOut + '\',this);"><img title="Manage Status" src="../Content/Images/action/manage-status.png"/></a>';
                    vPermission = vPermissionWoDel;
                }
                else if (item.Status == "Awaiting Signatures") {
                    if (articleFlag)
                        article += '<b title="Awaiting Signatures" class="status_yellow"><img src="../Content/Images/status/renew.png" class="status_img"/>Sign</b>';
                    vQuickActions += '<a href="' + myUrl + '&Tab=Activity"><img title="Check Activity Status" src="../Content/Images/action/check-activity-status.png"/></a>';
                    if (vPermission == 'openmenuContribute' || vPermission == 'openmenu')
                        vQuickActions += '<a href="javascript:void(0)" title="CloseOut" onclick="ManageContractStatus(\'' + item.RowKey + '\',\'' + item.Status + '\',\'' + item.ContractType + '\',\'' + item.CloseOut + '\',this);"><img title="Manage Status" src="../Content/Images/action/manage-status.png"/></a>';
                    vPermission = vPermissionWoDel;
                }
                else if (item.Status == "Signed") {
                    if (articleFlag)
                        article += '<b title="Signed" class="status_blue"><img src="../Content/Images/status/tick.png" class="status_img"/>Sign</b>';
                    if (vPermission == 'openmenuContribute' || vPermission == 'openmenu')
                        vQuickActions += '<a href="javascript:void(0)" title="CloseOut" onclick="ManageContractStatus(\'' + item.RowKey + '\',\'' + item.Status + '\',\'' + item.ContractType + '\',\'' + item.CloseOut + '\',this);"><img title="Manage Status" src="../Content/Images/action/manage-status.png"/></a>';
                    if (vPermission == 'openmenu' || vPermission == 'openmenuDraft')
                        vQuickActions += '<a href="javascript:void(0)" onclick="ManageContractTerm(\'' + item.RowKey + '\');"><img title="Manage Term & Renewals" src="../Content/Images/action/manage-term-renewal.png"/></a>';
                    vPermission = vPermissionWoDel;
                }
                else if (item.Status == "Active") {
                    if (articleFlag)
                        article += '<b title="Active" class="status_green"><img src="../Content/Images/status/active.png" class="status_img"/>actv</b>';
                    vQuickActions += '<a href="javascript:void(0)" onclick="ViewContractMetaData(\'' + item.RowKey + '\');"><img title="View Metadata" src="../Content/Images/action/view-metadata.png"/></a>';
                    if (vPermission == 'openmenu' || vPermission == 'openmenuDraft')
                        vQuickActions += '<a href="javascript:void(0)" onclick="ManageContractTerm(\'' + item.RowKey + '\');"><img title="Manage Term & Renewals" src="../Content/Images/action/manage-term-renewal.png"/></a>';
                    vPermission = vPermissionWoDel;
                }
                else if (item.Status == "Up for Renewal") {
                    if (articleFlag)
                        article += '<b title="Up for Renewal" class="status_red"><img src="../Content/Images/status/exp.png" class="status_img"/>renw</b>';
                    if (vPermission == 'openmenuContribute' || vPermission == 'openmenu') // Bug(eO37034)
                    {
                        vQuickActions += '<a href="javascript:void(0)" onclick="ManageContractTerm(\'' + item.RowKey + '\');"><img title="Manage Term & Renewals" src="../Content/Images/action/manage-term-renewal.png"/></a>';
                        vQuickActions += '<a href="javascript:void(0)" title="CloseOut" onclick="ManageContractStatus(\'' + item.RowKey + '\',\'' + item.Status + '\',\'' + item.ContractType + '\',\'' + item.CloseOut + '\',this);"><img title="Manage Status" src="../Content/Images/action/manage-status.png"/></a>';
                    }
                    vPermission = vPermissionWoDel;
                }
                else if (item.Status == "About to Expire") {
                    if (articleFlag)
                        article += '<b title="About to Expire" class="status_red"><img src="../Content/Images/status/exp.png" class="status_img"/>exp</b>';
                    if (vPermission == 'openmenu' || vPermission == 'openmenuDraft')
                        vQuickActions += '<a href="javascript:void(0)" onclick="ManageContractTerm(\'' + item.RowKey + '\');"><img title="Manage Term & Renewals" src="../Content/Images/action/manage-term-renewal.png"/></a>';
                    if (vPermission == 'openmenuContribute' || vPermission == 'openmenu')
                        vQuickActions += '<a href="javascript:void(0)" title="CloseOut" onclick="ManageContractStatus(\'' + item.RowKey + '\',\'' + item.Status + '\',\'' + item.ContractType + '\',\'' + item.CloseOut + '\',this);"><img title="Manage Status" src="../Content/Images/action/manage-status.png"/></a>';
                }
                else if (item.Status == "Expired") {
                    if (articleFlag)
                        article += '<b title="Expired" class="status_Gray"><img src="../Content/Images/status/expried.png" class="status_img"/>exp</b>';
                    vQuickActions += '<a href="javascript:void(0)" onclick="CreateContractActivityList(\'' + item.RowKey + '\');"><img title="View History" src="../Content/Images/action/View-History.png"/></a>';
                    if (vPermission == 'openmenuContribute' || vPermission == 'openmenu')
                        vQuickActions += '<a href="javascript:void(0)" title="CloseOut" onclick="ManageContractStatus(\'' + item.RowKey + '\',\'' + item.Status + '\',\'' + item.ContractType + '\',\'' + item.CloseOut + '\',this);"><img title="Manage Status" src="../Content/Images/action/manage-status.png"/></a>';
                    else if (vPermission == 'openmenuStatusContribute')
                        vPermission = "openmenuStatusContributeExpired"

                }
                else if (item.Status == "On Hold") {
                    if (articleFlag)
                        article += '<b title="On Hold" class="status_red"><img src="../Content/Images/status/exp.png" class="status_img"/>hold</b>';
                    if (vPermission == 'openmenuContribute' || vPermission == 'openmenu')
                        vQuickActions += '<a href="javascript:void(0)" title="CloseOut" onclick="ManageContractStatus(\'' + item.RowKey + '\',\'' + item.Status + '\',\'' + item.CloseOut + '\' ,this);"><img title="Manage Status" src="../Content/Images/action/manage-status.png"/></a>';
                    if (vPermission == 'openmenu' || vPermission == 'openmenuDraft')
                        vQuickActions += '<a href="javascript:void(0)" onclick="ManageContractTerm(\'' + item.RowKey + '\');"><img title="Manage Term & Renewals" src="../Content/Images/action/manage-term-renewal.png"/></a>';

                    vPermission = vPermissionWoDel; //eO310597
                }
                else if (item.Status == "Replaced") {
                    if (articleFlag)
                        article += '<b title="Replaced" class="status_Gray"><img src="../Content/Images/status/replace.png" class="status_img"/>rep</b>';
                    if (vPermission == 'openmenuContribute' || vPermission == 'openmenu' || vPermission == 'openmenuStatus' || vPermission == 'openmenuStatusContribute')
                        vQuickActions += '<a href="javascript:void(0)" title="CloseOut" onclick="ManageContractStatus(\'' + item.RowKey + '\',\'' + item.Status + '\',\'' + item.ContractType + '\',\'' + item.CloseOut + '\',this);"><img title="Manage Status" src="../Content/Images/action/manage-status.png"/></a>';

                }
                else if (item.Status == "Cancelled") {
                    if (articleFlag)
                        article += '<b title="Cancelled" class="status_Gray"><img src="../Content/Images/status/close.png" class="status_img"/>canc</b>';
                    vQuickActions += '<a href="javascript:void(0)" onclick="CreateContractActivityList(\'' + item.RowKey + '\');"><img title="View History" src="../Content/Images/action/View-History.png"/></a>';
                    if (vPermission == 'openmenuContribute' || vPermission == 'openmenu' || vPermission == 'openmenuStatus' || vPermission == 'openmenuStatusContribute')
                        vQuickActions += '<a href="javascript:void(0)" title="CloseOut" onclick="ManageContractStatus(\'' + item.RowKey + '\',\'' + item.Status + '\',\'' + item.ContractType + '\',\'' + item.CloseOut + '\',this);"><img title="Manage Status" src="../Content/Images/action/manage-status.png"/></a>';
                }

                else if (item.Status == "Archived") {
                    if (articleFlag)
                        article += '<b title="Archived" class="status_blue"><img src="../Content/Images/status/archive.png" class="status_img"/>ARCH</b>';
                    vQuickActions += '<a href="javascript:void(0)" onclick="CreateContractActivityList(\'' + item.RowKey + '\');"><img title="View History" src="../Content/Images/action/View-History.png"/></a>';
                    if (vPermission == 'openmenu' || vPermission == 'openmenuStatus' || vPermission == 'openmenuDraft') {
                        //if (localStorage.UserType.indexOf("Global Contract Owner") > -1) {
                        vQuickActions += '<a href="javascript:void(0)" title="CloseOut" onclick="DeleteContract(\'' + item.ContractTitle + '\',\'' + item.RowKey + '\',\'' + item.ContractType + '\',\'' + item.CloseOut + '\');"><img title="Delete Contract Record" src="../Content/Images/action/Delete-Contract.png"/></a>';
                        $("#myMenuStatus li.separator:last").show();
                        $("#myMenuStatus li.delete").show();
                        //}
                        //else {
                        //    $("#myMenuStatus li.delete").hide();
                        //    $("#myMenuStatus li.separator:last").hide();
                        //}
                    }
                }
                else {
                    if (item.Status == "0" || item.Status == "" || item.Status == "undefined") {
                        if (articleFlag)
                            article += '<b title="Not Assigned" class="status_red"><img src="../Content/Images/status/new.png" class="status_img"/>not</b>';
                        if (vPermission == 'openmenuContribute' || vPermission == 'openmenu' || vPermission == 'openmenuDraft' || vPermission == 'openmenuDraftContribute') {
                            vQuickActions += '<a href="/Contracts/EditContract?ContractID=' + item.RowKey + '&ContractType=' + encodeURIComponent(item.ContractType) + '"><img title="Edit Metadata" src="../Content/Images/action/edit-metadata.png"/></a>';
                            if (vPermission == 'openmenuContribute' || vPermission == 'openmenu')
                                vQuickActions += '<a href="javascript:void(0)" onclick="OpenContractApproval(\'' + item.ApprovalWorkflow + '\', \'' + escape(item.ContractTitle) + '\', \'' + item.RowKey + '\', \'' + escape(item.BusinessArea) + '\', \'' + escape(item.ContractArea) + '\', \'' + escape(item.BusinessAreaPath) + '\',\'' + escape(item.IsPublic) + '\', \'' + item.ContractType + '\', \'' + item.ContractDocumentsUrl + '\', \'' + vContCoverSheetURl + '\', \'' + item.Status + '\', \'' + vActPermission + '\');"><img title="Start Approval Workflow" src="../Content/Images/action/Start-Approval-workflow.png"/></a>';
                        }
                        vPermission = vPermissionWoDel;

                    } else {
                        if (articleFlag)
                            article += '<b title="' + item.Status + '" class="status_red"><img src="../Content/Images/status/new.png" class="status_img"/>hold</b>';
                        if (vPermission == 'openmenuContribute' || vPermission == 'openmenu') {
                            vQuickActions += '<a href="/Contracts/EditContract?ContractID=' + item.RowKey + '&ContractType=' + encodeURIComponent(item.ContractType) + '"><img title="Edit Metadata" src="../Content/Images/action/edit-metadata.png"/></a>';
                            vQuickActions += '<a href="javascript:void(0)" onclick="OpenContractApproval(\'' + item.ApprovalWorkflow + '\', \'' + escape(item.ContractTitle) + '\', \'' + item.RowKey + '\', \'' + escape(item.BusinessArea) + '\', \'' + escape(item.ContractArea) + '\', \'' + escape(item.BusinessAreaPath) + '\',\'' + escape(item.IsPublic) + '\', \'' + item.ContractType + '\', \'' + item.ContractDocumentsUrl + '\', \'' + vContCoverSheetURl + '\', \'' + item.Status + '\', \'' + vActPermission + '\');"><img title="Start Approval Workflow" src="../Content/Images/action/Start-Approval-workflow.png"/></a>';
                        }
                        vPermission = vPermissionWoDel;
                    }
                }
            }
            if (item.InRecycleBin == "Yes") {
                article += item.ContractTitle;
            } else {
                article += ' <a href="' + myUrl + '" id="a_' + item.RowKey + '"></a>' + vContVisibility;
            }
            article += '<small><var title="ContractNumber">' + vContractNumber + '</var> | <var title="ContractType">' + item.ContractType + '</var>';
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
                else {
                    article += ' |&nbsp;<var title="' + selectedSortOption + '">NA</var>';
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

            contractTags.push(item.ContractTitle);

            article += '</li>';
            $("#listContracts").append(article);
            $('p[data-id="' + item.RowKey + '_ContractTitle"]').html($('<div/>').text(item.ContractTitle).html());
            $("#a_" + item.RowKey).html($('<div/>').text(item.ContractTitle).html());
            //$('#' + item.RowKey).filter("[previously=true]").prop("checked", true); //Bug id: eO37755
            resultfound = true;

        }
    }
    if ($("#Select").prop('checked') == true) {
        $("#btnMultipleAction").css("display", "")
    } else if ($('input[type="checkbox"]').filter('[name="ContRec"]:checked').length > 0) {
        $("#btnMultipleAction").css("display", "")
    } else {
        $("#btnMultipleAction").css("display", "none");
    }
    if (selectedPage.length > 0) {
        if (selectedPage[0].isAllSelected) {
            $("input[type='checkbox']").filter('[name="ContRec"]').prop('checked', true);
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

    $(".openmenuStatus").contextMenu({ menu: 'myMenuStatus', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("div").parent("li"), pos); });

    $(".openmenuStatusContribute").contextMenu({ menu: 'myMenuStatusContribute', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("div").parent("li"), pos); });
    $(".openmenuStatusContributeExpired").contextMenu({ menu: 'myMenuStatusContributeforExpired', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("div").parent("li"), pos); });

    $(".openmenuDraft").contextMenu({ menu: 'myMenuDraft', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("div").parent("li"), pos); });

    $(".openmenuRecycle").contextMenu({ menu: 'myMenuRecycle', leftButton: true }, function (action, el, pos) { contextMenuWorkForRecycleBin(action, el.parent("div").parent("li"), pos); });

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

    $(".openmenuDraftWoDel").click(function () {
        $("#dvfilter").hide();
    });
    $(".openmenuWoDel").click(function () {
        $("#dvfilter").hide();
    });

    $(".openmenuStatus").click(function () {
        $("#dvfilter").hide();
    });

    $(".openmenuStatusContribute").click(function () {
        $("#dvfilter").hide();
    });

    $(".openmenuDraft").click(function () {
        $("#dvfilter").hide();
    });

    $(".openmenuDraftContribute").click(function () {
        $("#dvfilter").hide();
    });
    $(".openmenuRecycle").click(function () {
        $("#dvfilter").hide();
    });
    if (localStorage.UserType.indexOf("Global Contract Owner") >= 0) {
        $(".GlobalOwner").show();
    }
    else {
        $(".GlobalOwner").hide();
    }
    //Sridhar
    statusChangeConID = '';
    statusChangeVal = '';
}

function SelectAllItems(object) {
    $('.hhide').hide();
    multipleChecks = "";
    multipleChecksPermission = "";
    multipleChecksStatus = "";
    multipleChecksIsDraftByCurrent = "";
    var ContractID = "";
    var vPermission = "";
    var vStatus = "";
    var vIsDraftByCurrent = "";
    var vEndDate = ""
    if ($('#SelectAll').is(':checked')) {
        $("input:checkbox[name=ContRec]").each(function () {
            this.checked = true;
            ContractID = $(this).attr("id");
            vPermission = $("#" + ContractID).parent("p").parent("li").find("#Permission").text();
            vStatus = $("#" + ContractID).parent("p").parent("li").find("#Status").text();
            vIsDraftByCurrent = $("#" + ContractID).parent("p").parent("li").find("#IsDraftByCurrent").text();
            vEndDate = $("#" + ContractID).parent("p").parent("li").find("#EndDate").text();

            $("#" + ContractID).parent("p").parent("li").addClass('aActive');
            $("#btnMultipleAction").css('display', '');
            if (vStatus == "Expired") {
                if (vEndDate == null) {
                    multipleChecks = multipleChecks + ';' + ContractID;
                }
                else {
                    vEndDate = new Date(vEndDate);
                    var EndDateMonthDateFormate = (vEndDate.getUTCMonth() + 1) + '/' + vEndDate.getUTCDate() + '/' + vEndDate.getUTCFullYear();
                    var TodaysDate = new Date();
                    var month = TodaysDate.getUTCMonth() + 1;
                    var day = TodaysDate.getUTCDate();
                    var TodaysDateMonthDateFormate = month + '/' + day + '/' + TodaysDate.getUTCFullYear();
                    if (Date.parse(EndDateMonthDateFormate) < Date.parse(TodaysDateMonthDateFormate)) {
                        if (!(isEndDateLessthanTodaysDate.indexOf(';EndDateLessthanTodaysDate' + ContractID) > -1)) {
                            isEndDateLessthanTodaysDate = isEndDateLessthanTodaysDate + ';EndDateLessthanTodaysDate' + ContractID;
                        }

                    }
                    else {
                        multipleChecks = multipleChecks + ';' + ContractID;
                    }
                }
            }
            else {
                multipleChecks = multipleChecks + ';' + ContractID;
            }
            multipleChecksPermission = multipleChecksPermission + ';' + vPermission;
            multipleChecksStatus = multipleChecksStatus + ';' + vStatus;
            multipleChecksIsDraftByCurrent = multipleChecksIsDraftByCurrent + ';' + vIsDraftByCurrent;

            if ($("#" + ContractID).parent("p").parent("li").find("#CloseOut").text() != "Yes") {
                var person = { id: ContractID, VName: $("#" + ContractID).parent("p").parent("li").find("#ContractTitle").text() };
                var arrupdated12 = $.grep(arrforcloseoutcheck, function (n, i) {
                    return (n.id == ContractID);
                });
                if (arrupdated12.length == 0) {
                    arrforcloseoutcheck.push(person);
                }
            }
        });
    } else {
        $("input:checkbox[name=ContRec]").each(function () {
            this.checked = false;
            ContractID = $(this).attr("id");
            vPermission = $("#" + ContractID).parent("p").parent("li").find("#Permission").text();
            vStatus = $("#" + ContractID).parent("p").parent("li").find("#Status").text();
            vIsDraftByCurrent = $("#" + ContractID).parent("p").parent("li").find("#IsDraftByCurrent").text();

            $("#" + ContractID).parent("p").parent("li").removeClass('aActive');
            multipleChecks = multipleChecks.replace(';' + ContractID, '');
            isEndDateLessthanTodaysDate = isEndDateLessthanTodaysDate.replace(';EndDateLessthanTodaysDate' + ContractID, '');
            multipleChecksPermission = multipleChecksPermission.replace(';' + vPermission, '');
            multipleChecksStatus = multipleChecksStatus.replace(';' + vStatus, '');
            multipleChecksIsDraftByCurrent = multipleChecksIsDraftByCurrent.replace(';' + vIsDraftByCurrent, '');

            if ($("#" + ContractID).parent("p").parent("li").find("#CloseOut").text() != "Yes") {
                var arrupdated12 = $.grep(arrforcloseoutcheck, function (n, i) {
                    return (n.id != ContractID);
                });
                arrforcloseoutcheck = arrupdated12;
            }
        });
    }

    if (multipleChecks.trim() == "") {
        $("#btnMultipleAction").css('display', 'none');
    } else {
        if (multipleChecksPermission.indexOf('openmenuView') >= 0) {
            $("#btnMultipleAction_Status").css('display', 'none');
            $("#btnMultipleAction_People").css('display', 'none');
            // $("#btnMultipleAction_Counparty").css('display', 'none');
            $("#btnMultipleAction_BusnArea").css('display', 'none');
            $("#btnMultipleAction_Delete").css('display', 'none');
            $("#btnMultipleAction_NoPermission").css('display', '');

        } else if (multipleChecksPermission.indexOf('openmenuContribute') >= 0) {
            $("#btnMultipleAction_Status").css('display', '');
            $("#btnMultipleAction_People").css('display', 'none');
            //  $("#btnMultipleAction_Counparty").css('display', '');
            if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All")
                $("#btnMultipleAction_BusnArea").css('display', '');
            $("#btnMultipleAction_Delete").css('display', 'none');
            $("#btnMultipleAction_NoPermission").css('display', 'none');

        }
        else if (multipleChecksPermission.indexOf('openmenuStatusContribute') >= 0) {
            $("#btnMultipleAction_Status").css('display', '');
            $("#btnMultipleAction_People").css('display', 'none');
            //  $("#btnMultipleAction_Counparty").css('display', '');
            if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All")
                $("#btnMultipleAction_BusnArea").css('display', '');
            $("#btnMultipleAction_Delete").css('display', 'none');
            $("#btnMultipleAction_NoPermission").css('display', 'none');
        }
        else {
            $("#btnMultipleAction_Status").css('display', '');
            $("#btnMultipleAction_People").css('display', '');
            //  $("#btnMultipleAction_Counparty").css('display', '');
            if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All")
                $("#btnMultipleAction_BusnArea").css('display', '');
            if (!(multipleChecksStatus.indexOf("Active") >= 0 || multipleChecksStatus.indexOf("Signed") >= 0 || multipleChecksStatus.indexOf("Awaiting Signatures") >= 0 || multipleChecksStatus.indexOf("Ready for Signature") >= 0 || multipleChecksStatus.indexOf("Up for Renewal") >= 0 || multipleChecksStatus.indexOf("About to Expire") >= 0 || (multipleChecksIsDraftByCurrent.indexOf("No") >= 0)))
                $("#btnMultipleAction_Delete").css('display', '');
            else {
                $("#btnMultipleAction_Delete").css('display', 'none');
            }
            $("#btnMultipleAction_NoPermission").css('display', 'none');

        }
    }

    if (ObjectNameToSend == "Draft" || ObjectNameToSend == "Draft & New Contracts") {
        $("#btnMultipleAction_Status").css('display', 'none');
        if (!(multipleChecksIsDraftByCurrent.indexOf("No") >= 0)) {
            $("#btnMultipleAction_Delete").css('display', '');
        }
        else {
            $("#btnMultipleAction_Delete").css('display', 'none');
        }
    }
    else {
        if (multipleChecksPermission.indexOf('openmenuDraft') >= 0) {
            $("#btnMultipleAction_Status").css('display', 'none');
        }
    }
    try {
        hideAllMenuAndStopPro(event);
    }
    catch (ex) {

    }
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

            query += ";EndDate:";
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

                        swal("", "View Name already exist, Please provide other view name."); // Bug(eO37164)
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
                                        query += ' <value>' + $.trim(temp) + '</value>';
                                    } else {
                                        query += ' <value></value>';
                                    }
                                    break;
                                case "Choice":
                                case "Multi- Choice (Dropdown)":
                                    temp = $("#" + $(val).attr('id') + "  input:text").filter("[id*='choice_value_']").val()
                                    if (temp != "" && temp != null && temp != "undefined") {
                                        if (temp[temp.length - 1] == ',') {
                                            temp = temp.substr(0, temp.lastIndexOf(','));
                                        }
                                    }
                                    query += ' <value>' + temp + '</value>';
                                    break;
                                case "User":
                                    temp = $("#" + $(val).attr('id') + " input:text").filter("[id*='user_value_']").val();
                                    if (temp != "" && temp != null && temp != "undefined") {
                                        if (temp[temp.length - 1] == ',') {
                                            temp = temp.substr(0, temp.lastIndexOf(','));
                                        }
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
                                        query += ' <value>' + $.trim(temp) + '</value>';
                                    } else {
                                        query += '<value></value>';
                                    }
                                    break;
                                case "Choice":
                                case "Multi- Choice (Dropdown)":
                                    temp = $("#" + $(val).attr('id') + " input:text").filter("[id*='choice_value_']").val();
                                    if (temp != "" && temp != null && temp != "undefined") {
                                        if (temp[temp.length - 1] == ',') {
                                            temp = temp.substr(0, temp.lastIndexOf(','));
                                        }
                                    }
                                    query += ' <value>' + $.trim(temp) + '</value>';
                                    break;
                                case "User":
                                    temp = $("#" + $(val).attr('id') + " input:text").filter("[id*='user_value_']").val();
                                    if (temp != "" && temp != null && temp != "undefined") {
                                        if (temp[temp.length - 1] == ',') {
                                            temp = temp.substr(0, temp.lastIndexOf(','));
                                        }
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
                                ViewFor: 'Contract',
                                ViewQuery: query,
                                DefaultViewName: qvName,
                                CreatedBy: localStorage.UserName,
                                ModifiedBy: localStorage.UserName,
                                isAdvanceView: 'Yes'
                            },
                            cache: false,
                            success: function (person) {
                                if (person == "Please provide other view name.") {
                                    $("#loadingPage").fadeOut();
                                    swal("", "View Name already exist, Please provide other view name."); // Bug(eO37164)
                                }
                                else {
                                    $("#addNewAdvanceView").dialog("close");
                                    //swal("", person);
                                    restoreAdvanceViewIntial();
                                    GetSavedViews();

                                    if (operation == 'add') {
                                        setTimeout(function () {
                                            var viewObj = $("#liContractViews li p a").filter('[id*=' + '"' + person.split('&')[0] + '"' + ']');
                                            $("#loadingPage").fadeOut();
                                            if (viewObj.length > 0)
                                                savedViewDisplay(viewObj[0])
                                        }, 5000);

                                    } else if (operation == 'update') {
                                        setTimeout(function () {
                                            var viewObj = $("#liContractViews li p a").filter('[id*=' + '"' + $("#txtViewID").val() + '"' + ']');
                                            $("#loadingPage").fadeOut();
                                            if (viewObj.length > 0)
                                                savedViewDisplay(viewObj[0])
                                        }, 5000);

                                    }

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
            } else {
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
            var $options = $("#ddlApproversNew > option").clone();
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

            if (workflowRoutingOptions.indexOf("Allow over-ride of Admin Configuration") == -1) {
                if (workflowRoutingOptions.indexOf("Allow replacing participants") == -1) {
                    $("#ddlAssignTo" + totalFileCount).prop('disabled', true).trigger("chosen:updated");
                    $("#ddlOrder" + totalFileCount).prop('disabled', true);
                }
                $("#txtStage" + totalFileCount).prop('disabled', true);
                $("#imgStageDelete" + totalFileCount).css("visibility", "hidden");
            }

        });
    }
    else if ($("#ddlRule option:selected").text() == "Ad-hoc") {
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
        var $options = $("#ddlApproversNew > option").clone();
        $('#ddlAssignTo' + totalFileCount).append($options);
        $("#ddlAssignTo" + totalFileCount).chosen().change(function () {
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

function contextMenuWork(action, el, pos) {

    switch (action) {
        case "delete":
            {
                var contractTitle = $(el).find("#ContractTitle").text();
                var entityid = $(el).find("#ContractID").text();
                var ContractType = $(el).find("#ContractType").text();
                var CloseOut = $(el).find("#CloseOut").text();
                var DraftDetailsTocheck = $(el).find("#IsDraftByCurrent").text();
                if (DraftDetailsTocheck != null && DraftDetailsTocheck != "") {
                    if (DraftDetailsTocheck.trim().toLowerCase() == "yes") {
                        CloseOut = "Yes";
                    }
                }
                DeleteContract(contractTitle, entityid, ContractType, CloseOut);
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
                approvalWorkflow = $(el).find("#ApprovalWorkflow").text();
                var contractTitle = $(el).find("#ContractTitle").text();
                var contractID = $(el).find("#ContractID").text();
                var businessArea = $(el).find("#BusinessArea").text();
                var contractArea = $(el).find("#ContractArea").text();
                var businessAreaPath = $(el).find("#BusinessAreaPath").text();
                //manoj
                var IsPublicStatus = $(el).find("#IsPublic").text();
                //For Contract Summary Sheet
                var contractType = $(el).find("#ContractType").text();
                var contractDocumentURL = $(el).find("#ContractDocumentURL").text();
                //For Contract Summary Sheet
                //For Contract Cover Sheet
                var contractSummaryDocumentURL = $(el).find("#SummeryBlobURL").text();
                var varContractStatus = $(el).find("#Status").text();
                var varContractPermission = $(el).find("#ActualPermission").text();
                //For Contract Cover Sheet
                //manoj
                OpenContractApproval(approvalWorkflow, contractTitle, contractID, businessArea, contractArea, businessAreaPath, IsPublicStatus, contractType, contractDocumentURL, contractSummaryDocumentURL, varContractStatus, varContractPermission);
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
                // $('#ddlHistoryFilter').val('All');
                CreateContractActivityList(contractID);
                $("#ddlHistoryFilter option[value='Amendment']").show();

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
                var contracttypedetails = $(el).find("#ContractType").text();
                var CloseOutDetails = $(el).find("#CloseOut").text();
                $('#hdEndDate').val($(el).find("#EndDate").text());
                var contractpermission = $(el).find("#Permission").text();
                ManageContractStatus(contractID, status, contracttypedetails, CloseOutDetails, null, contractpermission);

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
           //manoj
           //var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
           //var vAccFeat = $.grep(veContractFeatures, function (n, i) {
           //    return (n.RowKey == "16" && n.Status == "ON");
           //});
           //eO310563
           location = "/Contracts/EditContract?ContractID=" + contractID + "&ContractType=" + contractType + "&Duplicate=Yes&Stage=active";

           //if (vAccFeat.length > 0) {
           //    location = "/Contracts/EditContract?ContractID=" + contractID + "&ContractType=" + contractType + "&Duplicate=Yes&Stage=pipeline";
           //} else {
           //    location = "/Contracts/EditContract?ContractID=" + contractID + "&ContractType=" + contractType + "&Duplicate=Yes&Stage=active";
           //}

       }
       return;
   });

                break;
            }
            //Copy Contract link Enhancment
        case "copylink":
            {
                var contractID = $(el).find("#ContractID").text();
                $("#hdContractID").val(contractID);
                ClearCopyLinkForm();
                GetUniqueCopyLinkID();

                break;
            }
            //Copy Contract link Enhancment
    }
}

function DeleteContract(contractTitle, contractID, ContractTypeDetails, CloseOutDetails) {
    if (CloseOutDetails == "Yes") {
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
                   headers: { 'eContracts-ApiKey': localStorage.APIKey, 'UserName': localStorage.UserName },
                   cache: false,
                   success: function (data) {
                       location = location;
                   }
               });
           }
           return;
       });
    } else {
        swal({
            title: '',
            text: "Only closeout Contract Record can be deleted. Do you want to edit for closeout now?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            html: true
        },
        function (confirmed) {
            if (confirmed) {
                location = "/Contracts/EditContract?ContractID=" + contractID + "&ContractType=" + encodeURIComponent(ContractTypeDetails) + "&Closeout=Yes";
            }
            return;
        });
    }

}

function OpenContractApproval(approvalWorkflow, contractTitle, contractID, businessArea, contractArea, businessAreaPath, IsPublicStatus, contractType, contractDocumentURL, vSummeryBlobURL, vConItemStatus, vConItemPermission) {
    businessArea = unescape(businessArea);
    contractArea = unescape(contractArea);
    businessAreaPath = unescape(businessAreaPath);
    IsPublicStatus = unescape(IsPublicStatus);
    contractTitle = unescape(contractTitle);
    if (approvalWorkflow == "In Progress") {
        $("#loadingPage").fadeIn();
        workflowurltoshow = "";
        var workflowid = "";
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracts/' + contractID + '/activity',
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
                        if (ActivityType == "Contract Approval" && (Status == "In Progress" || Status == "Stopped")) {
                            if (workflowurltoshow == "") {
                                workflowurltoshow = '/Activity/TaskDetails?TaskID=&WorkflowID=' + RowKey;
                            }
                        }
                    }
                    $("#loadingPage").fadeOut();
                    $("#alertText1").html("Approval workflow is in progress for this contract");
                    $("#textingdetails").html('<a target="_blank" title="View Workflow Details" href=' + workflowurltoshow + '><font color="#44A6D8">View Workflow Details</font></a>');
                    $("#dvAlertDetails1").dialog("open");
                }
                else {
                    $("#loadingPage").fadeOut();
                    swal("", "Contract Approval is in progress for this contract.");
                }
            },
            error: function () {
                $("#loadingPage").fadeOut();
                swal("", "Contract Approval is in progress for this contract.");
            }
        });
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
        $("#hdWorkflowType").val("Contract Approval");
        $("#hdWorkflowContractArea").val(contractArea);
        $("#hdWorkflowBusinessArea").val(businessArea);
        $("#hdWorkflowBusinessAreaPath").val(businessAreaPath);
        $("#hdWorkflowObjectID").val(contractID);
        $("#hdWorkflowObjectTitle").val(contractTitle);
        //manoj
        $("#hdWorkflowIsPublic").val(IsPublicStatus);
        //manoj
        GetValuesAndAutoPopulate("ddlWorkflowCC", "");

        //manoj
        //For Contract Approval Sheet
        refreshsummarysheet();
        if (IsApprovalSheetFeatureExits) {
            GetContractTypeDetails(contractType, contractDocumentURL, contractArea, contractTitle);
        }
        //For Contract Approval Sheet
        $('#chkSendSummaryDoc').attr('checked', false);
        //For Contract Cover Sheet
        if (IsContractCoverSheetFeatureExits) {
            if (typeof (vSummeryBlobURL) != "undefined" && vSummeryBlobURL != null && vSummeryBlobURL != "") {
                getcontractsummerytemplate(contractType, vSummeryBlobURL, true, vConItemStatus, vConItemPermission);
            } else {
                getcontractsummerytemplate(contractType, vSummeryBlobURL, false, vConItemStatus, vConItemPermission);
            }
        }
        else {
            $("#lisummarydocument").css("display", "none");
        }

        //For Contract Cover Sheet
        //manoj

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
                    $("#lblDurationDate").html(moment(new Date()).add(vWorkflowSettings.TaskDuration, "days").format('MM/DD/YYYY'));
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
                            $("#txtWorkflowTitle").val(workflowRules.WorkflowTitle + ' for ' + contractTitle);
                        } else {
                            $("#txtWorkflowTitle").val('Approval for ' + contractTitle);
                        }
                    }
                    else {
                        if (typeof workflowRules.WorkflowTitle != 'undefined' && workflowRules.WorkflowTitle != "") {
                            $("#txtWorkflowTitle").val(workflowRules.WorkflowTitle + ' for ' + contractTitle);
                        } else {
                            $("#txtWorkflowTitle").val('Approval for ' + contractTitle);
                        }
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
                            var $options = $("#ddlApproversNew > option").clone();
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
                    }
                    else {
                        if ($("#ddlRule").html() == "")
                            $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                        if (!workflowAdHoc)
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
                        var $options = $("#ddlApproversNew > option").clone();
                        $('#ddlAssignTo' + totalFileCount).append($options);
                        $("#ddlAssignTo" + totalFileCount).chosen().change(function () {
                            var vasstoid = $(this).attr('id').replace("ddlAssignTo", "");
                            if ($(this).val() != null) {
                                if ($(this).val().length > 1)
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
                    var $options = $("#ddlApproversNew > option").clone();
                    $('#ddlAssignTo' + totalFileCount).append($options);
                    $("#ddlAssignTo" + totalFileCount).chosen().change(function () {
                        var vasstoid = $(this).attr('id').replace("ddlAssignTo", "");
                        if ($(this).val() != null) {
                            if ($(this).val().length > 1)
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
                }


                $("#loadingPage").fadeOut();
                $("#dvWorkflow").dialog("option", "title", "Contract Record Approval Workflow");
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
                var $options = $("#ddlApproversNew > option").clone();
                $('#ddlAssignTo' + totalFileCount).append($options);
                $("#ddlAssignTo" + totalFileCount).chosen().change(function () {
                    var vasstoid = $(this).attr('id').replace("ddlAssignTo", "");
                    if ($(this).val() != null) {
                        if ($(this).val().length > 1)
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
                $("#dvWorkflow").dialog("option", "title", "Contract Record Approval Workflow");
                $("#dvWorkflow").dialog("open");
                $("#dvWorkflow").height("auto");
                $("#loadingPage").fadeOut();
            }
        });
    }
}


function ManageContractStatus(contractID, status, ContractTypeDetail, CloseOut, thisvalue, permission) {
    //changed the order since hdcloseout is used in status pop up --Bug(eO37152)
    if (thisvalue != null) {
        var thisvalueparent = thisvalue.parentNode.parentNode;
        $("#hdCloseOut").val($(thisvalueparent).find("#CloseOut").text());
        CloseOut = $(thisvalueparent).find("#CloseOut").text();
        permission = $(thisvalueparent).find("#Permission").text();
    } else {
        $("#hdCloseOut").val(CloseOut);
    }

    contractstatusesbyCLMForSingleContract(status);
    $("#hdContractID").val(contractID);
    $("#hdContractIDStatus").val(status);
    $("#hdContractType").val(ContractTypeDetail);

    $('input:radio[name="FinalizedStatus"][value="' + status + '"]').prop('checked', true);
    $('#dvContCancelNote').css("display", "none");
    if ($("#txtReasonOfCancelContract").hasClass("validelement"))
        $("#txtReasonOfCancelContract").removeClass('validelement');
    $('.AutoChange').prop('disabled', true);
    if (CloseOut == "Yes") {
        $("#rtarchived").css("display", "");
        if (permission == 'openmenu') {
            $("#trCloseOutContract").html('<td class="labelleft padding_left_5px"><div class="mark_Con-Final"><a href="javascript:void(0);" onclick="DeleteContractRecord()"><span class="f_button_green">Delete Contract Record</span></a></div></td>');
            $("#trCloseOutContract").css("display", "");
        } else {
            $("#trCloseOutContract").css("display", "none");
        }
    } else {
        $("#rtarchived").css("display", "none");
        $("#trCloseOutContract").css("display", "");
        $("#trCloseOutContract").html('<td class="labelleft padding_left_5px"><div class="mark_Con-Final"><a href="javascript:void(0);" onclick="MarkContractAsCloseout();"><span class="f_button_green">Mark Contract Record as Closeout</span></a></div></td>')
    }
    //$("#dvManageContractStatus").dialog("open");
}

$('#btnContractTermCancel').click(function () {
    $("#txtReasonOfCancel").val("");
    GetValuesAndAutoPopulate("ddlSendToCancel", "");
    $("#dvCancelContract").dialog("open");
});

function ManageContractPeople(contractID) {
    $("#loadingPage").fadeIn();
    $("#hdContractID").val(contractID);
    var arrclear = [];
    ChosenOrder.setSelectionOrder($('#ddlContractManagers'), arrclear, true);
    ChosenOrder.setSelectionOrder($('#ddlReviewers'), arrclear, true);
    ChosenOrder.setSelectionOrder($('#ddlApproversNew'), arrclear, true);
    ChosenOrder.setSelectionOrder($('#ddlSignees'), arrclear, true);

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + contractID,
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
        processData: false,
        success: function (item) {
            contractItem = item;
            BindContractRoles(contractItem);
            $('input[name="ContractPrivacy"][value="' + item.ContractPrivacy + '"]').prop('checked', true);

            if (item.ContractManagers != "") {
                GetValuesAndAutoPopulate("ddlContractManagers", item.ContractManagers);

                $('#ddlContractManagers').data('previous', $('#ddlContractManagers').val());

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

            if (item.SharedWith == null || item.SharedWith == "") {
                $("#tdSharedWith").html("Not Available");
            }
            else {
                $("#tdSharedWith").html(item.SharedWith);
            }

            $('#newPopup').empty();


            GetValueAndPopulateManagerNew(item, null);
            var statusss = $('#chkpermission').is(':checked');

            arrUser = arrUser.filter(function (x) { return arrPermsnUser.indexOf(x) < 0 })
            var datalenght = arrUser.length;
            for (var i = 0; i < datalenght; i++) {
                var sUserName = arrUser[i];
                var article = '<option value="' + sUserName + '">' + sUserName + '</option>';
                $("#txtAddUser").append(article);
            }
            $("#txtAddUser").chosen();

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
                var vLastRow = $("#newPopup li").length;
                var totalPermissionCount = "1";
                if (typeof vLastRow == "undefined") {
                    totalPermissionCount = "1";
                }
                else {
                    totalPermissionCount = parseInt(vLastRow);
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


function GetValueAndPopulateManagerNew(contractItem, item) {
    var GBCOwners = [];
    contractAccessUsers = [];
    contractRoleAccessUsers = [];
    var users = [];
    if (contractItem.ProjectManager != null && contractItem.ProjectManager != "" && contractItem.ProjectManager != "Not Assigned") {
        users = contractItem.ProjectManager.split(';');
        $.each(users, function (index, value) {
            contractAccessUsers.push(value.trim());
        });
    }

    if (contractItem.BusinessAreaOwners != null && contractItem.BusinessAreaOwners != "" && contractItem.BusinessAreaOwners != "Not Assigned") {
        users = contractItem.BusinessAreaOwners.split(';');
        $.each(users, function (index, value) {
            contractAccessUsers.push(value.trim());
        });
    }

    if (contractItem.ContractAreaAdministrators != null && contractItem.ContractAreaAdministrators != "" && contractItem.ContractAreaAdministrators != "Not Assigned") {
        users = contractItem.ContractAreaAdministrators.split(';');
        $.each(users, function (index, value) {
            contractAccessUsers.push(value.trim());
        });
    }

    users = $.map(contractItem.Approvers.split(";"), $.trim);
    $.each(users, function (index, value) {
        contractAccessUsers.push(value.trim());
    });

    users = $.map(contractItem.Reviewers.split(";"), $.trim);
    $.each(users, function (index, value) {
        contractAccessUsers.push(value.trim());
    });

    users = $.map(contractItem.ContractManagers.split(";"), $.trim);
    $.each(users, function (index, value) {
        contractAccessUsers.push(value.trim());
    });

    users = $.map(contractItem.Requestor.split(";"), $.trim);
    $.each(users, function (index, value) {
        contractAccessUsers.push(value.trim());
    });

    users = $.map(contractItem.SharedWith.split(";"), $.trim);
    $.each(users, function (index, value) {
        contractAccessUsers.push(value.trim());
    });

    $(ContractRoles).each(function () {
        var itemfield = $(this)[0];
        var itemfieldPerm = $(this)[1];
        var itemfieldDis = $(this)[2];
        if ($(RecvMetadatavaluetofinalize).find(itemfield).text() != "undefined" && $(RecvMetadatavaluetofinalize).find(itemfield).text() != null && $(RecvMetadatavaluetofinalize).find(itemfield).text() != "") {
            users = $.map($(RecvMetadatavaluetofinalize).find(itemfield).text().split(";"), $.trim);
            $.each(users, function (index, value) {
                contractAccessUsers.push(value.trim());
                //manoj
                contractRoleAccessUsers.push({ 'RoleName': itemfield, 'DisplayRoleName': itemfieldDis, 'Permission': itemfieldPerm, 'UserName': value.trim() });
                //manoj
            });
        }
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

    } else {

        if (contractItem.FullControlPermissions != null && contractItem.FullControlPermissions != "") {
            users = contractItem.FullControlPermissions.split(';');
            $.each(users, function (index, value) {
                contractAccessUsers.push(value.trim());
            });
        }

        if (contractItem.ReadWritePermissions != null && contractItem.ReadWritePermissions != "") {
            users = contractItem.ReadWritePermissions.split(';');
            $.each(users, function (index, value) {
                contractAccessUsers.push(value.trim());
            });
        }


        if (contractItem.ReadOnlyPermissions != null && contractItem.ReadOnlyPermissions != "") {
            users = contractItem.ReadOnlyPermissions.split(';');
            $.each(users, function (index, value) {
                contractAccessUsers.push(value.trim());
            });
        }
    }

    //Rahul
    if (allUsers.length > 0 && allUsers != [] && typeof allUsers != 'undefined') {
        var allGlobalContractOwners = $.grep(allUsers, function (item, i) {
            return item.UserType.indexOf('Global Contract Owner') > -1;
        });
        if (allGlobalContractOwners.length > 0) {
            GBCOwners = allGlobalContractOwners.map(function (p) { return p.UserName; });
            contractAccessUsers = contractAccessUsers.concat(GBCOwners);
        }
    }

    //Rahul
    contractAccessUsers = contractAccessUsers.filter(function (e) { return e });
    contractAccessUsers = contractAccessUsers.sort();
    contractAccessUsers = stringArrayUnique(contractAccessUsers).sort();

    arrPermsnUser = contractAccessUsers;
    var vLastRow = $("#newPopup li:last").attr('id');

    var totalPermissionCount = "1";
    if (typeof vLastRow == "undefined") {
        totalPermissionCount = "1";
    }
    else {
        vLastRow = $("#newPopup li").length;
        totalPermissionCount = vLastRow;
        totalPermissionCount = parseInt(totalPermissionCount) + 1;
    }

    var string = "";

    arrUser = arrUser.filter(function (el) {
        return contractAccessUsers.indexOf(el) < 0;
    });
    var datalenght = arrUser.length;
    var article;
    for (var i = 0; i < datalenght; i++) {
        var sUserName = arrUser[i];
        article += '<option value="' + sUserName + '">' + sUserName + '</option>';
    }
    $("#txtAddUser").html(article);
    $("#txtAddUser").chosen();
    $('#txtAddUser').trigger('chosen:updated');

    //ENH-472 (In Contract, People & Permission tab display all the Global Contract Owners.)
    //var allGlobalContractOwners = $.grep(allUsers, function (item, value) {
    //    return item.UserType.indexOf('Global Contract Owner') > -1;
    //});

    //if (allGlobalContractOwners.length > 0) {
    //    $.each(allGlobalContractOwners, function (value, user) {
    //        var vUserClass = '';
    //        var userTitle = '';
    //        var pValue = value + 1;
    //        if (vActiveUsers.indexOf(user.UserName.trim()) < 0 && vActiveUsers.length > 0) {
    //            vUserClass = 'disabled_item_link';
    //            usertitle = "title='This user is no longer available.'";
    //        }

    //        string += "<li id='PermissionList" + pValue + "'><div class='share-pop-up-Middle'><div class='Link_UserProfile'><p id='PermissionUser" + pValue + "' class='" + vUserClass + "' " + userTitle + ">" + user.UserName.trim() + "</p>";
    //        string += "<span id='UserRole" + pValue + "'>" + "(Global Contract Owner)" + "</span></div></div>";
    //        string += "<div class='share-pop-up-Right'><span class='sortSpanUserPermission' id='UserPermission" + pValue + "'><label>Full Control</label></span></div></li>";

    //    });

    //    $('#newPopup').append(string);
    //}
    //string = '';
    //ENH-472 (In Contract, People & Permission tab display all the Global Contract Owners.)

    $.each(contractAccessUsers, function (index, value) {
        var vUserClass = '';
        var userTitle = '';
        var fullpermission = false;
        var strUserRole = "";
        var strPermission = "";
        if ($.inArray(value, $.map(contractItem.BusinessAreaOwners.split(";"), $.trim)) > -1) {
            strUserRole = "Business Area Owner";
            strPermission = "Full Control";
            fullpermission = true;
        }

        //Rahul Added on 9th March 2018
        var GlobalContractOwners = jQuery.grep(allGlobalContractOwners, function (user) {
            return (user.UserName == value);
        });

        if (GlobalContractOwners.length > 0) {
            strPermission = "Full Control";
            fullpermission = true;
            if (strUserRole != "") {
                strUserRole += ",Global Contract owner";
            }
            else {
                strUserRole = "Global Contract owner";
            }
        }
        //Rahul Added on 9th March 2018

        if ($.inArray(value, $.map(contractItem.ProjectManager.split(";"), $.trim)) > -1) {
            strPermission = "Full Control";
            fullpermission = true;
            if (strUserRole != "") {
                strUserRole += ",Project Manager";
            }
            else {
                strUserRole = "Project Manager";
            }
        }


        if ($.inArray(value, $.map(contractItem.ContractAreaAdministrators.split(";"), $.trim)) > -1) {
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

        if ($.inArray(value, $.map(contractItem.Approvers.split(";"), $.trim)) > -1) {
            if (strUserRole != "") {
                strUserRole += ",Approver";
            }
            else {
                strUserRole = "Approver";
            }
        }

        if ($.inArray(value, $.map(contractItem.Reviewers.split(";"), $.trim)) > -1) {
            if (strUserRole != "") {
                strUserRole += ",Reviewer";
            }
            else {
                strUserRole = "Reviewer";
            }
        }

        if ($.inArray(value, $.map(contractItem.ContractManagers.split(";"), $.trim)) > -1) {
            if (strUserRole != "") {
                strUserRole += ",Contract Owner";
            }
            else {
                strUserRole = "Contract Owner";
            }
        }
        if ($.inArray(value, $.map(contractItem.Requestor.split(";"), $.trim)) > -1) {
            if (strUserRole != "") {
                strUserRole += ",Requestor";
            }
            else {
                strUserRole = "Requestor";
            }
        }

        $(ContractRoles).each(function () {
            var itemfield = $(this)[0];
            var itemfieldPerm = $(this)[1];
            var itemfieldDis = $(this)[2];
            if ($(RecvMetadatavaluetofinalize).find(itemfield).text() != "undefined" && $(RecvMetadatavaluetofinalize).find(itemfield).text() != null && $(RecvMetadatavaluetofinalize).find(itemfield).text() != "") {
                if ($.inArray(value, $.map($(RecvMetadatavaluetofinalize).find(itemfield).text().split(";"), $.trim)) > -1) {
                    if (strUserRole != "") {
                        strUserRole += "," + itemfieldDis;
                    }
                    else {
                        strUserRole = itemfieldDis;
                    }
                }
            }
        });


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
                if (strPermission == "" || strPermission == "Read Only") {
                    strPermission = "Read Only";
                }
            }
        } else {
            if ($.inArray(value, $.map(contractItem.FullControlPermissions.split(";"), $.trim)) > -1) {
                strPermission = "Full Control";
            }

            if ($.inArray(value, $.map(contractItem.ReadWritePermissions.split(";"), $.trim)) > -1) {
                if (strPermission == "" || strPermission == "Read Only") {
                    strPermission = "Read/Write";
                }
            }

            if ($.inArray(value, $.map(contractItem.ReadOnlyPermissions.split(";"), $.trim)) > -1) {
                if (strPermission == "" || strPermission == "Read Only") {
                    strPermission = "Read Only";
                }
            }
        }

        if ($.inArray(value, $.map(contractItem.SharedWith.split(";"), $.trim)) > -1) {
            if (strUserRole != "") {
                strUserRole += "";
                strPermission = "Share";
                vUserClass = "Share"
            }
            else {
                strUserRole = "";
                strPermission = "Share";
                vUserClass = "Share";
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

        if (vUserClass == '') {
            if (vActiveUsers.indexOf(value.trim()) < 0 && vActiveUsers.length > 0) {
                vUserClass = 'disabled_item_link';
                userTitle = 'title="This user is no longer available."';
            }
        }
        else {
            vUserClass = '';
            userTitle = '';
        }

        string += "<li id='PermissionList" + totalPermissionCount + "'><div class='share-pop-up-Middle'><div class='Link_UserProfile'><p id='PermissionUser" + totalPermissionCount + "' class='" + vUserClass + "' " + userTitle + ">" + value.trim() + "</p>";

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
            if (strPermission == "Full Control" || strPermission == "Read/Write" || strPermission == "Read Only") {
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
                else if (strPermission == "Read Only") {
                    string += "<option value='FullControl'>Full Control</option>";
                    string += "<option value='Read/Write'>Read/Write</option>";
                    string += "<option value='ReadOnly' selected>Read Only</option>";
                }
                string += "</select>";
            }
            else {
                if (strPermission == "") {

                    //manoj
                    var FilterUser = $.grep(contractRoleAccessUsers, function (n, i) {
                        return (n.UserName == value);
                    });
                    if (FilterUser.length > 0) {
                        FullControlValue = $.grep(FilterUser, function (nF, iF) {
                            return (nF.Permission == "Full Control");
                        });
                        ContributeControlValue = $.grep(FilterUser, function (nF, iF) {
                            return (nF.Permission == "Read/Write");
                        });
                        ViewControlValue = $.grep(FilterUser, function (nF, iF) {
                            return (nF.Permission == "Read Only");
                        });
                        if (FullControlValue.length > 0) {
                            strPermission = "Full Control";
                        } else if (ContributeControlValue.length > 0) {
                            strPermission = "Read/Write";
                        } else {
                            strPermission = "Read Only";
                        }
                        string += "<label>" + strPermission + "</label>";
                    } else {
                        strPermission = "Read Only";
                        string += "<label>" + strPermission + "</label>";
                    }
                    //manoj
                }
                else if (strPermission == "Share") {
                    strPermission = "Shared As Link";
                    string += "<label>" + strPermission + "</label>";
                }
            }

            if (strUserRole == "" && strPermission != "Share" && strPermission != "Shared As Link") {
                string += "<img id=" + totalPermissionCount + " src='/Content/Images/close.png' onclick='Remove(this)'/>";
            }
            string += "</span></div></li>";
        }

        strPermission = "";
        totalPermissionCount = parseInt(totalPermissionCount) + 1;
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
    GBCOwners = [];
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
            $("#lblValidLinkDateContractIndex").html(moment(new Date()).add(settings.TaskDuration, "days").format('MM/DD/YYYY'));
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

    getNameAndEmail(contractID);
    getShareNameandEmailIdInternal(contractID, "ddlContractShareInternal");
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
                                if (item.FieldName == "ContractTermType") {
                                    vControls += '<td class="labelleft" style="word-break: break-all;">' + TermTypeDisplayName[$(vMetadata).find(item.FieldName).text()] + '</td>';
                                }
                                else {
                                    vControls += '<td class="labelleft">' + $(vMetadata).find(item.FieldName).text() + '</td>';
                                }

                            }

                            vControls += '</tr>';
                            vMetadataHTML = vMetadataHTML.replace("<" + item.FieldName + ">" + $(vMetadata).find(item.FieldName).text() + "</" + item.FieldName + ">", "");
                            $("#tblSummaryMetadata").append(vControls);

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
                                                }
                                                else if (vField[0].FieldName == "ContractTermType") {
                                                    vControls += '<td class="labelleft" style="word-break: break-all;">' + TermTypeDisplayName[value] + '</td>';
                                                }
                                                else {
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

}

function MetadataDetails() {
    $("#Summary").removeClass('pop_up__Acti');
    $("#Details").addClass('pop_up__Acti');
    $('#tblSummary').css("display", "none");
    $('#tblDetailsMetadata').css("display", "");

}

function ManageRelatedContracts(ContractID, ContractTitle, BusinessAreaPath) {
    BusinessAreaPath = unescape(BusinessAreaPath);
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

}

function OpenRelatedContractsPopup(ContractID, BusinessAreaPath) {
    var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/getrelatedcontracts?stage=&searchkeyword=&customquery=&sortbyfield=ContractTitle&orderby=ASC';
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
                    $("#" + item.RowKey).click(function () {
                        if (this.checked) {
                            var vOptions = "<select class='f_inpt width90'>";
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

                        } else {

                            $(this).parent().parent().children(".ddl").empty();
                        }

                    });
                }
            });

            var vCount = $("#tblPopupContracts tr").length;
            if (vCount != 0) {
                $("#tblPopupContracts tr td").attr('style', 'vertical-align: top');
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
            $('#loadContract').html('<p style="margin-left: 20px;">No items found.</p>');
            $("#popupContracts").dialog("option", "title", "Related Contract Record(s)");
            $("#popupContracts").dialog("open");
            $("#loadingPage").fadeOut();
        }
    });
}

function ViewContracts() {
    $("#tblPopupContracts").html('');
    $('#loadContract').html('<img src="../Content/Images/icon/loading.gif"> Searching...');
    var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/getrelatedcontracts?stage=&searchkeyword=' + encodeURIComponent($("#txtSearchBoxContract").val()) + '&customquery=&sortbyfield=ContractTitle&orderby=ASC';
    $.ajax({
        url: vURL,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey, BusinessAreaLocation: $("#lblBusinessAreaPath").text() },
        cache: false,
        success: function (data) {
            $("#tblPopupContracts").html('');
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                if ($("#hdnRelatedContractID").html().indexOf(item.RowKey) > -1) { }
                else {
                    var article = '<tr><td>';
                    article += '<input id="' + item.RowKey + '" type="checkbox" name="RelatedContract" class="css1-checkbox" value="' + item.ContractTitle + '" />';
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

                    $("#" + item.RowKey).click(function () {
                        if (this.checked) {
                            var vOptions = "<select class='f_inpt width90'>";
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

                        } else {

                            $(this).parent().parent().children(".ddl").empty();
                        }

                    });
                }
            }
            var vCount = $("#tblPopupContracts tr").length;
            if (vCount != 0) {
                $('#loadContract').html('');
                $("#tblPopupContracts tr td").attr('style', 'vertical-align: top');
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
});

$("#ddlRelationshipTypeParent").change(function () {

    $('input:checkbox[name="RelatedContract"]:checked').each(function () {
        $(this).parent().parent().children(".ddl").empty();
        var vOptions = "<select class='f_inpt width90'>";
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

           swal("", "Related Contract Deleted");
           BindRelatedContracts();
       }
       return;
   });

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
            if (data != null) {
                var datalenght = data.length;
                var allInternal = ''
                var totalFileCount = 0;
                var iex = 0;
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];

                    totalFileCount++;
                    if (item.InternalOrExternal == "External") {
                        if (iex == 0) {
                            iex = 1;
                            $('#txtShareContract1').val(item.ContactName);
                            $('#txtShareContractEmail1').val(item.EmailID);
                        }
                        else {
                            var htmlFormatFile = '<tr id="trShareContract' + totalFileCount + '">';
                            htmlFormatFile += '<td>';
                            htmlFormatFile += '<input id="txtShareContract' + totalFileCount + '" maxlength="42" value="' + item.ContactName + '" name="ShareContractName' + totalFileCount + '" placeholder="Name" title="Name" type="text" class="f_inpt width90" value="' + item.ContactName + '" />';
                            htmlFormatFile += '</td>';
                            htmlFormatFile += '<td>';
                            htmlFormatFile += '<input id="txtShareContractEmail' + totalFileCount + '" maxlength="50" value="' + item.EmailID + '" name="ShareContractEmail' + totalFileCount + '" placeholder="Email ID" title="Email ID" type="text" class="f_inpt width90 validelement validemail" value="' + item.EmailID + '" />';
                            htmlFormatFile += '</td>';
                            htmlFormatFile += '<td style="width:20px">';
                            htmlFormatFile += '<a href="javascript:void(0)" onclick="DeleteShareContract(this)"><img src="../Content/Images/icon/delete.png" /></a>';
                            htmlFormatFile += '</td>';
                            htmlFormatFile += '</tr>';
                            $("#tblShareContract").append(htmlFormatFile);
                        }
                    }
                    else {
                        allInternal += item.ContactName + ";";
                    }
                }
                GetTextAndAutoPopulateNotHidden("ddlContractShareInternal", allInternal);
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
            peoples = data;
            for (var i = 0; i < datalength; i++) {
                var item = data[i];
                var sRowKey = item.RowKey;
                var sUserName = item.UserName;
                var sEmail = item.EmailID;
                var sUserType = item.UserType;
                if (sUserType.indexOf("Global Contract Owner") >= 0) {
                    arrGlobalUser.push(sUserName);
                } else { arrUser.push(sUserName); }
                var articleemailuser = '<option value="' + sUserName + '" data-emailvalue="' + sEmail + '">' + sUserName + '</option>';
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

                $("#ddlSendToCancel").append(article);
                $("#ddlSendToCancelMul").append(article);
                $("#ddlRenewalNotfInternal").append(article);
                $("#ddlSendUserToRenewalConfirmUsers").append(article);
                $("#ddlSendUserToRenewalConfirmUsersCC").append(article);
                $("#ddlRenewalNotfInternalNew").append(article);

                $("#ddlDocumentShareInternal").append(articleemailuser);
                $("#ddlContractShareInternal").append(articleemailuser);
            }
            $("#ddlBusinessOwners").chosen();
            $("#ddlSendToCancel").chosen();
            $("#ddlSendToCancelMul").chosen();
            $("#ddlContractManagers").chosen();

            $("#ddlSendUserToRenewalConfirmUsers").chosen();
            $("#ddlSendUserToRenewalConfirmUsersCC").chosen();
            $("#ddlRenewalNotfInternalNew").chosen();
            $("#ddlDocumentShareInternal").chosen();
            $("#ddlContractShareInternal").chosen();

            $("#ddlContractManagers").chosen().on("change", function (evt, params) {
                var previous = $(this).data("previous") || "";
                if ($('#chkpermission').is(':checked')) {
                    var ddl = $(this);

                    var present = ddl.val();
                    if (present != null) {
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
                    else {
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
                            $(this).data("previous", "");

                        }
                    }


                }
            });

            $("#ddlReviewers").chosen();

            $("#ddlReviewers").chosen().on("change", function (evt, params) {
                var previous = $(this).data("previous") || "";
                if ($('#chkpermission').is(':checked')) {
                    var ddl = $(this);

                    var present = ddl.val();
                    if (present != null) {
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
                    else {
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
                            $(this).data("previous", "");

                        }
                    }


                }
            });

            $("#ddlApproversNew").chosen();

            $("#ddlApproversNew").chosen().on("change", function (evt, params) {
                var previous = $(this).data("previous") || "";
                if ($('#chkpermission').is(':checked')) {
                    var ddl = $(this);

                    var present = ddl.val();
                    if (present != null) {
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
                    else {
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
                            $(this).data("previous", "");

                        }
                    }


                }
            });


            $("#ddlSignees").chosen();
            $("#ddlSignees").chosen().on("change", function (evt, params) {
                var previous = $(this).data("previous") || "";
                if ($('#chkpermission').is(':checked')) {
                    var ddl = $(this);
                    var present = ddl.val();
                    if (present != null) {
                        if (present.length > previous.length || previous == "") {
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
                    else {
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
                            $(this).data("previous", "");

                        }
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


function CreateContractActivityList(ContractID, obj) {
    $("#hdContractID").val(ContractID);
    $("#loadingPage").fadeIn();
    var vUrl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/activities/contracts/' + ContractID + '?actiontype=';
    if (obj !== undefined) {
        vUrl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/activities/contracts/' + ContractID + '?actiontype=&objectname=' + obj;
    }
    else {
        $("#ddlHistoryFilter").val($("#ddlHistoryFilter option:first").val());
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
            $('#compact-pagination-Activity').css('display', '');
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
            $("#contractLogs").empty();
            $("#contractLogs").append('No items found.');
            $('#contractLogsPopup').dialog('open');
            $('#compact-pagination-Activity').css('display', 'none');
        }
    });
}

function AddShareContract() {
    var vLastRow = $("#tblShareContract tr:last").attr('id');
    var totalFileCount = 2;
    if (typeof vLastRow == "undefined") {
        totalFileCount = 2;
    }
    else {
        totalFileCount = parseInt(vLastRow.replace("trShareContract", ""));

        totalFileCount = parseInt(totalFileCount) + 1;
    }
    var count = $("#tblShareContract tr").length;

    if (count < 10) {

        var htmlFormatFile = '<tr id="trShareContract' + totalFileCount + '">';
        htmlFormatFile += '<td>';
        htmlFormatFile += '<input id="txtShareContract' + totalFileCount + '" maxlength="42" name="ShareContractName' + totalFileCount + '" placeholder="Name" title="Name" type="text" class="f_inpt width90 validelement " />';
        htmlFormatFile += '</td>';
        htmlFormatFile += '<td>';
        htmlFormatFile += '<input id="txtShareContractEmail' + totalFileCount + '" maxlength="50" name="ShareContractEmail' + totalFileCount + '" placeholder="Email ID" title="Email ID" type="text" class="f_inpt width90 validelement validemail" />';
        htmlFormatFile += '</td>';
        htmlFormatFile += '<td style="width:20px">';
        htmlFormatFile += '<a href="javascript:void(0)" onclick="DeleteShareContract(this)"><img src="../Content/Images/icon/delete.png" /></a>';
        htmlFormatFile += '</td>';
        htmlFormatFile += '</tr>';

        $("#tblShareContract").append(htmlFormatFile);


    }
    if (count == 9) {
        $(".addmorelinks").hide();
    }
}

function DeleteShareContract(n) {
    n.parentNode.parentNode.parentNode.removeChild(n.parentNode.parentNode);
    $(".addmorelinks").show();
}

function ShareContract() {
    var vValid = requiredValidator('shareContract');
    if (vValid) {
        var emailvalue = "";
        arremail = [];
        var ExternalEmail = [];
        $('#shareContract .validemail').each(function (i, item) {
            if (emailvalue == '') {
                emailvalue = item.value;
                if (emailvalue != "") {
                    ExternalEmail.push(emailvalue);
                    arremail.push(emailvalue);
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
        var notify = $("#ddlContractShareInternal").chosen().find("option:selected");
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
            var contractForm = $("#frmShareContract *").serialize();
            contractForm += "&SendBy=" + localStorage.UserName;
            contractForm += "&Notes=" + $("#txtShareNotesContract").val();
            contractForm += "&ExpIn=" + $("#txtShareExpInContract").val();
            contractForm += "&ContractTitle=" + $("#hdContractTitle").val();
            contractForm += "&AllowComment=" + ($("#chkAllowComment").is(':checked') ? 'Yes' : '');
            contractForm += "&AutoUpdateStatus=" + ($("#chkAutoUpdateStatusShare").is(':checked') ? 'Yes' : 'No');

            contractForm += "&InternalUsers=" + notyEmail;
            if ($("#chkDiscloseCon").is(':checked')) {
                contractForm += "&Disclose=Yes";
            } else {
                contractForm += "&Disclose=No";
            }
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracts/Share?contractid=' + $("#hdContractID").val(),
                type: 'POST',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                data: contractForm,
                cache: false,
                success: function (person) {
                    swal("", "Contract Shared.");
                    $("#shareContract").dialog("close");
                    $("#loadingPage").fadeOut();
                    ClearShareForm();
                    applyFilter($("#conSortByOptions").val());
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
            $('#shareContract .validemail').each(function (i, item) {
                for (i = 0; i <= reportRecipientsDuplicate.length; i++) {
                    if (item.value == reportRecipientsDuplicate[i]) {
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
    $("#txtShareExpIn").val('');
    $("#chkAllowComment").prop('checked', false);
    $("#hdContractID").val('');
    GetValuesAndAutoPopulate("ddlContractShareInternal", "");
    if (contractItem.IsFinalized == 'Yes') {
        $("#trAutoUpdateStatusShare").css('display', 'none');
    } else {
        $("#trAutoUpdateStatusShare").css('display', '');
    }
    $('#tblShareContract').empty();
    $('#chkDiscloseCon').attr('checked', false);
    var vSignee = '<tr>';
    vSignee += '<td>';
    vSignee += '<input id="txtShareContract1" name="ShareContractName1" maxlength="42" title="Name" placeholder="Name" type="text" class="f_inpt width90 validelement" />';
    vSignee += '</td>';
    vSignee += '<td>';
    vSignee += '<input id="txtShareContractEmail1" name="ShareContractEmail1" maxlength="50" title="Email ID" placeholder="Email ID" type="text" class="f_inpt width90 validelement validemail" />';
    vSignee += '</td>';
    vSignee += '<td style="width:20px">&nbsp;</td>';
    vSignee += '</tr>';
    $('#tblShareContract').html(vSignee);
    $(".validelement").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });
    $(".error").removeClass("error");
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
                $('#allAlerts').addClass("alertbox_status");
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
                    article += '<li>';
                    article += '<div class="d_left-table">' + sNotificationDate;
                    article += '</div>';
                    article += '<div class="d_middle-table">';
                    article += '<p class="text width100">' + sNotificationTitle + '&nbsp;' + vPriorityIcon + '</p>';
                    article += '</div>';
                    article += '<div class="d_right-table">';
                    article += '<p class="text">' + item.UserID + '</p>';
                    article += '</div>';
                    article += '</li>';
                    $("#alertsListAll").append(article);
                }
                $("#hdContractID").val('');
                if (datalength >= 10) {
                    $('#compact-pagination-Alerts').pagination({
                        items: data.length,
                        itemsOnPage: 10,
                        type: 'ul',
                        typeID: 'alertsListAll',
                        row: 'li',
                        cssStyle: 'compact-theme',
                        resultcount: 'spResult_ContractsRecent'
                    });
                }
                else {
                    $('#compact-pagination-Alerts').pagination('destroy');
                    $("#spResult_ContractsRecent").empty();
                }
                $("#loadingPage").fadeOut();
                $('#allAlerts').addClass("alertbox_status");
                $('#allAlerts').dialog('open');
            }
        },
        error:
            function (data) {
                $("#alertsListAll").append('<li class="f_p-error">No Alert Sent</li>');
                $("#loadingPage").fadeOut();
                $('#allAlerts').addClass("alertbox_status");
                $('#allAlerts').dialog('open');
            }
    });
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
            ChangeContractStatus();
            return true;
        }
    } else if (selectedValue == "Renewed") {
        if ($("#dtRenewalDate")[0].value == "") {
            swal("", "Select renewal date.");
            return false;
        } else {
            ChangeContractStatus();
            return true;
        }
    } else if (selectedValue == "Extended") {
        if ($("#dtExtendedDate")[0].value == "") {
            swal("", "Select extended date.");
            return false;
        } else {
            ChangeContractStatus();
            return true;
        }
    } else if (selectedValue == "undefined" || selectedValue == "0" || selectedValue == "") {

        swal("", "Select Status");
        return false;
    } else {
        ChangeContractStatus();

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
function CancelContract() {
    if (requiredValidator('dvCancelContract', false)) {
        swal({
            title: '',
            text: "Are you sure you want to <span style=\"font-weight:700\">cancel</span> this contract?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            html: true
        },
     function (confirmed) {
         if (confirmed) {
             $("#loadingPage").fadeIn();
             var notify = $("#ddlSendToCancel").val();
             var noty = '';
             $(notify).each(function (i, item) {
                 if (noty == '') {
                     noty = item;
                 }
                 else {
                     noty += ";" + item;
                 }
             });
             var vCancelNote = "CancelledReason=" + $("#txtReasonOfCancel").val() + "&UsersToNotify=" + noty;
             $.ajax({
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + $("#hdContractID").val() + '/changestatus?status=Cancelled',
                 type: 'PUT',
                 dataType: 'json',
                 headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                 data: vCancelNote,
                 cache: false,
                 success: function (result) {
                     $("#loadingPage").fadeOut();
                     $("#dvCancelContract").dialog("close");
                     $("#dvContractTerm").dialog("close");
                     $("#dvManageContractStatus").dialog("close");
                     applyFilter();
                 },
                 error: function (data) {
                     $("#loadingPage").fadeOut();
                 }
             });
         }
         return;
     });

    }
}
function CancelContractMul() {
    if (requiredValidator('dvCancelContractMul', false)) {
        swal({
            title: '',
            text: "Are you sure you want to <span style=\"font-weight:700\">cancel</span> this contract?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            html: true
        },
     function (confirmed) {
         if (confirmed) {
             $("#loadingPage").fadeIn();
             var notify = $("#ddlSendToCancelMul").val();
             var noty = '';
             $(notify).each(function (i, item) {
                 if (noty == '') {
                     noty = item;
                 }
                 else {
                     noty += ";" + item;
                 }
             });
             var vCancelNote = "CancelledReason=" + $("#txtReasonOfCancelMul").val() + "&UsersToNotify=" + noty;
             $.ajax({
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + multipleChecks + '/changestatus?status=Cancelled',
                 type: 'PUT',
                 dataType: 'json',
                 headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                 data: vCancelNote,
                 cache: false,
                 success: function (result) {
                     $("#dvCancelContractMul").dialog("close");

                     $("#loadingPage").fadeOut();
                     $("#dvManageContractStatusMul").dialog("close");
                     applyFilter();
                     $('#SelectAll').attr('checked', false);
                     $("#btnMultipleAction").css('display', ' ');
                 },
                 error: function (data) {
                     $("#loadingPage").fadeOut();
                 }
             });
         }
         return;
     });

    }
}
function ChangeContractStatus() {
    if (requiredValidator("dvManageContractStatus", false)) {
        $("#loadingPage").fadeIn();
        var stat = '';
        stat = decodeURI($("input:radio[name=FinalizedStatus]:checked").val());
        var vStatusNote = '';
        if (stat == "Cancelled" && $("#hdContractIDStatus").val() != "Cancelled") {
            $("#loadingPage").fadeOut();
            $("#txtReasonOfCancel").val("");
            GetValuesAndAutoPopulate("ddlSendToCancel", "");
            $("#dvCancelContract").dialog("open");
            //vStatusNote = "CancelledReason=" + $("#txtReasonOfCancelContract").val();
        }
        else if (stat == $("#hdContractIDStatus").val()) {
            $("#loadingPage").fadeOut();
            $("#dvManageContractStatus").dialog("close");
        }
        else if ($('#hdContractIDStatus').val() == "Expired") {
            if ($('#hdEndDate').val() != "null") {
                var EndDate = new Date($('#hdEndDate').val());
                var EndDateMonthDateFormate = (EndDate.getUTCMonth() + 1) + '/' + EndDate.getUTCDate() + '/' + EndDate.getUTCFullYear();
                var TodaysDate = new Date();
                var month = TodaysDate.getUTCMonth() + 1;
                var day = TodaysDate.getUTCDate();
                var TodaysDateMonthDateFormate = month + '/' + day + '/' + TodaysDate.getUTCFullYear();
                if (Date.parse(EndDateMonthDateFormate) < Date.parse(TodaysDateMonthDateFormate)) {
                    swal({
                        title: '',
                        text: "This contract is expired, still if you want to change the status, extend the contract end date",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'No',
                        html: true
                    },
      function (confirmed) {
          if (confirmed) {
              ManageContractTerm($("#hdContractID").val());
          }
          else { $("#loadingPage").fadeOut(); }
          return;
      });
                }
                else {
                    ChangeContractStatusMethod(stat);
                }
            }
            else {
                ChangeContractStatusMethod(stat);
            }
        }
        else {
            ChangeContractStatusMethod(stat);
        }
    }
}


function changestatus() {
    $('.ui-button-green-text').parent().attr('disabled', 'disabled');
    var stat = decodeURI($("input:radio[name=rdstatus]:checked").val());
    var vCancelNote = '';
    if (stat == "Cancelled") {
        $("#loadingPage").fadeOut();
        $("#txtReasonOfCancel").val("");
        GetValuesAndAutoPopulate("ddlSendToCancel", "");
        $("#dvCancelContract").dialog("open");
        //vStatusNote = "CancelledReason=" + $("#txtReasonOfCancelContract").val();
    }
    else {
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
        $("#chkPublicContract").attr("disabled", "disabled");
        $("#chkPublicContract").prop('checked', false);
        $("#divBottom").show();

    } else {
        $("#loadingPage").fadeIn();
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/defaultpermission?contractid=' + contractItem.RowKey,
            type: 'GET',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
            cache: false,
            success: function (item) {
                $('#newPopup').empty();
                GetValueAndPopulateManagerNew(contractItem, item);
                var vLastRow = $("#newPopup li").length;
                var totalPermissionCount = "1";
                if (typeof vLastRow == "undefined") {
                    totalPermissionCount = "1";
                }
                else {
                    totalPermissionCount = parseInt(vLastRow);
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

        var ReadOnlyUsers = "";
        var ReadWriteUser = "";
        var FullControlUsers = "";
        var status = "";
        var newArray = [];
        ///new pop up///
        var vLastRow = $("#newPopup li")
        $(vLastRow).each(function (idel, itemval) {
            if (typeof itemval.id != "undefined") {
                var i = parseInt(itemval.id.replace("PermissionList", ""));
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
        });

        var array2 = (cm + ";" + rev + ";" + app + ";" + sign).split(';');

        var arrDiff = [];
        $.grep(array2, function (el) {

            if ($.inArray(el.trim(), newArray) == -1 && $.inArray(el.trim(), arrDiff) == -1 && el.trim() != '') arrDiff.push(el.trim());

        });

        if ($("#chkpermission").is(':checked')) {
            if (arrDiff.length == 0) {

                status = $("#chkpermission").is(':checked') ? 'Yes' : 'No';
                var vIsPublic = $("#chkPublicContract").is(':checked') ? 'Yes' : 'No';
                var formData = new FormData();
                formData.append("ContractManagers", cm);
                formData.append("PermissionAssignment", "Role-Based");
                formData.append("Reviewers", rev);
                formData.append("Approvers", app);
                formData.append("Signees", sign);
                formData.append("ExternalSignees", $("#txtExternalSignee").val());

                formData.append("ModifiedBy", localStorage.UserName);
                formData.append("IsPublic", vIsPublic);
                formData.append("CustomPermission", status);



                var read = [];
                var writeRead = [];
                var full = [];
                var UniqueUsers = [];
                $(".ContractRoleType").each(function () {
                    var valddl = $(this).val();
                    var IDddl = this.id;
                    var Permi = $(this).attr('data-permission');
                    var vallt = '';
                    $(valddl).each(function (i, item) {
                        if (vallt == '') {
                            vallt = item;
                        }
                        else {
                            vallt += "; " + item;
                        }

                        if (Permi == "Read Only") {
                            read.push(item);
                            if ($.inArray(item, ReadContractroleUser) > -1) {
                                ReadContractroleUser = jQuery.grep(ReadContractroleUser, function (value) {
                                    return value != item;
                                });
                            }
                        }
                        else if (Permi == "Read/Write") {
                            writeRead.push(item);
                            if ($.inArray(item, ReadWriteContractroleUser) > -1) {
                                ReadWriteContractroleUser = jQuery.grep(ReadWriteContractroleUser, function (value) {
                                    return value != item;
                                });
                            }
                        }
                        else if (Permi == "Full Control") {
                            full.push(item);
                            if ($.inArray(item, FullContractroleUser) > -1) {
                                FullContractroleUser = jQuery.grep(FullContractroleUser, function (value) {
                                    return value != item;
                                });
                            }
                        }
                    });
                    formData.append(IDddl, vallt);
                });
                var arrFull = $.map(contractItem.FullControlPermissions.split(";"), $.trim);
                var arrReadWrite = $.map(contractItem.ReadWritePermissions.split(";"), $.trim);
                var arrRead = $.map(contractItem.ReadOnlyPermissions.split(";"), $.trim);
                $(FullContractroleUser).each(function () {
                    var username = this.toString().trim();
                    arrFull = jQuery.grep(arrFull, function (value) {
                        return value != username;
                    });

                })
                $(ReadWriteContractroleUser).each(function () {
                    var username = this.toString().trim();
                    arrReadWrite = jQuery.grep(arrReadWrite, function (value) {
                        return value != username;
                    });
                })
                $(ReadContractroleUser).each(function () {
                    var username = this.toString().trim();
                    arrRead = jQuery.grep(arrRead, function (value) {
                        return value != username;
                    });

                })

                contractItem.FullControlPermissions = arrFull.join('; ');
                contractItem.ReadWritePermissions = arrReadWrite.join('; ');
                contractItem.ReadOnlyPermissions = arrRead.join('; ');
                $(full).each(function () {
                    var username = this.toString();
                    if ($.inArray(username, $.map(FullControlUsers.split(";"), $.trim)) == -1) {
                        FullControlUsers = FullControlUsers + "; " + username;
                    }
                    if ($.inArray(username, writeRead) > -1) {
                        writeRead = jQuery.grep(writeRead, function (value) {
                            return value != username;
                        });
                    }
                    if ($.inArray(username, read) > -1) {
                        read = jQuery.grep(read, function (value) {
                            return value != username;
                        });
                    }
                    if ($.inArray(username, UniqueUsers) == -1)
                        UniqueUsers.push(username);
                })
                $(writeRead).each(function () {
                    var username = this.toString();
                    if ($.inArray(username, $.map(ReadWriteUser.split(";"), $.trim)) == -1) {
                        ReadWriteUser = ReadWriteUser + "; " + username;
                    }

                    if ($.inArray(username, read) > -1) {
                        read = jQuery.grep(read, function (value) {
                            return value != username;
                        });
                    }
                    if ($.inArray(username, UniqueUsers) == -1)
                        UniqueUsers.push(username);
                })
                $(read).each(function () {
                    var username = this.toString();
                    if ($.inArray(username, $.map(ReadOnlyUsers.split(";"), $.trim)) == -1) {
                        ReadOnlyUsers = ReadOnlyUsers + "; " + username;
                    }
                    if ($.inArray(username, UniqueUsers) == -1)
                        UniqueUsers.push(username);

                })
                var uniUser = '';
                $(UniqueUsers).each(function (i, item) {
                    if (uniUser == '') {
                        uniUser = item;
                    }
                    else {
                        uniUser += "; " + item;
                    }
                });
                formData.append("ContractRoleUsers", uniUser);
                formData.append("ReadOnlyPermissions", ReadOnlyUsers);
                formData.append("ReadWritePermissions", ReadWriteUser);
                formData.append("FullControlPermissions", FullControlUsers);
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + $("#hdContractID").val() + '/ipeopleupdate',
                    type: 'PUT',
                    // dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    cache: false,
                    success: function (person) {
                        $('.ui-button-green-text').parent().removeAttr('disabled');

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
            status = $("#chkpermission").is(':checked') ? 'Yes' : 'No';
            var vIsPublic = $("#chkPublicContract").is(':checked') ? 'Yes' : 'No';
            var formData = new FormData();
            formData.append("ContractManagers", cm);
            formData.append("PermissionAssignment", "Role-Based");
            formData.append("Reviewers", rev);
            formData.append("Approvers", app);
            formData.append("Signees", sign);
            formData.append("ExternalSignees", $("#txtExternalSignee").val());

            formData.append("ModifiedBy", localStorage.UserName);
            formData.append("IsPublic", vIsPublic);
            formData.append("CustomPermission", status);



            var read = [];
            var writeRead = [];
            var full = [];
            var UniqueUsers = [];
            $(".ContractRoleType").each(function () {
                var valddl = $(this).val();
                var IDddl = this.id;
                var Permi = $(this).attr('data-permission');
                var vallt = '';
                $(valddl).each(function (i, item) {
                    if (vallt == '') {
                        vallt = item;
                    }
                    else {
                        vallt += "; " + item;
                    }

                    if (Permi == "Read Only") {
                        read.push(item);
                        if ($.inArray(item, ReadContractroleUser) > -1) {
                            ReadContractroleUser = jQuery.grep(ReadContractroleUser, function (value) {
                                return value != item;
                            });
                        }
                    }
                    else if (Permi == "Read/Write") {
                        writeRead.push(item);
                        if ($.inArray(item, ReadWriteContractroleUser) > -1) {
                            ReadWriteContractroleUser = jQuery.grep(ReadWriteContractroleUser, function (value) {
                                return value != item;
                            });
                        }
                    }
                    else if (Permi == "Full Control") {
                        full.push(item);
                        if ($.inArray(item, FullContractroleUser) > -1) {
                            FullContractroleUser = jQuery.grep(FullContractroleUser, function (value) {
                                return value != item;
                            });
                        }
                    }
                });
                formData.append(IDddl, vallt);
            });
            var arrFull = $.map(contractItem.FullControlPermissions.split(";"), $.trim);
            var arrReadWrite = $.map(contractItem.ReadWritePermissions.split(";"), $.trim);
            var arrRead = $.map(contractItem.ReadOnlyPermissions.split(";"), $.trim);
            $(FullContractroleUser).each(function () {
                var username = this.toString().trim();
                arrFull = jQuery.grep(arrFull, function (value) {
                    return value != username;
                });

            })
            $(ReadWriteContractroleUser).each(function () {
                var username = this.toString().trim();
                arrReadWrite = jQuery.grep(arrReadWrite, function (value) {
                    return value != username;
                });
            })
            $(ReadContractroleUser).each(function () {
                var username = this.toString().trim();
                arrRead = jQuery.grep(arrRead, function (value) {
                    return value != username;
                });

            })

            contractItem.FullControlPermissions = arrFull.join('; ');
            contractItem.ReadWritePermissions = arrReadWrite.join('; ');
            contractItem.ReadOnlyPermissions = arrRead.join('; ');
            $(full).each(function () {
                var username = this.toString();
                if ($.inArray(username, $.map(FullControlUsers.split(";"), $.trim)) == -1) {
                    FullControlUsers = FullControlUsers + "; " + username;
                }
                if ($.inArray(username, writeRead) > -1) {
                    writeRead = jQuery.grep(writeRead, function (value) {
                        return value != username;
                    });
                }
                if ($.inArray(username, read) > -1) {
                    read = jQuery.grep(read, function (value) {
                        return value != username;
                    });
                }
                if ($.inArray(username, UniqueUsers) == -1)
                    UniqueUsers.push(username);
            })
            $(writeRead).each(function () {
                var username = this.toString();
                if ($.inArray(username, $.map(ReadWriteUser.split(";"), $.trim)) == -1) {
                    ReadWriteUser = ReadWriteUser + "; " + username;
                }

                if ($.inArray(username, read) > -1) {
                    read = jQuery.grep(read, function (value) {
                        return value != username;
                    });
                }
                if ($.inArray(username, UniqueUsers) == -1)
                    UniqueUsers.push(username);
            })
            $(read).each(function () {
                var username = this.toString();
                if ($.inArray(username, $.map(ReadOnlyUsers.split(";"), $.trim)) == -1) {
                    ReadOnlyUsers = ReadOnlyUsers + "; " + username;
                }
                if ($.inArray(username, UniqueUsers) == -1)
                    UniqueUsers.push(username);

            })
            var uniUser = '';
            $(UniqueUsers).each(function (i, item) {
                if (uniUser == '') {
                    uniUser = item;
                }
                else {
                    uniUser += "; " + item;
                }
            });
            formData.append("ContractRoleUsers", uniUser);
            formData.append("ReadOnlyPermissions", ReadOnlyUsers);
            formData.append("ReadWritePermissions", ReadWriteUser);
            formData.append("FullControlPermissions", FullControlUsers);
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + $("#hdContractID").val() + '/ipeopleupdate',
                type: 'PUT',
                // dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                cache: false,
                success: function (person) {
                    $('.ui-button-green-text').parent().removeAttr('disabled');

                    $("#addEditPeople").dialog("close");
                    $("#hdContractID").val('');
                    $("#loadingPage").fadeOut();

                },
                error: function (person) {
                    $("#loadingPage").fadeOut();
                }
            });
        }



    }
    else {
        $('.ui-button-green-text').parent().removeAttr('disabled');
        $("#loadingPage").fadeOut();
    }

    return isformvalid;
}

function OpenRenewalForm() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + $("#hdContractID").val(),
        type: 'GET',
        cache: false,
        contentType: false,
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
        swal("", "Enter renewal date.");
    }
    else {
        if ($("input:radio[name=rdWorkflow]:checked").val() == "Yes" && ($("input:checkbox[name=checkboxApprovalTask]:checked").val() != "Yes" || $("#txtApprovalTask").val() == "")) {

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

                    swal("", "Enter number in standard renewal term.");
                    executecontrol = false;
                    break;
                }
            }

            if (len == 0) {

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

                        swal("", "Enter number in renewable for terms.");
                        executecontrol = false;
                        break;
                    }
                }
            }

            if (len1 == 0) {

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
        var vRenewalChecklist = "";
        if ($("#chkRenewalModifications").is(':checked')) {
            if (vRenewalChecklist == '') {
                vRenewalChecklist = "Renewal without any modifications";
            }
            else {
                vRenewalChecklist += "; Renewal without any modifications";
            }
        }
        if ($("#chkRenewalPriceAdjustments").is(':checked')) {
            if (vRenewalChecklist == '') {
                vRenewalChecklist = "Renewal with Price Adjustments (minor)";
            }
            else {
                vRenewalChecklist += "; Renewal with Price Adjustments (minor)";
            }
        }
        if ($("#chkRenewalRepricing").is(':checked')) {
            if (vRenewalChecklist == '') {
                vRenewalChecklist = "Renewal with Repricing (major)";
            }
            else {
                vRenewalChecklist += "; Renewal with Repricing (major)";
            }
        }
        if ($("#chkRenewalOther").is(':checked')) {
            if (vRenewalChecklist == '') {
                vRenewalChecklist = "Other Amendments";
            }
            else {
                vRenewalChecklist += "; Other Amendments";
            }
        }
        if (vRenewalChecklist == "") {

            swal("", "Select Renewal Checklist.");
        }
        else if (!dategreaterthanequaltoday("txtNewEndDate")) {

            swal("", "Renew Till Date should be greater than today.");
        }
        else if (!dategreaterthanequaltoday("txtNextRenewalDate")) {

            swal("", "Next Renewal Date should be greater than today.");
        }
        else if (!comparedates("hdnStartDate", "txtNextRenewalDate")) {

            swal("", "'Updated End (Renewed) Date' and 'Next Renewal Date' should be greater than Start Date");
        }
        else {
            $("#loadingPage").fadeIn();
            var vNextRenewalDate = '';
            var vEndDate = '';

            if ($("#txtNextRenewalDate").val() != "") {
                fNextRenewalDate = $.datepicker.formatDate('mm/dd/yy', $("#txtNextRenewalDate").datepicker('getDate'));
                vNextRenewalDate = fNextRenewalDate;
            }
            if ($("#txtNewEndDate").val() != "") {
                fNewEndDate = $.datepicker.formatDate('mm/dd/yy', $("#txtNewEndDate").datepicker('getDate'));
                vEndDate = fNewEndDate;
            }
            var vRenewalNotes = "";
            var vRenewalChecklistAmendments = "";
            var vRenewalNotificationInternal = "";
            var vRenewalNotificationExternal = "";
            vRenewalNotes = $("#txtRenewalNotes").val();
            vRenewalChecklistAmendments = "";
            var RenewalNotfInternal = $("#ddlRenewalNotfInternal").val();
            $(RenewalNotfInternal).each(function (i, item) {
                if (vRenewalNotificationInternal == '') {
                    vRenewalNotificationInternal = item;
                }
                else {
                    vRenewalNotificationInternal += "; " + item;
                }
            });
            vRenewalNotificationExternal = $("#txtRenewalNotfCounterparty").val();

            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + $("#hdContractID").val() + '/renewnow',
                type: 'POST',
                dataType: 'json',
                "Content-Type": "application/json",
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                data: {
                    ContractID: $("#hdnContractID").text(),
                    ModifiedBy: localStorage.UserName,
                    NextRenewalDate: vNextRenewalDate,
                    EndDate: vEndDate,
                    RenewalNotes: vRenewalNotes,
                    RenewalChecklist: vRenewalChecklist,
                    RenewalChecklistAmendments: vRenewalChecklistAmendments,
                    RenewalNotificationInternal: vRenewalNotificationInternal,
                    RenewalNotificationExternal: vRenewalNotificationExternal
                },
                cache: false,
                success: function (data) {
                    if (data != null)

                        $("#manualRenewal").dialog("close");
                    $("#loadingPage").fadeOut();

                    swal("", "Contract Renewed");

                    $("#chkRenewalModifications").prop('checked', false);
                    $("#chkRenewalPriceAdjustments").prop('checked', false);
                    $("#chkRenewalRepricing").prop('checked', false);
                    $("#chkRenewalOther").prop('checked', false);
                    $("#txtNewEndDate").val("");
                    $("#txtNextRenewalDate").val("");
                    $("#txtRenewalNotes").val("");
                    $("#txtRenewalNotfCounterparty").val("");
                    GetValuesAndAutoPopulate("ddlRenewalNotfInternal", "");


                },
                error: function (data) {
                    $("#loadingPage").fadeOut();
                }
            });
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

function savedViewDisplay(obj) {
    $("#txtSearchBox").val('');
    $("#liFiltersforQuickViews").css('display', 'none');
    if ($(obj).attr('data-isadvance') != 'Yes') {
        $(".hhide").hide();
        colorLink('liContractViews a', false);
        $('#liFiltersQuickView').empty();
        colorLink('liQuickView span', false);
        colorLink('liContractViews span', false);
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
                                case "EndDate":
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
        colorLink('liContractViews a', false);
        $('#liFiltersQuickView').empty();
        colorLink('liQuickView span', false);
        colorLink('liContractViews span', false);
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
                            sortby = '&sortbyfield=RenewalDate&orderby=DESC';
                            break;
                        case "Expiration Date":
                            sortby = '&sortbyfield=EndDate&orderby=DESC';
                            break;
                        case "Contract Value(Low-High)":
                            sortby = '&sortbyfield=ContractValue&orderby=ASC';
                            break;
                        case "Contract Value(High-Low)":
                            sortby = '&sortbyfield=ContractValue&orderby=DESC';
                            break;
                        case "Contract Number":
                            sortby = '&sortbyfield=ContractNumber&orderby=ASC';
                            break;
                        case "Created Date":
                            sortby = '&sortbyfield=Created&orderby=DESC';
                            break;
                        case "Title(A-Z)":
                            sortby = '&sortbyfield=ContractTitle&orderby=ASC';
                            break;
                        case "Title(Z-A)":
                            sortby = '&sortbyfield=ContractTitle&orderby=DESC';
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
                        if (typeof orderBy != 'undefined' && sortby.indexOf('ContractTitle') == -1) {
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
                    newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?BusinessAreaPath=' + baloc + '&stage=active&filterXml=' + viewQueryXml + sortby + "&viewName=" + qvName + '&searchkeyword=' + encodeURIComponent($("#txtSearchBox").val());
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
        colorLink('liContractViews a', false);
        $('#liFiltersQuickView').empty();
        colorLink('liQuickView span', false);
        colorLink('liContractViews span', false);
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
                    var txtsearchboxvalue = $.trim($('#txtSearchBox').val().trim());
                    $("#txtSearchBox").val(txtsearchboxvalue);
                    if (txtsearchboxvalue != "" && txtsearchboxvalue != null) {
                        $('#liFiltersSearchText').append('<span><small>Showing search result for : ' + txtsearchboxvalue + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
                    }
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
                                case "EndDate":
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
        colorLink('liContractViews a', false);
        $('#liFiltersQuickView').empty();
        colorLink('liQuickView span', false);
        colorLink('liContractViews span', false);
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
                            sortby = '&sortbyfield=RenewalDate&orderby=DESC';
                            break;
                        case "Expiration Date":
                            sortby = '&sortbyfield=EndDate&orderby=DESC';
                            break;
                        case "Contract Value(Low-High)":
                            sortby = '&sortbyfield=ContractValue&orderby=ASC';
                            break;
                        case "Contract Value(High-Low)":
                            sortby = '&sortbyfield=ContractValue&orderby=DESC';
                            break;
                        case "Contract Number":
                            sortby = '&sortbyfield=ContractNumber&orderby=ASC';
                            break;
                        case "Created Date":
                            sortby = '&sortbyfield=Created&orderby=DESC';
                            break;
                        case "Title(A-Z)":
                            sortby = '&sortbyfield=ContractTitle&orderby=ASC';
                            break;
                        case "Title(Z-A)":
                            sortby = '&sortbyfield=ContractTitle&orderby=DESC';
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
                        if (typeof orderBy != 'undefined' && sortby.indexOf('ContractTitle') == -1) {
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
                    newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?BusinessAreaPath=' + baloc + '&stage=active&filterXml=' + viewQueryXml + sortby + "&viewName=" + qvName + '&searchkeyword=' + encodeURIComponent($("#txtSearchBox").val()),
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
                    var txtsearchboxvalue = $.trim($('#txtSearchBox').val().trim());
                    $("#txtSearchBox").val(txtsearchboxvalue);
                    if (txtsearchboxvalue != "" && txtsearchboxvalue != null) {
                        $('#liFiltersSearchText').append('<span><small>Showing search result for : ' + txtsearchboxvalue + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
                    }
                }
            }
        });
    }
}
//manoj

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
    $("#conSortByOptions").val('Recently Updated')
    $("#conSortByOptions").prop('disabled', false).niceSelect('update');

}

function GeContractsSavedAsDraft() {
    $("#spResult").empty();
    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = encodeURIComponent(localStorage.GlobalBusinessAreaLocation);
    }
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/savedasdraft',
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

function GetMyContracts() {
    $("#spResult").empty();
    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = encodeURIComponent(localStorage.GlobalBusinessAreaLocation);
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
    if (StatusContract.length == 0) {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contractstatuses',
            type: 'GET',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            async: false,
            success: function (contractstatuses) {
                $('#tdFinalizedStatus').empty();
                $("#tdMulFinalizedStatus").empty();
                StatusContract = contractstatuses;
                contractstatusesbyCLM()
            }, error: function (data) {
                $('#tdFinalizedStatus').empty();
                $("#tdMulFinalizedStatus").empty();
            }
        });
    }
    $("#filterStatus").empty();
    if (obj == "Signed") {
        $("#filterStatus").append('<option value="All" title="All">All</option>')
        $("#filterStatus").append('<option value="Ready for Signature" title="Ready for Signature">Ready for Signature</option>')
        $("#filterStatus").append('<option value="Awaiting Signatures" title="Awaiting Signatures">Awaiting Signatures</option>')
        $("#filterStatus").append('<option value="Signed" title="Signed">Signed</option>')

    }
    else if (obj == "Past Contracts") {
        $("#filterStatus").append('<option value="All" title="All">All</option>')
        $("#filterStatus").append('<option value="Replaced" title="Replaced">Replaced</option>')
        $("#filterStatus").append('<option value="On Hold" title="On Hold">On Hold</option>')
        $("#filterStatus").append('<option value="Expired" title="Expired">Expired</option>')
        $("#filterStatus").append('<option value="Archived" title="Archived">Archived</option>')
        $("#filterStatus").append('<option value="Cancelled" title="Cancelled">Cancelled</option>')
    }
    else {
        $("#filterStatus").append('<option value="All" title="All">All</option>')

        $(StatusContract).each(function (i, item) {
            var arrstat = ["New", "Drafting", "Awaiting Review", "Reviewed", "Awaiting Approval", "Approved", "In Negotiation", "Negotiation Complete"]
            //Bug id: eO37533
            if (arrstat.indexOf(item.ContractStatus) > -1) { } else {
                if (item.ContractStage != 'Pipeline') {
                    $("#filterStatus").append('<option value="' + item.ContractStatus + '" title="' + item.ContractStatus + '">' + item.ContractStatus + '</option>')
                }
            }
        });
    }
}

function contractstatusesbyCLM() {
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
                        if (item.ContractStatus == "Awaiting Signatures") {
                            ctrl = "<input id='rdFinalizedAwaitingSign' type='radio' name='FinalizedStatus' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Awaiting Signatures:" + item.Description + "' class='status_yellow'><img src='../Content/Images/status/renew.png'>sign</b><label for='rdFinalizedAwaitingSign' class='css-label'>" + item.ContractStatus + "</label><br />";
                            ctrlMul = "<input id='rdFinalizedAwaitingSign' type='radio' name='FinalizedStatusMul' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Awaiting Signatures:" + item.Description + "' class='status_yellow'><img src='../Content/Images/status/renew.png'>sign</b><label for='rdFinalizedAwaitingSign' class='css-label'>" + item.ContractStatus + "</label><br />";
                        }
                        if (item.ContractStatus == "Ready for Signature") {
                            ctrl = "<input id='rdFinalizedReadySign' type='radio' name='FinalizedStatus' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Ready for Signature:" + item.Description + "' class='status_green'><img src='../Content/Images/status/active.png'>sign</b><label for='rdFinalizedReadySign' class='css-label'>" + item.ContractStatus + "</label><br />";
                            ctrlMul = "<input id='rdFinalizedReadySign' type='radio' name='FinalizedStatusMul' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Ready for Signature:" + item.Description + "' class='status_green'><img src='../Content/Images/status/active.png'>sign</b><label for='rdFinalizedReadySign' class='css-label'>" + item.ContractStatus + "</label><br />";
                        }
                        if (item.ContractStatus == "Signed") {
                            ctrl = "<input id='rdFinalizedSigned' type='radio' name='FinalizedStatus' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Signed:" + item.Description + "' class='status_blue'><img src='../Content/Images/status/tick.png'>sign</b><label for='rdFinalizedSigned' class='css-label'>" + item.ContractStatus + "</label><br />";
                            ctrlMul = "<input id='rdFinalizedSigned' type='radio' name='FinalizedStatusMul' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Signed:" + item.Description + "' class='status_blue'><img src='../Content/Images/status/tick.png'>sign</b><label for='rdFinalizedSigned' class='css-label'>" + item.ContractStatus + "</label><br />";
                        }

                        if (item.ContractStatus == "Active") {
                            ctrl = "<input id='rdFinalizedActive' type='radio' name='FinalizedStatus' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Active:The Contract Record is signed and is in effect till expiry.' class='status_green'><img src='../Content/Images/status/active.png'>actv</b><label for='rdFinalizedActive' class='css-label'>" + item.ContractStatus + "</label><br />";
                            ctrlMul = "<input id='rdFinalizedActive' type='radio' name='FinalizedStatusMul' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Active:" + item.Description + "' class='status_green'><img src='../Content/Images/status/active.png'>actv</b><label for='rdFinalizedActive' class='css-label'>" + item.ContractStatus + "</label><br />";
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
                            ctrl = "<div id='rtarchived' style='display:none;'><input id='rdFinalizedArchived' type='radio' name='FinalizedStatus' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Archived:The Contract Record got archived due to either of the following status, 'cancelled', 'Terminated' or 'Expired' .' class='status_blue'><img src='../Content/Images/status/archive.png'>ARCH</b><label for='rdFinalizedArchived' class='css-label'>" + item.ContractStatus + "</label><br /></div>";
                            //ctrlMul = "<input id='rdFinalizedArchived' type='radio' name='FinalizedStatusMul' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Archived:The Contract Record got archived due to either of the following status, 'cancelled', 'Terminated' or 'Expired' .' class='status_blue'><img src='../Content/Images/status/archive.png'>ARCH</b><label for='rdFinalizedArchived' class='css-label'>" + item.ContractStatus + "</label><br />";
                        }
                        $("#tdFinalizedStatus").append(ctrl);
                        $("#tdMulFinalizedStatus").append(ctrlMul);
                    }
                }
            }

        }

    });
}

function contractstatusesbyCLMForSingleContract(status) {
    $('#tdFinalizedStatus').empty();
    $("#loadingPage").fadeIn();
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

                if ((item.Transition == "Manual" || status == item.ContractStatus) && item.Active == true) {
                    if (item.Transition != "Manual")
                        vAutoChange = 'AutoChange';
                    else
                        vAutoChange = '';
                    if (item.ContractStage != "Pipeline") {
                        var ctrl = "";
                        var ctrlMul = "";
                        if (item.ContractStatus == "Awaiting Signatures") {
                            ctrl = "<input id='rdFinalizedAwaitingSign' type='radio' name='FinalizedStatus' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Awaiting Signatures:" + item.Description + "' class='status_yellow'><img src='../Content/Images/status/renew.png'>sign</b><label for='rdFinalizedAwaitingSign' class='css-label'>" + item.ContractStatus + "</label><br />";
                        }
                        if (item.ContractStatus == "Ready for Signature") {
                            ctrl = "<input id='rdFinalizedReadySign' type='radio' name='FinalizedStatus' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Ready for Signature:" + item.Description + "' class='status_green'><img src='../Content/Images/status/active.png'>sign</b><label for='rdFinalizedReadySign' class='css-label'>" + item.ContractStatus + "</label><br />";
                        }
                        if (item.ContractStatus == "Signed") {
                            ctrl = "<input id='rdFinalizedSigned' type='radio' name='FinalizedStatus' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Signed:" + item.Description + "' class='status_blue'><img src='../Content/Images/status/tick.png'>sign</b><label for='rdFinalizedSigned' class='css-label'>" + item.ContractStatus + "</label><br />";
                        }

                        if (item.ContractStatus == "Active") {
                            ctrl = "<input id='rdFinalizedActive' type='radio' name='FinalizedStatus' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Active:The Contract Record is signed and is in effect till expiry.' class='status_green'><img src='../Content/Images/status/active.png'>actv</b><label for='rdFinalizedActive' class='css-label'>" + item.ContractStatus + "</label><br />";
                        }

                        if (item.ContractStatus == "Up for Renewal") {
                            ctrl = "<input id='rdFinalizedUpForRenewal' type='radio' name='FinalizedStatus' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Up for Renewal:The Contract Record is waiting to be renewed.' class='status_red'><img src='../Content/Images/status/exp.png'>renw</b><label for='rdFinalizedUpForRenewal' class='css-label'>" + item.ContractStatus + "</label><br />";
                            ctrlMul = "<input id='rdFinalizedUpForRenewal' type='radio' name='FinalizedStatusMul' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Up for Renewal:The Contract Record is waiting to be renewed.' class='status_red'><img src='../Content/Images/status/exp.png'>renw</b><label for='rdFinalizedUpForRenewal' class='css-label'>" + item.ContractStatus + "</label><br />";

                        }

                        if (item.ContractStatus == "About to Expire") {
                            ctrl = "<input id='rdFinalizedAboutToExpire' type='radio' name='FinalizedStatus' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='About to Expire:The Contract Record is about to get expired.' class='status_red'><img src='../Content/Images/status/exp.png'>exp</b><label for='rdFinalizedAboutToExpire' class='css-label'>" + item.ContractStatus + "</label><br />";
                        }

                        if (item.ContractStatus == "On Hold") {
                            ctrl = "<input id='rdFinalizedOnHold' type='radio' name='FinalizedStatus' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='On Hold:The parties do not mutually agree to the terms & conditions of this Contract Record.' class='status_red'><img src='../Content/Images/status/exp.png'>hold</b><label for='rdFinalizedOnHold' class='css-label'>" + item.ContractStatus + "</label><br />";
                        }
                        if (item.ContractStatus == "Replaced") {
                            ctrl = "<input id='rdFinalizedReplaced' type='radio' name='FinalizedStatus' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Replaced:The Contract Record got replaced with its updated version.' class='status_Gray'><img src='../Content/Images/status/replace.png'>rep</b><label for='rdFinalizedReplaced' class='css-label'>" + item.ContractStatus + "</label><br />";
                        }


                        if (item.ContractStatus == "Expired") {
                            ctrl = "<input id='rdFinalizedExpired' type='radio' name='FinalizedStatus' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Expired:The period of the contract term has ended.' class='status_Gray'><img src='../Content/Images/status/expried.png'>exp</b><label for='rdFinalizedExpired' class='css-label'>" + item.ContractStatus + "</label><br />";
                        }
                        if (item.ContractStatus == "Cancelled") {
                            ctrl = "<input id='rdFinalizedCancelled' type='radio' name='FinalizedStatus' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Cancelled:The Contract Record got cancelled due to, Impossible to be Fulfilled or Fraud, Mistake, Misrepresentation or Breach of Contract or Prior Agreement.' class='status_Gray'><img src='../Content/Images/status/close.png'>canc</b><label for='rdFinalizedCancelled' class='css-label'>" + item.ContractStatus + "</label><br />";
                        }
                        if (item.ContractStatus == "Archived") {
                            ctrl = "<div id='rtarchived' style='display:none;'><input id='rdFinalizedArchived' type='radio' name='FinalizedStatus' value='" + item.ContractStatus + "' class='css-checkbox " + vAutoChange + "' /><b title='Archived:The Contract Record got archived due to either of the following status, 'cancelled', 'Terminated' or 'Expired' .' class='status_blue'><img src='../Content/Images/status/archive.png'>ARCH</b><label for='rdFinalizedArchived' class='css-label'>" + item.ContractStatus + "</label><br /></div>";
                        }
                        $("#tdFinalizedStatus").append(ctrl);
                    }
                }
            }

            $('input:radio[name="FinalizedStatus"][value="' + status + '"]').prop('checked', true);
            $('.AutoChange').prop('disabled', true);
            $("#dvManageContractStatus").dialog("open");
            $("#loadingPage").fadeOut();

            // Bug (eO37152)
            if ($("#hdCloseOut").val() == "Yes") {
                $("#rtarchived").css("display", "");
            } else {
                $("#rtarchived").css("display", "none");
            }
        }
    });
}

function GetNewDraftContracts(objectname) {
    $("#spResult").empty();
    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = encodeURIComponent(localStorage.GlobalBusinessAreaLocation);
    }

    var customQuery = "";
    if (objectname == "Signed") {
        customQuery = "Status:Ready for Signature,Awaiting Signatures,Signed,";
    } else {
        customQuery = "Status:New,Drafting,Awaiting Review,Reviewed,Awaiting Approval,Approved,In Negotiation,Negotiation Complete,";
    }
    var sortby = '&sortbyfield=Timestamp&orderby=DESC';
    var newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?stage=&searchkeyword=' + encodeURIComponent($("#txtSearchBox").val()) + '&customquery=' + customQuery + sortby;
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

function GetPastContracts() {
    $("#spResult").empty();
    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = encodeURIComponent(localStorage.GlobalBusinessAreaLocation);
    }

    var customQuery = "Status:On Hold,Replaced,Expired,Cancelled,Terminated,Archived,";
    var sortby = '&sortbyfield=Timestamp&orderby=DESC';
    //var newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?stage=&searchkeyword=' + encodeURIComponent($("#txtSearchBox").val()) + '&customquery=' + customQuery + sortby;
    newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?searchkeyword=' + encodeURIComponent($("#txtSearchBox").val()) + '&customquery=' + customQuery + sortby + "&otherquery=&viewName=Past Contracts";
    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: newurl,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessAreaLocation: localStorage.GlobalBusinessAreaLocation, UserType: localStorage.UserType },
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

function getUnassignedContracts() {
    $("#spResult").empty();
    var customQuery = "Status:On Hold,Replaced,Expired,Cancelled,Terminated,Archived,";
    var sortby = '&sortbyfield=Timestamp&orderby=DESC';
    var newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?searchkeyword=' + encodeURIComponent($("#txtSearchBox").val()) + '&customquery=' + customQuery + sortby;
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
    $("#liFiltersforQuickViews").css('display', '');
    $("#txtSearchBox").val("");
    $("#txtSearchBox").attr("placeholder", "Search in '" + obj.innerText + "'");
    $(".hhide").hide();
    colorLink('liContractViews a', false);
    colorLink('liContractViews span', false);
    colorLink('liQuickView span', false);
    colorLink('liQuickView a', false);
    colorLink('spnAllContracts', true);
    colorLink(obj.id, true);
    selectedSortOption = "";
    savedViewNameFromViewTable = "";
    clearFilterSelection();
    $("#aRenewal").css('display', '');
    $('#tdSort a').each(function (i, item) {
        item.style.backgroundColor = "";
    });
    $("#liFiltersQuickView").empty();
    $('#liFiltersQuickView').html('<span>Showing search result for : <small>' + obj.name + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');

    $('#liFiltersQuickView').css('display', 'none');
    $("#aRecently").css("background-color", "#cccccc");
    $("#filterUserType option[value='Any']").prop("selected", true);
    $("#filterDates option[value='Any']").prop("selected", true);
    $("#filterRenewDates option[value='Any']").prop("selected", true);
    $("#filterContractType option[value='All']").prop("selected", true);

    $(".my-Alerts_Act1").css('display', '');
    ObjectNameToSend = obj.name;
    if (obj.name == "All") {
        BindContractStatusFilter("All");
        colorLink('spnAllContracts', true);
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

        $("#filteroptiontype").css('display', 'none');
        $("#filteroptiondates").css('display', 'none');
        $("#filteroptionstatus").css('display', '');
        $("#filteroption1").css('display', '');
        $("#filteroptionrenewdates").css('display', 'none');
        $("#btnFilter").css('display', 'inline');
        $("#txtSearchBox").attr("placeholder", "Search in 'All'");
    }
    else if (obj.name == "Draft") { //My Saved Draft
        colorLink('spnAllContracts', false);
        colorLink('spnDraft', true);
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

        $("#btnFilter").css('display', 'none');
    }
    else if (obj.name == "WaitingOnMe") {//this is pipeline
        colorLink('spnAllContracts', false);
        colorLink('spnDraft', false);
        colorLink('spnWaitingOnMe', true);
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
        BindContractStatusFilter("All");
        $("#filteroptiontype").css('display', '');
        $("#filteroptiondates").css('display', 'none');
        $("#filteroptionstatus").css('display', '');
        $("#filteroption1").css('display', 'none');
        $("#filteroptionrenewdates").css('display', 'none');
        $("#btnFilter").css('display', 'inline');
    }
    else if (obj.name == "Signed") {
        colorLink('spnAllContracts', false);
        colorLink('spnDraft', false);
        colorLink('spnWaitingOnMe', false);
        colorLink('spnSigned', true);
        colorLink('spnActive', false);
        colorLink('spnUpcomingRenewals', false);
        colorLink('spnUpcomingExpirations', false);
        colorLink('spnOwnedByMe', false);
        colorLink('spnCreatedByMe', false);
        colorLink('spnSharedContracts', false);
        colorLink('spnWithCustomPermissions', false);
        colorLink('spnInRecycleBin', false);
        colorLink('spnPast', false);
        BindContractStatusFilter("Signed");
        $("#filteroptiontype").css('display', '');
        $("#filteroptiondates").css('display', 'none');
        $("#filteroptionstatus").css('display', '');
        $("#filteroption1").css('display', 'none');
        $("#filteroptionrenewdates").css('display', 'none');
        $("#btnFilter").css('display', 'inline');
    } else if (obj.name == "Active") {
        colorLink('spnAllContracts', false);
        colorLink('spnDraft', false);
        colorLink('spnWaitingOnMe', false);
        colorLink('spnSigned', false);
        colorLink('spnActive', true);
        colorLink('spnUpcomingRenewals', false);
        colorLink('spnUpcomingExpirations', false);
        colorLink('spnOwnedByMe', false);
        colorLink('spnCreatedByMe', false);
        colorLink('spnSharedContracts', false);
        colorLink('spnWithCustomPermissions', false);
        colorLink('spnInRecycleBin', false);
        colorLink('spnPast', false);
        // mycon = true;
        $("#filteroptiontype").css('display', '');
        $("#filteroptiondates").css('display', 'none');
        $("#filteroptionstatus").css('display', 'none');
        $("#filteroption1").css('display', '');
        $("#filteroptionrenewdates").css('display', 'none');
        $("#btnFilter").css('display', 'inline');
    }
    else if (obj.name == "Upcoming Renewals") {
        colorLink('spnAllContracts', false);
        colorLink('spnDraft', false);
        colorLink('spnWaitingOnMe', false);
        colorLink('spnSigned', false);
        colorLink('spnActive', false);
        colorLink('spnUpcomingRenewals', true);
        colorLink('spnUpcomingExpirations', false);
        colorLink('spnOwnedByMe', false);
        colorLink('spnCreatedByMe', false);
        colorLink('spnSharedContracts', false);
        colorLink('spnWithCustomPermissions', false);
        colorLink('spnInRecycleBin', false);
        colorLink('spnPast', false);
        $("#filteroptiontype").css('display', '');
        $("#filteroptiondates").css('display', 'none');
        $("#filteroptionstatus").css('display', 'none');
        $("#filteroption1").css('display', 'none');
        $("#filteroptionrenewdates").css('display', '');
        $("#btnFilter").css('display', 'inline');
    }
    else if (obj.name == "Upcoming Expirations") {
        colorLink('spnAllContracts', false);
        colorLink('spnDraft', false);
        colorLink('spnWaitingOnMe', false);
        colorLink('spnSigned', false);
        colorLink('spnActive', false);
        colorLink('spnUpcomingRenewals', false);
        colorLink('spnUpcomingExpirations', true);
        colorLink('spnOwnedByMe', false);
        colorLink('spnCreatedByMe', false);
        colorLink('spnSharedContracts', false);
        colorLink('spnWithCustomPermissions', false);
        colorLink('spnInRecycleBin', false);
        colorLink('spnPast', false);

        $("#filteroptiontype").css('display', '');
        $("#filteroptiondates").css('display', '');
        $("#filteroptionstatus").css('display', 'none');
        $("#filteroption1").css('display', 'none');
        $("#filteroptionrenewdates").css('display', 'none');
        $("#btnFilter").css('display', 'inline');
        $("#aRenewal").css('display', 'none');
    }
    else if (obj.name == "OwnedByMe") {
        colorLink('spnAllContracts', false);
        colorLink('spnDraft', false);
        colorLink('spnWaitingOnMe', false);
        colorLink('spnSigned', false);
        colorLink('spnActive', false);
        colorLink('spnUpcomingRenewals', false);
        colorLink('spnUpcomingExpirations', false);
        colorLink('spnOwnedByMe', true);
        colorLink('spnCreatedByMe', false);
        colorLink('spnSharedContracts', false);
        colorLink('spnWithCustomPermissions', false);
        colorLink('spnInRecycleBin', false);
        colorLink('spnPast', false);
        $("#filteroptiontype").css('display', '');
        $("#filteroptiondates").css('display', 'none');
        $("#filteroptionstatus").css('display', 'none');
        $("#filteroption1").css('display', '');
        $("#filteroptionrenewdates").css('display', 'none');
        $("#btnFilter").css('display', 'inline');
    }
    else if (obj.name == "CreatedByMe") {
        colorLink('spnAllContracts', false);
        colorLink('spnDraft', false);
        colorLink('spnWaitingOnMe', false);
        colorLink('spnSigned', false);
        colorLink('spnActive', false);
        colorLink('spnUpcomingRenewals', false);
        colorLink('spnUpcomingExpirations', false);
        colorLink('spnOwnedByMe', false);
        colorLink('spnCreatedByMe', true);
        colorLink('spnSharedContracts', false);
        colorLink('spnWithCustomPermissions', false);
        colorLink('spnInRecycleBin', false);
        colorLink('spnPast', false);
        $("#filteroptiontype").css('display', '');
        $("#filteroptiondates").css('display', 'none');
        $("#filteroptionstatus").css('display', 'none');
        $("#filteroption1").css('display', '');
        $("#filteroptionrenewdates").css('display', 'none');
        $("#btnFilter").css('display', 'inline');
    }
    else if (obj.name == "SharedContracts") {
        colorLink('spnAllContracts', false);
        colorLink('spnDraft', false);
        colorLink('spnWaitingOnMe', false);
        colorLink('spnSigned', false);
        colorLink('spnActive', false);
        colorLink('spnUpcomingRenewals', false);
        colorLink('spnUpcomingExpirations', false);
        colorLink('spnOwnedByMe', false);
        colorLink('spnCreatedByMe', false);
        colorLink('spnSharedContracts', true);
        colorLink('spnWithCustomPermissions', false);
        colorLink('spnInRecycleBin', false);
        colorLink('spnPast', false);
        $("#filteroptiontype").css('display', '');
        $("#filteroptiondates").css('display', 'none');
        $("#filteroptionstatus").css('display', 'none');
        $("#filteroption1").css('display', '');
        $("#filteroptionrenewdates").css('display', 'none');
        $("#btnFilter").css('display', 'inline');
    }
    else if (obj.name == "With Custom Permissions") {
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
        colorLink('spnWithCustomPermissions', true);
        colorLink('spnInRecycleBin', false);
        colorLink('spnPast', false);
        $("#filteroptiontype").css('display', '');
        $("#filteroptiondates").css('display', 'none');
        $("#filteroptionstatus").css('display', 'none');
        $("#filteroption1").css('display', '');
        $("#filteroptionrenewdates").css('display', 'none');
        $("#btnFilter").css('display', 'inline');
    } else if (obj.name == "In Recycle Bin") {
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
        colorLink('spnInRecycleBin', true);
        colorLink('spnPast', false);
        $("#btnFilter").css('display', 'none');
        $("#divChkSelectAll").css('display', 'none');
    }
    else if (obj.name == "Past Contracts") {
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
        colorLink('spnPast', true);
        BindContractStatusFilter("Past Contracts");

        $("#filteroptiontype").css('display', '');
        $("#filteroptiondates").css('display', 'none');
        $("#filteroptionstatus").css('display', '');
        $("#filteroption1").css('display', 'none');
        $("#filteroptionrenewdates").css('display', 'none');
        $("#btnFilter").css('display', 'inline'); //eO310565
    }
    applyFilter();
    //showQuickViewFilter(obj.name);
    $("#btnAddView").css('display', 'none');

    $("#showAll").css('display', 'inline');
    $("#showAll").html('Showing ' + obj.name + ' Records<img title="Remove" name="' + obj.name + '" onclick="javascript:7200(this);" style="margin-left: 5px; margin-right: 10px; cursor:pointer;" src="../Content/Images/icon/close.png" />');
}
function GetUpcomingRenewals() {
    $("#spResult").empty();
    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = encodeURIComponent(localStorage.GlobalBusinessAreaLocation);
    }

    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/upcomingrenewals',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, UserType: localStorage.UserType, BusinessAreaLocation: localStorage.GlobalBusinessAreaLocation },
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

function GetUpcomingExpirations() {
    $("#spResult").empty();
    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = encodeURIComponent(localStorage.GlobalBusinessAreaLocation);
    }
    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/upcomingexpirations',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, UserType: localStorage.UserType, BusinessAreaLocation: baname },
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

function GetRecentlyActiveAndRenewedContracts() {
    $("#spResult").empty();
    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = encodeURIComponent(localStorage.GlobalBusinessAreaLocation);
    }
    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/recentlyactiveandrenewed',
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

function GetActiveContracts() {
    $("#spResult").empty();
    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = encodeURIComponent(localStorage.GlobalBusinessAreaLocation);
    }
    var customQuery = "Status:Active,Up for Renewal,Renewed,Extended,About to Expire,";
    var sortby = '&sortbyfield=Timestamp&orderby=DESC';
    var newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?stage=&searchkeyword=' + encodeURIComponent($("#txtSearchBox").val()) + '&customquery=' + customQuery + sortby;
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

function GetRecentlyActiveContracts() {
    $("#spResult").empty();
    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
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
    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = encodeURIComponent(localStorage.GlobalBusinessAreaLocation);
    }

    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/unassignedContracts?stage=',
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

function GetSharedContracts() {
    $("#spResult").empty();
    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = encodeURIComponent(localStorage.GlobalBusinessAreaLocation);
    }
    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/sharedwithme',
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

function GetContractsInRecycleBin() {
    $("#spResult").empty();
    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = encodeURIComponent(localStorage.GlobalBusinessAreaLocation);
    }
    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/recyclebin',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, UserType: localStorage.UserType, BusinessAreaLocation: localStorage.GlobalBusinessAreaLocation },
        success: function (data) {
            $("#compact-pagination").css('display', '');
            $('#listContracts').empty();
            var resultFound = GetData(data);
            if (resultFound) {
                $("#divChkSelectAll").css('display', 'none');
            }

        },
        error:
            function (data) {
                $('#listContracts').empty();
                $("#listContracts").append("<p class='f_p-error'>No items found.</p>");
                $("#compact-pagination").css('display', 'none');
            }
    });
}

function GetMyProjectContracts() {
    $("#spResult").empty();
    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');

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

function applyFilter(sortByOptions, sortDirection) {
    if ($("#filterContractType :selected").length > 10) {
        swal("", "Select upto 10.");
    }
    else {
        //manoj
        var allowcustomsearch = false;
        if (savedViewNameFromViewTable != "") {
            var CustomUl = $("#liContractViews");
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
                //  $("#btnAddView").css('display', 'block');
            }
            if (qvName == "") {
                if (savedViewNameFromViewTable != "")
                    qvName = savedViewNameFromViewTable;
            }
            if (qvName == "") {
                qvName = "All";
                //BindContractStatusFilter("All");
                colorLink('spnAllContracts', true);
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
                $("#filteroptiontype").css('display', 'none');
                $("#filteroptiondates").css('display', 'none');
                $("#filteroptionstatus").css('display', '');
                $("#filteroption1").css('display', '');
                $("#filteroptionrenewdates").css('display', 'none');
                $("#btnFilter").css('display', 'inline');
                //$("#txtSearchBox").val("");
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
            var txtsearchboxvalue = $.trim($('#txtSearchBox').val().trim());
            $("#txtSearchBox").val(txtsearchboxvalue);
            if (txtsearchboxvalue != "" && txtsearchboxvalue != null) {
                $('#liFiltersSearchText').html('<span><small>Showing search result for : ' + txtsearchboxvalue + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
            }
            var newurl = "";
            var defOrdByRecUptd = 'DESC';
            var defRenDate = 'DESC';
            var defExpDate = 'DESC';
            var defConVal = 'ASC';
            var defConNum = 'ASC';
            var defConCDate = 'DESC';
            var defContilteAsc = 'ASC';
            var defContilteDsc = 'DESC';
            var defModByMe = 'DESC';
            var sortby = "&sortbyfield=Timestamp&orderby=DESC";

            if (typeof sortByOptions != 'undefined' && sortByOptions != "") {
                selectedSortOption = sortByOptions;
            }
            else { //eO310572
                selectedSortOption = $('#conSortByOptions').val();
            }
            switch (selectedSortOption) {
                case "Recently Updated":
                    if (typeof sortDirection != 'undefined' && sortDirection != "")
                        defOrdByRecUptd = sortDirection;
                    sortby = '&sortbyfield=Timestamp&orderby=' + defOrdByRecUptd;
                    break;
                case "Renewal Date":
                    if (typeof sortDirection != 'undefined' && sortDirection != "")
                        defRenDate = sortDirection;
                    sortby = '&sortbyfield=RenewalDate&orderby=' + defRenDate;
                    break;
                case "Expiration Date":
                    if (typeof sortDirection != 'undefined' && sortDirection != "")
                        defExpDate = sortDirection;
                    sortby = '&sortbyfield=EndDate&orderby=' + defExpDate;
                    break;
                case "Contract Value(Low-High)":
                    if (typeof sortDirection != 'undefined' && sortDirection != "")
                        defConVal = sortDirection;
                    sortby = '&sortbyfield=ContractValue&orderby=' + defConVal;
                    break;
                case "Contract Value(High-Low)":
                    if (typeof sortDirection != 'undefined' && sortDirection != "")
                        defConVal = sortDirection;
                    sortby = '&sortbyfield=ContractValue&orderby=DESC';
                    break;
                case "Contract Number":
                    if (typeof sortDirection != 'undefined' && sortDirection != "")
                        defConNum = sortDirection;
                    sortby = '&sortbyfield=ContractNumber&orderby=' + defConNum;
                    break;
                case "Created Date":
                    if (typeof sortDirection != 'undefined' && sortDirection != "")
                        defConCDate = sortDirection;
                    sortby = '&sortbyfield=Created&orderby=' + defConCDate;
                    break;
                case "Title(A-Z)":
                    if (typeof sortDirection != 'undefined' && sortDirection != "")
                        defContilteAsc = sortDirection;
                    sortby = '&sortbyfield=ContractTitle&orderby=' + defContilteAsc;
                    break;
                case "Title(Z-A)":
                    if (typeof sortDirection != 'undefined' && sortDirection != "")
                        defContilteDsc = sortDirection;
                    sortby = '&sortbyfield=ContractTitle&orderby=' + defContilteDsc;
                    break;
                case "Last Modified by Me":
                    if (typeof sortDirection != 'undefined' && sortDirection != "")
                        defModByMe = sortDirection;
                    sortby = '&sortbyfield=ModifiedBy&orderby=' + defModByMe;
                    break;
                default:
                    sortby = '&sortbyfield=Timestamp&orderby=DESC';
                    $("#conSortDirection").attr("data-direction", 'ASC');
                    $("#conSortDirection").attr("src", '/Content/Images/down-arrow_1.png');
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
            $('#filterUserType :selected').each(function (i, selected) {
                if ($(selected).text() == "Any") {
                    filterquery = ''; return false;
                }
                $('#liFiltersUserType').append('<span><small>' + $(selected).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
                if (filterquery == '')
                    filterquery += $(selected).val() + ":" + localStorage.UserName;
                else
                    filterquery += ';' + $(selected).val() + ":" + localStorage.UserName;

            });
            if (filterquery == '')
                $("#liFiltersUserType").empty(); else {
                if (customquery == '')
                    customquery = filterquery;
                else
                    customquery += ';' + filterquery;
            }

            filterquery = '';
            $('#filterContractType :selected').each(function (i, selected) {
                if ($(selected).text() == "All") {
                    filterquery = ''; return false;
                }
                $('#liFiltersType').append('<span><small>' + $(selected).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');

                if (filterquery == '')
                    filterquery += 'ContractType:' + $(selected).text();
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

            filterquery = '';
            $('#filterDates :selected').each(function (i, selected) {
                if ($(selected).text() == "Any") {
                    filterquery = ''; return false;
                }
                $('#liFiltersExpiration').append('<span><small>' + $(selected).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');

                if (filterquery == '')
                    filterquery += 'ExpiryDate:' +$(selected).text();
                else
                    filterquery += ',' + $(selected).text();

            });
            if (filterquery == '')
                $("#liFiltersExpiration").empty(); else {
                if (customquery == '')
                    customquery = filterquery;
                else
                    customquery += ';' + filterquery;
            }

            filterquery = '';
            $('#filterRenewDates :selected').each(function (i, selected) {
                if ($(selected).text() == "Any") {
                    filterquery = ''; return false;
                }
                $('#liFiltersRenewal').append('<span><small>' + $(selected).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');

                if (filterquery == '')
                    filterquery += 'RenewalDate:' + $(selected).text();
                else
                    filterquery += ',' + $(selected).text();

            });
            if (filterquery == '')
                $("#liFiltersRenewal").empty(); else {
                if (customquery == '')
                    customquery = filterquery;
                else
                    customquery += ';' + filterquery;
            }
            filterquery = '';
            if (customquery == '') {
                $("#showAll").css('display', 'inline');
            }
            else {
                // $("#btnAddView").css('display', 'none');
                //$("#btnAddView").css('display', 'block');
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

            newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?BusinessAreaPath=' + baloc + '&stage=active&searchkeyword=' + encodeURIComponent(txtsearchboxvalue) + '&customquery=' + customquery + sortby + "&viewName=" + qvName;
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
                    //showQuickViewFilter(qvName);
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

function liRemove(obj) {
    var qvName = "";
    if ($('#liFiltersQuickView').text() != "") {
        qvName = getQuickViewLinkName($('#liFiltersQuickView').text());
    }

    if ($(obj.parentNode.parentNode.parentNode).attr('id') == 'liFiltersSearchText') {
        $(obj.parentNode.parentNode.parentNode).empty();
        $('#txtSearchBox').val('');
        //$("#txtSearchBox").css("width", "150");
        //$("#txtSearchBox").css("outline", "none");
    }
    else {
        var child = obj.parentNode;
        var firstChild = child.firstChild;

        $("#filterStatus option[value='" + firstChild.nodeValue + "']").prop("selected", false);
        $("#filterContractType option[value='" + firstChild.nodeValue + "']").prop("selected", false);
        $("#filterUserType option[value='" + firstChild.nodeValue + "']").prop("selected", false);
        var valuetounselect = "";
        switch (firstChild.nodeValue) {
            case '<7 days':
                valuetounselect = '7';
                break;
            case '<15 days':
                valuetounselect = '15';
                break;
            case '<30 days':
                valuetounselect = '30';
                break;
            case '<60 days':
                valuetounselect = '60';
                break;
            case '<90 days':
                valuetounselect = '90';
                break;
            case '>90 days':
                valuetounselect = '90 daysgt';
                break;
            case 'Overdue / Expired':
                valuetounselect = 'Overdue';
                break;
            case 'Overdue':
                valuetounselect = 'Overdue';
                break;
        }
        $("#filterRenewDates option[value='" + valuetounselect + "']").prop("selected", false);
        $("#filterDates option[value='" + valuetounselect + "']").prop("selected", false);
        var newval = "";
        switch (firstChild.nodeValue) {
            case "Contract Owner":
                newval = 'ContractManagers';
                break;
            case "Contract Manager":
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

        $("#filterUserType option[value='" + newval + "']").prop("selected", false);


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
        applyFilter();
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
    }

    else if (qvName == "Active" && !hasItem1 && !hasItem2) {
        applyFilter();
        $("#btnAddView").css('display', 'none');
    } else if (qvName == "Upcoming Renewals" && !hasItem1 && !hasItem2) {
        applyFilter();
    } else if (qvName == "Unassigned Contracts" && !hasItem1 && !hasItem2) {
        GetUnassignedContracts();
    } else if (qvName == "Shared With Me" && !hasItem1 && !hasItem2) {
        applyFilter();
    } else if (qvName == "In Recycle Bin" && !hasItem1 && !hasItem2) {
        applyFilter();
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
        //$("#txtSearchBox").css("width", "150");
        //$("#txtSearchBox").css("outline", "none");
    }
    else {
        var child = obj.parentNode;
        var firstChild = child.firstChild;

        $("#filterContractType option[value='" + firstChild.nodeValue + "']").prop("selected", false);

        var optionval = firstChild.nodeValue;
        var newval = "";
        if (optionval == "<7 days")
            newval = "7";
        else if (optionval == "<15 days")
            newval = "15";
        else if (optionval == "<30 days")
            newval = "30";
        else if (optionval == "<60 days")
            newval = "60";
        else if (optionval == "<90 days")
            newval = "90";
        else if (optionval == ">90 days")
            newval = "90 daysgt";
        else if ((optionval == "Overdue / Expired") || (optionval == "Overdue"))
            newval = "Overdue";

        $("#filterRenewDates option[value='" + newval + "']").prop("selected", false);
        $("#filterDates option[value='" + newval + "']").prop("selected", false);

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
    var qvName = "";
    if ($('#liFiltersQuickView').text() != "") {
        qvName = getQuickViewLinkName($('#liFiltersQuickView').text());
    }


    if ($(obj.parentNode.parentNode).attr('id') == 'liFiltersSearchText') {
        $(obj.parentNode.parentNode).empty();
        $('#txtSearchBox').val('');
        //$("#txtSearchBox").css("width", "150");
        //$("#txtSearchBox").css("outline", "none");
    }
    else {
        var child = obj.parentNode;
        var firstChild = child.firstChild;

        var find = " ";
        var re = new RegExp(find, 'g');

        var newval = "";
        switch (firstChild.nodeValue) {
            case "Contract Owner":
                newval = 'ContractManagers';
                break;
            case "Contract Manager":
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
        }

        $("#filterUserType option[value='" + newval + "']").prop("selected", false);
        $("#filterStatus").find('option:contains(' + firstChild.nodeValue + ')').prop("selected", false);

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
    var hasItem3 = false;
    $('#filterContractType :selected').each(function (i, selected) {
        hasItem3 = true;
    });

    $('#liFiltersUserType').empty();
    $('#liFiltersStatus').empty();
    if (qvName == "My Contracts" && !hasItem1 && !hasItem2) {
        GetActiveContracts();
        GetMyContracts();
        displayshowall("My Contracts");
        $("#btnAddView").css('display', 'none');
    }
    else if (qvName == "Active" && !hasItem1 && !hasItem2) {
        GetActiveContracts();
        $("#btnAddView").css('display', 'none');
    }
    else {
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

        swal("", "Enter Search Keyword");
    }
    else {
        // add loading image to div
        $('#listContracts').html('<img src="../Content/Images/icon/loading.gif"> Searching...');
        $("#spResult").empty();

        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?searchkeyword=' + encodeURIComponent($("#txtSearchBox").val()),
            type: 'GET',
            dataType: 'json',
            'Content-Type': 'application/json',
            cache: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName },
            success: function (data) {
                $("#listContracts").empty();
                var resultFound = GetData(data);
                if (resultFound) {
                    if ($.trim($("#txtSearchBox").val()) == '') {
                        $("#showAll").text("Showing All Contract Records");
                    }
                    else {
                        $("#showAll").text('');

                        $('#liFiltersSearchText').html('<span><small>Showing search result for : ' + txtsearchboxvalue + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
                    }
                } else {
                    $("#showAll").text('');

                    $('#liFiltersSearchText').html('<span><small>Showing search result for : ' + txtsearchboxvalue + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
                    $("#listContracts").empty();
                    $("#listContracts").append("<label style='font-size:20px;'>No items found.</label>");
                }
                $("#compact-pagination").css('display', '');
            },
            error:
                function (data) {
                    $("#showAll").text('');

                    $('#liFiltersSearchText').html('<span><small>Showing search result for : ' + txtsearchboxvalue + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
                    $("#listContracts").empty();
                    $("#listContracts").append("<p class='f_p-error'>No items found.</p>");
                    $("#compact-pagination").css('display', 'none');
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
var multipleChecksStatus = "";
var multipleChecksIsDraftByCurrent = "";
var isEndDateLessthanTodaysDate = "";
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

    if ($("input:checkbox[name=ContRec]").length == $("input:checkbox[name=ContRec]:checked").length) {
        $('#SelectAll').prop('checked', true)

    } else {
        $('#SelectAll').prop('checked', false)
    }
    var ContractID = object.id;
    var vPermission = $("#" + ContractID).parent("p").parent("li").find("#Permission").text();
    var vStatus = $("#" + ContractID).parent("p").parent("li").find("#Status").text();
    var vEndDate = $("#" + ContractID).parent("p").parent("li").find("#EndDate").text();
    var vIsDraftByCurrent = $("#" + ContractID).parent("p").parent("li").find("#IsDraftByCurrent").text();
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
        $("#" + ContractID).parent("p").parent("li").addClass('aActive');
        //$("#btnMultipleAction").css('display', '');
        if (vStatus == "Expired") {
            if (vEndDate == null) {
                multipleChecks = multipleChecks + ';' + ContractID;
            }
            else {
                vEndDate = new Date(vEndDate);
                var EndDateMonthDateFormate = (vEndDate.getUTCMonth() + 1) + '/' + vEndDate.getUTCDate() + '/' + vEndDate.getUTCFullYear();
                var TodaysDate = new Date();
                var month = TodaysDate.getUTCMonth() + 1;
                var day = TodaysDate.getUTCDate();
                var TodaysDateMonthDateFormate = month + '/' + day + '/' + TodaysDate.getUTCFullYear();
                if (Date.parse(EndDateMonthDateFormate) < Date.parse(TodaysDateMonthDateFormate)) {
                    if (!(isEndDateLessthanTodaysDate.indexOf(';EndDateLessthanTodaysDate' + ContractID) > -1)) {
                        isEndDateLessthanTodaysDate = isEndDateLessthanTodaysDate + ';EndDateLessthanTodaysDate' + ContractID;
                    }
                }
                else {
                    multipleChecks = multipleChecks + ';' + ContractID;
                }
            }
        }
        else {
            multipleChecks = multipleChecks + ';' + ContractID;
        }
        multipleChecksPermission = multipleChecksPermission + ';' + vPermission;
        multipleChecksStatus = multipleChecksStatus + ';' + vStatus;
        multipleChecksIsDraftByCurrent = multipleChecksIsDraftByCurrent + ';' + vIsDraftByCurrent;
        if ($("#" + ContractID).parent("p").parent("li").find("#CloseOut").text() != "Yes") {
            var person = { id: ContractID, VName: $("#" + ContractID).parent("p").parent("li").find("#ContractTitle").text() };
            arrforcloseoutcheck.push(person);
        }
    } else {
        $("#" + ContractID).parent("p").parent("li").removeClass('aActive');
        multipleChecks = multipleChecks.replace(';' + ContractID, '');
        isEndDateLessthanTodaysDate = isEndDateLessthanTodaysDate.replace(';EndDateLessthanTodaysDate' + ContractID, '');
        multipleChecksPermission = multipleChecksPermission.replace(';' + vPermission, '');
        multipleChecksStatus = multipleChecksStatus.replace(';' + vStatus, '');
        multipleChecksIsDraftByCurrent = multipleChecksIsDraftByCurrent.replace(';' + vIsDraftByCurrent, '');

        if ($("#" + ContractID).parent("p").parent("li").find("#CloseOut").text() != "Yes") {
            var arrupdated12 = $.grep(arrforcloseoutcheck, function (n, i) {
                return (n.id != ContractID);
            });
            arrforcloseoutcheck = arrupdated12;
        }
    }

    if (multipleChecks.trim() == "") {
        $("#btnMultipleAction").css('display', 'none');
    } else {
        if (multipleChecksPermission.indexOf('openmenuView') >= 0) {
            $("#btnMultipleAction_Status").css('display', 'none');
            $("#btnMultipleAction_People").css('display', 'none');
            //  $("#btnMultipleAction_Counparty").css('display', 'none');
            $("#btnMultipleAction_BusnArea").css('display', 'none');
            $("#btnMultipleAction_Delete").css('display', 'none');
            $("#btnMultipleAction_NoPermission").css('display', '');

        } else if (multipleChecksPermission.indexOf('openmenuContribute') >= 0) {
            $("#btnMultipleAction_Status").css('display', '');
            $("#btnMultipleAction_People").css('display', 'none');
            //  $("#btnMultipleAction_Counparty").css('display', '');
            if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All")
                $("#btnMultipleAction_BusnArea").css('display', '');
            $("#btnMultipleAction_Delete").css('display', 'none');
            $("#btnMultipleAction_NoPermission").css('display', 'none');

        } else if (multipleChecksPermission.indexOf('openmenuStatusContribute') >= 0) {
            $("#btnMultipleAction_Status").css('display', '');
            $("#btnMultipleAction_People").css('display', 'none');
            //     $("#btnMultipleAction_Counparty").css('display', '');
            if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All")
                $("#btnMultipleAction_BusnArea").css('display', '');
            $("#btnMultipleAction_Delete").css('display', 'none');
            $("#btnMultipleAction_NoPermission").css('display', 'none');
        }
        else {
            $("#btnMultipleAction_Status").css('display', '');
            $("#btnMultipleAction_People").css('display', '');
            //   $("#btnMultipleAction_Counparty").css('display', '');
            if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All")
                $("#btnMultipleAction_BusnArea").css('display', '');

            if (!(multipleChecksStatus.indexOf("Active") >= 0 || multipleChecksStatus.indexOf("Signed") >= 0 || multipleChecksStatus.indexOf("Awaiting Signatures") >= 0 || multipleChecksStatus.indexOf("Ready for Signature") >= 0 || multipleChecksStatus.indexOf("Up for Renewal") >= 0 || multipleChecksStatus.indexOf("About to Expire") >= 0 || (multipleChecksIsDraftByCurrent.indexOf("No") >= 0)))
                //if (multipleChecksPermission.indexOf('openmenuStatus') >= 0 && vStatus == "Archived" && localStorage.UserType.indexOf("Global Contract Owner") > -1)
                $("#btnMultipleAction_Delete").css('display', '');
                //else
                //    $("#btnMultipleAction_Delete").css('display', 'none');
            else {
                $("#btnMultipleAction_Delete").css('display', 'none');
            }
            $("#btnMultipleAction_NoPermission").css('display', 'none');

        }
    }
    if (ObjectNameToSend == "Draft" || ObjectNameToSend == "Draft & New Contracts") {
        $("#btnMultipleAction_Status").css('display', 'none');
        if (!(multipleChecksIsDraftByCurrent.indexOf("No") >= 0)) {
            $("#btnMultipleAction_Delete").css('display', '');
        }
        else {
            $("#btnMultipleAction_Delete").css('display', 'none');
        }
    }
    else {
        if (multipleChecksPermission.indexOf('openmenuDraft') >= 0) {
            $("#btnMultipleAction_Status").css('display', 'none');
        }
    }
    //manoj
    if (multipleChecksStatus.indexOf("Expired") > -1) {
        $("#btnMultipleAction").css('display', 'none');
        swal("", "<span style=\"font-weight:700\"> Expired</span> Contract(s) muliti action is not available.");
    } else if ($.trim(multipleChecksStatus) != "") {
        $("#btnMultipleAction").css('display', '');
    }
    //manoj
    var cp = $("#compact-pagination").pagination('getCurrentPage');
    updateContractSelectedObj(cp, false, false, $(object).parent().parent().index());
    try {
        hideAllMenuAndStopPro(event);
    }
    catch (ex) {

    }
}

function showStatusMultiple() {
    //manoj
    var displaypopup = false;
    $("input:checkbox[name=ContRec]:checked").each(function () {
        if ($("#" + $(this).attr("id")).parent("p").parent("li").find("#CloseOut").text() == "Yes" && (!displaypopup)) {
            displaypopup = true;
        }
    });
    //manoj
    if (displaypopup) {
        swal({
            title: '',
            text: "You have selected <span style=\"font-weight:700\">Archived</span> contract(s),Do you want to proceed?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            html: true
        },
          function (confirmed) {
              if (confirmed) {
                  $('input:radio[name="FinalizedStatusMul"]').attr('checked', false);
                  $("#dvManageContractStatusMul").dialog("open");
                  $(".hhide").hide();
              }
          });
    } else {
        $('input:radio[name="FinalizedStatusMul"]').attr('checked', false);
        $("#dvManageContractStatusMul").dialog("open");
        $(".hhide").hide();
    }
    //}
}




function showPeopleMultiple() {
    $(".hhide").hide();
    $("#addEditPeopleMultiple").dialog("option", "title", "People");
    $("#addEditPeopleMultiple").dialog("open");
}

function multipleDelete() {
    $(".hhide").hide();
    if (arrforcloseoutcheck.length > 0) {
        var contracttitletodisplay = "";
        $(arrforcloseoutcheck).each(function (i, item) {
            if (contracttitletodisplay == '') {
                contracttitletodisplay = item.VName;
            }
            else {
                contracttitletodisplay += ", " + item.VName;
            }
        });
        swal("", "Following Contract(s) are not Closeout :<span style=\"font-weight:700\"> '" + contracttitletodisplay + "'</span>. Only Closeout Contract(s) can be deleted.");
    } else {
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
    }
}

function changestatusmultiple() {
    var selectedValue = decodeURI($("input:radio[name=FinalizedStatusMul]:checked").val());

    if (selectedValue == "undefined" || selectedValue == "0" || selectedValue == "") {

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

        if (stat == "Cancelled") {
            $("#loadingPage").fadeOut();
            $("#txtReasonOfCancelMul").val("");
            GetValuesAndAutoPopulate("ddlSendToCancelMul", "");
            $("#dvCancelContractMul").dialog("open");
            //vCancelNote = "CancelledReason=" + $("#txtCancelledReason").val();
        }
        else if (isEndDateLessthanTodaysDate.indexOf("EndDateLessthanTodaysDate") > -1) {
            swal({
                title: '',
                text: "Status will not change for some expire contract, due to end date has expired Please extend the end date individually by menu option, Do you want to continue for rest contract...",//Bug id: eO37517
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                html: true
            },
              function (confirmed) {
                  if (confirmed) {

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
                  else {
                      $("#loadingPage").fadeOut();
                  }
                  return;
              });
        }
        else {
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

                $("#filterStatus option[value='" + values1[i] + "']").prop("selected", true);
            }
            break;
        case "Upcoming Renewals":
            $("#filterRenewDates option[value='" + vStatus + "']").prop("selected", true);
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
    var $options = $("#ddlApproversNew > option").clone();
    $('#ddlAssignTo' + totalFileCount).append($options);

    $("#ddlAssignTo" + totalFileCount).chosen().change(function () {
        var vasstoid = $(this).attr('id').replace("ddlAssignTo", "");
        if ($(this).val() != null) {
            if ($(this).val().length > 1)
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
}
$('.chosenmulti').on('chosen:showing_dropdown', function (evt, params) {
    $('.result-selected').css('display', 'none');
});
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
        if ($("#hdWorkflowIsPublic").val() == "Yes") {
            ProcessWorkflow();
        } else {
            $("#loadingPage").fadeIn();
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/contractpermission?contractid=' + $("#hdWorkflowObjectID").val(),
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

                    var objv = $("p:contains(" + $("#hdWorkflowObjectID").val() + ")");
                    objv.siblings("#ApprovalWorkflow").text("In Progress")
                    //var bStatusBox = objv.siblings().find('b');
                    //bStatusBox.empty();
                    //bStatusBox.attr('title', 'Awaiting Approval');
                    //bStatusBox.attr('class', 'status_yellow');
                    //bStatusBox.html('<img src="../Content/Images/status/renew.png" class="status_img">appr')
                    objv.siblings('div.cont_Rig-opt').children().eq(1).css('display', 'none');
                },
                error: function (UserList) {
                    $("#loadingPage").fadeOut();
                }
            });
        }
    }
}

//manoj
function ProcessWorkflow() {
    $("#inprocessStartWorkflow").css('display', '');
    var vAutoUpdateObjectStatus = $("#chkAutoUpdateStatus").is(':checked') ? 'Yes' : 'No';
    var sendSummary = $("#chkSendSummaryDoc").is(':checked') ? 'Yes' : 'No';
    $("#loadingPage").fadeIn();
    var vWorkflowStage = [];
    $('#tblStage tr').each(function (i, row) {
        var vRow = $(row).attr('id');
        var vRowIndex = vRow.replace("trStage", "");
        var stage = $("#txtStage" + vRowIndex).val();
        var order = $("#ddlOrder" + vRowIndex).find('option:selected').text();
        $("#loadingPage").fadeIn();
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
    var vObject = "Contracts";
    var vTaskRouting = "";
    var nicInstance = nicEditors.findEditor('txtComment');
    var vcommentText = CleanWordFormatFromHTML(nicInstance.getContent());
    var vNoteTextCount = vcommentText.replace(/<\/?[^>]+(>|$)/g, "");
    if (vNoteTextCount.length <= 26500) {
        vcommentText = $('<div/>').text(vcommentText).html();
        if ($("#hdWorkflowType").val() == "Document Review") { vObject = "Documents"; }
        if (workflowAdHoc == "on") { vTaskRouting = $("#ddlRule").find('option:selected').text(); }
        if (vTaskRouting != "Default" && vTaskRouting != "Ad-hoc") {
            vTaskRouting = "Conditional";
        }

        //manoj
        //For Contract Summary Sheet
        var strIsApprovalSheetConfigured = "Yes";
        var strIsSummaryDisplayedInWorkflow = "No";
        var strIsSummaryTempInWorkflow = "No";
        var strSummaryTempDetails = "";
        var strSummaryAdditionalDocs = "";
        var strContractApprovalSheetName = "";

        if ($("#contractDetailsSummaryConfiguration").css('display') != 'none') {
            if ($('input[type="radio"][name=IsApprovalSheetTaskDetails]:checked').val() != "No" && $("#ddlApprovalsSheets").val() != "0") {
                strIsSummaryDisplayedInWorkflow = "Yes";
                strContractApprovalSheetName = $("#ddlApprovalsSheets").val();
            }

            if ($('input[type="radio"][name=IsApprovalSheet]:checked').val() != "No" && $('#lblApprovalSheetTempdocuments').children().length > 0) {
                strIsSummaryTempInWorkflow = "Yes";
                strSummaryTempDetails = "<SummaryTempDetails>";
                $('#lblApprovalSheetTempdocuments').find('div').each(function () {
                    strSummaryTempDetails += '<Metadata>'
                                          + '<DocumentID>' + $(this).find("#DocumentID").text() + '</DocumentID>'
                                          + '<DocumentName>' + $(this).find("#DocumentName").text() + '</DocumentName>'
                                          + '<DocumentURL>' + decodeURI($(this).find("#DocumentURL").text()) + '</DocumentURL>'
                                          + '</Metadata>';
                });
                strSummaryTempDetails += "</SummaryTempDetails>";
            }

            if ($('#lblApprovalSheetdocuments').children().length > 0) {
                strSummaryAdditionalDocs = "<SummaryAdditionalDocs>";
                $('#lblApprovalSheetdocuments').find('div').each(function () {
                    strSummaryAdditionalDocs += '<Metadata>'
                                             + '<DocumentID>' + $(this).find("#DocumentID").text() + '</DocumentID>'
                                             + '<DocumentName>' + $(this).find("#DocumentName").text() + '</DocumentName>'
                                             + '<DocumentURL>' + decodeURI($(this).find("#DocumentURL").text()) + '</DocumentURL>'
                                             + '</Metadata>';
                });
                strSummaryAdditionalDocs += "</SummaryAdditionalDocs>";
            }
            else {
                strSummaryAdditionalDocs = "";
            }
        } else {
            strIsApprovalSheetConfigured = "No";
        }
        //For Contract Summary Sheet
        //manoj

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
                "TaskRouting": vTaskRouting,
                //manoj
                "SendSummary": sendSummary,
                //manoj
                //For Contract Summary Sheet
                "IsApprovalSheetConfigured": strIsApprovalSheetConfigured,
                "ContractApprovalSheetName": unescape(strContractApprovalSheetName),
                "IsSummaryDisplayedInWorkflow": strIsSummaryDisplayedInWorkflow,
                "IsSummaryTempInWorkflow": strIsSummaryTempInWorkflow,
                "SummaryTempDetails": strSummaryTempDetails,
                "SummaryAdditionalDocs": strSummaryAdditionalDocs
                //For Contract Summary Sheet
                //manoj
            },
            cache: false,
            success: function (status) {
                if (vObject == "Contracts" && vAutoUpdateObjectStatus == "Yes")

                    swal("", "This Contract Record is moved to the Pipeline Contracts. Check 'Pipeline' tab.");
                else

                    $("#inprocessStartWorkflow").css('display', 'none');

                $("#dvWorkflow").dialog("close");//ui-dialog-buttonset
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
    var val = $(this).find('option:selected').val();
    var contractID = $("#hdContractID").val();
    if (val == "All") {
        CreateContractActivityList(contractID);
    } else {
        CreateContractActivityList(contractID, val);
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
            $("#browseCounterparty").dialog("option", "title", "Counterparty Picker");
            $("#browseCounterparty").dialog("open");
            $("#loadingPage").fadeOut();
        },
        error: function () {
            $('#loadCP').empty();
            $('#loadCP').html('<p style="margin-left: 10px;">No items found.</p>')
            $("#browseCounterparty").dialog("option", "title", "Counterparty Picker");
            $("#browseCounterparty").dialog("open");
            $("#loadingPage").fadeOut();
        }
    });
}
function ChangeCounterpartyMultiple() {
    var vCoounterparty = "";
    $('input:checkbox[name="Counterparty"]:checked').each(function () {
        if (vCoounterparty == "") {
            vCoounterparty = unescape(this.value);
        }
        else {
            vCoounterparty += "; " + unescape(this.value);
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
            getbusinessareapath();
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

var BusinessAreaAccess12 = localStorage.BusinessAreaAccess;
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
                    if (object.ChildrenData.length == 0) {
                        article1 += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName12 + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName12Owner + '</span><span id="BusinessAreaOwner" style="display:none;">' + item.Owner + '</span><span id="BusinessAreaDescription" style="display:none;">' + item.Description + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" class="padding_left_65px" /><small>' + additional + '</small></td></tr>';
                    } else {
                        article1 += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName12 + '</span><span id="ContractAreaAdmin" style="display:none;">' + strContractAreaName12Owner + '</span><span id="BusinessAreaOwner" style="display:none;">' + item.Owner + '</span><span id="BusinessAreaDescription" style="display:none;">' + item.Description + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" /><small>' + additional + '</small></td></tr>';
                    }
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


    } else {

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
    if (requiredValidator("divPermission")) {
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
            vLastRow = $("#newPopup li").length;
            totalPermissionCount = parseInt(vLastRow);
            totalPermissionCount = parseInt(totalPermissionCount) + 1;
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
            totalPermissionCount = parseInt(totalPermissionCount) + 1;
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
    if (!UpdatePermissionCancelled) {
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
                   var article;
                   for (var i = 0; i < datalenght; i++) {
                       var sUserName = arrUser[i];
                       article += '<option value="' + sUserName + '">' + sUserName + '</option>';
                   }
                   $("#txtAddUser").html(article);
                   $("#txtAddUser").chosen();
                   $('#txtAddUser').trigger('chosen:updated');
                   $("#PermissionList" + obj.id).remove();
               }
               return;
           });
    } else {
        var strPermissionUser = "";
        strPermissionUser = $("#PermissionUser" + obj.id).html();
        $("#txtAddUser").empty();
        arrUser.push(strPermissionUser);
        var datalenght = arrUser.length;
        var article;
        for (var i = 0; i < datalenght; i++) {
            var sUserName = arrUser[i];
            article += '<option value="' + sUserName + '">' + sUserName + '</option>';
        }
        $("#txtAddUser").html(article);
        $("#txtAddUser").chosen();
        $('#txtAddUser').trigger('chosen:updated');
        $("#PermissionList" + obj.id).remove();
    }
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

            totalPermissionCount++;
        } $('#newPopup').append(string);

    }
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
        $("#tblCounterparties").html("No items found.");
        checkboxchecking = false;
        $('#loadGenCounterParty').empty();
    }
    else {
        var article = "";
        for (var i = startIndex; i < endIndex; i++) {
            if (i == startIndex) {
                article += '<tr><th style="width:35%;"><input id="selectallCounterParty" onclick="funselectallCounterParty(this);" type="checkbox"/> Select/Deselect All</th><th style="width:20%;">Counterparty Type</th><th>Global or Regional</th></tr>';
            }

            article += '<tr><td>';
            if (multipleChecksDocumentID.length > 0) {
                if (multipleChecksDocumentID.indexOf(myCounterPartyArray[i].CounterpartyName.trim()) > -1) {
                    article += '<input id="' + myCounterPartyArray[i].RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);" checked class="css1-checkbox" value="' + escape(myCounterPartyArray[i].CounterpartyName.trim()) + '" />';
                }
                else {
                    article += '<input id="' + myCounterPartyArray[i].RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);"  class="css1-checkbox" value="' + escape(myCounterPartyArray[i].CounterpartyName.trim()) + '" />';
                    checkboxchecking = false;
                }
            }
            else {
                article += '<input id="' + myCounterPartyArray[i].RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);"  class="css1-checkbox" value="' + escape(myCounterPartyArray[i].CounterpartyName.trim()) + '" />';
                checkboxchecking = false;
            }
            article += '<label for="CP' + myCounterPartyArray[i].RowKey + '" class="css1-label">' + myCounterPartyArray[i].CounterpartyName.trim() + '</label></td>';
            article += '<td>' + myCounterPartyArray[i].CounterpartyType + '';
            article += '</td>';
            article += '<td>' + (myCounterPartyArray[i].IsGlobal == "Yes" ? "Global" : myCounterPartyArray[i].BusinessAreas) + '';
            article += '</td></tr>';
            resultfound = true;
        }
        $('#loading').empty();
        $("#tblCounterparties").html(article);
        article = "";
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
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/counterpartypicker?searchkeyword=' + encodeURIComponent($("#txtSearchBoxCP").val()) + '&customquery=&sortbyfield=CounterpartyName&orderby=ASC',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            CounterPartyArrayprev = [];

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
                                        if (typeof (contBusi) != "undefined" && contBusi.length > 0) {

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
                                                    if (found.length > 0)
                                                        myCounterPartyArray.push(data[i]);

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

            }
    });
}

function GetRenewalHistoryView() {
    $("#lblrenewalViewerror").css("display", "none");
    $("#RenewalHistoryView").dialog('open');
    GetRenewalHistory($("#hdContractID").val());
}


function GetRenewalHistory(contractid) {
    if (contractid == null || contractid == "") { contractid = $("#hdContractID").val(); }
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + contractid + '/contractrenewalhistory',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $("#renewalHistory").empty();
            $("#renewalViewHistory").empty();
            $("#tblRenewalHistory").empty();
            var str = "";
            var strHist = "";
            $(data).each(function (i, item) {
                str += '<tr>';
                if (item.RenewalType != null && item.RenewalType != "") {
                    str += '<td>' + item.RenewalType + '</td>';
                }
                else {
                    str += '<td>User Initiated</td>';
                }
                if (item.RenewedDate != null) {
                    var fRenewedDate = "";
                    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                    { fRenewedDate = moment(new Date(item.RenewedDate)).format('MM/DD/YYYY'); }
                    else { fRenewedDate = moment(new Date(item.RenewedDate)).format(localStorage.AppDateFormat); }
                    str += '<td>' + fRenewedDate + '</td>';
                } else {
                    str += '<td></td>';
                }
                str += '<td>' + item.RenewedBy + '</td>';
                if (item.TermEndDate != null) {
                    var fTermEndDate = "";
                    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                    { fTermEndDate = moment(new Date(item.TermEndDate)).format('MM/DD/YYYY'); }
                    else { fTermEndDate = moment(new Date(item.TermEndDate)).format(localStorage.AppDateFormat); }
                    str += '<td>' + fTermEndDate + '</td>';
                } else {
                    str += '<td></td>';
                }
                str += '<td>' + item.RenewalChecklist + '</td>';
                str += '<td>' + item.RenewalNotes + '</td>';
                str += '</tr>';


                strHist += '<li>' + item.RenewalType;
                if (item.RenewedDate != null) {
                    var fRenewedDate = "";
                    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                    { fRenewedDate = moment(new Date(item.RenewedDate)).format('MM/DD/YYYY'); }
                    else { fRenewedDate = moment(new Date(item.RenewedDate)).format(localStorage.AppDateFormat); }
                    strHist += ' <span class="sub-text">' + fRenewedDate + " | ";
                } else {
                    strHist += ' Not Available' + " | ";
                }
                strHist += item.RenewalNotes + '</span></li>';

            });
            $("#renewalHistory").append(str);
            //*Harshitha
            $("#renewalViewHistory").append(str);
            $("#tblRenewalHistory").append(strHist);
            if (str != "") {
                $("#lblrenewalViewerror").css("display", "none");
                $("#lblrenewalerror").css("display", "none");
            } else {
                $("#lblrenewalViewerror").css("display", "");
                $("#lblrenewalerror").css("display", "");
                $("#tblRenewalHistory").append('No items found.');
            }
            $("#loadingPage").fadeOut();
        },
        error:
            function (data) {
                $("#loadingPage").fadeOut();
                $("#lblrenewalViewerror").css("display", "");
                $("#lblrenewalerror").css("display", "");
                $("#tblRenewalHistory").append('No items found.');
            }
    });
}


//get the Unique Array Start
function stringArrayUnique(array) {
    return $.grep(array, function (el, index) {
        return index === $.inArray(el, array);
    });
}
//get the Unique Array End

//Menu for Recycle Bin
function contextMenuWorkForRecycleBin(action, el, pos) {

    switch (action) {
        case "delete":
            {
                var contractTitle = $(el).find("#ContractTitle").text();
                var entityid = $(el).find("#ContractID").text();
                DeleteContractFromRecycleBin(contractTitle, entityid);
                break;
            }
        case "viewdetails":
            {
                var entityid = $(el).find("#ContractID").text();
                location = "/Contracts/ContractDetails?ContractID=" + entityid;
                break;
            }
        case "history":
            {
                var contractID = $(el).find("#ContractID").text();
                $("#hdContractID").val(contractID);
                //  $('#ddlHistoryFilter').val('All');
                CreateContractActivityList(contractID);
                break;
            }
    }
}



function DeleteContractFromRecycleBin(contractTitle, contractID) {
    swal({
        title: '',
        text: "Are you sure you want to <span style=\"font-weight:700\">delete " + contractTitle + "</span> record permanently?",
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
               url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/DeleteFromRecycleBin?contractid=' + entityid,
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

function MarkContractAsCloseout() {
    $("#loadingPage").fadeIn();
    var requiredavalible = false;
    var vMetadatavaluetofinalize;
    var metadataFields = [];
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/IContractDetails?contractid=' + $("#hdContractID").val(),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: false,
        success: function (mainmetadataFields) {
            vMetadatavaluetofinalize = $(mainmetadataFields).find('Metadata');
        },
    });
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracttypes/metadatas?contracttypename=' + $("#hdContractType").val(),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: false,
        success: function (metadataFieldsvalue) {
            metadataFields = $.grep(metadataFieldsvalue, function (n, i) {
                return (n.Closeoutform == "Required");
            });
        },
    });
    $(metadataFields).each(function (i, item) {
        if ($(vMetadatavaluetofinalize).find(item.FieldName).text() == null || $(vMetadatavaluetofinalize).find(item.FieldName).text() == "") {
            requiredavalible = true;
        }
    });
    if (!requiredavalible) {
        swal({
            title: '',
            text: "Are you sure you want to <span style=\"font-weight:700\">mark</span> this Contract as <span style=\"font-weight:700\">Closeout</span>?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            html: true
        },
     function (confirmed) {
         if (confirmed) {
             $.ajax({
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + $("#hdContractID").val() + '/changecloseout?closeout=Yes',
                 type: 'PUT',
                 dataType: 'json',
                 headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                 cache: false,
                 success: function (data) {
                     $("#loadingPage").fadeOut();
                     var elms = document.querySelectorAll("[id='CloseOut']");
                     var htmlvaluechange = $.grep(elms, function (n, i) {
                         if (n.title == $("#hdContractID").val()) {
                             $(n).html("Yes");
                         }
                         return
                     });
                     $("#dvManageContractStatus").dialog("close");
                     applyFilter();
                 },
                 error: function (person) {
                     $("#loadingPage").fadeOut();
                 }
             });
         } else {
             $("#loadingPage").fadeOut();
             $("#dvManageContractStatus").dialog("close");
         }
     });

    } else {
        swal({
            title: '',
            text: "Some fields required for Contract Record closeout are not filled. Do you want to edit now?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            html: true
        },
        function (confirmed) {
            if (confirmed) {
                location = "/Contracts/EditContract?ContractID=" + $("#hdContractID").val() + "&ContractType=" + encodeURIComponent($("#hdContractType").val()) + "&Closeout=Yes";
            } else {
                $("#loadingPage").fadeOut();
                $("#dvManageContractStatus").dialog("close");
            }
        });
    }
}

function DeleteContractRecord() {
    swal({
        title: '',
        text: "Are you sure you want to <span style=\"font-weight:700\">delete</span> Contract Record?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        html: true
    },
function (confirmed) {
    if (confirmed) {
        var contractID = $("#hdContractID").val();
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + contractID,
            type: 'DELETE',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
            cache: false,
            success: function (data) {
                location = location
            }
        });
    }
});
}


function CheckLicenseLimits() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/LicenseLimit',
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        processData: false,
        success: function (item) {
            if (item.ContractsUsed > item.ContractsLimit) {
                $("#singleUpload").css("display", "none");
                $("#bulkUpload").css("display", "none");
                $("#bulkUpload1").css("display", "none");

            }
            else {
                var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                    return (n.RowKey == "3" && n.Status == "ON");
                });
                if (vAccFeat.length > 0) {
                    $("#singleUpload").css("display", "none");
                    $("#bulkUpload").css("display", "block");
                    $("#bulkUpload1").css("display", "block");
                } else {
                    $("#singleUpload").css("display", "block");
                    $("#bulkUpload").css("display", "none");
                }

            }

        }
    });
}
//sridhar
function change_date(txtBox, lblDate) {
    var noofdays = parseInt($(txtBox).val());
    var lblSelected = document.getElementById(lblDate);
    $(lblSelected).empty();
    $(lblSelected).html(moment(new Date()).add(noofdays, "days").format('MM/DD/YYYY'));
}
//sridhar

$(".switch_val").change(function () {
    var obj = jQuery(this).parent();
    var input_val = obj.children('input').val();
    $(obj).removeClass('switch_enable');
    $(obj).removeClass('switch_disable');
    if ("0" == input_val || "No" == input_val) {
        $(obj).addClass('switch_disable');
    } else if ("1" == input_val || "Yes" == input_val) {
        $(obj).addClass('switch_enable');
    }

});
var contractItemrec = '';
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
var vUserListG = '';
function BindContractRoles(Conitem) {
    $('.ContractRoleTypeTR').remove();
    //RoleNames
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contractrolesbytype?type=' + Conitem.ContractType,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            if (data != null && data.length != 0) {
                if (vUserListG == '') {
                    vUserListG = GetUserList();
                }
                //  var rolesetting = data[0].ContractRoleSetting;
                var html = '';
                var ddllt = [];
                ContractRoles = [];

                $(data).each(function (i, item) {
                    if (item != null) {
                        var Fieldname = item.ContractRoleName;
                        var FieldDisplay = item.ContractRoleDisplayName;
                        var FieldPermi = item.PermissionLabel;
                        html += ' <tr class="ContractRoleTypeTR">';
                        html += '   <td class="f_head">' + FieldDisplay + '</td>';
                        html += '  <td class="labelleft width60">';
                        html += '   <div class="invite-Peop-mul-sel">';
                        html += '       <select id="' + Fieldname + '" multiple="multiple" title="" data-permission="' + FieldPermi + '" class="chosenmulti ContractRoleType" data-placeholder="Select User(s)" style="width:49.5%;"></select>';
                        html += '    </div>';
                        html += '  </td>';
                        ddllt.push(Fieldname);
                        ContractRoles.push([Fieldname, FieldPermi, FieldDisplay]);
                    }
                })
                $('#tblPeople > tbody').append(html);
                $(ddllt).each(function () {
                    var item = this.toString();
                    $("#" + item).append(vUserListG);
                    $("#" + item).chosen();
                })

                BindContractRolesMetadata(Conitem)
                // }

            }
        }
    });
}
var RecvMetadatavaluetofinalize = '';
function BindContractRolesMetadata(Conitem) {
    var vMetadatavaluetofinalize;
    var metadataFields = [];
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/IContractDetails?contractid=' + Conitem.RowKey,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: false,
        success: function (mainmetadataFields) {
            // vMetadatavaluetofinalize = $(mainmetadataFields).find('Metadata');
            RecvMetadatavaluetofinalize = $(mainmetadataFields).find('Metadata');
            $('.ContractRoleType').each(function () {
                var itemfield = $(this)[0];
                var itemfieldDisplay = $(this)[2];
                var itemfieldPermission = $(this)[1];
                FullContractroleUser = [];
                ReadContractroleUser = [];
                ReadWriteContractroleUser = [];
                if ($(RecvMetadatavaluetofinalize).find(itemfield).text() != "undefined" && $(RecvMetadatavaluetofinalize).find(itemfield).text() != null && $(RecvMetadatavaluetofinalize).find(itemfield).text() != "") {
                    var eachus = $(RecvMetadatavaluetofinalize).find(itemfield).text().split(';');


                    $(eachus).each(function () {
                        if (itemfieldPermission == "Full Control") {
                            if ($.inArray(this.toString().trim(), FullContractroleUser) == -1) {
                                FullContractroleUser.push(this.toString().trim());
                            }
                        }
                        else if (itemfieldPermission == "Read Only") {
                            if ($.inArray(this.toString().trim(), ReadContractroleUser) == -1) {
                                ReadContractroleUser.push(this.toString().trim());
                            }
                        }
                        else if (itemfieldPermission == "Read/Write") {
                            if ($.inArray(this.toString().trim(), ReadWriteContractroleUser) == -1) {
                                ReadWriteContractroleUser.push(this.toString().trim());
                            }
                        }
                    });
                }
                var arrclear = [];
                var id = this.id;
                ChosenOrder.setSelectionOrder($('#' + id), arrclear, true);

                var val = $(RecvMetadatavaluetofinalize).find(id).text();
                GetValuesAndAutoPopulate(id, val);

            })
            $('#newPopup').empty();

            GetValueAndPopulateManagerNew(Conitem, null);
            //manoj
            if ($(RecvMetadatavaluetofinalize).find('CustomPermission').text() == 'Yes') {
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
                var vLastRow = $("#newPopup li").length;
                var totalPermissionCount = "1";
                if (typeof vLastRow == "undefined") {
                    totalPermissionCount = "1";
                }
                else {
                    totalPermissionCount = parseInt(vLastRow);
                }
                for (i = 1; i <= totalPermissionCount; i++) {
                    $("#PermissionOption" + i).prop('disabled', true);
                    $("#" + i).hide();
                }
                $("#divBottom").hide();

            }
            if ($(RecvMetadatavaluetofinalize).find('IsPublic').text() == 'Yes') {
                $("#chkpermission").attr("disabled", "disabled");
                $("#chkPublicContract").prop("disabled", false);
                $("#chkPublicContract").prop('checked', true);
            }
            else {
                $("#chkPublicContract").prop('checked', false);
            }
        },
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
            $(dataUser).each(function (i, item) {
                var sRowKey = item.RowKey;
                var sUserName = item.UserName;
                vUserList += '<option value="' + sUserName + '">' + sUserName + '</option>';
            });
        },
        error:
            function (dataUser) {
            }
    });
    return vUserList;
}

//Sridhar
function BindTermTypes() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracttermtypesenabled',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: false,
        success: function (data) {
            var datalength = data.length;
            for (var i = 0; i < datalength; i++) {
                TermTypeDisplayName[data[i].ContractTermName] = data[i].ContractTermDisplayName;
            }
        },
        error: function (data) {
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

//manoj
function RemoveErrors() {
    $(".validelement").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });
    $(".validuser").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });
    $(".validmultiselect").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });
    $(".validdate").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });
    $(".validnumspec").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });
    $(".validNicEdit").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });
    $(".validemail").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });
    $(".specialchar").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });
    $(".validdecimal").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });
    $(".error").removeClass("error");
}
//manoj

//Sridhar
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

function showactivity(data, approvalWorkflow, contractTitle, contractID, businessArea, contractArea, businessAreaPath, IsPublicStatus) {
    var datalenght = data.length;
    for (var i = 0; i < datalenght; i++) {
        var item = data[i];
        var RowKey = item.RowKey;
        var Status = item.Status;
        var ActivityType = item.ActivityType;
        if (ActivityType == "Contract Approval" && Status == "In Progress" || Status == "Stopped") {
            workflowurltoshow = '/Activity/TaskDetails?TaskID=&WorkflowID=' + RowKey;
        }
    }

    $("#loadingPage").fadeOut();

    OpenContractApproval(approvalWorkflow, contractTitle, contractID, businessArea, contractArea, businessAreaPath, IsPublicStatus, "", "", "", "", "");
}

function Loading_View_trigger() {
    DefaultGlobalsettings();
    //BindPeople();
    //BindContractTypes();
    BindContractRelationships();
    CheckLicenseLimits();
    //Sridhar 
    BindTermTypes();
    getSearchableContractFields();
}

function ChangeContractStatusMethod(Status) {
    var vStatusNote = '';
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + $("#hdContractID").val() + '/changestatus?status=' + Status,
        type: 'PUT',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
        data: vStatusNote,
        cache: false,
        success: function (result) {
            $("#loadingPage").fadeOut();
            if ($("#hdContractIDStatus").val() == "Archived" && Status != "Archived") {
                var elms = document.querySelectorAll("[id='CloseOut']");
                var htmlvaluechange = $.grep(elms, function (n, i) {
                    if (n.title == $("#hdContractID").val()) {
                        $(n).html("");
                    }
                    return
                });
            }
            $("#dvManageContractStatus").dialog("close");
            statusChangeConID = $("#hdContractID").val();
            statusChangeVal = Status;
            applyFilter();
        },
        error: function (person) {
            $("#loadingPage").fadeOut();
        },
    });
}

$("#SelectAll").change(function () {
    var isAllSelected = $(this).prop('checked');
    var cp = $("#compact-pagination").pagination('getCurrentPage');
    updateContractSelectedObj(cp, isAllSelected, true, 0)
})


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

function CreateAdvanceView() {
    $("#btnAdvanceViewSaveAs").css("display", "none");
    $("#btnUpdateAdvanceView").css("display", "none");
    $("#addNewAdvanceView").dialog({ 'title': 'Create View' });
    $("#btnCreateAdvanceView").css("display", "");
    $("#addNewAdvanceView").dialog("open");
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

function removefilterCondition(objRow) {
    $(objRow).parent().parent().parent().remove();
    if ($("#tblfilterConditions tr").length <= 9) {
        $("#btnAddNewAdFilter").css("display", "");
    }
}

function getSearchableContractFields() {
    var searchXml = "";
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
            var notRequiredSearchFieldType = ["Multi- Choice (Browse)", "Taxonomy", "Email", "Browse", "File Upload", "Phone Number"];
            $(searchXml).find('Field').each(function (index, value1) {
                if ($.inArray($(value1).find('FieldType').text(), notRequiredSearchFieldType) == -1) {
                    var objMetadata = {};
                    objMetadata.value = $(value1).find('FieldDisplayName').text();
                    objMetadata.fieldType = $(value1).find('FieldType').text();
                    objMetadata.choiceValues = $(value1).find('ChoiceValues').text();
                    objMetadata.fieldName = $(value1).find('FieldName').text();
                    objMetadata.label = objMetadata.value;
                    metadataLookUp.push(objMetadata);
                }
            });
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
                    createValueFieldBasedOnFieldType(ui.item.fieldType, ui.item.choiceValues, 0, ui.item.fieldName);
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
        },
        error: function (data) {
            $("#loadingPage").fadeOut();
        }
    });
}

function lookUpSelect(ui, id) {
    $("#metadata_value_" + id).val(ui.item.fieldName);
    $("#metadata_type_" + id).val(ui.item.fieldType);
    //if (ui.item.fieldType == "Date")
    createOperatorsBasedOnMetdataType(ui.item.fieldType, id);
    createValueFieldBasedOnFieldType(ui.item.fieldType, ui.item.choiceValues, id, ui.item.fieldName);
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
        case "Number":
        case "Number-D":
        case "Number-P":
        case "Number-PD":
            control = ' <option value="">--Select--</option>' +
                      ' <option value="eq">Equal</option>' +
                      ' <option value="ne">Does not equal</option>' +
                      ' <option value="gt">Is greater than</option>' +
                      ' <option value="ge">Is greater than or equal to</option>' +
                      ' <option value="lt">Is less than</option>' +
                      ' <option value="le">Is less than or equal to</option>' +
                      ' <option value="empty">Is empty</option>' +
                      ' <option value="any">Not empty (any value)</option>';
            //'<option value="between">Between</option>';
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


function createValueFieldBasedOnFieldType(fieldType, choiceValues, rowid, fieldName) {
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
                    $.each(rvalue.split(','), function (i, value) {
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

                        //peopleSource = $.grep(peopleSource, function (element) {
                        //    return element.value != ui.item.value;
                        //});
                        return false;
                    }

                }).focus(function () {
                    $(this).autocomplete('search', $(this).val());
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
            control = '<span>' + '<input id="num_value_' + rowid + '"' + 'type="text" class="f_textinput width90 validelement validdecimal" />' + '</span>';
            $("#tr_" + rowid + " td:nth-child(4)").html("");
            $("#tr_" + rowid + " td:nth-child(4)").append(control);
            break;
        case "Custom Lookup":
            control = '<span>' + '<input id="text_value_' + rowid + '"' + 'type="text" class="f_textinput actfocusout width90 validelement" />' + '</span>';
            $("#tr_" + rowid + " td:nth-child(4)").html("");
            $("#tr_" + rowid + " td:nth-child(4)").append(control);
            if (fieldName == "ContractType") {
                var Con_Type = [];
                Con_Type = vContractType.map(function (Ctype) { return Ctype.ContractType });
                $("#text_value_" + rowid).autocomplete({
                    source: function (request, response) {
                        response($.ui.autocomplete.filter(
                          Con_Type, extractLast(request.term)));
                    },
                    minLength: 0,
                    select: function (event, ui) {
                        var terms = split(this.value);
                        terms.pop();
                        if ($.inArray(ui.item.value, terms) == -1) {
                            terms.push(ui.item.value);
                            terms.push("");
                            this.value = terms.join(", ");
                        }

                        Con_Type = $.grep(Con_Type, function (element) {
                            return element.value != ui.item.value;
                        });
                        return false;
                    }
                }).focus(function () {
                    $(this).autocomplete('search', $(this).val())
                });
            }
            break;

        default: control = '<span>' + '<input id="text_value_' + rowid + '"' + 'type="text" class="f_textinput width90 validelement" />' + '</span>';
            $("#tr_" + rowid + " td:nth-child(4)").html("");
            $("#tr_" + rowid + " td:nth-child(4)").append(control);
            break;

    }
}

function split(val) {
    return val.split(/,\s*/);
}

function extractLast(term) {
    return split(term).pop();
}


function ToggleSortDirection(objthis) {
    if ($(objthis).attr('data-direction') == 'desc') {
        $("#sortDirectionImg").attr("src", "/Content/Images/asc_icon.png")
        $(objthis).attr('data-direction', 'Asc')
    } else {
        $("#sortDirectionImg").attr("src", "/Content/Images/dsc_icon.png")
        $(objthis).attr('data-direction', 'desc')
    }
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
                var notRequiredSearchFieldType = ["Multi- Choice (Browse)", "Taxonomy", "Email", "Browse", "File Upload", "Phone Number"];
                $(searchXml).find('Field').each(function (index, value1) {
                    if ($.inArray($(value1).find('FieldType').text(), notRequiredSearchFieldType) == -1) {
                        var objMetadata = {};
                        objMetadata.value = $(value1).find('FieldDisplayName').text();
                        objMetadata.fieldType = $(value1).find('FieldType').text();
                        objMetadata.choiceValues = $(value1).find('ChoiceValues').text();
                        objMetadata.fieldName = $(value1).find('FieldName').text();
                        objMetadata.label = objMetadata.value;
                        metadataLookUp.push(objMetadata);
                    }
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
            createValueFieldBasedOnFieldType(ui.item.fieldType, ui.item.choiceValues, 0, ui.item.fieldName);
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
    } else {
        $("#" + $(rowObj).attr('id') + " td:nth-child(4)").css('display', '');
        createValueFieldBasedOnFieldType(currentAutoCompleteUiObj.item.fieldType, currentAutoCompleteUiObj.item.choiceValues, rowid, currentAutoCompleteUiObj.item.fieldName);
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
        $("#liAdvanceViewFilter").html(filterHtml);
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
                        createValueFieldBasedOnFieldType(ui.item.fieldType, ui.item.choiceValues, 0, ui.item.fieldName);
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
                    createValueFieldBasedOnFieldType(ui.item.fieldType, ui.item.choiceValues, 0, ui.item.fieldName);

                },


            }).focus(function () {
                $(this).autocomplete('search', $(this).val())
            });

        }
        var item = "";
        if (metadataType == "User" || metadataType == "Choice" || metadataType == "Yes/No" || metadataType == "Date" || metadataType == "Value / Financials" || metadataType == "Number-D" || metadataType == "Number-P" || metadataType == "Number-PD" || metadataType == "Number" || metadataType == "Multi- Choice (Dropdown)") {
            item = metadataLookUp.filter(function (metadata, index) {
                return metadata.fieldName == metadataValue && metadata.fieldType == metadataType
            })
            if (item.length > 0 && typeof item[0] != 'undefined' && operator != 'empty' && operator != 'any')
                createValueFieldBasedOnFieldType(item[0].fieldType, item[0].choiceValues, rowCounter, item[0].fieldName);
            else if (operator != 'empty' && operator != 'any')
                createValueFieldBasedOnFieldType('', '', rowCounter, item[0].fieldName);

        } else if (operator != 'empty' && operator != 'any') {
            createValueFieldBasedOnFieldType('', '', rowCounter, "");
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

$("#conAdvanceViewSortBy").on('change', function () {
    if ($(this).val() == "Title(A-Z)" || $(this).val() == "Title(Z-A)") {
        $("#advanceViewSortDirection").css("display", "none");
    } else {
        $("#advanceViewSortDirection").css("display", "");
    }

    if ($(this).val() == "Contract Value(High-Low)") {
        var sortOption = $("#advanceViewSortDirection").attr("data-direction");
        if (sortOption == 'ASC') {
            $("#advanceViewSortDirection").attr("data-direction", 'DESC');
            $("#advanceViewSortDirection").attr("src", '/Content/Images/up_arrow_1.png');
        }
    }
    if ($(this).val() == "Contract Value(Low-High)") {
        var sortOption = $("#advanceViewSortDirection").attr("data-direction");
        if (sortOption == 'DESC') {
            $("#advanceViewSortDirection").attr("data-direction", 'ASC');
            $("#advanceViewSortDirection").attr("src", '/Content/Images/down-arrow_1.png');
        }
    }
    if ($(this).val() == "Contract Value(High-Low)" || $(this).val() == "Contract Value(Low-High)") {
        $("#advanceViewSortDirection").css("display", "none");
    } else {
        $("#advanceViewSortDirection").css("display", "");
    }
})

function validateValueAndOp(inputEle) {
    var row = $(inputEle).parent().parent();
    var rowid = $(row).attr('id');
    $('#' + row + ' select').filter('[id*="operator_"]').empty();
    $('#' + row + ' select').filter('[id*="operator_"]').append('<option value="" >--Select</option>')
    $('#' + row + ' th:last').hmtl();
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
//For Contract Summary Sheet
function GetContractTypeDetails(contracttypename, contractDocumentURL, contractArea, contractTitle) {
    $("#ddlApprovalsSheets").empty();
    var SelectdContract_Type = $.grep(vContractType, function (nConType, iConType) {
        return (nConType.ContractType == contracttypename);
    });
    if (SelectdContract_Type.length > 0) {
        if (SelectdContract_Type[0].IsApprovalSheetConfigured == "Yes") {
            $("#btnApprovalSheetCreate").css('display', '');
            $(".FL_ApprovalSheetContract").css("display", "");
            //$("#ddlApprovalsSheets").addClass("validelement");
            var oRelatedApprovalSheets = SelectdContract_Type[0].RelatedApprovalSheetNames;
            if (typeof contractDocumentURL != "undefined" && contractDocumentURL != null && contractDocumentURL != "") {
                setApprovalDocumentUrl("", "", contractDocumentURL);
                GetContractLibName(contractArea, contractTitle, false);
            } else {
                GetContractLibName(contractArea, contractTitle, true);
            }
            if (typeof (oRelatedApprovalSheets) != "undefined" && oRelatedApprovalSheets != "") {
                var oArrRelatedApprovalSheets = oRelatedApprovalSheets.split(';').sort();
                oArrRelatedApprovalSheets = stringArrayUnique(oArrRelatedApprovalSheets).sort();
                $("#ddlApprovalsSheets").append('<option value="0">--Select--</option>');
                $(oArrRelatedApprovalSheets).each(function (irelsheet, valuerelsheet) {
                    $("#ddlApprovalsSheets").append('<option value="' + escape(valuerelsheet) + '">' + valuerelsheet + '</option>');
                });
                if (SelectdContract_Type[0].DefaultApprovalSheetName != '') {
                    defautlSummarySheet = SelectdContract_Type[0].DefaultApprovalSheetName;
                    $("#ddlApprovalsSheets").val(escape(SelectdContract_Type[0].DefaultApprovalSheetName)).trigger('chosen:updated');
                }
                BindContractApprovalSheets(oRelatedApprovalSheets);
            }
        }
    }
}

function GetContractLibName(contractAreaName, contractTitle, updatedfolderurl) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/contractareadetailsbyname?contractareaname=' + encodeURIComponent(contractAreaName),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
        async: false,
        success: function (data1) {
            thisDocumentLibrarySettings = data1;
            //manoj
            if (updatedfolderurl) {
                setApprovalDocumentUrl(data1.DocLibName, contractTitle, "");
            }
            //manoj
        },
        error: function (data1) {
        }
    });
}

function setApprovalDocumentUrl(LibName, ContractTitle, ContractDocumentURL) {
    var finalurl = "";
    if (typeof ContractDocumentURL != "undefined" && ContractDocumentURL != null && ContractDocumentURL != "") {
        finalurl = (ContractDocumentURL.charAt(0) != '/') ? '/' + ContractDocumentURL.trim() : ContractDocumentURL.trim();
        finalurl = ((finalurl.substr(finalurl.length - 1)) != "/") ? finalurl + "/" : finalurl;
    } else {
        ContractTitle = ContractTitle.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(/[\*\|\,\"\:\<\>\[\}\{\}\'\(\)\&\#\%\.\-\!]/g, '').replace(/\//g, '').replace(/\s\s+/g, " ").trim();
        finalurl = (LibName != null && LibName != "") ? LibName : '/Contract Documents/';
        finalurl = (finalurl.charAt(0) != '/') ? '/' + finalurl.trim() : finalurl.trim();
        finalurl = ((finalurl.substr(finalurl.length - 1)) != "/") ? finalurl + "/" : finalurl;
        finalurl += ContractTitle + "/";
    }
    $("#lblFolderUrlApprovalSheet").text(finalurl + "Summary Documents" + '/');
    $("#lblFolderUrlApprovalSheet").css('cursor', 'default');
    $("#lblFolderUrlApprovalSheetFromComputer").text(finalurl + "Summary Documents" + '/');
    $("#lblFolderUrlApprovalSheetFromComputer").css('cursor', 'default');
    //manoj
}

function BindContractApprovalSheets(oRelatedApprovalSheets) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contractapprovalsheets',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $('#ddlSummaryDocumentTemplate').empty();
            $('#ddlSummaryDocumentTemplate').append('<option value="0">--Select--</option>');
            $(data).each(function (i, item) {
                if ($.inArray(item.ContractApprovalSheet, oRelatedApprovalSheets.split(';')) !== -1) {
                    if (typeof (item.ContractApprovalSheetTemplateName) != "undefined" && item.ContractApprovalSheetTemplateName != null && item.ContractApprovalSheetTemplateName != "") {
                        $("#ddlSummaryDocumentTemplate").append('<option value="' + item.ContractApprovalSheetTemplate + '~' + item.ContractApprovalSheetTemplateName + '">' + item.ContractApprovalSheet + '</option>');
                    }
                }
            });
        },
        error: function (data) {
            $('#ddlSummaryDocumentTemplate').empty();
        }
    });
}

function IsApprovalSheetClick(obj) {
    if (obj.value == "Yes") {
        $('#p_Approvalsheet').css("display", "");
        $('#div_Approvalsheet').css("display", "");
        $("#ddlApprovalsSheets").addClass("validelement");
        $("#ddlApprovalsSheets").val(escape(defautlSummarySheet)).trigger('chosen:updated');
    } else {
        $("#ddlApprovalsSheets").val('0');
        $('#p_Approvalsheet').css("display", "none");
        $('#div_Approvalsheet').css("display", "none");
        $("#ddlApprovalsSheets").removeClass("validelement");
    }
}

function IsApprovalSheetTempClick(obj) {
    if (obj.value == "Yes") {
        $('#p_AStemplate').css("display", "");
        $('#div_AStemplate').css("display", "");
    } else {
        $('#p_AStemplate').css("display", "none");
        $('#div_AStemplate').css("display", "none");
    }
}

function IsApprovalSheetFromTemplat() {
    //manoj
    $("#docApprovalSheetContract").replaceWith($("#docApprovalSheetContract").val('').clone(true));
    $("#ddlSummaryDocumentTemplate").val('0');
    $("#txtSummaryDocumentNameCreate").val('');
    $("#txtSummaryDescriptionDoc").val('');
    $("#txtSummaryDescriptionDocFromComputer").val('');
    //manoj
    $('#dvASFromTemp').css("display", "");
    $('#dvASFromComputer').css("display", "none");
}

function IsApprovalSheetFromComputer() {
    $('#dvASFromComputer').css("display", "");
    $('#dvASFromTemp').css("display", "none");
}

$('#btnApprovalSheetCreate').click(function () {
    //manoj
    $("#docApprovalSheetContract").replaceWith($("#docApprovalSheetContract").val('').clone(true));
    $("#ddlSummaryDocumentTemplate").val('0');
    $("#txtSummaryDocumentNameCreate").val('');
    $("#txtSummaryDescriptionDoc").val('');
    $("#txtSummaryDescriptionDocFromComputer").val('');
    //manoj

    $('input[type="radio"][name="ApprovalSheetProcess"][value="ApprovalSheetFromTemplate"]').prop('checked', true);
    $('#dvASFromTemp').css("display", "");
    $('#dvASFromComputer').css("display", "none");
    $("#addEditApprovalSheetDocument").dialog("option", "title", "Create Summary/ Approval Sheet");
    $("#addEditApprovalSheetDocument").dialog("open");
});

function refreshsummarysheet() {
    $("input[name='IsApprovalSheetTaskDetails'][value='Yes']").trigger("click");
    $("input[name='IsApprovalSheet'][value='No']").trigger("click");
    $("#lblApprovalSheetTempdocuments").empty();
    $("#lblApprovalSheetTempdocuments").css('display', 'none');
    $("#btnApprovalSheetCreate").css('display', 'none');
    $(".FL_ApprovalSheetContract").css("display", "none");
    $("#ddlApprovalsSheets").removeClass("validelement");
}

function uploadApprovalSheettoSummaryDocs() {
    var isTemplate = false;
    if ($("input:radio[name=ApprovalSheetProcess]:checked").val() == "ApprovalSheetFromTemplate") {
        isTemplate = true;
    }
    else {
        isTemplate = false;
    }
    if (isTemplate) {
        if (requiredValidator('saveASFromTempForm')) {
            $("#loadingPage").fadeIn();
            var folderurl = $("#lblFolderUrlApprovalSheet").text();
            var documentName = $("#txtSummaryDocumentNameCreate").val() + ".docx";
            if (!CheckDocumentExist(folderurl, documentName)) {
                $('.ui-button-green-text').parent().attr('disabled', 'disabled');
                var formData = new FormData();
                formData.append("DocDescription", $("#txtSummaryDescriptionDoc").val());
                formData.append("DocumentAuthor", "");
                formData.append("DocumentLanguage", "");
                formData.append("HardCopyPhysicalLocation", "");
                formData.append("ContractID", $("#hdWorkflowObjectID").val());
                formData.append("ContractTitle", $("#hdWorkflowObjectTitle").val());
                formData.append("DocumentType", "");
                formData.append("Counterparty", "");
                formData.append("TemplateName", $("#ddlSummaryDocumentTemplate").find('option:selected').val().split('~')[1]);
                formData.append("TemplateID", $("#ddlSummaryDocumentTemplate").find('option:selected').val().split('~')[0]);
                formData.append("DocumentName", $("#txtSummaryDocumentNameCreate").val());
                formData.append("AccountID", localStorage.AccountID);
                formData.append("IsStandard", "No");
                formData.append("IsPrimary", "No");
                formData.append("IsFinalized", "No");
                formData.append("DocumentStatus", "New");
                formData.append("BusinessArea", $("#hdWorkflowBusinessArea").val().trim());
                formData.append("BusinessAreaPath", $("#hdWorkflowBusinessAreaPath").val());
                formData.append("ContractArea", $("#hdWorkflowContractArea").text().trim());
                formData.append("ContractAreaAdministrators", "");
                formData.append("BusinessAreaOwners", "");
                formData.append("ValidFrom", "");
                formData.append("ValidTill", "");
                formData.append("Reminder1", "");
                formData.append("Reminder1Condition", "");
                formData.append("Reminder2", "");
                formData.append("Reminder2Condition", "");
                formData.append("Reminder3", "");
                formData.append("Reminder3Condition", "");
                formData.append("CreatingFromContractForm", "No");
                formData.append("Location", "Office 365 Document Library");
                formData.append("LocationURL", folderurl);
                formData.append("CreatedBy", localStorage.UserName);
                formData.append("ModifiedBy", localStorage.UserName);
                formData.append("SendReminderTo", "");
                formData.append("HostURL", localStorage.SPHostUrl);
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/uploadapprovaltemplate',
                    type: 'POST',
                    data: formData,
                    cache: false,
                    contentType: false,
                    headers: {
                        'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken
                    },
                    processData: false,
                    async: true,
                    success: function (data) {
                        data = data[0];
                        oApprovalNewDocID = data.RowKey;
                        $("#addEditApprovalSheetDocument").dialog("close");
                        $("#btnApprovalSheetCreate").css('display', 'none');
                        $("#lblApprovalSheetTempdocuments").html("");

                        //$("#uploaddocumentprocess").css('display', 'none');
                        $('.ui-button-green-text').parent().removeAttr('disabled');
                        var vURL = encodeURI(data.DocumentUrl);

                        var lblDocText = "";
                        lblDocText += '<div class="width100">';
                        lblDocText += '<label id="DocumentID" style="display:none;">' + data.RowKey + '</label>';
                        lblDocText += '<label id="DocumentName" style="display:none;">' + data.DocumentName + '</label>';
                        lblDocText += '<label id="DocumentURL" style="display:none;">' + encodeURI(data.DocumentUrl) + '</label>';
                        lblDocText += '<a href="javascript:void(0);" style="pointer-events: none;cursor: default;" onclick="viewdocinword(\'' + vURL + '\')" class="linkText">' + data.DocumentName + '</a><a href="javascript:void(0);" onclick="viewdocinword(\'' + vURL + '\')" title="View Document" class="linkText" style="margin-left: 5px !important;pointer-events: none;cursor: default;"><img src="/Content/Images/external_link.png" id="newTabImage" style="margin-top: -1px;"></a>';
                        lblDocText += '</div>';

                        $("#lblApprovalSheetTempdocuments").html(lblDocText);
                        $("#lblApprovalSheetTempdocuments").css('display', '');

                        clearTimeout(cleartimevalue1);
                        cleartimevalue1 = setTimeout(CheckDocumentCreate, 10000);
                    },
                    error: function (data) {
                        oApprovalNewDocID = "";
                    },
                    complete: function (data) {
                        $("#loadingPage").fadeOut();
                        // $("#uploaddocumentprocess").css('display', 'none');
                    }
                });
            }
            else {
                swal("", " '" + documentName + "' already exist");
            }
        }
    }
    else {
        if (requiredValidator('saveASFromComputerForm')) {
            $("#loadingPage").fadeIn();
            var folderurl = $("#lblFolderUrlApprovalSheetFromComputer").text();
            var documentName = encodeURIComponent($('#docApprovalSheetContract')[0].files[0].name);
            if (!CheckDocumentExist(folderurl, documentName)) {
                $('.ui-button-green-text').parent().attr('disabled', 'disabled');
                var formData = new FormData();
                var opmlFile = $('#docApprovalSheetContract')[0];
                if (opmlFile.files.length > 0) {
                    formData.append("opmlFile", opmlFile.files[0]);
                }
                formData.append("DocDescription", $("#txtSummaryDescriptionDocFromComputer").val());
                formData.append("DocumentAuthor", "");
                formData.append("DocumentLanguage", "");
                formData.append("HardCopyPhysicalLocation", "");
                formData.append("ContractID", $("#hdWorkflowObjectID").val());
                formData.append("ContractTitle", $("#hdWorkflowObjectTitle").val());
                formData.append("DocumentType", "");
                formData.append("Counterparty", "");
                formData.append("AccountID", localStorage.AccountID);
                formData.append("IsStandard", "No");
                formData.append("IsPrimary", "No");
                formData.append("IsFinalized", "No");
                formData.append("DocumentStatus", "New");
                formData.append("BusinessArea", $("#hdWorkflowBusinessArea").val());
                formData.append("BusinessAreaPath", $("#hdWorkflowBusinessAreaPath").val());
                formData.append("ContractArea", $("#hdWorkflowContractArea").val());
                formData.append("ContractAreaAdministrators", "");
                formData.append("BusinessAreaOwners", "");
                formData.append("ValidFrom", "");
                formData.append("ValidTill", "");
                formData.append("Reminder1", "");
                formData.append("Reminder1Condition", "");
                formData.append("Reminder2", "");
                formData.append("Reminder2Condition", "");
                formData.append("Reminder3", "");
                formData.append("Reminder3Condition", "");
                formData.append("CreatingFromContractForm", "No");
                formData.append("Location", "Office 365 Document Library");
                formData.append("LocationURL", folderurl);
                formData.append("CreatedBy", localStorage.UserName);
                formData.append("ModifiedBy", localStorage.UserName);
                formData.append("SendReminderTo", "");
                formData.append("HostURL", localStorage.SPHostUrl);
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/uploadapprovaldocument',
                    type: 'POST',
                    data: formData,
                    cache: false,
                    contentType: false,
                    headers: {
                        'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken
                    },
                    processData: false,
                    async: true,
                    success: function (data) {
                        $("#addEditApprovalSheetDocument").dialog("close");
                        $("#btnApprovalSheetCreate").css('display', 'none');
                        $("#lblApprovalSheetTempdocuments").html("");
                        oApprovalNewDocID = data.RowKey;
                        //$("#uploaddocumentprocess").css('display', 'none');
                        $('.ui-button-green-text').parent().removeAttr('disabled');
                        var vURL = encodeURI(data.DocumentUrl);

                        var lblDocText = "";
                        lblDocText += '<div class="width100">';
                        lblDocText += '<label id="DocumentID" style="display:none;">' + data.RowKey + '</label>';
                        lblDocText += '<label id="DocumentName" style="display:none;">' + data.DocumentName + '</label>';
                        lblDocText += '<label id="DocumentURL" style="display:none;">' + encodeURI(data.DocumentUrl) + '</label>';
                        lblDocText += '<a href="javascript:void(0);" style="pointer-events: none;cursor: default;" onclick="viewdocinword(\'' + vURL + '\')" class="linkText">' + data.DocumentName + '</a><a href="javascript:void(0);" onclick="viewdocinword(\'' + vURL + '\')" title="View Document" class="linkText" style="margin-left: 5px !important;pointer-events: none;cursor: default;"><img src="/Content/Images/external_link.png" id="newTabImage" style="margin-top: -1px;"></a>';
                        lblDocText += '</div>';

                        $("#lblApprovalSheetTempdocuments").html(lblDocText);
                        $("#lblApprovalSheetTempdocuments").css('display', '');

                        clearTimeout(cleartimevalue1);
                        cleartimevalue1 = setTimeout(CheckDocumentCreate, 10000);
                    },
                    error: function (data) {
                        oApprovalNewDocID = "";
                    },
                    complete: function (data) {
                        $("#loadingPage").fadeOut();
                        //$("#uploaddocumentprocess").css('display', 'none');
                    }
                });
            }
            else {
                swal("", " '" + documentName + "' already exist");
            }
        }
    }
}

function CheckDocumentExist(FolderUrl, documentName) {
    var isExist = false;
    var vDocURL = "";
    var folderurltobind = "";
    vDocURL = localStorage.SPHostUrl + FolderUrl + documentName;
    folderurltobind = "";
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?contractid=' + $("#hdWorkflowObjectID").val() + '&docurl=' + vDocURL,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        async: false,
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        success: function (data) {
            if (data == null) {
                isExist = false;
            }
            else {
                isExist = true;
            }
        },
        error: function (data) {
            isExist = false;
        }
    });
    return isExist;
}

function CheckDocumentCreate() {
    if (typeof oApprovalNewDocID !== 'undefined' && oApprovalNewDocID != null && oApprovalNewDocID != "") {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + oApprovalNewDocID,
            type: 'GET',
            dataType: 'json',
            "Content-Type": "application/json",
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            cache: false,
            success: function (data1) {
                if (data1 != null) {
                    if (data1.IsActive != "No") {
                        var vURL = encodeURI(data1.DocumentUrl);
                        $("#lblApprovalSheetTempdocuments").html("");
                        var lblDocText = "";
                        lblDocText += '<div class="width100">';
                        lblDocText += '<label id="DocumentID" style="display:none;">' + data1.RowKey + '</label>';
                        lblDocText += '<label id="DocumentName" style="display:none;">' + data1.DocumentName + '</label>';
                        lblDocText += '<label id="DocumentURL" style="display:none;">' + encodeURI(data1.DocumentUrl) + '</label>';
                        lblDocText += '<a href="javascript:void(0);"  onclick="viewdocinword(\'' + vURL + '\')" class="linkText">' + data1.DocumentName + '</a><a href="javascript:void(0);" onclick="viewdocinword(\'' + vURL + '\')" title="View Document" class="linkText" style="margin-left: 5px !important;"><img src="/Content/Images/external_link.png" id="newTabImage" style="margin-top: -1px;"></a>';
                        lblDocText += '<a id="d_' + data1.RowKey + '" name="' + escape(data1.DocumentName) + '" href="javascript:void(0)" onclick="DeleteApprovalSheetDocument(this);"><img src="../Content/Images/icon/delete.png" title="delete"></a>';
                        lblDocText += '</div>';
                        $("#lblApprovalSheetTempdocuments").html(lblDocText);
                        $("#lblApprovalSheetTempdocuments").css('display', '');
                        oApprovalNewDocID = "";
                    } else {
                        clearTimeout(cleartimevalue1);
                        cleartimevalue1 = setTimeout(CheckDocumentCreate, 10000);
                    }
                }
            },
            error: function (data1) {
            }
        });
    } else {
        clearTimeout(cleartimevalue1);
    }
}

function onchangesummarytemplate(obj) {
    if (obj.value != "0") {
        $("#txtSummaryDocumentNameCreate").val($(obj).find('option:selected').text());
    } else {
        $("#txtSummaryDocumentNameCreate").val('');
    }
}

function DisplayApprovalDocument(objvalue) {
    $("#ulAdditionalApprovalDocs").html('<img src="../Content/Images/icon/loading.gif"> Please wait...');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?contractid=' + $("#hdWorkflowObjectID").val(),
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        success: function (documentcollection) {
            if (documentcollection != '' && documentcollection != 'undefined' && typeof (documentcollection) != "undefined") {
                var data = $.grep(documentcollection, function (n, i) {
                    return (n.IsFolder != "Yes" && n.RowKey != oApprovalNewDocID && n.IsActive != "No");
                });
                if (data.length == 0) {
                    $("#ulAdditionalApprovalDocs").html('No items found.');
                    $("#btnSaveAdditonalDocSummaryAdd").css('display', 'none');
                    $("#addAdditionalApprovalSheetDocument").dialog("option", "title", "Select Document(s)");
                    $("#addAdditionalApprovalSheetDocument").dialog("open");
                } else {
                    $("#btnSaveAdditonalDocSummaryAdd").css('display', '');
                    $('#ulAdditionalApprovalDocs').empty();
                    CreateDocumentListNewForApproval(data);
                }
            }
            else {
                $("#btnSaveAdditonalDocSummaryAdd").css('display', 'none');
                $("#ulAdditionalApprovalDocs").html('No items found.');
                $("#addAdditionalApprovalSheetDocument").dialog("option", "title", "Select Document(s)");
                $("#addAdditionalApprovalSheetDocument").dialog("open");
            }
        },
        error:
        function (data) {
            $("#btnSaveAdditonalDocSummaryAdd").css('display', 'none');
            $("#ulAdditionalApprovalDocs").html('No items found.');
            $("#addAdditionalApprovalSheetDocument").dialog("option", "title", "Select Document(s)");
            $("#addAdditionalApprovalSheetDocument").dialog("open");
        },
        complete: function () {
        }
    });
}

function CreateDocumentListNewForApproval(data) {
    var datalenght = data.length;
    $("#ulAdditionalApprovalDocs").empty();
    var vTitle = '';
    var article = '';
    var DocDefaultView = "";
    if (thisDocumentLibrarySettings != '' && thisDocumentLibrarySettings != 'undefined' && typeof thisDocumentLibrarySettings != "undefined") {
        DocDefaultView = thisDocumentLibrarySettings.DocDefaultView;
    }
    for (var i = 0; i < datalenght; i++) {
        var item = data[i];
        if (item.IsActive != "No") {
            var settings = {
                pattern: /\.[0-9a-z]+$/i,
                knownFileTypes: ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'zip', 'rar', 'gzip', 'arj', 'wav', 'mp3', 'aif', 'aiff', 'm4a', 'ogg', 'wma', 'psd', 'ai', 'swf', 'fla', 'css', 'js', 'avi', 'mov', 'wmv', 'dotx'],
                WopiFrameFileTypes: ['doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx', 'dotx']
            };
            var vPrimDocIcon = '';
            vURLDoc = encodeURI(item.DocumentUrl);
            var ext = vURLDoc.match(settings.pattern);
            var vFileType = '<dd class="file-icon none"></dd>';
            if (ext != null) {
                if (ext.length > 0) { ext = ext[0].slice(1); }
                if (DocDefaultView == "WordClient") {
                    if (vURLDoc.toLowerCase().indexOf(localStorage.SPHostUrl.toLowerCase()) >= 0) {
                        if (jQuery.inArray(ext, settings.WopiFrameFileTypes) > -1) {
                            vRawURLDoc = encodeURIComponent(item.DocumentUrl);
                            vURLDoc = localStorage.SPHostUrl + "/_layouts/WopiFrame.aspx?sourcedoc=" + vRawURLDoc + "&action=default";
                        } else {
                            vRawURLDoc = "";
                        }
                    }
                }
                if (jQuery.inArray(ext.toLowerCase(), settings.knownFileTypes) > -1) {
                    vFileType = '<dd class="file-icon ' + ext + '"></dd>';
                }
            }
            article += '<li class=" margin-bottom-5" active=' + item.IsActive + '>';
            article += '<label id="DocumentID" style="display:none;">' + item.RowKey + '</label>';
            article += '<label id="DocumentName" style="display:none;">' + item.DocumentName + '</label>';
            article += '<label id="DocumentURL" style="display:none;">' + encodeURI(item.DocumentUrl) + '</label>';
            article += '<input type="checkbox" id="' + item.RowKey + '" name="MultipleApprovalDocuments" class="Contribute" value=' + item.RowKey + ' /> ';

            vTitle = item.DocumentName;
            if (vTitle.length > 61)
            { vTitle = vTitle.substring(0, 60) + '...'; }

            if (vRawURLDoc != "") {
                if (DocDefaultView == "WordClient") {
                    article += vFileType + '<a href="#" seqe = "' + vRawURLDoc + '" onclick="viewdocinword(\'' + vRawURLDoc + '\')" title="' + item.DocumentName + '">' + vTitle + '</a>';
                } else {
                    article += vFileType + '<a href="javascript:void(0);" data-value="' + encodeURIComponent(item.DocumentUrl) + '"   onclick="Opendocinbrowser(this)"  title="' + item.DocumentName + '">' + vTitle + '</a>';
                }
            } else {
                article += vFileType + '<a href="javascript:void(0);" data-value="' + encodeURIComponent(item.DocumentUrl) + '"  onclick="Opendocinbrowser(this)"  title="' + item.DocumentName + '">' + vTitle + '</a>';
            }
            article += '';
            article += '';
            article += '&nbsp';

            var the_arr = item.DocumentUrl.replace(localStorage.SPHostUrl + "/", "").split('/');
            the_arr.pop();
            var changedUrl = the_arr.join('/');
            article += '<div class="documenturlclass" style="margin-left:0px"><label title="' + changedUrl + '"><img src="../Content/Images/icon/folder_open.png" style="margin-right: 5px;">' + changedUrl + '</label></div>'
            article += '</li>';
        }
    }
    $("#ulAdditionalApprovalDocs").html(article);
    $("#ulAdditionalApprovalDocs").addClass('ulmarginclass');
    $("#addAdditionalApprovalSheetDocument").dialog("option", "title", "Select Document(s)");
    $("#addAdditionalApprovalSheetDocument").dialog("open");
}

function uploadAdditionalDocstoSummary() {
    $("#addAdditionalApprovalSheetDocument").dialog("close");
    $("#lblApprovalSheetdocuments").html("");
    $('.ui-button-green-text').parent().removeAttr('disabled');
    var lblDocText = "";
    $.each($("input[name='MultipleApprovalDocuments']:checked"), function () {
        var documentID = $(this).parent('li').find("#DocumentID").text();
        var documentName = $(this).parent('li').find("#DocumentName").text();
        var documentURL = $(this).parent('li').find("#DocumentURL").text();
        lblDocText += '<div class="width100">';
        lblDocText += '<label id="DocumentID" style="display:none;">' + documentID + '</label>';
        lblDocText += '<label id="DocumentName" style="display:none;">' + documentName + '</label>';
        lblDocText += '<label id="DocumentURL" style="display:none;">' + documentURL + '</label>';
        lblDocText += '<a href="javascript:void(0);"  onclick="viewdocinword(\'' + documentURL + '\')" class="linkText">' + documentName + '</a><a href="javascript:void(0);" onclick="viewdocinword(\'' + documentURL + '\')" title="View Document" class="linkText" style="margin-left: 5px !important;"><img src="/Content/Images/external_link.png" id="newTabImage" style="margin-top: -1px;"></a><a href="javascript:void(0);" onclick="removeadditionalapprovalsheetdocument(this)" title="Remove Document" class="linkText" style="margin-left: 5px !important;"><img src="/Content/Images/icon/delete.png" id="newTabImage" style="margin-top: -1px;"></a>';
        lblDocText += '</div>';
    });
    $("#lblApprovalSheetdocuments").html(lblDocText);
    $("#lblApprovalSheetdocuments").css('display', '');
}

function removeadditionalapprovalsheetdocument(obj) {
    $(obj).parent('div').remove();
}
//For Contract Summary Sheet
//manoj

function DeleteApprovalSheetDocument(obj) {
    $("#loadingPage").fadeIn();
    var approvalSheetDocumentID = (obj.id).slice(2);
    var documentName = unescape(obj.name);
    swal({
        title: '',
        text: "Are you sure you want to <span style='font-weight:700'>delete '" + documentName + "'</span>?",
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
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + approvalSheetDocumentID,
                 type: 'DELETE',
                 dataType: 'json',
                 "Content-Type": "application/json",
                 headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                 cache: false,
                 success: function (data) {
                     //manoj
                     $("#btnApprovalSheetCreate").css('display', '');
                     $("#lblApprovalSheetTempdocuments").html("");
                     $("#lblApprovalSheetTempdocuments").css('display', 'none');
                     clearTimeout(cleartimevalue);
                     cleartimevalue = setTimeout(refreshdocuemnt, 10000);

                     //$("#ddlDocumentList").trigger('chosen:updated');
                     $("#loadingPage").fadeOut();
                 },
                 error: function () {
                     $("#loadingPage").fadeOut();
                 }
             });
         }
         return;
     });
}




function GetUserPermissionCIndex() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users?userid=' + localStorage.UserID + '&office365emailid=',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            localStorage.setItem("UserType", data.UserType);
            $("#userDesignation").html(data.UserType);
            if (typeof localStorage.GlobalBusinessAreaLocation !== 'undefined') {
                if (localStorage.GlobalBusinessAreaLocation == "All" || localStorage.GlobalBusinessAreaLocation == "") {
                    $("#heading_contracts").text("Contract Records");
                    //$("#qvAllContracts").css('display', 'none');
                    $(".newContract1").css('display', 'none');
                    $(".newContract").css('display', '');

                    $("#qvDraft").css('display', '');
                    $("#qvSharedContracts").css('display', '');
                    $("#qvOwnedByMe").css('display', '');
                    $("#qvCreatedByMe").css('display', '');
                    $("#qvWithCustomPermissions").css('display', 'none');
                    $("#qvInRecycleBin").css('display', 'none');
                } else {
                    //if global business area selected, do not show Create Contract menu
                    $(".newContract").css('display', 'none');
                    if (localStorage.BusinessAreaAccess.indexOf(localStorage.GlobalBusinessAreaLocation) >= 0 || localStorage.UserType.indexOf("Global Contract Owner") >= 0 || localStorage.IsGeneralBusinessArea == "Yes") {
                        $(".newContract1").css('display', '');
                    } else { $(".newContract1").css('display', 'none'); $(".newContract").css('display', 'none'); }

                    thisContractAreaName = localStorage.GlobalBusinessAreaLocation.split('>')[0].trim();
                    thisBusinessAreaName = localStorage.GlobalBusinessArea + ';' + thisContractAreaName;//Business Area +';'+ Contract Area
                    $("#dashmain").attr("src", "/Content/images/icon/gen.png");
                    $("#heading_contracts").text(localStorage.GlobalBusinessAreaLocation);

                    $("#qvDraft").css('display', 'none');
                    $("#qvSharedContracts").css('display', 'none');
                    $("#qvOwnedByMe").css('display', 'none');
                    $("#qvCreatedByMe").css('display', 'none');
                    $("#qvWithCustomPermissions").css('display', '');
                    $("#qvInRecycleBin").css('display', '');
                }

            } else {
                $("#heading_contracts").text("Contract Records");
                //$("#qvAllContracts").css('display', 'none');
                $(".newContract1").css('display', 'none');
                $(".newContract").css('display', '');

                $("#qvDraft").css('display', '');
                $("#qvSharedContracts").css('display', '');
                $("#qvOwnedByMe").css('display', '');
                $("#qvCreatedByMe").css('display', '');
                $("#qvWithCustomPermissions").css('display', 'none');
                $("#qvInRecycleBin").css('display', 'none');
            }

        },
        error:
            function (data) {
                location = "/Error/UserDisabled";
            }
    });
}
//Copy Contract link Enhancment
function CopyLink() {
    if (requiredValidator("copylink")) {
        $('#lblcopylink').css("display", "");
        var copyText = document.getElementById("txtCopyLink");
        copyText.select();
        document.execCommand("copy");
        var CopyLinkCreated = new Date().toUTCString();
        var CopyLinkValidity = ($('#txtValidLinkTill').val() != "" && $('#txtValidLinkTill').val() != null ? $('#txtValidLinkTill').val() + " " + $('#ddlValidFor').val() : " ");
        var CopyLinkValidTill;
        if (CopyLinkValidity != " " && CopyLinkValidity != null && CopyLinkValidity != undefined) {
            switch ($('#ddlValidFor').val()) {
                case "days":
                    CopyLinkValidTill = moment(CopyLinkCreated).add($('#txtValidLinkTill').val(), "days").format('MM/DD/YYYY');
                    break;
                case "months":
                    CopyLinkValidTill = moment(CopyLinkCreated).add($('#txtValidLinkTill').val(), "months").format('MM/DD/YYYY');
                    break;
            }
        }
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + $('#hdContractID').val() + '/CopyLink?CopyLinkId=' + $('#txtCopyLinkID').val() + '&CopyLinkValidity=' + CopyLinkValidity + '&CopyLinkValidTill=' + CopyLinkValidTill + '&CopyLinkCreated=' + CopyLinkCreated,
            type: 'PUT',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            cache: false,
            success: function (data) {
                $("#copylink").dialog("close");
                $("#hdContractID").val('');
            },
            error: function () { },
            complete: function () {
                $("#copylink").dialog("close");
            }
        });

    }
}

function ClearCopyLinkForm() {
    $('#trLinkValid').css("display", "none");
    $('#chkCopyLinkExpire').prop("checked", true);
    $('#txtValidLinkTill').val('');
    $('#lblcopylink').css("display", "none");
}

$('#chkCopyLinkExpire').change(function () {
    if ($('#chkCopyLinkExpire').prop('checked') == true) {
        $('#trLinkValid').css("display", "none");
        $('#txtValidLinkTill').val('').removeClass("validelement");
    }
    else {
        $('#trLinkValid').css("display", "");
        $('#txtValidLinkTill').addClass("validelement");
    }
})

function GetUniqueCopyLinkID() {
    var copylink = $('#hdContractID').val() + "~" + localStorage.AccountID;
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/GenerateLink?copylink=' + copylink,
        type: 'Get',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        cache: false,
        success: function (data) {
            var getUrl = window.location;
            var baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
            $('#txtCopyLink').val(baseUrl + "/Link/" + data.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, 'a'));
            $('#txtCopyLinkID').val(data.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, 'a'));
            $("#copylink").dialog("open");
        },
        error: function () { },
    });
}
//Copy Contract link Enhancment

// Method for Cover Sheet
function getcontractsummerytemplate(ContractType, SummeryBlobURL, action, status, vPermission) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/summerytemplatebyctype?contype=' + encodeURIComponent(ContractType),
        type: 'GET',
        dataType: 'json',
        cache: false,
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        //contentType: false,
        success: function (SummeryTemp) {
            if (action) {
                if (status != "Cancelled") {
                    if (vPermission != "View" && status != "Archived" && status != "Expired") {
                        $("#lisummarydocument").css("display", "");
                    } else {
                        $("#lisummarydocument").css("display", "none");
                    }
                }
            }
            else if (vPermission != "View" && status != "Cancelled" && status != "Archived" && status != "Expired") {
                $("#lisummarydocument").css("display", "none");
            } else {
                $("#lisummarydocument").css("display", "none");
            }
        },
        error: function (SummeryTemp) {
            if (action) {
                //manoj
                if (vPermission != "View") {
                    $("#lisummarydocument").css("display", "");
                } else {
                    $("#lisummarydocument").css("display", "none");
                }
                //manoj
            } else {
                $("#lisummarydocument").css("display", "none");
            }
        }
    });
}