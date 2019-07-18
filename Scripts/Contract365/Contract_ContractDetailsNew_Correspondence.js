

$(document).ready(function () {
    var veContractFeatures = JSON.parse(localStorage.getItem("eContractFeatures"));
    vAccFeat = $.grep(veContractFeatures, function (n, i) {
        return (n.RowKey == "13" && n.Status == "ON");
    });
    if (vAccFeat.length > 0) {
        $(".FL_Correspondence").css('display', '');
        //BindCorrespondence(vContractID);//Performance Optimization
    }

    $("#addEditCorrespondence").dialog({
        autoOpen: false,
        closeText: "",
        width: "80%",
        height: "400",
        title: "Amendment",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "Save": function () { modalOnOpenCorrespondence(); },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });

    $("#dvCorrespondenceDetails").dialog({
        autoOpen: false,
        closeText: "",
        width: "50%",
        title: "Correspondence Details",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "Close": function () { $(this).dialog("close"); }
        }
    });


});


function modalOnOpenCorrespondence(dialog) {
    var isformvalid = false;
    if (requiredValidator('addNewCorrespondence')) {
        $("#loadingPage").fadeIn();
        isformvalid = true;
        var strContractID = getParameterByName('ContractID');
        var formData1 = new FormData();
        var opmlFile = $('#docCorrespondence')[0];
        formData1.append("opmlFile", opmlFile.files[0]);
        formData1.append("AccountID", localStorage.AccountID);
        formData1.append("ContractID", getParameterByName('ContractID'));
        formData1.append("ContractTitle", $("#lblCTitleCorrespondence").text());
        formData1.append("Subject", encodeURIComponent($("#txtCorrespondenceTitle").val()))
        formData1.append("Body", "");
        formData1.append("FromSite", "Yes");
        formData1.append("Comment", $("#txtCorrespondenceNote").val());
        formData1.append("CreatedBy", localStorage.UserName);
        formData1.append("ModifiedBy", localStorage.UserName);
        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/correspondence',
            type: 'POST',
            data: formData1,
            cache: false,
            contentType: false,
            headers: { 'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken },
            processData: false,
            success: function (person) {
                $('.ui-button-green-text').parent().removeAttr('disabled');
                $("#addEditCorrespondence").dialog("close");
                BindCorrespondence(vContractID);
            },
            error: function (person) {
                $("#loadingPage").fadeOut();
            },
            complete: function () {
                $("#loadingPage").fadeOut();
            }
        });
    }
    else {
        $('.ui-button-green-text').parent().removeAttr('disabled');
    }
    return isformvalid;
}


$('#btnNewCorrespondence').click(function () {
    AddCorrespondenceMore();
});

function AddCorrespondenceMore() {
    $("#lblCTitleCorrespondence").text($("#lblContractTitle").text());
    $(".validelement").each(function (index, element) {
        $(element).removeClass("error");
        $("#errormsg_" + element.id).remove();
    });
    $("#txtCorrespondenceTitle").val("");
    $("#txtCorrespondenceNote").val("");
    $("#docCorrespondence").replaceWith($("#docCorrespondence").val('').clone(true));
    $("#addEditCorrespondence").dialog("option", "title", "New Correspondence");
    $("#addEditCorrespondence").dialog("open");
}


