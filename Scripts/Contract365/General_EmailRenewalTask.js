var vApiKey = "";
var vCollaborationID = "";
var vSendTo = "";
var vAccountID = '';
var vType = '';
var vContractID = '';
var vTermName = '';
var vStatus = '';
var vUser = '';
var vRenewedOn = '';
var vModified = '';
var vRenewalType = "Manual";
var vSPHostUrl = "";
var renewalTerm = [];
var contractStatus = "";
$(document).ready(function () {
    vAccountID = getParameterByName("Account");
    vType = getParameterByName("Type");
    vContractID = getParameterByName("ContractID");
    vTermName = getParameterByName("TermName");
    vStatus = getParameterByName("Status");
    vUser = getParameterByName("User");
    vRenewedOn = $.datepicker.formatDate('mm/dd/yy', new Date())
    vModified = $.datepicker.formatDate('mm/dd/yy', new Date());
    if (vAccountID != "" && vType != "") {
        getContractDetails();
        if (contractStatus == "Cancelled" || contractStatus == "Expired" || contractStatus == "Replaced" || contractStatus == "Archived" || contractStatus == "On Hold") {
            $("#dvTask").css("display", "none");
            $("#dvExpired").css("display", "none");
            $(".commentsRenew").css("display", "none");
            $("#dvActivityComment b span").html('');
            $("#renewalsMessage").html("This contract has already been " + contractStatus + "");
            $("#loadingPage").fadeOut();
        }
        else {
            if (vStatus == "RenewRenewal" || vStatus == "ExpireRenewal") {
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/Contracts/' + vContractID + '/contractrenewalhistory',
                    type: 'GET',
                    dataType: 'json',
                    'Content-Type': 'application/json',
                    cache: false,
                    headers: { 'eContracts-ApiKey': vApiKey },
                    success: function (data) {
                        if (data.length > 0) {
                            var termdetails = $.grep(data, function (item, i) {
                                return item.RenewableTermName.indexOf(vTermName) > -1
                            });
                            if (termdetails.length > 0) {
                                renewalTerm = termdetails[0];
                                if (renewalTerm.RenewalCommentsXML == "" || renewalTerm.RenewalCommentsXML == null) {
                                    //$("#dvActivityComment").css("display", "none");
                                    $("#dvActivityComment b span").html('');
                                }
                                else {
                                    $("#dvActivityComment b span").html('Activities');
                                    getRenewalCommentHTML(renewalTerm);

                                    //var activity = $(this).find('Activity').text();
                                    //var comment = $(this).find('Comments').text();
                                    //var html = '<li><b class="color_lightgrey"><span class="color_dark" style="margin-right: 20px;">Activity: </span>' + activity + '</b><br><br><b class="color_dark float_left" style="margin-right: 7px;">Comment: </b><div class="taskcomment"><span> ' + comment + '</span></div></li>';
                                }
                            }
                            if (typeof renewalTerm.Status != "undefined" && (renewalTerm.Status != "Renewed" && renewalTerm.Status != "Expired")) {
                            }
                            else {
                                $("#dvActivityComment").css("display", "");
                                $("#dvChecklistRenewal").css('display', 'none');
                                $(".commentsRenew").css('display', 'none');
                                $("#dvActivityComment b span").html('');
                                if (renewalTerm.Status == "Renewed") {
                                    $("#renewalsMessage").html("This contract term has already been 'Renewed'.");
                                }
                                else if (renewalTerm.Status == "Expired") {
                                    $("#renewalsMessage").html("This contract term has already been 'Expired'.");
                                }
                                else {
                                    if (vStatus == "RenewRenewal")
                                        $("#renewalsMessage").html("Sorry, There are no term to 'Renew'.");
                                    if (vStatus == "ExpireRenewal")
                                        $("#renewalsMessage").html("Sorry, There are no term to 'Expire'.");
                                }
                            }
                            $("#loadingPage").fadeOut();
                        }
                        else {
                            $("#dvTask").css("display", "none");
                            $("#dvExpired").css("display", "none");
                            $("#loadingPage").fadeOut();
                        }
                    },
                    error:
                    function (data) {

                        $("#dvTask").css("display", "none");
                        $("#dvExpired").css("display", "none");
                        $("#loadingPage").fadeOut();
                    }
                });
            }
            else {
                $("#loadingPage").fadeIn();
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/Contracts/' + vContractID + '/contractrenewalhistoryupdate',
                    type: 'GET',
                    dataType: 'json',
                    'Content-Type': 'application/json',
                    cache: false,
                    headers: { 'eContracts-ApiKey': vApiKey },
                    success: function (data) {
                        if (data != null) {
                            if (data.RenewalConfirmParticipantsXML != "") {
                                $(data.RenewalConfirmParticipantsXML).find('Participant').each(function () {
                                    var Status = $(this).find('Status').text();
                                    var Name = $(this).find('Name').text();
                                    if (Name == vUser) {
                                        if (Status == "In Progress") {
                                            globalTermAuthorize = data;
                                            if (vStatus == "Renewed")
                                                $("#renewalsMessage").html("You've selected 'Authorized' for the following contract.");
                                            if (vStatus == "Rejected")
                                                $("#renewalsMessage").html("You've selected 'Stop Renewal' for the following contract.");
                                            //PostRenewableHistory(data, 'Authorize');
                                            if (data.RenewalCommentsXML == "" || data.RenewalCommentsXML == null) {
                                                //$("#dvActivityComment").css("display", "none");
                                                $("#dvActivityComment b span").html('');
                                            }
                                            else {
                                                getRenewalCommentHTML(data);
                                                $("#dvActivityComment b span").html('Activities');
                                            }
                                        }
                                        else {
                                            if (Status == "Renewed") {
                                                $("#renewalsMessage").html('');
                                                $("#renewalsMessage").html("You already 'Authorized' for the following contract.");
                                            }
                                            else if (Status == "Rejected") {
                                                $("#renewalsMessage").html('');
                                                $("#renewalsMessage").html("You already 'Rejected' for the following contract.");
                                            }
                                            if (data.RenewalCommentsXML == "" || data.RenewalCommentsXML == null) {
                                                //$("#dvActivityComment").css("display", "none");
                                                $("#dvActivityComment b span").html('');
                                            }
                                            else {
                                                getRenewalCommentHTML(data);
                                                $("#dvActivityComment").css("display", "");
                                                $("#dvActivityComment b span").html('Activities');
                                            }
                                            $(".commentsRenew").css('display', 'none');

                                        }
                                    }
                                });
                            }
                            else {
                                if (data.RenewalCommentsXML == "" || data.RenewalCommentsXML == null) {
                                    //$("#dvActivityComment").css("display", "none");
                                    $("#dvActivityComment b span").html('');
                                }
                                else {
                                    getRenewalCommentHTML(data);
                                    $("#dvActivityComment b span").html('Activities');
                                }
                                $("#dvActivityComment").css("display", "");
                                $(".commentsRenew").css('display', 'none');
                            }
                        }
                        $("#loadingPage").fadeOut();
                    },
                    error:
                    function (data) {
                        $("#dvTask").css("display", "");
                        $("#dvExpired").css("display", "none");
                        $("#loadingPage").fadeOut();
                    }
                });

            }
        }
    }
    else {
        $("#dvTask").css("display", "none");
        $("#dvExpired").css("display", "none");
        $("#dvRenewalExpire").css("display", "none");
    }
});








