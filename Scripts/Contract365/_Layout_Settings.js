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
});
$(document).ready(function () {
    OnLoad();
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
    } else {
        $(".FL_Workflow").css('display', 'none');
    }
    vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "12" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        $(".FL_Requests").css('display', '');
    }
    else {
        $(".FL_Requests").css('display', 'none');
    }
    vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "6" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        $(".FL_Counterparty").css('display', '');
    }
    vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "5" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        $(".FL_CounterpartyImport").css('display', '');
    }

    vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "15" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        $(".FL_BackupRestore").css('display', '');
    }
    vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "12" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        $(".FL_RequestsWorkFlow").css('display', '');
        vAccFeat = $.grep(veContractFeatures, function (n, i) {
            return (n.RowKey == "8" && n.Status == "ON");
        });
        if (vAccFeat.length > 0) {
            $(".FL_RequestsWorkFlow").css('display', '');
        } else { $(".FL_RequestsWorkFlow").css('display', 'none'); }
    }
    else {
        $(".FL_RequestsWorkFlow").css('display', 'none');
    }
    //Terms and clauses  
    vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "17" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        $(".FL_TermsandClauses").css('display', '');
    }
    vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "29" && n.Status == "ON");
    });

    vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "30" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        $(".FL_ApprovalSheet").css('display', '');
    }
    else {
        $(".FL_ApprovalSheet").css('display', 'none');
    }
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

    vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "38" && n.Status == "ON");
    });
    var vAccFeat1 = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "39" && n.Status == "ON");
    });
    if (vAccFeat.length > 0 || vAccFeat1.length > 0) {
        $('.FL_Integration').css("display","");
    }
    else {
        $('.FL_Integration').css("display", "none");
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
    //if (localStorage.SPHostUrl == '') {
    //    window.location = 'https://corevo.sharepoint.com/sites/eContract365';
    //}
    //else {
    //    window.location = localStorage.SPHostUrl;
    //}
}

function BackToList() {
    parent.history.back();
    return false;
}

function UserProfile() {
    var vURL = '/General/UserProfile';
    vURL += "?accountid=" + localStorage.AccountID;
    window.location = vURL;
}

