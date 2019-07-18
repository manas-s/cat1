
var vTotalNewDraft = 0;
var vMoreNewDraft = 0;
var vTotalInternal = 0;
var vMoreInternal = 0;
var vTotalExternal = 0;
var vMoreExternal = 0;
var vTotalSignature = 0;
var vMoreSignature = 0;
var vProviderDocSign = '';
var RightSignatureFlag = false;
$(document).ready(function () {
    NewRecordPopUP();
    GetAllContracts();
    BindPeople();
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
    $("#contractLogsPopup").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Contract History",
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
        closeText: "",
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
        autoOpen: false,
        closeText: "",
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
        autoOpen: false,
        closeText: "",
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
        autoOpen: false,
        closeText: "",
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
        autoOpen: false,
        closeText: "",
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
        autoOpen: false,
        closeText: "",
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
        autoOpen: false,
        closeText: "",
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

    $("#sendForSignature").dialog({
        autoOpen: false,
        closeText: "",
        width: "75%",
        minHeight: "80%",
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

    allowOnlyNumberInInputBox("txtShareExpInContract");
    allowOnlyNumberInInputBox("txtExpIn");
});


function NewRecordPopUP() {
    var ContractTypeMenuLength = 0;
    var ContractTypeItems = [];
    var MoreItemsToAppend = 0;
    $.ajax({

        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/topcontracttypes',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        async: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $("#menu3").empty();
            ContractTypeMenuLength = data.length;

            for (var i = 0; i < ContractTypeMenuLength; i++) {
                var item = data[i];
                var myUrl = '/Contracts/CreateContract?Stage=active&ContractType=' + encodeURI(item.ContractType);
                var article = '<li><a href=' + myUrl + '>' + item.ContractType + '</a></li>';
                ContractTypeItems.push(item.ContractType);
                if (i < 10) {
                    $("#menu3").append(article);
                }
            }

            if (ContractTypeMenuLength > 10) {
                $("#btnContractTypeViewAll").css('display', '')
            } else {
                $("#btnContractTypeViewAll").css('display', 'none')
            }
        },
        error:
            function (data) {

            }
    });
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracttypes',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        async: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            var appendItemsToContractType = 0;
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                var myUrl = '/Contracts/CreateContract?Stage=active&ContractType=' + encodeURI(item.ContractType);
                var article = '<li><a href=' + myUrl + '>' + item.ContractType + '</a></li>';

                $("#ulAllContractTypes").append(article);

                var find = " ";
                var re = new RegExp(find, 'g');

                var str = item.ContractType.replace(re, '');
                $("#filterContractType").append('<option value=' + str + ' title="' + item.ContractType + '">' + item.ContractType + '</option>')

                if (ContractTypeItems.indexOf(item.ContractType) == -1) {
                    MoreItemsToAppend++;
                    appendItemsToContractType = ContractTypeMenuLength + i;
                    if (appendItemsToContractType <= 10) {
                        $("#menu3").append(article)
                    }
                }
            }
            $("#filterContractType option[value='All']").prop("selected", true);

            if (appendItemsToContractType > 10) {
                $("#btnContractTypeViewAll").css('display', '')
            } else {
                $("#btnContractTypeViewAll").css('display', 'none')
            }

            $('#compact-pagination-ContractTypes').pagination({
                items: data.length,
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
                $("#menu3").append('<li style="color:red;">No Contract Type Available</li>');
            }
    });

    //$.ajax({
    //    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/getcontracttemplates',
    //    type: 'GET',
    //    dataType: 'json',
    //    'Content-Type': 'application/json',
    //    cache: false,
    //    headers: { 'eContracts-ApiKey': localStorage.APIKey },
    //    success: function (data) {
    //        $("#menu3_template").empty();

    //        var datalenght = data.length;
    //        for (var i = 0; i < datalenght; i++) {
    //            var item = data[i];

    //            var myUrl = '/Contracts/CreateContract?ContractType=' + encodeURI(item.ContractType) + '&ContractTemplateID=' + item.RowKey;
    //            var article = '<li><a href=' + myUrl + '>' + item.TemplateName + '</a></li>';

    //            if (i < 10) {
    //                $("#menu3_template").append(article);
    //            }

    //            $("#ulAllContractTemplates").append(article);
    //        }

    //        if (data.length > 10) {
    //            $("#btnContractTemplatesViewAll").css('display', '');
    //        } else {
    //            $("#btnContractTemplatesViewAll").css('display', 'none');
    //        }

    //        $('#compact-pagination-ContractTemplates').pagination({
    //            items: data.length,
    //            itemsOnPage: 10,
    //            type: 'ul',
    //            row: 'li',
    //            typeID: 'ulAllContractTemplates',
    //            cssStyle: 'compact-theme'
    //        });
    //    },
    //    error:
    //        function (data) {
    //            $("#menu3_template").append('<li style="color:red;">No Contract Template Available</li>')
    //            $("#btnContractTemplatesViewAll").css('display', 'none')
    //        }
    //});

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/pipelinestatuses',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: false,
        success: function (contractstatuses) {
            var datalenght = contractstatuses.length;
            for (var i = 0; i < datalenght; i++) {
                var item = contractstatuses[i];
                var find = " ";
                var re = new RegExp(find, 'g');

                var str = item.ContractStatus.replace(re, '');

                $("#filterStatus").append('<option value=' + str + ' title="' + item.ContractStatus + '">' + item.ContractStatus + '</option>')
            }
            $("#filterStatus option[value='All']").prop("selected", true);
        }
    });
}

