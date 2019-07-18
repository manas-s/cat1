//var vApiBaseSiteUrl = 'http://localhost:63571/';
var vGlobalInsight = 'Yes';
$(function () {
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
    //if (localStorage.UserType.indexOf("Global Contract Owner") >= 0 || localStorage.UserType.indexOf("Global Administrator") >= 0) {
    //    $('#liSettings').css("display", "");
    //}
    var UserType = $.map(localStorage.UserType.split(";"), $.trim);
    if (localStorage.UserType.indexOf("Global Administrator") >= 0 && UserType.length == 2) {
        $(".Perm_GlobalInsight").css("display", "none");
    }
    if (localStorage.UserType.indexOf("Account Owner") >= 0 && UserType.length == 2) {
        $(".Perm_GlobalInsight").css("display", "none");
    }
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vAccFeat = $.grep(veContractFeatures, function (n, i) {
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

});
$(document).ready(function () {
    var vPathname = location.pathname;
    CheckLicenseLimit();
    GetUserPermission();
});

function CheckLicenseLimit() {
    $("#ulMetadata").empty();
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/LicenseLimit',
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        processData: false,
        success: function (item) {
            var vmsg = '';
            if (item.ContractAreaUsed > item.ContractAreaLimit) {
                vmsg = 'Number of Contract Area';
            }
            var ContractsforContractAreaLimitArray = [];
            var ContractsforContractAreaUsedArray = [];
            ContractsforContractAreaLimitArray = getXMLToArray(item.ContractsforContractAreaLimit);
            ContractsforContractAreaUsedArray = getXMLToArray(item.ContractsforContractAreaUsed);
            for (key in ContractsforContractAreaLimitArray) {
                if (parseInt(ContractsforContractAreaLimitArray[key]) < parseInt(ContractsforContractAreaUsedArray[key])) {
                    if (vmsg == '')
                        vmsg = 'Number of Contracts for ' + key;
                    else
                        vmsg += ', Number of Contracts for ' + key;
                }
            }

            if (item.ContractsUsed > item.ContractsLimit) {
                if (vmsg == '')
                    vmsg = 'Number of Contracts';
                else
                    vmsg += ', Number of Contracts';
            }
            if (item.CoreUsersUsed > item.CoreUsersLimit) {
                if (vmsg == '')
                    vmsg = 'Number of Users';
                else
                    vmsg += ', Number of Users';
            }

            if (item.AccountOwnerUsed > item.AccountOwnerLimit) {
                if (vmsg == '')
                    vmsg = 'Number of Account Owners';
                else
                    vmsg += ', Number of Account Owners';
            }

            if (item.BusinessAreaOwnerUsed > item.BusinessAreaOwnerLimit) {
                if (vmsg == '')
                    vmsg = 'Number of Business Area Owners';
                else
                    vmsg += ', Number of Business Area Owners';
            }
            if (item.BusinessUserUsed > item.BusinessUserLimit) {
                if (vmsg == '')
                    vmsg = 'Number of Business Users';
                else
                    vmsg += ', Number of Business Users';
            }
            if (item.ContractAdministratorUsed > item.ContractAdministratorLimit) {
                if (vmsg == '')
                    vmsg = 'Number of Contract Administrators';
                else
                    vmsg += ', Number of Contract Administrators';
            }

            if (item.GlobalContractOwnerUsed > item.GlobalContractOwnerLimit) {
                if (vmsg == '')
                    vmsg = 'Number of Global Contract Owners';
                else
                    vmsg += ', Number of Global Contract Owners';
            }


            if (item.ContractTypesUsed > item.ContractTypesLimit) {
                if (vmsg == '')
                    vmsg = 'Number of Contract Types';
                else
                    vmsg += ', Number of Contract Types';
            }
            if (item.ActiveContractTypesUsed > item.ActiveContractTypesLimit) {
                if (vmsg == '')
                    vmsg = 'Number of Active Contract Types';
                else
                    vmsg += ', Number of Active Contract Types';
            }

            if (item.CounterpartiesUsed > item.CounterpartiesLimit) {
                if (vmsg == '')
                    vmsg = 'Number of Counterparties';
                else
                    vmsg += ', Number of Counterparties';
            }
            if (item.ActiveCounterpartiesUsed > item.ActiveCounterpartiesLimit) {
                if (vmsg == '')
                    vmsg = 'Number of Active Counterparties';
                else
                    vmsg += ', Number of Active Counterparties';
            }
            if (vmsg != '') {
                vmsg = 'Licensing Alert: Limits reached / exceeded for ' + vmsg + '. Please update your eContracts account.';
                $("#dvWarning").css("display", "");
                $("#dvWarningText").append(vmsg);
            }
        }
    });
}


function getXMLToArray(xmlDoc) {

    var thisArray = [];
    //Check XML doc
    if ($(xmlDoc).find("ContractAreaLimit").length > 0) {
        $(xmlDoc).find("ContractAreaLimit").each(function () {
            thisArray[$(this).find("ContractArea").text()] = $(this).find("Contracts").text();
        });
    }
    else if ($(xmlDoc).find("ContractAreaUsed").length > 0) {
        $(xmlDoc).find("ContractAreaUsed").each(function () {
            thisArray[$(this).find("ContractArea").text()] = $(this).find("Contracts").text();
        });
    }
    return thisArray;
}



function BackToO365() {
    if (localStorage.SPHostUrl == '') {
        window.open('https://corevo.sharepoint.com/sites/eContract365');
    }
    else {
        window.open(localStorage.SPHostUrl);
    }
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
    location = "/Reports/GlobalReportsLanding?SPHostUrl=" + localStorage.SPHostUrl;
    //location = "/Reports/GlobalReports";
}

function UserProfile() {
    var vURL = '/General/UserProfile';
    vURL += "?accountid=" + localStorage.AccountID;
    window.location = vURL;
}
function GetUserPermission() {
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/users?userid=' + localStorage.UserID + '&office365emailid=',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            var vAccountAccess = 'No';
            if (data.UserType.indexOf("Account Owner") >= 0) {
                vAccountAccess = 'Yes';
            }
            if (vAccountAccess == 'No' || vAccountAccess == '') {
                location = "/Error/AccessDenied";
            }
            if (data.ProfilePicture != null && data.ProfilePicture != "") {
                $("#imgProfile").attr('src', data.ProfilePicture);
                $("#imgProfileLogo").attr('src', data.ProfilePicture);
            }
            else if (data.ProfilePicture == null || data.ProfilePicture == "") {
                $("#imgProfile").attr('src', "/Content/Images/my-proffil.png");
                $("#imgProfileLogo").attr('src', "/Content/Images/my-proffil-logo.png");
            }
        },
        error:
                function (data) {
                    location = "/Error/UserDisabled";
                }
    });
}

$('input[readonly]').on('keydown', function (e) {
    if (e.which === 8) {
        e.preventDefault();
    }
});

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

$("#logoDashboard").on("load", function () {
    //if ($("a.clearr img").height() > 30)
    //    $(".admin_settings-Pop li a b").height($("a.clearr img").height());
});