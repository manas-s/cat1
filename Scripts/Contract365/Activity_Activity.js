var vContractID = "";
var vtaskSearchVal = "";
var vworkflowSearchVal = "";
var vmilestonesSearchVal = "";
var vpendingobligationSearchVal = "";
var vobligationSearchVal = "";
var listContracts = [];
var IsPipeline = true;
var newContractItem = "";
var isNotObligationOwner = false;
$(document).ready(function () {

    if (typeof localStorage.GlobalBusinessAreaLocation != undefined) {
        if (localStorage.GlobalBusinessAreaLocation != "All") {
            $("#dashmain").attr("src", "/Content/images/icon/gen.png");
        }
    }
    var DatepickerFormat = '';
    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
    { DatepickerFormat = 'mm/dd/yy'; }
    else { DatepickerFormat = localStorage.AppDateFormat.toLowerCase().slice(0, -2); }


    var vViewName = getParameterByName('View');
    if (vViewName == 'Tasks') {
        $("#filterTaskStatus option:selected").prop('selected', false);
        $("#filterTaskStatus option[value='InProgress']").prop("selected", true);
        quickViewMyTasks('default');
    } else if (vViewName == 'Workflows') {
        $("#filterWorkflowStatus option:selected").prop('selected', false);
        $("#filterWorkflowStatus option[value='InProgress']").prop("selected", true);
        quickViewMyWorkflows();
    } else if (vViewName == 'Obligations') {
        quickViewMyObligations();
    }
    else {

        $('#chkHidePastDateTasks').prop('checked', true);
        quickViewMyTasks();
    }


    if (typeof localStorage.GlobalBusinessAreaLocation != 'undefined') {
        if (localStorage.GlobalBusinessAreaLocation != "All" && localStorage.GlobalBusinessAreaLocation != 'undefined') {
            $("#dashmain").attr("src", "/Content/images/icon/gen.png");

            $('#heading_Activity').text(localStorage.GlobalBusinessAreaLocation);
        }
        else {
            $('#heading_Activity').text('Activities');
        }
    }
    else {
        $('#heading_Activity').text('Activities');
    }

    $("#viewMetadataDetail").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "View Metadata Detail",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            //"View Contract Record": function () {
            //    if ($("#tblMetadataDetail").find("ul").length > 0) {
            //        var contractID = ($("#tblMetadataDetail ul li#contractID").children()[1].textContent != "" ? $("#tblMetadataDetail ul li#contractID").children()[1].textContent.trim() : "");
            //        location = "/Contracts/ContractDetails?ContractID=" + contractID + "";
            //    }
            //    else {
            //        var contractID = ($("#tblMetadataDetail tr#contractID td")[1].textContent != "" ? $("#tblMetadataDetail tr#contractID td")[1].textContent.trim() : "");
            //        location = "/Contracts/ContractDetails?ContractID=" + contractID + "";
            //    }
            //    $(this).dialog("close");
            //},
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#viewMetadataDetailForOwner").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Detail",
        modal: true,
        dialogClass: "popup_width100",
        buttons: [
        //{
        //    text: "View Contract Record",
        //    "id": "btnViewContract",
        //    "class": "ViewContract",
        //    click: function () {
        //        ViewContractDetails();
        //        $(this).dialog("close");
        //    }
        //},
        //{
        //    text: "Mark As Completed",
        //    "id": "btnMarkComplete",
        //    click: function () {
        //        MarkAsCompleted();
        //        $(this).dialog("close");
        //    }
        //},
        {
            text: "Close",
            click: function () {
                $(this).dialog("close");
            }
        }
        ]
    });


    $("#addEditStatusMultiple").dialog({
        autoOpen: false,
        closeText: "",
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


    $("#viewObligationMetadataDetail").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "View Metadata Detail",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#obligationcatalogsAddPopup").dialog({
        autoOpen: false,
        closeText: "",
        width: "65%",
        height: 500,
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "Add": function () { SaveObligationcatalog(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#viewProductsPopup").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Manage Products",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "OK": function () {
                var s = AddObligationProduct();
                //if (s) {
                $(this).dialog("close");
                $("#txtSearchBoxProduct").val("");
                //}
            },
            "Clear": function () {
                $('#txtSearchBoxProduct').val('');
                $('input:radio[name=ExtProducts]').attr('checked', false);


                $('#txtCatalogUnitPrice').val("");
                $('#txtCatalogUnits').val("");
                $('#txtCatalogNameedit').val("");
                $('#txtCatalogUnitsedit').val("");
                $('#txtCatalogUnitPriceedit').val("");

                $("#txtTransProductName").val("");
                $("#txtCatalogName").val("");



            },
            Cancel: function () {
                $('#txtSearchBoxProduct').val('');



                $(this).dialog("close");
            }
        }
    });


    $("#obligationcatalogsRecurrenceEditPopup").dialog({
        autoOpen: false,
        closeText: "",
        width: "40%",
        height: "auto",
        title: "Add Item",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            Cancel: function () {
                $(this).dialog("close");
                $("#addEditObligationNew").dialog("close");
            }
        }
    });


    $("#obligationRecurrenceEditPopup").dialog({
        autoOpen: false,
        closeText: "",
        width: "40%",
        height: "auto",
        title: "Add Item",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            Cancel: function () {
                $(this).dialog("close");
                $("#addEditObligationNew").dialog("close");
            }
        }
    });


    $("#obligationcatalogseditPopup").dialog({
        autoOpen: false,
        closeText: "",
        width: "65%",
        height: 500,
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "Update": function () { UpdateObligationcatalog(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#obligationcatalogsViewPopup").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "View Catalog",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            Close: function () {
                $(this).dialog("close");
            }
        }
    });
    //Obligation New 
    $("#addEditObligationNew").dialog({
        autoOpen: false,
        closeText: "",
        width: "80%",
        height: "auto",
        title: "Amendment",
        modal: true,
        buttons: {
            "Save": function () { if (AddEditObligationNew()) { } },
            Cancel: function () {
                if ($("#obligationnewheading").text() != "Edit Obligation") {
                    if ($('#txtObligationProductsCount').val() == "Yes") {


                        $.ajax({
                            url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/deleteempty?strDelete=' + "Catalog",
                            type: 'DELETE',
                            dataType: 'json',
                            headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                            "Content-Type": "application/json",
                            cache: false,
                            success: function (data) {

                            }
                        });


                    }

                    if ($('#txtObligationFinancialsCount').val() == "Yes") {

                        $.ajax({
                            url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/deleteempty?strDelete=' + "Financials",
                            type: 'DELETE',
                            dataType: 'json',
                            headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                            "Content-Type": "application/json",
                            cache: false,
                            success: function (data) {

                            }
                        });
                    }

                }

                $(this).dialog("close");
            }

        }
    });



    $('#dtObligationNewDueDate').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: DatepickerFormat,
        onSelect: function (dateText, inst) {
            ObligationDueDateSlectedEvent(this);
        },

    });




    $('#dtObligationNewCompletedDate').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: DatepickerFormat

    });

    $('#dtObligationProductCompletedDateEdit').datepicker({
        changeMonth: true,
        changeYear: true,

    });
    $('#dtObligationProductCompletedDate').datepicker({
        changeMonth: true,
        changeYear: true,

    });

    $('#catalogAmountsumaryValue').autoNumeric('init');
    $('#catalogAmountsumaryValueEdit').autoNumeric('init');
    $('#txtObligationProductAmountNew').autoNumeric('init');
    $('#txtObligationProductAmountNewActual').autoNumeric('init');
    $('#txtObligationProductAmountNewEdit').autoNumeric('init');
    $('#txtObligationProductAmountNewActualEdit').autoNumeric('init');
    $('.AlertEnabled .Toggle').click(function () {
        //EnableSlider()
        $(this).toggleClass('switch_enable').toggleClass('switch_disable');
        var obj = jQuery(this);
        if ($(this).hasClass('switch_enable')) {
            obj.parent().children('input').val('Yes').change();
        }
        else {
            obj.parent().children('input').val('No').change();
        }
    });
    $("#conSortByOptions").niceSelect();
});
$('#txtSearchBox').keypress(function (e) {
    if ($('#txtSearchBox').val() != "") {
        if (e.keyCode == 13)
            applyFilter();
    }
});
$("#conSortByOptions").on('change', function () {
    selectedSortOption = $("#conSortByOptions").val();
    applyFilter();
});

