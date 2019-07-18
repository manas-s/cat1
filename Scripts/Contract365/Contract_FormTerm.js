var vUserList = "";
var contractItem;
var EndDateCheck = "";
var EndDateCheckRenewal = "";
var CurrentTermDetails = "";
var vContractID = ''
var renewalPrevDate;
var RenewalAddFlag = false;
var RenewalItemEdit = "";
var DatepickerFormat = '';
var NextTermRenewFlag = false;
var maxAllowedDate;
var RenewalName = "";
var EditSaveFlag = false;
var IsStatus = true;
var IsPermission = true;
//Sridhar
var TermTypeHelpText = {};
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
                    //SaveRowClearForm();
                    if (typeof (val) == "undefined" || val)
                        $(this).dialog("close");

                    //TermName = $("#tdNameofTerms").html().trim();
                    //var digit = parseInt(TermName.replace("Renewal", "")) + 1;
                    //$("#RenewalChecklist" + digit).html(vRenewalChecklist);

                    //var RenewalNotfInternal = $("#ddlRenewalNotfInternalNew").val();
                    //var vRenewalNotificationInternal = '';
                    //$(RenewalNotfInternal).each(function (i, item) {
                    //    if (vRenewalNotificationInternal == '') {
                    //        vRenewalNotificationInternal = item;
                    //    }
                    //    else {
                    //        vRenewalNotificationInternal += "; " + item;
                    //    }
                    //});
                    //$("#RenewalNotificationInternal" + digit).html(vRenewalNotificationInternal);
                    //RenewInTermPopup();

                    $(this).dialog("close");
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
            SaveRowClearForm();

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


    $('#txtRenewStartDate').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: DatepickerFormat,
        onSelect: function (selected) {
            var dt2 = $('#txtRenewEndDate');
            var startDate = $(this).datepicker('getDate');
            startDate.setDate(startDate.getDate() + 1);
            dt2.datepicker('option', 'minDate', startDate);
            //if ($('input[type="radio"][name="rdRenewTermEndDate"][value="Term"]').is(':checked'))
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
    }).click(function () { $(this).focus() });

    $('#StartDate').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: DatepickerFormat,
        onSelect: function (dateText, inst) {
            calculateenddate();

        },
    }).click(function () { $(this).focus() });
    $('#txtContractTermStartDateRenew').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: DatepickerFormat,

    }).click(function () { $(this).focus() });
    $('#NextEvaluationDate').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: DatepickerFormat,
    }).click(function () { $(this).focus() });
    $('#EndDate').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: DatepickerFormat,
    }).click(function () { $(this).focus() });
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
            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
            { vDT = moment(new Date(vDT)).format('MM/DD/YYYY'); }
            else { vDT = moment(new Date(vDT)).format(localStorage.AppDateFormat); }
            if ($('input[type="radio"][name=TermAutoRenewal]:checked').val() == "No")
                $("#txtContractTermExpireOn").val(vDT);
        }
    }).click(function () { $(this).focus() });
    $('#txtContractTermExpireOn').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: DatepickerFormat,
    }).click(function () { $(this).focus() });
    $('#hdContractTermRenewOn').datepicker({
        dateFormat: DatepickerFormat,
    }).click(function () { });
    allowOnlyNumberInInputBox('txtTermTimes');
    allowOnlyNumberInInputBox('txtRenewalInstance');
    allowOnlyNumberInInputBox('ContractAutoTerm');
    //allowOnlyNumberInInputBox('CounterpartyNoticesRenewal');
    //allowOnlyNumberInInputBox('CounterpartyNoticesCancel');
    allowOnlyNumberInInputBox('ContractTermRenewNew');

    //Sridhar
    //BindTermTypes();

});
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
    }
    else {
        //$("#AddInitialTerm").css("display", "none");
        //$("#AddRenewalTerm").css("display", "");

        var countTerm = TermNameLast.replace("Renewal ", "");
        //$("#AddRenewalTerm").text("+Add Renewal " + (parseInt(countTerm) + 1));
        $("#ddlTermPeriodSetRenewal").find("option").show();
        if (countTerm != "" && countTerm != null)
        {
            if ((parseInt(countTerm)) <= 15)
                $("#ddlTermPeriodSetRenewal").find("option:lt(" + (parseInt(countTerm)) + ")").hide();
            else
                $("#ddlTermPeriodSetRenewal").find("option:lt(15)").hide();
        }
    }
}
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

function OpenManageContractTerm(contrcatItemselection, ContractId, vIsStatus, vIsPermission) {
    IsPermission = vIsPermission;
    IsStatus = vIsStatus;
    contractItem = contrcatItemselection;
    vContractID = ContractId;
    $("#ContractTermType").val(((contractItem != null && typeof (contractItem) != "undefined") ? ($(contractItem).find("ContractTermType").length > 0 ? $(contractItem).find("ContractTermType").text() : "") : ""));
    var vTermType = $("#ContractTermType option:selected").val();
    $("#ContractTermNotes").val(((contractItem != null && typeof (contractItem) != "undefined") ? ($(contractItem).find("ContractTermNotes").length > 0 ? $(contractItem).find("ContractTermNotes").text() : "") : ""));
    TermTypeChange(vTermType);
    //if (vTermType != "") {
    if ((contractItem != null && typeof (contractItem) != "undefined") && $(contractItem).find("StartDate").length > 0 && $(contractItem).find("StartDate").text() != null) {
        //$(contractItem).find("StartDate").text().replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1')
        var fStartDate = "";
        fStartDate = DateToString($(contractItem).find("StartDate").text())

        $("#StartDate").val(fStartDate);
    } else
        $("#StartDate").val('');
    if ((contractItem != null && typeof (contractItem) != "undefined") && $(contractItem).find("NextEvaluationDate").length > 0 && $(contractItem).find("NextEvaluationDate").text() != null) {
        // $(contractItem).find("NextEvaluationDate").text().replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1')
        var fNextEvaluationDate = DateToString($(contractItem).find("NextEvaluationDate").text());

        $("#NextEvaluationDate").val(fNextEvaluationDate);
    } else
        $("#NextEvaluationDate").val('');
    if ((contractItem != null && typeof (contractItem) != "undefined") && $(contractItem).find("EndDate").length > 0 && $(contractItem).find("EndDate").text() != null) {
        //$(contractItem).find("EndDate").text().replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1')
        var fEndDate = DateToString($(contractItem).find("EndDate").text());

        $("#EndDate").val(fEndDate);
        EndDateCheck = fEndDate;
    } else
        $("#EndDate").val('');
    //EndDateCheck = "";

    if ((contractItem != null && typeof (contractItem) != "undefined") && $(contractItem).find("ContractTerm").length > 0 && $(contractItem).find("ContractTerm").text() != null && $(contractItem).find("ContractTerm").text() != '') {
        $('input[type="radio"][name="rdTermEndDate"][value="Term"]').prop('checked', true);

        EnableContractTermEndChoice();
        $("#ContractTerm").val($(contractItem).find("ContractTerm").text());
        $("#ContractTermChoices").val($(contractItem).find("ContractTermChoices").text());
    }
    else if ((contractItem != null && typeof (contractItem) != "undefined") && $(contractItem).find("EndDate").length > 0 && $(contractItem).find("EndDate").text() != null) {
        $('input[type="radio"][name="rdTermEndDate"][value="EndDate"]').prop('checked', true);
        $("#ContractTerm").val('');
        EnableContractTermEndDate();

    }
    else {
        $('input[type="radio"][name="rdTermEndDate"][value="Term"]').prop('checked', true);
        $("#ContractTerm").val("1");
        EnableContractTermEndChoice();
    }

    if ((contractItem != null && typeof (contractItem) != "undefined") && ($(contractItem).find("ContractTermType").length > 0 ? $(contractItem).find("ContractTermType").text() : "") == "Renewable") {
        //EndDateCheck = "";

        if ((contractItem != null && typeof (contractItem) != "undefined") && ($(contractItem).find("AutoRenew").length > 0 ? $(contractItem).find("AutoRenew").text() : "") == "Yes") {
            $('input[type="radio"][name="RenewalConfirmAuto"][value="Yes"]').prop('checked', true);
            $("#ContractAutoTerm").val(($(contractItem).find("ContractAutoTerm").length > 0 ? $(contractItem).find("ContractAutoTerm").text() : ""));
            $("#ContractAutoTerm").addClass("validelement");
            $("#ContractAutoTermChoices").val(($(contractItem).find("ContractAutoTermChoices").length > 0 ? $(contractItem).find("ContractAutoTermChoices").text() : ""));
            if ($(contractItem).find("RenewalDate").length > 0 && $(contractItem).find("RenewalDate").text() != null)
                $("#AutoContractRenewOn").val($.datepicker.formatDate('mm/dd/yy', new Date($(contractItem).find("RenewalDate").text())));
            if (($(contractItem).find("AutoContractRenewTermCount").length > 0 ? $(contractItem).find("AutoContractRenewTermCount").text() : "") != "") {
                if ($("#AutoContractRenewTermCount option[value='" + ($(contractItem).find("AutoContractRenewTermCount").length > 0 ? $(contractItem).find("AutoContractRenewTermCount").text() : "") + "']").length > 0 && !($("#AutoContractRenewTermCount option[value='" + ($(contractItem).find("AutoContractRenewTermCount").length > 0 ? $(contractItem).find("AutoContractRenewTermCount").text() : "") + "']").css('display') == "none"))
                    $("#AutoContractRenewTermCount").val(($(contractItem).find("AutoContractRenewTermCount").length > 0 ? $(contractItem).find("AutoContractRenewTermCount").text() : ""));
                else
                    $("#AutoContractRenewTermCount").val("Unlimited");
            }
            else
                $("#AutoContractRenewTermCount").val("Unlimited");
            // $(".ManRenewal").css('display', 'none');
        }
        else {
            $("#ContractAutoTerm").val('');
            $("#ContractAutoTerm").removeClass("validelement");
            $("#ContractAutoTermChoices").val('');
            $("#AutoContractRenewOn").val('');
            $("#AutoContractRenewTermCount").val('');
            $('input[type="radio"][name="RenewalConfirmAuto"][value="No"]').prop('checked', true);
            // $(".ManRenewal").css('display', '');
        }
        //$("#CounterpartyNotices").val(((contractItem != null && typeof (contractItem) != "undefined") ? ($(contractItem).find("CounterpartyNotices").length > 0 ? $(contractItem).find("CounterpartyNotices").text() : ""): ""));
        //$("#CounterpartyNoticesRenewal").val(((contractItem != null && typeof (contractItem) != "undefined") ? ($(contractItem).find("CounterpartyNoticesRenewal").length > 0 ? $(contractItem).find("CounterpartyNoticesRenewal").text() : "") : ""));
        //$("#CounterpartyNoticesCancel").val(((contractItem != null && typeof (contractItem) != "undefined") ? ($(contractItem).find("CounterpartyNoticesCancel").length > 0 ? $(contractItem).find("CounterpartyNoticesCancel").text() : "") : ""));
        //if ((contractItem != null && typeof (contractItem) != "undefined") && $(contractItem).find("CounterpartyNoticesCancelDate").length > 0 && $(contractItem).find("CounterpartyNoticesCancelDate").text() != null)
        //    $("#txtRenewConfirmCancelCounter").val($.datepicker.formatDate(DatepickerFormat, new Date($(contractItem).find("CounterpartyNoticesCancelDate").text())));

        //if ((contractItem != null && typeof (contractItem) != "undefined") && $(contractItem).find("CounterpartyNoticesRenewalDate").length > 0 && $(contractItem).find("CounterpartyNoticesRenewalDate").text() != null)
        //    $("#txtRenewConfirmRenewalCounter").val($.datepicker.formatDate(DatepickerFormat, new Date($(contractItem).find("CounterpartyNoticesRenewalDate").text())));

        if ((contractItem != null && typeof (contractItem) != "undefined") && ($(contractItem).find("RequiresAuth").length > 0 ? $(contractItem).find("RequiresAuth").text() : "") == "Yes") {
            $('input[type="radio"][name="RenewalAuth"][value="Yes"]').prop('checked', true);
            GetValuesAndAutoPopulate("RenewalConfirmParticipants", ($(contractItem).find("RenewalConfirmParticipants").length > 0 ? $(contractItem).find("RenewalConfirmParticipants").text() : ""));
            $("#ContractConfirmSendTerm").val(($(contractItem).find("ContractConfirmSendTerm").length > 0 ? $(contractItem).find("ContractConfirmSendTerm").text() : ""));
            if ($(contractItem).find("ContractConfirmSendDate").length > 0 && $(contractItem).find("ContractConfirmSendDate").text() != null) {
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                    //if (bowser.msie) {
                    //    var confirmDate = $(contractItem).find("ContractConfirmSendDate").text();
                    //    var date = confirmDate.substring(0, confirmDate.indexOf('+'));
                    //    $("#txtRenewConfirmSendDate").text(moment(new Date(date)).utc().add('days', 1).format('MM/DD/YYYY'));
                    //}
                    //else {
                    var confirmDate = $(contractItem).find("ContractConfirmSendDate").text();
                    var confdate = confirmDate.substring(0, confirmDate.indexOf('+'));
                    if (getTimeZone().indexOf('+') > -1) {
                        $("#txtRenewConfirmSendDate").text(moment(new Date(confdate)).format('MM/DD/YYYY'));
                    }
                    else if (getTimeZone().indexOf('+00:00') > -1 || getTimeZone().indexOf('-') > -1) {
                        $("#txtRenewConfirmSendDate").text(moment(new Date(confdate)).utc().format('MM/DD/YYYY'));
                    }

                    //}
                }
                else {
                    //if (bowser.msie) {
                    //    var confirmDate = $(contractItem).find("ContractConfirmSendDate").text();
                    //    var date = confirmDate.substring(0, confirmDate.indexOf('+'));
                    //    $("#txtRenewConfirmSendDate").text(moment(new Date(date)).utc().add('days', 1).format(localStorage.AppDateFormat));
                    //}
                    //else {
                    var confirmDate = $(contractItem).find("ContractConfirmSendDate").text();
                    var confdate = confirmDate.substring(0, confirmDate.indexOf('+'));
                    if (getTimeZone().indexOf('+') > -1) {
                        $("#txtRenewConfirmSendDate").text(moment(new Date(confdate)).format(localStorage.AppDateFormat));
                    }
                    else if (getTimeZone().indexOf('+00:00') > -1 || getTimeZone().indexOf('-') > -1) {
                        $("#txtRenewConfirmSendDate").text(moment(new Date(confdate)).utc().format(localStorage.AppDateFormat));
                    }
                    //};
                }

                //if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                //    $("#txtRenewConfirmSendDate").text(moment(new Date($(contractItem).find("ContractConfirmSendDate").text())).utc().format('MM/DD/YYYY'));
                //}
                //else {
                //    $("#txtRenewConfirmSendDate").text(moment(new Date($(contractItem).find("ContractConfirmSendDate").text())).utc().format(localStorage.AppDateFormat));
                //}
            }
            GetValuesAndAutoPopulate("RenewalConfirmParticipantsCC", ($(contractItem).find("RenewalConfirmParticipantsCC").length > 0 ? $(contractItem).find("RenewalConfirmParticipantsCC").text() : ""));
            $("#hdParticipantsXML").val(($(contractItem).find("RenewalConfirmParticipantsXML").length > 0 ? $(contractItem).find("RenewalConfirmParticipantsXML")[0].innerHTML : ""));
            var values = ($(contractItem).find("RenewalConfirmParticipantsCC").length > 0 ? $(contractItem).find("RenewalConfirmParticipantsCC").text() : "");
            var owner = ($(contractItem).find("ContractManagers").length > 0 ? $(contractItem).find("ContractManagers").text() : "");
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
            $("#RenewalConfirmParticipants").addClass("validselect");
            $("#ContractConfirmSendTerm").addClass("validelement");
            if ($(contractItem).find("RenewalConfirmOverall").length > 0 ? ($(contractItem).find("RenewalConfirmOverall").text() == "In Progress" || $(contractItem).find("RenewalConfirmOverall").text() == "Completed") : false) {
                $('input[type="radio"][name="RenewalAuth"][value="Yes"]').prop('disabled', true);
                $('input[type="radio"][name="RenewalAuth"][value="No"]').prop('disabled', true);
                $("#RenewalConfirmParticipants").prop('disabled', true);
                $("#ContractConfirmSendTerm").prop('disabled', true);
                $("#txtRenewConfirmSendDate").prop('disabled', true);;
                $("#RenewalConfirmParticipantsCC").prop('disabled', true);
                var UserPending = [];
                var Xml = ($(contractItem).find("RenewalConfirmParticipantsXML").length > 0 ? $(contractItem).find("RenewalConfirmParticipantsXML")[0].innerHTML : "");
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
                $("#RenewalConfirmParticipants").prop('disabled', false);
                $("#ContractConfirmSendTerm").prop('disabled', false);
                $("#txtRenewConfirmSendDate").prop('disabled', true);;
                $("#RenewalConfirmParticipantsCC").prop('disabled', false);

            }
        }
        else {
            $('input[type="radio"][name="RenewalAuth"][value="Yes"]').prop('disabled', false);
            $('input[type="radio"][name="RenewalAuth"][value="No"]').prop('disabled', false);
            $("#RenewalConfirmParticipants").prop('disabled', false);
            $("#ContractConfirmSendTerm").prop('disabled', false);
            $("#txtRenewConfirmSendDate").prop('disabled', true);;
            $("#RenewalConfirmParticipantsCC").prop('disabled', false);
            $('input[type="radio"][name="RenewalAuth"][value="No"]').prop('checked', true);
            GetValuesAndAutoPopulate("RenewalConfirmParticipants", '');
            $("#ContractConfirmSendTerm").val('');
            $("#txtRenewConfirmSendDate").text('');
            GetValuesAndAutoPopulate("RenewalConfirmParticipantsCC", '');
            $("#hdParticipantsXML").val('');
            $("#RenewalConfirmParticipants").removeClass("validselect");
            $("#ContractConfirmSendTerm").removeClass("validelement");
        }
        RenewalConfirmAutofunc();
        RequiresAuthchange();

    }
}

//Termasave
function TermSave() {
    if ($("#ContractTermType").val() == "Renewable") {

        RenewalTermSave();

    }
    else {



        ContractTermSave();

    }

}



function getTimeZone() {
    var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
    return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
}


