//var vApiBaseSiteUrl = 'http://localhost:63571/';
var start = moment(localStorage.LoginTime);
var end = moment(new Date());
var vv = end.diff(start, "minutes");
var businessarearowkeyname = null;
var contractarearowkeyname = null;
//manoj
//Data table Alphabet search
var _alphabetSearch = '';
var numberindex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
//Data table Alphabet search
//manoj

//timeout_init(); 
//Added from 2.4final to 2.4
//var vWorkflowItem = "";
//var vContractDocument = "";
//var vBusinessArea = [];
//
function timeout_trigger() {
    //$.post('/Settings/SetSession', { accountID: localStorage.AccountID, SPHostUrl: localStorage.SPHostUrl, userName: localStorage.UserName, APIKey: localStorage.APIKey, oEmail: localStorage.OEmail, userTitle: localStorage.UserTitle, userID: localStorage.UserID });
    //$.post("/Settings/SetSession", { accountID: localStorage.AccountID, SPHostUrl: localStorage.SPHostUrl, userName: localStorage.UserName, APIKey: localStorage.APIKey, oEmail: localStorage.OEmail, userTitle: localStorage.UserTitle, userID: localStorage.UserID }, function (sucess) {
    //});
    $.ajax({
        url: '/Settings/SetSession',
        type: 'POST',
        dataType: 'json',
        headers: {
            'AntiReqVerificationToken': $("#forgeryToken").val(), 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging
        },
        data: {
            AccountID: localStorage.AccountID,
            SPHostUrl: localStorage.SPHostUrl,
            UserName: localStorage.UserName,
            APIKey: localStorage.APIKey,
            OEmail: localStorage.OEmail,
            UserTitle: localStorage.UserTitle,
            UserID: localStorage.UserID
        },
        cache: false,
        success: function (person) {

        }
    });


    var start = moment(localStorage.eContractUserNotoficationTime);
    var end = moment(new Date());
    var vv = end.diff(start, "minutes");
    if (vv >= 5)
        MyNotificationList();
    start = moment(localStorage.eContractUserTaskTime);
    end = moment(new Date());
    vv = end.diff(start, "minutes");
    if (vv >= 5)
        MyTaskList();
    timeout_init();
}

function timeout_init() {
    setTimeout('timeout_trigger()', 300000);
}

$('#nav li:has(ul)').doubleTapToGo();
//Added from 2.4final to 2.4
$(document).ready(function () {
    //GetContractDocument();
    //getWorkflow();
    //getBusinessArea();
    var boxWidth = $(".sidenav").width();


    $("#mySidenavAlert").click(function () {
        $(".sidenav").animate({
            width: boxWidth
        });
    });
    $("#mySidenav").click(function () {
        $(".sidenav").animate({
            width: boxWidth
        });
    });
    document.getElementById("mySidenavAlert").style.border = "0px";
    document.getElementById("mySidenav").style.border = "0px";

});
$('#mySidenav').click(function (e) {
    e.stopImmediatePropagation();
});
$('#mySidenavAlert').click(function (e) {
    e.stopImmediatePropagation();
});
//2.4
$(function () {
    if (typeof localStorage.eContractFeatures === "undefined") {
        //alert("undefined");
        GetFeatures(false);
    }
    else {
        //alert("defined");
        ActivatedFeatureList();
    }
    if (typeof localStorage.AppAccountStatus === "undefined")
        GetAccountStatus();
    if (typeof localStorage.GlobalBusinessAreaLocation === 'undefined') {
        localStorage.setItem("GlobalBusinessArea", "All");
        localStorage.setItem("GlobalBusinessAreaLocation", "All");
        localStorage.setItem("IsGeneralBusinessArea", "");
    }
    if (typeof localStorage.AppDateFormat === "undefined")
        GetApplicationDateFormat();
    if (typeof localStorage.eContractUserNames !== "undefined")
        BindUserNames();


    //Sridhar
    $('.form-contro-Date, .form-contro-Date-Document').on("paste", function (e) {
        e.preventDefault();
    });
    //Sridhar  
    BindUsers();
    GetUserPermission();

    //GetAccountStatus();
    //GetApplicationDateFormat();
    $(".Alignment").on("input", function () {
        $this = $(this);
        // replace all closing block tags with special token
        $this.html($this.html().replace(/(\<\/p\>|\<\/h1\>|\<\/h2\>|\<\/h3\>|\<\/h4\>|\<\/h5\>|\<\/h6\>|\<\/div\>|\<\/span\>|\<\/table\>|\<\/td\>|\<\/tr\>|\<\/tbody\>|\<\/th\>)/gi, "[p]").replace(/\<br\>/gi, "[br]"));

        // remove all the tags
        $this.html($this.text().replace(/\[p\]/g, "").replace(/\[br\]/g, ""));

    });
    $("#mainContent").click(function () {
        if (!$('#user-vmenu').hide()) {
            $('#user-vmenu').hide();
        }
        if (!$('#setting-vmenu').hide()) {
            $('#setting-vmenu').hide();
        }
    })
    $("#art-vmenu").click(function (e) {
        e.stopPropagation();
        if (!$('#user-vmenu').hide()) {
            $('#user-vmenu').hide();
        }
        else {
            $('#user-vmenu').show();
        }
        if (!$('#setting-vmenu').hide()) {
            $('#setting-vmenu').hide();
        }
    })
    $("#dvAlertDetails").dialog({
        autoOpen: false,
        closeText: "",
        width: "80%",
        title: "Alert",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "OK": function () { $(this).dialog("close"); }
        }
    });

    $("#liSettings").click(function (e) {
        e.stopPropagation();
        if (!$('#setting-vmenu').hide()) {
            $('#setting-vmenu').hide();
        }
        else {
            $('#setting-vmenu').show();
        }
        if (!$('#user-vmenu').hide()) {
            $('#user-vmenu').hide();
        }
    })

    $("#browseBA_Layouts").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        height: 600,
        title: "Users",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "Close": function () {
                $(this).dialog("close");
            }
        }
    });
    $("#userName").html(localStorage.UserTitle);
    $("#userFullName").html(localStorage.UserName);
    $("#txtDueDate").datepicker({ onClose: function () { this.focus(); } });

    $("#dvTodo").dialog({
        autoOpen: false,
        closeText: "",
        width: "60%",
        title: "Create a Task",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "Save": function () { SaveTodo(); },
            Cancel: function () {
                $('#ddlTodoType').removeAttr('disabled');
                $(this).dialog("close");
                $('input[type=checkbox][name="MultipleDocuments"]:checked').prop("checked", false);
                $("#btnDocumentReview").css('display', 'none');
            }
        }
    });


    $("#dvViewUserProfile").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "User Profile",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "Close": function () {
                $(this).dialog("close");
            }
        }
    });
    $("#dvBrowse").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Todo",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "OK": function () { SelectElement(); $(this).dialog("close"); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
    $('.showtip').cluetip({ splitTitle: '|', arrows: true });

    $('#txtSearchBoxTodoForm').keypress(function (e) {
        if ($('#txtSearchBoxTodoForm').val() != "") {
            if (e.keyCode == 13)
                Search();
        }
    });

    //if (localStorage.UserID == '')
    //    location = "/Error/UserDisabled";



    var vPathname = location.pathname;
    var querystr = location.search;

    if (vPathname == "/") {
        $("#aNavDashboard").addClass('actNav');
        $("#bNavDashboard").removeClass('dashBoard');
        $("#bNavDashboard").addClass('act-dash');
    }
    else if (vPathname.indexOf("/Home") == 0) {
        $("#aNavDashboard").addClass('actNav');
        $("#bNavDashboard").removeClass('dashBoard');
        $("#bNavDashboard").addClass('act-dash');
    }
    else if (vPathname.indexOf("/Activity") == 0) {
        $("#aNavActivities").addClass('actNav');
        $("#bNavActivities").removeClass('activit_1');
        $("#bNavActivities").addClass('act-activit');
    }
    else if (vPathname.indexOf("/Pipeline/Requests") == 0 || vPathname.indexOf("/Pipeline/RequestDetails") == 0 || vPathname.indexOf("/Pipeline/CreateRequest") == 0
        || vPathname.indexOf("/Pipeline/EditRequest") == 0) {
        $("#aNavRequests").addClass('actNav');
        $("#bNavRequests").removeClass('requests_1');
        $("#bNavRequests").addClass('act-requests');
    }
    else if (vPathname.indexOf("/Contracts/ContractDetails") == 0) {
    }
    else if ((vPathname.indexOf("/Pipeline") == 0) || querystr.indexOf("?Type=pipeline") == 0 || querystr.indexOf("Stage=pipeline") > -1) {
        $("#aNavPipeline").addClass('actNav');
        $("#bNavPipeline").removeClass('pipeline_1');
        $("#bNavPipeline").addClass('act-pipeline');
    }
    else if (vPathname.indexOf("/Contracts/Documents") == 0) {
        $("#aNavContracts").addClass('actNav');
        $("#bNavContracts").removeClass('contrac_1');
        $("#bNavContracts").addClass('act-contrac');
    }
    else if (vPathname.indexOf("/Contracts") == 0) {
        $("#aNavContracts").addClass('actNav');
        $("#bNavContracts").removeClass('contrac_1');
        $("#bNavContracts").addClass('act-contrac');
    }
    else if (vPathname.indexOf("/Documents") == 0) {
        $("#aNavContracts").addClass('actNav');
        $("#bNavContracts").removeClass('contrac_1');
        $("#bNavContracts").addClass('act-contrac');
    }
    else if (vPathname.indexOf("/Counterparty") == 0) {
        $("#aNavCounterparties").addClass('actNav');
        $("#bNavCounterparties").removeClass('counterP');
        $("#bNavCounterparties").addClass('act-counter');
    }
    else if (vPathname.indexOf("/Reports") == 0) {
        $("#aNavInsights").addClass('actNav');
        $("#bNavInsights").removeClass('insighT');
        $("#bNavInsights").addClass('act-insigh');
    }

    //MyTaskList();
    //MyNotificationList();
    if (typeof localStorage.eContractUserNotoficationList === "undefined") {
        $('#ulcontentalert').html('<li class="alertsli bordertopnone"><h3 class="alertsh3">Alerts</h3></li>');
        $('#ulcontentalert').append('<img src="../Content/Images/icon/loading.gif"/>');
        MyNotificationList();
    }
    else
        MyNotificationListFromLocal();
    if (typeof localStorage.eContractUserTaskList === "undefined") {
        $('#ulcontenttasks').html('<li class="alertsli bordertopnone"><h3 class="alertsh3">Tasks</h3></li>');
        $('#ulcontenttasks').append('<img src="../Content/Images/icon/loading.gif"/>');
        MyTaskList();
    }
    else
        MyTaskListFromLocal();

    MenuBasedOnBALocation();
    $('.OnPageLoad').css("display", "none");
    if (localStorage.AppAccountStatus == null || localStorage.AppAccountStatus == "" || localStorage.AppAccountStatus == "Suspend" || localStorage.AppAccountStatus == "Deactivate") {
        $('#mainContent').css("display", "none");
    }
    else {
        $('#mainContent').css("display", "");
    }
});

//eO310465 && eO310467
$('.validatebracket').keyup(function (e) {
    var yourInput = $(this).val();
    if (e.keyCode == 16 || e.keyCode == 17) {
        var no_angular_bracket = yourInput.replace(/[<>]/g, '');
        $(this).val(no_angular_bracket);
    }
});

function GetAccountStatus() {
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/LicenseLimit',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        //async: false,//Performance Optimization
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (entity) {
            if (localStorage.AppAccountStatus == null || localStorage.AppAccountStatus == "" || localStorage.AppAccountStatus == "Suspend" || localStorage.AppAccountStatus == "Deactivate") {
                $('#mainContent').css("display", "none");
            }
            else {
                $('#mainContent').css("display", "");
            }
            localStorage.AppAccountStatus = entity.Status;
            var status = entity.Status;

            if (status == "Expire") {
                $("#divlayoutStatus").addClass(".width98 bg-warning margin-0px")
                $('#txtlayoutStatus').text("Account has Expired");
            }
            else if (status == "Suspend") {
                $("#divlayoutStatus").addClass(".width98 bg-warning margin-0px")
                $('#txtlayoutStatus').text("Suspended Account");
            }
            else if (status == "Deactivate") {
                $("#divlayoutStatus").addClass(".width98 bg-warning margin-0px")
                $('#txtlayoutStatus').text("Account Deactivated");
            }

        }
    });
}


function GetApplicationDateFormat() {
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/AccountSetting',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        //async: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            localStorage.AppDateFormat = data.DateFormat;
        },
        error: function (data) {
            localStorage.AppDateFormat = "MM/DD/YYYY";
        }
    });
}

function GetFeatures(vasync) {
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/feature',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        async: vasync,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            localStorage.setItem("eContractFeatures", JSON.stringify(data));
            var vAccFeatList = data;
            var vAccFeat = $.grep(vAccFeatList, function (n, i) {
                return (n.RowKey == "6" && n.Status == "ON");
            });
            if (vAccFeat.length > 0) {
                $(".FL_Counterparty").css('display', '');
            }
            vAccFeat = $.grep(vAccFeatList, function (n, i) {
                return (n.RowKey == "7" && n.Status == "ON");
            });
            if (vAccFeat.length > 0) {
                $(".FL_Automation").css('display', '');
            }
            vAccFeat = $.grep(vAccFeatList, function (n, i) {
                return (n.RowKey == "2" && n.Status == "ON");
            });
            if (vAccFeat.length > 0) {
                $(".FL_Obligations").css('display', '');
            }
            vAccFeat = $.grep(vAccFeatList, function (n, i) {
                return (n.RowKey == "8" && n.Status == "ON");
            });
            if (vAccFeat.length > 0) {
                $(".FL_WF_Rule").css('display', '');
            }
            vAccFeat = $.grep(vAccFeatList, function (n, i) {
                return (n.RowKey == "12" && n.Status == "ON");
            });
            if (vAccFeat.length > 0) {
                $(".FL_RequestsLayout").css('display', '');
                $(".FL_Requests").css('display', '');
            }
            else {
                $(".FL_RequestsLayout").css('display', 'none');
                $(".FL_Requests").css('display', 'none');
            }
            vAccFeat = $.grep(vAccFeatList, function (n, i) {
                return (n.RowKey == "11" && n.Status == "ON");
            });
            if (vAccFeat.length > 0) {
                $(".FL_Project").css('display', '');
            }
            vAccFeat = $.grep(vAccFeatList, function (n, i) {
                return (n.RowKey == "16" && n.Status == "ON");
            });
            if (vAccFeat.length > 0) {
                $(".FL_Pipeline").css('display', '');
            }
            vAccFeat = $.grep(vAccFeatList, function (n, i) {
                return (n.RowKey == "38" && n.Status == "ON");
            });
            if (vAccFeat.length > 0) {
                $(".EscalationFeature").css('display', '');
            }
            else {
                $(".EscalationFeature").css('display', 'none');
            }
            vAccFeat = $.grep(vAccFeatList, function (n, i) {
                return (n.RowKey == "29" && n.Status == "ON");
            });
            if (vAccFeat.length > 0) {
                if (typeof localStorage.CompanyBrandingLogo === "undefined") {
                    $.ajax({
                        url: '/Accounts/GetAccountSetting?accountid=' + localStorage.AccountID,
                        type: 'GET',
                        async: vasync,
                        dataType: 'json',
                        cache: false,
                        success: function (AccountSetting) {
                            if (AccountSetting.CompanyLogo != "") {
                                localStorage.setItem("CompanyBrandingLogo", AccountSetting.CompanyLogo);
                                $(".FL_CompanyBrandingLogo").attr("src", AccountSetting.CompanyLogo);
                                $(".FL_CompanyBrandingLogo").css('display', '');
                            }
                            else {
                                $(".FL_CompanyBrandingLogo").css('display', '');
                                localStorage.setItem("CompanyBrandingLogo", '/Content/Images/logo.png');
                            }
                        }
                    });
                }
                else {
                    if (localStorage.CompanyBrandingLogo != "/Content/Images/logo.png") {
                        $(".FL_CompanyBrandingLogo").attr("src", localStorage.CompanyBrandingLogo);
                        $(".FL_CompanyBrandingLogo").css('display', '');
                    }
                    else {
                        $(".FL_CompanyBrandingLogo").css('display', '');
                    }

                }
            }
            else {
                $(".FL_CompanyBrandingLogo").css('display', '');
            }


        },
        error: function (data) {
            var vvvv = "";
        }
    });
}

$(".chosen-drop").click(function () {
    $("html, body").animate({ scrollTop: $(document).height() }, "slow");
});

