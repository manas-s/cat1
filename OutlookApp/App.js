/* Common app functionality */
var app = (function () {
    "use strict";

    var app = {};

    // Common initialization function (to be called from each page)
    app.initialize = function () {
        $('body').append(
            '<div id="notification-message">' +
                '<div class="padding">' +
                    '<div id="notification-message-close"></div>' +
                    '<div id="notification-message-header"></div>' +
                    '<div id="notification-message-body"></div>' +
                '</div>' +
            '</div>');

        $('#notification-message-close').click(function () {
            $('#notification-message').hide();
        });


        // After initialization, expose a common notification function
        app.showNotification = function (header, text) {
            //$('#notification-message-header').text(header);
            $('#notification-message-body').text(text);
            $('#notification-message').slideDown('fast');
        };
    };

    return app;
})();

function Correspondence(contract) {
    window.location = "Correspondence.html";
}

function NewContract() {
    window.location = "NewContract.html";
}

function AddDocument(contract) {
    window.location = "AddDocument.html";
}

function AddCounterparty() {
    window.location = "AddCounterparty.html";
}

function AddContact() {
    window.location = "AddContact.html";
}

function StartApproval() {
    window.location = "StartApproval.html";
}

function StartReview() {
    window.location = "StartReview.html";
}

function StartShare() {
    window.location = "Share.html";
}

function Notifications() {
    window.location = "Notifications.html";
}

function Tasks() {
    window.location = "Tasks.html";
}

function SharepointOnline() {
    window.location = "Home.html";
    //window.open("/?SPHostUrl=" + localStorage.SPHostUrl);
}
function NavigateToURL(url) {
    window.open(url + "?SPHostUrl=" + localStorage.SPHostUrl);
}

function eContractsOnline() {
    window.open("/?SPHostUrl=" + localStorage.SPHostUrl);
}