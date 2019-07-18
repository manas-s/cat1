//Script General Start
$('#nav li:has(ul)').doubleTapToGo();
var strSelectedContractType = "";
var SaveDraftInCloud = "";
var SaveFinalInCloud = "";
var AllowSaveDraftInCloud = "";
var vProviderDocSign = '';
var RightSignatureFlag = false;
function BackToList() {
    if (document.referrer.indexOf(window.location.hostname) != -1) {
        var referrer = document.referrer;
        if (referrer.indexOf('Contracts/CreateContract') >= 0)
        { window.location = '/Contracts' }
        else
        { parent.history.back(); }
    }
    else {
        parent.history.back();
    }
    return false;
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(function () {

    var vLen = window.history.length;
    if (vLen != 0) {
        $('#backLink').css("display", "");
    }
    else {
        $('#backLink').css("display", "none");
    }


    BindContractTypes();
    BindPeople();
    BindContractDetails();
    BindDocument();
    CheckObligationEnable();
    BindMilestone();
    BindPriceBreakdown();
    BindTerms();
    BindRelatedContracts();
    BindCorrespondence();
    BindTodos();
    BindPendingDocAutomation();
    BindO365LibrarySettings();
    var vTodoID = getParameterByName("TodoID");
    if (vTodoID != '') {
        GetTodoComments(vTodoID);
        GetTodoDetail(vTodoID);
    }
    $(".openmenuValue").contextMenu({ menu: 'dropdownMenuEdit', leftButton: true }, function (action, el, pos) { contextMenuValue(action, el, pos); });
    $(".openmenuPeople").contextMenu({ menu: 'dropdownMenuEdit', leftButton: true }, function (action, el, pos) { contextMenuPeople(action, el, pos); });

    $("#browseBA").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Users",
        modal: true,
        buttons: {
            "OK": function () { $('#BusinessArea').val($('#txtBA').val()); $(this).dialog("close"); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#browseCounterparty").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Counterparty",
        modal: true,
        buttons: {
            "OK": function () {
                var s = AddCounterparty();
                // if (s) {
                $(this).dialog("close");
                //  }
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#browseMasterAgreements").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Master Agreements",
        modal: true,
        buttons: {
            "OK": function () {
                var s = AddMasterAgreement();
                // if (s) {
                $(this).dialog("close");
                // }
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#browseOriginatingParty").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Originating Party",
        modal: true,
        buttons: {
            "OK": function () {
                var s = AddOriginatingParty();
                // if (s) {
                $(this).dialog("close");
                // }
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
    $("#dvCorrespondenceDetails").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Correspondence Details",
        modal: true,
        buttons: {
            "Close": function () { $(this).dialog("close"); }
        }
    });

    $("#addEditCounterparty").dialog({
        autoOpen: false, closeText: "",
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

    $("#dvVersionHistory").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Version History",
        modal: true,
        buttons: {
            "Close": function () { $(this).dialog("close"); }
        }
    });
    $("#contractDetailsLoading").css('display', 'none');
});

function opensummary() {
    $('#dialogSummary').dialog('open');
}

function BindO365LibrarySettings() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/getdocumentsettings',
        type: 'GET',
        dataType: 'json',
        cache: false,
        async: false,
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

function BindContractTypes() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracttypes',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: true,
        success: function (contracttypes) {
            var datalenght = contracttypes.length;
            for (var i = 0; i < datalenght; i++) {
                var item = contracttypes[i];

                if (strSelectedContractType == item.ContractType) {
                    $("#ddlDPContractTypes").append('<option selected="selected" value="' + item.ContractType + '">' + item.ContractType + '</option>')
                } else {
                    $("#ddlDPContractTypes").append('<option value="' + item.ContractType + '">' + item.ContractType + '</option>')
                }
            }
        }
    });
}

function BindContractDetails() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + getParameterByName("ContractID"),
        type: 'GET',
        cache: false,
        contentType: false,
        async: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
        processData: false,
        success: function (item) {

            var txtLiTType = item.TransactionType;
            if (txtLiTType == "0")
                txtLiTType = "";
            $("#hdnContractID").text(item.RowKey);
            $("#hdnPermission").val(item.Permission);
            $("#hdnTransactionType").text(item.TransactionType);
            $("#liTType").text(txtLiTType);
            $("#hdnContractValue").text(item.ContractValue);
            $("#hdnContractCurrency").text(item.ContractCurrency);
            $("#hdnContractPricingType").text(item.ContractPricingType);
            $("#hdnPaymentType").text(item.PaymentType);
            $("#hdnBillingFrequency").text(item.BillingFrequency);
            $("#hdnOldEndDate").text(item.EndDate);
            $("#hdnTermEndDate").text(item.TermEndDate);
            $("#hdnBaseContractValue").text(item.BaseContractValue);
            $("#hdnBaseContractCurrency").text(item.BaseContractValueCurrency);
            $("#hdnFinalizedDocumentsUrl").text(item.FinalizedDocumentsUrl);
            $("#hdnDraftDocumentsUrl").text(item.DraftDocumentsUrl);
            if (item.StartDate != null) {
                $("#hdnStartDate").text(item.StartDate);
            }

            $("#lblContractTitle").text(item.ContractTitle);
            $("#lblContractNumber").text(item.ContractNumber);
            if (item.ContractNumber == null || item.ContractNumber == "") {
                $("#lblContractNumber").text('No Contract Record Number');
            } else {
                $("#lblContractNumber").text(item.ContractNumber);
            }
            $("#lblDivider").css('display', '');

            $("#lblCounterparty").text(item.Counterparty);
            $("#lblContractType").text(item.ContractType);

            $("#liPermissions").text(item.Permissions);

            if (item.ReadOnlyPermissions == null || item.ReadOnlyPermissions == "") {
                $("#liReadOnly").text("");
            }
            else {
                $("#liReadOnly").text(item.ReadOnlyPermissions);
            }

            if (item.ReadWritePermissions == null || item.ReadWritePermissions == "") {
                $("#liReadWrite").text("");
            }
            else {
                $("#liReadWrite").text(item.ReadWritePermissions);
            }

            if (item.FullControlPermissions == null || item.FullControlPermissions == "") {
                $("#liFullControl").text("");
            }
            else {
                $("#liFullControl").text(item.FullControlPermissions);
            }







            $("#lblContractPrivacy").text(item.ContractPrivacy);

            if (item.ContractManagers == null || item.ContractManagers == "") {
                $("#licontractmanagersNA").css('display', '');
            }
            else {
                $("#licontractmanagers").text(item.ContractManagers);
            }
            if (item.Reviewers == null || item.Reviewers == "") {
                $("#lireviewersNA").css('display', '');
            }
            else {
                $("#lireviewers").text(item.Reviewers);
            }
            if (item.Approvers == null || item.Approvers == "") {
                $("#liapproversNA").css('display', '');
            }
            else {
                $("#liapprovers").text(item.Approvers);
            }
            if (item.Signees == null || item.Signees == "") {
                $("#lisigneesNA").css('display', '');
            }
            else {
                $("#lisignees").text(item.Signees);
            }
            if (item.ExternalSignees == null || item.ExternalSignees == "") {
                $("#lisigneesExternalNA").css('display', '');
            }
            else {
                $("#lisigneesExternal").text(item.ExternalSignees);
            }
            if (item.SharedWith == null || item.SharedWith == "") {
                $("#lisharedWithNA").css('display', '');
            }
            else {
                $("#lisharedWith").text(item.SharedWith);
            }


            if (item.StatusChangedAlert == "") {
                $("#dvContractAlert").css('display', 'none');
            }
            else {
                $("#dvContractAlert").css('display', '');
                $("#dvContractAlert").append('<span style="float:right"><a href="javascript:void(0)" onclick="CloseAlert(\'dvContractAlert\');">X</a></span>');
                $("#dvContractAlert").append(item.StatusChangedAlert);
            }
            if (item.TransactionType == "Legal/General Agreement") {
                $("#dropdownMenuContractSettings_value").css('display', 'none');
                $("#liContractValueHead").css('display', 'none');
                $("#liContractValue").css('display', 'none');

            }
            else {

                if (item.ContractValue == "0") {
                    $("#lblContractValue").text("Not available");
                    $("#lblContractCurrency").text("");
                    $("#dvValueAlert").css('display', '');
                    $("#dvValueAlert").append('<span style="float:right"><a href="javascript:void(0)" onclick="CloseAlert(\'dvValueAlert\');">X</a></span>');
                    $("#dvValueAlert").append("Contract value is not available for this Contract Record. [<span class='right-float Contribute'><a href='javascript:void(0)' onclick='ManageContractValue()'>Manage Contract Value</a></span>]");
                } else {
                    GetContractValueSetting(item);
                }
            }

            if (item.Status != "0" && item.Status != "" && item.Status != "undefined") {
                $("#spanstatus").text(item.Status);
            }
            else {
                $("#spanstatus").html('<span class="f_p-error">Not Assigned</span>');
                $("#dvStatusAlert").css('display', '');
                $("#dvStatusAlert").append('<span style="float:right"><a href="javascript:void(0)" onclick="CloseAlert(\'dvStatusAlert\');">X</a></span>');
                $("#dvStatusAlert").append("This Contract Record has not been assigned a status. [<span class='right-float Contribute'><a href='javascript:void(0)' onclick='ManageStatus()'>Manage Status</a></span>]");
            }

            ApplyPermissionToMenu($("#hdnPermission").val());
            if (item.Permission == 'View' || item.Permission == '') {
                $('#spMenuContractSettings').css("display", "none");
                $('#btnEditStatus').css("display", "none");
                $('#btnEditValue').css("display", "none");
                $('#btnAddRelatedContracts').css("display", "none");
                $('#btnAddPriceBreakdowns').css("display", "none");
                $('#btnAddContractDocument').css("visibility", "hidden");
                $('#btnNewMilestone').css("visibility", "hidden");
                $('#btnNewObligation').css("visibility", "hidden");
                $('#btnNewAmendment').css("visibility", "hidden");
                $('#btnNewTerms').css("visibility", "hidden");
            }

            BindMetaData(item);

            if (item.Renewable != null && item.Renewable == "Yes") {
                $("#hdnIsRenewable").text("Yes");
                $("#hdnIsRenewableContract").text("Yes");

                $("#chkDPRenewable").prop('checked', true);
                $("#chkDPRenewalApproval").removeAttr("disabled");
                $("#liAdminMenuRenewal").css('display', '');
            } else {
                $("#hdnIsRenewable").text("No");
                $("#liAdminMenuRenewal").css('display', 'none');
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

            BindStatus();

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
            if (item.Amendable != null && item.Amendable == "Yes") {
                BindAmendments();
                $("#artAmendment").css('display', '');
                $("#chkDPAmendable").prop('checked', true);
                $("#chkDPAmendmentApproval").removeAttr("disabled");
            }
            if (item.NeedApprovalForAmendment != null && item.NeedApprovalForAmendment == "Yes") {
                $("#chkDPAmendmentApproval").prop('checked', true);
                $("#artAmendment").css('display', 'none');
            }

            //Contract Details
            $("#summCTitle").text(item.ContractTitle);
            $("#summCNumber").text(item.ContractNumber);
            $("#summCType").text(item.ContractType);
            $("#summCounterparty").text(item.Counterparty);
            $("#summCClass").text(item.ContractClass);

        }
    });
}

function CheckObligationEnable() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/feature?featureid=2',
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        processData: false,
        success: function (data) {
            if (data.Status == "ON") {
                $("#articleObligation").css("display", "");
                BindObligations();
            }
            else {
                $("#articleObligation").css("display", "none");
            }
        },
        error: function () {
            $("#articleObligation").css("display", "none");
        }

    });
}

function BindPendingDocAutomation() {
    $("#dvDocAutomationAlert").empty();
    try {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/automation?contractid=' + getParameterByName('ContractID'),
            type: 'GET',
            cache: false,
            contentType: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            processData: false,
            success: function (data) {
                var datalenght = data.length;
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];
                    if (item.RemindLater != "N") {
                        var sDocumentName = item.DocumentName;
                        var sRowKey = item.RowKey;
                        var article = '<p id="p_' + item.RowKey + '">There is an inprogress document automation [' + sDocumentName + '] related to this contract. <span class="right-float">[<a href="javascript:void(0)" onclick="RemindLaterDocAutomation(\'p_' + item.RowKey
                            + '\');">Remind Later</a>] [<a href="javascript:void(0)" onclick="DismissDocAutomationAlert(\'' + item.RowKey + '\');">Dismiss</a>]</span></p>';
                        $("#dvDocAutomationAlert").append(article);
                    }
                }
                if ($('#dvDocAutomationAlert p').length > 0) {
                    $("#dvDocAutomationAlert").css("display", "");
                }
            },
            error: function () {
                $("#dvDocAutomationAlert").css("display", "none");
            }

        });
    } catch (e) {

        swal("", e.message);
    }
}

function RemindLaterDocAutomation(DocAutomationID) {
    $('#dvDocAutomationAlert #' + DocAutomationID).remove();
    if ($('#dvDocAutomationAlert p').length == 0) {
        CloseAlert('dvDocAutomationAlert');
        $('#dvDocAutomationAlert').empty();
    }
}

function DismissDocAutomationAlert(DocAutomationID) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/automation?documentid=' + DocAutomationID + '&dismiss=N',
        type: 'PUT',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        cache: false,
        success: function (person) {
            $('#dvDocAutomationAlert #p_' + DocAutomationID).remove();
            if ($('#dvDocAutomationAlert p').length == 0) {
                CloseAlert('dvDocAutomationAlert');
                $('#dvDocAutomationAlert').empty();
            }
        }
    });
}

function BindTodos() {
    $("#dvContractTodos").empty();
    try {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/todos?contractid=' + getParameterByName('ContractID') + '&status=Pending',
            type: 'GET',
            cache: false,
            contentType: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            processData: false,
            success: function (data) {
                $("#dvContractTodos").append('<span style="float:right"><a href="javascript:void(0)" onclick="CloseAlert(\'dvContractTodos\');">X</a></span>');
                var datalenght = data.length;
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];
                    if (item.RemindLater != "N") {
                        var sTodoTitle = item.TodoTitle;
                        var sRowKey = item.RowKey;
                        var article = '<p id="p_' + item.RowKey + '">There is an incomplete Task [' + sTodoTitle + '] related to this contract. <span class="right-float">[<a href="/Activity/TodoDetails?TodoID=' + sRowKey +
                            '">View Todo</a>] [<a href="javascript:void(0)" onclick="RemindLaterTodo(\'p_' + item.RowKey
                            + '\');">Remind Later</a>] [<a href="javascript:void(0)" onclick="DismissTodoAlert(\'' + item.RowKey + '\');">Dismiss</a>]</span></p>';
                        $("#dvContractTodos").append(article);
                    }
                }
                $("#dvContractTodos").css("display", "");
            },
            error: function () {
                $("#dvContractTodos").css("display", "none");
            }

        });
    } catch (e) {

        swal("", e.message);
    }
}

function RemindLaterTodo(TodoID) {
    $('#dvContractTodos #' + TodoID).remove();
    if ($('#dvContractTodos p').length == 0) {
        CloseAlert('dvContractTodos');
        $('#dvContractTodos').empty();
    }
}

function DismissTodoAlert(TodoID) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/todos?todoid=' + TodoID + '&dismiss=N',
        type: 'PUT',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        cache: false,
        success: function (person) {
            $('#dvContractTodos #p_' + TodoID).remove();
            if ($('#dvContractTodos p').length == 0) {
                CloseAlert('dvContractTodos');
                $('#dvContractTodos').empty();
            }
        }
    });
}

function CloseAlert(ctrl) {
    $("#" + ctrl).css("display", "none");
}

function BindStatus() {
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

function OpenRenewalForm() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + getParameterByName("ContractID"),
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
        processData: false,
        success: function (data) {
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                if (item.RenewalDate != null) {
                    $("#lblNextRenewalDate").text(item.RenewalDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'));
                } else {
                    $("#lblNextRenewalDate").text("Not Available");
                }
                if (item.TermEndDate != null) {
                    $("#lblTermEndDate").text(item.TermEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'));
                } else {
                    $("#lblTermEndDate").text("Not Available");
                }

                if (item.LastRenewedDate != null) {
                    $("#lblLastRenewed").text(item.LastRenewedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'));
                } else {
                    $("#lblLastRenewed").text("Not Available");
                }
                if (item.RenewalRemaining != null && item.RenewalRemaining != 0) {
                    $("#lblRenewalRemaining").text(item.RenewalRemaining);
                } else {
                    $("#lblRenewalRemaining").text("Not Available");
                }
                if (item.EndDate != null) {
                    $("#lblContractEndDate").text(item.EndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'));
                } else {
                    $("#lblContractEndDate").text("Not Available");
                }
            }
        }

    });
    //Getting Renewal Settings
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + getParameterByName("ContractID") + '/renewalsettings',
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
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + getParameterByName("ContractID") + '/contractrenewalhistory',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $("#renewalHistory").empty();
            var str = "";
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
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
                    str += '<td>' + item.RenewedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1') + '</td>';
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
function GetContractValueSetting(contRecord) {
    var vContractValueSetting = '';
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/settings',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            vContractValueSetting = data.IsContractValueInBaseCurrency;
            if (vContractValueSetting == "Display Contract Values in Base Currency") {
                $("#lblContractValue").text(contRecord.BaseContractValue);
                if (contRecord.BaseContractValueCurrency != null) {
                    $("#lblContractCurrency").text(contRecord.BaseContractValueCurrency);
                }
            }
            else {
                $("#lblContractValue").text(contRecord.ContractValue);
                if (contRecord.ContractCurrency != null) {
                    $("#lblContractCurrency").text(contRecord.ContractCurrency);
                }
            }
        }
    });
}
var jqXHR = "";
function BindPeople() {

    jqXHR = $.ajax({
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
                $("#ddlContractManagers").append(article);
                $("#ddlReviewers").append(article);
                $("#ddlApproversNew").append(article);
                $("#ddlSignees").append(article);
                $("#ddlAlertSendTo").append(article);
                $("#ddlMilestoneOwner").append(article);
                $("#ddlObligationOwner").append(article);
                $("#ddlApproversRenewSettings").append(article);
                $("#ddlReadOnly").append(article);
                $("#ddlReadWrite").append(article);
                $("#ddlFullControl").append(article);
                $("#ddlCC").append(article);
                $("#ddlSendReminderTo").append(article);
                var nospaceUserName = sUserName.replace(/ /g, "_");
                var sUser = '<li>';
                //sUser += '<input id="' + sEmail + '" type="radio" name="SigneeUser" class="css-checkbox" value="' + sUserName + '" />';
                //sUser += '<label for="' + sEmail + '" class="css-label">' + sUserName + '</label>';
                sUser += '<input id="' + sEmail + '_' + nospaceUserName + '" title="' + sEmail + '" type="radio" name="SigneeUser" class="css-checkbox" value="' + sUserName + '" />';
                sUser += '<label for="' + sEmail + '_' + nospaceUserName + '" class="css-label">' + sUserName + '</label>';
                sUser += '</li>';
                $("#tblSigneeUser").append(sUser);
            }

            $("#ddlContractManagers").chosen();
            $("#ddlReviewers").chosen();
            $("#ddlApproversNew").chosen();
            $("#ddlSignees").chosen();

            $("#ddlAlertSendTo").chosen();
            $("#ddlMilestoneOwner").chosen();
            $("#ddlObligationOwner").chosen();
            $("#ddlApproversRenewSettings").chosen();
            $("#ddlCC").chosen();
            $("#ddlSendReminderTo").chosen();


            $("#ddlReadOnly").chosen();
            $("#ddlReadWrite").chosen();
            $("#ddlFullControl").chosen();
            $('.chosenmulti').on('chosen:showing_dropdown', function (evt, params) {
                $('.result-selected').css('display', 'none');
            });

        },
        error:
            function (data) {
            }
    });
}

function ApplyPermissionToMenu(vPermission) {
    if (vPermission == 'Contribute') {
        $('.Manage').css("display", "none");
    }
    else if (vPermission == 'Collaborate') {
        $('.Manage').css("display", "none");
        $('.Contribute').css("display", "none");
    }
    else if (vPermission == 'View' || vPermission == '') {
        $('.Manage').css("display", "none");
        $('.Contribute').css("display", "none");
        $('.Collaborate').css("display", "none");
    }

}

function contextMenuValue(action, el, pos) {

    switch (action) {
        case "edit":
            {
                editvalue();
                break;
            }
    }
}

function contextMenuPeople(action, el, pos) {

    switch (action) {
        case "edit":
            {
                $("#loadingPage").fadeIn();
                $('input[name="ContractPrivacy"][value="' + $("#lblContractPrivacy").text() + '"]').prop('checked', true);


                if ($("#licontractmanagers").text() != "") {
                    GetValuesAndAutoPopulate("ddlContractManagers", $("#licontractmanagers").text());

                }

                if ($("#lireviewers").text() != "") {

                    GetValuesAndAutoPopulate("ddlReviewers", $("#lireviewers").text());
                }

                if ($("#liapprovers").text() != "") {

                    GetValuesAndAutoPopulate("ddlApproversNew", $("#liapprovers").text());
                }

                if ($("#lisignees").text() != "") {

                    GetValuesAndAutoPopulate("ddlSignees", $("#lisignees").text());
                }

                if ($("#lisigneesExternal").text() != "") {
                    $("#txtExternalSignee").val($("#lisigneesExternal").text());
                }

                if ($("#lisharedWith").text() != "") {
                    $("#txtSharedWith").val($("#lisharedWith").text());
                }


                //radio button

                if ($("#liReadOnly").text() != "") {

                    GetValuesAndAutoPopulate("ddlReadOnly", $("#liReadOnly").text());
                }
                if ($("#liReadWrite").text() != "") {

                    GetValuesAndAutoPopulate("ddlReadWrite", $("#liReadWrite").text());
                }
                if ($("#liFullControl").text() != "") {

                    GetValuesAndAutoPopulate("ddlFullControl", $("#liFullControl").text());
                }



                $("#loadingPage").fadeOut();
                $("#addEditPeople").dialog("option", "title", "People & Permissions");
                $("#addEditPeople").dialog("open");
                break;
            }
    }
}

$(function () {

    $("#dtDueDate").datepicker();
    $("#dtDueDateInline").datepicker();
    $("#dtMilestoneDateInline").datepicker();
    $("#dtMilestoneDate").datepicker();
    $("#dtTransactionDueDate").datepicker();
    $("#dtTransactionCompletedDate").datepicker();
    $("#dtMilestoneCompletedDate").datepicker();

    $("#txtNewEndDate").datepicker();
    $("#txtNextRenewalDate").datepicker();

});

function editvalue() {
    $("#txtContractValue").css('display', 'block');
    $("#ddlContractCurrency").css('display', 'block');
    $("#imgcheck").css('display', 'block');
    $("#imgcancel").css('display', 'block');
    $("#txtContractValue").val($("#lblContractValue")[0].textContent);

    $("#lblContractValue").css('display', 'none');
    $("#lblContractCurrency").css('display', 'none');
}

function displayvalue() {
    $("#lblContractValue").css('display', 'inline');
    $("#lblContractCurrency").css('display', 'inline');

    $("#txtContractValue").css('display', 'none');
    $("#ddlContractCurrency").css('display', 'none');
    $("#imgcheck").css('display', 'none');
    $("#imgcancel").css('display', 'none');
}

function updatevalue() {
    if (requiredValidator("addEditContractValue")) {
        $('.ui-button-green-text').parent().attr('disabled', 'disabled');
        var contractvalue = $("#txtContractValuepopup")[0].value;

        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + getParameterByName("ContractID") + '/value?contractvalue=' + contractvalue + '&username=' + localStorage.UserName,
            type: 'PUT',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            data: {
                "TransactionType": $("#ddlTransactionType option:selected").val(),
                "ContractCurrency": $("#ddlContractCurrencypopup option:selected").val(),
                "ContractPricingType": $("#ddlContractPricingType option:selected").val(),
                "PaymentType": $("#ddlPaymentType option:selected").val(),
                "BillingFrequency": $("#ddlBillingFrequency option:selected").val(),
                "ModifiedBy": localStorage.UserName
            },
            cache: false,
            success: function (result) {

                swal({
                    title: '',
                    text: "Contract value updated.",

                },
                    function (confirmed) {
                        if (confirmed) {
                            location = location;
                        }

                    });

                $('.ui-button-green-text').parent().removeAttr('disabled');

            }
        });

        $("#lblContractValue").css('display', 'inline');
        $("#lblContractCurrency").css('display', 'inline');
        $("#lblContractValue").text(contractvalue);
        $("#hdnContractValue").text(contractvalue);
        $("#lblContractCurrency").text($("#ddlContractCurrencypopup option:selected").text());

        var sTransType = $("#ddlTransactionType option:selected").val();
        if (sTransType == "0")
            sTransType = "";
        $("#liTType").text(sTransType);
        return true;
    } else {
        $('.ui-button-green-text').parent().removeAttr('disabled');
        return false;
    }
}

$('#btnEditValue').click(function () {
    BindPriceBreakdownTransaction();
    GetContractValueFormData();
    $(".validelement").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });
    $("#addEditContractValue").dialog("option", "title", "Contract Value");
    $("#addEditContractValue").dialog("open");

});

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
            $("#spanstatus").text(selectedValue);
            return true;
        }
    } else if (selectedValue == "Renewed") {
        if ($("#dtRenewalDate")[0].value == "") {
            swal("", "Select renewal date.");
            return false;
        } else {
            changestatus();
            updaterenewaldate();

            $("#spanstatus").text(selectedValue);
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

            $("#spanstatus").text(selectedValue);
            BindMetaData(null);
            return true;
        }
    } else if (selectedValue == "undefined" || selectedValue == "0" || selectedValue == "") {
        swal("", "Select Status");
        return false;
    }
    else {
        changestatus();
        $("#spanstatus").text(selectedValue);
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
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + getParameterByName("ContractID") + '/changestatus?status=' + stat,
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
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + getParameterByName("ContractID") + '/renew?renewdate=' + dt,
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
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + getParameterByName("ContractID") + '/extend?enddate=' + dt,
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


function AddActivity(vActionType, vObject, vObjectID, vParentObject, vParentObjectID, vActivity) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/activities',
        type: 'POST',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        data: {
            ActionType: vActionType,
            Object: vObject,
            ObjectID: vObjectID,
            ParentObject: vParentObject,
            ParentObjectID: vParentObjectID,
            UserID: localStorage.UserName,
            Activity: vActivity,

        },
        cache: false,
        success: function (person) {

        }
    });
}