function GetUserPermission() {
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/users?userid=' + localStorage.UserID + '&office365emailid=',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        //async: false,//Performance Optimization
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            if (data.IsEnabled == "No") {
                location = "/Error/UserDisabled";
            }
            localStorage.setItem("UserType", data.UserType);
            localStorage.setItem("DefaultBusinessArea", data.DefaultBusinessArea);
            CheckGlobalSettings();
            $("#userDesignation").html(data.UserType);
            if (data.ProfilePicture != null && data.ProfilePicture != "") {
                $("#imgProfile").attr('src', data.ProfilePicture);
                $("#imgProfileLogo").attr('src', data.ProfilePicture);
                $('.profile_1').html('<img src="' + data.ProfilePicture + '" style="height: 20px; width: 20px; padding-right: 10px;" />');
            }
            else if (data.ProfilePicture == null || data.ProfilePicture == "") {
                $("#imgProfile").attr('src', "/Content/Images/my-proffil.png");
                $("#imgProfileLogo").attr('src', "/Content/Images/my-proffil-logo.png");
            }
            var vAdminAccess = 'No';
            var vAccountAccess = 'No';
            var vOrgAccess = 'No'; // For Global Contract Owner and Global Administrator
            var vOrgAccess1 = 'No'; // For Contract Area Administrator and Business Area Owner
            var vGlobalInsight = 'No'; // For Contract Area Administrator and Business Area Owner
            if (localStorage.AppAccountStatus == "Suspend") {
                $('#divlayoutStatusSettings').css("display", "");

            }
            else {
                $('#divlayoutStatusSettings').css("display", "none");
            }


            if (data.UserType.indexOf("Global Contract Owner") >= 0) {
                vAdminAccess = 'Yes';
                vOrgAccess = 'Yes';
                vGlobalInsight = 'Yes';
            }
            if (data.UserType.indexOf("Global Administrator") >= 0) {
                vAdminAccess = 'Yes';
                vOrgAccess = 'Yes';
                vGlobalInsight = 'Yes';
            }
            if (data.UserType.indexOf("Account Owner") >= 0) {
                vAccountAccess = 'Yes';
                vGlobalInsight = 'Yes';
            }
            if (data.UserType.indexOf("Contract Area Administrator") >= 0) {
                vOrgAccess1 = 'Yes';
                vGlobalInsight = 'Yes';
            }
            if (data.UserType.indexOf("Business Area Owner") >= 0) {
                vOrgAccess1 = 'Yes';
                vGlobalInsight = 'Yes';
            }
            var UserType = $.map(data.UserType.split(";"), $.trim);
            //if (data.UserType.indexOf("Global Administrator") >= 0 && UserType.length == 2) {
            //    vGlobalInsight = 'No';
            //}
            var UserType = $.map(data.UserType.split(";"), $.trim);
            if (data.UserType.indexOf("Account Owner") >= 0 && UserType.length == 2) {
                vGlobalInsight = 'No';
            }
            //eO39791
            var Permission = {
                DocumentPermission: data.PermOnDocuments,
                CounterpartyPermission: data.PermOnCounterparty,
                UserType: data.UserType,
                AdminAccess: vAdminAccess,
                AccountAccess: vAccountAccess,
                OrgAccess: vOrgAccess,
                OrgAccess1: vOrgAccess1,
                OwnerOfAreas: data.OwnerOfBusinessAreas
            };
            localStorage.setItem("Permission", JSON.stringify(Permission));
            if (Permission != null) {
                if ((Permission.AdminAccess == 'No' || Permission.AdminAccess == '') && (Permission.AccountAccess == 'No' || Permission.AccountAccess == '')
                     && (Permission.OrgAccess == 'No' || Permission.OrgAccess == '') && (Permission.OrgAccess1 == 'No' || Permission.OrgAccess1 == '')) {
                    $(".Perm_Settings").css("display", "none");
                }
                else {
                    $(".Perm_Settings").css("display", "");
                    if (Permission.AdminAccess == 'No' || Permission.AdminAccess == '') {
                        $(".Perm_AdminAccess").css("display", "none");
                        $(".Perm_AdminAccessLayout").css("display", "none");

                    }
                    else {
                        $(".Perm_AdminAccessLayout").css("display", "");
                        var eContractFeaturesAll = JSON.parse(localStorage.getItem("eContractFeatures"));
                        var eContractFeaturesPL = [];
                        if (eContractFeaturesAll != null) {
                            eContractFeaturesPL = $.grep(eContractFeaturesAll, function (n, i) {
                                return (n.RowKey == "17" && n.Status == "ON");
                            });
                        }
                        if (eContractFeaturesPL != null && eContractFeaturesPL.length > 0) {
                            $(".FL_TermsandClausesLayout").css("display", "");
                        }
                        else {
                            $(".FL_TermsandClausesLayout").css("display", "none");
                        }
                        eContractFeaturesPL = [];
                        eContractFeaturesPL = $.grep(eContractFeaturesAll, function (n, i) {
                            return (n.RowKey == "7" && n.Status == "ON");
                        });
                        if (eContractFeaturesPL != null && eContractFeaturesPL.length > 0) {
                            $(".FL_AutomationLayout").css("display", "");
                        }
                        else {
                            $(".FL_AutomationLayout").css("display", "none");
                        }
                    }
                    if (Permission.AccountAccess == 'No') {
                        $(".Perm_AccountAccess").css("display", "none");
                    }
                    if (Permission.OrgAccess == 'No') {
                        $(".Perm_OrgAccess").css("display", "none");
                    }
                    if (Permission.OrgAccess1 == 'No' || Permission.OrgAccess == 'Yes') {
                        $(".Perm_OrgAccess1").css("display", "none");
                    }
                    if (vGlobalInsight == "No") {
                        $(".Perm_GlobalInsight").css("display", "none");
                    }
                }
            }

            var BAreaAccess = data.BusinessArea + ";" + data.BusinessAreaContribute + ";" + data.OwnerOfBusinessAreas;
            var newArray = BAreaAccess.split(';').filter(function (v) { return v !== '' }); // remove empty
            BusinessAreaAccess = newArray;
            localStorage.setItem("BusinessAreaAccess", newArray);
            //getbusinessareapath();
            localStorage.setItem("OwnerOfBusinessAreas", data.OwnerOfBusinessAreas);
            var BAreaAccessWithRead = data.BusinessArea + ";" + data.BusinessAreaContribute + ";" + data.BusinessAreaRead + ";" + data.OwnerOfBusinessAreas;
            var newArrayWithRead = BAreaAccessWithRead.split(';').filter(function (v) { return v !== '' }); // remove empty
            BusinessAreaAccessWithRead = newArrayWithRead;
            /* Menu Start */
            $(".business-area").empty();
            articleBusinessArea += '<li class="myboard-pading"><a href="javascript:baclickmydashboard();"><img  src="/Content/images/icon/my-dashboard.png""/><span><b class="set-myboard">My Dashboard</b></span></a></li>'

            if (data.UserType.indexOf("Global Contract Owner") >= 0) {
                articleBusinessArea += '<li><a  class="js-open-modal business_viewmore myboard-pading" href="javascript:GlobalContractAdminView();" data-modal-id="popup1"><span>Switch to Business Area Dashboard</span></a></li>'
                $(".business-area").append(articleBusinessArea);
                articleBusinessArea = "";
            }
            else {
                // articleBusinessArea += '';

                //get distinct    
                var uniqueBAAccess = BusinessAreaAccessWithRead.filter(function (itm, i, BusinessAreaAccessWithRead) { return i == BusinessAreaAccessWithRead.indexOf(itm); });
                var articleBusinessAreaDetails = "<li><b class='set-recentcont bussiness-area-head'>Switch to Business Area Dashboard</b></li><li><ul id='ulbusinessarealayout' style='position: static;max-height: 300px;d;overflow-x: hidden;width: 100%;display: block;opacity: 1;background-color: transparent;box-shadow: inherit;'>";
                var hasBusinessArea = false;
                $(uniqueBAAccess).each(function (i, item) {
                    hasBusinessArea = true;
                    var bapath = item.split('>');
                    var baname = bapath[bapath.length - 1];
                    articleBusinessAreaDetails += '<li><a href="javascript:void(0);" onclick="javascript: baclick(this);"><img src="/Content/images/icon/gen.png" /><span style="float:left;"><small style="">' + item + '</small><b>' + baname + '</b></span></a></li>';
                });

                if (!hasBusinessArea) {
                    articleBusinessArea += '<li><b class="set-recentcont bussiness-area-head">No Business Area Assigned</b></li>';
                } else {
                    articleBusinessArea += articleBusinessAreaDetails + "</ul></li>";
                }
                articleBusinessAreaDetails = '';

                articleBusinessArea += '<li class="business_border"><a  class="js-open-modal business_viewmore myboard-pading" href="javascript:baclickviewall();" data-modal-id="popup1"><span>View All</span></a></li>'
                $(".business-area").append(articleBusinessArea);
                articleBusinessArea = "";

            }

            if (typeof localStorage.GlobalBusinessAreaLocation !== 'undefined') {
                if (localStorage.GlobalBusinessAreaLocation == "All") {
                    var eContractFeaturesAll = JSON.parse(localStorage.getItem("eContractFeatures"));
                    var eContractFeaturesPL = [];
                    if (eContractFeaturesAll != null) {
                        eContractFeaturesPL = $.grep(eContractFeaturesAll, function (n, i) {
                            return (n.RowKey == "16" && n.Status == "ON");
                        });
                    }
                    if (localStorage.GlobalBusinessAreaLocation == "All" || (typeof (localStorage.BusinessAreaAccess) != "undefined" ? localStorage.BusinessAreaAccess.indexOf(localStorage.GlobalBusinessAreaLocation) >= 0 : false) || (typeof (localStorage.UserType) != "undefined" ? localStorage.UserType.indexOf("Global Contract Owner") >= 0 : false) || localStorage.IsGeneralBusinessArea == "Yes") {
                        $(".UserPermisionCon").css('display', '');
                        $(".UserPermisionConLayout").css('display', '');
                        if (eContractFeaturesPL != null && eContractFeaturesPL.length > 0) {
                            $(".UserPermisionPL").css('display', '');
                            $(".UserPermisionPLLayout").css('display', '');
                        }
                        else {
                            $(".UserPermisionPL").css('display', 'none');
                            $(".UserPermisionPLLayout").css('display', 'none');
                        }
                    }
                } else {


                    var busaryrowkey = "";
                    var conaryrowkay = "";

                    $.ajax({
                        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/businessarea/aslistitem',
                        type: 'GET',
                        dataType: 'json',
                        'Content-Type': 'application/json',
                        headers: { 'eContracts-ApiKey': localStorage.APIKey },
                        success: function (datacheck) {
                            $(datacheck).each(function (i, item) {
                                if (item.ParentBusinessAreaID != 0) {
                                    if (item.RowKey == "GenBA") {
                                        busaryrowkey = item.BusinessAreaName;
                                    }
                                } else {
                                    if (item.RowKey == "GenCA") {
                                        conaryrowkay = item.BusinessAreaName;
                                    }
                                }
                            });
                            var finalvaluerowkey = conaryrowkay + " > " + busaryrowkey;
                            $("#dashmain").attr("src", "/Content/images/icon/gen.png");
                            if (newArrayWithRead.indexOf(localStorage.GlobalBusinessAreaLocation) == -1 && data.UserType.indexOf("Global Contract Owner") == -1 && localStorage.GlobalBusinessAreaLocation != finalvaluerowkey) {
                                localStorage.setItem("GlobalBusinessArea", "All");
                                localStorage.setItem("GlobalBusinessAreaLocation", "All");
                                localStorage.setItem("IsGeneralBusinessArea", "");
                            }

                            var eContractFeaturesAll = JSON.parse(localStorage.getItem("eContractFeatures"));
                            var eContractFeaturesPL = [];
                            if (eContractFeaturesAll != null) {
                                eContractFeaturesPL = $.grep(eContractFeaturesAll, function (n, i) {
                                    return (n.RowKey == "16" && n.Status == "ON");
                                });
                            }
                            if (localStorage.BusinessAreaAccess.indexOf(localStorage.GlobalBusinessAreaLocation) >= 0 || localStorage.UserType.indexOf("Global Contract Owner") >= 0 || localStorage.IsGeneralBusinessArea == "Yes") {
                                $(".UserPermisionCon").css('display', '');
                                $(".UserPermisionConLayout").css('display', '');
                                if (eContractFeaturesPL != null && eContractFeaturesPL.length > 0) {
                                    $(".UserPermisionPLLayout").css('display', '');
                                    $(".UserPermisionPL").css('display', '');
                                }
                                else {
                                    $(".UserPermisionPLLayout").css('display', 'none');
                                    $(".UserPermisionPL").css('display', 'none');
                                }

                            } else {
                                $(".UserPermisionCon").css('display', 'none');
                                $(".UserPermisionPLLayout").css('display', 'none');
                                $(".UserPermisionConLayout").css('display', 'none');
                                $(".UserPermisionPL").css('display', 'none');
                            }


                        },
                        error:
                            function (data) {

                            }
                    });
                }
            }
        },
        error:
            function (data) {
                location = "/Error/UserDisabled";
                var vv = 'aa';
            }
    });
}

function ViewAllBusinessArea() {
    $("#loadingPage").fadeIn();
    $('#tbodyBusinessArea').empty();
    /* Business Area Popup Start */
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/businessarea/entities',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            getbusinessareapath1();
            recursiveIteration(data)
            $("#tbodyBusinessArea").append(articleBusinessArea);
            if (articleBusinessArea == "") {
                $("#tbodyBusinessArea").append("<tr><td><p class='f_p-error'>No items found.</p></td></tr>");
            }
            articleBusinessArea = "";
            $("#example-basic-1").treetable({ expandable: true, initialState: "expanded" });
            $("#loadingPage").fadeOut();
            $("#browseBA_Layouts").dialog("option", "title", "Select Business Area");
            $("#browseBA_Layouts").dialog("open");
        },
        error:
            function (data) {
                if (articleBusinessArea == "") {
                    $('#tbodyBusinessArea').empty();
                    $("#tbodyBusinessArea").append("<tr><td><p class='f_p-error'>No items found.</p></td></tr>");
                    $("#loadingPage").fadeOut();
                    $("#browseBA_Layouts").dialog("option", "title", "Select Business Area");
                    $("#browseBA_Layouts").dialog("open");
                }
            }
    });
    /* Business Area Popup End */
}

function ViewAllBusinessAreaForGlobal() {

    $("#loadingPage").fadeIn();
    $('#tbodyBusinessArea').empty();
    /* Business Area Popup Start */
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/businessarea/entities',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            recursiveIterationGlobalContractAdmin(data)
            $("#tbodyBusinessArea").append(articleBusinessArea);
            if (articleBusinessArea == "") {
                $("#tbodyBusinessArea").append("<tr><td><p class='f_p-error'>No items found.</p></td></tr>");
            }
            articleBusinessArea = "";
            $("#example-basic-1").treetable({ expandable: true, initialState: "expanded" });
            $("#loadingPage").fadeOut();
            $("#browseBA_Layouts").dialog("option", "title", "Select Business Area");
            $("#browseBA_Layouts").dialog("open");
        },
        error:
            function (data) {
                if (articleBusinessArea == "") {
                    $('#tbodyBusinessArea').empty();
                    $("#tbodyBusinessArea").append("<tr><td><p class='f_p-error'>No items found.</p></td></tr>");
                    $("#loadingPage").fadeOut();
                    $("#browseBA_Layouts").dialog("option", "title", "Select Business Area");
                    $("#browseBA_Layouts").dialog("open");
                }
            }
    });
    /* Business Area Popup End */
}

function MenuBasedOnBALocation() {
    if (typeof localStorage.GlobalBusinessAreaLocation != 'undefined') {
        if (localStorage.GlobalBusinessAreaLocation == "All") {
            $("#heading_dashboard").text("My Dashboard");
            $("#heading_contracts").text("Contract Records");
            $("#heading_requests").text("Requests");
            $("#heading_pipeline").text("Pipeline");
            $("#bNavDashboard").html("My Dashboard");
            $("#bNavActivities").html("My Activities");
            $("#bNavContracts").html("My Contracts");
            $("#bNavPipeline").html("My Pipeline");
            $("#bNavRequests").html("My Requests");
            $("#liNavCounterparty").css('display', 'none');
            $("#liNavInsights").css('display', 'none');
            $("#bNavDashboardMob").html("My Dashboard");
            $("#bNavActivitiesMob").html("My Activities");
            $("#bNavContractsMob").html("My Contracts");
            $("#bNavPipelineMob").html("My Pipeline");
            $("#bNavRequestsMob").html("My Requests");
            $("#liNavCounterpartyMob").css('display', 'none');
            $("#liNavInsightsMob").css('display', 'none');
            $(".DashboardType").html("My");
        } else {
            $("#heading_dashboard").empty();
            $("#heading_dashboard").text(localStorage.GlobalBusinessAreaLocation);
            $("#heading_contracts").empty();
            $("#heading_contracts").text(localStorage.GlobalBusinessAreaLocation);
            $("#heading_requests").empty();
            $("#heading_requests").text(localStorage.GlobalBusinessAreaLocation);
            $("#heading_pipeline").empty();
            $("#heading_pipeline").text(localStorage.GlobalBusinessAreaLocation);
            $("#bNavDashboard").html("Dashboard");
            $("#bNavActivities").html("Activities");
            $("#bNavContracts").html("Contracts");
            $("#bNavPipeline").html("Pipeline");
            $("#bNavRequests").html("Requests");
            var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
            var vAccFeat = $.grep(veContractFeatures, function (n, i) {
                return (n.RowKey == "6" && n.Status == "ON");
            });
            if (vAccFeat.length > 0) {
                $("#liNavCounterpartyMob").css('display', '');
                $("#liNavCounterparty").css('display', '');
            }
            $("#liNavInsights").css('display', '');
            $("#bNavDashboardMob").html("Dashboard");
            $("#bNavActivitiesMob").html("Activities");
            $("#bNavContractsMob").html("Contracts");
            $("#bNavPipelineMob").html("Pipeline");
            $("#bNavRequestsMob").html("Requests");
            $("#liNavInsightsMob").css('display', '');
            $(".DashboardType").html("");
        }
    }
}

