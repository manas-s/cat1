var vTodoID = getParameterByName("TodoID");
var vAction = getParameterByName("Action");
var vAnyoneRejected = '';
var vNoOfWaiting = 0;
$(document).ready(function () {
    GetTodoDetail();
    
    GetTodoComments();
    CreateTodoList();
    CreateMilestoneList();    
    //prabhakar
    BindPeople();

    $("#dialogAddUser").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "New User",
        modal: true,
        buttons: {
            "Save": function () {
               
                Adduser();
            },
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
        modal: true,
        buttons: {
           
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
    //prabhakar




});

function GetTodoDetail() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/todos?todoid=' + vTodoID,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        async:false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (item) {
            var todoType = item.TodoType;
            var assignTo = item.AssignTo;
            $("#todoTitle").text(item.TodoTitle);
            $("#todoType").text(todoType);
            $("#postCommentLink").css("display", "");
            $("#addUserLink").css("display", "");
            var todoNoteTxt = item.Note;
            todoNoteTxt = todoNoteTxt.replace(/\n/g, "<br/>");
            if (todoNoteTxt != '') {
                $("#todoNote").append(todoNoteTxt);
            }
            else {
                $("#todoNote").text('Not Available');
            }
            $("#createdBy").text(item.CreatedBy);
            $("#approvers").text(assignTo);
            if (item.TodoDate != null) {
                $("#dueDate").text(moment(new Date(item.TodoDate)).format('Do MMM YYYY'));
            }
            else {
                $("#dueDate").text('Not Available');
            }
            if (todoType == "Contract Approval") {                
                $("#dvMetadata").css("display", "");
                $("#btnApprove").css("display", "");
                $("#btnReject").css("display", "");
                $("#hdnTodoFor").text(item.TodoFor); 
                $("#hdnContractID").text(item.ContractID); 
                $("#approversText").html('Approvers');
                BindContractDetails(item.ContractID);
            }
            else if (todoType == "Contract Review") {               
                $("#dvMetadata").css("display", "");
                $("#btnApprove").css("display", "");
                $("#btnApproveText").html('Reviewed');
                $("#approversText").html('Reviewers');
                BindContractDetails(item.ContractID);
            }
            else if (todoType == "Document Approval") {               
                $("#dvMetadata").css("display", "");
                GetDocuments(item.DocumentID);
                $("#btnApprove").css("display", "");
                $("#btnReject").css("display", "");
                $("#approversText").html('Approvers');
            }
            else if (todoType == "Document Review") {
                $("#pElement").css("display", "");
                GetDocuments(item.DocumentID);               
                $("#dvMetadata").css("display", "");
                $("#btnApprove").css("display", "");
                $("#btnApproveText").html('Reviewed');
                $("#approversText").html('Reviewers');
            }
            $("#hdTaskStatus").val(item.Status);
            if (item.Status == "Complete") {
                $("#btnApprove").css("display", "none");
                $("#btnReject").css("display", "none");
                $("#toDo_btn").css("display", "none");
                $("#dvTodoComplete").css("display", "none"); 
                $("#dvTodoCompleteText").html('Complete');
                $("#taskStatus").html('Complete');
                $("#postComment").css("display", "none");
                $("#postCommentLink").css("display", "none");
                $("#addUserLink").css("display", "none");
            }
            else if (item.Status == "Cancel") {
                $("#btnApprove").css("display", "none");
                $("#btnReject").css("display", "none");
                $("#toDo_btn").css("display", "none");
                $("#dvTodoComplete").css("display", "none");
                $("#dvTodoCompleteText").html('Cancel');
                $("#taskStatus").html('Cancel');
                $("#postComment").css("display", "none");
                $("#postCommentLink").css("display", "none");
                $("#addUserLink").css("display", "none");
            }
            else {
                if (assignTo.indexOf(localStorage.UserName) >= 0 || assignTo == localStorage.UserName) {
                    $("#dvTodoComplete").css("display", "");
                    $("#toDo_btn").css("display", "");
                }
            }

            if (assignTo.indexOf(localStorage.UserName) < 0 && assignTo != localStorage.UserName) {
                $("#btnApprove").css("display", "none");
                $("#btnReject").css("display", "none");
                $("#toDo_btn").css("display", "none");
                $("#dvTodoComplete").css("display", "none");
            }
            //Ajith Kumar; 
        },
        error:
            function (data) {
            }
    });
}

