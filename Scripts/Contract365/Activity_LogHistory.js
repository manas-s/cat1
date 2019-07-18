$(document).ready(function () {
    if (typeof localStorage.GlobalBusinessAreaLocation != undefined) {
        if (localStorage.GlobalBusinessAreaLocation != "All") {
            $("#dashmain").attr("src", "/Content/images/icon/gen.png");
        }
    }
    ApplyFilter();
    $("#txtDateFrom").datepicker({ onClose: function () { this.focus(); } });
    $("#txtDateTo").datepicker({ onClose: function () { this.focus(); } });
});
$('#btnClearFilter').click(function () {
    $("#txtDateFrom").val("");
    $("#txtDateTo").val("");
    $("#ddlLogType").val("0");
    ApplyFilter();
});
function CreateActivityList() {
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/activities',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            BindActivity(data);
        },
        error: function () {
            $("#recentLogs").html('');
            $("#recentLogs").append('<tr><td class="f_p-error">No Log Available</td></tr>');
            $('#compact-pagination').css("display", "none");
        }
    });
}

var listLogs = [];

function ApplyFilter() {
    $("#recentLogs").empty();
    $("#recentLogs").html('<tr><td><img src="../Content/Images/icon/loading.gif" style="height: 16px; width: 16px;"> </td></tr>');
    var logTypevalue = $("#ddlLogType").find('option:selected').val();
    var dateFrom = $("#txtDateFrom").val();
    var dateTo = $("#txtDateTo").val();
    
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/activities?objecttype='+'&actiontype=' + logTypevalue + '&fromdate=' + dateFrom + '&todate=' + dateTo,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            BindActivity(data);
            $('#compact-pagination').css("display", "");
        },
        error: function () {
            $("#recentLogs").html('');
            $("#recentLogs").append('<tr><td class="f_p-error">No Log Available</td></tr>');
            $('#compact-pagination').css("display", "none");
        }
    });
}

function BindActivity(activities)
{
    listLogs = activities;
    CreateRecentLogList(0);

    $('#compact-pagination').pagination({
        items: activities.length,
        itemsOnPage: 20,
        type: 'tbody',
        row: 'tr',
        typeID: 'recentLogs',
        cssStyle: 'compact-theme',
        listname: 'RecentLogs'
    });
   
}

function CreateRecentLogList(page) {
    var startIndex = page * 20;
    var endIndex = startIndex + 20;
    if (endIndex > listLogs.length) endIndex = listLogs.length;
    $("#spResult").html((startIndex+1) + '&nbsp;to&nbsp;' + endIndex + '&nbsp;of&nbsp;' + listLogs.length);
   
    $("#recentLogs").empty();
    $("#recentLogs").html('<tr><td><img src="../Content/Images/icon/loading.gif" style="height: 16px; width: 16px;"></td></tr>');
    var article = '';
    for (var j = startIndex; j < endIndex; j++) {
        var item = listLogs[j];
        var sObject = item.Object;
        var sActivity = item.Activity;
        var sUserID = item.UserID;
        var sContractTitle = "";
        sContractTitle = item.ContractTitle;
        var sTimestamp = moment(new Date(item.Timestamp)).format('MM/DD/YYYY h:mm A');

        if (sContractTitle != "") {
            article += '<tr><td><span class="logHis_Datetime">' + sTimestamp + '</span></td><td><b>' + sObject + '</b></td><td><span class="logHis_Activity PreserveSpace">' + sActivity + ' (' + sContractTitle + ')' + '</span></td><td> <span class="logHis_Datetime">' + sUserID + '</span></td></tr>';
        } else {
            article += '<tr><td><span class="logHis_Datetime">' + sTimestamp + '</span></td><td><b>' + sObject + '</b></td><td><span class="logHis_Activity">' + sActivity + '</span></td><td><span class="logHis_Datetime">' + sUserID + '</span></td></tr>';
        }
    }
    $("#recentLogs").html(article);
    
}