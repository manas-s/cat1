var settings = {
    pattern: /\.[0-9a-z]+$/i,
    knownFileTypes: ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'zip', 'rar', 'gzip', 'arj', 'wav', 'mp3', 'aif', 'aiff', 'm4a', 'ogg', 'wma', 'psd', 'ai', 'swf', 'fla', 'css', 'js', 'avi', 'mov', 'wmv', 'dotx'],
    WopiFrameFileTypes: ['doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx', 'dotx'],
    videoFileTypes: ['m2v', 'ismv', 'wmv', 'mpeg', 'mpg', 'mp4', 'xesc', 'vob', 'ts', 'mod', 'avi', 'm2ts', 'mts', 'asf', '3gp', '3g2', '3gp2', 'flv', 'mkv']
};
var Folderselection = '';
var sortFormat = "";

$(document).ready(function () {

    //if (localStorage.UserType.indexOf("Global Contract Owner") >= 0 || localStorage.UserType.indexOf("Global Administrator") >= 0) {
    //    $('.Contribute').css("display", "");
    //    $('#btnaddnewsubfolder').css("display", "");
    //    $('#btnCreatDocument').css("display", "");
    //    $('#btnCreateVideo').css("display", "");
    //    $('#imgbtnfolder').css("display", "");
    //}
    //else {
    //    $('.Contribute').css("display", "none");
    //    $('#btnaddnewsubfolder').css("display", "none");
    //    $('#btnCreatDocument').css("display", "none");
    //    $('#btnCreateVideo').css("display", "none");
    //    $('#imgbtnfolder').css("display", "none");
    //}
    $("#addDocument").dialog({
        autoOpen: false,
        closeText: "",
        width: "60%",
        title: "Document",
        dialogClass: "popup_width100",
        height: 500,
        modal: true,
        buttons: {
            "Upload": function () { $("#liSelectedRelatedContract").empty(); CreateDocument(); },
            Cancel: function () {
                $("#hdnIsDocumentTag").text('');
                $("#liSelectedRelatedContract").empty();
                $("#docContract").val('').clone(true);
                $("#txtDescriptionDoc").val("");
                $(this).dialog("close");
            }
        },
        close: function (event, ui) {
            $("#docContract").val('').clone(true)
            $("#hdnIsDocumentTag").text('');
            $("#liSelectedRelatedContract").empty();
            $("#txtDescriptionDoc").val("");
        }
    });

    $("#dvfoldercreation").dialog({
        autoOpen: false,
        closeText: "",
        width: "45%",
        title: "Add Folder",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "Add": function () { createnewfolder(); },
            Cancel: function () {
                $("#txtnewfoldervalue").val('');
                $(this).dialog("close");
            },
        }, close: function (event, ui) {
            $("#txtnewfoldervalue").val('');
            $(this).dialog("close");
        }
    });

    $("#EditDocument").dialog({
        autoOpen: false,
        closeText: "",
        width: "45%",
        title: "Create Folder",
        dialogClass: "popup_width100",
        modal: true,
        buttons: {
            "Save": function () { editDocument(); },
            Cancel: function () {
                $('#txtEditDocumentvalue').val('');
                $('#lblextension').html('');
                $('#txtEditDescription').html('');
                $('#lbldocumentID').html('');
                $(this).dialog("close");
            },
        }, close: function (event, ui) {
            $('#txtEditDocumentvalue').val('');
            $('#lblextension').html('');
            $('#lbldocumentID').html('');
            $('#txtEditDescription').html('');
            $(this).dialog("close");
        }
    });

    $("#addVideo").dialog({
        autoOpen: false,
        closeText: "",
        width: "60%",
        title: "Video",
        dialogClass: "popup_width100",
        height: 500,
        modal: true,
        buttons: {
            "Upload": function () {
                $("#liSelectedRelatedContract").empty(); CreateVideo();
            },
            Cancel: function () {
                $("#hdnIsDocumentTag").text('');
                $("#liSelectedRelatedContract").empty();
                $("#docContract").val('').clone(true);
                $("#txtDescriptionVD").val("");
                $(this).dialog("close");
            }
        },
        close: function (event, ui) {
            $("#docContract").val('').clone(true)
            $("#hdnIsDocumentTag").text('');
            $("#liSelectedRelatedContract").empty();
            $("#txtDescriptionVD").val("");
        }
    });

    $("#ShowVideo").dialog({
        autoOpen: false,
        closeText: "",
        width: 600,
        title: "Video",
        dialogClass: "popup_width100",
        height: 600,
        modal: true,
        buttons: {
            Cancel: function () {
                var vedio = document.getElementById("player");
                vedio.pause();
                vedio.currentTime = 0;
                $(this).dialog("close");
            }
        },
        close: function (event, ui) {
            var vedio = document.getElementById("player");
            vedio.pause();
            vedio.currentTime = 0;
            $(this).dialog("close");
        }
    });

    if (localStorage.UserType.indexOf("Global Contract Owner") >= 0 || localStorage.UserType.indexOf("Global Administrator") >= 0) {
        $('.Contribute').css("display", "");
        $('#btnaddnewsubfolder').css("display", "");
        $('#btnCreatDocument').css("display", "");
        $('#btnCreateVideo').css("display", "");
        $('#imgbtnfolder').css("display", "");
    }
    else {
        $('.Contribute').css("display", "none");
        $('#btnaddnewsubfolder').css("display", "none");
        $('#btnCreatDocument').css("display", "none");
        $('#btnCreateVideo').css("display", "none");
        $('#imgbtnfolder').css("display", "none");
    }
    $("#hdContAreaDocLibName").val('/Help Documents/')
    getAllHelpDocuments();
    $("#conSortByOptions").niceSelect();

});
function Loading_View_trigger() {
    if (localStorage.UserType.indexOf("Global Contract Owner") >= 0 || localStorage.UserType.indexOf("Global Administrator") >= 0) {
        $('.Contribute').css("display", "");
        $('#btnaddnewsubfolder').css("display", "");
        $('#btnCreatDocument').css("display", "");
        $('#btnCreateVideo').css("display", "");
        $('#imgbtnfolder').css("display", "");
    }
    else {
        $('.Contribute').css("display", "none");
        $('#btnaddnewsubfolder').css("display", "none");
        $('#btnCreatDocument').css("display", "none");
        $('#btnCreateVideo').css("display", "none");
        $('#imgbtnfolder').css("display", "none");
    }
}
$('#btnaddnewsubfolder').click(function () {
    $('#lblFolderLocation').text('');
    var documenturl = "";
    var docurl = $('#showAll').text();
    if (docurl != '') {
        var url = $('#showAll').text().split('/');
        for (spl = 1; spl < url.length; spl++) {
            documenturl += url[spl].trim() + '/';
        }
    }
    var finalurlstr = ($("#hdContAreaDocLibName").val().charAt(0) != '/') ? '/' + $("#hdContAreaDocLibName").val() : $("#hdContAreaDocLibName").val();
    finalurlstr = ((finalurlstr.substr(finalurlstr.length - 1)) != "/") ? finalurlstr + "/" : finalurlstr;
    finalurlstr = (documenturl != null && documenturl != "") ? finalurlstr + documenturl : finalurlstr
    $('#lblFolderLocation').text(finalurlstr);
    if (localStorage.UserType.indexOf("Global Contract Owner") >= 0 || localStorage.UserType.indexOf("Global Administrator") >= 0) {
        $("#dvfoldercreation").dialog("option", "title", "Add Folder");
        $("#dvfoldercreation").dialog("open");
    }
    else {
        return;
    }
});

function UploadDocumnet() {
    if (localStorage.UserType.indexOf("Global Contract Owner") >= 0 || localStorage.UserType.indexOf("Global Administrator") >= 0) {
        var documenturl = ''
        var docurl = $('#showAll').text();
        if (docurl != '') {
            var url = $('#showAll').text().split('/');
            for (spl = 1; spl < url.length; spl++) {
                documenturl += url[spl].trim() + '/';
            }
        }

        var finalurlstr = ($("#hdContAreaDocLibName").val().charAt(0) != '/') ? '/' + $("#hdContAreaDocLibName").val() : $("#hdContAreaDocLibName").val();
        finalurlstr = ((finalurlstr.substr(finalurlstr.length - 1)) != "/") ? finalurlstr + "/" : finalurlstr;
        finalurlstr = (documenturl != null && documenturl != "") ? finalurlstr + documenturl : finalurlstr

        $('#lblFolderUrl').text(finalurlstr);
        $("#addDocument").dialog("option", "title", "Upload Document");
        $("#addDocument").dialog("open");
    }
    else {
        return;
    }
}