function BindContractDetails(ContractID) {
    $("#ulMetadata").empty();
    var vMetadata = '';
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + ContractID,
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        processData: false,
        success: function (item) {
            vMetadata += '<li class="contraRigght"><span class="toDoContenLeft ">Contract Record Title </span> <span class="toDoContenRight"><a href="/Contracts/ContractDetails?ContractID=' + ContractID + '&TodoID=' + vTodoID + '&Action=' + vAction + '" class="PreserveSpace">' + item.ContractTitle + '</a></span></li>';
            vMetadata += '<li class="contraRigght"><span class="toDoContenLeft ">Contract Record Number </span> <span class="toDoContenRight">' + item.ContractNumber + '</span></li>';
            vMetadata += '<li class="contraRigght"><span class="toDoContenLeft ">Contract Record Type </span> <span class="toDoContenRight">' + item.ContractType + '</span></li>';

            $("#ulMetadata").append(vMetadata);
        }
    });
}

function GetDocuments(documentID) {
    $("#ulMetadata").empty();
    var vMetadata = '';
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?documentids=' + documentID,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var documententity = data[i];
                var vURL = encodeURI(documententity.DocumentUrl);
                if (vURL.indexOf(".doc") >= 0 || vURL.indexOf(".ppt") >= 0 || vURL.indexOf(".xls") >= 0 || vURL.indexOf(".dotx") >= 0) {
                    vURL = localStorage.SPHostUrl + "/_layouts/15/WopiFrame.aspx?sourcedoc=" + vURL + "&action=default";
                }
                var vDescription = documententity.Description;
                if (vDescription == "") { vDescription = "NA"; }
                vMetadata += '<li class="contraRigght"><span class="toDoContenLeft ">Document Name </span> <span class="toDoContenRight"><a href=' + vURL + ' target="_blank" class="linkText">' + documententity.DocumentName + '</a></span></li>';
                vMetadata += '<li class="contraRigght"><span class="toDoContenLeft ">Description </span> <span class="toDoContenRight">' + vDescription + '</span></li>';
                vMetadata += '<li class="contraRigght"><span class="toDoContenLeft ">Document Type </span> <span class="toDoContenRight">' + documententity.DocumentType + '</span></li>';
                vMetadata += '<li class="contraRigght"><hr/></li>';
            }
            $("#ulMetadata").append(vMetadata);
        }
    });
}