function SearchKeyword() {
    var altMsg = 'Please enter a key word to search.';
    var EnteredSearchKeyWord = $.trim($("#keyword").val());
    if (EnteredSearchKeyWord == '') {
        swal("", altMsg);
    }
    else {
        //Sridhar
        var selectedtab = "";
        if (typeof ($("#aSearchContractTab").attr('data-searchtab')) != "undefined" && $("#aSearchContractTab").attr('data-searchtab') == "true")
            selectedtab = 'Contracts';
        else if (typeof ($("#aSearchDocumentTab").attr('data-searchtab')) != "undefined" && $("#aSearchDocumentTab").attr('data-searchtab') == "true")
            selectedtab = 'Documents';
        else if (typeof ($("#aSearchCounterpartyTab").attr('data-searchtab')) != "undefined" && $("#aSearchCounterpartyTab").attr('data-searchtab') == "true")
            selectedtab = 'Counterparty';
        window.location = "/General/SearchResult?keyword=" + encodeURIComponent($("#keyword").val().trim()) + "&tabselected=" + encodeURIComponent(selectedtab);
    }
}
$('#keyword').keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        SearchKeyword();
    }
});

function MyTaskList() {

    ////$('#ulcontenttasks').html('<li class="alertsli bordertopnone"><h3 class="alertsh3">Tasks</h3></li>');
    ////$('#ulcontenttasks').append('<img src="../Content/Images/icon/loading.gif"/>');
    ////$("#ulcontenttasks").append('<li class="tasksli"><p class="seeall margin-left-m10"><a href="/Activity/Activity">See All</a></p></li>');
    //$.ajax({
    //    url: '/api/accounts/' + localStorage.AccountID + '/Workflow/tasks/UnViewed?assignto=' + localStorage.UserName + '&status=In Progress&pageSize=0&startIndex=0',
    //    type: 'GET',
    //    dataType: 'json',
    //    headers: { 'eContracts-ApiKey': localStorage.APIKey },
    //    cache: false,
    //    success: function (data) {
    //        localStorage.setItem("eContractUserTaskTime", new Date());
    //        localStorage.setItem("eContractUserTaskList", JSON.stringify(data));
    //        var applytask = '<li class="alertsli bordertopnone"><h3 class="alertsh3">Tasks</h3></li>';
    //        if (data.length == 0) {
    //            applytask += '<li class="tasksli bordertopnone" style="line-height: 35px; text-indent: 14px;"><p class="f_p-error">No new Tasks</p></li>';
    //        }
    //        else {
    //            var datalenght = data.length;
    //            $("#iUnviewdTasks").html('' + datalenght + '');
    //            $("#iUnviewdTasks").css("display", "");
    //            for (var i = 0; i < datalenght; i++) {
    //                var item = data[i];
    //                if (i < 5) {
    //                    var sTaskTitle = item.TaskTitle;
    //                    var sRowKey = item.RowKey;

    //                    var article = '<li class="tasksli">';
    //                    article += '<small class="taskssmall"><a href="/Activity/TaskDetails?TaskID=' + sRowKey + '&WorkflowID=' + item.WorkflowID + '">' + sTaskTitle + '</a></small></li>';

    //                    applytask += article;
    //                }
    //            }
    //        }
    //        applytask += '<li class="tasksli"><p class="seeall margin-left-m10"><a href="/Activity/Activity">See All</a></p></li>';
    //        $("#ulcontenttasks").html(applytask);
    //        $("#loadingcontentalert").css("display", "none");
    //    },
    //    error: function () {
    //        $('#ulcontenttasks').html('<li class="alertsli bordertopnone"><h3 class="alertsh3">Tasks</h3></li>');
    //        $("#ulcontenttasks").append('<li class="tasksli bordertopnone"><p class="f_p-error">No new Tasks</p></li>');
    //        $("#ulcontenttasks").append('<li class="tasksli"><p class="seeall margin-left-m10"><a href="/Activity/Activity">See All</a></p></li>');
    //        $("#loadingcontentalert").css("display", "none");
    //        $("#iUnviewdTasks").html('');
    //        $("#iUnviewdTasks").css("display", "none");
    //    }
    //});

    //Added from 2.4final to 2.4

    $("#ulcontenttasks").html('');
    $("#ulcontenttasks1").html('');
    //$('#ulcontenttasks').html('<li class="alertsli bordertopnone"><h3 class="alertsh3">Tasks</h3></li>');
    $('#ulcontenttasks').append('<img src="../Content/Images/icon/loading.gif"/>');
    // $('#ulcontenttasks1').append('<img src="../Content/Images/icon/loading.gif"/>'); 

    //$("#ulcontenttasks").append('<li class="tasksli"><p class="seeall margin-left-m10"><a href="/Activity/Activity">See All</a></p></li>');
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Workflow/tasks/UnViewed?assignto=' + localStorage.UserName + '&status=In Progress&pageSize=0&startIndex=0',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            var applytask = '';
            var today = new Date();
            var vUpcomingCount = 0;
            //'<li class="alertsli bordertopnone"><h3 class="alertsh3">Tasks</h3></li>';
            if (typeof data == 'undefined' || data.length == 0) {//NoContent HttpStatusCode Update
                applytask += '<li class="tasksli bordertopnone" style="line-height: 35px; text-indent: 14px;"><p class="f_p-error">No new Tasks</p></li>';
            }
            else {//NoContent HttpStatusCode Update
                var datalenght = data.length;
                $("#iUnviewdTasks").html('' + datalenght + '');
                $("#iUnviewdTasks").css("display", "");
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];

                    if (i < 5) {
                        var sTaskTitle = item.TaskTitle;
                        var sRowKey = item.RowKey;
                        var sIntiator = item.Initiator;
                        var sDuedate = "";
                        var vv = moment(new Date(item.StartDate));
                        var sDiff = vv.fromNow();
                        var sStatus = item.Status;
                        var vContractid = "";
                        var vDocumentUrl = "";
                        var vRequestid = "";
                        var art = "";
                        var vURL = "";
                        var DocDefaultView = "";
                        if (item.DueDate != null)
                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                            { sDuedate += item.DueDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                            else {
                                if (localStorage.AppDateFormat == 'DD/MM/YYYY') { sDuedate += item.DueDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1'); }
                                else if (localStorage.AppDateFormat == 'MM/DD/YYYY') { sDuedate += item.DueDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                            }

                        var clsStatus = "";
                        if (sStatus == "In Progress") {
                            clsStatus = 'pull_left inprogress_task';

                        }
                        else if (sStatus == "Approved") {
                            clsStatus = 'pull_left completed_task';
                        }
                        else if (sStatus == "Rejected") {
                            clsStatus = "pull_left rejected_task";
                        }
                        var article = '<li style="padding: 8px 10px;border-bottom: solid 1px #d8d8d8;onmouseover= background: #eee; float:left;">' +
                                      '<span class="task_hold"><a href="/Activity/TaskDetails?TaskID=' + sRowKey + '&WorkflowID=' + item.WorkflowID + '"target="_blank"">' + sTaskTitle + '</a></span>' +
                                      '<div class="sidenav_detail"><span class="pull_left">' + sIntiator + ' | ' + sDuedate + '</span>' +
                                      '<span class="seconds pull_right">' + sDiff + '</span> </div>' +
                                      '<div class="sidenav_detail"><span class="pull_left inprogress_task" style="padding-bottom:4px;">' + sStatus + '</span>';

                        //'<div class="sidenav_detail"><span class="pull_left completed_task" style="padding-bottom: 4px;">' + sStatus + '</span>';
                        //article += '<span class="pull_right task_link">' + art + '</span></li>';  Commented LINK
                        if (moment(item.DueDate) > moment(today.getDate())) {
                            applytask += article;
                            vUpcomingCount++;
                        }
                    }
                }
            }
            $("#ulcontenttasks").html(applytask);
            $("#UpcomingNo").html('(' + vUpcomingCount + ')');
        },
        error: function () {
            $("#ulcontenttasks").html('<li class="tasksli bordertopnone"><p class="f_p-error">No new Tasks</p></li>');
            $("#iUnviewdTasks").html('');
            $("#iUnviewdTasks").css("display", "none");
        }
    });

    //manoj
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Workflow/tasks/all?assignto=' + localStorage.UserName + '&status=In Progress&pageSize=0&startIndex=0',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            var applytask1 = '';
            var today = new Date();
            var vOverdueCount = 0;
            if (typeof data != 'undefined' && data.length > 0) {//NoContent HttpStatusCode Update
                var datalenght = data.length;
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];

                    if (i < 5) {
                        var sTaskTitle = item.TaskTitle;
                        var sRowKey = item.RowKey;
                        var sIntiator = item.Initiator;
                        var sDuedate = "";
                        var vv = moment(new Date(item.StartDate));
                        var sDiff = vv.fromNow();
                        var sStatus = item.Status;
                        var vContractid = "";
                        var vDocumentUrl = "";
                        var vRequestid = "";
                        var art = "";
                        var vURL = "";
                        var DocDefaultView = "";
                        if (item.DueDate != null)
                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                            { sDuedate += item.DueDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                            else {
                                if (localStorage.AppDateFormat == 'DD/MM/YYYY') { sDuedate += item.DueDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1'); }
                                else if (localStorage.AppDateFormat == 'MM/DD/YYYY') { sDuedate += item.DueDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                            }

                        //$(vWorkflowItem).each(function (i, Witem) {
                        //    if (Witem.RowKey == item.WorkflowID) {
                        //        if (Witem.WorkflowType == "Document Review") {
                        //            $(vContractDocument).each(function (j, Ditem) {
                        //                if (Witem.ObjectID == Ditem.RowKey) {
                        //                    vDocumentUrl = encodeURI(Ditem.DocumentUrl);
                        //                    $(vBusinessArea).each(function (j, bArea) {
                        //                        if (bArea.BusinessAreaName == Ditem.ContractArea) {
                        //                            DocDefaultView = bArea.DocDefaultView;
                        //                        }
                        //                    });
                        //                    var vRawURLDoc = "";
                        //                    var IsValidOfficeDocument = false;
                        //                    if (vDocumentUrl.indexOf(".doc") >= 0 || vDocumentUrl.indexOf(".ppt") >= 0 || vDocumentUrl.indexOf(".xls") >= 0 || vDocumentUrl.indexOf(".dotx") >= 0) {
                        //                        vRawURLDoc = vDocumentUrl;
                        //                        vURL = localStorage.SPHostUrl + "/_layouts/15/WopiFrame.aspx?sourcedoc=" + vRawURLDoc + "&action=default";
                        //                        IsValidOfficeDocument = true;
                        //                    }
                        //                    if (DocDefaultView == "WordClient" && IsValidOfficeDocument) {
                        //                        art = '<a href="' + vRawURLDoc + '" onclick="viewdocinword(\'' + vRawURLDoc + '\') target="_blank"">Go to Documents</a>';
                        //                    } else {
                        //                        art = '<a href="' + vURL + '"  target="_blank"">Go to Documents</a>';
                        //                    }

                        //                }
                        //            });
                        //        }
                        //        else if (Witem.WorkflowType == "Contract Approval") {
                        //            vContractid = Witem.ObjectID;
                        //            art = '<a href="/Contracts/ContractDetails?ContractID=' + vContractid + '" target="_blank"">Go to Contract Record</a>';
                        //        }
                        //        else if (Witem.WorkflowType == "Request Approval") {

                        //            vRequestid = Witem.ObjectID;
                        //            art = '<a href="/Pipeline/RequestDetails?RequestID=' + vRequestid + '" target="_blank"">Go to Request Details</a>';
                        //        }

                        //    }
                        //});

                        var article = '<li style="padding: 8px 10px;overflow: auto;border-bottom: solid 1px #d8d8d8;onmouseover= background: #eee;">' +
                                      '<span class="task_hold"><a href="/Activity/TaskDetails?TaskID=' + sRowKey + '&WorkflowID=' + item.WorkflowID + '"target="_blank"">' + sTaskTitle + '</a></span>' +
                                      '<div class="sidenav_detail"><span class="pull_left">' + sIntiator + ' | ' + sDuedate + '</span>' +
                                      '<span class="seconds pull_right">' + sDiff + '</span> </div>' +
                                      '<div class="sidenav_detail"><span class="pull_left inprogress_task" style="padding-bottom: 4px;">' + sStatus + '</span>';

                        //article += '<span class="pull_right task_link">' + art + '</span></li>';

                        applytask1 += article;
                        vOverdueCount++;
                    }
                }
            }
            if (vOverdueCount == 0) {
                applytask1 = "No items found."
            }
            $("#ulcontenttasks1").html(applytask1);
            $("#OverdueNo").html('(' + vOverdueCount + ')');
        },
        error: function () {
            $("#ulcontenttasks1").html("No items found.");
            $("#OverdueNo").html('(0)');
        }
    });
    //end 2.4
}

