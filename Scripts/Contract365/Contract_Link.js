/*--Contract Details--*/
var vAccountID = "";
var vContractID = "";
var vAPIKey = "";


var articleSystemMileStone = '';
var articleDocumentMileStone = '';
var articleMileStone = '';
var articleObligationMileStone = '';
var flag = true;
var arrUser = [];
var delayedTermDates = "";
var arrGlobalUser = [];
var arrPermsnUser = [];
var arrAdminUser = [];
var vContractTile = "";
var contractItem;
var SettingUserRole = "";
var strSelectedContractType = "";
var SaveDraftInCloud = "";
var SaveFinalInCloud = "";
var AllowSaveDraftInCloud = "";
var thisContractAreaSettings;
var businessAreaPath = "";
var settingRenewable = false;
var lstSelectedLabels = "";
var tmpSelectedLabels = "";
var vCurrencyDisplayStyle = "";
var projMgrs = '';
var listAllObligations = "";
var listObligationsGroup = "";
var listAllObligationCatalogs = "";
var inrefreshState = false;
var droppedfiles = [];
var cTitle = null;
var cFlag = null;
var removedItems = [];
var ManageremovedItems = [];
var Managedroppedfiles = [];
var connamechecking = null;
var defaultGlobalSettings = "";
var vGlobalObjForGeneric = "";
var fileurldetails = "";
var urldetailsforcontact = "";
var ExitDocuemntName = "";
var contractAccessUsers = [];
var multipleChecksDocumentIDd = [];
var myArrayRU = [];
var arrprevRU = [];
var myCounterPartyArray = [];
var CounterPartyArrayprev = [];
var lblcontracttitle = "";
var lblcontracttitledescription = "";
var DocumentCount = 0;
var ContractDocumentDetails = [];
var Collectcontractdocument = false;
var projectManager = "";
var arrRelatedcontractRowkey = [];
var RelatedContractRelationShipTypeparent = "";
var docInAutomationList = "";
var changedocumentstatusbyid = "";
var pendingStarted = false;

var legalentitydetailstofetch = [];

var recipientsArray = [];
var reportRecipientsDuplicate = [];
var arremail = [];
var isTermSetting = false;
var ContractCurrencyType = "";
var PrvRelatedCounterparities = [];
var arrRelatedCounterparities = [];
var curRelatedCounterparities = [];
var arrClausegroup = [];
var arrClauseLangage = [];
var arrfinalclauselanguage = [];
var arrfinalclauselanguagesave = [];
var arrPrvwClause = [];
var arrChangestoSave = [];
var arrforeditandcancel = [];
var contrcttypeselection = [];
var areaforclause12 = null;
var countareaforclause = 1;
var GroupCollectionforclause = [];
var areaaa = null;
var DocumnetTemplateCollection = [];
var Taglanguagecollection = [];
var DatepickerFormat = '';
var AmendmentidtoPass = "";
var MakeFinalized = "No";
var workflowurltoshowDOCUMENT = "";
var workflowurltoshowCONTRACT = "";
var dropexitfilename = [];
var Managedropexitfilename = [];
var vURLDoc = "";
var vRawURLDoc = "";
var thisDocumentLibrarySettings;
var vDefaultAmendment = "";
var DocSignCompState = ["signed", "Completed"];
var vUserListG = '';
var selecteddocumententity;
var addbuttonclick = false;
var oldRelatedcontract = '';
var SavedRelatedContract = [];
var arroldRelatedcontract = [];
var arrRelatedContracts = [];
var arrObligationCatelog = [];
var vProviderDocSign = '';
var RightSignatureFlag = false;
var Folderselection = "";
var PrvFolderselection = "";
var parentdocid = "";
var parentdocname = "";
var ContractRoles = [];
var IsPipeline = true;
var articleDocuments = "";
var DocVersion = "";
var Stage = '';
var selectedamnddoc = false;
var selectedamnddocname = [];
var ContractLabels = [];
var documentview = "";
var vMetadatavaluetobindcutomFinancial;
var cutomFinancialFields = [];
var thisBusinessAreaName = "";
var thisContractAreaName = "";
var thisBusinessAreaNameC = "";
var thisContractAreaNameC = "";
var thisBusinessAreaNameRowKey = "";
var thisContractAreaNameRowKey = "";
var thisBusinessAreaPath = '';
var FullContractroleUser = [];
var ReadContractroleUser = [];
var ReadWriteContractroleUser = [];
var ContractStatus = "";
var TermTypeBinded = false;
var RelationshipTypes = [];
var currentPanel = "";
var OlRelatedContracts = [];
var arrRelatedContractsSelected = [];
var LabelsCategories = [];
var arrLabelCollection = [];
var hashtable = {};
var LeagalEntity;
var strSelCounterPartyField = "";
var listRelatedContracts = [];
var cleartimevalue;
var cleartimevalue1;
var cleartimevalue2;
var UpComingNotes = '';
var UpcomingChecklist = '';
var TermName = "";
var vWorkflowItem = "";
var vTaskID = "";
var vContractRenewalHistory = [];
//var vRenewalConfirmParticipantsXML = "";
var ArrayofAmendmentWorkflows = [];
var ArrayofDocumentWorkflows = [];
var vSliderCounter = 0;
var MethodCount = 0;
var GetallMetadataWithCT = [];
var GetallFinancialMetadataWithCT = [];
var icontractItem = "";
var StageName = [];
var oGeneralSettings = "";
var ConfirmParticipationCollection = [];
var IsRenewfromTerm = false;
var oldCounterParty = "";
var IsApprovalSheetFeatureExits = false;
var oRelatedApprovalSheets = "";
var holderManagebulk;
var Manageparentfolderidtopass = "";
var ManageFolderAction = "";
var FromManage = true;
var OCRDocEnabled = false;
var allUsersList = [];
var arrCategories = [];
var arrLabels = [];
var arrManageTag = [];
var Updatedocumenttap = false;

/*--Documents--*/

var parentfolderidtopass = "";
var dropdownlength = 0;
var uploadedfilecount = 0;
var contractparentfolderid = "";

/*--Amendments--*/

var parentfolderidtopass = "";
var dropdownlength = 0;
var uploadedfilecount = 0;
var contractparentfolderid = "";

/*--Milestone & Obligations--*/

var obligationProducts = "";


/*--Contract Terms--*/

var contrcatItem = [];
var EndDateCheck = "";
var EndDateCheckRenewal = "";
var CurrentTermDetails = "";
var renewalPrevDate;
var RenewalAddFlag = false;
var RenewalItemEdit = "";
var DatepickerFormat = '';
var NextTermRenewFlag = false;
var maxAllowedDate;
var RenewalName = "";
var EditSaveFlag = false;
var vAlertEnabled;
var TermTypeDisplayName = {};
var IsExpired = false;

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function GetIdByCopyLink(vCopyLinkID) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/Contracts/ContractCopyLink?copyLinkId=' + vCopyLinkID,
        type: 'GET',
        cache: false,
        contentType: false,
        async: false,
        headers: { 'eContracts-ApiKey': vAPIKey },
        processData: false,
        success: function (item) {
            if (item != null) {
                vContractID = item.RowKey;
                $('#mainDiv').show();
                $("#divCopyLinkExpired").hide();
            }
            else {
                $('#mainDiv').hide();
                IsExpired = true;
                $('#divCopyLinkExpired').show();
            }
        },
    });
}

$(document).ready(function () {
    vAccountID = $('#hdAccountID').val();
    vAPIKey = $('#hdAPIKey').val();
    if (typeof localStorage.eContractFeatures === "undefined")
        GetFeatures(false);
    else
        GetFeatures(true);
    GetIdByCopyLink($('#copylinkid').val());

    $("#viewMetadataDetailDocument").dialog({
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

    if (!IsExpired) {
        /*--Contract Details--*/
        try {
            BindContractDetails(vContractID);
        } catch (e) {
            $("#loadingPage").fadeOut();
        }
        EnableDisableOCR();

        //ManageBulkDocumentUpload();


        GetRenewalChecklistAndNotes(vContractID, "PageLoad");
        icontractdetails(); //ENH485  Featured metadata
        getworkflowrules();  //ENH492 - Workflow Cycle time Report & default naming of stages.
        BindMilestone(vContractID);
        GetInnerFeatures();
        var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
        if (veContractFeatures == null) {
            //GetFeaturesInDetailPage();
        }

        var vAccFeatObligation = $.grep(veContractFeatures, function (n, i) {
            return (n.RowKey == "2" && n.Status == "ON");
        });
        if (vAccFeatObligation.length > 0)
            BindObligationsNew(vContractID);

        var vAccFeatApprovalSheet = $.grep(veContractFeatures, function (n, i) {
            return (n.RowKey == "30" && n.Status == "ON");
        });
        if (vAccFeatApprovalSheet.length > 0)
            IsApprovalSheetFeatureExits = true;
        else {
            IsApprovalSheetFeatureExits = false;
        }

        $('#idDocumentPopup').css("display", "none");
        $("#divBtn").hide();
        $('#catalogAmountsumaryValue').autoNumeric('init');
        $('#catalogAmountsumaryValueEdit').autoNumeric('init');

        var vTab = getParameterByName("Tab");
        if (vTab == 'Activity') {
            GetContractActivities(vContractID);
            ShowTabDetail('Activity');
        }
        else if (vTab == 'Notes') {
            BindNotes(vContractID);
            ShowTabDetail('Notes');
        }
        else if (vTab == 'TermsClause') {
            //TermsAndClauseDocument(vContractID);
            ShowTabDetail('TermsClause');
        }

        //vContractID = getParameterByName("ContractID");
        docInAutomationList = "";

        $("#showMSWordPopup").dialog({
            autoOpen: false,
            closeText: "",
            width: "40%",
            height: "auto",
            modal: true
        });

        //View Milestone & Obligation Metadata  
        $("#viewMetadataDetailForOwner").dialog({
            autoOpen: false,
            closeText: "",
            width: "50%",
            title: "Detail",
            modal: true,
            dialogClass: "popup_width100",
            buttons: [
            {
                text: "Mark As Completed",
                "id": "btnMarkComplete",
                click: function () {
                    MarkAsCompleted();
                    $(this).dialog("close");
                }
            },
            {
                text: "Close",
                click: function () {
                    $(this).dialog("close");
                }
            }
            ]
        });

        //Amendment ViewMetatda
        $("#viewAmendmentMetadataDetail").dialog({
            autoOpen: false,
            closeText: "",
            width: "50%",
            title: "Detail",
            dialogClass: "popup_width100",
            modal: true,
            buttons: {
                "Close": function () {
                    $(this).dialog("close");
                }
            },
        });

        $("#dvCorrespondenceDetails").dialog({
            autoOpen: false,
            closeText: "",
            width: "50%",
            title: "Correspondence Details",
            dialogClass: "popup_width100",
            modal: true,
            buttons: {
                "Close": function () { $(this).dialog("close"); }
            }
        });

        $("#docSignatureDetail").dialog({
            autoOpen: false,
            closeText: "",
            width: "75%",
            minHeight: "80%",
            title: "Signature Details",
            dialogClass: "popup_width100",
            modal: true,
            buttons: {
                Cancel: function () {
                    $(this).dialog("close");
                }
            },
            close: function (event, ui) {

            }
        });
        $("#dvMilObgMetadata").dialog({
            autoOpen: false,
            closeText: "",
            width: "50%",
            title: "Detail",
            dialogClass: "popup_width100",
            modal: true,
            buttons: {
                "Close": function () {
                    $(this).dialog("close");
                }
            },
        });
        /*---*/
        var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
        var vAccFeat = $.grep(veContractFeatures, function (n, i) {
            return (n.RowKey == "1");
        });
        if (vAccFeat.length > 0) {
            var vConfig = vAccFeat[0].Configuration;
            vProviderDocSign = $(vConfig).find('Provider').text();
            if (vProviderDocSign == "Right Signature")
                RightSignatureFlag = true;
            else
                RightSignatureFlag = false;
        }

        DatepickerFormat = '';
        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
        { DatepickerFormat = 'mm/dd/yy'; }
        else { DatepickerFormat = localStorage.AppDateFormat.toLowerCase().slice(0, -2); }

        $(".openEditLabel").click(function () {
            $('#liSelectedLabel').html("");
            $('[id^=row_]').remove();
            $('#txtSearchLabel').val("");
            $('#selCategoryFilter').val("All");
            contactsJsonPayload = [];
            $("#txtSearchLabel").val('');
            arrLabelCollection = [];
            //bindLabelCategory('New');
            //SearchLabels('New');
        });
        $(".openAddLabel").click(function () {
            $('#liSelectedLabel').html("");
            $('[id^=row_]').remove();
            $('#txtSearchLabel').val("");
            $('#selCategoryFilter').val("All");
            contactsJsonPayload = [];
            $("#txtSearchLabel").val('');
            arrLabelCollection = [];
            //bindLabelCategory('Add');
            //SearchLabels('Add');
        });


        /*--Documents--*/
        var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
        var vDocLibFeat = $.grep(veContractFeatures, function (n, i) {
            return (n.RowKey == "20" && n.Status == "ON");
        });
        var details = "";
        //manoj
        if (typeof (localStorage.MaxRequestLength) != "undefined" && localStorage.MaxRequestLength != null && localStorage.MaxRequestLength != "") {
            $("#lblmaxsize").text("(Max " + Math.round(parseInt(localStorage.MaxRequestLength) / 1024) + "MB file.)");
        } else {
            $("#lblmaxsize").text("(Max 4MB file.)");
        }
        //manoj

        if (vDocLibFeat.length > 0) {

            if (!($(".borderTop_Right_none").hasClass("newdocview"))) {
                $(".borderTop_Right_none").addClass('newdocview');
            }

            details += '<div class="row-group"><div class="col11 no-pad" style="width:96% !important;"><div class="col7"><img src="/Content/Images/documents.png"> <a title="Displays Folder(s) and Document(s) associated with the Contract Record." href="javascript:void(0);" class="link-head" onclick="javascript: togglediv(\'ulDocument\', \'dvDocument\', \'imgdoc\');">Documents (<i id="lblDocumentsCount"></i>)</a><a href="javascript:void(0);" id="documentsort" class="add-btn close1 margin-left-5 obligation-act-new openmenuDocumentSort" style="display:none"><img src="/Content/Images/down_arrow_blk.png" alt="" title=""></a>'
                // +'<a href="javascript:void(0);" class="add-btn close1 Contribute" id="btnAddContractDocument"><img src="/Content/Images/add-icon.png">Add</a><label class="details-label Contribute" id="lblAddContractDocument">or Drag & Drop</label><a href="javascript:void(0);" class="add-btn close1 Contribute" id="btnaddnewsubfolder" style="display:none"><img src="/Content/Images/add-icon.png">Manage Folder</a>'
                + '<a href="javascript:void(0);" id="documentMultiActions" class="add-btn close1 margin-left-5 obligation-act-new openmenuDocumentMultiActions" style="display:none"><img src="/Content/Images/icon/drop.png" style="height:14px !important;"></a></div>'
                   + '<div class="col2" style="width: 12%;padding: 0;float:right;"><ul id="ulFolderDocumentView" class="tab"><li style="display:inline-block;"><a href="javascript:void(0);" id="listfolderdocumentview" class="tablinks group-wit-btn active" data-value="folder" onclick="DisplayDocument(\'folder\')"><img src="/Content/Images/folder-view.png" title="Displays Folder(s) and Documents(s) associated with Contract Record"></a></li><li style="display:inline-block; margin-left:-1px;"><a href="javascript:void(0);" id="listdocumentview" data-value="document" class="tablinks group-wit-btn" onclick="DisplayDocument(\'document\')"><img src="/Content/Images/list-view.png" title="Displays Documents(s) associated with Contract Record"></a></li></ul></div><div id="dvdocumentkeyword" style="width: 29%; float:left"><input style="width: 72%;float: left;padding: 5px 27px 5px 5px; border: 1px solid #ccc!important;" id="txtdocumentkeyword" name="keyword" placeholder="Document(s) Search" class="topSearchBox validelement" type="text"><img class="poPSear" style="cursor: pointer;position: relative;left: -62px;top: 1px;padding: 4px 0px 5px 5px;" onclick="javascript:SearchDocumentKeyword();" src="/Content/Images/search1.png"><a href="javascript:void(0)" class="linkPickerClear" style="float: left;display: block;margin-left: 4px!important;margin-top: 7px!important;" onclick="ClearDocumentKeyword();">Clear</a></div></div>'
                   + '<div class="col1 text-right no-pad" style="width:3% !important;"><a href="javascript:void(0);" class="close1" onclick="javascript: togglediv(\'ulDocument\', \'dvDocument\', \'imgdoc\');"><img id="imgdoc" src="/Content/Images/e-open.png"></a></div></div><h2 id="showAll" class="box-title" style="margin-left: 26px;float: none;line-height: 16px;margin-top: 5px;"></h2><div class="row-group"><div class="col12"><div id="holder" style="width:100%;"><div id="iddropfile" class="dropfiles" style="display:none;">Drop files here.</div><ul class="ul-data" id="ulDocumentLoading"></ul><ul class="ul-data" id="ulDocument"></ul><span id="uploaddocumentprocess" style="font-size:12px; display:none;"><img src="/Content/Images/loading.gif" /> Uploading...</span></div></div><div id="dvDocument" class="col12 pad-top"></div></div>';
            $("#dvtabDocumentView").html(details);
            $("#dvtabSummaryDocumentView").html('<div class="row-group"><div class="col10 no-pad"><img src="/Content/Images/documents.png"> <a title="Displays Primary and Pinned Document(s) associated with the Contract Record." href="javascript:void(0);" class="link-head" onclick="javascript: togglediv(\'ulPinDocument\', \'dvPinDocument\', \'imgPindoc\');">Primary and Pinned Document(s) (<i id="lblPinDocumentsCount"></i>)</a><a href="javascript:void(0);" id="pindocumentsort" class="add-btn close1 margin-left-5 obligation-act-new openmenuDocumentSort" style="display:none"><img src="/Content/Images/down_arrow_blk.png" alt="" title=""></a></div><div class="col2 text-right no-pad"><a href="javascript:void(0);" class="close1" onclick="javascript: togglediv(\'ulPinDocument\', \'dvPinDocument\', \'imgPindoc\');"><img id="imgPindoc" src="/Content/Images/e-open.png"></a></div></div><div class="row-group pad-top"><div class="col12"><div style="width:100%;"><div class="wmessage clearfix clpendingaction" style="display:none;margin-left:35%;margin-top:-26px;margin-bottom:39px;"><table id="tblDocumentMissing"></table></div><ul class="ul-data" id="ulPinDocumentLoading"></ul><ul class="ul-data" id="ulPinDocument"></ul></div></div><div id="dvPinDocument" class="col12 pad-top"></div></div>');
            $("#hdnnewdocumentfeature").text("Yes");
            $("#litabDocumentView").css("display", "");

            if (documentview == null || documentview == "" || documentview == 'folder') {
                $("#btnaddnewsubfolder").css("display", "");
            }
            $('#txtdocumentkeyword').keypress(function (e) {
                if (e.keyCode == 13) {
                    SearchDocumentKeyword();
                }
            });

            $(".openmenuDocumentSort").contextMenu({ menu: 'dropdownMenuDocumentSort', leftButton: true }, function (action, el, pos) { contextMenuDocumentSort(action, el.parent("a"), pos); });

        } else {
            if (!($(".borderTop_Right_none").hasClass("newdocview"))) {
                $(".borderTop_Right_none").removeClass('newdocview');
            }
            details += '<div class="row-group"><div class="col10 no-pad"><img src="/Content/Images/documents.png"> <a title="Displays Folder(s) and Document(s) associated with the Contract Record." href="javascript:void(0);" class="link-head" onclick="javascript: togglediv( \'ulDocument\', \'dvDocument\', \'imgdoc\');">Documents (<i id="lblDocumentsCount"></i>)</a>'
            //+ '<a href="javascript:void(0);" class="add-btn close1 Contribute" id="btnAddContractDocument"><img src="/Content/Images/add-icon.png">Add</a><label class="details-label Contribute" id="lblAddContractDocument">or Drag & Drop</label><a href="javascript:void(0);" class="add-btn close1 Contribute" id="btnaddnewsubfolder"><img src="/Content/Images/add-icon.png">Manage Folder</a>'
            + '<a href="javascript:void(0);" id="documentMultiActions" class="add-btn close1 margin-left-5 obligation-act-new openmenuDocumentMultiActions" style="display:none"><img src="/Content/Images/icon/drop.png" style="height:14px !important;"></a></div>'
            + '<div class="col2 text-right no-pad"><a href="javascript:void(0);" class="close1" onclick="javascript: togglediv(\'ulDocument\', \'dvDocument\', \'imgdoc\');"><img id="imgdoc" src="/Content/Images/e-open.png"></a></div></div><div class="warning-msg clearfix clpendingaction" style="display:none;"><img src="/Content/Images/icon/warning-icon.png" alt=""><table id="tblDocumentMissingNormal"></table><a href="javascript:void(0);" class="close1" onclick="GetContractPendingAction(true,\'Missing\')" title="View All"><img src="/Content/Images/view-all-new.png" style="cursor:pointer;">&nbsp;</a></div><h2 id="showAll" class="box-title" style="margin-left: 26px;float: none;line-height: 16px;margin-top: 5px;"></h2>'
            + '<div class="row-group"><div class="col12"><div id="holder" style="width:100%;"><div id="iddropfile" class="dropfiles" style="display:none;">Drop files here.</div><ul class="ul-data" id="ulDocumentLoading"></ul><ul class="ul-data" id="ulDocument"></ul><span id="uploaddocumentprocess" style="font-size:12px; display:none;"><img src="/Content/Images/loading.gif" /> Uploading...</span></div></div><div id="dvDocument" class="col12 pad-top"></div></div>';
            $("#dvtabSummaryDocumentView").html(details);
            $("#hdnnewdocumentfeature").text("No");
            $("#litabDocumentView").css("display", "none");
        }
        details = "";

        var totalfiles = "";
        holder.ondrop = function (e) {
            if (contractItem.Permission != 'View' && contractItem.Permission != '' && contractItem.Permission != null) {
                $("#loadingPage").fadeIn();
                this.className = '';
                e.preventDefault();
                var files = e.dataTransfer.files;
                var fileslength = files.length;
                for (var i = 0; i < fileslength; i++) {
                    droppedfiles.push(files[i]);
                }
                totalfiles = files;
                removedItems = [];
                //ReturnFolderSelection_New();
                //readfiles(files);
                //if (droppedfiles.length > 0) {
                //    $(".cldraganddrop").css('display', 'none');
                //    $('#btnBulkUploadSave').css('display', '');
                //    $('#btnBulkUploadCancel').css('display', '');
                //    $("#bulkuploaddoc").dialog("option", "title", "Bulk Document Upload");
                //    $("#bulkuploaddoc").dialog("open");
                //    $("#bulkuploaddoc").height("auto");
                //    applybulkdocumetdraganddrop();
                //}
                //else {
                //    document.getElementById("holder").style.border = "2px dashed white";
                //    $("#holder").css("min-height", "0px");
                //    $('#holder').css("opacity", "1");
                //    $('#holder').css("pointer-events", "auto");
                //    document.getElementById("iddropfile").style.display = "none";
                //}
                $("#loadingPage").fadeOut();

            }
        }
        ko.applyBindings(uploaders);



        /*--Amendments--*/
        var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
        var vDocLibFeat = $.grep(veContractFeatures, function (n, i) {
            return (n.RowKey == "20" && n.Status == "ON");
        });
        var details = "";
        //manoj
        if (typeof (localStorage.MaxRequestLength) != "undefined" && localStorage.MaxRequestLength != null && localStorage.MaxRequestLength != "") {
            $("#lblmaxsize").text("(Max " + Math.round(parseInt(localStorage.MaxRequestLength) / 1024) + "MB file.)");
        } else {
            $("#lblmaxsize").text("(Max 4MB file.)");
        }
        //manoj

        if (vDocLibFeat.length > 0) {
            //Tab width decrease
            if (!($(".borderTop_Right_none").hasClass("newdocview"))) {
                $(".borderTop_Right_none").addClass('newdocview');
            }
            //Tab width decrease
            details += '<div class="row-group"><div class="col11 no-pad" style="width:96% !important;"><div class="col7"><img src="/Content/Images/documents.png"> <a title="Displays Folder(s) and Document(s) associated with the Contract Record." href="javascript:void(0);" class="link-head" onclick="javascript: togglediv(\'ulDocument\', \'dvDocument\', \'imgdoc\');">Documents (<i id="lblDocumentsCount"></i>)</a><a href="javascript:void(0);" id="documentsort" class="add-btn close1 margin-left-5 obligation-act-new openmenuDocumentSort" style="display:none"><img src="/Content/Images/down_arrow_blk.png" alt="" title=""></a>'
                //+ '<a href="javascript:void(0);" class="add-btn close1 Contribute" id="btnAddContractDocument"><img src="/Content/Images/add-icon.png">Add</a><label class="details-label Contribute" id="lblAddContractDocument">or Drag & Drop</label><a href="javascript:void(0);" class="add-btn close1 Contribute" id="btnaddnewsubfolder" style="display:none"><img src="/Content/Images/add-icon.png">Manage Folder</a>'
                + '<a href="javascript:void(0);" id="documentMultiActions" class="add-btn close1 margin-left-5 obligation-act-new openmenuDocumentMultiActions" style="display:none"><img src="/Content/Images/icon/drop.png" style="height:14px !important;"></a></div>'
                   + '<div class="col2" style="width: 12%;padding: 0;float:right;"><ul id="ulFolderDocumentView" class="tab"><li style="display:inline-block;"><a href="javascript:void(0);" id="listfolderdocumentview" class="tablinks group-wit-btn active" data-value="folder" onclick="DisplayDocument(\'folder\')"><img src="/Content/Images/folder-view.png" title="Displays Folder(s) and Documents(s) associated with Contract Record"></a></li><li style="display:inline-block; margin-left:-1px;"><a href="javascript:void(0);" id="listdocumentview" data-value="document" class="tablinks group-wit-btn" onclick="DisplayDocument(\'document\')"><img src="/Content/Images/list-view.png" title="Displays Documents(s) associated with Contract Record"></a></li></ul></div><div id="dvdocumentkeyword" style="width: 29%; float:left"><input style="width: 72%;float: left;padding: 5px 27px 5px 5px; border: 1px solid #ccc!important;" id="txtdocumentkeyword" name="keyword" placeholder="Document(s) Search" class="topSearchBox validelement" type="text"><img class="poPSear" style="cursor: pointer;position: relative;left: -62px;top: 1px;padding: 4px 0px 5px 5px;" onclick="javascript:SearchDocumentKeyword();" src="/Content/Images/search1.png"><a href="javascript:void(0)" class="linkPickerClear" style="float: left;display: block;margin-left: 4px!important;margin-top: 7px!important;" onclick="ClearDocumentKeyword();">Clear</a></div></div>'
                   + '<div class="col1 text-right no-pad" style="width:3% !important;"><a href="javascript:void(0);" class="close1" onclick="javascript: togglediv(\'ulDocument\', \'dvDocument\', \'imgdoc\');"><img id="imgdoc" src="/Content/Images/e-open.png"></a></div></div><h2 id="showAll" class="box-title" style="margin-left: 26px;float: none;line-height: 16px;margin-top: 5px;"></h2><div class="row-group"><div class="col12"><div id="holder" style="width:100%;"><div id="iddropfile" class="dropfiles" style="display:none;">Drop files here.</div><ul class="ul-data" id="ulDocumentLoading"></ul><ul class="ul-data" id="ulDocument"></ul><span id="uploaddocumentprocess" style="font-size:12px; display:none;"><img src="/Content/Images/loading.gif" /> Uploading...</span></div></div><div id="dvDocument" class="col12 pad-top"></div></div>';
            $("#dvtabDocumentView").html(details);
            $("#dvtabSummaryDocumentView").html('<div class="row-group"><div class="col10 no-pad"><img src="/Content/Images/documents.png"> <a title="Displays Primary and Pinned Document(s) associated with the Contract Record." href="javascript:void(0);" class="link-head" onclick="javascript: togglediv(\'ulPinDocument\', \'dvPinDocument\', \'imgPindoc\');">Primary and Pinned Document(s) (<i id="lblPinDocumentsCount"></i>)</a><a href="javascript:void(0);" id="pindocumentsort" class="add-btn close1 margin-left-5 obligation-act-new openmenuDocumentSort" style="display:none"><img src="/Content/Images/down_arrow_blk.png" alt="" title=""></a></div><div class="col2 text-right no-pad"><a href="javascript:void(0);" class="close1" onclick="javascript: togglediv(\'ulPinDocument\', \'dvPinDocument\', \'imgPindoc\');"><img id="imgPindoc" src="/Content/Images/e-open.png"></a></div></div><div class="row-group pad-top"><div class="col12"><div style="width:100%;"><div class="wmessage clearfix clpendingaction" style="display:none;margin-left:35%;margin-top:-26px;margin-bottom:39px;"><table id="tblDocumentMissing"></table></div><ul class="ul-data" id="ulPinDocumentLoading"></ul><ul class="ul-data" id="ulPinDocument"></ul></div></div><div id="dvPinDocument" class="col12 pad-top"></div></div>');
            $("#hdnnewdocumentfeature").text("Yes");
            $("#litabDocumentView").css("display", "");

            $(".openmenuDocumentSort").contextMenu({ menu: 'dropdownMenuDocumentSort', leftButton: true }, function (action, el, pos) { contextMenuDocumentSort(action, el.parent("a"), pos); });

        } else {
            //Tab width increase
            if (!($(".borderTop_Right_none").hasClass("newdocview"))) {
                $(".borderTop_Right_none").removeClass('newdocview');
            }
            //Tab width increase
            details += '<div class="row-group"><div class="col10 no-pad"><img src="/Content/Images/documents.png"> <a title="Displays Folder(s) and Document(s) associated with the Contract Record." href="javascript:void(0);" class="link-head" onclick="javascript: togglediv( \'ulDocument\', \'dvDocument\', \'imgdoc\');">Documents (<i id="lblDocumentsCount"></i>)</a>'
               // + '<a href="javascript:void(0);" class="add-btn close1 Contribute" id="btnAddContractDocument"><img src="/Content/Images/add-icon.png">Add</a><label class="details-label Contribute" id="lblAddContractDocument">or Drag & Drop</label><a href="javascript:void(0);" class="add-btn close1 Contribute" id="btnaddnewsubfolder"><img src="/Content/Images/add-icon.png">Manage Folder</a>'
                + '<a href="javascript:void(0);" id="documentMultiActions" class="add-btn close1 margin-left-5 obligation-act-new openmenuDocumentMultiActions" style="display:none"><img src="/Content/Images/icon/drop.png" style="height:14px !important;"></a></div>'
            + '<div class="col2 text-right no-pad"><a href="javascript:void(0);" class="close1" onclick="javascript: togglediv(\'ulDocument\', \'dvDocument\', \'imgdoc\');"><img id="imgdoc" src="/Content/Images/e-open.png"></a></div></div><div class="warning-msg clearfix clpendingaction" style="display:none;"><img src="/Content/Images/icon/warning-icon.png" alt=""><table id="tblDocumentMissingNormal"></table><a href="javascript:void(0);" class="close1" onclick="GetContractPendingAction(true,\'Missing\')" title="View All"><img src="/Content/Images/view-all-new.png" style="cursor:pointer;">&nbsp;</a></div><h2 id="showAll" class="box-title" style="margin-left: 26px;float: none;line-height: 16px;margin-top: 5px;"></h2>'
            + '<div class="row-group"><div class="col12"><div id="holder" style="width:100%;"><div id="iddropfile" class="dropfiles" style="display:none;">Drop files here.</div><ul class="ul-data" id="ulDocumentLoading"></ul><ul class="ul-data" id="ulDocument"></ul><span id="uploaddocumentprocess" style="font-size:12px; display:none;"><img src="/Content/Images/loading.gif" /> Uploading...</span></div></div><div id="dvDocument" class="col12 pad-top"></div></div>';
            $("#dvtabSummaryDocumentView").html(details);
            $("#hdnnewdocumentfeature").text("No");
            $("#litabDocumentView").css("display", "none");
        }
        details = "";

        var totalfiles = "";
        holder.ondrop = function (e) {
            if (contractItem.Permission != 'View' && contractItem.Permission != '' && contractItem.Permission != null) {
                $("#loadingPage").fadeIn();
                this.className = '';
                e.preventDefault();
                var files = e.dataTransfer.files;
                var fileslength = files.length;
                for (var i = 0; i < fileslength; i++) {
                    droppedfiles.push(files[i]);
                }
                totalfiles = files;
                removedItems = [];

                $("#loadingPage").fadeOut();

            }
        }
        ko.applyBindings(uploaders);




        /*--Correspondence--*/
        var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
        vAccFeat = $.grep(veContractFeatures, function (n, i) {
            return (n.RowKey == "13" && n.Status == "ON");
        });
        if (vAccFeat.length > 0) {
            $(".FL_Correspondence").css('display', '');
            BindCorrespondence(vContractID);
        }


        /*--Milestone & Obligations--*/
        var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
        var vAccFeat = $.grep(veContractFeatures, function (n, i) {
            return (n.RowKey == "2" && n.Status == "ON");
        });
        if (vAccFeat.length > 0) {
            if ($("#ddlHistoryFilter option[value='Obligation']").length <= 0)

                $('ddlHistoryFilter').append('<option val="Obligation">Obligation</option>');

        } else {

            if ($("#ddlHistoryFilter option[value='Obligation']").length > 0)
                $("#ddlHistoryFilter option[value='Obligation']").remove();

        }
        $("#dtMilestoneDateInline").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: DatepickerFormat
        });
        $('#dtMilestoneDate').datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: DatepickerFormat,
            /* fix buggy IE focus functionality */
            fixFocusIE: false,
            onSelect: function (dateText, inst) {
                this.fixFocusIE = true;
            },
        }).click(function () { $(this).focus() });


        $("#dtMilestoneCompletedDate").datepicker({
            changeMonth: true,
            changeYear: true, dateFormat: DatepickerFormat
        });

        allowNumericsNewMonthly();


    }
});

var uploaders = {
    uploaderCollection: ko.observableArray([]),
    uploadAll: function () {
        for (var i = 0; i < this.uploaderCollection().length; i++) {
            var cful = this.uploaderCollection()[i];
            cful.uploadMetaData();
        }
    }
}

function Loading_View_trigger() {
    if (contractItem != null) {

        var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
        var vCoverSheet = $.grep(veContractFeatures, function (n, i) {
            return (n.RowKey == "23" && n.Status == "ON");
        });
        if (vCoverSheet.length > 0) {
            if (typeof (contractItem.SummeryBlobURL) != "undefined" && contractItem.SummeryBlobURL != null && contractItem.SummeryBlobURL != "") {
                getcontractsummerytemplate(contractItem.ContractType, contractItem.SummeryBlobURL, true);
            } else {
                getcontractsummerytemplate(contractItem.ContractType, contractItem.SummeryBlobURL, false);
            }
        } else {
            $("#iStandardIcon").empty();
            $("#hdnsummeryTempDocu").text("No");
            $("#lisummarydocument").css("display", "none");
        }

        var vContractStatus = ["Ready for Signature", "Awaiting Signatures", "Signed", "Active", "Up for Renewal", "Renewed", "Extended", "On Hold", "Replaced", "Expired", "Cancelled", "Terminated", "Archived", "About to Expire"];

        vAccFeat = $.grep(veContractFeatures, function (n, i) {
            return (n.RowKey == "2" && n.Status == "ON");
        });
        if (vAccFeat.length > 0) {// && $.inArray(contractItem.Status, vContractStatus) > -1) {
            $(".FL_Obligations").css('display', '');
            GetObligationCatalogs();
        }
        else {
            $(".FL_Obligations").css('display', 'none');
        }

        //BindContractRoles(contractItem);
        BindUserRoles();
        BindRelatedContracts(vContractID);
        //GetContractPendingAction(false);

        BindO365LibrarySettings();
        //BindPeople();
        //BindMilestoneTypes();
        //BindObligationTypes();
        //BindAmendmentTypes(vContractID);
        //BindCurrencies();
        //BindUnitTypes();
        BindTermTypes();
        //BindContractRelationships();
        var vTab = getParameterByName("Tab");
        if (vTab != 'Activity')
            GetContractActivities(vContractID);
        if (vTab != 'TermsClause')
            //TermsAndClauseDocument(vContractID);
            if (vTab != 'Notes')
                BindNotes(vContractID);

        //DefaultGlobalsettingsDP();
        //BindCounterpartyType();
        //BindContractTermTypeddl();
        //BindRelatedContractsFilters();
        //BindBusinessAreaPicker11();
    } else {
        BindUserRoles();
        BindRelatedContracts(vContractID);
        //GetContractPendingAction(false);

        BindO365LibrarySettings();
        //BindPeople();
        //BindMilestoneTypes();
        //BindObligationTypes();
        //BindAmendmentTypes(vContractID);
        //BindCurrencies();
        //BindUnitTypes();
        BindTermTypes();
        //BindContractRelationships();
        var vTab = getParameterByName("Tab");
        if (vTab != 'Activity')
            GetContractActivities(vContractID);
        if (vTab != 'TermsClause')
            //TermsAndClauseDocument(vContractID);
            if (vTab != 'Notes')
                BindNotes(vContractID);

        //DefaultGlobalsettingsDP();
        //BindCounterpartyType();
        //BindContractTermTypeddl();
        //BindRelatedContractsFilters();
        //BindBusinessAreaPicker11();
        //if (IsPipeline == true)
        //    BindGeneralSettings();
        setTimeout('Loading_View_trigger1()', 5000);
    }


}

function BindUserRoles() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/userrolesetting',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': vAPIKey },
        cache: false,
        success: function (data) {
            if (data != null && data.length != 0) {
                SettingUserRole = data[0].UserRoleSetting;
                vDefaultAmendment = data[0].DefaultAmendment;
            }
        },
        error: function (data) {
        }
    });
}

function BindRelatedContracts(contractid) {
    if (contractid == null || contractid == "") {
        contractid = vContractID;
    }
    $("#ulRelatedContracts").empty();
    $('#liSelected').empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/Contracts/relatedcontracts?contractid=' + contractid,
        type: 'GET',
        dataType: 'json',
        headers: {
            'eContracts-ApiKey': vAPIKey, 'UserID': localStorage.UserID
        },
        cache: false,
        success: function (contactsJsonPayload) {
            $("#ulRelatedContracts").empty();
            var count = 0;
            $("#hdnRelatedContracts").text("");
            $(contactsJsonPayload).each(function (i, item) {
                OlRelatedContracts = contactsJsonPayload;
                var myUrl = '/Contracts/ContractDetails?ContractID=' + encodeURI(item.RelatedContractID);
                $("#hdnRelatedContracts").append(item.RelatedContractID + ';');
                if (item.Permission == "InRecycleBin") {
                    if ($("#ulRelatedContracts").html() == '')
                        $("#ulRelatedContracts").append('<li><span style="color: #ff4d4d" title="This Contract Record is no longer available.">' + item.RelatedContractTitle + '</span> (' + item.RelatedRelationshipType + ')<li>');
                    else
                        $("#ulRelatedContracts").append('<li><span style="color: #ff4d4d" title="This Contract Record is no longer available.">' + item.RelatedContractTitle + '</span> (' + item.RelatedRelationshipType + ')<li>');
                    $('#liSelected').append('<span style="font-size:11px;" id=' + item.RelatedContractID + '>' + item.RelatedContractTitle + ' (' + item.RelatedRelationshipType + ')</span>');
                }
                else {
                    if (item.Permission != "" && item.Permission != "No Access") {
                        //if ($("#ulRelatedContracts").html() == '')
                        $("#ulRelatedContracts").append('<li><a href="javascript:getRelatedContractDetails(\'' + item.RelatedContractID + '\');">' + item.RelatedContractTitle + '</a> (' + item.RelatedRelationshipType + ')</li>');
                        //else
                        //    $("#ulRelatedContracts").append('; <a href="' + myUrl + '">' + item.RelatedContractTitle + '</a> (' + item.RelatedRelationshipType + ')');

                        $('#liSelected').append('<span style="font-size:11px;" id=' + item.RelatedContractID + '>' + item.RelatedContractTitle + ' (' + item.RelatedRelationshipType + ') <img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveRelationship(this);" style="float:right" /></span>');
                    } else {
                        if ($("#ulRelatedContracts").html() == '')
                            $("#ulRelatedContracts").append('<li><span class="disabled_item_link" title="This Contract Record is no longer available.">' + item.RelatedContractTitle + '</span> (' + item.RelatedRelationshipType + ')<li>');
                        else
                            $("#ulRelatedContracts").append('<li><span class="disabled_item_link" title="This Contract Record is no longer available.">' + item.RelatedContractTitle + '</span> (' + item.RelatedRelationshipType + ')<li>');

                        $('#liSelected').append('<span style="font-size:11px;" id=' + item.RelatedContractID + '>' + item.RelatedContractTitle + ' (' + item.RelatedRelationshipType + ')</span>');
                    }
                }
            });
        },
        error: function (contactsJsonPayload) {
            $("#hdnRelatedContracts").text("");
            $("#ulRelatedContracts").empty();
            if (!$("#lblRelatedContractsCount").text().trim()) {
                $("#ulRelatedContracts").append('No items found.');
            }
            else {
                $("#ulRelatedContracts").append('No items found.');
            }

        }

    });
}

function BindO365LibrarySettings() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/documents/getdocumentsettings',
        type: 'GET',
        dataType: 'json',
        cache: false,
        headers: { 'eContracts-ApiKey': vAPIKey },
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

function BindTermTypes(objvalue) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/contracttermtypesenabled',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: {
            'eContracts-ApiKey': vAPIKey
        },
        cache: false,
        async: false,
        success: function (data) {

            $(data).each(function (iType, itemType) {
                TermTypeDisplayName[itemType.ContractTermName] = itemType.ContractTermDisplayName;
            });

        },
        error: function (data) {
        }
    });
}

function GetContractActivities(contractid, loadaction) {
    $("#dvContractWorkflows").empty();
    workflowurltoshowDOCUMENT = "";
    workflowurltoshowCONTRACT = "";
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/contracts/' + contractid + '/activity',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': vAPIKey },
        cache: false,
        success: function (data) {
            ArrayofAmendmentWorkflows = [];
            ArrayofDocumentWorkflows = [];
            $("#dvContractWorkflows").empty();
            var datalenght = data.length;
            $("#lblActivityCount").text(data.length);
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                var RowKey = item.RowKey;
                var WorkflowTitle = item.WorkflowTitle;
                var Participants = item.Participants;
                var Status = item.Status;
                var ActivityType = item.ActivityType;
                var CreatedBy = item.CreatedBy;

                var imgCorn = '<img src="/Content/Images/act-approval.png">';
                var imgCent = '<img src="/Content/Images/act-contract-box.png" class="img-responsive">';
                var vWorkflowURL = '<a class="link-head" href="javascript:void(0);">' + WorkflowTitle + '</a>';
                var vWorkflowIconURL = '';
                if (ActivityType == "Contract Approval") {
                    imgCorn = '<img src="/Content/Images/act-approval.png">';
                    imgCent = '<img src="/Content/Images/act-contract-box.png" class="img-responsive">';
                    //vWorkflowURL = '<a class="link-head" href="/Activity/TaskDetails?TaskID=&WorkflowID=' + RowKey + '" target="_blank" style="display:inline !important;">' + WorkflowTitle + '</a>';
                    //vWorkflowIconURL = '<a class="add-btn close1" href="/Activity/TaskDetails?TaskID=&WorkflowID=' + RowKey + '" target="_blank"><img src="/Content/Images/view-all.png" style="padding-left:5px !important;"></a>';

                    vWorkflowURL = '<a class="link-head" href="javascript:void(0);" style="display:inline !important;" onclick="ShowWorkflowDetail(\'' + ActivityType + '\',\'' + RowKey + '\')">' + WorkflowTitle + '</a>';
                    vWorkflowIconURL = '<a class="add-btn close1" href="javascript:void(0);"></a>';

                    //if (Status == "In Progress" || Status == "Stopped") {
                    //workflowurltoshowCONTRACT = '/Activity/TaskDetails?TaskID=&WorkflowID=' + RowKey;
                    //}
                }
                else if (ActivityType == "Renewal Approval") {
                    imgCorn = '<img src="/Content/Images/act-approval.png">';
                    imgCent = '<img src="/Content/Images/act-contract-box.png" class="img-responsive">';
                    //vWorkflowURL = '<a class="link-head" href="/Activity/TaskDetails?TaskID=&WorkflowID=' + RowKey + '" target="_blank" style="display:inline !important;">' + WorkflowTitle + '</a>';
                    //vWorkflowIconURL = '<a class="add-btn close1" href="/Activity/TaskDetails?TaskID=&WorkflowID=' + RowKey + '" target="_blank"><img src="/Content/Images/view-all.png" style="padding-left:5px !important;"></a>';

                    vWorkflowURL = '<a class="link-head" href="javascript:void(0);" style="display:inline !important;" onclick="ShowWorkflowDetail(\'' + ActivityType + '\',\'' + RowKey + '\')">' + WorkflowTitle + '</a>';
                    vWorkflowIconURL = '<a class="add-btn close1" href="javascript:void(0);"></a>';
                }
                else if (ActivityType == "Amendment Approval") {
                    var person = { id: RowKey, AmendmentID: item.AmendmentId };
                    if (Status == "In Progress")
                        ArrayofAmendmentWorkflows.push(person);
                    imgCorn = '<img src="/Content/Images/act-approval.png">';
                    imgCent = '<img src="/Content/Images/act-contract-box.png" class="img-responsive">';
                    //vWorkflowURL = '<a class="link-head" href="/Activity/TaskDetails?TaskID=&WorkflowID=' + RowKey + '" target="_blank" style="display:inline !important;">' + WorkflowTitle + '</a>';
                    //vWorkflowIconURL = '<a class="add-btn close1" href="/Activity/TaskDetails?TaskID=&WorkflowID=' + RowKey + '" target="_blank"><img src="/Content/Images/view-all.png" style="padding-left:5px !important;"></a>';

                    vWorkflowURL = '<a class="link-head" href="javascript:void(0);" style="display:inline !important;" onclick="ShowWorkflowDetail(\'' + ActivityType + '\',\'' + RowKey + '\')">' + WorkflowTitle + '</a>';
                    vWorkflowIconURL = '<a class="add-btn close1" href="javascript:void(0);"></a>';

                }
                else if (ActivityType == "Document Review") {
                    var person = { id: RowKey, DocumentID: item.DocumentId };
                    if (Status == "In Progress")
                        ArrayofDocumentWorkflows.push(person);
                    imgCorn = '<img src="/Content/Images/act-reviewl.png">';
                    imgCent = '<img src="/Content/Images/act-doc.png" class="img-responsive">';
                    //vWorkflowURL = '<a class="link-head" href="/Activity/TaskDetails?TaskID=&WorkflowID=' + RowKey + '" target="_blank" style="display:inline !important;">' + WorkflowTitle + '</a>';
                    //vWorkflowIconURL = '<a class="add-btn close1" href="/Activity/TaskDetails?TaskID=&WorkflowID=' + RowKey + '" target="_blank"><img src="/Content/Images/view-all.png" style="padding-left:5px !important;"></a>';

                    vWorkflowURL = '<a class="link-head" href="javascript:void(0);" style="display:inline !important;" onclick="ShowWorkflowDetail(\'' + ActivityType + '\',\'' + RowKey + '\')">' + WorkflowTitle + '</a>';
                    vWorkflowIconURL = '<a class="add-btn close1" href="javascript:void(0);"></a>';

                    //if (Status == "In Progress" || Status == "Stopped") {
                    //workflowurltoshowDOCUMENT = '/Activity/TaskDetails?TaskID=&WorkflowID=' + RowKey;
                    //}
                }
                else if (ActivityType == "Contract Share") {
                    imgCorn = '<img src="/Content/Images/act-share-as-link.png">';
                    imgCent = '<img src="/Content/Images/act-contract-box.png" class="img-responsive">';
                    vWorkflowURL = '<a class="link-head" href="javascript:void(0);" onclick="ShowWorkflowDetail(\'' + ActivityType + '\',\'' + RowKey + '\')" style="display:inline !important;">' + WorkflowTitle.replace("External Review", "External Share") + '</a>';
                    vWorkflowIconURL = '<p id="ShareID" style="display:none;">' + RowKey + '</p><p id="ShareType" style="display:none;">Contract</p>';
                    //if (Status == "In Progress" && $("#hdnPermission").val() != 'View')
                    //    vWorkflowIconURL += ' <img src="/Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuShare Contribute"/>';
                }
                else if (ActivityType == "Document Share") {
                    imgCorn = '<img src="/Content/Images/act-share-as-link.png">';
                    imgCent = '<img src="/Content/Images/act-doc.png" class="img-responsive">';
                    vWorkflowURL = '<a class="link-head" href="javascript:void(0);" onclick="ShowWorkflowDetail(\'' + ActivityType + '\',\'' + RowKey + '\')" style="display:inline !important;">' + WorkflowTitle.replace("External Review", "External Share") + '</a>';
                    vWorkflowIconURL = '<p id="ShareID" style="display:none;">' + RowKey + '</p><p id="ShareType" style="display:none;">Document</p>';
                    //if (Status == "In Progress" && $("#hdnPermission").val() != 'View')
                    //    vWorkflowIconURL += ' <img src="/Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuShare Contribute"/>';
                }
                else if (ActivityType == "Document Sign") {
                    imgCorn = '<img src="/Content/Images/act-signature.png">';
                    imgCent = '<img src="/Content/Images/act-doc.png" class="img-responsive">';
                    vWorkflowURL = '<a class="link-head" href="javascript:void(0);" onclick="ShowDocSignatureDetail(\'' + RowKey + '\')" style="display:inline !important;">' + WorkflowTitle + '</a>';
                    //var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                    //var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                    //    return (n.RowKey == "1" && n.Status == "ON");
                    //});
                    //if (vAccFeat.length > 0 && Status == "In Progress" && CreatedBy == localStorage.UserName) {
                    //    var vConfig = vAccFeat[0].Configuration;
                    //    var vProvider = $(vConfig).find('Provider').text();
                    //    if (vProvider == "Right Signature")
                    //        vWorkflowURL += '';
                    //    else if (vProvider == "Echo Sign")
                    //        vWorkflowURL += '';
                    //    else if (vProvider == "Docu Sign")
                    //        vWorkflowURL += ' <a href="javascript:void(0);" onclick="StopDocumentSignature(\'' + RowKey + '\')" title="Stop Signature Process"><img src="/Content/Images/stop.png"></a>';
                    //}

                }

                var article = '<div class="col12 info-box-activity "><div class="row-group">';
                article += '<div class="col10 no-pad ">';
                article += '<div class="row-group">';
                article += '<div class="col1 no-pad activity-type-box m2">';
                article += imgCorn;
                article += '</div>';
                article += '<div class="col1 no-pad pad-top text-left activity-file-box m2">';
                article += imgCent;
                article += '</div>';
                article += '<div class="col10 activity-title-box m8">';

                article += vWorkflowURL;
                article += vWorkflowIconURL;

                article += '<div class="col12 no-pad pad-top">';
                if (ActivityType == "Document Share") {
                    if (item.ReadyToShare == "Yes" && item.CreatedBy == localStorage.UserName) {
                        article += '<p class="sub-text-head">Participants : <span class="sub-text">' + Participants + '</span></p>';
                        article += '<p class="sub-text-head">New version of this document is available.<a href="javascript:void(0);" onclick="ReplaceDocumentShareNew(\'' + RowKey + '\')" style="color:#44a6d;text-decoration: underline;font-weight: bold;">Share</a> new version link with users.</p>';
                    }
                    else {
                        article += '<p class="sub-text-head">Participants : <span class="sub-text">' + Participants + '</span></p>';
                    }
                }
                else {
                    article += '<p class="sub-text-head">Participants : <span class="sub-text">' + Participants + '</span></p>';
                }
                article += '</div>';
                article += '</div>';
                article += '</div>';
                article += '</div>';
                article += '<div class="col2 no-pad text-right pad-top ">';
                article += '<a class="close1" href="javascript:void(0);" onclick="ShowWorkflowDetail(\'' + ActivityType + '\',\'' + RowKey + '\')"><img id="Img_' + RowKey + '" src="/Content/Images/e-open.png" title="Expand"></a>';
                article += '<div class="col12 text-right act-doc-status">';

                if (Status == "Complete" || Status == "Completed") {
                    article += '<a class="label label-grn"><span class="m-off"> Completed </span> <span class="m-on"><img src="/Content/Images/wit-completed-icon.png"></span></a>';
                }
                else if (Status == "In Progress") {
                    article += '<a class="label label-org"><span class="m-off">' + Status + '</span> <span class="m-on"><img src="/Content/Images/wit-in-progress-icon.png"></span></a>';
                }
                else if (Status == "Cancelled" || Status == "Declined") {
                    article += '<a class="label label-red"><span class="m-off">' + Status + '</span> <span class="m-on"><img src="/Content/Images/wit-cancel-icon.png"></span></a>';
                }
                else if (Status == "Stopped") {
                    article += '<a class="label label-red"><span class="m-off">' + Status + '</span> <span class="m-on"><img src="/Content/Images/wit-stopl-icon.png"></span></a>';
                }
                else {
                    article += '<a class="label label-org"><span class="m-off">' + Status + '</span></a>';
                }
                article += '</div>';
                article += '</div>';
                article += '<div class="col12 m12 activity-title-box m8">';
                article += '<div id="Det_' + RowKey + '" class="row-group activity-details-body" style="display:none">';

                article += '</div>';
                article += '</div>';
                article += '</div></div>';
                $("#dvContractWorkflows").append(article);
            }
            //manoj
            if (typeof (loadaction) != "undefined" && loadaction != null && loadaction != "") {
                $("#loadingPage").fadeOut();
            }
            //manoj
            $(".openmenuShare").contextMenu({ menu: 'dropdownMenuShare', leftButton: true }, function (action, el, pos) { contextMenuShare(action, el.parent("div"), pos); });
            if (contractItem.Status == "Cancelled" || contractItem.Status == "Expired" || contractItem.Status == "Archived") {
                $(".Contribute").css('display', 'none');
                $('.status').css('display', '');
                $("#dvContractWorkflows a.link-head").css({ "pointer-events": "none", "cursor": "default" });
                $(".add-btn").css('display', 'none');
                ApplyPermissionToMenu($("#hdnPermission").val());
            }
            $('.disablelink').removeClass('disablelink');

        },
        error: function (data) {

            if (typeof (loadaction) != "undefined" && loadaction != null && loadaction != "") {
                $("#loadingPage").fadeOut();
            }

            $("#lblActivityCount").text("0");
            $('.disablelink').removeClass('disablelink');
        }
    });
}

function TermsAndClauseDocument(objContractIDvalue) {
    $("#ddlTemplateAndClauses").html('<option value="-1">No Document Available</option>');
    $("#docversion").css("display", "none");
    $("#ulTermsClauseBody").html("<li Style='margin-top: 10px;'>Select available document.<li>");
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/documents?contractid=' + objContractIDvalue,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: {
            'eContracts-ApiKey': vAPIKey
        },
        success: function (filescount) {
            if (filescount == null) {
                $("#ddlTemplateAndClauses").html('<option value="-1">No Document Available</option>');
                $("#docversion").css("display", "none");
                $("#ulTermsClauseBody").html("<li Style='margin-top: 10px;'>Select available document.<li>");
            } else {
                $("#ddlTemplateAndClauses").html('<option value="0">--Select--</option>');
                $(filescount).each(function (i, item) {
                    if (item != null) {
                        //if (item.CreationMode == "Template" && item.IsFolder != "True") {
                        //    $("#ddlTemplateAndClauses").append('<option value="' + item.RowKey + '">' + item.DocumentName + '</option>');
                        //}
                        if (item.IsFolder != "True") {
                            $("#ddlTemplateAndClauses").append('<option value="' + item.RowKey + '">' + item.DocumentName + '</option>');
                        }
                    }
                });
            }
        },
        error:
            function (filescount) {
                $("#ddlTemplateAndClauses").html('<option value="-1">No Document Available</option>');
                $("#docversion").css("display", "none");
                $("#ulTermsClauseBody").html("<li Style='margin-top: 10px;'>Select available document.<li>");
            }
    });
}

function BindNotes(contractid) {
    if (contractid == null || contractid == "") {
        contractid = vContractID;
    }
    $("#ulNotesBody").empty();
    $("#dvNotes").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/contracts/' + contractid + '/notes',
        type: 'GET',
        dataType: 'json',
        headers: {
            'eContracts-ApiKey': vAPIKey
        },
        cache: false,
        success: function (data) {
            var count = 0;
            var datalenght = 0;
            if (data != null)
                datalenght = data.length;
            if (datalenght > 0) {
                var article = '';
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];
                    count++;
                    var vTimedesc = '';
                    if (item.Created != null && item.Created != "") {
                        var vTime = moment(new Date(item.Created)).format('MMMM Do YYYY');
                        var vTimeExact = moment(new Date(item.Created)).format('h:mm A');
                        vTimedesc = ' on ' + vTime + ' at ' + vTimeExact;
                    }

                    if (count <= 10)
                        article += '<li>';
                    else
                        article += '<li class="ShowMoreNotes" style="display:none;">';


                    article += '<span style="display: block;clear: both;" class="color_dark width100">' + item.Note + '</span>';
                    article += '<span class="color_lightgrey" style="float: left; width: 99%; margin: 10px 0px;" >Posted by ' + item.CreatedBy + vTimedesc;
                    if (item.CreatedBy == localStorage.UserName)
                        article += '<span style="float: right; width: 4%;">';
                    //article +='<img src="/Content/Images/edit-quick.png" class="margin-left-5" onclick="GetNoteDetail(\'' + item.RowKey + '\')" />';
                    //article +='<img src="/Content/Images/close-quick.png" class="margin-left-5" onclick="DeleteNote(\'' + item.RowKey + '\')" />';
                    article += '</span></span>';
                    article += '<span><small class="color_lightgrey">&nbsp;</small></span>';
                    article += '</li>';

                }

                $("#ulNotesBody").html(article);
            }
            else {
                $("#ulNotesBody").append('<li><b class="color_lightgrey">No items found.</b></li>');
            }

            if (count > 10) {
                var more = count - 10;
                $("#dvNotes").html('<a id="ShowMoreNotes" href="javascript:void(0);" class="pad-all close1" onclick="ShowMoreNotes()">' + more + ' More Notes </a>' +
                                      '<a id="ShowLessNotes" href="javascript:void(0);" class="pad-all close1" onclick="ShowLessNotes()" style="display:none;">Show less</a>');
            }

            $("#lblNotesCount").text(count);

            if (!$("#lblNotesCount").text().trim()) {
                $("#ulNotesBody").append('<li>No items found.</li>');
            }
        },
        error: function (request) {
            $("#lblNotesCount").text('0');
            $("#ulNotesBody").append('No items found.');
        }
    });
}

function Loading_View_trigger1() {
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vCoverSheet = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "23" && n.Status == "ON");
    });
    if (vCoverSheet.length > 0) {
        if (typeof (contractItem.SummeryBlobURL) != "undefined" && contractItem.SummeryBlobURL != null && contractItem.SummeryBlobURL != "") {
            getcontractsummerytemplate(contractItem.ContractType, contractItem.SummeryBlobURL, true);
        } else {
            getcontractsummerytemplate(contractItem.ContractType, contractItem.SummeryBlobURL, false);
        }
    } else {
        $("#iStandardIcon").empty();
        $("#hdnsummeryTempDocu").text("No");
        $("#lisummarydocument").css("display", "none");
    }

    var vContractStatus = ["Ready for Signature", "Awaiting Signatures", "Signed", "Active", "Up for Renewal", "Renewed", "Extended", "On Hold", "Replaced", "Expired", "Cancelled", "Terminated", "Archived", "About to Expire"];
    vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "2" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {// && $.inArray(contractItem.Status, vContractStatus) > -1) {
        $(".FL_Obligations").css('display', '');
        GetObligationCatalogs();
    }
    else {
        $(".FL_Obligations").css('display', 'none');
    }
    //BindContractRoles(contractItem);
}

function GetObligationCatalogs() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/obligations/obligationcatalogs',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': vAPIKey },
        success: function (dataUser) {


            listAllObligationCatalogs = dataUser;
            BindObligationsNew(vContractID);

        },
        error:
            function (dataUser) {
                listAllObligationCatalogs = "";
                BindObligationsNew(vContractID);
            }
    });
}

function BindObligationsNew(contractid, item1) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/obligations/obligationsnew/deleteempty?strDelete=' + "Catalog",
        type: 'DELETE',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': vAPIKey, username: localStorage.UserName, contractId: vContractID },
        "Content-Type": "application/json",
        cache: false,
        success: function (data) {
            if (contractid == null || contractid == "") { contractid = vContractID; }
            $("#ObligationNewDetailsTableBody").empty();
            $("#dvObligationAlertNew").empty();
            $("#dvObligationAlertNew").css('display', 'none');
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/obligations/obligationsNew?contractid=' + contractid,
                type: 'GET',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': vAPIKey },
                cache: false,
                success: function (contactsJsonPayload) {
                    listAllObligations = "";
                    listAllObligations = contactsJsonPayload;
                    $('#obligationgroup').removeClass('active');
                    $('#obligationungroup').addClass('active');
                    $("#ObligationNewDetailsTable").css('display', '');
                    $("#ObligationNewDetailsTableGroup").css('display', 'none');
                    $("#obligationNewActionsdiv").css('display', '');
                    var count = 0;
                    $("#NoObligationNewDetails").css('display', 'none');
                    var htmlContent = "";
                    $(contactsJsonPayload).each(function (i, item) {
                        count++;
                        var url = "";

                        var vDueDate = '';
                        if (item.DueDate != null) {


                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                            { vDueDate = item.DueDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                            else {
                                if (localStorage.AppDateFormat == 'DD/MM/YYYY') { vDueDate = item.DueDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1'); }
                                else if (localStorage.AppDateFormat == 'MM/DD/YYYY') { vDueDate = item.DueDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                            }
                        }
                        else {
                            vDueDate = "-";
                        }
                        url = '<a title="' + item.ObligationTitle + '"  href="javascript:void(0)" class="linkText" onclick="ViewObligationDetail(\'' + item.RowKey + '\')">' + item.ObligationTitle + '</a>';



                        htmlContent += "<tr>";
                        htmlContent += "<td><p id='ObligationID' style='display:none;'>" + item.RowKey + "</p>";
                        htmlContent += "<span id='ObligationTitle' style='display:none;'>" + item.ObligationTitle + "</span>";
                        htmlContent += "<span id='ObligationText' style='display:none;'>" + item.ObligationText + "</span>";
                        htmlContent += "<span id='ObligationRecurrence' style='display:none;'>" + item.Recurrences + "</span>";
                        htmlContent += "<span id='ObligationStatus' style='display:none;'>" + item.ObligationStatus + "</span>";
                        htmlContent += "<i class='obligation_Products_Items'>" + url + "</i></td>";
                        htmlContent += "<td ><span  id='ObligationType" + item.RowKey + "'>" + item.ObligationType + "</span></td>";

                        htmlContent += "<td  ><lable id='ObligationDue" + item.RowKey + "'>" + vDueDate + "</lable></td>";

                        if (listAllObligationCatalogs != null && listAllObligationCatalogs != "") {
                            var obligproducts = "";
                            var ID = item.RowKey;
                            obligproducts = $.grep(listAllObligationCatalogs, function (p) { return p.ObligationID == ID; }).map(function (p) { return p });

                            if (obligproducts != null && obligproducts != "" && obligproducts.length > 0) {
                                htmlContent += "<td><lable>" + obligproducts.length + "</lable></td>";
                            }
                            else {
                                htmlContent += "<td><lable>-</lable></td>";
                            }
                        }
                        else {
                            htmlContent += "<td><lable>-</lable></td>";
                        }


                        if (item.PerformedBy == "Self") {

                            if ($("#lblCompanyProfile").text() != null && $("#lblCompanyProfile").text() != "") {
                                htmlContent += "<td><lable id='PerformrdBy" + item.RowKey + "'>" + $("#lblCompanyProfile").text() + "</lable></td>";
                            }
                            else {
                                htmlContent += "<td><lable id='PerformrdBy" + item.RowKey + "'>" + "-" + "</lable></td>";
                            }

                        }
                        else {
                            if ($("#lblCounterparty").text() != null && $("#lblCounterparty").text() != "") {
                                htmlContent += "<td><lable id='PerformrdBy" + item.RowKey + "'>" + $("#lblCounterparty").text() + "</lable></td>";

                            }
                            else {
                                htmlContent += "<td><lable id='PerformrdBy" + item.RowKey + "'>" + "-" + "</lable></td>";

                            }


                        }


                        htmlContent += "<td><a href='javascript:void(0);' class='wit-btn obli_status_chang' style='cursor: auto;'>" + item.ObligationStatus + "</a></td>";



                        htmlContent += "</tr>";

                    });
                    $("#ObligationNewDetailsTableBody").html(htmlContent);



                    $("#lblObligationNewCount").text(count);


                    $(".openmenuObligationStatusSettings").contextMenu({
                        menu: 'dropdownMenuObligationStatusSettings', leftButton: true
                    }, function (action, el, pos) {
                        contextMenuObligationStatusSettings(action, el.parent("td").parent("tr"), pos);
                    });

                    $("#loadingPage").fadeOut();
                },
                error: function (request) {
                    listAllObligations = "";
                    $("#NoObligationNewDetails").css('display', '');
                    $("#obligationNewActionsdiv").css('display', 'none');
                    $("#loadingPage").fadeOut();
                    $("#lblObligationNewCount").text('0');
                    $("#ulObligationNew").append('No items found.');
                }

            });
        }
    });

}

function BindContractDetails(contractid, ObjBind) {
    articleDocumentMileStone = '';
    contrcttypeselection = [];
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/Contracts?contractid=' + contractid,
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': vAPIKey },
        processData: false,
        success: function (item) {
            //manoj
            var allowtoshow = false;
            if (item.IsDraft != "Yes") {
                allowtoshow = true;
            } else if (localStorage.UserName == item.CreatedBy) {
                allowtoshow = true;
            }
            if (!allowtoshow) {
                //$("#dvContractNotAvail").dialog("open");
                //$("#loadingPage").fadeOut();
            } else {
                //manoj
                vContractTile = item.ContractTitle;
                contractItem = item;

                BindObligationsNew(contractItem.RowKey, contractItem)
                if (contractItem != null) {
                    BindContractTermDetail(contractItem);
                    if (oGeneralSettings != "") {
                        if (oGeneralSettings.DisplayMissingInformation == "Yes") {
                            $("#tblDocumentMissing").css("display", "");
                            $("#tblDocuments").css("display", "");
                            $("#tblTermsMissing").css("display", "");
                            $("#tblMilestoneMissing").css("display", "");
                            $("#tblMilestones").css("display", "");
                            $("#tblMetadataMissing").css("display", "");
                            $("#tblRequired").css("display", "");
                            $("#tblPeopleMissing").css("display", "");
                            $("#tblPeoples").css("display", "");
                            $("#tblActivity").css("display", "");
                            $("#tblDescriptionMissing").css("display", "");
                        }
                        else {
                            $("#tblDocumentMissing").css("display", "none");
                            $("#tblDocuments").css("display", "none");
                            $("#tblTermsMissing").css("display", "none");
                            $("#tblMilestoneMissing").css("display", "none");
                            $("#tblMilestones").css("display", "none");
                            $("#tblMetadataMissing").css("display", "none");
                            $("#tblRequired").css("display", "none");
                            $("#tblPeopleMissing").css("display", "none");
                            $("#tblPeoples").css("display", "none");
                            $("#tblActivity").css("display", "none");
                            $("#tblDescriptionMissing").css("display", "none");
                            $(".clpendingaction").css("display", "none");
                        }
                    }

                    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                    var vDocLibFeat = $.grep(veContractFeatures, function (n, i) {
                        return (n.RowKey == "20" && n.Status == "ON");
                    });

                    if (typeof (ObjBind) != "undefined" && ObjBind != null && ObjBind != "") {
                        refreshdocuemnt();
                    } else {
                        BindDocument(vContractID);
                    }

                    //manoj
                    if (vDocLibFeat.length > 0) {
                        CreateDocumentListPinView(vContractID);
                    }
                    if (contractItem.IsActive == "" || contractItem.IsActive == "Yes") {
                        $("#general-notification").html("");
                        $("#general-notification").css("visibility", "hidden");
                        $("#btnaddnewsubfolder").css('pointer-events', 'auto');
                        //$("#btnAddContractDocument").css('pointer-events', 'auto');
                        $("#holder").css('pointer-events', 'auto');
                        $(".restricamnd").css('pointer-events', 'auto');
                        //var innervalue = document.getElementById("topAction1").textContent;
                        //if (innervalue == "Add Amendment" || innervalue == "Add Document") {
                        //    $("#topAction1").css('pointer-events', 'auto');
                        //}
                    } else {
                        var Displaymsg = "Contract is created succesfully.";
                        if (typeof (contractItem.RelatedRequestID) != "undefined" && contractItem.RelatedRequestID != null && contractItem.RelatedRequestID != "") {
                            Displaymsg += " Request|Folder(s)|Document(s) creation is in progress";
                        } else {
                            Displaymsg += " Folder(s)|Document(s) creation is in progress";
                        }
                        $("#general-notification").html(Displaymsg);
                        $("#general-notification").css("visibility", "visible");
                        $("#btnaddnewsubfolder").css('pointer-events', 'none');
                        //$("#btnAddContractDocument").css('pointer-events', 'none');
                        $("#holder").css('pointer-events', 'none');
                        $(".restricamnd").css('pointer-events', 'none');
                        //var innervalue = document.getElementById("topAction1").textContent;
                        //if (innervalue == "Add Amendment" || innervalue == "Add Document") {
                        //    $("#topAction1").css('pointer-events', 'none');
                        //}
                        clearTimeout(cleartimevalue);
                        cleartimevalue = setTimeout('checkcontractisactive()', 20000);
                    }
                }
                var vContractStatus = ["Ready for Signature", "Awaiting Signatures", "Signed", "Active", "Up for Renewal", "Renewed", "Extended", "On Hold", "Replaced", "Expired", "Cancelled", "Terminated", "Archived", "About to Expire"];
                if ($.inArray(item.Status, vContractStatus) > -1) {
                    $(".AlertEnabled").removeClass("disabled_slider");
                    IsPipeline = false;
                    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                    vAccFeat = $.grep(veContractFeatures, function (n, i) {
                        return (n.RowKey == "2" && n.Status == "ON");
                    });
                    if (vAccFeat.length > 0) {
                        $(".FL_Obligations").css('display', '');

                    }
                    else {
                        $(".FL_Obligations").css('display', 'none');
                    }
                    $("#MilestoneEnable").show();
                }
                else {
                    IsPipeline = true;
                    //BindGeneralSettings();
                    $(".AlertEnabled").removeClass("disabled_slider");
                }

                $("#txtContractTitle").attr('disabled', 'disabled');
                $("#ddlDPContractTypes").attr('disabled', 'disabled');
                $("#ddlDPTransactionType").attr('disabled', 'disabled');
                $("#ddlDPContractClass").attr('disabled', 'disabled');

                if (item.InRecycleBin == "Yes") {
                    $("#hdnPermission").val('View');
                    $("#liContractstatus").hide()
                    $("#dvRecyclebinMessage").css('display', '');
                    $("#topActionMore").removeClass('openmenuContractSettings');
                    $("#topActionMore").addClass('openmenuContractSettingsRecycleBin');
                }
                else {
                    $("#topActionMore").removeClass('openmenuContractSettingsRecycleBin');
                    $("#topActionMore").addClass('openmenuContractSettings');
                    $("#hdnPermission").val(item.Permission);
                }
                $(".openmenuContractSettings").contextMenu({ menu: 'dropdownMenuContractSettings', leftButton: true }, function (action, el, pos) { contextMenuContractSettings(action, el.parent("tr"), pos); });
                $(".openmenuContractSettingsRecycleBin").contextMenu({ menu: 'dropdownMenuContractSettingsRecycleBin', leftButton: true }, function (action, el, pos) { contextMenuContractSettingsRecycleBin(action, el.parent("tr"), pos); });

                if ((item.ContractManagers + ";" + item.CreatedBy + ";" + item.Approvers + ";" + item.Reviewers + ";" + item.Signees + ";" + item.RenewalConfirmParticipants).indexOf(localStorage.UserName) < 0) {
                    //SetBADashboard(item.BusinessAreaPath, item.BusinessArea);
                }
                //BindDocument(contractid);
                //BindContractRoles(contractItem); 
                thisContractAreaNameC = item.ContractArea;
                thisBusinessAreaNameC = item.BusinessArea;
                thisBusinessAreaPath = item.BusinessAreaPath;
                GetUserList();
                //BindBusinessAreaPicker11();
                //*Harshitha contract System milestone
                BindSystemMilestones(contractItem);
                $("#spancloseout").html(item.CloseOut);
                $("#hdnContractID").text(item.RowKey);
                $("#hdnContractValue").text(item.ContractValue);
                $("#hdnContractCurrency").text(item.ContractCurrency);
                $("#hdnContractPricingType").text(item.ContractPricingType);
                $("#hdnTransactionType").text(item.TransactionType);
                $("#hdnPaymentType").text(item.PaymentType);
                $("#hdnBillingFrequency").text(item.BillingFrequency);
                $("#hdnOldEndDate").text(item.EndDate);
                $("#hdnTermEndDate").text(item.TermEndDate);
                $("#hdnBaseContractValue").text(item.BaseContractValue);
                $("#hdnBaseContractCurrency").text(item.BaseContractValueCurrency);
                $("#hdnFinalizedDocumentsUrl").text(item.FinalizedDocumentsUrl);
                $("#hdnDraftDocumentsUrl").text(item.DraftDocumentsUrl);
                $("#hdnContractDocumentsUrl").text(item.ContractDocumentsUrl);
                $("#hdnContractDocumentsUrlFixed").text(item.ContractDocumentsUrl);
                $("#lblContractArea").text(item.ContractArea);
                $("#lblBusinessArea").text(item.BusinessArea);
                $("#lblBusinessAreaPath").text(item.BusinessAreaPath);
                $("#lblContractAreaAdmins").text(item.ContractAreaAdministrators);
                $("#lblApprovalWorkflow").text(item.ApprovalWorkflow);
                $("#lblBusinessAreaOwners").text(item.BusinessAreaOwners);
                $("#lblCounterparty").text(item.Counterparty);
                //Added For Obligation New
                $("#lblCompanyProfile").text(item.CompanyProfile);
                //Added End
                $("#lblContractType").text(item.ContractType);
                GetContractTypeDetails(item.ContractType);
                getcontracttypemetadata(item.ContractType);
                //BindRelatedContractsFilters();
                if (item.StartDate != null) {
                    $("#hdnStartDate").text(item.StartDate);
                }
                $("#lblContractTitle").text(item.ContractTitle);
                $("#lblContractTitleHeading").html(item.ContractTitle.replace("  ", "&nbsp;&nbsp;"));
                $("#lblRelatedPopup_ContractTitle").text("Select Relationship for " + item.ContractTitle)
                $(".clsContractTitle").prop('title', "Select Relationship for" + " : " + item.ContractTitle);//Bug id:eO37463
                if (item.Description == "") {
                    $("#lblContractDescription").text("");
                    $("#lblContractDescription").addClass('cntdetails-NA');
                }
                else {
                    $("#lblContractDescription").text(item.Description);
                    $("#lblContractDescription").removeClass('cntdetails-NA');
                }
                $("#summCNumber").text(item.ContractNumber);
                $("#summCBusArea").text(item.BusinessAreaPath);
                var formatcreatedDate = '';
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                { formatcreatedDate = moment(new Date(item.Created)).format('MM/DD/YYYY'); }
                else { formatcreatedDate = moment(new Date(item.Created)).format(localStorage.AppDateFormat); }
                $("#summCreated").text(formatcreatedDate);
                //if (vActiveUsers.indexOf(item.CreatedBy.trim()) < 0 && vActiveUsers.length > 0)
                //    $("#summCreatedBy").html('<a href="javascript:void(0);" onclick="ViewUserProfile(\'' + escape(item.CreatedBy.trim()) + '\')" class="Link_UserProfile disabled_item_link" title="This user is no longer available.">' + item.CreatedBy.trim() + '</a>');
                //else {
                if (item.CreatedBy.trim() == "Imported")
                    //$("#summCreatedBy").html('<a href="javascript:void(0);" onclick="ViewUserProfile(\'' + escape(item.CreatedBy.trim()) + '\')" class="Link_UserProfile disabled_item_link" title="This user is no longer available.">' + item.CreatedBy.trim() + '</a>');
                    $("#summCreatedBy").html('<a href="javascript:void(0);" class="Link_UserProfile disabled_item_link" style="cursor: auto;" title="This user is no longer available.">' + item.CreatedBy.trim() + '</a>');
                else
                    //$("#summCreatedBy").html('<a href="javascript:void(0);" onclick="ViewUserProfile(\'' + escape(item.CreatedBy.trim()) + '\')" class="Link_UserProfile">' + item.CreatedBy.trim() + '</a>');
                    $("#summCreatedBy").html('<a href="javascript:void(0);" class="Link_UserProfile" style="cursor: auto;">' + item.CreatedBy.trim() + '</a>');
                //}

                $("#summContractType").text(item.ContractType);

                if (item.CompanyProfile == null || item.CompanyProfile == "" || item.CompanyProfile == "--Select--") {
                    $("#summCompyLegalEntity").text("Not Available");
                }
                else {
                    $("#summCompyLegalEntity").text(item.CompanyProfile);
                }

                var usersarr = [];
                if (item.Counterparty == null || item.Counterparty == "") {
                    $("#summCounterparty").text("Not Available");
                }
                else {
                    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                    var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                        return (n.RowKey == "6" && n.Status == "ON");
                    });
                    var vreadonly = "";
                    var vbrowse = "";
                    if (vAccFeat.length > 0) {
                        usersarr = item.Counterparty.split(";");
                        var reslength = usersarr.length;
                        var vUsers = '';
                        for (var i = 0; i < reslength; i++) {
                            if (vUsers == '') {
                                vUsers = '<a href="javascript:void(0);" style="cursor: auto;">' + usersarr[i].trim() + '</a>';
                            }
                            else {
                                vUsers += '; <a href="javascript:void(0);" style="cursor: auto;">' + usersarr[i].trim() + '</a>';
                            }
                        }
                        $("#summCounterparty").html(vUsers);
                    } else {
                        $("#summCounterparty").text(item.Counterparty);
                    }
                }

                var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                    return (n.RowKey == "11" && n.Status == "ON");
                });
                if (vAccFeat.length > 0) {
                    try {
                        if (item.ProjectManager == null || item.ProjectManager == "") {
                            $("#spProjectManager").html("Not Available");
                            $("#spProjectManagerView").html("Not Available");
                            $("#liProjectManager").html("Not Available");
                        } else {
                            var vUsers = '';
                            var userDisable = '';
                            var usertitle = '';
                            projMgrs = item.ProjectManager;
                            if (projMgrs.indexOf(';') >= 0) {
                                $.each(item.ProjectManager.split(";"), function (a, itemname) {
                                    userDisable = '';
                                    usertitle = '';
                                    if (vActiveUsers.indexOf(itemname.trim()) < 0 && vActiveUsers.length > 0) {
                                        userDisable = ' disabled_item_link';
                                        usertitle = 'title="This user is no longer available."';
                                    }
                                    if (vUsers == '') {
                                        //vUsers = '<a href="javascript:void(0);" onclick="ViewUserProfile(\'' + escape(itemname) + '\')" class="Link_UserProfile' + userDisable + '" ' + usertitle + '>' + itemname + '</a>';
                                        vUsers = '<a href="javascript:void(0);" style="cursor: auto;" class="Link_UserProfile' + userDisable + '" ' + usertitle + '>' + itemname + '</a>';
                                    } else {
                                        //vUsers += '; <a href="javascript:void(0);" onclick="ViewUserProfile(\'' + escape(itemname) + '\')" class="Link_UserProfile' + userDisable + '" ' + usertitle + '>' + itemname + '</a>';
                                        vUsers += '; <a href="javascript:void(0);" style="cursor: auto;" class="Link_UserProfile' + userDisable + '" ' + usertitle + '>' + itemname + '</a>';
                                    }
                                });
                            } else {
                                if (vActiveUsers.indexOf(item.ProjectManager.trim()) < 0 && vActiveUsers.length > 0) {
                                    userDisable = ' disabled_item_link';
                                    usertitle = 'title="This User no longer available"';
                                }
                                //vUsers = '<a href="javascript:void(0);" onclick="ViewUserProfile(\'' + escape(item.ProjectManager) + '\')" class="Link_UserProfile' + userDisable + '" ' + usertitle + '>' + item.ProjectManager + '</a>';
                                vUsers = '<a href="javascript:void(0);" style="cursor: auto;" class="Link_UserProfile' + userDisable + '" ' + usertitle + '>' + item.ProjectManager + '</a>';
                            }

                            $("#spProjectManager").html(vUsers);
                            $("#spProjectManagerView").html(vUsers);
                            $("#liProjectManager").html(vUsers);
                        }

                        //Related Projects
                        if (item.ProjectTask == null || item.ProjectTask == "") {
                            $("#tblRelatedProjects").html('No items found.');

                        } else {
                            BindProjects(item.ProjectTask);
                        }
                    } catch (e) {
                        $("#loadingPage").fadeOut();
                    }
                }
                //BindContractPeopleMetadata(item);
                //BindContractRolesMetadata();

                if (item.RelatedRequestID == null) {
                    $("#FL_Requestor").css('display', 'none');
                    $("#trRelatedRequest").css('display', 'none');
                } else if (item.RelatedRequestID == "") {
                    $("#FL_Requestor").css('display', 'none');
                    $("#trRelatedRequest").css('display', 'none');
                    $("#spRequestor").html("Not Available");
                    $("#spRequestorr").html("Not Available");
                } else {
                    $("#FL_Requestor").css('display', '');
                    $("#trRelatedRequest").css('display', '');
                    BindRequestDetails(item.RelatedRequestID)
                }
                lstSelectedLabels = item.Labels;
                tmpSelectedLabels = item.Labels;
                BindContractLabels();
                $("#txtBusinessArea").val(item.BusinessArea);
                //getcontractareasettings(item.ContractArea);
                connamechecking = item.ContractArea;

                if (item.Renewable == "Yes") {
                    settingRenewable = true;
                } else {
                    settingRenewable = false;
                }

                if (item.Extendable != null && item.Extendable == "Yes") {
                    $("#hdnIsExtendable").text("Yes");
                    $("#hdnIsExtendableContract").text("Yes");
                    $("#chkDPExtendable").prop('checked', true);
                    $("#chkDPExtensionApproval").removeAttr("disabled");
                } else {
                    $("#hdnIsExtendable").text("No");
                }
                if (item.NeedApprovalForRenewal != null && item.NeedApprovalForRenewal == "Yes") {
                    $("#hdnRenewApprovalRequired").text("Yes");
                } else {
                    $("#hdnRenewApprovalRequired").text("No");
                }


                if (item.IsStandard == "Yes") {
                    // $("#iStandardCont").css('display', '');
                    //$("#iNonStandardCont").css('display', 'none');

                    $("#liContractStandard").css('display', 'none');
                    $("#liContractNonStandard").css('display', '');
                } else {
                    // $("#iStandardCont").css('display', 'none');
                    //$("#iNonStandardCont").css('display', '');
                    $("#liContractStandard").css('display', '');
                    $("#liContractNonStandard").css('display', 'none');
                }

                //ApplyPermissionToMenu($("#hdnPermission").val());
                if (contractItem.IsDraft == "Yes") {
                    $(".draft").css('display', 'none');
                }
                //Default properties form values
                strSelectedContractType = item.ContractType;
                $("#ddlDPTransactionType").find('option[value="' + item.TransactionType + '"]').prop("selected", true);
                $("#ddlDPContractClass").find('option[value="' + item.ContractClass + '"]').prop("selected", true);
                if (item.NeedApprovalForRenewal != null && item.NeedApprovalForRenewal == "Yes") {
                    $("#chkDPRenewalApproval").prop('checked', true);
                }
                if (item.NeedApprovalForExtension != null && item.NeedApprovalForExtension == "Yes") {
                    $("#chkDPExtensionApproval").prop('checked', true);
                }
                if (item.IsFinalized == "Yes") {
                    $("#artAmendment").css('display', '');
                    $("#chkDPAmendmentApproval").removeAttr("disabled");
                    BindAmendments(contractid);
                } else {
                    $("#artAmendment").css('display', 'none');
                }
                if (item.TransactionType == "Legal/General Agreement") {
                    $("#artFinancials").css('display', 'none');
                }
                else {
                    $("#artFinancials").css('display', '');
                }

                GetContractValueSetting(item);


                if (item.EndDate != null) {
                    var FEndDate = "";
                    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                    { FEndDate = moment(new Date(item.EndDate)).utc().format('MM/DD/YYYY'); }
                    else { FEndDate = moment(new Date(item.EndDate)).utc().format(localStorage.AppDateFormat); }
                    $("#txtContractEndDateCurrent").val(FEndDate);
                } else {
                    $("#txtContractEndDateCurrent").val("Not Available");
                }

                if (item.ApprovalWorkflow != "In Progress") {
                    if (item.Permission != "View" && item.Permission != "") {
                        $("#addActivityApproval").css('display', '');
                    }
                }
                ContractTopActions();
                ApplyPermissionToMenu($("#hdnPermission").val());
                BindStatus();
                if (item.InRecycleBin == "Yes") {
                    $("#hdnPermission").val('View');
                    $("#liContractstatus").hide()
                    $("#dvRecyclebinMessage").css('display', '');
                }
                else {
                    $("#hdnPermission").val(item.Permission);
                }
                if (item.InRecycleBin == "Yes" && item.Permission == "Manage") {
                    $("#DeleteContract").show();
                    $("#DeleteContractRecycle").show();
                }
                $(".GlobalManage").css('display', 'none');
                if (item.IsDraft == "Yes") {
                    $("#dvDraftMessage").css('display', '');
                    $("#addActivityApproval").css('display', 'none');
                    $("#RelatedContractEdit").css('display', 'none');
                    $(".draft").css('display', 'none');
                    if (Stage == "") {
                        var loca = "/Contracts/EditContract?ContractID=" + vContractID + "&ContractType=" + encodeURIComponent($("#lblContractType").text());
                        $('#lnkDraftToUpdate').attr('href', loca);
                    } else {
                        var loca = "/Contracts/EditContract?ContractID=" + vContractID + "&ContractType=" + encodeURIComponent($("#lblContractType").text()) + "&Stage=" + Stage;
                        $('#lnkDraftToUpdate').attr('href', loca);
                    }
                }
                if (item.IsStandard == "Yes") {
                    $("#liContractStandard").css('display', 'none');
                    $("#liContractNonStandard").css('display', '');
                } else {
                    $("#liContractStandard").css('display', '');
                    $("#liContractNonStandard").css('display', 'none');
                }
                if (contractItem.IsDraft == "Yes") {
                    $(".draft").css('display', 'none');
                }

                //BindWorkflow(); 

                $("#loadingPage").fadeOut();
            }

        },
        error: function () {
            //$("#dvContractNotAvail").dialog("open");
            //$("#loadingPage").fadeOut();
        },
        complete: function () {
            BindSystemMilestoneTest(articleSystemMileStone, articleDocumentMileStone, articleMileStone, articleObligationMileStone);
        }

    });
}

function GetUserList() {
    var vUserList = '';
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/users',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        async: false,
        headers: {
            'eContracts-ApiKey': vAPIKey
        },
        success: function (dataUser) {
            allUsersList = dataUser;
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

function BindSystemMilestones(Contract) {

    articleSystemMileStone = '';
    delayedTermDates = "";
    var vContractStatus = ["Ready for Signature", "Awaiting Signatures", "Signed", "Active", "Up for Renewal", "Renewed", "Extended", "On Hold", "Replaced", "Expired", "Cancelled", "Terminated", "Archived", "About to Expire"];
    var vTermType = Contract.ContractTermType;
    var beforeDaysSort = [];
    beforeDaysSort = Object(beforeDaysSort)
    var afterDaysSort = [];
    afterDaysSort = Object(afterDaysSort)
    ReminderConditionCheck(beforeDaysSort, afterDaysSort, Contract);

    if (vTermType == "Fixed Term") {
        if (contractItem.StartDate != null || contractItem.EffectiveDate != null) {
            var dateValue = Contract.StartDate != null ? (Contract.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1')) : (Contract.EffectiveDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'));
            SystemMileStoneArticle("Start / Effective Date", dateValue, beforeDaysSort, afterDaysSort);
        }
        else {
            delayedTermDates += "<tr><td class='f_head'>Missing Start / Effective Date</td></tr>";
        }
        if (contractItem.NextEvaluationDate != null) {
            var dateValue = Contract.NextEvaluationDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
            SystemMileStoneArticle("Next Evaluation Date", dateValue, beforeDaysSort, afterDaysSort);
        }
        else {
            delayedTermDates += "<tr><td class='f_head'>Missing Next Evaluation Date</td></tr>";
        }
        if (contractItem.EndDate != null) {
            var dateValue = Contract.EndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
            SystemMileStoneArticle("End Date (Overall Contract Record)", dateValue, beforeDaysSort, afterDaysSort);
        }
        else {
            delayedTermDates += "<tr><td class='f_head'>Missing End Date</td></tr>";
        }
    }
    else if (vTermType == "Evergreen / Perpetual") {
        if (contractItem.StartDate != null || contractItem.EffectiveDate != null) {
            var dateValue = Contract.StartDate != null ? (Contract.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1')) : (Contract.EffectiveDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'));
            SystemMileStoneArticle("Start / Effective Date", dateValue, beforeDaysSort, afterDaysSort);
        }
        else {
            delayedTermDates += "<tr><td class='f_head'>Missing Start / Effective Date</td></tr>";
        }
        if (contractItem.NextEvaluationDate != null) {
            var dateValue = Contract.NextEvaluationDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
            SystemMileStoneArticle("Next Evaluation Date", dateValue, beforeDaysSort, afterDaysSort);
        }
        else {
            delayedTermDates += "<tr><td class='f_head'>Missing Next Evaluation Date</td></tr>";
        }
    }
    else if (vTermType == "Renewable") {
        if (contractItem.StartDate != null || contractItem.EffectiveDate != null) {
            var dateValue = Contract.StartDate != null ? (Contract.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1')) : (Contract.EffectiveDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'));
            SystemMileStoneArticle("Initial Term Start Date", dateValue, beforeDaysSort, afterDaysSort);
        }
        else {
            delayedTermDates += "<tr><td class='f_head'>Missing Initial Term Start Date</td></tr>";
        }
        if (contractItem.InitialTermEndDate != null) {
            var dateValue = Contract.InitialTermEndDate != null ? (Contract.InitialTermEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1')) : "";
            SystemMileStoneArticle("Initial Term End Date", dateValue, beforeDaysSort, afterDaysSort);
        }
        else {
            delayedTermDates += "<tr><td class='f_head'>Missing Initial Term End Date</td></tr>";
        }
        if (contractItem.EndDate != null) {
            var dateValue = Contract.EndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
            SystemMileStoneArticle("End Date (Overall Contract Record)", dateValue, beforeDaysSort, afterDaysSort);
        }

        if (contractItem.TermEndDate != null) {
            var dateValue = Contract.TermEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
            SystemMileStoneArticle("Current Term Ends", dateValue, beforeDaysSort, afterDaysSort);
        }
        else {
            delayedTermDates += "<tr><td class='f_head'>Missing Current Term End Date</td></tr>";
        }
        if (contractItem.EffectiveDate != null) {
            var dateValue = Contract.EffectiveDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
            SystemMileStoneArticle("Term Starts", dateValue, beforeDaysSort, afterDaysSort);
        }
        else {
            delayedTermDates += "<tr><td class='f_head'>Missing Current Term Start Date</td></tr>";
        }

    }
    else if (vTermType == "Executed / Performance") {
        if (contractItem.StartDate != null || contractItem.EffectiveDate != null) {
            var dateValue = Contract.StartDate != null ? (Contract.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1')) : (Contract.EffectiveDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'));
            SystemMileStoneArticle("Date of Execution / Performance", dateValue, beforeDaysSort, afterDaysSort);
        }
        else {
            delayedTermDates += "<tr><td class='f_head'>Missing Date of Execution / Performance</td></tr>";
        }
    }
    else {
        delayedTermDates += "<tr><td class='f_head'>The Timelines & Dates for contract is not available.</td></tr>";
    }
    BindSystemMilestoneTest(articleSystemMileStone, articleDocumentMileStone, articleMileStone, articleObligationMileStone);
}

function GetContractTypeDetails(contracttypename) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/contracttypes?contracttypename=' + encodeURIComponent(contracttypename),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': vAPIKey },
        cache: false,
        success: function (data) {
            if (IsApprovalSheetFeatureExits) {
                if (data.IsApprovalSheetConfigured == "Yes") {
                    IsApprovalSheetFeatureExits = true;
                    oRelatedApprovalSheets = data.RelatedApprovalSheetNames;
                    if (oRelatedApprovalSheets != "" && typeof (oRelatedApprovalSheets) != "undefined") {
                        //BindContractApprovalSheets();
                    }
                }
                else {
                    IsApprovalSheetFeatureExits = false;
                    oRelatedApprovalSheets = "";
                }
            }
            if (data.Renewable == "Yes") {
                settingRenewable = true;
            } else {
                settingRenewable = false;
            }
        }, error: function (data) {
            settingRenewable = false
        }
    });
}

function BindContractTermDetail(item) {
    var vTermType = item.ContractTermType;
    //Sridhar
    //BindContractTermTypeddl();
    var vTermTypeDisplay = TermTypeDisplayName[vTermType];
    //Sridhar
    var vContractTerm = '';
    var vContractTermEnd = '';
    var Endflag = false;
    var curstatus = item.Status;
    var vContractStatus = ["Ready for Signature", "Awaiting Signatures", "Signed", "Active", "Up for Renewal", "Renewed", "Extended", "On Hold", "Replaced", "Expired", "Cancelled", "Terminated", "Archived", "About to Expire"];

    if ($.inArray(curstatus, vContractStatus) > -1)
        Endflag = true;
    $("#spContractTerm").html('');
    $("#liAdminMenuRenewal").show();
    if (curstatus == "Expired") {
        var vExpiredDate = '';
        if (item.ExpiredDate != null)
            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                vExpiredDate = item.ExpiredDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
            }
            else {
                if (localStorage.AppDateFormat == 'DD/MM/YYYY') {
                    vExpiredDate = item.ExpiredDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1');
                }
                else if (localStorage.AppDateFormat == 'MM/DD/YYYY') {
                    vExpiredDate = item.ExpiredDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                }
            }
        vExpiredDate = vExpiredDate != '' ? vExpiredDate : "NA"; //moment(new Date(item.CancelledDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1')));

        vContractTerm += '<td>';
        vContractTerm += '<span class="con_m_head">Expired on: ' + vExpiredDate + ' </span>';
        vContractTerm += '</td>';

        vContractTerm += '<td align="right">';
        vContractTerm += '<a href="javascript:void(0);" onclick="viewDetailsTerm()" id="btnViewDetails" class="wit-btn" style="padding: 3px 7px;font-size: 12px;">View Details</a>';
        vContractTerm += '</td>';

        $("#tbodyManageTerm").html(vContractTerm);
    }
    else if (curstatus == "Cancelled") {
        var vCancelledDate = '';
        if (item.CancelledDate != null)
            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                vCancelledDate = item.CancelledDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
            }
            else {
                if (localStorage.AppDateFormat == 'DD/MM/YYYY') {
                    vCancelledDate = item.CancelledDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1');
                }
                else if (localStorage.AppDateFormat == 'MM/DD/YYYY') {
                    vCancelledDate = item.CancelledDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                }
            }

        vCancelledDate = vCancelledDate != '' ? vCancelledDate : "NA"; //moment(new Date(item.CancelledDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1')));

        vContractTerm += '<td>';
        vContractTerm += '<span class="con_m_head">Cancelled on: ' + vCancelledDate + ' </span>';
        vContractTerm += '</td>';

        vContractTerm += '<td align="right">';
        vContractTerm += '<a href="javascript:void(0);" onclick="viewDetailsTerm()" id="btnViewDetails" class="wit-btn" style="padding: 3px 7px;font-size: 12px;">View Details</a>';
        vContractTerm += '</td>';

        $("#tbodyManageTerm").html(vContractTerm);

    }
    else {
        if (vTermType == "Fixed Term") {
            var vFromDate = moment(new Date());
            var vToDate = null;
            var FstartDate = null;
            var FendDate = null;
            vContractTerm += '<td>';
            if (item.StartDate != null) {
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                    FstartDate = item.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                }
                else {
                    if (localStorage.AppDateFormat == 'DD/MM/YYYY') {
                        FstartDate = item.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1');
                    }
                    else if (localStorage.AppDateFormat == 'MM/DD/YYYY') {
                        FstartDate = item.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                    }
                }


            }
            if (item.EndDate != null) {
                vToDate = moment(new Date(item.EndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1')));
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                    FendDate = item.EndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                }
                else {
                    if (localStorage.AppDateFormat == 'DD/MM/YYYY') {
                        FendDate = item.EndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1');
                    }
                    else if (localStorage.AppDateFormat == 'MM/DD/YYYY') {
                        FendDate = item.EndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                    }
                }
            }


            FstartDate = FstartDate != null ? FstartDate : "NA";
            FendDate = FendDate != null ? FendDate : "NA";

            vContractTerm += '<span class="con_m_head">Start Date   -   End Date (' + vTermTypeDisplay + ')</span><br>';
            vContractTerm += '<span class="con_s_head">' + FstartDate + '   -  ' + FendDate;


            vContractTerm += '</span>';
            vContractTerm += '</td>';

            //Evaluation Date
            if (item.NextEvaluationDate != null) {
                var nextEvalDate = moment(new Date(item.NextEvaluationDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1')));
                var vDiffEval = DiffBetDate(vFromDate, nextEvalDate);
                if (vDiffEval != '') {
                    var vNextEval = '';
                    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                        vNextEval = item.NextEvaluationDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                    }
                    else {
                        if (localStorage.AppDateFormat == 'DD/MM/YYYY') {
                            vNextEval = item.NextEvaluationDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1');
                        }
                        else if (localStorage.AppDateFormat == 'MM/DD/YYYY') {
                            vNextEval = item.NextEvaluationDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                        }
                    }

                    vContractTerm += '<td>';
                    vContractTerm += '<span class="con_m_head">Next Evaluation: </span><br>';
                    vContractTerm += '<span class="con_s_head">' + vNextEval + ' (' + vDiffEval + ' left)</span>';
                    vContractTerm += '</td>';
                }
                else {
                    vContractTerm += '<td>';
                    vContractTerm += '<span class="con_m_head"></span><br>';
                    vContractTerm += '<span class="con_s_head"></span>';
                    vContractTerm += '</td>';
                }
            }
            else {
                vContractTerm += '<td>';
                vContractTerm += '<span class="con_m_head"></span><br>';
                vContractTerm += '<span class="con_s_head"></span>';
                vContractTerm += '</td>';
            }

            vContractTerm += '<td align="right">';
            vContractTerm += '<a href="javascript:void(0);" onclick="viewDetailsTerm()" id="btnViewDetails" class="wit-btn" style="padding: 3px 7px;font-size: 12px;">View Details</a>';
            vContractTerm += '<a href="javascript:void(0);" onclick="OpenManageTerm()" id="btnManageTerms" class="wit-btn managesettings Manage " style="padding: 3px 7px;font-size: 12px;">Manage Term</a>';
            vContractTerm += '</td>';

        }
        else if (vTermType == "Evergreen / Perpetual") {
            var vFromDate = moment(new Date());
            vContractTerm += '<td>';
            if (item.StartDate != null) {
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                    FstartDate = item.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                }
                else {
                    if (localStorage.AppDateFormat == 'DD/MM/YYYY') {
                        FstartDate = item.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1');
                    }
                    else if (localStorage.AppDateFormat == 'MM/DD/YYYY') {
                        FstartDate = item.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                    }
                }

            }

            FstartDate = FstartDate != null ? FstartDate : "NA";
            vContractTerm += '<span class="con_m_head">Start Date (' + vTermTypeDisplay + ')</span><br>';
            vContractTerm += '<span class="con_s_head">' + FstartDate;
            vContractTerm += '</span>';
            vContractTerm += '</td>';
            //Evaluation Date
            if (item.NextEvaluationDate != null) {
                var nextEvalDate = moment(new Date(item.NextEvaluationDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1')));
                var vDiffEval = DiffBetDate(vFromDate, nextEvalDate);
                if (vDiffEval != '') {
                    var vNextEval = '';
                    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                        vNextEval = item.NextEvaluationDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                    }
                    else {
                        if (localStorage.AppDateFormat == 'DD/MM/YYYY') {
                            vNextEval = item.NextEvaluationDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1');
                        }
                        else if (localStorage.AppDateFormat == 'MM/DD/YYYY') {
                            vNextEval = item.NextEvaluationDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                        }
                    }

                    vContractTerm += '<td>';
                    vContractTerm += '<span class="con_m_head">Next Evaluation: </span><br>';
                    vContractTerm += '<span class="con_s_head">' + vNextEval + ' (' + vDiffEval + ' left)</span>';
                    vContractTerm += '</td>';
                }
                else {
                    vContractTerm += '<td>';
                    vContractTerm += '<span class="con_m_head"></span><br>';
                    vContractTerm += '<span class="con_s_head"></span>';
                    vContractTerm += '</td>';
                }
            }
            else {
                vContractTerm += '<td>';
                vContractTerm += '<span class="con_m_head"></span><br>';
                vContractTerm += '<span class="con_s_head"></span>';
                vContractTerm += '</td>';
            }

            //Buttons
            vContractTerm += '<td align="right">';
            vContractTerm += '<a href="javascript:void(0);" onclick="viewDetailsTerm()" id="btnViewDetails" class="wit-btn" style="padding: 3px 7px;font-size: 12px;">View Details</a>';
            vContractTerm += '<a href="javascript:void(0);" onclick="OpenManageTerm()" id="btnManageTerms" class="wit-btn managesettings Manage" style="padding: 3px 7px;font-size: 12px;">Manage Term</a>';
            vContractTerm += '</td>';

        }
        else if (vTermType == "Executed / Performance") {
            vContractTerm += '<td>';
            if (item.StartDate != null) {
                var FormatstartDate = null;
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                    FormatstartDate = item.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                }
                else {
                    if (localStorage.AppDateFormat == 'DD/MM/YYYY') {
                        FormatstartDate = item.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1');
                    }
                    else if (localStorage.AppDateFormat == 'MM/DD/YYYY') {
                        FormatstartDate = item.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                    }
                }
            }

            FormatstartDate = FormatstartDate != null ? FormatstartDate : "NA";
            vContractTerm += '<span class="con_m_head">Date of Execution / Performance</span><br>';
            vContractTerm += '<span class="con_s_head">' + FormatstartDate;
            vContractTerm += '</span>';
            vContractTerm += '</td>';

            vContractTerm += '<td>';
            vContractTerm += '<span class="con_m_head"></span><br>';
            vContractTerm += '<span class="con_s_head"></span>';
            vContractTerm += '</td>';

            //Buttons
            vContractTerm += '<td align="right">';
            vContractTerm += '<a href="javascript:void(0);" onclick="viewDetailsTerm()" id="btnViewDetails" class="wit-btn" style="padding: 3px 7px;font-size: 12px;">View Details</a>';
            vContractTerm += '<a href="javascript:void(0);" onclick="OpenManageTerm()" id="btnManageTerms" class="wit-btn managesettings Manage" style="padding: 3px 7px;font-size: 12px;">Manage Term</a>';
            vContractTerm += '</td>';


        }
        else if (vTermType == "Renewable") {
            vContractTerm += '<td>';
            var vFromDate = moment(new Date());
            var vToDate = null;
            if (item.EffectiveDate != null) {
                var FormatstartDate = null;
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                    FormatstartDate = item.EffectiveDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                }
                else {
                    if (localStorage.AppDateFormat == 'DD/MM/YYYY') {
                        FormatstartDate = item.EffectiveDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1');
                    }
                    else if (localStorage.AppDateFormat == 'MM/DD/YYYY') {
                        FormatstartDate = item.EffectiveDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                    }
                }
            }

            if (item.TermEndDate != null) {

                var FTermEndDate = null;
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                    FTermEndDate = item.TermEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                }
                else {
                    if (localStorage.AppDateFormat == 'DD/MM/YYYY') {
                        FTermEndDate = item.TermEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1');
                    }
                    else if (localStorage.AppDateFormat == 'MM/DD/YYYY') {
                        FTermEndDate = item.TermEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                    }
                }


            }


            if (item.RenewalDate != null)
                vToDate = moment(new Date(item.RenewalDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1')));

            FormatstartDate = FormatstartDate != null ? FormatstartDate : "NA";
            FTermEndDate = FTermEndDate != null ? FTermEndDate : "NA";
            vContractTerm += '<span class="con_m_head">Term Type (' + vTermTypeDisplay + ')</span><br>';
            vContractTerm += '<span class="con_s_head">' + FormatstartDate + '  -  ' + FTermEndDate + ' ';


            vContractTerm += '</span>';


            vContractTerm += '</td>';

            if (contractItem.Status == "Up for Renewal") {
                if (item.CounterpartyNoticesRenewal != null && item.CounterpartyNoticesRenewalDate != null) {
                    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                        vRenewOn = item.CounterpartyNoticesRenewalDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                    }
                    else {
                        if (localStorage.AppDateFormat == 'DD/MM/YYYY') {
                            vRenewOn = item.CounterpartyNoticesRenewalDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1');
                        }
                        else if (localStorage.AppDateFormat == 'MM/DD/YYYY') {
                            vRenewOn = item.CounterpartyNoticesRenewalDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                        }
                    }
                    var CounterpartyNoticesRenewalDate = moment(new Date(item.CounterpartyNoticesRenewalDate));
                    var vDiffRenew = DiffBetDate(vFromDate, CounterpartyNoticesRenewalDate);

                    vContractTerm += '<td>';
                    vContractTerm += '<span class="con_m_head">Renew On or Before </span><br>';
                    vContractTerm += '<span class="con_s_head">' + vRenewOn;
                    if (vDiffRenew != '')
                        vContractTerm += '<span style="font-size: 11px;color: #999;"> (' + vDiffRenew + ' left) </span>';
                    else
                        vContractTerm += '<span style="font-size: 11px;color: #999;"> (NA) </span>';
                    vContractTerm += '</span>';
                    vContractTerm += '</td>';
                }
                else {
                    vContractTerm += '<td>';
                    vContractTerm += '<span class="con_m_head"></span><br>';
                    vContractTerm += '<span class="con_s_head"></span>';
                    vContractTerm += '</td>';
                }
            }
            else {
                vContractTerm += '<td>';
                vContractTerm += '<span class="con_m_head"></span><br>';
                vContractTerm += '<span class="con_s_head"></span>';
                vContractTerm += '</td>';
            }

            //Buttons
            vContractTerm += '<td align="right">';
            vContractTerm += '<a href="javascript:void(0);" onclick="viewDetailsTerm()" id="btnViewDetails" class="wit-btn" style="padding: 3px 7px;font-size: 12px;">View Details</a>';
            vContractTerm += '<a href="javascript:void(0);" onclick="OpenManageTerm()" id="btnManageTerms" class="wit-btn managesettings Manage" style="padding: 3px 7px;font-size: 12px;">Manage Term</a>';
            vContractTerm += '</td>';
        }
        else {
            //ENH 440 Display Alerts for Missing information
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/settings',
                type: 'GET',
                dataType: 'json',
                headers: {
                    'eContracts-ApiKey': vAPIKey
                },
                cache: false,
                success: function (data) {
                    if (data.DisplayMissingInformation == "Yes") {
                        vContractTerm += '<td>';
                        if (vTermType != "" && vTermType != null && vTermType != "--Select--" && vTermType != "0") {
                            vContractTerm += '<span class="con_m_head">(' + vTermTypeDisplay + ') </span>';
                        }
                        vContractTerm += '<a href="javascript:void(0);" onclick="OpenManageTerm()" id="btnManageTerms" class="wit-btn managesettings Manage" style="padding: 3px 7px;font-size: 12px;margin: 4px 4px 0 0;">Setup Contract Term</a>';
                        vContractTerm += '<a href="javascript:void(0)" data-title="The terms (timelines) for this Contract Record is not available." style="padding: 4px 4px 0 0;"><img src="/Content/Images/missing-exc.png" style="cursor: default !important;"/></a>';
                        vContractTerm += '</td>';
                        $("#tbodyManageTerm").html(vContractTerm);
                    }
                    else {
                        vContractTerm += '<td>';
                        if (vTermType != "" && vTermType != null && vTermType != "--Select--" && vTermType != "0") {
                            vContractTerm += '<span class="con_m_head">(' + vTermTypeDisplay + ') </span>';
                        }
                        vContractTerm += '<a href="javascript:void(0);" onclick="OpenManageTerm()" id="btnManageTerms" class="wit-btn managesettings Manage" style="padding: 3px 7px;font-size: 12px;">Setup Contract Term</a>';
                        vContractTerm += '</td>';
                        $("#tbodyManageTerm").html(vContractTerm);
                    }
                    ApplyPermissionToMenu(item.Permission);
                },
                error: function (data) {
                    vContractTerm += '<td>';
                    if (vTermType != "" && vTermType != null && vTermType != "--Select--" && vTermType != "0") {
                        vContractTerm += '<span class="con_m_head">Contract Term: ' + vTermTypeDisplay + ' </span>';
                    }
                    vContractTerm += '<a href="javascript:void(0);" onclick="OpenManageTerm()" id="btnManageTerms" class="wit-btn managesettings Manage" style="padding: 3px 7px;font-size: 12px;">Setup Contract Term</a>';
                    vContractTerm += '</td>';
                    $("#tbodyManageTerm").html(vContractTerm);
                    ApplyPermissionToMenu(item.Permission);
                }
            });
        }
        $("#tbodyManageTerm").html(vContractTerm);

        $(".openmenuTerm").contextMenu({ menu: 'dropdownMenuTerm', leftButton: true }, function (action, el, pos) {
            contextMenuTerm(action, el.parent("div"), pos);
        });
    }
    //$("#secContractTerm").css("display", "");
    $("#secContractTerm").css("display", "none");

    //Sridhar
    //BindContractTermTypeddl();
    var vTermTypeDisplay = TermTypeDisplayName[vTermType];
    //Sridhar
}

function contextMenuTerm(action, el, pos) {
    switch (action) {
        case "view":
            {
                var vTermType = contractItem.ContractTermType;
                var vTermTypeDisplay = vTermType != "" ? TermTypeDisplayName[vTermType] : "NA";
                var vMetadata = '<tr>';
                vMetadata += '<td style="padding: 5px;color: #2f2f2f;">Term Type</td>';
                vMetadata += '<td style="padding: 5px;color: #2f2f2f;">' + vTermTypeDisplay + '</td>';
                vMetadata += '</tr>';
                if (vTermType == "Fixed Term") {
                    var vStartdate = '';
                    var vEnddate = '';

                    var vCounterNotice = '';
                    //Renewal / Cancellation Conditions
                    vMetadata += '<tr>';
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">Cancellation Conditions</td>';
                    if (contractItem.ContractTermNotes != null && contractItem.ContractTermNotes != '')
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">' + contractItem.ContractTermNotes + '</td>';
                    else
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">-</td>';
                    vMetadata += '</tr>';



                    //Current Term
                    vMetadata += '<tr>';
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">Start / Effective Date</td>';
                    if (contractItem.StartDate != null && contractItem.StartDate != '') {
                        var rstartdate = '';
                        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                            rstartdate = contractItem.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                        }
                        else {
                            if (localStorage.AppDateFormat == 'DD/MM/YYYY') {
                                rstartdate = contractItem.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1');
                            }
                            else if (localStorage.AppDateFormat == 'MM/DD/YYYY') {
                                rstartdate = contractItem.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                            }

                        }
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">' + rstartdate + ' </td>';
                    }
                    else
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">-</td>';

                    vMetadata += '</tr>';


                    //Next Evaluation Date
                    vMetadata += '<tr>';
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">Next Evaluation Date</td>';
                    if (contractItem.NextEvaluationDate != null && contractItem.NextEvaluationDate != '') {
                        var nextEvaluationDate = '';
                        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                            nextEvaluationDate = contractItem.NextEvaluationDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                        }
                        else {
                            if (localStorage.AppDateFormat == 'DD/MM/YYYY') {
                                nextEvaluationDate = contractItem.NextEvaluationDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1');
                            }
                            else if (localStorage.AppDateFormat == 'MM/DD/YYYY') {
                                nextEvaluationDate = contractItem.NextEvaluationDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                            }

                        }
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">' + nextEvaluationDate + '</td>';
                    }
                    else
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">-</td>';

                    vMetadata += '</tr>';


                    //End Date
                    vMetadata += '<tr>';
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">End Date</td>';
                    if (contractItem.EndDate != null && contractItem.EndDate != '') {
                        var renddate = '';
                        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                            renddate = contractItem.EndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                        }
                        else {
                            if (localStorage.AppDateFormat == 'DD/MM/YYYY') {
                                renddate = contractItem.EndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1');
                            }
                            else if (localStorage.AppDateFormat == 'MM/DD/YYYY') {
                                renddate = contractItem.EndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                            }

                        }
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">' + renddate + '</td>';
                    }
                    else
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">-</td>';

                    vMetadata += '</tr>';


                    //Counterparty Contact / Address for Notice
                    vMetadata += '<tr>';
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">Counterparty Contact / Address for Notice</td>';
                    if (contractItem.CounterpartyNotices != null && contractItem.CounterpartyNotices != '')
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">' + contractItem.CounterpartyNotices + '</td>';
                    else
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">-</td>';
                    vMetadata += '</tr>';

                    //Counterparty Cancellation Notice
                    vMetadata += '<tr>';
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">Counterparty Cancellation Notice</td>';
                    if (contractItem.CounterpartyNoticesCancel != null && contractItem.CounterpartyNoticesCancel != '') {

                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">' + contractItem.CounterpartyNoticesCancel + ' day(s)</td>';
                    } else
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">-</td>';
                    vMetadata += '</tr>';

                    $(".renewableTermDetails").css('display', 'none');

                    showTermActivities();

                }
                else if (vTermType == "Evergreen / Perpetual") {
                    //Renewal / Cancellation Conditions
                    vMetadata += '<tr>';
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">Cancellation Conditions</td>';
                    if (contractItem.ContractTermNotes != null && contractItem.ContractTermNotes != '')
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">' + contractItem.ContractTermNotes + '</td>';
                    else
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">-</td>';
                    vMetadata += '</tr>';



                    //Current Term
                    vMetadata += '<tr>';
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">Start / Effective Date</td>';
                    if (contractItem.StartDate != null && contractItem.StartDate != '') {
                        var rstartdate = '';
                        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                            rstartdate = contractItem.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                        }
                        else {
                            if (localStorage.AppDateFormat == 'DD/MM/YYYY') {
                                rstartdate = contractItem.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1');
                            }
                            else if (localStorage.AppDateFormat == 'MM/DD/YYYY') {
                                rstartdate = contractItem.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                            }

                        }
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">' + rstartdate + ' </td>';
                    }
                    else
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">-</td>';

                    vMetadata += '</tr>';


                    //Next Evaluation Date
                    vMetadata += '<tr>';
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">Next Evaluation Date</td>';
                    if (contractItem.NextEvaluationDate != null && contractItem.NextEvaluationDate != '') {
                        var nextEvaluationDate = '';
                        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                            nextEvaluationDate = contractItem.NextEvaluationDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                        }
                        else {
                            if (localStorage.AppDateFormat == 'DD/MM/YYYY') {
                                nextEvaluationDate = contractItem.NextEvaluationDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1');
                            }
                            else if (localStorage.AppDateFormat == 'MM/DD/YYYY') {
                                nextEvaluationDate = contractItem.NextEvaluationDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                            }

                        }
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">' + nextEvaluationDate + '</td>';
                    }
                    else
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">-</td>';

                    vMetadata += '</tr>';

                    //Counterparty Contact / Address for Notice
                    vMetadata += '<tr>';
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">Counterparty Contact / Address for Notice</td>';
                    if (contractItem.CounterpartyNotices != null && contractItem.CounterpartyNotices != '')
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">' + contractItem.CounterpartyNotices + '</td>';
                    else
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">-</td>';
                    vMetadata += '</tr>';

                    //Counterparty Cancellation Notice
                    vMetadata += '<tr>';
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">Counterparty Cancellation Notice</td>';
                    if (contractItem.CounterpartyNoticesCancel != null && contractItem.CounterpartyNoticesCancel != '') {

                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">' + contractItem.CounterpartyNoticesCancel + ' day(s)</td>';
                    } else
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">-</td>';
                    vMetadata += '</tr>';

                    $(".renewableTermDetails").css('display', 'none');
                    showTermActivities();
                }
                else if (vTermType == "Executed / Performance") {
                    //Renewal / Cancellation Conditions
                    vMetadata += '<tr>';
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">Cancellation Conditions</td>';
                    if (contractItem.ContractTermNotes != null && contractItem.ContractTermNotes != '')
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">' + contractItem.ContractTermNotes + '</td>';
                    else
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">-</td>';
                    vMetadata += '</tr>';



                    //Date of execution
                    vMetadata += '<tr>';
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">Start / Effective Date</td>';
                    if (contractItem.StartDate != null && contractItem.StartDate != '') {
                        var rstartdate = '', renddate = '';
                        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                            rstartdate = contractItem.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                        }
                        else {
                            if (localStorage.AppDateFormat == 'DD/MM/YYYY') {
                                rstartdate = contractItem.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1');
                            }
                            else if (localStorage.AppDateFormat == 'MM/DD/YYYY') {
                                rstartdate = contractItem.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                            }

                        }
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">' + rstartdate + ' </td>';
                    }
                    else
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">-</td>';

                    vMetadata += '</tr>';


                    //Counterparty Contact / Address for Notice
                    vMetadata += '<tr>';
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">Counterparty Contact / Address for Notice</td>';
                    if (contractItem.CounterpartyNotices != null && contractItem.CounterpartyNotices != '')
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">' + contractItem.CounterpartyNotices + '</td>';
                    else
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">-</td>';
                    vMetadata += '</tr>';

                    //Counterparty Cancellation Notice
                    vMetadata += '<tr>';
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">Counterparty Cancellation Notice</td>';
                    if (contractItem.CounterpartyNoticesCancel != null && contractItem.CounterpartyNoticesCancel != '') {

                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">' + contractItem.CounterpartyNoticesCancel + ' day(s)</td>';
                    } else
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">-</td>';
                    vMetadata += '</tr>';

                    $(".renewableTermDetails").css('display', 'none');
                    showTermActivities();
                } else if (vTermType == "Renewable") {
                    var vRenewOn = '';

                    //Renewal / Cancellation Conditions
                    vMetadata += '<tr>';
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">Renewal / Cancellation Conditions</td>';
                    if (contractItem.ContractTermNotes != null && contractItem.ContractTermNotes != '')
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">' + contractItem.ContractTermNotes + '</td>';
                    else
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">-</td>';
                    vMetadata += '</tr>';

                    //Auto-Renew at the end of each term
                    vMetadata += '<tr>';
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">Auto-Renew at the end of each term</td>';
                    if (contractItem.AutoRenew != null && contractItem.AutoRenew != '')
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">' + contractItem.AutoRenew + '</td>';
                    else
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">-</td>';
                    vMetadata += '</tr>';

                    //Requires Renewal Authorization
                    vMetadata += '<tr>';
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">Requires Renewal Authorization</td>';
                    if (contractItem.RequiresAuth != null && contractItem.RequiresAuth != '')
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">' + contractItem.RequiresAuth + '</td>';
                    else
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">-</td>';
                    vMetadata += '</tr>';

                    //Renewal Notice to Counterparty
                    vMetadata += '<tr>';
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">Renewal Notice to Counterparty</td>';
                    if (contractItem.CounterpartyNoticesRenewalDate != null && contractItem.CounterpartyNoticesRenewalDate != '') {
                        var counterpartyNoticesRenewalDate = '';
                        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                            counterpartyNoticesRenewalDate = contractItem.CounterpartyNoticesRenewalDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                        }
                        else {
                            if (localStorage.AppDateFormat == 'DD/MM/YYYY') {
                                counterpartyNoticesRenewalDate = contractItem.CounterpartyNoticesRenewalDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1');
                            }
                            else if (localStorage.AppDateFormat == 'MM/DD/YYYY') {
                                counterpartyNoticesRenewalDate = contractItem.CounterpartyNoticesRenewalDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                            }

                        }
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">' + counterpartyNoticesRenewalDate + '</td>';
                    } else
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">-</td>';
                    vMetadata += '</tr>';

                    //Counterparty Cancellation Notice
                    vMetadata += '<tr>';
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">Counterparty Cancellation Notice</td>';
                    if (contractItem.CounterpartyNoticesCancelDate != null && contractItem.CounterpartyNoticesCancelDate != '') {
                        var counterpartyNoticesCancelDate = '';
                        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                            counterpartyNoticesCancelDate = contractItem.CounterpartyNoticesCancelDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                        }
                        else {
                            if (localStorage.AppDateFormat == 'DD/MM/YYYY') {
                                counterpartyNoticesCancelDate = contractItem.CounterpartyNoticesCancelDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1');
                            }
                            else if (localStorage.AppDateFormat == 'MM/DD/YYYY') {
                                counterpartyNoticesCancelDate = contractItem.CounterpartyNoticesCancelDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                            }

                        }
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">' + counterpartyNoticesCancelDate + '</td>';
                    } else
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">-</td>';
                    vMetadata += '</tr>';

                    //Counterparty Contact / Address for Notice
                    vMetadata += '<tr>';
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">Counterparty Contact / Address for Notice</td>';
                    if (contractItem.CounterpartyNotices != null && contractItem.CounterpartyNotices != '')
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">' + contractItem.CounterpartyNotices + '</td>';
                    else
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">-</td>';
                    vMetadata += '</tr>';

                    //Current Term
                    vMetadata += '<tr>';
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">Current Term</td>';
                    if (contractItem.EffectiveDate != null && contractItem.EffectiveDate != '') {
                        var rstartdate = '', renddate = '';
                        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                            rstartdate = contractItem.EffectiveDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                            if (contractItem.TermEndDate != null)
                                renddate = contractItem.TermEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                        }
                        else {
                            if (localStorage.AppDateFormat == 'DD/MM/YYYY') {
                                rstartdate = contractItem.EffectiveDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1');
                                if (contractItem.TermEndDate != null)
                                    renddate = contractItem.TermEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1');
                            }
                            else if (localStorage.AppDateFormat == 'MM/DD/YYYY') {
                                rstartdate = contractItem.EffectiveDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                                if (contractItem.TermEndDate != null)
                                    renddate = contractItem.TermEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                            }

                        }
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">' + rstartdate + ' - ' + renddate + '</td>';
                    }
                    else
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">-</td>';
                    vMetadata += '</tr>';

                    //Upcoming Term
                    vMetadata += '<tr>';
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">Upcoming Term</td>';
                    if (contractItem.NextTermStartDate != null && contractItem.NextTermStartDate != '') {
                        var rstartdate = '', renddate = '';
                        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                            rstartdate = contractItem.NextTermStartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                            renddate = contractItem.NextTermEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                        }
                        else {
                            if (localStorage.AppDateFormat == 'DD/MM/YYYY') {
                                rstartdate = contractItem.NextTermStartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1');
                                renddate = contractItem.NextTermEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1');
                            }
                            else if (localStorage.AppDateFormat == 'MM/DD/YYYY') {
                                rstartdate = contractItem.NextTermStartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                                renddate = contractItem.NextTermEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                            }

                        }
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">' + rstartdate + ' - ' + renddate + '</td>';
                    }
                    else
                        vMetadata += '<td style="padding: 5px;color: #2f2f2f;">-</td>';
                    vMetadata += '</tr>';

                    $(".renewableTermDetails").css('display', '');

                }
                $("#tbodyTermSummary").html(vMetadata);
                $("#dvRenewHistory").css('display', 'none');
                $("#dvActivityComment").css('display', 'none');
                $("#viewMetadataDetail").dialog("option", "title", "View Contract Term & Renewals Details");
                $("#viewMetadataDetail").dialog("open");
                break;
            }
    }
}

function ApplyPermissionToMenu(vPermission) {
    var stage = getParameterByName("Stage");

    if (stage == "pipeline") {
        if (contractItem.Status == "Cancelled") {
            $('.DeleteRecord').css("display", "");
        } else {
            $('.DeleteRecord').css("display", "none");
        }
    }
    else {
        if (contractItem.Status == "Archived") {
            $('.DeleteRecord').css("display", "");
        } else {
            $('.DeleteRecord').css("display", "none");
        }
    }

    if (contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived") {
        $('.Manage').css("display", "none");
        //$('.Contribute').css("display", "none");
        if (vPermission == 'Contribute') {
            $('.StatusPermission').css("display", "");
            $('#DeleteContract').css("display", "none");
        }
        else if (vPermission == 'View' || vPermission == '' || vPermission == null) {
            $('.Manage').css("display", "none");
            //$('.Contribute').css("display", "none");
            $('#DeleteContract').css("display", "none");
            $('#liContractstatus').css("display", "none");
        }
        else if (vPermission == 'Manage') {
            $('.StatusPermission').css("display", "");
        }
    }
    else {
        if (vPermission == 'Contribute') {
            $('.Manage').css("display", "none");
            $('#DeleteContract').css("display", "none");
        }
        else if (vPermission == 'Manage') {
            $('.Manage').css("display", "");
            //manoj

            //manoj
            if (typeof (contractItem.FinalizedBy) != "undefined" && contractItem.FinalizedBy != null && contractItem.FinalizedBy != "") {
                $("#lidropdownMenuRenewalTerm").css("display", "");
            } else {
                $("#lidropdownMenuRenewalTerm").css("display", "none");
            }
            //manoj
            if (documentview == null || documentview == "" || documentview == 'folder') {
                $('.Contribute').css("display", "");
            } else {
                $('.Contribute:not(#btnaddnewsubfolder)').css("display", "");
            }
            //manoj
        }
        else if (vPermission == 'View' || vPermission == '') {
            $('.Manage').css("display", "none");
            //$('.Contribute').css("display", "none");
            $('#DeleteContract').css("display", "none");
            $('#liContractstatus').css("display", "none");
        }
    }
    if (!(contractItem.Status == "Archived")) {
        $('.DeleteRecord').css("display", "none");
    }

    if ((contractItem.IsDraft == "Yes" && contractItem.Permission == 'Manage' && contractItem.CreatedBy == localStorage.UserName)) {
        $('.DeleteRecord').css("display", "");
    }
    if (contractItem.IsDraft == "Yes") {
        $('.drafthide').css("display", "none");
        $(".draft").css('display', 'none');
    }


    if (contractItem.ContractDocumentsUrl != null && contractItem.ContractDocumentsUrl != "" && (contractItem.IsDraft != 'Yes' || (contractItem.IsDraft == 'Yes' && contractItem.CreatedBy == localStorage.UserName))) {
        if ((documentview == 'folder' || documentview == "" || documentview == null) && (vPermission == 'Manage' || vPermission == 'Contribute') && (!(contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived"))) {
            $("#btnaddnewsubfolder").css('display', '');
        } else {
            $("#btnaddnewsubfolder").css('display', 'none');
        }
    } else {
        $("#btnaddnewsubfolder").css('display', 'none');
    }

}

function ReminderConditionCheck(beforeDaysSort, afterDaysSort, Contract) {
    var $rem = [Contract.RenewReminder1, Contract.RenewReminder2, Contract.RenewReminder3];
    var $remCond = [Contract.RenewReminder1Condition, Contract.RenewReminder2Condition, Contract.RenewReminder3Condition];
    $.each($remCond, function (i, item) {
        if ($rem[i] != 0 && $rem[i] != "" && $rem[i] != null) {
            var splitCond = item.split('-');
            if (splitCond[0] == 'before') {
                if (splitCond[1] != 'undefined')
                    Sortreminder(beforeDaysSort, splitCond[1], $rem[i]);
            }
            else if (splitCond[0] == 'after') {
                if (splitCond[1] != 'undefined')
                    Sortreminder(afterDaysSort, splitCond[1], $rem[i]);
            }
        }
    });
}

function Sortreminder(SortList, Condition, Value) {
    var result = $.grep(SortList, function (e) { return e.Condition == Condition; });
    if (result == 0) {
        SortList.push({ 'Condition': Condition, 'Value': Value });
    }
    else {
        result[0].Value = result[0].Value + ',' + Value;
        var splitResult = result[0].Value.split(',');
        splitResult.sort(function (a, b) {
            if (isNaN(a) || isNaN(b)) {
                return a > b ? 1 : -1;
            }
            return a - b;
        });
        var JoinResult = splitResult.join();
        result[0].Value = JoinResult;
    }


}

function SystemMileStoneArticle(titleTerm, dateValue, beforeDaysSort, afterDaysSort) {
    var article = '';
    var formatdateValue = '';
    if (dateValue != "" && dateValue != null) {
        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
            formatdateValue = moment(new Date(dateValue)).format('MM/DD/YYYY');
        }
        else { formatdateValue = moment(new Date(dateValue)).format(localStorage.AppDateFormat); }

        vDate = formatdateValue != "" ? (formatdateValue + ': ') : "";

        article = '<li class=" margin-bottom-8" title="Contract Term/Timelines">';
        article += '<img src="/Content/Images/Contract_Term.png" title="Contract Term/Timelines" style="pointer-events: none;">';
        article += '<span class="DateToSort" style="color: black;"> ' + vDate + '</span>';
        article += ' <a href="javascript:void(0)" style="color:#555555;" onclick=contextMenuTerm(\"view\",\"\",\"\")>' + titleTerm + '</a>';
        var beforeDays = '';
        var afterDays = '';
        var resultBefore = $.grep(beforeDaysSort, function (e) { return e.Condition == titleTerm; });
        if (resultBefore != 0) {
            beforeDays = resultBefore[0].Value;
        }
        var resultAfter = $.grep(afterDaysSort, function (e) { return e.Condition == titleTerm; });
        if (resultAfter != 0) {
            afterDays = resultAfter[0].Value;
        }
        if (beforeDays != '' || afterDays != '') {

            article += '<span class="sub-text-head"> (Reminders ' + (beforeDays != '' ? beforeDays + ' day(s) before' : '') + (afterDays != '' ? (beforeDays != '' ? ' & ' + afterDays + ' day(s) after )' : afterDays + ' day(s) after)') : ')') + ' </span>';
        }

        article += '</li>';

        articleSystemMileStone += article;
    }
}

function BindSystemMilestoneTest(sys, doc, actmile, actobligations) {

    if (actmile != '' || sys != '' || doc != '' || actobligations != '') {
        $("#ulMilestoneBody").empty();
        $("#ulMilestoneBody").append(actmile);
        $("#ulMilestoneBody").append(doc);
        $("#ulMilestoneBody").append(sys);
        $("#ulMilestoneBody").append(actobligations);
        var count = $("#ulMilestoneBody li").length;
        if (count == 0) {
            $("#ulMilestoneBody").append('No items found.');
            $("#lblMilestonesCount").text(0);
        }
        else {
            $("#ulMilestoneBody>li.ShowMoreMilestones").removeClass("ShowMoreMilestones");
            $("#ulMilestoneBody>li").css('display', 'block');

            $('#ulMilestoneBody>li').sort(sortDescending).appendTo('#ulMilestoneBody');
            $('#ulMilestoneBody>li').slice(5, count).addClass("ShowMoreMilestones");
            $('#ulMilestoneBody>li.ShowMoreMilestones').css('display', 'none');
            if (count > 5) {
                var more = count - 5;
                $("#dvMilestone").empty();
                $("#dvMilestone").html('<a id="ShowMoreMilestones" href="javascript:void(0);" class="pad-all close1" onclick="ShowMoreMilestones()">' + more + ' More Milestone(s) </a>' +
                                            '<a id="ShowLessMilestones" href="javascript:void(0);" class="pad-all close1" onclick="ShowLessMilestones()" style="display:none;">Show less</a>');
            }
            else {
                $("#dvMilestone").empty();
            }
            $("#lblMilestonesCount").text(count);
            $(".openmenuMilestone").contextMenu({
                menu: 'dropdownMenu', leftButton: true
            },
            function (action, el, pos) {
                contextMenuMilestone(action, el.parent("li"), pos);
            });
        }

    }
}

function contextMenuMilestone(action, el, pos) {

    switch (action) {
        case "view":
            {
                var milestoneID = $(el).find("#MilestoneID").text();
                ViewMilestineDetail(milestoneID);
                break;
            }
    }
}

function ViewMilestineDetail(milestoneID) {
    $("#loadingPage").fadeIn();

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/milestones?milestoneid=' + milestoneID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': vAPIKey },
        "Content-Type": "application/json",
        cache: false,
        success: function (milestoneentity) {
            $("#loadingPage").fadeOut();

            var vMetadata = '<ul class="pOp_Cont Milestone">';
            vMetadata += '<li id="milestoneTitle"><p>Milestone Title</p><span>' + milestoneentity.MilestoneTitle + '</span></li>';
            vMetadata += '<li><p>Milestone Type</p><span>' + milestoneentity.MilestoneType + '</span></li>';

            vMetadata += '<li><p>Description</p><span style="word-break: break-all;">';
            if (milestoneentity.MilestoneDescription != '') {
                vMetadata += milestoneentity.MilestoneDescription;
            }
            else { vMetadata += "-"; }
            vMetadata += '</span></li>';

            vMetadata += '<li><p>Milestone Date</p><span>';
            if (milestoneentity.MilestoneDate != null && milestoneentity.MilestoneDate != '') {
                var startDate = "";
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                { startDate = moment(new Date(milestoneentity.MilestoneDate)).utc().format('MM/DD/YYYY'); }
                else { startDate = moment(new Date(milestoneentity.MilestoneDate)).utc().format(localStorage.AppDateFormat); }
                vMetadata += startDate;
            }
            else { vMetadata += "-"; }
            vMetadata += '</span></li>';

            vMetadata += '<li><p>Auto Complete on Milestone Date?</p><span>';
            if (milestoneentity.AutoComplete != '') {
                vMetadata += milestoneentity.AutoComplete;
            }
            else { vMetadata += "-"; }
            vMetadata += '</span></li>';

            vMetadata += '<li id="milestoneOwners"><p>Milestone Owner</p><span>';
            if (milestoneentity.MilestoneOwner != '') {
                vMetadata += milestoneentity.MilestoneOwner;
            }
            else { vMetadata += "-"; }
            vMetadata += '</span></li>';

            vMetadata += '<li><p>Priority</p><span>';
            if (milestoneentity.Priority != '') {
                vMetadata += milestoneentity.Priority;
            }
            else { vMetadata += "-"; }
            vMetadata += '</span></li>';

            vMetadata += '<li><p>Milestone Completed</p><span>';
            if (milestoneentity.MilestoneCompleted != '') {
                vMetadata += milestoneentity.MilestoneCompleted;
            }
            else { vMetadata += "-"; }
            vMetadata += '</span></li>';

            vMetadata += '<li><p>Completed Date</p><span>';
            if (milestoneentity.MilestoneCompletedDate != null && milestoneentity.MilestoneCompletedDate != '' && milestoneentity.MilestoneCompleted == "Yes") {
                var completedate = "";
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                { completedate = moment(new Date(milestoneentity.MilestoneCompletedDate)).utc().format('MM/DD/YYYY'); }
                else { completedate = moment(new Date(milestoneentity.MilestoneCompletedDate)).utc().format(localStorage.AppDateFormat); }
                vMetadata += completedate;
            }
            else { vMetadata += "-"; }
            vMetadata += '</span></li>';

            vMetadata += '<li><p>Completed By</p><span>';
            if (milestoneentity.MilestoneCompletedBy != '') {
                vMetadata += milestoneentity.MilestoneCompletedBy;
            }
            else { vMetadata += "-"; }
            vMetadata += '</span></li>';

            vMetadata += '<li><p>Show In Calendar</p><span>';
            if (milestoneentity.ShowInCalendar != '') {
                vMetadata += milestoneentity.ShowInCalendar;
            }
            else { vMetadata += "-"; }
            vMetadata += '</span></li>';

            vMetadata += '<li><p>Send Reminder To</p><span>';
            if (milestoneentity.SendReminderTo != '') {
                vMetadata += milestoneentity.SendReminderTo;
            }
            else { vMetadata += "-"; }
            vMetadata += '</span></li>';

            vMetadata += '<li><p>Reminder 1</p><span>';
            if (milestoneentity.Reminder1 != '') {
                vMetadata += milestoneentity.Reminder1 + ' days ' + milestoneentity.Reminder1Condition;
            }
            else { vMetadata += "-"; }
            vMetadata += '</span></li>';

            vMetadata += '<li><p>Reminder 2</p><span>';
            if (milestoneentity.Reminder2 != '') {
                vMetadata += milestoneentity.Reminder2 + ' days ' + milestoneentity.Reminder2Condition;
            }
            else { vMetadata += "-"; }
            vMetadata += '</span></li>';

            vMetadata += '<li><p>Reminder 3</p><span>';
            if (milestoneentity.Reminder3 != '') {
                vMetadata += milestoneentity.Reminder3 + ' days ' + milestoneentity.Reminder3Condition;
            }
            else { vMetadata += "-"; }
            vMetadata += '</span></li>';

            //ContractID 
            vMetadata += '<li id="contractID" style="display:none;"><p>Contract ID</p><span>' + milestoneentity.ContractID + '</span></li>';
            //MilestoneID
            vMetadata += '<li id="milestoneID" style="display:none;"><p>Milestone ID</p><span>' + milestoneentity.RowKey + '</span></li>';

            vMetadata += '</ul>';

            var permissionsAll = contractItem.ContractManagers + ";" + contractItem.Approvers + ";" + contractItem.Reviewers + ";" + contractItem.Signees
                + ";" + contractItem.BusinessAreaOwners + ";" + contractItem.ReadWritePermissions + ";" + contractItem.FullControlPermissions + ";" + contractItem.ProjectManager;
            var permissions = $.unique($(permissionsAll.split(';')).map(function (i, item) { return item.trim() }).filter(function (i, item) { return item != ""; }));
            var msOwners = [];
            if (milestoneentity.MilestoneOwner != "") {
                if (milestoneentity.MilestoneOwner.indexOf('{') > -1) {
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/milestones/ownersfromgroup?contractid=' + milestoneentity.ContractID + '&milestoneonwers=' + milestoneentity.MilestoneOwner,
                        type: 'GET',
                        dataType: 'json',
                        headers: { 'eContracts-ApiKey': vAPIKey },
                        cache: false,
                        async: false,
                        success: function (owners) {
                            if (owners != null || owners != "") {
                                for (var key in owners) {
                                    if (owners.hasOwnProperty(key)) {
                                        msOwners.push(key);
                                    }
                                }
                            }
                        },
                        error: function (owners) { }

                    });
                }
                else
                    msOwners = $.map(milestoneentity.MilestoneOwner.split(';'), $.trim);
            }

            var statusArr = ["Replaced", "Expired", "Cancelled", "Archived"];
            $("#loadingPage").fadeOut();
            if (msOwners != "" && msOwners != null && msOwners.indexOf(localStorage.UserName) > -1 && milestoneentity.MilestoneCompleted != "Yes" &&
                milestoneentity.AutoComplete != "Yes" && jQuery.inArray(contractItem.Status, statusArr) == -1 && permissions.toArray().indexOf(localStorage.UserName) > -1) {
                $("#tblMetadataDetailForOwner").empty();
                $("#tblMetadataDetailForOwner").append(vMetadata);
                $("#btnMarkComplete span").attr('style', 'background-color: transparent; color: #3177b5;font-size: 14px;border: 1px solid #3177b5 !important;');
                $("#viewMetadataDetailForOwner").dialog("option", "title", "View Milestone");
                $("#viewMetadataDetailForOwner").dialog("open");
            }
            else {
                $("#tblMilObgMetadataDetail").empty();
                $("#tblMilObgMetadataDetail").append(vMetadata);
                $("#dvMilObgMetadata").dialog("option", "title", "View Milestone");
                $("#dvMilObgMetadata").dialog("open");
            }
        },
        error: function () {
            $("#loadingPage").fadeOut();
        },
        complete: function () {
            $("#loadingPage").fadeOut();
        }
    });
}

function ContractTopActions() {
    $(".m-status-btn").empty();
    var constatus = contractItem.Status;
    BindContractTermDetail(contractItem);
    $("#spanstatus").html(constatus);
    var arrstatus = ["Ready for Signature", "Awaiting Signatures", "Signed", "Active", "Up for Renewal", "Renewed", "Extended", "On Hold", "Replaced", "Expired", "Cancelled", "Terminated", "Archived", "About to Expire"];
    if (arrstatus.indexOf(constatus) > -1) {
        Stage = '';
        $("#btnContractTermExpire").show();
    }
    else {
        Stage = 'pipeline';
    }
    if (contractItem.IsDraft == "Yes") {
        constatus = "Draft";
        $("#addActivityApproval").css('display', 'none');
        $("#RelatedContractEdit").css('display', 'none');
        $("#bNavContracts").removeClass('act-contrac');
        $("#bNavContracts").removeClass('actNav');
        $("#bNavContracts").addClass('contrac_1');
        $(".draft").css('display', 'none');
    }
    switch (constatus) {
        case "New":
            $("#idNewStatus").html('<b title="New" class="status_green_another" style="padding: 5px 10px; color:#fff"><img src="/Content/Images/status/new.png" style="padding-right:5px;">' + constatus + '</b>');
            break;
        case "Awaiting Review":
            $("#idNewStatus").html('<b title="Awaiting Review" class="status_yellow" style="padding: 5px 10px; color:#fff"><img src="/Content/Images/status/renew.png" style="padding-right:5px;">' + constatus + '</b>');
            break;
        case "Reviewed":
            $("#idNewStatus").html('<b title="Reviewed" class="status_blue" style="padding: 5px 10px; color:#fff"><img src="/Content/Images/status/renew.png" style="padding-right:5px;">' + constatus + '</b>');
            break;
        case "Awaiting Approval":
            $("#idNewStatus").html('<b title="Awaiting Approval" class="status_yellow" style="padding: 5px 10px; color:#fff"><img src="/Content/Images/status/renew.png" style="padding-right:5px;">' + constatus + '</b>');
            break;
        case "Approved":
            $("#idNewStatus").html('<b title="Approved" class="status_blue" style="padding: 5px 10px; color:#fff"><img src="/Content/Images/status/tick.png" style="padding-right:5px;">' + constatus + '</b>');
            break;
        case "In Negotiation":
            $("#idNewStatus").html('<b title="In Negotiation" class="status_yellow" style="padding: 5px 10px; color:#fff"><img src="/Content/Images/status/renew.png" style="padding-right:5px;">' + constatus + '</b>');
            break;
        case "Negotiation Complete":
            $("#idNewStatus").html('<b title="Negotiation Complete" class="status_blue" style="padding: 5px 10px; color:#fff"><img src="/Content/Images/status/tick.png" style="padding-right:5px;">' + constatus + '</b>');
            break;
        case "Ready for Signature":
            $("#idNewStatus").html('<b title="Ready for Signature" class="status_green" style="padding: 5px 10px; color:#fff"><img src="/Content/Images/status/active.png" style="padding-right:5px;">' + constatus + '</b>');
            break;
        case "Awaiting Signatures":
            $("#idNewStatus").html('<b title="Awaiting Signature" class="status_yellow" style="padding: 5px 10px; color:#fff"><img src="/Content/Images/status/renew.png" style="padding-right:5px;">' + constatus + '</b>');
            break;
        case "Signed":
            $("#idNewStatus").html('<b title="Signed" class="status_blue" style="padding: 5px 10px; color:#fff"><img src="/Content/Images/status/tick.png" style="padding-right:5px;">' + constatus + '</b>');
            break;
        case "Active":
            $("#idNewStatus").html('<b title="Active" class="status_green" style="padding: 5px 10px; color:#fff"><img src="/Content/Images/status/active.png" style="padding-right:5px;">' + constatus + '</b>');
            break;
        case "Up for Renewal":
            $("#idNewStatus").html('<b title="Up for Renewal" class="status_red" style="padding: 5px 10px; color:#fff"><img src="/Content/Images/status/exp.png" style="padding-right:5px;">' + constatus + '</b>');
            break;
        case "About to Expire":
            $("#idNewStatus").html('<b title="About to Expire" class="status_red" style="padding: 5px 10px; color:#fff"><img src="/Content/Images/status/exp.png" style="padding-right:5px;">' + constatus + '</b>');
            break;
        case "On Hold":
            $("#idNewStatus").html('<b title="On Hold" class="status_red" style="padding: 5px 10px; color:#fff"><img src="/Content/Images/status/exp.png" style="padding-right:5px;">' + constatus + '</b>');
            break;
        case "Replaced":
            $("#idNewStatus").html('<b title="Replaced" class="status_Gray" style="padding: 5px 10px; color:#fff"><img src="/Content/Images/status/replace.png" style="padding-right:5px;">' + constatus + '</b>');
            break;
        case "Expired":
            $("#idNewStatus").html('<b title="Expired" class="status_Gray" style="padding: 5px 10px; color:#fff"><img src="/Content/Images/status/expried.png" style="padding-right:5px;">' + constatus + '</b>');
            break;
        case "Cancelled":
            $("#idNewStatus").html('<b title="Cancelled" class="status_Gray" style="padding: 5px 10px; color:#fff"><img src="/Content/Images/status/close.png" style="padding-right:5px;">' + constatus + '</b>');
            break;
        case "Archived":
            $("#idNewStatus").html('<b title="Archived" class="status_blue" style="padding: 5px 10px; color:#fff"><img src="/Content/Images/status/archive.png" style="padding-right:5px;">' + constatus + '</b>');
            break;
        case "Draft":
            $("#idNewStatus").html('<b title="In Draft" class="status_Gray" style="padding: 5px 10px; color:#fff"><img src="/Content/Images/icon/Draft_icon.png" /> ' + constatus + '</b>');
            break;
    }
    var vContractStatus = ["Ready for Signature", "Awaiting Signatures", "Signed", "Active", "Up for Renewal", "Renewed", "Extended", "On Hold", "Replaced", "Expired", "Cancelled", "Terminated", "Archived", "About to Expire"];

    if (constatus == "Draft") {
        if (getParameterByName("Stage") != "" && getParameterByName("Stage") == "pipeline") {
            $("#aNavPipeline").addClass('actNav');
            $("#bNavPipeline").removeClass('pipeline_1');
            $("#bNavPipeline").addClass('act-pipeline');
            $("#aNavContracts").removeClass('actNav');
            $("#bNavContracts").addClass('contrac_1');
            $("#bNavContracts").removeClass('act-contrac');
            if (constatus == "Cancelled") {
                $('.DeleteRecord').css("display", "");
            }
        }
        else {
            $("#aNavPipeline").removeClass('actNav');
            $("#bNavPipeline").addClass('pipeline_1');
            $("#bNavPipeline").removeClass('act-pipeline');
            $("#aNavContracts").addClass('actNav');
            $("#bNavContracts").removeClass('contrac_1');
            $("#bNavContracts").addClass('act-contrac');
        }
    }
    else {
        if (($.inArray(constatus, vContractStatus) < 0 || constatus == "Cancelled") && ((contractItem.FinalizedBy == null || contractItem.FinalizedBy == ""))) {
            $("#aNavPipeline").addClass('actNav');
            $("#bNavPipeline").removeClass('pipeline_1');
            $("#bNavPipeline").addClass('act-pipeline');
            $("#aNavContracts").removeClass('actNav');
            $("#bNavContracts").addClass('contrac_1');
            $("#bNavContracts").removeClass('act-contrac');
            if (constatus == "Cancelled") {
                $('.DeleteRecord').css("display", "");
            }
        } else {
            $("#aNavPipeline").removeClass('actNav');
            $("#bNavPipeline").addClass('pipeline_1');
            $("#bNavPipeline").removeClass('act-pipeline');
            $("#aNavContracts").addClass('actNav');
            $("#bNavContracts").removeClass('contrac_1');
            $("#bNavContracts").addClass('act-contrac');
        }
    }

    if (constatus != "0" && constatus != "" && constatus != "undefined") {
        if ($("#hdnPermission").val() != "View" && $("#hdnPermission").val() != "" && $("#hdnPermission").val() != null) {
            $("#topAction1").css("display", "");
            $("#topAction2").css("display", "");
            if (constatus == "New") {
                $("#topAction1").html('Add Document');
                $("#topAction2").html('Add Milestone');
                $("#topAction1").attr('onclick', 'AddContractDocument();');
                $("#topAction2").attr('onclick', 'AddMilestoneMoreNew();');
            }
            else if (constatus == "Drafting") {
                $("#topAction1").html('Add Document');
                $("#topAction2").html('Start Approval');
                $("#topAction1").attr('onclick', 'AddContractDocument();');
                $("#topAction2").attr('onclick', 'contextMenuContractSettings("approve","","");');
            }
            else if (constatus == "Awaiting Review") {
                $("#topAction1").html('Add Document');
                $("#topAction2").html('Edit Metadata');
                $("#topAction1").attr('onclick', 'AddContractDocument();');
                $("#topAction2").attr('onclick', 'contextMenuContractSettings("edit","","");');
            }
            else if (constatus == "Reviewed") {
                $("#topAction1").html('Start Approval');
                $("#topAction1").attr('onclick', 'contextMenuContractSettings("approve","","");');
                var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                    return (n.RowKey == "9" && n.Status == "ON");
                });
                if (vAccFeat.length > 0) {
                    $("#topAction2").html('Share Contract Record');
                    $("#topAction2").attr('onclick', 'contextMenuContractSettings("share","","");');
                }
                else {
                    $("#topAction2").css("display", "none");
                }
            }
            else if (constatus == "Awaiting Approval") {
                var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                    return (n.RowKey == "9" && n.Status == "ON");
                });
                if (vAccFeat.length > 0) {
                    $("#topAction1").html('Share Contract Record');
                    $("#topAction1").attr('onclick', 'contextMenuContractSettings("share","","");');
                }
                else {
                    $("#topAction1").css("display", "none");
                }
                if ($("#hdnPermission").val() == "Manage") {
                    $("#topAction2").html('Add Related Contract Record(s)');
                    $("#topAction2").attr('onclick', 'AddRelatedContracts();');
                }
                else {
                    $("#topAction2").css("display", "none");
                }
            }
            else if (constatus == "Approved") {
                $("#topAction1").html('Add Document');
                $("#topAction1").attr('onclick', 'AddContractDocument();');
                var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                    return (n.RowKey == "9" && n.Status == "ON");
                });
                if (vAccFeat.length > 0) {
                    $("#topAction2").html('Share Contract Record');
                    $("#topAction2").attr('onclick', 'contextMenuContractSettings("share","","");');
                } else {
                    $("#topAction2").css("display", "none");
                }
            }
            else if (constatus == "In Negotiation") {
                var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                    return (n.RowKey == "9" && n.Status == "ON");
                });
                if (vAccFeat.length > 0) {
                    $("#topAction1").html('Share Contract Record');
                    $("#topAction1").attr('onclick', 'contextMenuContractSettings("share","","");');
                }
                else {
                    $("#topAction1").css("display", "none");
                }
                if ($("#hdnPermission").val() == "Manage") {
                    if (contractItem.IsStandard == "Yes") {
                        $("#topAction2").css("display", "none");
                    }
                    else {
                        $("#topAction2").css("display", "none");
                    }
                }
                else {
                    $("#topAction2").css("display", "none");
                }
            }
            else if (constatus == "Negotiation Complete") {
                $("#topAction1").html('Start Approval');
                $("#topAction1").attr('onclick', 'contextMenuContractSettings("approve","","");');
                if ($("#hdnPermission").val() == "Manage") {
                    if (contractItem.IsStandard == "Yes") {
                        $("#topAction2").css("display", "none");
                    }
                    else {
                        $("#topAction2").css("display", "none");
                    }
                }
                else {
                    $("#topAction2").css("display", "none");
                }
            }
            else if (constatus == "Awaiting Signatures" || constatus == "Ready for Signature") {
                if ($("#hdnPermission").val() == "Manage") {
                    $("#topAction1").html('Add Related Contract Record(s)');
                    $("#topAction2").html('Manage Permission');
                    $("#topAction1").attr('onclick', 'AddRelatedContracts();');
                    $("#topAction2").attr('onclick', 'contextMenuContractSettings("permission","","");');
                }
                else {
                    if ($("#topAction1").html() == "") {
                        $("#topAction1").css("display", "none");
                    }
                    $("#topAction2").css("display", "none");
                }
            }
            else if (constatus == "Signed") {
                if ($("#hdnPermission").val() == "Manage") {
                    $("#topAction1").html('Manage Permission');
                    $("#topAction1").attr('onclick', 'contextMenuContractSettings("permission","","");');
                    $("#topAction2").html('Term Settings');
                    $("#topAction2").attr('onclick', 'contextMenuTerm("manage","","");');
                }
                else {
                    $("#topAction1").css("display", "none");
                    $("#topAction2").css("display", "none");
                }
            }
            else if (constatus == "Active") {
                $("#topAction1").html('Add Amendment');
                $("#topAction1").attr('onclick', 'AddAmendmentMore();');
                if ($("#hdnPermission").val() == "Manage") {
                    $("#topAction2").html('Manage Permission');
                    $("#topAction2").attr('onclick', 'contextMenuContractSettings("permission","","");');
                }
                else {
                    $("#topAction2").css("display", "none");
                }
            }
            else if (constatus == "Up for Renewal") {
                $("#topAction1").html('Add Amendment');
                $("#topAction1").attr('onclick', 'AddAmendmentMore();');
                if ($("#hdnPermission").val() == "Manage") {
                    $("#topAction2").html('Term Settings');
                    $("#topAction2").attr('onclick', 'contextMenuTerm("manage","","");');
                }
                else {
                    $("#topAction2").css("display", "none");
                }
            }
            else if (constatus == "Renewed") {
                $("#topAction1").html('Add Amendment');
                $("#topAction1").attr('onclick', 'AddAmendmentMore();');
                if ($("#hdnPermission").val() == "Manage") {
                    $("#topAction2").html('Manage Permission');
                    $("#topAction2").attr('onclick', 'contextMenuContractSettings("permission","","");');
                }
                else {
                    $("#topAction2").css("display", "none");
                }
            }
            else if (constatus == "Extended") {
                $("#topAction1").html('Add Amendment');
                $("#topAction1").attr('onclick', 'AddAmendmentMore();');
                if ($("#hdnPermission").val() == "Manage") {
                    $("#topAction2").html('Manage Permission');
                    $("#topAction2").attr('onclick', 'contextMenuContractSettings("permission","","");');
                }
                else {
                    $("#topAction2").css("display", "none");
                }
            }
            else if (constatus == "About to Expire") {
                $("#topAction1").html('Start Approval');
                $("#topAction2").html('Add Amendment');
                $("#topAction1").attr('onclick', 'contextMenuContractSettings("approve","","");');
                $("#topAction2").attr('onclick', 'AddAmendmentMore();');
            }
            else if (constatus == "Archived") {
                $("#topAction1").html('View History');
                $("#topAction1").attr('onclick', 'contextMenuContractSettings("history","","");');
                if ($("#hdnPermission").val() == "Manage") {
                    $("#topAction2").html('Delete Contract');
                    $("#topAction2").attr('onclick', 'contextMenuContractSettings("delete","","");');
                }
                else {
                    $("#topAction2").css("display", "none");
                }
                //manoj
                $('.Manage').css("display", "none");
                //$('.Contribute').css("display", "none");
                //manoj
            }
            else {
                if ($("#hdnPermission").val() == "Manage") {
                    $("#topAction2").css("display", "none");
                    $("#topAction1").html('Duplicate Contract');
                    $("#topAction1").attr('onclick', 'contextMenuContractSettings("duplicate","","");');
                }
                else {
                    $("#topAction1").css("display", "none");
                    $("#topAction2").css("display", "none");
                }
            }
        }
        else {
            $("#topAction1").css("display", "none");
            $("#topAction2").css("display", "none");
        }
    }
    else {
        $("#spanstatus").html('Not Assigned');
    }

    $(".m-status-btn").html($(".constatus").clone());

    if (contractItem.IsDraft == "Yes" || constatus == "Archived") {
        $(".managesettings").css("display", "none");
        $(".review").css("display", "none");
        $(".signature").css("display", "none");
        $(".draft").css('display', 'none');
        $("#addActivityApproval").css('display', 'none');
        $("#RelatedContractEdit").css('display', 'none');
        $(".FL_Share").css("display", "none");
        $(".approve").css("display", "none");
        $(".mail").css("display", "none");
        $(".liContractStandard").css("display", "none");
        $(".liContractNonStandard").css("display", "none");
        $(".status").css("display", "none");
        $(".contractrenewal").css("display", "none");
        $(".permission").css("display", "none");
        $(".defaultproperties").css("display", "none");
        $(".template").css("display", "none");
        $(".duplicate").css("display", "none");
        $(".final").css("display", "none");
        $(".separator").css("display", "none");
        $("#topAction1").css("display", "none");
        $("#topAction2").css("display", "none");
    }
}

function BindStatus() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/contractstatusesbyCLM',
        type: 'GET',
        dataType: 'json',
        headers: {
            'eContracts-ApiKey': vAPIKey
        },
        cache: false,
        success: function (contractstatuses) {
            var datalenght = contractstatuses.length;
            for (var i = 0; i < datalenght; i++) {
                var item = contractstatuses[i];
                var ctrl = "";

                if ((item.ContractStatus.trim() == "Renewed" && $("#hdnIsRenewable").text() == "No") || (item.ContractStatus.trim() == "Extended" && $("#hdnIsExtendable").text() == "No") || (item.ContractStatus.trim() == "Up for Renewal" && $("#hdnIsRenewable").text() == "No"))
                { }
                else {

                    if ($("#spanstatus").text() == item.ContractStatus.trim()) {
                        ctrl = "<li id=" + item.ContractStatus.trim() + "><input id='" + item.RowKey + "' type='radio' checked onclick='javascript:statusclick(this);' name='rdstatus' value=" + encodeURI(item.ContractStatus.trim()) + " class='css-checkbox' /><label for='" + item.RowKey + "' class='css-label'>" + item.ContractStatus.trim() + "</label></li>";
                    } else {
                        ctrl = "<li id=" + item.ContractStatus.trim() + "><input id='" + item.RowKey + "' type='radio' onclick='javascript:statusclick(this);' name='rdstatus' value=" + encodeURI(item.ContractStatus.trim()) + " class='css-checkbox' /><label for='" + item.RowKey + "' class='css-label'>" + item.ContractStatus.trim() + "</label></li>";
                    }

                }

                if (item.ContractStatus.trim() == "Renewed") {
                    if ($("#hdnIsRenewable").text() != "No") {

                    }
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

                if ($("#spanstatus").text() == "Renewed") {
                    $('#dvRenewCtrl').css("display", "");
                    $('#dvCancelCtrl').css("display", "none");
                }
                else if ($("#spanstatus").text() == "Cancelled") {
                    $('#dvCancelCtrl').css("display", "");
                    $('#dvRenewCtrl').css("display", "none");
                }
            }
            $("#dtRenewalDate").datepicker();
            $("#dtExtendedDate").datepicker();
        }
    });
}

function BindContractLabels() {

    $("#LabelsAdd").hide();
    $('#LabelEdit').hide();
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vAccFeat = [];
    vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "18" && n.Status == "ON");
    });

    lstSelectedLabels = contractItem.Labels;
    var AutoLable = [];
    if (contractItem.AutoLabels != '' && contractItem.AutoLabels != null) {
        AutoLable = contractItem.AutoLabels.split(';');
    }
    if (contractItem.Labels != '') {
        var txtLabelSpans = "";
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/label?labelNames=' + encodeURIComponent(contractItem.Labels),
            type: 'GET',
            dataType: 'json',
            cache: false,
            headers: {
                'eContracts-ApiKey': vAPIKey
            },
            success: function (data) {
                $('#dvLabelList').empty();
                var datalenght = data.length;
                if (datalenght > 0) {
                    for (var i = 0; i < datalenght; i++) {
                        var item = data[i];
                        txtLabelSpans += '<span class="label margin-right-5" style="font-size:12px;background-color:#' + item.LabelColor.trim() + ' !important;">';
                        txtLabelSpans += '<small style="float: left;">' + item.LabelTitle + '</small>';
                        //if (!($.inArray(item.LabelTitle, AutoLable) > -1 && vAccFeat.length > 0))
                        //    txtLabelSpans += '<img src="/Content/Images/close_white.png" onclick="javascript:RemoveSelectedLabel(this);" style="float: right; margin: 2px 0px 0px 3px;">';
                        txtLabelSpans += '</span>';
                    }
                    $('#dvLabelList').append(txtLabelSpans);
                    if ($("#hdnPermission").val() != 'View')
                        $('#LabelEdit').show();
                    $("#LabelsAdd").hide();
                }
                else {

                    $('#dvLabelList').empty();
                    var clickEdit = "";
                    if ($("#hdnPermission").val() != 'View')
                        //$("#LabelsAdd").show();
                        $("#LabelsAdd").hide();
                    $('#LabelEdit').hide();
                    $('#dvLabelList').append(clickEdit);
                }

            }, error: function (data) {
                $('#dvLabelList').empty();
                var clickEdit = "";
                if ($("#hdnPermission").val() != 'View')
                    //$("#LabelsAdd").show();
                    $("#LabelsAdd").hide();
                $('#LabelEdit').hide();
                $('#dvLabelList').append(clickEdit);
            }
        });
    } else {
        $('#dvLabelList').empty();

        if ($('#dvLabelList').children().length == 0) {
            if ($("#hdnPermission").val() != 'View')
                //$("#LabelsAdd").show();
                $("#LabelsAdd").hide();
            $('#LabelEdit').hide();
            $('#dvLabelList').append("");
        }
    }
}

function BindAmendments(contractid) {
    if (contractid == null || contractid == "") { contractid = vContractID; }
    $("#ulAmendment").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/amendments?contractid=' + contractid,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': vAPIKey },
        cache: false,
        success: function (contactsJsonPayload) {
            var count = 0;
            $(contactsJsonPayload).each(function (i, item) {
                count++
                var vDesc = item.AmendmentDescription;
                if (vDesc == null || vDesc == '') {
                    vDesc = '';
                }

                var article = '';
                if (count <= 5)
                    article = '<li class=" margin-bottom-8 WrapText_h2">';
                else
                    article = '<li class="ShowMoreAmendments margin-bottom-8 WrapText_h2" style="display:none;">';
                article += '<label id="AmendmentID" style="display:none;">' + item.RowKey + '</label>';
                article += '<label id="AmendmentTitle" style="display:none;">' + item.AmendmentTitle + '</label>';
                article += '<label id="AmendmentApprovalWorkflow" style="display:none;">' + item.ApprovalWorkflow + '</label>';
                article += '<a href="javascript:void(0)" onclick="ViewAmendment(\'' + item.RowKey + '\')">' + item.AmendmentTitle + '</a>';
                article += '<span class="sub-text"> ' + vDesc + '</span>';
                article += '&nbsp;<img src="/Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuAmendment"/>';
                article += '</li>';
                $("#ulAmendment").append(article);

            });

            if (count > 5) {
                var more = count - 5;
                $("#dvAmendment").html('<a id="ShowMoreAmendments" href="javascript:void(0);" class="pad-all close1" onclick="ShowMoreAmendments()">' + more + ' More Amendments </a>' +
                                          '<a id="ShowLessAmendments" href="javascript:void(0);" class="pad-all close1" onclick="ShowLessAmendments()" style="display:none;">Show less</a>');
            }

            $("#lblAmendmentsCount").text(count);
            if (count == 0) {
                $("#ulAmendment").append('No items found.');
            }
            $(".openmenuAmendment").contextMenu({ menu: 'dropdownMenu', leftButton: true }, function (action, el, pos) { contextMenuAmendment(action, el.parent("li"), pos); });

        },
        error: function (request) {
            $("#lblAmendmentsCount").text('0');
            $("#ulAmendment").append('No items found.');
        }
    });
}

function GetContractValueSetting(contRecord) {
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vDocLibFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "19" && n.Status == "ON");
    });
    $('#tblcontractvaluepopup tr.customfinancialfields').remove();
    $("#divfinancialsection").removeClass('col12');
    $("#divfinancialsection").removeClass('col4');
    if (vDocLibFeat.length == 0) {
        $("#divfinancialsection").addClass('col4');
        $("#divfinancialsection").html('<h3 class="f24"><span id="lblContractValue"></span><span id="lblContractCurrency" style="margin-left: 3px !important;"></span></h3><p class="sub-text">Contract Value</p>');
    } else {
        $("#divfinancialsection").addClass('col12');
        $("#divfinancialsection").html('<img src="/Content/Images/icon/loading.gif"> Please wait...');
    }
    var vContractValueSetting = '';
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/settings',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': vAPIKey },
        cache: false,
        success: function (data) {
            oGeneralSettings = data;
            //ENH 440 Display Alerts for Missing information  
            if (data.DisplayMissingInformation == "Yes") {
                $("#tblDocumentMissing").css("display", "");
                $("#tblDocuments").css("display", "");
                $("#tblTermsMissing").css("display", "");
                $("#tblMilestoneMissing").css("display", "");
                $("#tblMilestones").css("display", "");
                $("#tblMetadataMissing").css("display", "");
                $("#tblRequired").css("display", "");
                $("#tblPeopleMissing").css("display", "");
                $("#tblPeoples").css("display", "");
                $("#tblActivity").css("display", "");
                $("#tblDescriptionMissing").css("display", "");
            }
            else {
                $("#tblDocumentMissing").css("display", "none");
                $("#tblDocuments").css("display", "none");
                $("#tblTermsMissing").css("display", "none");
                $("#tblMilestoneMissing").css("display", "none");
                $("#tblMilestones").css("display", "none");
                $("#tblMetadataMissing").css("display", "none");
                $("#tblRequired").css("display", "none");
                $("#tblPeopleMissing").css("display", "none");
                $("#tblPeoples").css("display", "none");
                $("#tblActivity").css("display", "none");
                $("#tblDescriptionMissing").css("display", "none");
                $(".clpendingaction").css("display", "none");
            }
            //ENH 440 Display Alerts for Missing information


            //old section
            if (vDocLibFeat.length == 0) {
                vContractValueSetting = data.IsContractValueInBaseCurrency;
                if (vContractValueSetting == "Display Contract Values in Base Currency") {
                    if (data.CurrencyDisplayStyle == "UK") {
                        $('#lblContractValue').autoNumeric('init', { vMax: '99999999999999999999.99' });
                        $('#lblContractValue').autoNumeric('set', parseFloat(contRecord.BaseContractValue))

                        $('#txtContractValueCurrent').autoNumeric('init');
                        $('#txtContractValueCurrent').autoNumeric('set', parseFloat(contRecord.BaseContractValue))
                    } else if (data.CurrencyDisplayStyle == "CAN") {
                        $('#lblContractValue').autoNumeric('init', { aSep: ' ', aDec: '.', vMax: '99999999999999999999.99' });
                        $('#lblContractValue').autoNumeric('set', parseFloat(contRecord.BaseContractValue))

                        $('#txtContractValueCurrent').autoNumeric('init', { aSep: ' ', aDec: '.' });
                        $('#txtContractValueCurrent').autoNumeric('set', parseFloat(contRecord.BaseContractValue))
                    } else if (data.CurrencyDisplayStyle == "EU") {
                        $('#lblContractValue').autoNumeric('init', { aSep: '.', aDec: ',', vMax: '99999999999999999999.99' });
                        $('#lblContractValue').autoNumeric('set', parseFloat(contRecord.BaseContractValue))

                        $('#txtContractValueCurrent').autoNumeric('init', { aSep: '.', aDec: ',' });
                        $('#txtContractValueCurrent').autoNumeric('set', parseFloat(contRecord.BaseContractValue))
                    }
                    if (contRecord.BaseContractValueCurrency != null) {
                        if (contRecord.BaseContractValueCurrency == "0") {
                            contRecord.BaseContractValueCurrency = "";
                        }
                        if (contRecord.BaseContractValueCurrency == "0") {
                            contRecord.BaseContractValueCurrency = "";
                        }
                        $("#lblContractCurrency").text(contRecord.BaseContractValueCurrency);
                        $("#lblContractCurrencyCurrent").text(contRecord.BaseContractValueCurrency);
                        ContractCurrencyType = 'base';
                    }
                }
                else {
                    ContractCurrencyType = 'actual';
                    if (data.CurrencyDisplayStyle == "UK") {
                        $('#lblContractValue').autoNumeric('init', { vMax: '99999999999999999999.99' });
                        $('#lblContractValue').autoNumeric('set', parseFloat(contRecord.ContractValue))

                        $('#txtContractValueCurrent').autoNumeric('init');
                        $('#txtContractValueCurrent').autoNumeric('set', contRecord.ContractValue)
                    } else if (data.CurrencyDisplayStyle == "CAN") {
                        $('#lblContractValue').autoNumeric('init', { aSep: ' ', aDec: '.', vMax: '99999999999999999999.99' });
                        $('#lblContractValue').autoNumeric('set', parseFloat(contRecord.ContractValue))

                        $('#txtContractValueCurrent').autoNumeric('init', { aSep: ' ', aDec: '.' });
                        $('#txtContractValueCurrent').autoNumeric('set', parseFloat(contRecord.ContractValue))
                    } else if (data.CurrencyDisplayStyle == "EU") {
                        $('#lblContractValue').autoNumeric('init', { aSep: '.', aDec: ',', vMax: '99999999999999999999.99' });
                        $('#lblContractValue').autoNumeric('set', parseFloat(contRecord.ContractValue))

                        $('#txtContractValueCurrent').autoNumeric('init', { aSep: '.', aDec: ',' });
                        $('#txtContractValueCurrent').autoNumeric('set', parseFloat(contRecord.ContractValue))
                    }
                    if (contRecord.ContractCurrency != null) {
                        if (contRecord.ContractCurrency == "0") {
                            contRecord.ContractCurrency = "";
                        }
                        $("#lblContractCurrency").text(contRecord.ContractCurrency);
                        $("#lblContractCurrencyCurrent").text(contRecord.ContractCurrency);
                    }
                }
                if (data.CurrencyDisplayStyle == "UK") {
                    vCurrencyDisplayStyle = "UK";
                } else if (data.CurrencyDisplayStyle == "CAN") {
                    vCurrencyDisplayStyle = "CAN";
                } else if (data.CurrencyDisplayStyle == "EU") {
                    vCurrencyDisplayStyle = "EU";
                } else if (data.CurrencyDisplayStyle == "IND") {
                    vCurrencyDisplayStyle = "IND";
                }
            } else {
                //old section

                //New Section
                //manoj
                cutomFinancialFields = [];
                var financialtable = "";
                var financialtableedit = "";
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/contracttypes/metadatas?contracttypename=' + encodeURIComponent(contRecord.ContractType),
                    type: 'GET',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': vAPIKey },
                    cache: false,
                    async: false,
                    success: function (metadataFields) {
                        if (metadataFields != null && metadataFields.length > 0) {
                            cutomFinancialFields = $.grep(metadataFields, function (n, i) {
                                return (n.CustomFieldsGroupName == "FinancialCustomFields");
                            });
                            if (cutomFinancialFields.length > 0) {
                                financialtable = "<table style='width: 420px;'><thead><tr><th></th><th>Base Currency</th><th>Actual Currency</th></tr></thead><tbody>";
                                $(cutomFinancialFields).each(function (i, itemfield) {
                                    financialtable += "<tr><td>" + itemfield.FieldDisplayName + "</td><td><span id='lblBase" + itemfield.FieldName + "'></span><span class='basecurrencyformat' id='lblBase" + itemfield.FieldName + "Currency'></span></td><td><span id='lblActual" + itemfield.FieldName + "'></span><span class='actualcurrencyformat' id='lblActual" + itemfield.FieldName + "Currency'></span></td></tr>";
                                    financialtableedit += "<tr class='customfinancialfields'><td class='f_head'>" + itemfield.FieldDisplayName;
                                    financialtableedit += (itemfield.Newform == "Required" || itemfield.Finalizingfrom == "Required" || itemfield.Closeoutform == "Required") ? "<small class='required'>*</small></td><td class='labelright f_list'><input id='txt" + itemfield.FieldName + "popup' name=" + itemfield.FieldName + " title=" + itemfield.FieldDisplayName + " maxlength='15' type='text' class='f_inpt width90 validelement validcontractvalue customfinancialupdate' /></td></tr>" : "</td><td class='labelright f_list'><input id='txt" + itemfield.FieldName + "popup' name=" + itemfield.FieldName + " title=" + itemfield.FieldDisplayName + " maxlength='15' type='text' class='f_inpt width90 validcontractvalue customfinancialupdate' /></td></tr>"
                                    financialtableedit += "<tr class='customfinancialfields'><td class='f_head' style='height:35px;'>" + itemfield.FieldDisplayName + " In Base Currency</td><td class='labelright'><label id='lbl" + itemfield.FieldName + "InBaseCurency' style='font-size:15px;' /></td></tr>"
                                });
                                financialtable += "</tbody></table>";
                            }
                        }
                    },
                    error: function (data) {
                    }
                });
                //manoj
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/Contracts/IContractDetails?contractid=' + vContractID,
                    type: 'GET',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': vAPIKey },
                    cache: false,
                    success: function (mainmetadataFields) {
                        vMetadatavaluetobindcutomFinancial = $(mainmetadataFields).find('Metadata');
                        //manoj
                        $("#divfinancialsection").html('<h3 class="f24"><span id="lblContractValue"></span><span id="lblContractCurrency" style="margin-left: 3px !important;" ></span></h3><p class="sub-text">Contract Value</p><div id="dvcontractfinacialgroup" style=" text-align: center; margin-left:150px"></div>');
                        $("#dvcontractfinacialgroup").html(financialtable);
                        if (typeof (financialtableedit) != "undefined" && financialtableedit != null && financialtableedit != "") {
                            $(financialtableedit).insertBefore("#trcustomcontractvaluepopup");
                        }
                        financialtable = "";
                        financialtableedit = "";
                        vContractValueSetting = data.IsContractValueInBaseCurrency;
                        if (vContractValueSetting == "Display Contract Values in Base Currency") {
                            if (data.CurrencyDisplayStyle == "UK") {
                                $('#lblContractValue').autoNumeric('init', { vMax: '99999999999999999999.99' });
                                $('#lblContractValue').autoNumeric('set', parseFloat(contRecord.BaseContractValue))

                                $('#txtContractValueCurrent').autoNumeric('init');
                                $('#txtContractValueCurrent').autoNumeric('set', parseFloat(contRecord.BaseContractValue))
                            } else if (data.CurrencyDisplayStyle == "CAN") {
                                $('#lblContractValue').autoNumeric('init', { aSep: ' ', aDec: '.', vMax: '99999999999999999999.99' });
                                $('#lblContractValue').autoNumeric('set', parseFloat(contRecord.BaseContractValue))

                                $('#txtContractValueCurrent').autoNumeric('init', { aSep: ' ', aDec: '.' });
                                $('#txtContractValueCurrent').autoNumeric('set', parseFloat(contRecord.BaseContractValue))
                            } else if (data.CurrencyDisplayStyle == "EU") {
                                $('#lblContractValue').autoNumeric('init', { aSep: '.', aDec: ',', vMax: '99999999999999999999.99' });
                                $('#lblContractValue').autoNumeric('set', parseFloat(contRecord.BaseContractValue))

                                $('#txtContractValueCurrent').autoNumeric('init', { aSep: '.', aDec: ',' });
                                $('#txtContractValueCurrent').autoNumeric('set', parseFloat(contRecord.BaseContractValue))
                            }
                            if (contRecord.BaseContractValueCurrency != null) {
                                if (contRecord.BaseContractValueCurrency == "0") {
                                    contRecord.BaseContractValueCurrency = "";
                                }
                                $("#lblContractCurrency").text(contRecord.BaseContractValueCurrency);
                                $("#lblContractCurrencyCurrent").text(contRecord.BaseContractValueCurrency);
                                ContractCurrencyType = 'base';
                            }
                        }
                        else {
                            ContractCurrencyType = 'actual';
                            if (data.CurrencyDisplayStyle == "UK") {
                                $('#lblContractValue').autoNumeric('init', { vMax: '99999999999999999999.99' });
                                $('#lblContractValue').autoNumeric('set', parseFloat(contRecord.ContractValue))

                                $('#txtContractValueCurrent').autoNumeric('init');
                                $('#txtContractValueCurrent').autoNumeric('set', parseFloat(contRecord.ContractValue))
                            } else if (data.CurrencyDisplayStyle == "CAN") {
                                $('#lblContractValue').autoNumeric('init', { aSep: ' ', aDec: '.', vMax: '99999999999999999999.99' });
                                $('#lblContractValue').autoNumeric('set', parseFloat(contRecord.ContractValue))

                                $('#txtContractValueCurrent').autoNumeric('init', { aSep: ' ', aDec: '.' });
                                $('#txtContractValueCurrent').autoNumeric('set', parseFloat(contRecord.ContractValue))
                            } else if (data.CurrencyDisplayStyle == "EU") {
                                $('#lblContractValue').autoNumeric('init', { aSep: '.', aDec: ',', vMax: '99999999999999999999.99' });
                                $('#lblContractValue').autoNumeric('set', parseFloat(contRecord.ContractValue))

                                $('#txtContractValueCurrent').autoNumeric('init', { aSep: '.', aDec: ',' });
                                $('#txtContractValueCurrent').autoNumeric('set', parseFloat(contRecord.ContractValue))
                            }
                            if (contRecord.ContractCurrency != null) {
                                if (contRecord.ContractCurrency == "0") {
                                    contRecord.ContractCurrency = "";
                                }
                                $("#lblContractCurrency").text(contRecord.ContractCurrency);
                                $("#lblContractCurrencyCurrent").text(contRecord.ContractCurrency);
                            }
                        }
                        if (data.CurrencyDisplayStyle == "UK") {
                            vCurrencyDisplayStyle = "UK";
                        } else if (data.CurrencyDisplayStyle == "CAN") {
                            vCurrencyDisplayStyle = "CAN";
                        } else if (data.CurrencyDisplayStyle == "EU") {
                            vCurrencyDisplayStyle = "EU";
                        } else if (data.CurrencyDisplayStyle == "IND") {
                            vCurrencyDisplayStyle = "IND";
                        }

                        //manoj

                        //For  Base and Actual Currency
                        $(cutomFinancialFields).each(function (i, itemfield) {

                            $('#txt' + itemfield.FieldName + 'popup').keypress(function (e) {
                                if (e.keyCode == 13)
                                    return false;
                            });

                            if (vCurrencyDisplayStyle == "UK") {
                                $('#lblBase' + itemfield.FieldName).autoNumeric('init', { vMax: '99999999999999999999.99' });
                                $('#lblBase' + itemfield.FieldName).autoNumeric('set', parseFloat(($(vMetadatavaluetobindcutomFinancial).find('CustomBase' + itemfield.FieldName).text() != "") ? $(vMetadatavaluetobindcutomFinancial).find('CustomBase' + itemfield.FieldName).text() : "0"));
                                $('#lblBase' + itemfield.FieldName).append(" " + contRecord.BaseContractValueCurrency);
                                $('#lblActual' + itemfield.FieldName).autoNumeric('init', { vMax: '99999999999999999999.99' });
                                $('#lblActual' + itemfield.FieldName).autoNumeric('set', parseFloat(($(vMetadatavaluetobindcutomFinancial).find(itemfield.FieldName).text() != "") ? $(vMetadatavaluetobindcutomFinancial).find(itemfield.FieldName).text() : "0"));
                                if (contRecord.ContractCurrency == "0") {
                                    contRecord.ContractCurrency = "";
                                }
                                $('#lblActual' + itemfield.FieldName).append(" " + contRecord.ContractCurrency);
                                //popupbind
                                if (itemfield.FieldName != "ContractValue") {
                                    $('#lbl' + itemfield.FieldName + 'InBaseCurency').autoNumeric('init', { vMax: '99999999999999999999.99' });
                                    $('#lbl' + itemfield.FieldName + 'InBaseCurency').autoNumeric('set', parseFloat(($(vMetadatavaluetobindcutomFinancial).find('CustomBase' + itemfield.FieldName).text() != "") ? $(vMetadatavaluetobindcutomFinancial).find('CustomBase' + itemfield.FieldName).text() : "0"));
                                    $('#lbl' + itemfield.FieldName + 'InBaseCurency').append(" " + $("#hdnBaseContractCurrency").text());
                                    $('#txt' + itemfield.FieldName + 'popup').autoNumeric('init');
                                    $('#txt' + itemfield.FieldName + 'popup').autoNumeric('set', parseFloat(($(vMetadatavaluetobindcutomFinancial).find(itemfield.FieldName).text() != "") ? $(vMetadatavaluetobindcutomFinancial).find(itemfield.FieldName).text() : "0"));
                                }
                                //popupbind
                            } else if (vCurrencyDisplayStyle == "CAN") {
                                $('#lblBase' + itemfield.FieldName).autoNumeric('init', { aSep: ' ', aDec: '.', vMax: '99999999999999999999.99' });
                                $('#lblBase' + itemfield.FieldName).autoNumeric('set', parseFloat(($(vMetadatavaluetobindcutomFinancial).find('CustomBase' + itemfield.FieldName).text() != "") ? $(vMetadatavaluetobindcutomFinancial).find('CustomBase' + itemfield.FieldName).text() : "0"));
                                $('#lblBase' + itemfield.FieldName).append(" " + contRecord.BaseContractValueCurrency);
                                $('#lblActual' + itemfield.FieldName).autoNumeric('init', { aSep: ' ', aDec: '.', vMax: '99999999999999999999.99' });
                                $('#lblActual' + itemfield.FieldName).autoNumeric('set', parseFloat(($(vMetadatavaluetobindcutomFinancial).find(itemfield.FieldName).text() != "") ? $(vMetadatavaluetobindcutomFinancial).find(itemfield.FieldName).text() : "0"));
                                if (contRecord.ContractCurrency == "0") {
                                    contRecord.ContractCurrency = "";
                                }
                                $('#lblActual' + itemfield.FieldName).append(" " + contRecord.ContractCurrency);
                                //popupbind
                                if (itemfield.FieldName != "ContractValue") {
                                    $('#lbl' + itemfield.FieldName + 'InBaseCurency').autoNumeric('init', { aSep: ' ', aDec: '.', vMax: '99999999999999999999.99' });
                                    $('#lbl' + itemfield.FieldName + 'InBaseCurency').autoNumeric('set', parseFloat(($(vMetadatavaluetobindcutomFinancial).find('CustomBase' + itemfield.FieldName).text() != "") ? $(vMetadatavaluetobindcutomFinancial).find('CustomBase' + itemfield.FieldName).text() : "0"));
                                    $('#lbl' + itemfield.FieldName + 'InBaseCurency').append(" " + $("#hdnBaseContractCurrency").text());
                                    $('#txt' + itemfield.FieldName + 'popup').autoNumeric('init', { aSep: ' ', aDec: '.' });
                                    $('#txt' + itemfield.FieldName + 'popup').autoNumeric('set', parseFloat(($(vMetadatavaluetobindcutomFinancial).find(itemfield.FieldName).text() != "") ? $(vMetadatavaluetobindcutomFinancial).find(itemfield.FieldName).text() : "0"));
                                }
                                //popupbind
                            } else if (vCurrencyDisplayStyle == "EU") {
                                $('#lblBase' + itemfield.FieldName).autoNumeric('init', { aSep: '.', aDec: ',', vMax: '99999999999999999999.99' });
                                $('#lblBase' + itemfield.FieldName).autoNumeric('set', parseFloat(($(vMetadatavaluetobindcutomFinancial).find('CustomBase' + itemfield.FieldName).text() != "") ? $(vMetadatavaluetobindcutomFinancial).find('CustomBase' + itemfield.FieldName).text() : "0"));
                                $('#lblBase' + itemfield.FieldName).append(" " + contRecord.BaseContractValueCurrency);
                                $('#lblActual' + itemfield.FieldName).autoNumeric('init', { aSep: '.', aDec: ',', vMax: '99999999999999999999.99' });
                                $('#lblActual' + itemfield.FieldName).autoNumeric('set', parseFloat(($(vMetadatavaluetobindcutomFinancial).find(itemfield.FieldName).text() != "") ? $(vMetadatavaluetobindcutomFinancial).find(itemfield.FieldName).text() : "0"));
                                if (contRecord.ContractCurrency == "0") {
                                    contRecord.ContractCurrency = "";
                                }
                                $('#lblActual' + itemfield.FieldName).append(" " + contRecord.ContractCurrency);
                                //popupbind
                                if (itemfield.FieldName != "ContractValue") {
                                    $('#lbl' + itemfield.FieldName + 'InBaseCurency').autoNumeric('init', { aSep: '.', aDec: ',', vMax: '99999999999999999999.99' });
                                    $('#lbl' + itemfield.FieldName + 'InBaseCurency').autoNumeric('set', parseFloat(($(vMetadatavaluetobindcutomFinancial).find('CustomBase' + itemfield.FieldName).text() != "") ? $(vMetadatavaluetobindcutomFinancial).find('CustomBase' + itemfield.FieldName).text() : "0"));
                                    $('#lbl' + itemfield.FieldName + 'InBaseCurency').append(" " + $("#hdnBaseContractCurrency").text());
                                    $('#txt' + itemfield.FieldName + 'popup').autoNumeric('init', { aSep: '.', aDec: ',' });
                                    $('#txt' + itemfield.FieldName + 'popup').autoNumeric('set', parseFloat(($(vMetadatavaluetobindcutomFinancial).find(itemfield.FieldName).text() != "") ? $(vMetadatavaluetobindcutomFinancial).find(itemfield.FieldName).text() : "0"));
                                }
                                //popupbind
                            }
                            else if (vCurrencyDisplayStyle == "IND") {
                                $('#lblBase' + itemfield.FieldName).autoNumeric('init', { dGroup: '2', vMax: '99999999999999999999.99' });
                                $('#lblBase' + itemfield.FieldName).autoNumeric('set', parseFloat(($(vMetadatavaluetobindcutomFinancial).find('CustomBase' + itemfield.FieldName).text() != "") ? $(vMetadatavaluetobindcutomFinancial).find('CustomBase' + itemfield.FieldName).text() : "0"));
                                $('#lblBase' + itemfield.FieldName).append(" " + contRecord.BaseContractValueCurrency);
                                $('#lblActual' + itemfield.FieldName).autoNumeric('init', { dGroup: '2', vMax: '99999999999999999999.99' });
                                $('#lblActual' + itemfield.FieldName).autoNumeric('set', parseFloat(($(vMetadatavaluetobindcutomFinancial).find(itemfield.FieldName).text() != "") ? $(vMetadatavaluetobindcutomFinancial).find(itemfield.FieldName).text() : "0"));
                                if (contRecord.ContractCurrency == "0") {
                                    contRecord.ContractCurrency = "";
                                }
                                $('#lblActual' + itemfield.FieldName).append(" " + contRecord.ContractCurrency);
                                //popupbind
                                if (itemfield.FieldName != "ContractValue") {
                                    $('#lbl' + itemfield.FieldName + 'InBaseCurency').autoNumeric('init', { dGroup: '2', vMax: '99999999999999999999.99' });
                                    $('#lbl' + itemfield.FieldName + 'InBaseCurency').autoNumeric('set', parseFloat(($(vMetadatavaluetobindcutomFinancial).find('CustomBase' + itemfield.FieldName).text() != "") ? $(vMetadatavaluetobindcutomFinancial).find('CustomBase' + itemfield.FieldName).text() : "0"));
                                    $('#lbl' + itemfield.FieldName + 'InBaseCurency').append(" " + $("#hdnBaseContractCurrency").text());
                                    $('#txt' + itemfield.FieldName + 'popup').autoNumeric('init', { dGroup: '2' });
                                    $('#txt' + itemfield.FieldName + 'popup').autoNumeric('set', parseFloat(($(vMetadatavaluetobindcutomFinancial).find(itemfield.FieldName).text() != "") ? $(vMetadatavaluetobindcutomFinancial).find(itemfield.FieldName).text() : "0"));
                                }
                                //popupbind
                            }
                        });
                    },
                });
            }
        }
    });
}

function EnableDisableOCR() {
    var veContractFeatures_OCR = JSON.parse(localStorage.getItem("eContractFeatures"));
    if (veContractFeatures_OCR != null) {
        var vDocLibFeat_OCR = $.grep(veContractFeatures_OCR, function (n_OCR, i_OCR) {
            return (n_OCR.RowKey == "25" && n_OCR.Status == "ON");
        });
        if (vDocLibFeat_OCR.length > 0) {
            OCRDocEnabled = true;
        } else {
            OCRDocEnabled = false;
        }
    }
}

function GetRenewalChecklistAndNotes(contractid, checkFromStart) {
    if (contractid == null || contractid == "") { contractid = vContractID; }

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/Contracts/' + contractid + '/contractrenewalhistory',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': vAPIKey },
        success: function (data) {
            vContractRenewalHistory = data;
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/Contracts?contractid=' + contractid,
                type: 'GET',
                cache: false,
                contentType: false,
                headers: { 'eContracts-ApiKey': vAPIKey },
                processData: false,
                success: function (vItemContract) {
                    //checkUpcoming(vItemContract, checkFromStart);
                    $(data).each(function (i, item) {
                        if (vItemContract.NextTermStartDate != null && vItemContract.NextTermEndDate != null && item.RenewedDate != null && item.TermEndDate != null) {
                            if (item.RenewedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1') == vItemContract.NextTermStartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1') && item.TermEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1') == vItemContract.NextTermEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1')) {
                                UpComingNotes = item.RenewalNotes;
                                UpcomingChecklist = item.RenewalChecklist;
                                TermName = item.RenewableTermName;
                            }
                        }
                    });
                },
            });

        },
        error:
            function (data) {

            }
    });
}

function icontractdetails() {
    icontractItem = "";
    MethodCount += 1;
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/Contracts/IContractDetails?contractid=' + vContractID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': vAPIKey },
        cache: false,
        success: function (mainmetadataFields) {
            icontractItem = $(mainmetadataFields).find('Metadata');
            showMetadataWithFeaturedMeta();
        },
        error: function (mainmetadataFields) {
        }
    });
}

function showMetadataWithFeaturedMeta() {
    var str = "";
    var value = "";
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vDocLibFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "19" && n.Status == "ON");
    });
    $('#MetadataAll').html('');
    if (GetallMetadataWithCT != null && GetallMetadataWithCT != []) {
        $(GetallMetadataWithCT).each(function (i, item) {
            if (item.FieldName != "BusinessArea" && item.FieldName != "ContractType" && item.FieldName != "ContractTitle" && item.FieldName != "Counterparty" && item.FieldName != "ContractNumber" &&
            item.FieldName != "SharedwithInternal" && item.FieldName != "Approvers" && item.FieldName != "ContractManagers" && item.FieldName != "Reviewers" && item.FieldName != "ExternalSignees" &&
                item.FieldName != "RelatedContracts" && item.FieldType != "File Upload" && item.FieldName != "Signees") { //Bug id:eO37576
                //if (item.FeaturedMetadata == "true") {

                if (item.FieldType == 'Date') {
                    var date = $(icontractItem).find(item.FieldName).text();
                    if (date != null) {
                        var onlydate = "";
                        onlydate = date.substring(0, date.length - 19);
                    }
                    if (onlydate != "") {
                        if (localStorage.AppDateFormat == null || localStorage.AppDateFormat == "" || localStorage.AppDateFormat == 'undefined') {
                            onlydate = moment(new Date(onlydate)).format('MM/DD/YYYY');
                        }
                        else {
                            onlydate = moment(new Date(onlydate)).format(localStorage.AppDateFormat);
                        }
                    }
                    str = '<tr>' +
                           '<td height="10" align="left" valign="top" class="content-text clr999 width40" style="word-break: break-word;">' + item.FieldDisplayName + '</td>';
                    if (onlydate != "") {
                        str += '<td height="10" align="left" valign="top" class="content-text width58">' + onlydate + '</td>';
                    }
                    else {
                        str += '<td height="10" align="left" valign="top" class="content-text width58"> Not Available</td>';
                    }

                    str += '</tr>';
                } else if (item.FieldType.indexOf("Value / Financials") >= 0) {
                    value = $(icontractItem).find(item.FieldName).text();

                    str = '<tr>' +
                           '<td height="10" align="left" valign="top" class="content-text clr999 width40" style="word-break: break-word;">' + item.FieldDisplayName + '</td>';
                    if (value != "") {
                        str += '<td height="10" align="left" valign="top" class="content-text width58">' + '<span id=' + item.FieldName + '_formatted' + '>' + value + '</span>' + '<span>' + $("#hdnContractCurrency").text() + '</span>' + '</td>';
                    }
                    else {
                        str += '<td height="10" align="left" valign="top" class="content-text width58"> Not Available</td>';
                    }

                    str += '</tr>';

                }
                else {
                    str = '<tr>' +
                       '<td height="10" align="left" valign="top" class="content-text clr999 width40" style="word-break: break-word;">' + item.FieldDisplayName + '</td>';
                    if (typeof ($(icontractItem).find(item.FieldName).text()) != "undefined" && $(icontractItem).find(item.FieldName).text() != null && $(icontractItem).find(item.FieldName).text() != "") {
                        //Rahul
                        if (item.FieldType == 'Hyperlink') {
                            var link = $(icontractItem).find(item.FieldName).text();
                            str += '<td height="10" align="left" valign="top" class="width58 labelleft">' + '<a href="' + link + '" target="_blank"><p title="' + link + '" style="width:190px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;font-size:13px">' + link + '</p></a>' + '</td>';
                        }
                            //Rahul    
                        else
                            str += '<td height="10" align="left" valign="top" class="content-text width58" style="word-break: break-word;">' + $(icontractItem).find(item.FieldName).text() + '</td>';
                    }
                    else {
                        str += '<td height="10" align="left" valign="top" class="content-text width58"> Not Available</td>';
                    }

                    str += '</tr>';
                }
            }
            $('#MetadataAll').append(str);
            str = "";
            if (item.FieldType.indexOf("Value / Financials") >= 0) {
                if (vDocLibFeat.length > 0 && value != "") {
                    if ($.isNumeric($('#' + item.FieldName + '_formatted').html())) {
                        if (vCurrencyDisplayStyle == "UK") {
                            $('#' + item.FieldName + '_formatted').autoNumeric();
                        } else if (vCurrencyDisplayStyle == "CAN") {
                            $('#' + item.FieldName + '_formatted').autoNumeric({ aSep: ' ', aDec: '.' });
                        } else if (vCurrencyDisplayStyle == "EU") {
                            $('#' + item.FieldName + '_formatted').autoNumeric({ aSep: '.', aDec: ',' });
                        } else if (vCurrencyDisplayStyle == "IND") {
                            $('#' + item.FieldName + '_formatted').autoNumeric({ dGroup: '2', });
                        } else {
                            $('#' + item.FieldName + '_formatted').autoNumeric('init');
                        }
                    }
                }
            }
        });
    }
    FinancialMetadata();
}

function FinancialMetadata() {
    $('#tblcontractvaluepopup tr.financeclass').remove();
    var str = "";
    var MyPipeline = $("#aNavPipeline").hasClass("actNav");
    var MyContracts = $("#aNavContracts").hasClass("actNav");
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));

    var vAccFeatObligation = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "19" && n.Status == "ON");
    });

    if (vAccFeatObligation.length > 0) {
        var datalength = GetallFinancialMetadataWithCT.length;
        $("#tblFinancialMetadata").html('');
        //Binding Financial Metadata
        str += '<tbody>';
        for (var i = 0; i < GetallFinancialMetadataWithCT.length; i++) {
            var data = GetallFinancialMetadataWithCT[i];
            if (data.FieldName != "BusinessArea" && data.FieldName != "ContractType" && data.FieldName != "ContractTitle" && data.FieldName != "Counterparty") {

                if (data.FieldType == 'Date') {
                    var date = $(icontractItem).find(data.FieldName).text();
                    onlydate = "";
                    if (date != null) {
                        onlydate = date.substring(0, date.length - 19);

                    }
                    if (onlydate != "") {
                        if (localStorage.AppDateFormat == null || localStorage.AppDateFormat == "" || localStorage.AppDateFormat == 'undefined') {
                            onlydate = moment(new Date(onlydate)).format('MM/DD/YYYY');
                        }
                        else {
                            onlydate = moment(new Date(onlydate)).format(localStorage.AppDateFormat);
                        }
                    }
                    str += '<tr>' +
                               '<td height="10" align="left" valign="top" class="content-text clr999 width40" style="word-break: break-word;">' + data.FieldDisplayName + '</td>';
                    if (onlydate != "") {
                        str += '<td height="10" align="left" valign="top" class="content-text width58">' + onlydate + '</td>';
                    }
                    else {
                        str += '<td height="10" align="left" valign="top" class="content-text width58"> Not Available</td>';
                    }
                    str += '</tr>';
                }
                else {
                    str += '<tr>' +
                               '<td height="10" align="left" valign="top" class="content-text clr999 width40" style="word-break: break-word;">' + data.FieldDisplayName + '</td>';
                    if (typeof ($(icontractItem).find(data.FieldName).text()) != "undefined" && $(icontractItem).find(data.FieldName).text() != null && $(icontractItem).find(data.FieldName).text() != "") {
                        str += '<td height="10" align="left" valign="top" class="content-text width58">' + $(icontractItem).find(data.FieldName).text() + '</td>';
                    }
                    else {
                        str += '<td height="10" align="left" valign="top" class="content-text width58"> Not Available</td>';
                    }
                    str += '</tr>';
                }
            }
        }
        str += '</tbody>';
        $("#tblFinancialMetadata").append(str);
        str = '';
        //To Edit Financial Metadata
        for (var i = 0; i < datalength; i++) {
            var data = GetallFinancialMetadataWithCT[i];
            var inpstr = "";
            var onlydate = "";
            var vMultiDDL1 = "";
            var resValue = "";
            var multiarr = [];
            var vDate = "";

            if (data.FieldType == 'Single Line Text' || data.FieldType == 'Number') {
                //if (MyPipeline || MyContracts) {
                str += '<tr class="financeclass">';
                str += '<td class="f_head"  style="height:35px;">' + data.FieldDisplayName + '</td>';
                if ($(icontractItem).find(data.FieldName).text() !== "") {
                    inpstr = '<input id="' + data.FieldName + '" name="' + data.FieldName + '" title="' + data.FieldDisplayName + '" maxlength="100" type="text" class="f_inpt width90" value="' + $(icontractItem).find(data.FieldName).text() + '" />';
                    str += '<td  class="labelright f_list financials">' + inpstr + '';
                }
                else {
                    inpstr = '<input id="' + data.FieldName + '" name="' + data.FieldName + '" title="' + data.FieldDisplayName + '" maxlength="100" type="text" class="f_inpt width90" />';
                    str += '<td  class="labelright f_list financials">' + inpstr + '';
                }
                str += '</td></tr>';
                // }
            }
            else if (data.FieldType == 'Multi Line Text') {
                str += '<tr class="financeclass">';
                str += '<td class="f_head" style="height:35px;margin-top:-15%;">' + data.FieldDisplayName + '</td>';
                if ($(icontractItem).find(data.FieldName).text() !== "") {
                    inpstr = "<textarea name=" + data.FieldName + " id=" + data.FieldName + " maxlength='500' cols='50' rows='4' style='border:1px solid #ccc;height: 70px; font-size: 13px;color: #6c6c6c;' title='" + data.FieldDisplayName + "' class='width90 clsMultilineText'>" + $(icontractItem).find(data.FieldName).text() + "</textarea>";
                    str += '<td class="labelright f_list financials">' + inpstr + '';
                }
                else {
                    inpstr = "<textarea name=" + data.FieldName + " id=" + data.FieldName + " maxlength='500' cols='50' rows='4' style='border:1px solid #ccc;height: 70px; font-size: 13px;color: #6c6c6c;' class='width90 clsMultilineText' title='" + data.FieldDisplayName + "'></textarea>";
                    str += '<td class="labelright f_list financials">' + inpstr + '';
                }
                str += '</td></tr>';
            }
            else if (data.FieldType == 'Date') {
                var vv = $(icontractItem).find(data.FieldName).text();
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
                str += '<tr class="financeclass">';
                str += '<td class="f_head" style="height:35px;">' + data.FieldDisplayName + '</td>';
                if (onlydate !== "") {
                    inpstr = "<input type='text' id='" + data.FieldName + "' name='" + data.FieldName + "' class='f_inpt width60 fielddatecontrol removeText' value='" + onlydate + "' title='" + data.FieldName + "'/>";
                    str += '<td class="labelright f_list fielddatecontrol">' + inpstr + '';

                }
                else {
                    inpstr = '<input id="' + data.FieldName + '" name="' + data.FieldName + '" title="' + data.FieldDisplayName + '" maxlength="15" type="text" class="f_inpt width60 fielddatecontrol removeText" />';
                    str += '<td class="labelright f_list fielddatecontrol">' + inpstr + '';
                }
                str += '</td></tr>';
                //vDate = data.FieldName;

            }
            else if (data.FieldType == 'Multi- Choice (Dropdown)') {
                if (MyContracts || MyPipeline) {
                    str += '<tr class="financeclass">';
                    str += '<td class="f_head"  style="height:35px;">' + data.FieldDisplayName + '</td>';
                    inpstr = "<select id=" + data.FieldName + " multiple='multiple' class='f_inpt width90' name=" + data.FieldName + " title='" + data.FieldName + "' data-placeholder='--Select--'>";
                    str += '<td class="labelright f_list chosenmulti chosen-choices" style="padding-right:35px;">' + inpstr + '';
                    if (vMultiDDL1 == '') {
                        var myArray = [];
                        myArray = data.ChoiceValues.split("\n");
                        for (var j = 0; j < myArray.length; j = j + 1) {
                            vMultiDDL1 += "<option value='" + myArray[j] + "'>" + myArray[j] + "</option>";
                        }
                    }
                    str += vMultiDDL1;
                    str += '</select></td></tr>';
                    vMultiDDL1 = data.FieldName;
                }
            }
            else if (data.FieldType == 'Multi- Choice (Browse)') {
                str += '<tr class="financeclass">';
                str += '<td class="f_head"  style="height:35px;">' + data.FieldDisplayName + '</td>';
                if ($(icontractItem).find(data.FieldName).text() !== "") {
                    inpstr = '<input id="' + data.FieldName + '" readonly="readonly" name="' + data.FieldName + '" title="' + data.FieldDisplayName + '" maxlength="100" type="text" class="f_inpt width90" value="' + $(icontractItem).find(data.FieldName).text() + '" />';
                    str += '<td  class="labelright f_list financials">' + inpstr + '';
                }
                else {
                    inpstr = '<input id="' + data.FieldName + '" readonly="readonly" name="' + data.FieldName + '" title="' + data.FieldDisplayName + '" maxlength="100" type="text" class="f_inpt width90" />';
                    str += '<td  class="labelright f_list financials">' + inpstr + '';
                }
                //str += '</td></tr>';
                str += '</td>';
                str += '<td class="col3 m1">';
                str += "<a href='javascript:void(0)' class='font12' style='margin-left:-30px !important;color: #3F91CC !important;' id='" + data.FieldDisplayName + "' title='" + data.FieldName + "' onclick='ViewGeneric(this)'> Browse</a>";
                str + "</td></tr>";
            }
            else if (data.FieldType == 'Choice') {
                //if (MyContracts || MyPipeline) {
                str += '<tr class="financeclass">';
                str += '<td class="f_head" style="height:35px;">' + data.FieldDisplayName + '</td>';
                inpstr = "<select id='" + data.FieldName + "' name=" + data.FieldName + " class='f_inpt width90 choicevaluecheck' title='" + data.FieldName + "' data-placeholder='--Select--'>";
                str += '<td class="labelright f_list financials">' + inpstr + '';
                str += "<option value=''>--Select--</option>";
                var myArray1 = [];
                myArray1 = data.ChoiceValues.split("\n");
                for (var l = 0; l < myArray1.length; l = l + 1) {
                    do {
                        myArray1[l] = myArray1[l].replace("&amp;", "&");
                    } while (myArray1[l].indexOf("&amp;") > -1)
                    if ($(icontractItem).find(data.FieldName).text() == myArray1[l]) {
                        str += "<option value='" + myArray1[l] + "' selected>" + myArray1[l] + "</option>";
                    } else {
                        str += "<option value='" + myArray1[l] + "'>" + myArray1[l] + "</option>";
                    }
                }
                str += '</select></td></tr>';

                //}
            }
            if (str !== "") {
                $("#tblcontractvaluepopup").append(str);
                //Apply Datepicker Jquery
                if (data.FieldType == "Date") {
                    var dateformate = localStorage.AppDateFormat.toLowerCase().slice(0, -2);
                    $("#" + data.FieldName + "").datepicker({
                        changemonth: true,
                        changeyear: true,
                        dateFormat: dateformate
                    });
                }
                if (data.FieldType == 'Number') {
                    allowOnlyNumberInInputBox(data.FieldName);
                }
                if (vMultiDDL1 != "") {
                    $("#" + vMultiDDL1 + "").chosen().trigger("chosen:updated");
                    var values = $(icontractItem).find(vMultiDDL1).text();
                    if (values != "") {
                        //HideOptionsNotRequiredExcept(vMultiDDL1, values);
                        var res = values != null ? values.split(";") : [];
                        var reslength = res.length;
                        for (var k = 0; k < reslength; k++) {
                            resValue = res[k].trim();
                            if (resValue != "") {
                                if ($('#' + vMultiDDL1 + ' option[value="' + resValue + '"]').length > 0 && multiarr.indexOf(resValue) == -1)
                                    multiarr.push(resValue);
                            }
                        }
                        if (multiarr.length > 0)
                            ChosenOrder.setSelectionOrder($('#' + vMultiDDL1), multiarr, true);
                    }
                    resValue = "";
                    vMultiDDL1 = "";
                    multiarr = [];
                }
                str = "";

            }
        }
    }
}

function getworkflowrules() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/Workflow/WorkflowRules',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': vAPIKey },
        success: function (data) {
            var vCount = data.WorkflowRules.length;
            for (var j = 0; j < vCount; j++) {
                var item = data.WorkflowRules[j];
                var participantsInXML = item.ParticipantsInXML;
                $(participantsInXML).find('WorkflowPaticipant').each(function () {
                    var StageTitle = $(this).find('StageTitle').text();
                    if (StageName.indexOf(StageTitle) === -1) {
                        StageName.push(StageTitle);
                    }
                });
            }
        },
    });
}

function BindMilestone(contractid) {
    if (contractid == null || contractid == "") { contractid = vContractID; }
    //*Harshitha
    var completeArticle = '';
    articleMileStone = '';
    $("#ulMilestoneBody").empty();
    //*Harshitha

    var count = 0;
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "2" && n.Status == "ON");
    });


    if (vAccFeat.length > 0) {
        BindObligationMilestones(contractid, count);
    }

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/milestones?contractid=' + contractid,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': vAPIKey },
        cache: false,
        success: function (contactsJsonPayload) {
            $(contactsJsonPayload).each(function (i, item) {
                count++;
                var vMilestoneDate = '';
                var vMilestStatus = '';
                if (item.MilestoneDate != null) {
                    var duedate;
                    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                    { duedate = item.MilestoneDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                    else {
                        if (localStorage.AppDateFormat == 'DD/MM/YYYY') { duedate = item.MilestoneDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1'); }
                        else if (localStorage.AppDateFormat == 'MM/DD/YYYY') { duedate = item.MilestoneDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                    }

                    vMilestoneDate = duedate != "" ? (duedate + ': ') : "";
                    var MilestoneDate = new Date(item.MilestoneDate);
                    var currentDate = new Date();
                    var dateOne = new Date(MilestoneDate.getFullYear(), MilestoneDate.getMonth(), MilestoneDate.getDate(), 00, 00, 00); //Year, Month, Date
                    var dateTwo = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 00, 00, 00); //Year, Month, Date
                    if (dateOne < dateTwo)
                        vMilestStatus = '<b class="milestone-Delayed" title="DELAYED"><img src="/Content/Images/status/exp.png"> Dly</b>';
                    else if (dateOne >= dateTwo)
                        vMilestStatus = '<b class="milestone-Upcoming" title="UPCOMING"><img src="/Content/Images/status/renew.png"> Upco</b>';
                }
                var article = '';
                if (count <= 5)
                    article = '<li class="margin-bottom-8 WrapText_h2" title="Milestone">';
                else
                    article = '<li class="ShowMoreMilestones margin-bottom-8 WrapText_h2" style="display:none;" title="Milestone">';
                article += '<label id="MilestoneID" style="display:none;">' + item.RowKey + '</label>';
                article += '<label id="MilestoneTitle" style="display:none;">' + item.MilestoneTitle + '</label>';
                article += '<label id="MilestoneCompleted" style="display:none;">' + item.MilestoneCompleted + '</label>';

                if (item.MilestoneCompleted == "Yes" || item.MilestoneCompleted == "yes") {
                    vMilestStatus = '<b class="milestone-Complete" title="COMPLETED"><img src="/Content/Images/status/tick.png"> Comp</b>';

                    if (item.MilestoneDate != null) {
                        //article += '<input type="checkbox" style="margin-right: 0px;vertical-align: middle;" class="delmilestone" id="' + item.RowKey + '"  name="chkmilestone" onclick="checkMultipleMilestonesNewMul(this);" value=' + item.RowKey + ' /> ';
                    }
                    // article += vMilestStatus;
                    article += '<img style="width: 14px; vertical-align: sub;pointer-events: none; margin-right: 2px;" title="Milestone" src="/Content/Images/cal-icon.png">';
                    article += '<span class="DateToSort" style="color: black;"> ' + vMilestoneDate + '</span>';
                    article += '<a href="javascript:void(0)" style="color:#555555;" onclick="ViewMilestineDetail(\'' + item.RowKey + '\')"><del>' + item.MilestoneTitle + '</del></a>';
                }
                else {
                    if (item.MilestoneDate != null) {
                        //article += '<input type="checkbox"  style="margin-right: 0px;vertical-align: middle;" id="' + item.RowKey + '"  name="chkmilestone" onclick="checkMultipleMilestonesNewMul(this);" value=' + item.RowKey + ' /> ';
                    }
                    // article += vMilestStatus;
                    article += '<img style="width: 14px; vertical-align: sub;pointer-events: none; margin-right: 2px;" title="Milestone" src="/Content/Images/cal-icon.png">';
                    article += '<span class="DateToSort" style="color: black;"> ' + vMilestoneDate + '</span>';
                    article += '<a href="javascript:void(0)" style="color:#555555;" onclick="ViewMilestineDetail(\'' + item.RowKey + '\')">' + item.MilestoneTitle + '</a>';
                }
                //article += '&nbsp;<img src="/Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuMilestone"/>';

                article += '</li>';
                completeArticle += article;

            });
            articleMileStone = completeArticle;
            //*Harshitha
            $("#ulMilestoneBody").append(completeArticle);
            //
            if (count > 5) {
                var more = count - 5;
                $("#dvMilestone").html('<a id="ShowMoreMilestones" href="javascript:void(0);" class="pad-all close1" onclick="ShowMoreMilestones()">' + more + ' More Milestone(s) </a>' +
                                          '<a id="ShowLessMilestones" href="javascript:void(0);" class="pad-all close1" onclick="ShowLessMilestones()" style="display:none;">Show less</a>');
            } else {
                $("#dvMilestone").html('');
            }

            $("#lblMilestonesCount").text(count);

            $(".openmenuMilestone").contextMenu({
                menu: 'dropdownMenu', leftButton: true
            },
            function (action, el, pos) {
                contextMenuMilestone(action, el.parent("li"), pos);
            });

            if (count == 0) {
                $("#ulMilestoneBody").append('No items found.');
                $("#dvMilestone").html('');
            }
            else {
            }

        },
        error: function (request) {
            //*Harshitha
            if (completeArticle != '') {
                $("#ulMilestoneBody").append(completeArticle);
                $('#ulMilestoneBody > li').sort(sortDescending).appendTo('#ulMilestoneBody');

                if (count > 5) {
                    var more = count - 5;
                    $("#dvMilestone").html('<a id="ShowMoreMilestones" href="javascript:void(0);" class="pad-all close1" onclick="ShowMoreMilestones()">' + more + ' More Milestone(s) </a>' +
                                              '<a id="ShowLessMilestones" href="javascript:void(0);" class="pad-all close1" onclick="ShowLessMilestones()" style="display:none;">Show less</a>');
                } else {
                    $("#dvMilestone").html('');
                }

                articleMileStone = completeArticle;
                $("#lblMilestonesCount").text(count);

                $(".openmenuMilestone").contextMenu({ menu: 'dropdownMenu', leftButton: true }, function (action, el, pos) { contextMenuMilestone(action, el.parent("li"), pos); });

            }
            else {
                $("#lblMilestonesCount").text('0');
                $("#ulMilestoneBody").append('No items found.');
                $("#dvMilestone").html('');
            }
        },
        complete: function () {
            BindSystemMilestoneTest(articleSystemMileStone, articleDocumentMileStone, articleMileStone, articleObligationMileStone);
            pendingStarted = false;
            //GetContractPendingAction(false);

        }
    });

}

function BindObligationMilestones(contractid, subCount) {
    var completeArticle = '';
    var sbcount = subCount;
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/obligations/obligationsNew?contractid=' + contractid,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': vAPIKey },
        cache: false,
        //async: false,
        success: function (contactsJsonPayload) {
            articleObligationMileStone = "";
            $(contactsJsonPayload).each(function (i, item) {
                var vDocValidDate = '';
                if (item.DueDate != null) {
                    sbcount++;
                    var Validdate;

                    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                    { Validdate = item.DueDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                    else {
                        if (localStorage.AppDateFormat == 'DD/MM/YYYY') { Validdate = item.DueDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1'); }
                        else if (localStorage.AppDateFormat == 'MM/DD/YYYY') { Validdate = item.DueDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                    }
                    vDocValidDate = '' + Validdate + '';

                    var article = '';
                    if (sbcount <= 5)
                        article = '<li class=" margin-bottom-8 WrapText_h2" title="Obligation">';
                    else
                        article = '<li class="ShowMoreMilestones margin-bottom-8 WrapText_h2" style="display:none;" title="Obligation">';
                    article += '<img style="width: 14px; vertical-align:text-top;pointer-events: none; margin-right: 2px;" title="Obligation" src="/Content/Images/obligation.png">';
                    if (vDocValidDate != '') {
                        article += '<span class="DateToSort" style="color:black"> ' + vDocValidDate + ': </span>';
                    }
                    article += '<span  style="color:#555555">' + item.ObligationTitle + '</span>';


                    var beforeDaysSort = [];
                    var afterDaysSort = [];
                    var beforeDays = '';
                    var afterDays = '';
                    var $rem = [item.Reminder1, item.Reminder2, item.Reminder3];
                    var $remCond = [item.Reminder1Condition, item.Reminder2Condition, item.Reminder3Condition];
                    $.each($remCond, function (i, item) {
                        if ($rem[i] != 0 && $rem[i] != "" && $rem[i] != null) {
                            if (item == 'before') {
                                beforeDaysSort.push($rem[i]);
                            }
                            else if (item == 'after') {
                                afterDaysSort.push($rem[i]);
                            }
                        }
                    });
                    beforeDays = beforeDaysSort.sort(function (a, b) {
                        if (isNaN(a) || isNaN(b)) {
                            return a > b ? 1 : -1;
                        }
                        return a - b;
                    });;
                    afterDays = afterDaysSort.sort(function (a, b) {
                        if (isNaN(a) || isNaN(b)) {
                            return a > b ? 1 : -1;
                        }
                        return a - b;
                    });;
                    if (beforeDays != '' || afterDays != '') {
                        article += '<span class="sub-text-head"> (Reminders ' + (beforeDays != '' ? beforeDays + ' day(s) before' : '') + (afterDays != '' ? (beforeDays != '' ? ' & ' + afterDays + ' day(s) after )' : afterDays + ' day(s) after ) ') : ')') + '</span>';
                    }
                    article += '</li>';
                    articleObligationMileStone += article;
                }
            });
        },
        error: function (request) {
        },
        complete: function () {
            BindSystemMilestoneTest(articleSystemMileStone, articleDocumentMileStone, articleMileStone, articleObligationMileStone);
        }

    });


}

function GetInnerFeatures() {
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "10" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        $(".FL_Catalog").css('display', '');
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
        return (n.RowKey == "17" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        $(".FL_TermsClauses").css('display', '');
    } else {
        $(".FL_TermsClauses").css('display', 'none');
    }
}

function ShowTabDetail(TabName) {
    if (TabName == "Summary") {
        $('.info-box-main-body').css("display", "none");
        $('#tabSummaryDetail').css("display", "");

        $(".contracttab").removeClass("active");
        $("#tabSummary").addClass("active");
    }
    else if (TabName == "Activity") {
        $('.info-box-main-body').css("display", "none");
        $('#tabActivityDetail').css("display", "");

        $(".contracttab").removeClass("active");
        $("#tabActivity").addClass("active");
    }
    else if (TabName == "Catalog") {
        $('.info-box-main-body').css("display", "none");
        $('#tabCatalogDetail').css("display", "");

        $(".contracttab").removeClass("active");
        $("#tabCatalog").addClass("active");
    }
    else if (TabName == "Transactions") {
        $('.info-box-main-body').css("display", "none");
        $('#tabTransactionsDetail').css("display", "");

        $(".contracttab").removeClass("active");
        $("#tabTransactions").addClass("active");
    }
    else if (TabName == "Obligation") {
        $('.info-box-main-body').css("display", "none");
        $('#tabObligationNewDetail').css("display", "");

        $(".contracttab").removeClass("active");
        $("#tabObligation").addClass("active");
    }
    else if (TabName == "Notes") {
        $('.info-box-main-body').css("display", "none");
        $('#tabNotesDetail').css("display", "");

        $(".contracttab").removeClass("active");
        $("#tabNotes").addClass("active");
    }
    else if (TabName == "TermsClause") {
        $('.info-box-main-body').css("display", "none");
        $('#tabTermsClauseDetail').css("display", "");

        $(".contracttab").removeClass("active");
        $("#tabTermsClause").addClass("active");
    }
    else if (TabName == "Documents") {
        $('.info-box-main-body').css("display", "none");
        $('#tabDocumentsDetail').css("display", "");

        $(".contracttab").removeClass("active");
        $("#tabDocuments").addClass("active");
    }
    else if (TabName == "DocumentView") {
        $('.info-box-main-body').css("display", "none");
        $('#tabDocumentViewDetail').css("display", "");

        $(".contracttab").removeClass("active");
        $("#tabDocumentView").addClass("active");
    }
    else if (TabName == "Amendment") {
        if ($('#ulAmendment li').length == 0) {
            BindAmendments(vContractID);
        }

        $('.info-box-main-body').css("display", "none");
        $('#tabAmendmentDetail').css("display", "");

        $(".contracttab").removeClass("active");
        $("#tabAmendment").addClass("active");
    }
    else if (TabName == "Correspondence") {
        if ($('#ulCorrespondence li').length == 0)
            BindCorrespondence(vContractID);

        $('.info-box-main-body').css("display", "none");
        $('#tabCorrespondenceDetail').css("display", "");

        $(".contracttab").removeClass("active");
        $("#tabCorrespondence").addClass("active");
    }
}

function getcontracttypemetadata(strcontracttype) {
    GetallMetadataWithCT = [];   //ENH485  Featured metadata
    GetallFinancialMetadataWithCT = [];
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/contracttypes/metadatas?contracttypename=' + encodeURIComponent(strcontracttype),
        type: 'GET',
        dataType: 'json',
        headers: {
            'eContracts-ApiKey': vAPIKey
        },
        cache: false,
        success: function (metadataFields) {
            //manoj
            var FeaturedMetadataFilter = $.grep(metadataFields, function (item, i) {
                return item.FeaturedMetadata == "true";
            });
            //manoj
            GetallMetadataWithCT = FeaturedMetadataFilter;  //ENH485  Featured metadata

            //manoj
            FeaturedMetadataFilter = $.grep(metadataFields, function (item, i) {
                return item.FinancialField == "true";
            });
            //manoj
            GetallFinancialMetadataWithCT = FeaturedMetadataFilter;
            var numberexists = '';
            $(metadataFields).each(function (i, item) {
                if (item.FieldName == "ContractNumber") {
                    numberexists = $(icontractItem).find(item.FieldName).text();
                }
            });
            $("#trContractMetadataNumber").css('display', '');
            if (numberexists != '') {
                $("#trContractMetadataNumber").prop("title", numberexists);
            } else {
                $('#summCNumber').text('Not Available');
            }
            if (MethodCount == 0) {
                icontractdetails();  //ENH485  Featured metadata
            }
            else {
                showMetadataWithFeaturedMeta();
            }
        }
    });
}

function getcontractsummerytemplate(ContractType, SummeryBlobURL, action) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/summerytemplatebyctype?contype=' + encodeURIComponent(ContractType),
        type: 'GET',
        dataType: 'json',
        cache: false,
        headers: {
            'eContracts-ApiKey': vAPIKey
        },
        //contentType: false,
        success: function (SummeryTemp) {
            if (action) {
                if (contractItem.Status != "Cancelled") {
                    var SummeryDocumentName = SummeryBlobURL.split('_');
                    $("#iStandardIcon").html('<label id="lblsummerydocumentpath" style="display:none"> ' + SummeryBlobURL + '</label><img src="/Content/Images/status/cover_sheet.png" alt="Contract Cover Sheet" title="Contract Cover Sheet" class="openmenusummerydocument" />');
                    //manoj
                    $(".openmenusummerydocument").contextMenu({
                        menu: 'dropdownMenuSummery', leftButton: true
                    }, function (action, el, pos) {
                        contextMenuSummeryDocument(action, el.parent("i"), pos);
                    });
                    if (contractItem.Permission != "View" && contractItem.Status != "Archived" && contractItem.Status != "Expired") {
                        $(".clCoverSheet").css("display", "");
                        $("#hdnsummeryTempDocu").text("Yes");
                        $("#lisummarydocument").css("display", "");
                    } else {
                        $(".clCoverSheet").css("display", "none");
                        $("#hdnsummeryTempDocu").text("No");
                        $("#lisummarydocument").css("display", "none");
                    }
                }
            }
            else if (contractItem.Permission != "View" && contractItem.Status != "Cancelled" && contractItem.Status != "Archived" && contractItem.Status != "Expired") {
                $("#iStandardIcon").html('<img src="/Content/Images/status/cover_sheet.png" alt="Contract Cover Sheet" title="Contract Cover Sheet" class="dropdownMenuGenerateSummery" />');
                $(".dropdownMenuGenerateSummery").contextMenu({
                    menu: 'dropdownMenuGenerateSummery', leftButton: true
                }, function (action, el, pos) {
                    contextMenuSummeryDocument(action, el.parent("i"), pos);
                });
                $("#hdnsummeryTempDocu").text("No");
                $("#lisummarydocument").css("display", "none");
            } else {
                $("#iStandardIcon").empty();
                $("#hdnsummeryTempDocu").text("No");
                $("#lisummarydocument").css("display", "none");
            }
        },
        error: function (SummeryTemp) {
            if (action) {
                var SummeryDocumentName = SummeryBlobURL.split('_');
                $("#iStandardIcon").html('<label id="lblsummerydocumentpath" style="display:none"> ' + SummeryBlobURL + '</label><img src="/Content/Images/status/cover_sheet.png" alt="Contract Cover Sheet" title="Contract Cover Sheet" class="openmenusummerydocument" />');
                //manoj
                $(".openmenusummerydocument").contextMenu({
                    menu: 'dropdownMenuSummery', leftButton: true
                }, function (action, el, pos) {
                    contextMenuSummeryDocument(action, el.parent("i"), pos);
                });
                $(".clCoverSheet").css("display", "none");
                //manoj
                if (contractItem.Permission != "View") {
                    $("#hdnsummeryTempDocu").text("Yes");
                    $("#lisummarydocument").css("display", "");
                } else {
                    $("#hdnsummeryTempDocu").text("No");
                    $("#lisummarydocument").css("display", "none");
                }
                //manoj
            } else {
                $("#iStandardIcon").empty();
                $("#hdnsummeryTempDocu").text("No");
                $("#lisummarydocument").css("display", "none");
            }
        }
    });
}

function contextMenuSummeryDocument(action, el, pos) {
    switch (action) {
        case 'editO365': {
            ViewSummeryDocument($(el).find("#lblsummerydocumentpath").text());
            break;
        }
        case 'download': {
            var LinkURL = decodeURIComponent($(el).find("#lblsummerydocumentpath").text());
            location = LinkURL;
            break;
        }
    }
}

function ViewSummeryDocument(docurl) {
    srcurl = "https://view.officeapps.live.com/op/embed.aspx?src=" + docurl + "?" + randomString() + "=" + randomString() + "&wdStartOn=1";
    window.open(srcurl);
}

function BindCorrespondence(contractid) {
    if (contractid == null || contractid == "") { contractid = vContractID; }
    $("#ulCorrespondence").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/correspondence/Contracts/' + contractid,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': vAPIKey },
        cache: false,
        success: function (contactsJsonPayload) {
            var count = 0;
            $(contactsJsonPayload).each(function (i, item) {
                count++;

                var article = '';
                if (count <= 5)
                    article = '<li class="margin-bottom-8 WrapText_h2">';
                else
                    article = '<li class="ShowMoreCorrespondence margin-bottom-8 WrapText_h2" style="display:none;">';
                article += '<label id="RowKey" style="display:none;">' + item.RowKey + '</label>';
                article += '<label id="ContractID" style="display:none;">' + item.ContractID + '</label>';
                article += '<label id="ContractTitle" style="display:none;" class="PreserveSpace">' + item.ContractTitle + '</label>';
                article += '<label id="Subject" style="display:none;">' + item.Subject + '</label>';
                article += '<label id="URLLink" style="display:none;">' + item.BodyUrlOrigin + '</label>';
                article += '<a href="javascript:void(0)" onclick="ViewCorrespondenceDetail(\'' + item.RowKey + '\')">' + item.Subject + '</a>';

                article += '&nbsp;<img src="/Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuCorrespondence"/>';
                article += '</li>';
                $("#ulCorrespondence").append(article);


            });

            if (count > 5) {
                var more = count - 5;
                $("#dvCorrespondence").html('<a id="ShowMoreCorrespondence" href="javascript:void(0);" class="pad-all close1" onclick="ShowMoreCorrespondence()">' + more + ' More Correspondence </a>' +
                                     '<a id="ShowLessCorrespondence" href="javascript:void(0);" class="pad-all close1" onclick="ShowLessCorrespondence()" style="display:none;">Show less</a>');
            }

            $("#lblCorrespondenceCount").text(count);
            if (count == 0) {
                $("#ulCorrespondence").append('No items found.');
            }
            $(".openmenuCorrespondence").contextMenu({ menu: 'dropdownMenuCorrespondence', leftButton: true }, function (action, el, pos) { contextMenuCorrespondence(action, el.parent("li"), pos); });

        },
        error: function (request) {
            $("#lblCorrespondenceCount").text('0');
            $("#ulCorrespondence").append('No items found.');
        }

    });
}

function allowNumericsNewMonthly(field) {
    $(field).keypress(function (e) {

        var fieldValue = $(this).val();

        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {

            return false;
        }

        if (fieldValue == "") {
            fieldValue = 0;
        }
        if (e.which != 8 && e.which != 0) {
            if (typeof (String.fromCharCode(e.which)) != "undefined")
                fieldValue += String.fromCharCode(e.which);

            if (parseInt(fieldValue) > parseInt(dynamicOccCount)) {

                return false;
            }
        }
    });
}

function DisplayDocument(objvalue) {
    multipleChecksDocumentID = "";
    multipleChecksDocumentName = "";
    multipleChecksDocumentReview = "";
    selectedamnddoc = false;
    selectedamnddocname = [];
    $("#documentMultiActions").css('display', 'none');
    $("#hdnShowAllTextValue").html('');
    $("#hdnFolderDocumentView").text('');
    PrvFolderselection = '';
    $(".tablinks").removeClass('active');
    documentview = objvalue;
    if (objvalue == 'folder' || documentview == "" || documentview == null) {
        $("#listfolderdocumentview").addClass("active");
        //$("#btnaddnewsubfolder").css('display', '');
        if ((documentview == 'folder' || documentview == "" || documentview == null) && ($("#hdnPermission").val() == 'Manage' || $("#hdnPermission").val() == 'Contribute') && (!(contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived"))) {
            $("#btnaddnewsubfolder").css('display', '');
        } else {
            $("#btnaddnewsubfolder").css('display', 'none');
        }
        //ApplyPermissionToMenu($("#hdnPermission").val());
        $("#showAll").empty();
        $("#showAll").css('display', '');
        BindDocument(vContractID);
    } else {
        $("#listdocumentview").addClass("active");
        $("#btnaddnewsubfolder").css('display', 'none');
        if ($("#showAll").text().indexOf("/") >= 0) {
            bindfolderupload($("#showAll").find("a:first")[0])
        } else {
            $("#showAll").css('display', 'none');
        }
        $("#ulDocument").html('<img src="/Content/Images/icon/loading.gif"> Please wait...');
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/documents?contractid=' + vContractID,
            type: 'GET',
            dataType: 'json',
            'Content-Type': 'application/json',
            cache: false,
            headers: {
                'eContracts-ApiKey': vAPIKey
            },
            success: function (documentcollection) {
                var ParentFolderDatadata = $.grep(documentcollection, function (nparent, iparent) {
                    return (nparent.ParentFolderID == "" || nparent.ParentFolderID == null);
                });
                if (ParentFolderDatadata.length > 0) {
                    contractparentfolderid = ParentFolderDatadata.RowKey;
                } else {
                    contractparentfolderid = "";
                }
                var data = $.grep(documentcollection, function (n, i) {
                    return (n.IsFolder != "Yes");
                });
                if (data.length == 0) {
                    contractparentfolderid = "";
                    $("#lblDocumentsCount").text('0');
                    $("#documentsort").css('display', 'none');
                    $("#ulDocument").html('No items found.');
                } else {
                    $('#ulDocument').empty();
                    CreateDocumentListNew(data);
                    GetContractActivities(vContractID);
                }
            },
            error:
            function (data) {
                $("#lblDocumentsCount").text('0');
                $("#ulDocument").html('No items found.');
                $("#documentsort").css('display', 'none');
            },
            complete: function () {
            }
        });
    }
}

function BindDocument(contractid) {
    multipleChecksDocumentID = '';
    multipleChecksDocumentName = '';
    articleDocumentMileStone = '';
    $("#documentMultiActions").css('display', 'none');
    if (contractid == null || contractid == "") { contractid = vContractID; }

    $("#ulDocument").empty();
    $("#alertsListUpcomingDocument").empty();
    $("#ddlDocumentList").empty();
    $("#dvDocument").empty();
    DocumentCount = 0;
    $("#ulDocument").html('<img src="/Content/Images/icon/loading.gif"> Please wait...');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/documents/parentfolder?contractid=' + contractid,
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': vAPIKey },
        success: function (data) {
            //manoj
            $("#hdnContractDocumentsUrl").text(data.FolderUrl);
            $("#hdnContractDocumentsUrlFixed").text(data.FolderUrl);
            //manoj
            parentdocid = data.RowKey;
            parentdocname = data.DocumentName;
            $("#showAll").empty();
            $("#showAll").append('<a href="javascript:void(0)" id=' + parentdocid + ' onclick="javascript:showfolderdocuments(this);">' + parentdocname + '</a>');
            Folderselection = '<a href="javascript:void(0)" id=' + parentdocid + ' onclick="javascript:showfolderdocuments(this);">' + parentdocname + '</a>';
            $("#showAll").css('display', '');
            var parentdoc = { id: parentdocid, text: parentdocname };
            showfolderdocuments(parentdoc)
        },
        error: function (request) {
            $("#documentsort").css('display', 'none');
            //$("#ulFolderDocumentView").css('display', 'none');
            //$("#dvdocumentkeyword").css('display', 'none');
            $("#lblDocumentsCount").text('0');
            $("#ulDocumentLoading").css('display', 'none');
            $("#ulDocument").html('No items found.');
            $('.ShowMoreDocuments').css("display", "none");
            $('#ShowMoreDocuments').css("display", "none");
            $('#ShowLessDocuments').css("display", "none");
        }
    });
}

function bindfolderupload(parentfolderid) {
    multipleChecksDocumentID = "";
    multipleChecksDocumentName = "";
    multipleChecksDocumentReview = "";
    selectedamnddoc = false;
    selectedamnddocname = [];
    $("#documentMultiActions").css('display', 'none');
    var Istagexist = false;
    $("#showAll").find("a").each(function (e) {
        var tid = this.id;
        if (tid == parentfolderid.id) {
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
                if (splitsection[spl].indexOf(parentfolderid.id) > -1) {
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


    if ($("#showAll").text().indexOf("/") >= 0) {
        var texttille = parentfolderid.id
        Istagexist = false;
        $("#showAll").find("a").each(function (e) {
            var tid = this.id;
            if (tid == parentfolderid.id) {
                Istagexist = true;
            }
        });
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
                if (id == parentfolderid.id) {
                    Isexist = true;
                }
            });
            if (!Isexist) {
                $("#showAll").append(' / <img src="/Content/Images/icon/folder_open.png" style="margin-right: 5px;"><a href="javascript:void(0)" id=' + parentfolderid.id + ' onclick="javascript:showfolderdocuments(this);">' + parentfolderid.text + '</a>');
                Folderselection += ' ~8Y92YagH <img src="/Content/Images/icon/folder_open.png" style="margin-right: 5px;"><a href="javascript:void(0)" id=' + parentfolderid.id + ' onclick="javascript:showfolderdocuments(this);">' + parentfolderid.text + '</a>';
            }
            $("#showAll").css('display', 'none');
        }
    } else {
        $("#showAll").empty();
        if (parentdocid == parentfolderid.id) {
            $("#showAll").append('<img src="/Content/Images/icon/folder_open.png" style="margin-right: 5px;"><a href="javascript:void(0)" id=' + parentdocid + ' onclick="javascript:showfolderdocuments(this);">' + parentdocname + '</a>');
            Folderselection = '<img src="/Content/Images/icon/folder_open.png" style="margin-right: 5px;"><a href="javascript:void(0)" id=' + parentdocid + ' onclick="javascript:showfolderdocuments(this);">' + parentdocname + '</a>';
        } else {
            $("#showAll").append('<img src="/Content/Images/icon/folder.png" style="margin-right: 5px;"><a href="javascript:void(0)" id=' + parentdocid + ' onclick="javascript:showfolderdocuments(this);">' + parentdocname + '</a> / <img src="/Content/Images/icon/folder_open.png" style="margin-right: 5px;"><a href="javascript:void(0)" id=' + parentfolderid.id + ' onclick="javascript:showfolderdocuments(this);">' + parentfolderid.text + '</a>');
            Folderselection = '<img src="/Content/Images/icon/folder.png" style="margin-right: 5px;"><a href="javascript:void(0)" id=' + parentdocid + ' onclick="javascript:showfolderdocuments(this);">' + parentdocname + '</a> ~8Y92YagH <img src="/Content/Images/icon/folder_open.png" style="margin-right: 5px;"><a href="javascript:void(0)" id=' + parentfolderid.id + ' onclick="javascript:showfolderdocuments(this);">' + parentfolderid.text + '</a>';
        }

        $("#showAll").css('display', 'none');
    }
}

function CreateDocumentListNew(data) {
    var NotActiveStatusDocument = $.grep(data, function (n, i) {
        return (n.IsActive == "No");
    });
    var DefaultDocLength = ($("#hdnnewdocumentfeature").text() == "Yes") ? 20 : 10;
    articleDocumentMileStone = "";
    var vFinalSignature = "dropdownMenuFinal";
    var vMarkFinalSignature = "dropdownMenuMarkFinal";
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "1" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        vFinalSignature = "dropdownMenuFinalSignature";
        vMarkFinalSignature = "dropdownMenuMarkFinalSignature";
        if (contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute') {
            $("#dropdownMenuAmendment .signature").show();
            $("#dropdownMenuAmendmentFinal .signature").show();
        }
        else {
            $("#dropdownMenuAmendment .signature").hide();
            $("#dropdownMenuAmendmentFinal .signature").hide();
        }

    }
    else {
        $("#dropdownMenuAmendment .signature").hide();
        $("#dropdownMenuAmendmentFinal .signature").hide();
    }
    var vGetTime = new Date();
    $.ajax({
        url: '/Documents/GetTime',
        type: 'GET',
        dataType: 'json',
        cache: false,
        success: function (data) {
            var jsObject = JSON.parse(data);
            vGetTime = new Date(jsObject);
        }
    });

    var count = 0;
    var vPermission = $("#hdnPermission").val();

    var settings = {
        pattern: /\.[0-9a-z]+$/i,
        knownFileTypes: ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'zip', 'rar', 'gzip', 'arj', 'wav', 'mp3', 'aif', 'aiff', 'm4a', 'ogg', 'wma', 'psd', 'ai', 'swf', 'fla', 'css', 'js', 'avi', 'mov', 'wmv', 'dotx'],
        WopiFrameFileTypes: ['doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx', 'dotx']
    };
    var datalenght = data.length;

    $("#ulDocument").empty();
    var vTitle = '';
    var article = '';
    var articleSubFolder = '';
    if (datalenght > 0) {
        for (var vi = 0; vi < datalenght; vi++) {
            if (data[vi].ContractArea != "") {
                docdefaultview(data[vi].ContractArea);
                break;
            }
        }
    }
    var DocDefaultView = "";
    if (thisDocumentLibrarySettings != '' && thisDocumentLibrarySettings != 'undefined' && typeof thisDocumentLibrarySettings != "undefined") {
        DocDefaultView = thisDocumentLibrarySettings.DocDefaultView;
        DocVersion = thisDocumentLibrarySettings.DocVersion;
    }

    for (var i = 0; i < datalenght; i++) {
        var item = data[i];
        //manoj
        if (item.IsOCRDoc == "Yes" && item.DocumentName.split('.').pop().toString().toLowerCase().indexOf('tif') > -1) {
            var OldDocumentName = item.DocumentName;
            item.DocumentName = item.DocumentName.split('.').slice(0, -1).join('.') + ".pdf";
            item.DocumentUrl = item.DocumentUrl.split('.').slice(0, -1).join('.') + ".pdf"
        }
        //manoj
        var vv = moment(new Date(item.Modified));
        var vTime = vv.fromNow();
        //vTime = vv.from(vGetTime);

        count++
        if (item.IsFolder == "True") {
            articleSubFolder += '<li class=" margin-bottom-5"><b title="Folder" style="background-color: #888; " class="status_blue details_documentstatus">Folder</b><img src="/Content/Images/icon/folder.png" style="margin-top: -5px; margin-right: 7px;"><a style="display: inline-block; margin: 3px 0px 0px 0px;" href="javascript:void(0)" id=' + item.RowKey + ' onclick="javascript:showfolderdocuments(this);">' + item.DocumentName + '</a><span class="sub-text"> ' + vTime + '</span>';
            articleSubFolder += '<label id="DocumentID" style="display:none;">' + item.RowKey + '</label>';
            articleSubFolder += '<label id="FolderCreationMode" style="display:none;">' + item.CreationMode + '</label>';
            articleSubFolder += '<label id="DocumentName" style="display:none;">' + item.DocumentName + '</label>';
            if (contractItem.Status != "Expired" && contractItem.Status != "Cancelled" && contractItem.Status != "Replaced" && contractItem.Status != "Archived" && contractItem.Permission != "View" && contractItem.Permission != '' && contractItem.Permission != null) {
                articleSubFolder += '&nbsp;<img src="/Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuFolder margin-left-5">';
            }
            articleSubFolder += '</li>';
        } else {
            var vClass = "openmenuDocumentFinal";
            var vDocIcon = "";// '<img src="/Content/Images/Doc_draft.png" class="doc_type margin-left-5" alt="Draft Document" title="Draft Document" />';
            var vPrimDocIcon = '';
            if (item.IsFinalized == "Yes") {
                vClass = "openmenuDocument";
                vDocIcon = '<img src="/Content/Images/icon/final_doc.png" class="doc_type margin-left-5" alt="Finalized Document" title="Finalized Document" />';
                if (item.CreationMode == "Amendment") {
                    vClass = "openmenuAmendmentDocumentFinal";
                    vDocIcon += '<img src="/Content/Images/amendments.png" style="height:16px; width:16px;" class="doc_type margin-left-5" alt="Amendment Document" title="Amendment Document" />';
                }
            } else if (item.CreationMode == "Amendment") {
                vClass = "openmenuAmendmentDocument";
                vDocIcon = '<img src="/Content/Images/amendments.png" style="height:16px; width:16px;" class="doc_type margin-left-5" alt="Amendment Document" title="Amendment Document" />';
            }
            //manoj
            if (item.IsPined == "Yes" && item.IsPrimary != "Yes") {
                vClass += "UnPin";
            }
            if (item.IsPrimary == "Yes") {
                vPrimDocIcon = '<img src="/Content/Images/primary_doc.png" class="doc_type margin-left-5" alt="Primary Document" title="Primary Document" />';
                vClass += "UnPin" + " hideItem primarydocument";
            } else {
                vClass += " showitem";
            }
            // Bug (eO37060, eO37244)
            if (item.DocumentStatus == "Expired" || contractItem.IsDraft == "Yes" || contractItem.Status == "Expired"
                || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived") {
                vClass = "openmenuExpiredDocument";
            }
            //manoj
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

            if (count <= DefaultDocLength)
                article += '<li class=" margin-bottom-5" active=' + item.IsActive + '>';
            else
                article += '<li class="ShowMoreDocuments margin-bottom-5" style="display:none;">';

            article += '<label id="FolderCreationMode" style="display:none;">' + item.CreationMode + '</label>';
            article += '<label id="DocumentID" style="display:none;">' + item.RowKey + '</label>';
            article += '<label id="SentForSign" style="display:none;">' + item.SentForSign + '</label>';
            article += '<label id="DocumentName" style="display:none;">' + item.DocumentName + '</label>';
            article += '<label id="ShareWorkflow" style="display:none;">' + item.ShareWorkflow + '</label>';
            article += '<label id="ReviewWorkflow" style="display:none;">' + item.ReviewWorkflow + '</label>';
            article += '<label id="BusinessArea" style="display:none;">' + item.BusinessArea + '</label>';
            article += '<label id="IsFinalized" style="display:none;">' + item.IsFinalized + '</label>';
            var primarydocchecking = (item.IsPrimary != null && item.IsPrimary != "") ? item.IsPrimary : "No";
            article += '<label id="IsPrimaryDoc" style="display:none;">' + primarydocchecking + '</label>';

            if (item.CreationMode == "Amendment") {
                article += '<label id="AmendmentID" style="display:none;">' + item.AmendmentID + '</label>';
            }
            //if (item.IsActive != 'No') {
            //    article += '<input type="checkbox" id="' + item.RowKey + '" name="MultipleDocuments" class="Contribute" onclick="checkMultipleDocuments(this);" value=' + item.RowKey + ' /> ';
            //} else {
            //    article += '<input type="checkbox" id="' + item.RowKey + '" name="MultipleDocuments" class="Contribute" style="visibility:hidden;" onclick="checkMultipleDocuments(this);" value=' + item.RowKey + ' /> ';
            //}

            switch (item.DocumentStatus) {
                case "New":
                    if (contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Archived" || ((contractItem.ReadOnlyPermissions.indexOf(localStorage.UserName) > -1) && (!localStorage.UserType.indexOf("Global Contract Owner") >= 0)) || !(contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute'))
                        article += '<b title="New" style="cursor:default" id="' + item.RowKey + '" class="status_green_another details_documentstatus"><img src="/Content/Images/status/new.png" class="margin-right-5" style="cursor:default">new</b>';
                    else
                        article += '<b title="New" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_green_another details_documentstatus"><img src="/Content/Images/status/new.png" class="margin-right-5">new</b>';
                    break;
                case "Ready for Signature":
                    if (contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Archived" || ((contractItem.ReadOnlyPermissions.indexOf(localStorage.UserName) > -1) && (!localStorage.UserType.indexOf("Global Contract Owner") >= 0)) || !(contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute'))
                        article += '<b title="Ready for Signature" style="cursor:default" id="' + item.RowKey + '" class="status_green details_documentstatus"><img src="/Content/Images/status/active.png" class="margin-right-5" style="cursor:default">sign</b>';
                    else
                        article += '<b title="Ready for Signature" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_green details_documentstatus"><img src="/Content/Images/status/active.png" class="margin-right-5">sign</b>';
                    break;
                case "Awaiting Signatures":
                    if (contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Archived" || ((contractItem.ReadOnlyPermissions.indexOf(localStorage.UserName) > -1) && (!localStorage.UserType.indexOf("Global Contract Owner") >= 0)) || !(contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute'))
                        article += '<b title="Awaiting Signatures" style="cursor:default" id="' + item.RowKey + '" class="status_yellow details_documentstatus"><img src="/Content/Images/status/renew.png" class="margin-right-5" style="cursor:default">sign</b>';
                    else
                        article += '<b title="Awaiting Signatures" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_yellow details_documentstatus"><img src="/Content/Images/status/renew.png" class="margin-right-5">sign</b>';
                    break;
                case "Active":
                    if (contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Archived" || ((contractItem.ReadOnlyPermissions.indexOf(localStorage.UserName) > -1) && (!localStorage.UserType.indexOf("Global Contract Owner") >= 0)) || !(contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute'))
                        article += '<b title="Active" style="cursor:default" id="' + item.RowKey + '" class="status_green details_documentstatus"><img src="/Content/Images/status/active.png" class="margin-right-5" style="cursor:default">actv</b>';
                    else
                        article += '<b title="Active" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_green details_documentstatus"><img src="/Content/Images/status/active.png" class="margin-right-5">actv</b>';
                    break;
                case "Signed":
                    if (contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Archived" || ((contractItem.ReadOnlyPermissions.indexOf(localStorage.UserName) > -1) && (!localStorage.UserType.indexOf("Global Contract Owner") >= 0)) || !(contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute'))
                        article += '<b title="Signed" style="cursor:default" id="' + item.RowKey + '" class="status_blue details_documentstatus"><img src="/Content/Images/status/tick.png" class="margin-right-5" style="cursor:default">Sign</b>';
                    else
                        article += '<b title="Signed" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_blue details_documentstatus"><img src="/Content/Images/status/tick.png" class="margin-right-5">Sign</b>';
                    break;
                case "Expired":
                    if (contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Archived" || ((contractItem.ReadOnlyPermissions.indexOf(localStorage.UserName) > -1) && (!localStorage.UserType.indexOf("Global Contract Owner") >= 0)) || !(contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute'))
                        article += '<b title="Expired" style="cursor:default" id="' + item.RowKey + '" class="status_Gray details_documentstatus"><img src="/Content/Images/status/expried.png" class="margin-right-5" style="cursor:default">exp</b>';
                    else
                        article += '<b title="Expired" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_Gray details_documentstatus"><img src="/Content/Images/status/expried.png" class="margin-right-5">exp</b>';
                    break;
                case "Awaiting Review":
                    if (contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Archived" || ((contractItem.ReadOnlyPermissions.indexOf(localStorage.UserName) > -1) && (!localStorage.UserType.indexOf("Global Contract Owner") >= 0)) || !(contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute'))
                        article += '<b title="Awaiting Review" style="cursor:default" id="' + item.RowKey + '" class="status_yellow details_documentstatus"><img src="/Content/Images/status/renew.png" class="margin-right-5" style="cursor:default">Rev</b>';
                    else
                        article += '<b title="Awaiting Review" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_yellow details_documentstatus"><img src="/Content/Images/status/renew.png" class="margin-right-5">Rev</b>';
                    break;
                case "Reviewed":
                    if (contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Archived" || ((contractItem.ReadOnlyPermissions.indexOf(localStorage.UserName) > -1) && (!localStorage.UserType.indexOf("Global Contract Owner") >= 0)) || !(contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute'))
                        article += '<b title="Reviewed" style="cursor:default" id="' + item.RowKey + '" class="status_blue details_documentstatus"><img src="/Content/Images/status/tick.png" class="margin-right-5" style="cursor:default">Rev</b>';
                    else
                        article += '<b title="Reviewed" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_blue details_documentstatus"><img src="/Content/Images/status/tick.png" class="margin-right-5">Rev</b>';
                    break;
                case "In Negotiation":
                    if (contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Archived" || ((contractItem.ReadOnlyPermissions.indexOf(localStorage.UserName) > -1) && (!localStorage.UserType.indexOf("Global Contract Owner") >= 0)) || !(contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute'))
                        article += '<b title="In Negotiation" style="cursor:default" id="' + item.RowKey + '" class="status_yellow details_documentstatus"><img src="/Content/Images/status/renew.png" class="margin-right-5" style="cursor:default">nego</b>';
                    else
                        article += '<b title="In Negotiation" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_yellow details_documentstatus"><img src="/Content/Images/status/renew.png" class="margin-right-5">nego</b>';
                    break;
                case "Negotiation Complete":
                    if (contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Archived" || ((contractItem.ReadOnlyPermissions.indexOf(localStorage.UserName) > -1) && (!localStorage.UserType.indexOf("Global Contract Owner") >= 0)) || !(contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute'))
                        article += '<b title="Negotiation Complete" style="cursor:default" id="' + item.RowKey + '" class="status_blue details_documentstatus"><img src="/Content/Images/status/tick.png" class="margin-right-5" style="cursor:default">nego</b>';
                    else
                        article += '<b title="Negotiation Complete" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_blue details_documentstatus"><img src="/Content/Images/status/tick.png" class="margin-right-5">nego</b>';
                    break;
            }
            vTitle = item.DocumentName;
            if (vTitle.length > 61)
            { vTitle = vTitle.substring(0, 60) + '...'; }
            if (item.IsActive == "No") {
                if (item.CreationMode == "Template") {
                    article += vFileType + '<a data-value="' + encodeURI(item.DocumentUrl) + '" href="javascript:void(0);" title="' + item.DocumentName + '" onclick="ViewDocument(\'' + encodeURI(item.DocumentUrl) + '\')" style="pointer-events: none;" >' + item.DocumentName + '</a><img src="/Content/Images/new_item.png" alt="New" title="New">';
                } else {
                    article += vFileType + '<a data-value="' + encodeURI(item.DocumentUrl) + '" href="javascript:void(0);" title="' + item.DocumentName + '" onclick="ViewDocument(\'' + encodeURI(item.DocumentUrl) + '\')" >' + item.DocumentName + '</a><img src="/Content/Images/new_item.png" alt="New" title="New">';
                }
            } else {
                if (vRawURLDoc != "") {
                    if (DocDefaultView == "WordClient") {
                        article += vFileType + '<a href="#" seqe = "' + vRawURLDoc + '" onclick="viewdocinword(\'' + vRawURLDoc + '\')" title="' + item.DocumentName + '">' + vTitle + '</a>';
                    } else {
                        article += vFileType + '<a href="javascript:void(0);" data-value="' + encodeURIComponent(item.DocumentUrl) + '"   onclick="ViewDocs(this)"  title="' +item.DocumentName + '">' +vTitle + '</a>';
                    }
                } else {
                    article += vFileType + '<a href="javascript:void(0);" data-value="' +encodeURIComponent(item.DocumentUrl) + '"  onclick="ViewDocs(this)"  title="' + item.DocumentName + '">' +vTitle + '</a>';
                }
            }

            article += '<span class="sub-text"> ' + vTime + '</span>';
            article += '';
            article += '';
            if (item.IsActive != "No") {
                article += vPrimDocIcon + vDocIcon + '&nbsp;<img src="/Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="' + vClass + ' margin-left-5"/>';
            } else {
                article += vPrimDocIcon + vDocIcon + '&nbsp';
            }
            if (item.IsMetadataMismatch == "Yes" && item.ActualDocID == '' && ext.toLowerCase() != 'pdf') {
                article += '<a href="javascript:void(0);" data="' + item.ContractAndDocumentMetadata + '" onclick="javascript: openmismatched(this)"><img src="/Content/Images/icon/mismatch_icon.png"  style="cursor:pointer;" title="Mismatched Document and Contract Record Metadata." class="margin-left-5" /></a>';
            }
            if (documentview != 'folder' && documentview != "" && documentview != null) {
                var the_arr = item.DocumentUrl.replace(localStorage.SPHostUrl + "/", "").split('/');
                the_arr.pop();
                var changedUrl = the_arr.join('/');
                article += '<div class="documenturlclass" style="margin-left:0px"><label title="' + changedUrl + '"><img src="/Content/Images/icon/folder_open.png" style="margin-right: 5px;">' + changedUrl + '</label></div>'
            }
            article += '</li>';
            DocumentCount++;

            articleDocMiletstone = BindDocumentMilestones(item);
            var doclist = '<option value="' + item.RowKey + '">' + item.DocumentName + '</option>';
            $("#ddlDocumentList").append(doclist);
            articleDocumentMileStone += articleDocMiletstone;
            //BindDocumentAlert(item);
            //Clause
            //$("#ddlTemplateAndClauses").append('<option value="' + item.RowKey + '">' + item.DocumentName + '</option>');
        }
    }
    if (documentview != 'folder' && documentview != "" && documentview != null) {
        $("#ulDocument").html(article);
    }
    else {
        $("#ulDocument").html(articleSubFolder + article);
    }

    //manoj
    //For display inprogress status
    if (contractItem.IsActive == "" || contractItem.IsActive == "Yes") {
        if (NotActiveStatusDocument.length > 0) {
            $("#general-notification").css("visibility", "visible");
            $("#general-notification").html("Document uploaded successfully. All the options to perform action on document will be enabled once it is ready for use.");
            clearTimeout(cleartimevalue);
            cleartimevalue = setTimeout(refreshdocuemnt, 10000);

        } else {
            $("#general-notification").css("visibility", "hidden");
        }
    }
    //For display inprogress status
    //manoj

    //manoj
    if (documentview != 'folder' && documentview != "" && documentview != null) {
        $("#ulDocument").addClass('ulmarginclass');
    } else {
        $("#ulDocument").removeClass('ulmarginclass');
    }
    //manoj
    if ($("#ulDocument")[0].childNodes.length > 1) {
        $("#documentsort").css('display', '');
    } else {
        $("#documentsort").css('display', 'none');
    }
    if (count > DefaultDocLength) {
        //var more = count - 5;
        //$("#dvDocument").html('<a id="ShowMoreDocuments" href="javascript:void(0);" class="pad-all close1" onclick="ShowMoreDocuments()">' + more + ' More Document(s) </a>' +
        //                        '<a id="ShowLessDocuments" href="javascript:void(0);" class="pad-all close1" onclick="ShowLessDocuments()" style="display:none;">Show less</a>');        
        $("#dvDocument").html('<a id="ShowMoreDocuments" href="javascript:void(0);" class="pad-all close1" onclick="ShowMoreDocuments()">More Document(s) </a>' +
                                '<a id="ShowLessDocuments" href="javascript:void(0);" class="pad-all close1" onclick="ShowLessDocuments()" style="display:none;">Show less</a>');
    } else {
        $('.ShowMoreDocuments').css("display", "none");
        $('#ShowMoreDocuments').css("display", "none");
        $('#ShowLessDocuments').css("display", "none");
    }

    $("#lblDocumentsCount").text(count);

    //if ($("#showAll").text().indexOf("/") >= 0) {
    //    $('.ShowMoreDocuments').css("display", "none");
    //    $('#ShowMoreDocuments').css("display", "none");
    //    $('#ShowLessDocuments').css("display", "none");
    //}
    if (!$("#lblDocumentsCount").text().trim()) {
        $("#ulDocument").empty();
        $("#ulDocument").append('No items found.');
    }
    if (DocVersion == "No") {
        $('li.history').hide();
    }
    $(".openmenuDocument").contextMenu({ menu: vFinalSignature, leftButton: true }, function (action, el, pos) { contextMenuDocument(action, el.parent("li"), pos); });
    $(".openmenuDocumentFinal").contextMenu({ menu: "dropdownMenuMarkFinalSignatureUnPin", leftButton: true }, function (action, el, pos) { contextMenuDocument(action, el.parent("li"), pos); });
    $(".openmenuExpiredDocument").contextMenu({ menu: "dropdownMenuMarkFinalSignatureUnPin", leftButton: true }, function (action, el, pos) { contextMenuDocument(action, el.parent("li"), pos); }); // Bug (eO37060)
    $(".openmenuAmendmentDocument").contextMenu({ menu: "dropdownMenuAmendment", leftButton: true }, function (action, el, pos) { contextMenuAmendmentDocument(action, el.parent("li"), pos); });
    $(".openmenuAmendmentDocumentFinal").contextMenu({ menu: "dropdownMenuAmendmentFinal", leftButton: true }, function (action, el, pos) {
        contextMenuAmendmentDocument(action, el.parent("li"), pos);
    });
    //manoj
    //Un Pin Document Document
    $(".openmenuDocumentUnPin").contextMenu({ menu: vMarkFinalSignature + "UnPin", leftButton: true }, function (action, el, pos) { contextMenuDocument(action, el.parent("li"), pos); });
    $(".openmenuDocumentFinalUnPin").contextMenu({ menu: vMarkFinalSignature + "UnPin", leftButton: true }, function (action, el, pos) { contextMenuDocument(action, el.parent("li"), pos); });
    $(".openmenuAmendmentDocumentUnPin").contextMenu({ menu: "dropdownMenuAmendmentUnPin", leftButton: true }, function (action, el, pos) { contextMenuAmendmentDocument(action, el.parent("li"), pos); });
    $(".openmenuAmendmentDocumentFinalUnPin").contextMenu({ menu: "dropdownMenuAmendmentFinalUnPin", leftButton: true }, function (action, el, pos) {
        contextMenuAmendmentDocument(action, el.parent("li"), pos);
    });
    //manoj
    $(".openmenuFolder").contextMenu({ menu: 'myMenuFolder', leftButton: true }, function (action, el, pos) { contextMenuWorkFolder(action, el.parent("li"), pos); });
    if ($("#hdnnewdocumentfeature").text() != "Yes") {
        $(".pinhide").css("display", "none");
    } else {
        if ((contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute') && (!(contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived"))) {
            $('.pinhide').css("display", "");
        } else {
            $('.pinhide').css("display", "none");
        }
        //manoj
        $(".hideItem").click(function () {
            if ((contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute') && (!(contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived"))) {
                $(".unpindocument").hide();
                $(".pindocument").hide();
                $(".primary").show();
            }
        })
        $(".showitem").click(function () {
            if ((contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute') && (!(contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived"))) {
                $(".unpindocument").show();
                $(".pindocument").show();
                $(".primary").show();
            }
        })
        $(".primarydocument").click(function () {
            //if (contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute' && (!(contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived"))) {
            $(".primary").hide();
            //}
        })
        //manoj
    }
    //manoj
    if ((contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute') && (!(contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived"))) {
        if (contractItem.IsDraft != 'Yes')
            $('.Contribute').css("display", "");

        //manoj
        if (documentview != 'folder' && documentview != "" && documentview != null) {
            $("#btnaddnewsubfolder").css("display", "none")
        }
        //manoj
    } else if (contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute') {
        $('.StatusPermission').css("display", "");
    } else {
        //$('.Contribute').css("display", "none");
    }

    if (((contractItem.ContractDocumentsUrl != null && contractItem.ContractDocumentsUrl != "") || data.length > 0) && (contractItem.IsDraft != 'Yes' || (contractItem.IsDraft == 'Yes' && contractItem.CreatedBy == localStorage.UserName))) {
        if ((documentview == 'folder' || documentview == "" || documentview == null) && ($("#hdnPermission").val() == 'Manage' || $("#hdnPermission").val() == 'Contribute') && (!(contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived"))) {
            $("#btnaddnewsubfolder").css('display', '');
        } else {
            $("#btnaddnewsubfolder").css('display', 'none');
        }
    } else {
        $("#btnaddnewsubfolder").css('display', 'none');
    }
    //manoj

    if (vAccFeat.length > 0) {
        if (contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute') {
            $("#dropdownMenuAmendment .signature").show();
            $("#dropdownMenuAmendmentFinal .signature").show();
        }
        else {
            $("#dropdownMenuAmendment .signature").hide();
            $("#dropdownMenuAmendmentFinal .signature").hide();
        }
    }
    else {
        $("#dropdownMenuAmendment li.signature.Contribute").hide();
        $("#dropdownMenuAmendmentFinal li.signature.Contribute").hide();
    }

    $("#contractLogs").empty();
    //TermsAndClauseDocument(vContractID);

    pendingStarted = false;
    $("#tblContractSettingMetadata").empty();
    // GetContractPendingAction(false, 'Documents');
    ApplyPermissionToMenu($("#hdnPermission").val());
    if (((contractItem.ContractDocumentsUrl != null && contractItem.ContractDocumentsUrl != "") || data.length > 0) && (contractItem.IsDraft != 'Yes' || (contractItem.IsDraft == 'Yes' && contractItem.CreatedBy == localStorage.UserName))) {
        if ((documentview == 'folder' || documentview == "" || documentview == null) && ($("#hdnPermission").val() == 'Manage' || $("#hdnPermission").val() == 'Contribute') && (!(contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived"))) {
            $("#btnaddnewsubfolder").css('display', '');
        } else {
            $("#btnaddnewsubfolder").css('display', 'none');
        }
    } else {
        $("#btnaddnewsubfolder").css('display', 'none');
    }
}

function showfolderdocuments(parentfolderid) {
    //manoj
    multipleChecksDocumentID = "";
    multipleChecksDocumentName = "";
    multipleChecksDocumentReview = "";
    selectedamnddoc = false;
    selectedamnddocname = [];
    $("#documentMultiActions").css('display', 'none');
    //manoj
    var Istagexist = false;
    $("#showAll").find("a").each(function (e) {
        var tid = this.id;
        if (tid == parentfolderid.id) {
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
                if (splitsection[spl].indexOf(parentfolderid.id) > -1) {
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


    if ($("#showAll").text().indexOf("/") >= 0) {
        var texttille = parentfolderid.id
        Istagexist = false;
        $("#showAll").find("a").each(function (e) {
            var tid = this.id;
            if (tid == parentfolderid.id) {
                Istagexist = true;
            }
        });
        if (Istagexist) {
            $("#showAll").empty();
            var splitsection = Folderselection.split('~8Y92YagH');
            for (spl = 0; spl < splitsection.length; spl++) {
                if (splitsection[spl] != "") {
                    if (splitsection[spl].indexOf(texttille) > -1) {
                        if (spl == 0) {
                            $("#showAll").append(splitsection[spl]);
                            //spl = splitsection.length;
                            Folderselection = splitsection[spl];
                        }
                        else {
                            $("#showAll").append('/' + splitsection[spl]);
                            Folderselection += "~8Y92YagH" + splitsection[spl];
                            //spl = splitsection.length;
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
                if (id == parentfolderid.id) {
                    Isexist = true;
                }
            });
            if (!Isexist) {
                $("#showAll").append(' / <img src="/Content/Images/icon/folder_open.png" style="margin-right: 5px;"><a href="javascript:void(0)" id=' + parentfolderid.id + ' onclick="javascript:showfolderdocuments(this);">' + parentfolderid.text + '</a>');
                Folderselection += ' ~8Y92YagH <img src="/Content/Images/icon/folder_open.png" style="margin-right: 5px;"><a href="javascript:void(0)" id=' + parentfolderid.id + ' onclick="javascript:showfolderdocuments(this);">' + parentfolderid.text + '</a>';
            }
            $("#showAll").css('display', '');
        }
    } else {
        $("#showAll").empty();
        if (parentdocid == parentfolderid.id) {
            $("#showAll").append('<img src="/Content/Images/icon/folder_open.png" style="margin-right: 5px;"><a href="javascript:void(0)" id=' + parentdocid + ' onclick="javascript:showfolderdocuments(this);">' + parentdocname + '</a>');
            Folderselection = '<img src="/Content/Images/icon/folder_open.png" style="margin-right: 5px;"><a href="javascript:void(0)" id=' + parentdocid + ' onclick="javascript:showfolderdocuments(this);">' + parentdocname + '</a>';
        } else {
            $("#showAll").append('<img src="/Content/Images/icon/folder.png" style="margin-right: 5px;"><a href="javascript:void(0)" id=' + parentdocid + ' onclick="javascript:showfolderdocuments(this);">' + parentdocname + '</a> / <img src="/Content/Images/icon/folder_open.png" style="margin-right: 5px;"><a href="javascript:void(0)" id=' + parentfolderid.id + ' onclick="javascript:showfolderdocuments(this);">' + parentfolderid.text + '</a>');
            Folderselection = '<img src="/Content/Images/icon/folder.png" style="margin-right: 5px;"><a href="javascript:void(0)" id=' + parentdocid + ' onclick="javascript:showfolderdocuments(this);">' + parentdocname + '</a> ~8Y92YagH <img src="/Content/Images/icon/folder_open.png" style="margin-right: 5px;"><a href="javascript:void(0)" id=' + parentfolderid.id + ' onclick="javascript:showfolderdocuments(this);">' + parentfolderid.text + '</a>';
        }

        $("#showAll").css('display', '');
    }
    $("#ulDocument").empty();
    $("#ulDocument").html('<img src="/Content/Images/icon/loading.gif"> Please wait...');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/documents/documentsinfolder?parentfolderid=' + parentfolderid.id + '&contractid=' + vContractID,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': vAPIKey },
        success: function (data) {
            if (data == null || data.length == 0) {
                $("#ulDocument").empty();
                $("#ulDocument").append('No items found.');
                $("#documentsort").css('display', 'none');
                $('.ShowMoreDocuments').css("display", "none");
                $('#ShowMoreDocuments').css("display", "none");
                $('#ShowLessDocuments').css("display", "none");
            } else {
                $('#ulDocument').empty();
                CreateDocumentListNew(data);
                GetContractActivities(vContractID);
            }
        },
        error:
            function (data) {
                var Isexist = false;
                var id;
                $("#showAll").find("a").each(function (e) {
                    id = this.id;
                    if (id == parentfolderid.id) {
                        Isexist = true;
                    }
                });

                if (!Isexist) {
                    $("#showAll").append(' / <img src="/Content/Images/icon/folder_open.png" style="margin-right: 5px;"><a href="javascript:void(0)" id=' + parentfolderid.id + ' onclick="javascript:showfolderdocuments(this);">' + parentfolderid.text + '</a>');
                    Folderselection += ' ~8Y92YagH <img src="/Content/Images/icon/folder_open.png" style="margin-right: 5px;"><a href="javascript:void(0)" id=' + parentfolderid.id + ' onclick="javascript:showfolderdocuments(this);">' + parentfolderid.text + '</a>';

                }
                $("#showAll").css('display', '');
                $("#documentsort").css('display', 'none');
                //$("#ulFolderDocumentView").css('display', 'none');
                //$("#dvdocumentkeyword").css('display', 'none');
                $('#ulDocument').empty();
                $("#lblDocumentsCount").text('0');
                $("#ulDocument").append('No items found.');
                $('.ShowMoreDocuments').css("display", "none");
                $('#ShowMoreDocuments').css("display", "none");
                $('#ShowLessDocuments').css("display", "none");
            },
        complete: function () {
            BindSystemMilestoneTest(articleSystemMileStone, articleDocumentMileStone, articleMileStone, articleObligationMileStone);
        }
    });
}

function docdefaultview(doccontractarea) {
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vDocLibFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "14" && n.Status == "ON");
    });
    var dURL = "";
    //multiple document library
    if (vDocLibFeat.length > 0) {
        dURL = vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/businessarea/contractareadetailsbyname?contractareaname=' + encodeURIComponent(doccontractarea)
    } else {
        dURL = vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/businessarea/contractareadetailsbyname?contractareaname=Business Area'
    }

    $.ajax({
        url: dURL,
        type: 'GET',
        dataType: 'json',
        headers: {
            'eContracts-ApiKey': vAPIKey
        },
        async: false,
        success: function (data) {
            thisDocumentLibrarySettings = data;
        },
        error: function (data) {

        }
    });
}

function BindDocumentMilestones(item) {
    var completeArticle = '';
    var sbcount = 0;
    var vDocValidDate = '';
    if (item.ValidTill != null) {
        sbcount++;
        var Validdate;

        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
        { Validdate = item.ValidTill.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
        else {
            if (localStorage.AppDateFormat == 'DD/MM/YYYY') { Validdate = item.ValidTill.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1'); }
            else if (localStorage.AppDateFormat == 'MM/DD/YYYY') { Validdate = item.ValidTill.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
        }
        vDocValidDate = '' + Validdate + '';
        var article = '';
        if (sbcount <= 5)
            article = '<li class=" margin-bottom-8 WrapText_h2">';
        else
            article = '<li class="ShowMoreMilestones margin-bottom-8 WrapText_h2" style="display:none;">';
        article += ' <img src="/Content/Images/sand.png" style="width: 15px;pointer-events: none;">';
        if (vDocValidDate != '') {
            article += '<span class="DateToSort" style="color: black;"> ' + vDocValidDate + ': </span>';
        }
        article += '<span style="color:#555555;">' + item.DocumentName + '</span>';


        var beforeDaysSort = [];
        var afterDaysSort = [];
        var beforeDays = '';
        var afterDays = '';

        if (item.Reminder1 != null && item.Reminder1 != "" && item.Reminder1 != 0) {
            if (item.Reminder1Condition == 'before') {
                beforeDaysSort.push(item.Reminder1);
            }
            else if (item.Reminder1Condition == 'after') {
                afterDaysSort.push(item.Reminder1);
            }
        }
        if (item.Reminder2 != null && item.Reminder2 != "" && item.Reminder2 != 0) {
            if (item.Reminder2Condition == 'before') {
                beforeDaysSort.push(item.Reminder2);
            }
            else if (item.Reminder2Condition == 'after') {
                afterDaysSort.push(item.Reminder2);
            }
        }
        if (item.Reminder3 != null && item.Reminder3 != "" && item.Reminder3 != 0) {
            if (item.Reminder3Condition == 'before') {
                beforeDaysSort.push(item.Reminder3);
            }
            else if (item.Reminder3Condition == 'after') {
                afterDaysSort.push(item.Reminder3);
            }
        }

        beforeDays = beforeDaysSort.sort(function (a, b) { return a - b });
        afterDays = afterDaysSort.sort(function (a, b) { return a - b });

        if (beforeDays != '' || afterDays != '') {
            article += '<span class="sub-text-head"> (Reminders ' + (beforeDays != '' ? beforeDays + ' day(s) before' : '') + (afterDays != '' ? (beforeDays != '' ? ' & ' + afterDays + ' day(s) after )' : afterDays + ' day(s) after ) ') : ')') + '</span>';
        }
        article += '</li>';
        completeArticle += article;
    }
    return completeArticle;

}

function CreateDocumentListPinView(contractid) {
    articleDocumentMileStone = "";
    $('.ShowMorePinDocuments').css("display", "none");
    $('#ShowMorePinDocuments').css("display", "none");
    $('#ShowLessPinDocuments').css("display", "none");
    $("#hdnPinDocumentCount").text("No");
    $("#ulPinDocument").html('<img src="/Content/Images/icon/loading.gif"> Please wait...');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/documents?contractid=' + contractid,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': vAPIKey },
        success: function (Documentcollections) {
            //manoj 
            //Filter document(s) by primary and pined
            var data = null;
            if (typeof Documentcollections != 'undefined') {//NoContent HttpStatusCode Update
                data = $.grep(Documentcollections, function (n, i) {
                    return (n.IsPined == "Yes" || n.IsPrimary == "Yes");
                });
            }
            if (data != null && data.length > 0) {
                if (data.length >= 5) {
                    $("#hdnPinDocumentCount").text("Yes");
                } else {
                    $("#hdnPinDocumentCount").text("No");
                }
                if (data.length > 1) {
                    $("#pindocumentsort").css('display', '');
                } else {
                    $("#pindocumentsort").css('display', 'none');
                }
                //manoj
                var vFinalSignature = "dropdownMenuFinal";
                var vMarkFinalSignature = "dropdownMenuMarkFinal";
                var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                    return (n.RowKey == "1" && n.Status == "ON");
                });
                if (vAccFeat.length > 0) {
                    vFinalSignature = "dropdownMenuFinalSignature";
                    vMarkFinalSignature = "dropdownMenuMarkFinalSignature";
                    $("#dropdownMenuAmendment .signature").show();
                    $("#dropdownMenuAmendmentFinal .signature").show();
                }
                else {
                    $("#dropdownMenuAmendment .signature").hide();
                    $("#dropdownMenuAmendmentFinal .signature").hide();
                }
                var vGetTime = new Date();
                $.ajax({
                    url: '/Documents/GetTime',
                    type: 'GET',
                    dataType: 'json',
                    cache: false,
                    success: function (data) {
                        var jsObject = JSON.parse(data);
                        vGetTime = new Date(jsObject);
                    }
                });
                var count = 0;
                var vPermission = $("#hdnPermission").val();

                var settings = {
                    pattern: /\.[0-9a-z]+$/i,
                    knownFileTypes: ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'zip', 'rar', 'gzip', 'arj', 'wav', 'mp3', 'aif', 'aiff', 'm4a', 'ogg', 'wma', 'psd', 'ai', 'swf', 'fla', 'css', 'js', 'avi', 'mov', 'wmv', 'dotx'],
                    WopiFrameFileTypes: ['doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx', 'dotx']
                };
                var datalenght = data.length;
                var vTitle = '';
                var article = '';
                var articleSubFolder = '';
                if (datalenght > 0) {
                    for (var vi = 0; vi < datalenght; vi++) {
                        if (data[vi].ContractArea != "") {
                            docdefaultview(data[vi].ContractArea);
                            break;
                        }
                    }
                }
                var DocDefaultView = "";
                if (thisDocumentLibrarySettings != '' && thisDocumentLibrarySettings != 'undefined' && typeof thisDocumentLibrarySettings != "undefined") {
                    DocDefaultView = thisDocumentLibrarySettings.DocDefaultView;
                    DocVersion = thisDocumentLibrarySettings.DocVersion;
                }
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];
                    var vv = moment(new Date(item.Modified));
                    var vTime = vv.fromNow();
                    vTime = vv.from(vGetTime);

                    count++
                    var vClass = "openmenuDocumentFinal";
                    var vDocIcon = "";// '<img src="/Content/Images/Doc_draft.png" class="doc_type margin-left-5" alt="Draft Document" title="Draft Document" />';
                    var vPrimDocIcon = '';
                    if (item.IsFinalized == "Yes") {
                        vClass = "openmenuDocument";
                        vDocIcon = '<img src="/Content/Images/icon/final_doc.png" class="doc_type margin-left-5" alt="Finalized Document" title="Finalized Document" />';
                        if (item.CreationMode == "Amendment") {
                            vClass = "openmenuAmendmentDocumentFinal";
                            vDocIcon += '<img src="/Content/Images/amendments.png" style="height:16px; width:16px;" class="doc_type margin-left-5" alt="Amendment Document" title="Amendment Document" />';
                        }
                    } else if (item.CreationMode == "Amendment") {
                        vClass = "openmenuAmendmentDocument";
                        vDocIcon = '<img src="/Content/Images/amendments.png" style="height:16px; width:16px;" class="doc_type margin-left-5" alt="Amendment Document" title="Amendment Document" />';
                    }
                    if (item.IsPined == "Yes" && item.IsPrimary != "Yes") {
                        vClass += "UnPin";
                    }
                    if (item.IsPrimary == "Yes") {
                        vPrimDocIcon = '<img src="/Content/Images/primary_doc.png" class="doc_type margin-left-5" alt="Primary Document" title="Primary Document" />';
                        vClass += "UnPin" + " hideItem primarydocument";
                    } else {
                        vClass += " showitem";
                    }
                    if (item.DocumentStatus == "Expired" || contractItem.IsDraft == "Yes" || contractItem.Status == "Expired"
                    || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived") {
                        vClass = "openmenuExpiredDocument";
                    }

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

                    if (count <= 10)
                        article += '<li class=" margin-bottom-5" active=' + item.IsActive + '>';
                    else
                        article += '<li class="ShowMorePinDocuments margin-bottom-5" style="display:none;">';

                    article += '<label id="FolderCreationMode" style="display:none;">' + item.CreationMode + '</label>';
                    article += '<label id="DocumentID" style="display:none;">' + item.RowKey + '</label>';
                    article += '<label id="SentForSign" style="display:none;">' + item.SentForSign + '</label>';
                    article += '<label id="DocumentName" style="display:none;">' + item.DocumentName + '</label>';
                    article += '<label id="ShareWorkflow" style="display:none;">' + item.ShareWorkflow + '</label>';
                    article += '<label id="ReviewWorkflow" style="display:none;">' + item.ReviewWorkflow + '</label>';
                    article += '<label id="BusinessArea" style="display:none;">' + item.BusinessArea + '</label>';
                    article += '<label id="IsFinalized" style="display:none;">' + item.IsFinalized + '</label>';
                    var primarydocchecking = (item.IsPrimary != null && item.IsPrimary != "") ? item.IsPrimary : "No";
                    article += '<label id="IsPrimaryDoc" style="display:none;">' + primarydocchecking + '</label>';

                    if (item.CreationMode == "Amendment") {
                        article += '<label id="AmendmentID" style="display:none;">' + item.AmendmentID + '</label>';
                    }
                    //article += '<input type="checkbox" id="' + item.RowKey + '" name="MultipleDocuments" class="Contribute" onclick="checkMultipleDocuments(this);" value=' + item.RowKey + ' /> ';

                    switch (item.DocumentStatus) {
                        case "New":
                            if (item.ContractStatus == 'Expired' || contractItem.Status == "Cancelled" || item.ContractStatus == 'Archived')
                                article += '<b title="New" style="cursor:default" id="' + item.RowKey + '" class="status_green_another details_documentstatus"><img src="/Content/Images/status/new.png" class="margin-right-5" style="cursor:default">new</b>';
                            else
                                article += '<b title="New" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_green_another details_documentstatus"><img src="/Content/Images/status/new.png" class="margin-right-5">new</b>';
                            break;
                        case "Ready for Signature":
                            if (item.ContractStatus == 'Expired' || contractItem.Status == "Cancelled" || item.ContractStatus == 'Archived')
                                article += '<b title="Ready for Signature" style="cursor:default" id="' + item.RowKey + '" class="status_green details_documentstatus"><img src="/Content/Images/status/active.png" class="margin-right-5" style="cursor:default">sign</b>';
                            else
                                article += '<b title="Ready for Signature" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_green details_documentstatus"><img src="/Content/Images/status/active.png" class="margin-right-5">sign</b>';
                            break;
                        case "Awaiting Signatures":
                            if (item.ContractStatus == 'Expired' || contractItem.Status == "Cancelled" || item.ContractStatus == 'Archived')
                                article += '<b title="Awaiting Signatures" style="cursor:default" id="' + item.RowKey + '" class="status_yellow details_documentstatus"><img src="/Content/Images/status/renew.png" class="margin-right-5" style="cursor:default">sign</b>';
                            else
                                article += '<b title="Awaiting Signatures" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_yellow details_documentstatus"><img src="/Content/Images/status/renew.png" class="margin-right-5">sign</b>';
                            break;
                        case "Active":
                            if (item.ContractStatus == 'Expired' || contractItem.Status == "Cancelled" || item.ContractStatus == 'Archived')
                                article += '<b title="Active" style="cursor:default" id="' + item.RowKey + '" class="status_green details_documentstatus"><img src="/Content/Images/status/active.png" class="margin-right-5" style="cursor:default">actv</b>';
                            else
                                article += '<b title="Active" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_green details_documentstatus"><img src="/Content/Images/status/active.png" class="margin-right-5">actv</b>';
                            break;
                        case "Signed":
                            if (item.ContractStatus == 'Expired' || contractItem.Status == "Cancelled" || item.ContractStatus == 'Archived')
                                article += '<b title="Signed" style="cursor:default" id="' + item.RowKey + '" class="status_blue details_documentstatus"><img src="/Content/Images/status/tick.png" class="margin-right-5" style="cursor:default">Sign</b>';
                            else
                                article += '<b title="Signed" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_blue details_documentstatus"><img src="/Content/Images/status/tick.png" class="margin-right-5">Sign</b>';
                            break;
                        case "Expired":
                            if (item.ContractStatus == 'Expired' || contractItem.Status == "Cancelled" || item.ContractStatus == 'Archived')
                                article += '<b title="Expired" style="cursor:default" id="' + item.RowKey + '" class="status_Gray details_documentstatus"><img src="/Content/Images/status/expried.png" class="margin-right-5" style="cursor:default">exp</b>';
                            else
                                article += '<b title="Expired" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_Gray details_documentstatus"><img src="/Content/Images/status/expried.png" class="margin-right-5">exp</b>';
                            break;
                        case "Awaiting Review":
                            if (item.ContractStatus == 'Expired' || contractItem.Status == "Cancelled" || item.ContractStatus == 'Archived')
                                article += '<b title="Awaiting Review" style="cursor:default" id="' + item.RowKey + '" class="status_yellow details_documentstatus"><img src="/Content/Images/status/renew.png" class="margin-right-5" style="cursor:default">Rev</b>';
                            else
                                article += '<b title="Awaiting Review" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_yellow details_documentstatus"><img src="/Content/Images/status/renew.png" class="margin-right-5">Rev</b>';
                            break;
                        case "Reviewed":
                            if (item.ContractStatus == 'Expired' || contractItem.Status == "Cancelled" || item.ContractStatus == 'Archived')
                                article += '<b title="Reviewed" style="cursor:default" id="' + item.RowKey + '" class="status_blue details_documentstatus"><img src="/Content/Images/status/tick.png" class="margin-right-5" style="cursor:default">Rev</b>';
                            else
                                article += '<b title="Reviewed" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_blue details_documentstatus"><img src="/Content/Images/status/tick.png" class="margin-right-5">Rev</b>';
                            break;
                        case "In Negotiation":
                            if (item.ContractStatus == 'Expired' || contractItem.Status == "Cancelled" || item.ContractStatus == 'Archived')
                                article += '<b title="In Negotiation" style="cursor:default" id="' + item.RowKey + '" class="status_yellow details_documentstatus"><img src="/Content/Images/status/renew.png" class="margin-right-5" style="cursor:default">nego</b>';
                            else
                                article += '<b title="In Negotiation" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_yellow details_documentstatus"><img src="/Content/Images/status/renew.png" class="margin-right-5">nego</b>';
                            break;
                        case "Negotiation Complete":
                            if (item.ContractStatus == 'Expired' || contractItem.Status == "Cancelled" || item.ContractStatus == 'Archived')
                                article += '<b title="Negotiation Complete" style="cursor:default" id="' + item.RowKey + '" class="status_blue details_documentstatus"><img src="/Content/Images/status/tick.png" class="margin-right-5" style="cursor:default">nego</b>';
                            else
                                article += '<b title="Negotiation Complete" style="cursor:pointer" id="' + item.RowKey + '" onclick="ChangeDocumentStatus(this)" class="status_blue details_documentstatus"><img src="/Content/Images/status/tick.png" class="margin-right-5">nego</b>';
                            break;
                    }

                    vTitle = item.DocumentName;
                    if (vTitle.length > 61)
                    { vTitle = vTitle.substring(0, 60) + '...'; }
                    if (item.IsActive == "No") {
                        article += vFileType + '<a data-value="' + encodeURI(item.DocumentUrl) + '" href="javascript:void(0);" title="' + item.DocumentName + '" onclick="ViewDocument(\'' + encodeURI(item.DocumentUrl) + '\')" >' + item.DocumentName + '</a><img src="/Content/Images/new_item.png" alt="New" title="New">';
                    } else {
                        if (vRawURLDoc != "") {
                            if (DocDefaultView == "WordClient") {
                                article += vFileType + '<a href="#" seqe = "' + vRawURLDoc + '" onclick="viewdocinword(\'' + vRawURLDoc + '\')" title="' + item.DocumentName + '">' + vTitle + '</a>';
                            } else {
                                article += vFileType + '<a href="javascript:void(0);" data-value="' +encodeURIComponent(item.DocumentUrl) + '"  onclick="ViewDocs(this)" title="' +item.DocumentName + '">' +vTitle + '</a>';
                            }
                        } else {
                            article += vFileType + '<a href="javascript:void(0);" data-value="' + encodeURIComponent(item.DocumentUrl) + '"  onclick="ViewDocs(this)" title="' +item.DocumentName + '">' +vTitle + '</a>';
                        }
                    }

                    article += '<span class="sub-text"> ' + vTime + '</span>';
                    article += '';
                    article += '';
                    if (item.IsActive != "No") {
                        article += vPrimDocIcon + vDocIcon + '&nbsp;<img src="/Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="' + vClass + ' margin-left-5" />';
                    } else {
                        article += vPrimDocIcon + vDocIcon + '&nbsp';
                    }
                    if (item.IsMetadataMismatch == "Yes" && item.ActualDocID == '' && ext.toLowerCase() != 'pdf') {
                        article += '<a href="javascript:void(0);" data="' + item.ContractAndDocumentMetadata + '" onclick="javascript: openmismatched(this)"><img src="/Content/Images/icon/mismatch_icon.png"  style="cursor:pointer;" title="Mismatched Document and Contract Record Metadata." class="margin-left-5" /></a>';
                    }
                    article += '</li>';
                }
                $("#ulPinDocument").html(articleSubFolder + article);
                if (count > 10) {
                    $("#dvPinDocument").html('<a id="ShowMorePinDocuments" href="javascript:void(0);" class="pad-all close1" onclick="ShowMorePinDocuments()">More Document(s) </a>' +
                                            '<a id="ShowLessPinDocuments" href="javascript:void(0);" class="pad-all close1" onclick="ShowLessPinDocuments()" style="display:none;">Show less</a>');
                } else {
                    $('.ShowMorePinDocuments').css("display", "none");
                    $('#ShowMorePinDocuments').css("display", "none");
                    $('#ShowLessPinDocuments').css("display", "none");
                }

                $("#lblPinDocumentsCount").text(count);

                if (!$("#lblPinDocumentsCount").text().trim()) {
                    $("#ulPinDocument").empty();
                    $("#ulPinDocument").append('No items found.');
                }
                if (DocVersion == "No") {
                    $('li.history').hide();
                }
                //Un Pin Document

                $(".openmenuDocumentUnPin").contextMenu({ menu: vFinalSignature + "UnPin", leftButton: true }, function (action, el, pos) { contextMenuDocument(action, el.parent("li"), pos); });
                $(".openmenuDocumentFinalUnPin").contextMenu({ menu: vMarkFinalSignature + "UnPin", leftButton: true }, function (action, el, pos) { contextMenuDocument(action, el.parent("li"), pos); });
                $(".openmenuExpiredDocument").contextMenu({ menu: "dropdownExpiredDocument", leftButton: true }, function (action, el, pos) { contextMenuDocument(action, el.parent("li"), pos); }); // Bug (eO37060)
                $(".openmenuAmendmentDocumentUnPin").contextMenu({ menu: "dropdownMenuAmendmentUnPin", leftButton: true }, function (action, el, pos) { contextMenuAmendmentDocument(action, el.parent("li"), pos); });
                $(".openmenuAmendmentDocumentFinalUnPin").contextMenu({ menu: "dropdownMenuAmendmentFinalUnPin", leftButton: true }, function (action, el, pos) {
                    contextMenuAmendmentDocument(action, el.parent("li"), pos);
                });
                $(".openmenuFolder").contextMenu({ menu: 'myMenuFolder', leftButton: true }, function (action, el, pos) { contextMenuWorkFolder(action, el.parent("li"), pos); });
                $(".hideItem").click(function () {
                    if ((contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute') && (!(contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived"))) {
                        $(".unpindocument").hide();
                        $(".pindocument").hide();
                        $(".primary").show();
                    }
                })
                $(".showitem").click(function () {
                    if ((contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute') && (!(contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived"))) {
                        $(".unpindocument").show();
                        $(".pindocument").show();
                        $(".primary").show();
                    }
                })
                $(".primarydocument").click(function () {
                    $(".primary").hide();
                })

            } else {
                $("#pindocumentsort").css('display', 'none');
                $("#lblPinDocumentsCount").text('0');
                $("#ulPinDocument").html('No items found.');
                $("#hdnPinDocumentCount").text("No");
            }
        }, error:
                function (data) {
                    $("#pindocumentsort").css('display', 'none');
                    $("#lblPinDocumentsCount").text('0');
                    $("#ulPinDocument").html('No items found.');
                    $("#hdnPinDocumentCount").text("No");

                },
        complete: function (data) {
            //$("#ulPinDocument").parent().prepend('<div class="warning-msg clearfix" style="display:none;"><img src="/Content/Images/icon/warning-icon.png" alt=""><table id="tblDocumentMissing"></table><a href="javascript:void(0);" class="close1" onclick="GetContractPendingAction(true)" title="View All"><img src="/Content/Images/view-all-new.png" style="cursor:pointer;">&nbsp;</a></div>')
        }
    });
}

function SearchDocumentKeyword() {
    multipleChecksDocumentID = "";
    multipleChecksDocumentName = "";
    multipleChecksDocumentReview = "";
    selectedamnddoc = false;
    selectedamnddocname = [];
    $("#documentMultiActions").css('display', 'none');
    if (requiredValidator("dvdocumentkeyword", true)) {
        if (typeof ($('#hdnFolderDocumentView').text()) != "undefined" && $("#hdnFolderDocumentView").text() != null && $("#hdnFolderDocumentView").text() != "") {

        } else {
            $("#hdnShowAllTextValue").html($("#showAll")[0].innerHTML);
            PrvFolderselection = Folderselection;
            $(".tablinks").each(function (index, element) {
                if ($(element).hasClass("active")) {
                    $("#hdnFolderDocumentView").text($(element).attr('data-value'));
                }
            });
        }
        if (typeof ($('#hdnFolderDocumentView').text()) == "undefined" || $("#hdnFolderDocumentView").text() == null || $("#hdnFolderDocumentView").text() == "") {
            $("#hdnFolderDocumentView").text('folder');
        }
        $(".tablinks").removeClass('active');
        documentview = 'document';
        $("#listdocumentview").addClass("active");
        $("#btnaddnewsubfolder").css('display', 'none');
        if ($("#showAll").text().indexOf("/") >= 0) {
            bindfolderupload($("#showAll").find("a:first")[0])
        } else {
            $("#showAll").css('display', 'none');
        }
        $("#ulDocument").html('<img src="/Content/Images/icon/loading.gif"> Searching...');
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/documents?contractid=' + vContractID + '&searchkeyword=' + encodeURIComponent($("#txtdocumentkeyword").val()),
            type: 'GET',
            dataType: 'json',
            'Content-Type': 'application/json',
            cache: false,
            headers: {
                'eContracts-ApiKey': vAPIKey
            },
            success: function (documentcollection) {
                var data = $.grep(documentcollection, function (n, i) {
                    return (n.IsFolder != "Yes");
                });
                if (data.length == 0) {
                    $("#lblDocumentsCount").text('0');
                    $("#ulDocument").html('No items found.');
                    $("#documentsort").css('display', 'none');
                } else {
                    $('#ulDocument').empty();
                    CreateDocumentListNew(data);
                    GetContractActivities(vContractID);
                }
            },
            error:
            function (data) {
                $("#lblDocumentsCount").text('0');
                $("#ulDocument").html('No items found.');
                $("#documentsort").css('display', 'none');
                $('.ShowMoreDocuments').css("display", "none");
                $('#ShowMoreDocuments').css("display", "none");
                $('#ShowLessDocuments').css("display", "none");
            },
            complete: function () {
            }
        });
    }
}

function ClearDocumentKeyword() {
    if ($("#hdnFolderDocumentView").text() == "") {
        $("#txtdocumentkeyword").val('');
    } else {
        multipleChecksDocumentID = "";
        multipleChecksDocumentName = "";
        multipleChecksDocumentReview = "";
        selectedamnddoc = false;
        selectedamnddocname = [];
        $("#documentMultiActions").css('display', 'none');
        $("#txtdocumentkeyword").val('');
        $(".tablinks").removeClass('active');
        documentview = (typeof ($('#hdnFolderDocumentView').text()) != "undefined" && $('#hdnFolderDocumentView').text() != null && $('#hdnFolderDocumentView').text() != "") ? $('#hdnFolderDocumentView').text() : 'folder';
        if (documentview == 'document') {
            DisplayDocument('document');
        } else {
            $("#showAll").html($("#hdnShowAllTextValue")[0].innerHTML);
            Folderselection = PrvFolderselection;
            $("#showAll").css("display", "");
            $("#listfolderdocumentview").addClass("active");
            if ((documentview == 'folder' || documentview == "" || documentview == null) && ($("#hdnPermission").val() == 'Manage' || $("#hdnPermission").val() == 'Contribute') && (!(contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived"))) {
                $("#btnaddnewsubfolder").css('display', '');
            } else {
                $("#btnaddnewsubfolder").css('display', 'none');
            }
            //ApplyPermissionToMenu($("#hdnPermission").val());
            if ($("#showAll").text().indexOf("/") >= 0) {
                showfolderdocuments($("#showAll").find("a:last")[0])
            } else {
                BindDocument(vContractID);
            }
        }
        $("#hdnFolderDocumentView").text('');
        $("#hdnShowAllTextValue").html('');
        PrvFolderselection = '';
    }
}

function ReloadContracts() {
    if (!inrefreshState) {
        inrefreshState = true;
        setTimeout(function () {
            inrefreshState = false;
        }, 5000);
        try {

            if ($("#tabSummary").hasClass("active")) {
                ShowTabDetail('Summary');
            }
            else if ($("#tabDocumentView").hasClass("active")) {
                ShowTabDetail('DocumentView');
            }
            else if ($("#tabDocuments").hasClass("active")) {
                ShowTabDetail('Documents');
            }
            else if ($("#tabTermsClause").hasClass("active")) {
                ShowTabDetail('TermsClause');
            }
            else if ($("#tabNotes").hasClass("active")) {
                ShowTabDetail('Notes');
            }
            else if ($("#tabObligation").hasClass("active")) {
                ShowTabDetail('Obligation');
            }
            else if ($("#tabTransactions").hasClass("active")) {
                ShowTabDetail('Transactions');
            }
            else if ($("#tabCatalog").hasClass("active")) {
                ShowTabDetail('Catalog');
            }
            else if ($("#tabActivity").hasClass("active")) {
                ShowTabDetail('Activity');
            }
            else
                ShowTabDetail('Summary');

            BindContractDetails(vContractID);
            EnableDisableOCR();
            icontractdetails();   //ENH485  Featured metadata
            BindRelatedContracts(vContractID);
            CreateContractAlertList(vContractID);
            $("#hdnShowAllTextValueheader").html($("#showAll")[0].innerHTML)
            //var showalltextvalue = $("#showAll").text();

            //manoj
            var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
            var vDocLibFeat = $.grep(veContractFeatures, function (n, i) {
                return (n.RowKey == "20" && n.Status == "ON");
            });
            var details = "";
            if (vDocLibFeat.length > 0) {
                //Tab width decrease
                if (!($(".borderTop_Right_none").hasClass("newdocview"))) {
                    $(".borderTop_Right_none").addClass('newdocview');
                }
                //Tab width decrease
                details += '<div class="row-group"><div class="col11 no-pad"><div class="col7"><img src="/Content/Images/documents.png"> <a title="Displays Folder(s) and Document(s) associated with the Contract Record." href="javascript:void(0);" class="link-head" onclick="javascript: togglediv(\'ulDocument\', \'dvDocument\', \'imgdoc\');">Documents (<i id="lblDocumentsCount"></i>)</a><a href="javascript:void(0);" id="documentsort" class="add-btn close1 margin-left-5 obligation-act-new openmenuDocumentSort" style="display:none"><img src="/Content/Images/down_arrow_blk.png" alt="" title=""></a>'
                //+ '<a href="javascript:void(0);" class="add-btn close1 Contribute" id="btnAddContractDocument"><img src="/Content/Images/add-icon.png">Add</a><label class="details-label Contribute" id="lblAddContractDocument">or Drag & Drop</label><a href="javascript:void(0);" class="add-btn close1 Contribute" id="btnaddnewsubfolder"><img src="/Content/Images/add-icon.png">Manage Folder</a>'
                + '<a href="javascript:void(0);" id="documentMultiActions" class="add-btn close1 margin-left-5 obligation-act-new openmenuDocumentMultiActions" style="display:none"><img src="/Content/Images/icon/drop.png" style="height:14px !important;"></a></div>'
            + '<div class="col2" style="width: 12%;padding: 0;"><ul id="ulFolderDocumentView" class="tab"><li style="display:inline-block;"><a href="javascript:void(0);" id="listfolderdocumentview" class="tablinks group-wit-btn active" data-value="folder" onclick="DisplayDocument(\'folder\')"><img src="/Content/Images/folder-view.png" title="Displays Folder(s) and Documents(s) associated with Contract Record"></a></li><li style="display:inline-block; margin-left:-1px;"><a href="javascript:void(0);" id="listdocumentview" data-value="document" class="tablinks group-wit-btn" onclick="DisplayDocument(\'document\')"><img src="/Content/Images/list-view.png" title="Displays Documents(s) associated with Contract Record"></a></li></ul></div><div id="dvdocumentkeyword" style="width: 29%; float:left;"><input style="width: 72%;float: left;padding: 5px 27px 5px 5px; border: 1px solid #ccc!important;" id="txtdocumentkeyword" name="keyword" placeholder="Document(s) Search" class="topSearchBox validelement" type="text"><img class="poPSear" style="    cursor: pointer;position: relative;left: -62px;top: 1px;padding: 4px 0px 5px 5px;" onclick="javascript:SearchDocumentKeyword();" src="/Content/Images/search1.png"><a href="javascript:void(0)" class="linkPickerClear" style="float: left;display: block;margin-left: 4px!important;margin-top: 7px!important;" onclick="ClearDocumentKeyword();">Clear</a></div></div>'
            + '<div class="col1 text-right no-pad"><a href="javascript:void(0);" class="close1" onclick="javascript: togglediv(\'ulDocument\', \'dvDocument\', \'imgdoc\');"><img id="imgdoc" src="/Content/Images/e-open.png"></a></div></div><h2 id="showAll" class="box-title" style="margin-left: 26px;float: none;line-height: 16px;margin-top: 5px;"></h2><div class="row-group"><div class="col12"> <div id="holder" style="width:100%;"><div id="iddropfile" class="dropfiles" style="display:none;">Drop files here.</div><ul class="ul-data" id="ulDocumentLoading"></ul><ul class="ul-data" id="ulDocument"></ul><span id="uploaddocumentprocess" style="font-size:12px; display:none;"><img src="/Content/Images/loading.gif" /> Uploading...</span></div></div><div id="dvDocument" class="col12 pad-top"></div></div>';
                $("#dvtabDocumentView").html(details);
                //$("#dvtabSummaryDocumentView").html('<div class="row-group"><div class="col10 no-pad"><img src="/Content/Images/documents.png"> <a title="Displays Primary and Pinned Document(s)associated with the Contract Record." href="javascript:void(0);" class="link-head" onclick="javascript: togglediv(\'ulPinDocument\', \'dvPinDocument\', \'imgPindoc\');">Primary and Pinned Document(s) (<i id="lblPinDocumentsCount"></i>)</a><a href="javascript:void(0);" id="pindocumentsort" class="add-btn close1 margin-left-5 obligation-act-new openmenuDocumentSort" style="display:none"><img src="/Content/Images/down_arrow_blk.png" alt="" title=""></a></div><div class="col2 text-right no-pad"><a href="javascript:void(0);" class="close1" onclick="javascript: togglediv(\'ulPinDocument\', \'dvPinDocument\', \'imgPindoc\');"><img id="imgPindoc" src="/Content/Images/e-open.png"></a></div></div><div class="row-group"><div class="col12"><div style="width:100%;"><div class="warning-msg clearfix clpendingaction" style="display:none;"><img src="/Content/Images/icon/warning-icon.png" alt=""><table id="tblDocumentMissing"></table><a href="javascript:void(0);" class="close1" onclick="GetContractPendingAction(true,\'Documents\')" title="View All"><img src="/Content/Images/view-all-new.png" style="cursor:pointer;">&nbsp;</a></div><ul class="ul-data" id="ulPinDocumentLoading"></ul><ul class="ul-data" id="ulPinDocument"></ul></div></div><div id="dvPinDocument" class="col12 pad-top"></div></div>');
                $("#dvtabSummaryDocumentView").html('<div class="row-group"><div class="col10 no-pad"><img src="/Content/Images/documents.png"> <a title="Displays Primary and Pinned Document(s) associated with the Contract Record." href="javascript:void(0);" class="link-head" onclick="javascript: togglediv(\'ulPinDocument\', \'dvPinDocument\', \'imgPindoc\');">Primary and Pinned Document(s) (<i id="lblPinDocumentsCount"></i>)</a><a href="javascript:void(0);" id="pindocumentsort" class="add-btn close1 margin-left-5 obligation-act-new openmenuDocumentSort" style="display:none"><img src="/Content/Images/down_arrow_blk.png" alt="" title=""></a></div><div class="col2 text-right no-pad"><a href="javascript:void(0);" class="close1" onclick="javascript: togglediv(\'ulPinDocument\', \'dvPinDocument\', \'imgPindoc\');"><img id="imgPindoc" src="/Content/Images/e-open.png"></a></div></div><div class="row-group pad-top"><div class="col12"><div style="width:100%;"><div class="wmessage clearfix clpendingaction" style="display:none;margin-left:35%;margin-top:-26px;margin-bottom:39px;"><table id="tblDocumentMissing"></table></div><ul class="ul-data" id="ulPinDocumentLoading"></ul><ul class="ul-data" id="ulPinDocument"></ul></div></div><div id="dvPinDocument" class="col12 pad-top"></div></div>'); //ENH 23  Minor Enhancement Specs-Rahul
                $("#hdnnewdocumentfeature").text("Yes");
                $("#litabDocumentView").css("display", "");
                $('#txtdocumentkeyword').keypress(function (e) {
                    if (e.keyCode == 13) {
                        SearchDocumentKeyword();
                    }
                });
            } else {
                //Tab width increase
                if (!($(".borderTop_Right_none").hasClass("newdocview"))) {
                    $(".borderTop_Right_none").removeClass('newdocview');
                }
                if ($("#tabDocumentView").hasClass("active")) {
                    $('.info-box-main-body').css("display", "none");
                    $('#tabSummaryDetail').css("display", "");

                    $(".contracttab").removeClass("active");
                    $("#tabSummary").addClass("active");
                }
                //Tab width increase
                details += '<div class="row-group"><div class="col10 no-pad"><img src="/Content/Images/documents.png"> <a title="Displays Folder(s) and Document(s) associated with the Contract Record." href="javascript:void(0);" class="link-head" onclick="javascript: togglediv( \'ulDocument\', \'dvDocument\', \'imgdoc\');">Documents (<i id="lblDocumentsCount"></i>)</a>'
                    //+ '<a href="javascript:void(0);" class="add-btn close1 Contribute" id="btnAddContractDocument" style="display:none;"><img src="/Content/Images/add-icon.png">Add</a><label class="details-label Contribute" id="lblAddContractDocument" style="display:none;">or Drag & Drop</label><a href="javascript:void(0);" class="add-btn close1 Contribute" id="btnaddnewsubfolder"style="display:none;" ><img src="/Content/Images/add-icon.png">Manage Folder</a>'
                    + '<a href="javascript:void(0);" id="documentMultiActions" class="add-btn close1 margin-left-5 obligation-act-new openmenuDocumentMultiActions" style="display:none"><img src="/Content/Images/icon/drop.png" style="height:14px !important;"></a></div>'
                + '<div class="col2 text-right no-pad"><a href="javascript:void(0);" class="close1" onclick="javascript: togglediv(\'ulDocument\', \'dvDocument\', \'imgdoc\');"><img id="imgdoc" src="/Content/Images/e-open.png"></a></div></div><div class="warning-msg clearfix clpendingaction" style="display:none;"><img src="/Content/Images/icon/warning-icon.png" alt=""><table id="tblDocumentMissingNormal"></table><a href="javascript:void(0);" class="close1" onclick="GetContractPendingAction(true,\'Missing\')" title="View All"><img src="/Content/Images/view-all-new.png" style="cursor:pointer;">&nbsp;</a></div><h2 id="showAll" class="box-title" style="margin-left: 26px;float: none;line-height: 16px;margin-top: 5px;"></h2>'
                + '<div class="row-group"><div class="col12"><div id="holder" style="width:100%;"><div id="iddropfile" class="dropfiles" style="display:none;">Drop files here.</div><ul class="ul-data" id="ulDocumentLoading"></ul><ul class="ul-data" id="ulDocument"></ul><span id="uploaddocumentprocess" style="font-size:12px; display:none;"><img src="/Content/Images/loading.gif" /> Uploading...</span></div></div><div id="dvDocument" class="col12 pad-top"></div></div>';
                $("#dvtabSummaryDocumentView").html(details);
                $("#hdnnewdocumentfeature").text("No");
                $("#litabDocumentView").css("display", "none");
                documentview = "";
            }
            details = "";
            $(".openmenuDocumentMultiActions").contextMenu({ menu: 'dropdownMenuDocumentMultiActions', leftButton: true }, function (action, el, pos) {
                contextMenuDocumentMultiActions(action, el, pos);
            });
            $(".openmenuDocumentSort").contextMenu({ menu: 'dropdownMenuDocumentSort', leftButton: true }, function (action, el, pos) {
                contextMenuDocumentSort(action, el.parent("a"), pos);
            });
            //dynamic holder binding value
            holder = document.getElementById('holder');
            holder.ondragover = function (e) {
                if (document.getElementById("btnAddContractDocument").style.display != "none") {
                    e.preventDefault();
                    document.getElementById("holder").style.border = "2px dashed blue ";
                    $("#holder").css("min-height", "100px");
                    document.getElementById("holder").style.opacity = "0.5";
                    e.dataTransfer.setData('text/html', "You dragged the image!");
                    document.getElementById("iddropfile").style.display = "block";
                }
            };
            holder.ondragend = function () {
                this.className = ''; return false;
            };
            holder.ondragleave = function () {
                document.getElementById("holder").style.border = "2px dashed white";
                $("#holder").css("min-height", "0px");
                $('#holder').css("opacity", "1");
                $('#holder').css("pointer-events", "auto");
                document.getElementById("iddropfile").style.display = "none";
            };
            var totalfiles = "";
            holder.ondrop = function (e) {
                if (contractItem.Permission != 'View' && contractItem.Permission != '' && contractItem.Permission != null) {
                    $("#loadingPage").fadeIn();
                    this.className = '';
                    e.preventDefault();
                    var files = e.dataTransfer.files;
                    var fileslength = files.length;
                    //if (document.getElementById("tbBulkControls").rows.length < 6) {
                    //    if (fileslength <= 5) {
                    for (var i = 0; i < fileslength; i++) {
                        droppedfiles.push(files[i]);
                    }
                    totalfiles = files;
                    removedItems = [];
                    ReturnFolderSelection_New();
                    readfiles(files);
                    if ($("#tbBulkControls tbody").find("tr").length > 0) {
                        //$(".cldraganddrop").css('display', 'none');
                        //$('#btnBulkUploadSave').css('display', '');
                        //$('#btnBulkUploadCancel').css('display', '');
                        //$("#bulkuploaddoc").dialog("option", "title", "Bulk Document Upload");
                        //$("#bulkuploaddoc").dialog("open");
                        //$("#bulkuploaddoc").height("auto");
                        //applybulkdocumetdraganddrop();
                    }
                    else {
                        dropexitfilename = [];
                        droppedfiles = [];
                        droppedControls = 0;
                        parentfolderidtopass = "";
                        dropdownlength = 0;
                        uploadedfilecount = 0;
                        document.getElementById("holder").style.border = "2px dashed white";
                        $("#holder").css("min-height", "0px");
                        $('#holder').css("opacity", "1");
                        $('#holder').css("pointer-events", "auto");
                    }
                    $("#loadingPage").fadeOut();

                }
            }

            $("#showAll").html($("#hdnShowAllTextValueheader")[0].innerHTML);
            $("#hdnShowAllTextValueheader").html('');
            if (documentview == null || documentview == "" || documentview == 'folder') {
                if ($("#showAll").text().indexOf("/") >= 0) {
                    showfolderdocuments($("#showAll").find("a:last")[0])
                } else {
                    BindDocument(vContractID);
                }
            } else {
                DisplayDocument(documentview);
            }
            $("#hdnFolderDocumentView").text('');
            $("#hdnShowAllTextValue").html('');
            PrvFolderselection = '';
            if ($("#hdnnewdocumentfeature").text() == "Yes") {
                CreateDocumentListPinView(vContractID);
            }
            //manoj
            BindMilestone(vContractID);
            GetContractActivities(vContractID);
            //TermsAndClauseDocument(vContractID);
            BindNotes(vContractID);
            GetInnerFeatures();
            //BindMetaData(contractItem, true);
            if (!pendingStarted) {
                $("#tblContractSettingMetadata").empty()
                $("#tblStartApprovalMetadata").empty()
                $("#tblEditcontractMetadata").empty()
                $("#tblActivitiesMetadata").empty()
                $("#tblJustInfoMetadata").empty()
            }

        } catch (e) {
            $("#loadingPage").fadeOut();
        }

        //pendingStarted = false;
        $("#tblContractSettingMetadata").empty();
        //GetContractPendingAction(false);

    }
    //GetRenewalChecklistAndNotes(vContractID, 0);
}

function CreateContractAlertList(contractid) {
    if (contractid == null || contractid == "") {
        contractid = vContractID;
    }

    var article = "";
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/contractalerts?contractid=' + contractid,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: {
            'eContracts-ApiKey': vAPIKey
        },
        success: function (data) {
            var itemcheckcount = 0;
            var allitem = data.length;
            var curDate = moment(new Date());
            var blUpcomingAlert = false;
            $(data).each(function (i, item) {
                var sRowKey = item.RowKey;
                var sAlertTitle = item.EventName;
                var sPriority = item.Priority;


                if (item.Active == true) {
                    var vv = 0;
                    if (item.EventName == "Contract Renewals") {
                        if (typeof vContractRecord !== 'undefined') {
                            var vDate = vContractRecord.RenewalDate;
                            var start = moment(vDate);
                            var vv = start.diff(curDate, "days");
                        }
                    } else if (item.EventName == "Contract Expiration") {
                        if (typeof vContractRecord !== 'undefined') {
                            var vDate = vContractRecord.ExpiryDate;
                            var start = moment(vDate);
                            var vv = start.diff(curDate, "days");
                        }
                    }

                    if (vv > 0 && (vv <= item.Reminder1 + 60 || vv <= item.Reminder2 + 60 || vv <= item.Reminder3 + 60)) {

                        var alert = "";
                        alert += "<img src='/Content/Images/waitng-approval.png' />" + sAlertTitle;
                        alert += "<small class='contRsmaLl'>reminder due in " + vv + " days</small>";
                        alert += "<br/>";

                        $("#alertsListUpcoming").append(alert);
                        blUpcomingAlert = true;
                    }
                }
            });

            if (blUpcomingAlert) {
                $("#spNoUpcomingAlert").css('display', 'none');
            }
        },
        error:
            function (data) {
            }
    });
}

function togglediv(firstObject, secondObject, imgObject) {
    if (firstObject != "")
        $("#" + firstObject).slideToggle();
    if (secondObject != "")
        $("#" + secondObject).slideToggle();
    if (imgObject != "") {
        var imgObj = $("#" + imgObject);

        if (imgObj.attr("title") == "Collapse") {
            imgObj.attr("title", "Expand");
            imgObj.attr("src", "/Content/Images/e-open.png");
        } else {
            imgObj.attr("title", "Collapse");
            imgObj.attr("src", "/Content/Images/e-close.png");
        }
    }

}

function ShowMetadata() {
    $("#docMetadata").addClass('pop_up_Harizondal_meta_active');
    $("#docActivities").removeClass('pop_up_Harizondal_meta_active');
    $('#tblMetadataDetailDocument').css("display", "");
    $('#documentLogs').css("display", "none");
    $('#compact-pagination-documentLogs').css("display", "none");
    $('#idDocumentPopup').css("display", "none");
}

function ShowActivities() {
    $("#docMetadata").removeClass('pop_up_Harizondal_meta_active');
    $("#docActivities").addClass('pop_up_Harizondal_meta_active');
    $('#tblMetadataDetailDocument').css("display", "none");
    $('#documentLogs').css("display", "");
    $('#compact-pagination-documentLogs').css("display", "none");
    $('#idDocumentPopup').css("display", "");
}

function contextMenuDocument(action, el, pos) {
    switch (action) {
        case "view":
            {
                $("#loadingPage").fadeIn();
                ShowMetadata();
                var documentID = $(el).find("#DocumentID").text();
                $("#tblMetadataDetailDocument").empty();
                $('#tblMetadataDetailDocument').append('<tr><td><img src="../Content/Images/icon/loading.gif"/></td></tr>');
                $("#documentLogs").html('<tr><td colspan="4"><img src="../Content/Images/icon/loading.gif"/></td></tr>');
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/activities?objecttype=Document&objectid=' + documentID + '&actiontype=',
                    type: 'GET',
                    dataType: 'json',
                    "Content-Type": "application/json",
                    headers: {
                        'eContracts-ApiKey': vAPIKey
                    },
                    cache: false,
                    success: function (activities) {
                        $("#documentLogs").empty();
                        var datalenght = activities.length;
                        var article = '';
                        for (var i = 0; i < datalenght; i++) {
                            var item = activities[i];
                            var sObject = item.Object;
                            var sActivity = item.Activity;
                            var sUserID = item.UserID;
                            var sTimestamp = "";
                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                                sTimestamp = moment(new Date(item.Timestamp)).format('MM/DD/YYYY h:mm A');
                            } else {
                                sTimestamp = moment(new Date(item.Timestamp)).format(localStorage.AppDateFormat + " h:mm A");
                            }
                            article += '<tr><td><span class="logHis_Datetime">' + sTimestamp + '</span></td><td><b>' + sObject + '</b></td><td><span class="logHis_Activity">' + sActivity + '</span></td><td><span class="logHis_Datetime">' + sUserID + '</span></td></tr>';
                        }
                        $("#documentLogs").html(article);
                        $('#compact-pagination-documentLogs').pagination({
                            items: activities.length,
                            itemsOnPage: 15,
                            type: 'tbody',
                            typeID: 'documentLogs',
                            row: 'tr',
                            cssStyle: 'compact-theme'
                        });
                    },
                    error: function () { }
                });

                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/activities?objecttype=Document&objectid=' + documentID + '&actiontype=',
                    type: 'GET',
                    dataType: 'json',
                    "Content-Type": "application/json",
                    headers: {
                        'eContracts-ApiKey': vAPIKey
                    },
                    cache: false,
                    success: function (activities) {
                        $("#documentLogs").empty();
                        var datalenght = activities.length;
                        var article = '';
                        for (var i = 0; i < datalenght; i++) {
                            var item = activities[i];
                            var sObject = item.Object;
                            var sActivity = item.Activity;
                            var sUserID = item.UserID;
                            var sTimestamp = "";
                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                                sTimestamp = moment(new Date(item.Timestamp)).format('MM/DD/YYYY h:mm A');
                            } else {
                                sTimestamp = moment(new Date(item.Timestamp)).format(localStorage.AppDateFormat + " h:mm A");
                            }

                            article += '<tr><td><span class="logHis_Datetime">' + sTimestamp + '</span></td><td><b>' + sObject + '</b></td><td><span class="logHis_Activity">' + sActivity + '</span></td><td><span class="logHis_Datetime">' + sUserID + '</span></td></tr>';
                        }
                        $("#documentLogs").html(article);
                        $('#compact-pagination-documentLogs').pagination({
                            items: activities.length,
                            itemsOnPage: 15,
                            type: 'tbody',
                            typeID: 'documentLogs',
                            row: 'tr',
                            cssStyle: 'compact-theme'
                        });
                    },
                    error: function () { }
                });

                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/documents?documentid=' + documentID,
                    type: 'GET',
                    dataType: 'json',
                    "Content-Type": "application/json",
                    headers: {
                        'eContracts-ApiKey': vAPIKey
                    },
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
                        if (documententity.DocumentType == "0")
                            vMetadata += '<td class="text width60">-</td>';
                        else
                            vMetadata += '<td class="text width60">' + documententity.DocumentType + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Document Author</td>';
                        if (documententity.DocumentAuthor == null)
                            vMetadata += '<td class="text width60">-</td>';
                        else
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
                        vMetadata += '<td class="text width60">' + moment(new Date(documententity.Created)).utc().format('Do MMM YYYY') + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Last Updated</td>';
                        vMetadata += '<td class="text width60">' + moment(new Date(documententity.Modified)).utc().format('Do MMM YYYY') + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Shared with</td>';
                        vMetadata += '<td class="text width60">' + documententity.SharedWith + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Reviewer(s)</td>';
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
                        vMetadata += '<td class="text">' + documententity.DocumentFormat + '</td>';
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
                            vMetadata += '<td class="text width60">' + moment(new Date(documententity.ValidFrom)).utc().format('Do MMM YYYY') + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40 meta_titles">Valid Till</td>';
                        if (documententity.ValidTill == null)
                            vMetadata += '<td class="text width60">-</td>';
                        else
                            vMetadata += '<td class="text width60">' + moment(new Date(documententity.ValidTill)).utc().format('Do MMM YYYY') + '</td>';
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

                        $("#tblMetadataDetailDocument").html(vMetadata);
                        setBlankValueToHyphen("tblMetadataDetailDocument");
                        $("#loadingPage").fadeOut();
                        $("#viewMetadataDetailDocument").dialog("option", "title", "Document Details");
                        $("#viewMetadataDetailDocument").dialog("open");

                    },
                    error: function () { }
                });
                $('#documentLogs').css("display", "none");
                $('#compact-pagination-documentLogs').css("display", "none");
                $('#idDocumentPopup').css("display", "none");
                break;
            }
        case "editO365":
            {
                //var LinkURL = $(el).find("a").attr('href');
                //if (LinkURL == "#" || LinkURL == "javascript:void(0);") {
                //    var rawUrl = $(el).find("a").attr('seqe');
                //    if (typeof (rawUrl) == "undefined" || rawUrl == "undefined") {
                //        rawUrl = $(el).find("a").attr('data-value');
                //    }
                //    if (typeof rawUrl != 'undefined')
                //        viewdocinword(rawUrl);
                //    else {
                //        LinkURL = $(el).find("a").attr('data-value');
                //        Opendocinbrowser(LinkURL);
                //    }
                //} else {
                //    LinkURL = $(el).find("a").attr('data-value');
                //    Opendocinbrowser(LinkURL);
                //}
                var LinkURL =  $(el).find("a").attr('seqe');            
                GetDocumentfromSP(LinkURL, "View");
                break;
            }
        case "download":
            {
                //var LinkURL = $(el).find("a").attr('href');
                //if (LinkURL == "#" || LinkURL == "javascript:void(0);") {
                //    LinkURL = $(el).find("a").attr('seqe')
                //    if (typeof (LinkURL) == "undefined" || LinkURL == "undefined") {
                //        LinkURL = $(el).find("a").attr('data-value');
                //    }
                //} else {
                //    LinkURL = $(el).find("a").attr('data-value');
                //}
                //location = localStorage.SPHostUrl + "/_layouts/15/download.aspx?SourceUrl=" + LinkURL;
                var LinkURL = $(el).find("a").attr('data-value');           
                GetDocumentfromSP(LinkURL, "Download");
                break;
            }
    }
}

function GetDocumentfromSP(LinkURL, action) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/Documents/getdocumentfromSP?documenturl=' + LinkURL,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': vAPIKey, 'ContractID': vContractID },
        success: function (data) {
            var url = "";
            if (action == "View") {
                if (data.endsWith('.pdf') || data.endsWith('.png') || data.endsWith('.jpg') || data.endsWith('.jpeg')) {
                    url = data;
                }
                else if (data.endsWith('.txt'))
                {
                    url = data;
                }
                else {
                    url = "https://view.officeapps.live.com/op/embed.aspx?src=" +data + "?71DN&wdStartOn=1&wdEmbedCode=0";
                }
            } else {
                url = data;
            }
            window.open(url, "_blank");
        },
        error: function (data) {
            debugger
        }
    });
}

function viewdocinword(docurl) {
    var fileextension = docurl.split('.').pop();
    if (fileextension == 'docx' || fileextension == 'doc') {
        window.open("ms-word:ofe|u|" + decodeURIComponent(docurl), "_self");
        $("#showMSWordPopup_head").html("We're opening your document in Microsoft Word...");
        $("#showMSWordPopup_head").removeClass("red-text");
        $("#showMSWordPopup_head").removeClass("green-text");
        $("#showMSWordPopup_head").addClass("blue-text");
        $("#editwordlink").removeClass("redbg");
        $("#editwordlink").removeClass("greenbg");
        $("#editwordlink").addClass("bluebg");
        $("#linkEditInWordOnline").html('<p><img src="/Content/Images/wordonline.png" alt=""></p><p>Edit in Word Online</p>')

    } else if (fileextension == 'pptx' || fileextension == 'ppt') {
        window.open("ms-powerpoint:ofe|u|" + decodeURIComponent(docurl), "_self");
        $("#showMSWordPopup_head").html("We're opening your document in Microsoft PowerPoint...");
        $("#showMSWordPopup_head").removeClass("blue-text");
        $("#showMSWordPopup_head").removeClass("green-text");
        $("#showMSWordPopup_head").addClass("red-text");

        $("#editwordlink").removeClass("greenbg");
        $("#editwordlink").removeClass("bluebg");
        $("#editwordlink").addClass("redbg");
        $("#linkEditInWordOnline").html('<p><img src="/Content/Images/powerpointonline.png" alt=""></p><p>Edit in PowerPoint Online</p>')

    } else if (fileextension == 'xlsx' || fileextension == 'xls') {
        window.open("ms-excel:ofe|u|" + decodeURIComponent(docurl), "_self");
        $("#showMSWordPopup_head").html("We're opening your document in Microsoft Excel...");
        $("#showMSWordPopup_head").removeClass("blue-text");
        $("#showMSWordPopup_head").removeClass("red-text");
        $("#showMSWordPopup_head").addClass("green-text");
        $("#editwordlink").removeClass("bluebg");
        $("#editwordlink").removeClass("redbg");
        $("#editwordlink").addClass("greenbg");
        $("#linkEditInWordOnline").html('<p><img src="/Content/Images/excelonline.png" alt=""></p><p>Edit in Excel Online</p>')

    }
    if (Checkbrowsernameandversion()) {
        var settings = {
            pattern: /\.[0-9a-z]+$/i,
            knownfiletypes: ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'zip', 'rar', 'gzip', 'arj', 'wav', 'mp3', 'aif', 'aiff', 'm4a', 'ogg', 'wma', 'psd', 'ai', 'swf', 'fla', 'css', 'js', 'avi', 'mov', 'wmv', 'dotx'],
            wopiframefiletypes: ['doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx', 'dotx']
        };

        var ext = docurl.match(settings.pattern);
        if (ext != null) {
            if (ext.length > 0) {
                ext = ext[0].slice(1);
            }
            if (decodeURIComponent(docurl).toLowerCase().indexOf(localStorage.SPHostUrl.toLowerCase()) >= 0) {
                if (jQuery.inArray(ext, settings.wopiframefiletypes) > -1) {
                    $("#linkEditInWordOnline").attr('href', localStorage.SPHostUrl + "/_layouts/WopiFrame.aspx?sourcedoc=" + docurl + "&action=default")
                    $("#showMSWordPopup").dialog("option", "title", "");
                    $("#showMSWordPopup").dialog("open");
                } else {
                    docurl = decodeURIComponent(docurl);
                }
                window.open(docurl);
            }
        }
    }
    else {
        location = localStorage.SPHostUrl + "/_layouts/15/download.aspx?SourceUrl=" + docurl;
    }
}

function Opendocinbrowser(docurl) {
    if (docurl != '') {
        if (typeof docurl === "string") {
        }
        else {
            docurl = $(docurl).attr('data-value');
        }
    }

    if (Checkbrowsernameandversion()) {
        var settings = {
            pattern: /\.[0-9a-z]+$/i,
            knownfiletypes: ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'zip', 'rar', 'gzip', 'arj', 'wav', 'mp3', 'aif', 'aiff', 'm4a', 'ogg', 'wma', 'psd', 'ai', 'swf', 'fla', 'css', 'js', 'avi', 'mov', 'wmv', 'dotx'],
            wopiframefiletypes: ['doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx', 'dotx']
        };
        var ext = docurl.match(settings.pattern);
        if (ext != null) {
            if (ext.length > 0) {
                ext = ext[0].slice(1);
            }
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
    return Openinbrowser;
}

function req() {
    window.open("https://support.office.com/en-US/client/results?Shownav=true&lcid=1033&ns=WDWAEndUser&version=15&omkt=en-US&ver=15&apps=WDWAENDUSER%2cXLWAENDUSER%2cPPWAENDUSER%2cONWAENDUSER&HelpID=OICFailure&ui=en-US&rs=en-US&ad=US", "Ratting", "width=550,height=500,0,status=0,");
}

$('#linkEditInWordOnline').click(function () {
    $("#showMSWordPopup").dialog("close");
});

function StopDocumentSignature(wid) {
    swal({
        title: '',
        text: "Are you sure you want to <span style=\"font-weight:700\">Stop</span> signature process?",
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
                   url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/Documents/StopSignature?documentid=' + wid,
                   type: 'PUT',
                   dataType: 'json',
                   'Content-Type': 'application/json',
                   cache: false,
                   headers: { 'eContracts-ApiKey': vAPIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                   success: function (data) {
                       GetContractActivities(vContractID, "true");
                   },
                   error:
                       function (data) {
                           $("#loadingPage").fadeOut();
                       }
               });
           }
           return;
       });
}

function MarkAsCompleted() {
    if ($("#tblMetadataDetailForOwner").find("ul")[0].className.indexOf("Milestone") > -1) {
        var milestoneID = ($("#tblMetadataDetailForOwner ul li#milestoneID").children()[1].textContent != "" ? $("#tblMetadataDetailForOwner ul li#milestoneID").children()[1].textContent.trim() : "");
        var milestoneTitle = ($("#tblMetadataDetailForOwner ul li#milestoneTitle span")[0].textContent != "" ? $("#tblMetadataDetailForOwner ul li#milestoneTitle span")[0].textContent.trim() : "");
        var formDataStatusMile = new FormData();
        formDataStatusMile.append("MilestoneIDs", milestoneID);
        $("#loadingPage").fadeIn();

        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/milestones/changestatus?status=Complete',
            type: 'PUT',
            dataType: 'json',
            data: formDataStatusMile,
            contentType: false,
            processData: false,
            headers: { 'eContracts-ApiKey': vAPIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
            cache: false,
            success: function (result) {
                BindMilestone();
                swal({
                    title: '',
                    text: "Thanks, Milestone <span style=\"font-weight:700\">'" + milestoneTitle + "'</span> has been completed successfully.",
                    showCancelButton: false,
                    confirmButtonText: 'OK',
                    html: true
                });
                $("#loadingPage").fadeOut();
            },
            error: function (status) {
                swal("", "Could not mark milestone as complete.");
                $("#loadingPage").fadeOut();
            }
        });

    }
    else {
        var vObligationID = ($("#tblMetadataDetailForOwner ul li#obligationID span")[0].textContent != "" ? $("#tblMetadataDetailForOwner ul li#obligationID span")[0].textContent.trim() : "");
        var vObligationTitle = ($("#tblMetadataDetailForOwner ul#obligationTitle li span")[0].textContent != "" ? $("#tblMetadataDetailForOwner ul#obligationTitle li span")[0].textContent.trim() : "");
        var vObligationText = ($("#tblMetadataDetailForOwner ul li#ObligationTEXT span")[0].textContent != "" ? $("#tblMetadataDetailForOwner ul li#ObligationTEXT span")[0].textContent.trim() : "");
        $("#loadingPage").fadeIn();
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/obligations/obligationcatalogs?obligationtext=' + vObligationText + '&obligationId=' + vObligationID,
            type: 'GET',
            dataType: 'json',
            "Content-Type": "application/json",
            headers: { 'eContracts-ApiKey': vAPIKey },
            cache: false,
            async: false,
            success: function (catalogs) {
                if (catalogs != null && catalogs.length > 0) {
                    var catalogitems = "";

                    catalogitems = $.grep(catalogs, function (p) { return p.ObligationCatalogStatus != "Complete" && p.ObligationCatalogStatus != "Cancelled"; })
.map(function (p) { return p });
                    if (catalogitems != null && catalogitems != "") {
                        swal("", "Could not mark obligation as complete, Related products need to complete.");
                        $("#loadingPage").fadeOut();
                    }
                    else {
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/obligations/obligationsnew/updateobligationbyId?obligationId=' + vObligationID + '&obligationstatus=' + 'Complete',
                            type: 'POST',
                            dataType: 'json',
                            headers: { 'eContracts-ApiKey': vAPIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                            cache: false,
                            success: function (person) {
                                BindObligationsNew(vContractID);
                                swal({
                                    title: '',
                                    text: "Thanks, Obligation <span style=\"font-weight:700\">'" + vObligationTitle + "'</span> has been completed successfully.",
                                    showCancelButton: false,
                                    confirmButtonText: 'OK',
                                    html: true
                                });
                                $("#loadingPage").fadeOut();
                            },
                            error: function (status) {
                                swal("", "Could not mark obligation as complete.");
                                $("#loadingPage").fadeOut();
                            }
                        });
                    }
                }
                else {
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/obligations/obligationsnew/updateobligationbyId?obligationId=' + vObligationID + '&obligationstatus=' + 'Complete',
                        type: 'POST',
                        dataType: 'json',
                        headers: { 'eContracts-ApiKey': vAPIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                        cache: false,
                        success: function (person) {
                            BindObligationsNew(vContractID);
                            swal({
                                title: '',
                                text: "Thanks, Obligation <span style=\"font-weight:700\">'" + vObligationTitle + "'</span> has been completed successfully.",
                                showCancelButton: false,
                                confirmButtonText: 'OK',
                                html: true
                            });
                            $("#loadingPage").fadeOut();
                        },
                        error: function (status) {
                            swal("", "Could not mark obligation as complete.");
                            $("#loadingPage").fadeOut();
                        }
                    });
                }

            },
            error: function (catalogs) {
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/obligations/obligationsnew/updateobligationbyId?obligationId=' + vObligationID + '&obligationstatus=' + 'Complete',
                    type: 'POST',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': vAPIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                    cache: false,
                    success: function (person) {
                        BindObligationsNew(vContractID);
                        swal({
                            title: '',
                            text: "Thanks, Obligation <span style=\"font-weight:700\">'" + vObligationTitle + "'</span> has been completed successfully.",
                            showCancelButton: false,
                            confirmButtonText: 'OK',
                            html: true
                        });
                        $("#loadingPage").fadeOut();
                    },
                    error: function (status) {
                        swal("", "Could not mark obligation as complete.");
                        $("#loadingPage").fadeOut();
                    }
                });
            }
        });
    }
}

function sortDescending(a, b) {
    var date1 = $(a).find("span.DateToSort").text();
    date1 = date1.replace('(', '');
    date1 = date1.replace(')', '');
    date1 = date1.replace(':', '');
    date1 = date1.replace(/ /g, '');
    date1 = date1.split('/');

    if (localStorage.AppDateFormat == 'DD/MM/YYYY') { date1 = new Date(date1[2], date1[1] - 1, date1[0]); }
    else { date1 = new Date(date1[2], date1[0] - 1, date1[1]); }
    var date2 = $(b).find("span.DateToSort").text();
    date2 = date2.replace('(', '');
    date2 = date2.replace(')', '');
    date2 = date2.replace(':', '');
    date2 = date2.replace(/ /g, '');
    date2 = date2.split('/');

    if (localStorage.AppDateFormat == 'DD/MM/YYYY') { date2 = new Date(date2[2], date2[1] - 1, date2[0]); }
    else { date2 = new Date(date2[2], date2[0] - 1, date2[1]); }
    return date1 > date2 ? 1 : -1;
}

function DeleteNote(noteid) {
    swal({
        title: '',
        text: "Are you sure you want to <span style='font-weight:700'>delete</span>?",
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
                 url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/contracts/notes?noteid=' + noteid + '&username=' + localStorage.UserName,
                 type: 'DELETE',
                 dataType: 'json',
                 headers: {
                     'eContracts-ApiKey': vAPIKey
                 },
                 cache: false,
                 success: function (data) {
                     $("#loadingPage").fadeOut();
                     BindNotes(vContractID);
                 },
                 error: function (request) {
                     $("#loadingPage").fadeOut();
                     BindNotes(vContractID);
                 }
             });
         }
         return;
     });

}

function contextMenuCorrespondence(action, el, pos) {
    switch (action) {
        case "view":
            {
                var entityid = $(el).find("#RowKey").text();
                ViewCorrespondenceDetail(entityid);
                break;
            }
        case "download":
            {
                var LinkURL = $(el).find("#URLLink").text();
                var arr = LinkURL.split('/');
                var fileName = arr[arr.length - 1];

                var URIStart = fileName.substring(fileName.lastIndexOf("_") + 1);
                newWindow = window.open(LinkURL, URIStart);
                break;
            }
    }
}

function refreshdocuemnt() {
    if (documentview == null || documentview == "" || documentview == 'folder') {
        if ($('#showAll').text() != null && $('#showAll').text() != "" && typeof ($('#showAll').text()) != "undefined") {
            var selectedfoldervalue = $('#showAll').find("a");
            var textvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].textContent;
            var idvalueselected = $(selectedfoldervalue)[$(selectedfoldervalue).length - 1].id;
            var parentdocumentdetails = {
                id: idvalueselected, text: textvalueselected
            };
            showfolderdocuments(parentdocumentdetails);
        }
        else {
            BindDocument(vContractID);
        }
    } else {
        DisplayDocument(documentview);
    }
}

function checkObligationsstatusupdateNew(obj) {
    var text = "MenuObligationStatus" + obj.text;
    $('#dropdownMenuObligationStatusSettings').find('li').each(function () {

        var id = $(this).attr('id');
        if (id == text) {
            $(this).css('display', 'none');
        }
        else {
            $(this).css('display', '');

        }
    });

}

function ShowObligationsNew() {
    $('#obligationgroup').removeClass('active');
    $('#obligationungroup').addClass('active');

    $("#ObligationNewDetailsTable").css('display', '');
    $("#ObligationNewDetailsTableGroup").css('display', 'none');
    $("#obligationNewActionsdiv").css('display', '');
    $("#NoObligationNewDetails").css('display', 'none');
}

function BindObligationsNewGroup(contractid) {

    if (contractid == null || contractid == "") { contractid = vContractID; }
    $("#ObligationNewDetailsTableBodyGroup").empty();
    $("#dvObligationAlertNew").empty();
    $("#dvObligationAlertNew").css('display', 'none');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/obligations/obligationsnewgroup',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        headers: { 'eContracts-ApiKey': vAPIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'BusinessAreaLocation': localStorage.GlobalBusinessAreaLocation },
        data: JSON.stringify(listAllObligations),
        cache: false,
        async: false,
        success: function (contactsJsonPayload) {

            $('#obligationungroup').removeClass('active');
            $('#obligationgroup').addClass('active');

            $("#ObligationNewDetailsTable").css('display', 'none');
            $("#ObligationNewDetailsTableGroup").css('display', '');
            $("#obligationNewActionsdiv").css('display', '');
            var count = 0;
            $("#NoObligationNewDetails").css('display', 'none');
            $(contactsJsonPayload).each(function (i, item) {
                count++;

                var vDueDate = '';
                if (item.ObligationStartDate != null) {
                    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                    { vDueDate = item.ObligationStartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                    else {
                        if (localStorage.AppDateFormat == 'DD/MM/YYYY') { vDueDate = item.ObligationStartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1'); }
                        else if (localStorage.AppDateFormat == 'MM/DD/YYYY') { vDueDate = item.ObligationStartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                    }
                }
                else {
                    vDueDate = "-";
                }

                if (item.ObligationEndDate != null) {
                    vDueDate += " to ";
                    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                    { vDueDate += item.ObligationEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                    else {
                        if (localStorage.AppDateFormat == 'DD/MM/YYYY') { vDueDate += item.ObligationEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1'); }
                        else if (localStorage.AppDateFormat == 'MM/DD/YYYY') { vDueDate += item.ObligationEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                    }
                }
                else {
                    vDueDate += " to ";
                    vDueDate += "-";
                }

                var url = '<a  href="javascript:void(0)" class="linkText">' + item.ObligationTitle + '</a>';

                var htmlContent = "<tr>";
                htmlContent += "<td><p id='ObligationID' style='display:none;'>" + item.RowKey + "</p>";
                htmlContent += "<span id='ObligationTitle' style='display:none;'>" + item.ObligationTitle + "</span>";
                htmlContent += "<span id='ObligationText' style='display:none;'>" + item.ObligationText + "</span>";
                htmlContent += "<span id='ObligationRecurrence' style='display:none;'>" + item.Recurrences + "</span>";
                htmlContent += "<span id='ObligationStatus' style='display:none;'>" + item.ObligationStatus + "</span>";


                htmlContent += "<i class='obligation_Products_Items'>" + url + "</i></td>";
                htmlContent += "<td ><span id='ObligationTypeGroup" + item.RowKey + "'>" + item.ObligationType + "</span></td>";

                htmlContent += "<td  ><lable id='ObligationRecGroup" + item.RowKey + "'>" + item.Recurrences + "</lable></td>";

                htmlContent += "<td  ><lable id='ObligationOcuGroup" + item.RowKey + "'>" + item.Ocurrences + "</lable></td>";

                htmlContent += "<td  ><lable id='ObligationDueDateGroup" + item.RowKey + "'>" + vDueDate + "</lable></td>";



                htmlContent += "</tr>";
                $("#ObligationNewDetailsTableBodyGroup").append(htmlContent);

            });


            //$(".openmenuObligationNewGroup").contextMenu({ menu: 'dropdownMenuobligation', leftButton: true }, function (action, el, pos) {
            //    contextMenuObligationNew(action, el.parent("i").parent("td").parent("tr"), pos);
            //});

            $("#loadingPage").fadeOut();
        },
        error: function (request) {
            $("#NoObligationNewDetails").css('display', '');
            $("#obligationNewActionsdiv").css('display', 'none');
            $("#loadingPage").fadeOut();
            $("#lblObligationNewCount").text('0');
            $("#ulObligationNew").empty();
            $("#ulObligationNew").append('No items found.');
        }

    });
}

function contextMenuObligationStatusSettings(action, el, pos) {

    switch (action) {
        case "Upcoming":
            {
                var obligationID = $(el).find("#ObligationID").text();
                var obligationText = $(el).find("#ObligationText").text();
                var obligationRecurrence = $(el).find("#ObligationRecurrence").text();

                var duedateid = "ObligationDue" + obligationID;
                var obligationDueDate = $(el).find("#" + duedateid).text();
                var obligationStatus = $(el).find("#ObligationStatus").text();
                var mydate = moment(obligationDueDate, 'DD/MM/YYYY');
                mydate = moment(mydate).format("MM/DD/YYYY");

                if (comparedatestatus(mydate, action)) {

                    $("#inprocessObligation").css('visibility', 'visible');
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/obligations/obligationsnew/updateobligationbyId?obligationId=' + obligationID + '&obligationstatus=' + 'Upcoming',
                        type: 'POST',
                        dataType: 'json',
                        headers: { 'eContracts-ApiKey': vAPIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                        cache: false,
                        success: function (person) {
                            $('.ui-button-green-text').parent().removeAttr('disabled');

                            GetObligationCatalogs();
                            $("#obligationNewActions").css('display', 'none');
                        },
                        complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                    });

                } else {
                    swal("", "Due Date is past date. So Status can not be Upcoming");
                }
                break;
            }
        case "Delayed":
            {
                var obligationID = $(el).find("#ObligationID").text();
                var obligationText = $(el).find("#ObligationText").text();
                var obligationRecurrence = $(el).find("#ObligationRecurrence").text();
                var duedateid = "ObligationDue" + obligationID;
                var obligationDueDate = $(el).find("#" + duedateid).text();
                var obligationStatus = $(el).find("#ObligationStatus").text();
                var mydate = moment(obligationDueDate, 'DD/MM/YYYY');
                mydate = moment(mydate).format("MM/DD/YYYY");

                if (comparedatestatus(mydate, action)) {

                    $("#inprocessObligation").css('visibility', 'visible');
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/obligations/obligationsnew/updateobligationbyId?obligationId=' + obligationID + '&obligationstatus=' + 'Delayed',
                        type: 'POST',
                        dataType: 'json',
                        headers: { 'eContracts-ApiKey': vAPIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                        cache: false,
                        success: function (person) {
                            $('.ui-button-green-text').parent().removeAttr('disabled');
                            GetObligationCatalogs();
                            $("#obligationNewActions").css('display', 'none');
                        },
                        complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                    });
                } else {
                    swal("", "Due Date is future date. So Status can not be Delayed");
                }
                break;
            }
        case "Partial":
            {

                var obligationID = $(el).find("#ObligationID").text();
                var obligationText = $(el).find("#ObligationText").text();
                var obligationRecurrence = $(el).find("#ObligationRecurrence").text();


                $("#inprocessObligation").css('visibility', 'visible');
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/obligations/obligationsnew/updateobligationbyId?obligationId=' + obligationID + '&obligationstatus=' + 'Partial',
                    type: 'POST',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': vAPIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                    cache: false,
                    success: function (person) {
                        $('.ui-button-green-text').parent().removeAttr('disabled');

                        GetObligationCatalogs();
                        $("#obligationNewActions").css('display', 'none');
                    },
                    complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                });

                break;
            }
        case "Cancelled":
            {

                var obligationID = $(el).find("#ObligationID").text();
                var obligationText = $(el).find("#ObligationText").text();
                var obligationRecurrence = $(el).find("#ObligationRecurrence").text();


                $("#inprocessObligation").css('visibility', 'visible');
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/obligations/obligationsnew/updateobligationbyId?obligationId=' + obligationID + '&obligationstatus=' + 'Cancelled',
                    type: 'POST',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': vAPIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                    cache: false,
                    success: function (person) {
                        $('.ui-button-green-text').parent().removeAttr('disabled');

                        swal("", "Obligation Updated");
                        GetObligationCatalogs();
                        $("#obligationNewActions").css('display', 'none');
                    },
                    complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                });


                break;
            }
        case "Complete":
            {
                var obligationID = $(el).find("#ObligationID").text();
                var obligationText = $(el).find("#ObligationText").text();
                var obligationRecurrence = $(el).find("#ObligationRecurrence").text();
                $("#loadingPage").fadeIn();
                $("#inprocessObligation").css("visibility", "hidden");
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/obligations/obligationcatalogs?obligationtext=' + obligationText + '&obligationId=' + obligationID,
                    type: 'GET',
                    dataType: 'json',
                    "Content-Type": "application/json",
                    headers: { 'eContracts-ApiKey': vAPIKey },
                    cache: false,
                    async: false,
                    success: function (catalogs) {

                        if (catalogs != null && catalogs.length > 0) {
                            var catalogitems = "";

                            catalogitems = $.grep(catalogs, function (p) { return p.ObligationCatalogStatus != "Complete" && p.ObligationCatalogStatus != "Cancelled"; })
       .map(function (p) { return p });


                            if (catalogitems != null && catalogitems != "") {
                                clearObligationFormDataNew();
                                vObligationFlaging = "EDIT";
                                validateproducts = false;


                                $.ajax({
                                    url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/obligations?obligationid=' + obligationID,
                                    type: 'GET',
                                    dataType: 'json',
                                    headers: { 'eContracts-ApiKey': vAPIKey },
                                    "Content-Type": "application/json",
                                    cache: false,
                                    success: function (obligationentity) {
                                        $("#loadingPage").fadeOut();
                                        $('#hdnProductUpdates').text('EDIT');
                                        $("#hdnObligationUniqueId").text(obligationentity.ObligationText);
                                        $("#hdnObligationRowKey").text(obligationentity.RowKey);

                                        var strCompanyProfile = "";
                                        var strCounterpartynew = "";

                                        if ($("#lblCompanyProfile").text() == null || $("#lblCompanyProfile").text() == "") {
                                            strCompanyProfile = "Not Available"
                                        }
                                        else {
                                            strCompanyProfile = $("#lblCompanyProfile").text();
                                        }

                                        if ($("#lblCounterparty").text() == null || $("#lblCounterparty").text() == "") {
                                            strCounterpartynew = "Not Available";
                                            document.getElementById("rdObligationNewPerformedPartyCP").disabled = true;

                                        }
                                        else {
                                            strCounterpartynew = $("#lblCounterparty").text();
                                            document.getElementById("rdObligationNewPerformedPartyCP").disabled = false;

                                        }


                                        string1 = "My Company" + " " + "(" + strCompanyProfile + ")";
                                        string2 = "Counterparty" + " " + "(" + strCounterpartynew + ")";

                                        $("#PerformedPartySelf").text(string1);
                                        $("#PerformedPartyCounterparty").text(string2);
                                        vObligationTextEditRecurrence = "";

                                        $("#lblCTitleObligationNew").text(obligationentity.ContractTitle)
                                        var duedate = "";

                                        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                                        { duedate = moment(new Date(obligationentity.DueDate)).format('MM/DD/YYYY'); }
                                        else { duedate = moment(new Date(obligationentity.DueDate)).utc().format(localStorage.AppDateFormat); }
                                        $("#txtObligationNewID").val(obligationentity.RowKey);
                                        $("#txtObligationNewText").val(obligationentity.ObligationText);
                                        $("#txtObligationNewTitle").val(obligationentity.ObligationTitle);
                                        $("#ddlObligationTypeNew option").filter(function (index) { return $(this).text() === obligationentity.ObligationType; }).prop('selected', true);
                                        $("#txtObligationNewDesc").val(obligationentity.Description);
                                        GetValuesAndAutoPopulate("ddlObligationNewOwner", obligationentity.ObligationOwner);
                                        $("#dtObligationNewDueDate").val(duedate);

                                        $('input[type="radio"][name="PerformedParty"][value="' + obligationentity.PerformedBy + '"]').prop('checked', true);
                                        $("#ddlObligationStatus option").filter(function (index) { return $(this).text() === obligationentity.ObligationStatus; }).prop('selected', true);

                                        $("#ddlObligationOccurencess option").filter(function (index) { return $(this).text() === obligationentity.Recurrences; }).prop('selected', true);
                                        var newDate = new Date(obligationentity.DueDate);
                                        listObligationNewStartDate = duedate;
                                        var strEndDate = "";
                                        if (contractItem.EndDate != "" && contractItem.EndDate != null && contractItem.EndDate != "null") {
                                            strEndDate = new Date(contractItem.EndDate);
                                            listObligationNewEndDate = formatDate(strEndDate);
                                            $('#ObligationNewOcurrenceEndDate').text("");
                                            var ONewEndDate = "";
                                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                                                if (getTimeZone().indexOf('+') > -1)
                                                    ONewEndDate = moment(new Date(listObligationNewEndDate)).format('MM/DD/YYYY');
                                                else if (getTimeZone().indexOf('+00:00') > -1 || getTimeZone().indexOf('-') > -1)
                                                    ONewEndDate = moment(new Date(listObligationNewEndDate)).utc().add(1, 'days').format('MM/DD/YYYY');
                                            }
                                            else {
                                                if (getTimeZone().indexOf('+') > -1)
                                                    ONewEndDate = moment(new Date(listObligationNewEndDate)).format(localStorage.AppDateFormat);
                                                else if (getTimeZone().indexOf('+00:00') > -1 || getTimeZone().indexOf('-') > -1)
                                                    ONewEndDate = moment(new Date(listObligationNewEndDate)).utc().add(1, 'days').format(localStorage.AppDateFormat);
                                            }

                                            $('#ObligationNewOcurrenceEndDate').text(" (" + ONewEndDate + ")");
                                            $("#rdObligationNewEndOccurence").prop("checked", true);
                                        }
                                        else {
                                            listObligationNewEndDate = "Not Available";
                                            $('#ObligationNewOcurrenceEndDate').text("");
                                            $('#ObligationNewOcurrenceEndDate').text(" (" + listObligationNewEndDate + ")");
                                            $("#rdObligationNewEndOccurence").attr('disabled', true);
                                            $('#rdObligationNewEndOccurence').removeAttr('checked');
                                            $("#rdObligationNewEndOccurenceUser").prop("checked", true);
                                            userFlagObli = false;

                                        }

                                        if (obligationentity.ObligationStatus == "Complete" || obligationentity.ObligationStatus == "Cancelled") {
                                            $("#ulObliCompletedate").css('display', '');
                                            $('#dtObligationNewCompletedDate').addClass('validelement');
                                            $('#dtObligationNewCompletedDate').addClass('validdate');
                                            if (obligationentity.ObligationMetDate != null && obligationentity.ObligationMetDate != "") {

                                                var OMetDate = "";
                                                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                                                { OMetDate = moment(new Date(obligationentity.ObligationMetDate)).format('MM/DD/YYYY'); }
                                                else { OMetDate = moment(new Date(obligationentity.ObligationMetDate)).utc().format(localStorage.AppDateFormat); }
                                                $('#dtObligationNewCompletedDate').val(OMetDate);
                                            }
                                            else {
                                                var CEDate = new Date();
                                                CEDate = formatDate(CEDate);

                                                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                                                { CEDate = moment(new Date(CEDate)).format('MM/DD/YYYY'); }
                                                else { CEDate = moment(new Date(CEDate)).utc().format(localStorage.AppDateFormat); }
                                                $('#dtObligationNewCompletedDate').val(CEDate);
                                            }

                                        }
                                        else {
                                            $("#ulObliCompletedate").css('display', 'none');
                                            $('#dtObligationNewCompletedDate').removeClass('validelement');
                                            $('#dtObligationNewCompletedDate').removeClass('validdate');
                                            $('#dtObligationNewCompletedDate').val('');
                                        }
                                        $("#dtOblOcurrMonthforYear").val(monthNames[newDate.getMonth()]);
                                        $("#dtOblOcurrDateforYear").val(newDate.getDate());


                                        $("#dtObligationNewOccurrenceDueDate").val(newDate.getDate());

                                        $('input[type="radio"][name="SelectOccurenceEndDate"][value="' + obligationentity.ObligationEndTerm + '"]').prop('checked', true);

                                        if (obligationentity.ObligationEndTerm == "Custom") {
                                            $("#txtOccurrenceCount").val(obligationentity.Ocurrences);

                                        }
                                        else {
                                            $("#txtOccurrenceCount").val("12");
                                        }

                                        var fObligationStartDate = "";
                                        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                                        { fObligationStartDate = moment(new Date(obligationentity.ObligationStartDate)).format('MM/DD/YYYY'); }
                                        else { fObligationStartDate = moment(new Date(obligationentity.ObligationStartDate)).utc().format(localStorage.AppDateFormat); }
                                        var dtStartdate = fObligationStartDate;

                                        var fObligationEndDate = "";
                                        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                                        { fObligationEndDate = moment(new Date(obligationentity.ObligationEndDate)).format('MM/DD/YYYY'); }
                                        else { fObligationEndDate = moment(new Date(obligationentity.ObligationEndDate)).utc().format(localStorage.AppDateFormat); }
                                        var dtEnddate = fObligationEndDate;


                                        $('#ObligationOcurrenceSummary').text("(" + dtStartdate + " to " + dtEnddate + ", " + obligationentity.Ocurrences + " instances)")

                                        vObligationEditStatus = "";

                                        var dateNew = new Date(obligationentity.DueDate);

                                        $("input:checkbox[name=chkRecurrenceCustom]").each(function () {
                                            this.checked = false;
                                        });
                                        var day = dateNew.getDay()
                                        var chkboxId = "ORC" + day;

                                        $("#" + chkboxId).prop('checked', true);


                                        if (obligationentity.Recurrences == "Weekly") {


                                            $("#dtObligationNewDueDate").attr("disabled", "disabled");


                                            var strRecString = obligationentity.CustomString;
                                            var value = parseInt(strRecString);
                                            $("input:checkbox[name=chkRecurrenceCustom]").each(function () {
                                                this.checked = false;

                                            });

                                            var chkboxId = "ORC" + value;

                                            $("#" + chkboxId).prop('checked', true);
                                            $("#divOcurrenceSummary").css('display', '');
                                            $("#obligationEditOcursumary").css('display', '');

                                            $("#divObligationOcurrenceWeekly").css('display', 'none');
                                            $("#divObligationOcurrenceMonthly").css('display', 'none');

                                            $("#aobligationRecNoneEdit").css('display', 'none');
                                            $("#aobligationRecEdit").css('display', '');

                                            $("#dvobligationOcurrenceEnd").css('display', 'none');

                                            $("#liObligationRecurrence").css('display', 'none');



                                        }
                                        else if (obligationentity.Recurrences == "None") {
                                            $("#dvobligationOcurrenceEnd").css('display', 'none');
                                            $("#divObligationOcurrenceMonthly").css('display', 'none');
                                            $("#divObligationOcurrenceWeekly").css('display', 'none');
                                            $("#divOcurrenceSummary").css('display', '');

                                            $("#obligationEditOcursumary").css('display', '');


                                            $("#aobligationRecNoneEdit").css('display', '');
                                            $("#aobligationRecEdit").css('display', 'none');
                                            $("#liObligationRecurrence").css('display', 'none');
                                            $('#ObligationOcurrenceSummary').text("(" + "Never" + ")")


                                        }
                                        else if (obligationentity.Recurrences == "Monthly") {
                                            $("#divObligationOcurrenceWeekly").css('display', 'none');
                                            $("#divObligationOcurrenceMonthly").css('display', 'none');
                                            $("#ddlRepeatMonthly").css('display', '');
                                            $("#ddlRepeatMonthly").val(obligationentity.RecMonthlyString);


                                            $("#dtObligationNewDueDate").attr("disabled", "disabled");


                                            $("#divOcurrenceSummary").css('display', '');
                                            $("#obligationEditOcursumary").css('display', '');


                                            $("#lblOcurrenceMonth").css('display', '');
                                            $("#lblOcurrenceYear").css('display', 'none');

                                            $("#aobligationRecNoneEdit").css('display', 'none');
                                            $("#aobligationRecEdit").css('display', '');
                                            $("#dvobligationOcurrenceEnd").css('display', 'none');
                                            $("#liObligationRecurrence").css('display', 'none');


                                        }
                                        else {
                                            $("#divObligationOcurrenceWeekly").css('display', 'none');
                                            $("#divObligationOcurrenceMonthly").css('display', 'none');
                                            $("#ddlRepeatMonthly").css('display', 'none');

                                            $("#lblOcurrenceMonth").css('display', 'none');
                                            $("#lblOcurrenceYear").css('display', '');


                                            $("#dtObligationNewDueDate").attr("disabled", "disabled");


                                            $("#divOcurrenceSummary").css('display', '');
                                            $("#obligationEditOcursumary").css('display', '');

                                            $("#aobligationRecNoneEdit").css('display', 'none');
                                            $("#aobligationRecEdit").css('display', '');
                                            $("#dvobligationOcurrenceEnd").css('display', 'none');
                                            $("#liObligationRecurrence").css('display', 'none');

                                        }

                                        $("#lblCTitleObli").text($("#lblContractTitle").text());

                                        if (catalogs.length > 0) {
                                            vCatalogCount = "Yes";
                                            $('#txtObligationProductsCount').val("Yes");
                                            document.getElementById('obligationcatalogDetailsTable').style.display = '';
                                            document.getElementById('NoObligationCatalog').style.display = 'none';
                                            for (var i = 0; i < catalogs.length; i++) {
                                                var str = "";
                                                var strCommitment = "";
                                                var strCom = "";

                                                var url = '<input type="checkbox" id="' + catalogs[i].RowKey + '" name="MultipleObligationCatalogs" onclick="checkMultipleObligationCatalogs(this);" value="' + catalogs[i].RowKey + '">&nbsp;<a  href="javascript:void(0)" onclick="ViewObligationCatalogDetail(\'' + catalogs[i].RowKey + '\')" class="linkText">' + catalogs[i].ObligationCatalogName + '</a>&nbsp;<img src="/Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuRelatedObligationCatalogs"/>';

                                                var htmlContent = "<tr>";
                                                htmlContent += "<td><p id='ObligationCatalogID' style='display:none;'>" + catalogs[i].RowKey + "</p>";
                                                htmlContent += "<span id='ObligationCatalogTitle' style='display:none;'>" + catalogs[i].ObligationCatalogName + "</span>";
                                                htmlContent += "<span id='ObligationCatalogObligationText' style='display:none;'>" + catalogs[i].ObligationText + "</span>";
                                                htmlContent += "<span id=''ObligationCatalogUnits' style='display:none;'>" + catalogs[i].ObligationUnits + "</span>";
                                                htmlContent += "<span id=''ObligationCatalogQty' style='display:none;'>" + catalogs[i].ObligationQuantity + "</span>";

                                                htmlContent += "<i class='obligation_Products_Items'>" + url + "</i></td>";

                                                if (catalogs[i].ObligationQuantity != "" && catalogs[i].ObligationQuantity != null) {
                                                    htmlContent += "<td><span style='margin-left: 10px;float:left' id='ObligationQty" + catalogs[i].RowKey + "'>" + catalogs[i].ObligationQuantity + "</span>&nbsp;<lable style=''margin-left: 10px;float:left;'>" + catalogs[i].ObligationUnits + "</lable></td>";

                                                }
                                                else {
                                                    htmlContent += '<td style="text-align: center;"> - </td>';

                                                }

                                                if (catalogs[i].QuantityActual != "" && catalogs[i].QuantityActual != null && catalogs[i].QuantityActual != "null") {
                                                    htmlContent += "<td ><span style='margin-left: 10px;float:left' id='QuantityActual" + catalogs[i].RowKey + "'>" + catalogs[i].QuantityActual + "</span>&nbsp;<lable style=''margin-left: 10px;float:left;'>" + catalogs[i].ObligationUnits + "</lable></td>";

                                                }
                                                else {
                                                    htmlContent += '<td style="text-align: center;"> - </td>';

                                                }

                                                if (catalogs[i].ObligationAmount != "" && catalogs[i].ObligationAmount != null && catalogs[i].ObligationAmount != "0" && catalogs[i].ObligationAmount != 0) {
                                                    htmlContent += "<td ><span style='margin-left: 10px;float:left' id='ObligationAmount" + catalogs[i].RowKey + "'>" + catalogs[i].ObligationAmount + "</span>&nbsp;<lable style=''margin-left: 10px;float:left;'>" + catalogs[i].ObligationCurrency + "</lable></td>";

                                                }
                                                else {
                                                    htmlContent += '<td style="text-align: center;"> - </td>';

                                                }

                                                if (catalogs[i].AmountActual != "" && catalogs[i].AmountActual != null && catalogs[i].AmountActual != "0" && catalogs[i].AmountActual != 0) {
                                                    htmlContent += "<td ><span style='margin-left: 10px;float:left' id='AmountActual" + catalogs[i].RowKey + "'>" + catalogs[i].AmountActual + "</span>&nbsp;<lable style=''margin-left: 10px;float:left;'>" + catalogs[i].ObligationCurrency + "</lable></td>";

                                                }
                                                else {
                                                    htmlContent += '<td style="text-align: center;"> - </td>';

                                                }
                                                if ($("#hdnPermission").val() != 'View' && $("#hdnPermission").val() != "" && $("#hdnPermission").val() != null) {
                                                    if (contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived") {
                                                        htmlContent += "<td><a href='javascript:void(0);' class='wit-btn obli_status_chang'>" + catalogs[i].ObligationCatalogStatus + "</a></td>";
                                                    }
                                                    else {
                                                        htmlContent += "<td style='padding:2px;><a href='javascript:void(0);' onclick='checkObligationsstatusupdateNew(this);' class='wit-btn obli_status_chang openmenuObligationCatalogStatusSettings'>" + catalogs[i].ObligationCatalogStatus + "<img class='margin_left_5px' src='/Content/Images/card.png'></a></td>";
                                                    }
                                                }
                                                else
                                                    htmlContent += "<td><a href='javascript:void(0);' class='wit-btn obli_status_chang'>" + catalogs[i].ObligationCatalogStatus + "</a></td>";



                                                htmlContent += "</tr>";
                                                $("#ulObligationCatalogBody").append(htmlContent);

                                            }
                                            $(".openmenuRelatedObligationCatalogs").contextMenu({ menu: 'dropdownMenuRelatedObligationCatalogs', leftButton: true }, function (action, el, pos) {
                                                contextMenuObligationCatalogs(action, el.parent("i").parent("td").parent("tr"), pos);
                                            });



                                            $(".openmenuObligationCatalogStatusSettings").contextMenu({
                                                menu: 'dropdownMenuObligationStatusSettings', leftButton: true
                                            }, function (action, el, pos) {
                                                contextMenuObligationCatalogStatusSettings(action, el.parent("tr"), pos);
                                            });



                                        }
                                        else {
                                            document.getElementById("cbObligationCatalogProductsSelect").disabled = false;
                                            vCatalogCount = "No";
                                            $('#NoObligationCatalog').css('display', '');

                                            $('#txtObligationProductsCount').val("No");

                                            vExist = false;
                                        }
                                        if (vCatalogCount == "Yes") {
                                            $("#trObliFinShow").css('display', 'none');
                                            document.getElementById("cbObligationCatalogProductsSelect").checked = true;

                                            document.getElementById("cbObligationCatalogProductsSelect").disabled = true;
                                            var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                                            var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                                                return (n.RowKey == "10" && n.Status == "ON");
                                            });
                                            if (vAccFeat.length > 0) {
                                                $("#dvObligationCatalogProducts").css('display', '');
                                            }

                                        }

                                        var fDueDate = "";
                                        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                                        { fDueDate = moment(new Date(obligationentity.DueDate)).format('MM/DD/YYYY'); }
                                        else { fDueDate = moment(new Date(obligationentity.DueDate)).utc().format(localStorage.AppDateFormat); }
                                        var oblnewdate1 = fDueDate;

                                        var fObligationEndDate = "";
                                        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                                        { fObligationEndDate = moment(new Date(obligationentity.ObligationEndDate)).format('MM/DD/YYYY'); }
                                        else { fObligationEndDate = moment(new Date(obligationentity.ObligationEndDate)).utc().format(localStorage.AppDateFormat); }
                                        var oblnewdate2 = fObligationEndDate;


                                        $('#orepupdatesingle').text("");
                                        $('#orepupdaterecurrence').text("");
                                        $('#ornepupdatesingle').text("");
                                        $('#ornepupdaterecurrence').text("");

                                        $('#orepupdatesingle').text("(" + oblnewdate1 + ")");
                                        $('#orepupdaterecurrence').text("(" + oblnewdate1 + " to " + oblnewdate2 + ")");
                                        $('#ornepupdatesingle').text("(" + oblnewdate1 + ")");
                                        $('#ornepupdaterecurrence').text("(" + oblnewdate1 + " to " + oblnewdate2 + ")");




                                        $(".validelement").each(function (index, element) {
                                            $(element).removeClass("error");
                                            $("#errormsg_" + element.id).remove();
                                        });


                                        $("#obligationnewheading").text("Edit Obligation");
                                        $("#addEditObligationNew").dialog("option", "title", "");
                                        $("#addEditObligationNew").dialog("open");

                                    }
                                });

                            }
                            else {
                                validateproducts = true;

                                $.ajax({
                                    url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/obligations/obligationsnew/updateobligationbyId?obligationId=' + obligationID + '&obligationstatus=' + 'Complete',
                                    type: 'POST',
                                    dataType: 'json',
                                    headers: { 'eContracts-ApiKey': vAPIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                                    cache: false,
                                    success: function (person) {
                                        $('.ui-button-green-text').parent().removeAttr('disabled');
                                        GetObligationCatalogs();
                                    },
                                    complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                                });
                            }

                        }
                        else {
                            $.ajax({
                                url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/obligations/obligationsnew/updateobligationbyId?obligationId=' + obligationID + '&obligationstatus=' + 'Complete',
                                type: 'POST',
                                dataType: 'json',
                                headers: { 'eContracts-ApiKey': vAPIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                                cache: false,
                                success: function (person) {
                                    $('.ui-button-green-text').parent().removeAttr('disabled');
                                    GetObligationCatalogs();
                                },
                                complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                            });
                        }


                        $("#obligationNewActions").css('display', 'none');

                    },
                    error: function (catalogs) {


                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/obligations/obligationsnew/updateobligationbyId?obligationId=' + obligationID + '&obligationstatus=' + 'Complete',
                            type: 'POST',
                            dataType: 'json',
                            headers: { 'eContracts-ApiKey': vAPIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                            cache: false,
                            success: function (person) {
                                $('.ui-button-green-text').parent().removeAttr('disabled');
                                GetObligationCatalogs();
                            },
                            complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                        });

                    }
                });


                break;
            }
    }
}

function comparedatestatus(firstDate, status) {

    var isvalid = true;
    if (firstDate != null && firstDate != '' &&
        status != null && status != '') {
        if (status == "Upcoming") {
            var dt1 = new Date(firstDate);
            var dt2 = new Date();


            var dateOne = new Date(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()); //Year, Month, Date
            var dateTwo = new Date(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()); //Year, Month, Date

            if (dateOne > dateTwo) {
                isvalid = true;
            } else {
                isvalid = false;
            }

        }
        else if (status == "Delayed") {

            var dt1 = new Date(firstDate);
            var dt2 = new Date();

            var dateOne = new Date(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()); //Year, Month, Date
            var dateTwo = new Date(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()); //Year, Month, Date

            if (dateOne < dateTwo) {
                isvalid = true;
            } else {
                isvalid = false;
            }

        }
    }
    return isvalid;
}

function contextMenuObligationCatalogs(action, el, pos) {

    switch (action) {
        case "view":
            {
                var catalogId = $(el).find("#ObligationCatalogID").text();
                ViewObligationCatalogDetail(catalogId);
                break;
            }
        case "delete":
            {
                var catalogTitle = $(el).find("#ObligationCatalogTitle").text();
                swal({
                    title: '',
                    text: "Are you sure you want to delete '<span style=\"font-weight:700\">" + catalogTitle + "</span>'?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
     function (confirmed) {
         if (confirmed) {
             var catalogId = $(el).find("#ObligationCatalogID").text();
             $.ajax({
                 url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/obligations/obligationcatalogs?catalogid=' + catalogId,
                 type: 'DELETE',
                 dataType: 'json',
                 headers: { 'eContracts-ApiKey': vAPIKey, username: localStorage.UserName },
                 "Content-Type": "application/json",
                 cache: false,
                 success: function (data) {

                     if ($('#hdnProductUpdates').text() == "EDIT") {
                         $('#hdnProductUpdates').text('');
                         $('#hdnProductUpdates').text('EDITCATALOG');
                     }

                     getObligationCatalogsNew(vContractID, $("#hdnObligationUniqueId").text(), $("#hdnObligationRowKey").text());
                 },
                 complete: function () {
                     $("#loadingPage").fadeOut();
                 }
             });
         }
         return;
     });

                break;
            }
        case "edit":
            {
                $("#loadingPage").fadeIn();
                var catalogId = $(el).find("#ObligationCatalogID").text();
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/obligations/obligationcatalogs?catalogid=' + catalogId,
                    type: 'GET',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': vAPIKey },
                    "Content-Type": "application/json",
                    cache: false,
                    success: function (cataloentity) {


                        if ($('#hdnProductUpdates').text() == "EDIT") {
                            $('#hdnProductUpdates').text('');
                            $('#hdnProductUpdates').text('EDITCATALOG');
                        }




                        $('#obliCatalogQtyEditsummary').text('');
                        $("#txtObligationCatalogNameedit").prop('disabled', true);
                        $("#txtObligationCatalogQtyNewEdit").prop('disabled', true);
                        $('#txtObligationCatalogQtyNewEdit').removeClass('validelement');
                        $("#txtObligationCatalogQtyNewEdit").val('');

                        $('#txtObligationProductAmountNewActualEdit').removeClass('validelement');
                        $("#txtObligationProductAmountNewActualEdit").val('');
                        $("#txtObligationProductAmountNewActualEdit").prop('disabled', true);

                        $('#txtObligationProductAmountNewActualEdit').removeClass('obli_catalog_enable')
                        $('#txtObligationProductAmountNewActualEdit').addClass('obli_catalog_disable')

                        $('#txtObligationCatalogQtyNewEdit').removeClass('obli_catalog_enable')
                        $('#txtObligationCatalogQtyNewEdit').addClass('obli_catalog_disable')

                        $("#lblObligationCatalogCTitleEdit").text($("#lblContractTitle").text());
                        $("#txtObligationCatalogIDedit").val(cataloentity.RowKey);
                        $("#txtObligationCatalogNameedit").val(cataloentity.ObligationCatalogName);

                        if (cataloentity.ObligationUnits != "" && cataloentity.ObligationUnits != null) {
                            $("#ddlObligationCatalogUnitsEdit").val(cataloentity.ObligationUnits);
                            $("#ddlObligationCatalogUnitsNewEdit").val(cataloentity.ObligationUnits);


                        }
                        else {
                            $("#ddlObligationCatalogUnitsEdit").val("0");
                            $("#ddlObligationCatalogUnitsNewEdit").val("0");


                        }

                        if (cataloentity.ObligationCatalogStatus != "" && cataloentity.ObligationCatalogStatus != null) {

                            if (cataloentity.ObligationCatalogStatus == "Complete") {
                                $("#ddlObligationCatalogStatusEdit").val(cataloentity.ObligationCatalogStatus);
                                $("#txtObligationCatalogQtyNewEdit").val(cataloentity.QuantityActual);

                                if (cataloentity.ObligationQuantity != "" && cataloentity.ObligationQuantity != null) {

                                    $('#txtObligationCatalogQtyNewEdit').removeClass('obli_catalog_disable')
                                    $('#txtObligationCatalogQtyNewEdit').addClass('obli_catalog_enable')
                                }
                                else {
                                    $('#txtObligationCatalogQtyNewEdit').removeClass('obli_catalog_enable')
                                    $('#txtObligationCatalogQtyNewEdit').addClass('obli_catalog_disable')
                                }

                                if (cataloentity.AmountActual != "" && cataloentity.AmountActual != null && cataloentity.AmountActual != "0" && cataloentity.AmountActual != 0) {

                                    $('#txtObligationProductAmountNewActualEdit').removeClass('obli_catalog_disable')
                                    $('#txtObligationProductAmountNewActualEdit').addClass('obli_catalog_enable')


                                }
                                else {
                                    $('#txtObligationProductAmountNewActualEdit').removeClass('obli_catalog_enable')
                                    $('#txtObligationProductAmountNewActualEdit').addClass('obli_catalog_disable')

                                }

                            }
                            else {
                                $("#ddlObligationCatalogStatusEdit").val(cataloentity.ObligationCatalogStatus);
                                $("#txtObligationCatalogQtyNewEdit").val("");


                                $('#txtObligationProductAmountNewActualEdit').removeClass('obli_catalog_enable')
                                $('#txtObligationProductAmountNewActualEdit').addClass('obli_catalog_disable')

                                $('#txtObligationCatalogQtyNewEdit').removeClass('obli_catalog_enable')
                                $('#txtObligationCatalogQtyNewEdit').addClass('obli_catalog_disable')

                            }

                        }
                        else {
                            $("#ddlObligationCatalogStatusEdit").val(0);
                            $('#txtObligationProductAmountNewActualEdit').removeClass('obli_catalog_enable')
                            $('#txtObligationProductAmountNewActualEdit').addClass('obli_catalog_disable')

                            $('#txtObligationCatalogQtyNewEdit').removeClass('obli_catalog_enable')
                            $('#txtObligationCatalogQtyNewEdit').addClass('obli_catalog_disable')

                        }


                        if (cataloentity.Description != "" && cataloentity.Description != null) {
                            $("#txtObligationCatalogDescEdit").val(cataloentity.Description);

                        }
                        else {
                            $("#txtObligationCatalogDescEdit").val("");

                        }


                        if (cataloentity.ObligationQuantity != "" && cataloentity.ObligationQuantity != null) {
                            $("#txtObligationCatalogQtyEdit").val(cataloentity.ObligationQuantity);

                        }
                        else {
                            $("#txtObligationCatalogQtyEdit").val("");

                        }

                        if (cataloentity.ObligationQtyType != "" && cataloentity.ObligationQtyType != null) {
                            $("#ddlObligationCatalogUnitTypeEdit").val(cataloentity.ObligationQtyType);

                        }
                        else {
                            $("#ddlObligationCatalogUnitTypeEdit").val(0);

                        }

                        if (cataloentity.QuantityActual != "" && cataloentity.QuantityActual != null) {
                            $("#txtObligationCatalogQtyNewEdit").val(cataloentity.QuantityActual);


                            $("#txtObligationCatalogQtyNewEdit").prop('disabled', false);
                            $('#txtObligationCatalogQtyNewEdit').addClass('validelement');


                            var string1 = "";
                            string1 = "Quantity Actual vs Expected, ";



                            if (parseInt(cataloentity.QuantityActual) >= parseInt(cataloentity.ObligationQuantity)) {
                                string1 += encodeURIComponent("+" + parseInt(cataloentity.QuantityActual) - parseInt(cataloentity.ObligationQuantity));

                                $('#obliCatalogQtyEditsummary').removeClass('oblig_cat_sum_dec');
                                $('#obliCatalogQtyEditsummary').addClass('oblig_cat_sum_act');

                            }
                            else {
                                string1 += parseInt(cataloentity.QuantityActual) - parseInt(cataloentity.ObligationQuantity);

                                $('#obliCatalogQtyEditsummary').removeClass('oblig_cat_sum_act');
                                $('#obliCatalogQtyEditsummary').addClass('oblig_cat_sum_dec');
                            }

                            $("#obliCatalogQtyEditsummary").text(string1);

                        }
                        else {
                            $("#txtObligationCatalogQtyNewEdit").val("");
                            $("#obliCatalogQtyEditsummary").text("");


                        }


                        var text = cataloentity.ObligationCurrency;

                        if (text != "") {
                            $("#CurrencyEditExpected").text(text);

                            $("#CurrencyEditActual").text(text);
                        }
                        else if ($('#hdnContractCurrency').text() != "") {

                            $("#CurrencyEditExpected").text($('#hdnContractCurrency').text());

                            $("#CurrencyEditActual").text($('#hdnContractCurrency').text());
                        }
                        else {
                            $("#CurrencyEditExpected").text($('#hdnBaseCurrency').val());

                            $("#CurrencyEditActual").text($('#hdnBaseCurrency').val());
                        }



                        if (cataloentity.ObligationAmountType != "" && cataloentity.ObligationAmountType != null) {
                            $("#ddlObligationProductAmountTypeNewEdit").val(cataloentity.ObligationAmountType);

                        }
                        else {
                            $("#ddlObligationProductAmountTypeNewEdit").val(0);

                        }


                        if (cataloentity.ObligationAmount != "" && cataloentity.ObligationAmount != null && cataloentity.ObligationAmount != "0" && cataloentity.ObligationAmount != 0) {

                            $('#txtObligationProductAmountNewEdit').autoNumeric('set', cataloentity.ObligationAmount);

                        }
                        else {

                            $("#txtObligationProductAmountNewEdit").val("");

                        }


                        if (cataloentity.AmountActual != "" && cataloentity.AmountActual != null && cataloentity.AmountActual != "0" && cataloentity.AmountActual != 0) {

                            $('#txtObligationProductAmountNewActualEdit').autoNumeric('set', cataloentity.AmountActual);
                            var string1 = "";
                            string1 = "Amount Actual vs Expected, ";

                            $('#txtObligationProductAmountNewActualEdit').addClass('validelement');
                            $("#txtObligationProductAmountNewActualEdit").prop('disabled', false);



                            var currency1 = cataloentity.ObligationAmount;
                            var currency2 = cataloentity.AmountActual;


                            string1 = "Amount Actual vs Expected, ";


                            $('#catalogAmountsumaryTitleEdit').text(string1);
                            if (Number(parseFloat(currency2).toFixed(2)) >= Number(parseFloat(currency1).toFixed(2))) {


                                var diff = Number(parseFloat(currency2).toFixed(2)) - Number(parseFloat(currency1).toFixed(2));
                                $('#catalogAmountsumaryValueEdit').autoNumeric('set', diff);
                                $('#catalogAmountsumaryValueEdit').removeClass('oblig_cat_sum_dec')
                                $('#catalogAmountsumaryValueEdit').addClass('oblig_cat_sum_act')

                                $('#catalogAmountsumaryTitleEdit').removeClass('oblig_cat_sum_dec')
                                $('#catalogAmountsumaryTitleEdit').addClass('oblig_cat_sum_act')

                            }
                            else {

                                var diff = Number(parseFloat(currency2).toFixed(2)) - Number(parseFloat(currency1).toFixed(2));

                                $('#catalogAmountsumaryValueEdit').autoNumeric('set', diff);


                                $('#catalogAmountsumaryValueEdit').removeClass('oblig_cat_sum_act')
                                $('#catalogAmountsumaryValueEdit').addClass('oblig_cat_sum_dec')
                                $('#catalogAmountsumaryTitleEdit').removeClass('oblig_cat_sum_act')
                                $('#catalogAmountsumaryTitleEdit').addClass('oblig_cat_sum_dec')
                            }

                        }
                        else {
                            $('#txtObligationProductAmountNewActualEdit').removeClass('validelement');
                            $("#txtObligationProductAmountNewActualEdit").prop('disabled', true);
                            $("#txtObligationProductAmountNewActualEdit").val("");
                            $('#catalogAmountsumaryValueEdit').text('');
                            $('#catalogAmountsumaryTitleEdit').text('');

                        }


                        if (cataloentity.ObligationCatalogStatus == "Complete" || cataloentity.ObligationCatalogStatus == "Cancelled") {

                            if (cataloentity.CompletedDate != null && cataloentity.CompletedDate != "") {
                                var CDate;

                                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                                { CDate = moment(new Date(cataloentity.CompletedDate)).format('MM/DD/YYYY'); }
                                else { CDate = moment(new Date(cataloentity.CompletedDate)).format(localStorage.AppDateFormat); }

                                $("#productcompleteddateEdit").css('display', '');
                                $('#dtObligationProductCompletedDateEdit').addClass('validelement');
                                $('#dtObligationProductCompletedDateEdit').addClass('validdate');
                                $('#dtObligationProductCompletedDateEdit').val(CDate);


                            }
                            else {
                                var CDate = new Date();
                                CDate = formatDate(CDate);

                                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                                { CDate = moment(new Date(CDate)).format('MM/DD/YYYY'); }
                                else { CDate = moment(new Date(CDate)).format(localStorage.AppDateFormat); }
                                $("#productcompleteddateEdit").css('display', '');
                                $('#dtObligationProductCompletedDateEdit').addClass('validelement');
                                $('#dtObligationProductCompletedDateEdit').addClass('validdate');
                                $('#dtObligationProductCompletedDateEdit').val(CDate);
                            }
                        }
                        else {
                            $("#productcompleteddateEdit").css('display', 'none');
                            $('#dtObligationProductCompletedDateEdit').removeClass('validelement');
                            $('#dtObligationProductCompletedDateEdit').removeClass('validdate');
                            $('#dtObligationProductCompletedDateEdit').val("");
                        }

                        $(".validelement").each(function (index, element) {
                            $(element).removeClass("error");
                            $("#errormsg_" + element.id).remove();
                        });



                        $("#loadingPage").fadeOut();


                    },
                    complete: function () {
                        $("#loadingPage").fadeOut();
                    }
                });


                $("#obligationcatalogseditPopup").dialog("option", "title", "");
                $("#obligationcatalogseditPopup").dialog("open");
                break;
            }
    }
}

function contextMenuObligationCatalogStatusSettings(action, el, pos) {

    switch (action) {
        case "Upcoming":
            {
                var obligationID = $(el).find("#ObligationCatalogID").text();

                $("#inprocessObligation").css('visibility', 'visible');
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/obligations/obligationcatalogs/updatecatalogstatus?catalogid=' + obligationID + '&status=' + 'Upcoming',
                    type: 'POST',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': vAPIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                    cache: false,
                    success: function (person) {
                        $('.ui-button-green-text').parent().removeAttr('disabled');
                        getObligationCatalogsNew(vContractID, $("#hdnObligationUniqueId").text(), $("#hdnObligationRowKey").text());
                    },
                    complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                });




                break;
            }
        case "Delayed":
            {
                var obligationID = $(el).find("#ObligationCatalogID").text();



                $("#inprocessObligation").css('visibility', 'visible');
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/obligations/obligationcatalogs/updatecatalogstatus?catalogid=' + obligationID + '&status=' + 'Delayed',
                    type: 'POST',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': vAPIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                    cache: false,
                    success: function (person) {
                        $('.ui-button-green-text').parent().removeAttr('disabled');
                        getObligationCatalogsNew(vContractID, $("#hdnObligationUniqueId").text(), $("#hdnObligationRowKey").text());
                    },
                    complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                });





                break;
            }
        case "Partial":
            {
                var obligationID = $(el).find("#ObligationCatalogID").text();



                $("#inprocessObligation").css('visibility', 'visible');
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/obligations/obligationcatalogs/updatecatalogstatus?catalogid=' + obligationID + '&status=' + 'Partial',
                    type: 'POST',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': vAPIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                    cache: false,
                    success: function (person) {
                        $('.ui-button-green-text').parent().removeAttr('disabled');
                        getObligationCatalogsNew(vContractID, $("#hdnObligationUniqueId").text(), $("#hdnObligationRowKey").text());
                    },
                    complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                });



                break;
            }
        case "Cancelled":
            {
                var obligationID = $(el).find("#ObligationCatalogID").text();



                $("#inprocessObligation").css('visibility', 'visible');
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/obligations/obligationcatalogs/updatecatalogstatus?catalogid=' + obligationID + '&status=' + 'Cancelled',
                    type: 'POST',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': vAPIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                    cache: false,
                    success: function (person) {
                        $('.ui-button-green-text').parent().removeAttr('disabled');
                        getObligationCatalogsNew(vContractID, $("#hdnObligationUniqueId").text(), $("#hdnObligationRowKey").text());
                    },
                    complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                });



                break;
            }
        case "Complete":
            {
                var obligationID = $(el).find("#ObligationCatalogID").text();


                $("#loadingPage").fadeIn();
                var catalogId = $(el).find("#ObligationCatalogID").text();
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/obligations/obligationcatalogs?catalogid=' + obligationID,
                    type: 'GET',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': vAPIKey },
                    "Content-Type": "application/json",
                    cache: false,
                    success: function (cataloentity) {


                        if ($('#hdnProductUpdates').text() == "EDIT") {
                            $('#hdnProductUpdates').text('');
                            $('#hdnProductUpdates').text('EDITCATALOG');
                        }


                        cataloentity.ObligationCatalogStatus = "Complete";

                        $('#obliCatalogQtyEditsummary').text('');

                        $("#txtObligationCatalogQtyNewEdit").prop('disabled', true);
                        $('#txtObligationCatalogQtyNewEdit').removeClass('validelement');
                        $("#txtObligationCatalogQtyNewEdit").val('');

                        $('#txtObligationProductAmountNewActualEdit').removeClass('validelement');
                        $("#txtObligationProductAmountNewActualEdit").val('');
                        $("#txtObligationProductAmountNewActualEdit").prop('disabled', true);

                        $('#txtObligationProductAmountNewActualEdit').removeClass('obli_catalog_enable')
                        $('#txtObligationProductAmountNewActualEdit').addClass('obli_catalog_disable')

                        $('#txtObligationCatalogQtyNewEdit').removeClass('obli_catalog_enable')
                        $('#txtObligationCatalogQtyNewEdit').addClass('obli_catalog_disable')





                        $("#lblObligationCatalogCTitleEdit").text($("#lblContractTitle").text());
                        $("#txtObligationCatalogIDedit").val(cataloentity.RowKey);
                        $("#txtObligationCatalogNameedit").val(cataloentity.ObligationCatalogName);

                        if (cataloentity.ObligationUnits != "" && cataloentity.ObligationUnits != "--Select--" && cataloentity.ObligationUnits != null) {
                            $("#ddlObligationCatalogUnitsEdit").val(cataloentity.ObligationUnits);
                            $("#ddlObligationCatalogUnitsNewEdit").val(cataloentity.ObligationUnits);


                        }
                        else {
                            $("#ddlObligationCatalogUnitsEdit").val("0");
                            $("#ddlObligationCatalogUnitsNewEdit").val("0");


                        }

                        if (cataloentity.ObligationCatalogStatus != "" && cataloentity.ObligationCatalogStatus != null) {

                            if (cataloentity.ObligationCatalogStatus == "Complete") {
                                $("#ddlObligationCatalogStatusEdit").val(cataloentity.ObligationCatalogStatus);
                                $("#txtObligationCatalogQtyNewEdit").val(cataloentity.QuantityActual);

                                if (cataloentity.ObligationQuantity != "" && cataloentity.ObligationQuantity != null) {

                                    $('#txtObligationCatalogQtyNewEdit').removeClass('obli_catalog_disable')
                                    $('#txtObligationCatalogQtyNewEdit').addClass('obli_catalog_enable')
                                }
                                else {
                                    $('#txtObligationCatalogQtyNewEdit').removeClass('obli_catalog_enable')
                                    $('#txtObligationCatalogQtyNewEdit').addClass('obli_catalog_disable')
                                }

                                if (cataloentity.AmountActual != "" && cataloentity.AmountActual != null && cataloentity.AmountActual != "0" && cataloentity.AmountActual != 0) {

                                    $('#txtObligationProductAmountNewActualEdit').removeClass('obli_catalog_disable')
                                    $('#txtObligationProductAmountNewActualEdit').addClass('obli_catalog_enable')


                                }
                                else {
                                    $('#txtObligationProductAmountNewActualEdit').removeClass('obli_catalog_enable')
                                    $('#txtObligationProductAmountNewActualEdit').addClass('obli_catalog_disable')

                                }




                            }
                            else {
                                $("#ddlObligationCatalogStatusEdit").val(cataloentity.ObligationCatalogStatus);
                                $("#txtObligationCatalogQtyNewEdit").val("");


                                $('#txtObligationProductAmountNewActualEdit').removeClass('obli_catalog_enable')
                                $('#txtObligationProductAmountNewActualEdit').addClass('obli_catalog_disable')

                                $('#txtObligationCatalogQtyNewEdit').removeClass('obli_catalog_enable')
                                $('#txtObligationCatalogQtyNewEdit').addClass('obli_catalog_disable')



                            }

                        }
                        else {
                            $("#ddlObligationCatalogStatusEdit").val(0);
                            $('#txtObligationProductAmountNewActualEdit').removeClass('obli_catalog_enable')
                            $('#txtObligationProductAmountNewActualEdit').addClass('obli_catalog_disable')

                            $('#txtObligationCatalogQtyNewEdit').removeClass('obli_catalog_enable')
                            $('#txtObligationCatalogQtyNewEdit').addClass('obli_catalog_disable')

                        }


                        if (cataloentity.Description != "" && cataloentity.Description != null) {
                            $("#txtObligationCatalogDescEdit").val(cataloentity.Description);

                        }
                        else {
                            $("#txtObligationCatalogDescEdit").val("");

                        }


                        if (cataloentity.ObligationQuantity != "" && cataloentity.ObligationQuantity != null) {
                            $("#txtObligationCatalogQtyEdit").val(cataloentity.ObligationQuantity);

                        }
                        else {
                            $("#txtObligationCatalogQtyEdit").val("");

                        }

                        if (cataloentity.ObligationQtyType != "" && cataloentity.ObligationQtyType != null) {
                            $("#ddlObligationCatalogUnitTypeEdit").val(cataloentity.ObligationQtyType);

                        }
                        else {
                            $("#ddlObligationCatalogUnitTypeEdit").val(0);

                        }


                        //Newly Added Columns

                        if (cataloentity.QuantityActual != "" && cataloentity.QuantityActual != null) {
                            $("#txtObligationCatalogQtyNewEdit").val(cataloentity.QuantityActual);





                            $("#txtObligationCatalogQtyNewEdit").prop('disabled', false);
                            $('#txtObligationCatalogQtyNewEdit').addClass('validelement');





                            var string1 = "";
                            string1 = "Quantity Actual vs Expected, ";



                            if (parseInt(cataloentity.QuantityActual) >= parseInt(cataloentity.ObligationQuantity)) {
                                string1 += encodeURIComponent("+" + parseInt(cataloentity.QuantityActual) - parseInt(cataloentity.ObligationQuantity));

                                $('#obliCatalogQtyEditsummary').removeClass('oblig_cat_sum_dec');
                                $('#obliCatalogQtyEditsummary').addClass('oblig_cat_sum_act');

                            }
                            else {
                                string1 += parseInt(cataloentity.QuantityActual) - parseInt(cataloentity.ObligationQuantity);

                                $('#obliCatalogQtyEditsummary').removeClass('oblig_cat_sum_act');
                                $('#obliCatalogQtyEditsummary').addClass('oblig_cat_sum_dec');
                            }

                            $("#obliCatalogQtyEditsummary").text(string1);

                        }
                        else {
                            $("#txtObligationCatalogQtyNewEdit").val("");
                            $("#obliCatalogQtyEditsummary").text("");


                        }

                        var text = cataloentity.ObligationCurrency;

                        if (text != "") {
                            $("#CurrencyEditExpected").text(text);

                            $("#CurrencyEditActual").text(text);
                        }
                        else if ($('#hdnContractCurrency').text() != "") {

                            $("#CurrencyEditExpected").text($('#hdnContractCurrency').text());

                            $("#CurrencyEditActual").text($('#hdnContractCurrency').text());
                        }
                        else {
                            $("#CurrencyEditExpected").text($('#hdnBaseCurrency').val());

                            $("#CurrencyEditActual").text($('#hdnBaseCurrency').val());
                        }



                        if (cataloentity.ObligationAmountType != "" && cataloentity.ObligationAmountType != null) {
                            $("#ddlObligationProductAmountTypeNewEdit").val(cataloentity.ObligationAmountType);

                        }
                        else {
                            $("#ddlObligationProductAmountTypeNewEdit").val(0);

                        }

                        if (cataloentity.ObligationAmount != "" && cataloentity.ObligationAmount != null && cataloentity.ObligationAmount != "0" && cataloentity.ObligationAmount != 0) {

                            $('#txtObligationProductAmountNewEdit').autoNumeric('set', cataloentity.ObligationAmount);

                        }
                        else {
                            $("#txtObligationProductAmountNewEdit").val("");

                        }


                        if (cataloentity.AmountActual != "" && cataloentity.AmountActual != null && cataloentity.AmountActual != "0" && cataloentity.AmountActual != 0) {

                            $('#txtObligationProductAmountNewActualEdit').autoNumeric('set', cataloentity.AmountActual);
                            var string1 = "";
                            string1 = "Amount Actual vs Expected, ";

                            $('#txtObligationProductAmountNewActualEdit').addClass('validelement');
                            $("#txtObligationProductAmountNewActualEdit").prop('disabled', false);



                            var currency1 = cataloentity.ObligationAmount;
                            var currency2 = cataloentity.AmountActual;


                            string1 = "Amount Actual vs Expected, ";


                            $('#catalogAmountsumaryTitleEdit').text(string1);
                            if (Number(parseFloat(currency2).toFixed(2)) >= Number(parseFloat(currency1).toFixed(2))) {


                                var diff = Number(parseFloat(currency2).toFixed(2)) - Number(parseFloat(currency1).toFixed(2));
                                $('#catalogAmountsumaryValueEdit').autoNumeric('set', diff);
                                $('#catalogAmountsumaryValueEdit').removeClass('oblig_cat_sum_dec')
                                $('#catalogAmountsumaryValueEdit').addClass('oblig_cat_sum_act')

                                $('#catalogAmountsumaryTitleEdit').removeClass('oblig_cat_sum_dec')
                                $('#catalogAmountsumaryTitleEdit').addClass('oblig_cat_sum_act')

                            }
                            else {

                                var diff = Number(parseFloat(currency2).toFixed(2)) - Number(parseFloat(currency1).toFixed(2));

                                $('#catalogAmountsumaryValueEdit').autoNumeric('set', diff);


                                $('#catalogAmountsumaryValueEdit').removeClass('oblig_cat_sum_act')
                                $('#catalogAmountsumaryValueEdit').addClass('oblig_cat_sum_dec')
                                $('#catalogAmountsumaryTitleEdit').removeClass('oblig_cat_sum_act')
                                $('#catalogAmountsumaryTitleEdit').addClass('oblig_cat_sum_dec')
                            }

                        }
                        else {
                            $('#txtObligationProductAmountNewActualEdit').removeClass('validelement');
                            $("#txtObligationProductAmountNewActualEdit").prop('disabled', true);
                            $("#txtObligationProductAmountNewActualEdit").val("");
                            $('#catalogAmountsumaryValueEdit').text('');
                            $('#catalogAmountsumaryTitleEdit').text('');

                        }
                        if (cataloentity.ObligationCatalogStatus == "Complete") {
                            if ($('#txtObligationCatalogQtyEdit').val() != "") {
                                $("#txtObligationCatalogQtyNewEdit").prop('disabled', false);
                                $('#txtObligationCatalogQtyNewEdit').addClass('validelement');

                                $('#txtObligationCatalogQtyNewEdit').removeClass('obli_catalog_disable')
                                $('#txtObligationCatalogQtyNewEdit').addClass('obli_catalog_enable')

                            }

                            if ($('#txtObligationProductAmountNewEdit').val() != "") {
                                $("#txtObligationProductAmountNewActualEdit").prop('disabled', false);
                                $('#txtObligationProductAmountNewActualEdit').addClass('validelement');

                                $('#txtObligationProductAmountNewActualEdit').removeClass('obli_catalog_disable')
                                $('#txtObligationProductAmountNewActualEdit').addClass('obli_catalog_enable')

                            }
                        }



                        if (cataloentity.ObligationCatalogStatus == "Complete" || cataloentity.ObligationCatalogStatus == "Cancelled") {

                            if (cataloentity.CompletedDate !== null && cataloentity.CompletedDate !== "" && cataloentity.CompletedDate !== "null") {

                                var CDate = "";
                                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                                { CDate = moment(new Date(cataloentity.CompletedDate)).format('MM/DD/YYYY'); }
                                else { CDate = moment(new Date(cataloentity.CompletedDate)).format(localStorage.AppDateFormat); }


                                $("#productcompleteddateEdit").css('display', '');
                                $('#dtObligationProductCompletedDateEdit').addClass('validelement');
                                $('#dtObligationProductCompletedDateEdit').addClass('validdate');
                                $('#dtObligationProductCompletedDateEdit').val(CDate);


                            }
                            else {
                                var CDate = new Date();
                                CDate = formatDate(CDate);
                                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                                { CDate = moment(new Date(CDate)).format('MM/DD/YYYY'); }
                                else { CDate = moment(new Date(CDate)).format(localStorage.AppDateFormat); }
                                $("#productcompleteddateEdit").css('display', '');
                                $('#dtObligationProductCompletedDateEdit').addClass('validelement');
                                $('#dtObligationProductCompletedDateEdit').addClass('validdate');
                                $('#dtObligationProductCompletedDateEdit').val(CDate);
                            }
                        }
                        else {
                            $("#productcompleteddateEdit").css('display', 'none');
                            $('#dtObligationProductCompletedDateEdit').removeClass('validelement');
                            $('#dtObligationProductCompletedDateEdit').removeClass('validdate');
                            $('#dtObligationProductCompletedDateEdit').val("");
                        }




                        $(".validelement").each(function (index, element) {
                            $(element).removeClass("error");
                            $("#errormsg_" + element.id).remove();
                        });



                        $("#loadingPage").fadeOut();


                    },
                    complete: function () {
                        $("#loadingPage").fadeOut();
                    }
                });

                $("#obligationcatalogseditPopup").dialog("option", "title", "");
                $("#obligationcatalogseditPopup").dialog("open");
                break;
            }
    }
}

function getObligationCatalogsNew(contractid, obligationtext, obligationId) {
    $("#ulObligationCatalogBody").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/obligations/obligationcatalogs?obligationtext=' + obligationtext + '&obligationId=' + obligationId,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': vAPIKey },
        cache: false,
        success: function (data) {
            $("#loadingPage").fadeOut();
            if (data.length > 0) {

                var d = $.grep(data, function (p) { return p.ObligationCatalogStatus != "Complete" && p.ObligationCatalogStatus != "Cancelled"; })
        .map(function (p) { return p });

                if (d != null && d != "" && d.length > 0) {
                    validateproducts = false;
                }
                else {
                    validateproducts = true;
                }
                vCatalogCount = "Yes";
                $('#txtObligationProductsCount').val("Yes");
                document.getElementById('obligationcatalogDetailsTable').style.display = '';
                document.getElementById('NoObligationCatalog').style.display = 'none';
                for (var i = 0; i < data.length; i++) {
                    var str = "";
                    var strCommitment = "";
                    var strCom = "";

                    var url = '<input type="checkbox" id="' + data[i].RowKey + '" name="MultipleObligationCatalogs" onclick="checkMultipleObligationCatalogs(this);" value="' + data[i].RowKey + '">&nbsp;<a  href="javascript:void(0)" onclick="ViewObligationCatalogDetail(\'' + data[i].RowKey + '\')" class="linkText">' + data[i].ObligationCatalogName + '</a>&nbsp;<img src="/Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuRelatedObligationCatalogs"/>';

                    var htmlContent = "<tr>";
                    htmlContent += "<td><p id='ObligationCatalogID' style='display:none;'>" + data[i].RowKey + "</p>";
                    htmlContent += "<span id='ObligationCatalogTitle' style='display:none;'>" + data[i].ObligationCatalogName + "</span>";
                    htmlContent += "<span id='ObligationCatalogObligationText' style='display:none;'>" + data[i].ObligationText + "</span>";
                    htmlContent += "<span id=''ObligationCatalogUnits' style='display:none;'>" + data[i].ObligationUnits + "</span>";
                    htmlContent += "<span id=''ObligationCatalogQty' style='display:none;'>" + data[i].ObligationQuantity + "</span>";

                    htmlContent += "<i class='obligation_Products_Items'>" + url + "</i></td>";

                    if (data[i].ObligationQuantity != "" && data[i].ObligationQuantity != null) {
                        htmlContent += "<td><span style='margin-left: 10px;float:left' id='ObligationQty" + data[i].RowKey + "'>" + data[i].ObligationQuantity + "</span>&nbsp;<lable style=''margin-left: 10px;float:left;'>" + data[i].ObligationUnits + "</lable></td>";

                    }
                    else {
                        htmlContent += '<td style="text-align: center;"> - </td>';

                    }

                    if (data[i].QuantityActual != "" && data[i].QuantityActual != null && data[i].QuantityActual != "null") {
                        htmlContent += "<td ><span style='margin-left: 10px;float:left' id='QuantityActual" + data[i].RowKey + "'>" + data[i].QuantityActual + "</span>&nbsp;<lable style=''margin-left: 10px;float:left;'>" + data[i].ObligationUnits + "</lable></td>";

                    }
                    else {
                        htmlContent += '<td style="text-align: center;"> - </td>';

                    }

                    if (data[i].ObligationAmount != "" && data[i].ObligationAmount != null && data[i].ObligationAmount != "0" && data[i].ObligationAmount != 0) {
                        htmlContent += "<td ><span style='margin-left: 10px;float:left' id='ObligationAmount" + data[i].RowKey + "'>" + data[i].ObligationAmount + "</span>&nbsp;<lable style=''margin-left: 10px;float:left;'>" + data[i].ObligationCurrency + "</lable></td>";

                    }
                    else {
                        htmlContent += '<td style="text-align: center;"> - </td>';

                    }

                    if (data[i].AmountActual != "" && data[i].AmountActual != null && data[i].AmountActual != "0" && data[i].AmountActual != 0) {
                        htmlContent += "<td ><span style='margin-left: 10px;float:left' id='AmountActual" + data[i].RowKey + "'>" + data[i].AmountActual + "</span>&nbsp;<lable style=''margin-left: 10px;float:left;'>" + data[i].ObligationCurrency + "</lable></td>";

                    }
                    else {
                        htmlContent += '<td style="text-align: center;"> - </td>';

                    }
                    if ($("#hdnPermission").val() != 'View' && $("#hdnPermission").val() != "" && $("#hdnPermission").val() != null) {
                        if (contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived") {
                            htmlContent += "<td><a href='javascript:void(0);' class='wit-btn obli_status_chang'>" + data[i].ObligationCatalogStatus + "</a></td>";
                        }
                        else {
                            htmlContent += "<td style='padding:2px;><a href='javascript:void(0);' onclick='checkObligationsstatusupdateNew(this);' class='wit-btn obli_status_chang openmenuObligationCatalogStatusSettings'>" + data[i].ObligationCatalogStatus + "<img class='margin_left_5px' src='/Content/Images/card.png'></a></td>";
                        }
                    }
                    else
                        htmlContent += "<td><a href='javascript:void(0);' class='wit-btn obli_status_chang'>" + data[i].ObligationCatalogStatus + "</a></td>";
                    htmlContent += "</tr>";
                    $("#ulObligationCatalogBody").append(htmlContent);

                }
                $(".openmenuRelatedObligationCatalogs").contextMenu({ menu: 'dropdownMenuRelatedObligationCatalogs', leftButton: true }, function (action, el, pos) {
                    contextMenuObligationCatalogs(action, el.parent("i").parent("td").parent("tr"), pos);
                });



                $(".openmenuObligationCatalogStatusSettings").contextMenu({
                    menu: 'dropdownMenuObligationStatusSettings', leftButton: true
                }, function (action, el, pos) {
                    contextMenuObligationCatalogStatusSettings(action, el.parent("tr"), pos);
                });
            }
            else {

            }
        },
        error: function (data) {
            document.getElementById("cbObligationCatalogProductsSelect").disabled = false;
            vCatalogCount = "No";
            $('#NoObligationCatalog').css('display', '');
            validateproducts = true;

            $('#txtObligationProductsCount').val("No");
            $("#loadingPage").fadeOut();
            vExist = false;
        }
    });

}

function GetFeatures(vasync) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/feature',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        async: vasync,
        headers: { 'eContracts-ApiKey': vAPIKey },
        success: function (data) {
            localStorage.setItem("eContractFeatures", JSON.stringify(data));
        },
        error: function (data) {
            var vvvv = "";
        }
    });
}

Loading_init();

function Loading_init() {
    setTimeout('Loading_View_trigger()', 10000);
}

function ShowWorkflowDetail(acttype, wid) {
    if (contractItem.Status != 'Cancelled' && contractItem.Status != 'Expired') {
        $("#Det_" + wid).slideToggle();
        var imgObj = $("#Img_" + wid);
        if (imgObj.attr("title") == "Collapse") {
            imgObj.attr("title", "Expand");
            imgObj.attr("src", "/Content/Images/e-open.png");
            $("#Det_" + wid).html("");
        } else {
            imgObj.attr("title", "Collapse");
            imgObj.attr("src", "/Content/Images/e-close.png");
            switch (acttype) {
                case "Contract Approval":
                case "Document Review":
                case "Amendment Approval":
                    GetWorkflowComments(wid);
                    break;
                case "Document Share":
                    GetDocumentShareComment(wid);
                    break;
                case "Document Sign":
                    GetDocumentSignatureComment(wid);
                    break;
                case "Contract Share":
                    GetContractShareComment(wid);
                    break;
            }
        }
    }
}

function GetWorkflowComments(wid) {
    $("#Det_" + wid).html('<img src="/Content/Images/icon/loading.gif"> Loading...');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/Workflow/comments?workflowid=' + wid,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': vAPIKey },
        success: function (data) {
            var datalenght = data.length;
            var article = '';
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                if (typeof (item.ModifiedDate) != "undefined" && item.ModifiedDate != null && item.ModifiedDate != "")
                    var vTime = moment(new Date(item.ModifiedDate)).format('MMMM Do YYYY, h:mm A');
                else if (typeof (item.Created) != "undefined" && item.Created != null && item.Created != "")
                    var vTime = moment(new Date(item.Created)).format('MMMM Do YYYY, h:mm A');
                else
                    var vTime = moment(new Date(item.Timestamp)).format('MMMM Do YYYY, h:mm A');
                article += '<div class="activity-details-start row-group">';
                article += '<div class="col8 no-pad">';
                article += item.Title;
                if (item.Description != "")
                    article += '<br/>' + item.Description;
                article += '</div>';
                article += '<div class="col4 no-pad text-right">';
                article += vTime;
                article += '</div>';
                article += '</div>';
            }
            $("#Det_" + wid).html(article);
        },
        error:
            function (data) {

            }
    });
}

function GetDocumentShareComment(wid) {
    $("#Det_" + wid).html('<img src="/Content/Images/icon/loading.gif"> Loading...');
    var fetchingactivity = [];
    $.ajax({
        url: '/Documents/GetDocumentCollaborationComment?accountid=' + vAccountID + '&collaborationid=' + wid,
        type: 'GET',
        dataType: 'json',
        cache: false,
        async: false,
        success: function (data) {
            var jsObject = JSON.parse(data);
            $(jsObject).each(function (i, item) {
                var activitydetails = { Datetimedetails: ((typeof (item.PostDate) != "undefined" && item.PostDate != null && item.PostDate != "") ? item.PostDate : item.TimeStamp), Username: item.PostBy, CommentDetails: item.Comment, ExternalUser: "" };
                fetchingactivity.push(activitydetails);
            });
        },
        error:
            function (data) {
            }
    });
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/activities?objecttype=Documentupload&objectid=' + wid + '&actiontype=New Version Update',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': vAPIKey },
        cache: false,
        async: false,
        success: function (data) {
            $(data).each(function (i, item) {
                var activitydetails = { Datetimedetails: item.Timestamp, Username: item.UserID, CommentDetails: item.Activity, ExternalUser: "(User Activity)" };
                fetchingactivity.push(activitydetails);
            });
        },
        error:
            function (data) {
            }
    });

    if (fetchingactivity.length > 0) {
        fetchingactivity.sort(function (a, b) {
            return new Date(b.Datetimedetails) - new Date(a.Datetimedetails);
        });
        var article = '';
        $(fetchingactivity).each(function (it, itemdetails) {
            var externaluseractivity = ((typeof (itemdetails.ExternalUser) != "undefined" && itemdetails.ExternalUser != null && itemdetails.ExternalUser != "") ? itemdetails.ExternalUser : "")
            var vTime = moment(new Date(itemdetails.Datetimedetails)).format('MMMM Do YYYY, h:mm A');
            article += '<div class="activity-details-start row-group">';
            article += '<div class="col8 no-pad">';
            article += "<b>" + itemdetails.Username + "</b>" + externaluseractivity;
            if (itemdetails.CommentDetails != "") {
                if (itemdetails.CommentDetails.indexOf("Comment:") > -1) {
                    var splitcommment = itemdetails.CommentDetails.split("Comment:");
                    if (splitcommment[0] != "") {
                        article += '<br/>' + splitcommment[0].trim();
                    } else {
                        article += '<br/>' + item.Comment.trim();
                    }
                    if (splitcommment[1] != "") {
                        article += '<br/><b>Comment :</b>' + splitcommment[1].trim();
                    } else {
                        article += '<br/><b>Comment :</b>' + item.Comment.trim();
                    }
                } else {
                    article += '<br/>' + itemdetails.CommentDetails;
                }
            }
            article += '</div>';
            article += '<div class="col4 no-pad text-right">';
            article += vTime;
            article += '</div>';
            article += '</div>';
        });
        $("#Det_" + wid).html(article);
        article = '';
        fetchingactivity = [];
    } else {
        $("#Det_" + wid).html('<div>No item found.</div>');
    }

    $.ajax({
        url: '/Documents/GetDocumentCollaborationLink?accountid=' + vAccountID + '&collaborationid=' + wid + '&UserName=' + localStorage.UserName,
        type: 'GET',
        dataType: 'json',
        cache: false,
        // async: false,
        success: function (data) {
            if (data != "") {
                window.open(data, "_blank")
            }
        },
        error:
            function (data) {
            }
    });
}

function GetDocumentSignatureComment(wid) {
    $("#Det_" + wid).html('<img src="/Content/Images/icon/loading.gif"> Loading...');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/Documents/SignatureDetail?documentid=' + wid,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': vAPIKey },
        cache: false,
        success: function (data) {

            var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
            var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                return (n.RowKey == "1" && n.Status == "ON");
            });
            if (vAccFeat.length > 0) {
                var vConfig = vAccFeat[0].Configuration;
                var vProvider = $(vConfig).find('Provider').text();
                if (vProvider == "Right Signature")
                    RightSignatureComment(data, wid);
                else if (vProvider == "Echo Sign")
                    EcoSignatureComment(data, wid);
                else if (vProvider == "Docu Sign")
                    DocuSignatureComment(data, wid);
            }

        },
        error: function (data) {
            $("#Det_" + wid).empty();
        }
    });
}

function RightSignatureComment(data, wid) {
    var article = '';
    var strails = $(data).find('audit-trails').text();
    $(data).find('audit-trail').each(function () {
        var timestamp = moment(new Date($(this).find('timestamp').text())).format('MMMM Do YYYY, h:mm A');
        var message = $(this).find('message').text();

        article += '<div class="activity-details-start row-group">';
        article += '<div class="col8 no-pad">';
        article += message;
        article += '</div>';
        article += '<div class="col4 no-pad text-right">';
        article += timestamp;
        article += '</div>';
        article += '</div>';
    });

    $("#Det_" + wid).html(article);
}

function EcoSignatureComment(data, wid) {

    var article = '';
    var strails = $(data).find('DocumentHistoryEvent').text();
    $(data).find('DocumentHistoryEvent').each(function () {
        var date = moment(new Date($(this).find('date').text())).format('MMMM Do YYYY, h:mm A');
        var message = $(this).find('description').text();

        article += '<div class="activity-details-start row-group">';
        article += '<div class="col8 no-pad">';
        article += message;
        article += '</div>';
        article += '<div class="col4 no-pad text-right">';
        article += date;
        article += '</div>';
        article += '</div>';
    });

    $("#Det_" + wid).html(article);


}

function DocuSignatureComment(data, wid) {
    var article = '';
    var strails = $(data).find('Event').text();
    $(data).find('Event').each(function () {
        var date = moment(new Date($(this).find('logTime').text())).format('MMMM Do YYYY, h:mm A');
        var message = $(this).find('Message').text();

        article += '<div class="activity-details-start row-group">';
        article += '<div class="col8 no-pad">';
        article += message;
        article += '</div>';
        article += '<div class="col4 no-pad text-right">';
        article += date;
        article += '</div>';
        article += '</div>';
    });

    $("#Det_" + wid).html(article);
}

function GetContractShareComment(wid) {
    $("#Det_" + wid).html('<img src="/Content/Images/icon/loading.gif"> Loading...');
    $.ajax({
        url: '/Contracts/GetContractCollaborationComment?accountid=' + vAccountID + '&collaborationid=' + wid,
        type: 'GET',
        dataType: 'json',
        cache: false,
        // async: false,
        success: function (data) {
            var jsObject = JSON.parse(data);
            var datalenght = jsObject.length;
            var article = '';
            for (var i = 0; i < datalenght; i++) {
                var item = jsObject[i];
                if (typeof (item.PostDate) != "undefined" && item.PostDate != null && item.PostDate != "")
                    var vTime = moment(new Date(item.PostDate)).format('MMMM Do YYYY, h:mm A');
                else
                    var vTime = moment(new Date(item.TimeStamp)).format('MMMM Do YYYY, h:mm A');
                article += '<div class="activity-details-start row-group">';
                article += '<div class="col8 no-pad">';
                article += "<b>" + item.PostBy + "</b>";
                if (item.Comment.indexOf("Comment:") > -1) {
                    var splitcommment = item.Comment.split("Comment:");
                    if (splitcommment[0] != "") {
                        article += '<br/>' + splitcommment[0].trim();
                    } else {
                        article += '<br/>' + item.Comment.trim();
                    }
                    if (splitcommment[1] != "") {
                        article += '\n<br/><b>Comment :</b>' + splitcommment[1].trim();
                    } else {
                        article += '\n<br/><b>Comment :</b>' + item.Comment.trim();
                    }
                } else {
                    article += '<br/>' + item.Comment;
                }
                article += '</div>';
                article += '<div class="col4 no-pad text-right">';
                article += vTime;
                article += '</div>';
                article += '</div>';
            }
            $("#Det_" + wid).html(article);

        },
        error:
            function (data) {
                $("#Det_" + wid).html('<div>No items found.</div>');

            }
    });
    $.ajax({
        url: '/Contracts/GetContractCollaborationLink?accountid=' + vAccountID + '&collaborationid=' + wid + '&UserName=' + localStorage.UserName + '&ContractID=' + vContractID,
        type: 'GET',
        dataType: 'json',
        cache: false,
        // async: false,
        success: function (data) {
            if (data != "") {
                window.open(data, "_blank")
            }

        },
        error:
            function (data) {


            }
    });
}

function contextMenuAmendment(action, el, pos) {
    switch (action) {
        case "view":
            {
                var amendmentID = $(el).find("#AmendmentID").text();
                ViewAmendment(amendmentID);
                break;
            }
    }
}

function ViewAmendment(amendmentID) {
    $("#loadingPage").fadeIn();
    $('#tblAmendmentMetadataDetail').html('<tr><td><img src="/Content/Images/icon/loading.gif"/> Loading...</td></tr>');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/amendments/amendmentdetails?amendmentid=' + amendmentID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': vAPIKey },
        "Content-Type": "application/json",
        cache: false,
        success: function (amendmententity) {

            var vMetadata = '<tr>';
            vMetadata += '<td class="text_label width50">Amendment Title</td>';
            vMetadata += '<td class="text width50">' + amendmententity.AmendmentTitle + '</td>';
            vMetadata += '</tr>';
            vMetadata += '<tr>';
            vMetadata += '<td class="text_label width50">Amendment Type</td>';
            vMetadata += '<td class="text width50">' + amendmententity.AmendmentType + '</td>';
            vMetadata += '</tr>';
            vMetadata += '<tr>';
            vMetadata += '<td class="text_label width50">Reason for Amendment</td>';
            vMetadata += '<td class="text width50">' + amendmententity.AmendmentDescription + '</td>';
            vMetadata += '</tr>';
            vMetadata += '<tr>';
            vMetadata += '<td class="text_label width40">Amendment Finalized?</td>';
            vMetadata += '<td class="text width60">';
            if (amendmententity.AmendmentFinalized != '') {
                vMetadata += amendmententity.AmendmentFinalized;
            }
            vMetadata += '</td>';
            vMetadata += '</tr>';
            vMetadata += '<tr>';
            vMetadata += '<td class="text_label width40">Amendment Finalized Date</td>';
            vMetadata += '<td class="text width60">';
            if (amendmententity.AmendmentFinalizedDate != null && amendmententity.AmendmentFinalizedDate != '') {
                var completedate = "";

                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                { completedate = amendmententity.AmendmentFinalizedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                else {
                    if (localStorage.AppDateFormat == 'DD/MM/YYYY') { completedate = amendmententity.AmendmentFinalizedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1'); }
                    else if (localStorage.AppDateFormat == 'MM/DD/YYYY') { completedate = amendmententity.AmendmentFinalizedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                }
                vMetadata += completedate;
            }
            else {
                vMetadata += '-';
            }
            vMetadata += '</td>';
            vMetadata += '</tr>';
            vMetadata += '<tr>';
            vMetadata += '<td class="text_label width40">Amendment Finalized by</td>';
            vMetadata += '<td class="text width60">';
            if (amendmententity.AmendmentFinalizedBy != '') {
                vMetadata += amendmententity.AmendmentFinalizedBy;
            }
            vMetadata += '</td>';
            vMetadata += '</tr>';



            vMetadata += '<tr>';
            vMetadata += '<td class="text_label width40">Amendment Completed</td>';
            vMetadata += '<td class="text width60">';
            if (amendmententity.AmendmentCompleted != '') {
                vMetadata += amendmententity.AmendmentCompleted;
            }
            vMetadata += '</td>';
            vMetadata += '</tr>';
            vMetadata += '<tr>';
            vMetadata += '<td class="text_label width40">Completed Date</td>';
            vMetadata += '<td class="text width60">';
            if (amendmententity.AmendmentCompletedDate != null && amendmententity.AmendmentCompletedDate != '') {
                var completedate = "";

                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                { completedate = amendmententity.AmendmentCompletedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                else {
                    if (localStorage.AppDateFormat == 'DD/MM/YYYY') { completedate = amendmententity.AmendmentCompletedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1'); }
                    else if (localStorage.AppDateFormat == 'MM/DD/YYYY') { completedate = amendmententity.AmendmentCompletedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                }
                vMetadata += completedate;
            }
            vMetadata += '</td>';
            vMetadata += '</tr>';
            if (amendmententity.EffectiveDate != null) {
                vMetadata += '<tr>';
                vMetadata += '<td class="text_label width50">Start/ Effective Date of Amendment</td>';

                var fEffectiveDate = "";
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                    if (getTimeZone().indexOf('+') > -1)
                        fEffectiveDate = moment(new Date(amendmententity.EffectiveDate)).format('MM/DD/YYYY');
                    else if (getTimeZone().indexOf('+00:00') > -1 || getTimeZone().indexOf('-') > -1)
                        fEffectiveDate = moment(new Date(amendmententity.EffectiveDate)).utc().format('MM/DD/YYYY');
                }
                else {
                    if (getTimeZone().indexOf('+') > -1)
                        fEffectiveDate = moment(new Date(amendmententity.EffectiveDate)).format(localStorage.AppDateFormat);
                    else if (getTimeZone().indexOf('+00:00') > -1 || getTimeZone().indexOf('-') > -1)
                        fEffectiveDate = moment(new Date(amendmententity.EffectiveDate)).utc().format(localStorage.AppDateFormat);
                }
                vMetadata += '<td class="text width50">' + fEffectiveDate + '</td>';
                vMetadata += '</tr>';
            }
            if (amendmententity.IsContractValidityEnabled == "Yes") {
                if (amendmententity.ContractEndDateAfterAmendment != null) {
                    vMetadata += '<tr>';
                    vMetadata += '<td class="text_label width50">Contract End Date(After Amendment)</td>';

                    var fContractEndDateAfterAmendment = "";
                    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                        if (getTimeZone().indexOf('+') > -1)
                            fContractEndDateAfterAmendment = moment(new Date(amendmententity.ContractEndDateAfterAmendment)).format('MM/DD/YYYY');
                        else if (getTimeZone().indexOf('+00:00') > -1 || getTimeZone().indexOf('-') > -1)
                            fContractEndDateAfterAmendment = moment(new Date(amendmententity.ContractEndDateAfterAmendment)).utc().format('MM/DD/YYYY');
                    }
                    else {
                        if (getTimeZone().indexOf('+') > -1)
                            fContractEndDateAfterAmendment = moment(new Date(amendmententity.ContractEndDateAfterAmendment)).format(localStorage.AppDateFormat);
                        else if (getTimeZone().indexOf('+00:00') > -1 || getTimeZone().indexOf('-') > -1)
                            fContractEndDateAfterAmendment = moment(new Date(amendmententity.ContractEndDateAfterAmendment)).utc().format(localStorage.AppDateFormat);
                    }
                    vMetadata += '<td class="text width50">' + fContractEndDateAfterAmendment + '</td>';
                    vMetadata += '</tr>';
                }
                vMetadata += '<tr>';
                vMetadata += '<td class="text_label width50">Update (after approval) Contract Record metadata & Milestones</td>';
                vMetadata += '<td class="text width50">' + amendmententity.UpdateContractEndDate + '</td>';
                vMetadata += '</tr>';
                vMetadata += '<tr>';
                vMetadata += '<td class="text_label width50">Contract Validity Notes</td>';
                vMetadata += '<td class="text width50">' + amendmententity.ContractValidityNotes + '</td>';
                vMetadata += '</tr>';
            }

            if (amendmententity.IsContractValueEnabled == "Yes") {
                vMetadata += '<tr>';
                vMetadata += '<td class="text_label width50">Contract Value(After Amendment)</td>';
                vMetadata += '<td class="text width50">' + amendmententity.ContractValueAfterAmendment + '</td>';
                vMetadata += '</tr>';
                vMetadata += '<tr>';
                vMetadata += '<td class="text_label width50">Update (after approval) Contract Value in Contract Record</td>';
                vMetadata += '<td class="text width50">' + amendmententity.UpdateContractValue + '</td>';
                vMetadata += '</tr>';
                vMetadata += '<tr>';
                vMetadata += '<td class="text_label width50">Funding Source Name</td>';
                vMetadata += '<td class="text width50">' + amendmententity.FunderOrAccountName + '</td>';
                vMetadata += '</tr>';
                vMetadata += '<tr>';
                vMetadata += '<td class="text_label width50">Funding Source Number</td>';
                vMetadata += '<td class="text width50">' + amendmententity.FunderOrAccountNumber + '</td>';
                vMetadata += '</tr>';
                vMetadata += '<tr>';
                vMetadata += '<td class="text_label width50">Contract Value Notes</td>';
                vMetadata += '<td class="text width50">' + amendmententity.ContractValueNotes + '</td>';
                vMetadata += '</tr>';
            }

            if (amendmententity.IsSOWEnabled == "Yes") {
                vMetadata += '<tr>';
                vMetadata += '<td class="text_label width50">Summary of SOW/Obligation/Commitment(After Amendment)</td>';
                vMetadata += '<td class="text width50">' + amendmententity.SummaryOfSOWAfterAmendment + '</td>';
                vMetadata += '</tr>';
            }

            //get amendment documents
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/amendments/documents?amendmentid=' + amendmentID,
                type: 'GET',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': vAPIKey },
                "Content-Type": "application/json",
                cache: false,
                success: function (data) {
                    var htmlDocu = "";
                    if (data.length > 0) {
                        $(data).each(function (i, item) {
                            htmlDocu += "<tr>";
                            htmlDocu += "<td>";
                            htmlDocu += "<a data-url='" + item.DocumentUrl + "' onclick='DownloadAmendmentDocument(this)' style='cursor:pointer; border-bottom: 1px dotted;color: #3F91CC !important;font-size: 12px !important;'>";
                            htmlDocu += item.DocumentName;
                            htmlDocu += "</a>";
                            htmlDocu += "</td>";
                            htmlDocu += "</tr>";
                        });
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Attached Documents</td>';
                        vMetadata += '<td class="text width60"><table  class="width100" cellpadding="2" cellspacing="2">' + htmlDocu + '</table></td>';
                        vMetadata += '</tr>';
                    } else {
                        vMetadata += '<tr><td class="text_label width40">Attached Documents</td><td style="font-size:13px;">No items found.</td></tr>';
                    }
                    $("#loadingPage").fadeOut();
                }, error: function (data) {
                    vMetadata += '<tr><td class="text_label width40">Attached Documents</td><td style="font-size:13px;">No items found.</td></tr>';
                    $("#loadingPage").fadeOut();
                }, complete: function (data) {
                    $("#tblAmendmentMetadataDetail").html(vMetadata);
                    setBlankValueToHyphen("tblAmendmentMetadataDetail");
                    $("#viewAmendmentMetadataDetail").dialog("option", "title", "Amendment Details");
                    $("#viewAmendmentMetadataDetail").dialog("open");
                    $("#loadingPage").fadeOut();
                }
            });

        },
        error: function () {
            $("#loadingPage").fadeOut();
        },
        complete: function () {

        }
    });
}
//eO310504
function DownloadAmendmentDocument(item) {
    var linkurl = $(item).attr('data-url');
    GetDocumentfromSP(linkurl, "Download");
}

//eO311015
function ViewDocs(item){
    var linkurl = $(item).attr('data-value');
    GetDocumentfromSP(linkurl, "View");
}

function setBlankValueToHyphen(tableId) {
    $('#' + tableId + ' tr td').each(function () {
        var cellText = $(this).html();
        if (cellText == '' || cellText == '0') {
            $(this).html('-');
        }
    });
}

function ViewCorrespondenceDetail(entityid) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/correspondence?correspondenceid=' + entityid,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': vAPIKey },
        cache: false,
        success: function (item) {
            if (item.FromSite == "Yes") {
                $("#CorresSubject").html(item.Subject);
                $("#CorresComment").html(item.Comment);
                $("#SavedBy").html(item.CreatedBy);
                $("#SavedOn").html(moment(new Date(item.Timestamp)).format('Do MMM'));
                $("#CorrespondenceFile").html('<a class="linkText Manage" href="' + item.BodyUrl + '">' + item.BodyUrl + '</a>');
                $("#trEmailText3").css('display', '');
                $("#trEmailText1").css('display', 'none');
                $("#trEmailText2").css('display', 'none');


                $("#dvCorrespondenceDetails").dialog("option", "title", "Correspondence Details");
                $("#dvCorrespondenceDetails").dialog("open");
            }
            else {
                $("#trEmailText3").css('display', 'none');
                $("#trEmailText1").css('display', '');
                $("#trEmailText2").css('display', '');

                if (item.BodyUrl != null && item.BodyUrl != "") {
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/textfromblobfile?fileurl=' + encodeURIComponent(item.BodyUrl),
                        type: 'GET',
                        dataType: 'json',
                        headers: { 'eContracts-ApiKey': vAPIKey },
                        cache: false,
                        success: function (blobdata) {
                            var div = document.createElement('div');
                            div.innerHTML = blobdata;
                            $("#CorresSubject").html(item.Subject);
                            $("#CorresComment").html(item.Comment);
                            $("#SavedBy").html(item.CreatedBy);
                            $("#SavedOn").html(moment(new Date(item.Timestamp)).format('Do MMM'));
                            var attc = GetTheAttachments(item.BodyUrl, item.Attachments, item.RowKey);
                            if (attc != "")
                                $("#Attachments").html(attc);
                            else
                                $("#Attachments").html("No attachments found.");

                            $('body', $("#CorresBody2")[0].contentWindow.document).html(div.textContent);
                            $("#dvCorrespondenceDetails").dialog("option", "title", "Correspondence Details");
                            $("#dvCorrespondenceDetails").dialog("open");
                        },
                        error: function (blobdata) {

                        }
                    });
                }
                else {
                    $("#CorresSubject").html(item.Subject);
                    $("#CorresComment").html(item.Comment);
                    $("#SavedBy").html(item.CreatedBy);
                    $("#SavedOn").html(moment(new Date(item.Timestamp)).format('Do MMM'));

                    $('body', $("#CorresBody2")[0].contentWindow.document).html(item.Body)
                    $("#dvCorrespondenceDetails").dialog("option", "title", "Correspondence Details");
                    $("#dvCorrespondenceDetails").dialog("open");
                }
            }

        },
        error: function (request) {

        }

    });
}

function contextMenuWorkFolder(action, el, pos) {

    switch (action) {
        case "open":
            {
                var documentName = $(el).find("#DocumentName").text();
                var documentID = $(el).find("#DocumentID").text();
                var LinkURL = $("#" + documentID)[0];
                showfolderdocuments(LinkURL);
                break;
            }
    }
}

function GetTheAttachments(URI, lsFilenames, CorrespondanceRowKey) {
    var articleattc = '';
    if (lsFilenames != "") {
        var settings = {
            pattern: /\.[0-9a-z]+$/i,
            knownFileTypes: ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'zip', 'rar', 'gzip', 'arj', 'wav', 'mp3', 'aif', 'aiff', 'm4a', 'ogg', 'wma', 'psd', 'ai', 'swf', 'fla', 'css', 'js', 'avi', 'mov', 'wmv', 'dotx'],
            WopiFrameFileTypes: ['doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx', 'dotx']
        };
        var URIStart = URI.substring(0, URI.lastIndexOf("_"));
        var URIRequire = URIStart + "_" + CorrespondanceRowKey + "_";
        var FilenamesSplit = [];
        if (lsFilenames.split('|').length == 1)
            FilenamesSplit.push(lsFilenames.split('|'));
        else
            FilenamesSplit = lsFilenames.split('|');
        $(FilenamesSplit).each(function (i, item) {
            var vRawURLDoc = '';
            var filen = "";
            if (item instanceof Array)
                filen = item[0];
            else
                filen = item;
            var DocumentUrl = URIRequire + filen;
            vURLDoc = encodeURIComponent(DocumentUrl);
            var ext = vURLDoc.match(settings.pattern);
            var vFileType = '<dd class="file-icon none"></dd>';
            if (ext != null) {
                if (ext.length > 0) { ext = ext[0].slice(1); }
                if (jQuery.inArray(ext.toLowerCase(), settings.knownFileTypes) > -1) {
                    vFileType = '<dd class="file-icon ' + ext + '"></dd>';
                }
            }
            var filenameOriginal = "";
            filenameOriginal = filen;
            articleattc += vFileType + '<a data-value="' + vURLDoc + '" href="javascript:void(0);" onclick="ViewCorrespondenceDocument(this)">' + filenameOriginal + '</a><br/>';

        });

    }
    return articleattc;

}


function ViewCorrespondenceDocument(docurl) {
    if (docurl != '') {
        if (typeof docurl === "string") {
            docurl = decodeURIComponent(docurl);
        }
        else {
            docurl = decodeURIComponent($(docurl).attr('data-value'));
        }
        var srcurl = docurl;
        var IsView = true;
        if (srcurl.indexOf("%") >= 0) {
            var fileName = srcurl.split('/').pop();
            fileName = encodeURIComponent(fileName);
            srcurl = srcurl.substring(0, srcurl.lastIndexOf('/')) + "/" + fileName;
            docurl = srcurl;
            IsView = false;
        }
        if ((docurl.indexOf(".doc") >= 0 || docurl.indexOf(".ppt") >= 0 || docurl.indexOf(".xls") >= 0 || docurl.indexOf(".dotx") >= 0) && IsView) {
            srcurl = "https://view.officeapps.live.com/op/embed.aspx?src=" + docurl + "?" + randomString() + "=" + randomString() + "&wdStartOn=1";
        }
        if (docurl.indexOf(".pdf") >= 0 && IsView) {
            window.open("http://docs.google.com/gview?url=" + srcurl + "?" + randomString() + "=" + randomString(), '_blank');
        } else {
            window.open(srcurl);
        }
    }
}

function ShowMoreMilestones() {
    $('.ShowMoreMilestones').css("display", "");
    $('#ShowMoreMilestones').css("display", "none");
    $('#ShowLessMilestones').css("display", "");
}

function ShowLessMilestones() {
    $('.ShowMoreMilestones').css("display", "none");
    $('#ShowMoreMilestones').css("display", "");
    $('#ShowLessMilestones').css("display", "none");
}
//ContextMenu for asc/desc order contract folder(s)/document(s)
function contextMenuDocumentSort(action, el, pos) {
    switch (action) {
        case 'ascorder': {
            if (typeof (el.prevObject[0].id) != "undefined" && el.prevObject[0].id != null && el.prevObject[0].id != "") {
                if (el.prevObject[0].id == "pindocumentsort") {
                    orderinglist('ulPinDocument', 'lblPinDocumentsCount', 'asc');
                } else {
                    orderinglist('ulDocument', 'lblDocumentsCount', 'asc')
                }
            }
            break;
        }
        case 'descorder': {
            if (typeof (el.prevObject[0].id) != "undefined" && el.prevObject[0].id != null && el.prevObject[0].id != "") {
                if (el.prevObject[0].id == "pindocumentsort") {
                    orderinglist('ulPinDocument', 'lblPinDocumentsCount', 'desc');
                } else {
                    orderinglist('ulDocument', 'lblDocumentsCount', 'desc')
                }
            }
            break;
        }
    }
}

function orderinglist(objvalue, objcountvalue, actionvalue) {
    var DefaultDocumentList = $("#hdnnewdocumentfeature").text() == "Yes" && objvalue == "ulDocument" ? 20 : 10;
    var ul = document.getElementById(objvalue)
    var arr = $.makeArray(ul.children);
    if ((documentview == null || documentview == "" || documentview == "folder") && objvalue == "ulDocument") {
        var arr1 = [];
        var arr2 = [];
        if (actionvalue == "asc") {
            $.each(arr, function () {
                if ($(this).find('b').text() == "Folder") {
                    arr1.push(this);
                } else {
                    arr2.push(this);
                }
            })
            arr1.sort(function (a, b) {
                if (($(a).find('a').text().toLowerCase()) < ($(b).find('a').text().toLowerCase())) return -1;
                if (($(a).find('a').text().toLowerCase()) > ($(b).find('a').text().toLowerCase())) return 1;
                return 0;
            });
            arr2.sort(function (a, b) {
                if (($(a).find('a').text().toLowerCase()) < ($(b).find('a').text().toLowerCase())) return -1;
                if (($(a).find('a').text().toLowerCase()) > ($(b).find('a').text().toLowerCase())) return 1;
                return 0;
            });
            arr = arr1;
            $.each(arr2, function () {
                arr.push(this);
            });
        } else {
            $.each(arr, function () {
                if ($(this).find('b').text() == "Folder") {
                    arr1.push(this);
                } else {
                    arr2.push(this);
                }
            })
            arr1.sort(function (a, b) {
                if (($(a).find('a').text().toLowerCase()) < ($(b).find('a').text().toLowerCase())) return 1;
                if (($(a).find('a').text().toLowerCase()) > ($(b).find('a').text().toLowerCase())) return -1;
                return 0;
            });
            arr2.sort(function (a, b) {
                if (($(a).find('a').text().toLowerCase()) < ($(b).find('a').text().toLowerCase())) return 1;
                if (($(a).find('a').text().toLowerCase()) > ($(b).find('a').text().toLowerCase())) return -1;
                return 0;
            });
            arr = arr1;
            $.each(arr2, function () {
                arr.push(this);
            });
        }
    } else {
        if (actionvalue == "asc") {
            arr.sort(function (a, b) {
                if (($(a).find('a').text().toLowerCase()) < ($(b).find('a').text().toLowerCase())) return -1;
                if (($(a).find('a').text().toLowerCase()) > ($(b).find('a').text().toLowerCase())) return 1;
                return 0;
            });
        } else {
            arr.sort(function (a, b) {
                if (($(a).find('a').text().toLowerCase()) < ($(b).find('a').text().toLowerCase())) return 1;
                if (($(a).find('a').text().toLowerCase()) > ($(b).find('a').text().toLowerCase())) return -1;
                return 0;
            });
        }
    }

    $("#" + objvalue).empty();
    var appendcount = 1;
    var addclassvalue = (objvalue == "ulDocument") ? "ShowMoreDocuments" : "ShowMorePinDocuments";
    var oppclassvalue = (addclassvalue == 'ShowMoreDocuments') ? 'ShowLessDocuments' : 'ShowLessPinDocuments';
    $.each(arr, function () {
        $(this).removeClass("ShowMoreDocuments");
        $(this).removeClass("ShowLessDocuments");
        $(this).removeClass("ShowMorePinDocuments");
        $(this).removeClass("ShowLessPinDocuments");
        $(this).css("display", "")
        if (appendcount >= DefaultDocumentList + 1) {
            $(this).addClass(addclassvalue);
            $(this).css("display", "none")
        }
        $("#" + objvalue).append(this);
        appendcount++;
    });
    if (arr.length > DefaultDocumentList) {
        var objvaluetobind = addclassvalue == "ShowMoreDocuments" ? "dvDocument" : "dvPinDocument";
        $("#" + objvaluetobind).html('<a id="' + addclassvalue + '" href="javascript:void(0);" class="pad-all close1" onclick="' + addclassvalue + '()">More Document(s) </a>' +
                                '<a id="' + oppclassvalue + '" href="javascript:void(0);" class="pad-all close1" onclick="' + oppclassvalue + '()" style="display:none;">Show less</a>');
    } else {
        $('.' + addclassvalue).css("display", "none");
        $('#' + addclassvalue).css("display", "none");
        $('#' + oppclassvalue).css("display", "none");
    }

    $("#" + objcountvalue).text(arr.length);
    if (!$("#" + objcountvalue).text().trim()) {
        $("#" + objvalue).empty();
        $("#" + objvalue).append('No items found.');
    }
    if (DocVersion == "No") {
        $('li.history').hide();
    }
    var vFinalSignature = "dropdownMenuFinal";
    var vMarkFinalSignature = "dropdownMenuMarkFinal";
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "1" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        vFinalSignature = "dropdownMenuFinalSignature";
        vMarkFinalSignature = "dropdownMenuMarkFinalSignature";
        $("#dropdownMenuAmendment .signature").show();
        $("#dropdownMenuAmendmentFinal .signature").show();
    }
    else {
        $("#dropdownMenuAmendment .signature").hide();
        $("#dropdownMenuAmendmentFinal .signature").hide();
    }
    $(".openmenuDocument").contextMenu({
        menu: vFinalSignature, leftButton: true
    }, function (action, el, pos) {
        contextMenuDocument(action, el.parent("li"), pos);
    });
    $(".openmenuDocumentFinal").contextMenu({
        menu: vMarkFinalSignature, leftButton: true
    }, function (action, el, pos) {
        contextMenuDocument(action, el.parent("li"), pos);
    });
    $(".openmenuAmendmentDocument").contextMenu({
        menu: "dropdownMenuAmendment", leftButton: true
    }, function (action, el, pos) {
        contextMenuAmendmentDocument(action, el.parent("li"), pos);
    });
    $(".openmenuAmendmentDocumentFinal").contextMenu({
        menu: "dropdownMenuAmendmentFinal", leftButton: true
    }, function (action, el, pos) {
        contextMenuAmendmentDocument(action, el.parent("li"), pos);
    });
    //Un Pin Document
    $(".openmenuDocumentUnPin").contextMenu({
        menu: vFinalSignature + "UnPin", leftButton: true
    }, function (action, el, pos) {
        contextMenuDocument(action, el.parent("li"), pos);
    });
    $(".openmenuDocumentFinalUnPin").contextMenu({
        menu: vMarkFinalSignature + "UnPin", leftButton: true
    }, function (action, el, pos) {
        contextMenuDocument(action, el.parent("li"), pos);
    });
    $(".openmenuAmendmentDocumentUnPin").contextMenu({
        menu: "dropdownMenuAmendmentUnPin", leftButton: true
    }, function (action, el, pos) {
        contextMenuAmendmentDocument(action, el.parent("li"), pos);
    });
    $(".openmenuAmendmentDocumentFinalUnPin").contextMenu({
        menu: "dropdownMenuAmendmentFinalUnPin", leftButton: true
    }, function (action, el, pos) {
        contextMenuAmendmentDocument(action, el.parent("li"), pos);
    });
    $(".openmenuFolder").contextMenu({
        menu: 'myMenuFolder', leftButton: true
    }, function (action, el, pos) {
        contextMenuWorkFolder(action, el.parent("li"), pos);
    });
    //manoj
    $(".hideItem").click(function () {
        if ((contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute') && (!(contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived"))) {
            $(".unpindocument").hide();
            $(".pindocument").hide();
            $(".primary").show();
        }
    })
    $(".showitem").click(function () {
        if ((contractItem.Permission == 'Manage' || contractItem.Permission == 'Contribute') && (!(contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived"))) {
            $(".unpindocument").show();
            $(".pindocument").show();
            $(".primary").show();
        }
    })
    $(".primarydocument").click(function () {
        $(".primary").hide();
    })
    //manoj
    $("#contractLogs").empty();
}

function ShowDocSignatureDetail(wid) {
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/Documents/SignatureDetail?documentid=' + wid,
        type: 'GET',
        dataType: 'json',
        headers: {
            'eContracts-ApiKey': vAPIKey
        },
        cache: false,
        success: function (data) {
            var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
            var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                return (n.RowKey == "1" && n.Status == "ON");
            });
            if (vAccFeat.length > 0) {
                var vConfig = vAccFeat[0].Configuration;
                var vProvider = $(vConfig).find('Provider').text();
                if (vProvider == "Right Signature")
                    RightSignatureDocumentHistory(data);
                else if (vProvider == "Echo Sign")
                    EcoSignatureDocumentHistory(data);
                else if (vProvider == "Docu Sign")
                    DocuSignatureDocumentHistory(data);
            }
            $("#loadingPage").fadeOut();

            $("#docSignatureDetail").dialog("open");
            $("#docSignatureDetail").height("auto");
        },
        error: function (data) {
            $("#dvDocSignatureHist").empty();
            $("#loadingPage").fadeOut();
        }

    });

}

function DocuSignatureDocumentHistory(data) {
    $("#createdid").css("display", "");
    $("#lastactivityid").css("display", "none");
    $("#expiresid").css("display", "none");
    $("#completedid").css("display", "");

    var created = $(data).find('Created:first').text();
    var completed = $(data).find('Completed:first').text();

    var subject = $(data).find('Subject').text();
    var message = $(data).find('EmailBlurb').text();
    var ExpiresDays = ($(data).find('ExpiresIn') != null && typeof $(data).find('ExpiresIn') != "undefined") ? $(data).find('ExpiresIn').text() : "";
    var enxpDate = '';
    if (ExpiresDays != "") {
        enxpDate = moment(new Date(created)).add(ExpiresDays, 'days');
    }
    var state = $(data).find('Status:first').text();
    $("#tdDocSignsubject").html(subject);
    $("#tdDocSignmessage").html(message);
    $("#tdDocSignstate").html(state);
    $("#tdDocSigncreated").html(moment(new Date(created)).utc().format('MMMM Do YYYY, h:mm A'));

    if (completed != null && completed != "" && $.inArray(state, DocSignCompState) > -1) {
        $("#tdDocSigncompleted").html(moment(new Date(completed)).utc().format('MMMM Do YYYY, h:mm A'));

    }
    else
        $("#tdDocSigncompleted").html('-');
    if (enxpDate != null && enxpDate != "") {
        $("#expiresid").css("display", "");
        $("#tdDocSignexpires").html(moment(new Date(enxpDate)).utc().format('MMMM Do YYYY, h:mm A'));
    }

    var article = '';
    $(data).find('Event').each(function () {
        var date = moment(new Date($(this).find('logTime').text())).format('MMMM Do YYYY, h:mm A');
        var message = $(this).find('Message').text();
        article += '<li>';
        article += '<p>';
        article += '<b>' + message + '</b> ';
        article += '<small>' + date + '</small>';
        article += '</p></li>';
    });
    $("#dvDocSignatureHist").html(article);

    article = '';
    $(data).find('Recipients').each(function () {
        var email = '';
        var name = '';
        $(this).find('Email').each(function (i, item) {
            if (email == '')
                email = $(item).text();
            else
                email += "; " + $(item).text();
        });
        $(this).find('UserName').each(function (i, item) {
            if (name == '')
                name = $(item).text();
            else
                name += "; " + $(item).text();
        });
        article += '<li>';
        article += '<p style="margin-bottom: 5px;">';
        article += '<b>' + email + '</b> ';
        article += '<small>(' + name + ')</small>';
        article += '</p></li>';
    });
    $("#dvDocSignatureUser").html(article);
    article = '';
}

function EcoSignatureDocumentHistory(data) {
    $("#createdid").css("display", "none");
    $("#lastactivityid").css("display", "none");
    $("#expiresid").css("display", "none");
    $("#completedid").css("display", "none");

    var subject = "Document sent for signature";
    var message = $(data).find('message').text();
    var state = $(data).find('status').last().text();
    $("#tdDocSignsubject").html(subject);
    $("#tdDocSignmessage").html(message);
    $("#tdDocSignstate").html(state);

    var article = '';
    $(data).find('DocumentHistoryEvent').each(function () {
        var date = moment(new Date($(this).find('date').text())).format('MMMM Do YYYY, h:mm A');
        var message = $(this).find('description').text();
        article += '<li>';
        article += '<p>';
        article += '<b>' + message + '</b> ';
        article += '<small>' + date + '</small>';
        article += '</p></li>';
    });
    $("#dvDocSignatureHist").html(article);

    article = '';
    $(data).find('participants').each(function () {
        $(this).find('ParticipantInfo').each(function () {
            var email = $(this).find('email').text();
            var name = $(this).find('name').text();
            if ($(this).find('ParticipantRole').text() == "SIGNER") {
                article += '<li>';
                article += '<p style="margin-bottom: 5px;">';
                article += '<b>' + email + '</b> ';
                article += '<small>(' + name + ')</small>';
                article += '</p></li>';
            }
        })
    });
    $("#dvDocSignatureUser").html(article);
}

function RightSignatureDocumentHistory(data) {
    var created = $(data).find('created-at').text();
    var completed = $(data).find('completed-at:first').text();
    var lastactivity = $(data).find('last-activity-at').text();
    var expires = $(data).find('expires-on').text();
    var subject = $(data).find('subject').text();
    var message = $(data).find('message').text();
    var state = $(data).find('state:first').text();
    $("#tdDocSigncreated").html(moment(new Date(created)).format('MMMM Do YYYY, h:mm A'));

    if (completed != null && completed != "" && $.inArray(state, DocSignCompState) > -1)
        $("#tdDocSigncompleted").html(moment(new Date(completed)).format('MMMM Do YYYY, h:mm A'));
    else
        $("#tdDocSigncompleted").html('-');

    $("#tdDocSignlastactivity").html(moment(new Date(lastactivity)).format('MMMM Do YYYY, h:mm A'));
    $("#tdDocSignexpires").html(moment(new Date(expires)).format('MMMM Do YYYY, h:mm A'));
    $("#tdDocSignsubject").html(subject);
    $("#tdDocSignmessage").html(message);
    $("#tdDocSignstate").html(state);


    var article = '';
    $(data).find('audit-trail').each(function () {
        var timestamp = moment(new Date($(this).find('timestamp').text())).format('MMMM Do YYYY, h:mm A');
        var message = $(this).find('message').text();
        article += '<li>';
        article += '<p>';
        article += '<b>' + message + '</b> ';
        article += '<small>' + timestamp + '</small>';
        article += '</p></li>';
    });
    $("#dvDocSignatureHist").html(article);

    article = '';
    $(data).find('recipient').each(function () {
        var issender = $(this).find('is-sender').text();
        if (issender != 'true') {
            var username = $(this).find('name').text();
            var mustsign = $(this).find('must-sign').text();
            var email = $(this).find('email').text();
            var state = $(this).find('state').text();
            article += '<li>';
            article += '<p style="margin-bottom: 5px;">';
            article += '<b>' + username + ' - ' + email + '</b> ';
            article += '<small>(' + state + ')</small>';
            article += '</p></li>';
        }
    });
    $("#dvDocSignatureUser").html(article);
    article = '';
    $("#createdid").css("display", "");
    $("#lastactivityid").css("display", "");
    $("#expiresid").css("display", "");
    $("#completedid").css("display", "");
}

function ViewObligationDetail(obligationID) {
    $("#loadingPage").fadeIn();
    //$('#dvMilObgMetadata').html('<tr><td><img src="../Content/Images/icon/loading.gif"/></td></tr>');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/obligations?obligationid=' + obligationID,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': vAPIKey },
        cache: false,
        success: function (obligationentity) {
            var vOblDueDate = "";

            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
            { vOblDueDate = moment(new Date(obligationentity.DueDate)).utc().format('MM/DD/YYYY'); }
            else { vOblDueDate = moment(new Date(obligationentity.DueDate)).utc().format(localStorage.AppDateFormat); }

            var vMetadata = '<ul id="obligationTitle" class="pOp_Cont Obligation">';
            vMetadata += '<li><p>Obligation Title</p><span class="PreserveSpace">' + obligationentity.ObligationTitle + '</span></li>';
            vMetadata += '<li><p>Obligation Type</p><span>' + obligationentity.ObligationType + '</span></li>';
            vMetadata += '<li><p>Description</p><span style="word-break: break-all;">';
            if (obligationentity.Description != '') {
                vMetadata += obligationentity.Description;
            }
            else { vMetadata += "-"; }
            vMetadata += '</span></li>';
            vMetadata += '<li id="obligationOwners"><p>Obligation Owner</p><span>';
            if (obligationentity.ObligationOwner != '') {
                vMetadata += obligationentity.ObligationOwner;
            }
            else { vMetadata += "-"; }
            vMetadata += '</span></li>';
            vMetadata += '<li><p>Due Date</p><span>';
            if (vOblDueDate != '') {
                vMetadata += vOblDueDate;
            }
            else { vMetadata += "-"; }
            vMetadata += '</span></li>';
            vMetadata += '<li><p>Obligation Met</p><span>';
            if (obligationentity.ObligationMet != '') {
                vMetadata += obligationentity.ObligationMet;
            }
            else { vMetadata += "-"; }
            vMetadata += '</span></li>';

            vMetadata += '<li><p>Obligation Met By</p><span>';
            if (obligationentity.ObligationMetBy != '') {
                vMetadata += obligationentity.ObligationMetBy;
            }
            else { vMetadata += "-"; }
            vMetadata += '</span></li>';

            //ContractID 
            vMetadata += '<li id="contractID" style="display:none;"><p>ContractID</p><span>' + obligationentity.ContractID + '</span></li>';

            //Obligation ID
            vMetadata += '<li id="obligationID" style="display:none;"><p>ObligationID</p><span>' + obligationentity.RowKey + '</span></li>';
            vMetadata += '<li id="ObligationTEXT" style="display:none;"><p>ObligationTEXT</p><span>' + obligationentity.ObligationText + '</span></li>';
            vMetadata += '</ul>';
            var permissionsAll = contractItem.ContractManagers + ";" + contractItem.Approvers + ";" + contractItem.Reviewers + ";" + contractItem.Signees
                + ";" + contractItem.BusinessAreaOwners + ";" + contractItem.ReadWritePermissions + ";" + contractItem.FullControlPermissions + ";" + contractItem.ProjectManager;
            var permissions = $.unique($(permissionsAll.split(';')).map(function (i, item) { return item.trim() }).filter(function (i, item) { return item != ""; }));
            var ogOwners = [];
            if (obligationentity.ObligationOwner != "") {
                if (obligationentity.ObligationOwner.indexOf('{') > -1) {
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/milestones/ownersfromgroup?contractid=' + obligationentity.ContractID + '&milestoneonwers=' + obligationentity.ObligationOwner,
                        type: 'GET',
                        dataType: 'json',
                        headers: { 'eContracts-ApiKey': vAPIKey },
                        cache: false,
                        async: false,
                        success: function (owners) {
                            if (owners != null || owners != "") {
                                for (var key in owners) {
                                    if (owners.hasOwnProperty(key)) {
                                        ogOwners.push(key);
                                    }
                                }
                            }
                        },
                        error: function (owners) { }
                    });
                }
                else
                    ogOwners = $.map(obligationentity.ObligationOwner.split(';'), $.trim);
            }

            $("#loadingPage").fadeOut();
            var statusArr = ["Replaced", "Expired", "Cancelled", "Archived"];
            if (ogOwners != "" && ogOwners != null && ogOwners.indexOf(localStorage.UserName) > -1 && obligationentity.ObligationMet != "Yes" && obligationentity.AutoComplete != "Yes" &&
                obligationentity.ObligationStatus != "Cancelled" && jQuery.inArray(contractItem.Status, statusArr) == -1 && permissions.toArray().indexOf(localStorage.UserName) > -1) {
                $("#tblMetadataDetailForOwner").empty();
                $("#tblMetadataDetailForOwner").append(vMetadata);
                $("#btnMarkComplete span").attr('style', 'background-color: transparent; color: #3177b5;font-size: 14px;border: 1px solid #3177b5 !important;');
                $("#viewMetadataDetailForOwner").dialog("option", "title", "View Obligation");
                $("#viewMetadataDetailForOwner").dialog("open");
            }
            else {
                $("#tblMilObgMetadataDetail").empty();
                $("#tblMilObgMetadataDetail").append(vMetadata);
                $("#dvMilObgMetadata").dialog("option", "title", "View Obligation");
                $("#dvMilObgMetadata").dialog("open");
            }
        },
        error: function (status) {
            $("#loadingPage").fadeOut();
        }
    });
}

$("#ddlTemplateAndClauses").change(function (obj) {
    $("#ulTermsClauseBody").html('<img src="../Content/Images/icon/loading.gif">');
    var selectedtext = $("#ddlTemplateAndClauses option:selected").val();
    if (selectedtext != "0") {
        var docversionnum = '';
        var docversionby = '';
        var docversiondate = '';
        var docversioncollection = false;
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/documents/' + selectedtext + '/versions',
            type: 'GET',
            dataType: 'json',
            "Content-Type": "application/json",
            headers: { 'eContracts-ApiKey': vAPIKey },
            cache: false,
            async: false,
            success: function (data) {
                var datalength = data.length;
                docversioncollection = true;
                docversionnum = data[datalength - 1].VersionNo;
                docversionby = data[datalength - 1].ModifiedBy;
                docversiondate = data[datalength - 1].Modified;
            },
            error: function () {
                docversioncollection = true;
                docversionnum = "0.0";
                docversionby = "None";
                docversiondate = "None";
            }
        });
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/clause/clausesindocument?documentid=' + selectedtext,
            type: 'GET',
            dataType: 'json',
            cache: false,
            async: false,
            headers: { 'eContracts-ApiKey': vAPIKey },
            success: function (Languagecollection) {
                if (Languagecollection != null) {

                    arrfinalclauselanguage = [];
                    arrPrvwClause = [];
                    arrforeditandcancel = [];
                    $("#ulTermsClauseBody").empty();
                    //$("#lblTermsClauseCount").empty();
                    languagerowkeycollection = [];
                    languagetitlecollection = [];
                    var articlelanguage = '';
                    var docurlkeyword = '';
                    for (var arrdsp = 0; arrdsp < Languagecollection.length; arrdsp++) {
                        var viewleveldata = '';
                        if (Languagecollection[arrdsp].RowKey != "" && Languagecollection[arrdsp].RowKey != null) {
                            languagerowkeycollection.push(Languagecollection[arrdsp].RowKey);
                            viewleveldata = Languagecollection[arrdsp].RowKey;
                        }
                        else {
                            languagetitlecollection.push(Languagecollection[arrdsp].LanguageTitle);
                            viewleveldata = Languagecollection[arrdsp].LanguageTitle;
                        }
                        arrfinalclauselanguage.push(Languagecollection[arrdsp].RowKey);
                        arrPrvwClause.push(Languagecollection[arrdsp]);
                        articlelanguage += '<div class="tagged-inner-cont clearfix"><div class="tagged-inner-left"></div>'//<input id=sel' + Languagecollection[arrdsp].RowKey + ' onclick="selectlanguge(this);" type="checkbox" name="SelectedClauseLanguagedetails" value=' + Languagecollection[arrdsp].LanguageTitle + '>
                        articlelanguage += '<div class="tagged-inner-right"><p class="action-heading">' + Languagecollection[arrdsp].LanguageTitle + '<a href="javascript:void(0)"></a>' //<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="margin-left-5"></a>'
                        var isremoved = "false"
                        switch (Languagecollection[arrdsp].Status) {
                            case 'User Added': {
                                articlelanguage += '<a class="bars-green" href="javascript:void(0)"><img src="/Content/Images/red-icon.jpg" title="Not available in Library,User Added"></a><span style="float:right;"><a href="javascript:void(0)" title="Comments" onclick="ViewClausecomments(\'' + viewleveldata + '\')" ><img src="/Content/Images/comment.png"></a>(<span id=counetcomment' + viewleveldata + '></span>)</span></p>';
                            }
                                break;
                            case 'Language Edited': {
                                articlelanguage += '<a class="bars-green" href="javascript:void(0)"><img src="/Content/Images/yellow-icon.jpg" title="Not same as Library"></a><span style="float:right;"><a href="javascript:void(0)" title="Comments" onclick="ViewClausecomments(\'' + viewleveldata + '\')" ><img src="/Content/Images/comment.png"></a>(<span id=counetcomment' + viewleveldata + '></span>)</span></p>';
                            }
                                break;
                            case 'Removed': {
                                isremoved = "true";
                                articlelanguage += '<a class="bars-green" href="javascript:void(0)"><img src="/Content/Images/flag-icon.jpg" title="Required Term Removed From Contract"></a><span style="float:right;"><a href="javascript:void(0)" title="Comments" onclick="ViewClausecomments(\'' + viewleveldata + '\')" ><img src="/Content/Images/comment.png"></a>(<span id=counetcomment' + viewleveldata + '></span>)</span></p>';
                            }
                                break;
                            case 'Same as Library':
                            default: {
                                articlelanguage += '<a class="bars-green" href="javascript:void(0)"><img src="/Content/Images/green-icon.jpg" title="Same as Library"></a><span style="float:right;"><a href="javascript:void(0)" title="Comments" onclick="ViewClausecomments(\'' + viewleveldata + '\')" ><img src="/Content/Images/comment.png"></a>(<span id=counetcomment' + viewleveldata + '></span>)</span></p>';
                            }
                                break;
                        }
                        if (isremoved == "true") {
                            var cleanText = Languagecollection[arrdsp].LanguageText.replace(/<\/?[^>]+(>|$)/g, "");
                            //articlelanguage += '<p style="text-decoration:line-through;">' + cleanText + '</p></div></div>'
                            articlelanguage += '<p>' + cleanText + '</p></div></div>'
                        } else {
                            articlelanguage += '<p>' + Languagecollection[arrdsp].LanguageText + '</p></div></div>'
                        }
                        docurlkeyword = Languagecollection[arrdsp].Keywords;
                    }
                    $("#ulTermsClauseBody").html(articlelanguage);
                    var divVersions = '<span>Current Version </span>';
                    divVersions += '<span class="ViewDoc_version">' + docversionnum + '</span>';
                    divVersions += '<span> By</span>';
                    divVersions += '<span class="grey"> ' + docversionby + '</span>';
                    divVersions += '<span> on</span>';
                    divVersions += '<span class="grey"> ' + moment(new Date(docversiondate)).format('Do MMM YYYY') + '</span> ';
                    //divVersions += '<span><button type="button" class="Viewdoc_word" style="cursor:pointer" onclick="viewdocinword(\'' + docurlkeyword + '\')">View in word</button></span>';
                    divVersions += '<span class="Viewdoc_word" ><span class="dropdown">'
                    divVersions += '<a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" href="javascript:void(0);" data-target="#" id="dLabel">'
                    divVersions += 'View Document'
                    divVersions += '<span class="caret"></span>'
                    divVersions += '</a>'
                    divVersions += '<ul class="dropdown-menu" aria-labelledby="dLabel">'
                    divVersions += '<li><a href="javascript:void(0);" onclick="viewdocinword(\'' + docurlkeyword + '\')">Open in Word</a></li>'
                    divVersions += '<li><a href="' + localStorage.SPHostUrl + "/_layouts/WopiFrame.aspx?sourcedoc=" + docurlkeyword + "&action=default" + '" target="_blank">Open in Word Online</a></li>'
                    divVersions += '</ul>'
                    divVersions += '</span>'
                    divVersions += '</span>'

                    $("#docversion").html(divVersions);

                    //$("#docversion").html('<span>Current Version</span><span class="ViewDoc_version">' + docversionnum + '</span><span><button type="button" class="Viewdoc_word"  style="cursor:pointer" onclick="viewdocinword(\'' + docurlkeyword + '\')">View in word</button ></span>')
                    $("#docversion").css("display", "inline-block");
                    articlelanguage = '';
                    if (languagerowkeycollection.length > 0) {
                        getallcontracttypecomment(languagerowkeycollection);
                    }
                } else {
                    $("#ulTermsClauseBody").html("<li style='margin-top: 10px'>No items found.</li>");
                    $("#docversion").css("display", "none");
                }
            },
            error: function () {
                $("#ulTermsClauseBody").html("<li style='margin-top: 10px'>No items found.</li>");
                $("#docversion").css("display", "none");
            }
        });
    } else {
        $("#docversion").css("display", "none");
        $("#ulTermsClauseBody").html("<li Style='margin-top: 10px;'>Select available document.<li>");
    }
});

function getallcontracttypecomment(rkeycollection) {
    var rowkeysplit = rkeycollection;
    if (rowkeysplit.length > 0) {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/clause/allcommnettypeclausecomment?commenttype=ContractClause',
            type: 'GET',
            dataType: 'json',
            cache: false,
            async: false,
            success: function (data) {
                var vAccFeat = $.grep(data, function (n, i) {
                    return (n.ContractID == getParameterByName("ContractID"));
                });
                if (vAccFeat.length > 0) {
                    $(rowkeysplit).each(function (i, item12) {
                        var vAccFeat12 = $.grep(vAccFeat, function (n, i) {
                            return (n.ObjectID == item12);
                        });
                        if (vAccFeat12.length > 0) {
                            $("#counetcomment" + item12).html(vAccFeat12.length);
                        }
                        else {
                            $("#counetcomment" + item12).html("0");
                        }
                    });
                }
                else {
                    $(rowkeysplit).each(function (i, item) {
                        $("#counetcomment" + item).html("0");
                    });
                }
            },
            error: function () {
                $(rowkeysplit).each(function (i, item) {
                    $("#counetcomment" + item).html("0");
                });
            }
        });
    }
}