var contrcatItem;
var vCurrencyDisplayStyle = "";

var QuickAction = false;
var UpForRenewal = false;
var AbouttoExpire = false;
var veContractFeatures = "";
var newContractItem = "";
//Added from 2.4final to 2.4
var renewalItem = [];
var vTermName = "";
var vContractID = "";
var vRenewaHistoryData = [];
var vRenewalConfirmParticipantsXML = "";
var contractItem = "";
var ConfirmParticipationCollection = [];
//
$(document).ready(function () {
    $('#dialogSummary').dialog({
        autoOpen: false,
        closeText: "",
        width: "70%",
        title: 'Metadata',
        modal: true,
        dialogClass: "popup_width100",
        buttons: [{
            text: "View Contract Record",

            click: function () {
                $("#tblSummaryMetadata tr#contractID td")[1].textContent

                var contractID = ($("#tblSummaryMetadata tr#contractID td")[1].textContent != "" ? $("#tblSummaryMetadata tr#contractID td")[1].textContent.trim() : "");
                location = "/Contracts/ContractDetails?ContractID=" + contractID + "";
                $(this).dialog("close");
            }
        },
            {
                text: "Close",

                click: function () {
                    $(this).dialog("close");
                }
            }]
    });
});
$(function () {
    GetContractValueSetting();
    veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));

    var vAccFeat = [];
    if (veContractFeatures != null) {
        vAccFeat = $.grep(veContractFeatures, function (n, i) {
            return (n.RowKey == "16" && n.Status == "ON");
        });
    }
    if (typeof localStorage.GlobalBusinessAreaLocation != 'undefined') {
        if (localStorage.GlobalBusinessAreaLocation == "All") {
            $("#heading_dashboard").text("My Dashboard");

            if (localStorage.GlobalBusinessAreaLocation == "All" || (typeof (localStorage.BusinessAreaAccess) != "undefined" ? localStorage.BusinessAreaAccess.indexOf(localStorage.GlobalBusinessAreaLocation) >= 0 : false) || (typeof (localStorage.UserType) != "undefined" ? localStorage.UserType.indexOf("Global Contract Owner") >= 0 : false) || localStorage.IsGeneralBusinessArea == "Yes") {
                $(".UserPermisionCon").css('display', '');


                if (vAccFeat != null && vAccFeat.length > 0) {
                    $(".UserPermisionPL").css('display', '');
                }
                else {
                    $(".UserPermisionPL").css('display', 'none');
                }
                QuickAction = true;
            }
        } else {
            $("#dashmain").attr("src", "/Content/images/icon/gen.png");
            $("#heading_dashboard").text(localStorage.GlobalBusinessAreaLocation);
            $("#dvBASpecific1").css('display', '');
            $("#dvBASpecific2").css('display', '');
            if (localStorage.BusinessAreaAccess.indexOf(localStorage.GlobalBusinessAreaLocation) >= 0 || localStorage.UserType.indexOf("Global Contract Owner") >= 0 || localStorage.IsGeneralBusinessArea == "Yes") {
                $(".UserPermisionCon").css('display', '');

                if (vAccFeat != null && vAccFeat.length > 0) {
                    $(".UserPermisionPL").css('display', '');
                }
                else {
                    $(".UserPermisionPL").css('display', 'none');
                }
                QuickAction = true;

            } else {
                $(".UserPermisionCon").css('display', 'none');
                $(".UserPermisionPL").css('display', 'none');


                var vAccFeat = [];
                if (veContractFeatures != null) {
                    vAccFeat = $.grep(veContractFeatures, function (n, i) {
                        return (n.RowKey == "12" && n.Status == "ON");
                    });
                }
                if (vAccFeat != null && vAccFeat.length > 0) {
                    QuickAction = true;
                }
            }
            CreateCounterpartyList();
        }

    }


    else {
        QuickAction = true;

        $(".UserPermisionCon").css('display', '');

        if (vAccFeat != null && vAccFeat.length > 0) {
            $(".UserPermisionPL").css('display', '');
        }
        else {
            $(".UserPermisionPL").css('display', 'none');
        }

    }
    var chk = false;
    //CheckGlobalSettingsForNewCP();
    $("#dvAlertForward").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Forward Alert",
        dialogClass: "popup_width100",
        modal: true,
        buttons: [{
            text: "OK",

            click: function () {
                ForwardAlert();
            }
        }, {
            text: "Cancel",

            click: function () {
                $(this).dialog("close");
            }
        }]
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
        //    "class": "ViewContract ",
        //    click: function () {
        //        ViewContractDetails();
        //        $(this).dialog("close");
        //    }
        //},
        {
            text: "Mark As Completed",
            "id": "btnMarkComplete",
            "class": "button-not-close-Complete-css",
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

    $("#viewMetadataDetail").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Detail",
        modal: true,
        dialogClass: "popup_width100",
        buttons: [{
            //    text: "View Contract Record",

            //    click: function () {
            //        if ($("#tblMetadataDetail").find("ul").length > 0) {
            //            var contractID = ($("#tblMetadataDetail ul li#contractID").children()[1].textContent != "" ? $("#tblMetadataDetail ul li#contractID").children()[1].textContent.trim() : "");
            //            location = "/Contracts/ContractDetails?ContractID=" + contractID + "";
            //        }
            //        else {
            //            var contractID = ($("#tblMetadataDetail tr#contractID td")[1].textContent != "" ? $("#tblMetadataDetail tr#contractID td")[1].textContent.trim() : "");
            //            location = "/Contracts/ContractDetails?ContractID=" + contractID + "";
            //        }
            //        $(this).dialog("close");
            //    }
            //}, {
            text: "Close",

            click: function () {
                $(this).dialog("close");
            }
        }]
    });

    //Added 2.4final to 2.4
    $("#viewMetadataUpForRenewal").dialog({
        autoOpen: false,
        closeText: "",
        width: "70%",
        title: "Detail",
        modal: true,
        dialogClass: "popup_width100",
        close: function (event, ui) {
        },
        buttons: {
            "Close": function () {
                $(this).dialog("close");
                $('#dvAfterRenew').css("display", "none");
                $('#spanAfterRenew').css("display", "none");
            }
        }
    });
    //2.4
    $("#browseAwaitingAuthorisation").dialog({
        autoOpen: false,
        closeText: "",
        title: "",
        width: 'auto',
        height: 'auto',
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "Continue Renewal": function () {
                var s = continueRenewal();
                $(this).dialog("close");
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });


    $("#addEditInitialSetup").dialog({
        autoOpen: false,
        closeText: "",
        width: "80%",
        title: "Setup Wizard",
        dialogClass: "popup_width100",
        modal: true,
        close: function (event, ui) {
        }
    });

    $("#dialogAddField").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Field",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "Save": function () { modalOpenAddNewField(); getContractMetadata(); $(this).dialog("close"); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#AddEditContractTypes").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Contract Types",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "Save": function () { SaveContractTypes(); getContractTypes(); $(this).dialog("close"); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
    $("#dvContractsRecentListAll").dialog({
        autoOpen: false,
        closeText: "",
        width: "60%",
        title: "Recent Contracts",
        dialogClass: "popup_width100",
        modal: true,
        close: function (event, ui) {
            $(this).dialog("close");
        }
    });
    $("#dvContractsUpcomingRenewalsListAll").dialog({
        autoOpen: false,
        closeText: "",
        width: "60%",
        title: "Up for Renewal Contracts",
        modal: true,
        close: function (event, ui) {
            $(this).dialog("close");
        }
    });
    $("#dvContractsAboutToExpireListAll").dialog({
        autoOpen: false,
        closeText: "",
        width: "60%",
        title: "About to Expire Contracts",
        dialogClass: "popup_width100",
        modal: true,
        close: function (event, ui) {
            $(this).dialog("close");
        }
    });


    CreateTaskList();
    //CreateCalender();
    GetRenewalHistoryALL();
    CounterpartyFunc();//ENH 6 & 7 : Minor Enhancements Specs - 30 days Added from 2.4final to 2.4
    CreateDashboardContracts();
    CreateWorkflowList();

    $("#aTodos").addClass("act");
    $("#aContracts").addClass("act");
});

function GetContractValueSetting() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/settings',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            if (data.CurrencyDisplayStyle == "UK") {
                vCurrencyDisplayStyle = "UK";
            } else if (data.CurrencyDisplayStyle == "CAN") {
                vCurrencyDisplayStyle = "CAN";
            } else if (data.CurrencyDisplayStyle == "EU") {
                vCurrencyDisplayStyle = "EU";
            } else if (data.CurrencyDisplayStyle == "IND") {
                vCurrencyDisplayStyle = "IND";
            }
        },
        error: function (data) {
        }
    });
}

function CreateDashboardAndCharts() {

    var exec_start = moment(new Date());
    $("#ulDashboardPipeline").empty();
    $("#ulDashboardRecent").empty();
    $("#ulDashboardUpcoming").empty();
    $("#chartTypeValueErr").empty();
    $("#chartTypeValue").css('display', 'none');
    $("#chartContractValueErr").empty();

    $("#ulDashboardPipeline").append('<span class="lineheight20"><img src="../Content/Images/icon/loading.gif" style="height: 16px; width: 16px;"></span>');
    $("#ulDashboardRecent").append('<span class="lineheight20"><img src="../Content/Images/icon/loading.gif" style="height: 16px; width: 16px;"></span>');
    $("#ulDashboardUpcoming").append('<span class="lineheight20"><img src="../Content/Images/icon/loading.gif" style="height: 16px; width: 16px;"></span>');
    $("#chartTypeValueErr").append('<img src="../Content/Images/icon/loading.gif" style="height: 16px; width: 16px; padding:0px !important;">');
    $("#chartContractValueErr").append('<img src="../Content/Images/icon/loading.gif" style="height: 16px; width: 16px; padding:0px !important;">');
    $("#chartContractValue").css('display', 'none');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/reports/dashboard?userid=' + localStorage.UserID,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'UserID': localStorage.UserID, 'GlobalBusinessAreaLocation': localStorage.GlobalBusinessAreaLocation },
        success: function (result) {
            $("#PerformanceTracker").append("BusinessArea " + localStorage.GlobalBusinessAreaLocation + "Call to CreateDashboardAndCharts took " + moment(new Date()).diff(exec_start, "seconds") + " seconds.<br/>");
            $("#PerformanceTracker").append("BusinessArea " + localStorage.GlobalBusinessAreaLocation + "Call to CreateDashboardAndCharts took " + result.timetaken + " seconds.<br/>");
            var data = result.Dashboard;

            var Pipeline = data.Pipeline;
            var sNew = $(Pipeline).find('New').text();
            if (sNew == "") { sNew = "0"; }
            var sApprove = $(Pipeline).find('Approve').text();
            if (sApprove == "") { sApprove = "0"; }
            var sSignature = $(Pipeline).find('Signature').text();
            if (sSignature == "") { sSignature = "0"; }

            $("#ulDashboardPipeline").empty();
            $("#ulDashboardPipeline").append('<li onclick="NavigateToReport(\'Status=New;Drafting\')"><strong>' + sNew + '</strong><small>New</small></li>');
            $("#ulDashboardPipeline").append('<li onclick="NavigateToReport(\'Status=Awaiting Review;Awaiting Approval;In Negotiation\')"><strong>' + sApprove + '</strong><small>Awaiting Review / Approval</small></li>');
            $("#ulDashboardPipeline").append('<li onclick="NavigateToReport(\'Status=Awaiting Signatures\')"><strong>' + sSignature + '</strong><small>Signature</small></li>');

            var Active = data.Active;
            var sActive = $(Active).find('Active').text();
            if (sActive == "") { sActive = "0"; }
            var sRenewed = $(Active).find('Renewed').text();
            if (sRenewed == "") { sRenewed = "0"; }
            var sSigned = $(Active).find('Signed').text();
            if (sSigned == "") { sSigned = "0"; }

            $("#ulDashboardRecent").empty();
            $("#ulDashboardRecent").append('<li onclick="NavigateToReport(\'Status=Active\')"><strong>' + sActive + '</strong><small>Active</small></li>');
            $("#ulDashboardRecent").append('<li onclick="NavigateToReport(\'Status=Renewed\')"><strong>' + sRenewed + '</strong><small>Renewed</small></li>');
            $("#ulDashboardRecent").append('<li onclick="NavigateToReport(\'Status=Signed\')"><strong>' + sSigned + '</strong><small>Signed</small></li>');

            var Upcoming = data.Upcoming;
            var s30Days = $(Upcoming).find('ThirtyDays').text();
            if (s30Days == "") { s30Days = "0"; }
            var s60Days = $(Upcoming).find('SixtyDays').text();
            if (s60Days == "") { s60Days = "0"; }
            var s90Days = $(Upcoming).find('NintyDays').text();
            if (s90Days == "") { s90Days = "0"; }


            $("#ulDashboardUpcoming").empty();
            $("#ulDashboardUpcoming").append('<li onclick="NavigateToReport(\'RenewalDate=30\')"><strong>' + s30Days + '</strong><small>30 Days</small></li>');
            $("#ulDashboardUpcoming").append('<li onclick="NavigateToReport(\'RenewalDate=60\')"><strong>' + s60Days + '</strong><small>60 Days</small></li>');
            $("#ulDashboardUpcoming").append('<li onclick="NavigateToReport(\'RenewalDate=90\')"><strong>' + s90Days + '</strong><small>90 Days</small></li>');

            var vDefaultCurrency = '';
            var vStatus = [];
            $(data.ContractValue).find('Contract').each(function (i) {
                var sType = $(this).find('Type').text();
                var sCount = $(this).find('Count').text();
                vDefaultCurrency = $(this).find('Currency').text();
                var sColor = "#f0ad4e";
                if (i == 0) {
                    sColor = "#7ea568";
                }

                if (sCount != 0) {
                    vStatus.push({
                        category: sType,
                        value: sCount,
                        color: sColor
                    });
                }
            });
            if (vStatus.length > 0) {
                $("#chartContractValue").kendoChart({
                    title: {
                        visible: false
                    },
                    theme: "flat",
                    legend: {
                        visible: false
                    },
                    chartArea: {
                        background: ""
                    },
                    seriesDefaults: {
                        labels: {
                            visible: true,
                            background: "transparent",
                            position: "insideEnd",
                            align: "inside",
                            template: "#= category #: \n #= value# " + vDefaultCurrency
                        }
                    },
                    series: [{
                        type: "pie",
                        startAngle: 150,
                        data: vStatus
                    }],
                    tooltip: {
                        visible: true,
                        template: "#= category #: \n #= value# " + vDefaultCurrency
                    }
                });
                $("#chartContractValueErr").empty();
                $("#chartContractValue").css('display', '');
            }
            else {
                $("#chartContractValueErr").html('No items found.');
                $("#chartContractValue").css('display', 'none');
            }

            var vStatus = [];
            var vStatus2 = [];
            $(data.ContractTypeByStatus).find('Contract').each(function (i) {
                if (i <= 4) {
                    var sType = $(this).find('Type').text();
                    var sData = $(this).find('Count').text();
                    var sColor = $(this).find('Color').text();
                    var vData = [];
                    var res = sData.split(",");

                    if (sData != "") {
                        if (sData != "0, 0, 0, 0") {
                            vStatus.push({
                                "year": sType,
                                "Active": parseInt(res[0].trim()),
                                "Extended": parseInt(res[1].trim()),
                                "Renewed": parseInt(res[2].trim()),
                                "UpforRenewal": parseInt(res[3].trim())
                            });
                        }
                    }
                }
            });

            vStatus2.push({
                field: "Active",
                name: "Active",
                color: "#7ea568"
            });
            vStatus2.push({
                field: "Extended",
                name: "Extended",
                color: "#f0ad4e"
            });
            vStatus2.push({
                field: "Renewed",
                name: "Renewed",
                color: "#61a9dc"
            });
            vStatus2.push({
                field: "UpforRenewal",
                name: "Up for Renewal",
                color: "#cc6766"
            });

            if (vStatus.length > 0) {
                $("#chartTypeValue").kendoChart({
                    dataSource: vStatus,
                    title: {
                        text: ""
                    },
                    theme: "flat",
                    legend: {
                        visible: true,
                        position: "bottom"
                    },
                    seriesDefaults: {
                        labels: {
                            template: "#= value #",
                            visible: false,
                            background: "transparent",
                            position: "insideEnd",
                            align: "inside"
                        },
                        type: "bar",
                        stack: true
                    },
                    series: vStatus2,
                    valueAxis: {
                        line: {
                            visible: true
                        },
                        minorGridLines: {
                            visible: false
                        }
                    },
                    categoryAxis: {
                        field: "year",
                        majorGridLines: {
                            visible: false
                        }
                    },
                    tooltip: {
                        visible: true,
                        template: "#= series.name #: #= value #"
                    }
                });
                $("#chartTypeValueErr").empty();
                $("#chartTypeValue").css('display', '');
            } else {
                $("#chartTypeValueErr").html('No items found.');
                $("#chartTypeValue").css('display', 'none');
            }
            $("#PerformanceTracker").append("BusinessArea " + localStorage.GlobalBusinessAreaLocation + "Call to CreateDashboardAndCharts took " + moment(new Date()).diff(exec_start, "seconds") + " seconds.<br/>");
        },
        error:
            function (data) {
                $("#chartTypeValueErr").append('No items found.');
                $("#chartTypeValue").css('display', 'none');
                $("#chartContractValueErr").append('No items found.');
                $("#chartContractValue").css('display', 'none');
            }
    });
}

function CompleteTodo(cb) {
    var vTodoID = cb.id

    $("#loadingPage").fadeIn();
    $.ajax({
        async: false,
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/todos?todoid=' + vTodoID + '&status=Complete&username=' + localStorage.UserName,
        type: "PUT",
        dataType: "json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        "Content-Type": "application/json",
        cache: false,
        success: function (data) {

            var vParent = '';
            var vParentID = '';
            if (data.ContractID != null || data.ContractID != "") {
                vParent = 'Contract';
                vParentID = data.ContractID;
            }
            swal("", "Task Completed");
            $("#loadingPage").fadeOut();
            CreateTodoList();
            PostComment(vTodoID, "Action", 'Completed', '');
            AddActivity("Update", "Task", vTodoID, vParent, vParentID, "'" + data.TodoTitle + "' completed.");
        },
        error: function (data) {
            $("#loadingPage").fadeOut();

        }
    });
}

function PostComment(vTodoID, postType, postAction, postContent) {
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

//ENH 6 & 7 : Minor Enhancements Specs - 30 days  Added from 2.4final to 2.4
var vCounterpartyFields = [];
function CounterpartyFunc() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            $(data).each(function (i, item) {
                vCounterpartyFields.push(item);
            });
        },
        error: function () {
        }
    });
}
//