function UploadVideo() {
    if (localStorage.UserType.indexOf("Global Contract Owner") >= 0 || localStorage.UserType.indexOf("Global Administrator") >= 0) {
        var documenturl = ''
        var docurl = $('#showAll').text();
        if (docurl != '') {
            var url = $('#showAll').text().split('/');
            for (spl = 1; spl < url.length; spl++) {
                documenturl += url[spl].trim() + '/';
            }
        }

        var finalurlstr = ($("#hdContAreaDocLibName").val().charAt(0) != '/') ? '/' + $("#hdContAreaDocLibName").val() : $("#hdContAreaDocLibName").val();
        finalurlstr = ((finalurlstr.substr(finalurlstr.length - 1)) != "/") ? finalurlstr + "/" : finalurlstr;
        finalurlstr = (documenturl != null && documenturl != "") ? finalurlstr + documenturl : finalurlstr

        $('#lblFolderUrlVD').text(finalurlstr);
        $("#addVideo").dialog("option", "title", "Upload Video");
        $("#addVideo").dialog("open");
    }
    else {
        return;
    }
}
function modalOnOpenDocument() {
}

function createnewfolder() {
    $("#loadingPage").fadeIn();
    var isExist = false;
    if (requiredValidator("dvfoldercreation")) {
        if (listDocuments != null) {
            $(listDocuments).each(function (i, item) {
                if (item.DocumentName.replace(/\s\s+/g, " ").toLowerCase().trim() == $("#txtnewfoldervalue").val().replace(/\s\s+/g, " ").toLowerCase().trim()) {
                    isExist = true;
                }
            });
        }

        if (!isExist) {
            var documenturl = "";
            var docurl = $('#showAll').text();
            if (docurl != '') {
                var url = $('#showAll').text().split('/');
                for (spl = 1; spl < url.length; spl++) {
                    documenturl += url[spl].trim() + '/';
                }
            }
            var finalurlstr = ($("#hdContAreaDocLibName").val().charAt(0) != '/') ? '/' + $("#hdContAreaDocLibName").val() : $("#hdContAreaDocLibName").val();
            finalurlstr = ((finalurlstr.substr(finalurlstr.length - 1)) != "/") ? finalurlstr + "/" : finalurlstr;
            finalurlstr = (documenturl != null && documenturl != "") ? finalurlstr + documenturl : finalurlstr

            //$('#lblFolderLocation').text(finalurlstr);

            $.ajax({
                url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/Createfolder?locationurl=' + encodeURIComponent(finalurlstr) + '&newfolder=' + $("#txtnewfoldervalue").val().replace(/\s\s+/g, " ").trim() + '&Description=' + $("#txtDescriptionDoc").val() + '&username=' + localStorage.UserName,
                type: 'POST',
                cache: false,
                contentType: false,
                headers: {
                    'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName
                },
                processData: false,
                success: function (folder) {
                    if ($('#hdninsidefolder').val() == "") {
                        getAllHelpDocuments();
                    }
                    else {
                        showDocumentsInFolder($('#hdninsidefolder').val());
                    }

                    $("#loadingPage").fadeOut();
                    $("#txtnewfoldervalue").val('');
                    $("#dvfoldercreation").dialog("close");
                },
                error: function (document) {
                    $("#loadingPage").fadeOut();
                    $("#txtnewfoldervalue").val('');
                    $("#dvfoldercreation").dialog("close");
                }
            });
        }
        else {
            swal("", "Folder already exists with the same name " + $("#txtnewfoldervalue").val() + "");
            $("#loadingPage").fadeOut();
        }
    }
    else {
        $("#loadingPage").fadeOut();
    }


}
function CreateDocument() {
    var isExist = false;
    var documentID = "";
    var overwritedocument = false;
    $("#loadingPage").fadeIn();

    if (requiredValidator("addDocument")) {
        var opmlFile = $('#docContract')[0];
        if (listDocuments != null) {
            $(listDocuments).each(function (i, item) {
                if (item.DocumentName.replace(/\s\s+/g, " ").toLowerCase().trim() == opmlFile.files[0].name.replace(/\s\s+/g, " ").toLowerCase().trim()) {
                    isExist = true;
                    documentID = item.RowKey;
                    return false;
                }
            });
        }
        if (!isExist) {
            Upload();
        }
        else {
            $("#loadingPage").fadeOut();
            //swal("", "Document already exists with the same name " + opmlFile.files[0].name + "");
            swal({
                title: '',
                text: "Document already exists, do you want to <span style='font-weight:700'>overwrite</span> the existing document?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                html: true,
                closeOnConfirm: true
            },
                   function (confirmed) {
                       if (confirmed) {
                           overwritedocument = true;
                           Upload(overwritedocument, documentID);

                       }
                   });
        }
    }
    else {
        $("#loadingPage").fadeOut();
    }

}

