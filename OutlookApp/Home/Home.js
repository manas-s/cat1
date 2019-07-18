/// <reference path="../App.js" />

(function () {
    "use strict";
    // The Office initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {
            app.initialize();
            displayItemDetails();
        });
    };

    // Displays the "Subject" and "From" fields, based on the current mail item
    function displayItemDetails() {
        localStorage.removeItem('selectedContract');
        localStorage.removeItem('AllContract');
        localStorage.removeItem('globalSelContracts');

        $("#loadingPage").fadeIn();
        var item = Office.context.mailbox.item;
        $('#noofcontact').text(item.to.length + item.cc.length + 1 + " contact(s) found.");
        //item.attachments.length;
        //$('#noofattachment').text(item.attachments[0].name);

        //ValidateUser(emailID);app.initialize();
        //app.initialize();
        //app.showNotification("", Office.context.mailbox.ewsUrl);
        if (typeof item.attachments == "undefined" || item.attachments.length <= 0) {

            $('#noofattachment').text("(0) attachment(s) found.");
            $("#liAttachment").css("display", "none");
            //app.initialize();
            //app.showNotification("", "Note: This feature is supported only in the Outlook web app.");
        } else {
            $("#liAttachment").css("display", "");
            $('#noofattachment').text(item.attachments.length + " attachment(s) found.");
        }
        var userProfile = Office.context.mailbox.userProfile;
        var emailID = userProfile.emailAddress;//"ajith_kumar@corevo.onmicrosoft.com";//
        emailID = emailID.toLowerCase();
        $('#name').text(userProfile.displayName);
        //if (typeof localStorage.UserName == "undefined" || localStorage.UserName == "") {
        ValidateUser(emailID);

        //Saved Correspondence
        //$("#liCorrespondence").html('<img src="../../Content/Images/icon/loading.gif"> Loading...');
        var vItemID = item.itemId.replace(/\+/g, "~");
        GetCorrespondenceContracts(vItemID);
        //Saved Documents
        var documentCount = 0;
        for (var i = 0; i < item.attachments.length; i++) {
            var additional = GetDocumentDetails(item.attachments[i].name);
            if (additional == true) {
                documentCount++;
            }
        }
        if (documentCount > 0) {
            var itemBoxLength = Office.context.mailbox.item.attachments.length;
            var htmlDoc = "(" + documentCount + "/" + itemBoxLength + ") Attachment(s) Uploaded.";
            $("#liAttachment").css("display", "");
            $('#noofattachment').text(htmlDoc);
        }

        //Saved Contacts
        var contactsCount = 0;
        var additional = GetContactDetails(item.from.emailAddress);
        if (additional == true) {
            contactsCount++;
        }
        for (var i = 0; i < item.to.length; i++) {
            var additional = GetContactDetails(item.to[i].emailAddress);
            if (additional == true) {
                contactsCount++;
            }
        }
        for (var i = 0; i < item.cc.length; i++) {
            var additional = GetContactDetails(item.cc[i].emailAddress);
            if (additional == true) {
                contactsCount++;
            }
        }

        if (contactsCount > 0) {
            var itemBoxLength = Office.context.mailbox.item.to.length + Office.context.mailbox.item.cc.length + 1;
            var htmlDoc = "(" + contactsCount + "/" + itemBoxLength + ") Contact(s) Saved.";
            $('#noofcontact').text(htmlDoc);
        }

        $("#loadingPage").fadeOut();

        //}
        //else {
        //    $("#tdLoading").css("display", "none");
        //    $("#tdContent").css("display", "");
        //    $("#tdWelcome").css("display", "");
        //}
    }
    var oUsereMail = "";
    function ValidateUser(office365emailid) {
        oUsereMail = office365emailid;
        //localStorage.AccountID = "3TQpMcWg";
        //localStorage.APIKey = "TIHdl7XziCrbGtZJdFAnwDqmFR2O+KXlnm7O2TTl1aVEmYUBZMQrh0+Cl58ZWBZCfS1nIxBB0YyCNZu8Wmj2fiKuH60gR7i+";
        //localStorage.SPHostUrl = "https://corevo.sharepoint.com/sites/Contract365/2.4Demo";
        //localStorage.UserName = "Ajith Kumar";
        //localStorage.UserTitle = "Ajith";
        //localStorage.UserType = "Global Contract Owner; Account Owner";
        //localStorage.OEmail = "ajith_kumar@corevo.onmicrosoft.com";
        //localStorage.UserID = "mB56oycj";
        //localStorage.UserName = "Sugumar R";
        //localStorage.UserTitle = "Sugumar";
        //localStorage.UserType = "Contract Area Administrator; Business Area Owner; Business User";
        //localStorage.OEmail = "sugumar_r@corevo.onmicrosoft.com";
        //localStorage.UserID = "4OAvQ6L5";
        //localStorage.OCRFeature = "Yes";
        //$("#tdLoading").css("display", "none");
        //$("#tdWelcome").css("display", "");
        //$("#tdContent").css("display", "");
        //$("#tdLoading").css("display", "none");
        //$("#tdWelcome").css("display", "");
        //$("#tdContent").css("display", "");
        $.ajax({
            url: '/api/mailservice/userdetail?office365emailid=' + oUsereMail,
            type: 'GET',
            dataType: 'json',
            cache: false,
            success: function (item) {
                localStorage.UserName = item.UserName;
                localStorage.AccountID = item.PartitionKey;
                localStorage.APIKey = item.ApiKey;
                localStorage.SPHostUrl = item.HostURL;
                localStorage.UserTitle = item.UserName;
                localStorage.UserType = item.UserType;
                localStorage.OEmail = item.O365EmailID;
                localStorage.UserID = item.RowKey;
                localStorage.OCRFeature = item.OCRFeature;
                $("#tdLoading").css("display", "none");
                $("#tdWelcome").css("display", "");
                $("#tdContent").css("display", "");
            },
            error: function (item) {
                localStorage.UserName = "";
                localStorage.AccountID = "";
                localStorage.APIKey = "";
                localStorage.SPHostUrl = "";
                localStorage.UserTitle = "";
                localStorage.OEmail = "";
                localStorage.UserID = "";
                localStorage.OCRFeature = "";
                $("#tdLoading").css("display", "none");
                $("#tdWelcome").css("display", "none");
                $("#tdContent").css("display", "none");
            }
        });
    }

    function getAttachmentToken() {
        if (serviceRequest.attachmentToken == "") {
            Office.context.mailbox.getCallbackTokenAsync(attachmentTokenCallback);
        }
    };
    function attachmentTokenCallback(asyncResult, userContext) {
        if (asyncResult.status === "success") {
            // Cache the result from the server.
            serviceRequest.attachmentToken = asyncResult.value;
            serviceRequest.state = 3;
            testAttachments();
        } else {
            showToast("Error", "Could not get callback token: " + asyncResult.error.message);
        }
    };

    function GetCorrespondenceContracts(itemid) {
        $.ajax({
            url: '/api/accounts/' + localStorage.AccountID + '/correspondence/contracts?itemid=' + itemid,
            type: 'GET',
            dataType: 'json',
            'Content-Type': 'application/json',
            cache: false,
            //async: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
            success: function (data) {
                var vContracts = "";
                var selCons = [];
                $(data).each(function (i, item) {
                    if (vContracts == "") {
                        vContracts = '<a style="font-size: 12px;margin: 0 0 0 5px;" href="/Contracts/ContractDetails?ContractID=' + item.ContractID + '" target="_blank" class="linkText1 PreserveSpace">' + item.ContractTitle + '</a>';
                    }
                    else {
                        vContracts += '; <a style="font-size: 12px;margin: 0;" href="/Contracts/ContractDetails?ContractID=' + item.ContractID + '" target="_blank" class="linkText1 PreserveSpace">' + item.ContractTitle + '</a>';
                    }
                    selCons.push(item.ContractID);
                });
                if (vContracts != "") {
                    $("#liCorrespondence").append("Saved to" + vContracts);
                    localStorage.globalSelContracts = selCons;
                }
            },
            error: function (data) {

            }
        });
    };

    function GetDocumentDetails(docname) {
        var vContracts = false;
        $.ajax({
            url: '/api/accounts/' + localStorage.AccountID + '/documents?docname=' + docname,
            type: 'GET',
            dataType: 'json',
            'Content-Type': 'application/json',
            cache: false,
            async: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
            success: function (data) {
                if (data.length > 0)
                    vContracts = true;


            },
            error: function (data) {

            }
        });
        return vContracts;
    };

    function GetContactDetails(emailid) {
        var vContracts = false;
        $.ajax({
            url: '/api/accounts/' + localStorage.AccountID + '/counterparty/contacts?emailid=' + emailid,
            type: 'GET',
            dataType: 'json',
            'Content-Type': 'application/json',
            cache: false,
            async: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            success: function (data) {
                if (data.length > 0)
                    vContracts = true;
            },
            error: function (data) {

            }
        });
        return vContracts;
    };
})();