function GetContractValueFormData() {
    var strBaseContractValueCurr = "";

    strBaseContractValueCurr = $("#hdnBaseContractValue").text() + " " + $("#hdnBaseContractCurrency").text();
    if (strBaseContractValueCurr.trim() == "0") {
        strBaseContractValueCurr = "Not Available";
    }
    $("#lblContractValueInBaseCurency").text(strBaseContractValueCurr);
    $("#ddlTransactionType").find('option[value="' + $("#hdnTransactionType").text() + '"]').prop("selected", true);
    if ($("#hdnContractValue").text() == "0") {
        $("#hdnContractValue").text("");
        $("#txtContractValuepopup").attr("placeholder", "Not Available");
    }
    else {
        $("#txtContractValuepopup").removeAttr("placeholder");
    }
    $("#txtContractValuepopup").val($("#hdnContractValue").text());

    $("#ddlContractCurrencypopup").empty();
    $("#ddlContractPricingType").empty();
    $("#ddlBillingFrequency").empty();
    $("#ddlPaymentType").empty();

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/currencies',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                if ($("#hdnContractCurrency").text() == item.Abbreviation) {
                    $("#ddlContractCurrencypopup").append("<option selected value='" + item.Abbreviation + "'>" + item.Abbreviation + "</option>")
                }
                else {
                    $("#ddlContractCurrencypopup").append("<option value='" + item.Abbreviation + "'>" + item.Abbreviation + "</option>")
                }

            }
        }
    });
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contractpricingtype',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (documenttypes) {
            $(documenttypes).each(function (i, item) {
                if ($("#hdnContractPricingType").text() == item.TypeName) {
                    $("#ddlContractPricingType").append("<option selected value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                }
                else {
                    $("#ddlContractPricingType").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                }
            });
        }
    });
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/billingfrequency',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (documenttypes) {
            $(documenttypes).each(function (i, item) {
                if ($("#hdnBillingFrequency").text() == item.TypeName) {
                    $("#ddlBillingFrequency").append("<option selected value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                } else {
                    $("#ddlBillingFrequency").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                }
            });
        }
    });
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/paymenttypes',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (documenttypes) {
            $(documenttypes).each(function (i, item) {
                if ($("#hdnPaymentType").text() == item.TypeName) {
                    $("#ddlPaymentType").append("<option selected value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                } else {
                    $("#ddlPaymentType").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                }
            });
        }
    });
}
//Script General End-->
//Script for Details Start
$(document).ready(function () {

    CreateContractActivityList();



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





    $(".openmenuDetails").contextMenu({ menu: 'dropdownMenuDetails', leftButton: true }, function (action, el, pos) { contextMenuDetails(action, el.parent("tr"), pos); });
    $(".openmenuContractSettings").contextMenu({ menu: 'dropdownMenuContractSettings', leftButton: true }, function (action, el, pos) { contextMenuContractSettings(action, el.parent("tr"), pos); });

    $("#addEditPeople").dialog({
        autoOpen: false, closeText: "",
        width: "65%",
        title: "People and Permissions",
        modal: true,
        buttons: {
            "OK": function () {
                if (savePeople()) {
                    $(this).dialog("close");
                }
            },
            Cancel: function () {
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
            "OK": function () { if (imgcheckgeneral()) { $(this).dialog("close"); } },
            Cancel: function () {
                $("#hdChangeStatusClick").val("");
                $(this).dialog("close");
            }
        }
    });
    $("#addEditContractValue").dialog({
        autoOpen: false, closeText: "",
        width: "70%",
        title: "Contract Value",
        modal: true,
        buttons: {

        }
    });
    $('#dialogSummary').dialog({
        autoOpen: false, closeText: "",
        width: "70%",
        title: 'Metadata',
        modal: true,
        buttons: {
            "Close": function () {
                $(this).dialog("close");
            }
        }
    });

    $("#contractLogsPopup").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Contract History",
        modal: true,
        buttons: {
            "Close": function () { $(this).dialog("close"); }
        }
    });

    $("#contractRenewal").dialog({
        autoOpen: false, closeText: "",
        width: "80%",
        title: "Contract Renewal",
        minHeight: "80%",
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

    $("#viewMetadataDetailDocument").dialog({
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

    $("#popupContracts").dialog({
        autoOpen: false, closeText: "",
        width: "85%",
        title: "Related Contract Record(s)",
        modal: true,
        buttons: {
            "OK": function () { CreateRelatedContracts(); $(this).dialog("close"); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
    $("#popupContractsEdit").dialog({
        autoOpen: false, closeText: "",
        width: "85%",
        title: "Related Contract Record(s)",
        modal: true,
        buttons: {
            "OK": function () { updaterelatedcontract(); $(this).dialog("close"); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $('#txtSearchBox').keypress(function (e) {
        if ($('#txtSearchBox').val() != "") {
            if (e.keyCode == 13)
                ViewContracts();
        }
    });

    $("#popupDefaultProperties").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Default Properties",
        modal: true,
        buttons: {
            "Save": function () { updatedefaultproperties(); $(this).dialog("close"); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#divReplaceDocument").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Replace Document",
        modal: true,
        buttons: {
            "OK": function () { replacedocument(); },
            Cancel: function () {
                ClearReplaceDocFrom();
                $(this).dialog("close");
            }
        }
    });
    allowOnlyNumericInInputBox("txtContractValuepopup");
    allowOnlyNumericInInputBox("txtPriceBreakDownNumberOfUnits");
    allowOnlyNumericInInputBox("txtPriceBreakDownUnitPrice");
    $(".openmenuRelatedContracts").contextMenu({ menu: 'dropdownMenuRelatedContracts', leftButton: true }, function (action, el, pos) { contextMenuRelatedContracts(action, el.parent("span").parent("li"), pos); });
});

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
        var ap = '';
        if ($("input:radio[name=rdWorkflow]:checked").val() == "Yes") {
            var approvers = $("#ddlApproversRenewSettings").val();
            $(approvers).each(function (i, item) {
                if (ap == '') {
                    ap = item;
                }
                else {
                    ap += "; " + item;
                }
            });
        }
        var IsEverGreen = "No";
        var vRenewableTerm = '';
        if ($("input:radio[name=rdRenewTime]:checked").val() == "Evergreen") {
            IsEverGreen = "Yes";
        }
        else {
            vRenewableTerm = $("#txtRenewableFor").val();
        }
        var vStandardRenewalTerm = '';
        if ($("input:radio[name=rdsettings]:checked").val() == "Auto-Renewable") {
            vStandardRenewalTerm = $("#txtStandardRenewalTerm").val() + ";" + $("#ddlStandardRenewalTerm").find('option:selected').val();
        }
        var vNextRenewalDate = '';
        var vEndDate = '';

        if ($("#lblNextRenewalDate").text() != "Not Available") {
            vNextRenewalDate = $("#lblNextRenewalDate").text();
        }
        if ($("#lblTermEndDate").text() != "Not Available") {
            vEndDate = $("#lblTermEndDate").text();
        }
        var remainingRenewal = "0";
        if ($("input:radio[name=rdsettings]:checked").val() == "Auto-Renewable") {
            if ($("input:radio[name=rdRenewTime]:checked").val() == "RenewableFor") {
                remainingRenewal = $("#txtRenewableFor").val();
            }
        }
        if ($("#lblRenewSettingsID").text() == "") {
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + getParameterByName("ContractID") + '/renewalsettings',
                type: 'POST',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                data: {
                    ContractID: $("#hdnContractID").text(),
                    ContractTitle: $("#lblContractTitle").text(),
                    RenewalType: $("input:radio[name=rdsettings]:checked").val(),
                    StandardRenewalTerm: vStandardRenewalTerm,
                    Evergreen: IsEverGreen,
                    RenewableTerm: vRenewableTerm,
                    WorkflowApproval: $("input:radio[name=rdWorkflow]:checked").val(),
                    Approvers: ap,
                    NotesForApprovers: $('textarea[name=NotesForApprovers]').val(),
                    CreateApprovalTask: $("input:checkbox[name=checkboxApprovalTask]:checked").val(),
                    ApprovalTaskDays: $("#txtApprovalTask").val(),
                    CreatedBy: localStorage.UserName,
                    ModifiedBy: localStorage.UserName,
                    NextRenewalDate: vNextRenewalDate,
                    EndDate: vEndDate,
                    RenewalRemaining: remainingRenewal
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
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + getParameterByName("ContractID") + '/renewalsettings',
                type: 'PUT',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                data: {
                    RowKey: $("#lblRenewSettingsID").text(),
                    ContractID: $("#hdnContractID").text(),
                    ContractTitle: $("#lblContractTitle").text(),
                    RenewalType: $("input:radio[name=rdsettings]:checked").val(),
                    StandardRenewalTerm: vStandardRenewalTerm,
                    Evergreen: IsEverGreen,
                    RenewableTerm: vRenewableTerm,
                    WorkflowApproval: $("input:radio[name=rdWorkflow]:checked").val(),
                    Approvers: ap,
                    NotesForApprovers: $('textarea[name=NotesForApprovers]').val(),
                    CreateApprovalTask: $("input:checkbox[name=checkboxApprovalTask]:checked").val(),
                    ApprovalTaskDays: $("#txtApprovalTask").val(),
                    ModifiedBy: localStorage.UserName,
                    NextRenewalDate: vNextRenewalDate,
                    EndDate: vEndDate,
                    RenewalRemaining: remainingRenewal
                },
                cache: false,
                success: function (person) {
                    $('.ui-button-green-text').parent().removeAttr('disabled');
                    $("#hdChangeStatusClick").val("");
                    $("#contractRenewal").dialog("close");
                }
            });
        }

    }

}

function ManualRenewal() {
    var IsClose = 0;
    if (requiredValidator("divManualRenewal")) {


        if (comparedates("hdnStartDate", "txtNextRenewalDate")) {
            $("#lblNextRenewalDate").text($("#txtNextRenewalDate").val());
            $("#lblTermEndDate").text($("#txtNewEndDate").val());
            $("#manualRenewal").dialog("close");
        }
        else {

            swal("", "'Updated End (Renewed) Date' and 'Next Renewal Date' should be greater than Start Date");
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
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + getParameterByName("ContractID") + '/renew?standardterm=' + $("#txtStandardRenewalTerm").val() + ";" + $("#ddlStandardRenewalTerm").find('option:selected').val(),
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
                $("#hdnIsRenewable").text("Yes");
                $("#spanstatus").text("Renewed");
                $("#menu34").empty();
                BindStatus();
            }
        });

    } else {
        var stanterm = "";
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + getParameterByName("ContractID") + '/renew?standardterm=' + stanterm,
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

                $("#menu34").empty();
                BindStatus();
            }
        });
    }

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

function CreateContractActivityList() {

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/activities/contracts/' + getParameterByName("ContractID") + '?actiontype=',
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

                var article = '<li><span>&nbsp;</span>';
                article += '<p class="width97">' + sActivity;
                article += '<small>' + sTimestamp + '</small></p>';
                article += '</li>';
                $("#contractLogs").append(article);
            }
            $('#compact-pagination-Activity').pagination({
                items: data.length,
                itemsOnPage: 15,
                type: 'ul',
                typeID: 'contractLogs',
                row: 'li',
                cssStyle: 'compact-theme'
            });
        },
        error: function () {

        }
    });
}

function MetadataSummary() {

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

function BindMetaData(contractRecord) {
    if (contractRecord == null) {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + getParameterByName("ContractID"),
            type: 'GET',
            cache: false,
            contentType: false,
            async: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
            processData: false,
            success: function (data) {
                contractRecord = data;
            }
        });
    }
    $("#tdSumContractTitle").html(contractRecord.ContractTitle);
    $("#tdSumContractNumber").html(contractRecord.ContractNumber);
    $("#tdSumContractType").html(contractRecord.ContractType);

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/IContractDetails?contractid=' + getParameterByName("ContractID"),
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

                    $("#tblSummary").empty();
                    var datalenght = metadataFields.length;
                    for (var i = 0; i < datalenght; i++) {
                        var item = metadataFields[i];
                        if ((item.FieldName != "ContractTitle") && (item.FieldName != "ContractNumber") && (item.FieldName != "ContractType") && (name != "STATUSCHANGEDALERT")) {

                            var vControls = '<tr>';
                            vControls += '<td class="f_head">' + item.FieldDisplayName + '</td>';

                            if (item.FieldType == "Date") {
                                var vv = $(vMetadata).find(item.FieldName).text();
                                var onlydate = "";
                                if (vv != null) {
                                    onlydate = vv.substring(0, vv.length - 19);
                                    vControls += '<td class="labelleft">' + onlydate + '</td>';
                                }
                            } else {
                                vControls += '<td class="labelleft">' + $(vMetadata).find(item.FieldName).text() + '</td>';
                            }

                            vControls += '</tr>';
                            vMetadataHTML = vMetadataHTML.replace("<" + item.FieldName + ">" + $(vMetadata).find(item.FieldName).text() + "</" + item.FieldName + ">", "");
                            $("#tblSummary").append(vControls);

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
                                if ((name != "CONTRACTTITLE") && (name != "CONTRACTNUMBER") && (name != "CONTRACTTYPE") && (name != "STATUSCHANGEDALERT")) {
                                    var vField = $.grep(vContractFields, function (person) { return person.FieldName.toUpperCase() == name });
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
                        },
                        error: function (data) {

                        }
                    });
                }
            });
        }
    });
}

function contextMenuDetails(action, el, pos) {

    switch (action) {
        case "edit":
            {
                location = "/Contracts/EditContract?ContractID=" + getParameterByName("ContractID") + "&ContractType=" + $("#lblContractType").text();
                break;
            }
        case "view":
            {
                $('#dialogSummary').dialog('open');
                break;
            }
        case "history":
            {
                $('#contractLogsPopup').dialog('open');
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
                var contractTitle = $("#lblContractTitle").text();
                var contractID = getParameterByName("ContractID");
                $("#txtTodoTitle").val('Approval for ' + contractTitle);
                $("#ddlTodoType option").filter(function (index) { return $(this).text() === "Contract Approval"; }).prop('selected', true);
                $("#txtBrowseElement").val(contractTitle);
                $("#txtBrowseElementID").val(contractID);
                $("#trBrowse").css("display", "");
                $("#browse").css("display", "none");
                $("#tdBrowseElement").html("Contract Title");
                $('#ddlTodoType').attr('disabled', 'disabled');
                GetValuesAndAutoPopulate("ddlApprovers", "");
                $("#txtDueDate").val("");
                $("#txtNotes").val("");
                $("#chkNotifyMe").prop('checked', false);
                fnChangeAssignedToText();
                $("#dvTodo").dialog("open");
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
                $("#txtNotes").val("");
                $("#chkNotifyMe").prop('checked', false);
                fnChangeAssignedToText();
                $("#dvTodo").dialog("open");
                break;
            }
        case "delete":
            {
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
           var contractID = getParameterByName("ContractID");
           $.ajax({
               url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + contractID,
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
                              location = "/Contracts";
                          }

                      });

               }
           });
       }
       return;
   });

                break;
            }
        case "share":
            {
                ClearShareContractForm();
                var LinkURL = $(el).find("a").attr('href');
                var contractID = $("#hdnContractID").val();
                var contractTitle = $("#lblContractTitle").text();
                $("#tdShareContract").append("<b>" + contractTitle + "</b>");
                //****Start*****************************************//
                getNameAndEmail();

                //****End*****************************************//
                $("#shareContract").dialog("open");
                break;
            }
    }
}

function contextMenuContractSettings(action, el, pos) {

    switch (action) {
        case "status":
            {
                $('#addEditStatus').dialog('open');
                break;
            }
        case "value":
            {
                ManageContractValue();

                break;
            }
        case "people":
            {
                $('#addEditPeople').dialog('open');
                break;
            }
        case "alerts":
            {
                ManageAlerts();

                break;
            }
        case "defaultproperties":
            {
                $("#popupDefaultProperties").dialog("option", "title", "Default Properties");
                $("#popupDefaultProperties").dialog("open");
                break;
            }
        case "contractrenewal":
            {
                OpenRenewalForm();
                break;
            }
    }
}

function ManageContractValue() {
    GetContractValueFormData();
    $("#addEditContractValue").dialog("open");
}

function approvaltaskyes() {
    $("#divWorkflowYes").css('display', '');
}

function approvaltaskno() {
    $("#divWorkflowYes").css('display', 'none');
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

$('#btnAddPeople').click(function () {


    $('input[name="ContractPrivacy"][value="' + $("#lblContractPrivacy").text() + '"]').prop('checked', true);

    if ($("#licontractmanagers").text() != "") {

        var contractmanagers = $("#ddlContractManagers").val();
        if (contractmanagers == '') {
            GetValuesAndAutoPopulate("ddlContractManagers", $("#licontractmanagers").text());
        }

    }

    if ($("#lireviewers").text() != "") {

        var contractmanagers = $("#ddlReviewers").val();
        if (contractmanagers == '') {
            GetValuesAndAutoPopulate("ddlReviewers", $("#lireviewers").text());
        }
    }

    if ($("#liapprovers").text() != "") {

        var approvers = $("#ddlApproversNew").find('option').length;
        if (approvers == 0) {
            GetValuesAndAutoPopulate("ddlApproversNew", $("#liapprovers").text());
        }
    }

    if ($("#lisignees").text() != "") {

        var signees = $("#ddlSignees").find('option').length;
        if (signees == 0) {
            GetValuesAndAutoPopulate("ddlSignees", $("#lisignees").text());
        }
    }
    if ($("#lisigneesExternal").text() != "") {
        $("#txtExternalSignee").val($("#lisigneesExternal").text());
    }

    if ($("#lisharedWith").text() != "") {
        $("#txtSharedWith").val($("#lisharedWith").text());
    }

    if ($("#liReadOnly").text() != "") {

        var ReadOnly = $("#ddlReadOnly").find('option').length;
        if (ReadOnly == 0) {
            GetValuesAndAutoPopulate("ddlReadOnly", $("#liReadOnly").text());
        }
    }
    if ($("#liReadWrite").text() != "") {
        var ReadWrite = $("#ddlReadWrite").data("kendoMultiSelect");
        if (ReadWrite._dataItems.length == 0) {
            ReadWrite.value(getselectedusers($("#liReadWrite").text()));
        }
    }
    if ($("#liFullControl").text() != "") {
        var FullControl = $("#ddlFullControl").data("kendoMultiSelect");
        if (FullControl._dataItems.length == 0) {
            FullControl.value(getselectedusers($("#liFullControl").text()));
        }
    }

    if ($("#liPermissions").text() != "" && $("#liPermissions").text() == "Custom") {
        $("input:radio[name=PeoplePermissions][value='Custom']").attr('checked', 'checked');
        $("#trPermReadOnly").css('display', '');
        $("#trPermReadWrite").css('display', '');
        $("#trPermFullControl").css('display', '');
    }
    else {
        $("input:radio[name=PeoplePermissions][value='Default']").attr('checked', 'checked');
        $("#trPermReadOnly").css('display', 'none');
        $("#trPermReadWrite").css('display', 'none');
        $("#trPermFullControl").css('display', 'none');
    }


    $("#addEditPeople").dialog("option", "title", "People & Permissions");
    $("#addEditPeople").dialog("open");


});

function savePeople() {


    $('.ui-button-green-text').parent().attr('disabled', 'disabled');
    var isformvalid = false;
    if (requiredValidator('addNewPeople')) {

        var contractmanagers = $("#ddlContractManagers").data("kendoMultiSelect").value();
        var cm = '';
        $(contractmanagers).each(function (i, item) {
            if (cm == '') {
                cm = item;
            }
            else {
                cm += "; " + item;
            }
        });

        var reviewers = $("#ddlReviewers").data("kendoMultiSelect").value();
        var rev = '';
        $(reviewers).each(function (i, item) {
            if (rev == '') {
                rev = item;
            }
            else {
                rev += "; " + item;
            }
        });

        var approvers = $("#ddlApproversNew").data("kendoMultiSelect").value();
        var app = '';
        $(approvers).each(function (i, item) {
            if (app == '') {
                app = item;
            }
            else {
                app += "; " + item;
            }
        });

        var signees = $("#ddlSignees").data("kendoMultiSelect").value();
        var sign = '';
        $(signees).each(function (i, item) {
            if (sign == '') {
                sign = item;
            }
            else {
                sign += "; " + item;
            }
        });


        var vPermissions = $('input:radio[name=PeoplePermissions]:checked').val();
        var ReadOnlyUsers = '';
        var ReadWriteUser = '';
        var FullControlUsers = "";

        if (vPermissions == "Custom") {
            var ReadOnly = $("#ddlReadOnly").data("kendoMultiSelect").value();
            $(ReadOnly).each(function (i, item) {
                if (ReadOnlyUsers == '') {
                    ReadOnlyUsers = item;
                }
                else {
                    ReadOnlyUsers += "; " + item;
                }
            });

            var ReadWrite = $("#ddlReadWrite").data("kendoMultiSelect").value();
            $(ReadWrite).each(function (i, item) {
                if (ReadWriteUser == '') {
                    ReadWriteUser = item;
                }
                else {
                    ReadWriteUser += "; " + item;
                }
            });

            var FullControl = $("#ddlFullControl").data("kendoMultiSelect").value();
            $(FullControl).each(function (i, item) {
                if (FullControlUsers == "") {
                    FullControlUsers = item;
                }
                else {
                    FullControlUsers += "; " + item;
                }
            });
        }

        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + getParameterByName("ContractID") + '/people',
            type: 'PUT',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            data: {
                ContractPrivacy: $("input[type='radio'][name='ContractPrivacy']:checked").val(),
                PermissionAssignment: "Role-Based",
                ContractManagers: cm,
                Reviewers: rev,
                Approvers: app,
                ReadOnlyPermissions: ReadOnlyUsers,
                ReadWritePermissions: ReadWriteUser,
                FullControlPermissions: FullControlUsers,
                Permissions: vPermissions,
                Signees: sign,
                ExternalSignees: $("#txtExternalSignee").val(),
                SharedWith: $("#txtSharedWith").val(),
                ModifiedBy: localStorage.UserName
            },
            cache: false,
            success: function (person) {
                $('.ui-button-green-text').parent().removeAttr('disabled');
                swal("", "People & Permissions Setting Saved.");
                $("#addEditPeople").dialog("close");
                if (cm == "") {
                    $("#licontractmanagersNA").css('display', '');
                }
                else {
                    $("#licontractmanagersNA").css('display', 'none');
                }
                $("#licontractmanagers").text(cm);
                if (rev == "") {
                    $("#lireviewersNA").css('display', '');
                }
                else {
                    $("#lireviewersNA").css('display', 'none');
                }
                $("#lireviewers").text(rev);
                if (app == "") {
                    $("#liapproversNA").css('display', '');
                }
                else {
                    $("#liapproversNA").css('display', 'none');
                }
                $("#liapprovers").text(app);
                if (sign == "") {
                    $("#lisigneesNA").css('display', '');
                }
                else {
                    $("#lisigneesNA").css('display', 'none');
                }
                $("#lisignees").text(sign);
                if ($("#txtExternalSignee").val() == "") {
                    $("#lisigneesExternalNA").css('display', '');
                }
                else {
                    $("#lisigneesExternalNA").css('display', 'none');
                }
                $("#lisigneesExternal").text($("#txtExternalSignee").val());

                if ($("#txtSharedWith").val() == "") {
                    $("#lisharedWithNA").css('display', '');
                }
                else {
                    $("#lisharedWithNA").css('display', 'none');
                }
                $("#lisharedWith").text($("#txtSharedWith").val());


                var PeoplePermissions = $('input:radio[name=PeoplePermissions]:checked').val();

                if (PeoplePermissions == 'Custom') {
                    $("#liPermissions").text("Custom");
                }
                else {
                    $("#liPermissions").text("Default");
                }

                $("#liReadOnly").text(ReadOnlyUsers);
                $("#liReadWrite").text(ReadWriteUser);
                $("#liFullControl").text(FullControlUsers);




                $("#lblContractPrivacy").text($("input[type='radio'][name='ContractPrivacy']:checked").val());

            }
        });


    }
    else {
        $('.ui-button-green-text').parent().removeAttr('disabled');
    }
    return isformvalid;

}


$('#btnEditStatus').click(function () {
    $("#addEditStatus").dialog("option", "title", "Change Status");
    $("#addEditStatus").dialog("open");
    $("#ui-datepicker-div").hide();
    $("#dtRenewalDate").on('click', function () {
        $("#ui-datepicker-div").show();
    });
    $("#dtExtendedDate").on('click', function () {
        $("#ui-datepicker-div").show();
    });
});

function ManageStatus() {
    $("#addEditStatus").dialog("option", "title", "Change Status");
    $("#addEditStatus").dialog("open");
    $("#ui-datepicker-div").hide();
    $("#dtRenewalDate").on('click', function () {
        $("#ui-datepicker-div").show();
    });
    $("#dtExtendedDate").on('click', function () {
        $("#ui-datepicker-div").show();
    });
    CloseStatusChangedAlert();
}

function UndoStatus(status) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + getParameterByName("ContractID") + '/changestatus?status=' + status,
        type: 'PUT',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
        cache: false,
        success: function (result) {
            $('.ui-button-green-text').parent().removeAttr('disabled');
            $("#spanstatus").text(status);
            $("input:radio[name=rdstatus][value='" + encodeURI(status) + "']").attr('checked', 'checked');
        }
    });
    CloseStatusChangedAlert();
}

function CloseStatusChangedAlert() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + getParameterByName("ContractID") + '/closealert',
        type: 'PUT',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
        cache: false,
        success: function (result) {
            $("#dvContractAlert").css("display", "none");
        }
    });
}

$("#checkboxApprovalTask").click(function () {
    if ($("#checkboxApprovalTask")[0].checked == true) {
        $("#txtApprovalTask").removeAttr('readonly');
    }
});
//Script for Details End
//Script for Documents Start    
$(function () {
    $('#Upload').click(function () {
        var formData = new FormData();
        var opmlFile = $('#me')[0];
        var strContractID = getParameterByName('ContractID');
        formData.append("opmlFile", opmlFile.files[0]);
        formData.append("ContractTitle", $("#lblContractTitle").text());
        formData.append("AccountID", localStorage.AccountID);
        formData.append("ContractID", strContractID);
        formData.append("CreatedBy", localStorage.UserName);
        formData.append("ModifiedBy", localStorage.UserName);
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?contractid=' + getParameterByName('ContractID'),
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
            processData: false,
            success: function (document) {

                swal({
                    title: '',
                    text: "Document Uploaded",

                },
                   function (confirmed) {
                       if (confirmed) {
                           location = "/Contracts/ContractDetails?ContractID=" + strContractID;
                       }

                   });
            }
        });
    });
});

$("#ddlDocumentTemplate").change(function () {
    if ($("#ddlDocumentTemplate").val() != "0") {
        var vTemplate = $("#ddlDocumentTemplate").val().split('~');
        if (vTemplate[1] != '') {
            //$("#ddlDocumentTypeCreate").find('option[value="Primary Agreement"]').prop("selected", true);
            $("#ddlDocumentTypeCreate option").filter(function (index) { return $(this).text() === vTemplate[1] }).prop('selected', true);
        }
    }
    $("#tblDocumentFromTemplate").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?contractid=' + getParameterByName('ContractID') + '&templatename=' + $("#ddlDocumentTemplate").find('option:selected').text(),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            if (data.length > 0) {
                $(data).each(function (i, document) {
                    var vDocumentName = document.DocumentName.split('.')[0];
                    var vDocument = '<tr>';
                    vDocument += '<td class="labelleft">' + vDocumentName;
                    vDocument += '</td>';
                    vDocument += '<td class="labelleft"><span class="right-float"><a href="javascript:void(0)" onclick="javascript:OverwriteDocument(\'' + vDocumentName + '\');">Overwrite</a></span></td></tr>';
                    $("#tblDocumentFromTemplate").append(vDocument);
                });
                $("#templateCnfrmMsg").dialog("open");
            }
        }
    });
});

function OverwriteDocument(docName) {
    $("#txtDocumentNameCreate").val(docName);
    $("#templateCnfrmMsg").dialog("close");
}

function showalldocuments() {
    $('#trseedoc').html('<img src="../Content/Images/loading.gif">');
    var vFinalSignature = "dropdownMenuFinal";
    var vMarkFinalSignature = "dropdownMenuMarkFinal";
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/feature?featureid=1',
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        processData: false,
        async: false,
        success: function (data) {
            if (data.Status == "ON") {
                vFinalSignature = "dropdownMenuFinalSignature";
                vMarkFinalSignature = "dropdownMenuMarkFinalSignature";
            }
        },
        error: function () {

        }

    });
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?contractid=' + getParameterByName('ContractID'),
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        processData: false,
        success: function (data) {
            $("#ulDocument").empty();
            var count = 0;
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                count++

                var vURL = encodeURI(item.DocumentUrl);
                var vClass = "openmenuDocumentFinal";
                var vDocIcon = '<img src="../Content/Images/edit.png" class="doc_type" alt="Draft Document" title="Draft Document" />';
                var vDocumentLibraryName = item.DocumentLibraryName;
                if (vDocumentLibraryName != '' && vDocumentLibraryName != null) {
                    if (vDocumentLibraryName == "Finalized Documents") {
                        vClass = "openmenuDocument";
                        vDocIcon = '<img src="../Content/Images/icon/final_doc.png" class="doc_type" alt="Finalized Document" title="Finalized Document" />';
                    }
                }
                $("#ulDocument").append('<li><label id="DocumentID" style="display:none;">' + item.RowKey + '</label><label id="DocumentName" style="display:none;">' + item.DocumentName
                    + '</label><span class="documentsContS3 files"><b><a href=' + vURL + '>' + item.DocumentName
                    + '</a></b><small>' + moment(new Date(item.Modified)).fromNow()
                    + '</small>' + vDocIcon + '&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="' + vClass + '" /></span></li>');

            }

            ApplyPermissionToMenu($("#hdnPermission").val());
            $('.files').linktype();
            $("#lblDocumentsCount").text('(' + count + ')');

            if (!$("#lblDocumentsCount").text().trim()) {
                $("#ulDocument").append('<li class="cont_Doc_Mess">No Document Available</li>');
            }
            $(".openmenuDocument").contextMenu({ menu: vFinalSignature, leftButton: true }, function (action, el, pos) { contextMenuDocument(action, el.parent("span").parent("li"), pos); });
            $(".openmenuDocumentFinal").contextMenu({ menu: vMarkFinalSignature, leftButton: true }, function (action, el, pos) { contextMenuDocument(action, el.parent("span").parent("li"), pos); });
            $('#trseedoc').empty();
        },
        error: function () {
            if (!$("#lblDocumentsCount").text().trim()) {
                $("#ulDocument").append('<li class="cont_Doc_Mess">No Document Available</li>');
            }
        }

    });
}
$(document).ready(function () {

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/templatedocuments',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (templates) {
            $(templates).each(function (i, item) {
                $("#ddlDocumentTemplate").append("<option value='" + item.TemplateName + "~" + item.DocumentType + "'>" + item.TemplateName + "</option>");
                $("#ddlReplaceTemplate").append("<option value='" + item.TemplateName + "~" + item.DocumentType + "'>" + item.TemplateName + "</option>");
            });
        }
    });

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documenttypes',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (documenttypes) {
            $(documenttypes).each(function (i, item) {
                $("#ddlDocumentType").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>");
                $("#ddlDocumentTypeCreate").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>");
            });
            // $("#ddlDocumentTypeCreate").find('option[value="Primary Agreement"]').prop("selected", true);
        }
    });

});

function BindDocument() {
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
    var vFinalSignature = "dropdownMenuFinal";
    var vMarkFinalSignature = "dropdownMenuMarkFinal";
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/feature?featureid=1',
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        processData: false,
        async: false,
        success: function (data) {
            if (data.Status == "ON") {
                vFinalSignature = "dropdownMenuFinalSignature";
                vMarkFinalSignature = "dropdownMenuMarkFinalSignature";
            }
        },
        error: function () {

        }

    });
    $("#ulDocument").empty();
    try {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?contractid=' + getParameterByName('ContractID'),
            type: 'GET',
            cache: false,
            contentType: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            processData: false,
            success: function (data) {
                var count = 0;
                var vPermission = $("#hdnPermission").val();

                var datalenght = data.length;
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];
                    count++
                    if (count <= 5) {
                        var vClass = "openmenuDocumentFinal";
                        var vv = moment(new Date(item.Modified));
                        var vTime = vv.fromNow();
                        vTime = vv.from(vGetTime);

                        var vDocIcon = '<img src="../Content/Images/edit.png" class="doc_type" alt="Draft Document" title="Draft Document" />';
                        var vDocumentLibraryName = item.DocumentLibraryName;
                        if (vDocumentLibraryName != '' && vDocumentLibraryName != null) {
                            if (vDocumentLibraryName == "Finalized Documents") {
                                vClass = "openmenuDocument";
                                vDocIcon = '<img src="../Content/Images/icon/final_doc.png" class="doc_type" alt="Finalized Document" title="Finalized Document" />';
                            }
                        }
                        var vURL = encodeURI(item.DocumentUrl);
                        $("#ulDocument").append('<li><label id="DocumentID" style="display:none;">' + item.RowKey + '</label><label id="SentForSign" style="display:none;">' + item.SentForSign + '</label><label id="DocumentName" style="display:none;">' + item.DocumentName
                            + '</label><span class="documentsContS3 files"><b><a href=' + vURL + '  target="_blank">' + item.DocumentName + '</a></b><small>' + vTime
                            + '</small>' + vDocIcon + '&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="' + vClass + '" /></span></li>');
                    }
                }

                if (count > 5) {
                    var more = count - 5;
                    $("#ulDocument").append('<li id="trseedoc"><a href="javascript:void(0)" onclick="showalldocuments();">' + more + ' More To See</a></li>');
                }

                $('.files').linktype();
                $("#lblDocumentsCount").text('(' + count + ')');

                if (!$("#lblDocumentsCount").text().trim()) {
                    $("#ulDocument").append('<li class="cont_Doc_Mess">No Document Available</li>');
                }
                $(".openmenuDocument").contextMenu({ menu: vFinalSignature, leftButton: true }, function (action, el, pos) { contextMenuDocument(action, el.parent("span").parent("li"), pos); });
                $(".openmenuDocumentFinal").contextMenu({ menu: vMarkFinalSignature, leftButton: true }, function (action, el, pos) { contextMenuDocument(action, el.parent("span").parent("li"), pos); });
                ApplyPermissionToMenu($("#hdnPermission").val());
            },
            error: function (request) {
                if (!$("#lblDocumentsCount").text().trim()) {
                    $("#ulDocument").append('<li class="cont_Doc_Mess">No Document Available</li>');
                }
                else {
                    var arr = request.responseText.split(':');
                    var str1 = arr[1];
                    var str2 = "No document found";
                    if (str1.indexOf(str2) != -1) {
                        $("#lblDocumentsCount").text('');
                        $("#ulDocument").append('<li class="cont_Doc_Mess">No Document Available</li>');
                    }
                }
            }

        });
    } catch (e) {
        swal("", e.message);
    }
}

