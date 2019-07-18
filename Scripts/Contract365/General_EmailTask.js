var vApiKey = "";
var vCollaborationID = "";
var vSendTo = "";
var vTaskID = '';
var vStatus = '';
var vAccountID = '';
var vContractID = '';
var vRequestID = '';
var vObject = '';
var vSPHostUrl = "";
var RequiredComment = [];
$(document).ready(function () {
    $("#loadingPage").fadeIn();
    $(".sendToUser").css("display", "none");
    vAccountID = getParameterByName("Account");
    var vType = getParameterByName("Type");
    if (vAccountID != "" && vType != "" && vType == "Workflow") {
        vApiKey = getAPIKey(vAccountID);


        vTaskID = getParameterByName("TaskID");
        vStatus = getParameterByName("Status");
        BindWorkflowSettings();
        // 
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/Workflow/taskdetail?taskid=' + vTaskID + "&workflowid=",
            type: 'GET',
            dataType: 'json',
            cache: false,
            headers: { 'eContracts-ApiKey': vApiKey },
            success: function (data) {
                if (data != null) {
                    var vTaskDetail = data.TaskDetail;
                    var vWorkflowDetail = data.WorkflowDetail;
                    var vWorkflowStages = data.WorkflowStages;
                    var vWorkflowTasks = data.WorkflowTasks;
                    var vWorkflowHistory = data.WorkflowHistory;
                    vContractID = vWorkflowDetail.ObjectID;
                    vRequestID = vWorkflowDetail.ObjectID;
                    vObject = vWorkflowDetail.Object;
                    if (vObject == "Contracts") {
                        $('#hdtitleContract').css('display', '');
                        getContractDetails(vTaskDetail);
                    }
                    else if (vObject == "Requests") {
                        $('#hdtitleRequest').css('display', '');
                        getRequestDetails(vTaskDetail)
                    }
                    else if (vObject == "Documents") {
                        vContractID = vWorkflowDetail.ParObjectID;
                        $('#hdtitleContract').css('display', '');
                        getContractDetails(vTaskDetail);
                    }
                    else if (vObject == "Amendments") {
                        vContractID = vWorkflowDetail.ParObjectID;
                        $('#hdtitleContract').css('display', '');
                        getContractDetails(vTaskDetail);
                    }
                    else {
                        $('#hdtitleContract').css('display', '');
                        getContractDetails(vTaskDetail);
                    }

                    appendActivities(vWorkflowHistory);
                }

            }
        });
    }
    else if (vAccountID != "" && vType != "" && vType == "Milestone") {
        vApiKey = getAPIKey(vAccountID);

        $('#dvRenewalExpire').css("display", "none");
        var vMilestoneID = getParameterByName("MilestoneID");
        vStatus = getParameterByName("Status");
        var vUsername = getParameterByName("UserName");
        $("#loadingPage").fadeIn();
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/milestones?milestoneid=' + vMilestoneID,
            type: 'GET',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': vApiKey },
            "Content-Type": "application/json",
            cache: false,
            success: function (milestoneentity) {
                if (milestoneentity != "" && milestoneentity != null) {
                    if (milestoneentity.MilestoneOwner.indexOf(vUsername) > -1) {
                        if (milestoneentity.MilestoneCompleted != "Yes") {
                            var formDataStatusMile = new FormData();
                            formDataStatusMile.append("MilestoneIDs", vMilestoneID);
                            $.ajax({
                                url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/milestones/changestatus?status=Complete',
                                type: 'PUT',
                                dataType: 'json',
                                data: formDataStatusMile,
                                contentType: false,
                                processData: false,
                                headers: { 'eContracts-ApiKey': vApiKey, 'eContracts-RestrictionHeader': "No", username: vUsername },
                                cache: false,
                                success: function (result) {
                                    $("#dvTask").css("display", "");
                                    $("#dvExpired").css("display", "none");
                                    $("#dvTask").html('<img src="../Content/Images/right.png" style="margin: 1px 5px 0 0; cursor:default; vertical-align:text-top" /> Thanks, milestone "<b>' + milestoneentity.MilestoneTitle + '</b>" has been completed successfully.');
                                    $("#loadingPage").fadeOut();
                                },
                                error: function (status) {
                                    $("#dvTask").css("display", "");
                                    $("#dvExpired").css("display", "none");
                                    $("#loadingPage").fadeOut();
                                },
                                complete: function (status) {
                                    $("#loadingPage").fadeOut();
                                }
                            });
                        }
                        else {
                            $("#dvTask").css("display", "none");
                            $("#dvExpired").css("display", "");
                            if (vUsername == milestoneentity.MilestoneCompletedBy)
                                $("#dvExpired").html('This milestone has already been completed by you.');
                            else
                                $("#dvExpired").html('This milestone has already been completed by "' + milestoneentity.MilestoneCompletedBy + '"');

                            $("#loadingPage").fadeOut();
                        }
                    }
                    else {
                        $("#dvTask").css("display", "none");
                        $("#dvExpired").css("display", "");
                        $("#dvExpired").html('Sorry, you have been removed as a Milestone Owner from this milestone.');

                        $("#loadingPage").fadeOut();
                    }
                }
            }
        });
    }
    else if (vAccountID != "" && vType != "" && vType == "Obligation") {
        vApiKey = getAPIKey(vAccountID);

        $('#dvRenewalExpire').css("display", "none");
        var vObligationID = getParameterByName("ObligationID");
        vStatus = getParameterByName("Status");
        var vUsername = getParameterByName("UserName");
        $("#loadingPage").fadeIn();
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/obligations?obligationid=' + vObligationID,
            type: 'GET',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': vApiKey },
            "Content-Type": "application/json",
            cache: false,
            success: function (obligationentity) {
                if (obligationentity != "" && obligationentity != null) {
                    if (obligationentity.ObligationOwner.indexOf(vUsername) > -1) {
                        if (obligationentity.ObligationMet != "Yes") {
                            $.ajax({
                                url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/obligations/obligationsnew/updateobligationbyId?obligationId=' + vObligationID + '&obligationstatus=' + 'Complete',
                                type: 'POST',
                                dataType: 'json',
                                headers: { 'eContracts-ApiKey': vApiKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: vUsername },
                                cache: false,
                                success: function (person) {
                                    $("#dvTask").css("display", "");
                                    $("#dvExpired").css("display", "none");
                                    $("#dvTask").html('<img src="../Content/Images/right.png" style="margin: 1px 5px 0 0; cursor:default; vertical-align:text-top" /> Thanks, obligation "<b>' + obligationentity.ObligationTitle + '</b>" has been completed successfully.');
                                    $("#loadingPage").fadeOut();
                                },
                                error: function (status) {
                                    $("#dvTask").css("display", "");
                                    $("#dvExpired").css("display", "none");
                                    $("#loadingPage").fadeOut();
                                }
                            });
                        }
                        else {
                            $("#dvTask").css("display", "none");
                            $("#dvExpired").css("display", "");
                            if (vUsername == obligationentity.ObligationMetBy)
                                $("#dvExpired").html('This obligation has already been completed by you.');
                            else
                                $("#dvExpired").html('This obligation has already been completed by "' + obligationentity.ObligationMetBy + '"');

                            $("#loadingPage").fadeOut();
                        }
                    }
                    else {
                        $("#dvTask").css("display", "none");
                        $("#dvExpired").css("display", "");
                        $("#dvExpired").html('Sorry, you have been removed as a Obligation Owner from this obligation.');

                        $("#loadingPage").fadeOut();
                    }
                }
            }
        });
    }
});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getAPIKey(AccountID) {
    var aKey = "";
    $.ajax({
        url: '/Accounts/getAccountDetails?accountid=' + AccountID,
        type: 'GET',
        dataType: 'json',
        cache: false,
        async: false,
        error: function () {

        },
        success: function (data) {
            aKey = data.ApiKey;
            vSPHostUrl = data.HostURL;
        }
    });

    return aKey;
}