function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getAPIKey(AccountID) {
    var aKey = '';
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

function showAllActivities(item) {
    if ($("ul li.moreComments").css('display') == "none") {
        $("ul li.moreComments").css('display', '');
        $($(item)[0]).html('Show Less');
    }
    else {
        $("ul li.moreComments").css('display', 'none');
        $($(item)[0]).html('Show Older');
    }
}

function getContractDetails() {
    vApiKey = getAPIKey(vAccountID);
    $("#loadingPage").fadeIn();
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/Contracts?contractid=' + vContractID,
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': vApiKey },
        async: false,
        processData: false,
        success: function (item) {
            contractStatus = item.Status;
            if (vStatus == "RenewRenewal") {
                $("#dvRenewedTerm").css('display', 'none');
                $("#dvContractTitle").css('display', '');
                $("#dvCounterpartyName").css('display', '');
                $("#dvStartDate").css('display', 'none');
                $("#dvEndDate").css('display', '');

                var conTitle = '<a href="/Contracts/ContractDetails?ContractID=' + item.RowKey + '&SPHostUrl=' + vSPHostUrl + '" target="_blank" class="PreserveSpace conTitle" style="color: #6a8ae2;">' + item.ContractTitle + '</a>';
                $("#spContractTitle").html(conTitle);

                if (item.Counterparty != '' && item.Counterparty != null)
                    $("#spCounterpartyName").html(item.Counterparty);
                else
                    $("#spCounterpartyName").html('-');

                if (item.StartDate != '' && item.StartDate != null)
                    $("#spStartDate").html($.datepicker.formatDate('mm/dd/yy', new Date(item.StartDate)));
                else
                    $("#spStartDate").html('-');

                if (item.TermEndDate != '' && item.TermEndDate != null)
                    $("#spEndDate").html($.datepicker.formatDate('mm/dd/yy', new Date(item.TermEndDate)));
                else
                    $("#spEndDate").html('-');


                var nextStart = 'na', nextEnd = 'na';
                if (item.NextTermStartDate != '' && item.NextTermStartDate != null) {
                    nextStart = $.datepicker.formatDate('mm/dd/yy', new Date(item.NextTermStartDate));
                }
                if (item.NextTermEndDate != '' && item.NextTermEndDate != null) {
                    nextEnd = $.datepicker.formatDate('mm/dd/yy', new Date(item.NextTermEndDate));
                }
                if (nextEnd != 'na' && nextStart != 'na') {
                    var vDiffRenew = DiffBetDate(nextStart, nextEnd);
                    $("#spRenewedTerm").html(nextStart + ' - ' + nextEnd + ' (' + vDiffRenew + ')');
                }
                else {

                    $("#spRenewedTerm").html(nextStart + ' - ' + nextEnd);
                }

                $("#renewalsMessage").html("You've selected 'Renew' for the following renewal contract.");
                $("#dvActivityComment").css("display", "");
            }
            else if (vStatus == "ExpireRenewal") {
                $("#dvRenewedTerm").css('display', 'none');
                $("#dvContractTitle").css('display', '');
                $("#dvCounterpartyName").css('display', '');
                $("#dvStartDate").css('display', '');
                $("#dvEndDate").css('display', '');

                var conTitle = '<a href="/Contracts/ContractDetails?ContractID=' + item.RowKey + '&SPHostUrl=' + vSPHostUrl + '" target="_blank" class="PreserveSpace conTitle" style="color: #6a8ae2;">' + item.ContractTitle + '</a>';
                $("#spContractTitle").html(conTitle);

                if (item.Counterparty != '' && item.Counterparty != null)
                    $("#spCounterpartyName").html(item.Counterparty);
                else
                    $("#spCounterpartyName").html('-');

                if (item.StartDate != '' && item.StartDate != null)
                    $("#spStartDate").html($.datepicker.formatDate('mm/dd/yy', new Date(item.StartDate)));
                else
                    $("#spStartDate").html('-');

                if (item.EndDate != '' && item.EndDate != null)
                    $("#spEndDate").html($.datepicker.formatDate('mm/dd/yy', new Date(item.EndDate)));
                else
                    $("#spEndDate").html('-');

                $("#dvChecklistRenewal").css('display', 'none');
                $("#renewalsMessage").html("You've selected 'Expire' for the following renewal contract.");
                $("#dvActivityComment").css("display", "");
            }
            else if (vStatus == "Renewed") {
                $("#dvRenewedTerm").css('display', 'none');
                $("#dvContractTitle").css('display', '');
                $("#dvCounterpartyName").css('display', '');
                $("#dvStartDate").css('display', '');
                $("#dvEndDate").css('display', '');
                $("#dvChecklistRenewal").css('display', 'none');

                var conTitle = '<a href="/Contracts/ContractDetails?ContractID=' + item.RowKey + '&SPHostUrl=' + vSPHostUrl + '" target="_blank" class="PreserveSpace conTitle" style="color: #6a8ae2;">' + item.ContractTitle + '</a>';
                $("#spContractTitle").html(conTitle);

                if (item.Counterparty != '' && item.Counterparty != null)
                    $("#spCounterpartyName").html(item.Counterparty);
                else
                    $("#spCounterpartyName").html('-');

                if (item.StartDate != '' && item.StartDate != null)
                    $("#spStartDate").html($.datepicker.formatDate('mm/dd/yy', new Date(item.StartDate)));
                else
                    $("#spStartDate").html('-');

                if (item.EndDate != '' && item.EndDate != null)
                    $("#spEndDate").html($.datepicker.formatDate('mm/dd/yy', new Date(item.EndDate)));
                else
                    $("#spEndDate").html('-');

                //$("#renewalsMessage").html("You've selected 'Authorized' for the following contract renewal.");
                $("#dvActivityComment").css("display", "");
            }
            else if (vStatus == "Rejected") {
                $("#dvRenewedTerm").css('display', 'none');
                $("#dvContractTitle").css('display', '');
                $("#dvCounterpartyName").css('display', '');
                $("#dvStartDate").css('display', '');
                $("#dvEndDate").css('display', '');
                $("#dvChecklistRenewal").css('display', 'none');

                var conTitle = '<a href="/Contracts/ContractDetails?ContractID=' + item.RowKey + '&SPHostUrl=' + vSPHostUrl + '" target="_blank" class="PreserveSpace conTitle" style="color: #6a8ae2;">' + item.ContractTitle + '</a>';
                $("#spContractTitle").html(conTitle);

                if (item.Counterparty != '' && item.Counterparty != null)
                    $("#spCounterpartyName").html(item.Counterparty);
                else
                    $("#spCounterpartyName").html('-');

                if (item.StartDate != '' && item.StartDate != null)
                    $("#spStartDate").html($.datepicker.formatDate('mm/dd/yy', new Date(item.StartDate)));
                else
                    $("#spStartDate").html('-');

                if (item.EndDate != '' && item.EndDate != null)
                    $("#spEndDate").html($.datepicker.formatDate('mm/dd/yy', new Date(item.EndDate)));
                else
                    $("#spEndDate").html('-');

                //$("#renewalsMessage").html("You've selected 'Rejected' for the following contract renewal.");
                $("#dvActivityComment").css("display", "");
            }
            //$("#loadingPage").fadeOut();
        },
        error: function (item) {
            $("#loadingPage").fadeOut();
        },
        complete: function (item) {
            //getUsers(item);
        }
    });
}