function quickViewMyTasks(b) {
    //$('#dvfilter').css("width", "40% !important");
    $('#dvfilter').css('cssText', 'width: 30% !important');
    if (b == undefined) {
        //selectedSortOption = "Due Date";
        $("#filterTaskStatus").find('option[value="InProgress"]').prop("selected", true);
    }
    $("#compact-pagination").html('');
    $("#spResult").html('');
    $("#hdActivityType").val("Task");
    $(".TaskFilter").css('display', '');
    $(".WorkflowFilter").css('display', 'none');
    $(".MilestoneFilter").css('display', 'none');
    $(".ObligationFilter").css('display', 'none');
    colorLink('spnMyTasks', true);
    colorLink('spnMyWorkflows', false);
    colorLink('spnMyMilestones', false);
    colorLink('liSavedViews a', false);
    colorLink('spnMyObligations', false);
    colorLink('spnMyPendingObligations', false);
    $("#showAll").html('Showing My Activities');
    $('#listActivity').html('<img src="../Content/Images/loading.gif">');
    $('#liFiltersApplied').empty();
    var vassignto = localStorage.UserName;

    if (vtaskSearchVal == "") {
        $('#txtSearchBox').val("");
        $("#txtSearchBox").attr("placeholder", "Search in 'Tasks'");
    }
    var vsearchkeyword = $('#txtSearchBox').val();
    var vcustomquery = '';
    var vsortby = 'Timestamp';
    var vorderby = 'DESC';
    if (vsearchkeyword != '') {
        $('#liFiltersApplied').append('<span><small>Showing search result for : ' + vsearchkeyword + '<img id="iFiltersSearchText" src="/Content/Images/close-quick.png" onclick="javascript:liRemoveFilterTask(this);" style="float:right" /></small></span>');
        vtaskSearchVal = "";
    }
    vcustomquery += 'Status:';
    $('#filterTaskStatus :selected').each(function (i, selected) {
        if ($(selected).text() == "All") { return false; }
        $('#liFiltersApplied').append('<span><small>' + $(selected).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveFilterTask(this);" style="float:right" /></small></span>');
        vcustomquery += $(selected).text() + ',';

        //$("#filterTaskStatus option[value='" + $(selected).text() + "']").prop("selected", false);
    });
    switch (selectedSortOption) {
        case "Recently Updated":
            vsortby = 'Timestamp';
            vorderby = 'DESC';
            break;
        case "Start Date":
            vsortby = 'StartDate';
            vorderby = 'DESC';
            break;
        case "Due Date":
            vsortby = 'DueDate';
            vorderby = 'ASC';
            break;
        case "Completed Date":
            vsortby = 'CompletedDate';
            vorderby = 'DESC';
            break;
        case "Title(A-Z)":
            vsortby = 'TaskTitle';
            vorderby = 'ASC';
            break;
        case "Title(Z-A)":
            vsortby = 'TaskTitle';
            vorderby = 'DESC';
            break;
        default:
            vsortby = 'Timestamp';
            vorderby = 'DESC';
            break;
    }
    var vUrl = ""
    if ($('#chkHidePastDateTasks').is(':checked')) {
        vUrl =vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Workflow/tasks?assignto=' + localStorage.UserName + '&searchkeyword=' + encodeURIComponent(vsearchkeyword) + '&customquery=' + encodeURIComponent(vcustomquery) + '&sortby=' + encodeURIComponent(vsortby) + '&orderby=' + encodeURIComponent(vorderby) + '&pageSize=&startIndex=&hidepasttasks=Yes';
    } else {
        vUrl =vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Workflow/tasks?assignto=' + localStorage.UserName + '&searchkeyword=' + encodeURIComponent(vsearchkeyword) + '&customquery=' + encodeURIComponent(vcustomquery) + '&sortby=' + encodeURIComponent(vsortby) + '&orderby=' + encodeURIComponent(vorderby) + '&pageSize=&startIndex=';
    }

    $.ajax({
        url: vUrl,
        type: 'GET',
        dataType: 'json',
        headers: {
            'eContracts-ApiKey': localStorage.APIKey, 'BusinessAreaLocation': localStorage.GlobalBusinessAreaLocation
        },
        cache: false,
        success: function (data) {
            GenerateTaskTable(data);
            $("#compact-pagination").css('display', '');
        },
        error: function () {
            $("#listActivity").html('');
            $("#listActivity").append('<p class="f_p-error">No items found.</p>');
            $("#compact-pagination").css('display', 'none');
        }
    });
}

function GenerateTaskTable(tasks) {
    $("#listActivity").html('');
    $("#compact-pagination").css('display', '');
    if (tasks.length == 0) {
        $("#listActivity").append('<p class="f_p-error">No items found.</p>');
        $("#compact-pagination").css('display', 'none');
    }
    else {
        var sortby = '';
        var fieldType = '';
        switch (selectedSortOption) {
            case "Recently Updated":
                sortby = 'Timestamp';
                fieldType = 'date';
                break;
            case "Start Date":
                sortby = 'StartDate';
                fieldType = 'date';
                break;
            case "Due Date":
                sortby = 'DueDate';
                fieldType = 'date';
                break;
            case "Completed Date":
                sortby = 'CompletedDate';
                fieldType = 'date';
                break;
            case "Title(A-Z)":
                vsortby = 'TaskTitle';
                break;
            case "Title(Z-A)":
                vsortby = 'TaskTitle';
                break;
            default:
                sortby = '';
                break;
        }
        //tasks.sort(function (a, b) {
        //    var a = new moment(a.Timestamp),
        //        b = new moment(b.Timestamp);
        //    return (b - a);
        //})
        var datalenght = tasks.length;
        for (var i = 0; i < datalenght; i++) {
            var item = tasks[i];
            var sTaskTitle = item.TaskTitle;
            var sRowKey = item.RowKey;
            var sTodoType = item.TodoType;
            var sInitiator = item.Initiator;
            var sDueDate = 'Not Available';
            if (item.DueDate != null) {
                sDueDate = moment(new Date(item.DueDate)).format('Do MMM YYYY');
            }

            var article = '<li>';
            article += '<p style="padding: 0 12px 0 0 !important">';
            article += '<i><a href="/Activity/TaskDetails?TaskID=' + sRowKey + '&WorkflowID=' + item.WorkflowID + '">' + sTaskTitle + '</a>';
            //article += '<small><var title="Initiator">' + sInitiator + '</var>&nbsp;|&nbsp;<var title="Due Date">' + sDueDate + '</var>&nbsp;|&nbsp;<var title="Last Modified">' + moment(new Date(item.Timestamp)).format('Do MMM YYYY') + "</var>";
            if (localStorage.AppDateFormat == null || localStorage.AppDateFormat == "" || localStorage.AppDateFormat == 'undefined') {
                article += '<small><var title="Initiator">' + sInitiator + '</var>&nbsp;|&nbsp;<var title="Last Modified">' + moment(new Date(item.Timestamp)).format('DD MMM YYYY') + '</var>';// Bug id: eO37972
            }
            else {
                if (localStorage.AppDateFormat == "DD/MM/YYYY")
                    article += '<small><var title="Initiator">' + sInitiator + '</var>&nbsp;|&nbsp;<var title="Last Modified">' + moment(new Date(item.Timestamp)).format('DD MMM YYYY') + '</var>';// Bug id: eO37972
                else
                    article += '<small><var title="Initiator">' + sInitiator + '</var>&nbsp;|&nbsp;<var title="Last Modified">' + moment(new Date(item.Timestamp)).format('MMM DD YYYY') + '</var>';// Bug id: eO37972
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
            article += '</small> </i></p> ';

            if (item.Status == "Approved" || item.Status == "Reviewed" || item.Status == "Closed") {
                article += '<b class="status_green">' + item.Status + '</b>';
            }
            else if (item.Status == "In Progress" || item.Status == "Change Requested" || item.Status == "Reassigned" || item.Status == "Restarted") {
                article += '<b class="status_yellow">' + item.Status + '</b>';
            }
            else if (item.Status == "Rejected" || item.Status == "Cancelled") {
                article += '<b class="status_red">' + item.Status + '</b>';
            }
            else {
                article += '<b class="status_Gray">' + item.Status + '</b>';
            }
            article += '</li>';
            $("#listActivity").append(article);


        }

        $('#compact-pagination').pagination({
            items: datalenght,
            itemsOnPage: 20,
            type: 'ul',
            typeID: 'listActivity',
            row: 'li',
            cssStyle: 'compact-theme',
            resultcount: 'spResult'
        });
    }
}

function quickViewMyWorkflows(b) {
    if (b !== undefined) {
        selectedSortOption = "";
        $("#filterWorkflowStatus").find('option[value="InProgress"]').prop("selected", true);
    }
    $("#compact-pagination").html('');
    $("#spResult").html('');
    $("#hdActivityType").val("Workflow");
    $(".TaskFilter").css('display', 'none');
    $(".WorkflowFilter").css('display', '');
    $(".ObligationFilter").css('display', 'none');
    $(".MilestoneFilter").css('display', 'none');
    colorLink('spnMyTasks', false);
    colorLink('spnMyWorkflows', true);
    colorLink('spnMyMilestones', false);
    colorLink('liSavedViews a', false);
    colorLink('spnMyObligations', false);
    colorLink('spnMyPendingObligations', false);

    $("#showAll").html('Showing My Activities');

    $('#listActivity').html('<img src="../Content/Images/loading.gif">');
    $('#liFiltersApplied').empty();
    var vassignto = localStorage.UserName;
    if (vworkflowSearchVal == "") {
        $('#txtSearchBox').val("");
        $("#txtSearchBox").attr("placeholder", "Search in 'Workflows'");
    }
    var vsearchkeyword = $('#txtSearchBox').val();
    var vcustomquery = '';
    var vsortby = 'Timestamp';
    var vorderby = 'DESC';
    if (vsearchkeyword != '') {
        $('#liFiltersApplied').append('<span><small>Showing search result for : ' + vsearchkeyword + '<img id="iFiltersSearchText" src="/Content/Images/close-quick.png" onclick="javascript:liRemoveFilterWorkflow(this);" style="float:right" /></small></span>');
        vworkflowSearchVal = "";
    }
    vcustomquery += 'Status:';
    $('#filterWorkflowStatus :selected').each(function (i, selected) {
        if ($(selected).text() == "All") { return false; }
        $('#liFiltersApplied').append('<span><small>' + $(selected).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveFilterWorkflow(this);" style="float:right" /></small></span>');
        vcustomquery += $(selected).text() + ',';
        //  $("#filterWorkflowStatus option[value='" + $(selected).val() + "']").prop("selected", false);
    });
    vcustomquery += ';WorkflowType:';
    $('#filterWorkflowType :selected').each(function (i, selected) {
        if ($(selected).text() == "All") { return false; }
        $('#liFiltersApplied').append('<span><small>' + $(selected).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveFilterWorkflow(this);" style="float:right" /></small></span>');
        vcustomquery += $(selected).text() + ',';
        // $("#filterWorkflowType option[value='" + $(selected).val() + "']").prop("selected", false);
    });
    switch (selectedSortOption) {
        case "Recently Updated":
            vsortby = 'Timestamp';
            vorderby = 'DESC';
            break;
        case "Start Date":
            vsortby = 'StartDate';
            vorderby = 'DESC';
            break;
        case "Completed Date":
            vsortby = 'CompletedDate';
            vorderby = 'DESC';
            break;
        case "Title(A-Z)":
            vsortby = 'WorkflowTitle';
            vorderby = 'ASC';
            break;
        case "Title(Z-A)":
            vsortby = 'WorkflowTitle';
            vorderby = 'DESC';
            break;
        default:
            vsortby = 'Timestamp';
            vorderby = 'DESC';
            break;
    }
    $.ajax({
        url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Workflow?initiator=' + localStorage.UserName + '&searchkeyword=' + encodeURIComponent(vsearchkeyword) + '&customquery=' + encodeURIComponent(vcustomquery) + '&sortby=' + vsortby + '&orderby=' + vorderby + '&pageSize=&startIndex=',
        type: 'GET',
        dataType: 'json',
        headers: {
            'eContracts-ApiKey': localStorage.APIKey, 'BusinessAreaLocation': localStorage.GlobalBusinessAreaLocation
        },
        cache: false,
        success: function (data) {
            GenerateWorkflowTable(data);
            $("#compact-pagination").css('display', '');
        },
        error: function () {
            $("#listActivity").html('');
            $("#listActivity").append('<p class="f_p-error">No items found.</p>');
            $("#compact-pagination").css('display', 'none');
        }
    });
}

function GenerateWorkflowTable(workflows) {
    $("#listActivity").html('');
    $("#compact-pagination").css('display', '');
    if (workflows.length == 0) {
        $("#listActivity").append('<p class="f_p-error">No items found.</p>');
        $("#compact-pagination").css('display', 'none');
    }
    else {
        var sortby = '';
        var fieldType = '';
        switch (selectedSortOption) {
            case "Recently Updated":
                sortby = 'Timestamp';
                fieldType = 'date';
                break;
            case "Start Date":
                sortby = 'StartDate';
                fieldType = 'date';
                break;
            case "Completed Date":
                sortby = 'CompletedDate';
                fieldType = 'date';
                break;
            case "Title(A-Z)":
                vsortby = 'WorkflowTitle';
                vorderby = 'ASC';
                break;
            case "Title(Z-A)":
                vsortby = 'WorkflowTitle';
                vorderby = 'DESC';
                break;
            default:
                sortby = '';
                break;
        }

        var datalenght = workflows.length;
        for (var i = 0; i < datalenght; i++) {
            var item = workflows[i];
            var sWorkflowTitle = item.WorkflowTitle;
            var sRowKey = item.RowKey;
            var sWorkflowType = item.WorkflowType;
            var sInitiator = item.Initiator;
            var sStartDate = 'Not Available';
            if (item.StartDate != null) {
                if (localStorage.AppDateFormat == null || localStorage.AppDateFormat == "" || localStorage.AppDateFormat == 'undefined') {
                    sStartDate = moment(new Date(item.StartDate)).format('Do MMM YYYY');
                }
                else {
                    if (localStorage.AppDateFormat == "DD/MM/YYYY")
                        sStartDate = moment(new Date(item.StartDate)).format('Do MMM YYYY');
                    else
                        sStartDate = moment(new Date(item.StartDate)).format('MMM Do YYYY');
                }

            }
            var vNewIcon = '<img src="../Content/Images/new_item.png" alt="New" title="New" />';
            if (item.UserViewed != "No") { vNewIcon = ""; }

            var article = '<li>';
            article += '<p style="padding: 0 12px 0 0 !important">';
            article += '<i><a href="/Activity/TaskDetails?TaskID=&WorkflowID=' + sRowKey + '">' + sWorkflowTitle + '</a>' + vNewIcon;
            article += '<small><cust title="Workflow Type">' + sWorkflowType + '</cust>&nbsp;|&nbsp;<cust title="Start Date">' + sStartDate + '</cust>';
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
            article += '</small> </i></p> ';

            if (item.Status == "Completed") {
                article += '<b class="status_green">' + item.Status + '</b>';
            }
            else if (item.Status == "In Progress" || item.Status == "Restarted") {
                article += '<b class="status_yellow">' + item.Status + '</b>';
            }
            else if (item.Status == "Cancelled") {
                article += '<b class="status_red">' + item.Status + '</b>';
            }
            else {
                article += '<b class="status_Gray">' + item.Status + '</b>';
            }
            article += '</li>';
            $("#listActivity").append(article);


        }

        $('#compact-pagination').pagination({
            items: datalenght,
            itemsOnPage: 20,
            type: 'ul',
            typeID: 'listActivity',
            row: 'li',
            cssStyle: 'compact-theme',
            resultcount: 'spResult'
        });
    }
}

function BindMilestoneTypes() {
    $.ajax({
        url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/milestonetypes',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (documenttypes) {
            $(documenttypes).each(function (i, item) {
                var find = " ";
                var re = new RegExp(find, 'g');

                $("#filterMilestoneType").append("<option value='" + item.TypeName.replace(re, '') + "'>" + item.TypeName + "</option>")
            });
        }
    });
}


function quickViewMyMilestones(b) {
    if (b !== undefined) {
        selectedSortOption = "Due Date";
        $("#filterMilestoneCompleted").find('option[value="No"]').prop("selected", true);
    }
    $("#compact-pagination").html('');
    $("#spResult").html('');
    $("#hdActivityType").val("Milestone");
    $(".TaskFilter").css('display', 'none');
    $(".WorkflowFilter").css('display', 'none');
    $(".ObligationFilter").css('display', 'none');
    $(".MilestoneFilter").css('display', '');
    colorLink('spnMyTasks', false);
    colorLink('spnMyWorkflows', false);
    colorLink('spnMyMilestones', true);
    colorLink('liSavedViews a', false);
    colorLink('spnMyObligations', false);
    colorLink('spnMyPendingObligations', false);

    $("#showAll").html('Showing My Activities');

    $('#listActivity').html('<img src="../Content/Images/loading.gif">');
    $('#liFiltersApplied').empty();
    var vassignto = localStorage.UserName;
    if (vmilestonesSearchVal == "") {
        $('#txtSearchBox').val("");
        $("#txtSearchBox").attr("placeholder", "Search in 'Milestones'");
    }
    var vsearchkeyword = $('#txtSearchBox').val();
    var vcustomquery = '';
    var vsortby = 'Timestamp';
    var vorderby = 'DESC';
    if (vsearchkeyword != '') {
        $('#liFiltersApplied').append('<span><small>Showing search result for : ' + vsearchkeyword + '<img id="iFiltersSearchText" src="/Content/Images/close-quick.png" onclick="javascript:liRemoveFilterMilestone(this);" style="float:right" /></small></span>');
        vmilestonesSearchVal = "";
    }
    vcustomquery += 'MilestoneCompleted:';
    $('#filterMilestoneCompleted :selected').each(function (i, selectedvalue) {
        if ($(selectedvalue).text() == "All") { return false; }
        var vStatus = "No";
        if ($(selectedvalue).text() == "Completed")
            vStatus = "Yes";
        $('#liFiltersApplied').append('<span><small>' + $(selectedvalue).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveFilterMilestone(this);" style="float:right" /></small></span>');
        vcustomquery += vStatus + ',';
        // $("#filterMilestoneCompleted option[value='" + $(selectedvalue).val() + "']").prop("selected", false);
    });
    vcustomquery += ';MilestoneType:';
    $('#filterMilestoneType :selected').each(function (i, selected) {
        if ($(selected).text() == "All") { return false; }
        $('#liFiltersApplied').append('<span><small>' + $(selected).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveFilterMilestone(this);" style="float:right" /></small></span>');
        vcustomquery += $(selected).text() + ',';

        // $("#filterMilestoneType option[value='" + $(selected).val() + "']").prop("selected", false);
    });
    switch (selectedSortOption) {
        case "Recently Updated":
            vsortby = 'Timestamp';
            vorderby = 'DESC';
            break;
        case "Due Date":
            vsortby = 'MilestoneDate';
            vorderby = 'ASC';
            break;
        case "Completed Date":
            vsortby = 'MilestoneCompletedDate';
            vorderby = 'DESC';
            break;
        case "Title(A-Z)":
            vsortby = 'MilestoneTitle';
            vorderby = 'ASC';
            break;
        case "Title(Z-A)":
            vsortby = 'MilestoneTitle';
            vorderby = 'DESC';
            break;
        default:
            vsortby = 'Timestamp';
            vorderby = 'DESC';
            break;
    }
    var vUrl = ""
    if ($('#chkHidePastDate').is(':checked')) {
        vUrl =vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/milestones?assignto=' + vassignto + '&searchkeyword=' + encodeURIComponent(vsearchkeyword) + '&customquery=' + encodeURIComponent(vcustomquery) + '&sortby=' + vsortby + '&orderby=' + vorderby + '&pageSize=&startIndex=&hidepastmilestone=Yes';
    } else {
        vUrl =vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/milestones?assignto=' + vassignto + '&searchkeyword=' + encodeURIComponent(vsearchkeyword) + '&customquery=' + encodeURIComponent(vcustomquery) + '&sortby=' + vsortby + '&orderby=' + vorderby + '&pageSize=&startIndex=';
    }

    $.ajax({
        url: vUrl,
        type: 'GET',
        dataType: 'json',
        headers: {
            'eContracts-ApiKey': localStorage.APIKey, 'BusinessAreaLocation': localStorage.GlobalBusinessAreaLocation
        },
        cache: false,
        success: function (data) {
            GenerateMilestoneTable(data);
            $("#compact-pagination").css('display', '');
        },
        error: function (data) {
            $("#listActivity").html('');
            $("#listActivity").append('<p class="f_p-error">No items found.</p>');
            $("#compact-pagination").css('display', 'none');
        }
    });
}

function GenerateMilestoneTable(milestones) {
    $("#listActivity").html('');
    $("#compact-pagination").css('display', '');
    if (milestones.length == 0) {
        $("#listActivity").append('<p class="f_p-error">No items found.</p>');
        $("#compact-pagination").css('display', 'none');
    }
    else {
        var sortby = '';
        var fieldType = '';
        switch (selectedSortOption) {
            case "Recently Updated":
                sortby = 'Timestamp';
                fieldType = 'date';
                break;

            case "Completed Date":
                sortby = 'MilestoneCompletedDate';
                fieldType = 'date';
                break;
            case "Title(A-Z)":
                vsortby = 'MilestoneTitle';
                break;
            case "Title(Z-A)":
                vsortby = 'MilestoneTitle';
                break;

            default:
                sortby = '';
                break;
        }

        var datalenght = milestones.length;
        for (var i = 0; i < datalenght; i++) {
            var item = milestones[i];
            var sMilestoneTitle = item.MilestoneTitle;
            var sRowKey = item.RowKey;
            var sMilestoneType = 'Not Available';
            var sInitiator = item.Initiator;
            var sMilestoneDate = 'Not Available';
            var sContractTitle = item.ContractTitle;
            if (item.MilestoneDate != null) {

                if (localStorage.AppDateFormat == null || localStorage.AppDateFormat == "" || localStorage.AppDateFormat == 'undefined') {
                    sMilestoneDate = moment(new Date(item.MilestoneDate)).format('Do MMM YYYY');
                }
                else {
                    if (localStorage.AppDateFormat == "DD/MM/YYYY")
                        sMilestoneDate = moment(new Date(item.MilestoneDate)).format('Do MMM YYYY');
                    else
                        sMilestoneDate = moment(new Date(item.MilestoneDate)).format('MMM Do YYYY');
                }
            }
            if (item.MilestoneType != "") {
                sMilestoneType = item.MilestoneType;
            }

            var article = '<li>';
            article += '<p style="padding: 0 12px 0 0 !important">';
            article += '<i><a href="javascript:void(0);" onclick="ViewMilestoneDetail(\'' + sRowKey + '\')">' + sMilestoneTitle + '</a>';
            article += '<small class="PreserveSpace"><cust title="Contract Record Title">' + sContractTitle + '</cust>&nbsp;|&nbsp;<cust title="Milestone Type">' + sMilestoneType + '</cust>&nbsp;|&nbsp;<cust title="Due Date">' + sMilestoneDate + '</cust>';
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
            article += '</small> </i></p> ';

            if (item.MilestoneCompleted == "Yes") {
                article += '<b class="status_green">Completed</b>';
            }
            else if (item.MilestoneCompleted == "No") {
                article += '<b class="status_red">Not Completed</b>';
            }
            else {
                article += '<b class="status_red">Not Completed</b>';
            }
            article += '</li>';
            $("#listActivity").append(article);


        }

        $('#compact-pagination').pagination({
            items: datalenght,
            itemsOnPage: 20,
            type: 'ul',
            typeID: 'listActivity',
            row: 'li',
            cssStyle: 'compact-theme',
            resultcount: 'spResult'
        });
    }
}

function ViewMilestoneDetail(milestoneID) {
    $("#tblMetadataDetail").empty();
    $("#loadingPage").fadeIn();
    $.ajax({
        url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/milestones?milestoneid=' + milestoneID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        "Content-Type": "application/json",
        cache: false,
        success: function (milestoneentity) {
            BindNewContractDetails(milestoneentity.ContractID);
            var vDueDate = "";
            if (milestoneentity.MilestoneDate != null) {

                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                { vDueDate = moment(new Date(milestoneentity.MilestoneDate)).format('MM/DD/YYYY'); }
                else { vDueDate = moment(new Date(milestoneentity.MilestoneDate)).format(localStorage.AppDateFormat); }
            }

            var vMetadata = '<ul class="pOp_Cont Milestone">';
            vMetadata += '<li><p>Contract Record Title</p><span>' + '<a class="doted290px" href="/Contracts/ContractDetails?ContractID='+ milestoneentity.ContractID +'" target="_blank" style="color: #44a6d8;" title="' + milestoneentity.ContractTitle + '">' + milestoneentity.ContractTitle + '  <img src="/Content/Images/external_link.png" id="newTabImage"></a>' + '</span></li>';
            vMetadata += '<li id="milestoneTitle"><p>Milestone Title</p><span>' + milestoneentity.MilestoneTitle + '</span></li>';
            vMetadata += '<li><p>Milestone Type</p><span>' + milestoneentity.MilestoneType + '</span></li>';

            vMetadata += '<li><p>Description</p><span style="word-break: break-all;">';
            if (milestoneentity.MilestoneDescription != '') {
                vMetadata += milestoneentity.MilestoneDescription;
            }
            else { vMetadata += "-"; }
            vMetadata += '</span></li>';

            vMetadata += '<li><p>Milestone Date</p><span>' + vDueDate + '</span></li>';

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
                { completedate = moment(new Date(milestoneentity.MilestoneCompletedDate)).format('MM/DD/YYYY'); }
                else { completedate = moment(new Date(milestoneentity.MilestoneCompletedDate)).format(localStorage.AppDateFormat); }
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
                vMetadata += milestoneentity.Reminder2 + ' days ' + milestoneentity.Reminder1Condition;
            }
            else { vMetadata += "-"; }
            vMetadata += '</span></li>';

            vMetadata += '<li><p>Reminder 3</p><span>';
            if (milestoneentity.Reminder3 != '') {
                vMetadata += milestoneentity.Reminder3 + ' days ' + milestoneentity.Reminder1Condition;
            }
            else { vMetadata += "-"; }
            vMetadata += '</span></li>';

            //ContractID 
            vMetadata += '<li id="contractID" style="display:none;"><p>Contract ID</p><span>' + milestoneentity.ContractID + '</span></li>';
            //MilestoneID
            vMetadata += '<li id="milestoneID" style="display:none;"><p>Milestone ID</p><span>' + milestoneentity.RowKey + '</span></li>';

            vMetadata += '</ul>';

            var permissionsAll = newContractItem.ContractManagers + ";" + newContractItem.Approvers + ";" + newContractItem.Reviewers + ";" + newContractItem.Signees
                + ";" + newContractItem.BusinessAreaOwners + ";" + newContractItem.ReadWritePermissions + ";" + newContractItem.FullControlPermissions + ";" + newContractItem.ProjectManager;
            var permissions = $.unique($(permissionsAll.split(';')).map(function (i, item) { return item.trim() }).filter(function (i, item) { return item != ""; }));
            var msOwners = [];
            if (milestoneentity.MilestoneOwner != "") {
                if (milestoneentity.MilestoneOwner.indexOf('{') > -1) {
                    $.ajax({
                        url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/milestones/ownersfromgroup?contractid=' + milestoneentity.ContractID + '&milestoneonwers=' + milestoneentity.MilestoneOwner,
                        type: 'GET',
                        dataType: 'json',
                        headers: { 'eContracts-ApiKey': localStorage.APIKey },
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

            var status = getContractStatus(milestoneentity.ContractID);
            var statusArr = ["Replaced", "Expired", "Cancelled", "Archived"];
            $("#loadingPage").fadeOut();
            if (msOwners != "" && msOwners != null && msOwners.indexOf(localStorage.UserName) > -1 && milestoneentity.MilestoneCompleted != "Yes" &&
                milestoneentity.AutoComplete != "Yes" && jQuery.inArray(status, statusArr) == -1 && permissions.toArray().indexOf(localStorage.UserName) > -1) {
                $("#tblMetadataDetailForOwner").empty();
                $("#tblMetadataDetailForOwner").append(vMetadata);
                $("#btnMarkComplete span").attr('style', 'background-color: transparent; color: #3177b5;font-size: 14px;border: 1px solid #3177b5 !important;');
                $("#btnViewContract span").attr('style', 'font-size: 14px;');
                $("#viewMetadataDetailForOwner").dialog("option", "title", "View Milestone");
                $("#viewMetadataDetailForOwner").dialog("open");
            }
            else {
                $("#tblMetadataDetail").empty();
                $("#tblMetadataDetail").append(vMetadata);
                $("#viewMetadataDetail").dialog("option", "title", "View Milestone");
                $("#viewMetadataDetail").dialog("open");
            }
        }
    });
}


//Obligations Related Methods Start

function BindObligationTypes() {
    $.ajax({
        url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligationtypes',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (documenttypes) {
            $(documenttypes).each(function (i, item) {
                $("#filterObligationType").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>");
                $("#ddlObligationTypeNew").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>");
            });
        }
    });
}

function quickViewMyObligations(b) {
    if (b !== undefined) {
        selectedSortOption = "Due Date";
        $("#filterObligationStatus").find('option[value="Upcoming"]').prop("selected", true);
    }
    $("#compact-pagination").html('');
    $("#spResult").html('');
    $("#hdActivityType").val("Obligations");
    $(".TaskFilter").css('display', 'none');
    $(".WorkflowFilter").css('display', 'none');
    $(".ObligationFilter").css('display', 'none');
    $(".MilestoneFilter").css('display', 'none');
    $(".ObligationFilter").css('display', '');
    colorLink('spnMyTasks', false);
    colorLink('spnMyWorkflows', false);
    colorLink('spnMyMilestones', false);
    colorLink('liSavedViews a', false);
    colorLink('spnMyObligations', true);
    colorLink('spnMyPendingObligations', false);

    $("#filterObligationStatus option[value='Cancelled']").show();
    $("#filterObligationStatus option[value='Complete']").show();

    $("#showAll").html('Showing My Activities');

    $('#listActivity').html('<img src="../Content/Images/loading.gif">');
    $('#liFiltersApplied').empty();
    var vassignto = localStorage.UserName;
    if (vobligationSearchVal == "") {
        $('#txtSearchBox').val("");
        $("#txtSearchBox").attr("placeholder", "Search in 'My Obligations'");
    }
    var vsearchkeyword = $('#txtSearchBox').val();
    var vcustomquery = '';
    var vsortby = 'DueDate';
    var vorderby = 'DESC';
    if (vsearchkeyword != '') {
        $('#liFiltersApplied').append('<span><small>Showing search result for : ' + vsearchkeyword + '<img id="iFiltersSearchText" src="/Content/Images/close-quick.png" onclick="javascript:liRemoveFilterObligation(this);" style="float:right" /></small></span>');
        vobligationSearchVal = "";
    }
    vcustomquery += 'ObligationStatus:';
    $('#filterObligationStatus :selected').each(function (i, selected) {
        if ($(selected).text() == "All") { return false; }

        $('#liFiltersApplied').append('<span><small>' + $(selected).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveFilterObligation(this);" style="float:right" /></small></span>');
        vcustomquery += $(selected).text() + ',';

        // $("#filterObligationStatus option[value='" + $(selected).val() + "']").prop("selected", false);

    });
    vcustomquery += ';ObligationType:';
    $('#filterObligationType :selected').each(function (i, selected) {
        if ($(selected).text() == "All") { return false; }
        $('#liFiltersApplied').append('<span><small>' + $(selected).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveFilterObligation(this);" style="float:right" /></small></span>');
        vcustomquery += $(selected).text() + ',';

        // $("#filterObligationType option[value='" + $(selected).val() + "']").prop("selected", false);

    });

    switch (selectedSortOption) {
        case "Recently Updated":
            vsortby = 'Timestamp';
            vorderby = 'DESC';
            break;
        case "Due Date":
            vsortby = 'DueDate';
            vorderby = 'ASC';
            break;
        case "Completed Date":
            vsortby = 'ObligationMetDate';
            vorderby = 'DESC';
            break;
        case "Title(A-Z)":
            vsortby = 'ObligationTitle';
            vorderby = 'ASC';
            break;
        case "Title(Z-A)":
            vsortby = 'ObligationTitle';
            vorderby = 'DESC';
            break;
        default:
            vsortby = 'DueDate';
            vorderby = 'DESC';
            break;
    }
    var vUrl = ""
    if ($('#chkHidePastDateObligation').is(':checked')) {
        vUrl =vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/filters?assignto=' + vassignto + '&searchkeyword=' + encodeURIComponent(vsearchkeyword) + '&customquery=' + encodeURIComponent(vcustomquery) + '&sortby=' + encodeURIComponent(vsortby) + '&orderby=' + vorderby + '&pageSize=&startIndex=&hidepastobligations=Yes';
    } else {
        vUrl =vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/filters?assignto=' + vassignto + '&searchkeyword=' + encodeURIComponent(vsearchkeyword) + '&customquery=' + encodeURIComponent(vcustomquery) + '&sortby=' + encodeURIComponent(vsortby) + '&orderby=' + vorderby + '&pageSize=&startIndex=';
    }
    $.ajax({
        url: vUrl,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'BusinessAreaLocation': localStorage.GlobalBusinessAreaLocation },
        cache: false,
        success: function (data) {
            GetData(data);
            // GenerateObligationTable(data);
            $("#compact-pagination").css('display', '');
        },
        error: function (data) {
            $("#listActivity").html('');
            $("#listActivity").append('<p class="f_p-error">No items found.</p>');
            $("#compact-pagination").css('display', 'none');
        }
    });
}


function quickViewMyPendingObligations() {

    $("#compact-pagination").html('');
    $("#spResult").html('');
    $("#hdActivityType").val("PendingObligations");
    $(".TaskFilter").css('display', 'none');
    $(".WorkflowFilter").css('display', 'none');
    $(".ObligationFilter").css('display', 'none');
    $(".MilestoneFilter").css('display', 'none');
    $(".ObligationFilter").css('display', '');
    colorLink('spnMyTasks', false);
    colorLink('spnMyWorkflows', false);
    colorLink('spnMyMilestones', false);
    colorLink('liSavedViews a', false);
    colorLink('spnMyObligations', false);
    colorLink('spnMyPendingObligations', true);



    $("#filterObligationStatus option[value='Cancelled']").hide();
    $("#filterObligationStatus option[value='Complete']").hide();

    $("#showAll").html('Showing My Activities');

    $('#listActivity').html('<img src="../Content/Images/loading.gif">');
    $('#liFiltersApplied').empty();
    var vassignto = localStorage.UserName;
    if (vpendingobligationSearchVal == "") {
        $('#txtSearchBox').val("");
        $("#txtSearchBox").attr("placeholder", "Search in 'Pending Obligations'");
    }
    var vsearchkeyword = $('#txtSearchBox').val();
    var vcustomquery = '';
    var vsortby = 'DueDate';
    var vorderby = 'DESC';
    if (vsearchkeyword != '') {
        $('#liFiltersApplied').append('<span><small>Showing search result for : ' + vsearchkeyword + '<img id="iFiltersSearchText" src="/Content/Images/close-quick.png" onclick="javascript:liRemoveFilterObligation(this);" style="float:right" /></small></span>');
        vpendingobligationSearchVal = "";
    }
    vcustomquery += 'ObligationStatus:';
    $('#filterObligationStatus :selected').each(function (i, selected) {
        if ($(selected).text() == "All") { return false; }
        $('#liFiltersApplied').append('<span><small>' + $(selected).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveFilterObligation(this);" style="float:right" /></small></span>');
        vcustomquery += $(selected).text() + ',';

        //$("#filterObligationStatus option[value='" + $(selected).val() + "']").prop("selected", false);

    });
    vcustomquery += ';ObligationType:';
    $('#filterObligationType :selected').each(function (i, selected) {
        if ($(selected).text() == "All") { return false; }
        $('#liFiltersApplied').append('<span><small>' + $(selected).text() + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemoveFilterObligation(this);" style="float:right" /></small></span>');
        vcustomquery += $(selected).text() + ',';

        // $("#filterObligationType option[value='" + $(selected).val() + "']").prop("selected", false);
    });
    switch (selectedSortOption) {
        case "Recently Updated":
            vsortby = 'Timestamp';
            vorderby = 'DESC';
            break;
        case "Due Date":
            vsortby = 'DueDate';
            vorderby = 'DESC';
            break;
        case "Completed Date":
            vsortby = 'ObligationMetDate';
            vorderby = 'DESC';
            break;
        case "Title(A-Z)":
            vsortby = 'ObligationTitle';
            vorderby = 'ASC';
            break;
        case "Title(Z-A)":
            vsortby = 'ObligationTitle';
            vorderby = 'DESC';
            break;
        default:
            vsortby = 'DueDate';
            vorderby = 'DESC';
            break;
    }
    $.ajax({
        url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/filters/pending?assignto=' + vassignto + '&searchkeyword=' + encodeURIComponent(vsearchkeyword) + '&customquery=' + encodeURIComponent(vcustomquery) + '&sortby=' + encodeURIComponent(vsortby) + '&orderby=' + vorderby + '&pageSize=&startIndex=',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'BusinessAreaLocation': localStorage.GlobalBusinessAreaLocation },
        cache: false,
        success: function (data) {
            GetData(data);
            // GenerateObligationTable(data);
            $("#compact-pagination").css('display', '');
        },
        error: function (data) {
            $("#listActivity").html('');
            $("#listActivity").append('<p class="f_p-error">No items found.</p>');
            $("#compact-pagination").css('display', 'none');
        }
    });
}

function GetData(data) {
    var resultfound = true;

    if (data.length == 0) {
        resultfound = false;
        $('#listActivity').empty();
        $("#listActivity").append("<p class='f_p-error'>No items found.</p>");
        $("#compact-pagination").css('display', 'none');
    } else {
        listContracts = data;
        CreateContractList(0);
        $('#compact-pagination').pagination({
            items: data.length,
            itemsOnPage: 20,
            type: 'ul',
            row: 'li',
            typeID: 'listActivity',
            cssStyle: 'compact-theme',
            listname: 'Contracts'
        });

    }
    return resultfound;
}
function CreateContractList(page) {
    $("#SelectAll").show();
    $("#SelectAllSpan").show();
    $(".drop_a").hide();
    multipleChecks = "";
    multipleObligationNewChecks = "";
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
        case "Completed Date":
            sortby = 'ObligationMetDate';
            fieldType = 'date';
            break;
        default:
            sortby = '';
            break;

    }
    $("#listActivity").empty();
    // $('#SelectAll').attr('checked', false);
    for (var j = startIndex; j < endIndex; j++) {
        var articleFlag = true;
        var item = listContracts[j];
        if (item != null) {
            // var item = obligations[i];
            var sMilestoneTitle = item.ObligationTitle;
            var sRowKey = item.RowKey;
            var sMilestoneType = 'Not Available';
            var sInitiator = item.Initiator;
            var sMilestoneDate = 'Not Available';
            var sContractTitle = item.ContractTitle;
            var Validdate = "";
            if (item.DueDate != null) {
                Validdate = moment(item.DueDate).format('Do MMM YYYY')

                if (localStorage.AppDateFormat == null || localStorage.AppDateFormat == "" || localStorage.AppDateFormat == 'undefined') {
                    sMilestoneDate = moment(item.DueDate).format('Do MMM YYYY')
                }
                else {
                    if (localStorage.AppDateFormat == "DD/MM/YYYY")
                        sMilestoneDate = moment(item.DueDate).format('Do MMM YYYY')
                    else
                        sMilestoneDate = moment(item.DueDate).format('MMM Do YYYY')
                }
            }

            if (item.ObligationType != "") {
                sMilestoneType = item.ObligationType;
            }

            var article = '<li>';
            article += '<p id="ObligationID" style="display:none;">' + item.RowKey + '</p>';
            article += '<p id="ObligationTitle" style="display:none;">' + item.ObligationTitle + '</p>';
            article += '<p id="ObligationText" style="display:none;">' + item.ObligationText + '</p>';
            article += '<p id="ObligationRecurrence" style="display:none;">' + item.Recurrences + '</p>';
            article += '<p id="ObligationStatus" style="display:none;">' + item.ObligationStatus + '</p>';
            article += '<p style="padding: 0 12px 0 0 !important">';
            //article += '<input name="" type="checkbox" onclick="checkMultipleObligations(this);" id=' + item.RowKey + ' value="" />';
            article += '<i><a class="doted290px" href="javascript:void(0);" onclick="ViewObligationDetail(\'' + sRowKey + '\')">' + sMilestoneTitle + '</a>';//<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Obligation Menu" class="openobligationmenu" />';
            article += '<small class="PreserveSpace"><cust title="Contract Record Title">' + sContractTitle + '</cust>&nbsp;|&nbsp;<cust title="Obligation Type">' + sMilestoneType + '</cust>&nbsp;|&nbsp;<cust title="Due Date">' + sMilestoneDate + '</cust>';

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
            article += '</small> </i></p> ';

            if (item.ObligationStatus == "Complete") {
                article += '<b class="status_green">Completed</b>';
            }
            else if (item.ObligationStatus == "Cancelled") {
                article += '<b class="status_blue">Cancelled</b>';
            }
            else {
                article += '<b class="status_red">Not Completed</b>';
            }
            article += '</li>';
            $("#listActivity").append(article);

            resultfound = true;

        }

    }
    //$(".openobligationmenu").contextMenu({ menu: 'myObligationMenu', leftButton: true }, function (action, el, pos) { contextMenuObligation(action, el.parent("i").parent("p").parent("li"), pos); });


    //$(".openobligationmenu").click(function () {
    //    $("#dvfilter").hide();
    //});

}

function GenerateObligationTable(obligations) {
    $("#listActivity").html('');
    $("#compact-pagination").css('display', '');
    if (obligations.length == 0) {
        $("#listActivity").append('<p class="f_p-error">No items found.</p>');
        $("#compact-pagination").css('display', 'none');
    }
    else {
        var sortby = '';
        var fieldType = '';
        switch (selectedSortOption) {
            case "Recently Updated":
                sortby = 'Timestamp';
                fieldType = 'date';
                break;

            case "Completed Date":
                sortby = 'ObligationMetDate';
                fieldType = 'date';
                break;
            case "Title(A-Z)":
                vsortby = 'ObligationTitle';
                break;
            case "Title(Z-A)":
                vsortby = 'ObligationTitle';
                break;
            default:
                sortby = '';
                break;
        }

        var datalenght = obligations.length;
        for (var i = 0; i < datalenght; i++) {
            var item = obligations[i];
            var sMilestoneTitle = item.ObligationTitle;
            var sRowKey = item.RowKey;
            var sMilestoneType = 'Not Available';
            var sInitiator = item.Initiator;
            var sMilestoneDate = 'Not Available';
            var sContractTitle = item.ContractTitle;
            var Validdate = "";
            if (item.DueDate != null) {
                Validdate = moment(item.DueDate).format('Do MMM YYYY')

                if (localStorage.AppDateFormat == null || localStorage.AppDateFormat == "" || localStorage.AppDateFormat == 'undefined') {
                    sMilestoneDate = moment(item.DueDate).format('Do MMM YYYY')
                }
                else {
                    if (localStorage.AppDateFormat == "DD/MM/YYYY")
                        sMilestoneDate = moment(item.DueDate).format('Do MMM YYYY')
                    else
                        sMilestoneDate = moment(item.DueDate).format('MMM Do YYYY')
                }

            }

            if (item.ObligationType != "") {
                sMilestoneType = item.ObligationType;
            }

            var article = '<li>';
            article += '<p id="ObligationID" style="display:none;">' + item.RowKey + '</p>';
            article += '<p id="ObligationTitle" style="display:none;">' + item.ObligationTitle + '</p>';
            article += '<p id="ObligationText" style="display:none;">' + item.ObligationText + '</p>';
            article += '<p id="ObligationRecurrence" style="display:none;">' + item.Recurrences + '</p>';
            article += '<p id="ObligationStatus" style="display:none;">' + item.ObligationStatus + '</p>';
            article += '<p style="padding: 0 12px 0 0 !important">';
            //article += '<input name="" type="checkbox" onclick="checkMultipleObligations(this);" id=' + item.RowKey + ' value="" />';
            article += '<i><a href="javascript:void(0);" onclick="ViewObligationDetail(\'' + sRowKey + '\')">' + sMilestoneTitle + '</a>';//<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Obligation Menu" class="openobligationmenu" />';
            article += '<small class="PreserveSpace">' + sContractTitle + '&nbsp;|&nbsp;' + sMilestoneType + '&nbsp;|&nbsp;' + sMilestoneDate;


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
            article += '</small> </i></p> ';

            if (item.ObligationStatus == "Complete") {
                article += '<b class="status_green">Completed</b>';
            }
            else if (item.ObligationStatus == "Cancelled") {
                article += '<b class="status_blue">Cancelled</b>';
            }
            else {
                article += '<b class="status_red">Not Completed</b>';
            }
            article += '</li>';
            $("#listActivity").append(article);


        }

        //$(".openobligationmenu").contextMenu({ menu: 'myObligationMenu', leftButton: true }, function (action, el, pos) { contextMenuObligation(action, el.parent("i").parent("p").parent("li"), pos); });


        //$(".openobligationmenu").click(function () {
        //    $("#dvfilter").hide();
        //});
        $('#compact-pagination').pagination({
            items: datalenght,
            itemsOnPage: 20,
            type: 'ul',
            typeID: 'listActivity',
            row: 'li',
            cssStyle: 'compact-theme',
            resultcount: 'spResult'
        });
    }
}

function ViewObligationDetail(obligationID) {
    isNotObligationOwner = false;
    $("#tblMetadataDetail").empty();
    $("#loadingPage").fadeIn();
    $.ajax({
        url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations?obligationid=' + obligationID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        "Content-Type": "application/json",
        cache: false,
        success: function (obligationentity) {
            BindNewContractDetails(obligationentity.ContractID);
            var vDueDate = "";
            if (obligationentity.DueDate != null) {
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                { vDueDate = obligationentity.DueDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                else {
                    if (localStorage.AppDateFormat == 'DD/MM/YYYY') { vDueDate = obligationentity.DueDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1'); }
                    else if (localStorage.AppDateFormat == 'MM/DD/YYYY') { vDueDate = obligationentity.DueDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                }
            }
            var vMetadata = '<ul class="pOp_Cont Obligation">';
            vMetadata += '<li><p>Contract Record Title</p><span>' + '<a href="/Contracts/ContractDetails?ContractID=' + obligationentity.ContractID + '" target="_blank" "="" style="color: #44a6d8;" title="' + obligationentity.ContractTitle + '">' + obligationentity.ContractTitle + '  <img src="/Content/Images/external_link.png" id="newTabImage"></a>' + '</span></li>';
            vMetadata += '<li id="obligationTitle"><p>Obligation Title</p><span>' + obligationentity.ObligationTitle + '</span></li>';
            vMetadata += '<li><p>Obligation Type</p><span>' + obligationentity.ObligationType + '</span></li>';

            vMetadata += '<li><p>Description</p><span style="word-break: break-all;">';
            if (obligationentity.Description != '') {
                vMetadata += obligationentity.Description;
            }
            else { vMetadata += "-"; }
            vMetadata += '</span></li>';

            vMetadata += '<li><p>Obligation Date</p><span>' + vDueDate + '</span></li>';

            vMetadata += '<li id="obligationOwners"><p>Obligation Owner</p><span>';
            if (obligationentity.ObligationOwner != '') {
                vMetadata += obligationentity.ObligationOwner;
            }
            else { vMetadata += "-"; }
            vMetadata += '</span></li>';

            vMetadata += '<li><p>Obligation Status</p><span>';
            if (obligationentity.ObligationStatus != '') {
                vMetadata += obligationentity.ObligationStatus;
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

            vMetadata += '<li><p>Obligation Met Date</p><span>';
            if (obligationentity.ObligationMetDate != null && obligationentity.ObligationMetDate != '' && obligationentity.ObligationMet == "Yes") {
                var completedate = "";
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                { completedate = moment(new Date(obligationentity.ObligationMetDate)).format('MM/DD/YYYY'); }
                else { completedate = moment(new Date(obligationentity.ObligationMetDate)).format(localStorage.AppDateFormat); }
                vMetadata += completedate;
            }
            else { vMetadata += "-"; }
            vMetadata += '</span></li>';

            vMetadata += '<li><p>Ocurrences</p><span>';
            if (obligationentity.Ocurrences != '' && obligationentity.Ocurrences != null && obligationentity.Ocurrences != 0) {
                vMetadata += obligationentity.Ocurrences;
            }
            else { vMetadata += "-"; }
            vMetadata += '</span></li>';

            vMetadata += '<li><p>Recurrence</p><span>';
            if (obligationentity.Recurrences != '') {

                var rec = "";
                if (obligationentity.Recurrences == "None") {
                    vMetadata += "Never";
                }
                else {
                    vMetadata += obligationentity.Recurrences;
                }
            }
            else { vMetadata += "-"; }
            vMetadata += '</span></li>';
            vMetadata += '<li><p>Obligation Start Date</p><span>';
            if (obligationentity.ObligationStartDate != null && obligationentity.ObligationStartDate != '') {
                var completedate = "";
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                { completedate = moment(new Date(obligationentity.ObligationStartDate)).format('MM/DD/YYYY'); }
                else { completedate = moment(new Date(obligationentity.ObligationStartDate)).format(localStorage.AppDateFormat); }
                vMetadata += completedate;
            }
            else { vMetadata += "-"; }
            vMetadata += '</span></li>';
            vMetadata += '<li><p>Obligation End Date</p><span>';
            if (obligationentity.ObligationEndDate != null && obligationentity.ObligationEndDate != '') {
                var completedate = "";
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                { completedate = moment(new Date(obligationentity.ObligationEndDate)).format('MM/DD/YYYY'); }
                else { completedate = moment(new Date(obligationentity.ObligationEndDate)).format(localStorage.AppDateFormat); }
                vMetadata += completedate;
            }
            else { vMetadata += "-"; }
            vMetadata += '</span></li>';

            //ContractID 
            vMetadata += '<li id="contractID" style="display:none;"><p>ContractID</p><span>' + obligationentity.ContractID + '</span></li>';

            //Obligation ID
            vMetadata += '<li id="obligationID" style="display:none;"><p>ObligationID</p><span>' + obligationentity.RowKey + '</span></li>';
            vMetadata += '<li id="ObligationTEXT" style="display:none;"><p>ObligationTEXT</p><span>' + obligationentity.ObligationText + '</span></li>';
            vMetadata += '</ul>';

            var permissionsAll = newContractItem.ContractManagers + ";" + newContractItem.Approvers + ";" + newContractItem.Reviewers + ";" + newContractItem.Signees
               + ";" + newContractItem.BusinessAreaOwners + ";" + newContractItem.ReadWritePermissions + ";" + newContractItem.FullControlPermissions + ";" + newContractItem.ProjectManager;
            var permissions = $.unique($(permissionsAll.split(';')).map(function (i, item) { return item.trim() }).filter(function (i, item) { return item != ""; }));
            var ogOwners = [];
            if (obligationentity.ObligationOwner != "") {
                if (obligationentity.ObligationOwner.indexOf('{') > -1) {
                    $.ajax({
                        url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/milestones/ownersfromgroup?contractid=' + obligationentity.ContractID + '&milestoneonwers=' + obligationentity.ObligationOwner,
                        type: 'GET',
                        dataType: 'json',
                        headers: { 'eContracts-ApiKey': localStorage.APIKey },
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

            var status = getContractStatus(obligationentity.ContractID);
            var statusArr = ["Replaced", "Expired", "Cancelled", "Archived"];
            $("#loadingPage").fadeOut();
            if (ogOwners != "" && ogOwners != null && ogOwners.indexOf(localStorage.UserName) > -1 && obligationentity.ObligationMet != "Yes" && obligationentity.AutoComplete != "Yes" &&
                obligationentity.ObligationStatus != "Cancelled" && jQuery.inArray(status, statusArr) == -1 && permissions.toArray().indexOf(localStorage.UserName) > -1) {

                isNotObligationOwner = true;
                $("#tblMetadataDetailForOwner").empty();
                $("#tblMetadataDetailForOwner").append(vMetadata);
                $("#btnMarkComplete span").attr('style', 'background-color: transparent; color: #3177b5;font-size: 14px;border: 1px solid #3177b5 !important;');
                $("#btnViewContract span").attr('style', 'font-size: 14px;');
                if (obligationentity.AutoComplete)
                    $("#viewMetadataDetailForOwner").dialog("option", "title", "View Obligation");
                $("#viewMetadataDetailForOwner").dialog("open");
            }
            else {
                isNotObligationOwner = false;
                $("#tblMetadataDetail").empty();
                $("#tblMetadataDetail").append(vMetadata);
                $("#viewMetadataDetail").dialog("option", "title", "View Obligation");
                $("#viewMetadataDetail").dialog("open");
            }
        }
    });
}

var listObligationNewData = "";
var listObligationNewEndDate = "";
var listObligationNewStartDate = "";
var recurence = "";
var recurenceCustomString = "";
var occurences = 1;

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
                   url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations?obligationid=' + obligationID,
                   type: 'DELETE',
                   dataType: 'json',
                   headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                   "Content-Type": "application/json",
                   cache: false,
                   success: function (data) {
                       quickViewMyObligations();
                   }
               });
           }
           return;
       });

                break;
            }
        case "edit":
            {
                isNotObligationOwner = false;
                $("#loadingPage").fadeIn();
                clearObligationFormDataNew();
                vObligationFlaging = "EDIT";
                $("#inprocessObligation").css("visibility", "hidden");
                var obligationID = $(el).find("#ObligationID").text();
                $.ajax({
                    url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations?obligationid=' + obligationID,
                    type: 'GET',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    "Content-Type": "application/json",
                    cache: false,
                    success: function (obligationentity) {
                        vContractID = obligationentity.ContractID;
                        BindContractDetails(vContractID, obligationentity);
                    }
                });

                $(".validelement").each(function (index, element) {
                    $(element).removeClass("error");
                    $("#errormsg_" + element.id).remove();
                });

                $("#obligationnewheading").text("Edit Obligation");
                $("#addEditObligationNew").dialog("option", "title", "");
                $("#addEditObligationNew").dialog("open");
                break;
            }
    }
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


var vObligationTextEditRecurrence = "";
var vObligationFlaging = "";


var vObligationEditStatus = "";

$('#aobligationRecNoneEdit').click(function () {
    vObligationEditStatus = "CHANGERECURRENCE";
    $("#liObligationRecurrence").css('display', '');
    $("#divOcurrenceSummary").css('display', 'none');
    document.getElementById("ddlObligationOccurencess").disabled = false;
    document.getElementById("dtObligationNewDueDate").disabled = false;

    $("#aobligationRecNoneEdit").css('display', 'none');
    $("#aobligationRecEdit").css('display', 'none');



});

$('#aobligationRecEdit').click(function () {
    vObligationEditStatus = "EDITRECURRENCE";

    if ($("#ddlObligationOccurencess").val() == "None") {

        $("#liObligationRecurrence").css('display', '');
        $("#divOcurrenceSummary").css('display', 'none');
        document.getElementById("ddlObligationOccurencess").disabled = false;

    }
    else if ($("#ddlObligationOccurencess").val() == "Weekly") {
        $("#divObligationOcurrenceWeekly").css('display', '');
        $("#divObligationOcurrenceMonthly").css('display', 'none');
        $("#ddlRepeatMonthly").css('display', 'none');

        $("#lblOcurrenceMonth").css('display', 'none');
        $("#lblOcurrenceYear").css('display', 'none');

        $("#divOcurrenceSummary").css('display', '');
        $("#obligationEditOcursumary").css('display', 'none');
        document.getElementById("ddlObligationOccurencess").disabled = false;

        document.getElementById("dtObligationNewDueDate").disabled = false;



        $("#dvobligationOcurrenceEnd").css('display', '');
        $("#liObligationRecurrence").css('display', '');
    }
    else if ($("#ddlObligationOccurencess").val() == "Monthly") {
        $("#divObligationOcurrenceWeekly").css('display', 'none');
        $("#divObligationOcurrenceMonthly").css('display', '');
        $("#ddlRepeatMonthly").css('display', '');

        $("#lblOcurrenceMonth").css('display', '');
        $("#lblOcurrenceYear").css('display', 'none');

        $("#divOcurrenceSummary").css('display', '');
        $("#obligationEditOcursumary").css('display', 'none');
        document.getElementById("ddlObligationOccurencess").disabled = false;
        document.getElementById("dtObligationNewDueDate").disabled = false;


        $("#dvobligationOcurrenceEnd").css('display', '');
        $("#liObligationRecurrence").css('display', '');
    }
    else {
        $("#divObligationOcurrenceWeekly").css('display', 'none');
        $("#divObligationOcurrenceMonthly").css('display', '');
        $("#ddlRepeatMonthly").css('display', 'none');

        $("#lblOcurrenceMonth").css('display', 'none');
        $("#lblOcurrenceYear").css('display', '');

        $("#divOcurrenceSummary").css('display', '');
        $("#obligationEditOcursumary").css('display', 'none');

        document.getElementById("ddlObligationOccurencess").disabled = false;
        document.getElementById("dtObligationNewDueDate").disabled = false;


        $("#dvobligationOcurrenceEnd").css('display', '');
        $("#liObligationRecurrence").css('display', '');
    }


    $("#aobligationRecNoneEdit").css('display', 'none');
    $("#aobligationRecEdit").css('display', 'none');




});




function updateObligationRecurrenceNew(status) {

    var fObligationNewDueDate = '';
    if ($("#dtObligationNewDueDate").val() != "" && $("#dtObligationNewDueDate").val() != null) {
        fObligationNewDueDate = $.datepicker.formatDate('mm/dd/yy', $("#dtObligationNewDueDate").datepicker('getDate'));
    }
    var fObligationNewCompletedDate = "";
    if ($("#dtObligationNewCompletedDate").val() != "" && $("#dtObligationNewCompletedDate").val() != null) {
        fObligationNewCompletedDate = $.datepicker.formatDate('mm/dd/yy', $("#dtObligationNewCompletedDate").datepicker('getDate'));
    }
    var obliCurrency = "";
    if ($("#hdnContractCurrency").text() != "") {
        obliCurrency = $("#hdnContractCurrency").text();
    }
    else if ($("#hdnBaseCurrency").val() != "") {
        obliCurrency = $("#hdnBaseCurrency").val();
    }
    else {
        obliCurrency = "USD";
    }
    if (status == "SINGLE") {
        $("#loadingPage").fadeIn();
        $('.ui-button-green-text').parent().attr('disabled', 'disabled');
        var isformvalid = false;

        isformvalid = true;
        var strContractID = getParameterByName('ContractID');
        var ObligationID = $("#txtObligationNewID").val();
        var arrObligationOwner = $("#ddlObligationNewOwner").val();
        var vObligationOwner = '';
        $(arrObligationOwner).each(function (i, item) {
            if (vObligationOwner == '') {
                vObligationOwner = item;
            }
            else {
                vObligationOwner += "; " + item;
            }
        });

        if ($("#txtObligationNewTitle").val() == "") {
            $("#loadingPage").fadeOut();
            $('.ui-button-green-text').parent().removeAttr('disabled');

            swal("", "Enter Obligation Title.");
        }
        else if ($("#dtObligationNewDueDate").val() == "") {
            $("#loadingPage").fadeOut();
            $('.ui-button-green-text').parent().removeAttr('disabled');
            swal("", "Enter Obligation Due Date.");
        }
        else if (ObligationID != "") {
            $("#inprocessObligation").css('visibility', 'visible');
            var obligationmet = "No";
            var obligationmetby = "";
            var obligationmetdate = null;
            if ($("#ddlObligationStatus").find('option:selected').text() == "Complete") {
                obligationmet = "Yes";
                obligationmetby = localStorage.UserName;
                obligationmetdate = fObligationNewCompletedDate;
            }
            else if ($("#ddlObligationStatus").find('option:selected').text() == "Cancelled") {
                obligationmetdate = fObligationNewCompletedDate;
            }


            var SendReminderToArr = $("#ddlSendReminderToObligationNew").val();
            var vSendReminderTo = '';
            $(SendReminderToArr).each(function (i, item) {
                if (vSendReminderTo == '') {
                    vSendReminderTo = item;
                }
                else {
                    vSendReminderTo += "; " + item;
                }
            });


            $.ajax({
                url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/recurrenceedit?obligationid=' + ObligationID,
                type: 'POST',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                data: {
                    RowKey: ObligationID,
                    ContractID: getParameterByName('ContractID'),
                    ContractTitle: $("#lblCTitleObligationNew").text(),
                    ObligationTitle: $("#txtObligationNewTitle").val(),
                    ObligationType: $("#ddlObligationTypeNew").find('option:selected').text(),
                    Description: $("#txtObligationNewDesc").val(),
                    ObligationOwner: vObligationOwner,
                    DueDate: fObligationNewDueDate,
                    ObligationMetDate: obligationmetdate,
                    ObligationStatus: $("#ddlObligationStatus").find('option:selected').text(),
                    ObligationMet: obligationmet,
                    ObligationMetBy: obligationmetby,
                    ModifiedBy: localStorage.UserName,
                    CompanyProfile: $("#lblCompanyProfile").text(),
                    Counterparty: $("#lblCounterparty").text(),
                    ContractEndDate: $("#hdnOldEndDate").text(),
                    ContractCurrency: obliCurrency,
                    SendReminderTo: vSendReminderTo,
                    Reminder1: $("#txtReminder1ObligationNew").val(),
                    Reminder2: $("#txtReminder2ObligationNew").val(),
                    Reminder3: $("#txtReminder3ObligationNew").val(),
                    Reminder1Condition: encodeURIComponent($("#ddlReminder1ObligationNew").find('option:selected').text()),
                    Reminder2Condition: encodeURIComponent($("#ddlReminder2ObligationNew").find('option:selected').text()),
                    Reminder3Condition: encodeURIComponent($("#ddlReminder3ObligationNew").find('option:selected').text()),
                    AlertsEnabled: $("#AlertObli").val(),
                },
                cache: false,
                success: function (person) {
                    $('.ui-button-green-text').parent().removeAttr('disabled');

                    $("#addEditObligationNew").dialog("close");

                    $("#obligationcatalogsRecurrenceEditPopup").dialog("close");
                    $("#loadingPage").fadeOut();
                    if ($("#hdActivityType").val() == "PendingObligations") {
                        quickViewMyPendingObligations();
                    }
                    else {
                        quickViewMyObligations();
                    }
                },
                complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
            });
        }
    }
    else {
        $("#loadingPage").fadeIn();
        $('.ui-button-green-text').parent().attr('disabled', 'disabled');
        var isformvalid = false;

        isformvalid = true;
        var strContractID = getParameterByName('ContractID');
        var ObligationID = $("#txtObligationNewID").val();
        var arrObligationOwner = $("#ddlObligationNewOwner").val();
        var vObligationOwner = '';
        $(arrObligationOwner).each(function (i, item) {
            if (vObligationOwner == '') {
                vObligationOwner = item;
            }
            else {
                vObligationOwner += "; " + item;
            }
        });

        if ($("#txtObligationNewTitle").val() == "") {
            $("#loadingPage").fadeOut();
            $('.ui-button-green-text').parent().removeAttr('disabled');
            swal("", "Enter Obligation Title.");
        }
        else if ($("#dtObligationNewDueDate").val() == "") {
            $("#loadingPage").fadeOut();
            $('.ui-button-green-text').parent().removeAttr('disabled');

            swal("", "Enter Obligation Due Date.");
        }
        else if (ObligationID != "") {
            if ($('#hdnProductUpdates').text() == "EDITCATALOG") {
                $("#inprocessObligation").css('visibility', 'visible');
                var obligationmet = "No";
                var obligationmetby = "";
                var obligationmetdate = null;
                if ($("#ddlObligationStatus").find('option:selected').text() == "Complete") {
                    obligationmet = "Yes";
                    obligationmetby = localStorage.UserName;
                    obligationmetdate = fObligationNewCompletedDate;
                }
                else if ($("#ddlObligationStatus").find('option:selected').text() == "Cancelled") {
                    obligationmetdate = fObligationNewCompletedDate;
                }


                var SendReminderToArr = $("#ddlSendReminderToObligationNew").val();
                var vSendReminderTo = '';
                $(SendReminderToArr).each(function (i, item) {
                    if (vSendReminderTo == '') {
                        vSendReminderTo = item;
                    }
                    else {
                        vSendReminderTo += "; " + item;
                    }
                });

                $.ajax({
                    url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/updatewithcatalog?strObligationText=' + $("#txtObligationNewText").val() + '&obligationId=' + ObligationID,
                    type: 'POST',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                    data: {
                        RowKey: ObligationID,
                        ContractID: getParameterByName('ContractID'),
                        ContractTitle: $("#lblCTitleObligationNew").text(),
                        ObligationTitle: $("#txtObligationNewTitle").val(),
                        ObligationType: $("#ddlObligationTypeNew").find('option:selected').text(),
                        Description: $("#txtObligationNewDesc").val(),
                        ObligationOwner: vObligationOwner,
                        DueDate: fObligationNewDueDate,
                        ObligationMetDate: obligationmetdate,
                        ObligationStatus: $("#ddlObligationStatus").find('option:selected').text(),
                        ObligationMet: obligationmet,
                        ObligationMetBy: obligationmetby,
                        ModifiedBy: localStorage.UserName,
                        CompanyProfile: $("#lblCompanyProfile").text(),
                        Counterparty: $("#lblCounterparty").text(),
                        ContractEndDate: $("#hdnOldEndDate").text(),
                        ContractCurrency: obliCurrency,
                        SendReminderTo: vSendReminderTo,
                        Reminder1: $("#txtReminder1ObligationNew").val(),
                        Reminder2: $("#txtReminder2ObligationNew").val(),
                        Reminder3: $("#txtReminder3ObligationNew").val(),
                        Reminder1Condition: encodeURIComponent($("#ddlReminder1ObligationNew").find('option:selected').text()),
                        Reminder2Condition: encodeURIComponent($("#ddlReminder2ObligationNew").find('option:selected').text()),
                        Reminder3Condition: encodeURIComponent($("#ddlReminder3ObligationNew").find('option:selected').text()),
                        AlertsEnabled: $("#AlertObli").val(),
                    },
                    cache: false,
                    success: function (person) {
                        $('.ui-button-green-text').parent().removeAttr('disabled');
                        $("#addEditObligationNew").dialog("close");
                        $("#obligationcatalogsRecurrenceEditPopup").dialog("close");
                        $("#loadingPage").fadeOut();
                        quickViewMyObligations();
                    },
                    error: function (data) {
                        $("#loadingPage").fadeOut();
                        $("#inprocessObligation").css('visibility', 'none');
                    }
                });
            }
            else {
                $("#inprocessObligation").css('visibility', 'visible');
                var obligationmet = "No";
                var obligationmetby = "";
                var obligationmetdate = null;
                if ($("#ddlObligationStatus").find('option:selected').text() == "Complete") {
                    obligationmet = "Yes";
                    obligationmetby = localStorage.UserName;
                    obligationmetdate = fObligationNewCompletedDate;
                }
                else if ($("#ddlObligationStatus").find('option:selected').text() == "Cancelled") {
                    obligationmetdate = fObligationNewCompletedDate;
                }

                var SendReminderToArr = $("#ddlSendReminderToObligationNew").val();
                var vSendReminderTo = '';
                $(SendReminderToArr).each(function (i, item) {
                    if (vSendReminderTo == '') {
                        vSendReminderTo = item;
                    }
                    else {
                        vSendReminderTo += "; " + item;
                    }
                });

                $.ajax({
                    url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/updateobligationbyText?strObligationText=' + $("#txtObligationNewText").val() + '&obligationId=' + ObligationID,
                    type: 'POST',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                    data: {
                        RowKey: ObligationID,
                        ContractID: getParameterByName('ContractID'),
                        ContractTitle: $("#lblCTitleObligationNew").text(),
                        ObligationTitle: $("#txtObligationNewTitle").val(),
                        ObligationType: $("#ddlObligationTypeNew").find('option:selected').text(),
                        Description: $("#txtObligationNewDesc").val(),
                        ObligationOwner: vObligationOwner,
                        DueDate: fObligationNewDueDate,
                        ObligationMetDate: obligationmetdate,
                        ObligationStatus: $("#ddlObligationStatus").find('option:selected').text(),
                        ObligationMet: obligationmet,
                        ObligationMetBy: obligationmetby,
                        ModifiedBy: localStorage.UserName,
                        CompanyProfile: $("#lblCompanyProfile").text(),
                        Counterparty: $("#lblCounterparty").text(),
                        ContractEndDate: $("#hdnOldEndDate").text(),
                        ContractCurrency: obliCurrency,
                        SendReminderTo: vSendReminderTo,
                        Reminder1: $("#txtReminder1ObligationNew").val(),
                        Reminder2: $("#txtReminder2ObligationNew").val(),
                        Reminder3: $("#txtReminder3ObligationNew").val(),
                        Reminder1Condition: encodeURIComponent($("#ddlReminder1ObligationNew").find('option:selected').text()),
                        Reminder2Condition: encodeURIComponent($("#ddlReminder2ObligationNew").find('option:selected').text()),
                        Reminder3Condition: encodeURIComponent($("#ddlReminder3ObligationNew").find('option:selected').text()),
                        AlertsEnabled: $("#AlertObli").val(),
                    },
                    cache: false,
                    success: function (person) {
                        $('.ui-button-green-text').parent().removeAttr('disabled');
                        $("#addEditObligationNew").dialog("close");
                        $("#obligationcatalogsRecurrenceEditPopup").dialog("close");
                        $("#loadingPage").fadeOut();
                        quickViewMyObligations();
                    },
                    error: function (data) {
                        $("#loadingPage").fadeOut();
                        $("#inprocessObligation").css('visibility', 'none');
                    }
                });

            }




        }
    }
}




function updateNewObligationsNew(status) {
    var fObligationNewDueDate = '';
    if ($("#dtObligationNewDueDate").val() != "" && $("#dtObligationNewDueDate").val() != null) {
        fObligationNewDueDate = $.datepicker.formatDate('mm/dd/yy', $("#dtObligationNewDueDate").datepicker('getDate'));
    }
    var fObligationNewCompletedDate = "";
    if ($("#dtObligationNewCompletedDate").val() != "" && $("#dtObligationNewCompletedDate").val() != null) {
        fObligationNewCompletedDate = $.datepicker.formatDate('mm/dd/yy', $("#dtObligationNewCompletedDate").datepicker('getDate'));
    }
    var obliCurrency = "";
    if ($("#hdnContractCurrency").text() != "") {
        obliCurrency = $("#hdnContractCurrency").text();
    }
    else if ($("#hdnBaseCurrency").val() != "") {
        obliCurrency = $("#hdnBaseCurrency").val();
    }
    else {
        obliCurrency = "USD";
    }
    if (status == "SINGLE") {

        if (listObligationNewData != "") {
            $("#obligationRecurrenceEditPopup").dialog("close");
            $('#ddlObligationOccurencess').val('None');
            listObligationNewData = "";
            $("#txtObligationNewID").val('');
            AddEditObligationNew();
        }
        else {
            $("#loadingPage").fadeIn();
            $('.ui-button-green-text').parent().attr('disabled', 'disabled');
            var isformvalid = false;

            isformvalid = true;
            var strContractID = getParameterByName('ContractID');
            var ObligationID = $("#txtObligationNewID").val();
            var arrObligationOwner = $("#ddlObligationNewOwner").val();
            var vObligationOwner = '';
            $(arrObligationOwner).each(function (i, item) {
                if (vObligationOwner == '') {
                    vObligationOwner = item;
                }
                else {
                    vObligationOwner += "; " + item;
                }
            });

            if ($("#txtObligationNewTitle").val() == "") {
                $("#loadingPage").fadeOut();
                $('.ui-button-green-text').parent().removeAttr('disabled');
                swal("", "Enter Obligation Title.");
            }
            else if ($("#dtObligationNewDueDate").val() == "") {
                $("#loadingPage").fadeOut();
                $('.ui-button-green-text').parent().removeAttr('disabled');
                swal("", "Enter Obligation Due Date.");
            }
            else if (ObligationID != "") {
                $("#inprocessObligation").css('visibility', 'visible');
                var obligationmet = "No";
                var obligationmetby = "";
                var obligationmetdate = null;
                if ($("#ddlObligationStatus").find('option:selected').text() == "Complete") {
                    obligationmet = "Yes";
                    obligationmetby = localStorage.UserName;
                    obligationmetdate = fObligationNewCompletedDate;
                }
                else if ($("#ddlObligationStatus").find('option:selected').text() == "Cancelled") {
                    obligationmetdate = fObligationNewCompletedDate;
                }

                var SendReminderToArr = $("#ddlSendReminderToObligationNew").val();
                var vSendReminderTo = '';
                $(SendReminderToArr).each(function (i, item) {
                    if (vSendReminderTo == '') {
                        vSendReminderTo = item;
                    }
                    else {
                        vSendReminderTo += "; " + item;
                    }
                });


                $.ajax({
                    url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/recurrenceedit?obligationid=' + ObligationID,
                    type: 'POST',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                    data: {
                        RowKey: ObligationID,
                        ContractID: getParameterByName('ContractID'),
                        ContractTitle: $("#lblCTitleObligationNew").text(),
                        ObligationTitle: $("#txtObligationNewTitle").val(),
                        ObligationType: $("#ddlObligationTypeNew").find('option:selected').text(),
                        Description: $("#txtObligationNewDesc").val(),
                        ObligationOwner: vObligationOwner,
                        DueDate: fObligationNewDueDate,
                        ObligationMetDate: obligationmetdate,
                        ObligationStatus: $("#ddlObligationStatus").find('option:selected').text(),
                        ObligationMet: obligationmet,
                        ObligationMetBy: obligationmetby,
                        ModifiedBy: localStorage.UserName,
                        CompanyProfile: $("#lblCompanyProfile").text(),
                        Counterparty: $("#lblCounterparty").text(),
                        ContractEndDate: $("#hdnOldEndDate").text(),
                        ContractCurrency: obliCurrency,
                        SendReminderTo: vSendReminderTo,
                        Reminder1: $("#txtReminder1ObligationNew").val(),
                        Reminder2: $("#txtReminder2ObligationNew").val(),
                        Reminder3: $("#txtReminder3ObligationNew").val(),
                        Reminder1Condition: encodeURIComponent($("#ddlReminder1ObligationNew").find('option:selected').text()),
                        Reminder2Condition: encodeURIComponent($("#ddlReminder2ObligationNew").find('option:selected').text()),
                        Reminder3Condition: encodeURIComponent($("#ddlReminder3ObligationNew").find('option:selected').text()),
                        AlertsEnabled: $("#AlertObli").val(),
                    },
                    cache: false,
                    success: function (person) {
                        $('.ui-button-green-text').parent().removeAttr('disabled');
                        $("#addEditObligationNew").dialog("close");
                        $("#obligationRecurrenceEditPopup").dialog("close");
                        $("#loadingPage").fadeOut();
                        quickViewMyObligations();
                    },
                    complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                });
            }
        }
    }
    else {
        $("#loadingPage").fadeIn();
        $('.ui-button-green-text').parent().attr('disabled', 'disabled');
        var isformvalid = false;

        isformvalid = true;
        var strContractID = getParameterByName('ContractID');
        var ObligationID = $("#txtObligationNewID").val();
        var arrObligationOwner = $("#ddlObligationNewOwner").val();
        var vObligationOwner = '';
        $(arrObligationOwner).each(function (i, item) {
            if (vObligationOwner == '') {
                vObligationOwner = item;
            }
            else {
                vObligationOwner += "; " + item;
            }
        });

        if ($("#txtObligationNewTitle").val() == "") {
            $("#loadingPage").fadeOut();
            $('.ui-button-green-text').parent().removeAttr('disabled');
            swal("", "Enter Obligation Title.");
        }
        else if ($("#dtObligationNewDueDate").val() == "") {
            $("#loadingPage").fadeOut();
            $('.ui-button-green-text').parent().removeAttr('disabled');
            swal("", "Enter Obligation Due Date.");
        }
        else if (ObligationID != "") {
            if ($('#hdnProductUpdates').text() == "EDITCATALOG") {
                $("#inprocessObligation").css('visibility', 'visible');

                $.ajax({
                    url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/updateUpcoming?strObligationText=' + $("#txtObligationNewText").val() + '&obligationId=' + ObligationID,
                    type: 'POST',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                    cache: false,
                    success: function (person) {

                        $("#obligationcatalogsRecurrenceEditPopup").dialog("close");
                        $("#hdnObligationUniqueId").text('');
                        $("#hdnObligationUniqueId").text(person);
                        $("#txtObligationNewID").val('');
                        AddEditObligationNew();
                        $("#obligationRecurrenceEditPopup").dialog("close");
                    },
                    error: function (data) {
                        $("#obligationRecurrenceEditPopup").dialog("close");
                        $("#loadingPage").fadeOut();
                        $("#inprocessObligation").css('visibility', 'none');
                    }
                });
            }
            else {
                $("#inprocessObligation").css('visibility', 'visible');
                $.ajax({
                    url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/updateUpcoming?strObligationText=' + $("#txtObligationNewText").val() + '&obligationId=' + ObligationID,
                    type: 'POST',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                    cache: false,
                    success: function (person) {
                        $("#obligationcatalogsRecurrenceEditPopup").dialog("close");
                        $("#hdnObligationUniqueId").text('');
                        $("#hdnObligationUniqueId").text(person);
                        $("#txtObligationNewID").val('');
                        AddEditObligationNew();
                        $("#obligationRecurrenceEditPopup").dialog("close");
                    },
                    error: function (data) {
                        $("#loadingPage").fadeOut();
                        $("#obligationRecurrenceEditPopup").dialog("close");
                        $("#inprocessObligation").css('visibility', 'none');
                    }
                });

            }
        }
    }
}






function AddEditObligationNew() {
    if ($("#ddlObligationStatus").find('option:selected').text() == "Complete") {
        if (validateproducts) {
            modalonOpenObligationNewEdit();
        }
        else {
            swal("", "Related Catalog status need to be completed.");
        }
    }
    else {
        if ($("input:radio[name=ObligationNewAutoComplete]:checked").val() == "Yes") {
            if (!isNotObligationOwner) {
                if (validateproducts) {
                    modalonOpenObligationNewEdit();
                }
                else {
                    swal("", "Obligation will be auto completed only if all the Products/Services & Commitments are completed before Start/Due date.");
                    modalonOpenObligationNewEdit();
                }
            }
        }
        else {
            if (!isNotObligationOwner)
                modalonOpenObligationNewEdit();
        }
    }
}


function modalonOpenObligationNewEdit() {
    var fObligationNewDueDate = '';
    if ($("#dtObligationNewDueDate").val() != "" && $("#dtObligationNewDueDate").val() != null) {
        fObligationNewDueDate = $.datepicker.formatDate('mm/dd/yy', $("#dtObligationNewDueDate").datepicker('getDate'));
    }
    var fObligationNewCompletedDate = '';
    if ($("#dtObligationNewCompletedDate").val() != "" && $("#dtObligationNewCompletedDate").val() != null) {
        fObligationNewCompletedDate = $.datepicker.formatDate('mm/dd/yy', $("#dtObligationNewCompletedDate").datepicker('getDate'));
    }
    if ($('#hdnObligationUniqueId').text() != null && $('#hdnObligationUniqueId').text() != "" && $('#hdnObligationUniqueId').text() != "null") {
        $('.ui-button-green-text').parent().attr('disabled', 'disabled');
        var isformvalid = false;

        isformvalid = true;
        var strContractID = vContractID;
        var ObligationID = $("#txtObligationNewID").val();
        var arrObligationOwner = $("#ddlObligationNewOwner").val();
        var vObligationOwner = '';
        $(arrObligationOwner).each(function (i, item) {
            if (vObligationOwner == '') {
                vObligationOwner = item;
            }
            else {
                vObligationOwner += "; " + item;
            }
        });

        if (requiredValidator('obligationreqvalidator1')) {

            if (requiredValidator('obligationreqvalidator2')) {
                if (requiredValidator('dvObliOccurrenceDates')) {
                    if (comparedatestatus($.datepicker.formatDate('mm/dd/yy', $("#dtObligationNewDueDate").datepicker('getDate')), $("#ddlObligationStatus").val())) {
                        $("#loadingPage").fadeIn();
                        if (ObligationID != "") {

                            if (vObligationEditStatus != "") {
                                if (vObligationEditStatus == "CHANGERECURRENCE") {

                                    if ($('#ddlObligationOccurencess').val() != "None") {
                                        vObligationTextEditRecurrence = $("#txtObligationNewText").val();
                                        $("#txtObligationNewID").val("");
                                        //   addEditObligationNew();
                                        AddEditObligationNew();

                                    }
                                    else {
                                        $("#inprocessObligation").css('visibility', 'visible');

                                        var obligationmet = "No";
                                        var obligationmetby = "";
                                        //Newly Added
                                        var obligationmetdate = null;
                                        if ($("#ddlObligationStatus").find('option:selected').text() == "Complete") {
                                            obligationmet = "Yes";
                                            obligationmetby = localStorage.UserName;
                                            obligationmetdate = fObligationNewCompletedDate;
                                        }
                                        else if ($("#ddlObligationStatus").find('option:selected').text() == "Cancelled") {
                                            obligationmetdate = fObligationNewCompletedDate;
                                        }
                                        var obliCurrency = "";
                                        if ($("#hdnContractCurrency").text() != "") {
                                            obliCurrency = $("#hdnContractCurrency").text();
                                        }
                                        else if ($("#hdnBaseCurrency").val() != "") {
                                            obliCurrency = $("#hdnBaseCurrency").val();
                                        }
                                        else {
                                            obliCurrency = "USD";
                                        }

                                        var SendReminderToArr = $("#ddlSendReminderToObligationNew").val();
                                        var vSendReminderTo = '';
                                        $(SendReminderToArr).each(function (i, item) {
                                            if (vSendReminderTo == '') {
                                                vSendReminderTo = item;
                                            }
                                            else {
                                                vSendReminderTo += "; " + item;
                                            }
                                        });


                                        $.ajax({
                                            url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew?obligationid=' + ObligationID,
                                            type: 'POST',
                                            dataType: 'json',
                                            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                                            data: {
                                                RowKey: ObligationID,
                                                ContractID: vContractID,
                                                ContractTitle: $("#lblCTitleObligationNew").text(),
                                                ObligationTitle: $("#txtObligationNewTitle").val(),
                                                ObligationType: $("#ddlObligationTypeNew").find('option:selected').text(),
                                                Description: $("#txtObligationNewDesc").val(),
                                                ObligationOwner: vObligationOwner,
                                                DueDate: fObligationNewDueDate,
                                                ObligationMetDate: obligationmetdate,
                                                ObligationStatus: $("#ddlObligationStatus").find('option:selected').text(),
                                                ObligationMet: obligationmet,
                                                ObligationMetBy: obligationmetby,
                                                ModifiedBy: localStorage.UserName,
                                                ObligationMetBy: obligationmetby,
                                                CompanyProfile: $("#lblCompanyProfile").text(),
                                                Counterparty: $("#lblCounterparty").text(),
                                                ContractEndDate: $("#hdnOldEndDate").text(),
                                                ContractCurrency: obliCurrency,
                                                SendReminderTo: vSendReminderTo,
                                                Reminder1: $("#txtReminder1ObligationNew").val(),
                                                Reminder2: $("#txtReminder2ObligationNew").val(),
                                                Reminder3: $("#txtReminder3ObligationNew").val(),
                                                Reminder1Condition: encodeURIComponent($("#ddlReminder1ObligationNew").find('option:selected').text()),
                                                Reminder2Condition: encodeURIComponent($("#ddlReminder2ObligationNew").find('option:selected').text()),
                                                Reminder3Condition: encodeURIComponent($("#ddlReminder3ObligationNew").find('option:selected').text()),
                                                AlertsEnabled: $("#AlertObli").val(),
                                                PerformedBy: encodeURIComponent($("input:radio[name=PerformedParty]:checked").val()),
                                                ShowInCalendar: $("input:radio[name=ShowInObligCalendar]:checked").val(),
                                                Priority: $("#ddlObligationNewPriority").find('option:selected').val(),
                                                AutoComplete: $("input:radio[name=ObligationNewAutoComplete]:checked").val(),
                                            },
                                            cache: false,
                                            success: function (person) {
                                                $('.ui-button-green-text').parent().removeAttr('disabled');

                                                $("#addEditObligationNew").dialog("close");
                                                $("#loadingPage").fadeOut();
                                                quickViewMyObligations();
                                            },
                                            complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                                        });



                                    }
                                }
                                else if (vObligationEditStatus == "EDITRECURRENCE") {
                                    if (listObligationNewData != "") {

                                        vObligationTextEditRecurrence = $("#txtObligationNewText").val();

                                        $("#loadingPage").fadeOut();
                                        $("#obligationRecurrenceEditPopup").dialog("option", "title", "Edit Repeat Obligation");
                                        $("#obligationRecurrenceEditPopup").dialog("open");


                                    }
                                    else {
                                        if ($('#ddlObligationOccurencess').val() == "None") {

                                            vObligationTextEditRecurrence = $("#txtObligationNewText").val();

                                            $("#loadingPage").fadeOut();
                                            $("#obligationRecurrenceEditPopup").dialog("option", "title", "Edit Repeat Obligation");
                                            $("#obligationRecurrenceEditPopup").dialog("open");


                                        }
                                        else {
                                            $("#loadingPage").fadeOut();
                                            $("#obligationcatalogsRecurrenceEditPopup").dialog("option", "title", "Edit Repeat Obligation");
                                            $("#obligationcatalogsRecurrenceEditPopup").dialog("open");

                                        }


                                    }
                                }
                                else {
                                    if ($('#ddlObligationOccurencess').val() == "None") {
                                        $("#inprocessObligation").css('visibility', 'visible');
                                        var obligationmet = "No";
                                        var obligationmetby = "";
                                        //Newly Added
                                        var obligationmetdate = null;
                                        if ($("#ddlObligationStatus").find('option:selected').text() == "Complete") {
                                            obligationmet = "Yes";
                                            obligationmetby = localStorage.UserName;
                                            obligationmetdate = fObligationNewCompletedDate;
                                        }
                                        else if ($("#ddlObligationStatus").find('option:selected').text() == "Cancelled") {
                                            obligationmetdate = fObligationNewCompletedDate;
                                        }
                                        var obliCurrency = "";
                                        if ($("#hdnContractCurrency").text() != "") {
                                            obliCurrency = $("#hdnContractCurrency").text();
                                        }
                                        else if ($("#hdnBaseCurrency").val() != "") {
                                            obliCurrency = $("#hdnBaseCurrency").val();
                                        }
                                        else {
                                            obliCurrency = "USD";
                                        }


                                        var SendReminderToArr = $("#ddlSendReminderToObligationNew").val();
                                        var vSendReminderTo = '';
                                        $(SendReminderToArr).each(function (i, item) {
                                            if (vSendReminderTo == '') {
                                                vSendReminderTo = item;
                                            }
                                            else {
                                                vSendReminderTo += "; " + item;
                                            }
                                        });

                                        $.ajax({
                                            url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew?obligationid=' + ObligationID,
                                            type: 'POST',
                                            dataType: 'json',
                                            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                                            data: {
                                                RowKey: ObligationID,
                                                ContractID: vContractID,
                                                ContractTitle: $("#lblCTitleObligationNew").text(),
                                                ObligationTitle: $("#txtObligationNewTitle").val(),
                                                ObligationType: $("#ddlObligationTypeNew").find('option:selected').text(),
                                                Description: $("#txtObligationNewDesc").val(),
                                                ObligationOwner: vObligationOwner,
                                                DueDate: fObligationNewDueDate,
                                                ObligationMetDate: obligationmetdate,
                                                ObligationStatus: $("#ddlObligationStatus").find('option:selected').text(),
                                                ObligationMet: obligationmet,
                                                ObligationMetBy: obligationmetby,
                                                ModifiedBy: localStorage.UserName,
                                                ObligationMetBy: obligationmetby,
                                                CompanyProfile: $("#lblCompanyProfile").text(),
                                                Counterparty: $("#lblCounterparty").text(),
                                                ContractEndDate: $("#hdnOldEndDate").text(),
                                                ContractCurrency: obliCurrency,
                                                SendReminderTo: vSendReminderTo,
                                                Reminder1: $("#txtReminder1ObligationNew").val(),
                                                Reminder2: $("#txtReminder2ObligationNew").val(),
                                                Reminder3: $("#txtReminder3ObligationNew").val(),
                                                Reminder1Condition: encodeURIComponent($("#ddlReminder1ObligationNew").find('option:selected').text()),
                                                Reminder2Condition: encodeURIComponent($("#ddlReminder2ObligationNew").find('option:selected').text()),
                                                Reminder3Condition: encodeURIComponent($("#ddlReminder3ObligationNew").find('option:selected').text()),
                                                AlertsEnabled: $("#AlertObli").val(),
                                                PerformedBy: encodeURIComponent($("input:radio[name=PerformedParty]:checked").val()),
                                                ShowInCalendar: $("input:radio[name=ShowInObligCalendar]:checked").val(),
                                                Priority: $("#ddlObligationNewPriority").find('option:selected').val(),
                                                AutoComplete: $("input:radio[name=ObligationNewAutoComplete]:checked").val(),
                                            },
                                            cache: false,
                                            success: function (person) {
                                                $('.ui-button-green-text').parent().removeAttr('disabled');

                                                $("#addEditObligationNew").dialog("close");
                                                $("#loadingPage").fadeOut();

                                                quickViewMyObligations();
                                            },
                                            complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                                        });

                                    }
                                    else {
                                        $("#loadingPage").fadeOut();
                                        $("#obligationcatalogsRecurrenceEditPopup").dialog("option", "title", "Edit Repeat Obligation");
                                        $("#obligationcatalogsRecurrenceEditPopup").dialog("open");
                                    }
                                }

                            }
                            else {
                                if ($('#ddlObligationOccurencess').val() == "None") {
                                    $("#inprocessObligation").css('visibility', 'visible');
                                    var obligationmet = "No";
                                    var obligationmetby = "";
                                    //Newly Added
                                    var obligationmetdate = null;
                                    if ($("#ddlObligationStatus").find('option:selected').text() == "Complete") {
                                        obligationmet = "Yes";
                                        obligationmetby = localStorage.UserName;
                                        obligationmetdate = fObligationNewCompletedDate;
                                    }
                                    else if ($("#ddlObligationStatus").find('option:selected').text() == "Cancelled") {
                                        obligationmetdate = fObligationNewCompletedDate;
                                    }

                                    var obliCurrency = "";
                                    if ($("#hdnContractCurrency").text() != "") {
                                        obliCurrency = $("#hdnContractCurrency").text();
                                    }
                                    else if ($("#hdnBaseCurrency").val() != "") {
                                        obliCurrency = $("#hdnBaseCurrency").val();
                                    }
                                    else {
                                        obliCurrency = "USD";
                                    }

                                    var SendReminderToArr = $("#ddlSendReminderToObligationNew").val();
                                    var vSendReminderTo = '';
                                    $(SendReminderToArr).each(function (i, item) {
                                        if (vSendReminderTo == '') {
                                            vSendReminderTo = item;
                                        }
                                        else {
                                            vSendReminderTo += "; " + item;
                                        }
                                    });

                                    $.ajax({
                                        url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew?obligationid=' + ObligationID,
                                        type: 'POST',
                                        dataType: 'json',
                                        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                                        data: {
                                            RowKey: ObligationID,
                                            ContractID: vContractID,
                                            ContractTitle: $("#lblCTitleObligationNew").text(),
                                            ObligationTitle: $("#txtObligationNewTitle").val(),
                                            ObligationType: $("#ddlObligationTypeNew").find('option:selected').text(),
                                            Description: $("#txtObligationNewDesc").val(),
                                            ObligationOwner: vObligationOwner,
                                            DueDate: fObligationNewDueDate,
                                            ObligationMetDate: obligationmetdate,
                                            ObligationStatus: $("#ddlObligationStatus").find('option:selected').text(),
                                            ObligationMet: obligationmet,
                                            ObligationMetBy: obligationmetby,
                                            ModifiedBy: localStorage.UserName,
                                            ObligationMetBy: obligationmetby,
                                            CompanyProfile: $("#lblCompanyProfile").text(),
                                            Counterparty: $("#lblCounterparty").text(),
                                            ContractEndDate: $("#hdnOldEndDate").text(),
                                            ContractCurrency: obliCurrency,
                                            SendReminderTo: vSendReminderTo,
                                            Reminder1: $("#txtReminder1ObligationNew").val(),
                                            Reminder2: $("#txtReminder2ObligationNew").val(),
                                            Reminder3: $("#txtReminder3ObligationNew").val(),
                                            Reminder1Condition: encodeURIComponent($("#ddlReminder1ObligationNew").find('option:selected').text()),
                                            Reminder2Condition: encodeURIComponent($("#ddlReminder2ObligationNew").find('option:selected').text()),
                                            Reminder3Condition: encodeURIComponent($("#ddlReminder3ObligationNew").find('option:selected').text()),
                                            AlertsEnabled: $("#AlertObli").val(),
                                            PerformedBy: encodeURIComponent($("input:radio[name=PerformedParty]:checked").val()),
                                            ShowInCalendar: $("input:radio[name=ShowInObligCalendar]:checked").val(),
                                            Priority: $("#ddlObligationNewPriority").find('option:selected').val(),
                                            AutoComplete: $("input:radio[name=ObligationNewAutoComplete]:checked").val(),
                                        },
                                        cache: false,
                                        success: function (person) {
                                            $('.ui-button-green-text').parent().removeAttr('disabled');
                                            $("#addEditObligationNew").dialog("close");
                                            $("#loadingPage").fadeOut();
                                            if ($("#hdActivityType").val() == "PendingObligations") {
                                                quickViewMyPendingObligations();
                                            }
                                            else {
                                                quickViewMyObligations();
                                            }
                                        },
                                        complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                                    });


                                }
                                else {
                                    $("#loadingPage").fadeOut();
                                    $("#obligationcatalogsRecurrenceEditPopup").dialog("option", "title", "Edit Repeat Obligation");
                                    $("#obligationcatalogsRecurrenceEditPopup").dialog("open");
                                }
                            }
                        }
                        else {
                            $("#inprocessObligation").css('visibility', 'visible');


                            if ($('#ddlObligationOccurencess').val() != "None") {

                                var obligationmet = "No";
                                var obligationmetby = "";
                                //Newly Added
                                var obligationmetdate = null;
                                if ($("#ddlObligationStatus").find('option:selected').text() == "Complete") {
                                    obligationmet = "Yes";
                                    obligationmetby = localStorage.UserName;
                                    obligationmetdate = fObligationNewCompletedDate;
                                }
                                else if ($("#ddlObligationStatus").find('option:selected').text() == "Cancelled") {
                                    obligationmetdate = fObligationNewCompletedDate;
                                }

                                var obliCurrency = "";
                                if ($("#hdnContractCurrency").text() != "") {
                                    obliCurrency = $("#hdnContractCurrency").text();
                                }
                                else if ($("#hdnBaseCurrency").val() != "") {
                                    obliCurrency = $("#hdnBaseCurrency").val();
                                }
                                else {
                                    obliCurrency = "USD";
                                }

                                var SendReminderToArr = $("#ddlSendReminderToObligationNew").val();
                                var vSendReminderTo = '';
                                $(SendReminderToArr).each(function (i, item) {
                                    if (vSendReminderTo == '') {
                                        vSendReminderTo = item;
                                    }
                                    else {
                                        vSendReminderTo += "; " + item;
                                    }
                                });

                                var formData = new FormData();
                                var contractForm = "ContractID=" + vContractID;
                                contractForm += "&ContractTitle=" + encodeURIComponent($("#lblCTitleObligationNew").text());
                                contractForm += "&ObligationTitle=" + encodeURIComponent($("#txtObligationNewTitle").val());

                                contractForm += "&ObligationType=" + $("#ddlObligationTypeNew").find('option:selected').text();
                                contractForm += "&Description=" + $("#txtObligationNewDesc").val();

                                contractForm += "&ObligationOwner=" + encodeURIComponent(vObligationOwner);
                                contractForm += "&CreatedBy=" + encodeURIComponent(localStorage.UserName);
                                contractForm += "&ModifiedBy=" + encodeURIComponent(localStorage.UserName);
                                contractForm += "&PerformedBy=" + encodeURIComponent($("input:radio[name=PerformedParty]:checked").val());
                                contractForm += "&ObligationStatus=" + encodeURIComponent($("#ddlObligationStatus").find('option:selected').text());
                                contractForm += "&Ocurrences=" + encodeURIComponent(occurences);
                                contractForm += "&Recurrences=" + encodeURIComponent($('#ddlObligationOccurencess').val());
                                contractForm += "&CustomString=" + encodeURIComponent(recurenceCustomString);
                                contractForm += "&ObligationEndTerm=" + encodeURIComponent($("input:radio[name=SelectOccurenceEndDate]:checked").val());
                                contractForm += "&ObligationMet=" + encodeURIComponent(obligationmet);
                                contractForm += "&ObligationMetBy=" + encodeURIComponent(obligationmetby);

                                contractForm += "&CompanyProfile=" + encodeURIComponent($("#lblCompanyProfile").text());
                                contractForm += "&Counterparty=" + encodeURIComponent($("#lblCounterparty").text());
                                contractForm += "&ContractEndDate=" + encodeURIComponent($("#hdnOldEndDate").text());
                                contractForm += "&ContractCurrency=" + encodeURIComponent(obliCurrency);
                                contractForm += "&ObligationMetDate=" + encodeURIComponent(obligationmetdate);

                                contractForm += "&SendReminderTo=" + encodeURIComponent(vSendReminderTo);
                                contractForm += "&Reminder1=" + $("#txtReminder1ObligationNew").val();
                                contractForm += "&Reminder2=" + $("#txtReminder2ObligationNew").val();
                                contractForm += "&Reminder3=" + $("#txtReminder3ObligationNew").val();
                                contractForm += "&Reminder1Condition=" + encodeURIComponent($("#ddlReminder1ObligationNew").find('option:selected').text());
                                contractForm += "&Reminder2Condition=" + encodeURIComponent($("#ddlReminder2ObligationNew").find('option:selected').text());
                                contractForm += "&Reminder3Condition=" + encodeURIComponent($("#ddlReminder3ObligationNew").find('option:selected').text());


                                contractForm += "&ShowInCalendar=" + encodeURIComponent($("input:radio[name=ShowInObligCalendar]:checked").val());
                                contractForm += "&Priority=" + encodeURIComponent($("#ddlObligationNewPriority").find('option:selected').val());
                                contractForm += "&AutoComplete=" + encodeURIComponent($("input:radio[name=ObligationNewAutoComplete]:checked").val());

                                if ($('#ddlObligationOccurencess').val() == "Monthly") {
                                    contractForm += "&RecMonthlyString=" + encodeURIComponent($("#ddlRepeatMonthly").find('option:selected').text());
                                }
                                else {
                                    contractForm += "&RecMonthlyString=" + "";
                                }




                                formData.append("SearializeControls", contractForm);


                                var occurrenceForm = "EndDate=" + listObligationNewData.EndDate;
                                occurrenceForm += "&LastDate=" + encodeURIComponent(listObligationNewData.LastDate);
                                occurrenceForm += "&StartDate=" + encodeURIComponent(listObligationNewData.StartDate);
                                var strvalues = "";
                                var Values = listObligationNewData.Values;
                                for (var j = 0; j < Values.length; j++) {
                                    strvalues += Values[j] + ",";
                                }

                                strvalues = removeLastChar(strvalues, ',');
                                occurrenceForm += "&Values=" + strvalues;

                                formData.append("objoccurrence", occurrenceForm);

                                $.ajax({
                                    url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnewadvanced?obligationtext=' + $('#hdnObligationUniqueId').text() + '&obligationId=' + $('#hdnObligationRowKey').text(),
                                    type: 'POST',
                                    dataType: 'json',
                                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                                    data: formData,
                                    cache: false,
                                    contentType: false,
                                    processData: false,
                                    async: false,
                                    success: function (person) {
                                        $('.ui-button-green-text').parent().removeAttr('disabled');


                                        if (vObligationFlaging == "EDIT") {


                                        }
                                        else {

                                        }
                                        if ($('#txtObligationProductsCount').val() == "Yes") {

                                        }
                                        if ($('#txtObligationFinancialsCount').val() == "Yes") {

                                            $.ajax({
                                                url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationfinancials/updateobligationtext?obligationtext=' + person,
                                                type: 'POST',
                                                dataType: 'json',
                                                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                                                cache: false,
                                                success: function (data) {

                                                },
                                                error: function (data) {
                                                    $("#loadingPage").fadeOut();
                                                }
                                            });
                                        }
                                        $("#addEditObligationNew").dialog("close");
                                        clearObligationFormDataNew();
                                        $("#loadingPage").fadeOut();

                                        quickViewMyObligations();
                                    },
                                    error: function (data) {
                                        $("#loadingPage").fadeOut();
                                    },
                                    complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                                });
                            }
                            else {
                                var vRecurrence = "";
                                var vRecurrenceCustom = "";
                                var vOcurence = "";
                                vRecurrence = "None";
                                vRecurrenceCustom = "None";
                                vOcurence = 1;

                                var obligationmet = "No";
                                var obligationmetby = "";
                                //Newly Added
                                var obligationmetdate = null;
                                if ($("#ddlObligationStatus").find('option:selected').text() == "Complete") {
                                    obligationmet = "Yes";
                                    obligationmetby = localStorage.UserName;
                                    obligationmetdate = fObligationNewCompletedDate;
                                }
                                else if ($("#ddlObligationStatus").find('option:selected').text() == "Cancelled") {
                                    obligationmetdate = fObligationNewCompletedDate;
                                }

                                var obliCurrency = "";
                                if ($("#hdnContractCurrency").text() != "") {
                                    obliCurrency = $("#hdnContractCurrency").text();
                                }
                                else if ($("#hdnBaseCurrency").val() != "") {
                                    obliCurrency = $("#hdnBaseCurrency").val();
                                }
                                else {
                                    obliCurrency = "USD";
                                }

                                var SendReminderToArr = $("#ddlSendReminderToObligationNew").val();
                                var vSendReminderTo = '';
                                $(SendReminderToArr).each(function (i, item) {
                                    if (vSendReminderTo == '') {
                                        vSendReminderTo = item;
                                    }
                                    else {
                                        vSendReminderTo += "; " + item;
                                    }
                                });

                                var formData = new FormData();
                                var contractForm = "ContractID=" + vContractID;
                                contractForm += "&ContractTitle=" + encodeURIComponent($("#lblCTitleObligationNew").text());
                                contractForm += "&ObligationTitle=" + encodeURIComponent($("#txtObligationNewTitle").val());

                                contractForm += "&ObligationType=" + $("#ddlObligationTypeNew").find('option:selected').text();
                                contractForm += "&Description=" + $("#txtObligationNewDesc").val();

                                contractForm += "&ObligationOwner=" + encodeURIComponent(vObligationOwner);
                                contractForm += "&DueDate=" + encodeURIComponent(fObligationNewDueDate);
                                contractForm += "&CreatedBy=" + encodeURIComponent(localStorage.UserName);
                                contractForm += "&ModifiedBy=" + encodeURIComponent(localStorage.UserName);
                                contractForm += "&PerformedBy=" + encodeURIComponent($("input:radio[name=PerformedParty]:checked").val());
                                contractForm += "&ObligationStatus=" + encodeURIComponent($("#ddlObligationStatus").find('option:selected').text());
                                contractForm += "&Ocurrences=" + encodeURIComponent(vOcurence);
                                contractForm += "&Recurrences=" + encodeURIComponent($('#ddlObligationOccurencess').val());
                                contractForm += "&CustomString=" + encodeURIComponent(vRecurrenceCustom);
                                contractForm += "&RecMonthlyString=" + encodeURIComponent("None");
                                contractForm += "&ObligationEndTerm=" + encodeURIComponent($("input:radio[name=SelectOccurenceEndDate]:checked").val());
                                contractForm += "&RecMonthlyString=" + "";
                                contractForm += "&ObligationMet=" + obligationmet;
                                contractForm += "&ObligationMetBy=" + encodeURIComponent(obligationmetby);
                                contractForm += "&CompanyProfile=" + encodeURIComponent($("#lblCompanyProfile").text());
                                contractForm += "&Counterparty=" + encodeURIComponent($("#lblCounterparty").text());
                                contractForm += "&ContractEndDate=" + encodeURIComponent($("#hdnOldEndDate").text());
                                contractForm += "&ContractCurrency=" + encodeURIComponent(obliCurrency);
                                contractForm += "&ObligationMetDate=" + encodeURIComponent(obligationmetdate);

                                contractForm += "&SendReminderTo=" + encodeURIComponent(vSendReminderTo);
                                contractForm += "&Reminder1=" + $("#txtReminder1ObligationNew").val();
                                contractForm += "&Reminder2=" + $("#txtReminder2ObligationNew").val();
                                contractForm += "&Reminder3=" + $("#txtReminder3ObligationNew").val();
                                contractForm += "&Reminder1Condition=" + encodeURIComponent($("#ddlReminder1ObligationNew").find('option:selected').text());
                                contractForm += "&Reminder2Condition=" + encodeURIComponent($("#ddlReminder2ObligationNew").find('option:selected').text());
                                contractForm += "&Reminder3Condition=" + encodeURIComponent($("#ddlReminder3ObligationNew").find('option:selected').text());

                                contractForm += "&ShowInCalendar=" + encodeURIComponent($("input:radio[name=ShowInObligCalendar]:checked").val());
                                contractForm += "&Priority=" + encodeURIComponent($("#ddlObligationNewPriority").find('option:selected').val());
                                contractForm += "&AutoComplete=" + encodeURIComponent($("input:radio[name=ObligationNewAutoComplete]:checked").val());

                                formData.append("SearializeControls", contractForm);

                                formData.append("objoccurrence", "");

                                $.ajax({
                                    url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnewadvanced?obligationtext=' + $('#hdnObligationUniqueId').text() + '&obligationId=' + $('#hdnObligationRowKey').text(),
                                    type: 'POST',
                                    dataType: 'json',
                                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                                    data: formData,
                                    cache: false,
                                    contentType: false,
                                    processData: false,
                                    async: false,
                                    success: function (person) {
                                        $('.ui-button-green-text').parent().removeAttr('disabled');






                                        $("#addEditObligationNew").dialog("close");
                                        $("#loadingPage").fadeOut();

                                        clearObligationFormDataNew();
                                        $("#loadingPage").fadeOut();

                                        quickViewMyObligations();
                                    },
                                    error: function (data) {
                                        $("#loadingPage").fadeOut();
                                    },
                                    complete: function () { clearObligationFormDataNew(); $("#loadingPage").fadeOut(); $("#inprocessObligation").css('visibility', 'none'); }
                                });
                            }


                        }
                    }
                    else {
                        $("#loadingPage").fadeOut();
                        isformvalid = false;
                        $("#ddlObligationStatus").addClass('error');
                        $('html, body').animate({ scrollTop: 0 }, 'fast');

                    }
                }
                else {
                    $("#loadingPage").fadeOut();
                    if ($('#dvObliOccurrenceDates').is(':hidden')) {
                        //do something
                        $('#dvObliOccurrenceDates').slideToggle();
                        $('#imgObliga').attr("title", "Collapse");
                        $('#imgObliga').attr("src", "../Content/Images/e-close.png");


                    }

                    $('.ui-button-green-text').parent().removeAttr('disabled');

                }

            }
            else {
                $("#loadingPage").fadeOut();
                $('.ui-button-green-text').parent().removeAttr('disabled');

            }

        }
        else {
            $("#loadingPage").fadeOut();
            $('.ui-button-green-text').parent().removeAttr('disabled');

        }
        $('.ui-button-green-text').parent().removeAttr('disabled');

        return isformvalid;
    }
    else {

        $('.ui-button-green-text').parent().attr('disabled', 'disabled');
        var isformvalid = false;

        isformvalid = true;
        var strContractID = vContractID;
        var ObligationID = $("#txtObligationNewID").val();
        var arrObligationOwner = $("#ddlObligationNewOwner").val();
        var vObligationOwner = '';
        $(arrObligationOwner).each(function (i, item) {
            if (vObligationOwner == '') {
                vObligationOwner = item;
            }
            else {
                vObligationOwner += "; " + item;
            }
        });

        if (requiredValidator('obligationreqvalidator1')) {

            if (requiredValidator('obligationreqvalidator2')) {
                if (requiredValidator('dvObliOccurrenceDates')) {
                    $("#loadingPage").fadeIn();
                    if (ObligationID != "") {

                        if (vObligationEditStatus != "") {
                            if (vObligationEditStatus == "CHANGERECURRENCE") {

                                if ($('#ddlObligationOccurencess').val() != "None") {

                                    vObligationTextEditRecurrence = $("#txtObligationNewText").val();

                                    $.ajax({
                                        url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations?obligationid=' + ObligationID,
                                        type: 'DELETE',
                                        dataType: 'json',
                                        headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                                        "Content-Type": "application/json",
                                        cache: false,
                                        success: function (data) {
                                            $("#txtObligationNewID").val("");
                                            AddEditObligationNew();
                                        }
                                    });
                                }
                                else {
                                    $("#inprocessObligation").css('visibility', 'visible');

                                    var obligationmet = "No";
                                    var obligationmetby = "";
                                    //Newly Added
                                    var obligationmetdate = null;
                                    if ($("#ddlObligationStatus").find('option:selected').text() == "Complete") {
                                        obligationmet = "Yes";
                                        obligationmetby = localStorage.UserName;
                                        obligationmetdate = fObligationNewCompletedDate;
                                    }
                                    else if ($("#ddlObligationStatus").find('option:selected').text() == "Cancelled") {
                                        obligationmetdate = fObligationNewCompletedDate;
                                    }
                                    var obliCurrency = "";
                                    if ($("#hdnContractCurrency").text() != "") {
                                        obliCurrency = $("#hdnContractCurrency").text();
                                    }
                                    else if ($("#hdnBaseCurrency").val() != "") {
                                        obliCurrency = $("#hdnBaseCurrency").val();
                                    }
                                    else {
                                        obliCurrency = "USD";
                                    }

                                    var SendReminderToArr = $("#ddlSendReminderToObligationNew").val();
                                    var vSendReminderTo = '';
                                    $(SendReminderToArr).each(function (i, item) {
                                        if (vSendReminderTo == '') {
                                            vSendReminderTo = item;
                                        }
                                        else {
                                            vSendReminderTo += "; " + item;
                                        }
                                    });

                                    $.ajax({
                                        url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew?obligationid=' + ObligationID,
                                        type: 'POST',
                                        dataType: 'json',
                                        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                                        data: {
                                            RowKey: ObligationID,
                                            ContractID: vContractID,
                                            ContractTitle: $("#lblCTitleObligationNew").text(),
                                            ObligationTitle: $("#txtObligationNewTitle").val(),
                                            ObligationType: $("#ddlObligationTypeNew").find('option:selected').text(),
                                            Description: $("#txtObligationNewDesc").val(),
                                            ObligationOwner: vObligationOwner,
                                            DueDate: fObligationNewDueDate,
                                            ObligationMetDate: obligationmetdate,
                                            ObligationStatus: $("#ddlObligationStatus").find('option:selected').text(),
                                            ObligationMet: obligationmet,
                                            ObligationMetBy: obligationmetby,
                                            ModifiedBy: localStorage.UserName,
                                            ObligationMetBy: obligationmetby,
                                            CompanyProfile: $("#lblCompanyProfile").text(),
                                            Counterparty: $("#lblCounterparty").text(),
                                            ContractEndDate: $("#hdnOldEndDate").text(),
                                            ContractCurrency: obliCurrency,
                                            SendReminderTo: vSendReminderTo,
                                            Reminder1: $("#txtReminder1ObligationNew").val(),
                                            Reminder2: $("#txtReminder2ObligationNew").val(),
                                            Reminder3: $("#txtReminder3ObligationNew").val(),
                                            Reminder1Condition: encodeURIComponent($("#ddlReminder1ObligationNew").find('option:selected').text()),
                                            Reminder2Condition: encodeURIComponent($("#ddlReminder2ObligationNew").find('option:selected').text()),
                                            Reminder3Condition: encodeURIComponent($("#ddlReminder3ObligationNew").find('option:selected').text()),
                                            AlertsEnabled: $("#AlertObli").val(),
                                            PerformedBy: encodeURIComponent($("input:radio[name=PerformedParty]:checked").val()),
                                            ShowInCalendar: $("input:radio[name=ShowInObligCalendar]:checked").val(),
                                            Priority: $("#ddlObligationNewPriority").find('option:selected').val(),
                                            AutoComplete: $("input:radio[name=ObligationNewAutoComplete]:checked").val(),
                                        },
                                        cache: false,
                                        success: function (person) {
                                            $('.ui-button-green-text').parent().removeAttr('disabled');
                                            $("#addEditObligationNew").dialog("close");
                                            $("#loadingPage").fadeOut();

                                            quickViewMyObligations();
                                        },
                                        complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                                    });
                                }




                            }
                            else if (vObligationEditStatus == "EDITRECURRENCE") {
                                if (listObligationNewData != "") {

                                    vObligationTextEditRecurrence = $("#txtObligationNewText").val();

                                    $.ajax({
                                        url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/deleteobligations?strObligationText=' + $("#txtObligationNewText").val(),
                                        type: 'DELETE',
                                        dataType: 'json',
                                        headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                                        "Content-Type": "application/json",
                                        cache: false,
                                        success: function (data) {
                                            $("#txtObligationNewID").val("");
                                            AddEditObligationNew();
                                        }
                                    });
                                }
                                else {
                                    if ($('#ddlObligationOccurencess').val() == "None") {

                                        vObligationTextEditRecurrence = $("#txtObligationNewText").val();

                                        $.ajax({
                                            url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/deleteobligations?strObligationText=' + $("#txtObligationNewText").val(),
                                            type: 'DELETE',
                                            dataType: 'json',
                                            headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                                            "Content-Type": "application/json",
                                            cache: false,
                                            success: function (data) {
                                                $("#txtObligationNewID").val("");
                                                AddEditObligationNew();
                                            }
                                        });
                                    }
                                    else {
                                        $("#loadingPage").fadeOut();
                                        $("#obligationcatalogsRecurrenceEditPopup").dialog("option", "title", "Edit Repeat Obligation");
                                        $("#obligationcatalogsRecurrenceEditPopup").dialog("open");

                                    }


                                }
                            }
                            else {
                                if ($('#ddlObligationOccurencess').val() == "None") {
                                    $("#inprocessObligation").css('visibility', 'visible');
                                    var obligationmet = "No";
                                    var obligationmetby = "";
                                    //Newly Added
                                    var obligationmetdate = null;
                                    if ($("#ddlObligationStatus").find('option:selected').text() == "Complete") {
                                        obligationmet = "Yes";
                                        obligationmetby = localStorage.UserName;
                                        obligationmetdate = fObligationNewCompletedDate;

                                    }
                                    else if ($("#ddlObligationStatus").find('option:selected').text() == "Cancelled") {
                                        obligationmetdate = fObligationNewCompletedDate;
                                    }
                                    var obliCurrency = "";
                                    if ($("#hdnContractCurrency").text() != "") {
                                        obliCurrency = $("#hdnContractCurrency").text();
                                    }
                                    else if ($("#hdnBaseCurrency").val() != "") {
                                        obliCurrency = $("#hdnBaseCurrency").val();
                                    }
                                    else {
                                        obliCurrency = "USD";
                                    }

                                    var SendReminderToArr = $("#ddlSendReminderToObligationNew").val();
                                    var vSendReminderTo = '';
                                    $(SendReminderToArr).each(function (i, item) {
                                        if (vSendReminderTo == '') {
                                            vSendReminderTo = item;
                                        }
                                        else {
                                            vSendReminderTo += "; " + item;
                                        }
                                    });


                                    $.ajax({
                                        url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew?obligationid=' + ObligationID,
                                        type: 'POST',
                                        dataType: 'json',
                                        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                                        data: {
                                            RowKey: ObligationID,
                                            ContractID: vContractID,
                                            ContractTitle: $("#lblCTitleObligationNew").text(),
                                            ObligationTitle: $("#txtObligationNewTitle").val(),
                                            ObligationType: $("#ddlObligationTypeNew").find('option:selected').text(),
                                            Description: $("#txtObligationNewDesc").val(),
                                            ObligationOwner: vObligationOwner,
                                            DueDate: fObligationNewDueDate,
                                            ObligationMetDate: obligationmetdate,
                                            ObligationStatus: $("#ddlObligationStatus").find('option:selected').text(),
                                            ObligationMet: obligationmet,
                                            ObligationMetBy: obligationmetby,
                                            ModifiedBy: localStorage.UserName,
                                            ObligationMetBy: obligationmetby,
                                            CompanyProfile: $("#lblCompanyProfile").text(),
                                            Counterparty: $("#lblCounterparty").text(),
                                            ContractEndDate: $("#hdnOldEndDate").text(),
                                            ContractCurrency: obliCurrency,
                                            SendReminderTo: vSendReminderTo,
                                            Reminder1: $("#txtReminder1ObligationNew").val(),
                                            Reminder2: $("#txtReminder2ObligationNew").val(),
                                            Reminder3: $("#txtReminder3ObligationNew").val(),
                                            Reminder1Condition: encodeURIComponent($("#ddlReminder1ObligationNew").find('option:selected').text()),
                                            Reminder2Condition: encodeURIComponent($("#ddlReminder2ObligationNew").find('option:selected').text()),
                                            Reminder3Condition: encodeURIComponent($("#ddlReminder3ObligationNew").find('option:selected').text()),
                                            AlertsEnabled: $("#AlertObli").val(),
                                            PerformedBy: encodeURIComponent($("input:radio[name=PerformedParty]:checked").val()),
                                            ShowInCalendar: $("input:radio[name=ShowInObligCalendar]:checked").val(),
                                            Priority: $("#ddlObligationNewPriority").find('option:selected').val(),
                                            AutoComplete: $("input:radio[name=ObligationNewAutoComplete]:checked").val(),
                                        },
                                        cache: false,
                                        success: function (person) {
                                            $('.ui-button-green-text').parent().removeAttr('disabled');

                                            $("#addEditObligationNew").dialog("close");
                                            $("#loadingPage").fadeOut();

                                            quickViewMyObligations();
                                        },
                                        complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                                    });

                                }
                                else {
                                    $("#loadingPage").fadeOut();
                                    $("#obligationcatalogsRecurrenceEditPopup").dialog("option", "title", "Edit Repeat Obligation");
                                    $("#obligationcatalogsRecurrenceEditPopup").dialog("open");
                                }
                            }

                        }
                        else {
                            if ($('#ddlObligationOccurencess').val() == "None") {
                                $("#inprocessObligation").css('visibility', 'visible');
                                var obligationmet = "No";
                                var obligationmetby = "";
                                //Newly Added
                                var obligationmetdate = null;
                                if ($("#ddlObligationStatus").find('option:selected').text() == "Complete") {
                                    obligationmet = "Yes";
                                    obligationmetby = localStorage.UserName;
                                    obligationmetdate = fObligationNewCompletedDate;
                                }
                                else if ($("#ddlObligationStatus").find('option:selected').text() == "Cancelled") {
                                    obligationmetdate = fObligationNewCompletedDate;
                                }

                                var obliCurrency = "";
                                if ($("#hdnContractCurrency").text() != "") {
                                    obliCurrency = $("#hdnContractCurrency").text();
                                }
                                else if ($("#hdnBaseCurrency").val() != "") {
                                    obliCurrency = $("#hdnBaseCurrency").val();
                                }
                                else {
                                    obliCurrency = "USD";
                                }

                                var SendReminderToArr = $("#ddlSendReminderToObligationNew").val();
                                var vSendReminderTo = '';
                                $(SendReminderToArr).each(function (i, item) {
                                    if (vSendReminderTo == '') {
                                        vSendReminderTo = item;
                                    }
                                    else {
                                        vSendReminderTo += "; " + item;
                                    }
                                });

                                $.ajax({
                                    url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew?obligationid=' + ObligationID,
                                    type: 'POST',
                                    dataType: 'json',
                                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                                    data: {
                                        RowKey: ObligationID,
                                        ContractID: vContractID,
                                        ContractTitle: $("#lblCTitleObligationNew").text(),
                                        ObligationTitle: $("#txtObligationNewTitle").val(),
                                        ObligationType: $("#ddlObligationTypeNew").find('option:selected').text(),
                                        Description: $("#txtObligationNewDesc").val(),
                                        ObligationOwner: vObligationOwner,
                                        DueDate: fObligationNewDueDate,
                                        ObligationMetDate: obligationmetdate,
                                        ObligationStatus: $("#ddlObligationStatus").find('option:selected').text(),
                                        ObligationMet: obligationmet,
                                        ObligationMetBy: obligationmetby,
                                        ModifiedBy: localStorage.UserName,
                                        ObligationMetBy: obligationmetby,
                                        CompanyProfile: $("#lblCompanyProfile").text(),
                                        Counterparty: $("#lblCounterparty").text(),
                                        ContractEndDate: $("#hdnOldEndDate").text(),
                                        ContractCurrency: obliCurrency,
                                        SendReminderTo: vSendReminderTo,
                                        Reminder1: $("#txtReminder1ObligationNew").val(),
                                        Reminder2: $("#txtReminder2ObligationNew").val(),
                                        Reminder3: $("#txtReminder3ObligationNew").val(),
                                        Reminder1Condition: encodeURIComponent($("#ddlReminder1ObligationNew").find('option:selected').text()),
                                        Reminder2Condition: encodeURIComponent($("#ddlReminder2ObligationNew").find('option:selected').text()),
                                        Reminder3Condition: encodeURIComponent($("#ddlReminder3ObligationNew").find('option:selected').text()),
                                        AlertsEnabled: $("#AlertObli").val(),
                                        PerformedBy: encodeURIComponent($("input:radio[name=PerformedParty]:checked").val()),
                                        ShowInCalendar: $("input:radio[name=ShowInObligCalendar]:checked").val(),
                                        Priority: $("#ddlObligationNewPriority").find('option:selected').val(),
                                        AutoComplete: $("input:radio[name=ObligationNewAutoComplete]:checked").val(),

                                    },
                                    cache: false,
                                    success: function (person) {
                                        $('.ui-button-green-text').parent().removeAttr('disabled');

                                        $("#addEditObligationNew").dialog("close");
                                        $("#loadingPage").fadeOut();

                                        quickViewMyObligations();
                                    },
                                    complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                                });


                            }
                            else {
                                $("#loadingPage").fadeOut();
                                $("#obligationcatalogsRecurrenceEditPopup").dialog("option", "title", "Edit Repeat Obligation");
                                $("#obligationcatalogsRecurrenceEditPopup").dialog("open");
                            }
                        }
                    }
                    else {
                        $("#inprocessObligation").css('visibility', 'visible');


                        if ($('#ddlObligationOccurencess').val() != "None") {

                            var obligationmet = "No";
                            var obligationmetby = "";
                            //Newly Added
                            var obligationmetdate = null;
                            if ($("#ddlObligationStatus").find('option:selected').text() == "Complete") {
                                obligationmet = "Yes";
                                obligationmetby = localStorage.UserName;
                                obligationmetdate = fObligationNewCompletedDate;
                            }
                            else if ($("#ddlObligationStatus").find('option:selected').text() == "Cancelled") {
                                obligationmetdate = fObligationNewCompletedDate;
                            }

                            var obliCurrency = "";
                            if ($("#hdnContractCurrency").text() != "") {
                                obliCurrency = $("#hdnContractCurrency").text();
                            }
                            else if ($("#hdnBaseCurrency").val() != "") {
                                obliCurrency = $("#hdnBaseCurrency").val();
                            }
                            else {
                                obliCurrency = "USD";
                            }

                            var SendReminderToArr = $("#ddlSendReminderToObligationNew").val();
                            var vSendReminderTo = '';
                            $(SendReminderToArr).each(function (i, item) {
                                if (vSendReminderTo == '') {
                                    vSendReminderTo = item;
                                }
                                else {
                                    vSendReminderTo += "; " + item;
                                }
                            });

                            var formData = new FormData();
                            var contractForm = "ContractID=" + vContractID;
                            contractForm += "&ContractTitle=" + encodeURIComponent($("#lblCTitleObligationNew").text());
                            contractForm += "&ObligationTitle=" + encodeURIComponent($("#txtObligationNewTitle").val());

                            contractForm += "&ObligationType=" + $("#ddlObligationTypeNew").find('option:selected').text();
                            contractForm += "&Description=" + $("#txtObligationNewDesc").val();

                            contractForm += "&ObligationOwner=" + encodeURIComponent(vObligationOwner);
                            contractForm += "&CreatedBy=" + encodeURIComponent(localStorage.UserName);
                            contractForm += "&ModifiedBy=" + encodeURIComponent(localStorage.UserName);
                            contractForm += "&PerformedBy=" + encodeURIComponent($("input:radio[name=PerformedParty]:checked").val());
                            contractForm += "&ObligationStatus=" + encodeURIComponent($("#ddlObligationStatus").find('option:selected').text());
                            contractForm += "&Ocurrences=" + encodeURIComponent(occurences);
                            contractForm += "&Recurrences=" + encodeURIComponent($('#ddlObligationOccurencess').val());
                            contractForm += "&CustomString=" + encodeURIComponent(recurenceCustomString);
                            contractForm += "&ObligationEndTerm=" + encodeURIComponent($("input:radio[name=SelectOccurenceEndDate]:checked").val());
                            contractForm += "&ObligationMet=" + encodeURIComponent(obligationmet);
                            contractForm += "&ObligationMetBy=" + encodeURIComponent(obligationmetby);

                            contractForm += "&CompanyProfile=" + encodeURIComponent($("#lblCompanyProfile").text());
                            contractForm += "&Counterparty=" + encodeURIComponent($("#lblCounterparty").text());
                            contractForm += "&ContractEndDate=" + encodeURIComponent($("#hdnOldEndDate").text());
                            contractForm += "&ContractCurrency=" + encodeURIComponent(obliCurrency);
                            contractForm += "&ObligationMetDate=" + encodeURIComponent(obligationmetdate);
                            contractForm += "&SendReminderTo=" + encodeURIComponent(vSendReminderTo);
                            contractForm += "&Reminder1=" + $("#txtReminder1ObligationNew").val();
                            contractForm += "&Reminder2=" + $("#txtReminder2ObligationNew").val();
                            contractForm += "&Reminder3=" + $("#txtReminder3ObligationNew").val();
                            contractForm += "&Reminder1Condition=" + encodeURIComponent($("#ddlReminder1ObligationNew").find('option:selected').text());
                            contractForm += "&Reminder2Condition=" + encodeURIComponent($("#ddlReminder2ObligationNew").find('option:selected').text());
                            contractForm += "&Reminder3Condition=" + encodeURIComponent($("#ddlReminder3ObligationNew").find('option:selected').text());

                            contractForm += "&AlertsEnabled=" + $("#AlertObli").val();

                            contractForm += "&ShowInCalendar=" + encodeURIComponent($("input:radio[name=ShowInObligCalendar]:checked").val());
                            contractForm += "&Priority=" + encodeURIComponent($("#ddlObligationNewPriority").find('option:selected').val());
                            contractForm += "&AutoComplete=" + encodeURIComponent($("input:radio[name=ObligationNewAutoComplete]:checked").val());

                            if ($('#ddlObligationOccurencess').val() == "Monthly") {
                                contractForm += "&RecMonthlyString=" + encodeURIComponent($("#ddlRepeatMonthly").find('option:selected').text());
                            }
                            else {
                                contractForm += "&RecMonthlyString=" + "";
                            }




                            formData.append("SearializeControls", contractForm);


                            var occurrenceForm = "EndDate=" + listObligationNewData.EndDate;
                            occurrenceForm += "&LastDate=" + encodeURIComponent(listObligationNewData.LastDate);
                            occurrenceForm += "&StartDate=" + encodeURIComponent(listObligationNewData.StartDate);
                            var strvalues = "";
                            var Values = listObligationNewData.Values;
                            for (var j = 0; j < Values.length; j++) {
                                strvalues += Values[j] + ",";
                            }

                            strvalues = removeLastChar(strvalues, ',');
                            occurrenceForm += "&Values=" + strvalues;

                            formData.append("objoccurrence", occurrenceForm);

                            $.ajax({
                                url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew',
                                type: 'POST',
                                dataType: 'json',
                                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                                data: formData,
                                cache: false,
                                contentType: false,
                                processData: false,
                                async: false,
                                success: function (person) {
                                    $('.ui-button-green-text').parent().removeAttr('disabled');


                                    if (vObligationFlaging == "EDIT") {


                                    }
                                    else {

                                    }

                                    if ($('#txtObligationFinancialsCount').val() == "Yes") {

                                        $.ajax({
                                            url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationfinancials/updateobligationtext?obligationtext=' + person,
                                            type: 'POST',
                                            dataType: 'json',
                                            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                                            cache: false,
                                            success: function (data) {

                                            },
                                            error: function (data) {
                                                $("#loadingPage").fadeOut();
                                            }
                                        });

                                    }



                                    $("#addEditObligationNew").dialog("close");

                                    clearObligationFormDataNew();
                                    $("#loadingPage").fadeOut();

                                    quickViewMyObligations();
                                },
                                error: function (data) {
                                    $("#loadingPage").fadeOut();
                                },
                                complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                            });
                        }
                        else {
                            var vRecurrence = "";
                            var vRecurrenceCustom = "";
                            var vOcurence = "";
                            vRecurrence = "None";
                            vRecurrenceCustom = "None";
                            vOcurence = 1;

                            var obligationmet = "No";
                            var obligationmetby = "";
                            //Newly Added
                            var obligationmetdate = null;
                            if ($("#ddlObligationStatus").find('option:selected').text() == "Complete") {
                                obligationmet = "Yes";
                                obligationmetby = localStorage.UserName;
                                obligationmetdate = fObligationNewCompletedDate;
                            }
                            else if ($("#ddlObligationStatus").find('option:selected').text() == "Cancelled") {
                                obligationmetdate = fObligationNewCompletedDate;
                            }

                            var obliCurrency = "";
                            if ($("#hdnContractCurrency").text() != "") {
                                obliCurrency = $("#hdnContractCurrency").text();
                            }
                            else if ($("#hdnBaseCurrency").val() != "") {
                                obliCurrency = $("#hdnBaseCurrency").val();
                            }
                            else {
                                obliCurrency = "USD";
                            }


                            var SendReminderToArr = $("#ddlSendReminderToObligationNew").val();
                            var vSendReminderTo = '';
                            $(SendReminderToArr).each(function (i, item) {
                                if (vSendReminderTo == '') {
                                    vSendReminderTo = item;
                                }
                                else {
                                    vSendReminderTo += "; " + item;
                                }
                            });

                            var formData = new FormData();
                            var contractForm = "ContractID=" + vContractID;
                            contractForm += "&ContractTitle=" + encodeURIComponent($("#lblCTitleObligationNew").text());
                            contractForm += "&ObligationTitle=" + encodeURIComponent($("#txtObligationNewTitle").val());

                            contractForm += "&ObligationType=" + $("#ddlObligationTypeNew").find('option:selected').text();
                            contractForm += "&Description=" + $("#txtObligationNewDesc").val();

                            contractForm += "&ObligationOwner=" + encodeURIComponent(vObligationOwner);
                            contractForm += "&DueDate=" + encodeURIComponent(fObligationNewDueDate);
                            contractForm += "&CreatedBy=" + encodeURIComponent(localStorage.UserName);
                            contractForm += "&ModifiedBy=" + encodeURIComponent(localStorage.UserName);
                            contractForm += "&PerformedBy=" + encodeURIComponent($("input:radio[name=PerformedParty]:checked").val());
                            contractForm += "&ObligationStatus=" + encodeURIComponent($("#ddlObligationStatus").find('option:selected').text());
                            contractForm += "&Ocurrences=" + encodeURIComponent(vOcurence);
                            contractForm += "&Recurrences=" + encodeURIComponent($('#ddlObligationOccurencess').val());
                            contractForm += "&CustomString=" + encodeURIComponent(vRecurrenceCustom);
                            contractForm += "&RecMonthlyString=" + encodeURIComponent("None");
                            contractForm += "&ObligationEndTerm=" + encodeURIComponent($("input:radio[name=SelectOccurenceEndDate]:checked").val());
                            contractForm += "&RecMonthlyString=" + "";
                            contractForm += "&ObligationMet=" + obligationmet;
                            contractForm += "&ObligationMetBy=" + encodeURIComponent(obligationmetby);
                            contractForm += "&CompanyProfile=" + encodeURIComponent($("#lblCompanyProfile").text());
                            contractForm += "&Counterparty=" + encodeURIComponent($("#lblCounterparty").text());
                            contractForm += "&ContractEndDate=" + encodeURIComponent($("#hdnOldEndDate").text());
                            contractForm += "&ContractCurrency=" + encodeURIComponent(obliCurrency);
                            contractForm += "&ObligationMetDate=" + encodeURIComponent(obligationmetdate);


                            contractForm += "&SendReminderTo=" + encodeURIComponent(vSendReminderTo);
                            contractForm += "&Reminder1=" + $("#txtReminder1ObligationNew").val();
                            contractForm += "&Reminder2=" + $("#txtReminder2ObligationNew").val();
                            contractForm += "&Reminder3=" + $("#txtReminder3ObligationNew").val();
                            contractForm += "&Reminder1Condition=" + encodeURIComponent($("#ddlReminder1ObligationNew").find('option:selected').text());
                            contractForm += "&Reminder2Condition=" + encodeURIComponent($("#ddlReminder2ObligationNew").find('option:selected').text());
                            contractForm += "&Reminder3Condition=" + encodeURIComponent($("#ddlReminder3ObligationNew").find('option:selected').text());
                            contractForm += "&AlertsEnabled=" + $("#AlertObli").val();

                            contractForm += "&ShowInCalendar=" + encodeURIComponent($("input:radio[name=ShowInObligCalendar]:checked").val());
                            contractForm += "&Priority=" + encodeURIComponent($("#ddlObligationNewPriority").find('option:selected').val());
                            contractForm += "&AutoComplete=" + encodeURIComponent($("input:radio[name=ObligationNewAutoComplete]:checked").val());

                            formData.append("SearializeControls", contractForm);

                            formData.append("objoccurrence", "");

                            $.ajax({
                                url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew',
                                type: 'POST',
                                dataType: 'json',
                                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                                data: formData,
                                cache: false,
                                contentType: false,
                                processData: false,
                                async: false,
                                success: function (person) {
                                    $('.ui-button-green-text').parent().removeAttr('disabled');


                                    if ($('#txtObligationFinancialsCount').val() == "Yes") {

                                        $.ajax({
                                            url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationfinancials/updateobligationtext?obligationtext=' + person,
                                            type: 'POST',
                                            dataType: 'json',
                                            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                                            cache: false,
                                            success: function (data) {

                                            },
                                            error: function (data) {
                                                $("#loadingPage").fadeOut();
                                            }
                                        });

                                    }


                                    if (vObligationFlaging == "EDIT") {


                                    }
                                    else {

                                    }


                                    $("#addEditObligationNew").dialog("close");
                                    $("#loadingPage").fadeOut();

                                    clearObligationFormDataNew();

                                    quickViewMyObligations();
                                },
                                error: function (data) {
                                    $("#loadingPage").fadeOut();
                                },
                                complete: function () { clearObligationFormDataNew(); $("#loadingPage").fadeOut(); $("#inprocessObligation").css('visibility', 'none'); }
                            });
                        }


                    }
                }
                else {
                    $("#loadingPage").fadeOut();
                    if ($('#dvObliOccurrenceDates').is(':hidden')) {
                        //do something
                        $('#dvObliOccurrenceDates').slideToggle();
                        $('#imgObliga').attr("title", "Collapse");
                        $('#imgObliga').attr("src", "../Content/Images/e-close.png");


                    }

                    $('.ui-button-green-text').parent().removeAttr('disabled');

                }

            }
            else {
                $("#loadingPage").fadeOut();
                $('.ui-button-green-text').parent().removeAttr('disabled');

            }

        }
        else {
            $("#loadingPage").fadeOut();
            $('.ui-button-green-text').parent().removeAttr('disabled');

        }
        $('.ui-button-green-text').parent().removeAttr('disabled');

        return isformvalid;
    }
}







function clearObligationFormDataNew() {

    vObligationFlaging = "";

    $('#ddlObligationStatus').val('Upcoming');

    $('#txtObligationProductsCount').val('');

    $('#dtObligationNewDueDate').val('');

    $('#txtObligationFinancialsCount').val('');

    $('#txtObligationNewID').val('');

    $('#txtObligationNewText').val('');

    $('#ddlObligationTypeNew').val('0');

    $('#ObligationNewTitle').val('');

    $('#txtObligationNewTitle').val('');
    $('#txtObligationNewDesc').val('');

    $('#trObliCatShow').css('display', '');
    $('#trObliFinShow').css('display', 'none')



    $('#ddlObligationOccurencess').val('None');

    $('input:checkbox[name=ObligationFinancialCB]').attr('checked', false);

    $('input:checkbox[name=ObligationCatalogCB]').attr('checked', false);


    $("#txtReminder1ObligationNew").val("");
    $("#txtReminder2ObligationNew").val("");
    $("#txtReminder3ObligationNew").val("");
    $("#ddlReminder1ObligationNew").val("before");
    $("#ddlReminder2ObligationNew").val("before");
    $("#ddlReminder3ObligationNew").val("before");



    $('#ulObligationCatalogBody').empty();
    $('#ulObligationFinancialsBody').empty();
    $('#dvObligationCatalogProducts').css('display', 'none');
    $('#dvObligationCatalogFinancials').css('display', 'none');


    document.getElementById("cbObligationCatalogProductsSelect").disabled = false;
    document.getElementById("cbObligationCatalogFinancialsSelect").disabled = false;

    $('#imgObliga').attr("title", "Expand");
    $('#imgObliga').attr("src", "../Content/Images/e-open.png");

    $('#imgObliga1').attr("title", "Expand");
    $('#imgObliga1').attr("src", "../Content/Images/e-open.png");


    $('#dvObliOccurrenceDates').css('display', 'none');
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

        fieldValue += e.key;

        if (parseInt(fieldValue) > 30) {

            return false;
        }

    });
}


var vCatalogCount = "No";
var vFinancialCount = "No";
function getObligationCatalogsbycontract(contractid, obligationtext) {
    $("#ulObligationCatalogBody").empty();
    $.ajax({
        url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationcatalogs/obligationtxt?obligationtext=' + obligationtext,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: false,
        success: function (data) {
            $("#loadingPage").fadeOut();
            if (data.length > 0) {
                vCatalogCount = "Yes";
                $('#txtObligationProductsCount').val("Yes");
                document.getElementById('obligationcatalogDetailsTable').style.display = '';
                document.getElementById('NoObligationCatalog').style.display = 'none';
                for (var i = 0; i < data.length; i++) {
                    var str = "";
                    var strCommitment = "";
                    var strCom = "";

                    var url = '<input type="checkbox" id="' + data[i].RowKey + '" name="MultipleObligationCatalogs" onclick="checkMultipleObligationCatalogs(this);" value="' + data[i].RowKey + '">&nbsp;<a  href="javascript:void(0)" onclick="ViewObligationCatalogDetail(\'' + data[i].RowKey + '\')" class="linkText">' + data[i].ObligationCatalogName + '</a>&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuRelatedObligationCatalogs"/>';

                    var htmlContent = "<tr>";
                    htmlContent += "<td  ><p id='ObligationCatalogID' style='display:none;'>" + data[i].RowKey + "</p>";
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




                    htmlContent += "<td style='padding:2px;'><a href='javascript:void(0);' onclick='checkObligationsstatusupdateNew(this);' class='activity_oblicatstatus obli_status_chang openmenuObligationCatalogStatusSettings'>" + data[i].ObligationCatalogStatus + "<img class='margin_left_5px' src='/Content/Images/card.png'></a></td>";
                    htmlContent += "</tr>";
                    $("#ulObligationCatalogBody").append(htmlContent);

                }
                $(".openmenuRelatedObligationCatalogs").contextMenu({ menu: 'dropdownMenuRelatedObligationCatalogs', leftButton: true }, function (action, el, pos) {
                    contextMenuObligationCatalogs(action, el.parent("i").parent("td").parent("tr"), pos);
                });

                $(".openmenuRelatedObligationCatalogs").click(function () {
                    $("#dvfilter").hide();
                });

                $(".openmenuObligationCatalogStatusSettings").contextMenu({
                    menu: 'dropdownMenuObligationStatusSettings', leftButton: true
                }, function (action, el, pos) {
                    contextMenuObligationCatalogStatusSettings(action, el.parent("tr"), pos);
                });


                $(".openmenuObligationCatalogStatusSettings").click(function () {
                    $("#dvfilter").hide();
                });
            }
            else {


            }

        },
        error: function (data) {
            document.getElementById("cbObligationCatalogProductsSelect").disabled = false;
            vCatalogCount = "No";
            $('#NoObligationCatalog').css('display', '');


            $('#txtObligationProductsCount').val("No");
            $("#loadingPage").fadeOut();
            vExist = false;

        }
    });

}



function getOcurrenceValuesForObligation(recurence, occurences, startDateNew, recurenceCustomString, strmonthly) {
    $.ajax({
        url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/ocurrencedates?ocurrence=' + recurence + '&iOcurrence=' + occurences + '&dtstart=' + startDateNew + '&ocurrencestring=' + recurenceCustomString + '&strmonthly=' + strmonthly,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        async: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (folder) {
            listObligationNewData = folder;
            var Startdate = new Date(folder.StartDate);
            var Enddate = new Date(folder.LastDate);
            var SMonth = Startdate.getMonth() + 1;
            var EMonth = Enddate.getMonth() + 1;
            var Ocurrs = folder.Values.length;
            occurences = Ocurrs;

            var dtStartdate = "";
            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
            { dtStartdate = moment(new Date(folder.StartDate)).format('MM/DD/YYYY'); }
            else { dtStartdate = moment(new Date(folder.StartDate)).format(localStorage.AppDateFormat); }

            var dtEnddate = "";

            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
            { dtEnddate = moment(new Date(folder.LastDate)).format('MM/DD/YYYY'); }
            else { dtEnddate = moment(new Date(folder.LastDate)).format(localStorage.AppDateFormat); }


            $('#ObligationOcurrenceSummary').text("(" + dtStartdate + " to " + dtEnddate + ", " + Ocurrs + " instances)")




        },
        error:
            function (data) {
                isExist = false;
            }
    });
}


$("#ddlRepeatMonthly").change(function (obj) {
    var fObligationNewDueDate = '';
    if ($("#dtObligationNewDueDate").val() != "" && $("#dtObligationNewDueDate").val() != null) {
        fObligationNewDueDate = $.datepicker.formatDate('mm/dd/yy', $("#dtObligationNewDueDate").datepicker('getDate'));
    }
    var Cus = "";
    var customstring = "";
    var date = new Date(fObligationNewDueDate);
    if ($("#ddlObligationOccurencess").val() == "Monthly") {
        Cus = date.getDay();
        var abc = new Date(fObligationNewDueDate);

        $('#dtObligationNewOccurrenceDueDate').val(abc.getDate());
        $('#divObligationOcurrenceMonthly').css('display', '');
        $('#divObligationOcurrenceWeekly').css('display', 'none');

        $('#lblOcurrenceMonth').css('display', '');
        $('#lblOcurrenceYear').css('display', 'none');




        $('#divOcurrenceSummary').css('display', '');
        customstring = $("#ddlRepeatMonthly").val();
        $('#dvobligationOcurrenceEnd').css('display', '');


    }
    else if ($("#ddlObligationOccurencess").val() == "Yearly") {
        var abc = new Date(fObligationNewDueDate);
        $('#dtObligationNewOccurrenceDueDate').val(abc.getDate());
        $('#dtOblOcurrMonthforYear').val(monthNames[abc.getMonth()]);
        $('#dtOblOcurrDateforYear').val(abc.getDate());
        $('#divObligationOcurrenceMonthly').css('display', '');
        $('#divObligationOcurrenceWeekly').css('display', 'none');
        $('#divOcurrenceSummary').css('display', '');
        customstring = $("#ddlRepeatMonthly").val();
        $('#dvobligationOcurrenceEnd').css('display', '');
        $('#lblOcurrenceMonth').css('display', 'none');
        $('#lblOcurrenceYear').css('display', '');
    }
    if ($('input[name=SelectOccurenceEndDate]:checked').val() == 'TillEnd') {

        GetObligationDataFinal(Cus);
    }
    else {
        getOcurrenceValuesForObligation($("#ddlObligationOccurencess").val(), $("#txtOccurrenceCount").val(), listObligationNewStartDate, Cus, customstring);

    }

});


$("#ddlObligationOccurencess").change(function (obj) {
    var fObligationNewDueDate = '';
    if ($("#dtObligationNewDueDate").val() != "" && $("#dtObligationNewDueDate").val() != null) {
        fObligationNewDueDate = $.datepicker.formatDate('mm/dd/yy', $("#dtObligationNewDueDate").datepicker('getDate'));
    }
    listObligationNewStartDate = fObligationNewDueDate;
    var date = new Date(fObligationNewDueDate);
    var Cus = "";
    var ocurrTxtnew = $("#ddlObligationOccurencess").val();

    var customstring = "";

    if (ocurrTxtnew == "Monthly") {
        Cus = date.getDay();
        var abc = new Date(fObligationNewDueDate);

        $('#dtObligationNewOccurrenceDueDate').val(abc.getDate());
        $('#divObligationOcurrenceMonthly').css('display', '');
        $('#divObligationOcurrenceWeekly').css('display', 'none');
        $('#divOcurrenceSummary').css('display', '');
        customstring = $("#ddlRepeatMonthly").val();
        $('#dvobligationOcurrenceEnd').css('display', '');
        $('#ddlRepeatMonthly').css('display', '');

        $('#lblOcurrenceMonth').css('display', '');
        $('#lblOcurrenceYear').css('display', 'none');




    }
    else if (ocurrTxtnew == "Yearly") {
        Cus = date.getFullYear();
        var abc = new Date(fObligationNewDueDate);
        var text = monthNames[abc.getMonth()];

        $('#dtOblOcurrDateforYear').val(abc.getDate());

        $('#dtOblOcurrMonthforYear').val(text);
        $('#divObligationOcurrenceMonthly').css('display', '');
        $('#divObligationOcurrenceWeekly').css('display', 'none');
        $('#divOcurrenceSummary').css('display', '');

        $('#dvobligationOcurrenceEnd').css('display', '');
        $("#ddlRepeatMonthly").val("0");
        $('#ddlRepeatMonthly').css('display', 'none');
        $('#lblOcurrenceMonth').css('display', 'none');
        $('#lblOcurrenceYear').css('display', '');

    }
    else if (ocurrTxtnew == "Weekly") {
        $('#dtObligationNewOccurrenceDueDate').val("");
        $('#divObligationOcurrenceMonthly').css('display', 'none');
        $('#divObligationOcurrenceWeekly').css('display', '');
        $('#divOcurrenceSummary').css('display', '');

        $('#dvobligationOcurrenceEnd').css('display', '');
        $("input:checkbox[name=chkRecurrenceCustom]:checked").each(function () {
            Cus += (this.value) + ",";
        });
        Cus = Cus = removeLastChar(Cus, ',');
        $("#ddlRepeatMonthly").val("0");
    }
    else {
        $('#dtObligationNewOccurrenceDueDate').val("none");
        $('#divObligationOcurrenceMonthly').css('display', 'none');
        $('#divObligationOcurrenceWeekly').css('display', 'none');
        $('#divOcurrenceSummary').css('display', 'none');

        $('#dvobligationOcurrenceEnd').css('display', 'none');
        $("#ddlRepeatMonthly").val("0");



    }


    if ($('input[name=SelectOccurenceEndDate]:checked').val() == 'TillEnd') {

        GetObligationDataFinal(Cus);
    }
    else {
        getOcurrenceValuesForObligation($("#ddlObligationOccurencess").val(), $("#txtOccurrenceCount").val(), listObligationNewStartDate, Cus, customstring);

    }




});


//Get Final Data

function GetObligationDataFinal(customstring) {
    var recst = new Date();
    var reced = new Date();
    var customstringnew = "";
    var fObligationNewDueDate = '';
    if ($("#dtObligationNewDueDate").val() != "" && $("#dtObligationNewDueDate").val() != null) {
        fObligationNewDueDate = $.datepicker.formatDate('mm/dd/yy', $("#dtObligationNewDueDate").datepicker('getDate'));
    }
    listObligationNewStartDate = fObligationNewDueDate;
    if ($('input[name=SelectOccurenceEndDate]:checked').val() == 'TillEnd') {

        if (listObligationNewEndDate != "Not Available") {
            if ($("#ddlObligationOccurencess option:selected").val() == "Weekly") {
                var startDateNew = new Date();
                var newTestDateNew2 = new Date();
                recurence = "Weekly";
                var sta = false;
                var OCount = 1;
                var Cus = "";
                var CustomRecWeekly = [];
                $("input:checkbox[name=chkRecurrenceCustom]:checked").each(function () {
                    CustomRecWeekly.push(this.value);
                    Cus += (this.value) + ",";
                });

                var selectedstartdate = new Date(listObligationNewStartDate);

                for (var crw = 0; crw < CustomRecWeekly.length; crw++) {
                    if (selectedstartdate.getDay() == CustomRecWeekly[crw]) {
                        recst = new Date(listObligationNewStartDate);
                        newTestDateNew2 = new Date(listObligationNewStartDate);
                        sta = true;
                        break;
                    }
                }
                if (!sta) {

                    var newTestDate = new Date(listObligationNewStartDate);
                    var newdate = new Date(listObligationNewStartDate);
                    for (var s = 0; s < 6; s++) {
                        newdate.setDate(newdate.getDate() + 1);
                        newTestDate.setDate(newTestDate.getDate() + 1);
                        for (var crw1 = 0; crw1 < CustomRecWeekly.length; crw1++) {
                            if (newdate.getDay() == CustomRecWeekly[crw1]) {
                                recst = newdate;
                                newTestDateNew2 = newTestDate;
                                sta = true;
                                break;
                            }
                        }
                        if (sta) {
                            break;
                        }

                    }
                }

                reced = new Date(listObligationNewEndDate);


                if (reced >= recst) {
                    //Get 1 day in milliseconds
                    var one_day = 1000 * 60 * 60 * 24;

                    // Convert both dates to milliseconds
                    var date1_ms = recst.getTime();
                    var date2_ms = reced.getTime();

                    // Calculate the difference in milliseconds
                    var difference_ms = date2_ms - date1_ms;

                    // Convert back to days and return
                    var diff = Math.round(difference_ms / one_day);

                    var newCustomdate = newTestDateNew2;

                    for (var s1 = 0; s1 < diff; s1++) {
                        newCustomdate.setDate(newCustomdate.getDate() + 1);
                        for (var crw2 = 0; crw2 < CustomRecWeekly.length; crw2++) {
                            if (newCustomdate.getDay() == CustomRecWeekly[crw2]) {
                                OCount = OCount + 1;
                            }
                        }
                    }

                    occurences = OCount;
                }
                else {
                    occurences = 0;
                }


                if (occurences > 30) {
                    occurences = 12;
                    $("#rdObligationNewEndOccurence").attr('disabled', true);
                    $('#rdObligationNewEndOccurence').removeAttr('checked');
                    $("#rdObligationNewEndOccurenceUser").prop("checked", true);
                }

                Cus = removeLastChar(Cus, ',');

                recurenceCustomString = Cus;
                //String need to be Added for Custom

            }
            else if ($("#ddlObligationOccurencess option:selected").val() == "Monthly") {
                var newstartrecdate = new Date(listObligationNewStartDate);
                recurence = "Monthly";
                var selectedstartdateNewCustom = new Date(listObligationNewStartDate);
                recst = selectedstartdateNewCustom;
                reced = new Date(listObligationNewEndDate);


                var occnew = 0;

                if (reced >= newstartrecdate) {
                    while (reced >= newstartrecdate) {
                        newstartrecdate.setMonth(newstartrecdate.getMonth() + (1 * parseInt($("#ddlRepeatMonthly option:selected").val())));
                        occnew = parseInt(occnew) + parseInt(1);
                    }

                    occurences = occnew;
                }
                else {
                    occurences = 0;
                }


                if (occurences > 30) {
                    occurences = 12;
                    $("#rdObligationNewEndOccurence").attr('disabled', true);
                    $('#rdObligationNewEndOccurence').removeAttr('checked');
                    $("#rdObligationNewEndOccurenceUser").prop("checked", true);
                }


                recurenceCustomString = recst.getDate();
                //String need to be Added for Custom


            }
            else {
                var newstartrecdate = new Date(listObligationNewStartDate);
                recurence = "Yearly";
                var selectedstartdateNewCustom = new Date(listObligationNewStartDate);
                recst = selectedstartdateNewCustom;
                reced = new Date(listObligationNewEndDate);


                var occnew = 0;

                if (reced >= newstartrecdate) {

                    while (reced >= newstartrecdate) {
                        newstartrecdate.setFullYear(newstartrecdate.getFullYear() + (1 * parseInt(1)));
                        occnew = parseInt(occnew) + parseInt(1);
                    }
                    occurences = occnew;


                }
                else {
                    occurences = 0;
                }

                if (occurences > 30) {
                    occurences = 12;
                    $("#rdObligationNewEndOccurence").attr('disabled', true);
                    $('#rdObligationNewEndOccurence').removeAttr('checked');
                    $("#rdObligationNewEndOccurenceUser").prop("checked", true);
                }

                recurenceCustomString = recst.getFullYear();

            }
            startDateNew = new Date(Number(recst.getFullYear()), Number(recst.getMonth()), Number(recst.getDate()), Number(00), Number(00), Number(00), Number(00));
            startDateNew = formatDate(startDateNew);






        }
        else {
            occurences = $("#txtOccurrenceCount").val();
            recurence = $("#ddlObligationOccurencess").val();
            recurenceCustomString = "";

            if (customstring != "") {
                recurenceCustomString = customstring;
            }
            else {
                $("input:checkbox[name=chkRecurrenceCustom]:checked").each(function () {
                    recurenceCustomString += (this.value) + ",";
                });
                recurenceCustomString = removeLastChar(recurenceCustomString, ',');
            }

            startDateNew = formatDate(listObligationNewStartDate);

        }

        if ($("#ddlObligationOccurencess option:selected").val() == "Monthly") {
            customstringnew = $("#ddlRepeatMonthly option:selected").val();
        }

        if (occurences > 0) {
            getOcurrenceValuesForObligation(recurence, occurences, startDateNew, recurenceCustomString, customstringnew)

        }
        else {
            swal("", "contract is expired by selected date.");
        }
    }
    else {
        occurences = $("#txtOccurrenceCount").val();
        recurence = $("#ddlObligationOccurencess").val();
        recurenceCustomString = "";

        if (customstring != "") {
            recurenceCustomString = customstring;
        }
        else {
            $("input:checkbox[name=chkRecurrenceCustom]:checked").each(function () {
                recurenceCustomString += (this.value) + ",";
            });
            recurenceCustomString = removeLastChar(recurenceCustomString, ',');
        }

        startDateNew = formatDate(listObligationNewStartDate);
        if ($("#ddlObligationOccurencess option:selected").val() == "Monthly") {
            customstringnew = $("#ddlRepeatMonthly option:selected").val();
        }

        getOcurrenceValuesForObligation(recurence, occurences, startDateNew, recurenceCustomString, customstringnew)

    }



}

//Self or Counterparty Change Event



var removeLastChar = function (value, char) {
    var lastChar = value.slice(-1);
    if (lastChar == char) {
        value = value.slice(0, -1);
    }
    return value;
}



$("input:radio[name=SelectOccurenceEndDate]").change(function () {
    var recurenceCustomString = "";
    var Cus = "";
    var date = new Date($("#dtObligationNewOccurrenceDueDate").val())
    var ocurrTxtnew = $("#ddlObligationOccurencess").val();
    if (ocurrTxtnew == "Monthly") {
        Cus = date.getDay();

    }
    else if (ocurrTxtnew == "Yearly") {
        Cus = date.getFullYear();

    }
    else {
        $("input:checkbox[name=chkRecurrenceCustom]:checked").each(function () {
            Cus += (this.value) + ",";
        });
        Cus = Cus = removeLastChar(Cus, ',');
    }



    if ($('input[name=SelectOccurenceEndDate]:checked').val() == 'TillEnd') {



        GetObligationDataFinal(Cus);

    } else {

        var recurenceCustomString = "";

        if (Cus != "") {
            recurenceCustomString = Cus;
        }
        else {
            $("input:checkbox[name=chkRecurrenceCustom]:checked").each(function () {
                recurenceCustomString += (this.value) + ",";
            });
            recurenceCustomString = removeLastChar(recurenceCustomString, ',');
        }

        var cusRecMonthstring = "";
        if ($("#ddlObligationOccurencess").val() == "Monthly") {
            cusRecMonthstring = $("#ddlRepeatMonthly option:selected").val();
        }


        getOcurrenceValuesForObligation($("#ddlObligationOccurencess").val(), $("#txtOccurrenceCount").val(), listObligationNewStartDate, recurenceCustomString, cusRecMonthstring);
    }
});


function ObligationDueDateSlectedEvent(obj) {
    var dateNew = new Date($.datepicker.formatDate('mm/dd/yy', $(obj).datepicker('getDate')));
    $("input:checkbox[name=chkRecurrenceCustom]").each(function () {
        this.checked = false;
    });
    var day = dateNew.getDay()
    var chkboxId = "ORC" + day;

    $("#" + chkboxId).prop('checked', true);

    if ($('#txtObligationNewText').val() != "") {

    }
    else {
        document.getElementById("ddlObligationOccurencess").disabled = false;
    }


    $('#dtObligationNewOccurrenceDueDate').val(dateNew.getDate());
    $('#dtOblOcurrMonthforYear').val(monthNames[dateNew.getMonth()]);
    $('#dtOblOcurrDateforYear').val(dateNew.getDate());


    if ($("#ddlObligationOccurencess").val() != "None") {
        GetObligationDataFinal("");
    }



}



$("input[name=PerformedParty]:radio").change(function () {

    var curVal = $("#ddlObligationTypeNew").val();

    if (curVal != 0) {
        if (this.value == "Self") {


            if ($("#lblCounterparty").text() != null && $("#lblCounterparty").text() != "") {
                $("#txtObligationNewTitle").val(curVal + " for " + $("#lblCounterparty").text());
            }

        }
        else {

            if ($("#lblCounterparty").text() != null && $("#lblCounterparty").text() != "") {
                $("#txtObligationNewTitle").val(curVal + " from " + $("#lblCounterparty").text());
            }
        }

    }



});




//Event Of Text Box count Change Event

$("#txtOccurrenceCount").focusout(function () {
    if ($("#txtOccurrenceCount").val() != "" && $('input[name=SelectOccurenceEndDate]:checked').val() == 'Custom') {
        var fObligationNewDueDate = '';
        if ($("#dtObligationNewDueDate").val() != "" && $("#dtObligationNewDueDate").val() != null) {
            fObligationNewDueDate = $.datepicker.formatDate('mm/dd/yy', $("#dtObligationNewDueDate").datepicker('getDate'));
        }
        var date = new Date(fObligationNewDueDate);
        var Cus = "";
        var cusRecMon = "";
        var ocurrTxtnew = $("#ddlObligationOccurencess").val();
        if (ocurrTxtnew == "Monthly") {
            Cus = date.getDay();
            cusRecMon = $("#ddlRepeatMonthly option:selected").val();
        }
        else if (ocurrTxtnew == "Yearly") {
            Cus = date.getFullYear();

        }
        else {
            $("input:checkbox[name=chkRecurrenceCustom]:checked").each(function () {
                Cus += (this.value) + ",";
            });
            Cus = Cus = removeLastChar(Cus, ',');
        }
        occurences = $("#txtOccurrenceCount").val();
        recurence = $("#ddlObligationOccurencess").val();
        recurenceCustomString = "";

        if (Cus != "") {
            recurenceCustomString = Cus;
        }
        else {
            $("input:checkbox[name=chkRecurrenceCustom]:checked").each(function () {
                recurenceCustomString += (this.value) + ",";
            });
            recurenceCustomString = removeLastChar(recurenceCustomString, ',');
        }
        getOcurrenceValuesForObligation(recurence, occurences, listObligationNewStartDate, recurenceCustomString, cusRecMon);
    }

});





$("#dtObligationNewDueDate").focusout(function () {

    if ($("#dtObligationNewDueDate").val() != "") {

    }
    else {
        document.getElementById("ddlObligationOccurencess").disabled = true;

    }

});

function multipleObligationDelete() {
    swal({
        title: '',
        text: "Are you sure you want to <span style=\"font-weight:700\">delete</span> items?",
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
                   url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew?strObligationText=' + multipleObligationNewChecks,
                   type: 'DELETE',
                   dataType: 'json',
                   headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                   cache: false,
                   success: function (data) {
                       multipleObligationNewChecks = "";
                       $("#btnMultipleAction").css('display', 'none');
                       $("#multiAction").css('display', 'none');
                       $("#loadingPage").fadeOut();

                       quickViewMyObligations();

                   }
               });

           }
           return;
       });
}


function showObligationStatusMultiple() {
    $("#multiAction").css('display', 'none');
    $('#addEditStatusMultiple').dialog('open');

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
    $("#loadingPage").fadeIn();
    var stat = decodeURI($("input:radio[name=rdstatus]:checked").val());
    var formData = new FormData();
    formData.append("ObligationIDs", multipleObligationNewChecks);
    $.ajax({
        url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/changestatus?status=' + stat,
        type: 'PUT',
        dataType: 'json',
        data:formData,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            $("#loadingPage").fadeOut();
            multipleObligationNewChecks = "";
            $("#btnMultipleAction").css('display', 'none');
            $("#multiAction").css('display', 'none');
            $('#addEditStatusMultiple').dialog('close');
            $("#loadingPage").fadeOut();
            //quickViewMyObligations();
            quickViewMyPendingObligations();
        }
    });
}





//Weekly Change Event Of Check Box

$("input:checkbox[name=chkRecurrenceCustom]").change(function () {
    recurenceCustomString = "";
    var Cus = "";
    var cusRecMon = "";
    var ocurrTxtnew = $("#ddlObligationOccurencess").val();
    if (ocurrTxtnew == "Monthly") {
        Cus = date.getDay();
        cusRecMon = $("#ddlRepeatMonthly option:selected").val();
    }
    else if (ocurrTxtnew == "Yearly") {
        Cus = date.getFullYear();

    }
    else {
        $("input:checkbox[name=chkRecurrenceCustom]:checked").each(function () {
            Cus += (this.value) + ",";
        });
        Cus = Cus = removeLastChar(Cus, ',');
    }



    if ($('input[name=SelectOccurenceEndDate]:checked').val() == 'TillEnd') {



        GetObligationDataFinal(Cus);

    } else {

        recurenceCustomString = "";

        if (Cus != "") {
            recurenceCustomString = Cus;
        }
        else {
            $("input:checkbox[name=chkRecurrenceCustom]:checked").each(function () {
                recurenceCustomString += (this.value) + ",";
            });
            recurenceCustomString = removeLastChar(recurenceCustomString, ',');
        }
        getOcurrenceValuesForObligation($("#ddlObligationOccurencess").val(), $("#txtOccurrenceCount").val(), listObligationNewStartDate, recurenceCustomString, cusRecMon);
    }
});


var multipleObligationNewChecks = "";
function checkMultipleObligations(object) {
    var CatalogID = object.id
    var isChecked = object.checked;
    if (isChecked) {
        $("#btnMultipleAction").css('display', '');
        multipleObligationNewChecks = multipleObligationNewChecks + ';' + CatalogID;
    } else {
        multipleObligationNewChecks = multipleObligationNewChecks.replace(';' + CatalogID, '');
    }

    if (multipleObligationNewChecks.trim() == "") {
        $("#btnMultipleAction").css('display', 'none');
    }
    try {
        hideAllMenuAndStopPro(event);
    }
    catch (ex) {

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


function BindPeople() {

    jqXHR = $.ajax({
        url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/users',
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


                $("#ddlObligationNewOwner").append(article);

                $("#ddlSendReminderToObligationNew").append(article);
            }


            //Newly added For Obligation New

            $("#ddlObligationNewOwner").chosen();

            $("#ddlSendReminderToObligationNew").chosen();

            $("#ddlAuthorCreate").chosen().trigger("chosen:updated");
            $('.chosenmulti').on('chosen:showing_dropdown', function (evt, params) {
                $('.result-selected').css('display', 'none');
            });

        },
        error:
            function (data) {
            }
    });
}



function AddObligationProduct() {
    var vProduct = "";
    var vProductID = "";
    $('input:radio[name="ExtProducts"]:checked').each(function () {
        if (vProduct == "") {
            vProduct = this.value;
            vProductID = this.id;
        }
        else {
            vProduct += "; " + this.value;
            vProductID += "; " + this.id;
        }
    });
    if (vProduct != "") {
        if ($("#hdncatalogselect").val() == "QUICK") {
            var Units = $('input[name=ExtProducts]:checked').parent().parent().find('#ProductUnits').text();

            if (Units != null && Units != "" && Units != "null") {
                $('#ddlObligationCatalogUnitsInline').val(Units);
            }
            else {
                $('#ddlObligationCatalogUnitsInline').val("0");
            }
            $('#txtObligationCatalogTitleInline').val(vProduct);

        }
        else if ($("#hdncatalogselect").val() == "SINGLE") {
            var Units = $('input[name=ExtProducts]:checked').parent().parent().find('#ProductUnits').text();
            var Price = $('input[name=ExtProducts]:checked').parent().parent().find('#ProductPrice').text();


            if (Price != null && Price != "" && Price != "null" && Price != 0) {
                $('#txtObligationProductAmountNewEdit').autoNumeric('set', Price);
                $('#txtObligationProductAmountNew').autoNumeric('set', Price);

            }
            else {

                $('#txtObligationProductAmountNewEdit').val("");
                $('#txtObligationProductAmountNew').val("");
            }


            if (Units != null && Units != "" && Units != "null") {
                $('#ddlObligationCatalogUnitsEdit').val(Units);
                $('#ddlObligationCatalogUnits').val(Units);
                $('#ddlObligationCatalogUnitsNew').val(Units);
                $('#ddlObligationCatalogUnitsNewEdit').val(Units);



            }
            else {
                $('#ddlObligationCatalogUnitsEdit').val("0");
                $('#ddlObligationCatalogUnits').val("0");
                $('#ddlObligationCatalogUnitsNew').val("0");
                $('#ddlObligationCatalogUnitsNewEdit').val("0");
            }


            $('#txtObligationCatalogName').val(vProduct);
            $('#txtTransProductName').val(vProduct);
            $('#txtObligationCatalogNameedit').val(vProduct);
        }
        else if ($("#hdncatalogselect").val() == "FINANCIALSINGLE") {
            var Units = $('input[name=ExtProducts]:checked').parent().parent().find('#ProductPrice').text();

            if (Units != null && Units != "" && Units != "null" && Units != 0) {
                $('#txtObligationFinancialsAmountEdit').val(Units);
                $('#txtObligationFinancialsAmount').val(Units);
            }
            else {
                $('#txtObligationFinancialsAmountEdit').val("");
                $('#txtObligationFinancialsAmount').val("");
            }


            $('#txtObligationFinancialsName').val(vProduct);
            $('#txtObligationFinancialsNameedit').val(vProduct);
        }
        else if ($("#hdncatalogselect").val() == "FINANCIALQUICK") {
            var Units = $('input[name=ExtProducts]:checked').parent().parent().find('#ProductPrice').text();

            if (Units != null && Units != "" && Units != "null" && Units != 0) {
                $('#txtObligationFinancialAmountInline').val(Units);
            }
            else {
                $('#txtObligationFinancialAmountInline').val("");
            }
            $('#txtObligationFinancialsTitleInline').val(vProduct);
        }

        return true;
    } else {

        swal("", "No Product has been selected.");
        return false;
    }

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
                    text: "Are you sure you want to <span style=\"font-weight:700\">delete '" + catalogTitle + "'</span>?",
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
                   url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationcatalogs?catalogid=' + catalogId,
                   type: 'DELETE',
                   dataType: 'json',
                   headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
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
                    url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationcatalogs?catalogid=' + catalogId,
                    type: 'GET',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    "Content-Type": "application/json",
                    cache: false,
                    success: function (cataloentity) {



                        if ($('#hdnProductUpdates').text() == "EDIT") {
                            $('#hdnProductUpdates').text('');
                            $('#hdnProductUpdates').text('EDITCATALOG');
                        }



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


                        var text = $('#hdnContractCurrency').text();

                        if (text != "") {
                            $("#CurrencyEditExpected").text(text);

                            $("#CurrencyEditActual").text(text);
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

                                var CDate = cataloentity.CompletedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');

                                $("#productcompleteddateEdit").css('display', '');
                                $('#dtObligationProductCompletedDateEdit').addClass('validelement');
                                $('#dtObligationProductCompletedDateEdit').addClass('validdate');
                                $('#dtObligationProductCompletedDateEdit').val(CDate);


                            }
                            else {

                                $("#productcompleteddateEdit").css('display', '');
                                $('#dtObligationProductCompletedDateEdit').addClass('validelement');
                                $('#dtObligationProductCompletedDateEdit').addClass('validdate');
                                $('#dtObligationProductCompletedDateEdit').val("");
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
                    url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationcatalogs/updatecatalogstatus?catalogid=' + obligationID + '&status=' + 'Upcoming',
                    type: 'POST',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
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
                    url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationcatalogs/updatecatalogstatus?catalogid=' + obligationID + '&status=' + 'Delayed',
                    type: 'POST',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
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
                    url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationcatalogs/updatecatalogstatus?catalogid=' + obligationID + '&status=' + 'Partial',
                    type: 'POST',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
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
                    url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationcatalogs/updatecatalogstatus?catalogid=' + obligationID + '&status=' + 'Cancelled',
                    type: 'POST',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
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

                $.ajax({
                    url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationcatalogs?catalogid=' + obligationID,
                    type: 'GET',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    "Content-Type": "application/json",
                    cache: false,
                    success: function (cataloentity) {

                        cataloentity.ObligationCatalogStatus = "Complete";

                        if ($('#hdnProductUpdates').text() == "EDIT") {
                            $('#hdnProductUpdates').text('');
                            $('#hdnProductUpdates').text('EDITCATALOG');
                        }



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


                        var text = $('#hdnContractCurrency').text();

                        if (text != "") {
                            $("#CurrencyEditExpected").text(text);

                            $("#CurrencyEditActual").text(text);
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

                                var CDate = cataloentity.CompletedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');

                                $("#productcompleteddateEdit").css('display', '');
                                $('#dtObligationProductCompletedDateEdit').addClass('validelement');
                                $('#dtObligationProductCompletedDateEdit').addClass('validdate');
                                $('#dtObligationProductCompletedDateEdit').val(CDate);


                            }
                            else {

                                $("#productcompleteddateEdit").css('display', '');
                                $('#dtObligationProductCompletedDateEdit').addClass('validelement');
                                $('#dtObligationProductCompletedDateEdit').addClass('validdate');
                                $('#dtObligationProductCompletedDateEdit').val("");
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


var multipleObligationProductsChecks = "";
function checkMultipleObligationCatalogs(object) {

    var CatalogID = object.id
    var isChecked = object.checked;
    if (isChecked) {
        $("#obligationCatalogAction").css('display', '');
        multipleObligationProductsChecks = multipleObligationProductsChecks + ';' + CatalogID;
    } else {
        multipleObligationProductsChecks = multipleObligationProductsChecks.replace(';' + CatalogID, '');
    }

    if (multipleObligationProductsChecks.trim() === "") {
        $("#obligationCatalogAction").css('display', 'none');
    }
    try {
        hideAllMenuAndStopPro(event);
    }
    catch (ex) {

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



function contextMenuObligationCatalogMul(action, el, pos) {

    switch (action) {

        case "delete":
            {
                swal({
                    title: '',
                    text: "Are you sure you want to <span style=\"font-weight:700\">delete</span> items?",
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
                   url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationscatalogs?catalogids=' + multipleObligationProductsChecks,
                   type: 'DELETE',
                   dataType: 'json',
                   headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                   cache: false,
                   success: function (data) {
                       multipleObligationProductsChecks = "";
                       $("#obligationCatalogAction").css('display', 'none');
                       $("#loadingPage").fadeOut();
                       getObligationCatalogsNew(vContractID, $("#hdnObligationUniqueId").text(), $("#hdnObligationRowKey").text());


                   }
               });
           }
           return;
       });
                break;
            }
    }
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


function ViewObligationCatalogDetail(catalogid) {
    $("#loadingPage").fadeIn();
    $("#tblObligationCatalogMetadataDetail").empty();
    $('#tblObligationCatalogMetadataDetail').append('<tr><td><img src="../Content/Images/icon/loading.gif"/> </td></tr>');

    $.ajax({
        url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationcatalogs?catalogid=' + catalogid,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
        "Content-Type": "application/json",
        cache: false,
        success: function (catalogentity) {

            $("#loadingPage").fadeOut();

            if (catalogentity != null) {

                var vMetadata = '<tr>';
                vMetadata += '<td class="text_label width40">Catalog Title</td>';
                vMetadata += '<td class="text width60">' + catalogentity.ObligationCatalogName + '</td>';
                vMetadata += '</tr>';
                vMetadata += '<tr>';
                vMetadata += '<td class="text_label width40">Units </td>';
                vMetadata += '<td class="text width60">' + catalogentity.ObligationUnits + '</td>';
                vMetadata += '</tr>';
                vMetadata += '<tr>';
                vMetadata += '<td class="text_label width40">Quantity</td>';
                vMetadata += '<td class="text width60">';
                if (catalogentity.ObligationQuantity != '') {
                    vMetadata += catalogentity.ObligationQuantity + " ( " + catalogentity.ObligationQtyType + " )";
                }
                vMetadata += '</td>';
                vMetadata += '</tr>';
                vMetadata += '<tr>';
                vMetadata += '<td class="text_label width40">Status</td>';
                if (catalogentity.ObligationCatalogStatus != null) {
                    var vDueDate = catalogentity.ObligationCatalogStatus;
                    vMetadata += '<td class="text width60">' + vDueDate + '</td>';
                }
                vMetadata += '</tr>';

                vMetadata += '<tr>';
                vMetadata += '<td class="text_label width40">Description</td>';
                if (catalogentity.Description != null) {
                    var vDueDate = catalogentity.Description;
                    vMetadata += '<td class="text width60">' + vDueDate + '</td>';
                }
                vMetadata += '</tr>';

                $("#tblObligationCatalogMetadataDetail").empty();
                $("#tblObligationCatalogMetadataDetail").append(vMetadata);
                setBlankValueToHyphen("tblObligationCatalogMetadataDetail");
                $("#obligationcatalogsViewPopup").dialog("option", "title", "View Catalog");
                $("#obligationcatalogsViewPopup").dialog("open");
                $("#obligationcatalogsViewPopup").height("auto");



            }
        }
    });
}



// Add More Click Event
$('#addObligationCatalogpopup').click(function () {

    clearobligationcatalogs();


    if ($('#hdnProductUpdates').text() == "EDIT") {
        $('#hdnProductUpdates').text('');
        $('#hdnProductUpdates').text('EDITCATALOG');
    }

    $("#hdncatalogselect").val("SINGLE");

    var text = $('#hdnContractCurrency').text();

    if (text != "" && text != null && text != "null") {
        $("#CurrencyExpected").text(text);

        $("#CurrencyActual").text(text);
    }
    else {
        $("#CurrencyExpected").text("USD")

        $("#CurrencyActual").text("USD");
    }





    $(".validelement").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });

    $('#obligationcatalogsAddPopup').dialog('open', 'title', '');
});

function clearobligationcatalogs() {
    $('#ddlObligationCatalogStatus').val('Upcoming');
    //manoj
    //$("#productcompleteddate").css("display", "");
    //manoj
    $('#txtObligationCatalogName').val('');
    $('#txtObligationCatalogDesc').val('');
    $('#ddlObligationCatalogUnits').val('');
    $('#txtObligationCatalogQty').val('');
    $('#ddlObligationCatalogUnitType').val('0');

    $('#txtObligationCatalogQtyNew').val('');
    $('#ddlObligationCatalogUnitsNew').val('0');
    $('#trObligationActualQty').css('display', '');

    $(".validelement").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });


    $("#txtObligationProductAmountNewActual").prop('disabled', true);
    $("#txtObligationCatalogQtyNew").prop('disabled', true);

    $("#txtObligationCatalogQtyNew").val('');
    $("#txtObligationProductAmountNewActual").val('');

    $('#txtObligationCatalogQtyNew').removeClass('validelement');
    $('#txtObligationProductAmountNewActual').removeClass('validelement');

    $('#txtObligationProductAmountNewActual').removeClass('obli_catalog_enable')
    $('#txtObligationProductAmountNewActual').addClass('obli_catalog_disable')

    $('#txtObligationCatalogQtyNew').removeClass('obli_catalog_enable')
    $('#txtObligationCatalogQtyNew').addClass('obli_catalog_disable')


    $('#obliCatalogQtysummary').text('');


    $('#catalogAmountsumaryTitle').text('');
    $('#catalogAmountsumaryValue').text('');

    $('#txtObligationProductAmountNew').val('');
    $('#txtObligationProductAmountNewActual').val('');
    $('#ddlObligationFinancialsAmountTypeActual').val('0');
    $('#trObligationAmountActual').css('display', '');
}



$('#viewObligationProductDetails').click(function () {


    $('#loadProduct').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    if ($('#tbodyExistingProducts tr').length <= 0) {
        getProducts();

    } else {
        clearobligationproducts();
        $('#loadProduct').empty();
        $("#viewProductsPopup").dialog("option", "title", "Products & Services Catalog");
        $("#viewProductsPopup").dialog("open");
    }




});


$('#viewObligationProductDetailsEdit').click(function () {


    $('#loadProduct').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    if ($('#tbodyExistingProducts tr').length <= 0) {
        getProducts();

    } else {
        clearobligationproducts();
        $('#loadProduct').empty();
        $("#viewProductsPopup").dialog("option", "title", "Products & Services Catalog");
        $("#viewProductsPopup").dialog("open");
    }




});

function clearobligationproducts() {
    $('#txtSearchBoxProduct').val('');
    $('input:radio[name=ExtProducts]').attr('checked', false);
}

function getProducts() {
    $("#tbodyExistingProducts").empty();
    $("#loadingPage").fadeIn();
    $.ajax({
        url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/Products',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (products) {
            $('#loadProduct').empty();
            var ProductTags = [];
            var datalenght = products.length;
            for (var i = 0; i < datalenght; i++) {
                var item = products[i];
                var article = "";
                var article1 = "";
                if (i == 0) {
                    article += '<tr><th>Product Name</th><th>Units</th><th>Price</th></tr>';
                    article1 += '<tr><th>Product Name</th><th>Units</th><th>Price</th></tr>';
                }
                var Units = "";
                var Price = "";

                if (item.Units != null && item.Units != "") {
                    Units = item.Units;
                }

                if (item.UnitPriceValue != null && item.UnitPriceValue != "") {
                    Price = item.UnitPriceValue;
                }
                else {
                    Price = "0";
                }
                if (item.UnitPriceCurrency != null && item.UnitPriceCurrency != "") {
                    Price += ' ' + item.UnitPriceCurrency;
                }
                else {


                    if ($("#hdnContractCurrency").text() != "" && $("#hdnContractCurrency").text() != null && $("#hdnContractCurrency").text() != "null") {
                        Price += ' ' + $('#hdnContractCurrency').text();
                    }
                    else {
                        Price += ' ' + "USD";
                    }



                }



                article += '<tr>';
                article += '<td id="ProductUnits" style="display:none;">' + item.Units + '</td>';
                article += '<td id="ProductPrice" style="display:none;">' + item.UnitPriceValue + '</td>';
                article += '<td id="ProductCurrency" style="display:none;">' + item.UnitPriceCurrency + '</td>';
                article += '<td>';

                article += '<input id="CP' + item.RowKey + '" type="radio" name="ExtProducts" class="css-checkbox" value="' + item.ProductName + '" />';


                article += '<label for="CP' + item.RowKey + '" class="css-label margin-right8">' + item.ProductName + '</label>';
                article += '</td>';
                article += '<td><label for="PU' + item.RowKey + '" class="margin-right8" value="' + Units + '">' + Units + '</label></td>';
                article += '<td><label for="PP' + item.RowKey + '" class="margin-right8" value="' + Price + '" >' + Price + '</label></td>';
                article += '</tr>';
                ProductTags.push(item.ProductName);
                $("#tbodyExistingProducts").append(article);

            }

            $("#txtSearchBoxProduct").autocomplete({
                source: ProductTags,
                minLength: 1,
                focus: function (event, ui) {
                    return false;
                },
                select: function (evn, uidetails) {
                    $("#txtSearchBoxProduct").val(uidetails.item.label);
                    SearchProducts();
                }
            });

            $("#txtSearchBoxProductMul").autocomplete({
                source: ProductTags,
                minLength: 1,
                focus: function (event, ui) {
                    return false;
                },
                select: function (evn, uidetails) {
                    $("#txtSearchBoxProductMul").val(uidetails.item.label);
                    SearchProductsMul();
                }
            });
            $("#loadingPage").fadeOut();



            var vCount = $("#tbodyExistingProducts tr").length;
            $('#compact-paginationProducts').pagination({
                items: vCount,
                itemsOnPage: 10,
                typeID: 'tbodyExistingProducts',
                cssStyle: 'compact-theme'
            });

            if ($("#hdncatalogselect").val() == "MULTIPLE" || $("#hdncatalogselect").val() == "FINANCIALMULTIPLE") {

                $("#viewProductsMulPopup").dialog("option", "title", "Products & Services Catalog");
                $("#viewProductsMulPopup").dialog("open");

            }
            else {

                $("#viewProductsPopup").dialog("option", "title", "Products & Services Catalog");
                $("#viewProductsPopup").dialog("open");

            }
        }
    });

}

function BindUnitTypes() {
    $.ajax({
        url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/unittypes',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (documenttypes) {
            $(documenttypes).each(function (i, item) {
                $("#ddlObligationCatalogUnits").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>");
                $("#ddlObligationCatalogUnitsInline").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>");
                $("#ddlObligationCatalogUnitsEdit").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>");
                $("#ddlProductUnits").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>");
                $("#ddlObligationCatalogUnitsNew").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>");
                $("#ddlObligationCatalogUnitsNewEdit").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>");
            });
        }
    });
}


function SaveObligationcatalog() {


    $("#spInProgress").css('visibility', 'visible');
    if (requiredValidator('ObligationCatalogForm', false)) {

        var vTitle = $("#txtObligationCatalogName").val();

        $("#loadingPage").fadeIn();


        CreateObligationCatalog();


    }
    $("#spInProgress").css('visibility', 'hidden');
    $("#loadingPage").fadeOut();

}


function CreateObligationCatalog() {
    if ($('#hdnObligationUniqueId').text() != null && $('#hdnObligationUniqueId').text() != "" && $('#hdnObligationUniqueId').text() != "null") {
        var vTitle = $("#txtObligationCatalogName").val();
        var stringUnitType = "";
        if ($("#ddlObligationCatalogUnitType").val() != "0") {
            stringUnitType = $("#ddlObligationCatalogUnitType option:selected").text();
        }
        var obliCurrency = "";
        if ($("#hdnContractCurrency").text() != "") {
            obliCurrency = $("#hdnContractCurrency").text();
        }
        else {
            obliCurrency = $("#hdnBaseCurrency").text();
        }


        var completedate = null;
        if ($("#ddlObligationCatalogStatus").find('option:selected').text() == "Complete" || $("#ddlObligationCatalogStatus").find('option:selected').text() == "Cancelled") {
            completedate = $("#dtObligationProductCompletedDate").val();
        }


        var catalogForm = "ObligationCatalogName=" + vTitle;
        catalogForm += "&ObligationText=" + $('#hdnObligationUniqueId').text();
        catalogForm += "&ObligationID=" + $('#hdnObligationRowKey').text();
        catalogForm += "&ObligationUnits=" + $("#ddlObligationCatalogUnits option:selected").text();
        catalogForm += "&AccountID=" + localStorage.AccountID;
        catalogForm += "&CreatedBy=" + localStorage.UserName;
        catalogForm += "&ModifiedBy=" + localStorage.UserName;
        catalogForm += "&ObligationQuantity=" + $("#txtObligationCatalogQty").val();
        catalogForm += "&ObligationQtyType=" + stringUnitType;
        catalogForm += "&Description=" + $("#txtObligationCatalogDesc").val();
        catalogForm += "&ObligationCatalogStatus=" + $("#ddlObligationCatalogStatus option:selected").text();
        catalogForm += "&QuantityActual=" + $("#txtObligationCatalogQtyNew").val();

        catalogForm += "&CompletedDate=" + completedate;

        //Merge the Financials
        catalogForm += "&ObligationCurrency=" + obliCurrency;
        catalogForm += "&ObligationAmountType=" + $("#ddlObligationProductAmountTypeNew option:selected").text();
        catalogForm += "&ObligationTransactionType=" + $("#hdnTransactionType").text();
        catalogForm += "&AmountActual=" + $("#txtObligationProductAmountNewActual").autoNumeric('get');
        catalogForm += "&ObligationAmount=" + $("#txtObligationProductAmountNew").autoNumeric('get');
        $.ajax({
            url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationcatalogs?contractid=' + vContractID,
            type: 'POST',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            data: catalogForm,
            cache: false,
            success: function (data) {

                getObligationCatalogsNew(vContractID, $('#hdnObligationUniqueId').text(), $('#hdnObligationRowKey').text());
                $("#obligationcatalogsAddPopup").dialog("close");

            },
            error: function (data) {
                $("#loadingPage").fadeOut();
            }
        });

    }
    else {
        CreateObligationDuplicate();
    }

}



function CreateObligationDuplicate() {
    var catalogForm = "ObligationTitle=" + "Untitled";
    catalogForm += "&AccountID=" + localStorage.AccountID;
    catalogForm += "&CreatedBy=" + localStorage.UserName;
    catalogForm += "&ModifiedBy=" + localStorage.UserName;
    $.ajax({
        url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/duplicate?contractid=' + vContractID,
        type: 'POST',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        data: catalogForm,
        cache: false,
        success: function (obligation) {
            $('#hdnObligationUniqueId').text(obligation.ObligationText);
            $('#hdnObligationRowKey').text(obligation.RowKey);
            CreateObligationCatalog();
        },
        error: function (data) {
            $("#loadingPage").fadeOut();
        }
    });
}







function UpdateObligationcatalog() {

    $("#loadingPage").fadeIn();
    $("#spInProgress").css('visibility', 'visible');
    if (requiredValidator('ObligationCatalogFormEdit', false)) {

        var vTitle = $("#txtObligationCatalogNameedit").val();
        var vCatalogId = $("#txtObligationCatalogIDedit").val();



        UpdateObligationCatalogNew();

    }
    else {
        $("#loadingPage").fadeOut();
    }
    $("#spInProgress").css('visibility', 'hidden');


}



function UpdateObligationCatalogNew() {

    var vTitle = $("#txtObligationCatalogNameedit").val();
    var vCatalogId = $("#txtObligationCatalogIDedit").val();


    var obliCurrency = "";
    if ($("#CurrencyEditActual").text() != "") {
        obliCurrency = $("#CurrencyEditActual").text();
    }
    else if ($("#CurrencyEditExpected").text() != "") {
        obliCurrency = $("#CurrencyEditExpected").text();
    }
    else if ($("#hdnBaseContractCurrency").text() != "") {
        obliCurrency = $("#hdnBaseContractCurrency").text();
    }
    else {
        obliCurrency = $("#hdnBaseCurrency").val();
    }

    var completedate = null;
    if ($("#ddlObligationCatalogStatusEdit").find('option:selected').text() == "Complete" || $("#ddlObligationCatalogStatusEdit").find('option:selected').text() == "Cancelled") {
        completedate = $("#dtObligationProductCompletedDateEdit").val();
    }

    var catalogForm = "ObligationCatalogName=" + vTitle;

    catalogForm += "&ObligationText=" + $("#hdnObligationUniqueId").text();
    catalogForm += "&ObligationID=" + $("#hdnObligationRowKey").text();
    catalogForm += "&ObligationUnits=" + $("#ddlObligationCatalogUnitsEdit option:selected").text();
    catalogForm += "&AccountID=" + localStorage.AccountID;
    catalogForm += "&ModifiedBy=" + localStorage.UserName;
    catalogForm += "&ObligationQuantity=" + $("#txtObligationCatalogQtyEdit").val();
    catalogForm += "&ObligationQtyType=" + $("#ddlObligationCatalogUnitTypeEdit option:selected").text();
    catalogForm += "&Description=" + $("#txtObligationCatalogDescEdit").val();
    catalogForm += "&ObligationCatalogStatus=" + $("#ddlObligationCatalogStatusEdit option:selected").text();
    catalogForm += "&QuantityActual=" + $("#txtObligationCatalogQtyNewEdit").val();


    catalogForm += "&CompletedDate=" + completedate;


    //Merge the Financials
    catalogForm += "&ObligationCurrency=" + obliCurrency;
    catalogForm += "&ObligationAmountType=" + $("#ddlObligationProductAmountTypeNewEdit option:selected").text();
    catalogForm += "&ObligationTransactionType=" + $("#hdnTransactionType").text();
    catalogForm += "&AmountActual=" + $("#txtObligationProductAmountNewActualEdit").autoNumeric('get');
    catalogForm += "&ObligationAmount=" + $("#txtObligationProductAmountNewEdit").autoNumeric('get');

    $.ajax({
        url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationcatalogs?catalogid=' + vCatalogId,
        type: 'PUT',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        data: catalogForm,
        cache: false,
        success: function (data) {



            $("#obligationcatalogseditPopup").dialog("close");
            getObligationCatalogsNew(vContractID, $("#hdnObligationUniqueId").text(), $("#hdnObligationRowKey").text());
        },
        error: function (data) {
            $("#loadingPage").fadeOut();
        }
    });
}



$("#txtObligationCatalogQty").focusout(function () {

    if ($("#txtObligationCatalogQty").val() != "") {
        var catlogStatus = $("#ddlObligationCatalogStatus").val();
        if (catlogStatus == "Complete") {
            $("#txtObligationCatalogQtyNew").prop('disabled', false);
            $('#txtObligationCatalogQtyNew').addClass('validelement');

            $('#txtObligationCatalogQtyNew').removeClass('obli_catalog_disable')
            $('#txtObligationCatalogQtyNew').addClass('obli_catalog_enable')
        }
        else {
            $("#txtObligationCatalogQtyNew").prop('disabled', true);
            $('#txtObligationCatalogQtyNew').removeClass('validelement');
            $("#txtObligationCatalogQtyNew").val('');
            $('#txtObligationProductAmountNewActual').removeClass('validelement');
            $("#txtObligationProductAmountNewActual").val('');
            $("#txtObligationCatalogQtyNew").prop('disabled', true);

            $('#txtObligationProductAmountNewActual').removeClass('obli_catalog_enable')
            $('#txtObligationProductAmountNewActual').addClass('obli_catalog_disable')

            $('#txtObligationCatalogQtyNew').removeClass('obli_catalog_enable')
            $('#txtObligationCatalogQtyNew').addClass('obli_catalog_disable')

        }
    }
    else {
        $("#txtObligationCatalogQtyNew").prop('disabled', true);
        $('#txtObligationCatalogQtyNew').removeClass('validelement');
        $("#txtObligationCatalogQtyNew").val('');

        $('#txtObligationCatalogQtyNew').removeClass('obli_catalog_enable')
        $('#txtObligationCatalogQtyNew').addClass('obli_catalog_disable')
    }

});


$("#txtObligationProductAmountNew").focusout(function () {


    if ($("#txtObligationProductAmountNew").val() != "") {
        var catlogStatus = $("#ddlObligationCatalogStatus").val();
        if (catlogStatus == "Complete") {
            $("#txtObligationProductAmountNewActual").prop('disabled', false);
            $('#txtObligationProductAmountNewActual').addClass('validelement');


            $('#txtObligationProductAmountNewActual').removeClass('obli_catalog_disable')
            $('#txtObligationProductAmountNewActual').addClass('obli_catalog_enable')

        }
        else {
            $("#txtObligationCatalogQtyNew").prop('disabled', true);
            $('#txtObligationCatalogQtyNew').removeClass('validelement');
            $("#txtObligationCatalogQtyNew").val('');

            $('#txtObligationProductAmountNewActual').removeClass('validelement');
            $("#txtObligationProductAmountNewActual").val('');
            $("#txtObligationProductAmountNewActual").prop('disabled', true);

            $('#txtObligationProductAmountNewActual').removeClass('obli_catalog_enable')
            $('#txtObligationProductAmountNewActual').addClass('obli_catalog_disable')

            $('#txtObligationCatalogQtyNew').removeClass('obli_catalog_enable')
            $('#txtObligationCatalogQtyNew').addClass('obli_catalog_disable')


        }
    }
    else {
        $('#txtObligationProductAmountNewActual').removeClass('validelement');
        $("#txtObligationProductAmountNewActual").val('');
        $("#txtObligationProductAmountNewActual").prop('disabled', true);

        $('#txtObligationProductAmountNewActual').removeClass('obli_catalog_enable')
        $('#txtObligationProductAmountNewActual').addClass('obli_catalog_disable')
    }


});


$("#ddlObligationCatalogStatus").change(function (obj) {

    var catlogStatus = $("#ddlObligationCatalogStatus").val();

    if (catlogStatus == "Complete") {


        var CDate = new Date();
        CDate = formatDate(CDate);

        CDate = CDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');

        $("#productcompleteddate").css('display', '');
        $('#dtObligationProductCompletedDate').addClass('validelement');
        $('#dtObligationProductCompletedDate').addClass('validdate');
        $('#dtObligationProductCompletedDate').val(CDate);


        if ($('#txtObligationCatalogQty').val() != "") {
            $("#txtObligationCatalogQtyNew").prop('disabled', false);
            $('#txtObligationCatalogQtyNew').addClass('validelement');

            $('#txtObligationCatalogQtyNew').removeClass('obli_catalog_disable')
            $('#txtObligationCatalogQtyNew').addClass('obli_catalog_enable')

        }

        if ($('#txtObligationProductAmountNew').val() != "") {
            $("#txtObligationProductAmountNewActual").prop('disabled', false);
            $('#txtObligationProductAmountNewActual').addClass('validelement');

            $('#txtObligationProductAmountNewActual').removeClass('obli_catalog_disable')
            $('#txtObligationProductAmountNewActual').addClass('obli_catalog_enable')

        }
    }
    else if (catlogStatus == "Cancelled") {

        var CDate = new Date();
        CDate = formatDate(CDate);

        CDate = CDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');

        $("#productcompleteddate").css('display', '');
        $('#dtObligationProductCompletedDate').addClass('validelement');
        $('#dtObligationProductCompletedDate').addClass('validdate');
        $('#dtObligationProductCompletedDate').val(CDate);

        $("#txtObligationProductAmountNewActual").prop('disabled', true);
        $("#txtObligationCatalogQtyNew").prop('disabled', true);

        $("#txtObligationCatalogQtyNew").val('');
        $("#txtObligationProductAmountNewActual").val('');

        $('#txtObligationCatalogQtyNew').removeClass('validelement');
        $('#txtObligationProductAmountNewActual').removeClass('validelement');

        $('#txtObligationProductAmountNewActual').removeClass('obli_catalog_enable')
        $('#txtObligationProductAmountNewActual').addClass('obli_catalog_disable')

        $('#txtObligationCatalogQtyNew').removeClass('obli_catalog_enable')
        $('#txtObligationCatalogQtyNew').addClass('obli_catalog_disable')
    }
    else {
        $("#productcompleteddate").css('display', 'none');
        $("#txtObligationProductAmountNewActual").prop('disabled', true);
        $("#txtObligationCatalogQtyNew").prop('disabled', true);

        $("#txtObligationCatalogQtyNew").val('');
        $("#txtObligationProductAmountNewActual").val('');

        $('#txtObligationCatalogQtyNew').removeClass('validelement');
        $('#txtObligationProductAmountNewActual').removeClass('validelement');

        $('#txtObligationProductAmountNewActual').removeClass('obli_catalog_enable')
        $('#txtObligationProductAmountNewActual').addClass('obli_catalog_disable')

        $('#txtObligationCatalogQtyNew').removeClass('obli_catalog_enable')
        $('#txtObligationCatalogQtyNew').addClass('obli_catalog_disable')
        //manoj
        $('#obliCatalogQtysummary').text('');
        $('#catalogAmountsumaryTitle').text('');
        $('#catalogAmountsumaryValue').text('');
        //manoj

    }

});

$("#ddlObligationStatus").change(function (obj) {

    var obligationStatus = $("#ddlObligationStatus").val();

    if (obligationStatus == "Complete" || obligationStatus == "Cancelled") {

        var CDate = new Date();
        CDate = formatDate(CDate);
        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
        { CDate = moment(new Date(CDate)).format('MM/DD/YYYY'); }
        else { CDate = moment(new Date(CDate)).format(localStorage.AppDateFormat); }
        $("#ulObliCompletedate").css('display', '');
        $('#dtObligationNewCompletedDate').addClass('validelement');
        $('#dtObligationNewCompletedDate').addClass('validdate');
        $('#dtObligationNewCompletedDate').val(CDate);

    }
    else {
        $("#ulObliCompletedate").css('display', 'none');
        $('#dtObligationNewCompletedDate').removeClass('validelement');
        $('#dtObligationNewCompletedDate').removeClass('validdate');
        $('#dtObligationNewCompletedDate').val("");

    }

});


$("#ddlObligationCatalogUnits").change(function (obj) {
    if ($('#ddlObligationCatalogUnits').val() != "0") {
        $('#ddlObligationCatalogUnitsNew').val($('#ddlObligationCatalogUnits').val())
    }
    else {
        $('#ddlObligationCatalogUnitsNew').val("0");
    }
});



$("#ddlObligationCatalogUnitsEdit").change(function (obj) {
    if ($('#ddlObligationCatalogUnitsEdit').val() != "0") {
        $('#ddlObligationCatalogUnitsNewEdit').val($('#ddlObligationCatalogUnitsEdit').val())
    }
    else {
        $('#ddlObligationCatalogUnitsNewEdit').val("0");
    }
});



$("#txtObligationCatalogQtyEdit").focusout(function () {

    if ($("#txtObligationCatalogQtyEdit").val() != "") {
        var catlogStatus = $("#ddlObligationCatalogStatusEdit").val();
        if (catlogStatus == "Complete") {
            $("#txtObligationCatalogQtyNewEdit").prop('disabled', false);
            $('#txtObligationCatalogQtyNewEdit').addClass('validelement');

            $('#txtObligationCatalogQtyNewEdit').removeClass('obli_catalog_disable')
            $('#txtObligationCatalogQtyNewEdit').addClass('obli_catalog_enable')
        }
        else {
            $("#txtObligationCatalogQtyNewEdit").prop('disabled', true);
            $('#txtObligationCatalogQtyNewEdit').removeClass('validelement');
            $("#txtObligationCatalogQtyNewEdit").val('');
            $('#txtObligationProductAmountNewActualEdit').removeClass('validelement');
            $("#txtObligationProductAmountNewActualEdit").val('');
            $("#txtObligationCatalogQtyNewEdit").prop('disabled', true);

            $('#txtObligationProductAmountNewActualEdit').removeClass('obli_catalog_enable')
            $('#txtObligationProductAmountNewActualEdit').addClass('obli_catalog_disable')

            $('#txtObligationCatalogQtyNewEdit').removeClass('obli_catalog_enable')
            $('#txtObligationCatalogQtyNewEdit').addClass('obli_catalog_disable')

        }
    }
    else {
        $("#txtObligationCatalogQtyNewEdit").prop('disabled', true);
        $('#txtObligationCatalogQtyNewEdit').removeClass('validelement');
        $("#txtObligationCatalogQtyNewEdit").val('');

        $('#txtObligationCatalogQtyNewEdit').removeClass('obli_catalog_enable')
        $('#txtObligationCatalogQtyNewEdit').addClass('obli_catalog_disable')
    }

});


$("#txtObligationProductAmountNewEdit").focusout(function () {


    if ($("#txtObligationProductAmountNewEdit").val() != "") {
        var catlogStatus = $("#ddlObligationCatalogStatusEdit").val();
        if (catlogStatus == "Complete") {
            $("#txtObligationProductAmountNewActualEdit").prop('disabled', false);
            $('#txtObligationProductAmountNewActualEdit').addClass('validelement');


            $('#txtObligationProductAmountNewActualEdit').removeClass('obli_catalog_disable')
            $('#txtObligationProductAmountNewActualEdit').addClass('obli_catalog_enable')

        }
        else {
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


        }
    }
    else {
        $('#txtObligationProductAmountNewActualEdit').removeClass('validelement');
        $("#txtObligationProductAmountNewActualEdit").val('');
        $("#txtObligationProductAmountNewActualEdit").prop('disabled', true);

        $('#txtObligationProductAmountNewActualEdit').removeClass('obli_catalog_enable')
        $('#txtObligationProductAmountNewActualEdit').addClass('obli_catalog_disable')
    }


});

$("#txtObligationCatalogQtyNew").focusout(function () {

    if ($("#txtObligationCatalogQtyNew").val() != "") {
        var string1 = "";
        string1 = "Quantity Actual vs Expected, ";



        if (parseInt($("#txtObligationCatalogQtyNew").val()) >= parseInt($("#txtObligationCatalogQty").val())) {
            string1 += "+" + parseInt($("#txtObligationCatalogQtyNew").val()) - parseInt($("#txtObligationCatalogQty").val());

            $('#obliCatalogQtysummary').removeClass('oblig_cat_sum_dec')
            $('#obliCatalogQtysummary').addClass('oblig_cat_sum_act')

        }
        else {
            string1 += parseInt($("#txtObligationCatalogQtyNew").val()) - parseInt($("#txtObligationCatalogQty").val());

            $('#obliCatalogQtysummary').removeClass('oblig_cat_sum_act')
            $('#obliCatalogQtysummary').addClass('oblig_cat_sum_dec')
        }

        $("#obliCatalogQtysummary").text(string1)

    }
    else {
        $("#obliCatalogQtysummary").text("");
    }

});


$("#txtObligationProductAmountNewActual").focusout(function () {

    if ($("#txtObligationProductAmountNewActual").val() != "") {
        var string1 = "";
        var currency1 = $("#txtObligationProductAmountNew").val();
        var currency2 = $("#txtObligationProductAmountNewActual").val();
        currency1 = currency1.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '');
        currency2 = currency2.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '');

        string1 = "Amount Actual vs Expected, ";

        $('#catalogAmountsumaryTitle').text(string1);

        if (Number(parseFloat(currency2).toFixed(2)) >= Number(parseFloat(currency1).toFixed(2))) {


            var diff = Number(parseFloat(currency2).toFixed(2)) - Number(parseFloat(currency1).toFixed(2));
            $('#catalogAmountsumaryValue').autoNumeric('set', diff);
            $('#catalogAmountsumaryValue').removeClass('oblig_cat_sum_dec')
            $('#catalogAmountsumaryValue').addClass('oblig_cat_sum_act')

            $('#catalogAmountsumaryTitle').removeClass('oblig_cat_sum_dec')
            $('#catalogAmountsumaryTitle').addClass('oblig_cat_sum_act')

        }
        else {

            var diff = Number(parseFloat(currency2).toFixed(2)) - Number(parseFloat(currency1).toFixed(2));

            $('#catalogAmountsumaryValue').autoNumeric('set', diff);


            $('#catalogAmountsumaryValue').removeClass('oblig_cat_sum_act')
            $('#catalogAmountsumaryValue').addClass('oblig_cat_sum_dec')
            $('#catalogAmountsumaryTitle').removeClass('oblig_cat_sum_act')
            $('#catalogAmountsumaryTitle').addClass('oblig_cat_sum_dec')
        }


    }
    else {

        $('#catalogAmountsumaryValue').text('');
        $('#catalogAmountsumaryTitle').text('');
    }


});



$("#txtObligationCatalogQtyNewEdit").focusout(function () {

    if ($("#txtObligationCatalogQtyNewEdit").val() != "") {
        var string1 = "";
        string1 = "Quantity Actual vs Expected, ";



        if (parseInt($("#txtObligationCatalogQtyNewEdit").val()) >= parseInt($("#txtObligationCatalogQtyEdit").val())) {
            string1 += "+" + parseInt($("#txtObligationCatalogQtyNewEdit").val()) - parseInt($("#txtObligationCatalogQtyEdit").val());

            $('#obliCatalogQtyEditsummary').removeClass('oblig_cat_sum_dec')
            $('#obliCatalogQtyEditsummary').addClass('oblig_cat_sum_act')

        }
        else {
            string1 += parseInt($("#txtObligationCatalogQtyNewEdit").val()) - parseInt($("#txtObligationCatalogQtyEdit").val());

            $('#obliCatalogQtyEditsummary').removeClass('oblig_cat_sum_act')
            $('#obliCatalogQtyEditsummary').addClass('oblig_cat_sum_dec')
        }

        $("#obliCatalogQtyEditsummary").text(string1)

    }
    else {
        $("#obliCatalogQtyEditsummary").text("");
    }

});


$("#txtObligationProductAmountNewActualEdit").focusout(function () {

    if ($("#txtObligationProductAmountNewActualEdit").val() != "") {



        var string1 = "";
        var currency1 = $("#txtObligationProductAmountNewEdit").val();
        var currency2 = $("#txtObligationProductAmountNewActualEdit").val();
        currency1 = currency1.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '');
        currency2 = currency2.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '');

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
        $('#catalogAmountsumaryValueEdit').text('');
        $('#catalogAmountsumaryTitleEdit').text('');


    }


});