function MyNotificationList() {
    ////$("#loadingcontentalert").css("display", "");
    //var vGetTime = new Date(curUTCTime);
    //$.ajax({
    //    url: '/Documents/GetTime',
    //    type: 'GET',
    //    dataType: 'json',
    //    cache: false,
    //    success: function (data) {
    //        var jsObject = JSON.parse(data);
    //        vGetTime = new Date(jsObject);
    //    }
    //});
    ////$('#ulcontentalert').html('<li class="alertsli bordertopnone"><h3 class="alertsh3">Alerts</h3></li>');
    ////$('#ulcontentalert').append('<img src="../Content/Images/icon/loading.gif"/>');
    ////$("#ulcontentalert").append('<li class="alertsli"><p class="seeall"><a href="/General/Alerts">See All</a></p></li>');
    //$.ajax({
    //    url: '/api/accounts/' + localStorage.AccountID + '/notifications/UnViewed?userid=' + localStorage.UserName + '&pagesize=&startindex=',
    //    type: 'GET',
    //    dataType: 'json',
    //    'Content-Type': 'application/json',
    //    cache: false,
    //    headers: { 'eContracts-ApiKey': localStorage.APIKey },
    //    success: function (data) {
    //        localStorage.setItem("eContractUserNotoficationTime", new Date());
    //        localStorage.setItem("eContractUserNotoficationList", JSON.stringify(data));
    //        var vArticle = '<li class="alertsli bordertopnone"><h3 class="alertsh3">Alerts</h3></li>';
    //        if (data.length == 0) {
    //            //$("#ulcontentalert").append('<li class="alertsli" style="line-height: 35px; text-indent: 14px;">No items found.</li>');
    //            //$("#ulcontentalert").append('<li class="alertsli"><p class="seeall"><a href="/General/Alerts">See All</a></p></li>');
    //            $("#loadingcontentalert").css("display", "none");
    //            vArticle += '<li class="alertsli" style="line-height: 35px; text-indent: 14px;"><p class="f_p-error">No new Alerts</p></li>';
    //        }
    //        else {
    //            $("#iUnviewdAlerts").html('' + data.length + '');
    //            $("#iUnviewdAlerts").css("display", "");
    //            var datalenght = data.length;
    //            for (var i = 0; i < datalenght; i++) {
    //                var item = data[i];
    //                if (i < 10) {
    //                    var sNotificationTitle = item.NotificationTitle;
    //                    var sRowKey = item.RowKey;
    //                    var vPriority = item.Priority;
    //                    var vPriorityIcon = '<img src="/Content/Images/priority_none.png" alt="None" title="None" />';
    //                    if (vPriority == "High") {
    //                        vPriorityIcon = '<img src="/Content/Images/priority_high.png" alt="High" title="High" />';
    //                    }
    //                    else if (vPriority == "Medium") {
    //                        vPriorityIcon = '<img src="/Content/Images/priority_medium.png" alt="Medium" title="Medium" />';
    //                    }
    //                    else if (vPriority == "Low") {
    //                        vPriorityIcon = '<img src="/Content/Images/priority_low.png" alt="Low" title="Low" />';
    //                    }
    //                    var vv = moment(new Date(item.NotificationDate));
    //                    var vTime = vv.fromNow();
    //                    vTime = vv.from(vGetTime);
    //                    var article = '<li class="alertsli">';
    //                    article += '<small class="alertssmall">';
    //                    article += '<a href="javascript:void(0)" class="linkText" onclick="ViewAlertDetail(\'' + item.RowKey + '\');">' + sNotificationTitle;
    //                    article += vPriorityIcon + ' <br/><span class="to-do-task-small">' + vTime + '</span></small>';
    //                    article += '<a href="javascript:void(0)"><img class="close-right" src="/Content/Images/alert-close.png" onclick="DismissNotification(\'' + sRowKey + '\')"></a>';
    //                    article += '</li>';
    //                    vArticle += article;
    //                    //$("#ulcontentalert").append(article);

    //                    //article += '<small class="alertssmall"><a href="javascript:void(0)" class="linkText" onclick="ViewAlertDetail(\'' + item.RowKey + '\');">' + sNotificationTitle;
    //                    //article += '</small></a>' + vPriorityIcon;
    //                    //article += '<a href="javascript:void(0)"><img class="close-right" src="/Content/Images/alert-close.png" onclick="DismissNotification(\'' + sRowKey + '\')" /></a>';

    //                }
    //            }
    //        }
    //        $("#ulcontentalert").html(vArticle);
    //        //if (data.length == 6) {
    //        //    $("#ulcontentalert").append('<li class="alertsli"><p class="seeall"><a href="/General/Alerts">See All</a></p></li>');
    //        //}
    //        $("#ulcontentalert").append('<li class="alertsli"><p class="seeall"><a href="/General/Alerts">See All</a></p></li>');
    //        $("#loadingcontentalert").css("display", "none");

    //    },
    //    error:
    //        function (data) {
    //            $('#ulcontentalert').html('<li class="alertsli bordertopnone"><h3 class="alertsh3">Notifications</h3></li>');
    //            $("#ulcontentalert").append('<li class="alertsli" style="line-height: 35px; text-indent: 14px;"><p class="f_p-error">No new Alerts</p></li>');
    //            $("#ulcontentalert").append('<li class="alertsli"><p class="seeall"><a href="/General/Alerts">See All</a></p></li>');
    //            $("#loadingcontentalert").css("display", "none");
    //            $("#iUnviewdAlerts").html('0');
    //            $("#iUnviewdAlerts").css("display", "none");
    //        }
    //});


    //Added from 2.4final to 2.4

    //$("#loadingcontentalert").css("display", "");
    var vGetTime = moment(new Date()).utc();
    //var vGetTime = new Date(curUTCTime);
    //$.ajax({
    //    url: '/Documents/GetTime',
    //    type: 'GET',
    //    dataType: 'json',
    //    cache: false,
    //    success: function (data) {
    //        var jsObject = JSON.parse(data);
    //        vGetTime = new Date(jsObject);
    //    }
    //});
    $('#ulcontentalert').html('<li class="alertsli bordertopnone"><h3 class="alertsh3">Alerts</h3></li>');
    $('#ulcontentalert').append('<img src="../Content/Images/icon/loading.gif"/>');
    $("#loadingcontentalert").css("display", "");
    //$("#ulcontentalert").append('<li class="alertsli"><p class="seeall"><a href="/General/Alerts">See All</a></p></li>');
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/notifications/UnViewed?userid=' + localStorage.UserName + '&pagesize=2000&startindex=1',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            localStorage.setItem("eContractUserNotoficationTime", new Date());
            //localStorage.setItem("eContractUserNotoficationList", JSON.stringify(data));
            //var vArticle = '<li class="alertsli bordertopnone"><h3 class="alertsh3">Alerts</h3></li>';
            var vArticle = '';
            if (typeof data == 'undefined' || data.length == 0) {//NoContent HttpStatusCode Update
                $("#ulcontentalert").append('<li class="alertsli" style="line-height: 35px; text-indent: 14px;">No items found.</li>');
                //$("#ulcontentalert").append('<li class="alertsli"><p class="seeall"><a href="/General/Alerts">See All</a></p></li>');
                $("#loadingcontentalert").css("display", "none");
                vArticle += '<li class="alertsli" style="line-height: 35px; text-indent: 14px;"><p class="f_p-error">No new Alerts</p></li>';
            }
            else {//NoContent HttpStatusCode Update
                $("#iUnviewdAlerts").html('' + data.length + '');
                $("#iUnviewdAlerts").css("display", "");
                var datalenght = data.length;
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];
                    if (i < 5) {
                        var sNotificationTitle = item.NotificationTitle;
                        var sRowKey = item.RowKey;
                        var vPriority = item.Priority;
                        var vPriorityIcon = '<img src="/Content/Images/priority_none.png" alt="None" title="None" />';
                        if (vPriority == "High") {
                            // vPriorityIcon = '<span class="risk_icon"><img src="/Content/Images/high_risk.png" width="15" height="15" alt="High" title="High" /></span>';//eO37457 Help text
                            vPriorityIcon = '<img src="/Content/Images/priority_high.png" alt="High" title="High" />';
                        }
                        else if (vPriority == "Medium") {
                            vPriorityIcon = '<img src="/Content/Images/priority_medium.png" alt="Medium" title="Medium" />';
                        }
                        else if (vPriority == "Low") {
                            vPriorityIcon = '<img src="/Content/Images/priority_low.png" alt="Low" title="Low" />';
                        }
                        var vv = moment(new Date(item.NotificationDate));
                        var vTime = vv.fromNow();
                        //vTime = vv.from(vGetTime);
                        //var article = '<li class="alertsli">';
                        //article += '<small class="alertssmall">';
                        //article += '<a href="javascript:void(0)" class="linkText" onclick="ViewAlertDetail(\'' + item.RowKey + '\');">' + sNotificationTitle;
                        //article += vPriorityIcon + ' <br/><span class="to-do-task-small">' + vTime + '</span></small>';
                        //article += '<a href="javascript:void(0)"><img class="close-right" src="/Content/Images/alert-close.png" onclick="DismissNotification(\'' + sRowKey + '\')"></a>';
                        //article += '</li>';
                        //vArticle += article;
                        //$("#ulcontentalert").append(article);

                        //article += '<small class="alertssmall"><a href="javascript:void(0)" class="linkText" onclick="ViewAlertDetail(\'' + item.RowKey + '\');">' + sNotificationTitle;
                        //article += '</small></a>' + vPriorityIcon;
                        //article += '<a href="javascript:void(0)"><img class="close-right" src="/Content/Images/alert-close.png" onclick="DismissNotification(\'' + sRowKey + '\')" /></a>';
                        var article = '<li id=' + item.RowKey + ' class="" style="padding: 8px 10px;overflow: auto;border-bottom: solid 1px #d8d8d8;"><a href="javascript:void(0)"><img  src="/Content/Images/alert-close.png" onclick="DismissNotification(\'' + sRowKey + '\')" style = "float: right;width: 10px;margin: 4px 0 0 12px;"></a><span class="alert_hold">' +
                        '<a href="javascript:void(0)" onclick="ViewAlertDetail(\'' + item.RowKey + '\');" style= "word-break: break-all;">' + sNotificationTitle +
                         vPriorityIcon + '</a></span>' +
                        '<div class="sidenav_detail"><span class="seconds pull_left">' + vTime + '</span> </div>' +
                        '</li>';
                        vArticle += article;
                    }
                }
            }
            $("#loadingcontentalert").css("display", "none");
            $("#ulalert").html(vArticle);
            //if (data.length == 6) {
            //    $("#ulcontentalert").append('<li class="alertsli"><p class="seeall"><a href="/General/Alerts">See All</a></p></li>');
            //}
            //$("#ulalert").append('<li class="alertsli"><p class="seeall"><a href="/General/Alerts">See All</a></p></li>');
        },
        error:
            function (data) {
                $('#ulcontentalert').html('<li class="alertsli bordertopnone"><h3 class="alertsh3">Notifications</h3></li>');
                $("#ulcontentalert").append('<li class="alertsli" style="line-height: 35px; text-indent: 14px;"><p class="f_p-error">No new Alerts</p></li>');
                //$("#ulcontentalert").append('<li class="alertsli"><p class="seeall"><a href="/General/Alerts">See All</a></p></li>');
                $("#loadingcontentalert").css("display", "none");
                $("#iUnviewdAlerts").html('0');
                $("#iUnviewdAlerts").css("display", "none");
            }
    });
    //2.4


}

function MyTaskListFromLocal() {
    var data = JSON.parse(localStorage.getItem("eContractUserTaskList"));
    var applytask = '<li class="alertsli bordertopnone"><h3 class="alertsh3">Tasks</h3></li>';
    if (data.length == 0) {
        applytask += '<li class="tasksli bordertopnone" style="line-height: 35px; text-indent: 14px;"><p class="f_p-error">No new Tasks</p></li>';
    }
    else {
        var datalenght = data.length;
        $("#iUnviewdTasks").html('' + datalenght + '');
        $("#iUnviewdTasks").css("display", "");
        for (var i = 0; i < datalenght; i++) {
            var item = data[i];
            if (i < 5) {
                var sTaskTitle = item.TaskTitle;
                var sRowKey = item.RowKey;

                var article = '<li class="tasksli">';
                article += '<small class="taskssmall"><a href="/Activity/TaskDetails?TaskID=' + sRowKey + '&WorkflowID=' + item.WorkflowID + '">' + sTaskTitle + '</a></small></li>';

                applytask += article;
            }
        }
    }
    applytask += '<li class="tasksli"><p class="seeall margin-left-m10"><a href="/Activity/Activity">See All</a></p></li>';
    $("#ulcontenttasks").html(applytask);
    //$("#loadingcontentalert").css("display", "none");
}

function MyNotificationListFromLocal() {
    var data = JSON.parse(localStorage.getItem("eContractUserNotoficationList"));
    var vGetTime = new Date(curUTCTime);
    var vArticle = '<li class="alertsli bordertopnone"><h3 class="alertsh3">Alerts</h3></li>';
    if (data.length == 0) {
        $("#loadingcontentalert").css("display", "none");
        vArticle += '<li class="alertsli" style="line-height: 35px; text-indent: 14px;"><p class="f_p-error">No new Alerts</p></li>';
    }
    else {
        $("#iUnviewdAlerts").html('' + data.length + '');
        $("#iUnviewdAlerts").css("display", "");
        var datalenght = data.length;
        if (datalenght > 10)
            datalenght = 10;
        for (var i = 0; i < datalenght; i++) {
            var item = data[i];
            if (i < 10) {
                var sNotificationTitle = item.NotificationTitle;
                var sRowKey = item.RowKey;
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
                var vv = moment(new Date(item.NotificationDate));
                var vTime = vv.fromNow();
                //vTime = vv.from(vGetTime);
                var article = '<li class="alertsli">';
                article += '<small class="alertssmall">';
                article += '<a href="javascript:void(0)" class="linkText" onclick="ViewAlertDetail(\'' + item.RowKey + '\');">' + sNotificationTitle;
                article += vPriorityIcon + ' <br/><span class="to-do-task-small">' + vTime + '</span></small>';
                article += '<a href="javascript:void(0)"><img class="close-right" src="/Content/Images/alert-close.png" onclick="DismissNotification(\'' + sRowKey + '\')"></a>';
                article += '</li>';
                vArticle += article;
            }
        }
    }
    $("#ulcontentalert").html(vArticle);
    $("#ulcontentalert").append('<li class="alertsli"><p class="seeall"><a href="/General/Alerts">See All</a></p></li>');
    $("#loadingcontentalert").css("display", "none");

}

function DismissNotification(notificationID) {
    $("#loadingPage").fadeIn();
    $(".popModal").css("display", "none");
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/notifications/' + notificationID + '?dismissed=Yes',
        type: 'PUT',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        cache: false,
        success: function (data) {
            $("#loadingPage").fadeOut();
            swal("", "Notification Dismissed.");
            MyNotificationList();
        },
        error: function (status) {
            $("#loadingPage").fadeOut();
        }
    });
}

function UserProfile() {
    var vURL = '/General/UserProfile';
    vURL += "?accountid=" + localStorage.AccountID;
    window.location = vURL;
}

function BackToO365() {
    if (localStorage.SPHostUrl == '') {
        window.open('https://corevo.sharepoint.com/sites/eContract365');
    }
    else {
        window.open(localStorage.SPHostUrl);
    }
}
var vActiveUsers = [];
var allUsers = []; //ENH-472
function BindUsers() {
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/users',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            allUsers = data; //ENH-472 Assigning data into "allusers" for displaying Global Contract Owners
            var v = $(data).length;
            var datalenght = data.length;
            var article = '';
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                var sRowKey = item.RowKey;
                var sUserName = item.UserName;
                article += '<option value="' + sUserName + '">' + sUserName + '</option>';
                vActiveUsers.push(sUserName.trim());
            }
            localStorage.setItem("eContractUserNames", JSON.stringify(vActiveUsers));
            $(".Link_UserProfile").each(function () {
                if (vActiveUsers.indexOf($(this)[0].textContent.trim()) < 0 && vActiveUsers.length > 0) {
                    $(this).addClass('disabled_item_link');
                    $(this).attr('title', 'This user is no longer available.');
                }
            });
            $("#ddlApprovers").empty();
            $("#ddlApprovers").append(article);
        },
        error:
            function (data) {
            }
    });
}

function BindUserNames() {
    var data = JSON.parse(localStorage.eContractUserNames);
    var datalenght = data.length;
    var article = '';
    for (var i = 0; i < datalenght; i++) {
        var item = data[i];
        article += '<option value="' + item + '">' + item + '</option>';
    }

    $("#ddlApprovers").append(article);
}


function ViewAlertDetail(notificationID) {
    $("#loadingPage").fadeIn();
    $(".popModal").css("display", "none");
    hidealert(notificationID);
    $.ajax({
        url: '/api/accounts/' + localStorage.AccountID + '/notifications?notificationid=' + notificationID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (entity) {
            $("#sentOn").html(moment(new Date(entity.NotificationDate)).format('Do MMM'));
            $("#alertTitle").html(entity.NotificationTitle);

            var vNotificationDescription = entity.NotificationDescription;
            vNotificationDescription = vNotificationDescription.replace(/\r\n/g, "<br />");

            $("#alertText").html(vNotificationDescription);
            $("#loadingPage").fadeOut();
            $("#dvAlertDetails").dialog("open");
        }
    });
}

function Search() {
    var value = $("#ddlTodoType").find('option:selected').val();
    if (value == "ContractApproval" || value == "ContractReview") {

        $('#dvLoading').css("display", "");
        $('#dvLoading').html('<img src="../Content/Images/icon/loading.gif"> Searching...');
        var vURL = vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Contracts?searchkeyword=' + encodeURIComponent($("#txtSearchBoxTodoForm").val()) + '&customquery=&sortbyfield=ContractTitle&orderby=ASC';
        $.ajax({
            url: vURL,
            type: 'GET',
            dataType: 'json',
            "Content-Type": "application/json",
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            cache: false,
            success: function (data) {
                $("#tblContractsTodo").empty();
                var datalenght = data.length;
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];
                    var sRowKey = item.RowKey;
                    var sContractTitle = item.ContractTitle;
                    var sContractNumber = item.ContractNumber;

                    var article = '<li>';
                    article += '<input id="' + sRowKey + '" type="radio" name="Contracts" class="css-checkbox" value="' + sContractTitle + '" />';
                    article += '<label for="' + sRowKey + '" class="css-label PreserveSpace">' + sContractTitle + '</label>';
                    article += '</li>';
                    $("#tblContractsTodo").append(article);
                }
                var vCount = $("#tblContractsTodo li").length;
                if (vCount != 0) {
                    $('#dvLoading').html('');
                    $('#compact-paginationContractsTodo').css('display', '');
                    $('#compact-paginationContractsTodo').pagination({
                        items: vCount,
                        itemsOnPage: 10,
                        type: 'ul',
                        typeID: 'tblContractsTodo',
                        row: 'li',
                        cssStyle: 'compact-theme'
                    });
                } else {
                    $('#dvLoading').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
                    $('#compact-paginationContractsTodo').css('display', 'none');
                }
            },
            error: function () {
                $('#compact-paginationContractsTodo').css('display', 'none');
                $('#dvLoading').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
            }
        });
    }
    else if (value == "DocumentApproval" || value == "DocumentReview") {

        $('#dvLoading').css("display", "");
        $('#dvLoading').html('<img src="../Content/Images/icon/loading.gif"> Searching...');
        var vURL = vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/documents?searchkeyword=' + encodeURIComponent($("#txtSearchBoxTodoForm").val()) + '&customquery=&sortbyfield=DocumentName&orderby=ASC';
        $.ajax({
            url: vURL,
            type: 'GET',
            dataType: 'json',
            "Content-Type": "application/json",
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            cache: false,
            success: function (data) {
                $("#tblDocumentsTodo").empty();
                var datalenght = data.length;
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];
                    var sRowKey = item.RowKey;
                    var sDocumentName = item.DocumentName;

                    var article = '<li>';
                    article += '<input id="' + sRowKey + '" type="radio" name="Documents" class="css-checkbox" value="' + sDocumentName + '" />';
                    article += '<label for="' + sRowKey + '" class="css-label">' + sDocumentName + '</label>';
                    article += '</li>';
                    $("#tblDocumentsTodo").append(article);
                }
                var vCount = $("#tblDocumentsTodo li").length;
                if (vCount != 0) {
                    $('#dvLoading').html('');
                    $('#compact-paginationDocumentsTodo').css('display', '');
                    $('#compact-paginationDocumentsTodo').pagination({
                        items: vCount,
                        itemsOnPage: 10,
                        type: 'ul',
                        typeID: 'tblDocumentsTodo',
                        row: 'li',
                        cssStyle: 'compact-theme'
                    });
                } else {
                    $('#dvLoading').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
                    $('#compact-paginationDocumentsTodo').css('display', 'none');
                }
            },
            error: function () {
                $('#compact-paginationDocumentsTodo').css('display', 'none');
                $('#dvLoading').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No items found.</p>')
            }
        });
    }
}

