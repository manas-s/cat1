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
    quickViewMyTasks();
    //$("#dvBrowse").dialog({
    //    autoOpen: false,
    //    width: "95%",
    //    title: "Task",
    //    modal: true,
    //    buttons: {
    //        "OK": function () { SelectElement(); $(this).dialog("close"); },
    //        Cancel: function () {
    //            $(this).dialog("close");
    //        }
    //    }
    //});

});

function quickViewMyTasks() {
    var vassignto = localStorage.UserName;
    $("#loadingPage").fadeIn();
    $.ajax({
        url: '/api/accounts/' + localStorage.AccountID + '/Workflow/tasks?assignto=' + localStorage.UserName + '&status=In Progress&pageSize=&startIndex=',
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
                    var sTaskTitle = item.TaskTitle;
                    var sRowKey = item.RowKey;
                    var sTodoType = item.TodoType;
                    var sInitiator = item.Initiator;
                    var sDueDate = 'Not Available';
                    if (item.DueDate != null) {
                        sDueDate = moment(new Date(item.DueDate)).format('Do MMM YYYY');
                    }

                    var article = '<li>';
                    article += '<p>';
                    article += '<div style="width:100%; float:left; display:block">';
                    article += '<a class="task_heading" href="/Activity/TaskDetails?TaskID=' + sRowKey + '&WorkflowID=' + item.WorkflowID + '&SPHostUrl=' + localStorage.SPHostUrl + '" target="_blank">' + sTaskTitle + '</a>';
                    article += '<span class="inprogress_task" style="float:right">In Progress</span>';
                    article += '</div>';
                    article += '' + sInitiator + '&nbsp;|&nbsp;' + sDueDate;
                    article += '</p> ';
                    article += '</li>';
                    $("#listActivity").append(article);
                }              

            }
            if (datalenght > 10) {
                $("#compact-pagination").css('display', '');
                var morehtml = '<a href="/Activity/Activity?SPHostUrl=' + localStorage.SPHostUrl + '" target="_blank">View More</a>';
                $("#compact-pagination").html(morehtml);
            }
            //$('#compact-pagination').pagination({
            //    items: datalenght,
            //    itemsOnPage: 5,
            //    type: 'ul',
            //    typeID: 'listActivity',
            //    row: 'li',
            //    cssStyle: 'compact-theme',
            //    resultcount: 'spResult'
            //});
            $("#loadingPage").fadeOut();
        },
        error: function () {
            $("#listActivity").html('');
            $("#listActivity").append('<p class="f_p-error">No items found.</p>');
            //$("#compact-pagination").css('display', 'none');
            $("#loadingPage").fadeOut();
        }
    });
}