function Upload(overwritedocument, ID) {
    $("#loadingPage").fadeIn();
    var overWrite = false;
    var documentiD = "";
    var desc = "";
    if (typeof (overwritedocument) != "undefined" && overwritedocument != null && overwritedocument != "") {
        overWrite = overwritedocument;
        documentiD = ID;
    }
    var finalurlstr = $('#lblFolderUrl').text();
    var opmlFile = $('#docContract')[0];
    var formData = new FormData();
    formData.append("AccountID", localStorage.AccountID);
    formData.append("Description", $("#txtDescriptionDoc").val());
    formData.append("UserName", localStorage.UserName);
    formData.append("LocationURL", finalurlstr);
    if (opmlFile.files.length > 0) {
        formData.append("opmlFile", opmlFile.files[0]);
    }
    formData.append("overWrite", overWrite);
    formData.append("documentiD", documentiD);

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/CreateHelpDocument',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        headers: {
            'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken
        },
        processData: false,
        async: true,
        success: function (data) {
            //$('select option:contains("Recently Updated")').prop('selected', true);
            if ($('#hdninsidefolder').val() == "") {
                getAllHelpDocuments();
            }
            else {
                showDocumentsInFolder($('#hdninsidefolder').val());
            }
            $("#loadingPage").fadeOut();
            $("#docContract").replaceWith($("#docContract").val('').clone(true));
            $("#txtDescriptionDoc").val('');
            $("#addDocument").dialog("close");
        },
        error: function (data) {
            $("#loadingPage").fadeOut();
            $("#docContract").replaceWith($("#docContract").val('').clone(true));
            $("#txtDescriptionDoc").val('');
            $("#addDocument").dialog("close");
        }
    });
}
var documentTags = [];
function getAllHelpDocuments() {
    $('#listDocuments').html('<img class="f_p-error" src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/GetHelpDocuments',
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessAreaLocation: localStorage.GlobalBusinessAreaLocation },
        success: function (data) {

            $(data).each(function (i, item) {
                documentTags.push(item.DocumentName);
            });
            documentTags = $.grep(documentTags, function (n) {
                return (n);
            });

            documentTags = documentTags.filter(function (elem, index, self) {
                return index == self.indexOf(elem);
            });
            var itemN = $.grep(data, function (itemR, i) {
                return (itemR.ParentFolderID == "" || itemR.ParentFolderID == null || typeof (itemR.ParentFolderID) == "undefined")
            });

            bindAlldocuments(itemN);

        },
        error: function (data) {

        }
    });
}
function bindAlldocuments(data) {
    listDocuments = data;
    if ($('#conSortByOptions').val() == "Recently Updated") {
        listDocuments.sort(function (a, b) {
            var a = moment(a.Modified),
                b = moment(b.Modified);
            return (b - a);
        })

        data.sort(function (a, b) {
            var a = moment(a.Modified),
                b = moment(b.Modified);
            return (b - a);
        })
    }
    else {
        listDocuments.sort(function (a, b) {
            var a = new moment(a.Created),
                b = new moment(b.Created);
            return (b - a);
        })

        data.sort(function (a, b) {
            var a = new moment(a.Created),
                b = new moment(b.Created);
            return (b - a);
        })
    }
    if (data.length <= 0) {
        $('#listDocuments').html('No data found');
    }
    else {
        var isFolder = false;
        var multipleChecks = "";
        $("#listDocuments").empty();
        $(data).each(function (i, item) {
            documentTags.push(item.DocumentName);
            var article = "<li style='margin-bottom: 10px;width: 100%;float: left;'>";
            if (item != null) {
                if (item.DocumentName.indexOf('.') > -1) {
                    isFolder = false;
                }
                else {
                    isFolder = true;
                }
            }
            var selectedSortOption = "";
            if (item.Modified != null) {
                var ModifiedDate = "";
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                { ModifiedDate = moment(new Date(item.Modified)).format('MM/DD/YYYY hh:mm:ss'); }
                else {
                    ModifiedDate = moment(new Date(item.Modified)).format(localStorage.AppDateFormat + " hh:mm:ss");
                }
                selectedSortOption = "Last Updated by " + item.ModifiedBy + " on " + ModifiedDate;
            }
            if (item.Created != null) {
                var CreatedDate = "";
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                { CreatedDate = moment(new Date(item.Created)).format('MM/DD/YYYY hh:mm:ss'); }
                else {
                    CreatedDate = moment(new Date(item.Created)).format(localStorage.AppDateFormat + " hh:mm:ss");
                }
                //selectedSortOption = "Created by" + item.Created + "on " + CreatedDate;
            }
            if (isFolder) {
                var vClassFolder = "openmenuFolder";
                //vClassFolder = ApplyPermission("openmenuFolder", item.Permission, item.ContractStatus, true);
                article += '<p id="DocumentID" style="display:none;">' + item.RowKey + '</p>';
                article += '<p id="DocumentName" style="display:none;">' + item.DocumentName + '</p>';
                article += '<p id="DocumentUrl" style="display:none;">' + item.DocumentUrl + '</p>';
                article += '<p id="Description" style="display:none;">' + item.Description + '</p>';
                article += '<p id="Permission" style="display:none;">';
                article += '<p class="files" style="width:100%;margin-top:10px;">';
                article += '<i style="width:100%"><img src="../Content/Images/icon/folder.png" style="margin: 0 5px 0 0px;" /><a style="margin: 0 0px; !important" href="javascript:void(0)" id=' + item.RowKey + ' onclick="javascript:showfolderdocuments(this,false);">' + item.DocumentName + '</a> <img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="' + vClassFolder + '" />';
                article += '&nbsp;<small style="font-size: 11px;line-height: 19px;color: #b4b3b3;width:100%">' + selectedSortOption + '</small>';
                article += '<small title="Description" style="font-size: 11px; color:#565656">' + item.Description + '</small>';

                //}
            }
            else {
                var vPrimDocIcon = '';
                var vDocIcon = "";
                var vClass = "openmenuDocument";
                article += '<p class="files">';
                vURLDoc = encodeURI(item.DocumentUrl);
                var ext = vURLDoc.match(settings.pattern);
                var vFileType = '<dd class="file-icon none"></dd>';
                if (ext != null) {
                    if (ext.length > 0) { ext = ext[0].slice(1); }
                    if (jQuery.inArray(ext, settings.knownFileTypes) > -1) {
                        vFileType = '<dd class="file-icon ' + ext + '"style="margin-right:0 !important;"></dd>';
                    }
                }

                if (ext != null) {
                    if (jQuery.inArray(ext, settings.videoFileTypes) > -1) {
                        vFileType = '<dd class="file-video" style="margin-right:0 !important;"></dd>';

                        if (ext != 'mp4') {
                            vClass = "openmenuVedio";
                        }
                    }
                }
                //if (multipleChecks.indexOf(item.RowKey) > -1) {
                //        article += '<input class="margin-Top10 margin-right" name="ContRec" type="checkbox" checked value="" onclick="checkMultipleContracts(this);" id="' + item.RowKey + "~" + item.DocumentUrl + '"  />';
                //} else { article += '<input class="margin-Top10 margin-right" name="ContRec" type="checkbox" value="" onclick="checkMultipleContracts(this);" id="' + item.RowKey + "~" + item.DocumentUrl + '"  />'; }
                article += '<p id="DocumentID" style="display:none;">' + item.RowKey + '</p>';
                article += '<p id="DocumentName" style="display:none;">' + item.DocumentName + '</p>';
                article += '<p id="DocumentUrl" style="display:none;">' + item.DocumentUrl + '</p>';
                article += '<p id="Description" style="display:none;">' + item.Description + '</p>';
                article += '<i style="width:100%"> ' + vFileType + ' <a href="javascript:void(0)" onclick=showdocument(this); data-value="' + encodeURI(item.DocumentUrl) + '" title="' + item.DocumentName + '"  style="margin-left: 0 !important;">' + item.DocumentName + '</a> <img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="' + vClass + '" />' + vPrimDocIcon + vDocIcon + '&nbsp;</br><small style="font-size: 11px;line-height: 19px;color: #b4b3b3">' + selectedSortOption + '</small>' + '&nbsp;</i>';
                if (item.Description != "") {
                    article += '<small id="dotdesc' + item.RowKey + '" title="Description" style="font-size: 11px; color:#565656;width:100%" class="doted100">' + item.Description + '</small>';
                    article += '<small id="desc' + item.RowKey + '" title="Description" style="font-size: 11px;color:#565656;display:none;width:100%">' + item.Description + '</small>';
                }
                if (item.Description.length > 149) {
                    article += '<a id="more' + item.RowKey + '" href="javascript:void(0)" onclick=showMore(\'' + item.RowKey + '\') style="font-size: 11px;width:100%">view more</a>';
                    article += '&nbsp;&nbsp;<a id="less' + item.RowKey + '" style="display:none;font-size: 11px" href="javascript:void(0)" onclick=showLess(\'' + item.RowKey + '\') style="font-size: 11px;width:100%">view less</a>';
                }
                // }

            }
            isFolder = false;
            article += '</p></li>';
            $("#listDocuments").append(article);
            article = '';
        });
        $(".openmenuDocument").contextMenu({ menu: 'myMenuDocument', leftButton: true }, function (action, el, pos) {
            contextMenuWorkDocument(action, el.parent("i").parent("li"), pos);
        });
        $(".openmenuVedio").contextMenu({ menu: 'myMenuVedio', leftButton: true }, function (action, el, pos) {
            contextMenuWorkDocument(action, el.parent("i").parent("li"), pos);
        });
        $(".openmenuFolder").contextMenu({ menu: 'myMenuFolder', leftButton: true }, function (action, el, pos) {
            contextMenuWorkFolder(action, el.parent("i").parent("p").parent("li"), pos);
        });
        if (data.length > 10) {
            $("#footerPage").css('display', '');
            $("#compact-pagination").css('display', '');
        } else {
            $("#footerPage").css('display', 'none');
            $("#compact-pagination").css('display', 'none');
        }
        $('#compact-pagination').pagination({
            items: data.length,
            itemsOnPage: 10,
            type: 'ul',
            row: 'li',
            typeID: 'listDocuments',
            cssStyle: 'compact-theme',
            //listname: 'listDocuments'
        });

        documentTags = $.grep(documentTags, function (n) {
            return (n);
        });

        documentTags = documentTags.filter(function (elem, index, self) {
            return index == self.indexOf(elem);
        });
        $("#txtSearchBox").autocomplete({
            source: documentTags,
            minLength: 2,
            focus: function (event, ui) {
                return false;
            },
            select: function (evn, uidetails) {
                $("#txtSearchBox").val(uidetails.item.label);
                search();
            }
        });

    }
}
function CreateDocumentList(page) {

    var startIndex = page * 10;
    var endIndex = startIndex + 10;

    var isFolder = false;
    var multipleChecks = "";

    if ($('#conSortByOptions').val() == "Recently Updated") {
        listDocuments.sort(function (a, b) {
            var a = moment(a.Modified),
                b = moment(b.Modified);
            return (b - a);
        })

    }
    else {
        listDocuments.sort(function (a, b) {
            var a = new moment(a.Created),
                b = new moment(b.Created);
            return (b - a);
        })

    }

    $("#listDocuments").empty();
    if (listDocuments.length > 0) {
        $(listDocuments).each(function (i, item) {
            //var item = listDocuments[j];
            var article = "<li style='margin-bottom: 10px;width: 100%;float: left;'>";
            if (item != null) {
                if (item.DocumentName.indexOf('.') > -1) {
                    isFolder = false;
                }
                else {
                    isFolder = true;
                }

                var selectedSortOption = "";

                if (item.Modified != null && sortFormat == "recentUpdated") {
                    var ModifiedDate = "";
                    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                    { ModifiedDate = moment(new Date(item.Modified)).format('MM/DD/YYYY hh:mm:ss'); }
                    else {
                        ModifiedDate = moment(new Date(item.Modified)).format(localStorage.AppDateFormat + " hh:mm:ss");
                    }
                    selectedSortOption = "Last Updated by " + item.ModifiedBy + " on " + ModifiedDate;
                }
                else if (item.Created != null && sortFormat == "recentCreated") {
                    var CreatedDate = "";
                    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                    { CreatedDate = moment(new Date(item.Created)).format('MM/DD/YYYY hh:mm:ss'); }
                    else {
                        CreatedDate = moment(new Date(item.Created)).format(localStorage.AppDateFormat + " hh:mm:ss");
                    }
                    selectedSortOption = "Last Created by " + item.CreatedBy + " on " + CreatedDate;
                }
                else {
                    var ModifiedDate = "";
                    if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                    { ModifiedDate = moment(new Date(item.Modified)).format('MM/DD/YYYY hh:mm:ss'); }
                    else {
                        ModifiedDate = moment(new Date(item.Modified)).format(localStorage.AppDateFormat + " hh:mm:ss");
                    }
                    selectedSortOption = "Last Updated by " + item.ModifiedBy + " on " + ModifiedDate;
                }
                if (isFolder) {
                    var vClassFolder = "openmenuFolder";
                    //vClassFolder = ApplyPermission("openmenuFolder", item.Permission, item.ContractStatus, true);
                    article += '<p id="DocumentID" style="display:none;">' + item.RowKey + '</p>';
                    article += '<p id="DocumentName" style="display:none;">' + item.DocumentName + '</p>';
                    article += '<p id="DocumentUrl" style="display:none;">' + item.DocumentUrl + '</p>';
                    article += '<p id="Description" style="display:none;">' + item.Description + '</p>';
                    article += '<p id="Permission" style="display:none;">' + vClassFolder;
                    article += '<p class="files" style="width:100%;margin-top:10px">';
                    article += '<i style="width:100%"><img src="../Content/Images/icon/folder.png" style="margin: 0 5px 0 0px;" /><a style="margin: 0 0px; !important" href="javascript:void(0)" id=' + item.RowKey + ' onclick="javascript:showfolderdocuments(this,false);">' + item.DocumentName + '</a> <img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="' + vClassFolder + '" />';
                    article += '&nbsp;<small style="font-size: 11px;line-height: 19px;color: #b4b3b3;width:100%">' + selectedSortOption + '</small>';
                    article += '<small title="Description" style="font-size: 11px; color:#565656">' + item.Description + '</small>';

                    //}
                }
                else {
                    var vPrimDocIcon = '';
                    var vDocIcon = "";
                    var vClass = "openmenuDocument";
                    article += '<p class="files">';
                    vURLDoc = encodeURI(item.DocumentUrl);
                    var ext = vURLDoc.match(settings.pattern);
                    var vFileType = '<dd class="file-icon none"></dd>';
                    if (ext != null) {
                        if (ext.length > 0) { ext = ext[0].slice(1); }
                        if (jQuery.inArray(ext, settings.knownFileTypes) > -1) {
                            vFileType = '<dd class="file-icon ' + ext + '" style="margin-right:0 !important;"></dd>';
                        }
                    }
                    if (ext != null) {
                        if (jQuery.inArray(ext, settings.videoFileTypes) > -1) {
                            vFileType = '<dd class="file-video" style="margin-right:0 !important;"></dd>';

                            if (ext != 'mp4') {
                                vClass = "openmenuVedio";
                            }
                        }
                    }
                    //if (multipleChecks.indexOf(item.RowKey) > -1) {
                    //        article += '<input class="margin-Top10 margin-right" name="ContRec" type="checkbox" checked value="" onclick="checkMultipleContracts(this);" id="' + item.RowKey + "~" + item.DocumentUrl + '"  />';
                    //} else { article += '<input class="margin-Top10 margin-right" name="ContRec" type="checkbox" value="" onclick="checkMultipleContracts(this);" id="' + item.RowKey + "~" + item.DocumentUrl + '"  />'; }
                    article += '<p id="DocumentID" style="display:none;">' + item.RowKey + '</p>';
                    article += '<p id="DocumentName" style="display:none;">' + item.DocumentName + '</p>';
                    article += '<p id="DocumentUrl" style="display:none;">' + item.DocumentUrl + '</p>';
                    article += '<p id="Description" style="display:none;">' + item.Description + '</p>';
                    article += '<i style="width:100%"> ' + vFileType + ' <a href="javascript:void(0)" onclick=showdocument(this); data-value="' + encodeURI(item.DocumentUrl) + '" title="' + item.DocumentName + '" style="margin-right:0 !important;">' + item.DocumentName + '</a>&nbsp;' + '<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="' + vClass + '" />' + vPrimDocIcon + vDocIcon + '&nbsp;</br><small style="font-size: 11px;line-height: 19px;color: #b4b3b3;">' + selectedSortOption + '</small></i>';
                    if (item.Description != "") {
                        article += '<small id="dotdesc' + item.RowKey + '" title="Description" style="font-size: 11px; color:#565656;width:100%" class="doted100">' + item.Description + '</small>';
                        article += '<small id="desc' + item.RowKey + '" title="Description" style="font-size: 11px;color:#565656;display:none;width:100%">' + item.Description + '</small>';
                    }

                    if (item.Description.length > 149) {
                        article += '<a id="more' + item.RowKey + '" href="javascript:void(0)" onclick=showMore(\'' + item.RowKey + '\') style="font-size: 11px;width:100%">view more</a>';
                        article += '&nbsp;&nbsp;<a id="less' + item.RowKey + '" style="display:none;font-size: 11px" href="javascript:void(0)" onclick=showLess(\'' + item.RowKey + '\') style="font-size: 11px;width:100%">view less</a>';
                    }
                    // }

                }
                isFolder = false;
                article += '</p></li>';
                $("#listDocuments").append(article);
            }
            article = '';
        });
    }
    else {
        $("#listDocuments").append("No items found.");
    }
    $(".openmenuDocument").contextMenu({ menu: 'myMenuDocument', leftButton: true }, function (action, el, pos) {
        contextMenuWorkDocument(action, el.parent("i").parent("li"), pos);
    });
    $(".openmenuVedio").contextMenu({ menu: 'myMenuVedio', leftButton: true }, function (action, el, pos) {
        contextMenuWorkDocument(action, el.parent("i").parent("li"), pos);
    });
    $(".openmenuFolder").contextMenu({ menu: 'myMenuFolder', leftButton: true }, function (action, el, pos) {
        contextMenuWorkFolder(action, el.parent("i").parent("p").parent("li"), pos);
    });
    if (listDocuments.length > 10) {
        $("#footerPage").css('display', '');
        $("#compact-pagination").css('display', '');
    } else {
        $("#footerPage").css('display', 'none');
        $("#compact-pagination").css('display', 'none');
    }
    $('#compact-pagination').pagination({
        items: listDocuments.length,
        itemsOnPage: 10,
        type: 'ul',
        row: 'li',
        typeID: 'listDocuments',
        cssStyle: 'compact-theme',
        //listname: 'listDocuments'
    });
}

