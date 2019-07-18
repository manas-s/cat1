var vTaskID = getParameterByName("TaskID");
var vWorkflowID = getParameterByName("WorkflowID");
var vAction = getParameterByName("Action");
var vWorkflowInitiator = "";
var vWorkflowParticipants = null;
var vAnyoneRejected = '';
var vNoOfWaiting = 0;
var vUserTaskPending = [];
var vUserTaskInprogress = [];
var DocDefaultView = "";
var RequiredComment = [];
var loggedInUserType = "";
var loggedInUserOwnerOfBA = "";
var vItem = "";
var vContID = "";
var vContractOwners = "";
//manoj
//For Contract Summary Sheet
var ContractArea = "";
//For Contract Summary Sheet
//manoj
var vWorkflowType = "";

$(document).ready(function () {
    getLoggedInUserType();
    getCurrencyDisplayStyle();
    BindWorkflowSettings();
    if (history.length == 1) {
        $("#backButton").css("display", "none");
    }
    GetTaskDetail();
    //CreateMilestoneList();
    //CreateTaskList();
    //BindPeople();
    var TaskpostTextarea = new nicEditor({ buttonList: ['bold', 'italic', 'underline', 'strikethrough', 'left', 'center', 'right', 'justify', 'ol', 'ul', 'fontSize', 'fontFamily', 'fontFormat', 'removeformat', 'hr', 'indent', 'outdent', 'link', 'unlink', 'forecolor', 'bgcolor', 'xhtml'] }).panelInstance('txtComment');
    var ContractCommentRemindTextarea = new nicEditor({ buttonList: ['bold', 'italic', 'underline', 'strikethrough', 'left', 'center', 'right', 'justify', 'ol', 'ul', 'fontSize', 'fontFamily', 'fontFormat', 'removeformat', 'hr', 'indent', 'outdent', 'link', 'unlink', 'forecolor', 'bgcolor', 'xhtml'] }).panelInstance('txtCommentRemind');
    var ContractChangeCommentTextarea = new nicEditor({ buttonList: ['bold', 'italic', 'underline', 'strikethrough', 'left', 'center', 'right', 'justify', 'ol', 'ul', 'fontSize', 'fontFamily', 'fontFormat', 'removeformat', 'hr', 'indent', 'outdent', 'link', 'unlink', 'forecolor', 'bgcolor', 'xhtml'] }).panelInstance('txtChangeComment');
    var ContractReassignCommentTextarea = new nicEditor({ buttonList: ['bold', 'italic', 'underline', 'strikethrough', 'left', 'center', 'right', 'justify', 'ol', 'ul', 'fontSize', 'fontFamily', 'fontFormat', 'removeformat', 'hr', 'indent', 'outdent', 'link', 'unlink', 'forecolor', 'bgcolor', 'xhtml'] }).panelInstance('txtReassignComment');
    var ContractCompleteCommentTextarea = new nicEditor({ buttonList: ['bold', 'italic', 'underline', 'strikethrough', 'left', 'center', 'right', 'justify', 'ol', 'ul', 'fontSize', 'fontFamily', 'fontFormat', 'removeformat', 'hr', 'indent', 'outdent', 'link', 'unlink', 'forecolor', 'bgcolor', 'xhtml'] }).panelInstance('txtCompleteComment');
    var ContractCommentCancelWorkflowTextarea = new nicEditor({ buttonList: ['bold', 'italic', 'underline', 'strikethrough', 'left', 'center', 'right', 'justify', 'ol', 'ul', 'fontSize', 'fontFamily', 'fontFormat', 'removeformat', 'hr', 'indent', 'outdent', 'link', 'unlink', 'forecolor', 'bgcolor', 'xhtml'] }).panelInstance('txtCommentCancelWorkflow');
    var ContractCommentStopWorkflowTextarea = new nicEditor({ buttonList: ['bold', 'italic', 'underline', 'strikethrough', 'left', 'center', 'right', 'justify', 'ol', 'ul', 'fontSize', 'fontFamily', 'fontFormat', 'removeformat', 'hr', 'indent', 'outdent', 'link', 'unlink', 'forecolor', 'bgcolor', 'xhtml'] }).panelInstance('txtCommentStopWorkflow');
    var ContractCommentRestartWorkflowTextarea = new nicEditor({ buttonList: ['bold', 'italic', 'underline', 'strikethrough', 'left', 'center', 'right', 'justify', 'ol', 'ul', 'fontSize', 'fontFamily', 'fontFormat', 'removeformat', 'hr', 'indent', 'outdent', 'link', 'unlink', 'forecolor', 'bgcolor', 'xhtml'] }).panelInstance('txtCommentRestartWorkflow');
    $('.nicEdit-panelContain').parent().width('99%');
    $('.nicEdit-panelContain').parent().next().width('99%');
    $('.nicEdit-main').width("99%");

    $("#dialogAddUser").dialog({
        autoOpen: false,
        closeText: "",
        width: "60%",
        title: "Change Participants",
        modal: true,
        buttons: {
            "OK": function () { SaveParticipants(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#viewMetadataDetail").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "View Metadata Detail",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#postComment").dialog({
        autoOpen: false,
        closeText: "",
        width: "60%",
        title: "Post Comment",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "OK": function () {
                PostComment();
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
    $("#pntOption").dialog({
        autoOpen: false,
        closeText: "",
        width: "60%",
        title: "Print",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "Print": function () {
                PostTaskDetails();
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
    $("#remindUser").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Remind User",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "OK": function () {
                RemindUser();
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#changeRequest").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Change Request",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "OK": function () {
                ChangeRequest();
            },
            Cancel: function () {
                $(this).dialog("close");
                var nicInstance = nicEditors.findEditor('txtChangeComment');
                nicInstance.setContent('');
                NicEditorPasteEvent();
            }
        },
        close: function () {
            var nicInstance = nicEditors.findEditor('txtChangeComment');
            nicInstance.setContent('');
            NicEditorPasteEvent();
            $("#errormsg_txtChangeComment").remove();

        }
    });

    $("#reassignTask").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Reassign Task",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "Submit": function () {
                ReassignTask();
            },
            Cancel: function () {
                $(this).dialog("close");
                var nicInstance = nicEditors.findEditor('txtReassignComment');
                nicInstance.setContent('');
                NicEditorPasteEvent();
            }
        },
        close: function () {
            var nicInstance = nicEditors.findEditor('txtReassignComment');
            nicInstance.setContent('');
            NicEditorPasteEvent();
            $("#errormsg_txtReassignComment").remove();

        }
    });

    $("#completeTask").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Complete Task",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "Submit": function () {
                CompleteTask();
            },
            Cancel: function () {
                $(this).dialog("close");
                var nicInstance = nicEditors.findEditor('txtCompleteComment');
                nicInstance.setContent('');
                NicEditorPasteEvent();
            }
        },
        close: function () {
            var nicInstance = nicEditors.findEditor('txtCompleteComment');
            nicInstance.setContent('');
            NicEditorPasteEvent();
            $("#errormsg_txtCompleteComment").remove();
        }
    });

    $("#cancelWorkflow").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Cancel Workflow",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "OK": function () {
                CancelWorkflow();
            },
            Cancel: function () {
                $(this).dialog("close");
            }

        },
        close: function () {
            $("#errormsg_txtCommentCancelWorkflow").remove();

        }
    });

    $("#stopWorkflow").dialog({
        autoOpen: false,
        closeText: "",
        width: "60%",
        title: "Stop Workflow",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "OK": function () {
                StopWorkflow();
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        close: function () {
            $("#errormsg_txtCommentStopWorkflow").remove();
        }
    });

    $("#restartWorkflow").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Restart Workflow",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "OK": function () {
                RestartWorkflow();
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        close: function () {
            $("#errormsg_txtCommentRestartWorkflow").remove();

        }
    });

    $("#showMSWordPopup").dialog({
        autoOpen: false,
        closeText: "",
        width: "40%",
        height: "auto",
        modal: true
    });


});