function OnLoad() {
    var vPathname = location.pathname;

    /* Dashboard */
    if (vPathname == "/Settings") {
        $('#Dashboard').css("background-color", "#7d7d7d");
        $('#Dashboard').css("color", "#ffffff");
        //$('#dvDashboard').css("display", "block");
        // $('#dashboardSummary').css("color", "#343f5c");
    }
    else if (vPathname.indexOf("/Settings/Index") == 0) {
        $('#Dashboard').css("background-color", "#7d7d7d");
        $('#Dashboard').css("color", "#ffffff");
        $('#dvDashboard').css("display", "block");
        //$('#dashboardSummary').css("color", "#343f5c");
    }


        /* 1>Roles and Permissions */
    else if (vPathname.indexOf("/Settings/ManageUsers") == 0) {
        $('#UserRole').css("background-color", "#7d7d7d");
        $('#UserRole').css("color", "#ffffff");
        $('#dvUserRole').css("display", "block");
        $('#manageUsers').css("color", "#343f5c");
    }
    else if (vPathname.indexOf("/Settings/UserRole") == 0) {
        $('#UserRole').css("background-color", "#7d7d7d");
        $('#UserRole').css("color", "#ffffff");
        $('#dvUserRole').css("display", "block");
        $('#manageUsers').css("color", "#343f5c");
    }

        /*2> Company */
    else if (vPathname.indexOf("/Settings/CompanyProfile") == 0) {
        $('#Company').css("background-color", "#7d7d7d");
        $('#Company').css("color", "#ffffff");
        $('#dvCompany').css("display", "block");
        $('#companyProfile').css("color", "#343f5c");
    }
    else if (vPathname.indexOf("/Settings/BusinessAreas") == 0) {
        $('#Company').css("background-color", "#7d7d7d");
        $('#Company').css("color", "#ffffff");
        $('#dvCompany').css("display", "block");
        $('#companyBusinessArea').css("color", "#343f5c");
    }


        /* 3>Contract Repository */
    else if (vPathname.indexOf("/Settings/ContractFields") == 0) {
        $('#ContractRepository').css("background-color", "#7d7d7d");
        $('#ContractRepository').css("color", "#ffffff");
        $('#dvContractRepository').css("display", "block");
        $('#contractFields').css("color", "#343f5c");
    }
    else if (vPathname.indexOf("/Settings/ContractTypes") == 0) {
        $('#ContractRepository').css("background-color", "#7d7d7d");
        $('#ContractRepository').css("color", "#ffffff");
        // $('#dvContractRepository').css("display", "block");
        // $('#contractTypesList').css("color", "#343f5c");
    }
    else if (vPathname.indexOf("/Settings/ContractValue") == 0) {
        $('#ContractRepository').css("background-color", "#7d7d7d");
        $('#ContractRepository').css("color", "#ffffff");
        $('#dvContractRepository').css("display", "block");
        $('#contractValue').css("color", "#343f5c");
    }
    else if (vPathname.indexOf("/Settings/ContractNumber") == 0) {
        $('#ContractRepository').css("background-color", "#7d7d7d");
        $('#ContractRepository').css("color", "#ffffff");
        $('#dvContractRepository').css("display", "block");
        $('#contractNumber').css("color", "#343f5c");
    }
    else if (vPathname.indexOf("/Settings/ContractStatus") == 0) {
        $('#ContractRepository').css("background-color", "#7d7d7d");
        $('#ContractRepository').css("color", "#ffffff");
        $('#dvContractRepository').css("display", "block");
        $('#contractStatus').css("color", "#343f5c");
    }
    else if (vPathname.indexOf("/Settings/DefaultMilestones") == 0) {
        $('#ContractRepository').css("background-color", "#7d7d7d");
        $('#ContractRepository').css("color", "#ffffff");
        $('#ContractRepository').css("display", "block");
        $('#DefaultMilestones').css("color", "#343f5c");
    }


        /*4>request settings*/
    else if (vPathname.indexOf("/Settings/RequestFields") == 0) {
        $('#RequestRepository').css("background-color", "#7d7d7d");
        $('#RequestRepository').css("color", "#ffffff");
        $('#dvRequestRepository').css("display", "block");
        $('#requestFields').css("color", "#343f5c");
    }
    else if (vPathname.indexOf("/Settings/RequestTypes") == 0) {
        $('#RequestRepository').css("background-color", "#7d7d7d");
        $('#RequestRepository').css("color", "#ffffff");
        $('#dvRequestRepository').css("display", "block");
        $('#requestTypesList').css("color", "#343f5c");
    }
    else if (vPathname.indexOf("/Settings/RequestAssignment") == 0) {
        $('#RequestRepository').css("background-color", "#7d7d7d");
        $('#RequestRepository').css("color", "#ffffff");
        //$('#dvRequestRepository').css("display", "block");
        //$('#requestTypesList').css("color", "#343f5c");
    }

        /*5>Counterparty Management*/
    else if (vPathname.indexOf("/Settings/CounterpartyFields") == 0) {
        $('#CounterpartyRepository').css("background-color", "#7d7d7d");
        $('#CounterpartyRepository').css("color", "#ffffff");

    }
    else if (vPathname.indexOf("/Settings/CounterpartySettings") == 0) {
        $('#CounterpartyRepository').css("background-color", "#7d7d7d");
        $('#CounterpartyRepository').css("color", "#ffffff");

    }

    else if (vPathname.indexOf("/Settings/CounterpartyTypes") == 0) {
        $('#CounterpartyRepository').css("background-color", "#7d7d7d");
        $('#CounterpartyRepository').css("color", "#ffffff");

    }


        /* 6>MasterData and lookup  */
    else if (vPathname.indexOf("/Settings/Counterparty") == 0) {
        $('#MasterData').css("background-color", "#7d7d7d");
        $('#MasterData').css("color", "#ffffff");
        //  $('#dvCounterpartyRepository').css("display", "block");
        //  $('#manageCounterparty').css("color", "#343f5c");
    }
    else if (vPathname.indexOf("/Settings/BulkCounterpartyCreate") == 0) {
        $('#MasterData').css("background-color", "#7d7d7d");
        $('#MasterData').css("color", "#ffffff");
        //  $('#dvCounterpartyRepository').css("display", "block");
        //  $('#manageCounterparty').css("color", "#343f5c");
    }
    else if (vPathname.indexOf("/Settings/CounterpartyContacts") == 0) {
        $('#MasterData').css("background-color", "#7d7d7d");
        $('#MasterData').css("color", "#ffffff");
        //$('#dvContractRepository').css("display", "block");
        //$('#contractLookup').css("color", "#343f5c");
    }

    else if (vPathname.indexOf("/Settings/LookupValues") == 0) {
        $('#MasterData').css("background-color", "#7d7d7d");
        $('#MasterData').css("color", "#ffffff");
        //$('#dvContractRepository').css("display", "block");
        //$('#contractLookup').css("color", "#343f5c");
    }
    else if (vPathname.indexOf("/Settings/LookUp") == 0) {
        $('#MasterData').css("background-color", "#7d7d7d");
        $('#MasterData').css("color", "#ffffff");
        //$('#dvContractRepository').css("display", "block");
        //$('#contractLookup').css("color", "#343f5c");
    }
    else if (vPathname.indexOf("/Settings/Labels") == 0) {
        $('#MasterData').css("background-color", "#7d7d7d");
        $('#MasterData').css("color", "#ffffff");

    }
    else if (vPathname.indexOf("/Settings/Product") == 0) {
        $('#MasterData').css("background-color", "#7d7d7d");
        $('#MasterData').css("color", "#ffffff");

    }
    else if (vPathname.indexOf("/Settings/Project") == 0) {
        $('#MasterData').css("background-color", "#7d7d7d");
        $('#MasterData').css("color", "#ffffff");

    }

    else if (vPathname.indexOf("/Settings/GlobalFieldConfigurations") == 0) {
        $('#MasterData').css("background-color", "#7d7d7d");
        $('#MasterData').css("color", "#ffffff");

    }

        /* 7>Document Management  */
    else if (vPathname.indexOf("/Settings/DocumentTypes") == 0) {
        $('#Documents').css("background-color", "#7d7d7d");
        $('#Documents').css("color", "#ffffff");
        $('#dvDocuments').css("display", "block");
        $('#documentTypes').css("color", "#343f5c");
    }
    else if (vPathname.indexOf("/Settings/UploadTemplate") == 0) {
        $('#Documents').css("background-color", "#7d7d7d");
        $('#Documents').css("color", "#ffffff");
        $('#dvDocuments').css("display", "block");
        $('#documentTemplate').css("color", "#343f5c");
    }
    else if (vPathname.indexOf("/Settings/TemplateConfigurationKeywords") == 0) {
        $('#Documents').css("background-color", "#7d7d7d");
        $('#Documents').css("color", "#ffffff");
        $('#dvDocuments').css("display", "block");
        $('#documentTemplateConfiguration').css("color", "#343f5c");
    }

    else if (vPathname.indexOf("/Settings/DraftLibrarySettings") == 0) {
        $('#Documents').css("background-color", "#7d7d7d");
        $('#Documents').css("color", "#ffffff");
        $('#dvDocuments').css("display", "block");
        $('#documentLibrary').css("color", "#343f5c");
    }


        /* 8>Workflow and task  */
    else if (vPathname.indexOf("/Settings/WorkflowConfigurationList") == 0) {
        $('#Workflows').css("background-color", "#7d7d7d");
        $('#Workflows').css("color", "#ffffff");
        
        if (location.search.indexOf("Document%20Review") > 0 || location.search.indexOf("Amendment%20Approval") > 0 || location.search.indexOf("Request%20Approval") > 0) {
            $('#myMenuAll').find('li').each(function () {
                if ($(this).hasClass('approve') || $(this).hasClass('review')) {
                    $(this).remove();
                }
            });
        }
    }
    else if (vPathname.indexOf("/Settings/WorkflowSettings") == 0) {
        $('#Workflows').css("background-color", "#7d7d7d");
        $('#Workflows').css("color", "#ffffff");

    }

        /* 9>Alerts And Reminder  */
    else if (vPathname.indexOf("/Settings/AlertNotification") == 0) {
        $('#AlertsReminders').css("background-color", "#7d7d7d");
        $('#AlertsReminders').css("color", "#ffffff");
        //$('#dvHistory').css("display", "block");
        //$('#AlertsHistory').css("color", "#343f5c");
    }
    else if (vPathname.indexOf("/Settings/WorkflowAlertSettings") == 0) {
        $('#AlertsReminders').css("background-color", "#7d7d7d");
        $('#AlertsReminders').css("color", "#ffffff");
        //$('#dvHistory').css("display", "block");
        //$('#AlertsHistory').css("color", "#343f5c");
    }
    else if (vPathname.indexOf("/Settings/DefaultReminderSetup") == 0) {
        $('#AlertsReminders').css("background-color", "#7d7d7d");
        $('#AlertsReminders').css("color", "#ffffff");
        //$('#dvHistory').css("display", "block");
        //$('#AlertsHistory').css("color", "#343f5c");
    }

    else if (vPathname.indexOf("/Settings/Alert") == 0) {
        $('#AlertsReminders').css("background-color", "#7d7d7d");
        $('#AlertsReminders').css("color", "#ffffff");
        //$('#dvHistory').css("display", "block");
        //$('#AlertsHistory').css("color", "#343f5c");
    }

        /* 10>Reports and metrics  */

    else if (vPathname.indexOf("/Settings/Reports") == 0) {
        $('#Reports').css("background-color", "#7d7d7d");
        $('#Reports').css("color", "#ffffff");
        $('#dvReports').css("display", "block");
        $('#rptcannedReports').css("color", "#343f5c");
    }
    else if (vPathname.indexOf("/Settings/MetricsSettings") == 0) {
        $('#Reports').css("background-color", "#7d7d7d");
        $('#Reports').css("color", "#ffffff");
        //$('#dvReports').css("display", "block");
        //$('#rptcannedReports').css("color", "#343f5c");
    }

        /* 11>System  */
    else if (vPathname.indexOf("/Settings/Loghistory") == 0) {
        $('#History').css("background-color", "#7d7d7d");
        $('#History').css("color", "#ffffff");
        $('#dvHistory').css("display", "block");
        $('#LogHistory').css("color", "#343f5c");
    }

    else if (vPathname.indexOf("/Settings/Backup_Restore") == 0) {
        $('#History').css("background-color", "#7d7d7d");
        $('#History').css("color", "#ffffff");
        //$('#dvHistory').css("display", "block");
        //$('#Backup_RestoreHistory').css("color", "#343f5c");
    }

    else if (vPathname.indexOf("/Settings/RecycleBin") == 0) {
        $('#History').css("background-color", "#7d7d7d");
        $('#History').css("color", "#ffffff");
        $('#dvHistory').css("display", "block");
        $('#RecycleBinHistory').css("color", "#343f5c");
    }

    else if (vPathname.indexOf("/Settings/RecycleBinRequests") == 0) {
        $('#History').css("background-color", "#7d7d7d");
        $('#History').css("color", "#ffffff");
        //$('#dvHistory').css("display", "block");
        //$('#Backup_RestoreHistory').css("color", "#343f5c");
    }
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
            localStorage.setItem("UserType", data.UserType);
            $("#userDesignation").html(data.UserType);

            var vAdminAccess = 'No';
            if (data.UserType.indexOf("Global Contract Owner") >= 0) {
                vAdminAccess = 'Yes';
            }
            if (data.UserType.indexOf("Global Administrator") >= 0) {
                vAdminAccess = 'Yes';
            }
            if (vAdminAccess == 'No' || vAdminAccess == '') {
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

            if (localStorage.UserType.indexOf("Account Owner") >= 0) {
                $('#liAccount').css("display", "");
            }
            var UserType = $.map(localStorage.UserType.split(";"), $.trim);
            //if (localStorage.UserType.indexOf("Global Administrator") >= 0 && UserType.length == 2) {
            //    $(".Perm_GlobalInsight").css("display", "none");
            //}
            if (localStorage.UserType.indexOf("Account Owner") >= 0 && UserType.length == 2) {
                $(".Perm_GlobalInsight").css("display", "none");
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

$("input:text").blur(function () {
    var vTextVal = $.trim($(this).val());
    vTextVal = vTextVal.replace(/~/g, '');
    //URL Encode Issue - Manas
    vTextVal = vTextVal.replace(/\+/g, '');
    //URL Encode Issue - Manas
    $(this).val(vTextVal);
});

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
//Remove <>~
function ReplaceSpecialCharacters(obj) {
    if ($(obj).val().trim() != '') {
        var librarynametrim = $(obj).val();
        librarynametrim = librarynametrim.replace(/~/g, '');
        librarynametrim = librarynametrim.replace(/</g, '');
        librarynametrim = librarynametrim.replace(/>/g, '');
        librarynametrim = librarynametrim.replace(/;/g, '');
        librarynametrim = librarynametrim.replace(/:/g, '');
        librarynametrim = librarynametrim.replace(/'/g, '');
        librarynametrim = librarynametrim.replace(/"/g, '');
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
        librarynametrim = librarynametrim.replace(/'/g, '');
        $(obj).val(librarynametrim);
    }
}

function UnescapeNameMouseOver(obj) {
    obj.title = unescape(obj.title);
}

function eventFired(nameattr, objvalue, tablname) {
    if ($('input:checkbox[name="' + nameattr + '"]:checked').length == $('input:checkbox[name="' + nameattr + '"]').length && $('input:checkbox[name="' + nameattr + '"]:checked').length != 0) {
        $("#" + objvalue).attr('checked', true);
    } else {
        $("#" + objvalue).attr('checked', false);
    }
}

//manoj
function NicEditorPasteEvent() {
    $("div.nicEdit-main").bind('input', function (e) {
        $("div.nicEdit-main style").remove();
    });
}
//manoj
//Added from 2.4final to 2.4
function autoscroll() {
    if ($(".error").length > 0) {
        $('html, body').animate({
            scrollTop: $(".error").offset().top
        }, 2000);
    }
}

$("#logoDashboard").on("load", function () {
    if ($("a.clearr img").height() > 30)
        $(".admin_settings-Pop li a b").height($("a.clearr img").height());
});