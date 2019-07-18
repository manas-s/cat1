var obligationProducts = "";

$(document).ready(function () {
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

    $('#txtObligationProductAmountNew').autoNumeric('init');
    $('#txtObligationProductAmountNewActual').autoNumeric('init');
    $('#txtObligationProductAmountNewEdit').autoNumeric('init');
    $('#txtObligationProductAmountNewActualEdit').autoNumeric('init');

    //$(".FL_ObligationsDet").hide();


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


    $("#dtMilestoneDateNew").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: DatepickerFormat,
        onSelect: function (dateText, inst) {
            GetMilestonedynamicRecurrenceCount();
            MilestoneDateSlectedEvent(this);
        },
    });

    $("#dtMilestoneNewCompletedDate").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: DatepickerFormat
    });

    $("#dtMilestoneCompletedDate").datepicker({
        changeMonth: true,
        changeYear: true, dateFormat: DatepickerFormat
    });

    $('#dtObligationNewDueDate').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: DatepickerFormat,
        onSelect: function (dateText, inst) {
            GetObligationdynamicRecurrenceCount();
            ObligationDueDateSlectedEvent(this);
        },
    });
    $('#txtProductUnitPrice').autoNumeric('init');
    //allowOnlyNumberInInputBox("txtProductUnitPrice");
    $('#dtObligationNewCompletedDate').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: DatepickerFormat
    });

    $('#dtObligationProductCompletedDate').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: DatepickerFormat
    });


    $('#dtObligationProductCompletedDateEdit').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: DatepickerFormat
    });

    //Obligation Dialog Start
    $("#addEditObligation").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Obligation",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "Save": function () {
                if (modalOnOpenObligation()) { }
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#addEditObligationNew").dialog({
        autoOpen: false,
        closeText: "",
        width: "80%",
        height: "auto",
        title: "Amendment",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "Save": function () {

                if (modalOnOpenObligationNew()) {

                }
            },
            Cancel: function () {
                if ($("#obligationnewheading").text() != "Edit Obligation") {
                    if ($('#txtObligationProductsCount').val() == "Yes") {

                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/deleteempty?strDelete=' + "Catalog",
                            type: 'DELETE',
                            dataType: 'json',
                            headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName, contractId: getParameterByName("ContractID") },
                            "Content-Type": "application/json",
                            cache: false,
                            success: function (data) {
                                $("#addEditObligationNew").dialog("close");
                            }
                        });
                    }

                    if ($('#txtObligationFinancialsCount').val() == "Yes") {
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/deleteempty?strDelete=' + "Financials",
                            type: 'DELETE',
                            dataType: 'json',
                            headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName, contractId: getParameterByName("ContractID") },
                            "Content-Type": "application/json",
                            cache: false,
                            success: function (data) {
                                $("#addEditObligationNew").dialog("close");
                            }
                        });
                    }
                    if ($('#txtObligationFinancialsCount').val() != "Yes" && $('#txtObligationProductsCount').val() != "Yes") {
                        $("#addEditObligationNew").dialog("close");
                    }
                }
                else {
                    $("#addEditObligationNew").dialog("close");
                }

            }

        },
        close: function () {
            if ($("#obligationnewheading").text() != "Edit Obligation") {
                if ($('#txtObligationProductsCount').val() == "Yes") {

                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/deleteempty?strDelete=' + "Catalog",
                        type: 'DELETE',
                        dataType: 'json',
                        headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName, contractId: getParameterByName("ContractID") },
                        "Content-Type": "application/json",
                        cache: false,
                        success: function (data) {
                            $("#addEditObligationNew").dialog("close");
                        }
                    });
                }

                if ($('#txtObligationFinancialsCount').val() == "Yes") {
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/deleteempty?strDelete=' + "Financials",
                        type: 'DELETE',
                        dataType: 'json',
                        headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName, contractId: getParameterByName("ContractID") },
                        "Content-Type": "application/json",
                        cache: false,
                        success: function (data) {
                            $("#addEditObligationNew").dialog("close");
                        }
                    });
                }
                if ($('#txtObligationFinancialsCount').val() != "Yes" && $('#txtObligationProductsCount').val() != "Yes") {
                    $("#addEditObligationNew").dialog("close");
                }
            }
            else {
                $("#addEditObligationNew").dialog("close");
            }
            BindMilestone();
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

    $("#obligationRecurrenceStatusEditPopup").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        height: 150,
        title: "Add Item",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });


    //Obligation Newly Added Start
    $("#obligationcatalogsAddPopup").dialog({
        autoOpen: false,
        closeText: "",
        width: "65%",
        height: 500,

        modal: true,
        buttons: {
            "Add": function () { SaveObligationcatalog(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#obligationfinancialsAddPopup").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        height: 500,
        title: "Add Item",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "Add": function () { SaveObligationfinancials(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    //Obligation Newly Added End


    $("#obligationcatalogseditPopup").dialog({
        autoOpen: false,
        closeText: "",
        width: "65%",
        height: 500,

        modal: true,
        buttons: {
            "Update": function () { UpdateObligationcatalog(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });


    $("#obligationfinancialseditPopup").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        height: 500,
        title: "Edit Item",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "Update": function () { UpdateObligationfinancials(); },
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
    $("#obligationFinancialsViewPopup").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "View Financials",
        modal: true,
        buttons: {
            Close: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#catalogsAddPopup").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        height: 500,
        title: "Add Item",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "ADD": function () { Savecatalog(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
    $("#transactionAddPopup").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        height: 500,
        title: "Add Transaction",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "Save": function () { Savecatalog(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#AddNewProductsPopup").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Add Product",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "Save": function () { CreateProduct(); },
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
                $(this).dialog("close");
                $("#txtSearchBoxProduct").val("");
            },
            Cancel: function () {
                $('#txtSearchBoxProduct').val('');
                $(this).dialog("close");
            }
        }
    });


    $("#viewProductsMulPopup").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Manage Products",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "ADD": function () {
                SaveMulObligationCatalogsProducts();
                $('input:checkbox[name=ExtProductsMul]').removeAttr('checked');
                $("#txtSearchBoxProductMul").val(""); $(this).dialog("close");
            },
            "Clear": function () {
                $('#txtSearchBoxProductMul').val('');
                $('input:checkbox[name=ExtProductsMul]').removeAttr('checked');
            },
            Cancel: function () {
                $('#txtSearchBoxProductMul').val('');
                $('input:checkbox[name=ExtProductsMul]').removeAttr('checked');
                $(this).dialog("close");
            }
        }
    });
    $("#catalogsViewPopup").dialog({
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

    $("#commitmentViewPopup").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "View Commitments",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            Close: function () {

                $(this).dialog("close");
            }
        }
    });

    $("#catalogseditPopup").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        height: 500,
        title: "Edit Item",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "Update": function () { Updatecatalog(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    //Obligation Dialog End

    $("#addEditMilestoneNew").dialog({
        autoOpen: false,
        closeText: "",
        width: "75%",
        height: "auto",
        resizable: false,
        title: "Milestone",
        dialogClass: "popup_width100",
        modal: true, buttons: [
        {
            text: "Save Milestone",
            "id": "btnPopupMilestoneSave",
            click: function () {
                if (milestonevalidate()) {

                }
            }
        },
        {
            text: "Cancel",
            click: function () {
                $(this).dialog("close");
            }
        }
        ]
    });

    $("#milestonesRecurrenceEditPopup").dialog({
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
                $("#addEditMilestoneNew").dialog("close");
            }
        }
    });

    $("#milestonesRecurrenceNewEditPopup").dialog({
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
                $("#addEditMilestoneNew").dialog("close");
            }
        }
    });
    allowNumericsNewMonthly();
});



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
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones?contractid=' + contractid,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
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
                        vMilestStatus = '<b class="milestone-Delayed" title="DELAYED"><img src="../Content/Images/status/exp.png"> Dly</b>';
                    else if (dateOne >= dateTwo)
                        vMilestStatus = '<b class="milestone-Upcoming" title="UPCOMING"><img src="../Content/Images/status/renew.png"> Upco</b>';
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
                    vMilestStatus = '<b class="milestone-Complete" title="COMPLETED"><img src="../Content/Images/status/tick.png"> Comp</b>';

                    if (item.MilestoneDate != null) {
                        article += '<input type="checkbox" style="margin-right: 0px;vertical-align: middle;" class="delmilestone" id="' + item.RowKey + '"  name="chkmilestone" onclick="checkMultipleMilestonesNewMul(this);" value=' + item.RowKey + ' /> ';
                    }
                    // article += vMilestStatus;
                    article += '<img style="width: 14px; vertical-align: sub;pointer-events: none; margin-right: 2px;" title="Milestone" src="/Content/Images/cal-icon.png">';
                    article += '<span class="DateToSort" style="color: black;"> ' + vMilestoneDate + '</span>';
                    article += '<a href="javascript:void(0)" style="color:#555555;" onclick="ViewMilestineDetail(\'' + item.RowKey + '\')"><del>' + item.MilestoneTitle + '</del></a>';
                }
                else {
                    if (item.MilestoneDate != null) {
                        article += '<input type="checkbox"  style="margin-right: 0px;vertical-align: middle;" id="' + item.RowKey + '"  name="chkmilestone" onclick="checkMultipleMilestonesNewMul(this);" value=' + item.RowKey + ' /> ';
                    }
                    // article += vMilestStatus;
                    article += '<img style="width: 14px; vertical-align: sub;pointer-events: none; margin-right: 2px;" title="Milestone" src="/Content/Images/cal-icon.png">';
                    article += '<span class="DateToSort" style="color: black;"> ' + vMilestoneDate + '</span>';
                    article += '<a href="javascript:void(0)" style="color:#555555;" onclick="ViewMilestineDetail(\'' + item.RowKey + '\')">' + item.MilestoneTitle + '</a>';
                }
                article += '&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuMilestone"/>';

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
            //*Harshitha.
            //$("#tblMilestoneMissing").parent().remove()
            //$("#ulMilestoneBody").parent().prepend('<div class="warning-msg clearfix clpendingaction" style="display:none;"><img src="/Content/Images/icon/warning-icon.png" alt=""><table id="tblMilestoneMissing"></table><a href="javascript:void(0);" class="close1" onclick="GetContractPendingAction(true,\'Milestones\')" title="View All"><img src="/Content/Images/view-all-new.png" style="cursor:pointer;">&nbsp;</a></div>')
            //$("#ulMilestoneBody").parent().prepend('<div class="wmessage clearfix clpendingaction" style="display:none;margin-left:33%;margin-top:-30px;margin-bottom:32px;"><table id="tblMilestoneMissing"></table></div>') //ENH 23  Minor Enhancement Specs-Rahul    //Added 2.4final to 2.4
            BindSystemMilestoneTest(articleSystemMileStone, articleDocumentMileStone, articleMileStone, articleObligationMileStone);
            //Binding Missing Information
            pendingStarted = false;
            GetContractPendingAction(false);
            //
        }
    });

}

function BindMilestoneTypes() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestonetypes',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (documenttypes) {
            $(documenttypes).each(function (i, item) {
                $("#ddlMilestoneType").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>");
                $("#ddlMilestoneTypeNew").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>");
            });
        }
    });
}

$("#ddlMilestoneNewStatus").change(function (obj) {
    var milestoneStatus = $("#ddlMilestoneNewStatus").val();

    if (milestoneStatus == "Complete") {
        var CDate = new Date();
        CDate = formatDate(CDate);
        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
        { CDate = moment(new Date(CDate)).format('MM/DD/YYYY'); }
        else { CDate = moment(new Date(CDate)).utc().format(localStorage.AppDateFormat); }

        $("#ulMilestoneNewCompletedDate").css('display', '');
        $('#dtMilestoneNewCompletedDate').addClass('validelement');
        $('#dtMilestoneNewCompletedDate').addClass('validdate');
        $('#dtMilestoneNewCompletedDate').val(CDate);

    }
    else {

        $("#ulMilestoneNewCompletedDate").css('display', 'none');
        $('#dtMilestoneNewCompletedDate').removeClass('validelement');
        $('#dtMilestoneNewCompletedDate').removeClass('validdate');
        $('#dtMilestoneNewCompletedDate').val("");
    }

});


//Sridhar
function enableMilestoneSwitch() {
    $("#AlertMile").val('Yes').change();
    //$("#enableSwitch").parent().remove();
    if (IsPipeline) {
        $("#reminderEnable").empty();
        $("#reminderEnable").append("Reminders <span style='color: red;margin-left: 20%'>To turn OFF reminders for milestone notifications, click <a href='javascript:void(0);' id='disableSwitch' onclick='disableMilestoneSwitch()'>Disable</a></span>")
    }
}

function disableMilestoneSwitch() {
    $("#AlertMile").val('No').change();
    //$("#enableSwitch").parent().remove();
    if (IsPipeline) {
        $("#reminderEnable").empty();
        $("#reminderEnable").append("Reminders <span style='color: red;margin-left: 20%'>To turn ON reminders for milestone notifications, click <a href='javascript:void(0);' id='enableSwitch' onclick='enableMilestoneSwitch()'>Enable</a></span>")
    }
}

$("#AlertMile").change(function () {
    if (IsPipeline) {
        if ($(this).val() == "Yes") {
            $("#reminderEnable").empty();
            $("#reminderEnable").append("Reminders <span style='color: red;margin-left: 20%'>To turn OFF reminders for milestone notifications, click <a href='javascript:void(0);' id='disableSwitch' onclick='disableMilestoneSwitch()'>Disable</a></span>")
        }
        else if ($(this).val() == "No") {
            $("#reminderEnable").empty();
            $("#reminderEnable").append("Reminders <span style='color: red;margin-left: 20%'>To turn ON reminders for milestone notifications, click <a href='javascript:void(0);' id='enableSwitch' onclick='enableMilestoneSwitch()'>Enable</a></span>")
        }
    }
});
//Sridhar



//Sridhar
function EnableAllMilestones(contractid) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones/enableallmilestones?contractid=' + contractid,
        type: 'PUT',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        cache: false,
        success: function (result) { }
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
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones/changestatus?status=Complete',
            type: 'PUT',
            dataType: 'json',
            data: formDataStatusMile,
            contentType: false,
            processData: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
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
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationcatalogs?obligationtext=' + vObligationText + '&obligationId=' + vObligationID,
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
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/updateobligationbyId?obligationId=' + vObligationID + '&obligationstatus=' + 'Complete',
                            type: 'POST',
                            dataType: 'json',
                            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                            cache: false,
                            success: function (person) {
                                BindObligationsNew(getParameterByName('ContractID'));
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
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/updateobligationbyId?obligationId=' + vObligationID + '&obligationstatus=' + 'Complete',
                        type: 'POST',
                        dataType: 'json',
                        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                        cache: false,
                        success: function (person) {
                            BindObligationsNew(getParameterByName('ContractID'));
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
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/updateobligationbyId?obligationId=' + vObligationID + '&obligationstatus=' + 'Complete',
                    type: 'POST',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                    cache: false,
                    success: function (person) {
                        BindObligationsNew(getParameterByName('ContractID'));
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

function getMilestoneOwners(milestoneOwners) {
    $("#loadingPage").fadeIn();
    var msOwners = [];
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones/ownersfromgroup?contractid=' + getParameterByName('ContractID') + '&milestoneonwers=' + milestoneOwners,
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
    return msOwners;
}

function BindObligationMilestones(contractid, subCount) {
    var completeArticle = '';
    var sbcount = subCount;
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsNew?contractid=' + contractid,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
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

//*Harshitha
function BindSystemMilestones(Contract) {

    articleSystemMileStone = '';
    delayedTermDates = "";
    var vContractStatus = ["Ready for Signature", "Awaiting Signatures", "Signed", "Active", "Up for Renewal", "Renewed", "Extended", "On Hold", "Replaced", "Expired", "Cancelled", "Terminated", "Archived", "About to Expire"];
    // if ($.inArray(contractItem.Status, vContractStatus) > -1) {
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
        //if (contractItem.RenewalDate != null) {
        //    var dateValue = Contract.RenewalDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
        //    SystemMileStoneArticle("Renew On", dateValue, beforeDaysSort, afterDaysSort);
        //}
        //else {
        //    delayedTermDates += "<tr><td class='f_head'>Missing Renew On</td></tr>";
        //}

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
    //}
    //*Harshitha
    BindSystemMilestoneTest(articleSystemMileStone, articleDocumentMileStone, articleMileStone, articleObligationMileStone);
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

function addMilestone() {

    $("#btnAddMilestone").click();
}

$('#btnAddMilestone').click(function () {

    AddMilestoneMoreNew();
});

var listMilestoneNewData = "";
var listMilestoneNewEndDate = "";
var listMilestoneNewStartDate = "";
var milestoneRecur = "";
var milestoneRecurCusString = "";
var milestoneoccur = 1;


function MilestoneDateSlectedEvent(obj) {
    var dateNew = new Date($.datepicker.formatDate('mm/dd/yy', $(obj).datepicker('getDate')));
    $("input:checkbox[name=chkMilestoneRecurWeekly]").each(function () {
        this.checked = false;
    });
    var day = dateNew.getDay()
    var chkboxId = "MRC" + day;

    $("#" + chkboxId).prop('checked', true);

    if ($('#txtMilestoneNewText').val() != "") {

    }
    else {
        document.getElementById("ddlMilestoneOccurencess").disabled = false;
    }


    $('#dtMilestoneNewOccurrenceDueDate').val(dateNew.getDate());
    $('#dtMilestoneOcurrMonthforYear').val(monthNames[dateNew.getMonth()]);
    $('#dtMilestoneOcurrDateforYear').val(dateNew.getDate());


    if ($("#ddlMilestoneOccurencess").val() != "None") {
        GetMilestoneDataFinal("");
    }


}

var userFlag = false;
var userFlagCustom = false;
$("#ddlMilestoneOccurencess").change(function (obj) {

    GetMilestonedynamicRecurrenceCount();


    var fMilestoneDateNew = '';
    if ($("#dtMilestoneDateNew").val() != "" && $("#dtMilestoneDateNew").val() != null) {
        fMilestoneDateNew = $.datepicker.formatDate('mm/dd/yy', $("#dtMilestoneDateNew").datepicker('getDate'))

    }

    listMilestoneNewStartDate = fMilestoneDateNew;
    var date = new Date(fMilestoneDateNew);
    var Cus = "";
    var ocurrTxtnew = $("#ddlMilestoneOccurencess").val();

    var customstring = "";

    if (ocurrTxtnew == "Monthly") {
        Cus = date.getDay();
        var abc = new Date(fMilestoneDateNew);

        $('#dtMilestoneNewOccurrenceDueDate').val(abc.getDate());
        $('#divMilestoneOcurrenceMonthly').css('display', '');
        $('#divMilestoneOcurrenceWeekly').css('display', 'none');
        $('#divMilestoneOcurrenceSummary').css('display', '');
        customstring = $("#ddlMilestoneRepeatMonthly").val();
        $('#dvMilestoneOcurrenceEnd').css('display', '');
        $('#ddlMilestoneRepeatMonthly').css('display', '');

        $('#lblMilestoneOcurrenceMonth').css('display', '');
        $('#lblMilestoneOcurrenceYear').css('display', 'none');

        if (listMilestoneNewEndDate != "Not Available") {

        }
        else {
            dynamicOccCount = 54;
        }


    }
    else if (ocurrTxtnew == "Yearly") {
        Cus = date.getFullYear();
        var abc = new Date(fMilestoneDateNew);
        var text = monthNames[abc.getMonth()];

        $('#dtMilestoneOcurrDateforYear').val(abc.getDate());

        $('#dtMilestoneOcurrMonthforYear').val(text);
        $('#divMilestoneOcurrenceMonthly').css('display', '');
        $('#divMilestoneOcurrenceWeekly').css('display', 'none');
        $('#divMilestoneOcurrenceSummary').css('display', '');

        $('#dvMilestoneOcurrenceEnd').css('display', '');
        $("#ddlMilestoneRepeatMonthly").val("1");
        $('#ddlMilestoneRepeatMonthly').css('display', 'none');
        $('#lblMilestoneOcurrenceMonth').css('display', 'none');
        $('#lblMilestoneOcurrenceYear').css('display', '');

        if (listMilestoneNewEndDate != "Not Available") {

        }
        else {
            dynamicOccCount = 54;
        }

    }
    else if (ocurrTxtnew == "Weekly") {
        $('#dtMilestoneNewOccurrenceDueDate').val("");
        $('#divMilestoneOcurrenceMonthly').css('display', 'none');
        $('#divMilestoneOcurrenceWeekly').css('display', '');
        $('#divMilestoneOcurrenceSummary').css('display', '');

        $('#dvMilestoneOcurrenceEnd').css('display', '');
        $("input:checkbox[name=chkMilestoneRecurWeekly]:checked").each(function () {
            Cus += (this.value) + ",";
        });
        Cus = removeLastChar(Cus, ',');
        $("#ddlMilestoneRepeatMonthly").val("1");

        if (listMilestoneNewEndDate != "Not Available") {

        }
        else {
            dynamicOccCount = 54;
        }

    }
    else {
        $('#dtMilestoneNewOccurrenceDueDate').val("");
        $('#divMilestoneOcurrenceMonthly').css('display', 'none');
        $('#divMilestoneOcurrenceWeekly').css('display', 'none');
        $('#divMilestoneOcurrenceSummary').css('display', 'none');

        $('#dvMilestoneOcurrenceEnd').css('display', 'none');
        $("#ddlMilestoneRepeatMonthly").val("1");

        if (listMilestoneNewEndDate != "Not Available") {

        }
        else {
            dynamicOccCount = 54;
        }

    }

    if (userFlag) {
        if (userFlagCustom) {
            $("#rdMilestoneNewEndOccurence").removeAttr('disabled');
            $("#rdMilestoneNewEndOccurenceUser").prop("checked", true);
            $('#rdMilestoneNewEndOccurence').removeAttr('checked');
        }
        else {
            $("#rdMilestoneNewEndOccurence").removeAttr('disabled');
            $("#rdMilestoneNewEndOccurence").prop("checked", true);
            $('#rdMilestoneNewEndOccurenceUser').removeAttr('checked');
        }
    }





    if ($('input[name=SelectMilestoneOccurenceEndDate]:checked').val() == 'TillEnd') {

        GetMilestoneDataFinal(Cus);
    }
    else {
        if (parseInt($("#txtMilestoneOccurrenceCount").val()) == 0 || $("#txtMilestoneOccurrenceCount").val() == "" || $("#txtMilestoneOccurrenceCount").val() == null) {
            $("#txtMilestoneOccurrenceCount").val('1');
        }

        getOcurrenceValuesForMilestone($("#ddlMilestoneOccurencess").val(), $("#txtMilestoneOccurrenceCount").val(), listMilestoneNewStartDate, Cus, customstring);

    }




});



var dynclistMilestoneNewStartDate = '';
function GetMilestonedynamicRecurrenceCount() {
    var fMilestoneDateNew = '';
    if ($("#dtMilestoneDateNew").val() != "" && $("#dtMilestoneDateNew").val() != null) {
        fMilestoneDateNew = $.datepicker.formatDate('mm/dd/yy', $("#dtMilestoneDateNew").datepicker('getDate'))

    }
    var startDateNew = new Date();
    var recst = new Date();
    var reced = new Date();
    var customstringnew = "";
    dynclistMilestoneNewStartDate = fMilestoneDateNew;
    if (listMilestoneNewEndDate != "Not Available") {
        if ($("#ddlMilestoneOccurencess option:selected").val() == "Weekly") {
            var newTestDateNew2 = new Date();
            var sta = false;
            var OCount = 1;
            var Cus = "";
            var CustomRecWeekly = [];
            $("input:checkbox[name=chkMilestoneRecurWeekly]:checked").each(function () {
                CustomRecWeekly.push(this.value);
                Cus += (this.value) + ",";
            });

            var selectedstartdate = new Date(dynclistMilestoneNewStartDate);

            for (var crw = 0; crw < CustomRecWeekly.length; crw++) {
                if (selectedstartdate.getDay() == CustomRecWeekly[crw]) {
                    recst = new Date(dynclistMilestoneNewStartDate);
                    newTestDateNew2 = new Date(dynclistMilestoneNewStartDate);
                    sta = true;
                    break;
                }
            }
            if (!sta) {

                var newTestDate = new Date(dynclistMilestoneNewStartDate);
                var newdate = new Date(dynclistMilestoneNewStartDate);
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

            reced = new Date(listMilestoneNewEndDate);

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

                milestoneoccur = OCount;
            }
            else {
                milestoneoccur = 0;
            }

            if (milestoneoccur > 54) {
                dynamicOccCount = 54;
                $("#lblerrorreclimitMilestone").css('display', '');
                $("#lblerrorreclimitMilestoneNotZero").css('display', 'none');
            }
            else {
                dynamicOccCount = milestoneoccur;
                $("#lblerrorreclimitMilestone").css('display', 'none');
                $("#rdMilestoneNewEndOccurence").attr('disabled', false);
                $('#rdMilestoneNewEndOccurence').prop("checked", true);
                if (milestoneoccur == 0)
                    $("#lblerrorreclimitMilestoneNotZero").css('display', '');
                else
                    $("#lblerrorreclimitMilestoneNotZero").css('display', 'none');
            }
        }
        else if ($("#ddlMilestoneOccurencess option:selected").val() == "Monthly") {
            var newstartrecdate = new Date(dynclistMilestoneNewStartDate);
            var selectedstartdateNewCustom = new Date(dynclistMilestoneNewStartDate);
            recst = selectedstartdateNewCustom;
            reced = new Date(listMilestoneNewEndDate);


            var occnew = 0;

            if (reced >= newstartrecdate) {
                while (reced >= newstartrecdate) {
                    newstartrecdate.setMonth(newstartrecdate.getMonth() + (1 * parseInt($("#ddlMilestoneRepeatMonthly option:selected").val())));
                    occnew = parseInt(occnew) + parseInt(1);
                }
                milestoneoccur = occnew;
            }
            else {
                milestoneoccur = 0;
            }

            if (milestoneoccur > 54) {
                dynamicOccCount = 54;
                $("#lblerrorreclimitMilestone").css('display', '');
                $("#lblerrorreclimitMilestoneNotZero").css('display', 'none');
            }
            else {
                dynamicOccCount = milestoneoccur;
                $("#lblerrorreclimitMilestone").css('display', 'none');
                if (milestoneoccur == 0)
                    $("#lblerrorreclimitMilestoneNotZero").css('display', '');
                else
                    $("#lblerrorreclimitMilestoneNotZero").css('display', 'none');
            }


            milestoneRecurCusString = recst.getDate();
            //String need to be Added for Custom


        }
        else {
            var newstartrecdate = new Date(dynclistMilestoneNewStartDate);
            var selectedstartdateNewCustom = new Date(dynclistMilestoneNewStartDate);
            recst = selectedstartdateNewCustom;
            reced = new Date(listMilestoneNewEndDate);


            var occnew = 0;

            if (reced >= newstartrecdate) {

                while (reced >= newstartrecdate) {
                    newstartrecdate.setFullYear(newstartrecdate.getFullYear() + (1 * parseInt(1)));
                    occnew = parseInt(occnew) + parseInt(1);
                }
                milestoneoccur = occnew;


            }
            else {
                milestoneoccur = 0;
            }

            if (milestoneoccur > 54) {
                dynamicOccCount = 54;
                $("#lblerrorreclimitMilestone").css('display', '');
                $("#lblerrorreclimitMilestoneNotZero").css('display', 'none');
            }
            else {
                dynamicOccCount = milestoneoccur;
                $("#lblerrorreclimitMilestone").css('display', 'none');
                if (milestoneoccur == 0)
                    $("#lblerrorreclimitMilestoneNotZero").css('display', '');
                else
                    $("#lblerrorreclimitMilestoneNotZero").css('display', 'none');


            }

            milestoneRecurCusString = recst.getFullYear();

        }
    }
    else {
        dynamicOccCount = 54;
        $("#lblerrorreclimitMilestone").css('display', '');
        $("#lblerrorreclimitMilestoneNotZero").css('display', 'none');
    }
    if ($("#txtMilestoneOccurrenceCount").val() == '') {
        if (parseInt(dynamicOccCount) > 12) {
            $("#txtMilestoneOccurrenceCount").val('12');
        }
        else {
            $("#txtMilestoneOccurrenceCount").val(dynamicOccCount);
        }
    }

}




function getOcurrenceValuesForMilestone(recurence, occurences, startDateNew, recurenceCustomString, strmonthly) {

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/ocurrencedates?ocurrence=' + recurence + '&iOcurrence=' + occurences + '&dtstart=' + startDateNew + '&ocurrencestring=' + recurenceCustomString + '&strmonthly=' + strmonthly,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        async: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (folder) {

            listMilestoneNewData = folder;
            var Startdate = new Date(folder.StartDate);
            var Enddate = new Date(folder.LastDate);
            var SMonth = Startdate.getMonth() + 1;
            var EMonth = Enddate.getMonth() + 1;
            var Ocurrs = folder.Values != null ? folder.Values.length : 1;
            milestoneoccur = Ocurrs;
            milestoneRecur = recurence;
            milestoneRecurCusString = recurenceCustomString;
            var dtStartdate = "";

            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
            { dtStartdate = moment(new Date(folder.StartDate)).format('MM/DD/YYYY'); }
            else { dtStartdate = moment(new Date(folder.StartDate)).format(localStorage.AppDateFormat); }

            var dtEnddate = "";

            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
            { dtEnddate = moment(new Date(folder.LastDate)).format('MM/DD/YYYY'); }
            else { dtEnddate = moment(new Date(folder.LastDate)).format(localStorage.AppDateFormat); }
            $('#MilestoneOcurrenceSummary').text("(" + dtStartdate + " to " + dtEnddate + ", " + Ocurrs + " instances)")

        },
        error:
            function (data) {
                isExist = false;
            }
    });
}

function GetMilestoneDataFinal(customstring) {
    var fMilestoneDateNew = '';
    if ($("#dtMilestoneDateNew").val() != "" && $("#dtMilestoneDateNew").val() != null) {
        fMilestoneDateNew = $.datepicker.formatDate('mm/dd/yy', $("#dtMilestoneDateNew").datepicker('getDate'))

    }
    var startDateNew = new Date();
    var recst = new Date();
    var reced = new Date();
    var customstringnew = "";
    listMilestoneNewStartDate = fMilestoneDateNew;

    if ($('input[name=SelectMilestoneOccurenceEndDate]:checked').val() == 'TillEnd') {

        if (listMilestoneNewEndDate != "Not Available") {
            if ($("#ddlMilestoneOccurencess option:selected").val() == "Weekly") {
                var newTestDateNew2 = new Date();
                milestoneRecur = "Weekly";
                var sta = false;
                var OCount = 1;
                var Cus = "";
                var CustomRecWeekly = [];
                $("input:checkbox[name=chkMilestoneRecurWeekly]:checked").each(function () {
                    CustomRecWeekly.push(this.value);
                    Cus += (this.value) + ",";
                });

                var selectedstartdate = new Date(listMilestoneNewStartDate);

                for (var crw = 0; crw < CustomRecWeekly.length; crw++) {
                    if (selectedstartdate.getDay() == CustomRecWeekly[crw]) {
                        recst = new Date(listMilestoneNewStartDate);
                        newTestDateNew2 = new Date(listMilestoneNewStartDate);
                        sta = true;
                        break;
                    }
                }
                if (!sta) {

                    var newTestDate = new Date(listMilestoneNewStartDate);
                    var newdate = new Date(listMilestoneNewStartDate);
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

                reced = new Date(listMilestoneNewEndDate);


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

                    milestoneoccur = OCount;
                }
                else {
                    milestoneoccur = 0;
                }
                Cus = removeLastChar(Cus, ',');

                if (milestoneoccur > 54) {
                    milestoneoccur = $('#txtMilestoneOccurrenceCount').val();
                    $("#rdMilestoneNewEndOccurence").attr('disabled', true);
                    $('#rdMilestoneNewEndOccurence').removeAttr('checked');
                    $("#rdMilestoneNewEndOccurenceUser").prop("checked", true);
                    if (contractItem.EndDate != "" && contractItem.EndDate != null && contractItem.EndDate != "null") {
                        userFlag = true;
                    } else {
                        userFlag = false;
                    }
                }


                milestoneRecurCusString = Cus;
                //String need to be Added for Custom

            }
            else if ($("#ddlMilestoneOccurencess option:selected").val() == "Monthly") {
                var newstartrecdate = new Date(listMilestoneNewStartDate);
                milestoneRecur = "Monthly";
                var selectedstartdateNewCustom = new Date(listMilestoneNewStartDate);
                recst = selectedstartdateNewCustom;
                reced = new Date(listMilestoneNewEndDate);


                var occnew = 0;

                if (reced >= newstartrecdate) {
                    while (reced >= newstartrecdate) {
                        newstartrecdate.setMonth(newstartrecdate.getMonth() + (1 * parseInt($("#ddlMilestoneRepeatMonthly option:selected").val())));
                        occnew = parseInt(occnew) + parseInt(1);
                    }

                    milestoneoccur = occnew;
                }
                else {
                    milestoneoccur = 0;
                }

                if (milestoneoccur > 54) {
                    milestoneoccur = $('#txtMilestoneOccurrenceCount').val();
                    $("#rdMilestoneNewEndOccurence").attr('disabled', true);
                    $('#rdMilestoneNewEndOccurence').removeAttr('checked');
                    $("#rdMilestoneNewEndOccurenceUser").prop("checked", true);
                    if (contractItem.EndDate != "" && contractItem.EndDate != null && contractItem.EndDate != "null") {
                        userFlag = true;
                    } else {
                        userFlag = false;
                    }
                }


                milestoneRecurCusString = recst.getDate();
                //String need to be Added for Custom


            }
            else {
                var newstartrecdate = new Date(listMilestoneNewStartDate);
                milestoneRecur = "Yearly";
                var selectedstartdateNewCustom = new Date(listMilestoneNewStartDate);
                recst = selectedstartdateNewCustom;
                reced = new Date(listMilestoneNewEndDate);


                var occnew = 0;

                if (reced >= newstartrecdate) {

                    while (reced >= newstartrecdate) {
                        newstartrecdate.setFullYear(newstartrecdate.getFullYear() + (1 * parseInt(1)));
                        occnew = parseInt(occnew) + parseInt(1);
                    }
                    milestoneoccur = occnew;


                }
                else {
                    milestoneoccur = 0;
                }

                if (milestoneoccur > 54) {
                    milestoneoccur = $('#txtMilestoneOccurrenceCount').val();
                    $("#rdMilestoneNewEndOccurence").attr('disabled', true);
                    $('#rdMilestoneNewEndOccurence').removeAttr('checked');
                    $("#rdMilestoneNewEndOccurenceUser").prop("checked", true);
                    if (contractItem.EndDate != "" && contractItem.EndDate != null && contractItem.EndDate != "null") {
                        userFlag = true;
                    } else {
                        userFlag = false;
                    }
                }

                milestoneRecurCusString = recst.getFullYear();

            }
            startDateNew = new Date(Number(recst.getFullYear()), Number(recst.getMonth()), Number(recst.getDate()), Number(00), Number(00), Number(00), Number(00));
            startDateNew = formatDate(startDateNew);






        }
        else {
            occurences = $("#txtMilestoneOccurrenceCount").val();
            milestoneRecur = $("#ddlMilestoneOccurencess").val();
            milestoneRecurCusString = "";

            if (customstring != "") {
                milestoneRecurCusString = customstring;
            }
            else {
                $("input:checkbox[name=chkMilestoneRecurWeekly]:checked").each(function () {
                    milestoneRecurCusString += (this.value) + ",";
                });
                milestoneRecurCusString = removeLastChar(milestoneRecurCusString, ',');
            }

            startDateNew = formatDate(listMilestoneNewStartDate);

        }


        if ($("#ddlMilestoneOccurencess option:selected").val() == "Monthly") {
            customstringnew = $("#ddlMilestoneRepeatMonthly option:selected").val();
        }

        if (milestoneoccur > 0) {
            getOcurrenceValuesForMilestone(milestoneRecur, milestoneoccur, startDateNew, milestoneRecurCusString, customstringnew)

        }
        else {

            swal("", "contract is expired by selected date.");
            if($('input[name=SelectMilestoneOccurenceEndDate]:checked').val() == 'TillEnd')
            {
                $('input[type="radio"][name="SelectMilestoneOccurenceEndDate"][value="Custom"]').prop('checked', true).trigger("change");
                MilestoneNewEndOccurenceUser();
                $("#txtMilestoneOccurrenceCount").trigger("focusout");
                dynamicOccCount = 12;
            }

        }


    }
    else {

        occurences = $("#txtMilestoneOccurrenceCount").val();
        milestoneRecur = $("#ddlMilestoneOccurencess").val();
        milestoneRecurCusString = "";

        if (customstring != "") {
            milestoneRecurCusString = customstring;
        }
        else {
            $("input:checkbox[name=chkMilestoneRecurWeekly]:checked").each(function () {
                milestoneRecurCusString += (this.value) + ",";
            });
            milestoneRecurCusString = removeLastChar(milestoneRecurCusString, ',');
        }

        startDateNew = formatDate(listMilestoneNewStartDate);
        if ($("#ddlMilestoneOccurencess option:selected").val() == "Monthly") {
            customstringnew = $("#ddlMilestoneRepeatMonthly option:selected").val();
        }
        if (parseInt(occurences) == 0 || occurences == "" || occurences == null) {
            occurences = 1;
        }

        getOcurrenceValuesForMilestone(milestoneRecur, occurences, startDateNew, milestoneRecurCusString, customstringnew);

    }








}



//Newly Added Milestone Methods Start



$("input:radio[name=SelectMilestoneOccurenceEndDate]").change(function () {
    var fMilestoneDateNew = '';
    if ($("#dtMilestoneDateNew").val() != "" && $("#dtMilestoneDateNew").val() != null) {
        fMilestoneDateNew = $.datepicker.formatDate('mm/dd/yy', $("#dtMilestoneDateNew").datepicker('getDate'))

    }
    var recurenceCustomString = "";
    var Cus = "";
    var date = new Date(fMilestoneDateNew);
    var ocurrTxtnew = $("#ddlMilestoneOccurencess").val();
    if (ocurrTxtnew == "Monthly") {
        Cus = date.getDay();

    }
    else if (ocurrTxtnew == "Yearly") {
        Cus = date.getFullYear();

    }
    else {
        $("input:checkbox[name=chkMilestoneRecurWeekly]:checked").each(function () {
            Cus += (this.value) + ",";
        });
        Cus = removeLastChar(Cus, ',');
    }



    if ($('input[name=SelectMilestoneOccurenceEndDate]:checked').val() == 'TillEnd') {

        GetMilestoneDataFinal(Cus);

    } else {

        if (parseInt($("#txtMilestoneOccurrenceCount").val()) == 0 || $("#txtMilestoneOccurrenceCount").val() == "" || $("#txtMilestoneOccurrenceCount").val() == null) {
            $("#txtMilestoneOccurrenceCount").val('1');
        }
        userFlag = false;
        var recurenceCustomString = "";

        if (Cus != "") {
            recurenceCustomString = Cus;
        }
        else {
            $("input:checkbox[name=chkMilestoneRecurWeekly]:checked").each(function () {
                recurenceCustomString += (this.value) + ",";
            });
            recurenceCustomString = removeLastChar(recurenceCustomString, ',');
        }

        var cusRecMonthstring = "";
        if ($("#ddlMilestoneOccurencess").val() == "Monthly") {
            cusRecMonthstring = $("#ddlMilestoneRepeatMonthly option:selected").val();
        }


        getOcurrenceValuesForMilestone($("#ddlMilestoneOccurencess").val(), $("#txtMilestoneOccurrenceCount").val(), listMilestoneNewStartDate, recurenceCustomString, cusRecMonthstring);
    }
});

//Event Of Text Box count Change Event

$("#txtMilestoneOccurrenceCount").focusout(function () {
    var fMilestoneDateNew = '';
    if ($("#dtMilestoneDateNew").val() != "" && $("#dtMilestoneDateNew").val() != null) {
        fMilestoneDateNew = $.datepicker.formatDate('mm/dd/yy', $("#dtMilestoneDateNew").datepicker('getDate'))

    }
    if ($("#txtMilestoneOccurrenceCount").val() != "" && $('input[name=SelectMilestoneOccurenceEndDate]:checked').val() == 'Custom') {

        if (parseInt($("#txtMilestoneOccurrenceCount").val()) == 0) {
            $('#lblerrorreclimitMilestoneNotZero').css('display', '');
            $('#lblerrorreclimitMilestone').css('display', 'none');
        }
        else {
            $('#lblerrorreclimitMilestoneNotZero').css('display', 'none');
            if (parseInt($("#txtMilestoneOccurrenceCount").val()) > 54) {
                $('#lblerrorreclimitMilestone').css('display', '');
            }
            else {
                //$('#lblerrorreclimitMilestone').css('display', 'none');
                var date = new Date(fMilestoneDateNew);

                var recurenceCustomString = "";
                var Cus = "";
                var cusRecMon = "";
                var ocurrTxtnew = $("#ddlMilestoneOccurencess").val();
                if (ocurrTxtnew == "Monthly") {
                    Cus = date.getDay();
                    cusRecMon = $("#ddlMilestoneRepeatMonthly option:selected").val();
                }
                else if (ocurrTxtnew == "Yearly") {
                    Cus = date.getFullYear();

                }
                else {
                    $("input:checkbox[name=chkMilestoneRecurWeekly]:checked").each(function () {
                        Cus += (this.value) + ",";
                    });
                    Cus = removeLastChar(Cus, ',');
                }
                milestoneoccur = $("#txtMilestoneOccurrenceCount").val();
                milestoneRecur = $("#ddlMilestoneOccurencess").val();
                milestoneRecurCusString = "";

                if (Cus != "") {
                    milestoneRecurCusString = Cus;
                }
                else {
                    $("input:checkbox[name=chkMilestoneRecurWeekly]:checked").each(function () {
                        milestoneRecurCusString += (this.value) + ",";
                    });
                    milestoneRecurCusString = removeLastChar(milestoneRecurCusString, ',');
                }
                getOcurrenceValuesForMilestone(milestoneRecur, milestoneoccur, listMilestoneNewStartDate, milestoneRecurCusString, cusRecMon);


            }

        }
    }

});





$("#dtMilestoneDateNew").focusout(function () {

    if ($("#dtMilestoneDateNew").val() != "") {

    }
    else {
        document.getElementById("ddlMilestoneOccurencess").disabled = true;
        $("#ddlMilestoneOccurencess").val("None");
        $('#dtMilestoneNewOccurrenceDueDate').val("");
        $('#divMilestoneOcurrenceMonthly').css('display', 'none');
        $('#divMilestoneOcurrenceWeekly').css('display', 'none');
        $('#divMilestoneOcurrenceSummary').css('display', 'none');

        $('#dvMilestoneOcurrenceEnd').css('display', 'none');
        $("#ddlMilestoneRepeatMonthly").val("1");
    }

});



//Weekly Change Event Of Check Box

$("input:checkbox[name=chkMilestoneRecurWeekly]").change(function () {
    GetMilestonedynamicRecurrenceCount();
    milestoneRecurCusString = "";
    var Cus = "";
    var cusRecMon = "";
    var ocurrTxtnew = $("#ddlMilestoneOccurencess").val();
    if (ocurrTxtnew == "Monthly") {
        Cus = date.getDay();
        cusRecMon = $("#ddlMilestoneRepeatMonthly option:selected").val();
    }
    else if (ocurrTxtnew == "Yearly") {
        Cus = date.getFullYear();

    }
    else {
        $("input:checkbox[name=chkMilestoneRecurWeekly]:checked").each(function () {
            Cus += (this.value) + ",";
        });
        Cus = removeLastChar(Cus, ',');
    }



    if ($('input[name=SelectMilestoneOccurenceEndDate]:checked').val() == 'TillEnd') {



        GetMilestoneDataFinal(Cus);

    } else {

        milestoneRecurCusString = "";

        if (Cus != "") {
            milestoneRecurCusString = Cus;
        }
        else {
            $("input:checkbox[name=chkRecurrenceCustom]:checked").each(function () {
                milestoneRecurCusString += (this.value) + ",";
            });
            milestoneRecurCusString = removeLastChar(milestoneRecurCusString, ',');
        }
        if (parseInt($("#txtMilestoneOccurrenceCount").val()) == 0 || $("#txtMilestoneOccurrenceCount").val() == "" || $("#txtMilestoneOccurrenceCount").val() == null) {
            $("#txtMilestoneOccurrenceCount").val('1');
        }

        getOcurrenceValuesForMilestone($("#ddlMilestoneOccurencess").val(), $("#txtMilestoneOccurrenceCount").val(), listMilestoneNewStartDate, milestoneRecurCusString, cusRecMon);
    }
});


$("#ddlMilestoneRepeatMonthly").change(function (obj) {
    GetMilestonedynamicRecurrenceCount();
    var fMilestoneDateNew = '';
    if ($("#dtMilestoneDateNew").val() != "" && $("#dtMilestoneDateNew").val() != null) {
        fMilestoneDateNew = $.datepicker.formatDate('mm/dd/yy', $("#dtMilestoneDateNew").datepicker('getDate'))

    }
    var Cus = "";
    var customstring = "";
    var date = new Date(fMilestoneDateNew);
    if ($("#ddlMilestoneOccurencess").val() == "Monthly") {
        Cus = date.getDay();
        var abc = new Date(fMilestoneDateNew)

        $('#dtMilestoneNewOccurrenceDueDate').val(abc.getDate());
        $('#divMilestoneOcurrenceMonthly').css('display', '');
        $('#divMilestoneOcurrenceWeekly').css('display', 'none');

        $('#lblMilestoneOcurrenceMonth').css('display', '');
        $('#lblMilestoneOcurrenceYear').css('display', 'none');




        $('#divMilestoneOcurrenceSummary').css('display', '');
        customstring = $("#ddlMilestoneRepeatMonthly").val();
        $('#dvMilestoneOcurrenceEnd').css('display', '');


    }
    else if ($("#ddlMilestoneOccurencess").val() == "Yearly") {
        var abc = new Date(fMilestoneDateNew)
        $('#dtMilestoneNewOccurrenceDueDate').val(abc.getDate());
        $('#dtMilestoneOcurrMonthforYear').val(monthNames[abc.getMonth()]);
        $('#dtMilestoneOcurrDateforYear').val(abc.getDate());
        $('#divMilestoneOcurrenceMonthly').css('display', '');
        $('#divMilestoneOcurrenceWeekly').css('display', 'none');
        $('#divMilestoneOcurrenceSummary').css('display', '');
        customstring = $("#ddlMilestoneRepeatMonthly").val();
        $('#dvMilestoneOcurrenceEnd').css('display', '');
        $('#lblMilestoneOcurrenceMonth').css('display', 'none');
        $('#lblMilestoneOcurrenceYear').css('display', '');
    }
    if ($('input[name=SelectMilestoneOccurenceEndDate]:checked').val() == 'TillEnd') {

        GetMilestoneDataFinal(Cus);
    }
    else {
        if (parseInt($("#txtMilestoneOccurrenceCount").val()) == 0 || $("#txtMilestoneOccurrenceCount").val() == "" || $("#txtMilestoneOccurrenceCount").val() == null) {
            $("#txtMilestoneOccurrenceCount").val('1');
        }

        getOcurrenceValuesForMilestone($("#ddlMilestoneOccurencess").val(), $("#txtMilestoneOccurrenceCount").val(), listMilestoneNewStartDate, Cus, customstring);

    }

});





$("#ddlMilestoneTypeNew").change(function (obj) {

    if ($("#ddlMilestoneTypeNew").val() != "0") {
        var string1 = $("#ddlMilestoneTypeNew").val();
        var string2 = string1 + " for " + $("#lblContractTitle").text();

        if ($('#txtMilestoneTitleNew').val() == null || $('#txtMilestoneTitleNew').val() == "") {
            $('#txtMilestoneTitleNew').val(string2)
        }
        else {

            var update = false;
            var oldString = "";
            $("#ddlMilestoneTypeNew option").each(function () {
                if ($(this).val() != 0) {
                    var value = $(this).val() + " for";

                    if ($('#txtMilestoneTitleNew').val().indexOf(value) > -1) {
                        oldString = $(this).val();
                        update = true;
                    }

                }
            });

            if (update) {
                string2 = string1 + " " + $('#txtMilestoneTitleNew').val().substring(($('#txtMilestoneTitleNew').val().indexOf(" for ")) + 1);

                $('#txtMilestoneTitleNew').val(string2)
            }

        }

    }
    else {
        if ($('#txtMilestoneTitleNew').val() == null || $('#txtMilestoneTitleNew').val() == "") {
            $('#txtMilestoneTitleNew').val("")
        }

    }
});



var vMilestoneEditStatus = "";

$('#amilestoneRecNoneEdit').click(function () {
    vMilestoneEditStatus = "CHANGERECURRENCE";
    $("#liMilestoneRecurrence").css('display', '');
    $("#divMilestoneOcurrenceSummary").css('display', 'none');
    document.getElementById("ddlMilestoneOccurencess").disabled = false;
    document.getElementById("dtMilestoneDateNew").disabled = false;

    $("#amilestoneRecNoneEdit").css('display', 'none');
    $("#amilestoneRecEdit").css('display', 'none');
    //manoj
    if (userFlag) {
        if (userFlagCustom) {
            $("#rdMilestoneNewEndOccurence").removeAttr('disabled');
            $("#rdMilestoneNewEndOccurenceUser").prop("checked", true);
            $('#rdMilestoneNewEndOccurence').removeAttr('checked');
            $("#rdMilestoneNewEndOccurenceUser").removeAttr('disabled');
        }
        else {
            $("#rdMilestoneNewEndOccurence").removeAttr('disabled');
            $("#rdMilestoneNewEndOccurence").prop("checked", true);
            $('#rdMilestoneNewEndOccurenceUser').removeAttr('checked');
            $("#rdMilestoneNewEndOccurenceUser").removeAttr('disabled');
        }
    } else {
        $("#rdMilestoneNewEndOccurenceUser").removeAttr('disabled');
    }
    //manoj
    //$('input[type="radio"][name=SelectMilestoneOccurenceEndDate]').removeAttr('disabled');

});

$('#amilestoneRecEdit').click(function () {
    vMilestoneEditStatus = "EDITRECURRENCE";

    if ($("#ddlMilestoneOccurencess").val() == "None") {

        $("#liMilestoneRecurrence").css('display', '');
        $("#divMilestoneOcurrenceSummary").css('display', 'none');
        document.getElementById("ddlMilestoneOccurencess").disabled = false;

    }
    else if ($("#ddlMilestoneOccurencess").val() == "Weekly") {
        $("#divMilestoneOcurrenceWeekly").css('display', '');
        $("#divMilestoneOcurrenceMonthly").css('display', 'none');
        $("#ddlMilestoneRepeatMonthly").css('display', 'none');

        $("#lblMilestoneOcurrenceMonth").css('display', 'none');
        $("#lblMilestoneOcurrenceYear").css('display', 'none');

        $("#divMilestoneOcurrenceSummary").css('display', '');
        $("#milestoneEditOcursumary").css('display', 'none');
        document.getElementById("ddlMilestoneOccurencess").disabled = false;
        document.getElementById("dtMilestoneDateNew").disabled = false;
        $("#dvMilestoneOcurrenceEnd").css('display', '');
        $("#liMilestoneRecurrence").css('display', '');
    }
    else if ($("#ddlMilestoneOccurencess").val() == "Monthly") {
        $("#divMilestoneOcurrenceWeekly").css('display', 'none');
        $("#divMilestoneOcurrenceMonthly").css('display', '');
        $("#ddlMilestoneRepeatMonthly").css('display', '');

        $("#lblMilestoneOcurrenceMonth").css('display', '');
        $("#lblMilestoneOcurrenceYear").css('display', 'none');

        $("#divMilestoneOcurrenceSummary").css('display', '');
        $("#milestoneEditOcursumary").css('display', 'none');
        document.getElementById("ddlMilestoneOccurencess").disabled = false;
        document.getElementById("dtMilestoneDateNew").disabled = false;
        $("#dvMilestoneOcurrenceEnd").css('display', '');
        $("#liMilestoneRecurrence").css('display', '');
    }
    else {
        $("#divMilestoneOcurrenceWeekly").css('display', 'none');
        $("#divMilestoneOcurrenceMonthly").css('display', '');
        $("#ddlMilestoneRepeatMonthly").css('display', 'none');

        $("#lblMilestoneOcurrenceMonth").css('display', 'none');
        $("#lblMilestoneOcurrenceYear").css('display', '');

        $("#divMilestoneOcurrenceSummary").css('display', '');
        $("#milestoneEditOcursumary").css('display', 'none');
        document.getElementById("ddlMilestoneOccurencess").disabled = false;
        document.getElementById("dtMilestoneDateNew").disabled = false;


        $("#dvMilestoneOcurrenceEnd").css('display', '');
        $("#liMilestoneRecurrence").css('display', '');
    }

    //document.getElementById("rdMilestoneNewEndOccurenceUser").disabled = false;
    //manoj
    if (userFlag) {
        if (userFlagCustom) {
            $("#rdMilestoneNewEndOccurence").removeAttr('disabled');
            $("#rdMilestoneNewEndOccurenceUser").prop("checked", true);
            $('#rdMilestoneNewEndOccurence').removeAttr('checked');
            $("#rdMilestoneNewEndOccurenceUser").removeAttr('disabled');
        }
        else {
            $("#rdMilestoneNewEndOccurence").removeAttr('disabled');
            $("#rdMilestoneNewEndOccurence").prop("checked", true);
            $('#rdMilestoneNewEndOccurenceUser').removeAttr('checked');
            $("#rdMilestoneNewEndOccurenceUser").removeAttr('disabled');
        }
    } else {
        $("#rdMilestoneNewEndOccurenceUser").removeAttr('disabled');
    }
    //manoj
    //$('input[type="radio"][name=SelectMilestoneOccurenceEndDate]').removeAttr('disabled');


    $("#amilestoneRecNoneEdit").css('display', 'none');
    $("#amilestoneRecEdit").css('display', 'none');

    milestoneEditBackupData();
});






//Newly Added Milestone Methods End



function clearMilestoneFormDataNew() {
    $("#amilestoneRecNoneEdit").css('display', 'none');
    $("#amilestoneRecEdit").css('display', 'none');
    $("#txtMilestoneNewText").val("");
    $("#txtMilestoneIDNew").val("");
    $("#txtMilestoneTitleNew").val("");
    $('#ddlMilestoneTypeNew').val("0");
    $("#dtMilestoneDateNew").val("");
    $("#ddlMilestoneNewPriority").val("Medium");
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "11" && n.Status == "ON");
    });
    if (projMgrs != "" && vAccFeat.length > 0) {
        GetValuesAndAutoPopulate("ddlSendReminderToNew", "{Project Managers}");
    } else {
        GetValuesAndAutoPopulate("ddlSendReminderToNew", "");
    }

    $("#txtReminder1MilestoneNew").val("");
    $("#txtReminder2MilestoneNew").val("");
    $("#txtReminder3MilestoneNew").val("");
    $("#ddlReminder1MilestoneNew").val("before");
    $("#ddlReminder2MilestoneNew").val("before");
    $("#ddlReminder3MilestoneNew").val("before");
    $("#hdnCustomDateFieldName").text('');
    $("#lblCTitleNew").text($("#lblContractTitle").text());
    $(".validelement").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });
    GetValuesAndAutoPopulate("ddlMilestoneOwnerNew", $("#licontractmanagers").text() + ';' + projMgrs);

    GetValuesAndAutoPopulate("ddlSendReminderToNew", $("#licontractmanagers").text() + ';' + projMgrs);

    $("#ddlMilestoneNewStatus").removeClass("error");

    $('#ddlMilestoneNewStatus').val('Upcoming');

    $('#ddlMilestoneOccurencess').val('None');

    $("#dtMilestoneNewCompletedDate").val("");

    $("input:checkbox[name=chkMilestoneRecurWeekly]").each(function () {
        var Id = this.id;
        $("#" + Id).css('outline', '');
    });

}

function AddMilestoneMoreNew() {
    clearMilestoneFormDataNew();
    listMilestoneNewData = "";
    $("#txtMilestoneIDNew").val("");
    $("#txtMilestoneTitleNew").val("");
    $('#ddlMilestoneTypeNew').val("0");
    $("#dtMilestoneDateNew").val("");
    $("#ddlMilestoneNewPriority").val("Medium");
    //manoj
    $("#txtMileDescriptionNew").val('');
    $('input[type="radio"][name="ShowInCalendarNew"][value="Yes"]').prop('checked', true);
    //manoj
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "11" && n.Status == "ON");
    });
    if (projMgrs != "" && vAccFeat.length > 0) {
        GetValuesAndAutoPopulate("ddlSendReminderToNew", "{Project Managers}");
    } else {
        GetValuesAndAutoPopulate("ddlSendReminderToNew", "");
    }
    $("#milestonenewheading").text("New Milestone");
    $('input[type="radio"][name="MilestoneNewAutoComplete"][value="Yes"]').prop('checked', true);
    $("#dtMilestoneNewCompletedDate").val("");
    $("#amilestoneCRecurrence").css('display', 'none');
    $("#amilestoneESeries").css('display', 'none');
    $("#amilestoneERecurrence").css('display', 'none');
    $("#ulMilestoneNewCompletedDate").css('display', 'none');

    $("#liMilestoneRecurrence").css('display', '');

    var strEndDate = "";
    $('#txtMilestoneOccurrenceCount').val("12");

    if (contractItem.EndDate != "" && contractItem.EndDate != null && contractItem.EndDate != "null") {

        strEndDate = new Date(contractItem.EndDate);
        listMilestoneNewEndDate = strEndDate;
        $('#MilestoneNewOcurrenceEndDate').text("");
        var MNewEndDate = "";
        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
            if (getTimeZone().indexOf('+') > -1)
                MNewEndDate = moment(new Date(listMilestoneNewEndDate)).format('MM/DD/YYYY');
            else if (getTimeZone().indexOf('+00:00') > -1 || getTimeZone().indexOf('-') > -1)
                MNewEndDate = moment(new Date(listMilestoneNewEndDate)).utc().format('MM/DD/YYYY');
        }
        else {
            if (getTimeZone().indexOf('+') > -1)
                MNewEndDate = moment(new Date(listMilestoneNewEndDate)).format(localStorage.AppDateFormat);
            else if (getTimeZone().indexOf('+00:00') > -1 || getTimeZone().indexOf('-') > -1)
                MNewEndDate = moment(new Date(listMilestoneNewEndDate)).utc().format(localStorage.AppDateFormat);
        }

        //if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
        //{ MNewEndDate = moment(new Date(listMilestoneNewEndDate)).utc().format('MM/DD/YYYY'); }
        //else { MNewEndDate = moment(new Date(listMilestoneNewEndDate)).utc().format(localStorage.AppDateFormat); }

        $('#MilestoneNewOcurrenceEndDate').text(" (" + MNewEndDate + ")");
        $("#rdMilestoneNewEndOccurence").prop("checked", true);
    }
    else {
        listMilestoneNewEndDate = "Not Available";
        $('#MilestoneNewOcurrenceEndDate').text("");
        $('#MilestoneNewOcurrenceEndDate').text(" (" + listMilestoneNewEndDate + ")");
        $("#rdMilestoneNewEndOccurence").attr('disabled', true);
        $('#rdMilestoneNewEndOccurence').removeAttr('checked');
        $("#rdMilestoneNewEndOccurenceUser").prop("checked", true);


    }
    $("#divMilestoneOcurrenceWeekly").css('display', 'none');
    $("#divMilestoneOcurrenceMonthly").css('display', 'none');

    $("#dvMilestoneOcurrenceEnd").css('display', 'none');
    $("#divMilestoneOcurrenceSummary").css('display', 'none');

    document.getElementById("ddlMilestoneOccurencess").disabled = true;
    document.getElementById("dtMilestoneDateNew").disabled = false;

    $("#amilestoneRecNoneEdit").css('display', 'none');
    $("#amilestoneRecEdit").css('display', 'none');
    //*Harshitha
    if (defaultGlobalSettings != null && defaultGlobalSettings != "") {
        var milestoneReminder = defaultGlobalSettings.MilestoneReminders;
        var xmlDoc = $.parseXML(milestoneReminder);
        var $xml = $(xmlDoc);
        var $reminder = $xml.find("reminder");
        var j = 1;
        $reminder.each(function () {
            var beforeSplit = $(this).text();
            var remSplit = beforeSplit.split(/ +/);
            $("#ddlReminder" + j + "MilestoneNew").val(remSplit[0]);
            $("#txtReminder" + j + "MilestoneNew").val(remSplit[1]);
            j = j + 1;
        });
    }

    $("#lblCTitleNew").text($("#lblContractTitle").text());
    $(".validelement").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });
    GetValuesAndAutoPopulate("ddlMilestoneOwnerNew", $("#licontractmanagers").text() + ';' + projMgrs);
    GetValuesAndAutoPopulate("ddlSendReminderToNew", $("#licontractmanagers").text() + ';' + projMgrs);
    $("#lblerrorreclimitMilestone").css('display', 'none');
    $("#lblerrorreclimitMilestoneNotZero").css('display', 'none');
    if (IsPipeline) {
        $("#AlertMile").val('No').change();
        $("#AlertObli").val('No').change();
        $("#reminderEnable").empty();
        $("#reminderEnable").append("Reminders <span style='color: red;margin-left: 20%'>To turn ON reminders for milestone notifications, click <a href='javascript:void(0);' id='enableSwitch' onclick='enableMilestoneSwitch()'>Enable</a></span>")

    }
    else {
        $("#AlertMile").val('Yes').change();
        $("#AlertObli").val('No').change();
        $("#reminderEnable").empty();
        $("#reminderEnable").append("Reminders");

    }
    $("#addEditMilestoneNew").dialog("option", "title", "");
    $("#addEditMilestoneNew").dialog("open");
    $("#addEditMilestoneNew").height("auto");

}

function ViewMilestineDetail(milestoneID) {
    $("#loadingPage").fadeIn();
    //$('#dvMilObgMetadata').html('<tr><td><img src="../Content/Images/icon/loading.gif"/></td></tr>');

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones?milestoneid=' + milestoneID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
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
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones/ownersfromgroup?contractid=' + milestoneentity.ContractID + '&milestoneonwers=' + milestoneentity.MilestoneOwner,
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
                //setBlankValueToHyphen("tblMetadataDetail");
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


function updateMilestonesRecurrenceNew(status) {
    var fMilestoneDateNew = '';
    if ($("#dtMilestoneDateNew").val() != "" && $("#dtMilestoneDateNew").val() != null) {
        fMilestoneDateNew = $.datepicker.formatDate('mm/dd/yy', $("#dtMilestoneDateNew").datepicker('getDate'));
    }
    var fMilestoneNewCompletedDate = '';
    if ($("#dtMilestoneNewCompletedDate").val() != "" && $("#dtMilestoneNewCompletedDate").val() != null) {
        fMilestoneNewCompletedDate = $.datepicker.formatDate('mm/dd/yy', $("#dtMilestoneNewCompletedDate").datepicker('getDate'));
    }
    if (status == "SINGLE") {
        $("#loadingPage").fadeIn();
        $('.ui-button-green-text').parent().attr('disabled', 'disabled');
        var isformvalid = false;
        if (requiredValidator('addNewMilestoneNew')) {
            $("#loadingPage").fadeIn();
            var strContractID = getParameterByName('ContractID');

            //do start and end date validation
            var cStartDate = "";
            var cEndDate = "";
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones?contractid=' + strContractID,
                type: 'GET',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                cache: false,
                async: false,
                success: function (data) {
                    $(data).each(function (i, item) {
                        if (item.MilestoneTitle == "Start Date") {
                            cStartDate = item.MilestoneDate;
                        } else if (item.MilestoneTitle == "End Date") {
                            cEndDate = item.MilestoneDate;
                        }
                    });
                }
            });
            var datevalidationexists = false;
            if ($("#txtMilestoneTitleNew").val() == "Start Date" && cEndDate != "") {
                if (!comparedatesmile(fMilestoneDateNew, cEndDate)) {
                    datevalidationexists = true;
                }
            } else if ($("#txtMilestoneTitleNew").val() == "End Date" && cStartDate != "") {
                if (!comparedatesmile(cStartDate, fMilestoneDateNew)) {
                    datevalidationexists = true;
                }
            }
            if (!datevalidationexists) {
                var start = moment(fMilestoneDateNew);
                var end = moment(new Date());
                var vv = start.diff(end, "days");
                var vRenminder = '';
                var swalFlag = false;
                var blUpdate = true;
                isformvalid = true;
                if (vv <= parseInt($("#txtReminder1New").val()) || vv <= parseInt($("#txtReminder2New").val()) || vv <= parseInt($("#txtReminder3New").val())) {
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
              var arrMilestoneOwner = $("#ddlMilestoneOwnerNew").val();
              var vMilestoneOwner = '';
              $(arrMilestoneOwner).each(function (i, item) {
                  if (vMilestoneOwner == '') {
                      vMilestoneOwner = item;
                  }
                  else {
                      vMilestoneOwner += "; " + item;
                  }
              });
              var SendReminderToArr = $("#ddlSendReminderToNew").val();
              var vSendReminderTo = '';
              $(SendReminderToArr).each(function (i, item) {
                  if (vSendReminderTo == '') {
                      vSendReminderTo = item;
                  }
                  else {
                      vSendReminderTo += "; " + item;
                  }
              });


              var MilestoneID = $("#txtMilestoneIDNew").val();
              var vMilestoneComplete = "No";
              var vCompleteddate = null;
              var vCompletedby = "";
              if ($("#ddlMilestoneNewStatus").find('option:selected').text() == "Complete") {
                  vMilestoneComplete = "Yes";
                  vCompleteddate = fMilestoneNewCompletedDate;
                  vCompletedby = localStorage.UserName;
              }

              var vMilestoneAutoComplete = $('input[type="radio"][name=MilestoneNewAutoComplete]:checked').val();

              if (MilestoneID != "") {
                  $("#inprocessObligation").css('visibility', 'visible');
                  $.ajax({
                      url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones/milestonenew/recurrenceedit?milestoneid=' + MilestoneID,
                      type: 'POST',
                      dataType: 'json',
                      headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                      data: {
                          RowKey: MilestoneID,
                          ContractID: strContractID,
                          ContractTitle: $("#lblCTitleNew").text(),
                          MilestoneTitle: $("#txtMilestoneTitleNew").val(),
                          MilestoneType: $("#ddlMilestoneTypeNew").find('option:selected').text(),
                          MilestoneDate: fMilestoneDateNew,
                          MilestoneDescription: $("#txtMileDescriptionNew").val(),
                          AutoComplete: vMilestoneAutoComplete,
                          MilestoneOwner: vMilestoneOwner,
                          Priority: $("#ddlMilestoneNewPriority").find('option:selected').text(),
                          MilestoneCompleted: vMilestoneComplete,
                          MilestoneCompletedDate: vCompleteddate,
                          MilestoneCompletedBy: vCompletedby,
                          ShowInCalendar: $('input[name=ShowInCalendarNew]:checked').val(),
                          ModifiedBy: localStorage.UserName,
                          SendReminderTo: vSendReminderTo,
                          Reminder1: $("#txtReminder1MilestoneNew").val(),
                          Reminder2: $("#txtReminder2MilestoneNew").val(),
                          Reminder3: $("#txtReminder3MilestoneNew").val(),
                          Reminder1Condition: encodeURIComponent($("#ddlReminder1MilestoneNew").find('option:selected').text()),
                          Reminder2Condition: encodeURIComponent($("#ddlReminder2MilestoneNew").find('option:selected').text()),
                          Reminder3Condition: encodeURIComponent($("#ddlReminder3MilestoneNew").find('option:selected').text()),
                          MilestoneStatus: encodeURIComponent($("#ddlMilestoneNewStatus").find('option:selected').text()),
                          AlertsEnabled: $("#AlertMile").val(),
                      },
                      cache: false,
                      success: function (person) {
                          $('.ui-button-green-text').parent().removeAttr('disabled');
                          $("#loadingPage").fadeOut();
                          $("#addEditMilestoneNew").dialog("close");

                          $("#milestonesRecurrenceEditPopup").dialog("close");
                          BindMilestone(vContractID);
                      },
                      complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
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

            }
            if (swalFlag) {
                if (blUpdate) {
                    var arrMilestoneOwner = $("#ddlMilestoneOwnerNew").val();
                    var vMilestoneOwner = '';
                    $(arrMilestoneOwner).each(function (i, item) {
                        if (vMilestoneOwner == '') {
                            vMilestoneOwner = item;
                        }
                        else {
                            vMilestoneOwner += "; " + item;
                        }
                    });
                    var SendReminderToArr = $("#ddlSendReminderToNew").val();
                    var vSendReminderTo = '';
                    $(SendReminderToArr).each(function (i, item) {
                        if (vSendReminderTo == '') {
                            vSendReminderTo = item;
                        }
                        else {
                            vSendReminderTo += "; " + item;
                        }
                    });


                    var MilestoneID = $("#txtMilestoneIDNew").val();
                    var vMilestoneComplete = "No";
                    var vCompleteddate = null;
                    var vCompletedby = "";
                    if ($("#ddlMilestoneNewStatus").find('option:selected').text() == "Complete") {
                        vMilestoneComplete = "Yes";
                        vCompleteddate = fMilestoneNewCompletedDate;
                        vCompletedby = localStorage.UserName;
                    }
                    var vMilestoneAutoComplete = $('input[type="radio"][name=MilestoneNewAutoComplete]:checked').val();


                    if (MilestoneID != "") {
                        $("#inprocessObligation").css('visibility', 'visible');
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones/milestonenew/recurrenceedit?milestoneid=' + MilestoneID,
                            type: 'POST',
                            dataType: 'json',
                            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                            data: {
                                RowKey: MilestoneID,
                                ContractID: strContractID,
                                ContractTitle: $("#lblCTitleNew").text(),
                                MilestoneTitle: $("#txtMilestoneTitleNew").val(),
                                MilestoneType: $("#ddlMilestoneTypeNew").find('option:selected').text(),
                                MilestoneDate: fMilestoneDateNew,
                                MilestoneDescription: $("#txtMileDescriptionNew").val(),
                                AutoComplete: vMilestoneAutoComplete,
                                MilestoneOwner: vMilestoneOwner,
                                Priority: $("#ddlMilestoneNewPriority").find('option:selected').text(),
                                MilestoneCompleted: vMilestoneComplete,
                                MilestoneCompletedDate: vCompleteddate,
                                MilestoneCompletedBy: vCompletedby,
                                ShowInCalendar: $('input[name=ShowInCalendarNew]:checked').val(),
                                ModifiedBy: localStorage.UserName,
                                SendReminderTo: vSendReminderTo,
                                Reminder1: $("#txtReminder1MilestoneNew").val(),
                                Reminder2: $("#txtReminder2MilestoneNew").val(),
                                Reminder3: $("#txtReminder3MilestoneNew").val(),
                                Reminder1Condition: encodeURIComponent($("#ddlReminder1MilestoneNew").find('option:selected').text()),
                                Reminder2Condition: encodeURIComponent($("#ddlReminder2MilestoneNew").find('option:selected').text()),
                                Reminder3Condition: encodeURIComponent($("#ddlReminder3MilestoneNew").find('option:selected').text()),
                                MilestoneStatus: encodeURIComponent($("#ddlMilestoneNewStatus").find('option:selected').text()),
                                AlertsEnabled: $("#AlertMile").val(),
                            },
                            cache: false,
                            success: function (person) {
                                $('.ui-button-green-text').parent().removeAttr('disabled');
                                $("#loadingPage").fadeOut();
                                $("#addEditMilestoneNew").dialog("close");

                                $("#milestonesRecurrenceEditPopup").dialog("close");
                                BindMilestone(vContractID);
                            },
                            complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                        });
                    }

                }
                else {
                    $('.ui-button-green-text').parent().removeAttr('disabled');
                }
            }
        }
    }
    else {


        $("#loadingPage").fadeIn();
        $('.ui-button-green-text').parent().attr('disabled', 'disabled');
        var isformvalid = false;
        if (requiredValidator('addNewMilestoneNew')) {
            $("#loadingPage").fadeIn();
            var strContractID = getParameterByName('ContractID');

            //do start and end date validation
            var cStartDate = "";
            var cEndDate = "";
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones?contractid=' + strContractID,
                type: 'GET',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                cache: false,
                async: false,
                success: function (data) {
                    $(data).each(function (i, item) {
                        if (item.MilestoneTitle == "Start Date") {
                            cStartDate = item.MilestoneDate;
                        } else if (item.MilestoneTitle == "End Date") {
                            cEndDate = item.MilestoneDate;
                        }
                    });
                }
            });
            var datevalidationexists = false;
            if ($("#txtMilestoneTitleNew").val() == "Start Date" && cEndDate != "") {
                if (!comparedatesmile(fMilestoneDateNew, cEndDate)) {
                    datevalidationexists = true;
                    swal("", "Start date should be less than the end date milestone.");
                }
            } else if ($("#txtMilestoneTitleNew").val() == "End Date" && cStartDate != "") {
                if (!comparedatesmile(cStartDate, fMilestoneDateNew)) {
                    datevalidationexists = true;
                    swal("", "End date should be greater than start date milestone.");
                }
            }
            if (!datevalidationexists) {
                var start = moment(fMilestoneDateNew);
                var end = moment(new Date());
                var vv = start.diff(end, "days");
                var vRenminder = '';
                var swalFlag = false;
                var blUpdate = true;
                isformvalid = true;
                if (vv <= parseInt($("#txtReminder1New").val()) || vv <= parseInt($("#txtReminder2New").val()) || vv <= parseInt($("#txtReminder3New").val())) {
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
              var arrMilestoneOwner = $("#ddlMilestoneOwnerNew").val();
              var vMilestoneOwner = '';
              $(arrMilestoneOwner).each(function (i, item) {
                  if (vMilestoneOwner == '') {
                      vMilestoneOwner = item;
                  }
                  else {
                      vMilestoneOwner += "; " + item;
                  }
              });
              var SendReminderToArr = $("#ddlSendReminderToNew").val();
              var vSendReminderTo = '';
              $(SendReminderToArr).each(function (i, item) {
                  if (vSendReminderTo == '') {
                      vSendReminderTo = item;
                  }
                  else {
                      vSendReminderTo += "; " + item;
                  }
              });


              var MilestoneID = $("#txtMilestoneIDNew").val();
              var vMilestoneComplete = "No";
              var vCompleteddate = null;
              var vCompletedby = "";
              if ($("#ddlMilestoneNewStatus").find('option:selected').text() == "Complete") {
                  vMilestoneComplete = "Yes";
                  vCompleteddate = fMilestoneNewCompletedDate;
                  vCompletedby = localStorage.UserName;
              }

              var vMilestoneAutoComplete = $('input[type="radio"][name=MilestoneNewAutoComplete]:checked').val();


              if (MilestoneID != "") {
                  $("#inprocessObligation").css('visibility', 'visible');
                  $.ajax({
                      url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones/milestonenew/updatemilestonebyText?strMilestoneText=' + $("#txtMilestoneNewText").val() + '&milestoneId=' + MilestoneID,
                      type: 'POST',
                      dataType: 'json',
                      headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                      data: {
                          RowKey: MilestoneID,
                          ContractID: strContractID,
                          ContractTitle: $("#lblCTitleNew").text(),
                          MilestoneTitle: $("#txtMilestoneTitleNew").val(),
                          MilestoneType: $("#ddlMilestoneTypeNew").find('option:selected').text(),
                          MilestoneDate: fMilestoneDateNew,
                          MilestoneDescription: $("#txtMileDescriptionNew").val(),
                          AutoComplete: vMilestoneAutoComplete,
                          MilestoneOwner: vMilestoneOwner,
                          Priority: $("#ddlMilestoneNewPriority").find('option:selected').text(),
                          MilestoneCompleted: vMilestoneComplete,
                          MilestoneCompletedDate: vCompleteddate,
                          MilestoneCompletedBy: vCompletedby,
                          ShowInCalendar: $('input[name=ShowInCalendarNew]:checked').val(),
                          ModifiedBy: localStorage.UserName,
                          SendReminderTo: vSendReminderTo,
                          Reminder1: $("#txtReminder1MilestoneNew").val(),
                          Reminder2: $("#txtReminder2MilestoneNew").val(),
                          Reminder3: $("#txtReminder3MilestoneNew").val(),
                          Reminder1Condition: encodeURIComponent($("#ddlReminder1MilestoneNew").find('option:selected').text()),
                          Reminder2Condition: encodeURIComponent($("#ddlReminder2MilestoneNew").find('option:selected').text()),
                          Reminder3Condition: encodeURIComponent($("#ddlReminder3MilestoneNew").find('option:selected').text()),
                          MilestoneStatus: encodeURIComponent($("#ddlMilestoneNewStatus").find('option:selected').text()),
                          AlertsEnabled: $("#AlertMile").val(),
                      },
                      cache: false,
                      success: function (person) {
                          $('.ui-button-green-text').parent().removeAttr('disabled');
                          $("#loadingPage").fadeOut();
                          $("#addEditMilestoneNew").dialog("close");
                          $("#milestonesRecurrenceEditPopup").dialog("close");

                          BindMilestone(vContractID);
                      },
                      error: function (data) {
                          $("#loadingPage").fadeOut();
                          $("#inprocessObligation").css('visibility', 'none');
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

            }
            if (swalFlag) {
                if (blUpdate) {
                    var arrMilestoneOwner = $("#ddlMilestoneOwnerNew").val();
                    var vMilestoneOwner = '';
                    $(arrMilestoneOwner).each(function (i, item) {
                        if (vMilestoneOwner == '') {
                            vMilestoneOwner = item;
                        }
                        else {
                            vMilestoneOwner += "; " + item;
                        }
                    });
                    var SendReminderToArr = $("#ddlSendReminderToNew").val();
                    var vSendReminderTo = '';
                    $(SendReminderToArr).each(function (i, item) {
                        if (vSendReminderTo == '') {
                            vSendReminderTo = item;
                        }
                        else {
                            vSendReminderTo += "; " + item;
                        }
                    });


                    var MilestoneID = $("#txtMilestoneIDNew").val();
                    var vMilestoneComplete = "No";
                    var vCompleteddate = null;
                    var vCompletedby = "";
                    if ($("#ddlMilestoneNewStatus").find('option:selected').text() == "Complete") {
                        vMilestoneComplete = "Yes";
                        vCompleteddate = fMilestoneNewCompletedDate;
                        vCompletedby = localStorage.UserName;
                    }
                    var vMilestoneAutoComplete = $('input[type="radio"][name=MilestoneNewAutoComplete]:checked').val();


                    if (MilestoneID != "") {
                        $("#inprocessObligation").css('visibility', 'visible');
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones/milestonenew/updatemilestonebyText?strMilestoneText=' + $("#txtMilestoneNewText").val() + '&milestoneId=' + MilestoneID,
                            type: 'POST',
                            dataType: 'json',
                            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                            data: {
                                RowKey: MilestoneID,
                                ContractID: strContractID,
                                ContractTitle: $("#lblCTitleNew").text(),
                                MilestoneTitle: $("#txtMilestoneTitleNew").val(),
                                MilestoneType: $("#ddlMilestoneTypeNew").find('option:selected').text(),
                                MilestoneDate: fMilestoneDateNew,
                                MilestoneDescription: $("#txtMileDescriptionNew").val(),
                                AutoComplete: vMilestoneAutoComplete,
                                MilestoneOwner: vMilestoneOwner,
                                Priority: $("#ddlMilestoneNewPriority").find('option:selected').text(),
                                MilestoneCompleted: vMilestoneComplete,
                                MilestoneCompletedDate: vCompleteddate,
                                MilestoneCompletedBy: vCompletedby,
                                ShowInCalendar: $('input[name=ShowInCalendarNew]:checked').val(),
                                ModifiedBy: localStorage.UserName,
                                SendReminderTo: vSendReminderTo,
                                Reminder1: $("#txtReminder1MilestoneNew").val(),
                                Reminder2: $("#txtReminder2MilestoneNew").val(),
                                Reminder3: $("#txtReminder3MilestoneNew").val(),
                                Reminder1Condition: encodeURIComponent($("#ddlReminder1MilestoneNew").find('option:selected').text()),
                                Reminder2Condition: encodeURIComponent($("#ddlReminder2MilestoneNew").find('option:selected').text()),
                                Reminder3Condition: encodeURIComponent($("#ddlReminder3MilestoneNew").find('option:selected').text()),
                                MilestoneStatus: encodeURIComponent($("#ddlMilestoneNewStatus").find('option:selected').text()),
                                AlertsEnabled: $("#AlertMile").val(),
                            },
                            cache: false,
                            success: function (person) {
                                $('.ui-button-green-text').parent().removeAttr('disabled');
                                $("#loadingPage").fadeOut();
                                $("#addEditMilestoneNew").dialog("close");
                                $("#milestonesRecurrenceEditPopup").dialog("close");

                                BindMilestone(vContractID);
                            },
                            error: function (data) {
                                $("#loadingPage").fadeOut();
                                $("#inprocessObligation").css('visibility', 'none');
                            }
                        });
                    }
                }
                else {
                    $('.ui-button-green-text').parent().removeAttr('disabled');
                }
            }
        }
    }
}



function updateMilestonesRecurrenceEditNew(status) {
    var fMilestoneDateNew = '';
    if ($("#dtMilestoneDateNew").val() != "" && $("#dtMilestoneDateNew").val() != null) {
        fMilestoneDateNew = $.datepicker.formatDate('mm/dd/yy', $("#dtMilestoneDateNew").datepicker('getDate'));
    }
    var fMilestoneNewCompletedDate = '';
    if ($("#dtMilestoneNewCompletedDate").val() != "" && $("#dtMilestoneNewCompletedDate").val() != null) {
        fMilestoneNewCompletedDate = $.datepicker.formatDate('mm/dd/yy', $("#dtMilestoneNewCompletedDate").datepicker('getDate'));
    }
    if (status == "SINGLE") {

        if (listMilestoneNewData != "") {
            var MilestoneID = $("#txtMilestoneIDNew").val();


            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones?milestoneid=' + MilestoneID,
                type: 'DELETE',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                "Content-Type": "application/json",
                cache: false,
                success: function (data) {
                    $("#milestonesRecurrenceNewEditPopup").dialog("close");
                    $('#ddlMilestoneOccurencess').val('None');
                    listMilestoneNewData = "";
                    $("#txtMilestoneIDNew").val('');
                    modalOnOpenMilestoneNew();
                }
            });
        }
        else {
            $("#loadingPage").fadeIn();
            $('.ui-button-green-text').parent().attr('disabled', 'disabled');
            var isformvalid = false;
            if (requiredValidator('addNewMilestoneNew')) {
                $("#loadingPage").fadeIn();
                var strContractID = getParameterByName('ContractID');

                //do start and end date validation
                var cStartDate = "";
                var cEndDate = "";
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones?contractid=' + strContractID,
                    type: 'GET',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    cache: false,
                    async: false,
                    success: function (data) {
                        $(data).each(function (i, item) {
                            if (item.MilestoneTitle == "Start Date") {
                                cStartDate = item.MilestoneDate;
                            } else if (item.MilestoneTitle == "End Date") {
                                cEndDate = item.MilestoneDate;
                            }
                        });
                    }
                });
                var datevalidationexists = false;
                if ($("#txtMilestoneTitleNew").val() == "Start Date" && cEndDate != "") {
                    if (!comparedatesmile(fMilestoneDateNew, cEndDate)) {
                        datevalidationexists = true;

                        swal("", "Start date should be less than the end date milestone.");
                    }
                } else if ($("#txtMilestoneTitleNew").val() == "End Date" && cStartDate != "") {
                    if (!comparedatesmile(cStartDate, fMilestoneDateNew)) {
                        datevalidationexists = true;

                        swal("", "End date should be greater than start date milestone.");
                    }
                }
                if (!datevalidationexists) {
                    var start = moment(fMilestoneDateNew);
                    var end = moment(new Date());
                    var vv = start.diff(end, "days");
                    var vRenminder = '';
                    var swalFlag = false;
                    var blUpdate = true;
                    isformvalid = true;
                    if (vv <= parseInt($("#txtReminder1New").val()) || vv <= parseInt($("#txtReminder2New").val()) || vv <= parseInt($("#txtReminder3New").val())) {
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
                                var arrMilestoneOwner = $("#ddlMilestoneOwnerNew").val();
                                var vMilestoneOwner = '';
                                $(arrMilestoneOwner).each(function (i, item) {
                                    if (vMilestoneOwner == '') {
                                        vMilestoneOwner = item;
                                    }
                                    else {
                                        vMilestoneOwner += "; " + item;
                                    }
                                });
                                var SendReminderToArr = $("#ddlSendReminderToNew").val();
                                var vSendReminderTo = '';
                                $(SendReminderToArr).each(function (i, item) {
                                    if (vSendReminderTo == '') {
                                        vSendReminderTo = item;
                                    }
                                    else {
                                        vSendReminderTo += "; " + item;
                                    }
                                });


                                var MilestoneID = $("#txtMilestoneIDNew").val();
                                var vMilestoneComplete = "No";
                                var vCompleteddate = null;
                                var vCompletedby = "";
                                if ($("#ddlMilestoneNewStatus").find('option:selected').text() == "Complete") {
                                    vMilestoneComplete = "Yes";
                                    vCompleteddate = fMilestoneNewCompletedDate;

                                    vCompletedby = localStorage.UserName;
                                }

                                var vMilestoneAutoComplete = $('input[type="radio"][name=MilestoneNewAutoComplete]:checked').val();

                                if (MilestoneID != "") {

                                    $("#inprocessObligation").css('visibility', 'visible');
                                    $.ajax({
                                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones/milestonenew/recurrenceedit?milestoneid=' + MilestoneID,
                                        type: 'POST',
                                        dataType: 'json',
                                        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                                        data: {
                                            RowKey: MilestoneID,
                                            ContractID: strContractID,
                                            ContractTitle: $("#lblCTitleNew").text(),
                                            MilestoneTitle: $("#txtMilestoneTitleNew").val(),
                                            MilestoneType: $("#ddlMilestoneTypeNew").find('option:selected').text(),
                                            MilestoneDate: fMilestoneDateNew,
                                            MilestoneDescription: $("#txtMileDescriptionNew").val(),
                                            AutoComplete: vMilestoneAutoComplete,
                                            MilestoneOwner: vMilestoneOwner,
                                            Priority: $("#ddlMilestoneNewPriority").find('option:selected').text(),
                                            MilestoneCompleted: vMilestoneComplete,
                                            MilestoneCompletedDate: vCompleteddate,
                                            MilestoneCompletedBy: vCompletedby,

                                            ShowInCalendar: $('input[name=ShowInCalendarNew]:checked').val(),
                                            ModifiedBy: localStorage.UserName,
                                            SendReminderTo: vSendReminderTo,
                                            Reminder1: $("#txtReminder1MilestoneNew").val(),
                                            Reminder2: $("#txtReminder2MilestoneNew").val(),
                                            Reminder3: $("#txtReminder3MilestoneNew").val(),
                                            Reminder1Condition: encodeURIComponent($("#ddlReminder1MilestoneNew").find('option:selected').text()),
                                            Reminder2Condition: encodeURIComponent($("#ddlReminder2MilestoneNew").find('option:selected').text()),
                                            Reminder3Condition: encodeURIComponent($("#ddlReminder3MilestoneNew").find('option:selected').text()),
                                            MilestoneStatus: encodeURIComponent($("#ddlMilestoneNewStatus").find('option:selected').text()),
                                            AlertsEnabled: $("#AlertMile").val(),
                                        },
                                        cache: false,
                                        success: function (person) {
                                            $('.ui-button-green-text').parent().removeAttr('disabled');
                                            $("#loadingPage").fadeOut();
                                            $("#addEditMilestoneNew").dialog("close");

                                            $("#milestonesRecurrenceEditPopup").dialog("close");
                                            $("#milestonesRecurrenceNewEditPopup").dialog("close");
                                            BindMilestone(vContractID);
                                        },
                                        complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                                    });
                                }
                            }
                            return;
                        });

                    }
                    else {
                        swalFlag = true;
                    }

                }
                if (swalFlag) {
                    if (blUpdate) {
                        var arrMilestoneOwner = $("#ddlMilestoneOwnerNew").val();
                        var vMilestoneOwner = '';
                        $(arrMilestoneOwner).each(function (i, item) {
                            if (vMilestoneOwner == '') {
                                vMilestoneOwner = item;
                            }
                            else {
                                vMilestoneOwner += "; " + item;
                            }
                        });
                        var SendReminderToArr = $("#ddlSendReminderToNew").val();
                        var vSendReminderTo = '';
                        $(SendReminderToArr).each(function (i, item) {
                            if (vSendReminderTo == '') {
                                vSendReminderTo = item;
                            }
                            else {
                                vSendReminderTo += "; " + item;
                            }
                        });


                        var MilestoneID = $("#txtMilestoneIDNew").val();
                        var vMilestoneComplete = "No";
                        var vCompleteddate = null;
                        var vCompletedby = "";
                        if ($("#ddlMilestoneNewStatus").find('option:selected').text() == "Complete") {
                            vMilestoneComplete = "Yes";
                            vCompleteddate = fMilestoneNewCompletedDate;

                            vCompletedby = localStorage.UserName;
                        }
                        var vMilestoneAutoComplete = $('input[type="radio"][name=MilestoneNewAutoComplete]:checked').val();


                        var vMilestoneAutoComplete = $('input[type="radio"][name=MilestoneNewAutoComplete]:checked').val();

                        if (MilestoneID != "") {

                            $("#inprocessObligation").css('visibility', 'visible');
                            $.ajax({
                                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones/milestonenew/recurrenceedit?milestoneid=' + MilestoneID,
                                type: 'POST',
                                dataType: 'json',
                                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                                data: {
                                    RowKey: MilestoneID,
                                    ContractID: strContractID,
                                    ContractTitle: $("#lblCTitleNew").text(),
                                    MilestoneTitle: $("#txtMilestoneTitleNew").val(),
                                    MilestoneType: $("#ddlMilestoneTypeNew").find('option:selected').text(),
                                    MilestoneDate: fMilestoneDateNew,
                                    MilestoneDescription: $("#txtMileDescriptionNew").val(),
                                    AutoComplete: vMilestoneAutoComplete,
                                    MilestoneOwner: vMilestoneOwner,
                                    Priority: $("#ddlMilestoneNewPriority").find('option:selected').text(),
                                    MilestoneCompleted: vMilestoneComplete,
                                    MilestoneCompletedDate: vCompleteddate,
                                    MilestoneCompletedBy: vCompletedby,

                                    ShowInCalendar: $('input[name=ShowInCalendarNew]:checked').val(),
                                    ModifiedBy: localStorage.UserName,
                                    SendReminderTo: vSendReminderTo,
                                    Reminder1: $("#txtReminder1MilestoneNew").val(),
                                    Reminder2: $("#txtReminder2MilestoneNew").val(),
                                    Reminder3: $("#txtReminder3MilestoneNew").val(),
                                    Reminder1Condition: encodeURIComponent($("#ddlReminder1MilestoneNew").find('option:selected').text()),
                                    Reminder2Condition: encodeURIComponent($("#ddlReminder2MilestoneNew").find('option:selected').text()),
                                    Reminder3Condition: encodeURIComponent($("#ddlReminder3MilestoneNew").find('option:selected').text()),
                                    MilestoneStatus: encodeURIComponent($("#ddlMilestoneNewStatus").find('option:selected').text()),
                                    AlertsEnabled: $("#AlertMile").val(),
                                },
                                cache: false,
                                success: function (person) {
                                    $('.ui-button-green-text').parent().removeAttr('disabled');
                                    $("#loadingPage").fadeOut();
                                    $("#addEditMilestoneNew").dialog("close");

                                    $("#milestonesRecurrenceEditPopup").dialog("close");
                                    BindMilestone(vContractID);
                                },
                                complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                            });
                        }
                    }
                }
            }

        }



    }
    else {
        var MilestoneID = $("#txtMilestoneIDNew").val();
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones/milestonenew/updateUpcoming?strMilestoneText=' + $("#txtMilestoneNewText").val() + '&milestoneId=' + MilestoneID,
            type: 'POST',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
            cache: false,
            success: function (person) {
                $("#milestonesRecurrenceEditPopup").dialog("close");

                $("#txtMilestoneIDNew").val('');
                modalOnOpenMilestoneNew();
                $("#milestonesRecurrenceNewEditPopup").dialog("close");


            },
            error: function (data) {
                $("#milestonesRecurrenceNewEditPopup").dialog("close");
                $("#loadingPage").fadeOut();
                $("#inprocessObligation").css('visibility', 'none');
            }
        });
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
                    text: "Are you sure you want to delete '<span style=\"font-weight:700\">" + milestoneTitle + "</span>'?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
     function (confirmed) {
         if (confirmed) {
             $("#loadingPage").fadeIn();
             var milestoneID = $(el).find("#MilestoneID").text();
             $.ajax({
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones?milestoneid=' + milestoneID,
                 type: 'DELETE',
                 dataType: 'json',
                 headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                 "Content-Type": "application/json",
                 cache: false,
                 success: function (data) {
                     $("#loadingPage").fadeOut();
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
                $('#addEditMilestoneNew').dialog('widget').find('.ui-dialog-buttonpane .ui-button:button:contains("Add") .pop_up_Content_Green ').html("Save");
                clearMilestoneFormDataNew();
                listMilestoneNewData = "";
                $("#loadingPage").fadeIn();
                var milestoneID = $(el).find("#MilestoneID").text();
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones?milestoneid=' + milestoneID,
                    type: 'GET',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    "Content-Type": "application/json",
                    cache: false,
                    success: function (milestoneentity) {
                        //manoj
                        $("#hdnCustomDateFieldName").text(milestoneentity.CustomDateFieldName);
                        //manoj
                        $("#milestonenewheading").text("Edit Milestone");
                        $("#dtMilestoneDateNew").val("");
                        if (milestoneentity.MilestoneDate != null) {
                            var duedate = '';
                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                            { duedate = milestoneentity.MilestoneDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                            else {
                                if (localStorage.AppDateFormat == 'DD/MM/YYYY') { duedate = milestoneentity.MilestoneDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1'); }
                                else if (localStorage.AppDateFormat == 'MM/DD/YYYY') { duedate = milestoneentity.MilestoneDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                            }

                            $('#dtMilestoneDateNew').datepicker('setDate', duedate);
                            listMilestoneNewStartDate = $.datepicker.formatDate('mm/dd/yy', $("#dtMilestoneDateNew").datepicker('getDate'));

                            //$("#dtMilestoneDateNew").val(duedate);
                            //listMilestoneNewStartDate = duedate;

                            var newDate = new Date(milestoneentity.MilestoneDate);
                            $("#dtMilestoneOcurrMonthforYear").val(monthNames[newDate.getMonth()]);
                            $("#dtMilestoneOcurrDateforYear").val(newDate.getDate());
                            $("#dtMilestoneNewOccurrenceDueDate").val(newDate.getDate());
                        }
                        $("#txtMilestoneIDNew").val(milestoneentity.RowKey);
                        $("#txtMilestoneNewText").val(milestoneentity.MilestoneText);
                        $("#txtMilestoneTitleNew").val(milestoneentity.MilestoneTitle);
                        $("#txtMileDescriptionNew").val(milestoneentity.MilestoneDescription);
                        if (milestoneentity.ShowInCalendar == "No") {
                            $('input[type="radio"][name="ShowInCalendarNew"][value="No"]').prop('checked', true);
                        }
                        else {
                            $('input[type="radio"][name="ShowInCalendarNew"][value="Yes"]').prop('checked', true);
                        }
                        if (milestoneentity.MilestoneType != '') {
                            $("#ddlMilestoneTypeNew option").filter(function (index) { return $(this).text() === milestoneentity.MilestoneType; }).prop('selected', true);
                        }
                        else {
                            $("#ddlMilestoneTypeNew").val('0')
                        }


                        GetValuesAndAutoPopulate("ddlMilestoneOwnerNew", milestoneentity.MilestoneOwner);
                        GetValuesAndAutoPopulate("ddlSendReminderToNew", milestoneentity.SendReminderTo);

                        if (milestoneentity.Reminder1 != null && milestoneentity.Reminder1 != "" && milestoneentity.Reminder1 != 0) {
                            $("#txtReminder1MilestoneNew").val(milestoneentity.Reminder1);
                        }
                        else {
                            $("#txtReminder1MilestoneNew").val("");
                        }

                        if (milestoneentity.Reminder2 != null && milestoneentity.Reminder2 != "" && milestoneentity.Reminder2 != 0) {
                            $("#txtReminder2MilestoneNew").val(milestoneentity.Reminder2);
                        }
                        else {
                            $("#txtReminder2MilestoneNew").val("");
                        }
                        if (milestoneentity.Reminder3 != null && milestoneentity.Reminder3 != "" && milestoneentity.Reminder3 != 0) {
                            $("#txtReminder3MilestoneNew").val(milestoneentity.Reminder3);
                        }
                        else {
                            $("#txtReminder3MilestoneNew").val("");
                        }

                        if (milestoneentity.Reminder1Condition != '') {
                            $("#ddlReminder1MilestoneNew option").filter(function (index) { return $(this).text() === milestoneentity.Reminder1Condition; }).prop('selected', true);
                        }
                        else {
                            $("#ddlReminder1MilestoneNew").val('before')
                        }
                        if (milestoneentity.Reminder2Condition != '') {
                            $("#ddlReminder2MilestoneNew option").filter(function (index) { return $(this).text() === milestoneentity.Reminder2Condition; }).prop('selected', true);
                        }
                        else {
                            $("#ddlReminder2MilestoneNew").val('before')
                        }
                        if (milestoneentity.Reminder3Condition != '') {
                            $("#ddlReminder3MilestoneNew option").filter(function (index) { return $(this).text() === milestoneentity.Reminder3Condition; }).prop('selected', true);
                        }
                        else {
                            $("#ddlReminder3MilestoneNew").val('before')
                        }


                        if (milestoneentity.Priority != '') {

                            $("#ddlMilestoneNewPriority option").filter(function (index) { return $(this).text() === milestoneentity.Priority; }).prop('selected', true);

                        }
                        else {
                            $("#ddlMilestoneNewPriority").val('Medium')

                        }

                        if (milestoneentity.MilestoneCompleted != '') {
                            if (milestoneentity.MilestoneCompleted == "No") {
                                $('#ulMilestoneNewCompletedDate').css('display', 'none');
                            }
                        }
                        else {
                            $('#ulMilestoneNewCompletedDate').css('display', 'none');
                        }

                        if (milestoneentity.MilestoneCompletedDate != null && milestoneentity.MilestoneCompletedDate != '') {
                            var completedate = '';

                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                            { completedate = milestoneentity.MilestoneCompletedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                            else {
                                if (localStorage.AppDateFormat == 'DD/MM/YYYY') { completedate = milestoneentity.MilestoneCompletedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1'); }
                                else if (localStorage.AppDateFormat == 'MM/DD/YYYY') { completedate = milestoneentity.MilestoneCompletedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                            }
                            $("#dtMilestoneNewCompletedDate").val(completedate);
                        }
                        else {
                            $("#dtMilestoneNewCompletedDate").val('')
                        }

                        if (milestoneentity.AutoComplete == "No") {
                            $('input[type="radio"][name="MilestoneNewAutoComplete"][value="No"]').prop('checked', true);
                        }
                        else {
                            $('input[type="radio"][name="MilestoneNewAutoComplete"][value="Yes"]').prop('checked', true);
                        }

                        var strEndDate = "";


                        if (contractItem.EndDate != "" && contractItem.EndDate != null && contractItem.EndDate != "null") {
                            strEndDate = new Date(contractItem.EndDate);
                            listMilestoneNewEndDate = formatDate(strEndDate);
                            $('#MilestoneNewOcurrenceEndDate').text("");
                            var MNewEndDate = "";
                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                                if (getTimeZone().indexOf('+') > -1)
                                    MNewEndDate = moment(new Date(listMilestoneNewEndDate)).format('MM/DD/YYYY');
                                else if (getTimeZone().indexOf('+00:00') > -1 || getTimeZone().indexOf('-') > -1)
                                    MNewEndDate = moment(new Date(listMilestoneNewEndDate)).utc().add(1, 'days').format('MM/DD/YYYY');
                            }
                            else {
                                if (getTimeZone().indexOf('+') > -1)
                                    MNewEndDate = moment(new Date(listMilestoneNewEndDate)).format(localStorage.AppDateFormat);
                                else if (getTimeZone().indexOf('+00:00') > -1 || getTimeZone().indexOf('-') > -1)
                                    MNewEndDate = moment(new Date(listMilestoneNewEndDate)).utc().add(1, 'days').format(localStorage.AppDateFormat);
                            }

                            $('#MilestoneNewOcurrenceEndDate').text(" (" + MNewEndDate + ")");
                            $("#rdMilestoneNewEndOccurence").prop("checked", true);
                        }
                        else {
                            listMilestoneNewEndDate = "Not Available";
                            $('#MilestoneNewOcurrenceEndDate').text("");
                            $('#MilestoneNewOcurrenceEndDate').text(" (" + listMilestoneNewEndDate + ")");
                            $("#rdMilestoneNewEndOccurence").attr('disabled', true);
                            $('#rdMilestoneNewEndOccurence').removeAttr('checked');
                            $("#rdMilestoneNewEndOccurenceUser").prop("checked", true);


                        }

                        if (milestoneentity.MilestoneEndTerm != null && milestoneentity.MilestoneEndTerm != '') {
                            $('input[type="radio"][name="SelectMilestoneOccurenceEndDate"][value="' + milestoneentity.MilestoneEndTerm + '"]').prop('checked', true);

                        }
                        else {
                            $('input[type="radio"][name="SelectMilestoneOccurenceEndDate"][value="Custom"]').prop('checked', true);

                        }
                        if (contractItem.EndDate != "" && contractItem.EndDate != null && contractItem.EndDate != "null") {
                            userFlag = true;
                        } else {
                            userFlag = false;
                        }

                        if (milestoneentity.MilestoneEndTerm == "Custom") {
                            userFlagCustom = true;
                            $("#txtMilestoneOccurrenceCount").val(milestoneentity.Ocurrences);

                        }
                        else {
                            $("#txtMilestoneOccurrenceCount").val("12");
                        }

                        if (milestoneentity.Ocurrences == null && milestoneentity.Ocurrences == "") {
                            $("#txtMilestoneOccurrenceCount").val("1");
                        }



                        if (milestoneentity.MilestoneDate != null && milestoneentity.MilestoneDate != '' && milestoneentity.MilestoneStartDate != null && milestoneentity.MilestoneStartDate != '') {
                            var dtStartdate;

                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                            { dtStartdate = moment(new Date(milestoneentity.MilestoneStartDate)).utc().format('MM/DD/YYYY'); }
                            else { dtStartdate = moment(new Date(milestoneentity.MilestoneStartDate)).utc().format(localStorage.AppDateFormat); }

                            var dtEnddate;

                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                            { dtEnddate = moment(new Date(milestoneentity.MilestoneEndDate)).utc().format('MM/DD/YYYY'); }
                            else { dtEnddate = moment(new Date(milestoneentity.MilestoneEndDate)).utc().format(localStorage.AppDateFormat); }

                            $('#MilestoneOcurrenceSummary').text("(" + dtStartdate + " to " + dtEnddate + ", " + milestoneentity.Ocurrences + " instances)")

                            document.getElementById("ddlMilestoneOccurencess").disabled = true;
                            $('input[type="radio"][name=SelectMilestoneOccurenceEndDate]').attr("disabled", "disabled");

                            vMilestoneEditStatus = "";

                            var dateNew = new Date(milestoneentity.MilestoneDate);

                            $("input:checkbox[name=chkMilestoneRecurWeekly]").each(function () {
                                this.checked = false;
                            });
                            var day = dateNew.getDay()
                            var chkboxId = "MRC" + day;

                            $("#" + chkboxId).prop('checked', true);

                            if (milestoneentity.Recurrences != null && milestoneentity.Recurrences != "") {
                                $("#ddlMilestoneOccurencess option").filter(function (index) { return $(this).text() === milestoneentity.Recurrences; }).prop('selected', true);

                                if (milestoneentity.Recurrences == "Weekly") {


                                    $("#dtMilestoneDateNew").attr("disabled", "disabled");

                                    $("input:checkbox[name=chkMilestoneRecurWeekly]").each(function () {
                                        this.checked = false;

                                    });



                                    var strRecString = milestoneentity.CustomString.split(',');
                                    //var value = parseInt(strRecString);

                                    $(strRecString).each(function (index, element) {
                                        var value = parseInt(element);
                                        var chkboxId = "MRC" + value;
                                        $("#" + chkboxId).prop('checked', true);
                                    });

                                    //var chkboxId = "MRC" + value;

                                    //$("#" + chkboxId).prop('checked', true);

                                    $("#divMilestoneOcurrenceSummary").css('display', '');
                                    $("#milestoneEditOcursumary").css('display', '');

                                    $("#divMilestoneOcurrenceWeekly").css('display', 'none');
                                    $("#divMilestoneOcurrenceMonthly").css('display', 'none');

                                    $("#amilestoneRecNoneEdit").css('display', 'none');
                                    $("#amilestoneRecEdit").css('display', '');

                                    $("#dvMilestoneOcurrenceEnd").css('display', 'none');

                                    $("#liMilestoneRecurrence").css('display', 'none');



                                }
                                else if (milestoneentity.Recurrences == "None") {
                                    $("#dvMilestoneOcurrenceEnd").css('display', 'none');
                                    $("#divMilestoneOcurrenceMonthly").css('display', 'none');
                                    $("#divMilestoneOcurrenceWeekly").css('display', 'none');
                                    $("#divMilestoneOcurrenceSummary").css('display', '');

                                    $("#milestoneEditOcursumary").css('display', '');


                                    $("#amilestoneRecNoneEdit").css('display', '');
                                    $("#amilestoneRecEdit").css('display', 'none');
                                    $("#liMilestoneRecurrence").css('display', 'none');
                                    $('#MilestoneOcurrenceSummary').text("(" + "Never" + ")")


                                }
                                else if (milestoneentity.Recurrences == "Monthly") {
                                    $("#divMilestoneOcurrenceWeekly").css('display', 'none');
                                    $("#divMilestoneOcurrenceMonthly").css('display', 'none');
                                    $("#ddlMilestoneRepeatMonthly").css('display', '');
                                    $("#ddlMilestoneRepeatMonthly").val(milestoneentity.RecMonthlyString);


                                    $("#dtMilestoneDateNew").attr("disabled", "disabled");


                                    $("#divMilestoneOcurrenceSummary").css('display', '');
                                    $("#milestoneEditOcursumary").css('display', '');


                                    $("#lblMilestoneOcurrenceMonth").css('display', '');
                                    $("#lblMilestoneOcurrenceYear").css('display', 'none');

                                    $("#amilestoneRecNoneEdit").css('display', 'none');
                                    $("#amilestoneRecEdit").css('display', '');
                                    $("#dvMilestoneOcurrenceEnd").css('display', 'none');
                                    $("#liMilestoneRecurrence").css('display', 'none');


                                }
                                else {
                                    $("#divMilestoneOcurrenceWeekly").css('display', 'none');
                                    $("#divMilestoneOcurrenceMonthly").css('display', 'none');
                                    $("#ddlMilestoneRepeatMonthly").css('display', 'none');

                                    $("#lblMilestoneOcurrenceMonth").css('display', 'none');
                                    $("#lblMilestoneOcurrenceYear").css('display', '');


                                    $("#dtMilestoneDateNew").attr("disabled", "disabled");


                                    $("#divMilestoneOcurrenceSummary").css('display', '');
                                    $("#milestoneEditOcursumary").css('display', '');

                                    $("#amilestoneRecNoneEdit").css('display', 'none');
                                    $("#amilestoneRecEdit").css('display', '');
                                    $("#dvMilestoneOcurrenceEnd").css('display', 'none');
                                    $("#liMilestoneRecurrence").css('display', 'none');

                                }

                            }
                        }
                        else {

                            if (contractItem.EndDate != "" && contractItem.EndDate != null && contractItem.EndDate != "null") {
                                strEndDate = new Date(contractItem.EndDate);
                                listMilestoneNewEndDate = formatDate(strEndDate);
                                $('#MilestoneNewOcurrenceEndDate').text("");
                                var MNewEndDate = "";
                                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                                    if (getTimeZone().indexOf('+') > -1)
                                        MNewEndDate = moment(new Date(listMilestoneNewEndDate)).format('MM/DD/YYYY');
                                    else if (getTimeZone().indexOf('+00:00') > -1 || getTimeZone().indexOf('-') > -1)
                                        MNewEndDate = moment(new Date(listMilestoneNewEndDate)).utc().add(1, 'days').format('MM/DD/YYYY');
                                }
                                else {
                                    if (getTimeZone().indexOf('+') > -1)
                                        MNewEndDate = moment(new Date(listMilestoneNewEndDate)).format(localStorage.AppDateFormat);
                                    else if (getTimeZone().indexOf('+00:00') > -1 || getTimeZone().indexOf('-') > -1)
                                        MNewEndDate = moment(new Date(listMilestoneNewEndDate)).utc().add(1, 'days').format(localStorage.AppDateFormat);
                                }

                                $('#MilestoneNewOcurrenceEndDate').text(" (" + MNewEndDate + ")");
                                $("#rdMilestoneNewEndOccurence").prop("checked", true);
                            }
                            else {
                                listMilestoneNewEndDate = "Not Available";
                                $('#MilestoneNewOcurrenceEndDate').text("");
                                $('#MilestoneNewOcurrenceEndDate').text(" (" + listMilestoneNewEndDate + ")");
                                $("#rdMilestoneNewEndOccurence").attr('disabled', true);
                                $('#rdMilestoneNewEndOccurence').removeAttr('checked');
                                $("#rdMilestoneNewEndOccurenceUser").prop("checked", true);


                            }
                            $("#divMilestoneOcurrenceWeekly").css('display', 'none');
                            $("#divMilestoneOcurrenceMonthly").css('display', 'none');

                            $("#dvMilestoneOcurrenceEnd").css('display', 'none');
                            $("#divMilestoneOcurrenceSummary").css('display', 'none');

                            document.getElementById("ddlMilestoneOccurencess").disabled = true;

                            $("#ddlMilestoneOccurencess").val('None');

                            $("#amilestoneRecNoneEdit").css('display', 'none');
                            $("#amilestoneRecEdit").css('display', 'none');



                        }

                        if (milestoneentity.MilestoneStatus == "Complete" || milestoneentity.MilestoneCompleted == "Yes") {
                            if (milestoneentity.MilestoneCompletedDate != null && milestoneentity.MilestoneCompletedDate != "") {
                                var CDate;

                                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                                { CDate = moment(new Date(milestoneentity.MilestoneCompletedDate)).utc().format('MM/DD/YYYY'); }
                                else { CDate = moment(new Date(milestoneentity.MilestoneCompletedDate)).utc().format(localStorage.AppDateFormat); }

                                $("#ulMilestoneNewCompletedDate").css('display', '');
                                $('#dtMilestoneNewCompletedDate').addClass('validelement');
                                $('#dtMilestoneNewCompletedDate').addClass('validdate');
                                $('#dtMilestoneNewCompletedDate').val(CDate);
                            }
                            else {
                                $("#ulMilestoneNewCompletedDate").css('display', '');
                                $('#dtMilestoneNewCompletedDate').addClass('validelement');
                                $('#dtMilestoneNewCompletedDate').addClass('validdate');
                                $('#dtMilestoneNewCompletedDate').val("");
                            }
                        }
                        else {
                            $("#ulMilestoneNewCompletedDate").css('display', 'none');
                            $('#dtMilestoneNewCompletedDate').removeClass('validelement');
                            $('#dtMilestoneNewCompletedDate').removeClass('validdate');
                            $('#dtMilestoneNewCompletedDate').val("");
                        }


                        if (milestoneentity.MilestoneDate != null && milestoneentity.MilestoneDate != '' && milestoneentity.MilestoneStartDate != null && milestoneentity.MilestoneStartDate != '') {

                            var updatedate1 = milestoneentity.MilestoneDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');

                            var updatedate2 = milestoneentity.MilestoneEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');

                            $('#mrepupdatesingle').text("(" + updatedate1 + ")");
                            $('#mrepupdaterecurrence').text("(" + updatedate1 + " to " + updatedate2 + ")");
                            $('#mrnepupdatesingle').text("(" + updatedate1 + ")");
                            $('#mrnepupdaterecurrence').text("(" + updatedate1 + " to " + updatedate2 + ")");

                        }
                        else {
                            var updatedate1 = "NotAvailable";

                            var updatedate2 = "NotAvailable";

                            $('#mrepupdatesingle').text("(" + updatedate1 + ")");
                            $('#mrepupdaterecurrence').text("(" + updatedate1 + ")");
                            $('#mrnepupdatesingle').text("(" + updatedate1 + ")");
                            $('#mrnepupdaterecurrence').text("(" + updatedate1 + ")");
                        }


                        if (milestoneentity.MilestoneStatus != null && milestoneentity.MilestoneStatus != "" && typeof (milestoneentity.MilestoneStatus) != 'undefined') {
                            $("#ddlMilestoneNewStatus").val(milestoneentity.MilestoneStatus);
                        }
                        else {
                            $("#ddlMilestoneNewStatus").val('Upcoming');
                        }

                        $("#lblerrorreclimitMilestone").css('display', 'none');

                        $("#lblerrorreclimitMilestoneNotZero").css('display', 'none');


                        $(".validelement").each(function (index, element) {
                            $(element).removeClass("error");
                            $("#errormsg_" + element.id).remove();
                        });
                        if (milestoneentity.AlertsEnabled == "Yes") {
                            $("#AlertMile").val('Yes').change();
                            $("#AlertObli").val('Yes').change();
                            if (IsPipeline) {
                                $("#reminderEnable").empty();
                                $("#reminderEnable").append("Reminders <span style='color: red;margin-left: 20%'>To turn OFF reminders for milestone notifications, click <a href='javascript:void(0);' id='disableSwitch' onclick='disableMilestoneSwitch()'>Disable</a></span>")
                            }
                            else {
                                $("#reminderEnable").empty();
                                $("#reminderEnable").append("Reminders");
                            }
                        }
                        else {
                            $("#AlertMile").val('No').change();
                            $("#AlertObli").val('No').change();
                            if (IsPipeline) {
                                $("#reminderEnable").empty();
                                $("#reminderEnable").append("Reminders <span style='color: red;margin-left: 20%'>To turn ON reminders for milestone notifications, click <a href='javascript:void(0);' id='enableSwitch' onclick='enableMilestoneSwitch()'>Enable</a></span>")
                            }
                            else {
                                $("#reminderEnable").empty();
                                $("#reminderEnable").append("Reminders");
                            }
                        }
                        $("#addEditMilestoneNew").dialog("option", "title", "");
                        $("#addEditMilestoneNew").dialog("open");

                        $("#loadingPage").fadeOut();
                    },
                    error: function (milestoneentity) {
                        $("#inprocessMilestone").css('visibility', 'hidden');
                        $("#loadingPage").fadeOut();
                    },
                    complete: function () {
                        $("#loadingPage").fadeOut();
                        $("#lblCTitleNew").text($("#lblContractTitle").text());
                        $("#inprocessMilestone").css('visibility', 'hidden');
                        $(".validelement").each(function (index, element) {
                            $(element).removeClass("error");
                            $("#errormsg_" + element.id).remove();
                        });
                        $("#lblerrorreclimitMilestone").css('display', 'none');
                        $("#lblerrorreclimitMilestoneNotZero").css('display', 'none');


                        $("#addEditMilestoneNew").dialog("option", "title", "");
                        $("#addEditMilestoneNew").dialog("open");
                        $("#addEditMilestoneNew").height("auto");
                    }
                });

                break;
            }
    }
}

var vMilestoneTextEditRecurrence = "";
var vMilestoneFlaging = "";

function modalOnOpenMilestoneNew(dialog) {
    $("#loadingPage").fadeIn();
    var strContractID = getParameterByName('ContractID');
    var isformvalid = false;
    var arrMilestoneOwner = $("#ddlMilestoneOwnerNew").val();
    var vMilestoneOwner = '';
    var fMilestoneDateNew = '';
    if ($("#dtMilestoneDateNew").val() != "" && $("#dtMilestoneDateNew").val() != null) {
        fMilestoneDateNew = $.datepicker.formatDate('mm/dd/yy', $("#dtMilestoneDateNew").datepicker('getDate'));
    }
    var fMilestoneNewCompletedDate = '';
    if ($("#dtMilestoneNewCompletedDate").val() != "" && $("#dtMilestoneNewCompletedDate").val() != null) {
        fMilestoneNewCompletedDate = $.datepicker.formatDate('mm/dd/yy', $("#dtMilestoneNewCompletedDate").datepicker('getDate'));
    }


    $(arrMilestoneOwner).each(function (i, item) {
        if (vMilestoneOwner == '') {
            vMilestoneOwner = item;
        }
        else {
            vMilestoneOwner += "; " + item;
        }
    });
    var SendReminderToArr = $("#ddlSendReminderToNew").val();
    var vSendReminderTo = '';
    $(SendReminderToArr).each(function (i, item) {
        if (vSendReminderTo == '') {
            vSendReminderTo = item;
        }
        else {
            vSendReminderTo += "; " + item;
        }
    });


    var MilestoneID = $("#txtMilestoneIDNew").val();
    var vMilestoneComplete = "No";
    var vCompleteddate = null;
    var vCompletedby = "";
    if ($("#ddlMilestoneNewStatus").find('option:selected').text() == "Complete") {
        vMilestoneComplete = "Yes";
        vCompleteddate = fMilestoneNewCompletedDate;
        vCompletedby = localStorage.UserName;
    }
    var vMilestoneAutoComplete = $('input[type="radio"][name=MilestoneNewAutoComplete]:checked').val();
    if (MilestoneID != "") {
        if (vMilestoneEditStatus != "") {
            if (vMilestoneEditStatus == "CHANGERECURRENCE") {
                if ($('#ddlMilestoneOccurencess').val() != "None") {
                    if (listMilestoneNewData != "") {
                        vMilestoneTextEditRecurrence = $("#txtMilestoneNewText").val();
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones?milestoneid=' + MilestoneID,
                            type: 'DELETE',
                            dataType: 'json',
                            headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                            "Content-Type": "application/json",
                            cache: false,
                            success: function (data) {
                                $("#txtMilestoneIDNew").val("");
                                modalOnOpenMilestoneNew();
                            }
                        });
                    }
                    else {
                        swal("", "Please modify the occurence to update milestone.");
                        $("#loadingPage").fadeOut();
                    }
                }
                else {
                    $("#inprocessObligation").css('visibility', 'visible');
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones/milestonenew?milestoneid=' + MilestoneID,
                        type: 'POST',
                        dataType: 'json',
                        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                        data: {
                            RowKey: MilestoneID,
                            ContractID: strContractID,
                            ContractTitle: $("#lblCTitleNew").text(),
                            MilestoneTitle: $("#txtMilestoneTitleNew").val(),
                            MilestoneType: $("#ddlMilestoneTypeNew").find('option:selected').text(),
                            MilestoneDate: fMilestoneDateNew,
                            MilestoneDescription: $("#txtMileDescriptionNew").val(),
                            AutoComplete: vMilestoneAutoComplete,
                            MilestoneOwner: vMilestoneOwner,
                            Priority: $("#ddlMilestoneNewPriority").find('option:selected').text(),
                            MilestoneCompleted: vMilestoneComplete,
                            MilestoneCompletedDate: vCompleteddate,
                            MilestoneCompletedBy: vCompletedby,
                            ShowInCalendar: $('input[name=ShowInCalendarNew]:checked').val(),
                            ModifiedBy: localStorage.UserName,
                            SendReminderTo: vSendReminderTo,
                            Reminder1: $("#txtReminder1MilestoneNew").val(),
                            Reminder2: $("#txtReminder2MilestoneNew").val(),
                            Reminder3: $("#txtReminder3MilestoneNew").val(),
                            Reminder1Condition: encodeURIComponent($("#ddlReminder1MilestoneNew").find('option:selected').text()),
                            Reminder2Condition: encodeURIComponent($("#ddlReminder2MilestoneNew").find('option:selected').text()),
                            Reminder3Condition: encodeURIComponent($("#ddlReminder3MilestoneNew").find('option:selected').text()),
                            MilestoneStatus: encodeURIComponent($("#ddlMilestoneNewStatus").find('option:selected').text()),
                            AlertsEnabled: $("#AlertMile").val(),
                            CustomDateFieldName: $("#hdnCustomDateFieldName").text(),

                        },
                        cache: false,
                        success: function (person) {
                            $('.ui-button-green-text').parent().removeAttr('disabled');
                            $("#loadingPage").fadeOut();
                            $("#addEditMilestoneNew").dialog("close");
                            BindMilestone(vContractID);
                            pendingStarted = false;
                            GetContractPendingAction(true, "BindPeoples");
                        },
                        complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                    });
                }
            }
            else if (vMilestoneEditStatus == "EDITRECURRENCE") {
                if (listMilestoneNewData != "") {
                    vMilestoneTextEditRecurrence = $("#txtMilestoneNewText").val();

                    $("#loadingPage").fadeOut();
                    $("#milestonesRecurrenceNewEditPopup").dialog("option", "title", "Edit Repeat Milestones");
                    $("#milestonesRecurrenceNewEditPopup").dialog("open");


                }
                else {
                    //if ($('#ddlMilestoneOccurencess').val() == "None") {
                    vMilestoneTextEditRecurrence = $("#txtMilestoneNewText").val();
                    $("#loadingPage").fadeOut();
                    $("#milestonesRecurrenceNewEditPopup").dialog("option", "title", "Edit Repeat Milestones");
                    $("#milestonesRecurrenceNewEditPopup").dialog("open");
                    //}
                    //else {
                    //    swal("", "Please modify the occurence to update milestone.");
                    //    $("#loadingPage").fadeOut();
                    //    //$("#milestonesRecurrenceEditPopup").dialog("option", "title", "Edit Repeat Obligation");
                    //    //$("#milestonesRecurrenceEditPopup").dialog("open");
                    //}
                }
            }
            else {
                if ($('#ddlMilestoneOccurencess').val() == "None") {
                    $("#inprocessObligation").css('visibility', 'visible');
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones/milestonenew?milestoneid=' + MilestoneID,
                        type: 'POST',
                        dataType: 'json',
                        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                        data: {
                            RowKey: MilestoneID,
                            ContractID: strContractID,
                            ContractTitle: $("#lblCTitleNew").text(),
                            MilestoneTitle: $("#txtMilestoneTitleNew").val(),
                            MilestoneType: $("#ddlMilestoneTypeNew").find('option:selected').text(),
                            MilestoneDate: fMilestoneDateNew,
                            MilestoneDescription: $("#txtMileDescriptionNew").val(),
                            AutoComplete: vMilestoneAutoComplete,
                            MilestoneOwner: vMilestoneOwner,
                            Priority: $("#ddlMilestoneNewPriority").find('option:selected').text(),
                            MilestoneCompleted: vMilestoneComplete,
                            MilestoneCompletedDate: vCompleteddate,
                            MilestoneCompletedBy: vCompletedby,
                            ShowInCalendar: $('input[name=ShowInCalendarNew]:checked').val(),
                            ModifiedBy: localStorage.UserName,
                            SendReminderTo: vSendReminderTo,
                            Reminder1: $("#txtReminder1MilestoneNew").val(),
                            Reminder2: $("#txtReminder2MilestoneNew").val(),
                            Reminder3: $("#txtReminder3MilestoneNew").val(),
                            Reminder1Condition: encodeURIComponent($("#ddlReminder1MilestoneNew").find('option:selected').text()),
                            Reminder2Condition: encodeURIComponent($("#ddlReminder2MilestoneNew").find('option:selected').text()),
                            Reminder3Condition: encodeURIComponent($("#ddlReminder3MilestoneNew").find('option:selected').text()),
                            MilestoneStatus: encodeURIComponent($("#ddlMilestoneNewStatus").find('option:selected').text()),
                            AlertsEnabled: $("#AlertMile").val(),
                            CustomDateFieldName: $("#hdnCustomDateFieldName").text(),

                        },
                        cache: false,
                        success: function (person) {
                            $('.ui-button-green-text').parent().removeAttr('disabled');
                            $("#loadingPage").fadeOut();
                            $("#addEditMilestoneNew").dialog("close");
                            BindMilestone(vContractID);
                        },
                        complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                    });

                }
                else {
                    if (listMilestoneNewData != "") {
                        $("#loadingPage").fadeOut();
                        $("#milestonesRecurrenceEditPopup").dialog("option", "title", "Edit Repeat Milestones");
                        $("#milestonesRecurrenceEditPopup").dialog("open");
                    }
                    else {
                        swal("", "Please modify the occurence to update milestone.");
                        $("#loadingPage").fadeOut();
                    }
                }
            }

        }
        else {
            if ($('#ddlMilestoneOccurencess').val() == "None") {
                $("#inprocessObligation").css('visibility', 'visible');
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones/milestonenew?milestoneid=' + MilestoneID,
                    type: 'POST',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                    data: {
                        RowKey: MilestoneID,
                        ContractID: strContractID,
                        ContractTitle: $("#lblCTitleNew").text(),
                        MilestoneTitle: $("#txtMilestoneTitleNew").val(),
                        MilestoneType: $("#ddlMilestoneTypeNew").find('option:selected').text(),
                        MilestoneDate: fMilestoneDateNew,
                        MilestoneDescription: $("#txtMileDescriptionNew").val(),
                        AutoComplete: vMilestoneAutoComplete,
                        MilestoneOwner: vMilestoneOwner,
                        Priority: $("#ddlMilestoneNewPriority").find('option:selected').text(),
                        MilestoneCompleted: vMilestoneComplete,
                        MilestoneCompletedDate: vCompleteddate,
                        MilestoneCompletedBy: vCompletedby,
                        ShowInCalendar: $('input[name=ShowInCalendarNew]:checked').val(),
                        ModifiedBy: localStorage.UserName,
                        SendReminderTo: vSendReminderTo,
                        Reminder1: $("#txtReminder1MilestoneNew").val(),
                        Reminder2: $("#txtReminder2MilestoneNew").val(),
                        Reminder3: $("#txtReminder3MilestoneNew").val(),
                        Reminder1Condition: encodeURIComponent($("#ddlReminder1MilestoneNew").find('option:selected').text()),
                        Reminder2Condition: encodeURIComponent($("#ddlReminder2MilestoneNew").find('option:selected').text()),
                        Reminder3Condition: encodeURIComponent($("#ddlReminder3MilestoneNew").find('option:selected').text()),
                        MilestoneStatus: encodeURIComponent($("#ddlMilestoneNewStatus").find('option:selected').text()),
                        AlertsEnabled: $("#AlertMile").val(),
                        CustomDateFieldName: $("#hdnCustomDateFieldName").text(),
                    },
                    cache: false,
                    success: function (person) {
                        $('.ui-button-green-text').parent().removeAttr('disabled');
                        $("#loadingPage").fadeOut();
                        $("#addEditMilestoneNew").dialog("close");
                        BindMilestone(vContractID);
                    },
                    complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                });


            }
            else {
                // if (listMilestoneNewData != "") {
                $("#loadingPage").fadeOut();
                $("#milestonesRecurrenceEditPopup").dialog("option", "title", "Edit Repeat Milestones");
                $("#milestonesRecurrenceEditPopup").dialog("open");
                //}
                //else {
                //    swal("", "Please modify the occurence to update milestone.");
                //    $("#loadingPage").fadeOut();
                //}
                //$("#loadingPage").fadeOut();
                //$("#milestonesRecurrenceEditPopup").dialog("option", "title", "");
                //$("#milestonesRecurrenceEditPopup").dialog("open");
            }
        }
    }
    else {
        //$("#inprocessMilestone").css('visibility', 'visible');
        if ($('#ddlMilestoneOccurencess').val() != "None") {
            if ($('input[name=SelectMilestoneOccurenceEndDate]:checked').val() == 'Custom') {
                if (parseInt($("#txtMilestoneOccurrenceCount").val()) > 54) {
                    $("#lblerrorreclimitMilestone").css('display', '');
                    $("#loadingPage").fadeOut();

                }
                else if (parseInt($("#txtMilestoneOccurrenceCount").val()) == 0) {
                    $("#lblerrorreclimitMilestoneNotZero").css('display', '');
                    $("#loadingPage").fadeOut();
                }
                else {
                    var formData = new FormData();
                    var milestoneForm = "ContractID=" + getParameterByName('ContractID');
                    milestoneForm += "&ContractTitle=" + encodeURIComponent($("#lblCTitleNew").text());
                    milestoneForm += "&MilestoneTitle=" + encodeURIComponent($("#txtMilestoneTitleNew").val());

                    milestoneForm += "&MilestoneType=" + encodeURIComponent($("#ddlMilestoneTypeNew").find('option:selected').text());
                    milestoneForm += "&MilestoneDescription=" + encodeURIComponent($("#txtMileDescriptionNew").val());

                    milestoneForm += "&MilestoneOwner=" + encodeURIComponent(vMilestoneOwner);
                    milestoneForm += "&AutoComplete=" + encodeURIComponent(vMilestoneAutoComplete);

                    milestoneForm += "&Priority=" + $("#ddlMilestoneNewPriority").find('option:selected').text();
                    milestoneForm += "&MilestoneCompleted=" + encodeURIComponent(vMilestoneComplete);
                    milestoneForm += "&MilestoneCompletedDate=" + vCompleteddate;
                    milestoneForm += "&MilestoneCompletedBy=" + encodeURIComponent(vCompletedby);

                    milestoneForm += "&ShowInCalendar=" + $('input[name=ShowInCalendarNew]:checked').val();
                    milestoneForm += "&CreatedBy=" + encodeURIComponent(localStorage.UserName);
                    milestoneForm += "&ModifiedBy=" + encodeURIComponent(localStorage.UserName);
                    milestoneForm += "&SendReminderTo=" + encodeURIComponent(vSendReminderTo);
                    milestoneForm += "&Reminder1=" + $("#txtReminder1MilestoneNew").val();
                    milestoneForm += "&Reminder2=" + $("#txtReminder2MilestoneNew").val();
                    milestoneForm += "&Reminder3=" + $("#txtReminder3MilestoneNew").val();
                    milestoneForm += "&Reminder1Condition=" + encodeURIComponent($("#ddlReminder1MilestoneNew").find('option:selected').text());
                    milestoneForm += "&Reminder2Condition=" + encodeURIComponent($("#ddlReminder2MilestoneNew").find('option:selected').text());
                    milestoneForm += "&Reminder3Condition=" + encodeURIComponent($("#ddlReminder3MilestoneNew").find('option:selected').text());
                    milestoneForm += "&MilestoneStatus=" + encodeURIComponent($("#ddlMilestoneNewStatus").find('option:selected').text());
                    milestoneForm += "&AlertsEnabled=" + $("#AlertMile").val();
                    milestoneForm += "&Ocurrences=" + encodeURIComponent(milestoneoccur);
                    milestoneForm += "&Recurrences=" + encodeURIComponent(milestoneRecur);
                    milestoneForm += "&CustomString=" + encodeURIComponent(milestoneRecurCusString);
                    milestoneForm += "&MilestoneEndTerm=" + encodeURIComponent($("input:radio[name=SelectMilestoneOccurenceEndDate]:checked").val());
                    if (typeof ($("#hdnCustomDateFieldName").text()) != "undefined" && $("#hdnCustomDateFieldName").text() != null && $("#hdnCustomDateFieldName").text() != "") {
                        milestoneForm += "&CustomDateFieldName=" + encodeURIComponent($("#hdnCustomDateFieldName").text());
                    }

                    if ($('#ddlMilestoneOccurencess').val() == "Monthly") {
                        milestoneForm += "&RecMonthlyString=" + encodeURIComponent($("#ddlMilestoneRepeatMonthly").find('option:selected').text());
                    }
                    else {
                        milestoneForm += "&RecMonthlyString=" + "";
                    }
                    formData.append("SearializeControls", milestoneForm);
                    var milestoneoccurForm = "EndDate=" + encodeURIComponent(listMilestoneNewData.EndDate);
                    milestoneoccurForm += "&LastDate=" + encodeURIComponent(listMilestoneNewData.LastDate);
                    milestoneoccurForm += "&StartDate=" + encodeURIComponent(listMilestoneNewData.StartDate);
                    var strvalues = "";
                    var Values = listMilestoneNewData.Values;

                    if (typeof Values != "undefined" && Values != null) {
                        for (var j = 0; j < Values.length; j++) {
                            strvalues += Values[j] + ",";
                        }
                        strvalues = removeLastChar(strvalues, ',');
                    }

                    milestoneoccurForm += "&Values=" + strvalues;

                    formData.append("objoccurrence", milestoneoccurForm);

                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones/milestonesnew',
                        type: 'POST',
                        dataType: 'json',
                        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (person) {
                            $("#loadingPage").fadeOut();
                            $("#addEditMilestoneNew").dialog("close");

                            if ($('#milestoneInline').is(':hidden')) { }
                            else
                            {
                                $('#milestoneInline').slideToggle();
                            }
                            BindMilestone();
                        },
                        error: function (data) {
                            $("#loadingPage").fadeOut();
                        },
                        complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                    });
                }



            }
            else {
                var formData = new FormData();
                var milestoneForm = "ContractID=" + getParameterByName('ContractID');
                milestoneForm += "&ContractTitle=" + encodeURIComponent($("#lblCTitleNew").text());
                milestoneForm += "&MilestoneTitle=" + encodeURIComponent($("#txtMilestoneTitleNew").val());

                milestoneForm += "&MilestoneType=" + encodeURIComponent($("#ddlMilestoneTypeNew").find('option:selected').text());
                milestoneForm += "&MilestoneDescription=" + encodeURIComponent($("#txtMileDescriptionNew").val());

                milestoneForm += "&MilestoneOwner=" + encodeURIComponent(vMilestoneOwner);
                milestoneForm += "&AutoComplete=" + encodeURIComponent(vMilestoneAutoComplete);

                milestoneForm += "&Priority=" + $("#ddlMilestoneNewPriority").find('option:selected').text();
                milestoneForm += "&MilestoneCompleted=" + encodeURIComponent(vMilestoneComplete);
                milestoneForm += "&MilestoneCompletedDate=" + vCompleteddate;
                milestoneForm += "&MilestoneCompletedBy=" + encodeURIComponent(vCompletedby);
                milestoneForm += "&ShowInCalendar=" + $('input[name=ShowInCalendarNew]:checked').val();
                milestoneForm += "&CreatedBy=" + encodeURIComponent(localStorage.UserName);
                milestoneForm += "&ModifiedBy=" + encodeURIComponent(localStorage.UserName);
                milestoneForm += "&SendReminderTo=" + encodeURIComponent(vSendReminderTo);
                milestoneForm += "&Reminder1=" + $("#txtReminder1MilestoneNew").val();
                milestoneForm += "&Reminder2=" + $("#txtReminder2MilestoneNew").val();
                milestoneForm += "&Reminder3=" + $("#txtReminder3MilestoneNew").val();
                milestoneForm += "&Reminder1Condition=" + encodeURIComponent($("#ddlReminder1MilestoneNew").find('option:selected').text());
                milestoneForm += "&Reminder2Condition=" + encodeURIComponent($("#ddlReminder2MilestoneNew").find('option:selected').text());
                milestoneForm += "&Reminder3Condition=" + encodeURIComponent($("#ddlReminder3MilestoneNew").find('option:selected').text());
                milestoneForm += "&MilestoneStatus=" + encodeURIComponent($("#ddlMilestoneNewStatus").find('option:selected').text());
                milestoneForm += "&AlertsEnabled=" + $("#AlertMile").val();
                milestoneForm += "&Ocurrences=" + encodeURIComponent(milestoneoccur);
                milestoneForm += "&Recurrences=" + encodeURIComponent(milestoneRecur);
                milestoneForm += "&CustomString=" + encodeURIComponent(milestoneRecurCusString);
                milestoneForm += "&MilestoneEndTerm=" + encodeURIComponent($("input:radio[name=SelectMilestoneOccurenceEndDate]:checked").val());

                if (typeof ($("#hdnCustomDateFieldName").text()) != "undefined" && $("#hdnCustomDateFieldName").text() != null && $("#hdnCustomDateFieldName").text() != "") {
                    milestoneForm += "&CustomDateFieldName=" + encodeURIComponent($("#hdnCustomDateFieldName").text());
                }


                if ($('#ddlMilestoneOccurencess').val() == "Monthly") {
                    milestoneForm += "&RecMonthlyString=" + encodeURIComponent($("#ddlMilestoneRepeatMonthly").find('option:selected').text());
                }
                else {
                    milestoneForm += "&RecMonthlyString=" + "";
                }

                formData.append("SearializeControls", milestoneForm);


                var milestoneoccurForm = "EndDate=" + encodeURIComponent(listMilestoneNewData.EndDate);
                milestoneoccurForm += "&LastDate=" + encodeURIComponent(listMilestoneNewData.LastDate);
                milestoneoccurForm += "&StartDate=" + encodeURIComponent(listMilestoneNewData.StartDate);
                var strvalues = "";
                var Values = listMilestoneNewData.Values;

                if (typeof Values != "undefined" && Values != null) {
                    for (var j = 0; j < Values.length; j++) {
                        strvalues += Values[j] + ",";
                    }
                    strvalues = removeLastChar(strvalues, ',');
                }

                milestoneoccurForm += "&Values=" + strvalues;

                formData.append("objoccurrence", milestoneoccurForm);

                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones/milestonesnew',
                    type: 'POST',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (person) {
                        $("#loadingPage").fadeOut();
                        $("#addEditMilestoneNew").dialog("close");

                        if ($('#milestoneInline').is(':hidden')) { }
                        else
                        {
                            $('#milestoneInline').slideToggle();
                        }
                        BindMilestone();
                    },
                    error: function (data) {
                        $("#loadingPage").fadeOut();
                    },
                    complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                });
            }


        }
        else {
            var vRecurrence = "";
            var vRecurrenceCustom = "";
            var vOcurence = "";
            vRecurrence = "None";
            vRecurrenceCustom = "None";
            vOcurence = 1;
            var formData = new FormData();
            var milestoneForm = "ContractID=" + getParameterByName('ContractID');
            milestoneForm += "&ContractTitle=" + encodeURIComponent($("#lblCTitleNew").text());
            milestoneForm += "&MilestoneTitle=" + encodeURIComponent($("#txtMilestoneTitleNew").val());

            milestoneForm += "&MilestoneType=" + encodeURIComponent($("#ddlMilestoneTypeNew").find('option:selected').text());
            milestoneForm += "&MilestoneDescription=" + encodeURIComponent($("#txtMileDescriptionNew").val());

            milestoneForm += "&MilestoneOwner=" + encodeURIComponent(vMilestoneOwner);
            milestoneForm += "&MilestoneDate=" + encodeURIComponent(fMilestoneDateNew);

            milestoneForm += "&AutoComplete=" + encodeURIComponent(vMilestoneAutoComplete);
            milestoneForm += "&Priority=" + $("#ddlMilestoneNewPriority").find('option:selected').text();

            milestoneForm += "&MilestoneCompleted=" + encodeURIComponent(vMilestoneComplete);
            milestoneForm += "&MilestoneCompletedDate=" + vCompleteddate;
            milestoneForm += "&MilestoneCompletedBy=" + encodeURIComponent(vCompletedby);




            milestoneForm += "&ShowInCalendar=" + $('input[name=ShowInCalendarNew]:checked').val();
            milestoneForm += "&CreatedBy=" + encodeURIComponent(localStorage.UserName);
            milestoneForm += "&ModifiedBy=" + encodeURIComponent(localStorage.UserName);
            milestoneForm += "&SendReminderTo=" + encodeURIComponent(vSendReminderTo);
            milestoneForm += "&Reminder1=" + $("#txtReminder1MilestoneNew").val();
            milestoneForm += "&Reminder2=" + $("#txtReminder2MilestoneNew").val();
            milestoneForm += "&Reminder3=" + $("#txtReminder3MilestoneNew").val();
            milestoneForm += "&Reminder1Condition=" + encodeURIComponent($("#ddlReminder1MilestoneNew").find('option:selected').text());
            milestoneForm += "&Reminder2Condition=" + encodeURIComponent($("#ddlReminder2MilestoneNew").find('option:selected').text());
            milestoneForm += "&Reminder3Condition=" + encodeURIComponent($("#ddlReminder3MilestoneNew").find('option:selected').text());

            milestoneForm += "&MilestoneStatus=" + encodeURIComponent($("#ddlMilestoneNewStatus").find('option:selected').text());
            milestoneForm += "&AlertsEnabled=" + $("#AlertMile").val();
            milestoneForm += "&Ocurrences=" + encodeURIComponent(vOcurence);
            milestoneForm += "&Recurrences=" + encodeURIComponent(vRecurrence);
            milestoneForm += "&CustomString=" + encodeURIComponent(vRecurrenceCustom);
            milestoneForm += "&MilestoneEndTerm=" + encodeURIComponent($("input:radio[name=SelectMilestoneOccurenceEndDate]:checked").val());
            milestoneForm += "&RecMonthlyString=" + "";
            if (typeof ($("#hdnCustomDateFieldName").text()) != "undefined" && $("#hdnCustomDateFieldName").text() != null && $("#hdnCustomDateFieldName").text() != "") {
                milestoneForm += "&CustomDateFieldName=" + encodeURIComponent($("#hdnCustomDateFieldName").text());
            }
            formData.append("SearializeControls", milestoneForm);

            formData.append("objoccurrence", "");

            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones/milestonesnew',
                type: 'POST',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function (person) {
                    $("#addEditMilestoneNew").dialog("close");

                    if ($('#milestoneInline').is(':hidden')) { }
                    else
                    {
                        $('#milestoneInline').slideToggle();
                    }



                    $("#loadingPage").fadeOut();
                    BindMilestone();
                },
                error: function (data) {
                    $("#loadingPage").fadeOut();
                },
                complete: function () {
                    $("#loadingPage").fadeOut(); $("#inprocessObligation").css('visibility', 'none');
                }
            });
        }
    }
    return isformvalid;
}

function milestonevalidate() {
    var isformvalid = false;
    if (requiredValidator('addNewMilestoneNew')) {
        if (comparedatestatus($.datepicker.formatDate('mm/dd/yy', $("#dtMilestoneDateNew").datepicker('getDate')), $("#ddlMilestoneNewStatus").val())) {
            var oValidate = true;
            if ($('#ddlMilestoneOccurencess').val() == "Weekly") {
                var strrecuobli = "";
                $("input:checkbox[name=chkMilestoneRecurWeekly]:checked").each(function () {
                    strrecuobli += (this.value) + ",";
                });
                if (strrecuobli == "") {
                    oValidate = false;
                }
            }

            if (!oValidate) {
                $("#loadingPage").fadeOut();
                $("input:checkbox[name=chkMilestoneRecurWeekly]").each(function () {
                    var Id = this.id;
                    $("#" + Id).css('outline', '1px solid #F00');
                });
                return false;
            }
            //Check if milestone owner is part of contract
            var ownervalidation = false;
            var arrNewOwners = [];
            var arrMilestoneOwner = $("#ddlMilestoneOwnerNew").val();
            var isGroup = false;
            $(arrMilestoneOwner).each(function (i, item) {
                if (item.indexOf('{') > -1) {
                    isGroup = true;
                }
            });
            if (isGroup) {
                arrNewOwners = getMilestoneOwners(arrMilestoneOwner.join(';'));

                var vNotMilestoneOwner = '';
                $(arrNewOwners).each(function (i, item) {
                    if (contractItem.FullControlPermissions.indexOf(item) <= -1 && contractItem.ReadWritePermissions.indexOf(item) <= -1) {
                        if (vNotMilestoneOwner == '') {
                            vNotMilestoneOwner = item;
                        }
                        else {
                            vNotMilestoneOwner += "; " + item;
                        }
                    }
                });
            }
            else {
                var vNotMilestoneOwner = '';
                $(arrMilestoneOwner).each(function (i, item) {
                    if (contractItem.FullControlPermissions.indexOf(item) <= -1 && contractItem.ReadWritePermissions.indexOf(item) <= -1) {
                        if (vNotMilestoneOwner == '') {
                            vNotMilestoneOwner = item;
                        }
                        else {
                            vNotMilestoneOwner += "; " + item;
                        }
                    }
                });
            }

            if (vNotMilestoneOwner != '') {
                swal({
                    title: '',
                    text: "<span style=\"font-weight:700\">'" + vNotMilestoneOwner + "'</span> do not have permission to access to this contract or not part of contract.",
                    showCancelButton: false,
                    confirmButtonText: 'OK',
                    html: true
                });
                $("#loadingPage").fadeOut();
                return false;
            }


            var strContractID = getParameterByName('ContractID');
            var existingconMilestones = null;
            //do start and end date validation
            var cStartDate = "";
            var cEndDate = "";
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones?contractid=' + strContractID,
                type: 'GET',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                cache: false,
                async: false,
                success: function (data) {
                    existingconMilestones = data;
                    $(data).each(function (i, item) {
                        if (item.MilestoneTitle == "Start Date") {
                            cStartDate = item.MilestoneDate;
                        } else if (item.MilestoneTitle == "End Date") {
                            cEndDate = item.MilestoneDate;
                        }
                    });
                }
            });
            var datevalidationexists = false;
            if ($("#txtMilestoneTitleNew").val() == "Start Date" && cEndDate != "") {
                if (!comparedatesmile($.datepicker.formatDate('mm/dd/yy', $("#dtMilestoneDateNew").datepicker('getDate')), cEndDate)) {
                    datevalidationexists = true;

                    swal("", "Start date should be less than the end date milestone.");
                }
            } else if ($("#txtMilestoneTitleNew").val() == "End Date" && cStartDate != "") {
                if (!comparedatesmile(cStartDate, $.datepicker.formatDate('mm/dd/yy', $("#dtMilestoneDateNew").datepicker('getDate')))) {
                    datevalidationexists = true;
                    swal("", "End date should be greater than start date milestone.");
                }
            }
            if (!datevalidationexists) {
                var MilestoneID = $("#txtMilestoneIDNew").val();
                if (MilestoneID != "") {
                    if (existingconMilestones != null) {
                        if ($('#ddlMilestoneOccurencess').val() == "None") {
                            $(existingconMilestones).each(function (i, item) {
                                if (MilestoneID != item.RowKey) {
                                    if ($("#txtMilestoneTitleNew").val() == item.MilestoneTitle) {
                                        if (!comparedatesequal(moment(new Date(item.MilestoneDate)).utc().format('MM/DD/YYYY'), $.datepicker.formatDate('mm/dd/yy', $("#dtMilestoneDateNew").datepicker('getDate')))) {
                                            if (!datevalidationexists) {
                                                swal("", "Milestone title for the particular date already exist.");
                                            }
                                            datevalidationexists = true;
                                        }
                                    }
                                }

                            });
                        }
                        else {
                            if (listMilestoneNewData != "") {
                                var txtMilestoneNewText = $('#txtMilestoneNewText').val();
                                $(existingconMilestones).each(function (i, item) {
                                    if (MilestoneID != item.RowKey) {
                                        if ($("#txtMilestoneTitleNew").val() == item.MilestoneTitle && txtMilestoneNewText != item.MilestoneText) {
                                            if (!comparedatesequalrecurrence(moment(new Date(item.MilestoneDate)).utc().format('MM/DD/YYYY'), listMilestoneNewData)) {
                                                if (!datevalidationexists) {
                                                    swal("", "Milestone title for one of the date in recurrence already exist.");
                                                }
                                                datevalidationexists = true;
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    }
                }
                else {
                    if (existingconMilestones != null) {
                        if ($('#ddlMilestoneOccurencess').val() == "None") {
                            $(existingconMilestones).each(function (i, item) {
                                if ($("#txtMilestoneTitleNew").val() == item.MilestoneTitle) {
                                    if (!comparedatesequal(moment(new Date(item.MilestoneDate)).utc().format('MM/DD/YYYY'), $.datepicker.formatDate('mm/dd/yy', $("#dtMilestoneDateNew").datepicker('getDate')))) {
                                        if (!datevalidationexists) {
                                            swal("", "Milestone title for the particular date already exist.");
                                        }
                                        datevalidationexists = true;
                                    }
                                }
                            });
                        }
                        else {
                            if (listMilestoneNewData != "") {
                                $(existingconMilestones).each(function (i, item) {
                                    if ($("#txtMilestoneTitleNew").val() == item.MilestoneTitle) {
                                        if (!comparedatesequalrecurrence(item.MilestoneDate, listMilestoneNewData)) {
                                            if (!datevalidationexists) {
                                                swal("", "Milestone title for one of the date in recurrence already exist.");
                                            }
                                            datevalidationexists = true;
                                        }
                                    }
                                });
                            }
                        }
                    }
                }



            }

            if (!datevalidationexists) {

                var start = moment($.datepicker.formatDate('mm/dd/yy', $("#dtMilestoneDateNew").datepicker('getDate')));
                var today = new Date();
                var end = moment(today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear());
                var vv = start.diff(end, "days");
                var vRenminder = '';
                var swalFlag = false;
                var blUpdate = true;
                isformvalid = true;

                var oDate = false;
                if ($("#ddlReminder1MilestoneNew").val() == "before") {
                    if (vv <= parseInt($("#txtReminder1MilestoneNew").val())) {
                        oDate = true;
                    }
                }
                else {
                    oDate = false;
                }

                if ($("#ddlReminder2MilestoneNew").val() == "before") {
                    if (vv <= parseInt($("#txtReminder2MilestoneNew").val())) {
                        oDate = true;
                    }
                }
                else {
                    oDate = false;
                }

                if ($("#ddlReminder3MilestoneNew").val() == "before") {
                    if (vv <= parseInt($("#txtReminder3MilestoneNew").val())) {
                        oDate = true;
                    }
                }
                else {
                    oDate = false;
                }


                if (oDate) {
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
                             modalOnOpenMilestoneNew();
                         }
                     });
                }
                else {
                    modalOnOpenMilestoneNew();
                }

                isformvalid = blUpdate
            }
        }
        else {
            isformvalid = false;
            $("#ddlMilestoneNewStatus").addClass('error');
            $('html, body').animate({ scrollTop: 0 }, 'fast');
        }
    }

    return isformvalid;
}


function checkMultipleMilestonesNewMul(object) {
    var hidecomplete = false;
    //manoj
    $.each($('input:checkbox[name="chkmilestone"]:checked'), function () {
        if (typeof (this) != 'undefined' && $.trim(this) != null) {
            if ($(this).hasClass("delmilestone") && (!hidecomplete)) {
                hidecomplete = true;
            }
        }
    });
    if (hidecomplete) {
        $("#limilestonecomplete").css("display", "none");
    } else {
        if (contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived") {
            $("#limilestonecomplete").css("display", "none");
        } else if ($("#hdnPermission").val() == "Contribute" || $("#hdnPermission").val() == "Manage") {
            $("#limilestonecomplete").css("display", "");
        }
    }
    if ($('input:checkbox[name="chkmilestone"]:checked').length > 0) {
        $("#milestonesNewActions").css('display', '');
    } else {
        $("#milestonesNewActions").css('display', 'none');
    }
    //manoj
    try {
        hideAllMenuAndStopPro(event);
    }
    catch (ex) {

    }
}

function contextMenuMilestoneNewMul(action, el, pos) {
    switch (action) {
        case "delete":
            {
                swal({
                    title: '',
                    text: "Are you sure you want to '<span style=\"font-weight:700\">delete</span>' Items?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
     function (confirmed) {
         if (confirmed) {
             $("#loadingPage").fadeIn();
             //manoj
             var selectedmilestoneid = Getvaluebynameattr('chkmilestone');
             //manoj
             $.ajax({
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones/milestonenew?milestoneids=' + selectedmilestoneid + '&contractid=' + vContractID,
                 type: 'DELETE',
                 dataType: 'json',
                 headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                 cache: false,
                 success: function (data) {
                     selectedmilestoneid = "";
                     BindMilestone(vContractID);
                     $("#milestonesNewActions").css('display', 'none');
                     $("#loadingPage").fadeOut();
                 }
             });
         }
         return;
     });

                break;
            }
        case "update":
            {
                var selectedmilestoneid = Getvaluebynameattr('chkmilestone');
                var formDataStatusMile = new FormData();
                formDataStatusMile.append("MilestoneIDs", selectedmilestoneid);
                $("#loadingPage").fadeIn();
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones/changestatus?status=Complete',
                    type: 'PUT',
                    dataType: 'json',
                    data: formDataStatusMile,
                    contentType: false,
                    processData: false,
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                    cache: false,
                    success: function (result) {
                        $("#loadingPage").fadeOut();
                        selectedmilestoneid = "";
                        BindMilestone(vContractID);
                        $("#milestonesNewActions").css('display', 'none');
                    },
                    error: function (result) {
                        $("#loadingPage").fadeOut();
                        selectedmilestoneid = "";
                        BindMilestone(vContractID);
                    }
                });

                break;
            }

    }
}

//*Harshitha
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
//*Harshitha


//*Harshitha
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
        article += ' <a href="javascript:void(0)" style="color:#555555;" onclick=viewDetailsTerm()>' + titleTerm + '</a>';
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


////--Obligations--////
function BindObligationsNew(contractid, item1) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/deleteempty?strDelete=' + "Catalog",
        type: 'DELETE',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName, contractId: getParameterByName("ContractID") },
        "Content-Type": "application/json",
        cache: false,
        success: function (data) {
            if (contractid == null || contractid == "") { contractid = vContractID; }
            $("#ObligationNewDetailsTableBody").empty();
            $("#dvObligationAlertNew").empty();
            $("#dvObligationAlertNew").css('display', 'none');
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsNew?contractid=' + contractid,
                type: 'GET',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey },
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
                        //bug id: eO37836
                        if ($("#hdnPermission").val() != 'View' && $("#hdnPermission").val() != "" && $("#hdnPermission").val() != null) {
                            if (typeof item1 != "undefined" && item1 != '') {
                                if (item1.Status == "Expired" || item1.Status == "Cancelled" || item1.Status == "Replaced" || item1.Status == "Archived")
                                    url = '<a title="' + item.ObligationTitle + '"  href="javascript:void(0)" onclick="ViewObligationDetail(\'' + item.RowKey + '\')" class="linkText">' + item.ObligationTitle + '</a>';
                                else
                                    url = '<input type="checkbox" id="' + item.RowKey + '" name="MultipleObligationsNew" onclick="checkMultipleObligationsNew(this);" value="' + item.RowKey + '">&nbsp;<a title="' + item.ObligationTitle + '"  href="javascript:void(0)" onclick="ViewObligationDetail(\'' + item.RowKey + '\')" class="linkText">' + item.ObligationTitle + '</a>&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuObligationNew"/>';
                            }
                            else {
                                url = '<input type="checkbox" id="' + item.RowKey + '" name="MultipleObligationsNew" onclick="checkMultipleObligationsNew(this);" value="' + item.RowKey + '">&nbsp;<a title="' + item.ObligationTitle + '"  href="javascript:void(0)" onclick="ViewObligationDetail(\'' + item.RowKey + '\')" class="linkText">' + item.ObligationTitle + '</a>&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuObligationNew"/>';
                            }
                        }
                        else {
                            url = '<input type="checkbox" id="' + item.RowKey + '" name="MultipleObligationsNew" onclick="checkMultipleObligationsNew(this);" value="' + item.RowKey + '">&nbsp;<a title="' + item.ObligationTitle + '"  href="javascript:void(0)" onclick="ViewObligationDetail(\'' + item.RowKey + '\')" class="linkText">' + item.ObligationTitle + '</a>&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuObligationNew"/>';
                        }



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
                        if ($("#hdnPermission").val() != 'View' && $("#hdnPermission").val() != "" && $("#hdnPermission").val() != null) {
                            if (contractItem.Status == "Expired" || contractItem.Status == "Cancelled" || contractItem.Status == "Replaced" || contractItem.Status == "Archived") {
                                htmlContent += "<td><a href='javascript:void(0);' class='wit-btn obli_status_chang'>" + item.ObligationStatus + "</a></td>";
                            }
                            else {
                                htmlContent += "<td><a href='javascript:void(0);' onclick='checkObligationsstatusupdateNew(this);' class='wit-btn obli_status_chang openmenuObligationStatusSettings'>" + item.ObligationStatus + "<img class='margin_left_5px' src='/Content/Images/card.png'></a></td>";
                            }
                        }
                        else
                            htmlContent += "<td><a href='javascript:void(0);' class='wit-btn obli_status_chang'>" + item.ObligationStatus + "</a></td>";


                        //if ($("#hdnPermission").val() != 'View' && $("#hdnPermission").val() != "" && $("#hdnPermission").val() != null)
                        //    htmlContent += "<td><a href='javascript:void(0);' onclick='checkObligationsstatusupdateNew(this);' class='wit-btn obli_status_chang openmenuObligationStatusSettings'>" + item.ObligationStatus + "<img class='margin_left_5px' src='/Content/Images/card.png'></a></td>";
                        //else
                        //    htmlContent += "<td><a href='javascript:void(0);' style='pointer-events: none;' onclick='checkObligationsstatusupdateNew(this);' class='wit-btn obli_status_chang openmenuObligationStatusSettings'>" + item.ObligationStatus + "<img class='margin_left_5px' src='/Content/Images/card.png'></a></td>";


                        htmlContent += "</tr>";

                    });
                    $("#ObligationNewDetailsTableBody").html(htmlContent);



                    $("#lblObligationNewCount").text(count);


                    $(".openmenuObligationNew").contextMenu({ menu: 'dropdownMenuobligation', leftButton: true }, function (action, el, pos) {
                        contextMenuObligationNew(action, el.parent("i").parent("td").parent("tr"), pos);
                    });

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

function contextMenuObligationNew(action, el, pos) {

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
                    text: "Are you sure you want to delete '<span style=\"font-weight:700\">" + termTitle + "'</span>'?",
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

                     GetObligationCatalogs();

                 }
             });
         }
         return;
     });

                break;
            }
        case "edit":
            {
                $('#addEditMilestoneNew').dialog('widget').find('.ui-dialog-buttonpane .ui-button:button:contains("Add") .pop_up_Content_Green ').html("Save");
                $("#loadingPage").fadeIn();
                clearObligationFormDataNew();
                listObligationNewData = "";
                vObligationFlaging = "EDIT";

                $("#inprocessObligation").css("visibility", "hidden");
                var obligationID = $(el).find("#ObligationID").text();
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations?obligationid=' + obligationID,
                    type: 'GET',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    "Content-Type": "application/json",
                    cache: false,
                    success: function (obligationentity) {

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



                        GetValuesAndAutoPopulate("ddlSendReminderToObligationNew", obligationentity.SendReminderTo);


                        if (obligationentity.Reminder1 != null && obligationentity.Reminder1 != "" && obligationentity.Reminder1 != 0) {
                            $("#txtReminder1ObligationNew").val(obligationentity.Reminder1);
                        }
                        else {
                            $("#txtReminder1ObligationNew").val("");
                        }
                        allowOnlyNumberInInputBox("txtReminder1ObligationNew");
                        if (obligationentity.Reminder2 != null && obligationentity.Reminder2 != "" && obligationentity.Reminder2 != 0) {
                            $("#txtReminder2ObligationNew").val(obligationentity.Reminder2);
                        }
                        else {
                            $("#txtReminder2ObligationNew").val("");
                        }
                        allowOnlyNumberInInputBox("txtReminder2ObligationNew");
                        if (obligationentity.Reminder3 != null && obligationentity.Reminder3 != "" && obligationentity.Reminder3 != 0) {
                            $("#txtReminder3ObligationNew").val(obligationentity.Reminder3);
                        }
                        else {
                            $("#txtReminder3ObligationNew").val("");
                        }
                        allowOnlyNumberInInputBox("txtReminder3ObligationNew");
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

                        $("#lblCTitleObligationNew").text(obligationentity.ContractTitle)
                        var duedate = "";

                        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                        { duedate = moment(new Date(obligationentity.DueDate)).utc().format('MM/DD/YYYY'); }
                        else { duedate = moment(new Date(obligationentity.DueDate)).utc().format(localStorage.AppDateFormat); }
                        $("#txtObligationNewID").val(obligationentity.RowKey);
                        $("#txtObligationNewText").val(obligationentity.ObligationText);
                        $("#txtObligationNewTitle").val(obligationentity.ObligationTitle);
                        $("#ddlObligationTypeNew option").filter(function (index) { return $(this).text() === obligationentity.ObligationType; }).prop('selected', true);
                        $("#txtObligationNewDesc").val(obligationentity.Description);
                        GetValuesAndAutoPopulate("ddlObligationNewOwner", obligationentity.ObligationOwner);
                        //$("#dtObligationNewDueDate").val(duedate);
                        $('#dtObligationNewDueDate').datepicker('setDate', duedate);

                        $('input[type="radio"][name="PerformedParty"][value="' + obligationentity.PerformedBy + '"]').prop('checked', true);
                        $("#ddlObligationStatus option").filter(function (index) { return $(this).text() === obligationentity.ObligationStatus; }).prop('selected', true);

                        $("#ddlObligationOccurencess option").filter(function (index) { return $(this).text() === obligationentity.Recurrences; }).prop('selected', true);
                        var newDate = new Date(obligationentity.DueDate);
                        listObligationNewStartDate = $.datepicker.formatDate('mm/dd/yy', $("#dtObligationNewDueDate").datepicker('getDate'));
                        //listObligationNewStartDate = duedate;
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
                                { OMetDate = moment(new Date(obligationentity.ObligationMetDate)).utc().format('MM/DD/YYYY'); }
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

                        userFlagObli = true;


                        $("#dtOblOcurrMonthforYear").val(monthNames[newDate.getMonth()]);
                        $("#dtOblOcurrDateforYear").val(newDate.getDate());


                        $("#dtObligationNewOccurrenceDueDate").val(newDate.getDate());

                        $('input[type="radio"][name="SelectOccurenceEndDate"][value="' + obligationentity.ObligationEndTerm + '"]').prop('checked', true);

                        if (obligationentity.ObligationEndTerm == "Custom") {
                            userFlagObliCustom = true;
                            $("#txtOccurrenceCount").val(obligationentity.Ocurrences);

                        }
                        else {
                            $("#txtOccurrenceCount").val("12");
                        }

                        //var dtStartdate = obligationentity.ObligationStartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');

                        //var dtEnddate = obligationentity.ObligationEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');

                        var fObligationStartDate = "";
                        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                        { fObligationStartDate = moment(new Date(obligationentity.ObligationStartDate)).utc().format('MM/DD/YYYY'); }
                        else { fObligationStartDate = moment(new Date(obligationentity.ObligationStartDate)).utc().format(localStorage.AppDateFormat); }
                        var dtStartdate = fObligationStartDate;

                        var fObligationEndDate = "";
                        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                        { fObligationEndDate = moment(new Date(obligationentity.ObligationEndDate)).utc().format('MM/DD/YYYY'); }
                        else { fObligationEndDate = moment(new Date(obligationentity.ObligationEndDate)).utc().format(localStorage.AppDateFormat); }
                        var dtEnddate = fObligationEndDate;



                        $('#ObligationOcurrenceSummary').text("(" + dtStartdate + " to " + dtEnddate + ", " + obligationentity.Ocurrences + " instances)")

                        vObligationEditStatus = "";

                        var dateNew = new Date(obligationentity.DueDate);

                        $("input:checkbox[name=chkRecurrenceCustom]").each(function () {
                            this.checked = false;
                            var Id = this.id;
                            $("#" + Id).css('outline', '');


                        });

                        $("#lblerrorreclimitObligation").css('display', 'none');
                        var day = dateNew.getDay()
                        var chkboxId = "ORC" + day;

                        $("#" + chkboxId).prop('checked', true);


                        if (obligationentity.Recurrences == "Weekly") {


                            $("#dtObligationNewDueDate").attr("disabled", "disabled");
                            $('#dtObligationNewDueDate').css('cursor', 'no-drop');
                            $("input:checkbox[name=chkRecurrenceCustom]").each(function () {
                                this.checked = false;

                            });

                            var strRecString = obligationentity.CustomString.split(',');

                            $(strRecString).each(function (index, element) {
                                var value = parseInt(element);
                                var chkboxId = "ORC" + value;
                                $("#" + chkboxId).prop('checked', true);
                            });

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
                            $('#dtObligationNewDueDate').css('cursor', 'no-drop');

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
                            $('#dtObligationNewDueDate').css('cursor', 'no-drop');

                            $("#divOcurrenceSummary").css('display', '');
                            $("#obligationEditOcursumary").css('display', '');

                            $("#aobligationRecNoneEdit").css('display', 'none');
                            $("#aobligationRecEdit").css('display', '');
                            $("#dvobligationOcurrenceEnd").css('display', 'none');
                            $("#liObligationRecurrence").css('display', 'none');

                        }

                        $("#lblCTitleObli").text($("#lblContractTitle").text());

                        getObligationCatalogsNew(vContractID, $("#txtObligationNewText").val(), obligationentity.RowKey);

                        var foblnewdate1 = "";
                        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                        { foblnewdate1 = moment(new Date(obligationentity.DueDate)).utc().format('MM/DD/YYYY'); }
                        else { foblnewdate1 = moment(new Date(obligationentity.DueDate)).utc().format(localStorage.AppDateFormat); }
                        var oblnewdate1 = foblnewdate1;

                        var foblnewdate2 = "";
                        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                        { foblnewdate2 = moment(new Date(obligationentity.ObligationEndDate)).format('MM/DD/YYYY'); }
                        else { foblnewdate2 = moment(new Date(obligationentity.ObligationEndDate)).utc().format(localStorage.AppDateFormat); }
                        var oblnewdate2 = foblnewdate2;

                        $('#orepupdatesingle').text("");
                        $('#orepupdaterecurrence').text("");
                        $('#ornepupdatesingle').text("");
                        $('#ornepupdaterecurrence').text("");

                        $('#orepupdatesingle').text("(" + oblnewdate1 + ")");
                        $('#orepupdaterecurrence').text("(" + oblnewdate1 + " to " + oblnewdate2 + ")");
                        $('#ornepupdatesingle').text("(" + oblnewdate1 + ")");
                        $('#ornepupdaterecurrence').text("(" + oblnewdate1 + " to " + oblnewdate2 + ")");


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
                        if (obligationentity.AlertsEnabled == "Yes") {
                            $("#AlertObli").val('Yes').change();
                        }
                        else {
                            $("#AlertObli").val('No').change();
                        }
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
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/updateobligationbyId?obligationId=' + obligationID + '&obligationstatus=' + 'Upcoming',
                        type: 'POST',
                        dataType: 'json',
                        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
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
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/updateobligationbyId?obligationId=' + obligationID + '&obligationstatus=' + 'Delayed',
                        type: 'POST',
                        dataType: 'json',
                        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
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
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/updateobligationbyId?obligationId=' + obligationID + '&obligationstatus=' + 'Partial',
                    type: 'POST',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
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
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/updateobligationbyId?obligationId=' + obligationID + '&obligationstatus=' + 'Cancelled',
                    type: 'POST',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
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
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationcatalogs?obligationtext=' + obligationText + '&obligationId=' + obligationID,
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
                                clearObligationFormDataNew();
                                vObligationFlaging = "EDIT";
                                validateproducts = false;


                                $.ajax({
                                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations?obligationid=' + obligationID,
                                    type: 'GET',
                                    dataType: 'json',
                                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
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
                                            $('#dtObligationNewDueDate').css('cursor', 'no-drop');

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
                                            $('#dtObligationNewDueDate').css('cursor', 'no-drop');


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
                                            $('#dtObligationNewDueDate').css('cursor', 'no-drop');


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

                                                var url = '<input type="checkbox" id="' + catalogs[i].RowKey + '" name="MultipleObligationCatalogs" onclick="checkMultipleObligationCatalogs(this);" value="' + catalogs[i].RowKey + '">&nbsp;<a  href="javascript:void(0)" onclick="ViewObligationCatalogDetail(\'' + catalogs[i].RowKey + '\')" class="linkText">' + catalogs[i].ObligationCatalogName + '</a>&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuRelatedObligationCatalogs"/>';

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



                                                //if ($("#hdnPermission").val() != 'View' && $("#hdnPermission").val() != "" && $("#hdnPermission").val() != null)
                                                //    htmlContent += "<td><a href='javascript:void(0);' onclick='checkObligationsstatusupdateNew(this);' class='wit-btn obli_status_chang openmenuObligationCatalogStatusSettings'>" + catalogs[i].ObligationCatalogStatus + "<img class='margin_left_5px' src='/Content/Images/card.png'></a></td>";
                                                //else
                                                //    htmlContent += "<td><a href='javascript:void(0);' style='pointer-events: none;' onclick='checkObligationsstatusupdateNew(this);' class='wit-btn obli_status_chang openmenuObligationCatalogStatusSettings'>" + catalogs[i].ObligationCatalogStatus + "<img class='margin_left_5px' src='/Content/Images/card.png'></a></td>";
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
                                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/updateobligationbyId?obligationId=' + obligationID + '&obligationstatus=' + 'Complete',
                                    type: 'POST',
                                    dataType: 'json',
                                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
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
                                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/updateobligationbyId?obligationId=' + obligationID + '&obligationstatus=' + 'Complete',
                                type: 'POST',
                                dataType: 'json',
                                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
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
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/updateobligationbyId?obligationId=' + obligationID + '&obligationstatus=' + 'Complete',
                            type: 'POST',
                            dataType: 'json',
                            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
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


function contextMenuObligationCatalogStatusSettings(action, el, pos) {

    switch (action) {
        case "Upcoming":
            {
                var obligationID = $(el).find("#ObligationCatalogID").text();

                $("#inprocessObligation").css('visibility', 'visible');
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationcatalogs/updatecatalogstatus?catalogid=' + obligationID + '&status=' + 'Upcoming',
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
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationcatalogs/updatecatalogstatus?catalogid=' + obligationID + '&status=' + 'Delayed',
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
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationcatalogs/updatecatalogstatus?catalogid=' + obligationID + '&status=' + 'Partial',
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
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationcatalogs/updatecatalogstatus?catalogid=' + obligationID + '&status=' + 'Cancelled',
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


                $("#loadingPage").fadeIn();
                var catalogId = $(el).find("#ObligationCatalogID").text();
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationcatalogs?catalogid=' + obligationID,
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









function updateObligationStatusRecurrenceNew(status, obligationId, obligationText, obligationStatus) {
    if (status == "SINGLE") {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/updateobligationbyId?obligationId=' + obligationId + '&obligationstatus=' + obligationStatus,
            type: 'POST',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
            cache: false,
            success: function (person) {
                $('.ui-button-green-text').parent().removeAttr('disabled');

                GetObligationCatalogs();

            },
            complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
        });
    }
    else {

        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/updateobligationbyText?strObligationText=' + obligationText + '&obligationstatus=' + obligationStatus,
            type: 'POST',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
            cache: false,
            success: function (person) {
                $('.ui-button-green-text').parent().removeAttr('disabled');

                $("#obligationRecurrenceStatusEditPopup").dialog("close");
                GetObligationCatalogs();

            },
            complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
        });

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


var vObligationEditStatus = "";

$('#aobligationRecNoneEdit').click(function () {
    vObligationEditStatus = "CHANGERECURRENCE";
    $("#liObligationRecurrence").css('display', '');
    $("#divOcurrenceSummary").css('display', 'none');
    document.getElementById("ddlObligationOccurencess").disabled = false;
    document.getElementById("dtObligationNewDueDate").disabled = false;
    $('#dtObligationNewDueDate').css('cursor', 'auto');

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
        $('#dtObligationNewDueDate').css('cursor', 'auto');


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
        $('#dtObligationNewDueDate').css('cursor', 'auto');

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
        $('#dtObligationNewDueDate').css('cursor', 'auto');

        $("#dvobligationOcurrenceEnd").css('display', '');
        $("#liObligationRecurrence").css('display', '');
    }


    $("#aobligationRecNoneEdit").css('display', 'none');
    $("#aobligationRecEdit").css('display', 'none');

    ObligationEditBackupData();



});





function clearobligationproducts() {
    if ($('#txtObligationCatalogName').val() == "" || $('#txtObligationCatalogName').val() == null) {
        $('#txtSearchBoxProduct').val('');
        $('input:radio[name=ExtProducts]').attr('checked', false);
    }
    else {
        $('#txtSearchBoxProduct').val('');
    }

    // $('input:radio[name=ExtProducts]').attr('checked', false);
}

function clearObligationproductsmul() {
    $('#txtSearchBoxProductMul').val('');
    $('input:checkbox[name=ExtProductsMul]').removeAttr('checked');
}

function clearobligationcatalogs() {
    $('#ddlObligationCatalogStatus').val('Upcoming');
    $('#txtObligationCatalogName').val('');
    $('#txtObligationCatalogDesc').val('');
    $('#ddlObligationCatalogUnits').val('0');
    $('#txtObligationCatalogQty').val('');
    //$('#ddlObligationCatalogUnitType').val('0');

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


function clearobligationfinancials() {
    $('#ddlObligationFinancialsStatus').val('0');
    $('#txtObligationFinancialsName').val('');
    $('#txtObligationFinancialsDesc').val('');
    $('#txtObligationFinancialsAmount').val('');
    $('#ddlObligationFinancialsAmountType').val('0');
}





$('#addObligationFinancialsQuickpopup').click(function () {
    clearobligationfinancialsQuick();

});

$('#addObligationCatalogQuickpopup').click(function () {
    clearobligationcatalogsQuick();
});





function clearobligationcatalogsQuick() {
    $('#ddlObligationCatalogInlineUnitsType').val('0');
    $('#txtObligationCatalogTitleInline').val('');
    $('#txtObligationCatalogQtyInline').val('');
    $('#ddlObligationCatalogUnitsInline').val('0');
    $('#ddlObligationCatalogStatusInline').val('0');
}


function clearobligationfinancialsQuick() {
    $('#ddlObligationFinancialsInlineAmountType').val('0');
    $('#txtObligationFinancialsTitleInline').val('');
    $('#txtObligationFinancialAmountInline').val('');
    $('#ddlObligationFinancialsStatusInline').val('0');
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

    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "10" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        $('#trObliCatShow').css('display', '');
    }
    $('#trObliFinShow').css('display', 'none')



    $("#txtReminder1ObligationNew").val("");
    $("#txtReminder2ObligationNew").val("");
    $("#txtReminder3ObligationNew").val("");
    $("#ddlReminder1ObligationNew").val("before");
    $("#ddlReminder2ObligationNew").val("before");
    $("#ddlReminder3ObligationNew").val("before");




    $('#ddlObligationOccurencess').val('None');

    $('input:checkbox[name=ObligationFinancialCB]').attr('checked', false);

    $('input:checkbox[name=ObligationCatalogCB]').attr('checked', false);



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


    //$('#dvObliOccurrenceDates').css('display', 'none');
}

var multipleObligationNewChecks = "";
function checkMultipleObligationsNew(object) {
    var CatalogID = object.id
    var isChecked = object.checked;
    if (isChecked) {
        $("#obligationNewActions").css('display', '');

        multipleObligationNewChecks = multipleObligationNewChecks + ';' + CatalogID;
    } else {
        multipleObligationNewChecks = multipleObligationNewChecks.replace(';' + CatalogID, '');
    }

    if (multipleObligationNewChecks.trim() == "") {
        $("#obligationNewActions").css('display', 'none');

    }
    try {
        hideAllMenuAndStopPro(event);
    }
    catch (ex) {

    }
}




function contextMenuObligationNewMul(action, el, pos) {
    switch (action) {
        case "delete":
            {
                swal({
                    title: '',
                    text: "Are you sure you want to '<span style=\"font-weight:700\">delete</span>' Items?",
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
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew?strObligationText=' + multipleObligationNewChecks,
                 type: 'DELETE',
                 dataType: 'json',
                 headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                 cache: false,
                 success: function (data) {
                     multipleObligationNewChecks = "";

                     GetObligationCatalogs();
                     $("#obligationNewActions").css('display', 'none');


                     $("#loadingPage").fadeOut();
                 }
             });
         }
         return;
     });

                break;
            }
        case "update":
            {
                $("input:radio[value='Upcoming']").attr('checked', true);
                showObligationStatusMultiple();
                break;
            }

    }
}

function BindUnitTypes() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/unittypes',
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

        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
        { CDate = moment(new Date(CDate)).format('MM/DD/YYYY'); }
        else { CDate = moment(new Date(CDate)).format(localStorage.AppDateFormat); }
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

        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
        { CDate = moment(new Date(CDate)).format('MM/DD/YYYY'); }
        else { CDate = moment(new Date(CDate)).format(localStorage.AppDateFormat); }

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
        $('#dtObligationProductCompletedDate').removeClass('validelement');
        $('#dtObligationProductCompletedDate').removeClass('validdate');
        $('#dtObligationProductCompletedDate').val("");


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








$("#ddlObligationCatalogStatusEdit").change(function (obj) {

    var catlogStatus = $("#ddlObligationCatalogStatusEdit").val();
    if (catlogStatus == "Complete") {

        var CDate = new Date();
        CDate = formatDate(CDate);

        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
        { CDate = moment(new Date(CDate)).format('MM/DD/YYYY'); }
        else { CDate = moment(new Date(CDate)).format(localStorage.AppDateFormat); }

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

        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
        { CDate = moment(new Date(CDate)).format('MM/DD/YYYY'); }
        else { CDate = moment(new Date(CDate)).format(localStorage.AppDateFormat); }

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


$('#cbObligationCatalogProductsSelect').click(function () {

    if ($("#cbObligationCatalogProductsSelect").is(':checked'))
        $("#trObliFinShow").css('display', 'none');  // checked
    else
        $("#trObliFinShow").css('display', 'none');
});

$('#cbObligationCatalogFinancialsSelect').click(function () {

    if ($("#cbObligationCatalogFinancialsSelect").is(':checked'))
        $("#trObliCatShow").css('display', 'none');  // checked
    else
        $("#trObliCatShow").css('display', '');
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

function BindObligationTypes() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligationtypes',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (documenttypes) {
            $(documenttypes).each(function (i, item) {
                $("#ddlObligationType").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>");
                $("#ddlObligationTypeNew").append("<option value='" + item.TypeName + "'>" + item.TypeName + "</option>")
            });
        }
    });
}

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
    GetValuesAndAutoPopulate("ddlObligationOwner", $("#licontractmanagers").text());


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
                    text: "Are you sure you want to delete '<span style=\"font-weight:700\">" + termTitle + "</span>'?",
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

                $("#inprocessObligation").css("visibility", "hidden");
                var obligationID = $(el).find("#ObligationID").text();
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations?obligationid=' + obligationID,
                    type: 'GET',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    "Content-Type": "application/json",
                    cache: false,
                    success: function (obligationentity) {

                        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                        { duedate = moment(new Date(obligationentity.DueDate)).utc().format('MM/DD/YYYY'); }
                        else { duedate = moment(new Date(obligationentity.DueDate)).utc().format(localStorage.AppDateFormat); }

                        $("#txtObligationID").val(obligationentity.RowKey);
                        $("#txtObligationTitle").val(obligationentity.ObligationTitle);
                        $("#ddlObligationType option").filter(function (index) { return $(this).text() === obligationentity.ObligationType; }).prop('selected', true);
                        $("#txtObligationDesc").val(obligationentity.Description);
                        GetValuesAndAutoPopulate("ddlObligationOwner", obligationentity.ObligationOwner);
                        $("#dtDueDate").val(duedate);
                        $('input[type="radio"][name="ObligationMet"][value="' + obligationentity.ObligationMet + '"]').prop('checked', true);

                        if (obligationentity.AlertsEnabled == "Yes") {
                            $("#AlertObli").val('Yes').change();
                            $("#reminderEnableObligation").empty();
                            $("#reminderEnableObligation").append("Reminders");
                        }
                        else {
                            $("#AlertObli").val('No').change();
                            $("#reminderEnableObligation").empty();
                            $("#reminderEnableObligation").append("Reminders <span style='color: red;margin-left: 23%'>To turn ON reminders for obligation notifications, click <a href='javascript:void(0);' id='enableOSwitch' onclick='enableObligationSwitch()'>Enable</a></span>");

                        }
                    }
                });

                $("#lblCTitleObli").text($("#lblContractTitle").text());
                $(".validelement").each(function (index, element) {
                    $(element).removeClass("error");
                    $("#errormsg_" + element.id).remove();
                });
                $("#PerformedPartySelf").css("display", "inline");
                $("#PerformedPartyCounterparty").css("display", "inline");
                $("#addEditObligation").dialog("option", "title", "Edit Obligation");
                $("#addEditObligation").dialog("open");
                break;
            }
    }
}

function ViewObligationDetail(obligationID) {
    $("#loadingPage").fadeIn();
    //$('#dvMilObgMetadata').html('<tr><td><img src="../Content/Images/icon/loading.gif"/></td></tr>');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations?obligationid=' + obligationID,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
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
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones/ownersfromgroup?contractid=' + obligationentity.ContractID + '&milestoneonwers=' + obligationentity.ObligationOwner,
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

function modalOnOpenObligation(dialog) {
    $('.ui-button-green-text').parent().attr('disabled', 'disabled');
    var isformvalid = false;
    if (requiredValidator('addNewObligation')) {
        isformvalid = true;
        var strContractID = getParameterByName('ContractID');
        var ObligationID = $("#txtObligationID").val();
        var arrObligationOwner = $("#ddlObligationOwner").val();
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

        } else if (ObligationID != "") {
            $("#inprocessObligation").css('visibility', 'visible');
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
                    DueDate: $.datepicker.formatDate('mm/dd/yy', $("#dtDueDate").datepicker('getDate')),
                    ObligationMet: $('input[type="radio"][name=ObligationMet]:checked').val(),
                    ModifiedBy: localStorage.UserName
                },
                cache: false,
                success: function (person) {
                    $('.ui-button-green-text').parent().removeAttr('disabled');

                    $("#addEditObligation").dialog("close");

                    BindObligations();
                },
                complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
            });
        }
        else {
            $("#inprocessObligation").css('visibility', 'visible');
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
                    DueDate: $.datepicker.formatDate('mm/dd/yy', $("#dtDueDate").datepicker('getDate')),
                    ObligationMet: $('input[type="radio"][name=ObligationMet]:checked').val(),
                    CreatedBy: localStorage.UserName,
                    ModifiedBy: localStorage.UserName

                },
                cache: false,
                success: function (person) {
                    $('.ui-button-green-text').parent().removeAttr('disabled');


                    if (vObligationFlaging == "EDIT") {

                    }
                    else {

                    }



                    $("#addEditObligation").dialog("close");
                    $("#obligationInline").slideToggle();
                    BindObligations();
                },
                complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
            });
        }
    }
    else {
        $('.ui-button-green-text').parent().removeAttr('disabled');
    }
    return isformvalid;
}

// Catalog Related Methods
function ViewCommitments(catalogId, catalogTitle, catalogCommitment) {
    $("#loadingPage").fadeIn();
    $("#tblCommitmentMetadataDetail").empty();
    $('#tblCommitmentMetadataDetail').append('<tr><td><img src="../Content/Images/icon/loading.gif"/></td></tr>');

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/Commitments?commitmentid=' + catalogCommitment,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
        "Content-Type": "application/json",
        cache: false,
        success: function (commitmententity) {

            $("#loadingPage").fadeOut();

            if (commitmententity != null) {

                var vMetadata = '<tr>';
                vMetadata += '<td class="text_label width50" style="font-size:14px;">Catalog Title</td>';
                vMetadata += '<td class="text width50" style="font-size:14px;">' + catalogTitle + '</td>';
                vMetadata += '</tr>';
                vMetadata += '<tr>';
                vMetadata += '<td class="text_label width50" style="font-size:14px;">Volume / Quantity Commitments </td>';
                vMetadata += '<td class="text width50" style="font-size:14px;">' + commitmententity.QuantityCommitment + '</td>';
                vMetadata += '</tr>';

                if (commitmententity.QuantityCommitment == "Yes") {

                    vMetadata += '<tr>';
                    vMetadata += '<td class="text_label width50" style="font-size:14px;">Minimum Quantity (Units) </td>';
                    vMetadata += '<td class="text width50" style="font-size:14px;">' + commitmententity.QuantityMin + '</td>';
                    vMetadata += '</tr>';
                    vMetadata += '<tr>';
                    vMetadata += '<td class="text_label width50" style="font-size:14px;">Maximum Quantity (Units) </td>';
                    vMetadata += '<td class="text width50" style="font-size:14px;">' + commitmententity.QuantityMax + '</td>';
                    vMetadata += '</tr>';
                    vMetadata += '<tr>';
                    vMetadata += '<td class="text_label width50" style="font-size:14px;">Period / Frequency </td>';
                    vMetadata += '<td class="text width50" style="font-size:14px;">' + commitmententity.QuantityPeriod + '</td>';
                    vMetadata += '</tr>';

                }

                vMetadata += '<tr>';
                vMetadata += '<td class="text_label width50" style="font-size:14px;">Amount / Price Commitments </td>';
                vMetadata += '<td class="text width50" style="font-size:14px;">' + commitmententity.PriceCommitment + '</td>';
                vMetadata += '</tr>';

                if (commitmententity.PriceCommitment == "Yes") {

                    vMetadata += '<tr>';
                    vMetadata += '<td class="text_label width50" style="font-size:14px;">Minimum Amount (USD) </td>';
                    vMetadata += '<td class="text width50" style="font-size:14px;">' + commitmententity.PriceMin + '</td>';
                    vMetadata += '</tr>';
                    vMetadata += '<tr>';
                    vMetadata += '<td class="text_label width50" style="font-size:14px;">Maximum Amount (USD) </td>';
                    vMetadata += '<td class="text width50" style="font-size:14px;">' + commitmententity.PriceMax + '</td>';
                    vMetadata += '</tr>';
                    vMetadata += '<tr>';
                    vMetadata += '<td class="text_label width50" style="font-size:14px;">Period / Frequency </td>';
                    vMetadata += '<td class="text width50" style="font-size:14px;">' + commitmententity.PricePeriod + '</td>';
                    vMetadata += '</tr>';

                }
                vMetadata += '<tr>';
                vMetadata += '<td class="text_label width50" style="font-size:14px;">Commitment Met ? </td>';
                vMetadata += '<td class="text width50" style="font-size:14px;">' + commitmententity.CommitmentMet + '</td>';
                vMetadata += '</tr>';
                $("#tblCommitmentMetadataDetail").html(vMetadata);
                setBlankValueToHyphen("tblCommitmentMetadataDetail");
                $("#commitmentViewPopup").dialog("option", "title", "View Commitments");
                $("#commitmentViewPopup").dialog("open");



            }
        },
        error: function (commitmententity) {

            $("#loadingPage").fadeOut();
        }
    });

}

function contextMenuCatalogs(action, el, pos) {

    switch (action) {
        case "view":
            {
                var catalogId = $(el).find("#CatalogID").text();
                ViewCatalogDetail(catalogId);
                break;
            }
        case "delete":
            {
                var catalogTitle = $(el).find("#CatalogTitle").text();
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
             var catalogId = $(el).find("#CatalogID").text();
             $.ajax({
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/catalogs?catalogid=' + catalogId,
                 type: 'DELETE',
                 dataType: 'json',
                 headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                 "Content-Type": "application/json",
                 cache: false,
                 success: function (data) {
                     swal("", "Item Deleted");
                     getCatalogsbycontract(vContractID);
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
                var catalogId = $(el).find("#CatalogID").text();
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/catalogs?catalogid=' + catalogId,
                    type: 'GET',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    "Content-Type": "application/json",
                    cache: false,
                    success: function (cataloentity) {
                        $("#lblCatalogCTitleEdit").text($("#lblContractTitle").text());

                        var validTill = "";
                        if (cataloentity.ValidUpto != null && cataloentity.ValidUpto != "") {
                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                            { validTill = moment(new Date(cataloentity.ValidUpto)).format('MM/DD/YYYY'); }
                            else { validTill = moment(new Date(cataloentity.ValidUpto)).format(localStorage.AppDateFormat); }

                        }

                        $("#txtCatalogIDedit").val(cataloentity.RowKey);
                        $("#txtCatalogNameedit").val(cataloentity.CatalogName);
                        $("#txtCatalogUnitPriceedit").val(cataloentity.UnitPriceValue);

                        if (cataloentity.UnitPriceCurrency == "") {
                            if ($("#hdnBaseCurrency").val() == "")
                                $("#ddlCatalogCurrencyedit").val("0");
                            else
                                $("#ddlCatalogCurrencyedit").val($("#hdnBaseCurrency").val());
                        }
                        else
                            $("#ddlCatalogCurrencyedit").val(cataloentity.UnitPriceCurrency);

                        $("#txtCatalogUnitsedit").val(cataloentity.Units);
                        $("#dtCatalogValidTilledit").val(validTill);
                    },
                    complete: function () {
                        $("#loadingPage").fadeOut();
                    }
                });


                $("#catalogseditPopup").dialog("option", "title", "Edit Catalog");
                $("#catalogseditPopup").dialog("open");
                break;
            }

        case "manage":
            {
                $("#loadingPage").fadeIn();
                var catalogId = $(el).find("#CatalogID").text();
                var catalogTitle = $(el).find("#CatalogTitle").text();
                var catalogCommitment = $(el).find("#CatalogCommitment").text();
                var catalogUnits = $(el).find("#CatalogUnits").text();
                var catalogCurrency = $(el).find("#CatalogCurrency").text();

                $("#lblminQty").text("");
                $("#lblmaxQty").text("");
                $("#lblminQtyEdit").text("");
                $("#lblmaxQtyEdit").text("");
                $("#lblminAmount").text("");
                $("#lblmaxAmount").text("");
                $("#lblminAmountEdit").text("");
                $("#lblmaxAmountEdit").text("");

                if (catalogUnits != "" && catalogUnits != null) {
                    $("#lblminQty").text(catalogUnits);
                    $("#lblmaxQty").text(catalogUnits);
                    $("#lblminQtyEdit").text(catalogUnits);
                    $("#lblmaxQtyEdit").text(catalogUnits);
                }

                if (catalogCurrency != "" && catalogCurrency != null) {
                    $("#lblminAmount").text(catalogCurrency);
                    $("#lblmaxAmount").text(catalogCurrency);
                    $("#lblminAmountEdit").text(catalogCurrency);
                    $("#lblmaxAmountEdit").text(catalogCurrency);
                }

                if (catalogCommitment != "") {
                    var commitmentId = catalogCommitment;

                    $("#lblCommitmentCatalogTitleEdit").text(catalogTitle);
                    $("#lblCommitmentCatalogIDEdit").text(catalogId);
                    $("#txtCommitmentIDedit").val(commitmentId);

                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/Commitments?commitmentid=' + commitmentId,
                        type: 'GET',
                        dataType: 'json',
                        headers: { 'eContracts-ApiKey': localStorage.APIKey },
                        "Content-Type": "application/json",
                        cache: false,
                        success: function (commitmententity) {
                            $("#loadingPage").fadeOut();

                            if (commitmententity.PriceCommitment == "Yes") {

                                document.getElementById('trMinPriceEdit').style.display = '';
                                document.getElementById('trMaxPriceEdit').style.display = '';
                                document.getElementById('trPricePeriodEdit').style.display = '';

                                $('input:radio[id=rdCommitmentsPriceYesEdit]').attr('checked', true);

                                if (commitmententity.PricePeriod == "Contract Validity") {
                                    $('input:radio[id=rdCommitmentPriceFrequencyValidityEdit]').attr('checked', true);
                                }
                                else if (commitmententity.PricePeriod == "Each Transaction") {
                                    $('input:radio[id=rdCommitmentPriceFrequencyTransactionEdit]').attr('checked', true);
                                }
                                else {
                                    $('input:radio[id=rdCommitmentPriceFrequencyTimeEdit]').attr('checked', true);
                                    $('#ddlCommitmentAmountDurationEdit').val(commitmententity.PricePeriod);
                                }

                                $("#txtCommitmentsMinAmountUnitPriceEdit").val(commitmententity.PriceMin);
                                $("#txtCommitmentsMaxAmountUnitPriceEdit").val(commitmententity.PriceMax);




                            }
                            else {

                                document.getElementById('trMinPriceEdit').style.display = 'none';
                                document.getElementById('trMaxPriceEdit').style.display = 'none';
                                document.getElementById('trPricePeriodEdit').style.display = 'none';


                                $('input:radio[id=rdCommitmentsPriceNoEdit]').attr('checked', true);

                                if (commitmententity.PricePeriod == "Contract Validity") {
                                    $('input:radio[id=rdCommitmentPriceFrequencyValidityEdit]').attr('checked', true);
                                }
                                else if (commitmententity.PricePeriod == "Each Transaction") {
                                    $('input:radio[id=rdCommitmentPriceFrequencyTransactionEdit]').attr('checked', true);
                                }
                                else if (commitmententity.PricePeriod == "") {
                                    $('input:radio[id=rdCommitmentPriceFrequencyTimeEdit]').attr('checked', true);
                                    $('#ddlCommitmentAmountDurationEdit').val("Monthly");
                                }
                                else {
                                    $('input:radio[id=rdCommitmentPriceFrequencyTimeEdit]').attr('checked', true);
                                    $('#ddlCommitmentAmountDurationEdit').val(commitmententity.PricePeriod);
                                }

                                $("#txtCommitmentsMinAmountUnitPriceEdit").val("");
                                $("#txtCommitmentsMaxAmountUnitPriceEdit").val("");
                            }



                            if (commitmententity.QuantityCommitment == "Yes") {

                                document.getElementById('trMinQtyEdit').style.display = '';
                                document.getElementById('trMaxQtyEdit').style.display = '';
                                document.getElementById('trQtyPeriodEdit').style.display = '';

                                $('input:radio[id=rdCommitmentsQuantityYes]').attr('checked', true)

                                if (commitmententity.QuantityPeriod == "Contract Validity") {
                                    $('input:radio[id=rdCommitmentQtyFrequencyValidityEdit]').attr('checked', true);
                                }
                                else if (commitmententity.QuantityPeriod == "Each Transaction") {
                                    $('input:radio[id=rdCommitmentQtyFrequencyTransactionEdit]').attr('checked', true);
                                }
                                else {
                                    $('input:radio[id=rdCommitmentQtyFrequencyTimeEdit]').attr('checked', true);
                                    $('#ddlCommitmentQtyDurationEdit').val(commitmententity.QuantityPeriod);
                                }

                                $("#txtCommitmentsMinQtyUnitsEdit").val(commitmententity.QuantityMin);
                                $("#txtCommitmentsMaxQtyUnitsEdit").val(commitmententity.QuantityMax);

                            }
                            else {

                                document.getElementById('trMinQtyEdit').style.display = 'none';
                                document.getElementById('trMaxQtyEdit').style.display = 'none';
                                document.getElementById('trQtyPeriodEdit').style.display = 'none';

                                $('input:radio[id=rdCommitmentsQuantityNoEdit]').attr('checked', true);

                                if (commitmententity.QuantityPeriod == "Contract Validity") {
                                    $('input:radio[id=rdCommitmentQtyFrequencyValidityEdit]').attr('checked', true);
                                }
                                else if (commitmententity.QuantityPeriod == "Each Transaction") {
                                    $('input:radio[id=rdCommitmentQtyFrequencyTransactionEdit]').attr('checked', true);
                                }
                                else if (commitmententity.QuantityPeriod == "") {
                                    $('input:radio[id=rdCommitmentQtyFrequencyTimeEdit]').attr('checked', true);
                                    $('#ddlCommitmentQtyDurationEdit').val("Monthly");
                                }
                                else {
                                    $('input:radio[id=rdCommitmentQtyFrequencyTimeEdit]').attr('checked', true);
                                    $('#ddlCommitmentQtyDurationEdit').val(commitmententity.QuantityPeriod);
                                }

                                $("#txtCommitmentsMinQtyUnitsEdit").val("");
                                $("#txtCommitmentsMaxQtyUnitsEdit").val("");
                            }

                            if (commitmententity.CommitmentMet == "Yes") {
                                $('input:radio[id=rdCommitmentMetEditYes]').attr('checked', true);
                            }
                            else {
                                $('input:radio[id=rdCommitmentMetEditNo]').attr('checked', true);
                            }






                        },
                        complete: function () {
                            $("#loadingPage").fadeOut();
                        }
                    });




                    $("#commitmenteditPopup").dialog("option", "title", "Manage Commitment");
                    $("#commitmenteditPopup").dialog("open");
                }
                else {
                    $("#loadingPage").fadeOut();
                    $("#lblCommitmentCatalogTitle").text(catalogTitle);
                    $("#lblCommitmentCatalogID").text(catalogId);

                    $('input:radio[id=rdCommitmentsQuantityNo]').attr('checked', true);
                    $('input:radio[id=rdCommitmentsPriceNo]').attr('checked', true);
                    $('input:radio[id=rdCommitmentPriceFrequencyTime]').attr('checked', true);
                    $('input:radio[id=rdCommitmentQtyFrequencyTime]').attr('checked', true);

                    document.getElementById('trminQty').style.display = 'none';
                    document.getElementById('trmaxQty').style.display = 'none';
                    document.getElementById('trQtyPeriod').style.display = 'none';
                    document.getElementById('trMinPrice').style.display = 'none';
                    document.getElementById('trMaxPrice').style.display = 'none';
                    document.getElementById('trPricePeriod').style.display = 'none';

                    $("#txtCommitmentsMinQtyUnits").val('');
                    $("#txtCommitmentsMaxQtyUnits").val('');
                    $("#txtCommitmentsMinAmountUnitPrice").val('');
                    $("#txtCommitmentsMaxAmountUnitPrice").val('');

                    $('#ddlCommitmentQtyDuration').val("Monthly");
                    $('#ddlCommitmentAmountDuration').val("Monthly");


                    $("#CommitmentAddPopup").dialog("option", "title", "Manage Commitment");
                    $("#CommitmentAddPopup").dialog("open");
                }


                break;
            }
    }
}



$("input[name='QtyCommitments']").on({
    'change': function () {
        $.each($("input[name='QtyCommitments']"),
                function () {
                    var ObjectId, ObjectValue;

                    if ($(this).is(':checked')) {


                        console.log(this);
                        ObjectId = $(this).attr('id');
                        ObjectValue = $(this).val();
                        if (ObjectValue == "No") {

                            document.getElementById('trminQty').style.display = 'none';
                            document.getElementById('trmaxQty').style.display = 'none';
                            document.getElementById('trQtyPeriod').style.display = 'none';

                        }
                        else {

                            document.getElementById('trminQty').style.display = '';
                            document.getElementById('trmaxQty').style.display = '';
                            document.getElementById('trQtyPeriod').style.display = '';
                        }


                    }

                }
              );
    }
});


$("input[name='PriceCommitments']").on({
    'change': function () {
        $.each($("input[name='PriceCommitments']"),
                function () {
                    var ObjectId, ObjectValue;

                    if ($(this).is(':checked')) {


                        console.log(this);
                        ObjectId = $(this).attr('id');
                        ObjectValue = $(this).val();
                        if (ObjectValue == "No") {

                            document.getElementById('trMinPrice').style.display = 'none';
                            document.getElementById('trMaxPrice').style.display = 'none';
                            document.getElementById('trPricePeriod').style.display = 'none';

                        }
                        else {

                            document.getElementById('trMinPrice').style.display = '';
                            document.getElementById('trMaxPrice').style.display = '';
                            document.getElementById('trPricePeriod').style.display = '';
                        }


                    }

                }
              );
    }
});



$("input[name='QtyCommitmentsEdit']").on({
    'change': function () {
        $.each($("input[name='QtyCommitmentsEdit']"),
                function () {
                    var ObjectId, ObjectValue;

                    if ($(this).is(':checked')) {


                        console.log(this);
                        ObjectId = $(this).attr('id');
                        ObjectValue = $(this).val();
                        if (ObjectValue == "No") {

                            document.getElementById('trMinQtyEdit').style.display = 'none';
                            document.getElementById('trMaxQtyEdit').style.display = 'none';
                            document.getElementById('trQtyPeriodEdit').style.display = 'none';

                        }
                        else {

                            document.getElementById('trMinQtyEdit').style.display = '';
                            document.getElementById('trMaxQtyEdit').style.display = '';
                            document.getElementById('trQtyPeriodEdit').style.display = '';
                        }


                    }

                }
              );
    }
});


$("input[name='PriceCommitmentsEdit']").on({
    'change': function () {
        $.each($("input[name='PriceCommitmentsEdit']"),
                function () {
                    var ObjectId, ObjectValue;

                    if ($(this).is(':checked')) {


                        console.log(this);
                        ObjectId = $(this).attr('id');
                        ObjectValue = $(this).val();
                        if (ObjectValue == "No") {

                            document.getElementById('trMinPriceEdit').style.display = 'none';
                            document.getElementById('trMaxPriceEdit').style.display = 'none';
                            document.getElementById('trPricePeriodEdit').style.display = 'none';

                        }
                        else {

                            document.getElementById('trMinPriceEdit').style.display = '';
                            document.getElementById('trMaxPriceEdit').style.display = '';
                            document.getElementById('trPricePeriodEdit').style.display = '';
                        }


                    }

                }
              );
    }
});







function ViewCatalogDetail(catalogid) {
    $("#loadingPage").fadeIn();
    $("#tblCatalogMetadataDetail").empty();
    $('#tblCatalogMetadataDetail').append('<tr><td><img src="../Content/Images/icon/loading.gif"/></td></tr>');

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/catalogs?catalogid=' + catalogid,
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
                vMetadata += '<td class="text width60">' + catalogentity.CatalogName + '</td>';
                vMetadata += '</tr>';
                vMetadata += '<tr>';
                vMetadata += '<td class="text_label width40">Units </td>';
                vMetadata += '<td class="text width60">' + catalogentity.Units + '</td>';
                vMetadata += '</tr>';
                vMetadata += '<tr>';
                vMetadata += '<td class="text_label width40">Units Price</td>';
                vMetadata += '<td class="text width60">';
                if (catalogentity.UnitPriceValue != '') {
                    vMetadata += catalogentity.UnitPriceValue + " " + catalogentity.UnitPriceCurrency;
                }
                vMetadata += '</td>';
                vMetadata += '</tr>';
                vMetadata += '<tr>';
                vMetadata += '<td class="text_label width40">Valid Till</td>';
                if (catalogentity.ValidUpto != null) {
                    var vDueDate = "";
                    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                    { vDueDate = moment(new Date(catalogentity.ValidUpto)).format('MM/DD/YYYY'); }
                    else { vDueDate = moment(new Date(catalogentity.ValidUpto)).format(localStorage.AppDateFormat); }
                    vMetadata += '<td class="text width60">' + vDueDate + '</td>';
                }
                vMetadata += '</tr>';


                $("#tblCatalogMetadataDetail").empty();
                $("#tblCatalogMetadataDetail").append(vMetadata);
                setBlankValueToHyphen("tblCatalogMetadataDetail");
                $("#catalogsViewPopup").dialog("option", "title", "View Catalog");
                $("#catalogsViewPopup").dialog("open");
                $("#catalogsViewPopup").height("auto");



            }
        }
    });
}

function getCatalogsbycontract(contractid) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/catalogs?contractid=' + contractid,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {

            $("#catalogDetailsTableBody").empty();
            if (data.length > 0) {
                document.getElementById('catalogDetailsTable').style.display = '';
                document.getElementById('NoCatalogDetails').style.display = 'none';
                for (var i = 0; i < data.length; i++) {
                    var str = "";
                    var strCommitment = "";
                    var strCom = "";

                    if (data[i].CommitmentID != null && data[i].CommitmentID != "") {
                        var color = "";
                        if (data[i].CommitmentMet != null) {
                            if (data[i].CommitmentMet == "Yes") {
                                color = '#01DF01';

                            }
                            else {
                                color = '#FF0000';
                            }


                        }
                        else {


                            color = '#FF0000';
                        }

                        var options = "";

                        if (data[i].CommitmentMet == "Yes") {
                            options += '<option style="width:60px;background-color:#01DF01;" selected value="Yes">Yes</option>';
                            options += '<option  style="width:60px;background-color:#FF0000;" value="No">No</option>';
                        }
                        else {
                            options += '<option style="width:60px;background-color:#01DF01;"  value="Yes">Yes</option>';
                            options += '<option  style="width:60px;background-color:#FF0000;" selected value="No">No</option>';
                        }


                        str = '<select id="ddl' + data[i].RowKey + '" style="background-color:' + color + ';" onchange="SelectedCommitmentMet(this);" >';
                        str += options;
                        str += '</select>';




                        strCom = '<a href="javascript:void(0)" onclick="ViewCommitments(\'' + data[i].RowKey + '\',\'' + data[i].CatalogName + '\',\'' + data[i].CommitmentID + '\')">View</a>';
                        strCommitment = data[i].CommitmentID;
                    }
                    else {
                        str = "-";
                        strCom = "-";
                        strCommitment = "";
                    }

                    var validDate = ""
                    if (data[i].ValidUpto != null && data[i].ValidUpto != "") {
                        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                        { validDate = moment(new Date(data[i].ValidUpto)).format('MM/DD/YYYY'); }
                        else { validDate = moment(new Date(data[i].ValidUpto)).format(localStorage.AppDateFormat); }
                    }


                    var url = '<input type="checkbox" id="' + data[i].RowKey + '" name="MultipleCatalogs" onclick="checkMultipleCatalogs(this);" value="' + data[i].RowKey + '">&nbsp;<a  href="javascript:void(0)" onclick="ViewCatalogDetail(\'' + data[i].RowKey + '\')" class="linkText">' + data[i].CatalogName + '</a>&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuRelatedCatalogs"/>';
                    url += '&nbsp;<a id="aEdit' + data[i].RowKey + '" href="javascript:void(0);" class="title-edit-btn close1" onclick="MakeCatalogEditable(\'' + data[i].RowKey + '\')"><img src="/Content/Images/edit.png"></a>';

                    url += '&nbsp;<a id="aSave' + data[i].RowKey + '" href="javascript:void(0);" style="display:none;" class="title-edit-btn close1" onclick="MakeCatalogSave(this)"><img src="/Content/Images/save.png"></a>';

                    url += '&nbsp;<a id="aCancel' + data[i].RowKey + '" href="javascript:void(0);" style="display:none;" class="title-edit-btn close1" onclick="MakeCatalogCancel(\'' + data[i].RowKey + '\')"><img src="/Content/Images/Cancel_Task.png"></a></i>';



                    var htmlContent = "<tr>";
                    htmlContent += "<td  ><span>&nbsp;</span><p id='CatalogID' style='display:none;'>" + data[i].RowKey + "</p>";
                    htmlContent += "<span id='CatalogTitle' style='display:none;'>" + data[i].CatalogName + "</span>";
                    htmlContent += "<span id='CatalogCommitment' style='display:none;'>" + strCommitment + "</span>";
                    htmlContent += "<span id='CatalogUnits' style='display:none;'>" + data[i].Units + "</span>";
                    htmlContent += "<span id='CatalogCurrency' style='display:none;'>" + data[i].UnitPriceCurrency + "</span>";

                    htmlContent += "<i>" + url + "</i></td>";
                    htmlContent += "<td ><span id='Units" + data[i].RowKey + "'>" + data[i].Units + "</span></td>";
                    htmlContent += "<td ><lable style='width:36px;' id='Price" + data[i].RowKey + "'>" + data[i].UnitPriceValue + "</lable>&nbsp;<lable>" + data[i].UnitPriceCurrency + "</lable></td>";
                    htmlContent += "<td >" + strCom + "</td>";
                    htmlContent += "<td >" + str + "</td>";
                    htmlContent += "<td style='width:18%;' ><lable id='lblvalid" + data[i].RowKey + "'>" + validDate + "</lable><input  id='txtvalid" + data[i].RowKey + "' type='text' style='display:none;width:100px;' value='" + validDate + "'></td>"
                    htmlContent += "</tr>";
                    $("#catalogDetailsTableBody").append(htmlContent);

                }
                $(".openmenuRelatedCatalogs").contextMenu({ menu: 'dropdownMenuRelatedCatalogs', leftButton: true }, function (action, el, pos) {
                    contextMenuCatalogs(action, el.parent("i").parent("td").parent("tr"), pos);
                });

            }
            else {
                document.getElementById('catalogDetailsTable').style.display = 'none';
                document.getElementById('NoCatalogDetails').style.display = '';
            }
            $("#lblCatalogsCount").text(data.length);

        },
        error: function (data) {
            vExist = false;
            $("#lblCatalogsCount").text('0');
        }
    });

}

function MakeCatalogEditable(rowkey) {
    $("#aEdit" + rowkey).css('display', 'none');
    $("#aCancel" + rowkey).css('display', '');
    $("#aSave" + rowkey).css('display', '');

    $("#Units" + rowkey).attr('contentEditable', true);
    $("#valid" + rowkey).attr('contentEditable', true);
    $("#Price" + rowkey).attr('contentEditable', true);


    $("#Units" + rowkey).css({


        "padding": "0px 3px",
        "line-height": "17px",
        "border": "1px solid #ddd",
        "background-color": "#eee"

    }).focus();
    $("#Price" + rowkey).css({

        "border": "1px solid #ddd",
        "vertical-align": "top",
        "background-color": "#eee",
        "padding": "2px 2px 2px 3px",
        "width": "30px",
        "display": "inline-block",
        "margin-top": "-2px"


    });
    $("#txtvalid" + rowkey).css('display', '');
    $("#txtvalid" + rowkey).css({
        "width": "100px",
        "border": "1px solid #ddd",
        "padding": "3px 5px"
    });
    $("#lblvalid" + rowkey).css('display', 'none');
    $("#txtvalid" + rowkey).datepicker();

}

function MakeCatalogSave(obj) {
    $("#loadingPage").fadeIn();
    var vCatalogId = $(obj).parent("i").parent("td").parent("tr").find("#CatalogID").text();
    var vCatalogTitle = $(obj).parent("i").parent("td").parent("tr").find("#CatalogTitle").text();
    var catalogForm = "CatalogName=" + vCatalogTitle;

    catalogForm += "&Units=" + $("#Units" + vCatalogId).text();
    catalogForm += "&ContractID=" + vContractID;
    catalogForm += "&AccountID=" + localStorage.AccountID;
    catalogForm += "&ModifiedBy=" + localStorage.UserName;
    catalogForm += "&UnitPriceValue=" + $("#Price" + vCatalogId).text();
    catalogForm += "&ValidUpto=" + $("#txtvalid" + vCatalogId).val();
    catalogForm += "&TotalPriceValue=" + "";
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/catalogsquick?catalogid=' + vCatalogId,
        type: 'POST',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        data: catalogForm,
        cache: false,
        success: function (data) {
            $("#loadingPage").fadeOut();

            getCatalogsbycontract(vContractID);


        },
        error: function (data) {
            $("#loadingPage").fadeOut();
        }
    });



}

function MakeCatalogCancel(rowkey) {


    $("#aEdit" + rowkey).css('display', '');
    $("#aCancel" + rowkey).css('display', 'none');
    $("#aSave" + rowkey).css('display', 'none');

    $("#Units" + rowkey).attr('contentEditable', false);
    $("#valid" + rowkey).attr('contentEditable', false);
    $("#Price" + rowkey).attr('contentEditable', false);


    $("#Units" + rowkey).css({
        "border": "",
        "background-color": ""

    }).focus();
    $("#Price" + rowkey).css({

        "border": "",
        "vertical-align": "",
        "background-color": "",
        "padding": "",
        "width": "",
        "display": "",
        "margin-top": ""
    });
    $("#txtvalid" + rowkey).css('display', 'none');
    $("#lblvalid" + rowkey).css('display', '');
    $("#txtvalid" + rowkey).datepicker();






}




function BindCurrencyForeditCatalog(currency) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/currencies',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            $("#loadingPage").fadeOut();
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];

                if (currency == item.Abbreviation) {
                    $("#ddlCatalogCurrencyedit").append("<option selected value='" + item.Abbreviation + "'>" + item.Abbreviation + "</option>")
                }
                else {
                    $("#ddlCatalogCurrencyedit").append("<option value='" + item.Abbreviation + "'>" + item.Abbreviation + "</option>")
                }

            }
        }
    });

}



var multipleChecks = "";
function checkMultipleCatalogs(object) {

    var CatalogID = object.id
    var isChecked = object.checked;
    if (isChecked) {
        $("#catalogActions").css('display', '');
        multipleChecks = multipleChecks + ';' + CatalogID;
    } else {
        multipleChecks = multipleChecks.replace(';' + CatalogID, '');
    }

    if (multipleChecks.trim() == "") {
        $("#catalogActions").css('display', 'none');
    }
    try {
        hideAllMenuAndStopPro(event);
    }
    catch (ex) {

    }
}


function multipleDeleteCatalog() {
    $(".hhide").hide();

    var multipleChecksArray = multipleChecks.split(';');
    var multipleChecksArraylength = multipleChecksArray.length;
    for (var i = 1; i < multipleChecksArraylength; i++) {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/catalogs?catalogid=' + multipleChecksArray[i],
            type: 'DELETE',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
            cache: false,
            success: function (data) {
            }
        });



    }
}


function contextMenuCatalogMul(action, el, pos) {
    switch (action) {

        case "delete":
            {
                swal({
                    title: '',
                    text: "Are you sure you want to delete?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
     function (confirmed) {
         if (confirmed) {
             $("#loadingPage").fadeIn();

             var multipleChecksArray = multipleChecks.split(';');
             var multipleChecksArraylength = multipleChecksArray.length;
             for (var i = 1; i < multipleChecksArraylength; i++) {
                 $.ajax({
                     url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/catalogs?catalogid=' + multipleChecksArray[i],
                     type: 'DELETE',
                     dataType: 'json',
                     headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                     cache: false,
                     success: function (data) {
                     }
                 });



             }
             swal("", "Items Deleted");
             getCatalogsbycontract(vContractID);

             $("#catalogActions").css('display', 'none');
             $("#loadingPage").fadeOut();
         }
         return;
     });

                break;
            }
    }
}


function SelectedCommitmentMet(obj) {

    var curVal = $(obj).val();
    var curID = $(obj).attr('id');
    var CatID = $(obj).parent("td").parent("tr").find("#CatalogID").text();
    var Commitment = $(obj).parent("td").parent("tr").find("#CatalogCommitment").text();
    if (curVal == "Yes") {

        updateCommitmentMet(Commitment, curVal, CatID);

    }
    else if (curVal == "No") {
        updateCommitmentMet(Commitment, curVal, CatID);
    }

}

// Add More Click Event
$('#addCatalogpopup').click(function () {

    $("#hdncatalogselect").val("SINGLE");

    $(".validelement").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });


    $("#lblCatalogCTitle").text($("#lblContractTitle").text());

    $("#txtCatalogName").val('');

    $("#txtCatalogUnits").val('');
    $("#txtCatalogUnitPrice").val('');
    $("#dtCatalogValidTill").val('');


    if ($("#hdnBaseCurrency").val() == "")
        $("#ddlCatalogCurrency").val("0");
    else
        $("#ddlCatalogCurrency").val($("#hdnBaseCurrency").val());


    $('#catalogsAddPopup').dialog('open');
});


$('#addCatalogMultipopup').click(function () {

    $("#hdncatalogselect").val("MULTIPLE");

    if ($('#tbodyExistingMulProducts tr').length <= 0) {
        getProducts();
    } else {
        clearObligationproductsmul();
        $('#loadProduct').empty();
        $("#viewProductsMulPopup").dialog("option", "title", "Products & Services Catalog");
        $("#viewProductsMulPopup").dialog("open");
    }

});

$('#btnMultipleCatalogAction').click(function () {
    swal({
        title: '',
        text: "Are you sure you want to <span style='font-weight:700'>delete</span> catalog(s)?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        html: true
    },
     function (confirmed) {
         if (confirmed) {
             $("#loadingPage").fadeIn();
             multipleDeleteCatalog();
             swal("", "Items Deleted");
             getCatalogsbycontract(vContractID);

             $("#btnMultipleCatalogAction").css('display', 'none');
             $("#loadingPage").fadeOut();
         }
         return;
     });

});



$('#viewProductDetails').click(function () {


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


$('#viewProductDetailsEdit').click(function () {

    var vTitle = $('#txtCatalogNameedit').val();
    $('#loadProduct').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    if ($('#tbodyExistingProducts tr').length <= 0) {
        getProductsEdit(vTitle);

    } else {
        clearobligationproducts();
        $('#loadProduct').empty();
        $("#viewProductsPopup").dialog("option", "title", "Products & Services Catalog");
        $("#viewProductsPopup").dialog("open");
    }

});


$('#addNewProductDetails').click(function () {
    document.getElementById('dvExistingProducts').style.display = 'none';
    document.getElementById('dvAddProducts').style.display = '';
    $("#txtProductName").val("");

    $("#txtProductUnits").val("");
    $("#txtProductUnitPrice").val("");

    if ($("#hdnBaseCurrency").val() == "")
        $("#ddlProductCurrency").val("0");
    else
        $("#ddlProductCurrency").val($("#hdnBaseCurrency").val());



    $('#liSelectedProducts').empty();
    $('.ui-button:contains(OK)').hide()

    $(".ui-dialog-titlebar-close").hide();
});

$('#CancleNewProductDetails').click(function () {
    document.getElementById('dvExistingProducts').style.display = '';
    document.getElementById('dvAddProducts').style.display = 'none';
    $('.ui-button:contains(OK)').show();
    if ($('#txtCatalogName').val() != "") {
        $('#liSelectedProducts').html('<span style="font-size:11px;">' + $('#txtCatalogName').val() + '</span>');
    }

    $(".ui-dialog-titlebar-close").show();
});


$('#SaveNewProductDetails').click(function () {

    CreateProduct();



});


function AddProductPopup() {

    $("#txtProductName").val("");


    $("#txtProductUnits").val("");
    $("#txtProductUnitPrice").val("");

    if ($("#hdnBaseCurrency").val() == "")
        $("#ddlProductCurrency").val("0");
    else
        $("#ddlProductCurrency").val($("#hdnBaseCurrency").val());



    $(".validelement").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });

    $("#AddNewProductsPopup").dialog("option", "title", "New Product");
    $("#AddNewProductsPopup").dialog("open");
}




function CreateProduct() {
    $("#loadingPage").fadeIn();
    if (requiredValidator('ProductForm', false)) {

        var vTitle = $("#txtProductName").val();
        if (CheckProductTitleExist(vTitle)) {
            swal("", "Product record exist with titled " + vTitle + "");
            $("#loadingPage").fadeOut();
        }
        else {
            SaveProduct();

        }

    }
    else {
        $("#loadingPage").fadeOut();
    }

}








function SaveProduct() {
    var vTitle = $("#txtProductName").val();
    var productForm = "ProductName=" + vTitle;
    productForm += "&Units=" + $("#ddlProductUnits").val();
    productForm += "&UnitPriceValue=" + $("#txtProductUnitPrice").autoNumeric('get');
    productForm += "&UnitPriceCurrency=" + $("#ddlProductCurrency option:selected").val();
    productForm += "&AccountID=" + localStorage.AccountID;
    productForm += "&CreatedBy=" + localStorage.UserName;
    productForm += "&ModifiedBy=" + localStorage.UserName;
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/Products',
        type: 'POST',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        data: productForm,
        cache: false,
        success: function (data) {
            swal("", "Product Created");
            $("#AddNewProductsPopup").dialog("close");
            getProductsEdit(vTitle);



        },
        error: function (data) {
            $("#loadingPage").fadeOut();
        }
    });
}


function CheckProductTitleExist(producttitle) {
    var vExist = true;
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/Products?productTitle=' + producttitle,
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
            { vExist = true; }
        },
        error: function (data) {
            vExist = false;
        }
    });
    return vExist;
}

function SearchProducts() {
    $("#tbodyExistingProducts").html('');
    $('#loadProduct').html('<img src="../Content/Images/icon/loading.gif"> Searching...');
    var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/Products?searchkeyword=' + encodeURIComponent($("#txtSearchBoxProduct").val()) + '&customquery=&sortbyfield=CounterpartyName&orderby=ASC';
    $.ajax({
        url: vURL,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            $('#loadProduct').empty();
            var ProductTags = [];
            var datalenght = data.length;
            //eO310612
            var article = "";
            var article1 = "";
            var Units = "";
            var Price = "";
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];

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
                    Price += ' ' + $("#hdnBaseCurrency").val();
                }

                article1 += '<tr>';
                article1 += '<td id="ProductUnits" style="display:none;">' + item.Units + '</td>';
                article1 += '<td id="ProductPrice" style="display:none;">' + item.UnitPriceValue + '</td>';
                article1 += '<td id="ProductCurrency" style="display:none;">' + item.UnitPriceCurrency + '</td>';
                article1 += '<td>';


                article1 += '<input id="' + item.RowKey + '" type="checkbox" name="ExtProductsMul" value="' + item.ProductName + '" />&nbsp;';
                article1 += '<label for="' + item.RowKey + '" class="margin-right8" style="text-align: left;">' + item.ProductName + '</label>';

                article1 += '</td>';
                article1 += '<td><label for="PU' + item.RowKey + '" class="margin-right8" value="' + Units + '">' + Units + '</label></td>';
                article1 += '<td><label for="PP' + item.RowKey + '" class="margin-right8" value="' + Price + '" >' + Price + '</label></td>';
                article1 += '</tr>';


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


            }
            $("#tbodyExistingProducts").html(article);
            $("#tbodyExistingMulProducts").html(article1);

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

            $('#compact-paginationProducts').css('display', '');

            var vCountMul = $("#tbodyExistingMulProducts tr").length;
            $('#compact-paginationMulProducts').pagination({
                items: vCountMul,
                itemsOnPage: 10,
                currentPage: 1,
                cssStyle: 'compact-theme',
                type: 'tdbody',
                row: 'tr',
                typeID: 'tbodyExistingMulProducts'
            });


            var vCount = $("#tbodyExistingProducts tr").length;
            $('#compact-paginationProducts').pagination({
                items: vCount,
                itemsOnPage: 10,
                currentPage: 1,
                cssStyle: 'compact-theme',
                type: 'tdbody',
                row: 'tr',
                typeID: 'tbodyExistingProducts'
            });

            if ($("#hdncatalogselect").val() == "MULTIPLE" || $("#hdncatalogselect").val() == "FINANCIALMULTIPLE") {

                $("#viewProductsMulPopup").dialog("option", "title", "Products & Services Catalog");
                $("#viewProductsMulPopup").dialog("open");

            }
            else {

                $("#viewProductsPopup").dialog("option", "title", "Products & Services Catalog");
                $("#viewProductsPopup").dialog("open");

            }

        },
        error: function () {
            $('#compact-paginationProducts').css('display', 'none');
            $('#loadProduct').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
        }
    });

}

function SearchProductsMul() {
    $("#loadingPage").fadeIn();
    $("#tbodyExistingMulProducts").html('');
    $('#loadProduct').html('<img src="../Content/Images/icon/loading.gif"> Searching...');
    var vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/Products?searchkeyword=' + encodeURIComponent($("#txtSearchBoxProductMul").val()) + '&customquery=&sortbyfield=CounterpartyName&orderby=ASC';
    $.ajax({
        url: vURL,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            $("#loadingPage").fadeOut();
            var datalenght = data.length;
            var article1 = "";
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];

                if (i == 0) {

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
                    Price += ' ' + $("#hdnBaseCurrency").val();
                }

                article1 += '<tr>';
                article1 += '<td id="ProductUnits" style="display:none;">' + item.Units + '</td>';
                article1 += '<td id="ProductPrice" style="display:none;">' + item.UnitPriceValue + '</td>';
                article1 += '<td id="ProductCurrency" style="display:none;">' + item.UnitPriceCurrency + '</td>';
                article1 += '<td>';


                article1 += '<input id="' + item.RowKey + '" type="checkbox" name="ExtProductsMul" value="' + item.ProductName + '" />&nbsp;';
                article1 += '<label for="' + item.RowKey + '" class="margin-right8">' + item.ProductName + '</label>';

                article1 += '</td>';
                article1 += '<td><label for="PU' + item.RowKey + '" class="margin-right8" value="' + Units + '">' + Units + '</label></td>';
                article1 += '<td><label for="PP' + item.RowKey + '" class="margin-right8" value="' + Price + '" >' + Price + '</label></td>';
                article1 += '</tr>';
            }
            $("#tbodyExistingMulProducts").html(article1);
            var vCount = $("#tbodyExistingMulProducts tr").length;
            if (vCount != 0) {
                $('#loadProductMul').html('');
                $('#compact-paginationMulProducts').css('display', '');
                $('#compact-paginationMulProducts').pagination({
                    items: vCount,
                    itemsOnPage: 10,
                    typeID: 'tbodyExistingProducts',
                    cssStyle: 'compact-theme'
                });
            } else {
                $('#loadProductMul').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
                $('#compact-paginationMulProducts').css('display', 'none');
            }
        },
        error: function () {
            $('#compact-paginationMulProducts').css('display', 'none');
            $('#loadProductMul').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
        }
    });

}



function getProducts() {

    $("#loadingPage").fadeIn();
    if ($('#tbodyExistingProducts tr').length <= 0) {
        $("#tbodyExistingProducts").empty();
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/Products',
            type: 'GET',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            cache: false,
            success: function (products) {
                obligationProducts = products;
                $('#loadProduct').empty();

                var ProductTags = [];
                var datalenght = products.length;
                for (var i = 0; i < datalenght; i++) {
                    var item = products[i];
                    var article = "";
                    var article1 = "";
                    if (i == 0) {
                        //article += '<tr><th>Product Name</th><th>Units</th><th>Price</th></tr>';
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
                        Price += ' ' + $("#hdnBaseCurrency").val();
                    }

                    article1 += '<tr>';
                    article1 += '<td id="ProductUnits" style="display:none;">' + item.Units + '</td>';
                    article1 += '<td id="ProductPrice" style="display:none;">' + item.UnitPriceValue + '</td>';
                    article1 += '<td id="ProductCurrency" style="display:none;">' + item.UnitPriceCurrency + '</td>';
                    article1 += '<td>';


                    article1 += '<input id="' + item.RowKey + '" type="checkbox" name="ExtProductsMul" value="' + item.ProductName + '" />&nbsp;';
                    article1 += '<label for="' + item.RowKey + '" class="margin-right8">' + item.ProductName + '</label>';

                    article1 += '</td>';
                    article1 += '<td><label for="PU' + item.RowKey + '" class="margin-right8" value="' + Units + '">' + Units + '</label></td>';
                    article1 += '<td><label for="PP' + item.RowKey + '" class="margin-right8" value="' + Price + '" >' + Price + '</label></td>';
                    article1 += '</tr>';


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
                    $("#tbodyExistingMulProducts").append(article1);

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

                var vCountMul = $("#tbodyExistingMulProducts tr").length;
                $('#compact-paginationMulProducts').pagination({
                    items: vCountMul,
                    itemsOnPage: 10,
                    currentPage: 1,
                    cssStyle: 'compact-theme',
                    type: 'tdbody',
                    row: 'tr',
                    typeID: 'tbodyExistingMulProducts'
                });


                var vCount = $("#tbodyExistingProducts tr").length;
                $('#compact-paginationProducts').pagination({
                    items: vCount,
                    itemsOnPage: 10,
                    currentPage: 1,
                    cssStyle: 'compact-theme',
                    type: 'tdbody',
                    row: 'tr',
                    typeID: 'tbodyExistingProducts'
                });

                if ($("#hdncatalogselect").val() == "MULTIPLE" || $("#hdncatalogselect").val() == "FINANCIALMULTIPLE") {

                    $("#viewProductsMulPopup").dialog("option", "title", "Products & Services Catalog");
                    $("#viewProductsMulPopup").dialog("open");

                }
                else {

                    $("#viewProductsPopup").dialog("option", "title", "Products & Services Catalog");
                    $("#viewProductsPopup").dialog("open");

                }








            },
            error: function (products) {
                $("#tbodyExistingProducts").html('No item found.');
                $("#tbodyExistingMulProducts").html('No item found.');
            }
        });
    }
    else {
        $("#tbodyExistingProducts").empty();
        var ProductTags = [];
        var datalenght = obligationProducts.length;
        for (var i = 0; i < datalenght; i++) {
            var item = obligationProducts[i];
            var article = "";
            var article1 = "";
            if (i == 0) {
                //article += '<tr><th>Product Name</th><th>Units</th><th>Price</th></tr>';
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
                Price += ' ' + $("#hdnBaseCurrency").val();
            }

            article1 += '<tr>';
            article1 += '<td id="ProductUnits" style="display:none;">' + item.Units + '</td>';
            article1 += '<td id="ProductPrice" style="display:none;">' + item.UnitPriceValue + '</td>';
            article1 += '<td id="ProductCurrency" style="display:none;">' + item.UnitPriceCurrency + '</td>';
            article1 += '<td>';


            article1 += '<input id="' + item.RowKey + '" type="checkbox" name="ExtProductsMul" value="' + item.ProductName + '" />&nbsp;';
            article1 += '<label for="' + item.RowKey + '" class="margin-right8">' + item.ProductName + '</label>';

            article1 += '</td>';
            article1 += '<td><label for="PU' + item.RowKey + '" class="margin-right8" value="' + Units + '">' + Units + '</label></td>';
            article1 += '<td><label for="PP' + item.RowKey + '" class="margin-right8" value="' + Price + '" >' + Price + '</label></td>';
            article1 += '</tr>';


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
            $("#tbodyExistingMulProducts").append(article1);

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

        var vCountMul = $("#tbodyExistingMulProducts tr").length;
        $('#compact-paginationMulProducts').pagination({
            items: vCountMul,
            itemsOnPage: 10,
            currentPage: 1,
            cssStyle: 'compact-theme',
            type: 'tdbody',
            row: 'tr',
            typeID: 'tbodyExistingMulProducts'
        });


        var vCount = $("#tbodyExistingProducts tr").length;
        $('#compact-paginationProducts').pagination({
            items: vCount,
            itemsOnPage: 10,
            currentPage: 1,
            cssStyle: 'compact-theme',
            type: 'tdbody',
            row: 'tr',
            typeID: 'tbodyExistingProducts'
        });
    }

}

function getProductsEdit(vTitle) {
    $("#tbodyExistingProducts").empty();
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/Products',
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
                if (i == 0) {
                    article += '<tr><th>Product Name</th><th>Units</th><th>Price</th></tr>';
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
                    Price += ' ' + $("#hdnBaseCurrency").val();
                }



                article += '<tr>';
                article += '<td id="ProductUnits" style="display:none;">' + item.Units + '</td>';
                article += '<td id="ProductPrice" style="display:none;">' + item.UnitPriceValue + '</td>';
                article += '<td id="ProductCurrency" style="display:none;">' + item.UnitPriceCurrency + '</td>';
                article += '<td>';


                if (item.ProductName == vTitle) {
                    article += '<input id="CP' + item.RowKey + '" type="radio" name="ExtProducts" class="css-checkbox" checked value="' + item.ProductName + '"  />';
                    //article += '<input id="CP' + item.RowKey + '" type="radio" name="ExtProducts" class="css-checkbox" checked value="' + item.ProductName + '" onchange="handleChange1();" />';
                    article += '<label for="CP' + item.RowKey + '" class="css-label margin-right8">' + item.ProductName + '</label>';

                } else {
                    article += '<input id="CP' + item.RowKey + '" type="radio" name="ExtProducts" class="css-checkbox" value="' + item.ProductName + '" />';
                    article += '<label for="CP' + item.RowKey + '" class="css-label margin-right8">' + item.ProductName + '</label>';
                }
                article += '</td>';
                article += '<td><label for="PU' + item.RowKey + '" class="margin-right8" value="' + Units + '"  >' + Units + '</label></td>';
                article += '<td><label for="PP' + item.RowKey + '" class="margin-right8" value="' + Price + '"  >' + Price + '</label></td>';
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

            var vCount = $("#tbodyExistingProducts tr").length;
            $('#compact-paginationProducts').pagination({
                items: vCount,
                itemsOnPage: 10,
                currentPage: 1,
                cssStyle: 'compact-theme',
                type: 'tdbody',
                row: 'tr',
                typeID: 'tbodyExistingProducts'
            });
            $("#loadingPage").fadeOut();
            $("#viewProductsPopup").dialog("option", "title", "Products Picker");
            $("#viewProductsPopup").dialog("open");

        }
    });
}

function AddProduct() {
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




        var Units = $('input[name=ExtProducts]:checked').parent().parent().find('#ProductUnits').text();
        var Price = $('input[name=ExtProducts]:checked').parent().parent().find('#ProductPrice').text();
        var Currency = $('input[name=ExtProducts]:checked').parent().parent().find('#ProductCurrency').text();
        if (Units != null && Units != "" && Units != "null") {
            $('#txtCatalogUnitsedit').val(Units);
            $('#txtCatalogUnits').val(Units);
        }
        else {
            $('#txtCatalogUnitsedit').val("");
            $('#txtCatalogUnits').val("");
        }
        if (Price != null && Price != "" && Price != "null") {
            $('#txtCatalogUnitPriceedit').val(Price);
            $('#txtCatalogUnitPrice').val(Price);
        }
        else {
            $('#txtCatalogUnitPriceedit').val("");
            $('#txtCatalogUnitPrice').val("");
        }
        if (Currency != null && Currency != "" && Currency != "null") {
            $('#ddlCatalogCurrencyedit').val(Currency);
            $('#ddlCatalogCurrency').val(Currency);
        }
        else {

            if ($("#hdnBaseCurrency").val() == "") {
                $("#ddlCatalogCurrencyedit").val("0");
                $("#ddlCatalogCurrency").val("0");
            }

            else {
                $("#ddlCatalogCurrencyedit").val($("#hdnBaseCurrency").val());
                $("#ddlCatalogCurrency").val($("#hdnBaseCurrency").val());

            }

        }


        $('#txtCatalogName').val(vProduct);
        $('#txtTransProductName').val(vProduct);
        $('#txtCatalogNameedit').val(vProduct);
        return true;
    } else {

        swal("", "No Product has been selected.");
        return false;
    }

}

function SaveCataloginText() {

    var vCatalog = $('#txtCatalogName').val();

    if (vCatalog == "") {
        $('#liSelectedProducts').html('<span style="font-size:11px;">please select the one product.</span>');
    }
    else {

        $(this).dialog("close");

    }


}

function Updatecatalog() {

    $("#loadingPage").fadeIn();
    $("#spInProgress").css('visibility', 'visible');
    if (requiredValidator('CatalogFormEdit', false)) {

        var vTitle = $("#txtCatalogNameedit").val();
        var vCatalogId = $("#txtCatalogIDedit").val();

        if (!comparedates("StartDate", "ValidTill", "Valid Till should be greater than start date")) {

            swal("", "Valid Till should be greater than start date");
            $("#loadingPage").fadeOut();
        }
        else {
            UpdateCatalog(false);
        }

    }
    else {
        $("#loadingPage").fadeOut();
    }
    $("#spInProgress").css('visibility', 'hidden');


}

function Savecatalog() {


    $("#spInProgress").css('visibility', 'visible');
    if (requiredValidator('CatalogForm', false)) {

        var vTitle = $("#txtCatalogName").val();

        $("#loadingPage").fadeIn();
        if (!comparedates("StartDate", "ValidTill", "Valid Till should be greater than start date")) {

            swal("", "Valid Till should be greater than start date");
            $("#loadingPage").fadeOut();
        }
        else {
            CreateCatalog(false);
        }

    }
    $("#spInProgress").css('visibility', 'hidden');
    $("#loadingPage").fadeOut();

}

function CheckCatalogTitleExistForEdit(contractid, catalogtitle, catalogid) {
    var vExist = true;
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/catalogs?contractid=' + contractid + '&catalogtitle=' + catalogtitle,
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
                if (data.RowKey == catalogid)
                { vExist = false; }
                else
                { vExist = true; }

            }
        },
        error: function (data) {
            vExist = false;
        }
    });
    return vExist;
}

//Check the Request Title is Exists in the Request Table (Catalog Title is unique For a Particular Contract)
function CheckCatalogTitleExist(contractid, catalogtitle) {
    var vExist = true;
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/catalogs?contractid=' + contractid + '&catalogtitle=' + catalogtitle,
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
            { vExist = true; }
        },
        error: function (data) {
            vExist = false;
        }
    });
    return vExist;
}

//Update Catalog
function UpdateCatalog(isdraft) {

    var vTitle = $("#txtCatalogNameedit").val();
    var vCatalogId = $("#txtCatalogIDedit").val();
    var catalogForm = "CatalogName=" + vTitle;

    catalogForm += "&Units=" + $("#txtCatalogUnitsedit").val();
    catalogForm += "&ContractID=" + vContractID;
    catalogForm += "&AccountID=" + localStorage.AccountID;
    catalogForm += "&CreatedBy=" + localStorage.UserName;
    catalogForm += "&ModifiedBy=" + localStorage.UserName;
    catalogForm += "&UnitPriceValue=" + $("#txtCatalogUnitPriceedit").val().trim();
    catalogForm += "&UnitPriceCurrency=" + $("#ddlCatalogCurrencyedit option:selected").text();
    catalogForm += "&ValidUpto=" + $("#dtCatalogValidTilledit").val();
    catalogForm += "&TotalPriceValue=" + "";
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/catalogs?catalogid=' + vCatalogId,
        type: 'PUT',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        data: catalogForm,
        cache: false,
        success: function (data) {
            $("#loadingPage").fadeOut();
            if (isdraft) { //if saved as draft

                swal("", "Item Drafted");
            } else {

                swal("", "Item Updated");
            }
            $("#catalogseditPopup").dialog("close");
            getCatalogsbycontract(vContractID);
        },
        error: function (data) {
            $("#loadingPage").fadeOut();
        }
    });
}

//Create Catalog
function CreateCatalog(isdraft) {

    var vTitle = $("#txtCatalogName").val();

    var catalogForm = "CatalogName=" + vTitle;

    catalogForm += "&CommitmentID=" + "";
    catalogForm += "&Units=" + $("#txtCatalogUnits").val();
    catalogForm += "&TotalPriceValue=" + "";
    catalogForm += "&AccountID=" + localStorage.AccountID;
    catalogForm += "&CreatedBy=" + localStorage.UserName;
    catalogForm += "&ModifiedBy=" + localStorage.UserName;
    catalogForm += "&UnitPriceValue=" + $("#txtCatalogUnitPrice").val().trim();
    catalogForm += "&UnitPriceCurrency=" + $("#ddlCatalogCurrency option:selected").text();
    catalogForm += "&ValidUpto=" + $("#dtCatalogValidTill").val();

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/catalogs?contractid=' + vContractID,
        type: 'POST',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        data: catalogForm,
        cache: false,
        success: function (data) {

            if (isdraft) { //if saved as draft

                swal("", "Item Drafted");

            } else {

                swal("", "Item Added");
            }
            getCatalogsbycontract(vContractID);
            $("#catalogsAddPopup").dialog("close");

        },
        error: function (data) {
            $("#loadingPage").fadeOut();
        }
    });
}

///Obligation Methods Starts


//Add Item Click Event

// Add More Click Event

var listObligationNewData = "";
var listObligationNewEndDate = "";
var listObligationNewStartDate = "";
var recurence = "";
var recurenceCustomString = "";
var occurences = 1;
var validateproducts = true;



function clearObligationFormData() {
    $("#txtObligationNewID").val("");
    $("#txtObligationNewTitle").val("");
    $('#ddlObligationTypeNew').val("0");
    $("#txtObligationNewText").val("");
    $("#txtObligationNewDesc").val("");
    $("#txtObligationCatalogTitleInline").val("");
    $("#ddlObligationCatalogInlineUnitsType").val("0");
    $("#txtObligationCatalogQtyInline").val("");
    $("#ddlObligationCatalogUnitsInline").val("0");
    $("#ddlObligationCatalogStatusInline").val("0");
    $("#ulObligationCatalogBody").empty();
    $("#txtObligationFinancialsTitleInline").val("");
    $("#txtObligationFinancialAmountInline").val("");
    $("#ddlObligationFinancialsStatusInline").val("0");
    $("#ulObligationFinancialsBody").empty();
}





$('#addObligationNewItemPopup').click(function () {
    $('#addEditObligationNew').dialog('widget').find('.ui-dialog-buttonpane .ui-button:button:contains("Save") .pop_up_Content_Green ').html("Add");
    $("input[type=radio]").attr('disabled', false);
    $("#ulObliCompletedate").css('display', 'none');
    $("#dtObligationNewCompletedDate").val('');
    clearObligationFormDataNew();
    listObligationNewData = "";
    $("#liObligationRecurrence").css('display', '');
    $("#hdnObligationUniqueId").text('');
    $("#hdnObligationRowKey").text('');
    $('#hdnProductUpdates').text('');

    $("#PerformedPartySelf").css("display", "inline");
    $("#PerformedPartyCounterparty").css("display", "inline");

    vObligationTextEditRecurrence = "";
    var string1 = "";
    var string2 = "";
    var strCompanyProfile = "";
    var strCounterpartynew = "";

    var strEndDate = "";
    $('#txtOccurrenceCount').val("12");

    $('#NoObligationFinantials').css('display', '');
    $('#NoObligationCatalog').css('display', '');
    document.getElementById("dtObligationNewDueDate").disabled = false;
    $('#dtObligationNewDueDate').css('cursor', 'auto');
    if (contractItem.EndDate != "" && contractItem.EndDate != null && contractItem.EndDate != "null") {
        strEndDate = new Date(contractItem.EndDate);
        listObligationNewEndDate = strEndDate;
        $('#ObligationNewOcurrenceEndDate').text("");
        var ONewEndDate = "";

        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
            if (getTimeZone().indexOf('+') > -1)
                ONewEndDate = moment(new Date(listObligationNewEndDate)).format('MM/DD/YYYY');
            else if (getTimeZone().indexOf('+00:00') > -1 || getTimeZone().indexOf('-') > -1)
                ONewEndDate = moment(new Date(listObligationNewEndDate)).utc().format('MM/DD/YYYY');
        }
        else {
            if (getTimeZone().indexOf('+') > -1)
                ONewEndDate = moment(new Date(listObligationNewEndDate)).format(localStorage.AppDateFormat);
            else if (getTimeZone().indexOf('+00:00') > -1 || getTimeZone().indexOf('-') > -1)
                ONewEndDate = moment(new Date(listObligationNewEndDate)).utc().format(localStorage.AppDateFormat);
        }

        //if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
        //{ ONewEndDate = moment(new Date(listObligationNewEndDate)).format('MM/DD/YYYY'); }
        //else { ONewEndDate = moment(new Date(listObligationNewEndDate)).utc().format(localStorage.AppDateFormat); }

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
    $("#divObligationOcurrenceWeekly").css('display', 'none');
    $("#divObligationOcurrenceMonthly").css('display', 'none');

    $("#dvobligationOcurrenceEnd").css('display', 'none');
    $("#divOcurrenceSummary").css('display', 'none');

    document.getElementById("ddlObligationOccurencess").disabled = true;



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


    $("#lblCTitleObligationNew").text($("#lblContractTitle").text());
    $(".validelement").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });
    GetValuesAndAutoPopulate("ddlObligationNewOwner", $("#licontractmanagers").text());
    GetValuesAndAutoPopulate("ddlSendReminderToObligationNew", $("#licontractmanagers").text());

    $("#aobligationRecNoneEdit").css('display', 'none');
    $("#aobligationRecEdit").css('display', 'none');

    $("#obligationnewheading").text("New Obligation");
    if (IsPipeline) {
        $("#AlertObli").val('No').change();
        $("#reminderEnableObligation").empty();
        $("#reminderEnableObligation").append("Reminders <span style='color: red;margin-left: 23%'>To turn ON reminders for obligation notification, click <a href='javascript:void(0);' id='enableOSwitch' onclick='enableObligationSwitch()'>Enable</a></span>");
    }
    else {
        $("#AlertObli").val('Yes').change();
        $("#reminderEnableObligation").empty();
        $("#reminderEnableObligation").append("Reminders");

    }

    $("#rdObligationNewAutoCompleteYes").prop("checked", true);
    $("#rdObligationNewAutoCompleteNo").prop("checked", false);
    $("#rdObligShowInCalendarYes").prop("checked", true);
    $("#rdObligShowInCalendarNo").prop("checked", false);

    $("#addEditObligationNew").dialog("option", "title", "");
    $("#addEditObligationNew").dialog("open");


    $("input:checkbox[name=chkRecurrenceCustom]").each(function () {
        var Id = this.id;
        $("#" + Id).css('outline', '');
    });


    $("#lblerrorreclimitObligation").css('display', 'none');
    allowOnlyNumberInInputBox("txtReminder1ObligationNew");
    allowOnlyNumberInInputBox("txtReminder2ObligationNew");
    allowOnlyNumberInInputBox("txtReminder3ObligationNew");

});


function SelectedObligationTitleNew(obj) {
    var curVal = $(obj).val();
    if (curVal != 0) {
        if ($("#lblCounterparty").text() != null && $("#lblCounterparty").text() != "") {
            if ($("input:radio[name=PerformedParty]:checked").val() == "Self") {
                $("#txtObligationNewTitle").val(curVal + " for " + $("#lblCounterparty").text());

            }
            else {

                $("#txtObligationNewTitle").val(curVal + " from " + $("#lblCounterparty").text());

            }
        }
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


function ViewObligationOcurrence(obj) {
    if ($('#dtObligationNewDueDate').val() != "" && $('#dtObligationNewDueDate').val() != null) {
        if ($(obj).is(':checked')) {
            $("#ulObligationOcurrence").css('display', '');

        }
        else {
            $("#ulObligationOcurrence").css('display', 'none');
        }
    }
    else {

        swal("", "select Duedate First.");
        if ($(obj).is(':checked')) {
            $('input:checkbox[name=ObligationRepeat]').removeAttr('checked');
        }
    }
}


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


function getOcurrenceValuesForObligation(recurence, occurences, startDateNew, recurenceCustomString, strmonthly) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/ocurrencedates?ocurrence=' + recurence + '&iOcurrence=' + occurences + '&dtstart=' + startDateNew + '&ocurrencestring=' + recurenceCustomString + '&strmonthly=' + strmonthly,
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
            var Ocurrs = folder.Values != null ? folder.Values.length : 1;;
            occurences = Ocurrs;
            var dtStartdate = "";
            var dtEnddate = "";
            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
            { dtStartdate = moment(new Date(folder.StartDate)).format('MM/DD/YYYY'); }
            else { dtStartdate = moment(new Date(folder.StartDate)).format(localStorage.AppDateFormat); }
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
    GetObligationdynamicRecurrenceCount();
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

var dynclistObligationNewStartDate = '';
function GetObligationdynamicRecurrenceCount() {
    var fObligationDateNew = '';
    if ($("#dtObligationNewDueDate").val() != "" && $("#dtObligationNewDueDate").val() != null) {
        fObligationDateNew = $.datepicker.formatDate('mm/dd/yy', $("#dtObligationNewDueDate").datepicker('getDate'))

    }
    var startDateNew = new Date();
    var recst = new Date();
    var reced = new Date();
    var customstringnew = "";
    dynclistObligationNewStartDate = fObligationDateNew;
    if (listObligationNewEndDate != "Not Available") {
        if ($("#ddlObligationOccurencess option:selected").val() == "Weekly") {
            var newTestDateNew2 = new Date();
            var sta = false;
            var OCount = 1;
            var Cus = "";
            var CustomRecWeekly = [];
            $("input:checkbox[name=chkRecurrenceCustom]:checked").each(function () {
                CustomRecWeekly.push(this.value);
                Cus += (this.value) + ",";
            });

            var selectedstartdate = new Date(dynclistObligationNewStartDate);

            for (var crw = 0; crw < CustomRecWeekly.length; crw++) {
                if (selectedstartdate.getDay() == CustomRecWeekly[crw]) {
                    recst = new Date(dynclistObligationNewStartDate);
                    newTestDateNew2 = new Date(dynclistObligationNewStartDate);
                    sta = true;
                    break;
                }
            }
            if (!sta) {

                var newTestDate = new Date(dynclistObligationNewStartDate);
                var newdate = new Date(dynclistObligationNewStartDate);
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



            if (occurences > 54) {
                dynamicOccCount = 54;
                $('#lblerrorreclimitObligation').css('display', '');
                $('#lblerrorreclimitObligationNotZero').css('display', 'none');
            }
            else {
                dynamicOccCount = occurences;
                $('#lblerrorreclimitObligation').css('display', 'none');
                $("#rdObligationNewEndOccurence").attr('disabled', false);
                $('#rdObligationNewEndOccurence').prop("checked", true);
                if (occurences == 0)
                    $('#lblerrorreclimitObligationNotZero').css('display', '');
                else
                    $('#lblerrorreclimitObligationNotZero').css('display', 'none');

            }
        }
        else if ($("#ddlObligationOccurencess option:selected").val() == "Monthly") {
            var newstartrecdate = new Date(dynclistObligationNewStartDate);
            var selectedstartdateNewCustom = new Date(dynclistObligationNewStartDate);
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

            if (occurences > 54) {
                dynamicOccCount = 54;
                $('#lblerrorreclimitObligation').css('display', '');
                $('#lblerrorreclimitObligationNotZero').css('display', 'none');
            }
            else {
                dynamicOccCount = occurences;
                $('#lblerrorreclimitObligation').css('display', 'none');
                if (occurences == 0)
                    $('#lblerrorreclimitObligationNotZero').css('display', '');
                else
                    $('#lblerrorreclimitObligationNotZero').css('display', 'none');
            }


            recurenceCustomString = recst.getDate();
            //String need to be Added for Custom


        }
        else {
            var newstartrecdate = new Date(dynclistObligationNewStartDate);
            var selectedstartdateNewCustom = new Date(dynclistObligationNewStartDate);
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

            if (occurences > 54) {
                dynamicOccCount = 54;
                $('#lblerrorreclimitObligation').css('display', '');
                $('#lblerrorreclimitObligationNotZero').css('display', 'none');

            }
            else {
                dynamicOccCount = occurences;
                $('#lblerrorreclimitObligation').css('display', 'none');
                if (occurences == 0)
                    $('#lblerrorreclimitObligationNotZero').css('display', '');
                else
                    $('#lblerrorreclimitObligationNotZero').css('display', 'none');
            }

            recurenceCustomString = recst.getFullYear();

        }
    }
    else {
        dynamicOccCount = 54;
        $('#lblerrorreclimitObligation').css('display', '');
        $('#lblerrorreclimitObligationNotZero').css('display', 'none');
    }
    if ($("#txtOccurrenceCount").val() == "") {
        if (parseInt(dynamicOccCount) > 12) {
            $("#txtOccurrenceCount").val('12');
        }
        else {
            $("#txtOccurrenceCount").val(dynamicOccCount);
        }
    }

}

var userFlagObli = false;
var userFlagObliCustom = false;
$("#ddlObligationOccurencess").change(function (obj) {
    GetObligationdynamicRecurrenceCount();

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
        $("#ddlRepeatMonthly").val("1");
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
        Cus = removeLastChar(Cus, ',');
        $("#ddlRepeatMonthly").val("1");
    }
    else {
        $('#dtObligationNewOccurrenceDueDate').val("none");
        $('#divObligationOcurrenceMonthly').css('display', 'none');
        $('#divObligationOcurrenceWeekly').css('display', 'none');
        $('#divOcurrenceSummary').css('display', 'none');

        $('#dvobligationOcurrenceEnd').css('display', 'none');
        $("#ddlRepeatMonthly").val("1");
    }



    if (userFlagObli) {
        if (userFlagObliCustom) {
            $('#rdObligationNewEndOccurenceUser').prop("checked", true);
            $("#rdObligationNewEndOccurence").removeAttr('disabled');
            $("#rdObligationNewEndOccurence").removeAttr('checked');
        }
        else {
            $("#rdObligationNewEndOccurence").removeAttr('disabled');
            $("#rdObligationNewEndOccurence").prop("checked", true);
            $('#rdObligationNewEndOccurenceUser').removeAttr('checked');
        }
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

    var fObligationNewDueDate = '';
    if ($("#dtObligationNewDueDate").val() != "" && $("#dtObligationNewDueDate").val() != null) {
        fObligationNewDueDate = $.datepicker.formatDate('mm/dd/yy', $("#dtObligationNewDueDate").datepicker('getDate'));
    }
    var recst = new Date();
    var reced = new Date();
    var customstringnew = "";
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
                Cus = removeLastChar(Cus, ',');


                if (occurences > 54) {
                    occurences = 12;
                    $("#rdObligationNewEndOccurence").attr('disabled', true);
                    $('#rdObligationNewEndOccurence').removeAttr('checked');
                    $("#rdObligationNewEndOccurenceUser").prop("checked", true);
                    userFlagObli = false;

                    $('#lblerrorreclimitObligation').css('display', '');
                    $('#lblerrorreclimitObligationNotZero').css('display', 'none');
                }
                else {
                    $('#lblerrorreclimitObligation').css('display', 'none');
                    $('#lblerrorreclimitObligationNotZero').css('display', 'none');
                }


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

                if (occurences > 54) {
                    occurences = 12;
                    $("#rdObligationNewEndOccurence").attr('disabled', true);
                    $('#rdObligationNewEndOccurence').removeAttr('checked');
                    $("#rdObligationNewEndOccurenceUser").prop("checked", true);
                    userFlagObli = false;

                    $('#lblerrorreclimitObligation').css('display', '');
                    $('#lblerrorreclimitObligationNotZero').css('display', 'none');
                }
                else {
                    $('#lblerrorreclimitObligation').css('display', 'none');
                    $('#lblerrorreclimitObligationNotZero').css('display', 'none');
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

                if (occurences > 54) {
                    occurences = 12;
                    $("#rdObligationNewEndOccurence").attr('disabled', true);
                    $('#rdObligationNewEndOccurence').removeAttr('checked');
                    $("#rdObligationNewEndOccurenceUser").prop("checked", true);
                    userFlagObli = false;

                    $('#lblerrorreclimitObligation').css('display', '');
                    $('#lblerrorreclimitObligationNotZero').css('display', 'none');
                }
                else {
                    $('#lblerrorreclimitObligation').css('display', 'none');
                    $('#lblerrorreclimitObligationNotZero').css('display', 'none');
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
            if ($('input[name=SelectOccurenceEndDate]:checked').val() == 'TillEnd') {
                $('input[type="radio"][name="SelectOccurenceEndDate"][value="Custom"]').prop('checked', true).trigger("change");
                ObligationNewEndOccurenceUser();
                $("#txtOccurrenceCount").trigger("focusout");
                dynamicOccCount = 12;
            }
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

var dynamicOccCount = 54;

var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


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
        Cus = removeLastChar(Cus, ',');
    }



    if ($('input[name=SelectOccurenceEndDate]:checked').val() == 'TillEnd') {



        GetObligationDataFinal(Cus);

    } else {
        userFlagObli = false;
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



//Event Of Text Box count Change Event

$("#txtOccurrenceCount").focusout(function () {
    var fObligationNewDueDate = '';
    if ($("#dtObligationNewDueDate").val() != "" && $("#dtObligationNewDueDate").val() != null) {
        fObligationNewDueDate = $.datepicker.formatDate('mm/dd/yy', $("#dtObligationNewDueDate").datepicker('getDate'));
    }
    if ($("#txtOccurrenceCount").val() != "" && $('input[name=SelectOccurenceEndDate]:checked').val() == 'Custom') {


        if (parseInt($("#txtOccurrenceCount").val()) == 0) {
            $('#lblerrorreclimitObligationNotZero').css('display', '');
            $('#lblerrorreclimitObligation').css('display', 'none');
        }
        else {
            $('#lblerrorreclimitObligationNotZero').css('display', 'none');
            if (parseInt($("#txtOccurrenceCount").val()) > 54) {
                $('#lblerrorreclimitObligation').css('display', '');
            }
            else {
                //$('#lblerrorreclimitObligation').css('display', 'none');

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
                    Cus = removeLastChar(Cus, ',');
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
        }

    }

});





$("#dtObligationNewDueDate").focusout(function () {

    if ($("#dtObligationNewDueDate").val() != "") {
        document.getElementById("ddlObligationOccurencess").disabled = false;
    }
    else {
        document.getElementById("ddlObligationOccurencess").disabled = true;

    }

});



//Weekly Change Event Of Check Box

$("input:checkbox[name=chkRecurrenceCustom]").change(function () {
    GetObligationdynamicRecurrenceCount();
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
        Cus = removeLastChar(Cus, ',');
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

// Add More Click Event
$('#addObligationCatalogpopup').click(function () {

    clearobligationcatalogs();

    $("#productcompleteddate").css('display', 'none');
    $('#dtObligationProductCompletedDate').removeClass('validelement');
    $('#dtObligationProductCompletedDate').removeClass('validdate');
    $('#dtObligationProductCompletedDate').val("");


    if ($('#hdnProductUpdates').text() == "EDIT") {
        $('#hdnProductUpdates').text('');
        $('#hdnProductUpdates').text('EDITCATALOG');
    }


    $("#hdncatalogselect").val("SINGLE");

    var text = $("#hdnBaseContractCurrency").text();

    if (text != "") {
        $("#CurrencyExpected").text(text);

        $("#CurrencyActual").text(text);
    }
    else {
        $("#CurrencyExpected").text($('#hdnBaseCurrency').val());

        $("#CurrencyActual").text($('#hdnBaseCurrency').val());
    }


    $(".validelement").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });

    $('#obligationcatalogsAddPopup').dialog('open', 'title', '');
});


$('#addObligationCatalogMultipopup').click(function () {

    $("#hdncatalogselect").val("MULTIPLE");

    if ($('#tbodyExistingMulProducts tr').length <= 0) {
        getProducts();
    } else {
        clearObligationproductsmul();
        $('#loadProduct').empty();
        $("#viewProductsMulPopup").dialog("option", "title", "Products & Services Catalog");
        $("#viewProductsMulPopup").dialog("open");
    }

});






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
            var ProductCurrency = $('input[name=ExtProducts]:checked').parent().parent().find('#ProductCurrency').text();

            if (Price != null && Price != "" && Price != "null" && Price != 0) {

                $('#txtObligationProductAmountNewEdit').autoNumeric('set', Price);
                $('#txtObligationProductAmountNew').autoNumeric('set', Price);

                if (ProductCurrency == "" || ProductCurrency == null) {

                }
                else {

                    $("#CurrencyExpected").text(ProductCurrency);

                    $("#CurrencyActual").text(ProductCurrency);
                }

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
            var ProductCurrency = $('input[name=ExtProducts]:checked').parent().parent().find('#ProductCurrency').text();



            if (Units != null && Units != "" && Units != "null" && Units != 0) {

                $('#txtObligationFinancialsAmountEdit').autoNumeric('set', Units);
                $('#txtObligationFinancialsAmount').autoNumeric('set', Units);

                if (ProductCurrency == "" || ProductCurrency == null) {

                }
                else {

                    $("#CurrencyExpected").text(ProductCurrency);
                    $("#CurrencyActual").text(ProductCurrency);
                    $("#CurrencyEditExpected").text(ProductCurrency);
                    $("#CurrencyEditActual").text(ProductCurrency);

                }
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


$('#viewObligationProductDetails').click(function () {


    $('#loadProduct').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    if ($('#tbodyExistingProducts tr').length <= 0) {
        getProducts();
    } else {
        getProducts();
        clearobligationproducts();
        $('input:radio[name=ExtProducts]').each(function (i, item) { if ($(item).val() == $("#txtObligationCatalogName").val()) { $(item).prop('checked', true); } });
        //$('input:radio[name=ExtProducts][value=' + $("#txtObligationCatalogName").val() + ']').prop('checked', true);
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
        if ($("#CurrencyActual").text() != "") {
            obliCurrency = $("#CurrencyActual").text();
        }
        else if ($("#CurrencyExpected").text() != "") {
            obliCurrency = $("#CurrencyExpected").text();
        }
        else if ($("#hdnBaseContractCurrency").text() != "") {
            obliCurrency = $("#hdnBaseContractCurrency").text();
        }
        else {
            obliCurrency = $("#hdnBaseCurrency").val();
        }


        var completedate = null;
        if ($("#ddlObligationCatalogStatus").find('option:selected').text() == "Complete" || $("#ddlObligationCatalogStatus").find('option:selected').text() == "Cancelled") {
            completedate = $.datepicker.formatDate('mm/dd/yy', $("#dtObligationProductCompletedDate").datepicker('getDate'));

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
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationcatalogs?contractid=' + vContractID,
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
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/duplicate?contractid=' + vContractID,
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









var vCatalogCount = "No";
var vFinancialCount = "No";
function getObligationCatalogsbycontract(contractid, obligationtext) {
    $("#ulObligationCatalogBody").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationcatalogs/obligationtxt?obligationtext=' + obligationtext,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
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
                            htmlContent += "<td style='padding:2px;'><a href='javascript:void(0);' onclick='checkObligationsstatusupdateNew(this);' class='wit-btn obli_status_chang openmenuObligationCatalogStatusSettings'>" + data[i].ObligationCatalogStatus + "<img class='margin_left_5px' src='/Content/Images/card.png'></a></td>";
                        }
                    }
                    else
                        htmlContent += "<td><a href='javascript:void(0);'  class='wit-btn obli_status_chang'>" + data[i].ObligationCatalogStatus + "<img class='margin_left_5px' src='/Content/Images/card.png'></a></td>";
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

            $('#txtObligationProductsCount').val("No");
            $("#loadingPage").fadeOut();
            vExist = false;
        }
    });

}

function getObligationCatalogsNew(contractid, obligationtext, obligationId) {
    $("#ulObligationCatalogBody").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationcatalogs?obligationtext=' + obligationtext + '&obligationId=' + obligationId,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
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

                    var url = '<input type="checkbox" id="' + data[i].RowKey + '" name="MultipleObligationCatalogs" onclick="checkMultipleObligationCatalogs(this);" value="' + data[i].RowKey + '">&nbsp;<a  href="javascript:void(0)" onclick="ViewObligationCatalogDetail(\'' + data[i].RowKey + '\')" class="linkText">' + data[i].ObligationCatalogName + '</a>&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuRelatedObligationCatalogs"/>';

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





function SaveMulObligationCatalogsProducts() {
    $("#loadingPage").fadeIn();

    $('input:checkbox[name="ExtProductsMul"]:checked').each(function () {

        var vProduct = this.value;
        var vProductID = this.id;
        var Units = "";
        var Price = "";
        var Currency = "";
        if ($(this).parent().parent().find('#ProductUnits').text() != null && $(this).parent().parent().find('#ProductUnits').text() != "" && $(this).parent().parent().find('#ProductUnits').text() != "null") {
            Units = $(this).parent().parent().find('#ProductUnits').text();
        }
        if ($(this).parent().parent().find('#ProductPrice').text() != null && $(this).parent().parent().find('#ProductPrice').text() != "" && $(this).parent().parent().find('#ProductPrice').text() != "null" && $(this).parent().parent().find('#ProductPrice').text() != 0) {
            Price = $(this).parent().parent().find('#ProductPrice').text();
        }

        if ($("#hdncatalogselect").val() == "MULTIPLE") {
            var catalogForm = "ObligationCatalogName=" + vProduct;

            catalogForm += "&ObligationText=" + $("#txtObligationNewText").val();
            catalogForm += "&ObligationUnits=" + Units;
            catalogForm += "&AccountID=" + localStorage.AccountID;
            catalogForm += "&CreatedBy=" + localStorage.UserName;
            catalogForm += "&ModifiedBy=" + localStorage.UserName;
            catalogForm += "&ObligationQuantity=" + "";
            catalogForm += "&ObligationQtyType=" + "";
            catalogForm += "&Description=" + "";
            catalogForm += "&ObligationCatalogStatus=" + "";
            //Merge the Financials
            catalogForm += "&ObligationCurrency=" + $("#hdnContractCurrency").text();
            catalogForm += "&ObligationAmountType=" + "";
            catalogForm += "&ObligationTransactionType=" + $("#hdnTransactionType").text();
            catalogForm += "&AmountActual=" + "";
            catalogForm += "&ObligationAmount=" + Price;


            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationcatalogs?contractid=' + vContractID,
                type: 'POST',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                data: catalogForm,
                cache: false,
                success: function (data) {

                },
                error: function (data) {
                    $("#loadingPage").fadeOut();
                }
            });
        }
        else {

            var catalogForm = "ObligationFinancialsName=" + vProduct;

            catalogForm += "&ObligationText=" + $("#txtObligationNewText").val();
            catalogForm += "&ObligationAmount=" + Price;
            catalogForm += "&AccountID=" + localStorage.AccountID;
            catalogForm += "&CreatedBy=" + localStorage.UserName;
            catalogForm += "&ModifiedBy=" + localStorage.UserName;
            catalogForm += "&ObligationCurrency=" + $("#hdnContractCurrency").text();
            catalogForm += "&ObligationAmountType=" + "";
            catalogForm += "&Description=" + "";
            catalogForm += "&ObligationFinancialsStatus=" + "";

            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationfinancials?contractid=' + vContractID,
                type: 'POST',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                data: catalogForm,
                cache: false,
                success: function (data) {

                },
                error: function (data) {
                    $("#loadingPage").fadeOut();
                }
            });
        }


    });

    if ($("#hdncatalogselect").val() == "MULTIPLE") {
        getObligationCatalogsbycontract(vContractID, $("#txtObligationNewText").val());
    }
    else {
        getObligationFinancialsbycontract(vContractID, $("#txtObligationNewText").val());
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

    if (multipleObligationProductsChecks.trim() == "") {
        $("#obligationCatalogAction").css('display', 'none');
    }
    try {
        hideAllMenuAndStopPro(event);
    }
    catch (ex) {

    }
}






function contextMenuObligationCatalogMul(action, el, pos) {
    switch (action) {

        case "delete":
            {
                swal({
                    title: '',
                    text: "Are you sure you want to '<span style=\"font-weight:700\">delete</span>' Items?",
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
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationscatalogs?catalogids=' + multipleObligationProductsChecks,
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



$('#btnAddObligationCatalogInline').click(function () {



    $("#spInProgress").css('visibility', 'visible');
    if (requiredValidator('ObligationCatalogInline', false)) {

        var vTitle = $("#txtObligationCatalogName").val();

        $("#loadingPage").fadeIn();


        CreateObligationCatalogQuick();


    }
    $("#spInProgress").css('visibility', 'hidden');
    $("#loadingPage").fadeOut();





});


function CreateObligationCatalogQuick() {
    var vTitle = $("#txtObligationCatalogTitleInline").val();

    var catalogForm = "ObligationCatalogName=" + vTitle;

    catalogForm += "&ObligationText=" + $("#txtObligationNewText").val();
    catalogForm += "&ObligationUnits=" + $("#ddlObligationCatalogUnitsInline option:selected").text();
    catalogForm += "&AccountID=" + localStorage.AccountID;
    catalogForm += "&CreatedBy=" + localStorage.UserName;
    catalogForm += "&ModifiedBy=" + localStorage.UserName;
    catalogForm += "&ObligationQuantity=" + $("#txtObligationCatalogQtyInline").val();
    catalogForm += "&ObligationQtyType=" + $("#ddlObligationCatalogInlineUnitsType option:selected").text();
    catalogForm += "&Description=" + "";
    catalogForm += "&ObligationCatalogStatus=" + $("#ddlObligationCatalogStatusInline option:selected").text();
    catalogForm += "&QuantityActual=" + "";



    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationcatalogs?contractid=' + vContractID,
        type: 'POST',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        data: catalogForm,
        cache: false,
        success: function (data) {
            togglediv('tblObligationCatalog', '', '');

            getObligationCatalogsbycontract(vContractID, $("#txtObligationNewText").val());

        },
        error: function (data) {
            $("#loadingPage").fadeOut();
        }
    });
}




function viewObligationCatalogProductsQuick() {

    $("#hdncatalogselect").val("QUICK");

    $('#loadProduct').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    if ($('#tbodyExistingProducts tr').length <= 0) {
        getProducts();
    } else {
        clearobligationproducts();
        $('#loadProduct').empty();
        $("#viewProductsPopup").dialog("option", "title", "Products & Services Catalog");
        $("#viewProductsPopup").dialog("open");
    }
}


function viewObligationFinancialsProductsQuick() {

    $("#hdncatalogselect").val("FINANCIALQUICK");

    $('#loadProduct').html('<img src="../Content/Images/icon/loading.gif"> Working on it...');
    if ($('#tbodyExistingProducts tr').length <= 0) {
        getProducts();
    } else {
        clearobligationproducts();
        $('#loadProduct').empty();
        $("#viewProductsPopup").dialog("option", "title", "Products & Services Catalog");
        $("#viewProductsPopup").dialog("open");
    }
}



// Add More Click Event
$('#addObligationFinancialspopup').click(function () {

    clearobligationfinancials();
    $("#hdncatalogselect").val("FINANCIALSINGLE");

    $(".validelement").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });

    $('#obligationfinancialsAddPopup').dialog('open');
});



$('#addObligationFinancialsMultipopup').click(function () {

    $("#hdncatalogselect").val("FINANCIALMULTIPLE");

    if ($('#tbodyExistingMulProducts tr').length <= 0) {
        getProducts();
    } else {
        clearObligationproductsmul();
        $('#loadProduct').empty();
        $("#viewProductsMulPopup").dialog("option", "title", "Products & Services Catalog");
        $("#viewProductsMulPopup").dialog("open");
    }

});




function SaveObligationfinancials() {


    $("#spInProgress").css('visibility', 'visible');
    if (requiredValidator('ObligationFinancialsForm', false)) {

        var vTitle = $("#txtObligationFinancialsName").val();

        $("#loadingPage").fadeIn();


        CreateObligationFinancial();


    }
    $("#spInProgress").css('visibility', 'hidden');
    $("#loadingPage").fadeOut();

}

function CreateObligationFinancial() {
    var vTitle = $("#txtObligationFinancialsName").val();



    var catalogForm = "ObligationFinancialsName=" + vTitle;

    catalogForm += "&ObligationText=" + $("#txtObligationNewText").val();
    catalogForm += "&ObligationAmount=" + $("#txtObligationFinancialsAmount").val();
    catalogForm += "&AccountID=" + localStorage.AccountID;
    catalogForm += "&CreatedBy=" + localStorage.UserName;
    catalogForm += "&ModifiedBy=" + localStorage.UserName;
    catalogForm += "&ObligationCurrency=" + $("#hdnContractCurrency").text();
    catalogForm += "&ObligationAmountType=" + $("#ddlObligationFinancialsAmountType option:selected").text();
    catalogForm += "&Description=" + $("#txtObligationFinancialsDesc").val();
    catalogForm += "&ObligationFinancialsStatus=" + $("#ddlObligationFinancialsStatus option:selected").text();
    catalogForm += "&ObligationTransactionType=" + $("#hdnTransactionType").text();

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationfinancials?contractid=' + vContractID,
        type: 'POST',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        data: catalogForm,
        cache: false,
        success: function (data) {
            getObligationFinancialsbycontract(vContractID, $("#txtObligationNewText").val());
            $("#obligationfinancialsAddPopup").dialog("close");

        },
        error: function (data) {
            $("#loadingPage").fadeOut();
        }
    });
}

function getObligationFinancialsbycontract(contractid, obligationtext) {
    $("#ulObligationFinancialsBody").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationfinancials/obligationtxt?obligationtext=' + obligationtext,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            $("#loadingPage").fadeOut();
            if (data.length > 0) {
                vFinancialCount = "Yes";
                $('#txtObligationFinancialsCount').val("Yes");

                document.getElementById('obligationFinancialsDetailsTable').style.display = '';
                document.getElementById('NoObligationFinantials').style.display = 'none';
                for (var i = 0; i < data.length; i++) {
                    var str = "";
                    var strCommitment = "";
                    var strCom = "";
                    var url = '<input type="checkbox" id="' + data[i].RowKey + '" name="MultipleObligationFinancials" onclick="checkMultipleObligationFinancials(this);" value="' + data[i].RowKey + '">&nbsp;<a  href="javascript:void(0)" onclick="ViewObligationFinancialsDetail(\'' + data[i].RowKey + '\')" class="linkText">' + data[i].ObligationFinancialsName + '</a>&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuRelatedObligationFinancials"/>';
                    var htmlContent = "<tr>";
                    htmlContent += "<td  ><span >&nbsp;</span><p id='FinancialsID' style='display:none;'>" + data[i].RowKey + "</p>";
                    htmlContent += "<span id='ObligationFinancialsTitle' style='display:none;'>" + data[i].ObligationFinancialsName + "</span>";
                    htmlContent += "<span id='ObligationFinancialsObligationText' style='display:none;'>" + data[i].ObligationText + "</span>";
                    htmlContent += "<span id=''ObligationFinancialsAmount' style='display:none;'>" + data[i].ObligationAmount + "</span>";
                    htmlContent += "<span id=''ObligationFinancialsAmountType' style='display:none;'>" + data[i].ObligationAmountType + "</span>";

                    htmlContent += "<i class='obligation_Products_Items'>" + url + "</i></td>";
                    htmlContent += "<td ><span style='margin-left: 10px;float: left;'  id='ObligationAmount" + data[i].RowKey + "'>" + data[i].ObligationAmount + "</span>&nbsp;<lable style='float:left;margin-left: 10px;'> (" + $("#hdnContractCurrency").text() + ") </lable></td>";

                    htmlContent += "<td  ><lable id='ObligationStatus" + data[i].RowKey + "'>" + data[i].ObligationFinancialsStatus + "</lable></td>"
                    htmlContent += "</tr>";
                    $("#ulObligationFinancialsBody").append(htmlContent);

                }
                $(".openmenuRelatedObligationFinancials").contextMenu({ menu: 'dropdownMenuRelatedObligationFinancials', leftButton: true }, function (action, el, pos) {
                    contextMenuObligationFinancials(action, el.parent("i").parent("td").parent("tr"), pos);
                });

            }
            else {

            }

        },
        error: function (data) {
            document.getElementById("cbObligationCatalogFinancialsSelect").disabled = false;
            vFinancialCount = "No";
            $('#NoObligationFinantials').css('display', '');
            $('#txtObligationFinancialsCount').val("No");
            $("#loadingPage").fadeOut();
            vExist = false;
        }
    });

}


var multipleObligationFinancialsChecks = "";
function checkMultipleObligationFinancials(object) {

    var CatalogID = object.id
    var isChecked = object.checked;
    if (isChecked) {
        $("#obligationFinancialsAction").css('display', '');
        multipleObligationFinancialsChecks = multipleObligationFinancialsChecks + ';' + CatalogID;
    } else {
        multipleObligationFinancialsChecks = multipleObligationFinancialsChecks.replace(';' + CatalogID, '');
    }

    if (multipleObligationFinancialsChecks.trim() == "") {
        $("#obligationFinancialsAction").css('display', 'none');
    }
    try {
        hideAllMenuAndStopPro(event);
    }
    catch (ex) {

    }
}



function contextMenuObligationFinancialsMul(action, el, pos) {

    switch (action) {

        case "delete":
            {
                swal({
                    title: '',
                    text: "Are you sure you want to '<span style=\"font-weight:700\">delete</span>' Items?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
     function (confirmed) {
         if (confirmed) {
             $("#loadingPage").fadeIn();

             var multipleChecksArray = multipleObligationFinancialsChecks.split(';');
             var multipleChecksArraylength = multipleChecksArray.length;
             for (var i = 1; i < multipleChecksArraylength; i++) {
                 $.ajax({
                     url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationfinancials?catalogid=' + multipleChecksArray[i],
                     type: 'DELETE',
                     dataType: 'json',
                     headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                     cache: false,
                     success: function (data) {
                     }
                 });



             }
             swal("", "Items Deleted");
             getObligationFinancialsbycontract(vContractID, $("#txtObligationNewText").val());

             $("#obligationFinancialsAction").css('display', 'none');
             $("#loadingPage").fadeOut();

         }
         return;
     });

                break;
            }
    }
}


$('#viewObligationFinancialsProductDetails').click(function () {


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


$('#btnAddObligationFinancialsInline').click(function () {



    $("#spInProgress").css('visibility', 'visible');
    if (requiredValidator('ObligationFinancialsInline', false)) {

        var vTitle = $("#txtObligationFinancialsTitleInline").val();

        $("#loadingPage").fadeIn();


        CreateObligationFinancialQuick();


    }
    $("#spInProgress").css('visibility', 'hidden');
    $("#loadingPage").fadeOut();





});

function CreateObligationFinancialQuick() {
    var vTitle = $("#txtObligationFinancialsTitleInline").val();

    var catalogForm = "ObligationFinancialsName=" + vTitle;

    catalogForm += "&ObligationText=" + $("#txtObligationNewText").val();
    catalogForm += "&ObligationAmount=" + $("#txtObligationFinancialAmountInline").val();
    catalogForm += "&AccountID=" + localStorage.AccountID;
    catalogForm += "&CreatedBy=" + localStorage.UserName;
    catalogForm += "&ModifiedBy=" + localStorage.UserName;
    catalogForm += "&ObligationCurrency=" + $("#hdnContractCurrency").text();
    catalogForm += "&ObligationAmountType=" + $("#ddlObligationFinancialsInlineAmountType option:selected").text();
    catalogForm += "&Description=" + "";
    catalogForm += "&ObligationFinancialsStatus=" + $("#ddlObligationFinancialsStatusInline option:selected").text();
    catalogForm += "&ObligationTransactionType=" + $("#hdnTransactionType").text();


    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationfinancials?contractid=' + vContractID,
        type: 'POST',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        data: catalogForm,
        cache: false,
        success: function (data) {

            swal("", "Item Added");
            togglediv('tblObligationFinancials', '', '');

            getObligationFinancialsbycontract(vContractID, $("#txtObligationNewText").val());

        },
        error: function (data) {
            $("#loadingPage").fadeOut();
        }
    });
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
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationcatalogs?catalogid=' + catalogId,
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
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationcatalogs?catalogid=' + catalogId,
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



function ViewObligationCatalogDetail(catalogid) {
    $("#loadingPage").fadeIn();
    $('#tblObligationCatalogMetadataDetail').html('<tr><td><img src="../Content/Images/icon/loading.gif"/></td></tr>');

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationcatalogs?catalogid=' + catalogid,
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

                $("#tblObligationCatalogMetadataDetail").html(vMetadata);
                setBlankValueToHyphen("tblObligationCatalogMetadataDetail");
                $("#obligationcatalogsViewPopup").dialog("option", "title", "View Catalog");
                $("#obligationcatalogsViewPopup").dialog("open");
                $("#obligationcatalogsViewPopup").height("auto");



            }
        }
    });
}





function contextMenuObligationFinancials(action, el, pos) {

    switch (action) {
        case "view":
            {
                var catalogId = $(el).find("#FinancialsID").text();
                ViewObligationFinancialsDetail(catalogId);
                break;
            }
        case "delete":
            {
                var catalogTitle = $(el).find("#ObligationFinancialsTitle").text();
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
             var catalogId = $(el).find("#FinancialsID").text();
             $.ajax({
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationfinancials?catalogid=' + catalogId,
                 type: 'DELETE',
                 dataType: 'json',
                 headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                 "Content-Type": "application/json",
                 cache: false,
                 success: function (data) {
                     swal("", "Item Deleted");
                     getObligationFinancialsbycontract(vContractID, $("#txtObligationNewText").val());
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
                var catalogId = $(el).find("#FinancialsID").text();
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationfinancials?financialid=' + catalogId,
                    type: 'GET',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    "Content-Type": "application/json",
                    cache: false,
                    success: function (cataloentity) {
                        $("#lblObligationFinancialsCTitleEdit").text($("#lblContractTitle").text());


                        $("#txtObligationFinancialsIDedit").val(cataloentity.RowKey);
                        $("#txtObligationFinancialsNameedit").val(cataloentity.ObligationFinancialsName);

                        if (cataloentity.Description != "" && cataloentity.Description != null) {
                            $("#txtObligationFinancialsDescEdit").val(cataloentity.Description);
                        }
                        else {
                            $("#txtObligationFinancialsDescEdit").val("");
                        }

                        if (cataloentity.ObligationAmount != "" && cataloentity.ObligationAmount != null) {
                            $("#txtObligationFinancialsAmountEdit").val(cataloentity.ObligationAmount);
                        }
                        else {
                            $("#txtObligationFinancialsAmountEdit").val("");
                        }

                        if (cataloentity.ObligationFinancialsStatus != "" && cataloentity.ObligationFinancialsStatus != null) {
                            $("#ddlObligationFinancialsStatusEdit").val(cataloentity.ObligationFinancialsStatus);
                        }
                        else {
                            $("#ddlObligationFinancialsStatusEdit").val(0);
                        }


                        if (cataloentity.ObligationAmountType != "" && cataloentity.ObligationAmountType != null) {
                            $("#ddlObligationFinancialsAmountTypeEdit").val(cataloentity.ObligationAmountType);
                        }
                        else {
                            $("#ddlObligationFinancialsAmountTypeEdit").val(0);
                        }



                    },
                    complete: function () {
                        $("#loadingPage").fadeOut();
                    }
                });


                $("#obligationfinancialseditPopup").dialog("option", "title", "Edit Financials");
                $("#obligationfinancialseditPopup").dialog("open");
                break;
            }


    }
}



function ViewObligationFinancialsDetail(catalogid) {
    $("#loadingPage").fadeIn();
    $('#tblObligationFinancialsMetadataDetail').html('<tr><td><img src="../Content/Images/icon/loading.gif"/></td></tr>');

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationfinancials?financialid=' + catalogid,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
        "Content-Type": "application/json",
        cache: false,
        success: function (catalogentity) {

            $("#loadingPage").fadeOut();

            if (catalogentity != null) {

                var vMetadata = '<tr>';
                vMetadata += '<td class="text_label width40">Financial Title</td>';
                vMetadata += '<td class="text width60">' + catalogentity.ObligationFinancialsName + '</td>';
                vMetadata += '</tr>';
                vMetadata += '<tr>';
                vMetadata += '<td class="text_label width40">Currency </td>';
                vMetadata += '<td class="text width60">' + catalogentity.ObligationCurrency + '</td>';
                vMetadata += '</tr>';
                vMetadata += '<tr>';
                vMetadata += '<td class="text_label width40">Amount</td>';
                vMetadata += '<td class="text width60">';
                if (catalogentity.ObligationAmount != '') {
                    vMetadata += catalogentity.ObligationAmount + " ( " + catalogentity.ObligationAmountType + " )";
                }
                vMetadata += '</td>';
                vMetadata += '</tr>';
                vMetadata += '<tr>';
                vMetadata += '<td class="text_label width40">Status</td>';
                if (catalogentity.ObligationFinancialsStatus != null) {
                    var vDueDate = catalogentity.ObligationFinancialsStatus;
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

                $("#tblObligationFinancialsMetadataDetail").html(vMetadata);
                setBlankValueToHyphen("tblObligationFinancialsMetadataDetail");
                $("#obligationFinancialsViewPopup").dialog("option", "title", "View Catalog");
                $("#obligationFinancialsViewPopup").dialog("open");
                $("#obligationFinancialsViewPopup").height("auto");



            }
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
    if ($("#hdnContractCurrency").text() != "") {
        obliCurrency = $("#hdnContractCurrency").text();
    }
    else if ($("#hdnBaseCurrency").val() != "") {
        obliCurrency = $("#hdnBaseCurrency").val();
    }
    else {
        obliCurrency = "USD";
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
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationcatalogs?catalogid=' + vCatalogId,
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


function UpdateObligationfinancials() {

    $("#loadingPage").fadeIn();
    $("#spInProgress").css('visibility', 'visible');
    if (requiredValidator('ObligationFinancialsFormEdit', false)) {

        var vTitle = $("#txtObligationFinancialsNameedit").val();
        var vCatalogId = $("#txtObligationFinancialsIDedit").val();


        UpdateObligationfinancialsNew();


    }
    else {
        $("#loadingPage").fadeOut();
    }
    $("#spInProgress").css('visibility', 'hidden');


}


function UpdateObligationfinancialsNew() {

    var vTitle = $("#txtObligationFinancialsNameedit").val();
    var vCatalogId = $("#txtObligationFinancialsIDedit").val();

    var catalogForm = "ObligationFinancialsName=" + vTitle;

    catalogForm += "&ObligationText=" + $("#txtObligationNewText").val();
    catalogForm += "&ObligationAmount=" + $("#txtObligationFinancialsAmountEdit").val();
    catalogForm += "&AccountID=" + localStorage.AccountID;
    catalogForm += "&ModifiedBy=" + localStorage.UserName;
    catalogForm += "&ObligationCurrency=" + $("#hdnContractCurrency").text();
    catalogForm += "&ObligationAmountType=" + $("#ddlObligationFinancialsAmountTypeEdit option:selected").text();
    catalogForm += "&Description=" + $("#txtObligationFinancialsDescEdit").val();
    catalogForm += "&ObligationFinancialsStatus=" + $("#ddlObligationFinancialsStatusEdit option:selected").text();
    catalogForm += "&ObligationTransactionType=" + $("#hdnTransactionType").text();


    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationfinancials?financialid=' + vCatalogId,
        type: 'PUT',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        data: catalogForm,
        cache: false,
        success: function (data) {
            $("#loadingPage").fadeOut();

            $("#obligationfinancialseditPopup").dialog("close");
            getObligationFinancialsbycontract(vContractID, $("#hdnObligationUniqueId").text());
        },
        error: function (data) {
            $("#loadingPage").fadeOut();
        }
    });
}


function updateObligationRecurrenceNew(status) {
    var fObligationNewDueDate = '';
    if ($("#dtObligationNewDueDate").val() != "" && $("#dtObligationNewDueDate").val() != null) {
        fObligationNewDueDate = $.datepicker.formatDate('mm/dd/yy', $("#dtObligationNewDueDate").datepicker('getDate'));
    }
    var fObligationNewCompletedDate = '';
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
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/recurrenceedit?obligationid=' + ObligationID,
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
                    ContractEndDate: contractItem.EndDate,
                    ContractCurrency: obliCurrency,
                    SendReminderTo: vSendReminderTo,
                    Reminder1: $("#txtReminder1ObligationNew").val(),
                    Reminder2: $("#txtReminder2ObligationNew").val(),
                    Reminder3: $("#txtReminder3ObligationNew").val(),
                    Reminder1Condition: encodeURIComponent($("#ddlReminder1ObligationNew").find('option:selected').text()),
                    Reminder2Condition: encodeURIComponent($("#ddlReminder2ObligationNew").find('option:selected').text()),
                    Reminder3Condition: encodeURIComponent($("#ddlReminder3ObligationNew").find('option:selected').text()),
                    AlertsEnabled: $("#AlertObli").val(),
                    ShowInCalendar: $("input:radio[name=ShowInObligCalendar]:checked").val(),
                    Priority: $("#ddlObligationNewPriority").find('option:selected').val(),
                    AutoComplete: $("input:radio[name=ObligationNewAutoComplete]:checked").val(),
                },
                cache: false,
                success: function (person) {
                    $('.ui-button-green-text').parent().removeAttr('disabled');
                    $("#addEditObligationNew").dialog("close");
                    $("#obligationcatalogsRecurrenceEditPopup").dialog("close");
                    GetObligationCatalogs();
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
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/updatewithcatalog?strObligationText=' + $("#txtObligationNewText").val() + '&obligationId=' + ObligationID,
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
                        ContractEndDate: contractItem.EndDate,
                        ContractCurrency: obliCurrency,
                        SendReminderTo: vSendReminderTo,
                        Reminder1: $("#txtReminder1ObligationNew").val(),
                        Reminder2: $("#txtReminder2ObligationNew").val(),
                        Reminder3: $("#txtReminder3ObligationNew").val(),
                        Reminder1Condition: encodeURIComponent($("#ddlReminder1ObligationNew").find('option:selected').text()),
                        Reminder2Condition: encodeURIComponent($("#ddlReminder2ObligationNew").find('option:selected').text()),
                        Reminder3Condition: encodeURIComponent($("#ddlReminder3ObligationNew").find('option:selected').text()),
                        AlertsEnabled: $("#AlertObli").val(),
                        ShowInCalendar: $("input:radio[name=ShowInObligCalendar]:checked").val(),
                        Priority: $("#ddlObligationNewPriority").find('option:selected').val(),
                        AutoComplete: $("input:radio[name=ObligationNewAutoComplete]:checked").val(),
                    },
                    cache: false,
                    success: function (person) {
                        $('.ui-button-green-text').parent().removeAttr('disabled');
                        $("#addEditObligationNew").dialog("close");
                        $("#obligationcatalogsRecurrenceEditPopup").dialog("close");
                        GetObligationCatalogs();
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
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/updateobligationbyText?strObligationText=' + $("#txtObligationNewText").val() + '&obligationId=' + ObligationID,
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
                        ContractEndDate: contractItem.EndDate,
                        ContractCurrency: obliCurrency,
                        SendReminderTo: vSendReminderTo,
                        Reminder1: $("#txtReminder1ObligationNew").val(),
                        Reminder2: $("#txtReminder2ObligationNew").val(),
                        Reminder3: $("#txtReminder3ObligationNew").val(),
                        Reminder1Condition: encodeURIComponent($("#ddlReminder1ObligationNew").find('option:selected').text()),
                        Reminder2Condition: encodeURIComponent($("#ddlReminder2ObligationNew").find('option:selected').text()),
                        Reminder3Condition: encodeURIComponent($("#ddlReminder3ObligationNew").find('option:selected').text()),
                        AlertsEnabled: $("#AlertObli").val(),
                        ShowInCalendar: $("input:radio[name=ShowInObligCalendar]:checked").val(),
                        Priority: $("#ddlObligationNewPriority").find('option:selected').val(),
                        AutoComplete: $("input:radio[name=ObligationNewAutoComplete]:checked").val(),
                    },
                    cache: false,
                    success: function (person) {
                        $('.ui-button-green-text').parent().removeAttr('disabled');
                        $("#addEditObligationNew").dialog("close");
                        $("#obligationcatalogsRecurrenceEditPopup").dialog("close");
                        GetObligationCatalogs();
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
            listAllObligations = "";
            $("#txtObligationNewID").val('');
            modalOnOpenObligationNew();
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
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/recurrenceedit?obligationid=' + ObligationID,
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
                        ContractEndDate: contractItem.EndDate,
                        ContractCurrency: obliCurrency,
                        SendReminderTo: vSendReminderTo,
                        Reminder1: $("#txtReminder1ObligationNew").val(),
                        Reminder2: $("#txtReminder2ObligationNew").val(),
                        Reminder3: $("#txtReminder3ObligationNew").val(),
                        Reminder1Condition: encodeURIComponent($("#ddlReminder1ObligationNew").find('option:selected').text()),
                        Reminder2Condition: encodeURIComponent($("#ddlReminder2ObligationNew").find('option:selected').text()),
                        Reminder3Condition: encodeURIComponent($("#ddlReminder3ObligationNew").find('option:selected').text()),
                        AlertsEnabled: $("#AlertObli").val(),
                        ShowInCalendar: $("input:radio[name=ShowInObligCalendar]:checked").val(),
                        Priority: $("#ddlObligationNewPriority").find('option:selected').val(),
                        AutoComplete: $("input:radio[name=ObligationNewAutoComplete]:checked").val(),
                    },
                    cache: false,
                    success: function (person) {
                        $('.ui-button-green-text').parent().removeAttr('disabled');
                        $("#addEditObligationNew").dialog("close");
                        $("#obligationRecurrenceEditPopup").dialog("close");
                        GetObligationCatalogs();
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
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/updateUpcoming?strObligationText=' + $("#txtObligationNewText").val() + '&obligationId=' + ObligationID,
                    type: 'POST',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                    cache: false,
                    success: function (person) {

                        $("#obligationcatalogsRecurrenceEditPopup").dialog("close");
                        $("#hdnObligationUniqueId").text('');
                        $("#hdnObligationUniqueId").text(person);
                        $("#txtObligationNewID").val('');
                        modalOnOpenObligationNew();
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
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/updateUpcoming?strObligationText=' + $("#txtObligationNewText").val() + '&obligationId=' + ObligationID,
                    type: 'POST',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                    cache: false,
                    success: function (person) {
                        $("#obligationcatalogsRecurrenceEditPopup").dialog("close");
                        $("#hdnObligationUniqueId").text('');
                        $("#hdnObligationUniqueId").text(person);
                        $("#txtObligationNewID").val('');
                        modalOnOpenObligationNew();
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

var vObligationTextEditRecurrence = "";
var vObligationFlaging = "";

function modalOnOpenObligationNew() {
    //Sridhar
    //Check if milestone owner is part of contract
    var isNotOwner = false;
    var ownervalidation = false;
    var arrNewOwners = [];
    var arrObligationOwner = $("#ddlObligationNewOwner").val();
    var isGroup = false;
    $(arrObligationOwner).each(function (i, item) {
        if (item.indexOf('{') > -1) {
            isGroup = true;
        }
    });
    if (isGroup) {
        arrNewOwners = getMilestoneOwners(arrObligationOwner.join(';'));

        var vNotObligationOwner = '';
        $(arrNewOwners).each(function (i, item) {
            if (contractItem.FullControlPermissions.indexOf(item) <= -1 && contractItem.ReadWritePermissions.indexOf(item) <= -1) {
                if (vNotObligationOwner == '') {
                    vNotObligationOwner = item;
                }
                else {
                    vNotObligationOwner += "; " + item;
                }
            }
        });
    }
    else {
        var vNotObligationOwner = '';
        $(arrObligationOwner).each(function (i, item) {
            if (contractItem.FullControlPermissions.indexOf(item) <= -1 && contractItem.ReadWritePermissions.indexOf(item) <= -1) {
                if (vNotObligationOwner == '') {
                    vNotObligationOwner = item;
                }
                else {
                    vNotObligationOwner += "; " + item;
                }
            }
        });
    }

    if (vNotObligationOwner != '') {
        swal({
            title: '',
            text: "<span style=\"font-weight:700\">'" + vNotObligationOwner + "'</span> do not have permission to access to this contract or not part of contract.",
            showCancelButton: false,
            confirmButtonText: 'OK',
            html: true
        });
        $("#loadingPage").fadeOut();
        isNotOwner = true;
    }
    //Sridhar
    if ($("#ddlObligationStatus").find('option:selected').text() == "Complete") {
        if (!isNotOwner) {
            if (validateproducts) {
                modalonOpenObligationNewEdit();
            }
            else {
                swal("", "Related Catalog status need to be completed.");
            }
        }
    }
    else {
        if ($("input:radio[name=ObligationNewAutoComplete]:checked").val() == "Yes") {
            if (!isNotOwner) {
                if (validateproducts) {
                    modalonOpenObligationNewEdit();
                }
                else {
                    //eO310068 - Anand
                    //eO311149 - Chethan
                    swal("", "Obligation will be auto completed only if all the Products/Services & Commitments are completed before Start/Due date.");
                    modalonOpenObligationNewEdit();
                }
            }
        }
        else {
            if (!isNotOwner)
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
        if (requiredValidator('obligationreqvalidator1')) {

            if (requiredValidator('obligationreqvalidator2')) {
                if (requiredValidator('dvObliOccurrenceDates')) {
                    if (comparedatestatus($.datepicker.formatDate('mm/dd/yy', $("#dtObligationNewDueDate").datepicker('getDate')), $("#ddlObligationStatus").val())) {
                        var oValidate = true;
                        if ($('#ddlObligationOccurencess').val() == "Weekly") {
                            var strrecuobli = "";
                            $("input:checkbox[name=chkRecurrenceCustom]:checked").each(function () {
                                strrecuobli += (this.value) + ",";
                            });

                            if (strrecuobli == "") {
                                oValidate = false;
                            }

                        }

                        if (oValidate) {
                            if (ObligationID != "") {
                                if (listAllObligations != "") {
                                    if ($('#ddlObligationOccurencess').val() == "None") {
                                        $(listAllObligations).each(function (i, item) {
                                            if (ObligationID != item.RowKey) {
                                                if ($("#txtObligationNewTitle").val() == item.ObligationTitle) {
                                                    if (!comparedatesequal(moment(new Date(item.DueDate)).utc().format('MM/DD/YYYY'), $.datepicker.formatDate('mm/dd/yy', $("#dtObligationNewDueDate").datepicker('getDate')))) {
                                                        if (oValidate) {
                                                            swal("", "Obligation title for the particular date already exist.");
                                                        }
                                                        oValidate = false;
                                                    }
                                                }
                                            }

                                        });
                                    }
                                    else {
                                        if (listObligationNewData != "") {
                                            var txtObligationNewText = $("#txtObligationNewText").val();
                                            $(listAllObligations).each(function (i, item) {
                                                if (ObligationID != item.RowKey) {
                                                    if ($("#txtObligationNewTitle").val() == item.ObligationTitle && item.ObligationText != txtObligationNewText) {
                                                        if (!comparedatesequalrecurrence(item.DueDate, listObligationNewData)) {
                                                            if (oValidate) {
                                                                swal("", "Obligation title for one of the date in recurrence already exist.");
                                                            }
                                                            oValidate = false;
                                                        }
                                                    }
                                                }
                                            });
                                        }
                                    }
                                }
                            }
                            else {
                                if (listAllObligations != "") {
                                    if ($('#ddlObligationOccurencess').val() == "None") {
                                        $(listAllObligations).each(function (i, item) {
                                            if ($("#txtObligationNewTitle").val() == item.ObligationTitle) {
                                                if (!comparedatesequal(moment(new Date(item.DueDate)).utc().format('MM/DD/YYYY'), $.datepicker.formatDate('mm/dd/yy', $("#dtObligationNewDueDate").datepicker('getDate')))) {
                                                    if (oValidate) {
                                                        swal("", "Obligation title for the particular date already exist.");
                                                    }
                                                    oValidate = false;
                                                }
                                            }
                                        });
                                    }
                                    else {
                                        if (listObligationNewData != "") {
                                            $(listAllObligations).each(function (i, item) {
                                                if ($("#txtObligationNewTitle").val() == item.ObligationTitle && item.ObligationText != $('#hdnObligationUniqueId').text()) {
                                                    if (!comparedatesequalrecurrence(item.DueDate, listObligationNewData)) {
                                                        if (oValidate) {
                                                            swal("", "Obligation title for one of the date in recurrence already exist.");
                                                        }
                                                        oValidate = false;
                                                    }
                                                }
                                            });
                                        }
                                    }
                                }
                            }

                        }

                        if (oValidate) {

                            if ($('#ddlObligationOccurencess').val() != "None") {
                                if ($('input[name=SelectOccurenceEndDate]:checked').val() == 'Custom') {
                                    if (parseInt($("#txtOccurrenceCount").val()) > 54) {
                                        $("#lblerrorreclimitObligation").css('display', '');
                                        oValidate = false;

                                    }
                                }

                            }



                            if (oValidate) {
                                $("#loadingPage").fadeIn();
                                if (ObligationID != "") {

                                    if (vObligationEditStatus != "") {
                                        if (vObligationEditStatus == "CHANGERECURRENCE") {
                                            if ($('#ddlObligationOccurencess').val() != "None") {
                                                if (listObligationNewData != "") {
                                                    vObligationTextEditRecurrence = $("#txtObligationNewText").val();
                                                    $("#txtObligationNewID").val("");
                                                    modalOnOpenObligationNew();
                                                }
                                                else {
                                                    swal("", "Please modify the occurence to update obligation.");
                                                }
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
                                                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew?obligationid=' + ObligationID,
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
                                                        ModifiedBy: localStorage.UserName,
                                                        ObligationMetBy: obligationmetby,
                                                        CompanyProfile: $("#lblCompanyProfile").text(),
                                                        Counterparty: $("#lblCounterparty").text(),
                                                        ContractEndDate: contractItem.EndDate,
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
                                                        GetObligationCatalogs();
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
                                                //if ($('#ddlObligationOccurencess').val() == "None") {

                                                vObligationTextEditRecurrence = $("#txtObligationNewText").val();

                                                $("#loadingPage").fadeOut();
                                                $("#obligationRecurrenceEditPopup").dialog("option", "title", "Edit Repeat Obligation");
                                                $("#obligationRecurrenceEditPopup").dialog("open");



                                                //}
                                                //else {
                                                //    $("#loadingPage").fadeOut();
                                                //    swal("", "Please modify the occurence to update obligation.");
                                                //    //$("#obligationcatalogsRecurrenceEditPopup").dialog("option", "title", "Edit Repeat Obligation");
                                                //    //$("#obligationcatalogsRecurrenceEditPopup").dialog("open");

                                                //}


                                            }
                                        }
                                        else {
                                            if ($('#ddlObligationOccurencess').val() == "None") {
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
                                                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew?obligationid=' + ObligationID,
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
                                                        ModifiedBy: localStorage.UserName,
                                                        ObligationMetBy: obligationmetby,
                                                        CompanyProfile: $("#lblCompanyProfile").text(),
                                                        Counterparty: $("#lblCounterparty").text(),
                                                        ContractEndDate: contractItem.EndDate,
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
                                                        GetObligationCatalogs();
                                                    },
                                                    complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                                                });

                                            }
                                            else {
                                                if (listObligationNewData != "") {
                                                    $("#loadingPage").fadeOut();
                                                    $("#obligationcatalogsRecurrenceEditPopup").dialog("option", "title", "Edit Repeat Obligation");
                                                    $("#obligationcatalogsRecurrenceEditPopup").dialog("open");
                                                }
                                                else {
                                                    $("#loadingPage").fadeOut();
                                                    swal("", "Please modify the occurence to update obligation.");
                                                }

                                            }
                                        }

                                    }
                                    else {
                                        if ($('#ddlObligationOccurencess').val() == "None") {
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
                                                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew?obligationid=' + ObligationID,
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
                                                    ModifiedBy: localStorage.UserName,
                                                    ObligationMetBy: obligationmetby,
                                                    CompanyProfile: $("#lblCompanyProfile").text(),
                                                    Counterparty: $("#lblCounterparty").text(),
                                                    ContractEndDate: contractItem.EndDate,
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
                                                    GetObligationCatalogs();
                                                },
                                                complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                                            });


                                        }
                                        else {
                                            //if (listObligationNewData != "") {
                                            $("#loadingPage").fadeOut();
                                            $("#obligationcatalogsRecurrenceEditPopup").dialog("option", "title", "Edit Repeat Obligation");
                                            $("#obligationcatalogsRecurrenceEditPopup").dialog("open");
                                            //}
                                            //else {
                                            //    $("#loadingPage").fadeOut();
                                            //    swal("", "Please modify the occurence to update obligation.");
                                            //}
                                        }
                                    }
                                }
                                else {
                                    $("#inprocessObligation").css('visibility', 'visible');


                                    if ($('#ddlObligationOccurencess').val() != "None") {

                                        if ($('input[name=SelectOccurenceEndDate]:checked').val() == 'Custom') {
                                            if (parseInt($("#txtOccurrenceCount").val()) > 54) {
                                                $("#lblerrorreclimitObligation").css('display', '');
                                                $("#loadingPage").fadeOut();

                                            }
                                            else {
                                                $("#lblerrorreclimitObligation").css('display', '');

                                                if ($('#ddlObligationOccurencess').val() == "Weekly") {

                                                    var validobli = false;

                                                    var strrecuobli = "";
                                                    $("input:checkbox[name=chkRecurrenceCustom]:checked").each(function () {
                                                        strrecuobli += (this.value) + ",";
                                                    });

                                                    if (strrecuobli != "") {
                                                        validobli = true;
                                                    }

                                                    if (validobli) {
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
                                                        var contractForm = "ContractID=" + getParameterByName('ContractID');
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
                                                        contractForm += "&CustomString=" + encodeURIComponent(strrecuobli);
                                                        contractForm += "&ObligationEndTerm=" + encodeURIComponent($("input:radio[name=SelectOccurenceEndDate]:checked").val());
                                                        contractForm += "&ObligationMet=" + encodeURIComponent(obligationmet);
                                                        contractForm += "&ObligationMetBy=" + encodeURIComponent(obligationmetby);

                                                        contractForm += "&CompanyProfile=" + encodeURIComponent($("#lblCompanyProfile").text());
                                                        contractForm += "&Counterparty=" + encodeURIComponent($("#lblCounterparty").text());
                                                        var contEndDate = (contractItem.EndDate != null ? moment(contractItem.EndDate).format('MM/DD/YYYY') : contractItem.EndDate);
                                                        contractForm += "&ContractEndDate=" + encodeURIComponent(contEndDate);
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
                                                        if (typeof Values != "undefined" && Values != null) {
                                                            for (var j = 0; j < Values.length; j++) {
                                                                strvalues += Values[j] + ",";
                                                            }
                                                            strvalues = removeLastChar(strvalues, ',');
                                                        }
                                                        occurrenceForm += "&Values=" + strvalues;

                                                        formData.append("objoccurrence", occurrenceForm);
                                                        $.ajax({
                                                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnewadvanced?obligationtext=' + $('#hdnObligationUniqueId').text() + '&obligationId=' + $('#hdnObligationRowKey').text(),
                                                            type: 'POST',
                                                            dataType: 'json',
                                                            headers: {
                                                                'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName
                                                            },
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
                                                                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationfinancials/updateobligationtext?obligationtext=' + person,
                                                                        type: 'POST',
                                                                        dataType: 'json',
                                                                        headers: {
                                                                            'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging
                                                                        },
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
                                                                GetObligationCatalogs();

                                                            },
                                                            error: function (data) {
                                                                $("#loadingPage").fadeOut();
                                                            },
                                                            complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                                                        });
                                                    }
                                                    else {
                                                        $("#loadingPage").fadeOut();
                                                    }
                                                }
                                                else {
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
                                                    var contractForm = "ContractID=" + getParameterByName('ContractID');
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
                                                    var contEndDate = (contractItem.EndDate != null ? moment(contractItem.EndDate).format('MM/DD/YYYY') : contractItem.EndDate);
                                                    contractForm += "&ContractEndDate=" + encodeURIComponent(contEndDate);
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
                                                    if (typeof Values != "undefined" && Values != null) {
                                                        for (var j = 0; j < Values.length; j++) {
                                                            strvalues += Values[j] + ",";
                                                        }
                                                        strvalues = removeLastChar(strvalues, ',');
                                                    }
                                                    occurrenceForm += "&Values=" + strvalues;

                                                    formData.append("objoccurrence", occurrenceForm);
                                                    $.ajax({
                                                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnewadvanced?obligationtext=' + $('#hdnObligationUniqueId').text() + '&obligationId=' + $('#hdnObligationRowKey').text(),
                                                        type: 'POST',
                                                        dataType: 'json',
                                                        headers: {
                                                            'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName
                                                        },
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
                                                                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationfinancials/updateobligationtext?obligationtext=' + person,
                                                                    type: 'POST',
                                                                    dataType: 'json',
                                                                    headers: {
                                                                        'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging
                                                                    },
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
                                                            GetObligationCatalogs();
                                                        },
                                                        error: function (data) {
                                                            $("#loadingPage").fadeOut();
                                                        },
                                                        complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                                                    });
                                                }


                                            }
                                        }
                                        else {


                                            if ($('#ddlObligationOccurencess').val() == "Weekly") {

                                                var validobli = false;

                                                var strrecuobli = "";
                                                $("input:checkbox[name=chkRecurrenceCustom]:checked").each(function () {
                                                    strrecuobli += (this.value) + ",";
                                                });

                                                if (strrecuobli != "") {
                                                    validobli = true;
                                                }

                                                if (validobli) {
                                                    var obligationmet = "No";
                                                    var obligationmetby = "";
                                                    var obligationmetdate = null;
                                                    if ($("#ddlObligationStatus").find('option:selected').text() == "Complete") {
                                                        obligationmet = "Yes";
                                                        obligationmetby = localStorage.UserName;
                                                        obligationmetdate = fObligationNewCompletedDate;
                                                    }
                                                    else if ($("#ddlObligationStatus").find('option:selected').text() == "Cancelled") {
                                                        obligationmetdate = fObligationNewCompletedDate
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
                                                    var contractForm = "ContractID=" + getParameterByName('ContractID');
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
                                                    var contEndDate = (contractItem.EndDate != null ? moment(contractItem.EndDate).format('MM/DD/YYYY') : contractItem.EndDate);
                                                    contractForm += "&ContractEndDate=" + encodeURIComponent(contEndDate);
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
                                                    if (typeof Values != "undefined" && Values != null) {
                                                        for (var j = 0; j < Values.length; j++) {
                                                            strvalues += Values[j] + ",";
                                                        }
                                                        strvalues = removeLastChar(strvalues, ',');
                                                    }
                                                    occurrenceForm += "&Values=" + strvalues;

                                                    formData.append("objoccurrence", occurrenceForm);
                                                    $.ajax({
                                                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnewadvanced?obligationtext=' + $('#hdnObligationUniqueId').text() + '&obligationId=' + $('#hdnObligationRowKey').text(),
                                                        type: 'POST',
                                                        dataType: 'json',
                                                        headers: {
                                                            'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName
                                                        },
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
                                                                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationfinancials/updateobligationtext?obligationtext=' + person,
                                                                    type: 'POST',
                                                                    dataType: 'json',
                                                                    headers: {
                                                                        'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging
                                                                    },
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
                                                            GetObligationCatalogs();

                                                        },
                                                        error: function (data) {
                                                            $("#loadingPage").fadeOut();
                                                        },
                                                        complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                                                    });
                                                }
                                                else {
                                                    $("#loadingPage").fadeOut();
                                                }
                                            }
                                            else {
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
                                                var contractForm = "ContractID=" + getParameterByName('ContractID');
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
                                                var contEndDate = (contractItem.EndDate != null ? moment(contractItem.EndDate).format('MM/DD/YYYY') : contractItem.EndDate);
                                                contractForm += "&ContractEndDate=" + encodeURIComponent(contEndDate);
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
                                                if (typeof Values != "undefined" && Values != null) {
                                                    for (var j = 0; j < Values.length; j++) {
                                                        strvalues += Values[j] + ",";
                                                    }
                                                }

                                                strvalues = removeLastChar(strvalues, ',');
                                                occurrenceForm += "&Values=" + strvalues;

                                                formData.append("objoccurrence", occurrenceForm);
                                                $.ajax({
                                                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnewadvanced?obligationtext=' + $('#hdnObligationUniqueId').text() + '&obligationId=' + $('#hdnObligationRowKey').text(),
                                                    type: 'POST',
                                                    dataType: 'json',
                                                    headers: {
                                                        'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName
                                                    },
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
                                                                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationfinancials/updateobligationtext?obligationtext=' + person,
                                                                type: 'POST',
                                                                dataType: 'json',
                                                                headers: {
                                                                    'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging
                                                                },
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
                                                        GetObligationCatalogs();

                                                    },
                                                    error: function (data) {
                                                        $("#loadingPage").fadeOut();
                                                    },
                                                    complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                                                });
                                            }
                                        }
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
                                        var contractForm = "ContractID=" + getParameterByName('ContractID');
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
                                        var contEndDate = (contractItem.EndDate != null ? moment(contractItem.EndDate).format('MM/DD/YYYY') : contractItem.EndDate);
                                        contractForm += "&ContractEndDate=" + encodeURIComponent(contEndDate);
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
                                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnewadvanced?obligationtext=' + $('#hdnObligationUniqueId').text() + '&obligationId=' + $('#hdnObligationRowKey').text(),
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
                                                $("#addEditObligationNew").dialog("close"); $("#loadingPage").fadeOut();


                                                $("#addEditObligationNew").dialog("close");
                                                $("#loadingPage").fadeOut();
                                                clearObligationFormDataNew();
                                                GetObligationCatalogs();
                                            },
                                            error: function (data) {
                                                $("#loadingPage").fadeOut();
                                            },
                                            complete: function () { clearObligationFormDataNew(); $("#loadingPage").fadeOut(); $("#inprocessObligation").css('visibility', 'none'); }
                                        });
                                    }


                                }
                            }
                        }
                        else {
                            $("#loadingPage").fadeOut();
                            $("input:checkbox[name=chkRecurrenceCustom]").each(function () {
                                var Id = this.id;
                                $("#" + Id).css('outline', '1px solid #F00');
                            });

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


                    var oValidate = true;

                    if ($('#ddlObligationOccurencess').val() == "Weekly") {
                        var strrecuobli = "";
                        $("input:checkbox[name=chkRecurrenceCustom]:checked").each(function () {
                            strrecuobli += (this.value) + ",";
                        });
                        if (strrecuobli == "") {
                            oValidate = false;
                        }

                    }

                    if (oValidate) {

                        if ($('#ddlObligationOccurencess').val() != "None") {
                            if ($('input[name=SelectOccurenceEndDate]:checked').val() == 'Custom') {
                                if (parseInt($("#txtOccurrenceCount").val()) > 54) {
                                    $("#lblerrorreclimitObligation").css('display', '');
                                    oValidate = false;

                                }
                            }

                        }
                    }
                    else {
                        $("input:checkbox[name=chkRecurrenceCustom]").each(function () {
                            var Id = this.id;
                            $("#" + Id).css('outline', '1px solid #F00');
                        });
                    }

                    //if ($('#dvObliOccurrenceDates').is(':hidden')) {
                    //    //do something
                    //    $('#dvObliOccurrenceDates').slideToggle();
                    //    $('#imgObliga').attr("title", "Collapse");
                    //    $('#imgObliga').attr("src", "../Content/Images/e-close.png");


                    //}
                    $("#loadingPage").fadeOut();
                    $('.ui-button-green-text').parent().removeAttr('disabled');

                }

            }
            else {


                if (requiredValidator('dvObliOccurrenceDates')) { }
                //else
                //{
                //    if ($('#dvObliOccurrenceDates').is(':hidden')) {
                //        //do something
                //        $('#dvObliOccurrenceDates').slideToggle();
                //        $('#imgObliga').attr("title", "Collapse");
                //        $('#imgObliga').attr("src", "../Content/Images/e-close.png");


                //    }
                //}

                var oValidate = true;

                if ($('#ddlObligationOccurencess').val() == "Weekly") {
                    var strrecuobli = "";
                    $("input:checkbox[name=chkRecurrenceCustom]:checked").each(function () {
                        strrecuobli += (this.value) + ",";
                    });
                    if (strrecuobli == "") {
                        oValidate = false;
                    }

                }

                if (oValidate) {

                    if ($('#ddlObligationOccurencess').val() != "None") {
                        if ($('input[name=SelectOccurenceEndDate]:checked').val() == 'Custom') {
                            if (parseInt($("#txtOccurrenceCount").val()) > 54) {
                                $("#lblerrorreclimitObligation").css('display', '');
                                oValidate = false;

                            }
                        }

                    }
                }
                else {
                    $("input:checkbox[name=chkRecurrenceCustom]").each(function () {
                        var Id = this.id;
                        $("#" + Id).css('outline', '1px solid #F00');
                    });
                }

                $("#loadingPage").fadeOut();
                $('.ui-button-green-text').parent().removeAttr('disabled');

            }

        }
        else {
            if (requiredValidator('obligationreqvalidator2')) { }
            if (requiredValidator('dvObliOccurrenceDates')) { }
            //else
            //{
            //    if ($('#dvObliOccurrenceDates').is(':hidden')) {
            //        //do something
            //        $('#dvObliOccurrenceDates').slideToggle();
            //        $('#imgObliga').attr("title", "Collapse");
            //        $('#imgObliga').attr("src", "../Content/Images/e-close.png");


            //    }
            //}

            var oValidate = true;

            if ($('#ddlObligationOccurencess').val() == "Weekly") {
                var strrecuobli = "";
                $("input:checkbox[name=chkRecurrenceCustom]:checked").each(function () {
                    strrecuobli += (this.value) + ",";
                });
                if (strrecuobli == "") {
                    oValidate = false;
                }

            }

            if (oValidate) {

                if ($('#ddlObligationOccurencess').val() != "None") {
                    if ($('input[name=SelectOccurenceEndDate]:checked').val() == 'Custom') {
                        if (parseInt($("#txtOccurrenceCount").val()) > 54) {
                            $("#lblerrorreclimitObligation").css('display', '');
                            oValidate = false;

                        }
                    }

                }
            }
            else {
                $("input:checkbox[name=chkRecurrenceCustom]").each(function () {
                    var Id = this.id;
                    $("#" + Id).css('outline', '1px solid #F00');
                });
            }
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

        if (requiredValidator('obligationreqvalidator1')) {

            if (requiredValidator('obligationreqvalidator2')) {
                if (requiredValidator('dvObliOccurrenceDates')) {
                    if (comparedatestatus($.datepicker.formatDate('mm/dd/yy', $("#dtObligationNewDueDate").datepicker('getDate')), $("#ddlObligationStatus").val())) {
                        var oValidate = true;

                        if ($('#ddlObligationOccurencess').val() == "Weekly") {
                            var strrecuobli = "";
                            $("input:checkbox[name=chkRecurrenceCustom]:checked").each(function () {
                                strrecuobli += (this.value) + ",";
                            });

                            if (strrecuobli == "") {
                                oValidate = false;
                            }

                        }
                        if (oValidate) {
                            if (ObligationID != "") {
                                if (listAllObligations != "") {
                                    if ($('#ddlObligationOccurencess').val() == "None") {
                                        $(listAllObligations).each(function (i, item) {
                                            if (ObligationID != item.RowKey) {
                                                if ($("#txtObligationNewTitle").val() == item.ObligationTitle) {
                                                    if (!comparedatesequal(moment(new Date(item.DueDate)).utc().format('MM/DD/YYYY'), $.datepicker.formatDate('mm/dd/yy', $("#dtObligationNewDueDate").datepicker('getDate')))) {
                                                        if (oValidate) {
                                                            swal("", "Obligation title for the particular date already exist.");
                                                        }
                                                        oValidate = false;
                                                    }
                                                }
                                            }

                                        });
                                    }
                                    else {
                                        if (listObligationNewData != "") {
                                            $(listAllObligations).each(function (i, item) {
                                                if (ObligationID != item.RowKey) {
                                                    if ($("#txtObligationNewTitle").val() == item.ObligationTitle) {
                                                        if (!comparedatesequalrecurrence(item.DueDate, listObligationNewData)) {
                                                            if (oValidate) {
                                                                swal("", "Obligation title for one of the date in recurrence already exist.");
                                                            }
                                                            oValidate = false;
                                                        }
                                                    }
                                                }
                                            });
                                        }
                                    }
                                }
                            }
                            else {
                                if (listAllObligations != "") {
                                    if ($('#ddlObligationOccurencess').val() == "None") {
                                        $(listAllObligations).each(function (i, item) {
                                            if ($("#txtObligationNewTitle").val() == item.ObligationTitle) {
                                                if (!comparedatesequal(moment(new Date(item.DueDate)).utc().format('MM/DD/YYYY'), $.datepicker.formatDate('mm/dd/yy', $("#dtObligationNewDueDate").datepicker('getDate')))) {
                                                    if (oValidate) {
                                                        swal("", "Obligation title for the particular date already exist.");
                                                    }
                                                    oValidate = false;
                                                }
                                            }
                                        });
                                    }
                                    else {
                                        if (listObligationNewData != "") {
                                            $(listAllObligations).each(function (i, item) {
                                                if ($("#txtObligationNewTitle").val() == item.ObligationTitle) {
                                                    if (!comparedatesequalrecurrence(item.DueDate, listObligationNewData)) {
                                                        if (oValidate) {
                                                            swal("", "Obligation title for one of the date in recurrence already exist.");
                                                        }
                                                        oValidate = false;
                                                    }
                                                }
                                            });
                                        }
                                    }
                                }
                            }

                        }
                        if (oValidate) {
                            if ($('#ddlObligationOccurencess').val() != "None") {
                                if ($('input[name=SelectOccurenceEndDate]:checked').val() == 'Custom') {
                                    if (parseInt($("#txtOccurrenceCount").val()) > 54) {
                                        $("#lblerrorreclimitObligation").css('display', '');
                                        oValidate = false;

                                    }
                                }

                            }
                            if (oValidate) {
                                $("#loadingPage").fadeIn();
                                if (ObligationID != "") {

                                    if (vObligationEditStatus != "") {
                                        if (vObligationEditStatus == "CHANGERECURRENCE") {

                                            if ($('#ddlObligationOccurencess').val() != "None") {
                                                if (listObligationNewData != "") {
                                                    vObligationTextEditRecurrence = $("#txtObligationNewText").val();
                                                    $.ajax({
                                                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations?obligationid=' + ObligationID,
                                                        type: 'DELETE',
                                                        dataType: 'json',
                                                        headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                                                        "Content-Type": "application/json",
                                                        cache: false,
                                                        success: function (data) {
                                                            $("#txtObligationNewID").val("");
                                                            modalOnOpenObligationNew();
                                                        }
                                                    });
                                                }
                                                else {
                                                    $("#loadingPage").fadeOut();
                                                    swal("", "Please modify the occurence to update obligation.");
                                                }
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
                                                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew?obligationid=' + ObligationID,
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
                                                        ModifiedBy: localStorage.UserName,
                                                        ObligationMetBy: obligationmetby,
                                                        CompanyProfile: $("#lblCompanyProfile").text(),
                                                        Counterparty: $("#lblCounterparty").text(),
                                                        ContractEndDate: contractItem.EndDate,
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
                                                        GetObligationCatalogs();
                                                    },
                                                    complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                                                });
                                            }




                                        }
                                        else if (vObligationEditStatus == "EDITRECURRENCE") {
                                            if (listObligationNewData != "") {

                                                vObligationTextEditRecurrence = $("#txtObligationNewText").val();

                                                $.ajax({
                                                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/deleteobligations?strObligationText=' + $("#txtObligationNewText").val(),
                                                    type: 'DELETE',
                                                    dataType: 'json',
                                                    headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                                                    "Content-Type": "application/json",
                                                    cache: false,
                                                    success: function (data) {
                                                        $("#txtObligationNewID").val("");
                                                        modalOnOpenObligationNew();
                                                    }
                                                });
                                            }
                                            else {
                                                if ($('#ddlObligationOccurencess').val() == "None") {

                                                    vObligationTextEditRecurrence = $("#txtObligationNewText").val();

                                                    $.ajax({
                                                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew/deleteobligations?strObligationText=' + $("#txtObligationNewText").val(),
                                                        type: 'DELETE',
                                                        dataType: 'json',
                                                        headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                                                        "Content-Type": "application/json",
                                                        cache: false,
                                                        success: function (data) {
                                                            $("#txtObligationNewID").val("");
                                                            modalOnOpenObligationNew();
                                                        }
                                                    });
                                                }
                                                else {
                                                    if (listObligationNewData != "") {
                                                        $("#loadingPage").fadeOut();
                                                        $("#obligationcatalogsRecurrenceEditPopup").dialog("option", "title", "Edit Repeat Obligation");
                                                        $("#obligationcatalogsRecurrenceEditPopup").dialog("open");
                                                    }
                                                    else {
                                                        $("#loadingPage").fadeOut();
                                                        swal("", "Please modify the occurence to update obligation.");
                                                    }

                                                }


                                            }
                                        }
                                        else {
                                            if ($('#ddlObligationOccurencess').val() == "None") {
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
                                                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew?obligationid=' + ObligationID,
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
                                                        ModifiedBy: localStorage.UserName,
                                                        ObligationMetBy: obligationmetby,
                                                        CompanyProfile: $("#lblCompanyProfile").text(),
                                                        Counterparty: $("#lblCounterparty").text(),
                                                        ContractEndDate: contractItem.EndDate,
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
                                                        GetObligationCatalogs();
                                                    },
                                                    complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                                                });

                                            }
                                            else {
                                                //if (listObligationNewData != "") {
                                                $("#loadingPage").fadeOut();
                                                $("#obligationcatalogsRecurrenceEditPopup").dialog("option", "title", "Edit Repeat Obligation");
                                                $("#obligationcatalogsRecurrenceEditPopup").dialog("open");
                                                //}
                                                //else {
                                                //    $("#loadingPage").fadeOut();
                                                //    swal("", "Please modify the occurence to update obligation.");
                                                //}
                                                //$("#loadingPage").fadeOut();
                                                //$("#obligationcatalogsRecurrenceEditPopup").dialog("option", "title", "Edit Repeat Obligation");
                                                //$("#obligationcatalogsRecurrenceEditPopup").dialog("open");
                                            }
                                        }

                                    }
                                    else {
                                        if ($('#ddlObligationOccurencess').val() == "None") {
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
                                                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew?obligationid=' + ObligationID,
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
                                                    ModifiedBy: localStorage.UserName,
                                                    ObligationMetBy: obligationmetby,
                                                    CompanyProfile: $("#lblCompanyProfile").text(),
                                                    Counterparty: $("#lblCounterparty").text(),
                                                    ContractEndDate: contractItem.EndDate,
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
                                                    GetObligationCatalogs();

                                                },
                                                complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                                            });


                                        }
                                        else {
                                            //if (listObligationNewData != "") {
                                            $("#loadingPage").fadeOut();
                                            $("#obligationcatalogsRecurrenceEditPopup").dialog("option", "title", "Edit Repeat Obligation");
                                            $("#obligationcatalogsRecurrenceEditPopup").dialog("open");
                                            //}
                                            //else {
                                            //    $("#loadingPage").fadeOut();
                                            //    swal("", "Please modify the occurence to update obligation.");
                                            //}
                                            //$("#loadingPage").fadeOut();
                                            //$("#obligationcatalogsRecurrenceEditPopup").dialog("option", "title", "Edit Repeat Obligation");
                                            //$("#obligationcatalogsRecurrenceEditPopup").dialog("open");
                                        }
                                    }
                                }
                                else {
                                    $("#inprocessObligation").css('visibility', 'visible');


                                    if ($('#ddlObligationOccurencess').val() != "None") {

                                        if ($('#ddlObligationOccurencess').val() == "Weekly") {

                                            var validobli = false;

                                            var strrecuobli = "";
                                            $("input:checkbox[name=chkRecurrenceCustom]:checked").each(function () {
                                                strrecuobli += (this.value) + ",";
                                            });

                                            if (strrecuobli != "") {
                                                validobli = true;
                                            }

                                            if (validobli) {
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
                                                var contractForm = "ContractID=" + getParameterByName('ContractID');
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
                                                contractForm += "&CustomString=" + encodeURIComponent(strrecuobli);
                                                contractForm += "&ObligationEndTerm=" + encodeURIComponent($("input:radio[name=SelectOccurenceEndDate]:checked").val());
                                                contractForm += "&ObligationMet=" + encodeURIComponent(obligationmet);
                                                contractForm += "&ObligationMetBy=" + encodeURIComponent(obligationmetby);

                                                contractForm += "&CompanyProfile=" + encodeURIComponent($("#lblCompanyProfile").text());
                                                contractForm += "&Counterparty=" + encodeURIComponent($("#lblCounterparty").text());
                                                var contEndDate = (contractItem.EndDate != null ? moment(contractItem.EndDate).format('MM/DD/YYYY') : contractItem.EndDate);
                                                contractForm += "&ContractEndDate=" + encodeURIComponent(contEndDate);
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
                                                if (typeof Values != "undefined" && Values != null) {
                                                    for (var j = 0; j < Values.length; j++) {
                                                        strvalues += Values[j] + ",";
                                                    }
                                                    strvalues = removeLastChar(strvalues, ',');
                                                }
                                                occurrenceForm += "&Values=" + strvalues;

                                                formData.append("objoccurrence", occurrenceForm);
                                                $.ajax({
                                                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew',
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
                                                                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationfinancials/updateobligationtext?obligationtext=' + person,
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
                                                        GetObligationCatalogs();

                                                    },
                                                    error: function (data) {
                                                        $("#loadingPage").fadeOut();
                                                    },
                                                    complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                                                });

                                            }
                                            else {
                                                $("#loadingPage").fadeOut();
                                            }
                                        }
                                        else {
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
                                            var contractForm = "ContractID=" + getParameterByName('ContractID');
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
                                            var contEndDate = (contractItem.EndDate != null ? moment(contractItem.EndDate).format('MM/DD/YYYY') : contractItem.EndDate);
                                            contractForm += "&ContractEndDate=" + encodeURIComponent(contEndDate);
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
                                            if (typeof Values != "undefined" && Values != null) {
                                                for (var j = 0; j < Values.length; j++) {
                                                    strvalues += Values[j] + ",";
                                                }
                                                strvalues = removeLastChar(strvalues, ',');
                                            }

                                            strvalues = removeLastChar(strvalues, ',');
                                            occurrenceForm += "&Values=" + strvalues;

                                            formData.append("objoccurrence", occurrenceForm);
                                            $.ajax({
                                                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew',
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
                                                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationfinancials/updateobligationtext?obligationtext=' + person,
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
                                                    GetObligationCatalogs();
                                                },
                                                error: function (data) {
                                                    $("#loadingPage").fadeOut();
                                                },
                                                complete: function () { $("#inprocessObligation").css('visibility', 'none'); }
                                            });
                                        }



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
                                        var contractForm = "ContractID=" + getParameterByName('ContractID');
                                        contractForm += "&ContractTitle=" + encodeURIComponent($("#lblCTitleObligationNew").text());
                                        contractForm += "&ObligationTitle=" + encodeURIComponent($("#txtObligationNewTitle").val());

                                        contractForm += "&ObligationType=" + encodeURIComponent($("#ddlObligationTypeNew").find('option:selected').text());
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
                                        var contEndDate = (contractItem.EndDate != null ? moment(contractItem.EndDate).format('MM/DD/YYYY') : contractItem.EndDate);
                                        contractForm += "&ContractEndDate=" + encodeURIComponent(contEndDate);
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
                                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnew',
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
                                                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationfinancials/updateobligationtext?obligationtext=' + person,
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
                                                GetObligationCatalogs();
                                            },
                                            error: function (data) {
                                                $("#loadingPage").fadeOut();
                                            },
                                            complete: function () { clearObligationFormDataNew(); $("#loadingPage").fadeOut(); $("#inprocessObligation").css('visibility', 'none'); }
                                        });
                                    }


                                }
                            }




                        }
                        else {

                            $("#loadingPage").fadeOut();
                            $("input:checkbox[name=chkRecurrenceCustom]").each(function () {
                                var Id = this.id;
                                $("#" + Id).css('outline', '1px solid #F00');
                            });


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

                    //if ($('#dvObliOccurrenceDates').is(':hidden')) {
                    //    //do something
                    //    $('#dvObliOccurrenceDates').slideToggle();
                    //    $('#imgObliga').attr("title", "Collapse");
                    //    $('#imgObliga').attr("src", "../Content/Images/e-close.png");


                    //}
                    var oValidate = true;

                    if ($('#ddlObligationOccurencess').val() == "Weekly") {
                        var strrecuobli = "";
                        $("input:checkbox[name=chkRecurrenceCustom]:checked").each(function () {
                            strrecuobli += (this.value) + ",";
                        });
                        if (strrecuobli == "") {
                            oValidate = false;
                        }

                    }

                    if (oValidate) {

                        if ($('#ddlObligationOccurencess').val() != "None") {
                            if ($('input[name=SelectOccurenceEndDate]:checked').val() == 'Custom') {
                                if (parseInt($("#txtOccurrenceCount").val()) > 54) {
                                    $("#lblerrorreclimitObligation").css('display', '');
                                    oValidate = false;

                                }
                            }

                        }
                    }
                    else {
                        $("input:checkbox[name=chkRecurrenceCustom]").each(function () {
                            var Id = this.id;
                            $("#" + Id).css('outline', '1px solid #F00');
                        });
                    }
                    $("#loadingPage").fadeOut();
                    $('.ui-button-green-text').parent().removeAttr('disabled');

                }

            }
            else {
                if (requiredValidator('dvObliOccurrenceDates')) { }
                //else
                //{
                //    if ($('#dvObliOccurrenceDates').is(':hidden')) {
                //        //do something
                //        $('#dvObliOccurrenceDates').slideToggle();
                //        $('#imgObliga').attr("title", "Collapse");
                //        $('#imgObliga').attr("src", "../Content/Images/e-close.png");


                //    }
                //}

                var oValidate = true;

                if ($('#ddlObligationOccurencess').val() == "Weekly") {
                    var strrecuobli = "";
                    $("input:checkbox[name=chkRecurrenceCustom]:checked").each(function () {
                        strrecuobli += (this.value) + ",";
                    });
                    if (strrecuobli == "") {
                        oValidate = false;
                    }

                }

                if (oValidate) {

                    if ($('#ddlObligationOccurencess').val() != "None") {
                        if ($('input[name=SelectOccurenceEndDate]:checked').val() == 'Custom') {
                            if (parseInt($("#txtOccurrenceCount").val()) > 54) {
                                $("#lblerrorreclimitObligation").css('display', '');
                                oValidate = false;

                            }
                        }

                    }
                }
                else {
                    $("input:checkbox[name=chkRecurrenceCustom]").each(function () {
                        var Id = this.id;
                        $("#" + Id).css('outline', '1px solid #F00');
                    });
                }
                $("#loadingPage").fadeOut();
                $('.ui-button-green-text').parent().removeAttr('disabled');

            }

        }
        else {
            if (requiredValidator('obligationreqvalidator2')) { }
            if (requiredValidator('dvObliOccurrenceDates')) { }
            //else
            //{
            //    if ($('#dvObliOccurrenceDates').is(':hidden')) {
            //        //do something
            //        $('#dvObliOccurrenceDates').slideToggle();
            //        $('#imgObliga').attr("title", "Collapse");
            //        $('#imgObliga').attr("src", "../Content/Images/e-close.png");


            //    }
            //}

            var oValidate = true;

            if ($('#ddlObligationOccurencess').val() == "Weekly") {
                var strrecuobli = "";
                $("input:checkbox[name=chkRecurrenceCustom]:checked").each(function () {
                    strrecuobli += (this.value) + ",";
                });
                if (strrecuobli == "") {
                    oValidate = false;
                }

            }

            if (oValidate) {

                if ($('#ddlObligationOccurencess').val() != "None") {
                    if ($('input[name=SelectOccurenceEndDate]:checked').val() == 'Custom') {
                        if (parseInt($("#txtOccurrenceCount").val()) > 54) {
                            $("#lblerrorreclimitObligation").css('display', '');
                            oValidate = false;

                        }
                    }

                }
            }
            else {
                $("input:checkbox[name=chkRecurrenceCustom]").each(function () {
                    var Id = this.id;
                    $("#" + Id).css('outline', '1px solid #F00');
                });
            }
            $("#loadingPage").fadeOut();
            $('.ui-button-green-text').parent().removeAttr('disabled');

        }
        $('.ui-button-green-text').parent().removeAttr('disabled');

        return isformvalid;
    }






}



function GetObligationCatalogs() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationcatalogs',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
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
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/obligationsnewgroup',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'BusinessAreaLocation': localStorage.GlobalBusinessAreaLocation },
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

                var url = '<a  href="javascript:void(0)" onclick="ViewObligationDetail(\'' + item.RowKey + '\')" class="linkText">' + item.ObligationTitle + '</a>';

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


            $(".openmenuObligationNewGroup").contextMenu({ menu: 'dropdownMenuobligation', leftButton: true }, function (action, el, pos) {
                contextMenuObligationNew(action, el.parent("i").parent("td").parent("tr"), pos);
            });

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

function comparedatesmile(firstDate, secondDate) {

    var isvalid = true;
    if (firstDate != null && firstDate != '' &&
        secondDate != null && secondDate != '') {

        var dt1 = new Date(firstDate);
        var dt2 = new Date(secondDate);

        var dateOne = new Date(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()); //Year, Month, Date
        var dateTwo = new Date(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()); //Year, Month, Date

        if (dateOne > dateTwo) {
            isvalid = false;
        } else {
            isvalid = true;
        }
    }
    return isvalid;
}

function comparedatesequal(firstDate, secondDate) {
    var isvalid = true;
    if (firstDate != null && firstDate != '' &&
        secondDate != null && secondDate != '') {

        var dt1 = new Date(firstDate);
        var dt2 = new Date(secondDate);

        var dateOne = new Date(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()); //Year, Month, Date
        var dateTwo = new Date(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()); //Year, Month, Date

        if (dateOne.getTime() == dateTwo.getTime()) {
            isvalid = false;
        } else {
            isvalid = true;
        }
    }
    return isvalid;
}

function comparedatesequalrecurrence(firstDate, secondDate) {
    var isvalid = true;
    if (firstDate != null && firstDate != '' &&
        secondDate != null && secondDate != '') {
        var secondDates = secondDate.Values;
        var dt1 = new Date(firstDate);
        //Vinod
        var dateOne = new Date(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()); //Year, Month, Date
        $(secondDates).each(function (i, item) {
            var dt2 = new Date(item);
            //Vinod
            var dateTwo = new Date(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()); //Year, Month, Date
            if (dateOne.getTime() == dateTwo.getTime()) {
                isvalid = false;
            }
        });
    }
    return isvalid;
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


function showObligationStatusMultiple() {
    $('#addEditStatusMultiple').dialog('open');
}


function changestatusmultiple() {
    var selectedValue = decodeURI($("input:radio[name=rdobligationstatus]:checked").val());
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
    var stat = decodeURI($("input:radio[name=rdobligationstatus]:checked").val());
    var formDataStatus = new FormData();
    formDataStatus.append("ObligationIDs", multipleObligationNewChecks);
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations/changestatus?status=' + stat,
        type: 'PUT',
        data: formDataStatus,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            $("#loadingPage").fadeOut();
            multipleObligationNewChecks = "";

            GetObligationCatalogs();
            $("#obligationNewActions").css('display', 'none');
            $('#addEditStatusMultiple').dialog('close');

        },
        error: function (result) {
            $("#loadingPage").fadeOut();
        }
    });
}

function showMilestoneStatusMultiple() {
    $('#addEditMilestoneStatusMultiple').dialog('open');
}

function changemilestonestatusmultiple() {
    var selectedValue = decodeURI($("input:radio[name=rdmilestonestatus]:checked").val());
    if (selectedValue == "undefined" || selectedValue == "0" || selectedValue == "") {
        swal("", "Select Status");
        return false;
    } else {
        changemilestonestatusM();
        return true;
    }
}





function changemilestonestatusM() {
    $("#loadingPage").fadeIn();
    var selectedmilestoneid = Getvaluebynameattr('chkmilestone');
    var formDataStatusMile = new FormData();
    formDataStatusMile.append("MilestoneIDs", selectedmilestoneid);
    var stat = decodeURI($("input:radio[name=rdmilestonestatus]:checked").val());
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones/changestatus?status=' + stat,
        type: 'PUT',
        dataType: 'json',
        data: formDataStatusMile,
        contentType: false,
        processData: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
        cache: false,
        success: function (result) {
            $("#loadingPage").fadeOut();
            selectedmilestoneid = "";
            BindMilestone(vContractID);

            $("#milestonesNewActions").css('display', 'none');
            $('#addEditMilestoneStatusMultiple').dialog('close');

        },
        error: function (result) {
            $("#loadingPage").fadeOut();
        }
    });
}

var removeLastChar = function (value, char) {
    var lastChar = value.slice(-1);
    if (lastChar == char) {
        value = value.slice(0, -1);
    }
    return value;
}

//suren
function milestoneEditBackupData() {
    var fMilestoneDateNew = '';
    if ($("#dtMilestoneDateNew").val() != "" && $("#dtMilestoneDateNew").val() != null) {
        fMilestoneDateNew = $.datepicker.formatDate('mm/dd/yy', $("#dtMilestoneDateNew").datepicker('getDate'))

    }
    if ($("#txtMilestoneOccurrenceCount").val() != "" && $('input[name=SelectMilestoneOccurenceEndDate]:checked').val() == 'Custom') {

        if (parseInt($("#txtMilestoneOccurrenceCount").val()) == 0) {
            $('#lblerrorreclimitMilestoneNotZero').css('display', '');
            $('#lblerrorreclimitMilestone').css('display', 'none');
        }
        else {
            $('#lblerrorreclimitMilestoneNotZero').css('display', 'none');
            if (parseInt($("#txtMilestoneOccurrenceCount").val()) > 54) {
                $('#lblerrorreclimitMilestone').css('display', '');
            }
            else {
                //$('#lblerrorreclimitMilestone').css('display', 'none');
                var date = new Date(fMilestoneDateNew);

                var recurenceCustomString = "";
                var Cus = "";
                var cusRecMon = "";
                var ocurrTxtnew = $("#ddlMilestoneOccurencess").val();
                if (ocurrTxtnew == "Monthly") {
                    Cus = date.getDay();
                    cusRecMon = $("#ddlMilestoneRepeatMonthly option:selected").val();
                }
                else if (ocurrTxtnew == "Yearly") {
                    Cus = date.getFullYear();

                }
                else {
                    $("input:checkbox[name=chkMilestoneRecurWeekly]:checked").each(function () {
                        Cus += (this.value) + ",";
                    });
                    Cus = removeLastChar(Cus, ',');
                }
                milestoneoccur = $("#txtMilestoneOccurrenceCount").val();
                milestoneRecur = $("#ddlMilestoneOccurencess").val();
                milestoneRecurCusString = "";

                if (Cus != "") {
                    milestoneRecurCusString = Cus;
                }
                else {
                    $("input:checkbox[name=chkMilestoneRecurWeekly]:checked").each(function () {
                        milestoneRecurCusString += (this.value) + ",";
                    });
                    milestoneRecurCusString = removeLastChar(milestoneRecurCusString, ',');
                }
                getOcurrenceValuesForMilestone(milestoneRecur, milestoneoccur, listMilestoneNewStartDate, milestoneRecurCusString, cusRecMon);


            }

        }
    }
}
function ObligationEditBackupData() {
    var fObligationNewDueDate = '';
    if ($("#dtObligationNewDueDate").val() != "" && $("#dtObligationNewDueDate").val() != null) {
        fObligationNewDueDate = $.datepicker.formatDate('mm/dd/yy', $("#dtObligationNewDueDate").datepicker('getDate'));
    }
    if ($("#txtOccurrenceCount").val() != "" && $('input[name=SelectOccurenceEndDate]:checked').val() == 'Custom') {


        if (parseInt($("#txtOccurrenceCount").val()) == 0) {
            $('#lblerrorreclimitObligationNotZero').css('display', '');
            $('#lblerrorreclimitObligation').css('display', 'none');
        }
        else {
            $('#lblerrorreclimitObligationNotZero').css('display', 'none');
            if (parseInt($("#txtOccurrenceCount").val()) > 54) {
                $('#lblerrorreclimitObligation').css('display', '');
            }
            else {
                //$('#lblerrorreclimitObligation').css('display', 'none');

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
                    Cus = removeLastChar(Cus, ',');
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
        }

    }
}