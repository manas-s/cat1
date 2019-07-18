var vAlertSettings = [];
$(document).ready(function () {
    $('.switch .Toggle').click(function () {
        //EnableSlider()
        var obj = jQuery(this).parent();
        $(obj).toggleClass('switch_enable').toggleClass('switch_disable');

        if ($(obj).hasClass('switch_enable')) {
            obj.children('input').val('ON').change();
        }
        else {
            obj.children('input').val('OFF').change();
        }
        buildValueUpdate(obj.children('input')[0].id);
    });
    //Sridhar
    GetAlertSettings();
    //ApplyPermissions();
});
function BackToList() {
    location = "/General/Alerts";
}
function EnableSlider1() {

    jQuery('.enabled_slider').each(function () {
        //This object
        var obj = jQuery(this);
        var input_val = obj.children('input').val();
        obj.removeClass('switch_enable');
        obj.removeClass('switch_disable');
        if ("0" == input_val || "OFF" == input_val) {
            obj.addClass('switch_disable');
        } else if ("1" == input_val || "ON" == input_val) {
            obj.addClass('switch_enable');
        }

    });
}
function EnableSlider() {
    jQuery('.enabled_slider').each(function () {

        //This object
        var obj = jQuery(this);

        var enb = obj.children('.switch_enable'); //cache first element, this is equal to ON
        var dsb = obj.children('.switch_disable'); //cache first element, this is equal to OFF
        var input = obj.children('input'); //cache the element where we must set the value
        var input_val = obj.children('input').val(); //cache the element where we must set the value       
        dsb.removeClass('selected');
        enb.removeClass('selected');
        /* Check selected */
        if ("0" == input_val || "OFF" == input_val) {
            dsb.addClass('selected');
        }
        else if ("1" == input_val || "ON" == input_val) {
            enb.addClass('selected');
        }

        //Action on user's click(ON)
        enb.on('click', function () {
            $(dsb).removeClass('selected'); //remove "selected" from other elements in this object class(OFF)
            $(this).addClass('selected'); //add "selected" to the element which was just clicked in this object class(ON) 
            $(input).val("ON").change(); //Finally change the value to 1
        });

        //Action on user's click(OFF)
        dsb.on('click', function () {
            $(enb).removeClass('selected'); //remove "selected" from other elements in this object class(ON)
            $(this).addClass('selected'); //add "selected" to the element which was just clicked in this object class(OFF) 
            $(input).val("OFF").change(); // //Finally change the value to 0
        });

    });
}
function DisableSlider() {
    jQuery('.disabled_slider').each(function () {

        //This object
        var obj = jQuery(this);

    });
}

function ViewOwnership() {
    if (vUserAlert != null) {
        if (vUserAlert.OwnershipAssigned == "Yes") {
            $("#chkAssignedOwnership").prop('checked', true);
            $("#ddlAssignedOwnershipF option").filter(function (index) { return $(this).text() === vUserAlert.OwnershipAssignedFrequency; }).prop('selected', true);
        }
        else {
            $("#chkAssignedOwnership").prop('checked', false);
        }
        if (vUserAlert.OwnershipChanged == "Yes") {
            $("#chkChangedOwnership").prop('checked', true);
            $("#ddlChangedOwnershipF option").filter(function (index) { return $(this).text() === vUserAlert.OwnershipChangedFrequency; }).prop('selected', true);
        }
        else {
            $("#chkChangedOwnership").prop('checked', false);
        }
        if (vUserAlert.RequestOwnershipAssigned == "Yes") {
            $("#chkAssignedRequestOwnership").prop('checked', true);
            $("#ddlAssignedRequestOwnershipF option").filter(function (index) { return $(this).text() === vUserAlert.RequestOwnershipAssignedFrequency; }).prop('selected', true);
        }
        else {
            $("#chkAssignedRequestOwnership").prop('checked', false);
        }
        if (vUserAlert.RequestOwnershipChanged == "Yes") {
            $("#chkChangedRequestOwnership").prop('checked', true);
            $("#ddlChangedRequestOwnershipF option").filter(function (index) { return $(this).text() === vUserAlert.RequestOwnershipChangedFrequency; }).prop('selected', true);
        }
        else {
            $("#chkChangedRequestOwnership").prop('checked', false);
        }
        if (vUserAlert.OwnershipUpdate != "") {
            $("#chkAssignedOwnership").removeAttr("disabled");
            $("#chkChangedOwnership").removeAttr("disabled");
            $("#chkAssignedRequestOwnership").removeAttr("disabled");
            $("#chkChangedRequestOwnership").removeAttr("disabled");
            $("#tdOwnershipView").html(vUserAlert.OwnershipUpdate);
            if (vUserAlert.OwnershipUpdate.replace(/;$/, "") == "App Alert; Email Notification") {
                $("#chkOwenershipApp").val('ON');
                $("#chkOwenershipEmail").val('ON').change();
            } else if (vUserAlert.OwnershipUpdate.replace(/;$/, "") == "App Alert") {
                $("#chkOwenershipApp").val('ON');
                $("#chkOwenershipEmail").val('OFF').change();
            } else if (vUserAlert.OwnershipUpdate.replace(/;$/, "") == "Email Notification") {
                $("#chkOwenershipApp").val('OFF');
                $("#chkOwenershipEmail").val('ON').change();
            }

        } else {
            $("#tdOwnershipView").html("None");
            $("#chkOwenershipApp").val('OFF');
            $("#chkOwenershipEmail").val('OFF').change();
            //$("#chkAssignedOwnership").prop('checked', false);
            //$("#chkAssignedRequestOwnership").prop('checked', false);
            //$("#chkChangedRequestOwnership").prop('checked', false);
            //$("#chkChangedOwnership").prop('checked', false);
            $("#chkAssignedOwnership").attr("disabled", "disabled");
            $("#chkAssignedRequestOwnership").attr("disabled", "disabled");
            $("#chkChangedRequestOwnership").attr("disabled", "disabled");
            $("#chkChangedOwnership").attr("disabled", "disabled");
        }
    }
    $("#trOwnershipView").css("display", "none");
    $("#trOwnershipEdit").css("display", "");

    //Sridhar
    AdminSettings();
}
function HideOwnership() {
    if (vUserAlert != null) {
        if (vUserAlert.OwnershipAssigned == "Yes") {
            $("#chkAssignedOwnership").prop('checked', true);
            $("#ddlAssignedOwnershipF option").filter(function (index) { return $(this).text() === vUserAlert.OwnershipAssignedFrequency; }).prop('selected', true);
        }
        else {
            $("#chkAssignedOwnership").prop('checked', false);
        }
        if (vUserAlert.OwnershipChanged == "Yes") {
            $("#chkChangedOwnership").prop('checked', true);
            $("#ddlChangedOwnershipF option").filter(function (index) { return $(this).text() === vUserAlert.OwnershipChangedFrequency; }).prop('selected', true);
        }
        else {
            $("#chkChangedOwnership").prop('checked', false);
        }
        if (vUserAlert.RequestOwnershipAssigned == "Yes") {
            $("#chkAssignedRequestOwnership").prop('checked', true);
            $("#ddlAssignedRequestOwnershipF option").filter(function (index) { return $(this).text() === vUserAlert.RequestOwnershipAssignedFrequency; }).prop('selected', true);
        }
        else {
            $("#chkAssignedRequestOwnership").prop('checked', false);
        }
        if (vUserAlert.RequestOwnershipChanged == "Yes") {
            $("#chkChangedRequestOwnership").prop('checked', true);
            $("#ddlChangedRequestOwnershipF option").filter(function (index) { return $(this).text() === vUserAlert.RequestOwnershipChangedFrequency; }).prop('selected', true);
        }
        else {
            $("#chkChangedRequestOwnership").prop('checked', false);
        }
        if (vUserAlert.OwnershipUpdate != "") {
            $("#chkAssignedOwnership").removeAttr("disabled");
            $("#chkChangedOwnership").removeAttr("disabled");
            $("#chkAssignedRequestOwnership").removeAttr("disabled");
            $("#chkChangedRequestOwnership").removeAttr("disabled");
            $("#tdOwnershipView").html(vUserAlert.OwnershipUpdate);
            if (vUserAlert.OwnershipUpdate.replace(/;$/, "") == "App Alert; Email Notification") {
                $("#chkOwenershipApp").val('ON');
                $("#chkOwenershipEmail").val('ON').change();
            } else if (vUserAlert.OwnershipUpdate.replace(/;$/, "") == "App Alert") {
                $("#chkOwenershipApp").val('ON');
                $("#chkOwenershipEmail").val('OFF').change();
            } else if (vUserAlert.OwnershipUpdate.replace(/;$/, "") == "Email Notification") {
                $("#chkOwenershipApp").val('OFF');
                $("#chkOwenershipEmail").val('ON').change();
            }

        } else {
            $("#tdOwnershipView").html("None");
            $("#chkOwenershipApp").val('OFF');
            $("#chkOwenershipEmail").val('OFF').change();
            //$("#chkAssignedOwnership").prop('checked', false);
            //$("#chkAssignedRequestOwnership").prop('checked', false);
            //$("#chkChangedRequestOwnership").prop('checked', false);
            //$("#chkChangedOwnership").prop('checked', false);
            $("#chkAssignedOwnership").attr("disabled", "disabled");
            $("#chkAssignedRequestOwnership").attr("disabled", "disabled");
            $("#chkChangedRequestOwnership").attr("disabled", "disabled");
            $("#chkChangedOwnership").attr("disabled", "disabled");
        }
    }
    $("#trOwnershipView").css("display", "");
    $("#trOwnershipEdit").css("display", "none");
}