$("#btnSubmit").click(function () {
    if (vStatus == "RenewRenewal") {
        var vRenewalChecklist = "";
        if ($("#chkRenewalModificationsNew").is(':checked')) {
            if (vRenewalChecklist == '') {
                vRenewalChecklist = "Renewal without any modifications";
            }
            else {
                vRenewalChecklist += "; Renewal without any modifications";
            }
        }
        if ($("#chkRenewalPriceAdjustmentsNew").is(':checked')) {
            if (vRenewalChecklist == '') {
                vRenewalChecklist = "Renewal with Price Adjustments (minor)";
            }
            else {
                vRenewalChecklist += "; Renewal with Price Adjustments (minor)";
            }
        }
        if ($("#chkRenewalRepricingNew").is(':checked')) {
            if (vRenewalChecklist == '') {
                vRenewalChecklist = "Renewal with Repricing (major)";
            }
            else {
                vRenewalChecklist += "; Renewal with Repricing (major)";
            }
        }
        if ($("#chkRenewalOtherNew").is(':checked')) {
            if (vRenewalChecklist == '') {
                vRenewalChecklist = "Other Amendments";
            }
            else {
                vRenewalChecklist += "; Other Amendments";
            }
        }

        if (vRenewalChecklist == "") {
            swal("", "Select Renewal Checklist.");
            return false;
        }
        else {
            $("#loadingPage").fadeIn();
            RenewExpireCurrentTerm(renewalTerm, vRenewalChecklist);
            //PostRenewableHistory(renewalTerm, vRenewalChecklist);
        }

    }
    else if (vStatus == "ExpireRenewal") {
        $("#loadingPage").fadeIn();
        RenewExpireCurrentTerm(renewalTerm, "");
        //PostRenewableHistory(renewalTerm, 'Expire');
    }
    else if (vStatus == "Renewed") {
        $("#loadingPage").fadeIn();
        AuthorizeRejectTerm(globalTermAuthorize)
        //PostRenewableHistory(globalTermAuthorize, 'Authorize');
    }
    else if (vStatus == "Rejected") {
        $("#loadingPage").fadeIn();
        AuthorizeRejectTerm(globalTermAuthorize)
        //PostRenewableHistory(globalTermAuthorize, 'Authorize');
    }
});