//*Harshitha
$(window).on('load', function () {
    $('.nicEdit-panelContain').parent().width('99%');
    $('.nicEdit-panelContain').parent().next().width('99%');
    $('.nicEdit-main').width('99%');
});
function GetTaskDetail() {
    $("#loadingPage").fadeIn();
    $("#toDo_btn").css("display", "none");
    $("#toDo_msg").css("display", "none");

    $("#ulWorkflowStatus").css("display", "none");
    $("#ulWorkflowStatusMenu").css("display", "");
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Workflow/taskdetail?taskid=' + vTaskID + "&workflowid=" + vWorkflowID,
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $("#postCommentLink").css("display", "");
            var vTaskDetail = data.TaskDetail;
            var vWorkflowDetail = data.WorkflowDetail;
            var vWorkflowStages = data.WorkflowStages;
            var vWorkflowTasks = data.WorkflowTasks;
            var vWorkflowHistory = data.WorkflowHistory;
            var SummaryText = (typeof (vWorkflowDetail.SendSummary) != "undefined" && vWorkflowDetail.SendSummary != null && vWorkflowDetail.SendSummary != "") ? vWorkflowDetail.SendSummary : "No";
            var actionsAccessible = (typeof loggedInUserType != 'undefined' && (loggedInUserType.indexOf('Global Contract Owner') >= 0 || (loggedInUserOwnerOfBA.indexOf(vWorkflowDetail.BusinessArea) >= 0 && loggedInUserType.indexOf('Business Area Owner') >= 0))) ? true : false;
            $("#hdSummaryStatus").text(SummaryText);
            if (vTaskID != "") {
                vWorkflowID = vTaskDetail.WorkflowID;
            }
            //else {
            //    var vFilterTask = $.grep(vWorkflowTasks, function (n, i) {
            //        return (n.Status == "In Progress" && n.AssignTo == localStorage.UserName);
            //    });
            //    if (vFilterTask.length > 0) {
            //        vTaskDetail = vFilterTask[0];
            //        vTaskID = vTaskDetail.RowKey;
            //    }
            //}
            if (vWorkflowDetail != null)
                vWorkflowType = vWorkflowDetail.WorkflowType;

            if (vWorkflowDetail != null && vWorkflowDetail.Object != "Requests") {
                if (vWorkflowDetail.Object == "Amendments") {
                    vContID = vWorkflowDetail.ParObjectID;
                }
                else if (vWorkflowDetail.Object == "Documents") {
                    vContID = vWorkflowDetail.ParObjectID;
                }
                else if (vWorkflowDetail.Object == "Contracts") {
                    vContID = vWorkflowDetail.ObjectID;
                }
                getContractStatus(vContID);
            }
            if (typeof (vTaskID) != "undefined" && vTaskID != null && vTaskID != "") {
                var vFilterTask = $.grep(vWorkflowTasks, function (n, i) {
                    return (n.RowKey == vTaskID);
                });
                if (vFilterTask.length > 0) {
                    vTaskDetail = vFilterTask[0];
                    vTaskID = vTaskDetail.RowKey;
                }
            }
            else {
                var vFilterTask = $.grep(vWorkflowTasks, function (n, i) {
                    return (n.Status == "In Progress" && n.AssignTo == localStorage.UserName);
                });
                if (vFilterTask.length > 0) {
                    vTaskDetail = vFilterTask[0];
                    vTaskID = vTaskDetail.RowKey;
                }
            }

            //var vObject = vWorkflowDetail.Object;
            //var vObjectID = vWorkflowDetail.ObjectID;
            //if (vWorkflowDetail.Object == "Documents") {
            //    if (vWorkflowDetail.ParObject == "Contracts") {
            //        vObject = "Contracts";
            //        vObjectID = vWorkflowDetail.ParObjectID;
            //    } else {
            //        vObject = "";
            //        vObjectID = "";
            //    }
            //}
            //BindPeople(vObject,vObjectID);
            vWorkflowInitiator = vWorkflowDetail.Initiator;
            vWorkflowParticipants = vWorkflowDetail.Participants.split(';');
            vWorkflowParticipants = $.map(vWorkflowParticipants, $.trim);
            $("#dvWorkflowStatus").html(vWorkflowDetail.Status);
            $("#dvWorkflowStatusMenu").html(vWorkflowDetail.Status);
            $("#liActionRestart").css("display", "none");
            if (vWorkflowDetail.Status == "Cancelled") {
                $("#dvWorkflowStatusMenu").parent().css("pointer-events", "none");
                $("#dvWorkflowStatus").parent().css("pointer-events", "none");
            } else {
                $("#dvWorkflowStatusMenu").parent().css("pointer-events", "");
                $("#dvWorkflowStatus").parent().css("pointer-events", "");
            }

            $("#toDoContenPost").css("display", "");
            if (vWorkflowInitiator == localStorage.UserName) {

            }
            if (vWorkflowDetail.Status == "In Progress") {
                if (vWorkflowInitiator == localStorage.UserName || actionsAccessible || vContractOwners.indexOf(localStorage.UserName) > -1) {
                    $("#liActionChange").css("display", "");
                    $("#liActionStop").css("display", "");
                    $("#liActionCancel").css("display", "");
                    $("#liActionRemind").css("display", "");
                }
            }
            else if (vWorkflowDetail.Status == "Cancelled") {
                $("#ulWorkflowStatusMenu").css("display", "none");
                $("#ulWorkflowStatus").css("display", "");
                $("#liPostComment").css("display", "none");
                $("#postCommentLink").css("display", "none");
            }
            else if (vWorkflowDetail.Status == "Stopped") {
                if (vWorkflowInitiator == localStorage.UserName || actionsAccessible || vContractOwners.indexOf(localStorage.UserName) > -1) {
                    $("#liActionRestart").css("display", "");
                    $("#liActionChange").css("display", "none");
                    $("#liActionStop").css("display", "none");
                    $("#liActionCancel").css("display", "");
                    $("#liActionRemind").css("display", "none");
                } else {
                    $("#ulWorkflowStatusMenu").css("display", "none");
                    $("#ulWorkflowStatus").css("display", "");
                }
                $("#liPostComment").css("display", "none");
                $("#postCommentLink").css("display", "none");
            }
            else {
                $("#ulWorkflowStatusMenu").css("display", "none");
                $("#ulWorkflowStatus").css("display", "");
            }

            if (vTaskID != "") {
                if (vTaskDetail.Status == "In Progress" && vTaskDetail.AssignTo == localStorage.UserName) {
                    var toDo_btn_help = '';
                    if (vTaskDetail.TaskType == "General" || vTaskDetail.TaskType == "Reassign" || vTaskDetail.TaskType == "Escalate") {
                        if (vWorkflowDetail.WorkflowType == "Contract Approval" || vWorkflowDetail.WorkflowType == "Request Approval" || vWorkflowDetail.WorkflowType == "Renewal Approval" || vWorkflowDetail.WorkflowType == "Amendment Approval") {
                            $("#btnComplete").css("display", "none");
                            $("#btnReject").css("display", "");
                            $("#btnActions").css("display", "");

                            if (vWorkflowDetail.WorkflowType == "Contract Approval") {
                                $('#btnApprove').prop('title', 'If you do not require any changes to the Contract Record, click on Approve to approve the Contract Record.');
                                $('#btnReject').prop('title', 'If you do not know why you have received this, or if you have major concerns with the Contract Record, click on Reject and add additional comments to explain the reason for rejection.');
                                $('#btnChange').prop('title', 'If you require changes to the Contract Record, click on Request for Change and add additional comments about the required changes.');
                                $('#btnReassign').prop('title', 'If you are not the correct user to approve the Contract Record, reassign the task to another user.');
                                $("#toDo_msg").css("display", "");
                                toDo_btn_help += 'Approve – If you do not require any changes to the Contract Record, click on Approve to approve the Contract Record.\n\n';
                                toDo_btn_help += 'Reject – If you do not know why you have received this, or if you have major concerns with the Contract Record, click on Reject and add additional comments to explain the reason for rejection.\n\n';
                                toDo_btn_help += 'Request for Change – If you require changes to the Contract Record, click on Request for Change and add additional comments about the required changes.\n\n';
                                toDo_btn_help += 'Reassign Task – If you are not the correct user to approve the Contract Record, reassign the task to another user.';
                            } else if (vWorkflowDetail.WorkflowType == "Request Approval") {
                                $('#btnApprove').prop('title', 'If you do not require any changes to the Request, click on Approve to approve the Request.');
                                $('#btnReject').prop('title', 'If you do not know why you have received this, or if you have major concerns with the Request, click on Reject and add additional comments to explain the reason for rejection.');
                                $('#btnChange').prop('title', 'If you require changes to the Request, click on Request for Change and add additional comments about the required changes.');
                                $('#btnReassign').prop('title', 'If you are not the correct user to approve the Request, reassign the task to another user.');

                                toDo_btn_help += 'Approve – If you do not require any changes to the Request, click on Approve to approve the Request.\n\n';
                                toDo_btn_help += 'Reject – If you do not know why you have received this, or if you have major concerns with the Request, click on Reject and add additional comments to explain the reason for rejection. \n\n';
                                toDo_btn_help += 'Request for Change – If you require changes to the Request, click on Request for Change and add additional comments about the required changes.\n\n';
                                toDo_btn_help += 'Reassign Task – If you are not the correct user to approve the Request, reassign the task to another user.';
                            }
                            else if (vWorkflowDetail.WorkflowType == "Amendment Approval") {
                                $('#btnApprove').prop('title', 'If you do not require any changes to the Amendment, click on Approve to approve the Amendment.');
                                $('#btnReject').prop('title', 'If you do not know why you have received this, or if you have major concerns with the Amendment, click on Reject and add additional comments to explain the reason for rejection.');
                                $('#btnChange').prop('title', 'If you require changes to the Amendment, click on Request for Change and add additional comments about the required changes.');
                                $('#btnReassign').prop('title', 'If you are not the correct user to approve the Amendment, reassign the task to another user.');

                                toDo_btn_help += 'Approve – If you do not require any changes to the Amendment, click on Approve to approve the Amendment.\n\n';
                                toDo_btn_help += 'Reject – If you do not know why you have received this, or if you have major concerns with the Amendment, click on Reject and add additional comments to explain the reason for rejection. \n\n';
                                toDo_btn_help += 'Request for Change – If you require changes to the Amendment, click on Request for Change and add additional comments about the required changes.\n\n';
                                toDo_btn_help += 'Reassign Task – If you are not the correct user to approve the Request, reassign the task to another user.';
                            }
                        }
                        else if (vWorkflowDetail.WorkflowType == "Document Review") {
                            $("#btnComplete").css("display", "none");
                            $("#btnReject").css("display", "none");
                            $("#btnApproveText").html('Reviewed');
                            $("#btnActions").css("display", "");


                            $('#btnApprove').prop('title', 'If you have reviewed the Document and do not require any changes, click on Reviewed.');
                            $('#btnChange').prop('title', 'If you require changes to the Document, click on Request for Change and add additional comments about the required changes.');
                            $('#btnReassign').prop('title', 'If you are not the correct user to approve the Document, reassign the task to another user.');

                            toDo_btn_help += 'Reviewed – If you have reviewed the Document and do not require any changes, click on Reviewed.\n\n';
                            toDo_btn_help += 'Request for Change – If you require changes to the Document, click on Request for Change and add additional comments about the required changes.\n\n';
                            toDo_btn_help += 'Reassign Task – If you are not the correct user to approve the Document, reassign the task to another user.';
                        }
                    }
                    else if (vTaskDetail.TaskType == "Change Request") {
                        $("#btnComplete").css("display", "");
                        $("#btnActions").css("display", "none");
                        $("#btnApprove").css("display", "none");
                        $("#btnReject").css("display", "none");
                        toDo_btn_help += 'Complete – Once you have made the requested changes, click on Complete. If you have not made the requested changes add additional comments and click on Complete.';
                    }
                    $("#toDo_btn").css("display", "");
                    $("#toDo_btn_help").attr("title", toDo_btn_help);
                }
                if (vTaskDetail.DueDate != null && vTaskDetail.DueDate != 'undefined')
                    $("#dueOn").text(" due on " + moment(new Date(vTaskDetail.DueDate)).format('Do MMM YYYY'));
            }

            $("#workflowTitle").text(vWorkflowDetail.WorkflowTitle);
            $("#createdBy").text(vWorkflowInitiator);
            $("#startDate").text(moment(new Date(vWorkflowDetail.StartDate)).format('Do MMM YYYY'));
            $(".openmenuDetails").contextMenu({ menu: 'dropdownMenu', leftButton: true }, function (action, el, pos) {
                contextMenuDetails(action, el, pos);
            });

            $("#dvParticipants").empty();
            var vUserStatus = "";
            var datalenght = vWorkflowStages.length;
            for (var i = 0; i < datalenght; i++) {
                var vWorkflowStage = vWorkflowStages[i];
                var assignTo = vWorkflowStage.Participants.split(';');
                assignTo = $.map(assignTo, $.trim);
                var taskImg = '<img src="/Content/images/task_parallal.png" title="Parallel" />';
                if (vWorkflowStage.Order.toLowerCase() == "serial") {
                    taskImg = '<img src="/Content/images/task_serial.png" title="Serial" />';
                }

                $.each(assignTo, function (index, value) {
                    if (value.trim() != '') {
                        if (vUserStatus != "") {
                            vUserStatus += '<li class="contraRigght_R_img">' + taskImg + '</li>';
                        }
                        var vFilterTask = $.grep(vWorkflowTasks, function (n, i) {
                            return (n.StageID == vWorkflowStage.StageID && n.AssignTo == value && n.TaskType == 'General' &&
                                (n.Status == 'Approved' || n.Status == 'Rejected' || n.Status == 'Reviewed' || n.Status == 'Cancelled' || n.Status == 'Stopped' || n.Status == 'In Progress'));
                        });
                        if (vFilterTask.length == 0) {
                            vFilterTask = $.grep(vWorkflowTasks, function (n, i) {
                                return (n.StageID == vWorkflowStage.StageID && n.AssignTo == value && n.TaskType == 'General');
                            });
                        }
                        if (vFilterTask.length > 0) {
                            vFilterTask.sort(function (x, y) {
                                var c = new Date(x.StartDate);
                                var d = new Date(y.StartDate);
                                return c - d;
                            });
                            var FlagRepeat = true;
                            var switchVar = vFilterTask[0].Status;
                            while (FlagRepeat) {
                                if (vFilterTask.length > 0) {
                                    switchVar = vFilterTask[0].Status;
                                    var vTaskIdForChngReq = vFilterTask[0].RowKey;
                                    switch (switchVar) {
                                        case "Cancelled":
                                            vUserStatus += '<li class="contraRigght_R"><span class="toDoContenLeft2 "><img src="/Content/images/Cancel_Task.png" style="cursor:default" title="' + vFilterTask[0].Status + '" /></span>' +
                                                                              '<span class="toDoContenRight1">' + vFilterTask[0].AssignTo + '<small>' + vFilterTask[0].Status + ' on ' + moment(new Date(vFilterTask[0].Timestamp)).format('Do MMM YYYY') + ' by ' + vWorkflowInitiator + '</small></span></li>';
                                            vFilterTask = $.grep(vWorkflowTasks, function (n, i) {
                                                return (n.StageID == vWorkflowStage.StageID && n.ChangeReqTaskID == vFilterTask[0].RowKey);
                                            });
                                            if (vFilterTask.length > 0) {
                                                vUserStatus += '<li class="contraRigght_R_img"><img src="/Content/images/task_change_request.png" title="Change Request" /></li>';
                                                vFilterTask.sort(function (x, y) {
                                                    var c = new Date(x.StartDate);
                                                    var d = new Date(y.StartDate);
                                                    return c - d;
                                                });
                                                FlagRepeat = true;
                                            }
                                            else {
                                                FlagRepeat = false;
                                            }
                                            break;
                                        case "Closed":
                                            vUserStatus += '<li class="contraRigght_R"><span class="toDoContenLeft2 "><img src="/Content/images/approved.png" style="cursor:default" title="Closed" /></span>' +
                                                                               '<span class="toDoContenRight1">' + vFilterTask[0].AssignTo + '<small>Closed on ' + moment(new Date(vFilterTask[0].CompletedDate)).format('Do MMM YYYY') + '</small></span></li>';
                                            vFilterTask = $.grep(vWorkflowTasks, function (n, i) {
                                                return (n.StageID == vWorkflowStage.StageID && n.ChangeReqTaskID == vFilterTask[0].RowKey);
                                            });
                                            if (vFilterTask.length > 0) {
                                                vUserStatus += '<li class="contraRigght_R_img"><img src="/Content/images/task_change_request.png" title="Change Request" /></li>';
                                                vFilterTask.sort(function (x, y) {
                                                    var c = new Date(x.StartDate);
                                                    var d = new Date(y.StartDate);
                                                    return c - d;
                                                });
                                                FlagRepeat = true;
                                            }
                                            else {
                                                FlagRepeat = false;
                                            }
                                            break;
                                        case "In Progress":
                                            vUserStatus += '<li class="contraRigght_R"><span class="toDoContenLeft2 "><img src="/Content/images/waitng-approval.png" style="cursor:default" title="Awaiting" /></span>' +
                                                                               '<span class="toDoContenRight1">' + vFilterTask[0].AssignTo + '<small>Assigned on ' + moment(new Date(vFilterTask[0].StartDate)).format('Do MMM YYYY') + '</small></span></li>';
                                            if (vUserTaskPending.indexOf(vFilterTask[0].AssignTo) == -1)
                                                vUserTaskPending.push(vFilterTask[0].AssignTo);
                                            if (vUserTaskInprogress.indexOf(vFilterTask[0].AssignTo) == -1)
                                                vUserTaskInprogress.push(vFilterTask[0].AssignTo);

                                            vFilterTask = $.grep(vWorkflowTasks, function (n, i) {
                                                return (n.StageID == vWorkflowStage.StageID && n.ChangeReqTaskID == vFilterTask[0].RowKey);
                                            });
                                            if (vFilterTask.length > 0) {
                                                vUserStatus += '<li class="contraRigght_R_img"><img src="/Content/images/task_change_request.png" title="Change Request" /></li>';
                                                vFilterTask.sort(function (x, y) {
                                                    var c = new Date(x.StartDate);
                                                    var d = new Date(y.StartDate);
                                                    return c - d;
                                                });
                                                FlagRepeat = true;
                                            }
                                            else {
                                                FlagRepeat = false;
                                            }

                                            break;
                                        case "Reviewed":
                                            vUserStatus += '<li class="contraRigght_R"><span class="toDoContenLeft2 "><img src="/Content/images/approved.png" style="cursor:default" title="Reviewed" /></span>' +
                                                                               '<span class="toDoContenRight1">' + vFilterTask[0].AssignTo + '<small>Reviewed on ' + moment(new Date(vFilterTask[0].CompletedDate)).format('Do MMM YYYY') + '</small></span></li>';

                                            vFilterTask = $.grep(vWorkflowTasks, function (n, i) {
                                                return (n.StageID == vWorkflowStage.StageID && n.ChangeReqTaskID == vFilterTask[0].RowKey);
                                            });
                                            if (vFilterTask.length > 0) {
                                                vUserStatus += '<li class="contraRigght_R_img"><img src="/Content/images/task_change_request.png" title="Change Request" /></li>';
                                                vFilterTask.sort(function (x, y) {
                                                    var c = new Date(x.StartDate);
                                                    var d = new Date(y.StartDate);
                                                    return c - d;
                                                });
                                                FlagRepeat = true;
                                            }
                                            else {
                                                FlagRepeat = false;
                                            }
                                            break;
                                        case "Rejected":
                                            vUserStatus += '<li class="contraRigght_R"><span class="toDoContenLeft2 "><img src="/Content/images/reject.png" style="cursor:default" title="Rejected" /></span>' +
                                                                             '<span class="toDoContenRight1">' + vFilterTask[0].AssignTo + '<small>Rejected on ' + moment(new Date(vFilterTask[0].CompletedDate)).format('Do MMM YYYY') + '</small></span></li>';

                                            vFilterTask = $.grep(vWorkflowTasks, function (n, i) {
                                                return (n.StageID == vWorkflowStage.StageID && n.ChangeReqTaskID == vFilterTask[0].RowKey);
                                            });
                                            if (vFilterTask.length > 0) {
                                                vUserStatus += '<li class="contraRigght_R_img"><img src="/Content/images/task_change_request.png" title="Change Request" /></li>';
                                                vFilterTask.sort(function (x, y) {
                                                    var c = new Date(x.StartDate);
                                                    var d = new Date(y.StartDate);
                                                    return c - d;
                                                });
                                                FlagRepeat = true;
                                            }
                                            else {
                                                FlagRepeat = false;
                                            }
                                            break;
                                        case "Approved":
                                            vUserStatus += '<li class="contraRigght_R"><span class="toDoContenLeft2 "><img src="/Content/images/approved.png" style="cursor:default" title="Approved" /></span>' +
                                                                              '<span class="toDoContenRight1">' + vFilterTask[0].AssignTo + '<small>Approved on ' + moment(new Date(vFilterTask[0].CompletedDate)).format('Do MMM YYYY') + '</small></span></li>';
                                            vFilterTask = $.grep(vWorkflowTasks, function (n, i) {
                                                return (n.StageID == vWorkflowStage.StageID && n.ChangeReqTaskID == vFilterTask[0].RowKey);
                                            });
                                            if (vFilterTask.length > 0) {
                                                vUserStatus += '<li class="contraRigght_R_img"><img src="/Content/images/task_change_request.png" title="Change Request" /></li>';
                                                vFilterTask.sort(function (x, y) {
                                                    var c = new Date(x.StartDate);
                                                    var d = new Date(y.StartDate);
                                                    return c - d;
                                                });
                                                FlagRepeat = true;
                                            }
                                            else {
                                                FlagRepeat = false;
                                            }
                                            break;
                                        case "Delegated":
                                            vUserStatus += '<li class="contraRigght_R"><span class="toDoContenLeft2 "><img src="/Content/images/delegated.png" style="cursor:default" title="Delegated" /></span>' +
                                                                           '<span class="toDoContenRight1">' + vFilterTask[0].AssignTo + '<small>Delegated on ' + moment(new Date(vFilterTask[0].Timestamp)).format('Do MMM YYYY') + '</small></span></li>';

                                            vUserStatus += '<li class="contraRigght_R_img">' + taskImg + '</li>';

                                            vFilterTask = $.grep(vWorkflowTasks, function (n, i) {
                                                return (n.StageID == vWorkflowStage.StageID && n.DelegatedTaskID == vFilterTask[0].RowKey);
                                            });
                                            if (vFilterTask.length > 0) {
                                                vFilterTask.sort(function (x, y) {
                                                    var c = new Date(x.StartDate);
                                                    var d = new Date(y.StartDate);
                                                    return c - d;
                                                });
                                            }
                                            FlagRepeat = true;
                                            break;
                                        case "Reassigned":
                                            vUserStatus += '<li class="contraRigght_R"><span class="toDoContenLeft2 "><img src="/Content/images/reassigned.png" style="cursor:default" title="Reassigned" /></span>' +
                                                                           '<span class="toDoContenRight1">' + vFilterTask[0].AssignTo + '<small>Reassigned on ' + moment(new Date(vFilterTask[0].CompletedDate)).format('Do MMM YYYY') + '</small></span></li>';

                                            vUserStatus += '<li class="contraRigght_R_img"><img src="/Content/Images/reassign.png" title="Reassign" /></li>';
                                            //vUserStatus += '<li class="contraRigght_R_img">' + taskImg + '</li>';

                                            vFilterTask = $.grep(vWorkflowTasks, function (n, i) {
                                                return (n.StageID == vWorkflowStage.StageID && n.ReassignTaskID == vFilterTask[0].RowKey);
                                            });
                                            if (vFilterTask.length > 0) {
                                                vFilterTask.sort(function (x, y) {
                                                    var c = new Date(x.StartDate);
                                                    var d = new Date(y.StartDate);
                                                    return c - d;
                                                });
                                            }
                                            FlagRepeat = true;
                                            break;
                                        case "Escalated":
                                            vUserStatus += '<li class="contraRigght_R"><span class="toDoContenLeft2 "><img src="/Content/Images/escalation.png" style="width:16px;height:16px;cursor:default" title="Escalated" /></span>' +
                                                                           '<span class="toDoContenRight1">' + vFilterTask[0].AssignTo + '<small>Escalated on ' + moment(new Date(vFilterTask[0].CompletedDate)).format('Do MMM YYYY') + '</small></span></li>';
                                            vUserStatus += '<li class="contraRigght_R_img"><img src="/Content/Images/escalate.png" title="Escalate" /></li>';

                                            //vUserStatus += '<li class="contraRigght_R_img">' + taskImg + '</li>';

                                            vFilterTask = $.grep(vWorkflowTasks, function (n, i) {
                                                return (n.StageID == vWorkflowStage.StageID && n.EscalatedTaskID == vFilterTask[0].RowKey);
                                            });
                                            if (vFilterTask.length > 0) {
                                                vFilterTask.sort(function (x, y) {
                                                    var c = new Date(x.StartDate);
                                                    var d = new Date(y.StartDate);
                                                    return c - d;
                                                });
                                            }
                                            FlagRepeat = true;
                                            break;
                                        case "Change Requested":
                                            vUserStatus += '<li class="contraRigght_R"><span class="toDoContenLeft2 "><img src="/Content/images/change_request.png" style="cursor:default" title="Change Requested" /></span>' +
                                                                             '<span class="toDoContenRight1">' + vFilterTask[0].AssignTo + '<small>Change Request on ' + moment(new Date(vFilterTask[0].CompletedDate)).format('Do MMM YYYY') + '</small></span></li>';
                                            //vUserStatus += '<li class="contraRigght_R_img">' + taskImg + '</li>';
                                            vUserStatus += '<li class="contraRigght_R_img"><img src="/Content/images/task_change_request.png" title="Change Request" /></li>';
                                            vFilterTask = $.grep(vWorkflowTasks, function (n, i) {
                                                return (n.StageID == vWorkflowStage.StageID && n.ChangeReqTaskID == vFilterTask[0].RowKey);
                                            });
                                            if (vFilterTask.length > 0) {
                                                vFilterTask.sort(function (x, y) {
                                                    var c = new Date(x.StartDate);
                                                    var d = new Date(y.StartDate);
                                                    return c - d;
                                                });
                                            }
                                            FlagRepeat = true;
                                            break;
                                        default:
                                            vUserStatus += '<li class="contraRigght_R"><span class="toDoContenLeft2 "><img src="/Content/images/stop.png" style="cursor:default" title="' + vFilterTask[0].Status + '" /></span>' +
                                                                           '<span class="toDoContenRight1">' + vFilterTask[0].AssignTo + '<small>' + vFilterTask[0].Status + ' on ' + moment(new Date(vFilterTask[0].Timestamp)).format('Do MMM YYYY') + '</small></span></li>';

                                            FlagRepeat = false;
                                            break;

                                    }

                                    //var vFilterChangeRequestedTask = $.grep(vWorkflowTasks, function (n, i) {
                                    //    return (n.StageID == vWorkflowStage.StageID && n.ChangeReqTaskID == vTaskIdForChngReq && n.Status != "In Progress");
                                    //});

                                    //if (vFilterChangeRequestedTask.length > 0) {
                                    //    vFilterChangeRequestedTask.sort(function (x, y) {
                                    //        var c = new Date(x.StartDate);
                                    //        var d = new Date(y.StartDate);
                                    //        return c - d;
                                    //    });
                                    //    var iChangeRequestedTaskCount = vFilterChangeRequestedTask.length;
                                    //    for (var iChangeRequestedTask = 0; iChangeRequestedTask < iChangeRequestedTaskCount; iChangeRequestedTask++) {
                                    //        var item = vFilterChangeRequestedTask[iChangeRequestedTask];
                                    //        if (!FlagRepeat)
                                    //            vUserStatus += '<li class="contraRigght_R_img"><img src="/Content/images/task_change_request.png" title="Change Request" /></li>';

                                    //        vUserStatus += '<li class="contraRigght_R"><span class="toDoContenLeft2 "><img src="/Content/images/approved.png" style="cursor:default" title="Closed" /></span>' +
                                    //                                           '<span class="toDoContenRight1">' + item.AssignTo + '<small>Closed on ' + moment(new Date(item.CompletedDate)).format('Do MMM YYYY') + '</small></span></li>';

                                    //        if (FlagRepeat)
                                    //            vUserStatus += '<li class="contraRigght_R_img"><img src="/Content/images/task_change_request.png" title="Change Request" /></li>';
                                    //    }
                                    //}

                                }
                                else {
                                    FlagRepeat = false;
                                }

                            }
                        }
                        else {
                            vUserStatus += '<li class="contraRigght_R"><span class="toDoContenLeft2 "></span>' +
                                    '<span class="toDoContenRight1">' + value + '<small>Unassigned</small></span></li>';
                        }
                    }
                });
                if (('Stage ' + vWorkflowStage.StageID) == vWorkflowStage.StageTitle && vWorkflowStage.StageTitle.indexOf('Stage ') > -1)
                    $("#dvParticipants").append('<span class="documentsLeft width80">' + vWorkflowStage.StageTitle + '</span><span class="documentsRight width20 text_align_right">' + vWorkflowStage.Status + '</span>');
                else
                    $("#dvParticipants").append('<span class="documentsLeft width80">Stage ' + vWorkflowStage.StageID + ': ' + vWorkflowStage.StageTitle + '</span><span class="documentsRight width20 text_align_right">' + vWorkflowStage.Status + '</span>');
                $("#dvParticipants").append('<br/><ul>' + vUserStatus + '</ul><br/>');
                vUserStatus = "";

                $("#ddlSendToRemind").chosen();
            }
            if (vWorkflowDetail.WorkflowType == "Contract Approval" || vWorkflowDetail.WorkflowType == "Renewal Approval") {
                //$("#bTaskSummary").html('Contract Record Summary');
                $("#bTaskSummary").html('');
                if (vWorkflowDetail.IsSummaryDisplayedInWorkflow == "Yes") {
                    $("#contractdefaultsummary").css("display", "");
                    $("#approvalsheetsummary").css("display", "");
                    $("#approvalsheetsummary").parent().css("display", "");
                    BindContractDetails(vWorkflowDetail.ObjectID);
                    BindApprovalSheetDetails(vWorkflowDetail.ObjectID, vWorkflowDetail.ContractApprovalSheetName);
                }
                else {
                    $("#contractdefaultsummary").css("display", "");
                    $("#approvalsheetsummary").css("display", "none");
                    $("#approvalsheetsummary").parent().css("display", "none");
                    BindContractDetails(vWorkflowDetail.ObjectID);
                }
                if ((vWorkflowDetail.SummaryTempDetails != null && vWorkflowDetail.SummaryTempDetails != "" && typeof (vWorkflowDetail.SummaryTempDetails) != "undefined") || (vWorkflowDetail.SummaryAdditionalDocs != null && vWorkflowDetail.SummaryAdditionalDocs != "" && typeof (vWorkflowDetail.SummaryAdditionalDocs) != "undefined")) {
                    $("#dvAdditionalInformation").css("display", "");
                    if (vWorkflowDetail.SummaryTempDetails != null && vWorkflowDetail.SummaryTempDetails != "" && typeof (vWorkflowDetail.SummaryTempDetails) != "undefined") {
                        vWorkflowDetail.SummaryTempDetails = replaceamp(vWorkflowDetail.SummaryTempDetails);
                        var xmlDoc = $.parseXML(replacetoamp(vWorkflowDetail.SummaryTempDetails));
                        var $xml = $(xmlDoc);
                        var $apptempdocs = $xml.find("Metadata");
                        var apptemodoc = "";

                        //manoj
                        if (DocDefaultView != null && DocDefaultView != "") {
                            docdefaultview(ContractArea);
                        }
                        //manoj
                        $apptempdocs.each(function () {
                            if ($(this).find("DocumentURL").text() != "") {
                                //manoj
                                var IsValidOfficeDocument_Summary = false;
                                var URL_Summary = $(this).find("DocumentURL").text();
                                var vRawURLDoc_Summary = "";
                                if (URL_Summary.indexOf(".doc") >= 0 || URL_Summary.indexOf(".ppt") >= 0 || URL_Summary.indexOf(".xls") >= 0 || URL_Summary.indexOf(".dotx") >= 0) {
                                    vRawURLDoc_Summary = URL_Summary;
                                    //vURL = localStorage.SPHostUrl + "/_layouts/15/WopiFrame.aspx?sourcedoc=" + vURL + "&action=default";
                                    IsValidOfficeDocument = true;
                                }
                                //manoj

                                apptemodoc += '<div class="width100">';
                                if (DocDefaultView == "WordClient" && IsValidOfficeDocument) {
                                    apptemodoc += '<a href="javascript:void(0);" onclick="viewdocinword(\'' + vRawURLDoc_Summary + '\')" class="linkText">' + $(this).find("DocumentName").text() + '</a><a href="javascript:void(0);" onclick="viewdocinword(\'' + vRawURLDoc_Summary + '\')" title="View Document" class="linkText"><img src="/Content/Images/external_link.png" id="newTabImage"></a>';//ENH 1  Minor Enhancement Specs-Rahul
                                } else {

                                    apptemodoc += '<a href="javascript:void(0);" data-value="' + encodeURIComponent(URL_Summary) + '"  onclick="Opendocinbrowser(\'' + encodeURIComponent(URL_Summary) + '\')"  title="' + $(this).find("DocumentName").text() + '">' + $(this).find("DocumentName").text() + '</a> <a href="javascript:void(0);" data-value="' + encodeURIComponent(URL_Summary) + '"  onclick="Opendocinbrowser(\'' + encodeURIComponent(URL_Summary) + '\')"  title="' + $(this).find("DocumentName").text() + '"><img src="/Content/Images/external_link.png" ></a>';
                                }
                                //apptemodoc += '<a href="' + $(this).find("DocumentURL").text() + '"  target="_blank"   class="linkText">' + $(this).find("DocumentName").text() + '</a><a href="' + $(this).find("DocumentURL").text() + '"  target="_blank" title="View Document" class="linkText" style="margin-left: 5px !important;"><img src="/Content/Images/external_link.png" ></a>';
                                apptemodoc += '</div>';
                            }
                            else {
                                apptemodoc += '<div class="width100">';
                                apptemodoc += $(this).find("DocumentName").text();
                                apptemodoc += '</div>';
                            }
                        });
                        $("#spnapprovaltempdoc").html(apptemodoc);
                    }
                    if (vWorkflowDetail.SummaryAdditionalDocs != null && vWorkflowDetail.SummaryAdditionalDocs != "" && typeof (vWorkflowDetail.SummaryAdditionalDocs) != "undefined") {
                        vWorkflowDetail.SummaryAdditionalDocs = replaceamp(vWorkflowDetail.SummaryAdditionalDocs);
                        var xmlDoc = $.parseXML(replacetoamp(vWorkflowDetail.SummaryAdditionalDocs));
                        var $xml = $(xmlDoc);
                        var $apptempdocs = $xml.find("Metadata");
                        var apptemodoc = "";
                        if ($apptempdocs.length > 0) {
                            if (DocDefaultView != null && DocDefaultView != "") {
                                docdefaultview(ContractArea);
                            }
                            $apptempdocs.each(function () {
                                //manoj
                                var IsValidOfficeDocument_Summary = false;
                                var URL_Summary = $(this).find("DocumentURL").text();
                                var vRawURLDoc_Summary = "";
                                if (URL_Summary.indexOf(".doc") >= 0 || URL_Summary.indexOf(".ppt") >= 0 || URL_Summary.indexOf(".xls") >= 0 || URL_Summary.indexOf(".dotx") >= 0) {
                                    vRawURLDoc_Summary = URL_Summary;
                                    //vURL = localStorage.SPHostUrl + "/_layouts/15/WopiFrame.aspx?sourcedoc=" + vURL + "&action=default";
                                    IsValidOfficeDocument = true;
                                }
                                //manoj

                                apptemodoc += '<div class="width100" style="margin-bottom: 8px;">';
                                if (DocDefaultView == "WordClient" && IsValidOfficeDocument) {
                                    apptemodoc += '<a href="javascript:void(0);" onclick="viewdocinword(\'' + vRawURLDoc_Summary + '\')" class="linkText">' + $(this).find("DocumentName").text() + '</a><a href="javascript:void(0);" onclick="viewdocinword(\'' + vRawURLDoc_Summary + '\')" title="View Document" class="linkText"><img src="/Content/Images/external_link.png" id="newTabImage"></a>';//ENH 1  Minor Enhancement Specs-Rahul
                                } else {
                                    apptemodoc += '<a href="javascript:void(0);" data-value="' + encodeURIComponent(URL_Summary) + '"  onclick="Opendocinbrowser(\'' + encodeURIComponent(URL_Summary) + '\')"  title="' + $(this).find("DocumentName").text() + '">' + $(this).find("DocumentName").text() + '</a> <a href="javascript:void(0);" data-value="' + encodeURIComponent(URL_Summary) + '"  onclick="Opendocinbrowser(\'' + encodeURIComponent(URL_Summary) + '\')"  title="' + $(this).find("DocumentName").text() + '"><img src="/Content/Images/external_link.png" ></a>';
                                    //apptemodoc += '<a href="' + URL_Summary + '" target="_blank" class="linkText">' + $(this).find("DocumentName").text() + '</a> <a href="' + URL_Summary + '" target="_blank" title="View Document" class="linkText" style="margin-left: 5px !important;"><img src="/Content/Images/external_link.png" ></a>';//ENH 1  Minor Enhancement Specs-Rahul
                                }
                                //apptemodoc += '<a href="' + $(this).find("DocumentURL").text() + '"  target="_blank"   class="linkText">' + $(this).find("DocumentName").text() + '</a><a href="' + $(this).find("DocumentURL").text() + '"  target="_blank" title="View Document" class="linkText" style="margin-left: 5px !important;"><img src="/Content/Images/external_link.png" ></a>';
                                apptemodoc += '</div>';
                            });
                        }
                        else {
                            apptemodoc += '<div class="width100" style="margin-bottom: 8px;">';
                            apptemodoc += '-'
                            apptemodoc += '</div>';
                        }
                        $("#spnapprovaladditionaldocs").html(apptemodoc);
                    }
                    else {
                        var apptemodoc = "";
                        apptemodoc += '<div class="width100" style="margin-bottom: 8px;">';
                        apptemodoc += '-'
                        apptemodoc += '</div>';
                        $("#spnapprovaladditionaldocs").html(apptemodoc);
                    }



                }
                else {
                    $("#dvAdditionalInformation").css("display", "none");
                }


            } else if (vWorkflowDetail.WorkflowType == "Document Review") {
                //$("#bTaskSummary").html('Document(s) Summary');
                $("#bTaskSummary").html('');
                $("#approvalsheetsummary").css("display", "none");
                $("#approvalsheetsummary").parent().css("display", "none");
                GetDocuments(vWorkflowDetail.ObjectID);
            } else if (vWorkflowDetail.WorkflowType == "Request Approval") {
                $("#approvalsheetsummary").css("display", "none");
                $("#approvalsheetsummary").parent().css("display", "none");
                //$("#bTaskSummary").html('Request Summary');
                $("#bTaskSummary").html('');
                BindRequestDetails(vWorkflowDetail.ObjectID);
            } else if (vWorkflowDetail.WorkflowType == "Amendment Approval") {
                $("#approvalsheetsummary").css("display", "none");
                $("#approvalsheetsummary").parent().css("display", "none");
                //$("#bTaskSummary").html('Amendment Summary');
                $("#bTaskSummary").html('');
                BindAmendmentDetails(vWorkflowDetail.ObjectID);
            }

            $("#listTaskComments").empty();
            datalenght = vWorkflowHistory.length;
            $("#totComments").html("(" + datalenght + ")");
            for (var i = 0; i < datalenght; i++) {
                var item = vWorkflowHistory[i];
                var vTime = '';
                if (typeof (item.ModifiedDate) != "undefined" && item.ModifiedDate != null && item.ModifiedDate != "")
                    vTime = moment(new Date(item.ModifiedDate)).format('MMMM Do YYYY, h:mm A');
                else if (typeof (item.CreatedDate) != "undefined" && item.CreatedDate != null && item.CreatedDate != "")
                    vTime = moment(new Date(item.CreatedDate)).format('MMMM Do YYYY, h:mm A');
                else
                    vTime = moment(new Date(item.Timestamp)).format('MMMM Do YYYY, h:mm A');
                var article = '<li>';
                if (item.Title.indexOf('~') > -1) {
                    article += '<b class="color_lightgrey font_12 float_left block100">' + item.Title.split('~')[0] + ' on ' + vTime + '<br /><span style="padding-top: 10px;padding-bottom: 10px;">' + item.Title.split('~')[1] + ' on ' + vTime + '</span>';
                    article += '</b>';
                }
                else {
                    var vTitle = item.Title;
                    if (vTitle[vTitle.length - 1] === ".")
                        vTitle = vTitle.slice(0, -1);
                    article += '<b class="color_lightgrey font_12 block100">' + vTitle + ' on ' + vTime;
                    article += '</b>';
                }

                if (item.Description != '') {
                    article += '<b class="color_lightgrey font_12 float_left" style="margin-right: 7px;">Comment: ';
                    article += '</b>';
                    article += '<div class="taskcomment" style="font-size:12px !important;"><span>' + item.Description + '</span>';
                    if (item.User == localStorage.UserName && item.Type == "Comment")
                        article += '<img src="../Content/Images/edit-quick.png" class="margin-left-5" onclick="GetCommentDetail(\'' + item.RowKey + '\')" /><img src="../Content/Images/close-quick.png" class="margin-left-5" onclick="DeleteComment(\'' + item.RowKey + '\')" />';
                    article += '</div';
                }
                article += '</li>';
                //var article = '<li>';
                //article += '<b class="color_lightgrey">' + item.Title + ' on ' + vTime;
                //article += '<br/><small class="color_dark float_left">';
                //if (item.Description != '')
                //    article += 'Comment: ';
                //article += '<div class="taskcomment">' + item.Description;
                //if (item.User == localStorage.UserName && item.Type == "Comment")
                //    article += '<img src="../Content/Images/edit-quick.png" class="margin-left-5" onclick="GetCommentDetail(\'' + item.RowKey + '\')" /><img src="../Content/Images/close-quick.png" class="margin-left-5" onclick="DeleteComment(\'' + item.RowKey + '\')" />';
                //article += '</div';
                //article += '</small></b>';
                //article += '</li>';

                $("#listTaskComments").append(article);

            }
            $("#loadingPage").fadeOut();
        },
        error:
            function (data) {
                $("#loadingPage").fadeOut();
            }
    });
}

