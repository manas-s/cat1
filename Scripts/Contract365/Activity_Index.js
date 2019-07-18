$(document).ready(function () {
    if (typeof localStorage.GlobalBusinessAreaLocation != undefined) {
        if (localStorage.GlobalBusinessAreaLocation != "All") {
            $("#dashmain").attr("src", "/Content/images/icon/gen.png");
        } 
    }

    CreateCalender();
    CreateTodoList();
    CreateLogHistory();
    
    $("#dvBrowse").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Task",
        modal: true,
        buttons: {
            "OK": function () { SelectElement(); $(this).dialog("close"); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
    $("#viewMetadataDetail").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Detail",
        modal: true,
        buttons: {
            "Close": function () {
                $(this).dialog("close");
            }
        }
    });
});

var today = new Date();

function CreateCalender() {
    var vTitle = '';
    var vSubTitle = '';
    $.ajax({
       
        url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/milestones?assignto=' + localStorage.UserName + '&status=No',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'GlobalBusinessAreaLocation': localStorage.GlobalBusinessAreaLocation },
        cache: false,
        success: function (data) {
            $('div[id*=fullcal]').fullCalendar({
               
                header: {
                    left: '',
                    center: 'title',
                    right: 'prev,next'
                },
                aspectRatio: 1.95,
                contentHeight: 400,
                firstDay: 1,
                firstWeek: 2,
                weekMode: 'variable',
                editable: false,
                disableDragging: false,
                disableResizing: false,
                displayEventTime: false,
                time: false,
                events: $.map(data, function (item, i) {
                    vTitle = item.MilestoneTitle + ' [' + item.ContractTitle + ']';
                    vSubTitle = vTitle;
                    if (vTitle.length > 41)
                    { vSubTitle = vTitle.substring(0, 40) + '...'; }
                    var event = new Object();
                    event.id = item.RowKey;
                    event.start = new Date(item.MilestoneDate);
                    event.end = new Date(item.MilestoneDate);
                    event.title = vSubTitle;
                    event.alttitle = vTitle;
                    event.url = 'javascript:void(0);';
                    event.ImageType = 0;
                    if (new Date(item.MilestoneDate).setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)) {
                        event.backgroundColor = '#9dc456';
                    }
                    else if (new Date(item.MilestoneDate) < today) {
                        event.backgroundColor = '#cc6766';
                    }
                    else if (new Date(item.MilestoneDate) > today) {
                        event.backgroundColor = '#f0ad4e';
                    }
                    return event;
                }), eventRender: function (event, eventElement) {
                    if (event.ImageType) {
                        if (eventElement.find('span.fc-event-time').length) {
                            eventElement.find('span.fc-event-time').before($(GetImage(event.ImageType)));
                        } else {
                            eventElement.find('span.fc-event-title').before($(GetImage(event.ImageType)));
                        }
                    }
                    eventElement.attr('title', event.alttitle);
                    eventElement.attr('href', 'javascript:void(0);');
                    eventElement.attr('onclick', 'ViewMilestoneDetail("' + event.id + '");');
                },
                loading: function (bool) {
                    if (bool) $('#loading').show();
                    else {
                        $('#loading').hide();
                    }
                }
            });
            $('#loading').hide();
            $('div[id*=fullcal]').show();
        },
        error: function () {

        }
    });
}