function PostRenewableHistory(item, vRenewalChecklist) {
    if (vRenewalChecklist != "Authorize" || vRenewalChecklist != "Expire") {
        note = $("#txtNote").val().trim();
    }
    if (note != "" && note != null) {
        var rStatus = '';
        var existingXML = '';
        existingXML += '<RenewalComments>';
        if (item.RenewalCommentsXML != null && item.RenewalCommentsXML != '') {
            $(item.RenewalCommentsXML).find('RenewalComment').each(function () {
                var activity = $(this).find('Activity').text();
                var comment = $(this).find('Comments').text();
                var sendton = $(this).find('SendTo').text();
                var created = $(this).find('Created').text();
                existingXML += '<RenewalComment>';
                existingXML += '<Activity>';
                existingXML += activity;
                existingXML += '</Activity>';

                existingXML += '<Comments>';
                existingXML += comment;
                existingXML += '</Comments>';

                existingXML += '<SendTo>';
                existingXML += sendton;
                existingXML += '</SendTo>';

                existingXML += '<Created>';
                existingXML += created;
                existingXML += '</Created>';

                existingXML += '</RenewalComment>';

            });
        }
        existingXML += '<RenewalComment>';
        existingXML += '<Activity>';
        if (vStatus == "RenewRenewal" && renewalTerm.Status != "Renewed") {
            var time = moment(new Date()).format('MMMM Do YYYY, h:mm A');
            existingXML += vUser + ' has renewed the term ' + item.RenewableTermName + ' on ' + time;
            rStatus = "Renewed";

        }
        else if (vStatus == "ExpireRenewal" && renewalTerm.Status != "Expired") {
            var time = moment(new Date()).format('MMMM Do YYYY, h:mm A');
            existingXML += vUser + ' has expired the term ' + item.RenewableTermName + ' on ' + time;
            rStatus = "Expired";
        }
        else if (vStatus == "Renewed") {
            var time = moment(new Date()).format('MMMM Do YYYY, h:mm A');
            existingXML += vUser + ' has authorized the term ' + item.RenewableTermName + ' on ' + time;

        }
        else if (vStatus == "Rejected") {
            var time = moment(new Date()).format('MMMM Do YYYY, h:mm A');
            existingXML += vUser + ' has rejected the term ' + item.RenewableTermName + ' on ' + time;
        }
        existingXML += '</Activity>';

        existingXML += '<Comments>';
        existingXML += note;
        existingXML += '</Comments>';

        existingXML += '<SendTo>';
        existingXML += '</SendTo>';

        existingXML += '<Created>';
        existingXML += new Date();
        existingXML += '</Created>';

        existingXML += '</RenewalComment>';
        existingXML += '</RenewalComments>';


        item.RenewalCommentsXML = existingXML;



        vRenewalChecklist = (vRenewalChecklist == "Authorize" || vRenewalChecklist == "Expire") ? item.RenewalChecklist : vRenewalChecklist;
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/Contracts/' + vContractID + '/renewalhistory',
            type: 'POST',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': vApiKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            data: {
                ContractID: vContractID,
                RenewableTermName: item.RenewableTermName,
                RenewedFor: item.RenewedFor,
                RenewedBy: item.User,
                RenewedOn: item.RenewedOn,
                RenewedDate: item.RenewedDate,
                NextRenewalDate: item.NextRenewalDate,
                TermEndDate: item.TermEndDate,
                Status: item.Status,
                TermStatus: item.TermStatus,
                Created: item.Created,
                CreatedBy: item.CreatedBy,
                Modified: vModified,
                ModifiedBy: vUser,
                RenewalType: item.RenewalType,
                RenewalNotes: item.RenewalNotes,
                RenewalChecklist: vRenewalChecklist,
                RenewalNotificationInternal: item.RenewalNotificationInternal,
                ContractTermEach: item.ContractTermEach,
                ContractTermChoicesEach: item.ContractTermChoicesEach,
                RenewalConfirmParticipantsXML: item.RenewalConfirmParticipantsXML,
                RenewalConfirmParticipants: item.RenewalConfirmParticipants,
                RenewalConfirmParticipantsCC: item.RenewalConfirmParticipantsCC,
                RenewalConfirmSendDate: item.ContractConfirmSendDate,
                ContractConfirmSendTerm: item.ContractConfirmSendTerm,
                RowKey: item.RowKey,
                RenewalCommentsXML: item.RenewalCommentsXML
            },
            cache: false,
            success: function (data) {
                $(".commentsRenew").css('display', 'none');
                $("#dvTask").css("display", "");
                $("#dvExpired").css("display", "none");
                $("#dvRenewalExpire").css("display", "");
                $("#dvChecklistRenewal").css("display", "none");
                $('input[type="checkbox"][name="checkboxNotifyNew"]').prop('checked', false);
                var activity = '';
                var comment = $("#txtNote").val();
                var html = '<li><b class="color_lightgrey"><span class="color_dark" style="margin-right: 20px;">Activity: </span>' + activity + '</b><br><br><b class="color_dark float_left" style="margin-right: 7px;">Comment: </b><div class="taskcomment"><span> ' + comment + '</span></div></li>';
                $(".toDoContenList").append(html);
                $("#txtNote").val('');
                if (vStatus == "RenewRenewal")
                    $("#dvTask").html('<img src="../Content/Images/right.png" style="margin: 1px 5px 0 0; vertical-align:text-top" /> You have successfully renewed for this contract.');
                else if (vStatus == "ExpireRenewal")
                    $("#dvTask").html('<img src="../Content/Images/right.png" style="margin: 1px 5px 0 0; vertical-align:text-top" /> You have successfully expired for this contract.');

                if (vStatus == "RenewRenewal" || vStatus == "ExpireRenewal") {
                    $("#loadingPage").fadeOut();
                }
            },
            error: function (data) {
                $("#dvTask").css("display", "none");
                $("#dvExpired").css("display", "none");
                $("#loadingPage").fadeOut();
            },
            complete: function (data) {
                if (vStatus == "Renewed" || vStatus == "Rejected") {
                    AuthorizeRejectTerm(item);
                }
            }
        });
    }
    else {
        $("#txtNote").css("border-color", "red");
        $("#loadingPage").fadeOut();
    }
}