function BindDocumentNotTagToContract() {

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
                $("#tblExistingDocument").empty();
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
                $("#tblExistingDocument").append('<tr><td class="f_p-error det_metadata_notavailble">No Document Available</td></tr>');
            }

        });


    } catch (e) {

    }
}

$('#txtSearchDocument').keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        BindDocumentNotTagToContract();
    }
});
function addDocument() {
    $("#documentInline").slideToggle();
}

$(document).ready(function () {
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
    allowOnlyNumberInInputBox("txtExpIn");
    $(".openmenuDocument").contextMenu({ menu: 'dropdownMenu', leftButton: true }, function (action, el, pos) { contextMenuDocument(action, el.parent("tr"), pos); });

    $("#addEditDocument").dialog({
        autoOpen: false, closeText: "",
        width: "80%",
        title: "Document",
        modal: true,
        buttons: {
            "Save": function () { modalOnOpenDocument(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#treeviewFolder").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Select Folder",
        modal: true,
        buttons: {
            "OK": function () { selectfolder(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#EditDocument").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Document",
        modal: true,
        buttons: {
            "Save": function () { modalOnOpenDocument(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#templateCnfrmMsg").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Document Exist",
        modal: true,
        buttons: {
            "Save as New": function () {
                $("#txtDocumentNameCreate").val($("#ddlDocumentTemplate").find('option:selected').text() + "_Copy");
                $(this).dialog("close");
            },
            Cancel: function () {
                $("#ddlDocumentTemplate").val("0");
                $(this).dialog("close");
            }
        }
    });

    $("#sendForSignature").dialog({
        autoOpen: false, closeText: "",
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
            $(".addmorelinks").show();
        }
    });
    $("#shareDocument").dialog({
        autoOpen: false, closeText: "",
        width: "75%",
        title: "Share Document",
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
            $(".addmorelinks").show();
        }
    });
    $("#browseSigneeUser").dialog({
        autoOpen: false, closeText: "",
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

    allowOnlyNumberInInputBox("txtRenewableFor");
    allowOnlyNumberInInputBox("txtStandardRenewalTerm");
    allowOnlyNumberInInputBox("txtApprovalTask");

});

$('#btnAddContractDocument').click(function () {

    $("#tblContentControls").empty();
    selectUploadFromComputer();

    $("#txtDocumentID").val("");
    $("#txtDocumentName").val("");
    $("#docContract").replaceWith($("#docContract").val('').clone(true));
    $("#txtDescriptionDoc").val("");

    $("#txtAuthorCreate").val("");
    $("#txtDocumentLanguageCreate").val("");
    $("#txtHardCopyPhysicalLocationCreate").val("");

    $("#lblCTitleDoc").text($("#lblContractTitle").text());
    $("#trFileUpload").css("display", "");
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
    $('input:checkbox[name=NotTaggedContract]').attr('checked', false);
    $("#hdnIsDocumentTag").text('');

}

function getQueryStringFromValue(url, name) {

    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(url);
    return results == null ? url : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function contextMenuDocument(action, el, pos) {

    switch (action) {
        case "view":
            {
                $("#loadingPage").fadeIn();
                $("#docMetadata").addClass('active_tab');
                $("#docActivities").removeClass('active_tab');
                var documentID = $(el).find("#DocumentID").text();
                $("#tblMetadataDetailDocument").empty();
                $('#tblMetadataDetailDocument').append('<tr><td><img src="../Content/Images/icon/loading.gif"/></td></tr>');

                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + documentID,
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
                        vMetadata += '<td class="text_label width40">Document Author</td>';
                        vMetadata += '<td class="text width60">' + documententity.DocumentAuthor + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Document Language</td>';
                        vMetadata += '<td class="text width60">' + documententity.DocumentLanguage + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Hard-copy Physical Location</td>';
                        vMetadata += '<td class="text width60">' + documententity.HardCopyPhysicalLocation + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Folder (show path)</td>';
                        vMetadata += '<td class="text width60">' + documententity.DocumentUrl + '</td>';
                        vMetadata += '</tr>';
                        var strIsFinalized = "No";
                        var strIsFinalizedBy = "-";
                        if (documententity.IsFinalized == "Yes") {
                            strIsFinalized = "Yes";
                            strIsFinalizedBy = documententity.FinalizedBy;
                        }
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Finalized/Ready for Signature (Yes no)</td>';
                        vMetadata += '<td class="text width60">' + strIsFinalized + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Finalized/Ready for Signature By</td>';
                        vMetadata += '<td class="text width60">' + strIsFinalizedBy + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Document Version</td>';
                        vMetadata += '<td class="text width60">' + documententity.VersionNo + '</td>';
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
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Shared with</td>';
                        vMetadata += '<td class="text width60">' + '' + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Reviewed by</td>';
                        vMetadata += '<td class="text width60">' + documententity.Reviewers + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Signed by</td>';
                        vMetadata += '<td class="text width60">' + documententity.Signee + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Document File Size</td>';
                        vMetadata += '<td class="text width60">' + documententity.FileSize + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Document Format</td>';
                        vMetadata += '<td class="text">' + documententity.DocumentFormat + '</td>';
                        vMetadata += '</tr>';



                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Creation Mode</td>';
                        vMetadata += '<td class="text width60">' + documententity.CreationMode + '</td>';
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
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/activities?objecttype=&objectid=' + documentID + '&actiontype=',
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
                    text: "Are you sure you want to <span style=\"font-weight:700\">delete '" + documentName + "'</span>?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
   function (confirmed) {
       if (confirmed) {
           var documentID = $(el).find("#DocumentID").text();
           $.ajax({
               url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + documentID,
               type: 'DELETE',
               dataType: 'json',
               "Content-Type": "application/json",
               headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
               cache: false,
               success: function (data) {
                   swal("", "Document Deleted");
                   BindDocument();
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
           var documentID = $(el).find("#DocumentID").text();
           $.ajax({
               url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/untag?contractid=' + getParameterByName('ContractID') + '&documentid=' + documentID,
               type: 'PUT',
               dataType: 'json',
               "Content-Type": "application/json",
               headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken },
               cache: false,
               success: function (data) {
                   swal("", "Document Removed");
                   BindDocument();
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
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + documentID,
                    type: 'GET',
                    dataType: 'json',
                    "Content-Type": "application/json",
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    cache: false,
                    success: function (documententity) {

                        $("#txtDocumentID").val(documententity.RowKey);
                        var vDocName = documententity.DocumentName.split('.');
                        $("#txtDocumentName").val(vDocName[0]);
                        $("#spExt").html(vDocName[1]);
                        $("#ddlDocumentType option").filter(function (index) { return $(this).text() === documententity.DocumentType; }).prop('selected', true);
                        $("#txtDocumentDescriptionEdit").val(documententity.Description);
                        $("#txtAuthorEdit").val(documententity.DocumentAuthor);
                        $("#txtDocumentLanguageEdit").val(documententity.DocumentLanguage);
                        $("#txtHardCopyPhysicalLocationEdit").val(documententity.HardCopyPhysicalLocation);
                        var vDocumentLibraryName = documententity.DocumentLibraryName;
                        if (vDocumentLibraryName != '' && vDocumentLibraryName != null) {
                            if (vDocumentLibraryName == "Finalized Documents") {
                                $('input[type="radio"][name="IsFinalizedEdit"][value="Yes"]').prop('checked', true);
                            }
                        }
                    }
                });

                $("#trFileUpload").css("display", "none");

                $("#lblCTitleDoc").text($("#lblContractTitle").text());
                $(".validelement").each(function (index, element) {
                    $(element).removeClass("error");
                    $("#errormsg_" + element.id).remove();
                });
                $("#EditDocument").dialog("option", "title", "Edit Document Metadata");
                $("#EditDocument").dialog("open");
                break;
            }
        case "final":
            {
                swal({
                    title: '',
                    text: "Are you sure you want to <span style=\"font-weight:700\">mark</span>this document as <span style=\"font-weight:700\">Final</span>.",
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
                   swal("", "Document Marked as Final");
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
                var LinkURL = $(el).find("a").attr('href');
                var SourceUrl = "";
                if (LinkURL == "#") {
                    SourceUrl = $(el).find("a").attr('seqe')
                } else {
                    SourceUrl = getQueryStringFromValue(LinkURL, 'sourcedoc');
                    //SourceUrl = encodeURIComponent(SourceUrl);
                    var formatarray = "doc,xls,ppt,docx,xlsx,pptx,dotx";
                    var filename = SourceUrl;
                    filename = filename.split("/").pop().split(".").pop();
                    if ($.inArray(filename, formatarray.split(',')) > -1) {
                        SourceUrl = encodeURIComponent(SourceUrl);
                    }
                    else {
                        SourceUrl = decodeURIComponent(SourceUrl);
                        SourceUrl = encodeURIComponent(SourceUrl);
                    }
                }
                location = localStorage.SPHostUrl + "/_layouts/15/download.aspx?SourceUrl=" + SourceUrl;
                break;
            }
        case "signature":
            {
                ClearSignatureForm();
                var documentName = $(el).find("#DocumentName").text();
                var sentForSign = $(el).find("#SentForSign").text();
                if (sentForSign == '') {
                    var LinkURL = $(el).find("a").attr('href');
                    var DocumentUrl = getQueryStringFromValue(LinkURL, 'sourcedoc');
                    var documentID = $(el).find("#DocumentID").text();
                    $("#hdDocumentID").val(documentID);
                    $("#hdDocumentURL").val(DocumentUrl);
                    $("#tdDocument").append("<b>" + documentName + "</b>");
                    getNameAndEmailSignDocument();
                    $("#sendForSignature").dialog("open");
                }
                else {
                    swal("", "This document has already been sent for signature: " + sentForSign);
                }
                break;
            }
        case "editO365":
            {
                var LinkURL = $(el).find("a").attr('href');
                var SourceUrl = getQueryStringFromValue(LinkURL, 'sourcedoc');
                if (SourceUrl == LinkURL) {
                    var LinkURL = $(el).find("a").attr('href');
                    var SourceUrl = "";
                    if (LinkURL == "#") {
                        SourceUrl = $(el).find("a").attr('seqe')
                    } else {
                        SourceUrl = getQueryStringFromValue(LinkURL, 'sourcedoc');
                        //SourceUrl = encodeURIComponent(SourceUrl);
                        var formatarray = "doc,xls,ppt,docx,xlsx,pptx,dotx";
                        var filename = SourceUrl;
                        filename = filename.split("/").pop().split(".").pop();
                        if ($.inArray(filename, formatarray.split(',')) > -1) {
                            SourceUrl = encodeURIComponent(SourceUrl);
                        }
                        else {
                            SourceUrl = decodeURIComponent(SourceUrl);
                            SourceUrl = encodeURIComponent(SourceUrl);
                        }
                    }
                    location = localStorage.SPHostUrl + "/_layouts/15/download.aspx?SourceUrl=" + SourceUrl;
                }
                else {
                    window.open(LinkURL);
                }
                break;
            }
        case "sharelink":
            {
                ClearShareForm();
                var LinkURL = $(el).find("a").attr('href');
                var DocumentUrl = getQueryStringFromValue(LinkURL, 'sourcedoc');
                var documentName = $(el).find("#DocumentName").text();
                var documentID = $(el).find("#DocumentID").text();
                $("#hdDocumentID").val(documentID);
                $("#hdDocumentURL").val(DocumentUrl);
                $("#tdShareDocument").append("<b>" + documentName + "</b>");
                getNameAndEmailShareDocument();
                $("#shareDocument").dialog("open");
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
                break;
            }
        case "review":
            {
                var documentName = $(el).find("#DocumentName").text();
                var documentID = $(el).find("#DocumentID").text();
                $("#txtTodoTitle").val('Review for ' + documentName.split('.')[0]);
                $("#ddlTodoType option").filter(function (index) { return $(this).text() === "Document Review"; }).prop('selected', true);
                $("#txtBrowseElement").val(documentName);
                $("#txtBrowseElementID").val(documentID);
                $("#trBrowse").css("display", "");
                $("#browse").css("display", "none");
                $("#tdBrowseElement").html("Documents");
                $("#dvTodo").dialog("open");
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

function ShowMetadata() {
    $("#docMetadata").addClass('active_tab');
    $("#docActivities").removeClass('active_tab');
    $('#tblMetadataDetailDocument').css("display", "");
    $('#documentLogs').css("display", "none");
    $('#compact-pagination-documentLogs').css("display", "none");
}

function ShowActivities() {
    $("#docMetadata").removeClass('active_tab');
    $("#docActivities").addClass('active_tab');
    $('#tblMetadataDetailDocument').css("display", "none");
    $('#documentLogs').css("display", "");
    $('#compact-pagination-documentLogs').css("display", "none");
}

function modalOnOpenDocument(dialog) {
    $('.ui-button-green-text').parent().attr('disabled', 'disabled');
    if ($("#hdnIsDocumentTag").text() == "Yes") {
        var vDocuments = "";
        $('input:checkbox[name="NotTaggedContract"]:checked').each(function () {
            if (vDocuments == "") {
                vDocuments = this.id;
            }
            else {
                vDocuments += ";" + this.id;
            }
        });
        if (vDocuments != "") {
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentids=' + vDocuments + '&contractid=' + getParameterByName('ContractID') + '&username=' + localStorage.UserName,
                type: 'PUT',
                data: formData,
                cache: false,
                contentType: false,
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken },
                processData: false,
                success: function (document) {
                    $('.ui-button-green-text').parent().removeAttr('disabled');

                    swal("", "Document Tagged");

                    $("#addEditDocument").dialog("close");
                    BindDocument();
                    $("#tblExistingDocument").empty();
                    $("#hdnIsDocumentTag").text('');
                    $("#tblNewDocument").css('display', '');
                    $("#tblExistingDocument").css('display', 'none');
                    $("#tblExistingDocumentSearch").css('display', 'none');
                    $("#tblExistingDocumentPaging").css('display', 'none');
                    $("#tabTemplate").addClass('form-active');
                    $("#tabUpload").removeClass('form-active');
                    $("#trTemplate").css('display', '');
                    $("#trTemplate1").css('display', '');
                    $("#trFileUpload").css('display', 'none');
                }
            });
        } else {
            $('.ui-button-green-text').parent().removeAttr('disabled');

            swal("", "No Document has been selected.");
        }
    }
    else {
        var DocumentID = $("#txtDocumentID").val()
        if (DocumentID != "") {
            if (requiredValidator("EditDocument")) {
                var formData = new FormData();
                var opmlFile = $('#docContract')[0];
                var vDocumentType = "";

                formData.append("opmlFile", opmlFile.files[0]);
                formData.append("AccountID", localStorage.AccountID);
                formData.append("DocumentID", DocumentID);
                formData.append("ContractID", getParameterByName('ContractID'));
                formData.append("Description", $("#txtDocumentDescriptionEdit").val());
                formData.append("DocumentAuthor", $("#txtAuthorEdit").val());
                formData.append("DocumentLanguage", $("#txtDocumentLanguageEdit").val());
                formData.append("HardCopyPhysicalLocation", $("#txtHardCopyPhysicalLocationEdit").val());
                formData.append("ContractTitle", $("#lblCTitleDoc").text());
                formData.append("DocumentName", $("#txtDocumentName").val());
                if ($("#ddlDocumentType").val() != "0") {
                    vDocumentType = $("#ddlDocumentType").val();
                }
                formData.append("DocumentType", vDocumentType);
                formData.append("ModifiedBy", localStorage.UserName);
                formData.append("DocumentExt", $("#spExt").html());
                formData.append("IsFolder", 'False');
                if ($("input:radio[name=IsFinalizedEdit]:checked").val() == "Yes") {
                    formData.append("DocumentLibraryName", "Finalized Documents");
                } else {
                    formData.append("DocumentLibraryName", "Draft Documents");
                }

                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + DocumentID,
                    type: 'PUT',
                    data: formData,
                    cache: false,
                    contentType: false,
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken },
                    processData: false,
                    success: function (document) {
                        $('.ui-button-green-text').parent().removeAttr('disabled');
                        swal("", "Document Updated");
                        $("#EditDocument").dialog("close");
                        BindDocument();

                    }
                });
            }
        }

        else {

            if (requiredValidator('addNewDocument')) {
                if ($("#ddlDocumentTemplate").attr("class").indexOf('validelement') == -1) {
                    $("#idDocUploadInProgress").css('display', '');
                    $('.ui-button-green-text').parent().attr('disabled', 'disabled');
                }
                if (CheckDocumentExist()) {

                    swal("", "Document Exist");
                    $('.ui-button-green-text').parent().removeAttr('disabled');
                    $("#idDocUploadInProgress").css('display', 'none');
                }
                else {
                    var tblContentControls = null;
                    var formData = new FormData();
                    var opmlFile = $('#docContract')[0];
                    var vDocumentType = "";

                    if (opmlFile.files.length > 0) {
                        formData.append("opmlFile", opmlFile.files[0]);
                    }
                    formData.append("AccountID", localStorage.AccountID);
                    formData.append("DocumentID", DocumentID);
                    formData.append("Description", $("#txtDescriptionDoc").val());

                    formData.append("DocumentAuthor", $("#txtAuthorCreate").val());
                    formData.append("DocumentLanguage", $("#txtDocumentLanguageCreate").val());
                    formData.append("HardCopyPhysicalLocation", $("#txtHardCopyPhysicalLocationCreate").val());

                    formData.append("ContractID", getParameterByName('ContractID'));
                    formData.append("ContractTitle", $("#lblCTitleDoc").text());

                    if ($("#ddlDocumentTypeCreate").val() != "0") {
                        vDocumentType = $("#ddlDocumentTypeCreate").val();
                    }
                    formData.append("DocumentType", vDocumentType);
                    formData.append("Counterparty", $("#lblCounterparty").text());
                    if ($("#ddlDocumentTemplate").is(":visible")) {
                        formData.append("TemplateName", $("#ddlDocumentTemplate").find('option:selected').text());
                        formData.append("DocumentName", $("#txtDocumentNameCreate").val());
                        tblContentControls = $("#formtblContentControls").serializeArray();
                    } else {
                        formData.append("DocumentName", "")
                    }

                    if ($("input:radio[name=IsFinalized]:checked").val() == "Yes") {
                        formData.append("DocumentLibraryName", "Finalized Documents");
                    } else {
                        formData.append("DocumentLibraryName", "Draft Documents");
                    }

                    formData.append("LocationURL", $('#lblFolderUrl').text())
                    formData.append("FolderName", $('#txtNewFolderName').val())
                    formData.append("NewFolderName", $('#txtNewFolderName').val())

                    if ($("input:radio[name=rad_Copy]:checked").val() == "Library") {
                        formData.append("DocumentLocation", "Office 365 Document Library");
                    } else {
                        formData.append("DocumentLocation", "Office 365 Document Library & eContracts Cloud");
                    }

                    formData.append("CreatedBy", localStorage.UserName);
                    formData.append("ModifiedBy", localStorage.UserName);
                    if (tblContentControls != null) {
                        var tblContentControlslength = tblContentControls.length;
                        for (var i = 0; i < tblContentControlslength; i++)
                            formData.append(tblContentControls[i].name, tblContentControls[i].value);
                    }

                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents',
                        type: 'POST',
                        data: formData,
                        cache: false,
                        contentType: false,
                        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken },
                        processData: false,
                        success: function (data) {
                            $("#idDocUploadInProgress").css('display', 'none');
                            $('.ui-button-green-text').parent().removeAttr('disabled');
                            if ($("#ddlDocumentTemplate").attr("class").indexOf('validelement') >= 0) {

                                swal("", "New document generation from template in progress. Please check in a few minutes.");
                            }
                            else {

                                swal("", "Document Uploaded.");
                                BindDocument();
                            }
                            $('.ui-button-green-text').parent().removeAttr('disabled');
                            $("#addEditDocument").dialog("close");
                            $("#ddlDocumentTypeCreate").val("0");
                            //$("#ddlDocumentTypeCreate").find('option[value="Primary Agreement"]').prop("selected", true);
                            $("#ddlDocumentTemplate").val("0");
                            $("#txtDocumentNameCreate").val("");

                            if ($('#txtNewFolderName').val() != "") {
                                if ($("input:radio[name=IsFinalized]:checked").val() == "Yes") {
                                    $("#hdnFinalizedDocumentsUrl").text($('#lblFolderUrl').text() + $('#txtNewFolderName').val());
                                } else {
                                    $("#hdnDraftDocumentsUrl").text($('#lblFolderUrl').text() + $('#txtNewFolderName').val());
                                }
                            }

                            $('#txtFolderName').val("");
                            $('#txtNewFolderName').val("");

                        }
                    });
                }
            } else {
                $('.ui-button-green-text').parent().removeAttr('disabled');
                $("#idDocUploadInProgress").css('display', 'none');
            }
        }
    }
}

function CheckDocumentExist() {
    var isExist = false;
    if ($("#ddlDocumentTemplate").is(":visible")) {
        isExist = false;
    }
    else {
        var vDocURL = localStorage.SPHostUrl + $('#lblFolderUrl').text() + $('#docContract')[0].files[0].name;
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?docurl=' + vDocURL,
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

$('#btnSelectFolder').click(function () {

    $("#treeviewFolder").dialog("option", "title", "Select Folder");
    $("#treeviewFolder").dialog("open");

});

function selectfolder() {

    $("#treeviewFolder").dialog("close");
}

function CreateFolder() {
    $('#load').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    var newurl = "";
    if ($("input:radio[name=IsFinalized]:checked").val() == "Yes") {
        newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/folderstructure?documentlibrary=Finalized Documents'
    } else {
        newurl = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/folderstructure?documentlibrary=Draft Documents'
    }
    $.ajax({
        url: newurl,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (folder) {
            $('#load').empty();
            var inline2 = new kendo.data.HierarchicalDataSource({
                data: folder,
                schema: {
                    model: {
                        children: "childrenData"
                    }
                }
            });

            var treeview = $("#treeviewFolder").kendoTreeView({
                template: kendo.template($("#treeviewFolder-template").html()),

                dataSource: inline2,
                loadOnDemand: false,
                schema: {
                    model: {
                        id: "RowKey",
                        fields: {
                            Folder: "Folder",
                            FolderURL: "FolderURL"
                        }
                    }
                },
                select: function (e) {
                    e.preventDefault();
                    var tree = $('#treeviewFolder').data('kendoTreeView');
                    var dataItem = tree.dataItem(e.node);
                    $('#txtFolderName').val(dataItem.FolderURL);

                    var strFolderUrl = dataItem.FolderURL + "/";
                    if (dataItem.FolderURL.indexOf('Draft Documents') != -1) {
                        $('#lblFolderUrl').text('/Draft Documents/' + strFolderUrl.split('/Draft Documents/')[1])
                    } else {
                        $('#lblFolderUrl').text('/Finalized Documents/' + strFolderUrl.split('/Finalized Documents/')[1])
                    }
                }
            }).data("kendoTreeView");

            treeview.expand(".k-item");
        },
        error:
            function (data) {
            }
    });
}

function tabchange(object) {
    if (object.id == "tabTemplate") {
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
        $("#trFileUpload").css('display', 'none');
        $('input:checkbox[name=NotTaggedContract]').attr('checked', false);
        $("#hdnIsDocumentTag").text('');
        $("#formTitle").text('Create From Template');
        $("#divDoc1").css('display', '');
        $("#divDoc2").css('display', '');

    } else if (object.id == "tabUpload") {

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
        $("#trFileUpload").css('display', '');
        $('input:checkbox[name=NotTaggedContract]').attr('checked', false);
        $("#hdnIsDocumentTag").text('');
        $("#tblContentControls").empty();
        $("#formTitle").text('Upload From Computer');
        $("#divDoc1").css('display', '');
        $("#divDoc2").css('display', '');

    }
    else if (object.id == "tabExistingDocument") {
        $("#tblNewDocument").css('display', 'none');
        $("#tblExistingDocument").css('display', '');
        $("#tblExistingDocumentSearch").css('display', '');
        $("#tblExistingDocumentPaging").css('display', '');
        $("#hdnIsDocumentTag").text('Yes');
        $("#tabExistingDocument").addClass('form-active');
        $("#tabUpload").removeClass('form-active');
        $("#tabTemplate").removeClass('form-active');
        $("#tblContentControls").empty();
        $("#formTitle").text('Add from Office 365 Library');
        $("#divDoc1").css('display', 'none');
        $("#divDoc2").css('display', 'none');
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
    htmlFormatFile += '<input id="txtInternalSignee' + totalFileCount + '" name="InternalSigneeName' + totalFileCount + '" placeholder="Signee Name" title="Signee" type="text" class="f_inpt width80"  readonly="readonly" />';
    htmlFormatFile += '<span class="right-float"><a href="javascript:void(0)" onclick="BrowseInternalSignee(\'txtInternalSignee' + totalFileCount + '\', \'txtInternalEmail' + totalFileCount + '\')">Browse</a></span>';
    htmlFormatFile += '</td>';
    htmlFormatFile += '<td style="display:none;">';
    htmlFormatFile += '<input id="txtInternalEmail' + totalFileCount + '" name="InternalSigneeEmail' + totalFileCount + '" placeholder="Signee Email" title="Email" type="text" class="f_inpt width90 validemail" />';
    htmlFormatFile += '</td>';
    htmlFormatFile += '<td class="width20">';
    htmlFormatFile += '<select id="ddlInternalSigneeOrder' + totalFileCount + '" name="InternalSigneeOrder' + totalFileCount + '" onclick="ClickedOrder(this);" onchange="SelectedOrder(this);" class="f_inpt width100 SigneeOrder validelement">';
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
function ClearResetSignee() {
    $("#" + $("#hdUserEmail").val()).val('');
    $("#" + $("#hdUserName").val()).val('');
    $('input:radio[name=SigneeUser]').attr('checked', false);
}
function BrowseInternalSignee(objName, objEmail) {
    $("#hdUserName").val(objName);
    $("#hdUserEmail").val(objEmail);
    //*Harshitha
    var selectedID = $("#" + $("#hdUserEmail").val()).val();
    if (selectedID != "") {
        var nospaceUserName = $("#" + $("#hdUserName").val()).val().replace(/ /g, "_");
        $('input:radio[name=SigneeUser][id="' + selectedID + '_' + nospaceUserName + '"]').attr('checked', 'checked');
    }
    else
        $('input:radio[name=SigneeUser]').attr('checked', false);
    $("#browseSigneeUser").dialog("option", "title", "Signee User");
    $("#browseSigneeUser").dialog("open");
}


function SelectedSignee() {
    var vSignee = $("input:radio[name=SigneeUser]:checked");
    //$("#" + $("#hdUserEmail").val()).val(vSignee.attr('id'));
    $("#" + $("#hdUserEmail").val()).val(vSignee.attr('title'));
    $("#" + $("#hdUserName").val()).val(vSignee.val());
    $("#hdUserEmail").val('');
    $("#hdUserName").val('');
    $("#browseSigneeUser").dialog("close");
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
    var vValid = requiredValidator('sendForSignature', true);
    if (vValid) {
        $("#loadingPage").fadeIn();
        var contractForm = $("#frmSignees, #frmInternalSignees").serialize();
        contractForm += "&Subject=";
        contractForm += "&SigneeMsg=" + $("#txtSigneeMsg").val();
        contractForm += "&Subject=" + $("#txtSubject").val();
        if (RightSignatureFlag) {
            contractForm += "&ExpIn=" + $("#ddltxtExpIn").val();
        }
        else {
            contractForm += "&ExpIn=" + $("#txtExpIn").val();
        }
        contractForm += "&DocumentURL=" + $("#hdDocumentURL").val();
        var ccUsers = $("#ddlCC").data("kendoMultiSelect").value();
        var internalSigneeUsers = '';
        var cc = '';
        var ins = '';
        $(ccUsers).each(function (i, item) {
            if (cc == '') {
                cc = item;
            }
            else {
                cc += "; " + item;
            }
        });
        contractForm += "&CC=" + cc;
        contractForm += "&InternalSignee=" + ins;
        var vDocID = $("#hdDocumentID").val();
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + vDocID,
            type: 'POST',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'UserName': localStorage.UserName, },
            data: contractForm,
            cache: false,
            success: function (person) {

                swal("", "Document Sent for Signature.");
                $("#sendForSignature").dialog("close");
                ClearSignatureForm();
                $("#loadingPage").fadeOut();
            },
            error: function (person) {

                swal("", person.responseText);
                $("#loadingPage").fadeOut();
            }
        });
    }
}

function getNameAndEmailSignDocument() {
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/' + getParameterByName("ContractID") + '/contacts',
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
                        else if (totalFileCountTaken < 5) {
                            totalFileCountTaken += 1;
                            var htmlFormatFile = '<tr id="trSignee' + totalFileCount + '">';
                            htmlFormatFile += '<td class="width40">';
                            htmlFormatFile += '<input id="txtSignee' + totalFileCount + '" value="' + item.ContactName + '" name="SigneeName' + totalFileCount + '" placeholder="Signee Name" title="Signee Name" type="text" class="f_inpt width90" value="' + item.ContactName + '" />';
                            htmlFormatFile += '</td>';
                            htmlFormatFile += '<td class="width40">';
                            htmlFormatFile += '<input id="txtEmail' + totalFileCount + '" value="' + item.EmailID + '" name="SigneeEmail' + totalFileCount + '" placeholder="Signee Email" title="Signee Email" type="text" class="f_inpt width90 validelement validemail" value="' + item.EmailID + '" />';
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
                            $("#ddlSigneeOrder" + totalFileCount).val(i + 2);
                        }
                    }
                    else {
                        if ($("#tblSigneeUser").find('li').length > 0) {
                            $("#tblSigneeUser").find('li').each(function () {
                                var inputval = ($(this).find('input').length > 0 ? $(this).find('input').val() : "");
                                if (inputval != "" && inputval == item.ContactName) {
                                    if (iIn == 1 && totalFileCountTaken < 5) {
                                        iIn = 2;
                                        totalFileCountTaken += 1;
                                        $("#txtInternalSignee1").val(item.ContactName);
                                        $("#txtInternalEmail1").val(item.EmailID);
                                    }
                                    else if (totalFileCountTaken < 5) {
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
                            $.ajax({
                                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users/authorizedsignatory?contractid=&contractareaname=' + encodeURIComponent($("#lblContractArea").text()),
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
                                            if (iIn == 1 && totalFileCountTaken < 5) {
                                                iIn = 2;
                                                totalFileCountTaken += 1;
                                                $("#txtInternalSignee1").val(item.ContactName);
                                                $("#txtInternalEmail1").val(item.EmailID);
                                            }
                                            else if (totalFileCountTaken < 5) {
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
    $("#txtSubject").val('');
    $("#txtSigneeMsg").val('');
    $("#txtExpIn").val('3');
    var ddlCC = $("#ddlCC").data("kendoMultiSelect");
    ddlCC.value('');
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
    vSignee += '<input id="txtInternalSignee1" name="InternalSigneeName1" placeholder="Signee Name" title="Signee" type="text" class="f_inpt width80"  readonly="readonly" />';
    vSignee += '<span class="right-float"><a href="javascript:void(0)" onclick="BrowseInternalSignee(\'txtInternalSignee1\', \'txtInternalEmail1\')">Browse</a></span>';
    vSignee += '</td>';
    vSignee += '<td style="display:none;">';
    vSignee += '<input id="txtInternalEmail1" name="InternalSigneeEmail1" placeholder="Signee Email" title="Email" type="text" class="f_inpt width90" />';
    vSignee += '</td>';
    vSignee += '<td class="width20">';
    vSignee += '<select id="ddlInternalSigneeOrder1" name="InternalSigneeOrder1" onclick="ClickedOrder(this);" onchange="SelectedOrder(this);" class="f_inpt width100 SigneeOrder validelement">';
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
        htmlFormatFile += '<input id="txtShareDocument' + totalFileCount + '" maxlength="42" name="ShareDocumentName' + totalFileCount + '" placeholder="Name" title="Name" maxlength="50" type="text" class="f_inpt width90" />';
        htmlFormatFile += '</td>';
        htmlFormatFile += '<td>';
        htmlFormatFile += '<input id="txtShareDocumentEmail' + totalFileCount + '" maxlength="50" name="ShareDocumentEmail' + totalFileCount + '" placeholder="Email ID" maxlength="100" title="Email Id" type="text" class="f_inpt width90 validemail" />';
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
        $("#loadingPage").fadeIn();
        var contractForm = $("#frmShareDocument").serialize();
        contractForm += "&SendBy=" + localStorage.UserName;
        contractForm += "&Notes=" + $("#txtShareNotes").val();
        contractForm += "&ExpIn=" + $("#txtShareExpIn").val();
        contractForm += "&AllowComment=" + 'Yes';
        contractForm += "&AllowDownload=" + 'Yes';
        contractForm += "&AllowUpload=" + 'Yes';
        var vDocID = $("#hdDocumentID").val();
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/Share?documentid=' + vDocID,
            type: 'POST',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            data: contractForm,
            cache: false,
            success: function (person) {
                swal("", "Document Shared.");
                $("#shareDocument").dialog("close");
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
    $("#txtShareExpIn").val('3');
    $('#tblShareDocument').empty();
    GetValuesAndAutoPopulate("ddlDocumentShareInternal", "");
    var vSignee = '<tr>';
    vSignee += '<td>';
    vSignee += '<input id="txtShareDocument1" name="ShareDocumentName1" maxlength="42" title="Name" placeholder="Name" type="text" class="f_inpt width90 validelement" />';
    vSignee += '</td>';
    vSignee += '<td>';
    vSignee += '<input id="txtShareDocumentEmail1" name="ShareDocumentEmail1" maxlength="50" title="Email ID" placeholder="Email ID" type="text" class="f_inpt width90 validelement validemail" />';
    vSignee += '</td>';
    vSignee += '<td style="width:20px">&nbsp;</td>';
    vSignee += '</tr>';
    $('#tblShareDocument').html(vSignee);
}

function getNameAndEmailShareDocument() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/' + getParameterByName("ContractID") + '/contacts',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            if (data != null) {
                var allInternal = '';
                var datalenght = data.length;
                var totalFileCount = 0;
                var iex = 0;
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];

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
        },
        error: function () {
        }

    });
}

function getNameAndEmail() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/' + getParameterByName("ContractID") + '/contacts',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                var vLastRow = $("#tblShareContract tr:last").attr('id');
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
        var contractForm = $("#frmShareContract").serialize();
        contractForm += "&SendBy=" + localStorage.UserName;
        contractForm += "&Notes=" + $("#txtShareNotesContract").val();
        contractForm += "&ExpIn=" + $("#txtShareExpInContract").val();
        contractForm += "&ContractTitle=" + $("#lblContractTitle").text();
        contractForm += "&AllowComment=" + 'Yes';
        var vContractID = getParameterByName('ContractID');
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracts/Share?contractid=' + vContractID,
            type: 'POST',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            data: contractForm,
            cache: false,
            success: function (person) {
                swal("", "Contract Shared.");
                $("#shareContract").dialog("close");
                $("#loadingPage").fadeOut();
                ClearShareContractForm();
            },
            error: function (person) {
                $("#loadingPage").fadeOut();
            }
        });
    }
}

function ClearShareContractForm() {
    $("#txtShareNotesContract").val('');
    $("#txtShareToContract").val('');
    $("#txtShareExpInContract").val('3');
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

function replacedocument() {
    if (requiredValidator("tblReplaceDocument")) {

        $("#loadingPage").fadeIn();
        var formData1 = new FormData();
        var opmlFile = $('#docToReplace')[0];
        var isUpload = true;
        var tblContentControls = null;
        var vrad_Replace = $('input[type="radio"][name=rad_Replace]:checked').val();
        if (vrad_Replace == 'Computer') {
            formData1.append("opmlFile", opmlFile.files[0]);
        }
        else {
            formData1.append("TemplateName", $("#ddlReplaceTemplate").find('option:selected').text());
            isUpload = false;
            tblContentControls = $("#formtblReplaceControls").serializeArray();
        }
        formData1.append("documentaction", "replace");
        formData1.append("ContractID", getParameterByName('ContractID'));
        formData1.append("AccountID", localStorage.AccountID);
        formData1.append("DocumentID", $('#hdnDocumentID').val());
        formData1.append("ModifiedBy", localStorage.UserName);
        if (tblContentControls != null) {
            var tblContentControlslength = tblContentControls.length;
            for (var i = 0; i < tblContentControlslength; i++)
                formData1.append(tblContentControls[i].name, tblContentControls[i].value);
        }
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentid=' + DocumentID,
            type: 'PUT',
            data: formData1,
            cache: false,
            contentType: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            processData: false,
            success: function (document) {
                $("#loadingPage").fadeOut();
                $('#divReplaceDocument').dialog("close");
                ClearReplaceDocFrom();
                if (isUpload) {
                    swal("", "Document Replaced");
                    BindDocument();
                }
                else {
                    swal("", "Replace document from template in progress. Please check in a few minutes.");
                }
            },
            error: function (document) {
                $("#loadingPage").fadeOut();
            }
        });
    }
}

$('input[name=rad_Replace]:radio').change(function () {
    var vrad_Replace = $('input[type="radio"][name=rad_Replace]:checked').val();
    if (vrad_Replace == 'Computer') {
        $("#trFileUploadBrowse").css('display', '');
        $("#trTemplateBrowse").css('display', 'none');
        $("#tblReplaceControls").css('display', 'none');
        $("#docToReplace").addClass('validelement');
        $("#ddlReplaceTemplate").removeClass('validelement');
    }
    else {
        $("#trFileUploadBrowse").css('display', 'none');
        $("#trTemplateBrowse").css('display', '');
        $("#tblReplaceControls").css('display', '');
        $("#docToReplace").removeClass('validelement');
        $("#ddlReplaceTemplate").addClass('validelement');
    }
});

function ReplaceTemplateChange(ddlDocumentTemplate) {
    if (ddlDocumentTemplate.value != "0") {
        var strContractID = getParameterByName("ContractID");
        if (strContractID != "0") {
            getContractData(strContractID, 'tblReplaceControls', $("#ddlReplaceTemplate").find('option:selected').text())
        }

    } else {
        $('#tblReplaceControls').empty();
    }
}

function ClearReplaceDocFrom() {
    $('#hdnDocumentID').val("");
    $("#docToReplace").replaceWith($("#docToReplace").val('').clone(true));
    $("#ddlReplaceTemplate").val("0");
    $('input[type="radio"][name="rad_Replace"][value="Computer"]').prop('checked', true);
    $("#trFileUploadBrowse").css('display', '');
    $("#trTemplateBrowse").css('display', 'none');
    $("#tblReplaceControls").css('display', 'none');
    $("#docToReplace").addClass('validelement');
    $("#ddlReplaceTemplate").removeClass('validelement');
    $("#tblReplaceControls").empty();
}

$("input:radio[name=IsFinalized]").click(function () {
    setDocumentUrl();
});

$("#lblFolderUrl").click(function () {
    CreateFolder();
    $("#treeviewFolder").dialog("option", "title", "Select Folder");
    $("#treeviewFolder").dialog("open");
});

$("#btnNewFolder").click(function () {
    if ($(this).text().trim() == "New Folder") {
        $("#txtNewFolderName").css('display', '');
        $(this).text('Cancel');
    } else if ($(this).text().trim() == "Cancel") {
        $("#txtNewFolderName").css('display', 'none');
        $(this).text('New Folder');
    }

});

function setDocumentUrl() {
    if ($("input:radio[name=IsFinalized]:checked").val() == "Yes") {
        if ($("#hdnFinalizedDocumentsUrl").text() != "") {
            $("#txtNewFolderName").val("");
            $("#txtNewFolderName").css('display', 'none');
            $("#lblFolderUrl").text($("#hdnFinalizedDocumentsUrl").text() + "/");
            $("#btnNewFolder").css('display', '');
        } else {
            $("#txtNewFolderName").css('display', '');
            $("#lblFolderUrl").text('/Finalized Documents/');
            $("#btnNewFolder").css('display', 'none');
            if ($("#ddlContracts").find('option:selected').val() != "0") {
                $("#txtNewFolderName").val($("#ddlContracts").find('option:selected').text());
            }
            $("#txtNewFolderName").val($("#lblContractTitle").text());
        }
        if (AllowSaveDraftInCloud == "on") {
            $("#trcopy").css('display', '');
            if (SaveDraftInCloud == "on") {
                $("#rad_CopyLibraryAndAzure").attr('checked', 'checked');
            }
            else {
                $("#rad_CopyLibrary").attr('checked', 'checked');
            }
        }
        else {
            $("#trcopy").css('display', 'none');
            $("#rad_CopyLibrary").attr('checked', 'checked');
        }
    } else {
        if ($("#hdnDraftDocumentsUrl").text() != "") {
            $("#txtNewFolderName").val("");
            $("#txtNewFolderName").css('display', 'none');
            $("#lblFolderUrl").text($("#hdnDraftDocumentsUrl").text() + "/");
            $("#btnNewFolder").css('display', '');
        } else {
            $("#txtNewFolderName").css('display', '');
            $("#lblFolderUrl").text('/Draft Documents/');
            $("#btnNewFolder").css('display', 'none');
            if ($("#ddlContracts").find('option:selected').val() != "0") {
                $("#txtNewFolderName").val($("#ddlContracts").find('option:selected').text());
            }
            $("#txtNewFolderName").val($("#lblContractTitle").text());
        }
        if (AllowSaveDraftInCloud == "on") {
            $("#trcopy").css('display', '');
            if (SaveDraftInCloud == "on") {
                $("#rad_CopyLibraryAndAzure").attr('checked', 'checked');
            }
            else {
                $("#rad_CopyLibrary").attr('checked', 'checked');
            }
        }
        else {
            $("#trcopy").css('display', 'none');
            $("#rad_CopyLibrary").attr('checked', 'checked');
        }
    }
}

function onchangetemplate(ddlDocumentTemplate) {
    $('#spInProgress').css('display', '');
    if (ddlDocumentTemplate.value != "0") {
        var strContractID = getParameterByName("ContractID");
        if (strContractID != "0") {
            getContractData(strContractID, 'tblContentControls', $("#ddlDocumentTemplate").find('option:selected').text())
        }

    } else {
        $('#tblContentControls').empty();
        $('#spInProgress').css('display', 'none');
    }
}

function getContractData(ContractID, tblCtrl, strDocumentTemplate) {
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

            if (strDocumentTemplate != null) {
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/template?templatename=' + strDocumentTemplate,
                    type: 'GET',
                    dataType: 'json',
                    'Content-Type': 'application/json',
                    cache: false,
                    async: false,
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    success: function (metadataFields) {
                        $("#" + tblCtrl).empty();
                        var vUserList = '';
                        $("#" + tblCtrl).append("<tr><td width='100%' colspan='2' valign='top'><div class='form_categoryhead'>Template Metadata</div></td></tr>");
                        var vTransactionTypeExist = '';
                        var vContractClassExist = '';
                        var datalenght = metadataFields.length;
                        for (var i = 0; i < datalenght; i++) {
                            var item = metadataFields[i];
                            if (item.FieldName == "ContractType") {
                            }
                            else if (item.FieldName == "TransactionType")
                            { vTransactionTypeExist = 'Yes'; }
                            else if (item.FieldName == "ContractClass")
                            { vContractClassExist = 'Yes'; }
                            else {
                                var vControls = '<tr>';
                                var vDate = "";
                                var vUser = "";
                                vControls += '<td class="f_head"><label>' + item.FieldDisplayName;

                                if (item.FieldHelp == "true") {
                                    vControls += "<img class='helpimg' src='../Content/Images/help_training.png' title='" + item.HelpText + "'></label>";
                                } else {
                                    vControls += '</label>';
                                }
                                vControls += '</td><td class="f_list">';

                                if (item.FieldType == "Single Line Text") {
                                    if ($(vMetadata).find(item.FieldName).text() != "") {
                                        vControls += "<input type='text' id=" + item.FieldName + " maxlength='100' name=" + item.FieldName + " value=" + $(vMetadata).find(item.FieldName).text() + " class='f_inpt width80' />";
                                    } else {
                                        vControls += "<input type='text' id=" + item.FieldName + " maxlength='100' name=" + item.FieldName + " class='f_inpt width80' />";
                                    }

                                }
                                else if (item.FieldType == "Multi Line Text") {
                                    if ($(vMetadata).find(item.FieldName).text() != "") {
                                        vControls += "<textarea name=" + item.FieldName + " id=" + item.FieldName + " cols='40' rows='5' class='f_inpt width80'>" + $(vMetadata).find(item.FieldName).text() + "</textarea>";
                                    } else {
                                        vControls += "<textarea name=" + item.FieldName + " id=" + item.FieldName + " cols='40' rows='5' class='f_inpt width80'></textarea>";
                                    }
                                }
                                else if (item.FieldType == "Date") {
                                    var vv = $(vMetadata).find(item.FieldName).text();
                                    var onlydate = "";
                                    if (vv != null) {
                                        onlydate = vv.substring(0, vv.length - 19);
                                    }

                                    vControls += "<input type='text' readonly id=" + item.FieldName + " name=" + item.FieldName + " value='" + onlydate + "' class='f_date width80 validdate'/>";

                                    vDate = item.FieldName;

                                }
                                else if (item.FieldType == "Choice") {
                                    vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width80'>";
                                    vControls += "<option value='0'>--Select--</option>";

                                    var myArray = [];
                                    myArray = item.ChoiceValues.split(';')
                                    var myArraylength = myArray.length;
                                    for (var i = 0; i < myArraylength; i = i + 1) {
                                        do {
                                            myArray[i] = myArray[i].replace("&amp;", "&");
                                        } while (myArray[i].indexOf("&amp;") > -1)
                                        if ($(vMetadata).find(item.FieldName).text() == myArray[i]) {
                                            vControls += "<option value=" + myArray[i] + " selected>" + myArray[i] + "</option>";
                                        } else {
                                            vControls += "<option value=" + myArray[i] + ">" + myArray[i] + "</option>";
                                        }
                                    }

                                    vControls += '</select>';
                                }
                                else if (item.FieldType == "User") {
                                    vControls += "<select id=" + item.FieldName + " multiple='multiple' class='f_inpt width76' name=" + item.FieldName + " title='" + item.FieldDisplayName + "' data-placeholder='--Select--'>"

                                    vControls += "<option value='0'>--Select--</option>";
                                    if (vUserList == '')
                                    { vUserList = GetUserList(); }
                                    vControls += vUserList;

                                    vControls += '</select>';

                                    vUser = item.FieldName;
                                } else if (item.FieldType == "Taxonomy") {

                                    if ($(vMetadata).find(item.FieldName).text() != "") {
                                        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width80' readonly='readonly' type='text' />";
                                    } else {
                                        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width80' readonly='readonly' type='text' />";
                                    }

                                    vControls += "<span class='right-float'><a href='javascript:void(0)' onclick='ViewBusinessArea()'> Browse</a></span>";

                                }
                                else if (item.FieldType == "Lookup") {

                                    if (item.FieldName == "Counterparty") {
                                        if ($(vMetadata).find(item.FieldName).text() == "Counterparty not in the list") {
                                            $("#chkCounterpartyNotInList").attr("checked", "checked");
                                            $("#tblCounterparties").attr('disabled', 'disabled');
                                        }
                                        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width80' readonly='readonly' type='text' />";

                                        vControls += "<span class='right-float'><a href='javascript:void(0)' onclick='ViewCounterparty()'> Browse</a></span>";
                                    } else if (item.FieldName == "CompanyProfile") {
                                        vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width80'>";
                                        vControls += "<option value='0'>--Select--</option>";

                                        vControls += getcompanyprofile($(vMetadata).find(item.FieldName).text()) + "</select>";
                                    }
                                    else if (item.FieldName == "ContractPricingType") {
                                        vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width80'>";
                                        vControls += "<option value='0'>--Select--</option>";
                                        getcontractpricingtype($(vMetadata).find(item.FieldName).text());
                                    }
                                    else if (item.FieldName == "BillingFrequency") {
                                        vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width80'>";
                                        vControls += "<option value='0'>--Select--</option>";
                                        getbillingfrequency($(vMetadata).find(item.FieldName).text());
                                    }
                                    else if (item.FieldName == "Status") {
                                        vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width80' readonly>";
                                        vControls += "<option value='0'>--Select--</option>";
                                        vControls += getStatus($(vMetadata).find(item.FieldName).text()) + "</select>";
                                    }
                                    else if (item.FieldName == "OriginatingParty") {
                                        vControls += "<input type='text' id=" + item.FieldName + " name=" + item.FieldName + " value='" + $(vMetadata).find(item.FieldName).text() + "' class='f_inpt width80' readonly='readonly' type='text' />";
                                        $("#txtOriginatingPartyType").val($(vMetadata).find("OriginatingPartyType").text());
                                        if ($(vMetadata).find("OriginatingPartyType").text() == "Counterparty") {
                                            SelectCounterparties();
                                        }
                                        vControls += "<span class='right-float'><a href='javascript:void(0)' onclick='ViewOriginatingParty()'> Browse</a></span>";
                                    }
                                    else if (item.FieldName == "ContractCurrency") {
                                        vControls += "<select id=" + item.FieldName + " name=" + item.FieldName + " class='f_inpt width80'>";
                                        vControls += "<option value='0'>--Select--</option>";
                                        vControls += getContractCurrency($(vMetadata).find(item.FieldName).text()) + "</select>";
                                    }

                                }
                                vControls += '</td></tr>';
                                $("#" + tblCtrl).append(vControls);
                                if (vDate != "") {
                                    $("#" + vDate + "").datepicker();
                                    vDate = "";
                                }
                                if (vUser != "") {
                                    $("#" + vUser + "").kendoMultiSelect().data("kendoMultiSelect");
                                    if ($(vMetadata).find(item.FieldName).text() != "") {
                                        var contractmanagers = $("#" + vUser).data("kendoMultiSelect");
                                        contractmanagers.value(getselectedusers($(vMetadata).find(item.FieldName).text()));
                                    }
                                    vUser = "";
                                }
                            }
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
                            $("#tblContentControls").empty();
                            $('#spInProgress').css('display', 'none');
                        }
                });
            }
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

function ViewBusinessArea() {
    $('#txtBARowkey').val("");
    $('#txtBAParent').val("");
    $('#txtBA').val("");
    $("#browseBA").dialog("option", "title", "Browse Business Area");
    $("#browseBA").dialog("open");
    $("#browseBA").height("auto");
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
    $("#tblCounterparties").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            $('#loadCP').empty();
            var arr = [];
            var counterpartyTags = [];
            $.each($('#Counterparty').val().split(";"), function () {
                arr.push($.trim(this));
            });
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                var article = "";
                if (i == 0) {
                    article += '<tr><th>Counterparty Name</th><th>Counterparty Type</th></tr>';
                }

                article += '<tr><td>';
                if (arr.indexOf(item.CounterpartyName) >= 0) {
                    article += '<input id="CP' + item.RowKey + '" type="checkbox" name="Counterparty" class="css1-checkbox" checked value="' + item.CounterpartyName + '" />';
                } else {
                    article += '<input id="CP' + item.RowKey + '" type="checkbox" name="Counterparty" class="css1-checkbox" value="' + item.CounterpartyName + '" />';
                }

                article += '<label for="CP' + item.RowKey + '" class="css1-label"  style="display: inline;">' + item.CounterpartyName + '</label>';
                article += '</td><td>' + item.CounterpartyType + '';
                article += '</td></tr>';
                counterpartyTags.push(item.CounterpartyName);
                $("#tblCounterparties").append(article);
            }

            $("#txtSearchBox").autocomplete({
                source: counterpartyTags,
                minLength: 2
            });

            var vCount = $("#tblCounterparties tr").length;
            $('#compact-paginationCounterparties').pagination({
                items: vCount,
                itemsOnPage: 10,
                typeID: 'tblCounterparties',
                cssStyle: 'compact-theme'
            });
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

function ViewCounterparty() {
    $('#loadCP').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    if ($('#tblCounterparties tr').length <= 0) {
        CounterpartyFunc();
    } else {
        $('#loadCP').empty();
    }
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
                    CounterpartyFunc();
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

                    CounterpartyFunc();
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

function getcompanyprofile() {
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
            $(data).each(function (i, item) {

                control += "<option value=" + item.LegalEntityName + ">" + item.LegalEntityName + "</option>";

                var article = '<li>';
                if ($('#OriginatingParty').val() == item.LegalEntityName) {
                    article += '<input id="OP' + item.RowKey + '" type="radio" name="OriginatingParty" class="css-checkbox" checked value="' + item.LegalEntityName + '" />';
                } else {
                    article += '<input id="OP' + item.RowKey + '" type="radio" name="OriginatingParty" class="css-checkbox" value="' + item.LegalEntityName + '" />';
                }
                article += '<label for="OP' + item.RowKey + '" class="css-label">' + item.LegalEntityName + '</label>';
                article += '</li>';
                $("#tblOPLegalEntities").append(article);
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

function getcontractpricingtype(obj) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contractpricingtype',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            $(data).each(function (i, item) {
                if (item.TypeName == obj) {
                    $("#ContractPricingType").append("<option value='" + item.TypeName + "' selected='selected'>" + item.TypeName + "</option>")
                }
                else {
                    $("#ContractPricingType").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                }
            });

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
            $(data).each(function (i, item) {
                if (item.TypeName == obj) {
                    $("#BillingFrequency").append("<option value='" + item.TypeName + "' selected='selected'>" + item.TypeName + "</option>")
                }
                else {
                    $("#BillingFrequency").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
                }
            });

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
            $(contractstatuses).each(function (i, item) {
                if (item.ContractStatus == obj) {
                    control += "<option value=" + encodeURI(item.ContractStatus) + " selected='selected'>" + item.ContractStatus + "</option>";
                }
                else {
                    control += "<option value=" + encodeURI(item.ContractStatus) + ">" + item.ContractStatus + "</option>";
                }
            });
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
            $(data).each(function (i, item) {
                if (item.Abbreviation == obj) {
                    control += "<option value=" + encodeURI(item.Abbreviation) + " selected='selected'>" + item.Abbreviation + "</option>";
                }
                else {
                    control += "<option value=" + encodeURI(item.Abbreviation) + ">" + item.Abbreviation + "</option>";
                }
            });
        }
    });
    return control;
}

function AddCounterparty() {
    if ($("#chkCounterpartyNotInList").is(':checked')) {
        $('#Counterparty').val("Counterparty not in the list");
        return true;
    } else {
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
            $('#Counterparty').val(vCoounterparty);
            return true;
        } else {
            swal("", "No Counterparty has been selected.");
            return false;
        }
    }
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
$("#settingRenewEvergreen").click(function () {
    $("#txtRenewableFor").attr('readonly', 'readonly');
});

$("#settingRenewableFor").click(function () {
    $("#txtRenewableFor").removeAttr('readonly');
});

//Script for Document End
//Script for Obligation Start
function obligationitems(item) {
    var vDueDate = '';
    if (item.DueDate != null) {
        vDueDate = '<span>' + item.DueDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1') + '</span>';
    }
    if (item.ObligationMet == "Yes" || item.ObligationMet == "yes") {
        $("#ulObligation").append('<li><label id="ObligationID" style="display:none;">' + item.RowKey
            + '</label><label id="ObligationTitle" style="display:none;">' + item.ObligationTitle
            + '</label><span class="milestone"><input type="checkbox" id=' + item.RowKey
            + ' name=chkValue onclick="checkObligation(this);" value=' + item.RowKey
            + ' checked><b>' + item.ObligationTitle + '</b><small>' + vDueDate + '</small><img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuObligation"/></span></li>');
    }
    else {
        $("#ulObligation").append('<li><label id="ObligationID" style="display:none;">' + item.RowKey
             + '</label><label id="ObligationTitle" style="display:none;">' + item.ObligationTitle
             + '</label><span class="milestone"><input type="checkbox" id=' + item.RowKey
             + ' name=chkValue onclick="checkObligation(this);" value=' + item.RowKey
             + ' ><b>' + item.ObligationTitle + '</b><small>' + vDueDate + '</small><img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuObligation"/></span></li>');
    }
}

function DelayedObligation(item) {
    if (item.ObligationMet != "Yes" && item.ObligationMet != "yes" && item.RemindLater != "N") {
        var DueDate = new Date(item.DueDate);
        var currentDate = new Date();
        var dateOne = new Date(DueDate.getFullYear(), DueDate.getMonth(), DueDate.getDate()); //Year, Month, Date
        var dateTwo = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()); //Year, Month, Date
        if (dateOne < dateTwo) {
            if ($("#dvObligationAlert").css('display') == 'none') {
                $("#dvObligationAlert").css('display', '');
                $("#dvObligationAlert").append('<span style="float:right"><a href="javascript:void(0)" onclick="CloseAlert(\'dvObligationAlert\');">X</a></span>');
            }
            var article = '<p id="p_' + item.RowKey + '">Obligation [' + item.ObligationTitle + '] for this contract is delayed and was due on ' + item.DueDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1') +
                '. <span class="right-float">[<a href="javascript:void(0)" onclick="ViewObligationDetail(\'' + item.RowKey
                + '\');">View Obligation</a>]</span> <span class="right-float Contribute">[<a href="javascript:void(0)" onclick="CompleteObligation(\'' + item.RowKey
                + '\');">Mark as Complete</a>][<a href="javascript:void(0)" onclick="RemindLaterObligation(\'p_' + item.RowKey
                + '\');">Remind Later</a>] [<a href="javascript:void(0)" onclick="DismissObligationAlert(\'' + item.RowKey
                + '\');">Dismiss</a>]</span></p>';

            $("#dvObligationAlert").append(article);
        }
    }
}

function RemindLaterObligation(ObligationID) {
    $('#dvObligationAlert #' + ObligationID).remove();
    if ($('#dvObligationAlert p').length == 0) {
        CloseAlert('dvObligationAlert');
        $('#dvObligationAlert').empty();
    }
}

function DismissObligationAlert(ObligationID) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations?obligationid=' + ObligationID + '&dismiss=N',
        type: 'PUT',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        cache: false,
        success: function (person) {
            $('#dvObligationAlert #p_' + ObligationID).remove();
            if ($('#dvObligationAlert p').length == 0) {
                CloseAlert('dvObligationAlert');
                $('#dvObligationAlert').empty();
            }
        }
    });
}

function showallobligations() {
    $('#trseeobli').html('<img src="../Content/Images/loading.gif">');
    $("#ulObligation").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations?contractid=' + getParameterByName('ContractID'),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (contactsJsonPayload) {
            var count = 0;
            $(contactsJsonPayload).each(function (i, item) {
                count++
                obligationitems(item);
            });
            $("#lblObligationsCount").text('(' + count + ')');
            if (!$("#lblObligationsCount").text().trim()) {
                $("#ulObligation").append('<li class="cont_Doc_Mess">No Obligation Available</li>');
            }
            $(".openmenuObligation").contextMenu({ menu: 'dropdownMenu', leftButton: true }, function (action, el, pos) { contextMenuObligation(action, el.parent("div").parent("td").parent("tr"), pos); });
            $('#trseeobli').empty();

            ApplyPermissionToMenu($("#hdnPermission").val());
        },
        error: function () {
            if (!$("#lblObligationsCount").text().trim()) {
                $("#ulObligation").append('<li class="cont_Doc_Mess">No Obligation Available</li>');
            }
        }

    });
}
$(document).ready(function () {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligationtypes',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (documenttypes) {
            $(documenttypes).each(function (i, item) {
                $("#ddlObligationType").append("<option value=" + item.TypeName + ">" + item.TypeName + "</option>")
            });
        }
    });
});