function GetTodoComments() {
    var vUserStatus = '';
    $("#userStatus").empty();
    var assignTo = $("#approvers").text().split(';');
    assignTo = $.map(assignTo, $.trim);
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/todos/comments?todoid=' + vTodoID,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {           
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                var vTime = moment(new Date(item.Timestamp)).format('Do MMM, h:mm A');
                var article = '<li>';
                if (item.PostType == "Action") {
                    article += '<b>' + item.PostAction + '</b>';
                    if (item.PostBy == localStorage.UserName && (item.PostAction == 'Approved' || item.PostAction == 'Rejected' || item.PostAction == 'Reviewed')) {
                        $("#btnApprove").css("display", "none");
                        $("#btnReject").css("display", "none");
                        $("#toDo_btn").css("display", "none");
                    }
                    if (assignTo.indexOf(item.PostBy) > -1) {
                            if (item.PostAction == 'Approved') {
                                vUserStatus += '<li class="contraRigght_R"><span class="toDoContenLeft2 "><img src="/Content/images/approved.png" title="Approved" /></span>' +
                                    '<span class="toDoContenRight1">' + item.PostBy + '<small>Approved on ' + vTime + '</small></span></li>';
                                assignTo.splice($.inArray(item.PostBy, assignTo), 1);
                            }
                            else if (item.PostAction == 'Rejected') {
                                vUserStatus += '<li class="contraRigght_R"><span class="toDoContenLeft2 "><img src="/Content/images/reject.png" title="Rejected" /></span>' +
                                    '<span class="toDoContenRight1">' + item.PostBy + '<small>Rejected on ' + vTime + '</small></span></li>';
                                assignTo.splice($.inArray(item.PostBy, assignTo), 1);
                                vAnyoneRejected = 'Y';
                            }
                            else if (item.PostAction == 'Reviewed') {
                                vUserStatus += '<li class="contraRigght_R"><span class="toDoContenLeft2 "><img src="/Content/images/approved.png" title="Reviewed" /></span>' +
                                    '<span class="toDoContenRight1">' + item.PostBy + '<small>Reviewed on ' + vTime + '</small></span></li>';
                                assignTo.splice($.inArray(item.PostBy, assignTo), 1);
                            }
                    }
                }
                else {
                    article += '<b>' + item.PostContent + '</b>';
                }
                article += '<span><small>' + item.PostBy + ' | ' + vTime + '</small></span>';
                article += '</li>';
                
                $("#listTodoComments").prepend(article);
            }
            $.each(assignTo, function (index, value) {
                if (value.trim() != '') {
                    if ($("#hdTaskStatus").val() == "Pending") {
                        vUserStatus += '<li class="contraRigght_R"><span class="toDoContenLeft2 "><img src="/Content/images/waitng-approval.png" title="Waitng" /></span>' +
                            '<span class="toDoContenRight1">' + value + '<small></small></span></li>';
                        vNoOfWaiting += 1;
                    }
                    else {
                        vUserStatus += '<li class="contraRigght_R"><span class="toDoContenLeft2 "><img src="/Content/images/Cancel_Task.png" title="Canceled" /></span>' +
                            '<span class="toDoContenRight1">' + value + '<small></small></span></li>';
                    }
                }
            });
            $("#userStatus").append(vUserStatus);
        },
        error:
            function (data) {
                $.each(assignTo, function (index, value) {
                    if (value.trim() != '') {
                        if ($("#hdTaskStatus").val() == "Pending") {
                            vUserStatus += '<li class="contraRigght_R"><span class="toDoContenLeft2 "><img src="/Content/images/waitng-approval.png" title="Waitng" /></span>' +
                                '<span class="toDoContenRight1">' + value + '<small></small></span></li>';
                            vNoOfWaiting += 1;
                        }
                        else {
                            vUserStatus += '<li class="contraRigght_R"><span class="toDoContenLeft2 "><img src="/Content/images/Cancel_Task.png" title="Canceled" /></span>' +
                                '<span class="toDoContenRight1">' + value + '<small></small></span></li>';
                        }
                    }
                });
                $("#userStatus").append(vUserStatus);
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
    PostComment("Action", $('#btnApproveText').html(), '');
});

$('#btnReject').click(function () {
    PostComment("Action", $('#btnRejectText').html(), '');
});

function renewcontract() {
    var stanterm = "";
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts/' + $("#hdnContractID").text() + '/renew?standardterm=' + stanterm,
        type: 'PUT',
        dataType: 'json',
        data: {
            IsRenewed: "Yes",
            Renewable: "Yes",
            Status: "Renewed",
            RenewedBy: localStorage.UserName,
            ModifiedBy: localStorage.UserName
        },
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
        cache: false,
        success: function (result) {
          
        }
    });
}

function PostComment(postType, postAction, postContent) {
    if ($.trim(postContent) == "" && postType != "Action") {      
        swal("", "Please enter some text.");
    }
    else {
        $("#loadingPage").fadeIn();
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/todos/comments',
            type: 'POST',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            data: {
                TodoID: vTodoID,
                PostType: postType,
                PostAction: postAction,
                PostContent: postContent,
                PostBy: localStorage.UserName
            },
            cache: false,
            success: function (status) {
                var vPost = "";
                if (postType == "Action") {
                    if (vNoOfWaiting == 1) {
                        if (vAnyoneRejected == 'Y' || postAction == 'Rejected') { AutoCompleteTodo('NotComplete'); }
                        else if (postAction == 'Approved' || postAction == 'Reviewed') { AutoCompleteTodo('Complete'); }
                    }                  
                    swal("", "Task " + postAction);
                    vPost = postAction;
                    $("#btnApprove").css("display", "none");
                    $("#btnReject").css("display", "none");
                    $("#toDo_btn").css("display", "none");
                }
                else {                  
                    swal("", "Comment Posted");
                    vPost = postContent;
                }

                var article = '<li>';
                article += '<b>' + vPost + '</b>';
                article += '<span><small>' + localStorage.UserName + ' | ' + moment(new Date()).format('Do MMM, h:mm A') + '</small></span>';
                article += '</li>';
                $("#listTodoComments").prepend(article);
                $("#txtPost").val("");               
                $("#loadingPage").fadeOut();
                location.reload();
            },
            error: function (status) {
                $("#loadingPage").fadeOut();
            }
        });
    }
}

