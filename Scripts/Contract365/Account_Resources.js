var image1 = "data:image/png;base64,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";
var image2 = "data:image/png;base64,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";

$(document).ready(function () {
    BindAccountSettings();
    BindResources();

    $("#browserenew").dialog({
        autoOpen: false,
        closeText: "",
        width: "30%",
        height: 200,
        title: "Renew Now",
        modal: true,
        buttons: {
            "OK": function () {
                readfile();
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });


});
function RenewNow() {
    $('#docTextfile').val('');
    $("#browserenew").dialog("option", "title", "Renew Now");
    $("#browserenew").dialog("open");
    $('#docTextfile').removeClass('error')
}
function readfile() {

    if (requiredValidator('browserenew')) {

        var ext = $('#docTextfile').val().split('/').pop().split('\\').pop();
        if (ext == "eContractsResourcesUpdate.txt") {
            var vTime = new Date() + " - ";
            var formData = new FormData();
            var opmlFile = $('#docTextfile')[0];
            formData.append("opmlFile", opmlFile.files[0]);
            formData.append("AccountID", localStorage.AccountID);
            $.ajax({
                url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/AccountRenewForLimits',
                type: 'POST',
                data: formData,
                cache: false,
                contentType: false,
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                processData: false,
                success: function (data) {
                    $("#browserenew").dialog("close");
                    location = '/Accounts/Resources';
                }
            });
        }
        else {
            $('#docTextfile').addClass('error')
        }
    }
}
function BindAccountSettings() {
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/AccountSetting',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (entity) {
            $("#headingCompanyName").text('' + entity.CompanyName + '');

            $("#imgOfCompanyLogo").attr("src", entity.CompanyLogo);
        },
        error:
            function (entity) {
            }
    });
}