function getContractDetails(vTask) {
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/Contracts?contractid=' + vContractID,
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': vApiKey },
        processData: false,
        success: function (item) {
            if (vStatus == "Approved") {

                var conTitle = '<a href="/Contracts/ContractDetails?ContractID=' + item.RowKey + '&SPHostUrl=' + vSPHostUrl + '" target="_blank" class="PreserveSpace conTitle" style="color: #6a8ae2;">' + item.ContractTitle + '</a>';
                $("#spContractTitle").html(conTitle);



                $("#renewalsMessage").html("You've selected 'Approved' as the task outcome.");
            }
            else if (vStatus == "Rejected") {

                var conTitle = '<a href="/Contracts/ContractDetails?ContractID=' + item.RowKey + '&SPHostUrl=' + vSPHostUrl + '" target="_blank" class="PreserveSpace conTitle" style="color: #6a8ae2;">' + item.ContractTitle + '</a>';
                $("#spContractTitle").html(conTitle);


                $("#renewalsMessage").html("You've selected 'Rejected' as the task outcome.");
            }
            else if (vStatus == "Reviewed") {

                var conTitle = '<a href="/Contracts/ContractDetails?ContractID=' + item.RowKey + '&SPHostUrl=' + vSPHostUrl + '" target="_blank" class="PreserveSpace conTitle" style="color: #6a8ae2;">' + item.ContractTitle + '</a>';
                $("#spContractTitle").html(conTitle);
                $("#renewalsMessage").html("You've selected 'Reviewed' as the task outcome.");
            }
            if (vTask.Status != "In Progress") {
                $("#txtNote").prop('disabled', true);
                $("#ddlOwners").prop('disabled', true);
                $("#renewalsMessage").css("display", "none");
                $("#dvPostComment").css("display", "");
                $("#dvPostComment").html('This task has been completed, expired or reassigned to another user.');
                $(".commentTask").css("display", "none");
            }
            //$("#loadingPage").fadeOut();
        },
        error: function (item) {
            $("#loadingPage").fadeOut();
        },
        complete: function (item) {
            getUsers(item);
        }
    });
}