function GetAllContracts() {
    $('#listContracts').html('<img src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?stage=pipeline&sortbyfield=Timestamp&orderby=DESC',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
        success: function (data) {
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

function GetData(records) {

    for (var j = 0; j < records.length; j++) {
        var item = records[j];
        var myUrl = '/Pipeline/Details?ContractID=' + encodeURI(item.RowKey);
        var vStatus = item.Status;
        var vContractNumber = '';
        if (item.ContractNumber == null || item.ContractNumber == "") {
            vContractNumber = 'No Contract Record Number';
        } else {
            vContractNumber = item.ContractNumber;
        }
        var vStage = '';
        var vPermission = '';
        if (item.Permission == 'Manage') {
            vPermission = 'openmenu';
        }
        else if (item.Permission == 'Contribute') {
            vPermission = 'openmenuContribute';
        }
        else if (item.Permission == 'View') {
            vPermission = 'openmenuView';
        }
        if (vStatus == "New" || vStatus == "Drafting") {
            vTotalNewDraft++;
            if (vTotalNewDraft > 10) {
                article = '<div class="col-con-data-body-main portlet NewDraft">';
                vMoreNewDraft++;
            } else {
                article = '<div class="col-con-data-body-main portlet">';
            }
            vStage = 'dvNewDraft';
        }
        else if (vStatus == "Awaiting Review" || vStatus == "Reviewed" || vStatus == "Awaiting Approval" || vStatus == "Approved") {
            vTotalInternal++;
            if (vTotalInternal > 10) {
                article = '<div class="col-con-data-body-main portlet MoreInternal">';
                vMoreInternal++;
            } else {
                article = '<div class="col-con-data-body-main portlet">';
            }
            vStage = 'dvInternal';
        }
        else if (vStatus == "In Negotiation" || vStatus == "Negotiation Complete") {
            vTotalExternal++;
            if (vTotalExternal > 10) {
                article = '<div class="col-con-data-body-main portlet MoreExternal">';
                vMoreExternal++;
            } else {
                article = '<div class="col-con-data-body-main portlet">';
            }
            vStage = 'dvExternal';
        }
        else if (vStatus == "Awaiting Signatures") {
            vTotalSignature++;
            if (vTotalSignature > 10) {
                article = '<div class="col-con-data-body-main portlet MoreSignature">';
                vMoreSignature++;
            } else {
                article = '<div class="col-con-data-body-main portlet">';
            }
            vStage = 'dvSignature';
        }
        var article = '';
        article += '<div class="col-con-data-body">';
        article += '<div class="Contract-info-box-main">';
        article += '<div class="Contract-info-head-box portlet-header">';
        article += '<div class="Contract-info-head-left">';
        article += '<p id="ContractID" style="display:none;">' + item.RowKey + '</p>';
        article += '<p id="ContractTitle" style="display:none;" class="PreserveSpace">' + item.ContractTitle + '</p>';
        article += '<p id="ContractType" style="display:none;">' + item.ContractType + '</p>';
        article += '<p id="Status" style="display:none;">' + item.Status + '</p>';
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
        article += '<p class="head-text PreserveSpace">' + item.ContractTitle + ' <span> <img src="/Content/Images/context_Menu.png" width="16" height="16" class="' + vPermission + '" /></span></p>';
        article += '</div>';
        article += '<div class="Contract-info-head-right">';

        article += '</div>';
        article += '</div>';
        article += '<div class="Contract-info-content-box portlet-content">';
        article += '<p>' + vContractNumber + ' | ' + vStatus + '</p>';
        article += '</div>';
        article += '</div>';
        article += '</div>';
        article += '</div>';
        $("#" + vStage).append(article);
    }
    $(".openmenu").contextMenu({ menu: 'myMenu', leftButton: true }, function (action, el, pos) {
        contextMenuWork(action, el.parent("span").parent("p").parent("div"), pos);
    });
    $(".openmenuContribute").contextMenu({ menu: 'myMenuContribute', leftButton: true }, function (action, el, pos) {
        contextMenuWork(action, el.parent("span").parent("p").parent("div"), pos);
    });
    $(".openmenuView").contextMenu({ menu: 'myMenuView', leftButton: true }, function (action, el, pos) {
        contextMenuWork(action, el.parent("span").parent("p").parent("div"), pos);
    });
    $("#pTotalNewDraft").text('(' + vTotalNewDraft + ' Items)');
    $("#pTotalInternal").text('(' + vTotalInternal + ' Items)');
    $("#pTotalExternal").text('(' + vTotalExternal + ' Items)');
    $("#pTotalSignature").text('(' + vTotalSignature + ' Items)');
    if (vMoreNewDraft > 0) {
        $("#aMoreNewDraft").text(vMoreNewDraft + ' more');
        $("#dvMoreNewDraft").css('display', '');
    }
    if (vMoreInternal > 0) {
        $("#aMoreInternal").text(vMoreInternal + ' more');
        $("#dvMoreInternal").css('display', '');
    }
    if (vMoreExternal > 0) {
        $("#aMoreExternal").text(vMoreExternal + ' more');
        $("#dvMoreExternal").css('display', '');
    }
    if (vMoreSignature > 0) {
        $("#aMoreSignature").text(vMoreSignature + ' more');
        $("#dvMoreSignature").css('display', '');
    }
    $('#listContracts').empty();
    $(".column").sortable({
        connectWith: ".column",
        handle: ".portlet-header",
        cancel: ".portlet-toggle",
        placeholder: "portlet-placeholder ui-corner-all",
        receive: function (event, ui) {
            var vv = ui.sender[0].id;
            var dd = ui.item[0].parentNode.id;
            switch (vv) {
                case 'dvNewDraft':
                    vTotalNewDraft--;
                    break;
                case 'dvInternal':
                    vTotalInternal--;
                    break;
                case 'dvExternal':
                    vTotalExternal--;
                    break;
                case 'dvSignature':
                    vTotalSignature--;
                    break;
            }
            switch (dd) {
                case 'dvNewDraft':
                    vTotalNewDraft++;
                    var contractID = $(ui.item[0]).find("#ContractID").text();
                    break;
                case 'dvInternal':
                    vTotalInternal++;
                    var contractTitle = $(ui.item[0]).find("#ContractTitle").text();
                    var contractID = $(ui.item[0]).find("#ContractID").text();
                    $("#txtTodoTitle").val('Approval for ' + contractTitle);
                    $("#ddlTodoType option[value='SimpleTask']").remove();
                    $("#ddlTodoType option[value='DocumentApproval']").remove();
                    $("#ddlTodoType option[value='DocumentReview']").remove();

                    $("#txtBrowseElement").val(contractTitle);
                    $("#txtBrowseElementID").val(contractID);
                    $("#trBrowse").css("display", "");
                    $("#browse").css("display", "none");
                    $("#tdBrowseElement").html("Contract Title");
                    $("#dvTodo").dialog("open");

                    $('#ddlApprovers').data("kendoMultiSelect").value([]);
                    $("#txtDueDate").val("");
                    $("#txtNotes").val("");
                    $("#chkNotifyMe").prop('checked', false);
                    fnChangeAssignedToText();
                    break;
                case 'dvExternal':
                    vTotalExternal++;
                    ClearShareForm();
                    var contractID = $(ui.item[0]).find("#ContractID").text();
                    $("#hdContractID").val(contractID);
                    var contractTitle = $(ui.item[0]).find("#ContractTitle").text();
                    $("#hdContractTitle").val(contractTitle);


                    if (contractTitle != "") {
                        $("#tdShareContract").html("<b>" + contractTitle + "</b>");
                    }
                    else {
                        $("#tdShareContract").html("<b>No Title</b>");
                    }

                    getNameAndEmail(contractID);
                    $("#shareContract").dialog("open");
                    break;
                case 'dvSignature':
                    vTotalSignature++;
                    var contractID = $(ui.item[0]).find("#ContractID").text();
                    ClearSignatureForm();
                    BindDocument(contractID);

                    getNameAndEmailSignDocument(contractID);
                    $("#sendForSignature").dialog("open");

                    break;
            }
            $("#pTotalNewDraft").text('(' + vTotalNewDraft + ' Items)');
            $("#pTotalInternal").text('(' + vTotalInternal + ' Items)');
            $("#pTotalExternal").text('(' + vTotalExternal + ' Items)');
            $("#pTotalSignature").text('(' + vTotalSignature + ' Items)');
        }
    });

}

function contextMenuWork(action, el, pos) {

    switch (action) {
        case "delete":
            {
                var contractTitle = $(el).find("#ContractTitle").text();
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
           var entityid = $(el).find("#ContractID").text();
           $.ajax({
               url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + entityid,
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
                var contractTitle = $(el).find("#ContractTitle").text();
                var contractID = $(el).find("#ContractID").text();
                $("#txtTodoTitle").val('Approval for ' + contractTitle);
                $("#ddlTodoType option").filter(function (index) { return $(this).text() === "Contract Approval"; }).prop('selected', true);
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
                var contractID = $(el).find("#ContractID").text();
                $("#hdContractID").val(contractID);
                CreateContractActivityList();
                break;
            }
        case "share":
            {
                ClearShareForm();
                var contractID = $(el).find("#ContractID").text();
                $("#hdContractID").val(contractID);
                var contractTitle = $(el).find("#ContractTitle").text();
                $("#hdContractTitle").val(contractTitle);


                if (contractTitle != "") {
                    $("#tdShareContract").html("<b>" + contractTitle + "</b>");
                }
                else {
                    $("#tdShareContract").html("<b>No Title</b>");
                }
                getNameAndEmail(contractID);
                $("#shareContract").dialog("open");
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
                var contractID = $(el).find("#ContractID").text();
                $("#hdContractID").val(contractID);
                var Status = $(el).find("#Status").text();
                $("#hdContractStatus").val(Status);
                var Renewable = $(el).find("#Renewable").text();
                if (Renewable != null && Renewable == "Yes") {
                    $("#hdnIsRenewable").text("Yes");
                } else {
                    $("#hdnIsRenewable").text("No");
                }
                var Extendable = $(el).find("#Extendable").text();
                if (Extendable != null && Extendable == "Yes") {
                    $("#hdnIsExtendable").text("Yes");
                } else {
                    $("#hdnIsExtendable").text("No");
                }
                $("#hdnOldEndDate").val($(el).find("#EndDate").text());
                $("#hdnStartDate").val($(el).find("#StartDate").text());
                BindStatus();
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
                        $('input[name="ContractPrivacy"][value="' + item.ContractPrivacy + '"]').prop('checked', true);

                        if (item.ContractManagers != "") {

                            GetValuesAndAutoPopulate("ddlContractManagers", item.ContractManagers);
                        }

                        if (item.Reviewers != "") {

                            GetValuesAndAutoPopulate("ddlReviewers", item.Reviewers);
                        }

                        if (item.Approvers != "") {

                            GetValuesAndAutoPopulate("ddlApprovers", item.Approvers);
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
           location = "/Contracts/EditContract?ContractID=" + contractID + "&ContractType=" + contractType + "&Duplicate=Yes";

       }
       return;
   });

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
           var contractID = $(el).find("#ContractID").text();
           $("#hdContractID").val(contractID);
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
    }
}

function BindDocument(ContractID) {
    $("#ddlDocuments").empty();
    try {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?contractid=' + ContractID,
            type: 'GET',
            cache: false,
            contentType: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            processData: false,
            success: function (data) {
                $("#ddlDocuments").append("<option value='0'>-Select Document-</option>");
                var datalenght = data.length;
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];
                    $("#ddlDocuments").append("<option value='" + item.RowKey + "~" + encodeURI(item.DocumentUrl) + "'>" + item.DocumentName + "</option>");
                }
            },
            error: function (request) {
                $("#ddlDocuments").append("<option value='0'>-Select Document-</option>");
            }

        });
    } catch (e) {
        swal("", e.message);
    }
}

