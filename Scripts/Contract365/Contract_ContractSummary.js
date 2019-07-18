var vTenantID = '';
var vListID = '';
var vItemID = '';
var vSiteURL = '';
var vAPIKey = '';
var vContractID = '';

$(document).ready(function () {
    $("#dialogTitleSpan").html("Contract Record Summary");
    $('#txtSearchBox').keypress(function (e) {
        if ($('#txtSearchBox').val() != "") {
            if (e.keyCode == 13)
                ViewContracts();
        }
    });
    vContractID = getParameterByName("ContractID");
    var vType = getParameterByName("Type");
    var vIsFolder = "Y";
    if (vContractID == '') {
        vSiteURL = getParameterByName("SPHostUrl");
        vListID = getParameterByName("SPListId");
        vItemID = getParameterByName("SPListItemId");
        $.ajax({
            url: vSIteURL+'/Documents/GetDocumentDetail',
            type: 'GET',
            dataType: 'json',
            data: { siteURL: vSiteURL, strListID: vListID, strItemID: vItemID },
            cache: false,
            async: false,
            success: function (data) {
                if (data != "") {
                    var arr = data.split('~');
                    vTenantID = arr[0];
                    vAPIKey = arr[1];
                    vContractID = arr[2];
                    vIsFolder = "N";
                }
            }
        });
    }
    else {
        vTenantID = localStorage.AccountID;
        vAPIKey = localStorage.APIKey;
        vIsFolder = "N";
    }

    if (vIsFolder == "N") {
        if (vType == "") {
            if (vContractID != "") {
                $("#ContractNotTagged").css("display", "none");
                $("#ContractTagged").css("display", "block");
                $("#dialogTitleSpan").html("Contract Record Summary");
                ContractDetail();
            }
            else {
                $("#ContractNotTagged").css("display", "block");
                $("#ContractTagged").css("display", "none");
                ViewContracts();
            }
        }
        else {
            if (vContractID != "") {
                window.location = vSIteURL + '/Contracts/ContractDetails?ContractID=' + vContractID;
            }
            else {
                $("#ContractNotTagged").css("display", "block");
                $("#ContractTagged").css("display", "none");
                ViewContracts();
            }
        }
    }
    else
    {
        $("#ContractNotTagged").css("display", "none");
        $("#ContractTagged").css("display", "none");
        $("#InvalidDocument").css("display", "");
    }
});

function MetadataSummary() {
    $("#Details").removeClass('pop_up__Acti');
    $("#Summary").addClass('pop_up__Acti');
    $('#tblSummary').css("display", "");
    $('#tblDetailsMetadata').css("display", "none");
}

function MetadataDetails() {
    $("#Summary").removeClass('pop_up__Acti');
    $("#Details").addClass('pop_up__Acti');
    $('#tblSummary').css("display", "none");
    $('#tblDetailsMetadata').css("display", "");
}

function ContractDetail()
{
    $.ajax({
        url: vSIteURL + vApiBaseSiteUrl +'/api/accounts/' + vTenantID + '/Contracts?contractid=' + vContractID,
        type: 'GET',
        cache: false,
        async: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': vAPIKey },
        processData: false,
        success: function (item) {
            BindMetaData(item);
        }
    });
}

function BindMetaData(contractRecord) {
    $("#loadingPage").fadeIn();
    if (contractRecord == null) {
        $.ajax({
            url: vSIteURL + vApiBaseSiteUrl +'/api/accounts/' + vTenantID + '/Contracts?contractid=' + vContractID,
            type: 'GET',
            cache: false,
            contentType: false,          
            headers: { 'eContracts-ApiKey': vAPIKey },
            processData: false,
            success: function (data) {
                contractRecord = data;
                BindMetadataDetail(contractRecord);
            }
        });
    }
    else { BindMetadataDetail(contractRecord); }


}