function BindObligations() {
    $("#ulObligation").empty();
    $("#dvObligationAlert").empty();
    $("#dvObligationAlert").css('display', 'none');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations?contractid=' + getParameterByName('ContractID'),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (contactsJsonPayload) {
            var count = 0;
            $(contactsJsonPayload).each(function (i, item) {
                count++;
                DelayedObligation(item);
                if (count <= 5) {
                    obligationitems(item);
                }
            });

            if (count > 5) {
                var more = count - 5;
                $("#ulObligation").append('<li id="trseeobli"><a href="javascript:void(0)" onclick="showallobligations();">' + more + ' More To See</a></li>');
            }

            $("#lblObligationsCount").text('(' + count + ')');
            if (!$("#lblObligationsCount").text().trim()) {
                $("#ulObligation").append('<li class="cont_Doc_Mess">No Obligation Available</li>');
            }
            $(".openmenuObligation").contextMenu({ menu: 'dropdownMenu', leftButton: true }, function (action, el, pos) { contextMenuObligation(action, el.parent("div").parent("td").parent("tr"), pos); });

            ApplyPermissionToMenu($("#hdnPermission").val());
        },
        error: function (request) {
            if (!$("#lblObligationsCount").text().trim()) {
                $("#ulObligation").append('<li class="cont_Doc_Mess">No Obligation Available</li>');
            }
            else {
                var arr = request.responseText.split(':');
                var str1 = arr[1];
                var str2 = "No obligations found";
                if (str1.indexOf(str2) != -1) {
                    $("#lblObligationsCount").text('');
                    $("#ulObligation").append('<li class="cont_Doc_Mess">No Obligation Available</li>');
                }
            }
        }

    });
}