function ViewMilestoneDetail(milestoneID) {
    $("#tblMetadataDetail").empty();
    $("#loadingPage").fadeIn();
    $.ajax({
        url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/milestones?milestoneid=' + milestoneID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        "Content-Type": "application/json",
        cache: false,
        success: function (milestoneentity) {
            var vDueDate = milestoneentity.MilestoneDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
            


            var vMetadata = '<ul class="pOp_Cont">';
            vMetadata += '<li><p>Contract Record Title</p><span class="PreserveSpace">' + milestoneentity.ContractTitle + '</span></li>';
            vMetadata += '<li><p>Milestone Title</p><span>' + milestoneentity.MilestoneTitle + '</span></li>';
            vMetadata += '<li><p>Milestone Type</p><span>' + milestoneentity.MilestoneType + '</span></li>';

            vMetadata += '<li><p>Description</p><span>';
            if (milestoneentity.MilestoneDescription != '') {
                vMetadata += milestoneentity.MilestoneDescription;
            }
            else { vMetadata += "-"; }
            vMetadata += '</span></li>';

            vMetadata += '<li><p>Milestone Date</p><span>' + vDueDate + '</span></li>';

            vMetadata += '<li><p>Milestone Owner</p><span>';
            if (milestoneentity.MilestoneOwner != '') {
                vMetadata += milestoneentity.MilestoneOwner;
            }
            else { vMetadata += "-"; }
            vMetadata += '</span></li>';

            vMetadata += '<li><p>Priority</p><span>';
            if (milestoneentity.Priority != '') {
                vMetadata += milestoneentity.Priority;
            }
            else { vMetadata += "-"; }
            vMetadata += '</span></li>';

            vMetadata += '<li><p>Milestone Completed</p><span>';
            if (milestoneentity.MilestoneCompleted != '') {
                vMetadata += milestoneentity.MilestoneCompleted;
            }
            else { vMetadata += "-"; }
            vMetadata += '</span></li>';

            vMetadata += '<li><p>Completed Date</p><span>';
            if (milestoneentity.MilestoneCompletedDate != null && milestoneentity.MilestoneCompletedDate != '') {
                var completedate = milestoneentity.MilestoneCompletedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                vMetadata += completedate;
            }
            else { vMetadata += "-"; }
            vMetadata += '</span></li>';

            vMetadata += '<li><p>Show In Calendar</p><span>';
            if (milestoneentity.ShowInCalendar != '') {
                vMetadata += milestoneentity.ShowInCalendar;
            }
            else { vMetadata += "-"; }
            vMetadata += '</span></li>';

            vMetadata += '<li><p>Send Reminder To</p><span>';
            if (milestoneentity.SendReminderTo != '') {
                vMetadata += milestoneentity.SendReminderTo;
            }
            else { vMetadata += "-"; }
            vMetadata += '</span></li>';

            vMetadata += '<li><p>Reminder 1</p><span>';
            if (milestoneentity.Reminder1 != '') {
                vMetadata += milestoneentity.Reminder1 + ' days prior';
            }
            else { vMetadata += "-"; }
            vMetadata += '</span></li>';

            vMetadata += '<li><p>Reminder 2</p><span>';
            if (milestoneentity.Reminder2 != '') {
                vMetadata += milestoneentity.Reminder2 + ' days prior';
            }
            else { vMetadata += "-"; }
            vMetadata += '</span></li>';

            vMetadata += '<li><p>Reminder 3</p><span>';
            if (milestoneentity.Reminder3 != '') {
                vMetadata += milestoneentity.Reminder3 + ' days prior';
            }
            else { vMetadata += "-"; }
            vMetadata += '</span></li>';

            vMetadata += '</ul>';





            $("#tblMetadataDetail").empty();
            $("#tblMetadataDetail").append(vMetadata);

            $("#loadingPage").fadeOut();
            $("#viewMetadataDetail").dialog("option", "title", "View Milestone");
            $("#viewMetadataDetail").dialog("open");
        }
    });
}

function CreateTodoList() {
    $("#todo").html('');
    $.ajax({
        url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Workflow/tasks?assignto=' + localStorage.UserName + '&status=In Progress&pageSize=5&startIndex=1',
      
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'GlobalBusinessAreaLocation': localStorage.GlobalBusinessAreaLocation },
        cache: false,
        success: function (data) {
            if (data.length == 0) {
                $("#todo").append('<p class="f_p-error">No Tasks Available</p>');
            }
            else {
                var datalenght = data.length;
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];
                    var sTaskTitle = item.TaskTitle;
                    var sRowKey = item.RowKey;
                    var sDuedate = '';

                    if (typeof item.DueDate != 'undefined' && item.DueDate != null) {
                        sDuedate = moment(new Date(item.DueDate)).format('Do MMM');
                    }

                    var article = '<li>';
                    article += '<p><a href="/Activity/TaskDetails?TaskID=' + sRowKey + '&WorkflowID=' + item.WorkflowID + '">' + sTaskTitle + '</a>';

                    if (sDuedate == "" || sDuedate == null) {
                        article += '</p></li>';
                    }
                    else {
                        article += '<small class="to-do-task-small">' + sDuedate + '</small></p></li>';
                    }


                    $("#todo").append(article);

                }
             
            }
        },
        error: function () {
            $("#todo").append('<p class="f_p-error">No Tasks Available</p>');
        }
    });
}