//Contract Area Changes

function baclick(obj) {
    $("#loadingspinnerBA").html('<img src="../Content/Images/loading.gif" />&nbsp;&nbsp;Redirecting to Business Area Dashboard...');
    $("#loadingPageBA").fadeIn();

    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "6" && n.Status == "ON");
    });
    $("#dashmain").attr("src", "/Content/images/icon/gen.png");
    $(".business-area").css('display', 'none');

    $("#heading_dashboard").empty();
    $("#heading_dashboard").text(obj.children[1].children[0].textContent);
    $("#heading_contracts").empty();
    $("#heading_contracts").text(obj.children[1].children[0].textContent);
    $("#heading_requests").empty();
    $("#heading_requests").text(obj.children[1].children[0].textContent);
    $("#heading_pipeline").empty();
    $("#heading_pipeline").text(obj.children[1].children[0].textContent);
    $("#bNavDashboard").html("Dashboard");
    $("#bNavActivities").html("Activities");
    $("#bNavContracts").html("Contracts");
    $("#bNavPipeline").html("Pipeline");
    $("#bNavRequests").html("Requests");
    $("#liNavInsights").css('display', '');
    $("#bNavDashboardMob").html("Dashboard");
    $("#bNavActivitiesMob").html("Activities");
    $("#bNavContractsMob").html("Contracts");
    $("#bNavPipelineMob").html("Pipeline");
    $("#bNavRequestsMob").html("Requests");
    $("#liNavInsightsMob").css('display', '');

    localStorage.setItem("GlobalBusinessArea", obj.children[1].children[1].textContent.trim());
    localStorage.setItem("GlobalBusinessAreaLocation", obj.children[1].children[0].textContent.trim());
    localStorage.setItem("IsGeneralBusinessArea", "");
    location = "/Home?SPHostUrl=" + localStorage.SPHostUrl;
}
function baclickmydashboard() {
    $("#loadingspinnerBA").html('<img src="../Content/Images/loading.gif" />&nbsp;&nbsp;Redirecting to My Dashboard...');
    $("#loadingPageBA").fadeIn();
    $("#dashmain").attr("src", "/Content/images/icon/my-dashboard.png");
    $(".business-area").css('display', 'none');
    $("#heading_dashboard").text("My Dashboard");
    $("#heading_contracts").text("Contract Records");
    $("#heading_requests").text("Requests");
    $("#heading_pipeline").text("Pipeline");
    $("#bNavDashboard").html("My Dashboard");
    $("#bNavActivities").html("My Activities");
    $("#bNavContracts").html("My Contracts");
    $("#bNavPipeline").html("My Pipeline");
    $("#bNavRequests").html("My Requests");
    $("#liNavInsights").css('display', 'none');
    $("#bNavDashboardMob").html("My Dashboard");
    $("#bNavActivitiesMob").html("My Activities");
    $("#bNavContractsMob").html("My Contracts");
    $("#bNavPipelineMob").html("My Pipeline");
    $("#bNavRequestsMob").html("My Requests");
    $("#liNavInsightsMob").css('display', 'none');
    localStorage.setItem("GlobalBusinessArea", "All");
    localStorage.setItem("GlobalBusinessAreaLocation", "All");
    localStorage.setItem("IsGeneralBusinessArea", "");
    location = "/Home?SPHostUrl=" + localStorage.SPHostUrl;
}


function baclickglobalreports() {
    $("#loadingspinnerBA").html('<img src="../Content/Images/loading.gif" />&nbsp;&nbsp;Redirecting to Global Insights...');
    $("#loadingPageBA").fadeIn();
    $("#dashmain").attr("src", "/Content/images/icon/my-dashboard.png");
    $(".business-area").css('display', 'none');
    $("#heading_dashboard").text("My Dashboard");
    $("#heading_contracts").text("Contract Records");
    $("#heading_requests").text("Requests");
    $("#heading_pipeline").text("Pipeline");
    $("#bNavDashboard").html("My Dashboard");
    $("#bNavActivities").html("My Activities");
    $("#bNavContracts").html("My Contracts");
    $("#bNavPipeline").html("My Pipeline");
    $("#bNavRequests").html("My Requests");
    $("#liNavInsights").css('display', 'none');
    $("#bNavDashboardMob").html("My Dashboard");
    $("#bNavActivitiesMob").html("My Activities");
    $("#bNavContractsMob").html("My Contracts");
    $("#bNavPipelineMob").html("My Pipeline");
    $("#bNavRequestsMob").html("My Requests");
    $("#liNavInsightsMob").css('display', 'none');
    localStorage.setItem("GlobalBusinessArea", "All");
    localStorage.setItem("GlobalBusinessAreaLocation", "All");
    localStorage.setItem("IsGeneralBusinessArea", "");

    //location = "/Reports/GlobalReportsLanding?SPHostUrl=" + localStorage.SPHostUrl;
    location = "/Reports/GlobalReportsLanding?SPHostUrl=" + localStorage.SPHostUrl;
    //location = "/Reports/GlobalReportsLanding";

}


function baclickviewall() {
    if ($('#tbodyBusinessArea tr').length == 0) {
        ViewAllBusinessArea();
    } else {
        $("#browseBA_Layouts").dialog("option", "title", "Business Area Picker");
        $("#browseBA_Layouts").dialog("open");
    }

    $(".business-area").css('display', 'none');
}

function GlobalContractAdminView() {
    if ($('#tbodyBusinessArea tr').length == 0) {
        ViewAllBusinessAreaForGlobal();
    } else {
        $("#browseBA_Layouts").dialog("option", "title", "Business Area Picker");
        $("#browseBA_Layouts").dialog("open");
    }

    $(".business-area").css('display', 'none');
}

function limydashshow(obj) {
    $(".business-area").css('display', '');
}

var articleBusinessArea = "";
var selecteditems = [];
var BusinessAreaAccess = [];
var BusinessAreaAccessWithRead = []


function BindBusinessAreMenu() {
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/users/' + localStorage.UserID + '/businessareapermission',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: true,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (entity) {
            var BAreaAccess = entity.BusinessArea + ";" + entity.BusinessAreaContribute + ";" + entity.OwnerOfBusinessAreas;

            var newArray = BAreaAccess.split(';').filter(function (v) { return v !== '' }); // remove empty
            BusinessAreaAccess = newArray;

            /* Business Area Popup Start */
            $.ajax({
                url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/businessarea/entities',
                type: 'GET',
                dataType: 'json',
                'Content-Type': 'application/json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                success: function (data) {
                    recursiveIteration(data)
                    $("#tbodyBusinessArea").append(articleBusinessArea);
                    if (articleBusinessArea == "") {
                        $('#tbodyBusinessArea').empty();
                        $("#tbodyBusinessArea").append("<tr><td><p class='f_p-error'>No items found.</p></td></tr>");
                    }
                    articleBusinessArea = "";
                    $("#example-basic-1").treetable({ expandable: true, initialState: "expanded" });
                },
                error:
                    function (data) {
                        if (articleBusinessArea == "") {
                            $('#tbodyBusinessArea').empty();
                            $("#tbodyBusinessArea").append("<tr><td><p class='f_p-error'>No items found.</p></td></tr>");
                        }
                    }
            });
            /* Business Area Popup End */

            /* Menu Start */
            $(".business-area").empty();
            articleBusinessArea2 += '<li class="myboard-pading"><a href="javascript:baclickmydashboard();"><img  src="/Content/images/icon/my-dashboard.png""/><span><b class="set-myboard">My Dashboard</b></span></a></li>'
            articleBusinessArea2 += '<li><b class="set-recentcont bussiness-area-head">My Business Areas</b></li>';

            //General Business Area
            articleBusinessArea2 += '<li><a href="javascript:void(0);" onclick="javascript: baclick(this);"><img src="/Content/images/icon/gen.png" /><span style="float:left;"><small style="">' + contractarearowkeyname + " > " + businessarearowkeyname + '</small><b>' + businessarearowkeyname + '</b></span></a></li>';
            //get distinct                       
            var uniqueBAAccess = BusinessAreaAccess.filter(function (itm, i, BusinessAreaAccess) { return i == BusinessAreaAccess.indexOf(itm); });

            $(uniqueBAAccess).each(function (i, item) {

                var bapath = item.split('>');
                var baname = bapath[bapath.length - 1];

                articleBusinessArea2 += '<li><a href="javascript:void(0);" onclick="javascript: baclick(this);"><img src="/Content/images/icon/gen.png" /><span style="float:left;"><small style="">' + item + '</small><b>' + baname + '</b></span></a></li>';
            });

            articleBusinessArea2 += '<li class="business_border"><a  class="js-open-modal business_viewmore myboard-pading" href="javascript:baclickviewall();" data-modal-id="popup1"><span>View All</span></a></li>'
            $(".business-area").append(articleBusinessArea2);
            articleBusinessArea2 = "";
            if (typeof localStorage.GlobalBusinessAreaLocation !== 'undefined') {
                if (localStorage.GlobalBusinessAreaLocation == "All") {

                } else {
                    $("#dashmain").attr("src", "/Content/images/icon/gen.png");
                }
            }
        },
        error:
            function (data) {
            }
    });
}
var businessareaHeaderMenu = "";
var articleBusinessArea2 = "";
var strContractAreaNameMenu = "";
var strContractAreaNameMenuOwner = "";
var MyBusinessAreaCount = 0;
var strContractAreaAdmin = "";
var strContractAreaName = "";
var strContractAreabusinesarearowkey = "";
var previousid = "";
var strContractAreaIDLayout = '';
function recursiveIteration(object) {
    if (object.ChildrenData.length != 0) {
        BindRecBA('', object);
        //for (var i = 0; i < object.ChildrenData.length; i++) {
        //    var item = object.ChildrenData[i];
        //    BindRecBA(item, '', object);
        //if (object.ChildrenData.length > 0)
        //    BindRecBA(item, spath, object);
        //var additional = "";

        //var j = BusinessAreaAccessID.indexOf(item.RowKey);//Full/Contribute/Read permission in bussiness area
        //if (j > -1 || item.Owner.trim().split(';').indexOf(localStorage.UserName.trim()) > -1) {
        //    if (item.ParentBusinessAreaID != 0) {
        //        if (item.Owner.trim().split(';').indexOf(localStorage.UserName.trim()) > -1) {//if business owner
        //            additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclick(this)">' + item.BusinessAreaName + '</span>&nbsp; <img src="/Content/Images/icon/profile.png" style="cursor:default;" />'
        //        } else { //if permission in business area
        //            additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclick(this)">' + item.BusinessAreaName + '</span>'
        //        }
        //    } else {
        //        additional = '<span>' + item.BusinessAreaName + '</span>';
        //    }
        //} else {
        //    if (item.ParentBusinessAreaID != 0) {
        //        if (item.RowKey == "GenBA") {
        //            businessarearowkeyname = item.BusinessAreaName;
        //            additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclick(this)">' + item.BusinessAreaName + '</span>'
        //        } else if (strContractAreaAdmin.split(';').indexOf(localStorage.UserName.trim()) > -1) {
        //            additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclick(this)">' + item.BusinessAreaName + '</span>'
        //        } else{
        //            additional = '<span>' + item.BusinessAreaName + '</span><span style="font-size:12px;font-style:italic;">(Request Access)</span>';
        //        }
        //    } else {
        //        additional = '<span>' + item.BusinessAreaName + '</span>';
        //        if (strContractAreabusinesarearowkey == "GenCA") {
        //            contractarearowkeyname = item.BusinessAreaName;
        //        }
        //    }
        //}


        //if (additional != "") {
        //    if (item.ParentBusinessAreaID == 0) {
        //        strContractAreaName = item.BusinessAreaName;
        //        strContractAreabusinesarearowkey = item.RowKey;
        //        strContractAreaAdmin = item.Owner;
        //        articleBusinessArea += '<tr data-tt-id="tre-' + item.RowKey + '" class="branch expanded">';
        //        articleBusinessArea += '<td class="treeHead"><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/globset.png" /><small>' + additional + '</small></td></tr>';
        //    } else {
        //        articleBusinessArea += '<tr data-tt-id="tre-' + item.RowKey + '" data-tt-parent-id="tre-' + item.ParentBusinessAreaID + '" class="branch collapsed" style="display: table-row;">';

        //        if (previousid == item.ParentBusinessAreaID) {
        //            //find if child business area exists
        //            $.ajax({
        //                url: '/api/accounts/' + localStorage.AccountID + '/businessarea/childbusinessareas?businessareaid=' + item.RowKey,
        //                type: 'GET',
        //                dataType: 'json',
        //                'Content-Type': 'application/json',
        //                headers: { 'eContracts-ApiKey': localStorage.APIKey },
        //                async: false,
        //                success: function (data) {
        //                    if (data.length == 0) {
        //                        articleBusinessArea += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" class="padding_left_65px" /><small>' + additional + '</small></td></tr>';
        //                    } else {
        //                        articleBusinessArea += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" /><small>' + additional + '</small></td></tr>';
        //                    }
        //                },
        //                error:
        //                    function (data) {

        //                    }
        //            });
        //        } else {
        //            articleBusinessArea += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" /><small>' + additional + '</small></td></tr>';
        //        }
        //        if (previousid != item.ParentBusinessAreaID)
        //            previousid = item.RowKey;
        //    }
        //}
        ////if (previousid != item.ParentBusinessAreaID)
        ////    recursiveIteration(object.ChildrenData[i])

        //if (object.ChildrenData.length > 0)
        //    recursiveIteration(object.ChildrenData[i])
        // }
    }
}

function BindRecBA(path, object) {
    for (var i = 0; i < object.ChildrenData.length; i++) {
        var item = object.ChildrenData[i];
        var additional = "";
        var spath = '';
        if (path == '')
            spath = item.BusinessAreaName;
        else
            spath = path + ' > ' + item.BusinessAreaName;
        //var found = $.grep(BusinessAreaAccessWithRead, function (k,value) {
        //    return (value.indexOf(spath) != -1); 
        //});
        var found = $.grep(BusinessAreaAccessWithRead, function (n, ind) {
            if (spath.indexOf('>') >= 0) { //eO310661
                return (n.indexOf(spath) == 0);
            }
            else {
                return (n.split('>')[0].toLowerCase().trim() == spath.toLowerCase());
            }
        });
        //var found = _.some(BusinessAreaAccessWithRead, function (value) {
        //    return value.indexOf(spath) != -1;
        //});
        if (found.length > 0 || localStorage.UserType.indexOf("Global Contract Owner") >= 0 || item.RowKey == "GenCA" || item.RowKey == "GenBA") {
            var j = BusinessAreaAccessID.indexOf(item.RowKey);//Full/Contribute/Read permission in bussiness area
            if (j > -1 || item.Owner.trim().split(';').indexOf(localStorage.UserName.trim()) > -1) {
                if (item.ParentBusinessAreaID != 0) {
                    if (item.Owner.trim().split(';').indexOf(localStorage.UserName.trim()) > -1) {//if business owner
                        additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclick(this)">' + item.BusinessAreaName + '</span>&nbsp; <img src="/Content/Images/icon/profile.png" style="cursor:default;" />'
                    } else { //if permission in business area
                        additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclick(this)">' + item.BusinessAreaName + '</span>'
                    }
                } else {
                    additional = '<span>' + item.BusinessAreaName + '</span>';
                }
            } else {
                if (item.ParentBusinessAreaID != 0) {
                    if (item.RowKey == "GenBA") {
                        businessarearowkeyname = item.BusinessAreaName;
                        additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclick(this)">' + item.BusinessAreaName + '</span>'
                    } else if (strContractAreaAdmin.split(';').indexOf(localStorage.UserName.trim()) > -1) {
                        additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclick(this)">' + item.BusinessAreaName + '</span>'
                    } else {
                        additional = '<span>' + item.BusinessAreaName + '</span><span style="font-size:12px;font-style:italic;">(Request Access)</span>';
                    }
                } else {
                    additional = '<span>' + item.BusinessAreaName + '</span>';
                    if (strContractAreabusinesarearowkey == "GenCA") {
                        contractarearowkeyname = item.BusinessAreaName;
                    }
                }
            }


            if (additional != "") {
                if (item.ParentBusinessAreaID == 0) {
                    strContractAreaName = item.BusinessAreaName;
                    strContractAreabusinesarearowkey = item.RowKey;
                    strContractAreaAdmin = item.Owner;
                    articleBusinessArea += '<tr data-tt-id="tre-' + item.RowKey + '" class="branch expanded">';
                    articleBusinessArea += '<td class="treeHead"><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/globset.png" /><small>' + additional + '</small></td></tr>';
                } else {
                    articleBusinessArea += '<tr data-tt-id="tre-' + item.RowKey + '" data-tt-parent-id="tre-' + item.ParentBusinessAreaID + '" class="branch collapsed" style="display: table-row;">';

                    if (previousid == item.ParentBusinessAreaID) {
                        //find if child business area exists
                        if (object.ChildrenData.length == 0) {
                            articleBusinessArea += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" class="padding_left_65px" /><small>' + additional + '</small></td></tr>';
                        } else {
                            articleBusinessArea += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" /><small>' + additional + '</small></td></tr>';
                        }
                        //$.ajax({
                        //    url: '/api/accounts/' + localStorage.AccountID + '/businessarea/childbusinessareas?businessareaid=' + item.RowKey,
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
                        articleBusinessArea += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" /><small>' + additional + '</small></td></tr>';
                    }
                    if (previousid != item.ParentBusinessAreaID)
                        previousid = item.RowKey;
                }
            }
            //    recursiveIteration(object.ChildrenData[i])

            //if (object.ChildrenData.length > 0)
            //    recursiveIteration(object.ChildrenData[i])

            if (object.ChildrenData.length > 0)
                BindRecBA(spath, object.ChildrenData[i]);
        }
    }
}