function getRenewalComments(item) {
    var note = '';
    note = $("#txtNote").val().trim();
    var existingXML = '';
    existingXML += '<RenewalComments>';
    if (item.RenewalCommentsXML != null && item.RenewalCommentsXML != '') {
        $(item.RenewalCommentsXML).find('RenewalComment').each(function () {
            var activity = $(this).find('Activity').text();
            var comment = $(this).find('Comments').text();
            var sendton = $(this).find('SendTo').text();
            var created = $(this).find('Created').text();
            existingXML += '<RenewalComment>';
            existingXML += '<Activity>';
            existingXML += activity;
            existingXML += '</Activity>';

            existingXML += '<Comments>';
            existingXML += comment;
            existingXML += '</Comments>';

            existingXML += '<SendTo>';
            existingXML += sendton;
            existingXML += '</SendTo>';

            existingXML += '<Created>';
            existingXML += created;
            existingXML += '</Created>';

            existingXML += '</RenewalComment>';

        });
    }
    existingXML += '<RenewalComment>';
    existingXML += '<Activity>';
    if (vStatus == "RenewRenewal" && renewalTerm.Status != "Renewed") {
        var time = moment(new Date()).format('MMMM Do YYYY, h:mm A');
        existingXML += vUser + ' has renewed the term ' + item.RenewableTermName + ' on ' + time;

    }
    else if (vStatus == "ExpireRenewal" && renewalTerm.Status != "Expired") {
        var time = moment(new Date()).format('MMMM Do YYYY, h:mm A');
        existingXML += vUser + ' has expired the term ' + item.RenewableTermName + ' on ' + time;
    }
    else if (vStatus == "Renewed") {
        var time = moment(new Date()).format('MMMM Do YYYY, h:mm A');
        existingXML += vUser + ' has authorized the term ' + item.RenewableTermName + ' on ' + time;

    }
    else if (vStatus == "Rejected") {
        var time = moment(new Date()).format('MMMM Do YYYY, h:mm A');
        existingXML += vUser + ' has rejected the term ' + item.RenewableTermName + ' on ' + time;
    }
    existingXML += '</Activity>';

    existingXML += '<Comments>';
    existingXML += note;
    existingXML += '</Comments>';

    existingXML += '<SendTo>';
    existingXML += '</SendTo>';

    existingXML += '<Created>';
    existingXML += new Date();
    existingXML += '</Created>';

    existingXML += '</RenewalComment>';
    existingXML += '</RenewalComments>';


    return existingXML;


}