function fnChangeAssignedToText() {

    var ddlTodoTypeText = $('#ddlTodoType').val();

    if (ddlTodoTypeText == "ContractApproval" || ddlTodoTypeText == "DocumentApproval") {
        $('#ddlAssigne').text('Approvers');
    }
    else if (ddlTodoTypeText == "ContractReview" || ddlTodoTypeText == "DocumentReview") {
        $('#ddlAssigne').text('Reviewers');
    }
    else {
        $('#ddlAssigne').text('Assigned To');
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
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
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
                    htmlFormatFile += '<input id="txtShareContract' + totalFileCount + '" maxlength="42" value="' + item.ContactName + '" name="ShareContractName' + totalFileCount + '" placeholder="Name" title="Name" type="text" class="f_inpt width90" value="' + item.ContactName + '" />';
                    htmlFormatFile += '</td>';
                    htmlFormatFile += '<td>';
                    htmlFormatFile += '<input id="txtShareContractEmail' + totalFileCount + '" maxlength="50" value="' + item.EmailID + '" name="ShareContractEmail' + totalFileCount + '" placeholder="Email ID" title="Email ID" type="text" class="f_inpt width90 validemail" value="' + item.EmailID + '" />';
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
                var sEmail = item.EmailID;
                var article = '<option value="' + sUserName + '">' + sUserName + '</option>';
                $("#ddlContractManagers").append(article);
                $("#ddlReviewers").append(article);
                $("#ddlApproversNew").append(article);
                $("#ddlSignees").append(article);
                $("#ddlApproversRenewSettings").append(article);

                $("#ddlReadOnly").append(article);
                $("#ddlReadWrite").append(article);
                $("#ddlFullControl").append(article);
                $("#ddlCC").append(article);
                var nospaceUserName = sUserName.replace(/ /g, "_");
                var sUser = '<li>';

                sUser += '<input id="' + sEmail + '_' + nospaceUserName + '" title="' + sEmail + '" type="radio" name="SigneeUser" class="css-checkbox" value="' + sUserName + '" />';
                sUser += '<label for="' + sEmail + '_' + nospaceUserName + '" class="css-label">' + sUserName + '</label>';
                sUser += '</li>';
                $("#tblSigneeUser").append(sUser);
            }


            $("#ddlContractManagers").chosen();
            $("#ddlReviewers").chosen();
            $("#ddlApproversNew").chosen();
            $("#ddlSignees").chosen();
            $("#ddlApproversRenewSettings").chosen();

            $("#ddlReadOnly").chosen();
            $("#ddlReadWrite").chosen();
            $("#ddlFullControl").chosen();
            $("#ddlCC").chosen();
            $('.chosenmulti').on('chosen:showing_dropdown', function (evt, params) {
                $('.result-selected').css('display', 'none');
            });
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

function CreateContractActivityList() {
    $("#contractLogs").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/activities/contracts/' + $("#hdContractID").val() + '?actiontype=',
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

    if (count < 10) {

        var htmlFormatFile = '<tr id="trShareContract' + totalFileCount + '">';
        htmlFormatFile += '<td>';
        htmlFormatFile += '<input id="txtShareContract' + totalFileCount + '" maxlength="42" name="ShareContractName' + totalFileCount + '" placeholder="Name" title="Name" type="text" class="f_inpt width90" />';
        htmlFormatFile += '</td>';
        htmlFormatFile += '<td>';
        htmlFormatFile += '<input id="txtShareContractEmail' + totalFileCount + '" maxlength="50" name="ShareContractEmail' + totalFileCount + '" placeholder="Email ID" title="Email ID" type="text" class="f_inpt width90 validemail" />';
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
        $("#loadingPage").fadeIn();
        var contractForm = $("#frmShareContract").serialize();
        contractForm += "&SendBy=" + localStorage.UserName;
        contractForm += "&Notes=" + $("#txtShareNotesContract").val();
        contractForm += "&ExpIn=" + $("#txtShareExpInContract").val();
        contractForm += "&ContractTitle=" + $("#hdContractTitle").val();
        contractForm += "&AllowComment=" + ($("#chkAllowComment").is(':checked') ? 'Yes' : '');

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
            },
            error: function (person) {
                $("#loadingPage").fadeOut();
            }
        });
    }
}

