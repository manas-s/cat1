$(document).ready(function () {
    localStorage.setItem("GlobalBusinessArea", "All");
    localStorage.setItem("GlobalBusinessAreaLocation", "All");
    localStorage.setItem("IsGeneralBusinessArea", "");
    CreateMyAlertList();
    if (typeof localStorage.eContractFeatures === "undefined")
        GetFeatures();
    if (typeof localStorage.AppAccountStatus === "undefined")
        GetAccountStatus();
    if (typeof localStorage.AppDateFormat === "undefined")
        GetApplicationDateFormat();

    $("#dvAlertDetails").dialog({
        autoOpen: false, closeText: "",
        width: "80%",
        title: "Alert",
        modal: true
    });
    $("#dvNotificationDetail").dialog({
        autoOpen: false, closeText: "",
        width: "60%",
        title: "Notification Detail",
        dialogClass: "popup_width100",
        modal: true,
        resizable: true,
        buttons: {
            Close: function () {
                $(this).dialog("close");
            }
        }
    });
});
var vSentNotification;
function CreateMyAlertList() {
    $("#alertList").html('');
    var action = 'Activity';
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/notifications/Users?userid=' + localStorage.UserName + '&dismissed=No&priority=&pagesize=10&startindex=1',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            if (data.length == 0) {
                $("#alertList").append('<p class="f_p-error">No items found.</p>');
            }
            else {
                vSentNotification = data;
                var datalenght = data.length;
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];
                    var sRowKey = item.RowKey;
                    var sCategory = item.Category;
                    var sNotificationTitle = item.NotificationTitle;
                    var sNotificationDate = moment(new Date(item.NotificationDate)).format('Do MMM');

                    var article = '<tr>';

                    article += '<td class="text" id="NotificationTitle" style="display:none;">' + sNotificationTitle + '</td>';
                    article += '<td class="text" id="NotificationID" style="display:none;">' + sRowKey + '</td>';

                    article += '<td class="text"><a href="javascript:void(0)" onclick="ViewAlertDetail(this)">' + sNotificationTitle + '<a></td>';
                    // article += '<td class="text"><a href="javascript:void(0)" onclick="ViewNotificationDetail(\"' + i + '\");">' + sNotificationTitle + '<a></td>';
                    article += '</tr>';

                    $("#alertList").append(article);
                }

            }
        },
        error: function () {
            $("#alertList").append('<p class="f_p-error">No items found.</p>');
        }
    });
}
function ViewNotificationDetail(id) {
    $("#tdNotificationText").html(vSentNotification[id].NotificationDescription);
    $("#tdNotificationSentTo").html(vSentNotification[id].UserID);
    $("#tdNotificationSentOn").html(moment(new Date(vSentNotification[id].NotificationDate)).format('Do MMM, h:mm A'));
    $("#dvNotificationDetail").dialog("open");
}
function contextMenuWork(action, el, pos) {

    switch (action) {
        case "view":
            {
                var notificationID = $(el).find("#NotificationID").text();
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/notifications?notificationid=' + notificationID,
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
                    }
                });

                $("#dvAlertDetails").dialog("open");
                break;
            }
        case "forward":
            {
                var notificationTitle = $(el).find("#NotificationTitle").text();
                var notificationID = $(el).find("#NotificationID").text();

                break;
            }
        case "dismiss":
            {
                var notificationTitle = $(el).find("#NotificationTitle").text();
                var notificationID = $(el).find("#NotificationID").text();
                swal({
                    title: '',
                    text: "Are you sure you want to <span style=\"font-weight:700\">dismiss '" + notificationTitle + "'</span>?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
   function (confirmed) {
       if (confirmed) {
           $.ajax({
               url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/notifications/' + notificationID + '?dismissed=Yes',
               type: 'PUT',
               dataType: 'json',
               headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
               cache: false,
               success: function (data) {

                   swal("", notificationTitle + "  Dismissed.");
                   CreateMyAlertList();
               }
           });
       }
       return;
   });

                break;
            }
    }
}

function ViewAlertDetail(el) {
    var notificationID = $(el).parent('td').parent('tr').find("#NotificationID").text();

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/notifications?notificationid=' + notificationID,
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
            $("#dvAlertDetails").dialog("open");
        }
    });
}


function GetAccountStatus() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/LicenseLimit',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        async: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (entity) {
            localStorage.AppAccountStatus = entity.Status;
        }
    });
}

function GetApplicationDateFormat() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/AccountSetting',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        //async: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            localStorage.AppDateFormat = data.DateFormat;
        },
        error: function (data) {
            localStorage.AppDateFormat = "MM/DD/YYYY";
        }
    });
}

function GetFeatures() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/feature',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        //async: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            localStorage.setItem("eContractFeatures", JSON.stringify(data));
            var vAccFeat = $.grep(data, function (n, i) {
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
        },
        error: function (data) {
            var vvvv = "";
        }
    });
}