function BindCorrespondence(contractid) {
    if (contractid == null || contractid == "") { contractid = vContractID; }
    $("#ulCorrespondence").empty();
    $("#ulCorrespondence").html('<img src="../Content/Images/icon/loading.gif"> Please wait...');//Performance Optimization
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/correspondence/Contracts/' + contractid,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (contactsJsonPayload) {
            $("#ulCorrespondence").empty();//Performance Optimization
            var count = 0;
            $(contactsJsonPayload).each(function (i, item) {
                count++;

                var article = '';
                if (count <= 5)
                    article = '<li class="margin-bottom-8 WrapText_h2">';
                else
                    article = '<li class="ShowMoreCorrespondence margin-bottom-8 WrapText_h2" style="display:none;">';
                article += '<label id="RowKey" style="display:none;">' + item.RowKey + '</label>';
                article += '<label id="ContractID" style="display:none;">' + item.ContractID + '</label>';
                article += '<label id="ContractTitle" style="display:none;" class="PreserveSpace">' + item.ContractTitle + '</label>';
                article += '<label id="Subject" style="display:none;">' + item.Subject + '</label>';
                article += '<label id="URLLink" style="display:none;">' + item.BodyUrlOrigin + '</label>';
                article += '<a href="javascript:void(0)" onclick="ViewCorrespondenceDetail(\'' + item.RowKey + '\')">' + item.Subject + '</a>';

                article += '&nbsp;<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="openmenuCorrespondence"/>';
                article += '</li>';
                $("#ulCorrespondence").append(article);


            });

            if (count > 5) {
                var more = count - 5;
                $("#dvCorrespondence").html('<a id="ShowMoreCorrespondence" href="javascript:void(0);" class="pad-all close1" onclick="ShowMoreCorrespondence()">' + more + ' More Correspondence </a>' +
                                     '<a id="ShowLessCorrespondence" href="javascript:void(0);" class="pad-all close1" onclick="ShowLessCorrespondence()" style="display:none;">Show less</a>');
            }

            $("#lblCorrespondenceCount").text(count);
            if (count == 0) {
                $("#ulCorrespondence").append('No items found.');
            }
            $(".openmenuCorrespondence").contextMenu({ menu: 'dropdownMenuCorrespondence', leftButton: true }, function (action, el, pos) { contextMenuCorrespondence(action, el.parent("li"), pos); });

        },
        error: function (request) {
            $("#lblCorrespondenceCount").text('0');
            $("#ulCorrespondence").html('No items found.');//Performance Optimization
        }

    });
}

function ShowMoreCorrespondence() {
    $('.ShowMoreCorrespondence').css("display", "");
    $('#ShowMoreCorrespondence').css("display", "none");
    $('#ShowLessCorrespondence').css("display", "");
}

function ShowLessCorrespondence() {
    $('.ShowMoreCorrespondence').css("display", "none");
    $('#ShowMoreCorrespondence').css("display", "");
    $('#ShowLessCorrespondence').css("display", "none");
}

function ViewCorrespondenceDetail(entityid) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/correspondence?correspondenceid=' + entityid,
        type: 'GET',
        dataType: 'json',
        headers: { 'eContracts-ApiKey': localStorage.APIKey },
        cache: false,
        success: function (item) {
            if (item.FromSite == "Yes") {
                $("#CorresSubject").html(item.Subject);
                $("#CorresComment").html(item.Comment);
                $("#SavedBy").html(item.CreatedBy);
                $("#SavedOn").html(moment(new Date(item.Timestamp)).format('Do MMM'));
                $("#CorrespondenceFile").html('<a class="linkText Manage" href="' + item.BodyUrl + '">' + item.BodyUrl + '</a>');
                $("#trEmailText3").css('display', '');
                $("#trEmailText1").css('display', 'none');
                $("#trEmailText2").css('display', 'none');


                $("#dvCorrespondenceDetails").dialog("option", "title", "Correspondence Details");
                $("#dvCorrespondenceDetails").dialog("open");
            }
            else {
                $("#trEmailText3").css('display', 'none');
                $("#trEmailText1").css('display', '');
                $("#trEmailText2").css('display', '');

                if (item.BodyUrl != null && item.BodyUrl != "") {
                    $.ajax({
                        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/textfromblobfile?fileurl=' + encodeURIComponent(item.BodyUrl),
                        type: 'GET',
                        dataType: 'json',
                        headers: { 'eContracts-ApiKey': localStorage.APIKey },
                        cache: false,
                        success: function (blobdata) {
                            var div = document.createElement('div');
                            div.innerHTML = blobdata;
                            $("#CorresSubject").html(item.Subject);
                            $("#CorresComment").html(item.Comment);
                            $("#SavedBy").html(item.CreatedBy);
                            $("#SavedOn").html(moment(new Date(item.Timestamp)).format('Do MMM'));
                            var attc = GetTheAttachments(item.BodyUrl, item.Attachments, item.RowKey);
                            if (attc != "")
                                $("#Attachments").html(attc);
                            else
                                $("#Attachments").html("No attachments found.");

                            $('body', $("#CorresBody2")[0].contentWindow.document).html(div.textContent);
                            $($("#CorresBody2")[0].contentWindow.document).find('head').append('<base target="_blank">');
                            $("#dvCorrespondenceDetails").dialog("option", "title", "Correspondence Details");
                            $("#dvCorrespondenceDetails").dialog("open");
                        },
                        error: function (blobdata) {

                        }
                    });
                }
                else {
                    $("#CorresSubject").html(item.Subject);
                    $("#CorresComment").html(item.Comment);
                    $("#SavedBy").html(item.CreatedBy);
                    $("#SavedOn").html(moment(new Date(item.Timestamp)).format('Do MMM'));

                    $('body', $("#CorresBody2")[0].contentWindow.document).html(item.Body)
                    $($("#CorresBody2")[0].contentWindow.document).find('head').append('<base target="_blank">');
                    $("#dvCorrespondenceDetails").dialog("option", "title", "Correspondence Details");
                    $("#dvCorrespondenceDetails").dialog("open");
                }
            }

        },
        error: function (request) {

        }

    });
}