function CompleteTodo() {
    $(".hhide4").hide();
    $("#loadingPage").fadeIn();
    $.ajax({
        async: false,
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/todos?todoid=' + vTodoID + '&status=Complete&username=' + localStorage.UserName,
        type: "PUT",
        dataType: "json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        "Content-Type": "application/json",
        success: function (data) {
            var vParent = '';
            var vParentID = '';
            if (data.ContractID != null || data.ContractID != "") {
                vParent = 'Contract';
                vParentID = data.ContractID;
            }
            $("#btnApprove").css("display", "none");
            $("#btnReject").css("display", "none");
            $("#toDo_btn").css("display", "none");
            $("#dvTodoComplete").css("display", "none");
            $("#postComment").css("display", "none");
            $("#postCommentLink").css("display", "none");
            $("#addUserLink").css("display", "none");
                $("#dvTodoCompleteText").html('Complete');
                PostComment("Action", 'Completed', '');
                AddActivity("Update", "Task", vTodoID, vParent, vParentID, "'" + data.TodoTitle + "' completed.");
           
        },
        error: function (data) {      
            $("#loadingPage").fadeOut();
        }
    });
}

function CancelTask() {
    $(".hhide4").hide();
    swal({
        title: '',
        text: "Are you sure you want to <span style=\"font-weight:700\">Cancel</span> the task?",
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
                   async: false,
                   url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/todos?todoid=' + vTodoID + '&status=Cancel&username=' + localStorage.UserName,
                   type: "PUT",
                   dataType: "json",
                   headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                   "Content-Type": "application/json",
                   success: function (data) {
                       var vParent = '';
                       var vParentID = '';
                       if (data.ContractID != null || data.ContractID != "") {
                           vParent = 'Contract';
                           vParentID = data.ContractID;
                       }
                       $("#btnApprove").css("display", "none");
                       $("#btnReject").css("display", "none");
                       $("#toDo_btn").css("display", "none");
                       $("#dvTodoComplete").css("display", "none");
                       $("#postComment").css("display", "none");
                       $("#postCommentLink").css("display", "none");
                       $("#addUserLink").css("display", "none");
                       $("#dvTodoCompleteText").html('Cancel');
                       PostComment("Action", 'Cancel', '');                       
                   },
                   error: function (data) {                     
                       $("#loadingPage").fadeOut();
                   }
               });
           }
           return;
       });
}

function AutoCompleteTodo(status) {
    $(".hhide4").hide();
    $("#loadingPage").fadeIn();
    $.ajax({
        async: false,
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/todos/AutoComplete?todoid=' + vTodoID + '&status=' + status,
        type: "PUT",
        dataType: "json",
        headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        "Content-Type": "application/json",
        success: function (data) {
            var vParent = '';
            var vParentID = '';
            if (data.ContractID != null || data.ContractID != "") {
                vParent = 'Contract';
                vParentID = data.ContractID;
            }
            $("#btnApprove").css("display", "none");
            $("#btnReject").css("display", "none");
            $("#toDo_btn").css("display", "none");
            $("#dvTodoComplete").css("display", "none");
            $("#postComment").css("display", "none");
            $("#postCommentLink").css("display", "none");
            $("#addUserLink").css("display", "none");
            $("#dvTodoCompleteText").html('Complete');            
        },
        error: function (data) {         
            $("#loadingPage").fadeOut();
        }
    });
}