function ViewStatusUpdate() {
    if (vUserAlert != null) {
        if (vUserAlert.StatusSigned != "" && vUserAlert.StatusSigned != null && typeof (vUserAlert.StatusSigned) != "undefined") {
            $("#chkContractSigned").prop('checked', true);
            $("#ddlContractSigned option").filter(function (index) { return $(this).text() === vUserAlert.StatusSigned; }).prop('selected', true);
        }
        else {
            $("#chkContractSigned").prop('checked', false);
        }
        if (vUserAlert.StatusActive != "" && vUserAlert.StatusActive != null && typeof (vUserAlert.StatusActive) != "undefined") {
            $("#chkContractActive").prop('checked', true);
            $("#ddlContractActive option").filter(function (index) { return $(this).text() === vUserAlert.StatusActive; }).prop('selected', true);
        }
        else {
            $("#chkContractActive").prop('checked', false);
        }
        if (vUserAlert.StatusRenewed != "" && vUserAlert.StatusRenewed != null && typeof (vUserAlert.StatusRenewed) != "undefined") {
            $("#chkContractRenewed").prop('checked', true);
            $("#ddlContractRenewed option").filter(function (index) { return $(this).text() === vUserAlert.StatusRenewed; }).prop('selected', true);
        }
        else {
            $("#chkContractRenewed").prop('checked', false);
        }
        if (vUserAlert.StatusExpires != "" && vUserAlert.StatusExpires != null && typeof (vUserAlert.StatusExpires) != "undefined") {
            $("#chkContractExpires").prop('checked', true);
            $("#ddlContractExpires option").filter(function (index) { return $(this).text() === vUserAlert.StatusExpires; }).prop('selected', true);
        }
        else {
            $("#chkContractExpires").prop('checked', false);
        }
        if (vUserAlert.StatusCancelled != "" && vUserAlert.StatusCancelled != null && typeof (vUserAlert.StatusCancelled) != "undefined") {
            $("#chkContractCancelled").prop('checked', true);
            $("#ddlContractCancelled option").filter(function (index) { return $(this).text() === vUserAlert.StatusCancelled; }).prop('selected', true);
        }
        else {
            $("#chkContractCancelled").prop('checked', false);
        }
        if (vUserAlert.StatusUpRenewal != "" && vUserAlert.StatusUpRenewal != null && typeof (vUserAlert.StatusUpRenewal) != "undefined") {
            $("#chkContractUpRenewal").prop('checked', true);
            $("#ddlContractUpRenewal option").filter(function (index) { return $(this).text() === vUserAlert.StatusUpRenewal; }).prop('selected', true);
        }
        else {
            $("#chkContractUpRenewal").prop('checked', false);
        }
        if (vUserAlert.StatusAboutExpire != "" && vUserAlert.StatusAboutExpire != null && typeof (vUserAlert.StatusAboutExpire) != "undefined") {
            $("#chkContractAboutExpire").prop('checked', true);
            $("#ddlContractAboutExpire option").filter(function (index) { return $(this).text() === vUserAlert.StatusAboutExpire; }).prop('selected', true);
        }
        else {
            $("#chkContractAboutExpire").prop('checked', false);
        }

        if (vUserAlert.StatusArchived != "" && vUserAlert.StatusArchived != null && typeof (vUserAlert.StatusArchived) != "undefined") {
            $("#chkContractArchived").prop('checked', true);
            $("#ddlContractArchived option").filter(function (index) { return $(this).text() === vUserAlert.StatusArchived; }).prop('selected', true);
        }
        else {
            $("#chkContractArchived").prop('checked', false);
        }

        if (vUserAlert.StatusSignedFrequency != "" && vUserAlert.StatusSignedFrequency != null && typeof (vUserAlert.StatusSignedFrequency) != "undefined") {
            $("#ddlContractSignedF option").filter(function (index) { return $(this).text() === vUserAlert.StatusSignedFrequency; }).prop('selected', true);
        }
        if (vUserAlert.StatusActiveFrequency != "" && vUserAlert.StatusActiveFrequency != null && typeof (vUserAlert.StatusActiveFrequency) != "undefined") {
            $("#ddlContractActiveF option").filter(function (index) { return $(this).text() === vUserAlert.StatusActiveFrequency; }).prop('selected', true);
        }
        if (vUserAlert.StatusRenewedFrequency != "" && vUserAlert.StatusRenewedFrequency != null && typeof (vUserAlert.StatusRenewedFrequency) != "undefined") {
            $("#ddlContractRenewedF option").filter(function (index) { return $(this).text() === vUserAlert.StatusRenewedFrequency; }).prop('selected', true);
        }
        if (vUserAlert.StatusExpiresFrequency != "" && vUserAlert.StatusExpiresFrequency != null && typeof (vUserAlert.StatusExpiresFrequency) != "undefined") {
            $("#ddlContractExpiresF option").filter(function (index) { return $(this).text() === vUserAlert.StatusExpiresFrequency; }).prop('selected', true);
        }
        if (vUserAlert.StatusCancelledFrequency != "" && vUserAlert.StatusCancelledFrequency != null && typeof (vUserAlert.StatusCancelledFrequency) != "undefined") {
            $("#ddlContractCancelledF option").filter(function (index) { return $(this).text() === vUserAlert.StatusCancelledFrequency; }).prop('selected', true);
        }
        if (vUserAlert.StatusUpRenewalFrequency != "" && vUserAlert.StatusUpRenewalFrequency != null && typeof (vUserAlert.StatusUpRenewalFrequency) != "undefined") {
            $("#ddlContractUpRenewalF option").filter(function (index) { return $(this).text() === vUserAlert.StatusUpRenewalFrequency; }).prop('selected', true);
        }
        if (vUserAlert.StatusAboutExpireFrequency != "" && vUserAlert.StatusAboutExpireFrequency != null && typeof (vUserAlert.StatusAboutExpireFrequency) != "undefined") {
            $("#ddlContractAboutExpireF option").filter(function (index) { return $(this).text() === vUserAlert.StatusAboutExpireFrequency; }).prop('selected', true);
        }

        if (vUserAlert.StatusUpdate != "" && vUserAlert.StatusUpdate != null && typeof (vUserAlert.StatusUpdate) != "undefined") {
            $("#tdStatusView").html(vUserAlert.StatusUpdate);
            $("#chkContractSigned").removeAttr("disabled");
            $("#chkContractActive").removeAttr("disabled");
            $("#chkContractRenewed").removeAttr("disabled");
            $("#chkContractExpires").removeAttr("disabled");
            $("#chkContractCancelled").removeAttr("disabled");
            $("#chkContractUpRenewal").removeAttr("disabled");
            $("#chkContractAboutExpire").removeAttr("disabled");
            $("#chkContractArchived").removeAttr("disabled");
            $("#ddlContractSigned").removeAttr("disabled");
            $("#ddlContractActive").removeAttr("disabled");
            $("#ddlContractRenewed").removeAttr("disabled");
            $("#ddlContractExpires").removeAttr("disabled");
            $("#ddlContractCancelled").removeAttr("disabled");
            $("#ddlContractUpRenewal").removeAttr("disabled");
            $("#ddlContractAboutExpire").removeAttr("disabled");
            if (vUserAlert.StatusUpdate == "App Alert; Email Notification") {
                $("#chkStatusApp").val('ON');
                $("#chkStatusEmail").val('ON').change();

            } else if (vUserAlert.StatusUpdate.replace(/;$/, "") == "App Alert") {
                $("#chkStatusApp").val('ON');
                $("#chkStatusEmail").val('OFF').change();
            } else if (vUserAlert.StatusUpdate == "Email Notification") {
                $("#chkStatusApp").val('OFF');
                $("#chkStatusEmail").val('ON').change();
            }


        } else {
            $("#tdStatusView").html("None");
            $("#chkStatusApp").val('OFF');
            $("#chkStatusEmail").val('OFF').change();
            //$("#chkContractSigned").prop('checked', false);
            //$("#chkContractActive").prop('checked', false);
            //$("#chkContractRenewed").prop('checked', false);
            //$("#chkContractExpires").prop('checked', false);
            //$("#chkContractCancelled").prop('checked', false);
            //$("#chkContractUpRenewal").prop('checked', false);
            //$("#chkContractAboutExpire").prop('checked', false);
            $("#chkContractSigned").attr("disabled", "disabled");
            $("#chkContractActive").attr("disabled", "disabled");
            $("#chkContractRenewed").attr("disabled", "disabled");
            $("#chkContractExpires").attr("disabled", "disabled");
            $("#chkContractCancelled").attr("disabled", "disabled");
            $("#chkContractUpRenewal").attr("disabled", "disabled");
            $("#chkContractAboutExpire").attr("disabled", "disabled");
            $("#chkContractArchived").attr("disabled", "disabled");
            $("#ddlContractSigned").attr("disabled", "disabled");
            $("#ddlContractActive").attr("disabled", "disabled");
            $("#ddlContractRenewed").attr("disabled", "disabled");
            $("#ddlContractExpires").attr("disabled", "disabled");
            $("#ddlContractCancelled").attr("disabled", "disabled");
            $("#ddlContractUpRenewal").attr("disabled", "disabled");
            $("#ddlContractAboutExpire").attr("disabled", "disabled");
        }
    }
    $("#trStatusView").css("display", "none");
    $("#trStatusEdit").css("display", "");

    //Sridhar
    AdminSettings();
}
function HideStatusUpdate() {

    if (vUserAlert != null) {
        if (vUserAlert.StatusSigned != "" && vUserAlert.StatusSigned != null && typeof (vUserAlert.StatusSigned) != "undefined") {
            $("#chkContractSigned").prop('checked', true);
            $("#ddlContractSigned option").filter(function (index) { return $(this).text() === vUserAlert.StatusSigned; }).prop('selected', true);
        }
        else {
            $("#chkContractSigned").prop('checked', false);
        }
        if (vUserAlert.StatusActive != "" && vUserAlert.StatusActive != null && typeof (vUserAlert.StatusActive) != "undefined") {
            $("#chkContractActive").prop('checked', true);
            $("#ddlContractActive option").filter(function (index) { return $(this).text() === vUserAlert.StatusActive; }).prop('selected', true);
        }
        else {
            $("#chkContractActive").prop('checked', false);
        }
        if (vUserAlert.StatusRenewed != "" && vUserAlert.StatusRenewed != null && typeof (vUserAlert.StatusRenewed) != "undefined") {
            $("#chkContractRenewed").prop('checked', true);
            $("#ddlContractRenewed option").filter(function (index) { return $(this).text() === vUserAlert.StatusRenewed; }).prop('selected', true);
        }
        else {
            $("#chkContractRenewed").prop('checked', false);
        }
        if (vUserAlert.StatusExpires != "" && vUserAlert.StatusExpires != null && typeof (vUserAlert.StatusExpires) != "undefined") {
            $("#chkContractExpires").prop('checked', true);
            $("#ddlContractExpires option").filter(function (index) { return $(this).text() === vUserAlert.StatusExpires; }).prop('selected', true);
        }
        else {
            $("#chkContractExpires").prop('checked', false);
        }
        if (vUserAlert.StatusCancelled != "" && vUserAlert.StatusCancelled != null && typeof (vUserAlert.StatusCancelled) != "undefined") {
            $("#chkContractCancelled").prop('checked', true);
            $("#ddlContractCancelled option").filter(function (index) { return $(this).text() === vUserAlert.StatusCancelled; }).prop('selected', true);
        }
        else {
            $("#chkContractCancelled").prop('checked', false);
        }
        if (vUserAlert.StatusUpRenewal != "" && vUserAlert.StatusUpRenewal != null && typeof (vUserAlert.StatusUpRenewal) != "undefined") {
            $("#chkContractUpRenewal").prop('checked', true);
            $("#ddlContractUpRenewal option").filter(function (index) { return $(this).text() === vUserAlert.StatusUpRenewal; }).prop('selected', true);
        }
        else {
            $("#chkContractUpRenewal").prop('checked', false);
        }
        if (vUserAlert.StatusAboutExpire != "" && vUserAlert.StatusAboutExpire != null && typeof (vUserAlert.StatusAboutExpire) != "undefined") {
            $("#chkContractAboutExpire").prop('checked', true);
            $("#ddlContractAboutExpire option").filter(function (index) { return $(this).text() === vUserAlert.StatusAboutExpire; }).prop('selected', true);
        }
        else {
            $("#chkContractAboutExpire").prop('checked', false);
        }

        if (vUserAlert.StatusArchived != "" && vUserAlert.StatusArchived != null && typeof (vUserAlert.StatusArchived) != "undefined") {
            $("#chkContractArchived").prop('checked', true);
            $("#ddlContractArchived option").filter(function (index) { return $(this).text() === vUserAlert.StatusArchived; }).prop('selected', true);
        }
        else {
            $("#chkContractArchived").prop('checked', false);
        }

        if (vUserAlert.StatusSignedFrequency != "" && vUserAlert.StatusSignedFrequency != null && typeof (vUserAlert.StatusSignedFrequency) != "undefined") {
            $("#ddlContractSignedF option").filter(function (index) { return $(this).text() === vUserAlert.StatusSignedFrequency; }).prop('selected', true);
        }
        if (vUserAlert.StatusActiveFrequency != "" && vUserAlert.StatusActiveFrequency != null && typeof (vUserAlert.StatusActiveFrequency) != "undefined") {
            $("#ddlContractActiveF option").filter(function (index) { return $(this).text() === vUserAlert.StatusActiveFrequency; }).prop('selected', true);
        }
        if (vUserAlert.StatusRenewedFrequency != "" && vUserAlert.StatusRenewedFrequency != null && typeof (vUserAlert.StatusRenewedFrequency) != "undefined") {
            $("#ddlContractRenewedF option").filter(function (index) { return $(this).text() === vUserAlert.StatusRenewedFrequency; }).prop('selected', true);
        }
        if (vUserAlert.StatusExpiresFrequency != "" && vUserAlert.StatusExpiresFrequency != null && typeof (vUserAlert.StatusExpiresFrequency) != "undefined") {
            $("#ddlContractExpiresF option").filter(function (index) { return $(this).text() === vUserAlert.StatusExpiresFrequency; }).prop('selected', true);
        }
        if (vUserAlert.StatusCancelledFrequency != "" && vUserAlert.StatusCancelledFrequency != null && typeof (vUserAlert.StatusCancelledFrequency) != "undefined") {
            $("#ddlContractCancelledF option").filter(function (index) { return $(this).text() === vUserAlert.StatusCancelledFrequency; }).prop('selected', true);
        }
        if (vUserAlert.StatusUpRenewalFrequency != "" && vUserAlert.StatusUpRenewalFrequency != null && typeof (vUserAlert.StatusUpRenewalFrequency) != "undefined") {
            $("#ddlContractUpRenewalF option").filter(function (index) { return $(this).text() === vUserAlert.StatusUpRenewalFrequency; }).prop('selected', true);
        }
        if (vUserAlert.StatusAboutExpireFrequency != "" && vUserAlert.StatusAboutExpireFrequency != null && typeof (vUserAlert.StatusAboutExpireFrequency) != "undefined") {
            $("#ddlContractAboutExpireF option").filter(function (index) { return $(this).text() === vUserAlert.StatusAboutExpireFrequency; }).prop('selected', true);
        }

        if (vUserAlert.StatusUpdate != "" && vUserAlert.StatusUpdate != null && typeof (vUserAlert.StatusUpdate) != "undefined") {
            $("#tdStatusView").html(vUserAlert.StatusUpdate);
            $("#chkContractSigned").removeAttr("disabled");
            $("#chkContractActive").removeAttr("disabled");
            $("#chkContractRenewed").removeAttr("disabled");
            $("#chkContractExpires").removeAttr("disabled");
            $("#chkContractCancelled").removeAttr("disabled");
            $("#chkContractUpRenewal").removeAttr("disabled");
            $("#chkContractAboutExpire").removeAttr("disabled");
            $("#chkContractArchived").removeAttr("disabled");
            $("#ddlContractSigned").removeAttr("disabled");
            $("#ddlContractActive").removeAttr("disabled");
            $("#ddlContractRenewed").removeAttr("disabled");
            $("#ddlContractExpires").removeAttr("disabled");
            $("#ddlContractCancelled").removeAttr("disabled");
            $("#ddlContractUpRenewal").removeAttr("disabled");
            $("#ddlContractAboutExpire").removeAttr("disabled");
            if (vUserAlert.StatusUpdate == "App Alert; Email Notification") {
                $("#chkStatusApp").val('ON');
                $("#chkStatusEmail").val('ON').change();

            } else if (vUserAlert.StatusUpdate.replace(/;$/, "") == "App Alert") {
                $("#chkStatusApp").val('ON');
                $("#chkStatusEmail").val('OFF').change();
            } else if (vUserAlert.StatusUpdate == "Email Notification") {
                $("#chkStatusApp").val('OFF');
                $("#chkStatusEmail").val('ON').change();
            }


        } else {
            $("#tdStatusView").html("None");
            $("#chkStatusApp").val('OFF');
            $("#chkStatusEmail").val('OFF').change();
            //$("#chkContractSigned").prop('checked', false);
            //$("#chkContractActive").prop('checked', false);
            //$("#chkContractRenewed").prop('checked', false);
            //$("#chkContractExpires").prop('checked', false);
            //$("#chkContractCancelled").prop('checked', false);
            //$("#chkContractUpRenewal").prop('checked', false);
            //$("#chkContractAboutExpire").prop('checked', false);
            $("#chkContractSigned").attr("disabled", "disabled");
            $("#chkContractActive").attr("disabled", "disabled");
            $("#chkContractRenewed").attr("disabled", "disabled");
            $("#chkContractExpires").attr("disabled", "disabled");
            $("#chkContractCancelled").attr("disabled", "disabled");
            $("#chkContractUpRenewal").attr("disabled", "disabled");
            $("#chkContractAboutExpire").attr("disabled", "disabled");
            $("#chkContractArchived").attr("disabled", "disabled");
            $("#ddlContractSigned").attr("disabled", "disabled");
            $("#ddlContractActive").attr("disabled", "disabled");
            $("#ddlContractRenewed").attr("disabled", "disabled");
            $("#ddlContractExpires").attr("disabled", "disabled");
            $("#ddlContractCancelled").attr("disabled", "disabled");
            $("#ddlContractUpRenewal").attr("disabled", "disabled");
            $("#ddlContractAboutExpire").attr("disabled", "disabled");
        }
    }
    $("#trStatusView").css("display", "");
    $("#trStatusEdit").css("display", "none");
}

