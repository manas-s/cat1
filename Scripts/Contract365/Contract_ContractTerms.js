var contrcatItem = [];
var EndDateCheck = "";
var EndDateCheckRenewal = "";
var CurrentTermDetails = "";
var vContractID = getParameterByName('ContractID');
var renewalPrevDate;
var RenewalAddFlag = false;
var RenewalItemEdit = "";
var DatepickerFormat = '';
var NextTermRenewFlag = false;
var maxAllowedDate;
var RenewalName = "";
var EditSaveFlag = false;
var vAlertEnabled;
var defaultGlobalSettings = "";
//Sridhar
var TermTypeHelpText = {};
var TermTypeDisplayName = {};
//Added 2.4final to 2.4
var upForRenewal = "";
var vRenewalConfirmParticipants = "";
//
var renewAuthName = "";
var isRenewedManual = "No";
$(document).ready(function () {

    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
    { DatepickerFormat = 'mm/dd/yy'; }
    else { DatepickerFormat = localStorage.AppDateFormat.toLowerCase().slice(0, -2); }
    $("#RenewalTermNew").dialog({
        autoOpen: false,
        closeText: "",
        width: "70%",
        title: "Initial Term",
        dialogClass: "popup_width100",
        modal: true,
        buttons: [
        {
            text: "Ok",
            "id": "btnAddNewTerm",
            click: function () {
                if (!isRenewTermClick) {
                    if (requiredValidator('RenewalTermNew', false)) {
                        var valcheckauth = $(':input[type=radio][name=TermsSingleMultiple]:checked').val();
                        var val = true;
                        if (valcheckauth == "Yes") {
                            TermName = $("#tdNameofTerms").html().trim();
                            val = SaveAsTableRow(TermName, false);

                            addRenewalComment(TermName, false);

                        }
                        else {
                            TermName = $("#tdNameofTerms").html().trim().split(', ');
                            $.each(TermName, function (i, item) {
                                val = SaveAsTableRow(item, false);
                            });

                            addRenewalComment(TermName, true);
                        }
                        SaveRowClearForm();
                        if (typeof (val) == "undefined" || val)
                            $(this).dialog("close");
                    }
                }
                else {
                    var vRenewalChecklist = "";
                    if ($("#chkRenewalModificationsNew").is(':checked')) {
                        if (vRenewalChecklist == '') {
                            vRenewalChecklist = "Renewal without any modifications";
                        }
                        else {
                            vRenewalChecklist += "; Renewal without any modifications";
                        }
                    }
                    if ($("#chkRenewalPriceAdjustmentsNew").is(':checked')) {
                        if (vRenewalChecklist == '') {
                            vRenewalChecklist = "Renewal with Price Adjustments (minor)";
                        }
                        else {
                            vRenewalChecklist += "; Renewal with Price Adjustments (minor)";
                        }
                    }
                    if ($("#chkRenewalRepricingNew").is(':checked')) {
                        if (vRenewalChecklist == '') {
                            vRenewalChecklist = "Renewal with Repricing (major)";
                        }
                        else {
                            vRenewalChecklist += "; Renewal with Repricing (major)";
                        }
                    }
                    if ($("#chkRenewalOtherNew").is(':checked')) {
                        if (vRenewalChecklist == '') {
                            vRenewalChecklist = "Other Amendments";
                        }
                        else {
                            vRenewalChecklist += "; Other Amendments";
                        }
                    }

                    if (vRenewalChecklist == "") {
                        swal("", "Select Renewal Checklist.");
                        return false;
                    }
                    else {
                        TermName = $("#tdNameofTerms").html().trim();
                        var digit = parseInt(TermName.replace("Renewal", "")) + 1;
                        $("#RenewalChecklist" + digit).html(vRenewalChecklist);

                        var RenewalNotfInternal = $("#ddlRenewalNotfInternalNew").val();
                        var vRenewalNotificationInternal = '';
                        $(RenewalNotfInternal).each(function (i, item) {
                            if (vRenewalNotificationInternal == '') {
                                vRenewalNotificationInternal = item;
                            }
                            else {
                                vRenewalNotificationInternal += "; " + item;
                            }
                        });
                        $("#RenewalNotificationInternal" + digit).html(vRenewalNotificationInternal);
                        addRenewalComment(TermName, false);
                        RenewInTermPopup();

                        $(this).dialog("close");
                    }

                }

            }
        },
        {
            text: "Cancel",
            click: function () {
                $(this).dialog("close");
            }
        }
        ],
        close: function () {
            RenewalAddFlag = false;
            RenewalItemEdit = "";
            $("#txtRenewStartDate").val('');
            $("#txtRenewEndDate").val('');
            GetValuesAndAutoPopulate("ddlRenewalNotfInternalNew", "");
            $("#txtRenewalNotesNew").val('');
            $('input[type="checkbox"][name="checkboxNotifyNew"]').prop('checked', false);
            $("#rdRenewTermEndDate").val('');
            $('input[type="radio"][name="rdRenewTermEndDate"][value="Term"]').prop('checked', true);
            $("#ContractTermRenewNew").val(1);
            $("#ContractTermRenewChoicesNew").val('days');
            $("#txtRenewStartDate").datepicker("option", "minDate", null);
            $("#txtRenewStartDate").datepicker("option", "maxDate", null);
            NextTermRenewFlag = false;
            EndDateCheckRenewal = "";
            $("#termNotesComments").html('Notes');
        }
    });
    $("#RenewalTermNewlb").dialog({
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
        close: function (event, ui) {


        }
    });

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
    $("#dvContractTerm").dialog({
        autoOpen: false,
        closeText: "",
        width: "70%",
        title: "Manage Contract Term & Renewals",
        dialogClass: "popup_width100",
        position: {
            at: "top", of: window
        },
        modal: true
    });

    $('#txtRenewStartDate').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: DatepickerFormat,
        onSelect: function (selected) {
            var dt2 = $('#txtRenewEndDate');
            var startDate = $(this).datepicker('getDate');
            startDate.setDate(startDate.getDate() + 1);
            dt2.datepicker('option', 'minDate', startDate);
            calculateenddateRenew('txtRenewStartDate', 'ContractTermRenewChoicesNew', 'ContractTermRenewNew', 'txtRenewEndDate');
        }
    }).click(function () { $(this).focus() });
    $('#txtRenewEndDate').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: DatepickerFormat,
        onSelect: function (selected) {
            calculateenddateRenew('txtRenewStartDate', 'ContractTermRenewChoicesNew', 'ContractTermRenewNew', 'txtRenewEndDate');
        }
    }).click(function () {
        $(this).focus()
    });

    $('#txtContractTermStartDate').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: DatepickerFormat,
        onSelect: function (dateText, inst) {
            calculateenddate();
            if (contrcatItem.TermEndDate == null) {
                var vDT = new Date(dateText);
                vDT = moment(vDT).add(1, 'year').format('MM/DD/YYYY');
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                { vDT = moment(new Date(vDT)).format('MM/DD/YYYY'); }
                else {
                    vDT = moment(new Date(vDT)).format(localStorage.AppDateFormat);
                }
                $("#txtContractTermEnds").val(vDT);
                //if ($('input[type="radio"][name=TermAutoRenewal]:checked').val() == "Yes") {
                $("#txtContractTermRenewOn").val(vDT);
                //}
            }
        },
    }).click(function () {
        $(this).focus()
    });
    $('#txtContractTermStartDateRenew').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: DatepickerFormat,

    }).click(function () { $(this).focus() });
    $('#txtContractTermEvaluationDate').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: DatepickerFormat,
    }).click(function () {
        $(this).focus()
    });
    $('#txtContractTermEndDate').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: DatepickerFormat,
    }).click(function () {
        $(this).focus()
    });
    $('#txtContractTermEnds').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: DatepickerFormat,
        onSelect: function (dateText, inst) {
            //if ($('input[type="radio"][name=TermAutoRenewal]:checked').val() == "Yes") {
            $("#txtContractTermRenewOn").val(dateText);
            //}
        },
    }).click(function () { $(this).focus() });
    $('#txtContractTermRenewOn').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: DatepickerFormat,
        onSelect: function (dateText, inst) {
            var vDT = new Date(dateText);
            vDT = moment(vDT).add(60, 'days').format('MM/DD/YYYY');
            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                vDT = moment(new Date(vDT)).format('MM/DD/YYYY');
            }
            else { vDT = moment(new Date(vDT)).format(localStorage.AppDateFormat); }
            if ($('input[type="radio"][name=TermAutoRenewal]:checked').val() == "No")
                $("#txtContractTermExpireOn").val(vDT);
        }
    }).click(function () {
        $(this).focus()
    });
    $('#txtContractTermExpireOn').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: DatepickerFormat,
    }).click(function () { $(this).focus() });
    $('#hdContractTermRenewOn').datepicker({
        dateFormat: DatepickerFormat,
    }).click(function () { });
    $('#txtRenewConfirmRenewalCounter').datepicker({

    }).click(function () { });
    $('#txtRenewConfirmCancelCounter').datepicker({

    }).click(function () {
    });

    DefaultGlobalsettings();
    allowOnlyNumberInInputBox('txtTermTimes');
    allowOnlyNumberInInputBox('txtRenewalInstance');
    allowOnlyNumberInInputBox('txtContractTermRenewSet');
    allowOnlyNumberInInputBox('txtSendRenewReminderDayRenewalCounter');
    allowOnlyNumberInInputBox('txtSendRenewReminderDayCancelCounter');
    allowOnlyNumberInInputBox('txtSendRenewReminderDayRenewalConfirm');
    allowOnlyNumberInInputBox('ContractTermRenewNew');
    allowOnlyNumberInInputBox('txtContractTermRenewSetMulti');
    allowOnlyNumberInInputBox('ContractTerm');



});

function addRenewalComment(TermName, isMultiple) {
    var user = localStorage.UserName;
    var vtime = moment(new Date()).format('MMMM Do YYYY, h:mm A');
    var existRenewalCommentsXML = '';
    if (!isMultiple) {
        if (TermName != "Initial Term") {
            var digit = parseInt(TermName.replace("Renewal", "")) + 1;
            existRenewalCommentsXML = $("#RenewalCommentsXML" + digit).html();
        }

        var existingXML = '';
        existingXML += '<RenewalComments>';
        if (existRenewalCommentsXML != null && existRenewalCommentsXML != '') {
            $(existRenewalCommentsXML).find('RenewalComment').each(function () {
                var activity = $(this).find('Activity').text();
                var comment = $(this).find('Comments').text();
                var sendton = $(this).find('SendTo').text();
                var created = $(this).find('Created').text();
                existingXML += '<RenewalComment>';
                existingXML += '<Activity>';
                existingXML += activity;
                existingXML += '</Activity>';

                existingXML += '<Comments>';
                existingXML += comment;
                existingXML += '</Comments>';

                existingXML += '<SendTo>';
                existingXML += sendton;
                existingXML += '</SendTo>';

                existingXML += '<Created>';
                existingXML += created;
                existingXML += '</Created>';
                existingXML += '</RenewalComment>';

            });
        }
        existingXML += '<RenewalComment>';
        existingXML += '<Activity>';
        if (!isRenewTermClick) {
            if (RenewalAddFlag) {
                if (TermName == "Initial Term") {
                    existingXML += user + ' has setup the terms and ' + ' added ' + TermName + ' on ' + vtime;
                }
                else {
                    existingXML += user + ' has added ' + TermName + ' on ' + vtime;
                }
            }
            else {
                existingXML += user + ' has updated ' + TermName + ' on ' + vtime;
            }
        }
        else {
            existingXML += user + ' has renewed the term ' + TermName + ' on ' + vtime;
        }
        existingXML += '</Activity>';

        existingXML += '<Comments>';
        if (isRenewTermClick) {
            existingXML += $("#txtRenewalNotesNew").val();
        }
        existingXML += '</Comments>';

        existingXML += '<SendTo>';
        existingXML += '</SendTo>';

        existingXML += '<Created>';
        existingXML += new Date();
        existingXML += '</Created>';

        existingXML += '</RenewalComment>';
        existingXML += '</RenewalComments>';



        if (TermName == "Initial Term") {
            $("#RenewalCommentsXML1").html(existingXML);
        }
        else {
            var digit = parseInt(TermName.replace("Renewal", "")) + 1;
            $("#RenewalCommentsXML" + digit).html(existingXML);
        }
    }
    else {
        var existingXML = '';
        if (TermName.indexOf("Initial Term") > -1) {
            existRenewalCommentsXML = $("#RenewalCommentsXML1").html();
        }
        else {
            var firstTerm = TermName[0];
            var digit = parseInt(firstTerm.replace("Renewal", "")) + 1;
            existRenewalCommentsXML = $("#RenewalCommentsXML" + digit).html();
        }
        existingXML += '<RenewalComments>';
        if (existRenewalCommentsXML != null && existRenewalCommentsXML != '') {
            $(existRenewalCommentsXML).find('RenewalComment').each(function () {
                var activity = $(this).find('Activity').text();
                var comment = $(this).find('Comments').text();
                var sendton = $(this).find('SendTo').text();
                var created = $(this).find('Created').text();
                existingXML += '<RenewalComment>';

                existingXML += '<Activity>';
                existingXML += activity;
                existingXML += '</Activity>';

                existingXML += '<Comments>';
                existingXML += comment;
                existingXML += '</Comments>';

                existingXML += '<SendTo>';
                existingXML += sendton;
                existingXML += '</SendTo>';

                existingXML += '<Created>';
                existingXML += created;
                existingXML += '</Created>';
                existingXML += '</RenewalComment>';

            });
        }
        existingXML += '<RenewalComment>';
        existingXML += '<Activity>';
        existingXML += user + ' has added ' + TermName.join(', ') + ' on ' + vtime;
        existingXML += '</Activity>';

        existingXML += '<Comments>';
        existingXML += '</Comments>';

        existingXML += '<SendTo>';
        existingXML += '</SendTo>';

        existingXML += '<Created>';
        existingXML += moment(new Date());
        existingXML += '</Created>';

        existingXML += '</RenewalComment>';
        existingXML += '</RenewalComments>';


        if (TermName.indexOf("Initial Term") > -1) {
            $("#RenewalCommentsXML1").html(existingXML);
        }
        else {
            var digit = parseInt(TermName[0].replace("Renewal", "")) + 1;
            $("#RenewalCommentsXML" + digit).html(existingXML);
        }
    }
}


function OpenManageContractTerm(contrcatItemselection) {
    contrcatItem = contrcatItemselection;
    vContractID = contrcatItem.RowKey;
    //$("#hdContractID").val(contrcatItem.RowKey)
    //Sridhar
    BindContractTermTypeddl();
    //Sridhar
    if (contrcatItem.ContractTermType != undefined && contrcatItem.ContractTermType != "" && contrcatItem.ContractTermType != null) {
        $("#ddlTermType").val(contrcatItem.ContractTermType);
    }
    var vTermType = $("#ddlTermType option:selected").val();
    $("#TermNotes").val(contrcatItem.ContractTermNotes);
    TermTypeChange(vTermType);
    //if (vTermType != "") {
    if (contrcatItem.ContractTermType != "" && contrcatItem.ContractTermType != "0") {
        GetValuesAndAutoPopulate("ddlSendRenewReminderTo", contrcatItem.SendRenewReminderTo);
        if (contrcatItem.RenewReminder1 != 0)
            $("#txtSendRenewReminderDay1").val(contrcatItem.RenewReminder1);
        else
            $("#txtSendRenewReminderDay1").val('');
        if (contrcatItem.RenewReminder2 != 0)
            $("#txtSendRenewReminderDay2").val(contrcatItem.RenewReminder2);
        else
            $("#txtSendRenewReminderDay2").val('');
        if (contrcatItem.RenewReminder3 != 0)
            $("#txtSendRenewReminderDay3").val(contrcatItem.RenewReminder3);
        else
            $("#txtSendRenewReminderDay3").val('');

        if (contrcatItem.CounterpartyNoticesRenewal == null || contrcatItem.CounterpartyNoticesRenewal == "" || typeof (contrcatItem.CounterpartyNoticesRenewal) == "undefined") {
            if (defaultGlobalSettings != null && defaultGlobalSettings != "") {
                var settingupforRenew = defaultGlobalSettings.UpForRenewal;
                $("#txtSendRenewReminderDayRenewalCounter").val(settingupforRenew);
            }
        }
        if ((contrcatItem.RenewReminder1Condition == null || contrcatItem.RenewReminder1Condition == "") && (contrcatItem.RenewReminder2Condition == null || contrcatItem.RenewReminder2Condition == "") && (contrcatItem.RenewReminder3Condition == null || contrcatItem.RenewReminder3Condition == "")) {
            if (defaultGlobalSettings != null && defaultGlobalSettings != "") {
                var documentReminders = defaultGlobalSettings.RenewalReminders;
                var xmlDoc = $.parseXML(documentReminders);
                var $xml = $(xmlDoc);
                var $reminder = $xml.find("reminder");
                var j = 1;
                $reminder.each(function () {
                    var beforeSplit = $(this).text();
                    var remSplit = beforeSplit.split(/ +/);
                    $("#ddlSendRenewReminder" + j).val(remSplit[0]);
                    $("#txtSendRenewReminderDay" + j).val(remSplit[1]);
                    j = j + 1;
                });
            }
        }
        else {
            var vRenewReminderCondition = contrcatItem.RenewReminder1Condition.split('-');
            $("#ddlSendRenewReminder1").val(vRenewReminderCondition[0]);
            $("#ddlSendRenewReminderDate1").val(vRenewReminderCondition[1]);
            vRenewReminderCondition = contrcatItem.RenewReminder2Condition.split('-');
            $("#ddlSendRenewReminder2").val(vRenewReminderCondition[0]);
            $("#ddlSendRenewReminderDate2").val(vRenewReminderCondition[1]);
            vRenewReminderCondition = contrcatItem.RenewReminder3Condition.split('-');
            $("#ddlSendRenewReminder3").val(vRenewReminderCondition[0]);
            $("#ddlSendRenewReminderDate3").val(vRenewReminderCondition[1]);
        }


    } else {
        var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
        var vAccFeat = $.grep(veContractFeatures, function (n, i) {
            return (n.RowKey == "11" && n.Status == "ON");
        });
        if (vAccFeat.length > 0) {
            GetValuesAndAutoPopulate("ddlSendRenewReminderTo", contrcatItem.ContractManagers + ";" + contrcatItem.ProjectManager);
        } else {
            GetValuesAndAutoPopulate("ddlSendRenewReminderTo", contrcatItem.ContractManagers);
        }
        //*Harshitha
        if (defaultGlobalSettings != null && defaultGlobalSettings != "") {
            var documentReminders = defaultGlobalSettings.RenewalReminders;
            upForRenewal = defaultGlobalSettings.UpForRenewal;   //Added 2.4final to 2.4
            var xmlDoc = $.parseXML(documentReminders);
            var $xml = $(xmlDoc);
            var $reminder = $xml.find("reminder");
            var j = 1;
            $reminder.each(function () {
                var beforeSplit = $(this).text();
                var remSplit = beforeSplit.split(/ +/);
                $("#ddlSendRenewReminder" + j).val(remSplit[0]);
                $("#txtSendRenewReminderDay" + j).val(remSplit[1]);
                j = j + 1;

            });
        }
        $("#txtSendRenewReminderDayRenewalCounter").val(upForRenewal);    //Added 2.4final to 2.4
        $(".NoTerms").css('display', 'none');
    }

    if (contrcatItem.AlertEnabled != null && contrcatItem.AlertEnabled == 'Yes') {
        $("#AlertActive").val('Yes').change();
        //$("input:radio[name=ManageUsers][value='Yes']").attr('checked', 'checked');
    }
    else {
        $("#AlertActive").val('No').change();
        //  $("input:radio[name=ManageUsers][value='No']").attr('checked', 'checked');
    }

    if (contrcatItem.StartDate != null) {
        //contrcatItem.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1')
        var fStartDate = "";
        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
            fStartDate = contrcatItem.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
        }
        else {
            if (localStorage.AppDateFormat == 'DD/MM/YYYY') {
                fStartDate = contrcatItem.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1');
            }
            else if (localStorage.AppDateFormat == 'MM/DD/YYYY') {
                fStartDate = contrcatItem.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
            }
        }
        $("#txtContractTermStartDate").val(fStartDate);
    } else
        $("#txtContractTermStartDate").val('');
    if (contrcatItem.NextEvaluationDate != null) {
        // contrcatItem.NextEvaluationDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1')
        var fNextEvaluationDate = "";
        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
            fNextEvaluationDate = contrcatItem.NextEvaluationDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
        }
        else {
            if (localStorage.AppDateFormat == 'DD/MM/YYYY') {
                fNextEvaluationDate = contrcatItem.NextEvaluationDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1');
            }
            else if (localStorage.AppDateFormat == 'MM/DD/YYYY') {
                fNextEvaluationDate = contrcatItem.NextEvaluationDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
            }
        }
        $("#txtContractTermEvaluationDate").val(fNextEvaluationDate);
    } else
        $("#txtContractTermEvaluationDate").val('');
    if (contrcatItem.EndDate != null) {
        //contrcatItem.EndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1')
        var fEndDate = "";
        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
            fEndDate = contrcatItem.EndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
        }
        else {
            if (localStorage.AppDateFormat == 'DD/MM/YYYY') {
                fEndDate = contrcatItem.EndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1');
            }
            else if (localStorage.AppDateFormat == 'MM/DD/YYYY') {
                fEndDate = contrcatItem.EndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
            }
        }
        $("#txtContractTermEndDate").val(fEndDate);
        EndDateCheck = fEndDate;
    } else
        $("#txtContractTermEndDate").val('');
    //EndDateCheck = "";
    $("#CounterpartyNoticeAll").val(contrcatItem.CounterpartyNotices);
    $("#txtSendReminderDayCancelCounterAll").val(contrcatItem.CounterpartyNoticesCancel);
    $("#CounterpartyNotice").val(contrcatItem.CounterpartyNotices);
    $("#txtSendRenewReminderDayCancelCounter").val(contrcatItem.CounterpartyNoticesCancel);
    if (contrcatItem.ContractTerm != '') {
        $('input[type="radio"][name="rdTermEndDate"][value="Term"]').prop('checked', true);
        EnableContractTermEndChoice();
        $("#ContractTerm").val(contrcatItem.ContractTerm);
        $("#ContractTermChoices").val(contrcatItem.ContractTermChoices);
        calculateenddate();
    }
    else if (contrcatItem.EndDate != null) {
        $('input[type="radio"][name="rdTermEndDate"][value="EndDate"]').prop('checked', true);
        $("#ContractTerm").val('');
        EnableContractTermEndDate();

    }
    else {
        $('input[type="radio"][name="rdTermEndDate"][value="Term"]').prop('checked', true);
        $("#ContractTerm").val("1");
        EnableContractTermEndChoice();
    }

    if (contrcatItem.ContractTermType == "Renewable") {
        //EndDateCheck = "";


        if (contrcatItem.AutoRenew == "Yes") {
            $('input[type="radio"][name="RenewalConfirmAuto"][value="Yes"]').prop('checked', true);
            $("#txtContractTermRenewSet").val(contrcatItem.ContractAutoTerm);
            $("#txtContractTermRenewSet").addClass("validelement");
            $("#ddlTermPeriodSet").val(contrcatItem.ContractAutoTermChoices);
            if (contrcatItem.RenewalDate != null)
                $("#AutoContractRenewOn").val($.datepicker.formatDate('mm/dd/yy', new Date(contrcatItem.RenewalDate)));
            if (contrcatItem.AutoContractRenewTermCount != "") {
                if ($("#ddlTermPeriodSetRenewal option[value='" + contrcatItem.AutoContractRenewTermCount + "']").length > 0 && !($("#ddlTermPeriodSetRenewal option[value='" + contrcatItem.AutoContractRenewTermCount + "']").css('display') == "none"))
                    $("#ddlTermPeriodSetRenewal").val(contrcatItem.AutoContractRenewTermCount);
                else
                    $("#ddlTermPeriodSetRenewal").val("Unlimited");
            }
            else
                $("#ddlTermPeriodSetRenewal").val("Unlimited");
            $(".ManRenewal").css('display', 'none');
            $(".autoRenewal").css('display', 'none');
        }
        else {
            $("#txtContractTermRenewSet").val('');
            $("#txtContractTermRenewSet").removeClass("validelement");
            $("#ddlTermPeriodSet").val('');
            $("#AutoContractRenewOn").val('');
            $("#ddlTermPeriodSetRenewal").val('');
            $('input[type="radio"][name="RenewalConfirmAuto"][value="No"]').prop('checked', true);
            $(".ManRenewal").css('display', '');
            $(".autoRenewal").css('display', '');
        }
        $("#CounterpartyNotice").val(contrcatItem.CounterpartyNotices);
        $("#txtSendRenewReminderDayRenewalCounter").val(contrcatItem.CounterpartyNoticesRenewal);
        $("#txtSendRenewReminderDayCancelCounter").val(contrcatItem.CounterpartyNoticesCancel);
        if (contrcatItem.CounterpartyNoticesCancelDate != null)
            $("#txtRenewConfirmCancelCounter").val($.datepicker.formatDate("mm/dd/yy", new Date(contrcatItem.CounterpartyNoticesCancelDate)));

        if (contrcatItem.CounterpartyNoticesRenewalDate != null)
            $("#txtRenewConfirmRenewalCounter").val($.datepicker.formatDate("mm/dd/yy", new Date(contrcatItem.CounterpartyNoticesRenewalDate)));

        if (contrcatItem.RequiresAuth == "Yes") {
            $('input[type="radio"][name="RenewalAuth"][value="Yes"]').prop('checked', true);
            GetValuesAndAutoPopulate("ddlSendUserToRenewalConfirmUsers", contrcatItem.RenewalConfirmParticipants);
            $("#txtSendRenewReminderDayRenewalConfirm").val(contrcatItem.ContractConfirmSendTerm);
            if (contrcatItem.ContractConfirmSendDate != null)
                $("#txtRenewConfirmSendDate").text($.datepicker.formatDate("mm/dd/yy", new Date(contrcatItem.ContractConfirmSendDate)));
            GetValuesAndAutoPopulate("ddlSendUserToRenewalConfirmUsersCC", contrcatItem.RenewalConfirmParticipantsCC);
            $("#hdParticipantsXML").val(contrcatItem.RenewalConfirmParticipantsXML);
            var values = contrcatItem.RenewalConfirmParticipantsCC;
            var owner = contrcatItem.ContractManagers;
            var multiarr = [];
            if (values != null && typeof (values) != "undefined" && values != "") {
                var res = values.split(";");
                var reslength = res.length;
                for (var i = 0; i < reslength; i++) {
                    multiarr.push(res[i].trim());
                }
            }
            if (owner != null && typeof (owner) != "undefined" && owner != "") {
                var res = owner.split(";");
                var reslength = res.length;
                for (var i = 0; i < reslength; i++) {
                    multiarr.push(res[i].trim());
                }
            }
            $("#ddlSendUserToRenewalConfirmUsers").addClass("validmultiselect");
            $("#txtSendRenewReminderDayRenewalConfirm").addClass("validelement");
            if (contrcatItem.RenewalConfirmOverall == "In Progress" || contrcatItem.RenewalConfirmOverall == "Completed") {
                $('input[type="radio"][name="RenewalAuth"][value="Yes"]').prop('disabled', true);
                $('input[type="radio"][name="RenewalAuth"][value="No"]').prop('disabled', true);
                $("#ddlSendUserToRenewalConfirmUsers").prop('disabled', true);
                $("#txtSendRenewReminderDayRenewalConfirm").prop('disabled', true);
                $("#txtRenewConfirmSendDate").prop('disabled', true);;
                $("#ddlSendUserToRenewalConfirmUsersCC").prop('disabled', true);
                var UserPending = [];
                var Xml = contrcatItem.RenewalConfirmParticipantsXML;
                if (Xml != null && Xml != "") {
                    $(Xml).find('participant').each(function () {
                        var Status = $(this).find('status').text();
                        if (Status == "In Progress") {
                            var Name = $(this).find('name').text();
                            if (Name != "" && Name != null)
                                UserPending.push(Name);
                        }
                    })
                }

                if (UserPending.length != 0) {
                    $("#trContractTermRenewal").css('display', '');
                    $("#trContractTermRenewalSec").css('display', '');
                    if (UserPending.indexOf(localStorage.UserName) != -1) {

                        $("#trOwnerAuth").css('display', '');

                    }
                    else {

                        $("#trOtherAuth").css('display', 'none');
                    }
                    var userlt = '';
                    $(UserPending).each(function (i, item) {
                        if (item != localStorage.UserName)
                            userlt = item + ",";

                    })
                    userlt = userlt.trim(',');
                    if (userlt != '') {

                        $("#OtherAuth").text('Awaiting Authorization from ' + userlt + ' for next renewal ');
                        if (multiarr.indexOf(localStorage.UserName) != -1) {
                            $("#trOtherAuth").css('display', '');
                        }
                        else {
                            $("#trOtherAuth").css('display', 'none');
                            if (UserPending.indexOf(localStorage.UserName) == -1) {
                                $("#trContractTermRenewal").css('display', 'none');
                                $("#trContractTermRenewalSec").css('display', 'none');
                            }
                        }
                    }
                    else {

                        $("#trOtherAuth").css('display', 'none');
                        $("#OtherAuth").text('No Awaiting Authorization ');
                        if (UserPending.indexOf(localStorage.UserName) == -1) {
                            $("#trContractTermRenewal").css('display', 'none');
                            $("#trContractTermRenewalSec").css('display', 'none');
                        }
                    }


                }

                else {
                    $("#trContractTermRenewal").css('display', 'none');
                    $("#trContractTermRenewalSec").css('display', 'none');
                }
            }
            else {
                $('input[type="radio"][name="RenewalAuth"][value="Yes"]').prop('disabled', false);
                $('input[type="radio"][name="RenewalAuth"][value="No"]').prop('disabled', false);
                $("#ddlSendUserToRenewalConfirmUsers").prop('disabled', false);
                $("#txtSendRenewReminderDayRenewalConfirm").prop('disabled', false);
                $("#txtRenewConfirmSendDate").prop('disabled', true);;
                $("#ddlSendUserToRenewalConfirmUsersCC").prop('disabled', false);

            }
        }
        else {
            $('input[type="radio"][name="RenewalAuth"][value="Yes"]').prop('disabled', false);
            $('input[type="radio"][name="RenewalAuth"][value="No"]').prop('disabled', false);
            $("#ddlSendUserToRenewalConfirmUsers").prop('disabled', false);
            $("#txtSendRenewReminderDayRenewalConfirm").prop('disabled', false);
            $("#txtRenewConfirmSendDate").prop('disabled', true);;
            $("#ddlSendUserToRenewalConfirmUsersCC").prop('disabled', false);
            $('input[type="radio"][name="RenewalAuth"][value="No"]').prop('checked', true);
            GetValuesAndAutoPopulate("ddlSendUserToRenewalConfirmUsers", '');
            $("#txtSendRenewReminderDayRenewalConfirm").val('');
            $("#txtRenewConfirmSendDate").text('');
            GetValuesAndAutoPopulate("ddlSendUserToRenewalConfirmUsersCC", '');
            $("#hdParticipantsXML").val('');
            $("#ddlSendUserToRenewalConfirmUsers").removeClass("validmultiselect");
            $("#txtSendRenewReminderDayRenewalConfirm").removeClass("validelement");
        }
        RenewalConfirmAuto();
        RequiresAuthchange();

    }
    else {


        if (contrcatItem.TermEndDate != null) {
            //  contrcatItem.TermEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1')
            var fTermEndDate = "";
            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                fTermEndDate = contrcatItem.TermEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
            }
            else {
                if (localStorage.AppDateFormat == 'DD/MM/YYYY') {
                    fTermEndDate = contrcatItem.TermEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1');
                }
                else if (localStorage.AppDateFormat == 'MM/DD/YYYY') {
                    fTermEndDate = contrcatItem.TermEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                }
            }
            $("#txtContractTermEnds").val(fTermEndDate);
        } else
            $("#txtContractTermEnds").val('');
        if (contrcatItem.RenewalDate != null) {
            //contrcatItem.RenewalDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1')
            var fRenewalDate = "";
            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                fRenewalDate = contrcatItem.RenewalDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
            }
            else {
                if (localStorage.AppDateFormat == 'DD/MM/YYYY') {
                    fRenewalDate = contrcatItem.RenewalDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1');
                }
                else if (localStorage.AppDateFormat == 'MM/DD/YYYY') {
                    fRenewalDate = contrcatItem.RenewalDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                }
            }
            $("#txtContractTermRenewOn").val(fRenewalDate);
        } else
            $("#txtContractTermRenewOn").val('');
        if (contrcatItem.AutoExpireOn != null) {
            //contrcatItem.AutoExpireOn.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1')
            var fAutoExpireOn = "";
            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                fAutoExpireOn = contrcatItem.AutoExpireOn.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
            }
            else {
                if (localStorage.AppDateFormat == 'DD/MM/YYYY') {
                    fAutoExpireOn = contrcatItem.AutoExpireOn.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1');
                }
                else if (localStorage.AppDateFormat == 'MM/DD/YYYY') {
                    fAutoExpireOn = contrcatItem.AutoExpireOn.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                }
            }
            $("#txtContractTermExpireOn").val(fAutoExpireOn);
        } else
            $("#txtContractTermExpireOn").val('');

        $('input[type="radio"][name="TermAutoRenewal"][value="' + contrcatItem.AutoRenew + '"]').prop('checked', true);
        if (contrcatItem.AutoRenew == 'Yes') {
            var vRenewableTerm = contrcatItem.RenewableTerm.split('-');
            $("#txtTermTimes").val(vRenewableTerm[0]);
            $("#ddlTermPeriod").val(vRenewableTerm[1]);
        }
        if (contrcatItem.ScheduledRenewal == 'Auto renew only once') {
            $('input[type="radio"][name="ScheduleAutoRenewal"][value="Auto renew only once"]').prop('checked', true);
        } else if (contrcatItem.ScheduledRenewal == 'Auto renew till End Date') {
            $('input[type="radio"][name="ScheduleAutoRenewal"][value="Auto renew till End Date"]').prop('checked', true);
        } else if (contrcatItem.ScheduledRenewal != "") {
            $('input[type="radio"][name="ScheduleAutoRenewal"][value="Instances"]').prop('checked', true);
            $("#txtRenewalInstance").val(contrcatItem.ScheduledRenewal.replace(' Instances', ''));
        } else {
            $('input[type="radio"][name="ScheduleAutoRenewal"][value="Auto renew only once"]').prop('checked', true);
        }
        //}

        if (vTermType == "Renewable") {
            if (!comparedates("txtContractTermEnds", "txtContractTermEndDate")) {

            }
        }

    }
    var arrstatus = ["Ready for Signature", "Awaiting Signatures", "Signed", "Active", "Up for Renewal", "Renewed", "Extended", "On Hold", "Replaced", "Expired", "Cancelled", "Terminated", "Archived", "About to Expire"];
    if (contrcatItem.ContractTermType != "" && contrcatItem.ContractTermType != "0" && arrstatus.indexOf(contrcatItem.Status) > -1) {
        $("#btnContractTermCancel").show();
        if (contrcatItem.ContractTermType == "Renewable") {
            $("#btnContractTermExpire").show();

        }
        else {
            $("#btnContractTermExpire").hide();
        }
    }
    else {
        $("#btnContractTermCancel").hide();
        $("#btnContractTermExpire").hide();
    }
    //if (contrcatItem.Status == "Cancelled") {
    //    $("#btnContractTermCancel").hide();
    //}
    //else {
    //    $("#btnContractTermCancel").show();
    //}

    if (contrcatItem.AlertsEnabled == "Yes" && arrstatus.indexOf(contrcatItem.Status) > -1) {
        $("#AlertActive").val('Yes').change();
    }
    else {
        $("#AlertActive").val('No').change();
    }
    $("#dvContractTerm").dialog("open");


}
//*Harshitha

$("#ddlTermType").change(function (obj) {
    //location = "/Contracts/CreateContract?ContractType=" + $("#ddlContractTypes option:selected").text() + "&LibID=" + LibID + "&DocID=" + DocID;
    var vTermType = $("#ddlTermType option:selected").val();
    TermTypeChange(vTermType);
});
$('#btnContractTermCancel').click(function () {
    $("#txtReasonOfCancel").val("");
    $("#ddlSendToCancel").val('');
    $("#dvCancelContract").dialog("open");
});


