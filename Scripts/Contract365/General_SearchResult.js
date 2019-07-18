
var oGlobalFieldConfiguration = '';
var ContractSearchChoice = '';
var ContractDivArticle = '';
var vUserList = "";
var vContractTypes = "";
var CounterPartySearchChoice = '';
var CounterPartyDivArticle = '';
var vCurrencyDisplayStyle = '';
var notRequiredSearchFieldType = ["Multi- Choice (Browse)", "Taxonomy", "Email", "Browse", "File Upload", "Phone Number"];
var ChoiceTypes = ["Choice", "User", "Lookup", "Dropdown", "Multi Select", "Standard Lookup", "Custom Lookup"];
var CAFlag = false;
var BAFlag = false;
var thisContractAreaName = "";
var thisBusinessAreaName = "";
var vSelectedTab = "";
$(document).ready(function () {
    $('#scopeOptions').multiselect({
        column: 1,
        selectAll: true,
        texts: { placeholder: 'Select Scope' }
    });
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "11" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        $('<li class="Scope Scope_Cont"><a href="javascript:void(0)" onclick="ChangeScope(\'Project Name\')">Project Name</a></li>').insertBefore('#liAll');
    }

    if (typeof localStorage.GlobalBusinessAreaLocation !== 'undefined') {
        if (localStorage.GlobalBusinessAreaLocation == "All" || localStorage.GlobalBusinessAreaLocation == "") {
            thisContractAreaName = "";
            thisBusinessAreaName = "";
        } else {
            thisContractAreaName = localStorage.GlobalBusinessAreaLocation.split('>')[0].trim();
            thisBusinessAreaName = localStorage.GlobalBusinessArea;//Business Area +';'+ Contract Area
        }
    } else {
        thisContractAreaName = "";
        thisBusinessAreaName = "";
    }
    var vKeyword = getParameterByName('keyword');
    vSelectedTab = getParameterByName('tabselected');
    $("#txtSearchBox").val(vKeyword);

    //$("#txtStartDate").dateRangePicker({ format: 'MM/DD/YYYY' });
    //$("#txtEndDate").dateRangePicker({ format: 'MM/DD/YYYY' });
    //$("#txtLastRenewedDate").dateRangePicker({ format: 'MM/DD/YYYY', alwaysOpen: false });getCustomLookUp
    //allowOnlyNumberInInputBox("txtContractValue1");
    //allowOnlyNumberInInputBox("txtContractValue2");

    if (localStorage.AppDateFormat == null || localStorage.AppDateFormat == "" || localStorage.AppDateFormat == 'undefined') {
        $("#txtValidFrom").dateRangePicker({ format: 'MM/DD/YYYY', alwaysOpen: false })
    }
    else {
        var dateformate = localStorage.AppDateFormat.toLowerCase().slice(0, -2);
        if (dateformate.toLowerCase() == "mm/dd/yy")
            $("#txtValidFrom").dateRangePicker({ format: 'MM/DD/YYYY', alwaysOpen: false })
        else if (dateformate.toLowerCase() == "dd/mm/yy")
            $("#txtValidFrom").dateRangePicker({ format: 'DD/MM/YYYY', alwaysOpen: false })
        else
            $("#txtValidFrom").dateRangePicker({ format: 'MM/DD/YYYY', alwaysOpen: false })

    }
    if (localStorage.AppDateFormat == null || localStorage.AppDateFormat == "" || localStorage.AppDateFormat == 'undefined') {
        $("#txtValidTill").dateRangePicker({ format: 'MM/DD/YYYY', alwaysOpen: false })
    }
    else {
        var dateformate = localStorage.AppDateFormat.toLowerCase().slice(0, -2);
        if (dateformate.toLowerCase() == "mm/dd/yy")
            $("#txtValidTill").dateRangePicker({ format: 'MM/DD/YYYY', alwaysOpen: false })
        else if (dateformate.toLowerCase() == "dd/mm/yy")
            $("#txtValidTill").dateRangePicker({ format: 'DD/MM/YYYY', alwaysOpen: false })
        else
            $("#txtValidTill").dateRangePicker({ format: 'MM/DD/YYYY', alwaysOpen: false })

    }
    if (localStorage.AppDateFormat == null || localStorage.AppDateFormat == "" || localStorage.AppDateFormat == 'undefined') {
        $("#txtCreatedDate").dateRangePicker({ format: 'MM/DD/YYYY', alwaysOpen: false })
    }
    else {
        var dateformate = localStorage.AppDateFormat.toLowerCase().slice(0, -2);
        if (dateformate.toLowerCase() == "mm/dd/yy")
            $("#txtCreatedDate").dateRangePicker({ format: 'MM/DD/YYYY', alwaysOpen: false })
        else if (dateformate.toLowerCase() == "dd/mm/yy")
            $("#txtCreatedDate").dateRangePicker({ format: 'DD/MM/YYYY', alwaysOpen: false })
        else
            $("#txtCreatedDate").dateRangePicker({ format: 'MM/DD/YYYY', alwaysOpen: false })

    }


    //$("#txtValidFrom").dateRangePicker({ format: 'MM/DD/YYYY' });
    //$("#txtValidTill").dateRangePicker({ format: 'MM/DD/YYYY' });
    //$("#txtCreatedDate").dateRangePicker({ format: 'MM/DD/YYYY' });
    if (vKeyword != '') {
        $("#showAll").html("'" + vKeyword + "'");

        $('.Scope').css('display', 'none');
        if (vSelectedTab == "Contracts") {
            changeScopeOptions("Contracts");
            $("#bSearchIn").html("Contracts");
            $('.Scope_Cont').css('display', '');
            $("#spScope").html('Contract Record Title');
        }
        else if (vSelectedTab == "Documents") {
            changeScopeOptions("Documents");
            $("#bSearchIn").html("Documents");
            $('.Scope_Doc').css('display', '');
            $("#spScope").html('Document Name');
        }
        else if (vSelectedTab == "Counterparty") {
            changeScopeOptions("Counterparty");
            $("#bSearchIn").html("Counterparty");
            $('.Scope_Cntpy').css('display', '');
            $("#spScope").html('Counterparty Name');
        }

        $("#FilterDiv").hide();
        NoFieldsMapped();
        //$("#chkMatchExactPhrase").prop('checked', true);
        //$('#chkMatchExactPhrase').css('display', '');
        //$('#lblMatchExactPhrase').css('display', '');
        //$("#chkDocumentContent").prop('checked', false);
        //$('#chkDocumentContent').css('display', 'none');
        //$('#lblDocumentContent').css('display', 'none');
        if (vSelectedTab == "Contracts")
            ApplyFilter();
        else if (vSelectedTab == "Documents")
            ApplyFilterDocument();
        else if (vSelectedTab == "Counterparty")
            ApplyFilterCounterparty();

        AddFilters(vSelectedTab);
    }
    else {
        changeScopeOptions("Contracts");
        AddFilters("Contracts");
        $('.Scope').css('display', 'none');
        $("#bSearchIn").html("Contracts");
        $('.Scope_Cont').css('display', '');
        $("#spScope").html('Contract Record Title');
        //$("#listSearchResult").append("<li><label style='font-size:15px;'>Please enter a keyword to search.</label></li>");
        $("#listSearchResult").append("<label class='f_p-error'>No items found.</label>");
    }
    BindFields();
    ////BindContractTypes();
    ////BindContractStatus();
    //BindCounterpartyType();
    //BindDocumentType();
    //BindBusinessAreaPicker11()
    //// BindContractLabels();
    $("#ddlCountpartyStatus").chosen();
});
$('.OnlyBackDel').keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '8' || keycode == '46') {
        return true;
    } else
        return false;
}).bind("cut copy paste", function (e) {
    e.preventDefault();
});


$('.NoCopyPaste').bind("cut copy paste", function (e) {
    e.preventDefault();
});
$('#inserch2_Filter').click(function () {
    $('#inserch2_Filter').popModal({
        html: $('#inserch2_Filterss'),
        placement: 'bottomLeft',
        showCloseBut: true,
        onDocumentClickClose: true,
        onDocumentClickClosePrevent: '',
        inline: true,
        overflowContent: false
    });
});

$('#inserch2_filterMatch').click(function () {
    $('#inserch2_filterMatch').popModal({
        html: $('#inserch2_FilterssMatch'),
        placement: 'bottomLeft',
        showCloseBut: true,
        onDocumentClickClose: true,
        onDocumentClickClosePrevent: '',
        inline: true,
        overflowContent: false
    });
});

$('#spnStat').click(function () {
    if ($("#liStatus").is(":hidden")) {
        $("#liStatus").show();
        $('#imgMinus').css('display', 'block');
        $('#imgPlus').css('display', 'none');
    } else {
        $("#liStatus").hide();
        $('#imgMinus').css('display', 'none');
        $('#imgPlus').css('display', 'block');
    }
});
$('#spnContType').click(function () {
    if ($("#liContType").is(":hidden")) {
        $("#liContType").show();
        $('#imgMinusct').css('display', 'block');
        $('#imgPlusct').css('display', 'none');
    } else {
        $("#liContType").hide();
        $('#imgMinusct').css('display', 'none');
        $('#imgPlusct').css('display', 'block');
    }
});
$('#spnCounterpartyType').click(function () {
    if ($("#liCounterpartyType").is(":hidden")) {
        $("#liCounterpartyType").show();
        $('#imgMinusCPT').css('display', 'block');
        $('#imgPlusCPT').css('display', 'none');
    } else {
        $("#liCounterpartyType").hide();
        $('#imgMinusCPT').css('display', 'none');
        $('#imgPlusCPT').css('display', 'block');
    }
});
$('#spnDocumentType').click(function () {
    if ($("#liDocumentType").is(":hidden")) {
        $("#liDocumentType").show();
        $('#imgMinusDT').css('display', 'block');
        $('#imgPlusDT').css('display', 'none');
    } else {
        $("#liDocumentType").hide();
        $('#imgMinusDT').css('display', 'none');
        $('#imgPlusDT').css('display', 'block');
    }
});

function ChangeScope(scope) {
    $("#spScope").html(scope);
    $(".popModal").css("display", "none");
}

function BindContractTypes() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracttypes',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {

            //$(data).each(function (i, item) {
            //    var article = '';
            //    if (i < 5) {
            //        article = '<li>';
            //    } else {
            //        article = '<li class="hiddentype">';
            //    }
            //    article += '<p><input class="filter_Check" type="checkbox" name="ContractType" id="T' + item.RowKey + '" title="' + item.ContractType + '" />'
            //        + item.ContractType + '</p></li>';
            //    $("#liContType").append(article);
            //});
            //$(".hiddentype").css("display", "none");
            //if (data.length > 5) { $("#aTypeMore").css("display", ""); }
            var article = '';
            //article += '<option value="All">All</option>';
            $(data).each(function (i, item) {
                if (item.TypeName != "" && item.TypeName != null)
                    article += '<option id="T' + item.RowKey + '" value="' + item.ContractType + '">' + item.ContractType + '</option>';
            });
            $("#liContType").append(article);
            $("#liContType").chosen();
        },
        error:
            function (data) {
            }
    });
}

function BindContractStatus() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contractstatuses',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (contractstatuses) {
            $(contractstatuses).each(function (i, item) {
                var article = '';
                if (i < 5) {
                    article = '<li>';
                } else {
                    article = '<li class="hiddenstatus">';
                }
                article += '<p><input class="filter_Check" type="checkbox" name="ContractStatus" id="S' + item.RowKey + '" title="' + item.ContractStatus + '" />'
                    + item.ContractStatus + '</p></li>';
                $("#liStatus").append(article);
            });
            $(".hiddenstatus").css("display", "none");
            if (contractstatuses.length > 5) { $("#aStatusMore").css("display", ""); }
        }
    });
}

function BindCounterpartyType() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterpartytypes',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            //$(data).each(function (i, item) {
            //    var article = '';
            //    if (i < 10) {
            //        article = '<li>';
            //    } else {
            //        article = '<li class="hiddencounterparty">';
            //    }
            //    article += '<p><input class="filter_Check" type="checkbox" name="CounterpartyType" id="CPT' + i + '" title="' + item.TypeName + '" />'
            //        + item.TypeName + '</p></li>';
            //    $("#liCountpartyType").append(article);
            //});
            //$(".hiddencounterparty").css("display", "none");
            //if (data.length > 10) { $("#aCounterpartyMore").css("display", ""); }
            var article = '';
            //article += '<option value="All">All</option>';
            $(data).each(function (i, item) {
                if (item.TypeName != "" && item.TypeName != null)
                    article += '<option id="CPT' + i + '" value="' + item.TypeName + '">' + item.TypeName + '</option>';
            });
            
            $("#ddlCounterpartyType").html(article);
            $("#ddlCounterpartyType").chosen().trigger("chosen:updated");
            $("#CounterpartyType").html(article);
            $("#CounterpartyType").chosen().trigger("chosen:updated");
        },
        error:
            function (data) {
            }
    });
}

function BindDocumentType() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documenttypes',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (documenttypes) {
            //$(documenttypes).each(function (i, item) {
            //    var article = '';
            //    if (i < 10) {
            //        article = '<li>';
            //    } else {
            //        article = '<li class="hiddendocument">';
            //    }
            //    article += '<p><input class="filter_Check" type="checkbox" name="DocumentType" id="DT' + i + '" title="' + item.TypeName + '" />'
            //        + item.TypeName + '</p></li>';
            //    $("#liDocumentType").append(article);
            //});
            //if (documenttypes.length < 10) {
            //    article = '<li>';
            //} else {
            //    article = '<li class="hiddendocument">';
            //}
            //article += '<p><input class="filter_Check" type="checkbox" name="DocumentType" id="DTOthers" title="Others" />Others</p></li>';
            //$("#liDocumentType").append(article);

            //$(".hiddendocument").css("display", "none");
            //if (documenttypes.length > 10) { $("#aDocumentMore").css("display", ""); }
            var article = '';
            //article += '<option value="All">All</option>';
            $(documenttypes).each(function (i, item) {
                if (item.TypeName != "" && item.TypeName != null)
                    article += '<option id="DT' + i + '" value="' + item.TypeName + '">' + item.TypeName + '</option>';
            });
            $("#ddlDocumentType").append(article);
            $("#ddlDocumentType").chosen();
            $("#ddlDocumentType_chosen").attr('style', 'width: 92.6% !important;')
        },
        error:
            function (data) {
            }
    });
}

