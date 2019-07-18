//var vApiBaseSiteUrl = 'http://localhost:63571/';
$(function () {
    $("#mainContent").click(function () {
        if (!$('#user-vmenu').hide()) {
            $('#user-vmenu').hide();
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

    })
    if (localStorage.UserType.indexOf("Account Owner") >= 0) {
        $('#liAccount').css("display", "");
    }

});
$(document).ready(function () {
    EnableFeatures();
    CheckLicenseLimit();
    GetUserPermission();
});

$(window).on('load', function () {
    $('.OnPageLoad').css("display", "none");
    $('#mainContent').css("display", "");
});

$("#mainContent img").on('load', function () {
    $('.OnPageLoad').css("display", "none");
    $('#mainContent').css("display", "");
});


function EnableFeatures() {
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "11" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        $(".FL_Project").css('display', '');
    }
    vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "12" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        $(".FL_Requests").css('display', '');
    }
    vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "7" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        $(".FL_Automation").css('display', '');
    }
    vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "10" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        $(".FL_Product").css('display', '');
    }
    vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "8" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        $(".FL_Workflow").css('display', '');
    }
    vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "6" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        $(".FL_Counterparty").css('display', '');
    }

    vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "15" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        $(".FL_BackupRestore").css('display', '');
    }
    vAccFeat = $.grep(veContractFeatures, function (n, i) {
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
            if (item.ContractTypesUsed > item.ContractTypesLimit) {
                if (vmsg == '')
                    vmsg = 'Number of Contract Types';
                else
                    vmsg += ', Number of Contract Types';
            }
            if (vmsg != '') {
                vmsg = 'Licensing Alert: Limits reached / exceeded for ' + vmsg + '. Please update your eContracts account.';
                $("#dvWarning").css("display", "");
                $("#dvWarningText").append(vmsg);
            }
        }
    });
}

function BackToO365() {
    if (localStorage.SPHostUrl == '') {
        window.location = 'https://corevo.sharepoint.com/sites/eContract365';
    }
    else {
        window.location = localStorage.SPHostUrl;
    }
}

function UserProfile() {
    var vURL = '/General/UserProfile';
    vURL += "?accountid=" + localStorage.AccountID;
    window.location = vURL;
}

function OnLoad() {
}

var BusinessAreaAccess = [];
function GetUserPermission() {
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/users?userid=' + localStorage.UserID + '&office365emailid=',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {

            if (data.ProfilePicture != null && data.ProfilePicture != "") {
                $("#imgProfile").attr('src', data.ProfilePicture);
                $("#imgProfileLogo").attr('src', data.ProfilePicture);
            }
            else if (data.ProfilePicture == null || data.ProfilePicture == "") {
                $("#imgProfile").attr('src', "/Content/Images/my-proffil.png");
                $("#imgProfileLogo").attr('src', "/Content/Images/my-proffil-logo.png");
            }

            var BAreaAccess = data.BusinessArea + ";" + data.BusinessAreaContribute + ";" + data.OwnerOfBusinessAreas;
            var newArray = BAreaAccess.split(';').filter(function (v) { return v !== '' }); // remove empty
            BusinessAreaAccess = newArray;
        },
        error:
            function (data) {
                location = "/Error/UserDisabled";
            }
    });
}

$('#btnsearchclause').click(function () {
    searchkeywordterm();
});

function searchkeywordterm() {
    if ($("#txtsearchclause").val() != "") {
        if ($("#txtsearchclause").val().trim() != "") {
            location = "/Settings/SearchClause?Searchkeyword=" + $("#txtsearchclause").val();
        }
        else {
            alert("Search Keyword not empty.");
            $("#txtsearchclause").empty();
            $("#txtsearchclause").focus();
        }
    }
    else {
        alert("Enter Search Keyword.");
        $("#txtsearchclause").empty();
        $("#txtsearchclause").focus();
    }
}

$('#txtsearchclause').keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        searchkeywordterm();
    }
});

function BackToList() {
    var vURL = '/Settings/Index';
    window.location = vURL;
}

function redirectclausedb() {
    var vURL = '/Settings/ClauseDB';
    window.location = vURL;
}

function redirectclause() {
    var vURL = '/Settings/Clause';
    window.location = vURL;
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
    //location = "/Reports/GlobalReports";
    location = "/Reports/GlobalReportsLanding?SPHostUrl=" + localStorage.SPHostUrl;
}


$("#logoDashboard").on("load", function () {
    if ($("a.clearr img").height() > 30)
        $(".admin_settings-Pop li a b").height($("a.clearr img").height());
});