function BindResources() {
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/LicenseLimit',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (entity) {

            if (entity.Status == "" || entity.Status == null) {
                $('#headingStatus').text("Account Status: mm/dd/yyyy");
            }
            else {
                $('#headingStatus').text("Account Status: " + entity.Status);
            }

            if (entity.ActivationDate == "" || entity.ActivationDate == null) {
                $('#headingActivationDate').text("Activation Date");
            }
            else {
                var date = new Date(entity.ActivationDate);
                var renewaldate1 = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
                $('#headingActivationDate').text('Activation Date ' + renewaldate1);
            }
            if (entity.NextRenewalORExpirationDate == "" || entity.NextRenewalORExpirationDate == null) {

                $('#headingRenewalDate').text("");
            }
            else {
                var date = new Date(entity.NextRenewalORExpirationDate);
                var renewaldate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();

                $('#headingRenewalDate').text("Next Renewal/Expiration Date " + renewaldate);
            }



            var d = new Date();
            var month = d.getMonth() + 1;
            var day = d.getDate();

            var output = d.getFullYear() + '/' +
                (month < 10 ? '0' : '') + month + '/' +
                (day < 10 ? '0' : '') + day;

            if (output != "" && $("#txtContractTermEvaluationDate").val() != "") {
                var From_date = new Date(output);
                var To_date = new Date(entity.NextRenewalORExpirationDate);

                var days = DiffBetDate(From_date, To_date);

                if (days == 0) {

                    $('#headingExpireDate').text("Your Account is going to expire on today ");
                }
                else if (days < 0) {

                    $('#headingExpireDate').text("Your Account has expired ");
                }
                else {
                    // document.getElementById('headingExpireDate').innerHTML = "Your Account will expire in  " + days;
                    $('#headingExpireDate').text("Your Account will expire in  " + days);
                }

            }

            $('#tblResources').empty();

            var strResources = "";
            strResources += "<tr>";
            strResources += "<td style='width:45%'>";
            strResources += "<label class='f_head1'>";
            if (entity.ContractAreaLimit == 0 || entity.ContractAreaLimit == null) {
            }
            else {
                strResources += "<a href='javascript:void(0);' style='background-position: left center;background-repeat: no-repeat;display: inline-block;text-decoration: none;width: 19px;height: 8px;' class='add-btn close1 Contribute' id='btnShowContractAreaContracts' onclick='OpenContractAreas()'></a>";
            }

            strResources += "Contract Areas</label>";
            strResources += "</td>";
            strResources += "<td class='labelleft'>";
            if (entity.ContractAreaLimit == 0 || entity.ContractAreaLimit == null) {

                strResources += "<img src='../Content/Images/reject.png' />";
            }
            else {
                strResources += entity.ContractAreaLimit;
            }
            strResources += "</td>";
            strResources += "<td class='labelleft'>";
            if (entity.ContractAreaUsed == 0 || entity.ContractAreaUsed == null) {


            }
            else {
                strResources += entity.ContractAreaUsed
            }
            strResources + "</td>";
            strResources += "<td>";
            strResources += "<div id='ContractAreaId'></div>";
            strResources += "</td>";
            strResources += "</tr>";

            var ContractsforContractAreaLimitArray = [];
            var ContractsforContractAreaUsedArray = [];
            ContractsforContractAreaLimitArray = getXMLToArray(entity.ContractsforContractAreaLimit);
            ContractsforContractAreaUsedArray = getXMLToArray(entity.ContractsforContractAreaUsed);

            var CACount = 1;

            for (key in ContractsforContractAreaLimitArray) {


                strResources += "<tr class='ContractsForCA' style='display:none;' >";
                strResources += "<td style='padding-left: 50px !important;'>";
                strResources += "<label class='f_head1'>   " + key + "</label>";
                strResources += "</td>";
                strResources += "<td class='labelleft'>";
                if (parseInt(ContractsforContractAreaLimitArray[key]) == 0 || ContractsforContractAreaLimitArray[key] == null) {

                    strResources += "<img src='../Content/Images/reject.png' />";
                }
                else {
                    strResources += ContractsforContractAreaLimitArray[key];
                }
                strResources += "</td>";
                strResources += "<td class='labelleft'>";
                //if (parseInt(ContractsforContractAreaUsedArray[key]) == 0 || ContractsforContractAreaUsedArray[key] == null) {


                //}
                //else {
                strResources += ContractsforContractAreaUsedArray[key];
                //}
                strResources + "</td>";
                strResources += "<td>";
                strResources += "<div id='CA" + CACount + "'></div>";
                strResources += "</td>";
                strResources += "</tr>";

                CACount = CACount + 1;
            }



            strResources += "<tr>";
            strResources += "<td>";
            strResources += "<label class='f_head1'>Contracts</label>";
            strResources += "</td>";
            strResources += "<td class='labelleft'>";
            if (entity.ContractsLimit == 0 || entity.ContractsLimit == null) {

                strResources += "<img src='../Content/Images/reject.png' />";
            }
            else {
                strResources += entity.ContractsLimit
            }
            strResources += "</td>";
            strResources += "<td class='labelleft'>";
            if (entity.ContractsUsed == 0 || entity.ContractsUsed == null) {


            }
            else {
                strResources += entity.ContractsUsed
            }
            strResources + "</td>";
            strResources += "<td>";
            strResources += "<div id='ContractsId'></div>";
            strResources += "</td>";
            strResources += "</tr>";
            strResources += "<tr>";
            strResources += "<td>";
            strResources += "<label class='f_head1'>Users</label>";
            strResources += "</td>";
            strResources += "<td class='labelleft'>";
            if (entity.CoreUsersLimit == 0 || entity.CoreUsersLimit == null) {

                strResources += "<img src='../Content/Images/reject.png' />";
            }
            else {
                strResources += entity.CoreUsersLimit
            }
            strResources += "</td>";
            strResources += "<td class='labelleft'>";
            if (entity.CoreUsersUsed == 0 || entity.CoreUsersUsed == null) {


            }
            else {
                strResources += entity.CoreUsersUsed
            }
            strResources + "</td>";
            strResources += "<td>";
            strResources += "<div id='CoreUsersId'></div>";
            strResources += "</td>";
            strResources += "</tr>";




            strResources += "<tr>";
            strResources += "<td>";
            strResources += "<label class='f_head1'>Contract Types</label>";
            strResources += "</td>";
            strResources += "<td class='labelleft'>";
            if (entity.ContractTypesLimit == 0 || entity.ContractTypesLimit == null) {

                strResources += "<img src='../Content/Images/reject.png' />";
            }
            else {
                strResources += entity.ContractTypesLimit;
            }
            strResources += "</td>";
            strResources += "<td class='labelleft'>";
            if (entity.ContractTypesUsed == 0 || entity.ContractTypesUsed == null) {


            }
            else {
                strResources += entity.ContractTypesUsed
            }
            strResources + "</td>";
            strResources += "<td>";
            strResources += "<div id='ContractTypesId'></div>";
            strResources += "</td>";
            strResources += "</tr>";

            strResources += "<tr>";
            strResources += "<td>";
            strResources += "<label class='f_head1'>Business User</label>";
            strResources += "</td>";
            strResources += "<td class='labelleft'>";
            if (entity.BusinessUserLimit == 0 || entity.BusinessUserLimit == null) {

                strResources += "<img src='../Content/Images/reject.png' />";
            }
            else {
                strResources += entity.BusinessUserLimit;
            }
            strResources += "</td>";
            strResources += "<td class='labelleft'>";
            if (entity.BusinessUserUsed == 0 || entity.BusinessUserUsed == null) {


            }
            else {
                strResources += entity.BusinessUserUsed
            }
            strResources + "</td>";
            strResources += "<td>";
            strResources += "<div id='BusinessUserId'></div>";
            strResources += "</td>";
            strResources += "</tr>";

            //
            strResources += "<tr>";
            strResources += "<td>";
            strResources += "<label class='f_head1'>Contract Administrator</label>";
            strResources += "</td>";
            strResources += "<td class='labelleft'>";
            if (entity.ContractAdministratorLimit == 0 || entity.ContractAdministratorLimit == null) {

                strResources += "<img src='../Content/Images/reject.png' />";
            }
            else {
                strResources += entity.ContractAdministratorLimit;
            }
            strResources += "</td>";
            strResources += "<td class='labelleft'>";
            if (entity.ContractAdministratorUsed == 0 || entity.ContractAdministratorUsed == null) {


            }
            else {
                strResources += entity.ContractAdministratorUsed
            }
            strResources + "</td>";
            strResources += "<td>";
            strResources += "<div id='ContractAdministratorId'></div>";
            strResources += "</td>";
            strResources += "</tr>";

            //
            strResources += "<tr>";
            strResources += "<td>";
            strResources += "<label class='f_head1'>Global Contract Owner</label>";
            strResources += "</td>";
            strResources += "<td class='labelleft'>";
            if (entity.GlobalContractOwnerLimit == 0 || entity.GlobalContractOwnerLimit == null) {

                strResources += "<img src='../Content/Images/reject.png' />";
            }
            else {
                strResources += entity.GlobalContractOwnerLimit;
            }
            strResources += "</td>";
            strResources += "<td class='labelleft'>";
            if (entity.GlobalContractOwnerUsed == 0 || entity.GlobalContractOwnerUsed == null) {


            }
            else {
                strResources += entity.GlobalContractOwnerUsed
            }
            strResources + "</td>";
            strResources += "<td>";
            strResources += "<div id='GlobalContractOwnerId'></div>";
            strResources += "</td>";
            strResources += "</tr>";


            //
            strResources += "<tr>";
            strResources += "<td>";
            strResources += "<label class='f_head1'>Account Owner</label>";
            strResources += "</td>";
            strResources += "<td class='labelleft'>";
            if (entity.AccountOwnerLimit == 0 || entity.AccountOwnerLimit == null) {

                strResources += "<img src='../Content/Images/reject.png' />";
            }
            else {
                strResources += entity.AccountOwnerLimit;
            }
            strResources += "</td>";
            strResources += "<td class='labelleft'>";
            if (entity.AccountOwnerUsed == 0 || entity.AccountOwnerUsed == null) {


            }
            else {
                strResources += entity.AccountOwnerUsed
            }
            strResources + "</td>";
            strResources += "<td>";
            strResources += "<div id='AccountOwnerId'></div>";
            strResources += "</td>";
            strResources += "</tr>";

            //
            strResources += "<tr>";
            strResources += "<td>";
            strResources += "<label class='f_head1'>BusinessArea Owner</label>";
            strResources += "</td>";
            strResources += "<td class='labelleft'>";
            if (entity.BusinessAreaOwnerLimit == 0 || entity.BusinessAreaOwnerLimit == null) {

                strResources += "<img src='../Content/Images/reject.png' />";
            }
            else {
                strResources += entity.BusinessAreaOwnerLimit;
            }
            strResources += "</td>";
            strResources += "<td class='labelleft'>";
            if (entity.BusinessAreaOwnerUsed == 0 || entity.BusinessAreaOwnerUsed == null) {


            }
            else {
                strResources += entity.BusinessAreaOwnerUsed
            }
            strResources + "</td>";
            strResources += "<td>";
            strResources += "<div id='BusinessAreaOwnerId'></div>";
            strResources += "</td>";
            strResources += "</tr>";

            //
            strResources += "<tr>";
            strResources += "<td>";
            strResources += "<label class='f_head1'>Active Contract Types</label>";
            strResources += "</td>";
            strResources += "<td class='labelleft'>";
            if (entity.ActiveContractTypesLimit == 0 || entity.ActiveContractTypesLimit == null) {

                strResources += "<img src='../Content/Images/reject.png' />";
            }
            else {
                strResources += entity.ActiveContractTypesLimit;
            }
            strResources += "</td>";
            strResources += "<td class='labelleft'>";
            if (entity.ActiveContractTypesUsed == 0 || entity.ActiveContractTypesUsed == null) {


            }
            else {
                strResources += entity.ActiveContractTypesUsed
            }
            strResources + "</td>";
            strResources += "<td>";
            strResources += "<div id='ActiveContractTypesId'></div>";
            strResources += "</td>";
            strResources += "</tr>";

            //
            strResources += "<tr>";
            strResources += "<td>";
            strResources += "<label class='f_head1'>Counterparties</label>";
            strResources += "</td>";
            strResources += "<td class='labelleft'>";
            if (entity.CounterpartiesLimit == 0 || entity.CounterpartiesLimit == null) {

                strResources += "<img src='../Content/Images/reject.png' />";
            }
            else {
                strResources += entity.CounterpartiesLimit;
            }
            strResources += "</td>";
            strResources += "<td class='labelleft'>";
            if (entity.CounterpartiesUsed == 0 || entity.CounterpartiesUsed == null) {


            }
            else {
                strResources += entity.CounterpartiesUsed
            }
            strResources + "</td>";
            strResources += "<td>";
            strResources += "<div id='CounterpartiesId'></div>";
            strResources += "</td>";
            strResources += "</tr>";
            //
            strResources += "<tr>";
            strResources += "<td>";
            strResources += "<label class='f_head1'>Active Counterparties</label>";
            strResources += "</td>";
            strResources += "<td class='labelleft'>";
            if (entity.ActiveCounterpartiesLimit == 0 || entity.ActiveCounterpartiesLimit == null) {

                strResources += "<img src='../Content/Images/reject.png' />";
            }
            else {
                strResources += entity.ActiveCounterpartiesLimit;
            }
            strResources += "</td>";
            strResources += "<td class='labelleft'>";
            if (entity.ActiveCounterpartiesUsed == 0 || entity.ActiveCounterpartiesUsed == null) {


            }
            else {
                strResources += entity.ActiveCounterpartiesUsed
            }
            strResources + "</td>";
            strResources += "<td>";
            strResources += "<div id='ActiveCounterpartiesId'></div>";
            strResources += "</td>";
            strResources += "</tr>";

            //
            strResources += "<tr>";
            strResources += "<td>";
            strResources += "<label class='f_head1'>Active Negotiation Portals</label>";
            strResources += "</td>";
            strResources += "<td class='labelleft'>";
            if (entity.ActiveNegotiationPortalsLimit == 0 || entity.ActiveNegotiationPortalsLimit == null) {

                strResources += "<img src='../Content/Images/reject.png' />";
            }
            else {
                strResources += entity.ActiveNegotiationPortalsLimit;
            }
            strResources += "</td>";
            strResources += "<td class='labelleft'>";
            if (entity.ActiveNegotiationPortalsUsed == 0 || entity.ActiveNegotiationPortalsUsed == null) {


            }
            else {
                strResources += entity.ActiveNegotiationPortalsUsed
            }
            strResources + "</td>";
            strResources += "<td>";
            strResources += "<div id='ActiveNegotiationPortalsId'></div>";
            strResources += "</td>";
            strResources += "</tr>";


            $('#tblResources').append(strResources);
            $('#btnShowContractAreaContracts').css('background-image', 'url(' + image1 + ')');


            if (entity.ContractAreaLimit == 0) {
                $("#ContractAreaId").removeClass(".ui-progressbar")

            }
            else {
                var ContractArea = parseInt(entity.ContractAreaUsed) / parseInt(entity.ContractAreaLimit);
                $("#ContractAreaId").progressbar({
                    value: ContractArea * 100
                });
                if (ContractArea > 1) {
                    $("#ContractAreaId").children('div').css('background', '#FE2E2E');
                }
                else {
                    $("#ContractAreaId").children('div').css('background', '#80FF00');
                }
            }


            if (entity.ContractsLimit == 0) {
                $("#ContractsId").removeClass(".ui-progressbar")
            }
            else {
                var Contracts = parseInt(entity.ContractsUsed) / parseInt(entity.ContractsLimit);
                $("#ContractsId").progressbar({
                    value: Contracts * 100
                });

                if (Contracts > 1) {
                    $("#ContractsId").children('div').css('background', '#FE2E2E');
                }
                else {
                    $("#ContractsId").children('div').css('background', '#80FF00');
                }
            }



            if (entity.CoreUsersLimit == 0) {
                $("#CoreUsersId").removeClass(".ui-progressbar")
            }
            else {
                var CoreUsers = parseInt(entity.CoreUsersUsed) / parseInt(entity.CoreUsersLimit);
                $("#CoreUsersId").progressbar({
                    value: CoreUsers * 100
                });

                if (CoreUsers > 1) {
                    $("#CoreUsersId").children('div').css('background', '#FE2E2E');
                }
                else {
                    $("#CoreUsersId").children('div').css('background', '#80FF00');
                }
            }



            if (entity.ContractTypesLimit == 0) {
                $("#ContractTypesId").removeClass(".ui-progressbar")
            }
            else {
                var ContractTypes = parseInt(entity.ContractTypesUsed) / parseInt(entity.ContractTypesLimit);
                $("#ContractTypesId").progressbar({
                    value: ContractTypes * 100
                });

                if (ContractTypes > 1) {
                    $("#ContractTypesId").children('div').css('background', '#FE2E2E');
                }
                else {
                    $("#ContractTypesId").children('div').css('background', '#80FF00');
                }
            }


            if (entity.BusinessUserLimit == 0) {
                $("#BusinessUserId").removeClass(".ui-progressbar")
            }
            else {
                var BusinessUser = parseInt(entity.BusinessUserUsed) / parseInt(entity.BusinessUserLimit);

                $("#BusinessUserId").progressbar({
                    value: BusinessUser * 100
                });
                if (BusinessUser > 1) {
                    $("#BusinessUserId").children('div').css('background', '#FE2E2E');
                }
                else {
                    $("#BusinessUserId").children('div').css('background', '#80FF00');
                }
            }


            if (entity.ContractAdministratorLimit == 0) {
                $("#ContractAdministratorId").removeClass(".ui-progressbar")
            }
            else {
                var ContractAdministrator = parseInt(entity.ContractAdministratorUsed) / parseInt(entity.ContractAdministratorLimit);

                $("#ContractAdministratorId").progressbar({
                    value: ContractAdministrator * 100
                });
                if (ContractAdministrator > 1) {
                    $("#ContractAdministratorId").children('div').css('background', '#FE2E2E');
                }
                else {
                    $("#ContractAdministratorId").children('div').css('background', '#80FF00');
                }
            }



            if (entity.GlobalContractOwnerLimit == 0) {
                $("#GlobalContractOwnerId").removeClass(".ui-progressbar")

            }
            else {
                var GlobalContractOwner = parseInt(entity.GlobalContractOwnerUsed) / parseInt(entity.GlobalContractOwnerLimit);

                $("#GlobalContractOwnerId").progressbar({
                    value: GlobalContractOwner * 100
                });
                if (GlobalContractOwner > 1) {
                    $("#GlobalContractOwnerId").children('div').css('background', '#FE2E2E');
                }
                else {
                    $("#GlobalContractOwnerId").children('div').css('background', '#80FF00');
                }

            }



            if (entity.AccountOwnerLimit == 0) {
                $("#AccountOwnerId").removeClass(".ui-progressbar")

            }
            else {
                var AccountOwner = parseInt(entity.AccountOwnerUsed) / parseInt(entity.AccountOwnerLimit);

                $("#AccountOwnerId").progressbar({
                    value: AccountOwner * 100
                });
                if (AccountOwner > 1) {
                    $("#AccountOwnerId").children('div').css('background', '#FE2E2E');
                }
                else {
                    $("#AccountOwnerId").children('div').css('background', '#80FF00');
                }
            }


            if (entity.BusinessAreaOwnerLimit == 0) {
                $("#BusinessAreaOwnerId").removeClass(".ui-progressbar")
            }
            else {
                var BusinessAreaOwner = parseInt(entity.BusinessAreaOwnerUsed) / parseInt(entity.BusinessAreaOwnerLimit);

                $("#BusinessAreaOwnerId").progressbar({
                    value: BusinessAreaOwner * 100
                });
                if (BusinessAreaOwner > 1) {
                    $("#BusinessAreaOwnerId").children('div').css('background', '#FE2E2E');
                }
                else {
                    $("#BusinessAreaOwnerId").children('div').css('background', '#80FF00');
                }
            }


            if (entity.ActiveContractTypesLimit == 0) {
                $("#ActiveContractTypesId").removeClass(".ui-progressbar")

            }
            else {
                var ActiveContractTypes = parseInt(entity.ActiveContractTypesUsed) / parseInt(entity.ActiveContractTypesLimit);

                $("#ActiveContractTypesId").progressbar({
                    value: ActiveContractTypes * 100
                });
                if (ActiveContractTypes > 1) {
                    $("#ActiveContractTypesId").children('div').css('background', '#FE2E2E');
                }
                else {
                    $("#ActiveContractTypesId").children('div').css('background', '#80FF00');
                }
            }

            if (entity.CounterpartiesLimit == 0) {
                $("#CounterpartiesId").removeClass(".ui-progressbar")

            }
            else {
                var Counterparties = parseInt(entity.CounterpartiesUsed) / parseInt(entity.CounterpartiesLimit);

                $("#CounterpartiesId").progressbar({
                    value: Counterparties * 100
                });
                if (Counterparties > 1) {
                    $("#CounterpartiesId").children('div').css('background', '#FE2E2E');
                }
                else {
                    $("#CounterpartiesId").children('div').css('background', '#80FF00');
                }
            }



            if (entity.ActiveCounterpartiesLimit == 0) {
                $("#ActiveCounterpartiesId").removeClass(".ui-progressbar")

            }
            else {
                var ActiveCounterparties = parseInt(entity.ActiveCounterpartiesUsed) / parseInt(entity.ActiveCounterpartiesLimit);

                $("#ActiveCounterpartiesId").progressbar({
                    value: ActiveCounterparties * 100
                });
                if (ActiveCounterparties > 1) {
                    $("#ActiveCounterpartiesId").children('div').css('background', '#FE2E2E');
                }
                else {
                    $("#ActiveCounterpartiesId").children('div').css('background', '#80FF00');
                }

            }



            if (entity.ActiveNegotiationPortalsLimit == 0) {
                $("#ActiveNegotiationPortalsId").removeClass(".ui-progressbar")

            }

            else {
                var ActiveNegotiationPorta = parseInt(entity.ActiveNegotiationPortalsUsed) / parseInt(entity.ActiveNegotiationPortalsLimit);

                $("#ActiveNegotiationPortalsId").progressbar({
                    value: ActiveNegotiationPorta * 100
                });
                if (ActiveNegotiationPorta > 1) {
                    $("#ActiveNegotiationPortalsId").children('div').css('background', '#FE2E2E');
                }
                else {
                    $("#ActiveNegotiationPortalsId").children('div').css('background', '#80FF00');
                }

            }


            CACount = 1;
            for (key in ContractsforContractAreaLimitArray) {

                if (parseInt(ContractsforContractAreaLimitArray[key]) == 0 || ContractsforContractAreaLimitArray[key] == null) {
                    $("#CA" + CACount + "").removeClass(".ui-progressbar")

                }
                else {
                    var CAPorta = 0;
                    if (parseInt(ContractsforContractAreaUsedArray[key]) == 0 || ContractsforContractAreaUsedArray[key] == null) {
                        CAPorta = 0;
                    }
                    else {
                        CAPorta = parseInt(ContractsforContractAreaUsedArray[key]) / parseInt(ContractsforContractAreaLimitArray[key]);
                    }
                    $("#CA" + CACount + "").progressbar({
                        value: CAPorta * 100
                    });
                    if (CAPorta > 1) {
                        $("#CA" + CACount + "").children('div').css('background', '#FE2E2E');
                    }
                    else {
                        $("#CA" + CACount + "").children('div').css('background', '#80FF00');
                    }


                }
                CACount = CACount + 1;

            }





        },
        error:
            function (entity) {
            }
    });



}


function OpenContractAreas() {
    $("#tblResources .ContractsForCA").each(function () {

        if ($(this)[0].style.display == 'none') {
            $('#btnShowContractAreaContracts').css('background-image', 'url(' + image2 + ')');
            $(this).css("display", "");

        }
        else {
            $('#btnShowContractAreaContracts').css('background-image', 'url(' + image1 + ')');
            $(this).css("display", "none");
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