function getObligationCatalogsNew(contractid, obligationtext, obligationId) {
    $("#ulObligationCatalogBody").empty();
    $.ajax({
        url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationcatalogs?obligationtext=' + obligationtext + '&obligationId=' + obligationId,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: false,
        success: function (data) {
            $("#loadingPage").fadeOut();
            if (data.length > 0) {
                vCatalogCount = "Yes";

                var d = $.grep(data, function (p) { return p.ObligationCatalogStatus != "Complete" && p.ObligationCatalogStatus != "Cancelled"; })
      .map(function (p) { return p });

                if (d != null && d != "" && d.length > 0) {
                    validateproducts = false;
                }
                else {
                    validateproducts = true;
                }


                $('#txtObligationProductsCount').val("Yes");
                document.getElementById('obligationcatalogDetailsTable').style.display = '';
                document.getElementById('NoObligationCatalog').style.display = 'none';
                for (var i = 0; i < data.length; i++) {
                    var str = "";
                    var strCommitment = "";
                    var strCom = "";

                    var url = '<input type="checkbox" id="' + data[i].RowKey + '" name="MultipleObligationCatalogs" onclick="checkMultipleObligationCatalogs(this);" value="' + data[i].RowKey + '">&nbsp;<a  href="javascript:void(0)" onclick="ViewObligationCatalogDetail(\'' + data[i].RowKey + '\')" class="linkText">' + data[i].ObligationCatalogName + '</a>&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuRelatedObligationCatalogs"/>';

                    var htmlContent = "<tr>";
                    htmlContent += "<td  ><p id='ObligationCatalogID' style='display:none;'>" + data[i].RowKey + "</p>";
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



                    htmlContent += "<td style='padding:2px;'><a href='javascript:void(0);' onclick='checkObligationsstatusupdateNew(this);' class='obliAction obligation_satus openmenuObligationCatalogStatusSettings'>" + data[i].ObligationCatalogStatus + "<img class='margin_left_5px' src='/Content/Images/card.png'></a></td>";
                    htmlContent += "</tr>";
                    $("#ulObligationCatalogBody").append(htmlContent);

                }
                $(".openmenuRelatedObligationCatalogs").contextMenu({ menu: 'dropdownMenuRelatedObligationCatalogs', leftButton: true }, function (action, el, pos) {
                    contextMenuObligationCatalogs(action, el.parent("i").parent("td").parent("tr"), pos);
                });
                $(".openmenuRelatedObligationCatalogs").click(function () {
                    $("#dvfilter").hide();
                });
                $(".openmenuObligationCatalogSettings").contextMenu({ menu: 'dropdownMenuObligationCatalogSettings', leftButton: true }, function (action, el, pos) { contextMenuObligationCatalogMul(action, el.parent("tr"), pos); });

                $(".openmenuObligationCatalogSettings").click(function () {
                    $("#dvfilter").hide();
                });
                $(".openmenuObligationCatalogStatusSettings").contextMenu({
                    menu: 'dropdownMenuObligationStatusSettings', leftButton: true
                }, function (action, el, pos) {
                    contextMenuObligationCatalogStatusSettings(action, el.parent("td").parent("tr"), pos);
                });

                $(".openmenuObligationCatalogStatusSettings").click(function () {
                    $("#dvfilter").hide();
                });

            }
            else {

            }

        },
        error: function (data) {
            validateproducts = true;
            document.getElementById("cbObligationCatalogProductsSelect").disabled = false;
            vCatalogCount = "No";
            $('#NoObligationCatalog').css('display', '');

            $('#txtObligationProductsCount').val("No");
            $("#loadingPage").fadeOut();
            vExist = false;

        }
    });

}