function GetCommentDetail(commentid) {
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Workflow/comments?commentid=' + commentid,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            $("#txtCommentID").val(data.RowKey);
            //*Harshitha
            var nicInstance = nicEditors.findEditor('txtComment');
            nicInstance.setContent(data.Description);
            NicEditorPasteEvent();
            if (vActiveParticipants == "")
                GetActiveParticipants(data.SendTo);
            else {
                GetValuesAndAutoPopulate("ddlSendTo", data.SendTo);

                $("#loadingPage").fadeOut();
                $("#postComment").dialog("option", "title", "Edit Comment");
                $("#postComment").dialog("open");
            }
        },
        error: function (request) {
            $("#loadingPage").fadeOut();
        }
    });
}

function DeleteComment(commentid) {
    swal({
        title: '',
        text: "Are you sure you want to <span style=\"font-weight:700\">delete</span>?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        html: true
    },
       function (confirmed) {
           if (confirmed) {
               $("#loadingPage").fadeIn();
               $.ajax({
                   url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Workflow/comments?commentid=' + commentid,
                   type: 'DELETE',
                   dataType: 'json',
                   headers: { 'eContracts-ApiKey': localStorage.APIKey },
                   cache: false,
                   success: function (data) {
                       $("#loadingPage").fadeOut();
                       swal("", "Comment Deleted");
                       GetWorkflowComments();
                   },
                   error: function (request) {
                       $("#loadingPage").fadeOut();
                   }
               });
           }
           return;
       });
}

function RemindUser() {
    if (requiredValidator('remindUser', false)) {
        $("#loadingPage").fadeIn();
        var sendTo = '';
        $('#ddlSendToRemind_chosen').find('.chosen-choices li').find('span').each(function () {
            sendTo += $(this).text() + ";";
        });
        var nicInstance = nicEditors.findEditor('txtCommentRemind');
        var remindedBy = "";
        if (vWorkflowInitiator != localStorage.UserName) {
            remindedBy = localStorage.UserName
        }
        var vComment = CleanWordFormatFromHTML(nicInstance.getContent());
        var vNoteTextCount = vComment.replace(/<\/?[^>]+(>|$)/g, "");
        if (vNoteTextCount.length <= 26500) {
            vComment = $.trim(vComment);
            vComment = $('<div/>').text(vComment).html();
            $.ajax({
                url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Workflow/tasks?workflowid=' + vWorkflowID + '&sendto=' + sendTo,
                type: 'POST',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                data: {
                    "Comment": vComment,
                    "Initiator": remindedBy
                },
                cache: false,
                success: function (status) {
                    swal("", "Reminder Sent");
                    var nicInstance = nicEditors.findEditor('txtCommentRemind');
                    nicInstance.setContent('');
                    NicEditorPasteEvent();
                    $("#loadingPage").fadeOut();
                    $("#remindUser").dialog("close");
                },
                error: function (status) {
                    $("#loadingPage").fadeOut();
                }
            });
        }
        else {
            $("#loadingPage").fadeOut();
            swal("", "Notes can not exceed 26500 characters");
        }
    }
}

function contextMenuDetails(action, el, pos) {
    switch (action) {
        case "reassign":
            {
                $('#ddlReassignTo').prop("selectedIndex", 0);
                $("#reassignTask").dialog("open");
                break;
            }
        case "change":
            {
                $("#ddlChangeRequestTo option").filter(function (index) { return $(this).text() === vWorkflowInitiator; }).prop('selected', true);
                $("#changeRequest").dialog("open");
                break;
            }
    }
}

function BindContractDetails(ContractID) {
    vItem = "";
    $("#ulMetadata").empty();
    var vMetadata = '';
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + ContractID,
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        processData: false,
        success: function (item) {
            vItem = item;
            //vMetadata += '<li class="contraRigght"><span class="toDoContenLeft width20">Contract Record Title </span> <span class="toDoContenRight"><a href="/Contracts/ContractDetails?ContractID=' + ContractID + '&TaskID=' + vTaskID + '&Action=' + vAction + '" class="linkText PreserveSpace">' + item.ContractTitle + '</a></span></li>';
            vMetadata += '<li class="contraRigght"><span class="toDoContenLeft width20">Contract Record Title </span> <span class="toDoContenRight"><a id="' + item.RowKey + '" class="hoverPopup"  href="/Contracts/ContractDetails?ContractID=' + ContractID + '&TaskID=' + vTaskID + '&Action=' + vAction + '" target="_blank" class="linkText PreserveSpace">' + item.ContractTitle + '</a><a href="/Contracts/ContractDetails?ContractID=' + ContractID + '&TaskID=' + vTaskID + '&Action=' + vAction + '" title="View Contract Details" target="_blank" class="linkText PreserveSpace"><img src="/Content/Images/external_link.png" id="newTabImage"></a></span></li>';//ENH 1  Minor Enhancement Specs-Rahul
            if ($("#hdSummaryStatus").text() == "Yes" && typeof item.SummeryBlobURL != 'undefined' && item.SummeryBlobURL != null && item.SummeryBlobURL != "") {
                //vMetadata += '<li class="contraRigght"><span class="toDoContenLeft width20">Contract Cover Sheet</span> <span class="toDoContenRight"><a  href="' + item.SummeryBlobURL + '" target="_blank" class="linkText">' + item.ContractTitle + '_Cover Sheet.docx</a></span></li>';
                vMetadata += '<li class="contraRigght"><span class="toDoContenLeft width20">Contract Cover Sheet</span> <span class="toDoContenRight"><a data-value="' + item.SummeryBlobURL + '" href="javascript:void(0);"  onclick="Openblobdocinbrowser(this)" class="linkText">' + item.ContractTitle + '_Cover Sheet.docx</a></span></li>';
            }
            vMetadata += '<li class="contraRigght"><span class="toDoContenLeft width20">Contract Record Number </span> <span class="toDoContenRight">' + item.ContractNumber + '</span></li>';
            vMetadata += '<li class="contraRigght"><span class="toDoContenLeft width20">Contract Record Type </span> <span class="toDoContenRight">' + item.ContractType + '</span></li>';

            $("#ulMetadata").append(vMetadata);
            var vUser = item.ContractManagers + ";" + item.Approvers + ";" + item.Reviewers + ";" + item.Signees + ";" + item.ProjectManager
            + ";" + item.ReadWritePermissions + ";" + item.FullControlPermissions + ";" + item.BusinessAreaOwners
            + ";" + item.Requestor;
            BindPeople(vUser);
            hoverFunction();
        }
    });
}

function BindRequestDetails(RequestID) {
    $("#ulMetadata").empty();
    var vMetadata = '';
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Requests/requestsbyrequestid?requestid=' + RequestID,
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
        processData: false,
        success: function (item) {
            $("#ulMetadata").empty();
            //vMetadata += '<li class="contraRigght"><span class="toDoContenLeft width20">Request Title </span> <span class="toDoContenRight"><a href="/Pipeline/RequestDetails?RequestID=' + RequestID + '&TaskID=' + vTaskID + '" class="linkText">' + item.RequestTitle + '</a></span></li>';
            vMetadata += '<li class="contraRigght"><span class="toDoContenLeft width20">Request Title </span> <span class="toDoContenRight"><a href="/Pipeline/RequestDetails?RequestID=' + RequestID + '&TaskID=' + vTaskID + '" target="_blank" class="PreserveSpace linkText">' + item.RequestTitle + '</a><a href="/Pipeline/RequestDetails?RequestID=' + RequestID + '&TaskID=' + vTaskID + '" title="View Request Details" target="_blank" class="PreserveSpace linkText"><img src="/Content/Images/external_link.png" id="newTabImage"></a></span></li>';  // Added From 2.4 Final to 2.4
            vMetadata += '<li class="contraRigght"><span class="toDoContenLeft width20">Request Type </span> <span class="toDoContenRight">' + item.RequestType + '</span></li>';

            $("#ulMetadata").append(vMetadata);
            var vUser = item.AssignedTo + ";" + item.Approvers + ";" + item.Reviewers + ";" + item.Requestor + ";" + item.ProjectManager
             + item.BusinessAreaOwners + ";" + item.ContractAreaAdministrators + ";" + item.RequestCollaborators;
            BindPeople(vUser);
        }
    });
}

function GetDocuments(documentID) {
    $("#ulMetadata").empty();
    var vMetadata = '';
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/documents?documentids=' + documentID,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            var vConID = '';
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                if (i > 0) { vMetadata += '<li class="contraRigght"><hr/></li>'; }
                var documententity = data[i];
                docdefaultview(documententity.ContractArea);
                var vURL = encodeURI(documententity.DocumentUrl);
                var vRawURLDoc = "";
                var IsValidOfficeDocument = false;
                if (vURL.indexOf(".doc") >= 0 || vURL.indexOf(".ppt") >= 0 || vURL.indexOf(".xls") >= 0 || vURL.indexOf(".dotx") >= 0) {

                    //vURL = localStorage.SPHostUrl + "/_layouts/15/WopiFrame.aspx?sourcedoc=" + vURL + "&action=default";
                    IsValidOfficeDocument = true;
                }
                vRawURLDoc = vURL;
                var vDescription = documententity.Description;
                if (vDescription == "") { vDescription = "NA"; }
                //if (DocDefaultView == "WordClient" && IsValidOfficeDocument) {
                //    vMetadata += '<li class="contraRigght"><span class="toDoContenLeft width20">Document Name </span> <span class="toDoContenRight"><a href="javascript:void(0);" onclick="viewdocinword(\'' + vRawURLDoc + '\')" class="linkText">' + documententity.DocumentName + '</a></span></li>';
                //} else {
                //    //manoj
                //    vMetadata += '<li class="contraRigght"><span class="toDoContenLeft width20">Document Name </span> <span class="toDoContenRight"><a data-value="' + encodeURI(documententity.DocumentUrl) + '" href="javascript:void(0);"  onclick="Openbofficedocinbrowser(this)" class="linkText">' + documententity.DocumentName + '</a></span></li>';
                //    //manoj
                //    //vMetadata += '<li class="contraRigght"><span class="toDoContenLeft width20">Document Name </span> <span class="toDoContenRight"><a href=' + vURL + ' target="_blank" class="linkText">' + documententity.DocumentName + '</a></span></li>';
                //}


                //Added from 2.4Final to 2.4
                if (DocDefaultView == "WordClient" && IsValidOfficeDocument) {
                    vMetadata += '<li class="contraRigght"><span class="toDoContenLeft width20">Document Name </span> <span class="toDoContenRight"><a href="javascript:void(0);" onclick="viewdocinword(\'' + vRawURLDoc + '\')" class="linkText">' + documententity.DocumentName + '</a><a href="javascript:void(0);" onclick="viewdocinword(\'' + vRawURLDoc + '\')" title="View Document" class="linkText"><img src="/Content/Images/external_link.png" id="newTabImage"></a></span></li>';//ENH 1  Minor Enhancement Specs-Rahul
                } else {
                    //vMetadata += '<li class="contraRigght"><span class="toDoContenLeft width20">Document Name </span> <span class="toDoContenRight"><a href="javascript:void(0);" data-value="' + vRawURLDoc + '"  onclick="Opendocinbrowser(\'' + vRawURLDoc + '\')"  title="' + documententity.DocumentName + '">' + documententity.DocumentName + '</a> <a href="javascript:void(0);" data-value="' + vRawURLDoc + '"  onclick="Opendocinbrowser(\'' + vRawURLDoc + '\')"  title="' + documententity.DocumentName + '"><img src="/Content/Images/external_link.png" ></a></span></li>';
                    vMetadata += '<li class="contraRigght"><span class="toDoContenLeft width20">Document Name </span> <span class="toDoContenRight"><a data-value="' + encodeURI(documententity.DocumentUrl) + '" href="javascript:void(0);"  onclick="Openbofficedocinbrowser(this)" class="linkText">' + documententity.DocumentName + '</a> <a data-value="' + encodeURI(documententity.DocumentUrl) + '" href="javascript:void(0);"  onclick="Openbofficedocinbrowser(this)" target="_blank" class="linkText" title="Open Document"><img src="/Content/Images/external_link.png" id="newTabImage"></a></span></li>';//ENH 1  Minor Enhancement Specs-Rahul
                }

                if (typeof documententity.ContractID != 'undefined' && documententity.ContractID != null && documententity.ContractID != "") {
                    vMetadata += '<li class="contraRigght"><span class="toDoContenLeft width20">Contract Record Title </span> <span class="toDoContenRight"><a href="/Contracts/ContractDetails?ContractID=' + documententity.ContractID + '&TaskID=' + vTaskID + '&Action=' + vAction + '" target="_blank" class="linkText PreserveSpace">' + documententity.ContractTitle + '</a><a href="/Contracts/ContractDetails?ContractID=' + documententity.ContractID + '&TaskID=' + vTaskID + '&Action=' + vAction + '" title="View Contract Details" target="_blank" class="linkText PreserveSpace"><img src="/Content/Images/external_link.png" id="newTabImage"></a></span></li>'; // ENH 497 ContractRecord Link with Contract title
                }
                //manoj
                //Cover Sheet Details
                vMetadata += '<li id="licoversheet" class="contraRigght" style="display:none"><span class="toDoContenLeft width20">Contract Cover Sheet</span> <span class="toDoContenRight"><a data-value="" href="javascript:void(0);"  onclick="Openblobdocinbrowser(this)" id="hfcoversheet" class="linkText"></a></span></li>';
                //Cover Sheet Details
                //manoj

                vMetadata += '<li class="contraRigght"><span class="toDoContenLeft width20">Description </span> <span class="toDoContenRight">' + vDescription + '</span></li>';
                if (documententity.DocumentType != '0' && documententity.DocumentType != null && documententity.DocumentType != '')
                    vMetadata += '<li class="contraRigght"><span class="toDoContenLeft width20">Document Type </span> <span class="toDoContenRight">' + documententity.DocumentType + '</span></li>';
                else
                    vMetadata += '<li class="contraRigght"><span class="toDoContenLeft width20">Document Type </span> <span class="toDoContenRight">-</span></li>';

                if (documententity.ContractID != '' && vConID == '')
                    vConID = documententity.ContractID;
            }
            $("#ulMetadata").append(vMetadata);

            if (vConID != '') {
                $.ajax({
                    url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + vConID,
                    type: 'GET',
                    cache: false,
                    contentType: false,
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    processData: false,
                    success: function (item) {
                        //manoj
                        if ($("#hdSummaryStatus").text() == "Yes" && typeof item.SummeryBlobURL != 'undefined' && item.SummeryBlobURL != null && item.SummeryBlobURL != "") {
                            $("#hfcoversheet").text(item.ContractTitle + "_Cover Sheet.docx");
                            //$("#hfcoversheet").attr('href', item.SummeryBlobURL);
                            $("#hfcoversheet").attr('data-value', item.SummeryBlobURL);
                            //vMetadata += '<li class="contraRigght"><span class="toDoContenLeft width20">Cover Sheet</span> <span class="toDoContenRight"><a  href="' + item.SummeryBlobURL + '" target="_blank" class="linkText">Contract Cover Sheet.docx</a></span></li>';
                            $("#licoversheet").css("display", "");
                        } else {
                            $("#licoversheet").css("display", "none");
                        }
                        //manoj
                        var vUser = item.ContractManagers + ";" + item.Approvers + ";" + item.Reviewers + ";" + item.Signees + ";" + item.ProjectManager
                        + ";" + item.ReadWritePermissions + ";" + item.FullControlPermissions + ";" + item.BusinessAreaOwners
                         + ";" + item.ContractAreaAdministrators + ";" + item.Requestor;
                        BindPeople(vUser);
                    },
                    error:
                        function (data) {
                        }
                });
            }
        }
    });
}

function GetWorkflowComments() {
    $("#listTaskComments").empty();
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Workflow/comments?workflowid=' + vWorkflowID,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $("#listTaskComments").empty();
            var datalenght = data.length;
            $("#totComments").html("(" + datalenght + ")");
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                var vTime = moment(new Date(item.Timestamp)).format('Do MMM YYYY');
                //var article = '<li>';
                //article += '<b class="color_lightgrey">' + item.Title + ' on ' + vTime;
                //article += '<br/><small class="color_dark float_left">';
                //if (item.Description != '')
                //    article += 'Comment: ';
                //article += '<div class="taskcomment">' + item.Description;
                //if (item.User == localStorage.UserName && item.Type == "Comment")
                //    article += '<img src="../Content/Images/edit-quick.png" class="margin-left-5" onclick="GetCommentDetail(\'' + item.RowKey + '\')" /><img src="../Content/Images/close-quick.png" class="margin-left-5" onclick="DeleteComment(\'' + item.RowKey + '\')" />';
                //article += '</div';
                //article += '</small></b>';
                ////article += '<span><small>' + item.User + ' | ' + vTime + '</small></span>';
                ////article += '<span><small class="color_lightgrey">' + vTime + '</small></span>';
                //article += '</li>';
                var article = '<li>';
                if (item.Title.indexOf('~') > -1) {
                    article += '<b class="color_lightgrey"><span class="color_dark" style="margin-right: 20px;">Activity: </span>' + item.Title.split('~')[0] + ' on ' + vTime + '<br /><span style="margin-left:72px;">' + item.Title.split('~')[1] + ' on ' + vTime + '</span>';
                    article += '</b>';
                }
                else {
                    var vTitle = item.Title;
                    if (vTitle[vTitle.length - 1] === ".")
                        vTitle = vTitle.slice(0, -1);
                    article += '<b class="color_lightgrey"><span class="color_dark" style="margin-right: 20px;">Activity: </span>' + vTitle + ' on ' + vTime;
                    article += '</b>';
                }

                if (item.Description != '') {
                    article += '<br/><br/><b class="color_dark float_left" style="margin-right: 7px;">Comment: ';
                    article += '</b>';
                    article += '<div class="taskcomment"><span>' + item.Description + '</span>';
                    if (item.User == localStorage.UserName && item.Type == "Comment")
                        article += '<img src="../Content/Images/edit-quick.png" class="margin-left-5" onclick="GetCommentDetail(\'' + item.RowKey + '\')" /><img src="../Content/Images/close-quick.png" class="margin-left-5" onclick="DeleteComment(\'' + item.RowKey + '\')" />';
                    article += '</div>';
                }
                article += '</li>';

                $("#listTaskComments").append(article);
            }
        },
        error:
            function (data) {

            }
    });
}

function BackToList() {
    parent.history.back();
    return false;
}

$('#btnPost').click(function () {

    PostComment("Posted", '', $("#txtPost").val().replace(/\n/g, "<br/>"));

});

$('#btnApprove').click(function () {
    if ($('#btnApproveText').html() == "Approve") {
        $("#hdTaskStatus").val("Approved");
    } else {
        $("#hdTaskStatus").val("Reviewed");
    }
    if ((RequiredComment.indexOf("Approve") > -1 && $("#hdTaskStatus").val() == "Approved") || (RequiredComment.indexOf("Review") > -1 && $("#hdTaskStatus").val() == "Reviewed")) {
        $("#completeTask .commReq").show();
        $("#txtCompleteComment").addClass("validNicEdit");
    }
    else {
        $("#completeTask .commReq").hide();
        $("#txtCompleteComment").removeClass("validNicEdit");
    }
    var nicInstance = nicEditors.findEditor('txtCompleteComment');
    nicInstance.setContent('');
    NicEditorPasteEvent();
    $("#CompletePlaceHolder").text("You've selected '" + $("#hdTaskStatus").val() + "' as the task outcome.");
    $("#completeTask").dialog("open");
});

$('#btnReject').click(function () {
    $("#hdTaskStatus").val("Rejected");
    var nicInstance = nicEditors.findEditor('txtCompleteComment');
    nicInstance.setContent('');
    NicEditorPasteEvent();
    if (RequiredComment.indexOf("Reject") > -1) {
        $("#completeTask .commReq").show();
        $("#txtCompleteComment").addClass("validNicEdit");
    }
    else {
        $("#completeTask .commReq").hide();
        $("#txtCompleteComment").removeClass("validNicEdit");
    }
    $("#CompletePlaceHolder").text("You've selected '" + $("#hdTaskStatus").val() + "' as the task outcome.");
    $("#completeTask").dialog("open");
});