function ShowAllStatus() {
    $(".hiddenstatus").css("display", "");
    $("#aStatusMore").css("display", "none");
    $("#aStatusLess").css("display", "");
}

function ShowLessStatus() {
    $(".hiddenstatus").css("display", "none");
    $("#aStatusMore").css("display", "");
    $("#aStatusLess").css("display", "none");
}

function ClearStatus() {
    $('input:checkbox[name=ContractStatus]').attr('checked', false);
}

function SelectStatus() {
    $('input:checkbox[name=ContractStatus]').attr('checked', true);
}

function ShowAllType() {
    $(".hiddentype").css("display", "");
    $("#aTypeMore").css("display", "none");
    $("#aTypeLess").css("display", "");
}

function ShowLessType() {
    $(".hiddentype").css("display", "none");
    $("#aTypeMore").css("display", "");
    $("#aTypeLess").css("display", "none");
}

function ClearType() {
    $('input:checkbox[name=ContractType]').attr('checked', false);
}

function SelectType() {
    $('input:checkbox[name=ContractType]').attr('checked', true);
}

function ShowAllCounterpartyType() {
    $(".hiddencounterparty").css("display", "");
    $("#aCounterpartyMore").css("display", "none");
    $("#aCounterpartyLess").css("display", "");
}

function ShowLessCounterpartyType() {
    $(".hiddencounterparty").css("display", "none");
    $("#aCounterpartyMore").css("display", "");
    $("#aCounterpartyLess").css("display", "none");
}

function ClearCounterpartyType() {
    $('input:checkbox[name=CounterpartyType]').attr('checked', false);
}

function SelectCounterpartyType() {
    $('input:checkbox[name=CounterpartyType]').attr('checked', true);
}

function ShowAllDocumentType() {
    $(".hiddendocument").css("display", "");
    $("#aDocumentMore").css("display", "none");
    $("#aDocumentLess").css("display", "");
}

function ShowLessDocumentType() {
    $(".hiddendocument").css("display", "none");
    $("#aDocumentMore").css("display", "");
    $("#aDocumentLess").css("display", "none");
}

function ClearDocumentType() {
    $('input:checkbox[name=DocumentType]').attr('checked', false);
}

function SelectDocumentType() {
    $('input:checkbox[name=DocumentType]').attr('checked', true);
}

function SearchIn(action) {
    if ($("#bSearchIn").html() != action) {
        $("#FilterDiv").hide();
        switch (action) {
            case "Contracts":
                {
                    changeScopeOptions("Contracts");
                    $("#spScope").html('Contract Record Title');
                    $("#bSearchIn").html(action);
                    $('#contractFilter').css('display', '');
                    $('#documentFilter').css('display', 'none');
                    $('#counterpartyFilter').css('display', 'none');
                    $('.Scope').css('display', 'none');
                    $('.Scope_Cont').css('display', '');
                    $("#FilterDiv").hide();
                    //NoFieldsMapped();
                    AddFilters(action);
                    //$("#chkMatchExactPhrase").prop('checked', true);
                    //$('#chkMatchExactPhrase').css('display', '');
                    //$('#lblMatchExactPhrase').css('display', '');
                    //$("#chkDocumentContent").prop('checked', false);
                    //$('#chkDocumentContent').css('display', 'none');
                    //$('#lblDocumentContent').css('display', 'none');
                    vSelectedTab = "Contracts";
                    ApplyFilter();
                    BindCounterpartyType();
                    BindContractBusinessArea();
                    break;
                }
            case "Documents":
                {
                    changeScopeOptions("Documents");
                    $("#spScope").html('Document Name');
                    $("#bSearchIn").html(action);
                    $('#contractFilter').css('display', 'none');
                    $('#documentFilter').css('display', '');
                    $('#counterpartyFilter').css('display', 'none');
                    $('.Scope').css('display', 'none');
                    $('.Scope_Doc').css('display', '');
                    $("#FilterDiv").hide();
                    //$("#chkMatchExactPhrase").prop('checked', true);
                    //$('#chkMatchExactPhrase').css('display', '');
                    //$('#lblMatchExactPhrase').css('display', '');
                    //$("#chkDocumentContent").prop('checked', false);
                    //$('#chkDocumentContent').css('display', '');
                    //$('#lblDocumentContent').css('display', '');
                    vSelectedTab = "Documents";
                    NoFieldsMapped();
                    AddFilters(action);
                    ApplyFilterDocument();

                    break;
                }
            case "Counterparty":
                {
                    changeScopeOptions("Counterparty");
                    $("#spScope").html('Counterparty Name');
                    $("#bSearchIn").html(action);
                    $('#contractFilter').css('display', 'none');
                    $('#documentFilter').css('display', 'none');
                    $('#counterpartyFilter').css('display', '');
                    $('.Scope').css('display', 'none');
                    $('.Scope_Cntpy').css('display', '');
                    $("#FilterDiv").hide();
                    //$("#chkMatchExactPhrase").prop('checked', true);
                    //$('#chkMatchExactPhrase').css('display', '');
                    //$('#lblMatchExactPhrase').css('display', '');
                    //$("#chkDocumentContent").prop('checked', false);
                    //$('#chkDocumentContent').css('display', 'none');
                    //$('#lblDocumentContent').css('display', 'none');
                    vSelectedTab = "Counterparty";
                    NoFieldsMapped();
                    AddFilters(action);
                    ApplyFilterCounterparty();
                    break;
                }
        }
    }

}

function NewSearch() {
    var altMsg = 'Please enter a keyword to search.';
    if ($("#txtSearchBox").val().trim() == '') {
        swal("", altMsg);
    }
    else if ($('#scopeOptions').val().length == 0) {
        swal("", "Please Select Scope");
    }
    else {
        switch ($("#bSearchIn").html()) {
            case "Contracts":
                {
                    ApplyFilter();
                    break;
                }
            case "Documents":
                {
                    ApplyFilterDocument();
                    break;
                }
            case "Counterparty":
                {
                    ApplyFilterCounterparty();
                    break;
                }


        }
    }
}

$('#txtSearchBox').keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        NewSearch();
    }
});


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function ApplyFilter() {
    if (requiredValidator('contractFilter', false)) {
        $("#compact-pagination").empty();
        $("#spResult").empty();
        if (vSelectedTab != "") {
            if (vSelectedTab == "Contracts") {
                $("#aSearchContract").css("background-color", "#f7f7f7");
                $("#aSearchDocument").css("background-color", "");
                $("#aSearchCounterparty").css("background-color", "");
            }
            else if (vSelectedTab == "Documents") {
                $("#aSearchContract").css("background-color", "");
                $("#aSearchDocument").css("background-color", "#f7f7f7");
                $("#aSearchCounterparty").css("background-color", "");
            }
            else if (vSelectedTab == "Counterparty") {
                $("#aSearchContract").css("background-color", "");
                $("#aSearchDocument").css("background-color", "");
                $("#aSearchCounterparty").css("background-color", "#f7f7f7");
            }
        }

        if ($("#txtSearchBox").val().trim() != "") {


            var vURL = '';
            //$("#loading").html('<span class="line_height_20px"><img src="../Content/Images/icon/loading.gif"> Searching...</span>');


            $("#showAll").html($("#txtSearchBox").val().trim());
            var vcustomquery = GenerateCustumQuery("contractFilter");
            if (vcustomquery[0][0] != true) {
                $("#loadingPage").fadeIn();
                //if ($("#txtStartDate").val() != '' && $("#txtStartDate").val() != null && typeof($("#txtStartDate").val()) != "undefined")
                //    vcustomquery += "StartDate:Date:" + $("#txtStartDate").val().replace(" to ", ",") + ';';
                //if ($("#txtEndDate").val() != '' && $("#txtEndDate").val() != null && typeof ($("#txtEndDate").val()) != "undefined")
                //    vcustomquery += "EndDate:Date:" + $("#txtEndDate").val().replace(" to ", ",") + ';';
                //if ($("#txtLastRenewedDate").val() != '' && $("#txtLastRenewedDate").val() != null && typeof ($("#txtLastRenewedDate").val()) != "undefined")
                //    vcustomquery += "LastRenewedDate:Date:" + $("#txtLastRenewedDate").val().replace(" to ", ",") + ';';

                //if ($("#txtContractValue1").val() != '' && $("#txtContractValue1").val() != null && typeof ($("#txtContractValue1").val()) != "undefined") {
                //    vcustomquery += "BaseContractValue:Number:";
                //    vcustomquery += $("#txtContractValue1").val();
                //}
                //if ($("#txtContractValue2").val() != '' && $("#txtContractValue2").val() != null && typeof ($("#txtContractValue2").val()) != "undefined")
                //    vcustomquery += ',' + $("#txtContractValue2").val() + ';';
                //else {
                //    if ($("#txtContractValue1").val() != '') {
                //        vcustomquery += ';';
                //    }
                //}
                //if ($("#ddlLabels").val() != '' && $("#ddlLabels").val() != null && typeof ($("#ddlLabels").val()) != "undefined") {
                //    var SendReminderToArr1 = $("#ddlLabels").val();
                //    var vSendReminderTo1 = '';
                //    $(SendReminderToArr1).each(function (i, item) {
                //        if (vSendReminderTo1 == '') {
                //            vSendReminderTo1 = item;
                //        }
                //        else {
                //            vSendReminderTo1 += "," + item;
                //        }
                //    });
                //    vcustomquery += "Labels:String:" + vSendReminderTo1 + ';';
                //}
                var selectedColumns = $('#scopeOptions').val().join('~');
                var vsearchkeyword = selectedColumns + ':' + $("#txtSearchBox").val().trim();
                var vMatchExact = $("#ddlKeywordMatch :selected").val();
                vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/search?customquery=' + encodeURIComponent(vcustomquery[0][1]) + '&searchkeyword=' + encodeURIComponent(vsearchkeyword) + '&MatchExact=' + vMatchExact;

                $.ajax({
                    url: vURL,
                    type: 'GET',
                    dataType: 'json',
                    'Content-Type': 'application/json',
                    cache: false,
                    headers: { 'eContracts-ApiKey': localStorage.APIKey, UserName: localStorage.UserName, UserID: localStorage.UserID },
                    success: function (data) {
                        GetDataContracts(data);
                        //$("#listSearchResult").empty();
                        //var datalenght = data.length;
                        //var srhRes = '';
                        //for (var i = 0; i < datalenght; i++) {
                        //    var item = data[i];
                        //    //IsPipeline
                        //    if (item.IsFinalized.toLowerCase() != "yes") {
                        //        var myUrl = '/Contracts/ContractDetails?ContractID=' + encodeURI(item.RowKey) + '&Stage=pipeline';
                        //    }
                        //    else {
                        //        var myUrl = '/Contracts/ContractDetails?ContractID=' + encodeURI(item.RowKey);

                        //    }

                        //    srhRes += '<li class="seArchLi">';
                        //    srhRes += '<span>&nbsp;</span>';
                        //    srhRes += '<p class="seArchP">';
                        //    if (item.InRecycleBin == "Yes") {
                        //        if ($("#spScope").html() == "Contract Record Number")
                        //            srhRes += '<a href="javascript:void(0)" target="_blank">' + item.ContractTitle.replace("  ", "&nbsp;&nbsp;") + ' <i>( In Recycle Bin )</i></a>';
                        //        else
                        //            srhRes += '<a href="javascript:void(0)" class="HighlightText" target="_blank">' + item.ContractTitle.replace("  ", "&nbsp;&nbsp;") + ' <i>( In Recycle Bin )</i></a>';

                        //    } else {
                        //        if ($("#spScope").html() == "Contract Record Number")
                        //            srhRes += '<a href="' + myUrl + '" target="_blank">' + item.ContractTitle.replace("  ", "&nbsp;&nbsp;") + '</a>';
                        //        else
                        //            srhRes += '<a href="' + myUrl + '" class="HighlightText" target="_blank">' + item.ContractTitle.replace("  ", "&nbsp;&nbsp;") + '</a>';

                        //    }
                        //    //if (item.InRecycleBin == "Yes") {
                        //    //    srhRes += '<a href="javascript:void(0)" class="HighlightText">' + item.ContractTitle + ' <i>( In Recycle Bin )</i></a>';
                        //    //} else {
                        //    //    srhRes += '<a href="' + myUrl + '" class="HighlightText">' + item.ContractTitle + '</a>';
                        //    //}
                        //    srhRes += '<small>';
                        //    srhRes += '<b style="float: left !important; color: #b4b3b3; padding: 0;">Contract Record Number: </b>';
                        //    if ($("#spScope").html() == "Contract Record Number")
                        //        srhRes += '<b style="float: left; color: #777; padding: 0; margin: 0 3px;" class="HighlightText">';
                        //    else
                        //        srhRes += '<b style="float: left; color: #777; padding: 0; margin: 0 3px;">';

                        //    srhRes += item.ContractNumber + ' | </b>';
                        //    srhRes += '<b style="float: left !important; color: #b4b3b3; padding: 0;">Status: </b>';
                        //    srhRes += '<b style="float: left; color: #777; padding: 0; margin: 0 3px;">';
                        //    srhRes += item.Status + ' | </b>';
                        //    srhRes += '<b style="float: left !important; color: #b4b3b3; padding: 0;">Last Modified: </b>';
                        //    srhRes += '<b style="float: left; color: #777; padding: 0; margin: 0 3px;">';
                        //    srhRes += moment(new Date(item.Timestamp)).fromNow() + '</b>';
                        //    srhRes += '</small>';
                        //    srhRes += '</p>';
                        //    srhRes += '</li>';

                        //}


                        //$("#listSearchResult").append(srhRes);


                        //var srhtextarr = $("#txtSearchBox").val().split(/,| /);
                        //if (vMatchExact == 'Yes')
                        //    srhtextarr = [$("#txtSearchBox").val()];

                        //srhtextarr = $.map(srhtextarr, $.trim);
                        //var regextxt = srhtextarr.join('|');
                        //$(".HighlightText").highlight(regextxt, "srchbold");


                        ////$("#listSearchResult li").sort(sort_li).appendTo("#listSearchResult"); // sort elements

                        //$("#loading").empty();
                        //$("#loadingPage").fadeOut();
                        //$('#compact-pagination').pagination({
                        //    items: data.length,
                        //    itemsOnPage: 20,
                        //    type: 'ul',
                        //    row: 'li',
                        //    typeID: 'listSearchResult',
                        //    cssStyle: 'compact-theme',
                        //    resultcount: 'spResult'
                        //});
                    },
                    error:
                        function (data) {
                            $("#loading").empty();
                            $("#loadingPage").fadeOut();
                            $("#listSearchResult").empty();
                            $("#listSearchResult").append("<label class='f_p-error'>No items found.</label>");
                        },
                    complete: function (data) {
                        $("#loadingPage").fadeOut();
                    }
                });

            }
        }
        else {
            $("#loading").empty();
            $("#loadingPage").fadeOut();
            $("#listSearchResult").empty();
            $("#listSearchResult").append("<label class='f_p-error'>No items found.</label>");
        }
    }
}