var vContractsSummary = '';
var vColor = ['#f0ad4e', '#b3d28b', '#6c9539', '#e67665', '#44a6d8'];
function CreateDashboardContracts() {
    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = encodeURIComponent(localStorage.GlobalBusinessAreaLocation);
    }
    var exec_start = moment(new Date());
    $("#contractsList").empty();
    $("#dvDashboardSummary").append('<span class="lineheight20"><img src="../Content/Images/icon/loading.gif" style="height: 16px; width: 16px;"></span>');
    $("#ContractsRecentList").append('<img src="../Content/Images/icon/loading.gif" style="height: 16px; width: 16px;">');
    $("#contractsList").append('<img src="../Content/Images/icon/loading.gif" style="height: 16px; width: 16px;">');
    $("#ContractsUpcomingRenewalsList").append('<img src="../Content/Images/icon/loading.gif" style="height: 16px; width: 16px;">');
    $("#ContractsAboutToExpireList").append('<img src="../Content/Images/icon/loading.gif" style="height: 16px; width: 16px;">');

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/Dashboard?businessarealocation=' + baname,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserName: localStorage.UserName, UserID: localStorage.UserID, 'BusinessAreaLocation': baname },
        cache: false,
        success: function (data) {
            if (typeof data == 'undefined')//NoContent HttpStatusCode Update
            {
                $("#ContractsRecentList").empty();
                $("#ContractsRecentList").append('<p class="f_p-error">No items found.</p>');
                $("#aRecentCount").html('&nbsp;(0)');
                $("#aRecentCount_Mob").html('&nbsp;(0)');
                $("#ContractsUpcomingRenewalsList").empty();
                $("#ContractsUpcomingRenewalsList").append('<p class="f_p-error">No items found.</p>');
                $("#aUpcomingRenewalsCount").html('&nbsp;(0)');
                $("#aUpcomingRenewalsCount_Mob").html('&nbsp;(0)');
                $("#ContractsAboutToExpireList").empty();
                $("#ContractsAboutToExpireList").append('<p class="f_p-error">No items found.</p>');
                $("#aAboutToExpireCount").html('&nbsp;(0)');
                $("#aAboutToExpireCount_Mob").html('&nbsp;(0)');
                $("#dvDashboardSummary").empty();
                $("#dvDashboardSummary").append('<p class="f_p-error">No items found.</p>');
            } else {//NoContent HttpStatusCode Update
                //alert(data);
                CreateCalender();
                //alert(data.ContractsSummary);
                //alert(data.TopContractType);
                //alert(data.ContractsRecent);
                //alert(data.ContractsUpcomingRenewals);
                //alert(data.ContractsAboutToExpire);
                vContractsSummary = data.ContractsSummary;
                var vTopContractType = data.TopContractType;
                var vContractsRecent = data.ContractsRecent;
                var vContractsUpcomingRenewals = data.ContractsUpcomingRenewals;
                var vContractsAboutToExpire = data.ContractsAboutToExpire;

                var sPipeline = $(vContractsSummary).find('Pipeline').text();
                if (sPipeline == "") { sPipeline = "0"; }
                var sSignature = $(vContractsSummary).find('Signature').text();
                if (sSignature == "") { sSignature = "0"; }
                var sActive = $(vContractsSummary).find('Active').text();
                if (sActive == "") { sActive = "0"; }
                var sPast = $(vContractsSummary).find('Past').text();
                if (sPast == "") { sPast = "0"; }
                var sTotal = $(vContractsSummary).find('Total').text();
                if (sTotal == "") { sTotal = "0"; }

                var sPipeline = $(vContractsSummary).find('Pipeline').text();
                if (sPipeline == "") { sPipeline = "0"; }
                var sPipelinePercentage = $(vContractsSummary).find('PipelinePercentage').text();
                if (sPipelinePercentage == "") { sPipelinePercentage = "0"; }
                var sSignature = $(vContractsSummary).find('Signature').text();
                if (sSignature == "") { sSignature = "0"; }
                var sSignaturePercentage = $(vContractsSummary).find('SignaturePercentage').text();
                if (sSignaturePercentage == "") { sSignaturePercentage = "0"; }
                var sActive = $(vContractsSummary).find('Active').text();
                if (sActive == "") { sActive = "0"; }
                var sActivePercentage = $(vContractsSummary).find('ActivePercentage').text();
                if (sActivePercentage == "") { sActivePercentage = "0"; }
                var sPast = $(vContractsSummary).find('Past').text();
                if (sPast == "") { sPast = "0"; }
                var sPastPercentage = $(vContractsSummary).find('PastPercentage').text();
                if (sPastPercentage == "") { sPastPercentage = "0"; }
                var sTotal = $(vContractsSummary).find('Total').text();
                if (sTotal == "") { sTotal = "0"; }

                $("#dvDashboardSummary").empty();

                var article = '';
                var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                    return (n.RowKey == "16" && n.Status == "ON");
                });
                if (vAccFeat.length > 0) {
                    article += '<div class="ctdivLeft width20">';
                    article += '<div id="myDashboardSummary1" data-startdegree="90" data-textwidth="100%" data-textmargin="58px 0px 0px 0px" data-classname="small_circle" data-redirectto="Pipeline?View=All" data-dimension="100" data-text="' + sPipeline + '" data-info="Pipeline" data-width="5" data-fontsize="18" data-percent="' + sPipelinePercentage + '" data-fgcolor="' + vColor[0] + '" data-bgcolor="#eee"></div>';
                    article += '</div>';
                }
                article += '<div class="ctdivLeft width20">';
                article += '<div id="myDashboardSummary2" data-startdegree="90" data-textwidth="100%" data-textmargin="58px 0px 0px 0px" data-classname="small_circle" data-redirectto="Contracts?View=Signed"  data-dimension="100" data-text="' + sSignature + '" data-info="Signature" data-width="5" data-fontsize="18" data-percent="' + sSignaturePercentage + '" data-fgcolor="' + vColor[1] + '" data-bgcolor="#eee"></div>';
                article += '</div>';
                article += '<div class="ctdivLeft width20">';
                article += '<div id="myDashboardSummary3" data-startdegree="90" data-textwidth="100%" data-textmargin="58px 0px 0px 0px" data-classname="small_circle" data-redirectto="Contracts?View=Active"  data-dimension="100" data-text="' + sActive + '" data-info="Active" data-width="5" data-fontsize="18" data-percent="' + sActivePercentage + '" data-fgcolor="' + vColor[2] + '" data-bgcolor="#eee"></div>';
                article += '</div>';
                article += '<div class="ctdivLeft width20">';
                article += '<div id="myDashboardSummary4" data-startdegree="90" data-textwidth="100%" data-textmargin="58px 0px 0px 0px" data-classname="small_circle" data-redirectto="Contracts?View=Past Contracts"  data-dimension="100" data-text="' + sPast + '" data-info="Past" data-width="5" data-fontsize="18" data-percent="' + sPastPercentage + '" data-fgcolor="' + vColor[3] + '" data-bgcolor="#eee"></div>';
                article += '</div>';
                article += '<div class="ctdivLeft width20">';
                article += '<div id="myDashboardSummary5" data-startdegree="90" data-textwidth="100%" data-textmargin="58px 0px 0px 0px" data-classname="small_circle"  data-dimension="100" data-text="' + sTotal + '" data-info="Total" data-width="5" data-fontsize="18" data-percent="100" data-fgcolor="' + vColor[4] + '" data-bgcolor="#eee"></div>';
                article += '</div>';
                $("#dvDashboardSummary").append(article);

                $('#myDashboardSummary1').circliful();
                $('#myDashboardSummary2').circliful();
                $('#myDashboardSummary3').circliful();
                $('#myDashboardSummary4').circliful();
                $('#myDashboardSummary5').circliful();

            var iCount = vContractsRecent.length;
            $("#aRecentCount").html('&nbsp;(' + iCount + ')');
            $("#aRecentCount_Mob").html('&nbsp;(' + iCount + ')');
            if (iCount == 0) {
                $("#ContractsRecentList").empty();
                $("#ContractsRecentList").append('<p class="f_p-error">No items found.</p>');
            }
            else {
                var article = '';
                var articleAll = '';
                var viewall = '';
                var formatRecentDate;
                if (iCount > 5) {
                    //viewall += '<li>';
                    viewall += '<li class="alertbox_bor_btm">'; //Added from 2.4final to 2.4
                    viewall += '<a href="javascript:void(0)" onclick="ViewAllContracts(\'Recent\')" class="linkText">View All</a>';
                    viewall += '</li>';
                }
                for (var i = 0; i < iCount; i++) {
                    var item = vContractsRecent[i];
                    var sContractTitle = item.ContractTitle;
                    var sRowKey = item.RowKey;
                    var sTimestamp = moment(new Date(item.Timestamp)).fromNow();
                    var sBusinessArea = item.BusinessArea;
                    var sContractType = item.ContractType;
                    var vContractNumber = item.ContractNumber;
                    var contractManager = [];
                    if (vContractNumber == "") vContractNumber = "NA";
                    var vStandardIcon = '<img src="../Content/Images/Contract_nonstandard.png" alt="Non-Standard Contract" title="Non-Standard Contract" style="display: none;" />';
                    if (item.IsStandard == "Yes") { vStandardIcon = '<img src="../Content/Images/Contract_standard.png" alt="Standard Contract" title="Standard Contract" style="display: none;" />'; }
                    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                    { formatRecentDate = moment(new Date(item.Timestamp)).format('MM/DD/YYYY'); }
                    else { formatRecentDate = moment(new Date(item.Timestamp)).format(localStorage.AppDateFormat); }

                    //articleAll += '<li>';
                    articleAll += '<li class="alertbox_bor_btm">';  //Added from 2.4final to 2.4
                    articleAll += '<p class="width80"><a href="/Contracts/ContractDetails?ContractID=' + sRowKey + '">' + sContractTitle + '</a>' + vStandardIcon;
                    if (item.ContractManagers.indexOf(';') > -1) {
                        contractManager = item.ContractManagers.split(";");
                    }
                    if (contractManager.length < 4)
                        articleAll += '<small><i title="Contract Record Number">' + vContractNumber + '</i> | <i class="My_Dashboard" title="Contract Type">' + sContractType + '</i> | <i class="My_Dashboard" title="Business Area">' + sBusinessArea + '</i> <i class="BA_Dashboard" title="' + item.ContractManagers + '"> | ' + item.ContractManagers + '</i></small></p>';
                    else
                        articleAll += '<small><i title="Contract Record Number">' + vContractNumber + '</i> | <i class="My_Dashboard" title="Contract Type">' + sContractType + '</i> | <i class="My_Dashboard" title="Business Area">' + sBusinessArea + '</i> <i class="BA_Dashboard doted80" title="' + item.ContractManagers + '"> | ' + item.ContractManagers + '</i></small></p>';
                    articleAll += '<small class="alertbox_right_text">' + formatRecentDate;
                    articleAll += '<i style="color:#b4b3b3; margin: 3px 0px 0px; display: block;">' + sTimestamp + '</i>';
                    articleAll += '</small>';
                    articleAll += '</li>';
                    if (i <= 4) {
                        article = articleAll;
                    }
                }
                $("#ContractsRecentList").empty();
                $("#ContractsRecentList").append(article + viewall);

                    $("#ContractsRecentListAll").append(articleAll);
                    if (iCount > 10) {
                        $('#pagination_ContractsRecent').pagination({
                            items: iCount,
                            itemsOnPage: 10,
                            type: 'ul',
                            typeID: 'ContractsRecentListAll',
                            row: 'li',
                            cssStyle: 'compact-theme',
                            resultcount: 'spResult_ContractsRecent'
                        });
                    }
                }

            iCount = vContractsUpcomingRenewals.length;
            $("#aUpcomingRenewalsCount").html('&nbsp;(' + iCount + ')');
            $("#aUpcomingRenewalsCount_Mob").html('&nbsp;(' + iCount + ')');
            if (iCount == 0) {
                $("#ContractsUpcomingRenewalsList").empty();
                $("#ContractsUpcomingRenewalsList").append('<p class="f_p-error">No items found.</p>');
            }
            else {   //Added from 2.4final to 2.4
                var article = '';
                var articleAll = '';
                var viewall = '';
                var itemCounterparty = "";
                var vCounterparty = "";
                var vCounterparty;
                var sRenewalType;
                var sRenewalDateCount;
                if (iCount > 5) {
                    viewall += '<li class="alertbox_bor_btm">';
                    viewall += '<a href="javascript:void(0)" onclick="ViewAllContracts(\'Renewal\')" class="linkText">View All</a>';
                    viewall += '</li>';
                }
                $(vContractsUpcomingRenewals).each(function (i, item) {
                    if (typeof (item.RenewalDate) != "undefined" || item.RenewalDate != 'NA' || item.RenewalDate != "") {
                        if (moment(new Date(item.RenewalDate)).fromNow().indexOf('hours') > -1) {
                            sRenewalDateCount = 'Due Today' //Number of days left for renewal
                        }
                        else {
                            sRenewalDateCount = 'Due ' + moment(new Date(item.RenewalDate)).fromNow();//Number of days left for renewal
                        }

                    }
                    else { sRenewalDateCount = 'NA'; }
                    var sContractTermType = item.ContractTermType;
                    if (sContractTermType == "") sContractTermType = "NA";
                    if (sContractTermType != "NA") {
                        if (item.AutoRenew == 'Yes' && sContractTermType == 'Renewable') { sRenewalType = 'Auto'; }
                        else if (item.AutoRenew == 'No' && sContractTermType == 'Renewable') { sRenewalType = 'Manual'; }
                        else { sRenewalType = 'NA'; }

                        }

                        var vStandardIcon = '<img src="../Content/Images/Contract_nonstandard.png" alt="Non-Standard Contract" title="Non-Standard Contract" style="display: none;"  />';
                        if (item.IsStandard == "Yes") { vStandardIcon = '<img src="../Content/Images/Contract_standard.png" alt="Standard Contract" title="Standard Contract" style="display: none;" />'; }


                        articleAll += '<li class="alertbox_bor_btm">';
                        articleAll += '<p class="width80"><a href="/Contracts/ContractDetails?ContractID=' + item.RowKey + '" class="PreserveSpace" title="Contract Title">' + item.ContractTitle + '</a> | <i style="color:#b4b3b3; margin: 3px 0px 0px; display: inline-block; font-size: 13px;">(' + sRenewalDateCount + ')</i>' + vStandardIcon;
                        articleAll += '<small>';
                        if (item.Counterparty == "") {
                            articleAll += '<a href="javascript:void(0);" title="Counterparty" style="color: #b4b3b3 !important; text-decoration: none; font-size: 13px !important; cursor: text;" class="PreserveSpace">NA</a> |' // Bug id: eO37650
                        }
                        else {
                            if (item.Counterparty.indexOf(';') > -1) {
                                var countCP = 0;
                                var ExtraCounter = "";

                                var sCP = item.Counterparty.split(';');
                                $(sCP).each(function (i, arritem) {
                                    itemCounterparty = arritem.replace(/\s+/g, '');//Remove white spaces from string
                                    if (vCounterpartyFields.length > 0) {
                                        vCounterparty = $.grep(vCounterpartyFields, function (n, i) {
                                            return (n.CounterpartyName.replace(/\s+/g, '').toLowerCase() == itemCounterparty.toLowerCase());
                                        });
                                        if (vCounterparty != null && vCounterparty != "" && vCounterparty.length > 0) {
                                            if (countCP > 0) {
                                                countCP++;
                                                ExtraCounter += '<a href="/Counterparty/CounterpartyDetail?CounterpartyID=' + vCounterparty[0].RowKey + '"  title="Counterparty" style="font-size: 13px !important;color: #3F91CC !important" class="PreserveSpace">' + itemCounterparty + '</a>|';
                                            }
                                            else {
                                                articleAll += '<a href="/Counterparty/CounterpartyDetail?CounterpartyID=' + vCounterparty[0].RowKey + '" style="font-size: 13px !important;"  title="Counterparty" class="PreserveSpace">' + itemCounterparty + '</a> '
                                                countCP++;
                                            }
                                        }
                                            //Bug id:e037674
                                        else {
                                            if (countCP > 0) {
                                                countCP++;
                                                ExtraCounter += '<a href="javascript:void(0)"  title="Counterparty" style="color: #b4b3b3 !important; text-decoration: none;cursor: text;font-size: 13px !important;" class="PreserveSpace">' + itemCounterparty + '</a>|';
                                            }
                                            else {
                                                articleAll += '<a href="javascript:void(0)" title="Counterparty" style="color: #b4b3b3 !important; text-decoration: none; font-size: 13px !important; cursor: text;" class="PreserveSpace">' + itemCounterparty + '</a> ';
                                                countCP++;
                                            }
                                        }
                                    }
                                });
                                if (countCP > 0) {
                                    articleAll += '<label id="' + item.RowKey + 'lblview" class="PreserveSpace" style="display:none">' + ExtraCounter + '</label>';
                                    articleAll += ' <a style="font-size: 11px; color: #44a6d8 !important;" id="more' + item.RowKey + '" href="javascript:void(0);" onclick="ViewAll(this);" class="PreserveSpace">' + --countCP + ' more</a> | ';
                                }

                            }
                            else {
                                itemCounterparty = item.Counterparty;
                                if (vCounterpartyFields.length > 0) {
                                    vCounterparty = $.grep(vCounterpartyFields, function (n, i) {
                                        return (n.CounterpartyName.replace(/\s+/g, '').toLowerCase() == itemCounterparty.replace(/\s+/g, '').toLowerCase());
                                    });
                                    if (vCounterparty != null && vCounterparty != "" && vCounterparty.length > 0)
                                        articleAll += '<a href="/Counterparty/CounterpartyDetail?CounterpartyID=' + vCounterparty[0].RowKey + '" style="font-size: 13px !important;"  title="Counterparty" class="PreserveSpace">' + itemCounterparty + '</a> | ';
                                    else
                                        articleAll += '<a href="javascript:void(0)"  title="Counterparty" style="color: #b4b3b3 !important; text-decoration: none;cursor: text;font-size: 13px !important;" class="PreserveSpace">' + itemCounterparty + '</a> | ';
                                }

                            }

                        }
                        if (sContractTermType == 'NA') {
                            articleAll += '<i class="My_Dashboard" title="Contract Term Type">' + sContractTermType + '</i>';
                        } else {
                            articleAll += '<i class="My_Dashboard" title="Contract Term Type">' + sContractTermType + '</i>';
                            articleAll += ' <i class="My_Dashboard" title="Renewal Type"> (' + sRenewalType + ')</i> '
                        }
                        if ((typeof (item.NextTermStartDate) == "undefined" || item.NextTermStartDate == null || item.NextTermStartDate == "") && (typeof (item.NextTermEndDate) == "undefined" || item.NextTermEndDate == null || item.NextTermEndDate == "")) {
                            articleAll += '| <i class="My_Dashboard" title="Term Date">NA</i></small></p>'
                        } else {
                            var dateFormatValue = (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") ? "MM/DD/YYYY" : localStorage.AppDateFormat;
                            var formatNextTermStartDate = moment(new Date(item.NextTermStartDate)).format(dateFormatValue);
                            var formatNextTermEndDate = moment(new Date(item.NextTermEndDate)).format(dateFormatValue);

                            articleAll += '| <i class="My_Dashboard" title="Next Term Start Date">' + formatNextTermStartDate + '</i>  - <i class="My_Dashboard" title="Next Term End Date">' + formatNextTermEndDate + '</i></small></p>';
                        }
                        articleAll += '<small class="alertbox_right_text" style="padding-left:18px; border-left: solid 1px #ccc; margin-right: 30px; margin-top:6px;"><a href="javascript:void(0);" title="View Details"><img src="../Content/Images/icon/view_detail_icon.png" alt="View Detail" id=' + item.RowKey + ' onclick = viewRenewalDetailsNew(\'' + item.RowKey + '\'); title="View Details" style="cursor: Pointer;"/></a></small>';
                        articleAll += '<div class="clsdivCounterparty" id="dvMoreCounterparties' + item.RowKey + '" style="display:none;"></div>';
                        articleAll += '</li>';
                        if (i <= 4) {
                            article = articleAll;
                        }
                    });
                    $("#ContractsUpcomingRenewalsList").empty();
                    $("#ContractsUpcomingRenewalsList").append(article + viewall);

                    $("#ContractsUpcomingRenewalsListAll").append(articleAll);
                    if (iCount > 10) {
                        $('#pagination_ContractsRenewal').pagination({
                            items: iCount,
                            itemsOnPage: 10,
                            type: 'ul',
                            typeID: 'ContractsUpcomingRenewalsListAll',
                            row: 'li',
                            cssStyle: 'compact-theme',
                            resultcount: 'spResult_ContractsRenewal'
                        });
                    }
                }
                iCount = vContractsAboutToExpire.length;
                $("#aAboutToExpireCount").html('&nbsp;(' + iCount + ')');
                $("#aAboutToExpireCount_Mob").html('&nbsp;(' + iCount + ')');
                if (iCount == 0) {
                    $("#ContractsAboutToExpireList").empty();
                    $("#ContractsAboutToExpireList").append('<p class="f_p-error">No items found.</p>');
                }
                else {  //Added from 2.4final to 2.4
                    var article = '';
                    var articleAll = '';
                    var viewall = '';
                    //Added from 2.4final to 2.4
                    var itemCounterparty = "";
                    var vCounterparty = "";
                    var sEndDateCount;
                    if (iCount > 5) {
                        //viewall += '<li>';
                        viewall += '<li class="alertbox_bor_btm">';
                        viewall += '<a href="javascript:void(0)" onclick="ViewAllContracts(\'Expire\')" class="linkText">View All</a>';
                        viewall += '</li>';
                    }
                    $(vContractsAboutToExpire).each(function (i, item) {
                        var sContractTermType = item.ContractTermType;
                        if (sContractTermType == "") sContractTermType = "NA";
                        if (typeof (item.EndDate) != "undefined" && item.EndDate != null && item.EndDate != "") {
                            sEndDateCount = moment(new Date(item.EndDate)).fromNow();//Number of days left for expiry
                        } else { sEndDateCount = 'NA'; }
                        var vStandardIcon = '<img src="../Content/Images/Contract_nonstandard.png" alt="Non-Standard Contract" title="Non-Standard Contract" style="display: none;" />';
                        if (item.IsStandard == "Yes") { vStandardIcon = '<img src="../Content/Images/Contract_standard.png" alt="Standard Contract" title="Standard Contract" style="display: none;" />'; }

                        articleAll += '<li class="alertbox_bor_btm" >';
                        articleAll += '<p class="width80"><a href="/Contracts/ContractDetails?ContractID=' + item.RowKey + '" class="PreserveSpace" title="Contract Title">' + item.ContractTitle + '</a> <i style="color:#b4b3b3; margin: 3px 0px 0px; display: inline-block; font-size: 13px;">(Due ' + sEndDateCount + ')</i>' + vStandardIcon;
                        articleAll += '<small>';
                        if (item.Counterparty == "") {
                            articleAll += '<a href="javascript:void(0);" title="Counterparty" style="color: #b4b3b3 !important; text-decoration: none; font-size: 13px !important; cursor: text;" class="PreserveSpace">NA</a> | '
                        }
                        else {
                            if (item.Counterparty.indexOf(';') > -1) {
                                var countEP = 0;
                                var ExtraCounterEP = "";

                                var sCP = item.Counterparty.split(';');
                                $(sCP).each(function (i, arritem) {
                                    itemCounterparty = arritem.replace(/\s+/g, '');//Remove white spaces from string
                                    if (vCounterpartyFields.length > 0) {
                                        vCounterparty = $.grep(vCounterpartyFields, function (n, i) {
                                            return (n.CounterpartyName.replace(/\s+/g, '').toLowerCase() == itemCounterparty.toLowerCase());
                                        });
                                        if (vCounterparty != null && vCounterparty != "" && vCounterparty.length > 0) {
                                            if (countEP > 0) {
                                                countEP++;
                                                ExtraCounterEP += '<a href="/Counterparty/CounterpartyDetail?CounterpartyID=' + vCounterparty[0].RowKey + '"  title="Counterparty" style="color: #3F91CC !important;font-size: 13px !important;" class="PreserveSpace">' + itemCounterparty + '</a>|';
                                            }
                                            else {
                                                articleAll += '<a href="/Counterparty/CounterpartyDetail?CounterpartyID=' + vCounterparty[0].RowKey + '" style="font-size: 13px !important;"  title="Counterparty" class="PreserveSpace">' + itemCounterparty + '</a> ';
                                                countEP++;
                                            }
                                        }
                                            //Bug id:e037674
                                        else {
                                            if (countEP > 0) {
                                                countEP++;
                                                ExtraCounterEP += '<a href="javascript:void(0)"  title="Counterparty" style="color: #b4b3b3 !important; text-decoration: none;cursor: text;font-size: 13px !important;" class="PreserveSpace">' + itemCounterparty + '</a>|';
                                            }
                                            else {
                                                articleAll += '<a href="javascript:void(0)" title="Counterparty" style="color: #b4b3b3 !important; text-decoration: none; font-size: 13px !important; cursor: text;" class="PreserveSpace">' + itemCounterparty + '</a> ';
                                                countEP++;
                                            }
                                        }
                                    }
                                });
                                if (countEP > 0) {
                                    articleAll += '<label id="' + item.RowKey + 'lblview" class="PreserveSpace" style="display:none">' + ExtraCounterEP + '</label>';
                                    articleAll += '<a style="font-size:11px" id="more' + item.RowKey + '" href="javascript:void(0);" onclick="ViewAll(this);" class="PreserveSpace">' + --countEP + ' more</a> | ';
                                }
                            } else {
                                itemCounterparty = item.Counterparty;
                                if (vCounterpartyFields.length > 0) {
                                    vCounterparty = $.grep(vCounterpartyFields, function (n, i) {
                                        return (n.CounterpartyName.replace(/\s+/g, '').toLowerCase() == itemCounterparty.replace(/\s+/g, '').toLowerCase());
                                    });
                                    if (vCounterparty != null && vCounterparty != "" && vCounterparty.length > 0)
                                        articleAll += '<a href="/Counterparty/CounterpartyDetail?CounterpartyID=' + vCounterparty[0].RowKey + '" style="font-size: 13px !important;"  title="Counterparty" class="PreserveSpace">' + itemCounterparty + '</a> | ';
                                    else
                                        articleAll += '<a href="javascript:void(0)"  title="Counterparty" style="color: #b4b3b3 !important; text-decoration: none;cursor: text;font-size: 13px !important;" class="PreserveSpace">' + itemCounterparty + '</a> | ';
                                }
                            }
                        }
                        articleAll += ' <i class="My_Dashboard" title="Contract Term Type">' + sContractTermType + '</i></small></p>';
                        articleAll += '<div class="clsdivCounterparty" id="dvMoreCounterparties' + item.RowKey + '" style="display:none"></div>';
                        articleAll += '</li>';
                        if (i <= 4) {
                            article = articleAll;
                        }
                    });
                    $("#ContractsAboutToExpireList").empty();
                    $("#ContractsAboutToExpireList").append(article + viewall);

                    $("#ContractsAboutToExpireListAll").append(articleAll);
                    if (iCount > 10) {
                        $('#pagination_ContractsExpire').pagination({
                            items: iCount,
                            itemsOnPage: 10,
                            type: 'ul',
                            typeID: 'ContractsAboutToExpireListAll',
                            row: 'li',
                            cssStyle: 'compact-theme',
                            resultcount: 'spResult_ContractsExpire'
                        });
                    }
                }

                if (baname != '') {
                    $(vTopContractType).find('Item').each(function (i) {
                        var sType = $(this).find('ContractType').text();
                        var sStandard = $(this).find('Standard').text();
                        var sNonStandard = $(this).find('NonStandard').text();
                        var sPercentage = $(this).find('Percentage').text();
                        var sTotal = $(this).find('Total').text();

                        var article = '';
                        if (i == 0)
                            article += '<div class="ctdivLeft">';
                        else if (i == 1)
                            article += '<div class="ctdivRight">';
                        else if (i == 2)
                            article += '<div class="ctdivLeft margin-topchart">';
                        else if (i == 3)
                            article += '<div class="ctdivRight margin-topchart">';
                        article += '<div id="myTopContractType' + i + '" data-dimension="250" data-text="' + sStandard + '/' + sTotal + '" data-info="' + sType + '" data-width="30" data-fontsize="28" data-percent="' + sPercentage + '" data-fgcolor="#44a6d8" data-bgcolor="#eee" data-type="half" data-icon="fa-task"></div>';
                        article += '</div>';
                        $("#TopContractTypes").append(article);

                        $('#myTopContractType' + i).circliful();
                    });
                    $("#tblTopContractTypeChart").css('display', '');
                    $(".BA_Dashboard").css("display", "");
                    $(".My_Dashboard").css("display", "");// Bug id: eO37650
                } else {
                    $(".BA_Dashboard").css("display", "none");
                    $(".My_Dashboard").css("display", "");
                }
            }
        },
        error: function () {
            $("#ContractsRecentList").empty();
            $("#ContractsRecentList").append('<p class="f_p-error">No items found.</p>');
            $("#aRecentCount").html('&nbsp;(0)');
            $("#aRecentCount_Mob").html('&nbsp;(0)');
            $("#ContractsUpcomingRenewalsList").empty();
            $("#ContractsUpcomingRenewalsList").append('<p class="f_p-error">No items found.</p>');
            $("#aUpcomingRenewalsCount").html('&nbsp;(0)');
            $("#aUpcomingRenewalsCount_Mob").html('&nbsp;(0)');
            $("#ContractsAboutToExpireList").empty();
            $("#ContractsAboutToExpireList").append('<p class="f_p-error">No items found.</p>');
            $("#aAboutToExpireCount").html('&nbsp;(0)');
            $("#aAboutToExpireCount_Mob").html('&nbsp;(0)');
            $("#dvDashboardSummary").empty();
            $("#dvDashboardSummary").append('<p class="f_p-error">No items found.</p>');
        },
        complete: function () {
            //var height1 = $(".box2").height();
            //$(".my_Alersmargin").height(height1);
        }
    });
}

