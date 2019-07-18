
var listFeatures = "";
$(document).ready(function () {
    var DatepickerFormat = '';
    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
    { DatepickerFormat = 'mm/dd/yy'; }
    else { DatepickerFormat = localStorage.AppDateFormat.toLowerCase().slice(0, -2); }

    allowOnlyNumberInInputBox("txtExpirationLimit");
    allowOnlyNumberInInputBox("txtSuspenstionLimit");
    allowOnlyNumberInInputBox("txtContractAreas");
    allowOnlyNumberInInputBox("txtContractsperContractAreas");
    allowOnlyNumberInInputBox("txtContracts");
    allowOnlyNumberInInputBox("txtUsers");
    allowOnlyNumberInInputBox("txtBusinessUser");
    allowOnlyNumberInInputBox("txtContractAdministrator");
    allowOnlyNumberInInputBox("txtGlobalContractOwner");
    allowOnlyNumberInInputBox("txtAccountOwner");
    allowOnlyNumberInInputBox("txtBusinessAreaOwner");
    allowOnlyNumberInInputBox("txtContractTypes");
    allowOnlyNumberInInputBox("txtActiveContractTypes");
    allowOnlyNumberInInputBox("txtCounterparties");
    allowOnlyNumberInInputBox("txtActiveCounterparties");
    allowOnlyNumberInInputBox("txtActiveNegotiationPortals");


    $('#txtRenewalDate').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: DatepickerFormat
        // minDate: 0,   
    });

    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/feature',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        async: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            listFeatures = data;
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                var article = "";
                if (i == 0) {
                    article += '<tr>';
                    article += '<td class="pageheading" colspan="4">Features Enable</td>';
                    article += '</tr>';
                    article += '<tr><th style="background: #29324A none repeat scroll 0% 0%;color: #FFF;font-weight: bold;">Feature Name</th><th style="background: #29324A none repeat scroll 0% 0%;color: #FFF;font-weight: bold;">Staus (ON/OFF)</th><th style="background: #29324A none repeat scroll 0% 0%;color: #FFF;font-weight: bold;">Enable (YES/NO)</th></tr>';
                    article += '<tr><td>&nbsp;</td><td></td><td></td></tr></br>';
                }
                article += '<tr id="' + item.RowKey + '" class="customtr" >';
                article += '<td><label class="f_head1">' + item.FeatureName + '</label></td>';              
                article += '<td class="verticalalign-top">';
                article += '<input id="rdFeatureON' + item.RowKey + '" type="radio" checked name="FeatureStaus' + item.RowKey + '" class="css-checkbox" value="ON" />';
                article += '<label for="rdFeatureON' + item.RowKey + '" class="css-label margin-right8">On</label>';
                article += '<input id="rdFeatureOFF' + item.RowKey + '" type="radio" name="FeatureStaus' + item.RowKey + '" class="css-checkbox" value="OFF" />';
                article += '<label for="rdFeatureOFF' + item.RowKey + '" class="css-label margin-right8">Off</label>';
                article += '</td>';

                article += '<td class="verticalalign-top">';
                article += '<input id="rdFeatureEnableON' + item.RowKey + '" type="radio" checked name="FeatureEnable' + item.RowKey + '" class="css-checkbox" value="YES" />';
                article += '<label for="rdFeatureEnableON' + item.RowKey + '" class="css-label margin-right8">Yes</label>';
                article += '<input id="rdFeatureEnableOFF' + item.RowKey + '" type="radio" name="FeatureEnable' + item.RowKey + '" class="css-checkbox" value="NO" />';
                article += '<label for="rdFeatureEnableOFF' + item.RowKey + '" class="css-label margin-right8">No</label>';
                article += '</td>';
                article += '</tr>';

                $("#addAccountFeatures").append(article);
            }

        },
        error: function (data) {

        }
    });


    $('#btnGenerateAccount').click(function () {
        if (requiredValidator('generateAccountFile', false)) {
            $("#loadingPage").fadeIn();
            $.ajax({
                url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/generateaccrenewalfile',
                type: 'POST',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                data: {
                    Status: $("#ddlAccountStatus").val(),
                    SuspendLimit: parseInt($("#txtSuspenstionLimit").val()),
                    ExpireLimit: parseInt($("#txtExpirationLimit").val()),
                    NextRenewalORExpirationDate: $.datepicker.formatDate('mm/dd/yy', $("#txtRenewalDate").datepicker('getDate')),
                },
                cache: false,
                success: function (person) {
                    $("#loadingPage").fadeOut();
                    location = location;
                },
                error: function (person) {

                }
            });
        }
    });


    $('#btnGenerateResources').click(function () {
        if (requiredValidator('addAccountResources', false)) {
            $("#loadingPage").fadeIn();
            $.ajax({
                url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/generateresourcerenewalfile',
                type: 'POST',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
                data: {
                    ContractAreaLimit: $("#txtContractAreas").val(),
                    ContractsforContractAreaLimit: $("#txtContractsperContractAreas").val(),
                    ContractsLimit: $("#txtContracts").val(),
                    CoreUsersLimit: $("#txtUsers").val(),
                    BusinessUserLimit: $("#txtBusinessUser").val(),
                    ContractAdministratorLimit: $("#txtContractAdministrator").val(),
                    GlobalContractOwnerLimit: $("#txtGlobalContractOwner").val(),
                    AccountOwnerLimit: $("#txtAccountOwner").val(),
                    BusinessAreaOwnerLimit: $("#txtBusinessAreaOwner").val(),
                    ContractTypesLimit: $("#txtContractTypes").val(),
                    ActiveContractTypesLimit: $("#txtActiveContractTypes").val(),
                    CounterpartiesLimit: $("#txtCounterparties").val(),
                    ActiveCounterpartiesLimit: $("#txtActiveCounterparties").val(),
                    ActiveNegotiationPortalsLimit: $("#txtActiveNegotiationPortals").val()
                },
                cache: false,
                success: function (person) {
                    $("#loadingPage").fadeOut();
                    location = location;
                },
                error: function (person) {

                }
            });
        }
    });


    $('#btnGenerateFeatures').click(function () {


        if (listFeatures != null) {


            var collection = [];
            $('#addAccountFeatures tr.customtr').each(function () {
                var featureItem = "";
                var ID = $(this)[0].id;
                featureItem = $.grep(listFeatures, function (p) { return p.RowKey == ID; })
           .map(function (p) { return p });
                featureItem[0].Status = $("input:radio[name=FeatureStaus" + ID + "]:checked").val();
                featureItem[0].Enable = $("input:radio[name=FeatureEnable" + ID + "]:checked").val();
                collection.push(featureItem);
            });



            $.ajax({
                url: url = vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/generatefeaturesenewalfile',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                data: JSON.stringify(listFeatures),
                cache: false,
                success: function (data) {

                    location = "/Accounts/AccountRenewalGenerateFile";
                },
                error:
                    function (data) {

                    }
            });

        }

    });


});