function addObligation() {
    $("#obligationInline").slideToggle();
}
$('#btnAddObligationInline').click(function () {
    if (requiredValidator('obligationInline')) {
        var strContractID = getParameterByName('ContractID');
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations',
            type: 'POST',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
            data: {
                ContractID: strContractID,
                ContractTitle: $("#lblContractTitle").text(),
                ObligationTitle: $("#txtObligationTitleInline").val(),
                ObligationOwner: $("#licontractmanagers").text(),
                DueDate: $("#dtDueDateInline").val(),
                ObligationMet: 'No',
                CreatedBy: localStorage.UserName,
                ModifiedBy: localStorage.UserName

            },
            cache: false,
            success: function (person) {

                swal("", "Obligation Added");
                $("#obligationInline").slideToggle();
                $("#txtObligationTitleInline").val("");
                $("#dtDueDateInline").val("");
                BindObligations();

            }
        });
    }
});

function checkObligation(cb) {
    var ObligationID = cb.id
    var lfckv = cb.checked;
    if (lfckv) {
        $.ajax({
            async: false,
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations?obligationid=' + ObligationID + '&ismet=Yes',
            type: "PUT",
            dataType: "json",
            contentType: "application/json",
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
        }).done(function (data) {

            swal("", "Obligation is met");
            result = data;
            $('#dvObligationAlert #p_' + ObligationID).remove();
            if ($('#dvObligationAlert p').length == 0) {
                CloseAlert('dvObligationAlert');
                $('#dvObligationAlert').empty();
            }
        }).fail(function (data) {
            alert(data.status + ": " + data.statusText);
        });
    } else {
        $.ajax({
            async: false,
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations?obligationid=' + ObligationID + '&ismet=No',
            type: "PUT",
            dataType: "json",
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
            contentType: "application/json",
        }).done(function (data) {
            result = data;
            DelayedObligation(data);
        }).fail(function (data) {

            swal("", data.status + ": " + data.statusText);
        });
    }
}

function CompleteObligation(ObligationID) {
    $.ajax({
        async: false,
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations?obligationid=' + ObligationID + '&ismet=Yes',
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
    }).done(function (data) {

        swal("", "Obligation is met");
        result = data;
        $('#dvObligationAlert #p_' + ObligationID).remove();
        if ($('#dvObligationAlert p').length == 0) {
            CloseAlert('dvObligationAlert');
            $('#dvObligationAlert').empty();
        }
        BindObligations();
    }).fail(function (data) {

        swal("", data.status + ": " + data.statusText);
    });
}

$(document).ready(function () {
    $(".openmenuObligation").contextMenu({ menu: 'dropdownMenu', leftButton: true }, function (action, el, pos) { contextMenuObligation(action, el.parent("tr"), pos); });

    $("#addEditObligation").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Obligation",
        modal: true,
        buttons: {
            "Save": function () { if (modalOnOpenObligation()) { } },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
});

$('#btnAddObligation').click(function () {
    $("#txtObligationID").val("");
    $("#txtObligationTitle").val("");
    $('#ddlObligationType').val("0");
    $("#txtObligationDesc").val("");
    $("#dtDueDate").val("");

    $("#lblCTitleObli").text($("#lblContractTitle").text());
    $(".validelement").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });
    var vObligationOwner = $("#ddlObligationOwner").data("kendoMultiSelect");
    vObligationOwner.value(getselectedusers($("#licontractmanagers").text()));


    $('#obligationInline').slideToggle();


    $("#addEditObligation").dialog("option", "title", "New Obligation");
    $("#addEditObligation").dialog("open");
});

function contextMenuObligation(action, el, pos) {

    switch (action) {
        case "view":
            {
                var obligationID = $(el).find("#ObligationID").text();
                ViewObligationDetail(obligationID);
                break;
            }
        case "delete":
            {
                var termTitle = $(el).find("#ObligationTitle").text();
                swal({
                    title: '',
                    text: "Are you sure you want to <span style=\"font-weight:700\">delete '" + termTitle + "'</span>?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
   function (confirmed) {
       if (confirmed) {
           var obligationID = $(el).find("#ObligationID").text();
           $.ajax({
               url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations?obligationid=' + obligationID,
               type: 'DELETE',
               dataType: 'json',
               headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
               "Content-Type": "application/json",
               cache: false,
               success: function (data) {

                   swal("", "Obligation Deleted");
                   BindObligations();
               }
           });
       }
       return;
   });

                break;
            }
        case "edit":
            {
                var obligationID = $(el).find("#ObligationID").text();
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations?obligationid=' + obligationID,
                    type: 'GET',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    "Content-Type": "application/json",
                    cache: false,
                    success: function (obligationentity) {
                        duedate = obligationentity.DueDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                        $("#txtObligationID").val(obligationentity.RowKey);
                        $("#txtObligationTitle").val(obligationentity.ObligationTitle);
                        $("#ddlObligationType option").filter(function (index) { return $(this).text() === obligationentity.ObligationType; }).prop('selected', true);
                        $("#txtObligationDesc").val(obligationentity.Description);
                        var vObligationOwner = $("#ddlObligationOwner").data("kendoMultiSelect");
                        vObligationOwner.value(getselectedusers(obligationentity.ObligationOwner));
                        $("#dtDueDate").val(duedate);
                        $('input[type="radio"][name="ObligationMet"][value="' + obligationentity.ObligationMet + '"]').prop('checked', true);
                    }
                });

                $("#lblCTitleObli").text($("#lblContractTitle").text());
                $(".validelement").each(function (index, element) {
                    $(element).removeClass("error");
                    $("#errormsg_" + element.id).remove();
                });
                $("#addEditObligation").dialog("option", "title", "Edit Obligation");
                $("#addEditObligation").dialog("open");
                break;
            }
    }
}

function ViewObligationDetail(obligationID) {
    $("#tblMetadataDetail").empty();
    $('#tblMetadataDetail').append('<tr><td><img src="../Content/Images/icon/loading.gif"/></td></tr>');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations?obligationid=' + obligationID,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (obligationentity) {
            var vOblDueDate = obligationentity.DueDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
            var vMetadata = '<tr>';
            vMetadata += '<td class="text_label width40">Obligation Title</td>';
            vMetadata += '<td class="text width60">' + obligationentity.ObligationTitle + '</td>';
            vMetadata += '</tr>';
            vMetadata += '<tr>';
            vMetadata += '<td class="text_label width40">Obligation Type</td>';
            vMetadata += '<td class="text width60">' + obligationentity.ObligationType + '</td>';
            vMetadata += '</tr>';
            vMetadata += '<tr>';
            vMetadata += '<td class="text_label width40">Description</td>';
            vMetadata += '<td class="text width60">' + obligationentity.Description + '</td>';
            vMetadata += '</tr>';
            vMetadata += '<tr>';
            vMetadata += '<td class="text_label width40">Obligation Owner</td>';
            vMetadata += '<td class="text width60">' + obligationentity.ObligationOwner + '</td>';
            vMetadata += '</tr>';
            vMetadata += '<tr>';
            vMetadata += '<td class="text_label width40">Due Date</td>';
            vMetadata += '<td class="text width60">' + vOblDueDate + '</td>';
            vMetadata += '</tr>';
            vMetadata += '<tr>';
            vMetadata += '<td class="text_label width40">Obligation Met</td>';
            vMetadata += '<td class="text width60">' + obligationentity.ObligationMet + '</td>';
            vMetadata += '</tr>';
            $("#tblMetadataDetail").empty();
            $("#tblMetadataDetail").append(vMetadata);
            setBlankValueToHyphen("tblMetadataDetail");
            $("#viewMetadataDetail").dialog("option", "title", "View Obligation");
            $("#viewMetadataDetail").dialog("open");
        }
    });
}

function modalOnOpenObligation(dialog) {
    $('.ui-button-green-text').parent().attr('disabled', 'disabled');
    var isformvalid = false;
    if (requiredValidator('addNewObligation')) {
        isformvalid = true;
        var strContractID = getParameterByName('ContractID');
        var ObligationID = $("#txtObligationID").val();
        var arrObligationOwner = $("#ddlObligationOwner").data("kendoMultiSelect").value();
        var vObligationOwner = '';
        $(arrObligationOwner).each(function (i, item) {
            if (vObligationOwner == '') {
                vObligationOwner = item;
            }
            else {
                vObligationOwner += "; " + item;
            }
        });

        if ($("#txtObligationTitle").val() == "") {
            $('.ui-button-green-text').parent().removeAttr('disabled');

            swal("", "Enter Obligation Title.");
        } else if (ObligationID != "") {
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations?obligationid=' + ObligationID,
                type: 'PUT',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                data: {
                    RowKey: ObligationID,
                    ContractID: getParameterByName('ContractID'),
                    ContractTitle: $("#lblCTitleObli").text(),
                    ObligationTitle: $("#txtObligationTitle").val(),
                    ObligationType: $("#ddlObligationType").find('option:selected').text(),
                    Description: $("#txtObligationDesc").val(),
                    ObligationOwner: vObligationOwner,
                    DueDate: $("#dtDueDate").val(),
                    ObligationMet: $('input[type="radio"][name=ObligationMet]:checked').val(),
                    ModifiedBy: localStorage.UserName
                },
                cache: false,
                success: function (person) {
                    $('.ui-button-green-text').parent().removeAttr('disabled');
                    swal("", "Obligation Updated");
                    $("#addEditObligation").dialog("close");
                    BindObligations();
                }
            });
        }
        else {
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations',
                type: 'POST',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                data: {
                    RowKey: $("#txtObligationID").val(),
                    ContractID: getParameterByName('ContractID'),
                    ContractTitle: $("#lblCTitleObli").text(),
                    ObligationTitle: $("#txtObligationTitle").val(),
                    ObligationType: $("#ddlObligationType").find('option:selected').text(),
                    Description: $("#txtObligationDesc").val(),
                    ObligationOwner: vObligationOwner,
                    DueDate: $("#dtDueDate").val(),
                    ObligationMet: $('input[type="radio"][name=ObligationMet]:checked').val(),
                    CreatedBy: localStorage.UserName,
                    ModifiedBy: localStorage.UserName

                },
                cache: false,
                success: function (person) {
                    $('.ui-button-green-text').parent().removeAttr('disabled');
                    swal("", "Obligation Created");
                    $("#addEditObligation").dialog("close");
                    $("#obligationInline").slideToggle();
                    BindObligations();
                }
            });
        }
    }
    else {
        $('.ui-button-green-text').parent().removeAttr('disabled');
    }
    return isformvalid;
}
//Script for Obligation End
//Script for Milestone Start
function milestoneitems(item) {
    var vMilestoneDate = '';
    if (item.MilestoneDate != null) {
        vMilestoneDate = '<span>' + item.MilestoneDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1') + '</span>';
    }
    if (item.MilestoneCompleted == "Yes" || item.MilestoneCompleted == "yes") {
        $("#ulMilestoneBody").append('<li><label id="MilestoneID" style="display:none;">' + item.RowKey
            + '</label><label id="MilestoneTitle" style="display:none;">' + item.MilestoneTitle
            + '</label><span class="milestone"><input type="checkbox" id=' + item.RowKey
            + ' name=chkValue onclick="checkMilestone(this);" value=' + item.RowKey
            + ' checked><b>' + item.MilestoneTitle + '</b><small>' + vMilestoneDate + '</small><img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuMilestone"/></span></li>');
    } else {
        $("#ulMilestoneBody").append('<li><label id="MilestoneID" style="display:none;">' + item.RowKey
          + '</label><label id="MilestoneTitle" style="display:none;">' + item.MilestoneTitle
          + '</label><span class="milestone"><input type="checkbox" id=' + item.RowKey
          + ' name=chkValue onclick="checkMilestone(this);" value=' + item.RowKey
          + ' ><b>' + item.MilestoneTitle + '</b><small>' + vMilestoneDate + '</small><img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuMilestone"/></span></li>');
    }
}
//Script for PriceBreakdown Start
function pricebreakdownitems(item) {
    var vPriceBreakdownDate = '';
    if (item.TransactionDueDate != null) {
        vPriceBreakdownDate = '<span>' + item.TransactionDueDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1') + '</span>';
    }
    if (item.TransactionComplete == "Yes" || item.TransactionComplete == "yes") {
        $("#tblPriceBreakdowns").append('<tr><td id="PriceBreakdownID" style="display:none;">' + item.RowKey
            + '</td><td id="PriceBreakdownItemName" style="display:none;">' + item.ItemName
            + '</td><td><div class="content_bottom f_list"><label class="che"><input class="css1-checkbox" type="checkbox" id=' + item.RowKey
            + ' name=chkValue onclick="checkPriceBreakdown(this);" class="css1-checkbox" value=' + item.RowKey
            + ' checked><label for="' + item.RowKey + '" class="css1-label contract_detail_chkbox"></label></label><p>' + item.ItemName
            + '</p>' + vPriceBreakdownDate + '<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuPriceBreakdown"/></div></td></tr>');

    } else {
        $("#tblPriceBreakdowns").append('<tr><td id="PriceBreakdownID" style="display:none;">' + item.RowKey
            + '</td><td id="PriceBreakdownItemName" style="display:none;">' + item.ItemName
            + '</td><td><div class="content_bottom f_list"><label class="che"><input class="css1-checkbox" type="checkbox" id=' + item.RowKey
            + ' name=chkValue onclick="checkPriceBreakdown(this);" class="css1-checkbox" value=' + item.RowKey
            + ' ><label for="' + item.RowKey + '" class="css1-label contract_detail_chkbox"></label></label><p>' + item.ItemName
            + '</p>' + vPriceBreakdownDate + '<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuPriceBreakdown"/></div></td></tr>');

    }
}
function pricebreakdowntransactionitems(item) {
    var vPriceBreakdownDate = '';
    if (item.TransactionDueDate != null) {
        vPriceBreakdownDate = '<span>' + item.TransactionDueDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1') + '</span>';
    }
    var vPriceBreakdownCompleteDate = '';
    if (item.TransactionCompletedDate != null) {
        vPriceBreakdownCompleteDate = '<span>' + item.TransactionCompletedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1') + '</span>';
    }

    $("#PriceBreakDownList").append(
        '<tr>'
        + '<td id="PriceBreakdownID" style="display:none;">'
        + item.RowKey
        + '</td>'
        + '<td>'
        + item.ItemName
        + ' <img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="marginbottom-3px openmenuPriceBreakdown"/>'
        + '</td>'
        + '<td>'
        + item.Units
        + '</td>'
        + '<td>'
        + item.NumbersOfUnit
        + '</td>'
        + '<td>'
        + item.UnitPrice
        + '</td>'
        + '<td>'
        + item.Currency
        + '</td>'
        + '<td>'
        + item.TotalCost
        + '</td>'
        + '</tr>'
    );
}

function DelayedMilestone(item) {
    if (item.MilestoneCompleted != "Yes" && item.MilestoneCompleted != "yes" && item.RemindLater != "N") {
        var MilestoneDate = new Date(item.MilestoneDate);
        var currentDate = new Date();
        var dateOne = new Date(MilestoneDate.getFullYear(), MilestoneDate.getMonth(), MilestoneDate.getDate()); //Year, Month, Date
        var dateTwo = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()); //Year, Month, Date
        if (dateOne < dateTwo) {
            if ($("#dvMilestoneAlert").css('display') == 'none') {
                $("#dvMilestoneAlert").css('display', '');
                $("#dvMilestoneAlert").append('<span style="float:right"><a href="javascript:void(0)" onclick="CloseAlert(\'dvMilestoneAlert\');">X</a></span>');

            }
            var article = '<p id="p_' + item.RowKey + '">Milestone [' + item.MilestoneTitle + '] for this contract is delayed and was due on ' +
                item.MilestoneDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1') + '. <span class="right-float"> [<a href="javascript:void(0)" onclick="ViewMilestineDetail(\'' + item.RowKey
                + '\');">View Milestone</a>]</span> <span class="right-float Contribute"> [<a href="javascript:void(0)" onclick="CompleteMilestone(\'' + item.RowKey
                + '\');">Mark as Complete</a>] [<a href="javascript:void(0)" onclick="RemindLaterMilestone(\'p_' + item.RowKey
                + '\');">Remind Later</a>] [<a href="javascript:void(0)" onclick="DismissMilestoneAlert(\'' + item.RowKey + '\');">Dismiss</a>]</span></p>';
            $("#dvMilestoneAlert").append(article);
        }
    }
}

function RemindLaterMilestone(MilestoneID) {
    $('#dvMilestoneAlert #' + MilestoneID).remove();
    if ($('#dvMilestoneAlert p').length == 0) {
        CloseAlert('dvMilestoneAlert');
        $('#dvMilestoneAlert').empty();
    }
}

function DismissMilestoneAlert(MilestoneID) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones?milestoneid=' + MilestoneID + '&dismiss=N',
        type: 'PUT',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        cache: false,
        success: function (person) {
            $('#dvMilestoneAlert #p_' + MilestoneID).remove();
            if ($('#dvMilestoneAlert p').length == 0) {
                CloseAlert('dvMilestoneAlert');
                $('#dvMilestoneAlert').empty();
            }
        }
    });
}

function showallmilestone() {
    $('#trseemile').html('<img src="../Content/Images/loading.gif">');
    $("#ulMilestoneBody").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones?contractid=' + getParameterByName('ContractID'),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (contactsJsonPayload) {
            var count = 0;
            $(contactsJsonPayload).each(function (i, item) {
                count++;
                milestoneitems(item);
            });
            $(".openmenuMilestone").contextMenu({ menu: 'dropdownMenu', leftButton: true }, function (action, el, pos) { contextMenuMilestone(action, el.parent("span").parent("li"), pos); });
            $('#trseemile').css('display', 'none');
            ApplyPermissionToMenu($("#hdnPermission").val());
        },
        error: function () {
            if (!$("#lblMilestonesCount").text().trim()) {
                $("#ulMilestoneBody").append('<li class="cont_Doc_Mess">No Milestone Available</li>');
            }
        }
    });
}

function showallpricebreakdown() {
    $('#trseeprice').html('<img src="../Content/Images/loading.gif">');
    $("#tblPriceBreakdowns").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/pricebreakdown?contractid=' + getParameterByName('ContractID'),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (contactsJsonPayload) {
            var count = 0;
            $(contactsJsonPayload).each(function (i, item) {
                count++
                pricebreakdownitems(item);

            });
            $(".openmenuPriceBreakdown").contextMenu({ menu: 'dropdownMenu', leftButton: true }, function (action, el, pos) { contextMenuPriceBreakdown(action, el.parent("td").parent("tr"), pos); });
            $('#trseeprice').css('display', 'none');

        },
        error: function () {
            if (!$("#lblPriceBreakdownCount").text().trim()) {
                $("#tblPriceBreakdowns").append('<tr><td class="f_p-error det_metadata_notavailble">No Price Breakdown Available</td></tr>');
            }
        }
    });
}

$(document).ready(function () {

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestonetypes',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (documenttypes) {
            $(documenttypes).each(function (i, item) {
                $("#ddlMilestoneType").append("<option value=" + item.TypeName + ">" + item.TypeName + "</option>")
            });
        }
    });
});

function CompleteMilestone(MilestoneID) {
    $.ajax({
        async: false,
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones?milestoneid=' + MilestoneID + '&acheived=Yes',
        type: "PUT",
        dataType: "json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
        "Content-Type": "application/json",
    }).done(function (data) {

        swal("", "Milestone Acheived");
        result = data;
        $('#dvMilestoneAlert #p_' + MilestoneID).remove();
        if ($('#dvMilestoneAlert p').length == 0) {
            CloseAlert('dvMilestoneAlert');
            $('#dvMilestoneAlert').empty();
        }
        BindMilestone();
    }).fail(function (data) {

        swal("", data.status + ": " + data.statusText);
    });
}

function BindPriceBreakdown() {
    $("#tblPriceBreakdowns").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/pricebreakdown?contractid=' + getParameterByName('ContractID'),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (contactsJsonPayload) {
            var count = 0;
            $(contactsJsonPayload).each(function (i, item) {
                count++;

                pricebreakdownitems(item);

            });

            $("#lblPriceBreakdownCount").text('(' + count + ')');
            if (count == 0) {
                $("#tblPriceBreakdowns").append('<tr><td class="f_p-error det_metadata_notavailble">No Price Breakdown Available</td></tr>');
            }
            else {
                $(".openmenuPriceBreakdown").contextMenu({ menu: 'dropdownMenu', leftButton: true }, function (action, el, pos) { contextMenuPriceBreakdown(action, el.parent("td").parent("tr"), pos); });

            }
        },
        error: function (request) {
            if (!$("#lblPriceBreakdownCount").text().trim()) {
                $("#tblPriceBreakdowns").append('<tr><td class="f_p-error det_metadata_notavailble">No Price Breakdown Available</td></tr>');
            } else {
                var arr = request.responseText.split(':');
                var str1 = arr[1];
                var str2 = "Price Breakdown not found";
                if (str1.indexOf(str2) != -1) {
                    $("#lblPriceBreakdownCount").text('');
                    $("#tblPriceBreakdowns").append('<tr><td class="f_p-error det_metadata_notavailble">No Price Breakdown Available</td></tr>');
                }
            }
        }
    });
}

function BindPriceBreakdownTransaction() {
    $("#PriceBreakDownList").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/pricebreakdown?contractid=' + getParameterByName('ContractID'),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (contactsJsonPayload) {
            var count = 0;
            $(contactsJsonPayload).each(function (i, item) {
                count++;
                pricebreakdowntransactionitems(item);

            });
            $("#lblPriceBreakdownTransactionCount").text('(' + count + ')');
            if (count == 0) {
                $("#PriceBreakDownList").append('<tr><td class="f_p-error det_metadata_notavailble" colspan="10">There are no items to show in this view of the "Contract Price Breakdown" list.</td></tr>');
            }
            else {
                $(".openmenuPriceBreakdown").contextMenu({ menu: 'dropdownMenu', leftButton: true }, function (action, el, pos) { contextMenuPriceBreakdown(action, el.parent("td").parent("tr"), pos); });
            }
        },
        error: function (request) {
            if (!$("#lblPriceBreakdownTransactionCount").text().trim()) {
                $("#PriceBreakDownList").append('<tr><td class="f_p-error det_metadata_notavailble">There are no items to show in this view of the "Contract Price Breakdown" list.</td></tr>');
            } else {
                var arr = request.responseText.split(':');
                var str1 = arr[1];
                var str2 = "Price Breakdown not found";
                if (str1.indexOf(str2) != -1) {
                    $("#lblPriceBreakdownTransactionCount").text('');
                    $("#PriceBreakDownList").append('<tr><td class="f_p-error det_metadata_notavailble">There are no items to show in this view of the "Contract Price Breakdown" list.</td></tr>');
                }
            }
        }
    });
}



function BindMilestone() {
    $("#ulMilestoneBody").empty();
    $("#dvMilestoneAlert").empty();
    $("#dvMilestoneAlert").css('display', 'none');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones?contractid=' + getParameterByName('ContractID'),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (contactsJsonPayload) {
            var count = 0;
            $(contactsJsonPayload).each(function (i, item) {
                count++;
                DelayedMilestone(item);
                if (count <= 5) {
                    milestoneitems(item);
                }
            });
            if (count >= 5) {
                var more = count - 5;
                $("#ulMilestoneBody").append('<li id="trseemile"><a href="javascript:void(0)" onclick="showallmilestone();">' + more + ' More To See</a></li>');
            }

            $("#lblMilestonesCount").text('(' + count + ')');
            if (count == 0) {
                $("#ulMilestoneBody").append('<li class="cont_Doc_Mess">No Milestone Available</li>');
            }
            else {
                $(".openmenuMilestone").contextMenu({ menu: 'dropdownMenu', leftButton: true }, function (action, el, pos) { contextMenuMilestone(action, el.parent("span").parent("li"), pos); });
                ApplyPermissionToMenu($("#hdnPermission").val());
            }
        },
        error: function (request) {
            if (!$("#lblMilestonesCount").text().trim()) {
                $("#ulMilestoneBody").append('<li class="cont_Doc_Mess">No Milestone Available</li>');
            } else {
                var arr = request.responseText.split(':');
                var str1 = arr[1];
                var str2 = "Milestones not found";
                if (str1.indexOf(str2) != -1) {
                    $("#lblMilestonesCount").text('');
                    $("#ulMilestoneBody").append('<li class="cont_Doc_Mess">No Milestone Available</li>');
                }
            }
        }
    });
}

function addMilestone() {
    $('#milestoneInline').slideToggle();

}
$('#btnAddMilestoneInline').click(function () {
    if (requiredValidator('milestoneInline')) {
        var strContractID = getParameterByName('ContractID');
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones',
            type: 'POST',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
            data: {
                ContractID: getParameterByName('ContractID'),
                ContractTitle: $("#lblContractTitle").text(),
                MilestoneTitle: $("#txtMilestoneTitleInline").val(),
                MilestoneDate: $("#dtMilestoneDateInline").val(),
                MilestoneOwner: $("#licontractmanagers").text(),
                MilestoneCompleted: 'No',
                CreatedBy: localStorage.UserName,
                ModifiedBy: localStorage.UserName,
            },
            cache: false,
            success: function (person) {
                swal("", "Milestone Added");
                $("#milestoneInline").toggle();
                $("#txtMilestoneTitleInline").val("");
                $("#dtMilestoneDateInline").val("");
                BindMilestone();
            }
        });
    }
});
function checkMilestone(cb) {
    var MilestoneID = cb.id
    var lfckv = cb.checked;
    if (lfckv) {
        $.ajax({
            async: false,
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones?milestoneid=' + MilestoneID + '&acheived=Yes',
            type: "PUT",
            dataType: "json",
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
            "Content-Type": "application/json",
        }).done(function (data) {

            swal("", "Milestone Acheived");
            result = data;
            $('#dvMilestoneAlert #p_' + MilestoneID).remove();
            if ($('#dvMilestoneAlert p').length == 0) {
                CloseAlert('dvMilestoneAlert');
                $('#dvMilestoneAlert').empty();
            }
        }).fail(function (data) {

            swal("", data.status + ": " + data.statusText);
        });
    } else {
        $.ajax({
            async: false,
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones?milestoneid=' + MilestoneID + '&acheived=No',
            type: "PUT",
            dataType: "json",
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
            "Content-Type": "application/json",
        }).done(function (data) {
            result = data;
            DelayedMilestone(data);
        }).fail(function (data) {

            swal("", data.status + ": " + data.statusText);
        });
    }
}
function checkPriceBreakdown(cb) {
    var PriceBreakdownID = cb.id
    var lfckv = cb.checked;
    if (lfckv) {
        $.ajax({
            async: false,
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/pricebreakdown?priceBreakDownid=' + PriceBreakdownID + '&acheived=Yes',
            type: "PUT",
            dataType: "json",
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
            "Content-Type": "application/json",
        }).done(function (data) {

            swal("", "Price Breakdown Completed");
            result = data;

        }).fail(function (data) {

            swal("", data.status + ": " + data.statusText);
        });
    } else {
        $.ajax({
            async: false,
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/pricebreakdown?priceBreakDownid=' + PriceBreakdownID + '&acheived=No',
            type: "PUT",
            dataType: "json",
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
            "Content-Type": "application/json",
        }).done(function (data) {
            result = data;

        }).fail(function (data) {

            swal("", data.status + ": " + data.statusText);
        });
    }
}

$(document).ready(function () {
    $(".openmenuMilestone").contextMenu({ menu: 'dropdownMenu', leftButton: true }, function (action, el, pos) { contextMenuMilestone(action, el.parent("span").parent("li"), pos); });
    $(".openmenuPriceBreakdown").contextMenu({ menu: 'dropdownMenu', leftButton: true }, function (action, el, pos) { contextMenuPriceBreakdown(action, el.parent("tr"), pos); });
    $("#addEditMilestone").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Milestone",
        modal: true,
        buttons: {
            "Save": function () { if (modalOnOpenMilestone()) { } },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
    $("#popupPriceBreakDown").dialog({
        autoOpen: false, closeText: "",
        width: "70%",
        title: "Manage Contract Price Breakdown",
        modal: true,
        buttons: {
            "Save": function () { if (modalOnOpenPriceBreakdown()) { } },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
    allowOnlyNumberInInputBox("txtReminder1");
    allowOnlyNumberInInputBox("txtReminder2");
    allowOnlyNumberInInputBox("txtReminder3");
});

$('#btnAddMilestone').click(function () {
    $("#txtMilestoneID").val("");
    $("#txtMilestoneTitle").val("");
    $('#ddlMilestoneType').val("0");
    $('#ddlSendReminderTo').val("0");
    $("#txtReminder1").val("");
    $("#txtReminder2").val("");
    $("#txtReminder3").val("");

    $("#lblCTitle").text($("#lblContractTitle").text());
    $(".validelement").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });
    var vMilestoneOwner = $("#ddlMilestoneOwner").data("kendoMultiSelect");
    vMilestoneOwner.value(getselectedusers($("#licontractmanagers").text()));


    $('#milestoneInline').slideToggle();


    $("#addEditMilestone").dialog("option", "title", "New Milestone");
    $("#addEditMilestone").dialog("open");
});
$('#btnAddPriceBreakdowns').click(function () {
    $("#txtPriceBreakDownID").val("");
    $("#txtPriceBreakDownItemName").val("");
    $("#txtPriceBreakDownDescription").val("");
    $('#ddlPriceBreakDownUnits').val("0");
    $("#txtPriceBreakDownNumberOfUnits").val("0");
    $("#txtPriceBreakDownUnitPrice").val("0");
    $("#ddlPriceBreakDownCurrencypopup").val("0");
    $("#txtPriceBreakDownTotalCost").val("0");
    $("#dtTransactionDueDate").val("");
    $("#dtTransactionCompletedDate").val("");
    $("#chkTransactionComplete").attr("checked", false);
    BindPriceBreakDownCurrency();

    $("#popupPriceBreakDown").dialog("option", "title", "Manage Contract Price Breakdown");
    $("#popupPriceBreakDown").dialog("open");
});
function BindPriceBreakDownCurrency() {
    $("#ddlPriceBreakDownCurrencypopup").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/currencies',
        type: 'GET',
        dataType: 'json',
        async: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            if ($("#hdnPriceBreakDownCurrency").text() != '') {
                $(data).each(function (i, item) {
                    if ($("#hdnPriceBreakDownCurrency").text() == item.Abbreviation) {
                        $("#ddlPriceBreakDownCurrencypopup").append("<option value=" + encodeURI(item.Abbreviation) + " selected>" + item.Abbreviation + "</option>");
                    } else {
                        $("#ddlPriceBreakDownCurrencypopup").append("<option value=" + encodeURI(item.Abbreviation) + ">" + item.Abbreviation + "</option>");
                    }
                });
            }
            else {
                $(data).each(function (i, item) {
                    if (item.BaseCurrency == "Yes") {
                        $("#ddlPriceBreakDownCurrencypopup").append("<option selected='selected' value=" + encodeURI(item.Abbreviation) + ">" + item.Abbreviation + "</option>");
                    } else {
                        $("#ddlPriceBreakDownCurrencypopup").append("<option value=" + encodeURI(item.Abbreviation) + ">" + item.Abbreviation + "</option>");
                    }
                });
            }
        }
    });

}