function ContractTermAutoRenewalYes() {

    $("#tdContractRenewOn").html('Auto Renew On (Upcoming) <img src="../Content/Images/input-help.png" title="Extend forthcoming Contract renewals automatically for desired no. of months/years.">');
    $("#trContractAutoExpireOn").css('display', 'none');
    $("#trContractAutoRenewals").css('display', '');
    $("#lblTermRenewFor").css('display', '');
    $("#txtTermTimes").css('display', '');
    $("#ddlTermPeriod").css('display', '');
    $("#txtContractTermRenewOn").prop('disabled', true);
    $("#txtContractTermRenewOn").addClass('form-contro-NoDate');
    $("#txtContractTermRenewOn").removeClass('form-contro-Date');
    $("#txtTermTimes").addClass('validelement');
    $("#txtContractTermRenewOn").val($("#txtContractTermEnds").val());
    $("#ddlSendRenewReminderDate1 option[value='Auto Expire On']").remove();
    $("#ddlSendRenewReminderDate2 option[value='Auto Expire On']").remove();
    $("#ddlSendRenewReminderDate3 option[value='Auto Expire On']").remove();
    //if (contrcatItem.AutoRenew == "Yes") {
    //    $("#btnContractTermRenew").css('display', '');
    //    $("#txtContractTermRenewOn").val($("#txtContractTermEnds").val());
    //} else {
    //    $("#btnContractTermRenew").css('display', 'none');
    //    $("#txtContractTermRenewOn").val('');
    //}
}

function ContractTermAutoRenewalNo() {
    $("#txtContractTermRenewOn").val($("#txtContractTermEnds").val());
    var fContractTermRenewOn = '';
    if ($("#txtContractTermRenewOn").val() != "" && $("#txtContractTermRenewOn").val() != null) {
        fContractTermRenewOn = $.datepicker.formatDate('mm/dd/yy', $("#txtContractTermRenewOn").datepicker('getDate'));
    }
    $("#tdContractRenewOn").html('Renew On / Anniversary Date <img src="../Content/Images/input-help.png" title="Select the date for renewing the Contract. By default, this is the Contract term end date.">');
    $("#trContractAutoExpireOn").css('display', '');
    $("#trContractAutoRenewals").css('display', 'none');
    $("#lblTermRenewFor").css('display', 'none');
    $("#txtTermTimes").css('display', 'none');
    $("#ddlTermPeriod").css('display', 'none');
    if (contrcatItem.ContractTermType == "Renewable") {

        //$("#btnContractTermExpire").css('display', '');
    } else {
        $("#btnContractTermRenew").css('display', 'none');
        $("#btnContractTermExpire").css('display', 'none');
    }
    $("#txtContractTermRenewOn").prop('disabled', false);
    $("#txtContractTermRenewOn").addClass('form-contro-Date');
    $("#txtContractTermRenewOn").removeClass('form-contro-NoDate');
    $("#txtTermTimes").removeClass('validelement');
    $("#txtTermTimes").removeClass('error');
    if ($("#txtContractTermRenewOn").val() != "") {
        var vDT = new Date(fContractTermRenewOn);
        vDT = moment(vDT).add(60, 'days').format('MM/DD/YYYY');
        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
            vDT = moment(new Date(vDT)).format('MM/DD/YYYY');
        }
        else {
            vDT = moment(new Date(vDT)).format(localStorage.AppDateFormat);
        }
        $("#txtContractTermExpireOn").val(vDT);
    }
    //$("#ddlSendRenewReminderDate1").append('<option value="Auto Expire On">Auto Expire On</option>');
    //$("#ddlSendRenewReminderDate2").append('<option value="Auto Expire On">Auto Expire On</option>');
    //$("#ddlSendRenewReminderDate3").append('<option value="Auto Expire On">Auto Expire On</option>');
    //if (contrcatItem.AutoRenew == "Yes") {
    //    $("#btnContractTermRenew").css('display', '');
    //    $("#txtContractTermRenewOn").val($("#txtContractTermEnds").val());
    //} else {
    //    $("#btnContractTermRenew").css('display', 'none');
    //    $("#txtContractTermRenewOn").val('');
    //}
}

function ScheduleAutoRenewalTillEnd() {
    $("#txtRenewalInstance").val('');
    $("#txtRenewalInstance").prop('disabled', true);
    $("#txtRenewalInstance").removeClass('validelement');
    $("#txtRenewalInstance").removeClass('error');
}

function ScheduleAutoRenewalInstances() {
    $("#txtRenewalInstance").val('');
    $("#txtRenewalInstance").prop('disabled', false);
    $("#txtRenewalInstance").addClass('validelement');
}

function ScheduleAutoRenewalSingle() {
    $("#txtRenewalInstance").val('');
    $("#txtRenewalInstance").prop('disabled', true);
    $("#txtRenewalInstance").removeClass('validelement');
    $("#txtRenewalInstance").removeClass('error');
}

$('#btnContractTermRenew').click(function () {
    //$("#chkRenewalModifications").prop('checked', false);
    //$("#chkRenewalPriceAdjustments").prop('checked', false);
    //$("#chkRenewalRepricing").prop('checked', false);
    //$("#chkRenewalOther").prop('checked', false);
    //$("#txtNewEndDate").val("");
    //$("#txtNextRenewalDate").val("");
    //$("#txtRenewalNotes").val("");
    //$("#txtRenewalNotfCounterparty").val("");
    //GetValuesAndAutoPopulate("ddlRenewalNotfInternal", "");
    //$("#manualRenewal").dialog("open");

});

$('#btnContractTermExpire').click(function () {    //Added 2.4final to 2.4
    ExpireContract();
    //swal({
    //    title: '',
    //    text: "Are you sure you want to <span style=\"font-weight:700\">expire</span> this Contract Record?",
    //    type: 'warning',
    //    showCancelButton: true,
    //    confirmButtonText: 'Yes',
    //    cancelButtonText: 'No',
    //    html: true
    //},
    // function (confirmed) {
    //     if (confirmed) {
    //         $("#loadingPage").fadeIn();
    //         var vCancelNote = '';
    //         $.ajax({
    //             url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + getParameterByName("ContractID") + '/changestatus?status=Expired',
    //             type: 'PUT',
    //             dataType: 'json',
    //             headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
    //             data: vCancelNote,
    //             cache: false,
    //             success: function (result) {
    //                 $("#loadingPage").fadeOut();
    //                 $("#dvContractTerm").dialog("close");
    //                 contrcatItem.Status = "Expired";
    //                 ContractTopActions();
    //             },
    //             error: function (data) {
    //                 $("#loadingPage").fadeOut();
    //             }
    //         });
    //     }
    //     return;
    //});
    //if (confirm('Are you sure you want to expire this contract?')) {
    //    $("#loadingPage").fadeIn();
    //    var vCancelNote = '';
    //    $.ajax({
    //        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + getParameterByName("ContractID") + '/changestatus?status=Expired',
    //        type: 'PUT',
    //        dataType: 'json',
    //        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
    //        data: vCancelNote,
    //        cache: false,
    //        success: function (result) {
    //            $("#loadingPage").fadeOut();
    //            $("#dvContractTerm").dialog("close");
    //            contrcatItem.Status = "Expired";
    //            ContractTopActions();
    //        },
    //        error: function (data) {
    //            $("#loadingPage").fadeOut();
    //        }
    //    });
    //}
});

//Added 2.4final to 2.4
function ExpireContract() {
    swal({
        title: '',
        text: "Are you sure you want to <span style=\"font-weight:700\">expire</span> this Contract Record?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        html: true
    },
function (confirmed) {
    if (confirmed) {
        $("#loadingPage").fadeIn();
        var vCancelNote = '';
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + getParameterByName("ContractID") + '/changestatus?status=Expired',
            type: 'PUT',
            dataType: 'json',
            headers: {
                'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName
            },
            data: vCancelNote,
            cache: false,
            success: function (result) {
                $("#loadingPage").fadeOut();
                $("#dvContractTerm").dialog("close");
                contrcatItem.Status = "Expired";
                ContractTopActions();
            },
            error: function (data) {
                $("#loadingPage").fadeOut();
            }
        });
    }
    return;
});
}

$('#btnContractTermCancel').click(function () {
    $("#txtReasonOfCancel").val("");
    $("#ddlSendToCancel").val('');
    $("#dvCancelContract").dialog("open");
});

$('#btnContractTermSave').click(function () {
    if ($("#ddlTermType").val() == "Renewable") {
        RenewalTermSave();
    }
    else {
        var constatus = contrcatItem.Status;
        var msg = "";
        var strStartDate = "";
        var strEndDate = "";
        var Sdate = new Date(contrcatItem.StartDate);
        if (contrcatItem.StartDate != null)
            strStartDate = moment(new Date(contrcatItem.StartDate)).format('MM/DD/YYYY');
        if (contrcatItem.EndDate != null)
            strEndDate = moment(new Date(contrcatItem.EndDate)).format('MM/DD/YYYY');
        var ftxtContractTermStartDate = '';
        if ($("#txtContractTermStartDate").val() != "" && $("#txtContractTermStartDate").val() != null) {
            ftxtContractTermStartDate = $.datepicker.formatDate('mm/dd/yy', $("#txtContractTermStartDate").datepicker('getDate'));
        }
        var fContractTermEndDate = '';
        if ($("#txtContractTermEndDate").val() != "" && $("#txtContractTermEndDate").val() != null) {
            fContractTermEndDate = $.datepicker.formatDate('mm/dd/yy', $("#txtContractTermEndDate").datepicker('getDate'));
        }
        if (constatus == "Active" && strStartDate != ftxtContractTermStartDate) {
            msg = "Start Date";
        }
        else if (constatus == "Expired" || constatus == "Cancelled") {
            if (strStartDate != ftxtContractTermStartDate) {
                msg = "Start Date";
            }
            if (strEndDate != fContractTermEndDate) {
                if (msg != "") {
                    msg += " and End Date";
                }
                else {
                    msg = "End Date";
                }
            }
        }
        if (msg != "") {
            swal({
                title: '',
                text: "Contract is " + constatus + " are you sure you want to <span style=\"font-weight:700\">update the </span>" + msg + " ?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                html: true,
                closeOnConfirm: false,
                closeOnCancel: true
                //

            },
     function (confirmed) {
         if (confirmed) {
             ContractTermSave();

         }
         // return;
     });
        }
        else {
            ContractTermSave();
        }
    }

});

$('#btnContractTermClose').click(function () {
    $("#loadingPage").fadeOut();
});
$('#btnContractNoRenew').click(function () {
    var term = (RenewalName != null && RenewalName != "" && typeof (RenewalName) != "undefined") ? RenewalName : "";
    if (vContractID == '') {
        vContractID = $("#hdContractID").val();
    }
    if (term != "" && vContractID != "") {
        var item = [];
        var itemN = $.grep(vContractRenewalHistory, function (itemR, i) {
            return itemR.RenewableTermName == term
        });
        var existingXML = '';
        if (itemN.length > 0) {
            item = itemN[0];
            existingXML += '<RenewalComments>';
            if (item.RenewalCommentsXML != null && item.RenewalCommentsXML != '') {
                $(item.RenewalCommentsXML).find('RenewalComment').each(function () {
                    var activity = $(this).find('Activity').text();
                    var comment = $(this).find('Comments').text();
                    var sendton = $(this).find('SendTo').text();
                    var created = $(this).find('Created').text();
                    existingXML += '<RenewalComment>';
                    existingXML += '<Activity>';
                    existingXML += activity;
                    existingXML += '</Activity>';

                    existingXML += '<Comments>';
                    existingXML += comment;
                    existingXML += '</Comments>';

                    existingXML += '<SendTo>';
                    existingXML += sendton;
                    existingXML += '</SendTo>';

                    existingXML += '<Created>';
                    existingXML += created;
                    existingXML += '</Created>';

                    existingXML += '</RenewalComment>';

                });
            }
            existingXML += '<RenewalComment>';
            existingXML += '<Activity>';
            var time = moment(new Date()).format('MMMM Do YYYY, h:mm A');
            existingXML += localStorage.UserName + ' has authorized the term ' + item.RenewableTermName + ' on ' + time;
            existingXML += '</Activity>';

            existingXML += '<Comments>';
            existingXML += '</Comments>';

            existingXML += '<SendTo>';
            existingXML += '</SendTo>';

            existingXML += '<Created>';
            existingXML += new Date();
            existingXML += '</Created>';

            existingXML += '</RenewalComment>';
            existingXML += '</RenewalComments>';
        }
        $("#loadingPage").fadeIn();
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + vContractID + '/contractrenewalhistoryupdate?TermName=' + term + '&Status=Rejected&User=' + localStorage.UserName,
            type: 'POST',
            dataType: 'json',
            headers: {
                'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'UserName': localStorage.UserName
            },
            data: {
                "Comment": existingXML,
            },
            cache: false,

            success: function (Conrec) {
                if (Conrec != null) {
                    contractItem = Conrec;
                    $("#hdParticipantsXML").val(contractItem.RenewalConfirmParticipantsXML);
                    if (term != "Initial Term") {
                        indexCount = term.replace("Renewal ", "");
                        indexCount = parseInt(indexCount) + 1;
                        $("#RenewalConfirmParticipantsXML" + indexCount) != null && typeof ($("#RenewalConfirmParticipantsXML" + indexCount) != "undefined") ? $("#RenewalConfirmParticipantsXML" + indexCount).html(contractItem.RenewalConfirmParticipantsXML) : false;
                        $("#trOwnerAuth").css('display', 'none');
                        if ($("#trOtherAuth").attr('display') == "none") {
                            $("#trContractTermRenewal").css('display', 'none');
                            $("#trContractTermRenewalSec").css('display', 'none');
                        }

                    }
                }
                $("#loadingPage").fadeOut();
            },
            error: function (status) {

                $("#loadingPage").fadeOut();
            }
        });
    }

});
$('#btnContractSendAuth').click(function () {
    var term = (RenewalName != null && RenewalName != "" && typeof (RenewalName) != "undefined") ? RenewalName : "";
    var Curterm = ($("#hdCurrentTermName").val() != null && $("#hdCurrentTermName").val() != "" && typeof ($("#hdCurrentTermName")) != "undefined") ? $("#hdCurrentTermName").val() : "";
    if (vContractID == '') {
        vContractID = $("#hdContractID").val();
    }
    if (term != "" && vContractID != "" && contractItem != null && Curterm != "") {
        $("#loadingPage").fadeIn();
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + vContractID + '/SendRenewalApprovalMail?TermName=' + encodeURIComponent(term) + '&CurrentName=' + encodeURIComponent(Curterm),
            type: 'POST',
            dataType: 'json',
            headers: {
                'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName
            },
            cache: false,
            success: function (Conrec) {
                swal("", "Authorization email sent successfully.");
                $("#trOtherAuth").css("display", "none");
                $("#loadingPage").fadeOut();
            },
            error: function (status) {
                $("#loadingPage").fadeOut();
            }
        });
    }
});

$('#btnContractYesRenew').click(function () {
    var term = (RenewalName != null && RenewalName != "" && typeof (RenewalName) != "undefined") ? RenewalName : "";
    if (vContractID == '') {
        vContractID = $("#hdContractID").val();
    }
    if (term != "" && vContractID != "") {
        var item = [];
        var itemN = $.grep(vContractRenewalHistory, function (itemR, i) {
            return itemR.RenewableTermName == term
        });
        var existingXML = '';
        if (itemN.length > 0) {
            item = itemN[0];
            existingXML += '<RenewalComments>';
            if (item.RenewalCommentsXML != null && item.RenewalCommentsXML != '') {
                $(item.RenewalCommentsXML).find('RenewalComment').each(function () {
                    var activity = $(this).find('Activity').text();
                    var comment = $(this).find('Comments').text();
                    var sendton = $(this).find('SendTo').text();
                    var created = $(this).find('Created').text();
                    existingXML += '<RenewalComment>';
                    existingXML += '<Activity>';
                    existingXML += activity;
                    existingXML += '</Activity>';

                    existingXML += '<Comments>';
                    existingXML += comment;
                    existingXML += '</Comments>';

                    existingXML += '<SendTo>';
                    existingXML += sendton;
                    existingXML += '</SendTo>';

                    existingXML += '<Created>';
                    existingXML += created;
                    existingXML += '</Created>';

                    existingXML += '</RenewalComment>';

                });
            }
            existingXML += '<RenewalComment>';
            existingXML += '<Activity>';
            var time = moment(new Date()).format('MMMM Do YYYY, h:mm A');
            existingXML += localStorage.UserName + ' has authorized the term ' + item.RenewableTermName + ' on ' + time;
            existingXML += '</Activity>';

            existingXML += '<Comments>';
            existingXML += '</Comments>';

            existingXML += '<SendTo>';
            existingXML += '</SendTo>';

            existingXML += '<Created>';
            existingXML += new Date();
            existingXML += '</Created>';

            existingXML += '</RenewalComment>';
            existingXML += '</RenewalComments>';
        }
        $("#loadingPage").fadeIn();
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + vContractID + '/contractrenewalhistoryupdate?TermName=' + term + '&Status=Renewed&User=' + localStorage.UserName,
            type: 'POST',
            dataType: 'json',
            headers: {
                'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName
            },
            data: {
                "Comment": existingXML,
            },
            cache: false,
            success: function (Conrec) {
                if (Conrec != null) {
                    contractItem = Conrec;
                    $("#hdParticipantsXML").val(contractItem.RenewalConfirmParticipantsXML);
                    if (term != "Initial Term") {
                        indexCount = term.replace("Renewal ", "");
                        indexCount = parseInt(indexCount) + 1;
                        ($("#RenewalConfirmParticipantsXML" + indexCount) != null && typeof ($("#RenewalConfirmParticipantsXML" + indexCount) != "undefined")) ? $("#RenewalConfirmParticipantsXML" + indexCount).html(contractItem.RenewalConfirmParticipantsXML) : false;
                        $("#trOwnerAuth").css('display', 'none');
                        if ($("#trOtherAuth").attr('display') == "none") {
                            $("#trContractTermRenewal").css('display', 'none');
                            $("#trContractTermRenewalSec").css('display', 'none');
                        }
                    }
                }
                $("#loadingPage").fadeOut();
            },
            error: function (status) {

                $("#loadingPage").fadeOut();
            }
        });
    }
});


function BindContractTermDetail(item) {
    var vTermType = item.ContractTermType;
    //Sridhar
    BindContractTermTypeddl();
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
        //vContractTerm += '<a href="javascript:void(0);" onclick="OpenManageTerm()" id="btnManageTerms" class="wit-btn Manage" style="padding: 3px 7px;font-size: 12px;margin: 4px 4px 0 0;">Setup Contract Term</a>';
        //vContractTerm += '<a href="javascript:void(0)" data-title="The terms (timelines) for this Contract Record is not available." style="padding: 4px 4px 0 0;"><img src="/Content/Images/missing-exc.png" style="cursor: default !important;"/></a>';
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
        // vContractTerm += '<a href="javascript:void(0);" onclick="OpenManageTerm()" id="btnManageTerms" class="wit-btn Manage" style="padding: 3px 7px;font-size: 12px;margin: 4px 4px 0 0;">Setup Contract Term</a>';
        //vContractTerm += '<a href="javascript:void(0)" data-title="The terms (timelines) for this Contract Record is not available." style="padding: 4px 4px 0 0;"><img src="/Content/Images/missing-exc.png" style="cursor: default !important;"/></a>';
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
            //if (item.StartDate != null || item.EndDate != null) {
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


                //vContractTerm += '<small class="contract_term_date" title="Start / Effective Date">Current Term: <small class="Small_term">' + FstartDate + '</small></small>';
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
                //vContractTerm += '&nbsp;&nbsp;-&nbsp;&nbsp;<small class="contract_term_date" title="End Date"><span><small class="Small_term">' + FendDate + '</small></small></small>';
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

            //Buttons
            //if (item.StartDate == null && item.EndDate == null) {
            //}
            //else {
            vContractTerm += '<td align="right">';
            vContractTerm += '<a href="javascript:void(0);" onclick="viewDetailsTerm()" id="btnViewDetails" class="wit-btn" style="padding: 3px 7px;font-size: 12px;">View Details</a>';
            vContractTerm += '<a href="javascript:void(0);" onclick="OpenManageTerm()" id="btnManageTerms" class="wit-btn managesettings Manage " style="padding: 3px 7px;font-size: 12px;">Manage Term</a>';
            vContractTerm += '</td>';
            //}

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
                // vContractTerm += '<small class="contract_term_date" title="Date of Execution / Performance">Date of Execution: <small class="Small_term">' + FormatstartDate + '</small></small>';
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
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/settings',
                type: 'GET',
                dataType: 'json',
                headers: {
                    'eContracts-ApiKey': localStorage.APIKey
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
            //ENH 440 Display Alerts for Missing information


        }
        $("#tbodyManageTerm").html(vContractTerm);
        // $("#spContractTermEnd").html(vContractTermEnd);


        $(".openmenuTerm").contextMenu({ menu: 'dropdownMenuTerm', leftButton: true }, function (action, el, pos) {
            contextMenuTerm(action, el.parent("div"), pos);
        });
        $(".openmenuFixedTerm").contextMenu({
            menu: 'dropdownMenuFixedTerm', leftButton: true
        }, function (action, el, pos) {
            contextMenuFixedTerm(action, el.parent("div"), pos);
        });
        $(".openmenuRenewalTerm").contextMenu({
            menu: 'dropdownMenuRenewalTerm', leftButton: true
        }, function (action, el, pos) {
            contextMenuRenewalTerm(action, el.parent("div"), pos);
        });
    }
    $("#secContractTerm").css("display", "");

    //Sridhar
    //BindContractTermTypeddl();//Performance Optimization
    //var vTermTypeDisplay = TermTypeDisplayName[vTermType];//Performance Optimization
    //Sridhar
}

function getTimeZone() {
    var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
    return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
}
//Added 2.4final to 2.4
function viewDetailsTerm() {
    contextMenuTerm('view', '', '');
    if (contractItem.ContractTermType == "Renewable")
        GetRenewalHistory();
}
//
function calculateenddate() {
    if ($("#ContractTermChoices").find('option:selected').val() == "months" && ($("#ContractTerm").val() % 12 == 0)) {
        $("#ContractTermChoices").val('years');
        $("#ContractTerm").val($("#ContractTerm").val() / 12);
    }
    if ($("#ContractTermType").val() != 'Evergreen / Perpetual' && $("#ContractTermType").val() != 'Executed / Performance') {
        if ($("#txtContractTermStartDate").val() != "" && $("#ContractTerm").val() != "") {

            var ftxtContractTermStartDate = '';
            if ($("#txtContractTermStartDate").val() != "" && $("#txtContractTermStartDate").val() != null) {
                ftxtContractTermStartDate = $.datepicker.formatDate('mm/dd/yy', $("#txtContractTermStartDate").datepicker('getDate'));
            }
            var fnextDate = "";
            var nextDate = moment(ftxtContractTermStartDate).add($("#ContractTerm").val(), $("#ContractTermChoices").find('option:selected').val());
            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                if (getTimeZone().indexOf('+') > -1)
                    fnextDate = moment(nextDate).utc().format('MM/DD/YYYY');
                else if (getTimeZone().indexOf('+00:00') > -1 || getTimeZone().indexOf('-') > -1)
                    fnextDate = moment(nextDate).utc().subtract(1, "days").format('MM/DD/YYYY');
            }
            else {
                if (getTimeZone().indexOf('+') > -1)
                    fnextDate = moment(nextDate).utc().format(localStorage.AppDateFormat);
                else if (getTimeZone().indexOf('+00:00') > -1 || getTimeZone().indexOf('-') > -1)
                    fnextDate = moment(nextDate).utc().subtract(1, "days").format(localStorage.AppDateFormat);

            }
            $("#txtContractTermEndDate").val(fnextDate);
        }
    }
}
function calculateenddateRenew(from, choice, number, to) {
    var todaydate = new Date();
    var startdate = $("#" + from).datepicker('getDate');
    var enddate = $("#" + to).datepicker('getDate');
    var todaydateM = "";
    var startdateM = "";
    var enddateM = "";
    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
        todaydateM = moment(new Date(todaydate)).format('MM/DD/YYYY');
        startdateM = moment(new Date(startdate)).format('MM/DD/YYYY');
        enddateM = moment(new Date(enddate)).format('MM/DD/YYYY');

    }
    else {
        todaydateM = moment(new Date(todaydate)).format(localStorage.AppDateFormat);
        startdateM = moment(new Date(startdate)).format(localStorage.AppDateFormat);
        enddateM = moment(new Date(enddate)).format(localStorage.AppDateFormat);
    }


    var valcheckauth = $(':input[type=radio][name=TermsSingleMultiple]:checked').val();
    if (valcheckauth == "Yes") {
        if ($('input[type="radio"][name="rdRenewTermEndDate"][value="Term"]').is(':checked')) {
            if ($("#" + number).val() == "1" && $("#" + choice).val() == "days") {
                swal("", "Term duration cannot be one day.");
                $("#" + number).val("2")
            }
            else if (/^0*$/.test($("#" + number).val())) {
                swal("", "Term duration cannot be less than two days.");
                $("#" + number).val("2")
            }
            if ($("#" + choice).find('option:selected').val() == "months" && ($("#" + number).val() != "0" && $("#" + choice).val() != "" && $("#" + number).val() % 12 == 0)) {
                $("#" + choice).val('years');
                $("#" + number).val($("#" + number).val() / 12);
            }
            if ($("#" + from).val() != "" && $("#" + number).val() != "") {

                var ftxtContractTermStartDate = '';
                if ($("#" + from).val() != "" && $("#" + from).val() != null) {
                    ftxtContractTermStartDate = $.datepicker.formatDate("mm/dd/yy", $("#" + from).datepicker('getDate'));
                    if ($("#" + from).datepicker('getDate') == null) {
                        ftxtContractTermStartDate = $("#" + from).val();
                        startdate = new Date($("#" + from).val());
                    }
                }
                var fnextDate = "";
                var dtNextdate;
                var strNextDateUTC = "";
                var nextDate = moment(new Date(ftxtContractTermStartDate)).utcOffset(getTimeZone()).add($("#" + number).val(), $("#" + choice).find('option:selected').val()).utc();

                //var nextDate = moment(ftxtContractTermStartDate).add($("#" + choice).find('option:selected').val(), $("#" + number).val());
                strNextDateUTC = moment(new Date(nextDate)).utc().format('MM/DD/YYYY');
                dtNextdate = new Date(strNextDateUTC);
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                    if (getTimeZone().indexOf('+') > -1)
                        fnextDate = moment(nextDate).utc().format('MM/DD/YYYY');
                    else if (getTimeZone().indexOf('+00:00') > -1 || getTimeZone().indexOf('-') > -1)
                        fnextDate = moment(nextDate).utc().subtract(1, "days").format('MM/DD/YYYY');
                }
                else {
                    if (getTimeZone().indexOf('+') > -1)
                        fnextDate = moment(nextDate).utc().format(localStorage.AppDateFormat);
                    else if (getTimeZone().indexOf('+00:00') > -1 || getTimeZone().indexOf('-') > -1)
                        fnextDate = moment(nextDate).utc().subtract(1, "days").format(localStorage.AppDateFormat);
                }
                if (fnextDate != "Invalid Date") {
                    //maxAllowedDate = $("#" + to).val();
                    //var maxdate = $("#" + to).datepicker("option", "maxDate");
                    //if (maxdate != null) {
                    //    if (fnextDate < new Date(maxAllowedDate)) {
                    //        $("#" + to).val(fnextDate);
                    //        enddate = new Date(nextDate);
                    //    }
                    //    else {
                    //        swal("", "Terms choosen has end date beyond the maximum allowed date for this term.");
                    //        EnableContractRenewTermEndDate();

                    //        $("#" + to).val(maxAllowedDate);
                    //    }
                    //}
                    //else {
                    if (EndDateCheckRenewal != "") {
                        if (EndDateCheckRenewal < new Date(fnextDate)) {
                            //swal("", "Terms choosen has End date beyond the maximum allowed date for this term.");
                            swal("", "Term chosen has the End date that has the maximum allowed date for this term.");                           
                            var orig = "";
                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                                orig = moment(new Date(fnextDate)).format('MM/DD/YYYY');
                            }
                            else {
                                orig = moment(new Date(fnextDate)).format(localStorage.AppDateFormat);
                            }
                            $("#" + to).val(orig);
                            enddate = new Date(EndDateCheckRenewal);
                            $('input[type="radio"][name="rdRenewTermEndDate"][value="EndDate"]').prop('checked', true);

                            EnableContractTermRenewEndChoice(true, false);
                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                                enddateM = moment(new Date(enddate)).format('MM/DD/YYYY');
                            }
                            else {
                                enddateM = moment(new Date(enddate)).format(localStorage.AppDateFormat);
                            }
                            $("#ContractTermRenewNew").val(TermEndValueTemp);
                            $("#ContractTermRenewChoicesNew").val(TermEndChoiceValueTemp);
                            $("#txtRenewEndDate").val(TermEndDate);
                        }
                        else {
                            $("#" + to).val(fnextDate);
                            enddate = new Date(dtNextdate);
                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                                enddateM = moment(new Date(enddate)).format('MM/DD/YYYY');
                            }
                            else {
                                enddateM = moment(new Date(enddate)).format(localStorage.AppDateFormat);
                            }
                        }
                    }
                    else {
                        $("#" + to).val(fnextDate);
                        enddate = new Date(dtNextdate);
                        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                            enddateM = moment(new Date(enddate)).format('MM/DD/YYYY');
                        }
                        else {
                            enddateM = moment(new Date(enddate)).format(localStorage.AppDateFormat);
                        }

                    }
                    //}
                }
                else
                    $("#" + to).val('');

            }
        }
    }
    else {
        if ($("#" + number).val() == "1" && $("#" + choice).val() == "days") {
            swal("", "Term duration cannot be one day.");
            $("#" + number).val("2")
        }
        else if (/^0*$/.test($("#" + number).val()) || $("#" + number).val() == '') {
            swal("", "Term duration cannot be less than two days.");
            $("#" + number).val("2")
        }
        if ($("#" + choice).find('option:selected').val() == "months" && ($("#" + number).val() != "0" && $("#" + choice).val() != "" && $("#" + number).val() % 12 == 0)) {
            $("#" + choice).val('years');
            $("#" + number).val($("#" + number).val() / 12);
        }
        if ($("#" + from).val() != "" && $("#" + number).val() != "") {

            var ftxtContractTermStartDate = '';
            if ($("#" + from).val() != "" && $("#" + from).val() != null) {
                ftxtContractTermStartDate = $.datepicker.formatDate("mm/dd/yy", $("#" + from).datepicker('getDate'));
                if ($("#" + from).datepicker('getDate') == null) {
                    ftxtContractTermStartDate = $("#" + from).val();
                    startdate = new Date($("#" + from).val());
                }
            }
            var fnextDate = "";
            var dtNextdate;
            var strNextDateUTC = "";
            var nextDate = moment(new Date(ftxtContractTermStartDate)).utcOffset(getTimeZone()).add($("#" + number).val(), $("#" + choice).find('option:selected').val()).utc();

            //var nextDate = moment(ftxtContractTermStartDate).add($("#" + choice).find('option:selected').val(), $("#" + number).val());
            strNextDateUTC = moment(new Date(nextDate)).utc().format('MM/DD/YYYY');
            dtNextdate = new Date(strNextDateUTC);
            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                if (getTimeZone().indexOf('+') > -1)
                    fnextDate = moment(nextDate).utc().format('MM/DD/YYYY');
                else if (getTimeZone().indexOf('+00:00') > -1 || getTimeZone().indexOf('-') > -1)
                    fnextDate = moment(nextDate).utc().subtract(1, "days").format('MM/DD/YYYY');
            }
            else {
                if (getTimeZone().indexOf('+') > -1)
                    fnextDate = moment(nextDate).utc().format(localStorage.AppDateFormat);
                else if (getTimeZone().indexOf('+00:00') > -1 || getTimeZone().indexOf('-') > -1)
                    fnextDate = moment(nextDate).utc().subtract(1, "days").format(localStorage.AppDateFormat);
            }
            if (fnextDate != "Invalid Date") {
                //maxAllowedDate = $("#" + to).val();
                //var maxdate = $("#" + to).datepicker("option", "maxDate");
                //if (maxdate != null) {
                //    if (fnextDate < new Date(maxAllowedDate)) {
                //        $("#" + to).val(fnextDate);
                //        enddate = new Date(nextDate);
                //    }
                //    else {
                //        swal("", "Terms choosen has end date beyond the maximum allowed date for this term.");
                //        EnableContractRenewTermEndDate();

                //        $("#" + to).val(maxAllowedDate);
                //    }
                //}
                //else {
                if (EndDateCheckRenewal != "") {
                    var fNextDateNew = moment(new Date(fnextDate)).format('DD/MM/YYYY');
                    if (EndDateCheckRenewal < new Date(fNextDateNew)) {
                        //swal("", "Terms choosen has End date beyond the maximum allowed date for this term.");
                        swal("", "Term chosen has the End date that has the maximum allowed date for this term.");             
                        var orig = "";
                        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                            orig = moment(new Date(fnextDate)).format('MM/DD/YYYY');
                        }
                        else {
                            orig = moment(new Date(fnextDate)).format(localStorage.AppDateFormat);
                        }
                        $("#" + to).val(orig);
                        enddate = new Date(EndDateCheckRenewal);
                        $('input[type="radio"][name="rdRenewTermEndDate"][value="EndDate"]').prop('checked', true);

                        EnableContractTermRenewEndChoice(true, false);
                        $("#ContractTermRenewNew").val(TermEndValueTemp);
                        $("#ContractTermRenewChoicesNew").val(TermEndChoiceValueTemp);
                        $("#txtRenewEndDate").val(TermEndDate);
                    }
                    else {
                        $("#" + to).val(fnextDate);
                        enddate = new Date(dtNextdate);

                    }
                }
                else {
                    $("#" + to).val(fnextDate);
                    enddate = new Date(dtNextdate);

                }
                //}
            }
            else
                $("#" + to).val('');

        }

    }
    //$("#txtContractTermStartRenewNext").val($("#txtContractTermEndDateRenew").val());
    //if (CurrentTermDetails == "" && $("#CurrentTermName").val() == "Initial Term") {
    //    $("#CurrentRenewalTermStart").text($("#txtContractTermStartDateRenew").val());
    //    $("#CurrentRenewalTermEnd").text($("#txtContractTermEndDateRenew").val());
    //}

    var statTerm = 'Not Started';
    if ((startdate < todaydate || startdateM == todaydateM) && (todaydateM == enddateM || todaydate < enddate))
        $("#txtRenewStatus").find('b').length > 0 ? $("#txtRenewStatus b").text("Current") : $("#txtRenewStatus").text("Current");
    else if (startdate > todaydate || startdate == null)
        $("#txtRenewStatus").find('b').length > 0 ? $("#txtRenewStatus b").text("Not Started") : $("#txtRenewStatus").text("Not Started");
    else if (todaydate > enddate && todaydateM != enddateM)
        $("#txtRenewStatus").find('b').length > 0 ? $("#txtRenewStatus b").text("Ended") : $("#txtRenewStatus").text("Ended");
    //if(EditSaveFlag)
    //{
    //    var str='';
    //    if (statTerm == "Current")
    //        str = '<b title="Current" class="status_green" style="padding: 5px 0px; color:#fff;display: inline-block;width: 88px;vertical-align: middle;text-align: center;height: 15px;">' + statTerm + '<img src="../Content/Images/down_arrow.png" style="width: 8px;margin-top: 4px !important;"  alt="Open Menu" title="Open Menu" class="openmenuRenewalExp edithide margin-left-5"></b>';
    //    else if (statTerm == "Ended")
    //        str = '<b title="Ended" class="status_Gray" style="padding: 5px 0px; color:#fff;display: inline-block;width: 88px;vertical-align: middle;text-align: center;height: 15px;">' + statTerm + '</b>';
    //    else if (statTerm == "Not Started")
    //        str = '<b title="Not Started" class="status_blue" style="padding: 5px 0px; color:#fff;display: inline-block;width: 88px;vertical-align: middle;text-align: center;height: 15px;">' + statTerm + '</b>';
    //    else 
    //        str = '<b>' + statTerm + '</b>';

    //    $("#txtRenewStatus").html(str);
    //    $(".openmenuRenewalExp").contextMenu({
    //        menu: 'menuRenewalExp', leftButton: true
    //    }, function (action, el, pos) {
    //        contextMenuRenewal(action, el.parent("b").parent("td").parent("tr"), pos);
    //    });
    //}
}
function calculateenddateRenewSub(from, choice, number, to) {
    var todaydate = new Date();
    var startdate = new Date($("#" + from).val());



    if ($("#" + choice).find('option:selected').val() == "months" && ($("#" + number).val() != "0" && $("#" + choice).val() != "" && $("#" + number).val() % 12 == 0)) {
        $("#" + choice).val('years');
        $("#" + number).val($("#" + number).val() / 12);
    }
    if ($("#" + from).val() != "" && $("#" + number).val() != "") {

        var ftxtContractTermStartDate = '';
        if ($("#" + from).val() != "" && $("#" + from).val() != null) {
            ftxtContractTermStartDate = $.datepicker.formatDate("mm/dd/yy", $("#" + from).datepicker('getDate'));
            if ($("#" + from).datepicker('getDate') == null) {
                ftxtContractTermStartDate = $("#" + from).val();
                startdate = new Date($("#" + from).val());
            }
        }
        var fnextDate = "";
        var dtNextdate;
        var strNextDateUTC = "";

        var nextDate = moment(new Date(ftxtContractTermStartDate)).utcOffset(getTimeZone());//.subtract($("#" + choice).find('option:selected').val(), $("#" + number).val()).utc();
        strNextDateUTC = moment(new Date(nextDate)).utc().format('MM/DD/YYYY');
        dtNextdate = new Date(strNextDateUTC);
        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
            if (getTimeZone().indexOf('+') > -1)
                fnextDate = moment(nextDate).subtract($("#" + number).val(), $("#" + choice).find('option:selected').val()).format('MM/DD/YYYY');
            else if (getTimeZone().indexOf('+00:00') > -1 || getTimeZone().indexOf('-') > -1)
                fnextDate = moment(nextDate).subtract($("#" + number).val(), $("#" + choice).find('option:selected').val()).utc().format('MM/DD/YYYY');
        }
        else {
            if (getTimeZone().indexOf('+') > -1)
                fnextDate = moment(nextDate).subtract($("#" + number).val(), $("#" + choice).find('option:selected').val()).format(localStorage.AppDateFormat);
            else if (getTimeZone().indexOf('+00:00') > -1 || getTimeZone().indexOf('-') > -1) {
                fnextDate = moment(nextDate).subtract($("#" + number).val(), $("#" + choice).find('option:selected').val()).utc().format(localStorage.AppDateFormat);
                //fnextDate = moment(fnextDate).subtract(1, "days").format(localStorage.AppDateFormat);
            }
        }
        if (fnextDate != "Invalid Date") {
            $("#" + to).text("(" + fnextDate + ")");
        }
        else
            $("#" + to).text('');
    }
    else
        $("#" + to).text('');


}
function EnableContractTermEndChoice() {
    $("#ContractTermChoices").prop('disabled', false);
    $("#ContractTerm").prop('disabled', false);
    $("#ContractTerm").val('1');
    $("#ContractTermChoices").val('years');
    EndDateCheck = "";
    if (EndDateCheck == "")
        calculateenddate();
    else
        $("#txtContractTermEndDate").val(EndDateCheck);
    $("#txtContractTermEndDate").prop('disabled', true);
    $("#txtContractTermEndDate").removeClass('form-contro-Date');
    $("#txtContractTermEndDate").addClass('form-contro-NoDate');
}