var previousidglobal = "";
function recursiveIterationGlobalContractAdmin(object) {
    if (object.ChildrenData.length != 0) {

        for (var i = 0; i < object.ChildrenData.length; i++) {
            var item = object.ChildrenData[i];
            var additional = "";

            if (item.ParentBusinessAreaID != 0) {
                additional = '<span style="color:#3487ce; cursor:pointer;" onclick="javascript:treeviewclick(this)">' + item.BusinessAreaName + '</span>'
            } else {
                additional = '<span>' + item.BusinessAreaName + '</span>';
            }

            if (item.ParentBusinessAreaID == 0) {
                strContractAreaName = item.BusinessAreaName;
                strContractAreabusinesarearowkey = item.RowKey;
                articleBusinessArea += '<tr data-tt-id="tre-' + item.RowKey + '" class="branch expanded">';
                articleBusinessArea += '<td class="treeHead"><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/globset.png" /><small>' + additional + '</small></td></tr>';
            } else {
                articleBusinessArea += '<tr data-tt-id="tre-' + item.RowKey + '" data-tt-parent-id="tre-' + item.ParentBusinessAreaID + '" class="branch collapsed" style="display: table-row;">';

                if (previousidglobal == item.ParentBusinessAreaID) {
                    //find if child business area exists
                    if (object.ChildrenData.length == 0) {
                        articleBusinessArea += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" class="padding_left_65px" /><small>' + additional + '</small></td></tr>';
                    } else {
                        articleBusinessArea += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" /><small>' + additional + '</small></td></tr>';
                    }
                    //$.ajax({
                    //    url: '/api/accounts/' + localStorage.AccountID + '/businessarea/childbusinessareas?businessareaid=' + item.RowKey,
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
                    articleBusinessArea += '<td><span id="ParentBusinessAreaID" style="display:none;">' + item.ParentBusinessAreaID + '</span><span id="RowKey" style="display:none;">' + item.RowKey + '</span><span id="ContractAreaName" style="display:none;">' + strContractAreaName + '</span><span class="indenter" style="padding-left: 5px;"></span><img src="/Content/Images/icon/gen.png" /><small>' + additional + '</small></td></tr>';
                }
                if (previousidglobal != item.ParentBusinessAreaID)
                    previousidglobal = item.RowKey;
            }
            if (object.ChildrenData.length > 0)
                recursiveIterationGlobalContractAdmin(object.ChildrenData[i])
        }
    }
}


function treeviewclick(obj) {
    $("#loadingspinnerBA").html('<img src="../Content/Images/loading.gif" />&nbsp;&nbsp;Redirecting to Business Area Dashboard...');
    $("#loadingPageBA").fadeIn();
    var strBusinessAreaName = obj.textContent;
    var rowKey = obj.parentNode.parentNode.childNodes[2].textContent;
    var parentBusinessAreaID = obj.parentNode.parentNode.childNodes[1].textContent;
    var contractAreaName = obj.parentNode.parentNode.childNodes[3].textContent;



    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/businessarea/businessarealocation?businessareaid=' + rowKey,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $("#heading_dashboard").empty();
            $("#heading_dashboard").text(data);
            $("#heading_contracts").empty();
            $("#heading_contracts").text(data);
            $("#heading_requests").empty();
            $("#heading_requests").text(data);
            $("#heading_pipeline").empty();
            $("#heading_pipeline").text(data);
            $("#bNavDashboard").html("Dashboard");
            $("#bNavActivities").html("Activities");
            $("#bNavContracts").html("Contracts");
            $("#bNavPipeline").html("Pipeline");
            $("#bNavRequests").html("Requests");
            $("#liNavInsights").css('display', '');
            $("#bNavDashboardMob").html("Dashboard");
            $("#bNavActivitiesMob").html("Activities");
            $("#bNavContractsMob").html("Contracts");
            $("#bNavPipelineMob").html("Pipeline");
            $("#bNavRequestsMob").html("Requests");
            $("#liNavInsightsMob").css('display', '');
            $("#dashmain").attr("src", "/Content/images/icon/gen.png");

            localStorage.setItem("GlobalBusinessArea", strBusinessAreaName);
            localStorage.setItem("GlobalBusinessAreaLocation", data);
            if (rowKey == "GenCA" || rowKey == "GenBA")
                localStorage.setItem("IsGeneralBusinessArea", "Yes");
            location = "/Home?SPHostUrl=" + localStorage.SPHostUrl;
            $('#browseBA_Layouts').dialog("close");
        },
        error: function (data) {

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
    //manoj
    if ($('.ContractRoleType#' + controlname).length > 0) {
        ChosenOrder.setSelectionOrder($("." + controlname + '#' + controlname), multiarr, true);
        ChosenOrder.setSelectionOrder($('.ContractRoleType#' + controlname), multiarr, true);
    }
    //manoj
    ChosenOrder.setSelectionOrder($('#' + controlname), multiarr, true);

}

function SelectElement() {
    var vSelectedElement = null;
    var value = $("#ddlTodoType").find('option:selected').val();
    if (value == "ContractApproval" || value == "ContractReview") {
        vSelectedElement = $('input[name=Contracts]:checked');
    }
    else if (value == "DocumentApproval" || value == "DocumentReview") {
        vSelectedElement = $('input[name=Documents]:checked');
    }
    $("#txtBrowseElement").val($(vSelectedElement).val());
    $("#txtBrowseElementID").val($(vSelectedElement).attr("id"));
}

function SaveTodo() {
    if (requiredValidator('tblTodo')) {
        $("#loadingPage").fadeIn();
        var approvers = $('#ddlApprovers').val();
        var contractID = '';
        var contractTitle = '';
        var requestID = '';
        var requestTitle = '';
        var documentID = '';
        var documentName = '';
        var vTodoURL = '';
        var vTodoExist = 'N';
        var value = $("#ddlTodoType").find('option:selected').val();
        if (value == "ContractApproval" || value == "ContractReview") {
            contractID = $("#txtBrowseElementID").val();
            contractTitle = $("#txtBrowseElement").val();
            vTodoURL = vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/todos?contractid=' + contractID + '&status=Pending';
        }
        else if (value == "DocumentApproval" || value == "DocumentReview") {
            documentID = $("#txtBrowseElementID").val();
            documentName = $("#txtBrowseElement").val();
            vTodoURL = vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/todos?documentid=' + documentID + '&status=Pending';
        }
        var todoTitle = $("#txtTodoTitle").val();
        var todoType = $("#ddlTodoType").find('option:selected').text();
        var note = $("#txtNotes").val();
        var todoDate = $("#txtDueDate").val();
        var status = 'Pending';
        var notifyMe = $("#chkNotifyMe").is(':checked') ? 'Yes' : 'No';
        var remindMe1 = $("#txtRemind1").val();
        var remindMe2 = $("#txtRemind2").val();
        var remindMe3 = $("#txtRemind3").val();


        if (vTodoURL != '') {
            $.ajax({
                url: vTodoURL,
                type: 'GET',
                dataType: 'json',
                'Content-Type': 'application/json',
                cache: false,
                async: false,
                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                success: function (data) {
                    $(data).each(function (i, item) {
                        if (item.TodoType == todoType) {
                            var msg = '';
                            if (item.TodoType == 'Contract Approval') {
                                msg = 'Approval process is in progress for this contract. Do you want to continue?';
                            }
                            else if (item.TodoType == 'Contract Review') {
                                msg = 'Review process is in progress for this contract. Do you want to continue?';
                            }
                            else if (item.TodoType == 'Document Approval') {
                                msg = 'Approval process is in progress for this document. Do you want to continue?';
                            }
                            else if (item.TodoType == 'Document Review') {
                                msg = 'Review process is in progress for this document.';
                            }
                            if (msg != '') {
                                vTodoExist = 'Y';
                                swal("", msg);
                            }
                        }
                    });
                },
                error:
                    function (data) {
                    }
            });
        }
        if (vTodoExist == 'N') {
            var todoAssignTo = '';
            $(approvers).each(function (i, item) {
                if (todoAssignTo == '')
                    todoAssignTo = item;
                else
                    todoAssignTo += "; " + item;
            });
            $.ajax({
                url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/todos',
                type: 'POST',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                data: {
                    ContractID: contractID,
                    ContractTitle: contractTitle,
                    RequestID: requestID,
                    RequestTitle: requestTitle,
                    DocumentID: documentID,
                    DocumentName: documentName,
                    TodoTitle: todoTitle,
                    TodoType: todoType,
                    Note: note,
                    TodoDate: todoDate,
                    Status: status,
                    AssignTo: todoAssignTo,
                    NotifyMe: notifyMe,
                    RemindMe1: remindMe1,
                    RemindMe2: remindMe2,
                    RemindMe3: remindMe3,
                    CreatedBy: localStorage.UserName,
                    ModifiedBy: ''
                },
                cache: false,
                success: function (person) {
                    swal("", "Task created.");
                    $("#dvTodo").dialog("close");
                    $("#loadingPage").fadeOut();

                    if ($('#todoList').length > 0) {
                        CreateTodoList();

                    }
                    else if (location.pathname == "/Activity/Activity") {
                        location = "/Activity/Activity";
                    }
                    $('input[type=checkbox][name="MultipleDocuments"]:checked').prop("checked", false);
                    $("#btnDocumentReview").css('display', 'none');
                }
            });
        } else {
            $("#loadingPage").fadeOut();
            $("#dvTodo").dialog("close");
            $('input[type=checkbox][name="MultipleDocuments"]:checked').prop("checked", false);
            $("#btnDocumentReview").css('display', 'none');
        }
    }


}

$('#ddlTodoType').change(function () {
    var value = $(this).val();
    if (value == "ContractApproval" || value == "ContractReview") {
        $("#txtBrowseElement").addClass('validelement');
        $("#trBrowse").css("display", "");
        $("#tdBrowseElement").text("Contract Title");
    }
    else if (value == "DocumentApproval" || value == "DocumentReview") {
        $('#txtBrowseElement').attr('title', 'Document');
        $("#trBrowse").css("display", "");
        $("#tdBrowseElement").html("Document");
    }
    else {
        $("#txtBrowseElement").removeClass('validelement');
        $("#trBrowse").css("display", "none");
    }
});

function CreateTodo() {
    $("#txtTodoTitle").val("");
    $("#ddlTodoType").val("0");
    GetValuesAndAutoPopulateChosen("ddlApprovers", "");
    $("#trBrowse").css("display", "none");
    $("#txtDueDate").val("");
    $("#txtNotes").val("");
    $("#chkNotifyMe").prop('checked', false);
    $("#txtBrowseElement").val("");
    $("#txtBrowseElementID").val("");
    $('input:radio[name=Contracts]').removeAttr('checked');
    $('input:radio[name=Documents]').removeAttr('checked');
    $("#dvTodo").dialog("option", "title", "New Task");
    fnChangeAssignedToText();
    $("#dvTodo .validelement").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });
    $("#dvTodo").dialog("open");
}


function Browse() {
    $("#txtSearchBoxTodoForm").val("");
    $('#dvLoading').html('<img src="../Content/Images/icon/loading.gif">');
    var value = $("#ddlTodoType").find('option:selected').val();
    if (value == "ContractApproval" || value == "ContractReview") {
        $('#compact-paginationContractsTodo').css('display', '');
        $('#compact-paginationDocumentsTodo').css('display', 'none');

        $("#tblDocumentsTodo").css("display", "none");
        $("#tblContractsTodo").css("display", "");
        if ($("#tblContractsTodo li").length == 0) {
            BindContracts();
        }
        $("#dvBrowse").dialog("option", "title", "Select Contract");

    }
    else if (value == "DocumentApproval" || value == "DocumentReview") {
        $('#compact-paginationDocumentsTodo').css('display', '');
        $('#compact-paginationContractsTodo').css('display', 'none');

        $("#tblDocumentsTodo").css("display", "");
        $("#tblContractsTodo").css("display", "none");
        if ($("#tblDocumentsTodo li").length == 0) {
            BindDocuments();
        }
        $("#dvBrowse").dialog("option", "title", "Select Document/Folder");
    }
    $("#dvBrowse").dialog("open");
    $('#dvLoading').html('');
}

function BindContracts() {
    $("#loadingPage").fadeIn();
    $('#dvLoading').css("display", "");
    $("#tblContractsTodo").empty();
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Contracts',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            var v = $(data).length;
            var contractTags = [];
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                var sRowKey = item.RowKey;
                var sContractTitle = item.ContractTitle;
                var sContractNumber = item.ContractNumber;

                var article = '<li>';
                article += '<input id="' + sRowKey + '" type="radio" name="Contracts" class="css-checkbox" value="' + sContractTitle + '" />';
                article += '<label for="' + sRowKey + '" class="css-label PreserveSpace">' + sContractTitle + '</label>';
                article += '</li>';
                $("#tblContractsTodo").append(article);
                if (i == v - 1) {
                }
                contractTags.push(sContractTitle);
            }
            $("#loadingPage").fadeOut();

            $("#txtSearchBoxTodoForm").autocomplete({
                source: contractTags,
                minLength: 2
            });

            var vCount = $("#tblContractsTodo li").length;
            $('#compact-paginationContractsTodo').pagination({
                items: vCount,
                itemsOnPage: 10,
                type: 'ul',
                typeID: 'tblContractsTodo',
                row: 'li',
                cssStyle: 'compact-theme'
            });
            $('#dvLoading').css("display", "none");
        },
        error:
            function (data) {
                $("#loadingPage").fadeOut();
            }
    });
}

function BindDocuments() {
    $('#dvLoading').css("display", "");
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/documents/documentswithoutfolder',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            var v = $(data).length;
            var documentTags = [];
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                var sRowKey = item.RowKey;
                var sDocumentName = item.DocumentName;

                var article = '<li>';
                article += '<input id="' + sRowKey + '" type="radio" name="Documents" class="css-checkbox" value="' + sDocumentName + '" />';
                article += '<label for="' + sRowKey + '" class="css-label tagfiles">' + sDocumentName + '</label>';
                article += '</li>';
                $("#tblDocumentsTodo").append(article);
                if (i == v - 1) {
                    $('#dvLoading').css("display", "none");
                }
                documentTags.push(sDocumentName);
            }

            $("#txtSearchBoxTodoForm").autocomplete({
                source: documentTags,
                minLength: 2
            });

            $('.tagfiles').linktype();
            var vCount = $("#tblDocumentsTodo li").length;
            $('#compact-paginationDocumentsTodo').pagination({
                items: vCount,
                itemsOnPage: 10,
                type: 'ul',
                typeID: 'tblDocumentsTodo',
                row: 'li',
                cssStyle: 'compact-theme'
            });
        },
        error:
            function (data) {
            }
    });
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

var BusinessAreaAccessID = [];
function getbusinessareapath() {
    BusinessAreaAccessID = [];
    $(BusinessAreaAccess).each(function (i, item) {
        var path = item.split(' > ');
        $.ajax({
            url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/businessarea/detailsbyname?businessareaname=' + encodeURIComponent(path[path.length - 1]) + '&contractareaname=' + encodeURIComponent(path[path.length - 2]),
            type: 'GET',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            //async: false,
            success: function (data) {
                BusinessAreaAccessID.push(data.RowKey);
            },
            error: function (data) {

            }
        });
    });
}

function getbusinessareapath1() {
    BusinessAreaAccessID = [];
    $(BusinessAreaAccessWithRead).each(function (i, item) {
        var path = item.split(' > ');
        $.ajax({
            url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/businessarea/detailsbyname?businessareaname=' + encodeURIComponent(path[path.length - 1]) + '&contractareaname=' + encodeURIComponent(path[path.length - 2]),
            type: 'GET',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            async: false,
            success: function (data) {
                BusinessAreaAccessID.push(data.RowKey);
            },
            error: function (data) {

            }
        });
    });
}

//Performance Optimization
var vBusinessAreaAccessAPIExecuted = false;
function getbusinessareapath1Optimized() {
    vBusinessAreaAccessAPIExecuted = false;
    BusinessAreaAccessID = [];
    var temp = new FormData();
    temp.append("BAList", BusinessAreaAccessWithRead);
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/businessarea/listBAbyname',
        type: 'POST',
        processData: false,
        contentType: false,
        data: temp,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        async: false,
        success: function (data) {
            BusinessAreaAccessID = data;
            vBusinessAreaAccessAPIExecuted = true;
        },
        error: function (data) {
        }
    });
}
//Performance Optimization