function contextMenuPriceBreakdown(action, el, pos) {

    switch (action) {
        case "view":
            {
                var priceBreakdownID = $(el).find("#PriceBreakdownID").text();
                $("#tblMetadataDetail").empty();
                $('#tblMetadataDetail').append('<tr><td><img src="../Content/Images/icon/loading.gif"/></td></tr>');
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/pricebreakdown?priceBreakDownid=' + priceBreakdownID,
                    type: 'GET',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    "Content-Type": "application/json",
                    cache: false,
                    success: function (priceBreakdownentity) {


                        var vMetadata = '<tr>';
                        vMetadata += '<td class="text_label width40">Item Name</td>';
                        vMetadata += '<td class="text width60">' + priceBreakdownentity.ItemName + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Item Description</td>';
                        vMetadata += '<td class="text width60">' + priceBreakdownentity.ItemDescription + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Units</td>';
                        vMetadata += '<td class="text width60">' + priceBreakdownentity.Units + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Numbers Of Unit</td>';
                        vMetadata += '<td class="text width60">' + priceBreakdownentity.NumbersOfUnit + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Unit Price</td>';
                        vMetadata += '<td class="text width60">' + priceBreakdownentity.UnitPrice + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Currency</td>';
                        vMetadata += '<td class="text width60">' + priceBreakdownentity.Currency + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">TotalCost</td>';
                        vMetadata += '<td class="text width60">' + priceBreakdownentity.TotalCost + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Transaction Due Date</td>';
                        if (priceBreakdownentity.TransactionDueDate != null && priceBreakdownentity.TransactionDueDate != '') {
                            var vDueDate = priceBreakdownentity.TransactionDueDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                            vMetadata += '<td class="text width60">' + vDueDate + '</td>';
                        }
                        else {
                            vMetadata += '<td class="text width60"></td>';
                        }
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">TransactionCompletedDate</td>';
                        if (priceBreakdownentity.TransactionCompletedDate != null && priceBreakdownentity.TransactionCompletedDate != '') {
                            var vCompletedDate = priceBreakdownentity.TransactionCompletedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                            vMetadata += '<td class="text width60">' + vCompletedDate + '</td>';
                        }
                        else {
                            vMetadata += '<td class="text width60"></td>';
                        }
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Transaction Complete</td>';
                        vMetadata += '<td class="text width60">' + priceBreakdownentity.TransactionComplete + '</td>';
                        vMetadata += '</tr>';


                        $("#tblMetadataDetail").empty();
                        $("#tblMetadataDetail").append(vMetadata);
                        setBlankValueToHyphen("tblMetadataDetail");
                        $("#viewMetadataDetail").dialog("option", "title", "View Price Breakdown");
                        $("#viewMetadataDetail").dialog("open");
                    }
                });

                break;
            }
        case "delete":
            {
                var priceBreakdownItemName = $(el).find("#PriceBreakdownItemName").text();
                swal({
                    title: '',
                    text: "Are you sure you want to <span style=\"font-weight:700\">delete '" + priceBreakdownItemName + "'</span>?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
   function (confirmed) {
       if (confirmed) {
           var priceBreakdownID = $(el).find("#PriceBreakdownID").text();
           $.ajax({
               url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/pricebreakdown?priceBreakDownid=' + priceBreakdownID,
               type: 'DELETE',
               dataType: 'json',
               headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
               "Content-Type": "application/json",
               cache: false,
               success: function (data) {

                   swal("", "Price Breakdown Deleted");
                   BindPriceBreakdown();

               }
           });
       }
       return;
   });

                break;
            }
        case "edit":
            {
                BindPriceBreakDownCurrency();
                var priceBreakdownID = $(el).find("#PriceBreakdownID").text();

                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/pricebreakdown?priceBreakDownid=' + priceBreakdownID,
                    type: 'GET',
                    async: false,
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    "Content-Type": "application/json",
                    cache: false,
                    success: function (priceBreakdownentity) {
                        var duedate = "";
                        if (priceBreakdownentity.TransactionDueDate != null && priceBreakdownentity.TransactionDueDate != '') {
                            duedate = priceBreakdownentity.TransactionDueDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                        }
                        var completedate = "";
                        if (priceBreakdownentity.TransactionCompletedDate != null && priceBreakdownentity.TransactionCompletedDate != '') {
                            completedate = priceBreakdownentity.TransactionCompletedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                        }

                        $("#txtPriceBreakDownID").val(priceBreakdownentity.RowKey);
                        $("#txtPriceBreakDownItemName").val(priceBreakdownentity.ItemName);
                        $("#txtPriceBreakDownDescription").val(priceBreakdownentity.ItemDescription);
                        if (priceBreakdownentity.Units != '') {
                            $("#ddlPriceBreakDownUnits option").filter(function (index) { return $(this).text() === priceBreakdownentity.Units; }).prop('selected', true);
                        }
                        else {
                            $("#ddlPriceBreakDownUnits").val('0')
                        }
                        $("#txtPriceBreakDownNumberOfUnits").val(priceBreakdownentity.NumbersOfUnit);
                        $("#txtPriceBreakDownUnitPrice").val(priceBreakdownentity.UnitPrice);

                        if (priceBreakdownentity.Currency != '') {
                            $("#ddlPriceBreakDownCurrencypopup option").filter(function (index) { return $(this).text() === priceBreakdownentity.Currency; }).prop('selected', true);
                        }
                        else {
                            $("#ddlPriceBreakDownCurrencypopup").val('0')
                        }
                        $("#txtPriceBreakDownTotalCost").val(priceBreakdownentity.TotalCost);
                        $("#dtTransactionDueDate").val(duedate);
                        if (priceBreakdownentity.TransactionComplete == "Yes") {
                            $("#chkTransactionComplete").attr("checked", true);
                        }
                        else {
                            $("#chkTransactionComplete").attr("checked", false);
                        }
                        $("#dtTransactionCompletedDate").val(completedate);


                    }
                });

                $("#popupPriceBreakDown").dialog("option", "title", "Edit Price Breakdown");
                $("#popupPriceBreakDown").dialog("open");
                break;
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
        case "delete":
            {
                var milestoneTitle = $(el).find("#MilestoneTitle").text();
                swal({
                    title: '',
                    text: "Are you sure you want to <span style=\"font-weight:700\">delete '" + milestoneTitle + "'</span>?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
   function (confirmed) {
       if (confirmed) {
           var milestoneID = $(el).find("#MilestoneID").text();
           $.ajax({
               url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones?milestoneid=' + milestoneID,
               type: 'DELETE',
               dataType: 'json',
               headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
               "Content-Type": "application/json",
               cache: false,
               success: function (data) {

                   swal("", "Milestone Deleted");
                   BindMilestone();

               }
           });
       }
       return;
   });

                break;
            }
        case "edit":
            {
                var milestoneID = $(el).find("#MilestoneID").text();
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones?milestoneid=' + milestoneID,
                    type: 'GET',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    "Content-Type": "application/json",
                    cache: false,
                    success: function (milestoneentity) {
                        var duedate = milestoneentity.MilestoneDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                        $("#txtMilestoneID").val(milestoneentity.RowKey);
                        $("#dtMilestoneDate").val(duedate);
                        $("#txtMilestoneTitle").val(milestoneentity.MilestoneTitle);
                        if (milestoneentity.MilestoneType != '') {
                            $("#ddlMilestoneType option").filter(function (index) { return $(this).text() === milestoneentity.MilestoneType; }).prop('selected', true);
                        }
                        else {
                            $("#ddlMilestoneType").val('0')
                        }

                        if (milestoneentity.MilestoneDescription != '') {
                            $("#txtMileDescription").val(milestoneentity.MilestoneDescription);
                        }
                        else {
                            $("#txtMileDescription").val('')
                        }
                        var vMilestoneOwner = $("#ddlMilestoneOwner").data("kendoMultiSelect");
                        vMilestoneOwner.value(getselectedusers(milestoneentity.MilestoneOwner));
                        var vSendReminderTo = $("#ddlSendReminderTo").data("kendoMultiSelect");
                        vSendReminderTo.value(getselectedusers(milestoneentity.SendReminderTo));
                        $("#txtReminder1").val(milestoneentity.Reminder1);
                        $("#txtReminder2").val(milestoneentity.Reminder2);
                        $("#txtReminder3").val(milestoneentity.Reminder3);
                        if (milestoneentity.Priority != '') {
                            $('input[name="Priority"][value="' + milestoneentity.Priority + '"]').prop('checked', true);
                        }
                        else {
                            $('input[name="Priority"][value="Low"]').prop('checked', true);
                        }

                        if (milestoneentity.MilestoneCompleted != '') {
                            $('input[type="radio"][name="MilestoneCompleted"][value="' + milestoneentity.MilestoneCompleted + '"]').prop('checked', true);
                        }
                        else {
                            $('input[type="radio"][name="MilestoneCompleted"][value="No"]').prop('checked', true);
                        }
                        if (milestoneentity.MilestoneCompletedDate != null && milestoneentity.MilestoneCompletedDate != '') {
                            var completedate = milestoneentity.MilestoneCompletedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                            $("#dtMilestoneCompletedDate").val(completedate);
                        }
                        else {
                            $("#dtMilestoneCompletedDate").val('')
                        }

                        if (milestoneentity.ShowInCalendar != '') {
                            $('input[type="radio"][name="ShowInCalendar"][value="' + milestoneentity.ShowInCalendar + '"]').prop('checked', true);
                        }
                        else {
                            $('input[type="radio"][name="ShowInCalendar"][value="No"]').prop('checked', true);
                        }
                    }
                });
                $("#lblCTitle").text($("#lblContractTitle").text());
                $(".validelement").each(function (index, element) {
                    $(element).removeClass("error");
                    $("#errormsg_" + element.id).remove();
                });
                $("#addEditMilestone").dialog("option", "title", "Edit Milestone");
                $("#addEditMilestone").dialog("open");
                break;
            }
    }
}

function ViewMilestineDetail(milestoneID) {
    $("#tblMetadataDetail").empty();
    $('#tblMetadataDetail').append('<tr><td><img src="../Content/Images/icon/loading.gif"/></td></tr>');

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones?milestoneid=' + milestoneID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        "Content-Type": "application/json",
        cache: false,
        success: function (milestoneentity) {
            var vDueDate = milestoneentity.MilestoneDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');

            var vMetadata = '<tr>';
            vMetadata += '<td class="text_label width40">Milestone Title</td>';
            vMetadata += '<td class="text width60">' + milestoneentity.MilestoneTitle + '</td>';
            vMetadata += '</tr>';
            vMetadata += '<tr>';
            vMetadata += '<td class="text_label width40">Milestone Type</td>';
            vMetadata += '<td class="text width60">' + milestoneentity.MilestoneType + '</td>';
            vMetadata += '</tr>';
            vMetadata += '<tr>';
            vMetadata += '<td class="text_label width40">Description</td>';
            vMetadata += '<td class="text width60">';
            if (milestoneentity.MilestoneDescription != '') {
                vMetadata += milestoneentity.MilestoneDescription;
            }
            vMetadata += '</td>';
            vMetadata += '</tr>';
            vMetadata += '<tr>';
            vMetadata += '<td class="text_label width40">Milestone Date</td>';
            vMetadata += '<td class="text width60">' + vDueDate + '</td>';
            vMetadata += '</tr>';
            vMetadata += '<tr>';
            vMetadata += '<td class="text_label width40">Milestone Owner</td>';
            vMetadata += '<td class="text width60">';
            if (milestoneentity.MilestoneOwner != '') {
                vMetadata += milestoneentity.MilestoneOwner;
            }
            vMetadata += '</td>';
            vMetadata += '</tr>';
            vMetadata += '<tr>';
            vMetadata += '<td class="text_label width40">Priority</td>';
            vMetadata += '<td class="text width60">';
            if (milestoneentity.Priority != '') {
                vMetadata += milestoneentity.Priority;
            }
            vMetadata += '</td>';
            vMetadata += '</tr>';
            vMetadata += '<tr>';
            vMetadata += '<td class="text_label width40">Milestone Completed</td>';
            vMetadata += '<td class="text width60">';
            if (milestoneentity.MilestoneCompleted != '') {
                vMetadata += milestoneentity.MilestoneCompleted;
            }
            vMetadata += '</td>';
            vMetadata += '</tr>';
            vMetadata += '<tr>';
            vMetadata += '<td class="text_label width40">Completed Date</td>';
            vMetadata += '<td class="text width60">';
            if (milestoneentity.MilestoneCompletedDate != null && milestoneentity.MilestoneCompletedDate != '') {
                var completedate = milestoneentity.MilestoneCompletedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                vMetadata += completedate;
            }
            vMetadata += '</td>';
            vMetadata += '</tr>';
            vMetadata += '<tr>';
            vMetadata += '<td class="text_label width40">Show In Calendar</td>';
            vMetadata += '<td class="text width60">';
            if (milestoneentity.ShowInCalendar != '') {
                vMetadata += milestoneentity.ShowInCalendar;
            }
            vMetadata += '</td>';
            vMetadata += '</tr>';
            vMetadata += '<tr>';
            vMetadata += '<td class="text_label width40">Send Reminder To</td>';
            vMetadata += '<td class="text width60">';
            if (milestoneentity.SendReminderTo != '') {
                vMetadata += milestoneentity.SendReminderTo;
            }
            vMetadata += '</td>';
            vMetadata += '</tr>';

            vMetadata += '<tr>';
            vMetadata += '<td class="text_label width40">Reminder 1</td>';
            vMetadata += '<td class="text width60">';
            if (milestoneentity.Reminder1 != '') {
                vMetadata += milestoneentity.Reminder1 + ' days prior';
            }
            vMetadata += '</td>';
            vMetadata += '</tr>';
            vMetadata += '<tr>';
            vMetadata += '<td class="text_label width40">Reminder 2</td>';
            vMetadata += '<td class="text width60">';
            if (milestoneentity.Reminder2 != '') {
                vMetadata += milestoneentity.Reminder2 + ' days prior';
            }
            vMetadata += '</td>';
            vMetadata += '</tr>';
            vMetadata += '<tr>';
            vMetadata += '<td class="text_label width40">Reminder 3</td>';
            vMetadata += '<td class="text width60">';
            if (milestoneentity.Reminder3 != '') {
                vMetadata += milestoneentity.Reminder3 + ' days prior';
            }
            vMetadata += '</td>';
            vMetadata += '</tr>';
            $("#tblMetadataDetail").empty();
            $("#tblMetadataDetail").append(vMetadata);
            setBlankValueToHyphen("tblMetadataDetail");
            $("#viewMetadataDetail").dialog("option", "title", "View Milestone");
            $("#viewMetadataDetail").dialog("open");
        }
    });
}

$("#txtPriceBreakDownNumberOfUnits").on('input', function () {
    var price = parseFloat($("[id*=txtPriceBreakDownUnitPrice]").val());
    var Qnt = parseFloat($("[id*=txtPriceBreakDownNumberOfUnits]").val());
    var total = parseFloat(price * Qnt);
    $("[id*=txtPriceBreakDownTotalCost]").val(total);
});
$("#txtPriceBreakDownUnitPrice").on('input', function () {
    var price = parseFloat($("[id*=txtPriceBreakDownUnitPrice]").val());
    var Qnt = parseFloat($("[id*=txtPriceBreakDownNumberOfUnits]").val());
    var total = parseFloat(price * Qnt);
    $("[id*=txtPriceBreakDownTotalCost]").val(total);
});

function modalOnOpenPriceBreakdown(dialog) {
    var strContractID = getParameterByName('ContractID');
    $('.ui-button-green-text').parent().attr('disabled', 'disabled');
    var isformvalid = false;
    if (requiredValidator('addNewPriceBreakDown')) {
        isformvalid = true;
        var PriceBreakDownID = $("#txtPriceBreakDownID").val();
        if (PriceBreakDownID != "") {
            var isTransactionComplete = "No"
            if ($("#chkTransactionComplete").is(':checked')) {
                isTransactionComplete = "Yes";
            }
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/pricebreakdown?priceBreakDownid=' + PriceBreakDownID,
                type: 'PUT',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                data: {
                    RowKey: PriceBreakDownID,
                    ContractID: strContractID,
                    ContractTitle: $("#lblContractTitle").text(),
                    ItemName: $("#txtPriceBreakDownItemName").val(),
                    ItemDescription: $("#txtPriceBreakDownDescription").val(),
                    Units: $("#ddlPriceBreakDownUnits").find('option:selected').text(),
                    NumbersOfUnit: $("#txtPriceBreakDownNumberOfUnits").val(),
                    UnitPrice: parseFloat($("#txtPriceBreakDownUnitPrice").val()),
                    Currency: $("#ddlPriceBreakDownCurrencypopup").find('option:selected').text(),
                    TotalCost: $("#txtPriceBreakDownTotalCost").val(),
                    TransactionDueDate: $("#dtTransactionDueDate").val(),
                    TransactionCompletedDate: $("#dtTransactionCompletedDate").val(),
                    TransactionComplete: isTransactionComplete,
                    CreatedBy: localStorage.UserName,
                    ModifiedBy: localStorage.UserName,
                    SendReminderTo: $("#ddlSendReminderTo").find('option:selected').text(),
                    Reminder1: $("#txtReminder1").val(),
                    Reminder2: $("#txtReminder2").val(),
                    Reminder3: $("#txtReminder3").val()
                },
                cache: false,
                success: function (person) {
                    $('.ui-button-green-text').parent().removeAttr('disabled');

                    swal("", "Price Breakdown Updated");
                    $("#popupPriceBreakDown").dialog("close");
                    BindPriceBreakdownTransaction();
                }
            });
        }
        else {
            var isTransactionComplete = "No"
            if ($("#chkTransactionComplete").is(':checked')) {
                isTransactionComplete = "Yes";
            }
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/pricebreakdown/',
                type: 'POST',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                data: {
                    ContractID: getParameterByName('ContractID'),
                    ContractTitle: $("#lblContractTitle").text(),
                    ItemName: $("#txtPriceBreakDownItemName").val(),
                    ItemDescription: $("#txtPriceBreakDownDescription").val(),
                    Units: $("#ddlPriceBreakDownUnits").find('option:selected').text(),
                    NumbersOfUnit: $("#txtPriceBreakDownNumberOfUnits").val(),
                    UnitPrice: $("#txtPriceBreakDownUnitPrice").val(),
                    Currency: $("#ddlPriceBreakDownCurrencypopup").find('option:selected').text(),
                    TotalCost: $("#txtPriceBreakDownTotalCost").val(),
                    TransactionDueDate: $("#dtTransactionDueDate").val(),
                    TransactionCompletedDate: $("#dtTransactionCompletedDate").val(),
                    TransactionComplete: isTransactionComplete,
                    CreatedBy: localStorage.UserName,
                    ModifiedBy: localStorage.UserName,
                    SendReminderTo: $("#ddlSendReminderTo").find('option:selected').text(),
                    Reminder1: $("#txtReminder1").val(),
                    Reminder2: $("#txtReminder2").val(),
                    Reminder3: $("#txtReminder3").val()

                },
                cache: false,
                success: function (person) {
                    $('.ui-button-green-text').parent().removeAttr('disabled');
                    swal("", "Price Breakdown Created");
                    $("#popupPriceBreakDown").dialog("close");
                    BindPriceBreakdownTransaction();
                }
            });

        }
    }
    else {
        $('.ui-button-green-text').parent().removeAttr('disabled');
    }
    return isformvalid;
}
function modalOnOpenMilestone(dialog) {
    $('.ui-button-green-text').parent().attr('disabled', 'disabled');
    var isformvalid = false;
    if (requiredValidator('addNewMilestone')) {
        var start = moment($("#dtMilestoneDate").val());
        var end = moment(new Date());
        var vv = start.diff(end, "days");
        var vRenminder = '';
        var swalFlag = false;
        var blUpdate = true;
        isformvalid = true;
        if (vv <= parseInt($("#txtReminder1").val()) || vv <= parseInt($("#txtReminder2").val()) || vv <= parseInt($("#txtReminder3").val())) {
            swal({
                title: '',
                text: "Reminders are out of date. Are you sure you want to save?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                html: true
            },
       function (confirmed) {
           if (confirmed) {
               var arrMilestoneOwner = $("#ddlMilestoneOwner").data("kendoMultiSelect").value();
               var vMilestoneOwner = '';
               $(arrMilestoneOwner).each(function (i, item) {
                   if (vMilestoneOwner == '') {
                       vMilestoneOwner = item;
                   }
                   else {
                       vMilestoneOwner += "; " + item;
                   }
               });

               var strContractID = getParameterByName('ContractID');
               var MilestoneID = $("#txtMilestoneID").val();
               var vMilestoneComplete = $('input[type="radio"][name=MilestoneCompleted]:checked').val();
               if (MilestoneID != "") {
                   $.ajax({
                       url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones?milestoneid=' + MilestoneID,
                       type: 'PUT',
                       dataType: 'json',
                       headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                       data: {
                           RowKey: MilestoneID,
                           ContractID: strContractID,
                           ContractTitle: $("#lblCTitle").text(),
                           MilestoneTitle: $("#txtMilestoneTitle").val(),
                           MilestoneType: $("#ddlMilestoneType").find('option:selected').text(),
                           MilestoneDate: $("#dtMilestoneDate").val(),
                           MilestoneDescription: $("#txtMileDescription").val(),
                           MilestoneOwner: vMilestoneOwner,
                           Priority: $('input[name=Priority]:checked').val(),
                           MilestoneCompleted: vMilestoneComplete,
                           MilestoneCompletedDate: (vMilestoneComplete == "Yes") ? $("#dtMilestoneCompletedDate").val() : '',
                           ShowInCalendar: $('input[type="radio"][name=ShowInCalendar]:checked').val(),
                           ModifiedBy: localStorage.UserName,
                           SendReminderTo: $("#ddlSendReminderTo").find('option:selected').text(),
                           Reminder1: $("#txtReminder1").val(),
                           Reminder2: $("#txtReminder2").val(),
                           Reminder3: $("#txtReminder3").val()
                       },
                       cache: false,
                       success: function (person) {
                           $('.ui-button-green-text').parent().removeAttr('disabled');
                           swal("", "Milestone Updated");
                           $("#addEditMilestone").dialog("close");
                           BindMilestone();
                       }
                   });
               }
               else {
                   $.ajax({
                       url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones',
                       type: 'POST',
                       dataType: 'json',
                       headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                       data: {
                           RowKey: $("#txtMilestoneID").val(),
                           ContractID: getParameterByName('ContractID'),
                           ContractTitle: $("#lblCTitle").text(),
                           MilestoneTitle: $("#txtMilestoneTitle").val(),
                           MilestoneType: $("#ddlMilestoneType").find('option:selected').text(),
                           MilestoneDate: $("#dtMilestoneDate").val(),
                           MilestoneDescription: $("#txtMileDescription").val(),
                           MilestoneOwner: vMilestoneOwner,
                           Priority: $('input[name=Priority]:checked').val(),
                           MilestoneCompleted: vMilestoneComplete,
                           MilestoneCompletedDate: (vMilestoneComplete == "Yes") ? $("#dtMilestoneCompletedDate").val() : '',
                           ShowInCalendar: $('input[type="radio"][name=ShowInCalendar]:checked').val(),
                           CreatedBy: localStorage.UserName,
                           ModifiedBy: localStorage.UserName,
                           SendReminderTo: $("#ddlSendReminderTo").find('option:selected').text(),
                           Reminder1: $("#txtReminder1").val(),
                           Reminder2: $("#txtReminder2").val(),
                           Reminder3: $("#txtReminder3").val()

                       },
                       cache: false,
                       success: function (person) {
                           $('.ui-button-green-text').parent().removeAttr('disabled');
                           swal("", "Milestone Created");
                           $("#addEditMilestone").dialog("close");
                           $("#milestoneInline").toggle();
                           BindMilestone();
                       }
                   });
               }
           }
           else {
               $('.ui-button-green-text').parent().removeAttr('disabled');
           }
           return;
       });
        }
        else {
            swalFlag = true;
        }
        if (swalFlag) {
            if (blUpdate) {
                var arrMilestoneOwner = $("#ddlMilestoneOwner").data("kendoMultiSelect").value();
                var vMilestoneOwner = '';
                $(arrMilestoneOwner).each(function (i, item) {
                    if (vMilestoneOwner == '') {
                        vMilestoneOwner = item;
                    }
                    else {
                        vMilestoneOwner += "; " + item;
                    }
                });

                var strContractID = getParameterByName('ContractID');
                var MilestoneID = $("#txtMilestoneID").val();
                var vMilestoneComplete = $('input[type="radio"][name=MilestoneCompleted]:checked').val();
                if (MilestoneID != "") {
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones?milestoneid=' + MilestoneID,
                        type: 'PUT',
                        dataType: 'json',
                        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                        data: {
                            RowKey: MilestoneID,
                            ContractID: strContractID,
                            ContractTitle: $("#lblCTitle").text(),
                            MilestoneTitle: $("#txtMilestoneTitle").val(),
                            MilestoneType: $("#ddlMilestoneType").find('option:selected').text(),
                            MilestoneDate: $("#dtMilestoneDate").val(),
                            MilestoneDescription: $("#txtMileDescription").val(),
                            MilestoneOwner: vMilestoneOwner,
                            Priority: $('input[name=Priority]:checked').val(),
                            MilestoneCompleted: vMilestoneComplete,
                            MilestoneCompletedDate: (vMilestoneComplete == "Yes") ? $("#dtMilestoneCompletedDate").val() : '',
                            ShowInCalendar: $('input[type="radio"][name=ShowInCalendar]:checked').val(),
                            ModifiedBy: localStorage.UserName,
                            SendReminderTo: $("#ddlSendReminderTo").find('option:selected').text(),
                            Reminder1: $("#txtReminder1").val(),
                            Reminder2: $("#txtReminder2").val(),
                            Reminder3: $("#txtReminder3").val()
                        },
                        cache: false,
                        success: function (person) {
                            $('.ui-button-green-text').parent().removeAttr('disabled');
                            swal("", "Milestone Updated");
                            $("#addEditMilestone").dialog("close");
                            BindMilestone();
                        }
                    });
                }
                else {
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones',
                        type: 'POST',
                        dataType: 'json',
                        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                        data: {
                            RowKey: $("#txtMilestoneID").val(),
                            ContractID: getParameterByName('ContractID'),
                            ContractTitle: $("#lblCTitle").text(),
                            MilestoneTitle: $("#txtMilestoneTitle").val(),
                            MilestoneType: $("#ddlMilestoneType").find('option:selected').text(),
                            MilestoneDate: $("#dtMilestoneDate").val(),
                            MilestoneDescription: $("#txtMileDescription").val(),
                            MilestoneOwner: vMilestoneOwner,
                            Priority: $('input[name=Priority]:checked').val(),
                            MilestoneCompleted: vMilestoneComplete,
                            MilestoneCompletedDate: (vMilestoneComplete == "Yes") ? $("#dtMilestoneCompletedDate").val() : '',
                            ShowInCalendar: $('input[type="radio"][name=ShowInCalendar]:checked').val(),
                            CreatedBy: localStorage.UserName,
                            ModifiedBy: localStorage.UserName,
                            SendReminderTo: $("#ddlSendReminderTo").find('option:selected').text(),
                            Reminder1: $("#txtReminder1").val(),
                            Reminder2: $("#txtReminder2").val(),
                            Reminder3: $("#txtReminder3").val()

                        },
                        cache: false,
                        success: function (person) {
                            $('.ui-button-green-text').parent().removeAttr('disabled');
                            swal("", "Milestone Created");
                            $("#addEditMilestone").dialog("close");
                            $("#milestoneInline").toggle();
                            BindMilestone();
                        }
                    });
                }
            }
            else {
                $('.ui-button-green-text').parent().removeAttr('disabled');
            }
        }
    }
    else {
        $('.ui-button-green-text').parent().removeAttr('disabled');
    }
    return isformvalid;
}

function deleteDocumentElement(n) {
    var ele = n.parentNode.id;
    var pattern = /[0-9]+/g;
    var docNumb = ele.replace(/[^0-9]/g, '');
    n.parentNode.parentNode.removeChild(n.parentNode);

    var totalFileCount = $("#inTD").children().length;
    totalFileCount = totalFileCount + 1;
    var count = parseInt(docNumb) + 1;

    for (var i = count ; i < (totalFileCount + 1) ; i++) {
        $("#uploadContainer" + i).attr('id', 'uploadContainer' + (i - 1));
        var element = $("#file" + i);
        element.attr('id', 'file' + (i - 1));
        element.attr('name', 'file' + (i - 1));
    }
}

function deleteSavedDocumentElement(n, i) {
    $(n).parent().parent().remove();
}

function getUrlOfAttachedDoc() {
    var urlOfAttachedDoc = "";
    $('.clsLinkOfDoc').each(function () {
        var href = $(this).attr('href');
        if (urlOfAttachedDoc == "")
            urlOfAttachedDoc += href;
        else
            urlOfAttachedDoc += ";" + href;
    });
    return urlOfAttachedDoc;
}

//Script for Milestone End
//Script for Amendment Start
$(document).ready(function () {

    $('#btnAdd').click(function (e) {
        e.preventDefault();

        var removeBtn = "<img src='../Content/Images/icon/delete.png' style='float:right; margin-top:10px;' onclick='deleteDocumentElement(this)' />";
        var htmlFormatDiv = $("<div id='uploadContainer' style='height:30px'></div>");
        var htmlFormatFile = $("<input type='file'/>");

        var totalFileCount = $("#inTD").children("div").length;
        htmlFormatFile.attr("id", "file" + (totalFileCount + 1));
        htmlFormatFile.attr("name", "file" + (totalFileCount + 1));
        htmlFormatFile.attr("class", "file_amendment");
        htmlFormatDiv.attr("id", "uploadContainer" + (totalFileCount + 1));

        htmlFormatDiv.append(htmlFormatFile);
        htmlFormatDiv.append(removeBtn);

        $("#inTD").append(htmlFormatDiv);
    });

});