function EnableContractTermEndDate() {
    $("#ContractTerm").val('');
    $("#ContractTermChoices").val('years');
    if (EndDateCheck == "")
        calculateenddate();
    else
        $("#txtContractTermEndDate").val(EndDateCheck);
    $("#ContractTermChoices").prop('disabled', true);
    $("#ContractTerm").prop('disabled', true);
    $("#txtContractTermEndDate").prop('disabled', false);
    $("#txtContractTermEndDate").removeClass('form-contro-NoDate');
    $("#txtContractTermEndDate").addClass('form-contro-Date');
}
$('#txtTermTimes').on('keypress', function (e) {
    if (!$(this).val() && e.which == 48)
        return false;
});
function EnableContractTermRenewEndChoice(IsEnableday, isMultiple) {
    $("#ContractTermRenewChoicesNew").prop('disabled', false);
    $("#ContractTermRenewNew").prop('disabled', false);
    $("#txtContractTermRenewSetMulti").prop('disabled', false);
    $("#ddlTermPeriodSetMulti").prop('disabled', false);

    if (IsEnableday) {
        $("#ContractTermRenewNew").val('2');
        $("#ContractTermRenewChoicesNew").val('days');
        $("#txtContractTermRenewSetMulti").val('2');
        if (!isMultiple)
            $("#ddlTermPeriodSetMulti").val('days');

    }
    else {
        $("#ContractTermRenewNew").val('1');
        $("#ContractTermRenewChoicesNew").val('years');
        if (!isMultiple) {
            $("#txtContractTermRenewSetMulti").val('1');
            $("#ddlTermPeriodSetMulti").val('years');
        }
    }
    //  if ($('input[type="radio"][name="rdRenewTermEndDate"][value="Term"]').is(':checked'))
    if (!isMultiple)
        calculateenddateRenew('txtRenewStartDate', 'ContractTermRenewChoicesNew', 'ContractTermRenewNew', 'txtRenewEndDate')
    else
        calculateenddateRenew('txtRenewStartDate', 'ddlTermPeriodSetMulti', 'txtContractTermRenewSetMulti', 'txtRenewEndDate')



    $("#txtRenewEndDate").prop('disabled', true);
    $("#txtRenewEndDate").removeClass('form-contro-Date');
    $("#txtRenewEndDate").addClass('form-contro-NoDate');
}

function EnableContractRenewTermEndDate() {
    $("#ContractTermRenewNew").val('');
    $("#ContractTermRenewChoicesNew").val('years');
    if (EndDateCheckRenewal == "") {
        // if ($('input[type="radio"][name="rdRenewTermEndDate"][value="Term"]').is(':checked'))
        calculateenddateRenew('txtRenewStartDate', 'ContractTermRenewChoicesNew', 'ContractTermRenewNew', 'txtRenewEndDate')
    }

    $("#ContractTermRenewChoicesNew").prop('disabled', true);
    $("#ContractTermRenewNew").prop('disabled', true);
    $("#txtRenewEndDate").prop('disabled', false);
    $("#txtRenewEndDate").removeClass('form-contro-NoDate');
    $("#txtRenewEndDate").addClass('form-contro-Date');
}