function GetImage(type) {
    if (type == 0) {
        return "<br/><img src = '/Content/Images/attendance.png' style='width:24px;height:24px'/><br/>"
    }
    else if (type == 1) {
        return "<br/><img src = '/Content/Images/not_available.png' style='width:24px;height:24px'/><br/>"
    }
    else
        return "<br/><img src = '/Content/Images/not_available.png' style='width:24px;height:24px'/><br/>"
}

function CreateLogHistory() {
    $.ajax({
        url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/activities/user/' + localStorage.UserName,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            if (data.length == 0) {
                $("#recentLogs").append('<p class="f_p-error">No Log Available</p>');
            }
            else {
                var datalenght = data.length;
                     for (var i = 0; i < datalenght; i++) {
                         var item = data[i];
                    if (i < 15) {
                        var sObject = item.Object;
                        var sActivity = item.Activity;
                        var sUserID = item.UserID;
                        var sTimestamp = moment(new Date(item.Timestamp)).format('Do MMM, h:mm A');

                        var article = '<li>';

                        article += '<p>' + sActivity;
                        article += '<a href="javascript:void(0)"></a>';
                        article += '<small>' + sTimestamp + '</small></p>';

                        if (sObject == "Contract") {
                            article += '<b class="status_green">' + sObject + '</b>';
                        }
                        else if (sObject == "Document") {
                            article += '<b class="status_pink">' + sObject + '</b>';
                        }
                        else {
                            article += '<b class="status_yellow">' + sObject + '</b>';
                        }
                        article += '</li>';

                        $("#recentLogs").append(article);
                    }
                    
                }
            }
            if (data.length > 15) {
                var article = '<table id="tblSeeAll"><tr><td class="right-float"><a href="javascript:void(0)" onclick="showalllogs();">See All Logs</a></td></tr>';
                $("#recentLogs").append(article);
            }
        },
        error:
            function (data) {
                $("#recentLogs").append('<p class="f_p-error">No Log Available</p>');
            }
    });
}

function showalllogs() {
    $("#tblSeeAll").html('<img src="../Content/Images/loading.gif"/>');
    $.ajax({
        url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/activities/user/' + localStorage.UserName,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $("#tblSeeAll").empty();
            if (data.length == 0) {
                $("#recentLogs").append('<p class="f_p-error">No Log Available</p>');
            }
            else {
                var datalenght = data.length;
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];
                    if (i > 15) {
                        var sObject = item.Object;
                        var sActivity = item.Activity;
                        var sUserID = item.UserID;
                        var sTimestamp = moment(new Date(item.Timestamp)).format('Do MMM, h:mm A');

                        var article = '<li>';

                        article += '<p>' + sActivity;
                        article += '<a href="javascript:void(0)"></a>';
                        article += '<small>' + sTimestamp + '</small></p>';

                        if (sObject == "Contract") {
                            article += '<b class="status_green">' + sObject + '</b>';
                        }
                        else if (sObject == "Document") {
                            article += '<b class="status_pink">' + sObject + '</b>';
                        }
                        else {
                            article += '<b class="status_yellow">' + sObject + '</b>';
                        }
                        article += '</li>';
                        $("#recentLogs").append(article);
                    }
                   
                }
            }
        },
        error:
            function (data) {
                $("#recentLogs").append('<p class="f_p-error">No Log Available</p>');
            }
    });
}

function CompleteTodo(cb) {
    var todoID = cb.id;
    $.ajax({
        async: false,
        url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/todos?todoid=' + todoID + '&status=Complete&username=' + localStorage.UserName,
        type: "PUT",
        dataType: "json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        "Content-Type": "application/json",
        success: function (data) {
         
            swal("", "Task Completed");
            CreateTodoList();
            var vParent = '';
            var vParentID = '';
            if (data.ContractID != null || data.ContractID != "") {
                vParent = 'Contract';
                vParentID = data.ContractID;
            }
            AddActivity("Update", "Task", todoID, vParent, vParentID, "'" + data.TodoTitle + "' completed.");
        },
        error: function (data) {
         
        }
    });
}

function AddActivity(vActionType, vObject, vObjectID, vParentObject, vParentObjectID, vActivity) {
    $.ajax({
        url:vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/activities',
        type: 'POST',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        data: {
            ActionType: vActionType,
            Object: vObject,
            ObjectID: vObjectID,
            ParentObject: vParentObject,
            ParentObjectID: vParentObjectID,
            UserID: localStorage.UserName,
            Activity: vActivity,

        },
        cache: false,
        success: function (person) {

        }
    });
}