function showallamendments() {
    $("#ulAmendment").empty();
    $('#trseeamend').html('<img src="../Content/Images/loading.gif">');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/amendments?contractid=' + getParameterByName('ContractID'),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (contactsJsonPayload) {
            var count = 0;
            $(contactsJsonPayload).each(function (i, item) {
                count++

                var vDesc = item.AmendmentDescription;
                if (vDesc == null || vDesc == '') {
                    vDesc = '';
                }
                $("#ulAmendment").append('<li><label id="AmendmentID" style="display:none;">' + item.RowKey
                    + '</label><label id="AmendmentTitle" style="display:none;">' + item.AmendmentTitle
                    + '</label><span class="milestone"><b>' + item.AmendmentTitle
                    + '<small class="amendments_Small">' + vDesc
                    + '</small></b><img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuAmendment"/></span></li>');


            });


            $(".openmenuAmendment").contextMenu({ menu: 'dropdownMenu', leftButton: true }, function (action, el, pos) { contextMenuAmendment(action, el.parent("span").parent("li"), pos); });
            $('#trseeamend').css('display', 'none');
            ApplyPermissionToMenu($("#hdnPermission").val());
        },
        error: function () {
            if (!$("#lblAmendmentsCount").text().trim()) {
                $("#ulAmendment").append('<li class="cont_Doc_Mess">No Amendment Available</li>');
            }
        }
    });
}
$(document).ready(function () {


    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/amendmenttypes',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (documenttypes) {
            $(documenttypes).each(function (i, item) {
                $("#ddlAmendmentType").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
            });
        }
    });
});

function BindAmendments() {
    $("#ulAmendment").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/amendments?contractid=' + getParameterByName('ContractID'),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (contactsJsonPayload) {
            var count = 0;
            $(contactsJsonPayload).each(function (i, item) {
                count++
                if (count <= 5) {
                    var vDesc = item.AmendmentDescription;
                    if (vDesc == null || vDesc == '') {
                        vDesc = '';
                    }

                    $("#ulAmendment").append('<li><label id="AmendmentID" style="display:none;">' + item.RowKey
                    + '</label><label id="AmendmentTitle" style="display:none;">' + item.AmendmentTitle
                    + '</label><span class="milestone"><b>' + item.AmendmentTitle
                    + '<small class="amendments_Small">' + vDesc
                    + '</small></b><img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuAmendment"/></span></li>');

                }
            });

            if (count >= 5) {
                var more = count - 5;
                $("#ulAmendment").append('<li id="trseeamend"><a href="javascript:void(0)" onclick="showallamendments();">' + more + ' More To See</a></li>');
            }

            $("#lblAmendmentsCount").text('(' + count + ')');
            if (!$("#lblAmendmentsCount").text().trim()) {
                $("#ulAmendment").append('<li class="cont_Doc_Mess">No Amendment Available</li>');
            }
            $(".openmenuAmendment").contextMenu({ menu: 'dropdownMenu', leftButton: true }, function (action, el, pos) { contextMenuAmendment(action, el.parent("span").parent("li"), pos); });
            ApplyPermissionToMenu($("#hdnPermission").val());
        },
        error: function (request) {
            if (!$("#lblAmendmentsCount").text().trim()) {
                $("#ulAmendment").append('<li class="cont_Doc_Mess">No Amendment Available</li>');
            }
            else {
                var arr = request.responseText.split(':');
                var str1 = arr[1];
                var str2 = "No amendment found";
                if (str1.indexOf(str2) != -1) {
                    $("#lblAmendmentsCount").text('');
                    $("#ulAmendment").append('<li class="cont_Doc_Mess">No Amendment Available</li>');
                }
            }
        }
    });
}

function addAmendment() {
    if ($('#amendmentInline').css('display') == 'none') {
        $('#amendmentInline').show();
        if ($("#lblAmendmentsCount").text() == "") {
            $("#ulAmendment").empty();
        }
    } else {
        $('#amendmentInline').hide();
        if ($("#lblAmendmentsCount").text() == "") {
            $("#ulAmendment").append('<li class="cont_Doc_Mess">No Amendment Available</li>');
        }
    }
}
$('#btnAddAmendmentInline').click(function () {
    if (requiredValidator('amendmentInline')) {
        var strContractID = getParameterByName('ContractID');
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/amendments/add',
            type: 'POST',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
            data: {
                ContractID: getParameterByName('ContractID'),
                ContractTitle: $("#lblContractTitle").text(),
                AmendmentTitle: $("#txtAmendmentTitleInline").val(),
                AmendmentDescription: $("#txtAmendmentDescInline").val(),
                CreatedBy: localStorage.UserName,
                ModifiedBy: localStorage.UserName,
            },
            cache: false,
            success: function (person) {
                swal("", "Amendment Added");
                $("#amendmentInline").toggle();
                $("#txtAmendmentTitleInline").val("");
                $("#txtAmendmentDescInline").val("");
                BindAmendments();
            }
        });
    }
});

$(document).ready(function () {
    $(".openmenuAmendment").contextMenu({ menu: 'dropdownMenu', leftButton: true }, function (action, el, pos) { contextMenuAmendment(action, el.parent("span").parent("li"), pos); });

    $("#addEditAmendment").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Amendment",
        modal: true,
        buttons: {
            "Save": function () { if (modalOnOpenAmendment()) { } },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
});

$('#btnAddAmendment').click(function () {
    $("#trAttachedDoc").attr("style", "display:none");
    $("#tblDocu tr").remove();
    $("#txtAmendmentID").val("");
    $("#txtAmendmentTitle").val(""); inTD
    $('#txtAmendmentDesc').val("");
    $('#inTD').empty();

    $("#lblCTitleAmend").text($("#lblContractTitle").text());
    $(".validelement").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });
    $("#addEditAmendment").dialog("option", "title", "New Amendment");
    $("#addEditAmendment").dialog("open");
});

function contextMenuAmendment(action, el, pos) {

    switch (action) {
        case "view":
            {
                var amendmentID = $(el).find("#AmendmentID").text();
                $("#tblMetadataDetail").empty();
                $('#tblMetadataDetail').append('<tr><td><img src="../Content/Images/icon/loading.gif"/></td></tr>');
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/amendments/amendmentdetails?amendmentid=' + amendmentID,
                    type: 'GET',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    "Content-Type": "application/json",
                    cache: false,
                    success: function (amendmententity) {
                        var vMetadata = '<tr>';
                        vMetadata += '<td class="text_label width40">Amendment Title</td>';
                        vMetadata += '<td class="text width60">' + amendmententity.AmendmentTitle + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Amendment Type</td>';
                        vMetadata += '<td class="text width60">' + amendmententity.AmendmentType + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Amendment Description</td>';
                        vMetadata += '<td class="text width60">' + amendmententity.AmendmentDescription + '</td>';
                        vMetadata += '</tr>';

                        if (amendmententity.AttachmentURLs != "") {
                            var attachedDocs = [];
                            var attUrl = (amendmententity.AttachmentURLs).split(";");
                            var attUrllength = attUrl.length;
                            for (var i = 0; i < attUrllength; i++) {
                                var actualDoc = "";
                                var attParts = attUrl[i].split("/");
                                var attLastPart = attParts[attParts.length - 1];
                                var parts = attLastPart.split("_");
                                var partslength = parts.length;
                                for (var z = 0; z < partslength - 2; z++) {
                                    if (z < (partslength - 3)) {
                                        actualDoc += parts[z] + "_";
                                    }
                                    else if (z == (partslength - 3)) {
                                        actualDoc += parts[z];
                                    }
                                }

                                var extArr = attLastPart.split(".");
                                var ext = extArr[extArr.length - 1];
                                actualDoc += "." + ext;
                                var htmlDocu = "";
                                htmlDocu += "<tr>";
                                htmlDocu += "<td>";
                                htmlDocu += "<a href='" + attUrl[i] + "' style='border-bottom: 1px dotted;color: #3F91CC !important;font-size: 12px !important;'>";
                                htmlDocu += actualDoc;
                                htmlDocu += "</a>";
                                htmlDocu += "</td>";
                                htmlDocu += "</tr>";
                            }
                            vMetadata += '<tr>';
                            vMetadata += '<td class="text_label width40">Attached Documents</td>';
                            vMetadata += '<td class="text width60"><table  class="width100" cellpadding="2" cellspacing="2">' + htmlDocu + '</table></td>';
                            vMetadata += '</tr>';
                        }
                        else { vMetadata += '<tr><td class="f_head">Attached Documents</td><td class="f_p-error">No Attachment Available</td></tr>'; }
                        $("#tblMetadataDetail").empty();
                        $("#tblMetadataDetail").append(vMetadata);
                        setBlankValueToHyphen("tblMetadataDetail");
                        $("#viewMetadataDetail").dialog("option", "title", "View Amendment");
                        $("#viewMetadataDetail").dialog("open");
                    }
                });

                break;
            }
        case "delete":
            {
                var amendmentTitle = $(el).find("#AmendmentTitle").text();
                swal({
                    title: '',
                    text: "Are you sure you want to <span style=\"font-weight:700\">delete '" + amendmentTitle + "'</span>?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
   function (confirmed) {
       if (confirmed) {
           var amendmentID = $(el).find("#AmendmentID").text();
           $.ajax({
               url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/amendments?amendmentid=' + amendmentID,
               type: 'DELETE',
               dataType: 'json',
               headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
               "Content-Type": "application/json",
               cache: false,
               success: function (data) {
                   swal("", "Amendment Deleted");
                   BindAmendments();
               }
           });
       }
       return;
   });

                break;
            }
        case "edit":
            {
                $("#docAmendment").replaceWith($("#docAmendment").val('').clone(true));
                $('#inTD').empty();
                $("#trAttachedDoc").attr("style", "");
                var amendmentID = $(el).find("#AmendmentID").text();
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/amendments/amendmentdetails?amendmentid=' + amendmentID,
                    type: 'GET',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    "Content-Type": "application/json",
                    cache: false,
                    success: function (amendmententity) {
                        $("#txtAmendmentID").val(amendmententity.RowKey);
                        $("#txtAmendmentTitle").val(amendmententity.AmendmentTitle);
                        $("#txtAmendmentDesc").val(amendmententity.AmendmentDescription);
                        $("#ddlAmendmentType option").filter(function (index) { return $(this).text() === amendmententity.AmendmentType; }).prop('selected', true);

                        $("#tblDocu").empty();
                        if (amendmententity.AttachmentURLs != "") {
                            var attachedDocs = [];
                            var attUrl = (amendmententity.AttachmentURLs).split(";");
                            $("#tblDocu tr").remove();
                            $("#inTD").empty();
                            $('#docAmendment').attr({ value: '' });
                            var attUrllength = attUrl.length;
                            for (var i = 0; i < attUrllength; i++) {
                                var actualDoc = "";
                                var attParts = attUrl[i].split("/");
                                var attLastPart = attParts[attParts.length - 1];
                                var parts = attLastPart.split("_");
                                var partslength = parts.length;
                                for (var z = 0; z < partslength - 2; z++) {
                                    if (z < (partslength - 3)) {
                                        actualDoc += parts[z] + "_";
                                    }
                                    else if (z == (partslength - 3)) {
                                        actualDoc += parts[z];
                                    }

                                }

                                var extArr = attLastPart.split(".");
                                var ext = extArr[extArr.length - 1];
                                actualDoc += "." + ext;
                                var htmlDocu = "";
                                htmlDocu += "<tr>";
                                htmlDocu += "<td>";
                                htmlDocu += "<a class='clsLinkOfDoc' href='" + attUrl[i] + "' style='border-bottom: 1px dotted;color: #3F91CC !important;font-size: 12px !important;'>";
                                htmlDocu += actualDoc;
                                htmlDocu += "</a>";

                                htmlDocu += "<a id='btnRemoveSavedDoc' href='javascript:void(0)' title='Remove file' onclick='deleteSavedDocumentElement(this," + i + ")'>";
                                htmlDocu += "<img src='../Content/Images/icon/delete.png' style='float:right;margin: 5px 0px 0px 10px;'>";
                                htmlDocu += "</a>";
                                htmlDocu += "</td>";
                                htmlDocu += "</tr>";
                                $("#tblDocu").append(htmlDocu);
                            }
                        }
                        else { $("#tblDocu").append("<tr><td class='f_p-error'>No Attachment Available</td></tr>"); }
                    }
                });

                $("#lblCTitleAmend").text($("#lblContractTitle").text());
                $(".validelement").each(function (index, element) {
                    $(element).removeClass("error");
                    $("#errormsg_" + element.id).remove();
                });
                $("#addEditAmendment").dialog("option", "title", "Edit Amendment");
                $("#addEditAmendment").dialog("open");
                break;
            }
    }
}


function modalOnOpenAmendment(dialog) {
    $('.ui-button-green-text').parent().attr('disabled', 'disabled');
    var urlOfAttachedDoc = getUrlOfAttachedDoc();
    var isformvalid = false;
    if (requiredValidator('addNewAmendment')) {

        isformvalid = true;
        var strContractID = getParameterByName('ContractID');
        var AmendmentID = $("#txtAmendmentID").val()
        if (AmendmentID != "") {

            var formData = new FormData();
            var opmlFile = $('#docAmendment')[0];

            formData.append("opmlFile", opmlFile.files[0]);
            var totalFileCount = $("#inTD").children("div").length

            for (var i = 1; i < totalFileCount + 1; i++) {

                var filename = '#file' + i;
                formData.append("opmlFile" + i, $(filename)[0].files[0]);

            }

            formData.append("UrlOfAttachedDoc", urlOfAttachedDoc);
            formData.append("AmendmentID", AmendmentID);
            formData.append("ContractID", getParameterByName('ContractID'));
            formData.append("ContractTitle", $("#lblCTitleAmend").text());
            formData.append("AmendmentTitle", $("#txtAmendmentTitle").val())
            formData.append("AmendmentType", $("#ddlAmendmentType").val());
            formData.append("AmendmentDescription", $("#txtAmendmentDesc").val());
            formData.append("OriginatingCompany", "OriginatingCompany");
            formData.append("AccountID", localStorage.AccountID);
            formData.append("ModifiedBy", localStorage.UserName);
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/amendments?amendmentid=' + AmendmentID,
                type: 'PUT',
                data: formData,
                cache: false,
                contentType: false,
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken },
                processData: false,
                success: function (person) {
                    $('.ui-button-green-text').parent().removeAttr('disabled');
                    swal("", "Amendment Updated");
                    $("#addEditAmendment").dialog("close");
                    BindAmendments();
                }
            });
        }
        else {

            var formData1 = new FormData();



            var opmlFile = $('#docAmendment')[0];

            formData1.append("opmlFile", opmlFile.files[0]);
            var totalFileCount = $("#inTD").children("div").length
            for (var i = 1; i < totalFileCount + 1; i++) {
                var filename = '#file' + i;
                formData1.append("opmlFile" + i, $(filename)[0].files[0]);
            }

            formData1.append("AccountID", localStorage.AccountID);
            formData1.append("AmendmentID", AmendmentID);
            formData1.append("ContractID", getParameterByName('ContractID'));
            formData1.append("ContractTitle", $("#lblCTitleAmend").text());
            formData1.append("AmendmentTitle", $("#txtAmendmentTitle").val())
            formData1.append("AmendmentType", $("#ddlAmendmentType").val());
            formData1.append("AmendmentDescription", $("#txtAmendmentDesc").val());
            formData1.append("OriginatingCompany", "OriginatingCompany");
            formData1.append("CreatedBy", localStorage.UserName);
            formData1.append("ModifiedBy", localStorage.UserName);




            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/amendments/addwithdoc',
                type: 'POST',
                data: formData1,
                cache: false,
                contentType: false,
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken },
                processData: false,
                success: function (person) {
                    $('.ui-button-green-text').parent().removeAttr('disabled');
                    $("#addEditAmendment").dialog("close");
                    $("#amendmentInline").toggle();
                    BindAmendments();
                }
            });
        }
    }
    else {
        $('.ui-button-green-text').parent().removeAttr('disabled');
    }
    return isformvalid;
}
//Script for Amendment End
//Script for Term Picker Start
$(document).ready(function () {
    //get all terms in the picker
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/terms',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        "Content-Type": "application/json",
        cache: false,
        success: function (contactsJsonPayload) {
            $(contactsJsonPayload).each(function (i, item) {
                $("#tblTermPickerBody").append('<tr><td id="TermIDPicker" style="display:none;">' + item.RowKey + '</td><td id="TermTitlePicker" style="display:none;">' + item.TermTitle + '</td><td>'
                    + '<ul class="f_list">'
                    + '<li class="tblnobottom">'
                    + '<input type="radio" name="terms" class="css-checkbox" id=' + item.RowKey + ' value=' + item.RowKey + ' >'
                    + '<label for="' + item.RowKey + '" class="css-label">'
                    + item.TermTitle
                    + '</label>'
                    + '</li>'
                    + '</ul>'
                    + '</td><td class="labelfont">' + item.TermText + '</td></tr>');
            });

            $('#compact-pagination').pagination({
                items: contactsJsonPayload.length,
                itemsOnPage: 5,

                cssStyle: "compact-theme"
            });
        }
    });

    //get all term categories
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/termcategories',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        "Content-Type": "application/json",
        cache: false,
        success: function (contactsJsonPayload) {
            $(contactsJsonPayload).each(function (i, item) {
                $("#ddlTermCategory").append('<option value=' + item.TypeName + '>' + item.TypeName + '</option>');
            });
        }
    });

    $("#divTermPicker").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Term Picker",
        modal: true,
        buttons: {
            "OK": function () { getTermDetails(); $(this).dialog("close"); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

});

$('.pickTerm').click(function () {

    $("#divTermPicker").dialog("option", "title", "Term Picker");
    $("#divTermPicker").dialog("open");

});

$('#standardTerm').click(function () {
    enableControls();
    clearControls();
    $("#addAsNewTerm").attr('disabled', true);
    $("#pickTerm1").attr('disabled', false);
    $("#pickTerm2").attr('disabled', true);
    $("#pickTerm3").attr('disabled', true);
});

$('#standardMinorTerm').click(function () {
    disableControls();
    clearControls();
    $("#addAsNewTerm").attr('disabled', false);
    $("#pickTerm1").attr('disabled', true);
    $("#pickTerm2").attr('disabled', false);
    $("#pickTerm3").attr('disabled', true);
});

$('#standardMajorTerm').click(function () {
    disableControls();
    clearControls();
    $("#addAsNewTerm").attr('disabled', false);
    $("#pickTerm1").attr('disabled', true);
    $("#pickTerm2").attr('disabled', true);
    $("#pickTerm3").attr('disabled', false);
});

$('#specialTerm').click(function () {
    disableControls();
    clearControls();
    $("#addAsNewTerm").attr('disabled', false);
});

function getTermDetails() {
    var selectedTermID = $("input[type='radio'][name='terms']:checked").val();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/terms?termid=' + selectedTermID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        "Content-Type": "application/json",
        cache: false,
        success: function (termentity) {

            $("#txtTermTitle").val(termentity.TermTitle);
            $("#txtTermText").val(termentity.TermText);
            $("#ddlTermCategory option").filter(function (index) { return $(this).text().trim() === termentity.TermCategory.trim(); }).prop('selected', true);
        }
    });
}

$('#addAsNewTerm').click(function () {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/terms',
        type: 'POST',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        "Content-Type": "application/json",
        data: {
            TermTitle: $("#txtTermTitle").val(),
            TermCategory: $("#ddlTermCategory").find('option:selected').text(),
            TermText: $("#txtTermText").val()

        },
        cache: false,
        success: function (person) {

            swal("", "Term added to terms library");
        },
        error: function () {

            swal("", "Term not added to terms library");
        }
    });
});

function disableControls() {
    $("#txtTermTitle").attr('disabled', false);
    $("#ddlTermCategory").attr('disabled', false);
    $("#txtTermText").attr('disabled', false);
}

function enableControls() {
    $("#txtTermTitle").attr('disabled', true);
    $("#ddlTermCategory").attr('disabled', true);
    $("#txtTermText").attr('disabled', true);
}

function clearControls() {
    $("#txtTermTitle").val("");
    $("#ddlTermCategory").val("0");
    $("#txtTermText").val("");
}
//Script for term picker end
//Script for Term Start
function showallterms() {
    $("#ulTerm").empty();
    $('#trseeterm').html('<img src="../Content/Images/loading.gif">');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/terms/contract?contractid=' + getParameterByName('ContractID'),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        "Content-Type": "application/json",
        cache: false,
        success: function (contactsJsonPayload) {
            var count = 0;
            $(contactsJsonPayload).each(function (i, item) {
                count++

                var vText = item.TermText;
                if (vText == null || vText == '') {
                    vText = '';
                }

                $("#ulTerm").append('<li><label id="TermID" style="display:none;">' + item.RowKey + '</label><label id="TermTitle" style="display:none;">' + item.TermTitle
                    + '</label><span class="milestone"><b>' + item.TermTitle
                    + vText + '</b><img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuTerm"/></span></li>');

            });

            $("#lblTermsCount").text('(' + count + ')');
            if (!$("#lblTermsCount").text().trim()) {
                $("#ulTerm").append('<li class="cont_Doc_Mess">No Term Available</li>');
            }
            $(".openmenuTerm").contextMenu({ menu: 'dropdownMenu', leftButton: true }, function (action, el, pos) { contextMenuTerm(action, el.parent("span").parent("li"), pos); });
            $('#trseeterm').css('display', 'none');
            ApplyPermissionToMenu($("#hdnPermission").val());
        },
        error: function () {
            if (!$("#lblTermsCount").text().trim()) {
                $("#ulTerm").append('<li class="cont_Doc_Mess">No Term Available</li>');
            }
        }
    });
}
function BindTerms() {
    $("#ulTerm").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/terms/contract?contractid=' + getParameterByName('ContractID'),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        "Content-Type": "application/json",
        cache: false,
        success: function (contactsJsonPayload) {
            var count = 0;
            $(contactsJsonPayload).each(function (i, item) {
                count++
                if (count <= 5) {
                    var vText = item.TermText;
                    if (vText == null || vText == '') {
                        vText = '';
                    }
                    $("#ulTerm").append('<li><label id="TermID" style="display:none;">' + item.RowKey + '</label><label id="TermTitle" style="display:none;">' + item.TermTitle
                        + '</label><span class="milestone">' + item.TermTitle
                        + vText + '<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuTerm"/></span></li>');
                }
            });

            if (count >= 5) {
                var more = count - 5;
                $("#ulTerm").append('<li id="trseeterm"><a href="javascript:void(0)" onclick="showallterms();">' + more + ' More To See</a></li>');
            }

            $("#lblTermsCount").text('(' + count + ')');
            if (!$("#lblTermsCount").text().trim()) {
                $("#ulTerm").append('<li class="cont_Doc_Mess">No Term Available</li>');
            }
            $(".openmenuTerm").contextMenu({ menu: 'dropdownMenu', leftButton: true }, function (action, el, pos) { contextMenuTerm(action, el.parent("span").parent("li"), pos); });
            ApplyPermissionToMenu($("#hdnPermission").val());
        },
        error: function (request) {
            if (!$("#lblTermsCount").text().trim()) {
                $("#ulTerm").append('<li class="cont_Doc_Mess">No Term Available</li>');
            }
            else {
                var arr = request.responseText.split(':');
                var str1 = arr[1];
                var str2 = "No contract terms found";
                if (str1.indexOf(str2) != -1) {
                    $("#lblTermsCount").text('');
                    $("#ulTerm").append('<li class="cont_Doc_Mess">No Term Available</li>');
                }
            }

        }
    });
}

function addTerm() {

    $('#termInline').slideToggle();
}
$('#btnAddTermInline').click(function () {
    if (requiredValidator('termInline')) {
        var strContractID = getParameterByName('ContractID');
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/terms/contract/' + getParameterByName('ContractID'),
            type: 'POST',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
            data: {
                ContractID: getParameterByName('ContractID'),
                TermTitle: $("#txtTermTitleInline").val(),
                TermNotes: $("#txtTermDescInline").val(),
                CreatedBy: localStorage.UserName,
                ModifiedBy: localStorage.UserName,
            },
            cache: false,
            success: function (person) {

                swal("", "Term Added");
                $("#termInline").toggle();
                $("#txtTermTitleInline").val("");
                $("#txtTermDescInline").val("");

                BindTerms();
            }
        });
    }
});

$(document).ready(function () {
    $(".openmenuTerm").contextMenu({ menu: 'dropdownMenu', leftButton: true }, function (action, el, pos) { contextMenuTerm(action, el.parent("span").parent("li"), pos); });

    $("#addEditTerm").dialog({
        autoOpen: false, closeText: "",
        width: "65%",
        title: "Term",
        modal: true,
        buttons: {
            "Save": function () { if (modalOnOpenTerm()) { } },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

});

$('#btnAddTerm').click(function () {
    $("#txtTermID").val("");
    $("#txtTermTitle").val("");
    $('#txtTermNotes').val("");
    $('#ddlTermCategory').val("0");
    $('#txtTermText').val("");

    $('#termInline').slideToggle();

    $("#addEditTerm").dialog("option", "title", "New Term");
    $("#addEditTerm").dialog("open");
});
function setBlankValueToHyphen(tableId) {
    $('#' + tableId + ' tr td').each(function () {
        var cellText = $(this).html();
        if (cellText == '' || cellText == '0') {
            $(this).html('-');
        }


    });
}
function contextMenuTerm(action, el, pos) {

    switch (action) {
        case "view":
            {
                var termID = $(el).find("#TermID").text();
                $("#tblMetadataDetail").empty();
                $('#tblMetadataDetail').append('<tr><td><img src="../Content/Images/icon/loading.gif"/></td></tr>');

                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/terms/contract/' + getParameterByName('ContractID') + '?termid=' + termID,
                    type: 'GET',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    "Content-Type": "application/json",
                    cache: false,
                    success: function (termentity) {
                        var vMetadata = '<tr>';
                        vMetadata += '<td class="text_label width40">Term Title</td>';
                        vMetadata += '<td class="text width60">' + termentity.TermTitle + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Term Type</td>';
                        vMetadata += '<td class="text width60">' + termentity.TermType + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Term Category</td>';
                        vMetadata += '<td class="text width60">' + termentity.TermCategory + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Term Notes</td>';
                        vMetadata += '<td class="text width60">' + termentity.TermNotes + '</td>';
                        vMetadata += '</tr>';
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Term Text</td>';
                        vMetadata += '<td class="text width60">' + termentity.TermText + '</td>';
                        vMetadata += '</tr>';
                        $("#tblMetadataDetail").empty();
                        $("#tblMetadataDetail").append(vMetadata);
                        setBlankValueToHyphen("tblMetadataDetail");
                        $("#viewMetadataDetail").dialog("option", "title", "View Term");
                        $("#viewMetadataDetail").dialog("open");
                    }
                });
                break;
            }
        case "delete":
            {
                var termTitle = $(el).find("#TermTitle").text();
                swal({
                    title: '',
                    text: "Are you sure you want to <span style=\"font-weight:700\">delete '" + termTitle + "'</span>?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
   function (confirmed) {
       if (confirmed) {
           var termID = $(el).find("#TermID").text();
           $.ajax({
               url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/terms/contract/' + getParameterByName('ContractID') + '?termid=' + termID,
               type: 'DELETE',
               dataType: 'json',
               headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
               "Content-Type": "application/json",
               cache: false,
               success: function (data) {
                   swal("", "Term Deleted");
                   BindTerms();
               }
           });
       }
       return;
   });


                break;
            }
        case "edit":
            {
                var termID = $(el).find("#TermID").text();
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/terms/contract/' + getParameterByName('ContractID') + '?termid=' + termID,
                    type: 'GET',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    "Content-Type": "application/json",
                    cache: false,
                    success: function (termentity) {
                        $("#txtTermID").val(termentity.RowKey);
                        $("#txtTermTitle").val(termentity.TermTitle);
                        $("#txtTermNotes").val(termentity.TermNotes);
                        $('input[name="TermType"][value="' + termentity.TermType + '"]').prop('checked', true);
                        $("#ddlTermCategory option").filter(function (index) { return $(this).text() === termentity.TermCategory; }).prop('selected', true);
                        $("#txtTermText").val(termentity.TermText);
                        $("#addAsNewTerm").removeAttr('disabled');
                    }
                });
                $(".validelement").each(function (index, element) {
                    $(element).removeClass("error");
                    $("#errormsg_" + element.id).remove();
                });
                $("#addEditTerm").dialog("option", "title", "Edit Term");
                $("#addEditTerm").dialog("open");
                break;
            }
    }
}

function modalOnOpenTerm(dialog) {
    $('.ui-button-green-text').parent().attr('disabled', 'disabled');
    var isformvalid = false;
    if (requiredValidator('addNewTerm')) {
        isformvalid = true;
        var strContractID = getParameterByName('ContractID');
        var TermID = $("#txtTermID").val()
        if (TermID != "") {
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/terms/contract/' + getParameterByName('ContractID') + '?termid=' + TermID,
                type: 'PUT',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                data: {
                    RowKey: TermID,
                    ContractID: getParameterByName('ContractID'),
                    TermTitle: $("#txtTermTitle").val(),
                    TermNotes: $("#txtTermNotes").val(),
                    TermType: $("input[type='radio'][name='TermType']:checked").val(),
                    TermCategory: $("#ddlTermCategory").find('option:selected').text(),
                    TermText: $("#txtTermText").val(),
                    ModifiedBy: localStorage.UserName,

                },
                cache: false,
                success: function (person) {
                    $('.ui-button-green-text').parent().removeAttr('disabled');
                    swal("", person);
                    $("#addEditTerm").dialog("close");
                    BindTerms();

                }
            });
        }
        else {
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/terms/contract/' + getParameterByName('ContractID'),
                type: 'POST',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                data: {
                    ContractID: getParameterByName('ContractID'),
                    TermTitle: $("#txtTermTitle").val(),
                    TermNotes: $("#txtTermNotes").val(),
                    TermType: $("input[type='radio'][name='TermType']:checked").val(),
                    TermCategory: $("#ddlTermCategory").find('option:selected').text(),
                    TermText: $("#txtTermText").val(),
                    CreatedBy: localStorage.UserName,
                    ModifiedBy: localStorage.UserName,

                },
                cache: false,
                success: function (person) {
                    $('.ui-button-green-text').parent().removeAttr('disabled');

                    swal("", person);
                    $("#termInline").toggle();
                    $("#addEditTerm").dialog("close");
                    BindTerms();

                }
            });
        }
    }
    else {
        $('.ui-button-green-text').parent().removeAttr('disabled');
    }
    return isformvalid;
}
//Script for Term End
//Script for Dropdown menu Start
$(function () {

    $("#toggle_mouseenter").click(function () {

        var flag = $(this).is(":checked");

        $("#demo_drop3").jui_dropdown({
            launchOnMouseEnter: flag
        });

    });

});