function ViewAllContracts(conttype) {
    if (conttype == "Recent") {
        $("#dvContractsRecentListAll").dialog("open");
    }
    else if (conttype == "Renewal") {
        $("#dvContractsUpcomingRenewalsListAll").dialog("open");
    }
    else if (conttype == "Expire") {
        $("#dvContractsAboutToExpireListAll").dialog("open");
    }
}

function CreateCounterpartyList() {
    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = localStorage.GlobalBusinessAreaLocation;
    }
    var exec_start = moment(new Date());
    $("#CounterpartiesRecentUsed").empty();
    $("#CounterpartiesRecentUsed").append('<img src="../Content/Images/icon/loading.gif" style="height: 16px; width: 16px;">');

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Counterparty/RecentUsed?businessarealocation=' + baname,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'BusinessAreaLocation': baname },
        cache: false,
        success: function (data) {
            if (data.length == 0) {
                $("#CounterpartiesRecentUsed").empty();
                $("#CounterpartiesRecentUsed").append('<p class="f_p-error">No items found.</p>');
            }
            else {
                var iCount = data.length;
                var article = '';
                if (iCount > 7) iCount = 7;
                for (var i = 0; i < iCount; i++) {
                    var item = data[i];
                    var sCounterpartyName = item.CounterpartyName;
                    var sRowKey = item.RowKey;
                    var sTimestamp = moment(new Date(item.Timestamp)).fromNow();
                    var myUrl = '/Counterparty/CounterpartyDetail?CounterpartyID=' + encodeURI(item.RowKey);

                    article += '<li>';
                    article += '<p><a href="' + myUrl + '">' + sCounterpartyName + '</a>';
                    article += ' <small>' + sTimestamp + '</small></p></li>';

                }
                $("#CounterpartiesRecentUsed").empty();
                $("#CounterpartiesRecentUsed").append(article);
            }
        },
        error: function () {
            $("#CounterpartiesRecentUsed").empty();
            $("#CounterpartiesRecentUsed").append('<p class="f_p-error">No items found.</p>');
        }
    });
}

function CreateDocumentsList() {
    var exec_start = moment(new Date());
    $("#documentsList").empty();
    $("#documentsList").append('<img src="../Content/Images/icon/loading.gif" style="height: 16px; width: 16px;">');

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?user=' + localStorage.UserName + '&noOfItem=5',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'GlobalBusinessAreaLocation': localStorage.GlobalBusinessAreaLocation },
        cache: false,
        success: function (data) {
            if (data.length == 0) {
                $("#documentsList").empty();
                $("#documentsList").append('<p class="f_p-error">No items found.</p>');
            }
            else {
                var datalenght = data.length;
                var article = '';
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];
                    var sDocumentName = item.DocumentName;
                    var sDocumentUrl = item.DocumentUrl;
                    var sRowKey = item.RowKey;
                    var sTimestamp = moment(new Date(item.Timestamp)).fromNow();

                    article += '<li>';
                    article += '<p><a href="' + sDocumentUrl + '" target="_blank">' + sDocumentName + '</a>';
                    article += ' <small>' + sTimestamp + '</small></p></li>';

                }
                $("#documentsList").empty();
                $("#documentsList").append(article);

            }
        },
        error: function () {
            $("#documentsList").empty();
            $("#documentsList").append('<p class="f_p-error">No items found.</p>');
        }
    });
}

function CreateDashboard() {
    var DashboardContracts = '<DashboardContracts><Pipeline>';
    DashboardContracts += '<New>43</New>';
    DashboardContracts += '<Approve>15</Approve>';
    DashboardContracts += '<Signature>8</Signature>';
    DashboardContracts += '</Pipeline>';
    DashboardContracts += '<Recent>';
    DashboardContracts += '<Active>7</Active>';
    DashboardContracts += '<Renewed>2</Renewed>';
    DashboardContracts += '<Extended>1</Extended>';
    DashboardContracts += '</Recent>';
    DashboardContracts += '<Upcoming>';
    DashboardContracts += '<Expired>77</Expired>';
    DashboardContracts += '<UpForRenewal>113</UpForRenewal>';
    DashboardContracts += '<AboutToExpire>77</AboutToExpire>';
    DashboardContracts += '</Upcoming></DashboardContracts>';

    $(DashboardContracts).find('Pipeline').each(function () {
        var sNew = $(this).find('New').text();
        var sApprove = $(this).find('Approve').text();
        var sSignature = $(this).find('Signature').text();

        $("#ulDashboardPipeline").append('<li onclick="NavigateToReport(\'Status=New;Drafting\')"><strong>' + sNew + '</strong><small>New</small></li>');
        $("#ulDashboardPipeline").append('<li onclick="NavigateToReport(\'Status=Awaiting Review;Awaiting Approval;In Negotiation\')"><strong>' + sApprove + '</strong><small>Approve</small></li>');
        $("#ulDashboardPipeline").append('<li onclick="NavigateToReport(\'Status=Awaiting Signatures\')"><strong>' + sSignature + '</strong><small>Signature</small></li>');
    });

    $(DashboardContracts).find('Recent').each(function () {
        var Active = $(this).find('Active').text();
        var Renewed = $(this).find('Renewed').text();
        var Extended = $(this).find('Extended').text();

        $("#ulDashboardRecent").append('<li onclick="NavigateToReport(\'Status=Active\')"><strong>' + Active + '</strong><small>Active</small></li>');
        $("#ulDashboardRecent").append('<li onclick="NavigateToReport(\'Status=Renewed\')"><strong>' + Renewed + '</strong><small>Renewed</small></li>');
        $("#ulDashboardRecent").append('<li onclick="NavigateToReport(\'Status=Extended\')"><strong>' + Extended + '</strong><small>Extended</small></li>');
    });

    $(DashboardContracts).find('Upcoming').each(function () {
        var Expired = $(this).find('Expired').text();
        var UpForRenewal = $(this).find('UpForRenewal').text();
        var AboutToExpire = $(this).find('AboutToExpire').text();

        $("#ulDashboardUpcoming").append('<li onclick="NavigateToReport(\'Status=Expired\')"><strong>' + Expired + '</strong><small>Expired</small></li>');
        $("#ulDashboardUpcoming").append('<li onclick="NavigateToReport(\'Status=Up for Renewal\')"><strong>' + UpForRenewal + '</strong><small>Up For Renewal</small></li>');
        $("#ulDashboardUpcoming").append('<li onclick="NavigateToReport(\'Status=About to Expire\')"><strong>' + AboutToExpire + '</strong><small>About To Expire</small></li>');
    });

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/reports/dashboard',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $(data.CurrentContractSummary).find('Contract').each(function () {
                var sStatus = $(this).find('Status').text();
                var sCount = $(this).find('Count').text();
                $("#contractTypeChart").append('<li onclick="NavigateToReport(\'Status=' + sStatus + '\')" style="cursor:pointer"><a href="javascript:void(0)">' + sCount + ' <span>' + sStatus + '</a></span></li>');
            });

        },
        error:
            function (data) {
                $("#contractTypeChartErr").append('No items found.');
            }
    });
}

function NavigateToReport(vParameter) {
    location = '/Contracts?' + vParameter;
}

function CreateChart() {
    var vStatus = [];
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/reports/currentcontracttype',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $(data).find('Contract').each(function () {
                var sType = $(this).find('Type').text();
                var sCount = $(this).find('Count').text();
                var sColor = $(this).find('Color').text();
                vStatus.push({
                    category: sType,
                    value: sCount,
                    color: sColor
                });
            });
            $("#chart").kendoChart({
                title: {
                    visible: false
                },
                theme: "flat",
                legend: {
                    visible: false
                },
                chartArea: {
                    background: ""
                },
                seriesDefaults: {
                    labels: {
                        visible: true,
                        background: "transparent",
                        position: "insideEnd",
                        align: "inside",
                        template: "#= category #: #= value#"
                    }
                },
                series: [{
                    type: "pie",
                    startAngle: 150,
                    data: vStatus
                }],
                tooltip: {
                    visible: true,
                    template: "#= category #: #= value#"
                }
            });
        },
        error:
            function (data) {
            }
    });
}

function ContractValueChart() {
    var vDefaultCurrency = '';
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/defaultcurrency',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: false,
        success: function (data) {
            vDefaultCurrency = data.Abbreviation;
        }
    });
    var vStatus = [];
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/reports/contractvaluechart',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $(data).find('Contract').each(function (i) {
                var sType = $(this).find('Type').text();
                var sCount = $(this).find('Count').text();
                var sColor = "#f0ad4e";
                if (i == 0) {
                    sColor = "#7ea568";
                }

                if (sCount != 0) {
                    vStatus.push({
                        category: sType,
                        value: sCount,
                        color: sColor
                    });
                }
            });
            if (vStatus.length > 0) {
                $("#chartContractValue").kendoChart({
                    title: {
                        visible: false
                    },
                    theme: "flat",
                    legend: {
                        visible: false
                    },
                    chartArea: {
                        background: ""
                    },
                    seriesDefaults: {
                        labels: {
                            visible: true,
                            background: "transparent",
                            position: "insideEnd",
                            align: "inside",
                            template: "#= category #: \n #= value# " + vDefaultCurrency
                        }
                    },
                    series: [{
                        type: "pie",
                        startAngle: 150,
                        data: vStatus
                    }],
                    tooltip: {
                        visible: true,
                        template: "#= category #: \n #= value# " + vDefaultCurrency
                    }
                });
            }
            else { $("#chartContractValueErr").append('No items found.'); }
        },
        error:
            function (data) {
                $("#chartContractValueErr").append('No items found.');
            }
    });
}

function ContractTypeByStatusChart() {
    var vStatus = [];
    var vStatus2 = [];
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/reports/ContractTypeByStatus',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {


            $(data).find('Contract').each(function (i) {
                if (i <= 4) {
                    var sType = $(this).find('Type').text();
                    var sData = $(this).find('Count').text();
                    var sColor = $(this).find('Color').text();
                    var vData = [];
                    var res = sData.split(",");

                    if (sData != "") {
                        if (sData != "0, 0, 0, 0") {
                            vStatus.push({
                                "year": sType,
                                "Active": parseInt(res[0].trim()),
                                "Extended": parseInt(res[1].trim()),
                                "Renewed": parseInt(res[2].trim()),
                                "UpforRenewal": parseInt(res[3].trim())
                            });
                        }
                    }
                }
            });

            vStatus2.push({
                field: "Active",
                name: "Active",
                color: "#7ea568"
            });
            vStatus2.push({
                field: "Extended",
                name: "Extended",
                color: "#f0ad4e"
            });
            vStatus2.push({
                field: "Renewed",
                name: "Renewed",
                color: "#61a9dc"
            });
            vStatus2.push({
                field: "UpforRenewal",
                name: "Up for Renewal",
                color: "#cc6766"
            });

            $("#chartTypeValue").kendoChart({
                dataSource: vStatus,
                title: {
                    text: ""
                },
                theme: "flat",
                legend: {
                    visible: true,
                    position: "bottom"
                },
                seriesDefaults: {
                    labels: {
                        template: "#= value #",
                        visible: false,
                        background: "transparent",
                        position: "insideEnd",
                        align: "inside"
                    },
                    type: "bar",
                    stack: true
                },
                series: vStatus2,
                valueAxis: {
                    line: {
                        visible: true
                    },
                    minorGridLines: {
                        visible: false
                    }
                },
                categoryAxis: {
                    field: "year",
                    majorGridLines: {
                        visible: false
                    }
                },
                tooltip: {
                    visible: true,
                    template: "#= series.name #: #= value #"
                }
            });
        },
        error:
            function (data) {
                $("#chartTypeValueErr").append('No items found.');
            }
    });
}

$("#ddlPriority").change(function (obj) {
    CreateMyAlertList();
});

function CreateMyAlertList() {
    $("#myAlerts").html('');
    $('#myAlerts').html('<img src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/notifications?userid=' + localStorage.UserName + '&dismissed=No&priority=' + $("#ddlPriority option:selected").text() + '&pagesize=15&startindex=1',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            var article = '';
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                var sCategory = item.Category;
                var sNotificationTitle = item.NotificationTitle;
                var sNotificationDate = moment(new Date(item.NotificationDate)).format('Do MMM');
                var vPriority = item.Priority;
                var vPriorityIcon = '<img src="/Content/Images/priority_none.png" alt="None" title="None" />';
                if (vPriority == "High") {
                    vPriorityIcon = '<img src="/Content/Images/priority_high.png" alt="High" title="High" />';
                }
                else if (vPriority == "Medium") {
                    vPriorityIcon = '<img src="/Content/Images/priority_medium.png" alt="Medium" title="Medium" />';
                }
                else if (vPriority == "Low") {
                    vPriorityIcon = '<img src="/Content/Images/priority_low.png" alt="Low" title="Low" />';
                }
                var vNewIcon = ' <img src="../Content/Images/new_item.png" alt="New" title="New" />';
                if (item.UserViewed != "No") { vNewIcon = ""; }


                article += '<li>';
                article += '<p id="NotificationTitle" style="display:none;">' + sNotificationTitle + '</p>';
                article += '<p id="NotificationID" style="display:none;">' + item.RowKey + '</p>';
                article += '<p><a href="javascript:void(0)" onclick="ViewAlertDetail(\'' + item.RowKey + '\')" class="linkText">' + sNotificationTitle + '</a>';
                article += vNewIcon + vPriorityIcon;
                article += '<img src="/Content/Images/context_Menu.png" class="openmenuitems"/>';
                article += '<small>' + sNotificationDate + '</small></p>';

                if (sCategory == "Contract") {
                    article += '<b class="status_blue">' + sCategory + '</b></li>';
                }
                else if (sCategory == "Document") {
                    article += '<b class="status_green">' + sCategory + '</b></li>';
                }
                else if (sCategory == "Value") {
                    article += '<b class="status_green">' + sCategory + '</b></li>';
                }
                else if (sCategory == "Status") {
                    article += '<b class="status_pink">' + sCategory + '</b></li>';
                }
                else if (sCategory == "Permission") {
                    article += '<b class="status_brass">' + sCategory + '</b></li>';
                }
                else {
                    article += '<b class="status_yellow">' + sCategory + '</b></li>';
                }



            }
            $("#myAlerts").html('');
            $("#myAlerts").append(article);
            $(".openmenuitems").contextMenu({ menu: 'myMenu', leftButton: true }, function (action, el, pos) { contextMenuWork(action, el.parent("p").parent("li"), pos); });
        },
        error:
            function (data) {
                $("#myAlerts").html('');
                $("#myAlerts").append('<p class="f_p-error">No items found.</p>');
            }
    });


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
function contextMenuWork(action, el, pos) {

    switch (action) {
        case "view":
            {
                var notificationID = $(el).find("#NotificationID").text();
                ViewAlertDetail(notificationID);

                break;
            }
        case "forward":
            {
                $("#loadingPage").fadeIn();
                if ($("#ddlForwardTo > option").length == 0) {
                    var $options = $("#ddlApprovers > option").clone();
                    $('#ddlForwardTo').append($options);

                    $("#ddlForwardTo").chosen();
                    $('.chosenmulti').on('chosen:showing_dropdown', function (evt, params) {
                        $('.result-selected').css('display', 'none');
                    });
                } else {

                    GetValuesAndAutoPopulate("ddlForwardTo", "");
                }
                var notificationTitle = $(el).find("#NotificationTitle").text();
                var notificationID = $(el).find("#NotificationID").text();
                $("#hdNotificationID").val(notificationID);
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/notifications?notificationid=' + notificationID,
                    type: 'GET',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    cache: false,
                    success: function (entity) {
                        $("#sentOnForward").html(moment(new Date(entity.NotificationDate)).format('Do MMM'));
                        $("#alertTitleForward").html(entity.NotificationTitle);

                        var vNotificationDescription = entity.NotificationDescription;
                        vNotificationDescription = vNotificationDescription.replace(/\n/g, "<br/>");

                        $("#alertTextForward").html(vNotificationDescription);
                        $("#loadingPage").fadeOut();
                        $("#dvAlertForward").dialog("open");
                    },
                    error: function (status) {
                        $("#loadingPage").fadeOut();
                    }
                });

                break;
            }
        case "dismiss":
            {
                var notificationTitle = $(el).find("#NotificationTitle").text();
                var notificationID = $(el).find("#NotificationID").text();
                swal({
                    title: '',
                    text: "Are you sure you want to <span style=\"font-weight:700\">dismiss '" + notificationTitle + "'</span>?",
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
                               url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/notifications/' + notificationID + '?dismissed=Yes',
                               type: 'PUT',
                               dataType: 'json',
                               headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                               cache: false,
                               success: function (data) {
                                   $("#loadingPage").fadeOut();
                                   swal("", notificationTitle + " Dismissed.");
                                   CreateMyAlertList();
                                   MyNotificationList();
                               },
                               error: function (status) {
                                   $("#loadingPage").fadeOut();
                               }
                           });
                       }
                       return;
                   });

                break;
            }
    }
}

function ForwardAlert() {
    if (requiredValidator('dvAlertForward')) {
        var arrForwardTo = $("#ddlForwardTo").val();
        var vForwardTo = '';
        $(arrForwardTo).each(function (i, item) {
            if (vForwardTo == '') {
                vForwardTo = item;
            }
            else {
                vForwardTo += "; " + item;
            }
        });
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/notifications/' + $("#hdNotificationID").val() + '?forwardto=' + vForwardTo,
            type: 'POST',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            cache: false,
            success: function (data) {
                swal("", "Alert forwarded to " + vForwardTo);
                $("#hdNotificationID").val("");
                $("#dvAlertForward").dialog("close");
            }
        });
    }
}

function CreateMyLogHistory() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/activities/user/' + localStorage.UserName,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                var sObject = item.Object;
                var sActivity = item.Activity;
                var sTimestamp = moment(new Date(item.Timestamp)).format('Do MMM, h:mm A');

                var article = '<article class="d-box1">';
                if (sObject == "Contract") {
                    article += '<div class="d_left-table">';
                    article += '<i class="green">' + sObject + '</i>';
                }
                else if (sObject == "Document") {
                    article += '<div class="d_left-table">';
                    article += '<i class="pink">' + sObject + '</i>';
                }
                else {
                    article += '<div class="d_left-table">';
                    article += '<i class="yelow">' + sObject + '</i>';
                }
                article += '</div>';
                article += '<div class="d_middle-table">';
                article += '<p class="text">' + sActivity + '</p>';
                article += '</div>';
                article += '<div class="d_right-table">';
                article += '<p class="text">' + sTimestamp + '</p>';
                article += '</div>';
                article += '</article>';
                $("#myLogHistory").append(article);
            }
        },
        error:
            function (data) {

            }
    });
}

function CreateTaskList() {
    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = localStorage.GlobalBusinessAreaLocation;
    }
    var exec_start = moment(new Date());
    $("#mytodoList").empty();
    $("#mytodoList").append('<img src="../Content/Images/icon/loading.gif" style="height: 16px; width: 16px;">');

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow/tasks?businessarealocation=' + baname + '&assignto=' + localStorage.UserName + '&status=In Progress&pageSize=&startIndex=',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'GlobalBusinessAreaLocation': baname },
        cache: false,
        success: function (data) {
            var iCount = 0;
            if (typeof data != 'undefined')//NoContent HttpStatusCode Update
                iCount = data.length;
            $("#aTodosCount").html('&nbsp;(' + iCount + ')');
            $("#aTodosCount_Mob").html('&nbsp;(' + iCount + ')');
            if (iCount == 0) {
                $("#mytodoList").empty();
                $("#mytodoList").append('<p class="f_p-error">No items found.</p>');
            }
            else {
                var article = '';
                var viewall = '';
                if (iCount > 8) {
                    iCount = 8;
                    viewall += '<li>';
                    viewall += '<a href="/Activity/Activity?View=Tasks" class="linkText">View All</a>';
                    viewall += '</li>';
                }
                for (var i = 0; i < iCount; i++) {
                    var item = data[i];
                    var sTaskTitle = item.TaskTitle;
                    var sRowKey = item.RowKey;
                    var sDuedate = '';
                    //Vinod
                    if (item.Initiator.length > 37) {
                        var Initiator = item.Initiator;
                    } else {
                        var Initiator = "Initiators";
                    }
                    if (typeof item.DueDate != 'undefined' && item.DueDate != null) {

                        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                        { sDuedate = moment(new Date(item.DueDate)).format('MM/DD/YYYY'); }
                        else { sDuedate = moment(new Date(item.DueDate)).format(localStorage.AppDateFormat); }
                    }
                    else { sDuedate = "NA"; }
                    var vNewIcon = '<img src="../Content/Images/new_item.png" alt="New" title="New" />';
                    if (item.UserViewed == "Yes") { vNewIcon = ""; }

                    article += '<li class="alertbox_bor_btm">';   //Added from 2.4final to 2.4
                    //Vinod
                    article += '<p class="width80"><a class="dotdotdotForMoreSpace" href="/Activity/TaskDetails?TaskID=' + sRowKey + '&WorkflowID=' + item.WorkflowID + '" title="' + sTaskTitle + '">' + sTaskTitle + '</a>' + vNewIcon;
                    //Vinod
                    article += '<small class="to-do-task-small dotdotdotForMoreSpace" title="' + Initiator + '">' + item.Initiator + '</small></p>';
                    article += '<small class="alertbox_right_text" title="Due Date" style="margin:3px 0px 0px;">' + sDuedate + "</small>";
                    article += '</li>';


                }
                article += viewall;
                $("#mytodoList").empty();
                $("#mytodoList").append(article);

            }
        },
        error: function () {
            $("#mytodoList").empty();
            $("#mytodoList").append('<p class="f_p-error">No items found.</p>');
        }
    });
}