function AddActivity(vActionType, vObject, vObjectID, vParentObject, vParentObjectID, vActivity) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/activities',
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
            location = location;
        }
    });
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function ShowComment()
{
    $("#txtPost").val("");
    $("#postCommentLink").css("display", "none");
    $("#postComment").css("display", "");
}

function HideComment() {
    $("#txtPost").val("");
    $("#postComment").css("display", "none");
    $("#postCommentLink").css("display", "");
}

function CreateTodoList() {
    $("#todoList").html('');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/todos?assignto=' + localStorage.UserName + '&status=Pending&pageSize=5&startIndex=1',
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (data) {
            if (data.length == 0) {
                $("#todoList").append('<p class="f_p-error">No Tasks Available</p>');
            }
            else {
                var datalenght = data.length;
                for (var i = 0; i < datalenght; i++) {
                    var item = data[i];
                    var sTodoTitle = item.TodoTitle;
                    var sRowKey = item.RowKey;

                    var sDuedate = moment(new Date(item.TodoDate)).format('Do MMM YYYY');

                    var article = '<li>';                  
                    article += '<p><input type="checkbox" class="filter_Check" name="chkValue" id="' + sRowKey + '" />';
                    article += '<a href="/Activity/TodoDetails?TodoID=' + sRowKey + '">' + sTodoTitle + '</a>';

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
            $("#todoList").append('<p class="f_p-error">No Tasks Available</p>');
        }
    });
}

function CreateMilestoneList() {
    $("#milestoneList").html('');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones?assignto=' + localStorage.UserName + '&status=No&pageSize=5&startIndex=1',
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
                    var sMilestoneDate = moment(new Date(item.MilestoneDate)).format('Do MMM, h:mm A');
                    var article = '<li class="contraRigght">';                  
                    article += '<p class="contRP"><a href="javascript:void(0);" onclick="ViewMilestoneDetail(\'' + sRowKey + '\')" <span>' + sMilestoneTitle + '</span></a></p><small class="contRsmaLl PreserveSpace">' + sMilestoneDate + ' | ' + sContractTitle + '</small></li>';
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
$(document).click(function () {
    $(".hhide4").hide();
});


//prabhakar
$('#addUserLink').click(function () {
       

    $("#dialogAddUser").dialog("option", "title", "Add New User");
    $("#dialogAddUser").dialog("open");

});



function Adduser()
{
    if (requiredValidator('dialogAddUser')) {
        $("#loadingPage").fadeIn();
        var arrAdduser = $("#ddlUser").val();
        var todoAssignTo = '';
        var datalenght = arrAdduser.length;
        for (var i = 0; i < datalenght; i++) {
            var item = arrAdduser[i];
            if (todoAssignTo == '')
                todoAssignTo = item;
            else
                todoAssignTo += "; " + item;
        }
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/todos/User?todoid=' + vTodoID + '&users=' + todoAssignTo,
            type: 'PUT',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName },
            cache: false,
            success: function (data) {
                swal("", "user updated");               
                $("#loadingPage").fadeOut();
                location.reload();
            },
            error:
                function (data) {
                    $("#loadingPage").fadeOut();
                }
        });
    }
    else
    {
        $("#ddlUser").focus();
    }

    
}



function BindPeople() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/users',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            var v = $(data).length;
            var datalenght = data.length;
            for (var i = 0; i < datalenght; i++) {
                var item = data[i];
                var sRowKey = item.RowKey;
                var sUserName = item.UserName;
                var article = '<option value="' + sUserName + '">' + sUserName + '</option>';
                $("#ddlUser").append(article);
            }         
            $("#ddlUser").chosen();
            $('.chosenmulti').on('chosen:showing_dropdown', function (evt, params) {
                $('.result-selected').css('display', 'none');
            });
        },
        error:
            function (data) {
            }
    });
}

function ViewMilestoneDetail()
{
    $("#viewMetadataDetail").dialog("option", "title", "View Milestone");
    $("#viewMetadataDetail").dialog("open");
}

function ViewMilestoneDetail(milestoneID) {
    $("#tblMetadataDetail").empty();
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones?milestoneid=' + milestoneID,
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
//prabhakar