var listContracts = [];

function GetDataContracts(data) {
    var resultfound = true;

    if (data.length == 0) {
        resultfound = false;
        $('#listSearchResult').empty();
        $("#listSearchResult").append("<p class='f_p-error'>No items found.</p>");
        $("#compact-pagination").css('display', 'none');
    } else {
        listContracts = data;
        CreateContractList(0);
        $('#compact-pagination').pagination({
            items: data.length,
            itemsOnPage: 20,
            type: 'ul',
            row: 'li',
            typeID: 'listSearchResult',
            cssStyle: 'compact-theme',
            listname: 'Contracts'
        });

    }
    return resultfound;
}



function CreateContractList(page) {
    $('#listSearchResult').empty();
    var startIndex = page * 20;
    var endIndex = startIndex + 20;
    if (endIndex > listContracts.length) endIndex = listContracts.length;
    $("#spResult").html((startIndex + 1) + '&nbsp;to&nbsp;' + endIndex + '&nbsp;of&nbsp;' + listContracts.length);

    var settings = {
        pattern: /\.[0-9a-z]+$/i,
        knownFileTypes: ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'zip', 'rar', 'gzip', 'arj', 'wav', 'mp3', 'aif', 'aiff', 'm4a', 'ogg', 'wma', 'psd', 'ai', 'swf', 'fla', 'css', 'js', 'avi', 'mov', 'wmv', 'dotx'],
        WopiFrameFileTypes: ['doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx', 'dotx']
    };

    var vMatchExact = $("#ddlKeywordMatch :selected").val().trim();
    var srhRes = '';
    for (var i = startIndex; i < endIndex; i++) {
        var item = listContracts[i];
        //IsPipeline
        if (item.IsFinalized.toLowerCase() != "yes") {
            var myUrl = '/Contracts/ContractDetails?ContractID=' + encodeURI(item.RowKey) + '&Stage=pipeline';
        }
        else {
            var myUrl = '/Contracts/ContractDetails?ContractID=' + encodeURI(item.RowKey);

        }

        srhRes += '<li class="seArchLi">';
        srhRes += '<span>&nbsp;</span>';
        srhRes += '<p class="seArchP">';
        if (item.InRecycleBin == "Yes") {
            if ($("#spScope").html() == "Contract Record Number")
                srhRes += '<a href="javascript:void(0)" target="_blank">' + item.ContractTitle.replace("  ", "&nbsp;&nbsp;") + ' <i>( In Recycle Bin )</i></a>';
            else
                srhRes += '<a href="javascript:void(0)" class="HighlightText" target="_blank">' + item.ContractTitle.replace("  ", "&nbsp;&nbsp;") + ' <i>( In Recycle Bin )</i></a>';

        } else {
            if ($("#spScope").html() == "Contract Record Number")
                srhRes += '<a href="' + myUrl + '" target="_blank">' + item.ContractTitle.replace("  ", "&nbsp;&nbsp;") + '</a>';
            else
                srhRes += '<a href="' + myUrl + '" class="HighlightText" target="_blank">' + item.ContractTitle.replace("  ", "&nbsp;&nbsp;") + '</a>';

        }
        //if (item.InRecycleBin == "Yes") {
        //    srhRes += '<a href="javascript:void(0)" class="HighlightText">' + item.ContractTitle + ' <i>( In Recycle Bin )</i></a>';
        //} else {
        //    srhRes += '<a href="' + myUrl + '" class="HighlightText">' + item.ContractTitle + '</a>';
        //}
        srhRes += '<small>';
        srhRes += '<b style="float: left !important; color: #b4b3b3; padding: 0;">Contract Record Number: </b>';
        if ($("#spScope").html() == "Contract Record Number")
            srhRes += '<b style="float: left; color: #777; padding: 0; margin: 0 3px;" class="HighlightText">';
        else
            srhRes += '<b style="float: left; color: #777; padding: 0; margin: 0 3px;">';

        srhRes += item.ContractNumber + ' | </b>';
        srhRes += '<b style="float: left !important; color: #b4b3b3; padding: 0;">Status: </b>';
        srhRes += '<b style="float: left; color: #777; padding: 0; margin: 0 3px;">';
        srhRes += item.Status + ' | </b>';
        srhRes += '<b style="float: left !important; color: #b4b3b3; padding: 0;">Last Modified: </b>';
        srhRes += '<b style="float: left; color: #777; padding: 0; margin: 0 3px;">';
        srhRes += moment(new Date(item.Timestamp)).fromNow() + '</b>';
        srhRes += '</small>';
        srhRes += '</p>';
        srhRes += '</li>';
    }
    $("#listSearchResult").append(srhRes);
    $('.files').linktype();
    $("#loading").empty();
    $("#loadingPage").fadeOut();

    var srhtextarr = $("#txtSearchBox").val().trim().split(/,| /);
    if (vMatchExact == 'Yes')
        srhtextarr = [$("#txtSearchBox").val().trim()];
    srhtextarr = $.map(srhtextarr, $.trim);
    var regextxt = srhtextarr.join('|');
    $(".HighlightText").highlight(regextxt, "srchbold");
    //$("#listSearchResult li").sort(sort_li).appendTo("#listSearchResult"); // sort elements

}

function sort_li(a, b) {
    var stra = "";
    var strb = "";
    var al = $(a).find(".srchbold").each(function () {
        stra += $(this).text();
    })

    var bl = $(b).find(".srchbold").each(function () {
        strb += $(this).text();
    })
    var afulltxt = "";
    var bfulltxt = "";
    try {
        var asrc = $(a).find(".srchbold");
        var bsrc = $(b).find(".srchbold");

        if (asrc != null && typeof (asrc) != "undefined" && asrc.length > 0) {

            afulltxt = asrc.parent()[0].innerText;
        }
        if (bsrc != null && typeof (bsrc) != "undefined" && bsrc.length > 0) {

            bfulltxt = bsrc.parent()[0].innerText;
        }
    }
    catch (ex) {

    }
    return (strb.length) > (stra.length) ? 1 : (((strb.length) == (stra.length) ? ((bfulltxt.length) < (afulltxt.length) ? 1 : -1) : -1));
}
jQuery.fn.highlight = function (str, className) {
    var regexl = new RegExp(escapeRegExp(str.toLowerCase()), "i");
    var regex = new RegExp(escapeRegExp(str), "gi");
    // var regexl = new RegExp(str.toLowerCase(), "gi");
    // var regex = new RegExp(str, "gi");
    var ismatch = false;
    return this.each(function () {
        $(this).contents().filter(function () {
            if (this.nodeValue != null) {
                ismatch = regexl.test(this.nodeValue.toLowerCase());
                return this.nodeType == 3 && (ismatch || str.toLowerCase() === this.nodeValue.toLowerCase());
            }
            else {
                return this.nodeType == 3 && ismatch;
            }
        }).replaceWith(function () {
            if (ismatch) {
                return (this.nodeValue || "").replace(regex, function (match) {
                    return "<s class=\"" + className + "\">" + match + "</s>";
                });
            }
            else {
                return (this.nodeValue || "").replace(str, function (match) {
                    return "<s class=\"" + className + "\">" + match + "</s>";
                });
            }
        });
    });
};