function CreateTodoList() {
    $("#mytodoList").html('');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/todos?assignto=' + localStorage.UserName + '&status=Pending&pageSize=5&startIndex=1',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            if (data.length == 0) {
                $("#mytodoList").append('<p class="f_p-error">No items found.</p>');
            }
            else {
                var datalenght = data.length;
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];
                    var sTodoTitle = item.TodoTitle;
                    var sRowKey = item.RowKey;
                    var sDuedate = moment(new Date(item.TodoDate)).format('Do MMM YYYY');


                    var article = '<li>';

                    article += '<p><a href="/Activity/TodoDetails?TodoID=' + sRowKey + '">' + sTodoTitle + '</a>';


                    if (sDuedate == "" || sDuedate == null) {
                        article += '</p></li>';
                    }
                    else {
                        article += '<small class="to-do-task-small">' + sDuedate + '</small></p></li>';
                    }


                    $("#mytodoList").append(article);

                }
            }
        },
        error: function () {
            $("#mytodoList").append('<p class="f_p-error">No items found.</p>');
        }
    });
}

var calenderFromDate = moment((moment().month() + 1) + '/1/' + moment().year()).format('MM/DD/YYYY');
var calenderToDate = moment(calenderFromDate).add(1, 'M').subtract(1, 'd').format('MM/DD/YYYY');
function CreateCalender(nextprevclick) {
    $("#fullcal").replaceWith('<div id="fullcal"></div>');
    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = localStorage.GlobalBusinessAreaLocation;
    }
    var today = new Date();

    //Vinod
    var exec_start = moment(new Date()).format('LL');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Reports/calendermonthly?businessarealocation=' + baname + '&assignto=' + localStorage.UserName
            + '&calenderfromdate=' + calenderFromDate + '&calendertodate=' + calenderToDate,
        type: 'GET',
        dataType: 'json',
        headers: {
            'eContracts-ApiKey': localStorage.APIKey, 'GlobalBusinessAreaLocation': baname, 'UserID': localStorage.UserID, 'UserName': localStorage.UserName
        },
        cache: false,
        success: function (data) {
            if (data.length == 0) {
                $("#fullcal").append('<p class="f_p-error">No items found.</p>');
            }
            else {
                $('div[id*=fullcal]').fullCalendar({

                    header: {
                        left: '',
                        center: 'title',
                        right: '',
                    },
                    eventLimit: 2,
                    aspectRatio: 1.95,
                    contentHeight: 510,
                    //defaultView:'month',
                    //fixedWeekCount :false,
                    firstDay: 1,
                    //firstWeek: 2,
                    weekMode: 'liquid',
                    editable: false,
                    height: 'auto',
                    disableDragging: false,
                    disableResizing: false,
                    displayEventTime: false,
                    time: false,
                    events: $.map(data, function (item, i) {
                        vTitle = item.ItemTitle + ' [' + item.ContractTitle + ']';
                        vSubTitle = vTitle;
                        if (vTitle.length > 41)
                        { vSubTitle = vTitle.substring(0, 40) + '...'; }
                        var event = new Object();
                        event.id = item.ItemID;
                        event.start = moment(new Date(item.ItemDate)).utc();
                        event.end = moment(new Date(item.ItemDate)).utc();
                        event.title = vSubTitle;
                        event.alttitle = vTitle;
                        event.url = 'javascript:void(0);';
                        event.ImageType = 0;
                        event.Type = item.ItemType;

                        //Vinod
                        if (moment(new Date(item.ItemDate)).format('LL') == exec_start) {
                            event.backgroundColor = '#9dc456';
                        }
                        else if (moment(new Date(item.ItemDate)).utc() < today) {
                            event.backgroundColor = '#cc6766';
                        }
                        else if (moment(new Date(item.ItemDate)).utc() > today) {
                            event.backgroundColor = '#f0ad4e';
                        }
                        return event;
                    }), eventRender: function (event, eventElement) {
                        if (event.ImageType) {
                            if (eventElement.find('span.fc-event-time').length) {
                                eventElement.find('span.fc-event-time').before($(GetImage(event.ImageType)));
                            } else {
                                eventElement.find('span.fc-event-title').before($(GetImage(event.ImageType)));
                            }
                        }
                        eventElement.attr('title', event.alttitle);
                        eventElement.attr('href', 'javascript:void(0);');
                        if (event.Type == "Obligation") {
                            eventElement.attr('onclick', 'ViewObligationDetail("' + event.id + '");');
                        }
                        else if (event.Type == "Contract") {
                            eventElement.attr('onclick', 'viewRenewalDetailsNew("' + event.id + '");');
                        }
                        else {
                            eventElement.attr('onclick', 'ViewMilestoneDetail("' + event.id + '");');
                        }
                    },
                    loading: function (bool) {
                        if (bool) $('#loading').show();
                        else {
                            $('#loading').hide();
                        }
                    }
                });
                $('#loading').hide();
                $('div[id*=fullcal]').show();


                $('#fullcal div.fc-right').html('<div class="fc-button-group">' +
                    '<button type="button" class="fc-prev-button fc-button fc-state-default fc-corner-left" onclick="ShowCalendarPrev()">' +
                    '<span class="fc-icon fc-icon-left-single-arrow"></span></button>' +
                    '<button type="button" class="fc-next-button fc-button fc-state-default fc-corner-right" onclick="ShowCalendarNext()">' +
                    '<span class="fc-icon fc-icon-right-single-arrow"></span></button></div>');
                if (typeof nextprevclick != 'undefined' && nextprevclick != null)
                    $('#fullcal').fullCalendar('gotoDate', calenderFromDate);
            }
        },
        error: function () {
            $("#fullcal").empty();
            $("#fullcal").append('<p class="f_p-error">No items found.</p>');
        }
    });
}

function ShowCalendarNext() {
    calenderFromDate = moment(calenderFromDate).add(1, 'M').format('MM/DD/YYYY');
    calenderToDate = moment(calenderFromDate).add(1, 'M').subtract(1, 'd').format('MM/DD/YYYY');
    CreateCalender('next');
}

function ShowCalendarPrev() {
    calenderFromDate = moment(calenderFromDate).subtract(1, 'M').format('MM/DD/YYYY');
    calenderToDate = moment(calenderFromDate).add(1, 'M').subtract(1, 'd').format('MM/DD/YYYY');
    CreateCalender('prev');
}

function CreateObligationList() {
    var today = new Date();
    var exec_start = moment(new Date());
    $("#milestoneList").empty();
    $("#milestoneList").append('<img src="../Content/Images/icon/loading.gif" style="height: 16px; width: 16px;">');

    $.ajax({

        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Obligations',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'GlobalBusinessAreaLocation': localStorage.GlobalBusinessAreaLocation },
        cache: false,
        success: function (data) {

            $('div[id*=fullcal]').fullCalendar({

                header: {
                    left: '',
                    center: 'title',
                    right: 'prev,next'
                },
                aspectRatio: 1.95,
                contentHeight: 400,
                firstDay: 1,
                firstWeek: 2,
                weekMode: 'variable',
                editable: false,
                disableDragging: false,
                disableResizing: false,
                displayEventTime: false,
                time: false,
                events: $.map(data, function (item, i) {
                    vTitle = item.ObligationTitle + ' [' + item.ContractTitle + ']';
                    vSubTitle = vTitle;
                    if (vTitle.length > 41)
                    { vSubTitle = vTitle.substring(0, 40) + '...'; }
                    var event = new Object();
                    event.id = item.RowKey;
                    event.start = new Date(item.DueDate);
                    event.end = new Date(item.DueDate);
                    event.title = vSubTitle;
                    event.alttitle = vTitle;
                    event.url = 'javascript:void(0);';
                    event.ImageType = 0;
                    if (new Date(item.DueDate).setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)) {
                        event.backgroundColor = '#9dc456';
                    }
                    else if (new Date(item.DueDate) < today) {
                        event.backgroundColor = '#cc6766';
                    }
                    else if (new Date(item.DueDate) > today) {
                        event.backgroundColor = '#f0ad4e';
                    }
                    return event;
                }), eventRender: function (event, eventElement) {
                    if (event.ImageType) {
                        if (eventElement.find('span.fc-event-time').length) {
                            eventElement.find('span.fc-event-time').before($(GetImage(event.ImageType)));
                        } else {
                            eventElement.find('span.fc-event-title').before($(GetImage(event.ImageType)));
                        }
                    }
                    eventElement.attr('title', event.alttitle);
                    eventElement.attr('href', 'javascript:void(0);');

                },
                loading: function (bool) {
                    if (bool) $('#loading').show();
                    else {
                        $('#loading').hide();
                    }
                }
            });
            $('#loading').hide();
            $('div[id*=fullcal]').show();
        },
        error: function () {

        }
    });
}

function GetImage(type) {
    if (type == 0) {
        return "<br/><img src = '/Content/Images/attendance.png' style='width:24px;height:24px'/><br/>"
    }
    else if (type == 1) {
        return "<br/><img src = '/Content/Images/not_available.png' style='width:24px;height:24px'/><br/>"
    }
    else
        return "<br/><img src = '/Content/Images/not_available.png' style='width:24px;height:24px'/><br/>"
}

function CreateWorkflowList() {
    var baname = "";
    if (typeof localStorage.GlobalBusinessAreaLocation != "undefined" && localStorage.GlobalBusinessAreaLocation != "" && localStorage.GlobalBusinessAreaLocation != "All") {
        baname = localStorage.GlobalBusinessAreaLocation;
    }
    var exec_start = moment(new Date());
    $("#workflowList").empty();
    $("#workflowList").append('<img src="../Content/Images/icon/loading.gif" style="height: 16px; width: 16px;">');

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Workflow?businessarealocation=' + baname + '&initiator=' + localStorage.UserName + '&status=In Progress&pageSize=&startIndex=',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'GlobalBusinessAreaLocation': baname },
        cache: false,
        success: function (data) {
            var iCount = 0;
            if (typeof data != 'undefined')//NoContent HttpStatusCode Update
                iCount = data.length;
            $("#aWorkflowsCount").html('&nbsp;(' + iCount + ')');
            $("#aWorkflowsCount_Mob").html('&nbsp;(' + iCount + ')');
            if (iCount == 0) {
                $("#workflowList").empty();
                $("#workflowList").append('<p class="f_p-error">No items found.</p>');
            }
            else {
                var article = '';
                var viewall = '';
                if (iCount > 8) {
                    iCount = 8;
                    viewall += '<li>';
                    viewall += '<a href="/Activity/Activity?View=Workflows" class="linkText">View All</a>';
                    viewall += '</li>';
                }
                for (var i = 0; i < iCount; i++) {
                    var item = data[i];
                    var sWorkflowTitle = item.WorkflowTitle;
                    var sRowKey = item.RowKey;
                    var sStartDate = moment(new Date(item.StartDate)).format('Do MMM, h:mm A');
                    var vParticipants = item.Participants;
                    //Vinod
                    if (item.Participants.length > 37) {
                        var participants = vParticipants;
                    } else {
                        var participants = "Participants";
                    }
                    var formatstartDate;
                    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                    { formatstartDate = moment(new Date(item.StartDate)).format('MM/DD/YYYY'); }
                    else { formatstartDate = moment(new Date(item.StartDate)).format(localStorage.AppDateFormat); }
                    if (vParticipants == "") vParticipants = "NA";
                    article += '<li  class="alertbox_bor_btm">';    //Added from 2.4final to 2.4
                    //Vinod
                    article += '<p class="width80"><a class="dotdotdotForMoreSpace" href="/Activity/TaskDetails?TaskID=&WorkflowID=' + sRowKey + '" title="' + sWorkflowTitle + '">' + sWorkflowTitle + '</a>';
                    //if (item.Object == "Documents") {
                    //    //Vinod
                    //    article += '<small class="to-do-task-small dotdotdotForMoreSpace" title="Contract" id="WC_' + item.ParObjectID + '"></small>';
                    //    ShowContractTitle(item.ParObjectID);
                    //}
                    //Vinod
                    article += '<small class="to-do-task-small dotdotdotForMoreSpace" title="' + participants + '">' + vParticipants + '</small></p>';

                    if (item.StartDate != "" && item.StartDate != null) {
                        article += '<small class="alertbox_right_text" title="Start Date" style="margin:3px 0px 0px;">' + formatstartDate + "</small>";
                    }
                    article += '</li>';

                }
                article += viewall;
                $("#workflowList").empty();
                $("#workflowList").append(article);

            }
        },
        error: function () {
            $("#workflowList").empty();
            $("#workflowList").append('<p class="f_p-error">No items found.</p>');
        }
    });
}

function ShowContractTitle(contractid) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + contractid,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        "Content-Type": "application/json",
        cache: false,
        success: function (item) {
            $("#WC_" + contractid).addClass("PreserveSpace");
            $("#WC_" + contractid).html(item.ContractTitle);
        }
    });
}