function calculateenddate() {
    if ($("#ContractTermChoices").find('option:selected').val() == "months" && ($("#ContractTerm").val() % 12 == 0)) {
        $("#ContractTermChoices").val('years');
        $("#ContractTerm").val($("#ContractTerm").val() / 12);
    }
    if ($("#ContractTermType").val() != 'Evergreen / Perpetual' && $("#ContractTermType").val() != 'Executed / Performance') {
        if ($("#StartDate").val() != "" && $("#ContractTerm").val() != "") {

            var ftxtContractTermStartDate = '';
            if ($("#StartDate").val() != "" && $("#StartDate").val() != null) {
                ftxtContractTermStartDate = $.datepicker.formatDate('mm/dd/yy', $("#StartDate").datepicker('getDate'));
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
            $("#EndDate").val(fnextDate);
        }
    }
}
//function calculateenddateRenew(from, choice, number, to) {
//    var todaydate = new Date();
//    var startdate = $("#" + from).datepicker('getDate');
//    var enddate = $("#" + to).datepicker('getDate');
//    var todaydateM = "";
//    var startdateM = "";
//    var enddateM = "";
//    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
//        todaydateM = moment(new Date(todaydate)).format('MM/DD/YYYY');
//        startdateM = moment(new Date(startdate)).format('MM/DD/YYYY');
//        enddateM = moment(new Date(enddate)).format('MM/DD/YYYY');

//    }
//    else {
//        todaydateM = moment(new Date(todaydate)).format(localStorage.AppDateFormat);
//        startdateM = moment(new Date(startdate)).format(localStorage.AppDateFormat);
//        enddateM = moment(new Date(enddate)).format(localStorage.AppDateFormat);
//    }



//    if ($('input[type="radio"][name="rdRenewTermEndDate"][value="Term"]').is(':checked')) {
//        if ($("#" + number).val() == "1" && $("#" + choice).val() == "days") {
//            swal("", "Term duration cannot be one day.");
//            $("#" + number).val("2")
//        }
//        else if ($("#" + number).val() == "0") {
//            swal("", "Term duration cannot be less than two days.");
//            $("#" + number).val("2")
//        }
//        if ($("#" + choice).find('option:selected').val() == "months" && ($("#" + number).val() != "0" && $("#" + choice).val() != "" && $("#" + number).val() % 12 == 0)) {
//            $("#" + choice).val('years');
//            $("#" + number).val($("#" + number).val() / 12);
//        }
//        if ($("#" + from).val() != "" && $("#" + number).val() != "") {

//            var ftxtContractTermStartDate = '';
//            if ($("#" + from).val() != "" && $("#" + from).val() != null) {
//                ftxtContractTermStartDate = $.datepicker.formatDate("mm/dd/yy", $("#" + from).datepicker('getDate'));
//                if ($("#" + from).datepicker('getDate') == null) {
//                    ftxtContractTermStartDate = $("#" + from).val();
//                    startdate = new Date($("#" + from).val());
//                }
//            }
//            var fnextDate = "";
//            var dtNextdate;
//            var strNextDateUTC = "";

//            var nextDate = moment(new Date(ftxtContractTermStartDate)).zone(getTimeZone()).add($("#" + choice).find('option:selected').val(), $("#" + number).val()).utc();

//            //var nextDate = moment(ftxtContractTermStartDate).add($("#" + choice).find('option:selected').val(), $("#" + number).val());
//            strNextDateUTC = moment(new Date(nextDate)).utc().format('MM/DD/YYYY');
//            dtNextdate = new Date(strNextDateUTC);
//            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
//                if (getTimeZone().indexOf('+') > -1)
//                    fnextDate = moment(nextDate).utc().format('MM/DD/YYYY');
//                else if (getTimeZone().indexOf('+00:00') > -1 || getTimeZone().indexOf('-') > -1)
//                    fnextDate = moment(nextDate).utc().subtract(1, "days").format('MM/DD/YYYY');
//            }
//            else {
//                if (getTimeZone().indexOf('+') > -1)
//                    fnextDate = moment(nextDate).utc().format(localStorage.AppDateFormat);
//                else if (getTimeZone().indexOf('+00:00') > -1 || getTimeZone().indexOf('-') > -1)
//                    fnextDate = moment(nextDate).utc().subtract(1, "days").format(localStorage.AppDateFormat);
//            }
//            if (fnextDate != "Invalid Date") {
//                //maxAllowedDate = $("#" + to).val();
//                //var maxdate = $("#" + to).datepicker("option", "maxDate");
//                //if (maxdate != null) {
//                //    if (fnextDate < new Date(maxAllowedDate)) {
//                //        $("#" + to).val(fnextDate);
//                //        enddate = new Date(nextDate);
//                //    }
//                //    else {
//                //        swal("", "Terms choosen has end date beyond the maximum allowed date for this term.");
//                //        EnableContractRenewTermEndDate();

//                //        $("#" + to).val(maxAllowedDate);
//                //    }
//                //}
//                //else {
//                if (EndDateCheckRenewal != "") {
//                    if (EndDateCheckRenewal < new Date(fnextDate)) {
//                        //swal("", "Terms choosen has End date beyond the maximum allowed date for this term.");
//                        swal("", "Term chosen has the End date that has the maximum allowed date for this term.");
//                        var orig = "";
//                        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
//                        { orig = moment(new Date(fnextDate)).format('MM/DD/YYYY'); }
//                        else { orig = moment(new Date(fnextDate)).format(localStorage.AppDateFormat); }
//                        $("#" + to).val(orig);
//                        enddate = new Date(EndDateCheckRenewal);
//                        $('input[type="radio"][name="rdRenewTermEndDate"][value="EndDate"]').prop('checked', true);

//                        EnableContractTermRenewEndChoice(true, false);

//                    }
//                    else {
//                        $("#" + to).val(fnextDate);
//                        enddate = new Date(dtNextdate);

//                    }
//                }
//                else {
//                    $("#" + to).val(fnextDate);
//                    enddate = new Date(dtNextdate);

//                }
//                //}
//            }
//            else
//                $("#" + to).val('');

//        }
//    }
//    //$("#txtContractTermStartRenewNext").val($("#txtContractTermEndDateRenew").val());
//    //if (CurrentTermDetails == "" && $("#CurrentTermName").val() == "Initial Term") {
//    //    $("#CurrentRenewalTermStart").text($("#txtContractTermStartDateRenew").val());
//    //    $("#CurrentRenewalTermEnd").text($("#txtContractTermEndDateRenew").val());
//    //}

//    var statTerm = 'Not Started';
//    if ((startdate < todaydate || startdateM == todaydateM) && (todaydateM == enddateM || todaydate < enddate))
//        $("#txtRenewStatus").find('b').lenght > 0 ? $("#txtRenewStatus b").text("Current") : $("#txtRenewStatus").text("Current");
//    else if (startdate > todaydate)
//        $("#txtRenewStatus").find('b').lenght > 0 ? $("#txtRenewStatus b").text("Not Started") : $("#txtRenewStatus").text("Not Started");
//    else if (todaydate > enddate && todaydateM != enddateM)
//        $("#txtRenewStatus").find('b').lenght > 0 ? $("#txtRenewStatus b").text("Ended") : $("#txtRenewStatus").text("Ended");
//    //if(EditSaveFlag)
//    //{
//    //    var str='';
//    //    if (statTerm == "Current")
//    //        str = '<b title="Current" class="status_green" style="padding: 5px 0px; color:#fff;display: inline-block;width: 88px;vertical-align: middle;text-align: center;height: 15px;">' + statTerm + '<img src="../Content/Images/down_arrow.png" style="width: 8px;margin-top: 4px !important;"  alt="Open Menu" title="Open Menu" class="openmenuRenewalExp edithide margin-left-5"></b>';
//    //    else if (statTerm == "Ended")
//    //        str = '<b title="Ended" class="status_Gray" style="padding: 5px 0px; color:#fff;display: inline-block;width: 88px;vertical-align: middle;text-align: center;height: 15px;">' + statTerm + '</b>';
//    //    else if (statTerm == "Not Started")
//    //        str = '<b title="Not Started" class="status_blue" style="padding: 5px 0px; color:#fff;display: inline-block;width: 88px;vertical-align: middle;text-align: center;height: 15px;">' + statTerm + '</b>';
//    //    else 
//    //        str = '<b>' + statTerm + '</b>';

//    //    $("#txtRenewStatus").html(str);
//    //    $(".openmenuRenewalExp").contextMenu({
//    //        menu: 'menuRenewalExp', leftButton: true
//    //    }, function (action, el, pos) {
//    //        contextMenuRenewal(action, el.parent("b").parent("td").parent("tr"), pos);
//    //    });
//    //}
//}

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

function EnableContractTermEndChoice() {
    $("#ContractTermChoices").prop('disabled', false);
    $("#ContractTerm").prop('disabled', false);
    $("#ContractTerm").val('1');
    $("#ContractTermChoices").val('years');
    if (EndDateCheck == "")
        calculateenddate();
    else
        $("#EndDate").val(EndDateCheck);
    $("#EndDate").prop('disabled', true);
    $("#EndDate").removeClass('form-contro-Date');
    $("#EndDate").addClass('form-contro-NoDate');
}

function EnableContractTermEndDate() {
    $("#ContractTerm").val('');
    $("#ContractTermChoices").val('years');
    if (EndDateCheck == "")
        calculateenddate();
    else
        $("#EndDate").val(EndDateCheck);
    $("#ContractTermChoices").prop('disabled', true);
    $("#ContractTerm").prop('disabled', true);
    $("#EndDate").prop('disabled', false);
    $("#EndDate").removeClass('form-contro-NoDate');
    $("#EndDate").addClass('form-contro-Date');
    //Sridhar
    $('.form-contro-Date').on("paste", function (e) {
        e.preventDefault();
    });
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



function ContractTermSave() {
    if ($("#txtTermTimes").val() == 0) {
        $("#txtTermTimes").val('');
    }
    if (requiredValidator('dvContractTerm', false)) {

        if ($("#txtTermTimes").val() == "0") {
            $('#txtTermTimes').addClass('error');
        }
        else {
            $('#txtTermTimes').removeClass('error');
            var ftxtContractTermStartDate = '';
            if ($("#StartDate").val() != "" && $("#StartDate").val() != null) {
                ftxtContractTermStartDate = $.datepicker.formatDate('mm/dd/yy', $("#StartDate").datepicker('getDate'));
            }
            var fContractTermEvaluationDate = '';
            if ($("#NextEvaluationDate").val() != "" && $("#NextEvaluationDate").val() != null) {
                fContractTermEvaluationDate = $.datepicker.formatDate('mm/dd/yy', $("#NextEvaluationDate").datepicker('getDate'));
            }
            var fContractTermEndDate = '';
            if ($("#EndDate").val() != "" && $("#EndDate").val() != null) {
                fContractTermEndDate = $.datepicker.formatDate('mm/dd/yy', $("#EndDate").datepicker('getDate'));
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
            var vTermType = $("#ContractTermType option:selected").val();
            var errmsg = '';
            if (vTermType == "Fixed Term") {
                if (!comparedates("StartDate", "NextEvaluationDate")) {
                    //$("#StartDate").addClass('error');
                    //alert("Next Evaluation Date should be greater than Start / Effective Date");
                    errmsg += "Next Evaluation date should be greater than Start/Effective date.\n";
                }
                if (!comparedates("StartDate", "EndDate")) {
                    //alert("End Date should be greater than Start / Effective Date");
                    errmsg += "End date should be greater than Start/Effective date.\n";
                }
                if (!comparedates("NextEvaluationDate", "EndDate")) {
                    //alert("End Date should be greater than Next Evaluation Date");
                    errmsg += "End date should be greater than next Evaluation date.\n";
                }
            } else if (vTermType == "Evergreen / Perpetual") {
                if (!comparedates("StartDate", "NextEvaluationDate")) {
                    //$("#StartDate").addClass('error');
                    //alert("Next Evaluation Date should be greater than Start / Effective Date");
                    errmsg += "Next Evaluation date should be greater than Start/Effective date.\n";
                }
            } else if (vTermType == "Executed / Performance") {
            } else if (vTermType == "Renewable") {
                if (!comparedates("StartDate", "txtContractTermEnds")) {
                    //$("#StartDate").addClass('error');
                    //alert("Next Evaluation Date should be greater than Start / Effective Date");
                    errmsg += "Current Term End date should be greater than Start/Effective date.\n";
                }
                if (!comparedates("txtContractTermEnds", "EndDate")) {
                    //$("#StartDate").addClass('error');
                    //alert("Next Evaluation Date should be greater than Start / Effective Date");
                    errmsg += "End date should be greater than current term End date.\n";
                }
                if (!comparedates("StartDate", "EndDate")) {
                    //alert("End Date should be greater than Start / Effective Date");
                    errmsg += "End date should be greater than Start/Effective date.\n";
                }
                if (!comparedates("txtContractTermRenewOn", "EndDate")) {
                    //alert("End Date should be greater than Start / Effective Date");
                    errmsg += "End date should be greater than Renew On/Anniversary date.\n";
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
                    if (!comparedates("hdContractTermRenewOn", "EndDate")) {
                        //alert("End Date should be greater than Start / Effective Date");
                        errmsg += "End date should be greater than Schedule Auto Renewal date.\n";
                    }
                }
            }
            if (errmsg != '') {
                //  alert(errmsg);
                swal("", errmsg);
            } else {


                if (vContractID != '') {
                    $("#loadingPage").fadeIn();


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


                    if (vTermType == "Fixed Term") {
                        vStartDate = ftxtContractTermStartDate;
                        //$("#StartDate").val();
                        vNextEvaluationDate = fContractTermEvaluationDate;
                        vEndDate = fContractTermEndDate;
                        if ($('input[type="radio"][name=rdTermEndDate]:checked').val() == 'Term') {
                            vContractTerm = $("#ContractTerm").val();
                            vContractTermChoices = $("#ContractTermChoices option:selected").val();
                        }
                    } else if (vTermType == "Evergreen / Perpetual") {
                        vStartDate = ftxtContractTermStartDate;
                        //$("#StartDate").val();
                        vNextEvaluationDate = fContractTermEvaluationDate;
                    } else if (vTermType == "Executed / Performance") {
                        vStartDate = ftxtContractTermStartDate;
                        //$("#StartDate").val();
                    } else if (vTermType == "Renewable") {
                        vStartDate = ftxtContractTermStartDate;
                        //$("#StartDate").val();
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
                    //Sridhar
                    var termCommentsXML = getTermCommentsXML(vTermType, vStartDate, vEndDate, vNextEvaluationDate);
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + vContractID + '/ContractTerm',
                        type: 'PUT',
                        dataType: 'json',
                        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                        data: {
                            ContractID: vContractID,
                            ContractTermType: vTermType,
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
                            ModifiedBy: localStorage.UserName,
                            TermCommentsXML: termCommentsXML
                        },
                        cache: false,
                        success: function (data) {
                            if (data != null)
                                contractItem = data;
                            //BindContractTermDetail(contractItem);
                            $("#loadingPage").fadeOut();



                        },
                        error: function (data) {
                            $("#loadingPage").fadeOut();
                        },
                        complete: function () {
                            $("#loadingPage").fadeOut();
                        }
                    });
                }
            }
        }
    }
}
function RenewalTermSave(ContractID) {
    if (ContractID != "")
        vContractID = ContractID
    var errmsg = '';
    var vCurrentTermName = $("#hdCurrentTermName").val();
    var vCurrentTermEndDate = '';
    var dateEndTerm;

    //var vCounterpartyNoticesCancel = "";
    //var vCounterpartyNoticesRenewal = "";
    //var vCounterpartyNoticesRenewalDate = null;
    //var vCounterpartyNoticesCancelDate = null;

    var vContractConfirmSendTerm = "";
    var vContractConfirmSendDate = null;


    var fConfirmSendDate = null;

    if ($("#hdCurrentRenewalTermEnd").val() != "" && $("#hdCurrentRenewalTermEnd").val() != null) {
        vCurrentTermEndDate = $.datepicker.formatDate('mm/dd/yy', new Date($("#hdCurrentRenewalTermEnd").val()));

    }

    if (vCurrentTermEndDate != '' && typeof (vCurrentTermEndDate) != "undefined") {
        vContractConfirmSendTerm = $("#ContractConfirmSendTerm").val();
        if (vContractConfirmSendTerm != null && vContractConfirmSendTerm != "" && typeof (vContractConfirmSendTerm) != "undefined") {
            var nextDate = moment(vCurrentTermEndDate).add(vContractConfirmSendTerm, "days");
            var strNextDateUTC = moment(new Date(nextDate)).utc().format('MM/DD/YYYY');
            var dtNextdate = new Date(strNextDateUTC);
            var dtcurrentdate = new Date(vCurrentTermEndDate);
            if ($("#ContractConfirmSendTerm").prop('disabled') == true) {
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




        //vCounterpartyNoticesRenewal = $("#CounterpartyNoticesRenewal").val();
        //if (vCounterpartyNoticesRenewal != null && vCounterpartyNoticesRenewal != "" && typeof (vCounterpartyNoticesRenewal) != "undefined") {
        //    var nextDate = moment(vCurrentTermEndDate).add("days", vCounterpartyNoticesRenewal);
        //    var strNextDateUTC = moment(new Date(nextDate)).utc().format('MM/DD/YYYY');
        //    var dtNextdate = new Date(strNextDateUTC);
        //    var dtcurrentdate = new Date(vCurrentTermEndDate);
        //    if (dtNextdate != "invalid" && dtcurrentdate != "invalid" && dtNextdate >= dtcurrentdate) {
        //        errmsg = "The Cancellation / Termination Notice days is greater than the possible days allowed from today before current term ends.";
        //    }
        //    else {
        //        vCounterpartyNoticesRenewalDate = $.datepicker.formatDate('mm/dd/yy', new Date(strNextDateUTC));
        //    }
        //}

        //vCounterpartyNoticesCancel = $("#CounterpartyNoticesCancel").val();
        //if (vCounterpartyNoticesCancel != null && vCounterpartyNoticesCancel != "" && typeof (vCounterpartyNoticesCancel) != "undefined") {
        //    var nextDate = moment(vCurrentTermEndDate).add("days", vCounterpartyNoticesCancel);
        //    var strNextDateUTC = moment(new Date(nextDate)).utc().format('MM/DD/YYYY');
        //    var dtNextdate = new Date(strNextDateUTC);
        //    var dtcurrentdate = new Date(vCurrentTermEndDate);
        //    if (dtNextdate != "invalid" && dtcurrentdate != "invalid" && dtNextdate >= dtcurrentdate) {
        //        errmsg = "The Renewal Notice days is greater than the possible days allowed from today before current term ends.";
        //    }
        //    else {
        //        vCounterpartyNoticesCancelDate = $.datepicker.formatDate('mm/dd/yy', new Date(strNextDateUTC));
        //    }
        //}


    }
    var vAutoRenew = $(':input[type="radio"][name=RenewalConfirmAuto]:checked').val();
    if (vAutoRenew == "Yes") {
        if ($("#ContractAutoTerm").val() == "0")
            errmsg = "Renewal Term cannot be 0.";
    }




    if (vContractID != '') {
        $("#loadingPage").fadeIn();


        var vContractTermType = $("#ContractTermType option:selected").val();
        var vContractTermNotes = $("#ContractTermNotes").val();
        var vRenewalTerms = [];
        $("#renewalViewHistoryTerm tr").each(function (i, item) {
            var elid = item.id;
            if ($(item).hasClass('termExpired')) {
                var totalFileCount = elid.replace("ExpRenewalViewHistoryTerm", "");
                var vRenewableTermName = $('#ExpRenewableTermName' + totalFileCount).text();
                var vRenewedDate = $('#ExpRenewedDate' + totalFileCount).text();
                var vNextRenewalDate = ($('#ExpRenewedDate' + (parseInt(totalFileCount) + 1)) != null && typeof ($('#ExpRenewedDate' + (parseInt(totalFileCount) + 1))) != "undefined") ? $('#ExpRenewedDate' + (parseInt(totalFileCount) + 1)).text() : "";
                var vTermEndDate = $('#ExpTermEndDate' + totalFileCount).text();
                if (DatepickerFormat == "dd/mm/yy") {
                    var strParts = [];
                    if (vTermEndDate != null && vTermEndDate != "") {
                        strParts = vTermEndDate.split('/');
                        vTermEndDate = strParts[1] + "/" + strParts[0] + "/" + strParts[2];
                    }
                    if (vRenewedDate != null && vRenewedDate != "") {
                        strParts = vRenewedDate.split('/');
                        vRenewedDate = strParts[1] + "/" + strParts[0] + "/" + strParts[2];
                    }
                    if (vNextRenewalDate != null && vNextRenewalDate != "") {
                        strParts = vNextRenewalDate.split('/');
                        vNextRenewalDate = strParts[1] + "/" + strParts[0] + "/" + strParts[2];
                    }
                }
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
                    "RenewalCommentsXML": vRenewalCommentXML

                });
            }
            else {
                var totalFileCount = elid.replace("renewalViewHistoryTerm", "");
                var vRenewableTermName = $('#RenewableTermName' + totalFileCount).text();
                var vRenewedDate = $('#RenewedDate' + totalFileCount).text();
                var vNextRenewalDate = ($('#RenewedDate' + (parseInt(totalFileCount) + 1)) != null && typeof ($('#RenewedDate' + (parseInt(totalFileCount) + 1))) != "undefined") ? $('#RenewedDate' + (parseInt(totalFileCount) + 1)).text() : "";
                var vTermEndDate = $('#TermEndDate' + totalFileCount).text();
                if (DatepickerFormat == "dd/mm/yy") {
                    var strParts = [];
                    if (vTermEndDate != null && vTermEndDate != "") {
                        strParts = vTermEndDate.split('/');
                        vTermEndDate = strParts[1] + "/" + strParts[0] + "/" + strParts[2];
                    }
                    if (vRenewedDate != null && vRenewedDate != "") {
                        strParts = vRenewedDate.split('/');
                        vRenewedDate = strParts[1] + "/" + strParts[0] + "/" + strParts[2];
                    }
                    if (vNextRenewalDate != null && vNextRenewalDate != "") {
                        strParts = vNextRenewalDate.split('/');
                        vNextRenewalDate = strParts[1] + "/" + strParts[0] + "/" + strParts[2];
                    }
                }
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
                    "RenewalCommentsXML": vRenewalCommentXML

                });
            }

        })

        var vContractAutoTerm = "";
        var vContractAutoTermChoices = "";
        var vAutoContractRenewTermCount = "";
        var vAutoContractRenewOn = null;
        if (vAutoRenew == "Yes") {
            vContractAutoTerm = $("#ContractAutoTerm").val();
            vContractAutoTermChoices = $("#ContractAutoTermChoices").val();
            vAutoContractRenewTermCount = $("#AutoContractRenewTermCount").val();
            var fAutoContractRenewOn = null;

            vAutoContractRenewOn = vCurrentTermEndDate;
        }
        var vRequiresAuth = $(':input[type="radio"][name=RenewalAuth]:checked').val();

        var vRenewalConfirmParticipants = "";

        var vRenewalConfirmParticipantsCC = "";
        if (vRequiresAuth == "Yes") {

            vContractConfirmSendTerm = $("#ContractConfirmSendTerm").val();
            var vSendRenewConfirmParticipants = '';
            var SendConfirmParticipantsToArr = $("#RenewalConfirmParticipants").val();
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
            var SendConfirmParticipantsToArrCC = $("#RenewalConfirmParticipantsCC").val();
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
        // var vCounterpartyNotices = $("#CounterpartyNotices").val();



        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + vContractID + '/ContractRenewalTermEditForm',
            type: 'PUT',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
            async: false,
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
                //CounterpartyNotices: vCounterpartyNotices,
                //CounterpartyNoticesRenewal: vCounterpartyNoticesRenewal,
                //CounterpartyNoticesRenewalDate: vCounterpartyNoticesRenewalDate,
                //CounterpartyNoticesCancel: vCounterpartyNoticesCancel,
                //CounterpartyNoticesCancelDate: vCounterpartyNoticesCancelDate,
                RenewalTerms: vRenewalTerms,
                RenewalConfirmOverall: ((contractItem != null && typeof (contractItem) != "undefined") ? ($(contractItem).find("RenewalConfirmOverall").length > 0 ? $(contractItem).find("RenewalConfirmOverall").text() : "") : ""),
                RenewalConfirmParticipantsXML: ((contractItem != null && typeof (contractItem) != "undefined") ? ($(contractItem).find("RenewalConfirmParticipantsXML").length > 0 ? $(contractItem).find("RenewalConfirmParticipantsXML")[0].innerHTML : "") : ""),

            },
            cache: false,
            success: function (item) {



            },
            error: function (data) {
                $("#loadingPage").fadeOut();
            },
            complete: function () {
                $("#loadingPage").fadeOut();
            }
        });
    }

}
function GetRenewalAll() {
    var RenewalTermName = "";
    $("#AddRenewalTerm").css("display", "none");
    $("#AddInitialTerm").css("display", "none");
    var expireFlag = false;
    var isCurrentPresent = false;
    if (vContractID != '') {
        $("#renewalViewHistoryTerm").html('<img src="../Content/Images/icon/loading.gif">');
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + vContractID + '/contractrenewalhistory',
            type: 'GET',
            dataType: 'json',
            'Content-Type': 'application/json',
            cache: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            success: function (data) {
                $("#renewalViewHistoryTerm").empty();
                var str = "";
                if (data == null || data.length == 0) {
                    $("#AddInitialTerm").css("display", "");
                    $("#AddRenewalTerm").css("display", "none");

                    $("#CurrentTermName").val('Initial Term');
                    CurrentTermDetails = "";
                    $("#AutoContractRenewTermCount").find("option").show()
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
                        if (item.RenewableTermName == "" || item.RenewableTermName == null) {
                            var dStartDate;
                            var dEndDate;

                            if (InitialTermFlag) {
                                InitialTermFlag = false;
                                var fStartDate = "";
                                str += '  <tr id="renewalViewHistoryTerm' + indexCount + '">';
                                str += ' <td id="RenewableTermName' + indexCount + '">Initial Term<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="' + vAction + ' margin-left-5"></td>';
                                if (contractItem != null && typeof (contractItem) != "undefined" && $(contractItem).find("StartDate").length > 0 && $(contractItem).find("StartDate").text() != null) {
                                    dStartDate = new Date($(contractItem).find("StartDate").text());
                                    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                                        fStartDate = moment(new Date($(contractItem).find("StartDate").text())).utc().format('MM/DD/YYYY');
                                    }
                                    else {
                                        fStartDate = moment(new Date($(contractItem).find("StartDate").text())).utc().format(localStorage.AppDateFormat);

                                        //fRenewedDate = moment(new Date(item.RenewedDate)).format();
                                    }
                                    str += ' <td id="RenewedDate' + indexCount + '">' + fStartDate + '</td>';
                                } else if ((contractItem != null && typeof (contractItem) != "undefined") && $(contractItem).find("EffectiveDate").length > 0 && $(contractItem).find("EffectiveDate").text() != null) {
                                    {
                                        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                                            fStartDate = moment(new Date($(contractItem).find("EffectiveDate").text())).utc().format('MM/DD/YYYY');
                                        }
                                        else {
                                            fStartDate = moment(new Date($(contractItem).find("EffectiveDate").text())).utc().format(localStorage.AppDateFormat);

                                            //fRenewedDate = moment(new Date(item.RenewedDate)).format();
                                        }

                                    }
                                    str += ' <td id="RenewedDate' + indexCount + '">' + fStartDate + '</td>';
                                }
                                else {
                                    str += ' <td id="RenewedDate' + indexCount + '"></td>';
                                }
                                if (item.RenewedDate != null) {
                                    dEndDate = new Date(item.RenewedDate);
                                    dEndDate.setDate(dEndDate.getDate() - 1);
                                    var fRenewedDate = "";
                                    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                                        fRenewedDate = moment(new Date(dEndDate)).utc().format('MM/DD/YYYY');
                                    }
                                    else {
                                        fRenewedDate = moment(new Date(dEndDate)).utc().format(localStorage.AppDateFormat);
                                        //fTermEndDate = moment(new Date(item.TermEndDate)).format(localStorage.AppDateFormat);
                                    }
                                    str += ' <td id="TermEndDate' + indexCount + '">' + fRenewedDate + '</td>';
                                } else {
                                    str += ' <td id="TermEndDate' + indexCount + '"></td>';
                                }
                                var statTerm = "";
                                if (dStartDate <= todaydate && todaydate < dEndDate)
                                    statTerm = "Current";
                                else if (dStartDate > todaydate)
                                    statTerm = "Not Started";
                                else if (todaydate > dEndDate)
                                    statTerm = "Ended";
                                if (statTerm == "Current")
                                    str += '  <td id="TermStatus' + indexCount + '" style="display:none;"><b title="Current" class="status_green" style="padding: 5px 0px; color:#fff;display: inline-block;width: 88px;vertical-align: middle;text-align: center;">' + statTerm + '<img src="../Content/Images/down_arrow.png" style="width: 8px;margin-top: 4px !important;"  alt="Open Menu" title="Open Menu" class="' + vActionStatus + ' edithide margin-left-5"></b></td>';
                                else if (statTerm == "Ended")
                                    str += '  <td id="TermStatus' + indexCount + '" style="display:none;"><b title="Ended" class="status_Gray" style="padding: 5px 0px; color:#fff;display: inline-block;width: 88px;vertical-align: middle;text-align: center;">' + statTerm + '</b></td>';
                                else if (statTerm == "Expired")
                                    str += '  <td id="TermStatus' + indexCount + '" style="display:none;"><b title="Expired" class="status_red" style="padding: 5px 0px; color:#fff;display: inline-block;width: 88px;vertical-align: middle;text-align: center;">' + statTerm + '<img src="../Content/Images/down_arrow.png" style="width: 8px;margin-top: 4px !important;" alt="Open Menu" title="Open Menu" class="' + vActionStatus + ' edithide margin-left-5"></b></td>';
                                else if (statTerm == "Not Started")
                                    str += '  <td id="TermStatus' + indexCount + '" style="display:none;"><b title="Not Started" class="status_blue" style="padding: 5px 0px; color:#fff;display: inline-block;width: 88px;vertical-align: middle;text-align: center;">' + statTerm + '</b></td>';
                                else
                                    str += '  <td id="TermStatus' + indexCount + '" style="display:none;"><b title="Current" class="" style="padding: 5px 0px; color:;display: inline-block;width: 88px;vertical-align: middle;text-align: center;">' + statTerm + '</b></td>';
                                str += ' <td id="Status' + indexCount + '" style="display:none;"></td>';
                                str += ' <td id="RenewalNotes' + indexCount + '" style="display:none;"></td>';
                                str += '  <td id="RenewalConfirmParticipants' + indexCount + '" style="display:none;"></td>';
                                str += ' <td id="RenewedOn' + indexCount + '" style="display:none;"></td>';
                                str += ' <td id="RenewedBy' + indexCount + '" style="display:none;"></td>';

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
                                { startdate = new Date(item.RenewedDate); }
                            }
                            if (item.TermEndDate != null) {
                                { enddate = new Date(item.TermEndDate); }
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
                                    TermStartDate = moment(new Date(item.RenewedDate)).utc().format('MM/DD/YYYY');
                                    //$.datepicker.formatDate('mm/dd/yy', new Date(item.RenewedDate));
                                    TermEndDate = moment(new Date(item.TermEndDate)).utc().format('MM/DD/YYYY');
                                    //$.datepicker.formatDate('mm/dd/yy', new Date(item.TermEndDate));
                                    if (item.NextRenewalDate != null) {
                                        TermNextDate = moment(new Date(item.NextRenewalDate)).utc().format('MM/DD/YYYY');
                                        //$.datepicker.formatDate('mm/dd/yy', new Date(item.NextRenewalDate));
                                        $("#hdNextRenewalTermStart").val(TermNextDate);
                                    }
                                    else
                                        $("#hdNextRenewalTermStart").val("");
                                    $("#hdCurrentRenewalTermEnd").val(TermEndDate);
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

                        }
                        else {
                            vAction = "openmenuRenewalDel";

                            if (TermNextDate != null && TermNextDate != "" && typeof (TermNextDate) != "undefined") {
                                var nextDate = moment(new Date(TermNextDate)).utc().format('MM/DD/YYYY');

                                //if ($.datepicker.formatDate('mm/dd/yy', new Date(item.RenewedDate)) == $.datepicker.formatDate('mm/dd/yy', nextDate) && item.RenewalType == "") {
                                if (moment(new Date(item.RenewedDate)).utc().format('MM/DD/YYYY') == nextDate && item.RenewalType == "") {
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
                            str += '  <tr id="ExpRenewalViewHistoryTerm' + indexCount + '" class="termExpired" style="display:none;">';
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
                                var fRenewedDate = "";
                                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                                { fRenewedDate = moment(new Date(item.RenewedDate)).utc().format('MM/DD/YYYY'); }
                                else { fRenewedDate = moment(new Date(item.RenewedDate)).utc().format(localStorage.AppDateFormat); }
                                str += ' <td id="RenewedDate' + indexCount + '">' + fRenewedDate + '</td>';
                            } else {
                                str += ' <td id="RenewedDate' + indexCount + '"></td>';
                            }
                            if (item.TermEndDate != null) {
                                var fTermEndDate = "";
                                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                                { fTermEndDate = moment(new Date(item.TermEndDate)).utc().format('MM/DD/YYYY'); }
                                else { fTermEndDate = moment(new Date(item.TermEndDate)).utc().format(localStorage.AppDateFormat); }
                                str += ' <td id="TermEndDate' + indexCount + '">' + fTermEndDate + '</td>';
                            } else {
                                str += ' <td id="TermEndDate' + indexCount + '"></td>';
                            }

                            if (item.TermStatus == "Current")
                                str += '  <td id="TermStatus' + indexCount + '" style="display:none;"><b title="Current" class="status_green" style="padding: 5px 0px; color:#fff;display: inline-block;width: 88px;vertical-align: middle;text-align: center;">' + item.TermStatus + '<img src="../Content/Images/down_arrow.png" style="width: 8px;margin-top: 4px !important;"  alt="Open Menu" title="Open Menu" class="' + vActionStatus + ' edithide margin-left-5"></b></td>';
                            else if (item.TermStatus == "Ended")
                                str += '  <td id="TermStatus' + indexCount + '" style="display:none;"><b title="Ended" class="status_Gray" style="padding: 5px 0px; color:#fff;display: inline-block;width: 88px;vertical-align: middle;text-align: center;">' + item.TermStatus + '</b></td>';
                            else if (item.TermStatus == "Expired") {
                                if (TermEndDate != "") {
                                    var dateEnd = new Date(TermEndDate);
                                    if (todaydate <= dateEnd) {
                                        if (vActionStatus != "")
                                            str += '  <td id="TermStatus' + indexCount + '" style="display:none;"><b title="Expired" class="status_red" style="padding: 5px 0px; color:#fff;display: inline-block;width: 88px;vertical-align: middle;text-align: center;">' + item.TermStatus + '<img src="../Content/Images/down_arrow.png" style="width: 8px;margin-top: 4px !important;" alt="Open Menu" title="Open Menu" class="' + vActionStatus + ' edithide margin-left-5"></b></td>';
                                        else
                                            str += '  <td id="TermStatus' + indexCount + '" style="display:none;"><b title="Expired" class="status_red" style="padding: 5px 0px; color:#fff;display: inline-block;width: 88px;vertical-align: middle;text-align: center;">' + item.TermStatus + '</b></td>';
                                    }
                                    else
                                        str += '  <td id="TermStatus' + indexCount + '" style="display:none;"><b title="Expired" class="status_red" style="padding: 5px 0px; color:#fff;display: inline-block;width: 88px;vertical-align: middle;text-align: center;">' + item.TermStatus + '</b></td>';
                                }
                                else {
                                    str += '  <td id="TermStatus' + indexCount + '" style="display:none;"><b title="Expired" class="status_red" style="padding: 5px 0px; color:#fff;display: inline-block;width: 88px;vertical-align: middle;text-align: center;">' + item.TermStatus + '</b></td>';
                                }

                            }
                            else if (item.TermStatus == "Not Started")
                                str += '  <td id="TermStatus' + indexCount + '" style="display:none;"><b title="Not Started" class="status_blue" style="padding: 5px 0px; color:#fff;display: inline-block;width: 88px;vertical-align: middle;text-align: center;">' + item.TermStatus + '</b></td>';
                            else
                                str += '  <td id="TermStatus' + indexCount + '" style="display:none;"><b title="Current" class="" style="padding: 5px 0px; color:;display: inline-block;width: 88px;vertical-align: middle;text-align: center;">' + item.TermStatus + '</b></td>';
                            str += ' <td id="Status' + indexCount + '" style="display:none;">' + item.Status + '</td>';
                            str += ' <td id="RenewalNotes' + indexCount + '" style="display:none;">' + item.RenewalNotes + '</td>';
                            str += '  <td id="RenewalConfirmParticipants' + indexCount + '" style="display:none;"> ' + (item.RenewalConfirmParticipants == "" ? '-' : item.RenewalConfirmParticipants) + ' </td>';
                            str += ' <td id="RenewedOn' + indexCount + '" style="display:none;">' + (item.RenewedOn != null ? moment(new Date(item.RenewedOn)).utc().format('MM/DD/YYYY') : "-") + '</td>';
                            str += ' <td id="RenewedBy' + indexCount + '" style="display:none;">' + (item.RenewedBy == "" ? '-' : item.RenewedBy) + '</td>';
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
                        $("#renewalViewHistoryTerm").append('No items found.');


                    var TermNameLast = $("#renewalViewHistoryTerm tr:last td:first").text();
                    if (TermNameLast != "Initial Term") {
                        var countTerm = TermNameLast.replace("Renewal ", "");
                        $("#AddRenewalTerm").text("+Add Terms");
                        $("#ddlTermPeriodSetRenewal").find("option").show();
                        if ((parseInt(countTerm)) <= 15)
                            $("#ddlTermPeriodSetRenewal").find("option:lt(" + (parseInt(countTerm)) + ")").hide();
                        else
                            $("#ddlTermPeriodSetRenewal").find("option:lt(15)").hide();
                        if ((contractItem != null && typeof (contractItem) != "undefined") && ($(contractItem).find("ddlTermPeriodSetRenewal").length > 0 ? $(contractItem).find("ddlTermPeriodSetRenewal").text() : "") == "")
                            $("#ddlTermPeriodSetRenewal").prop('selectedIndex', (parseInt(countTerm)));
                        else {
                            var elmop = $("#ddlTermPeriodSetRenewal option[value='" + ((contractItem != null && typeof (contractItem) != "undefined") ? ($(contractItem).find("ddlTermPeriodSetRenewal").length > 0 ? $(contractItem).find("ddlTermPeriodSetRenewal").text() : "") : "") + "']");
                            if ($(elmop).length > 0 && $(elmop).css('display') != 'none') {
                                $("#ddlTermPeriodSetRenewal").val(((contractItem != null && typeof (contractItem) != "undefined") ? ($(contractItem).find("ddlTermPeriodSetRenewal").length > 0 ? $(contractItem).find("ddlTermPeriodSetRenewal").text() : "") : ""));
                            }
                            else {
                                $("select#ddlTermPeriodSetRenewal").prop('selectedIndex', ((parseInt(countTerm) <= 15) ? parseInt(countTerm) : 15));
                            }
                        }
                    }
                    else {
                        $("#AddRenewalTerm").text("+Add Terms");
                        if ((contractItem != null && typeof (contractItem) != "undefined") && ($(contractItem).find("ddlTermPeriodSetRenewal").length > 0 ? $(contractItem).find("ddlTermPeriodSetRenewal").text() : "") != "") {
                            if ($("#ddlTermPeriodSetRenewal option[value='" + ((contractItem != null && typeof (contractItem) != "undefined") ? ($(contractItem).find("ddlTermPeriodSetRenewal").length > 0 ? $(contractItem).find("ddlTermPeriodSetRenewal").text() : "") : "") + "']").length > 0 && !($("#ddlTermPeriodSetRenewal option[value='" + ($(contractItem).find("ddlTermPeriodSetRenewal").length > 0 ? $(contractItem).find("ddlTermPeriodSetRenewal").text() : "") + "']").css('display') == "none"))
                                $("#ddlTermPeriodSetRenewal").val(((contractItem != null && typeof (contractItem) != "undefined") ? ($(contractItem).find("ddlTermPeriodSetRenewal").length > 0 ? $(contractItem).find("ddlTermPeriodSetRenewal").text() : "") : ""));
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
                            $("#RenewedOn" + (parseInt(RenewIndex) + 1)).html(html);
                        }
                        if ((contractItem != null && typeof (contractItem) != "undefined") && ($(contractItem).find("AutoRenew").length > 0 ? $(contractItem).find("AutoRenew").text() : "") == "Yes") {
                            // $(".ManRenewal").css('display', 'none');
                            // $("#RenewTerm").css('display', '');
                        }

                        else {
                            // $(".ManRenewal").css('display', '');
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
                    $("#AutoContractRenewTermCount").find("option").show();
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
                if (!(IsStatus && IsPermission)) {
                    $('.openmenuRenewalAll').each(function (index) { $(this).css('pointer-events', 'none') });
                    $('.openmenuRenewalDel').each(function (index) { $(this).css('pointer-events', 'none') });
                    $('.openmenuRenewalExp').each(function (index) { $(this).css('pointer-events', 'none') });
                    $('.openmenuRenewalCur').each(function (index) { $(this).css('pointer-events', 'none') });
                }
                else {
                    $('.openmenuRenewalAll').each(function (index) { $(this).css('pointer-events', '') });
                    $('.openmenuRenewalDel').each(function (index) { $(this).css('pointer-events', '') });
                    $('.openmenuRenewalExp').each(function (index) { $(this).css('pointer-events', '') });
                    $('.openmenuRenewalCur').each(function (index) { $(this).css('pointer-events', '') });
                }
            },
            error:
                function (data) {

                    $("#renewalViewHistoryTerm").empty();
                    $("#renewalViewHistoryTerm").append('No items found.');
                }
        });
    }
    else {
        $("#AddInitialTerm").css("display", "");
    }
}


//function AddRenewalTerm(isMultiple) {
//    RenewalAddFlag = true;
//    var length = $("#renewalViewHistoryTerm tr").length;
//    $("#txtRenewStartDate").prop('disabled', false);
//    $("#txtRenewStartDate").addClass('form-contro-Date');
//    $("#txtRenewStartDate").removeClass('form-contro-NoDate');
//    $('input[type="radio"][name="rdRenewTermEndDate"][value="EndDate"]').prop('disabled', false);
//    $('input[type="radio"][name="rdRenewTermEndDate"][value="Term"]').prop('disabled', false);
//    if (length != 0) {
//        var el = $('#renewalViewHistoryTerm tr:last').find('td:eq(2)');
//        var TermNameLast = $("#renewalViewHistoryTerm tr:last td:first").text();
//        var countTerm = TermNameLast.replace("Renewal ", "");
//        var valdate = el != null && typeof (el) != "undefined" ? $(el).text() : "";
//        if (valdate != "") {
//            var parts = valdate.split("/");
//            var lastdate = null;
//            if (DatepickerFormat == "dd/mm/yy") {
//                lastdate = new Date(parts[2], parts[1] - 1, parts[0]);
//            }
//            else {
//                lastdate = new Date(parts[2], parts[0] - 1, parts[1]);
//            }
//            renewalPrevDate = new Date(lastdate.setDate(lastdate.getDate() + 1));
//            var temend = new Date(renewalPrevDate);
//            $("#txtRenewStartDate").datepicker("option", "minDate", renewalPrevDate);
//            $("#txtRenewStartDate").datepicker("setDate", renewalPrevDate);
//            $("#txtRenewEndDate").datepicker("option", "minDate", new Date(temend.setDate(temend.getDate() + 1)));
//        }
//        else {
//            $("#txtRenewStartDate").datepicker("option", "minDate", null);
//            $("#txtRenewEndDate").datepicker("option", "minDate", null);
//            $("#txtRenewStartDate").val('');
//            $("#txtRenewEndDate").val('');
//        }
//        if (TermNameLast == "Initial Term") {
//            $("#RenewalTermNew").dialog("option", "title", "Renewal 1");
//        }
//        else {
//            $("#RenewalTermNew").dialog("option", "title", "Renewal " + (parseInt(countTerm) + 1));
//        }
//        $("#SendRenewalNotificationNew").css("display", "");
//        $("#RenewalChecklistNew").css("display", "");
//    }
//    else {
//        $("#txtRenewStartDate").datepicker("option", "minDate", null);
//        $("#txtRenewEndDate").datepicker("option", "minDate", null);
//        $("#RenewalTermNew").dialog("option", "title", "Initial Term");
//        $("#txtRenewStartDate").val('');
//        $("#txtRenewEndDate").val('');
//        $("#SendRenewalNotificationNew").css("display", "none");
//        $("#RenewalChecklistNew").css("display", "none");
//    }
//    $("#txtRenewStartDate").datepicker("option", "maxDate", null);
//    $("#txtRenewEndDate").datepicker("option", "maxDate", null);
//    GetValuesAndAutoPopulate("ddlRenewalNotfInternalNew", "");
//    $("#txtRenewalNotesNew").val('');
//    $('input[type="checkbox"][name="checkboxNotifyNew"]').prop('checked', false);
//    $("#rdRenewTermEndDate").val('');
//    $('input[type="radio"][name="rdRenewTermEndDate"][value="Term"]').prop('checked', true);
//    $("#ContractTermRenewNew").val(1);
//    $("#ContractTermRenewChoicesNew").val('days');
//    $("#txtRenewStatus").html('<b title="Not Started" class="" style="padding: 5px 0px; display: inline-block;width: 88px;vertical-align: middle;text-align: center;">Not Started</b>');
//    EnableContractTermRenewEndChoice(false);
//    $("#RenewalTermNew").dialog("open");
//}

function AddRenewalTerm(isMultiple) {
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

    $("#SendRenewalNotificationNew").css("display", "none");
    $("#RenewalChecklistNew").css("display", "none");
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
        var el = $('#renewalViewHistoryTerm tr:last').find('td:eq(2)');
        var TermNameLast = $("#renewalViewHistoryTerm tr:last td:first").text();
        var countTerm = TermNameLast.replace("Renewal ", "");
        var valdate = el != null && typeof (el) != "undefined" ? $(el).text() : "";
        if (valdate != "") {
            var parts = valdate.split("/");
            var lastdate = null;
            if (DatepickerFormat == "dd/mm/yy") {
                lastdate = new Date(parts[2], parts[1] - 1, parts[0]);
            }
            else {
                lastdate = new Date(parts[2], parts[0] - 1, parts[1]);
            }
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

    }
    else {

        $("#txtRenewStartDate").datepicker("option", "minDate", null);
        $("#txtRenewEndDate").datepicker("option", "minDate", null);

        $("#txtRenewStartDate").val('');
        $("#txtRenewEndDate").val('');


        $("#tdNameofTerms").html('Initial Term');
        $("#ddlTermPeriodSetRenewal").val('Renewal 1');
    }
    $("#txtRenewStartDate").datepicker("option", "maxDate", null);
    $("#txtRenewEndDate").datepicker("option", "maxDate", null);
    EnableContractTermRenewEndChoice(false, isMultiple);
    $("#trNumberOfTerms").css('display', '');

}
function RenewTerm() {
    var term = (RenewalName != null && RenewalName != "" && typeof (RenewalName) != "undefined") ? RenewalName : "";
    if (term != "") {
        var indexedit = term.replace("Renewal ", "");
        indexedit = parseInt(indexedit) + 1;
        $('#Status' + indexedit).text("Renewed");
        $('#RenewedBy' + indexedit).text(localStorage.UserName);
        $('#RenewalType' + indexedit).text("Manual");
        $('#RenewedOn' + indexedit).text($.datepicker.formatDate('mm/dd/yy', new Date()));
        $('#Modified' + indexedit).text($.datepicker.formatDate('mm/dd/yy', new Date()));
        $('#ModifiedBy' + indexedit).text(localStorage.UserName);
    }

    //$("#RenewTerm").css('display', 'none');
}
function SaveAsTableRow(TermName) {
    if (requiredValidator("RenewalTermNew")) {

        var valcheckauth = $(':input[type=radio][name=TermsSingleMultiple]:checked').val();
        //var vRenewalChecklist = "";
        //if ($("#chkRenewalModificationsNew").is(':checked')) {
        //    if (vRenewalChecklist == '') {
        //        vRenewalChecklist = "Renewal without any modifications";
        //    }
        //    else {
        //        vRenewalChecklist += "; Renewal without any modifications";
        //    }
        //}
        //if ($("#chkRenewalPriceAdjustmentsNew").is(':checked')) {
        //    if (vRenewalChecklist == '') {
        //        vRenewalChecklist = "Renewal with Price Adjustments (minor)";
        //    }
        //    else {
        //        vRenewalChecklist += "; Renewal with Price Adjustments (minor)";
        //    }
        //}
        //if ($("#chkRenewalRepricingNew").is(':checked')) {
        //    if (vRenewalChecklist == '') {
        //        vRenewalChecklist = "Renewal with Repricing (major)";
        //    }
        //    else {
        //        vRenewalChecklist += "; Renewal with Repricing (major)";
        //    }
        //}
        //if ($("#chkRenewalOtherNew").is(':checked')) {
        //    if (vRenewalChecklist == '') {
        //        vRenewalChecklist = "Other Amendments";
        //    }
        //    else {
        //        vRenewalChecklist += "; Other Amendments";
        //    }
        //}

        //if (vRenewalChecklist == "" && TermName != "Initial Term") {
        //    swal("", "Select Renewal Checklist.");
        //}

        //else {

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
        var vLastRow = $("#renewalViewHistoryTerm tr:last").attr('id');

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
        var TermStartDate = $.datepicker.formatDate(DatepickerFormat, $("#txtRenewStartDate").datepicker('getDate'));
        var TermEndDate = $.datepicker.formatDate(DatepickerFormat, $("#txtRenewEndDate").datepicker('getDate'));
        var TermRenewStatushtml = $("#txtRenewStatus").html();
        var TermRenewStatus = $("#txtRenewStatus").text();
        if (TermRenewStatus == "Current") {
            $("#hdCurrentTermName").val(TermName);
            $("#hdCurrentRenewalTermEnd").val($.datepicker.formatDate('mm/dd/yy', $("#txtRenewEndDate").datepicker('getDate')));
            $("#hdCurrentRenewalTermStart").val(TermStartDate);

        }

        var TermChoice = "";
        var TermDays = "";
        //eO310478
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
        var newdate = null;
        if (DatepickerFormat == "dd/mm/yy") {
            var dateParts = TermStartDate.split("/");
            newdate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]); // month is 0-based
        }
        else {
            newdate = new Date(TermStartDate);
        }
        if (TermRenewStatus == "Current" || TermRenewStatus == "Ended") {
            vStatus = "Renewed";
            vRenewedBy = localStorage.UserName;
            vRenewedType = "Manual";
            vRenewedOn = $.datepicker.formatDate(DatepickerFormat, new Date(newdate.setDate(newdate.getDate() - 1)));
        }
        else if (TermRenewStatus == "Expired") {
            vStatus = "Expired";
            vRenewedBy = localStorage.UserName;
            vRenewedType = "Manual";
            vRenewedOn = "";
        }
        else {
            vStatus = "";
            vRenewedBy = "";
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
            str += '<td id="RenewedDate' + totalFileCount + '">' + TermStartDate + '</td>';
            str += '<td id="TermEndDate' + totalFileCount + '">' + TermEndDate + '</td>';
            str += '<td id="TermStatus' + totalFileCount + '" style="display:none;">' + TermRenewStatus + '</td>';
            str += '<td id="RenewalNotes' + totalFileCount + '" style="display:none;">' + vRenewalNotes + '</td>';
            if ($("#hdCurrentRenewalTermEnd").val() != null && typeof ($("#hdCurrentRenewalTermEnd")) != "undefined" && $("#hdCurrentRenewalTermEnd").val() != "") {
                var nextDate = new Date($("#hdCurrentRenewalTermEnd").val());
                nextDate = new Date(nextDate.setDate(nextDate.getDate() + 1));
                if ($.datepicker.formatDate('mm/dd/yy', new Date(TermStartDate)) == $.datepicker.formatDate('mm/dd/yy', nextDate)) {
                    RenewalName = TermName;
                    var html = $("#RenewTerm").html();
                    str += ' <td id="RenewedOn' + totalFileCount + '" style="display:none;">' + html + '</td>';



                }
                else {
                    str += ' <td id="RenewedOn' + totalFileCount + '" style="display:none;">' + vRenewedOn + '</td>';
                }
            }
            else {
                str += ' <td id="RenewedOn' + totalFileCount + '" style="display:none;">' + vRenewedOn + '</td>';
            }
            str += '<td id="RenewedBy' + totalFileCount + '" style="display:none;">' + vRenewedBy + '</td>';
            str += '<td id="RenewalConfirmParticipants' + totalFileCount + '" style="display:none;"></td>';
            str += '<td id="RenewalChecklist' + totalFileCount + '"  style="display:none;"></td>';
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

            if ((contractItem != null && typeof (contractItem) != "undefined") && ($(contractItem).find("AutoRenew").length > 0 ? $(contractItem).find("AutoRenew").text() : "") == "Yes") {
                //  $(".ManRenewal").css('display', 'none');
                // $("#RenewTerm").css('display', '');
            }

            else {
                // $(".ManRenewal").css('display', 'block');
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
                $('#TermEndDate' + indexedit).text(TermEndDate);

                $('#TermStatus' + indexedit).html(TermRenewStatushtml);
                $('#Status' + indexedit).text(vStatus);
                $('#RenewedBy' + indexedit).text(vRenewedBy);
                $('#RenewalType' + indexedit).text(vRenewedType);

                $('#RenewalNotes' + indexedit).text(vRenewalNotes);
                $('#RenewalChecklist' + indexedit).text('');
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
        if (!(IsStatus && IsPermission)) {
            $('.openmenuRenewalAll').each(function (index) { $(this).css('pointer-events', 'none') });
            $('.openmenuRenewalDel').each(function (index) { $(this).css('pointer-events', 'none') });
            $('.openmenuRenewalExp').each(function (index) { $(this).css('pointer-events', 'none') });
            $('.openmenuRenewalCur').each(function (index) { $(this).css('pointer-events', 'none') });
        }
        else {
            $('.openmenuRenewalAll').each(function (index) { $(this).css('pointer-events', '') });
            $('.openmenuRenewalDel').each(function (index) { $(this).css('pointer-events', '') });
            $('.openmenuRenewalExp').each(function (index) { $(this).css('pointer-events', '') });
            $('.openmenuRenewalCur').each(function (index) { $(this).css('pointer-events', '') });
        }

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
            $("#AddInitialTerm").css("display", "none");
            $("#AddRenewalTerm").css("display", "");
            $("#AddRenewalTerm").text("+Add Terms");
            $("#AutoContractRenewTermCount").find("option").show();
            $("#AutoContractRenewTermCount").find("option:lt(1)").hide();
            if ((contractItem != null && typeof (contractItem) != "undefined") && ($(contractItem).find("AutoContractRenewTermCount").length > 0 ? $(contractItem).find("AutoContractRenewTermCount").text() : "") == "") {
                // $("select#AutoContractRenewTermCount").prop('selectedIndex', 2);
                $("#AutoContractRenewTermCount").val("Unlimited");
            }
            else {
                var elmop = $("#AutoContractRenewTermCount option[value='" + ((contractItem != null && typeof (contractItem) != "undefined") ? ($(contractItem).find("AutoContractRenewTermCount").length > 0 ? $(contractItem).find("AutoContractRenewTermCount").text() : "") : "") + "']");
                if ($(elmop).length > 0 && $(elmop).css('display') != 'none') {
                    $("#AutoContractRenewTermCount").val(((contractItem != null && typeof (contractItem) != "undefined") ? ($(contractItem).find("AutoContractRenewTermCount").length > 0 ? $(contractItem).find("AutoContractRenewTermCount").text() : "") : ""));
                }
                else {
                    $("select#AutoContractRenewTermCount").prop('selectedIndex', 2);
                }
            }
        }
        else {
            $("#AddInitialTerm").css("display", "none");
            $("#AddRenewalTerm").css("display", "");
            var countTerm = TermNameLast.replace("Renewal ", "");
            $("#AddRenewalTerm").text("+Add Terms");
            $("#AutoContractRenewTermCount").find("option").show();
            if ((parseInt(countTerm)) <= 15)
                $("#AutoContractRenewTermCount").find("option:lt(" + (parseInt(countTerm)) + ")").hide();
            else
                $("#AutoContractRenewTermCount").find("option:lt(15)").hide();
            if ((contractItem != null && typeof (contractItem) != "undefined") && ($(contractItem).find("AutoContractRenewTermCount").length > 0 ? $(contractItem).find("AutoContractRenewTermCount").text() : "") == "")
                $("select#AutoContractRenewTermCount").prop('selectedIndex', ((parseInt(countTerm) <= 15) ? parseInt(countTerm) : 15));
            else {
                var elmop = $("#AutoContractRenewTermCount option[value='" + ((contractItem != null && typeof (contractItem) != "undefined") ? ($(contractItem).find("AutoContractRenewTermCount").length > 0 ? $(contractItem).find("AutoContractRenewTermCount").text() : "") : "") + "']");
                if ($(elmop).length > 0 && $(elmop).css('display') != 'none') {
                    $("#AutoContractRenewTermCount").val(((contractItem != null && typeof (contractItem) != "undefined") ? ($(contractItem).find("AutoContractRenewTermCount").length > 0 ? $(contractItem).find("AutoContractRenewTermCount").text() : "") : ""));
                }
                else {
                    $("select#AutoContractRenewTermCount").prop('selectedIndex', ((parseInt(countTerm) <= 15) ? parseInt(countTerm) : 15));
                }
            }

        }

        if (valcheckauth == "No") {
            AddRenewalTerm(true);
        }

        //$("#RenewalTermNew").dialog("close");
        //manoj
        if (document.getElementById("RequiresAuthorizationYes").style.display != "none" && TermName != "Initial Term") {
            $("#ContractConfirmSendTerm").trigger('change');
        }

        if (TermName == "Initial Term" && (typeof ($("#txtRenewConfirmSendDate").val()) == "undefined" || $("#txtRenewConfirmSendDate").val() == null || $("#txtRenewConfirmSendDate").val() == "")) {
            $("#ContractConfirmSendTerm").trigger('change');
        }
        //manoj
        //}
    }
}
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

                $("#txtRenewStartDatelb").text(($("#RenewedDate" + tbrowcount).text() == "" ? "-" : $("#RenewedDate" + tbrowcount).text()));

                $("#txtRenewEndDatelb").text(($("#TermEndDate" + tbrowcount).text() == "" ? "-" : $("#TermEndDate" + tbrowcount).text()));
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
                //Sridhar
                $('input[type="radio"][name="TermsSingleMultiple"][value="Yes"]').prop('checked', true);
                $(".trSingle").css('display', '');
                $(".trMultiple").css('display', 'none');
                $("#trNumberOfTerms").css('display', 'none');
                $("#SendRenewalNotificationNew").css("display", "none");
                $("#RenewalChecklistNew").css("display", "none");
                //Sridhar

                EditSaveFlag = false;
                var tbrowcount = $(el).attr('id').replace("renewalViewHistoryTerm", "");
                var TermNameLast = $("#renewalViewHistoryTerm tr:last td:first").text();
                var term = $("#RenewableTermName" + tbrowcount).text();
                $("#tdNameofTerms").html(term);
                $("#txtRenewStartDate").prop('disabled', false);
                $("#txtRenewStartDate").addClass('form-contro-Date');
                $("#txtRenewStartDate").removeClass('form-contro-NoDate');
                $('input[type="radio"][name="rdRenewTermEndDate"][value="EndDate"]').prop('disabled', false);
                $('input[type="radio"][name="rdRenewTermEndDate"][value="Term"]').prop('disabled', false);
                if (term == "Initial Term") {

                    //$("#RenewalChecklistNew").css("display", "none");
                    $("#SendRenewalNotificationNew").css("display", "none");
                    GetValuesAndAutoPopulate("ddlRenewalNotfInternalNew", "");
                    $('input[type="checkbox"][name="checkboxNotifyNew"]').prop('checked', false);

                    if (term != TermNameLast) {
                        var tempdateStart = null;
                        if ($("#RenewedDate" + (parseInt(tbrowcount) + 1)) != null && typeof ($("#RenewedDate" + (parseInt(tbrowcount) + 1))) != "undefined" && $("#RenewedDate" + (parseInt(tbrowcount) + 1)).text() != "") {
                            if (DatepickerFormat == "dd/mm/yy") {
                                var dateParts = $("#RenewedDate" + (parseInt(tbrowcount) + 1)).text().split('/');
                                tempdateStart = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                            }
                            else {
                                tempdateStart = new Date($("#RenewedDate" + (parseInt(tbrowcount) + 1)).text());
                            }
                        }
                        var tempdateStartthis = null;
                        if (DatepickerFormat == "dd/mm/yy") {
                            if ($("#RenewedDate" + tbrowcount).text() != "") {
                                var dateParts = $("#RenewedDate" + tbrowcount).text().split('/');
                                tempdateStartthis = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                            }
                        }
                        else {
                            tempdateStartthis = new Date($("#RenewedDate" + tbrowcount).text() == "" ? "" : $("#RenewedDate" + tbrowcount).text());
                        }

                        //var tempdateStart = ($("#RenewedDate" + (parseInt(tbrowcount) + 1)) != null && typeof ($("#RenewedDate" + (parseInt(tbrowcount) + 1))) != "undefined") ? ($("#RenewedDate" + (parseInt(tbrowcount) + 1)).text() == "" ? null : new Date($("#RenewedDate" + (parseInt(tbrowcount) + 1)).text())) : null;
                        //var tempdateStartthis = new Date($("#RenewedDate" + tbrowcount).text() == "" ? "" : $("#RenewedDate" + tbrowcount).text());
                        $("#txtRenewStartDate").datepicker("option", "maxDate", (tempdateStart != null ? new Date(tempdateStart.setDate(tempdateStart.getDate() - 1)) : null));
                        $("#txtRenewEndDate").datepicker("option", "maxDate", tempdateStart);
                        $("#txtRenewEndDate").datepicker("option", "minDate", (tempdateStartthis != null ? new Date(tempdateStartthis.setDate(tempdateStartthis.getDate() - 1)) : null));
                        $("#txtRenewStartDate").datepicker("option", "minDate", null);

                        if (DatepickerFormat == "dd/mm/yy") {
                            if ($("#TermEndDate" + tbrowcount).text() != "") {
                                var dateParts = $("#TermEndDate" + tbrowcount).text().split('/');
                                EndDateCheckRenewal = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                            }
                        }
                        else {
                            EndDateCheckRenewal = new Date($("#TermEndDate" + tbrowcount).text() == "" ? "" : $("#TermEndDate" + tbrowcount).text());
                        }

                    }
                    else {
                        var tempdateStartthis = null;
                        if (DatepickerFormat == "dd/mm/yy") {
                            if ($("#RenewedDate" + tbrowcount).text() != "") {
                                var dateParts = $("#RenewedDate" + tbrowcount).text().split('/');
                                tempdateStartthis = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                            }
                        }
                        else {
                            tempdateStartthis = new Date($("#RenewedDate" + tbrowcount).text() == "" ? "" : $("#RenewedDate" + tbrowcount).text());
                        }
                        //var tempdateStartthis = new Date($("#RenewedDate" + tbrowcount).text() == "" ? "" : $("#RenewedDate" + tbrowcount).text());
                        $("#txtRenewStartDate").datepicker("option", "maxDate", null);
                        $("#txtRenewEndDate").datepicker("option", "maxDate", null);
                        $("#txtRenewEndDate").datepicker("option", "minDate", (tempdateStartthis != null ? new Date(tempdateStartthis.setDate(tempdateStartthis.getDate() + 1)) : null));
                        $("#txtRenewStartDate").datepicker("option", "minDate", null);
                        EndDateCheckRenewal = "";
                    }
                }
                else {
                    if (term == TermNameLast) {
                        var tempdateEnd = null;
                        if ($("#TermEndDate" + (parseInt(tbrowcount) - 1)) != null && typeof ($("#TermEndDate" + (parseInt(tbrowcount) - 1))) != "undefined" && $("#TermEndDate" + (parseInt(tbrowcount) - 1)) != "") {
                            if (DatepickerFormat == "dd/mm/yy") {
                                var dateParts = $("#TermEndDate" + (parseInt(tbrowcount) - 1)).text().split('/');
                                tempdateEnd = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                            }
                            else {
                                tempdateEnd = new Date($("#TermEndDate" + (parseInt(tbrowcount) - 1)).text());
                            }
                        }

                        var tempdateStart = null;
                        if ($("#RenewedDate" + (parseInt(tbrowcount) + 1)) != null && typeof ($("#RenewedDate" + (parseInt(tbrowcount) + 1))) != "undefined" && $("#RenewedDate" + (parseInt(tbrowcount) + 1)).text() != "") {
                            if (DatepickerFormat == "dd/mm/yy") {
                                var dateParts = $("#RenewedDate" + (parseInt(tbrowcount) + 1)).text().split('/');
                                tempdateStart = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                            }
                            else {
                                tempdateStart = new Date($("#RenewedDate" + (parseInt(tbrowcount) + 1)).text());
                            }
                        }

                        var tempdateStartthis = null;
                        if (DatepickerFormat == "dd/mm/yy") {
                            if ($("#RenewedDate" + tbrowcount).text() != "") {
                                var dateParts = $("#RenewedDate" + tbrowcount).text().split('/');
                                tempdateStartthis = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                            }
                        }
                        else {
                            tempdateStartthis = new Date($("#RenewedDate" + tbrowcount).text() == "" ? "" : $("#RenewedDate" + tbrowcount).text());
                        }


                        var tempdateEndthis = null;
                        if (DatepickerFormat == "dd/mm/yy") {
                            if ($("#TermEndDate" + tbrowcount).text() != "") {
                                var dateParts = $("#TermEndDate" + tbrowcount).text().split('/');
                                tempdateEndthis = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                            }
                        }
                        else {
                            tempdateEndthis = new Date($("#TermEndDate" + tbrowcount).text() == "" ? "" : $("#TermEndDate" + tbrowcount).text());
                        }

                        //var tempdateEnd = ($("#TermEndDate" + (parseInt(tbrowcount) - 1)) != null && typeof ($("#TermEndDate" + (parseInt(tbrowcount) - 1))) != "undefined") ? ($("#TermEndDate" + (parseInt(tbrowcount) - 1)).text() == "" ? null : new Date($("#TermEndDate" + (parseInt(tbrowcount) - 1)).text())) : null;
                        //var tempdateStart = ($("#RenewedDate" + (parseInt(tbrowcount) + 1)) != null && typeof ($("#RenewedDate" + (parseInt(tbrowcount) + 1))) != "undefined") ? ($("#RenewedDate" + (parseInt(tbrowcount) + 1)).text() == "" ? null : new Date($("#RenewedDate" + (parseInt(tbrowcount) + 1)).text())) : null;
                        //var tempdateStartthis = new Date($("#RenewedDate" + tbrowcount).text() == "" ? "" : $("#RenewedDate" + tbrowcount).text());
                        //var tempdateEndthis = new Date($("#TermEndDate" + tbrowcount).text() == "" ? "" : $("#TermEndDate" + tbrowcount).text());
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
                        var tempdateEnd = null;
                        if ($("#TermEndDate" + (parseInt(tbrowcount) - 1)) != null && typeof ($("#TermEndDate" + (parseInt(tbrowcount) - 1))) != "undefined" && $("#TermEndDate" + (parseInt(tbrowcount) - 1)) != "") {
                            if (DatepickerFormat == "dd/mm/yy") {
                                var dateParts = $("#TermEndDate" + (parseInt(tbrowcount) - 1)).text().split('/');
                                tempdateEnd = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                            }
                            else {
                                tempdateEnd = new Date($("#TermEndDate" + (parseInt(tbrowcount) - 1)).text());
                            }
                        }

                        var tempdateStart = null;
                        if ($("#RenewedDate" + (parseInt(tbrowcount) + 1)) != null && typeof ($("#RenewedDate" + (parseInt(tbrowcount) + 1))) != "undefined" && $("#RenewedDate" + (parseInt(tbrowcount) + 1)).text() != "") {
                            if (DatepickerFormat == "dd/mm/yy") {
                                var dateParts = $("#RenewedDate" + (parseInt(tbrowcount) + 1)).text().split('/');
                                tempdateStart = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                            }
                            else {
                                tempdateStart = new Date($("#RenewedDate" + (parseInt(tbrowcount) + 1)).text());
                            }
                        }

                        var tempdateStartthis = null;
                        if (DatepickerFormat == "dd/mm/yy") {
                            if ($("#RenewedDate" + tbrowcount).text() != "") {
                                var dateParts = $("#RenewedDate" + tbrowcount).text().split('/');
                                tempdateStartthis = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                            }
                        }
                        else {
                            tempdateStartthis = new Date($("#RenewedDate" + tbrowcount).text() == "" ? "" : $("#RenewedDate" + tbrowcount).text());
                        }


                        var tempdateEndthis = null;
                        if (DatepickerFormat == "dd/mm/yy") {
                            if ($("#TermEndDate" + tbrowcount).text() != "") {
                                var dateParts = $("#TermEndDate" + tbrowcount).text().split('/');
                                tempdateEndthis = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                            }
                        }
                        else {
                            tempdateEndthis = new Date($("#TermEndDate" + tbrowcount).text() == "" ? "" : $("#TermEndDate" + tbrowcount).text());
                        }

                        //var tempdateEnd = ($("#TermEndDate" + (parseInt(tbrowcount) - 1)) != null && typeof ($("#TermEndDate" + (parseInt(tbrowcount) - 1))) != "undefined") ? ($("#TermEndDate" + (parseInt(tbrowcount) - 1)).text() == "" ? null : new Date($("#TermEndDate" + (parseInt(tbrowcount) - 1)).text())) : null;
                        //var tempdateStart = ($("#RenewedDate" + (parseInt(tbrowcount) + 1)) != null && typeof ($("#RenewedDate" + (parseInt(tbrowcount) + 1))) != "undefined") ? ($("#RenewedDate" + (parseInt(tbrowcount) + 1)).text() == "" ? null : new Date($("#RenewedDate" + (parseInt(tbrowcount) + 1)).text())) : null;

                        //var tempdateStartthis = new Date($("#RenewedDate" + tbrowcount).text() == "" ? "" : $("#RenewedDate" + tbrowcount).text());
                        //var tempdateEndthis = new Date($("#TermEndDate" + tbrowcount).text() == "" ? "" : $("#TermEndDate" + tbrowcount).text());

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
                        if (DatepickerFormat == "dd/mm/yy") {
                            if ($("#TermEndDate" + tbrowcount).text() != "") {
                                var dateParts = $("#TermEndDate" + tbrowcount).text().split('/');
                                EndDateCheckRenewal = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                            }
                        }
                        else {
                            EndDateCheckRenewal = new Date($("#TermEndDate" + tbrowcount).text() == "" ? "" : $("#TermEndDate" + tbrowcount).text());
                        }
                        //EndDateCheckRenewal = new Date($("#TermEndDate" + tbrowcount).text() == "" ? "" : $("#TermEndDate" + tbrowcount).text());
                    }
                    //$("#RenewalChecklistNew").css("display", "");
                    $("#SendRenewalNotificationNew").css("display", "none");
                }
                if (DatepickerFormat == "dd/mm/yy") {
                    if ($("#RenewedDate" + tbrowcount).text() == "") {
                        $("#txtRenewStartDate").val("");
                    }
                    else {
                        var dateParts = $("#RenewedDate" + tbrowcount).text().split('/');
                        $("#txtRenewStartDate").val($.datepicker.formatDate(DatepickerFormat, new Date(dateParts[2], dateParts[1] - 1, dateParts[0])));
                    }

                }
                else {
                    $("#txtRenewStartDate").val($.datepicker.formatDate(DatepickerFormat, new Date($("#RenewedDate" + tbrowcount).text() == "" ? "" : $("#RenewedDate" + tbrowcount).text())));
                }


                if ($("#ContractTermEach" + tbrowcount).text() == "") {
                    $("#ContractTermRenewChoicesNew").prop('disabled', true);
                    $("#ContractTermRenewNew").prop('disabled', true);
                    $("#ContractTermRenewNew").val('1');
                    $("#ContractTermRenewChoicesNew").val('years');
                    $("#txtRenewEndDate").prop('disabled', false);
                    $("#txtRenewEndDate").addClass('form-contro-Date');
                    $("#txtRenewEndDate").removeClass('form-contro-NoDate');

                    $('input[type="radio"][name="rdRenewTermEndDate"][value="EndDate"]').prop('checked', true);

                    if (DatepickerFormat == "dd/mm/yy") {
                        if ($("#TermEndDate" + tbrowcount).text() == "") {
                            $("#txtRenewEndDate").val("");
                        }
                        else {
                            var dateParts = $("#TermEndDate" + tbrowcount).text().split('/');
                            $("#txtRenewEndDate").val($.datepicker.formatDate(DatepickerFormat, new Date(dateParts[2], dateParts[1] - 1, dateParts[0])));
                        }

                    }
                    else {
                        $("#txtRenewEndDate").val($.datepicker.formatDate('mm/dd/yy', new Date($("#TermEndDate" + tbrowcount).text() == "" ? "" : $("#TermEndDate" + tbrowcount).text())));
                    }

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
                GetValuesAndAutoPopulate("ddlAuthorizedBy", ($("#RenewalConfirmParticipants" + tbrowcount).text() == "" ? "-" : $("#RenewalConfirmParticipants" + tbrowcount).text()));
                GetValuesAndAutoPopulate("ddlRenewedBy", ($("#RenewedBy" + tbrowcount).text() == "" ? "-" : $("#RenewedBy" + tbrowcount).text()));
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
                $("#RenewalTermNew").dialog("option", "title", term);
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
                   $("#AutoContractRenewTermCount").find("option").show();
                   $("#AutoContractRenewTermCount").find("option:lt(1)").hide();

                   if ((contractItem != null && typeof (contractItem) != "undefined") && ($(contractItem).find("AutoContractRenewTermCount").length > 0 ? $(contractItem).find("AutoContractRenewTermCount").text() : "") == "")
                       $("#AutoContractRenewTermCount").val("Unlimited");
                   else {
                       var elmop = $("#AutoContractRenewTermCount option[value='" + ((contractItem != null && typeof (contractItem) != "undefined") ? ($(contractItem).find("AutoContractRenewTermCount").length > 0 ? $(contractItem).find("AutoContractRenewTermCount").text() : "") : "") + "']");
                       if ($(elmop).length > 0 && $(elmop).css('display') != 'none') {
                           $("#AutoContractRenewTermCount").val(((contractItem != null && typeof (contractItem) != "undefined") ? ($(contractItem).find("AutoContractRenewTermCount").length > 0 ? $(contractItem).find("AutoContractRenewTermCount").text() : "") : ""));
                       }
                       else {
                           $("select#AutoContractRenewTermCount").prop('selectedIndex', 2);
                       }
                   }
               }
               else {
                   $("#AddInitialTerm").css("display", "none");
                   $("#AddRenewalTerm").css("display", "");
                   var countTerm = TermNameLast.replace("Renewal ", "");
                   $("#AddRenewalTerm").text("+Add Terms");
                   if ((parseInt(countTerm)) <= 15)
                       $("#AutoContractRenewTermCount").find("option:lt(" + (parseInt(countTerm)) + ")").hide();
                   else
                       $("#AutoContractRenewTermCount").find("option:lt(15)").hide();
                   if ((contractItem != null && typeof (contractItem) != "undefined") && ($(contractItem).find("AutoContractRenewTermCount").length > 0 ? $(contractItem).find("AutoContractRenewTermCount").text() : "") == "")
                       $("select#AutoContractRenewTermCount").prop('selectedIndex', ((parseInt(countTerm) <= 15) ? parseInt(countTerm) : 15));
                   else {
                       var elmop = $("#AutoContractRenewTermCount option[value='" + ((contractItem != null && typeof (contractItem) != "undefined") ? ($(contractItem).find("AutoContractRenewTermCount").length > 0 ? $(contractItem).find("AutoContractRenewTermCount").text() : "") : "") + "']");
                       if ($(elmop).length > 0 && $(elmop).css('display') != 'none') {
                           $("#AutoContractRenewTermCount").val(((contractItem != null && typeof (contractItem) != "undefined") ? ($(contractItem).find("AutoContractRenewTermCount").length > 0 ? $(contractItem).find("AutoContractRenewTermCount").text() : "") : ""));
                       }
                       else {
                           $("select#AutoContractRenewTermCount").prop('selectedIndex', ((parseInt(countTerm) <= 15) ? parseInt(countTerm) : 15));
                       }
                   }



               }
               $('#TermStatus' + (parseInt(index) + 1)).html('<b title="Expired" class="status_red" style="padding: 5px 24px; color:#fff">Expired<img src="../Content/Images/down_arrow.png" style="width: 8px;margin-top: 4px !important;"  alt="Open Menu" title="Open Menu" class="openmenuRenewalCur edithide margin-left-5"></b>');
               $('#Status' + (parseInt(index) + 1)).text('Expired');
               $(".openmenuRenewalCur").contextMenu({
                   menu: 'menuRenewalCur', leftButton: true
               }, function (action, el, pos) {
                   contextMenuRenewal(action, el.parent("b").parent("td").parent("tr"), pos);
               });

               $("#AddInitialTerm").css("display", "none");
               if ((contractItem != null && typeof (contractItem) != "undefined")) {
                   //contractItem.RenewalConfirmOverall = "";
                   //contractItem.RenewalConfirmParticipantsXML = "";
               }
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
                   $("#AutoContractRenewTermCount").find("option").show();
                   $("#AutoContractRenewTermCount").find("option:lt(1)").hide();
                   if ((contractItem != null && typeof (contractItem) != "undefined") && ($(contractItem).find("AutoContractRenewTermCount").length > 0 ? $(contractItem).find("AutoContractRenewTermCount").text() : "") == "")
                       $("#AutoContractRenewTermCount").val("Unlimited");
                   else {
                       var elmop = $("#AutoContractRenewTermCount option[value='" + ((contractItem != null && typeof (contractItem) != "undefined") ? ($(contractItem).find("AutoContractRenewTermCount").length > 0 ? $(contractItem).find("AutoContractRenewTermCount").text() : "") : "") + "']");
                       if ($(elmop).length > 0 && $(elmop).css('display') != 'none') {
                           $("#AutoContractRenewTermCount").val(((contractItem != null && typeof (contractItem) != "undefined") ? ($(contractItem).find("AutoContractRenewTermCount").length > 0 ? $(contractItem).find("AutoContractRenewTermCount").text() : "") : ""));
                       }
                       else {
                           $("select#AutoContractRenewTermCount").prop('selectedIndex', 2);
                       }
                   }
               }
               else {
                   $("#AddInitialTerm").css("display", "none");
                   $("#AddRenewalTerm").css("display", "");
                   var countTerm = TermNameLast.replace("Renewal ", "");
                   $("#AddRenewalTerm").text("+Add Terms");
                   if ((parseInt(countTerm)) <= 15)
                       $("#AutoContractRenewTermCount").find("option:lt(" + (parseInt(countTerm)) + ")").hide();
                   else
                       $("#AutoContractRenewTermCount").find("option:lt(15)").hide();
                   if ((contractItem != null && typeof (contractItem) != "undefined") && ($(contractItem).find("AutoContractRenewTermCount").length > 0 ? $(contractItem).find("AutoContractRenewTermCount").text() : "") == "")
                       $("select#AutoContractRenewTermCount").prop('selectedIndex', ((parseInt(countTerm) <= 15) ? parseInt(countTerm) : 15));
                   else {
                       var elmop = $("#AutoContractRenewTermCount option[value='" + ((contractItem != null && typeof (contractItem) != "undefined") ? ($(contractItem).find("AutoContractRenewTermCount").length > 0 ? $(contractItem).find("AutoContractRenewTermCount").text() : "") : "") + "']");
                       if ($(elmop).length > 0 && $(elmop).css('display') != 'none') {
                           $("#AutoContractRenewTermCount").val(((contractItem != null && typeof (contractItem) != "undefined") ? ($(contractItem).find("AutoContractRenewTermCount").length > 0 ? $(contractItem).find("AutoContractRenewTermCount").text() : "") : ""));
                       }
                       else {
                           $("select#AutoContractRenewTermCount").prop('selectedIndex', ((parseInt(countTerm) <= 15) ? parseInt(countTerm) : 15));
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
               $("#AutoContractRenewTermCount").find("option").show();
               if ((parseInt(index)) <= 15)
                   $("#AutoContractRenewTermCount").find("option:lt(" + (parseInt(index)) + ")").hide();
               else
                   $("#AutoContractRenewTermCount").find("option:lt(15)").hide();
               if ((contractItem != null && typeof (contractItem) != "undefined") && ($(contractItem).find("AutoContractRenewTermCount").length > 0 ? $(contractItem).find("AutoContractRenewTermCount").text() : "") == "")
                   $("select#AutoContractRenewTermCount").prop('selectedIndex', ((parseInt(countTerm) <= 15) ? parseInt(countTerm) : 15));
               else {
                   var elmop = $("#AutoContractRenewTermCount option[value='" + ((contractItem != null && typeof (contractItem) != "undefined") ? ($(contractItem).find("AutoContractRenewTermCount").length > 0 ? $(contractItem).find("AutoContractRenewTermCount").text() : "") : "") + "']");
                   if ($(elmop).length > 0 && $(elmop).css('display') != 'none') {
                       $("#AutoContractRenewTermCount").val(((contractItem != null && typeof (contractItem) != "undefined") ? ($(contractItem).find("AutoContractRenewTermCount").length > 0 ? $(contractItem).find("AutoContractRenewTermCount").text() : "") : ""));
                   }
                   else {
                       $("select#AutoContractRenewTermCount").prop('selectedIndex', ((parseInt(countTerm) <= 15) ? parseInt(countTerm) : 15));
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
                    $("#AutoContractRenewTermCount").find("option").show();
                    // $("#AutoContractRenewTermCount").find("option:lt(1)").hide();
                    if ((contractItem != null && typeof (contractItem) != "undefined") && ($(contractItem).find("AutoContractRenewTermCount").length > 0 ? $(contractItem).find("AutoContractRenewTermCount").text() : "") == "")
                        $("#AutoContractRenewTermCount").val("Unlimited");
                    else {
                        var elmop = $("#AutoContractRenewTermCount option[value='" + ((contractItem != null && typeof (contractItem) != "undefined") ? ($(contractItem).find("AutoContractRenewTermCount").length > 0 ? $(contractItem).find("AutoContractRenewTermCount").text() : "") : "") + "']");
                        if ($(elmop).length > 0 && $(elmop).css('display') != 'none') {
                            $("#AutoContractRenewTermCount").val(((contractItem != null && typeof (contractItem) != "undefined") ? ($(contractItem).find("AutoContractRenewTermCount").length > 0 ? $(contractItem).find("AutoContractRenewTermCount").text() : "") : ""));
                        }
                        else {
                            $("select#AutoContractRenewTermCount").prop('selectedIndex', 2);
                        }
                    }
                }
                else {
                    $("#AddInitialTerm").css("display", "none");
                    $("#AddRenewalTerm").css("display", "");
                    var countTerm = TermNameLast.replace("Renewal ", "");
                    $("#AddRenewalTerm").text("+Add Terms");
                    $("#AutoContractRenewTermCount").find("option").show();
                    if ((parseInt(countTerm)) <= 15)
                        $("#AutoContractRenewTermCount").find("option:lt(" + (parseInt(countTerm)) + ")").hide();
                    else
                        $("#AutoContractRenewTermCount").find("option:lt(15)").hide();
                    if ((contractItem != null && typeof (contractItem) != "undefined") && ($(contractItem).find("AutoContractRenewTermCount").length > 0 ? $(contractItem).find("AutoContractRenewTermCount").text() : "") == "")
                        $("select#AutoContractRenewTermCount").prop('selectedIndex', ((parseInt(countTerm) <= 15) ? parseInt(countTerm) : 15));
                    else {
                        var elmop = $("#AutoContractRenewTermCount option[value='" + ((contractItem != null && typeof (contractItem) != "undefined") ? ($(contractItem).find("AutoContractRenewTermCount").length > 0 ? $(contractItem).find("AutoContractRenewTermCount").text() : "") : "") + "']");
                        if ($(elmop).length > 0 && $(elmop).css('display') != 'none') {
                            $("#AutoContractRenewTermCount").val(((contractItem != null && typeof (contractItem) != "undefined") ? ($(contractItem).find("AutoContractRenewTermCount").length > 0 ? $(contractItem).find("AutoContractRenewTermCount").text() : "") : ""));
                        }
                        else {
                            $("select#AutoContractRenewTermCount").prop('selectedIndex', ((parseInt(countTerm) <= 15) ? parseInt(countTerm) : 15));
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
                //Reset the Renewal DropDown
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
        case "editsave":
            {
                EditSaveFlag = true;
                $(".trSingle").css('display', '');
                $(".trMultiple").css('display', 'none');
                var tbrowcount = $(el).attr('id').replace("renewalViewHistoryTerm", "");
                var TermNameLast = $("#renewalViewHistoryTerm tr:last td:first").text();                
                var term = $("#RenewableTermName" + tbrowcount).text();
                $("#tdNameofTerms").html(term);
                $("#trNumberOfTerms").css('display', 'none');
                if (term == "Initial Term") {
                    $("#RenewalChecklistNew").css("display", "none");
                    $("#SendRenewalNotificationNew").css("display", "none");
                    GetValuesAndAutoPopulate("ddlRenewalNotfInternalNew", "");
                    $('input[type="checkbox"][name="checkboxNotifyNew"]').prop('checked', false);

                    if (term != TermNameLast) {

                        //manoj
                        var tempdateStart = null;
                        if ($("#RenewedDate" + (parseInt(tbrowcount) + 1)) != null && typeof ($("#RenewedDate" + (parseInt(tbrowcount) + 1))) != "undefined" && $("#RenewedDate" + (parseInt(tbrowcount) + 1)).text() != "") {
                            if (DatepickerFormat == "dd/mm/yy") {
                                var dateParts = $("#RenewedDate" + (parseInt(tbrowcount) + 1)).text().split('/');
                                tempdateStart = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                            }
                            else {
                                tempdateStart = new Date($("#RenewedDate" + (parseInt(tbrowcount) + 1)).text());
                            }
                        }
                        var tempdateStartthis = null;
                        if (DatepickerFormat == "dd/mm/yy") {
                            if ($("#RenewedDate" + tbrowcount).text() != "") {
                                var dateParts = $("#RenewedDate" + tbrowcount).text().split('/');
                                tempdateStartthis = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                            }
                        }
                        else {
                            tempdateStartthis = new Date($("#RenewedDate" + tbrowcount).text() == "" ? "" : $("#RenewedDate" + tbrowcount).text());
                        }

                        $("#txtRenewStartDate").datepicker("option", "maxDate", (tempdateStart != null ? new Date(tempdateStart.setDate(tempdateStart.getDate() - 1)) : null));
                        $("#txtRenewEndDate").datepicker("option", "maxDate", tempdateStart);
                        $("#txtRenewEndDate").datepicker("option", "minDate", (tempdateStartthis != null ? new Date(tempdateStartthis.setDate(tempdateStartthis.getDate() - 1)) : null));
                        $("#txtRenewStartDate").datepicker("option", "minDate", null);
                        //var tempdateStart = ($("#RenewedDate" + (parseInt(tbrowcount) + 1)) != null && typeof ($("#RenewedDate" + (parseInt(tbrowcount) + 1))) != "undefined") ? ($("#RenewedDate" + (parseInt(tbrowcount) + 1)).text() == "" ? null : new Date($("#RenewedDate" + (parseInt(tbrowcount) + 1)).text())) : null;
                        //var tempdateStartthis = new Date($("#RenewedDate" + tbrowcount).text() == "" ? "" : $("#RenewedDate" + tbrowcount).text());
                        //$("#txtRenewStartDate").datepicker("option", "maxDate", (tempdateStart != null ? new Date(tempdateStart.setDate(tempdateStart.getDate() - 1)) : null));
                        //$("#txtRenewEndDate").datepicker("option", "maxDate", tempdateStart);
                        //$("#txtRenewEndDate").datepicker("option", "minDate", (tempdateStartthis != null ? new Date(tempdateStartthis.setDate(tempdateStartthis.getDate() - 1)) : null));
                        //$("#txtRenewStartDate").datepicker("option", "minDate", null);
                    }
                    else {
                        //manoj
                        var tempdateStartthis = null;
                        if (DatepickerFormat == "dd/mm/yy") {
                            if ($("#RenewedDate" + tbrowcount).text() != "") {
                                var dateParts = $("#RenewedDate" + tbrowcount).text().split('/');
                                tempdateStartthis = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                            }
                        }
                        else {
                            tempdateStartthis = new Date($("#RenewedDate" + tbrowcount).text() == "" ? "" : $("#RenewedDate" + tbrowcount).text());
                        }
                        //var tempdateStartthis = new Date($("#RenewedDate" + tbrowcount).text() == "" ? "" : $("#RenewedDate" + tbrowcount).text());
                        $("#txtRenewStartDate").datepicker("option", "maxDate", null);
                        $("#txtRenewEndDate").datepicker("option", "maxDate", null);
                        $("#txtRenewEndDate").datepicker("option", "minDate", (tempdateStartthis != null ? new Date(tempdateStartthis.setDate(tempdateStartthis.getDate() + 1)) : null));
                        $("#txtRenewStartDate").datepicker("option", "minDate", null);
                        //manoj
                        //var tempdateStartthis = new Date($("#RenewedDate" + tbrowcount).text() == "" ? "" : $("#RenewedDate" + tbrowcount).text());
                        //$("#txtRenewStartDate").datepicker("option", "maxDate", null);
                        //$("#txtRenewEndDate").datepicker("option", "maxDate", null);
                        //$("#txtRenewEndDate").datepicker("option", "minDate", (tempdateStartthis != null ? new Date(tempdateStartthis.setDate(tempdateStartthis.getDate() + 1)) : null));
                        //$("#txtRenewStartDate").datepicker("option", "minDate", null);
                    }
                }
                else {
                    if (term == TermNameLast) {
                        //manoj
                        var tempdateEnd = null;
                        if ($("#TermEndDate" + (parseInt(tbrowcount) - 1)) != null && typeof ($("#TermEndDate" + (parseInt(tbrowcount) - 1))) != "undefined" && $("#TermEndDate" + (parseInt(tbrowcount) - 1)) != "") {
                            if (DatepickerFormat == "dd/mm/yy") {
                                var dateParts = $("#TermEndDate" + (parseInt(tbrowcount) - 1)).text().split('/');
                                tempdateEnd = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                            }
                            else {
                                tempdateEnd = new Date($("#TermEndDate" + (parseInt(tbrowcount) - 1)).text());
                            }
                        }

                        var tempdateStart = null;
                        if ($("#RenewedDate" + (parseInt(tbrowcount) + 1)) != null && typeof ($("#RenewedDate" + (parseInt(tbrowcount) + 1))) != "undefined" && $("#RenewedDate" + (parseInt(tbrowcount) + 1)).text() != "") {
                            if (DatepickerFormat == "dd/mm/yy") {
                                var dateParts = $("#RenewedDate" + (parseInt(tbrowcount) + 1)).text().split('/');
                                tempdateStart = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                            }
                            else {
                                tempdateStart = new Date($("#RenewedDate" + (parseInt(tbrowcount) + 1)).text());
                            }
                        }

                        var tempdateStartthis = null;
                        if (DatepickerFormat == "dd/mm/yy") {
                            if ($("#RenewedDate" + tbrowcount).text() != "") {
                                var dateParts = $("#RenewedDate" + tbrowcount).text().split('/');
                                tempdateStartthis = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                            }
                        }
                        else {
                            tempdateStartthis = new Date($("#RenewedDate" + tbrowcount).text() == "" ? "" : $("#RenewedDate" + tbrowcount).text());
                        }


                        var tempdateEndthis = null;
                        if (DatepickerFormat == "dd/mm/yy") {
                            if ($("#TermEndDate" + tbrowcount).text() != "") {
                                var dateParts = $("#TermEndDate" + tbrowcount).text().split('/');
                                tempdateEndthis = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                            }
                        }
                        else {
                            tempdateEndthis = new Date($("#TermEndDate" + tbrowcount).text() == "" ? "" : $("#TermEndDate" + tbrowcount).text());
                        }

                        var temp1 = (tempdateEnd != null ? new Date(tempdateEnd.setDate(tempdateEnd.getDate() + 1)) : null);
                        var temp2 = (tempdateStart != null ? new Date(tempdateStart.setDate(tempdateStart.getDate() - 1)) : null);
                        var temp3 = (tempdateStartthis != null ? new Date(tempdateStartthis.setDate(tempdateStartthis.getDate() + 1)) : null)
                        $("#txtRenewStartDate").datepicker("option", "minDate", temp1);
                        $("#txtRenewStartDate").datepicker("option", "maxDate", temp2);
                        $("#txtRenewEndDate").datepicker("option", "minDate", temp3);
                        $("#txtRenewEndDate").datepicker("option", "maxDate", null);
                        //manoj
                        //var tempdateEnd = ($("#TermEndDate" + (parseInt(tbrowcount) - 1)) != null && typeof ($("#TermEndDate" + (parseInt(tbrowcount) - 1))) != "undefined") ? ($("#TermEndDate" + (parseInt(tbrowcount) - 1)).text() == "" ? null : new Date($("#TermEndDate" + (parseInt(tbrowcount) - 1)).text())) : null;
                        //var tempdateStart = ($("#RenewedDate" + (parseInt(tbrowcount) + 1)) != null && typeof ($("#RenewedDate" + (parseInt(tbrowcount) + 1))) != "undefined") ? ($("#RenewedDate" + (parseInt(tbrowcount) + 1)).text() == "" ? null : new Date($("#RenewedDate" + (parseInt(tbrowcount) + 1)).text())) : null;
                        //var tempdateStartthis = new Date($("#RenewedDate" + tbrowcount).text() == "" ? "" : $("#RenewedDate" + tbrowcount).text());
                        //var tempdateEndthis = new Date($("#TermEndDate" + tbrowcount).text() == "" ? "" : $("#TermEndDate" + tbrowcount).text());
                        //var temp1 = (tempdateEnd != null ? new Date(tempdateEnd.setDate(tempdateEnd.getDate() + 1)) : null);
                        //var temp2 = (tempdateStart != null ? new Date(tempdateStart.setDate(tempdateStart.getDate() - 1)) : null);
                        //var temp3 = (tempdateStartthis != null ? new Date(tempdateStartthis.setDate(tempdateStartthis.getDate() + 1)) : null)
                        //$("#txtRenewStartDate").datepicker("option", "minDate", temp1);
                        //$("#txtRenewStartDate").datepicker("option", "maxDate", temp2);
                        //$("#txtRenewEndDate").datepicker("option", "minDate", temp3);
                        //$("#txtRenewEndDate").datepicker("option", "maxDate", null);
                    }
                    else {

                        //manoj
                        var tempdateEnd = null;
                        if ($("#TermEndDate" + (parseInt(tbrowcount) - 1)) != null && typeof ($("#TermEndDate" + (parseInt(tbrowcount) - 1))) != "undefined" && $("#TermEndDate" + (parseInt(tbrowcount) - 1)) != "") {
                            if (DatepickerFormat == "dd/mm/yy") {
                                var dateParts = $("#TermEndDate" + (parseInt(tbrowcount) - 1)).text().split('/');
                                tempdateEnd = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                            }
                            else {
                                tempdateEnd = new Date($("#TermEndDate" + (parseInt(tbrowcount) - 1)).text());
                            }
                        }

                        var tempdateStart = null;
                        if ($("#RenewedDate" + (parseInt(tbrowcount) + 1)) != null && typeof ($("#RenewedDate" + (parseInt(tbrowcount) + 1))) != "undefined" && $("#RenewedDate" + (parseInt(tbrowcount) + 1)).text() != "") {
                            if (DatepickerFormat == "dd/mm/yy") {
                                var dateParts = $("#RenewedDate" + (parseInt(tbrowcount) + 1)).text().split('/');
                                tempdateStart = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                            }
                            else {
                                tempdateStart = new Date($("#RenewedDate" + (parseInt(tbrowcount) + 1)).text());
                            }
                        }

                        var tempdateStartthis = null;
                        if (DatepickerFormat == "dd/mm/yy") {
                            if ($("#RenewedDate" + tbrowcount).text() != "") {
                                var dateParts = $("#RenewedDate" + tbrowcount).text().split('/');
                                tempdateStartthis = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                            }
                        }
                        else {
                            tempdateStartthis = new Date($("#RenewedDate" + tbrowcount).text() == "" ? "" : $("#RenewedDate" + tbrowcount).text());
                        }


                        var tempdateEndthis = null;
                        if (DatepickerFormat == "dd/mm/yy") {
                            if ($("#TermEndDate" + tbrowcount).text() != "") {
                                var dateParts = $("#TermEndDate" + tbrowcount).text().split('/');
                                tempdateEndthis = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                            }
                        }
                        else {
                            tempdateEndthis = new Date($("#TermEndDate" + tbrowcount).text() == "" ? "" : $("#TermEndDate" + tbrowcount).text());
                        }

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
                        //manoj

                        //var tempdateEnd = ($("#TermEndDate" + (parseInt(tbrowcount) - 1)) != null && typeof ($("#TermEndDate" + (parseInt(tbrowcount) - 1))) != "undefined") ? ($("#TermEndDate" + (parseInt(tbrowcount) - 1)).text() == "" ? null : new Date($("#TermEndDate" + (parseInt(tbrowcount) - 1)).text())) : null;
                        //var tempdateStart = ($("#RenewedDate" + (parseInt(tbrowcount) + 1)) != null && typeof ($("#RenewedDate" + (parseInt(tbrowcount) + 1))) != "undefined") ? ($("#RenewedDate" + (parseInt(tbrowcount) + 1)).text() == "" ? null : new Date($("#RenewedDate" + (parseInt(tbrowcount) + 1)).text())) : null;
                        //var tempdateStartthis = new Date($("#RenewedDate" + tbrowcount).text() == "" ? "" : $("#RenewedDate" + tbrowcount).text());
                        //var tempdateEndthis = new Date($("#TermEndDate" + tbrowcount).text() == "" ? "" : $("#TermEndDate" + tbrowcount).text());
                        //var temp1 = (tempdateEnd != null ? new Date(tempdateEnd.setDate(tempdateEnd.getDate() + 1)) : null);
                        //var temp2 = (tempdateStart != null ? new Date(tempdateStart) : null);
                        //if (temp2 != null)
                        //    temp2 = new Date(temp2.setDate(temp2.getDate() - 1));
                        //var temp3 = (tempdateStartthis != null ? new Date(tempdateStartthis.setDate(tempdateStartthis.getDate() + 1)) : null)
                        //var temp4 = (tempdateStart != null ? new Date(tempdateStart) : null);
                        //if (temp4 != null)
                        //    temp4 = new Date(temp4.setDate(tempdateStart.getDate() - 1));
                        //$("#txtRenewStartDate").datepicker("option", "minDate", temp1);
                        //$("#txtRenewStartDate").datepicker("option", "maxDate", temp2);
                        //$("#txtRenewEndDate").datepicker("option", "minDate", temp3);
                        //$("#txtRenewEndDate").datepicker("option", "maxDate", temp4);
                    }
                    $("#RenewalChecklistNew").css("display", "none");
                    $("#SendRenewalNotificationNew").css("display", "none");
                }

                //manoj
                if (DatepickerFormat == "dd/mm/yy") {
                    if ($("#RenewedDate" + tbrowcount).text() == "") {
                        $("#txtRenewStartDate").val("");
                    }
                    else {
                        var dateParts = $("#RenewedDate" + tbrowcount).text().split('/');
                        $("#txtRenewStartDate").val($.datepicker.formatDate(DatepickerFormat, new Date(dateParts[2], dateParts[1] - 1, dateParts[0])));
                    }

                }
                else {
                    $("#txtRenewStartDate").val($.datepicker.formatDate(DatepickerFormat, new Date($("#RenewedDate" + tbrowcount).text() == "" ? "" : $("#RenewedDate" + tbrowcount).text())));
                }
                if (DatepickerFormat == "dd/mm/yy") {
                    if ($("#TermEndDate" + tbrowcount).text() != "") {
                        var dateParts = $("#TermEndDate" + tbrowcount).text().split('/');
                        EndDateCheckRenewal = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                    }
                }
                else {
                    EndDateCheckRenewal = new Date($("#TermEndDate" + tbrowcount).text() == "" ? "" : $("#TermEndDate" + tbrowcount).text());
                }
                if ($("#ContractTermEach" + tbrowcount).text() == "") {
                    $("#ContractTermRenewChoicesNew").prop('disabled', true);
                    $("#ContractTermRenewNew").prop('disabled', true);
                    $("#ContractTermRenewNew").val('1');
                    $("#ContractTermRenewChoicesNew").val('years');
                    $("#txtRenewEndDate").prop('disabled', false);
                    $("#txtRenewEndDate").addClass('form-contro-Date');
                    $("#txtRenewEndDate").removeClass('form-contro-NoDate');

                    $('input[type="radio"][name="rdRenewTermEndDate"][value="EndDate"]').prop('checked', true);

                    if (DatepickerFormat == "dd/mm/yy") {
                        if ($("#TermEndDate" + tbrowcount).text() == "") {
                            $("#txtRenewEndDate").val("");
                        }
                        else {
                            var dateParts = $("#TermEndDate" + tbrowcount).text().split('/');
                            $("#txtRenewEndDate").val($.datepicker.formatDate(DatepickerFormat, new Date(dateParts[2], dateParts[1] - 1, dateParts[0])));
                        }

                    }
                    else {
                        $("#txtRenewEndDate").val($.datepicker.formatDate('mm/dd/yy', new Date($("#TermEndDate" + tbrowcount).text() == "" ? "" : $("#TermEndDate" + tbrowcount).text())));
                    }

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
                //manoj
                //$("#txtRenewStartDate").val($.datepicker.formatDate(DatepickerFormat, new Date($("#RenewedDate" + tbrowcount).text() == "" ? "" : $("#RenewedDate" + tbrowcount).text())));
                //EndDateCheckRenewal = new Date($("#TermEndDate" + tbrowcount).text() == "" ? "" : $("#TermEndDate" + tbrowcount).text());
                //if ($("#ContractTermEach" + tbrowcount).text() == "") {
                //    $("#ContractTermRenewChoicesNew").prop('disabled', true);
                //    $("#ContractTermRenewNew").prop('disabled', true);
                //    $("#ContractTermRenewNew").val('1');
                //    $("#ContractTermRenewChoicesNew").val('years');
                //    $("#txtRenewEndDate").prop('disabled', false);
                //    $("#txtRenewEndDate").addClass('form-contro-Date');
                //    $("#txtRenewEndDate").removeClass('form-contro-NoDate');

                //    $('input[type="radio"][name="rdRenewTermEndDate"][value="EndDate"]').prop('checked', true);
                //    $("#txtRenewEndDate").val($.datepicker.formatDate(DatepickerFormat, new Date($("#TermEndDate" + tbrowcount).text() == "" ? "" : $("#TermEndDate" + tbrowcount).text())));
                //}
                //else {
                //    $("#ContractTermRenewChoicesNew").prop('disabled', false);
                //    $("#ContractTermRenewNew").prop('disabled', false);
                //    $("#ContractTermRenewNew").val($("#ContractTermEach" + tbrowcount).text());
                //    $("#ContractTermRenewChoicesNew").val($("#ContractTermChoicesEach" + tbrowcount).text());
                //    $("#txtRenewEndDate").prop('disabled', true);
                //    $("#txtRenewEndDate").removeClass('form-contro-Date');
                //    $("#txtRenewEndDate").addClass('form-contro-NoDate');


                //    $('input[type="radio"][name="rdRenewTermEndDate"][value="Term"]').prop('checked', true);
                //    calculateenddateRenew('txtRenewStartDate', 'ContractTermRenewChoicesNew', 'ContractTermRenewNew', 'txtRenewEndDate');
                //}

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
                GetValuesAndAutoPopulate("ddlAuthorizedBy", ($("#RenewalConfirmParticipants" + tbrowcount).text() == "" ? "-" : $("#RenewalConfirmParticipants" + tbrowcount).text()));
                GetValuesAndAutoPopulate("ddlRenewedBy", ($("#RenewedBy" + tbrowcount).text() == "" ? "-" : $("#RenewedBy" + tbrowcount).text()));
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
                $("#RenewalTermNew").dialog("option", "title", term);
                $("#RenewalTermNew").dialog("open");

                break;
            }
    }
}
function RequiresAuthchange() {
    var valcheckauth = $(':input[type=radio][name=RenewalAuth]:checked').val();
    if (valcheckauth == "Yes") {
        $("#RequiresAuthorizationYes").show();
        GetValuesAndAutoPopulate("RenewalConfirmParticipants", ((contractItem != null && typeof (contractItem) != "undefined") ? ($(contractItem).find("RenewalConfirmParticipants").length > 0 ? $(contractItem).find("RenewalConfirmParticipants").text() : "") : ""));
        $("#ContractConfirmSendTerm").val(((contractItem != null && typeof (contractItem) != "undefined") ? ($(contractItem).find("ContractConfirmSendTerm").length > 0 ? $(contractItem).find("ContractConfirmSendTerm").text() : "") : ""));
        //$("#txtRenewConfirmSendDate").text($.datepicker.formatDate("mm/dd/yy", new Date(contrcatItem.ContractConfirmSendDate)));
        if (contractItem != null && typeof (contractItem) != "undefined") {
            if ($(contractItem).find("ContractConfirmSendDate").length > 0 && $(contractItem).find("ContractConfirmSendDate").text() != null) {
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                    //if (bowser.msie) {
                    //    var confirmDate = $(contractItem).find("ContractConfirmSendDate").text();
                    //    var date = confirmDate.substring(0, confirmDate.indexOf('+'));
                    //    $("#txtRenewConfirmSendDate").text(moment(new Date(date)).utc().add('days', 1).format('MM/DD/YYYY'));
                    //}
                    //else {
                    var confirmDate = $(contractItem).find("ContractConfirmSendDate").text();
                    var confdate = confirmDate.substring(0, confirmDate.indexOf('+'));
                    if (getTimeZone().indexOf('+') > -1) {
                        $("#txtRenewConfirmSendDate").text(moment(new Date(confdate)).format('MM/DD/YYYY'));
                    }
                    else if (getTimeZone().indexOf('+00:00') > -1 || getTimeZone().indexOf('-') > -1) {
                        $("#txtRenewConfirmSendDate").text(moment(new Date(confdate)).utc().format('MM/DD/YYYY'));
                    }
                    //$("#txtRenewConfirmSendDate").text(moment(new Date($(contractItem).find("ContractConfirmSendDate").text())).utc().format('MM/DD/YYYY'));
                    //}
                }
                else {
                    //if (bowser.msie) {
                    //    var confirmDate = $(contractItem).find("ContractConfirmSendDate").text();
                    //    var date = confirmDate.substring(0, confirmDate.indexOf('+'));
                    //    $("#txtRenewConfirmSendDate").text(moment(new Date(date)).utc().add('days', 1).format(localStorage.AppDateFormat));
                    //}
                    //else {
                    var confirmDate = $(contractItem).find("ContractConfirmSendDate").text();
                    var confdate = confirmDate.substring(0, confirmDate.indexOf('+'));
                    if (getTimeZone().indexOf('+') > -1) {
                        $("#txtRenewConfirmSendDate").text(moment(new Date(confdate)).format(localStorage.AppDateFormat));
                    }
                    else if (getTimeZone().indexOf('+00:00') > -1 || getTimeZone().indexOf('-') > -1) {
                        $("#txtRenewConfirmSendDate").text(moment(new Date(confdate)).utc().format(localStorage.AppDateFormat));
                    }
                    //$("#txtRenewConfirmSendDate").text(moment(new Date($(contractItem).find("ContractConfirmSendDate").text())).utc().format(localStorage.AppDateFormat));
                    //};
                }
            }
        }
        //$("#txtRenewConfirmSendDate").text(((contractItem != null && typeof (contractItem) != "undefined") ? ($(contractItem).find("ContractConfirmSendDate").length > 0 ? $(contractItem).find("ContractConfirmSendDate").text() : "") : ""));
        GetValuesAndAutoPopulate("RenewalConfirmParticipantsCC", ((contractItem != null && typeof (contractItem) != "undefined") ? ($(contractItem).find("RenewalConfirmParticipantsCC").length > 0 ? $(contractItem).find("RenewalConfirmParticipantsCC").text() : "") : ""));
        $("#RenewalConfirmParticipants").addClass("validselect");
        $("#ContractConfirmSendTerm").addClass("validelement");
    }
    else {
        $("#RequiresAuthorizationYes").hide();
        GetValuesAndAutoPopulate("RenewalConfirmParticipants", "");
        $("#ContractConfirmSendTerm").val("");
        $("#txtRenewConfirmSendDate").text("");
        GetValuesAndAutoPopulate("RenewalConfirmParticipantsCC", "");
        $("#RenewalConfirmParticipants").removeClass("validselect");
        $("#ContractConfirmSendTerm").removeClass("validelement");
        $("#RenewalConfirmParticipants").removeClass("error");
        $("#RenewalConfirmParticipants_chosen").removeClass("error");
        $("#ContractConfirmSendTerm").removeClass("error");

    }
}
function RenewalConfirmAutofunc() {
    var valcheckauth = $(':input[type=radio][name=RenewalConfirmAuto]:checked').val();
    if (valcheckauth == "Yes") {
        $('input[type="radio"][name="RenewalAuth"][value="No"]').prop('checked', true);
        RequiresAuthchange();
        $("#divRenewalConfirmAuto").show();
        $("#ContractAutoTerm").val(((contractItem != null && typeof (contractItem) != "undefined") ? ($(contractItem).find("ContractAutoTerm").length > 0 ? $(contractItem).find("ContractAutoTerm").text() : "") : ""));
        $("#ContractAutoTerm").addClass("validelement");

        $("#ContractAutoTermChoices").val(((contractItem != null && typeof (contractItem) != "undefined") ? ($(contractItem).find("ContractAutoTermChoices").length > 0 ? $(contractItem).find("ContractAutoTermChoices").text() : "") : ""));
        if (((contractItem != null && typeof (contractItem) != "undefined") && ($(contractItem).find("AutoContractRenewTermCount").length > 0 ? $(contractItem).find("AutoContractRenewTermCount").text() : "") != "")) {
            if ($("#AutoContractRenewTermCount option[value='" + ((contractItem != null && typeof (contractItem) != "undefined") ? ($(contractItem).find("AutoContractRenewTermCount").length > 0 ? $(contractItem).find("AutoContractRenewTermCount").text() : "") : "") + "']").length > 0 && !($("#AutoContractRenewTermCount option[value='" + ($(contractItem).find("AutoContractRenewTermCount").length > 0 ? $(contractItem).find("AutoContractRenewTermCount").text() : "") + "']").css('display') == "none"))
                $("#AutoContractRenewTermCount").val(((contractItem != null && typeof (contractItem) != "undefined") ? ($(contractItem).find("AutoContractRenewTermCount").length > 0 ? $(contractItem).find("AutoContractRenewTermCount").text() : "") : ""));
            else
                $("#AutoContractRenewTermCount").val("Unlimited");
        }
        else
            $("#AutoContractRenewTermCount").val("Unlimited");
        $("#AutoContractRenewOn").val(((contractItem != null && typeof (contractItem) != "undefined") ? ($(contractItem).find("RenewalDate").length > 0 && $(contractItem).find("RenewalDate").text() != null ? $(contractItem).find("RenewalDate").text() : "") : ""));
        // $(".ManRenewal").css('display', 'none');
        $(".autoRenewal").css('display', 'none');
    }
    else {
        $("#divRenewalConfirmAuto").hide();
        $("#ContractAutoTerm").val("");
        $("#ContractAutoTerm").removeClass("validelement");
        $("#RenewalConfirmParticipants").removeClass("validselect");
        $("#ContractConfirmSendTerm").removeClass("validelement");
        $("#ContractAutoTermChoices").val("");
        $("#AutoContractRenewTermCount").val("");
        $("#AutoContractRenewOn").val("");
        //  $(".ManRenewal").css('display', '');
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
        if (resValue != "") {
            if ($('#' + controlname + ' option[value="' + resValue + '"]').length > 0 && multiarr.indexOf(resValue) == -1)
                multiarr.push(resValue);
        }
    }

    ChosenOrder.setSelectionOrder($('#' + controlname), multiarr, true);

}
function changecontracttermtype(ddlvalue) {
    TermTypeChange(ddlvalue.value);
}
var sContractTermType = "";
function TermTypeChange(vTermType) {
    sContractTermType = vTermType;

    var fContractTermRenewOn = '';
    if ($("#txtContractTermRenewOn").val() != "" && $("#txtContractTermRenewOn").val() != null) {
        fContractTermRenewOn = $.datepicker.formatDate('mm/dd/yy', $("#txtContractTermRenewOn").datepicker('getDate'));
    }
    if (vTermType == "Fixed Term") {
        $("#spTermTypeDesc").html('<br>The Contract Record can\'t be renewed after the End date, however, evaluation of the Contract Record is possible before the End date.');
        $("#trContractTermDates1").css('display', '');
        $("#trContractTermDates2").css('display', '');
        $("#trContractTermSettings1").css('display', 'none');
        $("#trContractTermSettings2").css('display', 'none');
        $("#trContractTermReminders1").css('display', '');
        $("#trContractTermReminders2").css('display', '');


        $("#tdContractTermStartDateLbl").html('Start / Effective Date');
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
        $("#trContractRenewalHistoryText").css('display', 'none');
        $("#trContractRenewalHistory").css('display', 'none');
        $("#trContractRenewNext").css('display', 'none');
        $("#trContractTermRenewal").css('display', 'none');
        $("#trContractTermRenewalSec").css('display', 'none');
        $("#ContractAutoTerm").removeClass("validelement");
        $("#RenewalConfirmParticipants").removeClass("validselect");
        $("#ContractConfirmSendTerm").removeClass("validelement");
        //Sridhar
        if (TermTypeHelpText[vTermType] != "")
            $("#termtypeHelpText").html(TermTypeHelpText[vTermType]);

    } else if (vTermType == "Evergreen / Perpetual") {
        $("#spTermTypeDesc").html('<br>This is a long term Contract Record with no Expiry or Renewal, however, the Contract Record can be ended anytime. ');
        $("#trContractTermDates1").css('display', '');
        $("#trContractTermDates2").css('display', '');
        $("#trContractTermSettings1").css('display', 'none');
        $("#trContractTermSettings2").css('display', 'none');
        $("#trContractTermReminders1").css('display', '');
        $("#trContractTermReminders2").css('display', '');

        $("#tdContractTermStartDateLbl").html('Start / Effective Date');
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
        $("#trContractRenewalHistoryText").css('display', 'none');
        $("#trContractRenewalHistory").css('display', 'none');
        $("#trContractRenewNext").css('display', 'none');
        $("#trContractTermRenewal").css('display', 'none');
        $("#trContractTermRenewalSec").css('display', 'none');
        $("#ContractAutoTerm").removeClass("validelement");
        $("#RenewalConfirmParticipants").removeClass("validselect");
        $("#ContractConfirmSendTerm").removeClass("validelement");
        //Sridhar
        if (TermTypeHelpText[vTermType] != "")
            $("#termtypeHelpText").html(TermTypeHelpText[vTermType]);

        $("#EndDate").val('');
    } else if (vTermType == "Executed / Performance") {
        $("#spTermTypeDesc").html('<br>The Contract Record becomes active once signed, there is no Start or End date. ');
        $("#trContractTermDates1").css('display', '');
        $("#trContractTermDates2").css('display', '');
        $("#trContractTermSettings1").css('display', 'none');
        $("#trContractTermSettings2").css('display', 'none');
        $("#trContractTermReminders1").css('display', '');
        $("#trContractTermReminders2").css('display', '');


        $("#tdContractTermStartDateLbl").html('Date of Execution / Performance');
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
        $("#trContractRenewalHistoryText").css('display', 'none');
        $("#trContractRenewalHistory").css('display', 'none');
        $("#trContractRenewNext").css('display', 'none');
        $("#trContractTermRenewal").css('display', 'none');
        $("#trContractTermRenewalSec").css('display', 'none');
        $("#ContractAutoTerm").removeClass("validelement");
        $("#RenewalConfirmParticipants").removeClass("validselect");
        $("#ContractConfirmSendTerm").removeClass("validelement");
        //Sridhar
        if (TermTypeHelpText[vTermType] != "")
            $("#termtypeHelpText").html(TermTypeHelpText[vTermType]);

        $("#EndDate").val('');
    } else if (vTermType == "Renewable") {
        $("#spTermTypeDesc").html('<br>The Contract Record can be renewed based on the term and date. ');
        $("#trContractTermDates1").css('display', 'none');
        $("#trContractTermDates2").css('display', 'none');
        $("#trContractTermSettings1").css('display', 'none');
        $("#trContractTermSettings2").css('display', 'none');
        $("#trContractTermReminders1").css('display', '');
        $("#trContractTermReminders2").css('display', '');
        $("#btnContractTermRenew").css('display', 'none');

        //$('input[type="radio"][name="RenewalAuth"][value="Yes"]').prop('disabled', false);
        //$('input[type="radio"][name="RenewalAuth"][value="No"]').prop('disabled', false);





        var vDT = new Date();
        if ($("#StartDate").val() != '' && typeof ($("#StartDate").val()) != "undefined") {
            var ftxtContractTermStartDate = '';
            ftxtContractTermStartDate = $.datepicker.formatDate('mm/dd/yy', $("#StartDate").datepicker('getDate'));
            vDT = new Date(ftxtContractTermStartDate);
            vDT = moment(vDT).add(1, 'year').format('MM/DD/YYYY');
            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
            { vDT = moment(new Date(vDT)).format('MM/DD/YYYY'); }
            else { vDT = moment(new Date(vDT)).format(localStorage.AppDateFormat); }
            $("#txtContractTermEnds").val(vDT);
            $("#txtContractTermRenewOn").val(vDT);
        }
        if ($("#txtContractTermEnds").val() != '' && typeof ($("#txtContractTermEnds").val()) != "undefined") {
            $("#txtContractTermRenewOn").val($("#txtContractTermEnds").val());
        }
        if ($("#txtContractTermRenewOn").val() != '' && typeof ($("#txtContractTermRenewOn").val()) != "undefined") {
            if (fContractTermRenewOn != "" && fContractTermRenewOn != null) {
                vDT = new Date(fContractTermRenewOn);
                vDT = moment(vDT).add(60, 'days').format('MM/DD/YYYY');
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                { vDT = moment(new Date(vDT)).format('MM/DD/YYYY'); }
                else { vDT = moment(new Date(vDT)).format(localStorage.AppDateFormat); }
                if ($('input[type="radio"][name=TermAutoRenewal]:checked').val() == "No")
                    $("#txtContractTermExpireOn").val(vDT);
            }
            else {
                $("#txtContractTermRenewOn").val($("#txtContractTermEnds").val());
                if ($("#txtContractTermRenewOn").val() != "" && $("#txtContractTermRenewOn").val() != null) {
                    fContractTermRenewOn = $.datepicker.formatDate('mm/dd/yy', $("#txtContractTermRenewOn").datepicker('getDate'));
                }
                vDT = new Date(fContractTermRenewOn);
                vDT = moment(vDT).add(60, 'days').format('MM/DD/YYYY');
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                { vDT = moment(new Date(vDT)).format('MM/DD/YYYY'); }
                else { vDT = moment(new Date(vDT)).format(localStorage.AppDateFormat); }
                if ($('input[type="radio"][name=TermAutoRenewal]:checked').val() == "No")
                    $("#txtContractTermExpireOn").val(vDT);
            }
        }



        $("#tdContractTermStartDateLbl").html('Start / Effective Date');
        $("#trContractTermStartDate").css('display', 'none');
        $("#trContractTermStartDateRenew").css('display', '');
        $("#trContractTermEndDateRenew").css('display', '');
        $("#trContractNextTermEndDateRenew").css('display', '');
        $("#trContractRenewalConfirmText").css('display', '');
        //eO310162 - Anand
        $("#trContractRenewalConfirm").css('display', 'none');
        $("#trContractRenewalConfirmTextAuto").css('display', '');
        $("#trContractRenewalConfirmAuto").css('display', '');
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
        $("#ContractAutoTerm").removeClass("validelement");
        $("#RenewalConfirmParticipants").removeClass("validselect");
        $("#ContractConfirmSendTerm").removeClass("validelement");
        //Sridhar
        if (TermTypeHelpText[vTermType] != "")
            $("#termtypeHelpText").html(TermTypeHelpText[vTermType]);

        RenewalConfirmAutofunc();
    } else {
        $("#spTermTypeDesc").html('');
        $("#trContractTermDates1").css('display', 'none');
        $("#trContractTermDates2").css('display', 'none');
        $("#trContractTermSettings1").css('display', 'none');
        $("#trContractTermSettings2").css('display', 'none');
        $("#trContractTermReminders1").css('display', 'none');
        $("#trContractTermReminders2").css('display', 'none');

        $("#trContractTermStartDateRenew").css('display', 'none');
        $("#trContractTermEndDateRenew").css('display', 'none');
        $("#trContractNextTermEndDateRenew").css('display', 'none');
        $("#trContractRenewalConfirmText").css('display', 'none');
        $("#trContractRenewalConfirm").css('display', 'none');
        $("#trContractRenewalConfirmTextAuto").css('display', 'none');
        $("#trContractRenewalConfirmAuto").css('display', 'none');
        $("#trContractRenewalConfirmTextCounterparty").css('display', 'none');
        $("#trContractRenewalConfirmCounterparty").css('display', 'none');
        $("#trContractRenewalHistoryText").css('display', 'none');
        $("#trContractRenewalHistory").css('display', 'none');
        $("#trContractRenewNext").css('display', 'none');
        $("#trContractTermRenewal").css('display', 'none');
        $("#trContractTermRenewalSec").css('display', 'none');
        //$("#tdContractTermStartDateLbl").html('Start / Effective Date');
        //$("#trContractTermStartDate").css('display', 'none');
        //$("#trContractTermEvaluationDate").css('display', 'none');
        //$("#trContractTermEndDate").css('display', 'none');
        $("#ContractAutoTerm").removeClass("validelement");
        $("#RenewalConfirmParticipants").removeClass("validselect");
        $("#ContractConfirmSendTerm").removeClass("validelement");
        //Sridhar

    }

}

function DateToString(vv) {

    var onlydate = "";
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
    return onlydate;
}

$('#hdCurrentRenewalTermEnd').change(function () {
    calculateenddateRenewSub('hdCurrentRenewalTermEnd', 'ContractNextTermChoicesRenewCounter', 'txtSendRenewReminderDayRenewalCounter', 'txtRenewConfirmRenewalCounter');
    calculateenddateRenewSub('hdCurrentRenewalTermEnd', 'ContractNextTermChoicesCancelCounter', 'txtSendRenewReminderDayCancelCounter', 'txtRenewConfirmCancelCounter');
    calculateenddateRenewSub('hdCurrentRenewalTermEnd', 'ContractNextTermChoicesRenewConfirm', 'txtSendRenewReminderDayRenewalConfirm', 'txtRenewConfirmSendDate');
});
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

        //var nextDate;
        //if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
        //    //moment(new Date(ftxtContractTermStartDate)).zone(getTimeZone()).subtract($("#" + choice).find('option:selected').val(), $("#" + number).val()).utc()
        //    nextDate = moment(ftxtContractTermStartDate, 'MM/DD/YYYY').subtract($("#" + choice).find('option:selected').val(), $("#" + number).val()).utc();
        //}
        //else {
        //    nextDate = moment(ftxtContractTermStartDate, localStorage.AppDateFormat).subtract($("#" + choice).find('option:selected').val(), $("#" + number).val()).utc();
        //}
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

function BindTermTypes() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracttermtypesenabled',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        //async: false,
        success: function (data) {
            var datalength = data.length;
            for (var i = 0; i < datalength; i++) {
                TermTypeHelpText[data[i].ContractTermName] = data[i].HelpText;
            }
        },
        error: function (data) {
        }
    });
}

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

        AddRenewalTerm(false);


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
        AddRenewalTerm(true);
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
        var el = $('#renewalViewHistoryTerm tr:last').find('td:eq(3)');
        var TermNameLast = $("#renewalViewHistoryTerm tr:last td:first").text();
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

function getTermCommentsXML(TermName, vStartDate, vEndDate, vNextEvalDate, isCreateContract) {
    var activityXML = '';
    var user = localStorage.UserName;
    var vtime = moment(new Date()).format('MMMM Do YYYY, h:mm A');
    if (!isCreateContract) {
        var conStartDate = $(contractItem).find("StartDate").length > 0 ? moment($(contractItem).find("StartDate").text()).format('MM/DD/YYYY') : null;
        var conEndDate = $(contractItem).find("EndDate").length > 0 ? moment($(contractItem).find("EndDate").text()).format('MM/DD/YYYY') : null;
        var conNextEvalDate = $(contractItem).find("NextEvaluationDate").length > 0 ? moment($(contractItem).find("NextEvaluationDate").text()).format('MM/DD/YYYY') : null;
        if ($(contractItem).find("ContractTermType").text() == "")
            activityXML += user + ' has setup the term on ' + vtime;
        else if ($(contractItem).find("ContractTermType").text() != TermName)
            activityXML += user + ' has changed the term from ' + $(contractItem).find("ContractTermType").text() + ' to ' + TermName + ' on ' + vtime;
        else if (conStartDate != null && conStartDate != vStartDate)
            activityXML += user + ' has changed the term Start Date from ' + conStartDate + ' to ' + vStartDate + ' on ' + vtime;
        else if (conEndDate != null && conEndDate != vEndDate)
            activityXML += user + ' has changed the term End Date from ' + conEndDate + ' to ' + vEndDate + ' on ' + vtime;
        else if (conNextEvalDate != null && conNextEvalDate != vNextEvalDate)
            activityXML += user + ' has changed the term Next Evaluation Date from ' + conNextEvalDate + ' to ' + vNextEvalDate + ' on ' + vtime;
        else
            return "";
    }
    else {
        activityXML += user + ' has setup the term on ' + vtime;
    }

    var existRenewalCommentsXML = '';
    if (!isCreateContract) {
        if (typeof contractItem != "undefined" && contractItem != '') {
            if ($(contractItem).find("TermCommentsXML").length > 0) {
                existRenewalCommentsXML = $(contractItem).find("TermCommentsXML").find("RenewalComments");
            }
        }
    }

    var existingXML = '';
    existingXML += '<RenewalComments>';
    if (!isCreateContract) {
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