function GetRenewalEachDetails(RenewalTerm) {
    if (vContractID == '') {
        vContractID = $("#hdContractID").val();
    }
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + vContractID + '/contractrenewalhistory',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
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
                    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                        fRenewedDate = moment(new Date(item.RenewedDate)).format('MM/DD/YYYY');
                    }
                    else {
                        fRenewedDate = moment(new Date(item.RenewedDate)).format(localStorage.AppDateFormat);
                    }
                    str += '<td>' + fRenewedDate + '</td>';
                } else {
                    str += '<td></td>';
                }
                str += '<td>' + item.RenewedBy + '</td>';
                if (item.TermEndDate != null) {
                    var fTermEndDate = "";  
                    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                        fTermEndDate = moment(new Date(item.TermEndDate)).format('MM/DD/YYYY');
                    }
                    else {
                        fTermEndDate = moment(new Date(item.TermEndDate)).format(localStorage.AppDateFormat);
                    }
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
                    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                        fRenewedDate = moment(new Date(item.RenewedDate)).format('MM/DD/YYYY');
                    }
                    else {
                        fRenewedDate = moment(new Date(item.RenewedDate)).format(localStorage.AppDateFormat);
                    }
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
function ContractTermSave() {
    if ($("#txtTermTimes").val() == 0) {
        $("#txtTermTimes").val('');
    }
    if (requiredValidator('dvContractTerm', false)) {
        var vCurrentTermEndDate = '';
        if ($("#txtTermTimes").val() == "0") {
            $('#txtTermTimes').addClass('error');
        }
        else {
            $('#txtTermTimes').removeClass('error');
            var ftxtContractTermStartDate = '';
            if ($("#txtContractTermStartDate").val() != "" && $("#txtContractTermStartDate").val() != null) {
                ftxtContractTermStartDate = $.datepicker.formatDate('mm/dd/yy', $("#txtContractTermStartDate").datepicker('getDate'));
            }
            var fContractTermEvaluationDate = '';
            if ($("#txtContractTermEvaluationDate").val() != "" && $("#txtContractTermEvaluationDate").val() != null) {
                fContractTermEvaluationDate = $.datepicker.formatDate('mm/dd/yy', $("#txtContractTermEvaluationDate").datepicker('getDate'));
            }
            var fContractTermEndDate = '';
            if ($("#txtContractTermEndDate").val() != "" && $("#txtContractTermEndDate").val() != null) {
                fContractTermEndDate = $.datepicker.formatDate('mm/dd/yy', $("#txtContractTermEndDate").datepicker('getDate'));
            }
            var fContractTermEnds = '';
            if ($("#txtContractTermEnds").val() != "" && $("#txtContractTermEnds").val() != null) {
                fContractTermEnds = $.datepicker.formatDate('mm/dd/yy', $("#txtContractTermEnds").datepicker('getDate'));
            }
            var fContractTermRenewOn = '';
            if ($("#txtContractTermRenewOn").val() != "" && $("#txtContractTermRenewOn").val() != null) {
                fContractTermRenewOn = $.datepicker.formatDate('mm/dd/yy', $("#txtContractTermRenewOn").datepicker('getDate'));
            }
            var fContractTermExpireOn = '';
            if ($("#txtContractTermExpireOn").val() != "" && $("#txtContractTermExpireOn").val() != null) {
                fContractTermExpireOn = $.datepicker.formatDate('mm/dd/yy', $("#txtContractTermExpireOn").datepicker('getDate'));
            }
            var vTermType = $("#ddlTermType option:selected").val();
            var vContractTermNotes = $("#TermNotes").val();
            var errmsg = '';
            if (vTermType == "Fixed Term") {
                if (!comparedates("txtContractTermStartDate", "txtContractTermEvaluationDate")) {
                    //$("#txtContractTermStartDate").addClass('error');
                    //alert("Next Evaluation Date should be greater than Start / Effective Date");
                    errmsg += "Next Evaluation Date should be greater than Start / Effective Date.\n";
                }
                if (!comparedates("txtContractTermStartDate", "txtContractTermEndDate")) {
                    //alert("End Date should be greater than Start / Effective Date");
                    errmsg += "End Date should be greater than Start / Effective Date.\n";
                }
                if (!comparedates("txtContractTermEvaluationDate", "txtContractTermEndDate")) {
                    //alert("End Date should be greater than Next Evaluation Date");
                    errmsg += "End Date should be greater than Next Evaluation Date.\n";
                }
            } else if (vTermType == "Evergreen / Perpetual") {
                if (!comparedates("txtContractTermStartDate", "txtContractTermEvaluationDate")) {
                    //$("#txtContractTermStartDate").addClass('error');
                    //alert("Next Evaluation Date should be greater than Start / Effective Date");
                    errmsg += "Next Evaluation Date should be greater than Start / Effective Date.\n";
                }
            } else if (vTermType == "Executed / Performance") {
            } else if (vTermType == "Renewable") {
                if (!comparedates("txtContractTermStartDate", "txtContractTermEnds")) {
                    //$("#txtContractTermStartDate").addClass('error');
                    //alert("Next Evaluation Date should be greater than Start / Effective Date");
                    errmsg += "Current Term End Date should be greater than Start / Effective Date.\n";
                }
                if (!comparedates("txtContractTermEnds", "txtContractTermEndDate")) {
                    //$("#txtContractTermStartDate").addClass('error');
                    //alert("Next Evaluation Date should be greater than Start / Effective Date");
                    errmsg += "End Date should be greater than Current Term End Date.\n";
                }
                if (!comparedates("txtContractTermStartDate", "txtContractTermEndDate")) {
                    //alert("End Date should be greater than Start / Effective Date");
                    errmsg += "End Date should be greater than Start / Effective Date.\n";
                }
                if (!comparedates("txtContractTermRenewOn", "txtContractTermEndDate")) {
                    //alert("End Date should be greater than Start / Effective Date");
                    errmsg += "End Date should be greater than Renew On / Anniversary Date.\n";
                }

                if ($('input[type="radio"][name=TermAutoRenewal]:checked').val() == 'Yes') {
                    var vTermTime = parseInt($("#txtTermTimes").val());
                    var vRenewalDate = new Date(fContractTermRenewOn);
                    var vScheduledRenewal = $('input[type="radio"][name=ScheduleAutoRenewal]:checked').val();
                    if (vScheduledRenewal == 'Instances')
                        vTermTime *= parseInt($("#txtRenewalInstance").val());

                    if ($("#ddlTermPeriod").val() == 'Years')
                        vRenewalDate = moment(vRenewalDate).add(vTermTime, 'years').format('MM/DD/YYYY');
                    else
                        vRenewalDate = moment(vRenewalDate).add(vTermTime, 'months').format('MM/DD/YYYY');
                    $("#hdContractTermRenewOn").val(vRenewalDate);
                    if (!comparedates("hdContractTermRenewOn", "txtContractTermEndDate")) {
                        //alert("End Date should be greater than Start / Effective Date");
                        errmsg += "End Date should be greater than Schedule Auto Renewal Date.\n";
                    }
                }
            }

            //var vCounterpartyNoticesRenewal = $("#CounterpartyNoticesRenewal").val();
            var vCounterpartyNoticesCancel = $("#txtSendReminderDayCancelCounterAll").val();
            var vCounterpartyNotices = $("#CounterpartyNoticeAll").val();
            //if ($("#txtContractTermEndDate").val() != "" && $("#txtContractTermEndDate").val() != null) {
            //    vCurrentTermEndDate = $.datepicker.formatDate('mm/dd/yy', new Date($("#txtContractTermEndDate").val()));

            //}
            //if (vCurrentTermEndDate != '' && typeof (vCurrentTermEndDate) != "undefined") {
            //    var vCounterpartyNoticesRenewalDate = '';

            //    if (vCounterpartyNoticesRenewal != null && vCounterpartyNoticesRenewal != "" && typeof (vCounterpartyNoticesRenewal) != "undefined") {
            //        var nextDate = moment(vCurrentTermEndDate).add("days", vCounterpartyNoticesRenewal);
            //        var strNextDateUTC = moment(new Date(nextDate)).utc().format('MM/DD/YYYY');
            //        var dtNextdate = new Date(strNextDateUTC);
            //        var dtcurrentdate = new Date(vCurrentTermEndDate);
            //        if (dtNextdate != "invalid" && dtcurrentdate != "invalid" && dtNextdate >= dtcurrentdate) {
            //            errmsg = "The Cancellation / Termination Notice days is greater than the possible days allowed from today before term end date.";
            //        }
            //        else {
            //            vCounterpartyNoticesRenewalDate = $.datepicker.formatDate('mm/dd/yy', new Date(strNextDateUTC));
            //        }
            //    }

            //    var vCounterpartyNoticesCancelDate = '';
            //    if (vCounterpartyNoticesCancel != null && vCounterpartyNoticesCancel != "" && typeof (vCounterpartyNoticesCancel) != "undefined") {
            //        var nextDate = moment(vCurrentTermEndDate).add("days", vCounterpartyNoticesCancel);
            //        var strNextDateUTC = moment(new Date(nextDate)).utc().format('MM/DD/YYYY');
            //        var dtNextdate = new Date(strNextDateUTC);
            //        var dtcurrentdate = new Date(vCurrentTermEndDate);
            //        if (dtNextdate != "invalid" && dtcurrentdate != "invalid" && dtNextdate >= dtcurrentdate) {
            //            errmsg = "The Renewal Notice days is greater than the possible days allowed from today before end date.";
            //        }
            //        else {
            //            vCounterpartyNoticesCancelDate = $.datepicker.formatDate('mm/dd/yy', new Date(strNextDateUTC));
            //        }
            //    }
            //}
            if (errmsg != '') {
                //  alert(errmsg);
                swal("", errmsg);
            } else {
                $("#loadingPage").fadeIn();

                if (vContractID == '') {
                    vContractID = $("#hdContractID").val();
                }
                var vStartDate = null;
                var vContractTerm = '';
                var vContractTermChoices = '';
                var vEndDate = null;
                var vRenewalDate = null;
                var vNextEvaluationDate = null;
                var vTermEndDate = null;
                var vAutoRenew = '';
                var vAutoExpireOn = null;
                var vScheduledRenewal = '';
                var vRenewableTerm = '';

                var vSendRenewReminderTo = '';
                var vRenewReminder1 = $("#txtSendRenewReminderDay1").val() == "" ? 0 : $("#txtSendRenewReminderDay1").val();
                var vRenewReminder2 = $("#txtSendRenewReminderDay2").val() == "" ? 0 : $("#txtSendRenewReminderDay2").val();
                var vRenewReminder3 = $("#txtSendRenewReminderDay3").val() == "" ? 0 : $("#txtSendRenewReminderDay3").val();
                if (vRenewReminder1 != 0)
                    var vRenewReminder1Condition = $("#ddlSendRenewReminder1").val() + '-' + $("#ddlSendRenewReminderDate1").val();
                else
                    var vRenewReminder1Condition = $("#ddlSendRenewReminder1 option:first").val() + '-' + $("#ddlSendRenewReminderDate1 option:first").val();
                if (vRenewReminder2 != 0)
                    var vRenewReminder2Condition = $("#ddlSendRenewReminder2").val() + '-' + $("#ddlSendRenewReminderDate2").val();
                else
                    var vRenewReminder2Condition = $("#ddlSendRenewReminder2 option:first").val() + '-' + $("#ddlSendRenewReminderDate2 option:first").val();
                if (vRenewReminder3 != 0)
                    var vRenewReminder3Condition = $("#ddlSendRenewReminder3").val() + '-' + $("#ddlSendRenewReminderDate3").val();
                else
                    var vRenewReminder3Condition = $("#ddlSendRenewReminder3 option:first").val() + '-' + $("#ddlSendRenewReminderDate3 option:first").val();

                var SendReminderToArr = $("#ddlSendRenewReminderTo").val();
                $(SendReminderToArr).each(function (i, item) {
                    if (vSendRenewReminderTo == '') {
                        vSendRenewReminderTo = item;
                    }
                    else {
                        vSendRenewReminderTo += "; " + item;
                    }
                });

                if (vTermType == "Fixed Term") {
                    vStartDate = ftxtContractTermStartDate;
                    //$("#txtContractTermStartDate").val();
                    vNextEvaluationDate = fContractTermEvaluationDate;
                    vEndDate = fContractTermEndDate;
                    if ($('input[type="radio"][name=rdTermEndDate]:checked').val() == 'Term') {
                        vContractTerm = $("#ContractTerm").val();
                        vContractTermChoices = $("#ContractTermChoices option:selected").val();
                    }
                } else if (vTermType == "Evergreen / Perpetual") {
                    vStartDate = ftxtContractTermStartDate;
                    //$("#txtContractTermStartDate").val();
                    vNextEvaluationDate = fContractTermEvaluationDate;
                } else if (vTermType == "Executed / Performance") {
                    vStartDate = ftxtContractTermStartDate;
                    //$("#txtContractTermStartDate").val();
                } else if (vTermType == "Renewable") {
                    vStartDate = ftxtContractTermStartDate;
                    //$("#txtContractTermStartDate").val();
                    vEndDate = fContractTermEndDate;
                    if ($('input[type="radio"][name=rdTermEndDate]:checked').val() == 'Term') {
                        vContractTerm = $("#ContractTerm").val();
                        vContractTermChoices = $("#ContractTermChoices option:selected").val();
                    }

                    vTermEndDate = fContractTermEnds;
                    vAutoRenew = $('input[type="radio"][name=TermAutoRenewal]:checked').val();
                    if (vAutoRenew == 'Yes') {
                        vRenewalDate = fContractTermRenewOn;
                        vRenewableTerm = $("#txtTermTimes").val() + '-' + $("#ddlTermPeriod").val();
                        vScheduledRenewal = $('input[type="radio"][name=ScheduleAutoRenewal]:checked').val();
                        if (vScheduledRenewal == 'Instances')
                            vScheduledRenewal = $("#txtRenewalInstance").val() + " Instances";
                    } else {
                        vRenewalDate = fContractTermRenewOn;
                        vAutoExpireOn = fContractTermExpireOn;
                    }
                }
                vAlertEnabled = $("#AlertActive").val();
                //Sridhar
                var termCommentsXML = getTermCommentsXML(vTermType, vStartDate, vEndDate, vNextEvaluationDate);

                var IsWarningShow = false;
                if ($("#ddlSendRenewReminder1").val() == "before") {
                    if (vRenewReminder1 != 0) {
                        if ($("#ddlSendRenewReminderDate1").val() == "Start / Effective Date") {
                            var start = moment(ftxtContractTermStartDate);
                            var today = new Date();
                            var end = moment(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear());
                            var vv = start.diff(end, "days");
                            if (vv <= parseInt(vRenewReminder1)) {
                                IsWarningShow = true;
                            }
                        }
                        else if ($("#ddlSendRenewReminderDate1").val() == "Next Evaluation Date") {
                            var start = moment(fContractTermEvaluationDate);
                            var today = new Date();
                            var end = moment(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear());
                            var vv = start.diff(end, "days");
                            if (vv <= parseInt(vRenewReminder1)) {
                                IsWarningShow = true;
                            }
                        }
                        else if ($("#ddlSendRenewReminderDate1").val() == "End Date (Overall Contract)") {
                            var start = moment(fContractTermEndDate);
                            var today = new Date();
                            var end = moment(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear());
                            var vv = start.diff(end, "days");
                            if (vv <= parseInt(vRenewReminder1)) {
                                IsWarningShow = true;
                            }
                        }

                    }
                }
                if ($("#ddlSendRenewReminder2").val() == "before") {
                    if (vRenewReminder2 != 0) {
                        if ($("#ddlSendRenewReminderDate2").val() == "Start / Effective Date") {
                            var start = moment(ftxtContractTermStartDate);
                            var today = new Date();
                            var end = moment(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear());
                            var vv = start.diff(end, "days");
                            if (vv <= parseInt(vRenewReminder2)) {
                                IsWarningShow = true;
                            }
                        }
                        else if ($("#ddlSendRenewReminderDate2").val() == "Next Evaluation Date") {
                            var start = moment(fContractTermEvaluationDate);
                            var today = new Date();
                            var end = moment(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear());
                            var vv = start.diff(end, "days");
                            if (vv <= parseInt(vRenewReminder2)) {
                                IsWarningShow = true;
                            }
                        }
                        else if ($("#ddlSendRenewReminderDate2").val() == "End Date (Overall Contract)") {
                            var start = moment(fContractTermEndDate);
                            var today = new Date();
                            var end = moment(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear());
                            var vv = start.diff(end, "days");
                            if (vv <= parseInt(vRenewReminder2)) {
                                IsWarningShow = true;
                            }
                        }
                    }
                }
                if ($("#ddlSendRenewReminder3").val() == "before") {
                    if (vRenewReminder3 != 0) {
                        if ($("#ddlSendRenewReminderDate3").val() == "Start / Effective Date") {
                            var start = moment(ftxtContractTermStartDate);
                            var today = new Date();
                            var end = moment(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear());
                            var vv = start.diff(end, "days");
                            if (vv <= parseInt(vRenewReminder3)) {
                                IsWarningShow = true;
                            }
                        }
                        else if ($("#ddlSendRenewReminderDate3").val() == "Next Evaluation Date") {
                            var start = moment(fContractTermEvaluationDate);
                            var today = new Date();
                            var end = moment(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear());
                            var vv = start.diff(end, "days");
                            if (vv <= parseInt(vRenewReminder3)) {
                                IsWarningShow = true;
                            }
                        }
                        else if ($("#ddlSendRenewReminderDate3").val() == "End Date (Overall Contract)") {
                            var start = moment(fContractTermEndDate);
                            var today = new Date();
                            var end = moment(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear());
                            var vv = start.diff(end, "days");
                            if (vv <= parseInt(vRenewReminder3)) {
                                IsWarningShow = true;
                            }
                        }
                    }
                }

                if (IsWarningShow) {
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
           $.ajax({
               url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + vContractID + '/ContractTerm',
               type: 'PUT',
               dataType: 'json',
               headers: {
                   'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName
               },
               data: {
                   ContractID: vContractID,
                   ContractTermType: vTermType,
                   ContractTermNotes: vContractTermNotes,
                   StartDate: vStartDate,
                   ContractTerm: vContractTerm,
                   ContractTermChoices: vContractTermChoices,
                   EndDate: vEndDate,
                   RenewalDate: vRenewalDate,
                   NextEvaluationDate: vNextEvaluationDate,
                   TermEndDate: vTermEndDate,
                   AutoRenew: vAutoRenew,
                   AutoExpireOn: vAutoExpireOn,
                   ScheduledRenewal: vScheduledRenewal,
                   RenewableTerm: vRenewableTerm,
                   SendRenewReminderTo: vSendRenewReminderTo,
                   CounterpartyNotices: vCounterpartyNotices,
                   //CounterpartyNoticesRenewal: vCounterpartyNoticesRenewal,
                   //CounterpartyNoticesRenewalDate: vCounterpartyNoticesRenewalDate,
                   CounterpartyNoticesCancel: vCounterpartyNoticesCancel,
                   //CounterpartyNoticesCancelDate: vCounterpartyNoticesCancelDate,
                   RenewReminder1: vRenewReminder1,
                   RenewReminder2: vRenewReminder2,
                   RenewReminder3: vRenewReminder3,
                   RenewReminder1Condition: vRenewReminder1Condition,
                   RenewReminder2Condition: vRenewReminder2Condition,
                   RenewReminder3Condition: vRenewReminder3Condition,
                   ModifiedBy: localStorage.UserName,
                   AlertsEnabled: vAlertEnabled,
                   TermCommentsXML: termCommentsXML
               },
               cache: false,
               success: function (data) {
                   //if (data != null)
                   //    contractItem = data;
                   if (data != null) {
                       var permissiontoapply = contractItem.Permission;
                       contractItem = data;
                       if (contractItem.Permission == null || contractItem.Permission == "") {
                           contractItem.Permission = permissiontoapply;
                       }
                   }

                   if (contractItem.EndDate != null) {
                       var FEndDate = "";
                       if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                           FEndDate = moment(new Date(contractItem.EndDate)).utc().format('MM/DD/YYYY');
                       }
                       else {
                           FEndDate = moment(new Date(contractItem.EndDate)).utc().format(localStorage.AppDateFormat);
                       }
                       $("#txtContractEndDateCurrent").val(FEndDate);
                   } else {
                       $("#txtContractEndDateCurrent").val("Not Available");
                   }

                   BindContractTermDetail(contractItem);
                   $("#loadingPage").fadeOut();
                   swal.close();
                   $("#dvContractTerm").dialog("close");
                   try {
                       BindSystemMilestones(contractItem)
                   }
                   catch (ex) {

                   }
                   GetRenewalChecklistAndNotes(vContractID, 0);
               },
               error: function (data) {
                   swal.close();
                   $("#loadingPage").fadeOut();
               },
               complete: function () {
                   swal.close();
                   $("#loadingPage").fadeOut();
               }
           });
       }
       else {
           swal.close();
           $("#loadingPage").fadeOut();
           $('.ui-button-green-text').parent().removeAttr('disabled');
       }
       return;
   });
                }
                else {
                    swal.close();
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + vContractID + '/ContractTerm',
                        type: 'PUT',
                        dataType: 'json',
                        headers: {
                            'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName
                        },
                        data: {
                            ContractID: vContractID,
                            ContractTermType: vTermType,
                            ContractTermNotes: vContractTermNotes,
                            StartDate: vStartDate,
                            ContractTerm: vContractTerm,
                            ContractTermChoices: vContractTermChoices,
                            EndDate: vEndDate,
                            RenewalDate: vRenewalDate,
                            NextEvaluationDate: vNextEvaluationDate,
                            TermEndDate: vTermEndDate,
                            AutoRenew: vAutoRenew,
                            AutoExpireOn: vAutoExpireOn,
                            ScheduledRenewal: vScheduledRenewal,
                            RenewableTerm: vRenewableTerm,
                            SendRenewReminderTo: vSendRenewReminderTo,
                            CounterpartyNotices: vCounterpartyNotices,
                            //CounterpartyNoticesRenewal: vCounterpartyNoticesRenewal,
                            //CounterpartyNoticesRenewalDate: vCounterpartyNoticesRenewalDate,
                            CounterpartyNoticesCancel: vCounterpartyNoticesCancel,
                            //CounterpartyNoticesCancelDate: vCounterpartyNoticesCancelDate,
                            RenewReminder1: vRenewReminder1,
                            RenewReminder2: vRenewReminder2,
                            RenewReminder3: vRenewReminder3,
                            RenewReminder1Condition: vRenewReminder1Condition,
                            RenewReminder2Condition: vRenewReminder2Condition,
                            RenewReminder3Condition: vRenewReminder3Condition,
                            ModifiedBy: localStorage.UserName,
                            AlertsEnabled: vAlertEnabled,
                            TermCommentsXML: termCommentsXML
                        },
                        cache: false,
                        success: function (data) {
                            //if (data != null)
                            //    contractItem = data;
                            if (data != null) {
                                var permissiontoapply = contractItem.Permission;
                                contractItem = data;
                                if (contractItem.Permission == null || contractItem.Permission == "") {
                                    contractItem.Permission = permissiontoapply;
                                }
                            }
                            BindContractTermDetail(contractItem);
                            $("#loadingPage").fadeOut();
                            swal.close();
                            $("#dvContractTerm").dialog("close");
                            try {
                                BindSystemMilestones(contractItem)
                            }
                            catch (ex) {

                            }
                            GetRenewalChecklistAndNotes(vContractID, 0);
                        },
                        error: function (data) {
                            swal.close();
                            $("#loadingPage").fadeOut();
                        },
                        complete: function () {
                            swal.close();
                            $("#loadingPage").fadeOut();
                        }
                    });
                }
            }
        }
    }
}
function RenewalTermSave() {
    if (requiredValidator('dvContractTerm', false)) {
        //manoj
        var allowtoadd = false;
        var renewalstartdate;
        var comparedate;
        if ($("#renewalViewHistoryTerm tr").length > 0) {
            var startdateParts = $("#RenewedDate1").text().split('/');
            comparedateParts = $("#txtRenewConfirmSendDate").text().trim();
            comparedateParts = (comparedateParts.charAt(0) == "(") ? comparedateParts.substr(1) : comparedateParts;
            comparedateParts = (comparedateParts.slice(-1) == ")") ? comparedateParts.slice(0, -1) : comparedateParts;
            var arrcomparedateParts = comparedateParts.split('/');
            if (DatepickerFormat == "dd/mm/yy") {
                renewalstartdate = new Date($.datepicker.formatDate('mm/dd/yy', new Date(startdateParts[2], startdateParts[0] - 1, startdateParts[1])));
                comparedate = new Date($.datepicker.formatDate('mm/dd/yy', new Date(arrcomparedateParts[2], arrcomparedateParts[1] - 1, arrcomparedateParts[0])));
            }
            else {
                renewalstartdate = new Date($.datepicker.formatDate('mm/dd/yy', new Date(startdateParts[2], startdateParts[0] - 1, startdateParts[1])));
                comparedate = new Date($.datepicker.formatDate('mm/dd/yy', new Date(arrcomparedateParts[2], arrcomparedateParts[0] - 1, arrcomparedateParts[1])));
            }
            if (renewalstartdate < comparedate) {
                allowtoadd = true;
            } else {  //Added from 2.4final to 2.4
                if ($(':input[type="radio"][name=RenewalAuth]:checked').val() == "Yes") {
                    if (comparedate == "Invalid Date") {
                        swal("", "Please select a \"Current Term\" to receive Authorization alerts.");
                        allowtoadd = false
                    }
                    else {
                        swal("", "Renewal authorization alert date should be greater than current term Start date.");
                        allowtoadd = false
                    }
                }
                else
                    allowtoadd = true;
            }
        } else {
            allowtoadd = true;
        }

        //manoj
        if (allowtoadd) {
            var errmsg = '';
            var vCurrentTermName = $("#hdCurrentTermName").val();
            var vCurrentTermEndDate = '';
            var dateEndTerm;

            var vCounterpartyNoticesCancel = "";
            var vCounterpartyNoticesRenewal = "";
            var vCounterpartyNoticesRenewalDate = null;
            var vCounterpartyNoticesCancelDate = null;

            var vContractConfirmSendTerm = "";
            var vContractConfirmSendDate = null;


            var fConfirmSendDate = null;

            if ($("#hdCurrentRenewalTermEnd").val() != "" && $("#hdCurrentRenewalTermEnd").val() != null) {
                vCurrentTermEndDate = $.datepicker.formatDate('mm/dd/yy', new Date($("#hdCurrentRenewalTermEnd").val()));

            }
            vCounterpartyNoticesCancel = $("#txtSendRenewReminderDayCancelCounter").val();
            vContractConfirmSendTerm = $("#txtSendRenewReminderDayRenewalConfirm").val();
            vCounterpartyNoticesRenewal = $("#txtSendRenewReminderDayRenewalCounter").val();
            if (vCurrentTermEndDate != '' && typeof (vCurrentTermEndDate) != "undefined") {

                if (vContractConfirmSendTerm != null && vContractConfirmSendTerm != "" && typeof (vContractConfirmSendTerm) != "undefined") {
                    var nextDate = moment(new Date()).add(vContractConfirmSendTerm, "days");
                    var strNextDateUTC = moment(new Date(nextDate)).utc().format('MM/DD/YYYY');
                    var dtNextdate = new Date(strNextDateUTC);
                    var dtcurrentdate = new Date(vCurrentTermEndDate);
                    if ($("#txtSendRenewReminderDayRenewalConfirm").prop('disabled') == true) {
                        fConfirmSendDate = $.datepicker.formatDate('mm/dd/yy', new Date(strNextDateUTC));
                        vContractConfirmSendDate = fConfirmSendDate;
                    }
                    else {
                        if (dtNextdate != "invalid" && dtcurrentdate != "invalid" && dtNextdate >= dtcurrentdate) {
                            errmsg = "The authorization email alerts days is greater than the possible days allowed from today before current term ends.";
                        }
                        else {
                            fConfirmSendDate = $.datepicker.formatDate('mm/dd/yy', new Date(strNextDateUTC));
                            vContractConfirmSendDate = fConfirmSendDate;
                        }
                    }
                }


                if (vCounterpartyNoticesRenewal != null && vCounterpartyNoticesRenewal != "" && typeof (vCounterpartyNoticesRenewal) != "undefined") {
                    var nextDate = moment(new Date()).add(vCounterpartyNoticesRenewal, "days");
                    var strNextDateUTC = moment(new Date(nextDate)).utc().format('MM/DD/YYYY');
                    var dtNextdate = new Date(strNextDateUTC);
                    var dtcurrentdate = new Date(vCurrentTermEndDate);
                    if (dtNextdate != "invalid" && dtcurrentdate != "invalid" && dtNextdate >= dtcurrentdate) {
                        errmsg = "The Renewal Notice days is greater than the possible days allowed from today before current term ends.";
                    }
                    else {
                        vCounterpartyNoticesRenewalDate = $.datepicker.formatDate('mm/dd/yy', new Date(strNextDateUTC));
                    }
                }


                if (vCounterpartyNoticesCancel != null && vCounterpartyNoticesCancel != "" && typeof (vCounterpartyNoticesCancel) != "undefined") {
                    var nextDate = moment(new Date()).add(vCounterpartyNoticesCancel, "days");
                    var strNextDateUTC = moment(new Date(nextDate)).utc().format('MM/DD/YYYY');
                    var dtNextdate = new Date(strNextDateUTC);
                    var dtcurrentdate = new Date(vCurrentTermEndDate);
                    if (dtNextdate != "invalid" && dtcurrentdate != "invalid" && dtNextdate >= dtcurrentdate) {
                        errmsg = "The Cancellation Notice days is greater than the possible days allowed from today before current term ends.";
                    }
                    else {
                        vCounterpartyNoticesCancelDate = $.datepicker.formatDate('mm/dd/yy', new Date(strNextDateUTC));
                    }
                }


            }
            var vAutoRenew = $(':input[type="radio"][name=RenewalConfirmAuto]:checked').val();
            if (vAutoRenew == "Yes") {
                if ($("#txtContractTermRenewSet").val() == "0")
                    errmsg = "Renewal Term cannot be 0.";
            }

            if (errmsg != '') {
                //  alert(errmsg);

                swal("", errmsg);
            } else {

                $("#loadingPage").fadeIn();
                if (vContractID == '') {
                    vContractID = $("#hdContractID").val();
                }
                var vContractTermType = $("#ddlTermType option:selected").val();
                var vContractTermNotes = $("#TermNotes").val();
                var vRenewalTerms = [];
                $("#renewalViewHistoryTerm tr").each(function (i, item) {
                    var elid = item.id;
                    if ($(item).hasClass('termExpired')) {
                        var totalFileCount = elid.replace("ExpRenewalViewHistoryTerm", "");
                        var vRenewableTermName = $('#ExpRenewableTermName' + totalFileCount).text();
                        var vRenewedDate = $('#ExpRenewedDate' + totalFileCount).text();
                        var vNextRenewalDate = ($('#ExpRenewedDate' + (parseInt(totalFileCount) + 1)) != null && typeof ($('#ExpRenewedDate' + (parseInt(totalFileCount) + 1))) != "undefined") ? $('#ExpRenewedDate' + (parseInt(totalFileCount) + 1)).text() : "";
                        var vTermEndDate = $('#ExpTermEndDate' + totalFileCount).text();
                        var vTermStatus = $('#ExpTermStatus' + totalFileCount).text();
                        var vRenewalType = $('#ExpRenewalType' + totalFileCount).text();
                        var vStatus = $('#ExpStatus' + totalFileCount).text();
                        var vRenewalNotes = $('#ExpRenewalNotes' + totalFileCount).text();
                        var vRenewalConfirmParticipants = $('#ExpRenewalConfirmParticipants' + totalFileCount).text();
                        var vRenewedBy = $('#ExpRenewedBy' + totalFileCount).text();
                        var vRenewedOn = $('#ExpRenewedOn' + totalFileCount).text();
                        var vRenewalChecklist = $('#ExpRenewalChecklist' + totalFileCount).text();
                        var vRenewalNotificationInternal = $('#ExpRenewalNotificationInternal' + totalFileCount).text();
                        var vContractTermEach = $('#ExpContractTermEach' + totalFileCount).text();
                        var vContractTermChoicesEach = $('#ExpContractTermChoicesEach' + totalFileCount).text();
                        var vCreated = $('#ExpCreated' + totalFileCount).text();
                        var vCreatedBy = $('#ExpCreatedBy' + totalFileCount).text();
                        var vModified = $('#ExpModified' + totalFileCount).text();
                        var vModifiedBy = $('#ExpModifiedBy' + totalFileCount).text();
                        var vRenewalCommentXML = encodeURIComponent($('#ExpRenewalCommentsXML' + totalFileCount).html());
                        vRenewalTerms.push({
                            "ContractID": vContractID,
                            "RenewableTermName": vRenewableTermName,
                            "RenewedFor": vRenewedDate + "-" + vTermEndDate,
                            "RenewedBy": vRenewedBy,
                            "RenewedOn": vRenewedOn != "" ? $.datepicker.formatDate('mm/dd/yy', new Date(vRenewedOn)) : null,
                            "RenewedDate": vRenewedDate != "" ? $.datepicker.formatDate('mm/dd/yy', new Date(vRenewedDate)) : null,
                            "NextRenewalDate": vNextRenewalDate != "" ? $.datepicker.formatDate('mm/dd/yy', new Date(vNextRenewalDate)) : null,
                            "TermEndDate": vTermEndDate != "" ? $.datepicker.formatDate('mm/dd/yy', new Date(vTermEndDate)) : null,
                            "Status": vStatus,
                            "TermStatus": vTermStatus,
                            "Created": vCreated != "" ? $.datepicker.formatDate('mm/dd/yy', new Date(vCreated)) : $.datepicker.formatDate('mm/dd/yy', new Date()),
                            "CreatedBy": vCreatedBy,
                            "Modified": vModified != "" ? $.datepicker.formatDate('mm/dd/yy', new Date(vModified)) : null,
                            "ModifiedBy": vModifiedBy,
                            "RenewalType": vRenewalType,
                            "RenewalNotes": vRenewalNotes,
                            "RenewalChecklist": vRenewalChecklist,
                            "RenewalNotificationInternal": vRenewalNotificationInternal,
                            "ContractTermEach": vContractTermEach,
                            "ContractTermChoicesEach": vContractTermChoicesEach,
                            "RenewalConfirmOverall": contractItem.RenewalConfirmOverall,
                            "RenewalConfirmParticipantsXML": contractItem.RenewalConfirmParticipantsXML,
                            "RenewalCommentsXML": vRenewalCommentXML
                        });
                    }
                    else {
                        var totalFileCount = elid.replace("renewalViewHistoryTerm", "");
                        var vRenewableTermName = $('#RenewableTermName' + totalFileCount).text();
                        var vRenewedDate = $('#RenewedDate' + totalFileCount).text();
                        var vNextRenewalDate = ($('#RenewedDate' + (parseInt(totalFileCount) + 1)) != null && typeof ($('#RenewedDate' + (parseInt(totalFileCount) + 1))) != "undefined") ? $('#RenewedDate' + (parseInt(totalFileCount) + 1)).text() : "";
                        var vTermEndDate = $('#TermEndDate' + totalFileCount).text();
                        var vTermStatus = $('#TermStatus' + totalFileCount).text();
                        var vRenewalType = $('#RenewalType' + totalFileCount).text();
                        var vStatus = $('#Status' + totalFileCount).text();
                        var vRenewalNotes = $('#RenewalNotes' + totalFileCount).text();
                        var vRenewalConfirmParticipants = $('#RenewalConfirmParticipants' + totalFileCount).text();
                        var vRenewedBy = $('#RenewedBy' + totalFileCount).text();
                        var vRenewedOn = $('#RenewedOn' + totalFileCount).text();
                        var vRenewalChecklist = $('#RenewalChecklist' + totalFileCount).text();
                        var vRenewalNotificationInternal = $('#RenewalNotificationInternal' + totalFileCount).text();
                        var vContractTermEach = $('#ContractTermEach' + totalFileCount).text();
                        var vContractTermChoicesEach = $('#ContractTermChoicesEach' + totalFileCount).text();
                        var vCreated = $('#Created' + totalFileCount).text();
                        var vCreatedBy = $('#CreatedBy' + totalFileCount).text();
                        var vModified = $('#Modified' + totalFileCount).text();
                        var vModifiedBy = $('#ModifiedBy' + totalFileCount).text();
                        var vRenewalCommentXML = encodeURIComponent($('#RenewalCommentsXML' + totalFileCount).html());
                        vRenewalTerms.push({
                            "ContractID": vContractID,
                            "RenewableTermName": vRenewableTermName,
                            "RenewedFor": vRenewedDate + "-" + vTermEndDate,
                            "RenewedBy": vRenewedBy,
                            "RenewedOn": vRenewedOn != "" ? $.datepicker.formatDate('mm/dd/yy', new Date(vRenewedOn)) : null,
                            "RenewedDate": vRenewedDate != "" ? $.datepicker.formatDate('mm/dd/yy', new Date(vRenewedDate)) : null,
                            "NextRenewalDate": vNextRenewalDate != "" ? $.datepicker.formatDate('mm/dd/yy', new Date(vNextRenewalDate)) : null,
                            "TermEndDate": vTermEndDate != "" ? $.datepicker.formatDate('mm/dd/yy', new Date(vTermEndDate)) : null,
                            "Status": vStatus,
                            "TermStatus": vTermStatus,
                            "Created": vCreated != "" ? $.datepicker.formatDate('mm/dd/yy', new Date(vCreated)) : $.datepicker.formatDate('mm/dd/yy', new Date()),
                            "CreatedBy": vCreatedBy,
                            "Modified": vModified != "" ? $.datepicker.formatDate('mm/dd/yy', new Date(vModified)) : null,
                            "ModifiedBy": vModifiedBy,
                            "RenewalType": vRenewalType,
                            "RenewalNotes": vRenewalNotes,
                            "RenewalChecklist": vRenewalChecklist,
                            "RenewalNotificationInternal": vRenewalNotificationInternal,
                            "ContractTermEach": vContractTermEach,
                            "ContractTermChoicesEach": vContractTermChoicesEach,
                            "RenewalConfirmOverall": contractItem.RenewalConfirmOverall,
                            "RenewalConfirmParticipantsXML": contractItem.RenewalConfirmParticipantsXML,
                            "RenewalCommentsXML": vRenewalCommentXML
                        });
                    }


                })

                var vContractAutoTerm = "";
                var vContractAutoTermChoices = "";
                var vAutoContractRenewTermCount = "";
                var vAutoContractRenewOn = null;
                if (vAutoRenew == "Yes") {
                    vContractAutoTerm = $("#txtContractTermRenewSet").val();
                    vContractAutoTermChoices = $("#ddlTermPeriodSet").val();
                    vAutoContractRenewTermCount = $("#ddlTermPeriodSetRenewal").val();
                    var fAutoContractRenewOn = null;
                    vAutoContractRenewOn = vCurrentTermEndDate;
                }
                var vRequiresAuth = $(':input[type="radio"][name=RenewalAuth]:checked').val();

                //var vRenewalConfirmParticipants = "";  //Added from 2.4final to 2.4

                var vRenewalConfirmParticipantsCC = "";
                if (vRequiresAuth == "Yes") {
                    var vSendRenewConfirmParticipants = '';
                    var SendConfirmParticipantsToArr = $("#ddlSendUserToRenewalConfirmUsers").val();
                    $(SendConfirmParticipantsToArr).each(function (i, item) {
                        if (vSendRenewConfirmParticipants == '') {
                            vSendRenewConfirmParticipants = item;
                        }
                        else {
                            vSendRenewConfirmParticipants += "; " + item;
                        }
                    });
                    vRenewalConfirmParticipants = vSendRenewConfirmParticipants;



                    var vSendRenewConfirmParticipantsCC = '';
                    var SendConfirmParticipantsToArrCC = $("#ddlSendUserToRenewalConfirmUsersCC").val();
                    $(SendConfirmParticipantsToArrCC).each(function (i, item) {
                        if (vSendRenewConfirmParticipantsCC == '') {
                            vSendRenewConfirmParticipantsCC = item;
                        }
                        else {
                            vSendRenewConfirmParticipantsCC += "; " + item;
                        }
                    });
                    vRenewalConfirmParticipantsCC = vSendRenewConfirmParticipantsCC;
                }
                var vCounterpartyNotices = $("#CounterpartyNotice").val();


                var vSendRenewReminderTo = "";
                var vRenewReminder1Condition = "";
                var vRenewReminder2Condition = "";
                var vRenewReminder3Condition = "";



                var vRenewReminder1 = $("#txtSendRenewReminderDay1").val() == "" ? 0 : $("#txtSendRenewReminderDay1").val();
                var vRenewReminder2 = $("#txtSendRenewReminderDay2").val() == "" ? 0 : $("#txtSendRenewReminderDay2").val();
                var vRenewReminder3 = $("#txtSendRenewReminderDay3").val() == "" ? 0 : $("#txtSendRenewReminderDay3").val();
                if (vRenewReminder1 != 0)
                    vRenewReminder1Condition = $("#ddlSendRenewReminder1").val() + '-' + $("#ddlSendRenewReminderDate1").val();
                else
                    vRenewReminder1Condition = $("#ddlSendRenewReminder1 option:first").val() + '-' + $("#ddlSendRenewReminderDate1 option:first").val();
                if (vRenewReminder2 != 0)
                    vRenewReminder2Condition = $("#ddlSendRenewReminder2").val() + '-' + $("#ddlSendRenewReminderDate2").val();
                else
                    vRenewReminder2Condition = $("#ddlSendRenewReminder2 option:first").val() + '-' + $("#ddlSendRenewReminderDate2 option:first").val();
                if (vRenewReminder3 != 0)
                    vRenewReminder3Condition = $("#ddlSendRenewReminder3").val() + '-' + $("#ddlSendRenewReminderDate3").val();
                else
                    vRenewReminder3Condition = $("#ddlSendRenewReminder3 option:first").val() + '-' + $("#ddlSendRenewReminderDate3 option:first").val();

                var SendReminderToArr = $("#ddlSendRenewReminderTo").val();
                $(SendReminderToArr).each(function (i, item) {
                    if (vSendRenewReminderTo == '') {
                        vSendRenewReminderTo = item;
                    }
                    else {
                        vSendRenewReminderTo += "; " + item;
                    }
                });
                vAlertEnabled = $("#AlertActive").val();
                var IsWarningShow = false;
                if ($("#ddlSendRenewReminder1").val() == "before") {
                    if (vRenewReminder1 != 0) {
                        if ($("#ddlSendRenewReminderDate1").val() == "Start / Effective Date") {
                            var start = moment(ftxtContractTermStartDate);
                            var today = new Date();
                            var end = moment(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear());
                            var vv = start.diff(end, "days");
                            if (vv <= parseInt(vRenewReminder1)) {
                                IsWarningShow = true;
                            }
                        }
                        else if ($("#ddlSendRenewReminderDate1").val() == "Next Evaluation Date") {
                            var start = moment(fContractTermEvaluationDate);
                            var today = new Date();
                            var end = moment(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear());
                            var vv = start.diff(end, "days");
                            if (vv <= parseInt(vRenewReminder1)) {
                                IsWarningShow = true;
                            }
                        }
                        else if ($("#ddlSendRenewReminderDate1").val() == "End Date (Overall Contract)") {
                            var start = moment(fContractTermEndDate);
                            var today = new Date();
                            var end = moment(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear());
                            var vv = start.diff(end, "days");
                            if (vv <= parseInt(vRenewReminder1)) {
                                IsWarningShow = true;
                            }
                        }

                    }
                }
                if ($("#ddlSendRenewReminder2").val() == "before") {
                    if (vRenewReminder2 != 0) {
                        if ($("#ddlSendRenewReminderDate2").val() == "Start / Effective Date") {
                            var start = moment(ftxtContractTermStartDate);
                            var today = new Date();
                            var end = moment(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear());
                            var vv = start.diff(end, "days");
                            if (vv <= parseInt(vRenewReminder2)) {
                                IsWarningShow = true;
                            }
                        }
                        else if ($("#ddlSendRenewReminderDate2").val() == "Next Evaluation Date") {
                            var start = moment(fContractTermEvaluationDate);
                            var today = new Date();
                            var end = moment(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear());
                            var vv = start.diff(end, "days");
                            if (vv <= parseInt(vRenewReminder2)) {
                                IsWarningShow = true;
                            }
                        }
                        else if ($("#ddlSendRenewReminderDate2").val() == "End Date (Overall Contract)") {
                            var start = moment(fContractTermEndDate);
                            var today = new Date();
                            var end = moment(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear());
                            var vv = start.diff(end, "days");
                            if (vv <= parseInt(vRenewReminder2)) {
                                IsWarningShow = true;
                            }
                        }
                    }
                }
                if ($("#ddlSendRenewReminder3").val() == "before") {
                    if (vRenewReminder3 != 0) {
                        if ($("#ddlSendRenewReminderDate3").val() == "Start / Effective Date") {
                            var start = moment(ftxtContractTermStartDate);
                            var today = new Date();
                            var end = moment(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear());
                            var vv = start.diff(end, "days");
                            if (vv <= parseInt(vRenewReminder3)) {
                                IsWarningShow = true;
                            }
                        }
                        else if ($("#ddlSendRenewReminderDate3").val() == "Next Evaluation Date") {
                            var start = moment(fContractTermEvaluationDate);
                            var today = new Date();
                            var end = moment(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear());
                            var vv = start.diff(end, "days");
                            if (vv <= parseInt(vRenewReminder3)) {
                                IsWarningShow = true;
                            }
                        }
                        else if ($("#ddlSendRenewReminderDate3").val() == "End Date (Overall Contract)") {
                            var start = moment(fContractTermEndDate);
                            var today = new Date();
                            var end = moment(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear());
                            var vv = start.diff(end, "days");
                            if (vv <= parseInt(vRenewReminder3)) {
                                IsWarningShow = true;
                            }
                        }
                    }
                }

                if (IsWarningShow) {
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
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + vContractID + '/ContractRenewalTerm',
                        type: 'PUT',
                        dataType: 'json',
                        headers: {
                            'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, 'RenewedManual': isRenewedManual
                        },
                        data: {
                            ContractID: vContractID,
                            ContractTermType: vContractTermType,
                            ContractTermNotes: vContractTermNotes,
                            AutoRenew: vAutoRenew,
                            RenewalDate: vAutoContractRenewOn,
                            ContractAutoTerm: vContractAutoTerm,
                            ContractAutoTermChoices: vContractAutoTermChoices,
                            AutoContractRenewTermCount: vAutoContractRenewTermCount,
                            RequiresAuth: vRequiresAuth,
                            RenewalConfirmParticipants: vRenewalConfirmParticipants,
                            ContractConfirmSendTerm: vContractConfirmSendTerm,
                            ContractConfirmSendDate: vContractConfirmSendDate,
                            RenewalConfirmParticipantsCC: vRenewalConfirmParticipantsCC,
                            CounterpartyNotices: vCounterpartyNotices,
                            CounterpartyNoticesRenewal: vCounterpartyNoticesRenewal,
                            CounterpartyNoticesRenewalDate: vCounterpartyNoticesRenewalDate,
                            CounterpartyNoticesCancel: vCounterpartyNoticesCancel,
                            CounterpartyNoticesCancelDate: vCounterpartyNoticesCancelDate,
                            RenewalTerms: vRenewalTerms,
                            RenewalConfirmOverall: contractItem.RenewalConfirmOverall,
                            RenewalConfirmParticipantsXML: contractItem.RenewalConfirmParticipantsXML,
                            SendRenewReminderTo: vSendRenewReminderTo,
                            RenewReminder1: vRenewReminder1,
                            RenewReminder2: vRenewReminder2,
                            RenewReminder3: vRenewReminder3,
                            RenewReminder1Condition: vRenewReminder1Condition,
                            RenewReminder2Condition: vRenewReminder2Condition,
                            RenewReminder3Condition: vRenewReminder3Condition,
                            AlertsEnabled: vAlertEnabled
                        },
                        cache: false,
                        success: function (data) {
                            if (data != null) {
                                var permissiontoapply = contractItem.Permission;
                                contractItem = data;
                                if (contractItem.Permission == null || contractItem.Permission == "") {
                                    contractItem.Permission = permissiontoapply;
                                }
                            }
                            BindContractTermDetail(contractItem);
                            //ApplyPermissionToAuthorizers(contractItem, vRenewalConfirmParticipants); //Added 2.4final to 2.4
                            $("#loadingPage").fadeOut();
                            $("#dvContractTerm").dialog("close");
                            try {
                                BindSystemMilestones(contractItem)
                            }
                            catch (ex) {

                            }
                            GetRenewalChecklistAndNotes(vContractID, 0);
                        },
                        error: function (data) {
                            $("#loadingPage").fadeOut();
                        },
                        complete: function () {
                            $("#loadingPage").fadeOut();
                            isRenewedManual = "No";
                        }
                    });

                }
                else {
                    $("#loadingPage").fadeOut();
                    $('.ui-button-green-text').parent().removeAttr('disabled');
                }
                return;
            });
                }
                else {
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + vContractID + '/ContractRenewalTerm',
                        type: 'PUT',
                        dataType: 'json',
                        headers: {
                            'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, 'RenewedManual': isRenewedManual
                        },
                        data: {
                            ContractID: vContractID,
                            ContractTermType: vContractTermType,
                            ContractTermNotes: vContractTermNotes,
                            AutoRenew: vAutoRenew,
                            RenewalDate: vAutoContractRenewOn,
                            ContractAutoTerm: vContractAutoTerm,
                            ContractAutoTermChoices: vContractAutoTermChoices,
                            AutoContractRenewTermCount: vAutoContractRenewTermCount,
                            RequiresAuth: vRequiresAuth,
                            RenewalConfirmParticipants: vRenewalConfirmParticipants,
                            ContractConfirmSendTerm: vContractConfirmSendTerm,
                            ContractConfirmSendDate: vContractConfirmSendDate,
                            RenewalConfirmParticipantsCC: vRenewalConfirmParticipantsCC,
                            CounterpartyNotices: vCounterpartyNotices,
                            CounterpartyNoticesRenewal: vCounterpartyNoticesRenewal,
                            CounterpartyNoticesRenewalDate: vCounterpartyNoticesRenewalDate,
                            CounterpartyNoticesCancel: vCounterpartyNoticesCancel,
                            CounterpartyNoticesCancelDate: vCounterpartyNoticesCancelDate,
                            RenewalTerms: vRenewalTerms,
                            RenewalConfirmOverall: contractItem.RenewalConfirmOverall,
                            RenewalConfirmParticipantsXML: contractItem.RenewalConfirmParticipantsXML,
                            SendRenewReminderTo: vSendRenewReminderTo,
                            RenewReminder1: vRenewReminder1,
                            RenewReminder2: vRenewReminder2,
                            RenewReminder3: vRenewReminder3,
                            RenewReminder1Condition: vRenewReminder1Condition,
                            RenewReminder2Condition: vRenewReminder2Condition,
                            RenewReminder3Condition: vRenewReminder3Condition,
                            AlertsEnabled: vAlertEnabled
                        },
                        cache: false,
                        success: function (data) {
                            if (data != null) {
                                var permissiontoapply = contractItem.Permission;
                                contractItem = data;
                                if (contractItem.Permission == null || contractItem.Permission == "") {
                                    contractItem.Permission = permissiontoapply;
                                }
                            }
                            BindContractTermDetail(contractItem);
                            //ApplyPermissionToAuthorizers(contractItem, vRenewalConfirmParticipants);   //Added 2.4final to 2.4
                            $("#loadingPage").fadeOut();
                            $("#dvContractTerm").dialog("close");
                            try {
                                BindSystemMilestones(contractItem)
                            }
                            catch (ex) {

                            }
                            GetRenewalChecklistAndNotes(vContractID, 0);
                        },
                        error: function (data) {
                            $("#loadingPage").fadeOut();
                        },
                        complete: function () {
                            $("#loadingPage").fadeOut();
                            isRenewedManual = "No";
                        }
                    });
                }
            }
        } else {
            if (comparedate == "Invalid Date") {
                swal("", "Please select a \"Current Term\" to receive Authorization alerts.");
            }
            else
                swal("", "Renewal authorization alert date should be greater than current term Start date.");
        }
    }
}
function GetRenewalAll() {
    var RenewalTermName = "";
    $("#AddRenewalTerm").css("display", "none");
    $("#AddInitialTerm").css("display", "none");
    var expireFlag = false;
    var isCurrentPresent = false;
    if (vContractID == '') {
        vContractID = $("#hdContractID").val();
    }
    $("#renewalViewHistoryTerm").html('<img src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + vContractID + '/contractrenewalhistory',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        success: function (data) {
            $("#renewalViewHistoryTerm").empty();
            $("#hdCurrentTermName").val('');
            $("#hdCurrentRenewalTermStart").val('');
            $("#hdCurrentRenewalTermEnd").val('').trigger('change');
            var str = "";
            if (data == null || data.length == 0) {
                $("#AddInitialTerm").css("display", "");
                $("#AddRenewalTerm").css("display", "none");

                $("#CurrentTermName").val('Initial Term');
                CurrentTermDetails = "";
                $("#ddlTermPeriodSetRenewal").find("option").show()
            }
            else {
                $("#AddInitialTerm").css("display", "none");
                $("#AddRenewalTerm").css("display", "");
                var TermStartDate = "";
                var TermEndDate = "";
                var TermNextDate = "";
                var len = data.length;
                var InitialTermFlag = true;
                var todaydate = new Date();

                var allTerms = [];
                var endedTerms = $.grep(data, function (itemR, i) {
                    return itemR.TermStatus == "Ended"
                })

                var currentTerm = $.grep(data, function (itemR, i) {
                    return itemR.TermStatus == "Current"
                })
                var expiredTerms = $.grep(data, function (itemR, i) {
                    return itemR.TermStatus == "Expired" && itemR.RenewableTermName != "Initial Term"
                })

                var notStartedTerms = $.grep(data, function (itemR, i) {
                    return itemR.TermStatus == "Not Started"
                })

                allTerms = allTerms.concat(endedTerms, currentTerm, expiredTerms, notStartedTerms);
                $(allTerms).each(function (i, item) {
                    var indexCount = (parseInt(i) + 1);
                    var vAction = "";
                    var vActionStatus = "";
                    if (item.RenewableTermName == "Initial Term") {
                        InitialTermFlag = false;
                    }
                    else {
                        InitialTermFlag = true;
                    }
                    if (item.RenewableTermName == "" || item.RenewableTermName == null) {
                        var dStartDate;
                        var dEndDate;

                        if (InitialTermFlag) {
                            InitialTermFlag = false;
                            var fStartDate = "";
                            str += '  <tr id="renewalViewHistoryTerm' + indexCount + '">';
                            str += ' <td id="RenewableTermName' + indexCount + '">Initial Term<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="' + vAction + ' margin-left-5"></td>';
                            if (contrcatItem.StartDate != null) {

                                var fStartDate = "";
                                var fStartDateDisplay = "";
                                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                                    fStartDateDisplay = moment(new Date(contrcatItem.StartDate)).utc().format('MM/DD/YYYY');
                                }
                                else {
                                    fStartDateDisplay = moment(new Date(contrcatItem.StartDate)).utc().format(localStorage.AppDateFormat);
                                }
                                dStartDate = new Date(contrcatItem.StartDate);
                                fStartDate = moment(new Date(contrcatItem.StartDate)).utc().format('MM/DD/YYYY');
                                str += ' <td id="RenewedDate' + indexCount + '" style="display:none;">' + fStartDate + '</td>';
                                str += ' <td id="RenewedDateDisplay' + indexCount + '" >' + fStartDateDisplay + '</td>';

                            } else if (contrcatItem.EffectiveDate != null) {
                                var fStartDate = "";
                                var fStartDateDisplay = "";
                                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                                    fStartDateDisplay = moment(new Date(contrcatItem.EffectiveDate)).utc().format('MM/DD/YYYY');
                                }
                                else {
                                    fStartDateDisplay = moment(new Date(contrcatItem.EffectiveDate)).utc().format(localStorage.AppDateFormat);
                                }
                                fStartDate = moment(new Date(contrcatItem.EffectiveDate)).utc().format('MM/DD/YYYY');
                                str += ' <td id="RenewedDate' + indexCount + '" style="display:none;">' + fStartDate + '</td>';
                                str += ' <td id="RenewedDateDisplay' + indexCount + '" >' + fStartDateDisplay + '</td>';


                            }
                            else {
                                str += ' <td id="RenewedDate' + indexCount + '" style="display:none;"></td>';
                                str += ' <td id="RenewedDateDisplay' + indexCount + '" ></td>';
                            }
                            if (item.RenewedDate != null) {
                                dEndDate = new Date(item.RenewedDate);
                                dEndDate.setDate(dEndDate.getDate() - 1);
                                var fRenewedDate = "";
                                var fRenewedDateDisplay = "";
                                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                                    fRenewedDateDisplay = moment(new Date(dEndDate)).utc().format('MM/DD/YYYY');
                                }
                                else {
                                    fRenewedDateDisplay = moment(new Date(dEndDate)).utc().format(localStorage.AppDateFormat);
                                }
                                fRenewedDate = moment(new Date(dEndDate)).utc().format('MM/DD/YYYY');
                                str += ' <td id="TermEndDate' + indexCount + '" style="display:none;">' + fRenewedDate + '</td>';
                                str += ' <td id="TermEndDateDisplay' + indexCount + '" >' + fRenewedDateDisplay + '</td>';
                            } else {
                                str += ' <td id="TermEndDate' + indexCount + '" style="display:none;"></td>';
                                str += ' <td id="TermEndDateDisplay' + indexCount + '" ></td>';
                            }
                            var statTerm = "";
                            if (dStartDate <= todaydate && todaydate < dEndDate)
                                statTerm = "Current";
                            else if (dStartDate > todaydate)
                                statTerm = "Not Started";
                            else if (todaydate > dEndDate)
                                statTerm = "Ended";
                            if (statTerm == "Current")
                                str += '  <td id="TermStatus' + indexCount + '"><b title="Current" class="status_green" style="padding: 5px 0px; color:#fff;display: inline-block;width: 88px;vertical-align: middle;text-align: center;height: 15px;">' + statTerm + '<img src="../Content/Images/down_arrow.png" style="width: 8px;margin-top: 4px !important;"  alt="Open Menu" title="Open Menu" class="' + vActionStatus + ' edithide margin-left-5"></b></td>';
                            else if (statTerm == "Ended")
                                str += '  <td id="TermStatus' + indexCount + '"><b title="Ended" class="status_Gray" style="padding: 5px 0px; color:#fff;display: inline-block;width: 88px;vertical-align: middle;text-align: center;height: 15px;">' + statTerm + '</b></td>';
                            else if (statTerm == "Expired")
                                str += '  <td id="TermStatus' + indexCount + '"><b title="Expired" class="status_red" style="padding: 5px 0px; color:#fff;display: inline-block;width: 88px;vertical-align: middle;text-align: center;height: 15px;">' + statTerm + '<img src="../Content/Images/down_arrow.png" style="width: 8px;margin-top: 4px !important;" alt="Open Menu" title="Open Menu" class="' + vActionStatus + ' edithide margin-left-5"></b></td>';
                            else if (statTerm == "Not Started")
                                str += '  <td id="TermStatus' + indexCount + '"><b title="Not Started" class="status_blue" style="padding: 5px 0px; color:#fff;display: inline-block;width: 88px;vertical-align: middle;text-align: center;height: 15px;">' + statTerm + '</b></td>';
                            else
                                str += '  <td id="TermStatus' + indexCount + '"><b title="Current" class="" style="padding: 5px 0px; color:;display: inline-block;width: 88px;vertical-align: middle;text-align: center;height: 15px;">' + statTerm + '</b></td>';
                            str += ' <td id="Status' + indexCount + '" style="display:none;"></td>';
                            str += ' <td id="RenewalNotes' + indexCount + '" style="display:none;"></td>';
                            str += '  <td id="RenewalConfirmParticipants' + indexCount + '" style="display:none;"></td>';
                            str += ' <td id="RenewedOn' + indexCount + '" style="display:none;"></td>';
                            str += ' <td id="RenewedOnDisplay' + indexCount + '" ></td>';
                            str += ' <td id="RenewedBy' + indexCount + '"></td>';
                            str += '      <td id="RenewalChecklist' + indexCount + '" style="display:none;"></td>';
                            str += '  <td id="RenewalNotificationInternal' + indexCount + '" style="display:none;"></td>';
                            str += '  <td id="RenewalConfirmParticipantsXML' + indexCount + '" style="display:none;"></td>';
                            str += '  <td id="ContractTermEach' + indexCount + '" style="display:none;"></td>';
                            str += '  <td id="RenewalType' + indexCount + '" style="display:none;"></td>';
                            str += ' <td id="ContractTermChoicesEach' + indexCount + '" style="display:none;"></td>';
                            str += '     <td id="CreatedBy' + indexCount + '" style="display:none;">' + item.CreatedBy + '</td>';
                            str += '    <td id="ModifiedBy' + indexCount + '" style="display:none;">' + item.ModifiedBy + '</td>';
                            str += '<td id="Created' + indexCount + '" style="display:none;">' + item.Created + '</td>';
                            str += '        <td id="Modified' + indexCount + '" style="display:none;">' + item.Modified + '</td>';
                            str += '        <td id="RenewalCommentsXML' + indexCount + '" style="display:none;">' + item.RenewalCommentsXML + '</td>';
                            str += '</tr>';
                            indexCount = (parseInt(indexCount) + 1);
                        }
                        else {
                            indexCount = (parseInt(indexCount) + 1);
                        }
                        if (i == 0)
                            item.RenewableTermName = "Renewal 1";
                        else
                            item.RenewableTermName = "Renewal " + i;

                        var startdate = "";
                        var enddate = "";
                        if (item.RenewedDate != null) {
                            {
                                startdate = new Date(item.RenewedDate);
                            }
                        }
                        if (item.TermEndDate != null) {
                            {
                                enddate = new Date(item.TermEndDate);
                            }
                        }
                        if (startdate <= todaydate && todaydate < enddate)
                            item.TermStatus = "Current";
                        else if (startdate > todaydate)
                            item.TermStatus = "Not Started";
                        else if (todaydate > enddate)
                            item.TermStatus = "Ended";
                    }
                    if (item.TermStatus == "Ended" || item.TermStatus == "Current" || item.TermStatus == "Expired") {
                        vAction = "openmenuRenewalAll";
                        if (item.TermStatus == "Current" || item.TermStatus == "Expired") {
                            if (!isCurrentPresent) {
                                $("#hdCurrentTermName").val(item.RenewableTermName);
                                TermStartDate = moment(new Date(item.RenewedDate)).utc().format('MM/DD/YYYY'); //$.datepicker.formatDate('mm/dd/yy', new Date(item.RenewedDate));
                                TermEndDate = moment(new Date(item.TermEndDate)).utc().format('MM/DD/YYYY');
                                //$.datepicker.formatDate('mm/dd/yy', new Date(item.TermEndDate));
                                if (item.NextRenewalDate != null) {
                                    TermNextDate = moment(new Date(item.NextRenewalDate)).utc().format('MM/DD/YYYY');// $.datepicker.formatDate('mm/dd/yy', new Date(item.NextRenewalDate));
                                    $("#hdNextRenewalTermStart").val(TermNextDate);
                                }
                                else
                                    $("#hdNextRenewalTermStart").val("");
                                $("#hdCurrentRenewalTermEnd").val(TermEndDate).trigger('change');
                                $("#hdCurrentRenewalTermStart").val(TermStartDate);
                            }
                            if (item.TermStatus == "Current") {
                                vActionStatus = "openmenuRenewalExp";
                                isCurrentPresent = true;

                            }
                            else if (item.TermStatus == "Expired") {
                                if (!isCurrentPresent) {
                                    expireFlag = true;
                                    vActionStatus = "openmenuRenewalCur";
                                }
                                else {
                                    vAction = "openmenuRenewalDelNew";
                                    vActionStatus = "";
                                }
                            }

                        }
                        else if (item.TermStatus == "Ended") {
                            if (item.NextRenewalDate != null) {
                                TermNextDate = moment(new Date(item.NextRenewalDate)).utc().format('MM/DD/YYYY');//$.datepicker.formatDate('mm/dd/yy', new Date(item.NextRenewalDate));
                                //    $("#hdNextRenewalTermStart").val(TermNextDate);
                                //}
                                //else
                                //    $("#hdNextRenewalTermStart").val("");
                            }
                        }

                    }
                    else {
                        vAction = "openmenuRenewalDel";

                        if (TermNextDate != null && TermNextDate != "" && typeof (TermNextDate) != "undefined") {
                            var nextDate = new Date(TermNextDate);

                            if ($.datepicker.formatDate('mm/dd/yy', new Date(item.RenewedDate)) == $.datepicker.formatDate('mm/dd/yy', nextDate) && (item.RenewalType == "" || item.RenewalType == "Manual")) {
                                NextTermRenewFlag = true;
                                RenewalTermName = item.RenewableTermName;
                            }
                        }
                        else {
                            NextTermRenewFlag = false;
                            RenewalTermName = "";
                        }

                    }
                    if (item.TermStatus == "Expired" && item.RenewableTermName != "Initial Term") {
                        indexCount = parseInt(item.RenewableTermName.replace("Renewal ", ""));
                        str += '  <tr id="ExpRenewalViewHistoryTerm' + indexCount + '" class="termExpired">';
                        str += ' <td id="ExpRenewableTermName' + indexCount + '">' + item.RenewableTermName + '<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="' + vAction + ' margin-left-5"></td>';
                        if (item.RenewedDate != null) {
                            var fStartDate = "";
                            var fStartDateDisplay = "";
                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                                fStartDateDisplay = moment(new Date(item.RenewedDate)).utc().format('MM/DD/YYYY');
                            }
                            else {
                                fStartDateDisplay = moment(new Date(item.RenewedDate)).utc().format(localStorage.AppDateFormat);
                            }
                            fStartDate = moment(new Date(item.RenewedDate)).utc().format('MM/DD/YYYY');
                            str += ' <td id="ExpRenewedDate' + indexCount + '" style="display:none;">' + fStartDate + '</td>';
                            str += ' <td id="ExpRenewedDateDisplay' + indexCount + '" >' + fStartDateDisplay + '</td>';
                        } else {
                            str += ' <td id="ExpRenewedDate' + indexCount + '" style="display:none;"></td>';
                            str += ' <td id="ExpRenewedDateDisplay' + indexCount + '" ></td>';
                        }
                        if (item.TermEndDate != null) {
                            var fRenewedDate = "";
                            var fRenewedDateDisplay = "";
                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                                fRenewedDateDisplay = moment(new Date(item.TermEndDate)).utc().format('MM/DD/YYYY');
                            }
                            else {
                                fRenewedDateDisplay = moment(new Date(item.TermEndDate)).utc().format(localStorage.AppDateFormat);
                            }
                            fRenewedDate = moment(new Date(item.TermEndDate)).utc().format('MM/DD/YYYY');
                            str += ' <td id="ExpTermEndDate' + indexCount + '" style="display:none;">' + fRenewedDate + '</td>';
                            str += ' <td id="ExpTermEndDateDisplay' + indexCount + '" >' + fRenewedDateDisplay + '</td>';
                        } else {
                            str += ' <td id="ExpTermEndDate' + indexCount + '" style="display:none;"></td>';
                            str += ' <td id="ExpTermEndDateDisplay' + indexCount + '" ></td>';
                        }

                        if (item.TermStatus == "Current")
                            str += '  <td id="ExpTermStatus' + indexCount + '"><b title="Current" class="status_green" style="padding: 5px 0px; color:#fff;display: inline-block;width: 88px;vertical-align: middle;text-align: center;height: 15px;">' + item.TermStatus + '<img src="../Content/Images/down_arrow.png" style="width: 8px;margin-top: 4px !important;"  alt="Open Menu" title="Open Menu" class="' + vActionStatus + ' edithide margin-left-5"></b></td>';
                        else if (item.TermStatus == "Ended")
                            str += '  <td id="ExpTermStatus' + indexCount + '"><b title="Ended" class="status_Gray" style="padding: 5px 0px; color:#fff;display: inline-block;width: 88px;vertical-align: middle;text-align: center;height: 15px;">' + item.TermStatus + '</b></td>';
                        else if (item.TermStatus == "Expired") {
                            if (TermEndDate != "") {
                                var dateEnd = new Date(TermEndDate);
                                if (todaydate <= dateEnd) {
                                    if (vActionStatus != "")
                                        str += '  <td id="ExpTermStatus' + indexCount + '"><b title="Expired" class="status_red" style="padding: 5px 0px; color:#fff;display: inline-block;width: 88px;vertical-align: middle;text-align: center;height: 15px;">' + item.TermStatus + '<img src="../Content/Images/down_arrow.png" style="width: 8px;margin-top: 4px !important;" alt="Open Menu" title="Open Menu" class="' + vActionStatus + ' edithide margin-left-5"></b></td>';
                                    else
                                        str += '  <td id="ExpTermStatus' + indexCount + '"><b title="Expired" class="status_red" style="padding: 5px 0px; color:#fff;display: inline-block;width: 88px;vertical-align: middle;text-align: center;height: 15px;">' + item.TermStatus + '</b></td>';
                                }
                                else
                                    str += '  <td id="ExpTermStatus' + indexCount + '"><b title="Expired" class="status_red" style="padding: 5px 0px; color:#fff;display: inline-block;width: 88px;vertical-align: middle;text-align: center;height: 15px;">' + item.TermStatus + '</b></td>';
                            }
                            else {
                                str += '  <td id="ExpTermStatus' + indexCount + '"><b title="Expired" class="status_red" style="padding: 5px 0px; color:#fff;display: inline-block;width: 88px;vertical-align: middle;text-align: center;height: 15px;">' + item.TermStatus + '</b></td>';
                            }

                        }
                        else if (item.TermStatus == "Not Started")
                            str += '  <td id="ExpTermStatus' + indexCount + '"><b title="Not Started" class="status_blue" style="padding: 5px 0px; color:#fff;display: inline-block;width: 88px;vertical-align: middle;text-align: center;height: 15px;">' + item.TermStatus + '</b></td>';
                        else
                            str += '  <td id="ExpTermStatus' + indexCount + '"><b title="Current" class="" style="padding: 5px 0px; color:;display: inline-block;width: 88px;vertical-align: middle;text-align: center;height: 15px;">' + item.TermStatus + '</b></td>';
                        str += ' <td id="ExpStatus' + indexCount + '" style="display:none;">' + item.Status + '</td>';
                        str += ' <td id="ExpRenewalNotes' + indexCount + '" style="display:none;">' + item.RenewalNotes + '</td>';
                        str += '  <td id="ExpRenewalConfirmParticipants' + indexCount + '" style="display:none;"> ' + (item.RenewalConfirmParticipants == "" ? '-' : item.RenewalConfirmParticipants) + ' </td>';
                        str += ' <td id="ExpRenewedOn' + indexCount + '" style="display:none;">' + (item.RenewedOn != null ? moment(new Date(item.RenewedOn)).utc().format('MM/DD/YYYY') : "-") + '</td>';
                        var fRenewedDisplay = "";
                        if (item.RenewedOn != null) {
                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                                fRenewedDisplay = moment(new Date(item.RenewedOn)).utc().format('MM/DD/YYYY');
                            }
                            else {
                                fRenewedDisplay = moment(new Date(item.RenewedOn)).utc().format(localStorage.AppDateFormat);
                            }
                        }
                        else {
                            fRenewedDisplay = "-";
                        }
                        str += ' <td id="ExpRenewedOnDisplay' + indexCount + '">' + (fRenewedDisplay != null ? fRenewedDisplay : "-") + '</td>';
                        str += ' <td id="ExpRenewedBy' + indexCount + '">' + (item.RenewedBy == "" ? '-' : item.RenewedBy) + '</td>';
                        str += '      <td id="ExpRenewalChecklist' + indexCount + '" style="display:none;">' + item.RenewalChecklist + '</td>';
                        str += '  <td id="ExpRenewalNotificationInternal' + indexCount + '" style="display:none;">' + item.RenewalNotificationInternal + '</td>';
                        str += '  <td id="ExpRenewalConfirmParticipantsXML' + indexCount + '" style="display:none;">' + item.RenewalConfirmParticipantsXML + '</td>';
                        str += '  <td id="ExpContractTermEach' + indexCount + '" style="display:none;">' + item.ContractTermEach + '</td>';
                        str += '  <td id="ExpRenewalType' + indexCount + '" style="display:none;">' + item.RenewalType + '</td>';
                        str += ' <td id="ExpContractTermChoicesEach' + indexCount + '" style="display:none;">' + item.ContractTermChoicesEach + '</td>';
                        str += '     <td id="ExpCreatedBy' + indexCount + '" style="display:none;">' + item.CreatedBy + '</td>';
                        str += '    <td id="ExpModifiedBy' + indexCount + '" style="display:none;">' + item.ModifiedBy + '</td>';
                        str += '<td id="ExpCreated' + indexCount + '" style="display:none;">' + item.Created + '</td>';
                        str += '        <td id="ExpModified' + indexCount + '" style="display:none;">' + item.Modified + '</td>';
                        str += '        <td id="ExpRenewalCommentsXML' + indexCount + '" style="display:none;">' + item.RenewalCommentsXML + '</td>';
                        str += '</tr>';
                    }
                    else {
                        if (item.RenewableTermName != "Initial Term")
                            indexCount = parseInt(item.RenewableTermName.replace("Renewal ", "")) + 1;

                        str += '  <tr id="renewalViewHistoryTerm' + indexCount + '">';
                        str += ' <td id="RenewableTermName' + indexCount + '">' + item.RenewableTermName + '<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="' + vAction + ' margin-left-5"></td>';
                        if (item.RenewedDate != null) {
                            var fStartDate = "";
                            var fStartDateDisplay = "";
                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                                fStartDateDisplay = moment(new Date(item.RenewedDate)).utc().format('MM/DD/YYYY');
                            }
                            else {
                                fStartDateDisplay = moment(new Date(item.RenewedDate)).utc().format(localStorage.AppDateFormat);
                            }
                            fStartDate = moment(new Date(item.RenewedDate)).utc().format('MM/DD/YYYY');
                            str += ' <td id="RenewedDate' + indexCount + '" style="display:none;">' + fStartDate + '</td>';
                            str += ' <td id="RenewedDateDisplay' + indexCount + '" >' + fStartDateDisplay + '</td>';
                        } else {
                            str += ' <td id="RenewedDate' + indexCount + '" style="display:none;"></td>';
                            str += ' <td id="RenewedDateDisplay' + indexCount + '" ></td>';
                        }
                        if (item.TermEndDate != null) {
                            var fRenewedDate = "";
                            var fRenewedDateDisplay = "";
                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                                fRenewedDateDisplay = moment(new Date(item.TermEndDate)).utc().format('MM/DD/YYYY');
                            }
                            else {
                                fRenewedDateDisplay = moment(new Date(item.TermEndDate)).utc().format(localStorage.AppDateFormat);
                            }
                            fRenewedDate = moment(new Date(item.TermEndDate)).utc().format('MM/DD/YYYY');
                            str += ' <td id="TermEndDate' + indexCount + '" style="display:none;">' + fRenewedDate + '</td>';
                            str += ' <td id="TermEndDateDisplay' + indexCount + '" >' + fRenewedDateDisplay + '</td>';
                        } else {
                            str += ' <td id="TermEndDate' + indexCount + '" style="display:none;"></td>';
                            str += ' <td id="TermEndDateDisplay' + indexCount + '" ></td>';
                        }

                        if (item.TermStatus == "Current")
                            str += '  <td id="TermStatus' + indexCount + '"><b title="Current" class="status_green" style="padding: 5px 0px; color:#fff;display: inline-block;width: 88px;vertical-align: middle;text-align: center;height: 15px;">' + item.TermStatus + '<img src="../Content/Images/down_arrow.png" style="width: 8px;margin-top: 4px !important;"  alt="Open Menu" title="Open Menu" class="' + vActionStatus + ' edithide margin-left-5"></b></td>';
                        else if (item.TermStatus == "Ended")
                            str += '  <td id="TermStatus' + indexCount + '"><b title="Ended" class="status_Gray" style="padding: 5px 0px; color:#fff;display: inline-block;width: 88px;vertical-align: middle;text-align: center;height: 15px;">' + item.TermStatus + '</b></td>';
                        else if (item.TermStatus == "Expired") {
                            if (TermEndDate != "") {
                                var dateEnd = new Date(TermEndDate);
                                if (todaydate <= dateEnd) {
                                    if (vActionStatus != "")
                                        str += '  <td id="TermStatus' + indexCount + '"><b title="Expired" class="status_red" style="padding: 5px 0px; color:#fff;display: inline-block;width: 88px;vertical-align: middle;text-align: center;height: 15px;">' + item.TermStatus + '<img src="../Content/Images/down_arrow.png" style="width: 8px;margin-top: 4px !important;" alt="Open Menu" title="Open Menu" class="' + vActionStatus + ' edithide margin-left-5"></b></td>';
                                    else
                                        str += '  <td id="TermStatus' + indexCount + '"><b title="Expired" class="status_red" style="padding: 5px 0px; color:#fff;display: inline-block;width: 88px;vertical-align: middle;text-align: center;height: 15px;">' + item.TermStatus + '</b></td>';
                                }
                                else
                                    str += '  <td id="TermStatus' + indexCount + '"><b title="Expired" class="status_red" style="padding: 5px 0px; color:#fff;display: inline-block;width: 88px;vertical-align: middle;text-align: center;height: 15px;">' + item.TermStatus + '</b></td>';
                            }
                            else {
                                str += '  <td id="TermStatus' + indexCount + '"><b title="Expired" class="status_red" style="padding: 5px 0px; color:#fff;display: inline-block;width: 88px;vertical-align: middle;text-align: center;height: 15px;">' + item.TermStatus + '</b></td>';
                            }

                        }
                        else if (item.TermStatus == "Not Started")
                            str += '  <td id="TermStatus' + indexCount + '"><b title="Not Started" class="status_blue" style="padding: 5px 0px; color:#fff;display: inline-block;width: 88px;vertical-align: middle;text-align: center;height: 15px;">' + item.TermStatus + '</b></td>';
                        else
                            str += '  <td id="TermStatus' + indexCount + '"><b title="Current" class="" style="padding: 5px 0px; color:;display: inline-block;width: 88px;vertical-align: middle;text-align: center;height: 15px;">' + item.TermStatus + '</b></td>';
                        str += ' <td id="Status' + indexCount + '" style="display:none;">' + item.Status + '</td>';
                        str += ' <td id="RenewalNotes' + indexCount + '" style="display:none;">' + item.RenewalNotes + '</td>';
                        str += '  <td id="RenewalConfirmParticipants' + indexCount + '" style="display:none;"> ' + (item.RenewalConfirmParticipants == "" ? '-' : item.RenewalConfirmParticipants) + ' </td>';
                        str += ' <td id="RenewedOn' + indexCount + '" style="display:none;">' + (item.RenewedOn != null ? moment(new Date(item.RenewedOn)).utc().format('MM/DD/YYYY') : "-") + '</td>';
                        var fRenewedDisplay = "";
                        if (item.RenewedOn != null) {
                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                                fRenewedDisplay = moment(new Date(item.RenewedOn)).utc().format('MM/DD/YYYY');
                            }
                            else {
                                fRenewedDisplay = moment(new Date(item.RenewedOn)).utc().format(localStorage.AppDateFormat);
                            }
                        }
                        else {
                            fRenewedDisplay = "-";
                        }
                        str += ' <td id="RenewedOnDisplay' + indexCount + '">' + (fRenewedDisplay != null ? fRenewedDisplay : "-") + '</td>';
                        str += ' <td id="RenewedBy' + indexCount + '">' + (item.RenewedBy == "" ? '-' : item.RenewedBy) + '</td>';
                        str += '      <td id="RenewalChecklist' + indexCount + '" style="display:none;">' + item.RenewalChecklist + '</td>';
                        str += '  <td id="RenewalNotificationInternal' + indexCount + '" style="display:none;">' + item.RenewalNotificationInternal + '</td>';
                        str += '  <td id="RenewalConfirmParticipantsXML' + indexCount + '" style="display:none;">' + item.RenewalConfirmParticipantsXML + '</td>';
                        str += '  <td id="ContractTermEach' + indexCount + '" style="display:none;">' + item.ContractTermEach + '</td>';
                        str += '  <td id="RenewalType' + indexCount + '" style="display:none;">' + item.RenewalType + '</td>';
                        str += ' <td id="ContractTermChoicesEach' + indexCount + '" style="display:none;">' + item.ContractTermChoicesEach + '</td>';
                        str += '     <td id="CreatedBy' + indexCount + '" style="display:none;">' + item.CreatedBy + '</td>';
                        str += '    <td id="ModifiedBy' + indexCount + '" style="display:none;">' + item.ModifiedBy + '</td>';
                        str += '<td id="Created' + indexCount + '" style="display:none;">' + item.Created + '</td>';
                        str += '        <td id="Modified' + indexCount + '" style="display:none;">' + item.Modified + '</td>';
                        str += '        <td id="RenewalCommentsXML' + indexCount + '" style="display:none;">' + item.RenewalCommentsXML + '</td>';
                        str += '</tr>';
                    }

                });
                if (str != '')
                    $("#renewalViewHistoryTerm").append(str);
                else
                    $("#renewalViewHistoryTerm").append('No History found.');


                var TermNameLast = $("#renewalViewHistoryTerm tr:not(.termExpired):last td:first").text();
                if (TermNameLast != "Initial Term") {
                    var countTerm = TermNameLast.replace("Renewal ", "");
                    //$("#AddRenewalTerm").text("+Add Renewal " + (parseInt(countTerm) + 1));
                    $("#ddlTermPeriodSetRenewal").find("option").show();
                    if ((parseInt(countTerm)) <= 15)
                        $("#ddlTermPeriodSetRenewal").find("option:lt(" + (parseInt(countTerm)) + ")").hide();
                    else
                        $("#ddlTermPeriodSetRenewal").find("option:lt(15)").hide();
                    if (contrcatItem.AutoContractRenewTermCount == "")
                        $("#ddlTermPeriodSetRenewal").prop('selectedIndex', (parseInt(countTerm)));
                    else {
                        var elmop = $("#ddlTermPeriodSetRenewal option[value='" + contrcatItem.AutoContractRenewTermCount + "']");
                        if ($(elmop).length > 0 && $(elmop).css('display') != 'none') {
                            $("#ddlTermPeriodSetRenewal").val(contrcatItem.AutoContractRenewTermCount);
                        }
                        else {
                            $("select#ddlTermPeriodSetRenewal").prop('selectedIndex', (parseInt(countTerm) <= 15 ? parseInt(countTerm) : 15));
                        }
                    }
                }
                else {
                    //$("#AddRenewalTerm").text("+Add Renewal 1");
                    if (contrcatItem.AutoContractRenewTermCount != "") {
                        if ($("#ddlTermPeriodSetRenewal option[value='" + contrcatItem.AutoContractRenewTermCount + "']").length > 0 && !($("#ddlTermPeriodSetRenewal option[value='" + contrcatItem.AutoContractRenewTermCount + "']").css('display') == "none"))
                            $("#ddlTermPeriodSetRenewal").val(contrcatItem.AutoContractRenewTermCount);
                    }
                    else
                        $("#ddlTermPeriodSetRenewal").val("Unlimited")
                    $("#ddlTermPeriodSetRenewal").find("option").show();
                }
                if (NextTermRenewFlag && RenewalTermName != "" && RenewalTermName != "Initial Term") {
                    RenewalName = RenewalTermName;
                    var RenewIndex = RenewalName.replace("Renewal ", "");
                    if ($("#RenewedOn" + (parseInt(RenewIndex) + 1)).text() == "" || $("#RenewedOn" + (parseInt(RenewIndex) + 1)).text() == "-") {
                        var html = $("#RenewTerm").html();
                        $("#RenewedOnDisplay" + (parseInt(RenewIndex) + 1)).html(html);
                    }
                    if ($(':input[type=radio][name=RenewalConfirmAuto]:checked').val() == "Yes") {
                        $(".ManRenewal").css('display', 'none');
                        $(".autoRenewal").css('display', 'none');
                        // $("#RenewTerm").css('display', '');
                    }

                    else {
                        $(".ManRenewal").css('display', '');
                        $(".autoRenewal").css('display', '');
                    }
                }
                else {
                    // $("#RenewTerm").text('');
                    // $("#RenewTerm").css('display', 'none');
                }
            }
            if (expireFlag) {
                $("#AddRenewalTerm").css("display", "none");
                // $("#RenewTerm").css('display', 'none');
                $("#ddlTermPeriodSetRenewal").find("option").show();
                $("#trContractTermRenewal").css("display", "none");
                $("#trContractTermRenewalSec").css("display", "none");
            }
            $(".openmenuRenewalAll").contextMenu({
                menu: 'menuRenewalAll', leftButton: true
            }, function (action, el, pos) {
                contextMenuRenewal(action, el.parent("td").parent("tr"), pos);
            });
            $(".openmenuRenewalDel").contextMenu({
                menu: 'menuRenewalDel', leftButton: true
            }, function (action, el, pos) {
                contextMenuRenewal(action, el.parent("td").parent("tr"), pos);
            });

            $(".openmenuRenewalDelNew").contextMenu({
                menu: 'menuRenewalDelNew', leftButton: true
            }, function (action, el, pos) {
                contextMenuRenewal(action, el.parent("td").parent("tr"), pos);
            });

            $(".openmenuRenewalExp").contextMenu({
                menu: 'menuRenewalExp', leftButton: true
            }, function (action, el, pos) {
                contextMenuRenewal(action, el.parent("b").parent("td").parent("tr"), pos);
            });
            $(".openmenuRenewalCur").contextMenu({
                menu: 'menuRenewalCur', leftButton: true
            }, function (action, el, pos) {
                contextMenuRenewal(action, el.parent("b").parent("td").parent("tr"), pos);
            });
        },
        error:
function (data) {
    $("#hdCurrentTermName").val('');
    $("#hdCurrentRenewalTermStart").val('');
    $("#hdCurrentRenewalTermEnd").val('').trigger('change');
    $("#renewalViewHistoryTerm").empty();
    $("#renewalViewHistoryTerm").append('No History found.');
}
    });
}

function AddRenewalTerm(isMultiple, isRenew) {
    $(".validelement").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });
    RenewalAddFlag = true;
    var length = $("#renewalViewHistoryTerm tr").length;
    $("#txtRenewStartDate").prop('disabled', false);
    $("#txtRenewStartDate").addClass('form-contro-Date');
    $("#txtRenewStartDate").removeClass('form-contro-NoDate');
    $('input[type="radio"][name="rdRenewTermEndDate"][value="EndDate"]').prop('disabled', false);
    $('input[type="radio"][name="rdRenewTermEndDate"][value="Term"]').prop('disabled', false);
    GetValuesAndAutoPopulate("ddlRenewalNotfInternalNew", "");
    $("#txtRenewalNotesNew").val('');
    $("#rdRenewTermEndDate").val('');
    $('input[type="radio"][name="rdRenewTermEndDate"][value="Term"]').prop('checked', true);
    $("#ContractTermRenewNew").val(1);
    $("#ContractTermRenewChoicesNew").val('days');
    $("#txtRenewStatus").html('<b title="Not Started" class="" style="padding: 5px 0px; display: inline-block;width: 88px;vertical-align: middle;text-align: left;height: 15px;">Not Started</b>');

    if (!isMultiple) {
        $('input[type="checkbox"][name="checkboxNotifyNew"]').prop('checked', false);
        $('input[type="radio"][name="TermsSingleMultiple"][value="Yes"]').prop('checked', true);
        $(".trSingle").css('display', '');
        $(".trMultiple").css('display', 'none');
        $('#txtRenewStartDate').datepicker('destroy');
        $('#txtRenewStartDate').datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: DatepickerFormat,
            onSelect: function (selected) {
                var dt2 = $('#txtRenewEndDate');
                var startDate = $(this).datepicker('getDate');
                startDate.setDate(startDate.getDate() + 1);
                dt2.datepicker('option', 'minDate', startDate);
                calculateenddateRenew('txtRenewStartDate', 'ContractTermRenewChoicesNew', 'ContractTermRenewNew', 'txtRenewEndDate');
            }
        }).click(function () {
            $(this).focus()
        });

        $("#RenewalTermNew").dialog("option", "title", "Add New Term(s)");
        $("#btnAddNewTerm").html('<span class="pop_up_Content_Green">Ok</span>');
        isRenewTermClick = false;
        $("#RenewalTermNew").dialog("open");
    }
    else {
        $(".trSingle").css('display', 'none');
        $(".trMultiple").css('display', '');
        $('#txtRenewStartDate').datepicker('destroy');
        $('#txtRenewStartDate').datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: DatepickerFormat,
            onSelect: function (selected) {
                var dt2 = $('#txtRenewEndDate');
                var startDate = $(this).datepicker('getDate');
                startDate.setDate(startDate.getDate() + 1);
                dt2.datepicker('option', 'minDate', startDate);
                calculateenddateRenew('txtRenewStartDate', 'ddlTermPeriodSetMulti', 'txtContractTermRenewSetMulti', 'txtRenewEndDate');
            }
        }).click(function () {
            $(this).focus()
        });

    }
    if (length != 0) {
        var lastStatus = $('#renewalViewHistoryTerm tr:last').find('td:eq(5)').text();
        var el = '', TermNameLast = '';
        if (lastStatus != "Expired") {
            el = $('#renewalViewHistoryTerm tr:last').find('td:eq(3)');
            TermNameLast = $("#renewalViewHistoryTerm tr:last td:first").text();
        }
        else {
            el = $('#renewalViewHistoryTerm tr').find('td:contains(Expired)').first().parent().prev().find('td:eq(3)');
            TermNameLast = $('#renewalViewHistoryTerm tr').find('td:contains(Expired)').first().parent().prev().find('td:first').text();
        }
        //var el = $('#renewalViewHistoryTerm tr:last').find('td:eq(3)');
        //var TermNameLast = $("#renewalViewHistoryTerm tr:last td:first").text();
        var countTerm = TermNameLast.replace("Renewal ", "");
        var valdate = el != null && typeof (el) != "undefined" ? $(el).text() : "";
        if (valdate != "") {
            var parts = valdate.split("/");
            var lastdate = new Date(parts[2], parts[0] - 1, parts[1]);
            renewalPrevDate = new Date(lastdate.setDate(lastdate.getDate() + 1));
            var temend = new Date(renewalPrevDate);
            $("#txtRenewStartDate").datepicker("option", "minDate", renewalPrevDate);
            $("#txtRenewStartDate").datepicker("setDate", renewalPrevDate);
            $("#txtRenewEndDate").datepicker("option", "minDate", new Date(temend.setDate(temend.getDate() + 1)));
        }
        else {
            $("#txtRenewStartDate").datepicker("option", "minDate", null);
            $("#txtRenewEndDate").datepicker("option", "minDate", null);
            $("#txtRenewStartDate").val('');
            $("#txtRenewEndDate").val('');
        }

        if (TermNameLast == "Initial Term") {
            $("#tdNameofTerms").html("Renewal 1");
            $("#ddlTermPeriodSetRenewal").val('Renewal 1');
        }
        else {
            $("#tdNameofTerms").html("Renewal " + (parseInt(countTerm) + 1));
            $("#ddlTermPeriodSetRenewal").val("Renewal " + (parseInt(countTerm) + 1));
        }

        if (!isRenew) {
            $("#SendRenewalNotificationNew").css("display", "none");
            $("#RenewalChecklistNew").css("display", "none");
        }
        else {
            $("#SendRenewalNotificationNew").css("display", "");
            $("#RenewalChecklistNew").css("display", "");
        }
    }
    else {

        $("#txtRenewStartDate").datepicker("option", "minDate", null);
        $("#txtRenewEndDate").datepicker("option", "minDate", null);

        $("#txtRenewStartDate").val('');
        $("#txtRenewEndDate").val('');
        if (!isRenew) {
            $("#SendRenewalNotificationNew").css("display", "none");
            $("#RenewalChecklistNew").css("display", "none");
        }
        else {
            $("#SendRenewalNotificationNew").css("display", "");
            $("#RenewalChecklistNew").css("display", "");
        }
        if (isMultiple) {
            $("#tdNameofTerms").html('Initial Term, Renewal 1');
        }
        else
            $("#tdNameofTerms").html('Initial Term');
        $("#ddlTermPeriodSetRenewal").val('Renewal 1');
    }
    $("#txtRenewStartDate").datepicker("option", "maxDate", null);
    $("#txtRenewEndDate").datepicker("option", "maxDate", null);
    EnableContractTermRenewEndChoice(false, isMultiple);
    $("#trNumberOfTerms").css('display', '');

}
function RenewTerm(item) {
    checkAwaitingAuthrization(item);
}
function checkAwaitingAuthrization(item) {
    IsRenewfromTerm = false;
    var participant = "";
    var article = "";
    var status = "";
    $('#AwaitingAuthorisationUL').html('');
    if (contractItem.RenewalConfirmParticipants != "" && contractItem.RenewalConfirmParticipants != null) {
        if (contractItem.RenewalConfirmParticipantsXML !== "" && contractItem.RenewalConfirmParticipantsXML !== null) {


            if (contractItem.RenewalConfirmParticipants.indexOf(';') > -1) {
                participant = contractItem.RenewalConfirmParticipants.split(';');
                $(participant).each(function (i, arritem) {
                    if (ConfirmParticipationCollection != null) {
                        $(ConfirmParticipationCollection).each(function (i, item) {
                            if (item.Participation.trim() == arritem.trim()) {
                                status = item.status;
                                if (status != "Renewed" && status != "Rejected") {
                                    article += '<li style="padding-left: 10px;padding-top: 5px;color:#000000"><img src="/Content/Images/icon/profile.png" style="cursor:default;padding-right: 5px;">  ' + arritem + '</li>';
                                }
                            }
                        });
                    }

                });
            }
            else {
                var authName = "";
                var authStatus = "";
                $(contractItem.RenewalConfirmParticipantsXML).find('participant').each(function () {
                    authName = $(this).find('name').text();
                    authStatus = $(this).find('status').text();
                });
                if (authStatus != "Renewed" && authStatus != "Rejected") {
                    article += '<li style="padding-left: 10px;padding-top: 5px;color:#000000"><img src="/Content/Images/icon/profile.png" style="cursor:default;padding-right: 5px;">  ' + contractItem.RenewalConfirmParticipants + '</li>';
                }
            }
        }
        else {
            if (contractItem.RenewalConfirmParticipants.indexOf(';') > -1) {
                var Conparticipant = contractItem.RenewalConfirmParticipants.split(';');
                $(Conparticipant).each(function (i, arritem) {
                    article += '<li style="padding-left: 10px;padding-top: 5px;color:#000000"><img src="/Content/Images/icon/profile.png" style="cursor:default;padding-right: 5px;">  ' + arritem + '</li>';
                });
            }
            else {
                article += '<li style="padding-left: 10px;padding-top: 5px;color:#000000"><img src="/Content/Images/icon/profile.png" style="cursor:default;padding-right: 5px;">  ' + contractItem.RenewalConfirmParticipants + '</li>';
            }
        }
        if (article == "") {
            openTermForRenew(item);
            //RenewInTermPopup();
        }
        else {
            renewAuthName = $(item).parent().parent().children()[0].textContent;
            IsRenewfromTerm = true;
            $('#AwaitingAuthorisationUL').append(article);
            $("#browseAwaitingAuthorisation").dialog("option", "title", "Alert");
            $("#browseAwaitingAuthorisation").dialog("open");
        }

    }
    else {
        openTermForRenew(item);
        //RenewInTermPopup();
    }

}
var isRenewTermClick = false;
function openTermForRenew(item) {
    $(".validelement").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });

    var renewItem = renewAuthName == "" ? $(item).parent().parent().children()[0].textContent : renewAuthName;
    renewAuthName = "";
    //Sridhar
    $('input[type="radio"][name="TermsSingleMultiple"][value="Yes"]').prop('checked', true);
    $(".trSingle").css('display', '');
    $(".trMultiple").css('display', 'none');
    $("#trNumberOfTerms").css('display', 'none');
    //Sridhar

    var tbrowcount = parseInt(renewItem.replace("Renewal", "")) + 1;
    var TermNameLast = $("#renewalViewHistoryTerm tr:last td:first").text();
    var term = $("#RenewableTermName" + tbrowcount).text();
    $("#tdNameofTerms").html(term);
    $("#txtRenewStartDate").prop('disabled', false);
    $("#txtRenewStartDate").addClass('form-contro-Date');
    $("#txtRenewStartDate").removeClass('form-contro-NoDate');
    $('input[type="radio"][name="rdRenewTermEndDate"][value="EndDate"]').prop('disabled', false);
    $('input[type="radio"][name="rdRenewTermEndDate"][value="Term"]').prop('disabled', false);
    //manoj
    if ($("#ContractTermEach" + tbrowcount).text() == "") {
        $("#ContractTermRenewNew").val('');
        $("#ContractTermRenewChoicesNew").val('years');
    }
    else {
        $("#ContractTermRenewNew").val($("#ContractTermEach" + tbrowcount).text());
        $("#ContractTermRenewChoicesNew").val($("#ContractTermChoicesEach" + tbrowcount).text());
    }
    //manoj

    if (term == "Initial Term") {

        $("#RenewalChecklistNew").css("display", "");
        $("#SendRenewalNotificationNew").css("display", "");
        GetValuesAndAutoPopulate("ddlRenewalNotfInternalNew", "");
        $('input[type="checkbox"][name="checkboxNotifyNew"]').prop('checked', false);

        if (term != TermNameLast) {
            var tempdateStart = ($("#RenewedDate" + (parseInt(tbrowcount) + 1)) != null && typeof ($("#RenewedDate" + (parseInt(tbrowcount) + 1))) != "undefined") ? ($("#RenewedDate" + (parseInt(tbrowcount) + 1)).text() == "" ? null : new Date($("#RenewedDate" + (parseInt(tbrowcount) + 1)).text())) : null;
            var tempdateStartthis = new Date($("#RenewedDate" + tbrowcount).text() == "" ? "" : $("#RenewedDate" + tbrowcount).text());
            $("#txtRenewStartDate").datepicker("option", "maxDate", (tempdateStart != null ? new Date(tempdateStart.setDate(tempdateStart.getDate() - 1)) : null));
            $("#txtRenewEndDate").datepicker("option", "maxDate", tempdateStart);
            $("#txtRenewEndDate").datepicker("option", "minDate", (tempdateStartthis != null ? new Date(tempdateStartthis.setDate(tempdateStartthis.getDate() - 1)) : null));
            $("#txtRenewStartDate").datepicker("option", "minDate", null);
            EndDateCheckRenewal = new Date($("#TermEndDate" + tbrowcount).text() == "" ? "" : $("#TermEndDate" + tbrowcount).text());
        }
        else {
            var tempdateStartthis = new Date($("#RenewedDate" + tbrowcount).text() == "" ? "" : $("#RenewedDate" + tbrowcount).text());
            $("#txtRenewStartDate").datepicker("option", "maxDate", null);
            $("#txtRenewEndDate").datepicker("option", "maxDate", null);
            $("#txtRenewEndDate").datepicker("option", "minDate", (tempdateStartthis != null ? new Date(tempdateStartthis.setDate(tempdateStartthis.getDate() + 1)) : null));
            $("#txtRenewStartDate").datepicker("option", "minDate", null);
            EndDateCheckRenewal = "";
        }
    }
    else {
        if (term == TermNameLast) {
            var tempdateEnd = ($("#TermEndDate" + (parseInt(tbrowcount) - 1)) != null && typeof ($("#TermEndDate" + (parseInt(tbrowcount) - 1))) != "undefined") ? ($("#TermEndDate" + (parseInt(tbrowcount) - 1)).text() == "" ? null : new Date($("#TermEndDate" + (parseInt(tbrowcount) - 1)).text())) : null;
            var tempdateStart = ($("#RenewedDate" + (parseInt(tbrowcount) + 1)) != null && typeof ($("#RenewedDate" + (parseInt(tbrowcount) + 1))) != "undefined") ? ($("#RenewedDate" + (parseInt(tbrowcount) + 1)).text() == "" ? null : new Date($("#RenewedDate" + (parseInt(tbrowcount) + 1)).text())) : null;
            var tempdateStartthis = new Date($("#RenewedDate" + tbrowcount).text() == "" ? "" : $("#RenewedDate" + tbrowcount).text());
            var tempdateEndthis = new Date($("#TermEndDate" + tbrowcount).text() == "" ? "" : $("#TermEndDate" + tbrowcount).text());
            var temp1 = (tempdateEnd != null ? new Date(tempdateEnd.setDate(tempdateEnd.getDate() + 1)) : null);
            var temp2 = (tempdateStart != null ? new Date(tempdateStart.setDate(tempdateStart.getDate() - 1)) : null);
            var temp3 = (tempdateStartthis != null ? new Date(tempdateStartthis.setDate(tempdateStartthis.getDate() + 1)) : null)
            $("#txtRenewStartDate").datepicker("option", "minDate", temp1);
            $("#txtRenewStartDate").datepicker("option", "maxDate", temp2);
            $("#txtRenewEndDate").datepicker("option", "minDate", temp3);
            $("#txtRenewEndDate").datepicker("option", "maxDate", null);
            EndDateCheckRenewal = "";
        }
        else {
            var tempdateEnd = ($("#TermEndDate" + (parseInt(tbrowcount) - 1)) != null && typeof ($("#TermEndDate" + (parseInt(tbrowcount) - 1))) != "undefined") ? ($("#TermEndDate" + (parseInt(tbrowcount) - 1)).text() == "" ? null : new Date($("#TermEndDate" + (parseInt(tbrowcount) - 1)).text())) : null;
            var tempdateStart = ($("#RenewedDate" + (parseInt(tbrowcount) + 1)) != null && typeof ($("#RenewedDate" + (parseInt(tbrowcount) + 1))) != "undefined") ? ($("#RenewedDate" + (parseInt(tbrowcount) + 1)).text() == "" ? null : new Date($("#RenewedDate" + (parseInt(tbrowcount) + 1)).text())) : null;
            var tempdateStartthis = new Date($("#RenewedDate" + tbrowcount).text() == "" ? "" : $("#RenewedDate" + tbrowcount).text());
            var tempdateEndthis = new Date($("#TermEndDate" + tbrowcount).text() == "" ? "" : $("#TermEndDate" + tbrowcount).text());
            var temp1 = (tempdateEnd != null ? new Date(tempdateEnd.setDate(tempdateEnd.getDate() + 1)) : null);
            var temp2 = (tempdateStart != null ? new Date(tempdateStart) : null);
            if (temp2 != null)
                temp2 = new Date(temp2.setDate(temp2.getDate() - 1));
            var temp3 = (tempdateStartthis != null ? new Date(tempdateStartthis.setDate(tempdateStartthis.getDate() + 1)) : null)
            var temp4 = (tempdateStart != null ? new Date(tempdateStart) : null);
            if (temp4 != null)
                temp4 = new Date(temp4.setDate(tempdateStart.getDate() - 1));
            $("#txtRenewStartDate").datepicker("option", "minDate", temp1);
            $("#txtRenewStartDate").datepicker("option", "maxDate", temp2);
            $("#txtRenewEndDate").datepicker("option", "minDate", temp3);
            $("#txtRenewEndDate").datepicker("option", "maxDate", temp4);
            EndDateCheckRenewal = new Date($("#TermEndDate" + tbrowcount).text() == "" ? "" : $("#TermEndDate" + tbrowcount).text());
        }
        $("#RenewalChecklistNew").css("display", "");
        $("#SendRenewalNotificationNew").css("display", "");
    }

    $("#txtRenewStartDate").val($.datepicker.formatDate(DatepickerFormat, new Date($("#RenewedDate" + tbrowcount).text() == "" ? "" : $("#RenewedDate" + tbrowcount).text())));

    if ($("#ContractTermEach" + tbrowcount).text() == "") {
        $("#ContractTermRenewChoicesNew").prop('disabled', true);
        $("#ContractTermRenewNew").prop('disabled', true);
        $("#ContractTermRenewNew").val('');
        $("#ContractTermRenewChoicesNew").val('years');
        $("#txtRenewEndDate").prop('disabled', true);
        $("#txtRenewStartDate").prop('disabled', true);
        $("#txtRenewEndDate").addClass('form-contro-Date');
        $("#txtRenewEndDate").removeClass('form-contro-NoDate');

        $('input[type="radio"][name="rdRenewTermEndDate"][value="EndDate"]').prop('checked', true);
        $("#txtRenewEndDate").val($.datepicker.formatDate(DatepickerFormat, new Date($("#TermEndDate" + tbrowcount).text() == "" ? "" : $("#TermEndDate" + tbrowcount).text())));
    }
    else {
        $("#ContractTermRenewChoicesNew").prop('disabled', true);
        $("#ContractTermRenewNew").prop('disabled', true);
        $("#ContractTermRenewNew").val($("#ContractTermEach" + tbrowcount).text());
        $("#ContractTermRenewChoicesNew").val($("#ContractTermChoicesEach" + tbrowcount).text());
        $("#txtRenewEndDate").prop('disabled', true);
        $("#txtRenewStartDate").prop('disabled', true);
        $("#txtRenewEndDate").removeClass('form-contro-Date');
        $("#txtRenewEndDate").addClass('form-contro-NoDate');


        $('input[type="radio"][name="rdRenewTermEndDate"][value="Term"]').prop('checked', true);
        calculateenddateRenew('txtRenewStartDate', 'ContractTermRenewChoicesNew', 'ContractTermRenewNew', 'txtRenewEndDate');
    }
    $("#txtRenewStatus").html(($("#TermStatus" + tbrowcount).html() == "" ? "" : $("#TermStatus" + tbrowcount).html()));
    $("#txtRenewalNotesNew").val(($("#RenewalNotes" + tbrowcount).text() == "" ? "" : $("#RenewalNotes" + tbrowcount).text()));
    GetValuesAndAutoPopulate("ddlRenewalNotfInternalNew", ($("#RenewalNotificationInternal" + tbrowcount).text() == "" ? "" : $("#RenewalNotificationInternal" + tbrowcount).text()));
    //GetValuesAndAutoPopulate("ddlAuthorizedBy", ($("#RenewalConfirmParticipants" + tbrowcount).text() == "" ? "-" : $("#RenewalConfirmParticipants" + tbrowcount).text()));
    //GetValuesAndAutoPopulate("ddlRenewedBy", ($("#RenewedBy" + tbrowcount).text() == "" ? "-" : $("#RenewedBy" + tbrowcount).text()));
    $("#txtAuthorizRequired").val(($("#RequiresAuth" + tbrowcount).text() == "" ? "No" : $("#RequiresAuth" + tbrowcount).text()));
    var CheckList = ($("#RenewalChecklist" + tbrowcount).text() == "" ? "-" : $("#RenewalChecklist" + tbrowcount).text());
    if (CheckList != "" && CheckList != null && typeof (CheckList) != "undefined") {
        var splitchecklt = CheckList.split(';');
        $(splitchecklt).each(function (i, item) {
            var valcheck = item.trim();
            if (valcheck != "") {
                $(':input[type=checkbox][value="' + valcheck + '"]').prop('checked', true);
            }
        });
    }
    RenewalItemEdit = term;
    isRenewTermClick = true;
    $("#termNotesComments").html('Comments');
    $("#btnAddNewTerm").html('<span class="pop_up_Content_Green">Renew</span>');
    $("#RenewalTermNew").dialog("option", "title", term);
    $("#RenewalTermNew").dialog("open");
}
function RenewInTermPopup() {
    var term = (RenewalName != null && RenewalName != "" && typeof (RenewalName) != "undefined") ? RenewalName : "";
    if (term != "") {
        var indexedit = term.replace("Renewal ", "");
        indexedit = parseInt(indexedit) + 1;
        $('#Status' + indexedit).text("Renewed");
        //Sridhar
        isRenewedManual = "Yes";
        $('#RenewedBy' + indexedit).text(localStorage.UserName);
        $('#RenewalType' + indexedit).text("Manual");
        $('#RenewedOn' + indexedit).text($.datepicker.formatDate('mm/dd/yy', new Date()));
        var fRenewedDisplay = "";
        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
            fRenewedDisplay = moment(new Date()).format('MM/DD/YYYY');
        }
        else {
            fRenewedDisplay = moment(new Date()).format(localStorage.AppDateFormat);
        }
        $('#RenewedOnDisplay' + indexedit).text(fRenewedDisplay);
        $('#Modified' + indexedit).text($.datepicker.formatDate('mm/dd/yy', new Date()));
        $('#ModifiedBy' + indexedit).text(localStorage.UserName);
        $('#RenewalNotes' + indexedit).text($("#txtRenewalNotesNew").val());
    }

    //$("#RenewTerm").css('display', 'none');
}
function SaveAsTableRow(TermName, isRenew) {
    if (requiredValidator("RenewalTermNew")) {

        var valcheckauth = $(':input[type=radio][name=TermsSingleMultiple]:checked').val();
        var vRenewalChecklist = "";
        if ($("#chkRenewalModificationsNew").is(':checked')) {
            if (vRenewalChecklist == '') {
                vRenewalChecklist = "Renewal without any modifications";
            }
            else {
                vRenewalChecklist += "; Renewal without any modifications";
            }
        }
        if ($("#chkRenewalPriceAdjustmentsNew").is(':checked')) {
            if (vRenewalChecklist == '') {
                vRenewalChecklist = "Renewal with Price Adjustments (minor)";
            }
            else {
                vRenewalChecklist += "; Renewal with Price Adjustments (minor)";
            }
        }
        if ($("#chkRenewalRepricingNew").is(':checked')) {
            if (vRenewalChecklist == '') {
                vRenewalChecklist = "Renewal with Repricing (major)";
            }
            else {
                vRenewalChecklist += "; Renewal with Repricing (major)";
            }
        }
        if ($("#chkRenewalOtherNew").is(':checked')) {
            if (vRenewalChecklist == '') {
                vRenewalChecklist = "Other Amendments";
            }
            else {
                vRenewalChecklist += "; Other Amendments";
            }
        }

        if (vRenewalChecklist == "" && isRenew) {
            swal("", "Select Renewal Checklist.");
            return false;
        }

        else {

            var vRenewalNotes = "";
            var vRenewalChecklistAmendments = "";
            var vRenewalNotificationInternal = "";
            var vRenewalNotificationExternal = "";
            vRenewalNotes = $("#txtRenewalNotesNew").val();
            vRenewalChecklistAmendments = "";
            var RenewalNotfInternal = $("#ddlRenewalNotfInternalNew").val();
            $(RenewalNotfInternal).each(function (i, item) {
                if (vRenewalNotificationInternal == '') {
                    vRenewalNotificationInternal = item;
                }
                else {
                    vRenewalNotificationInternal += "; " + item;
                }
            });



            var count = $("#renewalViewHistoryTerm tr").length;
            var vLastRow = $("#renewalViewHistoryTerm tr:not(.termExpired):last").attr('id');

            var totalFileCount = 1;
            if (typeof vLastRow == "undefined") {
                totalFileCount = 1;
            }
            else {
                totalFileCount = parseInt(vLastRow.replace("renewalViewHistoryTerm", ""));
                // totalFileCount += 1;
                totalFileCount = parseInt(totalFileCount) + 1;
            }
            var length = $("#renewalViewHistoryTerm tr").length;
            var TermStartDate = $.datepicker.formatDate('mm/dd/yy', $("#txtRenewStartDate").datepicker('getDate'));
            var TermEndDate = $.datepicker.formatDate('mm/dd/yy', $("#txtRenewEndDate").datepicker('getDate'));
            var TermRenewStatushtml = $("#txtRenewStatus").html();
            var TermRenewStatus = $("#txtRenewStatus").text();
            if (TermRenewStatus == "Current") {
                $("#hdCurrentTermName").val(TermName);
                $("#hdCurrentRenewalTermEnd").val(TermEndDate).trigger('change');
                $("#hdCurrentRenewalTermStart").val(TermStartDate);

            }

            var TermChoice = "";
            var TermDays = "";
            if ($(':input[type=radio][name=rdRenewTermEndDate]:checked').val() == "Term") {
                if (valcheckauth == "No") {
                    TermDays = $("#txtContractTermRenewSetMulti").val();
                    TermChoice = $("#ddlTermPeriodSetMulti").val();
                }
                else {
                    TermDays = $("#ContractTermRenewNew").val();
                    TermChoice = $("#ContractTermRenewChoicesNew").val();
                }
            }


            else {
                TermDays = "";
            }
            var vRenewedBy = '';
            var vRenewedType = '';
            var vStatus = '';
            var vRenewedOn = '';
            var newdate = new Date(TermStartDate);
            if (TermRenewStatus == "Current" || TermRenewStatus == "Ended") {
                vStatus = "Renewed";
                vRenewedBy = localStorage.UserName;
                vRenewedType = "Manual";
                vRenewedOn = $.datepicker.formatDate('mm/dd/yy', new Date(newdate.setDate(newdate.getDate() - 1)));
            }
            else if (TermRenewStatus == "Expired") {
                vStatus = "Expired";
                vRenewedBy = localStorage.UserName;
                vRenewedType = "Manual";
                vRenewedOn = "";
            }
            else {
                if (RenewBy != "" && RenewBy != "-") {
                    vRenewedBy = RenewBy
                    RenewBy = "";
                }
                else {
                    vRenewedBy = "";
                }
                vStatus = "";                
                vRenewedType = "";
                vRenewedOn = "";
            }
            if (TermName == "Initial Term") {
                vStatus = "";
                vRenewedBy = "";
                vRenewedType = "";
                vRenewedOn = "";
            }
            var vAction = "";
            var str = "";

            if (RenewalAddFlag) {
                if (TermRenewStatus == "Current")
                    vAction = "openmenuRenewalDel";
                else if (TermRenewStatus == "Ended") {
                    vAction = "openmenuRenewalDel";
                }
                else if (TermRenewStatus == "Expired") {
                    vAction = "openmenuRenewalDel";
                }
                else if (TermRenewStatus == "Not Started") {
                    vAction = "openmenuRenewalDel";
                }
                str += '<tr id="renewalViewHistoryTerm' + totalFileCount + '">';
                str += '<td id="RenewableTermName' + totalFileCount + '">' + TermName + '<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu"  class="' + vAction + ' margin-left-5"></td>';
                str += '<td id="RenewedDate' + totalFileCount + '" style="display:none;">' + TermStartDate + '</td>';
                var fRenewedDateDisplay = "";
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                    fRenewedDateDisplay = moment(new Date(TermStartDate)).format('MM/DD/YYYY');
                }
                else {
                    fRenewedDateDisplay = moment(new Date(TermStartDate)).format(localStorage.AppDateFormat);
                }
                str += ' <td id="RenewedDateDisplay' + totalFileCount + '" >' + fRenewedDateDisplay + '</td>';
                str += '<td id="TermEndDate' + totalFileCount + '" style="display:none;">' + TermEndDate + '</td>';
                var fTermEndDateDisplay = "";
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                    fTermEndDateDisplay = moment(new Date(TermEndDate)).format('MM/DD/YYYY');
                }
                else {
                    fTermEndDateDisplay = moment(new Date(TermEndDate)).format(localStorage.AppDateFormat);
                }
                str += ' <td id="TermEndDateDisplay' + totalFileCount + '" >' + fTermEndDateDisplay + '</td>';
                str += '<td id="TermStatus' + totalFileCount + '">' + TermRenewStatus + '</td>';
                str += '<td id="RenewalNotes' + totalFileCount + '" style="display:none;">' + vRenewalNotes + '</td>';
                if ($("#hdCurrentRenewalTermEnd").val() != null && typeof ($("#hdCurrentRenewalTermEnd")) != "undefined" && $("#hdCurrentRenewalTermEnd").val() != "") {
                    var nextDate = new Date($("#hdCurrentRenewalTermEnd").val());
                    nextDate = new Date(nextDate.setDate(nextDate.getDate() + 1));
                    if ($.datepicker.formatDate('mm/dd/yy', new Date(TermStartDate)) == $.datepicker.formatDate('mm/dd/yy', nextDate)) {
                        RenewalName = TermName;
                        var html = $("#RenewTerm").html();
                        str += ' <td id="RenewedOnDisplay' + totalFileCount + '">' + html + '</td>';
                        str += ' <td id="RenewedOn' + totalFileCount + '" style="display:none;"></td>';
                    }
                    else {
                        str += ' <td id="RenewedOn' + totalFileCount + '" style="display:none;">' + vRenewedOn + '</td>';
                        var fRenewedDisplay = "";
                        if (vRenewedOn != "") {
                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                                fRenewedDisplay = moment(new Date(vRenewedOn)).format('MM/DD/YYYY');
                            }
                            else {
                                fRenewedDisplay = moment(new Date(vRenewedOn)).format(localStorage.AppDateFormat);
                            }
                        }
                        str += ' <td id="RenewedOnDisplay' + totalFileCount + '">' + fRenewedDisplay + '</td>';
                    }
                }
                else {
                    str += ' <td id="RenewedOn' + totalFileCount + '" style="display:none;">' + vRenewedOn + '</td>';
                    var fRenewedDisplay = "";
                    if (vRenewedOn != "") {
                        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                            fRenewedDisplay = moment(new Date(vRenewedOn)).format('MM/DD/YYYY');
                        }
                        else {
                            fRenewedDisplay = moment(new Date(vRenewedOn)).format(localStorage.AppDateFormat);
                        }
                    }
                    str += ' <td id="RenewedOnDisplay' + totalFileCount + '">' + fRenewedDisplay + '</td>';
                }
                str += '<td id="RenewedBy' + totalFileCount + '">' + vRenewedBy + '</td>';
                str += '<td id="RenewalConfirmParticipants' + totalFileCount + '" style="display:none;"></td>';
                str += '<td id="RenewalChecklist' + totalFileCount + '"  style="display:none;">' + vRenewalChecklist + '</td>';
                str += '<td id="Status' + totalFileCount + '" style="display:none;">' + vStatus + '</td>';
                str += '<td id="RenewalNotificationInternal' + totalFileCount + '"  style="display:none;">' + vRenewalNotificationInternal + '</td>';
                str += '<td id="ContractTermEach' + totalFileCount + '"  style="display:none;">' + TermDays + '</td>';
                str += '<td id="RenewalType' + totalFileCount + '"  style="display:none;">' + vRenewedType + '</td>';
                str += '<td id="ContractTermChoicesEach' + totalFileCount + '"  style="display:none;">' + TermChoice + '</td>';
                str += '<td id="CreatedBy' + totalFileCount + '"  style="display:none;">' + localStorage.UserName + '</td>';
                str += '<td id="ModifiedBy' + totalFileCount + '"  style="display:none;">' + localStorage.UserName + '</td>';
                str += '<td id="Created' + totalFileCount + '"  style="display:none;">' + $.datepicker.formatDate('mm/dd/yy', new Date()) + '</td>';
                str += '<td id="Modified' + totalFileCount + '"  style="display:none;">' + $.datepicker.formatDate('mm/dd/yy', new Date()) + '</td>';
                str += '<td id="RenewalCommentsXML' + totalFileCount + '"  style="display:none;"></td>';
                str += '</tr>';
                if (str != "")
                    $("#renewalViewHistoryTerm").append(str);

                if ($(':input[type=radio][name=RenewalConfirmAuto]:checked').val() == "Yes") {
                    $(".ManRenewal").css('display', 'none');
                    $(".autoRenewal").css('display', 'none');
                    // $("#RenewTerm").css('display', '');
                }

                else {
                    $(".ManRenewal").css('display', '');
                    $(".autoRenewal").css('display', '');
                }
            }
            else {
                if (RenewalItemEdit != "") {
                    var indexedit = "1";
                    if (TermRenewStatus == "Current")
                        vAction = "openmenuRenewalExp";
                    else if (TermRenewStatus == "Ended") {
                        vAction = "openmenuRenewalAll";
                    }
                    else if (TermRenewStatus == "Expired") {
                        vAction = "openmenuRenewalAll";
                    }
                    else if (TermRenewStatus == "Not Started") {
                        vAction = "openmenuRenewalDel";
                    }
                    if (RenewalItemEdit != "Initial Term") {
                        var countTerm = TermName.replace("Renewal ", "");
                        indexedit = parseInt(countTerm) + 1;
                    }
                    $('#RenewedDate' + indexedit).text(TermStartDate);
                    var fRenewedDateDisplay = "";
                    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                        fRenewedDateDisplay = moment(new Date(TermStartDate)).format('MM/DD/YYYY');
                    }
                    else {
                        fRenewedDateDisplay = moment(new Date(TermStartDate)).format(localStorage.AppDateFormat);
                    }
                    $('#RenewedDateDisplay' + indexedit).text(fRenewedDateDisplay);
                    $('#TermEndDate' + indexedit).text(TermEndDate);
                    var fTermEndDateDisplay = "";
                    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                        fTermEndDateDisplay = moment(new Date(TermEndDate)).format('MM/DD/YYYY');
                    }
                    else {
                        fTermEndDateDisplay = moment(new Date(TermEndDate)).format(localStorage.AppDateFormat);
                    }
                    $('#TermEndDateDisplay' + indexedit).text(fTermEndDateDisplay);
                    $('#TermStatus' + indexedit).html(TermRenewStatushtml);
                    $('#Status' + indexedit).text(vStatus);
                    $('#RenewedBy' + indexedit).text(vRenewedBy);
                    $('#RenewalType' + indexedit).text(vRenewedType);

                    $('#RenewalNotes' + indexedit).text(vRenewalNotes);
                    $('#RenewalChecklist' + indexedit).text(vRenewalChecklist);
                    $('#RenewalNotificationInternal' + indexedit).text(vRenewalNotificationInternal);
                    $('#ContractTermEach' + indexedit).text(TermDays);
                    $('#ContractTermChoicesEach' + indexedit).text(TermChoice);
                    $('#Modified' + indexedit).text($.datepicker.formatDate('mm/dd/yy', new Date()));

                    $('#ModifiedBy' + indexedit).text(localStorage.UserName);
                }
            }


            $(".openmenuRenewalAll").contextMenu({
                menu: 'menuRenewalAll', leftButton: true
            }, function (action, el, pos) {
                contextMenuRenewal(action, el.parent("td").parent("tr"), pos);
            });
            $(".openmenuRenewalDel").contextMenu({
                menu: 'menuRenewalDel', leftButton: true
            }, function (action, el, pos) {
                contextMenuRenewal(action, el.parent("td").parent("tr"), pos);
            });

            $(".openmenuRenewalExp").contextMenu({
                menu: 'menuRenewalExp', leftButton: true
            }, function (action, el, pos) {
                contextMenuRenewal(action, el.parent("b").parent("td").parent("tr"), pos);
            });
            $(".openmenuRenewalCur").contextMenu({
                menu: 'menuRenewalCur', leftButton: true
            }, function (action, el, pos) {
                contextMenuRenewal(action, el.parent("b").parent("td").parent("tr"), pos);
            });



        }
        if (valcheckauth == "No") {
            AddRenewalTerm(true);
        }
    }
    return true;
}

