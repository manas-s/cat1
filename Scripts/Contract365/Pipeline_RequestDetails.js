var vRequestID = "";
var strSelectedRequestType = "";
var SaveDraftInCloud = "";
var requestItem;
var thisContractAreaSettings;
var businessAreaPath = "";
var vCurrencyDisplayStyle = "";
var settingRenewable = false;
var RequestDetailsTextareaC;
//drag & drop file upload
var droppedfiles = [];
var cTitle = null;
var cFlag = null;
var removedItems = [];
var connamechecking = null;
var dropexitfilename = [];
//drag & drop file upload
var DocumentCount = 0;
var requestercollection = "";
var SettingUserRole = "";
var workflowurltoshow = "";
var PrvRelatedCounterparities = [];
var arrRelatedCounterparities = [];
var curRelatedCounterparities = [];
var vInRecycleBin = false;
var inrefreshState = false;
var CounterPartyArrayprev = [];
var thisBusinessAreaNameC = "";
var thisContractAreaNameC = "";
var thisBusinessAreaNameRowKey = "";
var thisContractAreaNameRowKey = "";
var thisBusinessAreaPath = '';
var RelationshipTypes = [];
var pendingStarted = false;

var multipleChecksDocumentIDd = [];
var multipleChecksDocumentID = [];
var vGlobalObjForGeneric = "";
var arrprevRU = [];
var myArrayRU = [];
var arrCurrentRelated = [];
var rcFromDocument = false;
var vContracts = "";
var vCounterpartyFields = [];
var hashtable = {};
var LeagalEntity;
var strSelCounterPartyField = "";
var listRelatedContracts = [];
var cleartimevalue3;

$(document).ready(function () {
    try {
        if (typeof (BusinessAreaAccess) == "undefined" || BusinessAreaAccess == null || BusinessAreaAccess.length == 0) {
            var newArray = localStorage.BusinessAreaAccess.split(',').filter(function (v) { return v !== '' });
            BusinessAreaAccess = newArray;
        }
    }
    catch (ex)
    { }
    if (localStorage.UserType.indexOf("Global Contract Owner") >= 0) {
        $(".GlobalManage").css('display', '');
    } else {
        $(".GlobalManage").css('display', 'none');
    }
    var vTab = getParameterByName("Tab");
    if (vTab == 'Activity')
        ShowTabDetail('Activity');
    vRequestID = getParameterByName("RequestID");
    GetRequestActivities(vRequestID);
    BindRequestDetails(vRequestID);
    BindDocument(vRequestID);
    BindRelatedContracts(vRequestID);
    BindCreatedContracts(vRequestID);

    BindPeople();
    var RequestDetailsTextareaN = new nicEditor({ buttonList: ['bold', 'italic', 'underline', 'strikethrough', 'left', 'center', 'right', 'justify', 'ol', 'ul', 'fontSize', 'fontFamily', 'fontFormat', 'removeformat', 'hr', 'indent', 'outdent', 'link', 'unlink', 'forecolor', 'bgcolor', 'xhtml'] }).panelInstance('txtNotes');
    $('.nicEdit-panelContain').parent().width('100%');
    $('.nicEdit-panelContain').parent().next().width('100%');
    $('.nicEdit-main').width("99%");
    allowOnlyNumberInInputBox("txtShareExpInContract");
    allowOnlyNumberInInputBox("txtShareExpIn");
    allowOnlyNumberInInputBox("txtDuration");
    //BindBusinessAreaPicker11();
    clearTimeout(cleartimevalue3);
    cleartimevalue3 = setTimeout(refreshRequestActivities, 10000);
});

$(document).ready(function () {
    CheckGlobalSettings();
    $("#dvAddNotes").dialog({
        autoOpen: false, closeText: "",
        width: "60%",
        title: "Request Notes",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "OK": function () { AddNotes(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#contractLogsPopup").dialog({
        autoOpen: false, closeText: "",
        width: "60%",
        title: "Request History",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "Close": function () { $(this).dialog("close"); }
        }
    });
    $("#addEditCounterparty").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Counterparty",
        dialogClass: "popup_width100",
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

    $("#addEditStatus").dialog({
        autoOpen: false, closeText: "",
        width: "40%",
        minHeight: "80%",
        resizable: false,
        title: "Change Status",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "OK": function () { if (imgcheckgeneral()) { $(this).dialog("close"); } },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        open: function (event, ui) {
        }
    });

    $("#addEditDocument").dialog({
        autoOpen: false, closeText: "",
        width: "80%",
        title: "Document",
        dialogClass: "popup_width100",
        height: 600,
        modal: true,
        buttons: [{
            text: "Save",
            "id": "btnDocAdd",
            click: function () { modalOnOpenDocument(); }
        },
            {
                text: "Cancel",
                "id": "btnDocCancel",
                click: function () {
                    $(this).dialog("close");
                }
            }
        ],
        close: function (event, ui) {
            $("#dtValidFrom").val('');
            $("#dtValidTill").val('');
            $("#txtReminder1New").val('');
            $("#txtReminder2New").val('');
            $("#txtReminder3New").val('');
            $("#ddlReminder1New").find('option[value="before"]').prop("selected", true);
            $("#ddlReminder2New").find('option[value="before"]').prop("selected", true);
            $("#ddlReminder3New").find('option[value="before"]').prop("selected", true);
            $("#ddlDocRemindTo").prop('selected', false);
        }
    });

    $("#EditDocument").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Document",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "Save": function () { modalOnOpenDocument(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        close: function () {

        }
    });

    $("#viewMetadataDetailDocument").dialog({
        autoOpen: false, closeText: "",
        width: "67%",
        title: "Detail",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "Close": function () {
                $(this).dialog("close");
            }
        }
    });

    $("#viewMetadataDetail").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Detail",
        modal: true,
        buttons: {
            "Close": function () {
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
    $("#addEditPeople").dialog({
        autoOpen: false, closeText: "",
        width: "65%",
        height: "auto",
        resizable: false,
        title: "People",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "OK": function () {
                if (savePeople()) {
                    $(this).dialog("close");
                    RemoveErrors();
                }
            },
            Cancel: function () {
                $(this).dialog("close");
                RemoveErrors();
            }
        },
        close: function () {
            RemoveErrors();
        }
    });

    $("#dvViewProject").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Project",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            Close: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#dvViewProjectTask").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Project Task",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            Close: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#popupContracts").dialog({
        autoOpen: false, closeText: "",
        width: "85%",
        height: "auto",
        title: "Related Contract Record(s)",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "OK": function () { CreateRelatedContracts(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#browseBAOwners").dialog({
        autoOpen: false, closeText: "",
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
                $('#txtNewCpBusinessArea').val($('#txtBAOwnerof').val());
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
    $("#bulkuploaddoc").dialog({
        autoOpen: false, closeText: "",
        width: "80%",
        title: "Users",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
        },
        close: function () {
            $("#tbBulkControls").empty();
            dropexitfilename = [];
            $("#file").empty();
            droppedfiles.splice(0, droppedfiles.length)
            droppedControls = 0;
            $(this).dialog("close");
            document.getElementById("holder").style.border = "1px solid white";
            $('#holder').css("opacity", "1");
            $("#holder").css("min-height", "0px");
            $('#holder').css("pointer-events", "auto");
            document.getElementById("iddropfile").style.display = "none";
        }
    });

    BindCounterpartyType();

    $("#popupCounterparties").dialog({
        autoOpen: false, closeText: "",
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

    $("#dvAlertDetails1").dialog({
        autoOpen: false, closeText: "",
        width: "45%",
        title: "Alert",
        modal: true,
    });

    $("#dvRequestNotAvail").dialog({
        autoOpen: false, closeText: "",
        width: "100%",
        height: "1000",
        dialogClass: "popup_width100",
        modal: true,
        resizable: false,
        closeOnEscape: false,
        close: function (event, ui) {
            location = "/Pipeline/Requests";
        }
    });
    //manoj
    $("#browseContracts").dialog({
        autoOpen: false, closeText: "",
        width: "85%",
        title: "Contract",
        modal: true,
        buttons: {
            "OK": function () {
                var s = AddContract();
                //$(this).dialog("close"); $("#txtSearchBoxContracts").val("");
            },
            Cancel: function () {

                $(this).dialog("close");

            }
        },
        close: function () {
            if ($('[name="RelatedContracts"]:checked').length > 0) {
                $('[name="RelatedContracts"]:checked').each(function () {
                    $(this).prop("checked", false);
                    arrCurrentRelated.splice(arrCurrentRelated.indexOf($(this).attr('value')), 1)
                })
                $("#liSelectedRelatedContract >span").remove();
                $('#ulRelatedContracts').empty();
                $("#txtSearchBoxContracts").val("");
            }
        }
    });
    //manoj
    allowOnlyNumberInInputBox("txtExpIn");

    //$("#dialogDelay").dialog({
    //    autoOpen: false, closeText: "",
    //    width: "70%",
    //    title: "Request Missing Info",
    //    dialogClass: "popup_width100",
    //    modal: true,
    //    buttons: {
    //        "Close": function () { $(this).dialog("close"); },
    //    }
    //});
    //manoj
    //Browse General for multi choice field(s)
    $("#browseGeneric").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        modal: true,
        buttons: {
            "OK": function () {
                var s = false;
                var vCoounterparty = "";
                var my_data = $(this).data('param_1')
                var listdetails = '';
                if (multipleChecksDocumentID != null && multipleChecksDocumentID.length > 0) {
                    listdetails = '';
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
                    s = true;
                    $(this).dialog("close");
                }
                else {
                    swal({
                        title: '',
                        text: "No item has been selected,Do you want to continue?",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'No',
                        html: true
                    },
                    function (confirmed) {
                        if (confirmed) {
                            listdetails = '';
                            $('#' + my_data).val('');

                            s = false;
                            $("#browseGeneric").dialog("close");
                        }
                        else {
                            $("#browseGeneric").dialog("open");
                        }
                    });
                }


                //  if (s) {
                $(this).dialog("close");
                //  }

            },
            Cancel: function () {
                multipleChecksDocumentID = [];
                $('#liSelectedRU').empty();
                $(this).dialog("close");
            }
        }
    });

    $("#browseCounterparty").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Counterparty",
        resizable: false,
        modal: true,
        buttons: {
            "OK": function () { AddCounterparty(); },
            Cancel: function () {
                strSelCounterPartyField = "";
                $(this).dialog("close"); $("#txtSearchBox").val("");
                ClearAddCounterparty();
                $('#chkCounterpartyNotInList').prop('checked', false);

                $('#dvCPExistingCounterparty').css("display", "");
                $('#dvCPAddCounterparty').css("display", "none");
                $('#rdCPAddCounterparty').prop('checked', false);
                $('#rdCPExistingCounterparty').prop('checked', true);

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
            strSelCounterPartyField = "";
            ClearAddCounterparty();
            $('#chkCounterpartyNotInList').prop('checked', false);

            $('#dvCPExistingCounterparty').css("display", "");
            $('#dvCPAddCounterparty').css("display", "none");
            $('#rdCPAddCounterparty').prop('checked', false);
            $('#rdCPExistingCounterparty').prop('checked', true);

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
    //Browse General for multi choice field(s)

    //Browse Orginating Party
    $("#browseOriginatingParty").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Originating Party",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "OK": function () {
                var s = AddOriginatingParty();
                //  if (s) {
                $(this).dialog("close");
                //  }
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
    //Browse Orginating Party

    $("#browseLegalEntity").dialog({
        autoOpen: false, closeText: "",
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

    $("#dialogDelay").dialog({
        autoOpen: false, closeText: "",
        width: "70%",
        title: "Missing Information",
        dialogClass: "popup_width100",
        modal: true,
        buttons: [
        {
            text: "Update",
            "id": "btnPendingUpdate",
            "class": "Contribute",
            click: function () {
                var idSelected = $("#dialogDelay .pop_up__Acti").attr("id");
                idSelected = idSelected.replace('li', '');
                switch (idSelected) {
                    case 'Required':
                        {
                            $(this).dialog("close");
                            contextMenuRequestSettings('edit', '', '')
                            break;
                        }
                    case 'Document':
                        {
                            $(this).dialog("close");
                            $("#btnAddRequestDocument").trigger("click");
                            $("#tabTemplate").trigger("click");
                            break;
                        }
                    case 'People':
                        {
                            $(this).dialog("close");
                            MangePeople();
                            break;
                        }
                    case 'Description':
                        {
                            $(this).dialog("close");
                            MakeTitleEditable();
                            break;
                        }
                }
            }
        },
        {
            text: "Close",
            "id": "btnPendingClose",
            click: function () {
                $(this).dialog("close");
            }
        }

        ],
    });
    //manoj
});

function BindRequestDetails(requestid) {
    $("#btnCreateContractFromRequest").css('display', 'none');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/requestsbyrequestid?requestid=' + requestid,
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
        processData: false,
        success: function (item) {
            BindNotes(vRequestID);
            requestItem = item;
            $("#hdnPermission").val(item.Permission);
            if (item.InRecycleBin == "Yes") {
                // $("#btnCreateContractFromRequest").css('display', 'none');
                $("#btnmorefeature").removeClass('openmenuRequestSettings');
                $("#btnmorefeature").removeClass('openmenuRequestSettingsdraft');
                $("#btnmorefeature").addClass('openmenuRequestSettingsRecycleBin');
                $("#hdnPermission").val('View');
                $(".RecycleBin").hide();
            }
            else {
                $("#btnmorefeature").removeClass('openmenuRequestSettingsdraft');
                $("#btnmorefeature").removeClass('openmenuRequestSettingsRecycleBin');
                $("#btnmorefeature").addClass('openmenuRequestSettings');
                var found = $.grep(BusinessAreaAccess, function (n, ind) {
                    return (n.indexOf(item.BusinessAreaPath) == 0);
                });
                if (found.length > 0 || localStorage.UserType.indexOf("Global Contract Owner") >= 0) {
                    if ($("#spanstatus").text() == "Cancelled") {
                        //    $("#btnCreateContractFromRequest").css('display', 'none');
                    } else {
                        //  $("#btnCreateContractFromRequest").css('display', '');
                    }
                }
                $("#hdnPermission").val(item.Permission);

            }

            if (item.IsDraft == "Yes" || item.Status == "Cancelled") {
                if (item.InRecycleBin != "Yes") {
                    $("#btnmorefeature").removeClass('openmenuRequestSettings');
                    $("#btnmorefeature").removeClass('openmenuRequestSettingsRecycleBin');
                    $("#btnmorefeature").addClass('openmenuRequestSettingsdraft');
                    if (item.IsDraft == "Yes" && item.Status != "Cancelled") {
                        $("#hdnPermission").val(item.Permission);
                    }
                    else {
                        $("#hdnPermission").val('View');
                    }
                    //  $("#btnCreateContractFromRequest").css('display', 'none');
                    //  $(".RecycleBin").hide();

                }
            } else {
                if (item.InRecycleBin != "Yes") {
                    $("#btnmorefeature").removeClass('openmenuRequestSettingsdraft');
                    $("#btnmorefeature").removeClass('openmenuRequestSettingsRecycleBin');
                    $("#btnmorefeature").addClass('openmenuRequestSettings');
                    var found = $.grep(BusinessAreaAccess, function (n, ind) {
                        return (n.indexOf(item.BusinessAreaPath) == 0);
                    });
                    if (found.length > 0 || localStorage.UserType.indexOf("Global Contract Owner") >= 0) {
                        if ($("#spanstatus").text() == "Cancelled") {
                            //     $("#btnCreateContractFromRequest").css('display', 'none');
                        } else {
                            //      $("#btnCreateContractFromRequest").css('display', '');
                        }
                    }
                    $("#hdnPermission").val(item.Permission);
                }
            }





            $(".openmenuRequestSettings").contextMenu({ menu: 'dropdownMenuRequestSettings', leftButton: true }, function (action, el, pos) { contextMenuRequestSettings(action, el.parent("tr"), pos); });
            $(".openmenuRequestSettingsdraft").contextMenu({ menu: 'dropdownMenuRequestSettingsdraft', leftButton: true }, function (action, el, pos) { contextMenuRequestSettings(action, el.parent("tr"), pos); });
            $(".openmenuRequestSettingsRecycleBin").contextMenu({ menu: 'dropdownMenuRequestSettingsRecycleBin', leftButton: true }, function (action, el, pos) { contextMenuRequestSettingsRecycleBin(action, el.parent("tr"), pos); });




            if (item.Status == 'Archived' || item.Status == 'Replaced' || item.Status == 'Completed') {
                $("#hdnPermission").val('View');
            }


            $("#hdnRequestID").text(item.RowKey);
            //manoj
            $("#hdnContractCreated").text(item.ContractCreated == "true" ? "true" : "false");
            //manoj
            $("#lblApprovalWorkflow").text(item.ApprovalWorkflow);
            $("#lblReviewWorkflow").text(item.ReviewWorkflow);
            $("#lblContractArea").text(item.ContractArea);
            $("#lblBusinessArea").text(item.BusinessArea);
            $("#lblBusinessAreaPath").text(item.BusinessAreaPath);
            $("#lblContractAreaAdmins").text(item.ContractAreaAdministrators);

            $("#hdnContractCurrency").text(item.ContractCurrency);
            $("#hdnBaseContractCurrency").text(item.BaseContractValueCurrency);
            $("#lblBusinessAreaOwners").text(item.BusinessAreaOwners);
            $("#lblRequestType").text(item.RequestType);
            thisContractAreaNameC = item.ContractArea;
            thisBusinessAreaNameC = item.BusinessArea;
            businessAreaPath = item.BusinessAreaPath;
            thisBusinessAreaPath = item.BusinessAreaPath;
            BindBusinessAreaPicker11();
            if (item.Description == "") {
                $("#lblRequestDescription").text("");
                $("#tblDescriptionMissing").parent().show();
                //$("#lblRequestDescription").addClass('cntdetails-NA');
            }
            else {
                $("#lblRequestDescription").text(item.Description);
                $("#lblRequestDescription").removeClass('cntdetails-NA');
            }
            $("#lblRequestTitle").text(item.RequestTitle);
            $("#lblRelatedPopup_ContractTitle").text("Select Relationship for " + item.RequestTitle)
            $("#summCBusArea").text(item.BusinessAreaPath);
            var fCreatedDate = "";
            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
            { fCreatedDate = moment(new Date(item.Created)).format('MM/DD/YYYY'); }
            else { fCreatedDate = moment(new Date(item.Created)).format(localStorage.AppDateFormat); }
            $("#summCreated").text(fCreatedDate);
            if (vActiveUsers.indexOf(item.CreatedBy.trim()) < 0 && vActiveUsers.length > 0)
                $("#summCreatedBy").html('<a href="javascript:void(0);" onclick="ViewUserProfile(\'' + escape(item.CreatedBy) + '\')" class="Link_UserProfile disabled_item_link" title="This user is no longer available.">' + item.CreatedBy + '</a>');
            else
                $("#summCreatedBy").html('<a href="javascript:void(0);" onclick="ViewUserProfile(\'' + escape(item.CreatedBy) + '\')" class="Link_UserProfile">' + item.CreatedBy + '</a>');
            var usersarr = [];
            if (item.ContractAreaAdministrators == null || item.ContractAreaAdministrators == "") {
                $("#liContractAreaAdminNA").css('display', '');
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
                $("#liBusinessAreaOwnerNA").css('display', '');
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
            if (item.RequestCollaborators == null || item.RequestCollaborators == "") {
                $("#licollaborators").text("Not Available");
                $("#spCollaborators").text("Not Available");
            }
            else {
                $("#licollaborators").text(item.RequestCollaborators);
                usersarr = item.RequestCollaborators.split(";");
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
                $("#spCollaborators").html(vUsers);
            }
            if (item.Approvers == null || item.Approvers == "") {
                $("#liapprovers").text("Not Available");
                $("#spApprovers").text("Not Available");
            }
            else {
                $("#liapprovers").text(item.Approvers);
                usersarr = item.Approvers.split(";");
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
                $("#spApprovers").html(vUsers);
            }
            if (item.ApprovedBy == null || item.ApprovedBy == "") {
                $("#spApproveBy").text("Not Available");
            }
            else {
                usersarr = item.ApprovedBy.split(";");
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
                $("#spApproveBy").html(vUsers);
            }

            if (item.AssignedTo == null || item.AssignedTo == "") {
                $("#liassignto").text("Not Available");
                $("#spAssignedTo").text("Not Available");
            }
            else {
                $("#liassignto").text(item.AssignedTo);
                usersarr = item.AssignedTo.split(";");
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
                $("#spAssignedTo").html(vUsers);
            }

            if (item.Requestor == null || item.Requestor == "") {
                $("#lirequestor").text("Not Available");
                $("#spRequestor").text("Not Available");
            }
            else {
                $("#lirequestor").text(item.Requestor);
                requestercollection = "";
                usersarr = item.Requestor.split(";");
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
                    if (requestercollection == "") {
                        requestercollection = usersarr[i].trim();
                    }
                    else {
                        requestercollection += ";" + usersarr[i].trim();
                    }
                }
                $("#spRequestor").html(vUsers);
            }


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
                        if (vUsers == '')
                            vUsers = '<a href="javascript:void(0);" onclick="RedirectToCounterparty(\'' + escape(usersarr[i].trim()) + '\')">' + usersarr[i].trim() + '</a>';
                        else
                            vUsers += '; <a href="javascript:void(0);" onclick="RedirectToCounterparty(\'' + escape(usersarr[i].trim()) + '\')">' + usersarr[i].trim() + '</a>';
                    }
                    $("#summCounterparty").html(vUsers);
                } else {
                    $("#summCounterparty").text(item.Counterparty);
                }
            }
            RequestTopActions();
            $("#txtBusinessArea").val(item.BusinessArea);
            getcontractareasettings(item.ContractArea);
            connamechecking = item.ContractArea;
            if (item.IsStandard == "Yes") {
                $("#liRequestStandard").css('display', 'none');
                $("#liRequestNonStandard").css('display', '');
            }
            else {
                $("#liRequestStandard").css('display', '');
                $("#liRequestNonStandard").css('display', 'none');
            }
            strSelectedRequestType = item.RequestType;
            BindStatus();
            GetContractValueSetting(item);


            ApplyPermissionToMenu($("#hdnPermission").val());
            if ((item.Permission == "Contribute" || item.Permission == "Manage") && (item.Status == "Cancelled"))
                $(".EditBtnMenu").show();
            //Related Projects
            if (item.ProjectTask == null || item.ProjectTask == "") {
                if (item.Project == null || item.Project == "") {
                    $("#tblRelatedProjects").empty();
                    $("#tblRelatedProjects").append('No items found.');
                }
                else {
                    $("#tblRelatedProjects").empty();
                    if (item.Project.indexOf(';') >= 0) {
                        var vrelated = "";
                        $.each(item.Project.split(";"), function (a, itemname) {
                            vrelated += '<tr>';
                            vrelated += '<td height="10" align="left" valign="top" class="content-text clr999"><a href="javascript:void(0);" onclick="ViewProject(\'' + itemname.split(':')[0] + '\')">' + itemname.split(':')[0] + '</a></td>';
                            vrelated += '<td height="10" align="left" valign="top" class="content-text">No task assigned</td>';
                            vrelated += '</tr>';
                        });
                        $("#tblRelatedProjects").html(vrelated);
                    } else {
                        var vrelated1 = "";
                        vrelated1 = '<tr>';
                        vrelated1 += '<td height="10" align="left" valign="top" class="content-text clr999"><a href="javascript:void(0);" onclick="ViewProject(\'' + item.Project.trim() + '\')">' + item.Project.trim() + '</a></td>';
                        vrelated1 += '<td height="10" align="left" valign="top" class="content-text">No task assigned</td>';
                        vrelated1 += '</tr>';
                        $("#tblRelatedProjects").html(vrelated1);
                    }
                }
            } else {
                BindProjects(item.ProjectTask, item.Project);
            }
            if (item.InRecycleBin == "Yes") {
                $("#btnCreateContractFromRequest").css('display', 'none');
                $("#dvRecyclebinMessage").css('display', '');
                $(".RecycleBin").hide();
                //manoj
                //$.ajax({
                //    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/requesttypes?requesttypename=' + item.RequestType,
                //    type: 'GET',
                //    dataType: 'json',
                //    cache: false,
                //    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                //    success: function (data) {
                //        if (data.IsRelatedToContract == "No") {
                //            $(".FL_RelatedContract").css('display', 'none');
                //        } else {
                //            $(".FL_RelatedContract").css('display', '');
                //        }
                //    }
                //});
                //manoj
            }
            else if (item.IsDraft == "Yes") {
                $("#dvDraftMessage").css('display', '');
                var loca = "/Pipeline/EditRequest?RequestID=" + getParameterByName("RequestID") + "&RequestType=" + encodeURIComponent($("#lblRequestType").text());
                $('#lnkDraftToUpdate').attr('href', loca);

                $("#btnCreateContractFromRequest").css('display', 'none');
                $("#btnmorefeature").addClass('openmenuRequestSettingsdraft');
                //manoj
                //$.ajax({
                //    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/requesttypes?requesttypename=' + item.RequestType,
                //    type: 'GET',
                //    dataType: 'json',
                //    cache: false,
                //    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                //    success: function (data) {
                //        if (data.IsRelatedToContract == "No") {
                //            $(".FL_RelatedContract").css('display', 'none');
                //        } else {
                //            $(".FL_RelatedContract").css('display', '');
                //        }

                //    }
                //});
                //manoj
            } else {
                //if status is cancelled or allow contract creation setting in Request Type is disabled, hide contract creation button
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/requesttypes?requesttypename=' + encodeURIComponent(item.RequestType),
                    type: 'GET',
                    dataType: 'json',
                    cache: false,
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    success: function (data) {
                        //manoj
                        //if (data.IsRelatedToContract == "No") {
                        //    $(".FL_RelatedContract").css('display', 'none');
                        //} else {
                        //    $(".FL_RelatedContract").css('display', '');
                        //}
                        //manoj
                        if (data.AllowContractCreation == "Yes" && (item.Status != "Cancelled")) {
                            if (typeof (BusinessAreaAccess) === 'string')
                                BusinessAreaAccess = JSON.parse("[" + BusinessAreaAccess + "]");
                            //var found = $.grep(((typeof (localStorage.BusinessAreaAccess) != "undefined" && localStorage.BusinessAreaAccess != null) ? localStorage.BusinessAreaAccess.split(';') : []), function (n, ind) {
                            var found = $.grep(BusinessAreaAccess, function (n, ind) {
                                return (n.indexOf(item.BusinessAreaPath) == 0);
                            });
                            if (found.length > 0 || localStorage.UserType.indexOf("Global Contract Owner") >= 0 || localStorage.IsGeneralBusinessArea == "Yes") {
                                if ($("#spanstatus").text() == "Cancelled" || $("#spanstatus").text() == "On Hold") {
                                    $("#btnCreateContractFromRequest").css('display', 'none');
                                } else {
                                    if (item.Permission == "Contribute" || item.Permission == "Manage")

                                        $("#btnCreateContractFromRequest").css('display', '');
                                }
                            } else {
                                $.ajax({
                                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/contractareaname?contractareaname=' + item.BusinessAreaPath.substr(0, item.BusinessAreaPath.lastIndexOf(">")),
                                    type: 'GET',
                                    dataType: 'json',
                                    cache: false,
                                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                                    success: function (data) {
                                        if (data.RowKey == "GenCA") {
                                            if (item.Permission == "Contribute" || item.Permission == "Manage")
                                                $("#btnCreateContractFromRequest").css('display', '');
                                        } else {
                                            $("#btnCreateContractFromRequest").css('display', 'none');
                                        }

                                    }, error: function () {
                                        $("#btnCreateContractFromRequest").css('display', 'none');
                                    }
                                });
                            }
                        } else {
                            $("#btnCreateContractFromRequest").css('display', 'none');
                        }
                    }
                });
            }
            //ENH 440 Display Alerts for Missing information
            var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
            //var vMissInfoFeat = $.grep(veContractFeatures, function (n, i) {
            //    return (n.RowKey == "28" && n.Status == "ON");
            //});
            if (oGeneralSetting != "") {
                if (oGeneralSetting.DisplayMissingInformation == "No") {
                    $("#tblDocumentMissing").css("display", "");
                    $("#tblDescriptionMissing").css("display", "");
                    $("#lblRequestDescription").css("display", "");
                    $("#tblPeopleMissing").css("display", "");
                    $("#tblPeople").css("display", "");
                    $("#tblDocument").css("display", "");
                    $("#tblRequired").css("display", "");
                    $("#tblActivity").css("display", "");
                }
                else {
                    $("#tblDocumentMissing").css("display", "none");
                    $("#tblDescriptionMissing").css("display", "none");
                    $("#lblRequestDescription").css("display", "none");
                    $("#tblPeopleMissing").css("display", "none");
                    $("#tblPeople").css("display", "none");
                    $("#tblDocument").css("display", "none");
                    $("#tblRequired").css("display", "none");
                    $("#tblActivity").css("display", "none");
                    $(".clpendingaction").css("display", "none");
                }
            }
            //ENH 440 Display Alerts for Missing information
        },
        error: function () {
            $("#dvRequestNotAvail").dialog("open");
            $("#loadingPage").fadeOut();
        }

    });
}

function ApplyPermissionToMenu(vPermission) {
    if (requestItem.Status == "Cancelled") {
        if (vPermission == 'Contribute') {
            $('.Manage').css("display", "none");
        } else if (vPermission == 'Manage') {
            $('.Manage').css("display", "");
            $('.Contribute').css("display", "none");

        } else if (vPermission == 'View' || vPermission == '' && vPermission == null) {
            $('.Manage').css("display", "none");
            $('.Contribute').css("display", "none");
        }
    }
    else {
        if (vPermission == 'Contribute') {
            $('.Manage').css("display", "none");
        } else if (vPermission == 'Manage') {
            $('.Manage').css("display", "");
            $('.Contribute').css("display", "");

        } else if (vPermission == 'View' || vPermission == '' && vPermission == null) {
            $('.Manage').css("display", "none");
            $('.Contribute').css("display", "none");
        }
    }
    if (localStorage.UserType.indexOf("Global Contract Owner") >= 0) {
        $(".GlobalManage").css('display', '');
    } else {
        $(".GlobalManage").css('display', 'none');
    }

    //When request is draft, even read only user should be able to add documents and edit request
    if ((requestItem.IsDraft == "Yes" && requestItem.Permission == 'Manage' && requestItem.CreatedBy == localStorage.UserName)) {
        $('.DeleteRecord').css("display", "");
    }
    else if (requestItem.Status == "Cancelled" || requestItem.Status == "Completed") {
        if (localStorage.UserType.indexOf("Global Contract Owner") >= 0) {
            $('.DeleteRecord').css("display", "");
        }
        else {
            $('.DeleteRecord').css("display", "none");
        }
    }
    else {
        $('.DeleteRecord').css("display", "none");
    }
    //Bug (eO37039)
    if (requestItem.Status == "Cancelled" && requestItem.Permission != "View") {
        $(".ManageCancelled").css("display", "");
        $("#btnEditStatus").css("display", "");
    }
}
function ReloadRequest() {
    if (!inrefreshState) {
        inrefreshState = true;
        setTimeout(function () {
            inrefreshState = false;
        }, 5000);
        vRequestID = getParameterByName("RequestID");
        try {
            //eO39906 - Anand
            BindRequestDetails(vRequestID);
            BindRelatedContracts(vRequestID);
            BindCreatedContracts(vRequestID);
            BindDocument(vRequestID);
            GetRequestActivities(vRequestID);
            BindNotes(vRequestID);
            RequestTopActions();
        } catch (e) {
            $("#loadingPage").fadeOut();
        }
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
            var v = $(data).length;
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                var sRowKey = item.RowKey;
                var sUserName = item.UserName;
                var sEmail = item.EmailID;
                var article = '<option value="' + sUserName + '">' + sUserName + '</option>';
                var articleemailuser = '<option value="' + sUserName + '" data-emailvalue="' + sEmail + '">' + sUserName + '</option>';
                $("#ddlApproversNew").append(article);
                $("#ddlRequestorsNew").append(article);
                $("#ddlAssignedTo").append(article);
                $("#ddlWorkflowCC").append(article);
                $("#ddlSendTo").append(article);
                $("#ddlCollaboratorsNew").append(article);
                $("#ddlDocumentShareInternal").append(articleemailuser);


            }
            //AddRolesddl("ddlAssignedTo");
            $("#ddlApproversNew").chosen();
            $("#ddlRequestorsNew").chosen();
            $("#ddlAssignedTo").chosen();
            $("#ddlWorkflowCC").chosen();
            $("#ddlDocumentShareInternal").chosen();
            $("#ddlSendTo").chosen();
            $("#ddlCollaboratorsNew").chosen();
        },
        error:
            function (data) {
            }
    });
}

function MangePeople() {

    if ($("#liapprovers").text() != "") {
        GetValuesAndAutoPopulate("ddlApproversNew", $("#liapprovers").text());
    }

    if ($("#liassignto").text() != "") {
        GetValuesAndAutoPopulate("ddlAssignedTo", $("#liassignto").text());
    }

    if ($("#licollaborators").text() != "") {
        GetValuesAndAutoPopulate("ddlCollaboratorsNew", $("#licollaborators").text());
    }

    if ($("#lirequestor").text() != "") {
        GetValuesAndAutoPopulate("ddlRequestorsNew", $("#lirequestor").text());
    }

    $("#addEditPeople").dialog("option", "title", "People");
    $("#addEditPeople").dialog("open");
    $("#addEditPeople").height("auto");
}

function savePeople() {
    $('.ui-button-green-text').parent().attr('disabled', 'disabled');
    var isformvalid = false;
    if (requiredValidator('addNewPeople')) {
        $("#loadingPage").fadeIn();
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

        //if (reqtor == '') {
        //    if (localStorage.UserName != "") {
        //        GetValuesAndAutoPopulate("ddlRequestorsNew", localStorage.UserName);

        //        requestors = $("#ddlRequestorsNew").val();
        //        reqtor = '';
        //        $(requestors).each(function (i, item) {
        //            if (reqtor == '') {
        //                reqtor = item;
        //            }
        //            else {
        //                reqtor += "; " + item;
        //            }
        //        });
        //    }
        //}

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

        var collaborators = $("#ddlCollaboratorsNew").val();
        var collab = '';
        $(collaborators).each(function (i, item) {
            if (collab == '') {
                collab = item;
            }
            else {
                collab += "; " + item;
            }
        });

        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/requests/' + vRequestID + '/people',
            type: 'PUT',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            data: {
                Approvers: app,
                Requestor: reqtor,
                AssignedTo: assignto,
                RequestCollaborators: collab,
                ModifiedBy: localStorage.UserName
            },
            cache: false,
            success: function (person) {
                $('.ui-button-green-text').parent().removeAttr('disabled');
                $("#addEditPeople").dialog("close");
                requestItem.Approvers = app;
                requestItem.AssignedTo = assignto;
                requestItem.RequestCollaborators = collab;
                requestItem.Requestor = reqtor;
                $("#liapprovers").text(app);
                $("#liassignto").text(assignto);
                $("#licollaborators").text(collab);
                $("#lirequestor").text(reqtor);
                if (app == "" || app == null) {

                    $("#liapprovers").text("Not Available");
                    $("#spApprovers").text("Not Available");
                }
                else {
                    var usersarr = [];
                    usersarr = app.split(";");
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
                    $("#spApprovers").html(vUsers);
                }

                if (assignto == "" || assignto == null) {
                    $("#liassignto").text("Not Available");
                    $("#spAssignedTo").text("Not Available");
                }
                else {
                    usersarr = assignto.split(";");
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
                    $("#spAssignedTo").html(vUsers);
                }
                if (collab == "" || collab == null) {
                    $("#licollaborators").text("Not Available");
                    $("#spCollaborators").text("Not Available");
                }
                else {
                    usersarr = collab.split(";");
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
                    $("#spCollaborators").html(vUsers);
                }

                if (reqtor == "" || reqtor == null) {

                    $("#lirequestor").text("Not Available");
                    $("#spRequestor").text("Not Available");
                }
                else {
                    var usersarr = [];
                    usersarr = reqtor.split(";");
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
                    $("#spRequestor").html(vUsers);
                }
                //manoj
                $("#loadingPage").fadeOut();
                pendingStarted = false;
                //$("#tblDocumentMissing").empty();
                GetRequestPendingAction(true, "BindPeople");
                //manoj
            },
            error: function (person) {
                $("#loadingPage").fadeOut();
            }
        });


    }
    else {
        $('.ui-button-green-text').parent().removeAttr('disabled');
    }
    return isformvalid;
}

function RequestTopActions() {
    $(".m-status-btn").empty();
    var constatus = requestItem.Status;//"New";//
    if (constatus != "0" && constatus != "" && constatus != "undefined") {
        $("#spanstatus").html(constatus);
        switch (constatus) {
            case "Approved":
                $("#idNewStatus").html('<b title="Approved" class="status_blue" style="padding: 5px 10px; color:#fff"><img src="../Content/Images/status/tick.png"  class="status_img" style="padding-right:5px;">' + constatus + '<img id="btnEditStatus" title="Change Status" class="Contribute RecycleBin" src="/Content/Images/w-edit.png"></b>');
                break;
            case "Awaiting Approval":
                $("#idNewStatus").html('<b title="Awaiting Approval" class="status_yellow" style="padding: 5px 10px; color:#fff"><img src="../Content/Images/status/renew.png" class="status_img" style="padding-right:5px;">' + constatus + '<img id="btnEditStatus" title="Change Status" class="Contribute RecycleBin" src="/Content/Images/w-edit.png"></b>');
                break;
            case "Cancelled":
                $("#idNewStatus").html('<b title="Cancelled" class="status_Gray" style="padding: 5px 10px; color:#fff"><img src="../Content/Images/status/close.png" class="status_img" style="padding-right:5px;">' + constatus + '<img id="btnEditStatus" title="Change Status" class="Contribute RecycleBin" src="/Content/Images/w-edit.png"></b>');
                break;
            case "Completed":
                $("#idNewStatus").html('<b title="Completed" class="status_blue" style="padding: 5px 10px; color:#fff"><img src="../Content/Images/status/tick.png" class="status_img" style="padding-right:5px;">' + constatus + '<img id="btnEditStatus" title="Change Status" class="Contribute RecycleBin" src="/Content/Images/w-edit.png"></b>');
                break;
            case "New":
                $("#idNewStatus").html('<b title="New" class="status_green_another" style="padding: 5px 10px; color:#fff"><img src="../Content/Images/status/new.png" class="status_img" style="padding-right:5px;">' + constatus + '<img id="btnEditStatus" title="Change Status" class="Contribute RecycleBin" src="/Content/Images/w-edit.png"></b>');
                break;
            case "On Hold":
                $("#idNewStatus").html('<b title="On Hold" class="status_red" style="padding: 5px 10px; color:#fff"><img src="../Content/Images/status/exp.png" class="status_img" style="padding-right:5px;">' + constatus + '<img id="btnEditStatus" title="Change Status" class="Contribute RecycleBin" src="/Content/Images/w-edit.png"></b>');
                break;
            case "Draft":
                $("#idNewStatus").html('<b title="In Draft" class="status_Gray" style="padding: 5px 10px; color:#fff; cursor:default;"><img src="../Content/Images/icon/Draft_icon.png" class="status_img" /> ' + constatus + '</b>');
                break;
        }
        $('#btnEditStatus').click(function () {
            $("#addEditStatus").dialog("option", "title", "Change Status");
            $("#addEditStatus").dialog("open");
        });

        if (requestItem.InRecycleBin == "Yes") {
            $(".RecycleBin").hide();
        }

        if (requestItem.IsDraft == "Yes") {
            $("#idNewStatus").html('<b title="In Draft" class="status_Gray" style="padding: 5px 10px; color:#fff; cursor:default;"><img src="../Content/Images/icon/Draft_icon.png" class="status_img" />Draft</b>');
            $('#btnEditStatus').hide();
        }
    }
    else {
        $("#spanstatus").html('Not Assigned');
    }
    $(".m-status-btn").html($(".constatus").clone());
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
        $('#dvExtendCtrl').css("display", "");
        $('#dvCancelCtrl').css("display", "none");
        $('#dvRenewCtrl').css("display", "none");
    }
    else if (decodeURI(e.value) == "Cancelled") {
        $('#dvCancelCtrl').css("display", "");
        $('#dvRenewCtrl').css("display", "none");
        $('#dvExtendCtrl').css("display", "none");
    }
    else {
        $('#dvCancelCtrl').css("display", "none");
        $('#dvRenewCtrl').css("display", "none");
        $('#dvExtendCtrl').css("display", "none");
    }

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
function GetRolesUserDDlPopulate(values) {
    var userroleselectedresult1 = values;
    var usersConcat = "";
    var multiarr = [];
    if (userroleselectedresult1.length != 0) {
        var GlobelUserRoleSetting = userroleselectedresult1;
        $.ajax({
            url: '/Settings/SearchUser',
            type: 'Get',
            dataType: 'json',
            data: { searchKeyword: "" },
            cache: false,
            success: function (datauserdefault) {

                for (var k = 0; k < datauserdefault.length; k++) {
                    var item = datauserdefault[k];
                    if (usernameandrole == null) {
                        usernameandrole = item.UserName;
                    }
                    else {
                        usernameandrole = usernameandrole + ";" + item.UserName;
                    }
                }
                for (var j = 0; j < GlobelUserRoleSetting.length; j++) {
                    var finalresulchecking = GlobelUserRoleSetting[j];
                    if (usernameandrole.indexOf(finalresulchecking) == -1) {
                        var finalresulcheckingtrim = finalresulchecking.replace('[', '');
                        finalresulcheckingtrim = finalresulcheckingtrim.replace(']', '');
                        for (var axh = 0; axh < datauserdefault.length; axh++) {
                            if (datauserdefault[axh].UserRoleSetting.indexOf(finalresulcheckingtrim) != -1) {
                                var usernamefetch = datauserdefault[axh].UserName;
                                if (usernamefetch.trim() != "") {
                                    if (multiarr.indexOf(usernamefetch.trim()) == -1) {
                                        multiarr.push(usernamefetch.trim());
                                        usersConcat += usernamefetch + ";";
                                    }
                                }
                            }
                        }
                    }
                    else {
                        if (finalresulchecking != "") {

                            if ($.inArray(finalresulchecking.trim(), multiarr) == -1) {
                                multiarr.push(finalresulchecking.trim());
                                usersConcat += finalresulchecking + ";";
                            }
                        }
                    }
                }
                return usersConcat;
            },
            error: function () { return usersConcat; }
        });
    }
    else {
        for (var i = 0; i < reslength; i++) {
            if (res[i].trim() != "") {
                if (multiarr.indexOf(res[i].trim()) == -1) {
                    multiarr.push(res[i].trim());
                    usersConcat += res[i].trim() + ";";
                }
            }
        }
    }
    return usersConcat;
}
function BindStatus() {
    var ctrl = '<li id="New">';
    ctrl += '<input id="rdstatusNew" type="radio" onclick="javascript:statusclick(this);" name="rdstatus" value="New" class="css-checkbox" />';
    ctrl += '<label for="rdstatusNew" class="css-label"><b title="New" class="status_green_another"><img src="../Content/Images/status/new.png">new</b>New</label>';
    ctrl += '</li>';
    ctrl += '<li id="Awaiting Approval">';
    ctrl += '<input id="rdstatusAwtAppr" type="radio" onclick="javascript:statusclick(this);" name="rdstatus" value="Awaiting Approval" class="css-checkbox" />';
    ctrl += '<label for="rdstatusAwtAppr" class="css-label"><b title="Awaiting Approval" class="status_yellow"><img src="../Content/Images/status/renew.png">appr</b>Awaiting Approval</label>';
    ctrl += '</li>';
    ctrl += '<li id="Approved">';
    ctrl += '<input id="rdstatusAppr" type="radio" onclick="javascript:statusclick(this);" name="rdstatus" value="Approved" class="css-checkbox" />';
    ctrl += '   <label for="rdstatusAppr" class="css-label"><b title="Approved" class="status_blue"><img src="../Content/Images/status/tick.png">appr</b>Approved</label>';
    ctrl += '</li>';
    ctrl += '<li id="Completed">';
    ctrl += '<input id="rdstatusComp" type="radio" onclick="javascript:statusclick(this);" name="rdstatus" value="Completed" class="css-checkbox" />';
    ctrl += '<label for="rdstatusComp" class="css-label"><b class="status_blue"><img src="../Content/Images/status/tick.png"> Comp</b>Completed</label>';
    ctrl += '</li>';
    ctrl += '<li id="On Hold">';
    ctrl += '<input id="rdstatusHold" type="radio" onclick="javascript:statusclick(this);" name="rdstatus" value="On Hold" class="css-checkbox" />';
    ctrl += '<label for="rdstatusHold" class="css-label"><b title="On Hold" class="status_red"><img src="../Content/Images/status/exp.png">hold</b>On Hold</label>';
    ctrl += '</li>';
    ctrl += '<li id="Cancelled">';
    ctrl += '<input id="rdstatusCanc" type="radio" onclick="javascript:statusclick(this);" name="rdstatus" value="Cancelled" class="css-checkbox" />';
    ctrl += '<label for="rdstatusCanc" class="css-label"><b title="Cancelled" class="status_Gray"><img src="../Content/Images/status/close.png">canc</b>Cancelled</label>';
    ctrl += '</li>';
    ctrl += '<div class="f_list" style="padding: 0px 0px 0px 10px;display:none;" id="dvCancelCtrl">';
    ctrl += '<textarea id="txtCancelledReason" placeholder="Reason for Cancellation" rows="3" class="f_text-box width90" />';
    ctrl += '</div>';

    $("#menu34").empty();
    $("#menu34").append(ctrl);
    $('input:radio[name="rdstatus"][value="' + $("#spanstatus").text() + '"]').prop('checked', true);

    if ($("#spanstatus").text() == "Cancelled") {
        $('#dvCancelCtrl').css("display", "");
        $('#dvRenewCtrl').css("display", "none");
    }

}

function imgcheckgeneral() {
    var selectedValue = decodeURI($("input:radio[name=rdstatus]:checked").val());
    if (selectedValue == "Cancelled") {
        if ($("#txtCancelledReason")[0].value == "") {
            swal("", "Enter reason for cancellation.");
            return false;
        } else {
            $("#btnCreateContractFromRequest").css('display', 'none');
            changestatus();
            requestItem.Status = selectedValue;
            RequestTopActions();
            return true;
        }
    } else if (selectedValue == "Renewed") {
        if ($("#dtRenewalDate")[0].value == "") {
            swal("", "Select renewal date.");
            return false;
        } else {
            changestatus();
            updaterenewaldate();
            requestItem.Status = selectedValue;
            RequestTopActions();
            return true;
        }
    } else if (selectedValue == "Extended") {
        if ($("#dtExtendedDate")[0].value == "") {
            swal("", "Select extended date.");
            return false;
        } else {
            changestatus();
            requestItem.Status = selectedValue;
            RequestTopActions();
            return true;
        }
    } else if (selectedValue == "undefined" || selectedValue == "0" || selectedValue == "") {
        swal("", "Select Status");
        return false;
    }
    else {
        changestatus();
        requestItem.Status = selectedValue;
        //Sridhar
        if (selectedValue == "Completed")
            ApplyPermissionToMenu('View');
        //Sridhar
        RequestTopActions();
        return true;
    }
}

function BindMetaData(requestRecord) {
    $("#loadingPage").fadeIn();
    if (requestRecord == null) {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/requestsbyrequestid?requestid=' + getParameterByName("RequestID"),
            type: 'GET',
            cache: false,
            contentType: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
            processData: false,
            success: function (data) {
                requestRecord = data;
                BindMetadataDetail(requestRecord);
            }
        });
    }
    else { BindMetadataDetail(requestRecord); }


}

function BindMetadataDetail(requestRecord) {
    $("#tdSumRequestTitle").html(requestRecord.RequestTitle);
    $("#tdSumRequestType").html(requestRecord.RequestType);
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/IRequestDetails?requestid=' + getParameterByName("RequestID"),
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
                    var vCurrency = "";
                    $("#tblSummaryMetadata").empty();
                    var datalenght = metadataFields.length;
                    for (var i = 0; i < datalenght; i++) {

                        var item = metadataFields[i];
                        if ((item.FieldName != "RequestTitle") && (item.FieldName != "RequestType") && (name != "STATUSCHANGEDALERT")) {
                            if (item.FieldType == "File Upload") {
                            }
                            else {
                                var vControls = '<tr>';
                                if (item.FieldDisplayName.trim().toLowerCase().indexOf("related contracts") >= 0) {
                                    vControls += '<td class="f_head width60">Related Contract Record(s)</td>';
                                }
                                else {
                                    vControls += '<td class="f_head width90">' + item.FieldDisplayName + '</td>';
                                }

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
                                            vControls += '<td class="labelleft width60">-</td>';
                                        } else {
                                            vControls += '<td class="labelleft width60">' + onlydate + '</td>';
                                        }
                                    } else {
                                        vControls += '<td class="labelleft width60">-</td>';
                                    }
                                } else if (item.FieldName == "ContractValue" || item.FieldType == "Currency") {
                                    vCurrency = item.FieldName;
                                    valuetobindinfield = ($(vMetadata).find(item.FieldName).text() != null && $(vMetadata).find(item.FieldName).text() != "") ? $(vMetadata).find(item.FieldName).text() : "-";
                                    vControls += '<td class="labelleft width60" style="word-break: break-all;"><label id="' + item.FieldName + '">' + valuetobindinfield + '</label> ' + $("#hdnContractCurrency").text() + '</td>';
                                    valuetobindinfield = "";

                                }
                                else if (item.FieldType == "Yes/No") {
                                    var nvalue = $(vMetadata).find(item.FieldName).text();
                                    if (nvalue == '' || nvalue == '0') {
                                        vControls += '<td class="labelleft width60">-</td>';
                                    } else {
                                        vControls += '<td class="labelleft width60">' + nvalue;
                                        if (typeof ($(vMetadata).find('CustomCMD' + item.FieldName).text()) != "undefined") {
                                            if ($(vMetadata).find('CustomCMD' + item.FieldName).text() != "" && $(vMetadata).find('CustomCMD' + item.FieldName).text() != null) {
                                                vControls += '<br />' + $(vMetadata).find('CustomCMD' + item.FieldName).text();
                                            }
                                        }
                                        vControls += '</td>';
                                    }
                                }
                                else if (item.FieldType == "Phone Number") {
                                    var nvalue = $(vMetadata).find(item.FieldName).text();
                                    if (typeof (nvalue) != "undefined" && nvalue != null && nvalue != "") {
                                        if (typeof (nvalue.split(',')[2]) != "undefined" && nvalue.split(',')[2] != null && nvalue.split(',')[2] != "") {
                                            vControls += '<td class="labelleft width60"> +' + nvalue.split(',')[2].trim() + '</td>';
                                        }
                                        else {
                                            vControls += '<td class="labelleft width60">-</td>';
                                        }
                                    }
                                    else {
                                        vControls += '<td class="labelleft width60">-</td>';
                                    }
                                }
                                    //Added By Jay
                                else if (item.FieldType == "Number-P" || item.FieldType == "Number-PD") {
                                    var nvalue = $(vMetadata).find(item.FieldName).text();
                                    if (nvalue == '' || nvalue == '0') {
                                        vControls += '<td class="labelleft width60">-</td>';
                                    } else {
                                        vControls += '<td class="labelleft width60">' + nvalue + ' %</td>';
                                    }
                                }
                                else {
                                    var nvalue = $(vMetadata).find(item.FieldName).text();
                                    if (nvalue == '' || nvalue == '0') {
                                        vControls += '<td class="labelleft width60">-</td>';
                                    } else {
                                        vControls += '<td class="labelleft width60">' + nvalue + '</td>';
                                    }
                                }

                                vControls += '</tr>';
                                vMetadataHTML = vMetadataHTML.replace("<" + item.FieldName + ">" + $(vMetadata).find(item.FieldName).text() + "</" + item.FieldName + ">", "");
                                $("#tblSummaryMetadata").append(vControls);
                                if (vCurrency != "") {
                                    if ($.isNumeric($('#' + vCurrency).html())) {
                                        if (vCurrencyDisplayStyle == "UK") {
                                            $('#' + vCurrency).autoNumeric({ vMax: '99999999999999999999.99' });
                                        } else if (vCurrencyDisplayStyle == "CAN") {
                                            $('#' + vCurrency).autoNumeric({ aSep: ' ', aDec: '.', vMax: '99999999999999999999.99' });
                                        } else if (vCurrencyDisplayStyle == "EU") {
                                            $('#' + vCurrency).autoNumeric({ aSep: '.', aDec: ',', vMax: '99999999999999999999.99' });
                                        } else if (vCurrencyDisplayStyle == "IND") {
                                            $('#' + vCurrency).autoNumeric({ dGroup: '2', vMax: '99999999999999999999.99' });
                                        }
                                    }
                                    vCurrency == "";
                                }
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
                            var vAccFeatbusinessarea = $.grep($(vMetadataHTML), function (n, i) {
                                return (n.localName == "businessarea");
                            });
                            for (var i = 0; i < datalenght; i++) {
                                var item = $(vMetadataHTML)[i];
                                var name = item.nodeName;
                                var vCurrency = "";
                                if ((name != "REQUESTTITLE") && (name != "REQUESTTYPE") && (name != "STATUSCHANGEDALERT")) {
                                    var vField = $.grep(vRequestFields, function (person) { return person.FieldName.toUpperCase() == name });
                                    var value = item.textContent;
                                    if (vField.length > 0) {
                                        var vControls = '<tr>';
                                        if (vField[0].FieldDisplayName.trim().toLowerCase().indexOf("related contracts") >= 0) {
                                            vControls += '<td class="f_head width60">Related Contract Record(s)</td>';
                                        }
                                        else {
                                            vControls += '<td class="f_head width90">' + vField[0].FieldDisplayName + '</td>';
                                        }
                                        if (value == '' || value == '0') {
                                            if (vField[0].FieldName == "ContractValue" || item.FieldType == "Currency") {

                                                vControls += '<td class="labelleft width60" style="word-break: break-all;"><label id="td' + vField[0].FieldName + '">' + value + '</label> ' + $("#hdnContractCurrency").text() + '</td>';
                                                vCurrency = 'td' + vField[0].FieldName;
                                            } else {
                                                vControls += '<td class="labelleft width60" style="word-break: break-all;">-</td>';
                                            }
                                        }
                                        else {
                                            if (vField[0].FieldType == "Date") {
                                                var onlydate = "";
                                                onlydate = value.substring(0, value.length - 19);
                                                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                                                { onlydate = moment(new Date(onlydate)).format('MM/DD/YYYY'); }
                                                else { onlydate = moment(new Date(onlydate)).format(localStorage.AppDateFormat); }
                                                vControls += '<td class="labelleft">' + onlydate + '</td>';
                                            }
                                            else if (vField[0].FieldType == "Yes/No") {
                                                if (value == '' || value == '0') {
                                                    vControls += '<td class="labelleft width60">-</td>';
                                                } else {
                                                    vControls += '<td class="labelleft width60">' + value;

                                                    var vCustomcmt = $.grep($(vMetadataHTML), function (n, i) {
                                                        return (n.localName == "customcmd" + vField[0].FieldName.toLowerCase());
                                                    });
                                                    if (vCustomcmt.length > 0) {
                                                        if (vCustomcmt[0].textContent != "" && vCustomcmt[0].textContent != null) {
                                                            vControls += '<br />' + vCustomcmt[0].textContent;
                                                        }
                                                    }
                                                    vControls += '</td>';
                                                }
                                            }
                                            else if (vField[0].FieldType == "Phone Number") {
                                                if (typeof (value) != "undefined" && value != null && value != "") {
                                                    if (typeof (value.split(',')[2]) != "undefined" && value.split(',')[2] != null && value.split(',')[2] != "") {
                                                        vControls += '<td class="labelleft width60"> +' + value.split(',')[2].trim() + '</td>';
                                                    }
                                                    else {
                                                        vControls += '<td class="labelleft width60">-</td>';
                                                    }
                                                }
                                                else {
                                                    vControls += '<td class="labelleft width60">-</td>';
                                                }
                                            }
                                                //Added By Jay
                                            else if (vField[0].FieldType == "Number-P" || vField[0].FieldType == "Number-PD") {
                                                if (value == '' || value == '0') {
                                                    vControls += '<td class="labelleft width60">-</td>';
                                                } else {
                                                    vControls += '<td class="labelleft width60">' + value + ' %</td>';
                                                }
                                            }
                                            else {
                                                if (vField[0].FieldName == "ContractValue" || item.FieldType == "Currency") {
                                                    vControls += '<td class="labelleft width60"><label id="td' + vField[0].FieldName + '">' + value + "</label> " + $("#hdnContractCurrency").text() + '</td>';
                                                    vCurrency = 'td' + vField[0].FieldName;
                                                } else {
                                                    vControls += '<td class="labelleft width60">' + value + '</td>';
                                                }
                                            }
                                        }
                                        vControls += '</tr>';
                                        $("#tblDetailsMetadata").append(vControls);
                                        if (vCurrency != "") {
                                            if ($.isNumeric($('#' + vCurrency).html())) {
                                                if (vCurrencyDisplayStyle == "UK") {
                                                    $('#' + vCurrency).autoNumeric({ vMax: '99999999999999999999.99' });
                                                } else if (vCurrencyDisplayStyle == "CAN") {
                                                    $('#' + vCurrency).autoNumeric({ aSep: ' ', aDec: '.', vMax: '99999999999999999999.99' });
                                                } else if (vCurrencyDisplayStyle == "EU") {
                                                    $('#' + vCurrency).autoNumeric({ aSep: '.', aDec: ',', vMax: '99999999999999999999.99' });
                                                } else if (vCurrencyDisplayStyle == "IND") {
                                                    $('#' + vCurrency).autoNumeric({ dGroup: '2', vMax: '99999999999999999999.99' });
                                                }
                                            }
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

}

var ArrayofContractApprovalWorkflow = [];
function GetRequestActivities(requestid) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/requests/' + requestid + '/activity',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            $("#dvRequestWorkflows").empty();
            ArrayofContractApprovalWorkflow = [];
            var datalenght = data.length;
            $("#lblActivityCount").text(data.length);
            var TaskDetailBind = "";
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                var RowKey = item.RowKey;
                var WorkflowTitle = item.WorkflowTitle;
                var Participants = item.Participants;
                var Status = item.Status;
                var ActivityType = item.ActivityType;
                var imgCorn = '<img src="../Content/Images/act-request.png">';
                var imgCent = '<img src="../Content/Images/act-act-request-icon.png" class="img-responsive">';
                var vWorkflowURL = '<a class="link-head" href="/Activity/TaskDetails?TaskID=&WorkflowID=' + RowKey + '" target="_blank" style="display:inline !important;">' + WorkflowTitle + '</a>';


                if ($("#lblApprovalWorkflow").text() == "In Progress") {
                    if (workflowurltoshow == "") {
                        workflowurltoshow = '/Activity/TaskDetails?TaskID=&WorkflowID=' + RowKey;
                    }
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
                article += '<a class="add-btn close1" href="/Activity/TaskDetails?TaskID=&WorkflowID=' + RowKey + '" target="_blank" style="padding-left:5px !important;"><img src="../Content/Images/view-all.png"></a>';

                article += '<div class="col12 no-pad pad-top">';
                article += '<p class="sub-text-head">Participants : <span class="sub-text">' + Participants + '</span></p>';
                article += '</div>';
                article += '</div>';
                article += '</div>';
                article += '</div>';
                article += '<div class="col2 no-pad text-right pad-top ">';
                article += '<a class="close1" href="javascript:void(0);" onclick="ShowWorkflowDetail(\'' + ActivityType + '\',\'' + RowKey + '\')"><img id="Img_' + RowKey + '" src="../Content/Images/e-open.png" title="Expand"></a>';
                article += '<div class="col12 text-right act-doc-status">';
                if (Status == "Completed") {
                    article += '<a class="label label-grn"><span class="m-off">' + Status + '</span> <span class="m-on"><img src="../Content/Images/wit-completed-icon.png"></span></a>';
                }
                else if (Status == "In Progress") {
                    article += '<a class="label label-org"><span class="m-off">' + Status + '</span> <span class="m-on"><img src="../Content/Images/wit-in-progress-icon.png"></span></a>';
                }
                else if (Status == "Cancelled") {
                    article += '<a class="label label-red"><span class="m-off">' + Status + '</span> <span class="m-on"><img src="../Content/Images/wit-cancel-icon.png"></span></a>';
                }
                else if (Status == "Stopped") {
                    article += '<a class="label label-red"><span class="m-off">' + Status + '</span> <span class="m-on"><img src="../Content/Images/wit-stopl-icon.png"></span></a>';
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
                $("#dvRequestWorkflows").append(article);
            }
        },
        error: function (data) {
            $("#lblActivityCount").text("0");
        }
    });
}

function ShowWorkflowDetail(acttype, wid) {
    var detObj = $("#Det_" + wid);
    if (detObj.children().length == 0) {
        GetWorkflowComments(wid);

    }
    $("#Det_" + wid).slideToggle();
    var imgObj = $("#Img_" + wid);
    if (imgObj.attr("title") == "Collapse") {
        imgObj.attr("title", "Expand");
        imgObj.attr("src", "../Content/Images/e-open.png");
    } else {
        imgObj.attr("title", "Collapse");
        imgObj.attr("src", "../Content/Images/e-close.png");
    }
}

function GetWorkflowComments(wid) {
    $("#Det_" + wid).html('<img src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/comments?workflowid=' + wid,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
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
            $("#Det_" + wid).empty();
            $("#Det_" + wid).append(article);
        },
        error:
            function (data) {

            }
    });
}

function changestatus() {
    $('.ui-button-green-text').parent().attr('disabled', 'disabled');
    var stat = decodeURI($("input:radio[name=rdstatus]:checked").val());
    var vCancelNote = '';
    if (stat == "Cancelled")
    { vCancelNote = "CancelledReason=" + $("#txtCancelledReason").val(); }
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/changerequeststatus?requestid=' + vRequestID + '&status=' + stat,
        type: 'PUT',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
        data: vCancelNote,
        cache: false,
        success: function (result) {
            $('.ui-button-green-text').parent().removeAttr('disabled');
            requestItem.Status = stat;

            $("#spanstatus").html(stat);
            //manoj
            pendingStarted = false;
            //$("#tblDocumentMissing").empty();
            GetRequestPendingAction(true, "BindPeople");
            //manoj
            BindRequestDetails(vRequestID);
        }
    });
}

function MakeTitleEditable() {
    //$("#iStandardIcon").css('display', 'none');
    $("#aTitleEdit").css('display', 'none');
    $("#aTitleCancel").css('display', '');
    $("#aTitleSave").css('display', '');
    //manoj
    $("#tblDescriptionMissing").parent().hide();
    $("#lblRequestDescription").css("display", "");
    //manoj
    lblrequesttitle = $("#lblRequestTitle").text();
    lblrequesttitledescription = $("#lblRequestDescription").text();

    $("#lblRequestTitle").css('display', 'none');
    $("#lblRequestDescription").css('display', 'none');
    $("#txtRequestTitle").val(lblrequesttitle);
    //$("#txtRequestTitle").trigger("input");
    if (lblrequesttitledescription.trim().toLowerCase() == "request description not available")
        $("#txtRequestDescription").val("");
    else
        $("#txtRequestDescription").val(lblrequesttitledescription);
    //$("#txtRequestDescription").trigger("input");
    $("#txtRequestTitle").css('display', '');
    $("#txtRequestDescription").css('display', '');
    $("#txtRequestTitle").focus();

    //$("#lblRequestTitle").css({
    //    "border-color": "#a2a2a2",
    //    "border-width": "1px",
    //    "border-style": "solid",
    //    "background-color": "#ffffff",
    //    //  "max-width": "600px",
    //    "min-height": "27px",
    //}).focus();
    //$("#lblRequestDescription").css({
    //    "border-color": "#a2a2a2",
    //    "border-width": "1px",
    //    "border-style": "solid",
    //    "background-color": "#ffffff",
    //    "margin-top": "5px",
    //    "min-height": "50px",
    //    // "max-width": "600px"
    //});
    //if ($("#lblRequestDescription").hasClass("cntdetails-NA")) {
    //    $("#lblRequestDescription").text('');
    //}
}

function MakeTitleSave() {
    $("#loadingPage").fadeIn();
    var requestID = getParameterByName("RequestID");
    $("#txtRequestTitle").val($("#txtRequestTitle").val().trim());
    $("#txtRequestDescription").val($("#txtRequestDescription").val().trim());
    if (!isContainsTwoAlphabets($("#txtRequestTitle").val())) {

        swal("", "Request title should have a minimum of 2 alphabets.");
        $("#loadingPage").fadeOut();
    }
    else if (CheckRequestTitleExist($("#txtRequestTitle").val())) {
        if (vInRecycleBin) {
            swal("", "A request with title " + $("#txtRequestTitle").val() + " exists in the recycle bin. Please enter a different title.");
        } else {
            swal("", "Request exists with the title " + $("#txtRequestTitle").val() + "");
        }
        $("#loadingPage").fadeOut();
    } else {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/title?requestid=' + requestID,
            type: 'PUT',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            cache: false,
            data: {
                RowKey: requestID,
                RequestTitle: $("#txtRequestTitle").val(),
                Description: $("#txtRequestDescription").val(),
                ModifiedBy: localStorage.UserName
            },
            success: function (data) {
                var applychange = false;
                //$("#iStandardIcon").css('display', '');
                $("#aTitleEdit").css('display', '');
                $("#aTitleCancel").css('display', 'none');
                $("#aTitleSave").css('display', 'none');
                requestItem.Description = $("#txtRequestDescription").val()
                requestItem.RequestTitle = $("#txtRequestTitle").val();
                //$("#lblRequestTitle").attr('contentEditable', false);
                //$("#lblRequestDescription").attr('contentEditable', false);
                $("#lblRequestTitle").css('display', '');
                $("#lblRequestDescription").css('display', '');
                $("#txtRequestTitle").css('display', 'none');
                $("#txtRequestDescription").css('display', 'none');
                $("#lblRequestTitle").text(requestItem.RequestTitle);
                if (requestItem.Description == "") {
                    $("#lblRequestDescription").text("");
                    //$("#lblRequestDescription").addClass('cntdetails-NA');
                    $("#tblDescriptionMissing").parent().show();
                    //manoj
                    if ($("#idNewStatus").text().trim() != "Cancelled" && $("#idNewStatus").text().trim() != "Completed") {
                        //$("#tblDescriptionMissing").html("<tr><td class='f_head'><label title='Missing Request Description.'>Missing Request Description.</label></td></tr>");
                        $("#tblDescriptionMissing").html("<tr><td class='f_head'><a href='javascript:void(0);' data-title='Missing Request Description.'><img src='/Content/Images/missing-exc.png' style='cursor: default !important;'/></a></td></tr>");
                        $("#tblDescriptionMissing").parent().show();
                        $("#lblRequestDescription").css("display", "none");
                        applychange = true;
                    }
                    //manoj
                }
                else {
                    $("#lblRequestDescription").text(requestItem.Description);
                    $("#lblRequestDescription").removeClass('cntdetails-NA');
                    $("#lblRequestDescription").css('display', '');
                    $("#tblDescriptionMissing").parent().hide();
                }

                $("#lblRequestTitle").css({
                    "border": "",
                    "background-color": "",
                    "min-height": "0px",
                }).focus();
                $("#lblRequestDescription").css({
                    "border": "",
                    "background-color": "",
                    "margin-top": "0px",
                    "min-height": "0px"
                });
                if (applychange) {
                    $("#lblRequestDescription").css("display", "none");
                }
                $("#loadingPage").fadeOut();
            },
            error: function () {
                $("#loadingPage").fadeOut();
            }
        });
    }

}

function MakeTitleCancel() {
    // $("#iStandardIcon").css('display', '');
    var applychange = false;
    $("#aTitleEdit").css('display', '');
    $("#aTitleCancel").css('display', 'none');
    $("#aTitleSave").css('display', 'none');
    $("#lblRequestTitle").text(requestItem.RequestTitle);
    if (requestItem.Description == "") {
        //$("#lblRequestDescription").text("Request description not available");
        $("#lblRequestDescription").addClass('cntdetails-NA');
        $("#tblDescriptionMissing").parent().show();
        applyDescription = false;
        //manoj
        if ($("#idNewStatus").text().trim() != "Cancelled" && $("#idNewStatus").text().trim() != "Completed") {
            $("#tblDescriptionMissing").parent().show();
            $("#lblRequestDescription").css("display", "none");
            applychange = true;
        }
        //manoj
    }
    else {
        $("#lblRequestDescription").text(requestItem.Description);
        $("#lblRequestDescription").removeClass('cntdetails-NA');
    }

    //$("#lblRequestTitle").attr('contentEditable', false);
    //$("#lblRequestDescription").attr('contentEditable', false);

    $("#lblRequestTitle").css('display', '');
    $("#lblRequestDescription").css('display', '');
    $("#txtRequestTitle").css('display', 'none');
    $("#txtRequestDescription").css('display', 'none');

    $("#lblRequestTitle").css({
        "border": "",
        "background-color": "",
        "min-height": "0px",
    }).focus();
    $("#lblRequestDescription").css({
        "border": "",
        "background-color": "",
        "margin-top": "0px",
        "min-height": "0px"
    });
    if (applychange) {
        $("#lblRequestDescription").css("display", "none");
    }
}

var overwritedocument = false;

function modalOnOpenDocument(dialog) {
    $('.ui-button-green-text').parent().attr('disabled', 'disabled');
    var DocumentID = $("#txtDocumentID").val();
    if (DocumentID != "") {
        if (requiredValidator("EditDocument")) {
            var vTitle = $("#txtDocumentName").val().trim() + "." + $("#spExt").text().trim();
            if (CheckDocumentNameExistForEdit('/requestdocuments/', vTitle, DocumentID)) {

                swal("", "Document already exists with the same name " + vTitle + "");
            }
            else {
                var formData = new FormData();
                var opmlFile = $('#docContract')[0];
                var vDocumentType = "";

                formData.append("opmlFile", opmlFile.files[0]);
                formData.append("AccountID", localStorage.AccountID);
                formData.append("DocumentID", DocumentID);
                formData.append("RequestID", vRequestID);
                formData.append("Description", $("#txtDocumentDescriptionEdit").val());

                formData.append("RequestTitle", $("#lblCTitleDoc").text());
                formData.append("DocumentName", $("#txtDocumentName").val());
                if ($("#ddlDocumentType").val() != "0") {
                    vDocumentType = $("#ddlDocumentType").val();
                }
                formData.append("DocumentType", vDocumentType);
                formData.append("ModifiedBy", localStorage.UserName);
                formData.append("DocumentExt", $("#spExt").html());

                pendingStarted = false;
                //$("#tblDocumentMissing").empty();
                GetRequestPendingAction(false, "BindPeople");
                $("#inprocessDocumentMetadata").css('visibility', 'visible');
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/documents/updaterequestdocument',
                    type: 'POST',
                    data: formData,
                    cache: false,
                    contentType: false,
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken },
                    processData: false,
                    success: function (document) {
                        $('.ui-button-green-text').parent().removeAttr('disabled');

                        $("#EditDocument").dialog("close");
                        BindDocument();

                        //Send Edit Request Notifications
                        var formDataNotify = new FormData();
                        formDataNotify.append("AccountID", localStorage.AccountID);
                        formDataNotify.append("RequestID", vRequestID);
                        formDataNotify.append("DocumentName", $("#txtDocumentName").val());
                        formDataNotify.append("ModifiedBy", localStorage.UserName);
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/DocumentUploadNotification?SingleOrMultiple=Single',
                            type: 'POST',
                            data: formDataNotify,
                            cache: false,
                            contentType: false,
                            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                            processData: false,
                            success: function (data) {

                            },
                            error: function (data) {
                            }
                        });

                    },
                    complete: function () {
                        $("#inprocessDocumentMetadata").css('visibility', 'hidden');
                    }

                });

            }
        }
        autoscroll();
        $("#addEditDocument").animate({
            scrollTop: $(".error").offset().top
        }, 2000);

        $("#addEditDocument").animate({
            scrollTop: $("#errormsg_docContract").offset().top
        }, 2000);


    }

    else {
        if (requiredValidator('addNewDocument')) {
            $("#loadingPage").fadeIn();
            var filename = "";
            if ($("#trTemplate").css('display') == 'none') {
                var opmlFile = $('#docContract')[0];
                filename = opmlFile.files[0].name;
            }
            else {
                filename = $('#txtDocumentNameCreate').val() + ".docx";
            }
            if (CheckDocumentExist('/requestdocuments/', filename)) {
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

             $("#addEditDocument").dialog("close");
             newDocument(DocumentID);

         }
         else {
             $('.ui-button-green-text').parent().removeAttr('disabled');
             $("#loadingPage").fadeOut();
             $("#uploaddocumentprocess").css('display', 'none');
         }
         return;
     });
            }
            else {
                $("#addEditDocument").dialog("close");
                newDocument(DocumentID);
            }
        } else {

            autoscroll();
            $("#addEditDocument").animate({
                scrollTop: $(".error").offset().top
            }, 2000);


            $('.ui-button-green-text').parent().removeAttr('disabled');
            $("#loadingPage").fadeOut();
            $("#uploaddocumentprocess").css('display', 'none');
        }
    }

}

function ShowRequestMoreDocuments() {
    $('.ShowRequestMoreDocuments').css("display", "");
    $('#ShowRequestMoreDocuments').css("display", "none");
    $('#ShowRequestLessDocuments').css("display", "");
}

function ShowRequestLessDocuments() {
    $('.ShowRequestMoreDocuments').css("display", "none");
    $('#ShowRequestMoreDocuments').css("display", "");
    $('#ShowRequestLessDocuments').css("display", "none");
}

function ShowMoreComments() {
    $('.ShowMoreComments').css("display", "");
    $('#ShowMoreComments').css("display", "none");
    $('#ShowLessComments').css("display", "");
}

function ShowLessComments() {
    $('.ShowMoreComments').css("display", "none");
    $('#ShowMoreComments').css("display", "");
    $('#ShowLessComments').css("display", "none");
}

function togglediv(firstObject, secondObject, imgObject) {
    $("#" + firstObject).slideToggle();
    $("#" + secondObject).slideToggle();

    var imgObj = $("#" + imgObject);

    if (imgObj.attr("title") == "Collapse") {
        imgObj.attr("title", "Expand");
        imgObj.attr("src", "../Content/Images/e-open.png");
    } else {
        imgObj.attr("title", "Collapse");
        imgObj.attr("src", "../Content/Images/e-close.png");
    }
}

function newDocument(DocumentID) {
    var tblContentControls = null;
    var formData = new FormData();
    var opmlFile = $('#docContract')[0];
    var vDocumentType = "";

    if (opmlFile.files.length > 0) {
        formData.append("opmlFile", opmlFile.files[0]);
    }

    if (overwritedocument) { //if overwrite is yes
        formData.append("OverWrite", "Yes");
    }

    formData.append("AccountID", localStorage.AccountID);
    formData.append("DocumentID", DocumentID);
    formData.append("Description", $("#txtDescriptionDoc").val());
    formData.append("RequestID", vRequestID);
    //eO39894
    if ($("#ddlDocumentTypeCreate").val() == "0") {
        vDocumentType = "Not Available";
    }
    else {
        vDocumentType = $("#ddlDocumentTypeCreate").val();
    }
    formData.append("DocumentType", vDocumentType);
    //formData.append("Counterparty", $("#lblCounterparty").text());
    //tblContentControls = $("#formtblContentControls").serializeArray();

    if ($("#trTemplate").css('display') == 'none') {
        var filename = opmlFile.files[0].name;
        filename = filename.substr(0, filename.lastIndexOf("."));
        formData.append("DocumentName", filename);
    }
    else {
        formData.append("TemplateName", $("#ddlDocumentTemplate").find('option:selected').text());
        formData.append("DocumentName", $("#txtDocumentNameCreate").val());
        tblContentControls = $("#formtblContentControls *").serializeArray();
    }

    formData.append("CreatedBy", localStorage.UserName);
    formData.append("ModifiedBy", localStorage.UserName);
    if (tblContentControls != null) {
        var tblContentControlslength = tblContentControls.length;
        for (var i = 0; i < tblContentControlslength; i++)
            formData.append(tblContentControls[i].name, tblContentControls[i].value);

        $("#formtblContentControls .fieldphonecontrol").each(function (index) {
            if ($(this).val() != null && $(this).val() != "") {
                var name = $(this)[0].id;
                var value = $(this).intlTelInput("getSelectedCountryData").iso2 + "," + $(this).intlTelInput("getSelectedCountryData").dialCode + "," +($(this).intlTelInput("getNumber", intlTelInputUtils.numberFormat.INTERNATIONAL).indexOf('+') == 0 ? (" "+$(this).intlTelInput("getNumber", intlTelInputUtils.numberFormat.INTERNATIONAL).substring(1)): $(this).intlTelInput("getNumber", intlTelInputUtils.numberFormat.INTERNATIONAL));
                formData.append(name, value);
            }
            else {
                var name = $(this)[0].id;
                var value = "";
                formData.append(name, value);
            }
        });

        formData.append("HasContent", true);
    }

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/documents',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken },
        processData: false,
        async: true,
        success: function (data) {
            rcFromDocument = false;
            //AddContract();
            if ($("#trTemplate").css('display') == 'none') {
                $("#uploaddocumentprocess").css('display', 'none');
                $('.ui-button-green-text').parent().removeAttr('disabled');
                BindDocument();
                pendingStarted = false;
                //$("#tblDocumentMissing").empty();
                GetRequestPendingAction(true, "BindPeople");
                $('.ui-button-green-text').parent().removeAttr('disabled');
                $("#addEditDocument").dialog("close");
                $("#ddlDocumentTypeCreate").val("0");
                //$("#ddlDocumentTypeCreate").find('option[value="Primary Agreement"]').prop("selected", true);
                $("#ddlDocumentTemplate").val("0");
                $("#txtDocumentNameCreate").val("");
                $("#txtDescriptionDoc").val("");

                //Sridhar
                //Send Edit Request Notifications
                var formDataNotify = new FormData();
                formDataNotify.append("AccountID", localStorage.AccountID);
                formDataNotify.append("RequestID", vRequestID);
                if ($("#trTemplate").css('display') == 'none') {
                    var filename = opmlFile.files[0].name;
                    filename = filename.substr(0, filename.lastIndexOf("."));
                    formDataNotify.append("DocumentName", filename);
                }
                else {
                    formDataNotify.append("DocumentName", $("#txtDocumentNameCreate").val());
                }
                formDataNotify.append("ModifiedBy", localStorage.UserName);
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/DocumentUploadNotification?SingleOrMultiple=Single',
                    type: 'POST',
                    data: formDataNotify,
                    cache: false,
                    contentType: false,
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                    processData: false,
                    success: function (data) {

                    },
                    error: function (data) {
                    }
                });
            } else {
                setTimeout(funcMessageAfterDocGeneration, 10000);
            }
        }
    });
}

function funcMessageAfterDocGeneration() {
    $("#uploaddocumentprocess").css('display', 'none');
    $('.ui-button-green-text').parent().removeAttr('disabled');
    BindDocument();
    $('.ui-button-green-text').parent().removeAttr('disabled');
    $("#addEditDocument").dialog("close");
    $("#ddlDocumentTypeCreate").val("0");
    //$("#ddlDocumentTypeCreate").find('option[value="Primary Agreement"]').prop("selected", true);
    $("#ddlDocumentTemplate").val("0");
    $("#txtDocumentNameCreate").val("");
    $("#txtDescriptionDoc").val("");
}

function saveRequestComments() {
    $('.ui-button-green-text').parent().attr('disabled', 'disabled');
    var CommentID = $("#txtCommentID").val()

    if (CommentID != "") {
        //*Harshitha 

        var nicInstance = nicEditors.findEditor('txtNotes');
        var vTitle = CleanWordFormatFromHTML(nicInstance.getContent());
        if (vTitle.length <= 26500) {
            vTitle = $.trim(vTitle);
            vTitle = $('<div/>').text(vTitle).html();

            var requestCommentForm = "RequestComments=" + vTitle;
            requestCommentForm += "&RequestID=" + vRequestID;
            requestCommentForm += "&AccountID=" + localStorage.AccountID;
            requestCommentForm += "&ModifiedBy=" + localStorage.UserName;

            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/notes?commentid=' + CommentID,
                type: 'PUT',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                data: requestCommentForm,
                cache: false,
                success: function (data) {

                    BindComments(vRequestID);

                },
                error: function (person) {
                    $("#loadingPage").fadeOut();
                }
            });
        }
        else {
            $("#loadingPage").fadeOut();
            swal("", "Note can not exceed 26500 characters");
        }

    }
    else {
        if (requiredValidator('addNewComment')) {
            $("#loadingPage").fadeIn();
            //*Harshitha 

            var nicInstance = nicEditors.findEditor('txtNotes');
            var vTitle = CleanWordFormatFromHTML(nicInstance.getContent());
            if (vTitle.length <= 26500) {
                vTitle = $.trim(vTitle);
                vTitle = $('<div/>').text(vTitle).html();
                //

                var requestCommentForm = "RequestComments=" + vTitle;
                requestCommentForm += "&RequestID=" + vRequestID;
                requestCommentForm += "&AccountID=" + localStorage.AccountID;
                requestCommentForm += "&CreatedBy=" + localStorage.UserName;
                requestCommentForm += "&ModifiedBy=" + localStorage.UserName;


                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/notes?requestid=' + vRequestID,
                    type: 'POST',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                    data: requestCommentForm,
                    cache: false,
                    success: function (data) {

                        $("#loadingPage").fadeOut();
                        $("#addEditRequestComments").dialog("close");

                        BindComments(vRequestID);
                    },
                    error: function (person) {
                        $("#loadingPage").fadeOut();
                        $("#addEditRequestComments").dialog("close");
                    }
                });

            }
            else {
                $("#loadingPage").fadeOut();
                swal("", "Note can not exceed 26500 characters");
            }


        } else {
            $('.ui-button-green-text').parent().removeAttr('disabled');
            $("#uploaddocumentprocess").css('display', 'none');
        }
    }
}

function BindDocument(requestid) {
    if ($('#ShowRequestMoreDocuments').length) {
        $('#ShowRequestMoreDocuments').css("display", "none");
    }
    if ($('#ShowRequestLessDocuments').length)
        $('#ShowRequestLessDocuments').css("display", "none");
    if (requestid == null || requestid == "") { requestid = vRequestID; }
    var vGetTime = new Date();
    $("#ulDocument").empty();
    DocumentCount = 0;
    try {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/documents?requestid=' + requestid,
            type: 'GET',
            cache: false,
            contentType: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            processData: false,
            success: function (data) {
                $("#loadingPage").fadeOut();
                var count = 0;
                var vPermission = $("#hdnPermission").val();

                var settings = {
                    pattern: /\.[0-9a-z]+$/i,
                    knownFileTypes: ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'zip', 'rar', 'gzip', 'arj', 'wav', 'mp3', 'aif', 'aiff', 'm4a', 'ogg', 'wma', 'psd', 'ai', 'swf', 'fla', 'css', 'js', 'avi', 'mov', 'wmv', 'dotx'],
                    WopiFrameFileTypes: ['doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx', 'dotx']
                };

                var datalenght = data.length;
                if (datalenght > 0) {


                    for (var i = 0; i < datalenght; i++) {
                        var item = data[i];
                        count++
                        var vClass = "openmenuDocument";
                        var vv = moment(new Date(item.Modified));
                        var vTime = vv.fromNow();
                        vTime = vv.from(vGetTime);

                        var vURL = encodeURIComponent(item.DocumentUrl);
                        var ext = vURL.match(settings.pattern);
                        var vFileType = '<dd class="file-icon none"></dd>';
                        if (ext != null) {
                            if (ext.length > 0) { ext = ext[0].slice(1); }
                            if (jQuery.inArray(ext, settings.knownFileTypes) > -1) {
                                vFileType = '<dd class="file-icon ' + ext + '"></dd>';
                            }
                            if (ext == 'zip')
                                vClass = "openmenuZippedDocument"
                        }

                        var article = '';
                        if (count <= 5)
                            article = '<li>';
                        else
                            article = '<li class="ShowRequestMoreDocuments" style="display:none;">';

                        var vDocName = item.DocumentUrl.split('/')[4];

                        if (typeof vDocName === 'undefined') {
                        } else {
                            vDocName = vDocName.split('.')[vDocName.split('.').length - 1];
                        }
                        article += '<label id="DocumentID" style="display:none;">' + item.RowKey + '</label>';
                        article += '<label id="URL" style="display:none;">' + vURL + '</label>';
                        article += '<label id="DocumentName" style="display:none;">' + item.DocumentName + '</label>';

                        if (typeof vDocName === 'undefined') {
                            article += vFileType + '<a data-value="' + vURL + '" href="javascript:void(0);"  onclick="ViewDocument(this)">' + item.DocumentName + '</a>';
                        } else {
                            article += vFileType + '<a data-value="' + vURL + '" href="javascript:void(0);"  onclick="ViewDocument(this)">' + item.DocumentName + "." + vDocName + '</a>';
                        }

                        article += '<span class="sub-text"> ' + vTime + '</span>';
                        article += '';
                        article += '';
                        article += '&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="' + vClass + '" />';
                        article += '</li>';
                        DocumentCount++
                        $("#ulDocument").append(article);
                    }
                }
                else {
                    $("#ulDocument").append('No items found.');
                }

                if (count > 5) {
                    var more = count - 5;
                    $("#dvDocument").html('<a id="ShowRequestMoreDocuments" href="javascript:void(0);" class="pad-all close1" onclick="ShowRequestMoreDocuments()">' + more + ' More Documents </a>' +
                                          '<a id="ShowRequestLessDocuments" href="javascript:void(0);" class="pad-all close1" onclick="ShowRequestLessDocuments()" style="display:none;">Show less </a>');
                }
                else {
                    if ($('#ShowRequestMoreDocuments').length)
                        $('#ShowRequestMoreDocuments').css("display", "none");
                    if ($('#ShowRequestLessDocuments').length)
                        $('#ShowRequestLessDocuments').css("display", "none");
                }

                $("#lblDocumentsCount").text(count);

                if (!$("#lblDocumentsCount").text().trim()) {
                    $("#ulDocument").append('No items found.');
                }

                $(".openmenuDocument").contextMenu({ menu: "dropdownMenuDocument", leftButton: true }, function (action, el, pos) { contextMenuDocument(action, el.parent("li"), pos); });
                $(".openmenuZippedDocument").contextMenu({ menu: "dropdownMenuZippedDocument", leftButton: true }, function (action, el, pos) { contextMenuDocument(action, el.parent("li"), pos); });

            },
            error: function (request) {
                $("#loadingPage").fadeOut();
                $("#lblDocumentsCount").text('0');
                $("#ulDocument").append('No items found.');
            }, complete: function (request) {
                pendingStarted = false;
                //$("#tblDocumentMissing").empty();
                GetRequestPendingAction(false);
            }

        });
    } catch (e) {

    }
}
$(window).on('load', function () {

    $('.nicEdit-panelContain').parent().width('100%');
    $('.nicEdit-panelContain').parent().next().width('100%');
    $('.nicEdit-main').width("99%");
});
function ViewDocument(docurl) {
    var openinbrowser = true;
    if (docurl != '') {
        if (typeof docurl === "string") {
            docurl = decodeURIComponent(docurl);
        }
        else {
            docurl = decodeURIComponent($(docurl).attr('data-value'));
        }
        //if (typeof docurl != "string") {
        //    docurl = $(docurl).attr('data-value');
        //}
        var srcurl = docurl;// "https://docs.google.com/viewer?url=" + vDocumentURL + "&embedded=true";
        if (docurl.indexOf(".doc") >= 0 || docurl.indexOf(".ppt") >= 0 || docurl.indexOf(".xls") >= 0 || docurl.indexOf(".dotx") >= 0) {
            //maoj

            if (!Checkbrowsernameandversion()) {
                location = docurl;
                openinbrowser = false;
            } else {
                srcurl = "https://view.officeapps.live.com/op/embed.aspx?src=" + docurl + "?" + randomString() + "=" + randomString() + "&wdStartOn=1";
            }
            //manoj
        }
        if (docurl.indexOf(".pdf") >= 0) {
            window.open("http://docs.google.com/gview?url=" + srcurl + "?" + randomString() + "=" + randomString(), '_blank');
        } else {
            if (openinbrowser) {
                window.open(srcurl);
            }
        }
    }
}
function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
$('#btnNewNotes').click(function () {
    $(".validelement").each(function (index, element) {

        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });
    $(".validNicEdit").each(function (index, element) {

        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });

    $("#txtNoteID").val("");
    var vActiveParticipants = requestItem.AssignedTo + ";" + requestItem.RequestCollaborators + ";" + requestItem.Requestor;
    //*Harshitha
    var regexp = new RegExp(escapeRegExp(localStorage.UserName), 'g');
    vActiveParticipants = vActiveParticipants.replace(regexp, '');

    $("#ddlSendTo option").removeClass('hideUserlocal');
    //$("#ddlSendTo option[value='" + localStorage.UserName + "']").addClass('hideUserlocal');
    $("#ddlSendTo option").each(function (index, element) {
        if (element.value == localStorage.UserName) {
            $(element).addClass('hideUserlocal');
        }
    });

    //*Harshitha
    var nicInstance = nicEditors.findEditor('txtNotes');
    nicInstance.setContent('');
    NicEditorPasteEvent();

    GetValuesAndAutoPopulate("ddlSendTo", vActiveParticipants);

    $("#dvAddNotes").dialog("option", "title", "Add a Note");
    $("#dvAddNotes").dialog("open");
});

function GetNoteDetail(noteid) {
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/requests/notes?noteid=' + noteid,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            $("#txtNoteID").val(data.RowKey);
            $("#txtNoteID").val(data.RowKey);
            //*Harshitha
            var nicInstance = nicEditors.findEditor('txtNotes');
            nicInstance.setContent(data.Note);
            NicEditorPasteEvent();

            GetValuesAndAutoPopulate("ddlSendTo", data.SendTo);

            $("#loadingPage").fadeOut();
            $("#dvAddNotes").dialog("option", "title", "Edit a Note");
            $("#dvAddNotes").dialog("open");
        },
        error: function (request) {
            $("#loadingPage").fadeOut();
        }
    });
}

function DeleteNote(noteid) {
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
             $("#loadingPage").fadeIn();
             $.ajax({
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/requests/notes?noteid=' + noteid,
                 type: 'DELETE',
                 dataType: 'json',
                 headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName, requestID: vRequestID },
                 cache: false,
                 success: function (data) {
                     $("#loadingPage").fadeOut();
                     BindNotes(vRequestID);
                 },
                 error: function (request) {
                     $("#loadingPage").fadeOut();
                 }
             });
         }
         return;
     });

}

function AddNotes() {
    if (requiredValidator('dvAddNotes')) {
        var nicInstance = nicEditors.findEditor('txtNotes');
        var vAlertText = CleanWordFormatFromHTML(nicInstance.getContent());
        if (vAlertText.length <= 26500) {
            $("#loadingPage").fadeIn();
            var globalConOwners = getGlobalContractOwners();
            var toRemove = (requestItem.AssignedTo + ";" + requestItem.Approvers + ";" + requestItem.ProjectManager + ";" + requestItem.RequestCollaborators + ";" + requestItem.ContractAreaAdministrators + ";" + requestItem.BusinessAreaOwners + ";" + globalConOwners).split(';');
            toRemove = $.map(toRemove, $.trim);
            var myArray = $('#ddlSendTo').val();
            if (myArray == null)
                myArray = [];
            myArray = myArray.filter(function (el) {
                return toRemove.indexOf(el) < 0;
            });
            var vAllowToAdd = true;
            if (myArray.length > 0) {
                swal({
                    title: '',
                    text: "'" + myArray.join(', ') + "'  does not have access to this request. If user(s) are notified/added to a note, they will be provided access to the request with collaborator permission.",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
         function (confirmed) {
             if (confirmed) {
                 var vUrl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/requests/' + vRequestID + '/notes';
                 var vType = 'POST';
                 if ($("#txtNoteID").val() != "") {
                     vUrl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/requests/' + vRequestID + '/notes?noteid=' + $("#txtNoteID").val();
                     vType = 'PUT';
                 }
                 var sendTo = '';
                 $('#ddlSendTo_chosen').find('.chosen-choices li').find('span').each(function () {
                     if (sendTo == '') {
                         sendTo = $(this).text();
                     }
                     else {
                         sendTo += "; " + $(this).text();
                     }
                 });
                 //*Harshitha

                 vAlertText = $.trim(vAlertText);
                 vAlertText = $('<div/>').text(vAlertText).html();
                 //
                 vRequestID = getParameterByName("RequestID");
                 $.ajax({
                     url: vUrl,
                     type: vType,
                     dataType: 'json',
                     headers: { 'eContracts-ApiKey': localStorage.APIKey },
                     data: {
                         RequestID: vRequestID,
                         Note: vAlertText,
                         SendTo: sendTo,
                         CreatedBy: localStorage.UserName
                     },
                     cache: false,
                     success: function (person) {
                         BindNotes(vRequestID);
                         if (myArray.length > 0) {
                             var app = requestItem.RequestCollaborators;
                             if (app == '')
                                 app = myArray.join('; ');
                             else
                                 app += "; " + myArray.join('; ');
                             $("#licollaborators").text(app);
                             var usersarr = [];
                             usersarr = app.split(";");
                             var reslength = usersarr.length;
                             var vUsers = '';
                             var userTitle = '';
                             var userDisable = '';
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

                             $("#spCollaborators").html(vUsers);
                             requestItem.RequestCollaborators = app;
                             $.ajax({
                                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/requests/' + vRequestID + '/people',
                                 type: 'PUT',
                                 dataType: 'json',
                                 headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                                 data: {
                                     RequestCollaborators: app,
                                     AssignedTo: requestItem.AssignedTo,
                                     ModifiedBy: localStorage.UserName,
                                     Approvers: requestItem.Approvers,
                                     Requestor: requestItem.Requestor
                                 },
                                 cache: false,
                                 success: function (person) {
                                 }
                             });
                         }
                         $("#dvAddNotes").dialog("close");
                     },
                     complete: function () {
                         $("#loadingPage").fadeOut();
                     }
                 });
             }
             else {
                 $("#loadingPage").fadeOut();
             }
             return;
         });

            }
            else {
                if (vAllowToAdd) {
                    var vUrl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/requests/' + vRequestID + '/notes';
                    var vType = 'POST';
                    if ($("#txtNoteID").val() != "") {
                        vUrl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/requests/' + vRequestID + '/notes?noteid=' + $("#txtNoteID").val();
                        vType = 'PUT';
                    }
                    var sendTo = '';
                    $('#ddlSendTo_chosen').find('.chosen-choices li').find('span').each(function () {
                        if (sendTo == '') {
                            sendTo = $(this).text();
                        }
                        else {
                            sendTo += "; " + $(this).text();
                        }
                    });
                    //*Harshitha
                    var nicInstance = nicEditors.findEditor('txtNotes');
                    var vAlertText = CleanWordFormatFromHTML(nicInstance.getContent());
                    if (vAlertText.length <= 26500) {
                        vAlertText = $.trim(vAlertText);
                        vAlertText = $('<div/>').text(vAlertText).html();
                        //
                        vRequestID = getParameterByName("RequestID");
                        $.ajax({
                            url: vUrl,
                            type: vType,
                            dataType: 'json',
                            headers: { 'eContracts-ApiKey': localStorage.APIKey },
                            data: {
                                RequestID: vRequestID,
                                Note: vAlertText,
                                SendTo: sendTo,
                                CreatedBy: localStorage.UserName
                            },
                            cache: false,
                            success: function (person) {
                                BindNotes(vRequestID);
                                if (myArray.length > 0) {
                                    var app = requestItem.RequestCollaborators;
                                    if (app == '')
                                        app = myArray.join('; ');
                                    else
                                        app += "; " + myArray.join('; ');
                                    $("#licollaborators").text(app);
                                    var usersarr = [];
                                    usersarr = app.split(";");
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
                                    $("#spCollaborators").html(vUsers);
                                    requestItem.RequestCollaborators = app;
                                    $.ajax({
                                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/requests/' + vRequestID + '/people',
                                        type: 'PUT',
                                        dataType: 'json',
                                        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                                        data: {
                                            RequestCollaborators: app,
                                            AssignedTo: requestItem.AssignedTo,
                                            ModifiedBy: localStorage.UserName,
                                            Approvers: requestItem.Approvers,
                                            Requestor: requestItem.Requestor
                                        },
                                        cache: false,
                                        success: function (person) {
                                        }
                                    });
                                }
                                $("#dvAddNotes").dialog("close");
                            },
                            complete: function () {
                                $("#loadingPage").fadeOut();
                            }
                        });
                    }
                    else {
                        $("#loadingPage").fadeOut();
                        swal("", "Note can not exceed 26500 characters");
                    }
                } else {
                    $("#loadingPage").fadeOut();
                }
            }
        }
        else {
            swal("", "Note can not exceed 26500 characters");
        }
    }

}

function BindNotes(requestid) {
    if (requestid == null || requestid == "") { requestid = vRequestID; }
    $("#ulNotesBody").empty();
    $("#dvNotes").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/requests/' + requestid + '/notes',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            var count = 0;
            var datalenght = data.length;
            if (datalenght > 0) {
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];
                    count++;

                    var vTimedesc = '';
                    if (item.Created != null && item.Created != "") {
                        var vTime = moment(new Date(item.Created)).format('MMMM Do YYYY');
                        var vTimeExact = moment(new Date(item.Created)).format('h:mma');
                        vTimedesc = ' on ' + vTime + ' at ' + vTimeExact;
                    }

                    var article = '';
                    if (count <= 5)
                        article = '<li>';
                    else
                        article = '<li class="ShowMoreNotes" style="display:none;">';

                    article += '<span style="display: block;clear: both;margin:15px 0px;" class="color_dark width100">' + item.Note + '</span>';
                    article += '<span class="color_lightgrey" style="margin:15px 0px;" >Posted by ' + item.CreatedBy + vTimedesc;

                    if (requestItem.Status == "Cancelled" || requestItem.Status == "Completed") {
                        article += '<span style="display:none;"><img src="../Content/Images/edit-quick.png" title="Edit" class="margin-left-5" onclick="GetNoteDetail(\'' + item.RowKey + '\')" /><img src="../Content/Images/close-quick.png" title="Delete" class="margin-left-5" onclick="DeleteNote(\'' + item.RowKey + '\')" /></span>';
                    }
                    else {
                        if (item.CreatedBy == localStorage.UserName)
                            article += '<img src="../Content/Images/edit-quick.png" title="Edit" class="margin-left-5" onclick="GetNoteDetail(\'' + item.RowKey + '\')" /><img src="../Content/Images/close-quick.png" title="Delete" class="margin-left-5" onclick="DeleteNote(\'' + item.RowKey + '\')" />';
                    }
                    article += '</span>';
                    article += '<span><small class="color_lightgrey">&nbsp;</small></span>';
                    article += '</li>';
                    $("#ulNotesBody").append(article);
                }
            }
            else {
                $("#ulNotesBody").append('<ul class="ul-data">No items found.</ul>');
            }

            if (count > 5) {
                var more = count - 5;
                $("#dvNotes").html('<a id="ShowMoreNotes" href="javascript:void(0);" class="pad-all close1" onclick="ShowMoreNotes()">' + more + ' More Notes </a>' +
                                      '<a id="ShowLessNotes" href="javascript:void(0);" class="pad-all close1" onclick="ShowLessNotes()" style="display:none;">Hide Notes </a>');
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


function ShowMoreNotes() {
    $('.ShowMoreNotes').css("display", "");
    $('#ShowMoreNotes').css("display", "none");
    $('#ShowLessNotes').css("display", "");
}

function ShowLessNotes() {
    $('.ShowMoreNotes').css("display", "none");
    $('#ShowMoreNotes').css("display", "");
    $('#ShowLessNotes').css("display", "none");
}

function contextMenuRequestSettings(action, el, pos) {
    switch (action) {
        case "edit":
            {
                location = "/Pipeline/EditRequest?RequestID=" + getParameterByName("RequestID") + "&RequestType=" + encodeURIComponent($("#lblRequestType").text());

                break;
            }
        case "standard":
            {
                swal({
                    title: '',
                    text: "Are you sure you want to <span style=\"font-weight:700\">mark</span> this as standard contract?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
     function (confirmed) {
         if (confirmed) {
             $("#loadingPage").fadeIn();
             var contractID = getParameterByName("ContractID");
             $.ajax({
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + contractID + '&isstandard=Yes&username=' + localStorage.UserName,
                 type: 'PUT',
                 dataType: 'json',
                 headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                 cache: false,
                 success: function (data) {
                     swal("", "Contract marked as standard.");
                     //$("#iStandardCont").css('display', '');
                     //$("#iNonStandardCont").css('display', 'none');

                     $("#liContractStandard").css('display', 'none');
                     $("#liContractNonStandard").css('display', '');
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
        case "nonstandard":
            {
                swal({
                    title: '',
                    text: "Are you sure you want to <span style=\"font-weight:700\">mark</span> this as <span style=\"font-weight:700\">Non-Standard</span> contract?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
     function (confirmed) {
         if (confirmed) {
             $("#loadingPage").fadeIn();
             var contractID = getParameterByName("ContractID");
             $.ajax({
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + contractID + '&isstandard=No&username=' + localStorage.UserName,
                 type: 'PUT',
                 dataType: 'json',
                 headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                 cache: false,
                 success: function (data) {

                     swal("", "Contract marked as non-standard.");
                     //$("#iStandardCont").css('display', 'none');
                     // $("#iNonStandardCont").css('display', '');

                     $("#liContractStandard").css('display', '');
                     $("#liContractNonStandard").css('display', 'none');
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
        case "view":
            {
                if ($('#tblDetailsMetadata tr').length == 0) {
                    BindMetaData(requestItem);
                }
                else {
                    $('#dialogSummary').dialog('open');
                }
                break;
            }
        case "history":
            {
                if ($('#contractLogs tr').length == 0) {
                    CreateRequestActivityList();
                }
                else {
                    $('#contractLogsPopup').dialog('open');
                }
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
             location = "/Contracts/EditContract?ContractID=" + getParameterByName("ContractID") + "&ContractType=" + $("#lblContractType").text() + "&Duplicate=Yes";
         }
         return;
     });

                break;
            }
        case "approve":
            {
                if (!RequestDetailsTextareaC) {
                    RequestDetailsTextareaC = new nicEditor({ buttonList: ['bold', 'italic', 'underline', 'strikethrough', 'left', 'center', 'right', 'justify', 'ol', 'ul', 'fontSize', 'fontFamily', 'fontFormat', 'removeformat', 'hr', 'indent', 'outdent', 'link', 'unlink', 'forecolor', 'bgcolor', 'xhtml'] }).panelInstance('txtComment');
                    $('.nicEdit-panelContain').parent().width('100%');
                    $('.nicEdit-panelContain').parent().next().width('100%');
                    $('.nicEdit-main').width("99%");
                }
                if ($("#lblApprovalWorkflow").text() == "In Progress" || ArrayofContractApprovalWorkflow.filter(function (e, index) { return e.Status === "In Progress" }).length > 0) {
                    $("#alertText1").html("Approval workflow is in progress for this request");
                    $("#textingdetails").html('<a target="_blank" title="View Workflow Details" href=' + workflowurltoshow + '><font color="#44A6D8">View Workflow Details</font></a>');
                    $("#dvAlertDetails1").dialog("open");
                }
                else {
                    $("#loadingPage").fadeIn();
                    var requestTitle = $("#lblRequestTitle").text();
                    var requestID = getParameterByName("RequestID");
                    var businessArea = $("#lblBusinessArea").text();
                    var contractArea = $("#lblContractArea").text();
                    $("#tblStage").empty();
                    $("#ddlRule").empty();

                    $("#txtWorkflowTitle").val('Approval for ' + requestTitle);
                    $("#txtDuration").val("");
                    var nicInstance = nicEditors.findEditor('txtComment');
                    nicInstance.setContent('');
                    NicEditorPasteEvent();

                    $("#hdWorkflowType").val("Request Approval");
                    $("#hdWorkflowContractArea").val(contractArea);
                    $("#hdWorkflowBusinessArea").val(businessArea);
                    $("#hdWorkflowObjectID").val(requestID);
                    $("#hdWorkflowObjectTitle").val(requestTitle);
                    GetValuesAndAutoPopulate("ddlWorkflowCC", requestercollection);


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
                            //var $options = $("#ddlApprovers > option").clone();
                            //while ($options.length < 2) {

                            //}
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
                                    $("#lblddlRule").css("display", "");
                                    $("#ddlRule").css("display", "none");
                                    $("#lblddlRule").text(workflowRules.RuleName);
                                    $("#ddlRule").attr('disabled', 'disabled');
                                }
                                else {
                                    $("#lblddlRule").text("");
                                    $("#lblddlRule").css("display", "none");
                                    $("#ddlRule").css("display", "");
                                    $("#ddlRule").removeAttr("disabled");
                                }
                                var participantsInXML = workflowRules.ParticipantsInXML;
                                var totalFileCount = 0;
                                if (workflowRules.RuleName == "Default") {
                                    if (typeof workflowRules.WorkflowTitle != 'undefined' && workflowRules.WorkflowTitle != "") {
                                        $("#txtWorkflowTitle").val(workflowRules.WorkflowTitle + ' for ' + requestTitle);
                                    } else {
                                        $("#txtWorkflowTitle").val('Approval for ' + requestTitle);
                                    }
                                }
                                else {
                                    if (typeof workflowRules.WorkflowTitle != 'undefined' && workflowRules.WorkflowTitle != "") {
                                        $("#txtWorkflowTitle").val(workflowRules.WorkflowTitle + ' for ' + $("#lblRequestTitle").text());
                                    } else {

                                        $("#txtWorkflowTitle").val('Conditional Approval Workflow for ' + $("#lblRequestTitle").text());
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
                                                    $("#ddlOrder" + vasstoid).val('Serial');
                                                    $("#ddlOrder" + vasstoid).prop('disabled', true);
                                                }
                                            }
                                            else {
                                                $("#ddlOrder" + vasstoid).val('Serial');
                                                $("#ddlOrder" + vasstoid).prop('disabled', true);
                                            }
                                            //$("#ddlOrder" + vasstoid).prop('disabled', true);
                                        });
                                        GetValuesAndAutoPopulate("ddlAssignTo" + totalFileCount, Participants);
                                        var vParticipantsArr = Participants.split(";");
                                        if ($("#ddlAssignTo" + totalFileCount).val() != null) {
                                            if ($("#ddlAssignTo" + totalFileCount).val().length > 1)
                                                $("#ddlOrder" + totalFileCount).prop('disabled', false);
                                            else
                                                $("#ddlOrder" + totalFileCount).prop('disabled', true);
                                        } else {
                                            $("#ddlOrder" + totalFileCount).prop('disabled', true);
                                        }
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
                                    if ($("#ddlRule").html() == "") {
                                        $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                                        $("#lblddlRule").css("display", "");
                                        $("#ddlRule").css("display", "none");
                                        $("#lblddlRule").text("Ad-hoc");
                                    }
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
                                if ($("#ddlRule").html() == "") {
                                    $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                                    $("#lblddlRule").css("display", "");
                                    $("#ddlRule").css("display", "none");
                                    $("#lblddlRule").text("Ad-hoc");
                                }
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
                            $("#dvWorkflow").dialog("option", "title", "Request Approval Workflow");
                            $("#dvWorkflow").dialog("open");
                            $("#dvWorkflow").height("auto");
                        },
                        error: function () {
                            $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                            $("#lblddlRule").css("display", "");
                            $("#ddlRule").css("display", "none");
                            $("#lblddlRule").text("Ad-hoc");
                            if (!workflowAdHoc)
                                $("#ddlRule").attr('disabled', 'disabled');
                            var totalFileCount = 1;
                            var htmlFormatFile = '<tr id="trStage' + totalFileCount + '">';
                            htmlFormatFile += '<td class="width30 wf_approval">';
                            htmlFormatFile += '<input id="txtStage' + totalFileCount + '" name="Stage' + totalFileCount + '" title="Stage" placeholder="Stage Name" type="text" class="f_inpt width95 validelement" value="Stage ' + totalFileCount + '" />';
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
                                        $("#ddlOrder" + vasstoid).val('Serial');
                                        $("#ddlOrder" + vasstoid).prop('disabled', true);
                                    }
                                } else {
                                    $("#ddlOrder" + vasstoid).val('Serial');
                                    $("#ddlOrder" + vasstoid).prop('disabled', true);
                                }
                            });

                            $("#loadingPage").fadeOut();
                            $("#dvWorkflow").dialog("option", "title", "Request Approval Workflow");
                            $("#dvWorkflow").dialog("open");
                            $("#dvWorkflow").height("auto");
                        }
                    });

                }
                break;
            }
        case "review":
            {
                var contractTitle = $("#lblContractTitle").text();
                var contractID = getParameterByName("ContractID");
                $("#txtTodoTitle").val('Review for ' + contractTitle);
                $("#ddlTodoType option").filter(function (index) { return $(this).text() === "Contract Review"; }).prop('selected', true);
                $("#txtBrowseElement").val(contractTitle);
                $("#txtBrowseElementID").val(contractID);
                $("#trBrowse").css("display", "");
                $("#browse").css("display", "none");
                $("#tdBrowseElement").html("Contract Title");
                $('#ddlTodoType').attr('disabled', 'disabled');
                GetValuesAndAutoPopulate("ddlApprovers", "");
                $("#txtDueDate").val("");
                //*Harshitha
                var nicInstance = nicEditors.findEditor('txtNotes');
                nicInstance.setContent('');
                NicEditorPasteEvent();

                $("#chkNotifyMe").prop('checked', false);
                fnChangeAssignedToText();
                $("#dvTodo").dialog("open");
                break;
            }
        case "delete":
            {
                swal({
                    title: '',
                    text: "Are you sure you want to <span style=\"font-weight:700; vertical-align:top;\">delete</span> this request?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
     function (confirmed) {
         if (confirmed) {
             $("#loadingPage").fadeIn();
             var requestID = getParameterByName("RequestID");
             $("#hdRequestID").val(requestID);
             $.ajax({
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/DeleteRequestTemporarily?requestid=' + requestID,
                 type: 'DELETE',
                 dataType: 'json',
                 headers: { 'eContracts-ApiKey': localStorage.APIKey, 'UserName': localStorage.UserName },
                 cache: false,
                 success: function (data) {
                     $("#loadingPage").fadeOut();
                     location = "/Pipeline/Requests";

                 }
             });
         }
         return;
     });

                break;
            }
            //manoj
        case "missinginfo":
            {
                GetRequestPendingAction(true);
                break;
            }
            //manoj
        case "status":
            {
                $('#addEditStatus').dialog('open');
                break;
            }
    }
}

function contextMenuRequestSettingsRecycleBin(action, el, pos) {
    switch (action) {
        case "view":
            {
                if ($('#tblDetailsMetadata tr').length == 0) {
                    BindMetaData(requestItem);
                }
                else {
                    $('#dialogSummary').dialog('open');
                }
                break;
            }
        case "history":
            {
                if ($('#contractLogs tr').length == 0) {
                    CreateRequestActivityList();
                }
                else {
                    $('#contractLogsPopup').dialog('open');
                }
                break;
            }
        case "delete":
            {
                swal({
                    title: '',
                    text: "Are you sure you want to <span style=\"font-weight:700; vertical-align:top;\">delete</span> this request?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
     function (confirmed) {
         if (confirmed) {
             $("#loadingPage").fadeIn();
             var requestID = getParameterByName("RequestID");
             $("#hdRequestID").val(requestID);
             $.ajax({
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/DeleteRequest?requestid=' + requestID,
                 type: 'DELETE',
                 dataType: 'json',
                 headers: {
                     'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName
                 },
                 cache: false,
                 success: function (data) {
                     $("#loadingPage").fadeOut();
                     location = "/Pipeline/Requests";
                 }
             });



         }
         return;
     });

                break;
            }
    }
}


$('.chosenmulti').on('chosen:showing_dropdown', function (evt, params) {
    $('.result-selected').css('display', 'none');
});
var workflowRoutingOptions = [];
var vWorkflowRules = [];


function ReloadContracts() {
    if (!inrefreshState) {
        inrefreshState = true;
        setTimeout(function () {
            inrefreshState = false;
        }, 5000);
        vRequestID = getParameterByName("RequestID");
        try {

            //BindRequestDetails(vRequestID);
            BindRelatedContracts(vRequestID);
            BindCreatedContracts(vRequestID);
            BindDocument(vRequestID);
            GetRequestActivities(vRequestID);
            BindNotes(vRequestID);
            RequestTopActions();




        } catch (e) {
            $("#loadingPage").fadeOut();
        }
    }

}
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
                $("#txtWorkflowTitle").val('Approval for ' + $("#hdWorkflowObjectTitle").val());
            }
        } else {
            if (typeof workflowRules.WorkflowTitle != 'undefined' && workflowRules.WorkflowTitle != "") {
                $("#txtWorkflowTitle").val(workflowRules.WorkflowTitle + ' for ' + $("#lblRequestTitle").text());
            } else {
                $("#txtWorkflowTitle").val('Conditional Approval Workflow for ' + $("#lblRequestTitle").text());
            }
        }
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

            //if (workflowRoutingOptions.indexOf("Allow replacing participants") == -1) {
            //    if (workflowRoutingOptions.indexOf("Allow over-ride of Admin Configuration") == -1) {
            //        $("#txtStage" + totalFileCount).prop('disabled', true);
            //        $("#ddlAssignTo" + totalFileCount).prop('disabled', true).trigger("chosen:updated");
            //        $("#ddlOrder" + totalFileCount).prop('disabled', true);
            //        $("#imgStageDelete" + totalFileCount).css("visibility", "hidden");
            //    }
            //}
            if (workflowRoutingOptions.indexOf("Allow over-ride of Admin Configuration") == -1) {
                if (workflowRoutingOptions.indexOf("Allow replacing participants") == -1) {
                    $("#ddlAssignTo" + totalFileCount).prop('disabled', true).trigger("chosen:updated");
                    $("#ddlOrder" + totalFileCount).prop('disabled', true);
                }
                $("#txtStage" + totalFileCount).prop('disabled', true);
                $("#imgStageDelete" + totalFileCount).css("visibility", "hidden");
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

function CreateRequestActivityList() {
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/activities?objecttype=Request&objectid=' + getParameterByName("RequestID") + '&actiontype=',
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

function contextMenuComments(action, el, pos) {

    switch (action) {
        case "view":
            {
                var commentID = $(el).find("#CommentID").text();
                ViewCommentDetail(commentID);
                break;
            }
        case "delete":
            {
                var termTitle = $(el).find("#CommentTitle").text();
                swal({
                    title: '',
                    text: "Are you sure you want to <span style=\"font-weight:700; vertical-align:top;\">delete '" + termTitle + "'</span>?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
     function (confirmed) {
         if (confirmed) {
             var commentID = $(el).find("#CommentID").text();
             $.ajax({
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/notes?noteid=' + commentID,
                 type: 'DELETE',
                 dataType: 'json',
                 headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                 "Content-Type": "application/json",
                 cache: false,
                 success: function (data) {
                     BindComments(vRequestID);
                 }
             });
         }
         return;
     });


                break;
            }
        case "edit":
            {
                $("#inprocessObligation").css("visibility", "hidden");
                var commentID = $(el).find("#CommentID").text();
                var CommentTitle = $(el).find("#CommentTitle").text();
                $("#txtCommentID").val(commentID);
                $("#txtNotes").val(CommentTitle);
                $("#addEditRequestComments").dialog("option", "title", "Edit Comments");
                $("#addEditRequestComments").dialog("open");
                break;
            }
    }
}

function ViewCommentDetail(commentID) {
    $("#loadingPage").fadeIn();
    $("#tblMetadataDetail").empty();
    $('#tblMetadataDetail').append('<tr><td><img src="../Content/Images/icon/loading.gif"/></td></tr>');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/notes?noteid=' + commentID,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (requestCommententity) {
            var vOblDueDate = requestCommententity.Created.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
            var vMetadata = '<tr>';
            vMetadata += '<td class="text_label width40">Request Comments</td>';
            vMetadata += '<td class="text width60">' + requestCommententity.RequestComments + '</td>';
            vMetadata += '</tr>';
            vMetadata += '<tr>';
            vMetadata += '<td class="text_label width40">Comment CreatedBy</td>';
            vMetadata += '<td class="text width60">' + requestCommententity.CreatedBy + '</td>';
            vMetadata += '</tr>';
            vMetadata += '<tr>';
            vMetadata += '<td class="text_label width40">Created Date</td>';
            vMetadata += '<td class="text width60">' + vOblDueDate + '</td>';
            vMetadata += '</tr>';
            $("#tblMetadataDetail").empty();
            $("#tblMetadataDetail").append(vMetadata);
            setBlankValueToHyphen("tblMetadataDetail");
            $("#loadingPage").fadeOut();
            $("#viewMetadataDetail").dialog("option", "title", "View Comments");
            $("#viewMetadataDetail").dialog("open");
        },
        error: function (status) {
            $("#loadingPage").fadeOut();
        }
    });
}

function CheckRequestDocumentExist() {
    var isExist = false;
    if ($("#ddlDocumentTemplate").is(":visible")) {
        isExist = false;
    }
    else {

        var vDocName = $('#txtRequestDocumentNameCreate').val();
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/documents?requestid=' + vRequestID + '&documentname=' + vDocName,
            type: 'GET',
            dataType: 'json',
            'Content-Type': 'application/json',
            cache: false,
            async: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            success: function (folder) {
                if (folder == null) {
                    isExist = false;
                }
                else {
                    isExist = true;
                }

            },
            error:
                function (data) {
                    isExist = false;
                }
        });
    }
    return isExist;
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function BackToList() {
    if (document.referrer.indexOf(window.location.hostname) != -1) {
        var referrer = document.referrer;
        if (referrer.indexOf('Pipeline/CreateRequest') >= 0 || referrer.indexOf('Pipeline/EditRequest') >= 0) {
            if (getParameterByName('View') != '') {
                window.location = '/Pipeline/Requests?View=' + getParameterByName('View')
            }
            else {
                window.location = '/Pipeline/Requests'
            }
        }
        else {
            if (getParameterByName('View') != '') {
                window.location = '/Pipeline/Requests?View=' + getParameterByName('View')
            }
            else {
                parent.history.back();
            }
        }
    }
    else {
        parent.history.back();
    }
    return false;
}

function getcontractareasettings(contractareaname) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/contractareadetailsbyname?contractareaname=' + encodeURIComponent(contractareaname),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            thisContractAreaSettings = data;
            //if (!(thisContractAreaSettings.DocumentTypes.indexOf("Primary Agreement") > -1)) {
            //    thisContractAreaSettings.DocumentTypes = thisContractAreaSettings.DocumentTypes + ";Primary Agreement";
            //}
            BindDocumentTypesAndTemplates();
        },
        error: function (data) {
            var vv = '';
        }
    });
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
}

$('#btnNewComments').click(function () {
    $(".validelement").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });

    var vActiveParticipants = $("#spApprovers").html() + ";" + $("#spAssignedTo").html();
    var regexp = new RegExp(escapeRegExp(localStorage.UserName), 'g');
    vActiveParticipants = vActiveParticipants.replace(regexp, '');

    $("#ddlSendTo option").removeClass('hideUserlocal');
    //$("#ddlSendTo option[value='" + localStorage.UserName + "']").addClass('hideUserlocal');
    $("#ddlSendTo option").each(function (index, element) {
        if (element.value == localStorage.UserName) {
            $(element).addClass('hideUserlocal');
        }
    });

    //*Harshitha
    var nicInstance = nicEditors.findEditor('txtNotes');
    nicInstance.setContent('');
    NicEditorPasteEvent();

    GetValuesAndAutoPopulate("ddlSendTo", vActiveParticipants);

    $("#addEditRequestComments").dialog("option", "title", "Add a Note");
    $("#addEditRequestComments").dialog("open");
});

$('#btnAddRequestDocument').click(function () {
    $("#lblTemplateDescription").text("");
    $("#tabUpload").addClass("document_active");
    $("#tabTemplate").removeClass("document_active");
    $("#tabExistingDocument").removeClass("document_active");
    $("#btnDocAdd").html('<span class="ui-button-text">Upload</span>')
    $("#tblContentControls").empty();
    selectUploadFromComputer();
    //manoj
    $("#ddlDocumentTemplate").val("0");
    $("#txtDocumentNameCreate").val("");
    //manoj
    $("#txtDocumentID").val("");
    $("#txtDocumentName").val("");
    $("#docContract").replaceWith($("#docContract").val('').clone(true));
    $("#txtDescriptionDoc").val("");

    $("#txtAuthorCreate").val("");
    $("#txtDocumentLanguageCreate").val("");
    $("#txtHardCopyPhysicalLocationCreate").val("");

    $("#lblCTitleDoc").text($("#lblContractTitle").text());
    $("#trFileUpload").css("display", "");
    $("#trDocumentType").css("display", "");
    $("#ddlDocumentTemplate").removeClass('validelement');
    $("#txtDocumentNameCreate").removeClass('validelement');
    $("#docContract").replaceWith($("#docContract").val('').clone(true));

    $(".validelement").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });
    if ($('#tblExistingDocument tr').length <= 0) {
        BindDocumentNotTagToContract();
    }
    $("#btnNewFolder").text('New Folder');
    setDocumentUrl();
    $("#ddlDocumentTypeCreate").val("0");
    //$("#ddlDocumentTypeCreate").find('option[value="Primary Agreement"]').prop("selected", true);
    $("#addEditDocument").dialog("option", "title", "New Document");
    $("#addEditDocument").dialog("open");


});

function selectUploadFromComputer() {
    $("#tblNewDocument").css('display', '');
    $("#tblExistingDocument").css('display', 'none');
    $("#tblExistingDocumentSearch").css('display', 'none');
    $("#tblExistingDocumentPaging").css('display', 'none');
    $("#tabUpload").addClass('form-active');
    $("#tabTemplate").removeClass('form-active');
    $("#tabExistingDocument").removeClass('form-active');
    $("#docContract").addClass('validelement');
    $("#ddlDocumentTemplate").removeClass('validelement');
    $("#trTemplate").css('display', 'none');
    $("#trTemplate1").css('display', 'none');
    $("#trFileUpload").css('display', '');
    $("#trDocumentType").css("display", "");
    $('input:checkbox[name=NotTaggedContract]').attr('checked', false);
    $("#hdnIsDocumentTag").text('');
    $("#formValidity").css('display', '');
    $("#formValidityForm").css('display', '');
    $("#formTitle").text('Upload from Computer');

}

function BindDocumentNotTagToContract() {
    $("#tblExistingDocument").empty();
    $('#compact-paginationDocument').css("display", "none");
    try {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/NotTaggedToContract?searchkeyword=' + encodeURIComponent($("#txtSearchDocument").val()),
            type: 'GET',
            cache: false,
            contentType: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            processData: false,
            success: function (data) {
                $('#tblExistingDocument').html('<img src="../Content/Images/icon/loading.gif">');
                var article = '';
                var datalenght = data.length;
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];
                    article += '<tr><td class="labelleft">';

                    article += '<input id="' + item.RowKey + '" type="checkbox" name="NotTaggedContract" value="' + item.DocumentName + '" />';

                    article += '<label for="' + item.RowKey + '" class="tagfiles">' + item.DocumentName + '</label>';
                    article += '</td></tr>';
                }
                $("#tblExistingDocument").empty();
                $("#tblExistingDocument").append(article);
                $('.tagfiles').linktype();
                $('#compact-paginationDocument').css("display", "");
                var vCount = $("#tblExistingDocument tr").length;
                $('#compact-paginationDocument').pagination({
                    items: vCount,
                    itemsOnPage: 5,
                    typeID: 'tblExistingDocument',
                    cssStyle: 'compact-theme'
                });
            },
            error: function () {
                $("#tblExistingDocument").append('<tr><td class="f_p-error det_metadata_notavailble">No items found.</td></tr>');
            }

        });


    } catch (e) {

    }
}

function setDocumentUrl() {

    if ($("#hdnContractDocumentsUrl").text() != "") {
        $("#txtNewFolderName").val("");
        $("#txtNewFolderName").css('display', 'none');
        $("#lblFolderUrl").text($("#hdnContractDocumentsUrl").text() + "/");
        $("#btnNewFolder").css('display', '');
    } else {
        $("#txtNewFolderName").css('display', '');
        $("#lblFolderUrl").text('/Contract Documents/');
        $("#btnNewFolder").css('display', 'none');
        if ($("#ddlContracts").find('option:selected').val() != "0") {
            $("#txtNewFolderName").val($("#ddlContracts").find('option:selected').text());
        }
        $("#txtNewFolderName").val($("#lblContractTitle").text());
    }
    if (SaveDraftInCloud == "on") {
        $("#rad_CopyLibraryAndAzure").attr('checked', 'checked');
    }
    else {
        $("#rad_CopyLibrary").attr('checked', 'checked');
    }
}

function BindDocumentTypesAndTemplates() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documenttypes',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (documenttypes) {
            var datalenght = documenttypes.length;
            for (var i = 0; i < datalenght; i++) {
                var item = documenttypes[i];
                if (typeof thisContractAreaSettings === 'undefined') {
                    $("#ddlDocumentType").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                    $("#ddlDocumentTypeCreate").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                } else {
                    if (thisContractAreaSettings.DocumentTypes.split(';').indexOf(item.TypeName) > -1) {
                        $("#ddlDocumentType").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                        $("#ddlDocumentTypeCreate").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                    }
                }
            }
            //if (typeof thisContractAreaSettings === 'undefined') {
            //    $("#ddlDocumentTypeCreate").find('option[value="Primary Agreement"]').prop("selected", true);
            //}
            if ($("#ddlDocumentTypeCreate option[value='Others']").length == 0) {
                $("#ddlDocumentType").append("<option value='Others'>Others</option>");
                $("#ddlDocumentTypeCreate").append("<option value='Others'>Others</option>");
            }
        },
        error:
            function (data) {
                $("#ddlDocumentType").append("<option value='Others'>Others</option>");
                $("#ddlDocumentTypeCreate").append("<option value='Others'>Others</option>");
            }
    });
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/templatedocuments',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (templates) {
            hashtable = {};
            var datalenght = templates.length;
            for (var i = 0; i < datalenght; i++) {
                var item = templates[i];
                if (thisContractAreaSettings.DocumentTemplates.split(';').indexOf(item.TemplateName) > -1) {
                    $("#ddlDocumentTemplate").append("<option value='" + item.TemplateName + "~" + item.DocumentType + "'>" + item.TemplateName + "</option>");
                    hashtable[item.TemplateName.replace(/ /g, '')] = item.Description;
                }
            }
        }
    });
}

function contextMenuDocument(action, el, pos) {

    switch (action) {
        case "viewdoc":
            {
                var vURL = $(el).find("#URL").text();
                ViewDocument(vURL);
                break;
            }
        case "view":
            {
                $("#loadingPage").fadeIn();
                $("#docMetadata").addClass('active_tab');
                $("#docActivities").removeClass('active_tab');
                var documentID = $(el).find("#DocumentID").text();
                $("#tblMetadataDetailDocument").empty();
                $('#tblMetadataDetailDocument').append('<tr><td><img src="../Content/Images/icon/loading.gif"/></td></tr>');

                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/documents?requestid=' + vRequestID + '&documentid=' + documentID,
                    type: 'GET',
                    dataType: 'json',
                    "Content-Type": "application/json",
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    cache: false,
                    success: function (documententity) {
                        var vMetadata = '<tr>';
                        vMetadata += '<td class="text_label width40">Document Name</td>';
                        vMetadata += '<td class="text width60">' + documententity.DocumentName + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Description</td>';
                        vMetadata += '<td class="text width60">' + documententity.Description + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Document Type</td>';
                        vMetadata += '<td class="text width60">' + documententity.DocumentType + '</td>';
                        vMetadata += '</tr>';

                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Document Path </td>';
                        vMetadata += '<td class="text width60">' + documententity.DocumentUrl + '</td>';
                        vMetadata += '</tr>';

                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Created by</td>';
                        vMetadata += '<td class="text width60">' + documententity.CreatedBy + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Created Date</td>';
                        vMetadata += '<td class="text width60">' + moment(new Date(documententity.Created)).format('Do MMM YYYY') + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Last Updated</td>';
                        vMetadata += '<td class="text width60">' + moment(new Date(documententity.Modified)).format('Do MMM YYYY') + '</td>';
                        vMetadata += '</tr>';

                        $("#tblMetadataDetailDocument").empty();
                        $("#tblMetadataDetailDocument").append(vMetadata);
                        setBlankValueToHyphen("tblMetadataDetailDocument");
                        $("#loadingPage").fadeOut();
                        $("#viewMetadataDetailDocument").dialog("option", "title", "Document Details");
                        $("#viewMetadataDetailDocument").dialog("open");

                    },
                    error: function () {
                    }
                });

                $("#documentLogs").empty();
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/activities?objecttype=Document&objectid=' + documentID + '&actiontype=',
                    type: 'GET',
                    dataType: 'json',
                    "Content-Type": "application/json",
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    cache: false,
                    success: function (activities) {
                        var datalenght = activities.length;
                        for (var i = 0; i < datalenght; i++) {
                            var item = activities[i];
                            var sObject = item.Object;
                            var sActivity = item.Activity;
                            var sUserID = item.UserID;
                            var sTimestamp = moment(new Date(item.Timestamp)).format('Do MMM, h:mm A');

                            var article = '<article class="box1">';
                            article += '<div>';
                            article += '<p class="text">' + sTimestamp;
                            article += '  ' + sActivity + '</p>';
                            article += '</div>';
                            article += '</article>';
                            $("#documentLogs").append(article);
                        }
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
        case "replace":
            {
                var documentID = $(el).find("#DocumentID").text();
                $('#hdnDocumentID').val(documentID);

                $("#divReplaceDocument").dialog("option", "title", "Replace Document");
                $("#divReplaceDocument").dialog("open");
                break;
            }
        case "delete":
            {
                var documentName = $(el).find("#DocumentName").text();
                var documentID = $(el).find("#DocumentID").text();
                swal({
                    title: '',
                    text: "Are you sure you want to <span style=\"font-weight:700; vertical-align:top;\">delete '" + documentName + "'</span>?",
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
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/documentsdelete?documentid=' + documentID,
                 type: 'DELETE',
                 dataType: 'json',
                 "Content-Type": "application/json",
                 headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName, requestID: vRequestID, DocumentName: documentName },
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
        case "remove":
            {
                var documentName = $(el).find("#DocumentName").text();
                var documentID = $(el).find("#DocumentID").text();
                swal({
                    title: '',
                    text: "Are you sure you want to <span style=\"font-weight:700\">remove '" + documentName + "'</span> from this contract?",
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
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/untag?contractid=' + getParameterByName('ContractID') + '&documentid=' + documentID,
                 type: 'PUT',
                 dataType: 'json',
                 "Content-Type": "application/json",
                 headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken },
                 cache: false,
                 success: function (data) {

                     $("#loadingPage").fadeOut();
                     BindDocument();
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
        case "edit":
            {
                var documentID = $(el).find("#DocumentID").text();
                EditDocumentMetadata(documentID);

                break;
            }
        case "final":
            {
                swal({
                    title: '',
                    text: "Are you sure you want to <span style=\"font-weight:700\">mark</span> this document as <span style=\"font-weight:700\">Final</span>.?",
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
                     'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken
                 },
                 processData: false,
                 success: function (document) {
                     BindDocument();
                 }
             });
         }
         return;
     });

                break;
            }
        case "download":
            {
                var LinkURL = $(el).find("#URL").text();
                if (typeof LinkURL === "string") {
                    LinkURL = decodeURIComponent(LinkURL);
                }
                else {
                    LinkURL = decodeURIComponent($(LinkURL).attr('data-value'));
                }
                //LinkURL = decodeURIComponent(LinkURL);
                location = LinkURL//localStorage.SPHostUrl + "/_layouts/15/download.aspx?SourceUrl=" + LinkURL;
                break;
            }
        case "signature":
            {
                ClearSignatureForm();
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/settings',
                    type: 'GET',
                    dataType: 'json',
                    "Content-Type": "application/json",
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    cache: false,
                    success: function (settings) {
                        $("#txtExpIn").val(settings.TaskDuration);
                    },
                    error: function () {

                    }
                });
                var documentName = $(el).find("#DocumentName").text();
                var sentForSign = $(el).find("#SentForSign").text();
                var documentID = $(el).find("#DocumentID").text();
                var CanSend = false;
                var ext = $(el).find("dd").attr("class");
                if (typeof (ext) != "undefined" && ext != "")
                    if (ext.indexOf("doc") > -1 || ext.indexOf("docx") > -1 || ext.indexOf("pdf") > -1)
                        CanSend = true;
                if (CanSend) {
                    if (sentForSign == '') {
                        var LinkURL = $(el).find("a").attr('href');
                        var DocumentUrl = getQueryStringFromValue(LinkURL, 'sourcedoc');
                        $("#hdDocumentID").val(documentID);
                        $("#hdDocumentURL").val(DocumentUrl);
                        $("#tdDocument").append("<b>" + documentName + "</b>");
                        getNameAndEmailSignDocument();
                        $("#sendForSignature").dialog("open");
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
                var LinkURL = $(el).find("a").attr('href');
                window.open(LinkURL);
                break;
            }
        case "sharelink":
            {
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/settings',
                    type: 'GET',
                    dataType: 'json',
                    "Content-Type": "application/json",
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    cache: false,
                    success: function (settings) {
                        $("#txtShareExpIn").val(settings.TaskDuration);
                    },
                    error: function () {

                    }
                });
                ClearShareForm();
                var LinkURL = $(el).find("a").attr('href');
                var DocumentUrl = getQueryStringFromValue(LinkURL, 'sourcedoc');
                var documentName = $(el).find("#DocumentName").text();
                var documentID = $(el).find("#DocumentID").text();
                $("#hdDocumentID").val(documentID);
                $("#hdDocumentURL").val(DocumentUrl);
                $("#tdShareDocument").append("<b>" + documentName + "</b>");
                getNameAndEmailShareDocument();
                getShareNameandEmailIdInternal(vRequestID, "ddlDocumentShareInternal");
                $("#shareDocument").dialog("open");
                break;
            }
        case "approve":
            {
                if (!RequestDetailsTextareaC) {
                    RequestDetailsTextareaC = new nicEditor({ buttonList: ['bold', 'italic', 'underline', 'strikethrough', 'left', 'center', 'right', 'justify', 'ol', 'ul', 'fontSize', 'fontFamily', 'fontFormat', 'removeformat', 'hr', 'indent', 'outdent', 'link', 'unlink', 'forecolor', 'bgcolor', 'xhtml'] }).panelInstance('txtComment');
                    $('.nicEdit-panelContain').parent().width('100%');
                    $('.nicEdit-panelContain').parent().next().width('100%');
                    $('.nicEdit-main').width("99%");
                }
                var documentName = $(el).find("#DocumentName").text();
                var documentID = $(el).find("#DocumentID").text();
                $("#txtTodoTitle").val('Approval for ' + documentName.split('.')[0]);
                $("#ddlTodoType option").filter(function (index) { return $(this).text() === "Document Approval"; }).prop('selected', true);
                $("#txtBrowseElement").val(documentName);
                $("#txtBrowseElementID").val(documentID);
                $("#trBrowse").css("display", "");
                $("#browse").css("display", "none");
                $("#tdBrowseElement").html("Documents");
                $('#ddlTodoType').attr('disabled', 'disabled');
                GetValuesAndAutoPopulate("ddlApprovers", "");
                $("#txtDueDate").val("");
                //*Harshitha
                var nicInstance = nicEditors.findEditor('txtNotes');
                nicInstance.setContent('');
                NicEditorPasteEvent();

                $("#chkNotifyMe").prop('checked', false);
                $("#dvTodo").dialog("open");
                break;
            }
        case "review":
            {
                if (!RequestDetailsTextareaC) {
                    RequestDetailsTextareaC = new nicEditor({ buttonList: ['bold', 'italic', 'underline', 'strikethrough', 'left', 'center', 'right', 'justify', 'ol', 'ul', 'fontSize', 'fontFamily', 'fontFormat', 'removeformat', 'hr', 'indent', 'outdent', 'link', 'unlink', 'forecolor', 'bgcolor', 'xhtml'] }).panelInstance('txtComment');
                    $('.nicEdit-panelContain').parent().width('100%');
                    $('.nicEdit-panelContain').parent().next().width('100%');
                    $('.nicEdit-main').width("99%");
                }
                var documentName = $(el).find("#DocumentName").text();
                var documentID = $(el).find("#DocumentID").text();
                var reviewWorkflow = $(el).find("#ReviewWorkflow").text();
                if (reviewWorkflow == "In Progress") {
                    swal("", "Document Review is in progress for this document.");
                }
                else {
                    $("#loadingPage").fadeIn();

                    var businessArea = $("#lblBusinessArea").text();
                    var contractArea = $("#lblContractArea").text();
                    $("#tblStage").empty();
                    $("#ddlRule").empty();

                    $("#txtWorkflowTitle").val('Review for ' + documentName.split('.')[0]);
                    $("#txtDuration").val("");
                    var nicInstance = nicEditors.findEditor('txtComment');
                    nicInstance.setContent('');
                    NicEditorPasteEvent();

                    $("#hdWorkflowType").val("Document Review");
                    $("#hdWorkflowObjectID").val(documentID);
                    $("#hdWorkflowObjectTitle").val(documentName);
                    GetValuesAndAutoPopulate("ddlWorkflowCC", requestercollection);

                    var vWorkflowSettings = [];
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/evaluate?workflowType=Document Review&contractArea=' + encodeURIComponent(contractArea) + '&businessArea=' + encodeURIComponent(businessArea) + '&contractid=' + getParameterByName('ContractID'),
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
                            }
                            if (vWorkflowRules.length > 0) {
                                $(vWorkflowRules).each(function (i, rule) {
                                    $("#ddlRule").append('<option value="' + rule.RuleName + '">' + rule.RuleName + '</option>');
                                });

                                var workflowRules = vWorkflowRules[0];
                                $("#ddlRule").find('option[value="' + workflowRules.RuleName + '"]').prop("selected", true);
                                if (vWorkflowRules.length == 1) {
                                    $("#ddlRule").attr('disabled', 'disabled');
                                }
                                else {
                                    $("#ddlRule").removeAttr("disabled");
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
                                    htmlFormatFile += '<input id="txtStage' + totalFileCount + '" value="' + StageTitle + '" name="Stage' + totalFileCount + '" title="Stage" placeholder="Stage Name" type="text" class="f_inpt width95 validelement" />';
                                    htmlFormatFile += '</td>';
                                    htmlFormatFile += '<td class="width46">';
                                    htmlFormatFile += '<select id="ddlAssignTo' + totalFileCount + '" name="AssignTo' + totalFileCount + '"  multiple="multiple" data-placeholder="Select" class="width97 validmultiselect"></select>';
                                    htmlFormatFile += '</td>';
                                    htmlFormatFile += '<td class="width20 padding_top_3px v_align_top">';
                                    htmlFormatFile += '<select id="ddlOrder' + totalFileCount + '" name="Order' + totalFileCount + '"  class="f_inpt width97">';
                                    if (Order == "Serial")
                                        htmlFormatFile += '<option value="Serial" selected="selected">Serial</option><option value="Parallel">Parallel</option></select>';
                                    else
                                        htmlFormatFile += '<option value="Serial">Serial</option><option value="Parallel" selected="selected">Parallel</option></select>';
                                    htmlFormatFile += '</td>';
                                    htmlFormatFile += '<td class="width4">';
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
                                    });
                                    GetValuesAndAutoPopulate("ddlAssignTo" + totalFileCount, Participants);


                                    if (item.WorkflowSettings != null) {
                                        if (workflowRoutingOptions.indexOf("Allow replacing participants") == -1) {
                                            if (workflowRoutingOptions.indexOf("Allow over-ride of Admin Configuration") == -1) {
                                                $("#txtStage" + totalFileCount).prop('disabled', true);
                                                $("#ddlAssignTo" + totalFileCount).prop('disabled', true).trigger("chosen:updated");
                                                $("#ddlOrder" + totalFileCount).prop('disabled', true);
                                                $("#imgStageDelete" + totalFileCount).css("visibility", "hidden");
                                            }
                                        }
                                    }
                                });
                            }
                            else {
                                $("#ddlRule").append('<option value="Ad-hoc">Ad-hoc</option>');
                                $("#lblddlRule").css("display", "");
                                $("#ddlRule").css("display", "none");
                                $("#lblddlRule").text("Ad-hoc");
                                if (!workflowAdHoc)
                                    $("#ddlRule").attr('disabled', 'disabled');
                                var totalFileCount = 1;
                                var htmlFormatFile = '<tr id="trStage' + totalFileCount + '">';
                                htmlFormatFile += '<td class="width30" style="vertical-align: top;">';
                                htmlFormatFile += '<input id="txtStage' + totalFileCount + '" name="Stage' + totalFileCount + '" title="Stage" placeholder="Stage Name" type="text" class="f_inpt width95 validelement" value="Stage ' + totalFileCount + '"/>';
                                htmlFormatFile += '</td>';
                                htmlFormatFile += '<td class="width46 v_align_middle">';
                                htmlFormatFile += '<select id="ddlAssignTo' + totalFileCount + '" name="AssignTo' + totalFileCount + '"  multiple="multiple" data-placeholder="Select" class="width97 validmultiselect"></select>';
                                htmlFormatFile += '</td>';
                                htmlFormatFile += '<td class="width20" style="vertical-align: top;">';
                                htmlFormatFile += '<select id="ddlOrder' + totalFileCount + '" name="Order' + totalFileCount + '"  class="f_inpt width97"><option selected="selected">Serial</option><option>Parallel</option></select>';
                                htmlFormatFile += '</td>';
                                htmlFormatFile += '<td class="width4">';
                                htmlFormatFile += '<img src="../Content/Images/icon/delete.png" style="visibility: hidden; width: 20px" onclick="DeleteStage(this)" />';
                                htmlFormatFile += '</td>';
                                htmlFormatFile += '</tr>';

                                $("#tblStage").append(htmlFormatFile);
                                var $options = $("#ddlApprovers > option").clone();
                                $('#ddlAssignTo' + totalFileCount).append($options);
                                $("#ddlAssignTo" + totalFileCount).chosen().change(function () {
                                });
                            }
                            $("#loadingPage").fadeOut();
                            $("#dvWorkflow").dialog("option", "title", "Document Review Workflow");
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
                            htmlFormatFile += '<select id="ddlOrder' + totalFileCount + '" name="Order' + totalFileCount + '"  class="f_inpt width97"><option selected="selected">Serial</option><option>Parallel</option></select>';
                            htmlFormatFile += '</td>';
                            htmlFormatFile += '<td class="width4 padding_top_10px v_align_top">';
                            htmlFormatFile += '<img src="../Content/Images/icon/delete.png" style="visibility: hidden; width: 20px" onclick="DeleteStage(this)" />';
                            htmlFormatFile += '</td>';
                            htmlFormatFile += '</tr>';

                            $("#tblStage").append(htmlFormatFile);
                            var $options = $("#ddlApprovers > option").clone();
                            $('#ddlAssignTo' + totalFileCount).append($options);
                            $("#ddlAssignTo" + totalFileCount).chosen().change(function () {
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
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'RefreshToken': localStorage.RefreshToken },
                cache: false,
                success: function (data) {
                    var datalenght = data.length;
                    for (var i = 0; i < datalenght; i++) {
                        var item = data[i];
                        var article = "";
                        article += '<tr>';
                        article += '<td>' + item.VersionNo + '</td>';
                        article += '<td>' + moment(new Date(item.Modified)).format('MM/DD/YYYY') + '</td>';
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

function EditDocumentMetadata(documentID) {
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/documents?requestid=' + vRequestID + '&documentid=' + documentID,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (documententity) {
            $("#loadingPage").fadeOut();
            $("#txtDocumentID").val(documententity.RowKey);
            var vDocName = documententity.DocumentUrl.split('/')[4];
            vDocName = vDocName.split('.')[vDocName.split('.').length - 1];
            $("#txtDocumentName").val(documententity.DocumentName);
            $("#spExt").html(vDocName);
            $("#ddlDocumentType option").filter(function (index) { return $(this).text() === documententity.DocumentType; }).prop('selected', true);
            $("#txtDocumentDescriptionEdit").val(documententity.Description);

        },
        error: function () {
            $("#loadingPage").fadeOut();
        },
        complete: function () {
            $("#loadingPage").fadeOut();
            $("#trFileUpload").css("display", "none");
            $("#lblCTitleDoc").text($("#lblRequestTitle").text());
            $(".validelement").each(function (index, element) {
                $(element).removeClass("error");
                $("#errormsg_" + element.id).remove();
            });
            $("#EditDocument").dialog("option", "title", "Edit Document Metadata");
            $("#EditDocument").dialog("open");
        }
    });
}

function setBlankValueToHyphen(tableId) {
    $('#' + tableId + ' tr td').each(function () {
        var cellText = $(this).html();
        if (cellText == '' || cellText == '0') {
            $(this).html('-');
        }


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
    htmlFormatFile += '<input id="txtStage' + totalFileCount + '" name="Stage' + totalFileCount + '" title="Stage" placeholder="Stage Name" type="text" class="f_inpt width95 validelement" value="Stage ' + vRowLength + '" />';
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
        $("#loadingPage").fadeIn();
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
        if (vcommentText.length <= 26500) {
            vcommentText = $('<div/>').text(vcommentText).html();
            if (workflowAdHoc == "on") { vTaskRouting = $("#ddlRule").find('option:selected').text(); }
            if (vTaskRouting != "Default" && vTaskRouting != "Ad-hoc") {
                vTaskRouting = "Conditional";
            }
            //$(":button:contains('Cancel')").attr("disabled", true);


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
                    "ContractArea": $("#lblContractArea").text(),
                    "BusinessArea": $("#lblBusinessArea").text(),
                    "BusinessAreaPath": $("#lblBusinessAreaPath").text(),
                    "AutoUpdateStatus": vAutoUpdateObjectStatus,
                    "TaskRouting": vTaskRouting
                },
                cache: false,
                success: function (status) {
                    $("#loadingPage").fadeOut();
                    if (vAutoUpdateObjectStatus == "Yes") {
                        requestItem.Status = "Awaiting Approval";
                        RequestTopActions();
                    }

                    $("#inprocessStartWorkflow").css('display', 'none');

                    $("#dvWorkflow").dialog("close");//ui-dialog-buttonset
                    $("#lblApprovalWorkflow").text("In Progress");
                    GetRequestActivities(vRequestID);
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

$('#btnCreateContractFromRequest').click(function () {
    //GlobalContractAdminView();
    if (typeof ($('#hdnContractCreated').text()) != 'undefined' && $('#hdnContractCreated').text() != null && $('#hdnContractCreated').text() != "" && $('#hdnContractCreated').text() != "false") {
        $("#loadingPage").fadeIn();
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/getcontractcreatedfromreq?requesttitle=' + encodeURIComponent($("#lblRequestTitle").text()),
            type: 'GET',
            dataType: 'json',
            'Content-Type': 'application/json',
            cache: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            success: function (conentity) {
                $("#loadingPage").fadeOut();
                if (conentity != null) {
                    var ContractsTitle = "<br>";
                    $(conentity).each(function (icon, conitem) {
                        if (conitem != null) {
                            if (conitem.IsDraft == "No") {
                                ContractsTitle += '<br><div style="float:left"><span>&nbsp;* &nbsp;</span><a href="javascript:void(0);" onclick="movetocontractdetails(\'' + conitem.RowKey + '\',\'' + conitem.Status + '\')"><span class="">' + conitem.ContractTitle + '</span></a></div><br>'
                            }
                        }
                    });
                    ContractsTitle = "The following Contract Records have been created from <span style=\"font-weight:700\">" + $("#lblRequestTitle").text() + "</span> Request. Are you sure you want to create a new one?." + ContractsTitle;
                    //}
                    swal({
                        title: '',
                        text: ContractsTitle,
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'No',
                        html: true
                    },
                    function (confirmed) {
                        if (confirmed) {
                            var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                            var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                                return (n.RowKey == "16" && n.Status == "ON");
                            });
                            if (vAccFeat.length > 0) {
                                location = "/Contracts/CreateContract?Stage=pipeline&RequestID=" + getParameterByName("RequestID");
                            } else {
                                location = "/Contracts/CreateContract?Stage=active&RequestID=" + getParameterByName("RequestID");
                            }
                        }
                        return;
                    });
                } else {
                    $("#loadingPage").fadeOut();
                    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                    var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                        return (n.RowKey == "16" && n.Status == "ON");
                    });
                    if (vAccFeat.length > 0) {
                        location = "/Contracts/CreateContract?Stage=pipeline&RequestID=" + getParameterByName("RequestID");
                    } else {
                        location = "/Contracts/CreateContract?Stage=active&RequestID=" + getParameterByName("RequestID");
                    }
                }
            },
            error:
            function (conentity) {
                $("#loadingPage").fadeOut();
                var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                    return (n.RowKey == "16" && n.Status == "ON");
                });
                if (vAccFeat.length > 0) {
                    location = "/Contracts/CreateContract?Stage=pipeline&RequestID=" + getParameterByName("RequestID");
                } else {
                    location = "/Contracts/CreateContract?Stage=active&RequestID=" + getParameterByName("RequestID");
                }
            }
        });
    } else {
        var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
        var vAccFeat = $.grep(veContractFeatures, function (n, i) {
            return (n.RowKey == "16" && n.Status == "ON");
        });
        if (vAccFeat.length > 0) {
            location = "/Contracts/CreateContract?Stage=pipeline&RequestID=" + getParameterByName("RequestID");
        } else {
            location = "/Contracts/CreateContract?Stage=active&RequestID=" + getParameterByName("RequestID");
        }
    }
});

function BindProjects(items, project) {
    $("#tblRelatedProjects").empty();
    var splitproject = project.split(";");
    var projecthavetask = [];
    if (items.indexOf(';') >= 0) {
        var vrelated = "";
        $.each(items.split(";"), function (a, itemname) {
            vrelated += '<tr>';
            projecthavetask.push(itemname.split(':')[0].trim());
            vrelated += '<td height="10" align="left" valign="top" class="content-text clr999"><a href="javascript:void(0);" onclick="ViewProject(\'' + itemname.split(':')[0] + '\')">' + itemname.split(':')[0] + '</a></td>';
            if (itemname.split(':')[1] == "Default Task") {
                vrelated += '<td height="10" align="left" valign="top" class="content-text">(' + itemname.split(':')[1] + ')</td>';
            } else {
                vrelated += '<td height="10" align="left" valign="top" class="content-text"><a href="javascript:void(0);" onclick="ViewProjectTask(\'' + itemname + '\')">(' + itemname.split(':')[1] + ')</a></td>';
            }
            vrelated += '</tr>';
        });

        splitproject = splitproject.filter(function (val) {
            return projecthavetask.indexOf(val.trim()) == -1;
        });
        if (splitproject.length > 0) {
            $.each(splitproject, function (a, projectname) {
                vrelated += '<tr><td height="10" align="left" valign="top" class="content-text clr999"><a href="javascript:void(0);" onclick="ViewProject(\'' + projectname + '\')">' + projectname + '</a></td>';
                vrelated += '<td height="10" align="left" valign="top" class="content-text">No task assigned</td></tr>';
            });
        }
        $("#tblRelatedProjects").html(vrelated);
    } else {
        var vrelated1 = "";
        vrelated1 = '<tr>';
        vrelated1 += '<td height="10" align="left" valign="top" class="content-text clr999"><a href="javascript:void(0);" onclick="ViewProject(\'' + items.split(':')[0] + '\')">' + items.split(':')[0] + '</a></td>';
        if (items.split(':')[1] == "Default Task") {
            vrelated1 += '<td height="10" align="left" valign="top" class="content-text">(' + items.split(':')[1] + ')</td>';
        } else {
            vrelated1 += '<td height="10" align="left" valign="top" class="content-text"><a href="javascript:void(0);" onclick="ViewProjectTask(\'' + items + '\')">(' + items.split(':')[1] + ')</a></td>';
        }
        vrelated1 += '</tr>';
        $("#tblRelatedProjects").html(vrelated1);
    }
}

function ViewProject(projectname) {
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/project?projectName=' + projectname.trim(),
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (entity) {
            $("#dvProjectID").html(entity.ProjectID);
            $("#dvProjectName").html(entity.ProjectName);
            if (entity.Description == null || entity.Description == "") {
                $("#dvDescription").html("-");
            } else {
                $("#dvDescription").html(entity.Description);
            }
            $("#dvStatus").html(entity.Status);
            if (entity.StartDate == null || entity.StartDate == "") {
                $("#dvStartDate").html("-")
            }
            else {
                $("#dvStartDate").html(moment(new Date(entity.StartDate)).format('MM/DD/YYYY'));
            }
            if (entity.EndDate == null || entity.EndDate == "") {
                $("#dvEndDate").html("-")
            }
            else {
                $("#dvEndDate").html(moment(new Date(entity.EndDate)).format('MM/DD/YYYY'));
            }
            if (entity.SubAccount == null || entity.SubAccount == "") {
                $("#dvSubAccount").html("-")
            }
            else {
                $("#dvSubAccount").html(entity.SubAccount);
            }
            $("#dvProjectManager").html(entity.ProjectManager);
            $("#dvBusinessManager").html(entity.BusinessManager);
            if (entity.CustomerID == null || entity.CustomerID == "") {
                $("#dvCustomerID").html("-")
            }
            else {
                $("#dvCustomerID").html(entity.CustomerID);
            }
            if (entity.Country == "--Select--") {
                $("#dvCountry").html("-");
            } else {
                $("#dvCountry").html(entity.Country);
            }
            if (entity.Division == null || entity.Division == "") {
                $("#dvDivision").html("-")
            }
            else {
                $("#dvDivision").html(entity.Division);
            }
            if (entity.PracticeArea == null || entity.PracticeArea == "") {
                $("#dvPracticeArea").html("-")
            }
            else {
                $("#dvPracticeArea").html(entity.PracticeArea);
            }

            $("#dvViewProject").dialog("open");
            $("#loadingPage").fadeOut();
        },
        error:
            function (data) {
                $("#loadingPage").fadeOut();
            }
    });
}

function ViewProjectTask(taskid) {
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/projecttaskbytaskid?taskid=' + taskid.trim(),
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (entity) {
            $("#dvTaskID").html(entity.TaskID);
            $("#dvTaskDescription").html(entity.TaskDescription);
            if (entity.StartDate == null || entity.StartDate == "") {
                $("#dvManager").html("-");
            } else {
                $("#dvManager").html(entity.Manager);
            }
            if (entity.StartDate == null || entity.StartDate == "") {
                $("#dvTaskStartDate").html("-");
            }
            else {
                $("#dvTaskStartDate").html(moment(new Date(entity.StartDate)).format('MM/DD/YYYY'));
            }
            if (entity.EndDate == null || entity.EndDate == "") {
                $("#dvTaskEndDate").html("-");
            }
            else {
                $("#dvTaskEndDate").html(moment(new Date(entity.EndDate)).format('MM/DD/YYYY'));
            }

            $("#dvViewProjectTask").dialog("open");
            $("#loadingPage").fadeOut();
        },
        error:
            function (data) {
                $("#loadingPage").fadeOut();
            }
    });
}

function BindRelatedContracts(requestid) {
    if (requestid == null || requestid == "") {
        requestid = vRequestID;
    }
    $("#ulRelatedContracts").empty();
    $('#liSelected').empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/relatedcontractsfromrequest?requestid=' + requestid,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (contactsJsonPayload) {
            if (contactsJsonPayload == null) {
                $("#ulRelatedContracts").append('No items found.');
            } else if (contactsJsonPayload.length == 0) {
                $("#ulRelatedContracts").append('No items found.');
            } else {
                var count = 0;
                var vContractStatus = ["Ready for Signature", "Awaiting Signatures", "Signed", "Active", "Up for Renewal", "Renewed", "Extended", "On Hold", "Replaced", "Expired", "Cancelled", "Terminated", "Archived", "About to Expire"];
                $("#hdnRelatedContracts").empty();
                $("#ulRelatedContracts").html("");
                $(contactsJsonPayload).each(function (i, item) {
                    var myUrl = '/Contracts/ContractDetails?ContractID=' + encodeURI(item.RowKey);
                    if ($.inArray(item.Status, vContractStatus) == -1)
                        myUrl += "&Stage=pipeline";

                    $("#hdnRelatedContracts").append(item.RowKey + ';');
                    if (item.InRecycleBin != "Yes") {
                        if (i == 0)
                            $("#ulRelatedContracts").append('<a href="' + myUrl + '" class="PreserveSpace">' + item.ContractTitle + '</a>');
                        else
                            $("#ulRelatedContracts").append('; <a href="' + myUrl + '" class="PreserveSpace">' + item.ContractTitle + '</a>');
                        $('#liSelected').append('<span style="font-size:11px;" id=' + item.RowKey + ' class="PreserveSpace">' + item.ContractTitle + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveRelatedContract(this);" style="float:right"></span>');

                    }
                    else {
                        if (i == 0)
                            $("#ulRelatedContracts").append('<span style="color: #ff4d4d" title="This Contract Record is no longer available." class="PreserveSpace">' + item.ContractTitle + '</span>');
                        else
                            $("#ulRelatedContracts").append('; <span style="color: #ff4d4d" title="This Contract Record is no longer available." class="PreserveSpace">' + item.ContractTitle + '</span>');
                        $('#liSelected').append('<span style="font-size:11px;" id=' + item.RowKey + ' class="PreserveSpace">' + item.ContractTitle + '</span>');
                    }
                });
            }
        },
        error: function (request) {
            $("#ulRelatedContracts").append('No items found.');
        }
    });
}

//function AddRelatedContracts() {
//    $("#loadingPage").fadeIn();
//    $('#loadContract').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
//    $('#tblPopupContracts').empty();
//    $("#txtSearchBoxContract").val("");
//    var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?stage=&searchkeyword=&customquery=&sortbyfield=ContractTitle&orderby=ASC';
//    if ($('#tblPopupContracts tr').length <= 0) {
//        var relatedContractsTag = [];
//        $("#txtSearchBoxContract").val("");
//        $.ajax({
//            url: vURL,
//            type: 'GET',
//            dataType: 'json',
//            "Content-Type": "application/json",
//            headers: { 'eContracts-ApiKey': localStorage.APIKey, BusinessAreaLocation: $("#lblBusinessAreaPath").text() },
//            cache: false,
//            success: function (data) {
//                $('#loadContract').empty();
//                $("#hdnRelatedContracts").append(getParameterByName("RequestID"))
//                $(data).each(function (i, item) {
//                    if ($("#hdnRelatedContracts").text().indexOf(item.RowKey) > -1) { }
//                    else {
//                        var article = '<tr><td>';
//                        article += '<input id="' + item.RowKey + '" type="checkbox" name="RelatedContract" class="css1-checkbox" value="' + item.ContractTitle + '" />';
//                        article += '<label for="' + item.RowKey + '" class="css1-label">' + item.ContractTitle + '</label>';
//                        article += '</td>';
//                        article += '<td><label class="">' + item.ContractType + '</label></td>'
//                        article += '<td><label class="">'
//                        if (item.Counterparty != null && item.Counterparty != "") {
//                            article += item.Counterparty
//                        } else {
//                            article += "-"
//                        }
//                        article += '</label></td><td><label class="" style="word-break: break-all;">'
//                        if (item.ContractNumber != null && item.ContractNumber != "") {
//                            article += item.ContractNumber
//                        } else {
//                            article += "-"
//                        }
//                        article += '</label></td><td><label class="">' + item.Status + '</label></td>'
//                        article += '<td class="ddl"><td></tr>'
//                        $("#tblPopupContracts").append(article);
//                        relatedContractsTag.push(item.ContractTitle.trim());
//                        $("#" + item.RowKey).click(function () {
//                            if (this.checked) {
//                                var vOptions = "<select class='f_inpt width90'>";
//                                var jsLang = $("#ddlRelationshipTypeParent option:selected").val();
//                                var rela1 = jQuery.grep(RelationshipTypes, function (a) {
//                                    return a[1] === jsLang;
//                                });
//                                var rela2 = jQuery.grep(RelationshipTypes, function (a) {
//                                    return a[2].indexOf(jsLang) > -1;
//                                });
//                                if (rela1 != null && typeof (rela1) != "undefined" && rela1.length != 0) {
//                                    var Relationship = rela1[0];
//                                    $.each(Relationship[2], function (index, value) {
//                                        var optRel2 = value.toString();
//                                        vOptions += "<option value='" + optRel2 + "'>" + optRel2 + "</option>";
//                                    })
//                                }
//                                else if (rela2 != null && typeof (rela2) != "undefined" && rela2.length != 0) {
//                                    var Relationship = rela2[0];
//                                    vOptions += "<option value='" + Relationship[1] + "'>" + Relationship[1] + "</option>";
//                                }
//                                else {
//                                    switch (jsLang) {
//                                        case 'Master Agreement':
//                                            vOptions += '<option value="Sub-Agreement">Sub-Agreement</option>';
//                                            vOptions += '<option value="SOW">SOW</option>';
//                                            break;
//                                        case 'Sub-Agreement':
//                                        case 'SOW':
//                                            vOptions += '<option value="Master Agreement">Master Agreement</option>';
//                                            break;
//                                        case 'Prime Contractor Agreement':
//                                            vOptions += '<option value="Sub Contractor Agreement">Sub Contractor Agreement</option>';
//                                            break;
//                                        case 'Sub Contractor Agreement':
//                                            vOptions += '<option value="Prime Contractor Agreement">Prime Contractor Agreement</option>';
//                                            break;
//                                        case 'Blanket Agreement':
//                                            vOptions += '<option value="Order">Order</option>';
//                                            vOptions += '<option value="Invoice">Invoice</option>';
//                                            break;
//                                        case 'Order':
//                                        case 'Invoice':
//                                            vOptions += '<option value="Blanket Agreement">Blanket Agreement</option>';
//                                            break;
//                                        case 'Original':
//                                            vOptions += '<option value="Duplicate">Duplicate</option>';
//                                            vOptions += '<option value="Copy">Copy</option>';
//                                            break;
//                                        case 'Duplicate':
//                                        case 'Copy':
//                                            vOptions += '<option value="Original">Original</option>';
//                                            break;
//                                        case 'Past Contract':
//                                            vOptions += '<option value="Renegotiated Contract">Renegotiated Contract</option>';
//                                            break;
//                                        case 'Renegotiated Contract':
//                                            vOptions += '<option value="Past Contract">Past Contract</option>';
//                                            break;
//                                        case 'Primary Contract':
//                                            vOptions += '<option value="Amendment">Amendment</option>';
//                                            vOptions += '<option value="Modification">Modification</option>';
//                                            break;
//                                        case 'Amendment':
//                                        case 'Modification':
//                                            vOptions += '<option value="Primary Contract">Primary Contract</option>';
//                                            break;
//                                        case 'Other':
//                                            vOptions += '<option value="Other">Other</option>';
//                                            break;
//                                    }
//                                }

//                                vOptions += '</select>';
//                                $(this).parent().parent().children(".ddl").append(vOptions);

//                            } else {

//                                $(this).parent().parent().children(".ddl").empty();
//                            }

//                        });
//                    }
//                });

//                var vCount = $("#tblPopupContracts tr").length;
//                if (vCount != 0) {
//                    $('#compact-paginationRelatedContracts').pagination({
//                        items: vCount,
//                        itemsOnPage: 10,
//                        typeID: 'tblPopupContracts',
//                        cssStyle: 'compact-theme'
//                    });
//                } else {
//                    $('#loadContract').html('<p style="margin-left: 20px;">No items found.</p>')
//                }
//                $("#txtSearchBoxContract").autocomplete({
//                    source: relatedContractsTag,
//                    minLength: 2,
//                    focus: function (event, ui) {
//                        return false;
//                    },
//                    select: function (evn, uidetails) {
//                        $("#txtSearchBoxContract").val(uidetails.item.label);
//                        ViewContracts();
//                    }
//                });
//                $("#popupContracts").dialog("option", "title", "Related Contract Record(s)");
//                $("#popupContracts").dialog("open");
//                $("#loadingPage").fadeOut();
//            },
//            error: function () {
//                $('#loadMA').empty();
//                $('#loadMA').html('<p style="margin-left: 20px;">No items found.</p>');
//                $("#loadingPage").fadeOut();
//            }
//        });
//    } else {
//        $('#loadMA').empty();
//        $("#popupContracts").dialog("option", "title", "Related Contract Record(s)");
//        $("#popupContracts").dialog("open");
//        $("#loadingPage").fadeOut();
//    }

//    vContractID = getParameterByName("RequestID");
//    BindRelatedContractsPopup(vContractID);
//}

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
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + getParameterByName('RequestID') + '/relatedcontracts?relatedcontractid=' + relatedContractID,
                 type: 'DELETE',
                 dataType: 'json',
                 headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                 "Content-Type": "application/json",
                 cache: false,
                 success: function (data) {

                 }
             });

             $.ajax({
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + relatedContractID + '/relatedcontracts?relatedcontractid=' + getParameterByName('RequestID'),
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

function BindRelatedContractsPopup(contractid) {
    if (contractid == null || contractid == "") {
        contractid = vContractID;
    }
    $('#liSelected').empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/relatedcontracts?contractid=' + contractid,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (contactsJsonPayload) {
            var count = 0;
            $(contactsJsonPayload).each(function (i, item) {
                $('#liSelected').append('<span style="font-size:11px;" id=' + item.RelatedContractID + '>' + item.RelatedContractTitle + ' (' + item.RelatedRelationshipType + ') <img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveRelationship(this);" style="float:right" /></span>');
            });
        },
        error: function (request) {
        }
    });
}

function ViewContracts() {

    $('#loadContract').html('<img src="../Content/Images/icon/loading.gif"> Searching...');
    var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?stage=&searchkeyword=' + encodeURIComponent($("#txtSearchBoxContract").val()) + '&customquery=&sortbyfield=ContractTitle&orderby=ASC';
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
                if ($("#hdnRelatedContracts").text().indexOf(item.RowKey) > -1) { }
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
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + getParameterByName('RequestID') + '/relatedcontracts',
                type: 'POST',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                data: {
                    ContractID: getParameterByName('RequestID'),
                    ContractTitle: $("#lblContractTitle").text(),
                    RelatedContractID: vRelatedContractID,
                    RelatedContractTitle: vRelatedContractTitle,
                    RelationshipType: $("#ddlRelationshipTypeParent").find('option:selected').text(),
                    RelatedRelationshipType: vChildRelation,
                    CreatedBy: localStorage.UserName,
                    ModifiedBy: localStorage.UserName,
                },
                cache: false,
                success: function (person) {

                    swal("", "Related Contract Saved");
                    $("#popupContracts").dialog("close");
                    $("#loadingPage").fadeOut();
                    BindRelatedContracts();
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

function tabchange(object) {
    if (object.id == "tabTemplate") {
        $('input[type="radio"][name="IsStandard"][value="Yes"]').prop('checked', true);
        $("#tblNewDocument").css('display', '');
        $("#tblExistingDocument").css('display', 'none');
        $("#tblExistingDocumentSearch").css('display', 'none');
        $("#tblExistingDocumentPaging").css('display', 'none');
        $("#tabTemplate").addClass('form-active');
        $("#tabUpload").removeClass('form-active');
        $("#tabExistingDocument").removeClass('form-active');
        $("#docContract").removeClass('validelement');
        $("#ddlDocumentTemplate").addClass('validelement');
        $("#txtDocumentNameCreate").addClass('validelement');

        $("#trTemplate").css('display', '');
        $("#trTemplate1").css('display', '');
        $("#trDocumentType").css("display", "");
        $("#trFileUpload").css('display', 'none');
        $('input:checkbox[name=NotTaggedContract]').attr('checked', false);
        $("#hdnIsDocumentTag").text('');
        $("#formTitle").text('Create from Document Template');
        $("#divDoc1").css('display', '');
        $("#divDoc2").css('display', '');
        $("#linkAddValidity").css('display', '');

        $("#tabTemplate").addClass("document_active");
        $("#tabUpload").removeClass("document_active");
        $("#tabExistingDocument").removeClass("document_active");
        $("#btnDocAdd").html('<span class="ui-button-text">Create</span>')
        //manoj
        if ($("#ddlDocumentTemplate").find('option:selected').text() == "--Select--") {
            $("#tblContentControls").empty();
        }
        $("#tblContentControls").css('display', '');
        //$("#tblContentControls").empty();
        //manoj

    } else if (object.id == "tabUpload") {
        $('input[type="radio"][name="IsStandard"][value="No"]').prop('checked', true);

        $("#tblNewDocument").css('display', '');
        $("#tblExistingDocument").css('display', 'none');
        $("#tblExistingDocumentSearch").css('display', 'none');
        $("#tblExistingDocumentPaging").css('display', 'none');
        $("#tabUpload").addClass('form-active');
        $("#tabTemplate").removeClass('form-active');
        $("#tabExistingDocument").removeClass('form-active');
        $("#docContract").addClass('validelement');
        $("#ddlDocumentTemplate").removeClass('validelement');
        $("#txtDocumentNameCreate").removeClass('validelement');

        $("#trTemplate").css('display', 'none');
        $("#trTemplate1").css('display', 'none');
        $("#trDocumentType").css("display", "");
        $("#trFileUpload").css('display', '');
        $('input:checkbox[name=NotTaggedContract]').attr('checked', false);
        $("#hdnIsDocumentTag").text('');

        //manoj
        $("#tblContentControls").css('display', 'none');
        //manoj
        $("#formTitle").text('Upload from Computer');
        $("#divDoc1").css('display', '');
        $("#divDoc2").css('display', '');
        $("#linkAddValidity").css('display', '');

        $("#tabUpload").addClass("document_active");
        $("#tabTemplate").removeClass("document_active");
        $("#tabExistingDocument").removeClass("document_active");
        $("#btnDocAdd").html('<span class="ui-button-text">Upload</span>')
    }


    $('#dtValidFrom').val("");
    $('#dtValidTill').val("");
    $('#txtReminder1New').val("");
    $('#txtReminder2New').val("");
    $('#txtReminder3New').val("");
    $("#ddlReminder1New").find('option[value="before"]').prop("selected", true);
    $("#ddlReminder2New").find('option[value="before"]').prop("selected", true);
    $("#ddlReminder3New").find('option[value="before"]').prop("selected", true);
}

function onchangetemplate(ddlDocumentTemplate) {
    if (ddlDocumentTemplate.value != "0") {
        $('#txtDocumentNameCreate').val($("#ddlDocumentTemplate").find('option:selected').text());
        var value = $("#ddlDocumentTemplate").find('option:selected').val();
        value = value.split("~");
        if (value[1] == "") {
            $("#ddlDocumentTypeCreate").val("0");
        }
        else {
            if ($("#ddlDocumentTypeCreate").find(":contains('" + value[1] + "')").length > 0)  //eO310679
                $("#ddlDocumentTypeCreate").val(value[1]);
            else
                $("#ddlDocumentTypeCreate").val("0");
        }

        var strRequestID = getParameterByName("RequestID");
        if (strRequestID != "0") {
            getRequestData(strRequestID, 'tblContentControls', $("#ddlDocumentTemplate").find('option:selected').text())
            $("#lblTemplateDescription").text(hashtable[$("#ddlDocumentTemplate").val().split('~')[0].replace(/ /g, '')]);
        }

    } else {
        $('#txtDocumentNameCreate').val("");
        $('#tblContentControls').empty();
        $('#lblTemplateDescription').text("");
    }
}

function getRequestData(RequestID, tblCtrl, strDocumentTemplate) {
    //$('#spInProgress').css('display', '');
    $("#loadingPage").fadeIn();

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/IRequestDetails?requestid=' + RequestID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (mainmetadataFields) {
            //$('#spInProgress').css('display', 'none');
            var vMetadata = $(mainmetadataFields).find('Metadata');
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/requesttypes/metadatas?requesttypename=' + encodeURIComponent($("#lblRequestType").text()),
                type: 'GET',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                cache: false,
                success: function (metadataFieldsvaluetocheck) {
                    var metadataFieldsvalue = metadataFieldsvaluetocheck;

                    if (strDocumentTemplate != null) {
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/template?templatename=' + strDocumentTemplate,
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
                                    $("#" + tblCtrl).append("<tr><td width='100%' colspan='2' valign='top'><div class='form_categoryhead'>Auto Populate Fields</div></td></tr>");

                                    $(metadataFields).each(function (idata, item) {
                                        //for (var i = 0; i < datalenght; i++) {
                                        //var item = metadataFields[i];
                                        if (item.FieldName == "ContractType" || item.FieldName == "BusinessArea" || item.FieldName == "ContractTermType") {
                                        }
                                        else if (item.FieldName == "TransactionType") {
                                            vTransactionTypeExist = 'Yes';
                                        }
                                        else if (item.FieldName == "ContractClass") {
                                            vContractClassExist = 'Yes';
                                        }
                                        else {

                                            bindvaluetotemp = false;
                                            var vAccFeatmetadataFieldsvalue = $.grep(metadataFieldsvalue, function (nmetadata, imetadata) {
                                                return (nmetadata.FieldName == item.FieldName);
                                            });
                                            if (vAccFeatmetadataFieldsvalue.length > 0) {
                                                bindvaluetotemp = true;
                                            }


                                            if (bindvaluetotemp) {
                                                if (vAccFeatmetadataFieldsvalue[0] != undefined) {
                                                    var item = vAccFeatmetadataFieldsvalue[0];
                                                    var vControls = '<tr>';
                                                    //manoj
                                                    var vRequiredFields = false;
                                                    var onlydate = "";
                                                    var vDate = "";
                                                    var vUser = "";
                                                    var vNumber = "";
                                                    var vPhoneNumber = "";
                                                    var PhoneID = "";
                                                    var PhoneCountry = "";
                                                    var vEmail = "";
                                                    var vCurrency = "";
                                                    var vMultiDDL = "";
                                                    var vProject = false;
                                                    var vContractValue = false;
                                                    //var vControls = "";
                                                    var vMarginTop = "margin-top-8";
                                                    var vNumberD = "";
                                                    var vNumberP = "";
                                                    var vNumberPD = "";
                                                    //manoj
                                                    //var vDate = "";
                                                    //var onlydate = "";
                                                    //var vUser = "";
                                                    //var vNumber = "";
                                                    //var vCurrency = "";
                                                    //var vMultiDDL = "";
                                                    vControls += '<td class="f_head"><label>' + item.FieldDisplayName;
                                                    //manoj
                                                    if (item.Required == "true") {
                                                        vRequiredFields = true;
                                                        vControls += '<span class="text-red">*</span>';
                                                    } else {
                                                        vRequiredFields = false;
                                                    }
                                                    //manoj
                                                    if (item.FieldHelp == "true") {
                                                        vControls += "<img class='helpimg' src='../Content/Images/help_training.png' title='" + item.HelpText + "'></label>";
                                                    } else {
                                                        vControls += '</label>';
                                                    }

                                                    if (item.FieldType == "User") {
                                                        vControls += '</td><td class="f_list new-Doc-Multi">';
                                                    } else {
                                                        vControls += '</td><td class="f_list">';
                                                    }

                                                    if (item.FieldType == "Single Line Text") {
                                                        if (vRequiredFields) {
                                                            if ($(vMetadata).find(item.FieldName).text() != "") {
                                                                vControls += "<input type='text' id='" + item.FieldName + "' maxlength='100' name='" + item.FieldName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width80 validelement' />";
                                                            } else {
                                                                vControls += "<input type='text' id='" + item.FieldName + "' maxlength='100' name='" + item.FieldName + "' class='f_inpt width80 validelement' />";
                                                            }
                                                        } else {
                                                            if ($(vMetadata).find(item.FieldName).text() != "") {
                                                                vControls += "<input type='text' id='" + item.FieldName + "' maxlength='100' name='" + item.FieldName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width80' />";
                                                            } else {
                                                                vControls += "<input type='text' id='" + item.FieldName + "' maxlength='100' name='" + item.FieldName + "' class='f_inpt width80' />";
                                                            }
                                                        }
                                                    }
                                                    else if (item.FieldType == "Multi Line Text") {
                                                        var fieldnametobind = (item.FieldName == "Description") ? "RequestDescription" : item.FieldName;
                                                        if (vRequiredFields) {
                                                            if ($(vMetadata).find(item.FieldName).text() != "") {
                                                                vControls += "<textarea id='" + fieldnametobind + "' name='" + fieldnametobind + "' cols='40' rows='5' class='f_inpt width80 height70 validelement'>" + $(vMetadata).find(item.FieldName).text() + "</textarea>";
                                                            } else {
                                                                vControls += "<textarea id='" + item.FieldName + "' name='" + fieldnametobind + "' cols='40' rows='5' class='f_inpt width80 height70 validelement'></textarea>";
                                                            }
                                                        } else {
                                                            if ($(vMetadata).find(item.FieldName).text() != "") {
                                                                vControls += "<textarea id='" + fieldnametobind + "' name='" + fieldnametobind + "' cols='40' rows='5' class='f_inpt width80 height70'>" + $(vMetadata).find(item.FieldName).text() + "</textarea>";
                                                            } else {
                                                                vControls += "<textarea id='" + fieldnametobind + "' name='" + fieldnametobind + "' cols='40' rows='5' class='f_inpt width80 height70'></textarea>";
                                                            }
                                                        }
                                                    }
                                                    else if (item.FieldType == "Hyperlink") {
                                                        //manoj
                                                        //for Hyperlink
                                                        var hyperlinkURL = $(vMetadata).find(item.FieldName).text();
                                                        if (vRequiredFields) {
                                                            vControls += "<input type='text' id=" + item.FieldName + " maxlength='2083' name=" + item.FieldName + " placeholder='http://www.' value = '" + hyperlinkURL + "' class='f_inpt width80 validelement validwebsite'>";
                                                        } else {
                                                            vControls += "<input type='text' id=" + item.FieldName + " maxlength='2083' name=" + item.FieldName + " placeholder='http://www.' value = '" + hyperlinkURL + "' class='f_inpt width80 validwebsite'>";
                                                        }
                                                        vControls += '<a href="javascript:void(0)" class="linkText" title="' + item.FieldDisplayName + '" onclick="navigateurl(\'' + item.FieldName + '\')"> Navigate</a>';
                                                        //for Hyperlink
                                                        //manoj
                                                    }
                                                    else if (item.FieldType == "Date") {
                                                        var vv = $(vMetadata).find(item.FieldName).text();
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
                                                        if (item.Required == "true") {
                                                            vControls += "<input type='text' readonly  id='" + item.FieldName + "'  name='" + item.FieldName + "' class='f_date width40 form-contro-Date-Document validelement validdate fielddatecontrol " + item.FieldName + "'/>";
                                                        } else {
                                                            vControls += "<input type='text' readonly  id='" + item.FieldName + "'  name='" + item.FieldName + "' class='f_date width40 form-contro-Date-Document validdate fielddatecontrol " + item.FieldName + "'/>";
                                                        }
                                                        vDate = item.FieldName;
                                                    }
                                                    else if (item.FieldType == "Phone Number") {
                                                        var contractphonenumber = $(vMetadata).find(item.FieldName).text();
                                                        PhoneCountry = "";
                                                        if (contractphonenumber != "") {
                                                            if (item.Required == "true") {
                                                                vControls += "<input type='text' id=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + contractphonenumber.split(',')[2] + "'  class='form-contro validelement validPhone fieldphonecontrol' />";
                                                            } else {
                                                                vControls += "<input type='text' id=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + contractphonenumber.split(',')[2] + "' class='form-contro validPhone fieldphonecontrol' />";
                                                            }
                                                            PhoneCountry = contractphonenumber.split(',')[0];
                                                        }
                                                        else {
                                                            if (item.Required == "true") {
                                                                vControls += "<input type='text' id=" + item.FieldName + " title='" + item.FieldDisplayName + "'  class='form-contro validelement validPhone fieldphonecontrol' />";
                                                            } else {
                                                                vControls += "<input type='text' id=" + item.FieldName + " title='" + item.FieldDisplayName + "'  class='form-contro validPhone fieldphonecontrol' />";
                                                            }
                                                        }
                                                        vPhoneNumber = vControls;
                                                        PhoneID = item.FieldName;

                                                    }
                                                    else if (item.FieldType == "Choice") {
                                                        if (item.FieldName == "ContractTermType") {
                                                            if (item.Required == "true") {
                                                                vControls += "<select id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width82 validelement' onchange='changecontracttermtype(this)'>";
                                                            } else {
                                                                vControls += "<select id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width82' onchange='changecontracttermtype(this)'>";
                                                            }
                                                        } else {
                                                            if (item.Required == "true") {
                                                                vControls += "<select id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width82 validelement'>";
                                                            } else {
                                                                vControls += "<select id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width82'>";
                                                            }
                                                        }
                                                        vControls += "<option value='0'>--Select--</option>";
                                                        //manoj
                                                        if (item.FieldName == "ContractTermType") {
                                                            $.ajax({
                                                                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracttermtypesenabled',
                                                                type: 'GET',
                                                                dataType: 'json',
                                                                "Content-Type": "application/json",
                                                                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                                                                cache: false,
                                                                success: function (data) {
                                                                    $(data).each(function (iname, itemname) {
                                                                        TermTypeHelpText[itemname.ContractTermName] = itemname.HelpText;
                                                                        $("#" + item.FieldName).append("<option value='" + itemname.ContractTermName + "'>" + itemname.ContractTermDisplayName + "</option>");
                                                                    });
                                                                }
                                                            });
                                                        } else {
                                                            var myArray = [];
                                                            myArray = item.ChoiceValues.split("\n")
                                                            $(myArray).each(function (imyArray, itemmyArray) {
                                                                itemmyArray = itemmyArray.replace(/&amp;/g, "&");
                                                                if ($(vMetadata).find(item.FieldName).text() == itemmyArray) {
                                                                    vControls += "<option value='" + itemmyArray + "' selected>" + itemmyArray + "</option>";
                                                                } else {
                                                                    vControls += "<option value='" + itemmyArray + "'>" + itemmyArray + "</option>";
                                                                }
                                                            });
                                                        }
                                                        //manoj
                                                        vControls += '</select>';

                                                    }
                                                    else if (item.FieldType == "User") {
                                                        if (item.Required == "true") {
                                                            vControls += "<select id='" + item.FieldName + "' name='" + item.FieldName + "' multiple='multiple' class='f_inpt width82 validuser' title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
                                                        } else {
                                                            vControls += "<select id='" + item.FieldName + "' name='" + item.FieldName + "' multiple='multiple' class='f_inpt width82' title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
                                                        }

                                                        //vControls += "<option value='0'>--Select--</option>";
                                                        if (vUserList == '') {
                                                            vUserList = GetUserList();
                                                        }
                                                        vControls += vUserList;

                                                        vControls += '</select>';

                                                        vUser = item.FieldName;

                                                    } else if (item.FieldType == "Taxonomy") {
                                                        if (item.Required == "true") {
                                                            if ($(vMetadata).find(item.FieldName).text() != "") {
                                                                vControls += "<input type='text' id='" + item.FieldName + "' name='" + item.FieldName + "' value='" + $(vMetadata).find(item.FieldName).text().replace(/'/g, "&#39;") + "' class='f_inpt width80 validelement' readonly='readonly' type='text' />";
                                                            } else {
                                                                vControls += "<input type='text' id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width80 validelement' readonly='readonly' type='text' />";
                                                            }
                                                        } else {
                                                            if ($(vMetadata).find(item.FieldName).text() != "") {
                                                                vControls += "<input type='text' id='" + item.FieldName + "' name='" + item.FieldName + "' value='" + $(vMetadata).find(item.FieldName).text().replace(/'/g, "&#39;") + "' class='f_inpt width80' readonly='readonly' type='text' />";
                                                            } else {
                                                                vControls += "<input type='text' id='" + item.FieldName + "' name='" + item.FieldName + "' class='f_inpt width80' readonly='readonly' type='text' />";
                                                            }
                                                            vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width_91' readonly='readonly' type='text' />";
                                                        }

                                                        vControls += "<span class='right-float'><a href='javascript:void(0)' class='linkText' onclick='ViewBusinessArea()'> Browse</a></span>";
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
                                                                vbrowse = "<span class='right-float'><a href='javascript:void(0)' class='linkText' onclick='ViewCounterparty(\"" + item.FieldName + "\")'> Browse</a></span>";
                                                            }
                                                            var recounterparty = new RegExp("'", 'g');
                                                            if ($(vMetadata).find(item.FieldName).text() == "Counterparty not in the list") {
                                                                $("#chkCounterpartyNotInList").attr("checked", "checked");
                                                                $("#tblCounterparties").attr('disabled', 'disabled');
                                                            }
                                                            //manoj
                                                            if ($(vMetadata).find(item.FieldName).text() == "Counterparty not in the list") {
                                                                if (item.Required == "true") {
                                                                    vControls += "<input type='text' id='" + item.FieldName + "' name='" + item.FieldName + "' value='" + $(vMetadata).find(item.FieldName).text().replace(recounterparty, "&#39") + "' class='f_inpt width80 validelement' " + vreadonly + " type='text' />";
                                                                } else {
                                                                    vControls += "<input type='text' id='" + item.FieldName + "' name='" + item.FieldName + "' value='" + $(vMetadata).find(item.FieldName).text().replace(recounterparty, "&#39") + "' class='f_inpt width80' " + vreadonly + " type='text' />";
                                                                }
                                                            } else {
                                                                if (item.Required == "true") {
                                                                    vControls += "<input type='text' id='" + item.FieldName + "' name='" + item.FieldName + "' value='" + $(vMetadata).find(item.FieldName).text().replace(recounterparty, "&#39") + "' class='f_inpt width80 validelement' " + vreadonly + " type='text' />";
                                                                } else {
                                                                    vControls += "<input type='text' id='" + item.FieldName + "' name='" + item.FieldName + "' value='" + $(vMetadata).find(item.FieldName).text().replace(recounterparty, "&#39") + "' class='f_inpt width80' " + vreadonly + " type='text' />";
                                                                }
                                                            }
                                                            //manoj
                                                            //vControls += "<input type='text' id='" + item.FieldName + "' name='" + item.FieldName + "' value='" + $(vMetadata).find(item.FieldName).text().replace(recounterparty, "&#39") + "' class='f_inpt width80' " + vreadonly + " type='text' />";
                                                            vControls += vbrowse;
                                                        } else if (item.FieldName == "CompanyProfile") {
                                                            //if (item.Required == "true") {
                                                            //    vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " onchange='javascript:Removetextvalues()' class='f_inpt width80 validelement'>";
                                                            //} else {
                                                            //    vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " onchange='javascript:Removetextvalues()' class='f_inpt width80'>";
                                                            //}
                                                            //vControls += "<option value='0'>--Select--</option>";
                                                            //vControls += getcompanyprofile($(vMetadata).find(item.FieldName).text()) + "</select>";

                                                            var reLE = new RegExp("'", 'g');
                                                            var finalLE = '';
                                                            var LE = $(vMetadata).find(item.FieldName).text().replace(reLE, "&#39");
                                                            if (LE != "undefined" && LE != "" && LE != null) {
                                                                var AryLE = LE.split(';');

                                                                for (var j = 0; j < AryLE.length; j++) {
                                                                    if (finalLE == "")
                                                                        finalLE = AryLE[j].trim().replace(reLE, "&#39");
                                                                    else
                                                                        finalLE += "; " + AryLE[j].trim().replace(reLE, "&#39");
                                                                }

                                                            }
                                                            if (finalLE == "undefined")
                                                                finalLE = "";

                                                            if (item.Required == "true") {
                                                                // vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " onchange='javascript:Removetextvalues()' class='f_inpt width80 validelement'>";
                                                                vControls += "<input id=" + item.FieldName + " value='" + finalLE + "' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80 validelement' readonly='readonly' type='text' />";
                                                            } else {
                                                                // vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " onchange='javascript:Removetextvalues()' class='f_inpt width80'>";
                                                                vControls += "<input id=" + item.FieldName + " value='" + finalLE + "' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' readonly='readonly' class='f_inpt width80' type='text' />";
                                                            }
                                                            vControls += "<span class='right-float'><a href='javascript:void(0)' class='linkText' onclick='ViewLegalEntity()'> Browse</a></span>";

                                                        } else if (item.FieldName == "Status") {
                                                            if (item.Required == "true") {
                                                                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width80 validelement'>";
                                                            } else {
                                                                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width80'>";
                                                            }
                                                            vControls += "<option value='0'>--Select--</option>";
                                                            vControls += getStatus($(vMetadata).find(item.FieldName).text()) + "</select>";
                                                        } else if (item.FieldName == "ContractCurrency") {
                                                        } else if (item.FieldName == "Project") {
                                                            vProject = true;
                                                            if (item.Required == "true") {
                                                                vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width_91 validelement' readonly='readonly' type='text' />";
                                                            } else {
                                                                vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width_91' readonly='readonly' type='text' />";
                                                            }
                                                            vControls += "<a href='javascript:void(0)' class='linkText' onclick='ViewProjects()'> Browse</a>";
                                                        }
                                                        else if (item.FieldName == "RelatedContracts") {
                                                            if (item.Required == "true") {
                                                                vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text().replace(/'/g, "&#39;") + "' class='f_inpt width_91 validelement' readonly='readonly' type='text' />";
                                                            } else {
                                                                vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text().replace(/'/g, "&#39;") + "' class='f_inpt width_91' readonly='readonly' type='text' />";
                                                            }

                                                            vControls += "<a href='javascript:void(0)' class='linkText' onclick='AddRelatedContracts(true)'> Browse</a>";
                                                        }

                                                            //manoj
                                                        else if (item.FieldName == "OriginatingParty") {
                                                            if (item.Required == "true") {
                                                                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width_91 validelement' readonly='readonly' type='text' />";
                                                            } else {
                                                                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width_91' readonly='readonly' type='text' />";
                                                            }
                                                            if ($(vMetadata).find(item.FieldName).text() == "") {
                                                            } else {
                                                                $("#txtOriginatingPartyType").val($(vMetadata).find("OriginatingPartyType").text());
                                                                if ($(vMetadata).find("OriginatingPartyType").text() == "Counterparty") {
                                                                    SelectCounterparties();
                                                                }
                                                            }
                                                            vControls += "<a href='javascript:void(0)' class='linkText' onclick='ViewOriginatingParty()'> Browse</a></div>";
                                                        }
                                                        else if (item.FieldName == "ContractType") {
                                                            if (item.Required == "true") {
                                                                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width80 validelement'>";
                                                            } else {
                                                                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width80'>";
                                                            }
                                                            vControls += "<option value='0'>--Select--</option>";
                                                            vControls += getContractType($(vMetadata).find(item.FieldName).text()) + "</select>";
                                                        } else {
                                                            vControls += '<div class="col6 m12">';
                                                            if (item.Required == "true") {
                                                                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80 validelement'>";
                                                            } else {
                                                                vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80'>";
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
                                                                    var datacustomlookup = data.LookupFields.split(';');
                                                                    datacustomlookup = datacustomlookup.sort();
                                                                    datacustomlookup = sortArrOfObjectsByParam(datacustomlookup);
                                                                    $(datacustomlookup).each(function (icustom, itemcustom) {
                                                                        if ($.trim(itemcustom) != "") {
                                                                            if (itemcustom == $(vMetadata).find(item.FieldName).text()) {
                                                                                $("#" + item.FieldName).append("<option value='" + itemcustom + "' selected='selected'>" + itemcustom + "</option>")
                                                                            } else {
                                                                                $("#" + item.FieldName).append("<option value='" + itemcustom + "'>" + itemcustom + "</option>")
                                                                            }
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                        //manoj

                                                    } else if (item.FieldType.indexOf("Dropdown") > -1 || item.FieldType.indexOf("Multi Select") > -1) {
                                                        if (item.FieldType.indexOf("Dropdown") > -1) {
                                                            if (item.Required == "true") {
                                                                vControls += "<select id=" + item.FieldName + " multiple='multiple' class='f_inpt width82 chosenmulti validuser' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
                                                            } else {
                                                                vControls += "<select id=" + item.FieldName + " multiple='multiple' class='f_inpt width82 chosenmulti' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
                                                            }
                                                            var vMultiDDL1 = "";
                                                            if (vMultiDDL1 == '') {
                                                                var myArray = [];
                                                                myArray = item.ChoiceValues.split("\n")
                                                                var myArraylength = myArray.length;
                                                                $(myArray).each(function (imyArray, itemmyArray) {
                                                                    //for (var i = 0; i < myArraylength; i = i + 1) {
                                                                    vMultiDDL1 += "<option value='" + itemmyArray + "'>" + itemmyArray + "</option>";
                                                                    //}
                                                                });
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
                                                                    vbrowse = "<span class='right-float'><a href='javascript:void(0)' class='linkText' onclick='ViewCounterparty(\"" + item.FieldName + "\")'> Browse</a></span>";
                                                                }
                                                                var recounterparty = new RegExp("'", 'g');
                                                                if ($(vMetadata).find(item.FieldName).text() == "Counterparty not in the list") {
                                                                    $("#chkCounterpartyNotInList").attr("checked", "checked");
                                                                    $("#tblCounterparties").attr('disabled', 'disabled');
                                                                }
                                                                //manoj
                                                                if ($(vMetadata).find(item.FieldName).text() == "Counterparty not in the list") {
                                                                    if (item.Required == "true") {
                                                                        vControls += "<input type='text' id='" + item.FieldName + "' name='" + item.FieldName + "' value='" + $(vMetadata).find(item.FieldName).text().replace(recounterparty, "&#39") + "' class='f_inpt width80 validelement' " + vreadonly + " type='text' />";
                                                                    } else {
                                                                        vControls += "<input type='text' id='" + item.FieldName + "' name='" + item.FieldName + "' value='" + $(vMetadata).find(item.FieldName).text().replace(recounterparty, "&#39") + "' class='f_inpt width80' " + vreadonly + " type='text' />";
                                                                    }
                                                                } else {
                                                                    if (item.Required == "true") {
                                                                        vControls += "<input type='text' id='" + item.FieldName + "' name='" + item.FieldName + "' value='" + $(vMetadata).find(item.FieldName).text().replace(recounterparty, "&#39") + "' class='f_inpt width80 validelement' " + vreadonly + " type='text' />";
                                                                    } else {
                                                                        vControls += "<input type='text' id='" + item.FieldName + "' name='" + item.FieldName + "' value='" + $(vMetadata).find(item.FieldName).text().replace(recounterparty, "&#39") + "' class='f_inpt width80' " + vreadonly + " type='text' />";
                                                                    }
                                                                }
                                                                //manoj
                                                                //vControls += "<input type='text' id='" + item.FieldName + "' name='" + item.FieldName + "' value='" + $(vMetadata).find(item.FieldName).text().replace(recounterparty, "&#39") + "' class='f_inpt width80' " + vreadonly + " type='text' />";
                                                                vControls += vbrowse;
                                                            }
                                                            else {
                                                                if (item.Required == "true") {
                                                                    vControls += "<select id=" + item.FieldName + " multiple='multiple' class='f_inpt width82 chosenmulti validuser' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
                                                                } else {
                                                                    vControls += "<select id=" + item.FieldName + " multiple='multiple' class='f_inpt width82 chosenmulti' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
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
                                                                            $(datalength1).each(function (idatalength1, itemdatalength1) {
                                                                                //var datalength = datalength1.length;
                                                                                //for (var i = 0; i < datalength; i++) {
                                                                                //var itemname = datalength1[i];
                                                                                vMultiDDL1 += "<option value='" + itemdatalength1 + "'>" + itemdatalength1 + "</option>";
                                                                                //}
                                                                            });
                                                                        }
                                                                    });
                                                                }
                                                                vControls += vMultiDDL1;
                                                                vControls += '</select>';
                                                                vMultiDDL = item.FieldName;
                                                            }

                                                        }
                                                    } else if (item.FieldType == "Currency" || item.FieldType == "Value / Financials") {
                                                        if (item.FieldName == "ContractValue") {
                                                            vContractValue = true;
                                                        }
                                                        var Currencyvaluetobind = ($(vMetadata).find(item.FieldName).text() != null && $(vMetadata).find(item.FieldName).text() != "") ? $(vMetadata).find(item.FieldName).text() : "0";
                                                        if (item.Required == "true") {
                                                            vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + Currencyvaluetobind + "' class='f_inpt width80 validelement' />";
                                                        } else {
                                                            vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + Currencyvaluetobind + "' class='f_inpt width80' />";
                                                        }
                                                        vCurrency = item.FieldName;
                                                    } else if (item.FieldType == "Number") {
                                                        if (item.Required == "true") {
                                                            if ($(vMetadata).find(item.FieldName).text() == "") {
                                                                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80 validelement' />";
                                                            } else {
                                                                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width80 validelement' />";
                                                            }
                                                        } else {
                                                            if ($(vMetadata).find(item.FieldName).text() == "") {
                                                                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80' />";
                                                            } else {
                                                                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width80' />";
                                                            }

                                                        }
                                                        vNumber = item.FieldName;
                                                    }
                                                    else if (item.FieldType == "Number-D") {
                                                        if (item.Required == "true") {
                                                            if ($(vMetadata).find(item.FieldName).text() == "") {
                                                                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80 validelement' />";
                                                            } else {
                                                                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width80 validelement' />";
                                                            }
                                                        } else {
                                                            if ($(vMetadata).find(item.FieldName).text() == "") {
                                                                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80' />";
                                                            } else {
                                                                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width80' />";
                                                            }

                                                        }
                                                        vNumberD = item.FieldName;
                                                    }
                                                        //Percent
                                                    else if (item.FieldType == "Number-P") {
                                                        if (item.Required == "true") {
                                                            if ($(vMetadata).find(item.FieldName).text() == "") {
                                                                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80 validelement' />";
                                                            } else {
                                                                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width80 validelement' />";
                                                            }
                                                        } else {
                                                            if ($(vMetadata).find(item.FieldName).text() == "") {
                                                                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80' />";
                                                            } else {
                                                                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width80' />";
                                                            }

                                                        }
                                                        vControls += '<label class="margin-top-8">' + '%' + '</label>';
                                                        vNumberP = item.FieldName;
                                                    }
                                                        //Percent Decimal
                                                    else if (item.FieldType == "Number-PD") {
                                                        if (item.Required == "true") {
                                                            if ($(vMetadata).find(item.FieldName).text() == "") {
                                                                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80 validelement' />";
                                                            } else {
                                                                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width80 validelement' />";
                                                            }
                                                        } else {
                                                            if ($(vMetadata).find(item.FieldName).text() == "") {
                                                                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80' />";
                                                            } else {
                                                                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width80' />";
                                                            }

                                                        }
                                                        vControls += '<label class="margin-top-8">' + '%' + '</label>';
                                                        vNumberPD = item.FieldName;
                                                    }
                                                    else if (item.FieldType == "Yes/No") {
                                                        var contractvaluetobind = ($(vMetadata).find(item.FieldName).text()) ? $(vMetadata).find(item.FieldName).text() : "";
                                                        //if ($(vMetadata).find(item.FieldName).text() == "") {
                                                        //    vControls += "	<input type='radio' name=" + item.FieldName + " value='Yes'>Yes ";
                                                        //    vControls += "	<input type='radio' name=" + item.FieldName + " checked value='No'>No";
                                                        //} else if ($(vMetadata).find(item.FieldName).text() == "Yes") {
                                                        //    vControls += "	<input type='radio' name=" + item.FieldName + " checked value='Yes'>Yes ";
                                                        //    vControls += "	<input type='radio' name=" + item.FieldName + " value='No'>No";
                                                        //} else if ($(vMetadata).find(item.FieldName).text() == "No") {
                                                        //    vControls += "	<input type='radio' name=" + item.FieldName + " value='Yes'>Yes ";
                                                        //    vControls += "	<input type='radio' name=" + item.FieldName + " checked value='No'>No";
                                                        //}

                                                        if (contractvaluetobind == "Yes") {
                                                            vControls += "	<input type='radio' name=" + item.FieldName + " id='Yes" + item.FieldName + "'  checked value='Yes' onchange='changeYesNoField(this);'>Yes ";
                                                            vControls += "	<input type='radio' name=" + item.FieldName + " id='No" + item.FieldName + "' value='No' onchange='changeYesNoField(this);'>No";
                                                        }
                                                        else if (contractvaluetobind == "No") {
                                                            vControls += "	<input type='radio' name=" + item.FieldName + " id='Yes" + item.FieldName + "' value='Yes' onchange='changeYesNoField(this);'> Yes ";
                                                            vControls += "	<input type='radio' name=" + item.FieldName + " id='No" + item.FieldName + "' checked value='No' onchange='changeYesNoField(this);'> No";
                                                        }
                                                        else {
                                                            vControls += "	<input type='radio' name=" + item.FieldName + " id='Yes" + item.FieldName + "' value='Yes' onchange='changeYesNoField(this);'>Yes ";
                                                            vControls += "	<input type='radio' name=" + item.FieldName + " id='No" + item.FieldName + "' checked value='No' onchange='changeYesNoField(this);'>No";
                                                        }

                                                        vControls += "	<input type='hidden' id='hdnYes" + item.FieldName + "' value=" + item.CommentYes + " />";
                                                        vControls += "	<input type='hidden' id='hdnNo" + item.FieldName + "' value=" + item.CommentNo + " />";
                                                        vControls += "	<input type='hidden' id='hdnRequired" + item.FieldName + "' value=" + item.CommentRequired + " />";
                                                        vControls += "	<input type='hidden' id='hdnHelpText" + item.FieldName + "' value='" + item.HelpText + "' />";
                                                        //vControls += '<label class="col12 p-text text-left help">' + item.Description + '</label>';

                                                        if (item.CommentNo == "true" && item.CommentYes != "true") {
                                                            vControls += '</td></tr>';

                                                            if (item.CommentRequired == "true") {
                                                                vControls += '<tr><td class="f_head"><label style="word-break: break-all;">Add a Comment <span class="text-red">*</span></label>';
                                                            }
                                                            else {
                                                                vControls += '<tr><td class="f_head"><label style="word-break: break-all;">Add a Comment </label>';
                                                            }
                                                            vControls += "<img class='helpimg' src='../Content/Images/help_training.png' title='" + item.HelpText + "'></label></td>"
                                                            vControls += '<td class="f_list width50">';
                                                            if (item.CommentRequired == "true") {
                                                                if (contractvaluetobind == "No") {
                                                                    var valueField = "CustomCMD" + item.FieldName;
                                                                    vControls += "<textarea id='CustomCMD" + item.FieldName + "' name='CustomCMD" + item.FieldName + "' maxlength='500' title='" + item.FieldName + "' cols='40' rows='5' class='f_inpt width80 height70' validelement' value='" + $(vMetadata).find(valueField).text() + "'>" + $(vMetadata).find(valueField).text() + "</textarea>";
                                                                }
                                                                else {
                                                                    vControls += "<textarea id='CustomCMD" + item.FieldName + "' name='CustomCMD" + item.FieldName + "' maxlength='500' title='" + item.FieldName + "' cols='40' rows='5' class='f_inpt width80 height70' validelement'></textarea>";
                                                                }

                                                            } else {
                                                                if (contractvaluetobind == "No") {
                                                                    var valueField = "CustomCMD" + item.FieldName;
                                                                    vControls += "<textarea id='CustomCMD" + item.FieldName + "' name='CustomCMD" + item.FieldName + "' maxlength='500' title='" + item.FieldName + "' cols='40' rows='5' class='f_inpt width80 height70' value='" + $(vMetadata).find(valueField).text() + "'>" + $(vMetadata).find(valueField).text() + "</textarea>";
                                                                }
                                                                else {
                                                                    vControls += "<textarea id='CustomCMD" + item.FieldName + "' name='CustomCMD" + item.FieldName + "' maxlength='500' title='" + item.FieldName + "' cols='40' rows='5' class='f_inpt width80 height70'></textarea>";
                                                                }
                                                            }
                                                            //vControls += '</div></div>';
                                                        }
                                                        else if (item.CommentNo != "true" && item.CommentYes == "true") {

                                                            vControls += '</td></tr>';

                                                            if (item.CommentRequired == "true") {
                                                                vControls += '<tr><td class="f_head"><label style="word-break: break-all;">Add a Comment <span class="text-red">*</span></label>';
                                                            }
                                                            else {
                                                                vControls += '<tr><td class="f_head"><label style="word-break: break-all;">Add a Comment </label>';
                                                            }
                                                            vControls += "<img class='helpimg' src='../Content/Images/help_training.png' title='" + item.HelpText + "'></label></td>"
                                                            vControls += '<td class="f_list width50">';
                                                            if (item.CommentRequired == "true") {
                                                                if (contractvaluetobind == "Yes") {
                                                                    var valueField = "CustomCMD" + item.FieldName;
                                                                    vControls += "<textarea id='CustomCMD" + item.FieldName + "' name='CustomCMD" + item.FieldName + "' maxlength='500' title='" + item.FieldName + "' cols='40' rows='5' class='f_inpt width80 height70' validelement' value='" + $(vMetadata).find(valueField).text() + "'>" + $(vMetadata).find(valueField).text() + "</textarea>";
                                                                }
                                                                else {
                                                                    vControls += "<textarea id='CustomCMD" + item.FieldName + "' name='CustomCMD" + item.FieldName + "' maxlength='500' title='" + item.FieldName + "' cols='40' rows='5' class='f_inpt width80 height70' validelement'></textarea>";
                                                                }

                                                            } else {
                                                                if (contractvaluetobind == "Yes") {
                                                                    var valueField = "CustomCMD" + item.FieldName;
                                                                    vControls += "<textarea id='CustomCMD" + item.FieldName + "' name='CustomCMD" + item.FieldName + "' maxlength='500' title='" + item.FieldName + "' cols='40' rows='5' class='f_inpt width80 height70' value='" + $(vMetadata).find(valueField).text() + "'>" + $(vMetadata).find(valueField).text() + "</textarea>";
                                                                }
                                                                else {
                                                                    vControls += "<textarea id='CustomCMD" + item.FieldName + "' name='CustomCMD" + item.FieldName + "' maxlength='500' title='" + item.FieldName + "' cols='40' rows='5' class='f_inpt width80 height70'></textarea>";
                                                                }

                                                            }
                                                        }
                                                        else if (item.CommentNo == "true" && item.CommentYes == "true") {
                                                            var valueField = "CustomCMD" + item.FieldName;
                                                            vControls += '</td></tr>';

                                                            if (item.CommentRequired == "true") {
                                                                vControls += '<tr><td class="f_head"><label style="word-break: break-all;">Add a Comment <span class="text-red">*</span></label>';
                                                            }
                                                            else {
                                                                vControls += '<tr><td class="f_head"><label style="word-break: break-all;">Add a Comment </label>';
                                                            }
                                                            vControls += "<img class='helpimg' src='../Content/Images/help_training.png' title='" + item.HelpText + "'></label></td>"
                                                            vControls += '<td class="f_list width50">';
                                                            if (item.CommentRequired == "true") {
                                                                vControls += "<textarea id='CustomCMD" + item.FieldName + "' name='CustomCMD" + item.FieldName + "' maxlength='500' title='" + item.FieldName + "' cols='40' rows='5' class='f_inpt width80 height70' validelement' value='" + $(vMetadata).find(valueField).text() + "'>" + $(vMetadata).find(valueField).text() + "</textarea>";
                                                            } else {
                                                                vControls += "<textarea id='CustomCMD" + item.FieldName + "' name='CustomCMD" + item.FieldName + "' maxlength='500' title='" + item.FieldName + "' cols='40' rows='5' class='f_inpt width80 height70' value='" + $(vMetadata).find(valueField).text() + "'>" + $(vMetadata).find(valueField).text() + "</textarea>";
                                                            }
                                                        }

                                                    } else if (item.FieldType == "Email") {
                                                        if (item.Required == "true") {
                                                            if ($(vMetadata).find(item.FieldName).text() == "") {
                                                                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80 validemail validelement' />";
                                                            } else {
                                                                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width80 validemail validelement' />";
                                                            }
                                                        } else {
                                                            if ($(vMetadata).find(item.FieldName).text() == "") {
                                                                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80' />";
                                                            } else {
                                                                vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width80' />";
                                                            }
                                                        }
                                                    }
                                                        //manoj
                                                    else if (item.FieldType.indexOf("Browse") > -1) {
                                                        if ($(vMetadata).find(item.FieldName).text() == "") {
                                                            if (item.Required == "true") {
                                                                vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80 validelement' readonly='readonly' type='text' />";
                                                            } else {
                                                                vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width80' readonly='readonly' type='text' />";
                                                            }
                                                        } else {
                                                            if (item.Required == "true") {
                                                                vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width80 validelement' readonly='readonly' type='text' />";
                                                            } else {
                                                                vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width80' readonly='readonly' type='text' />";
                                                            }
                                                        }
                                                        vControls += "<a href='javascript:void(0)' class='linkText' id='" + item.FieldDisplayName + "' title='" + item.FieldName + "' onclick='ViewGeneric(this)'> Browse</a>";
                                                    }
                                                    //manoj
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
                                                    if (vPhoneNumber != "") {
                                                        bindPhoneNumberEdit(PhoneID, PhoneCountry);
                                                        vPhoneNumber = "";
                                                        PhoneID = "";
                                                        PhoneCountry = "";
                                                    }
                                                    if (vUser != "") {
                                                        $("#" + vUser + "").chosen().trigger("chosen:updated");
                                                        $('.chosenmulti').on('chosen:showing_dropdown', function (evt, params) {
                                                            $('.result-selected').css('display', 'none');
                                                        });
                                                        $("#" + vUser + "").chosen();
                                                        if ($(vMetadata).find(item.FieldName).text() != "") {
                                                            GetValuesAndAutoPopulate(vUser, $(vMetadata).find(item.FieldName).text());
                                                        }
                                                        vUser = "";
                                                    }
                                                    if (vCurrency != "") {
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

                                                        if ($(vMetadata).find(vMultiDDL).text() != "") {
                                                            GetValuesAndAutoPopulate(vMultiDDL, $(vMetadata).find(vMultiDDL).text());
                                                        }
                                                        vMultiDDL = "";
                                                    }
                                                    //manoj

                                                    //If project is added, add project task to create form
                                                    if (vProject) {
                                                        vControls = '<tr><td class="f_head"><label>Project Tasks<span class="text-red">*</span></label></td><td class="f_list">';
                                                        vControls += "<input id='ProjectTask' name='ProjectTask' title='Project Task' value='" + $(vMetadata).find("ProjectTask").text() + "' class='form-contro width80 validelement' readonly='readonly' type='text' />";
                                                        vControls += "<a href='javascript:void(0)' class='linkText' onclick='ViewProjectTasks()'> Browse</a></td></tr>";
                                                        $("#" + tblCtrl + "").append(vControls);
                                                        vProject = false;
                                                    }

                                                    //Bind Contract Currency Format
                                                    if (vContractValue) {
                                                        vControls = '<tr><td class="f_head"><label>Contract Currency</label></td><td class="f_list">';
                                                        vControls += "<select id='ContractCurrency' name='ContractCurrency' title='Contract Currency' class='form-contro'>";
                                                        vControls += "<option value='0'>--Select--</option>";
                                                        vControls += getContractCurrency($(vMetadata).find("ContractCurrency").text()) + "</select></td></tr>";
                                                        $("#" + tblCtrl + "").append(vControls);
                                                        vContractValue = false;
                                                    }

                                                    //manoj
                                                }
                                            }
                                        }
                                        //}
                                    });
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
                                $("#loadingPage").fadeOut();
                            },
                            error:
                                function (contractfields) {
                                    $("#tblContentControls").empty();
                                    // $('#spInProgress').css('display', 'none');
                                    $("#loadingPage").fadeOut();
                                }
                        });
                    } else {
                        $("#tblContentControls").empty();
                        //$('#spInProgress').css('display', 'none');
                        $("#loadingPage").fadeOut();
                    }
                }
            });
        },
        error:
            function (contractfields) {
                $("#tblContentControls").empty();
                // $('#spInProgress').css('display', 'none');
                $("#loadingPage").fadeOut();
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


function getQueryStringFromValue(url, name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(url);
    return results == null ? url : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var droppedControls = 0;
function readfiles(files) {
    var documentidcount = "";
    var filelistexit = "";
    var unvalidfile = "";
    var FileList = "";
    var rejectedfile = '';
    var vControl = "";
    var controluploadsetion = "";
    var lesscharfilename = "";
    var uploingsectionid = 1;
    var dropexitfilenamevalue = "";
    var fileslength = files.length;
    if (document.getElementById("tbBulkControls").rows.length > 0) {
        droppedControls = document.getElementById("tbBulkControls").rows.length - 1;
        uploingsectionid = document.getElementById("tbBulkControls").rows.length;
    }
    for (var i = 0; i < fileslength; i++) {
        var file = files[i];
        var acceptExtension = ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'dotx', 'xps', 'rtf', 'odt', 'dotm', 'docm', 'msg', 'tif', 'tiff', 'csv', 'ZIP', 'zip'];
        var ext = file.name.split('.').pop().toString();
        if (acceptExtension.indexOf(ext.trim().toLowerCase()) > -1) {
            if ('size' in file) {
                var Filelengthcol = Math.round((file.size / 1048576));
                if (Filelengthcol > (Math.round(parseInt(localStorage.MaxRequestLength) / 1000))) {
                    if (FileList == "") {
                        FileList = files[i].name;
                    } else {
                        FileList += "," + files[i].name;
                    }
                    var index = droppedfiles.indexOf(files[i]);
                    if (index > -1) {
                        droppedfiles.splice(index, 1);
                    }
                } else if (dropexitfilename.indexOf(files[i].name) > -1) {
                    if (dropexitfilenamevalue == "") {
                        dropexitfilenamevalue = files[i].name;
                    } else {
                        dropexitfilenamevalue += "," + files[i].name;
                    }
                    var index = droppedfiles.lastIndexOf(files[i]);
                    if (index > -1) {
                        droppedfiles.splice(index, 1);
                    }
                }
                else {
                    if (IsFileValid(files[i].name)) {
                        var headerid = document.getElementById('lblRequestTitle').innerHTML;
                        var finalurl = "";
                        finalurl = '/requestdocuments/';
                        var isNameValid = isSpecialCharacterFileName(files[i].name.substr(0, files[i].name.lastIndexOf('.')));
                        var isExists = true;
                        if (isNameValid == true) {
                            isExists = CheckDocumentExist(finalurl, files[i].name)
                        }
                        if (!isExists && isNameValid && (isContainsThreeAlphabets(files[i].name.substr(0, files[i].name.lastIndexOf('.'))))) {
                            if (droppedControls == 0) {
                                vControl += "<thead><tr class='bulknocolor'>";
                                vControl += "<th width='30%'> Document Name";
                                vControl += "</th>";
                                vControl += "<th width='30%'> Description";
                                vControl += "</th>";
                                vControl += "<th width='25%'> Document Type";
                                vControl += "</th>";
                                vControl += "<th  width='25%' style='display:none;'> Document Path";
                                vControl += "</th>";
                                vControl += "<th  width='25%'>Upload Status";
                                vControl += "</th>";
                                vControl += "<th style='display:none;'></th></tr></thead>";
                            }
                            var trid = 'tr_' + droppedControls + '';
                            var vContractTitle = 'ContractTitle_' + droppedControls + '';
                            var docid = 'ddlDocumentType_' + droppedControls + '';
                            var vDocumentPath = 'PathContractTitle_' + droppedControls + '';
                            var vDocumentPathLabel = 'LabelPathContractTitle_' + droppedControls + '';
                            var checkboxid = 'chkbx_' + droppedControls + '';


                            vControl += "<tr id=" + trid + ">";
                            vControl += "<td width='30%'><label class='width60' title='date field'>" + files[i].name + "</label>";
                            vControl += "</td>";
                            vControl += "<td width='30%'><input id='txtdescription'" + i + "' name='txtdescription'" + i + " class='f_inpt width60' type='text' placeholder='Description'' />";
                            vControl += "<td width='30%'>";
                            vControl += "<select id=" + docid + " name=" + docid + " class='f_inpt width60'>";
                            vControl += "<option value='0'>--Select--</option></td>";
                            vControl += "<td width='25%' style='display:none;'>";
                            vControl += "<input id=" + vDocumentPath + " style='display:none;' class='width60' readonly type='text' value='" + finalurl + "' name=" + vDocumentPath + ">";
                            vControl += "<label id=" + vDocumentPathLabel + "> " + finalurl + " </label>";
                            vControl += "</td>";
                            vControl += "<td style='display:none;'><img src='../Content/Images/Icon/delete.png' title='Remove' onclick='deleteDoc(" + trid + ");' style='float:right; padding-top:7px; cursor:pointer;'></td>"
                            vControl += '<td><span id="idLoading' + uploingsectionid + '" style="font-size:14px; margin-right:10px;display:none;"><img src="../Content/Images/loading.gif" /> Uploading Documents...</span><span id="idLoadingstart' + uploingsectionid + '" style="font-size:14px; margin-right:10px;">Start</span><span id="idLoadingcomplete' + uploingsectionid + '" style="font-size:14px; margin-right:10px;display:none;">Uploaded</span></td></tr>';
                            documentidcount += ";" + docid;
                            droppedControls++;
                            uploingsectionid++;
                            dropexitfilename.push(files[i].name);
                        }
                        else {
                            if (!isNameValid) {
                                if (unvalidfile == "") {
                                    unvalidfile = files[i].name;
                                }
                                else {
                                    unvalidfile += "," + files[i].name;
                                }
                            }
                            else if (isExists) {
                                if (filelistexit == "") {
                                    filelistexit = files[i].name;
                                }
                                else {
                                    filelistexit += "," + files[i].name;
                                }
                            } else {
                                if (lesscharfilename == "") {
                                    lesscharfilename = files[i].name;
                                } else {
                                    lesscharfilename += "," + files[i].name;
                                }
                            }
                            var index = droppedfiles.indexOf(files[i]);
                            if (index > -1) {
                                droppedfiles.splice(index, 1);
                            }
                        }
                    }
                }
            }
        }
        else {
            if (rejectedfile == "") {
                rejectedfile = files[i].name;
            } else {
                rejectedfile += "," + files[i].name;
            }
            var index = droppedfiles.indexOf(files[i]);
            if (index > -1) {
                droppedfiles.splice(index, 1);
            }
        }
    }
    if (FileList != null && FileList != "") {
        //swal("", "The maximum permissible size is " + Math.round(parseInt(localStorage.MaxRequestLength) / 1024) + " MB, Please upload a file which is less than " + Math.round(parseInt(localStorage.MaxRequestLength) / 1024) + " MB");
        swal("", "File exceeds " + Math.round((parseInt(localStorage.MaxRequestLength) / 1000)) + "MB size limit.");
        if (droppedfiles.length <= 0) {
            $("#tbBulkControls").empty();
            $("#file").empty();
            dropexitfilename = [];
            droppedfiles = [];
            opmlFile = null;
            droppedControls = 0;
            $("#lblFilesCount").text(droppedfiles + " file(s) uploaded.")
            loadinffdfdsf = 1;

        }
        FileList = "";
    }

    else {
        var alertvalue = "";
        if (filelistexit != null && filelistexit != "") {
            alertvalue = filelistexit + " already exists";
        }
        if (unvalidfile != null && unvalidfile != "") {
            if ((rejectedfile == null || rejectedfile == "") && (lesscharfilename == null || lesscharfilename == "") && (dropexitfilenamevalue == null && dropexitfilenamevalue == "") && (alertvalue == null || alertvalue == ""))
                alertvalue = unvalidfile + " File(s) names can't contain the following characters /:*\\?\"<>|#%";
            else if ((rejectedfile == null || rejectedfile == "") && (lesscharfilename == null || lesscharfilename == "") && (dropexitfilenamevalue == null && dropexitfilenamevalue == "")) {
                alertvalue += " and " + unvalidfile + " File(s) names can't contain the following characters /:*\\?\"<>|#%";
            } else {
                alertvalue += ", " + unvalidfile + " File(s) names can't contain the following characters /:*\\?\"<>|#%";
            }
        }

        if (rejectedfile != null && rejectedfile != "") {
            if ((lesscharfilename == null || lesscharfilename == "") && (dropexitfilenamevalue == null && dropexitfilenamevalue == "") && (alertvalue == null || alertvalue == ""))
                alertvalue = rejectedfile + " File(s) are not allowed";
            else if ((lesscharfilename == null || lesscharfilename == "") && (dropexitfilenamevalue == null && dropexitfilenamevalue == "")) {
                alertvalue += " and " + rejectedfile + " File(s) are not allowed";
            } else {
                alertvalue += ", " + rejectedfile + " File(s) are not allowed";
            }
        }

        if (lesscharfilename != null && lesscharfilename != "") {
            if ((dropexitfilenamevalue == null && dropexitfilenamevalue == "") && (alertvalue == null || alertvalue == ""))
                alertvalue = lesscharfilename + " File(s) names should contain the minimum of 3 alphabets";
            else if ((dropexitfilenamevalue == null && dropexitfilenamevalue == "")) {
                alertvalue += " and " + lesscharfilename + " File(s) names should contain the minimum of 3 alphabets";
            } else {
                alertvalue += ", " + lesscharfilename + " File(s) names should contain the minimum of 3 alphabets";
            }
        }

        if (dropexitfilenamevalue != null && dropexitfilenamevalue != "") {
            if ((alertvalue == null || alertvalue == ""))
                alertvalue = dropexitfilenamevalue + " File(s) are already selected";
            else {
                alertvalue += " and " + dropexitfilenamevalue + " File(s) are already selected";
            }
        }

        if (alertvalue != null && alertvalue != "") {
            if (alertvalue.trim().indexOf('and') == 0) {
                alertvalue = alertvalue.replace('and', "");
                alertvalue = alertvalue.trim();
            }

            if (alertvalue.indexOf(',') == 0) {
                alertvalue = alertvalue.replace(',', "");
                alertvalue = alertvalue.trim();
            }
            alertvalue = alertvalue + ".";
            swal("", " '" + alertvalue.trim() + "'");
        }
        alertvalue = "";
    }
    $("#lblFilesCount").text(droppedControls + " file(s) selected.")
    $("#tbBulkControls").append(vControl);
    getdocumenttypes(documentidcount);
    document.getElementById("holderbulk").style.border = "1px solid white";
    $('#holderbulk').css("opacity", "1");
    $('#holderbulk').css("pointer-events", "auto");
    document.getElementById("iddropfile").style.display = "none";
}

var holder = document.getElementById('holder');
holder.ondragover = function (e) {
    if (document.getElementById("btnAddRequestDocument").style.display != "none") {
        e.preventDefault();
        document.getElementById("holder").style.border = "2px dashed #428bca ";
        $("#holder").css("min-height", "100px");
        document.getElementById("holder").style.opacity = "0.5";
        e.dataTransfer.setData('text/html', "You dragged the image!");
        document.getElementById("iddropfile").style.display = "block";

    }
};
holder.ondragend = function () { this.className = ''; return false; };
holder.ondragleave = function () {
    document.getElementById("holder").style.border = "2px solid white";
    $("#holder").css("min-height", "0px");
    $('#holder').css("opacity", "1");
    $('#holder').css("pointer-events", "auto");
    document.getElementById("iddropfile").style.display = "none";
};
var totalfiles = "";
holder.ondrop = function (e) {
    if (requestItem.Permission != 'View' && requestItem.Permission != '' && requestItem.Permission != null) {
        $("#loadingPage").fadeIn();
        this.className = '';
        e.preventDefault();
        var files = e.dataTransfer.files;
        var fileslength = files.length;
        if (document.getElementById("tbBulkControls").rows.length < 6) {
            if (fileslength <= 5) {
                for (var i = 0; i < fileslength; i++) {
                    droppedfiles.push(files[i]);
                }
                totalfiles = files;
                removedItems = [];
                readfiles(files);
                if (droppedfiles.length > 0) {
                    $('#btnBulkUploadSave').css('display', '');
                    $('#btnBulkUploadCancel').css('display', '');
                    $("#bulkuploaddoc").dialog("option", "title", "Bulk Document Upload");
                    $("#bulkuploaddoc").dialog("open");
                    $("#bulkuploaddoc").height("auto");
                }
                else {
                    document.getElementById("holder").style.border = "2px dashed white";
                    $("#holder").css("min-height", "0px");
                    $('#holder').css("opacity", "1");
                    $('#holder').css("pointer-events", "auto");
                    document.getElementById("iddropfile").style.display = "none";
                }
                $("#loadingPage").fadeOut();
            }
            else {
                $("#loadingPage").fadeOut();
                swal("", "Maximum 5 file(s) only allowed at a time....!");
                document.getElementById("holder").style.border = "1px solid white";
                $("#holder").css("min-height", "0px");
                $('#holder').css("opacity", "1");
                $('#holder').css("pointer-events", "auto");
                document.getElementById("iddropfile").style.display = "none";
            }
        }
        else {
            $("#loadingPage").fadeOut();
            swal("", "Maximum 5 file(s) only allowed at a time....!");
            document.getElementById("holderbulk").style.border = "1px solid white";
            $("#holder").css("min-height", "0px");
            $('#holderbulk').css("opacity", "1");
            $('#holderbulk').css("pointer-events", "auto");
            document.getElementById("iddropfile").style.display = "none";
        }
    }
}

var holderbulk = document.getElementById('holderbulk');
holderbulk.ondragover = function (e) {
    e.preventDefault();
    document.getElementById("holderbulk").style.border = "1px solid blue ";
    document.getElementById("holderbulk").style.opacity = "0.5";
    e.dataTransfer.setData('text/html', "You dragged the image!");
};
holderbulk.ondragend = function () { this.className = ''; return false; };
holderbulk.ondragleave = function () {
    document.getElementById("holderbulk").style.border = "1px solid white";
    $('#holderbulk').css("opacity", "1");
    $('#holderbulk').css("pointer-events", "auto");
    document.getElementById("iddropfile").style.display = "none";
};

var totalfiles = "";
holderbulk.ondrop = function (e) {
    if (requestItem.Permission != 'View' && requestItem.Permission != '' && requestItem.Permission != null) {
        $("#loadingPage").fadeIn();
        this.className = '';
        e.preventDefault();
        var files = e.dataTransfer.files;
        var fileslength = files.length;
        if (document.getElementById("tbBulkControls").rows.length < 6) {
            if (((document.getElementById("tbBulkControls").rows.length - 1) + fileslength) <= 5) {
                for (var i = 0; i < fileslength; i++) {
                    droppedfiles.push(files[i]);
                }
                totalfiles = files;
                removedItems = [];
                readfiles(files);
                if (droppedfiles.length > 0) {
                    $('#btnBulkUploadSave').css('display', '');
                    $('#btnBulkUploadCancel').css('display', '');
                    $("#bulkuploaddoc").dialog("option", "title", "Bulk Document Upload");
                    $("#bulkuploaddoc").dialog("open");
                    $("#bulkuploaddoc").height("auto");
                }
                else {
                    document.getElementById("holderbulk").style.border = "1px solid white";
                    $("#holder").css("min-height", "0px");
                    $('#holderbulk').css("opacity", "1");
                    $('#holderbulk').css("pointer-events", "auto");
                    document.getElementById("iddropfile").style.display = "none";
                }
                $("#loadingPage").fadeOut();
            }
            else {
                $("#loadingPage").fadeOut();
                swal("", "Maximum 5 file(s) only allowed at a time....!");
                $("#holder").css("min-height", "0px");
                document.getElementById("holderbulk").style.border = "1px solid white";
                $('#holderbulk').css("opacity", "1");
                $('#holderbulk').css("pointer-events", "auto");
                document.getElementById("iddropfile").style.display = "none";
            }
        }
        else {
            $("#loadingPage").fadeOut();
            swal("", "Maximum 5 file(s) only allowed at a time....!");
            $("#holder").css("min-height", "0px");
            document.getElementById("holderbulk").style.border = "1px solid white";
            $('#holderbulk').css("opacity", "1");
            $('#holderbulk').css("pointer-events", "auto");
            document.getElementById("iddropfile").style.display = "none";
        }
    }
}


function getdocumenttypes(obj) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/contractareadetailsbyname?contractareaname=' + encodeURIComponent(connamechecking),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (documenttypes) {
            var datalenght = documenttypes.DocumentTypes.split(';');
            datalenght = stringArrayUnique(datalenght);
            if (obj.indexOf(';') > -1) {
                var objsplit = obj.split(';');
                for (var m = 0; m < objsplit.length; m++) {
                    if (objsplit[m] != "") {
                        if (datalenght.length > 0) {
                            for (var i = 0; i < datalenght.length; i++) {//Bug:eO311012 - 'Primary Agreement' not visible in Document Type Dropdown
                                if (datalenght[i] != null && datalenght[i] != "") { // && datalenght[i] != "Primary Agreement"
                                    $("#" + objsplit[m]).append("<option value='" + datalenght[i] + "'>" + datalenght[i] + "</option>")
                                }
                            }
                        }
                        //else {
                        //$("#" + objsplit[m]).append("<option value='Primary Agreement'>Primary Agreement</option>")
                        //}
                        if ($("#" + objsplit[m] + " option[value='Others']").length == 0) {
                            $("#" + objsplit[m]).append("<option value='Others'>Others</option>")
                        }
                        //$("#" + objsplit[m]).find('option[value="Primary Agreement"]').prop("selected", true);
                    }
                }
            }
            else {
                //$("#" + obj).append("<option value='Primary Agreement'>Primary Agreement</option>")
                $("#" + obj).append("<option value='Others'>Others</option>")
                //$("#" + obj).find('option[value="Primary Agreement"]').prop("selected", true);
            }
        },
        error:
            function (data) {
            }
    });
}

function deleteDoc(obj) {
    $("#" + obj).empty();
    removedItems.push(obj.split(/[_ ]+/).pop());
    droppedControls--;
    document.getElementById('files').addEventListener('change', handleFileSelect, false);
    $("#lblFilesCount").text(droppedControls + " file(s) selected.");
    if (droppedControls == 0) {
        $("#tbBulkControls").empty();
        dropexitfilename = [];
    }
}

function DocumentTypeClick(object) {
    cTitle = object.id
    cFlag = object.value
    $(".hhide").hide();

    $('#loadMA').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    var contractTags = [];
    if ($('#tblDocumentType li').length <= 0) {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documenttypes',
            type: 'GET',
            dataType: 'json',
            "Content-Type": "application/json",
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            cache: false,
            success: function (data) {
                $('#loadMA').empty();
                var datalenght = data.length;
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];
                    contractTags.push(item.TypeName);
                    var article = '<li>';
                    article += '<input id="' + item.TypeName + '" type="radio" name="rdContract" class="css-checkbox" value="' + item.TypeName + '" />';
                    article += '<label for="' + item.TypeName + '" class="css-label">' + item.TypeName + '</label>';
                    article += '</li>';
                    $("#tblDocumentType").append(article);
                }
                var vCount = $("#tblDocumentType li").length;
                $('#compact-paginationDocumentType').pagination({
                    items: vCount,
                    itemsOnPage: 10,
                    type: 'ul',
                    row: 'li',
                    typeID: 'tblDocumentType',
                    cssStyle: 'compact-theme'
                });
            },
            error: function () {
                $('#loadMA').empty();
                $('#loadMA').html('<p style="margin-left: 20px;">No Contract Found!</p>')
            }
        });
    } else {
        $('#loadMA').empty();
    }
    $("#browseDocumentType").dialog("option", "title", "Document Type");
    $("#browseDocumentType").dialog("open");

}

function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    var fileslength = files.length;
    for (var i = 0; i < fileslength; i++) {
        droppedfiles.push(files[i]);
    }

    removedItems = [];
    readfiles(files);
}
document.getElementById('files').addEventListener('change', handleFileSelect, false);


function IsFileValid(filename) {
    var ext = filename.match(/\.(.+)$/)[1];
    switch (ext) {
        case 'exe':
            //case 'zip':
        case 'rar':

            swal("", ext + " files are not allowed. File name - " + filename);
            return false;
        default:
            return true;
    }

}

function CheckDocumentExist(folderurl, documentname) {
    var isExist = false;
    if (DocumentCount > 0) {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/documentsbynameandextention?RequestID=' + vRequestID + '&DocumentName=' + encodeURIComponent(documentname),
            type: 'GET',
            dataType: 'json',
            'Content-Type': 'application/json',
            cache: false,
            async: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            success: function (folder) {
                isExist = true;
            },
            error:
                function (data) {
                    isExist = false;
                }
        });
    }
    return isExist;
}

function bulkdocumentupload() {
    try {
        if (requiredValidator('formBulkControls', false)) {
            document.getElementById("tbBulkControls").style.pointerEvents = "none";
            for (var axh = 1; axh < document.getElementById("tbBulkControls").rows.length; axh++) {
                $('#idLoading' + axh).css('display', '');
                $('#idLoadingstart' + axh).css('display', 'none');
                $('#idLoadingcomplete' + axh).css('display', 'none');
            }
            $('#btnBulkUploadSave').css('display', 'none');
            $('#btnBulkUploadCancel').css('display', 'none');
            var loadinffdfdsf = 1;
            var uplosingdetailseperation = null;
            var formData = new FormData();
            var opmlFile = $('#files')[0];
            if (opmlFile.files.length > 0) {
                var documentnamesfornotify = "";
                var droppedfileslength = droppedfiles.length;
                for (var ii = 0; ii < droppedfileslength; ii++) {

                    //Document Names for notifications
                    if (documentnamesfornotify == "")
                        documentnamesfornotify = droppedfiles[ii].name;
                    else
                        documentnamesfornotify += '~' + droppedfiles[ii].name;

                    formData.append("opmlFile" + ii + "", droppedfiles[ii]);
                    formData.append("AccountID", localStorage.AccountID);
                    formData.append("RequestID", getParameterByName("RequestID"));
                    if (uplosingdetailseperation == null) {
                        uplosingdetailseperation = $("#formBulkControls *").serialize();
                        var arravaluesplitop = uplosingdetailseperation.split("&txtdescription");
                        formData.append("SearializeControls", arravaluesplitop[0]);
                        uplosingdetailseperation = null;
                        for (var arrop = 1; arrop < arravaluesplitop.length; arrop++) {
                            if (uplosingdetailseperation == null) {
                                uplosingdetailseperation = arravaluesplitop[arrop];
                            }
                            else {
                                uplosingdetailseperation = uplosingdetailseperation + "&txtdescription" + arravaluesplitop[arrop];
                            }
                        }
                    }
                    else {
                        var jointandsplitop = "txtdescription" + uplosingdetailseperation;
                        var arravaluesplithereop = jointandsplitop.split("&txtdescription");
                        formData.append("SearializeControls", arravaluesplithereop[0]);
                        uplosingdetailseperation = null;
                        for (var arrrop = 1; arrrop < arravaluesplithereop.length; arrrop++) {
                            if (uplosingdetailseperation == null) {
                                uplosingdetailseperation = arravaluesplithereop[arrrop];
                            }
                            else {
                                uplosingdetailseperation = uplosingdetailseperation + "&txtdescription" + arravaluesplithereop[arrr];
                            }
                        }

                    }
                    formData.append("CreatedBy", localStorage.UserName);
                    formData.append("ModifiedBy", localStorage.UserName);
                    if ($("input:radio[name=IsStandard]:checked").val() == "Yes")
                        formData.append("IsStandard", "Yes");
                    else
                        formData.append("IsStandard", "No");
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/bulkupload/multifile',
                        type: 'POST',
                        data: formData,
                        cache: false,
                        contentType: false,
                        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken },
                        processData: false,
                        success: function (data) {
                            $('#idLoading' + loadinffdfdsf).css('display', 'none');
                            $('#idLoadingstart' + loadinffdfdsf).css('display', 'none');
                            $('#idLoadingcomplete' + loadinffdfdsf).css('display', '');
                            loadinffdfdsf++;
                            if (droppedfileslength < loadinffdfdsf) {
                                BindDocument(requestid)
                                $("#tbBulkControls").empty();
                                $("#file").empty();
                                droppedfiles = [];
                                dropexitfilename = [];
                                opmlFile = null;
                                droppedControls = 0;
                                $("#lblFilesCount").text(droppedfiles + " file(s) uploaded.")
                                loadinffdfdsf = 1;
                                uplosingdetailseperation == null;
                                $('#tbBulkControls').css("pointer-events", "auto");
                                $("#bulkuploaddoc").dialog("close");


                            }
                        },
                        error: function () {
                            $('#btnBulkUpload').attr('disabled', 'disabled');
                            $('#tbBulkControls').css("pointer-events", "auto");
                            $('#idLoading').css('display', 'none');
                            $("#loadingPage").fadeOut();
                        }
                    });
                    formData = new FormData();
                }

                //Send Edit Request Notifications


                var formDataNotify = new FormData();
                formDataNotify.append("AccountID", localStorage.AccountID);
                formDataNotify.append("RequestID", vRequestID);
                formDataNotify.append("DocumentName", documentnamesfornotify);
                formDataNotify.append("ModifiedBy", localStorage.UserName);
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/DocumentUploadNotification?SingleOrMultiple=Multiple',
                    type: 'POST',
                    data: formDataNotify,
                    cache: false,
                    contentType: false,
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                    processData: false,
                    success: function (data) {

                    },
                    error: function (data) {
                    }
                });
            } else {

                var documentnamesfornotify = "";
                var droppedfileslength = droppedfiles.length;

                for (var i = 0; i < droppedfileslength; i++) {

                    //Document Names for notifications
                    if (documentnamesfornotify == "")
                        documentnamesfornotify = droppedfiles[i].name;
                    else
                        documentnamesfornotify += '~' + droppedfiles[i].name;

                    formData.append("opmlFile" + i + "", droppedfiles[i]);
                    formData.append("AccountID", localStorage.AccountID);
                    formData.append("RequestID", getParameterByName("RequestID"));
                    if (uplosingdetailseperation == null) {
                        uplosingdetailseperation = $("#formBulkControls *").serialize();
                        var arravaluesplit = uplosingdetailseperation.split("&txtdescription");
                        formData.append("SearializeControls", arravaluesplit[0]);
                        uplosingdetailseperation = null;
                        for (var arr = 1; arr < arravaluesplit.length; arr++) {
                            if (uplosingdetailseperation == null) {
                                uplosingdetailseperation = arravaluesplit[arr];
                            }
                            else {
                                uplosingdetailseperation = uplosingdetailseperation + "&txtdescription" + arravaluesplit[arr];
                            }
                        }
                    }
                    else {
                        var jointandsplit = "txtdescription" + uplosingdetailseperation;
                        var arravaluesplithere = jointandsplit.split("&txtdescription");
                        formData.append("SearializeControls", arravaluesplithere[0]);
                        uplosingdetailseperation = null;
                        for (var arrr = 1; arrr < arravaluesplithere.length; arrr++) {
                            if (uplosingdetailseperation == null) {
                                uplosingdetailseperation = arravaluesplithere[arrr];
                            }
                            else {
                                uplosingdetailseperation = uplosingdetailseperation + "&txtdescription" + arravaluesplithere[arrr];
                            }
                        }

                    }
                    formData.append("CreatedBy", localStorage.UserName);
                    formData.append("ModifiedBy", localStorage.UserName);
                    if ($("input:radio[name=IsStandard]:checked").val() == "Yes")
                        formData.append("IsStandard", "Yes");
                    else
                        formData.append("IsStandard", "No");
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/bulkupload/multifile',
                        type: 'POST',
                        data: formData,
                        cache: false,
                        contentType: false,
                        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken },
                        processData: false,
                        success: function (data) {
                            $('#idLoading' + loadinffdfdsf).css('display', 'none');
                            $('#idLoadingstart' + loadinffdfdsf).css('display', 'none');
                            $('#idLoadingcomplete' + loadinffdfdsf).css('display', '');
                            loadinffdfdsf++;
                            if (droppedfileslength < loadinffdfdsf) {
                                BindDocument(vRequestID);
                                $("#tbBulkControls").empty();
                                $("#file").empty();
                                droppedfiles = [];
                                dropexitfilename = [];
                                opmlFile = null;
                                droppedControls = 0;
                                $("#lblFilesCount").text(droppedfiles + " file(s) uploaded.")
                                loadinffdfdsf = 1;
                                uplosingdetailseperation == null;
                                $('#tbBulkControls').css("pointer-events", "auto");
                                $("#bulkuploaddoc").dialog("close");
                            }
                        },
                        error: function () {
                            $('#btnBulkUpload').attr('disabled', 'disabled');
                            $('#tbBulkControls').css("pointer-events", "auto");
                            $('#idLoading').css('display', 'none');
                            $("#loadingPage").fadeOut();
                        }
                    });
                    formData = new FormData();
                }
                //Send Edit Request Notifications
                var formDataNotify = new FormData();
                formDataNotify.append("AccountID", localStorage.AccountID);
                formDataNotify.append("RequestID", vRequestID);
                formDataNotify.append("DocumentName", documentnamesfornotify);
                formDataNotify.append("ModifiedBy", localStorage.UserName);
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/DocumentUploadNotification?SingleOrMultiple=Multiple',
                    type: 'POST',
                    data: formDataNotify,
                    cache: false,
                    contentType: false,
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                    processData: false,
                    success: function (data) {

                    },
                    error: function (data) {
                    }
                });
            }

        }
    }
    catch (ex) {
        alert(ex);
    }
}


function RedirectToCounterparty(counterpartyname) {
    counterpartyname = unescape(counterpartyname);
    oldCounterParty = counterpartyname;
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty?counterpartyname=' + encodeURIComponent(counterpartyname),
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (item) {
            location = '/Counterparty/CounterpartyDetail?CounterpartyID=' + encodeURI(item.RowKey);
        },
        error: function () {
            if (localStorage.UserType.indexOf("Global Contract Owner") >= 0 || localStorage.UserType.indexOf("Global Administrator") >= 0) {
                swal({
                    title: '',
                    text: "This Counterparty information is not available in eContracts Counteparty database. Do you want to add now?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
     function (confirmed) {
         if (confirmed) {
             $("#txtCounterpartyName").val("" + counterpartyname + "");
             CounterpartyPopup(counterpartyname);
         }
         return;
     });

            } else {

                swal("", "This Counterparty information is not available in eContracts Counteparty database.");
            }
        }

    });
}

//add new counterparty on document add
function documentstatuschange() {
    if ($("#ddlDocumentStatus").val() != 0 && $("#ddlDocumentStatus").val() == "Expired") {
        $("#dtValidFrom").val("");
        $("#dtValidTill").val("");
        $("#dtValidFrom").removeClass("validelement validdate hasDatepicker");
        $("#dtValidTill").removeClass("validelement validdate hasDatepicker");
        $("#ddlDocRemindTo_chosen").removeClass("validelement validuser");
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
            $("#counterpartyDynamicItems").empty();
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
                            var vPhoneNumber = "";
                            var PhoneID = "";
                            var PhoneCountry = "";
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
                            else if (item.FieldType == "Phone Number") {
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id='" + item.FieldName + "_CP'   class='validelement validPhone fieldphonecontrol'>";
                                } else {
                                    vControls += "<input type='text' id='" + item.FieldName + "_CP'    class='validPhone fieldphonecontrol'>";
                                }
                                vControls += '<label class="p-text">' + item.Description + '</label>';
                                vControls += '</div></li>';

                                vPhoneNumber = vControls;
                                PhoneID = item.FieldName + "_CP";
                                PhoneCountry = item.Country;
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
                                    vControls += '</select>';
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
                                // Percent
                            else if (item.FieldType == "Number-P") {
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement form_input' />";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form_input' />";
                                }
                                vControls += '<label class="margin-top-8 p-text" style="float: right;position: absolute;">' + '%' + '</label>';
                                vControls += '<label style="float:left"; class="p-text">' + item.Description + '</label>';
                                vControls += '</div></li>';
                                vNumberP = item.FieldName;
                            }
                                // Percent Decimal
                            else if (item.FieldType == "Number-PD") {
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement form_input' />";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='form_input' />";
                                }
                                vControls += '<label class="margin-top-8 p-text" style="float: right;position: absolute;">' + '%' + '</label>';
                                vControls += '<label style="float:left"; class="p-text">' + item.Description + '</label>';
                                vControls += '</div></li>';
                                vNumberPD = item.FieldName;
                            }
                            else if (item.FieldType == "Yes/No") {
                                //vControls += "	<div style='width: auto; margin-right: 15px;'><input style='float: left; width: auto;' type='radio' name=" + item.FieldName + " value='Yes'><span style='float: left; margin: 7px 0px 0px 5px;'>Yes </span></div>";
                                //vControls += "	<div style='width: auto;'><input style='float: left; width: auto;' type='radio' name=" + item.FieldName + " checked value='No'><span style='float: left; margin: 7px 0px 0px 5px;'>No </span></div>";

                                //vControls += '<label style="width:auto;margin:7px 0px 0px 5px;" class="col12 p-text text-left help">' + item.Description + '</label>';
                                //vControls += '</div></li>';


                                vControls += "	<div style='width: auto; margin-right: 15px;'><input style='float: left; width: auto;' type='radio' name=" + item.FieldName + " id='Yes" + item.FieldName + "' value='Yes' onchange='CounterpartychangeYesNoField(this);'><span style='float: left; margin: 7px 0px 0px 5px;'>Yes </span></div>";
                                vControls += "	<div style='width: auto; margin-right: 15px;'><input style='float: left; width: auto;' type='radio' name=" + item.FieldName + " checked id='No" + item.FieldName + "' value='No' onchange='CounterpartychangeYesNoField(this);'><span style='float: left; margin: 7px 0px 0px 5px;'>No </span></div>";

                                vControls += "	<input type='hidden' id='hdnYes" + item.FieldName + "' value=" + item.CommentYes + " />";
                                vControls += "	<input type='hidden' id='hdnNo" + item.FieldName + "' value=" + item.CommentNo + " />";
                                vControls += "	<input type='hidden' id='hdnRequired" + item.FieldName + "' value=" + item.CommentRequired + " />";
                                vControls += "	<input type='hidden' id='hdnHelpText" + item.FieldName + "' value=" + item.HelpText + " />";
                                vControls += '  <label style="width:auto;margin:7px 0px 0px 5px;" class="col12 p-text text-left help">' + item.Description + '</label>';
                                vControls += '</div></li>';

                                if (item.CommentNo == "true") {

                                    if (item.CommentRequired == "true") {
                                        vControls += '<li class="removableCounterpartyField CP_Det"><p><b>Add a Comment </b><small>*</small>';
                                    } else {
                                        vControls += '<li class="removableCounterpartyField CP_Det"><p><b>Add a Comment </b>';
                                    }
                                    if (item.FieldHelp == "true") {
                                        vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                    }
                                    vControls += "<div>";
                                    if (item.CommentRequired == "true") {
                                        vControls += "<textarea id='CustomCMD" + item.FieldName + "' name='CustomCMD" + item.FieldName + "' maxlength='300' title='" + item.FieldName + "' cols='25' rows='3' class='validelement'></textarea>";
                                    } else {
                                        vControls += "<textarea id='CustomCMD" + item.FieldName + "' name='CustomCMD" + item.FieldName + "' maxlength='300' title='" + item.FieldName + "' cols='25' rows='3' ></textarea>";
                                    }
                                    vControls += '</div></li>';
                                }



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

                            $("#counterpartyDynamicItems").append(vControls);
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
                            if (vPhoneNumber != "") {
                                bindPhoneNumber(PhoneID, PhoneCountry);
                                vPhoneNumber = "";
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
                $("#ddlCounterpartyTypeadd").append('<option value="' + item.TypeName + '">' + item.TypeName + '</option>');
            });
        },
        error:
            function (data) {
            }
    });
}
function ViewCounterpartyRelated(obj) {
    var baname = "";
    //if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
    //    baname = localStorage.GlobalBusinessAreaLocation;
    //}

    if ($('#ddlRelationshipTypeCounterparties').hasClass('error')) {
        $('#ddlRelationshipTypeCounterparties').removeClass('error')
    }
    if ($('#ddlRelationshipTypeParentcounterparties').hasClass('error')) {
        $('#ddlRelationshipTypeParentcounterparties').removeClass('error')
    }
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
                var arr = [];
                var counterpartyTags = [];
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
                        //        var vOptions = "<select class='f_inpt width90'>";
                        //        var jsLang = $("#ddlRelationshipTypeParentcounterparties option:selected").val();
                        //        switch (jsLang) {
                        //            case 'Parent':
                        //                vOptions += '<option value="Subsidiary">Subsidiary</option>';
                        //                break;
                        //            case 'Subsidiary':
                        //                vOptions += '<option value="Parent">Parent</option>';
                        //                break;
                        //            case 'Supplier':
                        //                vOptions += '<option value="Customer">Customer</option>';
                        //                break;
                        //            case 'Customer':
                        //                vOptions += '<option value="Supplier">Supplier</option>';
                        //                break;
                        //            case 'Prime Contractor':
                        //                vOptions += '<option value="Sub Contractor">Sub Contractor</option>';
                        //                break;
                        //            case 'Sub Contractor':
                        //                vOptions += '<option value="Prime Contractor">Prime Contractor</option>';
                        //                break;
                        //            case 'Dissolved on Merger':
                        //                vOptions += '<option value="Merged into">Merged into</option>';
                        //                break;
                        //            case 'Merged into':
                        //                vOptions += '<option value="Dissolved on Merger">Dissolved on Merger</option>';
                        //                break;
                        //            case 'Other':
                        //                vOptions += '<option value="Other">Other</option>';
                        //                break;
                        //        }

                        //        vOptions += '</select>';
                        //        $(this).parent().parent().children(".ddl").append(vOptions);

                        //    } else {
                        //        $(this).parent().parent().children(".ddl").empty();
                        //    }

                        //});
                    }
                });

                $("#tblPopupCounterparties").append(vCounterpartyList);
                $("input[id^='rel'][name='RelatedCounterparty']:checkbox").click(function () {
                    if (this.checked) {
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
                $('#loadMA').empty();
                addselectedcounterparties();
                $('#loadCounterparties').html('No items found.');
                $("#tblPopupCounterparties").html('');
                $("#popupCounterparties").dialog("option", "title", "Related Counterparties");
                $("#popupCounterparties").dialog("open");
                $("#loadingPage").fadeOut();
            }
        });
    } else {
        $('#loadMA').empty();
        addselectedcounterparties();
        $("#popupCounterparties").dialog("option", "title", "Related Contract Records");
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
        var vOptions = "<select class='f_inpt width90' onchange='showallspans(this)'>";
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

function CheckGlobalSettings() {

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/GlobalSettings',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            if (data == null) {
                $("#Upcoming").css("display", "none");
                $("#Delayed").css("display", "none");
            } else {
                localStorage.setItem("RestrictHighSecurityTagging", data.RestrictHighSecurityTagging);
                if (data.CreateCounterpartyDocument == "Yes") {
                    $("#Upcoming").css("display", "");
                    $("#Delayed").css("display", "");
                }
                else {
                    $("#Upcoming").css("display", "none");
                    $("#Delayed").css("display", "none");
                }
            }
        }
    });
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
function SearchCounterparty() {
    $("#tblCounterparties").empty();
    $("#liSelectedCounterParty").empty();
    // multipleChecksDocumentIDd = [];
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/getrelatedcounterparty?searchkeyword=' + encodeURIComponent($("#txtSearchBox").val()) + '&customquery=&sortbyfield=CounterpartyName&orderby=ASC',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'BusinessAreaLocation': localStorage.GlobalBusinessAreaLocation },
        cache: false,
        success: function (data) {
            $("#tblCounterparties").empty();
            $("#liSelectedCounterParty").empty();
            //CounterPartyArrayprev = [];
            //$.each($('#Counterparty').val().split(";"), function () {
            //  //  CounterPartyArrayprev.push($.trim(this));
            //    if (multipleChecksDocumentIDd.indexOf($.trim(this)) == -1)
            //        multipleChecksDocumentIDd.push($.trim(this));
            //});
            //$.each($(multipleChecksDocumentIDd), function () {
            //    CounterPartyArrayprev.push($.trim(this));

            //});
            myCounterPartyArray = [];
            var obj1 = {};
            $(splitbusinessPath).each(function (index) {
                if (this != null && this.toString() != "") {
                    var contBusi = this.split('>');
                    if (typeof (contBusi) != "undefined") {
                        if (contBusi.length > 0) {
                            contractarea = contBusi[0].trim();
                            Businesssarea = contBusi[contBusi.length - 1].trim();
                            if (thisBusinessAreaNameC == Businesssarea && thisContractAreaNameC == contractarea)
                                myCounterPartyArray.push(data[i]);
                        }
                    }
                }
            })
            var resultfound = true;
            var myArraylength = myCounterPartyArray.length;
            CreateCounterPartyListUnit(0);
            var vCount = myArraylength;
            var columncounterparty = [];
            for (var ci = 0; ci < myCounterPartyArray.length; ci++) {
                columncounterparty.push(myCounterPartyArray[ci].CounterpartyName);
            }
            $("#txtSearchBox").autocomplete({
                source: columncounterparty,
                minLength: 1,
                focus: function (event, ui) {
                    return false;
                },
                select: function (evn, uidetails) {
                    $("#txtSearchBox").val(uidetails.item.label);
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
                $("#liSelectedCounterParty").empty();
                $("#tblCounterparties").html('No items found.');
                $("#browseCounterparty").dialog("option", "title", "Counterparty Picker");
                $("#browseCounterparty").dialog("open");
                $("#loadingPage").fadeOut();
            }
    });
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
        $("#tblCounterparties").html(art);
        checkboxchecking = false;
        $('#loadGenCounterParty').empty();
    }
    else {
        $("#tblCounterparties").html('');
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
        var article = "";
        for (var i = startIndex; i < endIndex; i++) {

            if (i == startIndex) {
                article += '<tr><th><input id="selectallCounterParty" onclick="funselectallCounterParty(this);" type="checkbox"/> Select/Deselect All</th><th>Counterparty Type</th></tr>';
            }

            article += '<tr><td>';
            //if (CounterPartyArrayprev != null && multipleChecksDocumentIDd.length > 0) {
            //    if (CounterPartyArrayprev.indexOf(myCounterPartyArray[i].CounterpartyName.trim()) >= 0 && multipleChecksDocumentIDd.indexOf(myCounterPartyArray[i].CounterpartyName.trim()) > -1) {
            //        article += '<input id="CP' + myCounterPartyArray[i].RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);" checked class="css1-checkbox" value="' + myCounterPartyArray[i].CounterpartyName.trim() + '" />';
            //    }
            if (multipleChecksDocumentIDd.length > 0) {
                if (multipleChecksDocumentIDd.indexOf(myCounterPartyArray[i].CounterpartyName.trim()) > -1) {
                    article += '<input id="' + myCounterPartyArray[i].RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);" checked class="css1-checkbox" value="' + escape(myCounterPartyArray[i].CounterpartyName.trim()) + '" />';
                }
                else {
                    article += '<input id="' + myCounterPartyArray[i].RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);"  class="css1-checkbox" value="' + escape(myCounterPartyArray[i].CounterpartyName.trim()) + '" />';
                    checkboxchecking = false;
                }
            }
                //else if (CounterPartyArrayprev.indexOf(myCounterPartyArray[i].CounterpartyName.trim()) >= 0 && multipleChecksDocumentIDd.length == 0) {
                //    article += '<input id="' + myCounterPartyArray[i].RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);" checked class="css1-checkbox" value="' + myCounterPartyArray[i].CounterpartyName.trim() + '" />';
                //}
                //else if (multipleChecksDocumentIDd.indexOf(myCounterPartyArray[i].CounterpartyName.trim()) > -1) {
                //    article += '<input id="' + myCounterPartyArray[i].RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);" checked class="css1-checkbox" value="' + myCounterPartyArray[i].CounterpartyName.trim() + '" />';
                //}
            else {
                article += '<input id="' + myCounterPartyArray[i].RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);"  class="css1-checkbox" value="' + escape(myCounterPartyArray[i].CounterpartyName.trim()) + '" />';
                checkboxchecking = false;
            }
            article += '<label for="CP' + myCounterPartyArray[i].RowKey + '" class="css1-label">' + myCounterPartyArray[i].CounterpartyName.trim() + '</label></td>';
            article += '<td>' + myCounterPartyArray[i].CounterpartyType + '';
            article += '</td></tr>';
            resultfound = true;
        }
        $("#tblCounterparties").html(article);
        article = '';
        $('#loading').empty();
    }
    if (checkboxchecking == true) {
        $("#selectallCounterParty").attr('checked', true);
    }
    else {
        $("#selectallCounterParty").attr('checked', false);
    }
    var checkingsdivchild = document.getElementById("liSelectedCounterParty").hasChildNodes();
    if (!checkingsdivchild) {
        if (multipleChecksDocumentIDd.length > 0) {
            for (var spl = 0; spl < multipleChecksDocumentIDd.length; spl++) {
                if (multipleChecksDocumentIDd[spl].trim() != "") {
                    $('#liSelectedCounterParty').append('<span style="font-size:13px;">' + multipleChecksDocumentIDd[spl].trim() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelectedCouterParty(this);" style="float:right" /></span>');
                }
            }
        }
        else {
            var textvalid = "";
            if (strSelCounterPartyField != "") {
                textvalid = $("#" + strSelCounterPartyField + "").val();

            }
            else {
                textvalid = $("#Counterparty").val();
            }
            //if (typeof textvalid != 'undefined' && textvalid != "") {
            //    var splitmulicheckforbind = textvalid.split(';');
            //    for (var spl = 0; spl < splitmulicheckforbind.length; spl++) {
            //        if (splitmulicheckforbind[spl].trim() != "") {
            //            $('#liSelectedCounterParty').append('<span style="font-size:13px;">' + splitmulicheckforbind[spl] + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveSelectedCouterParty(this);" style="float:right" /></span>');
            //            multipleChecksDocumentIDd.push(splitmulicheckforbind[spl].trim());
            //        }
            //    }
            //}
            //else {
            //    checkMultipleDocumentsCounterParty("");
            //}
        }
    }
    $('#loadGenCounterParty').empty();
}
function randomString() {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 8;
    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;
}
//Check the Request Title is Exists in the Request Table (Request Title is unique)
function CheckRequestTitleExist(requesttitle) {
    var vExist = true;
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/requestsbyrequesttitle?requesttitle=' + encodeURIComponent(requesttitle),
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: false,
        success: function (data) {
            if (data == null)
            { vExist = false; }
            else
            {
                if (data.RowKey == getParameterByName("RequestID"))
                { vExist = false; }
                else
                {
                    vExist = true;
                    if (data.InRecycleBin == "Yes") {
                        vInRecycleBin = true;
                    }
                }
            }
        },
        error: function (data) {
            vExist = false;
        }
    });
    return vExist;
}


//To Resotre request 
function RestoreRequest() {
    var requestTitle = $("#lblRequestTitle").text();
    swal({
        title: '',
        text: "Are you sure you want to <span style=\"font-weight:700\">restore " + requestTitle + "</span> ?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        html: true
    },
function (confirmed) {
    if (confirmed) {
        var requestID = $("#hdnRequestID").text();
        $("#loadingPage").fadeIn();
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/RestoreRequest?requestid=' + requestID,
            type: 'POST',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
            cache: false,
            success: function (data) {
                $("#loadingPage").fadeOut();
                swal({
                    title: '',
                    text: data,

                },
         function (confirmed) {
             if (confirmed) {
                 location = "/Pipeline/RequestDetails?RequestID=" + requestID + "";
             }

         });

            },
            error: function (data) { $("#loadingPage").fadeOut(); }
        });
    }
    return;
});

}
function BindCountry() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/countrynames',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $(data).each(function (i, item) {
                $("#ddlCountry").append('<option value="' + item + '">' + item + '</option>');
            });
        },
        error:
            function (data) {
            }
    });
}
function SaveCounterparty() {
    var isformvalid = false;
    if (requiredValidator('addNewEntityFields', false)) {
        $("#loadingPage").fadeIn();
        isformvalid = true;
        var entityid = $("#txtCounterpartyIDadd").val();
        var AddressLine1 = $("#txtAddressLine1").val();
        if (AddressLine1 == null || AddressLine1 == '') {
            AddressLine1 = '';
        }

        var counterpartyForm = $("#counterpartyFormadd *").serialize();
        counterpartyForm += "&AccountID=" + localStorage.AccountID;
        counterpartyForm += "&CreatedBy=" + localStorage.UserName;
        counterpartyForm += "&ModifiedBy=" + localStorage.UserName;
        counterpartyForm += "&IsGlobal=" + $('input[name="IsGlobalN"]:checked').val();

        var cpresult = "&";
        $("#counterpartyFormadd .fielddatecontrol").each(function (index) {
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

        cpresult = "&";
        $("#counterpartyFormadd .fieldphonecontrol").each(function (index) {
            if ($(this).val() != null && $(this).val() != "") {
                var name = $(this)[0].id.split('_')[0];
                var value = $(this).intlTelInput("getSelectedCountryData").iso2 + "," + $(this).intlTelInput("getSelectedCountryData").dialCode + "," + $(this).intlTelInput("getNumber", intlTelInputUtils.numberFormat.INTERNATIONAL);
                cpresult = cpresult + name + "=" + value + "&";
            }
            else {
                var name = $(this)[0].id.split('_')[0];
                var value = "";
                cpresult = cpresult + name + "=" + value + "&";
            }
        });
        cpresult = cpresult.slice(0, -1)
        counterpartyForm += cpresult;
        if (entityid != '') {
            var formData = new FormData();
            formData.append("CounterpartyID", entityid);
            formData.append("AccountID", localStorage.AccountID);
            formData.append("SearializeControls", counterpartyForm);
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/dynamicformupdate',
                type: 'PUT',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function (person) {
                    CounterpartyFunc();
                    CounterpartyFunc1();
                    //swal("", person);
                    $("#loadingPage").fadeOut();
                    $("#addEditCounterparty").dialog("close");

                    //update request if counterparty name is changed
                    if ($("#summCounterparty").text() == $("#txtCounterpartyNameadd").val()) {
                    } else {
                        $("#summCounterparty").html('<a href="javascript:void(0);" onclick="RedirectToCounterparty(\'' + $("#txtCounterpartyNameadd").val() + '\')">' + $("#txtCounterpartyNameadd").val() + '</a>');
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/' + vRequestID + '/changecounterparty?counterparty=' + encodeURIComponent($("#txtCounterpartyNameadd").val()),
                            type: 'PUT',
                            dataType: 'json',
                            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                            cache: false,
                            success: function (result) {
                            },
                            error: function (person) {
                            },
                        });
                    }
                },
                error: function (person) {
                    swal("", person);
                    $("#loadingPage").fadeOut();
                }
            });
        }
        else {
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
                success: function (person) {
                    if (strSelCounterPartyField != "") {
                        if ($("#" + strSelCounterPartyField + "").val() == '')
                            $('#' + strSelCounterPartyField + '').val($("#txtCounterpartyName").val());
                        else
                            $('#' + strSelCounterPartyField + '').val($('#' + strSelCounterPartyField + '').val() + "; " + $("#txtCounterpartyName").val());
                    }
                    else {
                        if ($("#Counterparty").val() == '')
                            $('#Counterparty').val($("#txtCounterpartyName").val());
                        else
                            $('#Counterparty').val($('#Counterparty').val() + "; " + $("#txtCounterpartyName").val());
                    }
                    CounterpartyFunc();
                    //swal("", person);
                    $("#loadingPage").fadeOut();
                    $("#addEditCounterparty").dialog("close");

                    //update request if counterparty name is changed
                    if ($("#summCounterparty").text() == $("#txtCounterpartyNameadd").val()) {
                    } else {
                        var oldvalue = "&oldvalue= " + encodeURIComponent(oldCounterParty)
                        //$("#summCounterparty").html('<a href="javascript:void(0);" onclick="RedirectToCounterparty(\'' + $("#txtCounterpartyNameadd").val() + '\')">' + $("#txtCounterpartyNameadd").val() + '</a>');
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/' + vRequestID + '/changecounterparty?counterparty=' + encodeURIComponent($("#txtCounterpartyNameadd").val()),
                            type: 'PUT',
                            dataType: 'json',
                            data: oldvalue,
                            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                            cache: false,
                            success: function (result) {
                                requestItem.Counterparty = result.Counterparty;
                                if (requestItem.Counterparty.indexOf(';') >= 0) {
                                    var cparr = requestItem.Counterparty.split(';')
                                    var html = "";
                                    $("#summCounterparty").empty();
                                    cparr.forEach(function (value, index) {
                                        if (html == "") {
                                            html = '<a href="javascript:void(0);" onclick="RedirectToCounterparty(\'' + value + '\')">' + value + '</a>'
                                        } else {
                                            html += ';' + ' ' + '<a href="javascript:void(0);" onclick="RedirectToCounterparty(\'' + value + '\')">' + value + '</a>';
                                        }
                                    });
                                    $("#summCounterparty").html(html);
                                }
                                else
                                    html += '<a href="javascript:void(0);" onclick="RedirectToCounterparty(\'' + $("#txtCounterpartyNameadd").val() + '\')">' + $("#txtCounterpartyNameadd").val() + '</a>';
                            },
                            error: function (person) {
                            },
                        });
                    }
                }
            });
        }
    }
    return isformvalid;
}

//get the Unique Array Start
function stringArrayUnique(array) {
    return $.grep(array, function (el, index) {
        return index === $.inArray(el, array);
    });
}
//get the Unique Array End

function bulkdocumentuploadCancel() {
    $("#tbBulkControls").empty();
    dropexitfilename = [];
    $("#file").empty();
    droppedfiles.splice(0, droppedfiles.length)
    droppedControls = 0;
    $("#bulkuploaddoc").dialog("close");
    document.getElementById("holder").style.border = "1px solid white";
    $("#holder").css("min-height", "0px");
    $('#holder').css("opacity", "1");
    $('#holder').css("pointer-events", "auto");
    $('#holder').css("min-height", "0px");
    document.getElementById("holderbulk").style.border = "1px solid white";
    $('#holderbulk').css("opacity", "1");
    $('#holderbulk').css("pointer-events", "auto");
    document.getElementById("iddropfile").style.display = "none";
}

//manoj
function movetocontractdetails(conrowkey, constatus) {
    var mynavigateUrl = '';
    var contractstatus = ["Ready for Signature", "Awaiting Signatures", "Signed", "Active", "Up for Renewal", "Renewed", "Extended", "On Hold", "Replaced", "Expired", "Cancelled", "Terminated", "Archived"];
    if (contractstatus.indexOf(constatus) == -1) {
        mynavigateUrl = '/Contracts/ContractDetails?ContractID=' + encodeURI(conrowkey) + '&Stage=pipeline';
    } else {
        mynavigateUrl = '/Contracts/ContractDetails?ContractID=' + encodeURI(conrowkey);
    }
    window.open(mynavigateUrl, '_blank');
}
//manoj
var oGeneralSetting = "";
function GetContractValueSetting(contRecord) {
    var vContractValueSetting = '';
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/settings',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            oGeneralSetting = data;
            if (data.DisplayMissingInformation == "Yes") {
                $("#tblDocumentMissing").css("display", "");
                $("#tblDescriptionMissing").css("display", "");
                $("#lblRequestDescription").css("display", "");
                $("#tblPeopleMissing").css("display", "");
                $("#tblPeople").css("display", "");
                $("#tblDocument").css("display", "");
                $("#tblRequired").css("display", "");
                $("#tblActivity").css("display", "");
            }
            else {
                $("#tblDocumentMissing").css("display", "none");
                $("#tblDescriptionMissing").css("display", "none");
                $("#lblRequestDescription").css("display", "none");
                $("#tblPeopleMissing").css("display", "none");
                $("#tblPeople").css("display", "none");
                $("#tblDocument").css("display", "none");
                $("#tblRequired").css("display", "none");
                $("#tblActivity").css("display", "none");
                $(".clpendingaction").css("display", "none");
            }
            vContractValueSetting = data.IsContractValueInBaseCurrency;
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

//CounterParty Businessarea

var BAOwnersselecteditems = [];
function ViewOwnerofBusinessArea() {

    $('#txtBAOwnerofPath').val("");
    $('#txtBAOwnerof').val("");


    if ($("#txtOwnerofBusinessArea").val() != "" || $("#txtNewCpBusinessArea").val() != "") {
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

            //$("#example-basic-11").treetable({ expandable: true, initialState: "expanded" });
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
            selectedBusinessAreaID11.push([rowK[0][0], rowK[0][1]]);
            selectedBusinessAreaID11Temp.push([rowK[0][0], rowK[0][1]]);
        }

    }
    var strValue = "";
    $(selectedBusinessAreaID11).each(function (i, item) {
        strValue = item[0].trim().substring(item[0].trim().lastIndexOf(">") + 1, item[0].trim().length).trim() + ";";
    });
    var lastChar = strValue.slice(-1);
    if (lastChar == ";") {
        strValue = strValue.slice(0, -1);
    }
    $("#txtNewCpBusinessArea").val(strValue);
    $("#txtOwnerofBusinessArea").val(strValue);
    $("#txtNewCpBusinessArea").val(strValue);
}
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
    if (typeof (BusinessAreaAccessWithRead) == "undefined" || BusinessAreaAccessWithRead == null || BusinessAreaAccessWithRead.length == 0) {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users/' + localStorage.UserID + '/businessareapermission',
            type: 'GET',
            dataType: 'json',
            'Content-Type': 'application/json',
            cache: true,
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            success: function (entity) {
                var BAreaAccess = entity.BusinessArea + ";" + entity.BusinessAreaContribute + ";" + entity.BusinessAreaRead + ";" + entity.OwnerOfBusinessAreas;

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
                $("#example-basic-11").treetable({ expandable: true, initialState: "expanded" }, true);


            },
            error:
                function (data) {
                }
        });

    }
    else {
        if (typeof (BusinessAreaAccessWithRead) == "object" && BusinessAreaAccessWithRead.length > 1) {
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
        $("#example-basic-11").treetable({ expandable: true, initialState: "expanded" }, true);

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

//Sridhar
function autoheight(a) {
    if (!$(a).prop('scrollTop')) {
        do {
            var b = $(a).prop('scrollHeight');
            var h = $(a).height();
            $(a).height(h - 5);
        }
        while (b && (b != $(a).prop('scrollHeight')));
    };
    $(a).height($(a).prop('scrollHeight'));
}

//$("#txtRequestTitle").on("input", function (e) {
//    autoheight(this);
//});
//$("#txtRequestDescription").on("input", function (e) {
//    autoheight(this);
//});

function getShareNameandEmailIdInternal(scontrid, popUpModalName) {
    if (requestItem != "") {
        var UsersToShow = requestItem.Requestor + ";" + requestItem.BusinessOwners + ";" + requestItem.CreatedBy + ";" + requestItem.Approvers + ";" + requestItem.Reviewers + ";" + contractItem.RequestCollaborators;

        HideOptionsNotRequiredExcept(popUpModalName, UsersToShow);
    }
    else {
        HideOptionsNotRequiredExcept(popUpModalName, "");
    }
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

//Add related contract into request
function AddRelatedContracts(isDoc) {
    rcFromDocument = isDoc;
    $('#loadProContract').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    ContractsFunc();
    $("#lblselectedrelatedcontracts").text("");
}

var RelatedContractTags = [];
var relatedContractArr = [];
var arr = [];   //bug id eO37449
function ContractsFunc() {
    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = localStorage.GlobalBusinessAreaLocation;
    }
    $("#tblContracts").empty();
    $('#liSelectedRelatedContract').html('');
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/getrelatedcontracts?stage=&searchkeyword=&customquery=&sortbyfield=ContractTitle&orderby=ASC',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: {
            'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, BusinessAreaLocation: $("#lblBusinessAreaPath").text()
        },
        cache: false,
        success: function (data) {
            $('#loadProContracts').empty();
            if (!rcFromDocument) {
                if ($('#ulRelatedContracts').text() != "No items found.") {
                    vContracts = $('#ulRelatedContracts').text();
                }
                $.each($('#ulRelatedContracts').text().split(";"), function () {
                    if ($.trim(this) != "No items found.") {
                        if (arr.indexOf($.trim(this)) == -1) {
                            arr.push($.trim(this));
                        }
                    }
                });
            }
            else {
                if ($('#ulRelatedContracts').text() != "No items found.") {
                    vContracts = $('#ulRelatedContracts').text();
                }
                $.each($('#RelatedContracts').val().split(";"), function () {
                    if (arr.indexOf($.trim(this)) == -1) {
                        arr.push($.trim(this));
                    }
                });
            }
            relatedContractArr = arr;
            var datalength = data.length;
            if (datalength > 0) {
                listRelatedContracts = data;
                CreateRelatedContractsList(0);
                RelatedContractTags = RelatedContractTags.filter(function (elem, index, self) {
                    return index == self.indexOf(elem);
                });
                $("#txtSearchBoxContracts").autocomplete({
                    source: RelatedContractTags,
                    minLength: 1,
                    focus: function (event, ui) {
                        return false;
                    },
                    select: function (evn, uidetails) {
                        $("#txtSearchBoxContracts").val(uidetails.item.label);
                        SearchContracts();
                    }
                });

                var vCount = data.length;
                $("#tblContracts tr td").attr('style', 'vertical-align: top');
                $('#compact-paginationContracts').css('display', '');
                $('#compact-paginationContracts').pagination({
                    items: vCount,
                    itemsOnPage: 10,
                    type: 'tbody',
                    typeID: 'tblContracts',
                    row: 'tr',
                    cssStyle: 'compact-theme',
                    listname: 'RelatedContracts'
                });

                $("#loadingPage").fadeOut();
                $("#browseContracts").dialog("option", "title", "Related Contract Record(s)");
                $("#browseContracts").dialog("open");
            } else {
                $("#loadingPage").fadeOut();
                $("#browseContracts").dialog("option", "title", "Related Contract Record(s)");
                $("#browseContracts").dialog("open");
                $('#loadProContracts').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
            }
        },
        error: function () {
            $("#loadingPage").fadeOut();
            $("#browseContracts").dialog("option", "title", "Related Contract Record(s)");
            $("#browseContracts").dialog("open");
            $('#loadProContracts').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
        }
    });
}
function AddContract() {
    //manoj
    var actiondetails = "";
    //$('input:checkbox[name="RelatedContracts"]:checked').each(function () {
    //    vContracts += "; " + this.value;
    //});
    //manoj
    if ($("#lblselectedrelatedcontracts").text() != "") {
        actiondetails = "Update";
    } else {
        actiondetails = "Add";
    }
    vContracts = (vContracts != null && vContracts != "") ? vContracts.trim() : vContracts;
    vContracts = vContracts.charAt(0) == ";" ? vContracts.substr(1) : vContracts;
    vContracts = (vContracts.substr(vContracts.length - 1)) == ";" ? vContracts.slice(0, -1) : vContracts;
    vContracts = (vContracts != null && vContracts != "") ? vContracts.trim() : vContracts;

    if (vContracts != "") {
        if (!rcFromDocument) {
            $("#loadingPage").fadeIn();
            $("#RelatedContracts").val(vContracts);
            var formData = new FormData();
            formData = "AccountID=" + localStorage.AccountID;
            formData += "&RelatedContracts=" + vContracts;
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/relatedcontract?requestid=' + vRequestID + '&action=' + actiondetails,
                type: 'PUT',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken },
                data: formData,
                cache: false,
                processData: false,
                success: function (data) {
                    $("#browseContracts").dialog("close");
                    //manoj
                    pendingStarted = false;
                    //$("#tblDocumentMissing").empty();
                    GetRequestPendingAction(true, "BindPeople");
                    //manoj
                    $("#txtSearchBoxContracts").val("");
                    if (data == null) {
                        $("#browseContracts").dialog("close");
                        $("#txtSearchBoxContracts").val("");
                        BindRelatedContracts(vRequestID);
                    } else if (data.length == 0) {
                        $("#browseContracts").dialog("close");
                        $("#txtSearchBoxContracts").val("");
                        BindRelatedContracts(vRequestID);
                    } else {
                        var count = 0;
                        $("#hdnRelatedContracts").empty();
                        $("#ulRelatedContracts").html('');
                        var vContractStatus = ["Ready for Signature", "Awaiting Signatures", "Signed", "Active", "Up for Renewal", "Renewed", "Extended", "On Hold", "Replaced", "Expired", "Cancelled", "Terminated", "Archived", "About to Expire"];

                        $(data).each(function (i, item) {
                            var myUrl = '/Contracts/ContractDetails?ContractID=' + encodeURI(item.RowKey);
                            if ($.inArray(item.Status, vContractStatus) == -1)
                                myUrl += "&Stage=pipeline";

                            $("#hdnRelatedContracts").append(item.RowKey + ';');
                            if (item.InRecycleBin != "Yes") {
                                if (i == 0)
                                    $("#ulRelatedContracts").append('<a href="' + myUrl + '" class="PreserveSpace">' + item.ContractTitle + '</a>');
                                else
                                    $("#ulRelatedContracts").append('; <a href="' + myUrl + '" class="PreserveSpace">' + item.ContractTitle + '</a>');
                            }
                            else {
                                if (i == 0)
                                    $("#ulRelatedContracts").append('<span style="color: #ff4d4d" title="This Contract Record is no longer available." class="PreserveSpace">' + item.ContractTitle + '</span>');
                                else
                                    $("#ulRelatedContracts").append('; <span style="color: #ff4d4d" title="This Contract Record is no longer available." class="PreserveSpace">' + item.ContractTitle + '</span>');
                            }
                        });
                    }
                    $("#loadingPage").fadeOut();
                }, error: function (person) {
                    //manoj
                    pendingStarted = false;
                    //$("#tblDocumentMissing").empty();
                    GetRequestPendingAction(true, "BindPeople");
                    //manoj
                    $("#browseContracts").dialog("close");
                    $("#txtSearchBoxContracts").val("");
                    BindRelatedContracts(vRequestID);
                    $("#loadingPage").fadeOut();
                }
            });
        }
        else {
            $("#RelatedContracts").val(vContracts);
            $("#browseContracts").dialog("close");
            $("#txtSearchBoxContracts").val("");
            $("#loadingPage").fadeOut();
        }
        return true;
    } else {
        swal("", "No contract has been selected.");
        $("#browseContracts").dialog("close");
        return false;
    }
}
function SearchContracts() {
    $("#tblContracts").html('');
    $('#liSelectedRelatedContract').html('');
    $('#loadProContracts').html('<img src="../Content/Images/icon/loading.gif"> Searching...');
    var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/getrelatedcontracts?stage=&searchkeyword=' + encodeURIComponent($("#txtSearchBoxContracts").val()) + '&customquery=&sortbyfield=ContractTitle&orderby=ASC';
    if ($.trim($("#txtSearchBoxContracts").val()) != "") {
        $("#lblselectedrelatedcontracts").text("Yes");
    } else {
        $("#lblselectedrelatedcontracts").text("");
    }
    $.ajax({
        url: vURL,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, BusinessAreaLocation: $("#lblBusinessAreaPath").text() },
        cache: false,
        success: function (data) {
            $('#loadProContracts').empty();
            var arr = [];
            $.each($('#ulRelatedContracts').text().split(";"), function () {
                if ($.trim(this) != "No items found.") {
                    if (arr.indexOf($.trim(this)) == -1 && this != "") {
                        arr.push($.trim(this));
                    }
                }
            });
            relatedContractArr = arr;
            var datalength = data.length;
            var article = '';
            var bindlist = false;
            var articleselctedList = '';
            $(data).each(function (i, item) {
                bindlist = false;
                article += '<tr><td>';
                if (arr.indexOf(item.ContractTitle) >= 0 || arrCurrentRelated.indexOf(item.ContractTitle) >= 0) {
                    bindlist = true;
                    article += '<input id="Pro' + item.RowKey + '" type="checkbox" name="RelatedContracts" class="css1-checkbox" checked onchange="javascript:collectrelatedcontractrowkey(this);" value="' + item.ContractTitle + '" />';
                } else {
                    article += '<input id="Pro' + item.RowKey + '" type="checkbox" name="RelatedContracts" class="css1-checkbox" onchange="javascript:collectrelatedcontractrowkey(this);" value="' + item.ContractTitle + '" />';
                }

                article += '<label for="Pro' + item.RowKey + '" class="css1-label PreserveSpace"><a href="/Contracts/ContractDetails?ContractID=' + item.RowKey + '" target="_blank">' + item.ContractTitle + '</a></label></td><td><label>' + item.ContractType + '</label></td><td><label>';     //ENH487 Customer inhanc
                if (item.Counterparty != null && item.Counterparty != "") {
                    article += item.Counterparty
                } else {
                    article += "-"
                }
                article += '</label></td><td><label style="word-break: break-all;">'
                if (item.ContractNumber != null && item.ContractNumber != "") {
                    article += item.ContractNumber
                } else {
                    article += "-"
                }
                article += '</label></td><td><label>' + item.Status + '</label></td></tr>'
                if (bindlist) {
                    articleselctedList += '<span style="font-size:11px;" id="Pro' + item.RowKey + '" class="PreserveSpace">' + item.ContractTitle + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveRelatedContract(this);" style="float:right"></span>'
                }
            });

            $("#tblContracts").html(article);
            $("#liSelectedRelatedContract").html(articleselctedList);

            articleselctedList = '';
            if ($.trim($("#txtSearchBoxContracts").val()) != "") {
                $(arrCurrentRelated).each(function (i, item) {
                    if (item.trim() != $.trim($("#txtSearchBoxContracts").val())) {
                        articleselctedList = '<span style="font-size:11px;" id="Pro' + item + '">' + item + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveRelatedContract(this);" style="float:right"></span>'
                        $("#liSelectedRelatedContract").append(articleselctedList);
                    }
                });
            }

            article = '';
            articleselctedList = '';
            $(arr).each(function (item, itemselctedlist) {
                var vAccFeat = $.grep(data, function (ndata, idata) {
                    return (ndata.ContractTitle == itemselctedlist);
                });
                if (vAccFeat.length == 0) {
                    articleselctedList += '<span style="font-size:11px;" id=' + itemselctedlist + '>' + itemselctedlist + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveRelatedContract(this);" style="float:right"></span>';
                }
            });
            $("#liSelectedRelatedContract").append(articleselctedList);
            articleselctedList = '';
            var vCount = $("#tblContracts tr").length;
            if (vCount != 0) {
                $('#loadProContracts').html('');
                $("#tblContracts tr td").attr('style', 'vertical-align: top');
                $('#compact-paginationContracts').css('display', '');
                $('#compact-paginationContracts').pagination({
                    items: vCount,
                    itemsOnPage: 10,
                    type: 'tbody',
                    typeID: 'tblContracts',
                    row: 'tr',
                    cssStyle: 'compact-theme'
                });

            } else {
                $('#loadProContracts').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
                $('#compact-paginationContracts').css('display', 'none');
            }
        },
        error: function () {
            $('#compact-paginationContracts').css('display', 'none');
            $('#loadProContracts').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
        }
    });
}
function BindCreatedContracts(requestid) {
    if (requestid == null || requestid == "") {
        requestid = vRequestID;
    }
    $("#ulRelatedContractsList").empty();
    //$('#liSelected').empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/relatedcontractsfromrequest?requestid=' + requestid,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (contactsJsonPayload) {
            var count = 0;
            var vContractStatus = ["Ready for Signature", "Awaiting Signatures", "Signed", "Active", "Up for Renewal", "Renewed", "Extended", "On Hold", "Replaced", "Expired", "Cancelled", "Terminated", "Archived", "About to Expire"];
            $("#hdnRelatedContracts").empty();
            //manoj
            var filteredcontactsJsonPayload = $.grep(contactsJsonPayload, function (nfilter, indfilter) {
                return (nfilter.IsDraft != "Yes");
            });
            //manoj
            $(filteredcontactsJsonPayload).each(function (i, item) {
                var myUrl = '/Contracts/ContractDetails?ContractID=' + encodeURI(item.RowKey);
                if ($.inArray(item.Status, vContractStatus) == -1)
                    myUrl += "&Stage=pipeline";

                $("#hdnRelatedContracts").append(item.RowKey + ';');
                if (item.InRecycleBin != "Yes") {
                    if (i == 0)
                        $("#ulRelatedContractsList").append('<a href="' + myUrl + '" class="PreserveSpace">' + item.ContractTitle + '</a>');
                    else
                        $("#ulRelatedContractsList").append('; <a href="' + myUrl + '" class="PreserveSpace">' + item.ContractTitle + '</a>');
                }
                else {
                    if (i == 0)
                        $("#ulRelatedContractsList").append('<span style="color: #ff4d4d" title="This Contract Record is no longer available." class="PreserveSpace">' + item.ContractTitle + '</span>');
                    else
                        $("#ulRelatedContractsList").append('; <span style="color: #ff4d4d" title="This Contract Record is no longer available." class="PreserveSpace">' + item.ContractTitle + '</span>');
                }
            });
        },
        error: function (request) {
            $("#ulRelatedContractsList").append('No items found.');
        }

    });
}
function liRemoveRelatedContract(obj) {
    var child = obj.parentNode;
    var relatedContractTitle = child.textContent;
    if ($('#ulRelatedContracts').text().indexOf(relatedContractTitle) > -1) {
        if (!rcFromDocument) {
            swal({
                title: '',
                text: "Do you wish to remove the relationship between the <span style=\"font-weight:700\">" + relatedContractTitle + " (Contract) and " + $("#lblRequestTitle").text() + " (Request) </span>?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                html: true
            },
             function (confirmed) {
                 if (confirmed) {

                     child.parentNode.removeChild(child);
                     $("#" + child.id).attr("checked", false);

                     //manoj
                     $("#loadingPage").fadeIn();
                     var formData = new FormData();
                     formData = "AccountID=" + localStorage.AccountID;
                     formData += "&RelatedContracts=" + relatedContractTitle;
                     $.ajax({
                         url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/relatedcontract?requestid=' + vRequestID + '&action=Delete',
                         type: 'PUT',
                         dataType: 'json',
                         headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken },
                         data: formData,
                         cache: false,
                         processData: false,
                         success: function (data) {
                             if (data == null) {
                                 var selContracts = $.map(vContracts.split(';'), $.trim);
                                 var indexcon = selContracts.indexOf(relatedContractTitle);

                                 if (indexcon > -1) {
                                     selContracts.splice(indexcon, 1);
                                     vContracts = selContracts.join('; ');
                                 }

                                 BindRelatedContracts(vRequestID);
                             } else if (data.length == 0) {
                                 var selContracts = $.map(vContracts.split(';'), $.trim);
                                 var indexcon = selContracts.indexOf(relatedContractTitle);

                                 if (indexcon > -1) {
                                     selContracts.splice(indexcon, 1);
                                     vContracts = selContracts.join('; ');
                                 }

                                 BindRelatedContracts(vRequestID);
                             } else {

                                 var selContracts = $.map(vContracts.split(';'), $.trim);
                                 var indexcon = selContracts.indexOf(relatedContractTitle);

                                 if (indexcon > -1) {
                                     selContracts.splice(indexcon, 1);
                                     vContracts = selContracts.join('; ');
                                 }

                                 var count = 0;
                                 $("#hdnRelatedContracts").empty();
                                 $("#ulRelatedContracts").html('');
                                 var vContractStatus = ["Ready for Signature", "Awaiting Signatures", "Signed", "Active", "Up for Renewal", "Renewed", "Extended", "On Hold", "Replaced", "Expired", "Cancelled", "Terminated", "Archived", "About to Expire"];

                                 $(data).each(function (i, item) {
                                     var myUrl = '/Contracts/ContractDetails?ContractID=' + encodeURI(item.RowKey);
                                     if ($.inArray(item.Status, vContractStatus) == -1)
                                         myUrl += "&Stage=pipeline";

                                     $("#hdnRelatedContracts").append(item.RowKey + ';');
                                     if (item.InRecycleBin != "Yes") {
                                         if (i == 0)
                                             $("#ulRelatedContracts").append('<a href="' + myUrl + '" class="PreserveSpace">' + item.ContractTitle + '</a>');
                                         else
                                             $("#ulRelatedContracts").append('; <a href="' + myUrl + '" class="PreserveSpace">' + item.ContractTitle + '</a>');
                                     }
                                     else {
                                         if (i == 0)
                                             $("#ulRelatedContracts").append('<span style="color: #ff4d4d" title="This Contract Record is no longer available." class="PreserveSpace">' + item.ContractTitle + '</span>');
                                         else
                                             $("#ulRelatedContracts").append('; <span style="color: #ff4d4d" title="This Contract Record is no longer available." class="PreserveSpace">' + item.ContractTitle + '</span>');
                                     }
                                 });
                             }
                             arr.splice(arr.indexOf(relatedContractTitle), 1);
                             arrCurrentRelated.splice(arrCurrentRelated.indexOf(relatedContractTitle), 1);
                             relatedContractArr.splice(relatedContractArr.indexOf(relatedContractTitle), 1);  //bug id eO37449
                             $("#loadingPage").fadeOut();
                         }, error: function (person) {
                             BindRelatedContracts(vRequestID);
                             $("#loadingPage").fadeOut();
                         }
                     });
                     //manoj
                 }



                 return;
             });
        }
        else {
            child.parentNode.removeChild(child);
            $("#" + child.id).attr("checked", false);
            var chkObj = $("#" + child.id);
            var indexArr = arrCurrentRelated.indexOf(chkObj[0].value);
            if (indexArr > -1)
                arrCurrentRelated.splice(indexArr, 1);

            var selContracts = $.map(vContracts.split(';'), $.trim);
            var indexcon = selContracts.indexOf(chkObj[0].value);

            if (indexcon > -1) {
                selContracts.splice(indexcon, 1);
                vContracts = selContracts.join('; ');
            }
        }
    } else {
        child.parentNode.removeChild(child);
        var chkObj = $("#" + child.id);
        if (typeof (chkObj) != "undefined")
            $("#" + child.id).attr("checked", false);


        var indexArr = arrCurrentRelated.indexOf(chkObj[0].value);
        if (indexArr > -1)
            arrCurrentRelated.splice(indexArr, 1);

        var selContracts = $.map(vContracts.split(';'), $.trim);
        var indexcon = selContracts.indexOf(chkObj[0].value);
        if (indexcon > -1)
            selContracts.splice(indexcon, 1);
        vContracts = selContracts.join('; ');
    }
}
function collectrelatedcontractrowkey(obj) {
    var relatedContractTitle = obj.value;    //bug id eO37449
    if (obj.checked) {
        $('#liSelectedRelatedContract').append('<span style="font-size:11px;" id=' + obj.id + '>' + obj.value + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveRelatedContract(this);" style="float:right"></span>');
        arrCurrentRelated.push(obj.value);
        if (vContracts == "")
            vContracts = obj.value;
        else
            vContracts += "; " + obj.value;

    } else {
        var SelectedRelatedContract = $("#liSelectedRelatedContract");
        var child = $(SelectedRelatedContract).find("#" + obj.id);


        if ($('#ulRelatedContracts').text().indexOf(obj.value) > -1) {
            swal({
                title: '',
                text: "Do you wish to remove the relationship between the <span style=\"font-weight:700\">" + obj.value + " (Contract) and " + $("#lblRequestTitle").text() + " (Request) </span>?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                html: true
            },
     function (confirmed) {
         if (confirmed) {
             child[0].parentNode.removeChild(child[0]);
             $("#" + obj.id).attr("checked", false);
             //manoj
             $("#loadingPage").fadeIn();
             var formData = new FormData();
             formData = "AccountID=" + localStorage.AccountID;
             formData += "&RelatedContracts=" + obj.value;
             $.ajax({
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/relatedcontract?requestid=' + vRequestID + '&action=Delete',
                 type: 'PUT',
                 dataType: 'json',
                 headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken },
                 data: formData,
                 cache: false,
                 processData: false,
                 success: function (data) {
                     //manoj
                     pendingStarted = false;
                     GetRequestPendingAction(true, "BindPeople");
                     //manoj
                     if (data == null) {
                         BindRelatedContracts(vRequestID);
                     } else if (data.length == 0) {
                         BindRelatedContracts(vRequestID);
                     } else {
                         var count = 0;
                         $("#hdnRelatedContracts").empty();
                         $("#ulRelatedContracts").html('');
                         var vContractStatus = ["Ready for Signature", "Awaiting Signatures", "Signed", "Active", "Up for Renewal", "Renewed", "Extended", "On Hold", "Replaced", "Expired", "Cancelled", "Terminated", "Archived", "About to Expire"];

                         $(data).each(function (i, item) {
                             var myUrl = '/Contracts/ContractDetails?ContractID=' + encodeURI(item.RowKey);
                             if ($.inArray(item.Status, vContractStatus) == -1)
                                 myUrl += "&Stage=pipeline";

                             $("#hdnRelatedContracts").append(item.RowKey + ';');
                             if (item.InRecycleBin != "Yes") {
                                 if (i == 0)
                                     $("#ulRelatedContracts").append('<a href="' + myUrl + '" class="PreserveSpace">' + item.ContractTitle + '</a>');
                                 else
                                     $("#ulRelatedContracts").append('; <a href="' + myUrl + '" class="PreserveSpace">' + item.ContractTitle + '</a>');
                             }
                             else {
                                 if (i == 0)
                                     $("#ulRelatedContracts").append('<span style="color: #ff4d4d" title="This Contract Record is no longer available." class="PreserveSpace">' + item.ContractTitle + '</span>');
                                 else
                                     $("#ulRelatedContracts").append('; <span style="color: #ff4d4d" title="This Contract Record is no longer available." class="PreserveSpace">' + item.ContractTitle + '</span>');
                             }
                         });
                         arr.splice(arr.indexOf(relatedContractTitle), 1);       //bug id eO37449
                         relatedContractArr.splice(relatedContractArr.indexOf(relatedContractTitle), 1);
                     }
                     $("#loadingPage").fadeOut();
                 }, error: function (person) {
                     //manoj
                     pendingStarted = false;
                     GetRequestPendingAction(true, "BindPeople");
                     //manoj
                     BindRelatedContracts(vRequestID);
                     $("#loadingPage").fadeOut();
                 }
             });
             //manoj
         }
         else {
             $("#" + obj.id).prop("checked", true);
         }
         return;
     });
        }
        else {
            var indexArr = arrCurrentRelated.indexOf(obj.value);
            if (indexArr > -1)
                arrCurrentRelated.splice(indexArr, 1);
            child[0].parentNode.removeChild(child[0]);
        }
        var selContracts = $.map(vContracts.split(';'), $.trim);
        var indexcon = selContracts.indexOf(obj.value);
        if (indexcon > -1)
            selContracts.splice(indexcon, 1);
        vContracts = selContracts.join('; ');
    }
}
//Add related contract into request

function GetRequestPendingAction(open, Record) {
    if (!pendingStarted) {
        pendingStarted = true;
        if (open == true)
            $("#loadingPage").fadeIn();

        $(".clpendingaction").css("display", "none");
        var JustInfoType = "";
        var JustInfoTemplate = "";
        var JustInfoPeople = "";
        var JustInfoStatus = "";
        var JustInfoDraft = "";
        var displayRequired = [];
        var JustInfoDescription = "";
        $("#tblPeople").html('<img src="../Content/Images/icon/loading.gif">');
        $("#tblActivity").html('<img src="../Content/Images/icon/loading.gif">');
        $("#tblDocument").html('<img src="../Content/Images/icon/loading.gif">');
        $("#tblRequired").html('<img src="../Content/Images/icon/loading.gif">');
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/PendingAction?requestid=' + vRequestID,
            type: 'GET',
            cache: false,
            contentType: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            processData: false,
            success: function (item) {
                if (item != null) {
                    //manoj

                    for (keyvalue in item) {
                        switch (keyvalue) {
                            case 'JustInfoRequired': {
                                if (item[keyvalue] != null && item[keyvalue] != "" && item[keyvalue] != "No item found.") {
                                    $("#tblRequiredMissing").html('<tr><td class="text-left"><a href="javascript:void(0);" onclick="GetRequestPendingAction(true, \'Required\')" data-title="' + item[keyvalue] + '"><img src="/Content/Images/missing-exc.png" style="cursor: default !important;"/></a></td></tr>');
                                    $("#tblRequired").html("<tr><td class='f_head'>" + item[keyvalue] + "</td></tr>");
                                    displayRequired.push('tblRequiredMissing');
                                } else {
                                    $("#tblRequired").html("<tr><td class='f_head'>No Required Metadata is missing.</td></tr>");
                                }
                                break;
                            }
                            case 'JustInfoPeople': {
                                if (item[keyvalue] != null && item[keyvalue] != "" && item[keyvalue] != "No item found.") {
                                    JustInfoPeople = item[keyvalue];
                                }
                                break;
                            }
                            case 'JustInfoTemplate': {
                                JustInfoTemplate = item[keyvalue];
                                break;
                            }
                            case 'JustInfoType': {
                                JustInfoType = item[keyvalue];
                                break;
                            } case 'JustInfoStatus': {
                                JustInfoStatus = item[keyvalue];
                                break;
                            }
                            case 'JustInfoDraft': {
                                JustInfoDraft = item[keyvalue];
                                break;
                            }
                            case 'JustInfoActivity': {
                                if (item[keyvalue] != null && item[keyvalue] != "" && item[keyvalue].indexOf("No item found") == -1) {
                                    $("#tblActivity").html(item[keyvalue]);
                                } else {
                                    $("#tblActivity").html("No Pending Tasks");
                                }
                                break;
                            }
                            case 'JustInfoDesc': {
                                JustInfoDescription = item[keyvalue];
                                //$("#tblDocumentMissing").html("<tr><td class='f_head'>" + item[keyvalue] + "</td></tr>");
                                break;
                            }
                        }
                        //manoj
                    }
                    var DocumentRequired = "";
                    if (JustInfoTemplate != null && JustInfoTemplate != "" && JustInfoTemplate != "No item found.") {
                        DocumentRequired = "Missing Document Template(s):"
                        DocumentRequired += JustInfoTemplate.split(":")[1];
                        $.trim(DocumentRequired)
                    }
                    if (JustInfoType != null && JustInfoType != "" && JustInfoType != "No item found.") {
                        if (DocumentRequired == "Missing Document Template(s):") {
                            DocumentRequired += JustInfoType.split(":")[1];
                        } else {
                            DocumentRequired += ";\n" + JustInfoType;
                            $.trim(DocumentRequired)
                        }
                    }
                    //if (DocumentRequired != "") {
                    //    DocumentRequired += "</tr>";
                    //}
                    if (DocumentRequired != "") {
                        $("#tblDocumentMissing").html('<tr><td class="text-left"><a href="javascript:void(0);" data-html="true" data-title="' + DocumentRequired + '" onclick="GetRequestPendingAction(true, \'Document\')"><img src="/Content/Images/missing-exc.png"/></a></td></tr>');
                        $("#tblDocument").html("<tr><td class='f_head'><label title='" + DocumentRequired + "'>" + DocumentRequired + "</label></td></tr>");
                        displayRequired.push('tblDocumentMissing');
                    } else {
                        $("#tblDocument").html("<tr><td class='f_head'>No Required Document Template(s) and Document Type(s) are missing.</td></tr>");
                    }
                    if (JustInfoPeople.indexOf("Collaborator(s)") > -1) {
                        JustInfoPeople = JustInfoPeople.replace("Collaborator(s), ", "");
                    }
                    if (JustInfoStatus == "New" || JustInfoDraft == "Yes") {
                        JustInfoPeople = ", " + JustInfoPeople.replace(/ , /g, ",");
                        if (JustInfoStatus == "New") {
                            JustInfoPeople = JustInfoPeople.replace(", Approver(s)", "");
                        }
                        if (JustInfoDraft == "Yes") {
                            JustInfoPeople = JustInfoPeople.replace(", Approver(s)", "");
                            JustInfoPeople = JustInfoPeople.replace(", Assigned To", "");
                        }
                        JustInfoPeople = JustInfoPeople.charAt(0) == "," ? JustInfoPeople.substr(1) : JustInfoPeople;
                    }


                    if (JustInfoPeople.lastIndexOf(", ") > -1) {
                        JustInfoPeople = JustInfoPeople.substr(0, JustInfoPeople.lastIndexOf(", ")) + ' and ' + JustInfoPeople.substr(JustInfoPeople.lastIndexOf(", ") + 1);
                    }

                    if (JustInfoPeople != "") {
                        if (JustInfoPeople.trim() != "") {
                            JustInfoPeople = "Missing" + ((JustInfoPeople.charAt(0) == " ") ? JustInfoPeople : " " + JustInfoPeople);
                            $("#tblPeopleMissing").html('<tr><td class="text-left"><a href="javascript:void(0);" onclick="GetRequestPendingAction(true, \'People\')"  data-title="' + JustInfoPeople + '"><img src="/Content/Images/missing-exc.png"/></a></td></tr>');
                            $("#tblPeople").html("<tr><td class='f_head'><label title='" + JustInfoPeople + "'>" + JustInfoPeople + "</label></td></tr>");
                            displayRequired.push('tblPeopleMissing');
                        } else {
                            $("#tblPeople").html("<tr><td class='f_head'>No item found.</td></tr>");
                        }
                    } else {
                        $("#tblPeople").html("<tr><td class='f_head'>No Required People(s) are missing.</td></tr>");
                    }


                    //manoj
                    //Show Hide Missing Required Section
                    if (JustInfoDescription == "No item found.") {
                        $("#tblDescriptionMissing").html("<tr><td class='f_head' style='line-height: 13px !important;'><a href='javascript:void(0);' data-title='Missing Request Description.'><img src='/Content/Images/missing-exc.png' style='cursor: default !important;'/></a></td></tr>");
                        $("#lblRequestDescription").css("display", "");
                    } else {
                        $("#tblDescriptionMissing").html('<tr><td class="text-left"><a href="javascript:void(0);"  data-title="' + JustInfoDescription + '"><img src="/Content/Images/missing-exc.png" style="cursor: default !important;"/></a></td></tr>');
                        if (JustInfoStatus != "Cancelled" && JustInfoStatus != "Completed") {
                            $("#tblDescriptionMissing").parent().show();
                            $("#lblRequestDescription").css("display", "none");
                        } else {
                            $("#tblDescriptionMissing").parent().hide();
                            $("#lblRequestDescription").css("display", "");
                        }
                    }
                    //Show Hide Missing Required Section
                    //Required msg Hidden/Show
                    if (JustInfoStatus != "Cancelled" && JustInfoStatus != "Completed") {
                        if (displayRequired.length > 0) {
                            $(displayRequired).each(function (idisplayRequired, itemdisplayRequired) {
                                $("#" + itemdisplayRequired).parent().show();
                            });
                        } else {
                            if (displayRequired.length > 0) {
                                $(".clpendingaction").css("display", "");
                            }
                        }
                    } else {
                        $("#tblPeople").html("<tr><td class='f_head'>No Required People(s) are missing.</td></tr>");
                        $("#tblDocument").html("<tr><td class='f_head'>No Required Document Template(s) and Document Type(s) are missing.</td></tr>");
                        $("#tblRequired").html("<tr><td class='f_head'>No Required Metadata is missing.</td></tr>");
                        $(".clpendingaction").css("display", "none");
                    }
                    //Required msg Hidden/Show
                    //manoj

                    if (open == true && Record != "BindPeople") {
                        //manoj
                        var passdispalyid = "";
                        $(".cltabrequired").removeClass('pop_up__Acti');
                        $('.cltblrequired').css("display", "none");
                        if (typeof Record != 'undefined') {
                            $("#li" + Record).addClass('pop_up__Acti');
                            $("#tbl" + Record).css("display", "");
                            passdispalyid = "tbl" + Record;
                        } else {
                            $("#liRequired").addClass('pop_up__Acti');
                            $("#tblRequired").css("display", "");
                            passdispalyid = "tblRequired";
                        }
                        //manoj
                        allowtoupdate(passdispalyid);
                        $("#loadingPage").fadeOut();
                        $("#dialogDelay").dialog("open");
                    } else if (Record == "BindPeople") {
                        $("#loadingPage").fadeOut();
                    }
                }
                //ENH 440 Display Alerts for Missing information
                var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));

                if (oGeneralSetting != "") {
                    if (oGeneralSetting.DisplayMissingInformation == "No") {
                        $(".clpendingaction").css("display", "none");
                    }
                }
                else {
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/settings',
                        type: 'GET',
                        dataType: 'json',
                        headers: { 'eContracts-ApiKey': localStorage.APIKey },
                        cache: false,
                        success: function (data) {
                            if (data.DisplayMissingInformation == "No") {
                                $(".clpendingaction").css("display", "none");
                            }
                        },
                        error: function (data) {
                            $(".clpendingaction").css("display", "none");
                        }
                    });

                }


                //var vMissInfoFeat = $.grep(veContractFeatures, function (n, i) {
                //    return (n.RowKey == "28" && n.Status == "ON");
                //});

                //if (!(vMissInfoFeat.length > 0)) {
                //    $(".clpendingaction").css("display", "none");
                //}
                //ENH 440 Display Alerts for Missing information
            },
            error: function () {
                $("#tblDocumentMissing").html('');
                $("#tblDescriptionMissing").parent().hide();
                $("#lblRequestDescription").css("display", "");
                $("#tblDescriptionMissing").html('');
                $("#tblRequiredMissing").html("");
                $("#tblPeopleMissing").html("");
                $("#tblPeople").html("<tr><td class='f_head'>No item found.</td></tr>");
                $("#tblDocument").html("<tr><td class='f_head'>No item found.</td></tr>");
                $("#tblRequired").html("<tr><td class='f_head'>No item found.</td></tr>");
                $("#tblActivity").html("<tr><td class='f_head'>No item found.</td></tr>");

                $(".clpendingaction").css("display", "none");
                pendingStarted = false;
                if (open == true && Record != "BindPeople") {
                    //manoj
                    var passdispalyid = "";
                    $(".cltabrequired").removeClass('pop_up__Acti');
                    $('.cltblrequired').css("display", "none");
                    if (typeof Record != 'undefined') {
                        $("#li" + Record).addClass('pop_up__Acti');
                        $("#tbl" + Record).css("display", "");
                        passdispalyid = "tbl" + Record;
                    } else {
                        $("#liRequired").addClass('pop_up__Acti');
                        $("#tblRequired").css("display", "");
                        passdispalyid = "tblRequired";
                    }
                    //manoj
                    allowtoupdate(passdispalyid);
                    $("#loadingPage").fadeOut();
                    $("#dialogDelay").dialog("open");
                } else if (Record == "BindPeople") {
                    $("#loadingPage").fadeOut();
                }
            }
        });
    }
    else {
        if (open == true && Record != "BindPeople") {
            //manoj
            var passdispalyid = "";
            $(".cltabrequired").removeClass('pop_up__Acti');
            $('.cltblrequired').css("display", "none");
            if (typeof Record != 'undefined') {
                $("#li" + Record).addClass('pop_up__Acti');
                $("#tbl" + Record).css("display", "");
                passdispalyid = "tbl" + Record;
            } else {
                $("#liRequired").addClass('pop_up__Acti');
                $("#tblRequired").css("display", "");
                passdispalyid = "tblRequired";
            }
            //manoj
            allowtoupdate(passdispalyid);
            $("#loadingPage").fadeOut();
            $("#dialogDelay").dialog("open");
        } else if (Record == "BindPeople") {
            $("#loadingPage").fadeOut();
        }
    }
}

//Leagal entity method(s)
function getcompanyprofile(obj) {
    if (typeof obj != 'undefined' && obj != "") {
        //do {
        //    obj = obj.replace("%20", " ");
        //} while (obj.indexOf("%20") > -1);
        //manoj
        obj = obj.replace(/%20/g, '');
        //manoj

    }
    else {
        obj = "";
    }
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
            var legalentityval = $("#CompanyProfile").find('option:selected').text();
            $(data).each(function (i, item) {
                if (item.LegalEntityName == obj) {
                    control += "<option value='" + item.LegalEntityName + "' selected='selected'>" + item.LegalEntityName + "</option>";
                } else {
                    control += "<option value='" + item.LegalEntityName + "'>" + item.LegalEntityName + "</option>";
                }


                var article = '<li>';
                if ($('#OriginatingParty').val() != "") {
                    if ($('#OriginatingParty').val() == item.LegalEntityName) {
                        article += '<input id="OP' + item.RowKey + '" type="radio" name="OriginatingParty" class="css-checkbox" checked value="' + item.LegalEntityName + '" />';
                    } else {
                        article += '<input id="OP' + item.RowKey + '" type="radio" name="OriginatingParty" class="css-checkbox" value="' + item.LegalEntityName + '" />';
                    }
                    article += '<label for="OP' + item.RowKey + '" class="css-label">' + item.LegalEntityName + '</label>';
                    article += '</li>';
                    $("#tblOPLegalEntities").append(article);
                } else if (typeof legalentityval != 'undefined' && legalentityval != '' && legalentityval != '--Select--') {
                    if ($("#CompanyProfile").find('option:selected').text() == item.LegalEntityName) {
                        article += '<input id="OP' + item.RowKey + '" type="radio" name="OriginatingParty" class="css-checkbox" checked value="' + item.LegalEntityName + '" />';
                    } else {
                        article += '<input id="OP' + item.RowKey + '" type="radio" name="OriginatingParty" class="css-checkbox" value="' + item.LegalEntityName + '" />';
                    }
                    article += '<label for="OP' + item.RowKey + '" class="css-label">' + item.LegalEntityName + '</label>';
                    article += '</li>';
                    $("#tblOPLegalEntities").append(article);
                }
                else {
                    if (thisContractAreaSettings.LegalEntity == item.LegalEntityName) {
                        article += '<input id="OP' + item.RowKey + '" type="radio" name="OriginatingParty" class="css-checkbox" checked value="' + item.LegalEntityName + '" />';
                    } else {
                        article += '<input id="OP' + item.RowKey + '" type="radio" name="OriginatingParty" class="css-checkbox" value="' + item.LegalEntityName + '" />';
                    }
                    article += '<label for="OP' + item.RowKey + '" class="css-label">' + item.LegalEntityName + '</label>';
                    article += '</li>';
                    $("#tblOPLegalEntities").append(article);
                }
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
function Removetextvalues() {
    $("#OriginatingParty").val("");
}
function AddOriginatingParty() {
    if ($('input:radio[name=OriginatingParty]:checked').val() != null) {
        $('#OriginatingParty').val($('input:radio[name=OriginatingParty]:checked').val());
        return true;
    } else {
        // alert('No Originating Party has been selected.');
        swal("", "No Originating Party has been selected.");
        return false;
    }
}
//Legal entity method(s)

//Request Status
function getStatus(obj) {
    var control = "";
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/requeststatus',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: false,
        success: function (status) {
            $(status).each(function (i, item) {
                if (item.RequestStatus == obj) {
                    control += "<option value='" + item.RequestStatus + "' selected='selected'>" + item.RequestStatus + "</option>";
                } else {
                    control += "<option value='" + item.RequestStatus + "'>" + item.RequestStatus + "</option>";
                }
            });
        }
    });
    return control;
}
//Request Status

//Project & Project Task method(s)
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
            var arr = [];
            var counterpartyTags = [];
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
                var arr = [];
                var counterpartyTags = [];
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

                        article += '<tr><td style="padding: 10px 10px 10px 25px;">';
                        if (arr.indexOf(vVarProjectName + ':' + item.TaskID) >= 0) {
                            article += '<input id="' + vVarProjectName + item.RowKey + '" type="checkbox" title="' + vVarProjectName + '" onclick="funselecttask(this);" name="ProjectTask" class="css1-checkbox" checked   value="' + vVarProjectName + ':' + item.TaskID + '" />';
                        } else {
                            article += '<input id="' + vVarProjectName + item.RowKey + '" type="checkbox" title="' + vVarProjectName + '" onclick="funselecttask(this);" name="ProjectTask" class="css1-checkbox"   value="' + vVarProjectName + ':' + item.TaskID + '" />';
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
function AddProject() {
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
        return true;
    } else {
        $('#Project').val('');
        swal("", "No project has been selected.");
        return false;
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
function ViewProjectTasks() {
    if ($("#Project").val() != "") {
        $('#loadPro').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
        ProjectTasksFunc();
    } else {
        swal("", "Please select project");
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
function SearchProjects() {

    $('#loadPro').html('<img src="../Content/Images/icon/loading.gif"> Searching...');
    var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/project?searchkeyword=' + encodeURIComponent($("#txtSearchBoxProjects").val()) + '&customquery=&sortbyfield=ProjectName&orderby=ASC';
    $.ajax({
        url: vURL,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            $("#tblProjects").html('');
            $('#loadPro').empty();
            var arr = [];
            $.each($('#Project').val().split(";"), function () {
                arr.push($.trim(this));
            });
            var datalength = data.length;
            for (var i = 0; i < datalength; i++) {
                var item = data[i];
                var article = '';
                if (i == 0) {
                    article += '<tr><th>Project Name</th></tr>';
                }
                article = '<tr><td>';
                if (arr.indexOf(item.ProjectName) >= 0) {
                    article += '<input id="Pro' + item.RowKey + '" type="checkbox" name="Project" class="css1-checkbox" checked value="' + item.ProjectName + '" />';
                } else {
                    article += '<input id="Pro' + item.RowKey + '" type="checkbox" name="Project" class="css1-checkbox" value="' + item.ProjectName + '" />';
                }

                article += '<label for="Pro' + item.RowKey + '" class="css1-label">' + item.ProjectName + '</label>';
                article += '<input type="text" name="ProjectManager" style="display: none;" value="' + item.ProjectManager + '" />';
                article += '</td></tr>';
                $("#tblProjects").append(article);
            }
            var vCount = $("#tblProjects tr").length;
            if (vCount != 0) {
                $('#loadPro').html('');
                $('#compact-paginationProjects').css('display', '');
                $('#compact-paginationProjects').pagination({
                    items: vCount,
                    itemsOnPage: 10,
                    currentPage: 1,
                    cssStyle: 'compact-theme',
                    type: 'tdbody',
                    row: 'tr',
                    typeID: 'tblProjects'
                });
            } else {
                $('#loadPro').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
                $('#compact-paginationProjects').css('display', 'none');
            }
        },
        error: function () {
            $('#compact-paginationProjects').css('display', 'none');
            $('#loadPro').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
        }
    });

}
//Project & Project Task method(s)

function SelectCounterparties() {
    $("#OPLeagalEntities").removeClass('pop_up_Harizondal_meta_active');
    $("#OPCounterparties").addClass('pop_up_Harizondal_meta_active');
    $('#tblOPLegalEntities').css("display", "none");
    $('#tblOPCounterparties').css("display", "");
    $('#txtOriginatingPartyType').val("Counterparty");
    $('#compact-paginationOPCounterparties').css("display", "");
    $('#compact-paginationOPLegalEntities').css("display", "none");
}

function SelectLegalEntities() {
    $("#OPCounterparties").removeClass('pop_up_Harizondal_meta_active');
    $("#OPLeagalEntities").addClass('pop_up_Harizondal_meta_active');
    $('#tblOPLegalEntities').css("display", "");
    $('#tblOPCounterparties').css("display", "none");
    $('#txtOriginatingPartyType').val("Legal Entity");
    $('#compact-paginationOPLegalEntities').css("display", "");
    $('#compact-paginationOPCounterparties').css("display", "none");
}

//Get contract type list
function getContractType(obj) {
    var control = "";
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracttypes',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: false,
        success: function (status) {
            $(status).each(function (i, item) {
                if (item.ContractType == obj) {
                    control += "<option value='" + item.ContractType + "' selected='selected'>" + item.ContractType + "</option>";
                } else {
                    control += "<option value='" + item.ContractType + "'>" + item.ContractType + "</option>";
                }
            });
        }
    });
    return control;
}
//Get contract type list

//Get currency format
function getContractCurrency(obj) {
    $("#ContractCurrency").empty();
    var control = "";
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/currencies',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: false,
        success: function (data) {
            $(data).each(function (i, item) {
                if (item.Abbreviation == obj) {
                    control += "<option value='" + item.Abbreviation + "' selected='selected'>" + item.Abbreviation + "</option>";
                } else {
                    control += "<option value='" + item.Abbreviation + "'>" + item.Abbreviation + "</option>";
                }
            });
        }
    });
    return control;
}
//Get currency format

//Browse Generic for all generic LookUp field(s)
function ViewGeneric(obj) {
    vGlobalObjForGeneric = obj;
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/requestfieldbydisplayname?fielddisplayname=' + obj.id,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $("#tblGenericheader").empty();
            $("#tblGeneric").empty();
            $("#liSelectedRU").empty();
            var art = '<tr><td><article style="width:100%; text-align:center;">';
            art += '<input id="txtSearchBoxGeneric" class="f_inpt cl width80" type="text" style="text-wrap:none" placeholder="Type to Search" />';
            art += '<img title="Search" style="cursor: pointer; position: relative; left: -40px; top:-2px;" onclick="javascript: SearchGeneric();" src="../Content/Images/search_over.png" />';
            art += "<a href='javascript:void(0)' class='linkPickerClear' onclick='ClearGeneric();'>Clear</a>";
            art += '</article></td></tr>';
            $("#tblGenericheader").append(art);
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
            $("#loadingPage").fadeOut();
            $("#browseGeneric").dialog("open");

        },
        error:
            function (data) {
                $("#loadingPage").fadeOut();
                $("#browseGeneric").dialog("open");
                $("#tblGeneric").html('<p style="color: black; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>');
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
    }
    else {
        var spltarrprevRUstr = arrprevRU.toString();
        if (spltarrprevRUstr.indexOf(";") > -1) {
            var spltarrprevRU = spltarrprevRUstr.split(';');
            arrprevRU = [];
            for (var arrli = 0; arrli < spltarrprevRU.length; arrli++) {
                if (spltarrprevRU[arrli].trim() != "") {
                    arrprevRU.push(spltarrprevRU[arrli].trim());
                }
            }
        }
        for (var i = startIndex; i < endIndex; i++) {
            var article = "";
            if (i == startIndex) {
                article += '<tr><th><input id="selectall" onclick="funselectall(this);" type="checkbox"/> Select/Deselect All</th></tr>';
            }

            article += '<tr><td>';
            if (arrprevRU != null && multipleChecksDocumentID.length > 0) {
                if (arrprevRU.indexOf(myArrayRU[i].trim()) >= 0 && multipleChecksDocumentID.indexOf(myArrayRU[i].trim()) > -1) {
                    article += '<input id="' + myArrayRU[i].trim() + '" type="checkbox" name="Generic" onclick="checkMultipleDocuments(this);" checked class="css1-checkbox" value="' + myArrayRU[i].trim() + '" />';
                }
                else if (multipleChecksDocumentID.indexOf(myArrayRU[i].trim()) > -1) {
                    article += '<input id="' + myArrayRU[i].trim() + '" type="checkbox" name="Generic" onclick="checkMultipleDocuments(this);" checked class="css1-checkbox" value="' + myArrayRU[i].trim() + '" />';
                }
                else {
                    article += '<input id="' + myArrayRU[i].trim() + '" type="checkbox" name="Generic" onclick="checkMultipleDocuments(this);"  class="css1-checkbox" value="' + myArrayRU[i].trim() + '" />';
                    checkboxchecking = false;
                }
            }
            else if (arrprevRU.indexOf(myArrayRU[i].trim()) >= 0 && multipleChecksDocumentID.length == 0) {
                article += '<input id="' + myArrayRU[i].trim() + '" type="checkbox" name="Generic" onclick="checkMultipleDocuments(this);" checked class="css1-checkbox" value="' + myArrayRU[i].trim() + '" />';
            }
            else if (multipleChecksDocumentID.indexOf(myArrayRU[i].trim()) > -1) {
                article += '<input id="' + myArrayRU[i].trim() + '" type="checkbox" name="Generic" onclick="checkMultipleDocuments(this);" checked class="css1-checkbox" value="' + myArrayRU[i].trim() + '" />';
            }
            else {
                article += '<input id="' + myArrayRU[i].trim() + '" type="checkbox" name="Generic" onclick="checkMultipleDocuments(this);"  class="css1-checkbox" value="' + myArrayRU[i].trim() + '" />';
                checkboxchecking = false;
            }
            article += '<label for="' + myArrayRU[i].trim() + '" class="css1-label">' + myArrayRU[i].trim() + '</label>';
            article += '</td></tr>';
            $("#tblGeneric").append(article);
            $('#loading').empty();
            resultfound = true;

        }
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
    multipleChecksDocumentID = [];
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/requestfieldbydisplayname?fielddisplayname=' + vGlobalObjForGeneric.id,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $("#tblGeneric").empty();
            $("#liSelectedRU").empty();
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
                    }
                }
                obj1[arraysplitRU[i]] = true;
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
                $('#loadGen').empty();
                $("#tblGeneric").html('<p style="color: black; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>');
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
function liRemoveSelectedRU(obj) {
    var child = obj.parentNode;
    var child12 = child.firstChild.nodeValue;
    child12 = child12.trim();
    if (multipleChecksDocumentID.indexOf(child12) != -1) {
        var ind = multipleChecksDocumentID.indexOf(child12);
        multipleChecksDocumentID.splice(ind, 1);
    }

    $("#" + child12).prop('checked', false);
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
        $("#selectall").prop('checked', true);
    }
    else {
        $("#selectall").prop('checked', false);
    }
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
        $("#selectall").prop('checked', true);
    }
    else {
        $("#selectall").prop('checked', false);
    }
    try {
        hideAllMenuAndStopPro(event);
    }
    catch (ex) {

    }
}
function funselectall(obj) {
    if (obj.checked) { // check select status       
        $('input:checkbox[name=Generic]').prop('checked', true);
        checkMultipleDocuments("");
    }
    else {
        $('input:checkbox[name=Generic]').prop('checked', false);
        checkMultipleDocuments("");
    }
}
//Browse Generic for all generic LookUp field(s)

//Browse counterparty related method(s)
function ViewCounterparty(selectedFieldName) {
    strSelCounterPartyField = selectedFieldName;
    var counter = "";
    if (strSelCounterPartyField != "") {
        counter = $("#" + strSelCounterPartyField + "").val();
    }
    else {
        counter = $("#Counterparty").val();
    }
    if (vCounterpartyFields.length > 0) {
        CounterpartyFunc();
    }
    else {
        CounterpartyFunc();
        //manoj
        //if (localStorage.UserType.indexOf("Global Contract Owner") >= 0 || localStorage.UserType.indexOf("Global Administrator") >= 0) {
        //    $("#menuSMultiple").css("display", "");
        //    getCounterpartyprimaryFields();
        //} else {
        //    $("#menuSMultiple").css("display", "none");
        //}
        getCounterpartyprimaryFields();
        //manoj
    }
    $('#loadCP').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    PrvRelatedCounterparities = [];
    arrRelatedCounterparities = [];
    curRelatedCounterparities = [];
    $("#browseCounterparty").dialog("option", "title", "Counterparty Picker");
    $("#browseCounterparty").dialog("open");
}
function getCounterpartyprimaryFields() {
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
                            vCounterpartyFields.push(item.FieldName)
                        }
                    }
                    else {
                        vCounterpartyFields.push(item.FieldName)
                    }
                }
            });

        },
        error: function (metadataFields) {
            vCounterpartyFields = [];

        }
    });
}
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
            if (strSelCounterPartyField != "") {
                $("#" + strSelCounterPartyField + "").val(arrselectedcunterparty.join("; "));
            }
            else {
                $("#Counterparty").val(arrselectedcunterparty.join("; "));
            }
        } else {
            if (strSelCounterPartyField != "") {
                $("#" + strSelCounterPartyField + "").val('');
            }
            else {
                $("#Counterparty").val('');
            }
        }
        arrselectedcunterparty = [];
        //manoj
        $("#browseCounterparty").dialog("close");
        return true;
    }
    else {
        if (requiredValidator('addNewEntityFieldsTest'), false) {
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

                cpresult = "&";
                $("#counterpartyForm .fieldphonecontrol").each(function (index) {
                    if ($(this).val() != null && $(this).val() != "") {
                        var name = $(this)[0].id.split('_')[0];
                        var value = $(this).intlTelInput("getSelectedCountryData").iso2 + "," + $(this).intlTelInput("getSelectedCountryData").dialCode + "," + $(this).intlTelInput("getNumber", intlTelInputUtils.numberFormat.INTERNATIONAL);
                        cpresult = cpresult + name + "=" + value + "&";
                    }
                    else {
                        var name = $(this)[0].id.split('_')[0];
                        var value = "";
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

                        if (strSelCounterPartyField != "") {
                            if ($('#' + strSelCounterPartyField + '').val() != "") {
                                var CPValue = $('#' + strSelCounterPartyField + '').val() + "; " + $("#txtCounterpartyName").val();
                                $('#' + strSelCounterPartyField + '').val(CPValue.trim());
                            }
                            else {
                                $('#' + strSelCounterPartyField + '').val($("#txtCounterpartyName").val());

                            }
                        }
                        else {
                            if ($('#Counterparty').val() != "") {
                                var CPValue = $('#Counterparty').val() + "; " + $("#txtCounterpartyName").val();
                                $('#Counterparty').val(CPValue.trim());
                            }
                            else {
                                $('#Counterparty').val($("#txtCounterpartyName").val());
                            }
                        }


                        $('#chkCounterpartyNotInList').prop('checked', false);
                        $('#dvCPExistingCounterparty').css("display", "");
                        $('#dvCPAddCounterparty').css("display", "none");
                        $('#rdCPAddCounterparty').prop('checked', false);
                        $('#rdCPExistingCounterparty').prop('checked', true);

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
                if (strSelCounterPartyField != "") {
                    if ($('#' + strSelCounterPartyField + '').val() != "") {
                        var arrselectedcounterpaty = ";" + $('#' + strSelCounterPartyField + '').val().replace("; ", ";") + ";"
                        if (arrselectedcounterpaty.toLowerCase().indexOf(";" + $("#txtCounterpartyName").val().trim().toLowerCase() + ";") > -1) {
                            duplicatecounteparty = true;
                        }
                    }
                }
                else {
                    if ($('#Counterparty').val() != "") {
                        var arrselectedcounterpaty = ";" + $('#Counterparty').val().replace("; ", ";") + ";"
                        if (arrselectedcounterpaty.toLowerCase().indexOf(";" + $("#txtCounterpartyName").val().trim().toLowerCase() + ";") > -1) {
                            duplicatecounteparty = true;
                        }
                    }
                }


                if (!duplicatecounteparty) {
                    $('#dvCPExistingCounterparty').css("display", "");
                    $('#dvCPAddCounterparty').css("display", "none");
                    $('#rdCPAddCounterparty').prop('checked', false);
                    $('#rdCPExistingCounterparty').prop('checked', true);
                    if (strSelCounterPartyField != "") {
                        if ($('#' + strSelCounterPartyField + '').val() != "") {
                            var CPValue = $('#' + strSelCounterPartyField + '').val() + "; " + $("#txtCounterpartyName").val();
                            $('#' + strSelCounterPartyField + '').val(CPValue.trim());
                        }
                        else {
                            $('#' + strSelCounterPartyField + '').val($("#txtCounterpartyName").val());
                        }
                    }
                    else {
                        if ($('#Counterparty').val() != "") {
                            var CPValue = $('#Counterparty').val() + "; " + $("#txtCounterpartyName").val();
                            $('#Counterparty').val(CPValue.trim());
                        }
                        else {
                            $('#Counterparty').val($("#txtCounterpartyName").val());
                        }
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
            if (strSelCounterPartyField != "") {
                if (typeof ($('#' + strSelCounterPartyField + '').val()) != 'undefined' && $('#' + strSelCounterPartyField + '').val() != null && $('#' + strSelCounterPartyField + '').val() != "") {
                    $.each($('#' + strSelCounterPartyField + '').val().replace("; ", ";").split(";"), function () {
                        SelectedCounterpartList.push($.trim(this));
                    });
                }
            }
            else {
                if (typeof ($('#Counterparty').val()) != 'undefined' && $('#Counterparty').val() != null && $('#Counterparty').val() != "") {
                    $.each($('#Counterparty').val().replace("; ", ";").split(";"), function () {
                        SelectedCounterpartList.push($.trim(this));
                    });
                }
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
                                    if (this != null && this.toString() != "") {
                                        var contBusi = this.split('>');
                                        if (typeof (contBusi) != "undefined") {
                                            if (contBusi.length > 0) {
                                                contractarea = contBusi[0].trim();
                                                Businesssarea = contBusi[contBusi.length - 1].trim();
                                                if (thisBusinessAreaNameC == Businesssarea && thisContractAreaNameC == contractarea)
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
            var article = '<thead><tr><th><input id="selectallCounterParty" onclick="funselectallCounterParty(this);" type="checkbox"/> Counterparty Name</th><th>Counterparty Type</th><th>Country</th></tr></thead><tbody>';
            var countryvalue = ''
            $(myCounterPartyArrayList).each(function (iArray, itemArray) {
                article += '<tr><td>';
                if (SelectedCounterpartList.length > 0) {
                    if (SelectedCounterpartList.indexOf(itemArray.CounterpartyName.trim()) > -1) {
                        article += '<input id="' + itemArray.RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);" checked class="css1-checkbox" value="' + escape(itemArray.CounterpartyName.trim()) + '" />';
                    }
                    else {
                        article += '<input id="' + itemArray.RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);"  class="css1-checkbox" value="' + escape(itemArray.CounterpartyName.trim()) + '" />';
                    }
                }
                else {
                    article += '<input id="' + itemArray.RowKey + '" type="checkbox" name="Counterparty" onclick="checkMultipleDocumentsCounterParty(this);"  class="css1-checkbox" value="' + escape(itemArray.CounterpartyName.trim()) + '" />';
                }
                article += '<label for="CP' + itemArray.RowKey + '" class="css1-label" title="' + escape(itemArray.CounterpartyName.trim()) + '" onmouseover="UnescapeNameMouseOver(this)" style="display: inline;">' + itemArray.CounterpartyName.trim() + '</label></td>';
                article += '<td>' + itemArray.CounterpartyType + '</td>';
                countryvalue = itemArray.Country != "0" ? itemArray.Country : "-"
                article += '<td>' + countryvalue + '</td>';
                article += '</tr>';
            });
            //manoj
            $("#listWrapper").html('<table id="tblCounterparties" class="f_list"></table>');
            $("#tblCounterparties").html(article);
            _alphabetSearch = '';
            $("#tblCounterparties").DataTable({
                "columnDefs": [
                    { "orderable": false, 'targets': "_all" }
                ],
                "fnDrawCallback": function () { eventFired('Counterparty', 'selectallCounterParty', 'tblCounterparties'); },
                "iDisplayLength": 20,
                "searchHighlight": true,
                "pagingType": "full_numbers",
                //"scrollY": "420px",
                //"scrollCollapse": true,
            });
            alphabeticselection('tblCounterparties');
            article = '';
            if ($('input:checkbox[name="Counterparty"]:checked').length == $('input:checkbox[name="Counterparty"]').length && $('input:checkbox[name="Counterparty"]:checked').length != 0) {
                $("#selectallCounterParty").attr('checked', true);
            } else {
                $("#selectallCounterParty").attr('checked', false);
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
            $('#loadCP').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
        }
    });
}
function funselectallCounterParty(obj) {
    if (obj.checked) { // check select status  
        $('input:checkbox[name=Counterparty]').attr('checked', true);
    } else {
        $('input:checkbox[name=Counterparty]').attr('checked', false);
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
    //$.each($('input:checkbox[name="Counterparty"]', tablebind.rows().nodes()), function () {
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

    if ($('input:checkbox[name="Counterparty"]:checked').length == $('input:checkbox[name="Counterparty"]').length && $('input:checkbox[name="Counterparty"]:checked').length != 0) {
        $("#selectallCounterParty").attr('checked', true);
    } else {
        $("#selectallCounterParty").attr('checked', false);
    }
    //manoj

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
    //$.each($('input:checkbox[name="Counterparty"]:checked', tablebind.rows().nodes()), function () {
    $('input:checkbox[name="Counterparty"]:checked').each(function () {
        if (typeof ($.trim(this)) != 'undefined' && $.trim(this) != null) {
            if (unescape($.trim(this.value)) == child.textContent) {
                this.checked = false;
            }
        }
    });
    child.parentNode.removeChild(child);

    if ($('input:checkbox[name="Counterparty"]:checked').length == $('input:checkbox[name="Counterparty"]').length && $('input:checkbox[name="Counterparty"]:checked').length != 0) {
        $("#selectallCounterParty").attr('checked', true);
    } else {
        $("#selectallCounterParty").attr('checked', false);
    }
    //manoj
}
//function CounterpartyPopup() {
//    //$("#txtCounterpartyID").val("");
//    //$("#txtCounterpartyName").val("");
//    $('#ddlCounterpartyType').val('0');
//    $("#txtAddressLine1").val("");
//    $("#txtAddressLine2").val("");
//    $("#txtCity").val("");
//    $("#txtState").val("");
//    $("#txtZip").val("");
//    $('#ddlCountry').val('0');
//    $("#txtContactNo").val("");
//    $("#txtEmailID").val("");
//    $("#ddlStatus").val("Active");
//    $(".validelement").each(function (index, element) {
//        $(element).removeClass("error");
//        $("#errormsg_" + element.id).remove();
//    });

//    $("#addEditCounterparty").dialog("option", "title", "New Counterparty");
//    $("#addEditCounterparty").dialog("open");
//}


function CounterpartyPopup(obj) {
    getCounterpartyFieldsadd();
    $("#txtCounterpartyIDadd").val("");
    $("#txtNewCpBusinessArea").val('');
    // $('input[type="radio"][name=IsGlobal][value="Yes"]').prop('checked', true);
    $("#trcp-RgBusi").hide();
    $("#txtNewCpBusinessArea").removeClass("validelement");
    $("#txtCounterpartyNameadd").val((obj != null && obj != "") ? obj.trim() : "");
    $('#ddlCounterpartyTypeadd').val('0');


    if (thisBusinessAreaNameC == "") {
        $('input[type="radio"][name=IsGlobalN][value="Yes"]').prop('checked', true);
        $('#counterpartyItemsadd #trcp-RgBusi').hide();
        $("#txtNewCpBusinessArea").removeClass("validelement");
    }
    else {

        $('input[type="radio"][name=IsGlobalN][value="No"]').prop('checked', true);
        $('#counterpartyItemsadd #trcp-RgBusi').show();
        $("#txtNewCpBusinessArea").addClass("validelement");
        addDefaultBusinessareaCounterparty();
    }
    //$("#txtAddressLine1add").val("");
    //$("#txtAddressLine2add").val("");
    //$("#txtCityadd").val("");
    //$("#txtStateadd").val("");
    //$("#txtZipadd").val("");
    //$('#ddlCountryadd').val('0');
    //$("#txtContactNoadd").val("");
    //$("#txtEmailIDadd").val("");
    $("#ddlStatusadd").val("Active");


    //$(".validelement").each(function (index, element) {
    //    $(element).removeClass("error");
    //    $("#errormsg_" + element.id).remove();
    //});

    //$("#addEditCounterparty").dialog("option", "title", "New Counterparty");
    //$("#addEditCounterparty").dialog("open");
}

$('input[type=radio][name=IsGlobalN]').change(function () {
    if (this.value == 'Yes') {
        //  $("#trcp-RgBusi").hide();
        $('#counterpartyItemsadd #trcp-RgBusi').hide();
        $("#txtNewCpBusinessArea").removeClass("validelement");
        selectedBusinessAreaID11 = [];
        selectedBusinessAreaID11Temp = [];
        BAOwnersselecteditems = [];
    }
    else if (this.value == 'No') {
        //$("#trcp-RgBusi").show();
        $('#counterpartyItemsadd #trcp-RgBusi').show();
        if (thisBusinessAreaNameC != "") {
            addDefaultBusinessareaCounterparty();
            $("#txtNewCpBusinessArea").addClass("validelement");
        }
    }
    $("#RelatedCounterparties").val('');
    PrvRelatedCounterparities = [];
    arrRelatedCounterparities = [];
    curRelatedCounterparities = [];

});

//usha
function getCounterpartyFieldsadd() {
    $("#loadingPage").fadeIn();
    $("#counterpartyItemsadd tbody tr.removableCounterpartyField").remove();
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
                            var RelatedLookup = "";
                            var vCurrency = "";
                            var vPhoneNumber = "";
                            var PhoneID = "";
                            var PhoneCountry = "";
                            var vEmail = "";
                            var vMultiDDL = "";
                            var vUser = "";
                            var vUserList = "";
                            var vNumber = "";
                            var vNumberD = "";
                            var vNumberP = "";
                            var vNumberPD = "";
                            if (item.Required == "true") {
                                vControls += '<tr class="removableCounterpartyField CP_Det"><td class="f_head"><b>' + item.FieldDisplayName + '</b><small class="required">*</small>';
                            } else {
                                vControls += '<tr class="removableCounterpartyField CP_Det"><td class="f_head"><b>' + item.FieldDisplayName + '</b>';
                            }
                            if (item.FieldHelp == "true") {
                                vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                            }
                            vControls += '</td><td class="labelright">';

                            if (item.FieldType == "Single Line Text" || item.FieldType == "Number") {
                                if (item.FieldName == "Country") {
                                    if (item.Required == "true") {
                                        vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "'  class='validelement f_inpt width90'>";

                                    } else {
                                        vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width90'>";
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
                                    vControls += '<label style="text-align: left">' + item.Description + '</label>';
                                }
                                else {
                                    if (item.Required == "true") {
                                        vControls += "<input type='text' id=" + item.FieldName + " maxlength='100' name=" + item.FieldName + " class='validelement f_inpt width90'>";
                                    } else {
                                        vControls += "<input type='text' id=" + item.FieldName + " maxlength='100' name=" + item.FieldName + "  class='f_inpt width90'>";
                                    }
                                    vControls += '<label  style="text-align: left;font-size:12px;">' + item.Description + '</label>';
                                }
                                vControls += '</td></tr>';
                            }
                            else if (item.FieldType == "Multi Line Text") {
                                if (item.Required == "true") {
                                    vControls += "<textarea name=" + item.FieldName + " maxlength='500' id=" + item.FieldName + " title='" + item.FieldDisplayName + "' cols='40' rows='5' class=' validelement height70 f_inpt width90'></textarea>";
                                } else {
                                    vControls += "<textarea name=" + item.FieldName + " maxlength='500' id=" + item.FieldName + " title='" + item.FieldDisplayName + "' cols='40' rows='5' class='f_inpt height70 width90'></textarea>";
                                }
                                vControls += '<label   style="text-align: left;font-size:12px;">' + item.Description + '</label>';
                                vControls += '</td></tr>';
                            }
                            else if (item.FieldType == "Hyperlink") {
                                //manoj
                                //for Hyperlink
                                var Hyperlinkvalue = item.DefaultURL;
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=CP" + item.FieldName + " maxlength='2083' name=" + item.FieldName + " placeholder='http://www.' value = '" + Hyperlinkvalue + "' class='validelement validwebsite f_inpt width90'>";
                                } else {
                                    vControls += "<input type='text' id=CP" + item.FieldName + " maxlength='2083' name=" + item.FieldName + " placeholder='http://www.' value = '" + Hyperlinkvalue + "' class='validwebsite f_inpt width90'>";
                                }
                                vControls += '<label   style="text-align: left;font-size:12px;">' + item.Description + '</label>';
                                vControls += '<br/>' + '<a href="javascript:void(0)" class="linkText" title="' + item.FieldDisplayName + '" onclick="navigateurl(\'CP' + item.FieldName + '\')"> Navigate</a>';
                                vControls += '</div></tr>';
                                //for Hyperlink
                                //manoj
                            }
                            else if (item.FieldType == "Date") {

                                if (item.Required == "true") {
                                    vControls += "<input type='text' id='" + item.FieldName + "' title='" + item.FieldDisplayName + "'  class='f_inpt" + item.FieldName + "width60 validelement f_inpt width90 fielddatecontrol'/>";
                                } else {
                                    vControls += "<input type='text' id='" + item.FieldName + "' title='" + item.FieldDisplayName + "' class='f_inpt" + item.FieldName + "width60 f_inpt width90 fielddatecontrol'/>";
                                }

                                vControls += '<label  style="text-align: left;font-size:12px;">' + item.Description + '</label>';
                                vControls += '</td></tr>';

                                vDate = item.FieldName;
                            }
                            else if (item.FieldType == "Phone Number") {
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id='" + item.FieldName + "_CP'  title='" + item.FieldDisplayName + "'  class='validelement f_inpt width90 validPhone fieldphonecontrol'>";
                                } else {
                                    vControls += "<input type='text' id='" + item.FieldName + "_CP'  title='" + item.FieldDisplayName + "'   class='f_inpt width90 validPhone fieldphonecontrol'>";
                                }
                                vControls += '<label   style="text-align: left;font-size:12px;">' + item.Description + '</label>';
                                vControls += '</td></tr>';

                                vPhoneNumber = vControls;
                                PhoneID = item.FieldName + "_CP";
                                PhoneCountry = item.Country;
                            }
                            else if (item.FieldType == "Choice") {
                                if (item.Required == "true") {
                                    vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "'  class='validelement f_inpt width90'>";

                                } else {
                                    vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='f_inpt width90'>";
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
                                vControls += '<label   style="text-align: left;font-size:12px;">' + item.Description + '</label>';
                                vControls += '</td></tr>';
                            }
                            else if (item.FieldType == "Lookup") {
                                if (item.FieldName == "RelatedCounterparties") {
                                    if (item.Required == "true") {
                                        vControls += "<input id='" + item.FieldName + "' name='" + item.FieldName + "' title='" + item.FieldDisplayName + "' class='validelement f_inpt width90' readonly='readonly' type='text' />";
                                    } else {
                                        vControls += "<input id='" + item.FieldName + "' name='" + item.FieldName + "' title='" + item.FieldDisplayName + "' readonly='readonly' class='f_inpt width90' type='text' />";
                                    }
                                    vControls += '<label  style="text-align: left;font-size:12px;">' + item.Description + '</label>';
                                    vControls += "<br/>" + "<a href='javascript:void(0)' class='linkText' id='" + item.FieldDisplayName + "' title='" + item.FieldName + "' onclick='ViewCounterpartyRelated(this)'> Browse</a>";
                                    vControls += '</td></tr>';
                                }
                                else {
                                    if (item.Required == "true") {
                                        vControls += "<select id='" + item.FieldName + "' name='" + item.FieldName + "' title='" + item.FieldDisplayName + "' data-placeholder='--Select--' multiple='multiple' class='validuser chosenmulti f_inpt width90'>";
                                    } else {
                                        vControls += "<select id='" + item.FieldName + "' name='" + item.FieldName + "' title='" + item.FieldDisplayName + "' data-placeholder='--Select--' multiple='multiple' class='f_inpt chosenmulti width90'>";
                                    }
                                    //vControls += "<option value='0'>--Select--</option>";

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
                                            vMultiDDL1 = "";
                                            var datalength = datalength1.length;
                                            for (var i = 0; i < datalength; i++) {
                                                var itemname = datalength1[i];
                                                //("#" + item.FieldName).append("<option value='" + itemname + "'>" + itemname + "</option>")
                                                vMultiDDL1 += "<option value='" + itemname + "'>" + itemname + "</option>";
                                            }

                                            RelatedLookup = item.FieldName;

                                        }
                                    });
                                    vControls += vMultiDDL1;
                                    vControls += '</select>';
                                    vControls += '<label   style="text-align: left;font-size:12px;">' + item.Description + '</label>';
                                    vControls += '</td></tr>';
                                }
                            }
                            else if (item.FieldType.indexOf("Dropdown") > -1 || item.FieldType.indexOf("Multi Select") > -1) {
                                if (item.Required == "true") {
                                    vControls += "<select id=" + item.FieldName + " multiple='multiple' class='width90 f_inpt chosenmulti validuser' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
                                } else {
                                    vControls += "<select id=" + item.FieldName + " multiple='multiple' class='width90 f_inpt chosenmulti' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
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
                                vControls += '<label  style="text-align: left;font-size:12px;">' + item.Description + '</label>';
                                vControls += '</td></tr>';
                                vMultiDDL = item.FieldName;
                            }
                            else if (item.FieldType == "Number") {
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement width90 form_input f_inpt' />";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='width90 form_input f_inpt' />";
                                }
                                vControls += '<label  style="text-align: left;font-size:12px;">' + item.Description + '</label>';
                                vControls += '</td></tr>';
                                vNumber = item.FieldName;
                            }
                            else if (item.FieldType == "Number-D") {
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement width90 form_input f_inpt' />";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='width90 form_input f_inpt' />";
                                }
                                vControls += '<label  style="text-align: left;font-size:12px;">' + item.Description + '</label>';
                                vControls += '</td></tr>';
                                vNumberD = item.FieldName;
                            }
                                //Percent
                            else if (item.FieldType == "Number-P") {
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement width90 form_input f_inpt' />";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='width90 form_input f_inpt' />";
                                }
                                vControls += '<label style="text-align: left;" class="margin-top-8" style="float: right;position: absolute;" >' + '%' + '</label>';
                                vControls += '<label style="text-align: left;font-size:12px;float:left">' + item.Description + '</label>';
                                vControls += '</td></tr>';
                                vNumberP = item.FieldName;
                            }
                                //Percent Decimal
                            else if (item.FieldType == "Number-PD") {
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement width90 form_input f_inpt' />";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='width90 form_input f_inpt' />";
                                }
                                vControls += '<label style="text-align: left;" class="margin-top-8" style="float: right;position: absolute;" >' + '%' + '</label>';
                                vControls += '<label style="text-align: left;font-size:12px;float:left">' + item.Description + '</label>';
                                vControls += '</td></tr>';
                                vNumberPD = item.FieldName;
                            }
                            else if (item.FieldType == "Yes/No") {


                                vControls += "	<div style='width: auto; margin-right: 15px;'><input style='float: left; width: auto;' type='radio' class='f_inpt' name=" + item.FieldName + " id='Yes" + item.FieldName + "' value='Yes' onchange='CounterpartychangeYesNoFieldtable(this);'><span style='float: left; margin: 7px 0px 0px 5px;'>Yes </span></div>";
                                vControls += "	<div style='width: auto;'><input style='float: left; width: auto;' type='radio' name=" + item.FieldName + " class='f_inpt' checked id='No" + item.FieldName + "' value='No' onchange='CounterpartychangeYesNoFieldtable(this);'><span style='float: left; margin: 7px 0px 0px 5px;'>No </span></div>";

                                vControls += "	<input type='hidden' id='hdnYes" + item.FieldName + "' value=" + item.CommentYes + " />";
                                vControls += "	<input type='hidden' id='hdnNo" + item.FieldName + "' value=" + item.CommentNo + " />";
                                vControls += "	<input type='hidden' id='hdnRequired" + item.FieldName + "' value=" + item.CommentRequired + " />";
                                vControls += "	<input type='hidden' id='hdnHelpText" + item.FieldName + "' value=" + item.HelpText + " />";
                                vControls += '<label   style="text-align: left;font-size:12px;">' + item.Description + '</label>';
                                vControls += '</td></tr>';

                                if (item.CommentNo == "true") {
                                    if (item.CommentRequired == "true") {
                                        vControls += '<tr class="removableCounterpartyField CP_Det"><td class="f_head"><b>Add a Comment </b><small>*</small></td>';
                                    } else {
                                        vControls += '<tr class="removableCounterpartyField CP_Det"><td class="f_head"><b>Add a Comment </b></td>';
                                    }
                                    if (item.FieldHelp == "true") {
                                        vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + item.HelpText + '"></span>'
                                    }
                                    vControls += "<td class='labelright'>";
                                    if (item.CommentRequired == "true") {
                                        vControls += "<textarea id='CustomCMD" + item.FieldName + "' name='CustomCMD" + item.FieldName + "' maxlength='500' title='" + item.FieldName + "' cols='40' rows='5' class='f_inpt width80 height70 validelement'></textarea>";
                                    } else {
                                        vControls += "<textarea id='CustomCMD" + item.FieldName + "' name='CustomCMD" + item.FieldName + "' maxlength='500' title='" + item.FieldName + "' cols='40' rows='5' class='f_inpt width80 height70' ></textarea>";
                                    }
                                    vControls += '</td></tr>';
                                }
                            }
                            else if (item.FieldType == "Email") {
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validemail width90 validelement f_inpt' />";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validemail width90 f_inpt' />";
                                }
                                vControls += '<label   style="text-align: left;font-size:12px;">' + item.Description + '</label>';
                                vControls += '</td></tr>';
                            }
                            else if (item.FieldType.indexOf("Browse") > -1) {
                                if (item.Required == "true") {
                                    vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement f_inpt width90' readonly='readonly' type='text' />";
                                } else {
                                    vControls += "<input id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' readonly='readonly' type='text' class='f_inpt width90'/>";
                                }
                                vControls += '<label   style="text-align: left;font-size:12px;">' + item.Description + '</label>';
                                vControls += "<a href='javascript:void(0)' class='linkText' id='" + item.FieldDisplayName + "' title='" + item.FieldName + "' onclick='ViewGenericCounterparty(this)'> Browse</a>";
                                vControls += '</td></tr>';
                            }
                            else if (item.FieldType == "File Upload") {
                                if (item.Required == "true") {
                                    vControls += "<input type='file' id=" + item.FieldName + " name='docAttachment' title='" + item.FieldDisplayName + "' class='form-contro  validelement browse-file-doc' onchange='javascript:changeinupload(this);' />";
                                } else {
                                    vControls += "<input type='file' id=" + item.FieldName + " name='docAttachment' title='" + item.FieldDisplayName + "' class='form-contro browse-file-doc' onchange='javascript:changeinupload(this);' />";
                                }
                                vControls += '<label  style="text-align: left;font-size:12px;">' + item.Description + '</label>';
                                vControls += '</td></tr>';
                            }
                            else if (item.FieldType == "Currency" || item.FieldType == "Value / Financials") {
                                if (item.Required == "true") {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "' class='validelement f_inpt width90' />";
                                } else {
                                    vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " title='" + item.FieldDisplayName + "'  class='f_inpt width90'/>";
                                }
                                vControls += '<label  style="text-align: left;font-size:12px;">' + item.Description + '</label>';
                                vControls += '</td></tr>';
                                vCurrency = item.FieldName;
                            }
                            else if (item.FieldType == "User") {
                                if (item.Required == "true") {
                                    vControls += "<select id=" + item.FieldName + " multiple='multiple' class='form-contro f_inpt width90 chosenmulti validuser' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
                                } else {
                                    vControls += "<select id=" + item.FieldName + " multiple='multiple' class='form-contro f_inpt width90 chosenmulti' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"
                                }

                                if (vUserList == "")
                                { vUserList = GetUserList(); }
                                vControls += vUserList;
                                vControls += '</select>';
                                vControls += '<label  style="text-align: left;font-size:12px;">' + item.Description + '</label>';
                                vUser = item.FieldName;
                                vControls += '</td></tr>';
                            }

                            $("#counterpartyItemsadd").append(vControls);
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
                                allowOnlyNumberInInputBox(item.FieldName);
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
                            if (vPhoneNumber != "") {
                                bindPhoneNumber(PhoneID, PhoneCountry);
                                vPhoneNumber = "";
                            }
                            if (RelatedLookup != "")
                                $("#" + RelatedLookup + "").chosen().trigger("chosen:updated");
                            if (vMultiDDL != "") {
                                $("#" + vMultiDDL + "").chosen().trigger("chosen:updated");
                                $('.chosenmulti').on('chosen:showing_dropdown', function (evt, params) {
                                    $('.result-selected').css('display', 'none');
                                });
                                vMultiDDL = "";
                            }
                            if (vCurrency != "") {
                                if (vCurrencyDisplayStyle == "UK") {
                                    $('#counterpartyItemsadd input[id=' + vCurrency + ']').autoNumeric();
                                } else if (vCurrencyDisplayStyle == "CAN") {
                                    $('#counterpartyItemsadd input[id=' + vCurrency + ']').autoNumeric({ aSep: ' ', aDec: '.' });
                                } else if (vCurrencyDisplayStyle == "EU") {
                                    $('#counterpartyItemsadd input[id=' + vCurrency + ']').autoNumeric({ aSep: '.', aDec: ',' });
                                } else if (vCurrencyDisplayStyle == "IND") {
                                    $('#counterpartyItemsadd input[id=' + vCurrency + ']').autoNumeric({ dGroup: '2', });
                                }
                                vCurrency == "";
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
                        }
                    }
                }
            });

            $(".validelement").each(function (index, element) {
                $(element).removeClass("error");
                $("#errormsg_" + element.id).remove();
            });
            $("#addEditCounterparty").dialog("option", "title", "New Counterparty");
            $("#addEditCounterparty").dialog("open");
            $("#loadingPage").fadeOut();
        },
        error: function (metadataFields) {
            vCounterpartyFields = [];
            $("#loadingPage").fadeOut();
        }

    });
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
//Browse counterparty related method(s)
function ViewOriginatingParty() {
    ViewOPCounterparty();
    //getcompanyprofileforlegalentity();
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
                $("#tblOPCounterparties").append('<li style="font-size:13px;">No Counterparty is available for this contract.</li>');
            }
        });
    }
}

function DisplayRequiredTab(tabname) {
    var passdispalyid = "";
    $(".cltabrequired").removeClass('pop_up__Acti');
    $('.cltblrequired').css("display", "none");
    if (typeof (tabname) == "undefined") {
        $("#liRequired").addClass('pop_up__Acti');
        $("#tblRequired").css("display", "");
        passdispalyid = 'tblRequired';
    } else {
        $("#li" + tabname).addClass('pop_up__Acti');
        $("#tbl" + tabname).css("display", "");
        passdispalyid = 'tbl' + tabname;
    }
    allowtoupdate(passdispalyid);
}

function allowtoupdate(displayid) {
    if (displayid != "tblActivity") {
        var tbldata = document.getElementById(displayid).textContent;
        if (typeof (tbldata) != "undefined" && tbldata != null && tbldata != "" && tbldata != "No Required Metadata is missing." && tbldata != "No Required People(s) are missing." && tbldata != "No Required Document Template(s) and Document Type(s) are missing." && tbldata != "No Pending Tasks." && tbldata != "No item found.") {
            if (displayid == "tblPeople") {
                if ($("#hdnPermission").val() == "Manage") {
                    $("#btnPendingUpdate").show();
                } else {
                    $("#btnPendingUpdate").hide();
                }
            }
            else {
                if ($("#hdnPermission").val() == "Manage" || $("#hdnPermission").val() == "Contribute") {
                    $("#btnPendingUpdate").show();
                } else {
                    $("#btnPendingUpdate").hide();
                }
            }

        } else {
            $("#btnPendingUpdate").hide();
        }
    } else {
        $("#btnPendingUpdate").hide();
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
//manoj

function CheckDocumentNameExistForEdit(folderurl, documentname, documentID) {
    var vExist = true;

    if (DocumentCount > 0) {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Requests/documentsbynameandextention?RequestID=' + vRequestID + '&DocumentName=' + encodeURIComponent(documentname),
            type: 'GET',
            dataType: 'json',
            'Content-Type': 'application/json',
            cache: false,
            async: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            success: function (data) {
                if (data == null)
                { vExist = false; }
                else
                {

                    for (i = 0; i < data.length; i++) {
                        if (data[i].RowKey == documentID) {
                            vExist = false;
                        }
                        else {
                            vExist = true;
                            break;
                        }
                    }

                }
            },
            error:
                function (data) {
                    vExist = false;
                }
        });

        return vExist;
    }
}

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
    $(".validnumber").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });
    $(".error").removeClass("error");
}

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
        Removetextvalues();

    } else {
        $("#CompanyProfile").val('');
        Removetextvalues();

    }
    arrselectedLE = [];
    $("#browseLegalEntity").dialog("close");
    // ClearAddCounterparty();
    //  $('#chkCounterpartyNotInList').prop('checked', false);

    $('#dvCPExistingLegalEntity').css("display", "");
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

//manoj
function ViewCounterparties() {
    var baname = "";

    //if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
    //    baname = localStorage.GlobalBusinessAreaLocation;
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
            var counterpartyTags = [];
            //var prevSelected = $("#RelatedCounterparties").val();
            //manoj
            var prevSelected = [];
            $.each(curRelatedCounterparities, function (ipvr, itempvr) {
                prevSelected.push($.trim(itempvr.CounterpartyName));
            });
            var arr = prevSelected;
            //manoj
            //$.each(prevSelected, function () {
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
                        article += '<input id="rel' + item.RowKey + '" type="checkbox" name="RelatedCounterparty" checked class="css1-checkbox" value="' + escape(item.CounterpartyName) + '"  onchange="javascript:currentrelatedcounterparty(this);" />';
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
                        article += '<input id="rel' + item.RowKey + '" type="checkbox" name="RelatedCounterparty" class="css1-checkbox" value="' + escape(item.CounterpartyName) + '"  onchange="javascript:currentrelatedcounterparty(this);" />';
                        article += '<label for="' + item.RowKey + '" class="css1-label">' + item.CounterpartyName + '</label>';
                        article += '</td>';
                        article += '<td class="ddl"><td></tr>'
                        $("#tblPopupCounterparties").append(article);
                    }

                    //$("#rel" + item.RowKey).click(function () {
                    $("input[id='rel" + item.RowKey + "'][name='RelatedCounterparty']:checkbox").click(function () {
                        if (this.checked) {
                            var vOptions = "<select class='f_inpt width90' onchange='showallspans(this)'>";
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

                        } else {

                            $(this).parent().parent().children(".ddl").empty();
                        }
                        showallspans(this);
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
                    //cssStyle: 'compact-theme'
                });
            } else {
                $('#loadCounterparties').html('<p style="margin-left: 20px;">No items found.</p>');
                $('#compact-paginationRelatedCounterparties').css('display', 'none');
            }
        },
        error: function () {
            $('#compact-paginationRelatedCounterparties').css('display', 'none');
            $('#loadCounterparties').html('<p style="margin-left: 20px;">No items found.</p>');
        }
    });
}

function currentrelatedcounterparty(obj) {
    if (requiredValidator('popupCounterparties', false)) {
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
    else {
        $("#" + obj.id).prop('checked', false);
        $("#" + obj.id).parent().parent().children(".ddl").empty();
    }
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
    var ContractArr = [];
    if (parseInt($("#liSelectedRelatedContract").children().length) > 0) {
        $("#liSelectedRelatedContract").children().each(function (i, n) {
            ContractArr.push(n.innerText);
        });
    }
    $("#tblContracts").empty();
    var bindlist = false;
    var startIndex = page * 10;
    var endIndex = startIndex + 10;
    if (endIndex > listRelatedContracts.length) endIndex = listRelatedContracts.length;
    //$("#spResult").html((startIndex + 1) + '&nbsp;to&nbsp;' + endIndex + '&nbsp;of&nbsp;' + listRelatedContracts.length);
    for (var i = startIndex; i < endIndex; i++) {
        var item = listRelatedContracts[i];
        bindlist = false;
        var article = '<tr><td>';
        if (relatedContractArr.indexOf(item.ContractTitle) >= 0 || ContractArr.indexOf(item.ContractTitle) > -1) {
            if (parseInt($("#liSelectedRelatedContract").children().length) > 0) {
                if (!(ContractArr.indexOf(item.ContractTitle) >= 0)) {
                    bindlist = true;
                }
            }
            else {
                bindlist = true;
            }
            article += '<input id="Pro' + item.RowKey + '" type="checkbox" name="RelatedContracts" class="css1-checkbox" checked onchange="javascript:collectrelatedcontractrowkey(this);"  value="' + item.ContractTitle + '" />';
        } else {
            article += '<input id="Pro' + item.RowKey + '" type="checkbox" name="RelatedContracts" class="css1-checkbox" onchange="javascript:collectrelatedcontractrowkey(this);"  value="' + item.ContractTitle + '" />';
        }
        article += '<label for="Pro' + item.RowKey + '" class="css1-label PreserveSpace"><a href="/Contracts/ContractDetails?ContractID=' + item.RowKey + '" target="_blank">' + item.ContractTitle + '</a></label></td><td><label>' + item.ContractType + '</label></td><td><label>';       //ENH487 Customer inhanc
        if (item.Counterparty != null && item.Counterparty != "") {
            article += item.Counterparty
        } else {
            article += "-"
        }
        article += '</label></td><td><label style="word-break: break-all;">'
        if (item.ContractNumber != null && item.ContractNumber != "") {
            article += item.ContractNumber
        } else {
            article += "-"
        }
        article += '</label></td><td><label>' + item.Status + '</label></td></tr>'
        RelatedContractTags.push(item.ContractTitle);
        RelatedContractTags = RelatedContractTags.filter(function (elem, index, self) {
            return index == self.indexOf(elem);
        }); // remove duplicate related contract 
        $("#txtSearchBoxContracts").autocomplete({
            source: RelatedContractTags,
            minLength: 1,
            focus: function (event, ui) {
                return false;
            },
            select: function (evn, uidetails) {
                $("#txtSearchBoxContracts").val(uidetails.item.label);
                SearchContracts();
            }
        });
        $("#tblContracts").append(article);
        if (bindlist) {
            $('#liSelectedRelatedContract').append('<span style="font-size:11px;" id="Pro' + item.RowKey + '" class="PreserveSpace">' + item.ContractTitle + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveRelatedContract(this);" style="float:right"></span>');
        }
    }

    //manoj
    ContractArr = [];
    if (parseInt($("#liSelectedRelatedContract").children().length) > 0) {
        $("#liSelectedRelatedContract").children().each(function (i, n) {
            ContractArr.push(n.innerText);
        });
    }
    var SelectedRelContractID = $.grep(listRelatedContracts, function (nRelConID, indRelConID) {
        return (relatedContractArr.indexOf(nRelConID.ContractTitle) >= 0);
    });
    if (SelectedRelContractID.length > 0) {
        $(SelectedRelContractID).each(function (iSelRelCon, itemSelRelCon) {
            var BindConValue = false;
            if (parseInt($("#liSelectedRelatedContract").children().length) > 0) {
                if (!(ContractArr.indexOf(itemSelRelCon.ContractTitle) >= 0)) {
                    BindConValue = true;
                }
            }
            else {
                BindConValue = true;
            }
            if (BindConValue) {
                $('#liSelectedRelatedContract').append('<span style="font-size:11px;" id="Pro' + itemSelRelCon.RowKey + '" class="PreserveSpace">' + itemSelRelCon.ContractTitle + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveRelatedContract(this);" style="float:right"></span>');
            }
        });
    }
    //manoj
}

function Loading_View_trigger() {
    BindCountry();
    BindContractRelationships();
}

//Rahul
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
    $("#tblGenericheader").html(art);
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterpartyfieldbydisplayname?fielddisplayname=' + obj.id,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        success: function (data) {
            var prevSelected = $("#" + obj.title).val();
            arrprevRU = [];
            $.each(prevSelected.split(";"), function () {
                arrprevRU.push($.trim(this));
            });
            var arrayChoiceValues = data[0].ChoiceValues.split("\n");
            myArrayRU = [];
            var obj1 = {
            };
            //manoj
            $(arrayChoiceValues).each(function (iChoiceValue, itemChoiceValue) {
                //manoj
                //for (var i = 0; i < arraysplitRU.length; i++) {
                if (!(itemChoiceValue in obj1)) {
                    if ($.trim(itemChoiceValue) != "") {
                        myArrayRU.push($.trim(itemChoiceValue));
                    }
                }
                obj1[$.trim(itemChoiceValue)] = true;
            });
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
                $("#tblGeneric").html('No item found.');
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
//Rahul

function Checkbrowsernameandversion() {
    var Openinbrowser = true;
    //if (bowser.msie) {
    //    if (bowser.version == 10) {
    //        Openinbrowser = false;
    //    }
    //}
    return Openinbrowser;
}
function refreshRequestActivities() {
    vRequestID = getParameterByName("RequestID");
    GetRequestActivities(vRequestID);

}

//$("#txtCounterpartyName").blur(function () {

//    fillCounterpartyDetails();
//})


//function fillCounterpartyDetails() {

//    if ($("#txtCounterpartyName").val().trim() != "" && !($("#chkCounterpartyNotInList").prop('checked'))) {
//        $("#chkCounterpartyNotInList").prop('checked', true);
//        $('.CP_Det').css('display', '');
//        $('.CP_Det1').css('display', '');
//        $("#ddlCounterpartyType").addClass('validelement');
//        $("#txtEmailID").addClass('validemail');
//        getCounterpartyFields();
//    }
//}

//$('#txtCounterpartyName').keypress(function (e) {
//    if ($('#txtCounterpartyName').val() != "" && !($("#chkCounterpartyNotInList").prop('checked'))) {
//        if (e.keyCode == 13) {
//            e.preventDefault();
//            fillCounterpartyDetails();
//        }
//    }
//});

function bindPhoneNumber(id, countryCode) {
    $("#" + id).intlTelInput({
        //allowDropdown: false,
        //onlyCountries: [countryCode],       
        separateDialCode: true,
        utilsScript: "/Scripts/utils.js"
    });
}

function bindPhoneNumberEdit(id, countryCode) {
    $("#" + id).intlTelInput({
        initialCountry: countryCode,
        separateDialCode: true,
        utilsScript: "/Scripts/utils.js"
    });
}

function sortArrOfObjectsByParam(arrToSort) {
    arrToSort.sort(function (a, b) {
        var A = a.toUpperCase();
        var B = b.toUpperCase();
        return ((A < B) ? -1 : ((A > B) ? 1 : 0));
    });
    return arrToSort;
}

function changeYesNoField(id) {
    $("#CustomCMD" + id.name).parent().parent().remove();
    var CommentYes = $("#hdnYes" + id.name).val();
    var CommentNo = $("#hdnNo" + id.name).val();
    var CommentRequired = $("#hdnRequired" + id.name).val();
    var HelpText = $("#hdnHelpText" + id.name).val();
    var vControls = "";
    if (id.value == "Yes") {
        if (CommentYes == "true") {
            //if (CommentRequired == "true") {
            //    vControls += ' <div class="form-input-group ' + id.name + '"><div class="row-group"><label class="col3 m12">Add a Comment<span class="text-red">*</span></label> ';
            //} else {
            //    vControls += '<div class="form-input-group ' + id.name + '"><div class="row-group"><label class="col3 m12">Add a Comment</label> ';
            //}
            //vControls += '<div class="col6 m12">';
            //if (CommentRequired == "true") {
            //    vControls += "<textarea id='CustomCMD" + id.name + "' name='CustomCMD" + id.name + "' maxlength='500' title='" + id.name + "' cols='40' rows='5' class='form-contro validelement'></textarea>";
            //} else {
            //    vControls += "<textarea id='CustomCMD" + id.name + "' name='CustomCMD" + id.name + "' maxlength='500' title='" + id.name + "' cols='40' rows='5' class='form-contro'></textarea>";
            //}
            //vControls += '</div>';
            //vControls += '</div></div>';

            if (CommentRequired == "true") {
                vControls += '<tr><td class="f_head"><label style="word-break: break-all;">Add a Comment<span class="text-red">*</span></label>';
            }
            else {
                vControls += '<tr><td class="f_head"><label style="word-break: break-all;">Add a Comment</label>';
            }
            if (HelpText != "" && HelpText != "/") {
                vControls += "<img class='helpimg' src='../Content/Images/help_training.png' title='" + HelpText + "'></label></td>"
            }
            vControls += '<td class="f_list width50">';
            if (CommentRequired == "true") {
                vControls += "<textarea id='CustomCMD" + id.name + "' name='CustomCMD" + id.name + "' maxlength='500' title='" + id.name + "' cols='40' rows='5' class='f_inpt width80 height70 validelement'></textarea>";
            } else {
                vControls += "<textarea id='CustomCMD" + id.name + "' name='CustomCMD" + id.name + "' maxlength='500' title='" + id.name + "' cols='40' rows='5' class='f_inpt width80 height70'></textarea>";
            }
            vControls += '</td></tr>';
            $("#" + id.id).parent().parent().after(vControls);
        } else {
            $("." + id.name).css("display", "none");
        }
    }
    if (id.value == "No") {
        if (CommentNo == "true") {
            //if (CommentRequired == "true") {
            //    vControls += ' <div class="form-input-group ' + id.name + '"><div class="row-group"><label class="col3 m12">Add a Comment<span class="text-red">*</span></label> ';
            //} else {
            //    vControls += '<div class="form-input-group ' + id.name + '"><div class="row-group"><label class="col3 m12">Add a Comment</label> ';
            //}
            //vControls += '<div class="col6 m12">';
            //if (CommentRequired == "true") {
            //    vControls += "<textarea id='CustomCMD" + id.name + "' name='CustomCMD" + id.name + "' maxlength='500' title='" + id.name + "' cols='40' rows='5' class='form-contro validelement'></textarea>";
            //} else {
            //    vControls += "<textarea id='CustomCMD" + id.name + "' name='CustomCMD" + id.name + "' maxlength='500' title='" + id.name + "' cols='40' rows='5' class='form-contro'></textarea>";
            //}
            //vControls += '</div>';
            //vControls += '</div></div>';

            if (CommentRequired == "true") {
                vControls += '<tr><td class="f_head"><label style="word-break: break-all;">Add a Comment <span class="text-red">*</span></label>';
            }
            else {
                vControls += '<tr><td class="f_head"><label style="word-break: break-all;">Add a Comment </label>';
            }
            if (HelpText != "" && HelpText != "/") {
                vControls += "<img class='helpimg' src='../Content/Images/help_training.png' title='" + HelpText + "'></label></td>"
            }
            vControls += '<td class="f_list width50">';
            if (CommentRequired == "true") {
                vControls += "<textarea id='CustomCMD" + id.name + "' name='CustomCMD" + id.name + "' maxlength='500' title='" + id.name + "' cols='40' rows='5' class='f_inpt width80 height70 validelement'></textarea>";
            } else {
                vControls += "<textarea id='CustomCMD" + id.name + "' name='CustomCMD" + id.name + "' maxlength='500' title='" + id.name + "' cols='40' rows='5' class='f_inpt width80 height70'></textarea>";
            }
            vControls += '</td></tr>';

            $("#" + id.id).parent().parent().after(vControls);
        } else {
            $("." + id.name).css("display", "none");
        }
    }
}
function CounterpartychangeYesNoField(id) {
    $("#CustomCMD" + id.name).parent().parent().remove();
    var CommentYes = $("#hdnYes" + id.name).val();
    var CommentNo = $("#hdnNo" + id.name).val();
    var CommentRequired = $("#hdnRequired" + id.name).val();
    var HelpText = $("#hdnHelpText" + id.name).val();
    var vControls = "";
    if (id.value == "Yes") {
        if (CommentYes == "true") {

            if (CommentRequired == "true") {
                vControls += '<li class="removableCounterpartyField CP_Det"><p><b>Add a Comment </b><small>*</small>';
            } else {
                vControls += '<li class="removableCounterpartyField CP_Det"><p><b>Add a Comment </b>';
            }
            if (HelpText != "" && HelpText != "/") {
                vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + HelpText + '"></span>'
            }
            vControls += "<div>";
            if (CommentRequired == "true") {
                vControls += "<textarea id='CustomCMD" + id.name + "' name='CustomCMD" + id.name + "' maxlength='500' title='" + id.name + "' cols='40' rows='5' class='validelement'></textarea>";
            } else {
                vControls += "<textarea id='CustomCMD" + id.name + "' name='CustomCMD" + id.name + "' maxlength='500' title='" + id.name + "' cols='40' rows='5' ></textarea>";
            }
            vControls += '</div></li>';

            $("#" + id.id).parent().parent().after(vControls);
        } else {
            $("." + id.name).css("display", "none");
        }
    }
    if (id.value == "No") {
        if (CommentNo == "true") {
            if (CommentRequired == "true") {
                vControls += '<li class="removableCounterpartyField CP_Det"><p><b>Add a Comment </b><small>*</small>';
            } else {
                vControls += '<li class="removableCounterpartyField CP_Det"><p><b>Add a Comment </b>';
            }
            if (HelpText != "" && HelpText != "/") {
                vControls += '<span class="p-text help"> <img src="../Content/Images/input-help.png" title="' + HelpText + '"></span>'
            }
            vControls += "<div>";
            if (CommentRequired == "true") {
                vControls += "<textarea id='CustomCMD" + id.name + "' name='CustomCMD" + id.name + "' maxlength='300' title='" + id.name + "' cols='25' rows='3' class='validelement'></textarea>";
            } else {
                vControls += "<textarea id='CustomCMD" + id.name + "' name='CustomCMD" + id.name + "' maxlength='300' title='" + id.name + "' cols='25' rows='3' ></textarea>";
            }
            vControls += '</div></li>';

            $("#" + id.id).parent().parent().after(vControls);
        } else {
            $("." + id.name).css("display", "none");
        }
    }
}


function CounterpartychangeYesNoFieldtable(id) {
    $("#CustomCMD" + id.name).parent().parent().remove();
    var CommentYes = $("#hdnYes" + id.name).val();
    var CommentNo = $("#hdnNo" + id.name).val();
    var CommentRequired = $("#hdnRequired" + id.name).val();
    var HelpText = $("#hdnHelpText" + id.name).val();
    var vControls = "";
    if (id.value == "Yes") {
        if (CommentYes == "true") {
            //if (CommentRequired == "true") {
            //    vControls += ' <div class="form-input-group ' + id.name + '"><div class="row-group"><label class="col3 m12">Add a Comment<span class="text-red">*</span></label> ';
            //} else {
            //    vControls += '<div class="form-input-group ' + id.name + '"><div class="row-group"><label class="col3 m12">Add a Comment</label> ';
            //}
            //vControls += '<div class="col6 m12">';
            //if (CommentRequired == "true") {
            //    vControls += "<textarea id='CustomCMD" + id.name + "' name='CustomCMD" + id.name + "' maxlength='500' title='" + id.name + "' cols='40' rows='5' class='form-contro validelement'></textarea>";
            //} else {
            //    vControls += "<textarea id='CustomCMD" + id.name + "' name='CustomCMD" + id.name + "' maxlength='500' title='" + id.name + "' cols='40' rows='5' class='form-contro'></textarea>";
            //}
            //vControls += '</div>';
            //vControls += '</div></div>';

            if (CommentRequired == "true") {
                vControls += '<tr class="removableCounterpartyField CP_Det"><td class="f_head"><b>Add a Comment </b><span class="text-red">*</span>';
            }
            else {
                vControls += '<tr class="removableCounterpartyField CP_Det"><td class="f_head"><b>Add a Comment </b>';
            }
            if (HelpText != "" && HelpText != "/") {
                vControls += "</td>"
                //vControls += "<img class='helpimg' src='../Content/Images/help_training.png' title='" + HelpText + "'></label></td>"
            }
            else {
                vControls += "</td>"
            }
            vControls += '<td class="labelright">';
            if (CommentRequired == "true") {
                vControls += "<textarea id='CustomCMD" + id.name + "' name='CustomCMD" + id.name + "' maxlength='500' title='" + id.name + "' cols='40' rows='5' class='f_inpt width80 height70 validelement'></textarea>";
            } else {
                vControls += "<textarea id='CustomCMD" + id.name + "' name='CustomCMD" + id.name + "' maxlength='500' title='" + id.name + "' cols='40' rows='5' class='f_inpt width80 height70'></textarea>";
            }
            vControls += '</td></tr>';
            $("#" + id.id).parent().parent().parent().after(vControls);
        } else {
            $("." + id.name).css("display", "none");
        }
    }
    if (id.value == "No") {
        if (CommentNo == "true") {
            //if (CommentRequired == "true") {
            //    vControls += ' <div class="form-input-group ' + id.name + '"><div class="row-group"><label class="col3 m12">Add a Comment<span class="text-red">*</span></label> ';
            //} else {
            //    vControls += '<div class="form-input-group ' + id.name + '"><div class="row-group"><label class="col3 m12">Add a Comment</label> ';
            //}
            //vControls += '<div class="col6 m12">';
            //if (CommentRequired == "true") {
            //    vControls += "<textarea id='CustomCMD" + id.name + "' name='CustomCMD" + id.name + "' maxlength='500' title='" + id.name + "' cols='40' rows='5' class='form-contro validelement'></textarea>";
            //} else {
            //    vControls += "<textarea id='CustomCMD" + id.name + "' name='CustomCMD" + id.name + "' maxlength='500' title='" + id.name + "' cols='40' rows='5' class='form-contro'></textarea>";
            //}
            //vControls += '</div>';
            //vControls += '</div></div>';

            if (CommentRequired == "true") {
                vControls += '<tr class="removableCounterpartyField CP_Det"><td class="f_head"><b>Add a Comment </b><span class="text-red">*</span>';
            }
            else {
                vControls += '<tr class="removableCounterpartyField CP_Det"><td class="f_head"><b>Add a Comment </b>';
            }

            if (HelpText != "" && HelpText != "/") {
                vControls += "</td>"
                //vControls += "<img class='helpimg' src='../Content/Images/help_training.png' title='" + HelpText + "'></label></td>"
            }
            else {
                vControls += "</td>"
            }

            vControls += '<td class="labelright">';
            if (CommentRequired == "true") {
                vControls += "<textarea id='CustomCMD" + id.name + "' name='CustomCMD" + id.name + "' maxlength='500' title='" + id.name + "' cols='40' rows='5' class='f_inpt width80 height70 validelement'></textarea>";
            } else {
                vControls += "<textarea id='CustomCMD" + id.name + "' name='CustomCMD" + id.name + "' maxlength='500' title='" + id.name + "' cols='40' rows='5' class='f_inpt width80 height70'></textarea>";
            }
            vControls += '</td></tr>';

            $("#" + id.id).parent().parent().parent().after(vControls);
        } else {
            $("." + id.name).css("display", "none");
        }
    }
}