function calcultotalContracts() {
    if ($("#txtContractAreas").val() != "" && $("#txtContractsperContractAreas").val() != "") {
        $("#txtContracts").val(parseInt($("#txtContractAreas").val()) * parseInt($("#txtContractsperContractAreas").val()));
    }
}





function checking() {
    $("#txtContracts").removeClass("error");
}

$('#btnAccountCancel').click(function () {
    $('#txtExpirationLimit').val('');
    $('#txtSuspenstionLimit').val('');
    $('#txtRenewalDate').val('');
    $('#txtRenewalDate').val('');
    $('#ddlAccountStatus').val('');
    
    
});
$('#btnResourceCancel').click(function () {
    $('#txtContractAreas').val('');
    $('#txtContractsperContractAreas').val('');
    $('#txtContracts').val('');
    $('#txtUsers').val('');
    $('#txtBusinessUser').val('');

    $('#txtContractAdministrator').val('');
    $('#txtGlobalContractOwner').val('');
    $('#txtAccountOwner').val('');
    $('#txtBusinessAreaOwner').val('');
    $('#txtContractTypes').val('');

    $('#txtActiveContractTypes').val('');
    $('#txtCounterparties').val('');
    $('#txtActiveCounterparties').val('');
    $('#txtActiveNegotiationPortals').val('');
   
});
$('#btnFeaturesCancel').click(function () {
    $('input[type="radio"][value="ON"]').prop('checked', true);
    $('input[type="radio"][value="YES"]').prop('checked', true);
  
});