function ApplyFilterDocument() {
    $("#compact-pagination").empty();
    $("#spResult").empty();
    $("#aSearchContract").css("background-color", "");
    $("#aSearchDocument").css("background-color", "#f7f7f7");
    $("#aSearchCounterparty").css("background-color", "");
    if ($("#txtSearchBox").val().trim() != "") {
        var vURL = '';
        var iCount = 0;
        //$("#loading").html('<span class="line_height_20px"><img src="../Content/Images/icon/loading.gif"> Searching...</span>');
        $("#loadingPage").fadeIn();
        $("#listSearchResult").empty();
        var SendReminderToArr = $("#ddlDocumentType").val();
        var vSendReminderTo = '';
        $(SendReminderToArr).each(function (i, item) {
            if (vSendReminderTo == '') {
                vSendReminderTo = item;
            }
            else {
                vSendReminderTo += "," + item;
            }
        });
        var DocumentType = vSendReminderTo;
        //$("input[type='checkbox'][name='DocumentType']:checked").each(function () {
        //    if (DocumentType == '') {
        //        DocumentType = this.title;
        //    }
        //    else {
        //        DocumentType += ',' + this.title;
        //    }
        //});
        var selectedScope = $('#scopeOptions').val().join('~');
        var vsearchkeyword = selectedScope + ':' + $("#txtSearchBox").val().trim();
        var vcustomquery = '';

        if ($("#txtValidFrom").val() != '') {
            if (localStorage.AppDateFormat == null || localStorage.AppDateFormat == "" || localStorage.AppDateFormat == 'undefined') {
                vcustomquery += "ValidFrom:Date:" + $("#txtValidFrom").val().replace(" to ", ",") + ';';
            }
            else {
                var dateformate = localStorage.AppDateFormat.toLowerCase().slice(0, -2);
                if (dateformate.toLowerCase() == "mm/dd/yy") {
                    vcustomquery += "ValidFrom:Date:" + $("#txtValidFrom").val().replace(" to ", ",") + ';';
                }
                else if (dateformate.toLowerCase() == "dd/mm/yy") {
                    var dt = $.map($("#txtValidFrom").val().replace(" to ", ",").split(","), $.trim);
                    if (dt != null && typeof (dt) != "undefined") {
                        var start = dt.length > 0 ? ddmmTOmmdd(dt[0]) : "";
                        var end = dt.length > 1 ? ddmmTOmmdd(dt[1]) : "";
                        vcustomquery += "ValidFrom:Date:" + start + "," + end + ';';
                    }
                }
                else
                    vcustomquery += "ValidFrom:Date:" + $("#txtValidFrom").val().replace(" to ", ",") + ';';
            }
        }

        if ($("#txtValidTill").val() != '') {
            if (localStorage.AppDateFormat == null || localStorage.AppDateFormat == "" || localStorage.AppDateFormat == 'undefined') {
                vcustomquery += "ValidTill:Date:" + $("#txtValidTill").val().replace(" to ", ",") + ';';
            }
            else {
                var dateformate = localStorage.AppDateFormat.toLowerCase().slice(0, -2);
                if (dateformate.toLowerCase() == "mm/dd/yy") {
                    vcustomquery += "ValidTill:Date:" + $("#txtValidTill").val().replace(" to ", ",") + ';';
                }
                else if (dateformate.toLowerCase() == "dd/mm/yy") {
                    var dt = $.map($("#txtValidTill").val().replace(" to ", ",").split(","), $.trim);
                    if (dt != null && typeof (dt) != "undefined") {
                        var start = dt.length > 0 ? ddmmTOmmdd(dt[0]) : "";
                        var end = dt.length > 1 ? ddmmTOmmdd(dt[1]) : "";
                        vcustomquery += "ValidTill:Date:" + start + "," + end + ';';
                    }
                }
                else
                    vcustomquery += "ValidTill:Date:" + $("#txtValidTill").val().replace(" to ", ",") + ';';
            }
        }
        if ($("#txtCreatedDate").val() != '') {
            if (localStorage.AppDateFormat == null || localStorage.AppDateFormat == "" || localStorage.AppDateFormat == 'undefined') {
                vcustomquery += "Created:Date:" + $("#txtCreatedDate").val().replace(" to ", ",") + ';';
            }
            else {
                var dateformate = localStorage.AppDateFormat.toLowerCase().slice(0, -2);
                if (dateformate.toLowerCase() == "mm/dd/yy") {
                    vcustomquery += "Created:Date:" + $("#txtCreatedDate").val().replace(" to ", ",") + ';';
                }
                else if (dateformate.toLowerCase() == "dd/mm/yy") {
                    var dt = $.map($("#txtCreatedDate").val().replace(" to ", ",").split(","), $.trim);
                    if (dt != null && typeof (dt) != "undefined") {
                        var start = dt.length > 0 ? ddmmTOmmdd(dt[0]) : "";
                        var end = dt.length > 1 ? ddmmTOmmdd(dt[1]) : "";
                        vcustomquery += "Created:Date:" + start + "," + end + ';';
                    }
                }
                else
                    vcustomquery += "Created:Date:" + $("#txtCreatedDate").val().replace(" to ", ",") + ';';
            }
        }
        if (DocumentType != '')
            vcustomquery += "DocumentType:String:" + encodeURIComponent(DocumentType);
        $("#showAll").html($("#txtSearchBox").val().trim());
        var vMatchExact = $("#ddlKeywordMatch :selected").val().trim();
        vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/search?customquery=' + vcustomquery + '&searchkeyword=' + encodeURIComponent(vsearchkeyword) + '&MatchExact=' + vMatchExact;

        $.ajax({
            url: vURL,
            type: 'GET',
            dataType: 'json',
            'Content-Type': 'application/json',
            cache: false,

            headers: { 'eContracts-ApiKey': localStorage.APIKey, UserName: localStorage.UserName, UserID: localStorage.UserID },

            success: function (data) {
                GetDataDocuments(data);


                //var settings = {
                //    pattern: /\.[0-9a-z]+$/i,
                //    knownFileTypes: ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'zip', 'rar', 'gzip', 'arj', 'wav', 'mp3', 'aif', 'aiff', 'm4a', 'ogg', 'wma', 'psd', 'ai', 'swf', 'fla', 'css', 'js', 'avi', 'mov', 'wmv', 'dotx'],
                //    WopiFrameFileTypes: ['doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx', 'dotx']
                //};

                //var srhRes = '';
                //var datalenght = data.length;
                //for (var i = 0; i < datalenght; i++) {
                //    var item = data[i];
                //    if (item.IsFolder == '' || item.IsFolder == 'False') {
                //        var myUrl = '';
                //        var vDocIcon = '<img src="../Content/Images/icon/draft_doc.png" class="doc_type" alt="Draft Document" title="Draft Document" />';
                //        var vDocumentLibraryName = item.DocumentLibraryName;
                //        if (vDocumentLibraryName != '' && vDocumentLibraryName != null) {
                //            if (vDocumentLibraryName == "Finalized Documents") {
                //                vDocIcon = '<img src="../Content/Images/icon/final_doc.png" class="doc_type" alt="Finalized Document" title="Finalized Document" />';
                //            }
                //        }
                //        var vURL = encodeURI(item.DocumentUrl);
                //        var ext = vURL.match(settings.pattern);
                //        var vFileType = '<dd class="file-icon none"></dd>';
                //        if (ext != null) {
                //            if (ext.length > 0) { ext = ext[0].slice(1); }
                //            if (vURL.toLowerCase().indexOf(localStorage.SPHostUrl.toLowerCase()) >= 0) {
                //                if (jQuery.inArray(ext, settings.WopiFrameFileTypes) > -1) {
                //                    vURL = localStorage.SPHostUrl + "/_layouts/WopiFrame.aspx?sourcedoc=" + vURL + "&action=default";
                //                }
                //            }

                //            if (jQuery.inArray(ext, settings.knownFileTypes) > -1) {
                //                vFileType = '<i class="file-icon ' + ext + '"></i>';
                //            }
                //        }

                //        myUrl = '<a href=' + vURL + ' target="_blank" class="HighlightText">' + item.DocumentName + '</a>&nbsp;' + vDocIcon;


                //        srhRes += '<li class="seArchLi">';
                //        srhRes += '<span>&nbsp;</span>';
                //        srhRes += '<p class="seArchP">' + myUrl;

                //        srhRes += '<small>';
                //        srhRes += '<b style="float: left !important; color: #b4b3b3; padding: 0;" >Document Type: </b>';
                //        srhRes += '<b style="float: left; color: #777; padding: 0; margin: 0 3px;">';
                //        srhRes += item.DocumentType + ' | </b>';
                //        srhRes += '<b style="float: left !important; color: #b4b3b3; padding: 0;">Creation Mode: </b>';
                //        srhRes += '<b style="float: left; color: #777; padding: 0; margin: 0 3px;">';
                //        srhRes += item.CreationMode + ' | </b>';
                //        if (item.CreationMode == "Template") {
                //            srhRes += '<b style="float: left !important; color: #b4b3b3; padding: 0;">Template Name: </b>';
                //            if ($("#spScope").html() == "Template Name")
                //                srhRes += '<b style="float: left; color: #777; padding: 0; margin: 0 3px;"  class="HighlightText">';
                //            else
                //                srhRes += '<b style="float: left; color: #777; padding: 0; margin: 0 3px;">';
                //            srhRes += item.TemplateName + ' | </b>';
                //        }
                //        srhRes += '<b style="float: left !important; color: #b4b3b3; padding: 0;">Last Modified: </b>';
                //        srhRes += '<b style="float: left; color: #777; padding: 0; margin: 0 3px;">';
                //        srhRes += moment(new Date(item.Timestamp)).fromNow() + '</b>';
                //        srhRes += '</small>';


                //        srhRes += '</p>';
                //        srhRes += '</li>';
                //        iCount++;
                //    }
                //}
                //$("#listSearchResult").append(srhRes);
                //$('.files').linktype();
                //$("#loading").empty();
                //$("#loadingPage").fadeOut();

                //var srhtextarr = $("#txtSearchBox").val().split(/,| /);
                //if (vMatchExact == 'Yes')
                //    srhtextarr = [$("#txtSearchBox").val()];
                //srhtextarr = $.map(srhtextarr, $.trim);
                //var regextxt = srhtextarr.join('|');
                //$(".HighlightText").highlight(regextxt, "srchbold");
                //$("#listSearchResult li").sort(sort_li).appendTo("#listSearchResult"); // sort elements
                //$('#compact-pagination').pagination({
                //    items: iCount,
                //    itemsOnPage: 20,
                //    type: 'ul',
                //    row: 'li',
                //    typeID: 'listSearchResult',
                //    cssStyle: 'compact-theme',
                //    resultcount: 'spResult'
                //});

            },
            error:
                function (data) {
                    $("#loading").empty();
                    $("#loadingPage").fadeOut();
                    $("#listSearchResult").empty();
                    $("#listSearchResult").append("<label class='f_p-error'>No items found.</label>");
                },
            complete: function (data) {
                $("#loadingPage").fadeOut();
            }
        });
    }
    else {
        $("#loading").empty();
        $("#loadingPage").fadeOut();
        $("#listSearchResult").empty();
        $("#listSearchResult").append("<label class='f_p-error'>No items found.</label>");
    }
}

var listDocuments = [];

function GetDataDocuments(data) {
    var resultfound = true;

    if (data.length == 0) {
        resultfound = false;
        $('#listSearchResult').empty();
        $("#listSearchResult").append("<p class='f_p-error'>No items found.</p>");
        $("#compact-pagination").css('display', 'none');
    } else {
        listDocuments = data;
        CreateDocumentList(0);
        $('#compact-pagination').pagination({
            items: data.length,
            itemsOnPage: 20,
            type: 'ul',
            row: 'li',
            typeID: 'listSearchResult',
            cssStyle: 'compact-theme',
            listname: 'Documents'
        });

    }
    return resultfound;
}



function CreateDocumentList(page) {
    $('#listSearchResult').empty();
    var startIndex = page * 20;
    var endIndex = startIndex + 20;
    if (endIndex > listDocuments.length) endIndex = listDocuments.length;
    $("#spResult").html((startIndex + 1) + '&nbsp;to&nbsp;' + endIndex + '&nbsp;of&nbsp;' + listDocuments.length);

    var settings = {
        pattern: /\.[0-9a-z]+$/i,
        knownFileTypes: ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'zip', 'rar', 'gzip', 'arj', 'wav', 'mp3', 'aif', 'aiff', 'm4a', 'ogg', 'wma', 'psd', 'ai', 'swf', 'fla', 'css', 'js', 'avi', 'mov', 'wmv', 'dotx'],
        WopiFrameFileTypes: ['doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx', 'dotx']
    };

    var vMatchExact = $("#ddlKeywordMatch :selected").val().trim();
    var srhRes = '';
    for (var i = startIndex; i < endIndex; i++) {
        var item = listDocuments[i];
        if (item.IsFolder == '' || item.IsFolder == 'False') {
            var myUrl = '';
            var vDocIcon = '<img src="../Content/Images/icon/draft_doc.png" class="doc_type" alt="Draft Document" title="Draft Document" />';
            var vDocumentLibraryName = item.DocumentLibraryName;
            if (vDocumentLibraryName != '' && vDocumentLibraryName != null) {
                if (vDocumentLibraryName == "Finalized Documents") {
                    vDocIcon = '<img src="../Content/Images/icon/final_doc.png" class="doc_type" alt="Finalized Document" title="Finalized Document" />';
                }
            }
            var vURL = encodeURI(item.DocumentUrl);
            var ext = vURL.match(settings.pattern);
            var vFileType = '<dd class="file-icon none"></dd>';
            if (ext != null) {
                if (ext.length > 0) { ext = ext[0].slice(1); }
                if (vURL.toLowerCase().indexOf(localStorage.SPHostUrl.toLowerCase()) >= 0) {
                    if (jQuery.inArray(ext, settings.WopiFrameFileTypes) > -1) {
                        vURL = localStorage.SPHostUrl + "/_layouts/WopiFrame.aspx?sourcedoc=" + vURL + "&action=default";
                    }
                }

                if (jQuery.inArray(ext, settings.knownFileTypes) > -1) {
                    vFileType = '<i class="file-icon ' + ext + '"></i>';
                }
            }

            myUrl = '<a href="javascript:void(0);" data-value="' + encodeURIComponent(item.DocumentUrl) + '"   onclick="Opendocinbrowser(\'' + encodeURIComponent(item.DocumentUrl) + '\')" class="HighlightText">' + item.DocumentName + '</a>&nbsp;' + vDocIcon;

            srhRes += '<li class="seArchLi">';
            srhRes += '<span>&nbsp;</span>';
            srhRes += '<p class="seArchP">' + myUrl;
            srhRes += '<small class="HighlightText clfulltext" style="color:#777" class="high1">' + item.HighlightedSummary + '</small>';
            srhRes += '<small>';
            srhRes += '<b style="float: left !important; color: #b4b3b3; padding: 0;" >Document Type: </b>';
            srhRes += '<b style="float: left; color: #777; padding: 0; margin: 0 3px;">';
            if (item.DocumentType != "0" && item.DocumentType != "")
                srhRes += item.DocumentType + ' | </b>';
            else
                srhRes += 'NA | </b>';
            srhRes += '<b style="float: left !important; color: #b4b3b3; padding: 0;">Creation Mode: </b>';
            srhRes += '<b style="float: left; color: #777; padding: 0; margin: 0 3px;">';
            srhRes += item.CreationMode + ' | </b>';
            if (item.CreationMode == "Template") {
                srhRes += '<b style="float: left !important; color: #b4b3b3; padding: 0;">Template Name: </b>';
                if ($("#spScope").html() == "Template Name")
                    srhRes += '<b style="float: left; color: #777; padding: 0; margin: 0 3px;"  class="HighlightText">';
                else
                    srhRes += '<b style="float: left; color: #777; padding: 0; margin: 0 3px;">';
                srhRes += item.TemplateName + ' | </b>';
            }
            srhRes += '<b style="float: left !important; color: #b4b3b3; padding: 0;">Last Modified: </b>';
            srhRes += '<b style="float: left; color: #777; padding: 0; margin: 0 3px;">';
            srhRes += moment(new Date(item.Timestamp)).fromNow() + '</b>';
            srhRes += '</small>';


            srhRes += '</p>';
            srhRes += '</li>';
        }
    }
    $("#listSearchResult").append(srhRes);
    $('.files').linktype();
    $("#loading").empty();
    $("#loadingPage").fadeOut();

    var srhtextarr = $("#txtSearchBox").val().trim().split(/,| /);
    if (vMatchExact == 'Yes')
        srhtextarr = [$("#txtSearchBox").val().trim()];
    srhtextarr = $.map(srhtextarr, $.trim);
    var regextxt = srhtextarr.join('|');
    $(".HighlightText").highlight(regextxt, "srchbold");
    //manoj
    if ($("#ddlKeywordMatch :selected").val().trim() == "Exact Keyword") {
        $(".clfulltext:contains('" + $("#txtSearchBox").val().trim() + "')").each(function (i, element) {
            var content = $(element).text();
            content = content.replace($("#txtSearchBox").val().trim(), '<s class="srchbold">' + $("#txtSearchBox").val().trim() + '</s>');
            $(element).html(content);
        });
    }
    //manoj
    // $("#listSearchResult li").sort(sort_li).appendTo("#listSearchResult"); // sort elements

}
function ApplyFilterCounterparty() {
    $("#compact-pagination").empty();
    $("#spResult").empty();
    $("#aSearchContract").css("background-color", "");
    $("#aSearchDocument").css("background-color", "");
    $("#aSearchCounterparty").css("background-color", "#f7f7f7");
    if ($("#txtSearchBox").val().trim() != "") {

        var vURL = '';
        $("#loading").html('<span class="line_height_20px"><img src="../Content/Images/icon/loading.gif"> Searching...</span>');
        $("#loadingPage").fadeIn();
        $("#listSearchResult").empty();
        var SendReminderToArr = $("#ddlCountpartyStatus").val();
        var vSendReminderTo = '';
        $(SendReminderToArr).each(function (i, item) {
            if (vSendReminderTo == '') {
                vSendReminderTo = item;
            }
            else {
                vSendReminderTo += "," + item;
            }
        });
        var CountpartyStatus = vSendReminderTo;
        //$("input[type='checkbox'][name='CounterpartyType']:checked").each(function () {
        //    if (CounterpartyType == '') {
        //        CounterpartyType = this.title;
        //    }
        //    else {
        //        CounterpartyType += ',' + this.title;
        //    }
        //});
        var SendReminderToArr1 = $("#ddlCounterpartyType").val();
        var vSendReminderTo1 = '';
        $(SendReminderToArr1).each(function (i, item) {
            if (vSendReminderTo1 == '') {
                vSendReminderTo1 = item;
            }
            else {
                vSendReminderTo1 += "," + item;
            }
        });
        var CounterpartyType = vSendReminderTo1;
        //$("input[type='checkbox'][name='CountpartyStatus']:checked").each(function () {
        //    if (CountpartyStatus == '') {
        //        CountpartyStatus = this.title;
        //    }
        //    else {
        //        CountpartyStatus += ',' + this.title;
        //    }
        //});
        $("#showAll").html($("#txtSearchBox").val().trim());
        var selectedScope = $('#scopeOptions').val().join('~');
        var vsearchkeyword = selectedScope + ':' + $("#txtSearchBox").val().trim();
        var vcustomquery = '';
        if (CounterpartyType != '') {
            if (vcustomquery == '')
                vcustomquery += "CounterpartyType:String:" + CounterpartyType;
            else
                vcustomquery += ";CounterpartyType:String:" + CounterpartyType;
        }
        if (CountpartyStatus != '')
            if (vcustomquery == '')
                vcustomquery += "Status:String:" + CountpartyStatus;
            else
                vcustomquery += ";Status:String:" + CountpartyStatus;


        var vMatchExact = $("#ddlKeywordMatch :selected").val().trim();
        vURL = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/search?customquery=' + vcustomquery + '&searchkeyword=' + encodeURIComponent(vsearchkeyword) + '&MatchExact=' + vMatchExact;

        $.ajax({
            url: vURL,
            type: 'GET',
            dataType: 'json',
            'Content-Type': 'application/json',
            cache: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            success: function (data) {
                var datalenght = data.length;
                var srhRes = '';
                var addr = '';
                var myUrl = '';
                var item = null;
                for (var i = 0; i < datalenght; i++) {
                    item = data[i];
                    myUrl = '/Counterparty/CounterpartyDetail?CounterpartyID=' + encodeURI(item.RowKey);
                    addr = '';
                    if (item.Address != "")
                        addr += item.Address;
                    if (item.AddressLine2 != "") {
                        if (addr == '')
                            addr += item.AddressLine2;
                        else
                            addr += ', ' + item.AddressLine2;
                    }
                    if (item.City != "") {
                        if (addr == '')
                            addr += item.City;
                        else
                            addr += ', ' + item.City;
                    }
                    if (item.State != "") {
                        if (addr == '')
                            addr += item.State;
                        else
                            addr += ', ' + item.State;
                    }
                    if (item.Country != "") {
                        if (addr == '')
                            addr += item.Country;
                        else
                            addr += ', ' + item.Country;
                    }

                    srhRes += '<li class="seArchLi">';
                    srhRes += '<span>&nbsp;</span>';
                    srhRes += '<p class="seArchP">';
                    srhRes += '<a href="' + myUrl + '" class="HighlightText" target="_blank">' + item.CounterpartyName + '</a>';

                    srhRes += '<small>';
                    srhRes += '<b style="float: left !important; color: #b4b3b3; padding: 0;">Counterparty Type: </b>';
                    srhRes += '<b style="float: left; color: #777; padding: 0; margin: 0 3px;">';
                    srhRes += item.CounterpartyType + ' | </b>';
                    srhRes += '<b style="float: left !important; color: #b4b3b3; padding: 0;">Address: </b>';
                    srhRes += '<b style="float: left; color: #777; padding: 0; margin: 0 3px;">';
                    srhRes += addr + ' | </b>';
                    srhRes += '<b style="float: left !important; color: #b4b3b3; padding: 0;">Last Modified: </b>';
                    srhRes += '<b style="float: left; color: #777; padding: 0; margin: 0 3px;">';
                    srhRes += moment(new Date(item.Timestamp)).fromNow() + '</b>';
                    srhRes += '</small>';
                    srhRes += '</p>';
                    srhRes += '</li>';

                    //$("#listSearchResult").append(srhRes);

                }
                $("#listSearchResult").html(srhRes);
                $("#loading").empty();
                $("#loadingPage").fadeOut();
                var srhtextarr = $("#txtSearchBox").val().trim().split(/,| /);
                if (vMatchExact == 'Yes')
                    srhtextarr = [$("#txtSearchBox").val().trim()];
                srhtextarr = $.map(srhtextarr, $.trim);
                var regextxt = srhtextarr.join('|');
                $(".HighlightText").highlight(regextxt, "srchbold");
                //$("#listSearchResult li").sort(sort_li).appendTo("#listSearchResult"); // sort elements
                $('#compact-pagination').pagination({
                    items: data.length,
                    itemsOnPage: 20,
                    type: 'ul',
                    row: 'li',
                    typeID: 'listSearchResult',
                    cssStyle: 'compact-theme',
                    resultcount: 'spResult'
                });

            },
            error:
                function (data) {
                    $("#loading").empty();
                    $("#loadingPage").fadeOut();
                    $("#listSearchResult").empty();
                    $("#listSearchResult").append("<label class='f_p-error'>No items found.</label>");
                },
            complete: function (data) {
                $("#loadingPage").fadeOut();
            }
        });
    }
    else {
        $("#loading").empty();
        $("#loadingPage").fadeOut();
        $("#listSearchResult").empty();
        $("#listSearchResult").append("<label class='f_p-error'>No items found.</label>");
    }
}