function ViewMilestoneDetail(milestoneID) {
    $("#tblMetadataDetail").empty();
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones?milestoneid=' + milestoneID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        "Content-Type": "application/json",
        cache: false,
        success: function (milestoneentity) {
            BindNewContractDetails(milestoneentity.ContractID);
            var vDueDate;
            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
            { vDueDate = moment(new Date(milestoneentity.MilestoneDate)).utc().format('MM/DD/YYYY'); }
            else { vDueDate = moment(new Date(milestoneentity.MilestoneDate)).utc().format(localStorage.AppDateFormat); }
            //if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
            //{ vDueDate = milestoneentity.MilestoneDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
            //else {
            //    if (localStorage.AppDateFormat == 'DD/MM/YYYY') { vDueDate = milestoneentity.MilestoneDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1'); }
            //    else if (localStorage.AppDateFormat == 'MM/DD/YYYY') { vDueDate = milestoneentity.MilestoneDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
            //}

            //Vinod
            var vMetadata = '<ul class="pOp_Cont Milestone">';
            vMetadata += '<li><p>Contract Record Title</p><span style="max-width: 500px;display: block;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;"><a class="doted290px" href="/Contracts/ContractDetails?ContractID=' + milestoneentity.ContractID + '" target="_blank" style="color: #44a6d8;" title="' + milestoneentity.ContractTitle + '">' + milestoneentity.ContractTitle + '<img src="/Content/Images/external_link.png" id="newTabImage"></a></span></li>';
            vMetadata += '<li id="milestoneTitle"><p>Milestone Title</p><span>' + milestoneentity.MilestoneTitle + '</span></li>';
            //vMetadata += '<li id="milestoneTitle"><p>Milestone Title</p><span style="max-width: 500px;display: block;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;"><a href="/Contracts/ContractDetails?ContractID=' + contractItem.RowKey + '" target="_blank" "="" style="color: #44a6d8;display: inline-flex;" title="' + milestoneentity.MilestoneTitle + '">' + milestoneentity.MilestoneTitle + '<img src="/Content/Images/external_link.png" id="newTabImage"></a></span></li>';
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
                var completedate;

                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                { completedate = milestoneentity.MilestoneCompletedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                else {
                    if (localStorage.AppDateFormat == 'DD/MM/YYYY') { completedate = milestoneentity.MilestoneCompletedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1'); }
                    else if (localStorage.AppDateFormat == 'MM/DD/YYYY') { completedate = milestoneentity.MilestoneCompletedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                }
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

            //if (milestoneentity.ContractID != '') {
            //    vMetadata += '<li><br><p><a href="/Contracts/ContractDetails?ContractID=' + milestoneentity.ContractID + '" class="PreserveSpace" style="color: #44A6D8;text-decoration: underline !important">View Contract Details</a></p></li>';
            //}
            vMetadata += '</ul>';
            var permissionsAll = newContractItem.ContractManagers + ";" + newContractItem.Approvers + ";" + newContractItem.Reviewers + ";" + newContractItem.Signees
                + ";" + newContractItem.BusinessAreaOwners + ";" + newContractItem.ReadWritePermissions + ";" + newContractItem.FullControlPermissions + ";" + newContractItem.ProjectManager;
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

            var status = getContractStatus(milestoneentity.ContractID);
            var statusArr = ["Replaced", "Expired", "Cancelled", "Archived"];
            $("#loadingPage").fadeOut();
            if (msOwners != "" && msOwners != null && msOwners.indexOf(localStorage.UserName) > -1 && milestoneentity.MilestoneCompleted != "Yes"
                && milestoneentity.AutoComplete != "Yes" && jQuery.inArray(status, statusArr) == -1 && permissions.toArray().indexOf(localStorage.UserName) > -1) {
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

function ViewObligationDetail(obligationID) {
    $("#loadingPage").fadeIn();
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
            BindNewContractDetails(obligationentity.ContractID);
            var vOblDueDate;
            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
            { vOblDueDate = moment(new Date(obligationentity.DueDate)).utc().format('MM/DD/YYYY'); }
            else { vOblDueDate = moment(new Date(obligationentity.DueDate)).utc().format(localStorage.AppDateFormat); }

            var vMetadata = '<ul class="pOp_Cont Obligation">';

            //Vinod
            vMetadata += '<li><p>Contract Record Title</p><span style="max-width: 500px;display: block;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;"><a class="doted290px" href="/Contracts/ContractDetails?ContractID=' + obligationentity.ContractID + '" target="_blank" "="" style="color: #44a6d8;" title="' + obligationentity.ContractTitle + '">' + obligationentity.ContractTitle + '<img src="/Content/Images/external_link.png" id="newTabImage"></a></span></li>';
            vMetadata += '<li id="obligationTitle"><p>Obligation Title</p><span class="PreserveSpace">' + obligationentity.ObligationTitle + '</span></li>';
            //vMetadata += '<li id="obligationTitle"><p>Obligation Title</p><span style="max-width: 500px;display: block;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;"><a href="/Contracts/ContractDetails?ContractID=' + contractItem.RowKey + '" target="_blank" "="" style="color: #44a6d8;display: inline-flex;" title="' + contractItem.ContractTitle + '">' + obligationentity.ObligationTitle + '<img src="/Content/Images/external_link.png" id="newTabImage"></a></span></li>';
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
            //if (obligationentity.ContractID != '') {
            //    vMetadata += '<tr></tr><tr><td><a href="/Contracts/ContractDetails?ContractID=' + obligationentity.ContractID + '" class="PreserveSpace" style="color: #44A6D8;text-decoration: underline !important">View Contract Details</td></tr>';
            //}

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
            var status = getContractStatus(obligationentity.ContractID);
            var statusArr = ["Replaced", "Expired", "Cancelled", "Archived"];
            $("#loadingPage").fadeOut();
            if (ogOwners != "" && ogOwners != null && ogOwners.indexOf(localStorage.UserName) > -1 && obligationentity.ObligationMet != "Yes" && obligationentity.AutoComplete != "Yes" &&
                obligationentity.ObligationStatus != "Cancelled" && jQuery.inArray(status, statusArr) == -1 && permissions.toArray().indexOf(localStorage.UserName) > -1) {
                $("#tblMetadataDetailForOwner").empty();
                $("#tblMetadataDetailForOwner").append(vMetadata);
                $("#btnMarkComplete span").attr('style', 'background-color: transparent; color: #3177b5;font-size: 14px;border: 1px solid #3177b5 !important;');
                $("#btnViewContract span").attr('style', 'font-size: 14px;');
                $("#viewMetadataDetailForOwner").dialog("option", "title", "View Obligation");
                $("#viewMetadataDetailForOwner").dialog("open");
            }
            else {
                $("#tblMetadataDetail").empty();
                $("#tblMetadataDetail").append(vMetadata);
                $("#viewMetadataDetail").dialog("option", "title", "View Obligation");
                $("#viewMetadataDetail").dialog("open");
            }

        },
        error: function (status) {
            $("#loadingPage").fadeOut();
        }
    });
}

function checkMilestone(cb) {
    var MilestoneID = cb.id
    $.ajax({
        async: false,
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones?milestoneid=' + MilestoneID + '&acheived=Yes',
        type: "PUT",
        dataType: "json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        "Content-Type": "application/json",
    }).done(function (data) {
        swal("", "Milestone Acheived");
        CreateMilestoneList();
    }).fail(function (data) {
        swal("", data.status + ": " + data.statusText);
    });
}

function ShowTodos() {
    $("#mytodoList").css("display", "block");
    $("#workflowList").css("display", "none");
    $("#milestoneList").css("display", "none");

    $("#aMilestones").removeClass("act");
    $("#aWorkflows").removeClass("act");
    $("#aTodos").addClass("act");

    $("#aMilestones_Mob").removeClass("act");
    $("#aWorkflows_Mob").removeClass("act");
    $("#aTodos_Mob").addClass("act");
}

function ShowMilestones() {
    $("#aTodos").removeClass("act");
    $("#aWorkflows").removeClass("act");
    $("#aMilestones").addClass("act");

    $("#aTodos_Mob").removeClass("act");
    $("#aWorkflows_Mob").removeClass("act");
    $("#aMilestones_Mob").addClass("act");

    $("#mytodoList").css("display", "none");
    $("#workflowList").css("display", "none");
    $("#milestoneList").css("display", "block");
}

function ShowWorkflows() {
    $("#aTodos").removeClass("act");
    $("#aWorkflows").addClass("act");
    $("#aMilestones").removeClass("act");

    $("#aTodos_Mob").removeClass("act");
    $("#aWorkflows_Mob").addClass("act");
    $("#aMilestones_Mob").removeClass("act");

    $("#mytodoList").css("display", "none");
    $("#workflowList").css("display", "block");
    $("#milestoneList").css("display", "none");
}

function ShowContractsSummaryInNumber() {
    $("#aContractsSummaryInNumber").addClass("act");
    $("#aContractsSummaryInPercentage").removeClass("act");

    $("#aContractsSummaryInNumber_Mob").addClass("act");
    $("#aContractsSummaryInPercentage_Mob").removeClass("act");


    if (vContractsSummary != "") {
        var sPipeline = $(vContractsSummary).find('Pipeline').text();
        if (sPipeline == "") { sPipeline = "0"; }
        var sPipelinePercentage = $(vContractsSummary).find('PipelinePercentage').text();
        if (sPipelinePercentage == "") { sPipelinePercentage = "0"; }
        var sSignature = $(vContractsSummary).find('Signature').text();
        if (sSignature == "") { sSignature = "0"; }
        var sSignaturePercentage = $(vContractsSummary).find('SignaturePercentage').text();
        if (sSignaturePercentage == "") { sSignaturePercentage = "0"; }
        var sActive = $(vContractsSummary).find('Active').text();
        if (sActive == "") { sActive = "0"; }
        var sActivePercentage = $(vContractsSummary).find('ActivePercentage').text();
        if (sActivePercentage == "") { sActivePercentage = "0"; }
        var sPast = $(vContractsSummary).find('Past').text();
        if (sPast == "") { sPast = "0"; }
        var sPastPercentage = $(vContractsSummary).find('PastPercentage').text();
        if (sPastPercentage == "") { sPastPercentage = "0"; }
        var sTotal = $(vContractsSummary).find('Total').text();
        if (sTotal == "") { sTotal = "0"; }

        $("#dvDashboardSummary").empty();

        var article = '';
        var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
        var vAccFeat = $.grep(veContractFeatures, function (n, i) {
            return (n.RowKey == "16" && n.Status == "ON");
        });
        if (vAccFeat.length > 0) {
            article += '<div class="ctdivLeft width20">';
            article += '<div id="myDashboardSummary1" data-startdegree="90" data-textwidth="100%" data-textmargin="58px 0px 0px 0px" data-classname="small_circle" data-redirectto="Pipeline?View=All" data-dimension="100" data-text="' + sPipeline + '" data-info="Pipeline" data-width="5" data-fontsize="18" data-percent="' + sPipelinePercentage + '" data-fgcolor="' + vColor[0] + '" data-bgcolor="#eee"></div>';
            article += '</div>';
        }
        article += '<div class="ctdivLeft width20">';
        article += '<div id="myDashboardSummary2" data-startdegree="90" data-textwidth="100%" data-textmargin="58px 0px 0px 0px" data-classname="small_circle" data-redirectto="Contracts?View=Signed"  data-dimension="100" data-text="' + sSignature + '" data-info="Signature" data-width="5" data-fontsize="18" data-percent="' + sSignaturePercentage + '" data-fgcolor="' + vColor[1] + '" data-bgcolor="#eee"></div>';
        article += '</div>';
        article += '<div class="ctdivLeft width20">';
        article += '<div id="myDashboardSummary3" data-startdegree="90" data-textwidth="100%" data-textmargin="58px 0px 0px 0px" data-classname="small_circle" data-redirectto="Contracts?View=Active"  data-dimension="100" data-text="' + sActive + '" data-info="Active" data-width="5" data-fontsize="18" data-percent="' + sActivePercentage + '" data-fgcolor="' + vColor[2] + '" data-bgcolor="#eee"></div>';
        article += '</div>';
        article += '<div class="ctdivLeft width20">';
        article += '<div id="myDashboardSummary4" data-startdegree="90" data-textwidth="100%" data-textmargin="58px 0px 0px 0px" data-classname="small_circle" data-redirectto="Contracts?View=Past Contracts"  data-dimension="100" data-text="' + sPast + '" data-info="Past" data-width="5" data-fontsize="18" data-percent="' + sPastPercentage + '" data-fgcolor="' + vColor[3] + '" data-bgcolor="#eee"></div>';
        article += '</div>';
        article += '<div class="ctdivLeft width20">';
        article += '<div id="myDashboardSummary5" data-startdegree="90" data-textwidth="100%" data-textmargin="58px 0px 0px 0px" data-classname="small_circle"  data-dimension="100" data-text="' + sTotal + '" data-info="Total" data-width="5" data-fontsize="18" data-percent="100" data-fgcolor="' + vColor[4] + '" data-bgcolor="#eee"></div>';
        article += '</div>';
        $("#dvDashboardSummary").append(article);

        $('#myDashboardSummary1').circliful();
        $('#myDashboardSummary2').circliful();
        $('#myDashboardSummary3').circliful();
        $('#myDashboardSummary4').circliful();
        $('#myDashboardSummary5').circliful();
    }
}

function ShowContractsSummaryInPercentage() {
    $("#aContractsSummaryInNumber").removeClass("act");
    $("#aContractsSummaryInPercentage").addClass("act");

    $("#aContractsSummaryInNumber_Mob").removeClass("act");
    $("#aContractsSummaryInPercentage_Mob").addClass("act");

    if (vContractsSummary != "") {
        var sPipeline = $(vContractsSummary).find('Pipeline').text();
        if (sPipeline == "") { sPipeline = "0"; }
        var sPipelinePercentage = $(vContractsSummary).find('PipelinePercentage').text();
        if (sPipelinePercentage == "") { sPipelinePercentage = "0"; }
        var sSignature = $(vContractsSummary).find('Signature').text();
        if (sSignature == "") { sSignature = "0"; }
        var sSignaturePercentage = $(vContractsSummary).find('SignaturePercentage').text();
        if (sSignaturePercentage == "") { sSignaturePercentage = "0"; }
        var sActive = $(vContractsSummary).find('Active').text();
        if (sActive == "") { sActive = "0"; }
        var sActivePercentage = $(vContractsSummary).find('ActivePercentage').text();
        if (sActivePercentage == "") { sActivePercentage = "0"; }
        var sPast = $(vContractsSummary).find('Past').text();
        if (sPast == "") { sPast = "0"; }
        var sPastPercentage = $(vContractsSummary).find('PastPercentage').text();
        if (sPastPercentage == "") { sPastPercentage = "0"; }
        var sTotal = $(vContractsSummary).find('Total').text();
        if (sTotal == "") { sTotal = "0"; }

        $("#dvDashboardSummary").empty();

        var article = '';
        var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
        var vAccFeat = $.grep(veContractFeatures, function (n, i) {
            return (n.RowKey == "16" && n.Status == "ON");
        });
        if (vAccFeat.length > 0) {
            article += '<div class="ctdivLeft width24">';
            article += '<div id="myDashboardSummary1" data-startdegree="90" data-dimension="100" data-text="' + sPipelinePercentage + '%" data-classname="small_circle" data-redirectto="Pipeline?View=All" data-info="Pipeline" data-width="5" data-fontsize="18" data-percent="' + sPipelinePercentage + '" data-fgcolor="' + vColor[0] + '" data-bgcolor="#eee"></div>';
            article += '</div>';
        }
        article += '<div class="ctdivLeft width24">';
        article += '<div id="myDashboardSummary2" data-startdegree="90" data-dimension="100" data-text="' + sSignaturePercentage + '%" data-classname="small_circle" data-redirectto="Contracts?View=Signed" data-info="Signature" data-width="5" data-fontsize="18" data-percent="' + sSignaturePercentage + '" data-fgcolor="' + vColor[1] + '" data-bgcolor="#eee"></div>';
        article += '</div>';
        article += '<div class="ctdivLeft width24">';
        article += '<div id="myDashboardSummary3" data-startdegree="90" data-dimension="100" data-text="' + sActivePercentage + '%" data-classname="small_circle" data-redirectto="Contracts?View=Active" data-info="Active" data-width="5" data-fontsize="18" data-percent="' + sActivePercentage + '" data-fgcolor="' + vColor[2] + '" data-bgcolor="#eee"></div>';
        article += '</div>';
        article += '<div class="ctdivLeft width24">';
        article += '<div id="myDashboardSummary4" data-startdegree="90" data-dimension="100" data-text="' + sPastPercentage + '%" data-classname="small_circle" data-redirectto="Contracts?View=Past Contracts" data-info="Past" data-width="5" data-fontsize="18" data-percent="' + sPastPercentage + '" data-fgcolor="' + vColor[3] + '" data-bgcolor="#eee"></div>';
        article += '</div>';
        $("#dvDashboardSummary").append(article);

        $('#myDashboardSummary1').circliful();
        $('#myDashboardSummary2').circliful();
        $('#myDashboardSummary3').circliful();
        $('#myDashboardSummary4').circliful();
    }
}

function ShowContractsRecent() {
    $("#ContractsRecentList").css("display", "block");
    $("#ContractsUpcomingRenewalsList").css("display", "none");
    $("#ContractsAboutToExpireList").css("display", "none");

    $("#aAboutToExpire").removeClass("act");
    $("#aUpcomingRenewals").removeClass("act");
    $("#aRecent").addClass("act");

    $("#aAboutToExpire_Mob").removeClass("act");
    $("#aUpcomingRenewals_Mob").removeClass("act");
    $("#aRecent_Mob").addClass("act");
}

function ShowContractsUpcomingRenewals() {
    $("#ContractsRecentList").css("display", "none");
    $("#ContractsUpcomingRenewalsList").css("display", "block");
    $("#ContractsAboutToExpireList").css("display", "none");

    $("#aAboutToExpire").removeClass("act");
    $("#aUpcomingRenewals").addClass("act");
    $("#aRecent").removeClass("act");

    $("#aAboutToExpire_Mob").removeClass("act");
    $("#aUpcomingRenewals_Mob").addClass("act");
    $("#aRecent_Mob").removeClass("act");
}

function ShowContractsAboutToExpire() {
    $("#ContractsRecentList").css("display", "none");
    $("#ContractsUpcomingRenewalsList").css("display", "none");
    $("#ContractsAboutToExpireList").css("display", "block");

    $("#aAboutToExpire").addClass("act");
    $("#aUpcomingRenewals").removeClass("act");
    $("#aRecent").removeClass("act");

    $("#aAboutToExpire_Mob").addClass("act");
    $("#aUpcomingRenewals_Mob").removeClass("act");
    $("#aRecent_Mob").removeClass("act");
}

function ShowContracts() {

    $("#contractsList").css("display", "block");
    $("#documentsList").css("display", "none");

    $("#aDocuments").removeClass("act");
    $("#aContracts").addClass("act");

    $("#aDocuments_Mob").removeClass("act");
    $("#aContracts_Mob").addClass("act");

}

function ShowDocuments() {

    $("#contractsList").css("display", "none");
    $("#documentsList").css("display", "block");

    $("#aContracts").removeClass("act");
    $("#aDocuments").addClass("act");

    $("#aDocuments_Mob").addClass("act");
    $("#aContracts_Mob").removeClass("act");


}

function ViewContractDetail(contractID) {
    $('#tblSummary').css("display", "");
    $('#tblDetailsMetadata').css("display", "none");

    $('#tblDetailsMetadata').empty();
    $("#Summary").addClass('pop_up_Harizondal_meta_active');
    $("#Details").removeClass('pop_up_Harizondal_meta_active');
    if ($('#tblDetailsMetadata tr').length == 0) {
        BindContractDetails(contractID);

    }
    else {
        $('#dialogSummary').dialog('open');
    }
}

function BindMetadataDetail(contrcatItem, _ContractID) {
    $("#tdSumContractTitle").html(contrcatItem.ContractTitle);
    $("#tdSumContractNumber").html(contrcatItem.ContractNumber);
    $("#tdSumContractType").html(contrcatItem.ContractType);
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/IContractDetails?contractid=' + _ContractID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (mainmetadataFields) {
            var vMetadata = $(mainmetadataFields).find('Metadata');
            var vMetadataHTML = vMetadata[0].innerHTML;
            //$("#DetailsContractRecLink").attr("href", "/Contracts/ContractDetails?ContractID=" + _ContractID + "")
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracttypes/metadatas?contracttypename=' + encodeURIComponent(contrcatItem.ContractType),
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
                                vv = vv.split(' ')[0];
                                var onlydate = "";
                                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                                    moment(new Date(vv)).format('MM/DD/YYYY');//onlydate = vv.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                                }
                                else {
                                    //if (localStorage.AppDateFormat == 'DD/MM/YYYY') { onlydate = vv.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1'); }
                                    //else if (localStorage.AppDateFormat == 'MM/DD/YYYY') { onlydate = vv.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                                    onlydate = moment(new Date(vv)).format(localStorage.AppDateFormat);
                                }

                                if (vv != null && vv != "") {
                                    vControls += '<td class="labelleft">' + onlydate + '</td>';
                                }
                            } else if (item.FieldName == "ContractValue" || item.FieldType == "Currency") {
                                vControls += '<td class="labelleft">' + $(vMetadata).find(item.FieldName).text() + '</td>';
                                vCurrency = item.FieldName;
                            }
                            else {
                                vControls += '<td class="labelleft">' + $(vMetadata).find(item.FieldName).text() + '</td>';
                            }

                            vControls += '</tr>';
                            vControls += '<tr style="display:none;" id="contractID"><td class="f_head">ContractID</td><td class="f_head">' + _ContractID + '</td></tr>';
                            vMetadataHTML = vMetadataHTML.replace("<" + item.FieldName + ">" + $(vMetadata).find(item.FieldName).text() + "</" + item.FieldName + ">", "");
                            $("#tblSummaryMetadata").append(vControls);

                            if (vCurrency != "") {
                                if ($.isNumeric($('#' + vCurrency).html())) {
                                    if (vCurrencyDisplayStyle == "UK") {
                                        $('#' + vCurrency).autoNumeric();
                                    } else if (vCurrencyDisplayStyle == "CAN") {
                                        $('#' + vCurrency).autoNumeric({ aSep: ' ', aDec: '.' });
                                    } else if (vCurrencyDisplayStyle == "EU") {
                                        $('#' + vCurrency).autoNumeric({ aSep: '.', aDec: ',' });
                                    } else if (vCurrencyDisplayStyle == "IND") {
                                        $('#' + vCurrency).autoNumeric({ dGroup: '2', });
                                    }
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
                                //if ((name != "CONTRACTTITLE") && (name != "CONTRACTNUMBER") && (name != "CONTRACTTYPE") && (name != "STATUSCHANGEDALERT")
                                //    && (name != "NEEDAPPROVALFORAMENDMENT") && (name != "NEEDAPPROVALFOREXTENSION") && (name != "NEEDAPPROVALFORRENEWAL")) {
                                //    var vField = $.grep(vContractFields, function (person) { return person.FieldName.toUpperCase() == name });
                                //    var value = item.textContent;
                                //    if (vField.length > 0) {
                                //        var vControls = '<tr>';
                                //        if (vField[0].FieldDisplayName == "Contract Managers") {
                                //            vControls += '<td class="f_head">Contract Owner(s)</td>';
                                //        } else {
                                //            vControls += '<td class="f_head">' + vField[0].FieldDisplayName + '</td>';
                                //        }
                                //        if (value == '' || value == '0') {
                                //            vControls += '<td class="labelleft">-</td>';
                                //        }
                                //        else {

                                //            if (vField[0].FieldType == "Date") {
                                //                value = value.split(' ')[0];
                                //                var onlydate = "";
                                //                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                                //                { onlydate = moment(new Date(value)).format('MM/DD/YYYY'); }
                                //                else { onlydate = moment(new Date(value)).format(localStorage.AppDateFormat); }

                                //                vControls += '<td class="labelleft">' + onlydate + '</td>';

                                //            } else {

                                //                if (vField[0].FieldName == "ContractValue" || item.FieldType == "Currency") {
                                //                    vControls += '<td class="labelleft" id=' + vField[0].FieldName + '>' + value + '</td>';
                                //                    vCurrency = vField[0].FieldName;
                                //                } else {
                                //                    vControls += '<td class="labelleft">' + value + '</td>';
                                //                }
                                //            }
                                //        }
                                //        vControls += '</tr>';

                                //        $("#tblDetailsMetadata").append(vControls);

                                //        if (vCurrency != "") {
                                //            if (vCurrencyDisplayStyle == "1,234,567.89 (United Kingdom, United States, Hong Kong, Australia)") {
                                //                $('#' + vCurrency).autoNumeric();
                                //            } else if (vCurrencyDisplayStyle == "1 234 567.89 (Canada, China)") {
                                //                $('#' + vCurrency).autoNumeric({ aSep: ' ', aDec: '.' });
                                //            } else if (vCurrencyDisplayStyle == "1.234.567,89 (Most of EU)") {
                                //                $('#' + vCurrency).autoNumeric({ aSep: '.', aDec: ',' });
                                //            }
                                //            vCurrency == "";
                                //        }
                                //    }
                                //}


                                if ((name == "APPROVEDBY") || (name == "CONTRACTNUMBER") || (name == "CONTRACTMANAGERS") || (name == "CONTRACTTERMTYPE")
                                  || (name == "CONTRACTVALUE") || (name == "COUNTERPARTY") || (name == "CUSTOMPERMISSION")
                                  || (name == "DESCRIPTION") || (name == "STARTDATE") || (name == "ENDDATE") || (name == "EXTERNALSIGNEES") || (name == "ORIGINATINGPARTY")
                                  || (name == "PROJECT") || (name == "RELATEDCONTRACT") || (name == "TERMENDDATE") || (name == "REVIEWEDBY") || (name == "RENEWALDATE")
                                  || (name == "COMPANYPROFILE") || (name == "SIGNEES") || (name == "RELATEDCONTRACTS") || (name == "RELATEDREQUESTS")) {
                                    // if transation type is general agreement do not show contract value in metadata
                                    if ($("#hdnTransactionType").text() == "Legal/General Agreement" && name == "CONTRACTVALUE") {
                                    } else {
                                        var vField = $.grep(vContractFields, function (person) { return person.FieldName.toUpperCase() == name });
                                        var value = item.textContent;
                                        if (vField.length > 0) {
                                            var vControls = '<tr>';
                                            if (vField[0].FieldDisplayName == "Contract Managers") {
                                                vControls += '<td class="f_head width40">Contract Owner(s)</td>';
                                            }
                                            else if (vField[0].FieldDisplayName.trim().toLowerCase().indexOf("related contract (s)") >= 0) {
                                                vControls += '<td class="f_head width60">Related Contract Record(s)</td>';
                                            }
                                            else {
                                                vControls += '<td class="f_head width90">' + vField[0].FieldDisplayName + '</td>';
                                            }
                                            //else if (vField[0].FieldName == "ContractValue" || item.FieldType == "Currency") {
                                            //    vControls += '<td class="f_head width40">Contract Value(Actual)</td>';
                                            // }

                                            if (value == '' || value == '0') {
                                                if (vField[0].FieldName == "ContractValue" || item.FieldType == "Currency") {

                                                    var valuetoapply = (typeof value != "undefined" && value != null && value != "") ? value : "0.00"
                                                    vControls += '<td class="labelleft width60" style="word-break: break-all;"><label id="td' + vField[0].FieldName + '">' + valuetoapply + '</label> ' + $("#hdnContractCurrency").text() + '</td>';

                                                    vCurrency = 'td' + vField[0].FieldName;
                                                } else {
                                                    vControls += '<td class="labelleft width60" style="word-break: break-all;">-</td>';
                                                }
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
                                                    vControls += '<td class="labelleft width60" style="word-break: break-all;">' + onlydate + '</td>';
                                                }
                                                else {
                                                    if (vField[0].FieldName == "ContractValue" || item.FieldType == "Currency") {
                                                        //var strBaseContractValueCurr = "";
                                                        //strBaseContractValueCurr = $("#hdnContractCurrency").text();
                                                        //if (strBaseContractValueCurr == "") {
                                                        //    strBaseContractValueCurr = "Not Available";
                                                        //} else {
                                                        //    if (strBaseContractValueCurr.trim() == "") {
                                                        //        strBaseContractValueCurr = "Not Available";
                                                        //    }
                                                        //}
                                                        vControls += '<td class="labelleft width60" style="word-break: break-all;"><label id="td' + vField[0].FieldName + '">' + value + '</label> ' + $("#hdnContractCurrency").text() + '</td>';
                                                        vCurrency = 'td' + vField[0].FieldName;
                                                    } else {
                                                        //if (vField[0].FieldName == "ContractTermType") {
                                                        //    vControls += '<td class="labelleft width60" style="word-break: break-all;">' + TermTypeDisplayName[value] + '</td>';
                                                        //}
                                                        //else {
                                                        vControls += '<td class="labelleft width60" style="word-break: break-all;">' + value + '</td>';
                                                        // }

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
                            }
                            $("#loadingPage").fadeOut();
                            $('#dialogSummary').dialog('open');
                        },
                        error: function () {
                            $("#loadingPage").fadeOut();
                        }
                    });
                },
                error: function (err) {
                    $("#loadingPage").fadeOut();
                    $("#tblDetailsMetadata").append('<tr><td class="f_head" colspan="2">Metadata Not Available</td></tr>');
                    $('#dialogSummary').dialog('open');
                }
            });
        }
    });
}

function BindContractDetails(contractid) {
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + contractid,
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
        processData: false,
        success: function (item) {
            BindMetadataDetail(item, contractid);
        },
        error: function () {
            $("#loadingPage").fadeOut();
        }
    });
}