$("#ddlObligationCatalogStatusEdit").change(function (obj) {
    var catlogStatus = $("#ddlObligationCatalogStatusEdit").val();
    if (catlogStatus == "Complete") {

        var CDate = new Date();
        CDate = formatDate(CDate);

        CDate = CDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');

        $("#productcompleteddateEdit").css('display', '');
        $('#dtObligationProductCompletedDateEdit').addClass('validelement');
        $('#dtObligationProductCompletedDateEdit').addClass('validdate');
        $('#dtObligationProductCompletedDateEdit').val(CDate);

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
    else if (catlogStatus == "Cancelled") {

        var CDate = new Date();
        CDate = formatDate(CDate);

        CDate = CDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');

        $("#productcompleteddateEdit").css('display', '');
        $('#dtObligationProductCompletedDateEdit').addClass('validelement');
        $('#dtObligationProductCompletedDateEdit').addClass('validdate');
        $('#dtObligationProductCompletedDateEdit').val(CDate);

        $("#txtObligationProductAmountNewActualEdit").prop('disabled', true);
        $("#txtObligationCatalogQtyNewEdit").prop('disabled', true);

        $("#txtObligationCatalogQtyNewEdit").val('');
        $("#txtObligationProductAmountNewActualEdit").val('');

        $('#txtObligationCatalogQtyNewEdit').removeClass('validelement');
        $('#txtObligationProductAmountNewActualEdit').removeClass('validelement');

        $('#txtObligationProductAmountNewActualEdit').removeClass('obli_catalog_enable');
        $('#txtObligationProductAmountNewActualEdit').addClass('obli_catalog_disable');

        $('#txtObligationCatalogQtyNewEdit').removeClass('obli_catalog_enable');
        $('#txtObligationCatalogQtyNewEdit').addClass('obli_catalog_disable');
    }
    else {

        $("#productcompleteddateEdit").css('display', 'none');
        $('#dtObligationProductCompletedDateEdit').removeClass('validelement');
        $('#dtObligationProductCompletedDateEdit').removeClass('validdate');
        $('#dtObligationProductCompletedDateEdit').val("");



        $("#txtObligationProductAmountNewActualEdit").prop('disabled', true);
        $("#txtObligationCatalogQtyNewEdit").prop('disabled', true);

        $("#txtObligationCatalogQtyNewEdit").val('');
        $("#txtObligationProductAmountNewActualEdit").val('');

        $('#txtObligationCatalogQtyNewEdit').removeClass('validelement');
        $('#txtObligationProductAmountNewActualEdit').removeClass('validelement');

        $('#txtObligationProductAmountNewActualEdit').removeClass('obli_catalog_enable');
        $('#txtObligationProductAmountNewActualEdit').addClass('obli_catalog_disable');

        $('#txtObligationCatalogQtyNewEdit').removeClass('obli_catalog_enable');
        $('#txtObligationCatalogQtyNewEdit').addClass('obli_catalog_disable');
        //manoj
        $("#obliCatalogQtyEditsummary").text("");
        $('#catalogAmountsumaryTitleEdit').text('');
        $('#catalogAmountsumaryValueEdit').text('');
        //manoj

    }



});





//Obligations Related Methods End


function applyFilter() {
    $("#dvfilter").hide();
    if ($("#hdActivityType").val() == "Task") {
        vtaskSearchVal = $('#txtSearchBox').val();
        quickViewMyTasks('default');
    } else if ($("#hdActivityType").val() == "Workflow") {
        vworkflowSearchVal = $('#txtSearchBox').val();
        quickViewMyWorkflows();
    } else if ($("#hdActivityType").val() == "Milestone") {
        vmilestonesSearchVal = $('#txtSearchBox').val();
        quickViewMyMilestones();
    }
    else if ($("#hdActivityType").val() == "Obligations") {
        vobligationSearchVal = $('#txtSearchBox').val();
        quickViewMyObligations();
    }
    else if ($("#hdActivityType").val() == "PendingObligations") {
        vpendingobligationSearchVal = $('#txtSearchBox').val();
        quickViewMyPendingObligations();
    }

}
var validateproducts = true;
var selectedSortOption = "";
function highlight(obj) {

    $('.SortBy').css("background-color", "");
    $(obj).css("background-color", "#cccccc");

    selectedSortOption = obj.textContent;


}

function liRemoveFilterMilestone(obj) {
    if ($(obj).attr('id') == 'iFiltersSearchText') {
        $('#txtSearchBox').val('');
    }
    else {
        var child = obj.parentNode;
        var firstChild = child.firstChild;

        var find = " ";
        var re = new RegExp(find, 'g');
        var vv = firstChild.nodeValue.replace(re, '');
        if (vv == 'Completed') { vv = 'Yes'; }
        else if (vv == 'NotCompleted') { vv = 'No'; }
        $("#filterMilestoneCompleted option[value='" + vv + "']").prop("selected", false);
        $("#filterMilestoneType option[value='" + vv + "']").prop("selected", false);
        //if No Completed is removed
        //if (vv == 'No') {
        //    $('#pHideMilestone').css('display', 'none');
        //    $('#chkHidePastDate').attr('checked', false);
        //}
    }

    quickViewMyMilestones();
}

function liRemoveFilterTask(obj) {
    if ($(obj).attr('id') == 'iFiltersSearchText') {
        $('#txtSearchBox').val('');
    }
    else {
        var child = obj.parentNode;
        var firstChild = child.firstChild;

        var find = " ";
        var re = new RegExp(find, 'g');
        var vv = firstChild.nodeValue.replace(re, '');
        $("#filterTaskStatus option:selected").prop('selected', false);
        $("#filterTaskStatus option[value='All']").prop("selected", true);
    }

    quickViewMyTasks('default');
}



function liRemoveFilterObligation(obj) {
    if ($(obj).attr('id') == 'iFiltersSearchText') {
        $('#txtSearchBox').val('');
    }
    else {
        var child = obj.parentNode;
        var firstChild = child.firstChild;

        var find = " ";
        var re = new RegExp(find, 'g');
        var vv = firstChild.nodeValue.replace(re, '');
        if (vv == 'Completed') { vv = 'Yes'; }
        else if (vv == 'Not Completed') { vv = 'No'; }
        $("#filterObligationStatus option[value='" + vv + "']").prop("selected", false);
        $("#filterObligationType option[value='" + vv + "']").prop("selected", false);

        var str = "";
        $('#filterObligationStatus :selected').each(function (i, selected) {
            str += $(this).val()
        });
        if (str == "Delayed") {
            $('#pHideObligation').css('display', 'none');
        } else {
            $('#pHideObligation').css('display', '');
        }
    }
    if ($("#hdActivityType").val() == "Obligations") {
        quickViewMyObligations();
    }
    else if ($("#hdActivityType").val() == "PendingObligations") {
        quickViewMyPendingObligations();
    }
    // quickViewMyObligations();
}


function liRemoveFilterWorkflow(obj) {
    if ($(obj).attr('id') == 'iFiltersSearchText') {
        $('#txtSearchBox').val('');
    }
    else {
        var child = obj.parentNode;
        var firstChild = child.firstChild;

        var find = " ";
        var re = new RegExp(find, 'g');
        var vv = firstChild.nodeValue.replace(re, '');
        $("#filterWorkflowStatus option[value='" + vv + "']").prop("selected", false);
        $("#filterWorkflowType option[value='" + vv + "']").prop("selected", false);
    }

    quickViewMyWorkflows();
}

function colorLink(objId, tobecolored) {
    if (tobecolored) {
        $('#' + objId).addClass("active_quick_view");
    }
    else {
        $('#' + objId).removeClass("active_quick_view");
    }
}

function clearSelection() {
    selectedSortOption = "";
    $('#txtSearchBox').val("");
    $("#liFiltersApplied").empty();

    $("#filterTaskStatus option:selected").prop('selected', false);
    $("#filterTaskStatus option[value='All']").prop("selected", true); //Bug id:eO38150
    //$("#filterTaskStatus option[value='InProgress']").prop("selected", false);
    $("#filterWorkflowStatus option:selected").prop('selected', false);
    $("#filterWorkflowType option:selected").prop('selected', false);
    $("#filterMilestoneCompleted option:selected").prop('selected', false);
    $("#filterMilestoneType option:selected").prop('selected', false);

    $("#filterObligationStatus option:selected").prop('selected', false);
    $("#filterObligationType option:selected").prop('selected', false);



    $("#aTaskRecentlyUpdated").css("background-color", "");
    $("#aTaskStartDate").css("background-color", "");
    $("#aTaskDueDate").css("background-color", "");
    $("#aTaskCompletedDate").css("background-color", "");
    $("#aWorkflowRecentlyUpdated").css("background-color", "");
    $("#aWorkflowStartDate").css("background-color", "");
    $("#aWorkflowCompletedDate").css("background-color", "");
    $("#aMilestoneRecentlyUpdated").css("background-color", "");
    $("#aExpiration").css("background-color", "");
    $("#aMilestoneDueDate").css("background-color", "");
    $("#aMilestoneCompletedDate").css("background-color", "");

    $("#aObligationDueDate").css("background-color", "");
    $("#aObligationRecentlyUpdated").css("background-color", "");
    $("#aObligationCompletedDate").css("background-color", "");

    applyFilter();
}


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}