function SaveRowClearForm() {
    $("#chkRenewalModificationsNew").prop('checked', false);
    $("#chkRenewalPriceAdjustmentsNew").prop('checked', false);
    $("#chkRenewalRepricingNew").prop('checked', false);
    $("#chkRenewalOtherNew").prop('checked', false);
    $("#txtRenewStartDate").val("");
    $("#txtRenewEndDate").val("");
    $("#txtRenewalNotesNew").val("");
    $("#txtRenewStatus").text("");

    GetValuesAndAutoPopulate("ddlRenewalNotfInternalNew", "");
    var TermNameLast = $("#renewalViewHistoryTerm tr:last td:first").text();
    if (TermNameLast == "Initial Term") {
        //$("#AddInitialTerm").css("display", "none");
        //$("#AddRenewalTerm").css("display", "");
        //$("#AddRenewalTerm").text("+Add Renewal 1");
        $("#ddlTermPeriodSetRenewal").find("option").show();
        $("#ddlTermPeriodSetRenewal").find("option:lt(1)").hide();
        if (contrcatItem.AutoContractRenewTermCount == "") {
            // $("select#ddlTermPeriodSetRenewal").prop('selectedIndex', 2);
            $("#ddlTermPeriodSetRenewal").val("Unlimited");
        }
        else {
            var elmop = $("#ddlTermPeriodSetRenewal option[value='" + contrcatItem.AutoContractRenewTermCount + "']");
            if ($(elmop).length > 0 && $(elmop).css('display') != 'none') {
                $("#ddlTermPeriodSetRenewal").val(contrcatItem.AutoContractRenewTermCount);
            }
            else {
                $("select#ddlTermPeriodSetRenewal").prop('selectedIndex', 2);
            }
        }
    }
    else {
        //$("#AddInitialTerm").css("display", "none");
        //$("#AddRenewalTerm").css("display", "");

        var countTerm = TermNameLast.replace("Renewal ", "");
        //$("#AddRenewalTerm").text("+Add Renewal " + (parseInt(countTerm) + 1));
        $("#ddlTermPeriodSetRenewal").find("option").show();
        if ((parseInt(countTerm)) <= 15)
            $("#ddlTermPeriodSetRenewal").find("option:lt(" + (parseInt(countTerm)) + ")").hide();
        else
            $("#ddlTermPeriodSetRenewal").find("option:lt(15)").hide();
        if (contrcatItem.AutoContractRenewTermCount == "")
            $("select#ddlTermPeriodSetRenewal").prop('selectedIndex', (parseInt(countTerm) <= 15 ? parseInt(countTerm) : 15));
        else {
            var elmop = $("#ddlTermPeriodSetRenewal option[value='" + contrcatItem.AutoContractRenewTermCount + "']");
            if ($(elmop).length > 0 && $(elmop).css('display') != 'none') {
                $("#ddlTermPeriodSetRenewal").val(contrcatItem.AutoContractRenewTermCount);
            }
            else {
                $("select#ddlTermPeriodSetRenewal").prop('selectedIndex', (parseInt(countTerm) <= 15 ? parseInt(countTerm) : 15));
            }
        }

    }
    //manoj
    if (document.getElementById("RequiresAuthorizationYes").style.display != "none" && TermName != "Initial Term") {
        $("#txtSendRenewReminderDayRenewalConfirm").trigger('change');
    }
    //manoj
}
var RenewBy = "";
var TermEndValueTemp = "";
var TermEndChoiceValueTemp = "";
var TermEndDate = "";
function contextMenuRenewal(action, el, pos) {

    switch (action) {
        case "view":
            {
                var tbrowcount = $(el).attr('id').replace("renewalViewHistoryTerm", "");

                var term = $("#RenewableTermName" + tbrowcount).text();
                //if (term == "Initial term") {

                //    $("#RenewalChecklistNewlb").css("display", "none");
                //    $("#RenewalTypelb").css("display", "none");

                //    $("#SendRenewalNotificationNewlb").css("display", "none");

                //}
                //else {
                //    $("#RenewalTypelb").css("display", "");
                //    $("#RenewalChecklistNewlb").css("display", "");
                //    $("#SendRenewalNotificationNewlb").css("display", "");
                //}
                $("#RenewalChecklistNewlb").css("display", "none");
                $("#RenewalTypelb").css("display", "none");
                $("#SendRenewalNotificationNewlb").css("display", "none");
                $("#AuthorizRequiredlb").css("display", "none");
                $("#AuthorizedBylb").css("display", "none");



                $("#txtRenewStartDatelb").text(($("#RenewedDateDisplay" + tbrowcount).text() == "" ? "-" : $("#RenewedDateDisplay" + tbrowcount).text()));

                $("#txtRenewEndDatelb").text(($("#TermEndDateDisplay" + tbrowcount).text() == "" ? "-" : $("#TermEndDateDisplay" + tbrowcount).text()));
                $("#txtRenewStatuslb").text(($("#TermStatus" + tbrowcount).text() == "" ? "-" : $("#TermStatus" + tbrowcount).text()));
                $("#txtRenewalNotesNewlb").text(($("#RenewalNotes" + tbrowcount).text() == "" ? "-" : $("#RenewalNotes" + tbrowcount).text()));
                $("#txtRenewalTypelb").text(($("#RenewalType" + tbrowcount).text() == "" ? "-" : $("#RenewalType" + tbrowcount).text()));
                $("#ddlRenewalNotfInternalNewlb").text(($("#RenewalNotificationInternal" + tbrowcount).text() == "" ? "-" : $("#RenewalNotificationInternal" + tbrowcount).text()));
                var ParticipantXmlhtml = '';
                if ($("#RenewalConfirmParticipantsXML" + tbrowcount).html() != null && $("#RenewalConfirmParticipantsXML" + tbrowcount).html() != '') {
                    var XML = $("#RenewalConfirmParticipantsXML" + tbrowcount).html();
                    $(XML).find('participant').each(function () {
                        var Status = $(this).find('status').text();
                        var Name = $(this).find('name').text();
                        if (Name != "" && Name != null) {
                            if (Status == "In Progress") {

                                ParticipantXmlhtml += '             <div>';
                                ParticipantXmlhtml += '   <img src="../Content/Images/refresh.png" alt="Open Menu" title="Open Menu" class=" margin-left-5" style="pointer-events: none;">';
                                ParticipantXmlhtml += '            <label id="txtRenewStatuslb" class="css1-label" style="text-align:left;">' + Name + '</label>';
                                ParticipantXmlhtml += '          </div>';
                            }
                            else if (Status == "Renewed") {
                                ParticipantXmlhtml += '             <div>';
                                ParticipantXmlhtml += '   <img src="../Content/Images/approved.png" alt="Open Menu" title="Open Menu" class=" margin-left-5" style="pointer-events: none;">';
                                ParticipantXmlhtml += '            <label id="txtRenewStatuslb" class="css1-label" style="text-align:left;">' + Name + '</label>';
                                ParticipantXmlhtml += '          </div>';

                            }
                            else if (Status == "Rejected") {
                                ParticipantXmlhtml += '             <div>';
                                ParticipantXmlhtml += '   <img src="../Content/Images/reject.png" alt="Open Menu" title="Open Menu" class=" margin-left-5" style="pointer-events: none;">';
                                ParticipantXmlhtml += '            <label id="txtRenewStatuslb" class="css1-label" style="text-align:left;">' + Name + '</label>';
                                ParticipantXmlhtml += '          </div>';

                            }
                        }
                    })
                    if (ParticipantXmlhtml != "")
                        $("#ddlAuthorizedBylb").html(ParticipantXmlhtml);
                    else
                        $("#ddlAuthorizedBylb").text('-');
                }
                else {
                    $("#ddlAuthorizedBylb").text('-');
                }
                $("#txtAuthorizRequiredlb").text(($("#RequiresAuth" + tbrowcount).text() == "" ? "-" : $("#RequiresAuth" + tbrowcount).text()));
                $("#txtRenewalChecklistNewlb").text(($("#RenewalChecklist" + tbrowcount).text() == "" ? "-" : $("#RenewalChecklist" + tbrowcount).text()));

                $("#ddlRenewedBylb").text(($("#RenewedBy" + tbrowcount).text() == "" ? "-" : $("#RenewedBy" + tbrowcount).text()));
                $("#RenewalTermNewlb").dialog("option", "title", term);
                $("#RenewalTermNewlb").dialog("open");

                break;
            }
        case "edit":
            {
                $(".validelement").each(function (index, element) {
                    $(element).removeClass("error");
                    $("#errormsg_" + element.id).remove();
                });

                //Sridhar
                $('input[type="radio"][name="TermsSingleMultiple"][value="Yes"]').prop('checked', true);
                $(".trSingle").css('display', '');
                $(".trMultiple").css('display', 'none');
                $("#trNumberOfTerms").css('display', 'none');
                $("#SendRenewalNotificationNew").css("display", "none");
                $("#RenewalChecklistNew").css("display", "none");
                //Sridhar
                RenewBy = "";
                EditSaveFlag = false;
                var tbrowcount = $(el).attr('id').replace("renewalViewHistoryTerm", "");
                var TermNameLast = $("#renewalViewHistoryTerm tr:last td:first").text();
                var term = $("#RenewableTermName" + tbrowcount).text();
                RenewBy = $("#RenewedBy" + tbrowcount).text();
                $("#tdNameofTerms").html(term);
                $("#txtRenewStartDate").prop('disabled', false);
                $("#txtRenewStartDate").addClass('form-contro-Date');
                $("#txtRenewStartDate").removeClass('form-contro-NoDate');
                $('input[type="radio"][name="rdRenewTermEndDate"][value="EndDate"]').prop('disabled', false);
                $('input[type="radio"][name="rdRenewTermEndDate"][value="Term"]').prop('disabled', false);
                //manoj
                if ($("#ContractTermEach" + tbrowcount).text() == "") {
                    $("#ContractTermRenewNew").val('');
                    $("#ContractTermRenewChoicesNew").val('years');
                }
                else {
                    $("#ContractTermRenewNew").val($("#ContractTermEach" + tbrowcount).text());
                    $("#ContractTermRenewChoicesNew").val($("#ContractTermChoicesEach" + tbrowcount).text());
                }
                //manoj

                if (term == "Initial Term") {

                    $("#RenewalChecklistNew").css("display", "none");
                    $("#SendRenewalNotificationNew").css("display", "none");
                    GetValuesAndAutoPopulate("ddlRenewalNotfInternalNew", "");
                    $('input[type="checkbox"][name="checkboxNotifyNew"]').prop('checked', false);

                    if (term != TermNameLast) {
                        var tempdateStart = ($("#RenewedDate" + (parseInt(tbrowcount) + 1)) != null && typeof ($("#RenewedDate" + (parseInt(tbrowcount) + 1))) != "undefined") ? ($("#RenewedDate" + (parseInt(tbrowcount) + 1)).text() == "" ? null : new Date($("#RenewedDate" + (parseInt(tbrowcount) + 1)).text())) : null;
                        var tempdateStartthis = new Date($("#RenewedDate" + tbrowcount).text() == "" ? "" : $("#RenewedDate" + tbrowcount).text());
                        $("#txtRenewStartDate").datepicker("option", "maxDate", (tempdateStart != null ? new Date(tempdateStart.setDate(tempdateStart.getDate() - 1)) : null));
                        $("#txtRenewEndDate").datepicker("option", "maxDate", tempdateStart);
                        $("#txtRenewEndDate").datepicker("option", "minDate", (tempdateStartthis != null ? new Date(tempdateStartthis.setDate(tempdateStartthis.getDate() - 1)) : null));
                        $("#txtRenewStartDate").datepicker("option", "minDate", null);
                        EndDateCheckRenewal = new Date($("#TermEndDate" + tbrowcount).text() == "" ? "" : $("#TermEndDate" + tbrowcount).text());
                    }
                    else {
                        var tempdateStartthis = new Date($("#RenewedDate" + tbrowcount).text() == "" ? "" : $("#RenewedDate" + tbrowcount).text());
                        $("#txtRenewStartDate").datepicker("option", "maxDate", null);
                        $("#txtRenewEndDate").datepicker("option", "maxDate", null);
                        $("#txtRenewEndDate").datepicker("option", "minDate", (tempdateStartthis != null ? new Date(tempdateStartthis.setDate(tempdateStartthis.getDate() + 1)) : null));
                        $("#txtRenewStartDate").datepicker("option", "minDate", null);
                        EndDateCheckRenewal = "";
                    }
                }
                else {
                    if (term == TermNameLast) {
                        var tempdateEnd = ($("#TermEndDate" + (parseInt(tbrowcount) - 1)) != null && typeof ($("#TermEndDate" + (parseInt(tbrowcount) - 1))) != "undefined") ? ($("#TermEndDate" + (parseInt(tbrowcount) - 1)).text() == "" ? null : new Date($("#TermEndDate" + (parseInt(tbrowcount) - 1)).text())) : null;
                        var tempdateStart = ($("#RenewedDate" + (parseInt(tbrowcount) + 1)) != null && typeof ($("#RenewedDate" + (parseInt(tbrowcount) + 1))) != "undefined") ? ($("#RenewedDate" + (parseInt(tbrowcount) + 1)).text() == "" ? null : new Date($("#RenewedDate" + (parseInt(tbrowcount) + 1)).text())) : null;
                        var tempdateStartthis = new Date($("#RenewedDate" + tbrowcount).text() == "" ? "" : $("#RenewedDate" + tbrowcount).text());
                        var tempdateEndthis = new Date($("#TermEndDate" + tbrowcount).text() == "" ? "" : $("#TermEndDate" + tbrowcount).text());
                        var temp1 = (tempdateEnd != null ? new Date(tempdateEnd.setDate(tempdateEnd.getDate() + 1)) : null);
                        var temp2 = (tempdateStart != null ? new Date(tempdateStart.setDate(tempdateStart.getDate() - 1)) : null);
                        var temp3 = (tempdateStartthis != null ? new Date(tempdateStartthis.setDate(tempdateStartthis.getDate() + 1)) : null)
                        $("#txtRenewStartDate").datepicker("option", "minDate", temp1);
                        $("#txtRenewStartDate").datepicker("option", "maxDate", temp2);
                        $("#txtRenewEndDate").datepicker("option", "minDate", temp3);
                        $("#txtRenewEndDate").datepicker("option", "maxDate", null);
                        EndDateCheckRenewal = "";
                    }
                    else {
                        var tempdateEnd = ($("#TermEndDate" + (parseInt(tbrowcount) - 1)) != null && typeof ($("#TermEndDate" + (parseInt(tbrowcount) - 1))) != "undefined") ? ($("#TermEndDate" + (parseInt(tbrowcount) - 1)).text() == "" ? null : new Date($("#TermEndDate" + (parseInt(tbrowcount) - 1)).text())) : null;
                        var tempdateStart = ($("#RenewedDate" + (parseInt(tbrowcount) + 1)) != null && typeof ($("#RenewedDate" + (parseInt(tbrowcount) + 1))) != "undefined") ? ($("#RenewedDate" + (parseInt(tbrowcount) + 1)).text() == "" ? null : new Date($("#RenewedDate" + (parseInt(tbrowcount) + 1)).text())) : null;
                        var tempdateStartthis = new Date($("#RenewedDate" + tbrowcount).text() == "" ? "" : $("#RenewedDate" + tbrowcount).text());
                        var tempdateEndthis = new Date($("#TermEndDate" + tbrowcount).text() == "" ? "" : $("#TermEndDate" + tbrowcount).text());
                        var temp1 = (tempdateEnd != null ? new Date(tempdateEnd.setDate(tempdateEnd.getDate() + 1)) : null);
                        var temp2 = (tempdateStart != null ? new Date(tempdateStart) : null);
                        if (temp2 != null)
                            temp2 = new Date(temp2.setDate(temp2.getDate() - 1));
                        var temp3 = (tempdateStartthis != null ? new Date(tempdateStartthis.setDate(tempdateStartthis.getDate() + 1)) : null)
                        var temp4 = (tempdateStart != null ? new Date(tempdateStart) : null);
                        if (temp4 != null)
                            temp4 = new Date(temp4.setDate(tempdateStart.getDate() - 1));
                        $("#txtRenewStartDate").datepicker("option", "minDate", temp1);
                        $("#txtRenewStartDate").datepicker("option", "maxDate", temp2);
                        $("#txtRenewEndDate").datepicker("option", "minDate", temp3);
                        $("#txtRenewEndDate").datepicker("option", "maxDate", temp4);
                        EndDateCheckRenewal = new Date($("#TermEndDate" + tbrowcount).text() == "" ? "" : $("#TermEndDate" + tbrowcount).text());
                    }
                    $("#RenewalChecklistNew").css("display", "none");
                    $("#SendRenewalNotificationNew").css("display", "none");
                }

                $("#txtRenewStartDate").val($.datepicker.formatDate(DatepickerFormat, new Date($("#RenewedDate" + tbrowcount).text() == "" ? "" : $("#RenewedDate" + tbrowcount).text())));

                if ($("#ContractTermEach" + tbrowcount).text() == "") {
                    $("#ContractTermRenewChoicesNew").prop('disabled', true);
                    $("#ContractTermRenewNew").prop('disabled', true);
                    $("#ContractTermRenewNew").val('');
                    $("#ContractTermRenewChoicesNew").val('years');
                    $("#txtRenewEndDate").prop('disabled', false);
                    $("#txtRenewEndDate").addClass('form-contro-Date');
                    $("#txtRenewEndDate").removeClass('form-contro-NoDate');

                    $('input[type="radio"][name="rdRenewTermEndDate"][value="EndDate"]').prop('checked', true);
                    $("#txtRenewEndDate").val($.datepicker.formatDate(DatepickerFormat, new Date($("#TermEndDate" + tbrowcount).text() == "" ? "" : $("#TermEndDate" + tbrowcount).text())));
                }
                else {
                    $("#ContractTermRenewChoicesNew").prop('disabled', false);
                    $("#ContractTermRenewNew").prop('disabled', false);
                    $("#ContractTermRenewNew").val($("#ContractTermEach" + tbrowcount).text());
                    $("#ContractTermRenewChoicesNew").val($("#ContractTermChoicesEach" + tbrowcount).text());
                    $("#txtRenewEndDate").prop('disabled', true);
                    $("#txtRenewEndDate").removeClass('form-contro-Date');
                    $("#txtRenewEndDate").addClass('form-contro-NoDate');


                    $('input[type="radio"][name="rdRenewTermEndDate"][value="Term"]').prop('checked', true);
                    calculateenddateRenew('txtRenewStartDate', 'ContractTermRenewChoicesNew', 'ContractTermRenewNew', 'txtRenewEndDate');
                }
                $("#txtRenewStatus").html(($("#TermStatus" + tbrowcount).html() == "" ? "" : $("#TermStatus" + tbrowcount).html()));
                $("#txtRenewalNotesNew").val(($("#RenewalNotes" + tbrowcount).text() == "" ? "" : $("#RenewalNotes" + tbrowcount).text()));
                GetValuesAndAutoPopulate("ddlRenewalNotfInternalNew", ($("#RenewalNotificationInternal" + tbrowcount).text() == "" ? "" : $("#RenewalNotificationInternal" + tbrowcount).text()));
                //GetValuesAndAutoPopulate("ddlAuthorizedBy", ($("#RenewalConfirmParticipants" + tbrowcount).text() == "" ? "-" : $("#RenewalConfirmParticipants" + tbrowcount).text()));
                //GetValuesAndAutoPopulate("ddlRenewedBy", ($("#RenewedBy" + tbrowcount).text() == "" ? "-" : $("#RenewedBy" + tbrowcount).text()));
                $("#txtAuthorizRequired").val(($("#RequiresAuth" + tbrowcount).text() == "" ? "No" : $("#RequiresAuth" + tbrowcount).text()));
                var CheckList = ($("#RenewalChecklist" + tbrowcount).text() == "" ? "-" : $("#RenewalChecklist" + tbrowcount).text());
                if (CheckList != "" && CheckList != null && typeof (CheckList) != "undefined") {
                    var splitchecklt = CheckList.split(';');
                    $(splitchecklt).each(function (i, item) {
                        var valcheck = item.trim();
                        if (valcheck != "") {
                            $(':input[type=checkbox][value="' + valcheck + '"]').prop('checked', true);
                        }
                    });
                }
                TermEndValueTemp = $("#ContractTermRenewNew").val();
                TermEndChoiceValueTemp = $("#ContractTermRenewChoicesNew").val();
                TermEndDate = $("#txtRenewEndDate").val();
                RenewalItemEdit = term;
                RenewalAddFlag = false;
                isRenewTermClick = false;
                $("#btnAddNewTerm").html('<span class="pop_up_Content_Green">Ok</span>');
                $("#RenewalTermNew").dialog("option", "title", "Edit " + term);
                $("#RenewalTermNew").dialog("open");

                break;
            }
        case "expire":
            {
                swal({
                    title: '',
                    text: "Expiring this term will delete the subsequent term(s). Are you sure you want to <span style=\"font-weight:700\">Expire</span>? ",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
           function (confirmed) {
               if (confirmed) {
                   $("#trContractTermRenewal").css('display', 'none');
                   $("#trContractTermRenewalSec").css('display', 'none');
                   var index = $(el).index();
                   var tbrowcount = $("#tbRenewalActivities").find("tr:gt(" + (parseInt(index) + 1) + ")").remove();
                   var TermNameLast = $("#renewalViewHistoryTerm tr:last td:first").text();
                   if (TermNameLast == "" || TermNameLast == null || typeof (TermNameLast) == "undefined") {
                       $("#AddInitialTerm").css("display", "");
                       $("#AddRenewalTerm").css("display", "none");

                   }
                   else if (TermNameLast == "Initial Term") {
                       $("#AddInitialTerm").css("display", "none");
                       $("#AddRenewalTerm").css("display", "");
                       $("#AddRenewalTerm").text("+Add Terms");
                       $("#ddlTermPeriodSetRenewal").find("option").show();
                       $("#ddlTermPeriodSetRenewal").find("option:lt(1)").hide();

                       if (contrcatItem.AutoContractRenewTermCount == "")
                           $("#ddlTermPeriodSetRenewal").val("Unlimited");
                       else {
                           var elmop = $("#ddlTermPeriodSetRenewal option[value='" + contrcatItem.AutoContractRenewTermCount + "']");
                           if ($(elmop).length > 0 && $(elmop).css('display') != 'none') {
                               $("#ddlTermPeriodSetRenewal").val(contrcatItem.AutoContractRenewTermCount);
                           }
                           else {
                               $("select#ddlTermPeriodSetRenewal").prop('selectedIndex', 2);
                           }
                       }
                   }
                   else {
                       $("#AddInitialTerm").css("display", "none");
                       $("#AddRenewalTerm").css("display", "");
                       var countTerm = TermNameLast.replace("Renewal ", "");
                       $("#AddRenewalTerm").text("+Add Terms");
                       if ((parseInt(countTerm)) <= 15)
                           $("#ddlTermPeriodSetRenewal").find("option:lt(" + (parseInt(countTerm)) + ")").hide();
                       else
                           $("#ddlTermPeriodSetRenewal").find("option:lt(15)").hide();
                       if (contrcatItem.AutoContractRenewTermCount == "")
                           $("select#ddlTermPeriodSetRenewal").prop('selectedIndex', (parseInt(countTerm) <= 15 ? parseInt(countTerm) : 15));
                       else {
                           var elmop = $("#ddlTermPeriodSetRenewal option[value='" + contrcatItem.AutoContractRenewTermCount + "']");
                           if ($(elmop).length > 0 && $(elmop).css('display') != 'none') {
                               $("#ddlTermPeriodSetRenewal").val(contrcatItem.AutoContractRenewTermCount);
                           }
                           else {
                               $("select#ddlTermPeriodSetRenewal").prop('selectedIndex', (parseInt(countTerm) <= 15 ? parseInt(countTerm) : 15));
                           }
                       }



                   }
                   $('#TermStatus' + (parseInt(index) + 1)).html('<b title="Current" class="status_red" style="padding: 5px 24px; color:#fff">Expired<img src="../Content/Images/down_arrow.png" style="width: 8px;margin-top: 4px !important;"  alt="Open Menu" title="Open Menu" class="openmenuRenewalCur edithide margin-left-5"></b>');
                   $('#Status' + (parseInt(index) + 1)).text('Expired');
                   $(".openmenuRenewalCur").contextMenu({
                       menu: 'menuRenewalCur', leftButton: true
                   }, function (action, el, pos) {
                       contextMenuRenewal(action, el.parent("b").parent("td").parent("tr"), pos);
                   });

                   $("#AddInitialTerm").css("display", "none");

                   contractItem.RenewalConfirmOverall = "";
                   contractItem.RenewalConfirmParticipantsXML = "";
                   $("#AddRenewalTerm").css("display", "none");
                   // $("#RenewTerm").css('display', 'none');

                   $("#trContractTermRenewal").css("display", "none");
                   $("#trContractTermRenewalSec").css("display", "none");
               }
               return;
           });
                break;
            }
        case "current":
            {
                swal({
                    title: '',
                    text: "Are you sure you want to make the term <span style=\"font-weight:700\">Current</span>? ",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
               function (confirmed) {
                   if (confirmed) {

                       var index = $(el).index();
                       var TermNameLast = $("#renewalViewHistoryTerm tr:last td:first").text();
                       if (TermNameLast == "" || TermNameLast == null || typeof (TermNameLast) == "undefined") {
                           $("#AddInitialTerm").css("display", "");
                           $("#AddRenewalTerm").css("display", "none");

                       }
                       else if (TermNameLast == "Initial Term") {
                           $("#AddInitialTerm").css("display", "none");
                           $("#AddRenewalTerm").css("display", "");
                           $("#AddRenewalTerm").text("+Add Terms");
                           $("#ddlTermPeriodSetRenewal").find("option").show();
                           $("#ddlTermPeriodSetRenewal").find("option:lt(1)").hide();
                           if (contrcatItem.AutoContractRenewTermCount == "")
                               $("#ddlTermPeriodSetRenewal").val("Unlimited");
                           else {
                               var elmop = $("#ddlTermPeriodSetRenewal option[value='" + contrcatItem.AutoContractRenewTermCount + "']");
                               if ($(elmop).length > 0 && $(elmop).css('display') != 'none') {
                                   $("#ddlTermPeriodSetRenewal").val(contrcatItem.AutoContractRenewTermCount);
                               }
                               else {
                                   $("select#ddlTermPeriodSetRenewal").prop('selectedIndex', 2);
                               }
                           }
                       }
                       else {
                           $("#AddInitialTerm").css("display", "none");
                           $("#AddRenewalTerm").css("display", "");
                           var countTerm = TermNameLast.replace("Renewal ", "");
                           $("#AddRenewalTerm").text("+Add Terms");
                           if ((parseInt(countTerm)) <= 15)
                               $("#ddlTermPeriodSetRenewal").find("option:lt(" + (parseInt(countTerm)) + ")").hide();
                           else
                               $("#ddlTermPeriodSetRenewal").find("option:lt(15)").hide();
                           if (contrcatItem.AutoContractRenewTermCount == "")
                               $("select#ddlTermPeriodSetRenewal").prop('selectedIndex', (parseInt(countTerm) <= 15 ? parseInt(countTerm) : 15));
                           else {
                               var elmop = $("#ddlTermPeriodSetRenewal option[value='" + contrcatItem.AutoContractRenewTermCount + "']");
                               if ($(elmop).length > 0 && $(elmop).css('display') != 'none') {
                                   $("#ddlTermPeriodSetRenewal").val(contrcatItem.AutoContractRenewTermCount);
                               }
                               else {
                                   $("select#ddlTermPeriodSetRenewal").prop('selectedIndex', (parseInt(countTerm) <= 15 ? parseInt(countTerm) : 15));
                               }
                           }
                       }

                       $('#TermStatus' + (parseInt(index) + 1)).html('<b title="Current" class="status_green" style="padding: 5px 24px; color:#fff">Current<img src="../Content/Images/down_arrow.png" style="width: 8px;margin-top: 4px !important;"  alt="Open Menu" title="Open Menu" class="openmenuRenewalExp edithide margin-left-5"></b>');
                       $('#Status' + (parseInt(index) + 1)).text('Renewed');
                       $(".openmenuRenewalExp").contextMenu({
                           menu: 'menuRenewalExp', leftButton: true
                       }, function (action, el, pos) {
                           contextMenuRenewal(action, el.parent("b").parent("td").parent("tr"), pos);
                       });
                       $("#AddRenewalTerm").css("display", "");
                       $("#ddlTermPeriodSetRenewal").find("option").show();
                       if ((parseInt(index)) <= 15)
                           $("#ddlTermPeriodSetRenewal").find("option:lt(" + (parseInt(index)) + ")").hide();
                       else
                           $("#ddlTermPeriodSetRenewal").find("option:lt(15)").hide();
                       if (contrcatItem.AutoContractRenewTermCount == "")
                           $("select#ddlTermPeriodSetRenewal").prop('selectedIndex', (parseInt(index) <= 15 ? parseInt(countTerm) : 15));
                       else {
                           var elmop = $("#ddlTermPeriodSetRenewal option[value='" + contrcatItem.AutoContractRenewTermCount + "']");
                           if ($(elmop).length > 0 && $(elmop).css('display') != 'none') {
                               $("#ddlTermPeriodSetRenewal").val(contrcatItem.AutoContractRenewTermCount);
                           }
                           else {
                               $("select#ddlTermPeriodSetRenewal").prop('selectedIndex', (parseInt(index) <= 15 ? parseInt(countTerm) : 15));
                           }
                       }
                   }
                   return;
               });
                break;
            }
        case "delete":
            {
                swal({
                    title: '',
                    text: "Deleting this term will delete the subsequent term(s). Are you sure you want to <span style=\"font-weight:700\">Delete</span>? ",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
                       function (confirmed) {
                           if (confirmed) {
                               var index = $(el).index();
                               var tbrowcount = $("#tbRenewalActivities").find("tr:gt(" + index + ")").remove();
                               var TermNameLast = $("#renewalViewHistoryTerm tr:last td:first").text();
                               if (TermNameLast == "" || TermNameLast == null || typeof (TermNameLast) == "undefined") {
                                   $("#AddInitialTerm").css("display", "");
                                   $("#AddRenewalTerm").css("display", "none");
                               }
                               else if (TermNameLast == "Initial Term") {
                                   $("#AddInitialTerm").css("display", "none");
                                   $("#AddRenewalTerm").css("display", "");
                                   $("#AddRenewalTerm").text("+Add Terms");
                                   $("#ddlTermPeriodSetRenewal").find("option").show();
                                   // $("#ddlTermPeriodSetRenewal").find("option:lt(1)").hide();
                                   if (contrcatItem.AutoContractRenewTermCount == "")
                                       $("#ddlTermPeriodSetRenewal").val("Unlimited");
                                   else {
                                       var elmop = $("#ddlTermPeriodSetRenewal option[value='" + contrcatItem.AutoContractRenewTermCount + "']");
                                       if ($(elmop).length > 0 && $(elmop).css('display') != 'none') {
                                           $("#ddlTermPeriodSetRenewal").val(contrcatItem.AutoContractRenewTermCount);
                                       }
                                       else {
                                           $("select#ddlTermPeriodSetRenewal").prop('selectedIndex', 2);
                                       }
                                   }
                               }
                               else {
                                   $("#AddInitialTerm").css("display", "none");
                                   $("#AddRenewalTerm").css("display", "");
                                   var countTerm = TermNameLast.replace("Renewal ", "");
                                   $("#AddRenewalTerm").text("+Add Terms");
                                   $("#ddlTermPeriodSetRenewal").find("option").show();
                                   if ((parseInt(countTerm)) <= 15)
                                       $("#ddlTermPeriodSetRenewal").find("option:lt(" + (parseInt(countTerm)) + ")").hide();
                                   else
                                       $("#ddlTermPeriodSetRenewal").find("option:lt(15)").hide();
                                   if (contrcatItem.AutoContractRenewTermCount == "")
                                       $("select#ddlTermPeriodSetRenewal").prop('selectedIndex', (parseInt(countTerm) <= 15 ? parseInt(countTerm) : 15));
                                   else {
                                       var elmop = $("#ddlTermPeriodSetRenewal option[value='" + contrcatItem.AutoContractRenewTermCount + "']");
                                       if ($(elmop).length > 0 && $(elmop).css('display') != 'none') {
                                           $("#ddlTermPeriodSetRenewal").val(contrcatItem.AutoContractRenewTermCount);
                                       }
                                       else {
                                           $("select#ddlTermPeriodSetRenewal").prop('selectedIndex', (parseInt(countTerm) <= 15 ? parseInt(countTerm) : 15));
                                       }
                                   }

                               }
                               if (RenewalName != "Initial Term") {
                                   indexCount = RenewalName.replace("Renewal ", "");
                                   indexCount = parseInt(indexCount) + 1;
                                   if (($("#RenewalConfirmParticipantsXML" + indexCount) != null && typeof ($("#RenewalConfirmParticipantsXML" + indexCount) != "undefined")) ? false : true) {

                                       $("#trContractTermRenewal").css('display', 'none');
                                       $("#trContractTermRenewalSec").css('display', 'none');
                                   }
                               }

                               var TermNameLast = $("#renewalViewHistoryTerm tr:last td:first").text();
                               if (TermNameLast == "") {
                                   $("#ddlTermPeriodSetRenewal").find("option").show();
                               }
                               else if (TermNameLast == "Initial Term") {
                                   $("#ddlTermPeriodSetRenewal").find("option").show();
                                   $("#ddlTermPeriodSetRenewal").find("option:lt(1)").hide();
                               }
                               else {
                                   var countTerm = TermNameLast.replace("Renewal ", "");
                                   $("#ddlTermPeriodSetRenewal").find("option").show();
                                   if ((parseInt(countTerm)) <= 15)
                                       $("#ddlTermPeriodSetRenewal").find("option:lt(" + (parseInt(countTerm)) + ")").hide();
                                   else
                                       $("#ddlTermPeriodSetRenewal").find("option:lt(15)").hide();
                               }
                           }
                           return;
                       });

                break;
            }
        case "deleteexpired": {
            swal({
                title: '',
                text: "Are you sure you want to <span style=\"font-weight:700\">Delete</span>? ",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                html: true
            },
                                   function (confirmed) {
                                       if (confirmed) {
                                           var trName = $(el)[0].id;
                                           var index = parseInt(trName.replace("ExpRenewalViewHistoryTerm", ""));
                                           var tbrowcount = $("#tbRenewalActivities").find("tr#ExpRenewalViewHistoryTerm" + index).remove();
                                       }
                                       return;
                                   });

            break;
        }
        case "editsave":
            {
                $(".validelement").each(function (index, element) {
                    $(element).removeClass("error");
                    $("#errormsg_" + element.id).remove();
                });
                EditSaveFlag = true;
                $('input[type="radio"][name="TermsSingleMultiple"][value="Yes"]').prop('checked', true);
                $(".trSingle").css('display', '');
                $(".trMultiple").css('display', 'none');
                $("#trNumberOfTerms").css('display', 'none');
                var tbrowcount = $(el).attr('id').replace("renewalViewHistoryTerm", "");
                var TermNameLast = $("#renewalViewHistoryTerm tr:last td:first").text();
                var term = $("#RenewableTermName" + tbrowcount).text();
                //manoj
                if ($("#ContractTermEach" + tbrowcount).text() == "") {
                    $("#ContractTermRenewNew").val('');
                    $("#ContractTermRenewChoicesNew").val('years');
                }
                else {
                    $("#ContractTermRenewNew").val($("#ContractTermEach" + tbrowcount).text());
                    $("#ContractTermRenewChoicesNew").val($("#ContractTermChoicesEach" + tbrowcount).text());
                }
                //manoj
                if (term == "Initial Term") {
                    $("#RenewalChecklistNew").css("display", "none");
                    $("#SendRenewalNotificationNew").css("display", "none");
                    GetValuesAndAutoPopulate("ddlRenewalNotfInternalNew", "");
                    $('input[type="checkbox"][name="checkboxNotifyNew"]').prop('checked', false);

                    if (term != TermNameLast) {
                        var tempdateStart = ($("#RenewedDate" + (parseInt(tbrowcount) + 1)) != null && typeof ($("#RenewedDate" + (parseInt(tbrowcount) + 1))) != "undefined") ? ($("#RenewedDate" + (parseInt(tbrowcount) + 1)).text() == "" ? null : new Date($("#RenewedDate" + (parseInt(tbrowcount) + 1)).text())) : null;
                        var tempdateStartthis = new Date($("#RenewedDate" + tbrowcount).text() == "" ? "" : $("#RenewedDate" + tbrowcount).text());
                        $("#txtRenewStartDate").datepicker("option", "maxDate", (tempdateStart != null ? new Date(tempdateStart.setDate(tempdateStart.getDate() - 1)) : null));
                        $("#txtRenewEndDate").datepicker("option", "maxDate", tempdateStart);
                        $("#txtRenewEndDate").datepicker("option", "minDate", (tempdateStartthis != null ? new Date(tempdateStartthis.setDate(tempdateStartthis.getDate() - 1)) : null));
                        $("#txtRenewStartDate").datepicker("option", "minDate", null);
                    }
                    else {

                        var tempdateStartthis = new Date($("#RenewedDate" + tbrowcount).text() == "" ? "" : $("#RenewedDate" + tbrowcount).text());
                        $("#txtRenewStartDate").datepicker("option", "maxDate", null);
                        $("#txtRenewEndDate").datepicker("option", "maxDate", null);
                        $("#txtRenewEndDate").datepicker("option", "minDate", (tempdateStartthis != null ? new Date(tempdateStartthis.setDate(tempdateStartthis.getDate() + 1)) : null));
                        $("#txtRenewStartDate").datepicker("option", "minDate", null);
                    }
                }
                else {
                    if (term == TermNameLast) {
                        var tempdateEnd = ($("#TermEndDate" + (parseInt(tbrowcount) - 1)) != null && typeof ($("#TermEndDate" + (parseInt(tbrowcount) - 1))) != "undefined") ? ($("#TermEndDate" + (parseInt(tbrowcount) - 1)).text() == "" ? null : new Date($("#TermEndDate" + (parseInt(tbrowcount) - 1)).text())) : null;
                        var tempdateStart = ($("#RenewedDate" + (parseInt(tbrowcount) + 1)) != null && typeof ($("#RenewedDate" + (parseInt(tbrowcount) + 1))) != "undefined") ? ($("#RenewedDate" + (parseInt(tbrowcount) + 1)).text() == "" ? null : new Date($("#RenewedDate" + (parseInt(tbrowcount) + 1)).text())) : null;
                        var tempdateStartthis = new Date($("#RenewedDate" + tbrowcount).text() == "" ? "" : $("#RenewedDate" + tbrowcount).text());
                        var tempdateEndthis = new Date($("#TermEndDate" + tbrowcount).text() == "" ? "" : $("#TermEndDate" + tbrowcount).text());
                        var temp1 = (tempdateEnd != null ? new Date(tempdateEnd.setDate(tempdateEnd.getDate() + 1)) : null);
                        var temp2 = (tempdateStart != null ? new Date(tempdateStart.setDate(tempdateStart.getDate() - 1)) : null);
                        var temp3 = (tempdateStartthis != null ? new Date(tempdateStartthis.setDate(tempdateStartthis.getDate() + 1)) : null)
                        $("#txtRenewStartDate").datepicker("option", "minDate", temp1);
                        $("#txtRenewStartDate").datepicker("option", "maxDate", temp2);
                        $("#txtRenewEndDate").datepicker("option", "minDate", temp3);
                        $("#txtRenewEndDate").datepicker("option", "maxDate", null);
                    }
                    else {
                        var tempdateEnd = ($("#TermEndDate" + (parseInt(tbrowcount) - 1)) != null && typeof ($("#TermEndDate" + (parseInt(tbrowcount) - 1))) != "undefined") ? ($("#TermEndDate" + (parseInt(tbrowcount) - 1)).text() == "" ? null : new Date($("#TermEndDate" + (parseInt(tbrowcount) - 1)).text())) : null;
                        var tempdateStart = ($("#RenewedDate" + (parseInt(tbrowcount) + 1)) != null && typeof ($("#RenewedDate" + (parseInt(tbrowcount) + 1))) != "undefined") ? ($("#RenewedDate" + (parseInt(tbrowcount) + 1)).text() == "" ? null : new Date($("#RenewedDate" + (parseInt(tbrowcount) + 1)).text())) : null;
                        var tempdateStartthis = new Date($("#RenewedDate" + tbrowcount).text() == "" ? "" : $("#RenewedDate" + tbrowcount).text());
                        var tempdateEndthis = new Date($("#TermEndDate" + tbrowcount).text() == "" ? "" : $("#TermEndDate" + tbrowcount).text());
                        var temp1 = (tempdateEnd != null ? new Date(tempdateEnd.setDate(tempdateEnd.getDate() + 1)) : null);
                        var temp2 = (tempdateStart != null ? new Date(tempdateStart) : null);
                        if (temp2 != null)
                            temp2 = new Date(temp2.setDate(temp2.getDate() - 1));
                        var temp3 = (tempdateStartthis != null ? new Date(tempdateStartthis.setDate(tempdateStartthis.getDate() + 1)) : null)
                        var temp4 = (tempdateStart != null ? new Date(tempdateStart) : null);
                        if (temp4 != null)
                            temp4 = new Date(temp4.setDate(tempdateStart.getDate() - 1));
                        $("#txtRenewStartDate").datepicker("option", "minDate", temp1);
                        $("#txtRenewStartDate").datepicker("option", "maxDate", temp2);
                        $("#txtRenewEndDate").datepicker("option", "minDate", temp3);
                        $("#txtRenewEndDate").datepicker("option", "maxDate", temp4);

                    }
                    $("#RenewalChecklistNew").css("display", "none");
                    $("#SendRenewalNotificationNew").css("display", "none");
                }

                var vvSD = new Date($("#RenewedDate" + tbrowcount).text() == "" ? "" : $("#RenewedDate" + tbrowcount).text());

                $("#txtRenewStartDate").val($.datepicker.formatDate(DatepickerFormat, new Date($("#RenewedDate" + tbrowcount).text() == "" ? "" : $("#RenewedDate" + tbrowcount).text())));
                EndDateCheckRenewal = new Date($("#TermEndDate" + tbrowcount).text() == "" ? "" : $("#TermEndDate" + tbrowcount).text());
                if ($("#ContractTermEach" + tbrowcount).text() == "") {
                    $("#ContractTermRenewChoicesNew").prop('disabled', true);
                    $("#ContractTermRenewNew").prop('disabled', true);
                    $("#ContractTermRenewNew").val('');
                    $("#ContractTermRenewChoicesNew").val('years');
                    $("#txtRenewEndDate").prop('disabled', false);
                    $("#txtRenewEndDate").addClass('form-contro-Date');
                    $("#txtRenewEndDate").removeClass('form-contro-NoDate');

                    $('input[type="radio"][name="rdRenewTermEndDate"][value="EndDate"]').prop('checked', true);
                    $("#txtRenewEndDate").val($.datepicker.formatDate(DatepickerFormat, new Date($("#TermEndDate" + tbrowcount).text() == "" ? "" : $("#TermEndDate" + tbrowcount).text())));
                }
                else {
                    $("#ContractTermRenewChoicesNew").prop('disabled', false);
                    $("#ContractTermRenewNew").prop('disabled', false);
                    $("#ContractTermRenewNew").val($("#ContractTermEach" + tbrowcount).text());
                    $("#ContractTermRenewChoicesNew").val($("#ContractTermChoicesEach" + tbrowcount).text());
                    $("#txtRenewEndDate").prop('disabled', true);
                    $("#txtRenewEndDate").removeClass('form-contro-Date');
                    $("#txtRenewEndDate").addClass('form-contro-NoDate');


                    $('input[type="radio"][name="rdRenewTermEndDate"][value="Term"]').prop('checked', true);
                    calculateenddateRenew('txtRenewStartDate', 'ContractTermRenewChoicesNew', 'ContractTermRenewNew', 'txtRenewEndDate');
                }

                $("#txtRenewStatus").html(($("#TermStatus" + tbrowcount).html() == "" ? "" : $("#TermStatus" + tbrowcount).html()));
                $("#txtRenewStatus .edithide").hide();
                if ($("#TermStatus" + tbrowcount).text() == "Current" || $("#TermStatus" + tbrowcount).text() == "Ended" || $("#TermStatus" + tbrowcount).text() == "Expired") {
                    $("#ContractTermRenewChoicesNew").prop('disabled', true);
                    $("#ContractTermRenewNew").prop('disabled', true);
                    $("#ContractTermRenewNew").val($("#ContractTermEach" + tbrowcount).text());
                    $("#ContractTermRenewChoicesNew").val($("#ContractTermChoicesEach" + tbrowcount).text());
                    $("#txtRenewEndDate").prop('disabled', true);
                    $("#txtRenewEndDate").removeClass('form-contro-Date');
                    $("#txtRenewEndDate").addClass('form-contro-NoDate');
                    $("#txtRenewStartDate").prop('disabled', true);
                    $("#txtRenewStartDate").removeClass('form-contro-Date');
                    $("#txtRenewStartDate").addClass('form-contro-NoDate');
                    $('input[type="radio"][name="rdRenewTermEndDate"][value="EndDate"]').prop('disabled', true);
                    $('input[type="radio"][name="rdRenewTermEndDate"][value="Term"]').prop('disabled', true);
                    if ($("#TermStatus" + tbrowcount).text() == "Current") {
                        $('input[type="radio"][name="rdRenewTermEndDate"][value="EndDate"]').prop('checked', true);
                        $('input[type="radio"][name="rdRenewTermEndDate"][value="EndDate"]').prop('disabled', false);
                        $("#txtRenewEndDate").prop('disabled', false);
                        $("#txtRenewEndDate").addClass('form-contro-Date');
                        $("#txtRenewEndDate").removeClass('form-contro-NoDate');
                        var today = new Date();
                        if (today != null)
                            today = new Date(today.setDate(today.getDate() + 1));
                        $("#txtRenewEndDate").datepicker("option", "minDate", today);
                    }
                }
                else {
                    $("#txtRenewStartDate").prop('disabled', false);
                    $("#txtRenewStartDate").addClass('form-contro-Date');
                    $("#txtRenewStartDate").removeClass('form-contro-NoDate');
                    $('input[type="radio"][name="rdRenewTermEndDate"][value="EndDate"]').prop('disabled', false);
                    $('input[type="radio"][name="rdRenewTermEndDate"][value="Term"]').prop('disabled', false);
                }
                $("#txtRenewalNotesNew").val(($("#RenewalNotes" + tbrowcount).text() == "" ? "" : $("#RenewalNotes" + tbrowcount).text()));
                GetValuesAndAutoPopulate("ddlRenewalNotfInternalNew", ($("#RenewalNotificationInternal" + tbrowcount).text() == "" ? "" : $("#RenewalNotificationInternal" + tbrowcount).text()));
                //GetValuesAndAutoPopulate("ddlAuthorizedBy", ($("#RenewalConfirmParticipants" + tbrowcount).text() == "" ? "-" : $("#RenewalConfirmParticipants" + tbrowcount).text()));
                //GetValuesAndAutoPopulate("ddlRenewedBy", ($("#RenewedBy" + tbrowcount).text() == "" ? "-" : $("#RenewedBy" + tbrowcount).text()));
                $("#txtAuthorizRequired").val(($("#RequiresAuth" + tbrowcount).text() == "" ? "No" : $("#RequiresAuth" + tbrowcount).text()));
                var CheckList = ($("#RenewalChecklist" + tbrowcount).text() == "" ? "-" : $("#RenewalChecklist" + tbrowcount).text());
                if (CheckList != "" && CheckList != null && typeof (CheckList) != "undefined") {
                    var splitchecklt = CheckList.split(';');
                    $(splitchecklt).each(function (i, item) {
                        var valcheck = item.trim();
                        if (valcheck != "") {
                            $(':input[type=checkbox][value="' + valcheck + '"]').prop('checked', true);
                        }
                    });
                }
                RenewalItemEdit = term;
                RenewalAddFlag = false;
                $("#tdNameofTerms").html(term);
                isRenewTermClick = false;
                $("#btnAddNewTerm").html('<span class="pop_up_Content_Green">Ok</span>');
                $("#RenewalTermNew").dialog("option", "title", "Edit " + term);
                $("#RenewalTermNew").dialog("open");

                break;
            }
    }
}
function RequiresAuthchange() {
    var valcheckauth = $(':input[type=radio][name=RenewalAuth]:checked').val();
    if (valcheckauth == "Yes") {
        $("#RequiresAuthorizationYes").show();
        GetValuesAndAutoPopulate("ddlSendUserToRenewalConfirmUsers", contractItem.RenewalConfirmParticipants);
        $("#txtSendRenewReminderDayRenewalConfirm").val(contractItem.ContractConfirmSendTerm);
        $("#txtRenewConfirmSendDate").text($.datepicker.formatDate("mm/dd/yy", new Date(contrcatItem.ContractConfirmSendDate)));
        GetValuesAndAutoPopulate("ddlSendUserToRenewalConfirmUsersCC", contractItem.RenewalConfirmParticipantsCC);
        $("#ddlSendUserToRenewalConfirmUsers").addClass("validmultiselect");
        $("#txtSendRenewReminderDayRenewalConfirm").addClass("validelement");
    }
    else {
        $("#RequiresAuthorizationYes").hide();
        GetValuesAndAutoPopulate("ddlSendUserToRenewalConfirmUsers", "");
        $("#txtSendRenewReminderDayRenewalConfirm").val("");
        $("#txtRenewConfirmSendDate").text('');
        GetValuesAndAutoPopulate("ddlSendUserToRenewalConfirmUsersCC", "");
        $("#ddlSendUserToRenewalConfirmUsers").removeClass("validmultiselect");
        $("#txtSendRenewReminderDayRenewalConfirm").removeClass("validelement");

    }
}
function RenewalConfirmAuto() {
    var valcheckauth = $(':input[type=radio][name=RenewalConfirmAuto]:checked').val();
    if (valcheckauth == "Yes") {
        $("#divRenewalConfirmAuto").show();
        $('input[type="radio"][name="RenewalAuth"][value="No"]').prop('checked', true);
        RequiresAuthchange();
        $("#txtContractTermRenewSet").val(contractItem.ContractAutoTerm);
        $("#txtContractTermRenewSet").addClass("validelement");
        $("#ddlTermPeriodSet").val(contractItem.ContractAutoTermChoices);
        if (contrcatItem.AutoContractRenewTermCount != "") {
            if ($("#ddlTermPeriodSetRenewal option[value='" + contrcatItem.AutoContractRenewTermCount + "']").length > 0 && !($("#ddlTermPeriodSetRenewal option[value='" + contrcatItem.AutoContractRenewTermCount + "']").css('display') == "none"))
                $("#ddlTermPeriodSetRenewal").val(contrcatItem.AutoContractRenewTermCount);
            else
                $("#ddlTermPeriodSetRenewal").val("Unlimited");
        }
        else
            $("#ddlTermPeriodSetRenewal").val("Unlimited");
        $("#AutoContractRenewOn").val(contractItem.RenewalDate);
        $(".ManRenewal").css('display', 'none');
        $(".autoRenewal").css('display', 'none');
    }
    else {
        $("#divRenewalConfirmAuto").hide();
        $("#txtContractTermRenewSet").val("");
        $("#txtContractTermRenewSet").removeClass("validelement");
        $("#ddlTermPeriodSet").val("");
        $("#ddlTermPeriodSetRenewal").val("");
        $("#AutoContractRenewOn").val("");
        $(".ManRenewal").css('display', '');
        $(".autoRenewal").css('display', '');

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
        if (resValue != "" && resValue != "-") {
            if ($('#' + controlname + ' option[value="' + resValue + '"]').length > 0 && multiarr.indexOf(resValue) == -1)
                multiarr.push(resValue);
        }
    }
    if (multiarr.length > 0)
        ChosenOrder.setSelectionOrder($('#' + controlname), multiarr, true);

}


function changecontracttermtype(ddlvalue) {
    TermTypeChange(ddlvalue.value);
}
var sContractTermType = "";
function TermTypeChange(vTermType) {
    sContractTermType = vTermType;
    ContractTermAutoRenewalNo();
    var fContractTermRenewOn = '';
    if ($("#txtContractTermRenewOn").val() != "" && $("#txtContractTermRenewOn").val() != null) {
        fContractTermRenewOn = $.datepicker.formatDate('mm/dd/yy', $("#txtContractTermRenewOn").datepicker('getDate'));
    }
    if (vTermType == "Fixed Term") {
        $("#spTermTypeDesc").html('<br>' + TermTypeHelpText[vTermType]);
        $("#trContractTermDates1").css('display', '');
        $("#trContractTermDates2").css('display', '');
        $("#trContractTermSettings1").css('display', 'none');
        $("#trContractTermSettings2").css('display', 'none');
        $("#trContractTermReminders1").css('display', '');
        $("#trContractTermReminders2").css('display', '');
        $("#btnContractTermRenew").css('display', 'none');
        $("#btnContractTermExpire").css('display', 'none');

        $("#btnContractTermSave").css('display', '');
        $("#btnContractTermClose").css('display', '');

        $("#tdContractTermStartDateLbl").html('Start / Effective Date <img src="../Content/Images/input-help.png" title="Select the date from which the Contract Record becomes active. ">');
        $("#trContractTermStartDate").css('display', '');
        $("#trContractTermEvaluationDate").css('display', '');
        $("#trContractTermEndDate").css('display', '');
        $("#trContractTermStartDateRenew").css('display', 'none');
        $("#trContractTermEndDateRenew").css('display', 'none');
        $("#trContractNextTermEndDateRenew").css('display', 'none');
        $("#trContractRenewalConfirmText").css('display', 'none');
        $("#trContractRenewalConfirm").css('display', 'none');
        $("#trContractRenewalConfirmTextAuto").css('display', 'none');
        $("#trContractRenewalConfirmAuto").css('display', 'none');
        $("#trContractRenewalConfirmTextCounterparty").css('display', 'none');
        $("#trContractRenewalConfirmCounterparty").css('display', 'none');
        $("#trContractConfirmTextCounterparty").css('display', '');
        $("#trContractConfirmCounterparty").css('display', '');


        // $("#trContractRenewalConfirmTextCounterparty").css('display', '');
        // $("#trContractRenewalConfirmCounterparty").css('display', '');
        $("#trContractRenewalHistoryText").css('display', 'none');
        $("#trContractRenewalHistory").css('display', 'none');
        $("#trContractRenewNext").css('display', 'none');
        $("#trContractTermRenewal").css('display', 'none');
        $("#trContractTermRenewalSec").css('display', 'none');
        $("#ddlSendUserToRenewalConfirmUsers").removeClass("validmultiselect");
        $("#txtSendRenewReminderDayRenewalConfirm").removeClass("validelement");
        $("#txtContractTermRenewSet").removeClass("validelement");
        var vRenewReminderDate = '<option value="Start / Effective Date">Start / Effective Date</option>';
        vRenewReminderDate += '<option value="Next Evaluation Date">Next Evaluation Date</option>';
        vRenewReminderDate += '<option value="End Date (Overall Contract)">End Date (Overall Contract Record)</option>';
        $("#ddlSendRenewReminderDate1").html(vRenewReminderDate);
        $("#ddlSendRenewReminderDate2").html(vRenewReminderDate);
        $("#ddlSendRenewReminderDate3").html(vRenewReminderDate);
        $(".NoTerms").css('display', 'none');
    } else if (vTermType == "Evergreen / Perpetual") {
        $("#spTermTypeDesc").html('<br>' + TermTypeHelpText[vTermType]);
        $("#trContractTermDates1").css('display', '');
        $("#trContractTermDates2").css('display', '');
        $("#trContractTermSettings1").css('display', 'none');
        $("#trContractTermSettings2").css('display', 'none');
        $("#trContractTermReminders1").css('display', '');
        $("#trContractTermReminders2").css('display', '');
        $("#btnContractTermRenew").css('display', 'none');
        $("#btnContractTermExpire").css('display', 'none');
        $("#btnContractTermSave").css('display', '');
        $("#btnContractTermClose").css('display', '');

        $("#tdContractTermStartDateLbl").html('Start / Effective Date <img src="../Content/Images/input-help.png" title="Select the date from which the Contract Record becomes active.">');
        $("#trContractTermStartDate").css('display', '');
        $("#trContractTermEvaluationDate").css('display', '');
        $("#trContractTermEndDate").css('display', 'none');
        $("#trContractTermStartDateRenew").css('display', 'none');
        $("#trContractTermEndDateRenew").css('display', 'none');
        $("#trContractNextTermEndDateRenew").css('display', 'none');
        $("#trContractRenewalConfirmText").css('display', 'none');
        $("#trContractRenewalConfirm").css('display', 'none');
        $("#trContractRenewalConfirmTextAuto").css('display', 'none');
        $("#trContractRenewalConfirmAuto").css('display', 'none');
        $("#trContractRenewalConfirmTextCounterparty").css('display', 'none');
        $("#trContractRenewalConfirmCounterparty").css('display', 'none');
        $("#trContractConfirmTextCounterparty").css('display', '');
        $("#trContractConfirmCounterparty").css('display', '');
        // $("#trContractRenewalConfirmTextCounterparty").css('display', '');
        // $("#trContractRenewalConfirmCounterparty").css('display', '');
        $("#trContractRenewalHistoryText").css('display', 'none');
        $("#trContractRenewalHistory").css('display', 'none');
        $("#trContractRenewNext").css('display', 'none');
        $("#trContractTermRenewal").css('display', 'none');
        $("#trContractTermRenewalSec").css('display', 'none');
        $("#ddlSendUserToRenewalConfirmUsers").removeClass("validmultiselect");
        $("#txtSendRenewReminderDayRenewalConfirm").removeClass("validelement");
        $("#txtContractTermRenewSet").removeClass("validelement");
        var vRenewReminderDate = '<option value="Start / Effective Date">Start / Effective Date</option>';
        vRenewReminderDate += '<option value="Next Evaluation Date">Next Evaluation Date</option>';
        $("#ddlSendRenewReminderDate1").html(vRenewReminderDate);
        $("#ddlSendRenewReminderDate2").html(vRenewReminderDate);
        $("#ddlSendRenewReminderDate3").html(vRenewReminderDate);
        $(".NoTerms").css('display', 'none');
        //Sridhar
        $("#EndDate").val('');
    } else if (vTermType == "Executed / Performance") {
        $("#spTermTypeDesc").html('<br>' + TermTypeHelpText[vTermType]);
        $("#trContractTermDates1").css('display', '');
        $("#trContractTermDates2").css('display', '');
        $("#trContractTermSettings1").css('display', 'none');
        $("#trContractTermSettings2").css('display', 'none');
        $("#trContractTermReminders1").css('display', '');
        $("#trContractTermReminders2").css('display', '');
        $("#btnContractTermRenew").css('display', 'none');
        $("#btnContractTermExpire").css('display', 'none');

        $("#btnContractTermSave").css('display', '');
        $("#btnContractTermClose").css('display', '');

        $("#tdContractTermStartDateLbl").html('Date of Execution / Performance <img src="../Content/Images/input-help.png" title="Select the date on which the Contract Record is being executed.">');
        $("#trContractTermStartDate").css('display', '');
        $("#trContractTermEvaluationDate").css('display', 'none');
        $("#trContractTermEndDate").css('display', 'none');
        $("#trContractTermStartDateRenew").css('display', 'none');
        $("#trContractTermEndDateRenew").css('display', 'none');
        $("#trContractNextTermEndDateRenew").css('display', 'none');
        $("#trContractRenewalConfirmText").css('display', 'none');
        $("#trContractRenewalConfirm").css('display', 'none');
        $("#trContractRenewalConfirmTextAuto").css('display', 'none');
        $("#trContractRenewalConfirmAuto").css('display', 'none');
        $("#trContractRenewalConfirmTextCounterparty").css('display', 'none');
        $("#trContractRenewalConfirmCounterparty").css('display', 'none');
        $("#trContractConfirmTextCounterparty").css('display', '');
        $("#trContractConfirmCounterparty").css('display', '');
        // $("#trContractRenewalConfirmTextCounterparty").css('display', '');
        // $("#trContractRenewalConfirmCounterparty").css('display', '');
        $("#trContractRenewalHistoryText").css('display', 'none');
        $("#trContractRenewalHistory").css('display', 'none');
        $("#trContractRenewNext").css('display', 'none');
        $("#trContractTermRenewal").css('display', 'none');
        $("#trContractTermRenewalSec").css('display', 'none');
        $("#ddlSendUserToRenewalConfirmUsers").removeClass("validmultiselect");
        $("#txtSendRenewReminderDayRenewalConfirm").removeClass("validelement");
        $("#txtContractTermRenewSet").removeClass("validelement");
        var vRenewReminderDate = '<option value="Date of Execution / Performance">Date of Execution / Performance</option>';
        $("#ddlSendRenewReminderDate1").html(vRenewReminderDate);
        $("#ddlSendRenewReminderDate2").html(vRenewReminderDate);
        $("#ddlSendRenewReminderDate3").html(vRenewReminderDate);
        $(".NoTerms").css('display', 'none');
        //Sridhar
        $("#EndDate").val('');
    } else if (vTermType == "Renewable") {
        $("#spTermTypeDesc").html('<br>' + TermTypeHelpText[vTermType]);
        $("#trContractTermDates1").css('display', 'none');
        $("#trContractTermDates2").css('display', 'none');
        $("#trContractTermSettings1").css('display', 'none');
        $("#trContractTermSettings2").css('display', 'none');
        $("#trContractTermReminders1").css('display', '');
        $("#trContractTermReminders2").css('display', '');
        $("#btnContractTermRenew").css('display', 'none');
        var vRenewReminderDate = '<option value="Start / Effective Date">Start / Effective Date</option>';
        vRenewReminderDate += '<option value="End Date (Overall Contract)">End Date (Overall Contract Record)</option>';
        vRenewReminderDate += '<option value="Current Term Ends">Current Term Ends</option>';
        vRenewReminderDate += '<option value="Renew On">Renew On</option>';
        $("#ddlSendRenewReminderDate1").html(vRenewReminderDate);
        $("#ddlSendRenewReminderDate2").html(vRenewReminderDate);
        $("#ddlSendRenewReminderDate3").html(vRenewReminderDate);
        $('input[type="radio"][name="RenewalAuth"][value="Yes"]').prop('disabled', false);
        $('input[type="radio"][name="RenewalAuth"][value="No"]').prop('disabled', false);
        var vRenewReminderDate = '<option value="Term Starts">Current Term Start Date</option>';
        //vRenewReminderDate += '<option value="End Date (Overall Contract)">End Date (Overall Contract Record)</option>';
        vRenewReminderDate += '<option value="Current Term Ends">Current Term End Date</option>';
        //vRenewReminderDate += '<option value="Renew On">Renew On</option>';
        $("#ddlSendRenewReminderDate1").html(vRenewReminderDate);
        $("#ddlSendRenewReminderDate2").html(vRenewReminderDate);
        $("#ddlSendRenewReminderDate3").html(vRenewReminderDate);
        $("#ContractAutoTerm").removeClass("validmultiselect");
        $("#RenewalConfirmParticipants").removeClass("validelement");
        $("#ContractConfirmSendTerm").removeClass("validelement");
        //if (sContractTermType == "Renewable") {

        //} else {
        //    $('input[type="radio"][name="TermAutoRenewal"][value="No"]').prop('checked', true);
        //    $("#btnContractTermRenew").css('display', 'none');
        //    $("#btnContractTermExpire").css('display', 'none');


        //    var vDT = new Date();
        //    if ($("#txtContractTermStartDate").val() != '') {
        //        var ftxtContractTermStartDate = '';
        //        ftxtContractTermStartDate = $.datepicker.formatDate('mm/dd/yy', $("#txtContractTermStartDate").datepicker('getDate'));
        //        vDT = new Date(ftxtContractTermStartDate);
        //        vDT = moment(vDT).add(1, 'year').format('MM/DD/YYYY');
        //        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
        //        { vDT = moment(new Date(vDT)).format('MM/DD/YYYY'); }
        //        else { vDT = moment(new Date(vDT)).format(localStorage.AppDateFormat); }
        //        $("#txtContractTermEnds").val(vDT);
        //        $("#txtContractTermRenewOn").val(vDT);
        //    }
        //    if ($("#txtContractTermEnds").val() != '') {
        //        $("#txtContractTermRenewOn").val($("#txtContractTermEnds").val());
        //    }
        //    if ($("#txtContractTermRenewOn").val() != '') {
        //        if (fContractTermRenewOn != "" && fContractTermRenewOn != null) {
        //            vDT = new Date(fContractTermRenewOn);
        //            vDT = moment(vDT).add(60, 'days').format('MM/DD/YYYY');
        //            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
        //            { vDT = moment(new Date(vDT)).format('MM/DD/YYYY'); }
        //            else { vDT = moment(new Date(vDT)).format(localStorage.AppDateFormat); }
        //            if ($('input[type="radio"][name=TermAutoRenewal]:checked').val() == "No")
        //                $("#txtContractTermExpireOn").val(vDT);
        //        }
        //        else {
        //            $("#txtContractTermRenewOn").val($("#txtContractTermEnds").val());
        //            if ($("#txtContractTermRenewOn").val() != "" && $("#txtContractTermRenewOn").val() != null) {
        //                fContractTermRenewOn = $.datepicker.formatDate('mm/dd/yy', $("#txtContractTermRenewOn").datepicker('getDate'));
        //            }
        //            vDT = new Date(fContractTermRenewOn);
        //            vDT = moment(vDT).add(60, 'days').format('MM/DD/YYYY');
        //            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
        //            { vDT = moment(new Date(vDT)).format('MM/DD/YYYY'); }
        //            else { vDT = moment(new Date(vDT)).format(localStorage.AppDateFormat); }
        //            if ($('input[type="radio"][name=TermAutoRenewal]:checked').val() == "No")
        //                $("#txtContractTermExpireOn").val(vDT);
        //        }
        //    }
        //}
        $("#btnContractTermSave").css('display', '');
        $("#btnContractTermClose").css('display', '');

        $("#tdContractTermStartDateLbl").html('Start / Effective Date <img src="../Content/Images/input-help.png" title="Select the date from which the Contract Record becomes active.">');
        $("#trContractTermStartDate").css('display', 'none');
        $("#trContractTermStartDateRenew").css('display', '');
        $("#trContractTermEndDateRenew").css('display', '');
        $("#trContractNextTermEndDateRenew").css('display', '');
        $("#trContractRenewalConfirmText").css('display', '');
        $("#trContractRenewalConfirm").css('display', '');
        $("#trContractRenewalConfirmTextAuto").css('display', '');
        $("#trContractRenewalConfirmAuto").css('display', '');
        //$("#trContractRenewalConfirmTextCounterparty").css('display', 'none');
        //$("#trContractRenewalConfirmCounterparty").css('display', 'none');
        $("#trContractConfirmTextCounterparty").css('display', 'none');
        $("#trContractConfirmCounterparty").css('display', 'none');
        $("#trContractRenewalConfirmTextCounterparty").css('display', '');
        $("#trContractRenewalConfirmCounterparty").css('display', '');
        $("#trContractRenewalHistoryText").css('display', '');
        $("#trContractRenewalHistory").css('display', '');
        $("#trContractRenewNext").css('display', '');
        $("#trContractTermRenewal").css('display', 'none');
        $("#trContractTermRenewalSec").css('display', 'none');
        $("#trContractTermEvaluationDate").css('display', 'none');
        $("#trContractTermEndDate").css('display', 'none');
        GetRenewalAll();
        $("#AddInitialTerm").css("display", "");
        $("#AddRenewalTerm").css("display", "none");
        $("#ddlSendUserToRenewalConfirmUsers").removeClass("validmultiselect");
        $("#txtSendRenewReminderDayRenewalConfirm").removeClass("validelement");
        $("#txtContractTermRenewSet").removeClass("validelement");
        $(".NoTerms").css('display', '');
        //$(".ManRenewal").css('display', 'none');
    } else {
        $("#spTermTypeDesc").html('');
        $("#trContractTermDates1").css('display', 'none');
        $("#trContractTermDates2").css('display', 'none');
        $("#trContractTermSettings1").css('display', 'none');
        $("#trContractTermSettings2").css('display', 'none');
        $("#trContractTermReminders1").css('display', 'none');
        $("#trContractTermReminders2").css('display', 'none');
        $("#btnContractTermRenew").css('display', 'none');
        $("#btnContractTermExpire").css('display', 'none');
        $("#btnContractTermCancel").css('display', 'none');
        $("#btnContractTermSave").css('display', 'none');
        $("#btnContractTermClose").css('display', 'none');
        $("#trContractTermStartDateRenew").css('display', 'none');
        $("#trContractTermEndDateRenew").css('display', 'none');
        $("#trContractNextTermEndDateRenew").css('display', 'none');
        $("#trContractRenewalConfirmText").css('display', 'none');
        $("#trContractRenewalConfirm").css('display', 'none');
        $("#trContractRenewalConfirmTextAuto").css('display', 'none');
        $("#trContractRenewalConfirmAuto").css('display', 'none');
        $("#trContractRenewalConfirmTextCounterparty").css('display', 'none');
        $("#trContractRenewalConfirmCounterparty").css('display', 'none');
        $("#trContractConfirmTextCounterparty").css('display', 'none');
        $("#trContractConfirmCounterparty").css('display', 'none');
        $("#trContractRenewalHistoryText").css('display', 'none');
        $("#trContractRenewalHistory").css('display', 'none');
        $("#trContractRenewNext").css('display', 'none');
        $("#trContractTermRenewal").css('display', 'none');
        $("#trContractTermRenewalSec").css('display', 'none');
        //$("#tdContractTermStartDateLbl").html('Start / Effective Date');
        //$("#trContractTermStartDate").css('display', 'none');
        //$("#trContractTermEvaluationDate").css('display', 'none');
        //$("#trContractTermEndDate").css('display', 'none');
        $("#ddlSendUserToRenewalConfirmUsers").removeClass("validmultiselect");
        $("#txtSendRenewReminderDayRenewalConfirm").removeClass("validelement");
        $("#txtContractTermRenewSet").removeClass("validelement");
        $(".NoTerms").css('display', 'none');
    }
    var arrstatus = ["Ready for Signature", "Awaiting Signatures", "Signed", "Active", "Up for Renewal", "Renewed", "Extended", "On Hold", "Replaced", "Expired", "Cancelled", "Terminated", "Archived", "About to Expire"];
    if (contrcatItem.ContractTermType != "" && contrcatItem.ContractTermType != "0" && arrstatus.indexOf(contrcatItem.Status) > -1) {
        $("#btnContractTermCancel").show();
        if (contrcatItem.ContractTermType == "Renewable") {
            $("#btnContractTermExpire").show();

        }
        else {
            $("#btnContractTermExpire").hide();
        }
    }
    else {
        $("#btnContractTermCancel").hide();
    }
}

$('#hdCurrentRenewalTermEnd').change(function () {
    calculateenddateRenewSub('hdCurrentRenewalTermEnd', 'ContractNextTermChoicesRenewCounter', 'txtSendRenewReminderDayRenewalCounter', 'txtRenewConfirmRenewalCounter');
    calculateenddateRenewSub('hdCurrentRenewalTermEnd', 'ContractNextTermChoicesCancelCounter', 'txtSendRenewReminderDayCancelCounter', 'txtRenewConfirmCancelCounter');
    calculateenddateRenewSub('hdCurrentRenewalTermEnd', 'ContractNextTermChoicesRenewConfirm', 'txtSendRenewReminderDayRenewalConfirm', 'txtRenewConfirmSendDate');
});

//Sridhar
function BindContractTermTypeddl() {
    $("#ddlTermType").empty();
    $("#ddlTermType").append("<option value='0'>--Select--</option>");
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracttermtypesenabled',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        cache: false,
        async: false,
        success: function (data) {
            var datalength = data.length;
            for (var i = 0; i < datalength; i++) {
                var itemname = data[i];
                $("#ddlTermType").append("<option value='" + itemname.ContractTermName + "'>" + itemname.ContractTermDisplayName + "</option>");
                TermTypeHelpText[data[i].ContractTermName] = data[i].HelpText;
                TermTypeDisplayName[data[i].ContractTermName] = data[i].ContractTermDisplayName;
            }
        },
        error: function (data) {
        }
    });
    $("#ddlTermType").val('0');
}

function DefaultGlobalsettings() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/GlobalSettings?accountid=' + localStorage.AccountID,
        type: 'GET',
        dataType: 'json',
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        contentType: 'application/json',
        cache: false,
        success: function (status) {
            localStorage.setItem("RestrictHighSecurityTagging", status.RestrictHighSecurityTagging);
            //*Harshitha 
            defaultGlobalSettings = status;
        },
        error: function (status) {
            localStorage.setItem("RestrictHighSecurityTagging", "No");
        }
    });
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function bindAuthoriseUsers(contractItem) {
    $("#ddlSendUserToRenewalConfirmUsers").empty();
    $("#ddlSendUserToRenewalConfirmUsersCC").empty();
    var article = '';
    var authorisedUsersusers = [];
    if (contractItem.FullControlPermissions != null && contractItem.FullControlPermissions != "") {
        if (contractItem.FullControlPermissions.indexOf(';') > -1) {
            var users = contractItem.FullControlPermissions.split(';');
            $.each(users, function (index, value) {
                authorisedUsersusers.push(value.trim());
            });
        }
        else {
            authorisedUsersusers.push(contractItem.FullControlPermissions);
        }
    }

    if (contractItem.ReadWritePermissions != null && contractItem.ReadWritePermissions != "") {
        if (contractItem.ReadWritePermissions.indexOf(';') > -1) {
            var users = contractItem.ReadWritePermissions.split(';');
            $.each(users, function (index, value) {
                authorisedUsersusers.push(value.trim());
            });
        }
        else {
            authorisedUsersusers.push(contractItem.ReadWritePermissions);
        }
    }
    if (contractItem.BusinessAreaOwners != null && contractItem.BusinessAreaOwners != "") {
        if (contractItem.BusinessAreaOwners.indexOf(';') > -1) {
            var users = contractItem.BusinessAreaOwners.split(';');
            $.each(users, function (index, value) {
                authorisedUsersusers.push(value.trim());
            });
        }
        else {
            authorisedUsersusers.push(contractItem.BusinessAreaOwners);
        }
    }
    if (allUsersList.length == 0) {
        GetUserList();
    }
    var allGlobalContractOwners = $.grep(allUsersList, function (item, i) {
        return item.UserType.indexOf('Global Contract Owner') > -1;
    });
    var allBusinessAreaFullControl = $.grep(allUsersList, function (item, i) {
        return typeof item.BusinessArea != 'undefined' && item.BusinessArea.indexOf(contractItem.BusinessArea) > -1;//BusinessArea Null Issue
    });
    var allBusinessAreaReadWrite = $.grep(allUsersList, function (item, i) {
        return typeof item.BusinessAreaContribute != 'undefined' && item.BusinessAreaContribute.indexOf(contractItem.BusinessArea) > -1;//BusinessArea Null Issue
    });

    authorisedUsersusers.push(localStorage.UserName);

    if (contractItem.ContractManagers != "" && contractItem.ContractManagers != null) {
        if (contractItem.ContractManagers.indexOf(';') > -1) {
            var users = contractItem.ContractManagers.split(';');
            $.each(users, function (index, value) {
                authorisedUsersusers.push(value.trim());
            });
        }
        else {
            authorisedUsersusers.push(contractItem.ContractManagers);
        }
    }
    $.each(allGlobalContractOwners, function (index, value) {
        authorisedUsersusers.push(value.UserName.trim());
    });
    $.each(allBusinessAreaFullControl, function (index, value) {
        authorisedUsersusers.push(value.UserName.trim());
    });
    $.each(allBusinessAreaReadWrite, function (index, value) {
        authorisedUsersusers.push(value.UserName.trim());
    });

    authorisedUsersusers = $.grep(authorisedUsersusers, function (n) { return (n); });

    authorisedUsersusers = authorisedUsersusers.filter(function (elem, index, self) {
        return index == self.indexOf(elem);
    });

    $.each(authorisedUsersusers, function (index, value) {
        article += '<option value="' + value.trim() + '">' + value.trim() + '</option>';
    });
    $("#ddlSendUserToRenewalConfirmUsers").append(article);
    $("#ddlSendUserToRenewalConfirmUsersCC").append(article);
    $("#ddlSendUserToRenewalConfirmUsers").chosen();
    $("#ddlSendUserToRenewalConfirmUsersCC").chosen();
}