function getUsers(contractItem) {
    var conItem = contractItem.responseJSON;
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/users',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        //async: false,
        headers: { 'eContracts-ApiKey': vApiKey },
        success: function (dataUser) {
            allUsersList = dataUser;
            $(dataUser).each(function (i, item) {
                var sRowKey = item.RowKey;
                var sUserName = item.UserName;
                if (conItem.ContractManagers.indexOf(sUserName) > -1)
                    $("#ddlOwners").append('<option value="' + sUserName + '" selected>' + sUserName + '</option>');
                else
                    $("#ddlOwners").append('<option value="' + sUserName + '" disabled>' + sUserName + '</option>');
            });
            $("#ddlOwners").chosen();

            $("#loadingPage").fadeOut();
        },
        error:
            function (dataUser) {
                $("#loadingPage").fadeOut();
            }
    });

}
function getRequestUsers(requestItem) {
    var reqItem = requestItem.responseJSON;
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/users',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        //async: false,
        headers: { 'eContracts-ApiKey': vApiKey },
        success: function (dataUser) {
            allUsersList = dataUser;
            $(dataUser).each(function (i, item) {
                var sRowKey = item.RowKey;
                var sUserName = item.UserName;
                if (reqItem.Requestor.indexOf(sUserName) > -1)
                    $("#ddlOwners").append('<option value="' + sUserName + '" selected>' + sUserName + '</option>');
                else
                    $("#ddlOwners").append('<option value="' + sUserName + '" disabled>' + sUserName + '</option>');
            });
            $("#ddlOwners").chosen();

            $("#loadingPage").fadeOut();
        },
        error:
            function (dataUser) {
                $("#loadingPage").fadeOut();
            }
    });

}
$("#btnSubmit").click(function () {
    $("#loadingPage").fadeIn();
    var vUsername = getParameterByName("UserName");
    var checkCommentStatus = "";
    if (vStatus == "Approved")
        checkCommentStatus = "Approve";
    else if (vStatus == "Reviewed")
        checkCommentStatus = "Review";
    else if (vStatus == "Rejected")
        checkCommentStatus = "Reject";
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/Workflow/tasks?taskid=' + vTaskID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': vApiKey },
        cache: false,
        success: function (taskDet) {
            if (taskDet.Status == "In Progress") {
                var vComment = $("#txtNote").val().trim();
                if (RequiredComment.indexOf(checkCommentStatus) > -1) {
                    if (vComment != "" && vComment != null) {
                        $.ajax({
                            url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/Workflow/tasks?taskid=' + vTaskID + '&reassignto=&changerequestto=',
                            type: 'PUT',
                            dataType: 'json',
                            headers: { 'eContracts-ApiKey': vApiKey, 'eContracts-RestrictionHeader': "No" },
                            cache: false,
                            data: {
                                "Status": vStatus,
                                "Comment": vComment,
                            },
                            success: function (task) {
                                $("#dvPostComment").css("display", "");
                                $("#txtNote").val('');
                                $("#txtNote").prop('disabled', true);
                                $("#ddlOwners").prop('disabled', true);
                                vTime = moment(new Date()).format('MMMM Do YYYY, h:mm A')
                                var activity = vUsername + ' ' + vStatus + ' on ' + vTime;
                                var html = '<li><b class="color_lightgrey"><span class="color_dark" style="margin-right: 20px;">Activity: </span>' + activity + '</b><br><br><b class="color_dark float_left" style="margin-right: 7px;">Comment: </b><div class="taskcomment"><span> ' + vComment + '</span></div></li>';
                                $(".toDoContenList").append(html);
                                $("#dvBtns").css("display", "none");
                                $(".commentTask").css("display", "none");
                                $("#renewalsMessage").css("display", "none");
                                $("#dvPostComment").html('<img src="../Content/Images/right.png" style="margin: 1px 5px 0 0; cursor:default; vertical-align:text-top" /> You have Successfully ' + vStatus + ' for this task! ');
                                $("#loadingPage").fadeOut();
                            },
                            error: function (status) {
                                //$("#dvTask").css("display", "");
                                //$("#dvExpired").css("display", "none");
                                $("#loadingPage").fadeOut();
                            }
                        });
                    }
                    else {
                        $("#txtNote").css("border-color", "red");
                        $("#loadingPage").fadeOut();
                    }
                }
                else {

                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/Workflow/tasks?taskid=' + vTaskID + '&reassignto=&changerequestto=',
                        type: 'PUT',
                        dataType: 'json',
                        headers: { 'eContracts-ApiKey': vApiKey, 'eContracts-RestrictionHeader': "No" },
                        cache: false,
                        data: {
                            "Status": vStatus,
                            "Comment": vComment,
                        },
                        success: function (task) {
                            $("#dvPostComment").css("display", "");
                            $("#txtNote").val('');
                            $("#txtNote").prop('disabled', true);
                            $("#ddlOwners").prop('disabled', true);
                            vTime = moment(new Date()).format('MMMM Do YYYY, h:mm A')
                            var activity = vUsername + ' ' + vStatus + ' on ' + vTime;
                            var html = '<li><b class="color_lightgrey"><span class="color_dark" style="margin-right: 20px;">Activity: </span>' + activity + '</b><br><br><b class="color_dark float_left" style="margin-right: 7px;">Comment: </b><div class="taskcomment"><span> ' + vComment + '</span></div></li>';
                            $(".toDoContenList").append(html);
                            $("#dvBtns").css("display", "none");
                            $(".commentTask").css("display", "none");
                            $("#renewalsMessage").css("display", "none");
                            $("#dvPostComment").html('<img src="../Content/Images/right.png" style="margin: 1px 5px 0 0; cursor:default; vertical-align:text-top" /> You have Successfully ' + vStatus + ' for this workflow! ');
                            $("#loadingPage").fadeOut();
                        },
                        error: function (status) {
                            //$("#dvTask").css("display", "");
                            //$("#dvExpired").css("display", "none");
                            $("#loadingPage").fadeOut();
                        }
                    });
                }


            }
        }
    });
});