$('#btnComplete').click(function () {
    $("#hdTaskStatus").val("Closed");
    var nicInstance = nicEditors.findEditor('txtCompleteComment');
    nicInstance.setContent('');
    NicEditorPasteEvent();
    if (RequiredComment.indexOf("Complete") > -1) {
        $("#completeTask .commReq").show();
        $("#txtCompleteComment").addClass("validNicEdit");
    }
    else {
        $("#completeTask .commReq").hide();
        $("#txtCompleteComment").removeClass("validNicEdit");
    }
    $("#CompletePlaceHolder").text("You've selected '" + $("#hdTaskStatus").val() + "' as the task outcome.");
    $("#completeTask").dialog("open");
});

$('#btnReassign').click(function () {
    if (RequiredComment.indexOf("Reassign") > -1) {
        $("#reassignTask .commReq").show();
        $("#txtReassignComment").addClass("validNicEdit");
    }
    else {
        $("#reassignTask .commReq").hide();
        $("#txtReassignComment").removeClass("validNicEdit");
    }
    $('#ddlReassignTo').prop("selectedIndex", 0);
    $("#reassignTask").dialog("open");
});

$('#btnChange').click(function () {
    if (RequiredComment.indexOf("Change Request") > -1) {
        $("#changeRequest .commReq").show();
        $("#txtChangeComment").addClass("validNicEdit");
    }
    else {
        $("#changeRequest .commReq").hide();
        $("#txtChangeComment").removeClass("validNicEdit");
    }
    $("#ddlChangeRequestTo option").filter(function (index) { return $(this).text() === vWorkflowInitiator; }).prop('selected', true);
    $("#changeRequest").dialog("open");
});

function PostComment() {
    if (requiredValidator('postComment')) {
        $("#loadingPage").fadeIn();
        var nicInstance = nicEditors.findEditor('txtComment');
        var vComment = CleanWordFormatFromHTML(nicInstance.getContent());
        var vNoteTextCount = vComment.replace(/>\/?[^>]+(>|$)/g, "");
        if (vNoteTextCount.length <= 26500) {
            vComment = $.trim(vComment);
            vComment = $('<div/>').text(vComment).html();
            var sendTo = '';
            $('#ddlSendTo_chosen').find('.chosen-choices li').find('span').each(function () {
                if (sendTo == '') {
                    sendTo = $(this).text();
                }
                else {
                    sendTo += "; " + $(this).text();
                }
            });
            var vURL = vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Workflow/comments';
            var vType = 'POST';
            if ($("#txtCommentID").val() != '') {
                vURL = vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Workflow/comments?commentid=' + $("#txtCommentID").val();
                vType = 'PUT';
            }
            $.ajax({
                url: vURL,
                type: vType,
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                data: {
                    WorkflowID: vWorkflowID,
                    Title: localStorage.UserName + " posted a comment",
                    Description: vComment,
                    SendTo: sendTo,
                    Type: "Comment",
                    User: localStorage.UserName
                },
                cache: false,
                success: function (status) {
                    GetWorkflowComments();
                    swal("", "Comment Posted");
                    //*Harshitha
                    var nicInstance = nicEditors.findEditor('txtComment');
                    nicInstance.setContent('');
                    NicEditorPasteEvent();
                    $("#txtCommentID").val("");
                    $("#loadingPage").fadeOut();
                    $("#postComment").dialog("close");
                },
                error: function (status) {
                    $("#loadingPage").fadeOut();
                }
            });
        }
        else {
            $("#loadingPage").fadeOut();
            swal("", "Note can not exceed 26500 characters");
        }
    }
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function CreateTaskList() {
    $("#todoList").html('');
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Workflow/tasks?assignto=' + localStorage.UserName + '&status=In Progress&pageSize=5&startIndex=1',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            if (data.length == 0) {
                swal("", "No Tasks Available");
            }
            else {
                var datalenght = data.length;
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];
                    var sTaskTitle = item.TaskTitle;
                    var sRowKey = item.RowKey;
                    var sDuedate = '';

                    if (typeof item.DueDate != 'undefined' && item.DueDate != null) {
                        sDuedate = moment(new Date(item.DueDate)).format('Do MMM YYYY');
                    }

                    var article = '<li>';
                    article += '<p><a href="/Activity/TaskDetails?TaskID=' + sRowKey + '&WorkflowID=' + item.WorkflowID + '">' + sTaskTitle + '</a>';

                    if (sDuedate == "" || sDuedate == null) {
                        article += '</p></li>';
                    }
                    else {
                        article += '<small class="to-do-task-small">' + sDuedate + '</small></p></li>';
                    }


                    $("#todoList").append(article);

                }
            }
        },
        error: function () {
            swal("", "No Tasks Available");
        }
    });
}

function CreateMilestoneList() {
    $("#milestoneList").html('');
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/milestones?assignto=' + localStorage.UserName + '&status=No&pageSize=5&startIndex=1',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            if (data.length == 0) {
                $("#milestoneList").append('<p class="f_p-error">No Milestone Available</p>');
            }
            else {
                var datalenght = data.length;
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];
                    var sMilestoneTitle = item.MilestoneTitle;
                    var sContractTitle = item.ContractTitle;
                    var sRowKey = item.RowKey;
                    var sMilestoneDate = moment(new Date(item.MilestoneDate)).format('Do MMM YYYY');

                    var article = '<li class="contraRigght">';
                    article += '<p class="contRP"><a href="javascript:void(0);" onclick="ViewMilestoneDetail(\'' + sRowKey + '\')"><span>' + sMilestoneTitle + '</span></a></p><small class="contRsmaLl PreserveSpace">' + sMilestoneDate + ' | ' + sContractTitle + '</small></li>';
                    $("#milestoneList").append(article);
                }
            }
        },
        error: function () {
            $("#milestoneList").append('<p class="f_p-error">No Milestone Available</p>');
        }
    });
}

$(".drop_a4").click(function (e) {
    $(".hhide4").toggle();
    e.stopPropagation();
});

$(".hhide4").click(function (e) {
    e.stopPropagation();
});

$(".drop_a5").click(function (e) {
    $(".hhide5").toggle();
    e.stopPropagation();
});

$(".hhide5").click(function (e) {
    e.stopPropagation();
});

$(document).click(function () {
    $(".hhide4").hide();
    $(".hhide5").hide();
});

function Adduser() {
    if (requiredValidator('dialogAddUser')) {
        $("#loadingPage").fadeIn();
        var vWorkflowStage = [];
        $('#tblStage tr').each(function (i, row) {
            var vRow = $(row).attr('id');
            var vRowIndex = vRow.replace("trStage", "");
            var stage = $("#txtStage" + vRowIndex).val();
            var order = $("#ddlOrder" + vRowIndex).find('option:selected').text();
            var approvers = $("#ddlAssignTo" + vRowIndex).val();
            var sendTo = '';
            $(approvers).each(function (i, item) {
                if (sendTo == '') {
                    sendTo = item;
                }
                else {
                    sendTo += "; " + item;
                }
            });
            vWorkflowStage.push({
                "StageID": vRowIndex,
                "StageTitle": stage,
                "Participants": sendTo,
                "Order": order
            });
        });

        $.ajax({
            url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Workflow?workflowID=' + vWorkflowID,
            type: 'PUT',
            "Content-Type": "application/json;charset=utf-8",
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            data: {
                "WorkflowStage": vWorkflowStage
            },
            cache: false,
            success: function (status) {
                swal("", "user updated");
                $("#loadingPage").fadeOut();
                location.reload();
            }
        });

    }
    else {
        $("#ddlUser").focus();
    }


}

function togglediv(firstObject, imgObject) {
    $("#" + firstObject).slideToggle();

    var imgObj = $("#" + imgObject);

    if (imgObj.attr("title") == "Collapse") {
        imgObj.attr("title", "Expand");
        imgObj.attr("src", "../Content/Images/dp-ddown.png");
    } else {
        imgObj.attr("title", "Collapse");
        imgObj.attr("src", "../Content/Images/dp-dup.png");
    }
}

function BindPeople(user) {
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/users',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $("#ddlChangeRequestTo").empty();
            $("#ddlReassignTo").empty();
            var v = $(data).length;
            var datalenght = data.length;
            var article = '';
            var articleChangeReq = '';
            var vUsers = $.map(user.split(";"), $.trim);//user.split(';'); 
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                var sRowKey = item.RowKey;
                var sUserName = item.UserName;
                if (sUserName != localStorage.UserName && sUserName != vWorkflowInitiator && vWorkflowParticipants.indexOf(sUserName) < 0)
                    article += '<option value="' + sUserName + '">' + sUserName + '</option>';
                if (sUserName != localStorage.UserName && (vUsers.indexOf(sUserName) >= 0 || sUserName == vWorkflowInitiator))
                    articleChangeReq += '<option value="' + sUserName + '">' + sUserName + '</option>';
            }
            $("#ddlChangeRequestTo").append(articleChangeReq);
            $("#ddlReassignTo").append(article);
        },
        error:
            function (data) {
            }
    });
}

function ViewMilestoneDetail() {
    $("#viewMetadataDetail").dialog("option", "title", "View Milestone");
    $("#viewMetadataDetail").dialog("open");
}

function ViewMilestoneDetail(milestoneID) {
    $("#tblMetadataDetail").empty();
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/milestones?milestoneid=' + milestoneID,
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

function ChangeRequest() {
    if (requiredValidator('changeRequest')) {
        $("#loadingPage").fadeIn();

        $.ajax({
            url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Workflow/tasks?taskid=' + vTaskID,
            type: 'GET',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            cache: false,
            success: function (taskDet) {
                if (taskDet.Status == "In Progress") {
                    var status = "Change Requested";
                    var nicInstance = nicEditors.findEditor('txtChangeComment');
                    var vComment = CleanWordFormatFromHTML(nicInstance.getContent());
                    var vNoteTextCount = vComment.replace(/<\/?[^>]+(>|$)/g, "");
                    if (vNoteTextCount.length <= 26500) {
                        vComment = $.trim(vComment);
                        vComment = $('<div/>').text(vComment).html();
                        var comments = vComment;
                        var reassignto = "";
                        var changerequestto = $("#ddlChangeRequestTo option:selected").val();
                        $("#loadingPage").fadeIn();
                        $.ajax({
                            url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Workflow/tasks?taskid=' + vTaskID + '&reassignto=' + reassignto + '&changerequestto=' + changerequestto,
                            type: 'PUT',
                            dataType: 'json',
                            data: {
                                "Status": status,
                                "Comment": comments,
                            },
                            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                            cache: false,
                            success: function (status) {
                                GetTaskDetail();
                                //$("#loadingPage").fadeOut();
                                $("#changeRequest").dialog("close");
                            },
                            error: function (status) {
                                $("#loadingPage").fadeOut();
                            }
                        });
                    }
                    else {
                        $("#loadingPage").fadeOut();
                        swal("", "Note can not exceed 26500 characters");
                    }
                }
                else {
                    $("#loadingPage").fadeOut();
                    swal("", "Task you are working is currently " + taskDet.Status);
                }
            },
            error: function () {
                $("#loadingPage").fadeOut();
                swal("", "Task you are working is not available.");
            }
        });
    }
}

function CompleteTask() {
    var vIsPasss = true;
    var status = $("#hdTaskStatus").val();
    //if (status == "Rejected")
    vIsPasss = requiredValidator('completeTask', false);
    if (vIsPasss) {
        $("#loadingPage").fadeIn();

        $.ajax({
            url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Workflow/tasks?taskid=' + vTaskID,
            type: 'GET',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            cache: false,
            success: function (taskDet) {
                if (taskDet.Status == "In Progress") {
                    var nicInstance = nicEditors.findEditor('txtCompleteComment');
                    var vComment = CleanWordFormatFromHTML(nicInstance.getContent());
                    var vNoteTextCount = vComment.replace(/<\/?[^>]+(>|$)/g, "");
                    if (vNoteTextCount.length <= 26500) {
                        vComment = $.trim(vComment);
                        vComment = $('<div/>').text(vComment).html();

                        var comments = vComment;
                        var reassignto = "";
                        var changerequestto = "";
                        $.ajax({
                            url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Workflow/tasks?taskid=' + vTaskID + '&reassignto=' + reassignto + '&changerequestto=' + changerequestto,
                            type: 'PUT',
                            dataType: 'json',
                            data: {
                                "Status": status,
                                "Comment": comments,
                            },
                            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                            cache: false,
                            success: function (status) {
                                GetTaskDetail();
                                swal("", "Task Completed");
                                //$("#loadingPage").fadeOut();
                                $("#txtCompleteComment").removeClass('validNicEdit');
                                $("#completeTask").dialog("close");
                            },
                            error: function (status) {
                                $("#loadingPage").fadeOut();
                            }
                        });
                    }
                    else {
                        $("#loadingPage").fadeOut();
                        swal("", "Note can not exceed 26500 characters");
                    }
                }
                else {
                    $("#loadingPage").fadeOut();
                    swal("", "Task you are working is currently " + taskDet.Status);
                }
            },
            error: function () {
                $("#loadingPage").fadeOut();
                swal("", "Task you are working is not available.");
            }
        });
    }
}

function ReassignTask() {
    if (requiredValidator('reassignTask', false)) {
        $("#loadingPage").fadeIn();

        $.ajax({
            url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Workflow/tasks?taskid=' + vTaskID,
            type: 'GET',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            cache: false,
            success: function (taskDet) {
                if (taskDet.Status == "In Progress") {
                    var status = "Reassigned";
                    var getNotification = "No";
                    if ($("input[type='radio']").filter('[name="notification"]:checked').val() == "Yes") {
                        getNotification = "Yes"
                    }
                    var nicInstance = nicEditors.findEditor('txtReassignComment');
                    var vComment = CleanWordFormatFromHTML(nicInstance.getContent());
                    var vNoteTextCount = vComment.replace(/<\/?[^>]+(>|$)/g, "");
                    if (vNoteTextCount.length <= 26500) {
                        vComment = $.trim(vComment);
                        vComment = $('<div/>').text(vComment).html();
                        var comments = vComment;
                        var reassignto = $("#ddlReassignTo option:selected").val();
                        var changerequestto = "";
                        $("#loadingPage").fadeIn();
                        $.ajax({
                            url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Workflow/tasks?taskid=' + vTaskID + '&reassignto=' + reassignto + '&changerequestto=' + changerequestto,
                            type: 'PUT',
                            dataType: 'json',
                            data: {
                                "Status": status,
                                "Comment": comments,
                                "GetAlertAfterReassign": getNotification
                            },
                            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                            cache: false,
                            success: function (status) {
                                GetTaskDetail();
                                //swal("", "Task Reassigned");
                                //$("#loadingPage").fadeOut();
                                $("#reassignTask").dialog("close");
                            },
                            error: function (status) {
                                $("#loadingPage").fadeOut();
                            }
                        });
                    }
                    else {
                        $("#loadingPage").fadeOut();
                        swal("", "Note can not exceed 26500 characters");
                    }
                }
                else {
                    $("#loadingPage").fadeOut();
                    swal("", "Task you are working is currently " + taskDet.Status);
                }
            },
            error: function () {
                $("#loadingPage").fadeOut();
                swal("", "Task you are working is not available.");
            }
        });
    }
}

function SaveParticipants() {
    if (requiredValidator('dialogAddUser')) {
        $("#loadingPage").fadeIn();

        $.ajax({
            url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Workflow/workflowdetails?taskid=' + vTaskID + '&workflowid=' + vWorkflowID,
            type: 'GET',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            cache: false,
            success: function (taskDet) {
                if (taskDet.Status == "In Progress") {
                    var vWorkflowStage = [];
                    $('#tblStage tr').each(function (i, row) {
                        var vRow = $(row).attr('id');
                        var vRowIndex = vRow.replace("trStage", "");
                        var stage = $("#txtStage" + vRowIndex).val();
                        var order = $("#ddlOrder" + vRowIndex).find('option:selected').text();
                        var sendTo = '';
                        $('#ddlAssignTo' + vRowIndex + '_chosen').find('.chosen-choices li').find('span').each(function () {
                            if (sendTo == '') {
                                sendTo = $(this).text();
                            }
                            else {
                                sendTo += "; " + $(this).text();
                            }
                        });
                        vWorkflowStage.push({
                            "StageID": vRowIndex,
                            "StageTitle": stage,
                            "Participants": sendTo,
                            "Order": order
                        });
                    });


                    $.ajax({
                        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Workflow?workflowID=' + vWorkflowID,
                        type: 'PUT',
                        dataType: 'json',
                        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                        cache: false,
                        data: {
                            "WorkflowStage": vWorkflowStage,
                        },
                        success: function (status) {
                            GetTaskDetail();
                            swal("", "Participants Updated");
                            //$("#loadingPage").fadeOut();
                            $("#dialogAddUser").dialog("close");
                        },
                        error: function (status) {
                            $("#loadingPage").fadeOut();
                        }
                    });
                }
                else {
                    $("#loadingPage").fadeOut();
                    swal("", "Task you are working is currently " + taskDet.Status);
                }
            },
            error: function () {
                $("#loadingPage").fadeOut();
                swal("", "Task you are working is not available.");
            }
        });
    }
}

function ChangeParticipants() {
    $(".hhide4").hide();
    $("#loadingPage").fadeIn();
    $("#tblStage").empty();
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Workflow/stages/notstarted?workflowid=' + vWorkflowID,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            var vWorkflowStages = data.WorkflowStages;
            var vWorkflowTasks = data.WorkflowTasks;
            var ActiveTask = [];
            if (vWorkflowTasks != null && vWorkflowTasks != "" && vWorkflowTasks.length > 0)
                ActiveTask = $.grep(vWorkflowTasks, function (p) { return p.Status == "In Progress"; })
           .map(function (p) { return p });

            var totalFileCount = 0;
            var datalenght = vWorkflowStages.length;
            var vdisabled = "";
            var vParticipants = "";
            var oReadOnlyUsers = [];
            for (var i = 0; i < datalenght; i++) {
                oReadOnlyUsers = [];
                var item = vWorkflowStages[i];
                vParticipants = item.Participants;
                totalFileCount = item.StageID;
                var htmlFormatFile = '<tr id="trStage' + totalFileCount + '">';
                htmlFormatFile += '<td class="width30 wf_approval padding_top_5px table_Vertical-Width">';
                if (i == 0) {
                    htmlFormatFile += '<input id="txtStage' + totalFileCount + '" name="Stage' + totalFileCount + '" title="Stage" placeholder="Stage Name" type="text" value="' + item.StageTitle + '" class="f_inpt width97 change-participant-input validelement" disabled />';
                    htmlFormatFile += '</td>';
                    htmlFormatFile += '<td class="width40 v_align_top">';
                    htmlFormatFile += '<select id="ddlAssignTo' + totalFileCount + '" name="AssignTo' + totalFileCount + '"  multiple="multiple" data-placeholder="Select" class="width97 validmultiselect"></select>';
                    htmlFormatFile += '</td>';
                    htmlFormatFile += '<td class="width20 padding_top_3px" style="vertical-align: top;">';
                    if (item.Order == "Serial")
                        htmlFormatFile += '<select id="ddlOrder' + totalFileCount + '" name="Order' + totalFileCount + '"  class="f_inpt width97" disabled><option selected="selected">Serial</option><option>Parallel</option></select>';
                    else
                        htmlFormatFile += '<select id="ddlOrder' + totalFileCount + '" name="Order' + totalFileCount + '"  class="f_inpt width97" disabled><option>Serial</option><option selected="selected">Parallel</option></select>';
                    htmlFormatFile += '</td>';
                    htmlFormatFile += '<td class="width10">';
                    htmlFormatFile += ' ';
                    if (ActiveTask != null && ActiveTask != "" && ActiveTask.length > 0) {
                        $(ActiveTask).each(function (i, item) {
                            oReadOnlyUsers.push(item.AssignTo);
                        });
                    }
                    else {
                        oReadOnlyUsers = vUserTaskInprogress;
                    }
                } else {
                    oReadOnlyUsers = [];
                    htmlFormatFile += '<input id="txtStage' + totalFileCount + '" name="Stage' + totalFileCount + '" title="Stage" placeholder="Stage Name" type="text" value="' + item.StageTitle + '" class="f_inpt width97 validelement" />';
                    htmlFormatFile += '</td>';
                    htmlFormatFile += '<td class="width40 padding_top_3px v_align_top">';
                    htmlFormatFile += '<select id="ddlAssignTo' + totalFileCount + '" name="AssignTo' + totalFileCount + '"  multiple="multiple" data-placeholder="Select" class="width97 validmultiselect"></select>';
                    htmlFormatFile += '</td>';
                    htmlFormatFile += '<td class="width20" style="vertical-align: top;">';
                    if (item.Order == "Serial")
                        htmlFormatFile += '<select id="ddlOrder' + totalFileCount + '" name="Order' + totalFileCount + '"  class="f_inpt width97"><option selected="selected">Serial</option><option>Parallel</option></select>';
                    else
                        htmlFormatFile += '<select id="ddlOrder' + totalFileCount + '" name="Order' + totalFileCount + '"  class="f_inpt width97"><option>Serial</option><option selected="selected">Parallel</option></select>';
                    htmlFormatFile += '</td>';
                    htmlFormatFile += '<td class="width10">';
                    htmlFormatFile += '<img id="imgStageDelete' + totalFileCount + '" src="../Content/Images/icon/delete.png" style="width: 20px" class="margin-top-10" onclick="DeleteStage(this)" />';
                }
                htmlFormatFile += '</td>';
                htmlFormatFile += '</tr>';

                $("#tblStage").append(htmlFormatFile);
                var $options = $("#ddlApprovers > option").clone();
                $('#ddlAssignTo' + totalFileCount).append($options);
                $("#ddlAssignTo" + totalFileCount).chosen();
                if (oReadOnlyUsers != null && oReadOnlyUsers != "" && oReadOnlyUsers.length > 0) {
                    GetValuesAndAutoPopulateAD("ddlAssignTo" + totalFileCount, vParticipants, oReadOnlyUsers);
                }
                else {
                    GetValuesAndAutoPopulate("ddlAssignTo" + totalFileCount, vParticipants);
                }
                
                $("#ddlOrder" + totalFileCount + " option").filter(function (index) { return $(this).text() === item.Order; }).prop('selected', true);
                //eO310706
                if (WorkflowRoutingOptions != null && WorkflowRoutingOptions != "" && WorkflowRoutingOptions != "undefined") {
                    if (WorkflowRoutingOptions.indexOf("Allow over-ride of Admin Configuration") == -1) {
                        if (WorkflowRoutingOptions.indexOf("Allow replacing participants") == -1) {
                            $("#ddlAssignTo" + totalFileCount).prop('disabled', true).trigger("chosen:updated");
                            $("#ddlOrder" + totalFileCount).prop('disabled', true);
                        }
                        $("#txtStage" + totalFileCount).prop('disabled', true);
                        $("#imgStageDelete" + totalFileCount).css("visibility", "hidden");
                    }
                }
                else {
                    $("#ddlAssignTo" + totalFileCount).prop('disabled', true).trigger("chosen:updated");
                    $("#ddlOrder" + totalFileCount).prop('disabled', true);
                    $("#txtStage" +totalFileCount).prop('disabled', true);
                    $("#imgStageDelete" +totalFileCount).css("visibility", "hidden");
                }
            }
            $("#dialogAddUser").dialog("open");
            $("#dialogAddUser").height("auto");
            $("#loadingPage").fadeOut();
        },
        error:
            function (data) {
                $("#loadingPage").fadeOut();
            }
    });
}