function BindContractTermDetail(item) {
    var vTermType = item.ContractTermType;
    var vContractTerm = '';
    var vContractTermEnd = '';
    if (vTermType == "Fixed Term") {
        var vFromDate = moment(new Date());
        var vToDate = null;
        var formatStartDate = null;
        var formatTermEndDate = null;
        if (contrcatItem.StartDate != null) {
            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
            { formatStartDate = moment(new Date(item.StartDate)).format('MM/DD/YYYY'); }
            else { formatStartDate = moment(new Date(item.StartDate)).format(localStorage.AppDateFormat); }
        }
        if (contrcatItem.StartDate != null) {
            vContractTerm += '<small class="contract_term_date" title="Start / Effective Date">Start: <small class="colour-blue">' + formatStartDate + '</small></small>';
        }
        else
            vContractTerm += '<small class="contract_term_date" title="Start / Effective Date">Start: NA</small>';

        if (contrcatItem.EndDate != null) {

            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
            { vToDate = moment(new Date(item.EndDate)).format('MM/DD/YYYY'); }
            else { vToDate = moment(new Date(item.EndDate)).format(localStorage.AppDateFormat); }
            vContractTerm += '&nbsp;&nbsp;-&nbsp;&nbsp;<small class="contract_term_date" title="End Date">End: <span style="color:#44A6D8;">' + vToDate + '</small></small>';
        }
        else
            vContractTerm += '<small class="contract_term_date" title="End Date">End: NA</small>';
        vContractTerm += '<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuTerm margin-left-5" />';

        if (vToDate != null)
            vContractTermEnd = '<img src="/Content/Images/Contract_Term.png"> Contract Ends in <small class="colour-blue">' + DiffBetDate(vFromDate, vToDate) + '</small>';
        if (vContractTermEnd == '')
            vContractTermEnd = '<small class="colour-blue">' + vTermType + '</small>';
        else
            vContractTermEnd += '; <small class="colour-blue">' + vTermType + '</small>';
    } else if (vTermType == "Evergreen / Perpetual") {
        if (contrcatItem.StartDate != null) {
            vContractTerm += '<small class="contract_term_date" title="Start / Effective Date">Start: <small class="colour-blue">' + formatStartDate + '</small></small>';
        }
        else
            vContractTerm += '<small class="contract_term_date" title="Start / Effective Date">Start: NA</small>';
        vContractTerm += '<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuTerm margin-left-5" />';

        if (vContractTermEnd == '')
            vContractTermEnd = '<small class="colour-blue">' + vTermType + '</small>';
        else
            vContractTermEnd += ' ; <small class="colour-blue">' + vTermType + '</small>';
    }
    else if (vTermType == "Executed / Performance") {
        if (contrcatItem.StartDate != null)
            vContractTerm += '<small class="contract_term_date" title="Date of Execution / Performance">Date of Execution: <small class="colour-blue">' + formatStartDate + '</small></small>';
        else
            vContractTerm += '<small class="contract_term_date" title="Start / Effective Date">Start: NA</small>';
        vContractTerm += '<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuTerm margin-left-5" />';

        if (vContractTermEnd == '')
            vContractTermEnd = '<small class="colour-blue">' + vTermType + '</small>';
        else
            vContractTermEnd += ' ; <small class="colour-blue">' + vTermType + '</small>';
    }
    else if (vTermType == "Renewable") {
        var vFromDate = moment(new Date());
        var vToDate = null;
        if (contrcatItem.StartDate != null) {
            vContractTerm += '<small class="contract_term_date" title="Start / Effective Date">Start: <small class="colour-blue">' + formatStartDate + '</small></small>';
        }
        else
            vContractTerm += '<small class="contract_term_date" title="Start / Effective Date">Start: NA</small>';

        if (contrcatItem.TermEndDate != null) {
            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
            { formatTermEndDate = moment(new Date(item.TermEndDate)).format('MM/DD/YYYY'); }
            else { formatTermEndDate = moment(new Date(item.TermEndDate)).format(localStorage.AppDateFormat); }
            vContractTerm += '&nbsp;&nbsp;-&nbsp;&nbsp;<small class="contract_term_date" title="End Date">Term End: <small class="colour-blue">' + formatTermEndDate + '</small></small>';
        }
        else
            vContractTerm += '<small class="contract_term_date" title="End Date">Term End: NA</small>';

        if (contrcatItem.RenewalDate != null)

            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
            { vToDate = moment(new Date(item.RenewalDate)).format('MM/DD/YYYY'); }
            else { vToDate = moment(new Date(item.RenewalDate)).format(localStorage.AppDateFormat); }
        vContractTerm += '<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuTerm margin-left-5" />';

        if (vToDate != null) {
            vContractTermEnd = '<img src="/Content/Images/Contract_Term.png"> Current Term Ends in <small class="colour-blue">' + DiffBetDate(vFromDate, vToDate) + '</small>';
        }
        if (vContractTermEnd == '')
            vContractTermEnd = '<small class="colour-blue">' + vTermType + '</small>';
        else
            vContractTermEnd += '; <small class="colour-blue">' + vTermType + '</small>';
    }
    else {
        vContractTerm += 'The Timelines & Dates for contract is not available. <a href="javascript:void(0)" class="linkText" onclick="contextMenuTerm(\'manage\',\'\',\'\');">Manage</a>';
    }
    $("#spContractTerm").html(vContractTerm);
    $("#spContractTermEnd").html(vContractTermEnd);

    $(".openmenuTerm").contextMenu({ menu: 'dropdownMenuTerm', leftButton: true }, function (action, el, pos) { contextMenuTerm(action, el.parent("div"), pos); });
}

function getcontracttypemetadata(strcontracttype) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracttypes/metadatas?contracttypename=' + encodeURIComponent(strcontracttype),
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (metadataFields) {
            var numberexists = false;
            $(metadataFields).each(function (i, item) {
                if (item.FieldName == "ContractNumber") {
                    numberexists = true;
                }
            });
            if (numberexists) {

                $("#trContractMetadataNumber").css('display', '')
            } else {
                $("#trContractMetadataNumber").css('display', 'none')
            }
        }
    });
}


function MetadataSummary() {

    //$("#Details").removeClass('pop_up__Acti');
    //$("#Summary").addClass('pop_up__Acti');
    $("#Summary").addClass('pop_up_Harizondal_meta_active');
    $("#Details").removeClass('pop_up_Harizondal_meta_active');
    $('#tblSummary').css("display", "");
    $('#tblDetailsMetadata').css("display", "none");

    $("#Details").removeClass('pop_up__Acti');
    $("#Summary").addClass('pop_up__Acti');
    $('#tblSummary').css("display", "");
    $('#tblDetailsMetadata').css("display", "none");


    //$("#tblSummary").show();
    //$("#tblDetailsMetadata").hide();

}

function MetadataDetails() {
    //$("#Summary").removeClass('pop_up__Acti');
    //$("#Details").addClass('pop_up__Acti');


    $("#Details").addClass('pop_up_Harizondal_meta_active');
    $("#Summary").removeClass('pop_up_Harizondal_meta_active');

    $('#tblSummary').css("display", "none");
    $('#tblDetailsMetadata').css("display", "");
    //$("#tblDetailsMetadata").show();
    //$("#tblSummary").hide();
}
function CheckGlobalSettingsForNewCP() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/GlobalSettings',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            localStorage.setItem("RestrictHighSecurityTagging", data.RestrictHighSecurityTagging);
            var vAccFeat = [];
            $(".CounterSetting").css("display", "none");
            if (veContractFeatures != null) {
                vAccFeat = $.grep(veContractFeatures, function (n, i) {
                    return (n.RowKey == "6" && n.Status == "ON");
                });
            }
            if (vAccFeat != null && vAccFeat.length > 0) {
                if (data == null) {
                    $(".CounterSetting").css("display", "none");
                } else {
                    if (localStorage.UserType.indexOf("Global Contract Owner") >= 0) {
                        if (vAccFeat != null && vAccFeat.length > 0) {
                            $(".CounterSetting").css("display", "");
                            QuickAction = true;
                        }
                    }
                    else if (data.CreateCounterpartyCA == "Yes" && localStorage.UserType.indexOf("Contract Area Administrator") >= 0) {
                        if (vAccFeat != null && vAccFeat.length > 0) {
                            $(".CounterSetting").css("display", "");
                            QuickAction = true;
                        }
                    }
                    else if (data.CreateCounterpartyBA == "Yes" && localStorage.UserType.indexOf("Business Area Owner") >= 0) {
                        if (vAccFeat != null && vAccFeat.length > 0) {
                            $(".CounterSetting").css("display", "");
                            QuickAction = true;
                        }
                    }
                    else {
                        $(".CounterSetting").css("display", "none");
                    }
                }
            }
            else {
                $(".CounterSetting").css("display", "none");
            }

            if (QuickAction) {
                $("#HomeQuickAction").css("display", "");
            }
            else {
                $("#HomeQuickAction").css("display", "none");
            }
        }
    });
}

//Sridhar
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
                swal({
                    title: '',
                    text: "Thanks, Milestone <span style=\"font-weight:700\">'" + milestoneTitle + "'</span> has been completed successfully.",
                    showCancelButton: false,
                    confirmButtonText: 'OK',
                    html: true
                });
                //swal("", "Thanks, milestone '" + milestoneTitle + "' has been completed successfully.");
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
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracts/contractstatus?ContractID=' + contractID,
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
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + contractid,
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
        async: false,
        success: function (item) {
            newContractItem = item;
        },
        error: function () {
            $("#loadingPage").fadeOut();
        }
    });
}



function Loading_View_trigger() {
}

//Added from 2.4final to 2.4
function viewRenewalDetails(contractid) {
    vContractID = contractid
    var contractTitle = "";
    $("#loadingPage").fadeIn();
    var contractDescription = "";
    var counterparty = "";
    var renewalType = "";
    var renewalTerminationNote = "";
    var renewalCondition = "";
    var UpComingNotes = "";
    var UpcomingChecklist = "";
    var CounterNoticeON = "";
    var vDiffNoticON = "";
    var CancellationTerminationNotice = "";
    var vRenewOn = "";
    var vRenewOnBefore = "";
    var vCurrentTerm = "";
    var vUpcomingTerm = "";
    var vContractTerm = "";
    var vRenewReminder = "";
    var vRenewalParticipants = "";
    var vRenewalParticipantsCC = "";
    var vStatus = null;
    var vRenewalDate = null;
    var vRenewedBy = "";
    vRenewalConfirmParticipantsXML = "";
    contractItem = "";
    var vtodaydate = moment(new Date()).format("YYYY-MM-DD");
    vRenewaHistoryData = [];
    $("#ulMetadataUpForRenewal").empty();
    $('#dvAfterRenew').css("display", "none");
    $('#spanAfterRenew').css("display", "none");
    $('#spanAfterRenew').html('');
    $('#dvActionButton1').css("display", "none");
    $('#dvActionButton2').css("display", "none");
    $('#dvActionButton3').css("display", "none");
    $('#dvActionButton4').css("display", "none");
    $('#dvActionButton5').css("display", "none");

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + contractid,
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },

        success: function (item) {
            contractItem = item;
            var vMetadata = '';
            var NoDataFound = 'No Data Founds...';
            contractTitle = item.ContractTitle;
            contractDescription = item.Description;
            counterparty = item.Counterparty;
            renewalTerminationNote = item.ContractTermNotes;

            if (item.SendRenewReminderTo != null) {
                vRenewReminder = item.SendRenewReminderTo;
            }
            if (item.RenewalConfirmParticipants != null) {
                if (item.RenewalConfirmParticipants.indexOf(';') > -1) {
                    var splitString = item.RenewalConfirmParticipants.split(';');
                    $.each(splitString, function (i, value) {
                        vRenewalParticipants += value + '(awaiting authorization)   ';
                    });
                }
                else {
                    vRenewalParticipants = item.RenewalConfirmParticipants + '(awaiting authorization)';
                }

            }
            if (item.RenewalConfirmParticipantsCC != null) {
                vRenewalParticipantsCC = item.RenewalConfirmParticipantsCC;
            }
            var vFromDate = moment(new Date());
            if (item.CounterpartyNoticesCancel != null && item.CounterpartyNoticesCancelDate != null) {
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                { CounterNoticeON = item.CounterpartyNoticesCancelDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                else {
                    if (localStorage.AppDateFormat == 'DD/MM/YYYY') { CounterNoticeON = item.CounterpartyNoticesCancelDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1'); }
                    else if (localStorage.AppDateFormat == 'MM/DD/YYYY') { CounterNoticeON = item.CounterpartyNoticesCancelDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                }
                vDiffNoticON = DiffBetDate(vFromDate, item.CounterpartyNoticesCancelDate);
                CancellationTerminationNotice = ' ' + vDiffNoticON + '  (' + CounterNoticeON + ') before term end date.';
            }

            if (item.CounterpartyNoticesRenewal != null && item.CounterpartyNoticesRenewalDate != null) {
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                { vRenewOn = item.CounterpartyNoticesRenewalDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                else {
                    if (localStorage.AppDateFormat == 'DD/MM/YYYY') { vRenewOn = item.CounterpartyNoticesRenewalDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1'); }
                    else if (localStorage.AppDateFormat == 'MM/DD/YYYY') { vRenewOn = item.CounterpartyNoticesRenewalDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                }

                var vDiffRenew = DiffBetDate(vFromDate, item.CounterpartyNoticesRenewalDate);
                if (vDiffRenew != null && vDiffRenew != '')
                    vContractTerm += '(' + vDiffRenew + 'left)';

                vRenewOnBefore = vRenewOn + vContractTerm;
            }

            if (item.RequiresAuth != null && item.AutoRenew != null) {
                if (item.AutoRenew == 'Yes')
                    renewalType += 'Auto Renewal ';
                else
                    renewalType += 'Manual Renewal ';

                if (item.RequiresAuth == 'Yes')
                    renewalType += 'With Authorization';
                else
                    renewalType += 'Without Authorization';
            }

            if (renewalItem.length > 0) {
                $(renewalItem).each(function (i, n) {
                    $(n).each(function (j, x) {
                        if (x.ContractID == item.RowKey) {
                            vRenewaHistoryData.push(renewalItem[i]);
                        }
                    });

                });
                $(vRenewaHistoryData).each(function (i, rItem) {
                    if (rItem.RenewedDate != null && item.NextTermStartDate != null && rItem.TermEndDate && item.NextTermEndDate) {

                        if (rItem.RenewedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1') == item.NextTermStartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1') && rItem.TermEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1') == item.NextTermEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1')) {
                            UpComingNotes = rItem.RenewalNotes;
                            UpcomingChecklist = rItem.RenewalChecklist;
                            vTermName = rItem.RenewableTermName;
                            vStatus = rItem.Status;
                            if (rItem.RenewedOn != null) {
                                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                                    vRenewalDate = rItem.RenewedOn.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                                }
                                else {
                                    if (localStorage.AppDateFormat == 'DD/MM/YYYY') {
                                        vRenewalDate = rItem.RenewedOn.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1');
                                    }
                                    else if (localStorage.AppDateFormat == 'MM/DD/YYYY') {
                                        vRenewalDate = rItem.RenewedOn.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                                    }
                                }
                            }
                            //vRenewalDate = rItem.RenewedOn
                            vRenewedBy = rItem.RenewedBy;
                            vRenewalConfirmParticipantsXML = rItem.RenewalConfirmParticipantsXML;
                        }
                    }

                });
            }

            ConfirmParticipationCollection = [];
            if (vRenewalConfirmParticipantsXML != null) {
                $(vRenewalConfirmParticipantsXML).find('participant').each(function () {
                    var authName = $(this).find('name').text();
                    var authStatus = $(this).find('status').text();
                    var person = {
                        Participation: authName, status: authStatus
                    };
                    ConfirmParticipationCollection.push(person);
                });
            }
            var authorizationStatus = "";
            if (ConfirmParticipationCollection != null) {
                $(ConfirmParticipationCollection).each(function (i, item) {
                    if (item.Participation.trim() == localStorage.UserName) {
                        authorizationStatus = item.status;
                    }
                });
            }
            if (item.StartDate != null && item.TermEndDate != null) {
                var FormatstartDate = null;
                var FTermEndDate = null;
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                    FormatstartDate = item.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                    FTermEndDate = item.TermEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                }
                else {
                    if (localStorage.AppDateFormat == 'DD/MM/YYYY') {
                        FormatstartDate = item.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1');
                        FTermEndDate = item.TermEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                    }
                    else if (localStorage.AppDateFormat == 'MM/DD/YYYY') {
                        FormatstartDate = item.StartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                        FTermEndDate = item.TermEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                    }
                }
                vCurrentTerm = FormatstartDate + ' - ' + FTermEndDate;
            }

            var vToDate = "";
            if (item.RenewalDate != null)
                vToDate = moment(new Date(item.RenewalDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1')));


            if (vToDate != null) {
                var vDiff = DiffBetDate(vFromDate, vToDate);
                if (vDiff == '')
                    vCurrentTerm += ' Contract Term ended';
                else
                    vCurrentTerm += ' (Term ends in ' + vDiff + ')';

            }

            if (item.NextTermStartDate != null && item.NextTermEndDate != null) {
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                    vUpcomingTerm += item.NextTermStartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                    vUpcomingTerm += '-';
                    vUpcomingTerm += item.NextTermEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                }
                else {
                    if (localStorage.AppDateFormat == 'DD/MM/YYYY') {
                        vUpcomingTerm += item.NextTermStartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1');
                        vUpcomingTerm += '-';
                        vUpcomingTerm += item.NextTermEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1');
                    }
                    else if (localStorage.AppDateFormat == 'MM/DD/YYYY') {
                        vUpcomingTerm += item.NextTermStartDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                        vUpcomingTerm += '-';
                        vUpcomingTerm += item.NextTermEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                    }
                }

                var vDif = DiffBetDate(vFromDate, vToDate);
                if (vDif != "" && vDif != null)
                    vUpcomingTerm += '(' + vDif + ')';
            }

            var ConfirmDate = moment(new Date()).format("YYYY-MM-DD");
            if (item.ContractConfirmSendDate != null) {
                ConfirmDate = moment(new Date(contractItem.ContractConfirmSendDate)).format("YYYY-MM-DD");;
            }
            var RenewalConfirmDate = moment(new Date()).format("YYYY-MM-DD");
            if (contractItem.CounterpartyNoticesRenewalDate != null) {
                RenewalConfirmDate = moment(new Date(contractItem.CounterpartyNoticesRenewalDate)).format("YYYY-MM-DD");
            }

            if (item.AutoRenew == "No" && item.RequiresAuth == "No") {

                vMetadata += '<li><small class="smallText_index">ContractTitle: </small><small class="smallTextBlue_index">' + '<a href="/Contracts/ContractDetails?ContractID=' + vContractID + '" target="_blank"">' + contractTitle + ' <img src="/Content/Images/external_link.png" id="newTabImage"></a></small></li>';
                vMetadata += '<li><small class="smallText_index">Contract Description: </small><small class="smallTextgray_index">' + contractDescription + '</small></li>';
                vMetadata += '<li><small class="smallText_index">Counterparty: </small><small class="smallTextgray_index">' + counterparty + '</small></li>';
                vMetadata += '<li></li>';
                vMetadata += '<li><small class="HeadingTextBlue_index">Renewal Terms & Conditions</small></li>';
                vMetadata += '<li></li>';
                vMetadata += '<li><small class="smallText_index">Renewal Type: </small><small class="smallTextgray_index">' + renewalType + '</small></li>';
                vMetadata += '<li><small class="smallText_index">Renewal/Termination Conditions: </small><small class="smallTextgray_index">' + renewalTerminationNote + '</small></li>';
                vMetadata += '<li><small class="smallText_index">Cancellation/Termination Notice: </small><small class="smallTextgray_index">' + CancellationTerminationNotice + '</small></li>';
                vMetadata += '<li></li>';
                vMetadata += '<li><small class="HeadingTextBlue_index">Renewal Activity & Status</small></li>';
                vMetadata += '<li></li>';
                vMetadata += '<li><small class="smallText_index">Renewal Condition: </small><small class="smallTextgray_index">' + UpcomingChecklist + '</small></li>';
                vMetadata += '<li><small class="smallTextgray_index">' + UpComingNotes + '</small></li>';
                vMetadata += '<li></li>';
                vMetadata += '<li><small class="HeadingTextBlue_index">Important Dates</small></li>';
                vMetadata += '<li><small class="smallText_index">Renewal Upcoming Term: </small><small class="smallTextgray_index">' + vUpcomingTerm + '</small></li>';
                vMetadata += '<li><small class="smallText_index">Renewal On or Before: </small><small class="smallTextgray_index">' + vRenewOnBefore + '</small></li>';
                vMetadata += '<li><small class="smallText_index">Current Term: </small><small class="smallTextgray_index">' + vCurrentTerm + '</small></li>';
                vMetadata += '<li></li>';
                vMetadata += '<li><small class="HeadingTextBlue_index">Reminders Sent To</small></li>';
                vMetadata += '<li><small class="smallTextgray_index">' + vRenewReminder + '</small></li>';
                vMetadata += '<li></li>';
                if (item.FullControlPermissions.indexOf(localStorage.UserName) > -1 && item.NextTermStartDate != null && item.NextTermEndDate != null && (RenewalConfirmDate <= vtodaydate)) {
                    if (vRenewalDate == null && (vStatus == null || vStatus == "")) {
                        $("[name='btnRenew1']").css("display", "");
                    }
                    else {
                        $("[name='btnRenew1']").css("display", "none");
                        if (vStatus == "Renewed" && vRenewalDate != null) {
                            $('#dvAfterRenew').css("display", "");
                            $('#spanAfterRenew').css("display", "");

                            $('#spanAfterRenew').html('Note: The Upcoming Contract Term was Renewed By ' + vRenewedBy + ' on ' + vRenewalDate);
                        }

                    }
                    vMetadata += '<li>' + $('#dvActionButton1').html() + '</li>';
                    $('#dvActionButton1').css("display", "");
                }
                else {
                    vMetadata += '<li></li>';
                    $('#dvActionButton1').css("display", "None");
                }

                //vMetadata += '<li>' + $('#dvAfterRenew').html() + '</li>';
                vMetadata += '<li></li>';
            }
            else if (item.AutoRenew == "No" && item.RequiresAuth == "Yes") {
                vMetadata += '<li><small class="smallText_index">ContractTitle: </small><small class="smallTextBlue_index">' + '<a href="/Contracts/ContractDetails?ContractID=' + vContractID + '" target="_blank"">' + contractTitle + ' <img src="/Content/Images/external_link.png" id="newTabImage"></a></small></li>';
                vMetadata += '<li><small class="smallText_index">Contract Description: </small><small class="smallTextgray_index">' + contractDescription + '</small></li>';
                vMetadata += '<li><small class="smallText_index">Counterparty: </small><small class="smallTextgray_index">' + counterparty + '</small></li>';
                vMetadata += '<li></li>';
                vMetadata += '<li><small class="HeadingTextBlue_index">Renewal Terms & Conditions</small></li>';
                vMetadata += '<li></li>';
                vMetadata += '<li><small class="smallText_index">Renewal Type: </small><small class="smallTextgray_index">' + renewalType + '</small></li>';
                vMetadata += '<li><small class="smallText_index">Renewal/Termination Conditions: </small><small class="smallTextgray_index">' + renewalTerminationNote + '</small></li>';
                vMetadata += '<li><small class="smallText_index">Cancellation/Termination Notice: </small><small class="smallTextgray_index">' + CancellationTerminationNotice + '</small></li>';
                vMetadata += '<li></li>';
                vMetadata += '<li><small class="HeadingTextBlue_index">Renewal Authorization Activity & Status</small></li>';
                vMetadata += '<li></li>';
                vMetadata += '<li><small class="smallTextgray_index">' + vRenewalParticipants + '</small></li>';
                vMetadata += '<li><small class="smallText_index">CC Users: </small><small class="smallTextgray_index">' + vRenewalParticipantsCC + '</small></li>';
                vMetadata += '<li><small class="smallText_index">Renewal Condition: </small><small class="smallTextgray_index">' + UpcomingChecklist + '</small></li>';
                vMetadata += '<li><small class="smallTextgray_index">' + UpComingNotes + '</small></li>';
                vMetadata += '<li></li>';
                vMetadata += '<li><small class="HeadingTextBlue_index">Important Dates</small></li>';
                vMetadata += '<li><small class="smallText_index">Renewal Upcoming Term: </small><small class="smallTextgray_index">' + vUpcomingTerm + '</small></li>';
                vMetadata += '<li><small class="smallText_index">Renewal On or Before: </small><small class="smallTextgray_index">' + vRenewOnBefore + '</small></li>';
                vMetadata += '<li><small class="smallText_index">Current Term: </small><small class="smallTextgray_index">' + vCurrentTerm + '</small></li>';
                vMetadata += '<li></li>';
                vMetadata += '<li><small class="HeadingTextBlue_index">Reminders Sent To</small></li>';
                vMetadata += '<li><small class="smallTextgray_index">' + vRenewReminder + '</small></li>';
                vMetadata += '<li></li>';
                if (vRenewalParticipants != "") {
                    if (vRenewalParticipants.indexOf(localStorage.UserName) > -1 && item.NextTermStartDate != null && item.NextTermEndDate != null && (authorizationStatus != "Renewed" && authorizationStatus != "Rejected") && (ConfirmDate <= vtodaydate) && vStatus != "Renewed" && vRenewalDate == null) {
                        vMetadata += '<li>' + $('#dvActionButton2').html() + '</li>';
                        $('#dvActionButton2').css("display", "");
                    }
                    else {
                        $('#dvActionButton2').css("display", "None");
                        vMetadata += '<li></li>';
                        if (vStatus == "Renewed" && vRenewalDate != null) {
                            $('#dvAfterRenew').css("display", "");
                            $('#spanAfterRenew').css("display", "");

                            $('#spanAfterRenew').html('Note: The Upcoming Contract Term was Renewed By ' + vRenewedBy + ' on ' + vRenewalDate + '');
                        }
                        else if (authorizationStatus != "Rejected" && item.NextTermStartDate != null && item.NextTermEndDate != null && (RenewalConfirmDate <= vtodaydate) && vStatus != "Renewed" && vRenewalDate == null) {
                            if (item.FullControlPermissions.indexOf(localStorage.UserName) > -1) {
                                vMetadata += '<li>' + $('#dvActionButton1').html() + '</li>';
                                $('#dvActionButton1').css("display", "");
                                $('#dvActionButton5').css("display", "none");
                            }
                            else {
                                vMetadata += '<li>' + $('#dvActionButton5').html() + '</li>';
                                $('#dvActionButton5').css("display", "");
                                $('#dvActionButton1').css("display", "none");
                            }
                        }
                    }
                }


                //vMetadata += '<li>' + $('#dvAfterRenew').html() + '</li>';
            }
            else if (item.AutoRenew == "Yes" && item.RequiresAuth == "No") {
                vMetadata += '<li><small class="smallText_index">ContractTitle: </small><small class="smallTextBlue_index">' + '<a href="/Contracts/ContractDetails?ContractID=' + vContractID + '" target="_blank"">' + contractTitle + ' <img src="/Content/Images/external_link.png" id="newTabImage"></a></small></li>';
                vMetadata += '<li><small class="smallText_index">Contract Description: </small><small class="smallTextgray_index">' + contractDescription + '</small></li>';
                vMetadata += '<li><small class="smallText_index">Counterparty: </small><small class="smallTextgray_index">' + counterparty + '</small></li>';
                vMetadata += '<li></li>';
                vMetadata += '<li><small class="HeadingTextBlue_index">Renewal Terms & Conditions</small></li>';
                vMetadata += '<li></li>';
                vMetadata += '<li><small class="smallText_index">Renewal Type: </small><small class="smallTextgray_index">' + renewalType + '</small></li>';
                vMetadata += '<li><small class="smallText_index">Renewal/Termination Conditions: </small><small class="smallTextgray_index">' + renewalTerminationNote + '</small></li>';
                vMetadata += '<li><small class="smallText_index">Cancellation/Termination Notice: </small><small class="smallTextgray_index">' + CancellationTerminationNotice + '</small></li>';
                vMetadata += '<li></li>';
                vMetadata += '<li><small class="HeadingTextBlue_index">Renewal Activity & Status</small></li>';
                vMetadata += '<li></li>';
                vMetadata += '<li><small class="smallText_index">Renewal Condition: </small><small class="smallTextgray_index">' + UpcomingChecklist + '</small></li>';
                vMetadata += '<li><small class="smallTextgray_index">' + UpComingNotes + '</small></li>';
                vMetadata += '<li></li>';
                vMetadata += '<li><small class="HeadingTextBlue_index">Important Dates</small></li>';
                vMetadata += '<li><small class="smallText_index">Renewal Upcoming Term: </small><small class="smallTextgray_index">' + vUpcomingTerm + '</small></li>';
                vMetadata += '<li><small class="smallText_index">Renewal On or Before: </small><small class="smallTextgray_index">' + vRenewOnBefore + '</small></li>';
                vMetadata += '<li><small class="smallText_index">Current Term: </small><small class="smallTextgray_index">' + vCurrentTerm + '</small></li>';
                vMetadata += '<li></li>';
                vMetadata += '<li><small class="HeadingTextBlue_index">Reminders Sent To</small></li>';
                vMetadata += '<li><small class="smallTextgray_index">' + vRenewReminder + '</small></li>';
                vMetadata += '<li></li>';
                if (item.FullControlPermissions.indexOf(localStorage.UserName) > -1) {
                    vMetadata += '<li>' + $('#dvActionButton3').html() + '</li>';
                    $('#dvActionButton3').css("display", "");
                }
                else {
                    vMetadata += '<li></li>';
                    $('#dvActionButton3').css("display", "None");
                }

                vMetadata += '<li></li>';
            }
            else if (item.AutoRenew == "Yes" && item.RequiresAuth == "Yes") {
                vMetadata += '<li><small class="smallText_index">ContractTitle: </small><small class="smallTextBlue_index">' + '<a href="/Contracts/ContractDetails?ContractID=' + vContractID + '" target="_blank"">' + contractTitle + ' <img src="/Content/Images/external_link.png" id="newTabImage"></a></small></li>';
                vMetadata += '<li><small class="smallText_index">Contract Description: </small><small class="smallTextgray_index">' + contractDescription + '</small></li>';
                vMetadata += '<li><small class="smallText_index">Counterparty: </small><small class="smallTextgray_index">' + counterparty + '</small></li>';
                vMetadata += '<li></li>';
                vMetadata += '<li><small class="HeadingTextBlue_index">Renewal Terms & Conditions</small></li>';
                vMetadata += '<li></li>';
                vMetadata += '<li><small class="smallText_index">Renewal Type: </small><small class="smallTextgray_index">' + renewalType + '</small></li>';
                vMetadata += '<li><small class="smallText_index">Renewal/Termination Conditions: </small><small class="smallTextgray_index">' + renewalTerminationNote + '</small></li>';
                vMetadata += '<li><small class="smallText_index">Cancellation/Termination Notice: </small><small class="smallTextgray_index">' + CancellationTerminationNotice + '</small></li>';
                vMetadata += '<li></li>';
                vMetadata += '<li><small class="HeadingTextBlue_index">Renewal Authorization Activity & Status</small></li>';
                vMetadata += '<li></li>';
                vMetadata += '<li><small class="smallTextgray_index">' + vRenewalParticipants + '</small></li>';
                vMetadata += '<li><small class="smallText_index">CC Users: </small><small class="smallTextgray_index">' + vRenewalParticipantsCC + '</small></li>';
                vMetadata += '<li><small class="smallText_index">Renewal Condition: </small><small class="smallTextgray_index">' + UpcomingChecklist + '</small></li>';
                vMetadata += '<li><small class="smallTextgray_index">' + UpComingNotes + '</small></li>';
                vMetadata += '<li></li>';
                vMetadata += '<li><small class="HeadingTextBlue_index">Important Dates</small></li>';
                vMetadata += '<li><small class="smallText_index">Renewal Upcoming Term: </small><small class="smallTextgray_index">' + vUpcomingTerm + '</small></li>';
                vMetadata += '<li><small class="smallText_index">Renewal On or Before: </small><small class="smallTextgray_index">' + vRenewOnBefore + '</small></li>';
                vMetadata += '<li><small class="smallText_index">Current Term: </small><small class="smallTextgray_index">' + vCurrentTerm + '</small></li>';
                vMetadata += '<li></li>';
                vMetadata += '<li><small class="HeadingTextBlue_index">Reminders Sent To</small></li>';
                vMetadata += '<li><small class="smallTextgray_index">' + vRenewReminder + '</small></li>';
                vMetadata += '<li></li>';

                if (vRenewalParticipants != "") {

                    if (vRenewalParticipants.indexOf(localStorage.UserName) > -1 && item.NextTermStartDate != null && item.NextTermEndDate != null && (authorizationStatus != "Renewed" && authorizationStatus != "Rejected") && (ConfirmDate <= vtodaydate)) {
                        vMetadata += '<li>' + $('#dvActionButton4').html() + '</li>';
                        $('#dvActionButton4').css("display", "");
                    }
                    else {
                        $('#dvActionButton4').css("display", "None");
                        vMetadata += '<li></li>';
                    }
                }
                vMetadata += '<li></li>';
            }

            if (vMetadata != '') {
                $("#ulMetadataUpForRenewal").append(vMetadata);
            }
            else {
                $("#ulMetadataUpForRenewal").append(NoDataFound);
            }


            $("#viewMetadataUpForRenewal").dialog("option", "title", "Contract Renewal Details");
            $("#viewMetadataUpForRenewal").dialog("open");

            $("#loadingPage").fadeOut();
        },
        error:
            function (data) {
                $("#loadingPage").fadeOut();
            },

    });

}