function ViewNewItemNotf() {
    if (vUserAlert != null) {
        if (vUserAlert.NewContract == "Yes") {
            $("#chkNewContract").prop('checked', true);
            $("#ddlNewContractF option").filter(function (index) { return $(this).text() === vUserAlert.NewContractFrequency; }).prop('selected', true);
        }
        else {
            $("#chkNewContract").prop('checked', false);
        }
        if (vUserAlert.NewRequest == "Yes") {
            $("#chkNewRequest").prop('checked', true);
            $("#ddlNewRequestF option").filter(function (index) { return $(this).text() === vUserAlert.NewRequestFrequency; }).prop('selected', true);
        }
        else {
            $("#chkNewRequest").prop('checked', false);
        }
        if (vUserAlert.NewCounterparty == "Yes") {
            $("#chkNewCounterparty").prop('checked', true);
            $("#ddlNewCounterpartyF option").filter(function (index) { return $(this).text() === vUserAlert.NewCounterpartyFrequency; }).prop('selected', true);
        }
        else {
            $("#chkNewCounterparty").prop('checked', false);
        }
        if (vUserAlert.NewItems != "") {
            $("#tdNewItemView").html(vUserAlert.NewItems);
            $("#chkNewContract").removeAttr("disabled");
            $("#chkNewRequest").removeAttr("disabled");
            $("#chkNewCounterparty").removeAttr("disabled");
            if (vUserAlert.NewItems == "App Alert; Email Notification") {
                $("#chkNewItemApp").val('ON');
                $("#chkNewItemEmail").val('ON').change();
            } else if (vUserAlert.NewItems.replace(/;$/, "") == "App Alert") {
                $("#chkNewItemApp").val('ON');
                $("#chkNewItemEmail").val('OFF').change();
            } else if (vUserAlert.NewItems == "Email Notification") {
                $("#chkNewItemApp").val('OFF');
                $("#chkNewItemEmail").val('ON').change();
            }

        } else {
            $("#tdNewItemView").html("None");
            $("#chkNewItemApp").val('OFF');
            $("#chkNewItemEmail").val('OFF').change();
            //$("#chkNewContract").prop('checked', false);
            //$("#chkNewRequest").prop('checked', false);
            //$("#chkNewCounterparty").prop('checked', false);
            $("#chkNewContract").attr("disabled", "disabled");
            $("#chkNewRequest").attr("disabled", "disabled");
            $("#chkNewCounterparty").attr("disabled", "disabled");
        }
    }
    $("#trNewItemView").css("display", "none");
    $("#trNewItemEdit").css("display", "");
}
function HideNewItemNotf() {
    if (vUserAlert != null) {
        if (vUserAlert.NewContract == "Yes") {
            $("#chkNewContract").prop('checked', true);
            $("#ddlNewContractF option").filter(function (index) { return $(this).text() === vUserAlert.NewContractFrequency; }).prop('selected', true);
        }
        else {
            $("#chkNewContract").prop('checked', false);
        }
        if (vUserAlert.NewRequest == "Yes") {
            $("#chkNewRequest").prop('checked', true);
            $("#ddlNewRequestF option").filter(function (index) { return $(this).text() === vUserAlert.NewRequestFrequency; }).prop('selected', true);
        }
        else {
            $("#chkNewRequest").prop('checked', false);
        }
        if (vUserAlert.NewCounterparty == "Yes") {
            $("#chkNewCounterparty").prop('checked', true);
            $("#ddlNewCounterpartyF option").filter(function (index) { return $(this).text() === vUserAlert.NewCounterpartyFrequency; }).prop('selected', true);
        }
        else {
            $("#chkNewCounterparty").prop('checked', false);
        }
        if (vUserAlert.NewItems != "") {
            $("#tdNewItemView").html(vUserAlert.NewItems);
            $("#chkNewContract").removeAttr("disabled");
            $("#chkNewRequest").removeAttr("disabled");
            $("#chkNewCounterparty").removeAttr("disabled");
            if (vUserAlert.NewItems == "App Alert; Email Notification") {
                $("#chkNewItemApp").val('ON');
                $("#chkNewItemEmail").val('ON').change();
            } else if (vUserAlert.NewItems.replace(/;$/, "") == "App Alert") {
                $("#chkNewItemApp").val('ON');
                $("#chkNewItemEmail").val('OFF').change();
            } else if (vUserAlert.NewItems == "Email Notification") {
                $("#chkNewItemApp").val('OFF');
                $("#chkNewItemEmail").val('ON').change();
            }

        } else {
            $("#tdNewItemView").html("None");
            $("#chkNewItemApp").val('OFF');
            $("#chkNewItemEmail").val('OFF').change();
            //$("#chkNewContract").prop('checked', false);
            //$("#chkNewRequest").prop('checked', false);
            //$("#chkNewCounterparty").prop('checked', false);
            $("#chkNewContract").attr("disabled", "disabled");
            $("#chkNewRequest").attr("disabled", "disabled");
            $("#chkNewCounterparty").attr("disabled", "disabled");
        }
    }
    $("#trNewItemView").css("display", "");
    $("#trNewItemEdit").css("display", "none");
}

function ViewTaskNotf() {
    $("#trTaskNotfView").css("display", "none");
    $("#trTaskNotfEdit").css("display", "");
}
function HideTaskNotf() {
    $("#trTaskNotfView").css("display", "");
    $("#trTaskNotfEdit").css("display", "none");
    if (vUserAlert != null) {
        if (vUserAlert.Task != "") {
            $("#tdTaskNotfView").html(vUserAlert.Task);
            if (vUserAlert.Task == "App Alert; Email Notification") {
                $("#chkTaskApp").val('ON');
                $("#chkTaskEmail").val('ON');
            } else if (vUserAlert.Task.replace(/;$/, "") == "App Alert") {
                $("#chkTaskApp").val('ON');
                $("#chkTaskEmail").val('OFF');
            } else if (vUserAlert.Task == "Email Notification") {
                $("#chkTaskApp").val('OFF');
                $("#chkTaskEmail").val('ON');
            }
            if (vUserAlert.TaskToMe == "Yes") {
                $("#chkNewTask").prop('checked', true);
                $("#ddlTaskF option").filter(function (index) { return $(this).text() === vUserAlert.TaskFrequency; }).prop('selected', true);
            }
            else {
                $("#chkNewTask").prop('checked', false);
            }
        } else {
            $("#tdTaskNotfView").html("None");
            $("#chkNewTask").attr("disabled", "disabled");
        }
    }
}