function RenewExpireCurrentTerm(item, vRenewChecklist) {
    var renewComments = getRenewalComments(item);
    var commentA = $("#txtNote").val().replace(/\n/g, " ");
    if (vStatus == "RenewRenewal") {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/Contracts/' + vContractID + '/renewalhistory',
            type: 'POST',
            dataType: 'json',
            headers: { 'eContracts-ApiKey': vApiKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'UserName': vUser, 'Comments': commentA },
            data: {
                ContractID: vContractID,
                RenewableTermName: item.RenewableTermName,
                RenewedFor: item.RenewedFor,
                RenewedBy: vUser,
                RenewedOn: vRenewedOn,
                RenewedDate: item.RenewedDate,
                NextRenewalDate: item.NextRenewalDate,
                TermEndDate: item.TermEndDate,
                Status: "Renewed",
                TermStatus: item.TermStatus,
                Created: item.Created,
                CreatedBy: item.CreatedBy,
                Modified: vModified,
                ModifiedBy: vUser,
                RenewalType: vRenewalType,
                RenewalNotes: item.RenewalNotes,
                RenewalChecklist: vRenewChecklist,
                RenewalNotificationInternal: item.RenewalNotificationInternal,
                ContractTermEach: item.ContractTermEach,
                ContractTermChoicesEach: item.ContractTermChoicesEach,
                RenewalConfirmParticipantsXML: item.RenewalConfirmParticipantsXML,
                RenewalConfirmParticipants: item.RenewalConfirmParticipants,
                RenewalConfirmParticipantsCC: item.RenewalConfirmParticipantsCC,
                RenewalConfirmSendDate: item.ContractConfirmSendDate,
                ContractConfirmSendTerm: item.ContractConfirmSendTerm,
                RowKey: item.RowKey,
                RenewalCommentsXML: renewComments
            },
            cache: false,
            success: function (data) {
                //var time = moment(new Date()).format('MMMM Do YYYY, h:mm A');
                //var activity = vUser + ' has renewed the term ' + item.RenewableTermName + ' on ' + time;
                //var comment = $("#txtNote").val();
                //var html = '<li><b class="color_lightgrey"><span class="color_dark" style="margin-right: 20px;">Activity: </span>' + activity + '</b><br><br><b class="color_dark float_left" style="margin-right: 7px;">Comment: </b><div class="taskcomment"><span> ' + comment + '</span></div></li>';
                //$(".toDoContenList").append(html);
                item.RenewalCommentsXML = renewComments;
                getRenewalCommentHTML(item);
                $("#dvTask").css('display', '');
                $("#dvTask").html('<img src="../Content/Images/right.png" style="margin: 1px 5px 0 0; vertical-align:text-top" /> You have successfully renewed this contract.');
                $(".commentsRenew").css('display', 'none');
                $("#loadingPage").fadeOut();
            },
            error: function (data) {
            },
        });
    }
    else if (vStatus == "ExpireRenewal") {
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/Contracts/' + vContractID + '/ContractTermEmailTaskExpire?TermName=' + item.RenewableTermName,
            type: 'POST',
            dataType: 'json',
            data: {
                ContractID: vContractID,
                TermCommentsXML: renewComments
            },
            headers: { 'eContracts-ApiKey': vApiKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'UserName': vUser, 'Comments': commentA },
            cache: false,
            success: function (data) {
                //var time = moment(new Date()).format('MMMM Do YYYY, h:mm A');
                //var activity = vUser + ' has renewed the term ' + item.RenewableTermName + ' on ' + time;
                //var comment = $("#txtNote").val();
                //var html = '<li><b class="color_lightgrey"><span class="color_dark" style="margin-right: 20px;">Activity: </span>' + activity + '</b><br><br><b class="color_dark float_left" style="margin-right: 7px;">Comment: </b><div class="taskcomment"><span> ' + comment + '</span></div></li>';
                //$(".toDoContenList").append(html);
                item.RenewalCommentsXML = renewComments;
                getRenewalCommentHTML(item);
                $("#dvTask").css('display', '');
                $("#dvTask").html('<img src="../Content/Images/right.png" style="margin: 1px 5px 0 0; vertical-align:text-top" /> You have successfully expired this contract.');
                $(".commentsRenew").css('display', 'none');
                $("#loadingPage").fadeOut();
            },
            error: function (data) {
                $("#dvTask").css('display', '');
                $("#dvTask").html('Could not expire contract.');
                $(".commentsRenew").css('display', 'none');
                $("#loadingPage").fadeOut();
            },
        });
    }
}