// Overrides the default autocomplete filter function to search only from the beginning of the string
$.ui.autocomplete.filter = function (array, term) {
    var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(term), "i");
    return $.grep(array, function (value) {
        return matcher.test(value.label || value.value || value);
    });
};


function ViewUserProfile(username) {
    $("#loadingPage").fadeIn();
    $.ajax({
        url: '/api/accounts/' + localStorage.AccountID + '/users?username=' + username,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (entity) {
            $("#dvProfile_UserName").html(entity.UserName);
            $("#dvProfile_LoginEmailID").html(entity.O365EmailID);
            var vAddress = '';
            if (entity.AddressLine1 != "")
                vAddress += entity.AddressLine1 + ', ';
            if (entity.AddressLine2 != "") {
                if (vAddress == "")
                    vAddress = entity.AddressLine2;
                else
                    vAddress += entity.AddressLine2 + ', ';
            }
            if (entity.City != "") {
                if (vAddress == "")
                    vAddress = entity.City;
                else
                    vAddress += entity.City + ', ';
            }
            if (entity.Country != "" && entity.Country != "--Select--") {
                if (vAddress == "")
                    vAddress = entity.Country;
                else
                    vAddress += entity.Country + ', ';
            }
            if (vAddress != "" && vAddress != null && typeof (vAddress) != "undefined") {
                $("#dvProfile_Address").html(vAddress);
            }
            else {
                $("#dvProfile_Address").html("-");
            }
            if (entity.EmailID != "" && entity.EmailID != null && typeof (entity.EmailID) != "undefined") {
                $("#dvProfile_EmailID").html(entity.EmailID);
            }
            else {
                $("#dvProfile_EmailID").html("-");
            }
            if (entity.PhoneNo1 != "" && entity.PhoneNo1 != null && typeof (entity.PhoneNo1) != "undefined") {
                $("#dvProfile_PhoneNo1").html(entity.PhoneNo1);
            }
            else {
                $("#dvProfile_PhoneNo1").html("-");
            }
            if (entity.PhoneNo2 != "" && entity.PhoneNo2 != null && typeof (entity.PhoneNo2) != "undefined") {
                $("#dvProfile_PhoneNo2").html(entity.PhoneNo2);
            }
            else {
                $("#dvProfile_PhoneNo2").html("-");
            }
            if (typeof (entity.JobDescription) != "undefined" && entity.JobDescription != null && entity.JobDescription != "") {
                $("#dvProfile_JobTitle").html(entity.JobDescription);
            }
            else {
                $("#dvProfile_JobTitle").html('-');
            }
            if (typeof (entity.Department) != "undefined" && entity.Department != null && entity.Department != "") {
                $("#dvProfile_Department").html(entity.Department);
            }
            else {
                $("#dvProfile_Department").html('-');
            }

            if (typeof (entity.MyManager) != "undefined" && entity.MyManager != null && entity.MyManager != "") {
                if (entity.IsManagerAvailable == "No") {
                    var vUsers = '<span class="disabled_item_link">' + entity.MyManager + '</span>';
                    $("#dvProfile_MyManager").html(vUsers);
                }
                else {
                    $("#dvProfile_MyManager").html(entity.MyManager);
                }


            }
            else {
                $("#dvProfile_MyManager").html('-');
            }

            if (typeof (entity.OutOfOffice) != "undefined" && entity.OutOfOffice != null && entity.OutOfOffice != "") {
                $("#dvProfile_OutOfOffice").html(entity.OutOfOffice);
            }
            else {
                $("#dvProfile_OutOfOffice").html('-');
            }
            if (typeof (entity.DelegateTo) != "undefined" && entity.DelegateTo != null && entity.DelegateTo != "") {
                $("#dvProfile_DelegateTo").html(entity.DelegateTo);
            }
            else {
                $("#dvProfile_DelegateTo").html('-');
            }
            if (typeof (entity.UserType) != "undefined" && entity.UserType != null && entity.UserType != "") {
                $("#dvProfile_UserType").html(entity.UserType);
            }
            else {
                $("#dvProfile_UserType").html('-');
            }
            if (typeof (entity.OwnerOfBusinessAreas) != "undefined" && entity.OwnerOfBusinessAreas != null && entity.OwnerOfBusinessAreas != "") {
                $("#dvProfile_OwnershipBusinessArea").html(entity.OwnerOfBusinessAreas);
            }
            else {
                $("#dvProfile_OwnershipBusinessArea").html('-');
            }
            if (typeof (entity.BusinessArea) != "undefined" && entity.BusinessArea != null && entity.BusinessArea != "") {
                $("#dvProfile_fullCtrlBusinessArea").html(entity.BusinessArea);
            }
            else {
                $("#dvProfile_fullCtrlBusinessArea").html('-');
            }
            if (typeof (entity.BusinessAreaContribute) != "undefined" && entity.BusinessAreaContribute != null && entity.BusinessAreaContribute != "") {
                $("#dvProfile_ContributeBusinessArea").html(entity.BusinessAreaContribute);
            }
            else {
                $("#dvProfile_ContributeBusinessArea").html('-');
            }
            if (typeof (entity.BusinessAreaRead) != "undefined" && entity.BusinessAreaRead != null && entity.BusinessAreaRead != "") {
                $("#dvProfile_ReadBusinessArea").html(entity.BusinessAreaRead);
            }
            else {
                $("#dvProfile_ReadBusinessArea").html('-');
            }

            if (entity.UserType.indexOf('Contract Area Administrator') >= 0) {
                getContractAreas(entity.UserName)
            } else { $("#dvProfile_ContractArea").html('Not Available') }


            $("#dvViewUserProfile").dialog("open");
            $("#dvViewUserProfile").height("auto");
            $("#loadingPage").fadeOut();
        },
        error:
            function (data) {
                swal("", "This user has been deleted.");
                $("#loadingPage").fadeOut();
            }
    });
}


function getContractAreas(username) {
    $.ajax({
        url: '/api/accounts/' + localStorage.AccountID + '/businessarea/contractareas',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            var v = "";
            $(data).each(function (i, item) {
                if (item.Owner.indexOf(username) > -1) {
                    if (item.RowKey == "GenBA" || item.RowKey == "GenCA" || item.BusinessAreaName == "Business Area") {
                    } else { v += item.BusinessAreaName + ';'; }
                }
            });

            if (v != "") { v = v.slice(0, -1) }

            $("#dvProfile_ContractArea").html(v)
        },
        error: function (data) {
        }
    });
}

$('input[readonly]').on('keydown', function (e) {
    if (e.which === 8) {
        e.preventDefault();
    }
});

$("input:text").blur(function () {
    var vTextVal = $.trim($(this).val());
    vTextVal = vTextVal.replace(/~/g, '');
    //URL Encode Issue - Manas
    vTextVal = vTextVal.replace(/\+/g, '');
    //URL Encode Issue - Manas
    $(this).val(vTextVal);
});

function MarkNotificationViewed() {
    $.ajax({
        url: '/api/accounts/' + localStorage.AccountID + '/notifications?userid=' + localStorage.UserName,
        type: 'PUT',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        success: function (data) {

        },
        error:
            function (data) {

            }
    });
}

function MarkTasksViewed() {
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Workflow/tasks?assignto=' + localStorage.UserName,
        type: 'PUT',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        success: function (data) {

        },
        error:
            function (data) {

            }
    });
}

function changeinupload(obj, replacenode, IsDocumentTab) {
    var id = obj.id;
    var filecontrol = document.getElementById(id);
    var txt = "";
    if ('files' in filecontrol) {
        if (filecontrol.files.length == 0) {
            $('#trfileUploadOCR').css('display', 'none');
        } else {
            for (var i = 0; i < filecontrol.files.length; i++) {
                var acceptExtension = ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'dotx', 'xps', 'rtf', 'odt', 'dotm', 'docm', 'msg', 'tif', 'tiff', 'csv', 'zip', 'ZIP'];
                var file = filecontrol.files[i];
                var ext = file.name.split('.').pop().toString();
                if (acceptExtension.indexOf(ext.trim().toLowerCase()) > -1) {
                    if ('size' in file) {
                        if (file.size > 0) {
                            var Filelengthcol = Math.round((file.size / 1048576));
                            if (Filelengthcol > (Math.round(parseInt(localStorage.MaxRequestLength) / 1000))) {
                                //swal("", "The maximum permissible size is " + Math.round(parseInt(localStorage.MaxRequestLength) / 1024) + " MB, Please upload a file which is less than " + Math.round(parseInt(localStorage.MaxRequestLength) / 1024) + " MB");
                                swal("", "File exceeds " + Math.round((parseInt(localStorage.MaxRequestLength) / 1000)) + "MB size limit.");
                                $("#" + id).replaceWith($("#" + id).val('').clone(true));
                            } else {
                                if (!isSpecialCharacterFileName(file.name.substr(0, file.name.lastIndexOf('.')))) {
                                    swal({
                                        title: '',
                                        //text: "File names can't contain the following characters /:*\\?\"<>|#%.",
                                        // For Brookfield allow dot in filename
                                        text: "File names can't contain the following characters /:*\\?\"<>|#%",
                                        // For Brookfield allow dot in filename
                                        type: 'warning',
                                        showCancelButton: false,
                                        confirmButtonText: 'OK',
                                        html: true
                                    },
                                    function (confirmed) {
                                        $("#" + id).replaceWith($("#" + id).val('').clone(true));
                                    });
                                } else if (!isContainsThreeAlphabets(file.name.substr(0, file.name.lastIndexOf('.')))) {
                                    swal({
                                        title: '',
                                        text: "File names should contain the minimum of 3 alphabets.",
                                        type: 'warning',
                                        showCancelButton: false,
                                        confirmButtonText: 'OK',
                                        html: true
                                    },
                                    function (confirmed) {
                                        $("#" + id).replaceWith($("#" + id).val('').clone(true));
                                    });
                                } else {
                                    //if OCR integration feature is enabled
                                    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
                                    vAccFeat = $.grep(veContractFeatures, function (n, i) {
                                        return (n.RowKey == "25" && n.Status == "ON");
                                    });
                                    if ((ext.trim().toLowerCase() == "tif" || ext.trim().toLowerCase() == "tiff" || ext.trim().toLowerCase() == "pdf") && vAccFeat.length > 0) {
                                        //manoj


                                        if (typeof replacenode != "undefined" && replacenode != null && replacenode) {
                                            $("#ReplacefileUploadOCR").prop('checked', false);
                                            if (ext.trim().toLowerCase() == "tif" || ext.trim().toLowerCase() == "tiff") {
                                                $("#trReplacefileUploadOCR").css('display', '');
                                            } else {
                                                $("#trReplacefileUploadOCR").css('display', 'none');
                                            }
                                        } else {
                                            if (IsDocumentTab) {
                                                if (ext.trim().toLowerCase() == "tif" || ext.trim().toLowerCase() == "tiff") {
                                                    $("#fileUploadOCR").prop('checked', false);
                                                    $("#trfileUploadOCR").css('display', '');
                                                } else {
                                                    $("#fileUploadOCR").prop('checked', false);
                                                    $("#trfileUploadOCR").css('display', 'none');
                                                }
                                            } else {
                                                $("#fileUploadOCR").prop('checked', false);
                                                $("#trfileUploadOCR").css('display', '');
                                            }
                                        }
                                        //manoj
                                    } else {
                                        if (typeof replacenode != "undefined" && replacenode != null && replacenode) {
                                            $("#ReplacefileUploadOCR").prop('checked', false);
                                            $("#trReplacefileUploadOCR").css('display', 'none');
                                        } else {
                                            $("#fileUploadOCR").prop('checked', false);
                                            $("#trfileUploadOCR").css('display', 'none');

                                        }
                                    }
                                }
                            }
                        } else {
                            swal("", "File cannot be empty.");
                            $("#" + id).replaceWith($("#" + id).val('').clone(true));
                        }
                    }
                }
                else {
                    swal({
                        title: '',
                        text: "Only file type pdf, png, jpg, gif, bmp, doc, xls, ppt, docx, xlsx, txt, pptx, dotx, xps, rtf, odt, dotm, docm, msg are allowed.",
                        type: 'warning',
                        showCancelButton: false,
                        confirmButtonText: 'OK',
                        html: true
                    },
                               function (confirmed) {
                                   $("#" + id).replaceWith($("#" + id).val('').clone(true));
                               });
                }
            }
        }
    }
}

function changeinuploadcorrespondence(obj) {
    var id = obj.id;
    var filecontrol = document.getElementById(id);
    var txt = "";
    if ('files' in filecontrol) {
        if (filecontrol.files.length == 0) {
        } else {
            for (var i = 0; i < filecontrol.files.length; i++) {
                var acceptExtension = ['msg'];
                var file = filecontrol.files[i];
                var ext = file.name.split('.').pop().toString();
                if (acceptExtension.indexOf(ext.trim().toLowerCase()) > -1) {
                    if ('size' in file) {
                        if (file.size > 0) {
                            var Filelengthcol = Math.round((file.size / 1048576));
                            if (Filelengthcol > (Math.round(parseInt(localStorage.MaxRequestLength) / 1000))) {
                                //swal("", "The maximum permissible size is " + Math.round(parseInt(localStorage.MaxRequestLength) / 1024) + " MB, Please upload a file which is less than " + Math.round(parseInt(localStorage.MaxRequestLength) / 1024) + " MB");
                                swal("", "File exceeds " + Math.round((parseInt(localStorage.MaxRequestLength) / 1000)) + "MB size limit.");
                                $("#" + id).replaceWith($("#" + id).val('').clone(true));
                            } else {
                                if (!isSpecialCharacterFileName(file.name.substr(0, file.name.lastIndexOf('.')))) {
                                    swal({
                                        title: '',
                                        //text: "File names can't contain the following characters /:*\\?\"<>|#%.",
                                        // For Brookfield allow dot in filename
                                        text: "File names can't contain the following characters /:*\\?\"<>|#%",
                                        // For Brookfield allow dot in filename
                                        type: 'warning',
                                        showCancelButton: false,
                                        confirmButtonText: 'OK',
                                        html: true
                                    },
                                    function (confirmed) {
                                        $("#" + id).replaceWith($("#" + id).val('').clone(true));
                                    });
                                } else if (!isContainsThreeAlphabets(file.name.substr(0, file.name.lastIndexOf('.')))) {
                                    swal({
                                        title: '',
                                        text: "File names should contain the minimum of 3 alphabets.",
                                        type: 'warning',
                                        showCancelButton: false,
                                        confirmButtonText: 'OK',
                                        html: true
                                    },
                                    function (confirmed) {
                                        $("#" + id).replaceWith($("#" + id).val('').clone(true));
                                    });
                                }
                            }
                        } else {
                            swal("", "File cannot be empty.");
                            $("#" + id).replaceWith($("#" + id).val('').clone(true));
                        }
                    }
                }
                else {
                    swal({
                        title: '',
                        text: "Only file type msg are allowed.",
                        type: 'warning',
                        showCancelButton: false,
                        confirmButtonText: 'OK',
                        html: true
                    },
                               function (confirmed) {
                                   $("#" + id).replaceWith($("#" + id).val('').clone(true));
                               });
                }
            }
        }
    }
}


function autoscroll() {
    if ($(".error").length > 0) {
        $('html, body').animate({
            scrollTop: $(".error").offset().top
        }, 2000);
    }
}


function hideAllMenuAndStopPro(e) {
    $(".contextMenu").hide();
    $(".hhide").hide();
    $(".hhide1").hide();
    $(".hhide2").hide();
    $(".hhide4").hide();
    $(".hhide3").hide();
    if (e != null && e != "" && typeof (e) != 'undefined')
        e.stopPropagation();
}

//manoj
//Alphabet Search for DataTable View 
function alphabeticselection(tblname) {
    $.fn.dataTable.ext.search.push(function (settings, searchData) {
        if (!_alphabetSearch) {
            return true;
        }
        if (_alphabetSearch == "Number") {//Custom
            if (numberindex.indexOf(searchData[0].charAt(0)) > -1) {
                return true;
            }//Custom
        } else {
            if (searchData[0].charAt(0).toLowerCase() === _alphabetSearch.toLowerCase()) {
                return true;
            }
        }

        return false;
    });

    var table = $('#' + tblname).DataTable();

    var alphabet = $('<div class="alphabet"/>').append('');

    $('<span class="clear active"/>')
        .data('letter', '')
        .html('All')
        .appendTo(alphabet);

    //Custom
    $('<span/>')
            .data('letter', 'Number')
            .html('#')
            .appendTo(alphabet);
    //Custom
    for (var i = 0 ; i < 26 ; i++) {
        var letter = String.fromCharCode(65 + i);

        $('<span/>')
            .data('letter', letter)
            .html(letter)
            .appendTo(alphabet);
    }

    alphabet.insertBefore(table.table().container());

    alphabet.on('click', 'span', function () {
        alphabet.find('.active').removeClass('active');
        $(this).addClass('active');

        _alphabetSearch = $(this).data('letter');
        table.draw();
    });
}

function eventFired(nameattr, objvalue, tablname) {
    if ($('input:checkbox[name="' + nameattr + '"]:checked').length == $('input:checkbox[name="' + nameattr + '"]').length && $('input:checkbox[name="' + nameattr + '"]:checked').length != 0) {
        $("#" + objvalue).attr('checked', true);
    } else {
        $("#" + objvalue).attr('checked', false);
    }
}
//Alphabet Search for DataTable View
//manoj