function SearchResult(searchkey) {
    //$("#loading").html('<span class="line_height_20px"><img src="../Content/Images/icon/loading.gif"> Searching...</span>');
    $("#loadingPage").fadeIn();
    $("#listSearchResult").empty();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?searchkeyword=' + encodeURIComponent(searchkey),
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
        success: function (data) {
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                var myUrl = '/Contracts/ContractDetails?ContractID=' + encodeURI(item.RowKey);
                var srhRes = '<article class="box1"><div class="content_bottom search_result">';
                srhRes += '<p class="text-blue"><a href=' + myUrl + ' class="PreserveSpace">' + item.ContractTitle + '</p>';
                srhRes += '<p class="text">Contract Record Number:&nbsp;' + item.ContractNumber + '&nbsp;|&nbsp;Contract Record Type:&nbsp;' + item.ContractType
                    + '&nbsp;|&nbsp;Status:&nbsp;' + item.Status + '&nbsp;|&nbsp;Last Modified:&nbsp;' + moment(new Date(item.Timestamp)).fromNow() + '</p>';
                srhRes += '</div></article>';
                $("#listSearchResult").append(srhRes);
            }
            $("#loading").empty();
            $("#loadingPage").fadeOut();
        },
        error:
            function (data) {
                $("#loading").empty();
                $("#loadingPage").fadeOut();
                $("#listSearchResult").empty();
                $("#listSearchResult").append("<label class='f_p-error'>No items found.</label>");
            },
        complete: function (data) {
            $("#loadingPage").fadeOut();
        }
    });
}


function BindContractLabels() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/label',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (ContractLabels) {
            //$(documenttypes).each(function (i, item) {
            //    var article = '';
            //    if (i < 10) {
            //        article = '<li>';
            //    } else {
            //        article = '<li class="hiddendocument">';
            //    }
            //    article += '<p><input class="filter_Check" type="checkbox" name="DocumentType" id="DT' + i + '" title="' + item.TypeName + '" />'
            //        + item.TypeName + '</p></li>';
            //    $("#liDocumentType").append(article);
            //});
            //if (documenttypes.length < 10) {
            //    article = '<li>';
            //} else {
            //    article = '<li class="hiddendocument">';
            //}
            //article += '<p><input class="filter_Check" type="checkbox" name="DocumentType" id="DTOthers" title="Others" />Others</p></li>';
            //$("#liDocumentType").append(article);

            //$(".hiddendocument").css("display", "none");
            //if (documenttypes.length > 10) { $("#aDocumentMore").css("display", ""); }
            var article = '';
            //article += '<option value="All">All</option>';
            $(ContractLabels).each(function (i, item) {
                if (item.LabelTitle != "" && item.LabelTitle != null)
                    article += '<option value="' + item.LabelTitle + '">' + item.LabelTitle + '</option>';
            });
            $("#ddlLabels").append(article);
            $("#ddlLabels").chosen()
        },
        error:
            function (data) {
            }
    });
}
$('.chosenmulti').on('chosen:showing_dropdown', function (evt, params) {
    $('.result-selected').css('display', 'none');
});
function AddFilters(action) {
    $("#add_filterList").empty();
    var article = '';
    if (action == "Contracts") {

        BindSearchContractFields();
        $("#add_filterList input[type=checkbox]").each(function () {
            if (this.value == "BusinessAreaC") {
                $(this).prop('checked', true);
            }
            else if (this.value == "ContractManagersC") {
                $(this).prop('checked', true);
            }
            else if (this.value == "ContractTypeC") {
                $(this).prop('checked', true);
            }
            else
                $(this).prop('checked', false);
        });
        ApplyFilter1('contractFilter');
        //    article += '<li><a href="javascript:void(0)"><input type="checkbox" value="txtStartDateC" name="addFilter"><small style="padding: 5px;">Start Date</small></a></li>'
        //    article += '<li><a href="javascript:void(0)"><input type="checkbox" value="txtEndDateC" name="addFilter"><small style="padding: 5px;">End Date</small></a></li>'
        //    article += '<li><a href="javascript:void(0)"><input type="checkbox" value="txtLastRenewedDateC" name="addFilter"><small style="padding: 5px;">Last Renewed Date</small></a></li>'
        //    article += '<li><a href="javascript:void(0)"><input type="checkbox" value="txtContractValueC" name="addFilter"><small style="padding: 5px;">Base Contract Value</small></a></li>'
        //    article += '<li><a href="javascript:void(0)"><input type="checkbox" value="ddlLabelsC" name="addFilter"><small style="padding: 5px;">Labels</small></a></li>'
    }
    else if (action == "Counterparty") {
        article += '<li><a href="javascript:void(0)"><input type="checkbox" value="ddlCounterpartyTypeC" name="addFilter" checked><small style="padding: 5px;">Countparty Type</small></a></li>'
        article += '<li><a href="javascript:void(0)"><input type="checkbox" value="ddlCountpartyStatusC" name="addFilter" checked><small style="padding: 5px;">Countparty Status</small></a></li>'
        article += '<li><a class="aplay_Filter1" id="aFilterApply" onclick=ApplyFilter1("counterpartyFilter") href="javascript:void(0)"><small>Apply</small></a></li>';

        $("#add_filterList").append(article);
        ApplyFilter1('counterpartyFilter');
    }
    else if (action == "Documents") {
        article += '<li><a href="javascript:void(0)"><input type="checkbox" value="txtValidFromC" name="addFilter" checked><small style="padding: 5px;">Valid From</small></a></li>'
        article += '<li><a href="javascript:void(0)"><input type="checkbox" value="txtValidTillC" name="addFilter" checked><small style="padding: 5px;">Valid Till</small></a></li>'
        article += '<li><a href="javascript:void(0)"><input type="checkbox" value="txtCreatedDateC" name="addFilter" checked><small style="padding: 5px;">Created Date</small></a></li>'
        article += '<li><a href="javascript:void(0)"><input type="checkbox" value="ddlDocumentTypeC" name="addFilter" checked><small style="padding: 5px;">Document Type</small></a></li>'
        article += '<li><a class="aplay_Filter1" id="aFilterApply" onclick=ApplyFilter1("documentFilter") href="javascript:void(0)"><small>Apply</small></a></li>';

        $("#add_filterList").append(article);
        ApplyFilter1('documentFilter');
    }


}

//$('#aFilterApply').click(function () {
function ApplyFilter1(divToshow) {
    var flag = false;
    $("#" + divToshow).show();
    $('input:checkbox[name="addFilter"]').each(function () {
        if (this.checked) {
            var aFilter = this.value;
            aFilter = removeLastChar(aFilter, 'C');
            $("#" + aFilter + "S").css('display', '');
            flag = true;

            if (aFilter == "BusinessArea") {
                if (document.getElementById(aFilter + "S").style.display == "none") {
                    BindContractBusinessArea();
                }
            }
        }
        else {
            var aFilter = this.value;
            aFilter = removeLastChar(aFilter, 'C');
            $("#" + aFilter + "S").css('display', 'none');
            ClearSearchFilters($("#" + aFilter + "S")[0], false);
        }
    });
    $('#add_Filterss').hide();
    if (flag)
        $("#FilterDiv").show();
    else
        $("#FilterDiv").hide();

    // });
}
var removeLastChar = function (value, char) {
    var lastChar = value.slice(-1);
    if (lastChar == char) {
        value = value.slice(0, -1);
    }
    return value;
}
function ClearSearchFilters(ObjID, isClear) {
    if (typeof (ObjID) != "undefined") {
        var aFilter = ObjID.id;


        var obj = $("#" + aFilter + "");

        if (obj.find('.chosenmulti').length) {
            if (obj.find('select').length != 0 && typeof (obj.find('select')) != "undefined" && obj.find('select') != null) {
                obj.find('select').each(function () {
                    var idnew = this.id;
                    $("#" + idnew + " option:selected").prop('selected', false).trigger('chosen:updated');
                });
            }
        }
        try {
            if (obj.find('.OnlyBackDel').length) {
                obj.find('.OnlyBackDel').each(function () {
                    var idnew = this.id;


                    $("#" + idnew).data('dateRangePicker').clear();


                });
            }
        }
        catch (ex) {

        }
        if (obj.find('input').length != 0 && typeof (obj.find('input')) != "undefined" && obj.find('input') != null) {
            obj.find('input').each(function () {
                var idnew = this.id;
                if (idnew != "")
                    $("#" + idnew + "").val("");
            });
        }
        if (obj.find('textarea').length != 0 && typeof (obj.find('textarea')) != "undefined" && obj.find('textarea') != null) {
            obj.find('textarea').each(function () {
                var idnew = this.id;
                $("#" + idnew + "").val("");
            });
        }
        if (obj.find('select').length != 0 && typeof (obj.find('select')) != "undefined" && obj.find('select') != null) {
            obj.find('select').each(function () {
                var idnew = this.id;
                $("#" + idnew + "").val("");
            });
        }


        if (!isClear) {
            $("#" + aFilter + "").css('display', 'none');
            aFilter = aFilter + "C";
            $('input:checkbox[name="addFilter"]').each(function () {

                var aCheckBox = ObjID.value;
                if (aFilter == aCheckBox) {
                    ObjID.checked = false;
                }

            });
        }
    }
};