function BindAmendmentTypes(contractid) {
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/Contracts?contractid=' + contractid,
        type: 'GET',
        cache: false,
        contentType: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
        processData: false,
        success: function (contractitem) {
            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/amendmenttypes',
                type: 'GET',
                dataType: 'json',
                headers: { 'eContracts-ApiKey': localStorage.APIKey },
                cache: false,
                success: function (amendmenttypes) {
                    $("#ddlAmendmentType").empty();
                    $("#ddlAmendmentType").append("<option value='0'>--Select--</option>");
                    $(amendmenttypes).each(function (i, item) {

                        $("#ddlAmendmentType").append('<option value="' + item.TypeName.trim() + '">' + item.TypeName.trim() + '</option>');
                    });

                    if (contractitem.TransactionType == "Legal/General Agreement") {
                        if ($('#ddlAmendmentType option[value="Change of Contract Value"]').length != -1)
                            $('#ddlAmendmentType option[value="Change of Contract Value"]').remove();
                        $("#chkContractValue").attr("disabled", "disabled");
                        $("#chkContractValue").attr("style", "cursor:not-allowed;");
                    }
                    else {
                        if ($('#ddlAmendmentType option[value="Change of Contract Value"]').length != 1)
                            $("#ddlAmendmentType").append('<option value="Change of Contract Value">Change of Contract Value</option>');
                        $("#chkContractValue").removeAttr('disabled');
                        $("#chkContractValue").attr("style", "cursor:pointer;");
                    }
                    if (contractitem.EndDate == null) {
                        if ($('#ddlAmendmentType option[value="Change to Terms"]').length != -1)
                            $("#ddlAmendmentType option[value='Change to Terms']").remove();
                        $("#chkContractValidity").attr("disabled", "disabled");
                        $("#chkContractValidity").attr("style", "cursor:not-allowed;");
                    }
                    else {
                        if ($('#ddlAmendmentType option[value="Change to Terms"]').length != 1)
                            $("#ddlAmendmentType").append("<option value='Change to Terms'>Change to Terms</option>")
                        $("#chkContractValidity").removeAttr('disabled');
                        $("#chkContractValidity").attr("style", "cursor:pointer;");
                    }

                }
            });
        }
    });

    //$("#ddlAmendmentType option").val(function (idx, val) {
    //    $(this).siblings("[value='" + val + "']").remove();
    //});
}