function AddStage() {
    var vLastRow = $("#tblStage tr:last").attr('id');
    var vRowLength = 0;
    $("#tblStage tr").each(function (i, item) {
        if (typeof ($(item).attr('id')) != "undefined" && $(item).attr('id') != "" && $(item).attr('id') != null) {
            var ind = $(item).attr('id').replace('trStage', '');
            if (i == 0)
                vRowLength = parseInt(ind);
            else
                vRowLength = vRowLength + 1;
        }
    })

    if (typeof vRowLength != 'undefined')
        vRowLength = parseInt(vRowLength) + 1;
    var totalFileCount = "1";
    if (typeof vLastRow == "undefined") {
        totalFileCount = "1";
    }
    else {
        totalFileCount = parseInt(vLastRow.replace("trStage", ""));
        totalFileCount += 1;
    }
    var htmlFormatFile = '<tr id="trStage' + totalFileCount + '">';
    htmlFormatFile += '<td class="width30 wf_approval padding_top_8px table_Vertical-Width">';
    htmlFormatFile += '<input id="txtStage' + totalFileCount + '" name="Stage' + totalFileCount + '" title="Stage" placeholder="Stage Name" type="text" class="f_inpt change-participant-input width97 validelement" value="Stage ' + vRowLength + '"/>';
    htmlFormatFile += '</td>';
    htmlFormatFile += '<td class="width40 padding_top_3px v_align_top">';
    htmlFormatFile += '<select id="ddlAssignTo' + totalFileCount + '" name="AssignTo' + totalFileCount + '"  multiple="multiple" data-placeholder="Select" class="width97 validmultiselect"></select>';
    htmlFormatFile += '</td>';
    htmlFormatFile += '<td class="width20 padding_top_5px" style="vertical-align: top;">';
    htmlFormatFile += '<select id="ddlOrder' + totalFileCount + '" name="Order' + totalFileCount + '"  class="f_inpt width97"><option selected="selected">Serial</option><option>Parallel</option></select>';
    htmlFormatFile += '</td>';
    htmlFormatFile += '<td class="width10">';
    htmlFormatFile += '<img src="../Content/Images/icon/delete.png" style="width: 20px" class="margin-top-10" onclick="DeleteStage(this)" />';
    htmlFormatFile += '</td>';
    htmlFormatFile += '</tr>';

    $("#tblStage").append(htmlFormatFile);
    var $options = $("#ddlApprovers > option").clone();
    $('#ddlAssignTo' + totalFileCount).append($options);
    $("#ddlAssignTo" + totalFileCount).chosen();
    $("#dialogAddUser").css('overflow-y', '');
    if (vRowLength > 10) {
        //$("#tblStage").css('overflow-y', 'auto');
        $("#dialogAddUser").css('overflow-y', 'auto');
    }
    else
        $("#dialogAddUser").css('overflow-y', '');

}

function DeleteStage(n) {
    var vv = $(n.parentNode.parentNode).find('select');
    var curVal = 0;
    if (typeof vv != 'undefined') {
        curVal = parseInt(vv.val());
    }
    n.parentNode.parentNode.parentNode.removeChild(n.parentNode.parentNode);
    var value = 0;
    $("#tblStage tr").each(function (i, item) {
        if (typeof ($(item).attr('id')) != "undefined" && $(item).attr('id') != "" && $(item).attr('id') != null) {
            var ind = $(item).attr('id').replace('trStage', '');
            if (i == 0)
                value = ind - 1;
            else
                value = value + 1;
            if (typeof (ind) != "undefined" && ind != "" && ind != null) {
                if ($("#txtStage" + ind).val().indexOf('Stage ') == 0) {
                    var replaceint = $("#txtStage" + ind).val().replace('Stage ', '');
                    if ($.isNumeric(replaceint)) {
                        if (!isNaN(parseInt(replaceint)) && !isNaN(parseInt(value)) && parseInt(replaceint) != (parseInt(value) + 1)) {
                            $("#txtStage" + ind).val('Stage ' + (parseInt(value) + 1))
                        }
                    }
                }
            }
        }
    })
    $("#dialogAddUser").css('overflow-y', '');
    if ($("#tblStage tr").length <= 10) {
        //$("#tblStage").css('overflow-y', 'auto');
        $("#dialogAddUser").css('overflow-y', '');
    }
    else
        $("#dialogAddUser").css('overflow-y', 'auto');

}

function getselectedusers(users) {
    var usersarr = [];
    var res = users.split(";");
    var reslength = res.length;
    for (var i = 0; i < reslength; i++) {
        usersarr.push(res[i].trim());
    }

    return usersarr;
}

function WorkflowAction(action) {
    $(".hhide4").hide();
    if (action == "Stop") {
        swal({
            title: '',
            text: "Are you sure you want to '<span style=\"font-weight:700\">Stop</span>' the workflow?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            html: true
        },
        function (confirmed) {
            if (confirmed) {
                var nicInstance = nicEditors.findEditor('txtCommentStopWorkflow');
                nicInstance.setContent('');
                NicEditorPasteEvent();
                $("#stopWorkflow").dialog("open");
            }
            return;
        });
    }

    else if (action == "Cancel") {
        swal({
            title: '',
            text: "Are you sure you want to '<span style=\"font-weight:700\">Cancel</span>' the workflow?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            html: true
        },
        function (confirmed) {
            if (confirmed) {
                var nicInstance = nicEditors.findEditor('txtCommentCancelWorkflow');
                nicInstance.setContent('');
                NicEditorPasteEvent();
                $("#cancelWorkflow").dialog("open");
            }
            return;
        });
    }
    else if (action == "Restart") {
        swal({
            title: '',
            text: "Are you sure you want to '<span style=\"font-weight:700\">Restart</span>' the workflow?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            html: true
        },
       function (confirmed) {
           if (confirmed) {
               var nicInstance = nicEditors.findEditor('txtCommentRestartWorkflow');
               nicInstance.setContent('');
               NicEditorPasteEvent();
               $("#restartWorkflow").dialog("open");
           }
           return;
       });
    }
    else if (action == "Remind") {
        var vUserTaskPendingArr = vUserTaskPending;
        var vUserTaskPendingJoin = '';
        $("#ddlSendToRemind").empty();
        var article = '';
        for (var i = 0, l = vUserTaskPendingArr.length; i < l; ++i) {
            if ($.trim(vUserTaskPendingArr[i]) != localStorage.UserName && $.trim(vUserTaskPendingArr[i]) != "") {
                article += '<option value="' + $.trim(vUserTaskPendingArr[i]) + '">' + $.trim(vUserTaskPendingArr[i]) + '</option>';
                vUserTaskPendingJoin += vUserTaskPendingArr[i] + ';'
            }
        }
        $("#ddlSendToRemind").append(article);
        $("#ddlSendToRemind").chosen();
        GetValuesAndAutoPopulate("ddlSendToRemind", vUserTaskPendingJoin);
        var nicInstance = nicEditors.findEditor('txtCommentRemind');
        nicInstance.setContent('');
        NicEditorPasteEvent();
        if (article == '') {
            swal("", "No users are pending to remind.");
        }
        else {
            $("#remindUser").dialog("open");
        }
    }
    else if (action == "Comment") {
        //*Harshitha
        $(".validNicEdit").each(function (index, element) {

            $(element).removeClass("error");
            $("#errormsg_" + element.id).remove();
        });

        var nicInstance = nicEditors.findEditor('txtComment');
        nicInstance.setContent('');
        NicEditorPasteEvent();
        $("#txtCommentID").val("");
        if (vActiveParticipants == "")
            GetActiveParticipants('');
        else {
            GetValuesAndAutoPopulate("ddlSendTo", vActiveParticipants);
            $("#postComment").dialog("option", "title", "Post a Comment");
            $("#postComment").dialog("open");
        }
    }

}

var vActiveParticipants = '';
function GetActiveParticipants(SendTo) {
    $(".hhide4").hide();
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Workflow/ActivePartitcipants?workflowid=' + vWorkflowID,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            vActiveParticipants = data;
            var vActiveParticipantsArr = vActiveParticipants.split(';');
            for (var i = 0, l = vActiveParticipantsArr.length; i < l; ++i) {
                if ($.trim(vActiveParticipantsArr[i]) != localStorage.UserName) {
                    var article = '<option value="' + $.trim(vActiveParticipantsArr[i]) + '">' + $.trim(vActiveParticipantsArr[i]) + '</option>';
                    $("#ddlSendTo").append(article);
                }
            }
            $("#ddlSendTo").chosen();
            if (SendTo == '') {
                GetValuesAndAutoPopulate("ddlSendTo", vActiveParticipants);
                $("#postComment").dialog("option", "title", "Post a Comment");
            }
            else {
                GetValuesAndAutoPopulate("ddlSendTo", SendTo);
                $("#postComment").dialog("option", "title", "Edit a Comment");
            }
            $("#postComment").dialog("open");
            $("#postComment").height("auto");
            $("#loadingPage").fadeOut();

        },
        error:
            function (data) {
                $("#postComment").dialog("open");
                $("#postComment").height("auto");
                $("#loadingPage").fadeOut();
            }
    });
}

function GetValuesAndAutoPopulate(controlname, values) {

    var multiarr = [];
    var res = values != null ? values.split(";") : [];
    var reslength = res.length;
    var resValue = "";
    for (var i = 0; i < reslength; i++) {
        //   multiarr.push(res[i].trim());
        resValue = res[i].trim();
        if (resValue != "") {
            if ($('#' + controlname + ' option[value="' + resValue + '"]').length > 0 && multiarr.indexOf(resValue) == -1)
                multiarr.push(resValue);
        }
    }

    ChosenOrder.setSelectionOrder($('#' + controlname), multiarr, true);

}

function CancelWorkflow() {
    if (requiredValidator('cancelWorkflow')) {
        var nicInstance = nicEditors.findEditor('txtCommentCancelWorkflow');
        var vComment = CleanWordFormatFromHTML(nicInstance.getContent());
        var vNoteTextCount = vComment.replace(/<\/?[^>]+(>|$)/g, "");
        var cancelledBy = "";
        if (vWorkflowInitiator != localStorage.UserName) {
            cancelledBy = localStorage.UserName
        }
        if (vNoteTextCount.length <= 26500) {
            vComment = $.trim(vComment);
            vComment = $('<div/>').text(vComment).html();
            var comments = vComment;
            $("#loadingPage").fadeIn();
            $.ajax({
                url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Workflow/cancel?workflowID=' + vWorkflowID,
                type: 'PUT',
                dataType: 'json',
                data: {
                    "Description": comments,
                    "User": cancelledBy
                },
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                cache: false,
                success: function (status) {
                    GetTaskDetail();
                    swal("", "This workflow has been cancelled");
                    //$("#loadingPage").fadeOut();
                    $("#cancelWorkflow").dialog("close");
                },
                error: function (status) {
                    $("#loadingPage").fadeOut();
                }
            });
        }
        else {
            $("#loadingPage").fadeOut();
            swal("", "Note can not exceed 26500 characters");
        }
    }
}

function StopWorkflow() {
    if (requiredValidator('stopWorkflow')) {
        var nicInstance = nicEditors.findEditor('txtCommentStopWorkflow');
        var vComment = CleanWordFormatFromHTML(nicInstance.getContent());
        var vNoteTextCount = vComment.replace(/<\/?[^>]+(>|$)/g, "");
        if (vNoteTextCount.length <= 26500) {
            vComment = $.trim(vComment);
            vComment = $('<div/>').text(vComment).html();
            var comments = vComment;
            var StoppedBy = "";
            if (vWorkflowInitiator != localStorage.UserName) {
                StoppedBy = localStorage.UserName
            }
            else {
                StoppedBy = localStorage.UserName
            }

            $("#loadingPage").fadeIn();
            $.ajax({
                url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Workflow/stop?workflowID=' + vWorkflowID,
                type: 'PUT',
                dataType: 'json',
                data: {
                    "Description": comments,
                    "User": StoppedBy
                },
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                cache: false,
                success: function (status) {
                    GetTaskDetail();
                    swal("", "Workflow Stopped");
                    //$("#loadingPage").fadeOut();
                    $("#stopWorkflow").dialog("close");
                },
                error: function (status) {
                    $("#loadingPage").fadeOut();
                }
            });
        }
        else {
            $("#loadingPage").fadeOut();
            swal("", "Note can not exceed 26500 characters");
        }
    }
}

function RestartWorkflow() {
    if (requiredValidator('restartWorkflow')) {
        var nicInstance = nicEditors.findEditor('txtCommentRestartWorkflow');
        var vComment = CleanWordFormatFromHTML(nicInstance.getContent());
        var vNoteTextCount = vComment.replace(/<\/?[^>]+(>|$)/g, "");
        if (vNoteTextCount.length <= 26500) {
            vComment = $.trim(vComment);
            vComment = $('<div/>').text(vComment).html();
            var comments = vComment;
            var RestartedBy = "";
            if (vWorkflowInitiator != localStorage.UserName) {
                RestartedBy = localStorage.UserName
            }
            $("#loadingPage").fadeIn();
            $.ajax({
                url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Workflow/restart?workflowID=' + vWorkflowID,
                type: 'PUT',
                dataType: 'json',
                data: {
                    "Description": comments,
                    "User": RestartedBy
                },
                headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                cache: false,
                success: function (status) {
                    GetTaskDetail();
                    swal("", "Workflow Restarted");
                    //$("#loadingPage").fadeOut();
                    $("#restartWorkflow").dialog("close");
                },
                error: function (status) {
                    $("#loadingPage").fadeOut();
                }
            });
        }
        else {
            $("#loadingPage").fadeOut();
            swal("", "Note can not exceed 26500 characters");
        }
    }
}

function docdefaultview(doccontractarea) {
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    var vDocLibFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "14" && n.Status == "ON");
    });
    var dURL = "";
    //multiple document library
    if (vDocLibFeat.length > 0) {
        dURL = vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/businessarea/contractareadetailsbyname?contractareaname=' + encodeURIComponent(doccontractarea)
    } else {
        dURL = vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/businessarea/contractareadetailsbyname?contractareaname=Business Area'
    }

    $.ajax({
        url: dURL,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        async: false,
        success: function (data) {
            if (data != '' && data != 'undefined' && typeof data != "undefined") {
                DocDefaultView = data.DocDefaultView;
            }
        },
        error: function (data) {

        }
    });
}

function viewdocinword(docurl) {
    $("#linkEditInWordOnline").attr('href', localStorage.SPHostUrl + "/_layouts/WopiFrame.aspx?sourcedoc=" + docurl + "&action=default")
    $("#showMSWordPopup").dialog("option", "title", "");
    $("#showMSWordPopup").dialog("open");

    window.open("ms-word:ofe|u|" + decodeURIComponent(docurl), "_self");
}

function req() {
    window.open("https://support.office.com/en-US/client/results?Shownav=true&lcid=1033&ns=WDWAEndUser&version=15&omkt=en-US&ver=15&apps=WDWAENDUSER%2cXLWAENDUSER%2cPPWAENDUSER%2cONWAENDUSER&HelpID=OICFailure&ui=en-US&rs=en-US&ad=US", "Ratting", "width=550,height=500,0,status=0,");
}

$('#linkEditInWordOnline').click(function () {
    $("#showMSWordPopup").dialog("close");
});

var WorkflowRoutingOptions = ""; //eO310706
function BindWorkflowSettings() {
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Workflow/settings?accountid=' + localStorage.AccountID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        contentType: 'application/json',
        cache: false,
        success: function (status) {
            $.each(status.TaskCommentRequired.split(";"), function () {
                RequiredComment.push($.trim(this));
            });
            if (status.WorkflowRoutingOptions != null && status.WorkflowRoutingOptions != "" && status.WorkflowRoutingOptions != 'undefined') {
                WorkflowRoutingOptions = status.WorkflowRoutingOptions;
                var GblRoutingOptions = status.WorkflowRoutingOptions.split(";");
                GblRoutingOptions = $.map(GblRoutingOptions, $.trim);
                if (GblRoutingOptions.indexOf("Allow adding additional Stages") == -1) {
                    if (GblRoutingOptions.indexOf("Allow over-ride of Admin Configuration") == -1) {
                        $("#spAddStage").css("display", "none");
                    }
                }
            }
            else {
                $("#spAddStage").css("display", "none");
            }

        }
    });
}

//manoj
function ViewDocument(docurl) {
    var openinbrowser = true;
    if (docurl != '') {
        if (typeof docurl === "string") {
            docurl = decodeURIComponent(docurl);
        }
        else {
            docurl = decodeURIComponent($(docurl).attr('data-value'));
        }
        var srcurl = docurl;// "https://docs.google.com/viewer?url=" + vDocumentURL + "&embedded=true";
        if (docurl.indexOf(".doc") >= 0 || docurl.indexOf(".ppt") >= 0 || docurl.indexOf(".xls") >= 0 || docurl.indexOf(".dotx") >= 0) {
            if (!Checkbrowsernameandversion()) {
                location = docurl;
                openinbrowser = false;
            } else {
                srcurl = "https://view.officeapps.live.com/op/embed.aspx?src=" + docurl + "?" + randomString() + "=" + randomString() + "&wdStartOn=1";
            }
        }
        if (docurl.indexOf(".pdf") >= 0) {
            window.open("http://docs.google.com/gview?url=" + srcurl + "?" + randomString() + "=" + randomString(), '_blank');
        } else {
            if (openinbrowser) {
                window.open(srcurl);
            }
        }
    }
}
function Openblobdocinbrowser(docurl) {
    var openinbrowser = true;
    var srcurl = "";
    var LinkUrl = decodeURIComponent($(docurl).attr('data-value'));
    if (LinkUrl.indexOf(".doc") >= 0 || LinkUrl.indexOf(".ppt") >= 0 || LinkUrl.indexOf(".xls") >= 0 || LinkUrl.indexOf(".dotx") >= 0) {
        if (!Checkbrowsernameandversion()) {
            location = LinkUrl;
            openinbrowser = false;
        } else {
            srcurl = "https://view.officeapps.live.com/op/embed.aspx?src=" + LinkUrl + "?&wdStartOn=1";
        }
    }
    if (LinkUrl.indexOf(".pdf") >= 0) {
        window.open("http://docs.google.com/gview?url=" + srcurl, '_blank');
    } else {
        if (openinbrowser) {
            window.open(srcurl);
        }
    }
}

function Openbofficedocinbrowser(docurl) {
    docurl = decodeURIComponent($(docurl).attr('data-value'));
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

function getQueryStringFromValue(url, name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(url);
    return results == null ? url : decodeURIComponent(results[1].replace(/\+/g, " "));
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
//manoj

function Loading_View_trigger() {
    //BindWorkflowSettings();
}


function BindAmendmentDetails(AmendmentID) {
    vItem = "";
    $("#ulMetadata").empty();
    var vMetadata = '';
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/amendments/amendmentdetails?amendmentid=' + AmendmentID,
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
        processData: false,
        success: function (amendmententity) {
            var vConID = '';
            if (amendmententity.ContractID != '' && vConID == '')
                vConID = amendmententity.ContractID;

            if (vConID != '') {
                $.ajax({
                    url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + vConID,
                    type: 'GET',
                    cache: false,
                    contentType: false,
                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                    processData: false,
                    success: function (item) {
                        vItem = item;
                        vMetadata += '<li class="contraRigght"><span class="toDoContenLeft width20">Amendment Title </span> <span class="toDoContenRight"><a href="javascript:void(0)" onclick="ViewAmendment(\'' + amendmententity.RowKey + '\')">' + amendmententity.AmendmentTitle + '</a></span></li>';  // Added From 2.4 Final to 2.4
                        vMetadata += '<li class="contraRigght"><span class="toDoContenLeft width20">Contract Record Title </span> <span class="toDoContenRight"><a id="' + item.RowKey + '" class="hoverPopup"  href="/Contracts/ContractDetails?ContractID=' + vConID + '&TaskID=' + vTaskID + '&Action=' + vAction + '" target="_blank">' + item.ContractTitle + '</a><a href="/Contracts/ContractDetails?ContractID=' + vConID + '&TaskID=' + vTaskID + '&Action=' + vAction + '" title="View Contract Details" target="_blank" class="linkText PreserveSpace"><img src="/Content/Images/external_link.png" id="newTabImage"></a></span></li>';
                        //vMetadata += '<li class="contraRigght"><span class="toDoContenLeft width20">Contract Record Title </span> <span class="toDoContenRight"><a href="/Contracts/ContractDetails?ContractID=' + vConID + '&TaskID=' + vTaskID + '" target="_blank" class="linkText">' + item.ContractTitle + '</a><a href="/Contracts/ContractDetails?ContractID=' + vConID + '&TaskID=' + vTaskID + '" title="View Contract Details" target="_blank" class="linkText"><img src="/Content/Images/external_link.png" id="newTabImage"></a></span></li>';  // Added From 2.4 Final to 2.4
                        vMetadata += '<li class="contraRigght"><span class="toDoContenLeft width20">Contract Record Number </span> <span class="toDoContenRight">' + item.ContractNumber + '</span></li>';
                        vMetadata += '<li class="contraRigght"><span class="toDoContenLeft width20">Contract Record Type </span> <span class="toDoContenRight">' + item.ContractType + '</span></li>';



                        $("#ulMetadata").append(vMetadata);
                        var vUser = item.ContractManagers + ";" + item.Approvers + ";" + item.Reviewers + ";" + item.Signees + ";" + item.ProjectManager
                        + ";" + item.ReadWritePermissions + ";" + item.FullControlPermissions + ";" + item.BusinessAreaOwners
                         + ";" + item.ContractAreaAdministrators + ";" + item.Requestor;
                        BindPeople(vUser);
                        hoverFunction();
                    },
                    error:
                        function (item) {
                            vMetadata += '<li class="contraRigght"><span class="toDoContenLeft width20">Amendment Title </span> <span class="toDoContenRight"><a href="/Pipeline/RequestDetails?RequestID=' + AmendmentID + '&TaskID=' + vTaskID + '" target="_blank" class="linkText">' + amendmententity.AmendmentTitle + '</a><a href="/Pipeline/RequestDetails?RequestID=' + AmendmentID + '&TaskID=' + vTaskID + '" title="View Request Details" target="_blank" class="linkText"><img src="/Content/Images/external_link.png" id="newTabImage"></a></span></li>';  // Added From 2.4 Final to 2.4                          
                            $("#ulMetadata").append(vMetadata);
                        }
                });
            }

            //vMetadata += '<li class="contraRigght"><span class="toDoContenLeft width20">Request Title </span> <span class="toDoContenRight"><a href="/Pipeline/RequestDetails?RequestID=' + RequestID + '&TaskID=' + vTaskID + '" class="linkText">' + item.RequestTitle + '</a></span></li>';



        }
    });
}