$('.filter-Close').click(function () {

    var aFilter = this.id;
    var obj = $("#" + aFilter + "");

    if (obj.find('.chosenmulti').length) {
        var idnew = obj.find('select')[0].id;
        $("#" + idnew + " option:selected").prop('selected', false).trigger('chosen:updated');
    }
    else {

        if (obj.find('input').length != 0 && typeof (obj.find('input')) != "undefined" && obj.find('input') != null) {
            obj.find('input').each(function () {
                var idnew = this.id;
                $("#" + idnew + "").val("");
            });
        }
        else if (obj.find('select')[0].id != "") {
            var idnew = obj.find('select')[0].id;
            $("#" + idnew + "").val(0);

        }

    }

    $("#" + aFilter + "").css('display', 'none');
    aFilter = removeLastChar(aFilter, 'S');
    aFilter = aFilter + "C";
    $('input:checkbox[name="addFilter"]').each(function () {

        var aCheckBox = this.value;
        if (aFilter == aCheckBox) {
            this.checked = false;
        }

    });

});


function BindFields() {
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/getGlobalFields',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        async: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            if (data != null) {
                oGlobalFieldConfiguration = data;
            }
            $("#loadingPage").fadeOut();
        },
        error: function (data) {
            $("#loadingPage").fadeOut();
        },
        complete: function (data) {
            $("#loadingPage").fadeOut();
        }
    });

}

function BindSearchContractFields() {
    if (oGlobalFieldConfiguration == "") {
        BindFields();
    }
    var ContractSearchChoice = '';
    var ContractDivArticle = '';
    var SearchCFieldsInXML = oGlobalFieldConfiguration.SearchFields;
    $("#contractFilter").show();

    if ($("#contractFilter > div").length == 0)
        createingdivbyme(SearchCFieldsInXML, "contractFilter");
    createFilter(SearchCFieldsInXML, "contractFilter", "add_filterList");
}
function BindSearchCounterpartyFields() {

}

function NoFieldsMapped() {
    $(".ToCloseSub").hide();
    $(".ToClose").each(function (i, item) {
        ClearSearchFilters(item, false);
    });
}


function createingdivbyme(item, idelvalue) {
    $(item).find('Field').each(function () {
        var vFieldName = $(this).find('FieldName').text();
        var vFieldDisplayName = $(this).find('FieldDisplayName').text();
        var vFieldType = $(this).find('FieldType').text();
        var vChoiceValues = $(this).find('ChoiceValues').length > 0 ? $(this).find('ChoiceValues').text() : "";
        var vDefaultField = $(this).find('DefaultField').length > 0 ? $(this).find('DefaultField').text() : "";
        var vDescription = $(this).find('Description').length > 0 ? $(this).find('Description').text() : "";
        var item = { 'FieldName': vFieldName, 'FieldDisplayName': vFieldDisplayName, 'FieldType': vFieldType, 'ChoiceValues': vChoiceValues, 'DefaultField': vDefaultField, 'Description': vDescription }

        var IsStandard = false;
        var IsCustom = false;
        var IsCustomLookUp = false;
        var IsGetUser1st = false;
        var vControls = "";
        var article = "";
        var vDate = "";
        var vUser = "";
        var vContracttype = "";
        var vNumber = "";
        var vEmail = "";
        var vCurrency = "";
        var vMultiDDL = "";
        var vNumberD = "";
        var vNumberP = "";
        var vNumberPD = "";
        var vProject = false;
        var vContractValue = false;
        if ($.inArray(item.FieldType, notRequiredSearchFieldType) == -1) {

            if ($.inArray(item.FieldType, ChoiceTypes) > -1)
                vControls = '<div id="' + item.FieldName + 'S" data-type="' + item.FieldType + '" style="display:none;width:94% !important" class="ToCloseSub">';
            else
                vControls = '<div id="' + item.FieldName + 'S" data-type="' + item.FieldType + '" style="display:none;" class="ToCloseSub">';

            vControls += '<div class="filter">';
            vControls += ' <h2 class="width90">' + item.FieldDisplayName + '</h2>';
            vControls += ' </div>';

            if (item.FieldType == "Single Line Text") {
                vControls += ' <input id="' + item.FieldName + '"  type="text" name="' + item.FieldDisplayName + '" class="f_inpt width90 NoCopyPaste validIsMinTwoLetter" />';
            }
            else if (item.FieldType == "Multi Line Text") {
                vControls += '<textarea name="' + item.FieldName + '" maxlength="500"  id="' + item.FieldName + '" title="' + item.FieldDisplayName + '" class="f_inpt width90 validIsMinTwoLetter"></textarea>';
            }
            else if (item.FieldType == "Date") {

                vControls += ' <input id="' + item.FieldName + '" name="' + item.FieldName + '"  title="' + item.FieldDisplayName + '" type="text" class="f_inpt width90 OnlyBackDel" />';
                vDate = item.FieldName;
            }
            else if (item.FieldType == "Choice") {
                if (item.FieldName == "TransactionType") {
                    vControls += '<select class="f_inpt width90 chosenmulti" data-placeholder=" " name="' + item.FieldName + '" title=" ' + item.FieldDisplayName + '"  multiple="multiple" id="' + item.FieldName + '">';
                    //vControls += "<option value='All'>All</option>";
                    vControls += "<option value='Buy-Side'>Buy-Side</option>";
                    vControls += "<option value='Sell-Side'>Sell-Side</option>";
                    vControls += "<option value='Legal/General Agreement'>Legal/General Agreement</option>";
                    vControls += '</select>';
                } else if (item.FieldName == "ContractClass") {
                    vControls += '<select class="f_inpt width90 chosenmulti" data-placeholder=" " name="' + item.FieldName + '" title=" ' + item.FieldDisplayName + '"  multiple="multiple" id="' + item.FieldName + '">';
                    //vControls += "<option value='All'>All</option>";
                    vControls += "<option value='Individual'>Individual</option>";
                    vControls += "<option value='Master Agreement'>Master Agreement</option>";
                    vControls += "<option value='Sub-Contract'>Sub-Contract</option>";

                    vControls += '</select>';

                } else if (item.FieldName == "ContractTermType") {
                    vControls += '<select class="f_inpt width90 chosenmulti" data-placeholder=" " name="' + item.FieldName + '" title=" ' + item.FieldDisplayName + '"  multiple="multiple" id="' + item.FieldName + '">';
                    vControls += '<option value="Fixed Term">Fixed Term</option>';
                    vControls += '<option value="Evergreen / Perpetual">Evergreen / Perpetual</option>';
                    vControls += '<option value="Renewable">Renewable</option>';
                    vControls += '<option value="Executed / Performance">Executed / Performance</option>';
                    vControls += '</select>';
                } else {
                    vControls += '<select class="f_inpt width90 chosenmulti" data-placeholder=" " name="' + item.FieldName + '" title=" ' + item.FieldDisplayName + '"  multiple="multiple" id="' + item.FieldName + '">';
                    //vControls += "<option value='All'>All</option>";

                    var myArray = [];
                    myArray = item.ChoiceValues.split("\n")
                    var myArraylength = myArray.length;

                    for (var i = 0; i < myArraylength; i = i + 1) {
                        do {
                            myArray[i] = myArray[i].replace("&amp;", "&");
                        } while (myArray[i].indexOf("&amp;") > -1)

                        vControls += "<option value='" + myArray[i] + "'>" + myArray[i] + "</option>";

                    }

                    vControls += '</select>';

                }
                vMultiDDL = item.FieldName;
            }
            else if (item.FieldType == "User") {
                vControls += '<select class="f_inpt width90 chosenmulti" data-placeholder=" " name="' + item.FieldName + '" title=" ' + item.FieldDisplayName + '"  multiple="multiple" id="' + item.FieldName + '">';

                if (vUserList == '') {
                    vUserList = GetUserList();
                }
                //if (vUserList == '')
                //{ IsGetUser1st = true; }
                vControls += vUserList;

                vControls += '</select>';
                vUser = item.FieldName;
            } else if (item.FieldType == "Lookup") {
                vControls += '<select class="f_inpt width90 chosenmulti" data-placeholder=" " name="' + item.FieldName + '" title=" ' + item.FieldDisplayName + '"  multiple="multiple" id="' + item.FieldName + '">';
                if (item.FieldName == "ContractType") {
                    if (vContractTypes == '') {
                        vContractTypes = getContractTypes();
                    }
                    vControls += vContractTypes;
                    vControls += '</select>';
                    vContracttype = item.FieldName;
                }
                else {
                    IsCustomLookUp = true;
                    vControls += '</select>';
                }
            }
            else if (item.FieldType.indexOf("Dropdown") > -1 || item.FieldType.indexOf("Multi Select") > -1) {
                if (item.FieldType.indexOf("Dropdown") > -1) {
                    vControls += '<select class="f_inpt width90 chosenmulti" data-placeholder=" " name="' + item.FieldName + '" title=" ' + item.FieldDisplayName + '"  multiple="multiple" id="' + item.FieldName + '">';
                    if (item.FieldType.indexOf("Dropdown") > -1) {
                        var vMultiDDL1 = "";
                        if (vMultiDDL1 == '') {
                            var myArray = [];
                            myArray = item.ChoiceValues.split("\n")
                            var myArraylength = myArray.length;
                            for (var i = 0; i < myArraylength; i = i + 1) {
                                vMultiDDL1 += "<option value='" + myArray[i] + "'>" + myArray[i] + "</option>";
                            }
                        }
                        vControls += vMultiDDL1;
                    } else {
                        var vMultiDDL1 = "";
                        if (vMultiDDL1 == '') {
                            IsCustomLookUp = true;
                        }

                    }
                    vControls += '</select>';
                    vMultiDDL = item.FieldName;
                }
                else {
                    if (item.ChoiceValues == "Counterparty") {
                        vControls += '<select class="f_inpt width90 chosenmulti" data-placeholder=" " name="' + item.FieldName + '" title=" ' + item.FieldDisplayName + '"  multiple="multiple" id="' + item.FieldName + '">';
                        IsCustom = true;
                        item.DefaultField = vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/counterparty/counterpartypicker';
                        item.Description = 'CounterpartyName';
                        vControls += '</select>';
                    }
                    else {
                        vControls += '<select class="f_inpt width90 chosenmulti" data-placeholder=" " name="' + item.FieldName + '" title=" ' + item.FieldDisplayName + '"  multiple="multiple" id="' + item.FieldName + '">';
                        if (item.FieldType.indexOf("Dropdown") > -1) {
                            var vMultiDDL1 = "";
                            if (vMultiDDL1 == '') {
                                var myArray = [];
                                myArray = item.ChoiceValues.split("\n")
                                var myArraylength = myArray.length;
                                for (var i = 0; i < myArraylength; i = i + 1) {
                                    vMultiDDL1 += "<option value='" + myArray[i] + "'>" + myArray[i] + "</option>";
                                }
                            }
                            vControls += vMultiDDL1;
                        } else {
                            var vMultiDDL1 = "";
                            if (vMultiDDL1 == '') {
                                IsCustomLookUp = true;
                            }

                        }
                        vControls += '</select>';
                        vMultiDDL = item.FieldName;
                    }
                }

            } else if (item.FieldType == "Currency" || item.FieldType == "Value / Financials") {
                vControls += "<div id='" + item.FieldName + "'>";
                vControls += '<input id="' + item.FieldName + '1" type="text" name="Contract Value1" class=" f_inpt width40 NoCopyPaste" />to&nbsp;';
                vControls += '<input id="' + item.FieldName + '2" type="text" name="Contract Value1" class=" f_inpt width40 NoCopyPaste" />';
                vControls += "</div>";
                vNumber = item.FieldName;
            }
            else if (item.FieldType == "Custom Lookup") {

                vControls += '<select class="f_inpt width90 chosenmulti" data-placeholder=" " name="' + item.FieldName + '" title=" ' + item.FieldDisplayName + '"  multiple="multiple" id="' + item.FieldName + '">';
                //vControls += "<option value='All'>All</option>";
                IsCustom = true;
                // vControls += bindPreDefinedValues(item.DefaultField, item.Description);
                vControls += '</select>';
                // vMultiDDL = item.FieldName;
            }
            else if (item.FieldType == "Standard Lookup") {

                vControls += '<select class="f_inpt width90 chosenmulti" data-placeholder=" " name="' + item.FieldName + '" title=" ' + item.FieldDisplayName + '"  multiple="multiple" id="' + item.FieldName + '">';
                //vControls += "<option value='All'>All</option>";
                IsStandard = true;
                // vControls += getstandardLookupValues(item.FieldName);
                vControls += '</select>';
                //vMultiDDL = item.FieldName;
            }
            else if (item.FieldType == "Number") {
                vControls += "<div id='" + item.FieldName + "'>";
                vControls += '<input id="' + item.FieldName + '1" type="text" name="Contract Value1" class=" f_inpt width40 NoCopyPaste" />to&nbsp;';
                vControls += '<input id="' + item.FieldName + '2" type="text" name="Contract Value1" class=" f_inpt width40 NoCopyPaste" />';
                vControls += "</div>";
                vNumber = item.FieldName;
            }
            else if (item.FieldType == "Number-D") {
                vControls += "<div id='" + item.FieldName + "'>";
                vControls += '<input id="' + item.FieldName + '1" type="text" name="Contract Value1" class=" f_inpt width40 NoCopyPaste" />to&nbsp;';
                vControls += '<input id="' + item.FieldName + '2" type="text" name="Contract Value1" class=" f_inpt width40 NoCopyPaste" />';
                vControls += "</div>";
                vNumberD = item.FieldName;
            }
            else if (item.FieldType == "Number-P") {
                vControls += "<div id='" + item.FieldName + "'>";
                vControls += '<input id="' + item.FieldName + '1" type="text" name="Contract Value1" class=" f_inpt width40 NoCopyPaste" />to&nbsp;';
                vControls += '<input id="' + item.FieldName + '2" type="text" name="Contract Value1" class=" f_inpt width40 NoCopyPaste" />';
                vControls += "</div>";
                vNumberP = item.FieldName;
            }
            else if (item.FieldType == "Number-PD") {
                vControls += "<div id='" + item.FieldName + "'>";
                vControls += '<input id="' + item.FieldName + '1" type="text" name="Contract Value1" class=" f_inpt width40 NoCopyPaste" />to&nbsp;';
                vControls += '<input id="' + item.FieldName + '2" type="text" name="Contract Value1" class=" f_inpt width40 NoCopyPaste" />';
                vControls += "</div>";
                vNumberPD = item.FieldName;
            }
            else if (item.FieldType == "Yes/No") {

                vControls += "	<input type='radio' name='" + item.FieldName + "' value='Yes'>Yes ";
                vControls += "	<input type='radio' name='" + item.FieldName + "' checked value='No'>No";
            }
            vControls += '</div>';


            $("#" + idelvalue).append(vControls);


            if (IsStandard) {
                getstandardLookupValues(item.FieldName);
            }
            if (IsCustom) {
                bindPreDefinedValues(item.DefaultField, item.Description, item.FieldName);
            }
            if (IsCustomLookUp) {
                getCustomLookUp(item.ChoiceValues, item.FieldName);
            }
            //if (IsGetUser1st) {
            //    GetUserList(item.FieldName);
            //}

            if (vDate != "") {
                if (localStorage.AppDateFormat == null || localStorage.AppDateFormat == "" || localStorage.AppDateFormat == 'undefined') {
                    $("#" + vDate).dateRangePicker({ format: 'MM/DD/YYYY', alwaysOpen: false })
                }
                else {
                    var dateformate = localStorage.AppDateFormat.toLowerCase().slice(0, -2);
                    if (dateformate.toLowerCase() == "mm/dd/yy")
                        $("#" + vDate).dateRangePicker({ format: 'MM/DD/YYYY', alwaysOpen: false })
                    else if (dateformate.toLowerCase() == "dd/mm/yy")
                        $("#" + vDate).dateRangePicker({ format: 'DD/MM/YYYY', alwaysOpen: false })
                    else
                        $("#" + vDate).dateRangePicker({ format: 'MM/DD/YYYY', alwaysOpen: false })

                }
                $("#" + vDate).attr("readonly", "readonly");
                vDate = "";

            }

            if (vNumber != "") {
                allowOnlyNumberInInputBox(vNumber + "1");
                allowOnlyNumberInInputBox(vNumber + "2");
                vNumber == "";
            }
            if (vNumberD != "") {
                allowOnlyDecimalNumberInInputBox(vNumberD + "1");
                allowOnlyDecimalNumberInInputBox(vNumberD + "2");
                vNumberD == "";
            }
            if (vNumberP != "") {
                allowOnlyNumberInInputBox(vNumberP + "1");
                allowOnlyNumberInInputBox(vNumberP + "2");
                vNumberP == "";
            }
            if (vNumberPD != "") {
                allowOnlyDecimalNumberInInputBox(vNumberPD + "1");
                allowOnlyDecimalNumberInInputBox(vNumberPD + "2");
                vNumberPD == "";
            }
            //if (vCurrency != "") {
            //    if (vCurrencyDisplayStyle == '')
            //        getCurrencyDisplayStyle();
            //    else {
            //        if (vCurrencyDisplayStyle == "UK") {
            //            $("#" + vCurrency).autoNumeric();
            //        } else if (vCurrencyDisplayStyle == "CAN") {
            //            $("#" + vCurrency).autoNumeric({
            //                aSep: ' ',
            //                aDec: '.'
            //            });
            //        } else if (vCurrencyDisplayStyle == "EU") {
            //            $("#" + vCurrency).autoNumeric({
            //                aSep: '.',
            //                aDec: ','
            //            });
            //        } else if (vCurrencyDisplayStyle == "IND") {
            //            $("#" + vCurrency).autoNumeric({
            //                dGroup: '2',
            //            });
            //        }

            //        vCurrency == "";
            //    }
            //}

            if (vUser != "") {
                $("#" + vUser + "").chosen().trigger("chosen:updated");
                vUser = "";

            }
            if (vMultiDDL != "") {

                $("#" + vMultiDDL + "").chosen().trigger("chosen:updated");
                vMultiDDL = "";
            }

            if (vContracttype != "") {

                $("#" + vContracttype + "").chosen().trigger("chosen:updated");
                vContracttype = "";
            }
        }
    });

}
function createFilter(item, idelvalue, ideChoice) {
    var article = "";
    $(item).find('Field').each(function () {
        var vFieldName = $(this).find('FieldName').text();
        var vFieldDisplayName = $(this).find('FieldDisplayName').text();
        var vFieldType = $(this).find('FieldType').text();
        var vChoiceValues = $(this).find('ChoiceValues').length > 0 ? $(this).find('ChoiceValues').text() : "";
        var vDefaultField = $(this).find('DefaultField').length > 0 ? $(this).find('DefaultField').text() : "";
        var vDescription = $(this).find('Description').length > 0 ? $(this).find('Description').text() : "";
        var item = { 'FieldName': vFieldName, 'FieldDisplayName': vFieldDisplayName, 'FieldType': vFieldType, 'ChoiceValues': vChoiceValues, 'DefaultField': vDefaultField, 'Description': vDescription }

        if ($.inArray(item.FieldType, notRequiredSearchFieldType) == -1) {
            article += '<li><a href="javascript:void(0)"><input type="checkbox" value="' + item.FieldName + 'C" name="addFilter"><small style="padding: 5px;">' + item.FieldDisplayName + '</small></a></li>';
        }
    });
    if (article != "") {
        article += '<li><a class="aplay_Filter1" id="aFilterApply" onclick=ApplyFilter1("contractFilter") href="javascript:void(0)"><small>Apply</small></a></li>';
        $("#" + ideChoice).append(article);
    }
    else {
        $("#" + ideChoice).append("No fields setup.");

    }

}
function ShowHideBACA() {
    if (thisBusinessAreaName != "") {
        var bAli = $('input:checkbox[name="addFilter"][value="BusinessAreaC"]');
        var CAli = $('input:checkbox[name="addFilter"][value="ContractAreaC"]');
        if (bAli != null && typeof (bAli) != "undefined") {
            bAli.parent().parent().hide();
        }
        if (CAli != null && typeof (CAli) != "undefined") {
            CAli.parent().parent().hide();
        }
    }
    else {
        var bAli = $('input:checkbox[name="addFilter"][value="BusinessAreaC"]');
        var CAli = $('input:checkbox[name="addFilter"][value="ContractAreaC"]');
        if (bAli != null && typeof (bAli) != "undefined") {
            bAli.parent().parent().show();
        }
        if (CAli != null && typeof (CAli) != "undefined") {
            CAli.parent().parent().show();
        }
    }
}
function getstandardLookupValues(lookupvaluename) {
    $.ajax({
        url: '/Settings/GetStandardLookupValuesFieldName',
        type: 'Get',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: { lookupname: lookupvaluename },
        cache: false,
        headers: {
            'AntiReqVerificationToken': $("#forgeryToken").val()
        },
        // async: false,
        success: function (jsObject) {
            if (jsObject.Success) {
                jsObject = jsObject.Data;
                var article = '';
                var dataAll = JSON.parse(jsObject);
                var dataID = dataAll.lookupname;
                var data = dataAll.LookupTypes;
                if (data != null) {
                    $(data).each(function (i, item) {
                        article += "<option value='" + item.TypeName + "'>" + item.TypeName + "</option>";
                    });
                }
                else {
                    article += '<option  disabled="" value="No Items Found">No Items Found</option>';

                }
                $("#" + dataID).append(article);
                $("#" + dataID + "").chosen().trigger("chosen:updated");
            }
            else {
                var article = '';
                var dataID = lookupvaluename;
                article += '<option  disabled="" value="No Items Found">No Items Found</option>';
                $("#" + dataID).append(article);
                $("#" + dataID + "").chosen().trigger("chosen:updated");
            }
        },
        error: function (data) {
            var article = '';
            var dataID = lookupvaluename;
            article += '<option  disabled="" value="No Items Found">No Items Found</option>';
            $("#" + dataID).append(article);
            $("#" + dataID + "").chosen().trigger("chosen:updated");
        }
    });
    // return article;
}


