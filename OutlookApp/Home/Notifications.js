/// <reference path="../App.js" />

(function () {
    "use strict";

    // The Office initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {
            app.initialize();
        });
    };
})();

$(document).ready(function () {
    quickViewMyNotifications();
    $("#dvAlertDetails").dialog({
        autoOpen: false,
        closeText: "",
        width: "95%",
        title: "Alert Details",
        modal: true,
        
    });
    
});


function quickViewMyNotifications() {
    $("#loadingPage").fadeIn();
    $("#listNotifications").empty();
    $.ajax({
        url: '/api/accounts/' + localStorage.AccountID + '/notifications/UnViewed?userid=' + localStorage.UserName + '&pagesize=2000&startindex=1',
        type: 'GET',
        dataType: 'json',
        headers: {
            'eContracts-ApiKey': localStorage.APIKey
        },
        cache: false,
        success: function (tasks) {
            var datalenght = tasks.length;
            for (var i = 0; i < datalenght; i++) {
                if (i < 10) {
                    var item = tasks[i];
                    var sNotificationTitle = item.NotificationTitle;
                    var sRowKey = item.RowKey;
                    var vPriority = item.Priority;
                    var vPriorityIcon = '<img src="/Content/Images/priority_none.png" alt="None" title="None" style="width: 12px;margin-bottom: 2px;"/>';
                    if (vPriority == "High") {
                        vPriorityIcon = '<img src="/Content/Images/priority_high.png" alt="High" title="High" style="width: 12px;margin-bottom: 2px;"/>';
                    }
                    else if (vPriority == "Medium") {
                        vPriorityIcon = '<img src="/Content/Images/priority_medium.png" alt="Medium" title="Medium" style="width: 12px;margin-bottom: 2px;"/>';
                    }
                    else if (vPriority == "Low") {
                        vPriorityIcon = '<img src="/Content/Images/priority_low.png" alt="Low" title="Low" style="width: 12px;margin-bottom: 2px;"/>';
                    }

                    var vv = moment(new Date(item.NotificationDate));
                    var vTime = vv.fromNow();

                    var article = '<li>';
                    article += '<p>';
                    article += '<a href="javascript:void(0)" onclick="ViewAlertDetail(\'' + item.RowKey + '\');">' + sNotificationTitle + '</a>' + vPriorityIcon;
                    article += '<img src="/Content/Images/alert-close.png" onclick="DismissNotification(\'' + sRowKey + '\')" class="close-right" style="width: 12px;margin-bottom: 2px;">';
                    article += '</p> ';
                    article += '<div>' + vTime + '</div>';
                    article += '</li>';
                    $("#listNotifications").append(article);
                }

            }
            if (datalenght >= 10) {
            $("#compact-pagination").css('display', '');
            var morehtml = '<a href="/General/Alerts?SPHostUrl=' + localStorage.SPHostUrl + '" target="_blank">View More</a>';
            $("#compact-pagination").html(morehtml);
            }
            //$('#compact-pagination').pagination({
            //items: datalenght,
            //itemsOnPage: 5,
            //type: 'ul',
            //typeID: 'listNotifications',
            //row: 'li',
            //cssStyle: 'compact-theme',
            //resultcount: 'spResult'
            //});
            $("#loadingPage").fadeOut();
        },
        error: function () {
            $("#listNotifications").html('');
            $("#listNotifications").append('<p class="f_p-error">No items found.</p>');
            //$("#compact-pagination").css('display', 'none');
            $("#loadingPage").fadeOut();
        }
    });
}

function DismissNotification(notificationID) {
    // if (confirm("Are you sure to dismiss?")) {
    $("#loadingPage").fadeIn();
    $.ajax({
        url: '/api/accounts/' + localStorage.AccountID + '/notifications/' + notificationID + '?dismissed=Yes',
        type: 'PUT',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        cache: false,
        success: function (data) {
            $("#loadingPage").fadeOut();
            app.initialize();
            app.showNotification("", "Notification Dismissed.");
            quickViewMyNotifications();
        },
        error: function (status) {
            $("#loadingPage").fadeOut();
        }
    });
    //}
}

function ViewAlertDetail(notificationID) {
    $("#loadingPage").fadeIn();
    $(".popModal").css("display", "none");
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
            vNotificationDescription = vNotificationDescription.replace(/\n/g, "<br/>");
         
            $("#alertText").html(vNotificationDescription);
            $('#alertText a').attr('target', '_blank')
            $("#loadingPage").fadeOut();
            $("#dvAlertDetails").dialog("open");
        }
    });
}