function ViewRequestStatusUpdate() {
    if (vUserAlert != null) {
        if (vUserAlert.RequestCompleted == "Yes") {
            $("#chkReqCompleted").prop('checked', true);
        }
        else {
            $("#chkReqCompleted").prop('checked', false);
        }

        if (vUserAlert.RequestUpdate != "") {
            $("#chkReqCompleted").removeAttr("disabled");

            $("#tdRequestStatusView").html(vUserAlert.RequestUpdate);
            if (vUserAlert.RequestUpdate == "App Alert; Email Notification") {
                $("#chkReqStatusApp").val('ON');
                $("#chkReqStatusEmail").val('ON').change();
            } else if (vUserAlert.RequestUpdate.replace(/;$/, "") == "App Alert") {
                $("#chkReqStatusApp").val('ON');
                $("#chkReqStatusEmail").val('OFF').change();
            } else if (vUserAlert.RequestUpdate == "Email Notification") {
                $("#chkReqStatusApp").val('OFF');
                $("#chkReqStatusEmail").val('ON').change();
            }

        } else {
            $("#tdRequestStatusView").html("None");
            $("#chkReqStatusApp").val('OFF');
            $("#chkReqStatusEmail").val('OFF').change();
            $("#chkReqCompleted").attr("disabled", "disabled");
        }
    }
    $("#trRequestStatusView").css("display", "none");
    $("#trRequestStatusEdit").css("display", "");
}
function HideRequestStatusUpdate() {
    $("#trRequestStatusView").css("display", "");
    $("#trRequestStatusEdit").css("display", "none");
    if (vUserAlert != null) {
        if (vUserAlert.RequestUpdate != "") {
            $("#tdRequestStatusView").html(vUserAlert.RequestUpdate);
            if (vUserAlert.RequestUpdate == "App Alert; Email Notification") {
                $("#chkReqStatusApp").val('ON');
                $("#chkReqStatusEmail").val('ON');
            } else if (vUserAlert.RequestUpdate.replace(/;$/, "") == "App Alert") {
                $("#chkReqStatusApp").val('ON');
                $("#chkReqStatusEmail").val('OFF');
            } else if (vUserAlert.RequestUpdate == "Email Notification") {
                $("#chkReqStatusApp").val('OFF');
                $("#chkReqStatusEmail").val('ON');
            }

        } else {
            $("#tdRequestStatusView").html("None");
            $("#chkReqCompleted").attr("disabled", "disabled");
        }

        if (vUserAlert.RequestCompleted == "Yes") {
            $("#chkReqCompleted").prop('checked', true);
            // $("#ddlContractAboutExpire option").filter(function (index) { return $(this).text() === vUserAlert.StatusAboutExpire; }).prop('selected', true);
        }
        else {
            $("#chkReqCompleted").prop('checked', false);
        }
    }
}

function ViewDocNotification() {
    if (vUserAlert != null) {
        if (vUserAlert.DocumentAdded == "Yes") {
            $("#chkDocAdded").prop('checked', true);
            $("#ddlDocAddedF option").filter(function (index) { return $(this).text() === vUserAlert.DocumentAdded; }).prop('selected', true);
        }
        else {
            $("#chkDocAdded").prop('checked', false);
        }
        if (vUserAlert.DocumentPublished == "Yes") {
            $("#chkDocPublished").prop('checked', true);
            $("#ddlDocPublishedF option").filter(function (index) { return $(this).text() === vUserAlert.DocumentPublished; }).prop('selected', true);
        }
        else {
            $("#chkDocPublished").prop('checked', false);
        }
        if (vUserAlert.DocStatusUpdated == "Yes") {
            $("#chkDocStatusUpdate").prop('checked', true);
            $("#ddlADocStatusUpdateF option").filter(function (index) { return $(this).text() === vUserAlert.DocStatusUpdated; }).prop('selected', true);
        }
        else {
            $("#chkDocStatusUpdate").prop('checked', false);
        }

        if (vUserAlert.DocumentNotification != "") {
            $("#chkDocAdded").removeAttr("disabled");
            $("#chkDocPublished").removeAttr("disabled");
            $("#chkDocStatusUpdate").removeAttr("disabled");
            $("#ddlADocStatusUpdateF").removeAttr("disabled");
            $("#ddlDocPublishedF").removeAttr("disabled");
            $("#ddlDocAddedF").removeAttr("disabled");

            $("#tdDocNotView").html(vUserAlert.DocumentNotification);
            if (vUserAlert.DocumentNotification == "App Alert; Email Notification") {
                $("#chkDocApp").val('ON');
                $("#chkDocEmail").val('ON').change();
            } else if (vUserAlert.DocumentNotification.replace(/;$/, "") == "App Alert") {
                $("#chkDocApp").val('ON');
                $("#chkDocEmail").val('OFF').change();
            } else if (vUserAlert.DocumentNotification == "Email Notification") {
                $("#chkDocApp").val('OFF');
                $("#chkDocEmail").val('ON').change();
            }

        } else {
            $("#tdDocNotView").html("None");
            $("#chkDocApp").val('OFF');
            $("#chkDocEmail").val('OFF').change();
            $("#chkDocAdded").attr("disabled", "disabled");
            $("#chkDocPublished").attr("disabled", "disabled");
            $("#chkDocStatusUpdate").attr("disabled", "disabled");
            $("#ddlDocAddedF").attr("disabled", "disabled");
            $("#ddlDocPublishedF").attr("disabled", "disabled");
            $("#ddlADocStatusUpdateF").attr("disabled", "disabled");
        }
    }
    $("#trDocumentNotView").css("display", "none");
    $("#trDocumentNotEdit").css("display", "");
}
function HideDocNotification() {
    if (vUserAlert != null) {
        if (vUserAlert.DocumentAdded == "Yes") {
            $("#chkDocAdded").prop('checked', true);
            $("#ddlDocAddedF option").filter(function (index) { return $(this).text() === vUserAlert.DocumentAddedFrequency; }).prop('selected', true);
        }
        else {
            $("#chkDocAdded").prop('checked', false);
        }
        if (vUserAlert.DocumentPublished == "Yes") {
            $("#chkDocPublished").prop('checked', true);
            $("#ddlDocPublishedF option").filter(function (index) { return $(this).text() === vUserAlert.DocumentPublishedFrequency; }).prop('selected', true);
        }
        else {
            $("#chkDocPublished").prop('checked', false);
        }
        if (vUserAlert.DocStatusUpdated == "Yes") {
            $("#chkDocStatusUpdate").prop('checked', true);
            $("#ddlADocStatusUpdateF option").filter(function (index) { return $(this).text() === vUserAlert.DocStatusUpdatedFrequency; }).prop('selected', true);
        }
        else {
            $("#chkDocStatusUpdate").prop('checked', false);
        }

        if (vUserAlert.DocumentNotification != "") {
            $("#chkDocStatusUpdate").removeAttr("disabled");
            $("#chkDocPublished").removeAttr("disabled");
            $("#chkDocAdded").removeAttr("disabled");

            $("#tdDocNotView").html(vUserAlert.DocumentNotification);
            if (vUserAlert.DocumentNotification == "App Alert; Email Notification") {
                $("#chkDocApp").val('ON');
                $("#chkDocEmail").val('ON').change();
            } else if (vUserAlert.DocumentNotification.replace(/;$/, "") == "App Alert") {
                $("#chkDocApp").val('ON');
                $("#chkDocEmail").val('OFF').change();
            } else if (vUserAlert.DocumentNotification == "Email Notification") {
                $("#chkDocApp").val('OFF');
                $("#chkDocEmail").val('ON').change();
            }

        } else {
            $("#tdDocNotView").html("None");
            $("#chkDocApp").val('OFF');
            $("#chkDocEmail").val('OFF').change();
            $("#chkDocAdded").attr("disabled", "disabled");
            $("#chkDocPublished").attr("disabled", "disabled");
            $("#chkDocStatusUpdate").attr("disabled", "disabled");

        }
    }
    $("#trDocumentNotView").css("display", "");
    $("#trDocumentNotEdit").css("display", "none");

}

function ViewReminders() {
    $("#trRemindersView").css("display", "none");
    $("#trRemindersEdit").css("display", "");
}
function HideReminders() {

    if (vUserAlert != null) {
        if (vUserAlert.Reminders != "") {
            $("#tdRemindersView").html(vUserAlert.Reminders);
            if (vUserAlert.Reminders == "App Alert; Email Notification") {
                $("#chkRemindersApp").val('ON');
                $("#chkRemindersEmail").val('ON');
            } else if (vUserAlert.Reminders.replace(/;$/, "") == "App Alert") {
                $("#chkRemindersApp").val('ON');
                $("#chkRemindersEmail").val('OFF');
            } else if (vUserAlert.Reminders == "Email Notification") {
                $("#chkRemindersApp").val('OFF');
                $("#chkRemindersEmail").val('ON');
            }
            if (vUserAlert.RemindersRenewal == "Yes") {
                $("#chkRenewalReminders").prop('checked', true);
            }
            else {
                $("#chkRenewalReminders").prop('checked', false);
            }
            if (vUserAlert.RemindersExpiration == "Yes") {
                $("#chkExpirationReminders").prop('checked', true);
            }
            else {
                $("#chkExpirationReminders").prop('checked', false);
            }
            if (vUserAlert.RemindersMilestone == "Yes") {
                $("#chkMilestoneReminders").prop('checked', true);
                $("#ddlRemindersF option").filter(function (index) { return $(this).text() === vUserAlert.RemindersFrequency; }).prop('selected', true);
            }
            else {
                $("#chkMilestoneReminders").prop('checked', false);
            }
        } else {
            $("#tdRemindersView").html("None");
            $("#chkRenewalReminders").attr("disabled", "disabled");
            $("#chkExpirationReminders").attr("disabled", "disabled");
            $("#chkMilestoneReminders").attr("disabled", "disabled");
        }
    }
    $("#trRemindersView").css("display", "");
    $("#trRemindersEdit").css("display", "none");
}

function ViewUnsubscribtion() {
    if (vUserAlert != null) {
        if (vUserAlert.Unsubscribe != "") {
            $("#tdUnsubscribeAlertView").html(vUserAlert.Unsubscribe);
            if (vUserAlert.Unsubscribe == "App Alert; Email Notification") {
                if ($("#chkUnsubscribeAlertApp").attr("value") == "OFF")
                    $("#chkUnsubscribeAlertApp").val('ON');
                if ($("#chkUnsubscribeAlertEmail").attr("value") == "OFF")
                    // $("#chkUnsubscribeAlertEmail").val('ON').change();
                    $("#chkUnsubscribeAlertEmail").val('ON');
            } else if (vUserAlert.Unsubscribe.replace(/;$/, "") == "App Alert") {
                if ($("#chkUnsubscribeAlertApp").attr("value") == "OFF")
                    $("#chkUnsubscribeAlertApp").val('ON');
                if ($("#chkUnsubscribeAlertEmail").attr("value") == "ON")
                    //$("#chkUnsubscribeAlertEmail").val('OFF').change();
                    $("#chkUnsubscribeAlertEmail").val('OFF');
            } else if (vUserAlert.Unsubscribe == "Email Notification") {
                if ($("#chkUnsubscribeAlertApp").attr("value") == "ON")
                    $("#chkUnsubscribeAlertApp").val('OFF');
                if ($("#chkUnsubscribeAlertEmail").attr("value") == "OFF")
                    //$("#chkUnsubscribeAlertEmail").val('ON').change();
                    $("#chkUnsubscribeAlertEmail").val('ON');
            }

        } else {
            $("#tdUnsubscribeAlertView").html("None");
            if ($("#chkUnsubscribeAlertApp").attr("value") == "ON")
                $("#chkUnsubscribeAlertApp").val('OFF');
            if ($("#chkUnsubscribeAlertEmail").attr("value") == "ON")
                //$("#chkUnsubscribeAlertEmail").val('OFF').change();
                $("#chkUnsubscribeAlertEmail").val('OFF');
        }
    }
    $("#trUnsubscribeAlertView").css("display", "none");
    $("#trUnsubscribeAlertEdit").css("display", "");
}
function HideUnsubscribtion() {
    if (vUserAlert != null) {
        if (vUserAlert.Unsubscribe != "") {
            $("#tdUnsubscribeAlertView").html(vUserAlert.Unsubscribe);
            if (vUserAlert.Unsubscribe == "App Alert; Email Notification") {
                if ($("#chkUnsubscribeAlertApp").attr("value") == "OFF")
                    $("#chkUnsubscribeAlertApp").val('ON');
                if ($("#chkUnsubscribeAlertEmail").attr("value") == "OFF")
                    //$("#chkUnsubscribeAlertEmail").val('ON').change();
                    $("#chkUnsubscribeAlertEmail").val('ON');

            } else if (vUserAlert.Unsubscribe.replace(/;$/, "") == "App Alert") {
                if ($("#chkUnsubscribeAlertApp").attr("value") == "OFF")
                    $("#chkUnsubscribeAlertApp").val('ON');
                if ($("#chkUnsubscribeAlertEmail").attr("value") == "ON")
                    //$("#chkUnsubscribeAlertEmail").val('OFF').change();
                    $("#chkUnsubscribeAlertEmail").val('OFF');
            } else if (vUserAlert.Unsubscribe == "Email Notification") {
                if ($("#chkUnsubscribeAlertApp").attr("value") == "ON")
                    $("#chkUnsubscribeAlertApp").val('OFF');
                if ($("#chkUnsubscribeAlertEmail").attr("value") == "OFF")
                    //$("#chkUnsubscribeAlertEmail").val('ON').change();
                    $("#chkUnsubscribeAlertEmail").val('ON');

            }

        } else {
            $("#tdUnsubscribeAlertView").html("None");
            if ($("#chkUnsubscribeAlertApp").attr("value") == "ON")
                $("#chkUnsubscribeAlertApp").val('OFF');
            if ($("#chkUnsubscribeAlertEmail").attr("value") == "ON")
                //$("#chkUnsubscribeAlertEmail").val('OFF').change();
                $("#chkUnsubscribeAlertEmail").val('OFF');
        }
    }
    isSettingChanged = true;
    $("#trUnsubscribeAlertView").css("display", "");
    $("#trUnsubscribeAlertEdit").css("display", "none");
}