function appendActivities(activities) {
    $(".toDoContenList").empty();
    $("#dvActivityComment").css('display', '');
    for (var i = 0; i < activities.length; i++) {
        var vUsername = getParameterByName("UserName");
        var item = activities[i];
        var vTime = '';
        if (typeof (item.ModifiedDate) != "undefined" && item.ModifiedDate != null && item.ModifiedDate != "")
            vTime = moment(new Date(item.ModifiedDate)).format('MMMM Do YYYY, h:mm A');
        else if (typeof (item.Created) != "undefined" && item.Created != null && item.Created != "")
            vTime = moment(new Date(item.Created)).format('MMMM Do YYYY, h:mm A');
        else
            vTime = moment(new Date(item.Timestamp)).format('MMMM Do YYYY, h:mm A');
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
            article += '</div';
        }
        article += '</li>';
        $(".toDoContenList").append(article);

    }
}

function getRequestDetails(vTask) {
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/Requests/requestsbyrequestid?requestid=' + vRequestID,
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': vApiKey },
        processData: false,
        success: function (item) {
            if (vStatus == "Approved") {

                var conTitle = '<a href="/Pipeline/RequestDetails?RequestID=' + item.RowKey + '&SPHostUrl=' + vSPHostUrl + '" target="_blank" class="PreserveSpace conTitle" style="color: #6a8ae2;">' + item.RequestTitle + '</a>';
                $("#spRequestTitle").html(conTitle);



                $("#renewalsMessage").html("You've selected 'Approved' as the task outcome.");
            }
            else if (vStatus == "Rejected") {

                var conTitle = '<a href="/Pipeline/RequestDetails?RequestID=' + item.RowKey + '&SPHostUrl=' + vSPHostUrl + '" target="_blank" class="PreserveSpace conTitle" style="color: #6a8ae2;">' + item.RequestTitle + '</a>';
                $("#spRequestTitle").html(conTitle);


                $("#renewalsMessage").html("You've selected 'Rejected' as the task outcome.");
            }

            if (vTask.Status != "In Progress") {
                $("#txtNote").prop('disabled', true);
                $("#ddlOwners").prop('disabled', true);
                $("#renewalsMessage").css("display", "none");
                $("#dvPostComment").css("display", "");
                $("#dvPostComment").html('This task has been completed, expired or reassigned to another user.');
                $(".commentTask").css("display", "none");
            }
            //$("#loadingPage").fadeOut();
        },
        error: function (item) {
            $("#loadingPage").fadeOut();
        },
        complete: function (item) {
            getRequestUsers(item);
        }
    });
}

function BindWorkflowSettings() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/Workflow/settings?accountid=' + vAccountID,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': vApiKey },
        contentType: 'application/json',
        async: false,
        cache: false,
        success: function (status) {
            $.each(status.TaskCommentRequired.split(";"), function () {
                RequiredComment.push($.trim(this));
            });
        }
    });
}