var globalTermAuthorize = [];
function AuthorizeRejectTerm(data) {
    //globalTermAuthorize = data;
    $(data.RenewalConfirmParticipantsXML).find('Participant').each(function () {
        var Status = $(this).find('Status').text();
        var Name = $(this).find('Name').text();
        if (Name == vUser) {
            if (Status == "In Progress") {
                var renewComments = getRenewalComments(data);
                var usernote = $("#txtNote").val().replace(/\n/g, " ");
                $.ajax({
                    url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/Contracts/' + vContractID + '/contractrenewalhistoryupdate?TermName=' + vTermName + '&Status=' + vStatus + '&User=' + vUser,
                    type: 'POST',
                    dataType: 'json',
                    headers: { 'eContracts-ApiKey': vApiKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, 'UserName': localStorage.UserName, 'Comments': usernote },
                    data: {
                        "Comment": renewComments,
                    },
                    cache: false,
                    success: function (task) {
                        $("#loadingPage").fadeOut();
                        //var activity = '';
                        //if (vStatus == "Renewed") {
                        //    var time = moment(new Date()).format('MMMM Do YYYY, h:mm A');
                        //    activity = vUser + ' has authorized the term ' + data.RenewableTermName + ' on ' + time;
                        //    $("#dvTask").css('display', '');
                        //    $("#dvTask").html('<img src="../Content/Images/right.png" style="margin: 1px 5px 0 0; vertical-align:text-top" />  You have Authorized renewal for the contract.');
                        //}
                        //else if (vStatus == "Rejected") {
                        //    var time = moment(new Date()).format('MMMM Do YYYY, h:mm A');
                        //    activity = vUser + ' has rejected the term ' + data.RenewableTermName + ' on ' + time;
                        //    $("#dvTask").css('display', '');
                        //    $("#dvTask").html('<img src="../Content/Images/right.png" style="margin: 1px 5px 0 0; vertical-align:text-top" />  You have Rejected renewal for the contract.');
                        //}
                        data.RenewalCommentsXML = renewComments;
                        getRenewalCommentHTML(data);
                         $(".commentsRenew").css('display', 'none');


                    },
                    error: function (status) {
                        $("#loadingPage").fadeOut();
                    }
                });
            }
        }
    })
}