//Added from 2.4final to 2.4
//function ApplyPermissionToAuthorizers(contractItem, RenewalConfirmParticipants) {
//    var status = "No";
//    var vIsPublic = "No";
//    var FullPermission = "";
//    var ReadwritePermission = "";
//    var ReadOnlypermission = "";
//    var spliptParticipant = [];
//    var Participant = "";
//    var splitPermission = [];
//    FullPermission = contractItem.FullControlPermissions;
//    ReadwritePermission = contractItem.ReadWritePermissions;
//    ReadOnlypermission = contractItem.ReadOnlyPermissions;

//    if (RenewalConfirmParticipants.indexOf(';') > -1) {
//        spliptParticipant = RenewalConfirmParticipants.split(';');
//    }
//    else {
//        Participant = RenewalConfirmParticipants;
//    }

//    if (ReadwritePermission != null) {
//        if (ReadwritePermission.indexOf(';') > -1) {
//            splitPermission = ReadwritePermission.split(';');
//            if (spliptParticipant != 0) {
//                $(spliptParticipant).each(function (i, item) {
//                    if (splitPermission.indexOf(item) > -1) {
//                    }
//                    else {
//                        ReadwritePermission += ";" + item;
//                    }

//                });
//            }
//            else {
//                if (splitPermission.indexOf(Participant) > -1) {
//                }
//                else {
//                    ReadwritePermission += ";" + Participant;
//                }

