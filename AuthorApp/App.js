/* Common app functionality */

var app = (function () {
    "use strict";

    var app = {};

    // Common initialization function (to be called from each page)
    app.initialize = function () {
        $('body').append(
            '<div id="notificationword-message" style="position:fixed; bottom: 0px;">' +
                '<div class="padding">' +
                    '<div id="notificationword-message-close"></div>' +
                    '<div id="notificationword-message-header"></div>' +
                    '<div id="notificationword-message-body"></div>' +
                '</div>' +
            '</div>');

        $('#notificationword-message-close').click(function () {
            $('#notificationword-message').hide();
        });


        // After initialization, expose a common notification function
        app.showNotification = function (header, text) {
            $('#notificationword-message-header').text(header);
            $('#notificationword-message-body').text(text);
            $('#notificationword-message').slideDown('fast');
        };
    };

    return app;
})();