function editDocument() {
    $("#loadingPage").fadeIn();
    if (requiredValidator("EditDocument")) {

        var documentID = $('#lbldocumentID').html();
        var documentName = $('#txtEditDocumentvalue').val() + $('#lblextension').html();
        var description = $('#txtEditDescription').val();
        var overWrite = "";


        $.ajax({
            url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/UpdateHelpDocument?documentid=' + documentID + '&DocumentName=' + documentName + '&Description=' + encodeURIComponent(description) + '&username=' + localStorage.UserName,
            type: 'put',
            cache: false,
            contentType: false,
            headers: {
                'eContracts-ApiKey': localStorage.APIKey, 'eContracts-RestrictionHeader': localStorage.RestrictHighSecurityTagging, username: localStorage.UserName
            },
            processData: false,
            success: function (document) {
                //$('select option:contains("Recently Updated")').prop('selected', true);
                if ($('#hdninsidefolder').val() == "") {
                    getAllHelpDocuments();
                }
                else {
                    showDocumentsInFolder($('#hdninsidefolder').val());
                }
                $("#loadingPage").fadeOut();
                $('#txtEditDocumentvalue').val('');
                $('#lblextension').html('');
                $('#lbldocumentID').html('');
                $('#txtEditDescription').val('');
                $("#EditDocument").dialog("close");
            },
            error: function (document) {
                $("#loadingPage").fadeOut();
                $('#txtEditDocumentvalue').val('');
                $('#lblextension').html('');
                $('#lbldocumentID').html('');
                $('#txtEditDescription').val('');
                $("#EditDocument").dialog("close");
            }
        });
    }
    else {
        $("#loadingPage").fadeOut();
    }
}
function contextMenuWorkDocument(action, el, pos) {
    switch (action) {
        case "Delete":
            {
                var documentName = $(el).find("#DocumentName").text();
                var documentID = $(el).find("#DocumentID").text();
                swal({
                    title: '',
                    text: "Are you sure you want to <span style=\"font-weight:700\">delete '" + documentName + "'</span>?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
     function (confirmed) {
         if (confirmed) {
             $("#loadingPage").fadeIn();

             var documentID = $(el).find("#DocumentID").text();
             $.ajax({
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/deleteHelpDocument?documentid=' + documentID,
                 type: 'DELETE',
                 dataType: 'json',
                 "Content-Type": "application/json",
                 headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                 cache: false,
                 success: function (data) {
                     if ($('#hdninsidefolder').val() == "") {
                         getAllHelpDocuments();
                     }
                     else {
                         showDocumentsInFolder($('#hdninsidefolder').val());
                     }
                     $("#loadingPage").fadeOut();
                 }
             });
         }
         return;
     });
                break;
            }
        case "Download":
            {
                var LinkURL = $(el).find("a").attr('data-value');
                var SourceUrl = "";
                if (LinkURL == "#") {
                    SourceUrl = $(el).find("a").attr('seqe')
                } else {
                    LinkURsL = $(el).find("a").attr('data-value');
                }
                //SourceUrl = encodeURIComponent(SourceUrl);
                location = localStorage.SPHostUrl + "/_layouts/15/download.aspx?SourceUrl=" + LinkURL;
                break;
            }
        case "view":
            {
                var el = $(el).find("a");
                var ext = el[0].innerText.match(settings.pattern);
                if (ext.length > 0) { ext = ext[0].slice(1); }
                var title = el[0].innerText;
                if (ext != null && ext != "") {
                    if (jQuery.inArray(ext, settings.videoFileTypes) > -1) {
                        if (ext.indexOf('mp4') > -1) {
                            $("#ShowVideo").dialog("option", "title", title);
                            $("#ShowVideo").dialog("open");
                            $('#docText').val(el[0].innerText)
                            var vedio = document.getElementById("player");
                            if (vedio.children.length > 0)
                                vedio.removeChild(vedio.childNodes[1]);
                            var source = document.createElement('source');
                            source.setAttribute('src', el[0].dataset.value);
                            source.setAttribute('type', 'video/mp4');
                            vedio.appendChild(source);
                            vedio.load();
                            vedio.play();
                        }
                        else {
                            Opendocinbrowser(el[0].dataset.value);
                        }

                    }
                    else {
                        Opendocinbrowser(el[0].dataset.value);
                    }
                }
                else {
                    Opendocinbrowser(el[0].dataset.value);
                }


                break;
            }
        case "edit":
            {
                var documentName = $(el).find("#DocumentName").text();
                var splitDOC = documentName.split('.');
                $('#txtEditDocumentvalue').val(splitDOC.slice(0, -1).join('.'));
                $('#lblextension').html('.' + documentName.split('.').pop());
                $('#txtEditDescription').val($(el).find("#Description").text());
                $('#lbldocumentID').html($(el).find("#DocumentID").text());
                var acceptExtension = ['m2v', 'ismv', 'wmv', 'mpeg', 'mpg', 'mp4', 'xesc', 'vob', 'ts', 'mod', 'avi', 'm2ts', 'mts', 'asf', '3gp', '3g2', '3gp2', 'flv', 'mkv'];
                if (acceptExtension.indexOf(splitDOC[1].trim().toLowerCase()) > -1) {
                    $("#EditDocument").dialog("option", "title", "Edit Vedio");
                }
                else {
                    $("#EditDocument").dialog("option", "title", "Edit Document");
                }
                $("#EditDocument").dialog("open");
                break;
            }
    }

}
function contextMenuWorkFolder(action, el, pos) {
    switch (action) {
        case "open":
            {
                var documentID = $(el).find("#DocumentID").text();
                var LinkURL = $("#" + documentID)[0];
                showfolderdocuments(LinkURL, true);
                break;
            }
        case "Delete":
            {
                var documentName = $(el).find("#DocumentName").text();
                var documentID = $(el).find("#DocumentID").text();
                swal({
                    title: '',
                    text: "Are you sure you want to <span style=\"font-weight:700\">delete</span> the folder <span style=\"font-weight:700\">'" + documentName + "'</span>? All its document(s) will be deleted.",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    html: true
                },
     function (confirmed) {
         if (confirmed) {
             $("#loadingPage").fadeIn();
             var documentID = $(el).find("#DocumentID").text();
             $.ajax({
                 url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/Helpdeletefolder?&folderid=' + documentID,
                 type: 'DELETE',
                 dataType: 'json',
                 "Content-Type": "application/json",
                 headers: { 'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName },
                 cache: false,
                 success: function (data) {
                     if ($('#hdninsidefolder').val() == "") {
                         getAllHelpDocuments();
                     }
                     else {
                         showDocumentsInFolder($('#hdninsidefolder').val());
                     }
                     $("#loadingPage").fadeOut();
                 },
                 error: function () {
                     $("#loadingPage").fadeOut();
                 }
             });
         }
         return;
     });
                break;
            }
    }
}
function Opendocinbrowser(docurl) {
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
function Checkbrowsernameandversion() {
    var Openinbrowser = true;
    return Openinbrowser;
}
function showfolderdocuments(obj, checkstatus) {

    $('#hdninsidefolder').val('');
    if (obj.text != "Help Documents") {
        $('#hdninsidefolder').val(obj.id);
    }
    $("#footerPage").css('display', 'none');
    strContractDocumentsUrl = '/Contract Documents/' + obj.text;
    if ($("#showAll").text().indexOf("/") >= 0) {
        //manoj
        var selectedfolderid = "";
        if (typeof (obj.id) != "undefined") {
            selectedfolderid = obj.id;
        }
        if (typeof (selectedfolderid) != "undefined" && selectedfolderid != null && selectedfolderid != "") {
            var Istagexist = false;
            $("#showAll").find("a").each(function (e) {
                var tid = this.id;
                if (tid == obj.id) {
                    Istagexist = true;
                }
            });

            if (Istagexist) {
                var splitsection = Folderselection.split('~8Y92YagH');
                $("#showAll").empty();
                for (spl = 0; spl < splitsection.length; spl++) {
                    if (splitsection[spl] != "") {
                        if (spl == 0) {
                            $("#showAll").append(splitsection[spl]);
                            Folderselection = splitsection[spl];
                        }
                        if (splitsection[spl].indexOf(obj.id) > -1) {
                            if (spl != 0) {
                                $("#showAll").append('/' + splitsection[spl]);
                                Folderselection += "~8Y92YagH" + splitsection[spl];
                            }
                            break;
                        }
                        else {
                            if (spl != 0) {
                                $("#showAll").append('/' + splitsection[spl]);
                                Folderselection += "~8Y92YagH" + splitsection[spl];
                            }
                        }
                    }
                }
            }
        }


        if ($("#showAll").text().indexOf("/") >= 0) {
            var texttille = obj.id
            Istagexist = false;
            $("#showAll").find("a").each(function (e) {
                var tid = this.id;
                if (tid == obj.id) {
                    Istagexist = true;
                }
            });
        }

        if (Istagexist) {
            $("#showAll").empty();
            var splitsection = Folderselection.split('~8Y92YagH');
            for (spl = 0; spl < splitsection.length; spl++) {
                if (splitsection[spl] != "") {
                    if (splitsection[spl].indexOf(texttille) > -1) {
                        if (spl == 0) {
                            $("#showAll").append(splitsection[spl]);
                            Folderselection = splitsection[spl];
                        }
                        else {
                            $("#showAll").append('/' + splitsection[spl]);
                            Folderselection += "~8Y92YagH" + splitsection[spl];
                        }
                    }
                    else {
                        if (spl == 0) {
                            $("#showAll").empty();
                            $("#showAll").append(splitsection[spl]);
                            Folderselection = splitsection[spl];
                        }
                        else {
                            $("#showAll").append('/' + splitsection[spl]);
                            Folderselection += "~8Y92YagH" + splitsection[spl];
                        }
                    }
                }
            }
        }
        else {
            var Isexist = false;
            var id;
            $("#showAll").find("a").each(function (e) {
                id = this.id;
                if (id == obj.id) {
                    Isexist = true;
                }
            });
            if (!Isexist) {
                var objdetailvalue = obj.parentNode.parentNode.parentNode;
                var datavalueapply = $(objdetailvalue).find("#DocumentLibraryName").text() + '~8Z12XaFH' + $(objdetailvalue).find("#sContractid").text() + '~8Z12XaFH' + $(objdetailvalue).find("#FolderURL").text()
                $("#showAll").append(' / <a href="javascript:void(0)" id=' + obj.id + ' data-value="' + datavalueapply + '" onclick="javascript:showfolderdocuments(this);">' + obj.text + '</a>');
                Folderselection += ' ~8Y92YagH <a href="javascript:void(0)" id=' + obj.id + ' data-value="' + datavalueapply + '" onclick="javascript:showfolderdocuments(this);">' + obj.text + '</a>';
                $("#showAll").css('display', '');
            }

        }

    } else {
        $("#showAll").empty();
        Folderselection = "";
        if ($("#spnFinalizedDocuments").hasClass("active_quick_view")) {
            var objdetailvalue = obj.parentNode.parentNode.parentNode;
            var datavalueapply = $(objdetailvalue).find("#DocumentLibraryName").text() + '~8Z12XaFH' + $(objdetailvalue).find("#sContractid").text() + '~8Z12XaFH' + $(objdetailvalue).find("#FolderURL").text()
            $("#showAll").append('<a href="javascript:void(0)" name="Finalized Documents" onclick="javascript:quickViewDisplay(this);">Finalized Documents</a> / <a href="javascript:void(0)" id=' + obj.id + ' data-value="' + datavalueapply + '" onclick="javascript:showfolderdocuments(this);">' + obj.text + '</a>');
            $("#showAll").css('display', '');
        }
        else if ($("#spnDraftDocuments").hasClass("active_quick_view")) {
            var objdetailvalue = obj.parentNode.parentNode.parentNode;
            var datavalueapply = $(objdetailvalue).find("#DocumentLibraryName").text() + '~8Z12XaFH' + $(objdetailvalue).find("#sContractid").text() + '~8Z12XaFH' + $(objdetailvalue).find("#FolderURL").text()
            $("#showAll").append('<a href="javascript:void(0)" name="Draft Documents" onclick="javascript:quickViewDisplay(this);">Draft Documents</a> / <a href="javascript:void(0)" id=' + obj.id + ' data-value="' + datavalueapply + '" onclick="javascript:showfolderdocuments(this);">' + obj.text + '</a>');
            $("#showAll").css('display', '');
        }
        else {
            var objdetailvalue = obj.parentNode.parentNode.parentNode;
            var datavalueapply = $(objdetailvalue).find("#DocumentLibraryName").text() + '~8Z12XaFH' + $(objdetailvalue).find("#sContractid").text() + '~8Z12XaFH' + $(objdetailvalue).find("#FolderURL").text()
            $("#showAll").append('<img src="../Content/Images/icon/folder_open.png" style="margin-right: 5px;"><a href="javascript:void(0)"  onclick="javascript:showalldocuments();">Help Documents</a> / <a href="javascript:void(0)" id=' + obj.id + ' data-value="' + datavalueapply + '" onclick="javascript:showfolderdocuments(this);">' + obj.text + '</a>');
            Folderselection = '<img src="../Content/Images/icon/folder_open.png" style="margin-right: 5px;">&nbsp;<a href="javascript:void(0)" onclick="javascript:showalldocuments();">Help Documents</a> ~8Y92YagH <a href="javascript:void(0)" id=' + obj.id + ' data-value="' + datavalueapply + '" onclick="javascript:showfolderdocuments(this);">' + obj.text + '</a>';
            $("#showAll").css('display', '');
        }
    }

    $('#listDocuments').html('<img class="f_p-error" src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/Helpdocumentsinfolder?parentfolderid=' + obj.id,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
        success: function (data) {
            if (data.length == 0) {
                $("#listDocuments").empty();
                $("#listDocuments").append('<p class="f_p-error">No items found.</p>');
                $("#compact-pagination").css('display', 'none');
                listDocuments = data;
            } else {
                $("#compact-pagination").css('display', '');
                $('#listDocuments').empty();
                listDocuments = data;
                //if (listDocuments.length > 20) {
                //    $("#footerPage").css('display', '');
                //} else {
                //    $("#footerPage").css('display', 'none');
                //}
                //CreateDocumentList(0);
                bindAlldocuments(data);
            }
        },
        error:
            function (data) {
                $('#listDocuments').empty();
                $("#listDocuments").append('<p class="f_p-error">No items found.</p>');
                $("#compact-pagination").css('display', 'none');
            }
    });
}

function showalldocuments() {
    $('#hdninsidefolder').val('');
    //$("#showAll").css('display', 'inline');
    $("#showAll").empty();
    $("#showAll").css('display', 'none');
    $('#txtSearchBox').val('');
    $('#liFiltersSearchText').text('');
    $('#liFiltersSearchText').css('display', 'none');
    getAllHelpDocuments();
    if (localStorage.UserType.indexOf("Global Contract Owner") >= 0 || localStorage.UserType.indexOf("Global Administrator") >= 0) {
        $('#btnaddnewsubfolder').css("display", "");
        $('#btnCreatDocument').css("display", "");
        $('#btnCreateVideo').css("display", "");
    }
    else {
        $('#btnaddnewsubfolder').css("display", "none");
        $('#btnCreatDocument').css("display", "none");
        $('#btnCreateVideo').css("display", "none");
    }
}

function showDocumentsInFolder(id) {
    $('#listDocuments').html('<img class="f_p-error" src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/Helpdocumentsinfolder?parentfolderid=' + id,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID },
        success: function (data) {
            if (data.length == 0) {
                $("#listDocuments").empty();
                $("#listDocuments").append('<p class="f_p-error">No items found.</p>');
                $("#compact-pagination").css('display', 'none');
            } else {
                $("#compact-pagination").css('display', '');
                $('#listDocuments').empty();
                bindAlldocuments(data);
            }
        },
        error:
            function (data) {
                $('#listDocuments').empty();
                $("#listDocuments").append('<p class="f_p-error">No items found.</p>');
                $("#compact-pagination").css('display', 'none');
            }
    });
}
function search() {
    if ($.trim($('#txtSearchBox').val()) == "") {
        if (localStorage.UserType.indexOf("Global Contract Owner") >= 0 || localStorage.UserType.indexOf("Global Administrator") >= 0) {
            $('#btnaddnewsubfolder').css("display", "");
            $('#btnCreatDocument').css("display", "");
            $('#btnCreateVideo').css("display", "");
        }
        else {
            $('#btnaddnewsubfolder').css("display", "none");
            $('#btnCreatDocument').css("display", "none");
            $('#btnCreateVideo').css("display", "none");
        }
        $('#liFiltersSearchText').text('');
        $('#liFiltersSearchText').css('display', 'none');
        getAllHelpDocuments();
    }
    else {
        $('#listDocuments').html('<img class="f_p-error" src="../Content/Images/icon/loading.gif">');
        //$("#showAll").text("Showing search result for : '" + $.trim($('#txtSearchBox').val()) + "'");
        $('#btnaddnewsubfolder').css("display", "none");
        $('#btnCreatDocument').css("display", "none");
        $('#btnCreateVideo').css("display", "none");
        $('#liFiltersSearchText').text('');
        $('#liFiltersSearchText').css('display', '');
        $('#showAll').css("display", "none");
        applyFilter();
    }
}
function applyFilter() {

    var customequery = "";
    var type = "";
    var txtsearchboxvalue = $.trim($('#txtSearchBox').val());
    var searchParentFloder = true;
    if (txtsearchboxvalue != "" && txtsearchboxvalue != null) {
        searchParentFloder = false;
        $('#liFiltersSearchText').append('<span><small>Showing search result for : ' + txtsearchboxvalue + '<img src="/Content/Images/close-quick.png" onclick="javascript:liRemove(this);" style="float:right" /></small></span>');
    }
    $("#listDocuments").empty();
    $('#listDocuments').html('<img class="f_p-error" src="../Content/Images/icon/loading.gif">');
    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/GetFilteredHelpDocuments?showparent=false&searchkeyword=' + encodeURIComponent($.trim($('#txtSearchBox').val())) + '&customquery= ' + customequery + '&sortbyfield=&orderby=' + '&type=' + type,
        type: 'GET',
        dataType: 'json',
        'Content-Type': 'application/json',
        cache: false,
        headers: { 'eContracts-ApiKey': localStorage.APIKey, UserID: localStorage.UserID, UserName: localStorage.UserName, BusinessAreaLocation: localStorage.GlobalBusinessAreaLocation },
        success: function (data) {
            if (data.length == 0) {
                $("#listDocuments").empty();
                $("#listDocuments").append('<p class="f_p-error">No items found.</p>');
                $("#compact-pagination").css('display', 'none');
                listDocuments = [];
            } else {
                $("#compact-pagination").css('display', '');
                $('#listDocuments').empty();
                GenerateListOfDocuments(data);
            }
        },
        error:
            function (data) {
                $("#listDocuments").empty();
                $("#listDocuments").append('<p class="f_p-error">No items found.</p>');
                $("#compact-pagination").css('display', 'none');
                $("#divChkSelectAll").css('display', 'none');
            }
    });
    $("#dvfilter").hide();
}
function liRemove(obj) {
    if ($(obj.parentNode.parentNode.parentNode).attr('id') == 'liFiltersSearchText') {
        $(obj.parentNode.parentNode.parentNode).empty();
        $('#txtSearchBox').val('');
        $("#showAll").empty();
        $("#showAll").css('display', 'none');
        //$("#hdContAreaDocLibName").val('/Help Documents/')
        getAllHelpDocuments();

        if (localStorage.UserType.indexOf("Global Contract Owner") >= 0 || localStorage.UserType.indexOf("Global Administrator") >= 0) {
            $('#btnaddnewsubfolder').css("display", "");
            $('#btnCreatDocument').css("display", "");
            $('#btnCreateVideo').css("display", "");
        }
        else {
            $('#btnaddnewsubfolder').css("display", "none");
            $('#btnCreatDocument').css("display", "none");
            $('#btnCreateVideo').css("display", "none");
        }

    }
}
function GenerateListOfDocuments(data) {
    listDocuments = data;
    if (listDocuments.length > 10) {
        $("#footerPage").css('display', '');
        $("#compact-pagination").css('display', '');
    } else {
        $("#footerPage").css('display', 'none');
        $("#compact-pagination").css('display', 'none');
    }
    CreateDocumentList();
}
function recentupdated() {
    listDocuments.sort(function (a, b) {
        var a = moment(a.Modified),
            b = moment(b.Modified);
        return (b - a);
    })
    sortFormat = "recentUpdated";
    CreateDocumentList(0);
}
function recentcreated() {
    listDocuments.sort(function (a, b) {
        var a = new moment(a.Created),
            b = new moment(b.Created);
        return (b - a);
    })
    sortFormat = "recentCreated";
    CreateDocumentList(0);
}
function showdocument(el) {
    var ext = el.innerText.match(settings.pattern);
    if (ext.length > 0) { ext = ext[0].slice(1); }
    var title = el.innerText;
    if (ext != null && ext != "") {
        if (jQuery.inArray(ext, settings.videoFileTypes) > -1) {
            if (ext.indexOf('mp4') > -1) {
                $("#ShowVideo").dialog("option", "title", title);
                $("#ShowVideo").dialog("open");
                $('#docText').val(el.innerText)
                var vedio = document.getElementById("player");
                if (vedio.children.length > 0)
                    vedio.removeChild(vedio.childNodes[1]);
                var source = document.createElement('source');
                source.setAttribute('src', el.dataset.value);
                source.setAttribute('type', 'video/mp4');
                vedio.appendChild(source);
                vedio.load();
                vedio.play();
            }
            else {
                Opendocinbrowser(el.dataset.value);
            }

        }
        else {
            Opendocinbrowser(el.dataset.value);
        }
    }
    else {
        Opendocinbrowser(el.dataset.value);
    }


}
$('#txtSearchBox').keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        search();
    }
});
$("#conSortByOptions").on('change', function () {
    if ($("#conSortByOptions").val() == "Recently Updated") {
        recentupdated();
    }
    else if ($("#conSortByOptions").val() == "Recently Created") {
        recentcreated();
    }
});
function showMore(id) {
    var rowkey = id;
    $('#dotdesc' + rowkey).css('display', 'none');
    $('#desc' + rowkey).css('display', '');
    $('#more' + rowkey).css('display', 'none');
    $('#less' + rowkey).css('display', '');
}
function showLess(id) {
    var rowkey = id;
    $('#dotdesc' + rowkey).css('display', '');
    $('#desc' + rowkey).css('display', 'none');
    $('#more' + rowkey).css('display', '');
    $('#less' + rowkey).css('display', 'none');

}
function changeinuploadfiles(obj) {
    var id = obj.id;
    var filecontrol = document.getElementById(id);
    var txt = "";
    if ('files' in filecontrol) {
        if (filecontrol.files.length == 0) {
        } else {
            for (var i = 0; i < filecontrol.files.length; i++) {
                //var acceptExtension = ['pdf', 'png', 'jpg', 'gif', 'bmp', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'txt', 'pptx', 'dotx', 'xps', 'rtf', 'odt', 'dotm', 'docm', 'msg', 'tif', 'tiff', 'csv','ZIP','zip'];
                var acceptExtension = ['m2v', 'ismv', 'wmv', 'mpeg', 'mpg', 'mp4', 'xesc', 'vob', 'ts', 'mod', 'avi', 'm2ts', 'mts', 'asf', '3gp', '3g2', '3gp2', 'flv', 'mkv'];
                var file = filecontrol.files[i];
                var ext = file.name.split('.').pop().toString();
                if (acceptExtension.indexOf(ext.trim().toLowerCase()) > -1) {
                    if ('size' in file) {
                        if (file.size > 0) {
                            var Filelengthcol = Math.round((file.size / 1048576));
                            if (Filelengthcol > (Math.round(parseInt(localStorage.MaxRequestLength) / 1000))) {
                                //swal("", "The maximum permissible size is " + Math.round(parseInt(localStorage.MaxRequestLength) / 1024) + " MB, Please upload a file which is less than " + Math.round(parseInt(localStorage.MaxRequestLength) / 1024) + " MB");
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
                                } else {
                                    var selecteddifffilename = [];
                                    $('input[type="file"]').each(function () {
                                        var thisid = this.id;
                                        var classnamevalue = (this.className.indexOf("HLeyckU8") > -1) ? true : false
                                        if (id != thisid && classnamevalue) {
                                            var filecontroltocheck = document.getElementById(thisid);
                                            if (filecontroltocheck.files.length > 0) {
                                                var filetocheck = filecontroltocheck.files[0];
                                                selecteddifffilename.push(filetocheck.name);
                                            }
                                        }
                                    });
                                    //manoj
                                    if (selecteddifffilename.indexOf(file.name) > -1) {
                                        swal("", "<span style='font-weight:700'>" + file.name + "</span> already selected.");
                                        $("#" + id).replaceWith($("#" + id).val('').clone(true));
                                    }
                                    //manoj
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
                        text: "Only file type " + acceptExtension.join(", ") + "are allowed.",
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
function showSearchItem() {
    var isFolder = false;
    var multipleChecks = "";
    $("#listDocuments").empty();


    if ($('#conSortByOptions').val() == "Recently Updated") {
        listDocuments.sort(function (a, b) {
            var a = moment(a.Modified),
                b = moment(b.Modified);
            return (b - a);
        })

    }
    else {
        listDocuments.sort(function (a, b) {
            var a = new moment(a.Created),
                b = new moment(b.Created);
            return (b - a);
        })

    }

    $(listDocuments).each(function (i, item) {
        //var item = listDocuments[j];
        var article = "<li style='margin-bottom: 10px;width: 100%;float: left;'>";
        if (item != null) {
            if (item.DocumentName.indexOf('.') > -1) {
                isFolder = false;
            }
            else {
                isFolder = true;
            }

            var selectedSortOption = "";

            if (item.Modified != null && sortFormat == "recentUpdated") {
                var ModifiedDate = "";
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                { ModifiedDate = moment(new Date(item.Modified)).format('MM/DD/YYYY hh:mm:ss'); }
                else {
                    ModifiedDate = moment(new Date(item.Modified)).format(localStorage.AppDateFormat + " hh:mm:ss");
                }
                selectedSortOption = "Last Updated by " + item.ModifiedBy + " on " + ModifiedDate;
            }
            else if (item.Created != null && sortFormat == "recentCreated") {
                var CreatedDate = "";
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                { CreatedDate = moment(new Date(item.Created)).format('MM/DD/YYYY hh:mm:ss'); }
                else {
                    CreatedDate = moment(new Date(item.Created)).format(localStorage.AppDateFormat + " hh:mm:ss");
                }
                selectedSortOption = "Last Created by " + item.CreatedBy + " on " + CreatedDate;
            }
            else {
                var ModifiedDate = "";
                if (localStorage.AppDateFormat == "undefined" || localStorage.AppDateFormat == null || localStorage.AppDateFormat == "")
                { ModifiedDate = moment(new Date(item.Modified)).format('MM/DD/YYYY hh:mm:ss'); }
                else {
                    ModifiedDate = moment(new Date(item.Modified)).format(localStorage.AppDateFormat + " hh:mm:ss");
                }
                selectedSortOption = "Last Updated by " + item.ModifiedBy + " on " + ModifiedDate;
            }
            if (isFolder) {

                //}
            }
            else {
                var vPrimDocIcon = '';
                var vDocIcon = "";
                var vClass = "openmenuDocument";
                article += '<p class="files">';
                vURLDoc = encodeURI(item.DocumentUrl);
                var ext = vURLDoc.match(settings.pattern);
                var vFileType = '<dd class="file-icon none"></dd>';
                if (ext != null) {
                    if (ext.length > 0) { ext = ext[0].slice(1); }
                    if (jQuery.inArray(ext, settings.knownFileTypes) > -1) {
                        vFileType = '<dd class="file-icon ' + ext + '" style="margin-right:0 !important;"></dd>';
                    }
                }

                if (ext != null) {
                    if (jQuery.inArray(ext, settings.videoFileTypes) > -1) {
                        vFileType = '<dd class="file-video" style="margin-right:0 !important;"></dd>';
                    }
                    if (ext != 'mp4') {
                        vClass = "openmenuVedio";
                    }
                }
                //if (multipleChecks.indexOf(item.RowKey) > -1) {
                //        article += '<input class="margin-Top10 margin-right" name="ContRec" type="checkbox" checked value="" onclick="checkMultipleContracts(this);" id="' + item.RowKey + "~" + item.DocumentUrl + '"  />';
                //} else { article += '<input class="margin-Top10 margin-right" name="ContRec" type="checkbox" value="" onclick="checkMultipleContracts(this);" id="' + item.RowKey + "~" + item.DocumentUrl + '"  />'; }
                article += '<p id="DocumentID" style="display:none;">' + item.RowKey + '</p>';
                article += '<p id="DocumentName" style="display:none;">' + item.DocumentName + '</p>';
                article += '<p id="DocumentUrl" style="display:none;">' + item.DocumentUrl + '</p>';
                article += '<p id="Description" style="display:none;">' + item.Description + '</p>';
                article += '<i style="width:100%"> ' + vFileType + ' <a href="javascript:void(0)" target="_blank" onclick=showdocument(this); data-value="' + encodeURI(item.DocumentUrl) + '" title="' + item.DocumentName + '" style="margin-right:0 !important;">' + item.DocumentName + '</a>&nbsp;' + '<img src="../Content/Images/context_Menu.png" alt="Open Menu" title="Open Menu" class="' + vClass + '" />' + vPrimDocIcon + vDocIcon + '&nbsp;</br><small style="font-size: 11px;line-height: 19px;color: #b4b3b3;">' + selectedSortOption + '</small></i>';
                if (item.Description != "") {
                    article += '<small id="dotdesc' + item.RowKey + '" title="Description" style="font-size: 11px; color:#565656;width:100%" class="doted100">' + item.Description + '</small>';
                    article += '<small id="desc' + item.RowKey + '" title="Description" style="font-size: 11px;color:#565656;display:none;width:100%">' + item.Description + '</small>';
                }

                if (item.Description.length > 149) {
                    article += '<a id="more' + item.RowKey + '" href="javascript:void(0)" onclick=showMore(\'' + item.RowKey + '\') style="font-size: 11px;width:100%">view more</a>';
                    article += '&nbsp;&nbsp;<a id="less' + item.RowKey + '" style="display:none;font-size: 11px" href="javascript:void(0)" onclick=showLess(\'' + item.RowKey + '\') style="font-size: 11px;width:100%">view less</a>';
                }
                // }

            }
            article += '</p></li>';
            if (isFolder) {
                $("#listDocuments").append(article);
            }
            isFolder = false;

        }
        article = '';
    });
    $(".openmenuDocument").contextMenu({ menu: 'myMenuDocument', leftButton: true }, function (action, el, pos) {
        contextMenuWorkDocument(action, el.parent("i").parent("li"), pos);
    });
    $(".openmenuVedio").contextMenu({ menu: 'myMenuVedio', leftButton: true }, function (action, el, pos) {
        contextMenuWorkDocument(action, el.parent("i").parent("li"), pos);
    });
    $(".openmenuFolder").contextMenu({ menu: 'myMenuFolder', leftButton: true }, function (action, el, pos) {
        contextMenuWorkFolder(action, el.parent("i").parent("p").parent("li"), pos);
    });
    if (listDocuments.length > 10) {
        $("#footerPage").css('display', '');
        $("#compact-pagination").css('display', '');
    } else {
        $("#footerPage").css('display', 'none');
        $("#compact-pagination").css('display', 'none');
    }
    $('#compact-pagination').pagination({
        items: listDocuments.length,
        itemsOnPage: 10,
        type: 'ul',
        row: 'li',
        typeID: 'listDocuments',
        cssStyle: 'compact-theme',
        //listname: 'listDocuments'
    });
}

$('body').click(function () {
    $("#conSortByOptions").niceSelect();
});
function CreateVideo() {
    var isExist = false;
    var documentID = "";
    var overwritedocument = false;
    $("#loadingPage").fadeIn();

    if (requiredValidator("addVideo")) {
        var opmlFile = $('#docVideo')[0];
        if (listDocuments != null) {
            $(listDocuments).each(function (i, item) {
                if (item.DocumentName.replace(/\s\s+/g, " ").toLowerCase().trim() == opmlFile.files[0].name.replace(/\s\s+/g, " ").toLowerCase().trim()) {
                    isExist = true;
                    documentID = item.RowKey;
                    return false;
                }
            });
        }
        if (!isExist) {
            VidioUpload();
        }
        else {
            $("#loadingPage").fadeOut();
            //swal("", "Document already exists with the same name " + opmlFile.files[0].name + "");
            swal({
                title: '',
                text: "Document already exists, do you want to <span style='font-weight:700'>overwrite</span> the existing document?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                html: true,
                closeOnConfirm: true
            },
                   function (confirmed) {
                       if (confirmed) {
                           overwritedocument = true;
                           VidioUpload(overwritedocument, documentID);

                       }
                   });
        }
    }
    else {
        $("#loadingPage").fadeOut();
    }

}

function VidioUpload(overwritedocument, ID) {
    $("#loadingPage").fadeIn();
    var overWrite = false;
    var documentiD = "";
    var desc = "";
    if (typeof (overwritedocument) != "undefined" && overwritedocument != null && overwritedocument != "") {
        overWrite = overwritedocument;
        documentiD = ID;
    }
    var finalurlstr = $('#lblFolderUrlVD').text();
    var opmlFile = $('#docVideo')[0];
    var formData = new FormData();
    formData.append("AccountID", localStorage.AccountID);
    formData.append("Description", $("#txtDescriptionVD").val());
    formData.append("UserName", localStorage.UserName);
    formData.append("LocationURL", finalurlstr);
    if (opmlFile.files.length > 0) {
        formData.append("opmlFile", opmlFile.files[0]);
    }
    formData.append("overWrite", overWrite);
    formData.append("documentiD", documentiD);

    $.ajax({
        url: vApiBaseSiteUrl +'/api/accounts/' + localStorage.AccountID + '/documents/CreateHelpDocument',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        headers: {
            'eContracts-ApiKey': localStorage.APIKey, username: localStorage.UserName, 'RefreshToken': localStorage.RefreshToken
        },
        processData: false,
        async: true,
        success: function (data) {
            //$('select option:contains("Recently Updated")').prop('selected', true);
            if ($('#hdninsidefolder').val() == "") {
                getAllHelpDocuments();
            }
            else {
                showDocumentsInFolder($('#hdninsidefolder').val());
            }
            $("#loadingPage").fadeOut();
            $("#docVideo").replaceWith($("#docVideo").val('').clone(true));
            $("#txtDescriptionVD").val('');
            $("#addVideo").dialog("close");
        },
        error: function (data) {
            $("#loadingPage").fadeOut();
            $("#docVideo").replaceWith($("#docVideo").val('').clone(true));
            $("#txtDescriptionVD").val('');
            $("#addVideo").dialog("close");
        }
    });
}

$('body').click(function () {
    $("#conSortByOptions").niceSelect();
});