//To Open Amendment Details Popup
function ViewAmendment(amendmentID) {
    $("#loadingPage").fadeIn();
    $('#tblMetadataDetail').html('<tr><td><img src="../Content/Images/icon/loading.gif"/></td></tr>');
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/amendments/amendmentdetails?amendmentid=' + amendmentID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        "Content-Type": "application/json",
        cache: false,
        success: function (amendmententity) {
            var vMetadata = '<tr>';
            vMetadata += '<td class="text_label width50">Amendment Title</td>';
            vMetadata += '<td class="text width50">' + amendmententity.AmendmentTitle + '</td>';
            vMetadata += '</tr>';
            vMetadata += '<tr>';
            vMetadata += '<td class="text_label width50">Amendment Type</td>';
            vMetadata += '<td class="text width50">' + amendmententity.AmendmentType + '</td>';
            vMetadata += '</tr>';
            vMetadata += '<tr>';
            vMetadata += '<td class="text_label width50">Reason for Amendment</td>';
            vMetadata += '<td class="text width50">' + amendmententity.AmendmentDescription + '</td>';
            vMetadata += '</tr>';
            vMetadata += '<tr>';
            vMetadata += '<td class="text_label width40">Amendment Finalized</td>';
            vMetadata += '<td class="text width60">';
            if (amendmententity.AmendmentFinalized != '') {
                vMetadata += amendmententity.AmendmentFinalized;
            }
            vMetadata += '</td>';
            vMetadata += '</tr>';
            vMetadata += '<tr>';
            vMetadata += '<td class="text_label width40">Finalized Date</td>';
            vMetadata += '<td class="text width60">';
            if (amendmententity.AmendmentFinalizedDate != null && amendmententity.AmendmentFinalizedDate != '') {
                var completedate = "";

                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                { completedate = amendmententity.AmendmentFinalizedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                else {
                    if (localStorage.AppDateFormat == 'DD/MM/YYYY') { completedate = amendmententity.AmendmentFinalizedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1'); }
                    else if (localStorage.AppDateFormat == 'MM/DD/YYYY') { completedate = amendmententity.AmendmentFinalizedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                }
                vMetadata += completedate;
            }
            vMetadata += '</td>';
            vMetadata += '</tr>';
            vMetadata += '<tr>';
            vMetadata += '<td class="text_label width40">Amendment Completed</td>';
            vMetadata += '<td class="text width60">';
            if (amendmententity.AmendmentCompleted != '') {
                vMetadata += amendmententity.AmendmentCompleted;
            }
            vMetadata += '</td>';
            vMetadata += '</tr>';
            vMetadata += '<tr>';
            vMetadata += '<td class="text_label width40">Completed Date</td>';
            vMetadata += '<td class="text width60">';
            if (amendmententity.AmendmentCompletedDate != null && amendmententity.AmendmentCompletedDate != '') {
                var completedate = "";

                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                { completedate = amendmententity.AmendmentCompletedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                else {
                    if (localStorage.AppDateFormat == 'DD/MM/YYYY') { completedate = amendmententity.AmendmentCompletedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$3/$2/$1'); }
                    else if (localStorage.AppDateFormat == 'MM/DD/YYYY') { completedate = amendmententity.AmendmentCompletedDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1'); }
                }
                vMetadata += completedate;
            }
            vMetadata += '</td>';
            vMetadata += '</tr>';
            if (amendmententity.EffectiveDate != null) {
                vMetadata += '<tr>';
                vMetadata += '<td class="text_label width50">Effective Date</td>';

                var fEffectiveDate = "";
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                { fEffectiveDate = moment(new Date(amendmententity.EffectiveDate)).utc().format('MM/DD/YYYY'); }
                else { fEffectiveDate = moment(new Date(amendmententity.EffectiveDate)).utc().format(localStorage.AppDateFormat); }
                vMetadata += '<td class="text width50">' + fEffectiveDate + '</td>';
                vMetadata += '</tr>';
            }
            if (amendmententity.IsContractValidityEnabled == "Yes") {
                if (amendmententity.ContractEndDateAfterAmendment != null) {
                    vMetadata += '<tr>';
                    vMetadata += '<td class="text_label width50">Contract End Date(After Amendment)</td>';

                    var fContractEndDateAfterAmendment = "";
                    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                    { fContractEndDateAfterAmendment = moment(new Date(amendmententity.ContractEndDateAfterAmendment)).utc().format('MM/DD/YYYY'); }
                    else { fContractEndDateAfterAmendment = moment(new Date(amendmententity.ContractEndDateAfterAmendment)).utc().format(localStorage.AppDateFormat); }
                    vMetadata += '<td class="text width50">' + fContractEndDateAfterAmendment + '</td>';
                    vMetadata += '</tr>';
                }
                vMetadata += '<tr>';
                vMetadata += '<td class="text_label width50">Update (after approval) Contract Record metadata & Milestones</td>';
                vMetadata += '<td class="text width50">' + amendmententity.UpdateContractEndDate + '</td>';
                vMetadata += '</tr>';
                vMetadata += '<tr>';
                vMetadata += '<td class="text_label width50">Contract Validity Notes</td>';
                vMetadata += '<td class="text width50">' + amendmententity.ContractValidityNotes + '</td>';
                vMetadata += '</tr>';
            }

            if (amendmententity.IsContractValueEnabled == "Yes") {
                vMetadata += '<tr>';
                vMetadata += '<td class="text_label width50">Contract Value(After Amendment)</td>';
                vMetadata += '<td class="text width50">' + amendmententity.ContractValueAfterAmendment + '</td>';
                vMetadata += '</tr>';
                vMetadata += '<tr>';
                vMetadata += '<td class="text_label width50">Update (after approval) Contract Value in Contract Record</td>';
                vMetadata += '<td class="text width50">' + amendmententity.UpdateContractValue + '</td>';
                vMetadata += '</tr>';
                vMetadata += '<tr>';
                vMetadata += '<td class="text_label width50">Contract Value Notes</td>';
                vMetadata += '<td class="text width50">' + amendmententity.ContractValueNotes + '</td>';
                vMetadata += '</tr>';
            }

            if (amendmententity.IsSOWEnabled == "Yes") {
                vMetadata += '<tr>';
                vMetadata += '<td class="text_label width50">Summary of SOW/Obligation/Commitment(After Amendment)</td>';
                vMetadata += '<td class="text width50">' + amendmententity.SummaryOfSOWAfterAmendment + '</td>';
                vMetadata += '</tr>';
            }

            //get amendment documents
            $.ajax({
                url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/amendments/documents?amendmentid=' + amendmentID,
                type: 'GET',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                "Content-Type": "application/json",
                cache: false,
                success: function (data) {
                    var htmlDocu = "";
                    if (data.length > 0) {
                        $(data).each(function (i, item) {
                            htmlDocu += "<tr>";
                            htmlDocu += "<td>";
                            htmlDocu += "<a href='" + item.DocumentUrl + "' style='border-bottom: 1px dotted;color: #3F91CC !important;font-size: 12px !important;'>";
                            htmlDocu += item.DocumentName;
                            htmlDocu += "</a>";
                            htmlDocu += "</td>";
                            htmlDocu += "</tr>";
                        });
                        vMetadata += '<tr>';
                        vMetadata += '<td class="text_label width40">Attached Documents</td>';
                        vMetadata += '<td class="text width60"><table  class="width100" cellpadding="2" cellspacing="2">' + htmlDocu + '</table></td>';
                        vMetadata += '</tr>';
                    } else {
                        vMetadata += '<tr><td class="text_label width40">Attached Documents</td><td style="font-size:13px;">No items found.</td></tr>';
                    }
                    $("#loadingPage").fadeOut();
                }, error: function (data) {
                    vMetadata += '<tr><td class="text_label width40">Attached Documents</td><td style="font-size:13px;">No items found.</td></tr>';
                    $("#loadingPage").fadeOut();
                }, complete: function (data) {
                    $("#tblMetadataDetail").html(vMetadata);
                    setBlankValueToHyphen("tblMetadataDetail");
                    $("#viewMetadataDetail").dialog("option", "title", "Amendment Details");
                    $("#viewMetadataDetail").dialog("open");
                    $("#loadingPage").fadeOut();
                }
            });

        },
        error: function () {
            $("#loadingPage").fadeOut();
        },
        complete: function () {

        }
    });
}


function setBlankValueToHyphen(tableId) {
    $('#' + tableId + ' tr td').each(function () {
        var cellText = $(this).html();
        if (cellText == '' || cellText == '0') {
            $(this).html('-');
        }
    });
}


//ENH485  Featured Metadata Hover display
function hoverFunction() {
    var moveLeft = 20;
    var moveDown = 10;
    $('a.hoverPopup').hover(function (e) {
        var ContID = $(this).attr("id");
        $('#pContractTitle').html(vItem.ContractTitle + "</br>" + "<span  class=content-text>" + vItem.Description + "</span>");
        $('#tdbusinessAreas').html(vItem.BusinessArea);
        $('#tdcontracttype').html(vItem.ContractType);
        $('#tdcounterparty').html(vItem.Counterparty);
        if (vItem.Created != null) {
            var date = new Date(vItem.Created);
            $('#tdcreatedON').html(date.toLocaleDateString());
            $('#tdcreatedBY').html(vItem.CreatedBy);
        }
        else {
            $('#tdcreatedBY').html('-');
        }

        $('#tdlegalentity').html(vItem.CompanyProfile);
        $('div#pop-up').show()
         .css('top', e.pageY + moveDown)
         .css('left', e.pageX + moveLeft)
        .appendTo('body');
    }, function () {
        $('div#pop-up').hide();
    });
}

function getLoggedInUserType() {
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/users?userid=' + localStorage.UserID + '&office365emailid=',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            loggedInUserType = data.UserType;
            loggedInUserOwnerOfBA = data.OwnerOfBusinessAreas;
        }
    });
}

var oFieldGroups = [];
function BindApprovalSheetDetails(ContractID, ApprovalSheetName) {
    var ContractBaseValue;
    vItem = "";
    $("#approvalsheetsummary").empty();
    oFieldGroups = [];
    var vMetadataHeading = '';
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/approvalfieldgroupsbyname?approvalSheetName=' + ApprovalSheetName,
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        processData: false,
        success: function (item) {
            var aConEdit = "";
            $.each(item, function (index, value) {
                oFieldGroups.push([value.RowKey, value.FieldGroup, value.FieldRelatedTo]);
                if (value.FieldGroupName == "Contract Information") {
                    var bId = "b" + value.RowKey;
                    var ulId = "ul" + value.RowKey;
                    var imgId = "img" + value.RowKey;
                    aConEdit = "a" + value.RowKey;
                    vMetadataHeading += '<div class="documents-Head"><span class="documentsLeft"><b id="' + bId + '">' + value.FieldGroup + '</b>';
                    vMetadataHeading += '<a href="javascript:void(0);" id="' + aConEdit + '" class="Contribute StatusPermission" target="_blank"  title="Edit" style="padding: 0px !important;border: none;"> <img src="/Content/Images/edit.png">&nbsp;</a></span><span class="documentsRight"><a href="javascript:void(0);" onclick="javascript: togglediv(\'' + ulId + '\', \'' + imgId + '\');"><img src="../Content/Images/dp-dup.png" title="Collapse" id="' + imgId + '" /></a></span></div>';
                    vMetadataHeading += '<ul id="' + ulId + '" class="margin-top-10"></ul>';
                }
                else {
                    var bId = "b" + value.RowKey;
                    var ulId = "ul" + value.RowKey;
                    var imgId = "img" + value.RowKey;
                    vMetadataHeading += '<div class="documents-Head"><span class="documentsLeft"><b id="' + bId + '">' + value.FieldGroup + '</b></span><span class="documentsRight"><a href="javascript:void(0);" onclick="javascript: togglediv(\'' + ulId + '\', \'' + imgId + '\');"><img src="../Content/Images/dp-dup.png" title="Collapse" id="' + imgId + '" /></a></span></div>';
                    vMetadataHeading += '<ul id="' + ulId + '" class="margin-top-10"></ul>';
                }

            });
            $("#approvalsheetsummary").append(vMetadataHeading);
            $("#approvalsheetsummary").find("li")
            $("#approvalsheetsummary").find("ul").each(function () {
                $(this).empty();
            });
            $.ajax({
                url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/approvalsheets/metadatas?approvalsheetname=' + ApprovalSheetName,
                type: 'GET',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                cache: false,
                success: function (metadataFieldsvaluetocheck) {
                    $.ajax({
                        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Contracts/IContractDetails?contractid=' + ContractID,
                        type: 'GET',
                        dataType: 'json',
                        headers: { 'eContracts-ApiKey': localStorage.APIKey },
                        cache: false,
                        success: function (mainmetadataFields) {
                            var vMetadata = $(mainmetadataFields).find('Metadata');

                            if (aConEdit != "") {
                                var constatus = ($(vMetadata).find("Status").text() != null && $(vMetadata).find("Status").text() != "") ? $(vMetadata).find("Status").text() : "";
                                var conFinalize = ($(vMetadata).find("IsFinalized").text() != null && $(vMetadata).find("IsFinalized").text() != "") ? $(vMetadata).find("IsFinalized").text() : "";
                                var conStage = "";
                                ContractBaseValue = ($(vMetadata).find("ContractValue").text() != null && $(vMetadata).find("ContractValue").text() != "") ? $(vMetadata).find("ContractValue").text() : "";
                                var arrstatus = ["Ready for Signature", "Awaiting Signatures", "Signed", "Active", "Up for Renewal", "Renewed", "Extended", "On Hold", "Replaced", "Expired", "Cancelled", "Terminated", "Archived", "About to Expire"];
                                if (arrstatus.indexOf(constatus.trim()) > -1) {
                                    conStage = '';
                                }
                                else {
                                    conStage = 'pipeline';
                                }
                                var conType = ($(vMetadata).find("ContractType").text() != null && $(vMetadata).find("ContractType").text() != "") ? $(vMetadata).find("ContractType").text() : "";
                                if (conFinalize == "Yes") {
                                    $("#" + aConEdit + "").attr({
                                        "href": "/Contracts/EditContract?ContractID=" + ContractID + "&ContractType=" + encodeURIComponent(conType)
                                    });

                                } else {
                                    $("#" + aConEdit + "").attr({
                                        "href": "/Contracts/EditContract?ContractID=" + ContractID + "&ContractType=" + encodeURIComponent(conType) + "&Stage=" + conStage
                                    });
                                }
                            }

                            var datalenght = metadataFieldsvaluetocheck.length;
                            var oEachContractli = false;
                            var ulContractIdLoop = "";
                            var ulGroups = $.grep(oFieldGroups, function (value) {
                                return value[2] == "Contract";
                            });
                            if (ulGroups instanceof Array) {
                                $.each(ulGroups, function (key, value) {
                                    if (value instanceof Array) {
                                        var oCompContractData = "";
                                        var iColumnCount = 0;
                                        ulContractIdLoop = value[0];

                                        for (var i = 0; i < datalenght; i++) {
                                            var item = metadataFieldsvaluetocheck[i];
                                            var ulIdLoop = "";
                                            var RequiredDate = '';
                                            var ulValue = '';

                                            //remove id from array
                                            ulIdLoop = $.grep(oFieldGroups, function (value) {
                                                return value[1] == item.FieldGroup;
                                            })[0];
                                            if (ulIdLoop instanceof Array)
                                                ulIdLoop = ulIdLoop[0]

                                            if (item.FieldRelatedTo == "Contract") {
                                                if (ulContractIdLoop == ulIdLoop) {
                                                    if (item.FieldName == "ContractTitle") {
                                                        var valuetobindinfield = ($(vMetadata).find(item.FieldName).text() != null && $(vMetadata).find(item.FieldName).text() != "") ? $(vMetadata).find(item.FieldName).text() : "-";
                                                        if (valuetobindinfield != "-") {
                                                            if (iColumnCount % 2 === 0) {
                                                                if (iColumnCount == 0) {
                                                                    oCompContractData = '<li class="contraRigght">';
                                                                }
                                                                else {
                                                                    oCompContractData += '<li class="contraRigght">';
                                                                }
                                                                oCompContractData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">Contract Record Title </span> <span class="toDoContenRight width30"><a href="/Contracts/ContractDetails?ContractID=' + ContractID + '&TaskID=' + vTaskID + '&Action=' + vAction + '" target="_blank" class="linkText PreserveSpace">' + valuetobindinfield + '</a><a href="/Contracts/ContractDetails?ContractID=' + ContractID + '&TaskID=' + vTaskID + '&Action=' + vAction + '" title="View Contract Details" target="_blank" class="linkText PreserveSpace"><img src="/Content/Images/external_link.png" id="newTabImage"></a></span>';
                                                                iColumnCount = iColumnCount + 1;
                                                                oEachContractli = true;
                                                            }
                                                            else {
                                                                oCompContractData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">Contract Record Title </span> <span class="toDoContenRight width30"><a href="/Contracts/ContractDetails?ContractID=' + ContractID + '&TaskID=' + vTaskID + '&Action=' + vAction + '" target="_blank" class="linkText PreserveSpace">' + valuetobindinfield + '</a><a href="/Contracts/ContractDetails?ContractID=' + ContractID + '&TaskID=' + vTaskID + '&Action=' + vAction + '" title="View Contract Details" target="_blank" class="linkText PreserveSpace"><img src="/Content/Images/external_link.png" id="newTabImage"></a></span>';
                                                                oCompContractData += '</li>';
                                                                iColumnCount = iColumnCount + 1;
                                                                oEachContractli = false;
                                                            }
                                                        }
                                                        else {
                                                            if (iColumnCount % 2 === 0) {
                                                                if (iColumnCount == 0) {
                                                                    oCompContractData = '<li class="contraRigght">';
                                                                }
                                                                else {
                                                                    oCompContractData += '<li class="contraRigght">';
                                                                }
                                                                oCompContractData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">Contract Record Title </span> <span class="toDoContenRight width30">' + valuetobindinfield + '</span>';
                                                                iColumnCount = iColumnCount + 1;
                                                                oEachContractli = true;
                                                            }
                                                            else {
                                                                oCompContractData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">Contract Record Title </span> <span class="toDoContenRight width30">' + valuetobindinfield + '</span>';
                                                                oCompContractData += '</li>';
                                                                iColumnCount = iColumnCount + 1;
                                                                oEachContractli = false;
                                                            }
                                                        }
                                                    }
                                                    else {
                                                        var valuetobindinfield = ($(vMetadata).find(item.FieldName).text() != null && $(vMetadata).find(item.FieldName).text() != "") ? $(vMetadata).find(item.FieldName).text() : "-";
                                                        if (item.FieldType == 'Date' && valuetobindinfield != "" && valuetobindinfield != '-') {
                                                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                                                                RequiredDate = moment(new Date(valuetobindinfield)).utc().format('MM/DD/YYYY');
                                                            }
                                                            else {
                                                                RequiredDate = moment(new Date(valuetobindinfield)).utc().format(localStorage.AppDateFormat);
                                                            }

                                                            if (iColumnCount % 2 === 0) {
                                                                if (iColumnCount == 0) {
                                                                    oCompContractData = '<li class="contraRigght">';
                                                                }
                                                                else {
                                                                    oCompContractData += '<li class="contraRigght">';
                                                                }
                                                                oCompContractData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + item.FieldDisplayName + ' </span> <span class="toDoContenRight width30">' + RequiredDate + '</span>';
                                                                iColumnCount = iColumnCount + 1;
                                                                oEachContractli = true;
                                                            }
                                                            else {
                                                                oCompContractData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + item.FieldDisplayName + ' </span> <span class="toDoContenRight width30">' + RequiredDate + '</span>';
                                                                oCompContractData += '</li>';
                                                                iColumnCount = iColumnCount + 1;
                                                                oEachContractli = false;
                                                            }
                                                        }
                                                        else if (item.FieldType == 'Phone Number' && valuetobindinfield != "" && valuetobindinfield != '-') {
                                                            if (typeof ($(vMetadata).find(item.FieldName).text()) != "undefined" && $(vMetadata).find(item.FieldName).text() != null && $(vMetadata).find(item.FieldName).text() != "") {
                                                                if (typeof (valuetobindinfield.split(',')[2]) != "undefined" && valuetobindinfield.split(',')[2] != null && valuetobindinfield.split(',')[2] != "") {
                                                                    if (iColumnCount % 2 === 0) {
                                                                        if (iColumnCount == 0) {
                                                                            oCompContractData = '<li class="contraRigght">';
                                                                        }
                                                                        else {
                                                                            oCompContractData += '<li class="contraRigght">';
                                                                        }
                                                                        oCompContractData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + item.FieldDisplayName + ' </span> <span class="toDoContenRight width30"> +' + valuetobindinfield.split(',')[2].trim() + '</span>';
                                                                        iColumnCount = iColumnCount + 1;
                                                                        oEachContractli = true;
                                                                    }
                                                                    else {
                                                                        oCompContractData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + item.FieldDisplayName + ' </span> <span class="toDoContenRight width30"> +' + valuetobindinfield.split(',')[2].trim() + '</span>';
                                                                        oCompContractData += '</li>';
                                                                        iColumnCount = iColumnCount + 1;
                                                                        oEachContractli = false;
                                                                    }
                                                                }
                                                                else {
                                                                    if (iColumnCount % 2 === 0) {
                                                                        if (iColumnCount == 0) {
                                                                            oCompContractData = '<li class="contraRigght">';
                                                                        }
                                                                        else {
                                                                            oCompContractData += '<li class="contraRigght">';
                                                                        }
                                                                        oCompContractData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + item.FieldDisplayName + ' </span> <span class="toDoContenRight width30">-</span>';
                                                                        iColumnCount = iColumnCount + 1;
                                                                        oEachContractli = true;
                                                                    }
                                                                    else {
                                                                        oCompContractData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + item.FieldDisplayName + ' </span> <span class="toDoContenRight width30">-</span>';
                                                                        oCompContractData += '</li>';
                                                                        iColumnCount = iColumnCount + 1;
                                                                        oEachContractli = false;
                                                                    }
                                                                }
                                                            }
                                                            else {
                                                                if (iColumnCount % 2 === 0) {
                                                                    if (iColumnCount == 0) {
                                                                        oCompContractData = '<li class="contraRigght">';
                                                                    }
                                                                    else {
                                                                        oCompContractData += '<li class="contraRigght">';
                                                                    }
                                                                    oCompContractData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + item.FieldDisplayName + ' </span> <span class="toDoContenRight width30">-</span>';
                                                                    iColumnCount = iColumnCount + 1;
                                                                    oEachContractli = true;
                                                                }
                                                                else {
                                                                    oCompContractData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + item.FieldDisplayName + ' </span> <span class="toDoContenRight width30">-</span>';
                                                                    oCompContractData += '</li>';
                                                                    iColumnCount = iColumnCount + 1;
                                                                    oEachContractli = false;
                                                                }
                                                            }
                                                        }
                                                        else if ((item.FieldType == 'Number-P' || item.FieldType == 'Number-PD') && valuetobindinfield != "" && valuetobindinfield != '-') {
                                                            if (typeof (valuetobindinfield) != "undefined" && valuetobindinfield != null && valuetobindinfield != "") {
                                                                if (iColumnCount % 2 === 0) {
                                                                    if (iColumnCount == 0) {
                                                                        oCompContractData = '<li class="contraRigght">';
                                                                    }
                                                                    else {
                                                                        oCompContractData += '<li class="contraRigght">';
                                                                    }
                                                                    oCompContractData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + item.FieldDisplayName + ' </span> <span class="toDoContenRight width30">' + valuetobindinfield + ' %</span>';
                                                                    iColumnCount = iColumnCount + 1;
                                                                    oEachContractli = true;
                                                                }
                                                                else {
                                                                    oCompContractData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + item.FieldDisplayName + ' </span> <span class="toDoContenRight width30">' + valuetobindinfield + ' %</span>';
                                                                    oCompContractData += '</li>';
                                                                    iColumnCount = iColumnCount + 1;
                                                                    oEachContractli = false;
                                                                }
                                                            }
                                                            else {
                                                                if (iColumnCount % 2 === 0) {
                                                                    if (iColumnCount == 0) {
                                                                        oCompContractData = '<li class="contraRigght">';
                                                                    }
                                                                    else {
                                                                        oCompContractData += '<li class="contraRigght">';
                                                                    }
                                                                    oCompContractData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + item.FieldDisplayName + ' </span> <span class="toDoContenRight width30">-</span>';
                                                                    iColumnCount = iColumnCount + 1;
                                                                    oEachContractli = true;
                                                                }
                                                                else {
                                                                    oCompContractData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + item.FieldDisplayName + ' </span> <span class="toDoContenRight width30">-</span>';
                                                                    oCompContractData += '</li>';
                                                                    iColumnCount = iColumnCount + 1;
                                                                    oEachContractli = false;
                                                                }
                                                            }
                                                        }
                                                        else if (item.FieldType == 'Yes/No' && valuetobindinfield != "" && valuetobindinfield != '-') {
                                                            if (typeof (valuetobindinfield) != "undefined" && valuetobindinfield != null && valuetobindinfield != "") {
                                                                var valuetobindinfieldCmt = ($(vMetadata).find('CustomCMD' + item.FieldName).text() != null && $(vMetadata).find('CustomCMD' + item.FieldName).text() != "") ? $(vMetadata).find('CustomCMD' + item.FieldName).text() : "-";
                                                                if (iColumnCount % 2 === 0) {
                                                                    if (iColumnCount == 0) {
                                                                        oCompContractData = '<li class="contraRigght">';
                                                                    }
                                                                    else {
                                                                        oCompContractData += '<li class="contraRigght">';
                                                                    }
                                                                    oCompContractData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + item.FieldDisplayName + ' </span> <span class="toDoContenRight width30">' + valuetobindinfield + ' (' + valuetobindinfieldCmt + ')</span>';
                                                                    iColumnCount = iColumnCount + 1;
                                                                    oEachContractli = true;
                                                                }
                                                                else {
                                                                    oCompContractData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + item.FieldDisplayName + ' </span> <span class="toDoContenRight width30">' + valuetobindinfield + ' (' + valuetobindinfieldCmt + ')</span>';
                                                                    oCompContractData += '</li>';
                                                                    iColumnCount = iColumnCount + 1;
                                                                    oEachContractli = false;
                                                                }
                                                            }
                                                            else {
                                                                if (iColumnCount % 2 === 0) {
                                                                    if (iColumnCount == 0) {
                                                                        oCompContractData = '<li class="contraRigght">';
                                                                    }
                                                                    else {
                                                                        oCompContractData += '<li class="contraRigght">';
                                                                    }
                                                                    oCompContractData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + item.FieldDisplayName + ' </span> <span class="toDoContenRight width30">-</span>';
                                                                    iColumnCount = iColumnCount + 1;
                                                                    oEachContractli = true;
                                                                }
                                                                else {
                                                                    oCompContractData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + item.FieldDisplayName + ' </span> <span class="toDoContenRight width30">-</span>';
                                                                    oCompContractData += '</li>';
                                                                    iColumnCount = iColumnCount + 1;
                                                                    oEachContractli = false;
                                                                }
                                                            }
                                                        }
                                                        else {

                                                            if (iColumnCount % 2 === 0) {
                                                                if (iColumnCount == 0) {
                                                                    oCompContractData = '<li class="contraRigght">';
                                                                }
                                                                else {
                                                                    oCompContractData += '<li class="contraRigght">';
                                                                }
                                                                oCompContractData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + item.FieldDisplayName + ' </span> <span class="toDoContenRight width30">' + valuetobindinfield + '</span>';
                                                                iColumnCount = iColumnCount + 1;
                                                                oEachContractli = true;
                                                            }
                                                            else {
                                                                oCompContractData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + item.FieldDisplayName + ' </span> <span class="toDoContenRight width30">' + valuetobindinfield + '</span>';
                                                                oCompContractData += '</li>';
                                                                iColumnCount = iColumnCount + 1;
                                                                oEachContractli = false;
                                                            }
                                                        }

                                                        RequiredDate = '';

                                                    }
                                                }

                                            }
                                        }

                                        if (ulContractIdLoop != "") {
                                            if (oEachContractli) {
                                                oCompContractData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important"></span> <span class="toDoContenRight width30"></span>';
                                                oCompContractData += '</li>';
                                                $("#ul" + ulContractIdLoop + "").append(oCompContractData);
                                            }
                                            else {
                                                if (oCompContractData != "")
                                                    $("#ul" + ulContractIdLoop + "").append(oCompContractData);
                                                else {
                                                    $("#b" + ulContractIdLoop + "").parent().parent('div').css("display", "none");
                                                    $("#ul" + ulContractIdLoop + "").css("display", "none");
                                                }
                                            }
                                        }
                                        else {
                                            ulContractIdLoop = $.grep(oFieldGroups, function (value) {
                                                return value[2] == "Contract";
                                            })[0];
                                            if (ulContractIdLoop instanceof Array)
                                                ulContractIdLoop = ulContractIdLoop[0]
                                            ulContractIdLoop = ulContractIdLoop;
                                            var ulValue = '<li class="contraRigght"><span class="toDoContenLeft" style="margin-right: 0 !important">No Contract Information is Available</span></li>';
                                            $("#ul" + ulContractIdLoop + "").append(ulValue);
                                            $("#b" + ulContractIdLoop + "").parent().parent('div').css("display", "none");
                                            $("#ul" + ulContractIdLoop + "").css("display", "none");
                                        }



                                    }
                                });
                            }



                            if ($(vMetadata).find("Counterparty").text() != null && $(vMetadata).find("Counterparty").text() != "") {
                                var filterby = "CounterpartyName:";
                                $.each($(vMetadata).find("Counterparty").text().split(';'), function (index, value) {
                                    filterby += encodeURIComponent(value.trim()) + "~";
                                });
                                filterby = removeLastChar(filterby, '~');
                                $.ajax({
                                    url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/reports/counterpartysummaryreport?filterby=' + filterby + '&sortby=' + "CounterpartyName" + '&orderby=' + "ASC",
                                    type: 'GET',
                                    dataType: 'json',
                                    'Content-Type': 'application/json',
                                    cache: false,
                                    headers: { 'eContracts-ApiKey': localStorage.APIKey },
                                    success: function (CounterpartyDatas) {
                                        CounterpartyDatas = JSON.parse(CounterpartyDatas);
                                        CounterpartyDatas = CounterpartyDatas.data;
                                        var oCompCounterPartyData = "";
                                        var ulFinalID = "";
                                        for (var c = 0; c < CounterpartyDatas.length; c++) {
                                            var item = CounterpartyDatas[c];
                                            //var cphtml = '<div style="width:50%;float:left; display:block;">';
                                            var datalenghcp = metadataFieldsvaluetocheck.length;
                                            var iColumnCPCount = 0;
                                            var oEachCPli = false;
                                            for (var cp = 0; cp < datalenghcp; cp++) {
                                                var fielditem = metadataFieldsvaluetocheck[cp];
                                                var RequiredDate = "";
                                                var ulIdLoop = "";
                                                ulIdLoop = $.grep(oFieldGroups, function (value) {
                                                    return value[1] == fielditem.FieldGroup;
                                                })[0];
                                                if (ulIdLoop instanceof Array)
                                                    ulIdLoop = ulIdLoop[0]
                                                if (fielditem.FieldRelatedTo == "Counterparty") {
                                                    if (ulFinalID == "") {
                                                        ulFinalID = ulIdLoop;
                                                    }
                                                    var valuetobindinfield = (item["" + fielditem.FieldName + ""] != null && item["" + fielditem.FieldName + ""] !== "") ? item["" + fielditem.FieldName + ""] : "-";
                                                    if (fielditem.FieldType == 'Date' && valuetobindinfield != "" && valuetobindinfield != '-') {
                                                        if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                                                            RequiredDate = moment(new Date(valuetobindinfield)).utc().format('MM/DD/YYYY');
                                                        }
                                                        else {
                                                            RequiredDate = moment(new Date(valuetobindinfield)).utc().format(localStorage.AppDateFormat);
                                                        }

                                                        if (iColumnCPCount % 2 === 0) {
                                                            if (iColumnCPCount == 0) {
                                                                if (c == 0)
                                                                    oCompCounterPartyData = '<li class="contraRigght">';
                                                                else
                                                                    oCompCounterPartyData += '<li class="contraRigght">';
                                                            }
                                                            else {
                                                                oCompCounterPartyData += '<li class="contraRigght">';
                                                            }
                                                            oCompCounterPartyData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + fielditem.FieldDisplayName + ' </span> <span class="toDoContenRight width30">' + RequiredDate + '</span>';
                                                            iColumnCPCount = iColumnCPCount + 1;
                                                            oEachCPli = true;
                                                        }
                                                        else {
                                                            oCompCounterPartyData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + fielditem.FieldDisplayName + ' </span> <span class="toDoContenRight width30">' + RequiredDate + '</span>';
                                                            oCompCounterPartyData += '</li>';
                                                            iColumnCPCount = iColumnCPCount + 1;
                                                            oEachCPli = false;
                                                        }
                                                    }
                                                    else if (fielditem.FieldType == 'Phone Number' && valuetobindinfield != "" && valuetobindinfield != '-') {
                                                        if (typeof (item["" + fielditem.FieldName + ""]) != "undefined" && item["" + fielditem.FieldName + ""] != null && item["" + fielditem.FieldName + ""] != "") {
                                                            if (typeof (valuetobindinfield.split(',')[2]) != "undefined" && valuetobindinfield.split(',')[2] != null && valuetobindinfield.split(',')[2] != "") {
                                                                if (iColumnCPCount % 2 === 0) {
                                                                    if (iColumnCPCount == 0) {
                                                                        if (c == 0)
                                                                            oCompCounterPartyData = '<li class="contraRigght">';
                                                                        else
                                                                            oCompCounterPartyData += '<li class="contraRigght">';
                                                                    }
                                                                    else {
                                                                        oCompCounterPartyData += '<li class="contraRigght">';
                                                                    }
                                                                    oCompCounterPartyData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + fielditem.FieldDisplayName + ' </span> <span class="toDoContenRight width30"> +' + valuetobindinfield.split(',')[2].trim() + '</span>';
                                                                    iColumnCPCount = iColumnCPCount + 1;
                                                                    oEachCPli = true;
                                                                }
                                                                else {
                                                                    oCompCounterPartyData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + fielditem.FieldDisplayName + ' </span> <span class="toDoContenRight width30"> +' + valuetobindinfield.split(',')[2].trim() + '</span>';
                                                                    oCompCounterPartyData += '</li>';
                                                                    iColumnCPCount = iColumnCPCount + 1;
                                                                    oEachCPli = false;
                                                                }
                                                            }
                                                            else {
                                                                if (iColumnCPCount % 2 === 0) {
                                                                    if (iColumnCPCount == 0) {
                                                                        if (c == 0)
                                                                            oCompCounterPartyData = '<li class="contraRigght">';
                                                                        else
                                                                            oCompCounterPartyData += '<li class="contraRigght">';
                                                                    }
                                                                    else {
                                                                        oCompCounterPartyData += '<li class="contraRigght">';
                                                                    }
                                                                    oCompCounterPartyData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + fielditem.FieldDisplayName + ' </span> <span class="toDoContenRight width30">-</span>';
                                                                    iColumnCPCount = iColumnCPCount + 1;
                                                                    oEachCPli = true;
                                                                }
                                                                else {
                                                                    oCompCounterPartyData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + fielditem.FieldDisplayName + ' </span> <span class="toDoContenRight width30">-</span>';
                                                                    oCompCounterPartyData += '</li>';
                                                                    iColumnCPCount = iColumnCPCount + 1;
                                                                    oEachCPli = false;
                                                                }
                                                            }
                                                        }
                                                        else {
                                                            if (iColumnCPCount % 2 === 0) {
                                                                if (iColumnCPCount == 0) {
                                                                    if (c == 0)
                                                                        oCompCounterPartyData = '<li class="contraRigght">';
                                                                    else
                                                                        oCompCounterPartyData += '<li class="contraRigght">';
                                                                }
                                                                else {
                                                                    oCompCounterPartyData += '<li class="contraRigght">';
                                                                }
                                                                oCompCounterPartyData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + fielditem.FieldDisplayName + ' </span> <span class="toDoContenRight width30">-</span>';
                                                                iColumnCPCount = iColumnCPCount + 1;
                                                                oEachCPli = true;
                                                            }
                                                            else {
                                                                oCompCounterPartyData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + fielditem.FieldDisplayName + ' </span> <span class="toDoContenRight width30">-</span>';
                                                                oCompCounterPartyData += '</li>';
                                                                iColumnCPCount = iColumnCPCount + 1;
                                                                oEachCPli = false;
                                                            }
                                                        }
                                                    }
                                                    else if ((fielditem.FieldType == 'Number-P' || fielditem.FieldType == 'Number-PD') && valuetobindinfield != "" && valuetobindinfield != '-') {
                                                        if (typeof (valuetobindinfield) != "undefined" && valuetobindinfield != null && valuetobindinfield != "") {
                                                            if (iColumnCPCount % 2 === 0) {
                                                                if (iColumnCPCount == 0) {
                                                                    if (c == 0)
                                                                        oCompCounterPartyData = '<li class="contraRigght">';
                                                                    else
                                                                        oCompCounterPartyData += '<li class="contraRigght">';
                                                                }
                                                                else {
                                                                    oCompCounterPartyData += '<li class="contraRigght">';
                                                                }
                                                                oCompCounterPartyData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + fielditem.FieldDisplayName + ' </span> <span class="toDoContenRight width30">' + valuetobindinfield.trim() + ' %</span>';
                                                                iColumnCPCount = iColumnCPCount + 1;
                                                                oEachCPli = true;
                                                            }
                                                            else {
                                                                oCompCounterPartyData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + fielditem.FieldDisplayName + ' </span> <span class="toDoContenRight width30">' + valuetobindinfield + ' %</span>';
                                                                oCompCounterPartyData += '</li>';
                                                                iColumnCPCount = iColumnCPCount + 1;
                                                                oEachCPli = false;
                                                            }
                                                        }
                                                        else {
                                                            if (iColumnCPCount % 2 === 0) {
                                                                if (iColumnCPCount == 0) {
                                                                    if (c == 0)
                                                                        oCompCounterPartyData = '<li class="contraRigght">';
                                                                    else
                                                                        oCompCounterPartyData += '<li class="contraRigght">';
                                                                }
                                                                else {
                                                                    oCompCounterPartyData += '<li class="contraRigght">';
                                                                }
                                                                oCompCounterPartyData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + fielditem.FieldDisplayName + ' </span> <span class="toDoContenRight width30">-</span>';
                                                                iColumnCPCount = iColumnCPCount + 1;
                                                                oEachCPli = true;
                                                            }
                                                            else {
                                                                oCompCounterPartyData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + fielditem.FieldDisplayName + ' </span> <span class="toDoContenRight width30">-</span>';
                                                                oCompCounterPartyData += '</li>';
                                                                iColumnCPCount = iColumnCPCount + 1;
                                                                oEachCPli = false;
                                                            }
                                                        }
                                                    }
                                                    else if (fielditem.FieldType == 'Yes/No' && valuetobindinfield != "" && valuetobindinfield != '-') {
                                                        if (typeof (valuetobindinfield) != "undefined" && valuetobindinfield != null && valuetobindinfield != "") {
                                                            var valuetobindinfieldCmt = (item["" + 'CustomCMD' + fielditem.FieldName + ""] != null && item["" + 'CustomCMD' + fielditem.FieldName + ""] !== "") ? item["" + 'CustomCMD' + fielditem.FieldName + ""] : "-";
                                                            if (iColumnCPCount % 2 === 0) {
                                                                if (iColumnCPCount == 0) {
                                                                    if (c == 0)
                                                                        oCompCounterPartyData = '<li class="contraRigght">';
                                                                    else
                                                                        oCompCounterPartyData += '<li class="contraRigght">';
                                                                }
                                                                else {
                                                                    oCompCounterPartyData += '<li class="contraRigght">';
                                                                }
                                                                oCompCounterPartyData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + fielditem.FieldDisplayName + ' </span> <span class="toDoContenRight width30">' + valuetobindinfield.trim() + ' (' + valuetobindinfieldCmt + ')</span>';
                                                                iColumnCPCount = iColumnCPCount + 1;
                                                                oEachCPli = true;
                                                            }
                                                            else {
                                                                oCompCounterPartyData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + fielditem.FieldDisplayName + ' </span> <span class="toDoContenRight width30">' + valuetobindinfield + ' (' + valuetobindinfieldCmt + ')</span>';
                                                                oCompCounterPartyData += '</li>';
                                                                iColumnCPCount = iColumnCPCount + 1;
                                                                oEachCPli = false;
                                                            }
                                                        }
                                                        else {
                                                            if (iColumnCPCount % 2 === 0) {
                                                                if (iColumnCPCount == 0) {
                                                                    if (c == 0)
                                                                        oCompCounterPartyData = '<li class="contraRigght">';
                                                                    else
                                                                        oCompCounterPartyData += '<li class="contraRigght">';
                                                                }
                                                                else {
                                                                    oCompCounterPartyData += '<li class="contraRigght">';
                                                                }
                                                                oCompCounterPartyData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + fielditem.FieldDisplayName + ' </span> <span class="toDoContenRight width30">-</span>';
                                                                iColumnCPCount = iColumnCPCount + 1;
                                                                oEachCPli = true;
                                                            }
                                                            else {
                                                                oCompCounterPartyData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + fielditem.FieldDisplayName + ' </span> <span class="toDoContenRight width30">-</span>';
                                                                oCompCounterPartyData += '</li>';
                                                                iColumnCPCount = iColumnCPCount + 1;
                                                                oEachCPli = false;
                                                            }
                                                        }
                                                    }
                                                    else {
                                                        if (iColumnCPCount % 2 === 0) {
                                                            if (iColumnCPCount == 0) {
                                                                if (c == 0)
                                                                    oCompCounterPartyData = '<li class="contraRigght">';
                                                                else
                                                                    oCompCounterPartyData += '<li class="contraRigght">';
                                                            }
                                                            else {
                                                                oCompCounterPartyData += '<li class="contraRigght">';
                                                            }
                                                            oCompCounterPartyData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + fielditem.FieldDisplayName + ' </span> <span class="toDoContenRight width30">' + valuetobindinfield + '</span>';
                                                            iColumnCPCount = iColumnCPCount + 1;
                                                            oEachCPli = true;
                                                        }
                                                        else {
                                                            oCompCounterPartyData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + fielditem.FieldDisplayName + ' </span> <span class="toDoContenRight width30">' + valuetobindinfield + '</span>';
                                                            oCompCounterPartyData += '</li>';
                                                            iColumnCPCount = iColumnCPCount + 1;
                                                            oEachCPli = false;
                                                        }

                                                    }

                                                }
                                            }
                                            if (oEachCPli) {
                                                oCompCounterPartyData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important"></span> <span class="toDoContenRight width30"></span>';
                                                oCompCounterPartyData += '</li>';
                                            }

                                            oCompCounterPartyData += "<li class='contraRigght' style='border-bottom: 1px dashed #807979;'></li>";
                                        }

                                        if (ulFinalID != "") {
                                            $("#ul" + ulFinalID + "").append(oCompCounterPartyData);
                                            if (oCompCounterPartyData == "") {
                                                $("#b" + ulFinalID + "").parent().parent('div').css("display", "none");
                                                $("#ul" + ulFinalID + "").css("display", "none");
                                            }
                                        }
                                        else {
                                            ulIdLoop = $.grep(oFieldGroups, function (value) {
                                                return value[2] == "Counterparty";
                                            })[0];
                                            if (ulIdLoop instanceof Array)
                                                ulIdLoop = ulIdLoop[0]
                                            ulFinalID = ulIdLoop;
                                            var ulValue = '<li class="contraRigght"><span class="toDoContenLeft" style="margin-right: 0 !important">No Counterparty Information is Available</span></li>';
                                            $("#ul" + ulFinalID + "").append(ulValue);
                                            $("#b" + ulFinalID + "").parent().parent('div').css("display", "none");
                                            $("#ul" + ulFinalID + "").css("display", "none");
                                        }

                                    },
                                    error:
                                function (CounterpartyDatas) {
                                    var datalenghcp = metadataFieldsvaluetocheck.length;
                                    var FinalLoopId = "";
                                    for (var cp = 0; cp < datalenghcp; cp++) {
                                        var fielditem = metadataFieldsvaluetocheck[cp];
                                        var ulIdLoop = "";
                                        ulIdLoop = $.grep(oFieldGroups, function (value) {
                                            return value[1] == fielditem.FieldGroup;
                                        })[0];
                                        if (ulIdLoop instanceof Array)
                                            ulIdLoop = ulIdLoop[0]
                                        if (fielditem.FieldRelatedTo == "Counterparty") {
                                            FinalLoopId = ulIdLoop;
                                        }
                                    }
                                    if (FinalLoopId != "") {
                                        var ulValue = '<li class="contraRigght"><span class="toDoContenLeft" style="margin-right: 0 !important">No Counterparty Information is Available</span></li>';
                                        $("#ul" + FinalLoopId + "").append(ulValue);
                                        $("#b" + FinalLoopId + "").parent().parent('div').css("display", "none");
                                        $("#ul" + FinalLoopId + "").css("display", "none");
                                    }
                                    else {
                                        ulIdLoop = $.grep(oFieldGroups, function (value) {
                                            return value[2] == "Counterparty";
                                        })[0];
                                        if (ulIdLoop instanceof Array)
                                            ulIdLoop = ulIdLoop[0]
                                        FinalLoopId = ulIdLoop;
                                        var ulValue = '<li class="contraRigght"><span class="toDoContenLeft" style="margin-right: 0 !important">No Counterparty Information is Available</span></li>';
                                        $("#ul" + FinalLoopId + "").append(ulValue);
                                        $("#b" + FinalLoopId + "").parent().parent('div').css("display", "none");
                                        $("#ul" + FinalLoopId + "").css("display", "none");
                                    }

                                }
                                });
                            }
                            else {
                                var datalenghcp = metadataFieldsvaluetocheck.length;
                                var FinalLoopId = "";
                                for (var cp = 0; cp < datalenghcp; cp++) {
                                    var fielditem = metadataFieldsvaluetocheck[cp];
                                    var ulIdLoop = "";
                                    ulIdLoop = $.grep(oFieldGroups, function (value) {
                                        return value[1] == fielditem.FieldGroup;
                                    })[0];
                                    if (ulIdLoop instanceof Array)
                                        ulIdLoop = ulIdLoop[0]
                                    if (fielditem.FieldRelatedTo == "Counterparty") {
                                        FinalLoopId = ulIdLoop;
                                    }
                                }
                                if (FinalLoopId != "") {
                                    var ulValue = '<li class="contraRigght"><span class="toDoContenLeft" style="margin-right: 0 !important">No Counterparty Information is Available</span></li>';
                                    $("#ul" + FinalLoopId + "").append(ulValue);
                                    $("#b" + FinalLoopId + "").parent().parent('div').css("display", "none");
                                    $("#ul" + FinalLoopId + "").css("display", "none");
                                }
                                else {
                                    ulIdLoop = $.grep(oFieldGroups, function (value) {
                                        return value[2] == "Counterparty";
                                    })[0];
                                    if (ulIdLoop instanceof Array)
                                        ulIdLoop = ulIdLoop[0]
                                    FinalLoopId = ulIdLoop;
                                    var ulValue = '<li class="contraRigght"><span class="toDoContenLeft" style="margin-right: 0 !important">No Counterparty Information is Available</span></li>';
                                    $("#ul" + FinalLoopId + "").append(ulValue);
                                    $("#b" + FinalLoopId + "").parent().parent('div').css("display", "none");
                                    $("#ul" + FinalLoopId + "").css("display", "none");
                                }
                            }


                        },
                        error: function (mainmetadataFields) {
                            var datalenght = metadataFieldsvaluetocheck.length;
                            for (var i = 0; i < datalenght; i++) {
                                var item = metadataFieldsvaluetocheck[i];
                                var ulIdLoop = "";
                                //remove id from array
                                ulIdLoop = $.grep(oFieldGroups, function (value) {
                                    return value[1] == item.FieldGroup;
                                })[0];
                                if (ulIdLoop instanceof Array)
                                    ulIdLoop = ulIdLoop[0]
                                if (item.FieldRelatedTo == "Contract") {
                                    var ulValue = '<li class="contraRigght"><span class="toDoContenLeft" style="margin-right: 0 !important">No Contract Information is Available</span></li>';
                                    $("#ul" + ulIdLoop + "").append(ulValue);
                                }
                            }
                        }
                    });
                    $.ajax({
                        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/amendments?contractid=' + ContractID,
                        type: 'GET',
                        dataType: 'json',
                        headers: { 'eContracts-ApiKey': localStorage.APIKey },
                        cache: false,
                        success: function (AmendmentData) {
                            var oCompAmmendmentData = "";
                            var ulFinalID = "";
                            var iColumnACount = 0;
                            $(AmendmentData).each(function (i, item) {
                                var cphtml = '';
                                var oEachAmmendmentli = false;
                                var RequiredDate = "";
                                var datalenghcp = metadataFieldsvaluetocheck.length;
                                for (var a = 0; a < datalenghcp; a++) {
                                    var fielditem = metadataFieldsvaluetocheck[a];
                                    var ulIdLoop = "";
                                    //remove id from array
                                    ulIdLoop = $.grep(oFieldGroups, function (value) {
                                        return value[1] == fielditem.FieldGroup;
                                    })[0];
                                    if (ulIdLoop instanceof Array)
                                        ulIdLoop = ulIdLoop[0]
                                    if (fielditem.FieldRelatedTo == "Amendment") {
                                        if (ulFinalID == "") {
                                            ulFinalID = ulIdLoop;
                                        }
                                        var valuetobindinfield = (item["" + fielditem.FieldName + ""] != null && item["" + fielditem.FieldName + ""] !== "") ? item["" + fielditem.FieldName + ""] : "-";
                                        if (fielditem.FieldType == 'Date' && valuetobindinfield != "" && valuetobindinfield != '-') {
                                            if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "") {
                                                RequiredDate = moment(new Date(valuetobindinfield)).utc().format('MM/DD/YYYY');
                                            }
                                            else {
                                                RequiredDate = moment(new Date(valuetobindinfield)).utc().format(localStorage.AppDateFormat);
                                            }

                                            if (iColumnACount % 2 === 0) {
                                                if (iColumnACount == 0) {
                                                    oCompAmmendmentData = '<li class="contraRigght">';
                                                }
                                                else {
                                                    oCompAmmendmentData += '<li class="contraRigght">';
                                                }
                                                oCompAmmendmentData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + fielditem.FieldDisplayName + ' </span> <span class="toDoContenRight width30">' + RequiredDate + '</span>';
                                                iColumnACount = iColumnACount + 1;
                                                oEachAmmendmentli = true;
                                            }
                                            else {
                                                oCompAmmendmentData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + fielditem.FieldDisplayName + ' </span> <span class="toDoContenRight width30">' + RequiredDate + '</span>';
                                                oCompAmmendmentData += '</li>';
                                                iColumnACount = iColumnACount + 1;
                                                oEachAmmendmentli = false;
                                            }
                                        }
                                        else if (fielditem.FieldName == 'ContractValueAfterAmendment') {
                                            if (typeof (valuetobindinfield) != "undefined" && valuetobindinfield != null && valuetobindinfield != "" && valuetobindinfield != "-") {
                                                ContractBaseValue = valuetobindinfield;
                                                $('#lblContractValueAmendment').text(valuetobindinfield);
                                                var vContractValueSetting = vCurrencySettings.IsContractValueInBaseCurrency;
                                                var vSCurrency = "";
                                                if (vContractValueSetting == "Display Contract Values in Base Currency") {
                                                    if (vCurrencySettings.CurrencyDisplayStyle == "UK") {
                                                        $('#lblContractValueAmendment').autoNumeric('init', {
                                                            vMax: '99999999999999999999.99'
                                                        });
                                                        $('#lblContractValueAmendment').autoNumeric('set', item["" + fielditem.FieldName + ""])

                                                    } else if (vCurrencySettings.CurrencyDisplayStyle == "CAN") {
                                                        $('#lblContractValueAmendment').autoNumeric('init', {
                                                            aSep: ' ', aDec: '.', vMax: '99999999999999999999.99'
                                                        });
                                                        $('#lblContractValueAmendment').autoNumeric('set', item["" + fielditem.FieldName + ""])
                                                    } else if (vCurrencySettings.CurrencyDisplayStyle == "EU") {
                                                        $('#lblContractValueAmendment').autoNumeric('init', {
                                                            aSep: '.', aDec: ',', vMax: '99999999999999999999.99'
                                                        });
                                                        $('#lblContractValueAmendment').autoNumeric('set', item["" + fielditem.FieldName + ""])
                                                    }
                                                }
                                                else {
                                                    if (vCurrencySettings.CurrencyDisplayStyle == "UK") {
                                                        $('#lblContractValueAmendment').autoNumeric('init', {
                                                            vMax: '99999999999999999999.99'
                                                        });
                                                        $('#lblContractValueAmendment').autoNumeric('set', item["" + fielditem.FieldName + ""])
                                                    } else if (vCurrencySettings.CurrencyDisplayStyle == "CAN") {
                                                        $('#lblContractValueAmendment').autoNumeric('init', {
                                                            aSep: ' ', aDec: '.', vMax: '99999999999999999999.99'
                                                        });
                                                        $('#lblContractValueAmendment').autoNumeric('set', item["" + fielditem.FieldName + ""])

                                                    } else if (vCurrencySettings.CurrencyDisplayStyle == "EU") {
                                                        $('#lblContractValueAmendment').autoNumeric('init', {
                                                            aSep: '.', aDec: ',', vMax: '99999999999999999999.99'
                                                        });
                                                        $('#lblContractValueAmendment').autoNumeric('set', item["" + fielditem.FieldName + ""])
                                                    }
                                                }
                                                if (iColumnACount % 2 === 0) {
                                                    if (iColumnACount == 0) {
                                                        oCompAmmendmentData = '<li class="contraRigght">';
                                                    }
                                                    else {
                                                        oCompAmmendmentData += '<li class="contraRigght">';
                                                    }
                                                    oCompAmmendmentData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + fielditem.FieldDisplayName + ' </span> <span class="toDoContenRight width30">' + $('#lblContractValueAmendment').text() + '</span>';
                                                    iColumnACount = iColumnACount + 1;
                                                    oEachAmmendmentli = true;
                                                }
                                                else {
                                                    oCompAmmendmentData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + fielditem.FieldDisplayName + ' </span> <span class="toDoContenRight width30">' + $('#lblContractValueAmendment').text() + '</span>';
                                                    oCompAmmendmentData += '</li>';
                                                    iColumnACount = iColumnACount + 1;
                                                    oEachAmmendmentli = false;
                                                }
                                            }
                                            else {
                                                if (iColumnACount % 2 === 0) {
                                                    if (iColumnACount == 0) {
                                                        oCompAmmendmentData = '<li class="contraRigght">';
                                                    }
                                                    else {
                                                        oCompAmmendmentData += '<li class="contraRigght">';
                                                    }
                                                    oCompAmmendmentData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + fielditem.FieldDisplayName + ' </span> <span class="toDoContenRight width30">-</span>';
                                                    iColumnACount = iColumnACount + 1;
                                                    oEachAmmendmentli = true;
                                                }
                                                else {
                                                    oCompAmmendmentData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + fielditem.FieldDisplayName + ' </span> <span class="toDoContenRight width30">-</span>';
                                                    oCompAmmendmentData += '</li>';
                                                    iColumnACount = iColumnACount + 1;
                                                    oEachAmmendmentli = false;
                                                }
                                            }


                                        } else if (fielditem.FieldName == 'ChangeInContractValue') {
                                            if ($('#lblContractValueAmendment').text() != null && $('#lblContractValueAmendment').text() != "" && $('#lblContractValueAmendment').text() != "-") {
                                                if (iColumnACount % 2 === 0) {
                                                    if (iColumnACount == 0) {
                                                        oCompAmmendmentData = '<li class="contraRigght">';
                                                    }
                                                    else {
                                                        oCompAmmendmentData += '<li class="contraRigght">';
                                                    }
                                                    oCompAmmendmentData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + fielditem.FieldDisplayName + ' </span> <span class="toDoContenRight width30">' + $('#lblContractValueAmendment').text() + '</span>';
                                                    iColumnACount = iColumnACount + 1;
                                                    oEachAmmendmentli = true;
                                                }
                                                else {
                                                    oCompAmmendmentData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + fielditem.FieldDisplayName + ' </span> <span class="toDoContenRight width30">' + $('#lblContractValueAmendment').text() + '</span>';
                                                    oCompAmmendmentData += '</li>';
                                                    iColumnACount = iColumnACount + 1;
                                                    oEachAmmendmentli = false;
                                                }
                                            }
                                            else {
                                                if (iColumnACount % 2 === 0) {
                                                    if (iColumnACount == 0) {
                                                        oCompAmmendmentData = '<li class="contraRigght">';
                                                    }
                                                    else {
                                                        oCompAmmendmentData += '<li class="contraRigght">';
                                                    }
                                                    oCompAmmendmentData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + fielditem.FieldDisplayName + ' </span> <span class="toDoContenRight width30">-</span>';
                                                    iColumnACount = iColumnACount + 1;
                                                    oEachAmmendmentli = true;
                                                }
                                                else {
                                                    oCompAmmendmentData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + fielditem.FieldDisplayName + ' </span> <span class="toDoContenRight width30">-</span>';
                                                    oCompAmmendmentData += '</li>';
                                                    iColumnACount = iColumnACount + 1;
                                                    oEachAmmendmentli = false;
                                                }
                                            }

                                        }
                                        else {
                                            if (iColumnACount % 2 === 0) {
                                                if (iColumnACount == 0) {
                                                    oCompAmmendmentData = '<li class="contraRigght">';
                                                }
                                                else {
                                                    oCompAmmendmentData += '<li class="contraRigght">';
                                                }
                                                oCompAmmendmentData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + fielditem.FieldDisplayName + ' </span> <span class="toDoContenRight width30">' + valuetobindinfield + '</span>';
                                                iColumnACount = iColumnACount + 1;
                                                oEachAmmendmentli = true;
                                            }
                                            else {
                                                oCompAmmendmentData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important">' + fielditem.FieldDisplayName + ' </span> <span class="toDoContenRight width30">' + valuetobindinfield + '</span>';
                                                oCompAmmendmentData += '</li>';
                                                iColumnACount = iColumnACount + 1;
                                                oEachAmmendmentli = false;
                                            }
                                        }

                                        // cphtml += '<li class="contraRigght"><span class="toDoContenLeft width20">' + fielditem.FieldDisplayName + ' </span> <span class="toDoContenRight">' + valuetobindinfield + '</span></li>';

                                    }
                                }

                                if (oEachAmmendmentli) {
                                    oCompAmmendmentData += '<span class="toDoContenLeft width20" style="margin-right: 0 !important"></span> <span class="toDoContenRight width30"></span>';
                                    oCompAmmendmentData += '</li>';
                                }
                                //cphtml += "</div>"
                                oCompAmmendmentData += "<li class='contraRigght' style='border-bottom: 1px dashed #807979;'></li>";
                            });
                            if (ulFinalID != "") {
                                $("#ul" + ulFinalID + "").append(oCompAmmendmentData);
                                if ($("#ul" + ulFinalID + "").children().length > 0) {

                                }
                                else {
                                    $("#ul" + ulFinalID + "").append(ulValue);
                                    $("#b" + ulFinalID + "").parent().parent('div').css("display", "none");
                                    $("#ul" + ulFinalID + "").css("display", "none");
                                }
                            }
                            else {
                                ulFinalID = $.grep(oFieldGroups, function (value) {
                                    return value[2] == "Amendment";
                                })[0];
                                if (ulFinalID instanceof Array)
                                    ulFinalID = ulFinalID[0]
                                ulFinalID = ulFinalID;
                                var ulValue = '<li class="contraRigght"><span class="toDoContenLeft" style="margin-right: 0 !important">No Amendment Information is Available</span></li>';
                                $("#ul" + ulFinalID + "").append(ulValue);
                                $("#b" + ulFinalID + "").parent().parent('div').css("display", "none");
                                $("#ul" + ulFinalID + "").css("display", "none");
                            }

                        },
                        error: function (AmendmentData) {
                            var datalenghcp = metadataFieldsvaluetocheck.length;
                            var FinalLoopId = "";
                            for (var cp = 0; cp < datalenghcp; cp++) {
                                var fielditem = metadataFieldsvaluetocheck[cp];
                                var ulIdLoop = "";
                                ulIdLoop = $.grep(oFieldGroups, function (value) {
                                    return value[1] == fielditem.FieldGroup;
                                })[0];
                                if (ulIdLoop instanceof Array)
                                    ulIdLoop = ulIdLoop[0]
                                if (fielditem.FieldRelatedTo == "Amendment") {
                                    FinalLoopId = ulIdLoop;
                                }
                            }
                            if (FinalLoopId != "") {
                                var ulValue = '<li class="contraRigght"><span class="toDoContenLeft" style="margin-right: 0 !important">No Amendment Information is Available</span></li>';
                                $("#ul" + FinalLoopId + "").append(ulValue);
                                $("#b" + FinalLoopId + "").parent().parent('div').css("display", "none");
                                $("#ul" + FinalLoopId + "").css("display", "none");
                            }
                            else {
                                ulIdLoop = $.grep(oFieldGroups, function (value) {
                                    return value[2] == "Amendment";
                                })[0];
                                if (ulIdLoop instanceof Array)
                                    ulIdLoop = ulIdLoop[0]
                                FinalLoopId = ulIdLoop;
                                var ulValue = '<li class="contraRigght"><span class="toDoContenLeft" style="margin-right: 0 !important">No Amendment Information is Available</span></li>';
                                $("#ul" + FinalLoopId + "").append(ulValue);
                                $("#b" + FinalLoopId + "").parent().parent('div').css("display", "none");
                                $("#ul" + FinalLoopId + "").css("display", "none");
                            }



                        }
                    });



                    //filterby += "CounterpartyName:" + reportCPT + ";";




                },
                error:
            function (metadataFieldsvaluetocheck) {
                $("#approvalsheetsummary").find("ul").each(function () {
                    $(this).css('display', 'none');
                });
                $("#approvalsheetsummary").parent('div').css('display', 'none');
            }
            });

            //vItem = item;
            ////vMetadata += '<li class="contraRigght"><span class="toDoContenLeft width20">Contract Record Title </span> <span class="toDoContenRight"><a href="/Contracts/ContractDetails?ContractID=' + ContractID + '&TaskID=' + vTaskID + '&Action=' + vAction + '" class="linkText PreserveSpace">' + item.ContractTitle + '</a></span></li>';
            //vMetadata += '<li class="contraRigght"><span class="toDoContenLeft width20">Contract Record Title </span> <span class="toDoContenRight"><a id="' + item.RowKey + '" class="hoverPopup"  href="/Contracts/ContractDetails?ContractID=' + ContractID + '&TaskID=' + vTaskID + '&Action=' + vAction + '" target="_blank" class="linkText PreserveSpace">' + item.ContractTitle + '</a><a href="/Contracts/ContractDetails?ContractID=' + ContractID + '&TaskID=' + vTaskID + '&Action=' + vAction + '" title="View Contract Details" target="_blank" class="linkText PreserveSpace"><img src="/Content/Images/external_link.png" id="newTabImage"></a></span></li>';//ENH 1  Minor Enhancement Specs-Rahul

            //vMetadata += '<li class="contraRigght"><span class="toDoContenLeft width20">Contract Record Number </span> <span class="toDoContenRight">' + item.ContractNumber + '</span></li>';
            //vMetadata += '<li class="contraRigght"><span class="toDoContenLeft width20">Contract Record Type </span> <span class="toDoContenRight">' + item.ContractType + '</span></li>';

            //$("#ulMetadata").append(vMetadata);

            //var vUser = item.ContractManagers + ";" + item.Approvers + ";" + item.Reviewers + ";" + item.Signees + ";" + item.ProjectManager
            //+ ";" + item.ReadWritePermissions + ";" + item.FullControlPermissions + ";" + item.BusinessAreaOwners
            //+ ";" + item.Requestor;
            //BindPeople(vUser);
            //hoverFunction();
        },
        error: function (item) {
            $("#contractdefaultsummary").css("display", "");
            $("#approvalsheetsummary").css("display", "none");
            $("#approvalsheetsummary").parent().css("display", "none");
            BindContractDetails(ContractID);
        }
    });
}