function getRenewalCommentHTML(data) {
    $("#dvActivityComment").css("display", "");
    $(".toDoContenList").empty();
    var commentArr = [];
    $(data.RenewalCommentsXML).find('RenewalComment').each(function () {
        var dateText = $(this).find("Created").text()

        var item = {
            activity: $(this).find('Activity').text(),
            comment: $(this).find('Comments').text(),
            sendto: $(this).find('SendTo').text(),
            created: new Date(dateText)
            /* other properties*/
        }
        /* push object to array*/
        commentArr.push(item);

    });

    if (commentArr.length > 0) {
        commentArr.sort(function (a, b) {
            return a.created < b.created;
        });
        var htmlComment = '';
        $.each(commentArr, function (index, item) {
            if (index < 2) {
                htmlComment += '<li><b class="color_lightgrey"><span class="color_dark" style="margin-right: 20px;">Activity: </span>' + item.activity + '</b><br><br><b class="color_dark float_left" style="margin-right: 7px;">Comment: </b><div class="taskcomment"><span> ' + item.comment + '</span></div></li>';
            }
            else {
                htmlComment += '<li class="moreComments" style="display:none;"><b class="color_lightgrey"><span class="color_dark" style="margin-right: 20px;">Activity: </span>' + item.activity + '</b><br><br><b class="color_dark float_left" style="margin-right: 7px;">Comment: </b><div class="taskcomment"><span> ' + item.comment + '</span></div></li>';

            }
        });
        if (commentArr.length > 2) {
            htmlComment += '<li style="border: none;"><a href="javascript:void(0);" onclick="showAllActivities(this)" style="color: #44a6d8;">Show Older</a></li>';
        }

        $(".toDoContenList").append(htmlComment);
    }
}

