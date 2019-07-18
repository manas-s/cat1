/// <reference path="../App.js" />
var statusRequired = ["New", "Drafting", "Awaiting Review", "Reviewed", "In Negotiation", "Awaiting Approval", "Approved", "Negotiation Complete", "Ready for Signature", "Awaiting Signatures", "Signed", "Active", "Up for Renewal", "Renewed", "Extended", "About to Expire"];
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
    $("#txtDueDate").datepicker();

    $("#dvBrowse").dialog({
        autoOpen: false,
        closeText: "",
        width: "95%",
        title: "Task",
        modal: true,
        buttons: {
            "OK": function () { SelectElement(); $(this).dialog("close"); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
    $("#dvBrowseUser").dialog({
        autoOpen: false,
        closeText: "",
        width: "95%",
        title: "Task",
        modal: true,
        buttons: {
            "OK": function () {
                var vUsers = "";
                $('input:checkbox[name="Users"]:checked').each(function () {
                    if (vUsers == "") {
                        vUsers = this.value;
                    }
                    else {
                        vUsers += "; " + this.value;
                    }
                });
                $("#txtBrowseUser").val(vUsers);
                $(this).dialog("close");
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
});

function ApproveContract() { $("#spElement").html("Contract"); }

function ApproveDocument() { $("#spElement").html("Document"); }


function Browse() {
    $("#loadingPage").fadeIn();
    $("#txtSearchBoxTodoForm").val("");
    var value = $("input:radio[name=ApprovalProcess]:checked").val();
    if (value == "Contract") {
        $('#compact-paginationContractsTodo').css('display', '');
        $('#compact-paginationDocumentsTodo').css('display', 'none');

        $("#tblDocumentsTodo").css("display", "none");
        $("#tblContractsTodo").css("display", "");
        if ($("#tblContractsTodo li").length == 0) {
            BindContracts();
        }
        else {
            $("#loadingPage").fadeOut();
            $("#dvBrowse").dialog("option", "title", "Select Contract");
            $("#dvBrowse").dialog("open");
        }

    }
    else if (value == "Document") {
        $('#compact-paginationDocumentsTodo').css('display', '');
        $('#compact-paginationContractsTodo').css('display', 'none');

        $("#tblDocumentsTodo").css("display", "");
        $("#tblContractsTodo").css("display", "none");
        if ($("#tblDocumentsTodo li").length == 0) {
            BindDocuments();
        }
        else {
            $("#loadingPage").fadeOut();
            $("#dvBrowse").dialog("option", "title", "Select Document");
            $("#dvBrowse").dialog("open");
        }
    }
}

function BindContracts() {
    $("#tblContractsTodo").empty();
    $.ajax({
        //url: '/api/accounts/' + localStorage.AccountID + '/Contracts',
        url: '/api/accounts/' + localStorage.AccountID + '/Contracts',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName },
        success: function (data) {
            var v = $(data).length;
            var contractTags = [];
            $(data).each(function (i, item) {
                var sRowKey = item.RowKey;
                var sContractTitle = item.ContractTitle;
                var sContractNumber = item.ContractNumber;
                if ((($.inArray(item.Status, statusRequired) > -1) || (item.IsDraft == "Yes" && item.CreatedBy == localStorage.UserName)) && item.InRecycleBin != "Yes") {
                    var article = '<li>';
                    article += '<input id="' + sRowKey + '" type="radio" name="Contracts" class="css-checkbox" value="' + sContractTitle + '" />';
                    article += '<label for="' + sRowKey + '" class="css-label PreserveSpace">' + sContractTitle + '</label>';
                    article += '</li>';
                    $("#tblContractsTodo").append(article);
                    if (i == v - 1) {
                    }
                    contractTags.push(sContractTitle);
                }
            });

            $("#txtSearchBoxTodoForm").autocomplete({
                source: contractTags
            });

            var vCount = $("#tblContractsTodo li").length;
            $('#compact-paginationContractsTodo').pagination({
                items: vCount,
                itemsOnPage: 5,
                type: 'ul',
                typeID: 'tblContractsTodo',
                row: 'li',
                cssStyle: 'compact-theme'
            });
            $("#loadingPage").fadeOut();
            $("#dvBrowse").dialog("option", "title", "Select Contract");
            $("#dvBrowse").dialog("open");
        },
        error:
            function (data) {
                $("#loadingPage").fadeOut();
            }
    });
}

function BindDocuments() {
    $.ajax({
        url: '/api/accounts/' + localStorage.AccountID + '/documents/documentswithoutfolder',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            var v = $(data).length;
            var documentTags = [];
            $(data).each(function (i, item) {
                var sRowKey = item.RowKey;
                var sDocumentName = item.DocumentName;

                var article = '<li>';
                article += '<input id="' + sRowKey + '" type="radio" name="Documents" class="css-checkbox" value="' + sDocumentName + '" />';
                article += '<label for="' + sRowKey + '" class="css-label tagfiles">' + sDocumentName + '</label>';
                article += '</li>';
                $("#tblDocumentsTodo").append(article);
                if (i == v - 1) {
                    $('#dvLoading').css("display", "none");
                }
                documentTags.push(sDocumentName);
            });

            $("#txtSearchBoxTodoForm").autocomplete({
                source: documentTags
            });

            $('.tagfiles').linktype();
            var vCount = $("#tblDocumentsTodo li").length;
            $('#compact-paginationDocumentsTodo').pagination({
                items: vCount,
                itemsOnPage: 5,
                type: 'ul',
                typeID: 'tblDocumentsTodo',
                row: 'li',
                cssStyle: 'compact-theme'
            });
            $("#loadingPage").fadeOut();
            $("#dvBrowse").dialog("option", "title", "Select Document");
            $("#dvBrowse").dialog("open");
        },
        error:
            function (data) {
                $("#loadingPage").fadeOut();
            }
    });
}
function BrowseUser() {
    $("#loadingPage").fadeIn();
    if ($('#tblUser tr').length <= 0) {
        BindUsers();
    }
    else {
        $("#loadingPage").fadeOut();
        $("#dvBrowseUser").dialog("option", "title", "Select User");
        $("#dvBrowseUser").dialog("open");
    }
}

function BindUsers() {
    $.ajax({
        url: '/api/accounts/' + localStorage.AccountID + '/users',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        success: function (data) {
            var v = $(data).length;
            $(data).each(function (i, item) {
                var sRowKey = item.RowKey;
                var sUserName = item.UserName;
                $('#tblUser').append('<tr><td class="labelleft f_list"><input id="' + sRowKey + '" name="Users" type="checkbox" class="css1-checkbox" value="' + sUserName + '" />'
                                    + '<label class="css1-label" for="' + sRowKey + '">&nbsp;&nbsp;' + sUserName
                                    + '</label></td></tr>');
            });
            $("#loadingPage").fadeOut();
            $("#dvBrowseUser").dialog("option", "title", "Select User");
            $("#dvBrowseUser").dialog("open");
        },
        error:
            function (data) {
            }
    });
}

function SelectElement() {
    var vSelectedElement = null;
    var value = $("input:radio[name=ApprovalProcess]:checked").val();
    if (value == "Contract") {
        vSelectedElement = $('input[name=Contracts]:checked');
    }
    else if (value == "Document") {
        vSelectedElement = $('input[name=Documents]:checked');
    }
    $("#txtBrowseElement").val($(vSelectedElement).val());
    $("#txtBrowseElementID").val($(vSelectedElement).attr("id"));
}

function SaveTodo() {
    if (requiredValidator('saveForm', false)) {
        var contractID = '';
        var contractTitle = '';
        var requestID = '';
        var requestTitle = '';
        var documentID = '';
        var documentName = '';
        var todoType = '';
        var value = $("input:radio[name=ApprovalProcess]:checked").val();
        if (value == "Contract") {
            contractID = $("#txtBrowseElementID").val();
            contractTitle = $("#txtBrowseElement").val();
            todoType = 'Contract Approval';
        }
        else if (value == "Document") {
            documentID = $("#txtBrowseElementID").val();
            documentName = $("#txtBrowseElement").val();
            todoType = 'Document Approval';
        }
        var todoTitle = $("#txtTodoTitle").val();
        var note = $("#txtNotes").val();
        var todoDate = $("#txtDueDate").val();
        var status = 'Pending';
        var notifyMe = $("#chkNotifyMe").is(':checked') ? 'Yes' : 'No';
        var remindMe1 = $("#txtRemind1").val();
        var remindMe2 = $("#txtRemind2").val();
        var remindMe3 = $("#txtRemind3").val();

        var todoAssignTo = $('#txtBrowseUser').val();
        $.ajax({
            url: '/api/accounts/' + localStorage.AccountID + '/todos',
            type: 'POST',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            data: {
                ContractID: contractID,
                ContractTitle: contractTitle,
                RequestID: requestID,
                RequestTitle: requestTitle,
                DocumentID: documentID,
                DocumentName: documentName,
                TodoTitle: todoTitle,
                TodoType: todoType,
                Note: note,
                TodoDate: todoDate,
                Status: status,
                AssignTo: todoAssignTo,
                NotifyMe: notifyMe,
                RemindMe1: remindMe1,
                RemindMe2: remindMe2,
                RemindMe3: remindMe3,
                CreatedBy: localStorage.UserName,
                ModifiedBy: ''
            },
            cache: false,
            success: function (person) {
                ClearForm();
                $("#loadingPage").fadeOut();
                app.initialize();
                app.showNotification("", "Approval workflow started and tasks assigned.");
            }
        });
    }
    else {
        $("#loadingPage").fadeOut();
        app.initialize();
        app.showNotification("", "Please enter required fields.");
    }
}

function ClearForm() {
    $(':input', '#saveForm')
  .removeAttr('checked')
  .removeAttr('selected')
  .not(':button, :submit, :reset, :hidden, :radio, :checkbox')
  .val('');
    $('select', '#saveForm')
  .not(':button, :submit, :reset, :hidden, :radio, :checkbox')
  .val('0');
    $('input[type="radio"][name="ApprovalProcess"][value="Contract"]').prop('checked', true);
}

function Search() {
    var value = $("input:radio[name=ApprovalProcess]:checked").val();
    if (value == "Contract") {
        $("#tblContractsTodo").empty();
        $('#dvLoading').css("display", "");
        $('#dvLoading').html('<img src="../../Content/Images/icon/loading.gif"> Searching...');
        //var vURL = '/api/accounts/' + localStorage.AccountID + '/Contracts?searchkeyword=' + encodeURIComponent($("#txtSearchBoxTodoForm").val()) + '&customquery=&sortbyfield=ContractTitle&orderby=ASC';
        var vURL = '/api/accounts/' + localStorage.AccountID + '/Contracts?stage=&searchkeyword=' + encodeURIComponent($("#txtSearchBoxTodoForm").val()) + '&customquery=&sortbyfield=ContractTitle&orderby=ASC';
        $.ajax({
            url: vURL,
            type: 'GET',
            dataType: 'json',
            "Content-Type": "application/json",
            headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName },
            cache: false,
            success: function (data) {

                $(data).each(function (i, item) {
                    var sRowKey = item.RowKey;
                    var sContractTitle = item.ContractTitle;
                    if ($("#txtSearchBoxTodoForm").val() == "" || sContractTitle.toLowerCase().indexOf($("#txtSearchBoxTodoForm").val().toLowerCase()) >= 0) {
                        var sContractNumber = item.ContractNumber;

                        var article = '<li>';
                        article += '<input id="' + sRowKey + '" type="radio" name="Contracts" class="css-checkbox" value="' + sContractTitle + '" />';
                        article += '<label for="' + sRowKey + '" id="' + sRowKey + '_label" class="css-label PreserveSpace">' + sContractTitle + '</label>';
                        article += '</li>';
                        $("#tblContractsTodo").append(article);

                        $("#" + sRowKey).val($('<div/>').text(item.ContractTitle).html());
                        $("#" + sRowKey + "_label").html($('<div/>').text(item.ContractTitle).html());
                    }
                });
                var vCount = $("#tblContractsTodo li").length;
                if (vCount != 0) {
                    $('#dvLoading').html('');
                    $('#compact-paginationContractsTodo').css('display', '');
                    $('#compact-paginationContractsTodo').pagination({
                        items: vCount,
                        itemsOnPage: 5,
                        type: 'ul',
                        typeID: 'tblContractsTodo',
                        row: 'li',
                        cssStyle: 'compact-theme'
                    });
                } else {
                    $('#dvLoading').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No Contract Found!</p>')
                    $('#compact-paginationContractsTodo').css('display', 'none');
                }
            },
            error: function () {
                $('#compact-paginationContractsTodo').css('display', 'none');
                $('#dvLoading').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No Contract Found!</p>')
            }
        });
    }
    else if (value == "Document") {

        $('#dvLoading').css("display", "");
        $('#dvLoading').html('<img src="../../Content/Images/icon/loading.gif"> Searching...');
        var vURL = '/api/accounts/' + localStorage.AccountID + '/documents?searchkeyword=' + encodeURIComponent($("#txtSearchBoxTodoForm").val()) + '&customquery=&sortbyfield=DocumentName&orderby=ASC';
        $.ajax({
            url: vURL,
            type: 'GET',
            dataType: 'json',
            "Content-Type": "application/json",
            headers: { 'eContracts-ApiKey': localStorage.APIKey },
            cache: false,
            success: function (data) {
                $("#tblDocumentsTodo").empty();
                $(data).each(function (i, item) {
                    var sRowKey = item.RowKey;
                    var sDocumentName = item.DocumentName;

                    var article = '<li>';
                    article += '<input id="' + sRowKey + '" type="radio" name="Documents" class="css-checkbox" value="' + sDocumentName + '" />';
                    article += '<label for="' + sRowKey + '" class="css-label">' + sDocumentName + '</label>';
                    article += '</li>';
                    $("#tblDocumentsTodo").append(article);
                });
                var vCount = $("#tblDocumentsTodo li").length;
                if (vCount != 0) {
                    $('#dvLoading').html('');
                    $('#compact-paginationDocumentsTodo').css('display', '');
                    $('#compact-paginationDocumentsTodo').pagination({
                        items: vCount,
                        itemsOnPage: 5,
                        type: 'ul',
                        typeID: 'tblDocumentsTodo',
                        row: 'li',
                        cssStyle: 'compact-theme'
                    });
                } else {
                    $('#dvLoading').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No Document Found!</p>')
                    $('#compact-paginationDocumentsTodo').css('display', 'none');
                }
            },
            error: function () {
                $('#compact-paginationDocumentsTodo').css('display', 'none');
                $('#dvLoading').html('<p style="color: red; margin-top: 50px; margin-bottom: 10px; margin-left: 10px;">No Document Found!</p>')
            }
        });
    }
}