var removeLastChar = function (value, char) {
    var lastChar = value.slice(-1);
    if (lastChar == char) {
        value = value.slice(0, -1);
    }
    return value;
}

function replaceamp(objvalue) {
    do {
        objvalue = objvalue.replace("&amp;", "&")
    } while (objvalue.indexOf("&amp") > -1);
    return objvalue;
}

function replacetoamp(objrevalue) {
    var findvalue = "&";
    var revalue = new RegExp(findvalue, 'g');
    objrevalue = objrevalue.replace(revalue, '&amp;');
    return objrevalue;
}


function GetValuesAndAutoPopulateAD(controlname, values, readonlyusers) {
    var multiarr = [];
    var res = values != null ? values.split(";") : [];
    var reslength = res.length;
    var resValue = "";

    for (var j = 0; j < readonlyusers.length; j++) {
        var opt = readonlyusers[j].trim();
        multiarr.push(opt);
        $('#' + controlname + ' option[value="' + opt + '"]').prop("disabled", true);
    }

    for (var i = 0; i < reslength; i++) {
        //   multiarr.push(res[i].trim());
        resValue = res[i].trim();
        if (resValue != "") {
            if ($('#' + controlname + ' option[value="' + resValue + '"]').length > 0 && multiarr.indexOf(resValue) == -1)
                multiarr.push(resValue);
        }
    }

    ChosenOrder.setSelectionOrder($('#' + controlname), multiarr, true);
}
function getContractStatus(ContractID) {
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + ContractID,
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        processData: false,
        async: false,
        success: function (item) {
            vContractOwners = item.ContractManagers;
            ContractArea = item.ContractArea;
            if (item.Status == "Expired") {
                $('#btnComplete').css("display", "none");
                $('#btnApprove').css("display", "none");
                $('#btnReject').css("display", "none");
                $('#btnActions').css("display", "none");
                $('#ulWorkflowStatusMenu').css("display", "none");
                $('#toDoSmall').html("");
                $('#todoText').html("The contract has been " + item.Status);
                $('#toDo_msg').css("display", "none");
            }
        }
    });
}