//Script for Dropdown menu End
//Script for Alerts Start
$(document).ready(function () {
    CreateNotificationList();
    CreateContractAlertList();

    $("#dvAlertDetails").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Alert Details",
        modal: true,
        buttons: {
            "OK": function () { $(this).dialog("close"); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#dvManageAlert").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Manage Alert",
        modal: true,
        buttons: {
            "OK": function () {
                var isSaved = saveStatusForAlerts();
                if (isSaved) {

                    swal("", "Alert Visibility Saved");
                    $(this).dialog("close");
                }
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#dvAlertKeywords").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Keywords",
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
        buttons: {
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#addEditAlert").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Alert",
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
        buttons: {
            "Save": function () { SaveAlert(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });


    $("#allAlerts").dialog({
        autoOpen: false, closeText: "",
        width: "60%",
        title: "Alerts",
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
        buttons: {
            Close: function () {
                $(this).dialog("close");
            }
        }
    });

});

function CreateNotificationList() {
    $("#alertsList").html('');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/notifications?contractid=' + getParameterByName("ContractID"),
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            if (data.length == 0)
            { $("#alertsList").append('<li class="f_p-error">No Alert Sent</li>'); }
            else
            {
                $(data).each(function (i, item) {
                    var sNotificationTitle = item.NotificationTitle;
                    var sNotificationDate = moment(new Date(item.NotificationDate)).format('Do MMM');

                    var article = "<li class='contraRigght'>";
                    if (i < 5) {
                        article += "<p class='contRP'>" + sNotificationTitle + "</p>";
                        article += "<small class='contRsmaLl'>" + sNotificationDate + "</small>";
                        article += "</li>";
                        $("#alertsList").append(article);
                    }


                    var sCategory = item.Category;
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

                    article = "";
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
                });
                $("#seeMoreAlert").css("display", "");
                $('#compact-pagination-Alerts').pagination({
                    items: data.length,
                    itemsOnPage: 10,
                    type: 'section',
                    typeID: 'alertsListAll',
                    row: 'article',
                    cssStyle: 'compact-theme'
                });
            }
        },
        error:
            function (data) {
                $("#alertsList").append('<li class="f_p-error">No Alert Sent</li>');
            }
    });
}

function ShowAllAlerts() {
    $("#allAlerts").dialog("open");
}

function ViewAlertDetail(notificationID) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/notifications?notificationid=' + notificationID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (entity) {
            $("#sentOn").html(moment(new Date(entity.NotificationDate)).format('Do MMM'));
            $("#alertTitle").html(entity.NotificationTitle);

            var vNotificationDescription = entity.NotificationDescription;
            vNotificationDescription = vNotificationDescription.replace(/\n/g, "<br/>");

            $("#alertText").html(vNotificationDescription);
            $("#dvAlertDetails").dialog("open");
        }
    });
}

function CreateContractAlertList() {
    $("#subscribedAlerts").html('');
    var article = "";
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contractalerts?contractid=' + getParameterByName("ContractID"),
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            var itemcheckcount = 0;
            var allitem = data.length;
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                var sRowKey = item.RowKey;
                var sAlertTitle = item.EventName;
                var sPriority = item.Priority;

                article = "<tr style='border-bottom:1px dotted #eeeaea;'>";
                article += "<td id='AlertID' style='display:none;'>" + sRowKey + "</td>";
                article += "<td id='EventName' style='display:none;'>" + sAlertTitle + "</td>";
                article += "<td style='padding:5px;' class='f_list'>";
                if (item.Active == true) {
                    article += "<input id='" + sRowKey + "' name='Status' type='checkbox' onchange='checkuncheck(" + allitem + ")' class='Active css1-checkbox' value='" + sAlertTitle + "' checked='checked' />";
                    itemcheckcount++;
                }
                else {
                    article += "<input id='" + sRowKey + "' name='Status' type='checkbox' onchange='checkuncheck(" + allitem + ")' class='Active css1-checkbox' value='" + sAlertTitle + "' />";
                }
                article += "<label for='" + sRowKey + "' class='css1-label'></label>";
                article += "</td>";
                article += "<td class='css1-label'>" + sAlertTitle;
                article += "<img src='../Content/Images/context_Menu.png' class='openmenuAlert margintop-2px' alt='Open Menu' title='Open Menu' />";
                article += "</td>";
                article += "<td style='padding:5px;' id='tdTransition'>" + sPriority + "</td>";
                article += "</tr>";
                $("#subscribedAlerts").append(article);
            }

            if (data.length === itemcheckcount) {
                $("#chkCheckAll").html("Deselect All");
            }
            $(".openmenuAlert").contextMenu({ menu: 'myMenuAlert', leftButton: true }, function (action, el, pos) { contextMenuWorkAlert(action, el.parent("td").parent("tr"), pos); });

        },
        error:
            function (data) {
            }
    });
}

function ManageAlerts() {
    $("#dvManageAlert").dialog("open");
}

function ViewAlertKeywords() {
    $("#dvAlertKeywords").dialog("open");
}

function ChangeAlertVisibility(vAlertID, vVisibility) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contractalerts?alertid=' + vAlertID + '&active=' + vVisibility + '&modifiedBy=' + localStorage.UserName,
        type: 'PUT',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        cache: false,
        success: function (status) {

        }
    });
}


function contextMenuWorkAlert(action, el, pos) {

    switch (action) {
        case "edit":
            {
                $("#loadingPage").fadeIn();
                var alertID = $(el).find("#AlertID").text();
                $("input[type='checkbox'][name='Frequency']").prop('checked', false);
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contractalerts?alertid=' + alertID,
                    type: 'GET',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    cache: false,
                    success: function (legalentity) {
                        $("#txtAlertID").val(legalentity.RowKey);
                        $("#txtAlertGroup").val(legalentity.AlertGroup);
                        $("#txtEventName").val(legalentity.EventName);

                        if (legalentity.EventName == "Contract Expiration" || legalentity.EventName == "Contract Renewals") {
                            $("#trReminder").css('display', '');
                            $("#trReminderTitle").css('display', '');
                            $("#trReminderText").css('display', '');
                            $("#txtRemind1").val(legalentity.Reminder1);
                            $("#txtRemind2").val(legalentity.Reminder2);
                            $("#txtRemind3").val(legalentity.Reminder3);
                            $("#txtReminderTitle").val(legalentity.ReminderTitle);
                            $("#txtReminderText").val(legalentity.ReminderText);
                        }
                        else {
                            $("#trReminder").css('display', 'none');
                            $("#trReminderTitle").css('display', 'none');
                            $("#trReminderText").css('display', 'none');
                            $("#txtRemind1").val("0");
                            $("#txtRemind2").val("0");
                            $("#txtRemind3").val("0");
                        }

                        $("#ddlPriority option").filter(function (index) { return $(this).text() === legalentity.Priority; }).prop('selected', true);
                        $("#txtAlertTitle").val(legalentity.AlertTitle);
                        $("#txtAlertText").val(legalentity.AlertText);

                        GetValuesAndAutoPopulate("ddlAlertSendTo", legalentity.SendTo);

                        $("#chkDashboard").prop('checked', legalentity.SendAsNotification);
                        $("#chkEmail").prop('checked', legalentity.SendAsEmail);

                        var res = legalentity.AlertFrequency.split(",");
                        var reslength = res.length;
                        for (var i = 0; i < reslength; i++) {
                            $("#chk" + res[i].trim().split(" ")[0]).prop('checked', true);
                        }
                        $("#loadingPage").fadeOut();
                    }
                });

                $(".validelement").each(function (index, element) {
                    $(element).removeClass("error");
                    $("#errormsg_" + element.id).remove();
                });
                $("#addEditAlert").dialog("option", "title", "Edit Alert");
                $("#addEditAlert").dialog("open");
                break;
            }
    }
}

function SaveAlert() {
    $('.ui-button-green-text').parent().attr('disabled', 'disabled');
    var approvers = $('#ddlAlertSendTo').val();
    var sendTo = '';
    $(approvers).each(function (i, item) {
        if (sendTo == '') {
            sendTo = item;
        }
        else {
            sendTo += "; " + item;
        }
    });
    var vAlertFrequency = '';
    $("input[type='checkbox'][name='Frequency']:checked").each(function () {
        if (vAlertFrequency == '') {
            vAlertFrequency = this.title;
        }
        else {
            vAlertFrequency += ', ' + this.title;
        }
    });
    vAlertFrequency = 'Immediate';
    var vEventName = $("#txtEventName").val();
    var vReminder1 = '';
    var vReminder2 = '';
    var vReminder3 = '';
    var vReminderTitle = '';
    var vReminderText = '';
    if (vEventName == "Contract Expiration" || vEventName == "Contract Renewals") {
        vReminder1 = $("#txtRemind1").val();
        vReminder2 = $("#txtRemind2").val();
        vReminder3 = $("#txtRemind3").val();
        vReminderTitle = $("#txtReminderTitle").val();
        vReminderText = $("#txtReminderText").val();
    }
    else {
        vReminder1 = '0';
        vReminder2 = '0';
        vReminder3 = '0';
        vReminderTitle = '';
        vReminderText = '';
    }

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contractalerts?alertid=' + $("#txtAlertID").val(),
        type: 'PUT',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        data: {
            ContractID: getParameterByName("ContractID"),
            AlertGroup: $("#txtAlertGroup").val(),
            EventName: vEventName,
            Priority: $("#ddlPriority").find('option:selected').text(),
            AlertTitle: $("#txtAlertTitle").val(),
            AlertText: $("#txtAlertText").val(),
            SendTo: sendTo,
            SendAsNotification: $('#chkDashboard').is(':checked') ? true : false,
            SendAsEmail: $('#chkEmail').is(':checked') ? true : false,
            Reminder1: vReminder1,
            Reminder2: vReminder2,
            Reminder3: vReminder3,
            ReminderTitle: vReminderTitle,
            ReminderText: vReminderText,
            AlertFrequency: vAlertFrequency,
            ModifiedBy: localStorage.UserName
        },
        cache: false,
        success: function (status) {
            $('.ui-button-green-text').parent().removeAttr('disabled');

            swal("", "Alert Saved");
            CreateContractAlertList();
            $("#addEditAlert").dialog("close");
        }
    });
}


//Script for Alerts End

function BindCorrespondence() {
    $("#ulCorrespondence").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/correspondence/Contracts/' + getParameterByName('ContractID'),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (contactsJsonPayload) {
            var count = 0;
            $(contactsJsonPayload).each(function (i, item) {
                count++
                if (count <= 5) {
                    CorrespondenceItems(item);
                }
            });

            if (count > 5) {
                var more = count - 5;
                $("#ulCorrespondence").append('<li id="trseecorresp"><a href="javascript:void(0)" onclick="showallrelatedcontracts();">' + more + ' More To See</a></li>');
            }

            $("#lblCorrespondenceCount").text('(' + count + ')');
            if (!$("#lblCorrespondenceCount").text().trim()) {
                $("#ulCorrespondence").append('<li class="cont_Doc_Mess">No Correspondence Available</li>');
            }
            $(".openmenuCorrespondence").contextMenu({ menu: 'dropdownMenuCorrespondence', leftButton: true }, function (action, el, pos) { contextMenuCorrespondence(action, el.parent("span").parent("li"), pos); });


        },
        error: function (request) {
            $("#ulCorrespondence").append('<li class="cont_Doc_Mess">No Correspondence Available</li>');
        }

    });
}

function ShowAllCorrespondence() {
    $('#trseecorresp').html('<img src="../Content/Images/loading.gif">');
    $("#ulCorrespondence").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/correspondence/Contracts/' + getParameterByName('ContractID'),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (contactsJsonPayload) {
            var count = 0;
            $(contactsJsonPayload).each(function (i, item) {
                count++
                relatedcontractitems(item);
            });
            $("#lblCorrespondenceCount").text('(' + count + ')');
            if (!$("#lblCorrespondenceCount").text().trim()) {
                $("#ulCorrespondence").append('<li class="cont_Doc_Mess">No Correspondence Available</li>');
            }
            $(".openmenuCorrespondence").contextMenu({ menu: 'dropdownMenuCorrespondence', leftButton: true }, function (action, el, pos) { contextMenuCorrespondence(action, el.parent("span").parent("li"), pos); });
            $('#trseecorresp').empty();

        },
        error: function () {
            $("#ulCorrespondence").append('<li class="cont_Doc_Mess">No Correspondence Available</li>');
        }

    });
}

function CorrespondenceItems(item) {
    $("#ulCorrespondence").append('<li><label id="RowKey" style="display:none;">' + item.RowKey
        + '</label><label id="ContractID" style="display:none;">' + item.ContractID
        + '</label><label id="ContractTitle" style="display:none;" class="PreserveSpace">' + item.ContractTitle
        + '</label><label id="Subject" style="display:none;">' + item.Subject
        + '</label><span class="milestone">' + item.Subject + '<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuCorrespondence"/></span></li>');
}

function contextMenuCorrespondence(action, el, pos) {

    switch (action) {
        case "view":
            {
                var entityid = $(el).find("#RowKey").text();
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/correspondence?correspondenceid=' + entityid,
                    type: 'GET',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    cache: false,
                    success: function (item) {
                        $("#CorresSubject").html(item.Subject);
                        $("#CorresComment").html(item.Comment);
                        $("#SavedBy").html(item.CreatedBy);
                        $("#SavedOn").html(moment(new Date(item.Timestamp)).format('Do MMM'));

                        $('body', $("#CorresBody2")[0].contentWindow.document).html(item.Body)
                        $($("#CorresBody2")[0].contentWindow.document).find('head').append('<base target="_blank">');
                        $("#dvCorrespondenceDetails").dialog("option", "title", "Correspondence Details");
                        $("#dvCorrespondenceDetails").dialog("open");
                    },
                    error: function (request) {

                    }

                });
                break;
            }
        case "delete":
            {
                var Subject = $(el).find("#Subject").text();
                swal({
                    title: '',
                    text: "Are you sure you want to <span style=\"font-weight:700\">delete '" + Subject + "'</span>?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
   function (confirmed) {
       if (confirmed) {
           var entityid = $(el).find("#RowKey").text();
           $.ajax({
               url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/correspondence?correspondenceid=' + entityid,
               type: 'DELETE',
               dataType: 'json',
               headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
               "Content-Type": "application/json",
               cache: false,
               success: function (data) {

                   swal("", "Correspondence Deleted");
                   BindCorrespondence();
               }
           });
       }
       return;
   });

                break;
            }
    }
}

//Script for Related Contract Records Start
$('#btnAddRelatedContracts').click(function () {
    $("#loadingPage").fadeIn();
    $('#loadMA').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    $('#tblPopupContracts').empty();
    var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?searchkeyword=&customquery=&sortbyfield=ContractTitle&orderby=ASC';
    if ($('#tblPopupContracts tr').length <= 0) {
        $.ajax({
            url: vURL,
            type: 'GET',
            dataType: 'json',
            "Content-Type": "application/json",
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            cache: false,
            success: function (data) {
                $('#loadMA').empty();
                $("#hdnRelatedContracts").append(getParameterByName("ContractID"))
                $(data).each(function (i, item) {
                    if ($("#hdnRelatedContracts").text().indexOf(item.RowKey) > -1) { }
                    else {
                        var article = '<tr><td>';
                        article += '<input id="' + item.RowKey + '" type="checkbox" name="RelatedContract" class="css1-checkbox" value="' + item.ContractTitle + '" />';
                        article += '<label for="' + item.RowKey + '" class="css1-label PreserveSpace">' + item.ContractTitle + '</label>';
                        article += '</td></tr>';
                        $("#tblPopupContracts").append(article);
                    }
                });

                var vCount = $("#tblPopupContracts tr").length;
                if (vCount != 0) {
                    $('#compact-paginationRelatedContracts').pagination({
                        items: vCount,
                        itemsOnPage: 15,
                        typeID: 'tblPopupContracts',
                        cssStyle: 'compact-theme'
                    });
                } else {
                    $('#loadMA').html('<p style="margin-left: 20px;">No Contract Found!</p>')
                }
                $("#popupContracts").dialog("option", "title", "Related Contract Record(s)");
                $("#popupContracts").dialog("open");
                $("#loadingPage").fadeOut();
            },
            error: function () {
                $('#loadMA').empty();
                $('#loadMA').html('<p style="margin-left: 20px;">No Contract Found!</p>');
                $("#loadingPage").fadeOut();
            }
        });
    } else {
        $('#loadMA').empty();
        $("#popupContracts").dialog("option", "title", "Related Contract Record(s)");
        $("#popupContracts").dialog("open");
        $("#loadingPage").fadeOut();
    }
});


function BindRelatedContracts() {
    $("#ulRelatedContracts").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/relatedcontracts?contractid=' + getParameterByName('ContractID'),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (contactsJsonPayload) {
            var count = 0;
            $("#hdnRelatedContracts").empty();
            $(contactsJsonPayload).each(function (i, item) {
                count++
                if (count <= 5) {
                    relatedcontractitems(item);
                }
            });

            if (count > 5) {
                var more = count - 5;
                $("#ulRelatedContracts").append('<li id="trseeobli"><a href="javascript:void(0)" onclick="showallrelatedcontracts();">' + more + ' More To See</a></li>');
            }

            $("#lblRelatedContractsCount").text('(' + count + ')');
            if (!$("#lblRelatedContractsCount").text().trim()) {
                $("#ulRelatedContracts").append('<li class="cont_Doc_Mess">No Related Contract Available</li>');
            }
            $(".openmenuRelatedContracts").contextMenu({ menu: 'dropdownMenuRelatedContracts', leftButton: true }, function (action, el, pos) { contextMenuRelatedContracts(action, el.parent("span").parent("li"), pos); });


        },
        error: function (request) {
            if (!$("#lblRelatedContractsCount").text().trim()) {
                $("#ulRelatedContracts").append('<li class="cont_Doc_Mess">No Related Contract Available</li>');
            }
            else {
                var arr = request.responseText.split(':');
                var str1 = arr[1];
                var str2 = "No related contract";
                if (str1.indexOf(str2) != -1) {
                    $("#lblRelatedContractsCount").text('');
                    $("#ulRelatedContracts").append('<li class="cont_Doc_Mess">No Related Contract Available</li>');
                }
            }

        }

    });
}

function showallrelatedcontracts() {
    $('#trseeobli').html('<img src="../Content/Images/loading.gif">');
    $("#ulRelatedContracts").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/relatedcontracts?contractid=' + getParameterByName('ContractID'),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (contactsJsonPayload) {
            var count = 0;
            $("#hdnRelatedContracts").empty();
            $(contactsJsonPayload).each(function (i, item) {
                count++
                relatedcontractitems(item);
            });
            $("#lblRelatedContractsCount").text('(' + count + ')');
            if (!$("#lblRelatedContractsCount").text().trim()) {
                $("#ulRelatedContracts").append('<li class="cont_Doc_Mess">No Related Contract Available</li>');
            }
            $(".openmenuRelatedContracts").contextMenu({ menu: 'dropdownMenuRelatedContracts', leftButton: true }, function (action, el, pos) { contextMenuRelatedContracts(action, el.parent("span").parent("li"), pos); });
            $('#trseeobli').empty();


        },
        error: function () {
            if (!$("#lblRelatedContractsCount").text().trim()) {
                $("#ulRelatedContracts").append('<li class="cont_Doc_Mess">No Related Contract Available</li>');
            }
        }

    });
}

function relatedcontractitems(item) {
    var myUrl = '/Contracts/ContractDetails?ContractID=' + encodeURI(item.RelatedContractID);
    $("#hdnRelatedContracts").append(item.RelatedContractID + ';')
    $("#ulRelatedContracts").append('<li><label id="RowKey" style="display:none;">' + item.RowKey
        + '</label><label id="RelationshipType" style="display:none;">' + item.RelationshipType
        + '</label><label id="ContractID" style="display:none;">' + item.RelatedContractID
        + '</label><label id="ContractTitle" style="display:none;">' + item.RelatedContractTitle
        + '</label><span class="milestone"><a href=' + myUrl + '>' + item.RelatedContractTitle + '</a><img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuRelatedContracts"/></span></li>');
}

function contextMenuRelatedContracts(action, el, pos) {

    switch (action) {
        case "view":
            {
                var entityid = $(el).find("#ContractID").text();
                location = "/Contracts/ContractDetails?ContractID=" + entityid;
                break;
            }
        case "edit":
            {
                $('#lblcontractedittitle').text($(el).find("#ContractTitle").text())
                $('#lblcontracteditid').text($(el).find("#ContractID").text())
                $('#lblRowKey').text($(el).find("#RowKey").text())

                $("#ddlEditRelationshipType option[value='" + $(el).find("#RelationshipType").text() + "']").prop('selected', true);
                $("#popupContractsEdit").dialog("option", "title", "Edit Related Contract");
                $("#popupContractsEdit").dialog("open");
                break;
            }
        case "delete":
            {
                var relatedContractTitle = $(el).find("#ContractTitle").text();
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
           var relatedContractID = $(el).find("#ContractID").text();
           $.ajax({
               url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + getParameterByName('ContractID') + '/relatedcontracts?relatedcontractid=' + relatedContractID,
               type: 'DELETE',
               dataType: 'json',
               headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
               "Content-Type": "application/json",
               cache: false,
               success: function (data) {

                   swal("", "Related Contract Deleted");
                   BindRelatedContracts();
               }
           });
       }
       return;
   });


                break;
            }
    }
}

function CreateRelatedContracts() {

    var vRelatedContractID = "";
    var vRelatedContractTitle = "";

    $('input:checkbox[name="RelatedContract"]:checked').each(function () {
        if (vRelatedContractID == "") {
            vRelatedContractID = this.id;
            vRelatedContractTitle = this.value;
        }
        else {
            vRelatedContractID += "; " + this.id;
            vRelatedContractTitle += "; " + this.value;
        }
    });
    if (vRelatedContractID != "") {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + getParameterByName('ContractID') + '/relatedcontracts',
            type: 'POST',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            data: {
                ContractID: getParameterByName('ContractID'),
                ContractTitle: $("#lblContractTitle").text(),
                RelatedContractID: vRelatedContractID,
                RelatedContractTitle: vRelatedContractTitle,
                RelationshipType: $("#ddlRelationshipType").find('option:selected').text(),
            },
            cache: false,
            success: function (person) {

                swal("", "Related Contract Saved");
                BindRelatedContracts();
            }
        });
        return true;
    } else {

        swal("", "No contract has been selected.");
        $("#popupContracts").dialog("close");
        return false;
    }


}

function ViewContracts() {

    $('#loadMA').html('<img src="../Content/Images/icon/loading.gif"> Searching...');
    var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?searchkeyword=' + encodeURIComponent($("#txtSearchBox").val()) + '&customquery=&sortbyfield=ContractTitle&orderby=ASC';
    $.ajax({
        url: vURL,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
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
                    article += '</td></tr>';
                    $("#tblPopupContracts").append(article);
                }
            }
            var vCount = $("#tblPopupContracts tr").length;
            if (vCount != 0) {
                $('#loadMA').html('');
                $('#compact-paginationRelatedContracts').css('display', '');
                $('#compact-paginationRelatedContracts').pagination({
                    items: vCount,
                    itemsOnPage: 5,
                    typeID: 'tblPopupContracts',
                    cssStyle: 'compact-theme'
                });
            } else {
                $('#loadMA').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No Contract Found!</p>')
                $('#compact-paginationRelatedContracts').css('display', 'none');
            }
        },
        error: function () {
            $('#compact-paginationRelatedContracts').css('display', 'none');
            $('#loadMA').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No Contract Found!</p>')
        }
    });

}

function updaterelatedcontract() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + getParameterByName('ContractID') + '/relatedcontracts',
        type: 'PUT',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        data: {
            RowKey: $("#lblRowKey").text(),
            ContractID: getParameterByName('ContractID'),
            ContractTitle: $("#lblContractTitle").text(),
            RelatedContractID: $("#lblcontracteditid").text(),
            RelatedContractTitle: $("#lblcontractedittitle").text(),
            RelationshipType: $("#ddlEditRelationshipType").find('option:selected').text(),
        },
        cache: false,
        success: function (result) {

            swal("", "Related Contract Updated.");
            $('.ui-button-green-text').parent().removeAttr('disabled');
            BindRelatedContracts();
        }
    });
}

function saveStatusForAlerts() {
    var flag = false;
    $(".Active").each(function (index) {
        if ($(this).is(":checked")) {
            ChangeAlertVisibility(this.id, true);
        }
        else {
            ChangeAlertVisibility(this.id, false);
        }
    });
    flag = true;
    return flag;

}

function fnCheckAll(element) {
    if ($(element).html() == "Select All") {
        $(".Active").each(function (index) {
            $(this).attr("checked", "checked");
        });
        $(element).html("Deselect All");
    }
    else {
        $(".Active").each(function (index) {
            $(this).removeAttr("checked");
        });
        $(element).html("Select All");
    }
}

function checkuncheck(allcount) {
    var currentcount = 0;
    $('#subscribedAlerts input:checked').each(function () {
        currentcount++;
    });
    if (currentcount === 0) {
        $("#chkCheckAll").html("Select All");
    }

    if (currentcount === allcount) {
        $("#chkCheckAll").html("Deselect All");
    }
}
//Scripts for Related Contract Records End

//script for default  properties start
function updatedefaultproperties() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + getParameterByName('ContractID') + '/defaultproperties',
        type: 'PUT',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        data: {
            RowKey: getParameterByName('ContractID'),
            ContractType: $("#ddlDPContractTypes").find('option:selected').val(),
            TransactionType: $("#ddlDPTransactionType").find('option:selected').val(),
            ContractClass: $("#ddlDPContractClass").find('option:selected').val(),
            Extendable: ($("#chkDPExtendable").is(':checked') ? 'Yes' : 'No'),
            NeedApprovalForExtension: ($("#chkDPExtensionApproval").is(':checked') ? 'Yes' : 'No'),
            Renewable: ($("#chkDPRenewable").is(':checked') ? 'Yes' : 'No'),
            NeedApprovalForRenewal: ($("#chkDPRenewalApproval").is(':checked') ? 'Yes' : 'No'),
            Amendable: ($("#chkDPAmendable").is(':checked') ? 'Yes' : 'No'),
            NeedApprovalForAmendment: ($("#chkDPAmendmentApproval").is(':checked') ? 'Yes' : 'No'),
            ModifiedBy: localStorage.User,
        },
        cache: false,
        success: function (result) {
            defaultpropertiesset();
            if ($("#chkDPAmendable").is(':checked')) {
                BindAmendments();
                $("#artAmendment").css('display', '');
            } else {
                $("#artAmendment").css('display', 'none');
            }

            swal("", "Default Properties Updated.");
            $('.ui-button-green-text').parent().removeAttr('disabled');
        }
    });

}
$('#chkDPExtendable').click(function () {
    if ($("#chkDPExtendable").is(':checked')) {
        $("#chkDPExtensionApproval").removeAttr("disabled");
    }
    else {
        $("#chkDPExtensionApproval").attr("disabled", "disabled");
        $("#chkDPExtensionApproval").prop('checked', false);
    }
});

$('#chkDPRenewable').click(function () {
    if ($("#chkDPRenewable").is(':checked')) {
        $("#chkDPRenewalApproval").removeAttr("disabled");
    }
    else {
        $("#chkDPRenewalApproval").attr("disabled", "disabled");
        $("#chkDPRenewalApproval").prop('checked', false);
    }
});

$('#chkDPAmendable').click(function () {
    if ($("#chkDPAmendable").is(':checked')) {
        $("#chkDPAmendmentApproval").removeAttr("disabled");
    }
    else {
        $("#chkDPAmendmentApproval").attr("disabled", "disabled");
        $("#chkDPAmendmentApproval").prop('checked', false);
    }
});

function defaultpropertiesset() {
    if (($("#chkDPRenewable").is(':checked') ? 'Yes' : 'No') == "Yes") {
        $("#hdnIsRenewable").text("Yes");
        $("#hdnIsRenewableContract").text("Yes");

        $("#liAdminMenuRenewal").css('display', '');


    } else {
        $("#hdnIsRenewable").text("No");
        $("#hdnIsRenewableContract").text("No");

        $("#liAdminMenuRenewal").css('display', 'none');

    }

    $("#menu34").empty();
    BindStatus();

    if (($("#chkDPRenewalApproval").is(':checked') ? 'Yes' : 'No') == "Yes") {
        $("#hdnRenewApprovalRequired").text("Yes");
    }

}
//script for default properties end


// Todo
function GetTodoDetail(vTodoID) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/todos?todoid=' + vTodoID,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (item) {
            var todoType = item.TodoType;

            if (item.Status == "Complete") {
                $("#btnApprove").css("display", "none");
                $("#btnReject").css("display", "none");
            }
            else {
                if (todoType == "Contract Approval") {
                    $("#btnApprove").css("display", "");
                    $("#btnReject").css("display", "");
                }
                else if (todoType == "Contract Review") {
                    $("#btnApprove").css("display", "");
                    $("#btnApproveText").html('Reviewed');
                }
                else if (todoType == "Document Approval") {
                    $("#btnApprove").css("display", "");
                    $("#btnReject").css("display", "");
                }
                else if (todoType == "Document Review") {
                    $("#btnApprove").css("display", "");
                    $("#btnApproveText").html('Reviewed');
                }
            }


        },
        error:
            function (data) {
            }
    });
}
function GetTodoComments(vTodoID) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/todos/comments?todoid=' + vTodoID,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];

                if (item.PostType == "Action") {
                    if (item.PostBy == localStorage.UserName) {
                        $("#btnApprove").css("display", "none");
                        $("#btnReject").css("display", "none");
                        return;
                    }
                }
            }
        },
        error:
            function (data) {
            }
    });
}
$('#btnApprove').click(function () {
    PostComment("Action", $('#btnApproveText').html(), '');
});

$('#btnReject').click(function () {
    PostComment("Action", $('#btnRejectText').html(), '');
});

function PostComment(postType, postAction, postContent) {
    var vTodoID = getParameterByName("TodoID");
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/todos/comments',
        type: 'POST',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        data: {
            TodoID: vTodoID,
            PostType: postType,
            PostAction: postAction,
            PostContent: postContent,
            PostBy: localStorage.UserName
        },
        cache: false,
        success: function (status) {

            swal("", "Task " + postAction);

        }
    });
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
//Todo