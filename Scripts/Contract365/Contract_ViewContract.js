//Script General Start
        var vTodoID = getParameterByName("TodoID");
var vAction = getParameterByName("Action");
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(function () {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + getParameterByName("ContractID"),
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        processData: false,
        success: function (data) {
            $(data).each(function (i, item) {
                $("#lblContractTitle").text(item.ContractTitle);
                if (item.ContractNumber == null || item.ContractNumber == "") {
                    $("#lblContractNumber").text('No Contract Record Number');
                } else {
                    $("#lblContractNumber").text(item.ContractNumber);
                }
                $("#lblContractType").text(item.ContractType);
                if (item.BusinessOwners == null || item.BusinessOwners == "") {
                    $("#libusinessownersNA").css('display', '');
                }
                else {
                    $("#libusinessowners").text(item.BusinessOwners);
                }
                if (item.ContractManagers == null || item.ContractManagers == "") {
                    $("#licontractmanagersNA").css('display', '');
                }
                else {
                    $("#licontractmanagers").text(item.ContractManagers);
                }
                if (item.Approvers == null || item.Approvers == "") {
                    $("#liapproversNA").css('display', '');
                }
                else {
                    $("#liapprovers").text(item.Approvers);
                }
                if (item.Signees == null || item.Signees == "") {
                    $("#lisigneesNA").css('display', '');
                }
                else {
                    $("#lisignees").text(item.Signees);
                }
                if (item.ExternalSignees == null || item.ExternalSignees == "") {
                    $("#lisigneesExternalNA").css('display', '');
                    $("#tdExternalSignee").text('-');
                }
                else {
                    $("#tdExternalSignee").text(item.ExternalSignees);
                    $("#lisigneesExternal").text(item.ExternalSignees);
                }
                if (item.BusinessUsers == null || item.BusinessUsers == "") {
                    $("#libusinessusersNA").css('display', '');
                }
                else {
                    $("#libusinessusers").text(item.BusinessUsers);
                }

                if (item.TransactionType == "Legal/General Agreement") {
                    $("#liContractValueHead").css('display', 'none');
                    $("#liContractValue").css('display', 'none');
                }
                else {
                    if (item.ContractValue == "0") {
                        $("#lblContractValue").text("Not available");
                        $("#lblContractCurrency").text("");
                    } 
                }

                if (item.Status != "0" && item.Status != "" && item.Status != "undefined") {
                    $("#spanstatus").text(item.Status);
                }
                else {
                    $("#spanstatus").html('<span class="f_p-error">Not Assigned</span>');
                    $("#dvStatusAlert").css('display', '');
                    $("#dvStatusAlert").append('<span style="float:right"><a href="javascript:void(0)" onclick="CloseAlert(\'dvStatusAlert\');">X</a></span>');
                    $("#dvStatusAlert").append("This Contract Record has not been assigned a status. [<span class='right-float Contribute'><a href='javascript:void(0)' onclick='ManageStatus()'>Manage Status</a></span>]");
                }

            });
        }
    });
    GetTodoComments();
    GetTodoDetail();
});

function GetTodoDetail() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/todos?todoid=' + vTodoID,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (item) {
            var todoType = item.TodoType;

            if (item.Status == "Complete") {
                $("#btnApprove").css("display", "none");
                $("#btnReject").css("display", "none");
            }
            else {
                if (todoType == "Contract Approval") {
                    $("#btnApprove").css("display", "");
                    $("#btnReject").css("display", "");
                }
                else if (todoType == "Contract Review") {
                    $("#btnApprove").css("display", "");
                    $("#btnApproveText").html('Reviewed');
                }
                else if (todoType == "Document Approval") {
                    $("#btnApprove").css("display", "");
                    $("#btnReject").css("display", "");
                }
                else if (todoType == "Document Review") {
                    $("#btnApprove").css("display", "");
                    $("#btnApproveText").html('Reviewed');
                }
            }


        },
        error:
            function (data) {
            }
    });
}
function GetTodoComments() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/todos/comments?todoid=' + vTodoID,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            $(data).each(function (i, item) {

                if (item.PostType == "Action") {
                    if (item.PostBy == localStorage.UserName) {
                        $("#btnApprove").css("display", "none");
                        $("#btnReject").css("display", "none");
                        return;
                    }
                }
            });
        },
        error:
            function (data) {
            }
    });
}
$('#btnApprove').click(function () {
    PostComment("Action", $('#btnApproveText').html(), '');
});

$('#btnReject').click(function () {
    PostComment("Action", $('#btnRejectText').html(), '');
});

function PostComment(postType,postAction, postContent) {
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
           
            swal("", "Todo " + postAction);
        }
    });
}


function BackToList() {
    window.location = '/Activity/TodoDetails?TodoID=' + vTodoID + '&Action=' + vAction;
}