//Sridhar - 2.4c
function showAllActivities(item) {
    if ($("ul li.moreComments").css('display') == "none") {
        $("ul li.moreComments").css('display', '');
        $($(item)[0]).html('Show Less');
    }
    else {
        $("ul li.moreComments").css('display', 'none');
        $($(item)[0]).html('Show Older');
    }
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
            imgObj.attr("src", "../Content/Images/e-open.png");
        } else {
            imgObj.attr("title", "Collapse");
            imgObj.attr("src", "../Content/Images/e-close.png");
        }
    }

}

function viewRenewalDetailsNew(contractid) {
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + contractid,
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
        success: function (contractItem) {

            var vMetadata = '<tr>';
            vMetadata += '<td style="padding: 5px;">Contract Record Title</td>';
            vMetadata += '<td style="padding: 5px;color: #2f2f2f;">';
            vMetadata += '<a href="/Contracts/ContractDetails?ContractID=' + contractItem.RowKey + '" target="_blank" "="" style="color: #44a6d8;display: inline-flex;;" title="' + contractItem.ContractTitle + '">';
            vMetadata += '<span style="max-width: 500px;display: block;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">' + contractItem.ContractTitle + '</span>';
            vMetadata += '<img src="/Content/Images/external_link.png" id="newTabImage"></a></td>';
            vMetadata += '</tr>';

            vMetadata += '<tr>';
            vMetadata += '<td style="padding: 5px;">Contract Type</td>';
            vMetadata += '<td style="padding: 5px;color: #2f2f2f;">' + contractItem.ContractType + '</td>';
            vMetadata += '</tr>';

            vMetadata += '<tr>';
            vMetadata += '<td style="padding: 5px;">Term Type</td>';
            vMetadata += '<td style="padding: 5px;color: #2f2f2f;">' + contractItem.ContractTermType + '</td>';
            vMetadata += '</tr>';
            if (contractItem.ContractTermType == "Fixed Term") {
                var vStartdate = '';
                var vEnddate = '';

                var vCounterNotice = '';
                //Renewal / Cancellation Conditions
                vMetadata += '<tr>';
                vMetadata += '<td style="padding: 5px;">Cancellation Conditions</td>';
                if (contractItem.ContractTermNotes != null && contractItem.ContractTermNotes != '')
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">' + contractItem.ContractTermNotes + '</td>';
                else
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">-</td>';
                vMetadata += '</tr>';



                //Current Term
                vMetadata += '<tr>';
                vMetadata += '<td style="padding: 5px;">Start / Effective Date</td>';
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
                    vMetadata += '<td style="padding: 5px;">-</td>';

                vMetadata += '</tr>';


                //Next Evaluation Date
                vMetadata += '<tr>';
                vMetadata += '<td style="padding: 5px;">Next Evaluation Date</td>';
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
                vMetadata += '<td style="padding: 5px;">End Date</td>';
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
                vMetadata += '<td style="padding: 5px;">Counterparty Contact / Address for Notice</td>';
                if (contractItem.CounterpartyNotices != null && contractItem.CounterpartyNotices != '')
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">' + contractItem.CounterpartyNotices + '</td>';
                else
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">-</td>';
                vMetadata += '</tr>';

                //Counterparty Cancellation Notice
                vMetadata += '<tr>';
                vMetadata += '<td style="padding: 5px;">Counterparty Cancellation Notice</td>';
                if (contractItem.CounterpartyNoticesCancel != null && contractItem.CounterpartyNoticesCancel != '') {
                    //var counterpartyNoticesCancelDate = '';
                    //if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                    //    counterpartyNoticesCancelDate = contractItem.CounterpartyNoticesCancelDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                    //}
                    //else {
                    //    if (localStorage.AppDateFormat == 'DD/MM/YYYY') {
                    //        counterpartyNoticesCancelDate = contractItem.CounterpartyNoticesCancelDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1');
                    //    }
                    //    else if (localStorage.AppDateFormat == 'MM/DD/YYYY') {
                    //        counterpartyNoticesCancelDate = contractItem.CounterpartyNoticesCancelDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                    //    }

                    //}
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">' + contractItem.CounterpartyNoticesCancel + ' day(s)</td>';
                } else
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">-</td>';
                vMetadata += '</tr>';

                $(".renewableTermDetails").css('display', 'none');

                showTermActivities(contractid);
            } else if (contractItem.ContractTermType == "Evergreen / Perpetual") {
                //Renewal / Cancellation Conditions
                vMetadata += '<tr>';
                vMetadata += '<td style="padding: 5px;">Cancellation Conditions</td>';
                if (contractItem.ContractTermNotes != null && contractItem.ContractTermNotes != '')
                    vMetadata += '<td style="padding: 5px;">' + contractItem.ContractTermNotes + '</td>';
                else
                    vMetadata += '<td style="padding: 5px;">-</td>';
                vMetadata += '</tr>';



                //Current Term
                vMetadata += '<tr>';
                vMetadata += '<td style="padding: 5px;">Start / Effective Date</td>';
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
                vMetadata += '<td style="padding: 5px;">Next Evaluation Date</td>';
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
                vMetadata += '<td style="padding: 5px;">Counterparty Contact / Address for Notice</td>';
                if (contractItem.CounterpartyNotices != null && contractItem.CounterpartyNotices != '')
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">' + contractItem.CounterpartyNotices + '</td>';
                else
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">-</td>';
                vMetadata += '</tr>';

                //Counterparty Cancellation Notice
                vMetadata += '<tr>';
                vMetadata += '<td style="padding: 5px;">Counterparty Cancellation Notice</td>';
                if (contractItem.CounterpartyNoticesCancel != null && contractItem.CounterpartyNoticesCancel != '') {
                    //var counterpartyNoticesCancelDate = '';
                    //if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                    //    counterpartyNoticesCancelDate = contractItem.CounterpartyNoticesCancelDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                    //}
                    //else {
                    //    if (localStorage.AppDateFormat == 'DD/MM/YYYY') {
                    //        counterpartyNoticesCancelDate = contractItem.CounterpartyNoticesCancelDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1');
                    //    }
                    //    else if (localStorage.AppDateFormat == 'MM/DD/YYYY') {
                    //        counterpartyNoticesCancelDate = contractItem.CounterpartyNoticesCancelDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                    //    }

                    //}
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">' + contractItem.CounterpartyNoticesCancel + ' day(s)</td>';
                } else
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">-</td>';
                vMetadata += '</tr>';

                $(".renewableTermDetails").css('display', 'none');

                showTermActivities(contractid);
            } else if (contractItem.ContractTermType == "Executed / Performance") {
                //Renewal / Cancellation Conditions
                vMetadata += '<tr>';
                vMetadata += '<td style="padding: 5px;">Cancellation Conditions</td>';
                if (contractItem.ContractTermNotes != null && contractItem.ContractTermNotes != '')
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">' + contractItem.ContractTermNotes + '</td>';
                else
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">-</td>';
                vMetadata += '</tr>';



                //Date of execution
                vMetadata += '<tr>';
                vMetadata += '<td style="padding: 5px;">Start / Effective Date</td>';
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
                vMetadata += '<td style="padding: 5px;">Counterparty Contact / Address for Notice</td>';
                if (contractItem.CounterpartyNotices != null && contractItem.CounterpartyNotices != '')
                    vMetadata += '<td style="padding: 5px;">' + contractItem.CounterpartyNotices + '</td>';
                else
                    vMetadata += '<td style="padding: 5px;">-</td>';
                vMetadata += '</tr>';

                //Counterparty Cancellation Notice
                vMetadata += '<tr>';
                vMetadata += '<td style="padding: 5px;">Counterparty Cancellation Notice</td>';
                if (contractItem.CounterpartyNoticesCancel != null && contractItem.CounterpartyNoticesCancel != '') {
                    //var counterpartyNoticesCancelDate = '';
                    //if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                    //    counterpartyNoticesCancelDate = contractItem.CounterpartyNoticesCancelDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                    //}
                    //else {
                    //    if (localStorage.AppDateFormat == 'DD/MM/YYYY') {
                    //        counterpartyNoticesCancelDate = contractItem.CounterpartyNoticesCancelDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1');
                    //    }
                    //    else if (localStorage.AppDateFormat == 'MM/DD/YYYY') {
                    //        counterpartyNoticesCancelDate = contractItem.CounterpartyNoticesCancelDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                    //    }

                    //}
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">' + contractItem.CounterpartyNoticesCancel + ' day(s)</td>';
                } else
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">-</td>';
                vMetadata += '</tr>';

                $(".renewableTermDetails").css('display', 'none');
                showTermActivities(contractid);
            }
            else if (contractItem.ContractTermType == "Renewable") {
                //Renewal / Cancellation Conditions
                vMetadata += '<tr>';
                vMetadata += '<td style="padding: 5px;">Renewal / Cancellation Conditions</td>';
                if (contractItem.ContractTermNotes != null && contractItem.ContractTermNotes != '')
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">' + contractItem.ContractTermNotes + '</td>';
                else
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">-</td>';
                vMetadata += '</tr>';

                //Auto-Renew at the end of each term
                vMetadata += '<tr>';
                vMetadata += '<td style="padding: 5px;">Auto-Renew at the end of each term</td>';
                if (contractItem.AutoRenew != null && contractItem.AutoRenew != '')
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">' + contractItem.AutoRenew + '</td>';
                else
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">-</td>';
                vMetadata += '</tr>';

                //Requires Renewal Authorization
                vMetadata += '<tr>';
                vMetadata += '<td style="padding: 5px;">Requires Renewal Authorization</td>';
                if (contractItem.RequiresAuth != null && contractItem.RequiresAuth != '')
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">' + contractItem.RequiresAuth + '</td>';
                else
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">-</td>';
                vMetadata += '</tr>';

                //Renewal Notice to Counterparty
                vMetadata += '<tr>';
                vMetadata += '<td style="padding: 5px;">Renewal Notice to Counterparty</td>';
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
                vMetadata += '<td style="padding: 5px;">Counterparty Cancellation Notice</td>';
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
                vMetadata += '<td style="padding: 5px;">Counterparty Contact / Address for Notice</td>';
                if (contractItem.CounterpartyNotices != null && contractItem.CounterpartyNotices != '')
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">' + contractItem.CounterpartyNotices + '</td>';
                else
                    vMetadata += '<td style="padding: 5px;color: #2f2f2f;">-</td>';
                vMetadata += '</tr>';
                //Current Term
                vMetadata += '<tr>';
                vMetadata += '<td style="padding: 5px;">Current Term</td>';
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
                vMetadata += '<td style="padding: 5px;">Upcoming Term</td>';
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



                //Renewal History and Activities
                var selectedTerms = $.grep(renewalItem, function (item, i) {
                    return item.ContractID == contractid
                }).sort(function (a, b) {
                    return new Date(a.TermEndDate).getTime() - new Date(b.TermEndDate).getTime()
                });
                var str = "";
                var commentArr = [];

                var allTerms = [];
                var endedTerms = $.grep(selectedTerms, function (itemR, i) {
                    return itemR.TermStatus == "Ended"
                })

                var currentTerm = $.grep(selectedTerms, function (itemR, i) {
                    return itemR.TermStatus == "Current"
                })
                var expiredTerms = $.grep(selectedTerms, function (itemR, i) {
                    return itemR.TermStatus == "Expired" && itemR.RenewableTermName != "Initial Term"
                })

                var notStartedTerms = $.grep(selectedTerms, function (itemR, i) {
                    return itemR.TermStatus == "Not Started"
                })

                allTerms = allTerms.concat(endedTerms, currentTerm, expiredTerms, notStartedTerms);

                if (allTerms.length > 0) {
                    $(allTerms).each(function (i, item) {
                        str += '<tr>';
                        if (item.RenewableTermName != null && item.RenewableTermName != "") {
                            str += '<td style="width: 10%;">' + item.RenewableTermName + '</td>';
                        }
                        else {
                            str += '<td>-</td>';
                        }
                        if (item.RenewedDate != null) {
                            var fRenewedDate = "";
                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                            { fRenewedDate = moment(new Date(item.RenewedDate)).format('MM/DD/YYYY'); }
                            else { fRenewedDate = moment(new Date(item.RenewedDate)).format(localStorage.AppDateFormat); }
                            str += '<td>' + fRenewedDate + '</td>';
                        } else {
                            str += '<td>-</td>';
                        }
                        if (item.TermEndDate != null) {
                            var fTermEndDate = "";
                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                            { fTermEndDate = moment(new Date(item.TermEndDate)).format('MM/DD/YYYY'); }
                            else { fTermEndDate = moment(new Date(item.TermEndDate)).format(localStorage.AppDateFormat); }
                            str += '<td>' + fTermEndDate + '</td>';
                        } else {
                            str += '<td>-</td>';
                        }

                        if (item.TermStatus != null && item.TermStatus != "") {
                            str += '<td>' + item.TermStatus + '</td>';
                        }
                        else {
                            str += '<td>-</td>';
                        }


                        if (item.RenewedOn != null && item.RenewedOn != "") {
                            var fRenewedOn = "";
                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                            { fRenewedOn = moment(new Date(item.RenewedOn)).format('MM/DD/YYYY'); }
                            else { fRenewedOn = moment(new Date(item.RenewedOn)).format(localStorage.AppDateFormat); }
                            str += '<td>' + fRenewedOn + '</td>';
                        }
                        else {
                            str += '<td>-</td>';
                        }

                        if (item.RenewedBy != null && item.RenewedBy != "") {
                            str += '<td>' + item.RenewedBy + '</td>';
                        }
                        else {
                            str += '<td>-</td>';
                        }

                        if (item.RenewalChecklist != null && item.RenewalChecklist != "") {
                            str += '<td title="' + item.RenewalChecklist + '" style="line-height: 20px;"><span style="overflow: hidden;text-overflow: ellipsis;width: 175px;white-space: nowrap;float: left;">' + item.RenewalChecklist + '</span></td>';
                        }
                        else {
                            str += '<td>-</td>';
                        }

                        if (item.RenewalNotes != null && item.RenewalNotes != "") {
                            str += '<td title="' + item.RenewalNotes + '" style="line-height: 20px;"><span style="overflow: hidden;text-overflow: ellipsis;width: 175px;white-space: nowrap;float: left;">' + item.RenewalNotes + '</span></td>';
                        }
                        else {
                            str += '<td>-</td>';
                        }

                        str += '</tr>';

                        if (item.RenewalCommentsXML == "" || item.RenewalCommentsXML == null) {
                            $("#ulActivityComment").empty();
                            $("#ulActivityComment").append('<li style="border: none;"><b class="color_lightgrey"><span class="color_dark" style="margin-right: 20px;">No Activities found</span></b></li>');
                            //$(".toDoContenList").append('<li style="border: none;"><b class="color_lightgrey"><span class="color_dark" style="margin-right: 20px;">No Activities found</span></b></li>');
                        }
                        else {
                            var commentsxML = decodeURIComponent(item.RenewalCommentsXML);
                            $(commentsxML).find("RenewalComment").each(function () {
                                var dateText = $(this).find("Created").text()

                                var item = {
                                    activity: $(this).find('Activity').text(),
                                    comment: $(this).find('Comments').text(),
                                    sendto: $(this).find('SendTo').text(),
                                    created: new Date(dateText)
                                    /* other properties*/
                                }
                                /* push object to array*/
                                commentArr.push(item);

                            });
                        }

                    });

                    /* sort data*/
                    if (commentArr.length > 0) {
                        commentArr.sort(function (a, b) {
                            return a.created < b.created;
                        });
                        var htmlComment = '';
                        $.each(commentArr, function (index, item) {
                            if (index < 3) {
                                htmlComment += '<li><b class="color_lightgrey"><span class="color_dark" style="float: left;width: 9%;">Activity: </span><span style="float: left;width: 88%;">' + item.activity + '</span></b><br><br><b class="color_dark float_left" style="float: left;width: 9%;">Comment: </b><div class="taskcomment"><span style="float: left;width: 88%;"> ' + item.comment + '</span></div></li>';
                            }
                            else {
                                htmlComment += '<li class="moreComments" style="display:none;"><b class="color_lightgrey"><span class="color_dark" style="float: left;width: 9%;">Activity: </span><span style="float: left;width: 88%;">' + item.activity + '</span></b><br><br><b class="color_dark float_left" style="float: left;width: 9%;">Comment: </b><div class="taskcomment"><span style="float: left;width: 88%;"> ' + item.comment + '</span></div></li>';

                            }
                        });
                        if (commentArr.length >= 3) {
                            htmlComment += '<li style="border: none;"><a href="javascript:void(0);" onclick="showAllActivities(this)" style="color: #44a6d8;">Show Older</a></li>';
                        }
                        $("#ulActivityComment").empty();
                        $("#ulActivityComment").append(htmlComment);
                    }
                    //$("#renewalHistory").append(str);
                    //*Harshitha
                    $(".renewableTermDetails").css('display', '');
                    $("#renewalViewHistoryNew").empty();
                    $("#renewalViewHistoryNew").append(str);

                }
            }

            $("#tbodyTermSummary").html(vMetadata);
            $("#viewMetadataUpForRenewal").dialog("option", "title", "Contract Term Details");
            $("#viewMetadataUpForRenewal").dialog("open");

            $("#loadingPage").fadeOut();
        },
        error:
            function (data) {
                $("#loadingPage").fadeOut();
            },
    });
}
//Sridhar - 2.4c