$('#chkDocApp').change(function () {
    if ($("#chkDocApp").attr("value") == "OFF" && $("#chkDocEmail").attr("value") == "OFF") {
        $("#chkDocAdded").attr("disabled", "disabled");
        $("#chkDocPublished").attr("disabled", "disabled");
        $("#chkDocStatusUpdate").attr("disabled", "disabled");
        $("#ddlDocAddedF").attr("disabled", "disabled");
        $("#ddlDocPublishedF").attr("disabled", "disabled");
        $("#ddlADocStatusUpdateF").attr("disabled", "disabled");
    } else {
        $("#chkDocAdded").removeAttr("disabled");
        $("#chkDocPublished").removeAttr("disabled");
        $("#chkDocStatusUpdate").removeAttr("disabled");
        $("#ddlDocAddedF").removeAttr("disabled");
        $("#ddlDocPublishedF").removeAttr("disabled");
        $("#ddlADocStatusUpdateF").removeAttr("disabled");
    }

    //Sridhar
    AdminSettings();

});
$('#chkDocEmail').change(function () {
    if ($("#chkDocApp").attr("value") == "OFF" && $("#chkDocEmail").attr("value") == "OFF") {
        $("#chkDocAdded").attr("disabled", "disabled");
        $("#chkDocPublished").attr("disabled", "disabled");
        $("#chkDocStatusUpdate").attr("disabled", "disabled");
        $("#ddlDocAddedF").attr("disabled", "disabled");
        $("#ddlDocPublishedF").attr("disabled", "disabled");
        $("#ddlADocStatusUpdateF").attr("disabled", "disabled");


    } else {
        $("#chkDocAdded").removeAttr("disabled");
        $("#chkDocPublished").removeAttr("disabled");
        $("#chkDocStatusUpdate").removeAttr("disabled");
        $("#ddlDocAddedF").removeAttr("disabled");
        $("#ddlDocPublishedF").removeAttr("disabled");
        $("#ddlADocStatusUpdateF").removeAttr("disabled");

    }
    //Sridhar
    AdminSettings();

});

$('#chkReqStatusApp').change(function () {
    if ($("#chkReqStatusApp").attr("value") == "OFF" && $("#chkReqStatusEmail").attr("value") == "OFF") {
        $("#chkReqCompleted").attr("disabled", "disabled");
    } else {
        $("#chkReqCompleted").removeAttr("disabled");
    }

    //Sridhar
    AdminSettings();

});
$('#chkReqStatusEmail').change(function () {
    if ($("#chkReqStatusApp").attr("value") == "OFF" && $("#chkReqStatusEmail").attr("value") == "OFF") {
        $("#chkReqCompleted").attr("disabled", "disabled");
    } else {
        $("#chkReqCompleted").removeAttr("disabled");
    }
    //Sridhar
    AdminSettings();
});

$('#chkOwenershipApp').change(function () {
    if ($("#chkOwenershipApp").attr("value") == "OFF" && $("#chkOwenershipEmail").attr("value") == "OFF") {
        $("#chkAssignedOwnership").attr("disabled", "disabled");
        $("#chkChangedOwnership").attr("disabled", "disabled");
        $("#chkAssignedRequestOwnership").attr("disabled", "disabled");
        $("#chkChangedRequestOwnership").attr("disabled", "disabled");
        $("#ddlAssignedOwnershipF").attr("disabled", "disabled");
        $("#ddlChangedOwnershipF").attr("disabled", "disabled");
        $("#ddlAssignedRequestOwnershipF").attr("disabled", "disabled");
        $("#ddlChangedRequestOwnershipF").attr("disabled", "disabled");

    } else {
        $("#chkAssignedOwnership").removeAttr("disabled");
        $("#chkChangedOwnership").removeAttr("disabled");
        $("#chkAssignedRequestOwnership").removeAttr("disabled");
        $("#chkChangedRequestOwnership").removeAttr("disabled");
        $("#ddlAssignedOwnershipF").removeAttr("disabled");
        $("#ddlChangedOwnershipF").removeAttr("disabled");
        $("#ddlAssignedRequestOwnershipF").removeAttr("disabled");
        $("#ddlChangedRequestOwnershipF").removeAttr("disabled");
    }

    //Sridhar
    AdminSettings();

});
$('#chkOwenershipEmail').change(function () {
    if ($("#chkOwenershipApp").attr("value") == "OFF" && $("#chkOwenershipEmail").attr("value") == "OFF") {
        $("#chkAssignedOwnership").attr("disabled", "disabled");
        $("#chkChangedOwnership").attr("disabled", "disabled");
        $("#chkAssignedRequestOwnership").attr("disabled", "disabled");
        $("#chkChangedRequestOwnership").attr("disabled", "disabled");
        $("#ddlAssignedOwnershipF").attr("disabled", "disabled");
        $("#ddlChangedOwnershipF").attr("disabled", "disabled");
        $("#ddlAssignedRequestOwnershipF").attr("disabled", "disabled");
        $("#ddlChangedRequestOwnershipF").attr("disabled", "disabled");

    } else {
        $("#chkAssignedOwnership").removeAttr("disabled");
        $("#chkChangedOwnership").removeAttr("disabled");
        $("#chkAssignedRequestOwnership").removeAttr("disabled");
        $("#chkChangedRequestOwnership").removeAttr("disabled");
        $("#ddlAssignedOwnershipF").removeAttr("disabled");
        $("#ddlChangedOwnershipF").removeAttr("disabled");
        $("#ddlAssignedRequestOwnershipF").removeAttr("disabled");
        $("#ddlChangedRequestOwnershipF").removeAttr("disabled");
    }
    //Sridhar
    AdminSettings();

});

$('#chkStatusApp').change(function () {
    if ($("#chkStatusApp").attr("value") == "OFF" && $("#chkStatusEmail").attr("value") == "OFF") {
        $("#chkContractSigned").attr("disabled", "disabled");
        $("#chkContractActive").attr("disabled", "disabled");
        $("#chkContractRenewed").attr("disabled", "disabled");
        $("#chkContractExpires").attr("disabled", "disabled");
        $("#chkContractCancelled").attr("disabled", "disabled");
        $("#chkContractUpRenewal").attr("disabled", "disabled");
        $("#chkContractAboutExpire").attr("disabled", "disabled");
        $("#chkContractArchived").attr("disabled", "disabled");
        $("#ddlContractSigned").attr("disabled", "disabled");
        $("#ddlContractActive").attr("disabled", "disabled");
        $("#ddlContractRenewed").attr("disabled", "disabled");
        $("#ddlContractExpires").attr("disabled", "disabled");
        $("#ddlContractCancelled").attr("disabled", "disabled");
        $("#ddlContractUpRenewal").attr("disabled", "disabled");
        $("#ddlContractAboutExpire").attr("disabled", "disabled");
        $("#ddlContractSignedF").attr("disabled", "disabled");
        $("#ddlContractActiveF").attr("disabled", "disabled");
        $("#ddlContractRenewedF").attr("disabled", "disabled");
        $("#ddlContractExpiresF").attr("disabled", "disabled");
        $("#ddlContractCancelledF").attr("disabled", "disabled");
        $("#ddlContractUpRenewalF").attr("disabled", "disabled");
        $("#ddlContractAboutExpireF").attr("disabled", "disabled");
    } else {
        $("#chkContractSigned").removeAttr("disabled");
        $("#chkContractActive").removeAttr("disabled");
        $("#chkContractRenewed").removeAttr("disabled");
        $("#chkContractExpires").removeAttr("disabled");
        $("#chkContractCancelled").removeAttr("disabled");
        $("#chkContractUpRenewal").removeAttr("disabled");
        $("#chkContractAboutExpire").removeAttr("disabled");
        $("#chkContractArchived").removeAttr("disabled");
        $("#ddlContractSigned").removeAttr("disabled");
        $("#ddlContractActive").removeAttr("disabled");
        $("#ddlContractRenewed").removeAttr("disabled");
        $("#ddlContractExpires").removeAttr("disabled");
        $("#ddlContractCancelled").removeAttr("disabled");
        $("#ddlContractUpRenewal").removeAttr("disabled");
        $("#ddlContractAboutExpire").removeAttr("disabled");
        $("#ddlContractSignedF").removeAttr("disabled");
        $("#ddlContractActiveF").removeAttr("disabled");
        $("#ddlContractRenewedF").removeAttr("disabled");
        $("#ddlContractExpiresF").removeAttr("disabled");
        $("#ddlContractCancelledF").removeAttr("disabled");
        $("#ddlContractUpRenewalF").removeAttr("disabled");
        $("#ddlContractAboutExpireF").removeAttr("disabled");
    }
    //Sridhar
    AdminSettings();

});
$('#chkStatusEmail').change(function () {
    if ($("#chkStatusApp").attr("value") == "OFF" && $("#chkStatusEmail").attr("value") == "OFF") {
        $("#chkContractSigned").attr("disabled", "disabled");
        $("#chkContractActive").attr("disabled", "disabled");
        $("#chkContractRenewed").attr("disabled", "disabled");
        $("#chkContractExpires").attr("disabled", "disabled");
        $("#chkContractCancelled").attr("disabled", "disabled");
        $("#chkContractUpRenewal").attr("disabled", "disabled");
        $("#chkContractAboutExpire").attr("disabled", "disabled");
        $("#chkContractArchived").attr("disabled", "disabled");
        $("#ddlContractSigned").attr("disabled", "disabled");
        $("#ddlContractActive").attr("disabled", "disabled");
        $("#ddlContractRenewed").attr("disabled", "disabled");
        $("#ddlContractExpires").attr("disabled", "disabled");
        $("#ddlContractCancelled").attr("disabled", "disabled");
        $("#ddlContractUpRenewal").attr("disabled", "disabled");
        $("#ddlContractAboutExpire").attr("disabled", "disabled");
        $("#ddlContractSignedF").attr("disabled", "disabled");
        $("#ddlContractActiveF").attr("disabled", "disabled");
        $("#ddlContractRenewedF").attr("disabled", "disabled");
        $("#ddlContractExpiresF").attr("disabled", "disabled");
        $("#ddlContractCancelledF").attr("disabled", "disabled");
        $("#ddlContractUpRenewalF").attr("disabled", "disabled");
        $("#ddlContractAboutExpireF").attr("disabled", "disabled");
    } else {
        $("#chkContractSigned").removeAttr("disabled");
        $("#chkContractActive").removeAttr("disabled");
        $("#chkContractRenewed").removeAttr("disabled");
        $("#chkContractExpires").removeAttr("disabled");
        $("#chkContractCancelled").removeAttr("disabled");
        $("#chkContractUpRenewal").removeAttr("disabled");
        $("#chkContractAboutExpire").removeAttr("disabled");
        $("#chkContractArchived").removeAttr("disabled");
        $("#ddlContractSigned").removeAttr("disabled");
        $("#ddlContractActive").removeAttr("disabled");
        $("#ddlContractRenewed").removeAttr("disabled");
        $("#ddlContractExpires").removeAttr("disabled");
        $("#ddlContractCancelled").removeAttr("disabled");
        $("#ddlContractUpRenewal").removeAttr("disabled");
        $("#ddlContractAboutExpire").removeAttr("disabled");
        $("#ddlContractSignedF").removeAttr("disabled");
        $("#ddlContractActiveF").removeAttr("disabled");
        $("#ddlContractRenewedF").removeAttr("disabled");
        $("#ddlContractExpiresF").removeAttr("disabled");
        $("#ddlContractCancelledF").removeAttr("disabled");
        $("#ddlContractUpRenewalF").removeAttr("disabled");
        $("#ddlContractAboutExpireF").removeAttr("disabled");
    }
    //Sridhar
    AdminSettings();
});