function GetUserList() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        async: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (dataUser) {
            //var dataID = FieldName;
            if (dataUser != null) {
                $(dataUser).each(function (i, item) {
                    var sRowKey = item.RowKey;
                    var sUserName = item.UserName;
                    vUserList += '<option value="' + sUserName + '">' + sUserName + '</option>';
                });
            }
            else {
                vUserList += '<option  disabled="" value="No Items Found">No Items Found</option>';

            }
            //$("#" + dataID).append(vUserList);
            //$("#" + dataID + "").chosen().trigger("chosen:updated");
        },
        error:
            function (dataUser) {
                vUserList += '<option  disabled="" value="No Items Found">No Items Found</option>';
                //$("#" + dataID).append(vUserList);
                //$("#" + dataID + "").chosen().trigger("chosen:updated");
            }
    });
    return vUserList;
}
function getContractTypes() {

    var article = '';
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/contracttypes',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        async: false,
        success: function (data) {
            var datalength = data.length;
            for (var i = 0; i < datalength; i++) {
                var itemname = data[i].ContractType;
                article += "<option value='" + itemname + "'>" + itemname + "</option>";
            }
            if (article == '') {
                article += '<option  disabled="" value="No Items Found">No Items Found</option>';
            }
        },
        error: function (data) {
            article = '<option  disabled="" value="No Items Found">No Items Found</option>';
        }
    });

    return article;
}

function sortArrOfObjectsByParam(arrToSort) {
    arrToSort.sort(function (a, b) {
        var A = a.toUpperCase();
        var B = b.toUpperCase();
        return ((A < B) ? -1 : ((A > B) ? 1 : 0));
    });
    return arrToSort;
}


function bindPreDefinedValues(urlBind, fieldTitle, fieldName) {
    if (fieldName == "BusinessArea") {
        BAFlag = true;

    }
    else if (fieldName == "ContractArea") {
        CAFlag = true;
    }
    else {


        $.ajax({
            url: urlBind,
            type: 'GET',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            cache: false,
            success: function (data) {
                var article = '';
                var Value = [];
                var dataID = fieldName;
                if (data != null) {
                    $(data).each(function (i, item) {
                        if (fieldTitle == "ContractStatus") {
                            var cancelStatus = item[fieldTitle];
                            if (item[fieldTitle] != "" && item[fieldTitle] != null) {
                                if (item.ContractStatus == 'Cancelled' && item.ContractStage == 'Pipeline') {
                                    if (cancelStatus != "") {
                                        article += '<option value="' + item[fieldTitle] + '">' + item[fieldTitle] + '</option>';
                                    }
                                }

                                else {
                                    if (cancelStatus != "Cancelled") {
                                        article += '<option value="' + item[fieldTitle] + '">' + item[fieldTitle] + '</option>';
                                    }
                                }

                            }
                        }
                        else {
                            if (item[fieldTitle] != "" && item[fieldTitle] != null) {
                                article += '<option value="' + item[fieldTitle] + '">' + item[fieldTitle] + '</option>';
                            }
                        }
                    });
                }
                else {
                    article += '<option  disabled="" value="No Items Found">No Items Found</option>';

                }
                $("#" + dataID).append(article);
                $("#" + dataID + "").chosen().trigger("chosen:updated");
            },
            error:
                function (data) {
                    var article = "";
                    var dataID = fieldName;
                    article += '<option  disabled="" value="No Items Found">No Items Found</option>';
                    $("#" + dataID).append(article);
                    $("#" + dataID + "").chosen().trigger("chosen:updated");
                }
        });
    }
    // return article;
}