var vCurrencySettings = "";
function getCurrencyDisplayStyle() {
    $.ajax({
        url: vApiBaseSiteUrl + '/api/accounts/' + localStorage.AccountID + '/settings',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        //async: false,
        success: function (data) {
            vCurrencySettings = data;
            if (data.CurrencyDisplayStyle == "UK") {
                vCurrencyDisplayStyle = "UK";
            } else if (data.CurrencyDisplayStyle == "CAN") {
                vCurrencyDisplayStyle = "CAN";
            } else if (data.CurrencyDisplayStyle == "EU") {
                vCurrencyDisplayStyle = "EU";
            } else if (data.CurrencyDisplayStyle == "IND") {
                vCurrencyDisplayStyle = "IND";
            }
        }
    });
}

function Opendocinbrowser(docurl) {
    if (docurl != '') {
        if (typeof docurl === "string") {
        }
        else {
            docurl = $(docurl).attr('data-value');
        }
    }

    if (Checkbrowsernameandversion()) {
        var settings = {
            pattern: /\.[0-9a-z]+$/i,
            knownfiletypes: ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'zip', 'rar', 'gzip', 'arj', 'wav', 'mp3', 'aif', 'aiff', 'm4a', 'ogg', 'wma', 'psd', 'ai', 'swf', 'fla', 'css', 'js', 'avi', 'mov', 'wmv', 'dotx'],
            wopiframefiletypes: ['doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx', 'dotx']
        };
        var ext = docurl.match(settings.pattern);
        if (ext != null) {
            if (ext.length > 0) {
                ext = ext[0].slice(1);
            }
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

function PrintToList() {
    $('input:checkbox[name="PrintOption"]').each(function () {
        $(this).prop("checked", false);
    });
    if ($('#dvAdditionalInformation').css('display') != 'none') {
        $('#trSummarySheet').css('display', '');
    }
    else {
        $('#trSummarySheet').css('display', 'none');
    }
    if (vWorkflowType == "Contract Approval") {
        $("#lblpntContractSummary").html("&nbsp;&nbsp;Contract Summary");
    }
    else if (vWorkflowType == "Request Approval") {
        $("#lblpntContractSummary").html("&nbsp;&nbsp;Request Summary");
    }
    else if (vWorkflowType == "Amendment Approval") {
        $("#lblpntContractSummary").html("&nbsp;&nbsp;Amendment Summary");
    }
    else if (vWorkflowType == "Document Review") {
        $("#lblpntContractSummary").html("&nbsp;&nbsp;Document Summary");
    }
    else {
        $("#lblpntContractSummary").html("&nbsp;&nbsp;Contract Summary");
    }

    $("#pntOption").dialog("option", "title", "Print");
    $("#pntOption").dialog("open");
}

function PostTaskDetails() {
    $("#pntOption").dialog("close");
    $("#dvcontractdefaultsummary").removeClass("no-print");
    $("#dvapprovalsheetsummary").removeClass("no-print");
    $("#dvAdditionalInformation").removeClass("no-print");
    $("#dvparticipantstasks").removeClass("no-print");
    $("#dvcomments").removeClass("no-print");
    $('input:checkbox[name="PrintOption"]:not(:checked)').each(function () {
        if (this.id == "pntContractSummary") {
            $("#dvcontractdefaultsummary").addClass("no-print");
            if ($('#dvapprovalsheetsummary').css('display') != 'none') {
                $("#dvapprovalsheetsummary").addClass("no-print");
            }
        }
        else if (this.id == "pntSummarySheet") {
            if ($('#dvAdditionalInformation').css('display') != 'none') {
                $("#dvAdditionalInformation").addClass("no-print");
            }
        }
        else if (this.id == "pntParticipants") {
            $("#dvparticipantstasks").addClass("no-print");
        }
        else if (this.id == "pntComments") {
            $("#dvcomments").addClass("no-print");
        }
    });
    $('.no-print').css('display', 'none');
    $('#printTaskDetails').printThis({
        debug: false,                   // show the iframe for debugging
        importCSS: true,                // import parent page css
        importStyle: false,             // import style tags
        printContainer: true,           // grab outer container as well as the contents of the selector
        pageTitle: "",                  // add title to print page
        removeInline: true,            // remove all inline styles from print elements
        removeInlineSelector: "body", // custom selectors to filter inline styles. removeInline must be true      
        header: null,                   // prefix to html
        footer: null,                   // postfix to html
        base: "/Activity/TaskDetails",                    // preserve the BASE tag, or accept a string for the URL
        formValues: true,               // preserve input/form values
        canvas: false,                  // copy canvas elements     
        removeScripts: true,           // remove script tags from print content
        copyTagClasses: false,          // copy classes from the html & body tag
        beforePrintEvent: null,         // callback function for printEvent in iframe
        beforePrint: null,              // function called before iframe is filled
        afterPrint: null                // function called before iframe is removed

    });
    $('.no-print').css('display', '');

}