function GetRenewalHistoryALL() {

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/contractrenewalhistoryall',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (RenewalHistoryAll) {

            if (RenewalHistoryAll != null && RenewalHistoryAll != "")
                renewalItem = RenewalHistoryAll;
            $("#loadingPage").fadeOut();
        },
        error: function (data) {
            renewalItem = [];
        },

    });

}
function Renew() {

    $("#loadingPage").fadeIn();
    var vStatus = "Renewed";
    var vRenewedBy = localStorage.UserName;
    var vRenewalType = "Manual";
    var vRenewedOn = $.datepicker.formatDate('mm/dd/yy', new Date())
    var vRenewedOnDisplay = "";
    var vfRenewedDisplay = "";
    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
    { fRenewedDisplay = moment(new Date()).format('MM/DD/YYYY'); }
    else {
        fRenewedDisplay = moment(new Date()).format(localStorage.AppDateFormat);
    }
    vfRenewedDisplay = fRenewedDisplay;
    var vModified = $.datepicker.formatDate('mm/dd/yy', new Date());
    var vModifiedBy = localStorage.UserName;


    $("#loadingPage").fadeIn();

    $(vRenewaHistoryData).each(function (i, item) {
        if (item.RenewableTermName == vTermName) {
            //Start Ajax
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + vContractID + '/renewalhistory',
                type: 'Post',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                data: {
                    ContractID: item.ContractID,
                    RenewableTermName: item.RenewableTermName,
                    RenewedFor: item.RenewedFor,
                    RenewedBy: vRenewedBy,
                    RenewedOn: vRenewedOn,
                    RenewedDate: item.RenewedDate,
                    NextRenewalDate: item.NextRenewalDate,
                    TermEndDate: item.TermEndDate,
                    Status: vStatus,
                    TermStatus: item.TermStatus,
                    Created: item.Created,
                    CreatedBy: item.CreatedBy,
                    Modified: vModified,
                    ModifiedBy: vModifiedBy,
                    RenewalType: vRenewalType,
                    RenewalNotes: item.RenewalNotes,
                    RenewalChecklist: item.RenewalChecklist,
                    RenewalNotificationInternal: item.RenewalNotificationInternal,
                    ContractTermEach: item.ContractTermEach,
                    ContractTermChoicesEach: item.ContractTermChoicesEach,
                    RenewalConfirmParticipantsXML: item.RenewalConfirmParticipantsXML,
                    RenewalConfirmParticipants: item.RenewalConfirmParticipants,
                    RenewalConfirmParticipantsCC: item.RenewalConfirmParticipantsCC,
                    RenewalConfirmSendDate: item.ContractConfirmSendDate,
                    ContractConfirmSendTerm: item.ContractConfirmSendTerm,
                    RowKey: item.RowKey
                },
                cache: false,
                success: function (data) {
                    swal("", "Renew Completed");
                    $("#viewMetadataUpForRenewal").dialog("close");
                    if ($('#dvContractsUpcomingRenewalsListAll').parents('.ui-dialog:visible').length == 1) {
                        $('#dvContractsUpcomingRenewalsListAll').dialog("close"); // Bug id: eO37591
                    }
                    GetRenewalHistoryALL();
                },
                error: function (data) {
                    $("#loadingPage").fadeOut();
                    $("#viewMetadataUpForRenewal").dialog("close");
                    if ($('#dvContractsUpcomingRenewalsListAll').parents('.ui-dialog:visible').length == 1) {
                        $('#dvContractsUpcomingRenewalsListAll').dialog("close"); // Bug id: eO37591
                    }
                },
                complete: function () {
                    $("#loadingPage").fadeOut();
                    $("#viewMetadataUpForRenewal").dialog("close");
                    if ($('#dvContractsUpcomingRenewalsListAll').parents('.ui-dialog:visible').length == 1) {
                        $('#dvContractsUpcomingRenewalsListAll').dialog("close"); // Bug id: eO37591
                    }
                }
            });
            //End Ajax
        }
    })

}

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
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + vContractID + '/changestatus?status=Expired',
                 type: 'PUT',
                 dataType: 'json',
                 headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                 data: vCancelNote,
                 cache: false,
                 success: function (result) {
                     $("#viewMetadataUpForRenewal").dialog("close");
                     if ($('#dvContractsUpcomingRenewalsListAll').parents('.ui-dialog:visible').length == 1) {
                         $('#dvContractsUpcomingRenewalsListAll').dialog("close"); // Bug id: eO37591
                     }
                     $("#loadingPage").fadeOut();
                     location = location;
                 },
                 error: function (data) {
                     $("#loadingPage").fadeOut();
                     $("#viewMetadataUpForRenewal").dialog("close");
                     if ($('#dvContractsUpcomingRenewalsListAll').parents('.ui-dialog:visible').length == 1) {
                         $('#dvContractsUpcomingRenewalsListAll').dialog("close"); // Bug id: eO37591
                     }
                 }
             });
         }
         return;
     });
}

function StopRenew() {

    $("#loadingPage").fadeIn();
    var ParticipantsXMl = "";

    if (vRenewalConfirmParticipantsXML == "") {
        $(vRenewaHistoryData).each(function (i, item) {
            if (item.RenewableTermName == vTermName) {
                //Start Ajax

                if (contractItem.RenewalConfirmParticipants != null) {

                    ParticipantsXMl += "<participants>";
                    if (contractItem.RenewalConfirmParticipants.indexOf(';') > -1) {
                        var slpit = contractItem.RenewalConfirmParticipants.split(';');
                        $(slpit).each(function (i, item) {
                            if (item.trim() != "")
                                ParticipantsXMl += "<participant><name>" + item.trim() + "</name><status>In Progress</status></participant>";
                        });
                        ParticipantsXMl += "</participants>";
                    }
                    else {
                        var Item = contractItem.RenewalConfirmParticipants;
                        if (Item.trim() != "")
                            ParticipantsXMl += "<participant><name>" + Item.trim() + "</name><status>In Progress</status></participant>";
                        ParticipantsXMl += "</participants>";
                    }

                }

                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + vContractID + '/renewalhistory',
                    type: 'Post',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                    data: {
                        ContractID: item.ContractID,
                        RenewableTermName: item.RenewableTermName,
                        RenewedFor: item.RenewedFor,
                        RenewedBy: item.RenewedBy,
                        RenewedOn: item.RenewedOn,
                        RenewedDate: item.RenewedDate,
                        NextRenewalDate: item.NextRenewalDate,
                        TermEndDate: item.TermEndDate,
                        Status: item.Status,
                        TermStatus: item.TermStatus,
                        Created: item.Created,
                        CreatedBy: item.CreatedBy,
                        Modified: item.Modified,
                        ModifiedBy: item.ModifiedBy,
                        RenewalType: item.RenewalType,
                        RenewalNotes: item.RenewalNotes,
                        RenewalChecklist: item.RenewalChecklist,
                        RenewalNotificationInternal: item.RenewalNotificationInternal,
                        ContractTermEach: item.ContractTermEach,
                        ContractTermChoicesEach: item.ContractTermChoicesEach,
                        RenewalConfirmParticipantsXML: ParticipantsXMl,
                        RenewalConfirmParticipants: contractItem.RenewalConfirmParticipants,
                        RenewalConfirmParticipantsCC: contractItem.RenewalConfirmParticipantsCC,
                        RenewalConfirmSendDate: contractItem.ContractConfirmSendDate,
                        ContractConfirmSendTerm: contractItem.ContractConfirmSendTerm,
                        RowKey: item.RowKey
                    },
                    cache: false,
                    success: function (data) {
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + vContractID + '/contractrenewalhistoryupdate?TermName=' + vTermName + '&Status=Rejected&User=' + localStorage.UserName,
                            type: 'POST',
                            dataType: 'json',
                            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                            data: {
                                "Comment": "",
                            },
                            cache: false,
                            success: function (Conrec) {
                                swal("", "Renew Stopped");
                                if ($('#dvContractsUpcomingRenewalsListAll').parents('.ui-dialog:visible').length == 1) {
                                    $('#dvContractsUpcomingRenewalsListAll').dialog("close"); // Bug id: eO37591
                                }
                                $("#viewMetadataUpForRenewal").dialog("close");
                                GetRenewalHistoryALL();
                            },
                            error: function (status) {

                                $("#loadingPage").fadeOut();
                                if ($('#dvContractsUpcomingRenewalsListAll').parents('.ui-dialog:visible').length == 1) {
                                    $('#dvContractsUpcomingRenewalsListAll').dialog("close"); // Bug id: eO37591
                                }
                                $("#viewMetadataUpForRenewal").dialog("close");
                            }
                        });
                    }
                });
            }
        });
    }
    else {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + vContractID + '/contractrenewalhistoryupdate?TermName=' + vTermName + '&Status=Rejected&User=' + localStorage.UserName,
            type: 'POST',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
            data: {
                "Comment": "",
            },
            cache: false,
            success: function (Conrec) {
                swal("", "Renew Stopped");
                if ($('#dvContractsUpcomingRenewalsListAll').parents('.ui-dialog:visible').length == 1) {
                    $('#dvContractsUpcomingRenewalsListAll').dialog("close"); // Bug id: eO37591
                }
                $("#viewMetadataUpForRenewal").dialog("close");
                GetRenewalHistoryALL();
            },
            error: function (status) {

                $("#loadingPage").fadeOut();
                if ($('#dvContractsUpcomingRenewalsListAll').parents('.ui-dialog:visible').length == 1) {
                    $('#dvContractsUpcomingRenewalsListAll').dialog("close"); // Bug id: eO37591
                }
                $("#viewMetadataUpForRenewal").dialog("close");
            }
        });
    }
}

function Authorize() {

    $("#loadingPage").fadeIn();
    var ParticipantsXMl = "";

    if (vRenewalConfirmParticipantsXML == "") {
        $(vRenewaHistoryData).each(function (i, item) {
            if (item.RenewableTermName == vTermName) {
                //Start Ajax

                if (contractItem.RenewalConfirmParticipants != null) {

                    ParticipantsXMl += "<participants>";
                    if (contractItem.RenewalConfirmParticipants.indexOf(';') > -1) {
                        var slpit = contractItem.RenewalConfirmParticipants.split(';');
                        $(slpit).each(function (i, item) {
                            if (item.trim() != "")
                                ParticipantsXMl += "<participant><name>" + item.trim() + "</name><status>In Progress</status></participant>";
                        });
                        ParticipantsXMl += "</participants>";
                    }
                    else {
                        var Item = contractItem.RenewalConfirmParticipants;
                        if (Item.trim() != "")
                            ParticipantsXMl += "<participant><name>" + Item.trim() + "</name><status>In Progress</status></participant>";
                        ParticipantsXMl += "</participants>";
                    }

                }

                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + vContractID + '/renewalhistory',
                    type: 'Post',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                    data: {
                        ContractID: item.ContractID,
                        RenewableTermName: item.RenewableTermName,
                        RenewedFor: item.RenewedFor,
                        RenewedBy: item.RenewedBy,
                        RenewedOn: item.RenewedOn,
                        RenewedDate: item.RenewedDate,
                        NextRenewalDate: item.NextRenewalDate,
                        TermEndDate: item.TermEndDate,
                        Status: item.Status,
                        TermStatus: item.TermStatus,
                        Created: item.Created,
                        CreatedBy: item.CreatedBy,
                        Modified: item.Modified,
                        ModifiedBy: item.ModifiedBy,
                        RenewalType: item.RenewalType,
                        RenewalNotes: item.RenewalNotes,
                        RenewalChecklist: item.RenewalChecklist,
                        RenewalNotificationInternal: item.RenewalNotificationInternal,
                        ContractTermEach: item.ContractTermEach,
                        ContractTermChoicesEach: item.ContractTermChoicesEach,
                        RenewalConfirmParticipantsXML: ParticipantsXMl,
                        RenewalConfirmParticipants: contractItem.RenewalConfirmParticipants,
                        RenewalConfirmParticipantsCC: contractItem.RenewalConfirmParticipantsCC,
                        RenewalConfirmSendDate: contractItem.ContractConfirmSendDate,
                        ContractConfirmSendTerm: contractItem.ContractConfirmSendTerm,
                        RowKey: item.RowKey
                    },
                    cache: false,
                    success: function (data) {

                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + vContractID + '/contractrenewalhistoryupdate?TermName=' + vTermName + '&Status=Renewed&User=' + localStorage.UserName,
                            type: 'POST',
                            dataType: 'json',
                            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                            data: {
                                "Comment": "",
                            },
                            cache: false,
                            success: function (Conrec) {
                                swal("", "Authorize Completed");
                                $("#viewMetadataUpForRenewal").dialog("close");
                                if ($('#dvContractsUpcomingRenewalsListAll').parents('.ui-dialog:visible').length == 1) {
                                    $('#dvContractsUpcomingRenewalsListAll').dialog("close"); // Bug id: eO37591
                                }
                                GetRenewalHistoryALL();
                            },
                            error: function (status) {

                                $("#loadingPage").fadeOut();
                                $("#viewMetadataUpForRenewal").dialog("close");
                                if ($('#dvContractsUpcomingRenewalsListAll').parents('.ui-dialog:visible').length == 1) {
                                    $('#dvContractsUpcomingRenewalsListAll').dialog("close"); // Bug id: eO37591
                                }
                            }
                        });
                    }
                });
            }
        });
    }
    else {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + vContractID + '/contractrenewalhistoryupdate?TermName=' + vTermName + '&Status=Renewed&User=' + localStorage.UserName,
            type: 'POST',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
            data: {
                "Comment": "",
            },
            cache: false,
            success: function (Conrec) {
                swal("", "Authorize Completed");
                $("#viewMetadataUpForRenewal").dialog("close");
                GetRenewalHistoryALL();
                if ($('#dvContractsUpcomingRenewalsListAll').parents('.ui-dialog:visible').length == 1) {
                    $('#dvContractsUpcomingRenewalsListAll').dialog("close"); // Bug id: eO37591
                }

            },
            error: function (status) {

                $("#loadingPage").fadeOut();
                $("#viewMetadataUpForRenewal").dialog("close");
                if ($('#dvContractsUpcomingRenewalsListAll').parents('.ui-dialog:visible').length == 1) {
                    $('#dvContractsUpcomingRenewalsListAll').dialog("close"); // Bug id: eO37591
                }
            }
        });
    }

}

//Rahul
function hidecounterparty(obj) {
    var divid = obj.parentNode.id;
    var id = obj.id;
    var valuetoshow;
    var showmoreid = id.replace('showless', '');
    UpForRenewal = $('#dvContractsUpcomingRenewalsListAll').is(":visible");
    AbouttoExpire = $('#dvContractsAboutToExpireListAll').is(":visible");
    if (UpForRenewal) {
        valuetoshow = $("#ContractsUpcomingRenewalsListAll").find("#" + showmoreid + '.PreserveSpace')[0];
        $(valuetoshow).show();
    }
    else if (AbouttoExpire) {
        valuetoshow = $("#ContractsAboutToExpireListAll").find("#" + showmoreid + '.PreserveSpace')[0];
        $(valuetoshow).show();
    }
    else
        $("#" + showmoreid).show();
    $(obj).hide();
    $(obj.parentNode).hide();
    valuetoshow = undefined;
    UpForRenewal = false;
    AbouttoExpire = false;
}

function ViewAll(ExtraCounter) {
    var valuetoShow;
    var divid = $(ExtraCounter).parent().parent().parent().find('div')[0].id;
    UpForRenewal = $('#dvContractsUpcomingRenewalsListAll').is(":visible");
    AbouttoExpire = $('#dvContractsAboutToExpireListAll').is(":visible");

    if (UpForRenewal)
        valuetoShow = $("#ContractsUpcomingRenewalsListAll").find("#" + divid + '.clsdivCounterparty')[0];

    else if (AbouttoExpire)
        valuetoShow = $("#ContractsAboutToExpireListAll").find("#" + divid + '.clsdivCounterparty')[0];

    else
        $('#' + divid).html('');
    var id = ExtraCounter.previousElementSibling.id;
    var MoreCounterparties = "";
    var more = ""
    var showless = '</br><a href="javascript:void(0);" style="color:#44a6d8 !important;font-size: 11px !important;" onclick="hidecounterparty(this);"  id="showless' + ExtraCounter.id + '">Show less</a>';
    var moreCounterparty = $('#' + id + '').html();
    if (moreCounterparty.indexOf('|') > -1) {
        var mcP = moreCounterparty.split('|');
        $(mcP).each(function (i, arritem) {
            if (arritem != "") {
                more += arritem + " /";

            }
        });
        more = more.substring(0, more.length - 1);
        MoreCounterparties += more;
        MoreCounterparties += showless;

        if (UpForRenewal) {
            $(valuetoShow).html(MoreCounterparties);
            $(valuetoShow).show();
        }
        else if (AbouttoExpire) {
            $(valuetoShow).html(MoreCounterparties);
            $(valuetoShow).show();
        }
        else {
            $('#' + divid).append(MoreCounterparties);
            $('#' + divid).show();

        }
        $(ExtraCounter).hide();

    }
    else { }
    MoreCounterparties = "";
    showless = "";
    valuetoShow = undefined;
    UpForRenewal = false;
    AbouttoExpire = false;
}

function checkAwaiting() {
    var participant = "";
    var article = "";
    var status = "";
    $('#AwaitingAuthorisationUL').html('');
    if (contractItem.RenewalConfirmParticipants != "") {
        if (contractItem.RenewalConfirmParticipantsXML !== "") {

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
                if (!(contractItem.RenewalConfirmParticipantsXML.indexOf(contractItem.RenewalConfirmParticipants) > -1)) {
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
            Renew();
        }
        else {
            $('#AwaitingAuthorisationUL').append(article);
            $("#browseAwaitingAuthorisation").dialog("option", "title", "Alert");
            $("#browseAwaitingAuthorisation").dialog("open");
        }

    }
    else {
        Renew();
    }

}

function continueRenewal() {
    Renew();
}

function showTermActivities(vContractID) {
    $("#ulActivityComment").html('<img src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/IContractDetails?contractid=' + vContractID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (mainmetadataFields) {
            var vMetadata = $(mainmetadataFields).find('Metadata');
            if ($(vMetadata).find("TermCommentsXML").length > 0) {
                $("#ulActivityComment").empty();
                var commentArr = [];
                var commentsxML = decodeURIComponent($(vMetadata).find("TermCommentsXML")[0].innerHTML);
                $(commentsxML).find("RenewalComment").each(function () {
                    var dateText = $(this).find("Created").text()

                    var item = {
                        activity: $(this).find('Activity').text(),
                        comment: $(this).find('Comments').text(),
                        sendto: $(this).find('SendTo').text(),
                        created: new Date(dateText)
                        /* other properties*/
                    }
                    /* push object to array*/
                    commentArr.push(item);

                });

                if (commentArr.length > 0) {
                    commentArr.sort(function (a, b) {
                        return a.created < b.created;
                    });
                    var htmlComment = '';
                    $.each(commentArr, function (index, item) {
                        if (index < 3) {
                            htmlComment += '<li><b class="color_lightgrey"><span class="color_dark" style="margin-right: 20px;">Activity: </span>' + item.activity + '</b><br><br><b class="color_dark float_left" style="margin-right: 7px;">Comment: </b><div class="taskcomment"><span> ' + item.comment + '</span></div></li>';
                        }
                        else {
                            htmlComment += '<li class="moreComments" style="display:none;"><b class="color_lightgrey"><span class="color_dark" style="margin-right: 20px;">Activity: </span>' + item.activity + '</b><br><br><b class="color_dark float_left" style="margin-right: 7px;">Comment: </b><div class="taskcomment"><span> ' + item.comment + '</span></div></li>';

                        }
                    });
                    if (commentArr.length > 3) {
                        htmlComment += '<li style="border: none;"><a href="javascript:void(0);" onclick="showAllActivities(this)" style="color: #44a6d8;">Show Older</a></li>';
                    }

                    $("#ulActivityComment").append(htmlComment);
                }

            }
            else {
                $("#ulActivityComment").empty();
                $("#ulActivityComment").append('<li style="border: none;"><b class="color_lightgrey"><span class="color_dark" style="margin-right: 20px;">No Activities found</span></b></li>');
            }
        },
        error: function (mainmetadataFields) {
            $("#ulActivityComment").empty();
            $("#ulActivityComment").append('<li style="border: none;"><b class="color_lightgrey"><span class="color_dark" style="margin-right: 20px;">No Activities found</span></b></li>');
        }
    });
}