function BindMetadataDetail(contractRecord) {
    $("#tdSumContractTitle").html(contractRecord.ContractTitle);
    $("#tdSumContractNumber").html(contractRecord.ContractNumber);
    $("#tdSumContractType").html(contractRecord.ContractType);
    $.ajax({
        url: vSIteURL + vApiBaseSiteUrl +'/api/accounts/' + vTenantID + '/Contracts/IContractDetails?contractid=' + vContractID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': vAPIKey },
        cache: false,
        success: function (mainmetadataFields) {
            var vMetadata = $(mainmetadataFields).find('Metadata');
            var vMetadataHTML = vMetadata[0].innerHTML;

            $.ajax({
                url: vSIteURL + vApiBaseSiteUrl +'/api/accounts/' + vTenantID + '/contracttypes/metadatas?contracttypename=' + encodeURIComponent(contractRecord.ContractType),
                type: 'GET',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': vAPIKey },
                cache: false,
                success: function (metadataFields) {

                    $("#tblSummaryMetadata").empty();
                    var datalenght = metadataFields.length;
                    for (var i = 0; i < datalenght; i++) {
                        var item = metadataFields[i];
                        if ((item.FieldName != "ContractTitle") && (item.FieldName != "ContractNumber") && (item.FieldName != "ContractType") && (name != "STATUSCHANGEDALERT")) {

                            var vControls = '<tr>';
                            vControls += '<td class="f_head">' + item.FieldDisplayName + '</td>';

                            if (item.FieldType == "Date") {
                                var vv = $(vMetadata).find(item.FieldName).text();
                                var onlydate = "";
                                if (vv != null) {
                                    onlydate = vv.substring(0, vv.length - 19);
                                    vControls += '<td class="labelleft">' + onlydate + '</td>';
                                }
                            } else {
                                vControls += '<td class="labelleft">' + $(vMetadata).find(item.FieldName).text() + '</td>';
                            }

                            vControls += '</tr>';
                            vMetadataHTML = vMetadataHTML.replace("<" + item.FieldName + ">" + $(vMetadata).find(item.FieldName).text() + "</" + item.FieldName + ">", "");
                            $("#tblSummaryMetadata").append(vControls);

                        }
                    }

                    var vContractFields = null;

                    $.ajax({
                        url: vSIteURL + vApiBaseSiteUrl +'/api/accounts/' + vTenantID + '/contractfields',
                        type: 'GET',
                        dataType: 'json',
                        "Content-Type": "application/json",
                        headers: { 'eContracts-ApiKey': vAPIKey },
                        cache: false,
                        async: false,
                        success: function (contractfields) {
                            vContractFields = contractfields;


                            $("#tblDetailsMetadata").empty();
                            var datalenght = $(vMetadataHTML).length;
                            for (var i = 0; i < datalenght; i++) {
                                var item = $(vMetadataHTML)[i];
                                var name = item.nodeName;
                                if ((name != "CONTRACTTITLE") && (name != "CONTRACTNUMBER") && (name != "CONTRACTTYPE") && (name != "STATUSCHANGEDALERT")) {
                                    var vField = $.grep(vContractFields, function (person) { return person.FieldName.toUpperCase() == name });
                                    var value = item.textContent;
                                    if (vField.length > 0) {
                                        var vControls = '<tr>';
                                        vControls += '<td class="f_head">' + vField[0].FieldDisplayName + '</td>';
                                        if (value == '' || value == '0') {
                                            vControls += '<td class="labelleft">-</td>';
                                        }
                                        else {
                                            if (vField[0].FieldType == "Date") {
                                                var onlydate = "";
                                                onlydate = value.substring(0, value.length - 19);
                                                vControls += '<td class="labelleft">' + onlydate + '</td>';

                                            } else {
                                                vControls += '<td class="labelleft">' + value + '</td>';
                                            }
                                        }
                                        vControls += '</tr>';

                                        $("#tblDetailsMetadata").append(vControls);
                                    }
                                }
                            }
                            $("#loadingPage").fadeOut();
                        },
                        error: function () {
                            $("#loadingPage").fadeOut();
                        }
                    });
                },
                error: function () {
                    $("#loadingPage").fadeOut();
                }
            });
        }
    });
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function ViewContracts() {
    $("#listContracts").html('');
    $('#loadMA').css("display", "");
    var vURL = vSIteURL + vApiBaseSiteUrl +'/api/accounts/' + vTenantID + '/Contracts?searchkeyword=' + encodeURIComponent($("#txtSearchBox").val()) + '&customquery=&sortbyfield=ContractTitle&orderby=ASC';
    $.ajax({
        url: vURL,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': vAPIKey },
        cache: false,
        success: function (data) {
            var datalenght = data.length;
            var article = '';
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                article += '<li>';
                article += '<input id="' + item.RowKey + '" type="radio" name="Contracts" class="css-checkbox" value="' + item.ContractTitle + '" />';
                article += '<label for="' + item.RowKey + '" class="css-label PreserveSpace">' + item.ContractTitle + '</label>';
                article += '</li>';
            }
            $("#listContracts").html(article);
            article = '';
            var vCount = $("#listContracts li").length;
            $('#compact-paginationContracts').pagination({
                items: vCount,
                itemsOnPage: 10,
                type: 'ul',
                row: 'li',
                typeID: 'listContracts',
                cssStyle: 'compact-theme'
            }); 
            $('#loadMA').css("display", "none");
        },
        error: function () {
            var vCount = $("#listContracts li").length;
            $('#compact-paginationContracts').pagination({
                items: vCount,
                itemsOnPage: 10,
                type: 'ul',
                row: 'li',
                typeID: 'listContracts',
                cssStyle: 'compact-theme'
            });
            $('#loadMA').css("display", "none");
            $('#listContracts').html('<li style="margin-left: 20px;">No Contracts Found!</li>')
        }
    });
            
}

function CreateNew()
{
    window.open(vSIteURL + '/Contracts/CreateContract?SPHostUrl=' + vSiteURL + '&LibID=' + vListID + '&DocID=' + vItemID, '_blank');
}

function TagContract() {
    $('#btnTag').attr("disabled", true);
    var contractid = $('input[type=radio][name=Contracts]:checked').attr("ID");
    if (contractid == '' || contractid == null) {     
        swal("", "Select Contract to Tag.");
    }
    else {
        $.ajax({
            url: vSIteURL + vApiBaseSiteUrl +'/api/accounts/' + vTenantID + '/documents/tag?contractid=' + contractid + '&listid=' + vListID + '&itemid=' + vItemID,
            type: 'PUT',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': vAPIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            cache: false,
            success: function (data) {
                vContractID = contractid;
                $("#ContractNotTagged").css("display", "none");
                $("#ContractTagged").css("display", "block");
                ContractDetail();
            },
            error: function () {

            }
        });
        $('#btnTag').attr("disabled", false);
    }
}