$('#chkNewItemApp').change(function () {
    if ($("#chkNewItemApp").attr("value") == "OFF" && $("#chkNewItemEmail").attr("value") == "OFF") {
        $("#chkNewContract").attr("disabled", "disabled");
        $("#chkNewCounterparty").attr("disabled", "disabled");
        $("#chkNewRequest").attr("disabled", "disabled");
        $("#ddlNewContractF").attr("disabled", "disabled");
        $("#ddlNewCounterpartyF").attr("disabled", "disabled");
    } else {
        $("#chkNewContract").removeAttr("disabled");
        $("#chkNewRequest").removeAttr("disabled");
        $("#chkNewCounterparty").removeAttr("disabled");
        $("#ddlNewContractF").removeAttr("disabled");
        $("#ddlNewCounterpartyF").removeAttr("disabled");
    }
    AdminSettings();

});
$('#chkNewItemEmail').change(function () {
    if ($("#chkNewItemApp").attr("value") == "OFF" && $("#chkNewItemEmail").attr("value") == "OFF") {
        $("#chkNewContract").attr("disabled", "disabled");
        $("#chkNewCounterparty").attr("disabled", "disabled");
        $("#chkNewRequest").attr("disabled", "disabled");
        $("#ddlNewContractF").attr("disabled", "disabled");
        $("#ddlNewCounterpartyF").attr("disabled", "disabled");
        $("#ddlNewRequestF").attr("disabled", "disabled");
    } else {
        $("#chkNewContract").removeAttr("disabled");
        $("#chkNewCounterparty").removeAttr("disabled");
        $("#chkNewRequest").removeAttr("disabled");
        $("#ddlNewContractF").removeAttr("disabled");
        $("#ddlNewCounterpartyF").removeAttr("disabled");
        $("#ddlNewRequestF").removeAttr("disabled");
    }
    EnableSlider1();
    AdminSettings();
});

$('#chkUnsubscribeAlertApp').change(function () {
    if ($("#chkUnsubscribeAlertApp").attr("value") == "ON") {
        if ($("#chkOwenershipApp").val() != "ON") {
            $("#chkOwenershipApp").val('ON').change();
        } if ($("#chkStatusApp").val() != "ON") {
            $("#chkStatusApp").val('ON').change();
        } if ($("#chkNewItemApp").val() != "ON") {
            $("#chkNewItemApp").val('ON').change();
        }
        if ($("#chkReqStatusApp").val() != "ON") {
            $("#chkReqStatusApp").val('ON').change();
        }
        if ($("#chkDocApp").val() != "ON") {
            $("#chkDocApp").val('ON').change();
        }
        $('#tdOwenership .app').find('.switch').removeClass('disabled_slider');
        $('#tdItem .app').find('.switch').removeClass('disabled_slider');
        $('#tdStatus .app').find('.switch').removeClass('disabled_slider');
        $('#tdDocNot .app').find('.switch').removeClass('disabled_slider');
        $('#tdRequestStatus .app').find('.switch').removeClass('disabled_slider');
    } else {
        if ($("#chkOwenershipApp").val() != "OFF") {
            $("#chkOwenershipApp").val('OFF').change();
        } if ($("#chkStatusApp").val() != "OFF") {
            $("#chkStatusApp").val('OFF').change();
        } if ($("#chkNewItemApp").val() != "OFF") {
            $("#chkNewItemApp").val('OFF').change();
        }
        if ($("#chkReqStatusApp").val() != "OFF") {
            $("#chkReqStatusApp").val('OFF').change();
        }
        if ($("#chkDocApp").val() != "OFF") {
            $("#chkDocApp").val('OFF').change();
        }
        $('#tdOwenership .app').find('.switch').addClass('disabled_slider');
        $('#tdItem .app').find('.switch').addClass('disabled_slider');
        $('#tdStatus .app').find('.switch').addClass('disabled_slider');
        $('#tdDocNot .app').find('.switch').addClass('disabled_slider');
        $('#tdRequestStatus .app').find('.switch').addClass('disabled_slider');
    }
    buildValueUpdate("chkOwenershipApp");
    buildValueUpdate("chkStatusApp");
    buildValueUpdate("chkNewItemApp");
    buildValueUpdate("chkReqStatusApp");
    buildValueUpdate("chkDocApp");

    EnableSlider1();
    $('#tdOwenership').find("input[type='checkbox']").attr("disabled", false);
    $('#tdStatus').find("input[type='checkbox']").attr("disabled", false);
    $('#tdItem').find("input[type='checkbox']").attr("disabled", false);
    $('#tdRequestStatus').find("input[type='checkbox']").attr("disabled", false);
    $('#tdDocNot').find("input[type='checkbox']").attr("disabled", false);
    $('select').attr('disabled', false);

    AdminSettings();
});

$('#chkUnsubscribeAlertEmail').change(function () {

    if ($("#chkUnsubscribeAlertEmail").attr("value") == "ON") {
        if ($("#chkOwenershipEmail").val() != "ON") {
            $("#chkOwenershipEmail").val('ON').change();
        } if ($("#chkNewItemEmail").val() != "ON") {
            $("#chkNewItemEmail").val('ON').change();
        } if ($("#chkStatusEmail").val() != "ON") {
            $("#chkStatusEmail").val('ON').change();
        }
        if ($("#chkReqStatusEmail").val() != "ON") {
            $("#chkReqStatusEmail").val('ON').change();
        }
        if ($("#chkDocEmail").val() != "ON") {
            $("#chkDocEmail").val('ON').change();
        }
        $('#tdOwenership .email').find('.switch').removeClass('disabled_slider');
        $('#tdItem .email').find('.switch').removeClass('disabled_slider');
        $('#tdStatus .email').find('.switch').removeClass('disabled_slider');
        $('#tdRequestStatus .email').find('.switch').removeClass('disabled_slider');
        $('#tdDocNot .email').find('.switch').removeClass('disabled_slider');
    } else {
        if ($("#chkOwenershipEmail").val() != "OFF") {
            $("#chkOwenershipEmail").val('OFF').change();

        } if ($("#chkNewItemEmail").val() != "OFF") {
            $("#chkNewItemEmail").val('OFF').change();

        } if ($("#chkStatusEmail").val() != "OFF") {
            $("#chkStatusEmail").val('OFF').change();

        }
        if ($("#chkReqStatusEmail").val() != "OFF") {
            $("#chkReqStatusEmail").val('OFF').change();

        }
        if ($("#chkDocEmail").val() != "OFF") {
            $("#chkDocEmail").val('OFF').change();

        }
        $('#tdOwenership .email').find('.switch').addClass('disabled_slider');
        $('#tdItem .email').find('.switch').addClass('disabled_slider');
        $('#tdStatus .email').find('.switch').addClass('disabled_slider');
        $('#tdRequestStatus .email').find('.switch').addClass('disabled_slider');
        $('#tdDocNot .email').find('.switch').addClass('disabled_slider');
    }


    buildValueUpdate("chkOwenershipEmail");
    buildValueUpdate("chkStatusEmail");
    buildValueUpdate("chkNewItemEmail");
    buildValueUpdate("chkReqStatusEmail");
    buildValueUpdate("chkDocEmail");

    EnableSlider1();
    $('#tdOwenership').find("input[type='checkbox']").attr("disabled", false);
    $('#tdStatus').find("input[type='checkbox']").attr("disabled", false);
    $('#tdItem').find("input[type='checkbox']").attr("disabled", false);
    $('#tdRequestStatus').find("input[type='checkbox']").attr("disabled", false);
    $('#tdDocNot').find("input[type='checkbox']").attr("disabled", false);
    $('select').attr('disabled', false);

    AdminSettings();

});

//$('#chkUnsubscribeAlertApp').change(function () {

//    if ($("#chkUnsubscribeAlertApp").attr("value") == "OFF" && $("#chkUnsubscribeAlertEmail").attr("value") == "OFF") {
//        if ($("#chkOwenershipApp").val() != "OFF" || $("#chkOwenershipEmail").val() != "OFF") {
//            $("#chkOwenershipApp").val('OFF');
//            $("#chkOwenershipEmail").val('OFF');
//            buildValueUpdate("chkOwenershipApp");
//        }

//        if ($("#chkStatusEmail").val() != "OFF" || $("#chkStatusApp").val() != "OFF") {
//            $("#chkStatusEmail").val('OFF');
//            $("#chkStatusApp").val('OFF');
//            buildValueUpdate("chkStatusEmail");
//        }

//        if ($("#chkNewItemApp").val() != "OFF" || $("#chkNewItemEmail").val() != "OFF") {
//            $("#chkNewItemApp").val('OFF');
//            $("#chkNewItemEmail").val('OFF');
//            buildValueUpdate("chkNewItemApp");
//        }

//        if ($("#chkDocApp").val() != "OFF" || $("#chkDocEmail").val() != "OFF") {
//              $("#chkDocApp").val('OFF');
//            $("#chkDocEmail").val('OFF');
//            buildValueUpdate("chkDocApp");
//          }

//        if ($("#chkReqStatusApp").val() != "OFF" || $("#chkReqStatusEmail").val() != "OFF") {
//            $("#chkReqStatusApp").val('OFF');
//            $("#chkReqStatusEmail").val('OFF');
//            buildValueUpdate("chkReqStatusApp");
//          }
//        $('#tdOwenership').find("input[type='checkbox']").attr("disabled", "disabled");
//        $('#tdStatus').find("input[type='checkbox']").attr("disabled", "disabled");
//        $('#tdItem').find("input[type='checkbox']").attr("disabled", "disabled");
//        $('#tdRequestStatus').find("input[type='checkbox']").attr("disabled", "disabled");
//        $('#tdDocNot').find("input[type='checkbox']").attr("disabled", "disabled");

