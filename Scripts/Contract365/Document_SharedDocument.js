var vApiKey = "";
var vCollaborationID = "";
var vSendTo = "";
var vPreviousDocumentExtension = "";
var vAccountID = "";
var documentID = "";
var eContractFeatures = "";
var MaxRequestLength = "";
var vIsComplete = false;
var vInitURL = "";
var vRejectedURL = "";
var vUserName = getParameterByName("UserName");
var vCode = getParameterByName("Code");

$(document).ready(function () {
    //Do not disclose people and activities if it is set as ON
    //KXlnm = "Disclose"
    //EXoUSV5OXbGtZ7O2TTl1aVEmYUBZMQ = "No"
    var vDisclose = getParameterByName("KXlnm");
    var vInitYes = getParameterByName("Init");
    if (vDisclose !== "" && vInitYes === "") {
        $("#people-Right").hide();
        $("#activities-Right").hide();
    } else {
        $("#people-Right").show();
        $("#activities-Right").show();
    }
    //End
    vAccountID = getParameterByName("AccountID");
    vApiKey = getAPIKey(vAccountID);
    GetFeatures();
    documentID = "";
    vPreviousDocumentExtension = "";

    $("#dvUpload").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Upload New Version",
        modal: true,
        buttons: {
            "Upload": function () { UploadNewVersionDocument(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
    //manoj
    //For Rejection
    $("#dvReject").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Confirm Reject",
        modal: true,
        buttons: {
            "Reject": function () { processrejection(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
    //For Rejection

    //User Status
    $("#dvUploadStatus").dialog({
        autoOpen: false, closeText: "",
        width: "50%",
        title: "Update Status",
        modal: true,
        buttons: {
            "Update": function () {
                updatestatus();
            },
            Cancel: function () {
                $("#hdncurrentstatus").text('');
                $("#hdnuserid").text('');
                $(this).dialog("close");
            }
        }
    });

    $("#downloadAction").dialog({
        autoOpen: false, closeText: "",
        width: "30%",
        title: "Download Action",
        modal: true,
        buttons: {
            "Download": function () {
                downloadActionOK();
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    //User Status
    //manoj
    GetMaxRequestLength()


    var vDocumentURL = "";
    var vInit = getParameterByName("Init");
    if (vInit != "y" && getParameterByName("rejectedversion") != "y") {
        LoggedinActionOK();
    }
    $.ajax({
        url: '/Accounts/GetAccountSetting?accountid=' + vAccountID,
        type: 'GET',
        dataType: 'json',
        cache: false,
        success: function (AccountSetting) {
            if (AccountSetting.CompanyLogo != "") {
                $("#accountLogo").attr("src", AccountSetting.CompanyLogo);
                $("#nvAccLogo").css("display", "");
            }
            var vAccFeat = $.grep(eContractFeatures, function (n, i) {
                return (n.RowKey == "29" && n.Status == "ON");
            });
            if (vAccFeat.length > 0) {
                if (AccountSetting.CompanyLogo != "") {
                    $(".FL_CompanyBrandingLogo").attr("src", AccountSetting.CompanyLogo);
                    $(".FL_CompanyBrandingLogo").css('display', '');
                }
                else {
                    $(".FL_CompanyBrandingLogo").css('display', '');
                }
            }
            else {
                $(".FL_CompanyBrandingLogo").css('display', '');
            }
        }
    });
    $.ajax({
        url: '/Documents/GetDocumentCollaborationUser?accountid=' + vAccountID + '&username=' + vUserName + '&code=' + vCode,
        type: 'GET',
        dataType: 'json',
        cache: false,
        async: false,
        success: function (data) {
            vCollaborationID = data.DocumentCollaborationID;
            vSendTo = data.SendTo;
            if (data.Status != 'Complete') {
                $("#dvTask").css("display", "");
                if (data.Status == "Editing") {
                    vIsComplete = true;
                }
            }
            else {
                $("#dvTask").css("display", "none");
                $("#pipelinetext").css("display", "none");
                $("#UploadLink").css("display", "none");
                vIsComplete = true;
            }

            //Initiator
            if (vInit == "y") {
                if (getParameterByName("oldversion") != "y") {
                    if (typeof (data.DocumentURL) != "undefined" && data.DocumentURL != null && data.DocumentURL != "") {
                        vInitURL = data.DocumentURL;
                        $('#lnkDownload').prop('title', 'Download new (modified) version document to your computer');
                        $("#pApprove").css("display", "");
                        //manoj
                        $("#pReject").css("display", "");
                        //manoj
                    } else {
                        $('#lnkDownload').prop('title', 'Download document to your computer');
                        vInitURL = data.RejectedDocumentURL;
                        $("#pApprove").css("display", "none");
                        //manoj
                        $("#pReject").css("display", "none");
                        //manoj
                    }
                } else {
                    $('#lnkDownload').prop('title', 'Download document to your computer');
                    $("#pApprove").css("display", "none");
                    //manoj
                    $("#pReject").css("display", "none");
                    //manoj
                }
                $("#pipelinetext").css("display", "none");
                $("#dvTask").css("display", "none");
                $("#pipelinetext").css("display", "none");
                $("#UploadLink").css("display", "none");
                $("#idDocumentStatus").css("display", "none");
                $(".text1").css("display", "none");
                //$(".postCommentA").css("display", "none");
                //if approved is NO, do not show option to accept or reject
                if (data.Approved == "No") {
                    if (getParameterByName("oldversion") != "y") {
                        swal("", 'You have already rejected the changes in this document.')
                    }
                    $("#pApprove").css("display", "none");
                    //manoj
                    $("#pReject").css("display", "none");
                    //manoj
                } else if (data.Approved == "Yes") {
                    if (data.ReadyToShare == "Yes") {
                        if (getParameterByName("oldversion") != "y") {
                            $("#dvShare").css("display", "");
                        }
                        else {
                            $("#dvShare").css("display", "none");
                        }
                    }
                    else {
                        $("#dvShare").css("display", "none");
                    }
                    if (typeof (data.ReplaceUser) != "undefined" && data.ReplaceUser != null && data.ReplaceUser != "") {
                        if (getParameterByName("oldversion") != "y") {
                            swal("", 'You have already accepted the changes in this document.')
                        }
                    } else {
                        if (getParameterByName("oldversion") != "y") {
                            swal("", 'Document has been replaced.')
                        }
                    }
                    $("#pApprove").css("display", "none");
                    //manoj
                    $("#pReject").css("display", "none");
                    //manoj
                } else {
                    if (data.Status == 'Complete') {
                        swal("", data.SendTo + ' has already completed the negotiation.')
                        $("#pApprove").css("display", "none");
                        //manoj
                        $("#pReject").css("display", "none");
                        //manoj
                    }
                }
            } else {
                //if new version uploaded, and waiting for the initiator to accept/reject changes              
                if (data.Approved == "" && data.DocumentURL != "") {
                    if (getParameterByName("rejectedversion") == "y" && typeof (data.RejectedDocumentURL) != "undefined" && data.RejectedDocumentURL != null && data.RejectedDocumentURL != "") {
                        vInitURL = data.RejectedDocumentURL;
                        $("#pApprove").css("display", "none");
                        //manoj
                        $("#pReject").css("display", "none");
                        //manoj
                    } else if (data.Status != 'Complete' && data.Status != 'Stopped')
                        swal("", 'The new (version) has been shared with the sender.  You will receive an email if there are further updates to this document.  Thank you.')
                } else if (getParameterByName("rejectedversion") == "y" && typeof (data.RejectedDocumentURL) != "undefined" && data.RejectedDocumentURL != null && data.RejectedDocumentURL != "") {
                    vInitURL = data.RejectedDocumentURL;
                    $("#pApprove").css("display", "none");
                    //manoj
                    $("#pReject").css("display", "none");
                    //manoj
                }
            }

            GetAllSharedUsers();
        }
    });

    $.ajax({
        url: '/Documents/GetDocumentCollaboration?accountid=' + vAccountID + '&collaborationid=' + vCollaborationID,
        type: 'GET',
        dataType: 'json',
        cache: false,
        async: false,
        success: function (data) {
            var jsObject = JSON.parse(data);

            if (jsObject.Status == "Stopped") { $("#hdnExpiry").val('Stopped'); } else {
                documentID = jsObject.DocumentID;

                vDocumentURL = encodeURIComponent(jsObject.DocumentURL);
                //show uploaded new version to initiator
                if (vInitURL != "") {
                    vDocumentURL = encodeURIComponent(vInitURL);
                }
                //$("#docURL").attr('href', decodeURIComponent(vDocumentURL));
                $("#docURL").val(decodeURIComponent(vDocumentURL));
                $("#docURLPrev").attr('href', decodeURIComponent(vDocumentURL));
                $("#spSender").html(jsObject.CreatedBy);
                $("#spSenderName").html(jsObject.CreatedBy);
                var vDate = new Date(jsObject.Created);
                $("#spSendDate").html(moment(vDate).format('Do MMM'));
                var start = moment(vDate);
                var end = moment(new Date());
                var vv = end.diff(start, "days");

                if (vv >= parseInt(jsObject.ExpIn)) {
                    $("#hdnExpiry").val('Yes');
                }
                else { $("#hdnExpiry").val('No'); }
                $("#spValidTill").html(moment(vDate).add(parseInt(jsObject.ExpIn), 'day').format('Do MMM'));
                if (!vIsComplete) {
                    $("#postComment").css("display", "");
                }
            }
        }
    });
    if ($("#hdnExpiry").val() == "Yes") {
        $("#dvExpired").css("display", "");
        $("#dvTask").css("display", "none");
        $("#pipelinetext").css("display", "none");
        $("#UploadLink").css("display", "none");
        $("#mid-section1").css("display", "none");
        $("#postComment").css("display", "none");
    } else if ($("#hdnExpiry").val() == "Stopped") {
        $("#dvStopped").css("display", "");
        $("#dvTask").css("display", "none");
        $("#pipelinetext").css("display", "none");
        $("#UploadLink").css("display", "none");
        $("#mid-section1").css("display", "none");
        $("#postComment").css("display", "none");
    }
    else {
        $("#dvExpired").css("display", "none");
        $("#mid-section1").css("display", "");
        var srcurl = vDocumentURL;
        if (vDocumentURL.indexOf(".doc") >= 0 || vDocumentURL.indexOf(".ppt") >= 0 || vDocumentURL.indexOf(".xls") >= 0 || vDocumentURL.indexOf(".dot") >= 0) {
            //manoj
            if (!Checkbrowsernameandversion()) {
                $("#fileDisplay").css("display", "none");
                $("#noPreview").css("display", "");
                $("#fileDisplayimg").css("display", "none");
            } else {
                //manoj
                $("#noPreview").css("display", "none");
                $("#fileDisplay").css("display", "");
                srcurl = "https://view.officeapps.live.com/op/embed.aspx?src=" + vDocumentURL + "?" + randomPassword(4) + "&wdStartOn=1&wdEmbedCode=0";
                $('#fileDisplay').attr('src', srcurl);
                $("#fileDisplayimg").css("display", "none");
            }
        }
        else if (vDocumentURL.indexOf(".pdf") >= 0) {
            $("#fileDisplay").css("display", "");
            $("#noPreview").css("display", "none");
            srcurl = "https://docs.google.com/gview?url=" + vDocumentURL + "&embedded=true";
            $('#fileDisplay').attr('src', (srcurl));
            //$("#fileDisplay").css("display", "none");
            $("#fileDisplayimg").css("display", "none");
        }
        else if (vDocumentURL.indexOf(".png") >= 0 || vDocumentURL.indexOf(".jpg") >= 0 || vDocumentURL.indexOf(".gif") >= 0 || vDocumentURL.indexOf(".bmp") >= 0) {
            $("#fileDisplay").css("display", "none");
            $("#noPreview").css("display", "none");
            srcurl = vDocumentURL;
            $('#fileDisplayimg').attr('src', decodeURIComponent(srcurl));
            $("#fileDisplayimg").css("display", "");
        }
        else {
            $("#fileDisplay").css("display", "none");
            $("#noPreview").css("display", "");
            $("#fileDisplayimg").css("display", "none");

            //$("#fileDisplay").css("display", "none");
        }
        GetComment(vAccountID, vCollaborationID);
        BindDocumentDetails(vAccountID, documentID, vApiKey);
    }


});

function randomPassword(length) {
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP1234567890*-@^!~`'<>";
    var pass = "";
    for (var x = 0; x < length; x++) {
        var i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
    }
    return pass;
}

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
        }
    });

    return aKey;
}

function GetDocumentCollaboration(vAccountID, vCollaborationID) {
    $.ajax({
        url: '/Documents/GetDocumentCollaboration?accountid=' + vAccountID + '&collaborationid=' + vCollaborationID,
        type: 'GET',
        dataType: 'json',
        cache: false,
        async: false,
        success: function (data) {
            var jsObject = JSON.parse(data);
            var vDocumentURL = encodeURIComponent(jsObject.DocumentURL);
            //show uploaded new version to initiator
            if (vInitURL != "") {
                vDocumentURL = encodeURIComponent(vInitURL);
            }

            //$("#docURL").attr('href', decodeURIComponent(vDocumentURL));
            $("#docURL").val(decodeURIComponent(vDocumentURL));
            $("#docURLPrev").attr('href', decodeURIComponent(vDocumentURL));
            var srcurl = vDocumentURL;// "https://docs.google.com/viewer?url=" + vDocumentURL + "&embedded=true";
            if (vDocumentURL.indexOf(".doc") >= 0 || vDocumentURL.indexOf(".ppt") >= 0 || vDocumentURL.indexOf(".xls") >= 0 || vDocumentURL.indexOf(".dot") >= 0) {
                //manoj
                if (!Checkbrowsernameandversion()) {
                    $("#fileDisplay").css("display", "none");
                    $("#noPreview").css("display", "");
                    $("#fileDisplayimg").css("display", "none");
                } else {
                    //manoj
                    $("#noPreview").css("display", "none");
                    $("#fileDisplay").css("display", "");
                    srcurl = "https://view.officeapps.live.com/op/embed.aspx?src=" + vDocumentURL + "?" + randomPassword(4) + "&wdStartOn=1&wdEmbedCode=0";
                    $('#fileDisplay').attr('src', srcurl);
                    $("#fileDisplayimg").css("display", "none");
                }
            }
            else if (vDocumentURL.indexOf(".pdf") >= 0) {
                $("#fileDisplay").css("display", "");
                $("#noPreview").css("display", "none");
                srcurl = "https://docs.google.com/gview?url=" + vDocumentURL + "&embedded=true";
                $('#fileDisplay').attr('src', srcurl);
                //$("#fileDisplay").css("display", "none");
                $("#fileDisplayimg").css("display", "none");
            }
            else if (vDocumentURL.indexOf(".png") >= 0 || vDocumentURL.indexOf(".jpg") >= 0 || vDocumentURL.indexOf(".gif") >= 0 || vDocumentURL.indexOf(".bmp") >= 0) {
                $("#fileDisplay").css("display", "none");
                $("#noPreview").css("display", "none");
                srcurl = vDocumentURL;
                $('#fileDisplayimg').attr('src', srcurl);
                $("#fileDisplayimg").css("display", "");
            } else {
                $("#fileDisplay").css("display", "none");
                $("#noPreview").css("display", "");
                $("#fileDisplayimg").css("display", "none");

                //$("#fileDisplay").css("display", "none");
            }

            // $('#fileDisplay').attr('src', srcurl);
            $("#docToReplace").replaceWith($("#docToReplace").val('').clone(true));

            swal("", "Document Uploaded");
        }
    });
}

function GetComment(accountid, collaborationid) {
    $.ajax({
        url: '/Documents/GetDocumentCollaborationComment?accountid=' + accountid + '&collaborationid=' + collaborationid,
        type: 'GET',
        dataType: 'json',
        cache: false,
        async: false,
        success: function (data) {
            var jsObject = JSON.parse(data);
            var vComment = '';
            $(jsObject).each(function (i, item) {
                if (i < 5) {
                    vComment += '<li><span>&nbsp;</span>';
                } else {
                    vComment += '<li class="hiddencomment"><span>&nbsp;</span>';
                }
                vComment += '<p>';
                vComment += '<b>' + item.PostBy + '</b>';
                if (typeof (item.PostDate) != "undefined" && item.PostDate != null && item.PostDate != "")
                    vComment += '<small>' + moment(new Date(item.PostDate)).format('Do MMM, h:mm A') + '</small>';
                else
                    vComment += '<small>' + moment(new Date(item.Timestamp)).format('Do MMM, h:mm A') + '</small>';
                vComment += '<span>' + item.Comment.replace("External Review of", "External Share of") + '</span>';
                vComment += '</p></li>';
            });
            $("#tblComments").html(vComment);
            $(".hiddencomment").css("display", "none");
            if (jsObject.length > 5) { $("#aCommentsMore").css("display", ""); }
        }
    });
}

function ShowAllComment() {
    $(".hiddencomment").css("display", "");
    $("#aCommentsMore").css("display", "none");
    $("#aCommentsLess").css("display", "");
}

function ShowLessComment() {
    $(".hiddencomment").css("display", "none");
    $("#aCommentsMore").css("display", "");
    $("#aCommentsLess").css("display", "none");
}

function ShowAllHistory() {
    $(".hiddencomment").css("display", "");
    $("#aHistoryMore").css("display", "none");
    $("#aHistoryLess").css("display", "");
}

function ShowLessHistory() {
    $(".hiddencomment").css("display", "none");
    $("#aHistoryMore").css("display", "");
    $("#aHistoryLess").css("display", "none");
}

$('#btnPost').click(function () {
    PostComment(getParameterByName("AccountID"), vCollaborationID);
});

function PostComment(accountid, collaborationid) {
    var vValid = requiredValidator('dvPostComment');
    if (vValid) {
        $("#loadingPage").fadeIn();
        $.ajax({
            url: '/Documents/PostShareComment?accountid=' + accountid,
            type: 'POST',
            dataType: 'json',
            headers: { 'AntiReqVerificationToken': $("#forgeryToken").val(), 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            data: {
                'DocumentCollaborationID': collaborationid,
                'Comment': $("#txtComment").val(),
                'PostBy': vSendTo,
                'UserEmailID': vUserName,
                'Code': vCode,
                'IsInit': (getParameterByName("Init") == "y") ? true : false,
                //'IsSendToUser': (document.getElementById('pApprove').style.display!="none")?true:false
                'IsSendToUser': true
            },
            cache: false,
            success: function (data) {
                GetComment(accountid, collaborationid);
                //var vComment = '<li><span>&nbsp;</span>';
                //vComment += '<p>';
                //vComment += '<b>' + $("#txtComment").val() + '</b>';
                //vComment += '<small>' + moment(new Date()).format('Do MMM, h:mm A') + '</small>';
                //vComment += '</p></li>';
                //$("#tblComments").prepend(vComment);
                $("#txtComment").val("");
                $("#dvPostComment").css("display", "none");
                $("#postCommentLink").css("display", "");
                $("#loadingPage").fadeOut();
            },
            error: function (data) {

                $("#loadingPage").fadeOut();
            }
        });
    }
}

$('#btnUpload').click(function () {
    UploadNewVersionDocument();
});

function UploadNewVersionDocument() {
    var vValid = requiredValidator('dvUpload');
    if (vValid) {
        var opmlFile1 = $('#docToReplace')[0];
        var Documentnamerelace1 = opmlFile1.files[0].name;
        var pieces1 = Documentnamerelace1.split(/[\s.]+/);
        var vCurrentDocumentExtension = pieces1[pieces1.length - 1];
        if (vPreviousDocumentExtension != vCurrentDocumentExtension) {
            if (vPreviousDocumentExtension == 'doc' || vPreviousDocumentExtension == 'docx' || vPreviousDocumentExtension == 'DOC' || vPreviousDocumentExtension == 'DOCX') {
                var getconformationupload = confirm("The file which is being uploaded is '." + vCurrentDocumentExtension + "', which is different from existing '." + vPreviousDocumentExtension + "'; Do you really want to upload? Older versions of the file cannot be restored.");
                if (getconformationupload) {
                    UploadNewVersionDocument1(true);
                }
            } else {
                UploadNewVersionDocument1(false);
            }
        } else {
            UploadNewVersionDocument1(false);
        }
    }
}

function UploadNewVersionDocument1(differentfile) {
    var duplicatedoc = true;
    var uservalidation = true;
    var getconformation = true;
    var accountid = getParameterByName("AccountID");
    var vValid = requiredValidator('dvUpload');
    if (vValid) {
        $("#loadingPage").fadeIn();
        //$.ajax({
        //    url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/activities?collaborationid=' + getParameterByName("UserCode").trim(),
        //    type: 'GET',
        //    dataType: 'json',
        //    "Content-Type": "application/json",
        //    headers: { 'eContracts-ApiKey': vApiKey },
        //    cache: false,          
        //    success: function (data) {
        //        if (data != null) {
        //            if (data.UserEmailID.trim() != getParameterByName("UserName").trim()) {
        //                uservalidation = false;
        //            }
        //        }
        //    },
        //    error: function (data) {
        //        $("#loadingPage").fadeOut();
        //    },
        //    complete: function (data) {
        //        if (!uservalidation) {
        //            getconformation = confirm("New version uploaded by some other user, do you want to overwrite?");
        //        }
        //        if (getconformation) {
        //$("#loadingPage").fadeIn();
        var formData = new FormData();
        var opmlFile = $('#docToReplace')[0];
        var Documentnamerelace = opmlFile.files[0].name;
        if (Documentnamerelace != "") {
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/documents/Share?collaborationid=' + vCollaborationID,
                type: 'GET',
                dataType: 'json',
                "Content-Type": "application/json",
                headers: { 'eContracts-ApiKey': vApiKey },
                cache: false,
                async: false,
                success: function (data) {
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/documents?contractid=' + data.ContractID + '&docname=' + Documentnamerelace,
                        type: 'GET',
                        dataType: 'json',
                        "Content-Type": "application/json",
                        headers: { 'eContracts-ApiKey': vApiKey },
                        cache: false,
                        async: false,
                        success: function (datacontactdoc) {
                            if (datacontactdoc.RowKey != data.DocumentID) {
                                duplicatedoc = false;
                            }
                        },
                        error: function (datacontactdoc) {
                        }
                    });
                },
                error: function (data) {
                }
            });
        }
        formData.append("opmlFile", opmlFile.files[0]);
        formData.append("UserName", vSendTo);
        formData.append("UserEmailID", getParameterByName("UserName"));
        formData.append("DocCode", getParameterByName("UserCode").trim());
        formData.append("Comment", $("#txtCommentReplace").val());
        formData.append("Code", getParameterByName("Code").trim());
        formData.append("IsDifferentFile", "" + differentfile + "");
        //KXlnm = Disclose
        formData.append("Disclose", getParameterByName("KXlnm").trim());
        if (duplicatedoc) {
            $.ajax({
                url: '/Documents/UploadNewVersionDocument?accountid=' + accountid + '&CollaborationID=' + vCollaborationID,
                type: 'POST',
                data: formData,
                dataType: 'json',
                headers: { 'AntiReqVerificationToken': $("#forgeryToken").val(), 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                processData: false,
                contentType: false,
                success: function (item) {
                    uploadVersionChangeAction();
                    location.reload();
                    $("#loadingPage").fadeOut();
                    window.location.reload();
                },
                error: function (data) {
                    $("#loadingPage").fadeOut();
                }
            });
        }
        else {
            $("#loadingPage").fadeOut();
            swal("", "Another document with this file name already exists. Please rename and try again.");
        }
        //        }
        //        else {
        //            $("#loadingPage").fadeOut();
        //        }
        //    }
        //});        
    }
}

function CompleteReview() {
    swal({
        title: '',
        text: "Are you sure you want to complete this Negotiation/Review? If done, you'll not be able to upload documents or comment from this page.",
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
                                   url: '/Documents/ShareDocumentCompleteByUser?accountid=' + getParameterByName("AccountID"),
                                   type: 'PUT',
                                   headers: { 'AntiReqVerificationToken': $("#forgeryToken").val(), 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                                   dataType: 'json',
                                   data: {
                                       'username': getParameterByName("UserName"),
                                       'code': getParameterByName("Code")
                                   },
                                   cache: false,
                                   success: function (data) {
                                       $("#loadingPage").fadeOut();
                                       vIsComplete = true;
                                       swal("", "Document Negotiation Complete.");
                                       $("#mid-section").css("display", "none");
                                       $("#postComment").css("display", "none");
                                       $("#dvComment").css("display", "none");
                                       $("#dvTask").css("display", "none");
                                       $("#UploadLink").css("display", "none");
                                       $("#pipelinetext").css("display", "none");
                                       $("#idDocumentStatus").css("display", "none");

                                       GetAllSharedUsers();
                                       GetComment(vAccountID, vCollaborationID);

                                       $("#loadingPage").fadeOut();
                                   },
                                   error: function (data) {
                                       $("#UploadLink").css("display", "none");
                                       $("#pipelinetext").css("display", "none");
                                       $("#loadingPage").fadeOut();
                                   }
                               });

                           }
                           return;
                       });
}

function ShowComment() {
    $("#txtComment").val('');
    $("#dvPostComment").css("display", "");
    $("#postCommentLink").css("display", "none");
}

function HideComment() {
    $("#txtComment").val('');
    $("#dvPostComment").css("display", "none");
    $("#postCommentLink").css("display", "");
}

function ShowUpload() {
    $("#txtCommentReplace").removeClass('error');
    $("#errormsg_txtCommentReplace").css('display', 'none');
    $("#docToReplace").removeClass('error');
    $("#errormsg_docToReplace").css('display', 'none');
    $("#txtCommentReplace").val("");
    //if another user is editing the document  
    if ($("#editmsg").css('display') == 'block') {
        swal("", "You cannot upload a new version, while it is checked out for editing by another user.");
    } else {
        $("#docToReplace").replaceWith($("#docToReplace").val('').clone(true));
        $("#dvUpload").dialog("open");
    }
}

function HideUpload() {
    $("#dvUpload").dialog("close");
}

function togglediv(firstObject, secondObject, imgObject) {
    if (firstObject != "")
        $("#" + firstObject).slideToggle();
    if (secondObject != "")
        $("#" + secondObject).slideToggle();
    if (imgObject != "") {
        var imgObj = $("#" + imgObject);

        if (imgObj.attr("title") == "Collapse") {
            imgObj.attr("title", "Expand");
            imgObj.attr("src", "../Content/Images/dp-ddown.png");
        } else {
            imgObj.attr("title", "Collapse");
            imgObj.attr("src", "../Content/Images/dp-dup.png");
        }
    }
}

function BindDocumentDetails(vAccountID, documentID, vApiKey) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/documents?documentid=' + documentID,
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': vApiKey },
        cache: false,
        success: function (documententity) {
            //docdefaultview(documententity.ContractArea);
            var vMetadata = '<li class="contraRigght">';
            vMetadata += '<span class="contraLeft">Document Name</span>';
            vMetadata += '<span class="contraRight">' + documententity.DocumentName + '</span></li>';

            vMetadata += '<li class="contraRigght">';
            vMetadata += '<span class="contraLeft">Description</span>';
            vMetadata += '<span class="contraRight">' + documententity.Description + '</span></li>';

            vMetadata += '<li class="contraRigght">';
            vMetadata += '<span class="contraLeft">Document Type</span>';
            vMetadata += '<span class="contraRight">' + documententity.DocumentType + '</span></li>';

            vMetadata += '<li class="contraRigght">';
            vMetadata += '<span class="contraLeft">Document Author</span>';
            vMetadata += '<span class="contraRight">' + documententity.DocumentAuthor + '</span></li>';

            vMetadata += '<li class="contraRigght">';
            vMetadata += '<span class="contraLeft">Document Language</span>';
            vMetadata += '<span class="contraRight">' + documententity.DocumentLanguage + '</span></li>';

            var strIsFinalized = "No";
            if (documententity.IsFinalized == "Yes") {
                strIsFinalized = "Yes";
            }

            vMetadata += '<li class="contraRigght">';
            vMetadata += '<span class="contraLeft">Finalized (Yes/No)</span>';
            vMetadata += '<span class="contraRight">' + strIsFinalized + '</span></li>';


            $("#ulDetails").html(vMetadata);

            var str = documententity.DocumentName;
            var pieces = str.split(/[\s.]+/);
            vPreviousDocumentExtension = pieces[pieces.length - 1];
        }
    });
}

function BindDocumentDocumenthistory(vAccountID, documentID, vApiKey) {

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/activities?objecttype=Document&objectid=' + documentID + '&actiontype=',
        type: 'GET',
        dataType: 'json',
        "Content-Type": "application/json",
        headers: { 'eContracts-ApiKey': vApiKey },
        cache: false,
        success: function (activities) {
            var datalenght = activities.length;
            var article = '';
            for (var i = 0; i < datalenght; i++) {
                var item = activities[i];
                var sObject = item.Object;
                var sActivity = item.Activity;
                var sUserID = item.UserID;
                var sTimestamp = moment(new Date(item.Timestamp)).format('Do MMM, h:mm A');


                article += '<li class="contraRigght">';
                article += '<p class="contRP">' + sActivity + '</p>';
                article += '<small class="contRsmaLl">' + sTimestamp + '</small></li>';


            }
            $("#ulHistory").html(article);

        },
        error: function () {

        }
    });

}

function changeinupload(obj) {
    var id = obj.id;
    var filecontrol = document.getElementById(id);
    var txt = "";
    if ('files' in filecontrol) {
        if (filecontrol.files.length == 0) {
        } else {
            for (var i = 0; i < filecontrol.files.length; i++) {
                var acceptExtension = ['doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx', 'dotx', 'pdf','ZIP','zip'];
                var file = filecontrol.files[i];
                var ext = file.name.split('.').pop().toString();
                if (acceptExtension.indexOf(ext.trim().toLowerCase()) > -1) {
                    if ('size' in file) {
                        if (file.size > 0) {
                            var Filelengthcol = Math.round((file.size / 1048576));
                            if (Filelengthcol > (Math.round(parseInt(MaxRequestLength) / 1000))) {
                                //swal("", "The maximum permissible size is " + Math.round(parseInt(MaxRequestLength) / 1024) + " MB, Please upload a file which is less than " + Math.round(parseInt(MaxRequestLength) / 1024) + " MB");
                                swal("", "File exceeds " + Math.round((parseInt(localStorage.MaxRequestLength) / 1000)) + "MB size limit.");
                                $("#" + id).replaceWith($("#" + id).val('').clone(true));
                            } else {
                                if (!isSpecialCharacterFileName(file.name.substr(0, file.name.lastIndexOf('.')))) {
                                    swal({
                                        title: '',
                                        //text: "File names can't contain the following characters /:*\\?\"<>|#%.",
                                        // For Brookfield allow dot in filename
                                        text: "File names can't contain the following characters /:*\\?\"<>|#%",
                                        // For Brookfield allow dot in filename
                                        type: 'warning',
                                        showCancelButton: false,
                                        confirmButtonText: 'OK',
                                        html: true
                                    },
                                    function (confirmed) {
                                        $("#" + id).replaceWith($("#" + id).val('').clone(true));
                                    });
                                } else if (!isContainsThreeAlphabets(file.name.substr(0, file.name.lastIndexOf('.')))) {
                                    swal({
                                        title: '',
                                        text: "File names should contain the minimum of 3 alphabets.",
                                        type: 'warning',
                                        showCancelButton: false,
                                        confirmButtonText: 'OK',
                                        html: true
                                    },
                                    function (confirmed) {
                                        $("#" + id).replaceWith($("#" + id).val('').clone(true));
                                    });
                                }
                            }
                        } else {
                            swal("", "File cannot be empty.");
                            $("#" + id).replaceWith($("#" + id).val('').clone(true));
                        }
                    }
                }
                else {
                    swal({
                        title: '',
                        text: "Only file type doc, xls, ppt, docx, xlsx, pptx, dotx and pdf are allowed.",
                        type: 'warning',
                        showCancelButton: false,
                        confirmButtonText: 'OK',
                        html: true
                    },
                               function (confirmed) {
                                   $("#" + id).replaceWith($("#" + id).val('').clone(true));
                               });
                }
            }
        }
    }
}

//function docdefaultview(doccontractarea) {
//    if (eContractFeatures == "") {
//        $.ajax({
//            url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/feature',
//            type: 'GET',
//            dataType: 'json',
//            'Content-Type': 'application/json',
//            cache: false,
//            //async: false,
//            headers: { 'eContracts-ApiKey': vApiKey },
//            success: function (data) {
//                eContractFeatures = data;
//                var veContractFeatures = eContractFeatures;
//                var vDocLibFeat = $.grep(veContractFeatures, function (n, i) {
//                    return (n.RowKey == "14" && n.Status == "ON");
//                });
//                var dURL = "";
//                //multiple document library
//                if (vDocLibFeat.length > 0) {
//                    dURL = vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/businessarea/contractareadetailsbyname?contractareaname=' + encodeURIComponent(doccontractarea)
//                } else {
//                    dURL = vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/businessarea/contractareadetailsbyname?contractareaname=Business Area'
//                }

//                //$.ajax({
//                //    url: dURL,
//                //    type: 'GET',
//                //    dataType: 'json',
//                //    headers: { 'eContracts-ApiKey': vApiKey },
//                //    success: function (data) {
//                //        if (data != '' && data != 'undefined' && typeof data != "undefined") {
//                //            if (data.DocUploadExternal == "No") {
//                //                $("#pipelinetext").css("display", "none");
//                //                $("#UploadLink").css("display", "none");
//                //            }
//                //            else {

//                //            }
//                //        }
//                //    },
//                //    error: function (data) {

//                //    }
//                //});
//            }
//        });
//    }
//    else {
//        var veContractFeatures = eContractFeatures;
//        var vDocLibFeat = $.grep(veContractFeatures, function (n, i) {
//            return (n.RowKey == "14" && n.Status == "ON");
//        });
//        var dURL = "";
//        //multiple document library
//        if (vDocLibFeat.length > 0) {
//            dURL = vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/businessarea/contractareadetailsbyname?contractareaname=' + encodeURIComponent(doccontractarea)
//        } else {
//            dURL = vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/businessarea/contractareadetailsbyname?contractareaname=Business Area'
//        }

//        $.ajax({
//            url: dURL,
//            type: 'GET',
//            dataType: 'json',
//            headers: { 'eContracts-ApiKey': vApiKey },
//            success: function (data) {
//                if (data != '' && data != 'undefined' && typeof data != "undefined") {
//                    if (data.DocUploadExternal == "No") {
//                        $("#pipelinetext").css("display", "none");
//                        $("#UploadLink").css("display", "none");
//                    }
//                    else {

//                    }
//                }
//            },
//            error: function (data) {

//            }
//        });
//    }
//}

function GetMaxRequestLength() {
    $.ajax({
        url: '/Accounts/GetMaxRequestLength',
        type: 'GET',
        dataType: 'json',
        cache: false,
        //async: false,
        headers: { 'eContracts-ApiKey': vApiKey },
        success: function (data) {
            MaxRequestLength = data;


        },
        error: function (data) {
            MaxRequestLength = "";
        }
    });
}

function GetAllSharedUsers(obj) {
    $.ajax({
        url: '/Documents/GetDocumentCollaborationUsers?accountid=' + vAccountID + '&collaborationid=' + vCollaborationID,
        type: 'GET',
        dataType: 'json',
        cache: false,
        success: function (data) {
            var datalength = data.length;
            var article = '';
            var userViewing = false;
            var otherUserEditing = false;
            $(data).each(function (i, item) {
                article += '<li class="contraRigght">';
                var currentdescription = (item.UserDescription != null && item.UserDescription != "") ? item.UserDescription : "NA";
                article += '<label id="lbluserstatus" style="display:none">' + currentdescription + '</label>';
                article += '<label id="lbluserid" style="display:none">' + item.RowKey + '</label>';
                article += '<span class="contraLeft">' + item.SendTo + '';
                if (item.Status == 'In Progress') {
                    //myStatus = 'Viewing'
                    if (item.EmailID.trim() == getParameterByName("UserName").trim()) {
                        if (getParameterByName("Init") != "y") {
                            article += "(Me)";
                            if ((typeof (item.DocumentURL) != "undefined" && item.DocumentURL != null && item.DocumentURL != "") || getParameterByName("rejectedversion") == "y") {
                                $("#UploadLink").css("display", "none");
                            } else {
                                $("#UploadLink").css("display", "");
                            }
                        }

                        $("#idDocumentStatus").css("display", "none");
                        //$("#idDocumentStatus").css("display", "");
                        //$("#idDocumentStatus").removeClass("status_yellow");
                        //$("#idDocumentStatus").addClass("status_blue");
                        //$("#idDocumentStatus").html("<img src='../Content/Images/icon/view_white.png' alt=''>Viewing");
                        //hide upload if viewing
                        $("#pipelinetext").css("display", "none");
                        $('#chkAutoUpdate').prop("disabled", false);
                        $("#chkAutoUpdate").prop("checked", false);
                        $("#editmsg").hide();
                        $("#tblchkupdate").show();
                        //$("#idDocumentStatus").parent().css('cursor', 'pointer');
                        userViewing = true;
                    }
                } else if (item.Status == "Editing" || item.Status == 'Complete') {
                    //myStatus = 'Editing'
                    if (item.EmailID.trim() == getParameterByName("UserName").trim()) {
                        if (getParameterByName("Init") != "y") {
                            article += "(Me)";
                            if (typeof (item.DocumentURL) != "undefined" && item.DocumentURL != null && item.DocumentURL != "") {
                                $("#UploadLink").css("display", "none");
                            } else {
                                $("#UploadLink").css("display", "");
                            }
                        }
                        $("#idDocumentStatus").css("display", "none");
                        //$("#idDocumentStatus").removeClass("status_blue");
                        //$("#idDocumentStatus").addClass("status_yellow");
                        //$("#idDocumentStatus").html("<img src='../Content/Images/icon/edit_white.png' style='cursor:default;' alt=''>Editing");
                        //show upload if editing
                        $("#pipelinetext").css("display", "none");

                        //$("#idDocumentStatus").parent().css('cursor', 'default');
                        $('#chkAutoUpdate').prop("disabled", false);
                        $("#chkAutoUpdate").prop("checked", true);
                        $("#editmsg").hide();
                        $("#tblchkupdate").show();
                    } else {
                        $("#chkAutoUpdate").prop("checked", false);
                        $('#chkAutoUpdate').prop("disabled", true);
                        //$("#editmsg").show();
                        $("#tblchkupdate").hide();
                    }
                    otherUserEditing = true;
                }
                //else if (item.Status == 'Complete') {
                //    {
                //        myStatus = 'Negotiation Completed'
                //    }
                //}
                //</li>
                //'<span class="contraLeft">' + item.SendTo+'';
                var DateTimeFound = (item.Modified != null) ? moment(Date(item.Modified)).format('MM/DD/YYYY') : "Not Viewed";
                switch (item.Status) {
                    case 'In Progress':
                    case 'Editing':
                        {
                            article += (DateTimeFound != "Not Viewed") ? '<span>(Last seen on ' + DateTimeFound + ')</span>' : '<span>(' + DateTimeFound + ')</span>';
                            break;
                        }
                    case 'Complete':
                        {
                            article += (DateTimeFound != "Not Viewed") ? '<span>(Last seen on ' + moment(DateTimeFound).format('MM/DD/YYYY') + ')</span>' : '<span>(' + DateTimeFound + ')</span>';
                            break;
                        }
                }
                article += '</span><span class="contraRight">' + currentdescription + '';

                if (item.EmailID.trim() == getParameterByName("UserName").trim() && getParameterByName("Init") != "y") {

                    article += '<a href="javascript:void(0)" onclick="EditStatus(this)">Update Status</a>';
                }
                article += '</span>';

                article += '</span></li>';
                //}
            });
            $("#ulPeople").html(article);
            article = '';

            if (userViewing && otherUserEditing) {
                $("#chkAutoUpdate").prop("checked", false);
                $('#chkAutoUpdate').prop("disabled", true);
                //$("#editmsg").show();
                $("#tblchkupdate").hide();
            }
            //manoj
            if (typeof (obj) != "undefined" && obj != null && obj != "") {
                $("#loadingPage").fadeOut();
            }
            //manoj
        }
    });
}

function downloadAction() {
    if (vIsComplete || getParameterByName("Init") == "y") {
        window.location.href = $("#docURL").val();
    } else {
        //if ($("#editmsg").css('display') != 'block') {        
        //    $("#chkAutoUpdate").prop("checked", true);
        //}
        //$(".cct").hide();
        //$("#downloadAction").dialog("option", "title", "Action");
        //$("#downloadAction").dialog("open");
        window.location.href = $("#docURL").val();
        downloadActionOK();
    }
}

//manoj
function downloadActionOK() {
    //if ($("#chkAutoUpdate").prop('checked') == true) {
    //$("#loadingPage").fadeIn();
    $.ajax({
        url: '/Documents/PutDocumentAction?accountid=' + getParameterByName("AccountID"),
        type: 'PUT',
        dataType: 'json',
        headers: { 'AntiReqVerificationToken': $("#forgeryToken").val(), 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        data: {
            'username': getParameterByName("UserName"),
            'code': getParameterByName("Code"),
            'documentaction': 'Editing'
        },
        cache: false,
        success: function (data) {
            if (data.Success) {
                //$("#loadingPage").fadeOut();
                //window.location.href = $("#docURL").val();
                //$("#downloadAction").dialog("close");

                $("#idDocumentStatus").removeClass("status_blue");
                $("#idDocumentStatus").addClass("status_yellow");
                $("#idDocumentStatus").html("<img src='../Content/Images/icon/edit_white.png' style='cursor:default;' alt=''>Editing");
                //show upload if editing
                $("#pipelinetext").css("display", "");
                //$("#UploadLink").css("display", "");

                $("#idDocumentStatus").parent().css('cursor', 'default');
                $('#chkAutoUpdate').prop("disabled", false);
                $("#chkAutoUpdate").prop("checked", false);
                $("#editmsg").hide();
                $("#tblchkupdate").show();

                GetAllSharedUsers();
                GetComment(vAccountID, vCollaborationID);
            }
            else {
                $("#downloadAction").dialog("close");
            }

        },
        error: function (data) {
            //$("#loadingPage").fadeOut();
            $("#downloadAction").dialog("close");
        }
    });
    //} else {
    //    $("#downloadAction").dialog("close");
    //    window.location.href = $("#docURL").val();
    //}
}
//manoj
function LoggedinActionOK() {
    //if ($("#chkAutoUpdate").prop('checked') == true) {
    //$("#loadingPage").fadeIn();
    $.ajax({
        url: '/Documents/PutDocumentAction?accountid=' + getParameterByName("AccountID"),
        type: 'PUT',
        dataType: 'json',
        headers: { 'AntiReqVerificationToken': $("#forgeryToken").val(), 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        data: {
            'username': getParameterByName("UserName"),
            'code': getParameterByName("Code"),
            'documentaction': 'Loggedin'
        },
        cache: false,
        async: false,
        success: function (data) {
            if (data.Success) {
                //$("#loadingPage").fadeOut();
                //window.location.href = $("#docURL").val();
                //$("#downloadAction").dialog("close");

                $("#idDocumentStatus").removeClass("status_blue");
                $("#idDocumentStatus").addClass("status_yellow");
                $("#idDocumentStatus").html("<img src='../Content/Images/icon/edit_white.png' style='cursor:default;' alt=''>Editing");
                //show upload if editing
                $("#pipelinetext").css("display", "");
                //$("#UploadLink").css("display", "");

                $("#idDocumentStatus").parent().css('cursor', 'default');
                $('#chkAutoUpdate').prop("disabled", false);
                $("#chkAutoUpdate").prop("checked", false);
                $("#editmsg").hide();
                $("#tblchkupdate").show();

                GetAllSharedUsers();
            }
            else {
                $("#downloadAction").dialog("close");
            }
            //GetComment(vAccountID, vCollaborationID);
        },
        error: function (data) {
            //$("#loadingPage").fadeOut();
            $("#downloadAction").dialog("close");
        }
    });
    //} else {
    //    $("#downloadAction").dialog("close");
    //    window.location.href = $("#docURL").val();
    //}
}
function uploadVersionChangeAction() {
    $("#loadingPage").fadeIn();
    $.ajax({
        url: '/Documents/PutDocumentAction?accountid=' + getParameterByName("AccountID"),
        type: 'PUT',
        dataType: 'json',
        headers: { 'AntiReqVerificationToken': $("#forgeryToken").val(), 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
        data: {
            'username': getParameterByName("UserName"),
            'code': getParameterByName("Code"),
            'documentaction': 'In Progress',
            'comment': $("#txtCommentReplace").val()
        },
        cache: false,
        success: function (data) {
            if (data.Success) {
                $("#loadingPage").fadeOut();

                $("#idDocumentStatus").removeClass("status_yellow");
                $("#idDocumentStatus").addClass("status_blue");
                $("#idDocumentStatus").html("<img src='../Content/Images/icon/view_white.png' alt=''>Viewing");
                //hide upload if Viewing
                $("#pipelinetext").css("display", "none");
                $("#UploadLink").css("display", "none");

                $('#chkAutoUpdate').prop("disabled", false);
                $("#chkAutoUpdate").prop("checked", true);
                $("#editmsg").hide();
                $("#tblchkupdate").show();
                $("#idDocumentStatus").parent().css('cursor', 'pointer');
            }
            else {
                $("#loadingPage").fadeOut();
            }
            // GetAllSharedUsers();
        },
        error: function (data) {
            $("#loadingPage").fadeOut();
        }
    });
}

$(document).ready(function () {
    $('.cct-sec').click(function (event) {
        if ($("#idDocumentStatus").hasClass("status_blue")) {
            event.stopPropagation();
            $(".cct").slideToggle("fast");
        }
    });
    $(".cct").on("click", function (event) {
        if ($("#idDocumentStatus").hasClass("status_blue")) {
            event.stopPropagation();
        }
    });
});

$(document).on("click", function () {
    $(".cct").hide();
});

function replace() {
    swal({
        title: '',
        text: "Do you confirm to replace current version of this document with this new (modified) version?",
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
                url: '/Documents/PutDocumentAction?accountid=' + getParameterByName("AccountID"),
                type: 'PUT',
                dataType: 'json',
                headers: { 'AntiReqVerificationToken': $("#forgeryToken").val(), 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                data: {
                    'username': getParameterByName("UserName"),
                    'code': getParameterByName("Code"),
                    'documentaction': 'InitApprove',
                    'disclose': getParameterByName("KXlnm"),
                },
                cache: false,
                success: function (data) {
                    if (data.Success) {
                        data = data.Message;
                        $("#dvShare").css("display", "");
                        $("#loadingPage").fadeOut();
                        swal("", "" + data);
                        $("#pApprove").css("display", "none");
                        //manoj
                        $("#pReject").css("display", "none");
                    }
                    else {
                        $("#loadingPage").fadeOut();
                        swal("", "Something went wrong. Please try again.");
                    }
                    //manoj
                }, error: function (data) {
                    $("#loadingPage").fadeOut();
                    swal("", "Something went wrong. Please try again.");
                }
            });
        }
        return;
    });
}


function ReplaceNew() {
    $("#loadingPage").fadeIn();
    $.ajax({
        url: '/Documents/GetDocumentCollaborationUser?accountid=' + vAccountID + '&username=' + getParameterByName("UserName") + '&code=' + getParameterByName("Code"),
        type: 'GET',
        dataType: 'json',
        cache: false,
        success: function (CollaborationUser) {
            if (CollaborationUser.Approved == "Yes" && CollaborationUser.ReadyToShare == "Yes") {
                $.ajax({
                    url: '/Documents/PutDocumentActionShare?accountid=' + getParameterByName("AccountID"),
                    type: 'PUT',
                    dataType: 'json',
                    headers: { 'AntiReqVerificationToken': $("#forgeryToken").val(), 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
                    data: {
                        'username': getParameterByName("UserName"),
                        'code': getParameterByName("Code"),
                        'disclose': getParameterByName("KXlnm"),
                    },
                    cache: false,
                    success: function (data) {
                        if (data.Success) {
                            $("#dvShare").css("display", "none");
                            $("#loadingPage").fadeOut();
                            swal("", "New Version of the Document has been shared with users.");
                        }
                        else {
                            $("#loadingPage").fadeOut();
                            swal("", "Something went wrong. Please try again.");
                        }
                    }, error: function (data) {
                        $("#loadingPage").fadeOut();
                        swal("", "Something went wrong. Please try again.");
                    }
                });
            }
            else {
                $("#loadingPage").fadeOut();
                swal("", "You have already shared the changes of this document with users.");
            }
        }, error: function (CollaborationUser) {
            $("#loadingPage").fadeOut();
            swal("", "Something went wrong. Please try again.");
        }
    });
}
//manoj
function processrejection() {
    if (requiredValidator('dvReject')) {
        $("#loadingPage").fadeIn();
        $.ajax({
            url: '/Documents/PutDocumentAction?accountid=' + getParameterByName("AccountID"),
            type: 'PUT',
            dataType: 'json',
            headers: { 'AntiReqVerificationToken': $("#forgeryToken").val(), 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            data: {
                'username': getParameterByName("UserName"),
                'code': getParameterByName("Code"),
                'documentaction': 'InitReject',
                'comment': $("#txtcommentReject").val()
            },
            cache: false,
            success: function (data) {
                if (data.Success) {
                    swal("", "Document New Version Rejected.");
                    $("#pApprove").css("display", "none");
                    //manoj
                    $("#pReject").css("display", "none");
                    $("#dvReject").dialog("close");
                    $("#loadingPage").fadeOut();
                }
                else {
                    $("#loadingPage").fadeOut();
                    swal("", "Something went wrong. Please try again.");
                    $("#dvReject").dialog("close");
                }
                //manoj
            }, error: function (data) {
                $("#loadingPage").fadeOut();
                swal("", "Something went wrong. Please try again.");
                $("#dvReject").dialog("close");
            }
        });
    }
}
//manoj
function reject() {
    //manoj
    $("#dvReject").dialog("open");
    //manoj
}

//manoj
function EditStatus(obj) {
    var parent = obj.parentNode.parentNode;
    var CurrentStatus = $(parent).find("#lbluserstatus").text();
    CurrentStatus = (CurrentStatus != null && CurrentStatus != "" && CurrentStatus != "NA") ? CurrentStatus : "";
    var UserId = $(parent).find("#lbluserid").text();
    $("#hdncurrentstatus").text(CurrentStatus);
    $("#hdnuserid").text(UserId);
    $("#txtStatusReplace").val(CurrentStatus);
    $("#dvUploadStatus").dialog("open");
}

function updatestatus() {
    $("#loadingPage").fadeIn();
    if ($("#txtStatusReplace").val() == "") {
        swal("", 'Enter the status.');
        $("#loadingPage").fadeOut();
    } else if ($("#txtStatusReplace").val().trim() == "NA") {
        swal("", 'NA cannnot be set as status. Its reserved.');
        $("#loadingPage").fadeOut();
    } else {
        $.ajax({
            url: '/Documents/PutUserStatus?accountid=' + getParameterByName("AccountID"),
            type: 'PUT',
            dataType: 'json',
            headers: { 'AntiReqVerificationToken': $("#forgeryToken").val(), 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging },
            data: {
                'username': getParameterByName("UserName"),
                'code': getParameterByName("Code"),
                'userstatus': $("#txtStatusReplace").val()
            },
            cache: false,
            success: function (data) {
                $("#dvUploadStatus").dialog("close");
                GetAllSharedUsers("getuserstatus");
            }, error: function () {
                $("#dvUploadStatus").dialog("close");
                GetAllSharedUsers("getuserstatus");
            }
        });
    }
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

function GetFeatures() {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + vAccountID + '/feature',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        async: false,
        headers: { 'eContracts-ApiKey': vApiKey },
        success: function (data) {
            eContractFeatures = data;
        },
        error: function (data) {
            eContractFeatures = "";
        }
    });
}