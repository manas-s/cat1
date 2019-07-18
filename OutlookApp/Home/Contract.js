/// <reference path="../App.js" />

(function () {
    "use strict";

    // The Office initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {
            app.initialize();
            var item = Office.context.mailbox.item;
        });
    };


})();

$(document).ready(function () {
    ContractTypes();
    CheckContractNumberSetting();
    $("#browseCounterparty").dialog({
        autoOpen: false,
        closeText: "",
        width: "90%",
        title: "Counterparty",
        modal: true,
        buttons: [{
            text: "OK",
            "class": "button-not-close-css",
            click: function () { AddCounterparty(); $(this).dialog("close"); $("#txtSearchBox").val(""); }
        }, {
            text: "Cancel",
            "class": "button-close-css",
            click: function () {
                $(this).dialog("close"); $("#txtSearchBox").val("");
            }
        }]
    });
});

function SearchCounterparty(openpopup) {
    $("#loadingPage").fadeIn();
    $("#tblCounterparties").html('');
    $('#loadCP').html('<img src="../../Content/Images/icon/loading.gif"> Searching...');
    var vURL = vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/counterparty?searchkeyword=' + encodeURIComponent($("#txtSearchBox").val()) + '&customquery=&sortbyfield=CounterpartyName&orderby=ASC';
    $.ajax({
        url: vURL,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            $('#loadCP').empty();
            $(data).each(function (i, item) {
                var article = '';
                if (i == 0) {
                    article += '<tr><th>Counterparty Name</th><th>Counterparty Type</th></tr>';
                }
                article = '<tr><td>';
                article += '<input id="' + item.RowKey + '" type="radio" name="Counterparty" class="css-checkbox" value="' + escape(item.CounterpartyName) + '" />';
                article += '<label for="' + item.RowKey + '" class="css-label">' + item.CounterpartyName + '</label>';
                article += '</td><td>' + item.CounterpartyType + '';
                article += '</td></tr>';
                $("#tblCounterparties").append(article);
            });
            var vCount = data.length;
            if (vCount != 0) {
                $('#loadCP').html('');
                $('#compact-paginationCounterparties').css('display', '');
                $('#compact-paginationCounterparties').pagination({
                    items: vCount,
                    itemsOnPage: 5,
                    typeID: 'tblCounterparties',
                    cssStyle: 'compact-theme'
                });
            } else {
                $('#loadCP').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No Counterparty Found!</p>')
                $('#compact-paginationCounterparties').css('display', 'none');
            }
            if (openpopup == "Y") {
                $("#browseCounterparty").dialog("option", "title", "Counterparty Picker");
                $("#browseCounterparty").dialog("open");
            }
            $("#loadingPage").fadeOut();
        },
        error: function () {
            $('#compact-paginationCounterparties').css('display', 'none');
            $('#loadCP').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No Counterparty Found!</p>');
            $("#loadingPage").fadeOut();
        }
    });

}

$('#txtSearchBox').keypress(function (e) {
    if ($('#txtSearchBox').val() != "") {
        if (e.keyCode == 13)
            SearchCounterparty("N");
    }
});

function ViewCounterparty(ElementID) {
    $('#hdConElmID').val(ElementID);
    $('#loadCP').html('<img src="../../Content/Images/icon/loading.gif"> Working on it...');
    if ($('#tblCounterparties tr').length <= 0) {
        SearchCounterparty("Y");
    } else {
        $('#loadCP').empty();
    }
}

function AddCounterparty() {
    var vSelectedElement = null;
    vSelectedElement = $('input[name=Counterparty]:checked');
    var vElemID = $('#hdConElmID').val();

    $("#txtCounterpartyElement" + vElemID).val("");
    $("#txtCounterpartyElementID" + vElemID).val("");

    if (vSelectedElement.length > 0) {
        $("#txtCounterpartyElement" + vElemID).val(unescape($(vSelectedElement).val()));
        $("#txtCounterpartyElementID" + vElemID).val($(vSelectedElement).attr("id"));
    }

}

function ContractTypes() {
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/contracttypes',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (contracttypes) {
            $(contracttypes).each(function (i, item) {
                var find = " ";
                var re = new RegExp(find, 'g');
                var str = item.ContractType.replace(re, '');
                $("#ddlContractTypes").append('<option value=' + str + '>' + item.ContractType + '</option>');
                $("#ddlContractClass").append('<option value=' + item.ContractClass + '>' + item.ContractClass + '</option>');
                $("#ddlTransactionType").append('<option value=' + item.TransactionType + '>' + item.TransactionType + '</option>');
            });
        }
    });
}

function CheckContractNumberSetting() {
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/settings',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            if (data.ContractNumberAssignment == "Auto generate") {
                GenerateContactNumber();
            }
            else if (data.ContractNumberAssignment == "On demand") {
                $("#aOnDemand").css("display", "");
            }

        }
    });
}

function GenerateContactNumber() {
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/contracts/generateContractNumber',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'UserName': localStorage.UserName  },
        cache: false,
        success: function (data) {
            $('#txtContractNumber').val(data);
            $('#hdContractNumber').val(data);
        }
    });
}

function ContractTypeChange(obj) {
    var vv = obj.selectedIndex;
    $("#ddlContractClass").prop('selectedIndex', vv);
    $("#ddlTransactionType").prop('selectedIndex', vv);
}

function SaveContract() {
    if (requiredValidator('saveForm', false)) {
        $("#loadingPage").fadeIn();
        var vTitle = $("#txtContractTitle").val();
        var vNumber = $("#txtContractNumber").val();
        var contractForm = "";
        contractForm += "ContractTitle=" + vTitle;
        contractForm += "&ContractType=" + $("#ddlContractTypes option:selected").text();
        contractForm += "&ContractClass=" + $("#ddlContractClass option:selected").text();
        contractForm += "&TransactionType=" + $("#ddlTransactionType option:selected").text();
        contractForm += "&ContractNumber=" + vNumber;
        contractForm += "&ContractManagers=" + localStorage.UserName;
        contractForm += "&Status=New";
        contractForm += "&AccountID=" + localStorage.AccountID;
        contractForm += "&CreatedBy=" + localStorage.UserName;
        contractForm += "&ModifiedBy=" + localStorage.UserName;

        $.ajax({
            url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Contracts',
            type: 'POST',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            data: contractForm,
            cache: false,
            success: function (data) {
                var vGenContNo = $('#hdContractNumber').val();
                $.ajax({
                    url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + data,
                    type: 'GET',
                    cache: false,
                    contentType: false,
                    async: false,
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    processData: false,
                    success: function (data) {
                        vNumber = data.ContractNumber;
                    }
                });
                $("#loadingPage").fadeOut();
                if (vNumber != vGenContNo) {
                    app.initialize();
                    app.showNotification("Success", "Contract Created with number \"" + vNumber + "\".");
                    alert('Contract record successfully created in eContracts with number "' + vNumber + '"');
                }
                else {
                    app.initialize();
                    app.showNotification("Success", "Contract record successfully created in eContracts.");
                }
                ClearForm();
            }
        });
    }
    else {
        app.initialize();
        app.showNotification("Error", "Please enter required fields.");
    }
}

function ClearForm() {
    $("#txtContractTitle").val("");
    $("#ddlContractTypes").val("0");
    $("#txtContractNumber").val("");
}