function contextMenuCorrespondence(action, el, pos) {

    switch (action) {
        case "view":
            {
                var entityid = $(el).find("#RowKey").text();
                ViewCorrespondenceDetail(entityid);
                break;
            }
        case "download":
            {
                var LinkURL = $(el).find("#URLLink").text();
                var arr = LinkURL.split('/');
                var fileName = arr[arr.length - 1];

                var URIStart = fileName.substring(fileName.lastIndexOf("_") + 1);
                newWindow = window.open(LinkURL, URIStart);
                //$.ajax({
                //    url: '/General/DownloadFileFromBlob',
                //    type: 'GET',
                //    data: { fileName: fileName, containerName: "correspondence" },
                //    cache: false,
                //    async: false,
                //    success: function (contractfieldentity) {

                //    },
                //    error: function (data) {

                //    }
                //});
                break;
            }
        case "delete":
            {
                var Subject = $(el).find("#Subject").text();
                swal({
                    title: '',
                    text: "Are you sure you want to delete '<span style=\"font-weight:700\">" + Subject + "</span>'?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
       function (confirmed) {
           if (confirmed) {
               var entityid = $(el).find("#RowKey").text();
               $.ajax({
                   url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/correspondence?correspondenceid=' + entityid,
                   type: 'DELETE',
                   dataType: 'json',
                   headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                   "Content-Type": "application/json",
                   cache: false,
                   success: function (data) {
                       BindCorrespondence();
                   }
               });
           }
           return;
       });

                break;
            }
    }
}

function GetTheAttachments(URI, lsFilenames, CorrespondanceRowKey) {
    var articleattc = '';
    if (lsFilenames != "") {
        var settings = {
            pattern: /\.[0-9a-z]+$/i,
            knownFileTypes: ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'zip', 'rar', 'gzip', 'arj', 'wav', 'mp3', 'aif', 'aiff', 'm4a', 'ogg', 'wma', 'psd', 'ai', 'swf', 'fla', 'css', 'js', 'avi', 'mov', 'wmv', 'dotx'],
            WopiFrameFileTypes: ['doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx', 'dotx']
        };
        var URIStart = URI.substring(0, URI.lastIndexOf("_"));
        var URIRequire = URIStart + "_" + CorrespondanceRowKey + "_";
        var FilenamesSplit = [];
        if (lsFilenames.split('|').length == 1)
            FilenamesSplit.push(lsFilenames.split('|'));
        else
            FilenamesSplit = lsFilenames.split('|');
        $(FilenamesSplit).each(function (i, item) {
            var vRawURLDoc = '';
            var filen = "";
            if (item instanceof Array)
                filen = item[0];
            else
                filen = item;
            var DocumentUrl = URIRequire + filen;
            vURLDoc = encodeURIComponent(DocumentUrl);
            var ext = vURLDoc.match(settings.pattern);
            var vFileType = '<dd class="file-icon none"></dd>';
            if (ext != null) {
                if (ext.length > 0) { ext = ext[0].slice(1); }
                if (jQuery.inArray(ext.toLowerCase(), settings.knownFileTypes) > -1) {
                    vFileType = '<dd class="file-icon ' + ext + '"></dd>';
                }
            }
            var filenameOriginal = "";
            //if (filen.split('_343TQpMcWg_').length > 1) {
            //    filenameOriginal = filen.split('_343TQpMcWg_').pop();
            //} else if (filen.split('_').length > 1) {
            //    filenameOriginal = filen.split('_').pop();
            //}
            //else {
                filenameOriginal = filen;
            //}
            articleattc += vFileType + '<a data-value="' + vURLDoc + '" href="javascript:void(0);" onclick="ViewCorrespondenceDocument(this)">' + filenameOriginal + '</a><br/>';

            //if (vURLDoc.indexOf(".doc") >= 0 || vURLDoc.indexOf(".ppt") >= 0 || vURLDoc.indexOf(".xls") >= 0 || vURLDoc.indexOf(".dotx") >= 0) {
            //articleattc += vFileType + '<a data-value="' + vURLDoc + '" href="javascript:void(0);" onclick="ViewCorrespondenceDocument(this)">' + filen + '</a><br/>';
            //}
            //else {
            //    articleattc += vFileType + '<a href="' + vURLDoc + '" target="_blank">' + filen + '</a><br/>';
            //}
        });

    }
    return articleattc;

}


function ViewCorrespondenceDocument(docurl) {
    if (docurl != '') {
        if (typeof docurl === "string") {
            docurl = decodeURIComponent(docurl);
        }
        else {
            docurl = decodeURIComponent($(docurl).attr('data-value'));
        }
        var srcurl = docurl;
        var IsView = true;
        if (srcurl.indexOf("%") >= 0) {
            var fileName = srcurl.split('/').pop();
            fileName = encodeURIComponent(fileName);
            srcurl = srcurl.substring(0, srcurl.lastIndexOf('/')) + "/" + fileName;
            docurl = srcurl;
            IsView = false;
        }
        if ((docurl.indexOf(".doc") >= 0 || docurl.indexOf(".ppt") >= 0 || docurl.indexOf(".xls") >= 0 || docurl.indexOf(".dotx") >= 0) && IsView) {
            srcurl = "https://view.officeapps.live.com/op/embed.aspx?src=" + docurl + "?" + randomString() + "=" + randomString() + "&wdStartOn=1";
        }
        if (docurl.indexOf(".pdf") >= 0 && IsView) {
            window.open("http://docs.google.com/gview?url=" + srcurl + "?" + randomString() + "=" + randomString(), '_blank');
        } else {
            window.open(srcurl);
        }
    }
}