//Sridhar
function SearchInTab(action) {
    //if ($("#bSearchIn").html() != action) {

    switch (action) {
        case "Contracts":
            {
                //$("#bSearchIn").html(action);
                $("#aSearchContractTab").attr("data-searchtab", "true");
                $("#aSearchDocumentTab").attr("data-searchtab", "false");
                $("#aSearchCounterpartyTab").attr("data-searchtab", "false");
                $("#aSearchContractTab").css("background-color", "#f7f7f7");
                $("#aSearchDocumentTab").css("background-color", "");
                $("#aSearchCounterpartyTab").css("background-color", "");
                data - searchtab
                $("#keyword").focus();
                break;
            }
        case "Documents":
            {
                //$("#bSearchIn").html(action);
                $("#aSearchContractTab").attr("data-searchtab", "false");
                $("#aSearchDocumentTab").attr("data-searchtab", "true");
                $("#aSearchCounterpartyTab").attr("data-searchtab", "false");

                $("#aSearchContractTab").css("background-color", "");
                $("#aSearchDocumentTab").css("background-color", "#f7f7f7");
                $("#aSearchCounterpartyTab").css("background-color", "");
                $("#keyword").focus();
                break;
            }
        case "Counterparty":
            {
                //$("#bSearchIn").html(action);
                $("#aSearchContractTab").attr("data-searchtab", "false");
                $("#aSearchDocumentTab").attr("data-searchtab", "false");
                $("#aSearchCounterpartyTab").attr("data-searchtab", "true");

                $("#aSearchContractTab").css("background-color", "");
                $("#aSearchDocumentTab").css("background-color", "");
                $("#aSearchCounterpartyTab").css("background-color", "#f7f7f7");
                $("#keyword").focus();
                break;
            }
    }
    //}
}
//manoj

//Remove <>~
function ReplaceSpecialCharacters(obj) {
    if ($(obj).val().trim() != '') {
        var librarynametrim = $(obj).val();
        librarynametrim = librarynametrim.replace(/~/g, '');
        librarynametrim = librarynametrim.replace(/</g, '');
        librarynametrim = librarynametrim.replace(/>/g, '');
        librarynametrim = librarynametrim.replace(/;/g, '');
        librarynametrim = librarynametrim.replace(/:/g, '');
        //manoj
        librarynametrim = librarynametrim.replace(/"/g, '');
        //manoj
        //URL Encode Issue - Manas
        librarynametrim = librarynametrim.replace(/\+/g, '');
        //URL Encode Issue - Manas
        $(obj).val(librarynametrim);
    }
}

function ReplaceTagSymbol(obj) {
    if ($(obj).val().trim() != '') {
        var librarynametrim = $(obj).val();
        librarynametrim = librarynametrim.replace(/</g, '');
        librarynametrim = librarynametrim.replace(/>/g, '');
        $(obj).val(librarynametrim);
    }
}

function UnescapeNameMouseOver(obj) {
    obj.title = unescape(obj.title);
}

function ActivatedFeatureList() {
    var vAccFeatList = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vAccFeat = $.grep(vAccFeatList, function (n, i) {
        return (n.RowKey == "6" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        $(".FL_Counterparty").css('display', '');
    }
    vAccFeat = $.grep(vAccFeatList, function (n, i) {
        return (n.RowKey == "7" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        $(".FL_Automation").css('display', '');
    }
    vAccFeat = $.grep(vAccFeatList, function (n, i) {
        return (n.RowKey == "2" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        $(".FL_Obligations").css('display', '');
    }
    vAccFeat = $.grep(vAccFeatList, function (n, i) {
        return (n.RowKey == "8" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        $(".FL_WF_Rule").css('display', '');
    }
    vAccFeat = $.grep(vAccFeatList, function (n, i) {
        return (n.RowKey == "12" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        $(".FL_RequestsLayout").css('display', '');
        $(".FL_Requests").css('display', '');
    }
    else {
        $(".FL_RequestsLayout").css('display', 'none');
        $(".FL_Requests").css('display', 'none');
    }
    vAccFeat = $.grep(vAccFeatList, function (n, i) {
        return (n.RowKey == "11" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        $(".FL_Project").css('display', '');
    }
    vAccFeat = $.grep(vAccFeatList, function (n, i) {
        return (n.RowKey == "16" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        $(".FL_Pipeline").css('display', '');
    }

    vAccFeat = $.grep(vAccFeatList, function (n, i) {
        return (n.RowKey == "29" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        if (typeof localStorage.CompanyBrandingLogo === "undefined") {
            $.ajax({
                url: '/Accounts/GetAccountSetting?accountid=' + localStorage.AccountID,
                type: 'GET',
                dataType: 'json',
                cache: false,
                success: function (AccountSetting) {
                    if (AccountSetting.CompanyLogo != "") {
                        localStorage.setItem("CompanyBrandingLogo", AccountSetting.CompanyLogo);
                        $(".FL_CompanyBrandingLogo").attr("src", AccountSetting.CompanyLogo);
                        $(".FL_CompanyBrandingLogo").css('display', '');
                    }
                    else {
                        $(".FL_CompanyBrandingLogo").css('display', '');
                        localStorage.setItem("CompanyBrandingLogo", '/Content/Images/logo.png');
                    }
                }
            });
        }
        else {
            if (localStorage.CompanyBrandingLogo != "/Content/Images/logo.png") {
                $(".FL_CompanyBrandingLogo").attr("src", localStorage.CompanyBrandingLogo);
                $(".FL_CompanyBrandingLogo").css('display', '');
            }
            else {
                $(".FL_CompanyBrandingLogo").css('display', '');
            }

        }
    }
    else {
        $(".FL_CompanyBrandingLogo").css('display', '');
    }

}


$(window).on('load', function () {
    $('.OnPageLoad').css("display", "none");
    if (localStorage.AppAccountStatus == null || localStorage.AppAccountStatus == "" || localStorage.AppAccountStatus == "Suspend" || localStorage.AppAccountStatus == "Deactivate") {
        $('#mainContent').css("display", "none");
    }
    else {
        $('#mainContent').css("display", "");
    }
    //GetApplicationDateFormat()
    //MyNotificationList();
    //MyTaskList();
    //GetFeatures();
    //timeout_init();
});

//$("#mainContent img").load(function () {
//    $('.OnPageLoad').css("display", "none");
//    if (localStorage.AppAccountStatus == null || localStorage.AppAccountStatus == "" || localStorage.AppAccountStatus == "Suspend" || localStorage.AppAccountStatus == "Deactivate") {
//        $('#mainContent').css("display", "none");
//    }
//    else {
//        $('#mainContent').css("display", "");
//    }

//});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

//manoj
function NicEditorPasteEvent() {
    $("div.nicEdit-main").bind('input', function (e) {
        $("div.nicEdit-main style").remove();
    });
}
//manoj




Loading_init();
function Loading_Layout_trigger() {
    GetApplicationDateFormat();
    GetFeatures(true);
    GetAccountStatus();
    MyTaskList();
    MyNotificationList();
    timeout_init();
}
function Loading_init() {
    setTimeout('Loading_Layout_trigger()', 10000);
    setTimeout('Loading_View_trigger()', 10000);
}


//Added from 2.4final to 2.4

//Commented Link contract,document,request
//function getWorkflow() {
//    vWorkflowItem = "";
//    $.ajax({
//        url: '/api/accounts/' + localStorage.AccountID + '/Workflow',
//        type: 'GET',
//        dataType: 'json',
//        headers: { 'eContracts-ApiKey': localStorage.APIKey },
//        cache: false,
//        async: true,

//        success: function (data) {
//            vWorkflowItem = data;

//        },
//        error: function (data) {

//        }
//    });
//}

// commented link
//function getBusinessArea() {
//    $.ajax({
//        url: '/api/accounts/' + localStorage.AccountID + '/businessarea/aslistitem',
//        type: 'GET',
//        dataType: 'json',
//        headers: { 'eContracts-ApiKey': localStorage.APIKey },
//        success: function (data) {
//            vBusinessArea = data;
//        },
//        error: function (data) {
//        }
//    });
//}

//function GetContractDocument() {
//    vContractDocument = "";
//    $.ajax({
//        url: '/api/accounts/' + localStorage.AccountID + '/documents',
//        type: 'GET',
//        dataType: 'json',
//        'Content-Type': 'application/json',
//        cache: false,
//        //async: false,
//        headers: { 'eContracts-ApiKey': localStorage.APIKey },
//        success: function (data) {
//            vContractDocument = data;
//        },
//        error: function (data) {
//        }
//    });
//}
function viewdocinword(docurl) {
    var settings = {
        pattern: /\.[0-9a-z]+$/i,
        knownfiletypes: ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'zip', 'rar', 'gzip', 'arj', 'wav', 'mp3', 'aif', 'aiff', 'm4a', 'ogg', 'wma', 'psd', 'ai', 'swf', 'fla', 'css', 'js', 'avi', 'mov', 'wmv', 'dotx'],
        wopiframefiletypes: ['doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx', 'dotx']
    };

    var ext = docurl.match(settings.pattern);
    if (ext != null) {
        if (ext.length > 0) { ext = ext[0].slice(1); }
        if (decodeURIComponent(docurl).toLowerCase().indexOf(localStorage.SPHostUrl.toLowerCase()) >= 0) {
            if (jQuery.inArray(ext, settings.wopiframefiletypes) > -1) {
                $("#linkEditInWordOnline").attr('href', localStorage.SPHostUrl + "/_layouts/WopiFrame.aspx?sourcedoc=" + docurl + "&action=default")
                $("#showMSWordPopup").dialog("option", "title", "");
                $("#showMSWordPopup").dialog("open");
                window.open("ms-word:ofe|u|" + decodeURIComponent(docurl), "_self");
            } else {
                docurl = decodeURIComponent(docurl);
                window.open(docurl);
            }
        }
    }
    //$("#linkEditInWordOnline").attr('href', localStorage.SPHostUrl + "/_layouts/WopiFrame.aspx?sourcedoc=" + docurl + "&action=default")
    //$("#showMSWordPopup").dialog("option", "title", "");
    //$("#showMSWordPopup").dialog("open");   
}

$('document').click(function () {
    $('#subscribe-pop').hide(); //Hide the menus if visible
});

//manoj
$('body').click(function () {
    OpenandClose();
});
//manoj


$('#IconAlertSetting').click(function () {
    window.location.href = "/General/AlertSetting";
});

function DismissNotificationAll() {
    $("#loadingPage").fadeIn();
    $(".popModal").css("display", "none");
    var success = "";
    var liIds = "";

    if ($('#ulalert > li').length) {

        liIds = $('#ulalert li').map(function (i, n) {
            return $(n).attr('id');
        }).get().join(',');
    }

    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/notifications/dismissAll?notificationIDs=' + liIds,
        type: 'PUT',
        dataType: 'json',
        headers: {
            'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging
        },
        cache: false,
        success: function (data) {
            swal("", "All Notification Dismissed.");
            MyNotificationList();
            $("#loadingPage").fadeOut();
        },
        error: function (status) {
            $("#loadingPage").fadeOut();
        }
    });
}
//2.4

//manoj
function openNav() {
    if (document.getElementById("mySidenav").style.width == "320px") {
        document.getElementById("mySidenav").style.width = "0px";
        setTimeout('removeheight("mySidenav")', 500);
        $("#popModal_task").parent().css("background-color", "rgb(41, 50, 74)");
        document.getElementById("mySidenav").style.border = "0px";
    }
    else {
        document.getElementById("mySidenavAlert").style.width = "0";
        setTimeout('removeheight("mySidenavAlert")', 500);
        $("#mySidenav").css("height", "auto");
        document.getElementById("mySidenav").style.width = "320px";
        $("#popModal_alert").parent().css("background-color", "rgb(41, 50, 74)");
        $("#popModal_task").parent().css("background-color", "#6f7176");
    }
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    setTimeout('removeheight("mySidenav")', 500);
    $("#popModal_task").parent().css("background-color", "rgb(41, 50, 74)");
}
function openNavAlert() {
    if (document.getElementById("mySidenavAlert").style.width == "320px") {
        document.getElementById("mySidenavAlert").style.width = "0px";
        setTimeout('removeheight("mySidenavAlert")', 500);
        $("#popModal_alert").parent().css("background-color", "rgb(41, 50, 74)");
        document.getElementById("mySidenavAlert").style.border = "0px";
    }
    else {
        document.getElementById("mySidenav").style.width = "0";
        setTimeout('removeheight("mySidenav")', 500);
        $("#mySidenavAlert").css("height", "auto");
        document.getElementById("mySidenavAlert").style.width = "320px";
        $("#popModal_alert").parent().css("background-color", "#6f7176");
        $("#popModal_task").parent().css("background-color", "rgb(41, 50, 74)");
    }
}
function closeNavAlert() {
    document.getElementById("mySidenavAlert").style.width = "0";
    setTimeout('removeheight("mySidenavAlert")', 500);
    $("#popModal_alert").parent().css("background-color", "rgb(41, 50, 74)");
}

function hidealert(notificationID) {
    //Sridhar
    $("#" + notificationID).remove();
    var count = parseInt($("#iUnviewdAlerts").html());
    $("#iUnviewdAlerts").html((count - 1));

    document.getElementById("mySidenav").style.width = "0";
    setTimeout('removeheight("mySidenav")', 500);
    document.getElementById("mySidenavAlert").style.width = "0";
    setTimeout('removeheight("mySidenavAlert")', 500);
    $("#popModal_alert").parent().css("background-color", "rgb(41, 50, 74)");
    $("#popModal_task").parent().css("background-color", "rgb(41, 50, 74)");
}

function removeheight(control) {
    if (control == "mySidenav") {
        $("#mySidenav").css("height", "0px");
    } else {
        //$("#mySidenavAlert").css("height", "0px");
    }
}
////manoj
//Added from 2.4final to 2.4

function Upcoming() {
    $('#Upcoming').addClass('act');
    $('#Overdue').removeClass('act');
    $('#ulcontenttasks').css("display", "");
    $('#ulcontenttasks1').css("display", "none");

}
function Overdue() {
    $('#Overdue').addClass('act');
    $('#Upcoming').removeClass('act');
    $('#ulcontenttasks').css("display", "none");
    $('#ulcontenttasks1').css("display", "");

}
$("#logoDashboard").on("load", function () {
    if ($("a.clearr img").height() > 30)
        $(".logoRight li a b").height($("a.clearr img").height());
});

//manoj
function NavigateToAdvance() {
    location = "/General/AdvanceSearch";
}
//manoj
function OpenandClose() {
    if (document.activeElement != null) {
        if (document.activeElement.className != "taskModal") {
            if ($("#mySidenav").css('width') != "0") {
                document.getElementById("mySidenav").style.width = "0";
                setTimeout('removeheight("mySidenav")', 500);
                $("#popModal_task").parent().css("background-color", "rgb(41, 50, 74)");
            }
        }
    }

    if (document.activeElement != null) {
        if (document.activeElement.className != "alertModal") {
            if ($("#mySidenavAlert").css('width') != "0") {
                document.getElementById("mySidenavAlert").style.width = "0";
                setTimeout('removeheight("mySidenavAlert")', 500);
                $("#popModal_alert").parent().css("background-color", "rgb(41, 50, 74)");
            }
        }
    }
}


function CheckGlobalSettings() {
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/GlobalSettings',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            localStorage.setItem("RestrictHighSecurityTagging", data.RestrictHighSecurityTagging);
            var vAccFeat = [];
            var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
            $(".CounterSettingLayout").css("display", "none");
            if (veContractFeatures != null) {
                vAccFeat = $.grep(veContractFeatures, function (n, i) {
                    return (n.RowKey == "6" && n.Status == "ON");
                });
            }
            if (vAccFeat != null && vAccFeat.length > 0) {
                if (data == null) {
                    $(".CounterSettingLayout").css("display", "none");
                } else {
                    if (localStorage.UserType.indexOf("Global Contract Owner") >= 0) {
                        if (vAccFeat != null && vAccFeat.length > 0) {
                            $(".CounterSettingLayout").css("display", "");
                        }
                    }
                    else if (data.CreateCounterpartyCA == "Yes" && localStorage.UserType.indexOf("Contract Area Administrator") >= 0) {
                        if (vAccFeat != null && vAccFeat.length > 0) {
                            $(".CounterSettingLayout").css("display", "");
                        }
                    }
                    else if (data.CreateCounterpartyBA == "Yes" && localStorage.UserType.indexOf("Business Area Owner") >= 0) {
                        if (vAccFeat != null && vAccFeat.length > 0) {
                            $(".CounterSettingLayout").css("display", "");
                        }
                    }
                    else {
                        $(".CounterSettingLayout").css("display", "none");
                    }
                }
            }
            else {
                $(".CounterSettingLayout").css("display", "none");
            }
        },
        error: function (status) {
            localStorage.setItem("RestrictHighSecurityTagging", "No");
        }
    });
}


function aNavDashboardClick() {
    location = "/Home?SPHostUrl=" + localStorage.SPHostUrl;
}