//        $('#tdOwenership').find('.switch').addClass('disabled_slider');
//        $('#tdItem').find('.switch').addClass('disabled_slider');
//        $('#tdStatus').find('.switch').addClass('disabled_slider');
//        $('#tdRequestStatus').find('.switch').addClass('disabled_slider');
//        $('#tdDocNot').find('.switch').addClass('disabled_slider');
//        EnableSlider1();
//        $('select').attr('disabled', true);

//    }
//    else {
//        if ($("#chkUnsubscribeAlertEmail").attr("value") == "ON") {
//            if ($("#chkOwenershipEmail").val() != "ON") {
//                $("#chkOwenershipEmail").val('ON');
//            } if ($("#chkNewItemEmail").val() != "ON") {
//                $("#chkNewItemEmail").val('ON');
//            } if ($("#chkStatusEmail").val() != "ON") {
//                $("#chkStatusEmail").val('ON');
//            }
//            if ($("#chkDocEmail").val() != "ON") {
//                $("#chkDocEmail").val('OFF');

//            }
//            if ($("#chkReqStatusEmail").val() != "ON") {
//                $("#chkReqStatusEmail").val('ON');

//            }
//            $('#tdOwenership .email').find('.switch').removeClass('disabled_slider');
//            $('#tdItem .email').find('.switch').removeClass('disabled_slider');
//            $('#tdStatus .email').find('.switch').removeClass('disabled_slider');
//            $('#tdDocNot .email').find('.switch').removeClass('disabled_slider');
//            $('#tdRequestStatus .email').find('.switch').removeClass('disabled_slider');
//        } else {
//            if ($("#chkOwenershipEmail").val() != "OFF") {
//                $("#chkOwenershipEmail").val('OFF');

//            } if ($("#chkNewItemEmail").val() != "OFF") {
//                $("#chkNewItemEmail").val('OFF');

//            } if ($("#chkStatusEmail").val() != "OFF") {
//                $("#chkStatusEmail").val('OFF');

//            }
//            if ($("#chkDocEmail").val() != "OFF") {
//                $("#chkDocEmail").val('OFF');

//            }
//            if ($("#chkReqStatusEmail").val() != "OFF") {
//                $("#chkReqStatusEmail").val('OFF');

//            }
//            $('#tdOwenership .email').find('.switch').addClass('disabled_slider');
//            $('#tdItem .email').find('.switch').addClass('disabled_slider');
//            $('#tdStatus .email').find('.switch').addClass('disabled_slider');
//            $('#tdDocNot .email').find('.switch').addClass('disabled_slider');
//            $('#tdRequestStatus .email').find('.switch').addClass('disabled_slider');
//        }

//        if ($("#chkUnsubscribeAlertApp").attr("value") == "ON") {
//            if ($("#chkOwenershipApp").val() != "ON") {
//                $("#chkOwenershipApp").val('ON');
//            } if ($("#chkStatusApp").val() != "ON") {
//                $("#chkStatusApp").val('ON');
//            } if ($("#chkNewItemApp").val() != "ON") {
//                $("#chkNewItemApp").val('ON');
//            }
//            if ($("#chkReqStatusApp").val() != "ON") {
//                $("#chkReqStatusApp").val('ON');
//            }
//            if ($("#chkDocApp").val() != "ON") {
//                $("#chkDocApp").val('ON');
//            }
//            $('#tdOwenership .app').find('.switch').removeClass('disabled_slider');
//            $('#tdItem .app').find('.switch').removeClass('disabled_slider');
//            $('#tdStatus .app').find('.switch').removeClass('disabled_slider');
//            $('#tdDocNot .app').find('.switch').removeClass('disabled_slider');
//            $('#tdRequestStatus .app').find('.switch').removeClass('disabled_slider');
//        } else {
//            if ($("#chkOwenershipApp").val() != "OFF") {
//                $("#chkOwenershipApp").val('OFF');
//            } if ($("#chkStatusApp").val() != "OFF") {
//                $("#chkStatusApp").val('OFF');
//            } if ($("#chkNewItemApp").val() != "OFF") {
//                $("#chkNewItemApp").val('OFF');
//            }
//            if ($("#chkReqStatusApp").val() != "OFF") {
//                $("#chkReqStatusApp").val('OFF');
//            }
//            if ($("#chkDocApp").val() != "OFF") {
//                $("#chkDocApp").val('OFF');
//            }
//            $('#tdOwenership .app').find('.switch').addClass('disabled_slider');
//            $('#tdItem .app').find('.switch').addClass('disabled_slider');
//            $('#tdStatus .app').find('.switch').addClass('disabled_slider');
//            $('#tdDocNot .app').find('.switch').addClass('disabled_slider');
//            $('#tdRequestStatus .app').find('.switch').addClass('disabled_slider');
//        }
//        buildValueUpdate("chkOwenershipApp");
//        buildValueUpdate("chkStatusEmail");
//        buildValueUpdate("chkNewItemApp");
//        buildValueUpdate("chkReqStatusEmail");
//        buildValueUpdate("chkDocEmail");


//        EnableSlider1();
//        $('#tdOwenership').find("input[type='checkbox']").attr("disabled", false);
//        $('#tdStatus').find("input[type='checkbox']").attr("disabled", false);
//        $('#tdItem').find("input[type='checkbox']").attr("disabled", false);
//        $('#tdRequestStatus').find("input[type='checkbox']").attr("disabled", false);
//        $('#tdDocNot').find("input[type='checkbox']").attr("disabled", false);
//        $('select').attr('disabled', false);
//    }
//    AdminSettings();
//});
//$('#chkUnsubscribeAlertEmail').change(function () {

//    if ($("#chkUnsubscribeAlertApp").attr("value") == "OFF" && $("#chkUnsubscribeAlertEmail").attr("value") == "OFF") {
//        if ($("#chkOwenershipApp").val() != "OFF" || $("#chkOwenershipEmail").val() != "OFF") {
//            $("#chkOwenershipApp").val('OFF');
//            $("#chkOwenershipEmail").val('OFF');
//            buildValueUpdate("chkOwenershipApp");
//        }

//        if ($("#chkStatusEmail").val() != "OFF" || $("#chkStatusApp").val() != "OFF") {
//            $("#chkStatusEmail").val('OFF');
//            $("#chkStatusApp").val('OFF');
//            buildValueUpdate("chkStatusEmail");
//        }

//        if ($("#chkDocEmail").val() != "OFF" || $("#chkDocApp").val() != "OFF") {
//            $("#chkDocEmail").val('OFF');
//            $("#chkDocApp").val('OFF');
//            buildValueUpdate("chkDocEmail");
//        }

//        if ($("#chkReqStatusEmail").val() != "OFF" || $("#chkReqStatusApp").val() != "OFF") {
//            $("#chkReqStatusEmail").val('OFF');
//            $("#chkReqStatusApp").val('OFF');
//            buildValueUpdate("chkReqStatusEmail");
//        }

//        if ($("#chkNewItemApp").val() != "OFF" || $("#chkNewItemEmail").val() != "OFF") {
//            $("#chkNewItemApp").val('OFF');
//            $("#chkNewItemEmail").val('OFF');
//            buildValueUpdate("chkNewItemApp");
//        }

//        $('#tdOwenership').find("input[type='checkbox']").attr("disabled", "disabled");
//        $('#tdStatus').find("input[type='checkbox']").attr("disabled", "disabled");
//        $('#tdDocNot').find("input[type='checkbox']").attr("disabled", "disabled");
//        $('#tdRequestStatus').find("input[type='checkbox']").attr("disabled", "disabled");
//        $('#tdItem').find("input[type='checkbox']").attr("disabled", "disabled");
//        $('#tdOwenership').find('.switch').addClass('disabled_slider');
//        $('#tdItem').find('.switch').addClass('disabled_slider');
//        $('#tdStatus').find('.switch').addClass('disabled_slider');
//        $('#tdRequestStatus').find('.switch').addClass('disabled_slider');
//        $('#tdDocNot').find('.switch').addClass('disabled_slider');

//        $('select').attr('disabled', true);
//        EnableSlider1();
//    }

//    else {
//        if ($("#chkUnsubscribeAlertEmail").attr("value") == "ON") {
//            if ($("#chkOwenershipEmail").val() != "ON") {
//                $("#chkOwenershipEmail").val('ON');
//            } if ($("#chkNewItemEmail").val() != "ON") {
//                $("#chkNewItemEmail").val('ON');
//            } if ($("#chkStatusEmail").val() != "ON") {
//                $("#chkStatusEmail").val('ON');
//            }
//            if ($("#chkReqStatusEmail").val() != "ON") {
//                $("#chkReqStatusEmail").val('ON');
//            }
//            if ($("#chkDocEmail").val() != "ON") {
//                $("#chkDocEmail").val('ON');
//            }
//            $('#tdOwenership .email').find('.switch').removeClass('disabled_slider');
//            $('#tdItem .email').find('.switch').removeClass('disabled_slider');
//            $('#tdStatus .email').find('.switch').removeClass('disabled_slider');
//            $('#tdRequestStatus .email').find('.switch').removeClass('disabled_slider');
//            $('#tdDocNot .email').find('.switch').removeClass('disabled_slider');
//        } else {
//            if ($("#chkOwenershipEmail").val() != "OFF") {
//                $("#chkOwenershipEmail").val('OFF');

//            } if ($("#chkNewItemEmail").val() != "OFF") {
//                $("#chkNewItemEmail").val('OFF');

//            } if ($("#chkStatusEmail").val() != "OFF") {
//                $("#chkStatusEmail").val('OFF');

//            }
//            if ($("#chkReqStatusEmail").val() != "OFF") {
//                $("#chkReqStatusEmail").val('OFF');

//            }
//            if ($("#chkDocEmail").val() != "OFF") {
//                $("#chkDocEmail").val('OFF');

//            }
//            $('#tdOwenership .email').find('.switch').addClass('disabled_slider');
//            $('#tdItem .email').find('.switch').addClass('disabled_slider');
//            $('#tdStatus .email').find('.switch').addClass('disabled_slider');
//            $('#tdRequestStatus .email').find('.switch').addClass('disabled_slider');
//            $('#tdDocNot .email').find('.switch').addClass('disabled_slider');
//        }

//        if ($("#chkUnsubscribeAlertApp").attr("value") == "ON") {
//            if ($("#chkOwenershipApp").val() != "ON") {
//                $("#chkOwenershipApp").val('ON');
//            } if ($("#chkStatusApp").val() != "ON") {
//                $("#chkStatusApp").val('ON');
//            } if ($("#chkNewItemApp").val() != "ON") {
//                $("#chkNewItemApp").val('ON');
//            }
//            if ($("#chkReqStatusApp").val() != "ON") {
//                $("#chkReqStatusApp").val('ON');
//            }
//            if ($("#chkDocApp").val() != "ON") {
//                $("#chkDocApp").val('ON');
//            }
//            $('#tdOwenership .app').find('.switch').removeClass('disabled_slider');
//            $('#tdItem .app').find('.switch').removeClass('disabled_slider');
//            $('#tdStatus .app').find('.switch').removeClass('disabled_slider');
//            $('#tdRequestStatus .app').find('.switch').removeClass('disabled_slider');
//            $('#tdDocNot .app').find('.switch').removeClass('disabled_slider')
//        } else {
//            if ($("#chkOwenershipApp").val() != "OFF") {
//                $("#chkOwenershipApp").val('OFF');
//            } if ($("#chkStatusApp").val() != "OFF") {
//                $("#chkStatusApp").val('OFF');
//            } if ($("#chkNewItemApp").val() != "OFF") {
//                $("#chkNewItemApp").val('OFF');
//            }
//            if ($("#chkReqStatusApp").val() != "OFF") {
//                $("#chkReqStatusApp").val('OFF');
//            }
//            if ($("#chkDocApp").val() != "OFF") {
//                $("#chkDocApp").val('OFF');
//            }
//            $('#tdOwenership .app').find('.switch').addClass('disabled_slider');
//            $('#tdItem .app').find('.switch').addClass('disabled_slider');
//            $('#tdStatus .app').find('.switch').addClass('disabled_slider');
//            $('#tdRequestStatus .app').find('.switch').addClass('disabled_slider');
//            $('#tdDocNot .app').find('.switch').addClass('disabled_slider')
//        }
//        buildValueUpdate("chkOwenershipApp");
//        buildValueUpdate("chkStatusEmail");
//        buildValueUpdate("chkNewItemApp");
//        buildValueUpdate("chkReqStatusApp");
//        buildValueUpdate("chkDocApp");