//Script General End
//Script for Documents Start

    $(document).ready(function () {
        $.ajax({
    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents?contractid=' + getParameterByName('ContractID'),
    type: 'GET',
    cache: false,
    contentType: false,
    headers: { 'eContracts-ApiKey': localStorage.APIKey },
    processData: false,
    success: function (data) {
                var count = 0;
                $(data).each(function (i, item) {
                    $("#tblDocument").append('<tr><td id="DocumentID" style="display:none;">' + item.RowKey + '</td><td id="DocumentName" style="display:none;">' + item.DocumentName + '</td><td class="openmenuDocument" style="padding-left:10px;"><a href=' + encodeURI(item.DocumentUrl) + '>' + item.DocumentName + '</a> <span style="margin-left:30px; padding:0px 10px 0px 10px; background-color:darkgreen; color:white">' + item.Timestamp.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1') + '</span></td></tr>');
                    count++;
});

                $("#lblDocumentsCount").text('(' + count + ')');

                if (!$("#lblDocumentsCount").text().trim()) {
                    $("#tblDocument").append('<tr><td>No items found.</td></tr>');
}

},
    error: function () {
                if (!$("#lblDocumentsCount").text().trim()) {
                    $("#tblDocument").append('<tr><td>No items found.</td></tr>');
}
}

});

            
});
        
//Script for Document End
//Script for Obligation Start
    $(document).ready(function () {
        $.ajax({
    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/obligations?contractid=' + getParameterByName('ContractID'),
    type: 'GET',
    dataType: 'json',
    headers: { 'eContracts-ApiKey': localStorage.APIKey },
    cache: false,
    success: function (contactsJsonPayload) {
                var count = 0;
                $(contactsJsonPayload).each(function (i, item) {
                    if (item.ObligationMet == "Yes" || item.ObligationMet == "yes") {
                        $("#tblObligation").append('<tr><td id="ObligationID" style="display:none;">' + item.RowKey + '</td><td id="ObligationTitle" style="display:none;">' + item.ObligationTitle + '</td><td height="30px"><input type="checkbox" id=' + item.RowKey + ' name=chkValue disabled="disabled" value=' + item.RowKey + ' checked/></td><td class="openmenuObligation" style="padding-left:10px;">' + item.ObligationTitle + '<span style="margin-left:30px; padding:0px 10px 0px 10px; background-color:darkgreen; color:white">' + item.DueDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1') + '</span></td></tr>');
}
else {
                        $("#tblObligation").append('<tr><td id="ObligationID" style="display:none;">' + item.RowKey + '</td><td id="ObligationTitle" style="display:none;">' + item.ObligationTitle + '</td><td height="30px"><input type="checkbox" id=' + item.RowKey + ' name=chkValue disabled="disabled" value=' + item.RowKey + '/></td><td class="openmenuObligation" style="padding-left:10px;">' + item.ObligationTitle + '<span style="margin-left:30px; padding:0px 10px 0px 10px; background-color:darkgreen; color:white">' + item.DueDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1') + '</span></td></tr>');
}
                    count++;
});
                $("#lblObligationsCount").text('(' + count + ')');
                if (!$("#lblObligationsCount").text().trim()) {
                    $("#tblObligation").append('<tr><td>No items found.</td></tr>');
}
                $(".openmenuObligation").contextMenu({ menu: 'dropdownMenu', leftButton: true }, function (action, el, pos) { contextMenuObligation(action, el.parent("tr"), pos); });
},
    error: function () {
                if (!$("#lblObligationsCount").text().trim()) {
                    $("#tblObligation").append('<tr><td>No items found.</td></tr>');
}
}

});
});

//Script for Obligation End
//Script for Milestone Start
    $(document).ready(function () {
        $.ajax({
    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/milestones?contractid=' + getParameterByName('ContractID'),
    type: 'GET',
    dataType: 'json',
    headers: { 'eContracts-ApiKey': localStorage.APIKey },
    cache: false,
    success: function (contactsJsonPayload) {
                var count = 0;
                $(contactsJsonPayload).each(function (i, item) {
                    if (item.MilestoneCompleted == "Yes" || item.MilestoneCompleted == "yes") {
                        $("#tblMilestone").append('<tr><td id="MilestoneID" style="display:none;">' + item.RowKey + '</td><td id="MilestoneTitle" style="display:none;">' + item.MilestoneTitle + '</td><td height="30px"><input type="checkbox" id=' + item.RowKey + ' name=chkValue disabled="disabled" value=' + item.RowKey + ' checked/></td><td class="openmenuMilestone" style="padding-left:10px;">' + item.MilestoneTitle + '<span style="margin-left:30px; padding:0px 10px 0px 10px; background-color:darkgreen; color:white">' + item.MilestoneDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1') + '</span></td></tr>');
} else {
                        $("#tblMilestone").append('<tr><td id="MilestoneID" style="display:none;">' + item.RowKey + '</td><td id="MilestoneTitle" style="display:none;">' + item.MilestoneTitle + '</td><td height="30px" ><input type="checkbox" id=' + item.RowKey + ' name=chkValue disabled="disabled" value=' + item.RowKey + '/></td><td class="openmenuMilestone" style="padding-left:10px;">' + item.MilestoneTitle + '<span style="margin-left:30px; padding:0px 10px 0px 10px; background-color:darkgreen; color:white">' + item.MilestoneDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1')+ '</span></td></tr>');
}
                    count++;
});

                $("#lblMilestonesCount").text('(' + count + ')');
                if (!$("#lblMilestonesCount").text().trim()) {
                    $("#tblMilestone").append('<tr><td>No items found.</td></tr>');
}
                $(".openmenuMilestone").contextMenu({ menu: 'dropdownMenu', leftButton: true }, function (action, el, pos) { contextMenuMilestone(action, el.parent("tr"), pos); });
},
    error: function () {
                if (!$("#lblMilestonesCount").text().trim()) {
                    $("#tblMilestone").append('<tr><td>No items found.</td></tr>');
}
}
});
});
//Script for Milestone End
//Script for Amendment Start
       
    $(document).ready(function () {

        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/amendments?contractid=' + getParameterByName('ContractID'),
            type: 'GET',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            cache: false,
            success: function (contactsJsonPayload) {
                var count = 0;
                $(contactsJsonPayload).each(function (i, item) {
                    var vDesc = item.AmendmentDescription;
                    if (vDesc == null || vDesc == '') {
                        vDesc = '';
                    }
                    $("#tblAmendment").append('<tr><td id="AmendmentID" style="display:none;">' + item.RowKey
                        + '</td><td id="AmendmentTitle" style="display:none;">' + item.AmendmentTitle
                        + '</td><td><div class="content_bottom"><p class="text1 width65">' + item.AmendmentTitle
                        + '&nbsp;&nbsp;<font style="color: #939393;">' + vDesc
                        + '</font></p><img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuAmendment"/></div></td></tr>');
                   
                    count++;
                });
                $("#lblAmendmentsCount").text('(' + count + ')');
                if (!$("#lblAmendmentsCount").text().trim()) {
                    $("#tblAmendment").append('<tr><td>No items found.</td></tr>');
                }
                $(".openmenuAmendment").contextMenu({ menu: 'dropdownMenu', leftButton: true }, function (action, el, pos) { contextMenuAmendment(action, el.parent("tr"), pos); });
            },
            error: function () {
                if (!$("#lblAmendmentsCount").text().trim()) {
                    $("#tblAmendment").append('<tr><td>No items found.</td></tr>');
                }
            }
        });
    });

//Script for Amendment End
//Script for Term Picker Start
    $(document).ready(function () {
    //get all terms in the picker
        $.ajax({
    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/terms',
    type: 'GET',
    dataType: 'json',
    headers: { 'eContracts-ApiKey': localStorage.APIKey },
            "Content-Type": "application/json",
    cache: false,
    success: function (contactsJsonPayload) {
                $(contactsJsonPayload).each(function (i, item) {
                    $("#tblTermPicker").append('<tr><td id="TermIDPicker" style="display:none;">' + item.RowKey + '</td><td id="TermTitlePicker" style="display:none;">' + item.TermTitle + '</td><td height="20px" class="labelleft"><input type="radio" name="terms" value=' + item.RowKey + '>' + item.TermTitle + '</td><td class="labelright" align="right">' + item.TermText + '</td></tr>');
});
}
});
});
//Script for term picker end
//Script for Term Start
    $(document).ready(function () {
        $.ajax({
    url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/terms/contract?contractid=' + getParameterByName('ContractID'),
    type: 'GET',
    dataType: 'json',
    headers: { 'eContracts-ApiKey': localStorage.APIKey },
            "Content-Type": "application/json",
    cache: false,
    success: function (contactsJsonPayload) {
                var count = 0;
                $(contactsJsonPayload).each(function (i, item) {
                    var vText = item.TermText;
                    if (vText == null || vText == '') {
                        vText = '';
                    }
                    $("#tblTerm").append('<tr><td id="TermID" style="display:none;">' + item.RowKey + '</td><td id="TermTitle" style="display:none;">' + item.TermTitle
                            + '</td><td><div class="content_bottom"><p class="text1 maxwidth65">' + item.TermTitle
                            + '&nbsp;&nbsp;<font style="color: #939393;">' + vText + '</font></p><img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuTerm"/></div></td></tr>');
                    count++;
});

                $("#lblTermsCount").text('(' + count + ')');
                if (!$("#lblTermsCount").text().trim()) {
                    $("#tblTerm").append('<tr><td>No items found.</td></tr>');
}
                $(".openmenuTerm").contextMenu({ menu: 'dropdownMenu', leftButton: true }, function (action, el, pos) { contextMenuTerm(action, el.parent("tr"), pos); });
},
    error: function () {
                if (!$("#lblTermsCount").text().trim()) {
                    $("#tblTerm").append('<tr><td>No items found.</td></tr>');
}
}
});
});
//Script for Term End