function BindContractDetails(contractid, obligationentity) {

    $.ajax({
        url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + contractid,
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
        processData: false,
        success: function (item) {
            contrcatItem = item;
            $("#hdnContractID").text(item.RowKey);

            $("#hdnOldEndDate").text(item.EndDate);

            $("#lblCounterparty").text(item.Counterparty);
            $("#lblCompanyProfile").text(item.CompanyProfile);
            $("#hdnContractCurrency").text(item.ContractCurrency);
            var vContractStatus = ["Ready for Signature", "Awaiting Signatures", "Signed", "Active", "Up for Renewal", "Renewed", "Extended", "On Hold", "Replaced", "Expired", "Cancelled", "Terminated", "Archived", "About to Expire"];
            if ($.inArray(item.Status, vContractStatus) > -1) {
                //$(".AlertEnabled").removeClass("disabled_slider");
                IsPipeline = false;
            }
            else {
                IsPipeline = true;
                //$(".AlertEnabled").addClass("disabled_slider");
            }
            BindObligationDetails(obligationentity);
        },
        error: function () {
            BindObligationDetails(obligationentity);
            $("#loadingPage").fadeOut();
        }
    });
}


function BindObligationDetails(obligationentity) {
    $("#loadingPage").fadeOut();
    var strCompanyProfile = "";
    var strCounterpartynew = "";


    $('#hdnProductUpdates').text('EDIT');
    $("#hdnObligationUniqueId").text(obligationentity.ObligationText);
    $("#hdnObligationRowKey").text(obligationentity.RowKey);


    if ($("#lblCompanyProfile").text() == null || $("#lblCompanyProfile").text() == "" || $("#lblCompanyProfile").text() == "null") {
        strCompanyProfile = "Not Available"
    }
    else {
        strCompanyProfile = $("#lblCompanyProfile").text();
    }

    if ($("#lblCounterparty").text() == null || $("#lblCounterparty").text() == "" || $("#lblCounterparty").text() == "null") {
        strCounterpartynew = "Not Available";
        document.getElementById("rdObligationNewPerformedPartyCP").disabled = true;

    }
    else {
        strCounterpartynew = $("#lblCounterparty").text();
        document.getElementById("rdObligationNewPerformedPartyCP").disabled = false;

    }


    if ($("#hdnContractCurrency").text() == null || $("#hdnContractCurrency").text() == "" || $("#hdnContractCurrency").text() == "null") {
        $("#hdnContractCurrency").text("USD");
    }



    GetValuesAndAutoPopulate("ddlSendReminderToObligationNew", obligationentity.SendReminderTo);


    if (obligationentity.Reminder1 != null && obligationentity.Reminder1 != "" && obligationentity.Reminder1 != 0) {
        $("#txtReminder1ObligationNew").val(obligationentity.Reminder1);
    }
    else {
        $("#txtReminder1ObligationNew").val("");
    }

    if (obligationentity.Reminder2 != null && obligationentity.Reminder2 != "" && obligationentity.Reminder2 != 0) {
        $("#txtReminder2ObligationNew").val(obligationentity.Reminder2);
    }
    else {
        $("#txtReminder2ObligationNew").val("");
    }
    if (obligationentity.Reminder3 != null && obligationentity.Reminder3 != "" && obligationentity.Reminder3 != 0) {
        $("#txtReminder3ObligationNew").val(obligationentity.Reminder3);
    }
    else {
        $("#txtReminder3ObligationNew").val("");
    }

    if (obligationentity.Reminder1Condition != '') {
        $("#ddlReminder1ObligationNew option").filter(function (index) { return $(this).text() === obligationentity.Reminder1Condition; }).prop('selected', true);
    }
    else {
        $("#ddlReminder1ObligationNew").val('before')
    }
    if (obligationentity.Reminder2Condition != '') {
        $("#ddlReminder2ObligationNew option").filter(function (index) { return $(this).text() === obligationentity.Reminder2Condition; }).prop('selected', true);
    }
    else {
        $("#ddlReminder2ObligationNew").val('before')
    }
    if (obligationentity.Reminder3Condition != '') {
        $("#ddlReminder3ObligationNew option").filter(function (index) { return $(this).text() === obligationentity.Reminder3Condition; }).prop('selected', true);
    }
    else {
        $("#ddlReminder3ObligationNew").val('before')
    }


    $("#ddlObligationNewPriority option").filter(function (index) { return $(this).text() === obligationentity.Priority; }).prop('selected', true);
    $('input[type="radio"][name="ObligationNewAutoComplete"][value="' + obligationentity.AutoComplete + '"]').prop('checked', true);
    $('input[type="radio"][name="ShowInObligCalendar"][value="' + obligationentity.ShowInCalendar + '"]').prop('checked', true);


    string1 = "My Company" + " " + "(" + strCompanyProfile + ")";
    string2 = "Counterparty" + " " + "(" + strCounterpartynew + ")";

    $("#PerformedPartySelf").text(string1);
    $("#PerformedPartyCounterparty").text(string2);
    vObligationTextEditRecurrence = "";

    $("#lblCTitleObligationNew").text(obligationentity.ContractTitle)
    var duedate = "";

    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
    { duedate = moment(new Date(obligationentity.DueDate)).format('MM/DD/YYYY'); }
    else { duedate = moment(new Date(obligationentity.DueDate)).format(localStorage.AppDateFormat); }

    $("#txtObligationNewID").val(obligationentity.RowKey);
    $("#txtObligationNewText").val(obligationentity.ObligationText);
    $("#txtObligationNewTitle").val(obligationentity.ObligationTitle);
    $("#ddlObligationTypeNew option").filter(function (index) { return $(this).text() === obligationentity.ObligationType; }).prop('selected', true);
    $("#txtObligationNewDesc").val(obligationentity.Description);
    GetValuesAndAutoPopulate("ddlObligationNewOwner", obligationentity.ObligationOwner);
    // $("#dtObligationNewDueDate").val(duedate);
    $('#dtObligationNewDueDate').datepicker('setDate', duedate);
    $('input[type="radio"][name="PerformedParty"][value="' + obligationentity.PerformedBy + '"]').prop('checked', true);
    $("#ddlObligationStatus option").filter(function (index) { return $(this).text() === obligationentity.ObligationStatus; }).prop('selected', true);

    $("#ddlObligationOccurencess option").filter(function (index) { return $(this).text() === obligationentity.Recurrences; }).prop('selected', true);
    var newDate = new Date(obligationentity.DueDate);
    //listObligationNewStartDate = duedate;
    listObligationNewStartDate = $.datepicker.formatDate('mm/dd/yy', $("#dtObligationNewDueDate").datepicker('getDate'));

    var strEndDate = "";
    if (obligationentity.ContractEndDate != "" && obligationentity.ContractEndDate != null && obligationentity.ContractEndDate != "null") {
        strEndDate = new Date(obligationentity.ContractEndDate);
        listObligationNewEndDate = formatDate(strEndDate);
        $('#ObligationNewOcurrenceEndDate').text("");

        var fEndDate = "";
        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
        { fEndDate = moment(new Date(listObligationNewEndDate)).format('MM/DD/YYYY'); }
        else { fEndDate = moment(new Date(listObligationNewEndDate)).format(localStorage.AppDateFormat); }
        $('#ObligationNewOcurrenceEndDate').text(" (" + fEndDate + ")");
        $("#rdObligationNewEndOccurence").prop("checked", true);
    }
    else {
        listObligationNewEndDate = "Not Available";
        $('#ObligationNewOcurrenceEndDate').text("");
        $('#ObligationNewOcurrenceEndDate').text(" (" + listObligationNewEndDate + ")");
        $("#rdObligationNewEndOccurence").attr('disabled', true);
        $('#rdObligationNewEndOccurence').removeAttr('checked');
        $("#rdObligationNewEndOccurenceUser").prop("checked", true);


    }

    if (obligationentity.ObligationStatus == "Complete" || obligationentity.ObligationStatus == "Cancelled") {
        $("#ulObliCompletedate").css('display', '');
        $('#dtObligationNewCompletedDate').addClass('validelement');
        $('#dtObligationNewCompletedDate').addClass('validdate');
        if (obligationentity.ObligationMetDate != null && obligationentity.ObligationMetDate != "") {

            var fMetDate = "";
            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
            { fMetDate = moment(new Date(obligationentity.ObligationMetDate)).format('MM/DD/YYYY'); }
            else { fMetDate = moment(new Date(obligationentity.ObligationMetDate)).format(localStorage.AppDateFormat); }
            $('#dtObligationNewCompletedDate').val(fMetDate);
        }
        else {
            var CEDate = new Date();
            CEDate = formatDate(CEDate);

            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
            { CEDate = moment(new Date(CEDate)).format('MM/DD/YYYY'); }
            else { CEDate = moment(new Date(CEDate)).format(localStorage.AppDateFormat); }
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



    var dtStartdate = "";

    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
    { dtStartdate = moment(new Date(obligationentity.ObligationStartDate)).format('MM/DD/YYYY'); }
    else { dtStartdate = moment(new Date(obligationentity.ObligationStartDate)).format(localStorage.AppDateFormat); }

    var dtEnddate = "";
    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
    { dtEnddate = moment(new Date(obligationentity.ObligationEndDate)).format('MM/DD/YYYY'); }
    else { dtEnddate = moment(new Date(obligationentity.ObligationEndDate)).format(localStorage.AppDateFormat); }

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


        var strRecString = obligationentity.CustomString.split(',');

        $(strRecString).each(function (index, element) {
            var value = parseInt(element);
            var chkboxId = "ORC" + value;
            $("#" + chkboxId).prop('checked', true);
        });

        //var strRecString = obligationentity.CustomString;
        //var value = parseInt(strRecString);
        //$("input:checkbox[name=chkRecurrenceCustom]").each(function () {
        //    this.checked = false;

        //});

        //var chkboxId = "ORC" + value;

        //$("#" + chkboxId).prop('checked', true);
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

    var oblnewdate1 = "";
    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
    { oblnewdate1 = moment(new Date(obligationentity.DueDate)).format('MM/DD/YYYY'); }
    else { oblnewdate1 = moment(new Date(obligationentity.DueDate)).format(localStorage.AppDateFormat); }

    var oblnewdate2 = "";
    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
    { oblnewdate2 = moment(new Date(obligationentity.ObligationEndDate)).format('MM/DD/YYYY'); }
    else { oblnewdate2 = moment(new Date(obligationentity.ObligationEndDate)).format(localStorage.AppDateFormat); }

    $('#orepupdatesingle').text("");
    $('#orepupdaterecurrence').text("");
    $('#ornepupdatesingle').text("");
    $('#ornepupdaterecurrence').text("");

    $('#orepupdatesingle').text("(" + oblnewdate1 + ")");
    $('#orepupdaterecurrence').text("(" + oblnewdate1 + " to " + oblnewdate2 + ")");
    $('#ornepupdatesingle').text("(" + oblnewdate1 + ")");
    $('#ornepupdaterecurrence').text("(" + oblnewdate1 + " to " + oblnewdate2 + ")");


    getObligationCatalogsNew(obligationentity.ContractID, $("#txtObligationNewText").val(), obligationentity.RowKey);


    if (vCatalogCount == "Yes") {
        $("#trObliFinShow").css('display', 'none');
        document.getElementById("cbObligationCatalogProductsSelect").checked = true;

        document.getElementById("cbObligationCatalogProductsSelect").disabled = true;
        $("#dvObligationCatalogProducts").css('display', '');

    }
    if (obligationentity.AlertsEnabled == "Yes") {
        $("#AlertObli").val('Yes').change();
        if (IsPipeline) {
            $("#reminderEnableObligation").empty();
            $("#reminderEnableObligation").append("Reminders <span style='color: red;margin-left: 23%'>To turn OFF reminders for obligation notification, click <a href='javascript:void(0);' id='disableOSwitch' onclick='disableObligationSwitch()'>Disable</a></span>");
        }
        else {
            $("#reminderEnableObligation").empty();
            $("#reminderEnableObligation").append("Reminders");
        }
    }
    else {
        $("#AlertObli").val('No').change();
        if (IsPipeline) {
            $("#reminderEnableObligation").empty();
            $("#reminderEnableObligation").append("Reminders <span style='color: red;margin-left: 23%'>To turn ON reminders for obligation notification, click <a href='javascript:void(0);' id='disableOSwitch' onclick='enableObligationSwitch()'>Enable</a></span>");
        }
        else {
            $("#reminderEnableObligation").empty();
            $("#reminderEnableObligation").append("Reminders");
        }
    }

}

$("#AlertObli").change(function () {
    if (IsPipeline) {
        if ($(this).val() == "Yes") {
            $("#reminderEnableObligation").empty();
            $("#reminderEnableObligation").append("Reminders <span style='color: red;margin-left: 23%'>To turn OFF reminders for obligation notification, click <a href='javascript:void(0);' id='disableOSwitch' onclick='disableObligationSwitch()'>Disable</a></span>");
        }
        else if ($(this).val() == "No") {
            $("#reminderEnableObligation").empty();
            $("#reminderEnableObligation").append("Reminders <span style='color: red;margin-left: 23%'>To turn ON reminders for obligation notification, click <a href='javascript:void(0);' id='disableOSwitch' onclick='enableObligationSwitch()'>Enable</a></span>");
        }
    }
});

function enableObligationSwitch() {
    $("#AlertObli").val('Yes').change();
    //$("#enableOSwitch").parent().remove();
    if (IsPipeline) {
        $("#reminderEnableObligation").empty();
        $("#reminderEnableObligation").append("Reminders <span style='color: red;margin-left: 23%'>To turn OFF reminders for obligation notification, click <a href='javascript:void(0);' id='disableOSwitch' onclick='disableObligationSwitch()'>Disable</a></span>");
    }
}

function disableObligationSwitch() {
    $("#AlertObli").val('No').change();
    //$("#enableOSwitch").parent().remove();
    if (IsPipeline) {
        $("#reminderEnableObligation").empty();
        $("#reminderEnableObligation").append("Reminders <span style='color: red;margin-left: 23%'>To turn ON reminders for obligation notification, click <a href='javascript:void(0);' id='disableOSwitch' onclick='enableObligationSwitch()'>Enable</a></span>");
    }
}

function SelectedObligationTitleNew(obj) {
    var curVal = $(obj).val();
    if (curVal != 0) {
        if ($("#lblCounterparty").text() != null && $("#lblCounterparty").text() != "") {
            if ($("input:radio[name=PerformedParty]:checked").val() == "Self") {

                if ($("#txtObligationNewTitle").val() == null || $("#txtObligationNewTitle").val() == "") {
                    $("#txtObligationNewTitle").val(curVal + " for " + $("#lblCounterparty").text());

                }

            }
            else {
                if ($("#txtObligationNewTitle").val() == null || $("#txtObligationNewTitle").val() == "") {
                    $("#txtObligationNewTitle").val(curVal + " from " + $("#lblCounterparty").text());
                }
            }
        }
    }

}

function quickViewDisplay(obj) {
    $("#txtSearchBox").val("");
    $("#btnMultipleAction").css('display', 'none');
    if (obj.title == "Tasks") {
        $("#aObligationCompletedDate").css('display', '');
        $("#filterTaskStatus option:selected").prop('selected', false);
        $('#chkHidePastDateTasks').prop('checked', true);
        $("#filterTaskStatus").find('option[value="InProgress"]').prop("selected", true);

        if (!($("#conSortByOptions option[value='Due Date']").length > 0)) {
            $('#conSortByOptions').append(new Option('Due Date', 'Due Date'));
        }
        else if (!($("#conSortByOptions option[value='Start Date']").length > 0)) {
            $('#conSortByOptions').append(new Option('Start Date', 'Start Date'));
        }

        $("#conSortByOptions").val('Recently Updated')
        $("#conSortByOptions").prop('disabled', false).niceSelect('update');
        quickViewMyTasks('default');
    } else if (obj.title == "Workflows") {
        //$('#dvfilter').css("width", "60% !important");
        $('#dvfilter').css('cssText', 'width: 45% !important');
        $("#aObligationCompletedDate").css('display', '');
        $("#filterWorkflowStatus option:selected").prop('selected', false);
        $("#filterWorkflowType option:selected").prop('selected', false);


        $("#conSortByOptions option[value='Due Date']").remove();
        if (!($("#conSortByOptions option[value='Start Date']").length > 0)) {
            $('#conSortByOptions').append(new Option('Start Date', 'Start Date'));
        }

        $("#conSortByOptions").val('Recently Updated')
        $("#conSortByOptions").prop('disabled', false).niceSelect('update');
        quickViewMyWorkflows('default');
    } else if (obj.title == "Milestones") {
        //$('#dvfilter').css("width", "60% !important");
        $('#dvfilter').css('cssText', 'width: 45% !important');
        $("#aObligationCompletedDate").css('display', '');
        $("#filterMilestoneCompleted option:selected").prop('selected', false);
        $("#filterMilestoneType option:selected").prop('selected', false);
        vmilestonesSearchVal = $('#txtSearchBox').val();
        //$('#pHideMilestone').css('display', '');
        $('#chkHidePastDate').prop('checked', true);


        $("#conSortByOptions option[value='Start Date']").remove();
        if (!($("#conSortByOptions option[value='Due Date']").length > 0)) {
            $('#conSortByOptions').append(new Option('Due Date', 'Due Date'));
        }

        $("#conSortByOptions").val('Recently Updated')
        $("#conSortByOptions").prop('disabled', false).niceSelect('update');
        quickViewMyMilestones('default');
    }
    else if (obj.title == "Obligations") {
        //$('#dvfilter').css("width", "60% !important");
        $('#dvfilter').css('cssText', 'width: 45% !important');
        $("#aObligationCompletedDate").css('display', '');
        $("#filterObligationStatus option:selected").prop('selected', false);
        $("#filterObligationType option:selected").prop('selected', false);
        $('#pHideObligation').css('display', '');
        $('#chkHidePastDateObligation').prop('checked', true);


        $("#conSortByOptions option[value='Start Date']").remove();
        if (!($("#conSortByOptions option[value='Due Date']").length > 0)) {
            $('#conSortByOptions').append(new Option('Due Date', 'Due Date'));
        }

        $("#conSortByOptions").val('Recently Updated')
        $("#conSortByOptions").prop('disabled', false).niceSelect('update');
        quickViewMyObligations('default');
    }
    else if (obj.title == "Pending Obligations") {
        //$('#dvfilter').css("width", "60% !important");
        $('#dvfilter').css('cssText', 'width: 60% !important');
        $("#aObligationCompletedDate").css('display', 'none');
        $("#filterObligationStatus option:selected").prop('selected', false);
        $("#filterObligationType option:selected").prop('selected', false);


        $("#conSortByOptions option[value='Start Date']").remove();
        if (!($("#conSortByOptions option[value='Due Date']").length > 0)) {
            $('#conSortByOptions').append(new Option('Due Date', 'Due Date'));
        }

        $("#conSortByOptions").val('Recently Updated')
        $("#conSortByOptions").prop('disabled', false).niceSelect('update');
        quickViewMyPendingObligations();
    }
}
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

//Sridhar
function MarkAsCompleted() {
    if ($("#tblMetadataDetailForOwner").find("ul")[0].className.indexOf("Milestone") > -1) {
        var milestoneID = ($("#tblMetadataDetailForOwner ul li#milestoneID").children()[1].textContent != "" ? $("#tblMetadataDetailForOwner ul li#milestoneID").children()[1].textContent.trim() : "");
        var milestoneTitle = ($("#tblMetadataDetailForOwner ul li#milestoneTitle span")[0].textContent != "" ? $("#tblMetadataDetailForOwner ul li#milestoneTitle span")[0].textContent.trim() : "");
        var formDataStatusMile = new FormData();
        formDataStatusMile.append("MilestoneIDs", milestoneID);
        $("#loadingPage").fadeIn();

        $.ajax({
            url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/milestones/changestatus?status=Complete',
            type: 'PUT',
            dataType: 'json',
            data: formDataStatusMile,
            contentType: false,
            processData: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
            cache: false,
            success: function (result) {
                $("a#aMilestones").trigger("click");
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
        var vObligationTitle = ($("#tblMetadataDetailForOwner ul li#obligationTitle span")[0].textContent != "" ? $("#tblMetadataDetailForOwner ul li#obligationTitle span")[0].textContent.trim() : "");
        var vObligationText = ($("#tblMetadataDetailForOwner ul li#ObligationTEXT span")[0].textContent != "" ? $("#tblMetadataDetailForOwner ul li#ObligationTEXT span")[0].textContent.trim() : "");
        $("#loadingPage").fadeIn();
        $.ajax({
            url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationcatalogs?obligationtext=' + vObligationText + '&obligationId=' + vObligationID,
            type: 'GET',
            dataType: 'json',
            "Content-Type": "application/json",
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
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
                            url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/updateobligationbyId?obligationId=' + vObligationID + '&obligationstatus=' + 'Complete',
                            type: 'POST',
                            dataType: 'json',
                            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                            cache: false,
                            success: function (person) {
                                if ($("#spnMyObligations").hasClass("active_quick_view")) {
                                    $("#aObligationCompletedDate").css('display', '');
                                    $("#filterObligationStatus option:selected").prop('selected', false);
                                    $("#filterObligationType option:selected").prop('selected', false);
                                    quickViewMyObligations();
                                }
                                else if ($("#spnMyPendingObligations").hasClass("active_quick_view")) {
                                    $("#aObligationCompletedDate").css('display', 'none');
                                    $("#filterObligationStatus option:selected").prop('selected', false);
                                    $("#filterObligationType option:selected").prop('selected', false);
                                    quickViewMyPendingObligations();
                                }

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
                        url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/updateobligationbyId?obligationId=' + vObligationID + '&obligationstatus=' + 'Complete',
                        type: 'POST',
                        dataType: 'json',
                        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                        cache: false,
                        success: function (person) {
                            if ($("#spnMyObligations").hasClass("active_quick_view")) {
                                $("#aObligationCompletedDate").css('display', '');
                                $("#filterObligationStatus option:selected").prop('selected', false);
                                $("#filterObligationType option:selected").prop('selected', false);
                                quickViewMyObligations();
                            }
                            else if ($("#spnMyPendingObligations").hasClass("active_quick_view")) {
                                $("#aObligationCompletedDate").css('display', 'none');
                                $("#filterObligationStatus option:selected").prop('selected', false);
                                $("#filterObligationType option:selected").prop('selected', false);
                                quickViewMyPendingObligations();
                            }

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
                    url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/updateobligationbyId?obligationId=' + vObligationID + '&obligationstatus=' + 'Complete',
                    type: 'POST',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                    cache: false,
                    success: function (person) {
                        if ($("#spnMyObligations").hasClass("active_quick_view")) {
                            $("#aObligationCompletedDate").css('display', '');
                            $("#filterObligationStatus option:selected").prop('selected', false);
                            $("#filterObligationType option:selected").prop('selected', false);
                            quickViewMyObligations();
                        }
                        else if ($("#spnMyPendingObligations").hasClass("active_quick_view")) {
                            $("#aObligationCompletedDate").css('display', 'none');
                            $("#filterObligationStatus option:selected").prop('selected', false);
                            $("#filterObligationType option:selected").prop('selected', false);
                            quickViewMyPendingObligations();
                        }

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

//Sridhar
function ViewContractDetails() {
    if ($("#tblMetadataDetailForOwner").find("ul").length > 0) {
        var contractID = ($("#viewMetadataDetailForOwner ul li#contractID").children()[1].textContent != "" ? $("#viewMetadataDetailForOwner ul li#contractID").children()[1].textContent.trim() : "");
        location = "/Contracts/ContractDetails?ContractID=" + contractID + "";
    }
    else {
        var contractID = ($("#tblMetadataDetail tr#contractID td")[1].textContent != "" ? $("#tblMetadataDetail tr#contractID td")[1].textContent.trim() : "");
        location = "/Contracts/ContractDetails?ContractID=" + contractID + "";
    }
}
function getContractStatus(contractID) {
    var contractStatus = '';
    $.ajax({
        url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/contracts/contractstatus?ContractID=' + contractID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: false,
        success: function (status) {
            contractStatus = status;
        },
        error: function (status) {
        }

    });
    return contractStatus;
}

function BindNewContractDetails(contractid) {
    $("#loadingPage").fadeIn();
    $.ajax({
        url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + contractid,
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
        processData: false,
        async: false,
        success: function (item) {
            newContractItem = item;
        },
        error: function () {
            $("#loadingPage").fadeOut();
        }
    });
}
//Sridhar

//$("#filterMilestoneCompleted").change(function () {
//    var str = "";
//    $("#filterMilestoneCompleted option:selected").each(function () {
//        str += $(this).val()
//    });  
//    if (str == "No") {
//        $('#pHideMilestone').css('display', '');
//        $('#chkHidePastDate').attr('checked', true);
//    } else {
//        $('#pHideMilestone').css('display', 'none');
//        $('#chkHidePastDate').attr('checked', false);
//    }
//});

$("#filterObligationStatus").change(function () {
    var str = "";
    $("#filterObligationStatus option:selected").each(function () {
        str += $(this).val()
    });
    if (str == "Delayed") {
        $('#pHideObligation').css('display', 'none');
        $('#chkHidePastDateObligation').attr('checked', false);
    } else {
        $('#pHideObligation').css('display', '');
        $('#chkHidePastDateObligation').attr('checked', true);
    }
});

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

function Loading_View_trigger() {
    BindMilestoneTypes();
    BindObligationTypes();
    BindPeople();
    BindUnitTypes();
}

$("#buttonfltr").click(function () {
    if ($(".nice-select").hasClass("open")) {
        $('.nice-select').removeClass('open');
    }
});
$('body').click(function () {
    $("#conSortByOptions").niceSelect();
});