//        EnableSlider1();
//        $('#tdOwenership').find("input[type='checkbox']").attr("disabled", false);
//        $('#tdStatus').find("input[type='checkbox']").attr("disabled", false);
//        $('#tdItem').find("input[type='checkbox']").attr("disabled", false);
//        $('#tdRequestStatus').find("input[type='checkbox']").attr("disabled", false);
//        $('#tdDocNot').find("input[type='checkbox']").attr("disabled", false);
//        $('select').attr('disabled', false);
//    }
//    AdminSettings();
//});

function buildValueUpdate(CheckInputID) {
    if (CheckInputID != null && typeof (CheckInputID) != "undefined") {
        if (CheckInputID.indexOf("Owenership") > -1) {
            var Value = "";
            if ($("#chkOwenershipApp").attr("value") == "ON")
                Value = "App Alert; ";
            if ($("#chkOwenershipEmail").attr("value") == "ON")
                Value += "Email Notification";

            UpdateAlertsData("OwnershipUpdate", Value);
        }
        else if (CheckInputID.indexOf("Doc") > -1) {
            var Value = "";
            if ($("#chkDocApp").attr("value") == "ON")
                Value = "App Alert; ";
            if ($("#chkDocEmail").attr("value") == "ON")
                Value += "Email Notification";

            UpdateAlertsData("DocumentNotification", Value);
        }
        else if (CheckInputID.indexOf("ReqStatus") > -1) {
            var Value = "";
            if ($("#chkReqStatusApp").attr("value") == "ON")
                Value = "App Alert; ";
            if ($("#chkReqStatusEmail").attr("value") == "ON")
                Value += "Email Notification";

            UpdateAlertsData("RequestUpdate", Value);
        }
        else if (CheckInputID.indexOf("Status") > -1) {
            var Value = "";
            if ($("#chkStatusApp").attr("value") == "ON")
                Value = "App Alert; ";
            if ($("#chkStatusEmail").attr("value") == "ON")
                Value += "Email Notification";

            UpdateAlertsData("StatusUpdate", Value);
        }
        else if (CheckInputID.indexOf("NewItem") > -1) {
            var Value = "";
            if ($("#chkNewItemApp").attr("value") == "ON")
                Value = "App Alert; ";
            if ($("#chkNewItemEmail").attr("value") == "ON")
                Value += "Email Notification";

            UpdateAlertsData("NewItems", Value);
        }
        else if (CheckInputID.indexOf("Unsubscribe") > -1) {
            var Value = "";
            if ($("#chkUnsubscribeAlertApp").attr("value") == "ON")
                Value = "App Alert; ";
            if ($("#chkUnsubscribeAlertEmail").attr("value") == "ON")
                Value += "Email Notification";

            UpdateAlertsData("Unsubscribe", Value);
        }
    }
}

function UpdateAlertsData(fieldToUpdate, ValueToupdate) {
    try {
        vUserAlert[fieldToUpdate] = ValueToupdate;
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/useralertsupdatefieldvalue?FieldToUpdate=' + fieldToUpdate + '&ValueToUpdate=' + ValueToupdate + '',
            type: 'POST',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, UserID: localStorage.UserID },
            cache: false,
            asyc: true,
            success: function (person) {
                vUserAlert = person;
            },
            error: function (person) {
            }
        });

    }
    catch (ex) {

    }

}


//Sridhar
function GetAlertSettings() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/useralertsall',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (alerts) {
            vAlertSettings = alerts;
            AdminSettings();
        },
        error: function (alerts) {
            vAlertSettings = [];
        }
    });
}

function AdminSettings() {
    $(vAlertSettings).each(function (i, item) {
        if (item.RowKey == "C2") {
            if (item.Active == false) {
                $("#chkAssignedOwnership").attr('disabled', 'disabled');
                $("#chkAssignedOwnership").prop('checked', false);
                $("#ddlAssignedOwnershipF").attr('disabled', 'disabled');
            }
        }
        if (item.RowKey == "C3") {
            if (item.Active == false) {
                $("#chkChangedOwnership").attr('disabled', 'disabled');
                $("#chkChangedOwnership").prop('checked', false);
                $("#ddlChangedOwnershipF").attr('disabled', 'disabled');
            }
        }
        if (item.RowKey == "R2") {
            if (item.Active == false) {
                $("#chkAssignedRequestOwnership").attr('disabled', 'disabled');
                $("#chkAssignedRequestOwnership").prop('checked', false);
                $("#ddlAssignedRequestOwnershipF").attr('disabled', 'disabled');
            }
        }
        if (item.RowKey == "R3") {
            if (item.Active == false) {
                $("#chkChangedRequestOwnership").attr('disabled', 'disabled');
                $("#chkChangedRequestOwnership").prop('checked', false);
                $("#ddlChangedRequestOwnershipF").attr('disabled', 'disabled');
            }
        }
        if (item.RowKey == "C4") {
            if (item.Active == false) {
                $("#chkContractSigned").attr('disabled', 'disabled');
                $("#chkContractSigned").prop('checked', false);
                $("#ddlContractSigned").attr('disabled', 'disabled');
                $("#ddlContractSignedF").attr('disabled', 'disabled');
            }
        }
        if (item.RowKey == "C5") {
            if (item.Active == false) {
                $("#chkContractActive").attr('disabled', 'disabled');
                $("#chkContractActive").prop('checked', false);
                $("#ddlContractActive").attr('disabled', 'disabled');
                $("#ddlContractActiveF").attr('disabled', 'disabled');
            }
        }
        if (item.RowKey == "C7") {
            if (item.Active == false) {
                $("#chkContractRenewed").attr('disabled', 'disabled');
                $("#chkContractRenewed").prop('checked', false);
                $("#ddlContractRenewed").attr('disabled', 'disabled');
                $("#ddlContractRenewedF").attr('disabled', 'disabled');
            }
        }
        if (item.RowKey == "C9") {
            if (item.Active == false) {
                $("#chkContractExpires").attr('disabled', 'disabled');
                $("#chkContractExpires").prop('checked', false);
                $("#ddlContractExpires").attr('disabled', 'disabled');
                $("#ddlContractExpiresF").attr('disabled', 'disabled');
            }
        }
        if (item.RowKey == "C10") {
            if (item.Active == false) {
                $("#chkContractCancelled").attr('disabled', 'disabled');
                $("#chkContractCancelled").prop('checked', false);
                $("#ddlContractCancelled").attr('disabled', 'disabled');
                $("#ddlContractCancelledF").attr('disabled', 'disabled');
            }
        }
        if (item.RowKey == "C6") {
            if (item.Active == false) {
                $("#chkContractUpRenewal").attr('disabled', 'disabled');
                $("#chkContractUpRenewal").prop('checked', false);
                $("#ddlContractUpRenewal").attr('disabled', 'disabled');
                $("#ddlContractUpRenewalF").attr('disabled', 'disabled');
            }
        }
        if (item.RowKey == "C8") {
            if (item.Active == false) {
                $("#chkContractAboutExpire").attr('disabled', 'disabled');
                $("#chkContractAboutExpire").prop('checked', false);
                $("#ddlContractAboutExpire").attr('disabled', 'disabled');
                $("#ddlContractAboutExpireF").attr('disabled', 'disabled');
            }
        }
        //contract archived
        if (item.RowKey == "C11") {
            if (item.Active == false) {
                $("#chkContractArchived").attr('disabled', 'disabled');
                $("#chkContractArchived").prop('checked', false);
                $("#ddlContractArchived").attr('disabled', 'disabled');
                $("#ddlContractArchivedF").attr('disabled', 'disabled');
            }
        }
        //Doc added to contract
        if (item.RowKey == "C12") {
            if (item.Active == false) {
                $("#chkDocAdded").attr('disabled', 'disabled');
                $("#chkDocAdded").prop('checked', false);
                $("#ddlDocAddedF").attr('disabled', 'disabled');
            }
        }
        //Doc Status updated
        if (item.RowKey == "D2") {
            if (item.Active == false) {
                $("#chkDocStatusUpdate").attr('disabled', 'disabled');
                $("#chkDocStatusUpdate").prop('checked', false);
                $("#ddlADocStatusUpdateF").attr('disabled', 'disabled');

            }
        }
        //Doc Published
        if (item.RowKey == "D3") {
            if (item.Active == false) {
                $("#chkDocPublished").attr('disabled', 'disabled');
                $("#chkDocPublished").prop('checked', false);
                $("#ddlDocPublishedF").attr('disabled', 'disabled');

            }
        }
        //Request Completed
        if (item.RowKey == "R5") {
            if (item.Active == false) {
                $("#chkReqCompleted").attr('disabled', 'disabled');
                $("#chkReqCompleted").prop('checked', false);
                // $("#ddlDocPublishedF").attr('disabled', 'disabled');
            }
        }
        if (item.RowKey == "C1") {
            if (item.Active == false) {
                $("#chkNewContract").attr('disabled', 'disabled');
                $("#chkNewContract").prop('checked', false);
                $("#ddlNewContractF").attr('disabled', 'disabled');
            }
        }
        if (item.RowKey == "CP1") {
            if (item.Active == false) {
                $("#chkNewCounterparty").attr('disabled', 'disabled');
                $("#chkNewCounterparty").prop('checked', false);
                $("#ddlNewCounterpartyF").attr('disabled', 'disabled');
            }
        }
        if (item.RowKey == "R1") {
            if (item.Active == false) {
                $("#chkNewRequest").attr('disabled', 'disabled');
                $("#chkNewRequest").prop('checked', false);
                $("#ddlNewRequestF").attr('disabled', 'disabled');
            }
        }
    });
}

function ApplyPermissions() {
    var userid = localStorage.UserID;
    //getParameterByName("UserID");
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/usersbyid?userid=' + userid,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        async: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            if (data.UserType.indexOf("Global Contract Owner") >= 0) {
                HideNewItemNotf();
                $("#trNewItemView").css("display", "");
                $("#trNewItemEdit").css("display", "none");
            } else if (data.UserType.indexOf("Business Area Owner") >= 0) {
                HideNewItemNotf();
                $("#trNewItemView").css("display", "");
                $("#trNewItemEdit").css("display", "none");
            } else {
                $("#trNewItemView").css("display", "none");
                $("#trNewItemEdit").css("display", "none");
            }
        },
        error: function (data) {

        }
    });
}

$(".switch_val").change(function () {
    if ($(this).val() == "OFF") {
        $.each($("input[type=checkbox]:disabled"), function (i, item) {
            $(item).attr('style', 'cursor:not-allowed;');
        });
    }
    else {
        $.each($("input[type=checkbox]"), function (i, item) {
            $(item).attr('style', 'cursor:pointer;');
        });
    }
});



function Loading_View_trigger() {

}