function ClearShareForm() {
    $("#hdDocumentID").val('');
    $("#txtShareNotesContract").val('');
    $("#txtShareExpInContract").val('');
    $("#chkAllowComment").prop('checked', false);
    $("#hdContractID").val('');
    $('#tblShareContract').empty();
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
                $('#allAlerts').dialog('open');
            }
            else {
                var datalenght = data.length;
                for (var i = 0; i < datalenght; i++) {
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
            var datalenght = contractstatuses.length;
            for (var i = 0; i < datalenght; i++) {
                var item = contractstatuses[i];
                if (item.Transition == "Manual") {
                    var ctrl = "";

                    if ((item.ContractStatus.trim() == "Renewed" && $("#hdnIsRenewable").text() == "No") || (item.ContractStatus.trim() == "Extended" && $("#hdnIsExtendable").text() == "No") || (item.ContractStatus.trim() == "Up for Renewal" && $("#hdnIsRenewable").text() == "No"))
                    { }
                    else {
                        if ($("#hdContractStatus").val() == item.ContractStatus.trim()) {
                            ctrl = "<li id=" + item.ContractStatus.trim() + "><input id='" + item.RowKey + "' type='radio' checked onclick='javascript:statusclick(this);' name='rdstatus' value=" + encodeURI(item.ContractStatus.trim()) + " class='css-checkbox' /><label for='" + item.RowKey + "' class='css-label'>" + item.ContractStatus.trim() + "</label></li>";
                        } else {
                            ctrl = "<li id=" + item.ContractStatus.trim() + "><input id='" + item.RowKey + "' type='radio' onclick='javascript:statusclick(this);' name='rdstatus' value=" + encodeURI(item.ContractStatus.trim()) + " class='css-checkbox' /><label for='" + item.RowKey + "' class='css-label'>" + item.ContractStatus.trim() + "</label></li>";
                        }
                    }

                    if (item.ContractStatus.trim() == "Renewed") {
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

        var approvers = $("#ddlApprovers").val();
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

        var vPermissions = $('input:radio[name=PeoplePermissions]:checked').val();
        var ReadOnlyUsers = '';
        var ReadWriteUser = '';
        var FullControlUsers = "";

        if (vPermissions == "Custom") {
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
        }

        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + $("#hdContractID").val() + '/people',
            type: 'PUT',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            data: {
                ContractPrivacy: $("input[type='radio'][name='ContractPrivacy']:checked").val(),
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
                Permissions: vPermissions,
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

function OpenRenewalForm() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + $("#hdContractID").val(),
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
        if (comparedates("hdnStartDate", "txtNextRenewalDate")) {
            $("#lblNextRenewalDate").text($("#txtNextRenewalDate").val());
            $("#lblTermEndDate").text($("#txtNewEndDate").val());
            $("#manualRenewal").dialog("close");
        }
        else {
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
    htmlFormatFile += '<span class="right-float"><a href="javascript:void(0)" onclick="BrowseInternalSignee(\'txtInternalSignee' + totalFileCount + '\', \'txtInternalEmail' + totalFileCount + '\')" class="linkText">Browse</a></span>';
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

function SelectedDocument(obj) {
    var vDocID = $(obj).attr('id');
    $("#hdDocumentID").val(vDocID.split('~')[0]);
    $("#hdDocumentURL").val(vDocID.split('~')[1]);
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
        var ccUsers = $("#ddlCC").val();
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
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'RefreshToken': localStorage.RefreshToken, 'UserName': localStorage.UserName },
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

function getNameAndEmailSignDocument(ContractID) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/' + ContractID + '/contacts',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
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
                else if (i < 4) {
                    var htmlFormatFile = '<tr id="trSignee' + totalFileCount + '">';
                    htmlFormatFile += '<td class="width40">';
                    htmlFormatFile += '<input id="txtSignee' + totalFileCount + '" value="' + item.ContactName + '" name="SigneeName' + totalFileCount + '" placeholder="Signee Name" title="Signee Name" type="text" class="f_inpt width90" value="' + item.ContactName + '" />';
                    htmlFormatFile += '</td>';
                    htmlFormatFile += '<td class="width40">';
                    htmlFormatFile += '<input id="txtEmail' + totalFileCount + '" value="' + item.EmailID + '" name="SigneeEmail' + totalFileCount + '" placeholder="Signee Email" title="Signee Email" type="text" class="f_inpt width90 validemail" value="' + item.EmailID + '" />';
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
        },
        error: function () {
        }

    });
}

function ClearSignatureForm() {
    $("#hdDocumentID").val('');
    $("#hdDocumentURL").val('');
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
    vSignee += '<input id="txtInternalSignee1" name="InternalSigneeName1" placeholder="Signee Name" title="Signee" type="text" class="f_inpt width80"  readonly="readonly" />';
    vSignee += '<span class="right-float"><a href="javascript:void(0)" class="linkText" onclick="BrowseInternalSignee(\'txtInternalSignee1\', \'txtInternalEmail1\')">Browse</a></span>';
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