function GenerateCustumQuery(idDiv) {
    var vcustomquery = '';
    var vcustomqueryVal = [];
    var errorflag = false;
    $(".error").removeClass("error");
    $("#" + idDiv).find('.ToCloseSub:visible').each(function (index, loopelement) {
        var idEle = loopelement.id;
        idEle = removeLastChar(idEle, 'S');
        var typeEle = loopelement.getAttribute("data-type");
        if (typeEle == "Date") {
            if ($("#" + idEle).val() != '' && $("#" + idEle).val() != null) {
                if (localStorage.AppDateFormat == null || localStorage.AppDateFormat == "" || localStorage.AppDateFormat == 'undefined') {
                    vcustomquery += idEle + ":Date:" + $("#" + idEle).val().replace(" to ", "|") + ';';
                }
                else {
                    var dateformate = localStorage.AppDateFormat.toLowerCase().slice(0, -2);
                    if (dateformate.toLowerCase() == "mm/dd/yy") {
                        vcustomquery += idEle + ":Date:" + $("#" + idEle).val().replace(" to ", "|") + ';';
                    }
                    else if (dateformate.toLowerCase() == "dd/mm/yy") {
                        var dt = $.map($("#" + idEle).val().replace(" to ", ",").split(","), $.trim);
                        if (dt != null && typeof (dt) != "undefined") {
                            var start = dt.length > 0 ? ddmmTOmmdd(dt[0]) : "";
                            var end = dt.length > 1 ? ddmmTOmmdd(dt[1]) : "";
                            vcustomquery += idEle + ":Date:" + start + "|" + end + ';';
                        }
                    }

                    else
                        vcustomquery += idEle + ":Date:" + $("#" + idEle).val().replace(" to ", "|") + ';';

                }
            }
        }
        else if (typeEle == "Choice" || typeEle == "User" || typeEle == "Lookup" || typeEle == "Standard Lookup" || typeEle == "Custom Lookup" || typeEle == "Dropdown" || typeEle == "Multi Select" || typeEle == "Lookup (Multi Select)" || typeEle == "Multi- Choice (Dropdown)") {
            if ($("#" + idEle).val() != '' && $("#" + idEle).val() != null) {
                var multiChoicearr = $("#" + idEle).val();
                var vmultiChoice = '';
                $(multiChoicearr).each(function (i, item) {
                    if (vmultiChoice == '') {
                        vmultiChoice = item;
                    }
                    else {
                        vmultiChoice += "|" + item;
                    }
                });
                vcustomquery += idEle + ":StringMul:" + vmultiChoice + ';';
            }
        }
        else if (typeEle == "Single Line Text" || typeEle == "Multi Line Text") {
            if ($("#" + idEle).val() != '' && $("#" + idEle).val() != null) {
                vcustomquery += idEle + ":String:" + $("#" + idEle).val() + ';';
            }
        }
        else if (typeEle == "Number" || typeEle == "Number-P" || typeEle == "Number-D" || typeEle == "Number-PD" || typeEle == "Value / Financials" || typeEle == "Currency") {
            //if ($("#" + idEle).val() != '' && $("#" + idEle).val() != null) {
            //    vcustomquery += idEle + ":String:" + $("#" + idEle).val() + ';';
            //}
            //vcustomquery += idEle + ":String:" + $("#" + idEle).val() + ';';
            var val1 = 0;
            var val2 = 0;
            if ($("#" + idEle + "1").val() != '') {
                vcustomquery += idEle + ":Number:";
                vcustomquery += $("#" + idEle + "1").val();
                val1 = parseInt($("#" + idEle + "1").val());
                if ($("#" + idEle + "2").val() != '') {
                    vcustomquery += '|' + $("#" + idEle + "2").val() + ';';
                    val2 = parseInt($("#" + idEle + "2").val());
                }
                else {
                    if ($("#" + idEle + "1").val() != '') {
                        vcustomquery += ';';
                    }
                    val2 = -1;
                }
            }
            else {
                if ($("#" + idEle + "2").val() != '' && $("#" + idEle).val() != null) {
                    vcustomquery += idEle + ':Number:0|' + $("#" + idEle + "2").val() + ';';
                    val2 = parseInt($("#" + idEle + "2").val());
                }
            }
            if ((val1 == 0 && val2 == 0) || val2 == -1) {

            }
            else {
                if (val2 < val1) {
                    $("#" + idEle + "2").addClass("error");
                    errorflag = true;
                }
            }
        }
        else if (typeEle == "Yes/No") {
            if ($('input[name=' + idEle + ']:checked').val() != '' && $('input[name=' + idEle + ']:checked').val() != null) {
                vcustomquery += idEle + ":String:" + $('input[name=' + idEle + ']:checked').val() + ';';
            }
        }

    });
    vcustomqueryVal.push([errorflag, vcustomquery]);
    return vcustomqueryVal;
    //return vcustomquery;
}

function getCustomLookUp(ChoiceValues, fieldName) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/customlookupvaluedetails?lookupname=' + ChoiceValues,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        //async: false,
        success: function (data) {
            var article = '';
            var dataID = fieldName;
            var datalength1 = data.LookupFields.split(';');
            datalength1 = datalength1.sort();
            datalength1 = sortArrOfObjectsByParam(datalength1);
            var datalength = datalength1.length;
            for (var i = 0; i < datalength; i++) {
                var itemname = datalength1[i];
                article += "<option value='" + itemname + "'>" + itemname + "</option>";
            }
            if (article == '') {
                article += '<option  disabled="" value="No Items Found">No Items Found</option>';
            }
            $("#" + dataID).append(article);
            $("#" + dataID + "").chosen().trigger("chosen:updated");
        },
        error: function (data) {
            var dataID = fieldName;
            var article = '<option  disabled="" value="No Items Found">No Items Found</option>';
            $("#" + dataID).append(article);
            $("#" + dataID + "").chosen().trigger("chosen:updated");
        }
    });
}

$('.chosenmulti').on('chosen:showing_dropdown', function (evt, params) {
    $('.result-selected').css('display', 'none');
});

function ddmmTOmmdd(date) {
    try {
        var d = new Date(date.split("/").reverse().join("-"));
        var dd = ("0" + (d.getDate())).slice(-2);
        var mm = ("0" + (d.getMonth() + 1)).slice(-2);//d.getMonth() + 1;
        var yy = d.getFullYear();
        return (mm + "/" + dd + "/" + yy);
    } catch (ex) {

    }
}

function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$]/g, "\\$&");
}

//CounterParty Businessarea




function BindBusinessAreaPicker11() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/businessarea/entities',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            //if (localStorage.UserType.indexOf("Global Contract Owner") >= 0) {
            //    recursiveIteration11(data)
            //    $("#tbodyBusinessArea11").append(article11);
            //    if (article11 == "") {
            //        $("#tbodyBusinessArea11").append("<tr><td><p class='f_p-error'>No items found.</p></td></tr>");
            //    }
            //}
            //else {
            BindBusinessAreMenuCounterp(data);
            //}


        },
        error:
            function (data) {
            }
    });
}
var BusinessAreaAccessCounterp = [];


function BindBusinessAreMenuCounterp(data) {
    if (typeof (BusinessAreaAccess) == "undefined" || BusinessAreaAccess == null || BusinessAreaAccess.length == 0) {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users/' + localStorage.UserID + '/businessareapermission',
            type: 'GET',
            dataType: 'json',
            'Content-Type': 'application/json',
            cache: true,
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            success: function (entity) {
                var BAreaAccess = entity.BusinessArea + ";" + entity.BusinessAreaContribute + ";" + entity.OwnerOfBusinessAreas + ";" + entity.BusinessAreaRead;

                var newArray = BAreaAccess.split(';').filter(function (v) { return v !== '' }); // remove empty
                BusinessAreaAccessCounterp = newArray;

                /* Business Area Popup Start */

                recursiveIterationCounterp("", data)
                BindContractBusinessArea();

            },
            error:
                function (data) {
                }
        });

    }
    else {
        if (typeof (BusinessAreaAccess) == "object" && BusinessAreaAccess.length > 1) {
            BusinessAreaAccessCounterp = BusinessAreaAccess;
        }
        else
            BusinessAreaAccessCounterp.push(BusinessAreaAccess);


        recursiveIterationCounterp("", data)
        BindContractBusinessArea();

    }
}
var BusinessAreaPathRowKey = [];

function recursiveIterationCounterp(path, object) {
    if (object.ChildrenData.length != 0) {
        for (var i = 0; i < object.ChildrenData.length; i++) {
            var item = object.ChildrenData[i];
            var spath = '';
            if (path == '') {
                spath = item.BusinessAreaName;

            }
            else {
                spath = path + ' > ' + item.BusinessAreaName;

            }
            var additional = "";
            var found = $.grep(BusinessAreaAccessCounterp, function (n, ind) {
                return (n.indexOf(spath) == 0);
            });
            //var found = _.some(BusinessAreaAccessWithRead, function (value) {
            //    return value.indexOf(spath) != -1;
            //});
            if (found.length > 0 || localStorage.UserType.indexOf("Global Contract Owner") >= 0 || item.RowKey == "GenCA" || item.RowKey == "GenBA") {

                if (item.ParentBusinessAreaID == 0) {
                    BusinessAreaPathRowKey.push([spath, item.RowKey, item.BusinessAreaName, "Yes"]);
                } else {
                    BusinessAreaPathRowKey.push([spath, item.RowKey, item.BusinessAreaName, "No"]);
                }

                recursiveIterationCounterp(spath, object.ChildrenData[i])
            }
        }
    }
    //if (object.ChildrenData.length != 0) {
    //    BindRecBACounterp('', object);
    //}
}




function BindContractBusinessArea() {

    if (BAFlag) {
        var data = jQuery.grep(BusinessAreaPathRowKey, function (a) {
            return a[3] === "No";
        });
        var article = '';
        var Value = [];
        var dataID = "BusinessArea";
        if (data != null) {
            $(data).each(function (i, item) {
                if (item[2] != "" && item[2] != null && Value.indexOf(item[2]) == -1) {
                    Value.push(item[2]);
                    article += '<option value="' + item[2] + '">' + item[2] + '</option>';
                }
            });
        }
        else {
            article += '<option  disabled="" value="No Items Found">No Items Found</option>';

        }
        $("#" + dataID).empty();
        $("#" + dataID).append(article);
        $("#" + dataID + "").chosen().trigger("chosen:updated");
    }
    if (CAFlag) {
        var data = jQuery.grep(BusinessAreaPathRowKey, function (a) {
            return a[3] === "Yes";
        });
        var article = '';
        var Value = [];
        var dataID = "ContractArea";
        if (data != null) {
            $(data).each(function (i, item) {
                if (item[2] != "" && item[2] != null && Value.indexOf(item[2]) == -1) {
                    Value.push(item[2]);
                    article += '<option value="' + item[2] + '">' + item[2] + '</option>';
                }
            });
        }
        else {
            article += '<option  disabled="" value="No Items Found">No Items Found</option>';

        }
        $("#" + dataID).empty();
        $("#" + dataID).append(article);
        $("#" + dataID + "").chosen().trigger("chosen:updated");
    }
}

//Sridhar
$("#ddlKeywordMatch").change(function () {
    var selectedMatch = $(this).val();
    if (selectedMatch == "Exact Keyword")
        $("#imgbusinessarea").attr('title', 'Search for exact match.');
    else if (selectedMatch == "All Keyword")
        $("#imgbusinessarea").attr('title', 'Search for all keywords.');
    else if (selectedMatch == "Any Keyword")
        $("#imgbusinessarea").attr('title', 'Search for any match.');
});

function ClearSelectedFilters() {

    $('input:checkbox[name="addFilter"]').each(function () {
        if (this.checked) {
            var aFilter = this.value;
            aFilter = removeLastChar(aFilter, 'C');
            ClearSearchFilters($("#" + aFilter + "S")[0], true);
        }
    });


}

function Loading_View_trigger() {
    BindContractStatus();
    BindCounterpartyType();
    BindDocumentType();
    BindBusinessAreaPicker11()
    BindContractLabels();
}

//manoj
function getQueryStringFromValue(url, name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(url);
    return results == null ? url : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function Opendocinbrowser(docurl) {
    if (Checkbrowsernameandversion()) {
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
                    docurl = localStorage.SPHostUrl + "/_layouts/wopiframe.aspx?sourcedoc=" + docurl + "&action=default";
                } else {
                    docurl = decodeURIComponent(docurl);
                }
                window.open(docurl);
            }
        }
    } else {
        location = localStorage.SPHostUrl + "/_layouts/15/download.aspx?SourceUrl=" + docurl;
    }
}

function Checkbrowsernameandversion() {
    var Openinbrowser = true;
    //if (bowser.msie) {
    //    if (bowser.version == 10) {
    //        Openinbrowser = false;
    //    }
    //}
    return Openinbrowser;
}

function NavigateToAdvance() {
    location = "/General/AdvanceSearch?keyword=" + getParameterByName('keyword') + "&tabselected=" + getParameterByName('tabselected');
    //var vKeyword = getParameterByName('keyword');
    //vSelectedTab = getParameterByName('tabselected');
    //SearchResult?keyword=Testing&tabselected=Documents
}
//manoj

function changeScopeOptions(tabname) {

    if (tabname == "Contracts") {
        $('#scopeOptions').multiselect('loadOptions',
                         [
                            { name: 'Contract Title', value: 'ContractTitle', checked: true },
                            { name: 'Contract Record Number', value: 'ContractNumber', checked: false },
                            { name: 'Counterparty', value: 'Counterparty', checked: false },
                            { name: 'Project Name', value: 'Project', checked: false },
                            { name: 'Amendments', value: 'Amendments', checked: false },
                         ], true, true);
    }
    else if (tabname == "Documents") {
        $('select[multiple]').multiselect('loadOptions', [
            { name: 'Counterparty', value: 'Counterparty', checked: false },
            { name: 'Document Name', value: 'DocumentName', checked: true },
            { name: 'Document Content / Full-text', value: 'Document Content / Full-text', checked: false },
            { name: 'Template Name', value: 'TemplateName', checked: false }
        ], true, true);
    } else {
        $('#scopeOptions').multiselect('loadOptions',
                 [
                    { name: 'Counterparty Name', value: 'CounterpartyName', checked: true },
                    { name: 'Location', value: 'Location', checked: false },
                    { name: 'Contact Name', value: 'ContactName', checked: false },
                 ], true, true);
    }
}

$.fn.chosenDestroy = function () {
    $(this).show().removeClass('chzn-done')
    $(this).next().remove()

    return $(this);
}