//            }

//        }
//        else {
//            if (spliptParticipant != 0) {
//                $(spliptParticipant).each(function (i, item) {
//                    if (ReadwritePermission == item) {
//                    }
//                    else {
//                        ReadwritePermission += ";" + item;
//                    }

//                });
//            }
//            else {
//                if (ReadwritePermission != Participant) {
//                    ReadwritePermission += ";" + Participant;
//                }
//            }
//        }
//    }

//    $.ajax({
//        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + getParameterByName("ContractID") + '/permission',
//        type: 'PUT',
//        dataType: 'json',
//        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
//        data: {
//            ReadOnlyPermissions: ReadOnlypermission,
//            ReadWritePermissions: ReadwritePermission,
//            FullControlPermissions: FullPermission,
//            CustomPermission: status,
//            IsPublic: vIsPublic,
//            ModifiedBy: localStorage.UserName
//        },
//        cache: false,
//        success: function (data) {
//            BindContractItem();  //eO37427
//        },
//        error: function (data) {

//        }

//    });
//}

//Sridhar
function SingleMultipleTerms() {
    var valcheckauth = $(':input[type=radio][name=TermsSingleMultiple]:checked').val();
    if (valcheckauth == "Yes") {
        $(".trSingle").css('display', '');
        $(".trMultiple").css('display', 'none');
        $('#txtRenewStartDate').datepicker('destroy');
        $('#txtRenewStartDate').datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: DatepickerFormat,
            onSelect: function (selected) {
                var dt2 = $('#txtRenewEndDate');
                var startDate = $(this).datepicker('getDate');
                startDate.setDate(startDate.getDate() + 1);
                dt2.datepicker('option', 'minDate', startDate);
                calculateenddateRenew('txtRenewStartDate', 'ContractTermRenewChoicesNew', 'ContractTermRenewNew', 'txtRenewEndDate');
            }
        }).click(function () {
            $(this).focus()
        });

        AddRenewalTerm(false, false);


        $("#txtRenewStartDate").removeAttr("onchange");
        $("#txtRenewStartDate").attr("onchange", "calculateenddateRenew('txtRenewStartDate', 'ContractTermRenewChoicesNew', 'ContractTermRenewNew', 'txtRenewEndDate')");
    }
    else {
        $(".trSingle").css('display', 'none');
        $(".trMultiple").css('display', '');

        $('#txtRenewStartDate').datepicker('destroy');
        $('#txtRenewStartDate').datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: DatepickerFormat,
            onSelect: function (selected) {
                var dt2 = $('#txtRenewEndDate');
                var startDate = $(this).datepicker('getDate');
                startDate.setDate(startDate.getDate() + 1);
                dt2.datepicker('option', 'minDate', startDate);
                calculateenddateRenew('txtRenewStartDate', 'ddlTermPeriodSetMulti', 'txtContractTermRenewSetMulti', 'txtRenewEndDate');
            }
        }).click(function () {
            $(this).focus()
        });
        AddRenewalTerm(true, false);
        $("#ddlTermPeriodSetRenewal").change();

        $("#txtRenewStartDate").removeAttr("onchange");
        $("#txtRenewStartDate").attr("onchange", "calculateenddateRenew('txtRenewStartDate', 'ddlTermPeriodSetMulti', 'txtContractTermRenewSetMulti', 'txtRenewEndDate')");
        

    }
}

$("#ddlTermPeriodSetRenewal").change(function () {
    var length = $("#renewalViewHistoryTerm tr").length;
    var selectedTerm = $(this).find('option:selected').val();
    var selectedTermCount = selectedTerm.replace("Renewal ", "");
    if (length != 0) {
        var lastStatus = $('#renewalViewHistoryTerm tr:last').find('td:eq(5)').text();
        var el = '', TermNameLast = '';
        if (lastStatus != "Expired") {
            el = $('#renewalViewHistoryTerm tr:last').find('td:eq(3)');
            TermNameLast = $("#renewalViewHistoryTerm tr:last td:first").text();
        }
        else {
            el = $('#renewalViewHistoryTerm tr').find('td:contains(Expired)').first().parent().prev().find('td:eq(3)');
            TermNameLast = $('#renewalViewHistoryTerm tr').find('td:contains(Expired)').first().parent().prev().find('td:first').text();
        }

        var countTerm = '';
        if (TermNameLast == "Initial Term") {
            countTerm = "0";
        }
        else {
            countTerm = TermNameLast.replace("Renewal ", "");
        }
        countTerm = parseInt(countTerm);
        var valdate = el != null && typeof (el) != "undefined" ? $(el).text() : "";
        if (valdate != "") {
            var termNames = '';
            do {
                termNames += ' Renewal ' + (countTerm + 1) + ',';
                countTerm++;
            } while (parseInt(selectedTermCount) > countTerm)
            termNames = termNames.slice(0, -1);
            $("#tdNameofTerms").html(termNames);
        }
    }
    else {
        //var el = $('#renewalViewHistoryTerm tr:last').find('td:eq(3)');
        //var TermNameLast = $("#renewalViewHistoryTerm tr:last td:first").text();
        var countTerm = 0;
        //countTerm = parseInt(countTerm);
        //var valdate = el != null && typeof (el) != "undefined" ? $(el).text() : "";
        //if (valdate != "") {
        var termNames = 'Initial Term,';
        do {
            termNames += ' Renewal ' + (countTerm + 1) + ',';
            countTerm++;
        } while (parseInt(selectedTermCount) > countTerm)
        termNames = termNames.slice(0, -1);
        $("#tdNameofTerms").html(termNames);
        //}
    }
})

function getTermCommentsXML(TermName, vStartDate, vEndDate, vNextEvalDate) {
    var activityXML = '';
    var user = localStorage.UserName;
    var vtime = moment(new Date()).format('MMMM Do YYYY, h:mm A');
    var conStartDate = contractItem.StartDate != null ? moment(contractItem.StartDate).format('MM/DD/YYYY') : null;
    var conEndDate = contractItem.EndDate != null ? moment(contractItem.EndDate).format('MM/DD/YYYY') : null;
    var conNextEvalDate = contractItem.NextEvaluationDate != null ? moment(contractItem.NextEvaluationDate).format('MM/DD/YYYY') : null;
    if (contractItem.ContractTermType == "")
        activityXML += user + ' has setup the term on ' + vtime;
    else if (contractItem.ContractTermType != TermName)
        activityXML += user + ' has changed the term from ' + contractItem.ContractTermType + ' to ' + TermName + ' on ' + vtime;
    else if (conStartDate != null && conStartDate != vStartDate)
        activityXML += user + ' has changed the term Start Date from ' + conStartDate + ' to ' + vStartDate + ' on ' + vtime;
    else if (conEndDate != null && conEndDate != vEndDate)
        activityXML += user + ' has changed the term End Date from ' + conEndDate + ' to ' + vEndDate + ' on ' + vtime;
    else if (conNextEvalDate != null && conNextEvalDate != vNextEvalDate)
        activityXML += user + ' has changed the term Next Evaluation Date from ' + conNextEvalDate + ' to ' + vNextEvalDate + ' on ' + vtime;
    else
        return "";

    var existRenewalCommentsXML = '';
    if (typeof RecvMetadatavaluetofinalize != "undefined" && RecvMetadatavaluetofinalize != '') {
        if ($(RecvMetadatavaluetofinalize).find("TermCommentsXML").length > 0) {
            existRenewalCommentsXML = $(RecvMetadatavaluetofinalize).find("TermCommentsXML").find("RenewalComments");
        }
    }

    var existingXML = '';
    existingXML += '<RenewalComments>';
    if (existRenewalCommentsXML != null && existRenewalCommentsXML != '') {
        $(existRenewalCommentsXML).find('RenewalComment').each(function () {
            var activity = $(this).find('Activity').text();
            var comment = $(this).find('Comments').text();
            var sendton = $(this).find('SendTo').text();
            var created = $(this).find('Created').text();
            existingXML += '<RenewalComment>';

            existingXML += '<Activity>';
            existingXML += activity;
            existingXML += '</Activity>';

            existingXML += '<Comments>';
            existingXML += comment;
            existingXML += '</Comments>';

            existingXML += '<SendTo>';
            existingXML += sendton;
            existingXML += '</SendTo>';

            existingXML += '<Created>';
            existingXML += created;
            existingXML += '</Created>';
            existingXML += '</RenewalComment>';

        });
    }
    existingXML += '<RenewalComment>';
    existingXML += '<Activity>';
    existingXML += activityXML;
    existingXML += '</Activity>';

    existingXML += '<Comments>';
    existingXML += '</Comments>';

    existingXML += '<SendTo>';
    existingXML += '</SendTo>';

    existingXML += '<Created>';
    existingXML += moment(new Date());
    existingXML += '</Created>';

    existingXML += '</RenewalComment>';
    existingXML += '</RenewalComments>';
    return existingXML;

}

//function calculateenddateMultiple() {
//    var valcheckauth = $(':input[type=radio][name=TermsSingleMultiple]:checked').val();
//    if (valcheckauth == "Yes") {
//        calculateenddateRenew('txtRenewStartDate', 'ContractTermRenewChoicesNew', 'ContractTermRenewNew', 'txtRenewEndDate', 'txtRenewStatus')
//    }
//    else {
//        calculateenddateRenew('txtRenewStartDate', 'ddlTermPeriodSetMulti', 'txtContractTermRenewSetMulti', 'txtRenewEndDate')
//    }
//}